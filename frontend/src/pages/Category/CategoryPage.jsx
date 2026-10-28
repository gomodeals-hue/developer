import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams, useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, RotateCcw, ArrowLeft, Star, ChevronDown, ChevronRight,
  SlidersHorizontal, Check, X, Search, ChevronLeft,
  Layers, AlertCircle, Laptop, Shirt, Home, BookOpen, Flower2, Dumbbell, Filter,
  Tag, CheckSquare, Square, ArrowRight, Sparkles
} from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import CategoryHeroBanner from '../../components/sections/Category/CategoryHeroBanner';
import { ProductContext } from '../../context/ProductContext/ProductContext';
import { useShop } from '../../context/ShopContext';
import { categoryService, MAIN_CATEGORIES } from '../../services/categoryService';
import { productService } from '../../services/productService';
import { categorySections, categorySubcategories as defaultCatSubs, departmentMegaMenu, SAREE_SUBCATEGORIES } from '../../data/categories';
import { findRespectiveCategoryMatch, buildSearchNavigationUrl } from '../../utils/categorySearchMatcher.js';

// Shirt specifications standard dictionary modeled after Ajio
const SHIRT_SPECIFICATIONS = {
  fabrics: [
    '100% Pure Cotton',
    'Linen & Cotton Blend',
    'Pure Linen',
    'Oxford Cotton',
    'Cotton Twill',
    'Poplin Cotton',
    'Denim',
    'Viscose Rayon Blend',
    'Satin Finish Blend'
  ],
  fits: [
    'Slim Fit',
    'Regular Fit',
    'Relaxed Fit',
    'Boxy Fit'
  ],
  collars: [
    'Button-Down Collar',
    'Spread Collar',
    'Mandarin / Band Collar',
    'Cuban / Camp Collar',
    'Cutaway Collar'
  ],
  sleeves: [
    'Full Sleeves',
    'Half Sleeves',
    'Roll-Up Sleeves'
  ],
  patterns: [
    'Embroidered',
    'Solid',
    'Striped',
    'Checked',
    'Printed'
  ],
  occasions: [
    'Casual',
    'Work / Formal',
    'Vacation / Resort',
    'Party / Evening',
    'Universal / Streetwear'
  ],
  colors: [
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Navy Blue', hex: '#1B2A4A' },
    { name: 'Sky Blue', hex: '#87CEEB' },
    { name: 'Black', hex: '#111111' },
    { name: 'Sage Green', hex: '#9CAF88' },
    { name: 'Olive', hex: '#556B2F' },
    { name: 'Beige', hex: '#D2B48C' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Rust Brown', hex: '#B7410E' }
  ],
  sizes: ['S', 'M', 'L', 'XL', '2XL']
};

const PRICE_TIERS = [
  { id: 'under-500', label: 'Below ₹500', min: 0, max: 499 },
  { id: '500-1000', label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { id: '1001-1500', label: '₹1,001 – ₹1,500', min: 1001, max: 1500 },
  { id: '1501-2000', label: '₹1,501 – ₹2,000', min: 1501, max: 2000 },
  { id: '2001-2500', label: '₹2,001 – ₹2,500', min: 2001, max: 2500 },
  { id: 'over-2500', label: 'Above ₹2,500', min: 2501, max: Infinity }
];

const toSafeLower = (val) => {
  if (!val) return '';
  if (Array.isArray(val)) return val.join(' ').toLowerCase();
  return String(val).toLowerCase();
};

const normalizeSlug = (value) => toSafeLower(value).trim().replace(/_/g, '-').replace(/\s+/g, '-');
const compactSlug = (value) => normalizeSlug(value).replace(/[^a-z0-9]/g, '');
const titleCase = (value) => String(value || '')
  .replace(/[-_]+/g, ' ')
  .split(' ')
  .filter(Boolean)
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');

const COLOR_LIBRARY = {
  white: { name: 'White', hex: '#FFFFFF', border: true },
  black: { name: 'Black', hex: '#111111' },
  navy: { name: 'Navy', hex: '#1B2A4A' },
  blue: { name: 'Blue', hex: '#2563EB' },
  'sky blue': { name: 'Sky Blue', hex: '#87CEEB' },
  red: { name: 'Red', hex: '#DC2626' },
  pink: { name: 'Pink', hex: '#EC4899' },
  green: { name: 'Green', hex: '#16A34A' },
  olive: { name: 'Olive', hex: '#556B2F' },
  beige: { name: 'Beige', hex: '#D2B48C', border: true },
  brown: { name: 'Brown', hex: '#8B4513' },
  grey: { name: 'Grey', hex: '#6B7280' },
  gray: { name: 'Grey', hex: '#6B7280' },
  silver: { name: 'Silver', hex: '#C0C0C0', border: true },
  gold: { name: 'Gold', hex: '#D4AF37' },
  orange: { name: 'Orange', hex: '#F97316' },
  yellow: { name: 'Yellow', hex: '#FACC15', border: true },
  purple: { name: 'Purple', hex: '#7C3AED' }
};

const getColorMeta = (value) => {
  const key = toSafeLower(value).replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
  return COLOR_LIBRARY[key] || { name: titleCase(value), hex: '#E7E5E4', border: true };
};

const CATEGORY_ALIAS_GROUPS = {
  clothing: ['clothing', 'apparel', 'fashion'],
  'western-wear': ['western-wear', 'westernwear'],
  'ethnic-wear': ['ethnic-wear', 'ethnic', 'ethnicwear'],
  footwear: ['footwear', 'footwears', 'shoes'],
  accessories: ['accessories', 'accessory'],
  gadgets: ['gadgets', 'electronics', 'electronic', 'audio'],
  electronics: ['gadgets', 'electronics', 'electronic', 'audio'],
  'home-living': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'home-kitchen': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'pooja-items': ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  pooja: ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  'grocery-items': ['grocery', 'groceries', 'grocery-items'],
  grocery: ['grocery', 'groceries', 'grocery-items'],
  groceries: ['grocery', 'groceries', 'grocery-items'],
  'pet-accessories': ['pet-accessories', 'pet', 'pets', 'pet-supplies'],
  pet: ['pet-accessories', 'pet', 'pets', 'pet-supplies'],
  pets: ['pet-accessories', 'pet', 'pets', 'pet-supplies'],
  'healthy-foods': ['healthy-foods', 'healthy-food'],
  stationary: ['stationary', 'stationery', 'books'],
  stationery: ['stationary', 'stationery', 'books'],
  jewellery: ['jewellery', 'jewelry'],
  jewelry: ['jewellery', 'jewelry'],
  beauty: ['beauty', 'cosmetics', 'grooming', 'skincare'],
  gifts: ['gifts', 'gift', 'gift-sets', 'hampers'],
  kids: ['kids', 'kid', 'baby', 'boys-clothing', 'girls-clothing']
};

const categoryAliasesFor = (category) => {
  const normalized = normalizeSlug(category);
  return CATEGORY_ALIAS_GROUPS[normalized] || [normalized];
};

const productMatchesCategory = (product, category) => {
  if (!category || category === 'all') return true;
  const aliases = categoryAliasesFor(category);
  const pCat = normalizeSlug(product.category);
  const pCatName = normalizeSlug(product.category_name);
  const pDept = normalizeSlug(product.department);
  const pSub = normalizeSlug(product.subcategory);

  return aliases.some(alias => {
    const normalizedAlias = normalizeSlug(alias);
    return pCat === normalizedAlias || pCatName === normalizedAlias || pDept === normalizedAlias || pSub === normalizedAlias;
  });
};

const productMatchesSection = (product, section) => {
  if (!section || section === 'all') return true;
  const cleanSection = normalizeSlug(section);
  if (['men', 'women', 'kids', 'boys', 'girls'].includes(cleanSection)) return null;

  const sectionText = [
    product.section,
    product.department,
    product.category,
    product.category_name,
    product.subcategory,
    product.childCategory,
    product.child_category,
    product.tags,
    product.name
  ].filter(Boolean).map(toSafeLower).join(' ');

  return sectionText.includes(cleanSection)
    || sectionText.includes(cleanSection.replace(/-/g, ' '))
    || sectionText.replace(/[^a-z0-9]/g, '').includes(compactSlug(cleanSection));
};

const isExplicitKidsItem = (p) => {
  if (!p) return false;
  const pGender = (p.gender || '').toString().toLowerCase();
  const pSection = (p.section || '').toString().toLowerCase();
  const pDept = (p.department || '').toString().toLowerCase();
  const pCat = (p.category || p.category_name || '').toString().toLowerCase();
  const pSub = (p.subcategory || '').toString().toLowerCase();
  const pTags = toSafeLower(p.tags);
  const pName = (p.name || '').toString().toLowerCase();
  const pBrand = (p.brand || '').toString().toLowerCase();

  if (pSection === 'kids' || pDept === 'kids' || pDept.includes('kid') || pGender === 'kids' || pGender === 'boys' || pGender === 'girls' || pCat === 'kids') return true;
  if (pSub === 'ethnic-sets' || pSub === 'dresses-frocks' || pSub === 'tops-skirts' || pSub === 'shirts-tshirts' || pSub === 'jeans-shorts' || pSub === 'baby-clothes') return true;
  if (pBrand.includes('junior') || pBrand.includes('mumkins') || pBrand.includes('angel spark') || pBrand.includes('urban kids') || pBrand.includes('hopscotch') || pBrand.includes('max kids') || pBrand.includes('firstcry')) return true;
  if (/\b(kids|kid|child|children|infant|toddler|baby|boy|boys|girl|girls|frock|frocks|onesie|onesies|romper|rompers)\b/i.test(pName)) return true;
  if (/\b(kids|baby|toddler|infant)\b/i.test(pTags)) return true;
  return false;
};

const isExplicitWomanItem = (p) => {
  if (isExplicitKidsItem(p)) return false;
  const pGender = (p.gender || '').toString().toLowerCase();
  const pSection = (p.section || '').toString().toLowerCase();
  const pCat = (p.category || p.category_name || '').toString().toLowerCase();
  const pSub = (p.subcategory || '').toString().toLowerCase();
  const pName = (p.name || '').toString().toLowerCase();
  const pTags = toSafeLower(p.tags);
  const pDesc = (p.description || '').toString().toLowerCase();
  const allText = `${pName} ${pCat} ${pSub} ${pTags} ${pDesc}`;

  if (pGender === 'women' || pGender === 'female' || pSection === 'women') return true;
  const womanPattern = /\b(women|womens|women's|woman|ladies|lady|saree|sari|kurti|kurtis|lehenga|lehengas|blouse|dupatta|anarkali|salwar|churidar|heels|stiletto|stilettos|bra|lingerie|nighty|nightie|palazzo|skirt|skirts|handbag|clutch|mangalsutra|earring|earrings|lipstick|kajal|mascara)\b/i;
  if (womanPattern.test(allText)) return true;
  if (/\bdress\b/i.test(allText) && !/\b(dress shirt|dress pants|dressing)\b/i.test(allText)) return true;
  return false;
};

const isExplicitManItem = (p) => {
  if (isExplicitKidsItem(p)) return false;
  const pGender = (p.gender || '').toString().toLowerCase();
  const pSection = (p.section || '').toString().toLowerCase();
  const pCat = (p.category || p.category_name || '').toString().toLowerCase();
  const pSub = (p.subcategory || '').toString().toLowerCase();
  const pName = (p.name || '').toString().toLowerCase();
  const pTags = toSafeLower(p.tags);
  const pDesc = (p.description || '').toString().toLowerCase();
  const allText = `${pName} ${pCat} ${pSub} ${pTags} ${pDesc}`;

  if (pGender === 'men' || pGender === 'male' || pSection === 'men') return true;
  const manPattern = /\b(men|mens|men's|man|gent|gents|gentlemen|gentleman)\b/i;
  return manPattern.test(allText);
};

const SUBCAT_TO_CATEGORY = {
  'casual-shoes': 'footwear',
  'formal-shoes': 'footwear',
  'sandals': 'footwear',
  'floaters': 'footwear',
  'kids-shoes': 'footwear',
  'kids-casual-shoes': 'footwear',
  'kids-sandals': 'footwear',
  'kids-sandals-slippers': 'footwear',
  'kids-footwear': 'footwear',
  'flats': 'footwear',
  'heels': 'footwear',
  'wedges': 'footwear',
  'slides': 'footwear',
  'flip-flops-slippers': 'footwear',
  'flat-sandals': 'footwear',
  'sneakers': 'footwear',
  'sports-shoes': 'footwear',
  'loafers': 'footwear',
  'boots': 'footwear',
  'shirts': 'clothing',
  't-shirts': 'clothing',
  'tshirts': 'clothing',
  'polos': 'clothing',
  'jeans-trousers': 'clothing',
  'jeans-jeggings': 'clothing',
  'trousers-pants': 'clothing',
  'track-pants': 'clothing',
  'jackets': 'clothing',
  'dresses': 'clothing',
  'tops': 'clothing',
  'leggings': 'clothing',
  'co-ord-sets': 'clothing',
  'dresses-frocks': 'clothing',
  'tops-skirts': 'clothing',
  'shirts-tshirts': 'clothing',
  'jeans-shorts': 'clothing',
  'baby-clothes': 'clothing',
  'kurtas': 'ethnic-wear',
  'sarees': 'ethnic-wear',
  'blouses': 'ethnic-wear',
  'kurta-suit-sets': 'ethnic-wear',
  'ethnic-sets': 'ethnic-wear',
  'wallets': 'accessories',
  'belts': 'accessories',
  'handbags': 'accessories',
  'watches': 'accessories',
  'jewellery': 'jewellery',
  'jewelry': 'jewellery',
  'dog-collars-leashes': 'pet-accessories',
  'collars-leashes': 'pet-accessories',
  'dog-food': 'pet-accessories',
  'dog-treats': 'pet-accessories',
  'dog-toys': 'pet-accessories',
  'dog-beds': 'pet-accessories',
  'cat-food': 'pet-accessories',
  'cat-litter': 'pet-accessories',
  'cat-scratchers': 'pet-accessories',
  'cat-toys': 'pet-accessories',
  'cat-collars': 'pet-accessories',
  'pet-shampoo': 'pet-accessories',
  'pet-brushes': 'pet-accessories',
  'nail-clippers': 'pet-accessories',
  'pet-bowls': 'pet-accessories',
  'birds-fish-supplies': 'pet-accessories'
};

const CategoryPage = () => {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products: sellerProducts, fetchProducts: fetchSellerProducts, loading } = useContext(ProductContext);
  const { formatPrice, t } = useShop();

  const [initialLoading, setInitialLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);

  // Determine initial values from URL
  const isDirectShirtRoute = type === 'men-shirts' || type === 'shirts';
  const isGenderSection = ['men', 'women', 'kids', 'boys', 'girls'].includes(type?.toLowerCase());
  const urlCategoryParam = searchParams.get('category');
  const urlSubcatParam = searchParams.get('subcategory');
  const mappedCatFromSub = urlSubcatParam ? SUBCAT_TO_CATEGORY[urlSubcatParam] : null;
  const isFootwearSubcat = mappedCatFromSub === 'footwear';
  let urlCategory = isDirectShirtRoute 
    ? 'clothing' 
    : (urlCategoryParam || mappedCatFromSub || (isGenderSection ? (urlSubcatParam ? 'clothing' : 'all') : (type && type !== 'all' && type !== 'products' ? type : 'all')));
  const urlSearch = searchParams.get('search') || '';
  let urlSubcat = isDirectShirtRoute 
    ? 'shirts' 
    : (urlSubcatParam || 'all');
  const urlGenderParam = (searchParams.get('gender') || '').toLowerCase();
  let urlSection = isDirectShirtRoute 
    ? 'men' 
    : ['boys', 'girls'].includes(urlGenderParam)
    ? urlGenderParam
    : isGenderSection
    ? type.toLowerCase()
    : (searchParams.get('section') || (searchParams.get('department') || 'all'));
  const urlDeal = searchParams.get('deal') || 'all';

  // If user searched for products and category is 'all' or missing, automatically resolve the respective category match
  if ((!urlCategory || urlCategory === 'all') && urlSearch && urlSearch.trim()) {
    const autoMatch = findRespectiveCategoryMatch(urlSearch);
    if (autoMatch?.categorySlug) {
      urlCategory = autoMatch.categorySlug;
      if (autoMatch.subcategory && (!urlSubcat || urlSubcat === 'all')) {
        urlSubcat = autoMatch.subcategory;
      }
      if (autoMatch.section && (!urlSection || urlSection === 'all')) {
        urlSection = autoMatch.section;
      }
    }
  }

  const sareeSubcatSlugs = [
    'silk-sarees', 'kanjivaram-sarees', 'banarasi-sarees', 'cotton-sarees',
    'bridal-sarees', 'party-wear-sarees', 'wedding-sarees', 'festive-wear-sarees',
    'daily-wear-sarees', 'lightweight-sarees', 'handloom-sarees'
  ];
  let urlChild = searchParams.get('childCategory') || searchParams.get('child') || searchParams.get('sareeType') || 'all';

  if (sareeSubcatSlugs.includes(urlSubcat)) {
    urlChild = urlSubcat;
    urlSubcat = 'sarees';
    if (!urlSection || urlSection === 'all') urlSection = 'women';
  }

  // Active Core Filters
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedSubcategory, setSelectedSubcategory] = useState(urlSubcat);
  const [selectedChildCategory, setSelectedChildCategory] = useState(urlChild);
  const [selectedSection, setSelectedSection] = useState(urlSection);
  const [selectedPriceTiers, setSelectedPriceTiers] = useState([]);
  const [customMinPrice, setCustomMinPrice] = useState('');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [filterType, setFilterType] = useState(urlDeal !== 'all' ? urlDeal : 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Shirt-specific specifications filters (Ajio style)
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedFits, setSelectedFits] = useState([]);
  const [selectedCollars, setSelectedCollars] = useState([]);
  const [selectedSleeves, setSelectedSleeves] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Accordion open/close states in left sidebar - minimal & fast accessible
  const [openSections, setOpenSections] = useState({
    subcategories: true,
    sareeStyles: true,
    facet: true,
    price: true,
    brands: false,
    ratingDeals: true
  });

  const toggleAccordion = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Detect whether the current view is Men's Shirts (or Shirts generally)
  const isShirtsPage = useMemo(() => {
    if (isDirectShirtRoute) return true;
    const sub = (selectedSubcategory || '').toLowerCase();
    const sec = (selectedSection || '').toLowerCase();
    return sub === 'shirts' || sub === 'shirt';
  }, [isDirectShirtRoute, selectedSubcategory, selectedSection]);

  // Detect whether the current view is Clothing / Apparel
  const isClothingPage = useMemo(() => {
    if (isDirectShirtRoute || isShirtsPage) return true;
    const cat = (selectedCategory || type || '').toLowerCase();
    const sub = (selectedSubcategory || '').toLowerCase();
    
    // Strict non-clothing blacklist (Shoes, Pooja, Electronics, Home, Beauty, etc.)
    if (
      cat.includes('pooja') || cat.includes('puja') || cat.includes('shoe') || 
      cat.includes('footwear') || cat.includes('electronic') || cat.includes('gadget') || 
      cat.includes('home') || cat.includes('kitchen') || cat.includes('beauty') || 
      cat.includes('grocery') || cat.includes('toy') || cat.includes('book') || 
      cat.includes('decor') || sub.includes('pooja') || sub.includes('shoe') || 
      sub.includes('footwear') || sub.includes('electronic') || sub.includes('gadget') || 
      sub.includes('kitchen')
    ) {
      return false;
    }

    const clothingKeywords = ['clothing', 'apparel', 'fashion', 'shirt', 'pant', 'jeans', 'kurta', 'dress', 'top', 'trousers', 'ethnic', 'jacket', 'suit', 'blazer', 'hoodie', 'sweater', 'men-shirts'];
    return clothingKeywords.some(kw => cat.includes(kw) || sub.includes(kw)) || ['men', 'women', 'kids'].includes(selectedSection?.toLowerCase());
  }, [isDirectShirtRoute, isShirtsPage, selectedCategory, type, selectedSubcategory, selectedSection]);

  const isMenCategory = useMemo(() => {
    if (type === 'men-shirts') return true;
    const sec = (selectedSection || '').toLowerCase();
    return sec === 'men' || sec === 'mens';
  }, [type, selectedSection]);

  // Scroll tracking for Top-to-Left-Sidebar Morphing Interaction
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic subcategories available for current view with counts
  const dynamicSubcategories = useMemo(() => {
    const counts = {};
    const labels = {};
    (sellerProducts || []).forEach(p => {
      if (selectedSection && selectedSection !== 'all') {
        const pSec = (p.section || '').toLowerCase();
        const pGen = (p.gender || '').toLowerCase();
        if (selectedSection === 'women' && isExplicitKidsItem(p)) {
          return;
        }
        if (selectedSection === 'men' && (isExplicitKidsItem(p) || isExplicitWomanItem(p))) {
          return;
        }
        if (selectedSection === 'boys') {
          if (pGen === 'girls' || /\b(girls|girl|frock|frocks|choli|lehenga)\b/i.test(p.name || '')) return;
          if (pGen !== 'boys' && pSec !== 'kids' && !/\b(boys|boy)\b/i.test(p.name || '')) return;
        } else if (selectedSection === 'girls') {
          if (pGen === 'boys' || /\b(boys|boy)\b/i.test(p.name || '')) return;
          if (pGen !== 'girls' && pSec !== 'kids' && !/\b(girls|girl)\b/i.test(p.name || '')) return;
        } else if (selectedSection === 'kids') {
          if (pSec !== 'kids' && pGen !== 'kids' && pGen !== 'boys' && pGen !== 'girls' && !p.department?.toLowerCase().includes('kid')) return;
        } else {
          const combinedSec = (p.section || p.gender || '').toLowerCase();
          if (combinedSec !== selectedSection && !((selectedSection === 'men' && isExplicitManItem(p)) || (selectedSection === 'women' && isExplicitWomanItem(p)))) {
            return;
          }
        }
      }
      if (selectedCategory && selectedCategory !== 'all') {
        if (!productMatchesCategory(p, selectedCategory)) return;
      }
      const sub = (p.subcategory || p.childCategory || '').toLowerCase().trim();
      if (!sub) return;
      counts[sub] = (counts[sub] || 0) + 1;
      if (!labels[sub]) {
        labels[sub] = (p.subcategory || p.childCategory || '')
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }
    });

    return Object.entries(counts)
      .map(([slug, count]) => ({ slug, label: labels[slug] || slug, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [sellerProducts, selectedSection, selectedCategory]);

  const pageHeading = useMemo(() => {
    if (searchQuery.trim()) {
      const catLabel = selectedCategory && selectedCategory !== 'all'
        ? (selectedCategory === 'gadgets' ? 'Gadgets & Electronics' : titleCase(selectedCategory))
        : '';
      return catLabel ? `${catLabel} — Results for "${searchQuery.trim()}"` : `Results for "${searchQuery.trim()}"`;
    }
    const cleanDeal = (urlDeal || filterType || '').toLowerCase();
    if (cleanDeal === 'new' || cleanDeal === 'new arrivals' || cleanDeal === 'new-arrivals' || cleanDeal === 'new_arrival') {
      return "New Arrivals & Fresh Drops";
    }
    if (cleanDeal === 'best' || cleanDeal === 'best sellers' || cleanDeal === 'best-sellers' || cleanDeal === 'bestseller') {
      return "Best Sellers & Top Rated";
    }
    if (isShirtsPage) return "Men's Shirts & Sartorial Edit";
    if (selectedSubcategory !== 'all') {
      if (selectedSubcategory === 'casual-shoes') {
        if (selectedSection === 'men') return "Men's Casual Shoes & Sneakers";
        if (selectedSection === 'women') return "Women's Casual Shoes & Sneakers";
        if (selectedSection === 'kids' || selectedSection === 'boys' || selectedSection === 'girls') return "Kids Casual Shoes";
        return "Casual Shoes & Sneakers";
      }
      if (selectedSubcategory === 'formal-shoes') {
        if (selectedSection === 'men') return "Men's Formal Shoes & Loafers";
        if (selectedSection === 'women') return "Women's Formal Shoes & Loafers";
        return "Formal Shoes & Loafers";
      }
      if (selectedSubcategory === 'sandals') {
        if (selectedSection === 'men') return "Men's Sandals & Floaters";
        if (selectedSection === 'women') return "Women's Sandals & Slippers";
        if (selectedSection === 'kids' || selectedSection === 'boys' || selectedSection === 'girls') return "Kids Sandals & Slippers";
        return "Sandals & Slippers";
      }
      if (selectedSubcategory === 'shirts') {
        if (selectedSection === 'men') return "Men's Casual & Formal Shirts";
        return "Shirts";
      }
      if (selectedSubcategory === 't-shirts') {
        if (selectedSection === 'men') return "Men's T-Shirts & Polos";
        return "T-Shirts";
      }
      if (selectedSubcategory === 'jackets') {
        if (selectedSection === 'men') return "Men's Jackets & Blazers";
        if (selectedSection === 'women') return "Women's Jackets & Shrugs";
        return "Jackets & Blazers";
      }
      if (selectedSubcategory === 'jeans-trousers') {
        if (selectedSection === 'men') return "Men's Jeans & Trousers";
        return "Jeans & Trousers";
      }
      if (selectedSubcategory === 'kurtas') {
        if (selectedSection === 'men') return "Men's Kurtas & Ethnic Wear";
        if (selectedSection === 'women') return "Women's Kurtas & Kurtis";
        return "Kurtas & Ethnic Wear";
      }
      if (selectedSubcategory === 'wallets') {
        if (selectedSection === 'men') return "Men's Wallets & Belts";
        return "Wallets & Belts";
      }
      if (selectedSubcategory === 'watches') {
        if (selectedSection === 'men') return "Men's Watches";
        if (selectedSection === 'women') return "Women's Watches";
        return "Watches";
      }
      if (selectedSubcategory === 'blouses') return "Women's Designer Blouses";
      if (selectedSubcategory === 'sarees') {
        if (selectedChildCategory && selectedChildCategory !== 'all') {
          const match = SAREE_SUBCATEGORIES.find(s => s.slug === selectedChildCategory);
          return match ? match.label : "Women's Sarees";
        }
        return "Women's Sarees";
      }
      if (selectedSubcategory === 'heels') return "Women's Heels & Wedges";
      if (selectedSubcategory === 'flats') return "Women's Flats & Slides";
      if (selectedSubcategory === 'handbags') return "Women's Handbags & Totes";
      if (selectedSubcategory === 'jewellery') return "Fashion Jewellery";
      if (selectedSubcategory === 'shirts-tshirts') return selectedSection === 'boys' ? "Boys Shirts & T-Shirts" : "Kids Shirts & T-Shirts";
      if (selectedSubcategory === 'jeans-shorts') return selectedSection === 'boys' ? "Boys Jeans & Shorts" : "Kids Jeans & Shorts";
      if (selectedSubcategory === 'ethnic-sets') return selectedSection === 'boys' ? "Boys Ethnic Sets & Festive Wear" : selectedSection === 'girls' ? "Girls Ethnic Wear" : "Kids Ethnic Sets & Festive Wear";
      if (selectedSubcategory === 'dresses-frocks') return "Girls Dresses & Frocks";
      if (selectedSubcategory === 'tops-skirts') return "Girls Tops & Skirts";
      if (selectedSubcategory === 'baby-clothes') return "Baby Rompers & Onesies";
      if (selectedSubcategory === 'cookware-utensils') return "Cookware & Utensils";
      if (selectedSubcategory === 'dinner-sets') return "Dinner Sets & Plates";
      if (selectedSubcategory === 'storage-containers') return "Storage Containers";
      if (selectedSubcategory === 'water-bottles' || selectedSubcategory === 'water-bottles-flasks') return "Water Bottles & Flasks";
      if (selectedSubcategory === 'bedsheets' || selectedSubcategory === 'bed-linen-sheets') return "Bed Linen & Sheets";
      if (selectedSubcategory === 'curtains' || selectedSubcategory === 'curtains-drapes') return "Curtains & Drapes";
      if (selectedSubcategory === 'cushions' || selectedSubcategory === 'cushions-covers') return "Cushions & Covers";
      if (selectedSubcategory === 'blankets-quilts') return "Blankets & Quilts";
      if (selectedSubcategory === 'wall-decor' || selectedSubcategory === 'wall-decor-clocks') return "Wall Decor & Clocks";
      if (selectedSubcategory === 'vases-plants' || selectedSubcategory === 'vases-artificial-plants') return "Vases & Artificial Plants";
      if (selectedSubcategory === 'lamps-lighting') return "Lamps & Lighting";
      if (selectedSubcategory === 'showpieces-figurines') return "Showpieces & Figurines";
      return selectedSubcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    if (selectedSection !== 'all') {
      if (selectedSection === 'boys') return "Boys' Fashion & Clothing";
      if (selectedSection === 'girls') return "Girls' Fashion & Clothing";
      return `${selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}'s Collection`;
    }
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'grocery-items' || selectedCategory === 'grocery') return 'Grocery Items & Daily Essentials';
      if (selectedCategory === 'pet-accessories') return 'Pet Accessories & Pet Care';
      return selectedCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    return 'All Products';
  }, [searchQuery, urlDeal, filterType, isShirtsPage, selectedSubcategory, selectedSection, selectedCategory]);

  // Sync state when URL params change
  useEffect(() => {
    const isDirect = type === 'men-shirts' || type === 'shirts';
    const isGender = ['men', 'women', 'kids', 'boys', 'girls'].includes(type?.toLowerCase());
    const urlGen = (searchParams.get('gender') || '').toLowerCase();
    let cSec = isDirect 
      ? 'men' 
      : ['boys', 'girls'].includes(urlGen)
      ? urlGen
      : isGender 
      ? type.toLowerCase() 
      : (searchParams.get('section') || (searchParams.get('department') || 'all'));
    const cSubParam = searchParams.get('subcategory');
    const mappedCat = cSubParam ? SUBCAT_TO_CATEGORY[cSubParam] : null;
    let cCat = isDirect 
      ? 'clothing' 
      : (searchParams.get('category') || mappedCat || (isGender ? (cSubParam ? 'clothing' : 'all') : (type && type !== 'all' && type !== 'products' ? type : 'all')));
    let cSub = isDirect ? 'shirts' : (cSubParam || 'all');

    if ((!cCat || cCat === 'all') && urlSearch && urlSearch.trim()) {
      const match = findRespectiveCategoryMatch(urlSearch, sellerProducts);
      if (match?.categorySlug) {
        cCat = match.categorySlug;
        if (match.subcategory && (!cSub || cSub === 'all')) {
          cSub = match.subcategory;
        }
        if (match.section && (!cSec || cSec === 'all')) {
          cSec = match.section;
        }
      }
    }

    let cChild = searchParams.get('childCategory') || searchParams.get('child') || searchParams.get('sareeType') || 'all';
    if (sareeSubcatSlugs.includes(cSub)) {
      cChild = cSub;
      cSub = 'sarees';
      if (!cSec || cSec === 'all') cSec = 'women';
    }

    setSelectedCategory(cCat);
    setSearchQuery(urlSearch);
    setSelectedSubcategory(cSub);
    setSelectedChildCategory(cChild);
    setSelectedSection(cSec);
    if (urlDeal && urlDeal !== 'all') {
      setFilterType(urlDeal);
    }
    if (urlSearch) {
      setSelectedPriceTiers([]);
      setAppliedMinPrice(null);
      setAppliedMaxPrice(null);
      setSelectedFabrics([]);
      setSelectedFits([]);
      setSelectedCollars([]);
      setSelectedPatterns([]);
      setSelectedOccasions([]);
      setSelectedBrands([]);
      setSelectedMaterials([]);
      setCurrentPage(1);
    }
  }, [searchParams, type, urlSearch, urlDeal]);

  // Initial load of products
  useEffect(() => {
    window.scrollTo(0, 0);
    setInitialLoading(true);
    setErrorState(null);
    setCurrentPage(1);

    const load = async () => {
      try {
        if (typeof fetchSellerProducts === 'function') {
          await fetchSellerProducts();
        }
      } catch (err) {
        setErrorState("Failed to load products. Please try again.");
      } finally {
        setInitialLoading(false);
      }
    };
    load();
  }, [type, fetchSellerProducts]);

  // Demographic / Shop For selector handler
  const handleShopForChange = (deptSlug) => {
    setSelectedSection(deptSlug);
    setCurrentPage(1);
    const p = new URLSearchParams(searchParams);
    if (deptSlug === 'all') {
      p.delete('section');
      p.delete('department');
    } else {
      p.set('section', deptSlug);
    }
    setSearchParams(p);
  };

  // Category select handler
  const handleCategorySelect = (cSlug) => {
    setSelectedCategory(cSlug);
    setSelectedSubcategory('all');
    setCurrentPage(1);
    const allowsDemographic = ['clothing', 'western-wear', 'ethnic-wear', 'fashion', 'footwear', 'accessories', 'kids'].includes((cSlug || '').toLowerCase());
    if (!allowsDemographic) {
      setSelectedSection('all');
    }

    const p = new URLSearchParams(searchParams);
    if (cSlug === 'all') {
      p.delete('category');
    } else {
      p.set('category', cSlug);
    }
    p.delete('subcategory');
    if (!allowsDemographic) {
      p.delete('section');
      p.delete('department');
    }

    if (type && type !== cSlug && !isDirectShirtRoute) {
      navigate(`/products?${p.toString()}`);
    } else {
      setSearchParams(p);
    }
  };

  // Subcategory select handler
  const handleSubcategorySelect = (subSlug, secSlug, secCat) => {
    let targetSection = selectedSection;
    if (secSlug && ['men', 'women', 'kids', 'boys', 'girls'].includes(secSlug)) {
      targetSection = secSlug;
      if (selectedSection !== secSlug) {
        setSelectedSection(secSlug);
      }
    }
    const nextSub = selectedSubcategory === subSlug ? 'all' : subSlug;
    setSelectedSubcategory(nextSub);
    setCurrentPage(1);

    const mappedCategory = nextSub !== 'all' ? SUBCAT_TO_CATEGORY[nextSub] : null;
    let targetCategory = selectedCategory;
    if (secCat && secCat !== 'all') {
      targetCategory = secCat;
      setSelectedCategory(secCat);
    } else if (mappedCategory) {
      targetCategory = mappedCategory;
      setSelectedCategory(mappedCategory);
    } else if (secSlug && !['men', 'women', 'kids', 'boys', 'girls'].includes(secSlug)) {
      targetCategory = secSlug;
      setSelectedCategory(secSlug);
    }

    const p = new URLSearchParams(searchParams);
    if (nextSub !== 'sarees') {
      setSelectedChildCategory('all');
      p.delete('childCategory');
      p.delete('child');
      p.delete('sareeType');
    }
    if (targetSection && targetSection !== 'all') {
      p.set('section', targetSection);
    }
    if (targetCategory && targetCategory !== 'all') {
      p.set('category', targetCategory);
    } else if (nextSub === 'all') {
      p.delete('category');
    }
    if (nextSub === 'all') {
      p.delete('subcategory');
    } else {
      p.set('subcategory', nextSub);
    }

    if (type && type !== targetCategory && !isDirectShirtRoute) {
      navigate(`/products?${p.toString()}`);
    } else {
      setSearchParams(p);
    }
  };

  // Dedicated Saree Child Category (Saree Type / Subcategory) Handler
  const handleChildCategorySelect = (childSlug) => {
    const nextChild = selectedChildCategory === childSlug ? 'all' : childSlug;
    setSelectedChildCategory(nextChild);
    if (selectedSubcategory !== 'sarees') {
      setSelectedSubcategory('sarees');
    }
    setCurrentPage(1);

    const p = new URLSearchParams(searchParams);
    p.set('subcategory', 'sarees');
    if (nextChild && nextChild !== 'all') {
      p.set('childCategory', nextChild);
    } else {
      p.delete('childCategory');
      p.delete('child');
      p.delete('sareeType');
    }
    setSearchParams(p);
  };

  // Multi-select toggle helpers
  const toggleSelection = (item, currentList, setList) => {
    setList(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
    setCurrentPage(1);
  };

  // Custom price range apply
  const handleApplyCustomPrice = (e) => {
    e?.preventDefault();
    const min = customMinPrice ? parseFloat(customMinPrice) : null;
    const max = customMaxPrice ? parseFloat(customMaxPrice) : null;
    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);
    setCurrentPage(1);
  };

  const handleClearCustomPrice = () => {
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setAppliedMinPrice(null);
    setAppliedMaxPrice(null);
    setCurrentPage(1);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedCategory(isDirectShirtRoute ? 'clothing' : 'all');
    setSelectedSection(isDirectShirtRoute ? 'men' : 'all');
    setSelectedSubcategory(isDirectShirtRoute ? 'shirts' : 'all');
    setSelectedChildCategory('all');
    setSelectedPriceTiers([]);
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setAppliedMinPrice(null);
    setAppliedMaxPrice(null);
    setMinRating(0);
    setInStockOnly(false);
    setMinDiscount(0);
    setSortBy('featured');
    setFilterType('all');
    setSearchQuery('');
    setSelectedFabrics([]);
    setSelectedFits([]);
    setSelectedCollars([]);
    setSelectedSleeves([]);
    setSelectedPatterns([]);
    setSelectedOccasions([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setCurrentPage(1);

    if (type && !isDirectShirtRoute) {
      navigate('/products');
    } else if (isDirectShirtRoute) {
      setSearchParams(new URLSearchParams());
    } else {
      setSearchParams(new URLSearchParams());
    }
  };

  // Primary mega menu departments matching Header structure
  const headerDepartments = useMemo(() => {
    const menData = departmentMegaMenu?.['men'];
    const womenData = departmentMegaMenu?.['women'];

    return {
      men: {
        id: 'men',
        label: 'Men',
        sections: menData?.sections || []
      },
      women: {
        id: 'women',
        label: 'Women',
        sections: womenData?.sections || []
      },
      kids: {
        id: 'kids',
        label: 'Kids',
        sections: [
          {
            title: 'BOYS CLOTHING',
            slug: 'boys-clothing',
            items: [
              { label: 'Shirts & T-Shirts', slug: 'shirts-tshirts' },
              { label: 'Jeans & Shorts', slug: 'jeans-shorts' },
              { label: 'Ethnic Sets', slug: 'ethnic-sets' }
            ]
          },
          {
            title: 'GIRLS CLOTHING',
            slug: 'girls-clothing',
            items: [
              { label: 'Dresses & Frocks', slug: 'dresses-frocks' },
              { label: 'Tops & Skirts', slug: 'tops-skirts' },
              { label: 'Ethnic Sets', slug: 'ethnic-sets' }
            ]
          },
          {
            title: 'BABY & FOOTWEAR',
            slug: 'kids-footwear',
            items: [
              { label: 'Baby Rompers & Onesies', slug: 'baby-clothes' },
              { label: 'Kids Casual Shoes', slug: 'casual-shoes' },
              { label: 'Kids Sandals & Slippers', slug: 'sandals' }
            ]
          }
        ]
      }
    };
  }, []);

  // Filter products pool
  const filteredProducts = useMemo(() => {
    if (!sellerProducts || !Array.isArray(sellerProducts)) return [];
    let result = [...sellerProducts];
    const cleanSub = normalizeSlug(selectedSubcategory || '');

    const isWomenScope = selectedSection === 'women' || 
                         selectedCategory === 'women' || 
                         selectedCategory === 'womens' || 
                         (type && type.toLowerCase() === 'women');

    if (isWomenScope) {
      result = result.filter(p => !isExplicitKidsItem(p));
    }

    // 1. Department / Shop For Filter
    if (selectedSection && selectedSection !== 'all') {
      const cleanSection = selectedSection.toLowerCase();
      result = result.filter(p => {
        const pGender = (p.gender || '').toString().toLowerCase();
        const pSection = (p.section || '').toString().toLowerCase();
        const pDept = (p.department || '').toString().toLowerCase();
        const pCat = (p.category || p.category_name || '').toString().toLowerCase();

        // Non-demographic categories (grocery, electronics, pooja, home, beauty, etc.) must NEVER appear in Men/Women/Kids filters!
        const isDemographicFashionCategory = ['clothing', 'western-wear', 'ethnic-wear', 'footwear', 'accessories', 'jewellery', 'jewelry'].includes(pCat);

        if (cleanSection === 'men') {
          if (!isDemographicFashionCategory) return false;
          if (isExplicitKidsItem(p)) return false;
          if (isExplicitWomanItem(p)) return false;
          return pSection === 'men' || pGender === 'men' || pDept === 'men';
        } else if (cleanSection === 'women') {
          if (!isDemographicFashionCategory) return false;
          if (isExplicitKidsItem(p)) return false;
          if (isExplicitManItem(p)) return false;
          return isExplicitWomanItem(p) || pSection === 'women' || pGender === 'women' || pDept === 'women';
        } else if (cleanSection === 'boys') {
          if (!['clothing', 'western-wear', 'footwear', 'kids', 'ethnic-wear', 'toys-games'].includes(pCat)) return false;
          if (pGender === 'girls' || pDept === 'girls' || /\b(girls|girl|frock|frocks|choli|lehenga)\b/i.test(p.name || '')) return false;
          return pGender === 'boys' || pSection === 'kids' || pDept.includes('kid') || pCat === 'kids' || /\b(boys|boy)\b/i.test(p.name || '');
        } else if (cleanSection === 'girls') {
          if (!['clothing', 'western-wear', 'footwear', 'kids', 'ethnic-wear', 'toys-games'].includes(pCat)) return false;
          if (pGender === 'boys' || pDept === 'boys' || /\b(boys|boy)\b/i.test(p.name || '')) return false;
          return pGender === 'girls' || pSection === 'kids' || pDept.includes('kid') || pCat === 'kids' || /\b(girls|girl)\b/i.test(p.name || '');
        } else if (cleanSection === 'kids') {
          if (!['clothing', 'western-wear', 'footwear', 'kids', 'ethnic-wear', 'toys-games'].includes(pCat)) return false;
          if (isExplicitManItem(p) || isExplicitWomanItem(p)) return false;
          return pSection === 'kids' || pDept.includes('kid') || pGender === 'kids' || pGender === 'boys' || pGender === 'girls' || pCat === 'kids';
        } else {
          return productMatchesSection(p, cleanSection);
        }
      });
    }

    // 2. Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      const cleanCat = selectedCategory.toLowerCase().trim();

      result = result.filter(p => {
        const cat = (p.category || p.category_name || '').toString().toLowerCase();
        const pDept = (p.department || '').toString().toLowerCase();
        const pTags = normalizeSlug(p.tags || '');
        const pSub = normalizeSlug(p.subcategory || '');

        if (cleanCat === 'men' || cleanCat === 'mens') {
          if (!['clothing', 'western-wear', 'ethnic-wear', 'footwear', 'accessories', 'jewellery', 'jewelry'].includes(cat)) return false;
          if (isExplicitKidsItem(p)) return false;
          if (isExplicitWomanItem(p)) return false;
          return (p.section || '').toLowerCase() === 'men' || (p.gender || '').toLowerCase() === 'men' || pDept === 'men';
        }
        if (cleanCat === 'women' || cleanCat === 'womens') {
          if (!['clothing', 'western-wear', 'ethnic-wear', 'footwear', 'accessories', 'jewellery', 'jewelry'].includes(cat)) return false;
          if (isExplicitKidsItem(p)) return false;
          if (isExplicitManItem(p)) return false;
          return isExplicitWomanItem(p) || (p.section || '').toLowerCase() === 'women' || (p.gender || '').toLowerCase() === 'women' || pDept === 'women';
        }
        if (cleanCat === 'kids') {
          if (isExplicitManItem(p) || isExplicitWomanItem(p)) return false;
          return (p.section || '').toLowerCase() === 'kids' || pDept.includes('kid') || (p.gender || '').toLowerCase() === 'kids' || cat === 'kids';
        }
        if (cleanCat === 'western-wear') {
          return cat === 'western-wear' || pTags.includes('western-wear') || ['dresses', 'co-ord-sets', 'tops', 'jeans-jeggings'].includes(pSub);
        }
        if (cleanCat === 'clothing') {
          return ['clothing', 'fashion', 'apparel', 'western-wear', 'ethnic-wear'].includes(cat) || pTags.includes('clothing');
        }
        if (cleanCat === 'footwear' || cleanCat === 'footwears' || cleanCat === 'shoes') {
          return ['footwear', 'footwears', 'shoes'].includes(cat);
        }
        if (cleanCat === 'ethnic-wear' || cleanCat === 'ethnic') {
          return ['ethnic-wear', 'ethnic'].includes(cat) || pTags.includes('ethnic-wear') || ['kurtas', 'sarees', 'kurta-suit-sets'].includes(pSub);
        }
        if (cleanCat === 'accessories') {
          return cat === 'accessories' || ((cleanSub === 'jewellery' || cleanSub === 'jewelry' || cleanSub === 'fashion-jewellery' || cleanSub.includes('jewel')) && (cat === 'jewellery' || cat === 'jewelry'));
        }
        if (cleanCat === 'beauty') {
          return cat === 'beauty';
        }
        if (cleanCat === 'gadgets' || cleanCat === 'electronics') {
          return cat === 'gadgets' || cat === 'electronics';
        }
        if (cleanCat === 'home-kitchen' || cleanCat === 'home-living') {
          return cat === 'home-kitchen' || cat === 'home-living';
        }
        if (cleanCat === 'stationary' || cleanCat === 'stationery') {
          return cat === 'stationary' || cat === 'stationery';
        }
        if (cleanCat === 'pooja-items' || cleanCat === 'pooja') {
          return cat === 'pooja-items' || cat === 'pooja';
        }
        if (cleanCat === 'grocery' || cleanCat === 'grocery-items' || cleanCat === 'groceries') {
          return ['grocery', 'groceries', 'grocery-items'].includes(cat);
        }
        if (cleanCat === 'pet-accessories' || cleanCat === 'pet' || cleanCat === 'pets') {
          return ['pet-accessories', 'pet', 'pets', 'pet-supplies'].includes(cat);
        }
        if (cleanCat === 'healthy-foods' || cleanCat === 'healthy-food') {
          return ['healthy-foods', 'healthy-food'].includes(cat);
        }
        if (cleanCat === 'jewellery' || cleanCat === 'jewelry') {
          return cat === 'jewellery' || cat === 'jewelry';
        }
        if (cleanCat === 'gifts') {
          return cat === 'gifts';
        }
        return productMatchesCategory(p, cleanCat) || cat === cleanCat;
      });
    }

    // 3. Subcategory Filter
    if (cleanSub && cleanSub !== 'all') {
      result = result.filter(p => {
        const sub = normalizeSlug(p.subcategory);
        const child = normalizeSlug(p.childCategory || p.child_category);
        const pTags = normalizeSlug(p.tags || '');
        const pCat = (p.category || p.category_name || '').toString().toLowerCase();

        // FOOTWEAR vs CLOTHING MUTUAL EXCLUSION
        const isFootwearProduct = ['footwear', 'shoes', 'footwears'].includes(pCat) || ['casual-shoes', 'formal-shoes', 'sandals', 'heels', 'flats', 'kids-shoes', 'sneakers', 'sports-shoes'].includes(sub);
        const isShoeSub = ['sneakers', 'casual-shoes', 'sports-shoes', 'formal-shoes', 'dress-shoes', 'boots', 'heels', 'wedges', 'flats', 'flip-flops-slippers', 'slides', 'flat-sandals', 'flat-sandals-&-slides', 'sandals', 'floaters', 'kids-shoes', 'kids-casual-shoes', 'kids-sandals', 'kids-sandals-slippers', 'kids-footwear'].includes(cleanSub);
        if (isShoeSub && !isFootwearProduct) return false;

        const isClothingSub = ['shirts', 't-shirts', 'tshirts', 'polos', 'tops', 'tops-shirts', 'tops-&-shirts', 'blouses', 'jeans-jeggings', 'jeans-&-jeggings', 'jeans', 'denims', 'leggings', 'palazzos', 'leggings-palazzos', 'leggings-&-palazzos', 'trousers-pants', 'trousers', 'chinos', 'pants', 'jackets', 'blazers', 'kurtas', 'kurtis', 'kurtas-kurtis', 'sarees', 'sarees-blouses', 'co-ord-sets', 'coord-sets', 'co-ords', 'coords', 'kurta-suit-sets', 'suit-sets', 'anarkalis', 'suits', 'dresses', 'dresses-gowns', 'gowns', 'track-pants', 'joggers', 'sweatpants', 'shirts-tshirts', 'shirts-&-tshirts', 'boys-tshirts', 'boys-shirts', 'jeans-shorts', 'jeans-&-shorts', 'boys-jeans', 'boys-shorts', 'ethnic-sets', 'boys-ethnic', 'girls-ethnic', 'dresses-frocks', 'dresses-&-frocks', 'girls-dresses', 'frocks', 'tops-skirts', 'tops-&-skirts', 'girls-tops', 'girls-skirts'].includes(cleanSub);
        if (isClothingSub && isFootwearProduct) return false;

        if (cleanSub === 'shirts') {
          return (sub === 'shirts' || child === 'shirts') && !sub.includes('t-shirt') && !child.includes('t-shirt');
        }
        if (cleanSub === 't-shirts' || cleanSub === 'tshirts' || cleanSub === 'polos') {
          return sub === 't-shirts' || child === 't-shirts' || sub === 'tshirts' || child.includes('polo') || sub.includes('polo') || pTags.includes('polo') || pTags.includes('t-shirt');
        }
        if (cleanSub === 'tops' || cleanSub === 'tops-shirts' || cleanSub === 'tops-&-shirts' || cleanSub === 'blouses' || (cleanSub.includes('top') && !cleanSub.includes('tank'))) {
          if (sub === 'sarees' || child.includes('saree') || pTags.includes('saree')) return false;
          if (isExplicitKidsItem(p)) return false;
          return sub === 'tops' || child.includes('top') || child.includes('shirt') || pTags.includes('tops') || pTags.includes('blouse');
        }
        if (cleanSub === 'jeans-jeggings' || cleanSub === 'jeans-&-jeggings' || cleanSub === 'jeans' || cleanSub === 'denims' || cleanSub.includes('jegging')) {
          if (isExplicitKidsItem(p)) return false;
          return sub === 'jeans-jeggings' || sub === 'jeans' || sub === 'denims' || child.includes('jeans') || child.includes('denim') || pTags.includes('jeans') || pTags.includes('denim') || pTags.includes('jeggings');
        }
        if (cleanSub === 'leggings' || cleanSub === 'palazzos' || cleanSub === 'leggings-palazzos' || cleanSub === 'leggings-&-palazzos' || cleanSub.includes('legging') || cleanSub.includes('palazzo')) {
          if (isExplicitKidsItem(p)) return false;
          return sub === 'leggings' || sub === 'palazzos' || child.includes('legging') || child.includes('palazzo') || pTags.includes('leggings') || pTags.includes('palazzo');
        }
        if (cleanSub === 'trousers-pants' || cleanSub === 'trousers' || cleanSub === 'chinos' || cleanSub === 'pants') {
          return sub === 'trousers-pants' || sub === 'trousers' || sub === 'chinos' || child.includes('trouser') || child.includes('chino') || pTags.includes('trouser') || pTags.includes('chino');
        }
        if (cleanSub === 'jackets' || cleanSub === 'blazers') {
          return sub === 'jackets' || sub === 'blazers' || child.includes('jacket') || child.includes('blazer') || pTags.includes('jacket') || pTags.includes('blazer');
        }
        if (cleanSub === 'kurtas' || cleanSub === 'kurtis' || cleanSub === 'kurtas-kurtis') {
          return (sub === 'kurtas' || child.includes('kurti') || child.includes('kurta')) && !sub.includes('suit') && !child.includes('suit') && !child.includes('anarkali');
        }
        if (cleanSub === 'blouses') {
          if (isExplicitKidsItem(p)) return false;
          return sub === 'blouses' || child === 'blouses' || (p.name || '').toLowerCase().includes('blouse') || pTags.includes('blouse');
        }
        if (cleanSub === 'sarees' || cleanSub === 'sarees-blouses') {
          if (isExplicitKidsItem(p)) return false;
          if (sub === 'blouses' || child === 'blouses' || ((p.name || '').toLowerCase().includes('blouse') && !(p.name || '').toLowerCase().includes('saree'))) return false;
          return sub === 'sarees' || child.includes('saree') || pTags.includes('saree');
        }
        if (cleanSub === 'co-ord-sets' || cleanSub === 'coord-sets' || cleanSub === 'co-ords' || cleanSub === 'coords') {
          if (isWomenScope && isExplicitKidsItem(p)) return false;
          return sub === 'co-ord-sets' || child.includes('coord') || child.includes('co-ord') || pTags.includes('co-ord') || pTags.includes('coord');
        }
        if (cleanSub === 'kurta-suit-sets' || cleanSub === 'suit-sets' || cleanSub === 'anarkalis' || cleanSub === 'suits') {
          if (isExplicitKidsItem(p)) return false;
          return sub === 'kurta-suit-sets' || child.includes('suit') || child.includes('anarkali') || pTags.includes('anarkali') || pTags.includes('suit-set') || pTags.includes('salwar');
        }
        if (cleanSub === 'dresses' || cleanSub === 'dresses-gowns' || cleanSub === 'gowns') {
          if (isExplicitKidsItem(p)) return false;
          return sub === 'dresses' || child.includes('dress') || child.includes('gown') || pTags.includes('dress') || pTags.includes('gown');
        }
        if (cleanSub === 'track-pants' || cleanSub === 'joggers' || cleanSub === 'sweatpants') {
          return sub === 'track-pants' || child.includes('track') || child.includes('jogger') || pTags.includes('track-pants') || pTags.includes('jogger');
        }
        if (cleanSub === 'sneakers' || cleanSub === 'casual-shoes' || cleanSub === 'sports-shoes') {
          return sub === 'sneakers' || sub === 'casual-shoes' || child.includes('sneaker') || child.includes('casual-shoe') || child.includes('sports') || pTags.includes('sneaker') || pTags.includes('casual-shoes');
        }
        if (cleanSub === 'formal-shoes' || cleanSub === 'dress-shoes' || cleanSub === 'boots') {
          return sub === 'formal-shoes' || child.includes('formal-shoe') || child.includes('oxford') || child.includes('derby') || child.includes('loafer') || child.includes('boot') || pTags.includes('formal-shoes');
        }
        if (cleanSub === 'heels' || cleanSub === 'wedges' || cleanSub === 'heels-wedges' || cleanSub === 'heels-&-wedges' || cleanSub.includes('heel') || cleanSub.includes('wedge')) {
          return sub === 'heels' || sub === 'wedges' || child.includes('heel') || child.includes('wedge') || pTags.includes('heels') || pTags.includes('wedges');
        }
        if (cleanSub === 'flats' || cleanSub === 'flip-flops-slippers' || cleanSub === 'slides' || cleanSub === 'flat-sandals' || cleanSub === 'flat-sandals-&-slides' || cleanSub.includes('flat') || cleanSub.includes('slide')) {
          return sub === 'flats' || sub === 'slides' || sub === 'flip-flops-slippers' || child.includes('flat') || child.includes('slide') || pTags.includes('flats') || pTags.includes('slides') || pTags.includes('flip-flops');
        }
        if (cleanSub === 'sandals' || cleanSub === 'floaters') {
          return sub === 'sandals' || child.includes('sandal') || child.includes('floater') || pTags.includes('sandals') || pTags.includes('floaters');
        }
        if (cleanSub === 'handbags' || cleanSub === 'totes' || cleanSub === 'handbags-totes' || cleanSub === 'handbags-&-totes' || cleanSub === 'backpacks' || cleanSub.includes('handbag') || cleanSub.includes('tote')) {
          return sub === 'handbags' || sub === 'backpacks' || child.includes('handbag') || child.includes('tote') || pTags.includes('handbag') || pTags.includes('tote');
        }
        if (cleanSub === 'wallets' || cleanSub === 'belts' || cleanSub === 'wallets-belts') {
          return sub === 'wallets' || child.includes('wallet') || child.includes('belt') || pTags.includes('wallet') || pTags.includes('belt');
        }
        if (cleanSub === 'jewellery' || cleanSub === 'jewelry' || cleanSub === 'fashion-jewellery' || cleanSub === 'fashion-jewelry' || cleanSub.includes('jewel')) {
          return sub === 'jewellery' || sub === 'jewelry' || sub === 'earrings' || sub === 'necklaces' || child.includes('jewel') || pTags.includes('jewellery') || pTags.includes('jewelry');
        }

        // 3.1 Kids Subcategories Matching
        if (cleanSub === 'shirts-tshirts' || cleanSub === 'shirts-&-tshirts' || cleanSub === 'boys-tshirts' || cleanSub === 'boys-shirts') {
          return child.includes('shirt') || sub.includes('shirt') || pTags.includes('shirts-tshirts');
        }
        if (cleanSub === 'jeans-shorts' || cleanSub === 'jeans-&-shorts' || cleanSub === 'boys-jeans' || cleanSub === 'boys-shorts') {
          return child.includes('jean') || child.includes('short') || sub.includes('jean') || sub.includes('short') || pTags.includes('jeans-shorts');
        }
        if (cleanSub === 'ethnic-sets' || cleanSub === 'boys-ethnic' || cleanSub === 'girls-ethnic') {
          return child.includes('ethnic') || sub.includes('ethnic') || pTags.includes('ethnic-sets');
        }
        if (cleanSub === 'dresses-frocks' || cleanSub === 'dresses-&-frocks' || cleanSub === 'girls-dresses' || cleanSub === 'frocks') {
          return child.includes('dress') || child.includes('frock') || sub.includes('dress') || sub.includes('frock') || pTags.includes('dresses-frocks') || pTags.includes('frocks');
        }
        if (cleanSub === 'tops-skirts' || cleanSub === 'tops-&-skirts' || cleanSub === 'girls-tops' || cleanSub === 'girls-skirts') {
          return child.includes('skirt') || child.includes('top') || sub.includes('tops-skirts') || pTags.includes('tops-skirts') || pTags.includes('skirts');
        }
        if (cleanSub === 'baby-clothes' || cleanSub === 'baby-rompers' || cleanSub === 'baby-rompers-onesies' || cleanSub === 'baby-rompers-&-onesies' || cleanSub === 'rompers' || cleanSub === 'onesies') {
          return child.includes('romper') || child.includes('onesie') || sub.includes('baby') || child.includes('baby') || pTags.includes('romper') || pTags.includes('onesie');
        }
        if (cleanSub === 'kids-shoes' || cleanSub === 'kids-casual-shoes') {
          return child.includes('shoe') || child.includes('sneaker') || sub.includes('casual-shoes') || pTags.includes('kids-shoes');
        }
        if (cleanSub === 'kids-sandals' || cleanSub === 'kids-sandals-slippers' || cleanSub === 'kids-sandals-&-slippers') {
          return child.includes('sandal') || child.includes('slipper') || child.includes('clog') || sub.includes('sandals') || pTags.includes('kids-sandals');
        }
        if (cleanSub === 'boys-clothing') {
          return (p.gender === 'boys' || p.department === 'boys' || pTags.includes('boys')) && !child.includes('shoe') && !child.includes('sandal');
        }
        if (cleanSub === 'girls-clothing') {
          return (p.gender === 'girls' || p.department === 'girls' || pTags.includes('girls')) && !child.includes('shoe') && !child.includes('sandal');
        }
        if (cleanSub === 'kids-footwear') {
          return p.category === 'footwear' || child.includes('shoe') || child.includes('sandal');
        }

        // 3.2 Home & Living Subcategories Matching
        if (cleanSub === 'cookware' || cleanSub === 'cookware-utensils' || cleanSub === 'cookware-&-utensils' || cleanSub === 'utensils') {
          return sub === 'cookware' || child.includes('cookware') || child.includes('utensil') || pTags.includes('cookware') || pTags.includes('utensils');
        }
        if (cleanSub === 'dinner-sets' || cleanSub === 'dinner-sets-plates' || cleanSub === 'dinner-sets-&-plates' || cleanSub === 'plates') {
          return sub === 'dinner-sets' || child.includes('dinner') || child.includes('plate') || pTags.includes('dinner-sets') || pTags.includes('plates');
        }
        if (cleanSub === 'storage-containers' || cleanSub === 'containers' || cleanSub === 'storage') {
          return sub === 'storage-containers' || child.includes('storage') || child.includes('container') || pTags.includes('storage-containers') || pTags.includes('containers');
        }
        if (cleanSub === 'water-bottles-flasks' || cleanSub === 'water-bottles' || cleanSub === 'flasks' || cleanSub === 'bottles') {
          return sub === 'water-bottles-flasks' || child.includes('bottle') || child.includes('flask') || pTags.includes('water-bottles') || pTags.includes('flasks');
        }
        if (cleanSub === 'bedsheets' || cleanSub === 'bed-linen-sheets' || cleanSub === 'bed-linen-&-sheets' || cleanSub === 'bed-linen' || cleanSub === 'bedding') {
          return sub === 'bedsheets' || child.includes('bedsheet') || child.includes('bed linen') || child.includes('bedding') || pTags.includes('bedsheet') || pTags.includes('bed-linen');
        }
        if (cleanSub === 'curtains' || cleanSub === 'curtains-drapes' || cleanSub === 'curtains-&-drapes' || cleanSub === 'drapes') {
          return sub === 'curtains' || child.includes('curtain') || child.includes('drape') || pTags.includes('curtains') || pTags.includes('drapes');
        }
        if (cleanSub === 'cushions' || cleanSub === 'cushions-covers' || cleanSub === 'cushions-&-covers' || cleanSub === 'cushion-covers') {
          return sub === 'cushions' || child.includes('cushion') || pTags.includes('cushion') || pTags.includes('cushions');
        }
        if (cleanSub === 'blankets-quilts' || cleanSub === 'blankets-&-quilts' || cleanSub === 'blankets' || cleanSub === 'quilts' || cleanSub === 'comforters') {
          return sub === 'blankets-quilts' || child.includes('blanket') || child.includes('quilt') || child.includes('comforter') || pTags.includes('blanket') || pTags.includes('quilt');
        }
        if (cleanSub === 'wall-decor' || cleanSub === 'wall-decor-clocks' || cleanSub === 'wall-decor-&-clocks' || cleanSub === 'clocks') {
          return sub === 'wall-decor' || child.includes('wall') || child.includes('clock') || pTags.includes('wall-decor') || pTags.includes('clocks');
        }
        if (cleanSub === 'artificial-flowers-plants' || cleanSub === 'vases-artificial-plants' || cleanSub === 'vases-&-artificial-plants' || cleanSub === 'vases' || cleanSub === 'artificial-plants') {
          return sub === 'artificial-flowers-plants' || child.includes('vase') || child.includes('plant') || child.includes('flower') || pTags.includes('vases') || pTags.includes('artificial-flowers-plants') || pTags.includes('plants');
        }
        if (cleanSub === 'lighting' || cleanSub === 'lamps-lighting' || cleanSub === 'lamps-&-lighting' || cleanSub === 'lamps') {
          return sub === 'lighting' || child.includes('lamp') || child.includes('lighting') || pTags.includes('lighting') || pTags.includes('lamps');
        }
        if (cleanSub === 'showpieces' || cleanSub === 'showpieces-figurines' || cleanSub === 'showpieces-&-figurines' || cleanSub === 'figurines' || cleanSub === 'idols') {
          return sub === 'showpieces' || child.includes('showpiece') || child.includes('figurine') || child.includes('sculpture') || child.includes('idol') || pTags.includes('showpieces') || pTags.includes('figurines');
        }

        // 3.3 Beauty & Grooming Subcategories Matching
        if (cleanSub === 'face-creams-moisturizers' || cleanSub === 'face-creams' || cleanSub === 'moisturizers' || cleanSub === 'creams' || cleanSub === 'face-creams-&-moisturizers') {
          return sub === 'face-creams-moisturizers' || child.includes('cream') || child.includes('moisturizer') || pTags.includes('face-creams') || pTags.includes('moisturizer');
        }
        if (cleanSub === 'face-wash-cleansers' || cleanSub === 'face-wash' || cleanSub === 'cleansers' || cleanSub === 'face-washes' || cleanSub === 'face-wash-&-cleansers') {
          return sub === 'face-wash-cleansers' || child.includes('wash') || child.includes('cleanser') || pTags.includes('face-wash') || pTags.includes('cleanser');
        }
        if (cleanSub === 'sunscreen-serums' || cleanSub === 'sunscreens-serums' || cleanSub === 'sunscreen' || cleanSub === 'serums' || cleanSub === 'face-serums' || cleanSub === 'sunscreen-&-serums') {
          if (sub === 'hair-oils-serums' || child.includes('hair') || pTags.includes('hair')) return false;
          return sub === 'sunscreen-serums' || child.includes('sunscreen') || child.includes('serum') || pTags.includes('sunscreen') || pTags.includes('serum');
        }
        if (cleanSub === 'shampoo-conditioner' || cleanSub === 'shampoos-conditioners' || cleanSub === 'shampoo' || cleanSub === 'conditioner' || cleanSub === 'shampoos-&-conditioners' || cleanSub === 'shampoo-&-conditioner') {
          return sub === 'shampoo-conditioner' || child.includes('shampoo') || child.includes('conditioner') || pTags.includes('shampoo') || pTags.includes('conditioner');
        }
        if (cleanSub === 'hair-oils-serums' || cleanSub === 'hair-oils' || cleanSub === 'hair-oil' || cleanSub === 'hair-serum' || cleanSub === 'hair-oils-&-serums') {
          return sub === 'hair-oils-serums' || (child.includes('hair') && (child.includes('oil') || child.includes('serum'))) || pTags.includes('hair-oils') || pTags.includes('hair-oil');
        }
        if (cleanSub === 'perfumes-deodorants' || cleanSub === 'perfumes' || cleanSub === 'perfume' || cleanSub === 'deodorants' || cleanSub === 'deodorant' || cleanSub === 'perfumes-&-deodorants') {
          return sub === 'perfumes-deodorants' || child.includes('perfume') || child.includes('deodorant') || pTags.includes('perfume') || pTags.includes('deodorant');
        }
        if (cleanSub === 'body-mists-sprays' || cleanSub === 'body-mists' || cleanSub === 'body-mist' || cleanSub === 'mists' || cleanSub === 'sprays' || cleanSub === 'body-mists-&-sprays') {
          return sub === 'body-mists-sprays' || child.includes('mist') || child.includes('spray') || pTags.includes('body-mist') || pTags.includes('mist');
        }
        if (cleanSub === 'men-grooming-shaving' || cleanSub === 'men-grooming' || cleanSub === 'grooming' || cleanSub === 'shaving' || cleanSub === 'men-grooming-&-shaving' || cleanSub === 'wellness') {
          return sub === 'men-grooming-shaving' || child.includes('grooming') || child.includes('shaving') || pTags.includes('grooming') || pTags.includes('shaving');
        }
        if (cleanSub === 'skincare') {
          return ['face-creams-moisturizers', 'face-wash-cleansers', 'sunscreen-serums'].includes(sub) || pTags.includes('skincare');
        }
        if (cleanSub === 'haircare') {
          return ['shampoo-conditioner', 'hair-oils-serums'].includes(sub) || pTags.includes('haircare');
        }
        if (cleanSub === 'fragrances' || cleanSub === 'fragrance' || cleanSub === 'fragrances-grooming') {
          return ['perfumes-deodorants', 'body-mists-sprays', 'men-grooming-shaving'].includes(sub) || pTags.includes('fragrance') || pTags.includes('fragrances');
        }

        // 3.4 Pooja Items Subcategories Matching
        if (cleanSub === 'idols-statues' || cleanSub === 'brass-idols-and-statues' || cleanSub === 'brass-idols-statues' || cleanSub === 'idols' || cleanSub === 'statues') {
          return sub === 'idols-statues' || child.includes('idol') || child.includes('statue') || pTags.includes('idols-statues');
        }
        if (cleanSub === 'home-temple-mandir' || cleanSub === 'home-temple' || cleanSub === 'mandir' || cleanSub === 'temple') {
          return sub === 'home-temple-mandir' || child.includes('mandir') || child.includes('temple') || pTags.includes('home-temple-mandir');
        }
        if (cleanSub === 'brass-silver-pooja-items' || cleanSub === 'brass-and-silver-items' || cleanSub === 'brass-silver-items' || cleanSub === 'brass-silver' || cleanSub === 'brass-and-silver-ites') {
          return sub === 'brass-silver-pooja-items' || child.includes('brass & silver') || child.includes('silver') || pTags.includes('brass-silver-pooja-items');
        }
        if (cleanSub === 'thalis' || cleanSub === 'puja-thalis-and-bells' || cleanSub === 'puja-thalis' || cleanSub === 'pooja-thalis' || cleanSub === 'pooja-thali' || cleanSub === 'thalis-bells') {
          return sub === 'thalis' || sub === 'pooja-thali' || child.includes('thali') || child.includes('bell') || pTags.includes('thalis') || pTags.includes('pooja-thali');
        }
        if (cleanSub === 'diyas-lamps' || cleanSub === 'brass-diyas-deepams' || cleanSub === 'brass-diyas-&-deepams' || cleanSub === 'brass-diyas' || cleanSub === 'diyas' || cleanSub === 'deepams') {
          return sub === 'diyas-lamps' || sub === 'brass-diyas' || child.includes('diya') || child.includes('deepam') || child.includes('lamp') || pTags.includes('diyas-lamps') || pTags.includes('brass-diyas');
        }
        if (cleanSub === 'incense-fragrance' || cleanSub === 'incense-fragnances' || cleanSub === 'incense-fragrances' || cleanSub === 'incense' || cleanSub === 'fragrance' || cleanSub === 'incense-dhoop') {
          return sub === 'incense-fragrance' || sub === 'incense-dhoop' || child.includes('incense') || child.includes('dhoop') || child.includes('fragrance') || pTags.includes('incense-fragrance');
        }
        if (cleanSub === 'pooja-samagri' || cleanSub === 'samagri' || cleanSub === 'havan-samagri') {
          return sub === 'pooja-samagri' || sub === 'havan-samagri' || child.includes('samagri') || child.includes('camphor') || pTags.includes('pooja-samagri');
        }
        if (cleanSub === 'rudraksha-spiritual' || cleanSub === 'rudraksha' || cleanSub === 'spiritual' || cleanSub === 'rudraksha-&-spiritual') {
          return sub === 'rudraksha-spiritual' || child.includes('rudraksha') || child.includes('spiritual') || child.includes('mala') || pTags.includes('rudraksha-spiritual');
        }
        if (cleanSub === 'festival-pooja-kits' || cleanSub === 'festival-kits' || cleanSub === 'pooja-kits' || cleanSub === 'festival-pooja-kit' || cleanSub === 'pooja-kit') {
          return sub === 'festival-pooja-kits' || child.includes('festival') || child.includes('kit') || pTags.includes('festival-pooja-kits');
        }

        // 3.5 Pet Accessories Subcategories Matching
        if (cleanSub === 'dog-collars-leashes' || cleanSub === 'collars-leashes' || cleanSub === 'dog-collars' || cleanSub === 'dog-leashes') {
          return sub === 'dog-collars-leashes' || sub === 'collars-leashes' || child.includes('collar') || child.includes('leash') || pTags.includes('dog-collar') || pTags.includes('leash');
        }
        if (cleanSub === 'dog-food' || cleanSub === 'dog-nutrition') {
          return sub === 'dog-food' || child.includes('dog-food') || pTags.includes('dog-food');
        }
        if (cleanSub === 'dog-treats' || cleanSub === 'dog-chews') {
          return sub === 'dog-treats' || child.includes('treat') || pTags.includes('dog-treat');
        }
        if (cleanSub === 'dog-toys') {
          return (sub === 'dog-toys' || child.includes('dog-toy')) && !sub.includes('cat');
        }
        if (cleanSub === 'dog-beds' || cleanSub === 'dog-crates') {
          return sub === 'dog-beds' || child.includes('bed') || child.includes('crate');
        }
        if (cleanSub === 'cat-food' || cleanSub === 'cat-treats') {
          return sub === 'cat-food' || child.includes('cat-food') || pTags.includes('cat-food') || pTags.includes('cat-treat');
        }
        if (cleanSub === 'cat-litter' || cleanSub === 'cat-litter-trays') {
          return sub === 'cat-litter' || child.includes('litter') || pTags.includes('litter');
        }
        if (cleanSub === 'cat-scratchers' || cleanSub === 'cat-trees' || cleanSub === 'scratchers-trees') {
          return sub === 'cat-scratchers' || child.includes('scratcher') || child.includes('tree') || pTags.includes('scratcher');
        }
        if (cleanSub === 'cat-toys' || cleanSub === 'cat-teasers') {
          return sub === 'cat-toys' || child.includes('cat-toy') || child.includes('teaser') || pTags.includes('cat-toy');
        }
        if (cleanSub === 'cat-collars' || cleanSub === 'cat-harnesses' || cleanSub === 'cat-collars-harnesses') {
          return sub === 'cat-collars' || child.includes('cat-collar') || child.includes('cat-harness') || pTags.includes('cat-collar');
        }
        if (cleanSub === 'pet-shampoo' || cleanSub === 'pet-shampoos-hygiene' || cleanSub === 'pet-hygiene') {
          return sub === 'pet-shampoo' || child.includes('shampoo') || pTags.includes('shampoo');
        }
        if (cleanSub === 'pet-brushes' || cleanSub === 'brushes-deshedders' || cleanSub === 'pet-deshedders') {
          return sub === 'pet-brushes' || child.includes('brush') || child.includes('deshedder') || pTags.includes('deshedder');
        }
        if (cleanSub === 'nail-clippers' || cleanSub === 'nail-clippers-trimmers') {
          return sub === 'nail-clippers' || child.includes('nail') || child.includes('clipper') || pTags.includes('nail-clipper');
        }
        if (cleanSub === 'pet-bowls' || cleanSub === 'feeding-bowls-fountains' || cleanSub === 'pet-fountains') {
          return sub === 'pet-bowls' || child.includes('bowl') || child.includes('fountain') || pTags.includes('feeding-bowl');
        }
        if (cleanSub === 'birds-fish-supplies' || cleanSub === 'birds-fish' || cleanSub === 'small-pets') {
          return sub === 'birds-fish-supplies' || child.includes('bird') || child.includes('fish') || pTags.includes('bird') || pTags.includes('cage');
        }

        return sub === cleanSub || child === cleanSub;
      });
    }

        // 4. In-Page Keyword Search (Intelligent multi-token & stemming)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter(Boolean);
      result = result.filter(p => {
        const text = [
          p.name,
          p.title,
          p.description,
          p.brand,
          p.tags,
          p.category,
          p.category_name,
          p.subcategory,
          p.childCategory,
          p.fabric,
          p.collar,
          p.gender,
          p.department
        ].filter(Boolean).join(' ').toLowerCase();

        return tokens.every(token => {
          if (text.includes(token)) return true;
          if (token.endsWith('s') && text.includes(token.slice(0, -1))) return true;
          if (!token.endsWith('s') && text.includes(token + 's')) return true;
          return false;
        });
      });
    }

    // 4B. Saree Subcategory (Child Category) Filter
    if (selectedChildCategory && selectedChildCategory !== 'all') {
      const cleanChild = normalizeSlug(selectedChildCategory);
      const baseKey = cleanChild.replace(/-sarees?$/, '');
      result = result.filter(p => {
        const child = normalizeSlug(p.childCategory || p.child_category);
        const pTags = normalizeSlug(p.tags || '');
        const pName = normalizeSlug(p.name || '');
        return child === cleanChild || 
               child.includes(baseKey) || 
               pTags.includes(cleanChild) || 
               pTags.includes(baseKey) || 
               pName.includes(baseKey);
      });
    }

    // 5. Price Tiers (multi-select)
    if (selectedPriceTiers.length > 0) {
      result = result.filter(p => {
        const price = Number(p.price);
        return selectedPriceTiers.some(tierId => {
          const tier = PRICE_TIERS.find(t => t.id === tierId);
          if (!tier) return false;
          return price >= tier.min && price <= tier.max;
        });
      });
    }

    // 6. Custom Price Range (Min & Max inputs)
    if (appliedMinPrice !== null && !isNaN(appliedMinPrice)) {
      result = result.filter(p => Number(p.price) >= appliedMinPrice);
    }
    if (appliedMaxPrice !== null && !isNaN(appliedMaxPrice)) {
      result = result.filter(p => Number(p.price) <= appliedMaxPrice);
    }

    // 7. Shirt Fabric / Material Filter
    if (selectedFabrics.length > 0) {
      result = result.filter(p => {
        const pFab = toSafeLower(p.fabric || p.specifications?.Fabric || p.description || p.tags);
        return selectedFabrics.some(f => pFab.includes(f.toLowerCase().replace('100%', '').trim()) || pFab.includes(f.toLowerCase()));
      });
    }

    // 7b. Category-aware Material Filter
    if (selectedMaterials.length > 0) {
      result = result.filter(p => {
        const materialText = toSafeLower([
          p.material,
          p.fabric,
          p.specifications?.Material,
          p.specifications?.Fabric,
          p.description,
          p.tags
        ].filter(Boolean).join(' '));
        return selectedMaterials.some(material => materialText.includes(material.toLowerCase()));
      });
    }

    // 8. Shirt Fit Filter
    if (selectedFits.length > 0) {
      result = result.filter(p => {
        const pFit = toSafeLower(p.fit || p.specifications?.Fit || p.name || p.description || p.tags);
        return selectedFits.some(f => pFit.includes(f.toLowerCase()));
      });
    }

    // 9. Shirt Collar Filter
    if (selectedCollars.length > 0) {
      result = result.filter(p => {
        const pCol = toSafeLower(p.collar || p.specifications?.Collar || p.description || p.tags);
        return selectedCollars.some(c => {
          const keyWords = c.toLowerCase().split(/[\/\s]+/);
          return keyWords.some(k => k.length > 3 && pCol.includes(k));
        });
      });
    }

    // 10. Shirt Sleeve Length Filter
    if (selectedSleeves.length > 0) {
      result = result.filter(p => {
        const pSlv = toSafeLower(p.sleeve || p.specifications?.['Sleeve Length'] || p.description || p.tags);
        return selectedSleeves.some(s => pSlv.includes(s.toLowerCase().replace('sleeves', '').trim()));
      });
    }

    // 11. Shirt Pattern Filter
    if (selectedPatterns.length > 0) {
      result = result.filter(p => {
        const pPat = toSafeLower(p.pattern || p.specifications?.Pattern || p.name || p.description || p.tags);
        return selectedPatterns.some(pt => pPat.includes(pt.toLowerCase()));
      });
    }

    // 12. Shirt Occasion Filter
    if (selectedOccasions.length > 0) {
      result = result.filter(p => {
        const pOcc = toSafeLower(p.occasion || p.specifications?.Occasion || p.tags);
        return selectedOccasions.some(o => {
          const words = o.toLowerCase().split(/[\/\s]+/);
          return words.some(w => w.length > 3 && pOcc.includes(w));
        });
      });
    }

    // 13. Color Filter
    if (selectedColors.length > 0) {
      result = result.filter(p => {
        const pCol = toSafeLower(p.color || p.name || p.tags);
        return selectedColors.some(c => pCol.includes(c.toLowerCase()));
      });
    }

    // 13b. Brand / Seller Filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => {
        const brandText = toSafeLower([p.brand, p.seller_name, p.specifications?.Brand, p.name, p.tags].filter(Boolean).join(' '));
        return selectedBrands.some(brand => brandText.includes(brand.toLowerCase()));
      });
    }

    // 14. Size Filter (Apparel & Footwear in Men, Women, Kids)
    if (selectedSizes.length > 0) {
      result = result.filter(p => {
        const prodSizes = Array.isArray(p.sizes) && p.sizes.length > 0
          ? p.sizes.map(s => String(s).toUpperCase().trim())
          : (p.size ? [String(p.size).toUpperCase().trim()] : []);

        // If product has no explicit sizes metadata but is apparel, keep it
        if (prodSizes.length === 0 && ['clothing', 'ethnic-wear', 'western-wear'].includes((p.category || '').toLowerCase())) {
          return true;
        }

        return selectedSizes.some(s => {
          const target = s.toUpperCase().trim();
          return prodSizes.includes(target);
        });
      });

      // Sort products matching the selected sizes chart in correct order
      result.sort((a, b) => {
        const aSizes = (Array.isArray(a.sizes) ? a.sizes : []).map(s => String(s).toUpperCase().trim());
        const bSizes = (Array.isArray(b.sizes) ? b.sizes : []).map(s => String(s).toUpperCase().trim());

        const aFirstIndex = selectedSizes.findIndex(s => aSizes.includes(s.toUpperCase().trim()));
        const bFirstIndex = selectedSizes.findIndex(s => bSizes.includes(s.toUpperCase().trim()));

        if (aFirstIndex !== -1 && bFirstIndex !== -1 && aFirstIndex !== bFirstIndex) {
          return aFirstIndex - bFirstIndex;
        }

        // Prioritize actual dresses, gowns, frocks, kurtas, anarkalis, suits, shirts, blazers
        const aIsDress = /dress|gown|frock|kurta|anarkali|suit|shirt|blazer/i.test([a.name, a.subcategory, a.childCategory].filter(Boolean).join(' '));
        const bIsDress = /dress|gown|frock|kurta|anarkali|suit|shirt|blazer/i.test([b.name, b.subcategory, b.childCategory].filter(Boolean).join(' '));

        if (aIsDress && !bIsDress) return -1;
        if (!aIsDress && bIsDress) return 1;

        return 0;
      });
    }

    // 15. Promotional Tabs (All, New, Best Sellers, Top Deals)
    if (filterType === 'best' || filterType === 'best sellers' || filterType === 'best-sellers' || filterType === 'bestseller') {
      result = result.filter(p => p.is_bestseller || p.rating >= 4.7);
    } else if (filterType === 'new' || filterType === 'new arrivals' || filterType === 'new-arrivals' || filterType === 'new_arrival') {
      result = result.filter(p => p.is_new || p.deal_type === 'new_arrival');
      if (result.length === 0) {
        result = [...(sellerProducts || [])].reverse().slice(0, 30);
      }
    } else if (filterType === 'sale' || filterType === 'top deals' || filterType === 'deals') {
      result = result.filter(p => (p.discount_percentage || 0) >= 20 || p.price < 5000);
    }

    // 16. Rating Filter
    if (minRating > 0) {
      result = result.filter(p => Number(p.rating || 0) >= minRating);
    }

    // 17. Stock Availability
    if (inStockOnly) {
      result = result.filter(p => Number(p.stock_quantity || 0) > 0);
    }

    // 18. Discount Filter
    if (minDiscount > 0) {
      result = result.filter(p => Number(p.discount_percentage || 0) >= minDiscount);
    }

    // 19. Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
    } else if (sortBy === 'discount') {
      result.sort((a, b) => Number(b.discount_percentage || 0) - Number(a.discount_percentage || 0));
    }

    return result;
  }, [
    sellerProducts, selectedSection, selectedCategory, selectedSubcategory, selectedChildCategory, searchQuery,
    selectedPriceTiers, appliedMinPrice, appliedMaxPrice,
    selectedFabrics, selectedFits, selectedCollars, selectedSleeves, selectedPatterns,
    selectedOccasions, selectedColors, selectedSizes, selectedBrands, selectedMaterials, filterType, minRating, inStockOnly,
    minDiscount, sortBy
  ]);

  // Counts for each specification to show in labels
  const specCounts = useMemo(() => {
    const pool = sellerProducts || [];
    const counts = {
      subcategories: {},
      brands: {},
      materials: {},
      fabrics: {},
      fits: {},
      collars: {},
      sleeves: {},
      patterns: {},
      occasions: {},
      colors: {},
      tiers: {},
      shopFor: { men: 0, women: 0, kids: 0 }
    };

    pool.forEach(p => {
      // Demographic count
      const gen = (p.gender || '').toString().toLowerCase();
      const rec = (p.recipient || '').toString().toLowerCase();
      const tags = toSafeLower(p.tags);
      const name = (p.name || '').toString().toLowerCase();

      const pSec = (p.section || '').toString().toLowerCase();
      if (!isExplicitWomanItem(p) && !isExplicitKidsItem(p) && (pSec === 'men' || gen === 'men' || /\b(men|mens|men's)\b/i.test(name) || /\b(men|mens|men's|him)\b/i.test(rec) || /\b(men|mens|men's)\b/i.test(tags))) {
        counts.shopFor.men++;
      }
      if (!isExplicitManItem(p) && !isExplicitKidsItem(p) && (isExplicitWomanItem(p) || pSec === 'women' || gen === 'women' || /\b(women|womens|women's|her|ladies)\b/i.test(rec) || /\b(women|womens|women's|ladies)\b/i.test(tags))) {
        counts.shopFor.women++;
      }
      if (pSec === 'kids' || gen === 'kids' || isExplicitKidsItem(p) || /\b(kid|kids|boy|boys|girl|girls|baby|toddler)\b/i.test(`${name} ${tags}`)) {
        counts.shopFor.kids++;
      }

      // Subcategories and child categories count
      if (p.subcategory) {
        const sRaw = p.subcategory.toLowerCase().trim();
        const sSlug = sRaw.replace(/\s+/g, '-');
        const sClean = sRaw.replace(/[^a-z0-9]/g, '');
        counts.subcategories[sRaw] = (counts.subcategories[sRaw] || 0) + 1;
        counts.subcategories[sSlug] = (counts.subcategories[sSlug] || 0) + 1;
        counts.subcategories[sClean] = (counts.subcategories[sClean] || 0) + 1;
      }
      if (p.childCategory) {
        const cRaw = p.childCategory.toLowerCase().trim();
        const cSlug = cRaw.replace(/\s+/g, '-');
        const cClean = cRaw.replace(/[^a-z0-9]/g, '');
        counts.subcategories[cRaw] = (counts.subcategories[cRaw] || 0) + 1;
        counts.subcategories[cSlug] = (counts.subcategories[cSlug] || 0) + 1;
        counts.subcategories[cClean] = (counts.subcategories[cClean] || 0) + 1;
      }

      const brand = (p.brand || p.seller_name || p.specifications?.Brand || '').toString().trim();
      if (brand) {
        counts.brands[brand] = (counts.brands[brand] || 0) + 1;
      }

      const material = (p.material || p.fabric || p.specifications?.Material || p.specifications?.Fabric || '').toString().trim();
      if (material) {
        const normalizedMaterial = titleCase(material.replace('100%', '').replace(/&/g, 'and').trim());
        if (normalizedMaterial) {
          counts.materials[normalizedMaterial] = (counts.materials[normalizedMaterial] || 0) + 1;
        }
      }

      const color = (p.color || '').toString().trim();
      if (color) {
        const normalizedColor = getColorMeta(color).name;
        counts.colors[normalizedColor] = (counts.colors[normalizedColor] || 0) + 1;
      }

      // If shirts, count attributes
      const isShirt = (p.subcategory || '').toLowerCase() === 'shirts' || tags.includes('shirt');
      if (isShirt) {
        const fab = (p.fabric || p.specifications?.Fabric || '').toLowerCase();
        SHIRT_SPECIFICATIONS.fabrics.forEach(f => {
          if (fab.includes(f.toLowerCase().replace('100%', '').trim()) || fab.includes(f.toLowerCase())) {
            counts.fabrics[f] = (counts.fabrics[f] || 0) + 1;
          }
        });

        const fit = (p.fit || p.specifications?.Fit || '').toLowerCase();
        SHIRT_SPECIFICATIONS.fits.forEach(ft => {
          if (fit.includes(ft.toLowerCase())) {
            counts.fits[ft] = (counts.fits[ft] || 0) + 1;
          }
        });

        const col = (p.collar || p.specifications?.Collar || '').toLowerCase();
        SHIRT_SPECIFICATIONS.collars.forEach(c => {
          const keyWords = c.toLowerCase().split(/[\/\s]+/);
          if (keyWords.some(k => k.length > 3 && col.includes(k))) {
            counts.collars[c] = (counts.collars[c] || 0) + 1;
          }
        });

        const slv = (p.sleeve || p.specifications?.['Sleeve Length'] || '').toLowerCase();
        SHIRT_SPECIFICATIONS.sleeves.forEach(s => {
          if (slv.includes(s.toLowerCase().replace('sleeves', '').trim())) {
            counts.sleeves[s] = (counts.sleeves[s] || 0) + 1;
          }
        });

        const pat = (p.pattern || p.specifications?.Pattern || '').toLowerCase();
        SHIRT_SPECIFICATIONS.patterns.forEach(pt => {
          if (pat.includes(pt.toLowerCase())) {
            counts.patterns[pt] = (counts.patterns[pt] || 0) + 1;
          }
        });

        const occ = (p.occasion || p.specifications?.Occasion || '').toLowerCase();
        SHIRT_SPECIFICATIONS.occasions.forEach(o => {
          const words = o.toLowerCase().split(/[\/\s]+/);
          if (words.some(w => w.length > 3 && occ.includes(w))) {
            counts.occasions[o] = (counts.occasions[o] || 0) + 1;
          }
        });
      }

      // Price tiers count
      const price = Number(p.price);
      PRICE_TIERS.forEach(t => {
        if (price >= t.min && price <= t.max) {
          counts.tiers[t.id] = (counts.tiers[t.id] || 0) + 1;
        }
      });
    });

    return counts;
  }, [sellerProducts]);

  const facetOptions = useMemo(() => {
    const matchesCurrentScope = (p) => {
      if (selectedSection && selectedSection !== 'all') {
        const cleanSection = selectedSection.toLowerCase();
        const text = toSafeLower([p.section, p.gender, p.recipient, p.category, p.category_name, p.tags, p.name].filter(Boolean).join(' '));
        if (cleanSection === 'men' && (isExplicitWomanItem(p) || isExplicitKidsItem(p))) return false;
        if (cleanSection === 'women' && (isExplicitManItem(p) || isExplicitKidsItem(p))) return false;
        if (cleanSection === 'kids' && !/\b(kid|kids|boy|boys|girl|girls|baby|toddler|infant|children)\b/i.test(text)) return false;
        if (!['men', 'women', 'kids'].includes(cleanSection) && !productMatchesSection(p, cleanSection)) return false;
      }
      if (selectedCategory && selectedCategory !== 'all' && !productMatchesCategory(p, selectedCategory)) return false;
      if (selectedSubcategory && selectedSubcategory !== 'all') {
        const cleanSub = compactSlug(selectedSubcategory);
        const productSub = [
          p.subcategory,
          p.childCategory,
          p.child_category,
          p.tags,
          p.name,
          p.description
        ].filter(Boolean).map(compactSlug).join(' ');
        if (!productSub.includes(cleanSub)) return false;
      }
      return true;
    };

    const brands = new Map();
    const materials = new Map();
    const colors = new Map();
    const sizes = new Map();
    const scopedProducts = (sellerProducts || []).filter(matchesCurrentScope);

    scopedProducts.forEach((p) => {
      const brand = (p.brand || p.seller_name || p.specifications?.Brand || '').toString().trim();
      if (brand) brands.set(brand, (brands.get(brand) || 0) + 1);

      const material = (p.material || p.fabric || p.specifications?.Material || p.specifications?.Fabric || '').toString().trim();
      if (material) {
        const label = titleCase(material.replace('100%', '').replace(/&/g, 'and').trim());
        if (label) materials.set(label, (materials.get(label) || 0) + 1);
      }

      const color = (p.color || '').toString().trim();
      if (color) {
        const meta = getColorMeta(color);
        colors.set(meta.name, {
          ...meta,
          count: (colors.get(meta.name)?.count || 0) + 1
        });
      }

      const prodSizes = Array.isArray(p.sizes) && p.sizes.length > 0 
        ? p.sizes 
        : ['S', 'M', 'L', 'XL', '2XL'];
      prodSizes.forEach(size => {
        sizes.set(size, (sizes.get(size) || 0) + 1);
      });
    });

    return {
      brands: Array.from(brands, ([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count).slice(0, 12),
      materials: Array.from(materials, ([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      colors: Array.from(colors.values()).sort((a, b) => b.count - a.count).slice(0, 12),
      sizes: Array.from(sizes, ([label, count]) => ({ label, count })).sort((a, b) => SHIRT_SPECIFICATIONS.sizes.indexOf(a.label) - SHIRT_SPECIFICATIONS.sizes.indexOf(b.label))
    };
  }, [sellerProducts, selectedSection, selectedCategory, selectedSubcategory]);

  // Subcategories for the Image Hero Explore row
  const availableSubcategoriesForHero = useMemo(() => {
    if (isShirtsPage) {
      return [
        { slug: 'casual-shirts', label: 'Casual Shirts' },
        { slug: 'formal-shirts', label: 'Work & Formal' },
        { slug: 'linen-shirts', label: 'Pure Linen' },
        { slug: 'embroidered', label: 'Embroidered' }
      ];
    }

    const currentCatSlug = (selectedCategory && selectedCategory !== 'all') ? selectedCategory : 'clothing';
    const sectionsList = categorySections[currentCatSlug] || [];
    const activeSectionData = ['men', 'women', 'kids'].includes(selectedSection)
      ? sectionsList.find(s => s.slug === selectedSection) || sectionsList[0]
      : sectionsList[0];

    const rawSubs = activeSectionData?.items || [];
    return rawSubs.map(s => {
      const cleanSlug = (s.slug || '').toLowerCase().trim();
      const count = specCounts?.subcategories?.[cleanSlug] || 0;
      return {
        slug: s.slug,
        raw: cleanSlug,
        label: s.label,
        count
      };
    });
  }, [selectedCategory, selectedSection, isShirtsPage, specCounts]);

  // Active filters list for chips row
  const activeFiltersList = useMemo(() => {
    const list = [];

    if (selectedSection && selectedSection !== 'all' && !isDirectShirtRoute) {
      list.push({
        id: 'section',
        label: `Shop For: ${selectedSection.toUpperCase()}`,
        clear: () => handleShopForChange('all')
      });
    }

    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'clothing') {
      list.push({
        id: 'category',
        label: `Category: ${selectedCategory}`,
        clear: () => handleCategorySelect('all')
      });
    }

    if (selectedSubcategory && selectedSubcategory !== 'all' && !isDirectShirtRoute) {
      list.push({
        id: 'subcategory',
        label: `Subcategory: ${selectedSubcategory}`,
        clear: () => handleSubcategorySelect('all')
      });
    }

    if (selectedChildCategory && selectedChildCategory !== 'all') {
      const match = SAREE_SUBCATEGORIES.find(s => s.slug === selectedChildCategory);
      list.push({
        id: 'childCategory',
        label: `Saree Type: ${match ? match.label : selectedChildCategory.replace(/-/g, ' ')}`,
        clear: () => handleChildCategorySelect('all')
      });
    }

    selectedPriceTiers.forEach(tId => {
      const tier = PRICE_TIERS.find(t => t.id === tId);
      if (tier) {
        list.push({
          id: `price-${tId}`,
          label: `Price: ${tier.label}`,
          clear: () => toggleSelection(tId, selectedPriceTiers, setSelectedPriceTiers)
        });
      }
    });

    if (appliedMinPrice !== null || appliedMaxPrice !== null) {
      list.push({
        id: 'custom-price',
        label: `Price: ₹${appliedMinPrice || 0} – ₹${appliedMaxPrice || '∞'}`,
        clear: handleClearCustomPrice
      });
    }

    selectedFabrics.forEach(f => {
      list.push({
        id: `fabric-${f}`,
        label: `Fabric: ${f}`,
        clear: () => toggleSelection(f, selectedFabrics, setSelectedFabrics)
      });
    });

    selectedFits.forEach(fit => {
      list.push({
        id: `fit-${fit}`,
        label: `Fit: ${fit}`,
        clear: () => toggleSelection(fit, selectedFits, setSelectedFits)
      });
    });

    selectedCollars.forEach(c => {
      list.push({
        id: `collar-${c}`,
        label: `Collar: ${c}`,
        clear: () => toggleSelection(c, selectedCollars, setSelectedCollars)
      });
    });

    selectedSleeves.forEach(s => {
      list.push({
        id: `sleeve-${s}`,
        label: `Sleeve: ${s}`,
        clear: () => toggleSelection(s, selectedSleeves, setSelectedSleeves)
      });
    });

    selectedPatterns.forEach(p => {
      list.push({
        id: `pattern-${p}`,
        label: `Pattern: ${p}`,
        clear: () => toggleSelection(p, selectedPatterns, setSelectedPatterns)
      });
    });

    selectedOccasions.forEach(o => {
      list.push({
        id: `occasion-${o}`,
        label: `Occasion: ${o}`,
        clear: () => toggleSelection(o, selectedOccasions, setSelectedOccasions)
      });
    });

    selectedColors.forEach(c => {
      list.push({
        id: `color-${c}`,
        label: `Color: ${c}`,
        clear: () => toggleSelection(c, selectedColors, setSelectedColors)
      });
    });

    selectedBrands.forEach(b => {
      list.push({
        id: `brand-${b}`,
        label: `Brand: ${b}`,
        clear: () => toggleSelection(b, selectedBrands, setSelectedBrands)
      });
    });

    selectedMaterials.forEach(m => {
      list.push({
        id: `material-${m}`,
        label: `${isClothingPage ? 'Fabric' : 'Material'}: ${m}`,
        clear: () => toggleSelection(m, selectedMaterials, setSelectedMaterials)
      });
    });

    selectedSizes.forEach(s => {
      list.push({
        id: `size-${s}`,
        label: `Size: ${s}`,
        clear: () => toggleSelection(s, selectedSizes, setSelectedSizes)
      });
    });

    if (minRating > 0) {
      list.push({
        id: 'rating',
        label: `Rating: ${minRating}+ Stars`,
        clear: () => setMinRating(0)
      });
    }

    if (inStockOnly) {
      list.push({
        id: 'stock',
        label: 'In Stock Only',
        clear: () => setInStockOnly(false)
      });
    }

    if (minDiscount > 0) {
      list.push({
        id: 'discount',
        label: `${minDiscount}% Off & Up`,
        clear: () => setMinDiscount(0)
      });
    }

    if (searchQuery.trim()) {
      list.push({
        id: 'search',
        label: `"${searchQuery}"`,
        clear: () => setSearchQuery('')
      });
    }

    return list;
  }, [
    selectedSection, selectedCategory, selectedSubcategory, isDirectShirtRoute,
    selectedPriceTiers, appliedMinPrice, appliedMaxPrice,
    selectedFabrics, selectedFits, selectedCollars, selectedSleeves, selectedPatterns,
    selectedOccasions, selectedColors, selectedSizes, selectedBrands, selectedMaterials, minRating, inStockOnly, minDiscount, searchQuery
  ]);

  const activeFiltersCount = activeFiltersList.length;
  const showDemographicDepartmentFilter = isClothingPage || ['clothing', 'western-wear', 'ethnic-wear', 'fashion', 'footwear', 'accessories', 'kids'].includes((selectedCategory || '').toLowerCase());

  // Reset page to 1 when category, subcategory, or active filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedSection, selectedCategory, selectedSubcategory, isDirectShirtRoute,
    selectedPriceTiers, appliedMinPrice, appliedMaxPrice,
    selectedFabrics, selectedFits, selectedCollars, selectedSleeves, selectedPatterns,
    selectedOccasions, selectedColors, selectedSizes, selectedBrands, selectedMaterials, minRating, inStockOnly, minDiscount, searchQuery
  ]);

  // Pagination calculation - 1 page pagination (2 products per category)
  const totalProducts = filteredProducts.length;
  const totalPages = 1;
  const pageSize = Math.max(1, totalProducts);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Category-specific metadata & curated subcategories for lightning-fast, accurate filtering
  const CATEGORY_META = {
    men: { title: "Men's Fashion" },
    women: { title: "Women's Fashion" },
    kids: { title: 'Kids & Baby' },
    home: { title: 'Home & Kitchen' },
    beauty: { title: 'Beauty & Grooming' },
    pooja: { title: 'Pooja & Spiritual' },
    grocery: { title: 'Grocery & Pantry' },
    pet: { title: 'Pet Accessories' },
    electronics: { title: 'Electronics & Audio' },
    all: { title: 'All Collections' }
  };

  const CATEGORY_SUBCATEGORIES = {
    men: [
      { slug: 'all', label: 'All Men' },
      { slug: 'shirts', label: 'Casual & Formal Shirts' },
      { slug: 't-shirts', label: 'T-Shirts & Polos' },
      { slug: 'kurtas', label: 'Kurtas & Ethnic Wear' },
      { slug: 'jackets', label: 'Jackets & Blazers' },
      { slug: 'jeans-jeggings', label: 'Jeans & Denims' },
      { slug: 'trousers-pants', label: 'Trousers & Chinos' },
      { slug: 'track-pants', label: 'Track Pants & Joggers' },
      { slug: 'casual-shoes', label: 'Sneakers & Casual Shoes' },
      { slug: 'formal-shoes', label: 'Formal Shoes & Loafers' },
      { slug: 'sandals', label: 'Sandals & Floaters' },
      { slug: 'wallets', label: 'Belts & Wallets' },
      { slug: 'watches', label: 'Watches' }
    ],
    women: [
      { slug: 'all', label: 'All Women' },
      { slug: 'sarees', label: 'Sarees' },
      { slug: 'blouses', label: 'Blouses' },
      { slug: 'kurtas', label: 'Kurtas & Kurtis' },
      { slug: 'co-ord-sets', label: 'Co-ord Sets' },
      { slug: 'kurta-suit-sets', label: 'Suit Sets & Anarkalis' },
      { slug: 'dresses', label: 'Dresses & Gowns' },
      { slug: 'tops', label: 'Tops & Shirts' },
      { slug: 'jeans-jeggings', label: 'Jeans & Jeggings' },
      { slug: 'leggings', label: 'Leggings & Palazzos' },
      { slug: 'heels', label: 'Heels & Wedges' },
      { slug: 'flats', label: 'Flat Sandals & Slides' },
      { slug: 'handbags', label: 'Handbags & Totes' },
      { slug: 'jewellery', label: 'Fashion Jewellery' }
    ],
    kids: [
      { slug: 'all', label: 'All Kids' },
      { slug: 'shirts-tshirts', label: 'Shirts & T-Shirts' },
      { slug: 'jeans-shorts', label: 'Jeans & Shorts' },
      { slug: 'ethnic-sets', label: 'Ethnic Sets & Festive Wear' },
      { slug: 'dresses-frocks', label: 'Dresses & Frocks' },
      { slug: 'tops-skirts', label: 'Tops & Skirts' },
      { slug: 'baby-clothes', label: 'Baby Rompers & Onesies' },
      { slug: 'casual-shoes', label: 'Kids Casual Shoes' },
      { slug: 'sandals', label: 'Kids Sandals & Slippers' }
    ],
    home: [
      { slug: 'all', label: 'All Home & Living' },
      { slug: 'cookware-utensils', label: 'Cookware & Utensils' },
      { slug: 'dinner-sets', label: 'Dinner Sets & Plates' },
      { slug: 'storage-containers', label: 'Storage Containers' },
      { slug: 'water-bottles', label: 'Water Bottles & Flasks' },
      { slug: 'bedsheets', label: 'Bed Linen & Sheets' },
      { slug: 'curtains', label: 'Curtains & Drapes' },
      { slug: 'cushions', label: 'Cushions & Covers' },
      { slug: 'blankets-quilts', label: 'Blankets & Quilts' },
      { slug: 'wall-decor', label: 'Wall Decor & Clocks' },
      { slug: 'vases-plants', label: 'Vases & Artificial Plants' },
      { slug: 'lamps-lighting', label: 'Lamps & Lighting' },
      { slug: 'showpieces-figurines', label: 'Showpieces & Figurines' }
    ],
    beauty: [
      { slug: 'all', label: 'All Beauty' },
      { slug: 'face-creams-moisturizers', label: 'Face Creams & Moisturizers' },
      { slug: 'face-wash-cleansers', label: 'Face Wash & Cleansers' },
      { slug: 'sunscreen-serums', label: 'Sunscreen & Serums' },
      { slug: 'shampoo-conditioner', label: 'Shampoos & Conditioners' },
      { slug: 'hair-oils-serums', label: 'Hair Oils & Serums' },
      { slug: 'perfumes-deodorants', label: 'Perfumes & Deos' }
    ],
    pooja: [
      { slug: 'all', label: 'All Pooja Items' },
      { slug: 'idols-statues', label: 'Brass Idols & Statues' },
      { slug: 'home-temple-mandir', label: 'Home Temple / Mandir' },
      { slug: 'thalis', label: 'Puja Thalis & Bells' },
      { slug: 'brass-silver-pooja-items', label: 'Brass & Silver Items' },
      { slug: 'diyas-lamps', label: 'Brass Diyas & Deepams' },
      { slug: 'incense-fragrance', label: 'Incense & Fragrance' },
      { slug: 'pooja-samagri', label: 'Pooja Samagri' },
      { slug: 'rudraksha-spiritual', label: 'Rudraksha & Spiritual' },
      { slug: 'festival-pooja-kits', label: 'Festival Pooja Kits' }
    ],
    grocery: [
      { slug: 'all', label: 'All Groceries' },
      { slug: 'staples-grains', label: 'Staples & Grains' },
      { slug: 'dals-pulses', label: 'Dals & Pulses' },
      { slug: 'edible-oils-ghee', label: 'Edible Oils & Ghee' },
      { slug: 'spices-masalas', label: 'Spices & Masalas' },
      { slug: 'salt-sugar', label: 'Salt & Sugar' },
      { slug: 'dry-fruits-nuts', label: 'Dry Fruits & Nuts' },
      { slug: 'breakfast-cereals', label: 'Breakfast & Cereals' },
      { slug: 'biscuits-cookies', label: 'Biscuits & Cookies' },
      { slug: 'snacks-namkeen', label: 'Snacks & Namkeen' },
      { slug: 'tea-coffee', label: 'Tea & Coffee' },
      { slug: 'beverages', label: 'Beverages' }
    ],
    pet: [
      { slug: 'all', label: 'All Pet Accessories' },
      { slug: 'dog-food', label: 'Dog Food & Nutrition' },
      { slug: 'dog-treats', label: 'Dog Treats & Chews' },
      { slug: 'collars-leashes', label: 'Collars, Leashes & Harnesses' },
      { slug: 'dog-toys', label: 'Dog Toys & Play' },
      { slug: 'dog-beds', label: 'Dog Beds & Crates' },
      { slug: 'cat-food', label: 'Cat Supplies' },
      { slug: 'pet-shampoo', label: 'Pet Grooming & Hygiene' },
      { slug: 'pet-bowls', label: 'Bowls & Feeders' }
    ],
    electronics: [
      { slug: 'all', label: 'All Electronics' },
      { slug: 'headphones', label: 'Wireless Headphones' },
      { slug: 'speakers', label: 'Bluetooth Speakers' },
      { slug: 'earbuds', label: 'TWS True Wireless Earbuds' },
      { slug: 'soundbars', label: 'Soundbars & Home Audio' },
      { slug: 'smart-wearables', label: 'Smart Watches' },
      { slug: 'fitness-trackers', label: 'Fitness Trackers' },
      { slug: 'power-banks', label: 'Power Banks' },
      { slug: 'chargers-cables', label: 'Chargers & Cables' }
    ]
  };

  // Determine active category context
  const categoryContext = useMemo(() => {
    const sec = (selectedSection || '').toLowerCase();
    const cat = (selectedCategory || type || '').toLowerCase();

    if (cat === 'pooja-items' || cat === 'pooja' || cat === 'puja' || cat === 'puja-items') return 'pooja';
    if (cat === 'beauty' || cat === 'cosmetics' || cat === 'skincare') return 'beauty';
    if (cat === 'home-living' || cat === 'home-kitchen' || cat === 'kitchen' || cat === 'home') return 'home';
    if (cat === 'grocery-items' || cat === 'grocery' || cat === 'groceries') return 'grocery';
    if (cat === 'pet-accessories' || cat === 'pet' || cat === 'pets') return 'pet';
    if (cat === 'electronics' || cat === 'gadgets' || cat === 'audio') return 'electronics';
    if (sec === 'kids' || sec === 'boys' || sec === 'girls' || cat === 'kids' || ['boys-clothing', 'girls-clothing'].includes(cat)) return 'kids';
    if (sec === 'women' || cat === 'women' || cat === 'womens') return 'women';
    if (sec === 'men' || cat === 'men' || cat === 'mens' || isShirtsPage) return 'men';

    return 'all';
  }, [selectedSection, selectedCategory, type, isShirtsPage]);

  // Sidebar Controls (Category-Specific, Minimal, Fast Accessible & Sticky)
  const renderSidebarControls = () => {
    const currentMeta = CATEGORY_META[categoryContext] || CATEGORY_META.all;
    const subcats = CATEGORY_SUBCATEGORIES[categoryContext] || dynamicSubcategories;

    return (
      <div className="space-y-4 text-left text-stone-800 text-xs">
        {/* 1. Header: Refine By & Clear All */}
        <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <SlidersHorizontal size={13} className="text-orange-600" /> Refine By
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-orange-50 text-orange-700 border border-orange-200/70">
                <span>{currentMeta.title}</span>
              </span>
              {activeFiltersCount > 0 && (
                <span className="text-[10px] text-stone-500 font-semibold">
                  ({activeFiltersCount})
                </span>
              )}
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearAllFilters}
              className="text-[11px] font-bold text-orange-600 hover:text-orange-800 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={11} /> Reset
            </button>
          )}
        </div>

        {/* 2. For 'All' Catalog: Clean 1-Click Category Badges */}
        {categoryContext === 'all' && (
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-1.5">
              Explore Department
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Men', action: () => handleShopForChange('men') },
                { label: 'Women', action: () => handleShopForChange('women') },
                { label: 'Kids', action: () => handleShopForChange('kids') },
                { label: 'Home & Kitchen', action: () => handleCategorySelect('home-living') },
                { label: 'Beauty', action: () => handleCategorySelect('beauty') },
                { label: 'Pooja Items', action: () => handleCategorySelect('pooja-items') },
                { label: 'Grocery', action: () => handleCategorySelect('grocery-items') },
                { label: 'Pet Care', action: () => handleCategorySelect('pet-accessories') },
                { label: 'Electronics', action: () => handleCategorySelect('electronics') }
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={item.action}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-200 text-stone-700 hover:text-orange-600 text-[11px] font-bold transition-all text-left cursor-pointer hover:-translate-y-0.5 hover:shadow-2xs active:translate-y-0 active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Subcategories (Category-Specific, Compact & Fast) */}
        {subcats && subcats.length > 0 && (
          <div className="border-t border-stone-100 pt-3">
            <button
              onClick={() => toggleAccordion('subcategories')}
              className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer mb-2"
            >
              <span>Subcategories</span>
              {openSections.subcategories ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>

            {openSections.subcategories && (
              <div className="space-y-0.5 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
                {subcats.map((sub) => {
                  const isSelected = selectedSubcategory === sub.slug || (sub.slug === 'all' && (!selectedSubcategory || selectedSubcategory === 'all'));
                  return (
                    <button
                      key={sub.slug}
                      type="button"
                      onClick={() => handleSubcategorySelect(sub.slug)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11.5px] transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-orange-50 border border-orange-200 text-orange-600 font-bold shadow-2xs'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium'
                      }`}
                    >
                      <span className="truncate">{sub.label}</span>
                      {isSelected && <Check size={12} className="text-orange-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3B. Sarees Subcategories Filter (Sidebar Accordion) */}
        {(selectedSubcategory === 'sarees' || categoryContext === 'women') && (
          <div className="border-t border-stone-100 pt-3">
            <button
              onClick={() => toggleAccordion('sareeStyles')}
              className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer mb-2"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-orange-600" /> Saree Subcategories
              </span>
              {openSections.sareeStyles ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>

            {openSections.sareeStyles && (
              <div className="space-y-0.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                {SAREE_SUBCATEGORIES.map((sCat) => {
                  const isSelected = selectedChildCategory === sCat.slug || (sCat.slug === 'all' && (!selectedChildCategory || selectedChildCategory === 'all'));
                  const count = sCat.slug === 'all' 
                    ? specCounts?.subcategories?.['sarees'] || 0
                    : specCounts?.subcategories?.[sCat.slug] || 0;
                  return (
                    <button
                      key={sCat.slug}
                      type="button"
                      onClick={() => handleChildCategorySelect(sCat.slug)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11.5px] transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-orange-50 border border-orange-200 text-orange-600 font-bold shadow-2xs'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium'
                      }`}
                    >
                      <span className="truncate">{sCat.label}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {count > 0 && <span className="text-[10px] text-stone-400 font-medium">({count})</span>}
                        {isSelected && <Check size={12} className="text-orange-600 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 4. Category-Specific Accurate Facets */}
        {/* 4A. MEN: Sizes & Colors */}
        {categoryContext === 'men' && (
          <div className="border-t border-stone-100 pt-3 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-stone-900">
                  {selectedSubcategory.includes('shoe') ? 'Shoe Size (UK)' : 'Size'}
                </span>
                {selectedSizes.length > 0 && (
                  <button
                    onClick={() => { setSelectedSizes([]); setCurrentPage(1); }}
                    className="text-[10px] text-orange-600 hover:underline font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1">
                {(selectedSubcategory.includes('shoe') 
                  ? ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
                  : ['XS', 'S', 'M', 'L', 'XL', 'Free Size']
                ).map(sz => {
                  const isChecked = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSelection(sz, selectedSizes, setSelectedSizes)}
                      className={`py-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer text-center ${
                        isChecked
                          ? 'border-orange-600 bg-orange-600 text-white shadow-2xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {facetOptions.colors.length > 0 && (
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-stone-900 block mb-1.5">
                  Color
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {facetOptions.colors.slice(0, 8).map(c => {
                    const isChecked = selectedColors.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => toggleSelection(c.name, selectedColors, setSelectedColors)}
                        title={c.name}
                        className={`w-5 h-5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                          isChecked ? 'ring-2 ring-orange-500 ring-offset-1 scale-110' : 'border-stone-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isChecked && <Check size={9} className={c.name === 'White' || c.name === 'Beige' ? 'text-black' : 'text-white'} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4B. WOMEN: Sizes & Colors */}
        {categoryContext === 'women' && (
          <div className="border-t border-stone-100 pt-3 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-stone-900">
                  {selectedSubcategory.includes('heel') || selectedSubcategory.includes('flat') || selectedSubcategory.includes('shoe') ? 'Shoe Size (UK)' : 'Size'}
                </span>
                {selectedSizes.length > 0 && (
                  <button
                    onClick={() => { setSelectedSizes([]); setCurrentPage(1); }}
                    className="text-[10px] text-orange-600 hover:underline font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1">
                {(selectedSubcategory.includes('heel') || selectedSubcategory.includes('flat') || selectedSubcategory.includes('shoe')
                  ? ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8']
                  : ['XS', 'S', 'M', 'L', 'XL', 'Free Size']
                ).map(sz => {
                  const isChecked = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSelection(sz, selectedSizes, setSelectedSizes)}
                      className={`py-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer text-center ${
                        isChecked
                          ? 'border-orange-600 bg-orange-600 text-white shadow-2xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {facetOptions.colors.length > 0 && (
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-stone-900 block mb-1.5">
                  Color
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {facetOptions.colors.slice(0, 8).map(c => {
                    const isChecked = selectedColors.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => toggleSelection(c.name, selectedColors, setSelectedColors)}
                        title={c.name}
                        className={`w-5 h-5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                          isChecked ? 'ring-2 ring-orange-500 ring-offset-1 scale-110' : 'border-stone-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isChecked && <Check size={9} className={c.name === 'White' || c.name === 'Beige' ? 'text-black' : 'text-white'} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4C. KIDS: Demographic (Boys / Girls) & Age Size */}
        {categoryContext === 'kids' && (
          <div className="border-t border-stone-100 pt-3 space-y-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-stone-900 block mb-1.5">
                Demographic
              </span>
              <div className="grid grid-cols-3 gap-1 p-0.5 bg-stone-100 rounded-xl">
                {[
                  { id: 'all', label: 'All Kids' },
                  { id: 'boys', label: 'Boys' },
                  { id: 'girls', label: 'Girls' }
                ].map(d => {
                  const isSelected = (d.id === 'all' && (!selectedSection || selectedSection === 'kids' || selectedSection === 'all')) || selectedSection === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleShopForChange(d.id === 'all' ? 'kids' : d.id)}
                      className={`py-1 rounded-lg text-[11px] font-bold transition-all text-center cursor-pointer ${
                        isSelected ? 'bg-orange-600 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-stone-900">
                  {selectedSubcategory.includes('shoe') || selectedSubcategory.includes('sandals') ? 'Shoe Size (UK)' : 'Size'}
                </span>
                {selectedSizes.length > 0 && (
                  <button
                    onClick={() => { setSelectedSizes([]); setCurrentPage(1); }}
                    className="text-[10px] text-orange-600 hover:underline font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1">
                {(selectedSubcategory.includes('shoe') || selectedSubcategory.includes('sandals')
                  ? ['UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12', 'UK 13', 'UK 1', 'UK 2']
                  : ['XS', 'S', 'M', 'L', 'XL', 'Free Size']
                ).map(sz => {
                  const isChecked = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSelection(sz, selectedSizes, setSelectedSizes)}
                      className={`py-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer text-center ${
                        isChecked
                          ? 'border-orange-600 bg-orange-600 text-white shadow-2xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4D. HOME & LIVING: Materials */}
        {categoryContext === 'home' && (
          <div className="border-t border-stone-100 pt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-stone-900">
                Material & Finish
              </span>
              {selectedMaterials.length > 0 && (
                <button
                  onClick={() => { setSelectedMaterials([]); setCurrentPage(1); }}
                  className="text-[10px] text-orange-600 hover:underline font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {[
                'Tri-Ply Stainless Steel', 'Cast Iron', 'Pure Brass', '100% Cotton',
                'Borosilicate Glass', 'Ceramic', 'Sheesham Wood', 'Copper'
              ].map(mat => {
                const isChecked = selectedMaterials.some(m => m.toLowerCase().includes(mat.toLowerCase().split(' ')[0]));
                return (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => toggleSelection(mat.split(' ')[0], selectedMaterials, setSelectedMaterials)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                      isChecked
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {mat}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4E. BEAUTY: Target Routine */}
        {categoryContext === 'beauty' && (
          <div className="border-t border-stone-100 pt-3">
            <span className="text-xs font-black uppercase tracking-wider text-stone-900 block mb-1.5">
              Target Routine
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { label: 'Face Creams', sub: 'face-creams-moisturizers' },
                { label: 'Cleansers', sub: 'face-wash-cleansers' },
                { label: 'Sunscreen & Serums', sub: 'sunscreen-serums' },
                { label: 'Shampoos', sub: 'shampoo-conditioner' },
                { label: 'Hair Oils', sub: 'hair-oils-serums' }
              ].map(item => {
                const isSelected = selectedSubcategory === item.sub;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSubcategorySelect(item.sub)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4F. POOJA ITEMS: Sacred Materials */}
        {categoryContext === 'pooja' && (
          <div className="border-t border-stone-100 pt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-stone-900">
                Sacred Material
              </span>
              {selectedMaterials.length > 0 && (
                <button
                  onClick={() => { setSelectedMaterials([]); setCurrentPage(1); }}
                  className="text-[10px] text-orange-600 hover:underline font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {[
                'Pure Brass', 'German Silver', 'Teak Wood', 'Pure Copper', 'Panchdhatu', 'Marble'
              ].map(mat => {
                const isChecked = selectedMaterials.some(m => m.toLowerCase().includes(mat.toLowerCase().split(' ')[0]));
                return (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => toggleSelection(mat.split(' ')[0], selectedMaterials, setSelectedMaterials)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                      isChecked
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {mat}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4G. ELECTRONICS: Quick Gadgets Filter */}
        {categoryContext === 'electronics' && (
          <div className="border-t border-stone-100 pt-3">
            <span className="text-xs font-black uppercase tracking-wider text-stone-900 block mb-1.5">
              Popular Gadgets
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { label: 'Headphones', sub: 'headphones' },
                { label: 'Speakers', sub: 'speakers' },
                { label: 'TWS Earbuds', sub: 'earbuds' },
                { label: 'Soundbars', sub: 'soundbars' },
                { label: 'Smartwatches', sub: 'smart-wearables' },
                { label: 'Fitness Bands', sub: 'fitness-trackers' },
                { label: 'Power Banks', sub: 'power-banks' },
                { label: 'Chargers & Cables', sub: 'chargers-cables' }
              ].map(item => {
                const isSelected = selectedSubcategory === item.sub;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSubcategorySelect(item.sub)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4H. PET ACCESSORIES: Quick Essentials Filter */}
        {categoryContext === 'pet' && (
          <div className="border-t border-stone-100 pt-3">
            <span className="text-xs font-black uppercase tracking-wider text-stone-900 block mb-1.5">
              Pet Essentials
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { label: 'Dog Food', sub: 'dog-food' },
                { label: 'Treats & Chews', sub: 'dog-treats' },
                { label: 'Collars & Leashes', sub: 'collars-leashes' },
                { label: 'Dog Toys', sub: 'dog-toys' },
                { label: 'Beds & Crates', sub: 'dog-beds' },
                { label: 'Cat Care', sub: 'cat-food' },
                { label: 'Grooming', sub: 'pet-shampoo' },
                { label: 'Bowls', sub: 'pet-bowls' }
              ].map(item => {
                const isSelected = selectedSubcategory === item.sub;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSubcategorySelect(item.sub)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. Price Filter (Minimal Dual Chips + Custom Inputs) */}
        <div className="border-t border-stone-100 pt-3">
          <button
            onClick={() => toggleAccordion('price')}
            className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer mb-2"
          >
            <span>Price Range</span>
            {openSections.price ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>

          {openSections.price && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1.5">
                {PRICE_TIERS.slice(0, 4).map(tier => {
                  const isChecked = selectedPriceTiers.includes(tier.id);
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => toggleSelection(tier.id, selectedPriceTiers, setSelectedPriceTiers)}
                      className={`px-2 py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer text-center ${
                        isChecked
                          ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>

              {/* Custom Min/Max Input Box */}
              <form onSubmit={handleApplyCustomPrice} className="flex items-center gap-1.5 pt-1">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={customMinPrice}
                  onChange={(e) => setCustomMinPrice(e.target.value)}
                  className="w-full px-2 py-1 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:border-orange-500 text-stone-800"
                />
                <span className="text-stone-300 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={customMaxPrice}
                  onChange={(e) => setCustomMaxPrice(e.target.value)}
                  className="w-full px-2 py-1 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:border-orange-500 text-stone-800"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Go
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 6. Brand / Seller Filter (Scoped to Active Category) */}
        {facetOptions.brands.length > 0 && (
          <div className="border-t border-stone-100 pt-3">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => toggleAccordion('brands')}
                className="flex-grow flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
              >
                <span>Brands ({facetOptions.brands.length})</span>
                {openSections.brands ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              </button>
              {selectedBrands.length > 0 && (
                <button
                  onClick={() => { setSelectedBrands([]); setCurrentPage(1); }}
                  className="text-[10px] text-orange-600 hover:underline font-bold ml-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {openSections.brands && (
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                {facetOptions.brands.map(brand => {
                  const isChecked = selectedBrands.includes(brand.label);
                  return (
                    <label
                      key={brand.label}
                      className="flex items-center justify-between text-xs py-1 px-1 rounded-lg font-medium text-stone-700 hover:bg-stone-50 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
                          isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isChecked && <Check size={10} strokeWidth={3} />}
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelection(brand.label, selectedBrands, setSelectedBrands)}
                          className="sr-only"
                        />
                        <span className="truncate">{brand.label}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-normal flex-shrink-0">({brand.count})</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 7. Rating & In-Stock Availability (Clean Compact Strip) */}
        <div className="border-t border-stone-100 pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-stone-900">
              Customer Rating
            </span>
            {minRating > 0 && (
              <button
                onClick={() => { setMinRating(0); setCurrentPage(1); }}
                className="text-[10px] text-orange-600 hover:underline font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex gap-1.5">
            {[
              { rating: 4, label: '★ 4.0 & Up' },
              { rating: 3, label: '★ 3.0 & Up' }
            ].map(tier => {
              const isSelected = minRating === tier.rating;
              return (
                <button
                  key={tier.rating}
                  type="button"
                  onClick={() => {
                    setMinRating(isSelected ? 0 : tier.rating);
                    setCurrentPage(1);
                  }}
                  className={`flex-1 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-orange-600 text-white border-orange-600 font-bold shadow-2xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setInStockOnly(!inStockOnly);
                setCurrentPage(1);
              }}
              className={`w-full py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                inStockOnly
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold shadow-2xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${inStockOnly ? 'bg-emerald-500' : 'bg-stone-300'}`} />
              <span>In Stock Only</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-6 pb-24 min-h-screen bg-[#fdfbf9]">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Ajio-Inspired Breadcrumb Navigation */}
        <nav className="text-[11px] text-stone-400 font-medium mb-3 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-stone-800 transition-colors">Home</Link>
          <span>/</span>
          {isShirtsPage ? (
            <>
              <Link to="/collection/clothing?section=men" className="hover:text-stone-800 transition-colors">Men</Link>
              <span>/</span>
              <Link to="/collection/clothing?section=men&subcategory=western-wear" className="hover:text-stone-800 transition-colors">Western Wear</Link>
              <span>/</span>
              <span className="text-orange-600 font-bold">Shirts</span>
            </>
          ) : (
            <>
              <Link to="/products" className="hover:text-stone-800 transition-colors">Products</Link>
              {selectedSection !== 'all' && (
                <>
                  <span>/</span>
                  <span className="text-stone-700 font-semibold uppercase">{selectedSection}</span>
                </>
              )}
              {selectedCategory !== 'all' && (
                <>
                  <span>/</span>
                  <span className="text-orange-600 font-bold capitalize">{selectedCategory.replace(/-/g, ' ')}</span>
                </>
              )}
              {selectedSubcategory !== 'all' && (
                <>
                  <span>/</span>
                  <span className="text-stone-700 font-semibold capitalize">{selectedSubcategory.replace(/-/g, ' ')}</span>
                </>
              )}
              {selectedChildCategory && selectedChildCategory !== 'all' && (
                <>
                  <span>/</span>
                  <span className="text-orange-600 font-bold capitalize">
                    {SAREE_SUBCATEGORIES.find(s => s.slug === selectedChildCategory)?.label || selectedChildCategory.replace(/-/g, ' ')}
                  </span>
                </>
              )}
            </>
          )}
        </nav>

        {/* Top Product Page Header (Clean, Minimal & Fast) */}
        <div className="mb-4">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-stone-500">
                  {totalProducts > 0 
                    ? `1–${paginatedProducts.length} of ${totalProducts} results for` 
                    : '0 results for'}
                </span>
                <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                  "{pageHeading}"
                </h1>
                {activeFiltersCount > 0 && (
                  <span className="text-[11px] font-bold text-[#f76e28] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full ml-1">
                    {activeFiltersCount} applied
                  </span>
                )}
              </div>

              {/* Right Side: Sort dropdown & Mobile Filters button */}
              <div className="flex items-center gap-2.5 shrink-0">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearAllFilters}
                    className="text-xs text-[#f76e28] hover:text-[#de5713] hover:underline font-bold whitespace-nowrap cursor-pointer mr-1"
                  >
                    Clear all
                  </button>
                )}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-stone-500 font-medium hidden sm:inline">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-stone-50 hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold py-1.5 pl-3 pr-7 rounded-lg cursor-pointer focus:outline-none focus:border-[#f76e28] transition-colors"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Avg. Customer Review</option>
                      <option value="newest">Newest Arrivals</option>
                      <option value="discount">Discount: High to Low</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 hover:bg-stone-100 cursor-pointer"
                >
                  <SlidersHorizontal size={13} />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Saree Subcategories Horizontal Pill Slider */}
        {(selectedSubcategory === 'sarees' || (selectedCategory === 'ethnic-wear' && selectedSection === 'women' && selectedSubcategory === 'sarees')) && (
          <div className="mb-4 p-3 bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-stone-50 border border-orange-100 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-orange-600 animate-pulse" />
                <span className="text-xs font-black tracking-wide uppercase text-stone-800">Saree Subcategories</span>
              </div>
              <span className="text-[11px] font-medium text-stone-500">11 Styles</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {SAREE_SUBCATEGORIES.map((sCat) => {
                const isSelected = selectedChildCategory === sCat.slug || (sCat.slug === 'all' && (!selectedChildCategory || selectedChildCategory === 'all'));
                return (
                  <button
                    key={sCat.slug}
                    type="button"
                    onClick={() => handleChildCategorySelect(sCat.slug)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-200'
                        : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-200 shadow-2xs'
                    }`}
                  >
                    {sCat.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Minimal Amazon-Style Active Filter Tags */}
        {activeFiltersList.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4 text-xs">
            <span className="text-stone-400 text-[11px] font-semibold mr-1">Active:</span>
            {activeFiltersList.map((pill) => (
              <span
                key={pill.id}
                className="inline-flex items-center gap-1 bg-stone-100 text-stone-800 border border-stone-200 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              >
                <span>{pill.label}</span>
                <button
                  onClick={pill.clear}
                  className="hover:text-rose-600 cursor-pointer p-0.5 rounded-full"
                  title="Remove filter"
                >
                  <X size={10} strokeWidth={2.5} />
                </button>
              </span>
            ))}
            <button
              onClick={handleClearAllFilters}
              className="text-[11px] font-bold text-[#f76e28] hover:underline ml-2 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Respective Category Search Status Banner */}
        {searchQuery && (
          <div className="mb-5 bg-gradient-to-r from-orange-50 via-amber-50/40 to-orange-50 border border-orange-200/90 rounded-2xl p-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#f76e28] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles size={17} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-stone-600">Searched products:</span>
                    <span className="text-xs font-black text-stone-900 bg-white px-2.5 py-0.5 rounded-md border border-orange-200 shadow-2xs">
                      "{searchQuery}"
                    </span>
                    {selectedCategory && selectedCategory !== 'all' && (
                      <span className="text-xs font-bold text-orange-700 bg-orange-100/90 px-2.5 py-0.5 rounded-full border border-orange-200/60 flex items-center gap-1">
                        <span>Matched Category:</span>
                        <span className="underline">{selectedCategory === 'gadgets' ? 'Gadgets & Electronics' : titleCase(selectedCategory)}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-1 font-medium">
                    Showing <strong className="text-stone-800">{filteredProducts.length}</strong> matching products listed out in this category.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selectedCategory && selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('all')}
                    className="text-xs font-bold text-stone-700 hover:text-orange-600 px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    View in All Categories
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    const p = new URLSearchParams(searchParams);
                    p.delete('search');
                    setSearchParams(p);
                  }}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 px-2.5 py-1.5 hover:bg-orange-100/60 rounded-lg transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main 2-Column Catalog Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start min-h-[70vh]">
          
          {/* Desktop Left-Hand Sidebar ("Refine By" with Clean Hierarchy & Scroll) */}
          <aside className="hidden lg:block w-[265px] shrink-0 sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain bg-white border border-stone-200/80 p-4 rounded-2xl shadow-xs custom-scrollbar">
            {renderSidebarControls()}
          </aside>

          {/* Product Grid Area */}
          <div className="flex-grow w-full">
            
            {/* Products Counter & State Bar */}
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs font-bold text-stone-600">
                {totalProducts > 0 ? (
                  <><strong>{totalProducts}</strong> {totalProducts === 1 ? 'Item' : 'Items'} Found</>
                ) : (
                  '0 items found'
                )}
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-xs text-orange-600 hover:underline font-bold cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Loading State */}
            {initialLoading || loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-stone-200 rounded-2xl p-4 space-y-4 animate-pulse">
                    <div className="aspect-[3/4] bg-stone-100 rounded-xl" />
                    <div className="h-3 bg-stone-100 rounded w-1/3" />
                    <div className="h-4 bg-stone-100 rounded w-3/4" />
                    <div className="pt-2 flex justify-between items-center">
                      <div className="h-4 bg-stone-100 rounded w-1/4" />
                      <div className="w-8 h-8 rounded-full bg-stone-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : errorState ? (
              /* Error State */
              <div className="py-20 text-center max-w-md mx-auto bg-white border border-rose-200 rounded-2xl p-8 shadow-sm">
                <AlertCircle size={36} className="text-rose-500 mx-auto mb-3" />
                <h3 className="text-stone-800 font-bold text-base mb-1">Unable to Load Catalog</h3>
                <p className="text-stone-500 text-xs mb-6">{errorState}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : paginatedProducts.length > 0 ? (
              /* Success Product Grid */
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map(product => (
                    <motion.div
                      key={product.product_id || product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {/* 1 Page Pagination Controls */}
                <div className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Results Count & 1-Page Indicator */}
                  <div className="flex items-center gap-3 text-xs text-stone-600 font-medium">
                    <span>
                      Showing <strong className="text-stone-900 font-black">{totalProducts === 0 ? 0 : 1}</strong>–<strong className="text-stone-900 font-black">{totalProducts}</strong> of <strong className="text-stone-900 font-black">{totalProducts}</strong> products
                    </span>
                    <span className="text-stone-300">|</span>
                    <span className="text-orange-700 bg-orange-50 font-bold px-2.5 py-0.5 rounded-full text-[11px] border border-orange-200">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  {/* Page Navigation - 1 Page */}
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage <= 1}
                      className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-700 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-stone-50 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft size={14} />
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                      const pNum = idx + 1;
                      const isActive = currentPage === pNum;
                      return (
                        <button
                          key={`p-${pNum}`}
                          onClick={() => {
                            setCurrentPage(pNum);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#f76e28] text-white shadow-md shadow-[#f76e28]/25 scale-105'
                              : 'bg-white border border-stone-200 text-stone-700 hover:border-[#f76e28] hover:text-[#f76e28]'
                          }`}
                        >
                          {pNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage >= totalPages}
                      className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-700 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-stone-50 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                      aria-label="Next Page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State with Smart Relaxation & Suggestions */
              <div className="py-16 px-6 text-center max-w-lg mx-auto bg-white border border-orange-100/80 rounded-3xl p-8 shadow-xs">
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xs">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-stone-900 font-bold text-lg mb-1.5">No Matching Items Found</h3>
                <p className="text-stone-500 text-xs mb-5 leading-relaxed max-w-sm mx-auto">
                  We couldn't find products matching all your active criteria. Try removing one or more filters below to broaden your results.
                </p>

                {/* Individual Filter Removal Chips */}
                {activeFiltersList.length > 0 && (
                  <div className="mb-6 bg-stone-50 border border-stone-200/70 rounded-2xl p-3.5">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-2">
                      Active Constraints (Click to remove)
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {activeFiltersList.map((f, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={f.onRemove}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 hover:border-rose-300 hover:bg-rose-50 text-stone-700 hover:text-rose-600 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-2xs group"
                        >
                          <span>{f.label}</span>
                          <X size={12} className="text-stone-400 group-hover:text-rose-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleClearAllFilters}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <RotateCcw size={13} strokeWidth={2.5} />
                    <span>Reset All Filters</span>
                  </button>

                  <button
                    onClick={() => {
                      handleClearAllFilters();
                      navigate('/products');
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-orange-200 cursor-pointer"
                  >
                    Browse All Products
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-Up Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-[150] lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white border-t border-stone-200 rounded-t-3xl shadow-2xl z-[160] overflow-y-auto px-6 py-6 lg:hidden flex flex-col text-left"
            >
              <div className="flex justify-between items-center border-b border-stone-200 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-stone-900" />
                  <span className="text-xs font-black uppercase tracking-wider text-stone-900">Refine Products</span>
                </div>
                <button 
                  onClick={() => setMobileFiltersOpen(false)} 
                  className="text-stone-400 hover:text-stone-900 p-1.5 rounded-full cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-grow space-y-6 overflow-y-auto custom-scrollbar">
                {renderSidebarControls()}
              </div>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-orange-950 hover:bg-orange-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider mt-6 shadow-md cursor-pointer"
              >
                Show {totalProducts} Products
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;
