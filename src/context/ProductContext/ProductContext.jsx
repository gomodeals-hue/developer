import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import * as productService from "../../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await productService.getProducts(params);
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

  const addProduct = async (payload) => {
    const res = await productService.addProduct(payload);
    if (res.success) {
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
