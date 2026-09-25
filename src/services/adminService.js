import { API_CONFIG } from '../config/api.config';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { categorySubcategories } from '../data/categories';
import { MAIN_CATEGORIES, CATEGORY_IMAGES } from './categoryService';

// Storage keys for admin mock data
const ADMIN_ORDERS_KEY = 'gomo_customer_orders';
const USERS_KEY = 'gomo_mock_users';
const REVIEWS_KEY = 'gomo_product_reviews';
const ADMIN_CATEGORIES_KEY = 'gomo_admin_categories';
const ADMIN_BANNERS_KEY = 'gomo_admin_banners';
const ADMIN_HOMEPAGE_CONFIG_KEY = 'gomo_admin_homepage_config';
const ADMIN_PRODUCTS_OVERRIDE_KEY = 'gomo_admin_products_override';

// Initial pre-seeded reviews
const DEFAULT_REVIEWS = [
  {
    review_id: 'rev_1',
    product_id: 'el_1',
    product_name: 'Sony WH-1000XM5 Wireless Headphones',
    user_name: 'Alex Mercer',
    user_email: 'alex@example.com',
    rating: 5,
    status: 'approved',
    comment: 'Outstanding quality and fast delivery! Fits description perfectly.',
    created_at: '2026-02-15T10:30:00Z'
  },
  {
    review_id: 'rev_2',
    product_id: 'el_2',
    product_name: 'Apple MacBook Air M2',
    user_name: 'Priya Sundaram',
    user_email: 'priya@example.com',
    rating: 4,
    status: 'approved',
    comment: 'Great build, battery life is super solid. Would recommend.',
    created_at: '2026-02-18T14:15:00Z'
  },
  {
    review_id: 'rev_3',
    product_id: 'fas_1',
    product_name: 'Italian Tailored Linen Blazer',
    user_name: 'Rohan Sharma',
    user_email: 'rohan@example.com',
    rating: 3,
    status: 'pending',
    comment: 'Material is great, but size runs slightly small.',
    created_at: '2026-02-25T09:20:00Z'
  },
  {
    review_id: 'rev_4',
    product_id: 'el_3',
    product_name: 'Bose SoundLink Revolve+ II',
    user_name: 'David Miller',
    user_email: 'david@example.com',
    rating: 1,
    status: 'flagged',
    comment: 'Box arrived damaged and audio crackles at high volume.',
    created_at: '2026-03-01T16:45:00Z'
  }
];

// Initial pre-seeded banners
const DEFAULT_BANNERS = [
  {
    banner_id: 'ban_3',
    brand_name: 'Organic & Healthy Pantry',
    image_url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&q=80',
    target_url: '/collection/healthy-foods',
    is_active: false,
    start_date: '2026-02-01T00:00:00.000Z',
    end_date: '2026-05-31T23:59:59.000Z',
    badge: 'Fresh Deals',
    title: 'Farm Direct Nutrition to Your Doorstep'
  }
];

// Initial pre-seeded homepage promotional config
const DEFAULT_HOMEPAGE_CONFIG = {
  announcementText: 'FREE Next-Day Express Delivery on All Orders Over ₹999 | Use Code GOMO50 for Flat 50% Off First Purchase',
  heroHeadline: 'Curated Excellence, Guaranteed Authenticity',
  heroSubheadline: 'Explore thousands of verified single-vendor boutique deals with direct brand warranty and seamless doorstep returns.',
  featuredProductIds: ['el_1', 'el_2', 'fas_1', 'hl_1'],
  dealOfTheDay: {
    productId: 'el_1',
    title: 'Sony WH-1000XM5 Noise Cancelling',
    discountText: 'Special Flash Deal: 35% OFF Today Only',
    expiryHours: 18
  },
  promotionalSections: [
    {
      id: 'sec_1',
      title: 'Trending Electronics & Audio',
      subtitle: 'Top rated studio monitors and wireless gadgets',
      categorySlug: 'electronics',
      enabled: true
    },
    {
      id: 'sec_2',
      title: 'Modern Living & Essentials',
      subtitle: 'Minimalist aesthetics for your contemporary home',
      categorySlug: 'home-living',
      enabled: true
    }
  ]
};

// Helpers for localStorage sync
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving to localStorage for ${key}:`, err);
  }
}

// Ensure base categories are initialized in localStorage
export function getStoredCategories() {
  const existing = readStorage(ADMIN_CATEGORIES_KEY, null);
  if (existing && Array.isArray(existing) && existing.length > 0) {
    return existing;
  }

  const initial = MAIN_CATEGORIES.map(cat => ({
    category_id: `cat_${cat.slug}`,
    name: cat.label,
    slug: cat.slug,
    description: cat.description || '',
    icon: cat.icon || 'Folder',
    image_url: CATEGORY_IMAGES[cat.slug] || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    is_active: true,
    subcategories: (categorySubcategories[cat.slug] || []).map((sub, idx) => ({
      category_id: `sub_${cat.slug}_${idx + 1}`,
      name: sub,
      slug: sub.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      is_active: true
    }))
  }));

  writeStorage(ADMIN_CATEGORIES_KEY, initial);
  return initial;
}

// Ensure store orders exist
export function getStoredOrders() {
  const existing = readStorage(ADMIN_ORDERS_KEY, null);
  if (existing && Array.isArray(existing) && existing.length > 0) {
    return existing;
  }

  // Pre-seed mock orders if none exist
  const initial = [
    {
      id: 'ord-847291',
      order_id: 'ord-847291',
      customer_name: 'Priya Sharma',
      customer_email: 'priya.sharma@example.com',
      customer_phone: '+91 98765 43210',
      total_amount: 24999,
      status: 'Delivered',
      payment_method: 'UPI / Razorpay',
      payment_status: 'Paid',
      courier: 'BlueDart Express',
      tracking_id: 'BD-883921004',
      created_at: '2026-03-05T11:30:00Z',
      shipping_address: {
        fullName: 'Priya Sharma',
        phone: '+91 98765 43210',
        street: '42 Lotus Boulevard, Tower 4, Flat 12B',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560103'
      },
      items: [
        {
          id: 'el_1',
          name: 'Sony WH-1000XM5 Wireless Headphones',
          price: 24999,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
        }
      ]
    },
    {
      id: 'ord-923841',
      order_id: 'ord-923841',
      customer_name: 'Rahul Verma',
      customer_email: 'rahul.verma@example.com',
      customer_phone: '+91 91234 56789',
      total_amount: 8599,
      status: 'Shipped',
      payment_method: 'Credit Card',
      payment_status: 'Paid',
      courier: 'Delhivery',
      tracking_id: 'DL-554190823',
      created_at: '2026-03-08T15:20:00Z',
      shipping_address: {
        fullName: 'Rahul Verma',
        phone: '+91 91234 56789',
        street: '15 Anna Nagar 2nd Main Road',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600040'
      },
      items: [
        {
          id: 'fas_1',
          name: 'Italian Tailored Linen Blazer',
          price: 8599,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'
        }
      ]
    },
    {
      id: 'ord-619283',
      order_id: 'ord-619283',
      customer_name: 'Ananya Deshmukh',
      customer_email: 'ananya.d@example.com',
      customer_phone: '+91 99887 66554',
      total_amount: 3450,
      status: 'Processing',
      payment_method: 'Cash on Delivery',
      payment_status: 'Pending',
      courier: 'Ekart Logistics',
      tracking_id: 'EK-902188431',
      created_at: '2026-03-12T18:45:00Z',
      shipping_address: {
        fullName: 'Ananya Deshmukh',
        phone: '+91 99887 66554',
        street: 'Flat 602, Sunshine Heights, Viman Nagar',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411014'
      },
      items: [
        {
          id: 'hl_1',
          name: 'Handcrafted Ceramic Aroma Diffuser',
          price: 3450,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
        }
      ]
    }
  ];

  writeStorage(ADMIN_ORDERS_KEY, initial);
  return initial;
}

// Ensure store customers exist
export function getStoredCustomers() {
  const users = readStorage(USERS_KEY, []);
  
  // Combine users who have made orders or registered
  const defaultCustomers = [
    {
      customer_id: 'cust_1',
      id: 'cust_1',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      is_active: true,
      block_reason: null,
      created_at: '2026-01-10T10:00:00Z',
      addresses: [
        {
          id: 'addr_1',
          fullName: 'Priya Sharma',
          phone: '+91 98765 43210',
          street: '42 Lotus Boulevard, Tower 4, Flat 12B',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560103',
          isDefault: true
        }
      ],
      orders_count: 3,
      total_spent: 42500
    },
    {
      customer_id: 'cust_2',
      id: 'cust_2',
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 91234 56789',
      is_active: true,
      block_reason: null,
      created_at: '2026-01-18T14:30:00Z',
      addresses: [
        {
          id: 'addr_2',
          fullName: 'Rahul Verma',
          phone: '+91 91234 56789',
          street: '15 Anna Nagar 2nd Main Road',
          city: 'Chennai',
          state: 'Tamil Nadu',
          pincode: '600040',
          isDefault: true
        }
      ],
      orders_count: 1,
      total_spent: 8599
    },
    {
      customer_id: 'cust_3',
      id: 'cust_3',
      name: 'Ananya Deshmukh',
      email: 'ananya.d@example.com',
      phone: '+91 99887 66554',
      is_active: true,
      block_reason: null,
      created_at: '2026-02-04T09:15:00Z',
      addresses: [
        {
          id: 'addr_3',
          fullName: 'Ananya Deshmukh',
          phone: '+91 99887 66554',
          street: 'Flat 602, Sunshine Heights, Viman Nagar',
          city: 'Pune',
          state: 'Maharashtra',
          pincode: '411014',
          isDefault: true
        }
      ],
      orders_count: 2,
      total_spent: 6900
    }
  ];

  // Merge any registered customer accounts from `gomo_mock_users`
  const registeredNonAdmins = users
    .filter(u => u.role !== 'admin' && u.role !== 'super_admin')
    .map(u => ({
      customer_id: u.id,
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || '+91 98450 00000',
      is_active: u.is_active !== undefined ? u.is_active : true,
      block_reason: u.block_reason || null,
      created_at: u.created_at || '2026-02-01T00:00:00Z',
      addresses: u.addresses || [],
      orders_count: 1,
      total_spent: 2499
    }));

  const allMap = new Map();
  defaultCustomers.forEach(c => allMap.set(c.email, c));
  registeredNonAdmins.forEach(c => {
    if (!allMap.has(c.email)) {
      allMap.set(c.email, c);
    }
  });

  return Array.from(allMap.values());
}

// Master Admin Service
export const adminService = {
  /**
   * Complete Single-Vendor Dashboard Metrics
   */
  async getDashboardData() {
    const orders = getStoredOrders();
    const customers = getStoredCustomers();
    const categories = getStoredCategories();

    // Products calculation
    const overrides = readStorage(ADMIN_PRODUCTS_OVERRIDE_KEY, {});
    const products = SAMPLE_PRODUCTS.map(p => {
      const pid = p.product_id || p.id;
      const ov = overrides[pid] || {};
      const stock = ov.stock_quantity !== undefined ? ov.stock_quantity : (p.stock_quantity ?? 25);
      const isActive = ov.is_active !== undefined ? ov.is_active : (p.is_active ?? true);
      return {
        ...p,
        id: pid,
        product_id: pid,
        stock_quantity: stock,
        stock,
        is_active: isActive,
        price: ov.price !== undefined ? ov.price : p.price
      };
    });

    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const totalRevenue = totalSales; // Single vendor: all revenue belongs to the store
    const totalCustomers = customers.length;
    const totalProducts = products.length;

    // Stock thresholds
    const lowStockProducts = products.filter(p => (Number(p.stock_quantity) > 0 && Number(p.stock_quantity) <= 5));
    const outOfStockProducts = products.filter(p => Number(p.stock_quantity) <= 0);

    // Recent orders formatted for DashboardHome
    const recentOrders = orders.slice(0, 6).map(o => ({
      id: o.id || o.order_id,
      customer: o.customer_name || 'Store Customer',
      total: `₹${Number(o.total_amount).toLocaleString('en-IN')}`,
      status: o.status,
      items: Array.isArray(o.items) ? o.items.reduce((s, it) => s + (it.quantity || 1), 0) : 1
    }));

    // Top products by sales/inventory
    const productPerformance = products.slice(0, 8).map(p => ({
      id: p.id,
      name: p.name,
      sku: p.sku || `GMC-${p.id}`,
      room: p.category_name || p.category || 'General',
      price: p.price,
      stock: p.stock_quantity,
      sales: Math.floor(Math.random() * 40) + 12,
      image: p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
    }));

    return {
      success: true,
      data: {
        stats: {
          total_sales: totalSales,
          total_revenue: totalRevenue,
          total_orders: totalOrders,
          total_customers: totalCustomers,
          total_products: totalProducts,
          low_stock_count: lowStockProducts.length,
          out_of_stock_count: outOfStockProducts.length,
          today_revenue: Math.round(totalRevenue * 0.15),
          today_orders: 2,
          today_new_customers: 1,
          today_new_products: 0
        },
        recentOrders,
        productPerformance,
        lowStockProducts,
        outOfStockProducts
      }
    };
  },

  /**
   * Product Management
   */
  async getProducts() {
    const overrides = readStorage(ADMIN_PRODUCTS_OVERRIDE_KEY, {});
    const products = SAMPLE_PRODUCTS.map(p => {
      const pid = p.product_id || p.id;
      const ov = overrides[pid] || {};
      const stock = ov.stock_quantity !== undefined ? ov.stock_quantity : (p.stock_quantity ?? 25);
      const isActive = ov.is_active !== undefined ? ov.is_active : (p.is_active ?? true);
      return {
        ...p,
        id: pid,
        product_id: pid,
        stock_quantity: stock,
        stock,
        is_active: isActive,
        is_disabled: !isActive,
        price: ov.price !== undefined ? ov.price : p.price,
        mrp: ov.mrp !== undefined ? ov.mrp : (p.mrp || Math.round(p.price * 1.3)),
        discount_percentage: ov.discount_percentage !== undefined ? ov.discount_percentage : p.discount_percentage,
        category: ov.category || p.category,
        category_name: ov.category_name || p.category_name,
        variants: ov.variants || p.variants || []
      };
    });

    return { success: true, data: products };
  },

  async toggleProductStatus(productId, is_active) {
    const overrides = readStorage(ADMIN_PRODUCTS_OVERRIDE_KEY, {});
    overrides[productId] = {
      ...(overrides[productId] || {}),
      is_active
    };
    writeStorage(ADMIN_PRODUCTS_OVERRIDE_KEY, overrides);
    return { success: true, message: `Product ${is_active ? 'activated' : 'deactivated'} successfully.` };
  },

  /**
   * Category Management CRUD
   */
  async getCategories() {
    const categories = getStoredCategories();
    return { success: true, data: categories };
  },

  async createCategory(categoryData) {
    const categories = getStoredCategories();
    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory = {
      category_id: `cat_${slug}_${Date.now()}`,
      name: categoryData.name,
      slug,
      description: categoryData.description || '',
      icon: categoryData.icon || 'ShoppingBag',
      image_url: categoryData.image_url || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
      is_active: categoryData.is_active !== undefined ? categoryData.is_active : true,
      subcategories: Array.isArray(categoryData.subcategories) 
        ? categoryData.subcategories.map((sub, i) => typeof sub === 'string' ? {
            category_id: `sub_${slug}_${i + 1}`,
            name: sub,
            slug: sub.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            is_active: true
          } : sub)
        : []
    };

    categories.unshift(newCategory);
    writeStorage(ADMIN_CATEGORIES_KEY, categories);
    return { success: true, data: newCategory, message: 'Category created successfully.' };
  },

  async updateCategory(categoryId, updateData) {
    const categories = getStoredCategories();
    const idx = categories.findIndex(c => c.category_id === categoryId);
    if (idx === -1) {
      return { success: false, message: 'Category not found' };
    }

    categories[idx] = {
      ...categories[idx],
      ...updateData
    };
    writeStorage(ADMIN_CATEGORIES_KEY, categories);
    return { success: true, data: categories[idx], message: 'Category updated successfully.' };
  },

  async deleteCategory(categoryId) {
    let categories = getStoredCategories();
    categories = categories.filter(c => c.category_id !== categoryId);
    writeStorage(ADMIN_CATEGORIES_KEY, categories);
    return { success: true, message: 'Category removed successfully.' };
  },

  async toggleCategoryStatus(categoryId, is_active) {
    return this.updateCategory(categoryId, { is_active });
  },

  /**
   * Order Management
   */
  async getOrders() {
    const orders = getStoredOrders();
    return { success: true, data: orders };
  },

  async getOrderDetails(orderId) {
    const orders = getStoredOrders();
    const order = orders.find(o => (o.id === orderId || o.order_id === orderId));
    if (!order) return { success: false, message: 'Order not found' };
    return { success: true, data: order };
  },

  async updateOrderStatus(orderId, { status, courier, tracking_id, est_delivery }) {
    const orders = getStoredOrders();
    const idx = orders.findIndex(o => (o.id === orderId || o.order_id === orderId));
    if (idx === -1) {
      return { success: false, message: 'Order not found' };
    }

    const prevStatus = orders[idx].status;

    orders[idx] = {
      ...orders[idx],
      status: status || orders[idx].status,
      courier: courier !== undefined ? courier : orders[idx].courier,
      tracking_id: tracking_id !== undefined ? tracking_id : orders[idx].tracking_id,
      estimated_delivery: est_delivery !== undefined ? est_delivery : orders[idx].estimated_delivery
    };

    writeStorage(ADMIN_ORDERS_KEY, orders);

    // Business hooks: Notify customer of status update and handle return restock if cancelled
    try {
      const { notificationService } = await import('./notificationService');
      await notificationService.notifyOrderStatus(orders[idx], orders[idx].status, orders[idx].courier);

      if (status === 'Cancelled' && prevStatus !== 'Cancelled') {
        const { inventoryService } = await import('./inventoryService');
        await inventoryService.returnOrderStock(orders[idx].items || [], orders[idx].order_number || orders[idx].id);
      }
    } catch (e) {
      console.warn('Order status hook error:', e);
    }

    return { success: true, data: orders[idx], message: `Order status updated to ${status}` };
  },


  async bulkUpdateOrders({ orderIds, status, courier }) {
    const orders = getStoredOrders();
    const idSet = new Set(orderIds);
    orders.forEach(o => {
      if (idSet.has(o.id) || idSet.has(o.order_id)) {
        o.status = status;
        if (courier) o.courier = courier;
      }
    });
    writeStorage(ADMIN_ORDERS_KEY, orders);
    return { success: true, message: `Updated ${orderIds.length} orders to ${status}` };
  },

  /**
   * Customer Management
   */
  async getCustomers() {
    const customers = getStoredCustomers();
    return { success: true, data: customers };
  },

  async getCustomerDetails(customerId) {
    const customers = getStoredCustomers();
    const customer = customers.find(c => (c.customer_id === customerId || c.id === customerId));
    if (!customer) return { success: false, message: 'Customer not found' };

    // Fetch customer's orders
    const allOrders = getStoredOrders();
    const customerOrders = allOrders.filter(o => 
      o.customer_email === customer.email || o.customer_id === customerId
    );

    return {
      success: true,
      data: {
        ...customer,
        orders: customerOrders
      }
    };
  },

  async toggleCustomerStatus(customerId, is_active, block_reason = null) {
    const customers = getStoredCustomers();
    const idx = customers.findIndex(c => (c.customer_id === customerId || c.id === customerId));
    if (idx !== -1) {
      customers[idx].is_active = is_active;
      customers[idx].block_reason = block_reason;
    }

    // Also sync with gomo_mock_users if present
    const users = readStorage(USERS_KEY, []);
    const userIdx = users.findIndex(u => (u.id === customerId || u.email === customers[idx]?.email));
    if (userIdx !== -1) {
      users[userIdx].is_active = is_active;
      users[userIdx].block_reason = block_reason;
      writeStorage(USERS_KEY, users);
    }

    return {
      success: true,
      is_active,
      block_reason,
      message: `Customer ${is_active ? 'restored' : 'restricted'} successfully.`
    };
  },

  /**
   * Review Management & Moderation
   */
  async getReviews() {
    const reviews = readStorage(REVIEWS_KEY, DEFAULT_REVIEWS);
    return { success: true, data: reviews };
  },

  async moderateReview(reviewId, status) {
    const reviews = readStorage(REVIEWS_KEY, DEFAULT_REVIEWS);
    const idx = reviews.findIndex(r => r.review_id === reviewId);
    if (idx !== -1) {
      reviews[idx].status = status;
      writeStorage(REVIEWS_KEY, reviews);
      return { success: true, message: `Review marked as ${status}` };
    }
    return { success: false, message: 'Review not found' };
  },

  async deleteReview(reviewId) {
    let reviews = readStorage(REVIEWS_KEY, DEFAULT_REVIEWS);
    reviews = reviews.filter(r => r.review_id !== reviewId);
    writeStorage(REVIEWS_KEY, reviews);
    return { success: true, message: 'Review deleted successfully.' };
  },

  /**
   * Homepage Management & Banners
   */
  async getBanners() {
    let banners = readStorage(ADMIN_BANNERS_KEY, DEFAULT_BANNERS);
    banners = banners.filter(b => 
      !b.brand_name?.toLowerCase().includes('spring festival') &&
      !b.brand_name?.toLowerCase().includes('artisan living')
    );
    return { success: true, banners, data: banners };
  },

  async saveBanner(bannerData) {
    const banners = readStorage(ADMIN_BANNERS_KEY, DEFAULT_BANNERS);
    if (bannerData.banner_id) {
      const idx = banners.findIndex(b => b.banner_id === bannerData.banner_id);
      if (idx !== -1) {
        banners[idx] = { ...banners[idx], ...bannerData };
      }
    } else {
      banners.unshift({
        ...bannerData,
        banner_id: `ban_${Date.now()}`
      });
    }
    writeStorage(ADMIN_BANNERS_KEY, banners);
    return { success: true, message: 'Banner saved successfully.', banners };
  },

  async deleteBanner(bannerId) {
    let banners = readStorage(ADMIN_BANNERS_KEY, DEFAULT_BANNERS);
    banners = banners.filter(b => b.banner_id !== bannerId);
    writeStorage(ADMIN_BANNERS_KEY, banners);
    return { success: true, message: 'Banner removed successfully.', banners };
  },

  async getHomepageConfig() {
    const config = readStorage(ADMIN_HOMEPAGE_CONFIG_KEY, DEFAULT_HOMEPAGE_CONFIG);
    return { success: true, data: config };
  },

  async updateHomepageConfig(newConfig) {
    const updated = {
      ...readStorage(ADMIN_HOMEPAGE_CONFIG_KEY, DEFAULT_HOMEPAGE_CONFIG),
      ...newConfig
    };
    writeStorage(ADMIN_HOMEPAGE_CONFIG_KEY, updated);
    return { success: true, data: updated, message: 'Homepage configuration updated.' };
  },

  /**
   * Consolidated Dynamic Business Reports
   * Calculates metrics in real-time from active orders, products, customers, and inventory
   */
  async getBusinessReports(range = 'all') {
    const orders = getStoredOrders();
    const customers = getStoredCustomers();
    const overrides = readStorage(ADMIN_PRODUCTS_OVERRIDE_KEY, {});

    // Active product metrics
    const products = SAMPLE_PRODUCTS.map(p => {
      const pid = p.product_id || p.id;
      const ov = overrides[pid] || {};
      const stock = ov.stock_quantity !== undefined ? Number(ov.stock_quantity) : (p.stock_quantity ?? 25);
      const price = ov.price !== undefined ? Number(ov.price) : Number(p.price);
      return {
        ...p,
        id: pid,
        product_id: pid,
        price,
        stock_quantity: stock,
        is_active: ov.is_active !== undefined ? ov.is_active : (p.is_active ?? true)
      };
    });

    // 1. Revenue Metrics
    const totalOrders = orders.length;
    const grossRevenue = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');
    const cancelledOrders = orders.filter(o => o.status === 'Cancelled');
    const deliveredRevenue = deliveredOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const refundedRevenue = cancelledOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const netRevenue = grossRevenue - refundedRevenue;
    const avgOrderValue = totalOrders > 0 ? Math.round(grossRevenue / totalOrders) : 0;

    // 2. Orders Metrics
    const ordersByStatus = {
      Delivered: deliveredOrders.length,
      Shipped: orders.filter(o => o.status === 'Shipped').length,
      Processing: orders.filter(o => o.status === 'Processing' || o.status === 'Confirmed').length,
      Cancelled: cancelledOrders.length,
      Returned: orders.filter(o => o.status === 'Returned').length
    };

    // 3. Products & Sales Performance
    const productSalesMap = {};
    orders.forEach(order => {
      (order.items || []).forEach(it => {
        const pid = it.product_id || it.id;
        if (!productSalesMap[pid]) {
          productSalesMap[pid] = {
            id: pid,
            name: it.name,
            units_sold: 0,
            revenue: 0
          };
        }
        productSalesMap[pid].units_sold += Number(it.quantity || 1);
        productSalesMap[pid].revenue += Number(it.price || 0) * Number(it.quantity || 1);
      });
    });

    const topSellingProducts = Object.values(productSalesMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // 4. Inventory Metrics
    const totalSKUs = products.length;
    const inStockSKUs = products.filter(p => p.stock_quantity > 5).length;
    const lowStockSKUs = products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5).length;
    const outOfStockSKUs = products.filter(p => p.stock_quantity <= 0).length;
    const totalInventoryValuation = products.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0);

    // 5. Customer Metrics
    const totalCustomers = customers.length;
    const repeatCustomers = customers.filter(c => Number(c.orders_count || 0) > 1).length;
    const repeatRate = totalCustomers > 0 ? Math.round((repeatCustomers / totalCustomers) * 100) : 0;

    // Category Sales breakdown
    const categoryBreakdownMap = {};
    products.forEach(p => {
      const cat = p.category_name || p.category || 'General';
      if (!categoryBreakdownMap[cat]) categoryBreakdownMap[cat] = { category: cat, skus: 0, stockValue: 0 };
      categoryBreakdownMap[cat].skus += 1;
      categoryBreakdownMap[cat].stockValue += p.price * p.stock_quantity;
    });

    return {
      success: true,
      data: {
        revenue: {
          grossRevenue,
          netRevenue,
          refundedRevenue,
          avgOrderValue,
          currency: 'INR'
        },
        orders: {
          totalOrders,
          ordersByStatus,
          fulfillmentRate: totalOrders > 0 ? Math.round((deliveredOrders.length / totalOrders) * 100) : 0
        },
        products: {
          totalSKUs,
          topSellingProducts,
          totalUnitsSold: Object.values(productSalesMap).reduce((s, p) => s + p.units_sold, 0)
        },
        inventory: {
          totalSKUs,
          inStockSKUs,
          lowStockSKUs,
          outOfStockSKUs,
          totalInventoryValuation,
          categoryBreakdown: Object.values(categoryBreakdownMap)
        },
        customers: {
          totalCustomers,
          repeatCustomers,
          repeatRate
        }
      }
    };
  }
};

export default adminService;

