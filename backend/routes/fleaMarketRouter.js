import crypto from 'node:crypto';
import { getDB, saveCollection } from '../database/db.js';
import { pool, isPostgresConnected } from '../database/pg.js';
import { broadcast } from '../realtime.js';

// Default commodities seed fallback
const DEFAULT_COMMODITIES = [
  {
    product_id: 'fm_pepper_1',
    name: 'Malabar Black Pepper (Tellicherry Extra Bold)',
    category: 'spices',
    origin: 'Wayanad, Kerala',
    grade: 'TGSEB Extra Bold',
    moisture_percentage: 9.2,
    harvest_date: '2026 Season',
    price_per_kg: 780.00,
    min_order_kg: 100,
    available_stock_kg: 2500,
    thumbnail: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    description: 'Tellicherry Garbled Special Extra Bold black pepper from high-altitude Wayanad estates. Certified export grade with high piperine content.'
  },
  {
    product_id: 'fm_cardamom_2',
    name: 'Alleppey Green Cardamom (8mm Bold)',
    category: 'spices',
    origin: 'Idukki, Kerala',
    grade: 'AGEB (Alleppey Green Extra Bold)',
    moisture_percentage: 8.0,
    harvest_date: '2026 Season',
    price_per_kg: 2850.00,
    min_order_kg: 25,
    available_stock_kg: 600,
    thumbnail: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
    description: 'Deep green aromatic pods, minimum 8mm size. Natural sun-cured with high volatile oil preservation. Direct from Spices Board registered planters.'
  },
  {
    product_id: 'fm_turmeric_3',
    name: 'Salem Pure Turmeric Fingers',
    category: 'spices',
    origin: 'Salem, Tamil Nadu',
    grade: 'Double Polished Grade 1',
    moisture_percentage: 7.5,
    harvest_date: '2026 Season',
    price_per_kg: 185.00,
    min_order_kg: 500,
    available_stock_kg: 8000,
    thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    description: 'Rich golden yellow turmeric with verified 4.8% curcumin content. Naturally dried and machine-sorted for zero impurities.'
  },
  {
    product_id: 'fm_coffee_4',
    name: 'Coorg Arabica Plantation-A Green Coffee Beans',
    category: 'coffee',
    origin: 'Coorg, Karnataka',
    grade: 'Plantation AAA',
    moisture_percentage: 10.5,
    harvest_date: '2026 Harvest',
    price_per_kg: 480.00,
    min_order_kg: 200,
    available_stock_kg: 5000,
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    description: 'Shade-grown, washed Arabica green coffee from organic estates. High altitude harvesting yields distinct citrus notes and floral aroma.'
  },
  {
    product_id: 'fm_tea_5',
    name: 'Assam Orthodox Golden Flowery Orange Pekoe (GFOP)',
    category: 'tea',
    origin: 'Assam Valley',
    grade: 'Tippy Golden Pekoe',
    moisture_percentage: 6.8,
    harvest_date: '2026 Second Flush',
    price_per_kg: 620.00,
    min_order_kg: 150,
    available_stock_kg: 3200,
    thumbnail: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    description: 'Premium second-flush orthodox tea leaves loaded with golden tips. Strong malt character and rich amber liquor.'
  },
  {
    product_id: 'fm_cashew_6',
    name: 'Mangalore Whole Cashew Kernels W-240',
    category: 'dry_fruits',
    origin: 'Mangalore, Karnataka',
    grade: 'Export Grade W-240',
    moisture_percentage: 4.5,
    harvest_date: '2026 Season',
    price_per_kg: 890.00,
    min_order_kg: 50,
    available_stock_kg: 1800,
    thumbnail: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
    description: 'Crisp, whole white cashew nuts graded at 240 nuts per pound. Vacuum packed in nitrogen-flushed tins for global shipping.'
  }
];

export async function handleFleaMarketRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  if (!Array.isArray(db.flea_market_meetings)) db.flea_market_meetings = [];
  if (!Array.isArray(db.flea_market_offers)) db.flea_market_offers = [];
  if (!Array.isArray(db.flea_market_products)) db.flea_market_products = DEFAULT_COMMODITIES;

  // 1. GET /api/flea-market/commodities
  if ((pathname === '/api/flea-market/commodities' || pathname === '/api/v1/flea-market/commodities') && method === 'GET') {
    if (isPostgresConnected()) {
      try {
        const { rows } = await pool.query('SELECT * FROM flea_market_products WHERE is_active = TRUE ORDER BY created_at DESC');
        if (rows.length > 0) {
          return sendJSON(res, { success: true, count: rows.length, commodities: rows });
        }
      } catch (err) {
        console.warn('[FleaMarket] Postgres query error, falling back:', err.message);
      }
    }
    return sendJSON(res, {
      success: true,
      count: db.flea_market_products.length,
      commodities: db.flea_market_products
    });
  }

  // 2. POST /api/meetings (Schedule new video conference)
  if ((pathname === '/api/meetings' || pathname === '/api/v1/meetings') && method === 'POST') {
    const { productId, kgAmount, purpose, scheduledAt, customerId, customerName, customerEmail } = body;

    if (!productId || !kgAmount || !scheduledAt) {
      return sendJSON(res, {
        success: false,
        message: 'Product ID, quantity (kg), and scheduled date/time are required.'
      }, 400);
    }

    const meetingId = crypto.randomUUID();
    const meetingLink = `/flea-market/conference/${meetingId}`;

    // Find commodity details
    let product = db.flea_market_products.find(p => p.product_id === productId || p.id === productId);
    if (!product && Array.isArray(db.products)) {
      product = db.products.find(p => p.id === productId || p.product_id === productId);
    }

    const newMeeting = {
      meeting_id: meetingId,
      product_id: productId,
      product_name: product?.name || 'Agricultural Commodity',
      customer_id: customerId || 'cust_buyer_1',
      customer_name: customerName || 'Verified Bulk Buyer',
      customer_email: customerEmail || 'buyer@gomodeals.com',
      seller_id: product?.seller_id || 'seller_direct_farmer',
      seller_name: product?.seller_name || 'GoMo Verified Planters Co.',
      kg_amount: parseFloat(kgAmount) || 100,
      purpose: purpose || 'Quality Inspection & Price Bargain',
      scheduled_at: new Date(scheduledAt).toISOString(),
      meeting_link: meetingLink,
      status: 'Scheduled',
      earnings: 0,
      meeting_notes: '',
      created_at: new Date().toISOString()
    };

    if (isPostgresConnected()) {
      try {
        await pool.query(
          `INSERT INTO flea_market_meetings 
           (meeting_id, product_id, customer_id, customer_name, customer_email, seller_id, seller_name, kg_amount, purpose, scheduled_at, meeting_link, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            newMeeting.meeting_id,
            newMeeting.product_id.includes('fm_') ? null : newMeeting.product_id,
            newMeeting.customer_id,
            newMeeting.customer_name,
            newMeeting.customer_email,
            newMeeting.seller_id,
            newMeeting.seller_name,
            newMeeting.kg_amount,
            newMeeting.purpose,
            newMeeting.scheduled_at,
            newMeeting.meeting_link,
            newMeeting.status
          ]
        );
      } catch (e) {
        console.warn('[FleaMarket] Postgres insert meeting warning:', e.message);
      }
    }

    db.flea_market_meetings.unshift(newMeeting);
    saveCollection('flea_market_meetings');

    broadcast('NEW_FLEA_MARKET_MEETING', newMeeting);

    return sendJSON(res, {
      success: true,
      message: 'Video conference scheduled successfully. An invitation has been sent to the producer.',
      meeting: newMeeting
    }, 201);
  }

  // 3. GET /api/meetings/customer
  if ((pathname === '/api/meetings/customer' || pathname === '/api/v1/meetings/customer') && method === 'GET') {
    const custId = query.customer_id || 'cust_buyer_1';
    let meetings = db.flea_market_meetings;

    if (isPostgresConnected()) {
      try {
        const { rows } = await pool.query('SELECT * FROM flea_market_meetings ORDER BY scheduled_at DESC');
        if (rows.length > 0) meetings = rows;
      } catch {}
    }

    const filtered = meetings.filter(m => !custId || m.customer_id === custId || custId === 'all');
    return sendJSON(res, { success: true, count: filtered.length, meetings: filtered });
  }

  // 4. GET /api/meetings/seller
  if ((pathname === '/api/meetings/seller' || pathname === '/api/v1/meetings/seller') && method === 'GET') {
    const sellerId = query.seller_id || req.headers['x-seller-id'];
    let meetings = db.flea_market_meetings;

    if (isPostgresConnected()) {
      try {
        const { rows } = await pool.query('SELECT * FROM flea_market_meetings ORDER BY scheduled_at DESC');
        if (rows.length > 0) meetings = rows;
      } catch {}
    }

    const filtered = sellerId ? meetings.filter(m => m.seller_id === sellerId) : meetings;
    return sendJSON(res, { success: true, count: filtered.length, meetings: filtered });
  }

  // 5. GET /api/meetings/admin
  if ((pathname === '/api/meetings/admin' || pathname === '/api/v1/meetings/admin') && method === 'GET') {
    let meetings = db.flea_market_meetings;
    if (isPostgresConnected()) {
      try {
        const { rows } = await pool.query('SELECT * FROM flea_market_meetings ORDER BY scheduled_at DESC');
        if (rows.length > 0) meetings = rows;
      } catch {}
    }
    return sendJSON(res, { success: true, count: meetings.length, meetings });
  }

  // 6. GET /api/meetings/:id
  if (pathname.startsWith('/api/meetings/') || pathname.startsWith('/api/v1/meetings/')) {
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];

    if (method === 'GET' && id && id !== 'customer' && id !== 'seller' && id !== 'admin') {
      let meeting = db.flea_market_meetings.find(m => m.meeting_id === id);
      if (!meeting && isPostgresConnected()) {
        try {
          const { rows } = await pool.query('SELECT * FROM flea_market_meetings WHERE meeting_id = $1', [id]);
          if (rows.length > 0) meeting = rows[0];
        } catch {}
      }

      if (!meeting) {
        // Return a mock active conference for interactive demonstration
        meeting = {
          meeting_id: id,
          product_name: 'Alleppey Green Cardamom (8mm Bold)',
          customer_name: 'GoMo Premium Bulk Buyer',
          seller_name: 'Idukki Planters Cooperative',
          kg_amount: 150,
          purpose: 'Lot Inspection & Grade Certification',
          scheduled_at: new Date().toISOString(),
          meeting_link: `/flea-market/conference/${id}`,
          status: 'Scheduled',
          earnings: 0
        };
      }

      return sendJSON(res, { success: true, meeting });
    }

    // 7. PUT /api/meetings/:id/cancel
    if (method === 'PUT' && pathname.endsWith('/cancel')) {
      const meetingId = segments[segments.length - 2];
      const meeting = db.flea_market_meetings.find(m => m.meeting_id === meetingId);
      if (meeting) {
        meeting.status = 'Cancelled';
        saveCollection('flea_market_meetings');
      }
      if (isPostgresConnected()) {
        try {
          await pool.query("UPDATE flea_market_meetings SET status = 'Cancelled' WHERE meeting_id = $1", [meetingId]);
        } catch {}
      }
      return sendJSON(res, { success: true, message: 'Conference cancelled.' });
    }

    // 8. PUT /api/meetings/:id/end
    if (method === 'PUT' && pathname.endsWith('/end')) {
      const meetingId = segments[segments.length - 2];
      const meeting = db.flea_market_meetings.find(m => m.meeting_id === meetingId);
      if (meeting) {
        meeting.status = 'Completed';
        saveCollection('flea_market_meetings');
      }
      if (isPostgresConnected()) {
        try {
          await pool.query("UPDATE flea_market_meetings SET status = 'Completed' WHERE meeting_id = $1", [meetingId]);
        } catch {}
      }
      return sendJSON(res, { success: true, message: 'Conference concluded.' });
    }

    // 9. POST /api/meetings/:id/admin/record-outcome
    if (method === 'POST' && pathname.endsWith('/admin/record-outcome')) {
      const meetingId = segments[segments.length - 3];
      const { final_price, final_quantity, contract_terms } = body;
      const meeting = db.flea_market_meetings.find(m => m.meeting_id === meetingId);

      const offerToken = `gomo_deal_${crypto.randomUUID().slice(0, 12)}`;
      const agreedOffer = {
        offer_id: crypto.randomUUID(),
        meeting_id: meetingId,
        product_id: meeting?.product_id || 'fm_pepper_1',
        product_name: meeting?.product_name || 'Negotiated Commodity',
        seller_id: meeting?.seller_id || 'seller-1',
        customer_id: meeting?.customer_id || 'cust-1',
        agreed_quantity: parseFloat(final_quantity) || 100,
        offered_price: parseFloat(final_price) || 750,
        contract_terms: contract_terms || 'Standard GoMo Escrow Protection & Quality Assurance Clause',
        offer_token: offerToken,
        status: 'Accepted',
        created_at: new Date().toISOString()
      };

      db.flea_market_offers.unshift(agreedOffer);
      saveCollection('flea_market_offers');

      if (meeting) {
        meeting.status = 'Completed';
        saveCollection('flea_market_meetings');
      }

      broadcast('FLEA_MARKET_DEAL_RECORDED', agreedOffer);

      return sendJSON(res, {
        success: true,
        message: 'Contract deal recorded successfully. Buyer may now proceed to checkout.',
        offer: agreedOffer
      });
    }
  }

  // 10. GET & POST /api/offers
  if (pathname === '/api/offers' || pathname === '/api/v1/offers') {
    if (method === 'POST') {
      const { productId, offeredPrice, quantity, terms, customerId } = body;
      const offerId = crypto.randomUUID();
      const offerToken = `gomo_deal_${crypto.randomUUID().slice(0, 12)}`;

      const newOffer = {
        offer_id: offerId,
        product_id: productId,
        customer_id: customerId || 'cust_buyer_1',
        agreed_quantity: parseFloat(quantity) || 50,
        offered_price: parseFloat(offeredPrice) || 500,
        contract_terms: terms || 'Standard Escrow',
        offer_token: offerToken,
        status: 'Pending',
        created_at: new Date().toISOString()
      };

      db.flea_market_offers.unshift(newOffer);
      saveCollection('flea_market_offers');

      return sendJSON(res, { success: true, message: 'Bargain offer submitted to merchant.', offer: newOffer }, 201);
    }
  }

  // 11. GET /api/offers/customer
  if ((pathname === '/api/offers/customer' || pathname === '/api/v1/offers/customer') && method === 'GET') {
    return sendJSON(res, {
      success: true,
      count: db.flea_market_offers.length,
      offers: db.flea_market_offers
    });
  }

  // 12. GET /api/offers/validate/:token
  if (pathname.startsWith('/api/offers/validate/') || pathname.startsWith('/api/v1/offers/validate/')) {
    const token = pathname.split('/').pop();
    const offer = db.flea_market_offers.find(o => o.offer_token === token);
    if (!offer) {
      return sendJSON(res, { success: false, message: 'Invalid or expired deal token' }, 404);
    }
    return sendJSON(res, { success: true, offer });
  }

  return false;
}
