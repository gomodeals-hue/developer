import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function MenFashionCollectionFooterBanner() {
  return (
    <section className="w-full overflow-hidden bg-gradient-to-r from-[#dce1e4] via-[#e5e9ec] to-[#eef1f3] border-t border-stone-300/40 relative mt-12 sm:mt-16 select-none">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1600px] mx-auto min-h-[400px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] xl:min-h-[580px] flex items-center overflow-hidden"
      >
        {/* Soft Studio Overhead Light Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_40%,rgba(255,255,255,0.75)_0%,transparent_65%)] pointer-events-none" />

        {/* ======================================================== */}
        {/* MODEL PHOTOGRAPHY (RIGHT HALF: GUY ON SKATEBOARD)         */}
        {/* ======================================================== */}
        <div className="absolute right-0 bottom-0 top-0 w-full sm:w-[65%] md:w-[60%] lg:w-[54%] xl:w-[50%] flex items-end justify-end pointer-events-none z-10 overflow-hidden">
          {/* Subtle mobile readability mask so text is always 100% crisp */}
          <div className="absolute inset-0 sm:hidden bg-gradient-to-r from-[#dce1e4] via-[#dce1e4]/85 to-transparent z-10" />

          <img
            src="/assets/banners/men_model_hd.png"
            alt="Men Fashion Model - Skateboard Seasonal Wear"
            className="w-full h-full object-cover sm:object-contain object-bottom sm:object-right-bottom transform scale-100 sm:scale-105 origin-bottom transition-transform duration-700 hover:scale-108"
            loading="lazy"
            onError={(e) => {
              // Fallback to original uploaded asset if HD crop is unavailable
              e.target.src = '/assets/banners/men_fashion_collection.jpg';
              e.target.className = 'w-full h-full object-cover object-right';
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* EDITORIAL TEXT & ACTIONS (LEFT HALF)                      */}
        {/* ======================================================== */}
        <div className="relative z-20 w-full max-w-2xl px-6 sm:px-12 md:px-16 lg:px-24 py-12 sm:py-16 flex flex-col justify-center text-left">
          {/* Small Eyebrow / Kicker */}
          <p className="text-xs sm:text-sm md:text-base text-stone-500 font-normal tracking-wide mb-2 sm:mb-3">
            Designer collection for seasonal wear
          </p>

          {/* Main Title - Modern Heavy Sans */}
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-[#1c1d1f] uppercase tracking-[-0.03em] leading-[0.92] sm:leading-[0.90]">
            <span>FASHION</span>
            <br />
            <span>COLLECTION</span>
          </h2>

          {/* Pill Action Button */}
          <div className="mt-7 sm:mt-9 flex items-center">
            <Link
              to="/collection/clothing?section=men"
              className="group h-12 sm:h-13 px-8 sm:px-10 bg-[#111111] hover:bg-black text-white text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
              aria-label="Shop Men's Seasonal Fashion Collection"
            >
              <span>SHOP COLLECTION</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

