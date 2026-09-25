import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

const COUPONS_STORAGE_KEY = 'gomo_store_coupons';

const DEFAULT_COUPONS = [
  {
    coupon_id: 'coup_1',
    id: 'coup_1',
    code: 'WELCOME10',
    type: 'percentage',
    discount_percentage: 10,
    discount_percent: 10,
    min_order_value: 500,
    max_discount: 1000,
    max_usage: 100,
    used_count: 14,
    description: '10% OFF on your boutique purchase above ₹500',
    valid_until: '2026-12-31',
    expires_at: '2026-12-31',
    is_active: true,
    category: 'all'
  },
  {
    coupon_id: 'coup_2',
    id: 'coup_2',
    code: 'GOMO500',
    type: 'fixed',
    discount_amount: 500,
    min_order_value: 2999,
    max_discount: 500,
    max_usage: 50,
    used_count: 8,
    description: 'Flat ₹500 OFF on premium orders above ₹2,999',
    valid_until: '2026-12-31',
    expires_at: '2026-12-31',
    is_active: true,
    category: 'all'
  },
  {
    coupon_id: 'coup_3',
    id: 'coup_3',
    code: 'FREESHIP',
    type: 'shipping',
    free_shipping: true,
    min_order_value: 0,
    max_discount: 150,
    max_usage: 200,
    used_count: 42,
    description: 'Free standard express doorstep delivery on any order',
    valid_until: '2026-12-31',
    expires_at: '2026-12-31',
    is_active: true,
    category: 'all'
  },
  {
    coupon_id: 'coup_4',
    id: 'coup_4',
    code: 'LUXE25',
    type: 'percentage',
    discount_percentage: 25,
    discount_percent: 25,
    min_order_value: 5000,
    max_discount: 2500,
    max_usage: 20,
    used_count: 5,
    description: '25% OFF luxury showcase selections above ₹5,000',
    valid_until: '2026-12-31',
    expires_at: '2026-12-31',
    is_active: true,
    category: 'all'
  }
];

function loadStoredCoupons() {
  try {
    const raw = localStorage.getItem(COUPONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(DEFAULT_COUPONS));
      return DEFAULT_COUPONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_COUPONS;
  } catch {
    return DEFAULT_COUPONS;
  }
}

function saveStoredCoupons(coupons) {
  try {
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(coupons));
  } catch (err) {
    console.error('Failed to save coupons:', err);
  }
}

export const couponService = {
  /**
   * Get list of store coupons currently active and not expired
   */
  async getActiveCoupons() {
    const coupons = loadStoredCoupons();
    const now = new Date();

    const active = coupons.filter(c => {
      if (!c.is_active) return false;
      if (c.valid_until && new Date(c.valid_until) < now) return false;
      if (c.max_usage && Number(c.used_count || 0) >= Number(c.max_usage)) return false;
      return true;
    });

    return { success: true, data: active };
  },

  /**
   * Admin: Get all store coupons
   */
  async getAllCoupons() {
    const coupons = loadStoredCoupons();
    return { success: true, data: coupons };
  },

  async getAvailableCoupons() {
    return this.getActiveCoupons();
  },

  /**
   * Centralized Coupon Validation Engine
   * Validates:
   * 1. Active status
   * 2. Expiry date
   * 3. Usage limit (max_usage vs used_count)
   * 4. Minimum order value requirement
   * 5. Discount calculation (Percentage with max_discount cap, Fixed amount, Free shipping)
   * 6. Category eligibility (if category scoped)
   */
  async validateCoupon(code, subtotal = 0, items = []) {
    const cleanCode = code ? code.trim().toUpperCase() : '';
    if (!cleanCode) {
      return { success: false, message: 'Please enter a coupon code.', error: 'Please enter a coupon code.' };
    }

    const coupons = loadStoredCoupons();
    const matched = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!matched) {
      return { success: false, message: `Coupon code "${cleanCode}" is invalid.`, error: 'Invalid coupon code.' };
    }

    if (!matched.is_active) {
      return { success: false, message: `Coupon "${cleanCode}" has been deactivated.`, error: 'Coupon is inactive.' };
    }

    // Expiry check
    if (matched.valid_until) {
      const expiry = new Date(matched.valid_until);
      // set to end of expiry day
      expiry.setHours(23, 59, 59, 999);
      if (expiry < new Date()) {
        return { success: false, message: `Coupon "${cleanCode}" has expired.`, error: 'Coupon expired.' };
      }
    }

    // Usage limit check
    if (matched.max_usage && Number(matched.used_count || 0) >= Number(matched.max_usage)) {
      return { success: false, message: `Coupon "${cleanCode}" has reached its maximum redemption limit.`, error: 'Usage limit reached.' };
    }

    // Minimum order value check
    const minOrderVal = Number(matched.min_order_value || 0);
    if (subtotal < minOrderVal) {
      const errMsg = `Minimum order amount of ₹${minOrderVal.toLocaleString('en-IN')} required for code ${matched.code}.`;
      return { success: false, message: errMsg, error: errMsg };
    }

    // Calculate eligible subtotal (category scope)
    let eligibleSubtotal = subtotal;
    if (matched.category && matched.category !== 'all' && items.length > 0) {
      eligibleSubtotal = items.reduce((acc, item) => {
        const itemCat = (item.category || item.category_name || '').toLowerCase();
        if (itemCat.includes(matched.category.toLowerCase())) {
          return acc + (Number(item.price || 0) * Number(item.quantity || 1));
        }
        return acc;
      }, 0);

      if (eligibleSubtotal === 0) {
        return { 
          success: false, 
          message: `Coupon "${matched.code}" applies only to "${matched.category}" department items.`, 
          error: 'Category mismatch.' 
        };
      }
    }

    // Calculate discount
    let calculatedDiscount = 0;
    const pct = matched.discount_percentage || matched.discount_percent;

    if (matched.free_shipping) {
      calculatedDiscount = 0; // Handled as shipping waiver in checkout summary
    } else if (pct) {
      const rawDiscount = Math.round((eligibleSubtotal * Number(pct)) / 100);
      const maxCap = matched.max_discount ? Number(matched.max_discount) : Infinity;
      calculatedDiscount = Math.min(rawDiscount, maxCap);
    } else if (matched.discount_amount) {
      calculatedDiscount = Math.min(Number(matched.discount_amount), eligibleSubtotal);
    }

    return {
      success: true,
      data: {
        ...matched,
        calculatedDiscount,
        effectiveDiscount: calculatedDiscount,
        free_shipping: Boolean(matched.free_shipping)
      }
    };
  },

  /**
   * Record coupon redemption count
   */
  recordCouponRedemption(code) {
    if (!code) return;
    const coupons = loadStoredCoupons();
    const updated = coupons.map(c => {
      if (c.code.toUpperCase() === code.trim().toUpperCase()) {
        return {
          ...c,
          used_count: Number(c.used_count || 0) + 1
        };
      }
      return c;
    });
    saveStoredCoupons(updated);
  },

  /**
   * Admin: Create new coupon
   */
  async createCoupon(couponData) {
    const coupons = loadStoredCoupons();
    const code = (couponData.code || '').trim().toUpperCase();

    if (coupons.some(c => c.code.toUpperCase() === code)) {
      return { success: false, message: `Coupon with code "${code}" already exists.` };
    }

    const newCoupon = {
      ...couponData,
      coupon_id: `coup_${Date.now()}`,
      id: `coup_${Date.now()}`,
      code,
      type: couponData.type || (couponData.discount_percent ? 'percentage' : 'fixed'),
      discount_percentage: Number(couponData.discount_percent || couponData.discount_percentage || 0),
      discount_percent: Number(couponData.discount_percent || couponData.discount_percentage || 0),
      discount_amount: Number(couponData.discount_amount || 0),
      min_order_value: Number(couponData.min_order_value || 0),
      max_discount: couponData.max_discount ? Number(couponData.max_discount) : null,
      max_usage: couponData.max_usage ? Number(couponData.max_usage) : null,
      used_count: 0,
      valid_until: couponData.valid_until || couponData.expires_at || null,
      expires_at: couponData.valid_until || couponData.expires_at || null,
      is_active: couponData.is_active !== undefined ? couponData.is_active : true,
      category: couponData.category || 'all'
    };

    coupons.unshift(newCoupon);
    saveStoredCoupons(coupons);

    return { success: true, data: newCoupon, message: 'Coupon created successfully.' };
  },

  /**
   * Admin: Update existing coupon
   */
  async updateCoupon(id, couponData) {
    const coupons = loadStoredCoupons();
    const idx = coupons.findIndex(c => c.id === id || c.coupon_id === id);

    if (idx === -1) {
      return { success: false, message: 'Coupon not found.' };
    }

    coupons[idx] = {
      ...coupons[idx],
      ...couponData,
      code: (couponData.code || coupons[idx].code).trim().toUpperCase(),
      discount_percentage: couponData.discount_percent !== undefined ? Number(couponData.discount_percent) : coupons[idx].discount_percentage,
      discount_percent: couponData.discount_percent !== undefined ? Number(couponData.discount_percent) : coupons[idx].discount_percent,
      discount_amount: couponData.discount_amount !== undefined ? Number(couponData.discount_amount) : coupons[idx].discount_amount,
      min_order_value: couponData.min_order_value !== undefined ? Number(couponData.min_order_value) : coupons[idx].min_order_value,
      max_discount: couponData.max_discount !== undefined ? (couponData.max_discount ? Number(couponData.max_discount) : null) : coupons[idx].max_discount,
      max_usage: couponData.max_usage !== undefined ? (couponData.max_usage ? Number(couponData.max_usage) : null) : coupons[idx].max_usage,
      valid_until: couponData.valid_until || couponData.expires_at || coupons[idx].valid_until,
      expires_at: couponData.valid_until || couponData.expires_at || coupons[idx].expires_at
    };

    saveStoredCoupons(coupons);
    return { success: true, data: coupons[idx], message: 'Coupon updated successfully.' };
  },

  /**
   * Admin: Toggle coupon active status
   */
  async toggleCouponStatus(id, is_active) {
    return this.updateCoupon(id, { is_active });
  },

  /**
   * Admin: Delete coupon
   */
  async deleteCoupon(id) {
    let coupons = loadStoredCoupons();
    coupons = coupons.filter(c => c.id !== id && c.coupon_id !== id);
    saveStoredCoupons(coupons);
    return { success: true, message: 'Coupon deleted successfully.' };
  }
};

export const getActiveCoupons = () => couponService.getActiveCoupons();
export const getAllCoupons = () => couponService.getAllCoupons();
export const getAvailableCoupons = () => couponService.getAvailableCoupons();
export const validateCoupon = (code, subtotal, items) => couponService.validateCoupon(code, subtotal, items);
export const createCoupon = (data) => couponService.createCoupon(data);
export const updateCoupon = (id, data) => couponService.updateCoupon(id, data);
export const deleteCoupon = (id) => couponService.deleteCoupon(id);

export default couponService;