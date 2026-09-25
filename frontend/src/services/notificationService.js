import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

const NOTIFICATIONS_STORAGE_KEY = 'gomo_customer_notifications';

const DEFAULT_NOTIFICATIONS = [
  {
    notification_id: 'notif_1',
    id: 'notif_1',
    customer_id: 'cust_1',
    title: 'Order Confirmed: #ORD-847291',
    message: 'Your order for Sony WH-1000XM5 has been confirmed and is being prepped for dispatch.',
    type: 'ORDER_CONFIRMED',
    icon: 'PackageCheck',
    created_at: '2026-03-05T11:30:00Z',
    is_read: true,
    link: '/my-orders'
  },
  {
    notification_id: 'notif_2',
    id: 'notif_2',
    customer_id: 'cust_1',
    title: 'Package Shipped via BlueDart',
    message: 'Tracking #BD-883921004 is out for transit with estimated doorstep arrival in 48 hours.',
    type: 'ORDER_STATUS_CHANGED',
    icon: 'Truck',
    created_at: '2026-03-06T09:15:00Z',
    is_read: true,
    link: '/my-orders'
  },
  {
    notification_id: 'notif_3',
    id: 'notif_3',
    customer_id: 'cust_1',
    title: 'Package Delivered Successfully',
    message: 'Your package was signed and delivered at your address. Enjoy your purchase!',
    type: 'ORDER_DELIVERED',
    icon: 'CheckCircle',
    created_at: '2026-03-08T14:40:00Z',
    is_read: false,
    link: '/my-orders'
  },
  {
    notification_id: 'notif_4',
    id: 'notif_4',
    customer_id: 'all',
    title: 'Weekend Flash Promo: Extra 20% Off',
    message: 'Use coupon code WELCOME10 or LUXE25 across premium electronics and home decor.',
    type: 'PROMOTION',
    icon: 'Tag',
    created_at: '2026-03-10T08:00:00Z',
    is_read: false,
    link: '/deals'
  }
];

function loadStoredNotifications() {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_NOTIFICATIONS;
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

function saveStoredNotifications(notifs) {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
  } catch (err) {
    console.error('Failed to save notifications:', err);
  }
}

export const notificationService = {
  /**
   * Get notifications for a specific customer
   */
  async getCustomerNotifications(customerId) {
    const all = loadStoredNotifications();
    const filtered = all.filter(n => n.customer_id === customerId || n.customer_id === 'all' || !n.customer_id);

    return {
      success: true,
      data: filtered,
      unreadCount: filtered.filter(n => !n.is_read).length
    };
  },

  /**
   * Create a new notification event
   */
  async createNotification({ customerId = 'all', title, message, type, link = '/my-orders' }) {
    const all = loadStoredNotifications();
    const newNotif = {
      notification_id: `notif_${Date.now()}`,
      id: `notif_${Date.now()}`,
      customer_id: customerId,
      title,
      message,
      type: type || 'GENERAL',
      created_at: new Date().toISOString(),
      is_read: false,
      link
    };

    all.unshift(newNotif);
    saveStoredNotifications(all);

    return { success: true, data: newNotif };
  },

  /**
   * Trigger order confirmation notification
   */
  async notifyOrderConfirmation(order) {
    return this.createNotification({
      customerId: order.customer_id || order.customer?.id,
      title: `Order Confirmed: #${(order.order_number || order.id).slice(0, 14)}`,
      message: `Thank you for your order! We're preparing your ${order.items?.length || 1} items for fulfillment.`,
      type: 'ORDER_CONFIRMED',
      link: '/my-orders'
    });
  },

  /**
   * Trigger order status update notification
   */
  async notifyOrderStatus(order, newStatus, courier = null) {
    let title = `Order Update: #${(order.order_number || order.id).slice(0, 14)}`;
    let message = `Your order status has been updated to "${newStatus}".`;

    if (newStatus.toLowerCase() === 'shipped') {
      title = `Order Shipped: #${(order.order_number || order.id).slice(0, 14)}`;
      message = courier 
        ? `Your package has been dispatched via ${courier} and is on its way.` 
        : `Your package has been dispatched and is currently in transit.`;
    } else if (newStatus.toLowerCase() === 'delivered') {
      title = `Package Delivered: #${(order.order_number || order.id).slice(0, 14)}`;
      message = `Your order has been delivered to your doorstep. Thank you for shopping with GoMo-Deals!`;
    } else if (newStatus.toLowerCase() === 'cancelled') {
      title = `Order Cancelled: #${(order.order_number || order.id).slice(0, 14)}`;
      message = `Your order has been cancelled as requested. Any applicable refund will be processed within 3-5 business days.`;
    }

    return this.createNotification({
      customerId: order.customer_id || order.customer?.id,
      title,
      message,
      type: newStatus.toLowerCase() === 'delivered' ? 'ORDER_DELIVERED' : 
            newStatus.toLowerCase() === 'cancelled' ? 'ORDER_CANCELLED' : 'ORDER_STATUS_CHANGED',
      link: '/my-orders'
    });
  },

  /**
   * Trigger refund notification
   */
  async notifyRefund(order, amount) {
    return this.createNotification({
      customerId: order.customer_id || order.customer?.id,
      title: `Refund Processed: #${(order.order_number || order.id).slice(0, 14)}`,
      message: `A refund of ₹${Number(amount).toLocaleString('en-IN')} has been initiated to your original payment method.`,
      type: 'ORDER_REFUNDED',
      link: '/my-orders'
    });
  },

  /**
   * Trigger promotional notification
   */
  async notifyPromotion(title, message, link = '/deals') {
    return this.createNotification({
      customerId: 'all',
      title,
      message,
      type: 'PROMOTION',
      link
    });
  },

  /**
   * Mark a single notification as read
   */
  async markNotificationAsRead(notificationId) {
    const all = loadStoredNotifications();
    const notif = all.find(n => n.id === notificationId || n.notification_id === notificationId);
    if (notif) {
      notif.is_read = true;
      saveStoredNotifications(all);
    }
    return { success: true };
  },

  /**
   * Mark all notifications as read for a customer
   */
  async markAllNotificationsAsRead(customerId) {
    const all = loadStoredNotifications();
    all.forEach(n => {
      if (n.customer_id === customerId || n.customer_id === 'all' || !n.customer_id) {
        n.is_read = true;
      }
    });
    saveStoredNotifications(all);
    return { success: true };
  },

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId) {
    let all = loadStoredNotifications();
    all = all.filter(n => n.id !== notificationId && n.notification_id !== notificationId);
    saveStoredNotifications(all);
    return { success: true };
  }
};

export const getCustomerNotifications = (id) => notificationService.getCustomerNotifications(id);
export const markNotificationAsRead = (id) => notificationService.markNotificationAsRead(id);
export const markAllNotificationsAsRead = (id) => notificationService.markAllNotificationsAsRead(id);
export const deleteNotification = (id) => notificationService.deleteNotification(id);

export default notificationService;
