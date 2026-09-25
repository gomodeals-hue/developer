import React, { useState, useMemo, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronRight, Layers } from 'lucide-react';
import ProductCard from '../../../common/ProductCard';
import { ProductContext } from '../../../../context/ProductContext/ProductContext';
import { useShop } from '../../../../context/ShopContext';

// Configuration of distinct homepage category sections
const HOMEPAGE_SECTIONS = [
  {
    id: 'men',
    categoryKey: 'clothing',
    sectionKey: 'men',
    title: "Men's Collection",
    subtitle: "Crisp shirts, casual tees, denim, traditional kurtas & footwear",
    viewAllPath: "/collection/clothing?section=men",
    accentColor: "from-blue-600 to-indigo-600",
    subcategories: [
      { label: 'All Men', slug: 'all' },
      { label: 'Shirts', slug: 'shirts' },
      { label: 'T-Shirts', slug: 't-shirts' },
      { label: 'Kurtas & Ethnic', slug: 'kurtas' },
      { label: 'Jeans & Trousers', slug: 'trousers-pants' },
      { label: 'Footwear', slug: 'casual-shoes' }
    ]
  },
  {
    id: 'women',
    categoryKey: 'clothing',
    sectionKey: 'women',
    title: "Women's Boutique",
    subtitle: "Graceful sarees, designer kurtis, dresses, tops & accessories",
    viewAllPath: "/collection/clothing?section=women",
    accentColor: "from-rose-500 to-pink-600",
    subcategories: [
      { label: 'All Women', slug: 'all' },
      { label: 'Sarees', slug: 'sarees' },
      { label: 'Kurtas & Kurtis', slug: 'kurtas' },
      { label: 'Dresses & Gowns', slug: 'dresses' },
      { label: 'Tops & Blouses', slug: 'tops' },
      { label: 'Handbags & Bags', slug: 'handbags' }
    ]
  },
  {
    id: 'kids',
    categoryKey: 'kids',
    sectionKey: 'kids',
    title: "Kids & Baby Collection",
    subtitle: "Playful apparel, festive sets, rompers & footwear for boys & girls",
    viewAllPath: "/collection/kids",
    accentColor: "from-amber-500 to-orange-500",
    subcategories: [
      { label: 'All Kids', slug: 'all' },
      { label: 'Boys Clothing', slug: 'boys-clothing' },
      { label: 'Girls Clothing', slug: 'girls-clothing' },
      { label: 'Baby Wear', slug: 'baby-clothes' },
      { label: 'Kids Footwear', slug: 'kids-shoes' }
    ]
  },
  {
    id: 'electronics',
    categoryKey: 'electronics',
    sectionKey: 'all',
    title: "Electronics & Smart Devices",
    subtitle: "High-fidelity audio, smartwatches, true wireless earbuds & accessories",
    viewAllPath: "/collection/electronics",
    accentColor: "from-cyan-600 to-blue-600",
    subcategories: [
      { label: 'All Electronics', slug: 'all' },
      { label: 'Headphones', slug: 'headphones' },
      { label: 'TWS Earbuds', slug: 'earbuds' },
      { label: 'Smartwatches', slug: 'smart-wearables' },
      { label: 'Bluetooth Speakers', slug: 'speakers' },
      { label: 'Soundbars', slug: 'soundbars' }
    ]
  },
  {
    id: 'pooja-items',
    categoryKey: 'pooja-items',
    sectionKey: 'all',
    title: "Pooja & Spiritual Essentials",
    subtitle: "Handcrafted pure brass diyas, sacred idols, fragrant incense & thalis",
    viewAllPath: "/collection/pooja-items",
    accentColor: "from-orange-500 to-amber-600",
    subcategories: [
      { label: 'All Pooja', slug: 'all' },
      { label: 'Diyas & Lamps', slug: 'diyas-lamps' },
      { label: 'Idols & Statues', slug: 'idols-statues' },
      { label: 'Incense & Fragrance', slug: 'incense-fragrance' },
      { label: 'Puja Thalis & Bells', slug: 'thalis' },
      { label: 'Home Mandirs', slug: 'home-temple-mandir' }
    ]
  },
  {
    id: 'home-living',
    categoryKey: 'home-living',
    sectionKey: 'all',
    title: "Home & Living Accents",
    subtitle: "Cookware, fine dinner sets, luxury bedsheets, curtains & artisan decor",
    viewAllPath: "/collection/home-living",
    accentColor: "from-emerald-600 to-teal-600",
    subcategories: [
      { label: 'All Home', slug: 'all' },
      { label: 'Cookware', slug: 'cookware' },
      { label: 'Dinner Sets', slug: 'dinner-sets' },
      { label: 'Bedsheets & Linen', slug: 'bedsheets' },
      { label: 'Curtains & Drapes', slug: 'curtains' },
      { label: 'Wall Decor', slug: 'wall-decor' }
    ]
  },
  {
    id: 'beauty',
    categoryKey: 'beauty',
    sectionKey: 'all',
    title: "Beauty & Personal Care",
    subtitle: "Pure ayurvedic skincare, hair oils, luxury fragrances & body wellness",
    viewAllPath: "/collection/beauty",
    accentColor: "from-rose-400 to-purple-600",
    subcategories: [
      { label: 'All Beauty', slug: 'all' },
      { label: 'Skincare', slug: 'skincare' },
      { label: 'Haircare', slug: 'haircare' },
      { label: 'Fragrances', slug: 'fragrances' },
      { label: 'Body & Wellness', slug: 'wellness' }
    ]
  }
];

export default function HomeCategorySections() {
  const { products } = useContext(ProductContext);
  const [selectedMainTab, setSelectedMainTab] = useState('all');
  const [sectionFilters, setSectionFilters] = useState({});

  // Helper filter function per category section
  const getProductsForSection = (config, subFilter) => {
    if (!products || !Array.isArray(products) || products.length === 0) return [];

    return products.filter((p) => {
      const pCat = (p.category || p.category_name || '').toLowerCase();
      const pTags = (p.tags || '').toLowerCase();
      const pSub = (p.subcategory || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const pChild = (p.childCategory || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const pName = (p.name || '').toLowerCase();
      const pGender = (p.gender || '').toLowerCase();
      const pRec = (p.recipient || '').toLowerCase();

      // 1. Match section category
      let matchCat = false;
      if (config.categoryKey === 'clothing') {
        matchCat = ['clothing', 'western-wear', 'ethnic-wear', 'winterwear', 'athleisure', 'night-lounge-wear', 'lingerie-innerwear', 'mens', 'women', 'kids', 'fashion'].includes(pCat) || pTags.includes('clothing');
      } else if (config.categoryKey === 'pooja-items') {
        matchCat = pCat.includes('pooja') || pCat.includes('puja') || pTags.includes('pooja') || pTags.includes('puja');
      } else if (config.categoryKey === 'home-living') {
        matchCat = pCat.includes('home') || pCat.includes('kitchen') || pTags.includes('home') || pTags.includes('living');
      } else if (config.categoryKey === 'electronics') {
        matchCat = pCat.includes('elect') || pCat.includes('gadget') || pTags.includes('electronics');
      } else if (config.categoryKey === 'beauty') {
        matchCat = pCat.includes('beauty') || pTags.includes('beauty') || pTags.includes('skincare');
      } else if (config.categoryKey === 'kids') {
        matchCat = pCat.includes('kid') || pTags.includes('kid') || pTags.includes('boy') || pTags.includes('girl') || pTags.includes('baby');
      } else {
        matchCat = pCat === config.categoryKey || pTags.includes(config.categoryKey);
      }

      if (!matchCat) return false;

      // 2. Match section gender/department (e.g. men vs women vs kids)
      if (config.sectionKey === 'men') {
        const isWomen = pGender === 'women' || pRec.includes('her') || pName.includes("women's") || pName.includes('women') || pTags.includes('women') || pTags.includes('saree') || pTags.includes('kurti') || pName.includes('saree') || pName.includes('dress') || pTags.includes('dress');
        if (isWomen) return false;
        const isMen = pGender === 'men' || pCat === 'mens' || pRec.includes('him') || pName.includes("men's") || pName.includes("men ") || pTags.includes('men') || pTags.includes('shirt') || pTags.includes('kurta');
        if (!isMen) return false;
      } else if (config.sectionKey === 'women') {
        const isMen = pGender === 'men' || pRec.includes('him') || pName.includes("men's") || pName.includes("men ");
        if (isMen) return false;
        const isWomen = pGender === 'women' || pCat === 'women' || pRec.includes('her') || pName.includes("women's") || pName.includes('women') || pTags.includes('women') || pTags.includes('saree') || pTags.includes('kurti') || pName.includes('saree') || pName.includes('dress') || pTags.includes('dress');
        if (!isWomen) return false;
      } else if (config.sectionKey === 'kids') {
        const isKids = pCat === 'kids' || pGender === 'kids' || pRec.includes('kid') || pTags.includes('kid') || pTags.includes('boy') || pTags.includes('girl') || pTags.includes('baby') || pName.includes('kid') || pName.includes('boy') || pName.includes('girl');
        if (!isKids) return false;
      }

      // 3. Match active subcategory chip if selected
      if (subFilter && subFilter !== 'all') {
        const cleanSub = subFilter.toLowerCase().replace(/[^a-z0-9]/g, '');
        const matchSub = pSub.includes(cleanSub) || pChild.includes(cleanSub) || pTags.includes(cleanSub) || pName.includes(cleanSub);
        if (!matchSub) return false;
      }

      return true;
    });
  };

  // Filter sections based on top bar selector
  const displayedSections = useMemo(() => {
    if (selectedMainTab === 'all') return HOMEPAGE_SECTIONS;
    return HOMEPAGE_SECTIONS.filter((s) => s.id === selectedMainTab);
  }, [selectedMainTab]);

  return (
    <section id="homepage-category-sections" className="w-full bg-[#faf9f8] py-16 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 block mb-1">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Explore By Category
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-normal mt-1 max-w-xl">
              Browse separate departments with handpicked authentic selections. Everything verified and guaranteed.
            </p>
          </div>

          {/* Minimal Quick Category Tab Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedMainTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedMainTab === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              All Sections
            </button>
            {HOMEPAGE_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedMainTab(sec.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedMainTab === sec.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50 hover:text-orange-600'
                }`}
              >
                {sec.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Separated Category Sections */}
        <div className="space-y-16">
          {displayedSections.map((sec) => {
            const activeSub = sectionFilters[sec.id] || 'all';
            const sectionProducts = getProductsForSection(sec, activeSub);
            const visibleProducts = sectionProducts.slice(0, 5);

            return (
              <div 
                key={sec.id} 
                id={`section-${sec.id}`}
                className="bg-white rounded-3xl border border-stone-200/70 p-6 sm:p-8 shadow-xs scroll-mt-24 transition-all duration-300 hover:shadow-md"
              >
                {/* Section Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                        {sec.title}
                      </h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 ml-2">
                        {sectionProducts.length} items
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-normal">
                      {sec.subtitle}
                    </p>
                  </div>

                  {/* Subcategory Pills & View All */}
                  <div className="flex items-center justify-between lg:justify-end gap-3 flex-wrap">
                    {/* Interactive Subcategory Quick Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                      {sec.subcategories.map((sub) => {
                        const isSelected = activeSub === sub.slug;
                        return (
                          <button
                            key={sub.slug}
                            onClick={() => setSectionFilters((prev) => ({ ...prev, [sec.id]: sub.slug }))}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? 'bg-orange-600 text-white shadow-xs'
                                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/60'
                            }`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* View All Button */}
                    <Link
                      to={sec.viewAllPath}
                      className="group inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50/70 hover:bg-orange-100/80 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 ml-auto lg:ml-0"
                    >
                      <span>Explore All</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Visible Products Grid */}
                {visibleProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {visibleProducts.map((prod) => (
                      <motion.div
                        key={prod.product_id || prod.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ProductCard product={prod} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-stone-400 text-xs">
                    No products currently matching this filter chip.
                  </div>
                )}

                {/* Bottom subtle bar linking to full department */}
                <div className="mt-6 pt-4 border-t border-stone-50 flex items-center justify-between text-xs text-stone-400">
                  <span className="text-[11px]">
                    GoMo Deals Boutique &bull; 100% Genuine Certified
                  </span>
                  <Link
                    to={sec.viewAllPath}
                    className="font-semibold text-stone-600 hover:text-orange-600 transition-colors flex items-center gap-1"
                  >
                    <span>View complete {sec.title.toLowerCase()}</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
