import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

const ORDERS_STORAGE_KEY = 'gomo_customer_orders';

const loadLocalOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalOrders = (orders) => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save local orders:', err);
  }
};

export const orderService = {
  /**
   * Create a new customer order
   */
  async createOrder(orderData) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post(API_CONFIG.ENDPOINTS.ORDERS.CREATE, orderData);
        return res.data;
      } catch (err) {
        console.warn('API createOrder failed, creating in mock storage:', err.message);
      }
    }

    // Mock Order creation with complete e-commerce attributes
    const orderNumber = `GOMO-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `ORD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const createdAt = new Date().toISOString();
    
    // Estimated delivery date (3 to 5 business days)
    const deliveryDays = orderData.shipping_method === 'express' ? 2 : 4;
    const estimatedDelivery = new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000).toISOString();

    const newOrder = {
      order_id: orderId,
      id: orderId,
      order_number: orderNumber,
      customer_id: orderData.customer_id || 'guest_user',
      customer: {
        id: orderData.customer_id || 'guest_user',
        name: orderData.delivery_address?.full_name || orderData.customer_name || 'Valued Customer',
        email: orderData.customer_email || orderData.delivery_address?.email || 'customer@gomodeals.com',
        phone: orderData.delivery_address?.phone || '+91 98765 43210'
      },
      items: (orderData.items || []).map(item => ({
        product_id: item.product_id || item.id,
        id: item.product_id || item.id,
        name: item.name || 'Product',
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
        item_total: Number(item.price || 0) * Number(item.quantity || 1),
        thumbnail: item.thumbnail || item.image || '',
        variant_value: item.variant_value || item.selectedColor || null,
        variant_id: item.variant_id || null
      })),
      prices: {
        subtotal: Number(orderData.subtotal || 0),
        items_total: Number(orderData.subtotal || 0),
        tax: Number(orderData.tax || 0),
        shipping: Number(orderData.shipping_fee || 0),
        discount: Number(orderData.discount || 0),
        total: Number(orderData.total_amount || 0)
      },
      discount: {
        amount: Number(orderData.discount || 0),
        coupon_code: orderData.coupon_code || orderData.appliedCoupon?.code || null
      },
      shipping: {
        method: orderData.shipping_method || 'standard',
        fee: Number(orderData.shipping_fee || 0),
        estimated_delivery: estimatedDelivery
      },
      tax: {
        rate: 0.05,
        amount: Number(orderData.tax || 0)
      },
      total: Number(orderData.total_amount || 0),
      total_amount: Number(orderData.total_amount || 0),
      subtotal: Number(orderData.subtotal || 0),
      shipping_fee: Number(orderData.shipping_fee || 0),
      address: orderData.delivery_address || {},
      delivery_address: orderData.delivery_address || {},
      payment: {
        method: orderData.payment_method || 'CARD',
        status: orderData.payment_status || (orderData.payment_method === 'COD' ? 'Pending' : 'Paid'),
        transaction_id: orderData.payment_id || orderData.transaction_id || `TXN_${Date.now()}`,
        masked_account: orderData.masked_account || (orderData.payment_method === 'COD' ? 'Pay upon delivery' : 'Verified')
      },
      payment_method: orderData.payment_method || 'CARD',
      payment_status: orderData.payment_status || (orderData.payment_method === 'COD' ? 'Pending' : 'Paid'),
      order_status: 'Confirmed',
      timestamps: {
        created_at: createdAt,
        estimated_delivery: estimatedDelivery
      },
      created_at: createdAt
    };

    const orders = loadLocalOrders();
    orders.unshift(newOrder);
    saveLocalOrders(orders);

    // Business Logic Hooks for Phase 11:
    try {
      // 1. Automatic stock deduction & audit logging
      const { inventoryService } = await import('./inventoryService');
      await inventoryService.deductOrderStock(newOrder.items, newOrder.order_number);

      // 2. Record coupon redemption if coupon used
      if (orderData.coupon_code) {
        const { couponService } = await import('./couponService');
        couponService.recordCouponRedemption(orderData.coupon_code);
      }

      // 3. Trigger customer notification
      const { notificationService } = await import('./notificationService');
      await notificationService.notifyOrderConfirmation(newOrder);
    } catch (hookErr) {
      console.warn('Phase 11 business hook error:', hookErr);
    }

    return {
      success: true,
      data: newOrder,
      order: newOrder,
      orderId: newOrder.order_id,
      orderNumber: newOrder.order_number
    };
  },


  /**
   * Create Razorpay order for online payment
   */
  async createRazorpayOrder(amount) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post('/orders/razorpay/create-order', { amount });
        return res.data;
      } catch (err) {
        console.warn('API createRazorpayOrder failed:', err.message);
      }
    }
    const mockOrderId = `rzp_order_${Date.now()}`;
    return {
      success: true,
      id: mockOrderId,
      order: { id: mockOrderId },
      isMock: true,
      amount: amount * 100,
      currency: 'INR'
    };
  },

  /**
   * Send order confirmation email (non-blocking)
   */
  async sendOrderConfirmationEmail(emailData) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post('/orders/send-confirmation', emailData);
        return res.data;
      } catch (err) {
        console.warn('[EMAIL] Failed to send order confirmation:', err);
      }
    }
    return { success: true };
  },

  /**
   * Get all orders placed by the current customer
   */
  async getMyOrders(customerId) {
    if (!API_CONFIG.USE_MOCK && customerId) {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.ORDERS.LIST(customerId));
        if (res.data?.success) return res.data;
      } catch (err) {
        console.warn('API getMyOrders failed, returning local orders:', err.message);
      }
    }

    const localOrders = loadLocalOrders();
    const userOrders = customerId
      ? localOrders.filter(o => o.customer_id === customerId || !o.customer_id)
      : localOrders;

    return {
      success: true,
      data: userOrders
    };
  },

  /**
   * Get detailed status and breakdown of an order
   */
  async getOrderDetails(orderId) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.ORDERS.DETAIL(orderId));
        if (res.data?.success) return res.data;
      } catch (err) {
        console.warn('API getOrderDetails failed:', err.message);
      }
    }

    const orders = loadLocalOrders();
    const order = orders.find(o => o.order_id === orderId || o.id === orderId);

    if (order) {
      return { success: true, data: order };
    }
    return { success: false, error: 'Order not found' };
  },

  /**
   * Cancel an order
   */
  async cancelOrder(orderId, customerId, reason = 'Customer request') {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.patch(API_CONFIG.ENDPOINTS.ORDERS.CANCEL(orderId), {
          customerId,
          reason
        });
        return res.data;
      } catch (err) {
        console.warn('API cancelOrder failed:', err.message);
      }
    }

    const orders = loadLocalOrders();
    const idx = orders.findIndex(o => o.order_id === orderId || o.id === orderId);
    if (idx !== -1) {
      const order = orders[idx];
      const now = new Date().toISOString();
      order.order_status = 'Cancelled';
      order.cancel_reason = reason;
      order.cancelled_at = now;
      if (order.payment && order.payment.status === 'Paid') {
        order.payment.status = 'Refund Initiated';
      }
      order.timestamps = {
        ...(order.timestamps || {}),
        cancelled_at: now
      };
      saveLocalOrders(orders);
      return { success: true, data: order, message: 'Order successfully cancelled.' };
    }
    return { success: false, error: 'Order not found' };
  },

  /**
   * Submit item return request
   */
  async createReturnRequest(returnData) {
    const { order_id, reason, return_type = 'Refund', notes = '' } = returnData;
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post(API_CONFIG.ENDPOINTS.ORDERS.RETURNS, returnData);
        return res.data;
      } catch (err) {
        console.warn('API createReturnRequest failed:', err.message);
      }
    }

    const orders = loadLocalOrders();
    const idx = orders.findIndex(o => o.order_id === order_id || o.id === order_id);
    if (idx !== -1) {
      const now = new Date().toISOString();
      const returnRecord = {
        return_id: `RET-${Date.now()}`,
        order_id,
        reason,
        return_type,
        notes,
        created_at: now,
        status: 'Pending Review'
      };

      orders[idx].order_status = 'Return Requested';
      orders[idx].return_request = returnRecord;
      orders[idx].return_requests = [returnRecord];
      orders[idx].timestamps = {
        ...(orders[idx].timestamps || {}),
        return_requested_at: now
      };
      saveLocalOrders(orders);

      return {
        success: true,
        data: orders[idx],
        returnRecord,
        message: 'Return request submitted successfully. Our team will verify and initiate reverse pickup.'
      };
    }

    return {
      success: true,
      message: 'Return request submitted successfully.'
    };
  },

  /**
   * Update an order's status (used for lifecycle progression & testing)
   */
  async updateOrderStatus(orderId, newStatus, metadata = {}) {
    const orders = loadLocalOrders();
    const idx = orders.findIndex(o => o.order_id === orderId || o.id === orderId);
    if (idx !== -1) {
      const now = new Date().toISOString();
      const order = orders[idx];
      order.order_status = newStatus;
      order.timestamps = order.timestamps || {};

      if (newStatus === 'Processing') order.timestamps.processing_at = now;
      if (newStatus === 'Shipped') order.timestamps.shipped_at = now;
      if (newStatus === 'Out for Delivery') order.timestamps.out_for_delivery_at = now;
      if (newStatus === 'Delivered') {
        order.timestamps.delivered_at = now;
        if (order.payment) order.payment.status = 'Paid';
      }
      if (newStatus === 'Returned') order.timestamps.returned_at = now;
      if (newStatus === 'Refunded') {
        order.timestamps.refunded_at = now;
        if (order.payment) order.payment.status = 'Refunded';
      }

      if (metadata) {
        Object.assign(order, metadata);
      }

      saveLocalOrders(orders);
      return { success: true, data: order };
    }
    return { success: false, error: 'Order not found' };
  },

  /**
   * Generates dynamic tracking timeline driven purely by orderStatus
   */
  getOrderTimeline(orderStatus, timestamps = {}, metadata = {}) {
    const norm = (orderStatus || 'Order Placed').trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Cancelled branch
    if (norm === 'Cancelled') {
      return [
        {
          id: 'placed',
          title: 'Order Placed',
          description: 'Order details registered and authorized',
          timestamp: timestamps.created_at ? new Date(timestamps.created_at).toLocaleString() : 'Done',
          status: 'completed'
        },
        {
          id: 'cancelled',
          title: 'Order Cancelled',
          description: metadata.cancel_reason ? `Reason: ${metadata.cancel_reason}` : 'Cancelled by customer',
          timestamp: timestamps.cancelled_at ? new Date(timestamps.cancelled_at).toLocaleString() : 'Cancelled',
          status: 'cancelled'
        }
      ];
    }

    // 2. Return & Refund branch
    const isReturnFlow = ['Return Requested', 'Returned', 'Refunded'].includes(norm);
    if (isReturnFlow) {
      const returnSteps = [
        {
          id: 'delivered',
          title: 'Delivered',
          description: 'Package handed over to recipient',
          timestamp: timestamps.delivered_at ? new Date(timestamps.delivered_at).toLocaleString() : 'Completed',
          status: 'completed'
        },
        {
          id: 'return_requested',
          title: 'Return Requested',
          description: metadata.return_request?.reason || 'Return request registered',
          timestamp: timestamps.return_requested_at ? new Date(timestamps.return_requested_at).toLocaleString() : 'Pending verification',
          status: 'completed'
        },
        {
          id: 'returned',
          title: 'Returned',
          description: 'Courier completed reverse pickup & verification',
          timestamp: timestamps.returned_at ? new Date(timestamps.returned_at).toLocaleString() : norm === 'Returned' ? 'In inspection' : 'Upcoming',
          status: norm === 'Returned' || norm === 'Refunded' ? 'completed' : 'upcoming'
        },
        {
          id: 'refunded',
          title: 'Refunded',
          description: 'Amount credited back to original payment method',
          timestamp: timestamps.refunded_at ? new Date(timestamps.refunded_at).toLocaleString() : norm === 'Refunded' ? 'Completed' : 'Upcoming',
          status: norm === 'Refunded' ? 'completed' : 'upcoming'
        }
      ];
      return returnSteps;
    }

    // 3. Normal fulfillment track
    const STAGES = [
      { id: 'placed', title: 'Order Placed', desc: 'Order details received and verified', tsKey: 'created_at' },
      { id: 'confirmed', title: 'Confirmed', desc: 'Payment authorized & boutique packaging initiated', tsKey: 'confirmed_at' },
      { id: 'processing', title: 'Processing', desc: 'Quality audit & luxury packaging underway', tsKey: 'processing_at' },
      { id: 'shipped', title: 'Shipped', desc: 'Handed over to premier logistics partner', tsKey: 'shipped_at' },
      { id: 'out_for_delivery', title: 'Out for Delivery', desc: 'Courier agent is en route to your address', tsKey: 'out_for_delivery_at' },
      { id: 'delivered', title: 'Delivered', desc: 'Safely delivered to destination address', tsKey: 'delivered_at' }
    ];

    const stageHierarchy = {
      'Order Placed': 0,
      'Pending': 0,
      'Confirmed': 1,
      'Processing': 2,
      'Shipped': 3,
      'Out for Delivery': 4,
      'Delivered': 5
    };

    const currentStageIndex = stageHierarchy[norm] !== undefined ? stageHierarchy[norm] : 1;

    return STAGES.map((stage, idx) => {
      let status = 'upcoming';
      if (idx < currentStageIndex) {
        status = 'completed';
      } else if (idx === currentStageIndex) {
        status = 'current';
      }

      let timeDisplay = 'Pending';
      if (timestamps[stage.tsKey]) {
        timeDisplay = new Date(timestamps[stage.tsKey]).toLocaleString();
      } else if (status === 'completed') {
        timeDisplay = 'Completed';
      } else if (status === 'current') {
        timeDisplay = 'In Progress';
      } else if (stage.id === 'delivered' && timestamps.estimated_delivery) {
        timeDisplay = `Est: ${new Date(timestamps.estimated_delivery).toLocaleDateString()}`;
      }

      return {
        id: stage.id,
        title: stage.title,
        description: stage.desc,
        timestamp: timeDisplay,
        status
      };
    });
  },

  /**
   * Generates formal invoice data for an order
   */
  async getOrderInvoice(orderId) {
    const orders = loadLocalOrders();
    const order = orders.find(o => o.order_id === orderId || o.id === orderId);
    if (!order) return { success: false, error: 'Order not found' };

    const invoiceNumber = `INV-2026-${(order.order_number || order.order_id).replace(/\D/g, '').slice(-5) || '88201'}`;
    const invoiceDate = new Date(order.created_at || Date.now()).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    return {
      success: true,
      data: {
        invoice_number: invoiceNumber,
        invoice_date: invoiceDate,
        seller: {
          company: 'GoMo Deals Luxury Retail Pvt. Ltd.',
          gstin: '33AABCG1234F1Z5',
          cin: 'U52100TN2026PTC109823',
          address: 'GoMo Commercial Tower, Guindy Industrial Estate, Chennai, Tamil Nadu 600032',
          support_email: 'concierge@gomodeals.com'
        },
        order
      }
    };
  }
};

export const createOrder = (data) => orderService.createOrder(data);
export const createRazorpayOrder = (amount) => orderService.createRazorpayOrder(amount);
export const sendOrderConfirmationEmail = (data) => orderService.sendOrderConfirmationEmail(data);
export const getMyOrders = (id) => orderService.getMyOrders(id);
export const getOrderDetails = (id) => orderService.getOrderDetails(id);
export const cancelOrder = (id, cid, reason) => orderService.cancelOrder(id, cid, reason);
export const createReturnRequest = (data) => orderService.createReturnRequest(data);
export const updateOrderStatus = (id, status, meta) => orderService.updateOrderStatus(id, status, meta);
export const getOrderTimeline = (status, ts, meta) => orderService.getOrderTimeline(status, ts, meta);
export const getOrderInvoice = (id) => orderService.getOrderInvoice(id);

export default orderService;
