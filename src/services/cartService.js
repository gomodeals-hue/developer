import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

// Fallback in-memory/localStorage cart persistence for offline & Phase 1 mock mode
const LOCAL_STORAGE_KEY = 'gomo_cart_items';

const loadLocalCart = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalCart = (items) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to persist local cart:', err);
  }
};

export const cartService = {
  /**
   * Pure business logic: Centralized cart financial calculations
   * Standardizes subtotal, discounts, duties, taxes, and shipping fees
   */
  calculateCartSummary(items = [], coupon = null, options = {}) {
    const freeShippingThreshold = options.freeShippingThreshold || 1000;
    const standardShippingFee = options.shippingFee !== undefined ? options.shippingFee : 50;
    const expressShippingFee = 120;
    const taxRate = options.taxRate || 0.05; // 5% GST tax
    const deliveryMethod = options.deliveryMethod || 'standard';

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
    const totalItems = items.reduce((sum, item) => sum + Number(item.quantity || 1), 0);

    // Shipping rules
    let shipping = 0;
    if (subtotal > 0) {
      if (deliveryMethod === 'express') {
        shipping = expressShippingFee;
      } else {
        const hasFreeShipCoupon = coupon && (coupon.free_shipping || coupon.code === 'FREESHIP');
        shipping = (subtotal >= freeShippingThreshold || hasFreeShipCoupon) ? 0 : standardShippingFee;
      }
    }

    // Tax calculation (5% GST)
    const tax = Math.round(subtotal * taxRate);

    // Coupon discount calculation
    let discount = 0;
    if (coupon && subtotal > 0) {
      if (coupon.discount_percentage) {
        discount = Math.round((subtotal * coupon.discount_percentage) / 100);
      } else if (coupon.discount_amount) {
        discount = Math.min(Number(coupon.discount_amount), subtotal);
      }
    }

    const finalTotal = Math.max(0, subtotal + shipping + tax - discount);
    const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

    return {
      subtotal,
      totalItems,
      shipping,
      deliveryMethod,
      tax,
      discount,
      finalTotal,
      isFreeShipping: shipping === 0 && subtotal > 0,
      freeShippingThreshold,
      amountNeededForFreeShipping,
      freeShippingProgress
    };
  },

  /**
   * Validate stock availability for all items in the cart
   */
  validateCartStock(items = []) {
    const issues = [];
    for (const item of items) {
      const availableStock = item.stock_quantity !== undefined ? Number(item.stock_quantity) : 25;
      const requestedQty = Number(item.quantity || 1);
      if (requestedQty > availableStock) {
        issues.push({
          productId: item.product_id || item.id,
          name: item.name,
          requestedQty,
          availableStock,
          message: `Only ${availableStock} units of "${item.name}" available in stock.`
        });
      }
    }

    return {
      valid: issues.length === 0,
      issues,
      error: issues.length > 0 ? issues[0].message : null
    };
  },

  /**
   * Retrieve cart items for current user
   */
  async getCart(userId) {
    if (!API_CONFIG.USE_MOCK && userId) {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.CART.GET(userId));
        if (res.data?.success) {
          saveLocalCart(res.data.data);
          return res.data;
        }
      } catch (err) {
        console.warn('API getCart failed, using local storage:', err.message);
      }
    }

    return {
      success: true,
      data: loadLocalCart()
    };
  },

  /**
   * Add an item to the cart
   */
  async addToCart({ userId, product_id, variant_id = null, variant_value = null, quantity = 1, price, product = {} }) {
    if (!API_CONFIG.USE_MOCK && userId) {
      try {
        const res = await apiClient.post(API_CONFIG.ENDPOINTS.CART.ADD, {
          customer_id: userId,
          product_id,
          variant_id,
          variant_value,
          quantity,
          price
        });
        if (res.data?.success) {
          return res.data;
        }
      } catch (err) {
        console.warn('API addToCart failed, updating local cart:', err.message);
      }
    }

    // Local cart logic
    const cart = loadLocalCart();
    const existingIndex = cart.findIndex(
      item => (item.product_id === product_id || item.id === product_id) && 
              item.variant_id === variant_id && 
              (variant_value ? (item.variant_value === variant_value || item.selectedColor === variant_value) : true)
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        cart_item_id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        id: product_id,
        product_id,
        variant_id,
        variant_value: variant_value || product.variant_value || null,
        selectedColor: variant_value || product.variant_value || null,
        name: product.name || product.title || 'Product',
        price: Number(price || product.price || 0),
        quantity,
        thumbnail: product.thumbnail || product.images?.[0] || '',
        category_name: product.category_name || product.category || ''
      });
    }

    saveLocalCart(cart);
    return { success: true, data: cart };
  },

  /**
   * Update item quantity in cart
   */
  async updateQuantity(cartItemId, quantity) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.patch(API_CONFIG.ENDPOINTS.CART.UPDATE(cartItemId), { quantity });
        if (res.data?.success) return res.data;
      } catch (err) {
        console.warn('API updateQuantity failed, updating locally:', err.message);
      }
    }

    let cart = loadLocalCart();
    if (quantity <= 0) {
      cart = cart.filter(item => item.cart_item_id !== cartItemId && item.id !== cartItemId && item.product_id !== cartItemId);
    } else {
      cart = cart.map(item => {
        if (item.cart_item_id === cartItemId || item.id === cartItemId || item.product_id === cartItemId) {
          return { ...item, quantity };
        }
        return item;
      });
    }

    saveLocalCart(cart);
    return { success: true, data: cart };
  },

  /**
   * Remove item from cart
   */
  async removeItem(cartItemId) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.delete(API_CONFIG.ENDPOINTS.CART.REMOVE(cartItemId));
        if (res.data?.success) return res.data;
      } catch (err) {
        console.warn('API removeItem failed, removing locally:', err.message);
      }
    }

    const cart = loadLocalCart().filter(
      item => item.cart_item_id !== cartItemId && item.id !== cartItemId && item.product_id !== cartItemId
    );
    saveLocalCart(cart);
    return { success: true, data: cart };
  },

  /**
   * Clear the entire cart
   */
  async clearCart(userId) {
    if (!API_CONFIG.USE_MOCK && userId) {
      try {
        await apiClient.delete(API_CONFIG.ENDPOINTS.CART.CLEAR(userId));
      } catch (err) {
        console.warn('API clearCart failed:', err.message);
      }
    }
    saveLocalCart([]);
    return { success: true, data: [] };
  }
};

// Standalone named exports for backward compatibility
export const getCart = (id) => cartService.getCart(id);
export const addToCart = (payload) => cartService.addToCart(payload);
export const updateQuantity = (id, q) => cartService.updateQuantity(id, q);
export const removeItem = (id) => cartService.removeItem(id);
export const clearCart = (id) => cartService.clearCart(id);
export const calculateCartSummary = (items, coupon, opts) => cartService.calculateCartSummary(items, coupon, opts);
export const validateCartStock = (items) => cartService.validateCartStock(items);

export default cartService;
