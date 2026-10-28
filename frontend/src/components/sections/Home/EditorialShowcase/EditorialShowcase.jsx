import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';

export default function EditorialShowcase() {
  const { t } = useShop();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
            {t("our_new_collection", "Our New Collection")}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t("curated_season_highlights", "Curated Season Highlights")}
          </h2>
        </div>
        <Link
          to="/categories"
          className="group flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors"
        >
          <span>{t("see_all_collections", "See All Collections")}</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Bento Grid with Equal Gutters (gap-5 horizontally and vertically) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left Column: Tall High-Fashion Card (Span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[440px] group shadow-xs bg-stone-100 border border-stone-200 flex flex-col justify-end p-6 sm:p-8"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80"
            alt="New Collection"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-103"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

          <div className="relative z-10 text-white">
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-300 block mb-2">
              {t("trending_edit", "Trending Edit")}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {t("modern_minimalist", "Modern Minimalist Silhouette")}
            </h3>
            <p className="text-xs text-stone-200 mt-1.5 line-clamp-2 max-w-sm">
              {t("modern_minimalist_desc", "Discover effortless styling with pure breathable fabrics and timeless tailored cuts.")}
            </p>
            <div className="mt-5">
              <Link
                to="/collection/clothing?section=women"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white text-stone-900 text-xs font-bold hover:bg-[#f76e28] hover:text-white transition-colors shadow-xs"
              >
                <span>{t("shop_collection", "Shop Collection")}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Stacked Bento Cards (Span 7) with Equal Gaps */}
        <div className="md:col-span-7 flex flex-col gap-5">
          
          {/* Top Wide Banner: Contemporary Group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden min-h-[210px] sm:min-h-[230px] group shadow-xs bg-stone-100 border border-stone-200 flex flex-col justify-end p-6 sm:p-7"
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80"
              alt="Contemporary Fashion"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent" />

            <div className="relative z-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 block mb-1">
                  {t("whats_new", "Fresh Arrivals")}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {t("contemporary_urban", "Contemporary Urban Chic")}
                </h3>
                <p className="text-xs text-stone-200 mt-1 max-w-sm">
                  {t("smart_casuals_desc", "Smart casuals, tailored shirts & everyday elegance.")}
                </p>
              </div>
              <Link
                to="/collection/clothing?section=men"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white text-stone-900 text-xs font-bold hover:bg-[#f76e28] hover:text-white transition-colors shadow-xs shrink-0 w-fit"
              >
                <span>{t("explore_looks", "Explore Looks")}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

          {/* Bottom Split Row: Two Curated Cards with Equal Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-grow">
            
            {/* Split Card 1: Sacred Pooja Traditions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden min-h-[180px] group shadow-xs bg-stone-100 border border-stone-200 flex flex-col justify-end p-5"
            >
              <img
                src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop&q=80"
                alt="Sacred Pooja"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 block mb-0.5">
                  {t("sacred_traditions", "Artisan Sacred")}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {t("pooja_essentials_brass", "Pooja Essentials & Brass Idols")}
                </h4>
                <Link
                  to="/collection/pooja-items"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200"
                >
                  <span>{t("explore_pooja", "Explore Sacred Edit")}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>

            {/* Split Card 2: Smart Tech & Audio */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden min-h-[180px] group shadow-xs bg-stone-100 border border-stone-200 flex flex-col justify-end p-5"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
                alt="Smart Devices"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 block mb-0.5">
                  {t("electronics", "Flagship Tech")}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {t("premium_audio", "Premium Audio & Wearables")}
                </h4>
                <Link
                  to="/collection/electronics"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-stone-200 hover:text-white"
                >
                  <span>{t("explore_tech", "Shop Smart Tech")}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
