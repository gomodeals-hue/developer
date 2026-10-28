import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBasket, Dog,
  Laptop, Shirt, Watch, Gift, Apple, Home, Activity, 
  User, Heart, Smile, Sun, Gamepad2, ShieldCheck, BookOpen, 
  ArrowRight, Search, Layers, Grid, Footprints, Gem, Crown, Moon, CloudSnow,
  Sparkles, X
} from 'lucide-react';
import { categoryService } from '../../services/categoryService';
import { productService } from '../../services/productService';
import { findRespectiveCategoryMatch, buildSearchNavigationUrl } from '../../utils/categorySearchMatcher.js';

const ICON_MAP = {
  ShieldCheck, BookOpen, Shirt, Laptop, Watch, Gift, Apple, 
  Home, Activity, User, Heart, Smile, Sun, Gamepad2,
  Footprints, Gem, Crown, Moon, CloudSnow
};

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      setLoading(true);
      try {
        const catRes = await categoryService.getCategoriesWithDetails();
        const prodRes = await productService.getProducts();

        if (catRes?.success && Array.isArray(catRes.data)) {
          setCategories(catRes.data);
        } else if (Array.isArray(catRes)) {
          setCategories(catRes);
        }

        const prods = prodRes?.success && Array.isArray(prodRes.data) ? prodRes.data : [];
        setAllProducts(prods);

        // Count products per category with comprehensive category aliases
        if (prods.length > 0) {
          const counts = {};
          prods.forEach(p => {
            let slug = (p.category || p.category_name || '').toLowerCase();
            const dept = (p.department || p.gender || p.section || '').toLowerCase();

            if (slug === 'electronics') {
              counts['gadgets'] = (counts['gadgets'] || 0) + 1;
              counts['electronics'] = (counts['electronics'] || 0) + 1;
            } else if (slug === 'gadgets') {
              counts['gadgets'] = (counts['gadgets'] || 0) + 1;
              counts['electronics'] = (counts['electronics'] || 0) + 1;
            } else {
              counts[slug] = (counts[slug] || 0) + 1;
            }

            if (slug === 'clothing') {
              counts['western-wear'] = (counts['western-wear'] || 0) + 1;
            }
            if (dept === 'kids' || dept === 'kid' || dept.includes('kid') || slug === 'kids') {
              counts['kids'] = (counts['kids'] || 0) + 1;
            }
            if (slug === 'grocery' || slug === 'grocery-items' || slug === 'groceries') {
              counts['grocery-items'] = (counts['grocery-items'] || 0) + 1;
              counts['grocery'] = (counts['grocery'] || 0) + 1;
            }
            if (slug === 'pet-accessories' || slug === 'pet' || slug === 'pets') {
              counts['pet-accessories'] = (counts['pet-accessories'] || 0) + 1;
            }
            if (slug === 'beauty' || dept === 'beauty' || slug.includes('beauty')) {
              counts['beauty'] = (counts['beauty'] || 0) + 1;
            }
            if (slug === 'pooja-items' || slug === 'pooja' || dept === 'pooja-items' || dept === 'pooja' || slug.includes('pooja')) {
              counts['pooja-items'] = (counts['pooja-items'] || 0) + 1;
              counts['pooja'] = (counts['pooja'] || 0) + 1;
            }
            if (slug === 'stationery') counts['stationary'] = (counts['stationary'] || 0) + 1;
            if (slug === 'stationary') counts['stationery'] = (counts['stationery'] || 0) + 1;
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

  const [selectedFilter, setSelectedFilter] = useState('all');

  const cleanQ = (searchQuery || '').toLowerCase().trim();

  // Compute product matches per category for active search query
  const matchingProductsPerCategory = useMemo(() => {
    if (!cleanQ || !allProducts.length) return {};
    const tokens = cleanQ.split(/\s+/).filter(Boolean);
    const map = {};
    allProducts.forEach(p => {
      const text = [
        p.name, p.title, p.brand, p.tags, p.category, p.category_name, p.subcategory, p.childCategory, p.description
      ].filter(Boolean).join(' ').toLowerCase();

      const matches = tokens.every(t => {
        if (text.includes(t)) return true;
        if (t.endsWith('s') && text.includes(t.slice(0, -1))) return true;
        if (!t.endsWith('s') && text.includes(t + 's')) return true;
        return false;
      });

      if (matches) {
        let cat = (p.category || '').toLowerCase();
        if (cat === 'electronics') {
          map['gadgets'] = (map['gadgets'] || 0) + 1;
          map['electronics'] = (map['electronics'] || 0) + 1;
        } else {
          map[cat] = (map[cat] || 0) + 1;
        }
        if (cat === 'clothing') {
          map['western-wear'] = (map['western-wear'] || 0) + 1;
        }
      }
    });
    return map;
  }, [cleanQ, allProducts]);

  // Direct category match for hero feedback
  const categoryMatchResult = useMemo(() => {
    if (!cleanQ) return null;
    return findRespectiveCategoryMatch(cleanQ, allProducts);
  }, [cleanQ, allProducts]);

  const filteredCategories = (categories || []).filter(cat => {
    if (!cat) return false;
    if (selectedFilter !== 'all' && cat.slug !== selectedFilter && !cat.slug?.includes(selectedFilter)) {
      return false;
    }
    if (!cleanQ) return true;
    const matchesName = cat.label?.toLowerCase().includes(cleanQ);
    const matchesDesc = cat.description?.toLowerCase().includes(cleanQ);
    const matchesSub = cat.subcategories?.some(sub => 
      (typeof sub === 'string' ? sub : (sub?.label || sub?.slug || '')).toLowerCase().includes(cleanQ)
    );
    const matchesSec = cat.sections?.some(sec =>
      sec?.title?.toLowerCase().includes(cleanQ) || sec?.items?.some(i => i?.label?.toLowerCase().includes(cleanQ))
    );
    const hasMatchingProducts = Boolean(matchingProductsPerCategory[cat.slug] && matchingProductsPerCategory[cat.slug] > 0);
    const isTopCategoryMatch = categoryMatchResult?.categorySlug === cat.slug;

    return matchesName || matchesDesc || matchesSub || matchesSec || hasMatchingProducts || isTopCategoryMatch;
  });

  const handleHeroSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!cleanQ) return;
    const targetUrl = buildSearchNavigationUrl(searchQuery, allProducts);
    navigate(targetUrl);
  };

  const FILTER_TABS = [
    { label: 'All', value: 'all' },
    { label: 'Grocery Items', value: 'grocery-items' },
    { label: 'Pet Accessories', value: 'pet-accessories' },
    { label: 'Clothing & Ethnic', value: 'clothing' },
    { label: 'Footwear & Bags', value: 'footwear' },
    { label: 'Electronics', value: 'gadgets' },
    { label: 'Pooja & Spiritual', value: 'pooja-items' },
    { label: 'Home & Living', value: 'home-living' },
    { label: 'Beauty', value: 'beauty' },
    { label: 'Kids', value: 'kids' },
    { label: 'Gifts', value: 'gifts' }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] pt-6 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Amazon-style Clean Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">All Departments &amp; Categories</span>
        </div>

        {/* Editorial Image Hero Section for Departments (Rich Warm Aesthetic like Reference) */}
        <div className="relative w-full rounded-3xl overflow-hidden mb-10 shadow-md border border-[#f76e28]/20 bg-gradient-to-r from-[#de5713] to-[#f76e28] text-white">
          <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85"
              alt="All Departments"
              className="w-full h-full object-cover object-center filter brightness-[0.9]"
            />
          </div>

          <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-4xl text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10.5px] font-black tracking-widest uppercase mb-3 shadow-xs"
            >
              <span>DEPARTMENT DIRECTORY</span>
              <span className="w-1 h-1 rounded-full bg-white/80" />
              <span className="text-orange-100 font-semibold">{categories.length} Departments</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6"
            >
              Elevate Your Everyday
            </motion.h1>

            {/* Instant Category Search Input inside Hero */}
            <form onSubmit={handleHeroSearchSubmit} className="max-w-md relative mb-3">
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, departments or subcategories..."
                  className="w-full pl-10 pr-20 py-2.5 bg-white text-stone-900 placeholder-stone-400 rounded-full text-xs focus:outline-none shadow-md transition-all font-medium border-2 border-transparent focus:border-stone-900"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-14 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1 px-3 py-1.5 bg-[#de5713] hover:bg-[#c44908] text-white rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Real-time Category Match Feedback */}
              {categoryMatchResult && categoryMatchResult.categorySlug && (
                <div className="mt-2.5 p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Sparkles size={13} className="text-amber-200 shrink-0" />
                    <span className="text-[11px] font-medium text-orange-100">Respective Match:</span>
                    <span className="font-bold text-white bg-black/30 px-2 py-0.5 rounded truncate">
                      {categoryMatchResult.categoryLabel}
                    </span>
                    {categoryMatchResult.matchCount > 0 && (
                      <span className="text-[10px] text-amber-200 font-bold shrink-0">
                        ({categoryMatchResult.matchCount} items)
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(buildSearchNavigationUrl(searchQuery, allProducts))}
                    className="underline text-[11px] font-bold text-white hover:text-amber-200 shrink-0 ml-2 cursor-pointer flex items-center gap-0.5"
                  >
                    <span>View &rarr;</span>
                  </button>
                </div>
              )}
            </form>

            {/* Quick Department Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-white/20">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-100 mr-1 shrink-0">
                Filter:
              </span>
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedFilter(tab.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                    selectedFilter === tab.value
                      ? 'bg-stone-950 text-white shadow-sm'
                      : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:shadow-xs'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs animate-pulse p-4">
                <div className="aspect-[4/3] bg-stone-100 rounded-2xl mb-4" />
                <div className="space-y-3">
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
              const matchingProdCount = matchingProductsPerCategory[cat.slug] || 0;
              const cardLink = searchQuery.trim()
                ? `/products?category=${encodeURIComponent(cat.slug)}&search=${encodeURIComponent(searchQuery.trim())}`
                : `/collection/${cat.slug}`;

              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  className="group bg-white rounded-3xl border border-stone-200/80 hover:border-orange-500/40 p-3.5 hover:shadow-[0_16px_36px_rgba(247,110,40,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Category Image */}
                  <Link to={cardLink} className="relative aspect-[4/3] rounded-2xl overflow-hidden block bg-stone-100">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Icon Badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur text-orange-600 flex items-center justify-center shadow-xs">
                      <IconComponent size={15} strokeWidth={2.2} />
                    </div>

                    {/* Product Count Pill */}
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      {matchingProdCount > 0 && searchQuery.trim() && (
                        <div className="bg-orange-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <Sparkles size={10} />
                          <span>{matchingProdCount} matches</span>
                        </div>
                      )}
                      <div className="bg-stone-900/85 backdrop-blur text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                        {count} {count === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </Link>

                  {/* Card Content & Subcategories */}
                  <div className="pt-3.5 pb-1 px-1 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Category Label */}
                      <Link to={cardLink} className="block">
                        <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors flex items-center justify-between gap-1">
                          <span>{cat.label}</span>
                          {matchingProdCount > 0 && searchQuery.trim() && (
                            <span className="text-[11px] font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                              Match
                            </span>
                          )}
                        </h3>
                      </Link>

                      {/* Subcategories / Sections */}
                      <div className="mt-2.5 mb-4">
                        {cat.sections && cat.sections.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {cat.sections.slice(0, 3).map(sec => (
                              <Link
                                key={sec.slug}
                                to={searchQuery.trim()
                                  ? `/products?category=${cat.slug}&section=${sec.slug}&search=${encodeURIComponent(searchQuery.trim())}`
                                  : `/collection/${cat.slug}?section=${sec.slug}`}
                                className="text-[10px] font-semibold text-stone-600 bg-stone-50 hover:bg-orange-50 hover:text-orange-600 border border-stone-200/70 rounded-full px-2.5 py-0.5 transition-colors"
                              >
                                {sec.title}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {(cat.subcategories || []).slice(0, 4).map(sub => {
                              const subSlug = typeof sub === 'string' ? sub : (sub?.slug || '');
                              const subLabel = typeof sub === 'string' ? sub : (sub?.label || sub?.name || subSlug);
                              return (
                                <Link
                                  key={subSlug || subLabel}
                                  to={searchQuery.trim()
                                    ? `/products?category=${cat.slug}&subcategory=${subSlug}&search=${encodeURIComponent(searchQuery.trim())}`
                                    : `/collection/${cat.slug}?subcategory=${subSlug}`}
                                  className="text-[10px] font-semibold text-stone-600 bg-stone-50 hover:bg-orange-50 hover:text-orange-600 border border-stone-200/70 rounded-full px-2.5 py-0.5 transition-colors"
                                >
                                  {subLabel}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={cardLink}
                      className="w-full py-2 px-4 bg-stone-50 hover:bg-orange-600 text-stone-700 hover:text-white border border-stone-200 hover:border-orange-600 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600"
                    >
                      <span>{searchQuery.trim() ? "View Matching Products" : "Explore Collection"}</span>
                      <ArrowRight size={12} strokeWidth={2.5} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center max-w-md mx-auto bg-white border border-stone-200 rounded-2xl p-8 shadow-xs">
            <Grid size={32} className="text-stone-300 mx-auto mb-3" />
            <h4 className="text-stone-800 font-bold text-sm mb-1">No categories match your criteria</h4>
            <p className="text-stone-500 text-xs mb-4">Try searching with a broader keyword or resetting filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
