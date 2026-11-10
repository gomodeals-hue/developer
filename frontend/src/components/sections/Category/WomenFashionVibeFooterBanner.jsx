import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function WomenFashionVibeFooterBanner() {
  return (
    <section className="w-full overflow-hidden bg-[#e9e6e6] border-t border-stone-300/40 relative mt-12 sm:mt-16 select-none">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1600px] mx-auto min-h-[400px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] xl:min-h-[580px] flex items-center overflow-hidden"
      >
        {/* Studio Soft Lighting Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(255,255,255,0.7)_0%,transparent_65%)] pointer-events-none" />

        {/* ======================================================== */}
        {/* MODEL PHOTOGRAPHY (RIGHT HALF WITH SEAMLESS FEATHERING)   */}
        {/* ======================================================== */}
        <div className="absolute right-0 bottom-0 top-0 w-full sm:w-[65%] md:w-[58%] lg:w-[52%] xl:w-[48%] flex items-end justify-end pointer-events-none z-10 overflow-hidden">
          {/* Subtle mobile readability gradient mask so text is always 100% crisp */}
          <div className="absolute inset-0 sm:hidden bg-gradient-to-r from-[#e9e6e6] via-[#e9e6e6]/80 to-transparent z-10" />
          
          <img
            src="/assets/banners/women_model_hd.png"
            alt="Women Fashion Model - Minimal Fashion Vibe"
            className="w-full h-full object-cover sm:object-contain object-bottom sm:object-right-bottom transform scale-100 sm:scale-105 origin-bottom transition-transform duration-700 hover:scale-108"
            loading="lazy"
            onError={(e) => {
              // Fallback to original uploaded asset if HD crop is unavailable
              e.target.src = '/assets/banners/women_fashion_vibe.jpg';
              e.target.className = 'w-full h-full object-cover object-right';
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* EDITORIAL TEXT & ACTIONS (LEFT HALF)                      */}
        {/* ======================================================== */}
        <div className="relative z-20 w-full max-w-2xl px-6 sm:px-12 md:px-16 lg:px-24 py-12 sm:py-16 flex flex-col justify-center text-left">
          {/* Editorial Title - Heavy Geometric Modern Sans */}
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.4rem] text-[#111111] uppercase tracking-[-0.035em] leading-[0.92] sm:leading-[0.90]">
            <span>CREATE A</span>
            <br />
            <span>FASHION</span>
            <br />
            <span>VIBE</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-stone-600 font-normal tracking-normal max-w-md leading-relaxed">
            Minimal fashion designed for everyday confidence
          </p>

          {/* Interactive Dual Action Buttons */}
          <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Button 1: Solid Black Minimalist Rectangle */}
            <Link
              to="/collection/clothing?section=women"
              className="group h-11 sm:h-12 px-6 sm:px-8 bg-[#171717] hover:bg-black text-white text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 cursor-pointer inline-flex items-center justify-center rounded-[2px]"
              aria-label="Shop Women's Fashion Now"
            >
              <span>SHOP NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Button 2: Clean Outline Button */}
            <Link
              to="/collection/ethnic-wear?section=women"
              className="h-11 sm:h-12 px-6 sm:px-8 bg-transparent hover:bg-[#171717] text-[#111111] hover:text-white border border-[#111111] text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center justify-center rounded-[2px]"
              aria-label="Explore Women's Ethnic and Western Collection"
            >
              <span>EXPLORE COLLECTION</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

