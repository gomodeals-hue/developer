import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { 
    User, Mail, Phone, Calendar, Shield, MapPin, ShoppingBag, Heart, 
    LogOut, Edit2, Plus, ChevronRight, Truck, ArrowLeft, Tag, Clock, 
    Crown, Bell, Star, KeyRound, Check, Trash2, CheckCircle2, AlertCircle, Eye, EyeOff, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { orderService } from '../../services/orderService';
import { addressService } from '../../services/addressService';
import { userService } from '../../services/userService';
import { notificationService } from '../../services/notificationService';
import * as authService from '../../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout, updateUser } = useAuth();
    const { cart, wishlist, formatPrice, addToCart, removeFromWishlist } = useShop();
    const navigate = useNavigate();
    // Active tab state driven by URL query parameter (?tab=...)
    const queryTab = new URLSearchParams(location.search).get('tab') || 'overview';
    const [activeTab, setActiveTab] = useState(queryTab);

    useEffect(() => {
        const tab = new URLSearchParams(location.search).get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);

    const handleSelectTab = (tabId) => {
        setActiveTab(tabId);
        navigate(`/profile?tab=${tabId}`, { replace: true });
    };

    // Data States
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit Profile Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        full_name: '',
        phone: '',
        date_of_birth: '',
        gender: ''
    });
    const [editError, setEditError] = useState('');
    const [editSuccess, setEditSuccess] = useState('');

    // Address Modal State (Add / Edit)
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressForm, setAddressForm] = useState({
        full_name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India',
        is_default: false
    });

    // Change Password State
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPass, setShowPass] = useState(false);
    const [passError, setPassError] = useState('');
    const [passSuccess, setPassSuccess] = useState('');
    const [passLoading, setPassLoading] = useState(false);

    // Notification Preferences
    const [notifPrefs, setNotifPrefs] = useState({
        notif_orderStatus: localStorage.getItem('notif_orderStatus') !== 'false',
        notif_returns: localStorage.getItem('notif_returns') !== 'false',
        notif_promotions: localStorage.getItem('notif_promotions') !== 'false',
    });

    const handleTogglePref = (key) => {
        const newVal = !notifPrefs[key];
        setNotifPrefs(prev => ({ ...prev, [key]: newVal }));
        localStorage.setItem(key, String(newVal));
    };

    useEffect(() => {
        if (user) {
            setEditForm({
                full_name: user.full_name || user.name || '',
                phone: user.phone || '',
                date_of_birth: user.date_of_birth ? user.date_of_birth.split('T')[0] : '',
                gender: user.gender || ''
            });
        }
    }, [user]);

    // Fetch All Account Data
    const loadAccountData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userId = user.customer_id || user.id;
            
            // 1. Addresses
            const addrRes = await addressService.getAddresses(userId);
            if (addrRes.success) setAddresses(addrRes.data || []);

            // 2. Orders
            const ordRes = await orderService.getMyOrders(userId);
            if (ordRes.success) setOrders(ordRes.data || []);

            // 3. Reviews
            const revRes = await userService.getCustomerReviews(userId, user.full_name || user.name);
            if (revRes.success) setReviews(revRes.data || []);

            // 4. Notifications
            const notifRes = await notificationService.getCustomerNotifications(userId);
            if (notifRes.success) setNotifications(notifRes.data || []);
        } catch (err) {
            console.error("Failed to load customer account data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAccountData();
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    // Edit Profile Submission
    const handleEditProfileSubmit = async (e) => {
        e.preventDefault();
        setEditError('');
        setEditSuccess('');
        try {
            const res = await userService.updateProfile(editForm);
            if (res.success) {
                updateUser(res.data);
                setEditSuccess('Profile details saved successfully!');
                setTimeout(() => {
                    setIsEditModalOpen(false);
                    setEditSuccess('');
                }, 1200);
            }
        } catch (err) {
            setEditError(err.message || 'Failed to update profile.');
        }
    };

    // Address Actions
    const openAddAddressModal = () => {
        setEditingAddressId(null);
        setAddressForm({
            full_name: user?.full_name || user?.name || '',
            phone: user?.phone || '',
            street: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'India',
            is_default: addresses.length === 0
        });
        setIsAddressModalOpen(true);
    };

    const openEditAddressModal = (addr) => {
        setEditingAddressId(addr.id);
        setAddressForm({
            full_name: addr.full_name || '',
            phone: addr.phone || '',
            street: addr.street || addr.address_line_1 || '',
            city: addr.city || '',
            state: addr.state || '',
            postal_code: addr.postal_code || addr.pincode || '',
            country: addr.country || 'India',
            is_default: !!addr.is_default
        });
        setIsAddressModalOpen(true);
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        const userId = user.customer_id || user.id;
        try {
            if (editingAddressId) {
                await addressService.updateAddress(editingAddressId, addressForm);
            } else {
                await addressService.addAddress(userId, addressForm);
            }
            setIsAddressModalOpen(false);
            const updated = await addressService.getAddresses(userId);
            if (updated.success) setAddresses(updated.data || []);
        } catch (err) {
            console.error("Address save failed:", err);
        }
    };

    const handleDeleteAddress = async (addrId) => {
        if (window.confirm("Are you sure you want to remove this delivery address?")) {
            await addressService.deleteAddress(addrId);
            const userId = user.customer_id || user.id;
            const updated = await addressService.getAddresses(userId);
            if (updated.success) setAddresses(updated.data || []);
        }
    };

    const handleSetDefaultAddress = async (addrId) => {
        await addressService.setDefaultAddress(addrId);
        const userId = user.customer_id || user.id;
        const updated = await addressService.getAddresses(userId);
        if (updated.success) setAddresses(updated.data || []);
    };

    // Change Password Submission
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPassError('');
        setPassSuccess('');

        if (passwordForm.newPassword.length < 8) {
            setPassError('New password must contain at least 8 characters.');
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPassError('New passwords do not match.');
            return;
        }

        setPassLoading(true);
        try {
            const userId = user.customer_id || user.id;
            const res = await authService.changePassword(userId, passwordForm.currentPassword, passwordForm.newPassword);
            if (res.success) {
                setPassSuccess('Password updated successfully!');
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (err) {
            setPassError(err.response?.data?.message || err.message || 'Failed to update password.');
        } finally {
            setPassLoading(false);
        }
    };

    // Notifications Actions
    const handleMarkNotification = async (id) => {
        await notificationService.markNotificationAsRead(id);
        const userId = user.customer_id || user.id;
        const res = await notificationService.getCustomerNotifications(userId);
        if (res.success) setNotifications(res.data);
    };

    const handleMarkAllNotifications = async () => {
        const userId = user.customer_id || user.id;
        await notificationService.markAllNotificationsAsRead(userId);
        const res = await notificationService.getCustomerNotifications(userId);
        if (res.success) setNotifications(res.data);
    };

    const handleDeleteNotification = async (id) => {
        await notificationService.deleteNotification(id);
        const userId = user.customer_id || user.id;
        const res = await notificationService.getCustomerNotifications(userId);
        if (res.success) setNotifications(res.data);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50/20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    const tier = user?.membership || 'free';
    const tierConfig = {
        free: { label: 'Free Member', icon: ShoppingBag, badge: 'bg-orange-50 text-orange-700 border-orange-200' },
        silver: { label: 'Silver VIP', icon: Star, badge: 'bg-slate-100 text-slate-700 border-slate-300' },
        gold: { label: 'Gold VIP', icon: Crown, badge: 'bg-amber-50 text-amber-800 border-amber-300' },
        platinum: { label: 'Platinum Elite', icon: ShieldCheck, badge: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
        diamond: { label: 'Diamond Elite', icon: ShieldCheck, badge: 'bg-cyan-50 text-cyan-800 border-cyan-300' },
    }[tier] || { label: 'Member', icon: ShoppingBag, badge: 'bg-orange-50 text-orange-700 border-orange-200' };

    const navTabs = [
        { id: 'overview', label: 'Account Overview', icon: User },
        { id: 'personal', label: 'Personal Details', icon: Edit2 },
        { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
        { id: 'orders', label: 'Recent Orders', icon: ShoppingBag, count: orders.length },
        { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlist.length },
        { id: 'reviews', label: 'My Reviews', icon: Star, count: reviews.length },
        { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications.filter(n => !n.is_read).length },
        { id: 'settings', label: 'Security & Settings', icon: KeyRound },
    ];

    return (
        <div className="min-h-screen bg-[#faf8f5] pt-10 pb-20 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back to Store */}
                <div className="mb-6 flex justify-between items-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-orange-900/70 hover:text-orange-950 font-bold transition-all group"
                    >
                        <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Boutique
                    </button>
                    <span className="text-[9px] uppercase tracking-widest text-orange-400 font-bold">
                        Single-Vendor Customer Portal
                    </span>
                </div>

                {/* Account Dashboard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Navigation Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Profile Identity Card */}
                        <div className="bg-white border border-orange-100/80 p-6 sm:p-8 text-center shadow-sm">
                            <div className="relative inline-block mb-4">
                                {user.profile_picture_url ? (
                                    <img 
                                        src={user.profile_picture_url} 
                                        alt={user.full_name} 
                                        className="w-24 h-24 rounded-full object-cover border-4 border-orange-50 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-orange-100/70 flex items-center justify-center border-4 border-orange-50 mx-auto">
                                        <User size={36} className="text-orange-400" strokeWidth={1.5} />
                                    </div>
                                )}
                                <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>

                            <h2 className="text-xl font-serif text-orange-950 font-normal mb-1">
                                {user.full_name || user.name || 'Boutique Customer'}
                            </h2>
                            <p className="text-xs text-orange-950/60 font-medium mb-3">
                                {user.email}
                            </p>

                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${tierConfig.badge}`}>
                                <tierConfig.icon size={12} />
                                <span>{tierConfig.label}</span>
                            </div>

                            <div className="mt-6 pt-4 border-t border-orange-50 flex items-center justify-around text-center text-orange-900">
                                <div>
                                    <p className="text-lg font-serif font-bold text-orange-950">{orders.length}</p>
                                    <p className="text-[8px] uppercase tracking-widest text-orange-400 font-bold">Orders</p>
                                </div>
                                <div className="h-6 w-[1px] bg-orange-100" />
                                <div>
                                    <p className="text-lg font-serif font-bold text-orange-950">{wishlist.length}</p>
                                    <p className="text-[8px] uppercase tracking-widest text-orange-400 font-bold">Wishlist</p>
                                </div>
                                <div className="h-6 w-[1px] bg-orange-100" />
                                <div>
                                    <p className="text-lg font-serif font-bold text-orange-950">{addresses.length}</p>
                                    <p className="text-[8px] uppercase tracking-widest text-orange-400 font-bold">Addresses</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs Menu */}
                        <div className="bg-white border border-orange-100/80 shadow-sm p-2 space-y-1">
                            {navTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        id={`tab-btn-${tab.id}`}
                                        onClick={() => handleSelectTab(tab.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-none text-left transition-all text-xs tracking-wider uppercase font-bold cursor-pointer ${
                                            isActive 
                                                ? 'bg-orange-950 text-white shadow-sm' 
                                                : 'text-orange-950/80 hover:bg-orange-50 hover:text-orange-950'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={16} className={isActive ? 'text-orange-300' : 'text-orange-400'} />
                                            <span>{tab.label}</span>
                                        </div>
                                        {tab.count !== undefined && tab.count > 0 && (
                                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                                isActive ? 'bg-orange-800 text-white' : 'bg-orange-100 text-orange-900'
                                            }`}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}

                            <div className="pt-2 border-t border-orange-50">
                                <button
                                    id="btn-sidebar-signout"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-xs tracking-wider uppercase font-bold transition-all text-left cursor-pointer"
                                >
                                    <LogOut size={16} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Main Content Area */}
                    <div className="lg:col-span-8 bg-white border border-orange-100/80 p-6 sm:p-8 shadow-sm min-h-[560px]">

                        {/* TAB 1: OVERVIEW */}
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                <div className="border-b border-orange-100 pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-serif text-orange-950 font-normal">Account Overview</h3>
                                        <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Welcome back, {user.full_name || user.name}</p>
                                    </div>
                                    <span className="text-[9px] px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 uppercase font-black tracking-widest rounded-full flex items-center gap-1.5">
                                        <Shield size={12} /> Verified Member
                                    </span>
                                </div>

                                {/* Summary Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] uppercase tracking-widest font-black text-orange-900">Personal Information</span>
                                            <button id="btn-goto-personal" onClick={() => handleSelectTab('personal')} className="text-[9px] uppercase font-bold text-orange-600 hover:underline cursor-pointer">View</button>
                                        </div>
                                        <p className="text-sm font-serif text-orange-950 font-medium">{user.full_name || user.name}</p>
                                        <p className="text-xs text-orange-800/80 mt-1">{user.email}</p>
                                        <p className="text-xs text-orange-800/80">{user.phone || 'No phone registered'}</p>
                                    </div>

                                    <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] uppercase tracking-widest font-black text-orange-900">Primary Delivery Address</span>
                                            <button id="btn-goto-addresses" onClick={() => handleSelectTab('addresses')} className="text-[9px] uppercase font-bold text-orange-600 hover:underline cursor-pointer">Manage</button>
                                        </div>
                                        {addresses.length > 0 ? (
                                            <div>
                                                <p className="text-xs font-bold text-orange-950">{addresses[0].full_name || user.full_name}</p>
                                                <p className="text-xs text-orange-800/80 mt-1 line-clamp-2">
                                                    {addresses[0].street || addresses[0].address_line_1}, {addresses[0].city}, {addresses[0].state} {addresses[0].postal_code}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-xs text-orange-400 italic">No delivery address saved yet.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Orders Preview */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-xs uppercase tracking-[0.2em] font-black text-orange-950">Recent Boutique Orders</h4>
                                        <button onClick={() => navigate('/my-orders')} className="text-[9px] uppercase tracking-wider font-bold text-orange-600 hover:underline flex items-center gap-1">
                                            All Orders ({orders.length}) <ChevronRight size={11} />
                                        </button>
                                    </div>
                                    {orders.length > 0 ? (
                                        <div className="space-y-3">
                                            {orders.slice(0, 3).map((ord) => (
                                                <div key={ord.order_id} className="p-4 border border-orange-100/80 rounded-sm flex items-center justify-between hover:border-orange-200 transition-colors">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 bg-orange-100/60 rounded-sm flex items-center justify-center text-orange-600">
                                                            <ShoppingBag size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-orange-950">#{ord.order_number || ord.order_id}</p>
                                                            <p className="text-[9px] uppercase tracking-wider text-orange-400 mt-0.5">
                                                                {new Date(ord.created_at || ord.placed_at || Date.now()).toLocaleDateString()} • {ord.order_status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-black text-orange-950">{formatPrice(ord.total_amount)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center border border-dashed border-orange-200 text-orange-400 text-xs">
                                            No orders placed yet. Explore the boutique catalog to find luxury deals!
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 2: PERSONAL INFORMATION */}
                        {activeTab === 'personal' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="border-b border-orange-100 pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-serif text-orange-950 font-normal">Personal Information</h3>
                                        <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Manage your identity and profile credentials</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-black hover:bg-orange-900 transition-all shadow-sm"
                                    >
                                        <Edit2 size={12} /> Edit Details
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-orange-50/30 border border-orange-100">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-orange-400">Full Name</label>
                                        <p className="text-sm font-medium text-orange-950">{user.full_name || user.name || 'Not provided'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-orange-400">Email Address</label>
                                        <p className="text-sm font-medium text-orange-950">{user.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-orange-400">Contact Phone</label>
                                        <p className="text-sm font-medium text-orange-950">{user.phone || 'Not provided'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-orange-400">Date of Birth</label>
                                        <p className="text-sm font-medium text-orange-950">
                                            {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-orange-400">Gender</label>
                                        <p className="text-sm font-medium text-orange-950 capitalize">{user.gender || 'Not specified'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-orange-400">Account Role</label>
                                        <p className="text-sm font-medium text-orange-950 uppercase">{user.role || 'Customer'}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 3: SAVED ADDRESSES */}
                        {activeTab === 'addresses' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="border-b border-orange-100 pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-serif text-orange-950 font-normal">Delivery Addresses</h3>
                                        <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Manage your residential and corporate shipping destinations</p>
                                    </div>
                                    <button 
                                        id="btn-open-add-address"
                                        onClick={openAddAddressModal}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-black hover:bg-orange-900 transition-all shadow-sm cursor-pointer"
                                    >
                                        <Plus size={13} /> Add Address
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map((addr) => (
                                        <div 
                                            key={addr.id} 
                                            className={`p-5 border rounded-sm relative flex flex-col justify-between transition-all ${
                                                addr.is_default ? 'border-orange-900 bg-orange-50/30' : 'border-orange-100 bg-white hover:border-orange-300'
                                            }`}
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-bold text-orange-950">{addr.full_name || 'Destination'}</span>
                                                    {addr.is_default && (
                                                        <span className="text-[8px] bg-orange-950 text-white px-2 py-0.5 uppercase tracking-widest font-black rounded-none">
                                                            DEFAULT
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-orange-950/80 leading-relaxed">
                                                    {addr.street || addr.address_line_1}<br />
                                                    {addr.city}, {addr.state} {addr.postal_code || addr.pincode}<br />
                                                    {addr.country}
                                                </p>
                                                {addr.phone && (
                                                    <p className="text-[10px] text-orange-400 mt-2 font-bold flex items-center gap-1">
                                                        <Phone size={10} /> {addr.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-orange-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => openEditAddressModal(addr)} className="text-orange-950 hover:text-orange-600">Edit</button>
                                                    <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                                </div>
                                                {!addr.is_default && (
                                                    <button onClick={() => handleSetDefaultAddress(addr.id)} className="text-orange-600 hover:underline">
                                                        Set as Default
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {addresses.length === 0 && (
                                        <div className="col-span-full py-12 text-center border-2 border-dashed border-orange-200">
                                            <MapPin size={28} className="mx-auto text-orange-300 mb-2" />
                                            <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">No addresses saved yet</p>
                                            <button onClick={openAddAddressModal} className="mt-3 px-4 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-bold">
                                                Add Your First Address
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 4: RECENT ORDERS */}
                        {activeTab === 'orders' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="border-b border-orange-100 pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-serif text-orange-950 font-normal">Order History</h3>
                                        <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Track and view invoices for all purchases</p>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/my-orders')}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-black hover:bg-orange-900 transition-all shadow-sm"
                                    >
                                        Open Orders Portal
                                    </button>
                                </div>

                                {orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map((ord) => (
                                            <div key={ord.order_id} className="p-5 border border-orange-100 bg-white rounded-sm space-y-3">
                                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-50 pb-3">
                                                    <div>
                                                        <span className="text-xs font-black text-orange-950">#{ord.order_number || ord.order_id}</span>
                                                        <span className="text-[10px] text-orange-400 ml-3">
                                                            {new Date(ord.created_at || ord.placed_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                    <span className={`text-[9px] px-2.5 py-0.5 uppercase tracking-widest font-black rounded-none border ${
                                                        ord.order_status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                        ord.order_status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-orange-50 text-orange-700 border-orange-200'
                                                    }`}>
                                                        {ord.order_status}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-orange-950/70">{ord.items?.length || 1} Item(s)</span>
                                                    <span className="font-bold text-orange-950">{formatPrice(ord.total_amount)}</span>
                                                </div>

                                                <div className="pt-2 flex justify-end gap-3">
                                                    <button 
                                                        onClick={() => navigate('/my-orders')}
                                                        className="text-[9px] uppercase tracking-wider font-bold text-orange-600 hover:text-orange-950"
                                                    >
                                                        Track Lifecycle &rarr;
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center border-2 border-dashed border-orange-200">
                                        <ShoppingBag size={28} className="mx-auto text-orange-300 mb-2" />
                                        <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">No orders found</p>
                                        <button onClick={() => navigate('/products')} className="mt-3 px-4 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-bold">
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* TAB 5: WISHLIST */}
                        {activeTab === 'wishlist' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="border-b border-orange-100 pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-serif text-orange-950 font-normal">My Wishlist</h3>
                                        <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Your curated collection of saved boutique pieces</p>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/wishlist')}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-black hover:bg-orange-900 transition-all shadow-sm"
                                    >
                                        Full Wishlist
                                    </button>
                                </div>

                                {wishlist.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {wishlist.map((item) => (
                                            <div key={item.product_id} className="p-4 border border-orange-100 flex gap-3 items-center justify-between bg-white">
                                                <div className="flex items-center gap-3">
                                                    <img src={item.thumbnail} alt={item.name} className="w-14 h-14 object-cover border border-orange-100 rounded-sm" />
                                                    <div>
                                                        <h4 className="text-xs font-bold text-orange-950 line-clamp-1">{item.name}</h4>
                                                        <p className="text-xs font-black text-orange-900 mt-0.5">{formatPrice(item.price)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1 text-right">
                                                    <button 
                                                        onClick={() => { addToCart(item); removeFromWishlist(item.product_id); }}
                                                        className="px-2.5 py-1 bg-orange-950 text-white text-[8px] uppercase tracking-wider font-bold hover:bg-orange-900"
                                                    >
                                                        To Cart
                                                    </button>
                                                    <button 
                                                        onClick={() => removeFromWishlist(item.product_id)}
                                                        className="text-[8px] text-red-500 uppercase tracking-wider font-bold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center border-2 border-dashed border-orange-200">
                                        <Heart size={28} className="mx-auto text-orange-300 mb-2" />
                                        <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">Your wishlist is empty</p>
                                        <button onClick={() => navigate('/products')} className="mt-3 px-4 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-bold">
                                            Explore Catalog
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* TAB 6: MY REVIEWS */}
                        {activeTab === 'reviews' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="border-b border-orange-100 pb-4">
                                    <h3 className="text-xl font-serif text-orange-950 font-normal">Customer Reviews</h3>
                                    <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Reviews and feedback submitted by you</p>
                                </div>

                                {reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {reviews.map((rev) => (
                                            <div key={rev.review_id} className="p-5 border border-orange-100/80 bg-white rounded-sm space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-black text-orange-950">{rev.product_name || `Product #${rev.product_id}`}</span>
                                                    <div className="flex items-center gap-0.5 text-amber-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                size={12} 
                                                                fill={i < rev.rating ? "currentColor" : "none"} 
                                                                strokeWidth={i < rev.rating ? 0 : 1.5}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-orange-950/80 italic leading-relaxed">"{rev.comment}"</p>
                                                <p className="text-[8px] uppercase tracking-widest text-orange-400 pt-1">
                                                    Posted on {new Date(rev.created_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center border-2 border-dashed border-orange-200">
                                        <Star size={28} className="mx-auto text-orange-300 mb-2" />
                                        <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">No reviews written yet</p>
                                        <p className="text-[10px] text-orange-400 mt-1">Review items you've purchased from your orders history</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* TAB 7: NOTIFICATIONS */}
                        {activeTab === 'notifications' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="border-b border-orange-100 pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-serif text-orange-950 font-normal">Notifications & Preferences</h3>
                                        <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Manage live order alerts and boutique offers</p>
                                    </div>
                                    <button 
                                        onClick={handleMarkAllNotifications}
                                        className="text-[9px] uppercase tracking-widest font-black text-orange-600 hover:text-orange-950"
                                    >
                                        Mark All Read
                                    </button>
                                </div>

                                {/* Preferences Toggles */}
                                <div className="p-4 bg-orange-50/50 border border-orange-100 space-y-3">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-orange-950">Email & Push Preferences</h4>
                                    {[
                                        { key: 'notif_orderStatus', label: 'Order Status Updates', desc: 'Real-time notifications when order is packed or dispatched' },
                                        { key: 'notif_returns', label: 'Return & Refund Tracking', desc: 'Alerts when reverse logistics milestone changes' },
                                        { key: 'notif_promotions', label: 'VIP Deals & Flash Drops', desc: 'Early bird access to exclusive discounts' }
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between py-2 border-b border-orange-100/60 last:border-0">
                                            <div>
                                                <p className="text-xs font-bold text-orange-950">{item.label}</p>
                                                <p className="text-[9px] text-orange-950/60">{item.desc}</p>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={() => handleTogglePref(item.key)}
                                                className={`w-11 h-6 rounded-full p-1 transition-colors flex items-center ${notifPrefs[item.key] ? 'bg-orange-950' : 'bg-orange-200'}`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifPrefs[item.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Notification List */}
                                <div className="space-y-3">
                                    {notifications.map((n) => (
                                        <div 
                                            key={n.id || n.notification_id} 
                                            className={`p-4 border rounded-sm flex items-start justify-between gap-3 ${
                                                n.is_read ? 'bg-white border-orange-100' : 'bg-orange-50/60 border-orange-300'
                                            }`}
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h5 className="text-xs font-bold text-orange-950">{n.title}</h5>
                                                    {!n.is_read && (
                                                        <span className="text-[8px] bg-orange-600 text-white px-1.5 py-0.2 rounded-full font-bold">NEW</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-orange-950/80">{n.message}</p>
                                                <p className="text-[8px] uppercase tracking-widest text-orange-400">
                                                    {new Date(n.created_at || Date.now()).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {!n.is_read && (
                                                    <button 
                                                        onClick={() => handleMarkNotification(n.id || n.notification_id)}
                                                        className="text-[9px] text-orange-950 hover:underline uppercase font-bold"
                                                    >
                                                        Mark Read
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDeleteNotification(n.id || n.notification_id)}
                                                    className="text-red-400 hover:text-red-600"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {notifications.length === 0 && (
                                        <div className="py-8 text-center text-xs text-orange-400 italic">
                                            No notifications right now.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 8: SECURITY & SETTINGS */}
                        {activeTab === 'settings' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                <div className="border-b border-orange-100 pb-4">
                                    <h3 className="text-xl font-serif text-orange-950 font-normal">Security & Account Settings</h3>
                                    <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mt-0.5">Password management and security authentication</p>
                                </div>

                                {/* Password Form */}
                                <div className="max-w-md space-y-4">
                                    <h4 className="text-xs uppercase tracking-[0.2em] font-black text-orange-950">Change Password</h4>

                                    {passSuccess && (
                                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-emerald-600" />
                                            {passSuccess}
                                        </div>
                                    )}

                                    {passError && (
                                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm flex items-center gap-2">
                                            <AlertCircle size={14} className="text-rose-600" />
                                            {passError}
                                        </div>
                                    )}

                                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Current Password</label>
                                            <div className="relative">
                                                <input 
                                                    type={showPass ? "text" : "password"}
                                                    required
                                                    value={passwordForm.currentPassword}
                                                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                                    className="w-full pl-4 pr-10 py-2.5 bg-[#faf8f5] border border-orange-200/60 text-xs text-orange-950 outline-none focus:border-orange-950"
                                                />
                                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400">
                                                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">New Password (Min 8 chars)</label>
                                            <input 
                                                type={showPass ? "text" : "password"}
                                                required
                                                value={passwordForm.newPassword}
                                                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                                className="w-full px-4 py-2.5 bg-[#faf8f5] border border-orange-200/60 text-xs text-orange-950 outline-none focus:border-orange-950"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Confirm New Password</label>
                                            <input 
                                                type={showPass ? "text" : "password"}
                                                required
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                                className="w-full px-4 py-2.5 bg-[#faf8f5] border border-orange-200/60 text-xs text-orange-950 outline-none focus:border-orange-950"
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={passLoading}
                                            className="px-6 py-3 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-black hover:bg-orange-900 transition-all cursor-pointer"
                                        >
                                            {passLoading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                                        </button>
                                    </form>
                                </div>

                                {/* Active Session Info */}
                                <div className="pt-6 border-t border-orange-100">
                                    <h4 className="text-xs uppercase tracking-[0.2em] font-black text-orange-950 mb-2">Active Session</h4>
                                    <div className="p-4 bg-orange-50/50 border border-orange-100 flex items-center justify-between text-xs">
                                        <div>
                                            <p className="font-bold text-orange-950">Current Browser Client</p>
                                            <p className="text-[9px] text-orange-400 mt-0.5">Role: {user.role || 'Customer'} • Session Active</p>
                                        </div>
                                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 font-bold uppercase tracking-wider rounded-full">
                                            ONLINE
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* EDIT PROFILE MODAL */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-white max-w-md w-full p-8 border border-orange-200 shadow-2xl z-10"
                        >
                            <h3 className="text-xl font-serif text-orange-950 font-normal mb-1">Edit Profile</h3>
                            <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mb-6">Update your account information</p>

                            {editSuccess && (
                                <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-bold">
                                    {editSuccess}
                                </div>
                            )}

                            {editError && (
                                <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center font-bold">
                                    {editError}
                                </div>
                            )}

                            <form onSubmit={handleEditProfileSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Full Name</label>
                                    <input 
                                        type="text"
                                        required
                                        value={editForm.full_name}
                                        onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Phone Number</label>
                                    <input 
                                        type="tel"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Date of Birth</label>
                                        <input 
                                            type="date"
                                            value={editForm.date_of_birth}
                                            onChange={(e) => setEditForm({...editForm, date_of_birth: e.target.value})}
                                            className="w-full px-3 py-2.5 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Gender</label>
                                        <select 
                                            value={editForm.gender}
                                            onChange={(e) => setEditForm({...editForm, gender: e.target.value})}
                                            className="w-full px-3 py-2.5 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2.5 text-[9px] uppercase font-bold text-orange-950 hover:bg-orange-50"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2.5 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-black hover:bg-orange-900"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ADDRESS MODAL (ADD / EDIT) */}
            <AnimatePresence>
                {isAddressModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddressModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-white max-w-lg w-full p-8 border border-orange-200 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
                        >
                            <h3 className="text-xl font-serif text-orange-950 font-normal mb-1">
                                {editingAddressId ? 'Edit Address' : 'Add New Address'}
                            </h3>
                            <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mb-6">Delivery location details</p>

                            <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Recipient Name *</label>
                                        <input 
                                            type="text"
                                            required
                                            value={addressForm.full_name}
                                            onChange={(e) => setAddressForm({...addressForm, full_name: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Phone *</label>
                                        <input 
                                            type="tel"
                                            required
                                            value={addressForm.phone}
                                            onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Street Address *</label>
                                    <input 
                                        type="text"
                                        required
                                        value={addressForm.street}
                                        onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                                        className="w-full px-3 py-2 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">City *</label>
                                        <input 
                                            type="text"
                                            required
                                            value={addressForm.city}
                                            onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">State *</label>
                                        <input 
                                            type="text"
                                            required
                                            value={addressForm.state}
                                            onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Postal / Pincode *</label>
                                        <input 
                                            type="text"
                                            required
                                            value={addressForm.postal_code}
                                            onChange={(e) => setAddressForm({...addressForm, postal_code: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#faf8f5] border border-orange-200 text-xs text-orange-950 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-orange-950/70">Country</label>
                                        <input 
                                            type="text"
                                            readOnly
                                            value={addressForm.country}
                                            className="w-full px-3 py-2 bg-orange-50/50 border border-orange-200 text-xs text-orange-950 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={addressForm.is_default}
                                            onChange={(e) => setAddressForm({...addressForm, is_default: e.target.checked})}
                                            className="accent-orange-950"
                                        />
                                        <span className="text-xs text-orange-950">Set as default delivery address</span>
                                    </label>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsAddressModalOpen(false)}
                                        className="px-4 py-2 text-[9px] uppercase font-bold text-orange-950 hover:bg-orange-50"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2 bg-orange-950 text-white text-[9px] uppercase tracking-widest font-black hover:bg-orange-900"
                                    >
                                        {editingAddressId ? 'Save Address' : 'Add Address'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;
