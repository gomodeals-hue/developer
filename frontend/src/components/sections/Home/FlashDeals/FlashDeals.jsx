import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../../context/ProductContext/ProductContext';
import { useShop } from '../../../../context/ShopContext';
import { useAuth } from '../../../../context/AuthContext';
import { getProductImage } from '../../../../utils/productImages';
import ClaimDealButton from '../../../common/ClaimDealButton';

export default function FlashDeals() {
  const { products, loading } = useContext(ProductContext);
  const { formatPrice, t } = useShop();

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
    <section id="deals-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Top Bar: Title & Expressive Countdown */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-orange-100/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[10.5px] font-black uppercase tracking-wider mb-2.5 border border-orange-200/60 shadow-2xs">
            <Flame size={13} className="text-[#f76e28] animate-pulse" />
            <span>Limited Daily Drop</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950">
            Deals of the Day
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1.5 font-medium">
            Handpicked savings on high-demand essentials. Refreshed every 24 hours.
          </p>
        </div>

        {/* Expressive M3 Countdown Clock with Warm Tonal Container */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 via-white to-amber-50/70 p-2 sm:p-2.5 px-4 rounded-2xl border border-orange-200/80 shadow-[0_2px_12px_rgba(247,110,40,0.08)] shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-1.5 text-stone-700">
            <Clock size={16} className="text-[#f76e28] shrink-0" />
            <span className="text-xs font-black uppercase tracking-wider text-orange-950">
              Ends In:
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono font-black text-sm text-stone-900">
            <span className="bg-white w-9 h-8 rounded-xl border border-orange-200/90 text-[#f76e28] shadow-2xs flex items-center justify-center tabular-nums">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-orange-400 font-black">:</span>
            <span className="bg-white w-9 h-8 rounded-xl border border-orange-200/90 text-[#f76e28] shadow-2xs flex items-center justify-center tabular-nums">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-orange-400 font-black">:</span>
            <span className="bg-white w-9 h-8 rounded-xl border border-orange-200/90 text-[#f76e28] shadow-2xs flex items-center justify-center tabular-nums">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Column Expressive M3 Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
        {dealProducts.map((product, idx) => {
          const productId = product.product_id || product.id;
          const originalPrice = product.original_price || product.mrp || Math.round(Number(product.price) * 1.35);
          const discountPercent = product.discount_percentage || Math.round(((originalPrice - product.price) / originalPrice) * 100) || 25;
          const progressClaimed = 60 + (idx * 8);

          return (
            <motion.div
              key={`${productId}-${idx}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group flex flex-col bg-white border border-stone-200/80 hover:border-orange-300 rounded-3xl p-3.5 sm:p-4 shadow-[0_4px_16px_-2px_rgba(28,25,23,0.04)] hover:shadow-[0_16px_36px_-4px_rgba(247,110,40,0.14)] hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer relative h-full justify-between overflow-hidden"
            >
              {/* Image Container with Badges */}
              <div>
                <div className="relative aspect-square overflow-hidden bg-stone-100 rounded-2xl mb-3.5 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Link to={`/product/${productId}`} className="w-full h-full block overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getProductImage(product);
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                    />
                  </Link>
                  {/* Expressive Pill Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="bg-stone-950 text-white font-black text-[9.5px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      {discountPercent}% OFF
                    </span>
                  </div>
                </div>

                {/* Star Rating & Reviews */}
                <div className="flex items-center gap-1.5 text-[11px] mb-1.5">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-stone-800">{product.rating || '4.8'}</span>
                  </div>
                  <span className="h-2.5 w-px bg-stone-200" />
                  <span className="text-stone-400 text-[10.5px]">({product.reviews_count || 38} reviews)</span>
                </div>

                {/* Product Title */}
                <Link to={`/product/${productId}`}>
                  <h3 className="font-extrabold text-sm sm:text-[14.5px] text-stone-900 min-h-[42px] line-clamp-2 leading-snug group-hover:text-[#f76e28] transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Price Block */}
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-base sm:text-lg font-black text-stone-950">
                    {formatPrice(product.price)}
                  </span>
                  {originalPrice > product.price && (
                    <span className="text-xs text-stone-400 line-through font-medium">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress & Add Action */}
              <div className="mt-4 pt-3.5 border-t border-stone-100">
                <div className="flex items-center justify-between text-[10px] font-extrabold text-stone-500 mb-1.5">
                  <span>Claimed: {progressClaimed}%</span>
                  <span className="text-[#f76e28] font-black">Almost Sold Out</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3.5 p-0.5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-[#f76e28] to-[#ea580c] rounded-full origin-left"
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
      <div className="mt-10 text-center pt-6 border-t border-orange-100/70">
        <Link
          to="/deals"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-orange-50 text-xs sm:text-sm font-black text-stone-900 hover:text-[#f76e28] border border-stone-200/90 hover:border-orange-200 shadow-xs hover:shadow-sm transition-all duration-200 group active:scale-95"
        >
          <span>Browse All Flash Deals &amp; Lightning Offers</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200 text-[#f76e28]" />
        </Link>
      </div>
    </section>
  );
}
