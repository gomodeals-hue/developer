import { getDB, saveCollection } from '../database/db.js';
import { broadcast } from '../realtime.js';

export function handleTicketRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // Helper to ensure collection exists
  if (!Array.isArray(db.support_tickets)) {
    db.support_tickets = [];
  }

  // 1. GET /api/v1/tickets - Retrieve tickets (filterable by seller_id, author_id, order_id, status)
  if (pathname === '/api/v1/tickets' && method === 'GET') {
    const sellerId = query.seller_id || req.headers['x-seller-id'];
    const authorId = query.author_id || query.customer_id;
    const orderId = query.order_id;
    const status = query.status;

    let tickets = db.support_tickets;

    if (sellerId) {
      tickets = tickets.filter(t => t.author_id === sellerId || t.seller_id === sellerId);
    }
    if (authorId) {
      tickets = tickets.filter(t => t.author_id === authorId || t.customer_id === authorId);
    }
    if (orderId) {
      tickets = tickets.filter(t => t.order_id === orderId || t.order_number === orderId);
    }
    if (status && status !== 'all') {
      tickets = tickets.filter(t => t.status === status);
    }

    // Sort newest first
    tickets = [...tickets].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    return sendJSON(res, {
      success: true,
      count: tickets.length,
      tickets
    });
  }

  // 2. POST /api/v1/tickets - Raise a new support ticket
  if (pathname === '/api/v1/tickets' && method === 'POST') {
    const {
      author_type = 'seller', // 'seller' | 'customer'
      author_id,
      author_name,
      author_email,
      seller_id,
      order_id,
      order_number,
      product_name,
      category = 'general',
      subject,
      description,
      priority = 'medium'
    } = body;

    if (!subject || !description) {
      return sendJSON(res, { success: false, message: 'Subject and description are required to raise a ticket' }, 400);
    }

    const ticketNumber = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket = {
      id: ticketNumber,
      ticket_id: ticketNumber,
      author_type,
      author_id: author_id || (author_type === 'seller' ? 'seller-1' : 'usr-1'),
      author_name: author_name || (author_type === 'seller' ? 'Verified Merchant' : 'Valued Customer'),
      author_email: author_email || '',
      seller_id: seller_id || (author_type === 'seller' ? author_id || 'seller-1' : null),
      order_id: order_id || null,
      order_number: order_number || (order_id ? `GOMO-2026-${order_id.replace(/\D/g, '')}` : null),
      product_name: product_name || null,
      category,
      subject: subject.trim(),
      description: description.trim(),
      priority,
      status: 'open',
      resolution_note: '',
      history: [
        {
          timestamp: new Date().toISOString(),
          actor: author_name || 'Author',
          action: 'Ticket raised',
          note: `Issue reported under ${category.replace(/_/g, ' ')}`
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.support_tickets.unshift(newTicket);
    saveCollection('support_tickets');

    // Broadcast in real-time
    broadcast('NEW_SUPPORT_TICKET', {
      ticket: newTicket,
      timestamp: new Date().toISOString()
    });

    return sendJSON(res, {
      success: true,
      message: `Support ticket ${newTicket.id} created successfully. Our team will review within 4 business hours.`,
      ticket: newTicket
    }, 201);
  }

  // 3. PATCH /api/v1/tickets/:id - Update ticket status or resolution
  if (pathname.startsWith('/api/v1/tickets/') && method === 'PATCH') {
    const ticketId = pathname.split('/').pop();
    const ticket = db.support_tickets.find(t => t.id === ticketId || t.ticket_id === ticketId);

    if (!ticket) {
      return sendJSON(res, { success: false, message: 'Ticket not found' }, 404);
    }

    const { status, resolution_note, priority, actor_name = 'Support Desk' } = body;
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (resolution_note) ticket.resolution_note = resolution_note;
    ticket.updated_at = new Date().toISOString();

    if (!Array.isArray(ticket.history)) {
      ticket.history = [];
    }

    ticket.history.push({
      timestamp: new Date().toISOString(),
      actor: actor_name,
      action: status ? `Status updated to ${status}` : 'Ticket updated',
      note: resolution_note || `Priority set to ${ticket.priority}`
    });

    saveCollection('support_tickets');

    // Broadcast status change
    broadcast('TICKET_STATUS_UPDATE', {
      ticketId: ticket.id,
      status: ticket.status,
      resolution_note: ticket.resolution_note,
      updated_at: ticket.updated_at
    });

    return sendJSON(res, {
      success: true,
      message: `Ticket ${ticket.id} updated successfully`,
      ticket
    });
  }

  return false;
}
