import { apiClient } from './apiClient';

const API_BASE = 'http://127.0.0.1:5000/api/v1';

export const vocService = {
  /**
   * Get all inquiries for a specific seller
   */
  async getSellerInquiries(sellerId) {
    try {
      const res = await apiClient.get('/voc/seller', {
        headers: { 'x-seller-id': sellerId || 'seller-1' }
      });
      return res.data || { success: true, data: [] };
    } catch (err) {
      // Fallback direct fetch
      try {
        const direct = await fetch(`${API_BASE}/voc/seller`, {
          headers: { 'x-seller-id': sellerId || 'seller-1' }
        });
        return await direct.json();
      } catch (e) {
        console.error('getSellerInquiries failed:', e);
        return { success: false, data: [] };
      }
    }
  },

  /**
   * Get all inquiries for a specific customer
   */
  async getCustomerInquiries(customerId) {
    try {
      const res = await apiClient.get('/voc/customer', {
        headers: { 'x-customer-id': customerId || 'usr-1' }
      });
      return res.data || { success: true, data: [] };
    } catch (err) {
      try {
        const direct = await fetch(`${API_BASE}/voc/customer`, {
          headers: { 'x-customer-id': customerId || 'usr-1' }
        });
        return await direct.json();
      } catch (e) {
        console.error('getCustomerInquiries failed:', e);
        return { success: false, data: [] };
      }
    }
  },

  /**
   * Get inquiries for a specific order
   */
  async getOrderInquiries(orderId) {
    try {
      const res = await apiClient.get(`/voc/order/${orderId}`);
      return res.data || { success: true, data: [] };
    } catch (err) {
      try {
        const direct = await fetch(`${API_BASE}/voc/order/${orderId}`);
        return await direct.json();
      } catch (e) {
        return { success: false, data: [] };
      }
    }
  },

  /**
   * Customer submits an inquiry for an ordered item to the exact seller
   */
  async submitInquiry(payload) {
    try {
      const res = await apiClient.post('/voc', payload);
      return res.data;
    } catch (err) {
      try {
        const direct = await fetch(`${API_BASE}/voc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        return await direct.json();
      } catch (e) {
        console.error('submitInquiry failed:', e);
        throw e;
      }
    }
  },

  /**
   * Reply to an existing VOC inquiry thread
   */
  async replyToInquiry(inquiryId, replyData) {
    try {
      const res = await apiClient.post(`/voc/${inquiryId}/reply`, replyData);
      return res.data;
    } catch (err) {
      try {
        const direct = await fetch(`${API_BASE}/voc/${inquiryId}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(replyData)
        });
        return await direct.json();
      } catch (e) {
        console.error('replyToInquiry failed:', e);
        throw e;
      }
    }
  },

  /**
   * Update status of an inquiry (e.g. In Progress, Resolved)
   */
  async updateStatus(inquiryId, status, resolutionNotes = '') {
    try {
      const res = await apiClient.patch(`/voc/${inquiryId}/status`, {
        status,
        resolution_notes: resolutionNotes
      });
      return res.data;
    } catch (err) {
      try {
        const direct = await fetch(`${API_BASE}/voc/${inquiryId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, resolution_notes: resolutionNotes })
        });
        return await direct.json();
      } catch (e) {
        console.error('updateStatus failed:', e);
        throw e;
      }
    }
  }
};
