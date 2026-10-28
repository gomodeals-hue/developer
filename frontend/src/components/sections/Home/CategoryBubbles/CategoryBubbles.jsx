import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'men',
    label: 'Men',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=320&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=men',
    tag: 'Trending'
  },
  {
    id: 'women',
    label: 'Women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=320&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=women',
    tag: 'Popular'
  },
  {
    id: 'kids',
    label: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=320&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=kids',
    tag: 'New'
  },
  {
    id: 'pooja-items',
    label: 'Pooja Items',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=320&auto=format&fit=crop&q=80',
    path: '/collection/pooja-items',
    tag: 'Sacred'
  },
  {
    id: 'electronics',
    label: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=320&auto=format&fit=crop&q=80',
    path: '/collection/electronics',
    tag: 'Deals'
  },
  {
    id: 'home-living',
    label: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=320&auto=format&fit=crop&q=80',
    path: '/collection/home-living',
    tag: 'Artisan'
  },
  {
    id: 'beauty',
    label: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=320&auto=format&fit=crop&q=80',
    path: '/collection/beauty',
    tag: 'Organic'
  },
  {
    id: 'gifts',
    label: 'Gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=320&auto=format&fit=crop&q=80',
    path: '/collection/gifts',
    tag: 'Festive'
  }
];

export default function CategoryBubbles() {
  const { t } = useShop();
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    const el = document.getElementById(`section-${cat.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(cat.path);
    }
  };

  return (
    <section id="featured-categories" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
      {/* Section Header: Minimal & Crisp */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-5 bg-gradient-to-b from-[#f76e28] to-orange-400 rounded-full" />
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
            {t("categories", "Top Categories")}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate('/categories')}
          className="group flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors cursor-pointer"
        >
          <span>{t("view_all", "View All")}</span>
          <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Minimal Animated Category Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            onClick={() => handleCategoryClick(cat)}
            className="group relative flex flex-col bg-white rounded-2xl p-2 sm:p-2.5 border border-stone-200/70 hover:border-orange-300 hover:shadow-[0_10px_25px_rgba(247,110,40,0.08)] transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 select-none"
          >
            {/* Minimal Image Frame with Smooth Zoom & Shimmer */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-100 mb-2">
              <img
                src={cat.image}
                alt={t(cat.id.replace(/-/g, "_"), cat.label)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=320&auto=format&fit=crop&q=80';
                }}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Subtle hover gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Minimal Tag Pill */}
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-xs text-stone-700 shadow-2xs group-hover:bg-[#f76e28] group-hover:text-white transition-colors duration-200">
                {t(cat.tag)}
              </span>
            </div>

            {/* Title & Subtle Directional Micro-Arrow */}
            <div className="flex items-center justify-between px-1 pb-0.5">
              <span className="text-xs font-bold text-stone-800 group-hover:text-orange-600 transition-colors truncate">
                {cat.label}
              </span>
              <ArrowUpRight
                size={13}
                className="text-stone-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
