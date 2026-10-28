import React, { useContext, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Zap, Layers, Flame, Heart, ChevronRight } from 'lucide-react';
import ProductCard from '../../../common/ProductCard';
import { ProductContext } from '../../../../context/ProductContext/ProductContext';
import { useShop } from '../../../../context/ShopContext';

export default function HomeCategorySections() {
  const { products } = useContext(ProductContext);
  const { t } = useShop();
  const [activeTab, setActiveTab] = useState('all');

  const allProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  // Section 1: Winter-Wear & Fashion
  const fashionProducts = useMemo(() => {
    const list = allProducts.filter((p) => {
      const cat = (p.category || p.category_name || '').toString().toLowerCase();
      const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase();
      const name = (p.name || '').toString().toLowerCase();
      return (
        cat.includes('clothing') ||
        cat.includes('fashion') ||
        cat.includes('winter') ||
        cat.includes('wear') ||
        tags.includes('clothing') ||
        tags.includes('winter') ||
        name.includes('jacket') ||
        name.includes('shirt') ||
        name.includes('saree') ||
        name.includes('hoodie') ||
        name.includes('kurta')
      );
    });
    return (list.length >= 4 ? list : allProducts.slice(0, 4)).slice(0, 4);
  }, [allProducts]);

  // Section 2: Best Selling Products
  const bestSellers = useMemo(() => {
    const list = [...allProducts].sort((a, b) => {
      const scoreA = (Number(a.rating) || 0) * (Number(a.reviews_count) || 10);
      const scoreB = (Number(b.rating) || 0) * (Number(b.reviews_count) || 10);
      return scoreB - scoreA;
    });
    return (list.length >= 4 ? list : allProducts.slice(2, 6)).slice(0, 4);
  }, [allProducts]);

  // Section 3: {t("Personal Care & Beauty")}
  const personalCareProducts = useMemo(() => {
    const list = allProducts.filter((p) => {
      const cat = (p.category || p.category_name || '').toString().toLowerCase();
      const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase();
      const name = (p.name || '').toString().toLowerCase();
      return (
        cat.includes('beauty') ||
        cat.includes('care') ||
        cat.includes('health') ||
        tags.includes('beauty') ||
        tags.includes('skincare') ||
        name.includes('mask') ||
        name.includes('serum') ||
        name.includes('oil') ||
        name.includes('cleanser') ||
        name.includes('cream')
      );
    });
    return (list.length >= 4 ? list : allProducts.slice(4, 8)).slice(0, 4);
  }, [allProducts]);

  // Section 4: Smart Devices & Electronics
  const electronicsProducts = useMemo(() => {
    const list = allProducts.filter((p) => {
      const cat = (p.category || p.category_name || '').toString().toLowerCase();
      const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase();
      const name = (p.name || '').toString().toLowerCase();
      return (
        cat.includes('elect') ||
        cat.includes('gadget') ||
        tags.includes('elect') ||
        tags.includes('tech') ||
        name.includes('watch') ||
        name.includes('headphone') ||
        name.includes('speaker') ||
        name.includes('phone') ||
        name.includes('earbud')
      );
    });
    return (list.length >= 4 ? list : allProducts.slice(1, 5)).slice(0, 4);
  }, [allProducts]);

  // Section 5: {t("Sacred Pooja Essentials")}
  const poojaProducts = useMemo(() => {
    const list = allProducts.filter((p) => {
      const cat = (p.category || p.category_name || '').toString().toLowerCase();
      const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')).toString().toLowerCase();
      const name = (p.name || '').toString().toLowerCase();
      return (
        cat.includes('pooja') ||
        cat.includes('sacred') ||
        tags.includes('pooja') ||
        name.includes('diya') ||
        name.includes('dhoop') ||
        name.includes('agarbatti') ||
        name.includes('camphor') ||
        name.includes('idol')
      );
    });
    return (list.length >= 4 ? list : allProducts.slice(6, 10)).slice(0, 4);
  }, [allProducts]);

  // Section 6: Fresh New Launches
  const newLaunches = useMemo(() => {
    const list = [...allProducts].reverse();
    return list.slice(0, 4);
  }, [allProducts]);

  // Department Tabs for Big Minimalism Navigation
  const departments = [
    { id: 'all', label: t('All Collections'), count: allProducts.length },
    { id: 'fashion', label: t('Winter & Fashion'), count: fashionProducts.length },
    { id: 'bestsellers', label: t('Best Sellers'), count: bestSellers.length },
    { id: 'beauty', label: t('Personal Care'), count: personalCareProducts.length },
    { id: 'tech', label: t('Smart Tech'), count: electronicsProducts.length },
    { id: 'pooja', label: t('Sacred Pooja'), count: poojaProducts.length },
  ];

  return (
    <section id="product-collections" className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

        {/* ─── 0. BIG MINIMALISM SECTION INTRO & QUICK NAV ─── */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-[11px] font-bold uppercase tracking-wider mb-3">
                <Sparkles size={12} className="text-orange-600" />
                <span>{t("Curated Showcase • 2026 Collection")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight leading-[1.1]">
                {t("Selected Products")}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-stone-500 max-w-xl font-normal">
                {t("Minimal design, maximum quality. Discover our handpicked essentials with express dispatch and guaranteed authenticity.")}
              </p>
            </div>

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900 hover:text-orange-600 group transition-colors"
            >
              <span>{t("Explore All Departments")}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick-Nav Minimalist Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {departments.map((dept) => {
              const isActive = activeTab === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`relative shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-stone-950 text-white shadow-md shadow-stone-950/20'
                      : 'bg-stone-100/80 text-stone-600 hover:bg-stone-200/70 hover:text-stone-950'
                  }`}
                >
                  <span>{dept.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {dept.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 1. SECTION: WINTER-WEAR & FASHION ─── */}
        {(activeTab === 'all' || activeTab === 'fashion') && (
          <div id="section-clothing" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-1">
                  {t("01 / Seasonal Offer")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  {t("Winter-Wear & Outerwear")}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  {t("Save up to 40% on premium seasonal jackets, cozy sweaters, and signature layers.")}
                </p>
              </div>
              <Link
                to="/collection/clothing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <span>{t("View All")} ({fashionProducts.length})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {fashionProducts.map((p) => (
                <ProductCard key={p.product_id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ─── 2. EDITORIAL BENTO CARDS (Minimal Neutral & Soft Tones) ─── */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Bento Card 1: Pure Natural Goods */}
            <div className="group relative rounded-[28px] bg-[#FAF8F5] border border-stone-200/70 p-7 flex flex-col justify-between overflow-hidden hover:shadow-lg transition-all duration-300 min-h-[220px]">
              <div className="relative z-10 max-w-[65%]">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-3">
                  {t("Organic & Wild")}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-stone-950 leading-tight">
                  {t("Pure Raw Honey")}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 font-medium leading-relaxed">
                  {t("Artisanal forest batches, unpasteurized and ethically harvested.")}
                </p>
                <Link
                  to="/collection/gifts"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-950 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  <span>{t("Explore")}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-stone-700">
                <Truck size={13} className="text-orange-600" />
                <span>{t("Free Express Delivery")}</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=360&auto=format&fit=crop&q=80"
                alt="Organic Produce"
                className="absolute right-[-15px] bottom-[-15px] w-40 h-40 object-contain mix-blend-multiply opacity-85 group-hover:scale-108 transition-transform duration-500 pointer-events-none"
              />
            </div>

            {/* Bento Card 2: High-Fidelity Audio */}
            <div className="group relative rounded-[28px] bg-[#F3F7F7] border border-stone-200/70 p-7 flex flex-col justify-between overflow-hidden hover:shadow-lg transition-all duration-300 min-h-[220px]">
              <div className="relative z-10 max-w-[65%]">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-black uppercase tracking-wider mb-3">
                  {t("Lossless Audio")}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-stone-950 leading-tight">
                  {t("Wireless Headphones")}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 font-medium leading-relaxed">
                  {t("Active noise cancelation with custom spatial drivers.")}
                </p>
                <Link
                  to="/collection/electronics"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-950 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  <span>{t("Shop Sound")}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-stone-700">
                <Zap size={13} className="text-teal-600" />
                <span>{t("Instant 24h Dispatch")}</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=360&auto=format&fit=crop&q=80"
                alt="Headphones"
                className="absolute right-[-15px] bottom-[-15px] w-40 h-40 object-contain mix-blend-multiply opacity-85 group-hover:scale-108 transition-transform duration-500 pointer-events-none"
              />
            </div>

            {/* Bento Card 3: Modern Wearables */}
            <div className="group relative rounded-[28px] bg-[#F9F5F7] border border-stone-200/70 p-7 flex flex-col justify-between overflow-hidden hover:shadow-lg transition-all duration-300 min-h-[220px]">
              <div className="relative z-10 max-w-[65%]">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-black uppercase tracking-wider mb-3">
                  {t("Health & Sport")}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-stone-950 leading-tight">
                  {t("Precision Trackers")}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 font-medium leading-relaxed">
                  {t("Continuous biometrics, sleep metrics, and aerospace chassis.")}
                </p>
                <Link
                  to="/collection/electronics"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-950 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  <span>{t("Explore Devices")}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-stone-700">
                <ShieldCheck size={13} className="text-rose-600" />
                <span>{t("100% Genuine Certified")}</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=360&auto=format&fit=crop&q=80"
                alt="Smart Watch"
                className="absolute right-[-15px] bottom-[-15px] w-40 h-40 object-contain mix-blend-multiply opacity-85 group-hover:scale-108 transition-transform duration-500 pointer-events-none"
              />
            </div>
          </div>
        )}

        {/* ─── 3. SECTION: BEST SELLING PRODUCTS ─── */}
        {(activeTab === 'all' || activeTab === 'bestsellers') && (
          <div id="section-bestsellers" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-1">
                  {t("02 / Top Favorites")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  {t("Best Selling Classics")}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  {t("Customer verified ratings with hundreds of five-star reviews.")}
                </p>
              </div>
              <Link
                to="/collection/all?deal=best-sellers"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <span>{t("View All")} ({bestSellers.length})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {bestSellers.map((p) => (
                <ProductCard key={p.product_id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ─── 4. BIG MINIMALISM HERO CALLOUT BANNER ─── */}
        {activeTab === 'all' && (
          <div className="rounded-[32px] bg-stone-950 p-8 sm:p-12 md:p-14 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[10px] sm:text-xs font-black uppercase tracking-wider text-orange-400 mb-4 border border-white/10">
                <Sparkles size={12} />
                <span>{t("GoMo Curated Quality")}</span>
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">
                {t("Exceptional Value.")} <br />
                {t("Zero Compromise.")}
              </h3>
              <p className="mt-3.5 text-xs sm:text-sm md:text-base text-stone-300 font-normal leading-relaxed max-w-xl">
                {t("Every product across fashion, personal care, and electronics is verified for original authenticity and backed by our hassle-free 7-day guarantee.")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/collection/all"
                  className="px-7 py-3 rounded-full bg-orange-600 text-white text-xs sm:text-sm font-bold hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/30 cursor-pointer"
                >
                  {t("Shop Full Collection →")}
                </Link>
                <Link
                  to="/about"
                  className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white text-xs sm:text-sm font-bold transition-all border border-white/15 cursor-pointer"
                >
                  {t("Our Guarantee")}
                </Link>
              </div>
            </div>
            {/* Ambient Warm Gradient Accent */}
            <div className="absolute right-[-10%] top-[-20%] bottom-[-20%] w-1/2 bg-gradient-to-l from-orange-600/30 to-transparent rounded-full blur-3xl pointer-events-none" />
          </div>
        )}

        {/* ─── 5. SECTION: PERSONAL CARE & BEAUTY ─── */}
        {(activeTab === 'all' || activeTab === 'beauty') && (
          <div id="section-beauty" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-1">
                  {t("03 / Daily Rituals")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  Personal Care & Beauty
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  {t("Natural formulations, nourishing botanical extracts, and gentle skin rejuvenation.")}
                </p>
              </div>
              <Link
                to="/collection/beauty"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <span>{t("View All")} ({personalCareProducts.length})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {personalCareProducts.map((p) => (
                <ProductCard key={p.product_id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ─── 6. SECTION: SMART DEVICES & TECH ─── */}
        {(activeTab === 'all' || activeTab === 'tech') && (
          <div id="section-electronics" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-1">
                  {t("04 / Connected Living")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  {t("Smart Tech & Gadgets")}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  {t("Cutting-edge connectivity, crystal audio, and minimalist desk setups.")}
                </p>
              </div>
              <Link
                to="/collection/electronics"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <span>{t("View All")} ({electronicsProducts.length})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {electronicsProducts.map((p) => (
                <ProductCard key={p.product_id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ─── 7. SECTION: SACRED POOJA ESSENTIALS ─── */}
        {(activeTab === 'all' || activeTab === 'pooja') && (
          <div id="section-pooja-items" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-1">
                  {t("05 / Spiritual Heritage")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  Sacred Pooja Essentials
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  {t("Pure brassware, traditional incense, and divine ceremonial accoutrements.")}
                </p>
              </div>
              <Link
                to="/collection/pooja-items"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <span>{t("View All")} ({poojaProducts.length})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {poojaProducts.map((p) => (
                <ProductCard key={p.product_id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ─── 8. SECTION: FRESH NEW LAUNCHES ─── */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-1">
                  {t("06 / Fresh Drops")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  {t("Just Arrived")}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  {t("Explore the newest designs added to our store this week.")}
                </p>
              </div>
              <Link
                to="/collection/all?deal=new-arrivals"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <span>{t("View All")} ({newLaunches.length})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {newLaunches.map((p) => (
                <ProductCard key={p.product_id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

