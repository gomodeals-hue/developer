import { getDB, saveCollection } from './database/db.js';

// Connected SSE clients
const sseClients = new Set();

/**
 * Handle incoming SSE connection
 */
export function handleSSEConnection(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-Accel-Buffering': 'no' // Disable proxy buffering (Nginx, etc.)
  });

  const clientId = `client-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const client = { id: clientId, res, connectedAt: Date.now() };
  sseClients.add(client);

  // Send initial handshake
  sendSSEMessage(res, 'CONNECTED', {
    clientId,
    status: 'connected',
    serverTime: new Date().toISOString(),
    uptime: process.uptime(),
    activeClients: sseClients.size
  });

  req.on('close', () => {
    sseClients.delete(client);
  });
}

/**
 * Send formatted SSE payload to single response
 */
function sendSSEMessage(res, eventName, data) {
  try {
    res.write(`event: ${eventName}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  } catch (err) {
    // Client connection probably closed
  }
}

/**
 * Broadcast event to ALL connected clients
 */
export function broadcast(eventName, data) {
  const payload = {
    ...data,
    broadcastAt: new Date().toISOString()
  };

  for (const client of sseClients) {
    try {
      sendSSEMessage(client.res, eventName, payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

/**
 * Get count of active SSE connections
 */
export function getActiveClientsCount() {
  return sseClients.size;
}

// ----------------------------------------------------
// HEARTBEAT TIMER (Keep connection open & alive)
// ----------------------------------------------------
setInterval(() => {
  if (sseClients.size > 0) {
    broadcast('HEARTBEAT', {
      timestamp: Date.now(),
      uptime: process.uptime(),
      activeClients: sseClients.size
    });
  }
}, 15000);

// ----------------------------------------------------
// REAL-TIME ORDER TRACKING PROGRESSOR
// Advances pending/in-transit orders step by step
// ----------------------------------------------------
const TRACKING_PIPELINE = [
  { step: 'Order Placed', status: 'Confirmed', note: 'Payment verified and order confirmed' },
  { step: 'Processing & Quality Check', status: 'Processing', note: 'Quality check and barcode scan complete' },
  { step: 'Shipped via BlueDart', status: 'Shipped', note: 'Dispatched from Bengaluru Logistics Hub' },
  { step: 'Out for Delivery', status: 'Out for Delivery', note: 'Courier executive Ramesh K. is out for delivery' },
  { step: 'Delivered', status: 'Delivered', note: 'Order handed over with contactless OTP confirmation' }
];

export function advanceOrderStep(orderId) {
  const db = getDB();
  const order = db.orders.find(o => o.id === orderId || o.order_id === orderId);
  if (!order || order.status === 'Cancelled' || order.status === 'Delivered') {
    return null;
  }

  if (!Array.isArray(order.tracking) || order.tracking.length === 0) {
    order.tracking = TRACKING_PIPELINE.map(p => ({
      step: p.step,
      status: 'pending',
      note: p.note
    }));
    order.tracking[0].status = 'completed';
    order.tracking[0].time = order.created_at;
  }

  // Find next pending or in_transit step
  const nextStepIndex = order.tracking.findIndex(s => s.status !== 'completed');
  if (nextStepIndex >= 0) {
    // Complete previous if in_transit
    for (let i = 0; i < nextStepIndex; i++) {
      order.tracking[i].status = 'completed';
    }
    const currentPipeline = TRACKING_PIPELINE[nextStepIndex] || TRACKING_PIPELINE[TRACKING_PIPELINE.length - 1];
    order.tracking[nextStepIndex].status = (nextStepIndex === TRACKING_PIPELINE.length - 1) ? 'completed' : 'in_transit';
    order.tracking[nextStepIndex].time = new Date().toISOString();
    order.status = currentPipeline.status;

    if (order.status === 'Delivered') {
      order.delivered_at = new Date().toISOString();
    }

    saveCollection('orders');

    // Broadcast real-time order update!
    broadcast('ORDER_STATUS_UPDATE', {
      orderId: order.id,
      orderNumber: order.order_number,
      status: order.status,
      currentStep: currentPipeline.step,
      note: currentPipeline.note,
      timestamp: new Date().toISOString(),
      tracking: order.tracking
    });

    return order;
  }

  return order;
}

// Background order progression ticker (every 45 seconds for active orders)
setInterval(() => {
  const db = getDB();
  const activeOrders = (db.orders || []).filter(o => 
    o.status !== 'Delivered' && o.status !== 'Cancelled'
  );

  if (activeOrders.length > 0) {
    // Progress the oldest non-delivered order
    const target = activeOrders[activeOrders.length - 1];
    if (target) {
      advanceOrderStep(target.id);
    }
  }
}, 45000);

// ----------------------------------------------------
// REAL-TIME SOCIAL PROOF / LIVE PURCHASE TICKER
// ----------------------------------------------------
const CITIES = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur'];

setInterval(() => {
  if (sseClients.size > 0) {
    const db = getDB();
    const products = db.products;
    if (products.length > 0) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const minutesAgo = Math.floor(Math.random() * 8) + 1;

      broadcast('LIVE_PURCHASE_ALERT', {
        id: `alert-${Date.now()}`,
        productId: randomProduct.id,
        productName: randomProduct.name,
        price: randomProduct.price,
        thumbnail: randomProduct.thumbnail,
        city,
        timeAgo: `${minutesAgo}m ago`
      });
    }
  }
}, 28000);
