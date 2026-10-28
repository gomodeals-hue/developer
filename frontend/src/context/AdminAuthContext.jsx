import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '../services/authService';

const AdminAuthContext = createContext();

export const ADMIN_STORAGE_TOKEN = 'admin_token';
export const ADMIN_STORAGE_USER = 'gomo_admin_session';

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const raw = localStorage.getItem(ADMIN_STORAGE_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_TOKEN) || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAdmin = () => {
      try {
        const token = localStorage.getItem(ADMIN_STORAGE_TOKEN);
        const rawUser = localStorage.getItem(ADMIN_STORAGE_USER);
        if (token && rawUser) {
          const parsed = JSON.parse(rawUser);
          if (parsed && (parsed.role === 'admin' || parsed.role === 'super_admin')) {
            setAdminUser(parsed);
            setAdminToken(token);
          } else {
            setAdminUser(null);
            setAdminToken(null);
          }
        } else {
          setAdminUser(null);
          setAdminToken(null);
        }
      } catch (err) {
        console.error("Failed to restore admin session:", err);
        setAdminUser(null);
        setAdminToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAdmin();
  }, []);

  const loginAdmin = (userData, token) => {
    const sanitized = {
      ...userData,
      name: userData.name || userData.full_name || 'Admin',
      role: (userData.role || userData.type || 'admin').toLowerCase()
    };
    const t = token || `admin-token-${Date.now()}`;
    localStorage.setItem(ADMIN_STORAGE_TOKEN, t);
    localStorage.setItem(ADMIN_STORAGE_USER, JSON.stringify(sanitized));
    setAdminToken(t);
    setAdminUser(sanitized);
  };

  const logoutAdmin = async () => {
    try {
      if (typeof authService.adminLogout === 'function') {
        await authService.adminLogout();
      }
    } catch (err) {
      console.warn("Admin logout error:", err);
    } finally {
      localStorage.removeItem(ADMIN_STORAGE_TOKEN);
      localStorage.removeItem(ADMIN_STORAGE_USER);
      setAdminToken(null);
      setAdminUser(null);
    }
  };

  const isAdminAuthenticated = Boolean(
    adminToken && adminUser && (adminUser.role === 'admin' || adminUser.role === 'super_admin')
  );

  const updateAdminUser = (newData) => {
    setAdminUser(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem(ADMIN_STORAGE_USER, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        user: adminUser,
        currentUser: adminUser,
        adminToken,
        isAdminAuthenticated,
        loading,
        loginAdmin,
        logoutAdmin,
        setAdminUser,
        updateAdminUser
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
