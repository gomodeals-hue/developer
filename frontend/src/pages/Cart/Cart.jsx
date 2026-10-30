import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft,
  Tag, Truck, Check, AlertCircle, ChevronRight, 
  ShieldCheck, Sparkles, CheckCircle2,
  RotateCcw, Heart, MapPin, Lock, Percent
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { cartService } from '../../services/cartService';
import { toast } from 'react-hot-toast';
import { getProductImage } from '../../utils/productImages';
import TimedUndoAction from '../../components/common/TimedUndoAction';

const getItemKey = (item) => `${String(item?.product_id || item?.id || '')}__${String(item?.selectedColor || item?.variant_value || 'default')}`;

const POPULAR_COUPONS = [
  { code: 'GOMO10', desc: '10% OFF on order' },
  { code: 'FLAT100', desc: '₹100 Flat discount' },
  { code: 'FREESHIP', desc: 'Free Delivery' }
];

const QUICK_CATEGORIES = [
  { label: "Men's Fashion", path: '/collection/clothing?section=men' },
  { label: "Women's Fashion", path: '/collection/clothing?section=women' },
  { label: 'Kids & Baby', path: '/collection/kids' },
  { label: 'Electronics', path: '/collection/electronics' },
  { label: 'Home & Living', path: '/collection/home-living' },
  { label: 'Grocery Items', path: '/collection/grocery-items' }
];

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    removeMultipleFromCart,
    updateQuantity, 
    clearCart,
    toggleWishlist,
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    formatPrice 
  } = useShop();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  // Delivery Estimator state
  const [pincode, setPincode] = useState(() => localStorage.getItem('gomo_delivery_pincode') || '600032');
  const [isEditingPincode, setIsEditingPincode] = useState(false);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [pincodeInfo, setPincodeInfo] = useState(() => {
    const saved = localStorage.getItem('gomo_delivery_pincode') || '600032';
    return {
      code: saved,
      city: saved.startsWith('60') ? 'Chennai' : saved.startsWith('56') ? 'Bengaluru' : saved.startsWith('11') ? 'Delhi' : saved.startsWith('40') ? 'Mumbai' : 'Metropolitan Hub',
      state: saved.startsWith('6') ? 'Tamil Nadu' : saved.startsWith('5') ? 'Karnataka' : saved.startsWith('1') ? 'Delhi NCR' : 'India',
      standardDays: '3–4 business days',
      expressDays: '1–2 days',
      isDeliverable: true
    };
  });

  // Selected item keys in cart
  const [selectedKeys, setSelectedKeys] = useState(() => cart.map(getItemKey));

  // Sync selected keys when cart items change
  useEffect(() => {
    const validKeys = new Set(cart.map(getItemKey));
    setSelectedKeys(prev => {
      const remaining = prev.filter(k => validKeys.has(k));
      if (remaining.length === 0 && cart.length > 0) {
        return cart.map(getItemKey);
      }
      return remaining;
    });
  }, [cart]);

  const isAllSelected = cart.length > 0 && selectedKeys.length === cart.length;
  const isSomeSelected = selectedKeys.length > 0 && selectedKeys.length < cart.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(cart.map(getItemKey));
    }
  };

  const handleToggleItem = (key) => {
    setSelectedKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // Disintegrating items tracking for Thanos-snap disintegration / ash particle effect
  const [disintegratingKeys, setDisintegratingKeys] = useState(new Set());

  // Single item removal handler with disintegration ash particles
  const handleRemoveItem = async (item) => {
    const key = getItemKey(item);
    if (disintegratingKeys.has(key)) return;

    setDisintegratingKeys(prev => new Set(prev).add(key));

    setTimeout(async () => {
      setSelectedKeys(prev => prev.filter(k => k !== key));
      await removeFromCart(item.id, item.selectedColor, item.cart_item_id);
      setDisintegratingKeys(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      toast.success(`Removed "${item.name || 'item'}" from cart`);
    }, 480);
  };

  const handleDeleteSelected = async () => {
    if (selectedKeys.length === 0) return;
    const itemsToDelete = cart.filter(item => selectedKeys.includes(getItemKey(item)));
    const keysToDelete = itemsToDelete.map(getItemKey);

    setDisintegratingKeys(prev => {
      const next = new Set(prev);
      keysToDelete.forEach(k => next.add(k));
      return next;
    });

    setTimeout(async () => {
      setSelectedKeys([]);
      if (itemsToDelete.length === cart.length) {
        await clearCart();
      } else {
        if (typeof removeMultipleFromCart === 'function') {
          await removeMultipleFromCart(itemsToDelete);
        } else {
          for (const it of itemsToDelete) {
            await removeFromCart(it.id, it.selectedColor, it.cart_item_id);
          }
        }
      }
      setDisintegratingKeys(prev => {
        const next = new Set(prev);
        keysToDelete.forEach(k => next.delete(k));
        return next;
      });
      toast.success(`Removed ${itemsToDelete.length} ${itemsToDelete.length === 1 ? 'item' : 'items'} from cart`);
    }, 480);
  };

  const handleMoveSelectedToWishlist = async () => {
    if (selectedKeys.length === 0) return;
    const itemsToMove = cart.filter(item => selectedKeys.includes(getItemKey(item)));
    setSelectedKeys([]);
    for (const item of itemsToMove) {
      await toggleWishlist(item);
      await removeFromCart(item.id, item.selectedColor, item.cart_item_id);
    }
    toast.success(`Saved ${itemsToMove.length} ${itemsToMove.length === 1 ? 'item' : 'items'} for later`);
  };

  const handleMoveToWishlist = async (item) => {
    const key = getItemKey(item);
    setSelectedKeys(prev => prev.filter(k => k !== key));
    await toggleWishlist(item);
    await removeFromCart(item.id, item.selectedColor, item.cart_item_id);
    toast.success(`Moved "${item.name}" to Wishlist`);
  };

  const handleClearAll = async () => {
    setSelectedKeys([]);
    await clearCart();
    toast.success('All items removed from cart');
  };

  const handleCheckPincode = (e) => {
    e?.preventDefault();
    const clean = pincode.replace(/\D/g, '').slice(0, 6);
    if (clean.length !== 6) {
      toast.error('Please enter a valid 6-digit Pincode');
      return;
    }
    setIsCheckingPincode(true);
    setTimeout(() => {
      setIsCheckingPincode(false);
      localStorage.setItem('gomo_delivery_pincode', clean);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      const dateStr = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
      setPincodeInfo({
        code: clean,
        city: clean.startsWith('60') ? 'Chennai' : clean.startsWith('56') ? 'Bengaluru' : clean.startsWith('11') ? 'Delhi' : clean.startsWith('40') ? 'Mumbai' : 'Serviceable Hub',
        state: clean.startsWith('6') ? 'Tamil Nadu' : clean.startsWith('5') ? 'Karnataka' : clean.startsWith('1') ? 'Delhi NCR' : 'India',
        standardDays: `By ${dateStr}`,
        expressDays: 'Available (1–2 days)',
        isDeliverable: true
      });
      setIsEditingPincode(false);
      toast.success(`Delivery estimate updated for ${clean}`);
    }, 350);
  };

  const handleApplyCoupon = async (codeToApply) => {
    const targetCode = (codeToApply || couponInput).trim();
    if (!targetCode) return;
    setIsApplying(true);
    setCouponError("");

    const res = await applyCoupon(targetCode);
    if (!res.success) {
      setCouponError(res.message || "Invalid or expired coupon code.");
    } else {
      setCouponInput("");
      toast.success(`Coupon "${targetCode}" applied!`);
    }
    setIsApplying(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponError("");
    toast.success('Coupon removed');
  };

  // Calculate financials based on SELECTED items for accurate checkout
  const selectedCartItems = useMemo(() => {
    return cart.filter(item => selectedKeys.includes(getItemKey(item)));
  }, [cart, selectedKeys]);

  const activeSummary = useMemo(() => {
    return cartService.calculateCartSummary(selectedCartItems, appliedCoupon);
  }, [selectedCartItems, appliedCoupon]);

  const selectedMrpTotal = useMemo(() => {
    return selectedCartItems.reduce((sum, item) => {
      const itemMrp = item.original_price || item.mrp || Math.round((item.price || 0) * 1.25);
      return sum + (itemMrp * (item.quantity || 1));
    }, 0);
  }, [selectedCartItems]);

  const totalCartCount = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const selectedCount = selectedCartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const totalSavings = Math.max(0, (selectedMrpTotal - activeSummary.subtotal) + (activeSummary.discount || 0));

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="pt-8 pb-24 min-h-[85vh] bg-[#fcfbf9] text-stone-900 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 shadow-xs"
          >
            <div className="w-20 h-20 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-6 text-[#f76e28] shadow-2xs">
              <ShoppingBag size={34} strokeWidth={1.8} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
              Your Shopping Cart is Empty
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Explore thousands of handpicked deals across fashion, electronics, pooja essentials, and home living.
            </p>

            <button
              onClick={() => navigate('/')}
              className="px-8 py-3.5 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] active:scale-[0.98] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-[#f76e28]/25 hover:shadow-lg hover:shadow-[#f76e28]/35 transition-all duration-150 cursor-pointer inline-flex items-center gap-2 mb-8"
            >
              <span>Explore Trending Deals</span>
              <ArrowRight size={14} />
            </button>

            {/* Quick Category Discovery */}
            <div className="pt-8 border-t border-stone-100 text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 block mb-3 text-center sm:text-left">
                Popular Categories to Explore
              </span>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {QUICK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.path}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-200 text-stone-700 hover:text-[#f76e28] text-xs font-semibold transition-all"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const { subtotal, discount, shipping, tax, finalTotal, isFreeShipping, freeShippingProgress, amountNeededForFreeShipping } = activeSummary;

  return (
    <div className="pt-6 pb-24 min-h-screen bg-[#fcfbf9] text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-stone-400 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-stone-800 transition-colors">Home</Link>
          <ChevronRight size={12} className="text-stone-300" />
          <span className="text-stone-900 font-bold">Shopping Cart</span>
        </nav>

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Shopping Cart
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200/80">
              {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-[#f76e28] hover:bg-white border border-stone-200/80 hover:border-orange-200 transition-all w-fit shadow-2xs"
          >
            <ArrowLeft size={13} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Main 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (8 cols): Cart Items & Actions */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Milestone Indicator */}
            <div className="bg-white border border-stone-200/85 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isFreeShipping 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-orange-50 text-[#f76e28]'
                  }`}>
                    {isFreeShipping ? <CheckCircle2 size={16} /> : <Truck size={16} />}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 block leading-tight">
                      {isFreeShipping 
                        ? 'FREE Standard Delivery Unlocked' 
                        : `Add ${formatPrice(amountNeededForFreeShipping)} more for FREE Delivery`}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {isFreeShipping 
                        ? 'Enjoy zero shipping fees on your entire selected order' 
                        : 'Free shipping applies on selected orders of ₹1,000 or above'}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                  isFreeShipping 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-orange-50 text-[#f76e28] border border-orange-200'
                }`}>
                  {isFreeShipping ? 'ELIGIBLE' : `${Math.round(freeShippingProgress)}%`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    isFreeShipping ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#f76e28] to-[#ff8c42]'
                  }`} 
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Select All & Multi-Action Toolbar */}
            <div className="bg-white border border-stone-200/85 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs flex items-center justify-between gap-3">
              {/* Select All Checkbox */}
              <label className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold text-stone-800 cursor-pointer select-none group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  isAllSelected 
                    ? 'bg-[#f76e28] border-[#f76e28] text-white shadow-2xs' 
                    : isSomeSelected 
                      ? 'bg-orange-50 border-orange-400 text-[#f76e28]'
                      : 'bg-white border-stone-300 group-hover:border-orange-400'
                }`}>
                  {isAllSelected ? (
                    <Check size={13} strokeWidth={3} />
                  ) : isSomeSelected ? (
                    <div className="w-2.5 h-0.5 bg-[#f76e28] rounded-full" />
                  ) : null}
                </div>
                <input 
                  type="checkbox" 
                  checked={isAllSelected} 
                  onChange={handleToggleSelectAll} 
                  className="sr-only" 
                />
                <span className="truncate">
                  Select All <span className="text-stone-400 font-normal">({selectedKeys.length}/{cart.length} items)</span>
                </span>
              </label>

              {/* Multi-Select Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                {selectedKeys.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={handleMoveSelectedToWishlist}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-700 hover:text-[#f76e28] bg-stone-50 hover:bg-orange-50 border border-stone-200 hover:border-orange-200 rounded-xl transition-all cursor-pointer shadow-2xs"
                      title="Save selected items to wishlist"
                    >
                      <Heart size={13} />
                      <span className="hidden sm:inline">Save for Later</span>
                      <span className="sm:hidden">Save</span>
                    </button>

                    {selectedKeys.length > 1 && (
                      <button
                        type="button"
                        onClick={handleDeleteSelected}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-white bg-rose-50/80 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <Trash2 size={13} />
                        <span>Delete ({selectedKeys.length})</span>
                      </button>
                    )}
                  </>
                )}
                
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-medium text-stone-400 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer hidden sm:block"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white border border-stone-200/85 rounded-2xl shadow-xs divide-y divide-stone-100 overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                {cart.map((item) => {
                  const itemKey = getItemKey(item);
                  const isSelected = selectedKeys.includes(itemKey);
                  const isDisintegrating = disintegratingKeys.has(itemKey);
                  const mrp = item.original_price || item.mrp || Math.round((item.price || 0) * 1.25);
                  const discountPct = mrp > item.price ? Math.round(((mrp - item.price) / mrp) * 100) : 0;
                  const itemSavings = (mrp - item.price) * (item.quantity || 1);

                  return (
                    <motion.div
                      layout
                      key={itemKey}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ 
                        opacity: 0, 
                        x: -24, 
                        scale: 0.96,
                        height: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        borderWidth: 0,
                        overflow: 'hidden'
                      }}
                      transition={{ 
                        opacity: { duration: 0.16, ease: "easeOut" },
                        x: { duration: 0.18, ease: "easeOut" },
                        height: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                        layout: { duration: 0.22, ease: [0.32, 0.72, 0, 1] }
                      }}
                      className={`p-4 sm:p-5 transition-colors relative overflow-visible ${
                        isDisintegrating 
                          ? 'animate-card-disintegrate pointer-events-none select-none z-30' 
                          : isSelected 
                            ? 'bg-transparent' 
                            : 'bg-stone-50/40 opacity-70'
                      }`}
                    >
                      {/* Disintegration Floating Ash & Particles Emitter */}
                      {isDisintegrating && (
                        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
                          {[...Array(24)].map((_, pIdx) => {
                            const tx = (Math.random() - 0.5) * 190 + (pIdx % 2 === 0 ? 35 : -35);
                            const ty = -35 - Math.random() * 90;
                            const size = 2.5 + Math.random() * 4.5;
                            const left = 6 + Math.random() * 88;
                            const top = 8 + Math.random() * 84;
                            const colors = ['#f76e28', '#ea580c', '#fb923c', '#fdba74', '#78716c', '#a8a29e', '#e7e5e4'];
                            const color = colors[pIdx % colors.length];

                            return (
                              <span
                                key={pIdx}
                                className="disintegration-particle"
                                style={{
                                  left: `${left}%`,
                                  top: `${top}%`,
                                  width: `${size}px`,
                                  height: `${size}px`,
                                  backgroundColor: color,
                                  boxShadow: `0 0 6px ${color}`,
                                  '--tx': `${tx}px`,
                                  '--ty': `${ty}px`,
                                  animationDelay: `${pIdx * 12}ms`
                                }}
                              />
                            );
                          })}
                        </div>
                      )}

                      <div className="flex items-start gap-3.5 sm:gap-4">
                        
                        {/* Checkbox */}
                        <label className="flex items-center cursor-pointer select-none shrink-0 pt-1 group">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-[#f76e28] border-[#f76e28] text-white shadow-2xs' 
                              : 'bg-white border-stone-300 group-hover:border-orange-400'
                          }`}>
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isSelected} 
                            onChange={() => handleToggleItem(itemKey)} 
                            className="sr-only" 
                          />
                        </label>

                        {/* Product Image */}
                        <Link 
                          to={`/product/${item.id}`} 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-stone-200/80 bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs hover:border-orange-300 transition-colors group"
                        >
                          <img
                            src={getProductImage(item)}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getProductImage(item);
                            }}
                          />
                        </Link>

                        {/* Details Center */}
                        <div className="flex-1 min-w-0">
                          
                          {/* Brand / Vendor Label */}
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                              {item.brand || item.seller_name || 'Verified Merchant'}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                              In Stock
                            </span>
                          </div>

                          {/* Product Title */}
                          <h3 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 hover:text-[#f76e28] transition-colors mb-1.5 leading-snug">
                            <Link to={`/product/${item.id}`}>
                              {item.name}
                            </Link>
                          </h3>

                          {/* Variant / Option Chips */}
                          <div className="flex items-center gap-2 flex-wrap mb-2.5">
                            {item.selectedColor && (
                              <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                                Variant: <strong className="text-stone-900 font-bold">{item.selectedColor}</strong>
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                                Size: <strong className="text-stone-900 font-bold">{item.selectedSize}</strong>
                              </span>
                            )}
                          </div>

                          {/* Pricing Row */}
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm sm:text-base font-black text-stone-900">
                              {formatPrice(item.price)}
                            </span>
                            {mrp > item.price && (
                              <span className="text-xs text-stone-400 line-through">
                                {formatPrice(mrp)}
                              </span>
                            )}
                            {discountPct > 0 && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                {discountPct}% OFF
                              </span>
                            )}
                          </div>

                          {/* Bottom Row: Quantity Stepper & Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 mt-3 border-t border-stone-100">
                            
                            {/* Quantity Stepper */}
                            <div className="flex items-center gap-3">
                              <div className="inline-flex items-center border border-stone-200 rounded-xl bg-stone-50/50 h-8 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      updateQuantity(item.id, item.quantity - 1, item.selectedColor);
                                    }
                                  }}
                                  disabled={item.quantity <= 1}
                                  className={`w-8 h-full transition-colors flex items-center justify-center rounded-l-xl ${
                                    item.quantity <= 1
                                      ? 'text-stone-300 cursor-not-allowed'
                                      : 'text-stone-600 hover:text-[#f76e28] hover:bg-orange-50 cursor-pointer'
                                  }`}
                                  aria-label="Decrease quantity"
                                  title={item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                                >
                                  <Minus size={12} strokeWidth={2.5} />
                                </button>

                                <span className="w-8 text-center text-xs font-bold text-stone-900 select-none">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
                                  className="w-8 h-full text-stone-600 hover:text-[#f76e28] hover:bg-orange-50 transition-colors flex items-center justify-center cursor-pointer rounded-r-xl"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={12} strokeWidth={2.5} />
                                </button>
                              </div>

                              <span className="text-xs text-stone-500">
                                Subtotal: <strong className="text-stone-900 font-bold">{formatPrice(item.price * item.quantity)}</strong>
                              </span>
                            </div>

                            {/* Item Actions */}
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleMoveToWishlist(item)}
                                className="group/wish inline-flex items-center gap-1.5 text-[11.5px] font-bold text-stone-500 hover:text-[#f76e28] transition-all duration-150 cursor-pointer active:scale-95"
                              >
                                <Heart size={13} className="group-hover/wish:scale-115 transition-transform duration-200" />
                                <span>Save for Later</span>
                              </button>

                              <span className="text-stone-300">|</span>

                              <TimedUndoAction
                                initialSeconds={4}
                                deleteLabel="Remove"
                                undoLabel="Cancel"
                                size="sm"
                                onDelete={() => handleRemoveItem(item)}
                                onUndo={() => toast.success(`Restored "${item.name || 'item'}"`)}
                              />
                            </div>

                          </div>

                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column (4 cols): Sticky Order Summary & Details */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            
            {/* Delivery Estimator Strip */}
            <div className="bg-white border border-stone-200/85 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#f76e28]" />
                  <span className="text-xs font-bold text-stone-900">
                    Delivery Destination
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingPincode(!isEditingPincode)}
                  className="text-xs font-bold text-[#f76e28] hover:underline cursor-pointer"
                >
                  {isEditingPincode ? 'Cancel' : 'Change'}
                </button>
              </div>

              {isEditingPincode ? (
                <form onSubmit={handleCheckPincode} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-800 outline-none focus:border-orange-500 font-mono"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isCheckingPincode}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-[#f76e28] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isCheckingPincode ? '...' : 'Verify'}
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                  <div>
                    <span className="font-bold text-stone-900">{pincodeInfo.city}</span> ({pincodeInfo.code})
                    <span className="block text-[11px] text-stone-400 font-medium">
                      Standard Delivery: {pincodeInfo.standardDays}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    FAST
                  </span>
                </div>
              )}
            </div>

            {/* Promo Code Card */}
            <div className="bg-white border border-stone-200/85 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={15} className="text-[#f76e28]" />
                <span className="text-xs font-bold text-stone-900">
                  Promo / Coupon Code
                </span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-emerald-800">
                        {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[11px] text-emerald-600 font-medium">
                        You saved {formatPrice(discount)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2 mb-2.5">
                    <input
                      type="text"
                      placeholder="e.g. GOMO10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 outline-none uppercase font-bold focus:border-orange-500 font-mono tracking-wider"
                    />
                    <button
                      onClick={() => handleApplyCoupon(couponInput)}
                      disabled={isApplying || !couponInput.trim()}
                      className="px-4 py-2 bg-[#f76e28] hover:bg-[#de5713] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isApplying ? 'Applying' : 'Apply'}
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-rose-600 text-[11px] mb-2 font-medium flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{couponError}</span>
                    </p>
                  )}

                  {/* Quick-Apply Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Top Codes:</span>
                    {POPULAR_COUPONS.map((cpn) => (
                      <button
                        key={cpn.code}
                        type="button"
                        onClick={() => handleApplyCoupon(cpn.code)}
                        className="px-2 py-0.5 rounded-md border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-200 text-stone-700 hover:text-[#f76e28] text-[10.5px] font-bold font-mono transition-colors cursor-pointer"
                        title={cpn.desc}
                      >
                        {cpn.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Price Breakdown Card */}
            <div className="bg-white border border-stone-200/85 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="text-sm font-bold text-stone-900">
                  Order Summary
                </h3>
                <span className="text-xs text-stone-400 font-medium">
                  {selectedCartItems.length} of {cart.length} selected
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Total (MRP)</span>
                  <span className="font-semibold text-stone-900">{formatPrice(selectedMrpTotal)}</span>
                </div>

                {selectedMrpTotal > subtotal && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Retail Savings</span>
                    <span className="font-semibold">-{formatPrice(selectedMrpTotal - subtotal)}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Savings</span>
                    <span className="font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={`font-semibold ${isFreeShipping ? 'text-emerald-600' : 'text-stone-900'}`}>
                    {selectedCartItems.length === 0 ? formatPrice(0) : isFreeShipping ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                {tax > 0 && (
                  <div className="flex justify-between">
                    <span>Estimated GST (5%)</span>
                    <span className="font-semibold text-stone-900">{formatPrice(tax)}</span>
                  </div>
                )}

                {/* Total Savings Strip */}
                {totalSavings > 0 && selectedCartItems.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-emerald-600" />
                      <span>Total Savings on this order</span>
                    </span>
                    <span className="font-extrabold">{formatPrice(totalSavings)}</span>
                  </div>
                )}

                {/* Total Payable */}
                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-stone-900">
                  <span className="text-sm font-bold">Total Payable</span>
                  <span className="text-2xl font-black text-stone-900 tracking-tight">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              {selectedKeys.length === 0 ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 bg-stone-200 text-stone-500 text-xs font-bold rounded-xl cursor-not-allowed mt-2"
                >
                  Select at least 1 item to proceed
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/checkout', { state: { checkoutItems: selectedCartItems } })}
                  className="w-full py-4 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] active:scale-[0.98] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-[#f76e28]/25 hover:shadow-lg hover:shadow-[#f76e28]/35 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Proceed to Checkout ({selectedCount})</span>
                  <ArrowRight size={14} />
                </button>
              )}

              {/* Trust & Assurance Badges */}
              <div className="pt-3 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span>100% Genuine Verified Catalog Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-[#f76e28] shrink-0" />
                  <span>7-Day Hassle-Free Instant Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-stone-400 shrink-0" />
                  <span>Safe and Secure 256-Bit SSL Checkout</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
