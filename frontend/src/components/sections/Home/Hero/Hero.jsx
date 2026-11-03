import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Compass, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';
import heroVideo from '../../../../assets/Hero_video.mp4';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useShop();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-section" 
      className="relative w-full bg-white text-stone-900 pt-32 sm:pt-36 lg:pt-38 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Top Editorial Box + Bottom Two Image Cards   */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5 sm:gap-6">
            
            {/* 1. TOP EDITORIAL TEXT CONTAINER (M3 Expressive Tonal Surface) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-gradient-to-br from-[#fff8f2] via-[#fdf5eb] to-[#fff2e6] rounded-3xl p-6 sm:p-8 md:p-10 flex-1 flex flex-col justify-between shadow-[0_12px_36px_-6px_rgba(247,110,40,0.12),0_4px_12px_rgba(28,25,23,0.04)] border border-orange-200/60 min-h-[340px] sm:min-h-[400px] relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

              <div>
                {/* Expressive M3E Pill Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-800 text-[10px] font-black uppercase tracking-widest mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f76e28] animate-pulse" />
                  <span>DIRECT VERIFIED ARTISAN & BRAND STORE</span>
                </div>

                {/* Bold Editorial Headline */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-stone-950 uppercase leading-none">
                      {t("hero_discover", "DISCOVER")}
                    </span>
                    <div className="flex-1 flex items-center max-w-[120px] sm:max-w-[160px] md:max-w-[190px]">
                      <div className="h-[3px] sm:h-[3.5px] w-full bg-stone-950 rounded-full" />
                      <ArrowRight size={24} strokeWidth={3} className="text-stone-950 -ml-2 flex-shrink-0" />
                    </div>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-stone-950 uppercase leading-[1.04]">
                    {t("hero_verified_deals", "VERIFIED DEALS ON")}
                  </h1>

                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-[#f76e28] uppercase leading-[1.04] drop-shadow-xs">
                    {t("hero_handpicked_elegance", "HANDPICKED ELEGANCE")}
                  </div>
                </div>
              </div>

              {/* Subtitle & Expressive Micro-Perk Strip */}
              <div className="mt-8">
                <p className="text-xs sm:text-sm md:text-[15px] text-stone-700 font-medium leading-relaxed max-w-lg">
                  {t("hero_subtitle", "Explore thousands of verified artisan creations, latest designer fashion, sacred pooja essentials, and modern electronics with guaranteed authentic savings.")}
                </p>
                <div className="flex items-center gap-3 mt-4 text-[11px] font-bold text-stone-600">
                  <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    ✓ 100% Genuine Certified
                  </span>
                  <span className="flex items-center gap-1.5 text-orange-800 bg-orange-100/70 border border-orange-200/80 px-2.5 py-0.5 rounded-full">
                    ⚡ Express 12-24h Dispatch
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. BOTTOM ROW: TWO IMAGE CARDS WITH M3E SQUIRCLE GEOMETRY */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              
              {/* Card 1: Sacred Pooja Items */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => navigate('/collection/pooja-items')}
                className="group relative h-[190px] sm:h-[220px] md:h-[240px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_24px_-4px_rgba(247,110,40,0.1)] bg-stone-100 border border-orange-100/80"
              >
                <img
                  src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop&q=80"
                  alt="Pooja Items"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[10px] font-black uppercase tracking-widest text-white shadow-xs">
                    {t("hero_spiritual", "Spiritual")}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 flex flex-col">
                  <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white drop-shadow-md flex items-center gap-1.5">
                    {t("hero_pooja_essentials", "Pooja Essentials")}
                    <ArrowRight size={14} className="text-orange-400 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </span>
                </div>
              </motion.div>

              {/* Card 2: Handloom & Festive Wear */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => navigate('/collection/clothing?section=women')}
                className="group relative h-[190px] sm:h-[220px] md:h-[240px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_24px_-4px_rgba(247,110,40,0.1)] bg-stone-100 border border-orange-100/80"
              >
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
                  alt="Handloom Fashion"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[10px] font-black uppercase tracking-widest text-white shadow-xs">
                    {t("hero_artisan", "Artisan")}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 flex flex-col">
                  <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white drop-shadow-md flex items-center gap-1.5">
                    {t("hero_ethnic_handloom", "Ethnic Handloom")}
                    <ArrowRight size={14} className="text-orange-400 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </span>
                </div>
              </motion.div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: VIDEO CONTAINER (M3E Rounded-3xl + Spring) */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-[0_12px_40px_-6px_rgba(247,110,40,0.16)] min-h-[420px] sm:min-h-[520px] lg:min-h-full h-full flex flex-col justify-between p-6 sm:p-8 bg-stone-900 border border-orange-200/50 group"
          >
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover scale-100 origin-center pointer-events-none"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
              {/* Subtle natural vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Top Floating Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <Sparkles size={12} className="text-amber-400" />
                <span>GoMo Live Showcase</span>
              </span>
            </div>

            {/* Bottom Floating Action Pills with Spring Easing */}
            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-6">
              
              {/* Left Pill: Explore Deals with Circular Arrow */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo('deals-section')}
                className="bg-white hover:bg-orange-50 text-stone-950 font-black text-xs sm:text-sm pl-5 pr-2.5 py-2.5 rounded-full flex items-center gap-3 shadow-lg shadow-black/30 border border-white/80 transition-all cursor-pointer group"
              >
                <span className="uppercase tracking-wider">{t("hero_explore_deals", "Explore Deals")}</span>
                <div className="w-7 h-7 rounded-full bg-[#f76e28] text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowDown size={14} strokeWidth={2.5} />
                </div>
              </motion.button>

              {/* Right Pill: Browse Catalog */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo('featured-categories')}
                className="bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/30 text-white font-black text-xs sm:text-sm pl-5 pr-3 py-2.5 rounded-full flex items-center gap-3 shadow-lg transition-all cursor-pointer group"
              >
                <span className="uppercase tracking-wider">{t("hero_browse_catalog", "Browse Catalog")}</span>
                <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 text-white flex items-center justify-center transition-colors">
                  <Compass size={14} />
                </div>
              </motion.button>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
