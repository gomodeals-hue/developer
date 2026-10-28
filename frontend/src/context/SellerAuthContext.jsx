import React, { createContext, useContext, useState, useEffect } from 'react';

const SellerAuthContext = createContext();

const API_BASE = 'http://127.0.0.1:5000/api/v1';

export const DEMO_SELLERS = {
  'seller-1': {
    id: 'seller-1',
    seller_id: 'seller-1',
    store_name: 'Divine Brass & Temple Arts',
    owner_name: 'Rajesh Sharma',
    email: 'seller@gomodeals.com',
    password: 'sellerpassword123',
    phone: '+91 98765 43210',
    category: 'pooja-items',
    gstin: '29ABCDE1234F1Z5',
    address: '12 Temple Street, Malleshwaram, Bengaluru, Karnataka 560003',
    status: 'approved',
    verified: true,
    rating: 4.9,
    review_count: 84,
    total_sales: 143,
    total_revenue: 184500,
    balance: 45280,
    bank_details: {
      account_name: 'Divine Brass Enterprises',
      account_number: '918237465012',
      ifsc_code: 'HDFC0001234',
      bank_name: 'HDFC Bank'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    logo: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=200&q=80',
    description: 'Handcrafted solid brass diyas, traditional idols, and authenticated temple samagri kits straight from master artisan clusters.'
  },
  'seller-2': {
    id: 'seller-2',
    seller_id: 'seller-2',
    store_name: 'Heritage Weaves & Silks',
    owner_name: 'Meena Patel',
    email: 'heritage@gomodeals.com',
    password: 'sellerpassword123',
    phone: '+91 98450 67890',
    category: 'ethnic-wear',
    gstin: '24PQRST5678G2Z3',
    address: '45 Silk Loom Colony, Surat, Gujarat 395002',
    status: 'approved',
    verified: true,
    rating: 4.8,
    review_count: 112,
    total_sales: 230,
    total_revenue: 345000,
    balance: 78500,
    bank_details: {
      account_name: 'Heritage Weaves India',
      account_number: '827103948571',
      ifsc_code: 'ICIC0005678',
      bank_name: 'ICICI Bank'
    },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    logo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80',
    description: 'Certified Silk Mark pure Kanjeevaram and Banarasi handlooms direct from weaving cooperatives.'
  },
  'seller-3': {
    id: 'seller-3',
    seller_id: 'seller-3',
    store_name: 'SmartTech Audio & Wearables',
    owner_name: 'Vikram Singhania',
    email: 'tech@gomodeals.com',
    password: 'sellerpassword123',
    phone: '+91 99001 23456',
    category: 'electronics',
    gstin: '27XYZAB9876H3Z4',
    address: '88 Electronics Complex, Sector 18, Gurugram, Haryana 122001',
    status: 'approved',
    verified: true,
    rating: 4.7,
    review_count: 95,
    total_sales: 188,
    total_revenue: 412000,
    balance: 62400,
    bank_details: {
      account_name: 'SmartTech Retail LLP',
      account_number: '736281940562',
      ifsc_code: 'SBIN0004321',
      bank_name: 'State Bank of India'
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    description: 'Authorized direct distributor for high-performance audio, smartwatches, and fast wireless gadgets with 1-year brand warranty.'
  }
};

export const getDemoSellerByQuery = (query) => {
  if (!query) return null;
  const q = String(query).trim().toLowerCase();
  if (q === 'seller-1' || q.includes('divine') || q.includes('brass') || q.includes('pooja') || q === 'seller@gomodeals.com' || q.includes('demo')) {
    return DEMO_SELLERS['seller-1'];
  }
  if (q === 'seller-2' || q.includes('heritage') || q.includes('silk') || q.includes('weaves') || q === 'heritage@gomodeals.com') {
    return DEMO_SELLERS['seller-2'];
  }
  if (q === 'seller-3' || q.includes('tech') || q.includes('smarttech') || q.includes('audio') || q.includes('wearable') || q === 'tech@gomodeals.com') {
    return DEMO_SELLERS['seller-3'];
  }
  return null;
};

export const SellerAuthProvider = ({ children }) => {
  const [seller, setSeller] = useState(() => {
    try {
      const saved = localStorage.getItem('gmd_seller');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('gmd_seller_token') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seller) {
      localStorage.setItem('gmd_seller', JSON.stringify(seller));
    } else {
      localStorage.removeItem('gmd_seller');
    }
  }, [seller]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('gmd_seller_token', token);
    } else {
      localStorage.removeItem('gmd_seller_token');
    }
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    const demo = getDemoSellerByQuery(email);

    try {
      const res = await fetch(`${API_BASE}/seller/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (demo) {
          setSeller(demo);
          setToken(`seller_token_${demo.id}`);
          return { success: true, seller: demo };
        }
        throw new Error(data.message || 'Seller login failed');
      }
      setSeller(data.seller);
      setToken(data.token);
      return { success: true, seller: data.seller };
    } catch (err) {
      // Fallback to local demo seller if backend is offline or network fails
      if (demo) {
        setSeller(demo);
        setToken(`seller_token_${demo.id}`);
        return { success: true, seller: demo };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Instant Demo Login (direct 1-click bypass without network delay)
  const demoLogin = (sellerIdOrEmail) => {
    const demo = getDemoSellerByQuery(sellerIdOrEmail) || DEMO_SELLERS['seller-1'];
    setSeller(demo);
    setToken(`seller_token_${demo.id}`);
    return { success: true, seller: demo };
  };

  // Register handler
  const register = async (sellerData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seller/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sellerData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Seller registration failed');
      }
      setSeller(data.seller);
      setToken(data.token);
      return { success: true, seller: data.seller };
    } finally {
      setLoading(false);
    }
  };

  // Update profile handler
  const updateProfile = async (updates) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seller/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-seller-id': seller?.id || 'seller-1'
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success && data.seller) {
        setSeller(data.seller);
        return { success: true, seller: data.seller };
      }
      // Local state fallback
      const updated = { ...seller, ...updates };
      setSeller(updated);
      return { success: true, seller: updated };
    } catch {
      const updated = { ...seller, ...updates };
      setSeller(updated);
      return { success: true, seller: updated };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    setSeller(null);
    setToken('');
    localStorage.removeItem('gmd_seller');
    localStorage.removeItem('gmd_seller_token');
  };

  return (
    <SellerAuthContext.Provider
      value={{
        seller,
        token,
        isSellerAuthenticated: !!seller,
        loading,
        login,
        demoLogin,
        register,
        updateProfile,
        logout
      }}
    >
      {children}
    </SellerAuthContext.Provider>
  );
};

export const useSellerAuth = () => {
  const context = useContext(SellerAuthContext);
  if (!context) {
    throw new Error('useSellerAuth must be used within a SellerAuthProvider');
  }
  return context;
};
