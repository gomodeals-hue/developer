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

console.log('\n======================================================');
console.log('  GoMo Deals -> 100% Complete Supabase DB Migration');
console.log('======================================================\n');

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

async function runFullMigration() {
  try {
    await client.connect();
    console.log('✅ Connected to Supabase PostgreSQL!\n');

    // 1. Create Sellers Table
    console.log('📦 Setting up sellers table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS sellers (
        id VARCHAR(100) PRIMARY KEY,
        seller_id VARCHAR(100),
        store_name VARCHAR(255) NOT NULL,
        owner_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        category VARCHAR(100) DEFAULT 'clothing',
        gstin VARCHAR(50),
        address TEXT,
        status VARCHAR(50) DEFAULT 'approved',
        verified BOOLEAN DEFAULT TRUE,
        rating NUMERIC(3, 2) DEFAULT 5.0,
        review_count INT DEFAULT 0,
        total_sales INT DEFAULT 0,
        total_revenue NUMERIC(12, 2) DEFAULT 0,
        balance NUMERIC(12, 2) DEFAULT 0,
        bank_details JSONB DEFAULT '{}'::JSONB,
        avatar TEXT,
        logo TEXT,
        description TEXT,
        settings JSONB DEFAULT '{}'::JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed Sellers
    const sellersData = readJsonFile('sellers.json', []);
    if (sellersData.length > 0) {
      console.log(`  Seeding ${sellersData.length} sellers...`);
      for (const s of sellersData) {
        await client.query(`
          INSERT INTO sellers (
            id, seller_id, store_name, owner_name, email, password, phone,
            category, gstin, address, status, verified, rating, review_count,
            total_sales, total_revenue, balance, bank_details, avatar, logo, description, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
          ON CONFLICT (id) DO UPDATE SET
            store_name = EXCLUDED.store_name,
            email = EXCLUDED.email,
            password = EXCLUDED.password,
            phone = EXCLUDED.phone,
            status = EXCLUDED.status,
            bank_details = EXCLUDED.bank_details;
        `, [
          s.id || s.seller_id,
          s.seller_id || s.id,
          s.store_name || s.name || 'Store',
          s.owner_name || s.store_name || 'Owner',
          (s.email || `${s.id}@gomodeals.com`).toLowerCase(),
          s.password || 'seller123',
          s.phone || '+91 90000 00000',
          s.category || 'clothing',
          s.gstin || '29AAAAA0000A1Z5',
          s.address || 'India',
          s.status || 'approved',
          s.verified !== undefined ? s.verified : true,
          s.rating || 5.0,
          s.review_count || 0,
          s.total_sales || 0,
          s.total_revenue || 0,
          s.balance || 0,
          JSON.stringify(s.bank_details || {}),
          s.avatar || '',
          s.logo || '',
          s.description || '',
          s.created_at || new Date().toISOString()
        ]);
      }
      console.log('  ✅ Sellers seeded successfully.');
    }

    // 2. Enhance Products Table
    console.log('📦 Enhancing products table with complete eCommerce attributes...');
    await client.query(`
      ALTER TABLE products
        ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100),
        ADD COLUMN IF NOT EXISTS category_name VARCHAR(150),
        ADD COLUMN IF NOT EXISTS child_category VARCHAR(100),
        ADD COLUMN IF NOT EXISTS department VARCHAR(100),
        ADD COLUMN IF NOT EXISTS brand VARCHAR(100),
        ADD COLUMN IF NOT EXISTS mrp NUMERIC(12,2),
        ADD COLUMN IF NOT EXISTS stock_quantity INT DEFAULT 25,
        ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS is_bestseller BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS deal_type VARCHAR(50),
        ADD COLUMN IF NOT EXISTS seller_id VARCHAR(100) DEFAULT 'seller-1',
        ADD COLUMN IF NOT EXISTS seller_name VARCHAR(255) DEFAULT 'GoMo Verified Partner',
        ADD COLUMN IF NOT EXISTS reviews_count INT DEFAULT 0;
    `);

    // Sync all products from products.json
    const productsData = readJsonFile('products.json', []);
    console.log(`  Updating & syncing ${productsData.length} products with complete attributes...`);
    for (const p of productsData) {
      const pid = p.id || p.product_id;
      const price = Number(p.price) || 0;
      const mrp = Number(p.mrp || p.original_price) || Math.round(price * 1.3);
      const stock = Number(p.stock_quantity ?? p.stock ?? 25);
      const isBestseller = Boolean(p.is_bestseller || (p.badge && p.badge.toLowerCase().includes('bestseller')));
      const isFeatured = Boolean(p.is_featured);

      await client.query(`
        INSERT INTO products (
          id, title, name, description, category, category_slug, category_name, subcategory, child_category,
          department, brand, price, original_price, mrp, discount_percentage, rating, rating_count, reviews_count,
          stock, stock_quantity, in_stock, is_active, is_featured, is_bestseller, badge, deal_type, seller_id, seller_name,
          thumbnail, images, tags, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13, $14, $15, $16, $17, $18,
          $19, $20, $21, $22, $23, $24, $25, $26, $27, $28,
          $29, $30, $31, $32
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          category_slug = EXCLUDED.category_slug,
          category_name = EXCLUDED.category_name,
          subcategory = EXCLUDED.subcategory,
          child_category = EXCLUDED.child_category,
          department = EXCLUDED.department,
          brand = EXCLUDED.brand,
          price = EXCLUDED.price,
          original_price = EXCLUDED.original_price,
          mrp = EXCLUDED.mrp,
          discount_percentage = EXCLUDED.discount_percentage,
          rating = EXCLUDED.rating,
          reviews_count = EXCLUDED.reviews_count,
          stock_quantity = EXCLUDED.stock_quantity,
          in_stock = EXCLUDED.in_stock,
          is_active = EXCLUDED.is_active,
          is_featured = EXCLUDED.is_featured,
          is_bestseller = EXCLUDED.is_bestseller,
          badge = EXCLUDED.badge,
          deal_type = EXCLUDED.deal_type,
          seller_id = EXCLUDED.seller_id,
          seller_name = EXCLUDED.seller_name,
          thumbnail = EXCLUDED.thumbnail,
          images = EXCLUDED.images,
          tags = EXCLUDED.tags;
      `, [
        pid,
        p.title || p.name,
        p.name || p.title,
        p.description || '',
        p.category || 'clothing',
        p.category_slug || p.category || 'clothing',
        p.category_name || p.category || 'General',
        p.subcategory || '',
        p.childCategory || '',
        p.department || p.section || '',
        p.brand || 'GoMo Curated',
        price,
        p.original_price || mrp,
        mrp,
        p.discount_percentage || 0,
        p.rating || 4.5,
        p.rating_count || p.reviews_count || 10,
        p.reviews_count || p.rating_count || 10,
        stock,
        stock,
        stock > 0,
        p.is_active !== undefined ? p.is_active : true,
        isFeatured,
        isBestseller,
        p.badge || (isBestseller ? 'Bestseller' : ''),
        p.deal_type || '',
        p.seller_id || 'seller-1',
        p.seller_name || 'GoMo Verified Partner',
        p.thumbnail || (Array.isArray(p.images) ? p.images[0] : ''),
        Array.isArray(p.images) ? p.images : (p.thumbnail ? [p.thumbnail] : []),
        Array.isArray(p.tags) ? p.tags : [],
        p.created_at || new Date().toISOString()
      ]);
    }
    console.log('  ✅ Products synced.');

    // 3. Enhance Orders Table
    console.log('📦 Enhancing orders table...');
    await client.query(`
      ALTER TABLE orders
        ADD COLUMN IF NOT EXISTS subtotal NUMERIC(12,2) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS tax NUMERIC(10,2) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Confirmed',
        ADD COLUMN IF NOT EXISTS tracking JSONB DEFAULT '[]'::JSONB,
        ADD COLUMN IF NOT EXISTS delivery_address JSONB DEFAULT '{}'::JSONB,
        ADD COLUMN IF NOT EXISTS courier_partner VARCHAR(100) DEFAULT 'BlueDart Express',
        ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(100),
        ADD COLUMN IF NOT EXISTS estimated_delivery TIMESTAMP WITH TIME ZONE,
        ADD COLUMN IF NOT EXISTS seller_id VARCHAR(100),
        ADD COLUMN IF NOT EXISTS seller_name VARCHAR(255),
        ADD COLUMN IF NOT EXISTS customer_phone VARCHAR(50);
    `);

    // Sync Orders
    const ordersData = readJsonFile('orders.json', []);
    console.log(`  Syncing ${ordersData.length} orders...`);
    for (const o of ordersData) {
      await client.query(`
        INSERT INTO orders (
          id, order_number, user_id, customer_name, customer_email, customer_phone,
          items, total_amount, subtotal, tax, discount_amount, shipping_fee,
          payment_method, payment_status, order_status, status,
          shipping_address, delivery_address, tracking, courier_partner, tracking_number,
          seller_id, seller_name, created_at, estimated_delivery
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
        ON CONFLICT (id) DO UPDATE SET
          status = EXCLUDED.status,
          order_status = EXCLUDED.order_status,
          tracking = EXCLUDED.tracking,
          payment_status = EXCLUDED.payment_status;
      `, [
        o.id || o.order_id,
        o.order_number || o.id,
        o.userId || o.customer_id || 'usr-1',
        o.customer_name || 'Customer',
        o.customer_email || 'customer@gomodeals.com',
        o.customer_phone || '+91 98450 12345',
        JSON.stringify(o.items || []),
        o.total_amount || 0,
        o.subtotal || o.total_amount || 0,
        o.tax || 0,
        o.discount_amount || 0,
        o.shipping_fee || 0,
        o.payment_method || 'UPI / Card',
        o.payment_status || 'Paid',
        o.status || 'Confirmed',
        o.status || 'Confirmed',
        JSON.stringify(o.shipping_address || o.delivery_address || {}),
        JSON.stringify(o.delivery_address || o.shipping_address || {}),
        JSON.stringify(o.tracking || []),
        o.courier_partner || 'BlueDart Express',
        o.tracking_number || '',
        o.seller_id || (o.items && o.items[0]?.seller_id) || 'seller-1',
        o.seller_name || (o.items && o.items[0]?.seller_name) || 'GoMo Verified Partner',
        o.created_at || new Date().toISOString(),
        o.estimated_delivery ? new Date(o.estimated_delivery) : null
      ]);
    }
    console.log('  ✅ Orders synced.');

    // 4. Create Reviews Table
    console.log('📦 Setting up reviews table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(100) PRIMARY KEY,
        review_id VARCHAR(100),
        product_id VARCHAR(100) NOT NULL,
        user_name VARCHAR(255) NOT NULL DEFAULT 'Verified Buyer',
        rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
        comment TEXT,
        verified BOOLEAN DEFAULT TRUE,
        status VARCHAR(50) DEFAULT 'approved',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
    `);

    // Sync Reviews
    const reviewsData = readJsonFile('reviews.json', {});
    let reviewCount = 0;
    for (const [prodId, revList] of Object.entries(reviewsData)) {
      if (Array.isArray(revList)) {
        for (const r of revList) {
          reviewCount++;
          await client.query(`
            INSERT INTO reviews (id, review_id, product_id, user_name, rating, comment, verified, status, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (id) DO NOTHING;
          `, [
            r.id || `rev-${prodId}-${reviewCount}`,
            r.review_id || r.id,
            prodId,
            r.user_name || r.user || 'Verified Buyer',
            r.rating || 5,
            r.comment || '',
            r.verified !== undefined ? r.verified : true,
            r.status || 'approved',
            r.created_at || new Date().toISOString()
          ]);
        }
      }
    }
    console.log(`  ✅ Synced ${reviewCount} reviews into reviews table.`);

    // 5. Create Carts & Wishlists Tables
    console.log('📦 Setting up persistent carts and wishlists tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS carts (
        user_id VARCHAR(100) PRIMARY KEY,
        items JSONB DEFAULT '[]'::JSONB,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS wishlists (
        user_id VARCHAR(100) PRIMARY KEY,
        items JSONB DEFAULT '[]'::JSONB,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✅ Carts & Wishlists tables ready.');

    // 6. Create Support Tickets and VOC Tables
    console.log('📦 Setting up support tickets and VOC tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100),
        customer_name VARCHAR(255),
        customer_email VARCHAR(255),
        subject VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT 'general',
        message TEXT,
        status VARCHAR(50) DEFAULT 'open',
        priority VARCHAR(50) DEFAULT 'normal',
        responses JSONB DEFAULT '[]'::JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS voc_inquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        order_number VARCHAR(100),
        category VARCHAR(100) DEFAULT 'general',
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✅ Support tickets & VOC tables ready.');

    console.log('\n======================================================');
    console.log('  🎉 100% SUPABASE DATABASE SETUP & SYNC COMPLETE!');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await client.end();
  }
}

runFullMigration();
