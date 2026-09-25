import React, { useState, useMemo, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Loader2, SlidersHorizontal, RotateCcw, ChevronDown, ChevronRight, Check, Tag, Star, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../../common/ProductCard';
import { ProductContext } from '../../../../context/ProductContext/ProductContext';
import { useShop } from '../../../../context/ShopContext';

import { categoryService, categoryTree, categorySections } from '../../../../services/categoryService';

const ProductGrid = () => {
  const { products: sellerProducts, fetchProducts: fetchSellerProducts, loading } = useContext(ProductContext);
  const { formatPrice, t } = useShop();

  const categoryLabels = useMemo(() => ({
    all: t('explore_products') || 'All Products',
    clothing: 'Clothing',
    'western-wear': 'Western Wear',
    'ethnic-wear': 'Ethnic Wear',
    footwear: 'Footwear',
    footwears: 'Footwear',
    winterwear: 'Winter Wear',
    'winter-wear': 'Winter Wear',
    'lingerie-innerwear': 'Inner Wear & Lingerie',
    'inner-wear': 'Inner Wear',
    innerwear: 'Inner Wear',
    lingerie: 'Lingerie',
    'night-lounge-wear': 'Night & Lounge Wear',
    'night-wear': 'Night Wear',
    nightwear: 'Night Wear',
    athleisure: 'Athleisure',
    accessories: 'Accessories',
    gadgets: 'Gadgets',
    jewellery: 'Jewellery',
    jewelry: 'Jewellery',
    beauty: t('beauty'),
    electronics: t('electronics'),
    fashion: t('fashion'),
    'home-living': t('home_living'),
    mens: 'Mens',
    women: 'Women',
    kids: 'Kids',
    'pooja-items': 'Pooja Items',
    gifts: 'Gifts',
    'healthy-foods': 'Healthy Foods'
  }), [t]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlSearchQuery = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'all';
  const urlSection = searchParams.get('section') || 'all';
  const urlSubcategory = searchParams.get('subcategory') || 'all';
  const urlDeal = searchParams.get('deal') || 'all';

  
  const uniqueBrands = useMemo(() => {
    if (!sellerProducts) return [];
    const brands = new Set();
    sellerProducts.forEach(p => {
      if (p.brand && p.brand.trim()) {
        brands.add(p.brand.trim());
      }
    });
    return Array.from(brands).sort();
  }, [sellerProducts]);
  
  // Active Filter State
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSection, setFilterSection] = useState('all');
  const [filterSubcategory, setFilterSubcategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [filterDeal, setFilterDeal] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [filterRecipient, setFilterRecipient] = useState('all');
  const [filterOccasion, setFilterOccasion] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [filterBrand, setFilterBrand] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterColor, setFilterColor] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [filterDiscount, setFilterDiscount] = useState('all');
  const [displayLimit, setDisplayLimit] = useState(20);
  
  // UI Accordion and Drawer States
  const [expandedCategories, setExpandedCategories] = useState({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    departments: true,
    brand: false,
    price: true,
    gender: false,
    recipient: false,
    occasion: false,
    color: false,
    size: false,
    availability: false,
    rating: false,
    discount: false,
    deals: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    if (typeof fetchSellerProducts === 'function') {
      fetchSellerProducts();
    }
  }, [fetchSellerProducts]);

  // Synchronize category, section and subcategory from URL
  useEffect(() => {
    if (urlCategory) {
      setFilterCategory(urlCategory);
    }
    if (urlSection) {
      setFilterSection(urlSection);
    }
    if (urlSubcategory) {
      setFilterSubcategory(urlSubcategory);
    }
  }, [urlCategory, urlSection, urlSubcategory]);

  // Synchronize deal selection from the URL query parameters
  useEffect(() => {
    if (urlDeal) {
      setFilterDeal(urlDeal);
    }
  }, [urlDeal]);

  // Keep category accordion expanded state in sync with chosen department
  useEffect(() => {
    if (filterCategory !== 'all') {
      setExpandedCategories({ [filterCategory]: true });
    } else {
      setExpandedCategories({});
    }
  }, [filterCategory]);

  // Reset size filter to 'all' if category changes to non-fashion
  useEffect(() => {
    if (filterCategory !== 'fashion') {
      setFilterSize('all');
    }
  }, [filterCategory]);

  const toggleCategoryAccordion = (cat) => {
    setExpandedCategories(prev => ({ [cat]: !prev[cat] }));
  };

  const handleCategorySelect = (c) => {
    setFilterCategory(c);
    setFilterSection('all');
    setFilterSubcategory('all');
    setExpandedCategories({ [c]: true });
    
    const params = new URLSearchParams(location.search);
    if (c === 'all') {
      params.delete('category');
      params.delete('section');
    } else {
      params.set('category', c);
      params.delete('section');
    }
    params.delete('subcategory');
    // Push to history so 'Back' button works
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleSectionSelect = (c, secSlug) => {
    setFilterCategory(c);
    setFilterSection(secSlug);
    setFilterSubcategory('all');
    setExpandedCategories({ [c]: true });

    const params = new URLSearchParams(location.search);
    params.set('category', c);
    params.set('section', secSlug);
    params.delete('subcategory');
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleSubcategorySelect = (c, sub, secSlug) => {
    setFilterCategory(c);
    if (secSlug) {
      setFilterSection(secSlug);
    }
    setFilterSubcategory(sub);
    setExpandedCategories({ [c]: true });
    
    const params = new URLSearchParams(location.search);
    params.set('category', c);
    if (secSlug) {
      params.set('section', secSlug);
    }
    if (sub === 'all') {
      params.delete('subcategory');
    } else {
      params.set('subcategory', sub);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setFilterCategory('all');
    setFilterSection('all');
    setFilterSubcategory('all');
    setPriceRange('all');
    setFilterDeal('all');
    setSortBy('featured');
    setFilterRecipient('all');
    setFilterOccasion('all');
    setMinRating(0);
    setFilterBrand('all');
    setAvailability('all');
    setFilterGender('all');
    setFilterColor('all');
    setFilterSize('all');
    setFilterDiscount('all');
    setDisplayLimit(20);
    
    // Reset any active URL parameters by navigating to the base catalog path
    if (location.search) {
      navigate('/', { replace: true });
    }
  };

  const activeFiltersList = useMemo(() => {
    const list = [];
    if (filterCategory !== 'all') {
      list.push({ id: 'category', label: `${t('categories')}: ${categoryLabels[filterCategory] || filterCategory}`, clear: () => setFilterCategory('all') });
    }
    if (filterSection !== 'all') {
      const secObj = (categorySections[filterCategory] || []).find(s => s.slug === filterSection);
      const secLabel = secObj ? (secObj.displayTitle || secObj.title) : filterSection;
      list.push({
        id: 'section',
        label: `Section: ${secLabel}`,
        clear: () => {
          setFilterSection('all');
          const params = new URLSearchParams(location.search);
          params.delete('section');
          navigate(`${location.pathname}?${params.toString()}`);
        }
      });
    }
    if (filterSubcategory !== 'all') {
      list.push({ id: 'subcategory', label: `Subcategory: ${filterSubcategory}`, clear: () => setFilterSubcategory('all') });
    }
    if (priceRange !== 'all') {
      list.push({ id: 'price', label: `Price: ${priceRange}`, clear: () => setPriceRange('all') });
    }
    if (filterDeal !== 'all') {
      const dealLabel = filterDeal === 'sale' ? t('sale') : filterDeal === 'wow deals' ? t('wow_deals') : filterDeal === 'what\'s new' ? t('whats_new') : filterDeal === 'best sellers' ? t('best_sellers') : filterDeal;
      list.push({ id: 'deal', label: `Deal: ${dealLabel}`, clear: () => setFilterDeal('all') });
    }
    if (filterRecipient !== 'all') {
      list.push({ id: 'recipient', label: `Recipient: ${filterRecipient}`, clear: () => setFilterRecipient('all') });
    }
    if (filterOccasion !== 'all') {
      list.push({ id: 'occasion', label: `${t('occasion')}: ${filterOccasion}`, clear: () => setFilterOccasion('all') });
    }
    if (minRating > 0) {
      list.push({ id: 'rating', label: `Rating: ${minRating}★ & Up`, clear: () => setMinRating(0) });
    }
    if (filterBrand !== 'all') {
      list.push({ id: 'brand', label: `${t('brand') || 'Brand'}: ${filterBrand}`, clear: () => setFilterBrand('all') });
    }
    if (availability !== 'all') {
      list.push({ id: 'availability', label: `Stock: ${availability === 'instock' ? t('in_stock') : t('out_of_stock')}`, clear: () => setAvailability('all') });
    }
    if (filterColor !== 'all') {
      list.push({ id: 'color', label: `Color: ${filterColor}`, clear: () => setFilterColor('all') });
    }
    if (filterSize !== 'all') {
      list.push({ id: 'size', label: `Size: ${filterSize}`, clear: () => setFilterSize('all') });
    }
    if (urlSearchQuery) {
      list.push({ id: 'search', label: `Search: "${urlSearchQuery}"`, clear: () => navigate('/', { replace: true }) });
    }
    return list;
  }, [filterCategory, filterSection, filterSubcategory, priceRange, filterDeal, filterRecipient, filterOccasion, minRating, filterBrand, availability, filterColor, filterSize, urlSearchQuery, navigate, t, categoryLabels, location.search]);

  const filteredProducts = useMemo(() => {
    if (!sellerProducts) return [];
    
    // Helper for clean includes check
    const fieldContains = (field, search) => {
      if (!field || !search) return false;
      const cleanField = field.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanSearch = search.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanField.includes(cleanSearch);
    };

    const isMenField = (val) => {
      if (!val) return false;
      const str = String(val).toLowerCase();
      const withoutWomen = str.replace(/wom[ae]n('?s)?/g, '');
      return /\b(men|mens|man|him|husband|boyfriend|groom|boy|father|male)\b/.test(withoutWomen) ||
             /men's/.test(withoutWomen);
    };

    const isWomenField = (val) => {
      if (!val) return false;
      const str = String(val).toLowerCase();
      return /\b(women|womens|woman|womans|her|wife|girlfriend|bride|girl|mother|female|lady|ladies)\b/.test(str) ||
             /women's/.test(str);
    };

    const fleaMarketCategories = ['flea', 'dal', 'paruppu', 'rice', 'wheat', 'maize', 'groundnut', 'sesame', 'black-pepper', 'turmeric', 'coriander', 'cumin', 'sugar', 'daily-essentials-groceries'];

    let result = sellerProducts.filter(p => {
      const pCat = (p.category_name || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();
      const pTags = (p.tags || '').toLowerCase();
      
      // Explicitly check for Flea Market indicators
      if (
        pCat.includes('flea') || pTags.includes('flea') || pName.includes('flea') ||
        fleaMarketCategories.some(fCat => pCat.includes(fCat) || pCat === fCat || pName.includes(fCat) || pTags.includes(fCat))
      ) {
        return false;
      }

      // 1. Match Main Department
      let matchCategory = true;
      if (filterCategory !== 'all') {
        const cat = filterCategory.toLowerCase();
        const catClean = cat.replace(/[^a-z0-9]/g, '');
        
        const catCleanSpaced = catClean.replace(/-/g, ' ');
        let matchSubcategoryTree = false;
        if (categoryTree[cat]) {
          matchSubcategoryTree = categoryTree[cat].some(sub => 
            fieldContains(p.category_name, sub.slug) || 
            fieldContains(p.category_name, sub.slug.replace(/-/g, ' ')) ||
            fieldContains(p.tags, sub.slug) || 
            fieldContains(p.name, sub.slug) ||
            fieldContains(p.name, sub.slug.replace(/-/g, ' '))
          );
        }
        if (!matchSubcategoryTree && categorySections[cat]) {
          matchSubcategoryTree = categorySections[cat].some(sec => 
            (sec.items || []).some(item => 
              fieldContains(p.category_name, item.slug) || 
              fieldContains(p.category_name, item.slug.replace(/-/g, ' ')) ||
              fieldContains(p.subcategory, item.slug) || 
              fieldContains(p.tags, item.slug) || 
              fieldContains(p.name, item.slug) ||
              fieldContains(p.name, item.slug.replace(/-/g, ' ')) ||
              (item.keywords || []).some(kw => fieldContains(p.name, kw) || fieldContains(p.tags, kw))
            )
          );
        }

        matchCategory = fieldContains(p.category_name, catClean) || 
                        fieldContains(p.category_name, catCleanSpaced) ||
                        fieldContains(p.parent_category_name, catClean) || 
                        fieldContains(p.parent_category_name, catCleanSpaced) ||
                        fieldContains(p.tags, catClean) || 
                        fieldContains(p.name, catClean) ||
                        fieldContains(p.name, catCleanSpaced) ||
                        fieldContains(p.description, catClean) ||
                        fieldContains(p.description, catCleanSpaced) ||
                        fieldContains(p.recipient, catClean) ||
                        fieldContains(p.room, catClean) ||
                        matchSubcategoryTree ||
                        (catClean === 'clothing' && (
                          fieldContains(p.category_name, 'wear') || 
                          fieldContains(p.parent_category_name, 'wear') || 
                          fieldContains(p.category_name, 'dress') || 
                          fieldContains(p.category_name, 'saree') || 
                          fieldContains(p.category_name, 'kurtis') || 
                          fieldContains(p.category_name, 'chudithar') ||
                          fieldContains(p.category_name, 'clothing') ||
                          fieldContains(p.parent_category_name, 'clothing') ||
                          fieldContains(p.category_name, 'shirt') ||
                          fieldContains(p.category_name, 'jeans') ||
                          fieldContains(p.category_name, 'mens') ||
                          fieldContains(p.category_name, 'women') ||
                          fieldContains(p.tags, 'clothing') ||
                          fieldContains(p.tags, 'shirts') ||
                          fieldContains(p.tags, 't-shirts') ||
                          fieldContains(p.tags, 'jeans') ||
                          fieldContains(p.tags, 'dresses') ||
                          fieldContains(p.tags, 'sarees') ||
                          fieldContains(p.tags, 'kurtis') ||
                          fieldContains(p.tags, 'jackets') ||
                          fieldContains(p.tags, 'trousers') ||
                          fieldContains(p.tags, 'track-pants')
                        )) ||
                        (catClean === 'footwear' && (fieldContains(p.category_name, 'footwear') || fieldContains(p.category_name, 'shoes') || fieldContains(p.tags, 'footwear') || fieldContains(p.tags, 'shoes') || fieldContains(p.tags, 'sneakers') || fieldContains(p.tags, 'boots') || fieldContains(p.tags, 'sandals'))) ||
                        (catClean === 'homeliving' && (fieldContains(p.category_name, 'home') || fieldContains(p.category_name, 'living') || fieldContains(p.parent_category_name, 'home') || fieldContains(p.parent_category_name, 'living') || fieldContains(p.tags, 'home-living'))) ||
                        (catClean === 'sportsfitness' && (fieldContains(p.category_name, 'sports') || fieldContains(p.category_name, 'fitness') || fieldContains(p.parent_category_name, 'sports') || fieldContains(p.parent_category_name, 'fitness'))) ||
                        (catClean === 'fashion' && ['apparel', 'clothing', 'shirt', 'dress', 'him', 'her', 'girlfriend', 'boyfriend'].some(t => fieldContains(p.recipient, t) || fieldContains(p.name, t) || fieldContains(p.tags, t))) ||
                        (catClean === 'homeliving' && ['home', 'kitchen', 'decor', 'housewarming', 'living'].some(t => fieldContains(p.occasion, t) || fieldContains(p.name, t) || fieldContains(p.tags, t)));
      }

      // 1.5 Match Section (e.g. Men's clothing, Women's clothing, Kids' clothing, etc.)
      let matchSection = true;
      if (filterSection !== 'all') {
        const secSlug = filterSection.toLowerCase();
        const secObj = (categorySections[filterCategory] || []).find(s => s.slug === secSlug);

        if (secSlug === 'men') {
          const isExplicitWomen = 
            isWomenField(p.category_name) ||
            isWomenField(p.parent_category_name) ||
            isWomenField(p.tags) ||
            isWomenField(p.name) ||
            isWomenField(p.recipient) ||
            fieldContains(p.name, 'saree') ||
            fieldContains(p.tags, 'saree') ||
            fieldContains(p.name, 'bra') ||
            fieldContains(p.tags, 'bra') ||
            fieldContains(p.name, 'dress') ||
            fieldContains(p.tags, 'dress') ||
            fieldContains(p.name, 'gown') ||
            fieldContains(p.name, 'kurti') ||
            fieldContains(p.tags, 'kurti') ||
            fieldContains(p.tags, 'heels') ||
            fieldContains(p.name, 'heels') ||
            fieldContains(p.tags, 'handbag') ||
            fieldContains(p.name, 'handbag');

          const isExplicitMen =
            isMenField(p.category_name) ||
            isMenField(p.parent_category_name) ||
            isMenField(p.tags) ||
            isMenField(p.name) ||
            isMenField(p.recipient);

          if (isExplicitWomen && !isExplicitMen) {
            matchSection = false;
          } else if (isExplicitMen) {
            matchSection = true;
          } else if (secObj && secObj.items) {
            matchSection = secObj.items.some(item => 
              fieldContains(p.category_name, item.slug) || 
              fieldContains(p.subcategory, item.slug) ||
              fieldContains(p.tags, item.slug) ||
              (item.keywords || []).some(kw => fieldContains(p.name, kw) || fieldContains(p.tags, kw))
            );
          }
        } else if (secSlug === 'women') {
          const isExplicitMen =
            isMenField(p.category_name) ||
            isMenField(p.parent_category_name) ||
            isMenField(p.tags) ||
            isMenField(p.name) ||
            isMenField(p.recipient);

          const isExplicitWomen =
            isWomenField(p.category_name) ||
            isWomenField(p.parent_category_name) ||
            isWomenField(p.tags) ||
            isWomenField(p.name) ||
            isWomenField(p.recipient) ||
            fieldContains(p.name, 'saree') ||
            fieldContains(p.tags, 'saree') ||
            fieldContains(p.name, 'dress') ||
            fieldContains(p.name, 'gown') ||
            fieldContains(p.name, 'kurti') ||
            fieldContains(p.name, 'bra') ||
            fieldContains(p.tags, 'bra') ||
            fieldContains(p.name, 'heels') ||
            fieldContains(p.tags, 'heels') ||
            fieldContains(p.name, 'handbag');

          if (isExplicitMen && !isExplicitWomen) {
            matchSection = false;
          } else if (isExplicitWomen) {
            matchSection = true;
          } else if (secObj && secObj.items) {
            matchSection = secObj.items.some(item => 
              fieldContains(p.category_name, item.slug) || 
              fieldContains(p.subcategory, item.slug) ||
              fieldContains(p.tags, item.slug) ||
              (item.keywords || []).some(kw => fieldContains(p.name, kw) || fieldContains(p.tags, kw))
            );
          }
        } else if (secSlug === 'kids' || secSlug === 'boys-clothing' || secSlug === 'girls-clothing' || secSlug === 'baby-clothes') {
          matchSection = 
            fieldContains(p.category_name, 'kid') ||
            fieldContains(p.parent_category_name, 'kid') ||
            fieldContains(p.tags, 'kid') ||
            fieldContains(p.tags, 'boy') ||
            fieldContains(p.tags, 'girl') ||
            fieldContains(p.tags, 'baby') ||
            fieldContains(p.name, 'kid') ||
            fieldContains(p.name, 'boy') ||
            fieldContains(p.name, 'girl') ||
            fieldContains(p.name, 'baby') ||
            fieldContains(p.name, 'onesie') ||
            fieldContains(p.recipient, 'kid') ||
            fieldContains(p.recipient, 'baby');
        } else if (secSlug === 'unisex') {
          const isExplicitMenOnly = (fieldContains(p.name, "men's") && !fieldContains(p.name, "women's")) || fieldContains(p.recipient, 'him');
          const isExplicitWomenOnly = fieldContains(p.name, 'saree') || fieldContains(p.name, 'bra') || fieldContains(p.name, 'lehenga') || fieldContains(p.name, 'heels') || fieldContains(p.recipient, 'her');
          if (isExplicitMenOnly || isExplicitWomenOnly) {
            matchSection = false;
          } else if (fieldContains(p.tags, 'unisex') || fieldContains(p.name, 'unisex') || fieldContains(p.recipient, 'couples') || fieldContains(p.recipient, 'both')) {
            matchSection = true;
          } else if (secObj && secObj.items) {
            matchSection = secObj.items.some(item => 
              fieldContains(p.category_name, item.slug) || 
              fieldContains(p.subcategory, item.slug) || 
              fieldContains(p.tags, item.slug) || 
              (item.keywords || []).some(kw => fieldContains(p.name, kw) || fieldContains(p.tags, kw))
            );
          }
        } else if (secObj && secObj.items) {
          matchSection = secObj.items.some(item => 
            fieldContains(p.category_name, item.slug) || 
            fieldContains(p.subcategory, item.slug) ||
            fieldContains(p.tags, item.slug) ||
            (item.keywords || []).some(kw => 
              fieldContains(p.name, kw) || 
              fieldContains(p.tags, kw) || 
              fieldContains(p.category_name, kw) ||
              fieldContains(p.description, kw)
            )
          ) || fieldContains(p.tags, secSlug) || fieldContains(p.name, secSlug);
        } else {
          matchSection = fieldContains(p.tags, secSlug) || fieldContains(p.name, secSlug) || fieldContains(p.category_name, secSlug);
        }
      }

      // 2. Match Subcategory
      let matchSubcategory = true;
      if (filterSubcategory !== 'all') {
        const subClean = filterSubcategory.toLowerCase().replace(/[^a-z0-9-]/g, '');
        const subCleanSpaced = subClean.replace(/-/g, ' ');
        matchSubcategory = fieldContains(p.category_name, subClean) || 
                           fieldContains(p.category_name, subCleanSpaced) ||
                           fieldContains(p.tags, subClean) || 
                           fieldContains(p.name, subClean) || 
                           fieldContains(p.name, subCleanSpaced) || 
                           fieldContains(p.description, subClean) ||
                           fieldContains(p.description, subCleanSpaced) ||
                           fieldContains(p.recipient, subClean) ||
                           fieldContains(p.occasion, subClean);
      }

      // 3. Match Price Range
      let matchPrice = true;
      if (priceRange !== 'all') {
        const price = Number(p.price);
        if (priceRange === 'under-1000') {
          matchPrice = price < 1000;
        } else if (priceRange === '1000-3000') {
          matchPrice = price >= 1000 && price <= 3000;
        } else if (priceRange === '3000-7000') {
          matchPrice = price >= 3000 && price <= 7000;
        } else if (priceRange === '7000-15000') {
          matchPrice = price >= 7000 && price <= 15000;
        } else if (priceRange === '15000-25000') {
          matchPrice = price >= 15000 && price <= 25000;
        } else if (priceRange === 'over-25000') {
          matchPrice = price > 25000;
        }
      }

      // 4. Match Special Deal Tags
      let matchDeal = true;
      if (filterDeal !== 'all') {
        const deal = filterDeal.toLowerCase();
        if (deal === 'top deals' || deal === 'wow deals') {
          matchDeal = p.discount_percent >= 15 || p.price < 5000 || fieldContains(p.tags, 'deal');
        } else if (deal === 'sale') {
          matchDeal = Number(p.mrp) > Number(p.price) || p.discount_percent > 0 || fieldContains(p.tags, 'sale') || fieldContains(p.tags, 'deal') || p.product_id % 5 === 0;
        } else if (deal === 'click of the week') {
          matchDeal = Number(p.rating) >= 4.5 || p.sales_count > 3 || p.product_id % 4 === 1;
        } else if (deal === 'new arrivals' || deal === "what's new") {
          matchDeal = p.is_new || fieldContains(p.tags, 'new') || fieldContains(p.tags, 'latest') || p.product_id % 3 === 0;
        } else if (deal === 'best sellers') {
          matchDeal = p.is_bestseller || fieldContains(p.tags, 'best') || fieldContains(p.tags, 'seller') || p.product_id % 2 === 0;
        } else if (deal === 'top rated') {
          matchDeal = Number(p.rating) >= 4.0 || fieldContains(p.tags, 'rated') || true;
        }
      }

      // 5. Match Recipient Filter
      let matchRecipient = true;
      if (filterRecipient !== 'all') {
        const rec = filterRecipient.toLowerCase();
        const pRec = p.recipient?.toLowerCase() || '';
        const pNameDescTags = `${p.name || ''} ${p.description || ''} ${p.tags || ''}`.toLowerCase();
        if (rec === 'him') {
          matchRecipient = pRec.includes('him') || pRec.includes('boyfriend') || pRec.includes('father') || pRec.includes('husband') || pNameDescTags.includes('men') || pNameDescTags.includes('mens');
        } else if (rec === 'her') {
          matchRecipient = pRec.includes('her') || pRec.includes('girlfriend') || pRec.includes('mother') || pRec.includes('sister') || pNameDescTags.includes('women') || pNameDescTags.includes('womens');
        } else if (rec === 'couples') {
          matchRecipient = pRec.includes('couple') || pRec.includes('wedding') || pRec.includes('both');
        } else if (rec === 'kids') {
          matchRecipient = pRec.includes('kid') || pRec.includes('teenager') || pRec.includes('child') || pNameDescTags.includes('kids') || pNameDescTags.includes('toy') || pNameDescTags.includes('teen');
        } else if (rec === 'friends') {
          matchRecipient = pRec.includes('coworker') || pRec.includes('friend') || pNameDescTags.includes('coworker') || pNameDescTags.includes('friend') || pNameDescTags.includes('thank-you') || pNameDescTags.includes('office') || pNameDescTags.includes('stationery');
        } else if (rec === 'self') {
          matchRecipient = pNameDescTags.includes('wellness') || pNameDescTags.includes('diffuser') || pNameDescTags.includes('skincare') || pNameDescTags.includes('fragrance') || pNameDescTags.includes('serum') || pNameDescTags.includes('philosophy') || pNameDescTags.includes('self-care') || pNameDescTags.includes('self');
        }
      }

      // 6. Match Occasion Filter
      let matchOccasion = true;
      if (filterOccasion !== 'all') {
        const occ = filterOccasion.toLowerCase();
        const pOcc = p.occasion?.toLowerCase() || '';
        const pNameDescTags = `${p.name || ''} ${p.description || ''} ${p.tags || ''}`.toLowerCase();
        if (occ === 'birthday') {
          matchOccasion = pOcc.includes('birthday') || pNameDescTags.includes('birthday');
        } else if (occ === 'anniversary') {
          matchOccasion = pOcc.includes('anniversary') || pOcc.includes('wedding') || pNameDescTags.includes('anniversary');
        } else if (occ === 'housewarming') {
          matchOccasion = pOcc.includes('housewarming') || pOcc.includes('decor') || pOcc.includes('home') || pNameDescTags.includes('housewarming') || pNameDescTags.includes('home decor');
        } else if (occ === 'graduation') {
          matchOccasion = pOcc.includes('graduation') || pOcc.includes('promotion') || pNameDescTags.includes('graduation');
        } else if (occ === 'wedding') {
          matchOccasion = pOcc.includes('wedding') || pOcc.includes('marriage') || pOcc.includes('shower') || pNameDescTags.includes('wedding') || pNameDescTags.includes('bride') || pNameDescTags.includes('groom');
        } else if (occ === 'festival') {
          matchOccasion = pOcc.includes('christmas') || pOcc.includes('festival') || pOcc.includes('holiday') || pOcc.includes('diwali') || pNameDescTags.includes('diwali') || pNameDescTags.includes('christmas') || pNameDescTags.includes('holiday') || pNameDescTags.includes('festive') || pNameDescTags.includes('gift box');
        } else if (occ === 'corporate') {
          matchOccasion = pOcc.includes('promotion') || pOcc.includes('corporate') || pOcc.includes('milestone') || pOcc.includes('thank-you') || pNameDescTags.includes('promotion') || pNameDescTags.includes('corporate') || pNameDescTags.includes('coworker') || pNameDescTags.includes('office') || pNameDescTags.includes('work');
        }
      }

      // 7. Match Minimum Rating Filter
      let matchRating = true;
      if (minRating > 0) {
        matchRating = Number(p.rating || 0) >= minRating || Number(p.rating || 0) === 0;
      }

      // 8. Match Brand Filter
      let matchBrand = true;
      if (filterBrand !== 'all') {
        const brand = filterBrand.toLowerCase();
        const pBrand = p.brand?.toLowerCase() || '';
        matchBrand = pBrand.includes(brand) || brand.includes(pBrand);
      }

      // 9. Match Stock Availability Filter
      let matchAvailability = true;
      if (availability === 'instock') {
        matchAvailability = Number(p.stock_quantity || p.stock || 0) > 0;
      }

      // 10. Match Gender Filter
      let matchGender = true;
      if (filterGender !== 'all') {
        const gen = filterGender.toLowerCase();
        const pRec = p.recipient?.toLowerCase() || '';
        const pNameDesc = `${p.name || ''} ${p.description || ''}`.toLowerCase();
        if (gen === 'men') {
          matchGender = pRec.includes('him') || pRec.includes('boyfriend') || pRec.includes('father') || pRec.includes('husband') || pNameDesc.includes('men') || pNameDesc.includes('mens');
        } else if (gen === 'women') {
          matchGender = pRec.includes('her') || pRec.includes('girlfriend') || pRec.includes('mother') || pRec.includes('sister') || pRec.includes('wife') || pNameDesc.includes('women') || pNameDesc.includes('womens');
        }
      }

      // 11. Match Color Filter
      let matchColor = true;
      if (filterColor !== 'all') {
        const col = filterColor.toLowerCase();
        const pCol = p.color?.toLowerCase() || '';
        if (col === 'black') {
          matchColor = pCol.includes('black') || pCol.includes('gray') || pCol.includes('titanium') || pCol.includes('dark') || pCol.includes('slate');
        } else if (col === 'white') {
          matchColor = pCol.includes('white') || pCol.includes('cream') || pCol.includes('linen') || pCol.includes('sand') || pCol.includes('frosted');
        } else if (col === 'brown') {
          matchColor = pCol.includes('brown') || pCol.includes('chestnut') || pCol.includes('clay') || pCol.includes('terracotta') || pCol.includes('oatmeal') || pCol.includes('gold') || pCol.includes('amber');
        } else if (col === 'green') {
          matchColor = pCol.includes('green') || pCol.includes('emerald') || pCol.includes('sage');
        } else if (col === 'blue') {
          matchColor = pCol.includes('blue') || pCol.includes('sapphire');
        }
      }

      // 12. Match Size Filter
      let matchSize = true;
      if (filterSize !== 'all') {
        const sz = filterSize.toLowerCase();
        const pSz = p.size?.toLowerCase() || '';
        if (sz === 'standard') {
          matchSize = pSz.includes('standard') || pSz.includes('one size') || pSz.includes('pack');
        } else if (sz === 'small') {
          matchSize = pSz.includes('50ml') || pSz.includes('100ml') || pSz.includes('200ml') || pSz.includes('6mm') || pSz.includes('small') || pSz === 's';
        } else if (sz === 'medium') {
          matchSize = pSz.includes('600ml') || pSz.includes('750ml') || pSz.includes('medium') || pSz === 'm';
        } else if (sz === 'large') {
          matchSize = pSz.includes('king') || pSz.includes('44mm') || pSz.includes('10') || pSz.includes('luxury') || pSz.includes('large') || pSz === 'l';
        }
      }

      // 13. Match Discount Filter
      let matchDiscount = true;
      if (filterDiscount !== 'all') {
        const pct = Number(p.discount_percent || 0);
        matchDiscount = pct >= Number(filterDiscount);
      }

      // 14. Match Search Query from URL parameter
      let matchSearch = true;
      if (urlSearchQuery) {
        const q = urlSearchQuery.toLowerCase().trim();
        
        const nameMatch = fieldContains(p.name, q);
        const brandMatch = fieldContains(p.brand, q);
        const storeMatch = fieldContains(p.store_name, q) || fieldContains(p.seller_name, q);
        const descMatch = fieldContains(p.description, q);
        const catMatch = fieldContains(p.category_name, q);
        const recipientMatch = fieldContains(p.recipient, q);
        const occasionMatch = fieldContains(p.occasion, q);
        const colorMatch = fieldContains(p.color, q);
        const sizeMatch = fieldContains(p.size, q);
        const tagsMatch = fieldContains(p.tags, q);
        
        matchSearch = nameMatch || brandMatch || storeMatch || descMatch || catMatch || recipientMatch || occasionMatch || colorMatch || sizeMatch || tagsMatch;
      }

      return matchCategory && matchSection && matchSubcategory && matchPrice && matchDeal && matchRecipient && matchOccasion && matchRating && matchBrand && matchAvailability && matchGender && matchColor && matchSize && matchDiscount && matchSearch;
    });

    if (sortBy === 'low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [sellerProducts, filterCategory, filterSection, filterSubcategory, priceRange, filterDeal, sortBy, filterRecipient, filterOccasion, minRating, filterBrand, availability, filterGender, filterColor, filterSize, filterDiscount, urlSearchQuery, location.pathname]);

  // Reset display limit when filters change
  useEffect(() => {
    setDisplayLimit(6);
  }, [filterCategory, filterSection, filterSubcategory, priceRange, filterDeal, sortBy, filterRecipient, filterOccasion, minRating, filterBrand, availability, filterGender, filterColor, filterSize, filterDiscount, urlSearchQuery]);

  const activeFiltersCount = useMemo(() => {
    return [
      filterCategory !== 'all',
      filterSection !== 'all',
      filterSubcategory !== 'all',
      priceRange !== 'all',
      filterDeal !== 'all',
      filterRecipient !== 'all',
      filterOccasion !== 'all',
      minRating > 0,
      filterBrand !== 'all',
      availability !== 'all',
      filterGender !== 'all',
      filterColor !== 'all',
      filterSize !== 'all',
      filterDiscount !== 'all'
    ].filter(Boolean).length;
  }, [filterCategory, filterSection, filterSubcategory, priceRange, filterDeal, filterRecipient, filterOccasion, minRating, filterBrand, availability, filterGender, filterColor, filterSize, filterDiscount]);

  const regularCategories = [
    'all', 'clothing', 'western-wear', 'ethnic-wear', 'footwear', 'winterwear',
    'lingerie-innerwear', 'night-lounge-wear', 'athleisure', 'accessories',
    'gadgets', 'jewellery', 'beauty', 'electronics', 'fashion', 'home-living',
    'kids', 'mens', 'women', 'pooja-items', 'gifts', 'healthy-foods'
  ];
  const categories = regularCategories;
  const dealFilters = ['all', 'top deals', 'new arrivals', 'best sellers', 'top rated'];

  const renderSidebarContent = () => (
    <div className="space-y-8">
      {/* Departments Accordion */}
      <div>
        <button
          onClick={() => toggleSection('departments')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-950 mb-3 border-b border-stone-200/80 pb-2 hover:text-orange-600 transition-colors"
        >
          <span>{t("departments")}</span>
          {openSections.departments ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.departments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden space-y-1 pb-1"
            >
              <div className="space-y-1">
                {categories.map(c => {
                  const label = categoryLabels[c] || c;
                  const sections = categorySections[c] || [];
                  const hasSections = sections.length > 0;
                  const hasSub = (categoryTree[c] && categoryTree[c].length > 0) || hasSections;
                  const isSelected = filterCategory === c;
                  const isOpen = expandedCategories[c];

                  return (
                    <div key={c} className="rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            if (isSelected) {
                              toggleCategoryAccordion(c);
                            } else {
                              handleCategorySelect(c);
                            }
                          }}
                          className={`flex-grow text-left py-1.5 px-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-orange-950 text-white font-bold shadow-2xs'
                              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/70 font-medium'
                          }`}
                        >
                          <span className="truncate">{label}</span>
                          {hasSections && (
                            <span className={`text-[10px] ml-1 flex-shrink-0 ${isSelected ? 'text-orange-200/80' : 'text-stone-400'}`}>
                              {sections.length}
                            </span>
                          )}
                        </button>
                        {hasSub && (
                          <button
                            onClick={() => toggleCategoryAccordion(c)}
                            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors ml-0.5"
                            title="Toggle sections"
                          >
                            {isOpen ? <ChevronDown size={13} className="stroke-[2.2px]" /> : <ChevronRight size={13} className="stroke-[2.2px]" />}
                          </button>
                        )}
                      </div>

                      {/* Sections & Subcategories (Accordion Dropdown) */}
                      <AnimatePresence initial={false}>
                        {hasSub && isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mt-1 mb-2 space-y-1 pl-1 pr-0.5"
                          >
                            {/* "All {Category}" subtle button */}
                            <button
                              onClick={() => handleCategorySelect(c)}
                              className={`w-full text-left py-1 px-2 rounded-md text-[11px] flex items-center justify-between transition-colors ${
                                filterSection === 'all' && isSelected
                                  ? 'text-orange-950 bg-orange-100/70 font-bold'
                                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50 font-medium'
                              }`}
                            >
                              <span>All {label}</span>
                              {filterSection === 'all' && isSelected && <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>}
                            </button>

                            {/* Minimal Section Cards */}
                            {hasSections ? (
                              <div className="space-y-1 pt-0.5">
                                {sections.map(sec => {
                                  const isSecSelected = filterSection === sec.slug && isSelected;
                                  return (
                                    <div key={sec.slug} className="group/sec">
                                      <button
                                        onClick={() => handleSectionSelect(c, sec.slug)}
                                        className={`w-full flex items-center gap-2 p-1.5 rounded-lg text-left transition-all border ${
                                          isSecSelected
                                            ? 'bg-orange-50/80 border-orange-300 text-orange-950 font-semibold'
                                            : 'bg-stone-50/50 hover:bg-stone-100/60 border-stone-200/40 hover:border-stone-300/50 text-stone-700'
                                        }`}
                                      >
                                        <img
                                          src={sec.image}
                                          alt={sec.displayTitle || sec.title}
                                          className="w-8 h-8 rounded-md object-cover flex-shrink-0 border border-stone-200/60"
                                          loading="lazy"
                                        />
                                        <div className="flex-grow min-w-0">
                                          <div className="flex items-center justify-between gap-1">
                                            <span className={`text-xs truncate ${isSecSelected ? 'font-bold text-orange-950' : 'font-medium text-stone-800'}`}>
                                              {sec.displayTitle || sec.title}
                                            </span>
                                            {isSecSelected && (
                                              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0"></span>
                                            )}
                                          </div>
                                          {sec.subtitle && (
                                            <p className="text-[10px] text-stone-400 truncate leading-tight mt-0.5 font-normal">
                                              {sec.subtitle}
                                            </p>
                                          )}
                                        </div>
                                      </button>

                                      {/* Minimal Subcategory Wrap Pills under active section */}
                                      <AnimatePresence initial={false}>
                                        {isSecSelected && sec.items && sec.items.length > 0 && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.18 }}
                                            className="overflow-hidden pl-2 pr-0.5 py-1.5 flex flex-wrap gap-1"
                                          >
                                            <button
                                              onClick={() => handleSubcategorySelect(c, 'all', sec.slug)}
                                              className={`text-[10px] px-2 py-0.5 rounded-full transition-all font-medium ${
                                                filterSubcategory === 'all'
                                                  ? 'bg-orange-950 text-white font-semibold'
                                                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                                              }`}
                                            >
                                              All {sec.displayTitle || sec.title}
                                            </button>
                                            {sec.items.map(item => {
                                              const isSubActive = filterSubcategory === item.slug;
                                              return (
                                                <button
                                                  key={item.slug}
                                                  onClick={() => handleSubcategorySelect(c, item.slug, sec.slug)}
                                                  className={`text-[10px] px-2 py-0.5 rounded-full transition-all font-medium ${
                                                    isSubActive
                                                      ? 'bg-orange-600 text-white font-semibold shadow-2xs'
                                                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                                                  }`}
                                                >
                                                  {item.label}
                                                </button>
                                              );
                                            })}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              /* Fallback minimal subcategory pills if no sections defined */
                              <div className="overflow-hidden pl-1 pr-0.5 py-1 flex flex-wrap gap-1">
                                {categoryTree[c] && categoryTree[c].map(sub => (
                                  <button
                                    key={sub.slug}
                                    onClick={() => handleSubcategorySelect(c, sub.slug)}
                                    className={`text-[10px] px-2 py-0.5 rounded-full transition-all font-medium ${
                                      filterSubcategory === sub.slug && isSelected
                                        ? 'bg-orange-950 text-white font-semibold shadow-2xs'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                                    }`}
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brand Filter */}
      <div>
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("brand") || "Brand"}</span>
          {openSections.brand ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.brand && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-orange-200">
                <label
                  className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={filterBrand === 'all'}
                    onChange={() => setFilterBrand('all')}
                    className="hidden"
                  />
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    filterBrand === 'all'
                      ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                      : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                  }`}>
                    {filterBrand === 'all' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className={filterBrand === 'all' ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-950'}>{t("all_brands")}</span>
                </label>
                
                {uniqueBrands.map(b => (
                  <label
                    key={b}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={filterBrand.toLowerCase() === b.toLowerCase()}
                      onChange={() => setFilterBrand(b)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      filterBrand.toLowerCase() === b.toLowerCase()
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {filterBrand.toLowerCase() === b.toLowerCase() && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={filterBrand.toLowerCase() === b.toLowerCase() ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-950'}>{b}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gender Filter */}
      <div>
        <button
          onClick={() => toggleSection('gender')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("gender")}</span>
          {openSections.gender ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.gender && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5">
                {[
                  { id: 'all', label: t('all_genders') },
                  { id: 'men', label: t('men') },
                  { id: 'women', label: t('women') }
                ].map(g => (
                  <label
                    key={g.id}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={filterGender === g.id}
                      onChange={() => setFilterGender(g.id)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      filterGender === g.id
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {filterGender === g.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={filterGender === g.id ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-950'}>{g.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recipient Filter */}
      <div>
        <button
          onClick={() => toggleSection('recipient')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("recipient_filter")}</span>
          {openSections.recipient ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.recipient && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5">
                {[
                  { id: 'all', label: t('all_recipients') },
                  { id: 'him', label: t('for_him') },
                  { id: 'her', label: t('for_her') },
                  { id: 'couples', label: t('couples_both') },
                  { id: 'kids', label: t('for_kids_teens') },
                  { id: 'friends', label: t('for_friends_coworkers') },
                  { id: 'self', label: t('self_care') }
                ].map(r => (
                  <label
                    key={r.id}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-950 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="recipient"
                      checked={filterRecipient === r.id}
                      onChange={() => setFilterRecipient(r.id)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      filterRecipient === r.id
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {filterRecipient === r.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={filterRecipient === r.id ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-955'}>{r.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Occasion Filter */}
      <div>
        <button
          onClick={() => toggleSection('occasion')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("occasion")}</span>
          {openSections.occasion ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.occasion && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5">
                {[
                  { id: 'all', label: t('all_occasions') },
                  { id: 'birthday', label: t('birthdays') },
                  { id: 'anniversary', label: t('anniversaries') },
                  { id: 'housewarming', label: t('housewarming') },
                  { id: 'graduation', label: t('graduation') },
                  { id: 'wedding', label: t('weddings_bridal') },
                  { id: 'festival', label: t('festivals_holidays') },
                  { id: 'corporate', label: t('corporate_milestones') }
                ].map(o => (
                  <label
                    key={o.id}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="occasion"
                      checked={filterOccasion === o.id}
                      onChange={() => setFilterOccasion(o.id)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      filterOccasion === o.id
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {filterOccasion === o.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={filterOccasion === o.id ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-955'}>{o.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Color Palette Selector */}
      <div>
        <button
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("color_family")}</span>
          {openSections.color ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.color && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pb-2"
            >
              <div className="flex flex-wrap gap-2.5 pt-1">
                {[
                  { id: 'all', name: t('all_colors'), colorClass: 'bg-gradient-to-tr from-red-400 via-orange-300 via-emerald-400 to-indigo-500', borderClass: 'border-orange-200' },
                  { id: 'black', name: t('color_black'), colorClass: 'bg-neutral-900', borderClass: 'border-neutral-900' },
                  { id: 'white', name: t('color_white'), colorClass: 'bg-neutral-50 border border-neutral-200', borderClass: 'border-neutral-300' },
                  { id: 'brown', name: t('color_brown'), colorClass: 'bg-amber-800', borderClass: 'border-amber-800' },
                  { id: 'green', name: t('color_green'), colorClass: 'bg-emerald-700', borderClass: 'border-emerald-750' },
                  { id: 'blue', name: t('color_blue'), colorClass: 'bg-blue-900', borderClass: 'border-blue-900' }
                ].map(c => {
                  const isSelected = filterColor === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFilterColor(c.id)}
                      title={t(c.id === 'all' ? 'all_colors' : 'color_' + c.id)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 ${
                        isSelected 
                          ? 'ring-2 ring-orange-950 ring-offset-2 scale-105 shadow-md' 
                          : 'hover:ring-1 hover:ring-orange-300 hover:ring-offset-1'
                      }`}
                    >
                      <div className={`w-full h-full rounded-full ${c.colorClass}`} />
                      {isSelected && (
                        <div className={`absolute inset-0 flex items-center justify-center ${c.id === 'white' ? 'text-neutral-950' : 'text-white'}`}>
                          <Check size={12} strokeWidth={4.5} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Size Options */}
      {filterCategory === 'fashion' && (
        <div>
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
          >
            <span>Size Bracket</span>
            {openSections.size ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          <AnimatePresence initial={false}>
            {openSections.size && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden pb-2"
              >
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { id: 'all', label: 'All Sizes' },
                    { id: 'standard', label: 'Standard / One-Size' },
                    { id: 'small', label: 'Small / Travel' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'large', label: 'Large / Luxury' }
                  ].map(s => {
                    const isSelected = filterSize === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setFilterSize(s.id)}
                        className={`px-3 py-2 rounded-xl text-[10px] uppercase tracking-wider font-extrabold transition-all border ${
                          isSelected
                            ? 'bg-orange-950 text-white border-orange-950 shadow-sm'
                            : 'bg-white text-orange-700 border-orange-150 hover:border-orange-300'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Price Ranges */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("price_budget")}</span>
          {openSections.price ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5">
                {[
                  { id: 'all', label: t('any_price') },
                  { id: 'under-1000', label: t('under_price', { price: formatPrice(1000) }) },
                  { id: '1000-3000', label: t('price_range', { min: formatPrice(1000), max: formatPrice(3000) }) },
                  { id: '3000-7000', label: t('price_range', { min: formatPrice(3000), max: formatPrice(7000) }) },
                  { id: '7000-15000', label: t('price_range', { min: formatPrice(7000), max: formatPrice(15000) }) },
                  { id: '15000-25000', label: t('price_range', { min: formatPrice(15000), max: formatPrice(25000) }) },
                  { id: 'over-25000', label: t('over_price', { price: formatPrice(25000) }) }
                ].map(r => (
                  <label
                    key={r.id}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === r.id}
                      onChange={() => setPriceRange(r.id)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      priceRange === r.id
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {priceRange === r.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={priceRange === r.id ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-950'}>{r.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stock Availability */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("availability")}</span>
          {openSections.availability ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.availability && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5">
                {[
                  { id: 'all', label: t("explore_products") || 'Show All Listings' },
                  { id: 'instock', label: `${t("in_stock")} Only` }
                ].map(a => (
                  <label
                    key={a.id}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === a.id}
                      onChange={() => setAvailability(a.id)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      availability === a.id
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {availability === a.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={availability === a.id ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-950'}>{a.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimum Rating */}
      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("min_rating")}</span>
          {openSections.rating ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.rating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5">
                {[
                  { id: 0, label: t('all_reviews') },
                  { id: 3, label: t('stars_and_up', { rating: '3.0' }) },
                  { id: 4, label: t('stars_and_up', { rating: '4.0' }) },
                  { id: 4.5, label: t('stars_and_up', { rating: '4.5' }) },
                  { id: 4.8, label: t('stars_and_up', { rating: '4.8' }) }
                ].map(r => (
                  <label
                    key={r.id}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r.id}
                      onChange={() => setMinRating(r.id)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      minRating === r.id
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {minRating === r.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={`flex items-center gap-1.5 ${minRating === r.id ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-955'}`}>
                      {r.label}
                      {r.id > 0 && <Star size={12} className="fill-orange-500 text-orange-500" />}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Discount Tiers */}
      <div>
        <button
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("min_discount")}</span>
          {openSections.discount ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.discount && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2.5 pb-2"
            >
              <div className="space-y-2.5">
                {[
                  { id: 'all', label: t('all_items_no_min') },
                  { id: '10', label: t('off_or_more', { percent: '10' }) },
                  { id: '20', label: t('off_or_more', { percent: '20' }) },
                  { id: '30', label: t('off_or_more', { percent: '30' }) },
                  { id: '40', label: t('off_or_more', { percent: '40' }) }
                ].map(d => (
                  <label
                    key={d.id}
                    className="flex items-center gap-3 text-[13px] font-medium text-orange-850 hover:text-orange-955 cursor-pointer select-none group transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="discount"
                      checked={filterDiscount === d.id}
                      onChange={() => setFilterDiscount(d.id)}
                      className="hidden"
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      filterDiscount === d.id
                        ? 'border-orange-950 bg-orange-950 text-white shadow-sm ring-2 ring-orange-200/50'
                        : 'border-orange-200 bg-white group-hover:border-orange-400 group-hover:bg-orange-50/20'
                    }`}>
                      {filterDiscount === d.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={`flex items-center gap-1.5 ${filterDiscount === d.id ? 'text-orange-955 font-extrabold font-sans' : 'text-orange-700/90 font-medium group-hover:text-orange-955'}`}>
                      {d.label}
                      {d.id !== 'all' && <Tag size={12} className="text-orange-500" />}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Deal Filters (Multiple Choice) */}
      <div>
        <button
          onClick={() => toggleSection('deals')}
          className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-orange-955 mb-3.5 border-b border-orange-100 pb-2.5 hover:text-orange-600 transition-colors"
        >
          <span>{t("featured_deals")}</span>
          {openSections.deals ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {openSections.deals && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pb-2"
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {dealFilters.map(d => {
                  let dealLabel = d;
                  if (d === 'all') dealLabel = t("all");
                  else if (d === 'top deals') dealLabel = t("wow_deals");
                  else if (d === 'new arrivals') dealLabel = t("whats_new");
                  else if (d === 'best sellers') dealLabel = t("best_sellers");
                  else if (d === 'top rated') dealLabel = t("trending") || "Top Rated";

                  return (
                    <button
                      key={d}
                      onClick={() => setFilterDeal(d)}
                      className={`px-3.5 py-2 rounded-full text-[10px] uppercase tracking-wider font-extrabold transition-all border-2 ${
                        filterDeal === d
                          ? 'bg-orange-900 text-white border-orange-900 shadow-sm'
                          : 'bg-white text-orange-500 border-orange-100 hover:border-orange-300'
                      }`}
                    >
                      {dealLabel}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reset Filter Button */}
      <button
        onClick={handleClearFilters}
        className="w-full py-3.5 border-2 border-dashed border-orange-200 hover:border-orange-400 text-orange-700 hover:text-orange-955 hover:bg-orange-50/30 text-xs uppercase tracking-widest font-black rounded-2xl flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm animate-pulse-subtle"
      >
        <RotateCcw size={14} className="stroke-[2.5px]" />
        {t("reset_filters")}
      </button>
    </div>
  );

  if (loading && sellerProducts.length === 0) {
    return (
      <div className="py-40 flex flex-col items-center justify-center text-orange-300">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Synchronizing Boutique Catalog...</p>
      </div>
    );
  }

  return (
    <section id="product-grid" className="py-14 bg-[#fdfbf9]">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-orange-100/70 pb-8 mb-10">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-orange-900 mb-2">{t("featured_deals") || "Catalog Showcase"}</h2>
            <p className="text-orange-500 text-sm font-normal">{t("explore_all_products") || "Discover handpicked premium products."}</p>
          </div>

          {/* Desktop Toolbar Elements */}
          <div className="flex items-center gap-4">
            {/* Active filters pill box overview */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="hidden lg:flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-orange-500 border border-orange-200 px-3 py-1.5 rounded-full hover:border-orange-500 hover:text-orange-900 transition-all cursor-pointer"
              >
                {t("reset_filters")} ({activeFiltersCount})
              </button>
            )}

            {/* Sorting Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-orange-200 rounded-xl px-4 py-2.5 text-xs font-bold text-orange-700 focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm"
            >
              <option value="featured">{t("featured")}</option>
              <option value="low">{t("price_low_high")}</option>
              <option value="high">{t("price_high_low")}</option>
            </select>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden flex items-center gap-2 bg-orange-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              {t("filter_by")}
            </button>
          </div>
        </div>

        {/* Active Filters Row */}
        {activeFiltersList.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-orange-50/40 p-4 border border-orange-100/50 rounded-2xl w-full">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-955 mr-2 flex items-center gap-1.5">
              <Filter size={12} className="text-orange-600" /> {t("active_filters")}:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {activeFiltersList.map((pill) => (
                <span
                  key={pill.id}
                  className="flex items-center gap-1.5 bg-white border border-orange-200 text-orange-955 text-[10px] font-bold uppercase tracking-wider pl-3.5 pr-2 py-1.5 rounded-full hover:border-orange-500 hover:text-orange-900 transition-all shadow-sm"
                >
                  {pill.label}
                  <button
                    onClick={pill.clear}
                    className="hover:bg-orange-100 p-0.5 rounded-full text-orange-400 hover:text-orange-850 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <X size={10} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
              <button
                onClick={handleClearFilters}
                className="text-[9px] uppercase tracking-widest font-black text-orange-600 hover:text-orange-955 hover:underline px-3 py-1 cursor-pointer transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Full-Width Products Showcase */}
        <div className="w-full">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
                <AnimatePresence mode='popLayout'>
                  {filteredProducts.slice(0, displayLimit).map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={product.product_id || product.id}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length > displayLimit && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setDisplayLimit(prev => prev + 15)}
                    className="px-8 py-3.5 bg-orange-950 hover:bg-orange-900 text-white text-xs uppercase tracking-widest font-extrabold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Load More Products</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center bg-white border border-orange-100/50 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
              <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <SlidersHorizontal size={24} className="stroke-[1.5] animate-pulse-subtle" />
              </div>
              <p className="text-orange-955 text-sm uppercase tracking-wider font-extrabold block mb-3">
                {urlSearchQuery ? `No matches for "${urlSearchQuery}"` : 'No Products Match Selected Filters'}
              </p>
              <p className="text-orange-500/80 text-xs font-light max-w-sm mx-auto mb-8 leading-relaxed">
                {urlSearchQuery 
                  ? "We couldn't find any items matching your search query. Please double-check spelling, try more general keywords, or reset the catalog search."
                  : "No boutique items match your current selection. Reset the filters to browse all pieces."}
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-900 hover:bg-orange-955 text-white text-xs uppercase tracking-widest font-black rounded-xl transition-all shadow-md active:scale-95 cursor-pointer group"
              >
                <RotateCcw size={12} className="stroke-[2.5px] group-hover:rotate-180 transition-transform duration-500" />
                {urlSearchQuery ? 'Reset Search & Filters' : 'Clear All Filters'}
              </button>
            </div>
          )}
        </div>

        {/* 3. Mobile Sheet Filter Drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-orange-950/40 z-50 md:hidden"
              />
              {/* Bottom Sheet Slider */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-2xl z-50 p-6 overflow-y-auto no-scrollbar md:hidden border-t border-orange-100"
              >
                {/* Horizontal notch */}
                <div className="w-12 h-1 bg-orange-100 rounded-full mx-auto mb-5" />
                
                {/* Modal Title Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={14} className="text-orange-900" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-orange-950">Filters & Refinements</h3>
                  </div>
                  <button 
                    onClick={() => setMobileSidebarOpen(false)} 
                    className="text-xs font-black uppercase tracking-widest text-orange-400 hover:text-orange-950 transition-colors"
                  >
                    Done
                  </button>
                </div>

                {/* Sidebar controls */}
                <div className="pb-8">
                  {renderSidebarContent()}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ProductGrid;
