import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
    Search, User, Heart, ShoppingBag, Menu, X, Globe, Bell, 
    ChevronDown, ChevronRight, Clock, Tag, Truck, CheckCircle2, 
    XCircle, RefreshCw, Info, ShieldCheck, ArrowRight, Star,
    MapPin, Package, Headphones, RotateCcw
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import gmdLogo from '../../../assets/GMD_Logo.png';
import { useShop } from '../../../context/ShopContext';
import { useAuth } from '../../../context/AuthContext';
import * as authService from '../../../services/authService';
import { ProductContext } from '../../../context/ProductContext/ProductContext';
import { productService } from '../../../services/productService';
import { motion, AnimatePresence } from 'framer-motion';
import { getCustomerNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from '../../../services/notificationService';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import AllDepartmentsDrawer from './AllDepartmentsDrawer';

// Comprehensive Department and Subcategory Configurations for Header Hover Dropdowns
const DEPARTMENTS = [
    { 
        key: 'men', 
        label: 'Men', 
        path: '/products?section=men',
        columns: [
            {
                title: 'Topwear',
                items: [
                    { label: 'Casual & Formal Shirts', path: '/collection/clothing?section=men&subcategory=shirts' },
                    { label: 'T-Shirts & Polos', path: '/collection/clothing?section=men&subcategory=t-shirts' },
                    { label: 'Kurtas & Ethnic Wear', path: '/collection/ethnic-wear?section=men&subcategory=kurtas' },
                    { label: 'Jackets & Blazers', path: '/collection/clothing?section=men&subcategory=jackets' }
                ]
            },
            {
                title: 'Bottomwear',
                items: [
                    { label: 'Jeans & Denims', path: '/collection/clothing?section=men&subcategory=trousers-pants' },
                    { label: 'Trousers & Chinos', path: '/collection/clothing?section=men&subcategory=trousers-pants' },
                    { label: 'Track Pants & Joggers', path: '/collection/clothing?section=men&subcategory=track-pants' }
                ]
            },
            {
                title: 'Footwear & Accessories',
                items: [
                    { label: 'Sneakers & Casual Shoes', path: '/collection/footwear?section=men&subcategory=casual-shoes' },
                    { label: 'Formal Shoes & Loafers', path: '/collection/footwear?section=men&subcategory=formal-shoes' },
                    { label: 'Sandals & Floaters', path: '/collection/footwear?section=men&subcategory=sandals' },
                    { label: 'Belts & Wallets', path: '/collection/accessories?section=men' }
                ]
            }
        ]
    },
    { 
        key: 'women', 
        label: 'Women', 
        path: '/products?section=women',
        columns: [
            {
                title: 'Ethnic Wear',
                items: [
                    { label: 'Kurtas & Kurtis', path: '/collection/ethnic-wear?section=women&subcategory=kurtas' },
                    { label: 'Sarees & Blouses', path: '/collection/ethnic-wear?section=women&subcategory=sarees' },
                    { label: 'Co-ord Sets', path: '/collection/clothing?section=women&subcategory=co-ord-sets' },
                    { label: 'Suit Sets & Anarkalis', path: '/collection/ethnic-wear?section=women&subcategory=kurta-suit-sets' }
                ]
            },
            {
                title: 'Western Wear',
                items: [
                    { label: 'Dresses & Gowns', path: '/collection/clothing?section=women&subcategory=dresses' },
                    { label: 'Tops & Shirts', path: '/collection/clothing?section=women&subcategory=tops' },
                    { label: 'Jeans & Jeggings', path: '/collection/clothing?section=women&subcategory=jeans-jeggings' },
                    { label: 'Leggings & Palazzos', path: '/collection/clothing?section=women&subcategory=leggings' }
                ]
            },
            {
                title: 'Footwear & Bags',
                items: [
                    { label: 'Heels & Wedges', path: '/collection/footwear?section=women&subcategory=sandals' },
                    { label: 'Flat Sandals & Slides', path: '/collection/footwear?section=women&subcategory=flip-flops-slippers' },
                    { label: 'Handbags & Totes', path: '/collection/accessories?section=women&subcategory=handbags' },
                    { label: 'Fashion Jewellery', path: '/collection/jewellery?section=women' }
                ]
            }
        ]
    },
    { 
        key: 'kids', 
        label: 'Kids', 
        path: '/collection/kids',
        columns: [
            {
                title: 'Boys Fashion',
                items: [
                    { label: 'Shirts & T-Shirts', path: '/collection/kids?subcategory=boys-clothing' },
                    { label: 'Jeans & Shorts', path: '/collection/kids?subcategory=boys-clothing' },
                    { label: 'Ethnic Sets', path: '/collection/kids?subcategory=boys-clothing' }
                ]
            },
            {
                title: 'Girls Fashion',
                items: [
                    { label: 'Dresses & Frocks', path: '/collection/kids?subcategory=girls-clothing' },
                    { label: 'Tops & Skirts', path: '/collection/kids?subcategory=girls-clothing' },
                    { label: 'Ethnic Wear', path: '/collection/kids?subcategory=girls-clothing' }
                ]
            },
            {
                title: 'Baby & Footwear',
                items: [
                    { label: 'Baby Rompers & Onesies', path: '/collection/kids?subcategory=baby-clothes' },
                    { label: 'Kids Casual Shoes', path: '/collection/kids?section=footwear' },
                    { label: 'Kids Sandals & Slippers', path: '/collection/kids?section=footwear&subcategory=sandals' }
                ]
            }
        ]
    },
    { 
        key: 'home-living', 
        label: 'Home & Living', 
        path: '/collection/home-living',
        columns: [
            {
                title: 'Kitchen & Dining',
                items: [
                    { label: 'Cookware & Utensils', path: '/collection/home-living?subcategory=cookware' },
                    { label: 'Dinner Sets & Plates', path: '/collection/home-living?subcategory=dinner-sets' },
                    { label: 'Storage Containers', path: '/collection/home-living?subcategory=storage-containers' },
                    { label: 'Water Bottles & Flasks', path: '/collection/home-living?subcategory=water-bottles-flasks' }
                ]
            },
            {
                title: 'Home Furnishing',
                items: [
                    { label: 'Bed Linen & Sheets', path: '/collection/home-living?subcategory=bedsheets' },
                    { label: 'Curtains & Drapes', path: '/collection/home-living?subcategory=curtains' },
                    { label: 'Cushions & Covers', path: '/collection/home-living?subcategory=cushions' },
                    { label: 'Blankets & Quilts', path: '/collection/home-living?subcategory=blankets-quilts' }
                ]
            },
            {
                title: 'Home Décor',
                items: [
                    { label: 'Wall Décor & Clocks', path: '/collection/home-living?subcategory=wall-decor' },
                    { label: 'Vases & Artificial Plants', path: '/collection/home-living?subcategory=artificial-flowers-plants' },
                    { label: 'Lamps & Lighting', path: '/collection/home-living' },
                    { label: 'Showpieces & Figurines', path: '/collection/home-living?subcategory=showpieces' }
                ]
            }
        ]
    },
    { 
        key: 'beauty', 
        label: 'Beauty', 
        path: '/collection/beauty',
        columns: [
            {
                title: 'Skincare',
                items: [
                    { label: 'Face Creams & Moisturizers', path: '/collection/beauty?subcategory=skincare' },
                    { label: 'Face Wash & Cleansers', path: '/collection/beauty?subcategory=skincare' },
                    { label: 'Sunscreen & Serums', path: '/collection/beauty?subcategory=skincare' }
                ]
            },
            {
                title: 'Haircare',
                items: [
                    { label: 'Shampoos & Conditioners', path: '/collection/beauty?subcategory=haircare' },
                    { label: 'Hair Oils & Serums', path: '/collection/beauty?subcategory=haircare' }
                ]
            },
            {
                title: 'Fragrances & Grooming',
                items: [
                    { label: 'Perfumes & Deodorants', path: '/collection/beauty?subcategory=fragrances' },
                    { label: 'Body Mists & Sprays', path: '/collection/beauty?subcategory=fragrances' },
                    { label: 'Men Grooming & Shaving', path: '/collection/beauty?subcategory=wellness' }
                ]
            }
        ]
    },
    { 
        key: 'pooja-items', 
        label: 'Pooja Items', 
        path: '/collection/pooja-items',
        columns: [
            {
                title: 'Idols & Mandir',
                items: [
                    { label: 'Brass Idols & Statues', path: '/collection/pooja-items?subcategory=idols-statues' },
                    { label: 'Home Temple / Mandir', path: '/collection/pooja-items?subcategory=home-temple-mandir' },
                    { label: 'Puja Thalis & Bells', path: '/collection/pooja-items?subcategory=thalis' },
                    { label: 'Brass & Silver Items', path: '/collection/pooja-items?subcategory=brass-silver-pooja-items' }
                ]
            },
            {
                title: 'Daily Puja Essentials',
                items: [
                    { label: 'Brass Diyas & Deepams', path: '/collection/pooja-items?subcategory=diyas-lamps' },
                    { label: 'Incense & Fragrance', path: '/collection/pooja-items?subcategory=incense-fragrance' },
                    { label: 'Pooja Samagri', path: '/collection/pooja-items?subcategory=pooja-samagri' },
                    { label: 'Rudraksha & Spiritual', path: '/collection/pooja-items?subcategory=rudraksha-spiritual' },
                    { label: 'Festival Pooja Kits', path: '/collection/pooja-items?subcategory=festival-pooja-kits' }
                ]
            }
        ]
    },
    { 
        key: 'electronics', 
        label: 'Electronics', 
        path: '/collection/electronics',
        columns: [
            {
                title: 'Audio & Sound',
                items: [
                    { label: 'Wireless Headphones', path: '/collection/electronics?subcategory=headphones' },
                    { label: 'Bluetooth Speakers', path: '/collection/electronics?subcategory=speakers' },
                    { label: 'TWS True Wireless Earbuds', path: '/collection/electronics?subcategory=earbuds' },
                    { label: 'Soundbars & Home Audio', path: '/collection/electronics?subcategory=soundbars' }
                ]
            },
            {
                title: 'Smart Wearables & Tech',
                items: [
                    { label: 'Smartwatches', path: '/collection/electronics?subcategory=smart-wearables' },
                    { label: 'Fitness Trackers', path: '/collection/electronics?subcategory=fitness-trackers' },
                    { label: 'Power Banks', path: '/collection/electronics?subcategory=power-banks' },
                    { label: 'Chargers & Cables', path: '/collection/electronics?subcategory=chargers-cables' }
                ]
            }
        ]
    },
    { 
        key: 'deals', 
        label: "Today's Deals", 
        path: '/collection/clothing?deal=clearance',
        isHighlight: true,
        columns: [
            {
                title: 'Flash Drops',
                items: [
                    { label: 'Clearance Sale (Up to 80% Off)', path: '/collection/clothing?deal=clearance' },
                    { label: 'Deals of the Day', path: '/collection/clothing?deal=flash_deal' },
                    { label: 'Under ₹499 Essentials', path: '/products?price=under_500' },
                    { label: 'Under ₹999 Boutique', path: '/products?price=under_1000' }
                ]
            },
            {
                title: 'Department Specials',
                items: [
                    { label: 'Fashion & Handloom Deals', path: '/collection/clothing?deal=clearance' },
                    { label: 'Pooja Essentials Offers', path: '/collection/pooja-items' },
                    { label: 'Electronics & Audio Deals', path: '/collection/electronics' },
                    { label: 'Home & Kitchen Discounts', path: '/collection/home-living' }
                ]
            }
        ]
    }
];

const SEARCH_CATEGORIES = [
    { value: 'all', label: 'All' },
    { value: 'clothing', label: 'Fashion' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'home-living', label: 'Home' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'pooja-items', label: 'Pooja' }
];

const NavMain = ({ isTransparent = false, isHome = false }) => {
    const {
        cartCount,
        wishlist,
        setCartDrawerOpen,
        setWishlistDrawerOpen,
        selectedCountry,
        changeCountry,
        countriesList,
        formatPrice,
        t
    } = useShop();

    const { user, logout: localLogout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Local UI states
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('all');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState({ products: [] });
    const [activeDept, setActiveDept] = useState(null);
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [showCountryMenu, setShowCountryMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const searchRef = useRef(null);
    const countryRef = useRef(null);
    const accountRef = useRef(null);
    const deptMenuTimer = useRef(null);

    // Close overlays on navigation
    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
        setSearchOpen(false);
        setActiveDept(null);
        setShowCategorySelect(false);
        setShowCountryMenu(false);
        setShowAccountMenu(false);
        setNotificationsOpen(false);
    }, [location.pathname, location.search]);

    // Handle outside clicks
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
                setShowCategorySelect(false);
            }
            if (countryRef.current && !countryRef.current.contains(e.target)) {
                setShowCountryMenu(false);
            }
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setShowAccountMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search query autocomplete fetch
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchSuggestions({ products: [] });
            return;
        }
        const timer = setTimeout(async () => {
            try {
                const res = await productService.getSearchSuggestions(searchQuery);
                if (res?.success) {
                    setSearchSuggestions(res.data || { products: [] });
                }
            } catch (err) {
                console.warn('Search suggestion error:', err);
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch user notifications
    const fetchNotifications = async () => {
        if (user && (user.customer_id || user.id)) {
            const res = await getCustomerNotifications(user.customer_id || user.id);
            if (res.success) {
                setNotifications(res.data);
                setUnreadCount(res.data.filter(n => !n.is_read).length);
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 25000);
        return () => clearInterval(interval);
    }, [user]);

    const handleMarkAsRead = async (id) => {
        const res = await markNotificationAsRead(id);
        if (res.success) fetchNotifications();
    };

    const handleMarkAllAsRead = async () => {
        if (user && (user.customer_id || user.id)) {
            const res = await markAllNotificationsAsRead(user.customer_id || user.id);
            if (res.success) fetchNotifications();
        }
    };

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        setSearchOpen(false);
        setMobileSearchOpen(false);
        const query = searchQuery.trim();
        if (query) {
            const targetUrl = searchCategory !== 'all'
                ? `/products?category=${encodeURIComponent(searchCategory)}&search=${encodeURIComponent(query)}`
                : `/products?search=${encodeURIComponent(query)}`;
            navigate(targetUrl);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.error('Logout error:', err);
        }
        localLogout();
        navigate('/login');
    };

    const handleDeptMouseEnter = (deptKey) => {
        clearTimeout(deptMenuTimer.current);
        setActiveDept(deptKey);
    };

    const handleDeptMouseLeave = () => {
        clearTimeout(deptMenuTimer.current);
        deptMenuTimer.current = setTimeout(() => {
            setActiveDept(null);
        }, 300);
    };

    return (
        <div className={`w-full flex flex-col transition-colors duration-300 ${isTransparent ? 'bg-transparent text-white' : 'bg-white text-stone-900'}`}>
            
            {/* ======================================================== */}
            {/* LINE 1: MAIN E-COMMERCE HEADER (Generous Size)          */}
            {/* ======================================================== */}
            <div className={`w-full transition-colors duration-300 ${isTransparent ? 'border-b border-white/10 bg-transparent' : 'border-b border-stone-100 bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 md:gap-6">
                    
                    {/* 1. Left Group: Mobile Toggle, Brand Logo & Delivery Destination */}
                    <div className="flex items-center gap-3 sm:gap-5 lg:gap-6 flex-shrink-0">
                        {/* Mobile Hamburger */}
                        <button 
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className={`lg:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                                isTransparent 
                                    ? 'text-white hover:bg-white/20' 
                                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                            }`}
                            aria-label="Open navigation menu"
                        >
                            <Menu size={22} />
                        </button>

                        {/* Brand Logo */}
                        <Link to="/" className="flex items-center flex-shrink-0 focus:outline-none">
                            <img 
                                src={gmdLogo} 
                                alt="GoMo Deals" 
                                className="h-11 sm:h-12 md:h-13 lg:h-14 w-auto object-contain transition-transform duration-200 hover:scale-105 filter drop-shadow-sm"
                            />
                        </Link>

                        {/* Delivery Location / Region Widget */}
                        <div ref={countryRef} className="relative hidden xl:block">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCountryMenu(!showCountryMenu);
                                    setShowAccountMenu(false);
                                    setNotificationsOpen(false);
                                }}
                                className={`flex items-center gap-2 p-1.5 rounded-xl border transition-colors text-left cursor-pointer group ${
                                    isTransparent
                                        ? 'border-transparent hover:border-white/20 hover:bg-white/10'
                                        : 'border-transparent hover:border-stone-200/60 hover:bg-stone-50'
                                }`}
                            >
                                <MapPin size={18} className="text-orange-500 flex-shrink-0 group-hover:animate-bounce-subtle" />
                                <div className="flex flex-col leading-tight">
                                    <span className={`text-[9px] uppercase tracking-wider font-extrabold ${isTransparent ? 'text-white/70' : 'text-stone-400'}`}>
                                        Deliver to
                                    </span>
                                    <span className={`text-xs font-bold flex items-center gap-1 ${isTransparent ? 'text-white' : 'text-stone-800'}`}>
                                        <span>{selectedCountry?.name || 'India'}</span>
                                        <ChevronDown size={11} className={isTransparent ? 'text-white/60' : 'text-stone-400'} />
                                    </span>
                                </div>
                            </button>

                            {/* Country/Location Dropdown */}
                            <AnimatePresence>
                                {showCountryMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute left-0 top-full mt-2 w-56 bg-white text-stone-900 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.14)] border border-stone-100 p-2 z-50"
                                    >
                                        <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 px-3 py-1.5 border-b border-stone-100 mb-1">
                                            Select Delivery Region
                                        </div>
                                        <div className="max-h-60 overflow-y-auto space-y-0.5 custom-scrollbar">
                                            {countriesList.map((c) => (
                                                <button
                                                    key={c.name}
                                                    type="button"
                                                    onClick={() => {
                                                        changeCountry(c.name);
                                                        setShowCountryMenu(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                                        selectedCountry?.name === c.name
                                                            ? 'bg-orange-50 text-orange-600 font-bold'
                                                            : 'text-stone-700 hover:bg-stone-50'
                                                    }`}
                                                >
                                                    <span className="font-medium">{c.name}</span>
                                                    <span className="font-bold text-stone-500">{c.currency} ({c.symbol})</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* 2. Center: Large, Prominent Search Bar (Desktop) */}
                    <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl relative mx-2">
                        <form 
                            onSubmit={handleSearchSubmit}
                            className={`w-full flex items-center rounded-full h-11 transition-all duration-200 ${
                                isTransparent
                                    ? 'bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-white/70 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/15'
                                    : 'bg-white border-2 border-stone-200/90 hover:border-orange-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 shadow-xs'
                            }`}
                        >
                            {/* Department Prefix Selector */}
                            <div className="relative h-full flex items-center flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setShowCategorySelect(!showCategorySelect)}
                                    className={`h-full pl-4 pr-3 text-xs font-bold border-r flex items-center gap-1.5 rounded-l-full transition-colors cursor-pointer select-none ${
                                        isTransparent
                                            ? 'text-white border-white/20 bg-white/10 hover:bg-white/20'
                                            : 'text-stone-700 hover:text-stone-900 border-stone-200 bg-stone-50/70 hover:bg-stone-100/70'
                                    }`}
                                >
                                    <span>{(SEARCH_CATEGORIES.find(c => c.value === searchCategory) || SEARCH_CATEGORIES[0]).label}</span>
                                    <ChevronDown size={11} className={`transition-transform ${showCategorySelect ? 'rotate-180' : ''} ${isTransparent ? 'text-white/70' : 'text-stone-400'}`} />
                                </button>

                                <AnimatePresence>
                                    {showCategorySelect && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 6 }}
                                            className="absolute top-full left-0 mt-2 w-44 bg-white text-stone-900 rounded-xl shadow-xl border border-stone-100 p-1.5 z-50"
                                        >
                                            {SEARCH_CATEGORIES.map(cat => (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setSearchCategory(cat.value);
                                                        setShowCategorySelect(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                                                        searchCategory === cat.value
                                                            ? 'bg-orange-50 text-orange-600 font-bold'
                                                            : 'text-stone-700 hover:bg-stone-50'
                                                    }`}
                                                >
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Search Input Field */}
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSearchOpen(true);
                                }}
                                onFocus={() => setSearchOpen(true)}
                                placeholder="Search for premium products, brands, essentials..."
                                className={`bg-transparent text-sm px-4 w-full focus:outline-none font-normal ${
                                    isTransparent
                                        ? 'text-white placeholder:text-white/75 focus:text-stone-900'
                                        : 'text-stone-900 placeholder:text-stone-400'
                                }`}
                            />

                            {/* Clear Input Button */}
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSearchOpen(false);
                                    }}
                                    className={`p-1 rounded-full cursor-pointer mr-1 ${isTransparent ? 'text-white/80 hover:text-white' : 'text-stone-400 hover:text-stone-600'}`}
                                >
                                    <X size={15} />
                                </button>
                            )}

                            {/* Search Submit Button */}
                            <button
                                type="submit"
                                className="h-full px-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-r-full flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0 shadow-xs"
                                aria-label="Search"
                            >
                                <Search size={17} strokeWidth={2.5} />
                            </button>
                        </form>

                        {/* Instant Search Suggestions Popover */}
                        <AnimatePresence>
                            {searchOpen && searchQuery.trim() !== '' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full left-0 w-full mt-2 bg-white text-stone-900 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.14)] border border-stone-100 p-3 z-50 overflow-hidden"
                                >
                                    <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 px-3 pb-2 border-b border-stone-100 mb-2 flex items-center justify-between">
                                        <span>Matching Products</span>
                                        <span>{searchSuggestions.products?.length || 0} items</span>
                                    </div>
                                    <div className="max-h-68 overflow-y-auto space-y-1 custom-scrollbar">
                                        {searchSuggestions.products && searchSuggestions.products.length > 0 ? (
                                            searchSuggestions.products.slice(0, 6).map((item) => (
                                                <Link
                                                    key={item.id || item.product_id}
                                                    to={`/product/${item.product_id || item.id}`}
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setSearchOpen(false);
                                                    }}
                                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors group text-left"
                                                >
                                                    <img 
                                                        src={item.image || item.thumbnail || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80'} 
                                                        alt={item.name}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80';
                                                        }}
                                                        className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200/50 flex-shrink-0"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-stone-800 truncate group-hover:text-orange-600 transition-colors">
                                                            {item.name || item.title}
                                                        </p>
                                                        <p className="text-[11px] font-bold text-stone-900 mt-0.5">
                                                            {formatPrice(item.price)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-xs text-stone-400 py-4 text-center">
                                                No matching products found
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleSearchSubmit}
                                        className="w-full mt-2 pt-2 border-t border-stone-100 text-center text-xs font-bold text-orange-600 hover:text-orange-700 py-1 transition-colors cursor-pointer block"
                                    >
                                        View all search results
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3. Right: Essential E-Commerce Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
                        
                        {/* Mobile Search Toggle */}
                        <button 
                            type="button"
                            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                            className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                                isTransparent ? 'text-white hover:bg-white/20' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                            }`}
                            aria-label="Toggle mobile search"
                        >
                            <Search size={20} />
                        </button>

                        {/* Currency Selector (compact pill) */}
                        <div className="hidden sm:block">
                            <button
                                type="button"
                                onClick={() => setShowCountryMenu(!showCountryMenu)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors text-xs font-semibold cursor-pointer ${
                                    isTransparent
                                        ? 'border-white/30 bg-white/15 text-white hover:bg-white/25'
                                        : 'border-stone-200/80 bg-stone-50/70 hover:bg-stone-100 text-stone-700 hover:text-stone-900'
                                }`}
                                title="Change currency"
                            >
                                <Globe size={14} className={isTransparent ? 'text-white/80' : 'text-stone-500'} />
                                <span>{selectedCountry?.currency || 'INR'} ({selectedCountry?.symbol || '₹'})</span>
                            </button>
                        </div>

                        {/* Returns & Orders Quick Link */}
                        <Link
                            to={user ? "/my-orders" : "/login"}
                            className={`hidden lg:flex items-center gap-2 p-1.5 rounded-xl transition-colors text-left group ${
                                isTransparent ? 'hover:bg-white/15 text-white' : 'hover:bg-stone-50 text-stone-800'
                            }`}
                        >
                            <Package size={20} className={`${isTransparent ? 'text-white' : 'text-stone-700'} group-hover:text-orange-500 transition-colors`} />
                            <div className="flex flex-col leading-tight">
                                <span className={`text-[9px] uppercase tracking-wider font-extrabold ${isTransparent ? 'text-white/70' : 'text-stone-400'}`}>
                                    Returns
                                </span>
                                <span className={`text-xs font-bold group-hover:text-orange-500 transition-colors ${isTransparent ? 'text-white' : 'text-stone-800'}`}>
                                    &amp; Orders
                                </span>
                            </div>
                        </Link>

                        {/* Notifications Bell */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setNotificationsOpen(!notificationsOpen);
                                    setShowAccountMenu(false);
                                    setShowCountryMenu(false);
                                }}
                                className={`p-2 rounded-xl transition-colors cursor-pointer relative ${
                                    isTransparent ? 'text-white hover:bg-white/15' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                                }`}
                                aria-label="View notifications"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white" />
                                )}
                            </button>

                            <AnimatePresence>
                                {notificationsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white text-stone-900 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.14)] border border-stone-100 z-50 overflow-hidden"
                                    >
                                        <div className="p-3.5 border-b border-stone-100 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-xs font-bold text-stone-900">Notifications</span>
                                                {unreadCount > 0 && (
                                                    <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                        {unreadCount} new
                                                    </span>
                                                )}
                                            </div>
                                            {notifications.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={handleMarkAllAsRead}
                                                    className="text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider cursor-pointer"
                                                >
                                                    Mark all read
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-72 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                                            {notifications.length > 0 ? (
                                                notifications.map((n) => (
                                                    <div 
                                                        key={n.notification_id || n.id}
                                                        className={`p-2.5 rounded-xl border text-left transition-colors flex gap-2.5 ${
                                                            !n.is_read 
                                                                ? 'bg-orange-50/40 border-orange-100/80' 
                                                                : 'bg-white border-stone-100 hover:bg-stone-50/60'
                                                        }`}
                                                    >
                                                        <div className="p-1.5 rounded-full bg-stone-100 text-stone-600 flex-shrink-0 h-fit mt-0.5">
                                                            <Tag size={12} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs text-stone-800 leading-snug">
                                                                {n.message}
                                                            </p>
                                                            <div className="flex items-center justify-between mt-1 pt-1 border-t border-stone-100/60 text-[9px] text-stone-400">
                                                                <span>{new Date(n.created_at || Date.now()).toLocaleDateString()}</span>
                                                                {!n.is_read && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleMarkAsRead(n.notification_id || n.id)}
                                                                        className="text-orange-600 font-bold hover:underline cursor-pointer"
                                                                    >
                                                                        Mark read
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-8 text-center text-xs text-stone-400">
                                                    No updates right now
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Wishlist Button */}
                        <button
                            type="button"
                            onClick={() => setWishlistDrawerOpen(true)}
                            className={`p-2 rounded-xl transition-colors cursor-pointer relative ${
                                isTransparent ? 'text-white hover:bg-white/15' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                            }`}
                            aria-label="View wishlist"
                        >
                            <Heart size={20} />
                            {wishlist && wishlist.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </button>

                        {/* Cart Button (Prominent) */}
                        <button
                            type="button"
                            onClick={() => setCartDrawerOpen(true)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-200 cursor-pointer relative group shadow-2xs ${
                                isTransparent
                                    ? 'bg-white/20 hover:bg-orange-600 border-white/30 text-white'
                                    : 'bg-orange-50 hover:bg-orange-600 border-orange-200/80 text-stone-800 hover:text-white'
                            }`}
                            aria-label="View shopping cart"
                        >
                            <div className="relative">
                                <ShoppingBag size={20} className={`${isTransparent ? 'text-white' : 'text-orange-600 group-hover:text-white'} transition-colors`} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-orange-600 group-hover:bg-white text-white group-hover:text-orange-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className={`hidden sm:inline text-xs font-bold uppercase tracking-wider transition-colors ${isTransparent ? 'text-white' : 'text-orange-950 group-hover:text-white'}`}>
                                Cart
                            </span>
                        </button>

                        {/* User Account Menu */}
                        <div ref={accountRef} className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAccountMenu(!showAccountMenu);
                                    setShowCountryMenu(false);
                                    setNotificationsOpen(false);
                                }}
                                className={`flex items-center gap-1.5 p-1.5 rounded-xl border border-transparent transition-colors cursor-pointer group text-left ${
                                    isTransparent ? 'hover:bg-white/15' : 'hover:bg-stone-50 hover:border-stone-200/60'
                                }`}
                                aria-label="Account options"
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                    isTransparent ? 'bg-white/20 text-white group-hover:bg-white/30' : 'bg-stone-100 text-stone-700 group-hover:text-orange-600'
                                }`}>
                                    <User size={18} />
                                </div>
                                <div className="hidden xl:flex flex-col leading-tight">
                                    <span className={`text-[9px] uppercase tracking-wider font-extrabold ${isTransparent ? 'text-white/70' : 'text-stone-400'}`}>
                                        {user ? 'Account' : 'Welcome'}
                                    </span>
                                    <span className={`text-xs font-bold flex items-center gap-0.5 ${isTransparent ? 'text-white' : 'text-stone-800'}`}>
                                        <span>{user ? (user.name ? user.name.split(' ')[0] : 'My Account') : 'Sign In'}</span>
                                        <ChevronDown size={11} className={isTransparent ? 'text-white/60' : 'text-stone-400'} />
                                    </span>
                                </div>
                            </button>

                            <AnimatePresence>
                                {showAccountMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-2 w-56 bg-white text-stone-900 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.14)] border border-stone-100 p-2 z-50"
                                    >
                                        {user ? (
                                            <>
                                                <div className="px-3 py-2 border-b border-stone-100 mb-1">
                                                    <p className="text-[10px] font-black uppercase tracking-wider text-stone-400">Signed In As</p>
                                                    <p className="text-xs font-bold text-stone-900 truncate mt-0.5">{user.name || user.email}</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setShowAccountMenu(false)}
                                                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                                                >
                                                    <span>My Profile</span>
                                                    <ChevronRight size={13} className="text-stone-400" />
                                                </Link>
                                                <Link
                                                    to="/my-orders"
                                                    onClick={() => setShowAccountMenu(false)}
                                                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                                                >
                                                    <span>My Orders</span>
                                                    <ChevronRight size={13} className="text-stone-400" />
                                                </Link>
                                                {(user.role === 'admin' || user.role === 'super_admin') && (
                                                    <Link
                                                        to="/admin"
                                                        onClick={() => setShowAccountMenu(false)}
                                                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                                                    >
                                                        <span>Admin Dashboard</span>
                                                        <ChevronRight size={13} className="text-rose-400" />
                                                    </Link>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowAccountMenu(false);
                                                        handleLogout();
                                                    }}
                                                    className="w-full text-left px-3 py-2 mt-1 border-t border-stone-100 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    to="/login"
                                                    onClick={() => setShowAccountMenu(false)}
                                                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-800 hover:bg-stone-50 font-semibold transition-colors"
                                                >
                                                    <span>Customer Sign In</span>
                                                    <ChevronRight size={13} className="text-stone-400" />
                                                </Link>
                                                <Link
                                                    to="/register"
                                                    onClick={() => setShowAccountMenu(false)}
                                                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-800 hover:bg-stone-50 font-semibold transition-colors"
                                                >
                                                    <span>Create Account</span>
                                                    <ChevronRight size={13} className="text-stone-400" />
                                                </Link>
                                                <Link
                                                    to="/admin-login"
                                                    onClick={() => setShowAccountMenu(false)}
                                                    className="w-full flex items-center justify-between px-3 py-2 mt-1 border-t border-stone-100 rounded-xl text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
                                                >
                                                    <span>Admin Portal</span>
                                                    <ChevronRight size={13} className="text-stone-400" />
                                                </Link>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>

            {/* ======================================================== */}
            {/* LINE 2: SECOND LINE - DEPARTMENTS & VALUE-ADD PERKS      */}
            {/* ======================================================== */}
            <div className={`w-full text-xs font-semibold select-none relative z-40 transition-colors duration-300 ${
                isTransparent 
                    ? 'bg-black/35 backdrop-blur-md border-b border-white/15 text-white' 
                    : 'bg-white border-b border-stone-200/80 text-stone-800'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[44px] flex items-center justify-between gap-3 relative">
                    
                    {/* Left: Department Navigation Links */}
                    <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto xl:overflow-visible no-scrollbar py-1 relative min-w-0 flex-1">
                        {/* All Categories Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider text-[11px] cursor-pointer flex-shrink-0 mr-1 ${
                                isTransparent
                                    ? 'text-white hover:bg-white/20'
                                    : 'text-stone-800 hover:bg-stone-50 hover:text-orange-600'
                            }`}
                        >
                            <Menu size={13} className="text-orange-500" />
                            <span>All</span>
                        </button>

                        <div className={`w-px h-4 mx-1 flex-shrink-0 ${isTransparent ? 'bg-white/20' : 'bg-stone-200'}`} />

                        {/* Men, Women, Kids, Home & Living, Beauty, Pooja Items, Electronics, Deals */}
                        {DEPARTMENTS.map((dept) => {
                            const isCurrentActive = activeDept === dept.key;
                            return (
                                <div
                                    key={dept.key}
                                    className="relative flex-shrink-0 py-1"
                                    onMouseEnter={() => handleDeptMouseEnter(dept.key)}
                                    onMouseLeave={handleDeptMouseLeave}
                                >
                                    <Link
                                        to={dept.path}
                                        className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider transition-all duration-150 flex items-center gap-1 cursor-pointer font-bold whitespace-nowrap flex-shrink-0 ${
                                            dept.isHighlight
                                                ? isTransparent
                                                    ? 'text-white bg-rose-600/90 hover:bg-rose-600 border border-rose-400/60 shadow-xs'
                                                    : 'text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 shadow-xs'
                                                : isCurrentActive
                                                    ? isTransparent
                                                        ? 'text-white bg-white/20 shadow-2xs'
                                                        : 'text-orange-600 bg-stone-100 shadow-2xs'
                                                    : isTransparent
                                                        ? 'text-white/90 hover:text-white hover:bg-white/15'
                                                        : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
                                        }`}
                                    >
                                        <span>{dept.label}</span>
                                        {dept.columns && (
                                            <ChevronDown size={10} className={`transition-transform duration-200 ${isCurrentActive ? 'rotate-180 text-orange-400' : isTransparent ? 'text-white/60' : 'text-stone-400'}`} />
                                        )}
                                    </Link>

                                    {/* Department Hover Mega-Dropdown */}
                                    <AnimatePresence>
                                        {isCurrentActive && dept.columns && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 6 }}
                                                transition={{ duration: 0.16 }}
                                                onMouseEnter={() => clearTimeout(deptMenuTimer.current)}
                                                onMouseLeave={handleDeptMouseLeave}
                                                className="absolute top-full left-0 mt-0.5 bg-white text-stone-900 rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.18)] border border-stone-200/90 p-5 z-50 min-w-[380px] max-w-[580px]"
                                            >
                                                <div className={`grid gap-6 ${dept.columns.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                                    {dept.columns.map((col, idx) => (
                                                        <div key={idx} className="space-y-2">
                                                            <h5 className="text-[11px] font-black uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-1.5">
                                                                {col.title}
                                                            </h5>
                                                            <ul className="space-y-1.5">
                                                                {col.items.map((sub, sIdx) => (
                                                                    <li key={sIdx}>
                                                                        <Link
                                                                            to={sub.path}
                                                                            onClick={() => setActiveDept(null)}
                                                                            className="text-xs text-stone-600 hover:text-orange-600 transition-colors block py-0.5 leading-snug"
                                                                        >
                                                                            {sub.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                                                    <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                                                        GoMo Deals Verified Boutique
                                                    </span>
                                                    <Link
                                                        to={dept.path}
                                                        onClick={() => setActiveDept(null)}
                                                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
                                                    >
                                                        <span>View All</span>
                                                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: E-Commerce Value Perks - shown only on ultra-wide screens to prevent any overlap */}
                    <div className={`hidden 2xl:flex items-center gap-5 text-[11px] font-medium flex-shrink-0 ml-auto ${isTransparent ? 'text-white/80' : 'text-stone-500'}`}>
                        <div className="flex items-center gap-1.5">
                            <Truck size={13} className="text-orange-500 flex-shrink-0" />
                            <span className="whitespace-nowrap"><span className="hidden 2xl:inline">Free Express </span>Delivery &gt;₹500</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RotateCcw size={13} className="text-orange-500 flex-shrink-0" />
                            <span className="whitespace-nowrap"><span className="hidden 2xl:inline">15-Day </span>Easy Returns</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck size={13} className="text-orange-500 flex-shrink-0" />
                            <span className="whitespace-nowrap">100% Genuine<span className="hidden 2xl:inline"> Brands</span></span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Expandable Search Row */}
            <AnimatePresence>
                {mobileSearchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-b border-stone-100 px-4 py-3 bg-white text-stone-900"
                    >
                        <form 
                            onSubmit={handleSearchSubmit}
                            className="flex items-center bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 gap-2"
                        >
                            <Search size={15} className="text-stone-400 flex-shrink-0" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products, brands and more..."
                                className="bg-transparent text-xs text-stone-900 placeholder-stone-400 w-full focus:outline-none"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 text-stone-400 hover:text-stone-600"
                                >
                                    <X size={13} />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-3.5 py-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[11px] font-bold uppercase rounded-full tracking-wider shadow-xs cursor-pointer shrink-0"
                            >
                                Search
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Universal All Departments & Catalog Navigation Drawer (Mobile + Desktop) */}
            <AllDepartmentsDrawer
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                departments={DEPARTMENTS}
                user={user}
                onLogout={handleLogout}
            />

            {/* Portals for Cart Drawer and Wishlist Drawer */}
            {createPortal(<CartDrawer />, document.body)}
            {createPortal(<WishlistDrawer />, document.body)}

        </div>
    );
};

export default NavMain;