import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper to normalize user data attributes consistently across views
    const normalizeUserData = (userData) => {
        if (!userData) return null;
        return {
            ...userData,
            id: userData.id || userData.customer_id || '',
            customer_id: userData.customer_id || userData.id || '',
            full_name: userData.full_name || userData.name || '',
            name: userData.name || userData.full_name || '',
            email: userData.email || '',
            role: (userData.role || 'customer').toLowerCase(),
            membership: userData.membership || 'free'
        };
    };

    const saveSanitizedUser = (userData) => {
        if (!userData) {
            localStorage.removeItem('user');
            return;
        }
        const sanitized = {
            id: userData.id || userData.customer_id,
            customer_id: userData.customer_id || userData.id,
            full_name: userData.full_name || userData.name || '',
            profile_picture_url: userData.profile_picture_url || '',
            membership: userData.membership || 'free',
            role: (userData.role || 'customer').toLowerCase()
        };
        localStorage.setItem('user', JSON.stringify(sanitized));
    };

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await authService.getMe();
                if (response.success && response.data) {
                    const normalized = normalizeUserData(response.data);
                    setUser(normalized);
                    saveSanitizedUser(normalized);
                } else {
                    setUser(null);
                    saveSanitizedUser(null);
                }
            } catch (err) {
                setUser(null);
                saveSanitizedUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = (userData) => {
        const normalized = normalizeUserData(userData);
        setUser(normalized);
        saveSanitizedUser(normalized);
    };

    const register = async (registerData) => {
        const res = await authService.register(registerData);
        if (res.success && res.data) {
            const normalized = normalizeUserData(res.data);
            setUser(normalized);
            saveSanitizedUser(normalized);
        }
        return res;
    };

    const logout = async () => {
        try {
            await authService.customerLogout();
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            if (user?.id) {
                localStorage.removeItem(`gomo_chat_history_${user.id}`);
            }
            localStorage.removeItem('gomo_chat_history_guest');
            localStorage.removeItem('gomo_chat_history');
            localStorage.removeItem('gomo_show_membership_welcome');
            
            setUser(null);
            saveSanitizedUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('gomo_active_session');
            localStorage.removeItem('auth');
        }
    };

    const updateUser = (userData) => {
        const newUser = normalizeUserData({ ...user, ...userData });
        setUser(newUser);
        saveSanitizedUser(newUser);
    };

    const refreshUser = async () => {
        try {
            const response = await authService.getMe();
            if (response.success && response.data) {
                const normalized = normalizeUserData(response.data);
                setUser(normalized);
                saveSanitizedUser(normalized);
            }
        } catch (err) {
            console.error("Failed to refresh user session:", err);
        }
    };

    const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
    const isCustomer = !!user && !isAdmin;

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            updateUser,
            refreshUser,
            isAuthenticated: !!user,
            isAdmin,
            isCustomer
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export default AuthContext;
