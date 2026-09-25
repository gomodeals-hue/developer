import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';

const INVENTORY_OVERRIDES_KEY = 'gomo_admin_products_override';
const INVENTORY_HISTORY_KEY = 'gomo_inventory_history';

// Helper to load overrides from localStorage
function getProductOverrides() {
  try {
    const raw = localStorage.getItem(INVENTORY_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Helper to save overrides to localStorage
function saveProductOverrides(overrides) {
  try {
    localStorage.setItem(INVENTORY_OVERRIDES_KEY, JSON.stringify(overrides));
  } catch (err) {
    console.error('Failed to save inventory overrides:', err);
  }
}

// Helper to load inventory history log
function loadInventoryHistory() {
  try {
    const raw = localStorage.getItem(INVENTORY_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [
      {
        id: 'hist_1',
        product_id: 'el_1',
        product_name: 'Sony WH-1000XM5 Wireless Headphones',
        sku: 'GMC-el_1',
        change_type: 'Restock',
        previous_stock: 15,
        new_stock: 25,
        delta: 10,
        reason: 'Monthly inventory replenishment from distributor',
        performed_by: 'Administrator',
        timestamp: '2026-03-01T10:00:00Z'
      },
      {
        id: 'hist_2',
        product_id: 'el_2',
        product_name: 'Apple MacBook Air M2',
        sku: 'GMC-el_2',
        change_type: 'Fulfillment',
        previous_stock: 12,
        new_stock: 10,
        delta: -2,
        reason: 'Order ORD-847291 fulfillment deduction',
        performed_by: 'System Automation',
        timestamp: '2026-03-05T11:30:00Z'
      }
    ];
  } catch {
    return [];
  }
}

function saveInventoryHistory(history) {
  try {
    localStorage.setItem(INVENTORY_HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save inventory history:', err);
  }
}

export const inventoryService = {
  /**
   * Get current stock for a specific product and optional variant
   */
  getProductStock(productId, variantId = null) {
    const overrides = getProductOverrides();
    const ov = overrides[productId] || {};
    const baseProduct = SAMPLE_PRODUCTS.find(p => (p.product_id || p.id) === productId);

    if (!baseProduct && !ov.name) return { inStock: false, stock: 0, lowStock: false };

    // Variant stock check
    if (variantId) {
      const variants = ov.variants || baseProduct?.variants || [];
      const v = variants.find(item => (item.variant_id || item.tempId || item.id) === variantId);
      if (v) {
        const vStock = v.stock_quantity !== undefined ? Number(v.stock_quantity) : Number(v.stock || 0);
        return {
          productId,
          variantId,
          stock: vStock,
          inStock: vStock > 0,
          lowStock: vStock > 0 && vStock <= (ov.low_stock_threshold || 5)
        };
      }
    }

    const currentStock = ov.stock_quantity !== undefined 
      ? Number(ov.stock_quantity) 
      : (baseProduct?.stock_quantity !== undefined ? Number(baseProduct.stock_quantity) : 25);

    const threshold = ov.low_stock_threshold || 5;

    return {
      productId,
      stock: currentStock,
      inStock: currentStock > 0,
      lowStock: currentStock > 0 && currentStock <= threshold,
      threshold
    };
  },

  /**
   * Check real-time stock availability for a list of items
   */
  async checkStock(items = []) {
    if (!API_CONFIG.USE_MOCK) {
      try {
        const res = await apiClient.post(API_CONFIG.ENDPOINTS.INVENTORY.CHECK, { items });
        if (res.data?.success) return res.data;
      } catch (err) {
        console.warn('API checkStock failed, using catalog stock:', err.message);
      }
    }

    const results = items.map(item => {
      const productId = item.product_id || item.id;
      const variantId = item.variant_id;
      const stockInfo = this.getProductStock(productId, variantId);
      const requested = Number(item.quantity || 1);

      return {
        product_id: productId,
        variant_id: variantId,
        name: item.name,
        available: stockInfo.stock >= requested,
        currentStock: stockInfo.stock,
        requestedQuantity: requested,
        lowStock: stockInfo.lowStock
      };
    });

    const allInStock = results.every(r => r.available);

    return {
      success: true,
      allAvailable: allInStock,
      items: results
    };
  },

  /**
   * Get complete inventory catalog for administration
   */
  async getInventoryCatalog() {
    const overrides = getProductOverrides();

    const catalog = SAMPLE_PRODUCTS.map(baseProduct => {
      const pid = baseProduct.product_id || baseProduct.id;
      const ov = overrides[pid] || {};
      const stock = ov.stock_quantity !== undefined ? Number(ov.stock_quantity) : (baseProduct.stock_quantity ?? 25);
      const threshold = ov.low_stock_threshold || 5;
      const isActive = ov.is_active !== undefined ? ov.is_active : (baseProduct.is_active ?? true);

      // Map variants with their respective stocks
      const variants = (ov.variants || baseProduct.variants || []).map(v => ({
        ...v,
        stock_quantity: v.stock_quantity !== undefined ? Number(v.stock_quantity) : Number(v.stock || 10)
      }));

      return {
        product_id: pid,
        id: pid,
        name: baseProduct.name,
        sku: baseProduct.sku || `GMC-${pid}`,
        category: baseProduct.category_name || baseProduct.category || 'General',
        price: ov.price !== undefined ? Number(ov.price) : Number(baseProduct.price),
        stock_quantity: stock,
        low_stock_threshold: threshold,
        is_active: isActive,
        status: !isActive ? 'Inactive' : stock <= 0 ? 'Out of Stock' : stock <= threshold ? 'Low Stock' : 'In Stock',
        thumbnail: baseProduct.thumbnail || baseProduct.images?.[0] || '',
        variants,
        updated_at: ov.updated_at || new Date().toISOString()
      };
    });

    const totalSKUs = catalog.length;
    const inStockCount = catalog.filter(p => p.stock_quantity > p.low_stock_threshold).length;
    const lowStockCount = catalog.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length;
    const outOfStockCount = catalog.filter(p => p.stock_quantity <= 0).length;
    const totalValuation = catalog.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0);

    return {
      success: true,
      data: {
        summary: {
          totalSKUs,
          inStockCount,
          lowStockCount,
          outOfStockCount,
          totalValuation
        },
        items: catalog
      }
    };
  },

  /**
   * Adjust stock for a product or variant and record an audit log entry
   */
  async adjustStock({ productId, variantId = null, delta = 0, newStock = null, reason = 'Manual Adjustment', performedBy = 'Administrator' }) {
    const overrides = getProductOverrides();
    const currentProduct = SAMPLE_PRODUCTS.find(p => (p.product_id || p.id) === productId);
    const existingOv = overrides[productId] || {};
    
    let previousStock = existingOv.stock_quantity !== undefined 
      ? Number(existingOv.stock_quantity) 
      : (currentProduct?.stock_quantity ?? 25);

    let updatedStock = newStock !== null ? Number(newStock) : previousStock + Number(delta);
    if (updatedStock < 0) updatedStock = 0;

    let updatedVariants = existingOv.variants || currentProduct?.variants || [];
    if (variantId) {
      updatedVariants = updatedVariants.map(v => {
        if ((v.variant_id || v.tempId || v.id) === variantId) {
          const prevVStock = v.stock_quantity !== undefined ? Number(v.stock_quantity) : Number(v.stock || 0);
          const nextVStock = newStock !== null ? Number(newStock) : prevVStock + Number(delta);
          return { ...v, stock_quantity: Math.max(0, nextVStock), stock: Math.max(0, nextVStock) };
        }
        return v;
      });
      // Sum up variant stock to parent if apparel/variants
      updatedStock = updatedVariants.reduce((sum, v) => sum + (v.stock_quantity || 0), 0);
    }

    overrides[productId] = {
      ...existingOv,
      stock_quantity: updatedStock,
      variants: updatedVariants,
      updated_at: new Date().toISOString()
    };

    saveProductOverrides(overrides);

    // Record audit history
    const history = loadInventoryHistory();
    const logEntry = {
      id: `hist_${Date.now()}`,
      product_id: productId,
      product_name: currentProduct?.name || existingOv.name || 'Store Product',
      sku: currentProduct?.sku || `GMC-${productId}`,
      change_type: delta > 0 ? 'Restock' : delta < 0 ? 'Adjustment' : 'Audit',
      previous_stock: previousStock,
      new_stock: updatedStock,
      delta: updatedStock - previousStock,
      reason,
      performed_by: performedBy,
      timestamp: new Date().toISOString()
    };

    history.unshift(logEntry);
    saveInventoryHistory(history);

    return {
      success: true,
      data: {
        productId,
        newStock: updatedStock,
        log: logEntry
      }
    };
  },

  /**
   * Deduct inventory automatically on order placement
   */
  async deductOrderStock(items = [], orderNumber = 'N/A') {
    for (const item of items) {
      const pid = item.product_id || item.id;
      const qty = Number(item.quantity || 1);
      await this.adjustStock({
        productId: pid,
        variantId: item.variant_id || null,
        delta: -qty,
        reason: `Order #${orderNumber} purchase deduction`,
        performedBy: 'System Automation'
      });
    }
  },

  /**
   * Return inventory upon order cancellation
   */
  async returnOrderStock(items = [], orderNumber = 'N/A') {
    for (const item of items) {
      const pid = item.product_id || item.id;
      const qty = Number(item.quantity || 1);
      await this.adjustStock({
        productId: pid,
        variantId: item.variant_id || null,
        delta: qty,
        reason: `Order #${orderNumber} cancellation restock`,
        performedBy: 'System Automation'
      });
    }
  },

  /**
   * Fetch inventory audit log history
   */
  async getInventoryHistory() {
    const history = loadInventoryHistory();
    return {
      success: true,
      data: history
    };
  }
};

export default inventoryService;
