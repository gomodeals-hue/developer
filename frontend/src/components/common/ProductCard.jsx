import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye, Check, Star, Scale, Zap, Truck, Minus, Plus, Trash2 } from 'lucide-react';
import lottie from 'lottie-web';
import addToCartAnimationData from '../../assets/addToCartAnimation.json';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useLiveStock } from '../../hooks/useRealtime';
import QuickViewModal from './QuickViewModal';
import { getProductImage } from '../../utils/productImages';

const ProductCard = ({ product }) => {
  const { 
    cart = [],
    addToCart, 
    updateQuantity,
    removeFromCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart, 
    addToCompare, 
    compareItems, 
    formatPrice, 
    setCartDrawerOpen,
    t, 
    translateRecipient, 
    translateOccasion 
  } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const productId = product.product_id || product.id;
  const image = getProductImage(product);
  const liveStock = useLiveStock(product.stock_quantity !== undefined ? Number(product.stock_quantity) : 25, productId);

  const discountPercent = Number(product.mrp) > Number(product.price)
    ? Math.round(((Number(product.mrp) - Number(product.price)) / Number(product.mrp)) * 100)
    : 0;

  // Real-time cart quantity for this product (string-safe ID comparison)
  const cartItem = cart?.find(item => 
    (item.id == productId || item.product_id == productId || String(item.id) === String(productId) || String(item.product_id) === String(productId))
  );
  const cartQty = cartItem?.quantity || 0;

  // animPhase: 'idle' | 'expanding' | 'playing' | 'settling'
  const [animPhase, setAnimPhase] = useState('idle');
  const lottieContainerRef = useRef(null);
  const animInstanceRef = useRef(null);

  const isAnimating = animPhase !== 'idle';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (liveStock <= 0 || isAnimating) return;
    setAnimPhase('expanding');
    addToCart({ ...product, stock_quantity: liveStock }, 1);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQty >= liveStock) return;
    updateQuantity(productId, cartQty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQty <= 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, cartQty - 1);
    }
  };

  useEffect(() => {
    if (animPhase === 'expanding') {
      // Step 1: Smooth expand animation of the button pill & price fade out
      const playTimer = setTimeout(() => {
        setAnimPhase('playing');
      }, 300);

      return () => clearTimeout(playTimer);
    }

    if (animPhase === 'playing') {
      // Step 2: Play the single-shot added to cart animation inside the expanded button
      if (lottieContainerRef.current) {
        lottieContainerRef.current.innerHTML = '';
        const anim = lottie.loadAnimation({
          container: lottieContainerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: addToCartAnimationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet'
          }
        });

        anim.setSpeed(1.25);
        animInstanceRef.current = anim;
      }

      // Drive-off completes at ~1350ms
      const finishAnimTimer = setTimeout(() => {
        setAnimPhase('settling');
      }, 1350);

      return () => {
        clearTimeout(finishAnimTimer);
        if (animInstanceRef.current) {
          animInstanceRef.current.destroy();
          animInstanceRef.current = null;
        }
      };
    }

    if (animPhase === 'settling') {
      // Step 3: Button morphs into stepper / normal and price smoothly fades in
      const settleTimer = setTimeout(() => {
        setAnimPhase('idle');
      }, 350);

      return () => clearTimeout(settleTimer);
    }
  }, [animPhase]);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const isInCompare = React.useMemo(() => {
    return compareItems?.some(item => (item.product_id || item.id) === productId);
  }, [compareItems, productId]);

  const isOutOfStock = liveStock <= 0;
  const isLowStock = liveStock > 0 && liveStock <= 5;
  const imgContainerRef = useRef(null);

  const handleCardClick = (e) => {
    // If the click is inside buttons, interactive steppers or quick-view controls, skip card navigation
    if (e.target.closest('button') || e.target.closest('.no-card-nav')) {
      return;
    }

    // Capture the exact bounding rectangle of the image holder in viewport coordinates
    const rect = imgContainerRef.current?.getBoundingClientRect();
    const sourceImgRect = rect ? {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    } : null;

    navigate(`/product/${productId}`, {
      state: {
        previewProduct: product,
        previewImage: image,
        sourceImgRect
      }
    });
  };

  return (
    <>
      <motion.div 
        onClick={handleCardClick}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.985 }}
        className="group flex flex-col bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-3.5 shadow-xs hover:shadow-md transition-all duration-200 ease-out cursor-pointer h-full relative overflow-hidden"
      >
        
        {/* Image Container with Top Badges & Actions */}
        <div 
          ref={imgContainerRef}
          className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-xl mb-3 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors"
        >
          <div className="w-full h-full block overflow-hidden">
            <img
              src={image}
              alt={t(product.name)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getProductImage(product);
              }}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>

          {/* Top-Left Minimalist Badge with Live Stock */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
            <span className="bg-stone-900 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs">
              {discountPercent > 0 ? `${discountPercent}% OFF` : '30% OFF'}
            </span>
            {isLowStock && (
              <span className="bg-[#f76e28] text-white font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <Zap size={9} className="shrink-0" />
                <span>Only {liveStock} Left</span>
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-stone-800 text-white font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                Sold Out
              </span>
            )}
          </div>

          {/* Top-Right Wishlist Button */}
          <div className="absolute top-2.5 right-2.5 z-20">
            <button 
              onClick={handleToggleWishlist}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border shadow-xs hover:scale-110 active:scale-95 cursor-pointer group/wish ${
                isInWishlist(productId) 
                  ? 'bg-rose-50 text-rose-600 border-rose-200 fill-rose-600' 
                  : 'bg-white/95 text-stone-600 border-stone-200/80 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50'
              }`}
              title={isInWishlist(productId) ? t("remove_from_wishlist") : t("add_to_wishlist")}
            >
              <Heart 
                size={14} 
                className={`transition-all duration-200 ${
                  isInWishlist(productId) 
                    ? "fill-rose-500 text-rose-500" 
                    : "group-hover:text-rose-500 group-hover:scale-105"
                }`} 
              />
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col flex-grow justify-between px-0.5">
          <div>
            {/* Category / Department Tag */}
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block truncate mb-1">
              {t(product.category || product.brand || 'GoMo Curated')}
            </span>

            {/* Clean Bold Title clamped to 2 lines */}
            <h3 className="font-bold text-sm sm:text-[15px] text-stone-950 leading-snug line-clamp-2 min-h-[42px] group-hover:text-orange-600 transition-colors">
              <span>{t(product.name)}</span>
            </h3>

            {/* Rating & Delivery Row */}
            <div className="flex items-center gap-2 mt-1.5 text-[11px]">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-stone-700">{Number(product.rating || 4.5).toFixed(1)}</span>
              </div>
              <span className="h-2.5 w-px bg-stone-200" />
              <span className="text-[10.5px] text-stone-500 font-medium">12-24h delivery</span>
            </div>
          </div>

          {/* Bottom Row: Price & Tactile In-Place Expanding Cart Button */}
          <div className="pt-3 mt-2.5 border-t border-stone-100 flex items-center justify-between gap-2 shrink-0 relative min-h-[44px]">
            {/* Price section - smoothly fades out when button expands, and glides back in after animation */}
            <div 
              style={{
                transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: (animPhase === 'expanding' || animPhase === 'playing') ? 0 : 1,
                transform: (animPhase === 'expanding' || animPhase === 'playing') ? 'translateX(-10px)' : 'translateX(0px)',
                pointerEvents: (animPhase === 'expanding' || animPhase === 'playing') ? 'none' : 'auto'
              }}
              className="flex flex-col text-left shrink-0 select-none"
            >
              <span className="text-[10.5px] text-stone-400 line-through leading-none font-medium">
                {discountPercent > 0 ? formatPrice(product.mrp) : formatPrice(Number(product.price || 0) * 1.25)}
              </span>
              <span className="text-base sm:text-lg font-black text-stone-950 leading-tight mt-0.5">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Action Area: Positioned strictly on the right, expands in-place */}
            <div className="relative flex items-center justify-end shrink-0">
              {isAnimating ? (
                /* Expanding Pill Button positioned right at the button location */
                <div 
                  style={{
                    transition: 'width 320ms cubic-bezier(0.34, 1.25, 0.64, 1)',
                    width: (animPhase === 'expanding' || animPhase === 'playing') ? '155px' : (cartQty > 0 ? '92px' : '40px'),
                    height: '40px'
                  }}
                  className="relative flex items-center justify-center rounded-full bg-stone-950 shadow-md shadow-stone-950/20 overflow-hidden"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                  {/* Smooth fade-in & expand indicator */}
                  <div 
                    style={{
                      transition: 'opacity 200ms ease',
                      opacity: animPhase === 'expanding' ? 1 : 0
                    }}
                    className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-black tracking-wider uppercase pointer-events-none select-none"
                  >
                    <span className="animate-pulse">Adding...</span>
                  </div>

                  {/* Single-shot Lottie Added-to-Cart Animation within button */}
                  <div 
                    ref={lottieContainerRef}
                    style={{
                      transition: 'opacity 220ms ease',
                      opacity: animPhase === 'playing' ? 1 : 0
                    }}
                    className="w-[155px] h-[40px] flex items-center justify-center select-none overflow-hidden"
                  />
                </div>
              ) : cartQty > 0 ? (
                /* Stepper: - 1 + to add multiple products (Lighter, Vibrant Logo Orange) */
                <div 
                  style={{
                    background: 'linear-gradient(135deg, #f76e28 0%, #de5713 100%)',
                    borderColor: '#f9975b',
                    boxShadow: '0 4px 14px rgba(247, 110, 40, 0.28)'
                  }}
                  className="h-9 sm:h-10 rounded-full text-white flex items-center px-1 border transition-all duration-300 animate-in fade-in zoom-in-90"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-black/15 active:scale-90 transition-all cursor-pointer"
                    title={cartQty === 1 ? "Remove from cart" : "Decrease quantity"}
                  >
                    {cartQty === 1 ? <Trash2 size={13} /> : <Minus size={13} strokeWidth={2.5} />}
                  </button>
                  <span className="px-2 font-black text-xs sm:text-sm text-white min-w-[20px] text-center select-none tabular-nums">
                    {cartQty}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={cartQty >= liveStock}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      cartQty >= liveStock 
                        ? 'opacity-40 cursor-not-allowed text-white/50' 
                        : 'text-white/90 hover:text-white hover:bg-black/15 active:scale-90'
                    }`}
                    title={cartQty >= liveStock ? "Max stock reached" : "Increase quantity"}
                  >
                    <Plus size={13} strokeWidth={2.5} />
                  </button>
                </div>
              ) : (
                /* Circular Add to Cart Button */
                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer shadow-xs active:scale-90 transition-all duration-300 ease-out animate-in fade-in zoom-in-90 ${
                    isOutOfStock
                      ? 'bg-stone-100 text-stone-300 border border-stone-200 cursor-not-allowed shadow-none'
                      : 'bg-stone-950 text-white hover:bg-[#f76e28] hover:shadow-orange-500/25'
                  }`}
                  title={isOutOfStock ? "Out of Stock" : "Add to Cart"}
                >
                  <ShoppingBag size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
};

export default ProductCard;
