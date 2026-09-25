import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../../../../assets/Hero_video.mp4';

const Hero = () => {
  const navigate = useNavigate();

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Top Editorial Box + Bottom Two Image Cards   */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 sm:gap-5">
            
            {/* 1. TOP EDITORIAL TEXT CONTAINER (Warm Cream/Ivory Brand Palette) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#f5f1eb] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-11 flex-1 flex flex-col justify-between shadow-xs border border-stone-200/80 min-h-[320px] sm:min-h-[380px]"
            >
              {/* Bold Editorial Headline Matching Reference Design */}
              <div className="space-y-1 sm:space-y-2">
                {/* Line 1: DISCOVER ────> */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-stone-950 uppercase leading-none">
                    DISCOVER
                  </span>
                  <div className="flex-1 flex items-center max-w-[120px] sm:max-w-[160px] md:max-w-[190px]">
                    <div className="h-[3px] sm:h-[3.5px] w-full bg-stone-950 rounded-full" />
                    <ArrowRight size={24} strokeWidth={3} className="text-stone-950 -ml-2 flex-shrink-0" />
                  </div>
                </div>

                {/* Line 2: VERIFIED DEALS ON */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-stone-950 uppercase leading-[1.04]">
                  VERIFIED DEALS ON
                </h1>

                {/* Line 3: HANDPICKED ELEGANCE */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-orange-600 uppercase leading-[1.04]">
                  HANDPICKED ELEGANCE
                </div>
              </div>

              {/* Subtitle Text at the Bottom */}
              <p className="mt-8 text-xs sm:text-sm md:text-[15px] text-stone-600 font-medium leading-relaxed max-w-lg">
                Explore thousands of verified artisan creations, latest designer fashion, sacred pooja essentials, and modern electronics with guaranteed authentic savings.
              </p>
            </motion.div>

            {/* 2. BOTTOM ROW: TWO IMAGE CARDS WITH HASHTAG BADGES */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              
              {/* Card 1: Sacred Pooja Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={() => navigate('/collection/pooja-items')}
                className="group relative h-[180px] sm:h-[220px] md:h-[240px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer shadow-md bg-stone-100 border border-stone-200/80"
              >
                <img
                  src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&auto=format&fit=crop&q=80"
                  alt="Pooja Items"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 flex flex-col">
                  <span className="text-[10px] sm:text-xs font-semibold text-orange-300 uppercase tracking-widest">Spiritual</span>
                  <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white drop-shadow-md flex items-center gap-1.5">
                    Pooja Essentials
                    <ArrowRight size={14} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>

              {/* Card 2: Handloom & Festive Wear */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                onClick={() => navigate('/collection/clothing?section=women')}
                className="group relative h-[180px] sm:h-[220px] md:h-[240px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer shadow-md bg-stone-100 border border-stone-200/80"
              >
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
                  alt="Handloom Fashion"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 flex flex-col">
                  <span className="text-[10px] sm:text-xs font-semibold text-orange-300 uppercase tracking-widest">Artisan</span>
                  <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white drop-shadow-md flex items-center gap-1.5">
                    Ethnic Handloom
                    <ArrowRight size={14} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: VIDEO CONTAINER (Our Hero Video Asset)      */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xl min-h-[420px] sm:min-h-[520px] lg:min-h-full h-full flex flex-col justify-between p-6 sm:p-8 bg-stone-100 border border-stone-200/80 group"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
            </div>

            {/* Circular Floating "SHOP NOW" Glass Badge (Middle Right) */}
            <div className="relative z-10 self-end my-auto pr-2 sm:pr-4">
              <button
                type="button"
                onClick={() => scrollTo('deals-section')}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 hover:bg-orange-600 hover:scale-105 border border-white/40 backdrop-blur-md text-white text-xs sm:text-sm font-black uppercase tracking-wider flex flex-col items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer group"
                aria-label="Shop Now"
              >
                <span className="leading-tight">SHOP</span>
                <span className="leading-tight">NOW</span>
              </button>
            </div>

            {/* Bottom Floating Action Pills (Matching Reference Design) */}
            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-6">
              
              {/* Left Pill: Explore Deals with Circular Arrow */}
              <button
                type="button"
                onClick={() => scrollTo('deals-section')}
                className="bg-white hover:bg-orange-50 text-stone-950 font-bold text-xs sm:text-sm pl-5 pr-2 py-2 rounded-full flex items-center gap-3 shadow-xl transition-all duration-200 cursor-pointer group"
              >
                <span className="uppercase tracking-wider">Explore Deals</span>
                <div className="w-7 h-7 rounded-full bg-stone-950 group-hover:bg-orange-600 text-white flex items-center justify-center transition-colors">
                  <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Right Pill: Browse Catalog */}
              <button
                type="button"
                onClick={() => scrollTo('featured-categories')}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm pl-5 pr-2.5 py-2 rounded-full flex items-center gap-3 shadow-xl transition-all duration-200 cursor-pointer group"
              >
                <span className="uppercase tracking-wider">Browse Catalog</span>
                <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 text-white flex items-center justify-center transition-colors">
                  <Compass size={14} />
                </div>
              </button>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
