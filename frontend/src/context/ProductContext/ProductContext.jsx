import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import * as productService from "../../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await productService.getProducts({ limit: 1000, ...params });
      if (res.success && Array.isArray(res.data)) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error("fetchProducts error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial catalog load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Real-time synchronization for new products listed, stock updates, and removals
  useEffect(() => {
    import('../../services/realtimeService').then(({ realtimeService }) => {
      const unsubNew = realtimeService.on('new_product', (data) => {
        if (data?.product) {
          setProducts(prev => {
            const exists = prev.some(p => (p.product_id || p.id) === (data.product.product_id || data.product.id));
            if (exists) return prev;
            return [data.product, ...prev];
          });
        }
      });

      const unsubStock = realtimeService.on('stock_update', (data) => {
        if (data?.productId) {
          setProducts(prev => prev.map(p => {
            if ((p.product_id || p.id) === data.productId) {
              return {
                ...p,
                stock_quantity: data.stock_quantity ?? p.stock_quantity,
                in_stock: data.in_stock ?? p.in_stock,
                price: data.price ?? p.price
              };
            }
            return p;
          }));
        }
      });

      const unsubDel = realtimeService.on('product_deleted', (data) => {
        if (data?.productId) {
          setProducts(prev => prev.filter(p => (p.product_id || p.id) !== data.productId));
        }
      });

      return () => {
        unsubNew();
        unsubStock();
        unsubDel();
      };
    });
  }, []);

  const addProduct = async (payload) => {
    const res = await productService.addProduct(payload);
    if (res.success) {
      if (res.data || res.product) {
        const newP = res.data || res.product;
        setProducts(prev => [newP, ...prev.filter(p => (p.product_id || p.id) !== (newP.product_id || newP.id))]);
      }
      await fetchProducts();
    }
    return res;
  };

  const updateProduct = async (id, data) => {
    const res = await productService.updateProduct(id, data);
    if (res.success) {
      await fetchProducts();
    }
    return res;
  };

  const deleteProduct = async (id) => {
    const res = await productService.deleteProduct(id);
    if (res.success) {
      setProducts(prev => prev.filter(p => (p.product_id || p.id) !== id));
      await fetchProducts();
    }
    return res;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
