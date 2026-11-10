import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';
import { ChevronRight, ArrowRight, Cpu, Shirt } from 'lucide-react';

// Bento Collection 1: Tech & Flagship Gadgets (Bright, Luminous with Photographic Container Backgrounds)
const TECH_HIGHLIGHTS = [
  {
    id: 'earphone',
    eyebrow: 'Enjoy',
    mainWord: 'With',
    watermark: 'EARPHONE',
    bgClass: 'bg-[#18181b]',
    bgImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-black/85 via-black/55 to-black/30',
    textTheme: 'dark', // white text
    buttonBg: 'bg-[#f76e28] hover:bg-[#ea580c] text-white',
    colSpan: 'md:col-span-3',
    path: '/collection/electronics?subcategory=headphones',
    alt: 'Wireless Noise Cancelling Earphones'
  },
  {
    id: 'gadget',
    eyebrow: 'New',
    mainWord: 'Wear',
    watermark: 'GADGET',
    bgClass: 'bg-gradient-to-br from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]',
    bgImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-amber-700/80 via-amber-600/40 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-3',
    path: '/collection/electronics?subcategory=smartwatches',
    alt: 'Smartwatch Fitness Tracker'
  },
  {
    id: 'laptop',
    eyebrow: 'Trend',
    mainWord: 'Devices',
    watermark: 'LAPTOP',
    bgClass: 'bg-gradient-to-r from-[#ea580c] via-[#f76e28] to-[#fb923c]',
    bgImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-orange-800/85 via-orange-700/50 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-6',
    path: '/collection/electronics?subcategory=laptops',
    alt: 'Slim Flagship Metallic Laptop'
  },
  {
    id: 'console',
    eyebrow: 'Best',
    mainWord: 'Gaming',
    watermark: 'CONSOLE',
    bgClass: 'bg-gradient-to-br from-white via-stone-50 to-stone-100 border border-stone-200/90 shadow-sm',
    bgImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=900&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-white/95 via-white/60 to-transparent',
    textTheme: 'light', // dark text
    buttonBg: 'bg-[#f76e28] hover:bg-[#ea580c] text-white',
    colSpan: 'md:col-span-6',
    path: '/collection/electronics?subcategory=gaming',
    alt: 'Next-Gen Gaming Console and Wireless Controller'
  },
  {
    id: 'oculus',
    eyebrow: 'Play',
    mainWord: 'Game',
    watermark: 'OCULUS',
    bgClass: 'bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857]',
    bgImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-emerald-800/80 via-emerald-700/40 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-3',
    path: '/collection/electronics?subcategory=vr',
    alt: 'Immersive VR Headset and Spatial Tech'
  },
  {
    id: 'speaker',
    eyebrow: 'New',
    mainWord: 'Amazon',
    watermark: 'SPEAKER',
    bgClass: 'bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
    bgImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-blue-800/80 via-blue-700/40 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-3',
    path: '/collection/electronics?subcategory=speakers',
    alt: 'Smart Home Cylindrical Speaker'
  }
];

// Bento Collection 2: Fashion & Heritage (Bright, Luminous with Photographic Container Backgrounds)
const FASHION_HIGHLIGHTS = [
  {
    id: 'sarees',
    eyebrow: 'Regal',
    mainWord: 'Silk',
    watermark: 'SAREES',
    bgClass: 'bg-gradient-to-br from-[#881337] via-[#9f1239] to-[#7f1d1d]',
    bgImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-rose-950/85 via-rose-900/50 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-[#f76e28] hover:bg-[#ea580c] text-white',
    colSpan: 'md:col-span-3',
    path: '/collection/ethnic-wear?section=women&subcategory=sarees',
    alt: 'Pure Silk Kanjivaram Sarees'
  },
  {
    id: 'pooja',
    eyebrow: 'Sacred',
    mainWord: 'Divine',
    watermark: 'POOJA',
    bgClass: 'bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309]',
    bgImage: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-amber-800/80 via-amber-700/40 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-3',
    path: '/collection/pooja-items',
    alt: 'Brass Idols and Pooja Essentials'
  },
  {
    id: 'women-edit',
    eyebrow: 'Trending',
    mainWord: 'Women',
    watermark: 'FASHION',
    bgClass: 'bg-gradient-to-r from-[#ea580c] via-[#f76e28] to-[#fb923c]',
    bgImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-orange-800/85 via-orange-700/50 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-6',
    path: '/collection/clothing?section=women',
    alt: 'Contemporary Women Minimal Fashion'
  },
  {
    id: 'men-shirts',
    eyebrow: 'Tailored',
    mainWord: 'Urban',
    watermark: "MEN'S",
    bgClass: 'bg-gradient-to-br from-white via-stone-50 to-stone-100 border border-stone-200/90 shadow-sm',
    bgImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=900&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-white/95 via-white/60 to-transparent',
    textTheme: 'light',
    buttonBg: 'bg-[#f76e28] hover:bg-[#ea580c] text-white',
    colSpan: 'md:col-span-6',
    path: '/collection/clothing?section=men',
    alt: 'Men Crisp Linen and Oxford Shirts'
  },
  {
    id: 'home-decor',
    eyebrow: 'Artisan',
    mainWord: 'Living',
    watermark: 'HOME',
    bgClass: 'bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857]',
    bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-emerald-800/80 via-emerald-700/40 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-3',
    path: '/collection/home-living',
    alt: 'Artisan Ceramic Home Living'
  },
  {
    id: 'beauty-glow',
    eyebrow: 'Organic',
    mainWord: 'Glow',
    watermark: 'BEAUTY',
    bgClass: 'bg-gradient-to-br from-[#f43f5e] via-[#e11d48] to-[#be123c]',
    bgImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    overlayClass: 'bg-gradient-to-r from-rose-800/80 via-rose-700/40 to-transparent',
    textTheme: 'dark',
    buttonBg: 'bg-white hover:bg-stone-50 text-stone-900',
    colSpan: 'md:col-span-3',
    path: '/collection/beauty',
    alt: 'Pure Botanical Skin Glow'
  }
];

export default function EditorialShowcase() {
  const { t } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tech'); // 'tech' | 'fashion'

  const activeCards = activeTab === 'tech' ? TECH_HIGHLIGHTS : FASHION_HIGHLIGHTS;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
            {t("our_new_collection", "Our New Collection")}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t("curated_season_highlights", "Curated Season Highlights")}
          </h2>
        </div>

        {/* Dynamic Category Switcher Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-stone-100 p-1 rounded-full border border-stone-200/80">
          <button
            type="button"
            onClick={() => setActiveTab('tech')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-[#18181b] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Cpu size={13} />
            <span>Tech &amp; Devices</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fashion')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'fashion'
                ? 'bg-[#f76e28] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shirt size={13} />
            <span>Fashion &amp; Heritage</span>
          </button>
        </div>
      </div>

      {/* Bento Grid: 2 Rows with 6 Cards (1 + 1 + 2 and 2 + 1 + 1) with Bright Image Backgrounds */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6"
        >
          {activeCards.map((card, idx) => {
            const isDark = card.textTheme === 'dark';

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => navigate(card.path)}
                className={`relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[290px] md:min-h-[310px] p-6 sm:p-7 flex flex-col justify-between group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${card.bgClass} ${card.colSpan}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(card.path);
                  }
                }}
                aria-label={`${card.eyebrow} ${card.mainWord} ${card.watermark}`}
              >
                {/* 1. Full High-Definition Photographic Container Background */}
                <img
                  src={card.bgImage}
                  alt={card.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
                  loading="lazy"
                />

                {/* 2. Luminous Color Theme Gradient Overlay (Keeps Image Bright & Luminous) */}
                <div className={`absolute inset-0 ${card.overlayClass} transition-opacity duration-500`} />

                {/* 3. Left Side: Eyebrow, Main Title, and Watermark */}
                <div className="relative z-10 max-w-[75%] sm:max-w-[70%]">
                  {/* Eyebrow */}
                  <span
                    className={`text-xs sm:text-sm font-sans font-medium block tracking-wide ${
                      isDark ? 'text-white/85' : 'text-stone-500'
                    }`}
                  >
                    {card.eyebrow}
                  </span>

                  {/* Main Word */}
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mt-0.5 ${
                      isDark ? 'text-white drop-shadow-sm' : 'text-stone-900'
                    }`}
                  >
                    {card.mainWord}
                  </h3>

                  {/* Huge Bold Watermark Title */}
                  <p
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black uppercase tracking-tight leading-none mt-1 select-none ${
                      isDark ? 'text-white/30 group-hover:text-white/45' : 'text-stone-300 group-hover:text-stone-400'
                    } transition-colors duration-300`}
                  >
                    {card.watermark}
                  </p>
                </div>

                {/* 4. Bottom Left: Rounded Pill Action Button */}
                <div className="relative z-10 mt-auto pt-6">
                  <span
                    className={`inline-flex items-center justify-center px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300 group-hover:scale-105 active:scale-95 ${card.buttonBg}`}
                  >
                    <span>Browse</span>
                    <ArrowRight size={12} className="ml-1.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
