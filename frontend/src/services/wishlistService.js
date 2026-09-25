import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

const LOCAL_STORAGE_KEY = 'gomo_wishlist_items';

const loadLocalWishlist = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalWishlist = (items) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save local wishlist:', err);
  }
};

export const wishlistService = {
  /**
   * Get wishlist items for user
   */
  async getWishlist(userId) {
    if (!API_CONFIG.USE_MOCK && userId) {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.WISHLIST.GET(userId));
        if (res.data?.success) {
          saveLocalWishlist(res.data.data);
          return res.data;
        }
      } catch (err) {
        console.warn('API getWishlist failed, using local wishlist:', err.message);
      }
    }

    return {
      success: true,
      data: loadLocalWishlist()
    };
  },

  /**
   * Add to wishlist
   */
  async addToWishlist(userId, product, variant_id = null) {
    const p = typeof product === 'object' ? product : { id: product, product_id: product, variant_id };
    const productId = p.product_id || p.id;
    let list = loadLocalWishlist();
    if (!list.some(item => (item.product_id || item.id) === productId)) {
      list.push({ ...p, id: productId, product_id: productId });
      saveLocalWishlist(list);
    }
    return { success: true, data: list };
  },

  /**
   * Toggle item in wishlist (add if missing, remove if present)
   */
  async toggleWishlist(userId, product) {
    const productId = product.product_id || product.id;
    let list = loadLocalWishlist();
    const index = list.findIndex(p => (p.product_id || p.id) === productId);

    if (index > -1) {
      list.splice(index, 1);
      saveLocalWishlist(list);
      return { success: true, action: 'removed', data: list };
    } else {
      list.push({ ...product, id: productId, product_id: productId });
      saveLocalWishlist(list);
      return { success: true, action: 'added', data: list };
    }
  },

  /**
   * Remove item from wishlist
   */
  async removeFromWishlist(userId, productId) {
    let list = loadLocalWishlist().filter(p => (p.product_id || p.id) !== productId);
    saveLocalWishlist(list);
    return { success: true, data: list };
  },

  async removeItem(wishlistItemId) {
    return this.removeFromWishlist(null, wishlistItemId);
  },

  async clearWishlist(_userId) {
    saveLocalWishlist([]);
    return { success: true, data: [] };
  },

  /**
   * Share wishlist
   */
  async shareWishlist(items) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post(API_CONFIG.ENDPOINTS.WISHLIST.SHARE, { items });
        return res.data;
      } catch (err) {
        console.warn('API shareWishlist failed:', err.message);
      }
    }
    const token = `share_${Date.now()}`;
    localStorage.setItem(`shared_wishlist_${token}`, JSON.stringify(items));
    return {
      success: true,
      token,
      shareUrl: `${window.location.origin}/shared-wishlist/${token}`
    };
  },

  /**
   * Retrieve shared wishlist by token
   */
  async getSharedWishlist(token) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.get(`/wishlist/share/${token}`);
        return res.data;
      } catch (err) {
        console.warn('API getSharedWishlist failed:', err.message);
      }
    }
    const saved = localStorage.getItem(`shared_wishlist_${token}`);
    return {
      success: true,
      data: saved ? JSON.parse(saved) : loadLocalWishlist()
    };
  },

  /**
   * Pure check if item is in wishlist
   */
  isInWishlist(wishlist = [], productId) {
    return wishlist.some(item => (item.product_id || item.id) === productId);
  }
};

export const getWishlist = (userId) => wishlistService.getWishlist(userId);
export const addToWishlist = (userId, p, v) => wishlistService.addToWishlist(userId, p, v);
export const toggleWishlist = (userId, p) => wishlistService.toggleWishlist(userId, p);
export const removeFromWishlist = (userId, id) => wishlistService.removeFromWishlist(userId, id);
export const removeItem = (id) => wishlistService.removeItem(id);
export const clearWishlist = (id) => wishlistService.clearWishlist(id);
export const shareWishlist = (items) => wishlistService.shareWishlist(items);
export const getSharedWishlist = (token) => wishlistService.getSharedWishlist(token);
export const isInWishlist = (w, id) => wishlistService.isInWishlist(w, id);

export default wishlistService;
