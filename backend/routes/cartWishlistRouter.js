import { getDB, saveCollection } from '../database/db.js';

/**
 * Helper to enrich cart items with catalog data (live stock, prices)
 * and calculate full financial totals (subtotal, shipping, tax, discounts, final total)
 */
function enrichCartAndCalculateSummary(rawCart = [], db, options = {}) {
  const products = db.products || [];
  const cart = (rawCart || []).map(item => {
    const prodId = item.product_id || item.id;
    const prod = products.find(p => p.id === prodId || p.product_id === prodId);
    const availableStock = prod ? (prod.stock_quantity ?? 0) : (item.stock_quantity ?? 25);
    const price = item.price !== undefined ? Number(item.price) : (prod?.price || 999);
    const mrp = item.mrp !== undefined ? Number(item.mrp) : (prod?.mrp || Math.round(price * 1.3));
    const qty = Number(item.quantity || 1);
    const inStock = availableStock >= qty;
    const hasStockIssue = qty > availableStock;

    return {
      ...item,
      id: item.id || prodId,
      cart_item_id: item.cart_item_id || item.id || `cart_${prodId}`,
      product_id: prodId,
      name: item.name || prod?.name || 'Product',
      price,
      mrp,
      thumbnail: item.thumbnail || prod?.thumbnail || (prod?.images && prod.images[0]) || '',
      stock_quantity: availableStock,
      in_stock: inStock,
      has_stock_issue: hasStockIssue,
      category_name: item.category_name || prod?.category_name || prod?.category || null,
      variant_value: item.variant_value || item.selectedColor || null,
      selectedColor: item.selectedColor || item.variant_value || null,
      variant_id: item.variant_id || null,
      quantity: qty
    };
  });

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
  const total_items = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  const freeShippingThreshold = options.freeShippingThreshold || 499;
  const standardShippingFee = 50;
  const expressShippingFee = 120;
  const deliveryMethod = options.deliveryMethod || 'standard';

  let shipping_fee = 0;
  if (subtotal > 0) {
    if (deliveryMethod === 'express') {
      shipping_fee = expressShippingFee;
    } else {
      shipping_fee = (subtotal >= freeShippingThreshold || options.free_shipping) ? 0 : standardShippingFee;
    }
  }

  const taxRate = options.taxRate || 0.05; // 5% GST
  const tax = Math.round(subtotal * taxRate);
  const discount = Number(options.discount || 0);
  const final_total = Math.max(0, subtotal + shipping_fee + tax - discount);
  const amount_needed_for_free_shipping = Math.max(0, freeShippingThreshold - subtotal);
  const free_shipping_progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const summary = {
    subtotal,
    total_items,
    distinct_items: cart.length,
    shipping_fee,
    shipping: shipping_fee,
    tax,
    discount,
    final_total,
    total: final_total,
    is_free_shipping: shipping_fee === 0 && subtotal > 0,
    free_shipping_threshold: freeShippingThreshold,
    amount_needed_for_free_shipping,
    free_shipping_progress
  };

  return { cart, summary };
}

/**
 * Extract active user identifier safely from body, query, headers or URL
 */
function extractUserId(req, pathname, query, body, defaultUser = 'usr-1') {
  if (body?.userId || body?.customer_id) return body.userId || body.customer_id;
  if (query?.userId || query?.customer_id) return query.userId || query.customer_id;
  if (req?.headers?.['x-user-id']) return req.headers['x-user-id'];
  return defaultUser;
}

export function handleCartWishlistRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. Get Cart (GET /api/v1/cart/:userId or GET /api/v1/cart)
  if ((pathname === '/api/v1/cart' || pathname.startsWith('/api/v1/cart/')) && 
      !pathname.includes('/items/') && 
      !pathname.includes('/clear') && 
      !pathname.includes('/merge') && 
      !pathname.includes('/move-to-wishlist') && 
      method === 'GET') {
    let userId = pathname.startsWith('/api/v1/cart/') ? pathname.split('/').pop() : null;
    if (!userId || userId === 'cart') {
      userId = extractUserId(req, pathname, query, body);
    }
    const rawCart = db.carts[userId] || [];
    const { cart, summary } = enrichCartAndCalculateSummary(rawCart, db);
    return sendJSON(res, {
      success: true,
      data: cart,
      items: cart,
      count: cart.length,
      total_items: summary.total_items,
      summary
    });
  }

  // 2. Add to Cart (POST /api/v1/cart/add or POST /api/v1/cart/items)
  if ((pathname === '/api/v1/cart/add' || pathname === '/api/v1/cart/items') && method === 'POST') {
    const userId = extractUserId(req, pathname, query, body);
    const prodId = body.product_id || body.id;
    const qty = Number(body.quantity || 1);
    const variantId = body.variant_id || null;
    const variantValue = body.variant_value || body.selectedColor || null;

    if (!prodId) {
      return sendJSON(res, { success: false, message: 'Product ID is required.' }, 400);
    }

    if (!db.carts[userId]) db.carts[userId] = [];

    // Verify stock from catalog
    const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
    const availableStock = prod ? (prod.stock_quantity ?? 0) : 25;

    // Check existing item matching product AND variant
    const existingIndex = db.carts[userId].findIndex(i => 
      (i.product_id === prodId || i.id === prodId) &&
      (variantId ? i.variant_id === variantId : true) &&
      (variantValue ? (i.variant_value === variantValue || i.selectedColor === variantValue) : true)
    );

    const currentQtyInCart = existingIndex > -1 ? (db.carts[userId][existingIndex].quantity || 0) : 0;
    if (currentQtyInCart + qty > availableStock) {
      return sendJSON(res, {
        success: false,
        message: `Only ${availableStock} units available in stock.`
      }, 400);
    }

    if (existingIndex > -1) {
      db.carts[userId][existingIndex].quantity += qty;
    } else {
      const cartItemId = `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      db.carts[userId].push({
        id: prodId,
        cart_item_id: cartItemId,
        product_id: prodId,
        name: body.name || prod?.name || 'Product',
        price: body.price !== undefined ? Number(body.price) : (prod?.price || 999),
        mrp: body.mrp !== undefined ? Number(body.mrp) : (prod?.mrp || 1499),
        thumbnail: body.thumbnail || prod?.thumbnail || '',
        variant_value: variantValue,
        selectedColor: variantValue,
        variant_id: variantId,
        quantity: qty,
        stock_quantity: availableStock,
        category_name: body.category_name || prod?.category_name || prod?.category || null,
        added_at: new Date().toISOString()
      });
    }

    saveCollection('carts');
    const { cart, summary } = enrichCartAndCalculateSummary(db.carts[userId], db);
    return sendJSON(res, {
      success: true,
      message: 'Item added to cart',
      data: cart,
      items: cart,
      count: cart.length,
      total_items: summary.total_items,
      summary
    });
  }

  // 3. Update Cart Item Quantity (PUT/PATCH /api/v1/cart/items/:itemId)
  if (pathname.startsWith('/api/v1/cart/items/') && (method === 'PUT' || method === 'PATCH')) {
    const itemId = pathname.split('/').pop();
    const newQty = Number(body.quantity !== undefined ? body.quantity : 1);
    const variantId = body.variant_id || null;
    const variantValue = body.variant_value || body.selectedColor || null;
    let targetUid = null;

    for (const uid in db.carts) {
      const idx = db.carts[uid].findIndex(i => 
        (i.id === itemId || i.product_id === itemId || i.cart_item_id === itemId) &&
        (variantId ? i.variant_id === variantId : true) &&
        (variantValue ? (i.variant_value === variantValue || i.selectedColor === variantValue) : true)
      );

      if (idx > -1) {
        targetUid = uid;
        const item = db.carts[uid][idx];
        const prodId = item.product_id || item.id;
        const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
        const availableStock = prod ? (prod.stock_quantity ?? 0) : 25;

        if (newQty > availableStock) {
          return sendJSON(res, {
            success: false,
            message: `Only ${availableStock} units available in stock.`
          }, 400);
        }

        if (newQty <= 0) {
          db.carts[uid].splice(idx, 1);
        } else {
          db.carts[uid][idx].quantity = newQty;
        }
        break;
      }
    }

    saveCollection('carts');
    const rawCart = targetUid ? (db.carts[targetUid] || []) : [];
    const { cart, summary } = enrichCartAndCalculateSummary(rawCart, db);
    return sendJSON(res, { 
      success: true, 
      message: 'Cart updated', 
      data: cart, 
      items: cart, 
      count: cart.length,
      total_items: summary.total_items,
      summary 
    });
  }

  // 4. Remove Cart Item (DELETE /api/v1/cart/items/:itemId)
  if (pathname.startsWith('/api/v1/cart/items/') && method === 'DELETE') {
    const rawParam = pathname.split('/').pop() || '';
    const itemId = decodeURIComponent(rawParam).trim();
    const variantValue = query.variant_value || query.selectedColor || body.variant_value || body.selectedColor || null;
    const reqUserId = query.userId || query.customer_id || req.headers['x-user-id'] || null;
    let targetUid = reqUserId || null;

    for (const uid in db.carts) {
      if (!Array.isArray(db.carts[uid])) continue;
      const initialLength = db.carts[uid].length;
      db.carts[uid] = db.carts[uid].filter(i => {
        const matchesId = (
          String(i.id) === String(itemId) || 
          String(i.product_id) === String(itemId) || 
          String(i.cart_item_id) === String(itemId) ||
          i.id == itemId ||
          i.product_id == itemId ||
          i.cart_item_id == itemId
        );
        if (!matchesId) return true;
        if (variantValue && variantValue !== 'default') {
          return !(i.variant_value === variantValue || i.selectedColor === variantValue);
        }
        return false;
      });
      if (db.carts[uid].length !== initialLength) {
        targetUid = uid;
      }
    }

    saveCollection('carts');
    const rawCart = targetUid ? (db.carts[targetUid] || []) : [];
    const { cart, summary } = enrichCartAndCalculateSummary(rawCart, db);
    return sendJSON(res, { 
      success: true, 
      message: 'Item removed from cart', 
      data: cart, 
      items: cart, 
      count: cart.length,
      total_items: summary.total_items,
      summary 
    });
  }

  // 5. Clear Cart (DELETE /api/v1/cart/clear/:userId or DELETE /api/v1/cart/clear or DELETE /api/v1/cart)
  if ((pathname.startsWith('/api/v1/cart/clear') || pathname === '/api/v1/cart') && method === 'DELETE') {
    let userId = pathname.startsWith('/api/v1/cart/clear/') ? pathname.split('/').pop() : null;
    if (!userId || userId === 'clear' || userId === 'cart') {
      userId = extractUserId(req, pathname, query, body);
    }
    db.carts[userId] = [];
    saveCollection('carts');
    return sendJSON(res, { 
      success: true, 
      message: 'Cart cleared', 
      data: [], 
      summary: enrichCartAndCalculateSummary([], db).summary 
    });
  }

  // 6. Merge Guest Cart (POST /api/v1/cart/merge)
  if (pathname === '/api/v1/cart/merge' && method === 'POST') {
    const userId = extractUserId(req, pathname, query, body);
    const guestItems = Array.isArray(body.items) ? body.items : [];

    if (!db.carts[userId]) db.carts[userId] = [];

    for (const item of guestItems) {
      const prodId = item.product_id || item.id;
      if (!prodId) continue;
      const qty = Number(item.quantity || 1);
      const variantId = item.variant_id || null;
      const variantValue = item.variant_value || item.selectedColor || null;

      const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
      const availableStock = prod ? (prod.stock_quantity ?? 0) : 25;

      const existingIndex = db.carts[userId].findIndex(i =>
        (i.product_id === prodId || i.id === prodId) &&
        (variantId ? i.variant_id === variantId : true) &&
        (variantValue ? (i.variant_value === variantValue || i.selectedColor === variantValue) : true)
      );

      if (existingIndex > -1) {
        const newQty = Math.min(availableStock, db.carts[userId][existingIndex].quantity + qty);
        db.carts[userId][existingIndex].quantity = newQty;
      } else {
        const cartItemId = item.cart_item_id || `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        db.carts[userId].push({
          id: prodId,
          cart_item_id: cartItemId,
          product_id: prodId,
          name: item.name || prod?.name || 'Product',
          price: item.price !== undefined ? Number(item.price) : (prod?.price || 999),
          mrp: item.mrp !== undefined ? Number(item.mrp) : (prod?.mrp || 1499),
          thumbnail: item.thumbnail || prod?.thumbnail || '',
          variant_value: variantValue,
          selectedColor: variantValue,
          variant_id: variantId,
          quantity: Math.min(availableStock, qty),
          stock_quantity: availableStock,
          category_name: item.category_name || prod?.category_name || prod?.category || null,
          added_at: new Date().toISOString()
        });
      }
    }

    saveCollection('carts');
    const { cart, summary } = enrichCartAndCalculateSummary(db.carts[userId], db);
    return sendJSON(res, {
      success: true,
      message: 'Cart merged successfully',
      data: cart,
      items: cart,
      count: cart.length,
      total_items: summary.total_items,
      summary
    });
  }

  // 7. Move Cart Item to Wishlist (POST /api/v1/cart/move-to-wishlist)
  if (pathname === '/api/v1/cart/move-to-wishlist' && method === 'POST') {
    const userId = extractUserId(req, pathname, query, body);
    const prodId = body.product_id || body.id;
    const itemId = body.itemId || body.cart_item_id || prodId;
    const variantValue = body.variant_value || body.selectedColor || null;

    if (!db.carts[userId]) db.carts[userId] = [];
    if (!db.wishlists[userId]) db.wishlists[userId] = [];

    // Remove from cart
    db.carts[userId] = db.carts[userId].filter(i => {
      const matchId = (i.id === itemId || i.product_id === itemId || i.cart_item_id === itemId || i.id === prodId || i.product_id === prodId);
      if (!matchId) return true;
      if (variantValue) return !(i.variant_value === variantValue || i.selectedColor === variantValue);
      return false;
    });

    // Add to wishlist if not already present
    const existsInWishlist = db.wishlists[userId].some(i => (i.product_id === prodId || i.id === prodId));
    if (!existsInWishlist && prodId) {
      const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
      db.wishlists[userId].push({
        id: prodId,
        product_id: prodId,
        wishlist_item_id: `wish_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: body.name || prod?.name || 'Product',
        price: body.price !== undefined ? Number(body.price) : (prod?.price || 999),
        mrp: body.mrp !== undefined ? Number(body.mrp) : (prod?.mrp || 1499),
        thumbnail: body.thumbnail || prod?.thumbnail || '',
        added_at: new Date().toISOString()
      });
    }

    saveCollection('carts');
    saveCollection('wishlists');
    const { cart, summary } = enrichCartAndCalculateSummary(db.carts[userId], db);
    return sendJSON(res, {
      success: true,
      message: 'Item moved to wishlist',
      cart,
      wishlist: db.wishlists[userId],
      summary
    });
  }

  // 8. Move Wishlist Item to Cart (POST /api/v1/wishlist/move-to-cart)
  if (pathname === '/api/v1/wishlist/move-to-cart' && method === 'POST') {
    const userId = extractUserId(req, pathname, query, body);
    const prodId = body.product_id || body.id;
    const qty = Number(body.quantity || 1);

    if (!db.carts[userId]) db.carts[userId] = [];
    if (!db.wishlists[userId]) db.wishlists[userId] = [];

    // Remove from wishlist
    db.wishlists[userId] = db.wishlists[userId].filter(i => (i.product_id !== prodId && i.id !== prodId));

    // Add to cart
    const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
    const existingIndex = db.carts[userId].findIndex(i => (i.product_id === prodId || i.id === prodId));
    if (existingIndex > -1) {
      db.carts[userId][existingIndex].quantity += qty;
    } else {
      const cartItemId = `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      db.carts[userId].push({
        id: prodId,
        cart_item_id: cartItemId,
        product_id: prodId,
        name: prod?.name || body.name || 'Product',
        price: prod?.price || Number(body.price || 999),
        mrp: prod?.mrp || Number(body.mrp || 1499),
        thumbnail: prod?.thumbnail || body.thumbnail || '',
        quantity: qty,
        stock_quantity: prod?.stock_quantity ?? 25,
        added_at: new Date().toISOString()
      });
    }

    saveCollection('carts');
    saveCollection('wishlists');
    const { cart, summary } = enrichCartAndCalculateSummary(db.carts[userId], db);
    return sendJSON(res, {
      success: true,
      message: 'Item moved to cart',
      cart,
      wishlist: db.wishlists[userId],
      summary
    });
  }

  // 9. Get Wishlist (GET /api/v1/wishlist/:userId or GET /api/v1/wishlist)
  if ((pathname === '/api/v1/wishlist' || pathname.startsWith('/api/v1/wishlist/')) && 
      !pathname.includes('/share') && 
      !pathname.includes('/shared') && 
      !pathname.includes('/clear') && 
      !pathname.includes('/move-to-cart') && 
      method === 'GET') {
    let userId = pathname.startsWith('/api/v1/wishlist/') ? pathname.split('/').pop() : null;
    if (!userId || userId === 'wishlist') {
      userId = extractUserId(req, pathname, query, body);
    }
    const rawWishlist = db.wishlists[userId] || [];
    const products = db.products || [];
    const items = rawWishlist.map(item => {
      const prodId = item.product_id || item.id;
      const prod = products.find(p => p.id === prodId || p.product_id === prodId);
      return {
        ...item,
        id: prodId,
        product_id: prodId,
        wishlist_item_id: item.wishlist_item_id || `wish_${prodId}`,
        name: item.name || prod?.name || 'Product',
        price: prod ? prod.price : (item.price || 999),
        mrp: prod ? prod.mrp : (item.mrp || 1499),
        thumbnail: item.thumbnail || prod?.thumbnail || '',
        in_stock: prod ? (prod.stock_quantity > 0) : true,
        rating: prod?.rating || 4.5
      };
    });
    return sendJSON(res, { success: true, data: items, items, count: items.length });
  }

  // 10. Add to Wishlist (POST /api/v1/wishlist/add or POST /api/v1/wishlist/:productId)
  if ((pathname === '/api/v1/wishlist/add' || pathname.startsWith('/api/v1/wishlist/')) && 
      !pathname.includes('/share') && 
      !pathname.includes('/move-to-cart') && 
      method === 'POST') {
    const userId = extractUserId(req, pathname, query, body);
    let prodId = body.product_id || body.id;
    if (!prodId && pathname.startsWith('/api/v1/wishlist/') && pathname !== '/api/v1/wishlist/add') {
      prodId = pathname.split('/').pop();
    }

    if (!prodId) {
      return sendJSON(res, { success: false, message: 'Product ID is required.' }, 400);
    }

    if (!db.wishlists[userId]) db.wishlists[userId] = [];

    const exists = db.wishlists[userId].some(i => (i.product_id === prodId || i.id === prodId));
    if (!exists) {
      const prod = db.products.find(p => p.id === prodId || p.product_id === prodId);
      db.wishlists[userId].push({
        id: prodId,
        product_id: prodId,
        wishlist_item_id: `wish_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: body.name || prod?.name || 'Product',
        price: body.price !== undefined ? Number(body.price) : (prod?.price || 999),
        mrp: body.mrp !== undefined ? Number(body.mrp) : (prod?.mrp || 1499),
        thumbnail: body.thumbnail || prod?.thumbnail || '',
        added_at: new Date().toISOString()
      });
      saveCollection('wishlists');
    }

    return sendJSON(res, { success: true, message: 'Added to wishlist', data: db.wishlists[userId] });
  }

  // 11. Remove from Wishlist (DELETE /api/v1/wishlist/:userId/:productId or DELETE /api/v1/wishlist/:productId or DELETE /api/v1/wishlist/items/:itemId)
  if (pathname.startsWith('/api/v1/wishlist/') && !pathname.includes('/clear') && method === 'DELETE') {
    const parts = pathname.split('/').filter(Boolean);
    let userId = null;
    let prodId = null;

    if (parts.length >= 5 && parts[3] !== 'items') {
      userId = parts[3];
      prodId = parts[4];
    } else {
      prodId = parts[parts.length - 1];
      userId = extractUserId(req, pathname, query, body);
    }

    let foundAndRemoved = false;
    if (db.wishlists[userId]) {
      const prevLen = db.wishlists[userId].length;
      db.wishlists[userId] = db.wishlists[userId].filter(i => 
        i.product_id !== prodId && i.id !== prodId && i.wishlist_item_id !== prodId
      );
      if (db.wishlists[userId].length !== prevLen) foundAndRemoved = true;
    }

    if (!foundAndRemoved) {
      for (const uid in db.wishlists) {
        db.wishlists[uid] = db.wishlists[uid].filter(i => 
          i.product_id !== prodId && i.id !== prodId && i.wishlist_item_id !== prodId
        );
      }
    }

    saveCollection('wishlists');
    return sendJSON(res, { 
      success: true, 
      message: 'Item removed from wishlist', 
      data: db.wishlists[userId] || [] 
    });
  }

  // 12. Clear Wishlist (DELETE /api/v1/wishlist/clear/:userId or DELETE /api/v1/wishlist/clear)
  if (pathname.startsWith('/api/v1/wishlist/clear') && method === 'DELETE') {
    let userId = pathname.startsWith('/api/v1/wishlist/clear/') ? pathname.split('/').pop() : null;
    if (!userId || userId === 'clear') {
      userId = extractUserId(req, pathname, query, body);
    }
    db.wishlists[userId] = [];
    saveCollection('wishlists');
    return sendJSON(res, { success: true, message: 'Wishlist cleared', data: [] });
  }

  // 13. Share Wishlist (POST /api/v1/wishlist/share)
  if (pathname === '/api/v1/wishlist/share' && method === 'POST') {
    const userId = extractUserId(req, pathname, query, body);
    const items = Array.isArray(body.items) && body.items.length > 0 
      ? body.items 
      : (db.wishlists[userId] || []);

    const shareId = `share-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    if (!db.shared_wishlists) db.shared_wishlists = {};

    db.shared_wishlists[shareId] = {
      id: shareId,
      token: shareId,
      userId,
      items,
      created_at: new Date().toISOString()
    };
    saveCollection('shared_wishlists');

    return sendJSON(res, {
      success: true,
      shareId,
      token: shareId,
      url: `/shared-wishlist/${shareId}`,
      shareUrl: `/shared-wishlist/${shareId}`,
      message: 'Shareable wishlist link created'
    });
  }

  // 14. Get Shared Wishlist (GET /api/v1/wishlist/share/:token or /shared/:token)
  if ((pathname.startsWith('/api/v1/wishlist/share/') || pathname.startsWith('/api/v1/wishlist/shared/')) && method === 'GET') {
    const token = pathname.split('/').pop();
    if (!db.shared_wishlists) db.shared_wishlists = {};

    const shared = db.shared_wishlists[token] || Object.values(db.shared_wishlists).find(w => w.token === token || w.id === token);
    if (!shared) {
      return sendJSON(res, {
        success: false,
        message: 'Shared wishlist not found or has expired.'
      }, 404);
    }

    const products = db.products || [];
    const items = (shared.items || []).map(item => {
      const prodId = item.product_id || item.id;
      const prod = products.find(p => p.id === prodId || p.product_id === prodId);
      return {
        ...item,
        id: prodId,
        product_id: prodId,
        name: item.name || prod?.name || 'Product',
        price: prod ? prod.price : (item.price || 999),
        mrp: prod ? prod.mrp : (item.mrp || 1499),
        thumbnail: item.thumbnail || prod?.thumbnail || '',
        in_stock: prod ? (prod.stock_quantity > 0) : true,
        rating: prod?.rating || 4.5
      };
    });

    return sendJSON(res, {
      success: true,
      data: items,
      items,
      count: items.length,
      token,
      created_at: shared.created_at
    });
  }

  return false;
}
