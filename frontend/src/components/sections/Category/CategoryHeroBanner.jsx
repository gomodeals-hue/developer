import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Truck, RotateCcw, ChevronRight, Star, Tag } from 'lucide-react';

const CATEGORY_HERO_DATA = {
  'clothing': {
    eyebrow: 'Everyday Movement & Style',
    title: 'Pieces Designed for Everyday Movement',
    subtitle: 'Explore utility essentials, sustainable layers, and lifestyle apparel crafted for all-day comfort, function, and modern living.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=85',
    badges: ['100% Breathable Cotton', 'Sustainable Dyes', 'Tailored Fit'],
    stats: 'Over 240+ Styles'
  },
  'shirts': {
    eyebrow: 'MENS SARTORIAL EDIT',
    title: 'Tailored Shirts & Pure Linens',
    subtitle: 'From relaxed resort linen to crisp workwear Oxford shirts. Precision collars, French seams, and enduring breathability.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1600&q=85',
    badges: ['Pure Irish & French Linen', 'Hand-Finished Collars', 'Easy Care Fabric'],
    stats: 'Over 90+ Cuts'
  },
  'men-shirts': {
    eyebrow: 'MENS SARTORIAL EDIT',
    title: 'Tailored Shirts & Pure Linens',
    subtitle: 'From relaxed resort linen to crisp workwear Oxford shirts. Precision collars, French seams, and enduring breathability.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1600&q=85',
    badges: ['Pure Irish & French Linen', 'Hand-Finished Collars', 'Easy Care Fabric'],
    stats: 'Over 90+ Cuts'
  },
  'western-wear': {
    eyebrow: 'CONTEMPORARY SILHOUETTES',
    title: 'Minimalist Forms & Modern Drops',
    subtitle: 'Sophisticated fluid dresses, tailored utility vests, and effortless neutral coordinates designed for the modern lifestyle.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85',
    badges: ['Eco-Conscious Fabrics', 'Designed for Versatility', 'Express Delivery'],
    stats: 'Curated 180+ Pieces'
  },
  'ethnic-wear': {
    eyebrow: 'TIMELESS INDIAN HERITAGE',
    title: 'Exquisite Handloom Silks & Kurtas',
    subtitle: 'Royal Kanjivaram and Banarasi weaves, intricate zari embroidery, and pure mulmul cotton kurtas direct from master weaving clusters.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=85',
    badges: ['Silk Mark Certified', 'Direct from Artisans', 'Festive Ready'],
    stats: 'Authentic 300+ Weaves'
  },
  'pooja-items': {
    eyebrow: 'SACRED SPIRITUALITY & HOME TEMPLE',
    title: 'Divine Brass Idols & Temple Essentials',
    subtitle: 'Authentic solid brass diyas, sanctified idols, hand-rolled pure temple incense, natural dhoop, and complete festival samagri kits.',
    image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=1600&q=85',
    badges: ['100% Solid Brass', 'Pure Cow Ghee Compatible', 'Vedic Samagri Included'],
    stats: 'Over 150+ Sacred Essentials'
  },
  'gadgets': {
    eyebrow: 'SMART AUDIO & WEARABLES',
    title: 'High-Fidelity Audio & Connected Tech',
    subtitle: 'Active noise-cancelling headphones, AMOLED biometric smartwatches, fast magnetic power banks, and everyday tech essentials.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=85',
    badges: ['1-Year Official Warranty', 'Hi-Res Certified Audio', 'Instant Dispatch'],
    stats: '50+ High Performance Devices'
  },
  'electronics': {
    eyebrow: 'SMART AUDIO & WEARABLES',
    title: 'High-Fidelity Audio & Connected Tech',
    subtitle: 'Active noise-cancelling headphones, AMOLED biometric smartwatches, fast magnetic power banks, and everyday tech essentials.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=85',
    badges: ['1-Year Official Warranty', 'Hi-Res Certified Audio', 'Instant Dispatch'],
    stats: '50+ High Performance Devices'
  },
  'home-living': {
    eyebrow: 'SANCTUARY & AMBIENCE',
    title: 'Artisanal Home Decor & Serene Living',
    subtitle: 'Handwoven 400TC Egyptian cotton bedding, minimalist ceramic art, brass tabletop planters, and warm ambient accents.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85',
    badges: ['Pure Organic Cotton', 'Artisanal Handcraft', 'Durability Tested'],
    stats: '120+ Home Accents'
  },
  'footwear': {
    eyebrow: 'EVERYDAY MOVEMENT & FOOTWEAR',
    title: 'Handcrafted Loafers & Dynamic Runners',
    subtitle: 'Orthopedic comfort soles, genuine grain leather slip-ons, and featherlight breathable knit trainers for effortless movement.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=85',
    badges: ['Memory Foam Insoles', 'Genuine Leather', 'Shock Absorption'],
    stats: '95+ Footwear Styles'
  },
  'accessories': {
    eyebrow: 'PRECISION CRAFT & DETAILS',
    title: 'Curated Timepieces & Leather Essentials',
    subtitle: 'Minimalist chronographs, full-grain leather wallets and belts, polarized UV400 sunglasses, and travel organizers.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=85',
    badges: ['Full-Grain Leather', 'Japanese Quartz Movement', 'Lifetime Stitch Guarantee'],
    stats: '80+ Refined Accents'
  },
  'jewellery': {
    eyebrow: 'FINE JEWELLERY & ADORNMENT',
    title: 'Artisanal Gold-Plated & Pearl Accents',
    subtitle: 'Hypoallergenic 18K gold vermeil earrings, layered chains, temple chokers, and freshwater pearl statement jewellery.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=85',
    badges: ['18K Gold Plated', 'Anti-Tarnish Coating', 'Hypoallergenic'],
    stats: '110+ Signature Designs'
  },
  'beauty': {
    eyebrow: 'CLEAN BOTANICAL CARE',
    title: 'Ayurvedic Formulations & Natural Radiance',
    subtitle: 'Cold-pressed kumkumadi serums, pure rosewater mists, nourishing herbal scalp elixirs, and cruelty-free wellness essentials.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=85',
    badges: ['100% Toxin Free', 'Cruelty Free', 'Dermatologically Tested'],
    stats: '70+ Clean Formulations'
  },
  'kids': {
    eyebrow: 'JOYFUL COMFORT FOR LITTLE ONES',
    title: 'Gentle Organic Apparel & Toys',
    subtitle: 'Hypoallergenic chemical-free baby wear, festive ethnic outfits, and safe non-toxic wooden montessori toys.',
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=1600&q=85',
    badges: ['GOTS Certified Organic', 'Tagless Comfort', 'Non-Toxic'],
    stats: '85+ Kids Favorites'
  },
  'gifts': {
    eyebrow: 'CELEBRATION HAMPERS & MOMENTS',
    title: 'Curated Keepsakes & Festive Hampers',
    subtitle: 'Artisanal gift boxes with handcrafted sweets, dry fruits, brass diyas, and handwritten celebration notes.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&q=85',
    badges: ['Hand-Tied Orange Satin', 'Custom Note Included', 'Pan-India Express'],
    stats: '60+ Gift Bundles'
  },
  'healthy-foods': {
    eyebrow: 'PURE ORGANIC NUTRITION',
    title: 'Himalayan Superfoods & Raw Honey',
    subtitle: 'Single-origin wild forest honey, Kashmiri walnuts, Afghan figs, cold-pressed wood churned oils, and artisan tea blends.',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&q=85',
    badges: ['Zero Added Preservatives', 'Farm Direct', 'Lab Tested Purity'],
    stats: '45+ Wholesome Staples'
  },
  'default': {
    eyebrow: 'GOMO DEALS CURATION',
    title: 'Find Pieces Designed for Everyday Movement',
    subtitle: 'Explore our catalog of certified apparel, handloom silks, sacred essentials, and modern gadgets with guaranteed quality and verified pricing.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85',
    badges: ['Verified Authenticity', 'Direct Express Shipping', 'Easy 7-Day Returns'],
    stats: '1,000+ Verified Deals'
  }
};

export default function CategoryHeroBanner({
  category = 'all',
  subcategory = 'all',
  section = 'all',
  isShirtsPage = false,
  searchQuery = '',
  totalProducts = 0,
  availableSubcategories = [],
  activeSubcategory = 'all',
  onSelectSubcategory
}) {
  // Determine best matching hero data
  let configKey = 'default';

  if (isShirtsPage) {
    configKey = 'shirts';
  } else if (category && category !== 'all' && CATEGORY_HERO_DATA[category]) {
    configKey = category;
  } else if (section && section !== 'all') {
    if (section === 'women') configKey = 'western-wear';
    else if (section === 'men') configKey = 'clothing';
    else if (section === 'kids') configKey = 'kids';
  }

  const hero = CATEGORY_HERO_DATA[configKey] || CATEGORY_HERO_DATA['default'];

  // Dynamic titles when searching or filtering
  const cleanSearch = (typeof searchQuery === 'string' ? searchQuery : '').trim();
  const displayTitle = cleanSearch 
    ? `Results for "${cleanSearch}"`
    : hero.title;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-8 shadow-lg border border-sky-400/40 bg-gradient-to-r from-[#035388] via-[#0277bd] to-[#0091ca]">
      
      {/* Background Hero Image with Copper Sulphate Blue Warm Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={hero.image}
          alt={hero.title}
          className="w-full h-full object-cover object-center filter brightness-105 saturate-125 opacity-35 scale-102 transform transition-transform duration-700 hover:scale-105 mix-blend-screen"
        />
        {/* Editorial Multi-stop Copper Sulphate Blue Gradient Overlay with Warm Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#034d7e]/95 via-[#0277bd]/85 to-[#0091ca]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#024a7b]/90 via-transparent to-orange-100/10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-14 max-w-4xl text-left">
        
        {/* Eyebrow Pill Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500 text-white text-[10.5px] font-black tracking-widest uppercase mb-4 shadow-md border border-orange-400/40"
        >
          <Sparkles size={12} className="text-amber-200" />
          <span>{hero.eyebrow}</span>
          <span className="w-1 h-1 rounded-full bg-white/60" />
          <span className="text-orange-100 font-bold">{totalProducts} Products</span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif text-white tracking-tight leading-[1.14] drop-shadow-md max-w-3xl"
        >
          {displayTitle}
        </motion.h1>
 
        {/* Trust Badges & Highlights Row */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.08 }}
          className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3"
        >
          {hero.badges.map((badge, idx) => (
            <div 
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold shadow-xs"
            >
              <ShieldCheck size={13} className="text-amber-300" />
              <span>{badge}</span>
            </div>
          ))}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold shadow-xs">
            <Truck size={13} className="text-emerald-300" />
            <span>Fast Dispatch Under 24h</span>
          </div>
        </motion.div>

        {/* Quick Subcategory Pills Row (if available) */}
        {availableSubcategories && availableSubcategories.length > 0 && onSelectSubcategory && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 pt-5 border-t border-white/20"
          >
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-100 shrink-0 mr-1">
                Explore:
              </span>
              
              <button
                type="button"
                onClick={() => onSelectSubcategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  activeSubcategory === 'all'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30 text-white shadow-xs'
                }`}
              >
                All ({totalProducts})
              </button>

              {(availableSubcategories || []).map((sub, i) => {
                const subSlug = typeof sub === 'string' ? sub : (sub?.slug || `sub-${i}`);
                const subRaw = typeof sub === 'string' ? sub : (sub?.raw || subSlug);
                const subLabel = typeof sub === 'string' ? sub : (sub?.label || sub?.name || subSlug);
                const isSelected = activeSubcategory === subSlug || activeSubcategory === subRaw;
                return (
                  <button
                    key={subSlug}
                    type="button"
                    onClick={() => onSelectSubcategory(subSlug)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                        : 'bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30 text-white shadow-xs'
                    }`}
                  >
                    {subLabel} {sub?.count ? `(${sub.count})` : ''}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
