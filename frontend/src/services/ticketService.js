const API_BASE = 'http://127.0.0.1:5000/api/v1';

export const ticketService = {
  /**
   * Fetch tickets by query filter
   */
  async getTickets(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.seller_id) query.append('seller_id', params.seller_id);
      if (params.author_id) query.append('author_id', params.author_id);
      if (params.customer_id) query.append('customer_id', params.customer_id);
      if (params.order_id) query.append('order_id', params.order_id);
      if (params.status && params.status !== 'all') query.append('status', params.status);

      const res = await fetch(`${API_BASE}/tickets?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('[TicketService] Failed to fetch tickets:', err);
      return { success: false, tickets: [] };
    }
  },

  /**
   * Raise a new support ticket
   */
  async raiseTicket(ticketData) {
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('[TicketService] Failed to raise ticket:', err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Update a ticket status or resolution note
   */
  async updateTicket(ticketId, updateData) {
    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('[TicketService] Failed to update ticket:', err);
      return { success: false, message: err.message };
    }
  }
};
