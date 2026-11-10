import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function GeometricSaleBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl bg-[#85160f] min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 border border-red-950/40 text-center"
      >
        {/* ======================================================== */}
        {/* GEOMETRIC OVERLAPPING CIRCLES BACKGROUND ART (EXACT SVG) */}
        {/* ======================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="centerCircleGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ba2b1f" />
                <stop offset="75%" stopColor="#a32117" />
                <stop offset="100%" stopColor="#941b12" />
              </radialGradient>
              <radialGradient id="sideCircleGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7a120c" />
                <stop offset="100%" stopColor="#630d07" />
              </radialGradient>
            </defs>

            {/* Base Deep Red Foundation */}
            <rect width="1200" height="520" fill="#88150e" />

            {/* Left Intersecting Circle */}
            <circle cx="100" cy="260" r="390" fill="url(#sideCircleGlow)" opacity="0.95" />

            {/* Right Intersecting Circle */}
            <circle cx="1100" cy="260" r="390" fill="url(#sideCircleGlow)" opacity="0.95" />

            {/* Huge Center Distinct Circle Disc */}
            <circle cx="600" cy="260" r="360" fill="url(#centerCircleGlow)" />
          </svg>
        </div>

        {/* Subtle Ambient Light Shimmer */}
        <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none opacity-50" />

        {/* ======================================================== */}
        {/* CENTER CONTENT & TYPOGRAPHY                              */}
        {/* ======================================================== */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Top Label: "SALE" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 mb-2 sm:mb-3"
          >
            <span className="text-white text-base sm:text-lg md:text-xl font-sans font-black tracking-[0.32em] uppercase select-none drop-shadow-sm">
              SALE
            </span>
          </motion.div>

          {/* Subtitle: "WE'VE TAKEN UP TO" */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-white/95 text-xs sm:text-sm md:text-[15px] font-sans font-semibold tracking-[0.24em] uppercase select-none mb-1 sm:mb-2"
          >
            WE'VE TAKEN UP TO
          </motion.p>

          {/* Gigantic Ultra-Thin: "60% OFF" */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-sans font-extralight tracking-tight text-white leading-none select-none my-1 sm:my-2 drop-shadow-md"
            style={{ fontWeight: 200 }}
          >
            60% OFF
          </motion.h2>

          {/* ======================================================== */}
          {/* MULTI-BUTTON CATEGORY NAVIGATION GRID                    */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center gap-3 w-full max-w-2xl px-2"
          >
            {/* Top Row: Women's Apparel & For Him */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              <Link
                to="/collection/clothing?section=women"
                className="h-11 sm:h-12 px-6 sm:px-8 border border-white text-white hover:bg-white hover:text-[#85160f] active:scale-95 text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>SHOP WOMEN'S APPAREL</span>
              </Link>

              <Link
                to="/collection/clothing?section=men"
                className="h-11 sm:h-12 px-6 sm:px-8 border border-white text-white hover:bg-white hover:text-[#85160f] active:scale-95 text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>SHOP FOR HIM</span>
              </Link>
            </div>

            {/* Bottom Row: Pooja Essentials, Home & Beauty */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              <Link
                to="/collection/pooja-items"
                className="h-11 sm:h-12 px-6 sm:px-8 border border-white text-white hover:bg-white hover:text-[#85160f] active:scale-95 text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>SHOP POOJA &amp; TRADITIONS</span>
              </Link>

              <Link
                to="/collection/beauty"
                className="h-11 sm:h-12 px-6 sm:px-8 border border-white text-white hover:bg-white hover:text-[#85160f] active:scale-95 text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>SHOP BEAUTY &amp; ACCESSORIES</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
