import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';

export default function EditorialShowcase() {
  const { t } = useShop();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[10.5px] font-black uppercase tracking-wider mb-2.5 border border-orange-200/60 shadow-2xs">
            <Sparkles size={12} className="text-[#f76e28]" />
            <span>{t("our_new_collection", "Our New Collection")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t("curated_season_highlights", "Curated Season Highlights")}
          </h2>
        </div>
        <Link
          to="/categories"
          className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-orange-50 text-xs font-bold text-stone-700 hover:text-[#f76e28] border border-stone-200/80 hover:border-orange-200 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
        >
          <span>{t("see_all_collections", "See All Collections")}</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 text-[#f76e28]" />
        </Link>
      </div>

      {/* Bento Grid with Expressive M3 Geometry & Ambient Warmth */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Left Column: Tall High-Fashion Hero Card (Span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 relative rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[480px] group shadow-[0_8px_32px_-4px_rgba(28,25,23,0.12)] hover:shadow-[0_22px_52px_-6px_rgba(247,110,40,0.22)] bg-stone-950 border border-stone-200/60 flex flex-col justify-end p-6 sm:p-9 transition-all duration-500 hover:-translate-y-1.5"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80"
            alt="New Collection"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

          <div className="relative z-10 text-white">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/30 mb-3 shadow-xs">
              {t("trending_edit", "Trending Edit")}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {t("modern_minimalist", "Modern Minimalist Silhouette")}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 mt-2 line-clamp-2 max-w-sm font-medium">
              {t("modern_minimalist_desc", "Discover effortless styling with pure breathable fabrics and timeless tailored cuts.")}
            </p>
            <div className="mt-6">
              <Link
                to="/collection/clothing?section=women"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-stone-950 text-xs font-black hover:bg-[#f76e28] hover:text-white transition-all duration-200 shadow-md shadow-black/20 hover:shadow-orange-500/30 active:scale-95"
              >
                <span>{t("shop_collection", "Shop Collection")}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Stacked Bento Cards (Span 7) with Equal Gaps */}
        <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
          
          {/* Top Wide Banner: Contemporary Group */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[245px] group shadow-[0_6px_24px_-4px_rgba(28,25,23,0.1)] hover:shadow-[0_18px_40px_-6px_rgba(247,110,40,0.18)] bg-stone-950 border border-stone-200/60 flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1"
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80"
              alt="Contemporary Fashion"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

            <div className="relative z-10 text-white">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9.5px] font-black uppercase tracking-widest text-white border border-white/25 mb-2 shadow-xs">
                {t("whats_new", "Fresh Arrivals")}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Contemporary Urban Chic
              </h3>
              <p className="text-xs text-stone-200 mt-1 max-w-sm font-medium">
                Smart casuals, tailored shirts & everyday elegance.
              </p>
            </div>
          </motion.div>

          {/* Bottom Split Row: Two Curated Cards with Equal Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-grow">
            
            {/* Split Card 1: Sacred Pooja Traditions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden min-h-[190px] group shadow-[0_6px_20px_-4px_rgba(28,25,23,0.1)] hover:shadow-[0_16px_36px_-6px_rgba(247,110,40,0.18)] bg-stone-950 border border-stone-200/60 flex flex-col justify-end p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop&q=80"
                alt="Sacred Pooja"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/25 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-amber-300 border border-amber-400/30 mb-1.5 shadow-xs">
                  {t("sacred_traditions", "Artisan Sacred")}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Pooja Essentials & Brass Idols
                </h4>
                <Link
                  to="/collection/pooja-items"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-amber-300 hover:text-amber-200 group/link"
                >
                  <span className="group-hover/link:underline">{t("explore_pooja", "Explore Sacred Edit")}</span>
                  <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>

            {/* Split Card 2: Smart Tech & Audio */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden min-h-[190px] group shadow-[0_6px_20px_-4px_rgba(28,25,23,0.1)] hover:shadow-[0_16px_36px_-6px_rgba(247,110,40,0.18)] bg-stone-950 border border-stone-200/60 flex flex-col justify-end p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
                alt="Smart Devices"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/25 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-cyan-300 border border-cyan-400/30 mb-1.5 shadow-xs">
                  {t("electronics", "Flagship Tech")}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {t("premium_audio", "Premium Audio & Wearables")}
                </h4>
                <Link
                  to="/collection/electronics"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-stone-200 hover:text-white group/link"
                >
                  <span className="group-hover/link:underline">{t("explore_tech", "Shop Smart Tech")}</span>
                  <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
