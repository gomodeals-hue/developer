import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowLeft, Trash2, Plus, Minus, ShoppingBag, 
  ArrowRight, Tag, Truck, Check, ChevronRight, 
  Sparkles, ShieldCheck, Heart, ArrowUpRight, Gift, FileText,
  Flame, Leaf, FlaskConical, Recycle
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import { toast } from 'react-hot-toast';
import { getProductImage } from '../../../utils/productImages';
import TimedUndoAction from '../../common/TimedUndoAction';

const getItemKey = (item) => `${String(item?.product_id || item?.id || '')}__${String(item?.selectedColor || item?.variant_value || 'default')}`;

const CartDrawer = () => {
  const { 
    cart, 
    cartTotal, 
    cartCount, 
    cartSubtotal,
    cartSummary,
    removeFromCart, 
    removeMultipleFromCart,
    updateQuantity, 
    clearCart,
    addToCart,
    toggleWishlist,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartDrawerOpen, 
    setCartDrawerOpen,
    formatPrice,
    t
  } = useShop();
  
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);

  // Selected item keys for multi-action
  const [selectedKeys, setSelectedKeys] = useState(() => cart.map(getItemKey));

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
    toast.success(`Moved ${itemsToMove.length} items to Wishlist`);
  };

  const handleMoveToWishlist = async (item) => {
    const key = getItemKey(item);
    setSelectedKeys(prev => prev.filter(k => k !== key));
    await toggleWishlist(item);
    await removeFromCart(item.id, item.selectedColor, item.cart_item_id);
    toast.success(`Moved "${item.name}" to Wishlist`);
  };

  // Scroll lock when drawer is open
  useEffect(() => {
    if (cartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cartDrawerOpen]);

  if (!cartDrawerOpen) return null;

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    const selectedCartItems = cart.filter(item => selectedKeys.includes(getItemKey(item)));
    navigate('/checkout', { 
      state: { 
        checkoutItems: selectedCartItems.length > 0 ? selectedCartItems : cart 
      } 
    });
  };

  const handleReturnToShop = () => {
    setCartDrawerOpen(false);
    navigate('/');
  };

  // Coupons data in GoMo Deals theme
  const availableCoupons = [
    {
      code: 'REDEEM35',
      title: 'Get Upto 35% OFF + 2 FREEBIES',
      description: 'Add 1 or more items to avail this offer.',
      discountPct: 35
    },
    {
      code: 'B3P2',
      title: 'Buy Any 3, Pay for 2',
      description: 'Add 2 or more items to avail this offer.',
      discountPct: 33
    },
    {
      code: 'GOMO10',
      title: 'Flat 10% OFF on All Products',
      description: 'Applicable on all products across store.',
      discountPct: 10
    }
  ];

  const handleApplyCoupon = async (code) => {
    if (appliedCoupon?.code === code) {
      removeCoupon();
      toast.success('Coupon removed');
      return;
    }
    const res = await applyCoupon(code);
    if (res.success) {
      toast.success(`Coupon ${code} applied!`);
    } else {
      toast.error(res.message || 'Invalid coupon code');
    }
  };

  // Financial calculations
  const mrpTotal = cart.reduce((sum, item) => {
    const itemMrp = item.original_price || item.mrp || Math.round((item.price || 0) * 1.25);
    return sum + itemMrp * (item.quantity || 1);
  }, 0);

  const itemsDiscount = Math.max(0, mrpTotal - (cartSubtotal || 0));
  const couponDiscount = appliedCoupon ? (cartSummary?.discount || Math.round((cartSubtotal * (appliedCoupon.discountPct || 10)) / 100)) : 0;
  const isFreeDelivery = (cartSubtotal || 0) >= 499;
  const shippingFee = isFreeDelivery || cart.length === 0 ? 0 : 40;
  const deliveryRemaining = Math.max(0, 499 - (cartSubtotal || 0));
  const deliveryProgress = Math.min(100, Math.round(((cartSubtotal || 0) / 499) * 100));
  const finalPayable = Math.max(0, (cartSubtotal || 0) + shippingFee - couponDiscount);
  const totalSavings = Math.max(0, mrpTotal - finalPayable);

  // Frequently bought together recommendations
  const frequentItems = [
    {
      id: 'rec_facewash_1',
      product_id: 'rec_facewash_1',
      name: 'Rice Dewy Bright Face Wash (150ml)',
      price: 359,
      mrp: 449,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80',
      tag: 'Face Cleanser'
    },
    {
      id: 'rec_sunscreen_1',
      product_id: 'rec_sunscreen_1',
      name: 'Vitamin C Daily Glow Sunscreen SPF 50 (50g)',
      price: 359,
      mrp: 399,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&q=80',
      tag: 'Sun Care'
    },
    {
      id: 'rec_pooja_diya_1',
      product_id: 'rec_pooja_diya_1',
      name: 'Pure Brass Akhand Diya for Pooja Mandir',
      price: 299,
      mrp: 399,
      image: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=300&q=80',
      tag: 'Pooja Essential'
    },
    {
      id: 'rec_incense_1',
      product_id: 'rec_incense_1',
      name: 'Natural Loban & Sandalwood Organic Dhoop',
      price: 199,
      mrp: 260,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80',
      tag: 'Fragrance'
    }
  ];

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setCartDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[150] cursor-pointer"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] md:w-[480px] bg-[#fffcf9] h-full shadow-2xl flex flex-col z-[160] overflow-hidden text-stone-900 border-l border-orange-200/80 gpu-accelerate"
          >
            {/* Header: Left Arrow + Title + Right Close */}
            <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-orange-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1 -ml-1 text-stone-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors cursor-pointer"
                  aria-label="Back"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
                    <ShoppingBag size={15} />
                  </div>
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                    Your cart
                  </h2>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setCartDrawerOpen(false)} 
                className="text-stone-500 hover:text-orange-600 hover:bg-orange-50 p-1.5 rounded-full transition-all cursor-pointer"
                title="Close Cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
              {cart.length === 0 ? (
                /* Empty Cart Screen */
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-white">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-stone-500 max-w-[260px] leading-relaxed mb-6">
                    You may check out all the available products and buy some in the shop
                  </p>
                  <button
                    type="button"
                    onClick={handleReturnToShop}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer group"
                  >
                    <span>Return to shop</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              ) : (
                /* Non-Empty Cart Screen */
                <div className="p-4 space-y-4">
                  
                  {/* Green Savings Banner */}
                  {totalSavings > 0 && (
                    <div className="bg-[#e9f5e6] text-[#166534] px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold shadow-2xs border border-emerald-100">
                      <Check size={16} className="text-[#166534] shrink-0" strokeWidth={2.5} />
                      <span>You saved ₹{totalSavings.toFixed(2)} on this order</span>
                    </div>
                  )}

                  {/* Available Offers Section */}
                  <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-2xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-orange-600" />
                        <h4 className="text-xs font-bold text-stone-900">
                          Available offers for you ({availableCoupons.length})
                        </h4>
                      </div>
                      <ChevronRight size={16} className="text-stone-400" />
                    </div>
                    <p className="text-[11px] text-stone-400 font-medium mb-3">
                      All coupons are applicable on MRP
                    </p>

                    {/* Horizontal Coupons Carousel */}
                    <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                      {availableCoupons.map((c) => {
                        const isApplied = appliedCoupon?.code === c.code;
                        return (
                          <div 
                            key={c.code}
                            className={`min-w-[240px] max-w-[260px] p-3 rounded-xl border flex flex-col justify-between shrink-0 transition-all ${
                              isApplied 
                                ? 'border-orange-500 bg-orange-50/70 shadow-2xs' 
                                : 'border-dashed border-orange-200 bg-orange-50/20'
                            }`}
                          >
                            <div>
                              <h5 className="text-xs font-bold text-stone-900 leading-tight mb-1">
                                {c.title}
                              </h5>
                              <p className="text-[10px] text-stone-500 line-clamp-1 mb-1">
                                {c.description}
                              </p>
                              <span className="text-[10px] font-semibold text-orange-600 hover:underline cursor-pointer block mb-2.5">
                                View details
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-orange-100">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white border border-orange-200 rounded-md text-stone-800">
                                {c.code}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleApplyCoupon(c.code)}
                                className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                  isApplied
                                    ? 'bg-orange-600 text-white shadow-2xs'
                                    : 'bg-white border border-orange-300 text-orange-700 hover:bg-orange-50'
                                }`}
                              >
                                {isApplied ? 'Applied' : 'Apply'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cart Items Box */}
                  <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-2xs">
                    {/* Header + Select All / Delete Actions */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                      <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer select-none group">
                        <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                          isAllSelected 
                            ? 'bg-orange-600 border-orange-600 text-white shadow-2xs' 
                            : isSomeSelected 
                              ? 'bg-orange-50 border-orange-400 text-orange-700'
                              : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isAllSelected ? (
                            <Check size={11} strokeWidth={3} />
                          ) : isSomeSelected ? (
                            <div className="w-2 h-0.5 bg-orange-600 rounded-full" />
                          ) : null}
                        </div>
                        <input 
                          type="checkbox" 
                          checked={isAllSelected} 
                          onChange={handleToggleSelectAll} 
                          className="sr-only" 
                        />
                        <span>Select All ({selectedKeys.length}/{cart.length})</span>
                      </label>

                      {selectedKeys.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={handleMoveSelectedToWishlist}
                            className="flex items-center gap-1 text-[11px] font-bold text-orange-700 hover:text-white bg-orange-50 hover:bg-orange-600 px-2.5 py-1 rounded-lg border border-orange-200 transition-all cursor-pointer shadow-2xs"
                            title="Save selected items to wishlist"
                          >
                            <Heart size={11} />
                            <span>Save ({selectedKeys.length})</span>
                          </button>

                          {selectedKeys.length > 1 && (
                            <button
                              type="button"
                              onClick={handleDeleteSelected}
                              className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-2.5 py-1 rounded-lg border border-rose-200 transition-all cursor-pointer shadow-2xs"
                            >
                              <Trash2 size={11} />
                              <span>Delete ({selectedKeys.length})</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="divide-y divide-stone-100 overflow-hidden">
                      <AnimatePresence initial={false} mode="popLayout">
                        {cart.map((item) => {
                          const itemKey = getItemKey(item);
                          const isSelected = selectedKeys.includes(itemKey);
                          const isDisintegrating = disintegratingKeys.has(itemKey);
                          const itemMrp = item.original_price || item.mrp || Math.round((item.price || 0) * 1.25);
                          const discountPct = itemMrp > item.price ? Math.round(((itemMrp - item.price) / itemMrp) * 100) : 20;

                          return (
                            <motion.div 
                              layout
                              key={itemKey}
                              initial={{ opacity: 0, y: 6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ 
                                opacity: 0, 
                                x: -22, 
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
                              className={`py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 transition-opacity relative overflow-visible ${
                                isDisintegrating 
                                  ? 'animate-card-disintegrate pointer-events-none select-none z-30' 
                                  : isSelected ? 'opacity-100' : 'opacity-70'
                              }`}
                            >
                              {/* Disintegration Floating Ash & Particles Emitter */}
                              {isDisintegrating && (
                                <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
                                  {[...Array(20)].map((_, pIdx) => {
                                    const tx = (Math.random() - 0.5) * 160 + (pIdx % 2 === 0 ? 25 : -25);
                                    const ty = -30 - Math.random() * 75;
                                    const size = 2 + Math.random() * 4;
                                    const left = 8 + Math.random() * 84;
                                    const top = 10 + Math.random() * 80;
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
                                          boxShadow: `0 0 5px ${color}`,
                                          '--tx': `${tx}px`,
                                          '--ty': `${ty}px`,
                                          animationDelay: `${pIdx * 12}ms`
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              )}

                            {/* Checkbox + Thumb */}
                            <div className="flex items-center gap-2 shrink-0">
                              <label className="flex items-center cursor-pointer select-none group">
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-orange-600 border-orange-600 text-white shadow-2xs' 
                                    : 'border-stone-300 bg-white group-hover:border-orange-400'
                                }`}>
                                  {isSelected && <Check size={10} strokeWidth={3} />}
                                </div>
                                <input 
                                  type="checkbox" 
                                  checked={isSelected} 
                                  onChange={() => handleToggleItem(itemKey)} 
                                  className="sr-only" 
                                />
                              </label>

                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-stone-150 p-1 bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                                <img
                                  src={getProductImage(item)}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getProductImage(item);
                                  }}
                                />
                              </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-stone-900 line-clamp-2 leading-tight mb-0.5">
                                <Link 
                                  to={`/product/${item.id}`}
                                  onClick={() => setCartDrawerOpen(false)}
                                  className="hover:text-orange-600 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </h5>

                              {item.selectedColor && (
                                <p className="text-[10px] text-stone-400 font-medium mb-0.5">
                                  Variant: {item.selectedColor}
                                </p>
                              )}

                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-stone-900">
                                  {formatPrice(item.price)}
                                </span>
                                {itemMrp > item.price && (
                                  <span className="text-[10px] text-stone-400 line-through">
                                    {formatPrice(itemMrp)}
                                  </span>
                                )}
                                {discountPct > 0 && (
                                  <span className="text-[10px] font-black text-rose-600">
                                    {discountPct}%OFF
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quantity Stepper, Wishlist & Single Delete */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <div className="flex items-center border border-stone-300 rounded-xl bg-white h-7 shadow-2xs shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      updateQuantity(item.id, item.quantity - 1, item.selectedColor);
                                    }
                                  }}
                                  disabled={item.quantity <= 1}
                                  className={`px-2 h-full transition-colors flex items-center justify-center rounded-l-xl ${
                                    item.quantity <= 1
                                      ? 'text-stone-300 cursor-not-allowed'
                                      : 'text-stone-600 hover:text-orange-600 hover:bg-orange-50 cursor-pointer'
                                  }`}
                                  aria-label="Decrease quantity"
                                  title={item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                                >
                                  <Minus size={11} strokeWidth={2.5} />
                                </button>

                                <span className="w-5 text-center text-xs font-bold text-stone-900">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
                                  className="px-2 h-full text-stone-600 hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center justify-center cursor-pointer rounded-r-xl"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={11} strokeWidth={2.5} />
                                </button>
                              </div>

                              {/* Save for Later Button */}
                              <button
                                type="button"
                                onClick={() => handleMoveToWishlist(item)}
                                className="p-1.5 text-stone-300 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                                title="Save for Later"
                              >
                                <Heart size={13} />
                              </button>

                              <TimedUndoAction
                                initialSeconds={4}
                                deleteLabel="Remove"
                                undoLabel="Cancel"
                                size="xs"
                                onDelete={() => handleRemoveItem(item)}
                                onUndo={() => toast.success(`Restored "${item.name || 'item'}"`)}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                  </div>

                  {/* Free Delivery Unlock Box */}
                  <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Gift size={16} className="text-orange-600" />
                      <h4 className="text-xs font-bold text-stone-900">
                        Unlock FREE delivery
                      </h4>
                    </div>

                    <p className="text-[11px] text-stone-600 mb-2.5">
                      {isFreeDelivery ? (
                        <span className="text-emerald-700 font-bold">
                          Congratulations! You have unlocked FREE delivery on this order.
                        </span>
                      ) : (
                        <>
                          Add item worth <strong className="text-stone-900">₹{deliveryRemaining.toFixed(0)}</strong> more for FREE delivery
                        </>
                      )}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-orange-100/70 rounded-full h-2 overflow-hidden p-0.5">
                      <div 
                        className="h-full transition-all duration-500 rounded-full bg-[#f76e28] shadow-sm shadow-[#f76e28]/40"
                        style={{ width: `${deliveryProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Frequently Bought Together Section */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-stone-900 px-1">
                      Frequently bought together
                    </h4>

                    <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                      {frequentItems.map((item) => (
                        <div 
                          key={item.id}
                          className="min-w-[170px] max-w-[180px] bg-white border border-orange-100/80 rounded-2xl p-3 flex flex-col justify-between shrink-0 shadow-2xs"
                        >
                          <div className="w-full aspect-square bg-stone-50 rounded-xl overflow-hidden mb-2">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>

                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-orange-600 block mb-0.5">
                              {item.tag}
                            </span>
                            <h5 className="text-[11px] font-bold text-stone-900 line-clamp-1 mb-1">
                              {item.name}
                            </h5>
                            <div className="flex items-baseline gap-1 mb-2">
                              <span className="text-xs font-black text-stone-900">₹{item.price}</span>
                              <span className="text-[10px] text-stone-400 line-through">₹{item.mrp}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              addToCart({
                                id: item.id,
                                product_id: item.product_id,
                                name: item.name,
                                price: item.price,
                                original_price: item.mrp,
                                thumbnail: item.image
                              }, 1);
                              toast.success(`Added ${item.name} to cart`);
                            }}
                            className="w-full py-1.5 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white border border-orange-200 hover:border-orange-600 text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Summary Card */}
                  <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center gap-2 pb-1 border-b border-stone-100">
                      <FileText size={16} className="text-orange-600" />
                      <h4 className="text-xs font-bold text-stone-900">
                        Price Summary
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-stone-600">
                        <span>Order Total</span>
                        <span className="font-semibold text-stone-900">₹{mrpTotal.toFixed(2)}</span>
                      </div>

                      {itemsDiscount > 0 && (
                        <div className="flex justify-between text-[#166534]">
                          <span>Items Discount</span>
                          <span className="font-semibold">-₹{itemsDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-stone-600">
                        <span>Shipping</span>
                        <span className={`font-semibold ${isFreeDelivery ? 'text-[#166534]' : 'text-stone-900'}`}>
                          {isFreeDelivery ? 'FREE' : '₹40.00'}
                        </span>
                      </div>

                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-[#166534]">
                          <span>Prepaid Discount ({appliedCoupon?.code})</span>
                          <span className="font-semibold">-₹{couponDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-stone-900">
                        <span>To pay</span>
                        <span className="text-base font-black text-stone-900">₹{finalPayable.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Trust Badges */}
                  <div className="grid grid-cols-4 gap-2 py-2 px-1 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 border border-orange-200 shadow-2xs">
                        <Leaf size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 leading-tight">Cruelty<br/>Free</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 border border-orange-200 shadow-2xs">
                        <Sparkles size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 leading-tight">Best of<br/>Nature</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 border border-orange-200 shadow-2xs">
                        <FlaskConical size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 leading-tight">No<br/>Toxins</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 border border-orange-200 shadow-2xs">
                        <Recycle size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 leading-tight">Plastic<br/>Positive</span>
                    </div>
                  </div>

                  {/* Terms Text */}
                  <p className="text-[10px] text-stone-400 text-center leading-relaxed px-2 pb-4">
                    By proceeding, you agree to GoMo Deals' {' '}
                    <Link to="/legal/privacy" onClick={() => setCartDrawerOpen(false)} className="text-orange-600 underline">Privacy Policy</Link>
                    {' '} and {' '}
                    <Link to="/legal/terms" onClick={() => setCartDrawerOpen(false)} className="text-orange-600 underline">Terms &amp; Conditions</Link>
                  </p>

                </div>
              )}
            </div>

            {/* Sticky Bottom Action Bar with Website Logo Orange Gradient */}
            {cart.length > 0 && (
              <div className="bg-white border-t border-orange-100 p-4 px-5 shrink-0 flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(249,115,22,0.08)] z-20">
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    To Pay
                  </span>
                  <span className="text-lg font-black text-stone-900 tracking-tight">
                    ₹{finalPayable.toFixed(2)}
                  </span>
                </div>

                <button 
                  type="button"
                  onClick={handleCheckout}
                  className="flex-1 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] active:scale-[0.98] text-white py-3.5 px-8 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-[#f76e28]/25 hover:shadow-lg hover:shadow-[#f76e28]/35 transition-all duration-150 cursor-pointer text-center"
                >
                  Checkout
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
