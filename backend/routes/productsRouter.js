import { getDB, saveCollection } from '../database/db.js';
import { broadcast } from '../realtime.js';

function calculateSearchScore(p, q, tokens) {
  let score = 0;
  const name = (p.name || p.title || '').toLowerCase();
  const sub = (p.subcategory || '').toLowerCase();
  const cat = (p.category || p.category_name || '').toLowerCase();
  const brand = (p.brand || '').toLowerCase();
  const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toLowerCase();

  // 1. Exact full query match in title/name
  if (name === q) score += 250;
  else if (name.startsWith(q)) score += 180;
  else if (name.includes(q)) score += 120;

  // 2. Token matches in name (exact word vs partial)
  tokens.forEach(tok => {
    const wordRegex = new RegExp(`\\b${tok}\\b`, 'i');
    if (wordRegex.test(name)) score += 60;
    else if (name.includes(tok)) score += 30;

    if (sub === tok || sub.replace(/-/g, ' ') === tok) score += 70;
    else if (wordRegex.test(sub)) score += 45;
    else if (sub.includes(tok)) score += 25;

    if (cat === tok || cat.replace(/-/g, ' ') === tok) score += 40;
    else if (cat.includes(tok)) score += 20;

    if (brand === tok) score += 35;
    else if (brand.includes(tok)) score += 15;

    if (tags.includes(tok)) score += 10;
  });

  // Micro boost for rating
  score += Math.min(10, (Number(p.rating) || 4) * 2);

  return score;
}

export function handleProductsRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. Suggestions endpoint
  if (pathname === '/api/v1/products/search/suggestions' || pathname === '/api/v1/products/suggestions') {
    const q = (query.q || query.search || '').toLowerCase().trim();
    if (!q) {
      return sendJSON(res, { success: true, data: { products: [], brands: [], categories: [] } });
    }
    const tokens = q.split(/\s+/).filter(Boolean);
    const matches = db.products.filter(p => {
      const text = [
        p.name,
        p.title,
        p.brand,
        p.seller_name,
        p.category,
        p.category_name,
        p.subcategory,
        Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')
      ].filter(Boolean).join(' ').toLowerCase();

      return tokens.every(tok => {
        if (text.includes(tok)) return true;
        if (tok.endsWith('s') && text.includes(tok.slice(0, -1))) return true;
        if (!tok.endsWith('s') && text.includes(tok + 's')) return true;
        return false;
      });
    })
    .sort((a, b) => calculateSearchScore(b, q, tokens) - calculateSearchScore(a, q, tokens))
    .slice(0, 8);

    const brandsSet = new Set();
    const categoriesSet = new Set();
    matches.forEach(p => {
      if (p.brand) brandsSet.add(p.brand);
      if (p.category_name || p.category) categoriesSet.add(p.category_name || p.category);
    });

    return sendJSON(res, {
      success: true,
      data: {
        products: matches.map(p => ({
          id: p.id || p.product_id,
          product_id: p.product_id || p.id,
          name: p.name || p.title,
          price: p.price,
          mrp: p.mrp,
          brand: p.brand,
          seller_name: p.seller_name,
          category: p.category,
          category_name: p.category_name,
          thumbnail: p.thumbnail,
          in_stock: p.in_stock
        })),
        brands: Array.from(brandsSet).slice(0, 4),
        categories: Array.from(categoriesSet).slice(0, 4)
      }
    });
  }

  // 2. Featured products
  if (pathname === '/api/v1/products/featured' && method === 'GET') {
    const featured = db.products.filter(p => p.is_featured && p.is_active !== false);
    return sendJSON(res, {
      success: true,
      count: featured.length,
      data: featured
    });
  }

  // 3. Deals products
  if (pathname === '/api/v1/products/deals' && method === 'GET') {
    const deals = db.products.filter(p => (p.discount_percentage >= 30 || p.deal_type === 'flash_deal') && p.is_active !== false);
    return sendJSON(res, {
      success: true,
      count: deals.length,
      data: deals
    });
  }

  // 4. Brands list
  if (pathname === '/api/v1/products/brands' && method === 'GET') {
    const brandMap = {};
    const categoryFilter = query.category ? query.category.toLowerCase() : null;

    db.products.forEach(p => {
      if (categoryFilter && (p.category || '').toLowerCase() !== categoryFilter) return;
      if (p.brand) {
        brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
      }
    });

    const brands = Object.entries(brandMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return sendJSON(res, { success: true, data: brands });
  }

  // 5. Product Reviews (GET & POST)
  if (pathname.startsWith('/api/v1/products/') && pathname.endsWith('/reviews')) {
    const parts = pathname.split('/');
    const prodId = parts[4];

    if (method === 'GET') {
      const prodReviews = db.reviews[prodId] || [];
      return sendJSON(res, {
        success: true,
        count: prodReviews.length,
        data: prodReviews
      });
    }

    if (method === 'POST') {
      if (!db.reviews[prodId]) db.reviews[prodId] = [];
      const newRev = {
        id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        review_id: `rev-${Date.now()}`,
        product_id: prodId,
        user_name: body.user_name || body.user || 'Verified Buyer',
        rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
        comment: body.comment || 'Wonderful product experience.',
        verified: true,
        status: 'approved',
        created_at: new Date().toISOString()
      };

      db.reviews[prodId].unshift(newRev);
      saveCollection('reviews');

      // Update product rating and reviews_count
      const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
      if (prod) {
        const allRatings = db.reviews[prodId].map(r => r.rating);
        const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
        prod.rating = Number(avg.toFixed(1));
        prod.reviews_count = (prod.reviews_count || 0) + 1;
        saveCollection('products');

        // Broadcast review update in real time
        broadcast('NEW_REVIEW', {
          productId: prodId,
          newRating: prod.rating,
          newReviewsCount: prod.reviews_count,
          review: newRev
        });
      }

      return sendJSON(res, { success: true, message: 'Review published successfully', data: newRev });
    }
  }

  // 6. Admin toggle product status
  if (pathname.startsWith('/api/v1/admin/products/') && pathname.endsWith('/toggle-status') && (method === 'PATCH' || method === 'POST')) {
    const prodId = pathname.split('/')[4];
    const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
    if (!prod) return sendJSON(res, { success: false, message: 'Product not found' }, 404);

    const isActive = body.is_active !== undefined ? Boolean(body.is_active) : !prod.is_active;
    prod.is_active = isActive;
    saveCollection('products');

    return sendJSON(res, {
      success: true,
      message: `Product ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: prod
    });
  }

  // 7. Product Details (Single product)
  const isSpecialSubpath = pathname.includes('/search') ||
    pathname.includes('/suggestions') ||
    pathname.includes('/featured') ||
    pathname.includes('/deals') ||
    pathname.includes('/brands') ||
    pathname.includes('/reviews') ||
    pathname.includes('/toggle-status') ||
    pathname.includes('/related');

  if (pathname.startsWith('/api/v1/products/') && method === 'GET' && !isSpecialSubpath) {
    const id = pathname.split('/')[4];
    const prod = db.products.find(p => p.id === id || p.product_id === id);
    if (!prod) {
      return sendJSON(res, { success: false, message: `Product with id "${id}" not found` }, 404);
    }
    return sendJSON(res, { success: true, data: prod, product: prod });
  }

  // 8. Update product (Admin or API)
  if ((pathname.startsWith('/api/v1/products/') || pathname.startsWith('/api/v1/admin/products/')) && (method === 'PUT' || method === 'PATCH')) {
    const id = pathname.split('/').pop();
    const idx = db.products.findIndex(p => p.id === id || p.product_id === id);
    if (idx === -1) {
      return sendJSON(res, { success: false, message: 'Product not found' }, 404);
    }

    db.products[idx] = {
      ...db.products[idx],
      ...body,
      id: db.products[idx].id,
      product_id: db.products[idx].product_id,
      updated_at: new Date().toISOString()
    };
    saveCollection('products');

    // Broadcast stock/price update if changed
    broadcast('STOCK_UPDATE', {
      productId: db.products[idx].id,
      stock_quantity: db.products[idx].stock_quantity,
      in_stock: db.products[idx].stock_quantity > 0,
      price: db.products[idx].price
    });

    return sendJSON(res, { success: true, message: 'Product updated successfully', data: db.products[idx] });
  }

  // 9. Delete product
  if ((pathname.startsWith('/api/v1/products/') || pathname.startsWith('/api/v1/admin/products/')) && method === 'DELETE') {
    const id = pathname.split('/').pop();
    const initialLen = db.products.length;
    db.products = db.products.filter(p => p.id !== id && p.product_id !== id);
    if (db.products.length === initialLen) {
      return sendJSON(res, { success: false, message: 'Product not found' }, 404);
    }
    saveCollection('products');
    return sendJSON(res, { success: true, message: 'Product deleted successfully' });
  }

  // 10. Create product (Admin or API)
  if ((pathname === '/api/v1/products' || pathname === '/api/v1/admin/products') && method === 'POST') {
    const pid = body.product_id || `prod-${Date.now()}`;
    const price = Number(body.price) || 999;
    const mrp = Number(body.mrp) || Math.round(price * 1.3);
    const stock = Number(body.stock_quantity) || 25;

    const newProd = {
      ...body,
      id: pid,
      product_id: pid,
      name: body.name || body.title || 'New Product',
      title: body.title || body.name || 'New Product',
      price,
      mrp,
      discount_percentage: body.discount_percentage || Math.max(10, Math.round(((mrp - price) / mrp) * 100)),
      stock_quantity: stock,
      in_stock: stock > 0,
      is_active: body.is_active !== undefined ? body.is_active : true,
      rating: 5.0,
      reviews_count: 0,
      thumbnail: body.thumbnail || body.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      images: Array.isArray(body.images) ? body.images : [body.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
      created_at: new Date().toISOString()
    };

    db.products.unshift(newProd);
    saveCollection('products');

    return sendJSON(res, { success: true, message: 'Product created successfully', data: newProd }, 201);
  }

  // 11. Products Listing & Filtering (GET /api/v1/products, /api/v1/products/search, /api/v1/admin/products)
  if ((pathname === '/api/v1/products' || pathname === '/api/v1/products/search' || pathname === '/api/v1/admin/products') && method === 'GET') {
    let filtered = [...db.products];

    // For public store, hide inactive products unless explicitly asking or in admin
    if (pathname !== '/api/v1/admin/products' && !query.include_inactive) {
      filtered = filtered.filter(p => p.is_active !== false);
    }

    // 1. Search Query
    if (query.search || query.q) {
      const q = (query.search || query.q).toLowerCase().trim();
      const tokens = q.split(/\s+/).filter(Boolean);
      filtered = filtered.filter(p => {
        const text = [
          p.name,
          p.title,
          p.brand,
          p.seller_name,
          p.category,
          p.category_name,
          p.subcategory,
          p.description,
          Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')
        ].filter(Boolean).join(' ').toLowerCase();

        return tokens.every(tok => {
          if (text.includes(tok)) return true;
          if (tok.endsWith('s') && text.includes(tok.slice(0, -1))) return true;
          if (!tok.endsWith('s') && text.includes(tok + 's')) return true;
          return false;
        });
      });
    }

    // 2. Category Filter
    if (query.category && query.category !== 'all') {
      const cat = query.category.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const pCat = (p.category || '').toLowerCase();
        const pCatName = (p.category_name || '').toLowerCase();
        const pSub = (p.subcategory || '').toLowerCase();
        const pSec = (p.section || '').toLowerCase();

        if (pCat === cat || pCatName === cat || pSub === cat || pSec === cat) return true;
        if ((cat === 'home-living' || cat === 'home-kitchen') && (pCat === 'home-living' || pCat === 'home-kitchen')) return true;
        if ((cat === 'pooja-items' || cat === 'pooja') && (pCat.includes('pooja') || pSub.includes('pooja'))) return true;
        if ((cat === 'gadgets' || cat === 'electronics') && (pCat === 'gadgets' || pCat === 'electronics')) return true;
        if ((cat === 'jewellery' || cat === 'jewelry') && (pCat === 'jewellery' || pCat === 'jewelry')) return true;
        if ((cat === 'stationery' || cat === 'stationary') && (pCat === 'stationery' || pCat === 'stationary')) return true;
        if ((cat === 'grocery' || cat === 'groceries' || cat === 'grocery-items') && (pCat === 'grocery' || pCat === 'groceries' || pCat === 'grocery-items')) return true;
        if ((cat === 'pet-accessories' || cat === 'pet' || cat === 'pets') && (pCat === 'pet-accessories' || pCat === 'pet' || pCat === 'pets' || pCat === 'pet-supplies')) return true;
        return false;
      });
    }

    // 3. Subcategory Filter
    if (query.subcategory && query.subcategory !== 'all') {
      const sub = query.subcategory.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const pSub = (p.subcategory || '').toLowerCase();
        const pChild = (p.childCategory || p.child_category || '').toLowerCase();
        const pTags = (p.tags || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();

        if (sub === 'blouses') {
          return pSub === 'blouses' || pChild === 'blouses' || (pName.includes('blouse') && !pName.includes('saree with')) || pTags.includes('blouse');
        }
        if (sub === 'sarees') {
          if (pSub === 'blouses' || pChild === 'blouses') return false;
          return pSub === 'sarees' || pChild.includes('saree') || pTags.includes('saree') || pName.includes('saree');
        }

        return pSub === sub || pChild === sub || pSub.includes(sub);
      });
    }

    // 3B. Child Category Filter (e.g. Saree styles)
    if (query.childCategory && query.childCategory !== 'all') {
      const child = query.childCategory.toLowerCase().trim();
      const baseKey = child.replace(/sarees?$/, '');
      filtered = filtered.filter(p => {
        const pChild = (p.childCategory || p.child_category || '').toLowerCase();
        const pTags = (p.tags || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        return pChild === child || pChild.includes(baseKey) || pTags.includes(child) || pTags.includes(baseKey) || pName.includes(baseKey);
      });
    }

    // 4. Section / Gender Filter
    const targetSection = (query.section || query.department || query.gender || '').toLowerCase().trim();
    if (targetSection && targetSection !== 'all') {
      filtered = filtered.filter(p => {
        const pSec = (p.section || '').toLowerCase();
        const pGender = (p.gender || '').toLowerCase();
        const pDept = (p.department || '').toLowerCase();
        return pSec === targetSection || pGender === targetSection || pDept === targetSection || (targetSection === 'boys' && pGender === 'boys') || (targetSection === 'girls' && pGender === 'girls');
      });
    }

    // 5. Brand Filter
    if (query.brand && query.brand !== 'all') {
      const brands = query.brand.split(',').map(b => b.toLowerCase().trim());
      filtered = filtered.filter(p => p.brand && brands.includes(p.brand.toLowerCase().trim()));
    }

    // 6. Price Range
    if (query.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(query.minPrice));
    }
    if (query.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(query.maxPrice));
    }

    // 7. Rating
    if (query.minRating) {
      filtered = filtered.filter(p => Number(p.rating || 0) >= Number(query.minRating));
    }

    // 8. In Stock
    if (query.inStock === 'true' || query.inStock === true) {
      filtered = filtered.filter(p => Number(p.stock_quantity || 0) > 0);
    }

    // 9. Min Discount
    if (query.minDiscount) {
      filtered = filtered.filter(p => Number(p.discount_percentage || 0) >= Number(query.minDiscount));
    }

    // 10. Deals Filter
    if (query.deal && query.deal !== 'all') {
      const d = query.deal.toLowerCase();
      if (d === 'clearance') filtered = filtered.filter(p => p.discount_percentage >= 45);
      else if (d === 'flash_deal') filtered = filtered.filter(p => p.deal_type === 'flash_deal');
      else if (d === 'bestseller' || d === 'best sellers' || d === 'best') filtered = filtered.filter(p => p.is_bestseller || p.rating >= 4.7);
      else if (d === 'new' || d === 'new arrivals' || d === 'new-arrivals' || d === 'new_arrival') filtered = filtered.filter(p => p.is_new || p.deal_type === 'new_arrival');
    }

    // 11. Sorting
    if (query.sort) {
      if (query.sort === 'price_low_high') filtered.sort((a, b) => a.price - b.price);
      else if (query.sort === 'price_high_low') filtered.sort((a, b) => b.price - a.price);
      else if (query.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      else if (query.sort === 'discount') filtered.sort((a, b) => b.discount_percentage - a.discount_percentage);
      else if (query.sort === 'newest') filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      else if (query.sort === 'relevance' && (query.search || query.q)) {
        const q = (query.search || query.q).toLowerCase().trim();
        const tokens = q.split(/\s+/).filter(Boolean);
        filtered.sort((a, b) => calculateSearchScore(b, q, tokens) - calculateSearchScore(a, q, tokens));
      }
    } else if (query.search || query.q) {
      const q = (query.search || query.q).toLowerCase().trim();
      const tokens = q.split(/\s+/).filter(Boolean);
      filtered.sort((a, b) => calculateSearchScore(b, q, tokens) - calculateSearchScore(a, q, tokens));
    }

    const total = filtered.length;
    const isPagingRequested = query.page !== undefined || query.limit !== undefined;
    const page = Math.min(4, Math.max(1, Number(query.page) || 1));
    const fixedPageSize = Math.max(1, Math.ceil(total / 4));
    const limit = query.all === 'true' || query.limit === 'all' || !isPagingRequested
      ? Math.max(1000, total)
      : (query.limit ? Number(query.limit) : fixedPageSize);
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return sendJSON(res, {
      success: true,
      total,
      count: paginated.length,
      page,
      limit,
      totalPages: 4,
      data: paginated,
      products: paginated
    });
  }

  return false;
}
