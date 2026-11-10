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
    bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=360&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=women'
  },
  {
    id: 'children-fashion',
    line1: 'Children',
    line2: 'Fashion',
    bgImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=360&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=kids'
  },
  {
    id: 'mens-fashion',
    line1: "Men's",
    line2: 'Fashion',
    bgImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=360&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=men'
  },
  {
    id: 'womens-ethnic',
    line1: "Women's",
    line2: 'Fashion',
    bgImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=360&auto=format&fit=crop&q=80',
    path: '/collection/ethnic-wear?section=women'
  },
  {
    id: 'pooja-traditions',
    line1: 'Pooja',
    line2: 'Traditions',
    bgImage: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=360&auto=format&fit=crop&q=80',
    path: '/collection/pooja-items'
  },
  {
    id: 'smart-electronics',
    line1: 'Smart',
    line2: 'Electronics',
    bgImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=360&auto=format&fit=crop&q=80',
    path: '/collection/electronics'
  },
  {
    id: 'home-living',
    line1: 'Home &',
    line2: 'Living',
    bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=360&auto=format&fit=crop&q=80',
    path: '/collection/home-living'
  },
  {
    id: 'festive-gifts',
    line1: 'Festive',
    line2: 'Gifts',
    bgImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=360&auto=format&fit=crop&q=80',
    path: '/collection/gifts'
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

      {/* Capsule Pill Grid with Bright Photographic Backgrounds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate(cat.path)}
            className="group relative flex items-center rounded-full p-2 sm:p-2.5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer select-none bg-stone-100 border border-stone-200/90 hover:border-[#f76e28]/80"
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
            {/* 1. Bright & Clear Photographic Background */}
            <img
              src={cat.bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              loading="lazy"
            />

            {/* 2. Light & Airy Left-Side Scrim (Keeps Image Bright & Vivid while Text is 100% Crisp) */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/35 to-transparent group-hover:from-stone-950/60 transition-colors duration-300" />

            {/* 3. Left: Circular Model / Category Avatar */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-white/20 transition-transform duration-300 group-hover:scale-105">
              <img
                src={cat.avatar}
                alt={`${cat.line1} ${cat.line2}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* 4. Right: Two-Line High-Fashion Serif Typography + Arrow */}
            <div className="relative z-10 flex items-center justify-between flex-grow pl-3.5 sm:pl-4 pr-3 sm:pr-4">
              <div className="flex flex-col text-left">
                <span className="font-serif text-white text-base sm:text-lg md:text-xl font-medium leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {cat.line1}
                </span>
                <span className="font-serif text-white text-base sm:text-lg md:text-xl font-medium leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {cat.line2}
                </span>
              </div>

              {/* Minimal Animated Arrow with Brand Hover Color */}
              <div className="text-white group-hover:text-[#f76e28] shrink-0 ml-2 transform group-hover:translate-x-1.5 transition-all duration-300 drop-shadow-md">
                <ArrowRight size={18} strokeWidth={2.4} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
