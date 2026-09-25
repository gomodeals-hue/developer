import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CuratedPromoBanners() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Banner 1: Sacred Pooja Essentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden h-[280px] sm:h-[320px] group cursor-pointer shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
            alt="Sacred Pooja Essentials"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-black/20" />
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider w-fit mb-3">
              <Award size={12} />
              <span>Sacred Traditions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-2">
              Artisan Brass Idols & Pooja Decor
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-md mb-4 line-clamp-2">
              Handcrafted brass lamps, pure havan samagri, and auspicious pooja thalis delivered with pure devotion.
            </p>
            <Link
              to="/collection/pooja-items"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 group-hover:text-amber-300 w-fit"
            >
              <span>Explore Pooja Collection</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Banner 2: Festive & Designer Wardrobe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden h-[280px] sm:h-[320px] group cursor-pointer shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80"
            alt="Designer Festive Wardrobe"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-black/20" />
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/40 text-rose-300 text-[10px] font-bold uppercase tracking-wider w-fit mb-3">
              <Compass size={12} />
              <span>Festive Luxury Edit</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-2">
              Authentic Handloom Sarees & Kurtas
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-md mb-4 line-clamp-2">
              Rich Banarasi weaves, pure cotton chanderi, and designer kurtas crafted by master Indian weavers.
            </p>
            <Link
              to="/collection/clothing?section=women"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 group-hover:text-rose-300 w-fit"
            >
              <span>Shop Festive Apparel</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
