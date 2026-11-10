import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Tag } from 'lucide-react';

export default function DualSplitPromoBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 relative min-h-[380px] sm:min-h-[420px] md:min-h-[440px]">
          
          {/* ======================================================== */}
          {/* LEFT HALF: DEEP TERRACOTTA CRIMSON SALE HERO              */}
          {/* ======================================================== */}
          <Link
            to="/deals"
            className="group relative flex flex-col justify-center items-center text-center p-8 sm:p-12 md:p-14 overflow-hidden bg-gradient-to-br from-[#8a1c14] via-[#9e241b] to-[#7f1811] text-[#fff4ea] transition-transform duration-500 cursor-pointer"
            aria-label="Shop clearance sale up to 75% off"
          >
            {/* Subtle radial luxury glow in background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(247,110,40,0.18),transparent_65%)] pointer-events-none" />
            
            {/* Subtle texture shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.06)_50%,transparent_80%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Main "sale" typography in high-fashion serif */}
              <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-[#fff2e5] select-none leading-[0.9] drop-shadow-sm group-hover:scale-102 transition-transform duration-500">
                sale
              </h2>

              {/* Stacked "up to" + "75% off" lockup */}
              <div className="flex items-center gap-2.5 sm:gap-3 mt-3 sm:mt-4">
                <div className="flex flex-col text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] leading-tight text-[#fed7aa] select-none text-right">
                  <span>up</span>
                  <span>to</span>
                </div>
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#fff2e5] select-none leading-none">
                  75% off
                </span>
              </div>

              {/* Minimalist underlined CTA */}
              <div className="mt-8 sm:mt-10 flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold tracking-[0.25em] uppercase text-[#fff2e5] group-hover:text-white transition-colors">
                <span className="border-b-2 border-[#fff2e5]/80 group-hover:border-white pb-1 transition-all">
                  shop sale
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* ======================================================== */}
          {/* FLOATING CENTER "OR" BADGE                               */}
          {/* ======================================================== */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#78140e] border-2 border-[#fff4ea]/50 shadow-2xl flex items-center justify-center transform transition-transform group-hover:rotate-12 duration-500">
              <span className="font-serif italic font-normal text-sm sm:text-base text-[#fff4ea] select-none -translate-y-0.5">
                or
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT HALF: LIFESTYLE MODEL PHOTO WITH 20% OFF OFFER     */}
          {/* ======================================================== */}
          <Link
            to="/collection/clothing?section=women"
            className="group relative flex flex-col justify-center items-center text-center p-8 sm:p-12 md:p-14 overflow-hidden bg-stone-900 text-white transition-transform duration-500 cursor-pointer"
            aria-label="Shop 20% off everything sitewide"
          >
            {/* Background High-Fashion Photography */}
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop&q=80"
              alt="Model in elegant airy dress"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              loading="lazy"
            />

            {/* Subtle soft contrast gradient so text is crisp and readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35 group-hover:from-black/50 transition-colors duration-500" />
            <div className="absolute inset-0 bg-stone-900/15" />

            <div className="relative z-10 flex flex-col items-center">
              {/* "20% off" in modern display serif */}
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white drop-shadow-md leading-tight">
                20% off
              </span>

              {/* "everything*" in elegant flowing italic serif */}
              <span className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight drop-shadow-md leading-none mt-1">
                everything*
              </span>

              {/* Small "sale" tag badge */}
              <div className="mt-4 sm:mt-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/40 backdrop-blur-md border border-white/30 text-[10px] font-sans font-bold uppercase tracking-widest text-white shadow-xs">
                <Tag size={10} className="text-white" />
                <span>sale</span>
              </div>

              {/* Minimalist underlined CTA */}
              <div className="mt-4 sm:mt-5 flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold tracking-[0.25em] uppercase text-white group-hover:text-orange-200 transition-colors">
                <span className="border-b-2 border-white/80 group-hover:border-orange-200 pb-1 transition-all">
                  shop now
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Small disclaimer at bottom right */}
            <span className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 text-[9.5px] font-sans text-white/75 tracking-wider select-none">
              *excluding select clearance
            </span>
          </Link>

        </div>
      </motion.div>
    </section>
  );
}
