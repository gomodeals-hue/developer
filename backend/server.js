import http from 'node:http';
import url from 'node:url';
import { initDatabase, getDB } from './database/db.js';
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
import { testPostgresConnection, isPostgresConnected } from './database/pg.js';

const PORT = process.env.PORT || 5000;

// Standard CORS and JSON response helper
function sendJSON(res, data, statusCode = 200) {
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

// Request Body Parser Helper
function getRequestBody(req) {
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

// Start HTTP Server after database initialization
async function startServer() {
  await initDatabase();
  await testPostgresConnection();

  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
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
      if (handleProductsRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleCategoriesRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleOrdersRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleCartWishlistRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleAdminRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleAuthRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleCouponsDeliveryRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleBannersRankingsRoutes(req, res, pathname, method, query, body, sendJSON)) return;
      if (handleSellerRoutes(req, res, pathname, method, query, body, sendJSON)) return;
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
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\x1b[32m[Server] GoMo Deals Real-Time Backend API Server is running on http://127.0.0.1:${PORT}/api/v1\x1b[0m`);
    console.log(`\x1b[36m[Server] Real-Time SSE Stream active at http://127.0.0.1:${PORT}/api/v1/realtime/stream\x1b[0m`);
  });
}

startServer().catch(err => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
