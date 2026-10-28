import { getDB } from '../database/db.js';

export function handleCouponsDeliveryRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. Coupons List
  if (pathname === '/api/v1/coupons' && method === 'GET') {
    return sendJSON(res, {
      success: true,
      data: db.coupons
    });
  }

  // 2. Validate Coupon
  if (pathname === '/api/v1/coupons/validate' && method === 'POST') {
    const rawCode = (body.code || '').trim().toUpperCase();
    const subtotal = Number(body.subtotal || body.amount || 0);

    const coupon = db.coupons.find(c => c.code === rawCode && c.is_active !== false);
    if (!coupon) {
      return sendJSON(res, {
        success: false,
        message: 'Invalid or expired coupon code. Try GOMO50 or FIRSTBUY'
      }, 400);
    }

    if (coupon.min_spend && subtotal > 0 && subtotal < coupon.min_spend) {
      return sendJSON(res, {
        success: false,
        message: `Coupon requires minimum order of ₹${coupon.min_spend}`
      }, 400);
    }

    let discount = 0;
    if (coupon.discount) {
      discount = coupon.discount;
    } else if (coupon.discount_percent) {
      const calc = Math.round((subtotal * coupon.discount_percent) / 100);
      discount = coupon.max_discount ? Math.min(calc, coupon.max_discount) : calc;
    }

    return sendJSON(res, {
      success: true,
      valid: true,
      code: coupon.code,
      discount: discount || 50,
      free_shipping: coupon.free_shipping || false,
      message: `${coupon.code} applied! ₹${discount || 50} discount deducted.`
    });
  }

  // 3. Indian PIN Code Delivery Estimation
  if (pathname === '/api/v1/delivery/check' && method === 'GET') {
    const pincode = String(query.pincode || '').trim();

    if (!pincode || !/^[1-9][0-9]{5}$/.test(pincode)) {
      return sendJSON(res, {
        success: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      }, 400);
    }

    const firstDigit = pincode.charAt(0);
    const transitDays = ['5', '6'].includes(firstDigit) ? 1 : (['1', '2', '4'].includes(firstDigit) ? 2 : 3);
    const deliveryDate = new Date(Date.now() + transitDays * 86400000);

    const courier = (transitDays <= 2) ? 'BlueDart Express' : 'Delhivery Premium';

    return sendJSON(res, {
      success: true,
      serviceable: true,
      pincode,
      delivery_days: transitDays,
      estimated_delivery: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      courier,
      cod_available: true,
      express_available: transitDays <= 2,
      shipping_charge: 0,
      free_shipping_threshold: 499,
      note: `Guaranteed delivery by ${deliveryDate.toLocaleDateString('en-IN', { weekday: 'long' })} via ${courier}`
    });
  }

  // 4. Batch Inventory Stock Check
  if (pathname === '/api/v1/inventory/check' && (method === 'POST' || method === 'GET')) {
    const items = body.items || [];
    const unavailable = [];

    for (const it of items) {
      const prod = db.products.find(p => p.id === (it.product_id || it.id));
      if (!prod || prod.stock_quantity < Number(it.quantity || 1)) {
        unavailable.push({
          id: it.product_id || it.id,
          name: prod?.name || 'Item',
          available: prod?.stock_quantity || 0,
          requested: it.quantity
        });
      }
    }

    return sendJSON(res, {
      success: unavailable.length === 0,
      all_available: unavailable.length === 0,
      unavailable_items: unavailable
    });
  }

  return false;
}
