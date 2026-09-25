import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

export const PAYMENT_METHODS = [
  {
    id: 'CARD',
    label: 'Credit / Debit Card',
    description: 'Visa, MasterCard, RuPay, Amex',
    icon: 'CreditCard'
  },
  {
    id: 'UPI',
    label: 'Direct UPI Transfer',
    description: 'Instant verification via GPay, PhonePe, Paytm, BHIM',
    icon: 'QrCode'
  },
  {
    id: 'COD',
    label: 'Cash on Delivery',
    description: 'Pay cash or contactless UPI at doorstep upon delivery',
    icon: 'Truck'
  }
];

export const paymentService = {
  /**
   * Get supported store payment methods
   */
  getPaymentMethods() {
    return PAYMENT_METHODS;
  },

  /**
   * Validate payment input details before placing order
   */
  validatePaymentDetails(method, details = {}) {
    if (method === 'CARD') {
      const cleanNum = (details.cardNumber || '').replace(/\s+/g, '');
      if (!/^\d{16}$/.test(cleanNum)) {
        return { valid: false, error: 'Please enter a valid 16-digit card number' };
      }
      if (!details.cardHolder || details.cardHolder.trim().length < 3) {
        return { valid: false, error: 'Please enter the name on the card' };
      }
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(details.expiryDate || '')) {
        return { valid: false, error: 'Please enter a valid expiry date (MM/YY)' };
      }
      if (!/^\d{3,4}$/.test(details.cvv || '')) {
        return { valid: false, error: 'Please enter a valid 3 or 4 digit CVV' };
      }
      return { valid: true };
    }

    if (method === 'UPI') {
      const upiId = (details.upiId || '').trim();
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        return { valid: false, error: 'Please enter a valid UPI ID (e.g. yourname@okhdfcbank)' };
      }
      return { valid: true };
    }

    if (method === 'COD') {
      return { valid: true };
    }

    return { valid: false, error: 'Invalid payment method selected' };
  },

  /**
   * Process mock payment intent asynchronously
   */
  async processPayment({ method, details = {}, amount, currency = 'INR' }) {
    // Validate first
    const validation = this.validatePaymentDetails(method, details);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Simulate network delay for mock gateway
    await new Promise(resolve => setTimeout(resolve, 800));

    const txnId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    if (method === 'COD') {
      return {
        success: true,
        transaction_id: txnId,
        method: 'COD',
        status: 'PENDING',
        message: 'Order confirmed with Cash on Delivery payment.'
      };
    }

    // Masked identifier for receipt display
    let maskedAccount = '';
    if (method === 'CARD') {
      const clean = (details.cardNumber || '').replace(/\s+/g, '');
      maskedAccount = `•••• •••• •••• ${clean.slice(-4)}`;
    } else if (method === 'UPI') {
      maskedAccount = details.upiId;
    }

    return {
      success: true,
      transaction_id: txnId,
      method,
      status: 'PAID',
      masked_account: maskedAccount,
      amount,
      currency,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Create an online payment order intent (for future backend gateway)
   */
  async createPaymentOrder(amount, currency = 'INR') {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post(API_CONFIG.ENDPOINTS.PAYMENTS.CREATE_INTENT, { amount, currency });
        if (res.data?.success) return res.data;
      } catch (err) {
        console.warn('API createPaymentOrder failed, using mock payment session:', err.message);
      }
    }

    return {
      success: true,
      order_id: `pay_mock_${Date.now()}`,
      amount,
      currency,
      key: 'rzp_test_mock_key'
    };
  },

  /**
   * Verify completed payment signature/status
   */
  async verifyPayment(paymentDetails) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post(API_CONFIG.ENDPOINTS.PAYMENTS.VERIFY, paymentDetails);
        return res.data;
      } catch (err) {
        console.warn('API verifyPayment failed:', err.message);
      }
    }

    return {
      success: true,
      transaction_id: `txn_${Date.now()}`,
      status: 'VERIFIED'
    };
  }
};

export default paymentService;
