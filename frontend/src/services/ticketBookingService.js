import { api } from './api';

export const ticketBookingService = {
  /**
   * Fetch movies with optional filters (search, genre, lang, format, sort, upcoming)
   */
  async getMovies(params = {}) {
    try {
      const res = await api.get('/movies', { params });
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Failed to fetch movies:', err);
      return [];
    }
  },

  /**
   * Fetch single movie details
   */
  async getMovieById(id) {
    try {
      const res = await api.get(`/movies/${id}`);
      return res.data;
    } catch (err) {
      console.error(`[TicketBookingService] Failed to fetch movie ${id}:`, err);
      return null;
    }
  },

  /**
   * Fetch all partner theatres
   */
  async getTheatres() {
    try {
      const res = await api.get('/theatres');
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Failed to fetch theatres:', err);
      return [];
    }
  },

  /**
   * Fetch showtimes for a movie
   */
  async getShowtimes(movieId) {
    try {
      const res = await api.get(`/showtimes/${movieId}`);
      return res.data;
    } catch (err) {
      console.error(`[TicketBookingService] Failed to fetch showtimes for ${movieId}:`, err);
      return [];
    }
  },

  /**
   * Fetch currently booked & held seats for a showtime slot
   */
  async getBookedSeats(showtimeId, date = 'today', time = '10:30 AM') {
    try {
      const res = await api.get(`/booked-seats/${showtimeId}`, {
        params: { date, time }
      });
      return res.data;
    } catch (err) {
      console.error(`[TicketBookingService] Failed to fetch seats for ${showtimeId}:`, err);
      return { bookedSeats: [], heldSeats: [] };
    }
  },

  /**
   * Lock seats for 10 minutes during checkout
   */
  async holdSeats(showtimeId, bookingDate, bookingTime, seats, email) {
    try {
      const res = await api.post('/seat-hold', {
        showtime_id: showtimeId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        seats,
        user_email: email
      });
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Failed to hold seats:', err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Create confirmed ticket booking
   */
  async createBooking(bookingData) {
    try {
      const res = await api.post('/bookings', bookingData);
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Booking creation failed:', err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Get booking details / receipt
   */
  async getBookingById(bookingId) {
    try {
      const res = await api.get(`/bookings/${bookingId}`);
      return res.data;
    } catch (err) {
      console.error(`[TicketBookingService] Failed to fetch booking ${bookingId}:`, err);
      return null;
    }
  },

  /**
   * Get user's bookings
   */
  async getMyBookings(email) {
    try {
      const res = await api.get('/my-bookings', {
        params: { email }
      });
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Failed to fetch user bookings:', err);
      return [];
    }
  },

  /**
   * Validate ticket entry QR code (staff check-in)
   */
  async checkinTicket(bookingId) {
    try {
      const res = await api.patch(`/bookings/${bookingId}/checkin`);
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Checkin failed:', err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Fetch cinema snacks and concession add-ons
   */
  async getAddons(ownerId = 'th_gomo_palazzo') {
    try {
      const res = await api.get(`/addons/${ownerId}`);
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Failed to fetch addons:', err);
      return [];
    }
  },

  /**
   * Join waitlist for full showtimes
   */
  async joinWaitlist(data) {
    try {
      const res = await api.post('/waitlist', data);
      return res.data;
    } catch (err) {
      console.error('[TicketBookingService] Failed to join waitlist:', err);
      return { success: false, message: err.message };
    }
  },

  /**
   * Validate promo code for ticket booking
   */
  async validateCoupon(code, subtotal) {
    try {
      const res = await api.post('/coupons/validate', { code, subtotal });
      return res.data;
    } catch (err) {
      return { valid: false, message: 'Invalid or expired coupon' };
    }
  },

  /**
   * Fetch movie reviews
   */
  async getReviews(movieId) {
    try {
      const res = await api.get(`/reviews/${movieId}`);
      return res.data;
    } catch (err) {
      return [];
    }
  },

  /**
   * Post movie review
   */
  async postReview(movieId, reviewData) {
    try {
      const res = await api.post(`/reviews/${movieId}`, reviewData);
      return res.data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
};
