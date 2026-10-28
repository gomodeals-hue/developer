import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Globe,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Tag,
  Truck,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Info,
  ShieldCheck,
  ArrowRight,
  Star,
  MapPin,
  Package,
  Headphones,
  RotateCcw,
  LogOut,
  Sparkles,
  HelpCircle,
  Store,
} from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createPortal } from "react-dom";
import gmdLogo from "../../../assets/GMD_Logo.png";
import { useShop } from "../../../context/ShopContext";
import { useAuth } from "../../../context/AuthContext";
import * as authService from "../../../services/authService";
import { ProductContext } from "../../../context/ProductContext/ProductContext";
import { productService } from "../../../services/productService";
import { motion, AnimatePresence } from "framer-motion";
import {
  notificationService,
  getCustomerNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../../services/notificationService";
import { realtimeService } from "../../../services/realtimeService";
import CartDrawer from "./CartDrawer";
import AllDepartmentsDrawer from "./AllDepartmentsDrawer";
import LanguageSelector from "./LanguageSelector";
import { getProductImage } from "../../../utils/productImages";
import { findRespectiveCategoryMatch, buildSearchNavigationUrl } from "../../../utils/categorySearchMatcher.js";

// Comprehensive Department and Subcategory Configurations for Header Hover Dropdowns
const DEPARTMENTS = [
  {
    key: "men",
    label: "Men",
    path: "/products?section=men",
    columns: [
      {
        title: "Topwear",
        items: [
          {
            label: "Casual & Formal Shirts",
            path: "/collection/clothing?section=men&subcategory=shirts",
          },
          {
            label: "T-Shirts & Polos",
            path: "/collection/clothing?section=men&subcategory=t-shirts",
          },
          {
            label: "Kurtas & Ethnic Wear",
            path: "/collection/ethnic-wear?section=men&subcategory=kurtas",
          },
          {
            label: "Jackets & Blazers",
            path: "/collection/clothing?section=men&subcategory=jackets",
          },
        ],
      },
      {
        title: "Bottomwear",
        items: [
          {
            label: "Jeans & Denims",
            path: "/collection/clothing?section=men&subcategory=jeans-jeggings",
          },
          {
            label: "Trousers & Chinos",
            path: "/collection/clothing?section=men&subcategory=trousers-pants",
          },
          {
            label: "Track Pants & Joggers",
            path: "/collection/clothing?section=men&subcategory=track-pants",
          },
        ],
      },
      {
        title: "Footwear & Accessories",
        items: [
          {
            label: "Sneakers & Casual Shoes",
            path: "/collection/footwear?section=men&subcategory=casual-shoes",
          },
          {
            label: "Formal Shoes & Loafers",
            path: "/collection/footwear?section=men&subcategory=formal-shoes",
          },
          {
            label: "Sandals & Floaters",
            path: "/collection/footwear?section=men&subcategory=sandals",
          },
          {
            label: "Belts & Wallets",
            path: "/collection/accessories?section=men&subcategory=wallets",
          },
        ],
      },
    ],
  },
  {
    key: "women",
    label: "Women",
    path: "/products?section=women",
    columns: [
      {
        title: "Ethnic Wear",
        items: [
          {
            label: "Kurtas & Kurtis",
            path: "/collection/ethnic-wear?section=women&subcategory=kurtas",
          },
          {
            label: "Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees",
          },
          {
            label: "Blouses",
            path: "/collection/ethnic-wear?section=women&subcategory=blouses",
          },
          {
            label: "Co-ord Sets",
            path: "/collection/clothing?section=women&subcategory=co-ord-sets",
          },
          {
            label: "Suit Sets & Anarkalis",
            path: "/collection/ethnic-wear?section=women&subcategory=kurta-suit-sets",
          },
        ],
      },
      {
        title: "Saree Styles",
        items: [
          {
            label: "Silk Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=silk-sarees",
          },
          {
            label: "Kanjivaram Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=kanjivaram-sarees",
          },
          {
            label: "Banarasi Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=banarasi-sarees",
          },
          {
            label: "Cotton Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=cotton-sarees",
          },
          {
            label: "Bridal Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=bridal-sarees",
          },
          {
            label: "Party Wear Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=party-wear-sarees",
          },
          {
            label: "Wedding Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=wedding-sarees",
          },
          {
            label: "Festive Wear Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=festive-wear-sarees",
          },
          {
            label: "Daily Wear Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=daily-wear-sarees",
          },
          {
            label: "Lightweight Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=lightweight-sarees",
          },
          {
            label: "Handloom Sarees",
            path: "/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=handloom-sarees",
          },
        ],
      },
      {
        title: "Western Wear",
        items: [
          {
            label: "Dresses & Gowns",
            path: "/collection/clothing?section=women&subcategory=dresses",
          },
          {
            label: "Tops & Shirts",
            path: "/collection/clothing?section=women&subcategory=tops",
          },
          {
            label: "Jeans & Jeggings",
            path: "/collection/clothing?section=women&subcategory=jeans-jeggings",
          },
          {
            label: "Leggings & Palazzos",
            path: "/collection/clothing?section=women&subcategory=leggings",
          },
        ],
      },
      {
        title: "Footwear & Bags",
        items: [
          {
            label: "Heels & Wedges",
            path: "/collection/footwear?section=women&subcategory=heels",
          },
          {
            label: "Flat Sandals & Slides",
            path: "/collection/footwear?section=women&subcategory=flats",
          },
          {
            label: "Handbags & Totes",
            path: "/collection/accessories?section=women&subcategory=handbags",
          },
          {
            label: "Fashion Jewellery",
            path: "/collection/jewellery?section=women",
          },
        ],
      },
    ],
  },
  {
    key: "kids",
    label: "Kids",
    path: "/products?section=kids",
    columns: [
      {
        title: "Boys Fashion",
        items: [
          {
            label: "Shirts & T-Shirts",
            path: "/collection/kids?subcategory=shirts-tshirts&gender=boys",
          },
          {
            label: "Jeans & Shorts",
            path: "/collection/kids?subcategory=jeans-shorts&gender=boys",
          },
          {
            label: "Ethnic Sets",
            path: "/collection/kids?subcategory=ethnic-sets&gender=boys",
          },
        ],
      },
      {
        title: "Girls Fashion",
        items: [
          {
            label: "Dresses & Frocks",
            path: "/collection/kids?subcategory=dresses-frocks&gender=girls",
          },
          {
            label: "Tops & Skirts",
            path: "/collection/kids?subcategory=tops-skirts&gender=girls",
          },
          {
            label: "Ethnic Wear",
            path: "/collection/kids?subcategory=ethnic-sets&gender=girls",
          },
        ],
      },
      {
        title: "Baby & Footwear",
        items: [
          {
            label: "Baby Rompers & Onesies",
            path: "/collection/kids?subcategory=baby-clothes",
          },
          {
            label: "Kids Casual Shoes",
            path: "/collection/kids?subcategory=casual-shoes",
          },
          {
            label: "Kids Sandals & Slippers",
            path: "/collection/kids?subcategory=sandals",
          },
        ],
      },
    ],
  },
  {
    key: "home-living",
    label: "Home & Living",
    path: "/collection/home-living",
    columns: [
      {
        title: "Kitchen & Dining",
        items: [
          {
            label: "Cookware & Utensils",
            path: "/collection/home-living?subcategory=cookware",
          },
          {
            label: "Dinner Sets & Plates",
            path: "/collection/home-living?subcategory=dinner-sets",
          },
          {
            label: "Storage Containers",
            path: "/collection/home-living?subcategory=storage-containers",
          },
          {
            label: "Water Bottles & Flasks",
            path: "/collection/home-living?subcategory=water-bottles-flasks",
          },
        ],
      },
      {
        title: "Home Furnishing",
        items: [
          {
            label: "Bed Linen & Sheets",
            path: "/collection/home-living?subcategory=bedsheets",
          },
          {
            label: "Curtains & Drapes",
            path: "/collection/home-living?subcategory=curtains",
          },
          {
            label: "Cushions & Covers",
            path: "/collection/home-living?subcategory=cushions",
          },
          {
            label: "Blankets & Quilts",
            path: "/collection/home-living?subcategory=blankets-quilts",
          },
        ],
      },
      {
        title: "Home Décor",
        items: [
          {
            label: "Wall Décor & Clocks",
            path: "/collection/home-living?subcategory=wall-decor",
          },
          {
            label: "Vases & Artificial Plants",
            path: "/collection/home-living?subcategory=artificial-flowers-plants",
          },
          {
            label: "Lamps & Lighting",
            path: "/collection/home-living?subcategory=lighting",
          },
          {
            label: "Showpieces & Figurines",
            path: "/collection/home-living?subcategory=showpieces",
          },
        ],
      },
    ],
  },
  {
    key: "beauty",
    label: "Beauty",
    path: "/collection/beauty",
    columns: [
      {
        title: "Skincare",
        items: [
          {
            label: "Face Creams & Moisturizers",
            path: "/collection/beauty?subcategory=face-creams-moisturizers",
          },
          {
            label: "Face Wash & Cleansers",
            path: "/collection/beauty?subcategory=face-wash-cleansers",
          },
          {
            label: "Sunscreen & Serums",
            path: "/collection/beauty?subcategory=sunscreen-serums",
          },
        ],
      },
      {
        title: "Haircare",
        items: [
          {
            label: "Shampoos & Conditioners",
            path: "/collection/beauty?subcategory=shampoo-conditioner",
          },
          {
            label: "Hair Oils & Serums",
            path: "/collection/beauty?subcategory=hair-oils-serums",
          },
        ],
      },
      {
        title: "Fragrances & Grooming",
        items: [
          {
            label: "Perfumes & Deodorants",
            path: "/collection/beauty?subcategory=perfumes-deodorants",
          },
          {
            label: "Body Mists & Sprays",
            path: "/collection/beauty?subcategory=body-mists-sprays",
          },
          {
            label: "Men Grooming & Shaving",
            path: "/collection/beauty?subcategory=men-grooming-shaving",
          },
        ],
      },
    ],
  },
  {
    key: "pooja-items",
    label: "Pooja Items",
    path: "/collection/pooja-items",
    columns: [
      {
        title: "Idols & Mandir",
        items: [
          {
            label: "Brass Idols & Statues",
            path: "/collection/pooja-items?subcategory=idols-statues",
          },
          {
            label: "Home Temple / Mandir",
            path: "/collection/pooja-items?subcategory=home-temple-mandir",
          },
          {
            label: "Puja Thalis & Bells",
            path: "/collection/pooja-items?subcategory=thalis",
          },
          {
            label: "Brass & Silver Items",
            path: "/collection/pooja-items?subcategory=brass-silver-pooja-items",
          },
        ],
      },
      {
        title: "Daily Puja Essentials",
        items: [
          {
            label: "Brass Diyas & Deepams",
            path: "/collection/pooja-items?subcategory=diyas-lamps",
          },
          {
            label: "Incense & Fragrance",
            path: "/collection/pooja-items?subcategory=incense-fragrance",
          },
          {
            label: "Pooja Samagri",
            path: "/collection/pooja-items?subcategory=pooja-samagri",
          },
          {
            label: "Rudraksha & Spiritual",
            path: "/collection/pooja-items?subcategory=rudraksha-spiritual",
          },
          {
            label: "Festival Pooja Kits",
            path: "/collection/pooja-items?subcategory=festival-pooja-kits",
          },
        ],
      },
    ],
  },
  {
    key: "electronics",
    label: "Electronics",
    path: "/collection/electronics",
    columns: [
      {
        title: "Audio & Sound",
        items: [
          {
            label: "Wireless Headphones",
            path: "/collection/electronics?subcategory=headphones",
          },
          {
            label: "Bluetooth Speakers",
            path: "/collection/electronics?subcategory=speakers",
          },
          {
            label: "TWS True Wireless Earbuds",
            path: "/collection/electronics?subcategory=earbuds",
          },
          {
            label: "Soundbars & Home Audio",
            path: "/collection/electronics?subcategory=soundbars",
          },
        ],
      },
      {
        title: "Smart Wearables & Tech",
        items: [
          {
            label: "Smartwatches",
            path: "/collection/electronics?subcategory=smart-wearables",
          },
          {
            label: "Fitness Trackers",
            path: "/collection/electronics?subcategory=fitness-trackers",
          },
          {
            label: "Power Banks",
            path: "/collection/electronics?subcategory=power-banks",
          },
          {
            label: "Chargers & Cables",
            path: "/collection/electronics?subcategory=chargers-cables",
          },
        ],
      },
    ],
  },
  {
    key: "grocery-items",
    label: "Grocery Items",
    path: "/collection/grocery-items",
    columns: [
      {
        title: "Staples & Cooking",
        items: [
          { label: "Staples & Grains", path: "/collection/grocery-items?subcategory=staples-grains" },
          { label: "Dals & Pulses", path: "/collection/grocery-items?subcategory=dals-pulses" },
          { label: "Edible Oils & Ghee", path: "/collection/grocery-items?subcategory=edible-oils-ghee" },
          { label: "Spices & Masalas", path: "/collection/grocery-items?subcategory=spices-masalas" },
          { label: "Salt, Sugar & Jaggery", path: "/collection/grocery-items?subcategory=salt-sugar" },
        ],
      },
      {
        title: "Snacks & Breakfast",
        items: [
          { label: "Dry Fruits & Nuts", path: "/collection/grocery-items?subcategory=dry-fruits-nuts" },
          { label: "Breakfast & Cereals", path: "/collection/grocery-items?subcategory=breakfast-cereals" },
          { label: "Biscuits & Cookies", path: "/collection/grocery-items?subcategory=biscuits-cookies" },
          { label: "Snacks & Namkeen", path: "/collection/grocery-items?subcategory=snacks-namkeen" },
          { label: "Bakery Products", path: "/collection/grocery-items?subcategory=bakery-products" },
        ],
      },
      {
        title: "Beverages & Dairy",
        items: [
          { label: "Tea & Coffee", path: "/collection/grocery-items?subcategory=tea-coffee" },
          { label: "Beverages & Juices", path: "/collection/grocery-items?subcategory=beverages" },
          { label: "Dairy & Eggs", path: "/collection/grocery-items?subcategory=dairy-eggs" },
          { label: "Fresh Fruits", path: "/collection/grocery-items?subcategory=fresh-fruits" },
          { label: "Fresh Vegetables", path: "/collection/grocery-items?subcategory=fresh-vegetables" },
        ],
      },
      {
        title: "Instant & Frozen",
        items: [
          { label: "Instant & Ready-to-Eat", path: "/collection/grocery-items?subcategory=instant-ready-to-eat" },
          { label: "Sauces & Spreads", path: "/collection/grocery-items?subcategory=sauces-spreads" },
          { label: "Frozen Foods", path: "/collection/grocery-items?subcategory=frozen-foods" },
          { label: "Meat & Seafood", path: "/collection/grocery-items?subcategory=meat-seafood" },
          { label: "Baby Food", path: "/collection/grocery-items?subcategory=baby-food" },
        ],
      },
    ],
  },
  {
    key: "pet-accessories",
    label: "Pet Accessories",
    path: "/collection/pet-accessories",
    columns: [
      {
        title: "Dog Supplies",
        items: [
          { label: "Dog Food & Nutrition", path: "/collection/pet-accessories?subcategory=dog-food" },
          { label: "Dog Treats & Chews", path: "/collection/pet-accessories?subcategory=dog-treats" },
          { label: "Collars, Leashes & Harnesses", path: "/collection/pet-accessories?subcategory=dog-collars-leashes" },
          { label: "Dog Toys & Play", path: "/collection/pet-accessories?subcategory=dog-toys" },
          { label: "Dog Beds & Crates", path: "/collection/pet-accessories?subcategory=dog-beds" },
        ],
      },
      {
        title: "Cat Supplies",
        items: [
          { label: "Cat Food & Treats", path: "/collection/pet-accessories?subcategory=cat-food" },
          { label: "Cat Litter & Trays", path: "/collection/pet-accessories?subcategory=cat-litter" },
          { label: "Scratchers & Trees", path: "/collection/pet-accessories?subcategory=cat-scratchers" },
          { label: "Cat Toys & Teasers", path: "/collection/pet-accessories?subcategory=cat-toys" },
          { label: "Cat Collars & Harnesses", path: "/collection/pet-accessories?subcategory=cat-collars" },
        ],
      },
      {
        title: "Grooming & Feeding",
        items: [
          { label: "Pet Shampoos & Hygiene", path: "/collection/pet-accessories?subcategory=pet-shampoo" },
          { label: "Brushes & Deshedders", path: "/collection/pet-accessories?subcategory=pet-brushes" },
          { label: "Nail Clippers & Trimmers", path: "/collection/pet-accessories?subcategory=nail-clippers" },
          { label: "Feeding Bowls & Fountains", path: "/collection/pet-accessories?subcategory=pet-bowls" },
          { label: "Birds, Fish & Small Pets", path: "/collection/pet-accessories?subcategory=birds-fish-supplies" },
        ],
      },
    ],
  },
  {
    key: "flea-market",
    label: "🌾 Flea Market",
    path: "/flea-market",
    isHighlighted: true,
    columns: [
      {
        title: "B2B Commodity Exchange",
        items: [
          { label: "All Commodities", path: "/flea-market" },
          { label: "Black Pepper & Spices", path: "/flea-market?category=spices" },
          { label: "Arabica & Robusta Coffee", path: "/flea-market?category=coffee" },
          { label: "Assam & Nilgiri Tea", path: "/flea-market?category=tea" },
          { label: "Whole White Cashews", path: "/flea-market?category=dry_fruits" },
          { label: "Exchange Terms & Escrow", path: "/flea-market/terms" }
        ],
      },
      {
        title: "Live Video Negotiation",
        items: [
          { label: "Schedule Producer Conference", path: "/flea-market" },
          { label: "Direct Farmer Video Call", path: "/flea-market" },
          { label: "Bargain Contracts & Terms", path: "/flea-market/terms" },
        ],
      },
    ],
  },
  {
    key: "tickets",
    label: "🎟️ Tickets",
    path: "/tickets",
    isHighlighted: true,
    columns: [
      {
        title: "Cinemas & Events",
        items: [
          { label: "Now Showing Movies", path: "/tickets" },
          { label: "Coming Soon & Trailers", path: "/tickets?upcoming=true" },
          { label: "Partner Theatres & IMAX", path: "/tickets" },
          { label: "Cinema Food & Combos", path: "/tickets" },
        ],
      },
      {
        title: "Passes & Dashboards",
        items: [
          { label: "My Booked Tickets", path: "/tickets/my-tickets" },
          { label: "Theatre Owner Portal", path: "/tickets/owner" },
          { label: "Tickets Admin Console", path: "/tickets/admin" },
        ],
      },
    ],
  },
];

const SEARCH_CATEGORIES = [
  { label: "All Departments", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
  { label: "Grocery Items", value: "grocery-items" },
  { label: "Pet Accessories", value: "pet-accessories" },
  { label: "Electronics", value: "electronics" },
  { label: "Pooja Items", value: "pooja-items" },
  { label: "Home & Living", value: "home-living" },
  { label: "Beauty", value: "beauty" },
  { label: "🌾 Flea Market", value: "flea-market" },
  { label: "🎟️ Tickets", value: "tickets" },
  { label: "Deals & Clearance", value: "deals" },
];

const NavMain = ({ isTransparent = false, isHome = false }) => {
  const {
    cartCount,
    cartFlyAnim,
    wishlist,
    setCartDrawerOpen,
    setWishlistDrawerOpen,
    selectedCountry,
    changeCountry,
    countriesList,
    formatPrice,
    t,
  } = useShop();

  const { user, logout: localLogout } = useAuth();
  const { products: sellerProducts } = useContext(ProductContext) || {};
  const location = useLocation();
  const navigate = useNavigate();

  // Local UI states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [cartBouncing, setCartBouncing] = useState(false);
  const [wishlistHeartClicked, setWishlistHeartClicked] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState({ products: [] });
  const [activeDept, setActiveDept] = useState(null);
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const searchRef = useRef(null);
  const countryRef = useRef(null);
  const accountRef = useRef(null);
  const notificationsRef = useRef(null);
  const deptMenuTimer = useRef(null);

  // Close overlays on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setSearchOpen(false);
    setActiveDept(null);
    setShowCountryMenu(false);
    setShowAccountMenu(false);
    setNotificationsOpen(false);
  }, [location.pathname, location.search]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setShowCountryMenu(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccountMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search query autocomplete fetch (snappy debounce)
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
        console.warn("Search suggestion error:", err);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch user notifications
  const fetchNotifications = async () => {
    const custId = user ? user.customer_id || user.id : "all";
    const res = await getCustomerNotifications(custId);
    if (res && res.success) {
      setNotifications(res.data || []);
      setUnreadCount((res.data || []).filter((n) => !n.is_read).length);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 20000);
    return () => clearInterval(interval);
  }, [user]);

  // Realtime SSE notification listener
  useEffect(() => {
    const custId = user ? user.customer_id || user.id : "all";

    const unsubTicket = realtimeService.on("ticket_status", (data) => {
      notificationService
        .createNotification({
          customerId: custId,
          title: `Ticket Updated: ${data?.ticket_id || "Support"}`,
          message: `Status is now ${data?.status || "Updated"}. ${data?.admin_reply ? `Resolution: ${data.admin_reply}` : "Our support staff has updated your ticket."}`,
          type: "TICKET_STATUS",
          link: "/support",
        })
        .then(() => fetchNotifications());
    });

    const unsubNewTicket = realtimeService.on("new_ticket", (data) => {
      notificationService
        .createNotification({
          customerId: custId,
          title: `Ticket Logged: ${data?.ticket_id || "New Issue"}`,
          message: `Subject: "${data?.subject || "Support issue"}". 4-hour SLA response target active.`,
          type: "TICKET_NEW",
          link: "/support",
        })
        .then(() => fetchNotifications());
    });

    const unsubOrder = realtimeService.on("order_update", (data) => {
      notificationService
        .createNotification({
          customerId: custId,
          title: `Order Update #${data?.order_id || "Shipment"}`,
          message: `Shipment status is now ${data?.status || "In Transit"}. 97.8% On-Time Delivery guarantee active.`,
          type: "ORDER_UPDATE",
          link: "/my-orders",
        })
        .then(() => fetchNotifications());
    });

    const unsubPayout = realtimeService.on("payout_processed", (data) => {
      notificationService
        .createNotification({
          customerId: custId,
          title: `Seller Payout Processed`,
          message: `Settlement of ₹${Number(data?.amount || 0).toLocaleString("en-IN")} dispatched. UTR #${data?.utr || "REF"}.`,
          type: "PAYOUT",
          link: "/seller/dashboard",
        })
        .then(() => fetchNotifications());
    });

    return () => {
      unsubTicket();
      unsubNewTicket();
      unsubOrder();
      unsubPayout();
    };
  }, [user]);

  const handleMarkAsRead = async (id) => {
    const res = await markNotificationAsRead(id);
    if (res.success) fetchNotifications();
  };

  const handleMarkAllAsRead = async () => {
    const custId = user ? user.customer_id || user.id : "all";
    const res = await markAllNotificationsAsRead(custId);
    if (res.success) fetchNotifications();
  };

  // Listen to cartFlyAnim to bounce the navbar cart badge
  useEffect(() => {
    if (cartFlyAnim) {
      setCartBouncing(true);
      const timer = setTimeout(() => setCartBouncing(false), 1750);
      return () => clearTimeout(timer);
    }
  }, [cartFlyAnim]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchOpen(false);
    setMobileSearchOpen(false);
    const query = searchQuery.trim();
    if (searchCategory && searchCategory !== "all") {
      if (searchCategory === "deals") {
        navigate(
          `/deals${query ? `?search=${encodeURIComponent(query)}` : ""}`,
        );
      } else {
        navigate(
          `/products?category=${encodeURIComponent(searchCategory)}${query ? `&search=${encodeURIComponent(query)}` : ""}`,
        );
      }
    } else if (query) {
      const targetUrl = buildSearchNavigationUrl(query, sellerProducts);
      navigate(targetUrl);
    } else {
      navigate("/products");
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    localLogout();
    navigate("/login");
  };

  const handleDeptMouseEnter = (deptKey) => {
    clearTimeout(deptMenuTimer.current);
    setActiveDept(deptKey);
  };

  const handleDeptMouseLeave = () => {
    clearTimeout(deptMenuTimer.current);
    deptMenuTimer.current = setTimeout(() => {
      setActiveDept(null);
    }, 180);
  };

  const POPULAR_SEARCHES = [
    "Pure Silk Sarees",
    "Brass Diya",
    "Noise Cancelling Headphones",
    "Linen Shirts",
    "Smartwatch",
    "Pooja Samagri",
  ];

  const renderDeptHoverIcon = (deptKey) => {
    switch (deptKey) {
      case "men":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-orange-600 anim-man">
            <circle cx="10" cy="5.5" r="2.8" />
            <path d="M4.5 17v-1.5a3.5 3.5 0 0 1 3.5-3.5h4a3.5 3.5 0 0 1 3.5 3.5V17" />
            <path d="M9.2 9.5l.8 2 .8-2" strokeWidth="1.2" />
          </svg>
        );
      case "women":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-rose-500 anim-woman">
            <circle cx="10" cy="5.5" r="2.8" />
            <path d="M4 17l2.5-6h7L16 17" />
            <path d="M7.5 6.5c0-1.8 1.1-2.8 2.5-2.8s2.5 1 2.5 2.8" strokeWidth="1.2" />
          </svg>
        );
      case "kids":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-amber-500 anim-kid">
            <circle cx="10" cy="7" r="3" />
            <path d="M7 5.5c0-1.6 1.3-2.5 3-2.5s3 .9 3 2.5" />
            <path d="M12.5 5.2l2 .8" />
            <path d="M5.5 17v-1.5a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3V17" />
          </svg>
        );
      case "home-living":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-orange-500 anim-home">
            <path d="M3 8.5l7-5.5 7 5.5v8.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 17V8.5z" />
            <path d="M8 17v-5h4v5" />
          </svg>
        );
      case "beauty":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-pink-500 anim-beauty">
            <path d="M7 17v-6h4v6H7z" />
            <path d="M7.8 11l2-4 1.2.6v3.4" />
            <path d="M14.5 4.5l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z" fill="currentColor" stroke="none" />
          </svg>
        );
      case "pooja-items":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-amber-500 anim-diya">
            <path d="M10 2c-.8 1.8-2 3-2 4.5a2 2 0 1 0 4 0c0-1.5-1.2-2.7-2-4.5z" fill="currentColor" fillOpacity="0.25" />
            <path d="M3.5 12c0 3 2.9 5.5 6.5 5.5s6.5-2.5 6.5-5.5H3.5z" />
            <line x1="2.5" y1="12" x2="17.5" y2="12" />
          </svg>
        );
      case "electronics":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-cyan-500 anim-tech">
            <path d="M3 13V9.5a7 7 0 0 1 14 0V13" />
            <rect x="2" y="11.5" width="3" height="4.5" rx="1.5" fill="currentColor" fillOpacity="0.25" />
            <rect x="15" y="11.5" width="3" height="4.5" rx="1.5" fill="currentColor" fillOpacity="0.25" />
          </svg>
        );
      case "grocery-items":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-500 anim-grocery">
            <path d="M4.5 7L3 17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1L15.5 7H4.5z" />
            <path d="M7 9V5a3 3 0 0 1 6 0v4" />
          </svg>
        );
      case "pet-accessories":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-amber-600 anim-paw">
            <circle cx="6" cy="7" r="1.3" fill="currentColor" />
            <circle cx="10" cy="5.2" r="1.3" fill="currentColor" />
            <circle cx="14" cy="7" r="1.3" fill="currentColor" />
            <path d="M6.5 13.5c0-2 1.6-3.8 3.5-3.8s3.5 1.8 3.5 3.8c0 1.5-1.2 2.5-3.5 2.5s-3.5-1-3.5-2.5z" fill="currentColor" fillOpacity="0.25" />
          </svg>
        );
      case "deals":
        return (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-rose-500 anim-deals">
            <path d="M7.5 12.5A2 2 0 0 0 9.5 10c0-1.2-.4-1.8-.8-2.6-.9-1.8-.2-3.4 1.6-5.1.4 2.1 1.7 4.1 3.4 5.5 1.7 1.4 2.5 3 2.5 4.7a6 6 0 1 1-12 0c0-1 .4-2 .8-2.6a2 2 0 0 0 2.5 2.6z" fill="currentColor" fillOpacity="0.25" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderDeptAnimatedIcon = (deptKey) => {
    switch (deptKey) {
      case "men":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-orange-600 group-hover:anim-man transition-transform duration-200">
            <circle cx="12" cy="6" r="3.5" />
            <path d="M7 21v-3a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v3" />
            <path d="M11 10.5l1 2.5l1-2.5" />
            <path d="M12 13v3" />
          </svg>
        );
      case "women":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-rose-500 group-hover:anim-woman transition-transform duration-200">
            <circle cx="12" cy="6" r="3.5" />
            <path d="M6.5 21l2.5-7h6l2.5 7" />
            <path d="M9 14a3 3 0 0 0 6 0" />
          </svg>
        );
      case "kids":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-amber-500 group-hover:anim-kid transition-transform duration-200">
            <circle cx="12" cy="8" r="4" />
            <path d="M9.5 7.5h.01M14.5 7.5h.01" strokeWidth="3" />
            <path d="M10 10.5c.7.7 2.3.7 3 0" />
            <path d="M8 21v-3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3" />
          </svg>
        );
      case "home-living":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-orange-500 group-hover:anim-home transition-transform duration-200">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case "beauty":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-pink-500 group-hover:anim-beauty transition-transform duration-200">
            <path d="M12 2l2.4 5.6L20 10l-4.4 3.8L16.8 20 12 16.8 7.2 20l1.2-6.2L4 10l5.6-2.4z" />
          </svg>
        );
      case "pooja-items":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-amber-500 group-hover:anim-diya transition-transform duration-200">
            <path d="M12 2c-.6 2-2 3.5-2 5.5a2 2 0 1 0 4 0c0-2-1.4-3.5-2-5.5z" fill="currentColor" fillOpacity="0.25" />
            <path d="M4 14c0 4 3.5 7 8 7s8-3 8-7H4z" />
            <path d="M3 14h18" />
          </svg>
        );
      case "electronics":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-cyan-500 group-hover:anim-tech transition-transform duration-200">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        );
      case "grocery-items":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-emerald-500 group-hover:anim-grocery transition-transform duration-200">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case "pet-accessories":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-amber-600 group-hover:anim-paw transition-transform duration-200">
            <circle cx="11" cy="4" r="2" />
            <circle cx="18" cy="8" r="2" />
            <circle cx="20" cy="16" r="2" />
            <path d="M9 10a5 5 0 0 1 5 5v3.5a2.5 2.5 0 0 1-5 0V15a2 2 0 0 0-2-2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1z" />
          </svg>
        );
      case "deals":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:text-rose-500 group-hover:animate-pulse transition-transform duration-200">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        );
      case "flea-market":
        return (
          <span className="text-xs group-hover:scale-110 transition-transform">🌾</span>
        );
      case "tickets":
        return (
          <span className="text-xs group-hover:scale-110 transition-transform">🎟️</span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full flex flex-col transition-colors duration-200 ${isTransparent ? "bg-transparent text-white" : "bg-white text-stone-900"}`}
    >
      {/* ======================================================== */}
      {/* LINE 1: MAIN E-COMMERCE HEADER (Generous Size)          */}
      {/* ======================================================== */}
      <div
        className={`w-full transition-colors duration-200 ${isTransparent ? "border-b border-white/10 bg-transparent" : "border-b border-stone-100 bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 md:gap-6">
          {/* 1. Left Group: Mobile Toggle, Brand Logo & Delivery Destination */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-6 flex-shrink-0">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer ${
                isTransparent
                  ? "text-white hover:bg-white/20"
                  : "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0 focus:outline-none group"
            >
              <img
                src={gmdLogo}
                alt="GoMo Deals"
                className="h-11 sm:h-12 md:h-13 lg:h-14 w-auto object-contain transition-transform duration-150 group-hover:scale-105 filter drop-shadow-sm"
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
                className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all duration-150 text-left cursor-pointer group active:scale-98 ${
                  isTransparent
                    ? "border-transparent hover:border-white/20 hover:bg-white/10"
                    : "border-transparent hover:border-stone-200/60 hover:bg-stone-50"
                }`}
              >
                <MapPin
                  size={18}
                  className="text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-150"
                />
                <div className="flex flex-col leading-tight">
                  <span
                    className={`text-[9px] uppercase tracking-wider font-extrabold ${isTransparent ? "text-white/70" : "text-stone-400"}`}
                  >
                    {t("deliver_to", "Deliver to")}
                  </span>
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${isTransparent ? "text-white" : "text-stone-800"}`}
                  >
                    <span>{selectedCountry?.name || "India"}</span>
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-150 ${showCountryMenu ? "rotate-180" : ""} ${isTransparent ? "text-white/60" : "text-stone-400"}`}
                    />
                  </span>
                </div>
              </button>

              {/* Country/Location Dropdown */}
              <AnimatePresence>
                {showCountryMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-56 bg-white text-stone-900 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.14)] border border-stone-100 p-2 z-50"
                  >
                    <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 px-3 py-1.5 border-b border-stone-100 mb-1">
                      {t("select_delivery_region", "Select Delivery Region")}
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
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors duration-100 cursor-pointer ${
                            selectedCountry?.name === c.name
                              ? "bg-orange-50 text-orange-600 font-bold"
                              : "text-stone-700 hover:bg-stone-50"
                          }`}
                        >
                          <span className="font-medium">{c.name}</span>
                          <span className="font-bold text-stone-500">
                            {c.currency} ({c.symbol})
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 2. Center: Large, Prominent Search Bar (Desktop) */}
          <div
            ref={searchRef}
            className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl relative mx-2"
          >
            <form
              onSubmit={handleSearchSubmit}
              className={`w-full flex items-center rounded-full h-11 transition-all duration-150 ${
                isTransparent
                  ? "bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-white/70 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/15"
                  : "bg-stone-50/90 border-2 border-stone-200/90 hover:border-orange-300 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 shadow-xs"
              }`}
            >
              {/* Search Input Field */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder={t("search_placeholder_full", "Search products, brands, deals & essentials...")}
                className={`bg-transparent text-sm pl-5 pr-3.5 w-full focus:outline-none font-normal ${
                  isTransparent
                    ? "text-white placeholder:text-white/75 focus:text-stone-900"
                    : "text-stone-900 placeholder:text-stone-400"
                }`}
              />

              {/* Clear Input Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchOpen(false);
                  }}
                  className={`p-1.5 rounded-full cursor-pointer mr-1 transition-all duration-100 hover:scale-110 active:scale-90 ${isTransparent ? "text-white/80 hover:text-white" : "text-stone-400 hover:text-stone-700"}`}
                >
                  <X size={15} />
                </button>
              )}

              {/* Search Submit Button */}
              <button
                type="submit"
                className="h-full px-6 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] active:scale-95 text-white rounded-r-full flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer flex-shrink-0 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md hover:shadow-[#f76e28]/25"
                aria-label="Search"
              >
                <Search size={16} strokeWidth={2.5} />
                <span className="hidden lg:inline">{t("search", "Search")}</span>
              </button>
            </form>

            {/* Instant Fast Search Suggestions Popover */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.99 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="absolute top-full left-0 w-full mt-2 bg-white text-stone-900 rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.16)] border border-stone-100 p-3.5 z-50 overflow-hidden"
                >
                  {searchQuery.trim() !== "" ? (
                    <>
                      {/* Respective Category Match Banner */}
                      {(() => {
                        const activeCategoryMatch = searchSuggestions.categoryMatch || findRespectiveCategoryMatch(searchQuery, sellerProducts);
                        if (!activeCategoryMatch?.categorySlug) return null;
                        return (
                          <div className="mb-2.5 p-2.5 rounded-xl bg-gradient-to-r from-orange-50 via-amber-50/50 to-orange-50 border border-orange-200/90 shadow-2xs">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-[#f76e28] text-white flex items-center justify-center shrink-0 shadow-xs">
                                  <Sparkles size={14} />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-950">
                                      Respective Category:
                                    </span>
                                    <span className="text-xs font-black text-stone-900 bg-white px-2 py-0.5 rounded-md border border-orange-200 shadow-2xs">
                                      {activeCategoryMatch.categoryLabel}
                                    </span>
                                    {activeCategoryMatch.subcategoryLabel && (
                                      <span className="text-[11px] font-bold text-stone-600">
                                        › {activeCategoryMatch.subcategoryLabel}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchOpen(false);
                                  setMobileSearchOpen(false);
                                  navigate(buildSearchNavigationUrl(searchQuery, sellerProducts));
                                }}
                                className="px-3 py-1.5 bg-[#f76e28] hover:bg-[#de5713] text-white rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 shadow-xs hover:shadow active:scale-95"
                              >
                                <span>Explore</span>
                                <ArrowRight size={13} />
                              </button>
                            </div>

                            {/* Additional Matching Categories (if multiple exist) */}
                            {searchSuggestions.categories && searchSuggestions.categories.length > 1 && (
                              <div className="mt-2 pt-2 border-t border-orange-200/60 flex items-center gap-1.5 flex-wrap">
                                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-stone-500 mr-0.5">
                                  Also In:
                                </span>
                                {searchSuggestions.categories
                                  .filter(c => c.slug !== activeCategoryMatch.categorySlug)
                                  .slice(0, 3)
                                  .map(c => (
                                    <button
                                      key={c.slug}
                                      type="button"
                                      onClick={() => {
                                        setSearchOpen(false);
                                        setMobileSearchOpen(false);
                                        navigate(`/products?category=${encodeURIComponent(c.slug)}&search=${encodeURIComponent(searchQuery.trim())}`);
                                      }}
                                      className="text-[10px] font-bold bg-white hover:bg-orange-100 hover:text-orange-700 text-stone-700 px-2 py-0.5 rounded border border-orange-200/60 transition-colors cursor-pointer"
                                    >
                                      {c.label || c.name || c.slug} ({c.count || 0})
                                    </button>
                                  ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 px-2 pb-2 border-b border-stone-100 mb-2 flex items-center justify-between">
                        <span>Matching Products</span>
                        <span>
                          {searchSuggestions.products?.length || 0} items found
                        </span>
                      </div>
                      <div className="max-h-72 overflow-y-auto space-y-1 custom-scrollbar">
                        {searchSuggestions.products &&
                        searchSuggestions.products.length > 0 ? (
                          searchSuggestions.products.slice(0, 6).map((item) => (
                            <Link
                              key={item.id || item.product_id}
                              to={`/product/${item.product_id || item.id}`}
                              onClick={() => {
                                setSearchQuery("");
                                setSearchOpen(false);
                              }}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-50/60 transition-all duration-100 group text-left"
                            >
                              <img
                                src={getProductImage(item)}
                                alt={item.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = getProductImage(item);
                                }}
                                className="w-11 h-11 rounded-lg object-cover bg-stone-100 border border-stone-200/60 flex-shrink-0 group-hover:scale-105 transition-transform duration-150"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-stone-800 truncate group-hover:text-orange-600 transition-colors">
                                  {item.name || item.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs font-black text-stone-900">
                                    {formatPrice(item.price)}
                                  </span>
                                  {item.category && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                                      {item.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ArrowRight
                                size={14}
                                className="text-stone-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-150 shrink-0"
                              />
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
                        className="w-full mt-2 pt-2 border-t border-stone-100 text-center text-xs font-bold text-orange-600 hover:text-orange-700 py-1.5 transition-colors cursor-pointer block rounded-lg hover:bg-orange-50"
                      >
                        {(() => {
                          const activeCategoryMatch = searchSuggestions.categoryMatch || findRespectiveCategoryMatch(searchQuery, sellerProducts);
                          return activeCategoryMatch?.categoryLabel ? (
                            <span>{t("view_all_results_in", { category: activeCategoryMatch.categoryLabel })}</span>
                          ) : (
                            <span>{t("view_all_search_results", "View all search results →")}</span>
                          );
                        })()}
                      </button>
                    </>
                  ) : (
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 px-2 pb-2 mb-2 flex items-center justify-between">
                        <span>{t("popular_searches", "Popular Searches")}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {POPULAR_SEARCHES.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              setSearchQuery(term);
                              navigate(
                                `/products?search=${encodeURIComponent(term)}`,
                              );
                              setSearchOpen(false);
                            }}
                            className="text-xs bg-stone-100 hover:bg-orange-50 hover:text-orange-600 text-stone-700 font-medium px-3 py-1.5 rounded-full transition-all duration-100 active:scale-95 cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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
                isTransparent
                  ? "text-white hover:bg-white/20"
                  : "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
              }`}
              aria-label="Toggle mobile search"
            >
              <Search size={20} />
            </button>



            {/* Become a Seller Action */}
            <Link
              to="/seller"
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs ${
                isTransparent
                  ? "border-white/30 bg-white/10 text-white hover:bg-[#f76e28] hover:border-[#f76e28]"
                  : "border-orange-200 bg-orange-50/80 text-[#f76e28] hover:bg-[#f76e28] hover:text-white hover:border-[#f76e28]"
              }`}
              title="Become a Seller on GoMo Deals"
            >
              <Store size={14} />
              <span>Become a Seller</span>
            </Link>

            {/* Notifications Bell */}
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setShowAccountMenu(false);
                  setShowCountryMenu(false);
                }}
                className={`p-2 rounded-xl transition-all duration-200 cursor-pointer relative group hover:scale-105 active:scale-95 hover-bell-shake ${
                  isTransparent
                    ? "text-white hover:bg-white/15"
                    : "text-stone-700 hover:text-orange-600 hover:bg-orange-50/70"
                }`}
                aria-label="View notifications"
                id="navbar-notification-bell"
              >
                <Bell size={20} className="transition-all duration-300 origin-top group-hover:text-orange-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white shadow-sm animate-pulse group-hover:scale-110 group-hover:ring-orange-200 transition-transform duration-200">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white text-stone-900 rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.18)] border border-stone-200/80 z-50 overflow-hidden"
                  >
                    <div className="p-3.5 bg-stone-50/80 border-b border-stone-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell size={15} className="text-orange-600" />
                        <span className="text-xs font-bold text-stone-900">
                          Notification Center
                        </span>
                        {unreadCount > 0 && (
                          <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadCount} unread
                          </span>
                        )}
                      </div>
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllAsRead}
                          className="text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          {t("mark_all_read", "Mark all read")}
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((n) => {
                          const typeStr = (n.type || "").toLowerCase();
                          const isTicket = typeStr.includes("ticket");
                          const isOrder = typeStr.includes("order");
                          const isSla = typeStr.includes("sla");
                          const isPayout =
                            typeStr.includes("payout") ||
                            typeStr.includes("store");

                          return (
                            <div
                              key={n.notification_id || n.id}
                              onClick={() => {
                                handleMarkAsRead(n.notification_id || n.id);
                                if (n.link) {
                                  setNotificationsOpen(false);
                                  navigate(n.link);
                                }
                              }}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex gap-2.5 ${
                                !n.is_read
                                  ? "bg-orange-50/40 border-orange-200/70 hover:bg-orange-50/70 shadow-xs"
                                  : "bg-white border-stone-100 hover:bg-stone-50/80"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-xl flex-shrink-0 h-fit mt-0.5 ${
                                  isTicket
                                    ? "bg-sky-100 text-sky-700"
                                    : isOrder
                                      ? "bg-orange-100 text-orange-700"
                                      : isSla
                                        ? "bg-emerald-100 text-emerald-700"
                                        : isPayout
                                          ? "bg-purple-100 text-purple-700"
                                          : "bg-stone-100 text-stone-700"
                                }`}
                              >
                                {isTicket ? (
                                  <HelpCircle size={14} />
                                ) : isOrder ? (
                                  <Truck size={14} />
                                ) : isSla ? (
                                  <ShieldCheck size={14} />
                                ) : isPayout ? (
                                  <Store size={14} />
                                ) : (
                                  <Tag size={14} />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                {n.title && (
                                  <p className="text-xs font-bold text-stone-900 leading-snug line-clamp-1">
                                    {n.title}
                                  </p>
                                )}
                                <p className="text-[11px] text-stone-600 leading-relaxed mt-0.5 line-clamp-2">
                                  {n.message}
                                </p>
                                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-stone-100 text-[9px] text-stone-400">
                                  <span>
                                    {new Date(
                                      n.created_at || Date.now(),
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    •{" "}
                                    {new Date(
                                      n.created_at || Date.now(),
                                    ).toLocaleDateString()}
                                  </span>
                                  {!n.is_read && (
                                    <span className="text-orange-600 font-bold">
                                      Unread
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-8 text-center text-xs text-stone-400 flex flex-col items-center justify-center gap-2">
                          <Bell size={24} className="text-stone-300" />
                          <span>No notifications yet</span>
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t border-stone-100 bg-stone-50/50 text-center">
                      <Link
                        to="/my-orders"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-[11px] font-bold text-stone-700 hover:text-orange-600 transition-colors"
                      >
                        View all orders &amp; support activity &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Button - Direct to Full Page */}
            <button
              type="button"
              onClick={() => {
                setWishlistHeartClicked(true);
                setTimeout(() => setWishlistHeartClicked(false), 900);
                navigate("/wishlist");
              }}
              className={`p-2 rounded-xl transition-all duration-200 cursor-pointer relative group hover:scale-110 active:scale-90 hover-heart-beat ${
                isTransparent
                  ? "text-white hover:bg-white/15"
                  : "text-stone-700 hover:text-rose-500 hover:bg-rose-50/80"
              }`}
              aria-label="View wishlist"
            >
              <Heart 
                size={20} 
                className={`transition-all duration-200 origin-center ${
                  wishlistHeartClicked || (wishlist && wishlist.length > 0)
                    ? "fill-rose-500 text-rose-500 scale-105 animate-heart-pop"
                    : "group-hover:fill-rose-500/25 group-hover:text-rose-500 group-hover:scale-110"
                }`}
              />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button (Prominent & Animated on Add to Cart) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              animate={
                cartBouncing
                  ? {
                      scale: [1, 1.2, 0.95, 1.1, 1],
                      boxShadow: [
                        "0 0 0 rgba(247, 110, 40, 0)",
                        "0 0 20px rgba(247, 110, 40, 0.6)",
                        "0 0 0 rgba(247, 110, 40, 0)",
                      ],
                    }
                  : { scale: 1 }
              }
              transition={{ duration: 0.2 }}
              onClick={() => setCartDrawerOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-200 cursor-pointer relative group shadow-2xs hover:shadow-[0_6px_20px_rgba(247,110,40,0.32)] ${
                isTransparent
                  ? "bg-white/20 hover:bg-orange-600 border-white/30 text-white"
                  : "bg-orange-50 hover:bg-orange-600 border-orange-200/80 text-stone-800 hover:text-white"
              }`}
              aria-label="View shopping cart"
            >
              <div className="relative">
                <ShoppingBag
                  size={20}
                  className={`${isTransparent ? "text-white" : "text-orange-600 group-hover:text-white"} transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110`}
                />
                {cartCount > 0 && (
                  <motion.span
                    animate={
                      cartBouncing
                        ? { scale: [1, 1.45, 0.9, 1.2, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="absolute -top-1.5 -right-1.5 bg-orange-600 group-hover:bg-white text-white group-hover:text-orange-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white group-hover:scale-110 transition-transform duration-200 shadow-2xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <span
                className={`hidden sm:inline text-xs font-bold uppercase tracking-wider transition-colors ${isTransparent ? "text-white" : "text-orange-950 group-hover:text-white"}`}
              >
                {t("shopping_cart", "Cart")}
              </span>
            </motion.button>

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
                  isTransparent
                    ? "hover:bg-white/15"
                    : "hover:bg-stone-50 hover:border-stone-200/60"
                }`}
                aria-label="Account options"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isTransparent
                      ? "bg-white/20 text-white group-hover:bg-white/30"
                      : "bg-stone-100 text-stone-700 group-hover:text-orange-600"
                  }`}
                >
                  <User size={18} />
                </div>
                <div className="hidden xl:flex flex-col leading-tight">
                  <span
                    className={`text-[9px] uppercase tracking-wider font-extrabold ${isTransparent ? "text-white/70" : "text-stone-400"}`}
                  >
                    {user ? "Account" : "Welcome"}
                  </span>
                  <span
                    className={`text-xs font-bold flex items-center gap-0.5 ${isTransparent ? "text-white" : "text-stone-800"}`}
                  >
                    <span>
                      {user
                        ? user.name
                          ? user.name.split(" ")[0]
                          : "My Account"
                        : "Sign In"}
                    </span>
                    <ChevronDown
                      size={11}
                      className={
                        isTransparent ? "text-white/60" : "text-stone-400"
                      }
                    />
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {showAccountMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white text-stone-900 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.18)] border border-stone-200/80 p-2.5 z-50 divide-y divide-stone-100"
                  >
                    {user ? (
                      <>
                        {/* Authenticated User Header Card */}
                        <div className="px-2 py-2 mb-1 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#f76e28] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                            {(user.name || user.email || "U")[0].toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-stone-900 truncate">
                                {user.name || "Shopper"}
                              </p>
                              <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[9px] font-black uppercase tracking-wider shrink-0">
                                VIP
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-400 truncate mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        {/* Core E-Commerce Account Links */}
                        <div className="py-1.5 space-y-0.5">
                          <Link
                            to="/profile"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <User size={14} className="text-orange-600" />
                              <span>{t("my_profile_address", "My Profile & Address")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-stone-300"
                            />
                          </Link>
                          <Link
                            to="/my-orders"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Package size={14} className="text-orange-600" />
                              <span>{t("orders_returns", "Orders & Returns")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-stone-300"
                            />
                          </Link>
                          <Link
                            to="/membership"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Sparkles size={14} className="text-purple-500" />
                              <span>{t("vip_membership", "GoMo VIP Membership")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-stone-300"
                            />
                          </Link>
                          <Link
                            to="/legal/faqs"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Headphones size={14} className="text-sky-500" />
                              <span>{t("customer_care_247", "24x7 Customer Care")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-stone-300"
                            />
                          </Link>
                        </div>

                        {/* Become a Seller / Seller Hub */}
                        <div className="py-1 border-t border-stone-100 space-y-0.5">
                          <Link
                            to="/seller"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#f76e28] bg-orange-50/70 hover:bg-orange-100 font-bold transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Store size={14} className="text-[#f76e28]" />
                              <span>{t("become_seller", "Become a Seller / Seller Hub")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-orange-400"
                            />
                          </Link>
                        </div>

                        {/* Logout Action */}
                        <div className="pt-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAccountMenu(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer text-left"
                          >
                            <LogOut size={14} />
                            <span>{t("sign_out", "Sign Out")}</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Guest User Sign In CTA */}
                        <div className="p-3 bg-gradient-to-b from-orange-50/80 to-transparent rounded-xl border border-orange-100/70 mb-1 text-center">
                          <Link
                            to="/login"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full py-2.5 px-4 bg-[#f76e28] hover:bg-[#de5713] active:scale-[0.98] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm shadow-orange-600/25 transition-all"
                          >
                            <span>Sign In</span>
                            <ArrowRight size={13} />
                          </Link>
                          <div className="text-center text-[11px] text-stone-500 mt-2 font-medium">
                            New customer?{" "}
                            <Link
                              to="/register"
                              onClick={() => setShowAccountMenu(false)}
                              className="text-[#f76e28] font-bold hover:underline"
                            >
                              Start here
                            </Link>
                          </div>
                        </div>

                        {/* Essential Shopping Services */}
                        <div className="py-1.5 space-y-0.5">
                          <Link
                            to="/my-orders"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Package size={14} className="text-[#f76e28]" />
                              <span>{t("orders_tracking", "Orders & Tracking")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-stone-300"
                            />
                          </Link>
                          <Link
                            to="/membership"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 font-medium transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Sparkles size={14} className="text-purple-500" />
                              <span>{t("vip_club", "GoMo VIP Club")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-stone-300"
                            />
                          </Link>
                          <Link
                            to="/seller"
                            onClick={() => setShowAccountMenu(false)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#f76e28] bg-orange-50/70 hover:bg-orange-100 font-bold transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Store size={14} className="text-[#f76e28]" />
                              <span>{t("seller_hub_vendor", "Seller Hub (Vendor Portal)")}</span>
                            </div>
                            <ChevronRight
                              size={13}
                              className="text-orange-400"
                            />
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector at the Right Corner of Navbar */}
            <LanguageSelector isTransparent={isTransparent} />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LINE 2: SECOND LINE - DEPARTMENTS & VALUE-ADD PERKS      */}
      {/* ======================================================== */}
      <div
        className={`w-full text-xs font-semibold select-none relative z-40 transition-colors duration-300 ${
          isTransparent
            ? "bg-black/35 backdrop-blur-md border-b border-white/15 text-white"
            : "bg-white border-b border-stone-200/80 text-stone-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[46px] flex items-center justify-between gap-3 relative">
          {/* Left: Department Navigation Links */}
          <div className="flex items-center gap-0.5 sm:gap-1 xl:gap-1.5 overflow-x-auto lg:overflow-visible xl:overflow-visible no-scrollbar py-2 relative min-w-0 flex-1">
            {/* All Categories Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider text-[10.5px] xl:text-[11px] cursor-pointer flex-shrink-0 mr-0.5 group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 ${
                isTransparent
                  ? "text-white hover:bg-white/20"
                  : "text-stone-800 hover:bg-orange-50/80 hover:text-orange-600 border border-transparent hover:border-orange-200/60"
              }`}
            >
              <Menu size={13} className="text-orange-500 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110" />
              <span className="transition-colors duration-150">{t("all_departments_btn", "All")}</span>
            </button>

            <div
              className={`w-px h-4 mx-0.5 sm:mx-1 flex-shrink-0 ${isTransparent ? "bg-white/20" : "bg-stone-200"}`}
            />

            {/* Men, Women, Kids, Home & Living, Beauty, Pooja Items, Electronics, Deals */}
            {DEPARTMENTS.map((dept) => {
              const isCurrentActive = activeDept === dept.key;
              return (
                <div
                  key={dept.key}
                  className="group relative flex-shrink-0 py-1"
                  onMouseEnter={() => handleDeptMouseEnter(dept.key)}
                  onMouseLeave={handleDeptMouseLeave}
                >
                  <Link
                    to={dept.path}
                    className={`group relative px-2 lg:px-2.5 xl:px-3 py-1.5 rounded-lg text-[10.5px] xl:text-[11px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1 sm:gap-1.5 cursor-pointer font-bold whitespace-nowrap flex-shrink-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                      dept.isHighlight || dept.isHighlighted
                        ? isTransparent
                          ? "text-white bg-orange-600/90 hover:bg-orange-600 border border-orange-400/60 shadow-xs hover:shadow-orange-500/20"
                          : "text-orange-600 hover:text-orange-700 bg-orange-50/90 hover:bg-orange-100 border border-orange-200/80 shadow-xs hover:shadow-orange-100"
                        : isCurrentActive
                          ? isTransparent
                            ? "text-white bg-white/20 shadow-2xs"
                            : "text-orange-600 bg-stone-100 shadow-2xs"
                          : isTransparent
                            ? "text-white/90 hover:text-white hover:bg-white/15"
                            : "text-stone-700 hover:text-orange-600 hover:bg-orange-50/70 hover:border-orange-200/60 border border-transparent hover:shadow-xs"
                    }`}
                  >
                    <span>{t(dept.key.replace(/-/g, "_"), dept.label)}</span>

                    {/* Next to the text: drop down arrow turns into that category animation when hovered */}
                    <span className="relative w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                      {/* Default drop down arrow */}
                      <ChevronDown
                        size={10}
                        className={`transition-all duration-200 ease-out pointer-events-none ${
                          isCurrentActive
                            ? "opacity-0 scale-0 rotate-45"
                            : isTransparent
                              ? "text-white/70 group-hover:opacity-0 group-hover:scale-0 group-hover:rotate-45"
                              : "text-stone-400 group-hover:opacity-0 group-hover:scale-0 group-hover:rotate-45"
                        }`}
                      />

                      {/* Category animation: replaces the arrow seamlessly on hover or active */}
                      <span
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out pointer-events-none ${
                          isCurrentActive
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-50 -translate-y-0.5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
                        }`}
                      >
                        {renderDeptHoverIcon(dept.key)}
                      </span>
                    </span>
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
                        className={`absolute top-full mt-0.5 bg-white text-stone-900 rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.18)] border border-stone-200/90 p-5 z-50 ${
                          ['pooja-items', 'electronics', 'grocery-items', 'pet-accessories', 'flea-market', 'tickets', 'deals'].includes(dept.key)
                            ? 'right-0 origin-top-right'
                            : 'left-0 origin-top-left'
                        } ${
                          dept.columns.length >= 4 
                            ? 'w-[680px] max-w-[calc(100vw-2rem)]' 
                            : dept.columns.length === 3 
                            ? 'w-[500px] max-w-[calc(100vw-2rem)]' 
                            : 'w-[380px] max-w-[calc(100vw-2rem)]'
                        }`}
                      >
                        <div
                          className={`grid gap-6 ${
                            dept.columns.length >= 4
                              ? 'grid-cols-4'
                              : dept.columns.length === 3
                              ? 'grid-cols-3'
                              : 'grid-cols-2'
                          }`}
                        >
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
                        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-end">
                          <Link
                            to={dept.path}
                            onClick={() => setActiveDept(null)}
                            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
                          >
                            <span>View All</span>
                            <ArrowRight
                              size={12}
                              className="group-hover:translate-x-0.5 transition-transform"
                            />
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
          <div
            className={`hidden 2xl:flex items-center gap-5 text-[11px] font-medium flex-shrink-0 ml-auto ${isTransparent ? "text-white/80" : "text-stone-500"}`}
          >
            <div className="flex items-center gap-1.5">
              <Truck size={13} className="text-orange-500 flex-shrink-0" />
              <span className="whitespace-nowrap">
                <span className="hidden 2xl:inline">Free Express </span>Delivery
                &gt;₹500
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw size={13} className="text-orange-500 flex-shrink-0" />
              <span className="whitespace-nowrap">
                <span className="hidden 2xl:inline">15-Day </span>Easy Returns
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck
                size={13}
                className="text-orange-500 flex-shrink-0"
              />
              <span className="whitespace-nowrap">
                100% Genuine<span className="hidden 2xl:inline"> Brands</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Expandable Search Row */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="md:hidden border-b border-stone-100 px-4 py-2.5 bg-white text-stone-900 shadow-sm"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-stone-50 border border-stone-200 focus-within:border-orange-500 focus-within:bg-white rounded-full px-3.5 py-1.5 gap-2 transition-all duration-120 shadow-2xs"
              >
                <Search size={15} className="text-orange-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search_placeholder_full", "Search products, brands, essentials...")}
                  className="bg-transparent text-xs text-stone-900 placeholder-stone-400 w-full focus:outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-stone-400 hover:text-stone-600 active:scale-90"
                  >
                    <X size={13} />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-3.5 py-1 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] active:scale-95 text-white text-[11px] font-bold uppercase rounded-full tracking-wider shadow-xs cursor-pointer shrink-0 transition-all duration-100"
                >
                  {t("search", "Search")}
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

      {/* Portal for Cart Drawer */}
      {createPortal(<CartDrawer />, document.body)}
    </div>
  );
};

export default NavMain;
