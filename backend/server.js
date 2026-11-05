import http from 'node:http';
import url from 'node:url';
import { initDatabase, getDB, hydrateFromPostgres } from './database/db.js';
import { handleSSEConnection, getActiveClientsCount } from './realtime.js';

import { handleProductsRoutes } from './routes/productsRouter.js';
import { handleCategoriesRoutes } from './routes/categoriesRouter.js';
import { handleOrdersRoutes } from './routes/ordersRouter.js';
import { handleCartWishlistRoutes } from './routes/cartWishlistRouter.js';
import { handleAdminRoutes } from './routes/adminRouter.js';
import { handleAuthRoutes } from './routes/authRouter.js';
import { handleCouponsDeliveryRoutes } from './routes/couponsDeliveryRouter.js';
import { handleBannersRankingsRoutes } from './routes/bannersRankingsRouter.js';
import { handleSellerRoutes } from './routes/sellerRouter.js';
import { handleVocRoutes } from './routes/vocRouter.js';
import { handleTicketRoutes } from './routes/ticketsRouter.js';
import { handleChatbotRoutes } from './routes/chatbotRouter.js';
import { handleFleaMarketRoutes } from './routes/fleaMarketRouter.js';
import { handleTicketBookingRoutes } from './routes/ticketBookingRouter.js';
import { handleBusRoutes } from './routes/busRouter.js';
import { handlePaymentsRoutes } from './routes/paymentsRouter.js';
import { testPostgresConnection, isPostgresConnected, pool } from './database/pg.js';
import { sendCartReminderEmail } from './services/emailService.js';
import { saveCollection } from './database/db.js';

const PORT = process.env.PORT || 5000;

// Standard CORS and JSON response helper
export function sendJSON(res, data, statusCode = 200) {
  if (res.headersSent) return true;
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
    'Access-Control-Allow-Credentials': 'true'
  });
  res.end(JSON.stringify(data));
  return true;
}

// Request Body Parser Helper (supports both standalone stream and serverless parsed body)
export function getRequestBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

let initPromise = null;
export async function ensureDbReady() {
  if (!initPromise) {
    initPromise = (async () => {
      await initDatabase();
      const connected = await testPostgresConnection();
      if (connected) {
        await hydrateFromPostgres(pool);
      }
    })();
  }
  return initPromise;
}

// Universal Request Handler (used by standalone server & Vercel serverless functions)
export async function app(req, res) {
  await ensureDbReady();

  const requestUrl = req.headers['x-forwarded-uri'] || req.headers['x-matched-path'] || req.url || '/';
  const parsedUrl = url.parse(requestUrl, true);
  const pathname = (parsedUrl.pathname || '/').replace(/\/+$/, '') || '/';
  const method = req.method.toUpperCase();
  const query = parsedUrl.query || {};

  // 1. Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
      'Access-Control-Allow-Credentials': 'true'
    });
    return res.end();
  }

  // 2. Real-Time Server-Sent Events (SSE) Stream
  if ((pathname === '/api/v1/realtime/stream' || pathname === '/api/v1/events' || pathname === '/api/realtime/stream') && method === 'GET') {
    return handleSSEConnection(req, res);
  }

  // 3. Health & Status Endpoints
  if (pathname === '/api/v1/health' || pathname === '/health' || pathname === '/api/v1/status' || pathname === '/') {
    const db = getDB();
    return sendJSON(res, {
      status: 'online',
      service: 'GoMo Deals Real-Time High Performance Backend',
      version: '2.0.0',
      postgres: {
        connected: isPostgresConnected()
      },
      realtime: {
        active_sse_clients: getActiveClientsCount(),
        event_stream_url: '/api/v1/realtime/stream'
      },
      catalog: {
        total_products: db.products.length,
        total_categories: db.categories.length,
        total_orders: db.orders.length,
        active_coupons: db.coupons.length
      },
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  }

  // Parse JSON body for mutation methods
  const body = (method === 'POST' || method === 'PUT' || method === 'PATCH')
    ? await getRequestBody(req)
    : {};

  // 4. Delegate to Specialized Route Handlers
  try {
    if (await handleFleaMarketRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleTicketBookingRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleBusRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handlePaymentsRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleProductsRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (handleCategoriesRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleOrdersRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleCartWishlistRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleAdminRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleAuthRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (handleCouponsDeliveryRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (handleBannersRankingsRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (await handleSellerRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (handleVocRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (handleTicketRoutes(req, res, pathname, method, query, body, sendJSON)) return;
    if (handleChatbotRoutes(req, res, pathname, method, query, body, sendJSON)) return;
  } catch (err) {
    console.error('[Server] Route execution error:', err);
    if (!res.headersSent) {
      return sendJSON(res, { success: false, message: 'Internal server error', error: err.message }, 500);
    }
    return;
  }

  if (res.headersSent) return;

  // 5. 404 Route Not Found
  return sendJSON(res, {
    success: false,
    message: `Endpoint ${pathname} [${method}] not found on GoMo Deals API`
  }, 404);
}

/**
 * Automated Abandoned Cart Recovery Cron Worker
 * Scans for carts inactive for 5 or more days and dispatches recovery emails.
 */
function startAbandonedCartCron() {
  const checkAbandonedCarts = async () => {
    try {
      const db = getDB();
      if (!db || !db.carts) return;
      if (!db.carts_meta) db.carts_meta = {};

      for (const uid in db.carts) {
        const rawItems = db.carts[uid] || [];
        if (!Array.isArray(rawItems) || rawItems.length === 0) continue;

        const meta = db.carts_meta[uid] || {};
        if (meta.status === 'converted') continue;

        const updatedAt = meta.updated_at || rawItems[0]?.added_at || new Date().toISOString();
        const idleMs = Math.max(0, Date.now() - new Date(updatedAt).getTime());
        const daysIdle = idleMs / (1000 * 60 * 60 * 24);
        const remindersSent = Array.isArray(meta.reminders_sent) ? meta.reminders_sent : [];

        // Condition: Idle for 5 or more days and no reminder sent yet
        if (daysIdle >= 5.0 && remindersSent.length === 0) {
          const userObj = (db.users || []).find(u => u.id === uid || u.customer_id === uid);
          const customerEmail = meta.customer_email || userObj?.email || (uid.includes('@') ? uid : `${uid}@gomodeals.com`);
          const customerName = meta.customer_name || userObj?.name || 'Valued Customer';
          const subtotal = rawItems.reduce((s, i) => s + (Number(i.price || 0) * Number(i.quantity || 1)), 0);

          console.log(`[Cron] ⏰ Detected 5-day abandoned cart for ${customerEmail} (Idle: ${daysIdle.toFixed(1)} days). Sending reminder...`);
          const res = await sendCartReminderEmail({
            user_id: uid,
            customer_name: customerName,
            customer_email: customerEmail,
            days_idle: Math.max(5, Math.round(daysIdle)),
            items: rawItems,
            total_amount: subtotal
          });

          if (res.success) {
            remindersSent.push({
              type: '5_day_automatic_cron',
              sent_at: new Date().toISOString(),
              to: customerEmail
            });
            meta.reminders_sent = remindersSent;
            meta.last_reminder_at = new Date().toISOString();
            meta.reminder_count = (meta.reminder_count || 0) + 1;
            db.carts_meta[uid] = meta;
            saveCollection('carts_meta');
          }
        }
      }
    } catch (e) {
      console.warn('[Cron] Abandoned cart check error:', e.message);
    }
  };

  // Run initial scan 5 seconds after server start, then every 6 hours
  setTimeout(checkAbandonedCarts, 5000);
  setInterval(checkAbandonedCarts, 6 * 60 * 60 * 1000);
}

// Start HTTP Server when running standalone locally
async function startServer() {
  await ensureDbReady();

  const server = http.createServer(app);

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\x1b[32m[Server] GoMo Deals Real-Time Backend API Server is running on http://127.0.0.1:${PORT}/api/v1\x1b[0m`);
    console.log(`\x1b[36m[Server] Real-Time SSE Stream active at http://127.0.0.1:${PORT}/api/v1/realtime/stream\x1b[0m`);
    startAbandonedCartCron();
  });
}

// Only listen on port if directly run and not running as a Vercel serverless function
const isDirectRun = Boolean(process.argv[1] && import.meta.url.includes(process.argv[1].replace(/\\/g, '/').split('/').pop()));
if (isDirectRun && !process.env.VERCEL) {
  startServer().catch(err => {
    console.error('[Server] Fatal startup error:', err);
    process.exit(1);
  });
}
