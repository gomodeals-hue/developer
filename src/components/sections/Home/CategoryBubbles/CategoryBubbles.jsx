import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'men',
    label: 'Men',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=260&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=men',
    tag: 'Trending'
  },
  {
    id: 'women',
    label: 'Women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=260&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=women',
    tag: 'Popular'
  },
  {
    id: 'kids',
    label: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=260&auto=format&fit=crop&q=80',
    path: '/collection/clothing?section=kids',
    tag: 'New'
  },
  {
    id: 'pooja-items',
    label: 'Pooja Items',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=260&auto=format&fit=crop&q=80',
    path: '/collection/pooja-items',
    tag: 'Sacred'
  },
  {
    id: 'electronics',
    label: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&auto=format&fit=crop&q=80',
    path: '/collection/electronics',
    tag: 'Up to 50% Off'
  },
  {
    id: 'home-living',
    label: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=260&auto=format&fit=crop&q=80',
    path: '/collection/home-living',
    tag: 'Artisan'
  },
  {
    id: 'beauty',
    label: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=260&auto=format&fit=crop&q=80',
    path: '/collection/beauty',
    tag: 'Organic'
  },
  {
    id: 'gifts',
    label: 'Gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=260&auto=format&fit=crop&q=80',
    path: '/collection/gifts',
    tag: 'Festive'
  }
];

export default function CategoryBubbles() {
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
    <section id="featured-categories" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-600 block mb-1">
            Department Hub
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            Shop By Department
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate('/categories')}
          className="group flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Circular Department Bubbles Grid / Scroll */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => handleCategoryClick(cat)}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            {/* Bubble Image Ring */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full p-1 border-2 border-stone-200 group-hover:border-orange-500 transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:scale-105 bg-white">
              <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.label}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
                  loading="lazy"
                />
              </div>
              {cat.tag && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider whitespace-nowrap shadow-xs scale-90 sm:scale-100">
                  {cat.tag}
                </span>
              )}
            </div>

            {/* Department Title */}
            <span className="mt-3 text-xs sm:text-sm font-bold text-stone-800 group-hover:text-orange-600 transition-colors leading-tight">
              {cat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
