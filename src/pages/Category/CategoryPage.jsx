import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams, useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, RotateCcw, ArrowLeft, Star, ChevronDown, ChevronRight,
  SlidersHorizontal, Check, X, Search, ChevronLeft,
  Layers, AlertCircle, Laptop, Shirt, Home, BookOpen, Flower2, Dumbbell, Filter,
  Tag, CheckSquare, Square, ArrowRight
} from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { ProductContext } from '../../context/ProductContext/ProductContext';
import { useShop } from '../../context/ShopContext';
import { categoryService, MAIN_CATEGORIES } from '../../services/categoryService';
import { productService } from '../../services/productService';
import { categorySections, categorySubcategories as defaultCatSubs, departmentMegaMenu } from '../../data/categories';

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
  sizes: ['S', 'M', 'L', 'XL', 'XXL']
};

const PRICE_TIERS = [
  { id: 'under-500', label: 'Below ₹500', min: 0, max: 499 },
  { id: '500-1000', label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { id: '1001-1500', label: '₹1,001 – ₹1,500', min: 1001, max: 1500 },
  { id: '1501-2000', label: '₹1,501 – ₹2,000', min: 1501, max: 2000 },
  { id: '2001-2500', label: '₹2,001 – ₹2,500', min: 2001, max: 2500 },
  { id: 'over-2500', label: 'Above ₹2,500', min: 2501, max: Infinity }
];

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
  const urlCategoryParam = searchParams.get('category');
  const urlCategory = isDirectShirtRoute 
    ? 'clothing' 
    : (urlCategoryParam || (type && type !== 'all' && type !== 'products' ? type : 'all'));
  const urlSearch = searchParams.get('search') || '';
  const urlSubcat = isDirectShirtRoute 
    ? 'shirts' 
    : (searchParams.get('subcategory') || 'all');
  const urlSection = isDirectShirtRoute 
    ? 'men' 
    : (searchParams.get('section') || (searchParams.get('department') || 'all'));
  const urlDeal = searchParams.get('deal') || 'all';

  // Active Core Filters
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedSubcategory, setSelectedSubcategory] = useState(urlSubcat);
  const [selectedSection, setSelectedSection] = useState(urlSection);
  const [selectedBrands, setSelectedBrands] = useState([]);
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

  // Accordion open/close states in left sidebar
  const [openSections, setOpenSections] = useState({
    shopFor: true,
    categories: true,
    price: true,
    brands: true,
    fabric: true,
    fit: true,
    collar: true,
    sleeve: false,
    pattern: true,
    occasion: true,
    colors: false,
    sizes: false,
    discount: false,
    rating: false
  });

  const [showAllBrands, setShowAllBrands] = useState(false);
  const [brandSearchTerm, setBrandSearchTerm] = useState('');

  const itemsPerPage = 12;

  // Detect whether the current view is Men's Shirts (or Shirts generally)
  const isShirtsPage = useMemo(() => {
    if (isDirectShirtRoute) return true;
    const sub = (selectedSubcategory || '').toLowerCase();
    const sec = (selectedSection || '').toLowerCase();
    return sub === 'shirts' || sub === 'shirt';
  }, [isDirectShirtRoute, selectedSubcategory, selectedSection]);

  const isMenCategory = useMemo(() => {
    if (type === 'men-shirts') return true;
    const sec = (selectedSection || '').toLowerCase();
    return sec === 'men' || sec === 'mens';
  }, [type, selectedSection]);

  // Sync state when URL params change
  useEffect(() => {
    const isDirect = type === 'men-shirts' || type === 'shirts';
    const cCat = isDirect ? 'clothing' : (searchParams.get('category') || (type && type !== 'all' && type !== 'products' ? type : 'all'));
    const cSub = isDirect ? 'shirts' : (searchParams.get('subcategory') || 'all');
    const cSec = isDirect ? 'men' : (searchParams.get('section') || (searchParams.get('department') || 'all'));

    setSelectedCategory(cCat);
    setSearchQuery(urlSearch);
    setSelectedSubcategory(cSub);
    setSelectedSection(cSec);
    if (urlDeal && urlDeal !== 'all') {
      setFilterType(urlDeal);
    }
    if (urlSearch) {
      setSelectedBrands([]);
      setSelectedPriceTiers([]);
      setAppliedMinPrice(null);
      setAppliedMaxPrice(null);
      setSelectedFabrics([]);
      setSelectedFits([]);
      setSelectedCollars([]);
      setSelectedPatterns([]);
      setSelectedOccasions([]);
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

  const toggleAccordion = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

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

    const p = new URLSearchParams(searchParams);
    if (cSlug === 'all') {
      p.delete('category');
    } else {
      p.set('category', cSlug);
    }
    p.delete('subcategory');

    if (type && type !== cSlug && !isDirectShirtRoute) {
      navigate(`/products?${p.toString()}`);
    } else {
      setSearchParams(p);
    }
  };

  // Subcategory select handler
  const handleSubcategorySelect = (subSlug, secSlug, secCat) => {
    let targetSection = selectedSection;
    if (secSlug && ['men', 'women', 'kids'].includes(secSlug)) {
      targetSection = secSlug;
      if (selectedSection !== secSlug) {
        setSelectedSection(secSlug);
      }
    }
    const nextSub = selectedSubcategory === subSlug ? 'all' : subSlug;
    setSelectedSubcategory(nextSub);
    setCurrentPage(1);

    let targetCategory = selectedCategory;
    if (secCat && secCat !== 'all') {
      targetCategory = secCat;
      setSelectedCategory(secCat);
    } else if (secSlug && !['men', 'women', 'kids'].includes(secSlug)) {
      targetCategory = secSlug;
      setSelectedCategory(secSlug);
    }

    const p = new URLSearchParams(searchParams);
    if (targetSection && targetSection !== 'all') {
      p.set('section', targetSection);
    }
    if (targetCategory && targetCategory !== 'all') {
      p.set('category', targetCategory);
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
    setSelectedBrands([]);
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
              { label: 'T-Shirts & Polos', slug: 'boys-tshirts' },
              { label: 'Shirts', slug: 'boys-shirts' },
              { label: 'Jeans & Trousers', slug: 'boys-jeans' },
              { label: 'Shorts', slug: 'boys-shorts' }
            ]
          },
          {
            title: 'GIRLS CLOTHING',
            slug: 'girls-clothing',
            items: [
              { label: 'Dresses & Frocks', slug: 'girls-dresses' },
              { label: 'Tops & Tees', slug: 'girls-tops' },
              { label: 'Skirts & Shorts', slug: 'girls-skirts' },
              { label: 'Ethnic Wear', slug: 'girls-ethnic' }
            ]
          },
          {
            title: 'KIDS FOOTWEAR',
            slug: 'kids-footwear',
            items: [
              { label: 'Sneakers & Shoes', slug: 'kids-shoes' },
              { label: 'Sandals & Slippers', slug: 'kids-sandals' }
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

    // 1. Department / Shop For Filter
    if (selectedSection && selectedSection !== 'all') {
      const cleanSection = selectedSection.toLowerCase();
      result = result.filter(p => {
        const pGender = (p.gender || '').toLowerCase();
        const pRecipient = (p.recipient || '').toLowerCase();
        const pCat = (p.category || '').toLowerCase();
        const pTags = (p.tags || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();

        if (cleanSection === 'men') {
          if (pGender === 'men' || pGender === 'unisex' || pCat === 'mens' || pRecipient.includes('him') || pRecipient.includes('men')) return true;
          if (pTags.includes('unisex') || pTags.includes('men')) return true;
          if ((pName.includes("men's") || pName.includes("men ")) && !pName.includes("women") && !pTags.includes("women")) return true;
          return false;
        } else if (cleanSection === 'women') {
          if (pGender === 'women' || pGender === 'unisex' || pCat === 'women' || pRecipient.includes('her') || pRecipient.includes('women')) return true;
          if (pTags.includes('unisex') || pTags.includes('women') || pTags.includes('saree') || pTags.includes('kurti')) return true;
          if (pName.includes("women's") || pName.includes("women") || pTags.includes("saree") || pTags.includes("kurti")) return true;
          return false;
        } else if (cleanSection === 'kids' || cleanSection === 'boys' || cleanSection === 'girls') {
          if (pCat === 'kids' || pGender === 'kids' || pTags.includes('kids') || pTags.includes('boys') || pTags.includes('girls') || pTags.includes('baby')) return true;
          return false;
        } else {
          const pSection = (p.section || '').toLowerCase();
          if (pSection && pSection === cleanSection) return true;
          if (pTags.includes(cleanSection)) return true;
          return true;
        }
      });
    }

    // 2. Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      const cleanCat = selectedCategory.toLowerCase().trim();
      const cleanSub = (selectedSubcategory && selectedSubcategory !== 'all') 
        ? selectedSubcategory.toLowerCase().replace(/[^a-z0-9]/g, '') 
        : null;

      result = result.filter(p => {
        const cat = (p.category || p.category_name || '').toLowerCase();
        const pTags = (p.tags || '').toLowerCase();
        const pSub = (p.subcategory || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const pChild = (p.childCategory || p.child_category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const pName = (p.name || '').toLowerCase();

        // If a specific subcategory is chosen and this product directly matches it, allow it!
        if (cleanSub && (pSub === cleanSub || pChild === cleanSub || pSub.includes(cleanSub) || pChild.includes(cleanSub) || pTags.includes(cleanSub) || pName.includes(cleanSub))) {
          return true;
        }
        
        if (cleanCat === 'clothing') {
          return ['clothing', 'western-wear', 'ethnic-wear', 'winterwear', 'athleisure', 'night-lounge-wear', 'lingerie-innerwear', 'mens', 'women', 'kids', 'fashion'].includes(cat) || pTags.includes('clothing') || pTags.includes('apparel');
        } else if (cleanCat === 'footwear' || cleanCat === 'footwears' || cleanCat === 'shoes') {
          return cat === 'footwear' || cat === 'footwears' || cat === 'shoes' || pTags.includes('footwear') || pTags.includes('shoes') || pTags.includes('sneakers') || pTags.includes('boots') || pTags.includes('sandals') || pTags.includes('loafers') || pTags.includes('slippers') || pTags.includes('heels') || pName.includes('shoe') || pName.includes('sneaker') || pName.includes('boot') || pName.includes('sandal') || pName.includes('loafer') || pName.includes('clog') || pName.includes('slipper') || pName.includes('heel');
        } else if (cleanCat === 'ethnic-wear' || cleanCat === 'ethnic' || cleanCat === 'ethnic wear') {
          return cat === 'ethnic-wear' || cat === 'ethnic' || pTags.includes('ethnic') || pTags.includes('saree') || pTags.includes('kurta') || pTags.includes('kurti') || pTags.includes('lehenga') || pTags.includes('anarkali') || pTags.includes('sherwani') || pTags.includes('churidar') || pTags.includes('salwar') || pTags.includes('dupatta') || pName.includes('saree') || pName.includes('kurta') || pName.includes('kurti') || pName.includes('lehenga') || pName.includes('anarkali') || pName.includes('ethnic') || pName.includes('sherwani') || ['clothing', 'fashion', 'women', 'mens'].includes(cat);
        } else if (cleanCat === 'western-wear') {
          return cat === 'western-wear' || pTags.includes('western') || pTags.includes('shirt') || pTags.includes('jeans') || pTags.includes('tshirt') || pTags.includes('dress');
        } else if (cleanCat === 'accessories') {
          return cat === 'accessories' || pTags.includes('accessories') || pTags.includes('bag') || pTags.includes('belt') || pTags.includes('wallet') || pTags.includes('sunglasses') || pTags.includes('cap') || pTags.includes('watch') || pTags.includes('luggage') || pTags.includes('perfume') || pTags.includes('socks');
        } else if (cleanCat === 'home-kitchen' || cleanCat === 'home-living') {
          return cat === 'home-kitchen' || cat === 'home-living' || pTags.includes('home') || pTags.includes('kitchen');
        } else if (cleanCat === 'stationary' || cleanCat === 'stationery') {
          return cat === 'stationary' || cat === 'stationery' || cat === 'books' || pTags.includes('stationary') || pTags.includes('stationery') || pTags.includes('notebook') || pTags.includes('pen');
        } else if (cleanCat === 'pooja-items' || cleanCat === 'pooja' || cleanCat === 'pooja items') {
          return cat === 'pooja-items' || cat === 'pooja' || cat === 'pooja items' || pTags.includes('pooja') || pTags.includes('puja') || (p.category_name || '').toLowerCase().includes('pooja');
        } else if (cleanCat === 'grocery' || cleanCat === 'grocery-items' || cleanCat === 'groceries') {
          return cat === 'grocery' || cat === 'healthy-foods' || cat === 'groceries' || pTags.includes('grocery') || pTags.includes('food');
        } else {
          return cat === cleanCat || pTags.includes(cleanCat) || (p.category_name || '').toLowerCase().includes(cleanCat);
        }
      });
    }

    // 3. Subcategory Filter
    if (selectedSubcategory && selectedSubcategory !== 'all') {
      const cleanSub = selectedSubcategory.toLowerCase().replace(/[^a-z0-9]/g, '');
      const singularSub = cleanSub.endsWith('s') ? cleanSub.slice(0, -1) : cleanSub;
      result = result.filter(p => {
        const sub = (p.subcategory || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const child = (p.childCategory || p.child_category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const tags = (p.tags || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const name = (p.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const desc = (p.description || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        return sub === cleanSub || child === cleanSub || sub.includes(cleanSub) || child.includes(cleanSub) || tags.includes(cleanSub) || name.includes(cleanSub) || desc.includes(cleanSub)
          || (singularSub.length > 2 && (sub.includes(singularSub) || child.includes(singularSub) || tags.includes(singularSub) || name.includes(singularSub)));
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

    // 5. Brands Filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => p.brand && selectedBrands.includes(p.brand.trim()));
    }

    // 6. Price Tiers (multi-select)
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

    // 7. Custom Price Range (Min & Max inputs)
    if (appliedMinPrice !== null && !isNaN(appliedMinPrice)) {
      result = result.filter(p => Number(p.price) >= appliedMinPrice);
    }
    if (appliedMaxPrice !== null && !isNaN(appliedMaxPrice)) {
      result = result.filter(p => Number(p.price) <= appliedMaxPrice);
    }

    // 8. Shirt Fabric / Material Filter
    if (selectedFabrics.length > 0) {
      result = result.filter(p => {
        const pFab = (p.fabric || p.specifications?.Fabric || p.description || p.tags || '').toLowerCase();
        return selectedFabrics.some(f => pFab.includes(f.toLowerCase().replace('100%', '').trim()) || pFab.includes(f.toLowerCase()));
      });
    }

    // 9. Shirt Fit Filter
    if (selectedFits.length > 0) {
      result = result.filter(p => {
        const pFit = (p.fit || p.specifications?.Fit || p.name || p.description || p.tags || '').toLowerCase();
        return selectedFits.some(f => pFit.includes(f.toLowerCase()));
      });
    }

    // 10. Shirt Collar Filter
    if (selectedCollars.length > 0) {
      result = result.filter(p => {
        const pCol = (p.collar || p.specifications?.Collar || p.description || p.tags || '').toLowerCase();
        return selectedCollars.some(c => {
          const keyWords = c.toLowerCase().split(/[\/\s]+/);
          return keyWords.some(k => k.length > 3 && pCol.includes(k));
        });
      });
    }

    // 11. Shirt Sleeve Length Filter
    if (selectedSleeves.length > 0) {
      result = result.filter(p => {
        const pSlv = (p.sleeve || p.specifications?.['Sleeve Length'] || p.description || p.tags || '').toLowerCase();
        return selectedSleeves.some(s => pSlv.includes(s.toLowerCase().replace('sleeves', '').trim()));
      });
    }

    // 12. Shirt Pattern Filter
    if (selectedPatterns.length > 0) {
      result = result.filter(p => {
        const pPat = (p.pattern || p.specifications?.Pattern || p.name || p.description || p.tags || '').toLowerCase();
        return selectedPatterns.some(pt => pPat.includes(pt.toLowerCase()));
      });
    }

    // 13. Shirt Occasion Filter
    if (selectedOccasions.length > 0) {
      result = result.filter(p => {
        const pOcc = (p.occasion || p.specifications?.Occasion || p.tags || '').toLowerCase();
        return selectedOccasions.some(o => {
          const words = o.toLowerCase().split(/[\/\s]+/);
          return words.some(w => w.length > 3 && pOcc.includes(w));
        });
      });
    }

    // 14. Color Filter
    if (selectedColors.length > 0) {
      result = result.filter(p => {
        const pCol = (p.color || p.name || p.tags || '').toLowerCase();
        return selectedColors.some(c => pCol.includes(c.toLowerCase()));
      });
    }

    // 15. Size Filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => {
        const pSize = (p.size || p.tags || '').toUpperCase();
        return selectedSizes.some(s => pSize.includes(s.toUpperCase()));
      });
    }

    // 16. Promotional Tabs (All, New, Best Sellers, Top Deals)
    if (filterType === 'best' || filterType === 'best sellers') {
      result = result.filter(p => p.is_bestseller || p.rating >= 4.7);
    } else if (filterType === 'new' || filterType === 'new arrivals') {
      result = result.filter(p => p.is_new);
    } else if (filterType === 'sale' || filterType === 'top deals') {
      result = result.filter(p => (p.discount_percentage || 0) >= 20 || p.price < 5000);
    }

    // 17. Rating Filter
    if (minRating > 0) {
      result = result.filter(p => Number(p.rating || 0) >= minRating);
    }

    // 18. Stock Availability
    if (inStockOnly) {
      result = result.filter(p => Number(p.stock_quantity || 0) > 0);
    }

    // 19. Discount Filter
    if (minDiscount > 0) {
      result = result.filter(p => Number(p.discount_percentage || 0) >= minDiscount);
    }

    // 20. Sorting
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
    sellerProducts, selectedSection, selectedCategory, selectedSubcategory, searchQuery,
    selectedBrands, selectedPriceTiers, appliedMinPrice, appliedMaxPrice,
    selectedFabrics, selectedFits, selectedCollars, selectedSleeves, selectedPatterns,
    selectedOccasions, selectedColors, selectedSizes, filterType, minRating, inStockOnly,
    minDiscount, sortBy
  ]);

  // Available brands in the current context
  const availableBrands = useMemo(() => {
    const brandsSet = new Set();
    const countMap = {};
    (sellerProducts || []).forEach(p => {
      if (p.brand && p.brand.trim()) {
        const b = p.brand.trim();
        // If on shirts page, only count shirt brands
        if (isShirtsPage) {
          const sub = (p.subcategory || '').toLowerCase();
          const tags = (p.tags || '').toLowerCase();
          if (sub === 'shirts' || tags.includes('shirt')) {
            brandsSet.add(b);
            countMap[b] = (countMap[b] || 0) + 1;
          }
        } else {
          brandsSet.add(b);
          countMap[b] = (countMap[b] || 0) + 1;
        }
      }
    });

    let list = Array.from(brandsSet).sort().map(name => ({
      name,
      count: countMap[name] || 0
    }));

    if (brandSearchTerm.trim()) {
      const q = brandSearchTerm.toLowerCase();
      list = list.filter(b => b.name.toLowerCase().includes(q));
    }

    return list;
  }, [sellerProducts, isShirtsPage, brandSearchTerm]);

  // Counts for each specification to show in labels
  const specCounts = useMemo(() => {
    const pool = sellerProducts || [];
    const counts = {
      subcategories: {},
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
      const gen = (p.gender || '').toLowerCase();
      const rec = (p.recipient || '').toLowerCase();
      const tags = (p.tags || '').toLowerCase();
      const name = (p.name || '').toLowerCase();

      if (gen === 'men' || rec.includes('him') || rec.includes('men') || tags.includes('men')) {
        counts.shopFor.men++;
      }
      if (gen === 'women' || rec.includes('her') || rec.includes('women') || tags.includes('women')) {
        counts.shopFor.women++;
      }
      if (gen === 'kids' || tags.includes('kids') || tags.includes('boys') || tags.includes('girls') || (p.category || '').toLowerCase() === 'kids') {
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

    selectedBrands.forEach(b => {
      list.push({
        id: `brand-${b}`,
        label: `Brand: ${b}`,
        clear: () => toggleSelection(b, selectedBrands, setSelectedBrands)
      });
    });

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
        label: `Rating: ${minRating}★ & Up`,
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
    selectedBrands, selectedPriceTiers, appliedMinPrice, appliedMaxPrice,
    selectedFabrics, selectedFits, selectedCollars, selectedSleeves, selectedPatterns,
    selectedOccasions, selectedColors, selectedSizes, minRating, inStockOnly, minDiscount, searchQuery
  ]);

  const activeFiltersCount = activeFiltersList.length;

  // Pagination calculation
  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Sidebar Controls (Header Category Hierarchy + Material Specifications)
  const renderSidebarControls = () => (
    <div className="space-y-6 text-left">
      {/* Top Refine By Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-900">
            Refine By
          </h3>
          {activeFiltersCount > 0 && (
            <span className="text-[10px] text-orange-600 font-bold">
              {activeFiltersCount} applied
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearAllFilters}
            className="text-[11px] font-bold text-orange-600 hover:text-orange-800 hover:underline cursor-pointer flex items-center gap-1"
          >
            <RotateCcw size={11} /> Clear All
          </button>
        )}
      </div>

      {/* 1. Shop For (Audience / Demographic) */}
      <div className="border-b border-stone-100 pb-4">
        <button
          onClick={() => toggleAccordion('shopFor')}
          className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
        >
          <span>Shop For</span>
          {openSections.shopFor ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {openSections.shopFor && (
          <div className="mt-2.5 space-y-2">
            {[
              { id: 'men', label: 'Men', count: specCounts.shopFor.men },
              { id: 'women', label: 'Women', count: specCounts.shopFor.women },
              { id: 'kids', label: 'Kids', count: specCounts.shopFor.kids }
            ].map(item => {
              const isChecked = selectedSection === item.id || (isShirtsPage && item.id === 'men');
              return (
                <label
                  key={item.id}
                  className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleShopForChange(isChecked && selectedSection === item.id ? 'all' : item.id)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                    }`}>
                      {isChecked && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-[11px] text-stone-400 font-normal">({item.count})</span>
                  )}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Header Categories Hierarchy */}
      <div className="border-b border-stone-100 pb-4">
        <button
          onClick={() => toggleAccordion('categories')}
          className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
        >
          <span>Category</span>
          {openSections.categories ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {openSections.categories && (
          <div className="mt-2.5 space-y-3">
            {/* Show Header sections matching the active Shop For demographic or selected category */}
            {(() => {
              const activeDept = selectedSection === 'women' ? 'women' : (selectedSection === 'kids' ? 'kids' : 'men');
              const isSpecificDept = selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'clothing' && departmentMegaMenu?.[selectedCategory]?.sections?.length > 0;
              const deptData = isSpecificDept ? departmentMegaMenu[selectedCategory] : (headerDepartments[activeDept] || headerDepartments['men']);

              return (deptData?.sections || []).map(sec => {
                return (
                  <div key={sec.slug || sec.title} className="space-y-1.5">
                    <div className="text-[10.5px] font-black uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{sec.title}</span>
                    </div>

                    <div className="pl-3 space-y-1.5 border-l-2 border-orange-100">
                      {(sec.items || []).map(sub => {
                        const isSubSelected = selectedSubcategory === sub.slug || (isShirtsPage && sub.slug === 'shirts');
                        const cleanSlug = (sub.slug || '').toLowerCase().trim();
                        const cleanLabel = (sub.label || '').toLowerCase().trim();
                        const slugNorm = cleanSlug.replace(/[^a-z0-9]/g, '');
                        const labelNorm = cleanLabel.replace(/[^a-z0-9]/g, '');
                        const subCount = specCounts?.subcategories?.[cleanSlug] || specCounts?.subcategories?.[cleanLabel] || specCounts?.subcategories?.[slugNorm] || specCounts?.subcategories?.[labelNorm] || 0;

                        return (
                          <button
                            key={sub.slug}
                            onClick={() => handleSubcategorySelect(sub.slug, ['men', 'women', 'kids'].includes(activeDept) ? activeDept : undefined, sec.category)}
                            className={`w-full flex items-center justify-between text-xs py-0.5 text-left transition-colors cursor-pointer ${
                              isSubSelected
                                ? 'text-orange-600 font-bold'
                                : 'text-stone-600 hover:text-orange-600 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                                isSubSelected ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white'
                              }`}>
                                {isSubSelected && <Check size={10} strokeWidth={3} />}
                              </div>
                              <span className="truncate">{sub.label}</span>
                            </div>
                            {subCount > 0 ? (
                              <span className="text-[10px] text-stone-400 font-normal">({subCount})</span>
                            ) : sub.slug === 'shirts' && (
                              <span className="text-[10px] text-stone-400 font-normal">({totalProducts || 15})</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>

      {/* 3. Price Filter (Ajio Reference: Range Checkboxes + Min-Max Inputs) */}
      <div className="border-b border-stone-100 pb-4">
        <div className="flex items-center justify-between py-1">
          <button
            onClick={() => toggleAccordion('price')}
            className="flex-grow flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
          >
            <span>Price</span>
            {openSections.price ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          {selectedPriceTiers.length > 0 && (
            <button
              onClick={() => { setSelectedPriceTiers([]); setCurrentPage(1); }}
              className="text-[10px] text-orange-600 hover:underline font-bold ml-2 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {openSections.price && (
          <div className="mt-2.5 space-y-2">
            {PRICE_TIERS.map(tier => {
              const isChecked = selectedPriceTiers.includes(tier.id);
              const count = specCounts.tiers[tier.id] || 0;
              return (
                <label
                  key={tier.id}
                  className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelection(tier.id, selectedPriceTiers, setSelectedPriceTiers)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                    }`}>
                      {isChecked && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span>{tier.label}</span>
                  </div>
                  {count > 0 && <span className="text-[11px] text-stone-400 font-normal">({count})</span>}
                </label>
              );
            })}

            {/* Ajio-style Min & Max Custom Price Input Box */}
            <div className="pt-3 border-t border-stone-100/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                Enter Price Range
              </span>
              <form onSubmit={handleApplyCustomPrice} className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={customMinPrice}
                  onChange={(e) => setCustomMinPrice(e.target.value)}
                  className="w-16 px-2 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:border-orange-500 text-stone-800"
                />
                <span className="text-stone-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={customMaxPrice}
                  onChange={(e) => setCustomMaxPrice(e.target.value)}
                  className="w-16 px-2 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:border-orange-500 text-stone-800"
                />
                <button
                  type="submit"
                  className="p-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
                  title="Apply price filter"
                >
                  <ArrowRight size={13} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* 4. Brands Filter (Ajio Reference) */}
      <div className="border-b border-stone-100 pb-4">
        <div className="flex items-center justify-between py-1">
          <button
            onClick={() => toggleAccordion('brands')}
            className="flex-grow flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
          >
            <span>Brands</span>
            {openSections.brands ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
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
          <div className="mt-2.5 space-y-2">
            {availableBrands.length > 6 && (
              <div className="relative mb-2">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search brand..."
                  value={brandSearchTerm}
                  onChange={(e) => setBrandSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-[11px] bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500"
                />
              </div>
            )}

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {(showAllBrands ? availableBrands : availableBrands.slice(0, 6)).map(brand => {
                const isChecked = selectedBrands.includes(brand.name);
                return (
                  <label
                    key={brand.name}
                    className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelection(brand.name, selectedBrands, setSelectedBrands)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
                        isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                      }`}>
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                      <span className="truncate">{brand.name}</span>
                    </div>
                    {brand.count > 0 && (
                      <span className="text-[11px] text-stone-400 font-normal flex-shrink-0">({brand.count})</span>
                    )}
                  </label>
                );
              })}
            </div>

            {availableBrands.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllBrands(!showAllBrands)}
                className="text-[10px] font-black uppercase tracking-wider text-orange-600 hover:text-orange-800 hover:underline pt-1 cursor-pointer block"
              >
                {showAllBrands ? 'LESS' : `+ MORE (${availableBrands.length - 6})`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* 5. SHIRT SPECIFICATIONS (Only shown when browsing shirts as requested) */}
      {isShirtsPage && (
        <>
          {/* Fabric / Material (Key User Requirement!) */}
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between py-1">
              <button
                onClick={() => toggleAccordion('fabric')}
                className="flex-grow flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
              >
                <span>Fabric / Material</span>
                {openSections.fabric ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {selectedFabrics.length > 0 && (
                <button
                  onClick={() => { setSelectedFabrics([]); setCurrentPage(1); }}
                  className="text-[10px] text-orange-600 hover:underline font-bold ml-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {openSections.fabric && (
              <div className="mt-2.5 space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {SHIRT_SPECIFICATIONS.fabrics.map(fab => {
                  const isChecked = selectedFabrics.includes(fab);
                  const count = specCounts.fabrics[fab] || 0;
                  return (
                    <label
                      key={fab}
                      className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelection(fab, selectedFabrics, setSelectedFabrics)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
                          isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span className="truncate">{fab}</span>
                      </div>
                      {count > 0 && <span className="text-[11px] text-stone-400 font-normal flex-shrink-0">({count})</span>}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Fit */}
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between py-1">
              <button
                onClick={() => toggleAccordion('fit')}
                className="flex-grow flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
              >
                <span>Fit</span>
                {openSections.fit ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {selectedFits.length > 0 && (
                <button
                  onClick={() => { setSelectedFits([]); setCurrentPage(1); }}
                  className="text-[10px] text-orange-600 hover:underline font-bold ml-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {openSections.fit && (
              <div className="mt-2.5 space-y-2">
                {SHIRT_SPECIFICATIONS.fits.map(fit => {
                  const isChecked = selectedFits.includes(fit);
                  const count = specCounts.fits[fit] || 0;
                  return (
                    <label
                      key={fit}
                      className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelection(fit, selectedFits, setSelectedFits)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{fit}</span>
                      </div>
                      {count > 0 && <span className="text-[11px] text-stone-400 font-normal">({count})</span>}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Collar */}
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between py-1">
              <button
                onClick={() => toggleAccordion('collar')}
                className="flex-grow flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
              >
                <span>Collar</span>
                {openSections.collar ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {selectedCollars.length > 0 && (
                <button
                  onClick={() => { setSelectedCollars([]); setCurrentPage(1); }}
                  className="text-[10px] text-orange-600 hover:underline font-bold ml-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {openSections.collar && (
              <div className="mt-2.5 space-y-2">
                {SHIRT_SPECIFICATIONS.collars.map(col => {
                  const isChecked = selectedCollars.includes(col);
                  const count = specCounts.collars[col] || 0;
                  return (
                    <label
                      key={col}
                      className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelection(col, selectedCollars, setSelectedCollars)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
                          isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span className="truncate">{col}</span>
                      </div>
                      {count > 0 && <span className="text-[11px] text-stone-400 font-normal flex-shrink-0">({count})</span>}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sleeve Length */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleAccordion('sleeve')}
              className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
            >
              <span>Sleeve Length</span>
              {openSections.sleeve ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {openSections.sleeve && (
              <div className="mt-2.5 space-y-2">
                {SHIRT_SPECIFICATIONS.sleeves.map(slv => {
                  const isChecked = selectedSleeves.includes(slv);
                  const count = specCounts.sleeves[slv] || 0;
                  return (
                    <label
                      key={slv}
                      className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelection(slv, selectedSleeves, setSelectedSleeves)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{slv}</span>
                      </div>
                      {count > 0 && <span className="text-[11px] text-stone-400 font-normal">({count})</span>}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pattern */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleAccordion('pattern')}
              className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
            >
              <span>Pattern</span>
              {openSections.pattern ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {openSections.pattern && (
              <div className="mt-2.5 space-y-2">
                {SHIRT_SPECIFICATIONS.patterns.map(pat => {
                  const isChecked = selectedPatterns.includes(pat);
                  const count = specCounts.patterns[pat] || 0;
                  return (
                    <label
                      key={pat}
                      className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelection(pat, selectedPatterns, setSelectedPatterns)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{pat}</span>
                      </div>
                      {count > 0 && <span className="text-[11px] text-stone-400 font-normal">({count})</span>}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Occasion (Ajio Reference) */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleAccordion('occasion')}
              className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
            >
              <span>Occasion</span>
              {openSections.occasion ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {openSections.occasion && (
              <div className="mt-2.5 space-y-2">
                {SHIRT_SPECIFICATIONS.occasions.map(occ => {
                  const isChecked = selectedOccasions.includes(occ);
                  const count = specCounts.occasions[occ] || 0;
                  return (
                    <label
                      key={occ}
                      className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelection(occ, selectedOccasions, setSelectedOccasions)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{occ}</span>
                      </div>
                      {count > 0 && <span className="text-[11px] text-stone-400 font-normal">({count})</span>}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* 6. Colors */}
      <div className="border-b border-stone-100 pb-4">
        <button
          onClick={() => toggleAccordion('colors')}
          className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
        >
          <span>Colors</span>
          {openSections.colors ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {openSections.colors && (
          <div className="mt-3 flex flex-wrap gap-2">
            {SHIRT_SPECIFICATIONS.colors.map(c => {
              const isSelected = selectedColors.includes(c.name);
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => toggleSelection(c.name, selectedColors, setSelectedColors)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${c.border ? 'border border-stone-300' : ''}`}
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Sizes */}
      <div className="border-b border-stone-100 pb-4">
        <button
          onClick={() => toggleAccordion('sizes')}
          className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
        >
          <span>Size</span>
          {openSections.sizes ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {openSections.sizes && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {SHIRT_SPECIFICATIONS.sizes.map(size => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
                  className={`w-9 h-9 rounded-lg text-xs font-black transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-orange-400'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 8. Discounts */}
      <div className="border-b border-stone-100 pb-4">
        <button
          onClick={() => toggleAccordion('discount')}
          className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
        >
          <span>Discount</span>
          {openSections.discount ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {openSections.discount && (
          <div className="mt-2.5 space-y-2">
            {[
              { value: 0, label: 'All Discounts' },
              { value: 10, label: '10% or more' },
              { value: 20, label: '20% or more' },
              { value: 30, label: '30% or more' },
              { value: 50, label: '50% or more' }
            ].map(d => (
              <label key={d.value} className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none">
                <input
                  type="radio"
                  name="minDiscount"
                  checked={minDiscount === d.value}
                  onChange={() => {
                    setMinDiscount(d.value);
                    setCurrentPage(1);
                  }}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  minDiscount === d.value ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white'
                }`}>
                  {minDiscount === d.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span>{d.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 9. Customer Rating */}
      <div className="space-y-2.5">
        <button
          onClick={() => toggleAccordion('rating')}
          className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-stone-900 hover:text-orange-600 cursor-pointer"
        >
          <span>Customer Rating</span>
          {openSections.rating ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {openSections.rating && (
          <div className="space-y-2">
            {[
              { rating: 0, label: 'All Ratings' },
              { rating: 4, label: '4★ & Above' },
              { rating: 3, label: '3★ & Above' }
            ].map(tier => (
              <label key={tier.rating} className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 hover:text-orange-600 cursor-pointer select-none">
                <input
                  type="radio"
                  name="minRating"
                  checked={minRating === tier.rating}
                  onChange={() => {
                    setMinRating(tier.rating);
                    setCurrentPage(1);
                  }}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  minRating === tier.rating ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white'
                }`}>
                  {minRating === tier.rating && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="flex items-center gap-1">
                  {tier.label}
                  {tier.rating > 0 && <Star size={11} className="fill-orange-500 text-orange-500" />}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

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
            </>
          )}
        </nav>

        {/* Dynamic Category Showcase Header */}
        <div className="mb-6 border-b border-stone-200/70 pb-6">
          {isShirtsPage ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-400">MEN'S</span>
                <h1 className="text-3xl sm:text-4xl font-serif italic text-stone-900 tracking-tight">Shirts</h1>
              </div>

              {/* Quick Filter Pills Row for Shirt Styles */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { label: 'All Shirts', clear: true },
                  { label: 'Casual Shirts', type: 'occasion', val: 'Casual' },
                  { label: 'Work / Formal', type: 'occasion', val: 'Work / Formal' },
                  { label: 'Embroidered', type: 'pattern', val: 'Embroidered' },
                  { label: 'Pure Linen', type: 'fabric', val: 'Pure Linen' },
                  { label: '100% Pure Cotton', type: 'fabric', val: '100% Pure Cotton' },
                  { label: 'Button-Down Collar', type: 'collar', val: 'Button-Down Collar' },
                  { label: 'Spread Collar', type: 'collar', val: 'Spread Collar' },
                  { label: 'Mandarin Collar', type: 'collar', val: 'Mandarin / Band Collar' },
                  { label: 'Slim Fit', type: 'fit', val: 'Slim Fit' }
                ].map((pill, i) => {
                  let isActive = false;
                  if (pill.clear) {
                    isActive = selectedFabrics.length === 0 && selectedOccasions.length === 0 && selectedCollars.length === 0 && selectedPatterns.length === 0;
                  } else if (pill.type === 'occasion') {
                    isActive = selectedOccasions.includes(pill.val);
                  } else if (pill.type === 'fabric') {
                    isActive = selectedFabrics.includes(pill.val);
                  } else if (pill.type === 'collar') {
                    isActive = selectedCollars.includes(pill.val);
                  } else if (pill.type === 'pattern') {
                    isActive = selectedPatterns.includes(pill.val);
                  } else if (pill.type === 'fit') {
                    isActive = selectedFits.includes(pill.val);
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (pill.clear) {
                          setSelectedFabrics([]);
                          setSelectedOccasions([]);
                          setSelectedCollars([]);
                          setSelectedPatterns([]);
                          setSelectedFits([]);
                        } else if (pill.type === 'occasion') {
                          toggleSelection(pill.val, selectedOccasions, setSelectedOccasions);
                        } else if (pill.type === 'fabric') {
                          toggleSelection(pill.val, selectedFabrics, setSelectedFabrics);
                        } else if (pill.type === 'collar') {
                          toggleSelection(pill.val, selectedCollars, setSelectedCollars);
                        } else if (pill.type === 'pattern') {
                          toggleSelection(pill.val, selectedPatterns, setSelectedPatterns);
                        } else if (pill.type === 'fit') {
                          toggleSelection(pill.val, selectedFits, setSelectedFits);
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-orange-400 hover:text-orange-600'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : searchQuery.trim() ? (
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] text-orange-600 block mb-1 font-bold">
                Search Results ({filteredProducts.length} items found)
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif italic text-stone-900 flex items-center justify-center gap-2">
                <span>"{searchQuery.trim()}"</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    const p = new URLSearchParams(searchParams);
                    p.delete('search');
                    setSearchParams(p);
                  }}
                  className="p-1 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 cursor-pointer transition-colors"
                  title="Clear search"
                >
                  <X size={18} />
                </button>
              </h1>
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[9px] uppercase tracking-[0.45em] text-orange-600 block mb-1 font-black">
                GoMo Deals Boutique
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif italic text-stone-900">
                {selectedCategory !== 'all' ? selectedCategory.replace(/-/g, ' ').toUpperCase() : 'All Collections'}
              </h1>
            </div>
          )}
        </div>

        {/* Top Control Bar: Search, Promotional Tabs, Item Counter & Sorting */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-3.5 mb-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Keyword Search */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={isShirtsPage ? "Search shirts by fabric, collar, color or brand..." : "Search in catalog..."}
              className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Promotional Deal Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { key: 'all', label: 'All Items' },
              { key: 'best', label: 'Best Sellers' },
              { key: 'new', label: 'New Arrivals' },
              { key: 'sale', label: 'Top Deals' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setFilterType(tab.key);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-[10.5px] uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${
                  filterType === tab.key
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Mobile Filter Button & Sort */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-stone-200 hover:bg-stone-50 text-stone-800 rounded-xl cursor-pointer"
            >
              <SlidersHorizontal size={13} />
              <span>Refine {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 hidden sm:inline">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="featured">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Row (Ajio / Modern E-Commerce Standard) */}
        {activeFiltersList.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-orange-50/50 p-3.5 border border-orange-100/80 rounded-2xl w-full">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-955 mr-2 flex items-center gap-1.5">
              <Filter size={12} className="text-orange-600" /> Active Filters:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {activeFiltersList.map((pill) => (
                <span
                  key={pill.id}
                  className="flex items-center gap-1.5 bg-white border border-orange-200 text-orange-950 text-[10.5px] font-bold uppercase tracking-wider pl-3 pr-2 py-1 rounded-full shadow-2xs"
                >
                  {pill.label}
                  <button
                    onClick={pill.clear}
                    className="hover:bg-orange-100 p-0.5 rounded-full text-orange-400 hover:text-orange-800 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                    title="Remove filter"
                  >
                    <X size={10} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
              <button
                onClick={handleClearAllFilters}
                className="text-[9.5px] uppercase tracking-widest font-black text-orange-600 hover:text-orange-955 hover:underline px-3 py-1 cursor-pointer transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Main 2-Column Catalog Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start min-h-[70vh]">
          
          {/* Desktop Left-Hand Sidebar ("Refine By" with Header Hierarchy & Materials) */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24 bg-white border border-stone-200/80 p-5 rounded-3xl shadow-xs">
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                      <span>Prev</span>
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                      const pNum = idx + 1;
                      return (
                        <button
                          key={pNum}
                          onClick={() => {
                            setCurrentPage(pNum);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            currentPage === pNum
                              ? 'bg-orange-950 text-white shadow-md'
                              : 'bg-white border border-stone-200 text-stone-700 hover:border-orange-300'
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
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="py-20 text-center max-w-md mx-auto bg-white border border-orange-100 rounded-3xl p-8 shadow-sm">
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="text-stone-800 font-bold text-base mb-1">No Matching Items Found</h3>
                <p className="text-stone-500 text-xs mb-6 leading-relaxed">
                  We couldn't find any products matching your specific refinement filters. Try adjusting material, collar, price, or brand choices.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-950 hover:bg-orange-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <RotateCcw size={12} strokeWidth={2.5} />
                  Reset All Filters
                </button>
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
