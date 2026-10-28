import { getDB } from '../database/db.js';

export function handleChatbotRoutes(req, res, pathname, method, query, body, sendJSON) {
  // POST /api/v1/chatbot/message
  if (pathname === '/api/v1/chatbot/message' && method === 'POST') {
    const db = getDB();
    const message = (body.message || '').trim().toLowerCase();
    const history = body.history || [];

    // 1. TICKET / ISSUE / COMPLAINT / CUSTOMER SERVICE PERFORMANCE
    if (
      message.includes('ticket') || 
      message.includes('issue') || 
      message.includes('complaint') || 
      message.includes('support') || 
      message.includes('help desk') ||
      message.includes('customer service') ||
      message.includes('raise')
    ) {
      return sendJSON(res, {
        success: true,
        reply: `Note: you need to raise a ticket after any issue.\n\nEvery customer grievance is assigned an official tracking ticket (e.g. TKT-XXXX) with a guaranteed 4-hour SLA response.\n\nHow to raise a ticket:\n1. Go to "My Orders" from your account.\n2. Click "Raise Support Ticket" on any order or item.\n3. State your query or issue with optional priority.\n4. Our support team and merchant are notified instantly to provide official resolution.\n\nOn-time delivery and reliable resolution of your order is important for customer satisfaction.`,
        suggestedReplies: [
          "Shipping performance & SLA",
          "Track my order",
          "0% commission policy",
          "Return & Refund policy"
        ]
      });
    }

    // 2. SHIPPING PERFORMANCE, SLA & METRICS
    if (
      message.includes('sla') || 
      message.includes('shipping performance') || 
      message.includes('on time') || 
      message.includes('ontime') || 
      message.includes('metric') || 
      message.includes('ldr') || 
      message.includes('late delivery') ||
      message.includes('cancellation') ||
      message.includes('pickup rate') ||
      message.includes('compliance')
    ) {
      return sendJSON(res, {
        success: true,
        reply: `**Shipping Performance & Delivery SLA**\n\nOn-time delivery of your order is important for customer satisfaction.\n\nOur verified platform metrics:\n• On-Time Delivery Rate: 97.8%\n• Value Pickup Rate: 99.1%\n• Late Delivery Rate (LDR): 3.12%\n• Pre-fulfillment Cancellation Rate: 0.45%\n\nAll merchant dispatches are monitored in real time under strict product policy compliance. If any delay occurs, our automated re-routing ensures prompt delivery.`,
        suggestedReplies: [
          "Raise a support ticket",
          "Track my order",
          "0% commission policy",
          "Today's hot deals"
        ]
      });
    }

    // 3. ZERO COMMISSION POLICY FOR SELLERS (< Rs. 1000)
    if (
      message.includes('commission') || 
      message.includes('fee') || 
      message.includes('charges') || 
      message.includes('1000') ||
      message.includes('seller tier') ||
      message.includes('margin')
    ) {
      return sendJSON(res, {
        success: true,
        reply: `**GoMo Deals 0% Commission Policy**\n\n• **0% commission for less than Rs. 1000 for sellers (not customers)**.\n• Verified merchants retain 100% of order value on all listings priced below Rs. 1,000, promoting grassroots entrepreneurship and ultra-competitive marketplace pricing.\n• **For Customers**: All prices displayed are completely transparent with zero hidden checkout commission or surprise surcharges.\n\nAre you looking to purchase or register as a GoMo Deals Merchant?`,
        suggestedReplies: [
          "Today's hot deals",
          "Shipping performance & SLA",
          "Track my order",
          "Raise a support ticket"
        ]
      });
    }

    // 4. ORDER TRACKING & STATUS
    if (
      message.includes('track') || 
      message.includes('order') || 
      message.includes('status') || 
      message.includes('where is') ||
      message.includes('delivery status')
    ) {
      const orders = db.orders || [];
      // Look for order reference in user message
      const matchedOrder = orders.find(o => 
        (o.order_number && message.includes(o.order_number.toLowerCase())) ||
        (o.id && message.includes(o.id.toLowerCase()))
      );

      if (matchedOrder) {
        return sendJSON(res, {
          success: true,
          reply: `**Order #${matchedOrder.order_number || matchedOrder.id} Status**\n\n• Current Status: **${(matchedOrder.status || 'Processing').toUpperCase()}**\n• Total Value: ₹${(matchedOrder.total_amount || 0).toLocaleString('en-IN')}\n• Payment Method: ${matchedOrder.payment_method || 'Online UPI'}\n• Estimated Delivery: Within 2-3 business days\n\nOn-time delivery of your order is important for customer satisfaction. You can view step-by-step courier scans under "My Orders".`,
          suggestedReplies: [
            "Shipping performance & SLA",
            "Raise a support ticket",
            "Today's hot deals"
          ]
        });
      }

      if (orders.length > 0) {
        const latest = orders[orders.length - 1];
        return sendJSON(res, {
          success: true,
          reply: `**Latest Order Reference: #${latest.order_number || latest.id}**\n\n• Status: **${(latest.status || 'Confirmed').toUpperCase()}**\n• Items: ${latest.items?.length || 1} item(s)\n• Amount: ₹${(latest.total_amount || 0).toLocaleString('en-IN')}\n\nYou can track all your active shipments in real time in "My Orders". To look up a specific package, simply reply with your Order ID!`,
          suggestedReplies: [
            "Track my order",
            "Shipping performance & SLA",
            "Raise a support ticket"
          ]
        });
      }

      return sendJSON(res, {
        success: true,
        reply: `**Live Order Tracking**\n\nTo view your shipment progress:\n1. Check the "My Orders" tab on your top menu.\n2. Or send me your Order ID (e.g. ORD-1001) right here.\n\nAll orders are backed by our 97.8% On-Time Delivery guarantee.`,
        suggestedReplies: [
          "Shipping performance & SLA",
          "Today's hot deals",
          "Raise a support ticket"
        ]
      });
    }

    // 5. RETURNS & REFUNDS
    if (
      message.includes('return') || 
      message.includes('refund') || 
      message.includes('cancel') || 
      message.includes('exchange')
    ) {
      return sendJSON(res, {
        success: true,
        reply: `**Returns & Refunds Policy**\n\n• **15-Day Return Window**: Hassle-free returns available on all eligible items within 15 days of delivery.\n• **Zero Pickup Fee**: Free doorstep courier pickup from your delivery address.\n• **Fast Payout**: Refunds are initiated within 24 hours of quality inspection.\n• **Note**: You need to raise a ticket after any issue to ensure prompt auditing and instant replacement dispatch.`,
        suggestedReplies: [
          "Raise a support ticket",
          "Track my order",
          "Shipping performance & SLA"
        ]
      });
    }

    // 6. HOT DEALS & OFFERS
    if (
      message.includes('deal') || 
      message.includes('discount') || 
      message.includes('offer') || 
      message.includes('sale') || 
      message.includes('price')
    ) {
      const featured = [...(db.products || [])]
        .sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0))
        .slice(0, 3);

      const itemsText = featured.map((p, i) => 
        `${i + 1}. **${p.name}**\n   • Price: ₹${(p.price || 0).toLocaleString('en-IN')}${p.mrp ? ` (MRP ₹${p.mrp.toLocaleString('en-IN')})` : ''} — ${p.discount_percentage || 15}% OFF\n   • Category: ${p.category || 'General'}`
      ).join('\n\n');

      return sendJSON(res, {
        success: true,
        reply: `**Today's Top Deals on GoMo Deals:**\n\n${itemsText}\n\nAll orders feature free doorstep shipping and 15-day return protection.`,
        products: featured,
        suggestedReplies: [
          "Shipping performance & SLA",
          "0% commission policy",
          "Track my order"
        ]
      });
    }

    // 7. DEFAULT WELCOME / FALLBACK
    return sendJSON(res, {
      success: true,
      reply: `Hello! Welcome to GoMo Deals Customer Support Assistant.\n\nI can assist you with:\n• **Shipping Performance & SLA** (97.8% On-Time Delivery Guarantee)\n• **Support Tickets & Issue Resolution** (Note: you need to raise a ticket after any issue)\n• **0% Commission Policy** (0% fee for sellers on items under Rs. 1000)\n• **Live Order Tracking** & Courier Status\n• **Returns, Replacements & Instant Refunds**\n\nHow can I help you today?`,
      suggestedReplies: [
        "Shipping performance & SLA",
        "Raise a support ticket",
        "0% commission policy",
        "Track my order",
        "Today's hot deals"
      ]
    });
  }

  return false;
}
