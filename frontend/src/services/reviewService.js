import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

const REVIEWS_STORAGE_KEY = 'gomo_product_reviews';
const ORDERS_STORAGE_KEY = 'gomo_customer_orders';

const DEFAULT_REVIEWS = [
  {
    review_id: 'rev_1',
    product_id: 'el_1',
    product_name: 'Sony WH-1000XM5 Wireless Headphones',
    user_name: 'Alex Mercer',
    customer_name: 'Alex Mercer',
    user_email: 'alex@example.com',
    customer_email: 'alex@example.com',
    rating: 5,
    title: 'Outstanding Sound & Noise Cancelling',
    body: 'Outstanding quality and fast delivery! Fits description perfectly.',
    comment: 'Outstanding quality and fast delivery! Fits description perfectly.',
    is_verified_purchase: true,
    status: 'approved',
    created_at: '2026-02-15T10:30:00Z'
  },
  {
    review_id: 'rev_2',
    product_id: 'el_2',
    product_name: 'Apple MacBook Air M2',
    user_name: 'Priya Sundaram',
    customer_name: 'Priya Sundaram',
    user_email: 'priya@example.com',
    customer_email: 'priya@example.com',
    rating: 4,
    title: 'Super sleek & solid battery life',
    body: 'Great build, battery life is super solid. Would recommend.',
    comment: 'Great build, battery life is super solid. Would recommend.',
    is_verified_purchase: true,
    status: 'approved',
    created_at: '2026-02-18T14:15:00Z'
  },
  {
    review_id: 'rev_3',
    product_id: 'fas_1',
    product_name: 'Italian Tailored Linen Blazer',
    user_name: 'Rohan Sharma',
    customer_name: 'Rohan Sharma',
    user_email: 'rohan@example.com',
    customer_email: 'rohan@example.com',
    rating: 3,
    title: 'Good quality, runs slightly small',
    body: 'Material is great, but size runs slightly small.',
    comment: 'Material is great, but size runs slightly small.',
    is_verified_purchase: true,
    status: 'approved',
    created_at: '2026-02-25T09:20:00Z'
  }
];

function loadLocalReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
      return DEFAULT_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_REVIEWS;
  } catch {
    return DEFAULT_REVIEWS;
  }
}

function saveLocalReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Failed to save reviews:', err);
  }
}

function getStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const reviewService = {
  /**
   * Get reviews for a specific product (filtered to approved for customers)
   */
  async getProductReviews(productId) {
    const all = loadLocalReviews();
    const reviews = all.filter(r => (r.product_id === productId || r.productId === productId) && r.status !== 'flagged');

    const averageRating = reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
      : '4.8';

    return {
      success: true,
      data: reviews,
      averageRating: Number(averageRating),
      totalReviews: reviews.length
    };
  },

  /**
   * Check if the authenticated customer is eligible to review the product
   * Checks whether the user has a Delivered order containing this product
   */
  async checkCanReview(productId, user = null) {
    if (!user) {
      return {
        success: true,
        canReview: false,
        alreadyReviewed: false,
        reason: 'Authentication required'
      };
    }

    const reviews = loadLocalReviews();
    const userEmail = (user.email || '').toLowerCase();
    const userId = user.id || user._id;

    // Check if user already reviewed
    const alreadyReviewed = reviews.some(r => 
      (r.product_id === productId) && 
      ((r.user_email && r.user_email.toLowerCase() === userEmail) || (r.customer_id === userId))
    );

    if (alreadyReviewed) {
      return {
        success: true,
        canReview: false,
        alreadyReviewed: true,
        reason: 'Already reviewed this item'
      };
    }

    // Inspect user's orders to verify delivered status
    const orders = getStoredOrders();
    const userOrders = orders.filter(o => 
      (o.customer_email && o.customer_email.toLowerCase() === userEmail) || 
      (o.customer_id === userId) ||
      (o.customer?.email && o.customer.email.toLowerCase() === userEmail)
    );

    // Look for Delivered order containing the product
    let deliveredOrder = null;
    let foundItem = null;

    for (const order of userOrders) {
      const isDelivered = (order.status || order.order_status || '').toLowerCase() === 'delivered';
      const items = order.items || [];
      const match = items.find(it => (it.product_id === productId || it.id === productId));
      if (match && isDelivered) {
        deliveredOrder = order;
        foundItem = match;
        break;
      }
    }

    const hasDeliveredPurchase = Boolean(deliveredOrder);

    return {
      success: true,
      canReview: hasDeliveredPurchase,
      alreadyReviewed: false,
      isVerifiedPurchase: hasDeliveredPurchase,
      orderId: deliveredOrder?.id || deliveredOrder?.order_id || null,
      orderItemId: foundItem ? `item_${productId}` : null,
      reason: hasDeliveredPurchase ? null : 'Only verified customers with a Delivered order can review this product'
    };
  },

  /**
   * Submit a customer review with verified purchase tagging
   */
  async addReview(reviewData, user = null) {
    const reviews = loadLocalReviews();

    const newReview = {
      review_id: `rev_${Date.now()}`,
      product_id: reviewData.product_id,
      product_name: reviewData.product_name || 'Boutique Item',
      customer_id: user?.id || reviewData.customer_id || 'guest',
      user_name: user?.name || reviewData.user_name || reviewData.customer_name || 'Verified Buyer',
      customer_name: user?.name || reviewData.user_name || reviewData.customer_name || 'Verified Buyer',
      user_email: user?.email || reviewData.user_email || reviewData.customer_email || 'buyer@gomodeals.com',
      customer_email: user?.email || reviewData.user_email || reviewData.customer_email || 'buyer@gomodeals.com',
      rating: Number(reviewData.rating || 5),
      title: reviewData.title || 'Verified Purchase Feedback',
      body: reviewData.body || reviewData.comment || '',
      comment: reviewData.body || reviewData.comment || '',
      variant_id: reviewData.variant_id || null,
      is_verified_purchase: true,
      status: 'approved',
      created_at: new Date().toISOString()
    };

    reviews.unshift(newReview);
    saveLocalReviews(reviews);

    return { success: true, data: newReview, message: 'Review submitted successfully.' };
  },

  /**
   * Admin: Get all reviews for moderation
   */
  async getAllReviews() {
    const reviews = loadLocalReviews();
    return { success: true, data: reviews };
  },

  /**
   * Admin: Moderate review (approve or flag)
   */
  async moderateReview(reviewId, status) {
    const reviews = loadLocalReviews();
    const idx = reviews.findIndex(r => r.review_id === reviewId);
    if (idx !== -1) {
      reviews[idx].status = status;
      saveLocalReviews(reviews);
      return { success: true, message: `Review marked as ${status}.` };
    }
    return { success: false, message: 'Review not found.' };
  },

  /**
   * Admin: Delete review
   */
  async deleteReview(reviewId) {
    let reviews = loadLocalReviews();
    reviews = reviews.filter(r => r.review_id !== reviewId);
    saveLocalReviews(reviews);
    return { success: true, message: 'Review deleted successfully.' };
  }
};

export const getProductReviews = (id) => reviewService.getProductReviews(id);
export const addReview = (data, user) => reviewService.addReview(data, user);
export const checkCanReview = (id, user) => reviewService.checkCanReview(id, user);

export default reviewService;
