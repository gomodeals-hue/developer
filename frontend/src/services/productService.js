import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { SUPPLEMENTAL_PRODUCTS } from '../data/supplementalProducts';
import { GENERATED_PRODUCTS } from '../data/generatedProducts';
import { getProductImage } from '../utils/productImages';
import { findRespectiveCategoryMatch } from '../utils/categorySearchMatcher.js';

// Deterministic brand mapping for rich catalog filtering
const CATEGORY_BRAND_MAP = {
  'electronics': ['Apple', 'Sony', 'Samsung', 'Dell', 'Canon', 'Bose'],
  'gadgets': ['Apple', 'boAt', 'Noise', 'Fire-Boltt', 'Sony', 'JBL', 'Samsung', 'OnePlus'],
  'fashion': ['Armani', 'Zara', 'Gucci', 'Ray-Ban', 'FabIndia', 'Nike'],
  'clothing': ['Buda Jeans Co', 'Shein Men', 'Netplay', '7 Alt By Pantaloons', 'Dennis Lingo', 'Levi\'s', 'Zara', 'H&M', 'FabIndia', 'Tommy Hilfiger', 'Raymond', 'Calvin Klein'],
  'western-wear': ['Buda Jeans Co', 'Shein Men', 'Netplay', '7 Alt By Pantaloons', 'Dennis Lingo', 'Levi\'s', 'Zara', 'H&M', 'Vero Moda', 'ONLY', 'Roadster', 'Marks & Spencer', 'MANGO'],
  'ethnic-wear': ['Biba', 'W for Woman', 'Fabindia', 'Global Desi', 'Aurelia', 'Libas', 'Manyavar', 'Ritu Kumar'],
  'footwear': ['Nike', 'Adidas', 'Puma', 'Woodland', 'Red Tape', 'Skechers', 'Bata', 'Crocs', 'Clarks', 'Campus'],
  'footwears': ['Nike', 'Adidas', 'Puma', 'Woodland', 'Red Tape', 'Skechers', 'Bata', 'Crocs', 'Clarks', 'Campus'],
  'accessories': ['Baggit', 'Lavie', 'Caprese', 'Wildcraft', 'American Tourister', 'Ray-Ban', 'Fastrack', 'Fossil'],
  'jewellery': ['Titan', 'Giva', 'Mia by Tanishq', 'Fossil', 'Daniel Wellington', 'Zaveri Pearls', 'Voylla'],
  'jewelry': ['Titan', 'Giva', 'Mia by Tanishq', 'Fossil', 'Daniel Wellington', 'Zaveri Pearls', 'Voylla'],
  'lingerie-innerwear': ['Jockey', 'Enamor', 'Zivame', 'Triumph', 'Clovia', 'Marks & Spencer', 'Calvin Klein'],
  'night-lounge-wear': ['Sweet Dreams', 'July Nightwear', 'Clovia', 'Ginger by Lifestyle', 'Marks & Spencer', 'Jockey'],
  'athleisure': ['HRX by Hrithik Roshan', 'Cultsport', 'Puma', 'Under Armour', 'Nike', 'Decathlon'],
  'winterwear': ['Monte Carlo', 'Roadster', 'Fort Collins', 'Woodland', 'Columbia', 'Marks & Spencer'],
  'home-living': ['IKEA', 'West Elm', 'Prestige', 'Urban Ladder', 'Philips', 'Bombay Dyeing'],
  'beauty': ['L\'Oréal', 'MAC', 'Chanel', 'The Ordinary', 'Forest Essentials', 'Kama Ayurveda'],
  'mens': ['Raymond', 'Peter England', 'Louis Philippe', 'Van Heusen', 'Allen Solly'],
  'women': ['Biba', 'W for Woman', 'AND', 'Global Desi', 'Aurelia'],
  'kids': ['Lego', 'Disney', 'Barbie', 'Hot Wheels', 'Fisher-Price', 'Hamleys'],
  'pooja-items': ['Vedic Vaani', 'Cycle Pure', 'Soulflower', 'Shubh Labh', 'Puja Shoppe'],
  'gifts': ['Ferns N Petals', 'Archies', 'Swarovski', 'Titan', 'Chumbak'],
  'healthy-foods': ['True Elements', 'Organic India', '24 Mantra', 'Saffola', 'Kapiva', 'Twinings']
};

const toSafeLower = (val) => {
  if (!val) return '';
  if (Array.isArray(val)) return val.join(' ').toLowerCase();
  return String(val).toLowerCase();
};

const normalizeSlug = (value) => toSafeLower(value).trim().replace(/_/g, '-').replace(/\s+/g, '-');
const compactSlug = (value) => normalizeSlug(value).replace(/[^a-z0-9]/g, '');
const PRODUCT_PAGE_SIZE = 12;
const MAX_PAGES = 1;
const MAX_CURATED_RESULTS = PRODUCT_PAGE_SIZE * MAX_PAGES;

const normalizeProductName = (value) => toSafeLower(value)
  .replace(/&/g, 'and')
  .replace(/\b(premium|classic|modern|stylish|designer|exclusive|authentic|quality|new|latest)\b/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const productQualityScore = (product, index = 0) => {
  let score = 0;
  if (product.thumbnail || product.image || product.pi_images?.length || product.images?.length) score += 20;
  if (product.brand && !/^gomo/i.test(product.brand)) score += 12;
  if (product.is_bestseller) score += 10;
  if (product.is_featured) score += 8;
  if (product.is_new) score += 4;
  score += Math.min(10, Number(product.rating || 0) * 2);
  score += Math.min(8, Number(product.reviews_count || 0) / 40);
  score += Math.max(0, 6 - (index % 7));
  return score;
};

const CATEGORY_ALIAS_GROUPS = {
  clothing: ['clothing', 'apparel'],
  'western-wear': ['western-wear'],
  'ethnic-wear': ['ethnic-wear'],
  footwear: ['footwear', 'footwears', 'shoes'],
  accessories: ['accessories'],
  gadgets: ['gadgets', 'electronics', 'electronic', 'audio'],
  electronics: ['gadgets', 'electronics', 'electronic', 'audio'],
  'home-living': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'home-kitchen': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'pooja-items': ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  pooja: ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  grocery: ['grocery', 'groceries', 'grocery-items'],
  groceries: ['grocery', 'groceries', 'grocery-items'],
  'grocery-items': ['grocery', 'groceries', 'grocery-items'],
  'healthy-foods': ['healthy-foods', 'healthy-food'],
  stationary: ['stationary', 'stationery', 'books'],
  stationery: ['stationary', 'stationery', 'books'],
  jewellery: ['jewellery', 'jewelry'],
  jewelry: ['jewellery', 'jewelry'],
  beauty: ['beauty', 'cosmetics', 'grooming', 'skincare'],
  kids: ['kids', 'baby'],
  'pet-accessories': ['pet-accessories', 'pet', 'pets', 'pet-supplies'],
  pet: ['pet-accessories', 'pet', 'pets', 'pet-supplies'],
  pets: ['pet-accessories', 'pet', 'pets', 'pet-supplies'],
  gifts: ['gifts', 'gift', 'gift-sets', 'hampers']
};

const productMatchesCategory = (product, category) => {
  if (!category || category === 'all') return true;
  const cleanCat = normalizeSlug(category);
  const aliases = CATEGORY_ALIAS_GROUPS[cleanCat] || [cleanCat];
  
  const pCat = normalizeSlug(product.category);
  const pCatName = normalizeSlug(product.category_name);
  const pDept = normalizeSlug(product.department);
  const pSec = normalizeSlug(product.section);
  const pGender = normalizeSlug(product.gender);

  if (cleanCat === 'men' || cleanCat === 'mens') {
    return (pSec === 'men' || pGender === 'men' || pDept === 'men') && pGender !== 'women';
  }
  if (cleanCat === 'women' || cleanCat === 'womens') {
    return (pSec === 'women' || pGender === 'women' || pDept === 'women') && pGender !== 'men';
  }
  if (cleanCat === 'kids') {
    return pCat === 'kids' || pSec === 'kids' || pGender === 'kids' || pDept === 'kids';
  }

  return aliases.some(alias => {
    return pCat === alias || pCatName === alias || pDept === alias;
  });
};

const resolveProductImage = (product) => {
  if (!product) return '';
  return product.thumbnail || product.image || product.pi_images?.[0]?.image_url || product.images?.[0] || getProductImage(product);
};

const curateCatalogProducts = (products) => {
  const bestByKey = new Map();

  products.forEach((product, index) => {
    const category = normalizeSlug(product.category || product.category_name || 'all');
    const subcategory = normalizeSlug(product.subcategory || product.childCategory || product.child_category || 'all');
    const brand = normalizeSlug(product.brand || product.seller_name || 'brand');
    const name = normalizeProductName(product.name || product.title || product.product_id || product.id);
    const compactName = name.split(' ').slice(-4).join(' ');
    const key = [category, subcategory, brand, compactName].join('|');
    const current = bestByKey.get(key);

    if (!current || productQualityScore(product, index) > productQualityScore(current.product, current.index)) {
      bestByKey.set(key, { product, index });
    }
  });

  return Array.from(bestByKey.values())
    .sort((a, b) => productQualityScore(b.product, b.index) - productQualityScore(a.product, a.index))
    .map(({ product }) => product);
};

// Normalize and enrich catalog products with brands, MRPs, discounts, and reviews
const enrichProducts = (products) => {
  return products.map((p, idx) => {
    const categoryKey = (p.category || p.category_name || '').toLowerCase();
    const brandsList = CATEGORY_BRAND_MAP[categoryKey] || ['GoMo Premium', 'Artisan Studio', 'Heritage Crafts'];
    const assignedBrand = p.brand || brandsList[idx % brandsList.length];
    
    // Calculate realistic MRP and discount percentage if not provided
    const price = Number(p.price) || 1000;
    const discountMultiplier = 1.15 + ((idx % 4) * 0.08); // 15% to 39% MRP markup
    const mrp = p.mrp ? Number(p.mrp) : Math.round(price * discountMultiplier);
    const discount_percentage = p.discount_percentage 
      ? Number(p.discount_percentage) 
      : (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

    const stock = p.stock_quantity !== undefined ? Number(p.stock_quantity) : 25;
    const rating = p.rating ? Number(p.rating) : 4.5;
    const reviews_count = p.reviews_count ? Number(p.reviews_count) : 45 + ((idx * 37) % 250);

    const categoryName = p.category_name || p.category || 'Store Collection';
    const defaultFeatures = p.features || [
      `Authentic single-vendor selection certified by ${assignedBrand}`,
      'Manufactured and tested to stringent quality and safety standards',
      'Designed with premium materials for maximum durability and daily comfort',
      '100% genuine product with direct brand warranty'
    ];

    const defaultSpecs = p.specifications || {
      'Category': categoryName,
      'Brand': assignedBrand,
      'SKU': `GMC-${p.product_id || p.id}`,
      'Condition': 'Brand New, Sealed',
      'Origin': 'India',
      'Warranty': '1 Year Standard Brand Warranty'
    };

    const defaultDelivery = p.delivery_info || {
      free_delivery: price >= 500,
      estimated_days: 3,
      return_days: 7,
      replacement_guarantee: true,
      cod_available: true
    };

    const piImages = p.pi_images && p.pi_images.length > 0
      ? p.pi_images
      : [{ image_url: p.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' }];

    const images = piImages.map(img => typeof img === 'string' ? img : img.image_url);

    return {
      ...p,
      brand: assignedBrand,
      price,
      mrp,
      discount_percentage,
      stock_quantity: stock,
      in_stock: stock > 0,
      rating,
      reviews_count,
      thumbnail: p.thumbnail || images[0],
      images,
      pi_images: piImages,
      features: defaultFeatures,
      specifications: defaultSpecs,
      delivery_info: defaultDelivery,
      variants: p.variants || []
    };
  });
};

// In-memory catalog copy combining all rich data sets and deduplicating by ID
const rawCombinedProducts = [
  ...(Array.isArray(SUPPLEMENTAL_PRODUCTS) ? SUPPLEMENTAL_PRODUCTS : []),
  ...(Array.isArray(SAMPLE_PRODUCTS) ? SAMPLE_PRODUCTS : []),
  ...(Array.isArray(GENERATED_PRODUCTS) ? GENERATED_PRODUCTS : [])
];

const seenProductIds = new Set();
const dedupedProducts = rawCombinedProducts.filter(p => {
  const pid = p.product_id || p.id;
  if (!pid || seenProductIds.has(pid)) return false;
  seenProductIds.add(pid);
  return true;
});

let catalogProducts = enrichProducts(dedupedProducts);

export const productService = {
  /**
   * Get filtered, sorted, and paginated products list for the store
   */
  async getProducts(params = {}) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.LIST, { params });
        if (res.data?.success && Array.isArray(res.data.data)) {
          if (res.data.data.length > 20) {
            catalogProducts = res.data.data;
          }
          return res.data;
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to mock catalog:', err.message);
      }
    }

    // Mock filtering logic
    let filtered = [...catalogProducts];
    const { 
      category, 
      subcategory, 
      brand, 
      minPrice, 
      maxPrice, 
      minRating,
      inStock,
      minDiscount,
      search, 
      deal, 
      sort,
      page,
      limit,
      section,
      department
    } = params;

    // 0. Demographic Section Filter
    const targetSection = (section || department || params.gender || '').toLowerCase().trim();
    if (targetSection && targetSection !== 'all') {
      filtered = filtered.filter(p => {
        const pSec = (p.section || '').toLowerCase();
        const pDept = (p.department || '').toLowerCase();
        const pGen = (p.gender || '').toLowerCase();
        const isKids = pSec === 'kids' || pDept === 'kids' || pDept.includes('kid') || pGen === 'kids' || pGen === 'girls' || pGen === 'boys';

        if (targetSection === 'women') {
          if (isKids) return false;
          return pSec === 'women' || pDept === 'women' || pGen === 'women';
        }
        if (targetSection === 'men') {
          if (isKids) return false;
          return pSec === 'men' || pDept === 'men' || pGen === 'men';
        }
        if (targetSection === 'kids') {
          return isKids;
        }
        if (targetSection === 'boys') {
          return (pGen === 'boys' || (isKids && pGen !== 'girls')) && !/\b(girls|girl|frock|frocks|choli|lehenga)\b/i.test(p.name || '');
        }
        if (targetSection === 'girls') {
          return (pGen === 'girls' || (isKids && pGen !== 'boys')) && !/\b(boys|boy)\b/i.test(p.name || '');
        }
        return true;
      });
    }

    // 1. Category Filter
    if (category && category !== 'all') {
      const cleanCat = category.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const cat = (p.category || '').toLowerCase();
        const catName = (p.category_name || '').toLowerCase();
        const sub = (p.subcategory || '').toLowerCase();

        if (cat === cleanCat || catName === cleanCat || sub === cleanCat || productMatchesCategory(p, cleanCat)) return true;
        if ((cat === 'footwear' && cleanCat === 'footwears') || (cat === 'footwears' && cleanCat === 'footwear')) return true;
        if (cleanCat === 'clothing' && ['clothing', 'apparel', 'fashion'].includes(cat)) return true;
        if (cleanCat === 'western-wear' && cat === 'western-wear') return true;
        if ((cleanCat === 'gadgets' || cleanCat === 'electronics') && (cat === 'gadgets' || cat === 'electronics')) return true;
        if ((cleanCat === 'home-kitchen' || cleanCat === 'home-living') && (cat === 'home-kitchen' || cat === 'home-living')) return true;
        if ((cleanCat === 'stationary' || cleanCat === 'stationery') && (cat === 'stationary' || cat === 'stationery' || cat === 'books')) return true;
        const pTags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase();
        if ((cleanCat === 'pooja' || cleanCat === 'pooja-items' || cleanCat === 'pooja items') && (cat === 'pooja' || cat === 'pooja-items' || cat === 'pooja items' || pTags.includes('pooja') || (p.category_name || '').toLowerCase().includes('pooja'))) return true;
        if ((cleanCat === 'grocery' || cleanCat === 'groceries' || cleanCat === 'grocery-items') && (cat === 'grocery' || cat === 'groceries' || cat === 'grocery-items')) return true;
        if ((cleanCat === 'pet-accessories' || cleanCat === 'pet' || cleanCat === 'pets') && (cat === 'pet-accessories' || cat === 'pet' || cat === 'pets' || cat === 'pet-supplies')) return true;
        if ((cleanCat === 'healthy-foods' || cleanCat === 'healthy-food') && (cat === 'healthy-foods' || cat === 'healthy-food')) return true;
        return false;
      });
    }

    // 2. Subcategory Filter
    if (subcategory && subcategory !== 'all') {
      const cleanSub = subcategory.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
      const rawSub = subcategory.toLowerCase().trim();
      const isFootwearSub = ['casual-shoes', 'casualshoes', 'formal-shoes', 'formalshoes', 'sandals', 'heels', 'flats', 'kids-shoes', 'kidsshoes', 'sneakers', 'sports-shoes', 'sportsshoes', 'loafers', 'boots', 'floaters'].includes(rawSub) || cleanSub.includes('shoe') || cleanSub.includes('sneaker') || cleanSub.includes('sandal') || cleanSub.includes('heel') || cleanSub.includes('flat');
      const isClothingSub = ['shirts', 'tshirts', 'polos', 'tops', 'dresses', 'jeans', 'trousers', 'jackets', 'kurtas', 'sarees', 'blouses', 'coordsets', 'suits'].includes(cleanSub) || cleanSub.includes('shirt') || cleanSub.includes('dress') || cleanSub.includes('pant') || cleanSub.includes('trouser') || cleanSub.includes('kurta') || cleanSub.includes('saree') || cleanSub.includes('blouse');

      filtered = filtered.filter(p => {
        const cat = (p.category || '').toLowerCase();
        const subRaw = (p.subcategory || '').toLowerCase();
        const isFootwearProd = ['footwear', 'shoes', 'footwears'].includes(cat) || ['casual-shoes', 'formal-shoes', 'sandals', 'heels', 'flats', 'kids-shoes', 'sneakers'].includes(subRaw);

        if (isFootwearSub && !isFootwearProd) return false;
        if (isClothingSub && isFootwearProd) return false;

        const sub = (p.subcategory || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        const child = (p.childCategory || p.child_category || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        const name = (p.name || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        const desc = (p.description || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');

        if (cleanSub === 'blouses') {
          return sub === 'blouses' || child === 'blouses' || (name.includes('blouse') && !name.includes('saree with')) || tags.includes('blouse');
        }
        if (cleanSub === 'sarees') {
          if (sub === 'blouses' || child === 'blouses') return false;
          return sub === 'sarees' || child.includes('saree') || tags.includes('saree') || name.includes('saree');
        }

        return sub === cleanSub || child === cleanSub || sub.includes(cleanSub) || child.includes(cleanSub) || tags.includes(cleanSub) || name.includes(cleanSub) || desc.includes(cleanSub);
      });
    }

    // 2B. Child Category Filter (e.g. Saree styles: silk-sarees, kanjivaram-sarees, etc.)
    if (params.childCategory && params.childCategory !== 'all') {
      const cleanChild = params.childCategory.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
      const baseKey = cleanChild.replace(/sarees?$/, '');
      filtered = filtered.filter(p => {
        const child = (p.childCategory || p.child_category || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        const name = (p.name || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        return child === cleanChild || child.includes(baseKey) || tags.includes(cleanChild) || tags.includes(baseKey) || name.includes(baseKey);
      });
    }

    // 3. Brand Filter (supports single string or array)
    if (brand && brand !== 'all') {
      const brandList = Array.isArray(brand) ? brand.map(b => b.toLowerCase().trim()) : [brand.toLowerCase().trim()];
      filtered = filtered.filter(p => p.brand && brandList.includes(p.brand.toLowerCase().trim()));
    }

    // 4. Price Range
    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    // 5. Min Customer Rating
    if (minRating && Number(minRating) > 0) {
      filtered = filtered.filter(p => Number(p.rating || 0) >= Number(minRating));
    }

    // 6. Stock Availability
    if (inStock === true || inStock === 'true' || inStock === 'in-stock') {
      filtered = filtered.filter(p => Number(p.stock_quantity || 0) > 0);
    }

    // 7. Min Discount Filter
    if (minDiscount && Number(minDiscount) > 0) {
      filtered = filtered.filter(p => Number(p.discount_percentage || 0) >= Number(minDiscount));
    }

    // 8. Multi-field Keyword Search (Smart multi-token)
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter(Boolean);
      filtered = filtered.filter(p => {
        const text = [
          p.name,
          p.title,
          p.description,
          p.brand,
          p.category_name,
          p.category,
          p.subcategory,
          p.tags
        ].filter(Boolean).join(' ').toLowerCase();

        return tokens.every(token => {
          if (text.includes(token)) return true;
          if (token.endsWith('s') && text.includes(token.slice(0, -1))) return true;
          if (!token.endsWith('s') && text.includes(token + 's')) return true;
          return false;
        });
      });
    }

    // 9. Promotional Deals Filter
    if (deal && deal !== 'all') {
      const cleanDeal = deal.toLowerCase();
      if (cleanDeal === 'best sellers' || cleanDeal === 'bestseller' || cleanDeal === 'best') {
        filtered = filtered.filter(p => p.is_bestseller || p.rating >= 4.7);
      } else if (cleanDeal === 'new arrivals' || cleanDeal === 'new' || cleanDeal === 'new-arrivals' || cleanDeal === 'new_arrival') {
        filtered = filtered.filter(p => p.is_new || p.deal_type === 'new_arrival');
      } else if (cleanDeal === 'top deals' || cleanDeal === 'sale') {
        filtered = filtered.filter(p => p.discount_percentage >= 20 || p.price < 5000);
      }
    }

    // 10. Sorting
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'newest') {
      filtered.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
    } else if (sort === 'discount') {
      filtered.sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
    }

    const total = filtered.length;

    // 11. Pagination - 1 page pagination
    let paginated = filtered;
    const pageNum = 1;
    const limitNum = limit ? Number(limit) : total;

    if (page || limit) {
      const startIndex = (pageNum - 1) * limitNum;
      paginated = filtered.slice(startIndex, startIndex + limitNum);
    }

    return {
      success: true,
      data: paginated,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: 1
    };
  },

  /**
   * Search helper using getProducts
   */
  async searchProducts(query, options = {}) {
    return this.getProducts({ search: query, ...options });
  },

  /**
   * Autocomplete search suggestions (products, brands, categories)
   */
  async getSearchSuggestions(query) {
    if (!query || !query.trim()) {
      return { success: true, data: { products: [], brands: [], categories: [] } };
    }

    try {
      const res = await apiClient.get('/products/search/suggestions', { params: { q: query } });
      if (res.data?.success && res.data.data) {
        return res.data;
      }
    } catch {
      // Fallback to local catalog filtering
    }

    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    // 1. Matching products
    const matchingProducts = catalogProducts.filter(p => {
      const text = [
        p.name,
        p.title,
        p.brand,
        p.category_name,
        p.category,
        p.subcategory,
        p.tags
      ].filter(Boolean).join(' ').toLowerCase();

      return tokens.every(token => {
        if (text.includes(token)) return true;
        if (token.endsWith('s') && text.includes(token.slice(0, -1))) return true;
        if (!token.endsWith('s') && text.includes(token + 's')) return true;
        return false;
      });
    }).slice(0, 6);

    // 2. Matching brands
    const brandsSet = new Set();
    catalogProducts.forEach(p => {
      if (p.brand && p.brand.toLowerCase().includes(q)) {
        brandsSet.add(p.brand.trim());
      }
    });

    // 3. Respective category match and matching categories
    const categoryMatch = findRespectiveCategoryMatch(q, catalogProducts);
    const matchingCategories = categoryMatch?.allMatchingCategories || [];

    return {
      success: true,
      data: {
        categoryMatch,
        products: matchingProducts.map(p => ({
          id: p.product_id || p.id,
          name: p.name,
          price: p.price,
          brand: p.brand,
          category: p.category || p.category_name,
          thumbnail: p.thumbnail
        })),
        brands: Array.from(brandsSet).slice(0, 4),
        categories: matchingCategories.slice(0, 4)
      }
    };
  },

  /**
   * Get details of a single product by ID
   */
  async getProductById(productId) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.DETAIL(productId));
        if (res.data?.success) {
          return res.data;
        }
      } catch (err) {
        console.warn('API getProductById failed, using mock fallback:', err.message);
      }
    }

    const found = catalogProducts.find(p => (p.product_id || p.id) === productId);
    if (!found) {
      return { success: false, error: 'Product not found' };
    }

    const normalized = {
      ...found,
      thumbnail: found.thumbnail || found.pi_images?.[0]?.image_url,
      images: found.images || found.pi_images?.map(img => typeof img === 'string' ? img : img.image_url) || [found.thumbnail]
    };

    return { success: true, data: normalized };
  },

  /**
   * Get related products based on category, tags, or occasion, excluding the current product
   */
  async getRelatedProducts(productId, limit = 4) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.get(`${API_CONFIG.ENDPOINTS.PRODUCTS.LIST}/related/${productId}`, { params: { limit } });
        if (res.data?.success && Array.isArray(res.data.data)) {
          return res.data;
        }
      } catch (err) {
        console.warn('API getRelatedProducts failed, using mock fallback:', err.message);
      }
    }

    const current = catalogProducts.find(p => (p.product_id || p.id) === productId);
    const currentCat = (current?.category || current?.category_name || '').toLowerCase();
    const currentSub = (current?.subcategory || '').toLowerCase();
    const currentTags = current && current.tags 
      ? (Array.isArray(current.tags) ? current.tags : current.tags.toString().split(',')).map(t => t.toString().toLowerCase().trim()) 
      : [];

    // Filter products from same category, subcategory or matching tags, excluding the current product
    let related = catalogProducts.filter(p => {
      const pid = p.product_id || p.id;
      if (pid === productId) return false;
      const cat = (p.category || p.category_name || '').toLowerCase();
      const sub = (p.subcategory || '').toLowerCase();
      if (currentSub && sub && sub === currentSub) return true;
      if (currentCat && cat && cat === currentCat) return true;
      const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase();
      return currentTags.some(t => t && tags.includes(t));
    });

    // If not enough related products, fill up with catalog top items
    if (related.length < limit) {
      const remaining = catalogProducts.filter(p => {
        const pid = p.product_id || p.id;
        return pid !== productId && !related.some(r => (r.product_id || r.id) === pid);
      });
      related = [...related, ...remaining];
    }

    return {
      success: true,
      data: related.slice(0, limit)
    };
  },

  /**
   * Record product into recently viewed items (localStorage)
   */
  recordRecentlyViewed(product) {
    if (!product || typeof window === 'undefined') return;
    try {
      const key = 'gomocart_recently_viewed';
      const raw = localStorage.getItem(key);
      const stored = raw ? JSON.parse(raw) : [];
      const pid = product.product_id || product.id;

      const itemToSave = {
        id: pid,
        product_id: pid,
        name: product.name || product.title,
        price: product.price,
        mrp: product.mrp,
        discount_percentage: product.discount_percentage,
        rating: product.rating,
        reviews_count: product.reviews_count,
        category: product.category || product.category_name,
        category_name: product.category_name || product.category,
        thumbnail: product.thumbnail || product.images?.[0] || product.pi_images?.[0]?.image_url,
        in_stock: (product.stock_quantity || 0) > 0,
        viewedAt: Date.now()
      };

      const updated = [
        itemToSave,
        ...stored.filter(item => (item.product_id || item.id) !== pid)
      ].slice(0, 8);

      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save recently viewed product:', e);
    }
  },

  /**
   * Get recently viewed products, excluding current product
   */
  async getRecentlyViewed(currentProductId, limit = 6) {
    if (typeof window === 'undefined') {
      return { success: true, data: [] };
    }
    try {
      const key = 'gomocart_recently_viewed';
      const raw = localStorage.getItem(key);
      const stored = raw ? JSON.parse(raw) : [];
      const filtered = stored
        .filter(p => (p.product_id || p.id) !== currentProductId)
        .slice(0, limit);
      return { success: true, data: filtered };
    } catch (e) {
      console.warn('Failed to load recently viewed products:', e);
      return { success: true, data: [] };
    }
  },

  /**
   * Get featured products for homepage showcase
   */
  async getFeaturedProducts(limit = 8) {
    const res = await this.getProducts({ sort: 'rating' });
    return {
      success: true,
      data: (res.data || []).slice(0, limit)
    };
  },

  /**
   * Get deals / promotions
   */
  async getDeals(type = 'all') {
    return this.getProducts({ deal: type });
  },

  /**
   * Get list of unique catalog brands, optionally filtered by category
   */
  async getBrands(category = null) {
    const brands = new Set();
    catalogProducts.forEach(p => {
      if (category && category !== 'all') {
        const cleanCat = category.toLowerCase().trim();
        if ((p.category || '').toLowerCase() !== cleanCat && (p.category_name || '').toLowerCase() !== cleanCat) {
          return;
        }
      }
      if (p.brand && p.brand.trim()) brands.add(p.brand.trim());
    });
    return {
      success: true,
      data: Array.from(brands).sort()
    };
  },

  /**
   * Seller / Admin: Add new product to store catalog
   */
  async addProduct(productData) {
    try {
      const sId = productData.seller_id || (typeof localStorage !== 'undefined' ? (JSON.parse(localStorage.getItem('gmd_seller') || '{}')?.id || 'seller-1') : 'seller-1');
      const res = await apiClient.post('/seller/products', productData, {
        headers: { 'x-seller-id': sId }
      });
      if (res.data?.success) {
        const newP = res.data.product || res.data.data;
        if (newP) {
          catalogProducts = [newP, ...catalogProducts.filter(p => (p.product_id || p.id) !== (newP.product_id || newP.id))];
        }
        return res.data;
      }
    } catch (err) {
      console.warn('API addProduct failed, falling back to local creation:', err.message);
    }

    const pid = `prod_${Date.now()}`;
    const newProduct = {
      ...productData,
      id: pid,
      product_id: pid,
      is_active: true,
      in_stock: (Number(productData.stock_quantity) || 10) > 0,
      rating: 5.0,
      reviews_count: 0,
      created_at: new Date().toISOString()
    };
    catalogProducts.unshift(newProduct);
    return { success: true, product: newProduct, data: newProduct };
  },

  /**
   * Admin: Update existing store product
   */
  async updateProduct(productId, updateData) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.put(API_CONFIG.ENDPOINTS.PRODUCTS.DETAIL(productId), updateData);
        return res.data;
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    const idx = catalogProducts.findIndex(p => (p.product_id || p.id) === productId);
    if (idx !== -1) {
      catalogProducts[idx] = { ...catalogProducts[idx], ...updateData };
      return { success: true, data: catalogProducts[idx] };
    }
    return { success: false, error: 'Product not found' };
  },

  /**
   * Admin: Delete product from catalog
   */
  async deleteProduct(productId) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.delete(API_CONFIG.ENDPOINTS.PRODUCTS.DETAIL(productId));
        return res.data;
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    catalogProducts = catalogProducts.filter(p => (p.product_id || p.id) !== productId);
    return { success: true };
  }
};

// Standalone named exports for backward compatibility
export const getProducts = (params) => productService.getProducts(params);
export const getProductById = (id) => productService.getProductById(id);
export const getRelatedProducts = (id, limit) => productService.getRelatedProducts(id, limit);
export const recordRecentlyViewed = (product) => productService.recordRecentlyViewed(product);
export const getRecentlyViewed = (id, limit) => productService.getRecentlyViewed(id, limit);
export const searchProducts = (query, options) => productService.searchProducts(query, options);
export const getSearchSuggestions = (query) => productService.getSearchSuggestions(query);
export const getBrands = (category) => productService.getBrands(category);
export const addProduct = (data) => productService.addProduct(data);
export const updateProduct = (id, data) => productService.updateProduct(id, data);
export const deleteProduct = (id) => productService.deleteProduct(id);

export default productService;
