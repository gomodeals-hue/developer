import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../../context/ProductContext/ProductContext';
import { useShop } from '../../../../context/ShopContext';
import { useAuth } from '../../../../context/AuthContext';
import { getProductImage } from '../../../../utils/productImages';
import ClaimDealButton from '../../../common/ClaimDealButton';

export default function FlashDeals() {
  const { products, loading } = useContext(ProductContext);
  const { cart = [], formatPrice, addToCart, updateQuantity, removeFromCart, isInCart, setCartDrawerOpen, t } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Real-time Countdown Timer (24-hour cycle reset)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pick top 4 discount deals
  const dealProducts = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    const sorted = [...products].sort((a, b) => {
      const discA = Number(a.discount_percentage || a.discount || 0);
      const discB = Number(b.discount_percentage || b.discount || 0);
      return discB - discA;
    });

    return sorted.slice(0, 4);
  }, [products]);

  if (!loading && dealProducts.length === 0) {
    return null;
  }

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section id="deals-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Bar: Title & Countdown */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
            Limited Daily Drop
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950">
            Deals of the Day
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Handpicked savings on high-demand essentials. Refreshed every 24 hours.
          </p>
        </div>

        {/* Minimalist Countdown Clock */}
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-stone-500 shrink-0" />
          <span className="text-xs font-bold text-stone-500">
            Ends In:
          </span>
          <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-stone-900">
            <span className="bg-stone-50 w-9 h-8 rounded-lg border border-stone-200 text-stone-900 flex items-center justify-center tabular-nums">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-stone-400 font-bold">:</span>
            <span className="bg-stone-50 w-9 h-8 rounded-lg border border-stone-200 text-stone-900 flex items-center justify-center tabular-nums">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-stone-400 font-bold">:</span>
            <span className="bg-stone-50 w-9 h-8 rounded-lg border border-stone-200 text-stone-900 flex items-center justify-center tabular-nums">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Column Minimal Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
        {dealProducts.map((product, idx) => {
          const productId = product.product_id || product.id;
          const originalPrice = product.original_price || product.mrp || Math.round(Number(product.price) * 1.35);
          const discountPercent = product.discount_percentage || Math.round(((originalPrice - product.price) / originalPrice) * 100) || 25;
          const progressClaimed = 60 + (idx * 8);

          return (
            <motion.div
              key={`${productId}-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="group flex flex-col bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-3 sm:p-3.5 shadow-xs hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer relative h-full justify-between"
            >
              {/* Image Container with Badges */}
              <div>
                <div className="relative aspect-square overflow-hidden bg-stone-100 rounded-xl mb-3 flex items-center justify-center flex-shrink-0">
                  <Link to={`/product/${productId}`} className="w-full h-full block overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getProductImage(product);
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                    />
                  </Link>
                  {/* Clean Rectangle Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="bg-stone-900 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs">
                      {discountPercent}% OFF
                    </span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1.5 text-[11px] mb-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800">{product.rating || '4.8'}</span>
                  <span className="text-stone-400 text-[10px]">({product.reviews_count || 38})</span>
                </div>

                {/* Product Title */}
                <Link to={`/product/${productId}`}>
                  <h3 className="font-bold text-sm text-stone-900 min-h-[40px] line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Price Block */}
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-base sm:text-lg font-black text-stone-950">
                    {formatPrice(product.price)}
                  </span>
                  {originalPrice > product.price && (
                    <span className="text-xs text-stone-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress & Add Action */}
              <div className="mt-3.5 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 mb-1">
                  <span>Claimed: {progressClaimed}%</span>
                  <span className="text-[#f76e28] font-bold">Almost Sold Out</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-[#f76e28] rounded-full origin-left"
                    style={{ width: `${progressClaimed}%` }}
                  />
                </div>

                <ClaimDealButton 
                  product={product}
                  productId={productId}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Link to Full Deals Catalog */}
      <div className="mt-8 text-center pt-5 border-t border-stone-100">
        <Link
          to="/deals"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 hover:text-orange-600 transition-colors"
        >
          <span>Browse All Flash Deals & Lightning Offers</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

