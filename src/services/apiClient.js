import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { adminService } from './adminService';

/**
 * Standardized API client instance with interceptors
 * Pre-configured with base URL, timeout, credentials, and token handling
 */
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request interceptor: Attach Auth Token if available & handle mock routing for Admin/Store
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Read CSRF token if cookie is set
      const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
      if (match) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[2]);
      }
    } catch {
      // Ignore in environments without window/localStorage
    }

    // If USE_MOCK is active, intercept admin API endpoints with mock adapter
    if (API_CONFIG.USE_MOCK) {
      const url = config.url || '';
      const method = (config.method || 'get').toLowerCase();

      // Custom mock adapter for admin endpoints
      config.adapter = async () => {
        try {
          // 1. Dashboard data
          if (url.includes('/admin/dashboard-data')) {
            const data = await adminService.getDashboardData();
            return { data, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 2. Admin Products
          if (url === '/admin/products' && method === 'get') {
            const data = await adminService.getProducts();
            return { data, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.startsWith('/admin/products/') && url.includes('/toggle-status')) {
            const pid = url.split('/')[3];
            const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
            const res = await adminService.toggleProductStatus(pid, body?.is_active ?? true);
            return { data: res, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 3. Admin Categories
          if (url.includes('/admin/categories') || url.includes('/products/categories')) {
            if (method === 'get') {
              const res = await adminService.getCategories();
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'post') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await adminService.createCategory(body);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
          }
          if (url.startsWith('/admin/category/')) {
            const catId = url.split('/')[3];
            if (method === 'put' || method === 'patch') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await adminService.updateCategory(catId, body);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'delete') {
              const res = await adminService.deleteCategory(catId);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
          }

          // 4. Admin Orders
          if (url === '/admin/orders' && method === 'get') {
            const data = await adminService.getOrders();
            return { data, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.startsWith('/orders/status/') || url.startsWith('/admin/orders/status/')) {
            const orderId = url.split('/').pop();
            const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
            const res = await adminService.updateOrderStatus(orderId, body);
            return { data: res, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/admin/orders/bulk-update')) {
            const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
            const res = await adminService.bulkUpdateOrders(body);
            return { data: res, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/admin/orders/auto-dispatch')) {
            const orders = await adminService.getOrders();
            const pendingIds = (orders.data || []).map(o => o.id);
            const res = await adminService.bulkUpdateOrders({ orderIds: pendingIds, status: 'Shipped', courier: 'BlueDart Express' });
            return { data: { success: true, message: 'All pending orders dispatched via BlueDart Express' }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 5. Admin Customers
          if (url === '/admin/customers' && method === 'get') {
            const data = await adminService.getCustomers();
            return { data, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.startsWith('/admin/customer/') && !url.includes('/status')) {
            const customerId = url.split('/')[3];
            if (method === 'get') {
              const res = await adminService.getCustomerDetails(customerId);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'delete') {
              return { data: { success: true, message: 'Customer account purged' }, status: 200, statusText: 'OK', headers: {}, config };
            }
          }
          if (url.includes('/admin/customer/') && url.includes('/status')) {
            const customerId = url.split('/')[3];
            const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
            const res = await adminService.toggleCustomerStatus(customerId, body?.is_active, body?.block_reason);
            return { data: res, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 6. Admin Reviews
          if (url === '/admin/reviews' && method === 'get') {
            const data = await adminService.getReviews();
            return { data, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.startsWith('/admin/reviews/')) {
            const revId = url.split('/')[3];
            if (method === 'delete') {
              const res = await adminService.deleteReview(revId);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'patch' || method === 'put') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await adminService.moderateReview(revId, body?.status || 'approved');
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
          }

          // 7. Banners & Homepage
          if (url === '/ad-banners/active') {
            const res = await adminService.getBanners();
            const now = new Date();
            const activeBanners = (res.banners || []).filter(b => {
              if (b.is_active === false) return false;
              if (b.start_date && new Date(b.start_date) > now) return false;
              if (b.end_date && new Date(b.end_date) < now) return false;
              return true;
            });
            return { data: { success: true, banners: activeBanners, data: activeBanners }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/ad-banners/admin') || url.includes('/admin/banners')) {
            if (method === 'get') {
              const res = await adminService.getBanners();
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'post' || method === 'put') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await adminService.saveBanner(body);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
          }
          if (url.startsWith('/ad-banners')) {
            const parts = url.split('/');
            const bId = parts[2];
            if (method === 'post') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await adminService.saveBanner(body);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'put' && bId) {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await adminService.saveBanner({ ...body, banner_id: bId });
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'delete' && bId) {
              const res = await adminService.deleteBanner(bId);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
          }
          if (url.includes('/admin/homepage-config')) {
            if (method === 'get') {
              const res = await adminService.getHomepageConfig();
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'post' || method === 'put') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await adminService.updateHomepageConfig(body);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
          }

          // 8. Brand Rankings & Homepage Showcase
          if (url.startsWith('/rankings')) {
            const { rankingService } = await import('./rankingService');
            if (url === '/rankings/showcase' && method === 'get') {
              const res = await rankingService.getShowcase();
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url === '/rankings/open' && method === 'get') {
              const res = await rankingService.getOpenCompetitions();
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url === '/rankings/vote' && method === 'post') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await rankingService.vote(body.competition_id, body.seller_id);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url === '/rankings/admin' && method === 'get') {
              const res = await rankingService.getAdminCompetitions();
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url === '/rankings/admin' && method === 'post') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await rankingService.saveCompetition(body);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url.startsWith('/rankings/admin/') && method === 'put') {
              const compId = url.split('/')[3];
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await rankingService.saveCompetition({ ...body, competition_id: compId });
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url.startsWith('/rankings/admin/') && method === 'delete') {
              const compId = url.split('/')[3];
              const res = await rankingService.deleteCompetition(compId);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url.includes('/rankings/admin/winner') && method === 'post') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await rankingService.declareWinner(body.competition_id, body.winner_seller_id);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
          }

          // 9. Admin Inventory
          if (url.includes('/admin/inventory')) {
            const { inventoryService } = await import('./inventoryService');
            if (url.includes('/admin/inventory/history')) {
              const res = await inventoryService.getInventoryHistory();
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (url.includes('/admin/inventory/adjust') && method === 'post') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
              const res = await inventoryService.adjustStock(body);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            const res = await inventoryService.getInventoryCatalog();
            return { data: res, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 10. Admin Reports & Financial Analytics
          if (url.includes('/admin/reports') || url.includes('/admin/business-reports')) {
            const res = await adminService.getBusinessReports();
            return { data: res, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/admin/analytics-data')) {
            const reports = await adminService.getBusinessReports();
            const repData = reports.data;
            const trend = [
              { period: 'Mon', revenue: Math.round(repData.revenue.grossRevenue * 0.12), orders: 1 },
              { period: 'Tue', revenue: Math.round(repData.revenue.grossRevenue * 0.18), orders: 1 },
              { period: 'Wed', revenue: Math.round(repData.revenue.grossRevenue * 0.25), orders: 2 },
              { period: 'Thu', revenue: Math.round(repData.revenue.grossRevenue * 0.15), orders: 1 },
              { period: 'Fri', revenue: Math.round(repData.revenue.grossRevenue * 0.30), orders: 2 }
            ];
            const analyticsData = {
              trend,
              categorySales: repData.inventory.categoryBreakdown.map(c => ({ category: c.category, sales: c.stockValue })),
              categoryDistribution: repData.inventory.categoryBreakdown.map(c => ({ name: c.category, value: c.skus })),
              statusDistribution: [
                { name: 'Delivered', value: repData.orders.ordersByStatus.Delivered || 1 },
                { name: 'Shipped', value: repData.orders.ordersByStatus.Shipped || 1 },
                { name: 'Processing', value: repData.orders.ordersByStatus.Processing || 1 }
              ],
              topProducts: repData.products.topSellingProducts,
              summary: {
                total_revenue: repData.revenue.grossRevenue,
                total_orders: repData.orders.totalOrders,
                total_items_sold: repData.products.totalUnitsSold,
                avg_order_value: repData.revenue.avgOrderValue
              }
            };
            return { data: { success: true, data: analyticsData }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/admin/finance-data')) {
            const reports = await adminService.getBusinessReports();
            const grossRev = reports?.data?.revenue?.grossRevenue || 485000;
            const financeData = {
              summary: {
                gross_revenue: grossRev,
                platform_commission: Math.round(grossRev * 0.15),
                net_profit: Math.round(grossRev * 0.12),
                pending_payouts: 45000,
                total_orders: reports?.data?.orders?.totalOrders || 48
              },
              monthlyPL: [
                { name: 'Jan', revenue: 65000, costs: 52000, profit: 13000 },
                { name: 'Feb', revenue: 85000, costs: 68000, profit: 17000 },
                { name: 'Mar', revenue: 120000, costs: 94000, profit: 26000 },
                { name: 'Apr', revenue: 95000, costs: 76000, profit: 19000 },
                { name: 'May', revenue: 140000, costs: 110000, profit: 30000 },
                { name: 'Jun', revenue: 165000, costs: 128000, profit: 37000 }
              ],
              payouts: [
                { id: 'pay_1', vendor: 'Heritage Crafts', amount: 32000, status: 'Completed', date: '2026-03-10' },
                { id: 'pay_2', vendor: 'Artisan Studio', amount: 18500, status: 'Processing', date: '2026-03-18' }
              ],
              transactions: [
                { id: 'tx_101', type: 'Credit', description: 'Order #ORD-847291 Settlement', amount: 4500, date: '2026-03-21', status: 'Success' },
                { id: 'tx_102', type: 'Credit', description: 'Order #ORD-847292 Settlement', amount: 2899, date: '2026-03-21', status: 'Success' },
                { id: 'tx_103', type: 'Debit', description: 'Payment Gateway Fee (Razorpay)', amount: 148, date: '2026-03-21', status: 'Settled' }
              ]
            };
            return { data: { success: true, data: financeData }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 11. Payments & Orphaned Payments
          if (url.includes('/admin/payments')) {
            const paymentsList = [
              { payment_id: 'pay_rzp_101', razorpay_order_id: 'order_EKw921a', order_id: 'ORD-847291', customer_name: 'Alex Mercer', amount: 4500, method: 'UPI (GPay)', status: 'Success', created_at: '2026-03-20T10:15:00Z' },
              { payment_id: 'pay_rzp_102', razorpay_order_id: 'order_EKw922b', order_id: 'ORD-847292', customer_name: 'Priya Sundaram', amount: 2899, method: 'Credit Card', status: 'Success', created_at: '2026-03-21T11:45:00Z' },
              { payment_id: 'pay_rzp_103', razorpay_order_id: 'order_EKw923c', order_id: 'ORD-847293', customer_name: 'Rohan Sharma', amount: 1599, method: 'Net Banking', status: 'Pending', created_at: '2026-03-22T09:30:00Z' }
            ];
            const stats = { total: '₹8,998', success: 2, failed: 0, pending: 1 };
            return { data: { success: true, data: paymentsList, stats }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/admin/orphaned-payments')) {
            if (url.includes('/resolve') && method === 'post') {
              return { data: { success: true, message: 'Orphaned payment resolved successfully' }, status: 200, statusText: 'OK', headers: {}, config };
            }
            const orphanedList = [
              { payment_id: 'pay_orph_001', razorpay_order_id: 'order_orp_991', amount: 1850, status: 'Captured', created_at: '2026-03-19T14:20:00Z' },
              { payment_id: 'pay_orph_002', razorpay_order_id: 'order_orp_992', amount: 3499, status: 'Captured', created_at: '2026-03-21T18:05:00Z' }
            ];
            return { data: { success: true, data: orphanedList }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 12. Returns Management
          if (url.includes('/admin/returns')) {
            if (url.includes('/resolve') && method === 'post') {
              const body = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data || {});
              return { data: { success: true, message: `Return request ${body.status || 'updated'} successfully` }, status: 200, statusText: 'OK', headers: {}, config };
            }
            const returnsList = [
              { id: 'ret_1', displayId: 'RET-001', orderId: 'ORD-847290', customer: 'David Miller', reason: 'Size too large, need replacement', status: 'Pending', refundAmount: 1899, date: '2026-03-21', items: [{ name: 'Oxford Cotton Shirt', qty: 1, price: 1899 }] },
              { id: 'ret_2', displayId: 'RET-002', orderId: 'ORD-847288', customer: 'Sneha Patel', reason: 'Defective zipper on backpack', status: 'Approved', refundAmount: 2499, date: '2026-03-18', items: [{ name: 'Urban Canvas Backpack', qty: 1, price: 2499 }] }
            ];
            return { data: { success: true, data: returnsList }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 13. System Audit Logs
          if (url.includes('/admin/audit-logs')) {
            const logsList = [
              { id: 'log_1', actor_name: 'Super Administrator', action: 'UPDATE_INVENTORY', table_name: 'products', ip_address: '192.168.1.1', created_at: '2026-03-22T10:14:00Z', data: { product_id: 'el_1', stock: 45 } },
              { id: 'log_2', actor_name: 'Alex Admin', action: 'DISPATCH_ORDER', table_name: 'orders', ip_address: '192.168.1.4', created_at: '2026-03-22T09:30:00Z', data: { order_id: 'ORD-847291', courier: 'BlueDart Express' } },
              { id: 'log_3', actor_name: 'System Engine', action: 'PRICE_RECALCULATION', table_name: 'catalog', ip_address: '127.0.0.1', created_at: '2026-03-22T00:00:00Z', data: { status: 'Success' } }
            ];
            return { data: { success: true, data: logsList }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 14. Notifications
          if (url.includes('/admin/notifications/') || url.includes('/notifications')) {
            const { getCustomerNotifications, markNotificationAsRead, deleteNotification } = await import('./notificationService');
            if (url.startsWith('/notifications/read/')) {
              const notifId = url.split('/').pop();
              const res = await markNotificationAsRead(notifId);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            if (method === 'delete') {
              const notifId = url.split('/').pop();
              const res = await deleteNotification(notifId);
              return { data: res, status: 200, statusText: 'OK', headers: {}, config };
            }
            const res = await getCustomerNotifications('admin');
            return { data: { success: true, notifications: res.data || [], data: res.data || [] }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 15. Super Admin Administrators
          if (url.includes('/super-admin/administrators')) {
            const adminList = [
              { id: 'admin_1', full_name: 'Master Super Admin', email: 'admin@gomodeals.com', role: 'super_admin', is_active: true, created_at: '2026-01-01' },
              { id: 'admin_2', full_name: 'Operations Manager', email: 'ops@gomodeals.com', role: 'admin', is_active: true, created_at: '2026-02-10' }
            ];
            return { data: { success: true, data: adminList }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/super-admin/administrator/')) {
            return { data: { success: true, message: 'Administrator status updated' }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/super-admin/master-key') || url.includes('/admin/change-password')) {
            return { data: { success: true, message: 'Master security credentials updated' }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 16. Admin Settings & Self Profile
          if (url.includes('/admin/settings/')) {
            if (method === 'put') {
              return { data: { success: true, message: 'Settings saved successfully' }, status: 200, statusText: 'OK', headers: {}, config };
            }
            return { data: { success: true, data: {} }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/admin/update-password-self')) {
            return { data: { success: true, message: 'Password updated successfully' }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 17. Sellers fallback (single-vendor returns empty seller list cleanly)
          if (url.includes('/admin/sellers') || url.includes('/sellers-data')) {
            return { data: { success: true, data: [] }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 18. Shipping, Tracking & Currencies
          if (url.includes('/shipping/get-serviceability/')) {
            return { data: { success: true, serviceability: { courier: 'BlueDart Express', cod: true, etd: '2 days' } }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/shipping/initiate/')) {
            return { data: { success: true, message: 'Shipment initiated with courier' }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/shiprocket/tracking/')) {
            return { data: { success: true, tracking: { status: 'In Transit', location: 'Hub Bengaluru', est_delivery: '2 days' } }, status: 200, statusText: 'OK', headers: {}, config };
          }
          if (url.includes('/config/currency-rates')) {
            return { data: { success: true, rates: { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 } }, status: 200, statusText: 'OK', headers: {}, config };
          }

          // 19. Chatbot endpoint mock response
          if (url.includes('/chatbot/message')) {
            const { generateSmartBotResponse } = await import('./chatbotService');
            const body = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data || {});
            const res = generateSmartBotResponse(body.message, body.history);
            return { data: res, status: 200, statusText: 'OK', headers: {}, config };
          }

          // Fallback empty response
          return { data: { success: true, data: [] }, status: 200, statusText: 'OK', headers: {}, config };
        } catch (adapterErr) {
          console.error('Mock Adapter Error:', adapterErr);
          return { data: { success: false, message: adapterErr.message }, status: 500, statusText: 'Mock Error', headers: {}, config };
        }
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Standardized error parsing
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message || 'Network error occurred',
      data: error?.response?.data || null,
      raw: error
    };

    return Promise.reject(customError);
  }
);

// Alias for backward compatibility with existing components importing 'api'
export const api = apiClient;
export default apiClient;

