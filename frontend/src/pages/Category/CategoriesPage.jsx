import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Laptop, Shirt, Watch, Gift, Apple, Home, Activity, 
  User, Heart, Smile, Sun, Gamepad2, ShieldCheck, BookOpen, 
  ArrowRight, Search, Layers, Grid, Footprints, Gem, Crown, Moon, CloudSnow
} from 'lucide-react';
import { categoryService } from '../../services/categoryService';
import { productService } from '../../services/productService';

const ICON_MAP = {
  ShieldCheck, BookOpen, Shirt, Laptop, Watch, Gift, Apple, 
  Home, Activity, User, Heart, Smile, Sun, Gamepad2,
  Footprints, Gem, Crown, Moon, CloudSnow
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      setLoading(true);
      try {
        const catRes = await categoryService.getCategoriesWithDetails();
        const prodRes = await productService.getProducts();

        if (catRes.success) {
          setCategories(catRes.data);
        }

        // Count products per category
        if (prodRes.success && Array.isArray(prodRes.data)) {
          const counts = {};
          prodRes.data.forEach(p => {
            const slug = (p.category || p.category_name || '').toLowerCase();
            counts[slug] = (counts[slug] || 0) + 1;
          });
          setCategoryCounts(counts);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredCategories = categories.filter(cat => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const matchesName = cat.label?.toLowerCase().includes(q);
    const matchesDesc = cat.description?.toLowerCase().includes(q);
    const matchesSub = cat.subcategories?.some(sub => 
      sub.label?.toLowerCase().includes(q) || sub.slug?.toLowerCase().includes(q)
    );
    const matchesSec = cat.sections?.some(sec =>
      sec.title?.toLowerCase().includes(q) || sec.items?.some(i => i.label?.toLowerCase().includes(q))
    );
    return matchesName || matchesDesc || matchesSub || matchesSec;
  });

  return (
    <div className="min-h-screen bg-[#fdfbf9] pt-8 pb-24">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-12">
        
        {/* Page Header */}
        <header className="mb-10 text-center max-w-2xl mx-auto border-b border-stone-200/60 pb-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] uppercase tracking-[0.45em] text-orange-600 block mb-2 font-black"
          >
            GoMo Catalog Directory
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-stone-900 mb-3 tracking-wide font-normal"
          >
            Explore All Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-xs font-semibold uppercase tracking-[0.2em] leading-relaxed max-w-lg mx-auto"
          >
            Discover our complete range of handpicked boutique selections, fine accessories, and everyday essentials.
          </motion.p>

          {/* Instant Category Filter */}
          <div className="mt-8 max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by category or subcategory..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 shadow-sm transition-all"
            />
          </div>
        </header>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm animate-pulse">
                <div className="h-44 bg-stone-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-stone-100 rounded w-1/2" />
                  <div className="h-3 bg-stone-100 rounded w-3/4" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 bg-stone-100 rounded-full w-16" />
                    <div className="h-6 bg-stone-100 rounded-full w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredCategories.map((cat, idx) => {
              const IconComponent = ICON_MAP[cat.icon] || Layers;
              const count = categoryCounts[cat.slug] || 0;

              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="group bg-white rounded-2xl border border-stone-200 hover:border-orange-500/40 overflow-hidden hover:shadow-[0_20px_40px_rgba(240,115,35,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Category Image Header */}
                  <Link to={`/collection/${cat.slug}`} className="relative h-48 sm:h-52 overflow-hidden block">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-orange-700 flex items-center justify-center shadow-md">
                      <IconComponent size={18} strokeWidth={2.2} />
                    </div>

                    {/* Product Count Pill */}
                    <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur text-white text-[8.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                      {count} {count === 1 ? 'item' : 'items'}
                    </div>

                    {/* Title in Image Overlay */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
                        {cat.label}
                      </h3>
                    </div>
                  </Link>

                  {/* Card Content & Subcategories */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
                    <div className="space-y-3 mb-3">
                      {cat.sections && cat.sections.length > 0 ? (
                        <div className="space-y-2">
                          <div className="text-[8.5px] font-black uppercase tracking-widest text-orange-600 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span>Department Sections</span>
                          </div>
                          <div className="space-y-1.5">
                            {cat.sections.slice(0, 3).map(sec => (
                              <div key={sec.slug} className="bg-stone-50/80 p-2 rounded-lg border border-stone-100/90 text-left">
                                <div className="flex items-center justify-between mb-1">
                                  <Link
                                    to={`/collection/${cat.slug}?section=${sec.slug}`}
                                    className="text-[9.5px] font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 transition-colors flex items-center gap-1"
                                  >
                                    <span>{sec.title}</span>
                                    <span className="text-[8px] font-bold text-stone-400">({sec.items?.length || 0})</span>
                                  </Link>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {sec.items?.slice(0, 3).map(item => (
                                    <Link
                                      key={item.slug}
                                      to={`/collection/${cat.slug}?subcategory=${item.slug}&section=${sec.slug}`}
                                      className="text-[8.5px] font-semibold text-stone-600 hover:text-orange-600 hover:underline transition-colors"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-[8.5px] font-black uppercase tracking-widest text-stone-400 mb-2">
                            Popular Subcategories
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.subcategories?.slice(0, 5).map(sub => (
                              <Link
                                key={sub.slug}
                                to={`/collection/${cat.slug}?subcategory=${sub.slug}`}
                                className="text-[9px] font-bold text-stone-700 hover:text-orange-600 bg-stone-50 hover:bg-orange-50 border border-stone-200/80 hover:border-orange-200 px-2 py-1 rounded-md transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/collection/${cat.slug}`}
                      className="w-full mt-2 py-2.5 px-4 bg-orange-50 hover:bg-orange-600 text-orange-900 hover:text-white border border-orange-200 hover:border-orange-600 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-98 shadow-sm group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
            <Grid size={36} className="text-stone-300 mx-auto mb-3" />
            <h4 className="text-stone-800 font-bold text-sm mb-1">No categories match "{searchQuery}"</h4>
            <p className="text-stone-500 text-xs mb-4">Try searching with a broader keyword or view all categories.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
