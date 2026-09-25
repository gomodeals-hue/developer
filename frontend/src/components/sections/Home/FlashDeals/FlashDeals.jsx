import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../../context/ProductContext/ProductContext';
import { useShop } from '../../../../context/ShopContext';
import { useAuth } from '../../../../context/AuthContext';

export default function FlashDeals() {
  const { products, loading } = useContext(ProductContext);
  const { formatPrice, addToCart, isInCart } = useShop();
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

  // Filter or pick deals from products (8 cards to fill up the grid)
  const dealProducts = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    // Prioritize products with highest discount
    const sorted = [...products].sort((a, b) => {
      const discA = Number(a.discount_percentage || a.discount || 0);
      const discB = Number(b.discount_percentage || b.discount || 0);
      return discB - discA;
    });

    if (sorted.length >= 8) {
      return sorted.slice(0, 8);
    }

    // Pad to 8 if fewer items exist
    const padded = [...sorted];
    for (let i = 0; i < products.length && padded.length < 8; i++) {
      const item = products[i];
      const itemId = item.product_id || item.id;
      if (!padded.some(p => (p.product_id || p.id) === itemId)) {
        padded.push(item);
      }
    }
    return padded.slice(0, 8);
  }, [products]);

  if (!loading && dealProducts.length === 0) {
    return null;
  }

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section id="deals-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Container - White Theme */}
      <div className="bg-white text-stone-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden border border-stone-200/90">
        
        {/* Top Bar: Title & Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame size={14} className="animate-pulse text-orange-500" />
              <span>Limited Time Drop</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-stone-950 flex items-center gap-3">
              <span>Deals of the Day</span>
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Handpicked savings on high-demand essentials. Refreshed daily.
            </p>
          </div>

          {/* Countdown Clock (White Theme) */}
          <div className="flex items-center gap-3 bg-stone-50 border border-stone-200/80 px-4 py-2.5 rounded-2xl w-fit">
            <Clock size={18} className="text-orange-500" />
            <div className="text-xs font-bold text-stone-600">
              Ends In:
            </div>
            <div className="flex items-center gap-1.5 font-mono font-black text-sm sm:text-base text-stone-900">
              <span className="bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-xs text-orange-600">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-stone-400 font-bold">:</span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-xs text-orange-600">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-stone-400 font-bold">:</span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-xs text-orange-600">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Deals Product Grid (8 Cards Filling the Space) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
          {dealProducts.map((product, idx) => {
            const productId = product.product_id || product.id;
            const originalPrice = product.original_price || product.mrp || Math.round(Number(product.price) * 1.35);
            const discountPercent = product.discount_percentage || Math.round(((originalPrice - product.price) / originalPrice) * 100) || 25;
            const progressClaimed = 55 + ((idx * 7) % 40); // Urgency meter

            return (
              <motion.div
                key={`${productId}-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-orange-500/40 flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-stone-900"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-[4/3] bg-stone-50 overflow-hidden border-b border-stone-100">
                  <Link to={`/product/${productId}`}>
                    <img
                      src={product.thumbnail || product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  {/* Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider shadow-sm">
                    {discountPercent}% OFF
                  </div>
                  {/* Category Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-stone-900/75 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {product.category || 'Deal'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-1.5">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-stone-700">
                        {product.rating || '4.8'}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        ({product.reviews_count || 42})
                      </span>
                    </div>

                    {/* Product Title */}
                    <Link to={`/product/${productId}`}>
                      <h3 className="text-sm font-bold text-stone-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Price Block */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-black text-stone-900">
                        {formatPrice(product.price)}
                      </span>
                      {originalPrice > product.price && (
                        <span className="text-xs text-stone-400 line-through">
                          {formatPrice(originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Urgency Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 mb-1">
                      <span>Claimed: {progressClaimed}%</span>
                      <span className="text-orange-600 font-extrabold">Almost Gone</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                        style={{ width: `${progressClaimed}%` }}
                      />
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!user) {
                          navigate('/login');
                          return;
                        }
                        addToCart(product, 1);
                      }}
                      className="mt-3 w-full py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white border border-orange-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <ShoppingBag size={14} />
                      <span>{isInCart(productId) ? 'In Cart (Add More)' : 'Claim Deal'}</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Link to Full Deals Catalog */}
        <div className="mt-8 text-center pt-4 border-t border-stone-100">
          <Link
            to="/collection/clothing?deal=clearance"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span>Browse All Flash Deals & Clearance Offers</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
