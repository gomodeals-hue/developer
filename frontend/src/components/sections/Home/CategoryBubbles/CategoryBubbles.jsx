import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';
import { ChevronRight, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'women-gallery',
    line1: 'Women',
    line2: 'Gallery',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=360&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=women',
    gradient: 'from-[#f77e58] via-[#e8505b] to-[#de386a]', // Coral-peach gradient like reference 1
    accentColor: '#f77e58'
  },
  {
    id: 'children-fashion',
    line1: 'Children',
    line2: 'Fashion',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=360&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=kids',
    gradient: 'from-[#ec4899] via-[#d946ef] to-[#c026d3]', // Pink-magenta gradient like reference 2
    accentColor: '#ec4899'
  },
  {
    id: 'mens-fashion',
    line1: "Men's",
    line2: 'Fashion',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=360&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=men',
    gradient: 'from-[#f97316] via-[#ea580c] to-[#e11d48]', // Coral-orange gradient like reference 3
    accentColor: '#f97316'
  },
  {
    id: 'womens-fashion',
    line1: "Women's",
    line2: 'Fashion',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=360&auto=format&fit=crop&q=80',
    path: '/collection/ethnic-wear?section=women',
    gradient: 'from-[#f43f5e] via-[#e11d48] to-[#be123c]', // Rose-berry gradient like reference 4
    accentColor: '#f43f5e'
  },
  {
    id: 'pooja-traditions',
    line1: 'Pooja',
    line2: 'Traditions',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=360&auto=format&fit=crop&q=80',
    path: '/collection/pooja-items',
    gradient: 'from-[#f59e0b] via-[#d97706] to-[#b45309]', // Sacred Golden Amber
    accentColor: '#f59e0b'
  },
  {
    id: 'smart-electronics',
    line1: 'Smart',
    line2: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=360&auto=format&fit=crop&q=80',
    path: '/collection/electronics',
    gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]', // Electric Cobalt Blue
    accentColor: '#3b82f6'
  },
  {
    id: 'home-living',
    line1: 'Home &',
    line2: 'Living',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=360&auto=format&fit=crop&q=80',
    path: '/collection/home-living',
    gradient: 'from-[#10b981] via-[#059669] to-[#047857]', // Artisan Emerald
    accentColor: '#10b981'
  },
  {
    id: 'festive-gifts',
    line1: 'Festive',
    line2: 'Gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=360&auto=format&fit=crop&q=80',
    path: '/collection/gifts',
    gradient: 'from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9]', // Festive Violet
    accentColor: '#8b5cf6'
  }
];

export default function CategoryBubbles() {
  const { t } = useShop();
  const navigate = useNavigate();

  return (
    <section id="featured-categories" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
            {t("browse_catalog", "Browse Catalog")}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t("categories", "Top Categories")}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate('/categories')}
          className="group flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors cursor-pointer"
        >
          <span>{t("view_all", "View All")}</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Capsule Pill Grid matching Reference Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate(cat.path)}
            className={`group relative flex items-center rounded-full p-2 sm:p-2.5 overflow-hidden shadow-sm hover:shadow-xl bg-gradient-to-r ${cat.gradient} transition-all duration-300 hover:scale-[1.02] cursor-pointer select-none`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(cat.path);
              }
            }}
            aria-label={`${cat.line1} ${cat.line2}`}
          >
            {/* Subtle light shimmer sweep on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {/* Left: Circular Model / Category Avatar */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full overflow-hidden shrink-0 border-2 border-white/80 shadow-md bg-white/20">
              <img
                src={cat.image}
                alt={`${cat.line1} ${cat.line2}`}
                className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Right: Two-Line High-Fashion Serif Typography + Arrow */}
            <div className="flex items-center justify-between flex-grow pl-3.5 sm:pl-4 pr-3 sm:pr-4">
              <div className="flex flex-col text-left">
                <span className="font-serif text-white text-base sm:text-lg md:text-xl font-normal leading-tight drop-shadow-xs">
                  {cat.line1}
                </span>
                <span className="font-serif text-white text-base sm:text-lg md:text-xl font-normal leading-tight drop-shadow-xs">
                  {cat.line2}
                </span>
              </div>

              {/* Minimal Animated Arrow */}
              <div className="text-white shrink-0 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
                <ArrowRight size={18} strokeWidth={2.2} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
