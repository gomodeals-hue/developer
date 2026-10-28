import { getDB, saveCollection } from '../database/db.js';
import { broadcast } from '../realtime.js';

export function handleVocRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();
  if (!db.voc_inquiries) {
    db.voc_inquiries = [];
  }

  // Helper: extract seller ID
  function getSellerId() {
    return req.headers['x-seller-id'] || query.seller_id || body.seller_id || '';
  }

  // Helper: extract customer ID
  function getCustomerId() {
    return req.headers['x-customer-id'] || query.customer_id || query.userId || body.customer_id || body.userId || '';
  }

  // 1. Get Seller's Voice of Customer Inquiries (GET /api/v1/voc/seller or /api/v1/voc/seller/:sellerId)
  if ((pathname === '/api/v1/voc/seller' || pathname.startsWith('/api/v1/voc/seller/')) && method === 'GET') {
    const pathSellerId = pathname.startsWith('/api/v1/voc/seller/') ? pathname.split('/').pop() : '';
    const sId = pathSellerId || getSellerId();
    let inquiries = db.voc_inquiries || [];
    if (sId) {
      inquiries = inquiries.filter(v => v.seller_id === sId || (sId === 'seller-1' && !v.seller_id));
    }
    // Sort newest first
    inquiries.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    return sendJSON(res, {
      success: true,
      count: inquiries.length,
      data: inquiries,
      inquiries
    });
  }

  // 2. Get Customer's Voice of Customer Inquiries (GET /api/v1/voc/customer)
  if (pathname === '/api/v1/voc/customer' && method === 'GET') {
    const cId = getCustomerId();
    let inquiries = db.voc_inquiries;
    if (cId) {
      inquiries = inquiries.filter(v => v.customer_id === cId || v.userId === cId);
    }
    inquiries.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    return sendJSON(res, {
      success: true,
      count: inquiries.length,
      data: inquiries,
      inquiries
    });
  }

  // 3. Get Inquiries for a Specific Order (GET /api/v1/voc/order/:orderId)
  if (pathname.startsWith('/api/v1/voc/order/') && method === 'GET') {
    const orderId = pathname.split('/').pop();
    const inquiries = db.voc_inquiries.filter(v => 
      v.order_id === orderId || v.order_number === orderId
    );
    return sendJSON(res, {
      success: true,
      count: inquiries.length,
      data: inquiries,
      inquiries
    });
  }

  // 4. Customer Submits a New VOC Inquiry to Exact Seller (POST /api/v1/voc)
  if (pathname === '/api/v1/voc' && method === 'POST') {
    const {
      order_id,
      order_number,
      product_id,
      product_name,
      product_thumbnail,
      seller_id,
      seller_name,
      customer_id,
      customer_name,
      customer_email,
      customer_phone,
      category,
      subject,
      message,
      priority
    } = body;

    if (!message || (!product_id && !product_name)) {
      return sendJSON(res, { 
        success: false, 
        message: 'Product information and issue message are required' 
      }, 400);
    }

    // Determine target seller
    let targetSellerId = seller_id;
    let targetSellerName = seller_name;

    if (!targetSellerId) {
      // Find seller from product in DB
      const prod = db.products.find(p => p.id === product_id || p.product_id === product_id);
      if (prod && prod.seller_id) {
        targetSellerId = prod.seller_id;
        targetSellerName = prod.seller_name || prod.brand;
      } else {
        targetSellerId = 'seller-1';
        targetSellerName = 'Divine Brass & Temple Arts';
      }
    }

    const newInquiryId = `voc-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const newInquiry = {
      id: newInquiryId,
      inquiry_id: newInquiryId,
      order_id: order_id || 'ORD-DIRECT',
      order_number: order_number || order_id || 'GOMO-VOC',
      product_id: product_id || 'general',
      product_name: product_name || 'Ordered Boutique Item',
      product_thumbnail: product_thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      seller_id: targetSellerId,
      seller_name: targetSellerName || 'Verified GoMo Seller',
      customer_id: customer_id || 'usr-1',
      customer_name: customer_name || 'Customer',
      customer_email: customer_email || 'customer@gomodeals.com',
      customer_phone: customer_phone || '+91 98450 12345',
      category: category || 'Product Issue',
      subject: subject || `Issue regarding ${product_name || 'order'}`,
      message,
      priority: priority || 'normal',
      status: 'pending', // pending | in_progress | seller_replied | resolved | closed
      created_at: nowIso,
      updated_at: nowIso,
      conversation: [
        {
          id: `msg-${Date.now()}`,
          sender: 'customer',
          sender_name: customer_name || 'Customer',
          message,
          timestamp: nowIso
        }
      ],
      resolution_notes: ''
    };

    db.voc_inquiries.unshift(newInquiry);
    saveCollection('voc_inquiries');

    // Real-Time broadcast to Seller Dashboard!
    broadcast('NEW_VOC_INQUIRY', {
      inquiry: newInquiry,
      seller_id: targetSellerId,
      message: `New Voice of Customer inquiry from ${newInquiry.customer_name} on Order #${newInquiry.order_number}`
    });

    return sendJSON(res, {
      success: true,
      message: `Your issue has been sent directly to ${newInquiry.seller_name}. You will receive updates here!`,
      data: newInquiry,
      inquiry: newInquiry
    }, 201);
  }

  // 5. Reply to VOC Inquiry (POST /api/v1/voc/:id/reply)
  if (pathname.startsWith('/api/v1/voc/') && pathname.endsWith('/reply') && method === 'POST') {
    const parts = pathname.split('/');
    const inquiryId = parts[parts.length - 2];
    const inquiry = db.voc_inquiries.find(v => v.id === inquiryId || v.inquiry_id === inquiryId);

    if (!inquiry) {
      return sendJSON(res, { success: false, message: 'Inquiry not found' }, 404);
    }

    const { message, sender, sender_name, status } = body;
    if (!message) {
      return sendJSON(res, { success: false, message: 'Message content is required' }, 400);
    }

    const isSeller = sender === 'seller';
    const nowIso = new Date().toISOString();

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: sender || 'seller',
      sender_name: sender_name || (isSeller ? inquiry.seller_name : inquiry.customer_name),
      message,
      timestamp: nowIso
    };

    inquiry.conversation.push(newMsg);
    inquiry.updated_at = nowIso;
    if (status) {
      inquiry.status = status;
    } else if (isSeller) {
      inquiry.status = 'seller_replied';
    } else {
      inquiry.status = 'in_progress';
    }

    if (body.resolution_notes) {
      inquiry.resolution_notes = body.resolution_notes;
    }

    saveCollection('voc_inquiries');

    // Broadcast to Customer & Seller
    broadcast('VOC_REPLY', {
      inquiryId: inquiry.id,
      reply: newMsg,
      status: inquiry.status,
      inquiry
    });

    return sendJSON(res, {
      success: true,
      message: 'Response sent successfully',
      data: inquiry,
      inquiry
    });
  }

  // 6. Update Status of VOC Inquiry (PATCH /api/v1/voc/:id/status)
  if (pathname.startsWith('/api/v1/voc/') && pathname.endsWith('/status') && (method === 'PATCH' || method === 'PUT')) {
    const parts = pathname.split('/');
    const inquiryId = parts[parts.length - 2];
    const inquiry = db.voc_inquiries.find(v => v.id === inquiryId || v.inquiry_id === inquiryId);

    if (!inquiry) {
      return sendJSON(res, { success: false, message: 'Inquiry not found' }, 404);
    }

    const { status, resolution_notes } = body;
    if (status) inquiry.status = status;
    if (resolution_notes !== undefined) inquiry.resolution_notes = resolution_notes;
    inquiry.updated_at = new Date().toISOString();

    saveCollection('voc_inquiries');

    broadcast('VOC_STATUS_UPDATE', {
      inquiryId: inquiry.id,
      status: inquiry.status,
      resolution_notes: inquiry.resolution_notes
    });

    return sendJSON(res, {
      success: true,
      message: `Inquiry status updated to ${inquiry.status}`,
      data: inquiry,
      inquiry
    });
  }

  return false;
}
