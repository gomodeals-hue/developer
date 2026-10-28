import { getDB, saveCollection } from '../database/db.js';
import { broadcast, advanceOrderStep } from '../realtime.js';

export function handleOrdersRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. Advance order tracking step on demand (Live Simulator API)
  if (pathname.includes('/orders/') && pathname.endsWith('/advance-step') && method === 'POST') {
    const parts = pathname.split('/');
    const orderId = parts[4];
    const updatedOrder = advanceOrderStep(orderId);
    if (!updatedOrder) {
      return sendJSON(res, { success: false, message: 'Order cannot be advanced further or not found' }, 400);
    }
    return sendJSON(res, {
      success: true,
      message: `Order progressed to ${updatedOrder.status}`,
      data: updatedOrder
    });
  }

  // 2. Cancel order
  if (pathname.startsWith('/api/v1/orders/') && pathname.endsWith('/cancel') && (method === 'PATCH' || method === 'POST')) {
    const parts = pathname.split('/');
    const orderId = parts[4];
    const order = db.orders.find(o => o.id === orderId || o.order_id === orderId);
    if (!order) {
      return sendJSON(res, { success: false, message: 'Order not found' }, 404);
    }
    if (order.status === 'Cancelled') {
      return sendJSON(res, { success: false, message: 'Order is already cancelled' }, 400);
    }

    order.status = 'Cancelled';
    order.cancelled_at = new Date().toISOString();

    // Append cancellation to tracking timeline
    if (Array.isArray(order.tracking)) {
      order.tracking.push({
        step: 'Order Cancelled',
        status: 'cancelled',
        time: order.cancelled_at,
        note: 'Customer requested cancellation. Refund initiated to source payment.'
      });
    }

    // Restore stock in products catalog
    if (Array.isArray(order.items)) {
      for (const item of order.items) {
        const prod = db.products.find(p => p.id === (item.product_id || item.id));
        if (prod) {
          prod.stock_quantity = (prod.stock_quantity || 0) + Number(item.quantity || 1);
          prod.in_stock = prod.stock_quantity > 0;
          broadcast('STOCK_UPDATE', {
            productId: prod.id,
            stock_quantity: prod.stock_quantity,
            in_stock: prod.in_stock
          });
        }
      }
      saveCollection('products');
    }

    saveCollection('orders');

    // Broadcast cancellation update
    broadcast('ORDER_STATUS_UPDATE', {
      orderId: order.id,
      orderNumber: order.order_number,
      status: 'Cancelled',
      note: 'Order was cancelled',
      timestamp: order.cancelled_at,
      tracking: order.tracking
    });

    return sendJSON(res, {
      success: true,
      message: 'Order successfully cancelled. Refund processed to original payment method.',
      data: order
    });
  }

  // 3. User Orders List
  if (pathname.startsWith('/api/v1/orders/user/') && method === 'GET') {
    const userId = pathname.split('/').pop();
    const userOrders = db.orders.filter(o => o.userId === userId || o.customer_id === userId || !o.userId || userId === 'guest_user');
    return sendJSON(res, {
      success: true,
      count: userOrders.length,
      data: userOrders
    });
  }

  // 4. Admin Orders List
  if ((pathname === '/api/v1/admin/orders' || pathname === '/api/v1/orders') && method === 'GET') {
    let filtered = [...db.orders];

    if (query.status && query.status !== 'all') {
      filtered = filtered.filter(o => (o.status || '').toLowerCase() === query.status.toLowerCase());
    }

    if (query.search) {
      const q = query.search.toLowerCase();
      filtered = filtered.filter(o =>
        (o.id && o.id.toLowerCase().includes(q)) ||
        (o.order_number && o.order_number.toLowerCase().includes(q)) ||
        (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
        (o.tracking_number && o.tracking_number.toLowerCase().includes(q))
      );
    }

    return sendJSON(res, {
      success: true,
      count: filtered.length,
      data: filtered,
      orders: filtered
    });
  }

  // 5. Admin Update Order Status
  if ((pathname.startsWith('/api/v1/orders/status/') || pathname.startsWith('/api/v1/admin/orders/status/')) && (method === 'PUT' || method === 'PATCH')) {
    const orderId = pathname.split('/').pop();
    const order = db.orders.find(o => o.id === orderId || o.order_id === orderId);
    if (!order) return sendJSON(res, { success: false, message: 'Order not found' }, 404);

    const newStatus = body.status || order.status;
    order.status = newStatus;
    if (body.courier_partner) order.courier_partner = body.courier_partner;
    if (body.tracking_number) order.tracking_number = body.tracking_number;

    if (Array.isArray(order.tracking)) {
      order.tracking.push({
        step: `Status Updated to ${newStatus}`,
        status: 'completed',
        time: new Date().toISOString(),
        note: body.note || `Courier update: Status changed to ${newStatus}`
      });
    }

    saveCollection('orders');

    broadcast('ORDER_STATUS_UPDATE', {
      orderId: order.id,
      orderNumber: order.order_number,
      status: order.status,
      timestamp: new Date().toISOString(),
      tracking: order.tracking
    });

    return sendJSON(res, { success: true, message: `Order status updated to ${newStatus}`, data: order });
  }

  // 6. Admin Bulk Update Orders
  if (pathname.includes('/admin/orders/bulk-update') && method === 'POST') {
    const orderIds = body.orderIds || [];
    const status = body.status || 'Processing';
    let updatedCount = 0;

    for (const id of orderIds) {
      const order = db.orders.find(o => o.id === id || o.order_id === id);
      if (order && order.status !== 'Cancelled') {
        order.status = status;
        if (body.courier) order.courier_partner = body.courier;
        updatedCount++;
      }
    }
    saveCollection('orders');

    return sendJSON(res, {
      success: true,
      message: `Successfully updated ${updatedCount} orders to ${status}`
    });
  }

  // 7. Admin Auto-dispatch Orders
  if (pathname.includes('/admin/orders/auto-dispatch') && method === 'POST') {
    const pending = db.orders.filter(o => o.status === 'Confirmed' || o.status === 'Processing');
    for (const o of pending) {
      o.status = 'Shipped';
      o.courier_partner = 'BlueDart Express';
      if (!o.tracking_number) {
        o.tracking_number = `BLU${Math.floor(10000000 + Math.random() * 90000000)}`;
      }
    }
    saveCollection('orders');

    return sendJSON(res, {
      success: true,
      message: `Auto-dispatched ${pending.length} orders via BlueDart Express.`
    });
  }

  // 8. Single Order Details + Live Tracking
  if (pathname.startsWith('/api/v1/orders/') && !pathname.includes('/user/') && !pathname.includes('/status/') && method === 'GET') {
    const orderId = pathname.split('/').pop();
    const order = db.orders.find(o => o.id === orderId || o.order_id === orderId);
    if (!order) {
      return sendJSON(res, { success: false, message: 'Order not found' }, 404);
    }

    // Ensure tracking timeline steps exist
    if (!Array.isArray(order.tracking) || order.tracking.length === 0) {
      const isDelivered = order.status === 'Delivered';
      const isShipped = order.status === 'Shipped' || order.status === 'In Transit' || order.status === 'Out for Delivery' || isDelivered;
      const isOut = order.status === 'Out for Delivery' || isDelivered;

      order.tracking = [
        { step: 'Order Placed', status: 'completed', time: order.created_at, note: 'Payment verified & order confirmed' },
        { step: 'Processing & Quality Check', status: isShipped ? 'completed' : 'in_transit', time: new Date(Date.now() - 3600000).toISOString(), note: 'Passed multi-point studio inspection' },
        { step: 'Shipped via Express', status: isShipped ? (isOut ? 'completed' : 'in_transit') : 'pending', time: isShipped ? new Date(Date.now() - 1800000).toISOString() : null, note: `Courier Partner: ${order.courier_partner || 'BlueDart Express'} (AWB: ${order.tracking_number || 'BLU84920194'})` },
        { step: 'Out for Delivery', status: isOut ? (isDelivered ? 'completed' : 'in_transit') : 'pending', note: 'Assigned to local field executive with OTP security' },
        { step: 'Delivered', status: isDelivered ? 'completed' : 'pending', time: order.delivered_at || null, note: 'Contactless doorstep handover' }
      ];
    }

    return sendJSON(res, { success: true, data: order, order: order });
  }

  // 9. Place New Real Order (POST /api/v1/orders)
  if (pathname === '/api/v1/orders' && method === 'POST') {
    const items = body.items || [];
    if (items.length === 0) {
      return sendJSON(res, { success: false, message: 'Cart items cannot be empty' }, 400);
    }

    // 1. Stock Check & Decrement
    for (const item of items) {
      const prodId = item.product_id || item.id;
      const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
      if (prod) {
        const reqQty = Number(item.quantity || 1);
        if (prod.stock_quantity < reqQty) {
          return sendJSON(res, {
            success: false,
            message: `Insufficient stock for "${prod.name}". Only ${prod.stock_quantity} left.`
          }, 400);
        }
      }
    }

    // Deduct stock and broadcast real-time stock updates
    for (const item of items) {
      const prodId = item.product_id || item.id;
      const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
      if (prod) {
        const reqQty = Number(item.quantity || 1);
        prod.stock_quantity = Math.max(0, prod.stock_quantity - reqQty);
        prod.in_stock = prod.stock_quantity > 0;

        broadcast('STOCK_UPDATE', {
          productId: prod.id,
          stock_quantity: prod.stock_quantity,
          in_stock: prod.in_stock
        });
      }
    }
    saveCollection('products');

    // 2. Generate Real Order Metadata
    const orderSeq = 10025 + db.orders.length;
    const orderNumber = `GOMO-2026-${orderSeq}`;
    const orderId = `GMD-ORD-${orderSeq}`;
    const trackingNumber = `BLU${Math.floor(10000000 + Math.random() * 90000000)}`;
    const nowIso = new Date().toISOString();
    const estDelivery = new Date(Date.now() + (body.shipping_method === 'express' ? 172800000 : 259200000)).toISOString();

    const customerAddress = body.delivery_address || body.address || {
      name: body.customer_name || 'GoMo Valued Customer',
      street: '42 Prestige Tower, MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      phone: body.customer_phone || '+91 98450 12345'
    };

    const initialTracking = [
      { step: 'Order Placed', status: 'completed', time: nowIso, note: 'Payment verified and order confirmed' },
      { step: 'Processing & Quality Check', status: 'in_transit', time: nowIso, note: 'Boutique studio is carefully preparing your shipment' },
      { step: 'Shipped via Express', status: 'pending', note: `Assigned to BlueDart Express (AWB: ${trackingNumber})` },
      { step: 'Out for Delivery', status: 'pending', note: 'Scheduled for local contactless delivery' },
      { step: 'Delivered', status: 'pending', note: 'Doorstep handover with OTP verification' }
    ];

    const newOrder = {
      id: orderId,
      order_id: orderId,
      order_number: orderNumber,
      userId: body.userId || body.customer_id || 'usr-1',
      customer_id: body.customer_id || body.userId || 'usr-1',
      customer_name: customerAddress.name || body.customer_name || 'GoMo Customer',
      customer_email: customerAddress.email || body.customer_email || 'customer@gomodeals.com',
      customer_phone: customerAddress.phone || '+91 98450 12345',
      items: items.map(item => ({
        id: item.product_id || item.id,
        product_id: item.product_id || item.id,
        name: item.name || 'Store Item',
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
        thumbnail: item.thumbnail || item.image || '',
        variant_value: item.variant_value || item.selectedVariant || null
      })),
      total_amount: Number(body.total_amount || body.total || 999),
      subtotal: Number(body.subtotal || body.total || 999),
      shipping_fee: Number(body.shipping_fee || 0),
      tax: Number(body.tax || Math.round(Number(body.subtotal || 999) * 0.05)),
      status: 'Confirmed',
      payment_method: body.payment_method || 'UPI / Card',
      payment_status: body.payment_method === 'COD' ? 'Pending' : 'Paid',
      courier_partner: 'BlueDart Express',
      tracking_number: trackingNumber,
      created_at: nowIso,
      estimated_delivery: estDelivery,
      shipping_address: customerAddress,
      delivery_address: customerAddress,
      tracking: initialTracking
    };

    db.orders.unshift(newOrder);
    saveCollection('orders');

    // 3. Clear user's cart in backend
    const uid = newOrder.userId;
    if (db.carts[uid]) {
      db.carts[uid] = [];
      saveCollection('carts');
    }

    // 4. Real-time Broadcasts
    broadcast('NEW_ORDER', {
      orderId: newOrder.id,
      orderNumber: newOrder.order_number,
      customerName: newOrder.customer_name,
      total_amount: newOrder.total_amount,
      itemsCount: newOrder.items.length,
      timestamp: nowIso
    });

    if (newOrder.items.length > 0) {
      broadcast('LIVE_PURCHASE_ALERT', {
        id: `alert-${Date.now()}`,
        productId: newOrder.items[0].product_id,
        productName: newOrder.items[0].name,
        price: newOrder.items[0].price,
        thumbnail: newOrder.items[0].thumbnail,
        city: customerAddress.city || 'Bengaluru',
        timeAgo: 'Just now'
      });
    }

    return sendJSON(res, {
      success: true,
      message: 'Order placed successfully',
      data: newOrder,
      order: newOrder
    }, 201);
  }

  return false;
}
