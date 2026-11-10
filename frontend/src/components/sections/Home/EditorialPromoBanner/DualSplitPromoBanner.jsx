import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Tag } from 'lucide-react';

export default function DualSplitPromoBanner() {
  return (
    <section className="w-full my-6 sm:my-8 md:my-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden bg-stone-900 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 relative w-full min-h-[440px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px]">
          
          {/* ======================================================== */}
          {/* LEFT HALF: DEEP TERRACOTTA CRIMSON SALE HERO              */}
          {/* ======================================================== */}
          <Link
            to="/deals"
            className="group relative flex flex-col justify-center items-center text-center p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden bg-gradient-to-br from-[#8a1c14] via-[#9e241b] to-[#7f1811] text-[#fff4ea] transition-all duration-500 cursor-pointer"
            aria-label="Shop clearance sale up to 75% off"
          >
            {/* Subtle radial luxury glow in background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(247,110,40,0.18),transparent_65%)] pointer-events-none" />
            
            {/* Subtle texture shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.06)_50%,transparent_80%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
              {/* Main "sale" typography in high-fashion serif */}
              <h2 className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] font-normal tracking-tight text-[#fff2e5] select-none leading-[0.88] drop-shadow-sm group-hover:scale-102 transition-transform duration-500">
                sale
              </h2>

              {/* Stacked "up to" + "75% off" lockup */}
              <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-5 md:mt-6">
                <div className="flex flex-col text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.24em] leading-tight text-[#fed7aa] select-none text-right">
                  <span>up</span>
                  <span>to</span>
                </div>
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#fff2e5] select-none leading-none">
                  75% off
                </span>
              </div>

              {/* Minimalist underlined CTA */}
              <div className="mt-8 sm:mt-11 md:mt-12 flex items-center gap-2 text-xs sm:text-sm md:text-base font-sans font-semibold tracking-[0.25em] uppercase text-[#fff2e5] group-hover:text-white transition-colors">
                <span className="border-b-2 border-[#fff2e5]/80 group-hover:border-white pb-1 transition-all">
                  shop sale
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* ======================================================== */}
          {/* FLOATING CENTER "OR" BADGE                               */}
          {/* ======================================================== */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#78140e] border-2 sm:border-[2.5px] border-[#fff4ea]/60 shadow-2xl flex items-center justify-center transform transition-transform group-hover:rotate-12 duration-500">
              <span className="font-serif italic font-normal text-sm sm:text-base md:text-lg text-[#fff4ea] select-none -translate-y-0.5">
                or
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT HALF: LIFESTYLE MODEL PHOTO WITH 20% OFF OFFER     */}
          {/* ======================================================== */}
          <Link
            to="/collection/clothing?section=women"
            className="group relative flex flex-col justify-center items-center text-center p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden bg-stone-900 text-white transition-all duration-500 cursor-pointer"
            aria-label="Shop 20% off everything sitewide"
          >
            {/* Background High-Fashion Photography */}
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&auto=format&fit=crop&q=85"
              alt="Model in elegant airy dress"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              loading="lazy"
            />

            {/* Subtle soft contrast gradient so text is crisp and readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/35 group-hover:from-black/50 transition-colors duration-500" />
            <div className="absolute inset-0 bg-stone-900/10" />

            <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
              {/* "20% off" in modern display serif */}
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white drop-shadow-md leading-tight">
                20% off
              </span>

              {/* "everything*" in elegant flowing italic serif */}
              <span className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight drop-shadow-md leading-none mt-1 sm:mt-2">
                everything*
              </span>

              {/* Small "sale" tag badge */}
              <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-white/40 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-white shadow-xs">
                <Tag size={11} className="text-white" />
                <span>sale</span>
              </div>

              {/* Minimalist underlined CTA */}
              <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm md:text-base font-sans font-semibold tracking-[0.25em] uppercase text-white group-hover:text-orange-200 transition-colors">
                <span className="border-b-2 border-white/80 group-hover:border-orange-200 pb-1 transition-all">
                  shop now
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* Small disclaimer at bottom right */}
            <span className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 text-[10px] sm:text-[11px] font-sans text-white/80 tracking-wider select-none">
              *excluding select clearance
            </span>
          </Link>

        </div>
      </motion.div>
    </section>
  );
}
