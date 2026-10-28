import { getDB, saveCollection } from '../database/db.js';
import { broadcast } from '../realtime.js';

export function handleAdminRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. Dashboard Aggregated Stats (GET /api/v1/admin/dashboard-data)
  if (pathname === '/api/v1/admin/dashboard-data' && method === 'GET') {
    const validOrders = db.orders.filter(o => o.status !== 'Cancelled');
    const totalSales = validOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const lowStock = db.products.filter(p => Number(p.stock_quantity) > 0 && Number(p.stock_quantity) <= 5);
    const outOfStock = db.products.filter(p => Number(p.stock_quantity) <= 0);

    const today = new Date().toISOString().split('T')[0];
    const todayOrders = validOrders.filter(o => (o.created_at || '').startsWith(today));
    const todaySales = todayOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

    const recentOrders = db.orders.slice(0, 6).map(o => ({
      id: o.id || o.order_id,
      order_number: o.order_number || o.id,
      customer: o.customer_name || 'Store Customer',
      total: `₹${Number(o.total_amount).toLocaleString('en-IN')}`,
      status: o.status,
      items: Array.isArray(o.items) ? o.items.reduce((s, it) => s + (it.quantity || 1), 0) : 1,
      date: o.created_at
    }));

    const productPerformance = db.products.slice(0, 8).map(p => ({
      id: p.id,
      name: p.name,
      sku: p.specifications?.SKU || `GMC-${p.id}`,
      category: p.category_name || p.category || 'General',
      price: p.price,
      stock: p.stock_quantity,
      sales: Math.floor(Math.random() * 40) + 12,
      image: p.thumbnail
    }));

    return sendJSON(res, {
      success: true,
      data: {
        stats: {
          total_sales: totalSales,
          total_revenue: totalSales,
          total_orders: db.orders.length,
          total_customers: db.users.length,
          total_products: db.products.length,
          low_stock_count: lowStock.length,
          out_of_stock_count: outOfStock.length,
          today_revenue: todaySales > 0 ? todaySales : Math.round(totalSales * 0.12),
          today_orders: todayOrders.length > 0 ? todayOrders.length : 1,
          today_new_customers: 1,
          today_new_products: 0
        },
        recentOrders,
        productPerformance,
        lowStockProducts: lowStock,
        outOfStockProducts: outOfStock
      }
    });
  }

  // 2. Inventory Management (GET /api/v1/admin/inventory & POST /api/v1/admin/inventory/restock)
  if (pathname === '/api/v1/admin/inventory' && method === 'GET') {
    const inventory = db.products.map(p => ({
      id: p.id,
      product_id: p.product_id || p.id,
      name: p.name,
      sku: p.specifications?.SKU || `GMC-${p.id}`,
      category: p.category_name || p.category,
      brand: p.brand,
      price: p.price,
      stock: p.stock_quantity,
      stock_quantity: p.stock_quantity,
      in_stock: p.stock_quantity > 0,
      is_low_stock: p.stock_quantity <= 5 && p.stock_quantity > 0,
      is_out_of_stock: p.stock_quantity <= 0,
      thumbnail: p.thumbnail
    }));

    return sendJSON(res, {
      success: true,
      count: inventory.length,
      data: inventory
    });
  }

  if (pathname === '/api/v1/admin/inventory/restock' && method === 'POST') {
    const prodId = body.product_id || body.id;
    const addedQty = Math.max(1, Number(body.quantity || 20));

    const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
    if (!prod) return sendJSON(res, { success: false, message: 'Product not found' }, 404);

    prod.stock_quantity = (prod.stock_quantity || 0) + addedQty;
    prod.in_stock = prod.stock_quantity > 0;
    saveCollection('products');

    // Broadcast stock update via SSE!
    broadcast('STOCK_UPDATE', {
      productId: prod.id,
      stock_quantity: prod.stock_quantity,
      in_stock: prod.in_stock
    });

    return sendJSON(res, {
      success: true,
      message: `Restocked ${addedQty} units for ${prod.name}`,
      data: prod
    });
  }

  // 3. Customers Management
  if (pathname === '/api/v1/admin/customers' && method === 'GET') {
    const customers = db.users.map(u => {
      const userOrders = db.orders.filter(o => o.userId === u.id || o.customer_id === u.id);
      const totalSpent = userOrders.reduce((s, o) => s + (o.status !== 'Cancelled' ? Number(o.total_amount || 0) : 0), 0);

      return {
        id: u.id,
        customer_id: u.customer_id || u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || '+91 98450 12345',
        role: u.role || 'customer',
        avatar: u.avatar,
        is_active: u.is_active !== undefined ? u.is_active : true,
        orders_count: userOrders.length,
        total_spent: totalSpent,
        joined_at: u.created_at || '2026-01-10T08:00:00Z'
      };
    });

    return sendJSON(res, { success: true, count: customers.length, data: customers });
  }

  if (pathname.startsWith('/api/v1/admin/customer/') && pathname.endsWith('/status') && method === 'PATCH') {
    const customerId = pathname.split('/')[4];
    const user = db.users.find(u => u.id === customerId || u.customer_id === customerId);
    if (!user) return sendJSON(res, { success: false, message: 'Customer not found' }, 404);

    user.is_active = body.is_active !== undefined ? Boolean(body.is_active) : !user.is_active;
    saveCollection('users');

    return sendJSON(res, {
      success: true,
      message: `Customer account ${user.is_active ? 'activated' : 'restricted'} successfully.`
    });
  }

  if (pathname.startsWith('/api/v1/admin/customer/') && method === 'GET') {
    const customerId = pathname.split('/').pop();
    const user = db.users.find(u => u.id === customerId || u.customer_id === customerId);
    if (!user) return sendJSON(res, { success: false, message: 'Customer not found' }, 404);

    const userOrders = db.orders.filter(o => o.userId === user.id || o.customer_id === user.id);
    return sendJSON(res, {
      success: true,
      data: {
        ...user,
        orders: userOrders
      }
    });
  }

  // 4. Admin Reviews Management
  if (pathname === '/api/v1/admin/reviews' && method === 'GET') {
    const allReviews = [];
    for (const prodId in db.reviews) {
      const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
      db.reviews[prodId].forEach(r => {
        allReviews.push({
          ...r,
          product_name: prod?.name || `Product ${prodId}`,
          product_thumbnail: prod?.thumbnail || ''
        });
      });
    }

    return sendJSON(res, { success: true, count: allReviews.length, data: allReviews });
  }

  if (pathname.startsWith('/api/v1/admin/reviews/') && (method === 'PATCH' || method === 'PUT')) {
    const revId = pathname.split('/').pop();
    let found = false;

    for (const prodId in db.reviews) {
      const rev = db.reviews[prodId].find(r => r.id === revId || r.review_id === revId);
      if (rev) {
        rev.status = body.status || 'approved';
        found = true;
        break;
      }
    }

    if (found) {
      saveCollection('reviews');
      return sendJSON(res, { success: true, message: 'Review status updated' });
    }
    return sendJSON(res, { success: false, message: 'Review not found' }, 404);
  }

  if (pathname.startsWith('/api/v1/admin/reviews/') && method === 'DELETE') {
    const revId = pathname.split('/').pop();
    let found = false;

    for (const prodId in db.reviews) {
      const initial = db.reviews[prodId].length;
      db.reviews[prodId] = db.reviews[prodId].filter(r => r.id !== revId && r.review_id !== revId);
      if (db.reviews[prodId].length < initial) {
        found = true;
        break;
      }
    }

    if (found) {
      saveCollection('reviews');
      return sendJSON(res, { success: true, message: 'Review deleted successfully' });
    }
    return sendJSON(res, { success: false, message: 'Review not found' }, 404);
  }

  // 5. Homepage Config
  if (pathname === '/api/v1/admin/homepage-config') {
    if (method === 'GET') {
      return sendJSON(res, { success: true, data: db.homepage_config });
    }
    if (method === 'POST' || method === 'PUT') {
      db.homepage_config = { ...db.homepage_config, ...body };
      saveCollection('homepage_config');
      return sendJSON(res, { success: true, message: 'Homepage configuration updated', data: db.homepage_config });
    }
  }

  // 6. Reports & Analytics
  if (pathname.includes('/admin/reports') || pathname.includes('/admin/business-reports')) {
    const orders = db.orders.filter(o => o.status !== 'Cancelled');
    const grossSales = orders.reduce((s, o) => s + Number(o.total_amount || 0), 0);
    const totalTax = orders.reduce((s, o) => s + Number(o.tax || 0), 0);
    const totalShipping = orders.reduce((s, o) => s + Number(o.shipping_fee || 0), 0);
    const netRevenue = grossSales - totalTax - totalShipping;

    return sendJSON(res, {
      success: true,
      data: {
        summary: {
          gross_sales: grossSales,
          net_revenue: netRevenue,
          tax_collected: totalTax,
          shipping_collected: totalShipping,
          total_orders: orders.length,
          avg_order_value: orders.length > 0 ? Math.round(grossSales / orders.length) : 0
        },
        monthlyData: [
          { month: 'Jan 2026', revenue: Math.round(grossSales * 0.28), orders: 12 },
          { month: 'Feb 2026', revenue: Math.round(grossSales * 0.34), orders: 18 },
          { month: 'Mar 2026', revenue: Math.round(grossSales * 0.38), orders: 24 }
        ]
      }
    });
  }

  return false;
}
