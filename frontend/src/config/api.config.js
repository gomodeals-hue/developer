/**
 * Centralized API Configuration for GoMo Cart
 * Prepares endpoints and base URL for future Spring Boot REST API + PostgreSQL
 */
export const API_CONFIG = {
  // Configurable base URL reading from environment variables with fallback
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 15000,
  // Flag to toggle between frontend mock services and real backend REST API
  USE_MOCK: import.meta.env.VITE_USE_MOCK !== 'false',

  // Centralized REST Endpoints definition
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      VERIFY_EMAIL: '/auth/verify-email',
      RESEND_CODE: '/auth/resend-code',
      FORGOT_PASSWORD: '/auth/forgot-password',
      ME: '/auth/me',
      REFRESH: '/auth/refresh'
    },
    PRODUCTS: {
      LIST: '/products',
      DETAIL: (id) => `/products/${id}`,
      FEATURED: '/products/featured',
      DEALS: '/products/deals',
      SEARCH: '/products/search',
      CATEGORIES: '/products/categories'
    },
    CATEGORIES: {
      LIST: '/categories',
      DETAIL: (slug) => `/categories/${slug}`,
      SUBCATEGORIES: (slug) => `/categories/${slug}/subcategories`
    },
    CART: {
      GET: (userId) => `/cart/${userId}`,
      ADD: '/cart/add',
      UPDATE: (itemId) => `/cart/items/${itemId}`,
      REMOVE: (itemId) => `/cart/items/${itemId}`,
      CLEAR: (userId) => `/cart/clear/${userId}`
    },
    WISHLIST: {
      GET: (userId) => `/wishlist/${userId}`,
      ADD: '/wishlist/add',
      REMOVE: (userId, productId) => `/wishlist/${userId}/${productId}`,
      SHARE: '/wishlist/share'
    },
    ORDERS: {
      LIST: (userId) => `/orders/user/${userId}`,
      DETAIL: (orderId) => `/orders/${orderId}`,
      CREATE: '/orders',
      CANCEL: (orderId) => `/orders/${orderId}/cancel`,
      RETURNS: '/orders/returns'
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile'
    },
    ADDRESSES: {
      LIST: (userId) => `/user/${userId}/addresses`,
      CREATE: (userId) => `/user/${userId}/addresses`,
      UPDATE: (addressId) => `/user/addresses/${addressId}`,
      DELETE: (addressId) => `/user/addresses/${addressId}`,
      SET_DEFAULT: (addressId) => `/user/addresses/${addressId}/default`
    },
    REVIEWS: {
      FOR_PRODUCT: (productId) => `/products/${productId}/reviews`,
      CREATE: '/reviews'
    },
    COUPONS: {
      LIST: '/coupons',
      VALIDATE: '/coupons/validate'
    },
    INVENTORY: {
      CHECK: '/inventory/check'
    },
    NOTIFICATIONS: {
      LIST: (userId) => `/notifications/${userId}`,
      MARK_READ: (id) => `/notifications/${id}/read`
    },
    PAYMENTS: {
      CREATE_INTENT: '/payments/create-intent',
      VERIFY: '/payments/verify'
    }
  }
};
