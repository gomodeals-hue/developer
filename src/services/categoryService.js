import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';
import { categorySubcategories, categorySections, departmentMegaMenu } from '../data/categories';

export const categoryTree = categorySubcategories;
export { categorySections, departmentMegaMenu };

export const MAIN_CATEGORIES = [
  { slug: 'clothing', label: 'Clothing', icon: 'Shirt', description: 'Everyday, western & traditional apparel' },
  { slug: 'western-wear', label: 'Western Wear', icon: 'Shirt', description: 'Dresses, jeans, tops, and coordinated sets' },
  { slug: 'ethnic-wear', label: 'Ethnic Wear', icon: 'Crown', description: 'Kurtas, lehengas, suit sets, and sarees' },
  { slug: 'footwear', label: 'Footwear', icon: 'Footprints', description: 'Sneakers, boots, sandals, casual & sports shoes' },
  { slug: 'accessories', label: 'Accessories', icon: 'Watch', description: 'Backpacks, belts, handbags, sunglasses & wallets' },
  { slug: 'gadgets', label: 'Gadgets', icon: 'Laptop', description: 'Smart wearables, fitness bands, headphones & speakers' },
  { slug: 'jewellery', label: 'Jewellery', icon: 'Gem', description: 'Fashion jewellery, bracelets, and fine watches' },
  { slug: 'lingerie-innerwear', label: 'Lingerie & Innerwear', icon: 'Heart', description: 'Bras, loungewear sets, nightwear & shapewear' },
  { slug: 'night-lounge-wear', label: 'Night & Lounge Wear', icon: 'Moon', description: 'Cozy sleep sets, pyjamas, and robes' },
  { slug: 'athleisure', label: 'Athleisure', icon: 'Activity', description: 'Track pants, training tees, and sporty hoodies' },
  { slug: 'winterwear', label: 'Winterwear', icon: 'CloudSnow', description: 'Jackets, merino sweaters, coats & thermals' },
  { slug: 'beauty', label: 'Beauty', icon: 'ShoppingBag', description: 'Cosmetics, skincare, fragrances & wellness' },
  { slug: 'electronics', label: 'Electronics', icon: 'Laptop', description: 'Tech gadgets and accessories' },
  { slug: 'fashion', label: 'Fashion', icon: 'Watch', description: 'Designer accessories and luxury wear' },
  { slug: 'home-living', label: 'Home & Living', icon: 'Home', description: 'Furniture, decor, and bedding' },
  { slug: 'mens', label: 'Mens', icon: 'User', description: 'Men tailored and casual collections' },
  { slug: 'women', label: 'Women', icon: 'Heart', description: 'Women apparel and essentials' },
  { slug: 'kids', label: 'Kids', icon: 'Smile', description: 'Kids fashion, toys, and essentials' },
  { slug: 'pooja-items', label: 'Pooja Items', icon: 'Sun', description: 'Sacred essentials and festive decor' },
  { slug: 'gifts', label: 'Gifts', icon: 'Gift', description: 'Curated gifts for every celebration' },
  { slug: 'healthy-foods', label: 'Healthy Foods', icon: 'Apple', description: 'Organic snacks and beverages' }
];

export const OCCASIONS = [
  { slug: 'birthday', label: 'Birthdays' },
  { slug: 'anniversary', label: 'Anniversaries' },
  { slug: 'housewarming', label: 'Housewarming' },
  { slug: 'graduation', label: 'Graduation' },
  { slug: 'wedding', label: 'Weddings & Bridal' },
  { slug: 'festival', label: 'Festivals & Holidays' },
  { slug: 'corporate', label: 'Corporate & Milestones' }
];

export const RECIPIENTS = [
  { slug: 'him', label: 'For Him' },
  { slug: 'her', label: 'For Her' },
  { slug: 'couples', label: 'Couples & Both' },
  { slug: 'kids', label: 'For Kids & Teens' },
  { slug: 'friends', label: 'For Friends & Coworkers' },
  { slug: 'self', label: 'Self-Care' }
];

export const CATEGORY_IMAGES = {
  'clothing': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
  'western-wear': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  'ethnic-wear': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
  'footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'accessories': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  'gadgets': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
  'jewellery': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
  'lingerie-innerwear': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80',
  'night-lounge-wear': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  'athleisure': 'https://images.unsplash.com/photo-1483721074573-586540da5703?w=800&q=80',
  'winterwear': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
  'beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
  'electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  'fashion': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  'home-living': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'mens': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
  'women': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
  'kids': 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800&q=80',
  'pooja-items': 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80',
  'gifts': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
  'healthy-foods': 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80'
};

export const categoryService = {
  /**
   * Get all top-level store categories
   */
  async getCategories() {
    if (API_CONFIG.USE_MOCK) {
      return { success: true, data: MAIN_CATEGORIES };
    }
    try {
      const res = await apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES.LIST);
      return res.data;
    } catch {
      return { success: true, data: MAIN_CATEGORIES };
    }
  },

  /**
   * Get categories enriched with subcategories, sections, imagery, and product counts
   */
  async getCategoriesWithDetails() {
    const enriched = MAIN_CATEGORIES.map(cat => ({
      ...cat,
      image: CATEGORY_IMAGES[cat.slug] || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
      subcategories: categorySubcategories[cat.slug] || [],
      sections: categorySections[cat.slug] || []
    }));
    return {
      success: true,
      data: enriched
    };
  },

  /**
   * Get separated sections for a given category slug
   */
  async getCategorySections(categorySlug) {
    const sections = categorySections[categorySlug] || [];
    return { success: true, data: sections };
  },

  /**
   * Get all category sections map
   */
  async getAllCategorySections() {
    return { success: true, data: categorySections };
  },

  /**
   * Get department mega menu data by department key (men, women, kids, beauty, home-kitchen)
   */
  async getDepartmentMegaMenu(deptKey) {
    if (deptKey && departmentMegaMenu[deptKey]) {
      return { success: true, data: departmentMegaMenu[deptKey] };
    }
    return { success: true, data: departmentMegaMenu };
  },

  /**
   * Get all department mega menus
   */
  async getAllDepartmentMegaMenus() {
    return { success: true, data: departmentMegaMenu };
  },

  /**
   * Get subcategories for a given category slug
   */
  async getSubcategories(categorySlug) {
    if (API_CONFIG.USE_MOCK) {
      const subcats = categorySubcategories[categorySlug] || [];
      return { success: true, data: subcats };
    }
    try {
      const res = await apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES.SUBCATEGORIES(categorySlug));
      return res.data;
    } catch {
      const subcats = categorySubcategories[categorySlug] || [];
      return { success: true, data: subcats };
    }
  },

  /**
   * Get complete hierarchical category tree
   */
  async getCategoryTree() {
    return {
      success: true,
      data: categorySubcategories
    };
  },

  /**
   * Get all categories for Admin (including dynamic additions)
   */
  async getAdminCategories() {
    try {
      const raw = localStorage.getItem('gomo_admin_categories');
      if (raw) {
        const stored = JSON.parse(raw);
        if (Array.isArray(stored) && stored.length > 0) return { success: true, data: stored };
      }
    } catch {
      // fallback
    }
    return this.getCategoriesWithDetails();
  },

  /**
   * Create a new category
   */
  async createCategory(categoryData) {
    const raw = localStorage.getItem('gomo_admin_categories');
    let categories = [];
    try {
      categories = raw ? JSON.parse(raw) : [];
    } catch {
      categories = [];
    }
    if (categories.length === 0) {
      const details = await this.getCategoriesWithDetails();
      categories = details.data;
    }

    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      category_id: `cat_${slug}_${Date.now()}`,
      name: categoryData.name,
      slug,
      description: categoryData.description || '',
      icon: categoryData.icon || 'ShoppingBag',
      image_url: categoryData.image_url || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
      is_active: categoryData.is_active !== undefined ? categoryData.is_active : true,
      subcategories: Array.isArray(categoryData.subcategories) ? categoryData.subcategories : []
    };

    categories.unshift(newCat);
    localStorage.setItem('gomo_admin_categories', JSON.stringify(categories));
    return { success: true, data: newCat };
  },

  /**
   * Update category
   */
  async updateCategory(categoryId, updateData) {
    const raw = localStorage.getItem('gomo_admin_categories');
    let categories = raw ? JSON.parse(raw) : [];
    const idx = categories.findIndex(c => c.category_id === categoryId || c.slug === categoryId);
    if (idx !== -1) {
      categories[idx] = { ...categories[idx], ...updateData };
      localStorage.setItem('gomo_admin_categories', JSON.stringify(categories));
      return { success: true, data: categories[idx] };
    }
    return { success: false, message: 'Category not found' };
  },

  /**
   * Delete category
   */
  async deleteCategory(categoryId) {
    const raw = localStorage.getItem('gomo_admin_categories');
    let categories = raw ? JSON.parse(raw) : [];
    categories = categories.filter(c => c.category_id !== categoryId && c.slug !== categoryId);
    localStorage.setItem('gomo_admin_categories', JSON.stringify(categories));
    return { success: true };
  },

  /**
   * Toggle category status
   */
  async toggleCategoryStatus(categoryId, is_active) {
    return this.updateCategory(categoryId, { is_active });
  }
};

export default categoryService;

