import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Connection string or standard PostgreSQL environment variables
const connectionConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      user: process.env.PGUSER || 'postgres',
      host: process.env.PGHOST || 'localhost',
      database: process.env.PGDATABASE || 'gomodeals',
      password: process.env.PGPASSWORD || 'postgres',
      port: parseInt(process.env.PGPORT || '5432', 10),
    };

export const pool = new Pool({
  ...connectionConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ...(process.env.NODE_ENV === 'production' && {
    ssl: { rejectUnauthorized: false }
  })
});

let isConnected = false;

/**
 * Test connectivity to PostgreSQL
 */
export async function testPostgresConnection() {
  try {
    const res = await pool.query('SELECT NOW() AS current_time');
    isConnected = true;
    console.log('[PostgreSQL] Connected successfully to PostgreSQL at:', res.rows[0].current_time);
    return true;
  } catch (err) {
    isConnected = false;
    console.warn('[PostgreSQL] Connection warning:', err.message);
    console.warn('[PostgreSQL] Ensure PostgreSQL 18 is running and verify credentials in backend/.env');
    return false;
  }
}

export function isPostgresConnected() {
  return isConnected;
}

/**
 * Execute a query with safety fallback
 */
export async function query(text, params) {
  return pool.query(text, params);
}

/**
 * Idempotently initialize all PostgreSQL tables for:
 * 1. Flea Market B2B Agricultural Commodity Exchange & Video Meetings
 * 2. Movie/Event Ticket Booking Platform
 * 3. Core GoMo Deals E-Commerce Store
 */
export async function initPostgresSchema() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Enable UUID extension
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    // ----------------------------------------------------
    // 1. FLEA MARKET TABLES
    // ----------------------------------------------------

    // Flea Market Commodity Listings
    await client.query(`
      CREATE TABLE IF NOT EXISTS flea_market_products (
        product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        seller_id VARCHAR(100) NOT NULL DEFAULT 'seller_gomo_direct',
        seller_name VARCHAR(255) NOT NULL DEFAULT 'GoMo Verified Farmer Producer Co.',
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'spices',
        origin VARCHAR(255) NOT NULL DEFAULT 'India',
        grade VARCHAR(100) NOT NULL DEFAULT 'Grade A Export Quality',
        moisture_percentage DECIMAL(5,2) DEFAULT 8.5,
        harvest_date VARCHAR(50) DEFAULT '2026 Season',
        price_per_kg DECIMAL(15,2) NOT NULL,
        min_order_kg DECIMAL(15,2) NOT NULL DEFAULT 50,
        available_stock_kg DECIMAL(15,2) NOT NULL DEFAULT 1000,
        images TEXT[] DEFAULT ARRAY[]::TEXT[],
        thumbnail TEXT,
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Flea Market Meetings (Video Conferences)
    await client.query(`
      CREATE TABLE IF NOT EXISTS flea_market_meetings (
        meeting_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID REFERENCES flea_market_products(product_id) ON DELETE CASCADE,
        customer_id VARCHAR(100) NOT NULL,
        customer_name VARCHAR(255) DEFAULT 'Valued Buyer',
        customer_email VARCHAR(255),
        seller_id VARCHAR(100) NOT NULL,
        seller_name VARCHAR(255) DEFAULT 'GoMo Merchant',
        kg_amount DECIMAL(15,2) NOT NULL,
        purpose TEXT,
        scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
        meeting_link VARCHAR(500) NOT NULL,
        status VARCHAR(50) DEFAULT 'Scheduled', -- Scheduled, Completed, Cancelled, Expired
        earnings DECIMAL(15,2) DEFAULT 0,
        meeting_notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_fmm_seller ON flea_market_meetings(seller_id);
      CREATE INDEX IF NOT EXISTS idx_fmm_customer ON flea_market_meetings(customer_id);
      CREATE INDEX IF NOT EXISTS idx_fmm_scheduled ON flea_market_meetings(scheduled_at);
    `);

    // Flea Market Deals / Negotiation Offers
    await client.query(`
      CREATE TABLE IF NOT EXISTS flea_market_offers (
        offer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        meeting_id UUID REFERENCES flea_market_meetings(meeting_id) ON DELETE SET NULL,
        product_id UUID REFERENCES flea_market_products(product_id) ON DELETE CASCADE,
        seller_id VARCHAR(100) NOT NULL,
        customer_id VARCHAR(100) NOT NULL,
        customer_name VARCHAR(255),
        product_name VARCHAR(255),
        product_thumbnail TEXT,
        agreed_quantity DECIMAL(15,2) NOT NULL,
        offered_price DECIMAL(15,2) NOT NULL,
        contract_terms TEXT,
        offer_token VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending', -- Pending, Accepted, Rejected, Completed
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ----------------------------------------------------
    // 2. MOVIE & EVENT TICKET BOOKING TABLES
    // ----------------------------------------------------

    // Theatres / Venues
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_theatres (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL DEFAULT 'Chennai',
        address TEXT,
        total_screens INT DEFAULT 4,
        amenities TEXT[] DEFAULT ARRAY['Dolby Atmos', '4K Laser Projection', 'Recliner Seating', 'Gourmet Food Court']::TEXT[],
        owner_id VARCHAR(50) DEFAULT 'owner_theatre_1',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Movies Catalog
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_movies (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genre TEXT[] NOT NULL DEFAULT ARRAY['Action', 'Drama']::TEXT[],
        rating DECIMAL(3,1) DEFAULT 8.5,
        duration VARCHAR(50) DEFAULT '2h 45m',
        description TEXT,
        synopsis TEXT,
        poster TEXT,
        backdrop TEXT,
        trailer_url TEXT,
        language VARCHAR(50) DEFAULT 'Tamil',
        release_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        owner_id VARCHAR(50),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Showtimes
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_showtimes (
        id VARCHAR(50) PRIMARY KEY,
        movie_id VARCHAR(50) REFERENCES tb_movies(id) ON DELETE CASCADE,
        theatre VARCHAR(255) NOT NULL,
        theatre_id VARCHAR(50) REFERENCES tb_theatres(id) ON DELETE SET NULL,
        location VARCHAR(255) NOT NULL,
        show_times TEXT[] NOT NULL DEFAULT ARRAY['10:00 AM', '02:00 PM', '06:30 PM', '10:00 PM']::TEXT[],
        price NUMERIC(10, 2) NOT NULL DEFAULT 190.00,
        vip_price NUMERIC(10, 2) DEFAULT 350.00,
        premium_price NUMERIC(10, 2) DEFAULT 250.00,
        standard_price NUMERIC(10, 2) DEFAULT 180.00,
        seats_available INT DEFAULT 120,
        language VARCHAR(50) DEFAULT 'Tamil',
        format VARCHAR(50) DEFAULT '2D',
        owner_id VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ticket Bookings
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_bookings (
        id VARCHAR(50) PRIMARY KEY,
        showtime_id VARCHAR(50) REFERENCES tb_showtimes(id) ON DELETE CASCADE,
        user_id VARCHAR(50),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        seats TEXT[] NOT NULL,
        booking_date VARCHAR(50) NOT NULL,
        booking_time VARCHAR(50) NOT NULL,
        total_amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'confirmed', -- confirmed, cancelled, checked_in
        payment_id VARCHAR(100),
        addons JSONB DEFAULT '[]'::JSONB,
        checked_in BOOLEAN DEFAULT FALSE,
        checked_in_at TIMESTAMP WITH TIME ZONE,
        reminder_sent BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Temporary Seat Holds (Active locking during checkout)
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_seat_holds (
        id VARCHAR(50) PRIMARY KEY,
        showtime_id VARCHAR(50) NOT NULL,
        booking_date VARCHAR(50) NOT NULL,
        booking_time VARCHAR(50) NOT NULL,
        seats TEXT[] NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Cinema Concession Add-ons (Popcorn, Soft Drinks, Combos)
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_addons (
        id VARCHAR(50) PRIMARY KEY,
        owner_id VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) DEFAULT 'Snacks',
        price NUMERIC(10, 2) NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Waitlist for full showtimes
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_waitlist (
        id VARCHAR(50) PRIMARY KEY,
        showtime_id VARCHAR(50) NOT NULL,
        booking_date VARCHAR(50) NOT NULL,
        booking_time VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Cinema Promo Codes
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_coupons (
        id VARCHAR(50) PRIMARY KEY,
        code VARCHAR(50) NOT NULL,
        discount_type VARCHAR(20) NOT NULL, -- percentage, fixed
        discount_value NUMERIC NOT NULL,
        min_order_amount NUMERIC DEFAULT 0,
        expiry_date DATE,
        owner_id VARCHAR(50),
        used_by TEXT[] DEFAULT ARRAY[]::TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(code, owner_id)
      );
    `);

    // Movie Reviews
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_reviews (
        id VARCHAR(50) PRIMARY KEY,
        movie_id VARCHAR(50) NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(movie_id, user_id)
      );
    `);

    // ----------------------------------------------------
    // 3. BUS TICKET BOOKING & SETTLEMENT TABLES (Part 6)
    // ----------------------------------------------------

    // Bus Operators
    await client.query(`
      CREATE TABLE IF NOT EXISTS bus_operators (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        rating DECIMAL(3,1) DEFAULT 4.5,
        reviews_count INT DEFAULT 0,
        logo TEXT,
        headquarters VARCHAR(255),
        verified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Bus Trips
    await client.query(`
      CREATE TABLE IF NOT EXISTS bus_trips (
        id VARCHAR(50) PRIMARY KEY,
        operator_id VARCHAR(50) REFERENCES bus_operators(id) ON DELETE SET NULL,
        operator_name VARCHAR(255) NOT NULL,
        bus_service_number VARCHAR(100) NOT NULL,
        bus_type VARCHAR(100) NOT NULL,
        category VARCHAR(50) DEFAULT 'sleeper',
        is_ac BOOLEAN DEFAULT TRUE,
        from_city VARCHAR(100) NOT NULL,
        to_city VARCHAR(100) NOT NULL,
        departure_time VARCHAR(20) NOT NULL,
        arrival_time VARCHAR(20) NOT NULL,
        duration VARCHAR(30) NOT NULL,
        base_fare NUMERIC(10, 2) NOT NULL,
        available_seats INT DEFAULT 20,
        rating DECIMAL(3,1) DEFAULT 4.6,
        total_reviews INT DEFAULT 100,
        has_live_tracking BOOLEAN DEFAULT TRUE,
        amenities TEXT[] DEFAULT ARRAY['Charging Point', 'Blankets', 'Water Bottle', 'Reading Light']::TEXT[],
        boarding_points JSONB DEFAULT '[]'::JSONB,
        dropping_points JSONB DEFAULT '[]'::JSONB,
        cancellation_policy JSONB DEFAULT '[]'::JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Bus Bookings
    await client.query(`
      CREATE TABLE IF NOT EXISTS bus_bookings (
        id VARCHAR(50) PRIMARY KEY,
        pnr VARCHAR(50) NOT NULL,
        trip_id VARCHAR(50) REFERENCES bus_trips(id) ON DELETE CASCADE,
        operator_name VARCHAR(255) NOT NULL,
        bus_service_number VARCHAR(100) NOT NULL,
        bus_type VARCHAR(100) NOT NULL,
        from_city VARCHAR(100) NOT NULL,
        to_city VARCHAR(100) NOT NULL,
        departure_time VARCHAR(20) NOT NULL,
        arrival_time VARCHAR(20) NOT NULL,
        duration VARCHAR(30) NOT NULL,
        journey_date VARCHAR(50) NOT NULL,
        boarding_point JSONB NOT NULL,
        dropping_point JSONB NOT NULL,
        seats TEXT[] NOT NULL,
        lead_passenger JSONB NOT NULL,
        passengers JSONB DEFAULT '[]'::JSONB,
        total_amount NUMERIC(10, 2) NOT NULL,
        discount_amount NUMERIC(10, 2) DEFAULT 0,
        coupon_code VARCHAR(50),
        status VARCHAR(20) DEFAULT 'confirmed', -- confirmed, cancelled, completed
        payment_id VARCHAR(100),
        payment_method VARCHAR(50) DEFAULT 'upi',
        commission_snapshot JSONB,
        cancellation JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Bus Temporary Seat Holds
    await client.query(`
      CREATE TABLE IF NOT EXISTS bus_seat_holds (
        id VARCHAR(50) PRIMARY KEY,
        trip_id VARCHAR(50) NOT NULL,
        seats TEXT[] NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Commission Rules (Part 8)
    await client.query(`
      CREATE TABLE IF NOT EXISTS commission_rules (
        id VARCHAR(50) PRIMARY KEY,
        supplier_id VARCHAR(50) NOT NULL,
        ticket_category VARCHAR(50) NOT NULL, -- 'movie' | 'bus'
        contract_reference VARCHAR(100) NOT NULL,
        commission_type VARCHAR(20) DEFAULT 'percentage', -- 'percentage' | 'fixed'
        rate NUMERIC(5, 2) NOT NULL,
        platform_fee NUMERIC(10, 2) DEFAULT 30.00,
        is_active BOOLEAN DEFAULT TRUE,
        effective_from DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Refund Transactions Audit Trail
    await client.query(`
      CREATE TABLE IF NOT EXISTS refund_transactions (
        refund_id VARCHAR(50) PRIMARY KEY,
        booking_id VARCHAR(50) NOT NULL,
        booking_type VARCHAR(50) NOT NULL, -- 'movie' | 'bus'
        original_amount NUMERIC(10, 2) NOT NULL,
        cancellation_fee NUMERIC(10, 2) NOT NULL,
        refund_amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'completed',
        gateway_status VARCHAR(50) DEFAULT 'credited_to_source',
        processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Supplier Settlement Ledger
    await client.query(`
      CREATE TABLE IF NOT EXISTS supplier_settlements (
        id VARCHAR(50) PRIMARY KEY,
        supplier_id VARCHAR(50) NOT NULL,
        supplier_name VARCHAR(255) NOT NULL,
        ticket_category VARCHAR(50) NOT NULL,
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        total_tickets INT DEFAULT 0,
        gross_sales NUMERIC(12, 2) DEFAULT 0,
        gross_commission NUMERIC(12, 2) DEFAULT 0,
        platform_fees NUMERIC(12, 2) DEFAULT 0,
        gateway_deductions NUMERIC(12, 2) DEFAULT 0,
        refund_deductions NUMERIC(12, 2) DEFAULT 0,
        net_payable NUMERIC(12, 2) DEFAULT 0,
        settlement_status VARCHAR(50) DEFAULT 'pending', -- pending, processed, reconciled
        settled_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('[PostgreSQL] Database schema tables synchronized successfully.');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[PostgreSQL] Schema initialization failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
}
