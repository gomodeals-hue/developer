import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

dotenv.config({ path: path.join(__dirname, '.env') });

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes('[YOUR-PASSWORD]')) {
  console.error('\n❌ Error: Please replace "[YOUR-PASSWORD]" in backend/.env with your real Supabase database password.');
  process.exit(1);
}

console.log('\n======================================================');
console.log('  GoMo Deals -> Supabase Cloud PostgreSQL Migration');
console.log('======================================================\n');
console.log('Connecting to Supabase at:', process.env.PGHOST || 'db.oeczviaiudqtqiqjbknp.supabase.co');

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

function readJsonFile(filename, fallback = []) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`  ⚠️ Could not read ${filename}:`, err.message);
    return fallback;
  }
}

async function runMigration() {
  try {
    await client.connect();
    console.log('✅ Connected successfully to Supabase PostgreSQL!\n');

    console.log('[1/4] Enabling required extensions...');
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    console.log('[2/4] Creating all application tables...');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        customer_id VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'customer',
        membership VARCHAR(50) DEFAULT 'free',
        avatar TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        icon VARCHAR(100),
        image TEXT,
        item_count INT DEFAULT 0,
        parent_id VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        name VARCHAR(500),
        description TEXT,
        category VARCHAR(100),
        category_slug VARCHAR(100),
        price NUMERIC(12, 2) NOT NULL,
        original_price NUMERIC(12, 2),
        discount_percentage NUMERIC(5, 2) DEFAULT 0,
        rating NUMERIC(3, 2) DEFAULT 4.5,
        rating_count INT DEFAULT 10,
        stock INT DEFAULT 100,
        thumbnail TEXT,
        images TEXT[] DEFAULT ARRAY[]::TEXT[],
        tags TEXT[] DEFAULT ARRAY[]::TEXT[],
        badge VARCHAR(50),
        is_featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(100) PRIMARY KEY,
        order_number VARCHAR(100) UNIQUE,
        user_id VARCHAR(100),
        customer_name VARCHAR(255),
        customer_email VARCHAR(255),
        items JSONB DEFAULT '[]'::JSONB,
        total_amount NUMERIC(12, 2) NOT NULL,
        discount_amount NUMERIC(12, 2) DEFAULT 0,
        shipping_fee NUMERIC(10, 2) DEFAULT 0,
        payment_method VARCHAR(50) DEFAULT 'cod',
        payment_status VARCHAR(50) DEFAULT 'pending',
        order_status VARCHAR(50) DEFAULT 'processing',
        shipping_address JSONB DEFAULT '{}'::JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Addresses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100),
        name VARCHAR(255),
        street TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        pincode VARCHAR(20),
        phone VARCHAR(50),
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Coupons table
    await client.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id VARCHAR(100) PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_type VARCHAR(20) DEFAULT 'percentage',
        discount_value NUMERIC(10, 2) NOT NULL,
        min_order_amount NUMERIC(10, 2) DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Flea Market & Ticketing Schemas
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

      CREATE TABLE IF NOT EXISTS tb_theatres (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL DEFAULT 'Chennai',
        address TEXT,
        total_screens INT DEFAULT 4,
        amenities TEXT[] DEFAULT ARRAY['Dolby Atmos', '4K Laser Projection']::TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tb_movies (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genre TEXT[] NOT NULL DEFAULT ARRAY['Action']::TEXT[],
        rating DECIMAL(3,1) DEFAULT 8.5,
        duration VARCHAR(50) DEFAULT '2h 45m',
        poster TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tb_bookings (
        id VARCHAR(100) PRIMARY KEY,
        booking_id VARCHAR(100),
        movie_title VARCHAR(255),
        theatre_name VARCHAR(255),
        booking_date VARCHAR(50),
        booking_time VARCHAR(50),
        seats TEXT[],
        total_amount NUMERIC(10,2),
        user_email VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bus_trips (
        id VARCHAR(50) PRIMARY KEY,
        operator_name VARCHAR(255) NOT NULL,
        bus_service_number VARCHAR(100) NOT NULL,
        bus_type VARCHAR(100) NOT NULL,
        from_city VARCHAR(100) NOT NULL,
        to_city VARCHAR(100) NOT NULL,
        departure_time VARCHAR(20) NOT NULL,
        arrival_time VARCHAR(20) NOT NULL,
        duration VARCHAR(30) NOT NULL,
        base_fare NUMERIC(10, 2) NOT NULL,
        available_seats INT DEFAULT 20,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Tables created or verified.\n');

    console.log('[3/4] Migrating JSON data into Supabase...');

    // 1. Users
    const users = readJsonFile('users.json');
    let userCount = 0;
    for (const u of users) {
      await client.query(`
        INSERT INTO users (id, customer_id, name, email, password_hash, phone, role, avatar)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          avatar = EXCLUDED.avatar;
      `, [
        u.id || `usr-${Date.now()}`,
        u.customer_id || u.id,
        u.name || u.full_name || 'Member',
        u.email,
        u.password || 'password123',
        u.phone || '',
        u.role || 'customer',
        u.avatar || ''
      ]);
      userCount++;
    }
    console.log(`  -> Synced ${userCount} users.`);

    // 2. Categories
    const categories = readJsonFile('categories.json');
    let catCount = 0;
    for (const c of categories) {
      await client.query(`
        INSERT INTO categories (id, name, slug, icon, image, item_count, parent_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          image = EXCLUDED.image;
      `, [
        c.id || c.slug,
        c.name,
        c.slug,
        c.icon || '',
        c.image || '',
        c.item_count || 0,
        c.parent_id || null
      ]);
      catCount++;
    }
    console.log(`  -> Synced ${catCount} categories.`);

    // 3. Products
    const products = readJsonFile('products.json');
    let prodCount = 0;
    for (const p of products) {
      const imagesArr = Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []);
      const tagsArr = Array.isArray(p.tags) ? p.tags : [];
      await client.query(`
        INSERT INTO products (
          id, title, name, description, category, category_slug,
          price, original_price, discount_percentage, rating, rating_count,
          stock, thumbnail, images, tags, badge, is_featured
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          price = EXCLUDED.price,
          stock = EXCLUDED.stock,
          thumbnail = EXCLUDED.thumbnail;
      `, [
        String(p.id),
        p.title || p.name || 'Untitled Product',
        p.name || p.title || 'Untitled Product',
        p.description || '',
        p.category || 'General',
        p.category_slug || (p.category ? p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'general'),
        parseFloat(p.price) || 0,
        parseFloat(p.original_price || p.price) || 0,
        parseFloat(p.discount_percentage || p.discount) || 0,
        parseFloat(p.rating) || 4.5,
        parseInt(p.rating_count || p.reviews_count || 10, 10),
        parseInt(p.stock ?? 100, 10),
        p.thumbnail || (imagesArr[0] || ''),
        imagesArr,
        tagsArr,
        p.badge || '',
        Boolean(p.is_featured || p.featured)
      ]);
      prodCount++;
    }
    console.log(`  -> Synced ${prodCount} products.`);

    // 4. Coupons
    const coupons = readJsonFile('coupons.json');
    let couponCount = 0;
    for (const cp of coupons) {
      await client.query(`
        INSERT INTO coupons (id, code, discount_type, discount_value, min_order_amount, is_active)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (code) DO NOTHING;
      `, [
        cp.id || `cpn-${Date.now()}`,
        cp.code,
        cp.discount_type || 'percentage',
        parseFloat(cp.discount_value || cp.discount) || 10,
        parseFloat(cp.min_order_amount || 0),
        Boolean(cp.is_active ?? true)
      ]);
      couponCount++;
    }
    console.log(`  -> Synced ${couponCount} coupons.`);

    console.log('\n[4/4] Verification check...');
    const dbStats = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as users_count,
        (SELECT COUNT(*) FROM categories) as categories_count,
        (SELECT COUNT(*) FROM products) as products_count,
        (SELECT COUNT(*) FROM coupons) as coupons_count;
    `);

    console.log('\n🎉 ================================================');
    console.log('   MIGRATION TO SUPABASE COMPLETE SUCCESSFULLY!');
    console.log('====================================================');
    console.log('Live Cloud Table Row Counts:');
    console.log(`  • Users:      ${dbStats.rows[0].users_count}`);
    console.log(`  • Categories: ${dbStats.rows[0].categories_count}`);
    console.log(`  • Products:   ${dbStats.rows[0].products_count}`);
    console.log(`  • Coupons:    ${dbStats.rows[0].coupons_count}`);
    console.log('====================================================\n');

  } catch (err) {
    console.error('\n❌ Migration failed with error:', err.message);
  } finally {
    await client.end();
  }
}

runMigration();

