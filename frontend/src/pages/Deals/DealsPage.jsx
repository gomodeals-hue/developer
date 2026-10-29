import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Clock, Tag, Zap, Percent, ShoppingBag, Star, 
  Copy, Check, ArrowRight, ShieldCheck, Sparkles, Filter, 
  AlertCircle, ChevronRight, CheckCircle2, Scissors 
} from 'lucide-react';
import { ProductContext } from '../../context/ProductContext/ProductContext';
import { useShop } from '../../context/ShopContext';
import { getActiveCoupons } from '../../services/couponService';
import ClaimDealButton from '../../components/common/ClaimDealButton';

const DealsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, loading: productsLoading } = useContext(ProductContext);
  const { cart = [], addToCart, isInCart, formatPrice, setCartDrawerOpen } = useShop();

  const [coupons, setCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  
  // URL tab / category sync
  const urlTab = searchParams.get('tab') || searchParams.get('category') || 'all';
  const [activeTab, setActiveTab] = useState(urlTab);
  const searchQuery = searchParams.get('search') || '';

  // 24-Hour Deal Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 24, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      setCouponsLoading(true);
      try {
        const res = await getActiveCoupons();
        if (res.success && res.data) {
          setCoupons(res.data.map(c => ({
            ...c,
            _id: c.coupon_id,
            discountType: c.type,
            discountValue: c.type === 'percentage' ? c.discount_percent : c.discount_amount,
            expiryDate: c.valid_until,
            minPurchaseAmount: c.min_order_value,
            isClaimed: false
          })));
        }
      } catch (err) {
        console.error("Failed to load coupons", err);
      } finally {
        setCouponsLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  // Sync activeTab with URL
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab') || searchParams.get('category') || 'all';
    setActiveTab(tabFromUrl);
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const p = new URLSearchParams(searchParams);
    if (tabId === 'all') {
      p.delete('tab');
      p.delete('category');
    } else {
      p.set('tab', tabId);
    }
    setSearchParams(p);
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2200);
  };

  // Helper to calculate discount percentage
  const getDiscount = (p) => {
    if (p.discount_percentage) return Number(p.discount_percentage);
    if (p.mrp && p.price && Number(p.mrp) > Number(p.price)) {
      return Math.round(((Number(p.mrp) - Number(p.price)) / Number(p.mrp)) * 100);
    }
    return 20; // Default simulated deal
  };

  // Filtered Products for Deals
  const filteredDeals = useMemo(() => {
    if (!products || products.length === 0) return [];

    let list = [...products];

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        (p.name || p.title || '').toLowerCase().includes(q) ||
        (p.category || p.category_name || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }

    // Tab Filters
    if (activeTab === 'lightning') {
      list = list.filter(p => getDiscount(p) >= 35);
    } else if (activeTab === 'clearance') {
      list = list.filter(p => getDiscount(p) >= 40);
    } else if (activeTab === 'clothing') {
      list = list.filter(p => {
        const cat = (p.category || p.category_name || '').toLowerCase();
        return cat.includes('clothing') || cat.includes('shirt') || cat.includes('fashion') || cat.includes('apparel');
      });
    } else if (activeTab === 'footwear' || activeTab === 'shoes') {
      list = list.filter(p => {
        const cat = (p.category || p.category_name || '').toLowerCase();
        return cat.includes('footwear') || cat.includes('shoe');
      });
    } else if (activeTab === 'pooja-items' || activeTab === 'pooja') {
      list = list.filter(p => {
        const cat = (p.category || p.category_name || '').toLowerCase();
        return cat.includes('pooja') || cat.includes('puja') || cat.includes('spiritual');
      });
    } else if (activeTab === 'electronics') {
      list = list.filter(p => {
        const cat = (p.category || p.category_name || '').toLowerCase();
        return cat.includes('electronic') || cat.includes('gadget') || cat.includes('mobile') || cat.includes('audio');
      });
    } else if (activeTab === 'home-living' || activeTab === 'home') {
      list = list.filter(p => {
        const cat = (p.category || p.category_name || '').toLowerCase();
        return cat.includes('home') || cat.includes('kitchen') || cat.includes('decor');
      });
    }

    // Sort by highest discount first
    return list.sort((a, b) => getDiscount(b) - getDiscount(a));
  }, [products, activeTab, searchQuery]);

  const tabs = [
    { id: 'all', label: 'All Deals', icon: Flame },
    { id: 'lightning', label: 'Lightning Deals (>35% Off)', icon: Zap },
    { id: 'clearance', label: 'Mega Clearance (>40% Off)', icon: Percent },
    { id: 'clothing', label: 'Clothing', icon: Tag },
    { id: 'footwear', label: 'Footwear', icon: Tag },
    { id: 'pooja-items', label: 'Pooja Items', icon: Sparkles },
    { id: 'electronics', label: 'Electronics', icon: Tag },
    { id: 'home-living', label: 'Home & Living', icon: Tag },
    { id: 'coupons', label: 'Store Coupons', icon: Scissors },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800 pb-20 pt-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. TOP FLASH DEALS HERO BANNER (BRAND ORANGE) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-orange-950 text-white p-6 sm:p-10 shadow-[0_15px_40px_rgba(234,88,12,0.18)] border border-orange-500/20 mb-8">
          {/* Ambient decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-black uppercase tracking-wider mb-4">
                <Flame size={14} className="text-amber-400 animate-pulse" />
                <span>GoMo Deals Hub · Limited Time Event</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Today's Flash Deals &amp; Steals
              </h1>
              <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                Discover limited-quantity deals with up to 70% off across authentic fashion, footwear, electronics, and pooja essentials. Verified prices directly guaranteed by GoMo Deals.
              </p>
            </div>

            {/* Live Countdown Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center shrink-0 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-200 uppercase tracking-widest mb-3">
                <Clock size={14} className="text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Deals Expire In</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <div className="flex flex-col items-center">
                  <span className="w-13 h-12 flex items-center justify-center bg-stone-900/90 text-white rounded-xl text-2xl font-black shadow-md border border-orange-400/30">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-orange-300 font-bold mt-1">Hours</span>
                </div>
                <span className="text-2xl font-bold text-orange-400 pb-4">:</span>
                <div className="flex flex-col items-center">
                  <span className="w-13 h-12 flex items-center justify-center bg-stone-900/90 text-white rounded-xl text-2xl font-black shadow-md border border-orange-400/30">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-orange-300 font-bold mt-1">Mins</span>
                </div>
                <span className="text-2xl font-bold text-orange-400 pb-4">:</span>
                <div className="flex flex-col items-center">
                  <span className="w-13 h-12 flex items-center justify-center bg-orange-600 text-white rounded-xl text-2xl font-black shadow-md border border-orange-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-orange-300 font-bold mt-1">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-orange-600 text-white border-orange-600 shadow-[0_4px_14px_rgba(234,88,12,0.35)] scale-102'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-orange-500 hover:bg-orange-50'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-orange-600'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. PRODUCT DEALS SECTION (When not in coupons only view) */}
        {activeTab !== 'coupons' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Available Deals</span>
                  <span className="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded-full">
                    {filteredDeals.length} Items
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Grab limited discounts before countdown timer ends or central stock runs out.
                </p>
              </div>

              {activeTab !== 'all' && (
                <button
                  onClick={() => handleTabChange('all')}
                  className="text-xs font-bold text-[#0077c8] hover:underline cursor-pointer"
                >
                  Show All Deals
                </button>
              )}
            </div>

            {/* Products Grid */}
            {productsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <div key={n} className="bg-white rounded-2xl p-4 border border-sky-100 animate-pulse space-y-3">
                    <div className="w-full aspect-square bg-sky-100/60 rounded-xl" />
                    <div className="h-4 bg-sky-100/80 rounded w-3/4" />
                    <div className="h-3 bg-sky-100/50 rounded w-1/2" />
                    <div className="h-6 bg-sky-100/70 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filteredDeals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredDeals.map((product) => {
                  const pId = product.product_id || product.id;
                  const discount = getDiscount(product);
                  const price = Number(product.price || 0);
                  const mrp = Number(product.mrp || Math.round(price * 1.35));
                  const savings = mrp > price ? mrp - price : 0;
                  const inCartAlready = isInCart(pId);
                  
                  // Deterministic % claimed simulation based on ID
                  const seed = typeof pId === 'number' ? pId : (pId?.charCodeAt(0) || 5);
                  const claimedPercent = Math.min(92, 45 + (seed * 11) % 45);

                  return (
                    <motion.div
                      key={pId}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white rounded-2xl border border-stone-200/80 hover:border-orange-500 shadow-sm hover:shadow-[0_12px_30px_rgba(234,88,12,0.12)] transition-all duration-300 flex flex-col overflow-hidden"
                    >
                      {/* Image Container with Badges */}
                      <div 
                        className="relative aspect-square w-full bg-slate-50 overflow-hidden cursor-pointer" 
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          navigate(`/product/${pId}`, {
                            state: {
                              previewProduct: product,
                              previewImage: product.thumbnail || product.images?.[0],
                              sourceImgRect: rect ? {
                                top: rect.top,
                                left: rect.left,
                                width: rect.width,
                                height: rect.height,
                              } : null
                            }
                          });
                        }}
                      >
                        <img
                          src={product.thumbnail || product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'}
                          alt={product.name || product.title}
                          className="w-full h-full object-contain p-2.5 group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Discount Badge */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                          <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm tracking-wide">
                            {discount}% OFF
                          </span>
                          {discount >= 35 && (
                            <span className="bg-amber-500 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                              <Zap size={9} /> LIGHTNING
                            </span>
                          )}
                        </div>

                        {/* Verified badge */}
                        <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-slate-200 shadow-xs flex items-center gap-1">
                          <ShieldCheck size={11} className="text-emerald-600" />
                          <span>Assured</span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-4 flex flex-col flex-1">
                        {/* Category */}
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 mb-1 truncate">
                          {product.category || product.category_name || 'Exclusive Offer'}
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={(e) => {
                            const card = e.currentTarget.closest('.group');
                            const imgContainer = card?.querySelector('.relative.aspect-square');
                            const rect = (imgContainer || e.currentTarget).getBoundingClientRect();
                            navigate(`/product/${pId}`, {
                              state: {
                                previewProduct: product,
                                previewImage: product.thumbnail || product.images?.[0],
                                sourceImgRect: rect ? {
                                  top: rect.top,
                                  left: rect.left,
                                  width: rect.width,
                                  height: rect.height,
                                } : null
                              }
                            });
                          }}
                          className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug cursor-pointer mb-2"
                        >
                          {product.name || product.title}
                        </h3>

                        {/* Ratings */}
                        <div className="flex items-center gap-1 mb-3 text-xs">
                          <div className="flex items-center gap-0.5 bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded text-[11px] font-black">
                            <Star size={11} className="fill-amber-400 text-amber-500" />
                            <span>{product.rating ? Number(product.rating).toFixed(1) : '4.8'}</span>
                          </div>
                          <span className="text-[10.5px] text-slate-400 font-medium">
                            ({product.reviews_count || 120}+ sold)
                          </span>
                        </div>

                        {/* Claimed Progress Bar */}
                        <div className="mb-3.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                            <span>{claimedPercent}% Claimed</span>
                            <span className="text-rose-600 font-extrabold">Only few left</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#f76e28] shadow-sm shadow-[#f76e28]/30 rounded-full transition-all duration-500"
                              style={{ width: `${claimedPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="mt-auto pt-3 border-t border-slate-100">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-slate-900">
                              {formatPrice(price)}
                            </span>
                            {mrp > price && (
                              <span className="text-xs text-slate-400 line-through">
                                {formatPrice(mrp)}
                              </span>
                            )}
                          </div>
                          {savings > 0 && (
                            <div className="text-[10px] font-bold text-emerald-700 mt-0.5">
                              You save {formatPrice(savings)} ({discount}% discount)
                            </div>
                          )}
                        </div>

                        {/* Action Buttons with Animated Claim Deal and Details Link */}
                        <div className="mt-3.5 flex items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <ClaimDealButton 
                              product={product} 
                              productId={pId} 
                            />
                          </div>
                          <Link
                            to={`/product/${pId}`}
                            className="w-[38px] h-[38px] border border-slate-200 text-slate-600 hover:text-orange-600 hover:border-orange-500 rounded-full flex items-center justify-center transition-colors shrink-0 shadow-2xs hover:bg-orange-50/50"
                            title="View details"
                          >
                            <ChevronRight size={15} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/80 p-8 shadow-xs">
                <AlertCircle size={40} className="text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No deals found for this selection</h3>
                <p className="text-xs text-slate-500 mt-1">Try switching tabs or clear your search to explore all active discounts.</p>
                <button
                  onClick={() => handleTabChange('all')}
                  className="mt-4 px-5 py-2 rounded-full bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 cursor-pointer"
                >
                  View All Deals
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. EXCLUSIVE STORE COUPONS SECTION */}
        <div className={`mt-14 pt-10 border-t border-sky-100 ${activeTab === 'coupons' ? 'mt-4 pt-2' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black uppercase tracking-wider mb-2">
                <Scissors size={12} className="text-amber-600" />
                <span>Instant Checkout Savings</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Store Vouchers &amp; Promo Codes
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Apply these codes at cart drawer or checkout to get extra savings on top of deals.
              </p>
            </div>
          </div>

          {couponsLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-3 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
            </div>
          ) : coupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {coupons.map((coupon) => (
                <div
                  key={coupon._id || coupon.code}
                  className="bg-white rounded-2xl border border-stone-200/80 hover:border-orange-300 shadow-sm hover:shadow-md transition-all p-5 flex flex-col relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 bg-orange-50 text-orange-600 rounded-md border border-orange-200 uppercase tracking-wider">
                      {coupon.category && coupon.category !== 'all' ? coupon.category : 'Storewide'}
                    </span>
                    {coupon.minPurchaseAmount > 0 && (
                      <span className="text-[10px] font-bold text-slate-500">
                        Min. ₹{coupon.minPurchaseAmount}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-3xl font-black text-orange-600">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                    </span>
                    <span className="text-sm font-bold text-slate-400">INSTANT OFF</span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                    {coupon.description || 'Applicable on eligible cart orders.'}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-dashed border-stone-200">
                    <div className="font-mono font-black text-sm tracking-wider text-slate-800 bg-orange-50/60 px-3 py-1.5 rounded-lg border border-orange-200">
                      {coupon.code}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(coupon.code, coupon._id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        copiedCode === coupon._id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-900 text-white hover:bg-orange-600'
                      }`}
                    >
                      {copiedCode === coupon._id ? (
                        <>
                          <Check size={13} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-slate-500 text-xs">
              No store coupons available right now. Check back soon for fresh codes!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DealsPage;
