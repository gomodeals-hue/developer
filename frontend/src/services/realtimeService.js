/**
 * GoMo Deals Real-Time EventSource Client Service
 * Connects to the backend Server-Sent Events (SSE) stream
 * for real-time inventory updates, live order tracking, and purchase alerts.
 */

class RealtimeService {
  constructor() {
    this.eventSource = null;
    this.listeners = new Map();
    this.isConnected = false;
    this.reconnectTimer = null;
    this.reconnectAttempts = 0;
    this.statusListeners = new Set();
    this.latency = 0;
    this.lastPing = Date.now();
  }

  /**
   * Connect to the backend SSE endpoint
   */
  connect() {
    if (this.eventSource && this.eventSource.readyState !== EventSource.CLOSED) {
      return;
    }

    // Try relative URL which proxies through Vite /api to backend
    const sseUrl = '/api/v1/realtime/stream';

    try {
      this.eventSource = new EventSource(sseUrl);

      this.eventSource.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.notifyStatus(true);
      };

      this.eventSource.onerror = () => {
        this.isConnected = false;
        this.notifyStatus(false);
        if (this.eventSource) {
          this.eventSource.close();
          this.eventSource = null;
        }
        this.scheduleReconnect();
      };

      // Built-in event listeners
      this.setupEventListener('CONNECTED', (data) => {
        this.isConnected = true;
        this.notifyStatus(true);
      });

      this.setupEventListener('HEARTBEAT', (data) => {
        this.latency = Date.now() - (data.timestamp || Date.now());
        this.lastPing = Date.now();
        this.notifyStatus(true);
      });

      this.setupEventListener('STOCK_UPDATE', (data) => {
        this.emit('stock_update', data);
      });

      this.setupEventListener('NEW_PRODUCT_LISTED', (data) => {
        this.emit('new_product', data);
      });

      this.setupEventListener('PRODUCT_DELETED', (data) => {
        this.emit('product_deleted', data);
      });

      this.setupEventListener('ORDER_STATUS_UPDATE', (data) => {
        this.emit('order_update', data);
      });

      this.setupEventListener('NEW_ORDER', (data) => {
        this.emit('new_order', data);
      });

      this.setupEventListener('NEW_REVIEW', (data) => {
        this.emit('new_review', data);
      });

      this.setupEventListener('LIVE_PURCHASE_ALERT', (data) => {
        this.emit('live_purchase', data);
      });

      this.setupEventListener('NEW_VOC_INQUIRY', (data) => {
        this.emit('new_voc', data);
      });

      this.setupEventListener('VOC_REPLY', (data) => {
        this.emit('voc_reply', data);
      });

      this.setupEventListener('VOC_STATUS_UPDATE', (data) => {
        this.emit('voc_status', data);
      });

      this.setupEventListener('NEW_SUPPORT_TICKET', (data) => {
        this.emit('new_ticket', data);
      });

      this.setupEventListener('TICKET_STATUS_UPDATE', (data) => {
        this.emit('ticket_status', data);
      });

    } catch (err) {
      console.warn('[Realtime] SSE connection failed:', err);
      this.scheduleReconnect();
    }
  }

  setupEventListener(eventName, callback) {
    if (!this.eventSource) return;
    this.eventSource.addEventListener(eventName, (event) => {
      try {
        const data = JSON.parse(event.data);
        callback(data);
      } catch (e) {
        callback(event.data);
      }
    });
  }

  scheduleReconnect() {
    if (this.reconnectTimer) return;
    const timeout = Math.min(10000, 2000 * Math.pow(1.5, this.reconnectAttempts));
    this.reconnectAttempts++;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, timeout);
  }

  notifyStatus(connected) {
    for (const cb of this.statusListeners) {
      try {
        cb({ connected, latency: Math.max(5, this.latency) });
      } catch (e) {}
    }
  }

  onStatusChange(callback) {
    this.statusListeners.add(callback);
    callback({ connected: this.isConnected, latency: Math.max(5, this.latency) });
    return () => this.statusListeners.delete(callback);
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      for (const cb of this.listeners.get(event)) {
        try {
          cb(data);
        } catch (e) {
          console.error(`[Realtime] Listener error on event "${event}":`, e);
        }
      }
    }
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.isConnected = false;
    this.notifyStatus(false);
  }
}

export const realtimeService = new RealtimeService();
// Auto-connect singleton
if (typeof window !== 'undefined') {
  realtimeService.connect();
}
