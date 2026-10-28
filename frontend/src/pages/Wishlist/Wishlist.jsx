import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Share2, Copy, Check, ShoppingBag, Trash2, 
  ArrowRight, Sparkles, Eye, Star, ChevronRight, ShieldCheck, ArrowUpRight 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { shareWishlist } from '../../services/wishlistService';
import { toast } from 'react-hot-toast';
import { getProductImage } from '../../utils/productImages';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart, addToCart, formatPrice, t, sampleProducts = [] } = useShop();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    if (wishlist.length === 0) return;
    setIsSharing(true);
    
    const items = wishlist.map(item => ({
      product_id: item.product_id || item.id,
      variant_id: item.variant_id,
      name: item.name,
      price: item.price,
      thumbnail: item.thumbnail || item.image
    }));

    const res = await shareWishlist(items);
    if (res.success) {
      setShareUrl(res.shareUrl);
      toast.success('Shareable link created!');
    } else {
      toast.error(res.message || 'Failed to share wishlist');
    }
    setIsSharing(false);
  };

  const copyToClipboard = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach(item => {
      moveToCart(item);
    });
    toast.success(`Moved ${wishlist.length} items to your cart`);
  };

  const handleClearAll = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach(item => {
      removeFromWishlist(item.product_id || item.id);
    });
    toast.success('Wishlist cleared');
  };

  // Curated recommendations if wishlist is empty or for footer exploration
  const categoryShortcuts = [
    { label: 'Pooja Items', path: '/collection/pooja-items', img: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=400&q=80' },
    { label: "Men's Fashion", path: '/products?section=men', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80' },
    { label: "Women's Wear", path: '/products?section=women', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80' },
    { label: 'Home & Living', path: '/collection/home-living', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80' },
    { label: 'Grocery & Foods', path: '/collection/grocery', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80' }
  ];

  const recommendedItems = Array.isArray(sampleProducts) && sampleProducts.length > 0
    ? sampleProducts.slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-stone-900 pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight size={13} className="text-stone-400" />
          <span className="text-stone-900 font-bold">My Wishlist</span>
        </nav>

        {/* Top Header Card */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-xs mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <Heart size={20} className="fill-rose-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
                My Wishlist
              </h1>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 text-xs font-black rounded-full">
                {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm font-medium">
              Save products you love and seamlessly transfer them to your cart when ready to order.
            </p>
          </div>

          {/* Top Quick Actions */}
          {wishlist.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleMoveAllToCart}
                className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={14} />
                <span>Move All to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                disabled={isSharing}
                className="px-4 py-2.5 bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Share2 size={14} />
                <span>{isSharing ? 'Sharing...' : 'Share Wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="p-2.5 bg-stone-50 hover:bg-rose-50 hover:text-rose-600 text-stone-500 border border-stone-200 hover:border-rose-200 rounded-xl transition-all cursor-pointer"
                title="Clear Wishlist"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Share Link Banner (when active) */}
        {shareUrl && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-orange-50/80 border border-orange-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Wishlist Link Ready</h3>
              <p className="text-xs text-stone-500">Anyone with this link can view your saved items.</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-700 w-full sm:w-80 outline-none select-all"
              />
              <button
                type="button"
                onClick={copyToClipboard}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-white border border-stone-200/80 rounded-3xl p-10 sm:p-16 text-center max-w-3xl mx-auto shadow-xs mb-16">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Heart size={36} className="fill-rose-100 stroke-rose-500" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2 tracking-tight">
              Your wishlist is empty
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed font-medium">
              Explore thousands of products across our categories. Click the heart icon on any product to save it right here.
            </p>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Top Collections</span>
              <ArrowRight size={15} />
            </button>

            {/* Quick Category Shortcuts */}
            <div className="mt-12 pt-10 border-t border-stone-100 text-left">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-4 text-center sm:text-left">
                Explore Popular Departments
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {categoryShortcuts.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={cat.path}
                    className="p-3 bg-stone-50 hover:bg-orange-50 border border-stone-200/60 hover:border-orange-200 rounded-2xl transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                      <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-bold text-stone-800 group-hover:text-orange-700">
                      {cat.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Full Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            <AnimatePresence mode="popLayout">
              {wishlist.map((item) => {
                const itemId = item.product_id || item.id;
                const mrp = item.original_price || item.mrp || Math.round((item.price || 0) * 1.25);
                const discountPct = mrp > item.price ? Math.round(((mrp - item.price) / mrp) * 100) : 20;

                return (
                  <motion.div
                    layout
                    key={itemId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group relative"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[4/4] bg-stone-50 overflow-hidden">
                      <Link to={`/product/${itemId}`}>
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getProductImage(item);
                          }}
                        />
                      </Link>

                      {/* Discount Badge */}
                      {discountPct > 0 && (
                        <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                          {discountPct}% OFF
                        </div>
                      )}

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(itemId)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-600 shadow-sm flex items-center justify-center transition-all cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {item.brand && (
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            {item.brand}
                          </p>
                        )}
                        <h3 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 hover:text-orange-600 transition-colors mb-2">
                          <Link to={`/product/${itemId}`}>
                            {item.name}
                          </Link>
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex items-center gap-0.5 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-[11px] font-bold">
                            <Star size={11} className="fill-amber-400 text-amber-400" />
                            <span>{item.rating || '4.6'}</span>
                          </div>
                          <span className="text-[11px] text-stone-400 font-medium">(120+)</span>
                        </div>
                      </div>

                      <div>
                        {/* Price Row */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-base font-black text-stone-900">
                            {formatPrice(item.price)}
                          </span>
                          {mrp > item.price && (
                            <span className="text-xs text-stone-400 line-through font-medium">
                              {formatPrice(mrp)}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            type="button"
                            onClick={() => moveToCart(item)}
                            className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                          >
                            <ShoppingBag size={14} />
                            <span>Move to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Benefits & Trust Strip */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Instant Cart Sync</h4>
              <p className="text-[11px] text-stone-500">Move saved items to checkout in 1-click</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Price Drop Alerts</h4>
              <p className="text-[11px] text-stone-500">Get notified when wishlist prices fall</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Share2 size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Easy Social Sharing</h4>
              <p className="text-[11px] text-stone-500">Share gift lists with friends &amp; family</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">100% Genuine Quality</h4>
              <p className="text-[11px] text-stone-500">Verified products direct from makers</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wishlist;
