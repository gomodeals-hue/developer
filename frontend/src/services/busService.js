import { api } from './api';

export const busService = {
  /**
   * Fetch all supported bus origin and destination cities
   */
  async getCities() {
    try {
      const res = await api.get('/buses/cities');
      return res.data?.cities || [];
    } catch (err) {
      console.error('[BusService] Failed to fetch bus cities:', err);
      return [];
    }
  },

  /**
   * Search available bus trips with filters and sorting
   */
  async searchTrips(params = {}) {
    try {
      const res = await api.get('/buses/search', { params });
      return res.data;
    } catch (err) {
      console.error('[BusService] Failed to search bus trips:', err);
      return { success: false, trips: [], count: 0 };
    }
  },

  /**
   * Get trip details by ID
   */
  async getTripById(tripId) {
    try {
      const res = await api.get(`/buses/${tripId}`);
      return res.data?.trip || null;
    } catch (err) {
      console.error(`[BusService] Failed to fetch trip ${tripId}:`, err);
      return null;
    }
  },

  /**
   * Get interactive seat layout (lower & upper decks) and held/booked status
   */
  async getTripSeats(tripId) {
    try {
      const res = await api.get(`/buses/${tripId}/seats`);
      return res.data;
    } catch (err) {
      console.error(`[BusService] Failed to fetch seats for trip ${tripId}:`, err);
      return { success: false, layout: null };
    }
  },

  /**
   * Hold seats for 10 minutes during checkout
   */
  async holdSeats(tripId, seats, userEmail) {
    try {
      const res = await api.post('/bus-seat-holds', {
        trip_id: tripId,
        seats,
        user_email: userEmail
      });
      return res.data;
    } catch (err) {
      console.error('[BusService] Failed to hold bus seats:', err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Release seat hold
   */
  async releaseSeatHold(holdId) {
    try {
      const res = await api.delete(`/bus-seat-holds/${holdId}`);
      return res.data;
    } catch (err) {
      console.error('[BusService] Failed to release seat hold:', err);
      return { success: false };
    }
  },

  /**
   * Confirm bus booking
   */
  async createBooking(bookingData) {
    try {
      const res = await api.post('/bus-bookings', bookingData);
      return res.data;
    } catch (err) {
      console.error('[BusService] Bus booking creation failed:', err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Get confirmed bus booking by ID
   */
  async getBookingById(bookingId) {
    try {
      const res = await api.get(`/bus-bookings/${bookingId}`);
      return res.data?.booking || null;
    } catch (err) {
      console.error(`[BusService] Failed to fetch booking ${bookingId}:`, err);
      return null;
    }
  },

  /**
   * Cancel booking and compute refund as per operator policy
   */
  async cancelBooking(bookingId) {
    try {
      const res = await api.post(`/ticket-bookings/${bookingId}/cancel`);
      return res.data;
    } catch (err) {
      console.error(`[BusService] Cancellation failed for ${bookingId}:`, err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Check refund transaction status
   */
  async getRefundStatus(bookingId) {
    try {
      const res = await api.get(`/ticket-bookings/${bookingId}/refund`);
      return res.data?.refund || null;
    } catch (err) {
      console.error(`[BusService] Failed to fetch refund status for ${bookingId}:`, err);
      return null;
    }
  }
};
