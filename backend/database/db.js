import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory storage cache
const DB = {
  products: [],
  categories: [],
  orders: [],
  users: [],
  reviews: {},
  coupons: [],
  banners: [],
  homepage_config: {},
  rankings: { showcase: [], open: [], admin: [] },
  addresses: [],
  carts: {},
  wishlists: {},
  shared_wishlists: {},
  sellers: [],
  voc_inquiries: [],
  support_tickets: [],
  payouts: []
};

/**
 * Atomic write helper to safely write JSON files without risk of corrupting on sudden termination
 */
export function saveCollection(collectionName) {
  try {
    const filePath = path.join(DATA_DIR, `${collectionName}.json`);
    const tempPath = path.join(DATA_DIR, `${collectionName}.tmp`);
    const data = JSON.stringify(DB[collectionName] ?? [], null, 2);
    fs.writeFileSync(tempPath, data, 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.error(`[DB] Error persisting collection "${collectionName}":`, err.message);
    return false;
  }
}

/**
 * Load collection from disk or fallback
 */
function loadCollection(collectionName, fallback) {
  const filePath = path.join(DATA_DIR, `${collectionName}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`[DB] Failed to read ${collectionName}.json, using fallback.`, e.message);
      return fallback;
    }
  }
  return fallback;
}

/**
 * Initialize and seed database if files are missing
 */
export async function initDatabase() {
  console.log('[DB] Initializing real-time persistent database...');

  // 1. Check if products exist; if not, import and seed from frontend catalog
  let products = loadCollection('products', null);
  if (!products || !Array.isArray(products) || products.length === 0) {
    console.log('[DB] Seeding products catalog from curated store datasets...');
    products = await seedProducts();
    DB.products = products;
    saveCollection('products');
  } else {
    // Ensure all products have seller association
    let modified = false;
    for (const p of products) {
      if (!p.seller_id) {
        const cat = (p.category || '').toLowerCase();
        if (cat === 'pooja-items') {
          p.seller_id = 'seller-1';
          p.seller_name = 'Divine Brass & Temple Arts';
        } else if (cat === 'ethnic-wear' || cat === 'clothing' || cat === 'western-wear') {
          p.seller_id = 'seller-2';
          p.seller_name = 'Heritage Weaves & Silks';
        } else {
          p.seller_id = 'seller-3';
          p.seller_name = 'SmartTech Audio & Wearables';
        }
        modified = true;
      }
    }
    DB.products = products;
    if (modified) saveCollection('products');
  }
  console.log(`[DB] Loaded ${DB.products.length} products.`);

  // 2. Categories
  let categories = loadCollection('categories', null);
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    categories = seedCategories();
    DB.categories = categories;
    saveCollection('categories');
  } else {
    DB.categories = categories;
  }
  console.log(`[DB] Loaded ${DB.categories.length} categories.`);

  // 3. Orders
  let orders = loadCollection('orders', null);
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    orders = seedOrders();
    DB.orders = orders;
    saveCollection('orders');
  } else {
    let modified = false;
    // Ensure order 10025 exists
    if (!orders.some(o => o.id === 'GMD-ORD-10025' || o.order_id === 'GMD-ORD-10025')) {
      const seeded = seedOrders();
      const o25 = seeded.find(s => s.id === 'GMD-ORD-10025');
      if (o25) {
        orders.unshift(o25);
        modified = true;
      }
    }
    // Ensure each order and its items have seller_id
    for (const o of orders) {
      if (!o.seller_id) {
        o.seller_id = (o.items && o.items[0]?.seller_id) || (o.id === 'GMD-ORD-10025' ? 'seller-1' : (o.id === 'GMD-ORD-10023' ? 'seller-2' : 'seller-1'));
        o.seller_name = o.seller_id === 'seller-1' ? 'Divine Brass & Temple Arts' : 'Heritage Weaves & Silks';
        modified = true;
      }
      if (Array.isArray(o.items)) {
        for (const it of o.items) {
          if (!it.seller_id) {
            it.seller_id = o.seller_id;
            it.seller_name = o.seller_name;
            modified = true;
          }
        }
      }
    }
    DB.orders = orders;
    if (modified) saveCollection('orders');
  }
  console.log(`[DB] Loaded ${DB.orders.length} orders.`);

  // 4. Users
  let users = loadCollection('users', null);
  if (!users || !Array.isArray(users)) {
    users = seedUsers();
    DB.users = users;
    saveCollection('users');
  } else {
    DB.users = users;
  }

  // 5. Reviews
  let reviews = loadCollection('reviews', null);
  if (!reviews || typeof reviews !== 'object') {
    reviews = seedReviews();
    DB.reviews = reviews;
    saveCollection('reviews');
  } else {
    DB.reviews = reviews;
  }

  // 6. Coupons
  let coupons = loadCollection('coupons', null);
  if (!coupons || !Array.isArray(coupons)) {
    coupons = seedCoupons();
    DB.coupons = coupons;
    saveCollection('coupons');
  } else {
    DB.coupons = coupons;
  }

  // 7. Banners
  let banners = loadCollection('banners', null);
  if (!banners || !Array.isArray(banners)) {
    banners = seedBanners();
    DB.banners = banners;
    saveCollection('banners');
  } else {
    DB.banners = banners;
  }

  // 8. Homepage Config
  let homepage_config = loadCollection('homepage_config', null);
  if (!homepage_config || typeof homepage_config !== 'object' || Object.keys(homepage_config).length === 0) {
    homepage_config = seedHomepageConfig();
    DB.homepage_config = homepage_config;
    saveCollection('homepage_config');
  } else {
    DB.homepage_config = homepage_config;
  }

  // 9. Rankings
  let rankings = loadCollection('rankings', null);
  if (!rankings || !rankings.showcase) {
    rankings = seedRankings();
    DB.rankings = rankings;
    saveCollection('rankings');
  } else {
    DB.rankings = rankings;
  }

  // 10. Addresses
  let addresses = loadCollection('addresses', null);
  if (!addresses || !Array.isArray(addresses)) {
    addresses = seedAddresses();
    DB.addresses = addresses;
    saveCollection('addresses');
  } else {
    DB.addresses = addresses;
  }

  // 11. Carts & Wishlists
  DB.carts = loadCollection('carts', {});
  DB.wishlists = loadCollection('wishlists', {});
  DB.shared_wishlists = loadCollection('shared_wishlists', {});

  // 12. Sellers
  let sellers = loadCollection('sellers', null);
  if (!sellers || !Array.isArray(sellers) || sellers.length === 0) {
    sellers = seedSellers();
    DB.sellers = sellers;
    saveCollection('sellers');
  } else {
    DB.sellers = sellers;
  }
  console.log(`[DB] Loaded ${DB.sellers.length} sellers.`);

  // 13. Voice of Customer (VOC) Inquiries
  let voc_inquiries = loadCollection('voc_inquiries', null);
  if (!voc_inquiries || !Array.isArray(voc_inquiries) || voc_inquiries.length === 0) {
    voc_inquiries = seedVocInquiries();
    DB.voc_inquiries = voc_inquiries;
    saveCollection('voc_inquiries');
  } else {
    DB.voc_inquiries = voc_inquiries;
  }
  console.log(`[DB] Loaded ${DB.voc_inquiries.length} Voice of Customer inquiries.`);

  // 14. Support Tickets (Issues & Escalations)
  let support_tickets = loadCollection('support_tickets', null);
  if (!support_tickets || !Array.isArray(support_tickets) || support_tickets.length === 0) {
    support_tickets = seedSupportTickets();
    DB.support_tickets = support_tickets;
    saveCollection('support_tickets');
  } else {
    DB.support_tickets = support_tickets;
  }
  console.log(`[DB] Loaded ${DB.support_tickets.length} Support Tickets.`);

  // 15. Merchant Payouts & Withdrawals
  let payouts = loadCollection('payouts', null);
  if (!payouts || !Array.isArray(payouts) || payouts.length === 0) {
    payouts = seedPayouts();
    DB.payouts = payouts;
    saveCollection('payouts');
  } else {
    DB.payouts = payouts;
  }
  console.log(`[DB] Loaded ${DB.payouts.length} Merchant Payouts.`);

  console.log('[DB] Database initialization complete & fully persisted.');
  return DB;
}

export function getDB() {
  return DB;
}

// ==========================================
// SEED GENERATORS
// ==========================================

async function seedProducts() {
  let sampleProds = [];
  let suppProds = [];
  let genProds = [];

  try {
    const s = await import('../../frontend/src/data/sampleProducts.js');
    sampleProds = s.SAMPLE_PRODUCTS || [];
  } catch (e) {
    console.warn('[DB] Could not load sampleProducts.js:', e.message);
  }

  try {
    const sup = await import('../../frontend/src/data/supplementalProducts.js');
    suppProds = sup.SUPPLEMENTAL_PRODUCTS || [];
  } catch (e) {
    console.warn('[DB] Could not load supplementalProducts.js:', e.message);
  }

  try {
    const g = await import('../../frontend/src/data/generatedProducts.js');
    genProds = g.GENERATED_PRODUCTS || [];
  } catch (e) {
    console.warn('[DB] Could not load generatedProducts.js:', e.message);
  }

  const combined = [...suppProds, ...sampleProds, ...genProds];
  const seenIds = new Set();
  const deduped = [];

  const CATEGORY_BRAND_MAP = {
    'electronics': ['Apple', 'Sony', 'Samsung', 'Dell', 'Canon', 'Bose'],
    'gadgets': ['Apple', 'boAt', 'Noise', 'Fire-Boltt', 'Sony', 'JBL', 'Samsung'],
    'clothing': ['Raymond', "Levi's", 'Zara', 'H&M', 'Fabindia', 'Tommy Hilfiger', 'Calvin Klein'],
    'western-wear': ['Buda Jeans Co', "Levi's", 'Zara', 'H&M', 'Vero Moda', 'Roadster', 'MANGO'],
    'ethnic-wear': ['Biba', 'W for Woman', 'Fabindia', 'Manyavar', 'Global Desi', 'Aurelia'],
    'footwear': ['Nike', 'Adidas', 'Puma', 'Woodland', 'Red Tape', 'Skechers', 'Bata', 'Clarks'],
    'accessories': ['Baggit', 'Lavie', 'Wildcraft', 'Ray-Ban', 'Fastrack', 'Fossil'],
    'jewellery': ['Titan', 'Giva', 'Mia by Tanishq', 'Fossil', 'Zaveri Pearls'],
    'home-living': ['IKEA', 'Bombay Dyeing', 'Prestige', 'Urban Ladder', 'Philips'],
    'beauty': ["L'Oréal", 'MAC', 'Forest Essentials', 'Kama Ayurveda', 'The Ordinary'],
    'pooja-items': ['Vedic Vaani', 'Cycle Pure', 'Soulflower', 'Shubh Labh'],
    'gifts': ['Ferns N Petals', 'Archies', 'Swarovski', 'Chumbak'],
    'healthy-foods': ['True Elements', 'Organic India', '24 Mantra', 'Saffola', 'Kapiva']
  };

  for (let idx = 0; idx < combined.length; idx++) {
    const p = combined[idx];
    const pid = String(p.product_id || p.id || `gmd-prod-${idx}`);
    if (seenIds.has(pid)) continue;
    seenIds.add(pid);

    const categoryKey = (p.category || p.category_name || 'clothing').toLowerCase();
    const brandsList = CATEGORY_BRAND_MAP[categoryKey] || ['GoMo Select', 'Boutique Collection'];
    const brand = p.brand || brandsList[idx % brandsList.length];

    const price = Number(p.price) || 999;
    const discountMult = 1.25 + ((idx % 4) * 0.1);
    const mrp = p.mrp ? Number(p.mrp) : Math.round(price * discountMult);
    const discount_percentage = p.discount_percentage
      ? Number(p.discount_percentage)
      : Math.max(10, Math.round(((mrp - price) / mrp) * 100));

    const stock = p.stock_quantity !== undefined ? Number(p.stock_quantity) : (20 + (idx % 35));
    const rating = p.rating ? Number(p.rating) : Number((4.2 + ((idx % 8) * 0.1)).toFixed(1));
    const reviews_count = p.reviews_count ? Number(p.reviews_count) : (35 + ((idx * 17) % 210));

    const thumb = p.thumbnail || p.image || (p.pi_images && p.pi_images[0]?.image_url) ||
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

    const images = Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : (p.pi_images ? p.pi_images.map(img => typeof img === 'string' ? img : img.image_url) : [thumb]);

    deduped.push({
      ...p,
      id: pid,
      product_id: pid,
      name: p.name || p.title || `GoMo Curated Item ${idx + 1}`,
      title: p.title || p.name || `GoMo Curated Item ${idx + 1}`,
      brand,
      category: p.category || 'clothing',
      category_name: p.category_name || (p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1) : 'Apparel'),
      subcategory: p.subcategory || 'all',
      price,
      mrp,
      discount_percentage,
      stock_quantity: stock,
      in_stock: stock > 0,
      is_active: p.is_active !== undefined ? p.is_active : true,
      rating,
      reviews_count,
      thumbnail: thumb,
      images,
      description: p.description || 'Authentic single-vendor selection with premium materials, high durability, and direct brand warranty.',
      features: p.features || [
        `Guaranteed 100% genuine product certified by ${brand}`,
        'Passed comprehensive quality inspection standards',
        'Direct brand warranty and 7-day hassle-free return window',
        'Eco-friendly protective transit packaging'
      ],
      specifications: p.specifications || {
        'Category': p.category_name || p.category || 'Store Collection',
        'Brand': brand,
        'SKU': `GMC-${pid}`,
        'Condition': 'Brand New, Sealed',
        'Origin': 'India',
        'Warranty': '1 Year Standard Brand Warranty'
      },
      delivery_info: p.delivery_info || {
        free_delivery: price >= 499,
        estimated_days: (idx % 2 === 0) ? 2 : 3,
        return_days: 7,
        cod_available: true,
        courier: 'BlueDart Express'
      },
      deal_type: p.deal_type || ((idx % 3 === 0) ? 'flash_deal' : ((idx % 5 === 0) ? 'clearance' : 'regular')),
      is_featured: p.is_featured || (idx % 6 === 0),
      is_bestseller: p.is_bestseller || (idx % 4 === 0),
      created_at: new Date(Date.now() - (idx * 3600000)).toISOString()
    });
  }

  return deduped;
}

function seedCategories() {
  return [
  {
    "id": "western-wear",
    "slug": "western-wear",
    "name": "Western Wear",
    "description": "Dresses, shirts, jeans, tops, and coordinated sets",
    "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "dresses",
      "tops",
      "jeans-jeggings",
      "shirts",
      "t-shirts",
      "trousers-pants",
      "jackets",
      "co-ord-sets"
    ]
  },
  {
    "id": "clothing",
    "slug": "clothing",
    "name": "Clothing & Apparel",
    "description": "Everyday, western & traditional apparel",
    "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "shirts",
      "t-shirts",
      "jeans-jeggings",
      "kurtas",
      "sarees",
      "dresses",
      "track-pants"
    ]
  },
  {
    "id": "ethnic-wear",
    "slug": "ethnic-wear",
    "name": "Ethnic Wear",
    "description": "Kurtas, lehengas, suit sets, and sarees",
    "image_url": "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "sarees",
      "kurtas",
      "kurta-suit-sets",
      "lehenga-choli-sets",
      "nehru-jackets"
    ]
  },
  {
    "id": "footwear",
    "slug": "footwear",
    "name": "Footwear",
    "description": "Sneakers, boots, sandals, casual & sports shoes",
    "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "sneakers",
      "casual-shoes",
      "formal-shoes",
      "sandals",
      "sports-shoes"
    ]
  },
  {
    "id": "accessories",
    "slug": "accessories",
    "name": "Accessories",
    "description": "Backpacks, belts, handbags, sunglasses & watches",
    "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "handbags",
      "wallets",
      "belts",
      "sunglasses",
      "watches",
      "backpacks"
    ]
  },
  {
    "id": "gadgets",
    "slug": "gadgets",
    "name": "Gadgets & Electronics",
    "description": "Smart wearables, headphones & wireless audio",
    "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "headphones",
      "smartwatches",
      "earbuds",
      "speakers",
      "chargers-cables"
    ]
  },
  {
    "id": "home-living",
    "slug": "home-living",
    "name": "Home & Living",
    "description": "Bedding, decor, dinnerware, and home lighting",
    "image_url": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "bedsheets",
      "cushion-covers",
      "wall-decor",
      "dinner-sets",
      "lighting"
    ]
  },
  {
    "id": "beauty",
    "slug": "beauty",
    "name": "Beauty & Grooming",
    "description": "Cosmetics, skincare, fragrances & wellness",
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "skincare",
      "haircare",
      "fragrances",
      "makeup",
      "bath-body"
    ]
  },
  {
    "id": "jewellery",
    "slug": "jewellery",
    "name": "Jewellery",
    "description": "Fashion jewellery, silver sterling, earrings and necklaces",
    "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "earrings",
      "necklaces",
      "bracelets",
      "rings",
      "silver-jewellery"
    ]
  },
  {
    "id": "pooja-items",
    "slug": "pooja-items",
    "name": "Pooja Items",
    "description": "Sacred brass diyas, idols, loban, camphor & samagri",
    "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "brass-diyas",
      "incense-dhoop",
      "pooja-thali",
      "idols",
      "havan-samagri"
    ]
  },
  {
    "id": "kids",
    "slug": "kids",
    "name": "Kids & Baby",
    "description": "Kids apparel, toys, and nursery essentials",
    "image_url": "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "boys-clothing",
      "girls-clothing",
      "baby-clothes",
      "toys-games"
    ]
  },
  {
    "id": "healthy-foods",
    "slug": "healthy-foods",
    "name": "Healthy Foods & Pantry",
    "description": "Organic raw honey, wild grains, dry fruits and superfoods",
    "image_url": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "organic-foods",
      "dry-fruits",
      "honey",
      "healthy-snacks"
    ]
  },
  {
    "id": "grocery",
    "slug": "grocery",
    "name": "Grocery & Staples",
    "description": "Daily staples, premium grains, pulses, and cold-pressed oils",
    "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "organic-foods",
      "atta-flour",
      "healthy-snacks",
      "spices"
    ]
  },
  {
    "id": "stationery",
    "slug": "stationery",
    "name": "Stationery & Office",
    "description": "Notebooks, journals, executive pens, and desk supplies",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "spiral-notebooks",
      "diaries-planners",
      "pens-pencils",
      "desk-accessories"
    ]
  },
  {
    "id": "gifts",
    "slug": "gifts",
    "name": "Gifts & Festive Hampers",
    "description": "Curated premium gift boxes and seasonal hampers",
    "image_url": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    "is_active": true,
    "subcategories": [
      "festive-gifts",
      "aroma-candles",
      "gift-sets"
    ]
  }
];
}

function seedOrders() {
  const now = Date.now();
  return [
    {
      id: 'GMD-ORD-10025',
      order_id: 'GMD-ORD-10025',
      order_number: 'GOMO-2026-10025',
      userId: 'usr-1',
      customer_id: 'usr-1',
      customer_name: 'Priya Sharma',
      customer_email: 'priya.sharma@example.com',
      customer_phone: '+91 98450 12345',
      seller_id: 'seller-1',
      seller_name: 'Divine Brass & Temple Arts',
      items: [
        {
          id: 'pooja-101',
          product_id: 'pooja-101',
          name: 'Pure Brass Lotus Diya with Bell (Set of 2)',
          price: 899,
          quantity: 1,
          seller_id: 'seller-1',
          seller_name: 'Divine Brass & Temple Arts',
          thumbnail: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&q=80',
          variant_value: 'Solid Brass / Medium'
        }
      ],
      total_amount: 899,
      subtotal: 899,
      shipping_fee: 0,
      tax: 45,
      status: 'Delivered',
      payment_method: 'UPI',
      payment_status: 'Paid',
      courier_partner: 'BlueDart Express',
      tracking_number: 'BLU91823719',
      created_at: new Date(now - 14400000).toISOString(),
      delivered_at: new Date(now - 3600000).toISOString(),
      shipping_address: {
        name: 'Priya Sharma',
        street: 'Plot 42, 4th Main, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        phone: '+91 98450 12345'
      },
      tracking: [
        { step: 'Order Placed', status: 'completed', time: new Date(now - 14400000).toISOString(), note: 'Confirmed' },
        { step: 'Quality Check & Packing', status: 'completed', time: new Date(now - 10800000).toISOString(), note: 'Handcrafted inspection passed' },
        { step: 'Dispatched via BlueDart', status: 'completed', time: new Date(now - 7200000).toISOString(), note: 'Dispatched from Temple Arts Hub' },
        { step: 'Delivered', status: 'completed', time: new Date(now - 3600000).toISOString(), note: 'Handed over at doorstep' }
      ]
    },
    {
      id: 'GMD-ORD-10024',
      order_id: 'GMD-ORD-10024',
      order_number: 'GOMO-2026-10024',
      userId: 'usr-1',
      customer_id: 'usr-1',
      customer_name: 'Priya Sharma',
      customer_email: 'priya.sharma@example.com',
      customer_phone: '+91 98450 12345',
      seller_id: 'seller-2',
      seller_name: 'Heritage Weaves & Silks',
      items: [
        {
          id: 'men-101',
          product_id: 'men-101',
          name: 'Men Slim Fit Pure Linen Casual Shirt',
          price: 1299,
          quantity: 1,
          seller_id: 'seller-2',
          seller_name: 'Heritage Weaves & Silks',
          thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
          variant_value: 'Navy Blue / L'
        }
      ],
      total_amount: 1299,
      subtotal: 1299,
      shipping_fee: 0,
      tax: 65,
      status: 'In Transit',
      payment_method: 'Card / UPI',
      payment_status: 'Paid',
      courier_partner: 'BlueDart Express',
      tracking_number: 'BLU84920194',
      created_at: new Date(now - 7200000).toISOString(),
      estimated_delivery: new Date(now + 86400000).toISOString(),
      shipping_address: {
        name: 'Priya Sharma',
        street: 'Plot 42, 4th Main, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        phone: '+91 98450 12345'
      },
      tracking: [
        { step: 'Order Placed', status: 'completed', time: new Date(now - 7200000).toISOString(), note: 'Payment verified and order confirmed' },
        { step: 'Processing & Quality Check', status: 'completed', time: new Date(now - 5400000).toISOString(), note: 'Eco packaging and barcode scan complete' },
        { step: 'Shipped via BlueDart', status: 'completed', time: new Date(now - 3600000).toISOString(), note: 'Dispatched from Bengaluru Central Hub (AWB: BLU84920194)' },
        { step: 'Out for Delivery', status: 'in_transit', time: new Date(now - 600000).toISOString(), note: 'Courier executive assigned: Ramesh K. (+91 99012 34567)' },
        { step: 'Delivered', status: 'pending', note: 'Contactless OTP delivery at doorstep' }
      ]
    },
    {
      id: 'GMD-ORD-10023',
      order_id: 'GMD-ORD-10023',
      order_number: 'GOMO-2026-10023',
      userId: 'usr-1',
      customer_id: 'usr-1',
      customer_name: 'Priya Sharma',
      customer_email: 'priya.sharma@example.com',
      customer_phone: '+91 98450 12345',
      seller_id: 'seller-2',
      seller_name: 'Heritage Weaves & Silks',
      items: [
        {
          id: 'women-201',
          product_id: 'women-201',
          name: 'Handwoven Pure Kanjeevaram Silk Saree with Gold Zari',
          price: 4599,
          quantity: 1,
          seller_id: 'seller-2',
          seller_name: 'Heritage Weaves & Silks',
          thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'
        }
      ],
      total_amount: 4599,
      subtotal: 4599,
      shipping_fee: 0,
      tax: 230,
      status: 'Delivered',
      payment_method: 'UPI',
      payment_status: 'Paid',
      courier_partner: 'BlueDart Express',
      tracking_number: 'BLU73910542',
      created_at: new Date(now - 172800000).toISOString(),
      delivered_at: new Date(now - 86400000).toISOString(),
      shipping_address: {
        name: 'Priya Sharma',
        street: 'Plot 42, 4th Main, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        phone: '+91 98450 12345'
      },
      tracking: [
        { step: 'Order Placed', status: 'completed', time: new Date(now - 172800000).toISOString(), note: 'Order confirmed' },
        { step: 'Processing & Quality Check', status: 'completed', time: new Date(now - 150000000).toISOString(), note: 'Packaged' },
        { step: 'Shipped via BlueDart', status: 'completed', time: new Date(now - 120000000).toISOString(), note: 'Dispatched' },
        { step: 'Out for Delivery', status: 'completed', time: new Date(now - 90000000).toISOString(), note: 'Arrived at local hub' },
        { step: 'Delivered', status: 'completed', time: new Date(now - 86400000).toISOString(), note: 'Delivered to customer with OTP verification' }
      ]
    }
  ];
}

function seedUsers() {
  return [
    {
      id: 'usr-1',
      customer_id: 'usr-1',
      name: 'Priya Sharma',
      email: 'customer@gomodeals.com',
      password: 'password123',
      phone: '+91 98450 12345',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      is_active: true,
      created_at: '2026-01-10T08:00:00Z'
    },
    {
      id: 'admin-1',
      customer_id: 'admin-1',
      name: 'GoMo Admin Master',
      email: 'admin@gomodeals.com',
      password: 'adminpassword123',
      phone: '+91 98888 77777',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
      is_active: true,
      created_at: '2026-01-01T00:00:00Z'
    }
  ];
}

function seedReviews() {
  return {
    'men-101': [
      { id: 'rev-101', user_name: 'Aditi Sundaram', rating: 5, comment: 'Exceptional linen quality, cool and breathable for Indian summers.', verified: true, created_at: '2026-03-20T10:15:00Z' },
      { id: 'rev-102', user_name: 'Rohan Verma', rating: 4, comment: 'Great fit across chest and shoulders. Fast 24-hr delivery.', verified: true, created_at: '2026-03-24T14:20:00Z' }
    ],
    'women-201': [
      { id: 'rev-201', user_name: 'Ananya Roy', rating: 5, comment: 'Stunning silk luster and genuine gold zari. Everyone complimented me at the wedding.', verified: true, created_at: '2026-03-22T16:00:00Z' }
    ]
  };
}

function seedCoupons() {
  return [
    { code: 'GOMO50', discount: 50, min_spend: 499, description: 'Flat ₹50 Off on orders above ₹499', is_active: true },
    { code: 'FIRSTBUY', discount_percent: 15, max_discount: 300, min_spend: 599, description: '15% Off on your first boutique purchase', is_active: true },
    { code: 'FESTIVE20', discount_percent: 20, max_discount: 500, min_spend: 999, description: 'Festive Season 20% Special Discount', is_active: true },
    { code: 'FREESHIP', free_shipping: true, min_spend: 299, description: 'Zero Shipping Fee on any order above ₹299', is_active: true }
  ];
}

function seedBanners() {
  return [
    {
      id: 'b-1',
      banner_id: 'b-1',
      title: 'Grand Festive Silk Drop',
      subtitle: 'Up to 50% Off on Pure Kanjeevaram & Handcrafted Sarees',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80',
      image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80',
      link: '/collection/ethnic-wear',
      target_url: '/collection/ethnic-wear',
      is_active: true,
      badge: 'Boutique Exclusive'
    },
    {
      id: 'b-2',
      banner_id: 'b-2',
      title: 'Sartorial Men Linen Edit',
      subtitle: 'Tailored 100% Pure Linen Shirts & Straight Fit Denims',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1600&q=80',
      image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1600&q=80',
      link: '/collection/clothing?section=men',
      target_url: '/collection/clothing?section=men',
      is_active: true,
      badge: 'New Season'
    }
  ];
}

function seedHomepageConfig() {
  return {
    announcementText: 'FLASH SALE: Free Express Shipping on orders over ₹499 | Use Code GOMO50 for Flat ₹50 Off',
    heroHeadline: 'Curated Elegance, Guaranteed Authenticity',
    heroSubheadline: 'Explore thousands of verified single-vendor boutique deals with direct brand warranty and seamless doorstep returns.',
    featuredProductIds: ['men-101', 'women-201', 'kids-301'],
    dealOfTheDay: {
      productId: 'men-101',
      title: 'Men Slim Fit Pure Linen Casual Shirt',
      discountText: 'Special Flash Drop: 48% OFF Today',
      expiryHours: 14
    }
  };
}

function seedRankings() {
  return {
    showcase: [
      { id: 'rnk-1', brand: 'Raymond', category: 'Men Apparel', score: 98, votes: 1420, badge: '#1 Best Rated Brand', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80' },
      { id: 'rnk-2', brand: 'Fabindia', category: 'Ethnic Silk', score: 96, votes: 1290, badge: 'Heritage Choice', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
      { id: 'rnk-3', brand: "Levi's", category: 'Denims', score: 94, votes: 1150, badge: 'Popular Choice', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80' }
    ],
    open: [
      { id: 'comp-1', title: 'Best Ethnic Wear Brand 2026', brands: [{ id: 'b1', name: 'Fabindia', votes: 540 }, { id: 'b2', name: 'Biba', votes: 480 }, { id: 'b3', name: 'Manyavar', votes: 390 }] }
    ],
    admin: []
  };
}

function seedAddresses() {
  return [
    {
      id: 'addr-1',
      name: 'Priya Sharma (Home)',
      street: 'Plot 42, 4th Main, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 98450 12345',
      is_default: true
    },
    {
      id: 'addr-2',
      name: 'Priya Sharma (Work / Studio)',
      street: 'Prestige Tech Park, Whitefield Main Rd',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
      phone: '+91 98450 12345',
      is_default: false
    }
  ];
}

function seedSellers() {
  return [
    {
      id: 'seller-1',
      seller_id: 'seller-1',
      store_name: 'Divine Brass & Temple Arts',
      owner_name: 'Rajesh Sharma',
      email: 'seller@gomodeals.com',
      password: 'sellerpassword123',
      phone: '+91 98765 43210',
      category: 'pooja-items',
      gstin: '29ABCDE1234F1Z5',
      address: '12 Temple Street, Malleshwaram, Bengaluru, Karnataka 560003',
      status: 'approved',
      verified: true,
      rating: 4.9,
      review_count: 84,
      total_sales: 142,
      total_revenue: 184500,
      balance: 45280,
      bank_details: {
        account_name: 'Divine Brass Enterprises',
        account_number: '918237465012',
        ifsc_code: 'HDFC0001234',
        bank_name: 'HDFC Bank'
      },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      logo: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=200&q=80',
      description: 'Handcrafted solid brass diyas, traditional idols, and authenticated temple samagri kits straight from master artisan clusters.',
      created_at: '2026-01-15T08:00:00Z'
    },
    {
      id: 'seller-2',
      seller_id: 'seller-2',
      store_name: 'Heritage Weaves & Silks',
      owner_name: 'Meena Patel',
      email: 'heritage@gomodeals.com',
      password: 'sellerpassword123',
      phone: '+91 98450 67890',
      category: 'ethnic-wear',
      gstin: '24PQRST5678G2Z3',
      address: '45 Silk Loom Colony, Surat, Gujarat 395002',
      status: 'approved',
      verified: true,
      rating: 4.8,
      review_count: 112,
      total_sales: 230,
      total_revenue: 345000,
      balance: 78500,
      bank_details: {
        account_name: 'Heritage Weaves India',
        account_number: '827103948571',
        ifsc_code: 'ICIC0005678',
        bank_name: 'ICICI Bank'
      },
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
      logo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80',
      description: 'Certified Silk Mark pure Kanjeevaram and Banarasi handlooms direct from weaving cooperatives.',
      created_at: '2026-01-10T10:00:00Z'
    },
    {
      id: 'seller-3',
      seller_id: 'seller-3',
      store_name: 'SmartTech Audio & Wearables',
      owner_name: 'Vikram Singhania',
      email: 'tech@gomodeals.com',
      password: 'sellerpassword123',
      phone: '+91 99001 23456',
      category: 'electronics',
      gstin: '27XYZAB9876H3Z4',
      address: '88 Electronics Complex, Sector 18, Gurugram, Haryana 122001',
      status: 'approved',
      verified: true,
      rating: 4.7,
      review_count: 95,
      total_sales: 188,
      total_revenue: 412000,
      balance: 62400,
      bank_details: {
        account_name: 'SmartTech Retail LLP',
        account_number: '736281940562',
        ifsc_code: 'SBIN0004321',
        bank_name: 'State Bank of India'
      },
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
      logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
      description: 'Authorized direct distributor for high-performance audio, smartwatches, and fast wireless gadgets with 1-year brand warranty.',
      created_at: '2026-01-05T12:00:00Z'
    }
  ];
}

function seedVocInquiries() {
  const now = Date.now();
  return [
    {
      id: 'voc-101',
      inquiry_id: 'voc-101',
      order_id: 'GMD-ORD-10025',
      order_number: 'GOMO-2026-10025',
      product_id: 'pooja-101',
      product_name: 'Pure Brass Lotus Diya with Bell (Set of 2)',
      product_thumbnail: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&q=80',
      seller_id: 'seller-1',
      seller_name: 'Divine Brass & Temple Arts',
      customer_id: 'usr-1',
      customer_name: 'Priya Sharma',
      customer_email: 'priya.sharma@example.com',
      customer_phone: '+91 98450 12345',
      category: 'Item Quality / Finish',
      subject: 'Brass polish care instructions and small smudge',
      message: 'Hello Rajesh ji, received the lotus diya set yesterday. One diya has a slight tarnish on the outer petal. Could you advise the best cleaning pitambari mixture or send a replacement petal?',
      priority: 'medium',
      status: 'seller_replied',
      created_at: new Date(now - 36000000).toISOString(),
      updated_at: new Date(now - 18000000).toISOString(),
      conversation: [
        {
          id: 'msg-1',
          sender: 'customer',
          sender_name: 'Priya Sharma',
          message: 'Hello Rajesh ji, received the lotus diya set yesterday. One diya has a slight tarnish on the outer petal. Could you advise the best cleaning pitambari mixture or send a replacement petal?',
          timestamp: new Date(now - 36000000).toISOString()
        },
        {
          id: 'msg-2',
          sender: 'seller',
          sender_name: 'Divine Brass & Temple Arts',
          message: 'Namaste Priya ji! Thank you for choosing Divine Brass. Pure solid brass naturally reacts with humid air. We have dispatched a complimentary bottle of natural brass polishing organic lotion (AWB: BLU9182371) to your address today. Please wipe gently with a soft cotton cloth and it will shine like pure gold!',
          timestamp: new Date(now - 18000000).toISOString()
        }
      ],
      resolution_notes: 'Complimentary organic brass polishing kit dispatched via BlueDart'
    },
    {
      id: 'voc-102',
      inquiry_id: 'voc-102',
      order_id: 'GMD-ORD-10023',
      order_number: 'GOMO-2026-10023',
      product_id: 'women-201',
      product_name: 'Handwoven Pure Kanjeevaram Silk Saree with Gold Zari',
      product_thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
      seller_id: 'seller-2',
      seller_name: 'Heritage Weaves & Silks',
      customer_id: 'usr-1',
      customer_name: 'Priya Sharma',
      customer_email: 'priya.sharma@example.com',
      customer_phone: '+91 98450 12345',
      category: 'Care & Maintenance',
      subject: 'Dry clean recommendation & Silk Mark verification',
      message: 'Could you confirm if the saree can be ironed directly or if only steam press is recommended?',
      priority: 'low',
      status: 'resolved',
      created_at: new Date(now - 86400000).toISOString(),
      updated_at: new Date(now - 43200000).toISOString(),
      conversation: [
        {
          id: 'msg-3',
          sender: 'customer',
          sender_name: 'Priya Sharma',
          message: 'Could you confirm if the saree can be ironed directly or if only steam press is recommended?',
          timestamp: new Date(now - 86400000).toISOString()
        },
        {
          id: 'msg-4',
          sender: 'seller',
          sender_name: 'Heritage Weaves & Silks',
          message: 'Hello Priya, we strongly recommend delicate dry clean only and gentle steam ironing on reverse side with a thin cotton cloth placed over the zari to protect the gold luster.',
          timestamp: new Date(now - 43200000).toISOString()
        }
      ],
      resolution_notes: 'Care instructions provided to customer satisfaction'
    }
  ];
}

export function seedSupportTickets() {
  const now = Date.now();
  return [
    {
      id: 'TKT-10081',
      ticket_id: 'TKT-10081',
      author_type: 'seller',
      author_id: 'seller-1',
      author_name: 'Divine Brass & Temple Arts',
      order_id: 'GMD-ORD-10021',
      order_number: 'GOMO-2026-10021',
      product_name: 'Handcrafted Brass Peacock Pooja Diya',
      category: 'shipping_performance',
      subject: 'Courier pickup delayed for Order GOMO-2026-10021',
      description: 'Carrier BlueDart pickup executive arrived after evening cutoff time. Requesting LDR (Late Delivery Rate) waiver since parcel was packed within 4 hours of order confirmation.',
      priority: 'high',
      status: 'under_review',
      resolution_note: 'Investigation opened with BlueDart regional hub. SLA waiver logged.',
      created_at: new Date(now - 172800000).toISOString(),
      updated_at: new Date(now - 86400000).toISOString()
    },
    {
      id: 'TKT-10082',
      ticket_id: 'TKT-10082',
      author_type: 'seller',
      author_id: 'seller-1',
      author_name: 'Divine Brass & Temple Arts',
      order_id: null,
      order_number: null,
      product_name: 'Brass Pooja Thali Set',
      category: 'pdt_policy_compliance',
      subject: 'Clarification regarding hallmark certification upload',
      description: 'Uploaded artisan brass purity certificate under PDT Compliance tab. Requesting confirmation of approval status.',
      priority: 'medium',
      status: 'resolved',
      resolution_note: 'Certificate verified and registered under Product Policy Compliance.',
      created_at: new Date(now - 345600000).toISOString(),
      updated_at: new Date(now - 172800000).toISOString()
    },
    {
      id: 'TKT-10083',
      ticket_id: 'TKT-10083',
      author_type: 'customer',
      author_id: 'usr-1',
      author_name: 'Rajesh Kumar',
      order_id: 'GMD-ORD-10021',
      order_number: 'GOMO-2026-10021',
      product_name: 'Handcrafted Brass Peacock Pooja Diya',
      category: 'shipping_delay',
      subject: 'Escalation for expedited delivery before festival',
      description: 'Placed order for upcoming festival. Want to ensure delivery is completed by Friday as requested.',
      priority: 'medium',
      status: 'resolved',
      resolution_note: 'Courier expedited to Priority Express; delivery confirmed.',
      created_at: new Date(now - 86400000).toISOString(),
      updated_at: new Date(now - 43200000).toISOString()
    }
  ];
}

function seedPayouts() {
  const now = Date.now();
  return [
    {
      id: 'PO-7001',
      payout_id: 'PO-7001',
      seller_id: 'seller-1',
      amount: 14500,
      currency: 'INR',
      status: 'processed',
      method: 'NEFT / Direct Bank Transfer',
      bank_name: 'HDFC Bank Ltd',
      account_number: '•••••••4892',
      ifsc_code: 'HDFC0001892',
      reference_no: 'UTR98310492810',
      created_at: new Date(now - 7 * 86400000).toISOString(),
      processed_at: new Date(now - 6 * 86400000).toISOString()
    },
    {
      id: 'PO-7002',
      payout_id: 'PO-7002',
      seller_id: 'seller-1',
      amount: 22800,
      currency: 'INR',
      status: 'processed',
      method: 'Instant IMPS Payout',
      bank_name: 'HDFC Bank Ltd',
      account_number: '•••••••4892',
      ifsc_code: 'HDFC0001892',
      reference_no: 'UTR10491823901',
      created_at: new Date(now - 2 * 86400000).toISOString(),
      processed_at: new Date(now - 1 * 86400000).toISOString()
    }
  ];
}


