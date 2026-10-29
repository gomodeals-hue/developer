import React, { useEffect, useState, useMemo, useRef, useLayoutEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  Check, 
  ShieldCheck, 
  RotateCcw, 
  Loader2, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle,
  Percent,
  Plus,
  CheckCircle2,
  X,
  Tag,
  MessageSquareQuote,
  Ruler
} from 'lucide-react';
import * as productService from '../../services/productService';
import VoiceOfCustomerModal from '../../components/Orders/VoiceOfCustomerModal';
import SizeChartModal from '../../components/common/SizeChartModal';
import { apiClient } from '../../services/apiClient';
import lottie from 'lottie-web';
import addToCartAnimationData from '../../assets/addToCartAnimation.json';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLiveStock } from '../../hooks/useRealtime';
import './ProductDetails.css';

const DEFAULT_CLOTHING_SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const DEFAULT_FOOTWEAR_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

// Accurate detector for bottomwear
export const isBottomwearProduct = (p) => {
  if (!p) return false;
  const cat = (p.category || p.category_name || '').toLowerCase();
  const sub = (p.subcategory || p.childCategory || '').toLowerCase();
  const name = (p.name || p.title || '').toLowerCase();
  const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : p.tags || '').toLowerCase();
  const combined = `${cat} ${sub} ${name} ${tags}`;
  const keywords = ['pant', 'pants', 'jeans', 'jean', 'trouser', 'trousers', 'chino', 'chinos', 'jogger', 'joggers', 'track pant', 'track-pant', 'denim', 'shorts'];
  return keywords.some(kw => combined.includes(kw));
};

// Accurate detector for clothing / apparel products
export const isClothingProduct = (p) => {
  if (!p) return false;
  const cat = (p.category || p.category_name || '').toLowerCase();
  const sub = (p.subcategory || '').toLowerCase();
  const name = (p.name || p.title || '').toLowerCase();
  const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : p.tags || '').toLowerCase();
  const combined = `${cat} ${sub} ${name} ${tags}`;

  // Strict non-clothing blacklist (Shoes, Pooja, Electronics, Home Decor, Beauty, Groceries, etc.)
  if (
    combined.includes('pooja') || combined.includes('puja') || combined.includes('shoe') ||
    combined.includes('footwear') || combined.includes('sneaker') || combined.includes('boot') ||
    combined.includes('loafer') || combined.includes('sandal') || combined.includes('chappal') ||
    combined.includes('electronic') || combined.includes('gadget') || combined.includes('mobile') ||
    combined.includes('phone') || combined.includes('laptop') || combined.includes('audio') ||
    combined.includes('headphone') || combined.includes('kitchen') || combined.includes('home') ||
    combined.includes('decor') || combined.includes('beauty') || combined.includes('cosmetic') ||
    combined.includes('perfume') || combined.includes('fragrance') || combined.includes('book') ||
    combined.includes('toy') || combined.includes('grocery') || combined.includes('diya') ||
    combined.includes('incense') || combined.includes('dhoop') || combined.includes('statue') ||
    combined.includes('idol') || combined.includes('brass') || combined.includes('gift set')
  ) {
    return false;
  }

  const clothingKeywords = [
    'clothing', 'apparel', 'fashion', 'shirt', 't-shirt', 'tshirt', 'pant', 'jeans',
    'trouser', 'kurta', 'kurti', 'saree', 'sari', 'dress', 'top', 'blouse', 'hoodie',
    'jacket', 'blazer', 'suit', 'sweater', 'cardigan', 'lehenga', 'ethnic', 'shorts',
    'tracksuit', 'polo', 'mens wear', 'womens wear', 'men wear', 'women wear', 'kids wear'
  ];
  return clothingKeywords.some(kw => combined.includes(kw));
};

// Accurate detector for footwear / shoes products
export const isFootwearProduct = (p) => {
  if (!p) return false;
  const cat = (p.category || p.category_name || '').toLowerCase();
  const sub = (p.subcategory || '').toLowerCase();
  const name = (p.name || p.title || '').toLowerCase();
  const tags = (Array.isArray(p.tags) ? p.tags.join(' ') : p.tags || '').toLowerCase();
  const combined = `${cat} ${sub} ${name} ${tags}`;

  const footwearKeywords = [
    'footwear', 'shoe', 'shoes', 'sneaker', 'sneakers', 'sandal', 'sandals', 'boot',
    'boots', 'loafer', 'loafers', 'heel', 'heels', 'chappal', 'slippers', 'flip flop'
  ];
  return footwearKeywords.some(kw => combined.includes(kw));
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const previewProduct = location.state?.previewProduct;
  const previewImage = location.state?.previewImage;
  const sourceImgRect = location.state?.sourceImgRect;

  // Check if preview product ID matches the URL param
  const isMatchingPreview = useMemo(() => {
    if (!previewProduct) return false;
    const pId = previewProduct.product_id || previewProduct.id;
    return String(pId) === String(id);
  }, [previewProduct, id]);

  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart, 
    formatPrice 
  } = useShop();

  const [product, setProduct] = useState(isMatchingPreview ? previewProduct : null);
  const [loading, setLoading] = useState(!isMatchingPreview);
  const [notFound, setNotFound] = useState(false);

  // Gallery & Shared Element Expanding Transition State
  const mainImageRef = useRef(null);
  const [targetRect, setTargetRect] = useState(null);
  const [isExpanding, setIsExpanding] = useState(Boolean(sourceImgRect && isMatchingPreview));

  useLayoutEffect(() => {
    if (!sourceImgRect || !isMatchingPreview) {
      setIsExpanding(false);
      return;
    }

    // Scroll to top instantly so target placeholder is correctly positioned in viewport
    window.scrollTo(0, 0);

    const measureTarget = () => {
      if (mainImageRef.current) {
        const rect = mainImageRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setTargetRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          });
        }
      }
    };

    measureTarget();
    const frame = requestAnimationFrame(measureTarget);
    return () => cancelAnimationFrame(frame);
  }, [sourceImgRect, isMatchingPreview]);

  // Safety fallback to dismiss expanding overlay after timeout
  useEffect(() => {
    if (isExpanding) {
      const timer = setTimeout(() => {
        setIsExpanding(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isExpanding]);

  // Gallery & Variant State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [addCartPhase, setAddCartPhase] = useState('idle'); // 'idle' | 'animating' | 'transitioning'
  const [isVocOpen, setIsVocOpen] = useState(false);
  const detailsLottieRef = useRef(null);
  const detailsAnimRef = useRef(null);

  const isAddingToCart = addCartPhase === 'animating' || addCartPhase === 'transitioning';

  useEffect(() => {
    if (addCartPhase !== 'animating' || !detailsLottieRef.current) return;
    detailsLottieRef.current.innerHTML = '';
    const anim = lottie.loadAnimation({
      container: detailsLottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: addToCartAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    });
    anim.setSpeed(1.25);
    detailsAnimRef.current = anim;

    // Cart completes drive-off at ~1400ms, crossfade into confirmed state
    const transTimer = setTimeout(() => {
      setAddCartPhase('transitioning');
    }, 1400);

    const finishTimer = setTimeout(() => {
      setAddCartPhase('idle');
    }, 1750);

    return () => {
      clearTimeout(transTimer);
      clearTimeout(finishTimer);
      if (detailsAnimRef.current) {
        detailsAnimRef.current.destroy();
        detailsAnimRef.current = null;
      }
    };
  }, [addCartPhase === 'animating']);

  // Interactive Pincode Delivery State
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  // Lower Section Navigation
  const [activeDetailTab, setActiveDetailTab] = useState('description');
  const [similarProducts, setSimilarProducts] = useState([]);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [userReviews, setUserReviews] = useState([]);

  const productId = product?.product_id || product?.id;
  const liveStock = useLiveStock(product?.stock_quantity !== undefined ? Number(product.stock_quantity) : 25, productId);
  const isOutOfStock = liveStock <= 0;
  const isLowStock = liveStock > 0 && liveStock <= 5;

  // Fetch product data
  useEffect(() => {
    let isMounted = true;
    const loadProductData = async () => {
      if (!isMatchingPreview) {
        setLoading(true);
      }
      setNotFound(false);
      try {
        const res = await productService.getProductById(id);
        if (res.success && res.data && isMounted) {
          const item = res.data;
          setProduct(item);
          setActiveImageIndex(0);

          // Set sensible initial size depending on category
          if (isClothingProduct(item)) {
            setSelectedSize('M');
          } else if (isFootwearProduct(item)) {
            setSelectedSize('UK 8');
          } else {
            setSelectedSize('');
          }

          // Record in recently viewed
          productService.recordRecentlyViewed(item);

          // Fetch similar products safely (5 items for similar grid)
          try {
            const relRes = await productService.getRelatedProducts(item.product_id || item.id, 5);
            if (relRes.success && isMounted) {
              setSimilarProducts(relRes.data || []);
            }
          } catch (relErr) {
            console.warn('Could not load related products:', relErr);
          }
        } else if (isMounted) {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProductData();
    if (!sourceImgRect) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Single photo maintenance per product page (maintain only one photo, not five)
  const imageAssets = useMemo(() => {
    if (!product) return [];
    const mainPhoto = previewImage || 
      product.thumbnail || 
      (Array.isArray(product.images) && product.images[0]) || 
      (Array.isArray(product.pi_images) && (product.pi_images[0]?.image_url || product.pi_images[0])) || 
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80';
    return [mainPhoto];
  }, [product, previewImage]);

  const isClothing = useMemo(() => isClothingProduct(product), [product]);
  const isBottomwear = useMemo(() => isBottomwearProduct(product), [product]);
  const isFootwear = useMemo(() => isFootwearProduct(product), [product]);
  const isKids = useMemo(() => {
    if (!product) return false;
    const dept = (product.department || product.section || product.gender || '').toLowerCase();
    const cat = (product.category || product.category_name || '').toLowerCase();
    const tags = (Array.isArray(product.tags) ? product.tags.join(' ') : product.tags || '').toLowerCase();
    return dept.includes('kid') || dept.includes('boy') || dept.includes('girl') || cat.includes('kid') || tags.includes('kid');
  }, [product]);
  const isBaby = useMemo(() => {
    if (!product) return false;
    const sub = (product.subcategory || product.childCategory || '').toLowerCase();
    const name = (product.name || '').toLowerCase();
    const tags = (Array.isArray(product.tags) ? product.tags.join(' ') : product.tags || '').toLowerCase();
    return sub.includes('baby') || sub.includes('romper') || sub.includes('onesie') || name.includes('baby') || name.includes('romper') || tags.includes('baby');
  }, [product]);

  // Determine sizing list options based on category
  const sizeOptions = useMemo(() => {
    if (!product) return [];

    // Clothing section gets adult, kids age, or baby month sizes
    if (isClothing) {
      if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
        return product.sizes;
      }
      if (isBaby) {
        return ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M'];
      }
      if (isKids) {
        return ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y', '13-14Y'];
      }
      return DEFAULT_CLOTHING_SIZES; // ['S', 'M', 'L', 'XL', '2XL']
    }

    // Footwear section gets adult UK sizes or kids shoe sizes
    if (isFootwear) {
      if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
        return product.sizes;
      }
      if (isKids) {
        return ['UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12', 'UK 13', 'UK 1', 'UK 2'];
      }
      return DEFAULT_FOOTWEAR_SIZES; // ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
    }

    // Non-clothing & non-footwear items (e.g. Pooja items, electronics, home decor, beauty):
    // Do NOT show clothing sizes like S, M, L, XL!
    if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
      const validOptions = product.sizes.filter(s => !['S', 'M', 'L', 'XL', 'XXL', 'XS', '3XL'].includes(String(s).trim().toUpperCase()));
      return validOptions;
    }

    // No sizes for pooja items, electronics, home goods, etc.
    return [];
  }, [product, isClothing, isFootwear, isKids, isBaby]);

  // Pricing calculations
  const price = useMemo(() => Number(product?.price || 0), [product]);
  const mrp = useMemo(() => {
    if (!product) return 0;
    if (product.mrp && Number(product.mrp) > price) return Number(product.mrp);
    return Math.round(price * 1.25);
  }, [product, price]);
  const discountPercentage = useMemo(() => {
    if (!mrp || mrp <= price) return product?.discount_percentage || 0;
    return Math.round(((mrp - price) / mrp) * 100);
  }, [mrp, price, product]);

  // Intersection observer for sticky detail nav
  useEffect(() => {
    const sectionIds = ['description', 'highlights', 'specifications', 'reviews', 'similar'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveDetailTab(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId) => {
    setActiveDetailTab(sectionId);
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      const yOffset = -110;
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    addToCart({ ...product, stock_quantity: liveStock }, 1, {
      variant_value: selectedSize,
      selectedSize,
      price: Number(product.price || 0)
    });
    setAddCartPhase('animating');
    if (toast?.success) {
      toast.success(`${product.name || product.title} added to your cart!`);
    }
  };

  // Buy now handler
  const handleBuyNow = () => {
    if (!product || isOutOfStock) return;
    if (!user) {
      navigate('/login', { state: { from: `/product/${productId}` } });
      return;
    }
    const buyNowItem = {
      ...product,
      stock_quantity: liveStock,
      product_id: productId,
      id: productId,
      name: product.name || product.title,
      quantity: 1,
      selectedSize,
      price: Number(product.price || 0),
      mrp: Number(mrp || 0),
      thumbnail: mainImgSrc || product.thumbnail,
      image: mainImgSrc || product.thumbnail,
      brand: brandName,
      category: categoryName
    };
    navigate('/checkout', { state: { buyNowProduct: buyNowItem } });
  };

  // Wishlist toggle handler
  const handleToggleWishlist = () => {
    if (!product) return;
    if (!user) {
      navigate('/login');
      return;
    }
    toggleWishlist(product);
  };

  // Pincode validation handler with backend delivery estimator
  const handleCheckPincode = async (e) => {
    e?.preventDefault();
    const cleanPin = pincode.trim();
    if (cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
      setPincodeResult({
        valid: false,
        message: 'Please enter a valid 6-digit PIN code.'
      });
      return;
    }

    try {
      const res = await apiClient.get(`/delivery/check?pincode=${cleanPin}`);
      if (res.data?.success) {
        setPincodeResult({
          valid: true,
          message: `Delivery by ${res.data.estimated_delivery} | Free Express Delivery & COD available for ${cleanPin}`
        });
        return;
      }
    } catch {
      // Fallback local calculation
    }

    const estDays = product?.delivery_info?.estimated_days || 3;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + estDays);
    const formattedDate = estDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    setPincodeResult({
      valid: true,
      message: `Delivery by ${formattedDate} | Free Express Delivery & COD available for ${cleanPin}`
    });
  };

  // Review submission handler with backend sync
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      if (toast?.error) toast.error('Please enter a review title and comment.');
      return;
    }

    const newRev = {
      id: Date.now(),
      reviewer: user?.name || user?.email?.split('@')[0] || 'Verified Customer',
      user: user?.name || user?.email?.split('@')[0] || 'Verified Customer',
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      verified: true
    };

    try {
      await apiClient.post(`/products/${productId}/reviews`, newRev);
    } catch (err) {
      console.warn('Backend review sync notice:', err?.message);
    }

    setUserReviews(prev => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    setReviewTitle('');
    setReviewComment('');
    setReviewRating(5);
    if (toast?.success) toast.success('Thank you! Your verified review has been published.');
  };

  // Loading state
  if (loading) {
    return (
      <div className="gomo-product-detail-page flex flex-col items-center justify-center min-h-[75vh]">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={44} strokeWidth={1.8} />
        <p className="text-xs uppercase tracking-[0.3em] font-extrabold text-stone-700">
          Loading Product Experience...
        </p>
      </div>
    );
  }

  // Not found state
  if (notFound || !product) {
    return (
      <div className="gomo-product-detail-page flex flex-col items-center justify-center min-h-[75vh] px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Product Not Found</h1>
        <p className="text-stone-500 text-sm max-w-md mb-6">
          The product you are looking for might have been moved or is currently unavailable.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-sm transition-all shadow-md"
        >
          Explore All Products
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const categoryName = product.category_name || product.category || 'Store Collection';
  const subcategoryName = product.subcategory || product.childCategory || '';
  const brandName = product.brand || 'GoMo Select';
  const mainImgSrc = imageAssets[activeImageIndex] || product.thumbnail;
  const isWishlisted = isInWishlist(productId);

  // Specifications items
  const specs = product.specifications || {};
  const materialVal = specs['Material'] || specs['Fabric'] || product.fabric || 'Premium Handcrafted Quality';
  const fitVal = specs['Fit'] || product.fit || 'Regular Fit';
  const patternVal = specs['Pattern'] || product.pattern || 'Solid / Artisan Design';
  const occasionVal = specs['Occasion'] || product.occasion || 'Casual / Festive';
  const careVal = specs['Care Instructions'] || specs['Care'] || 'Machine Wash / Gentle Dry';
  const originVal = specs['Country of Origin'] || 'India';
  const warrantyVal = specs['Warranty'] || '1 Year Direct Brand Guarantee';

  // Seeded verified reviews
  const allReviews = [
    ...userReviews,
    {
      id: 1,
      reviewer: 'Priya Sundaram',
      rating: 5,
      verified: true,
      title: 'Exceeded all expectations! Truly authentic craftsmanship',
      comment: 'The quality of the finish and packaging is phenomenal. Ordered for an auspicious occasion and it arrived safely packed within 2 days.',
      date: '18 Sep 2026'
    },
    {
      id: 2,
      reviewer: 'Rajesh K. Verma',
      rating: 5,
      verified: true,
      title: 'Top-tier finish and genuine materials',
      comment: 'Very pleased with the purchase. The detailing is immaculate and exactly matching the photograph. Highly recommended for daily and festive use.',
      date: '11 Sep 2026'
    },
    {
      id: 3,
      reviewer: 'Ananya Deshmukh',
      rating: 4,
      verified: true,
      title: 'Worth every rupee, fast delivery',
      comment: 'Great value for money. Looks elegant and premium. Smooth shopping experience on GoMo Deals with live tracking.',
      date: '04 Sep 2026'
    }
  ];

  return (
    <div className="gomo-product-detail-page">
      {/* Shared Element Expanding Card Animation with Seamless Crossfade */}
      <AnimatePresence>
        {isExpanding && sourceImgRect && targetRect && (
          <motion.div
            key="product-card-shared-expansion"
            initial={{
              position: 'fixed',
              top: sourceImgRect.top,
              left: sourceImgRect.left,
              width: sourceImgRect.width,
              height: sourceImgRect.height,
              borderRadius: 14,
              boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1)',
              zIndex: 99999,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
            animate={{
              top: targetRect.top,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(40, 20, 10, 0.08)',
            }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 26,
              mass: 0.85
            }}
            onAnimationComplete={() => {
              setIsExpanding(false);
            }}
            className="relative flex items-center justify-center border border-stone-200"
          >
            {/* Crossfade Layer 1: Starting Card Image (object-cover from the card) */}
            <motion.img
              src={mainImgSrc}
              alt={product?.name || product?.title || 'Product Image'}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Crossfade Layer 2: Destination Detail Image (object-contain with natural padding) */}
            <motion.img
              src={mainImgSrc}
              alt={product?.name || product?.title || 'Product Image'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, delay: 0.06, ease: 'easeInOut' }}
              className="w-full h-full object-contain p-3"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main 
        className="page"
        initial={isExpanding ? { opacity: 0.4 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* BREADCRUMBS */}
        <motion.nav 
          className="breadcrumbs" 
          aria-label="Breadcrumb"
          initial={isExpanding ? { opacity: 0, y: -6 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/collection/${(product.category || 'clothing').toLowerCase()}`}>
            {categoryName}
          </Link>
          {subcategoryName && (
            <>
              <span>/</span>
              <Link to={`/products?category=${encodeURIComponent(product.category || '')}&subcategory=${encodeURIComponent(subcategoryName)}`}>
                {subcategoryName}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="current" title={product.name || product.title}>
            {product.name || product.title}
          </span>
        </motion.nav>

        {/* MAIN PRODUCT LAYOUT */}
        <section className="product-layout">
          {/* GALLERY - Single photo layout */}
          <div className="gallery single-image">
            <div className="w-full">
              <motion.div 
                className="main-image relative" 
                id="mainImage" 
                ref={mainImageRef}
                initial={isExpanding ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: isExpanding ? 0.22 : 0, ease: 'easeOut' }}
              >
                <img
                  src={mainImgSrc}
                  alt={product.name || product.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80';
                  }}
                />
                <button
                  className={`wishlist ${isWishlisted ? 'active' : ''}`}
                  id="wishlistBtn"
                  onClick={handleToggleWishlist}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  type="button"
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? 'fill-current text-rose-600' : 'text-stone-700'}
                  />
                </button>
              </motion.div>
              <div className="gallery-note">
                100% Original Products · Secure Packaging · Direct Vendor Certified
              </div>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <motion.article 
            className="product-info"
            initial={isExpanding ? { opacity: 0, x: 20 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <div className="eyebrow" id="productCategory">
              {brandName} · {categoryName} {subcategoryName ? `· ${subcategoryName}` : ''}
            </div>

            {/* Title */}
            <h1 className="product-title" id="productName">
              {product.name || product.title}
            </h1>

            {/* Subtitle */}
            <div className="product-subtitle" id="productSubtitle">
              {product.subtitle || product.description?.slice(0, 140) || 'Premium curated catalog selection with authentic single-vendor warranty.'}
            </div>

            {/* Ratings Row */}
            <div className="rating-row flex items-center gap-2">
              <span className="rating inline-flex items-center gap-1 font-bold">
                {product.rating ? Number(product.rating).toFixed(1) : '4.8'}
                <Star size={13} className="fill-amber-400 text-amber-400 inline" />
              </span>
              <span className="stars inline-flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </span>
              <button
                type="button"
                className="rating-link ml-1"
                onClick={() => handleScrollToSection('reviews')}
              >
                {product.reviews_count || 148} ratings &amp; {allReviews.length} reviews
              </button>
            </div>

            <div className="divider"></div>

            {/* Pricing Block */}
            <section className="price-block">
              {mrp > price && (
                <div className="mrp">
                  M.R.P. <s>{formatPrice(mrp)}</s>
                </div>
              )}
              <div className="price-line">
                <span className="price">{formatPrice(price)}</span>
                {discountPercentage > 0 && (
                  <span className="discount">{discountPercentage}% off</span>
                )}
              </div>
              <div className="tax-note">Inclusive of all applicable taxes</div>
              {isLowStock && (
                <div className="flex items-center gap-2 p-3 mt-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold animate-pulse">
                  <AlertCircle size={15} className="text-amber-700 shrink-0" />
                  <span><strong>Hurry! Only {liveStock} units remaining</strong> in central stock.</span>
                </div>
              )}
              {isOutOfStock && (
                <div className="flex items-center gap-2 p-3 mt-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-900 text-xs font-bold">
                  <AlertCircle size={15} className="text-rose-700 shrink-0" />
                  <span><strong>Currently Sold Out.</strong> Restock is in progress.</span>
                </div>
              )}
            </section>

            <div className="divider"></div>

            {/* Size Selector - ONLY render when sizeOptions exists and has items (e.g. Clothing or Footwear) */}
            {sizeOptions && sizeOptions.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <div className="section-label mb-0">
                    {isBaby 
                      ? 'Select Baby Size (Age / Months)' 
                      : isKids 
                      ? (isFootwear ? 'Select Kids Shoe Size' : 'Select Kids Size (Age)') 
                      : isClothing 
                      ? 'Select Clothing Size' 
                      : isFootwear 
                      ? 'Select Shoe Size (UK)' 
                      : 'Select Option'}
                  </div>
                  <div className="flex items-center gap-2">
                    {isBaby ? (
                      <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 hidden sm:inline">
                        Infant & Baby Sizing
                      </span>
                    ) : isKids ? (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 hidden sm:inline">
                        {isFootwear ? 'Kids Footwear Sizing' : 'Kids Age Sizing'}
                      </span>
                    ) : isClothing && (
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200 hidden sm:inline">
                        Standard Apparel Sizing
                      </span>
                    )}
                    {(isClothing || isFootwear) && (
                      <button
                        type="button"
                        onClick={() => setIsSizeChartOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer bg-orange-50 hover:bg-orange-100/70 border border-orange-200 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <Ruler size={13} />
                        <span>Size Chart</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="option-row" id="sizeOptions">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`option ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Offers Box */}
            <section style={{ marginTop: '18px' }}>
              <div className="section-label">Available Offers</div>
              <div className="offer-box">
                <div className="offer">
                  <div className="offer-icon">
                    <Percent size={15} />
                  </div>
                  <div>
                    <strong>Bank Offer</strong>
                    <span>Save up to ₹250 instant discount on UPI and eligible Credit/Debit cards.</span>
                  </div>
                </div>
                <div className="offer">
                  <div className="offer-icon">
                    <Tag size={15} />
                  </div>
                  <div>
                    <strong>Coupon Code: GOMO20</strong>
                    <span>Get flat 20% extra discount on orders above ₹999 at checkout.</span>
                  </div>
                </div>
                <div className="offer">
                  <div className="offer-icon">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <strong>Assured Single-Vendor Authenticity</strong>
                    <span>100% verified genuine merchandise with direct brand quality guarantee.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Section */}
            <section style={{ marginTop: '18px' }}>
              <div className="section-label">Delivery &amp; Services</div>
              <div className="delivery">
                <div className="delivery-row">
                  <Truck size={18} />
                  <div>
                    <strong>Enter your PIN code to check delivery</strong>
                    <p>Standard delivery in 2–4 business days with live courier tracking.</p>
                  </div>
                </div>
                <form onSubmit={handleCheckPincode} className="pin-row">
                  <input
                    id="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button type="submit" className="check-btn" id="checkPin">
                    Check
                  </button>
                </form>
                {pincodeResult && (
                  <div
                    id="pinMessage"
                    style={{
                      display: 'block',
                      color: pincodeResult.valid ? 'var(--accent)' : 'var(--sale)',
                      fontWeight: pincodeResult.valid ? 600 : 500
                    }}
                  >
                    {pincodeResult.message}
                  </div>
                )}
              </div>
            </section>

            {/* Action Buttons */}
            <div className="actions">
              <button
                className={`btn secondary relative overflow-hidden transition-all duration-300 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''} ${isAddingToCart ? 'bg-stone-950 text-white' : ''}`}
                id="addCart"
                type="button"
                disabled={isOutOfStock || isAddingToCart}
                onClick={handleAddToCart}
              >
                {/* Standard button text/icon with smooth fade */}
                <div className={`flex items-center justify-center gap-2 transition-all duration-300 ease-out ${
                  addCartPhase === 'animating' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                }`}>
                  <ShoppingBag size={18} />
                  <span>{isOutOfStock ? 'Out of Stock' : (isInCart(productId) ? 'In Cart (+1 More)' : 'Add to Cart')}</span>
                </div>

                {/* Animation Overlay with silky fade-in & crossfade */}
                {isAddingToCart && (
                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-350 ease-out ${
                    addCartPhase === 'animating'
                      ? 'opacity-100 scale-100 animate-in fade-in zoom-in-95 duration-200'
                      : 'opacity-0 scale-95 duration-350'
                  }`}>
                    <div ref={detailsLottieRef} className="w-full h-[68px] flex items-center justify-center overflow-visible" />
                  </div>
                )}
              </button>
              <button
                className={`btn primary ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="buyNow"
                type="button"
                disabled={isOutOfStock}
                onClick={handleBuyNow}
              >
                {isOutOfStock ? 'Sold Out' : 'Buy Now'}
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Seller Information */}
            <div className="seller">
              <div>
                <div className="seller-title">Sold by</div>
                <Link 
                  to={`/store/${product.seller_id || 'seller-1'}`}
                  className="seller-name hover:text-orange-600 transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                  title="Visit verified merchant storefront"
                >
                  <span>{product.seller_name || brandName}</span>
                  <ChevronRight size={13} className="text-orange-600 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <div className="seller-meta">4.8 seller rating · 99% positive · Verified GoMo Deals Partner</div>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setIsVocOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-bold transition-colors cursor-pointer"
                    title="Direct Voice of Customer connection to the verified seller of this product"
                  >
                    <MessageSquareQuote size={14} className="text-amber-700" />
                    <span>Voice of Customer · Ask Seller</span>
                  </button>
                  <Link
                    to={`/store/${product.seller_id || 'seller-1'}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Visit Storefront</span>
                  </Link>
                </div>
              </div>
              <div className="seller-badge">VERIFIED SELLER</div>
            </div>
          </motion.article>
        </section>

        {/* LOWER DETAILS (ACCORDION SECTIONS) */}
        <section className="detail-wrap">

          {/* 1. DESCRIPTION SECTION */}
          <section className="detail-section" id="description">
            <h2 className="section-heading">Product Description</h2>
            <div className="description">
              <p id="descriptionText">
                {product.description || 'This product is meticulously crafted to meet rigorous quality standards. Designed with premium materials for maximum durability and everyday elegance.'}
              </p>
              {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mt-4 mb-2">Key Features</h3>
                  <ul className="bullet-list">
                    {product.features.map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="asset-note">
              <strong>Authentic Catalog Item:</strong> Single-vendor verified product guaranteed by {brandName}.
              <span className="code-label">{productId}</span>
            </div>
          </section>

          {/* 2 & 3. HIGHLIGHTS & SPECIFICATIONS (2-GRID HORIZONTAL ROW) */}
          <div className="highlights-specs-grid">
            {/* 2. HIGHLIGHTS SECTION */}
            <section className="detail-section" id="highlights">
              <h2 className="section-heading">Highlights</h2>
              <div className="highlights">
                <div className="highlight">
                  <strong>Material</strong>
                  <span>{materialVal}</span>
                </div>
                {isClothing && (
                  <div className="highlight">
                    <strong>Fit / Cut</strong>
                    <span>{fitVal}</span>
                  </div>
                )}
                {isClothing && (
                  <div className="highlight">
                    <strong>Pattern</strong>
                    <span>{patternVal}</span>
                  </div>
                )}
                <div className="highlight">
                  <strong>Occasion</strong>
                  <span>{occasionVal}</span>
                </div>
                <div className="highlight">
                  <strong>Care</strong>
                  <span>{careVal}</span>
                </div>
                <div className="highlight">
                  <strong>Country of Origin</strong>
                  <span>{originVal}</span>
                </div>
                <div className="highlight">
                  <strong>Pack / Qty</strong>
                  <span>1 Unit {selectedSize ? `(${selectedSize})` : ''}</span>
                </div>
                <div className="highlight">
                  <strong>Warranty</strong>
                  <span>{warrantyVal}</span>
                </div>
              </div>
            </section>

            {/* 3. SPECIFICATIONS SECTION */}
            <section className="detail-section" id="specifications">
              <h2 className="section-heading">Specifications</h2>
              <table className="spec-table">
                <tbody>
                  <tr>
                    <td>Brand</td>
                    <td>{brandName}</td>
                  </tr>
                  <tr>
                    <td>Model / SKU</td>
                    <td>{productId}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{categoryName}</td>
                  </tr>
                  <tr>
                    <td>Sub-category</td>
                    <td>{subcategoryName || 'Store Collection'}</td>
                  </tr>
                  <tr>
                    <td>Gender / Demographic</td>
                    <td>{product.gender || product.recipient || 'All / Unisex'}</td>
                  </tr>
                  <tr>
                    <td>Material</td>
                    <td>{materialVal}</td>
                  </tr>
                  {selectedSize ? (
                    <tr>
                      <td>{isClothing ? 'Clothing Size' : isFootwear ? 'Shoe Size' : 'Option / Pack'}</td>
                      <td>{selectedSize}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>Net Quantity</td>
                    <td>1 Unit</td>
                  </tr>
                  <tr>
                    <td>Country of Origin</td>
                    <td>{originVal}</td>
                  </tr>
                  <tr>
                    <td>Manufacturer / Seller</td>
                    <td>{brandName} Verified Merchant</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          {/* 4. REVIEWS SECTION */}
          <section className="detail-section" id="reviews">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h2 className="section-heading" style={{ margin: 0 }}>Ratings &amp; Reviews</h2>
              <button
                className="view-all"
                type="button"
                id="writeReview"
                onClick={() => setIsReviewModalOpen(true)}
              >
                + Write a review
              </button>
            </div>

            <div className="review-summary">
              <div>
                <div className="score">
                  {product.rating ? Number(product.rating).toFixed(1) : '4.8'}
                </div>
                <div className="score-stars flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="score-count">
                  {product.reviews_count || 148} ratings · {allReviews.length} written reviews
                </div>
              </div>
              <div className="bars">
                <div className="bar-row">
                  <span>5 star</span>
                  <div className="bar"><span style={{ width: '84%' }}></span></div>
                  <span>84%</span>
                </div>
                <div className="bar-row">
                  <span>4 star</span>
                  <div className="bar"><span style={{ width: '11%' }}></span></div>
                  <span>11%</span>
                </div>
                <div className="bar-row">
                  <span>3 star</span>
                  <div className="bar"><span style={{ width: '3%' }}></span></div>
                  <span>3%</span>
                </div>
                <div className="bar-row">
                  <span>2 star</span>
                  <div className="bar"><span style={{ width: '1%' }}></span></div>
                  <span>1%</span>
                </div>
                <div className="bar-row">
                  <span>1 star</span>
                  <div className="bar"><span style={{ width: '1%' }}></span></div>
                  <span>1%</span>
                </div>
              </div>
            </div>

            <div className="review-list">
              {allReviews.map((rev) => (
                <article className="review" key={rev.id}>
                  <div className="review-head">
                    <span className="rating inline-flex items-center gap-1">
                      {rev.rating} <Star size={12} className="fill-amber-400 text-amber-400" />
                    </span>
                    <span className="reviewer">{rev.reviewer}</span>
                    {rev.verified && <span className="verified">VERIFIED PURCHASE</span>}
                  </div>
                  <div className="review-title">{rev.title}</div>
                  <div className="review-text">{rev.comment}</div>
                  <div className="review-date">Reviewed on {rev.date}</div>
                </article>
              ))}
            </div>
          </section>

          {/* 5. SIMILAR PRODUCTS SECTION */}
          <section className="detail-section" id="similar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h2 className="section-heading" style={{ margin: 0 }}>Similar Products</h2>
              <Link
                to={`/collection/${(product.category || 'clothing').toLowerCase()}`}
                className="view-all"
              >
                View all →
              </Link>
            </div>

            <div className="similar-grid">
              {similarProducts.map((sim) => {
                const simId = sim.product_id || sim.id;
                const simImg = sim.thumbnail || sim.image || sim.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80';
                const simPrice = Number(sim.price || 0);
                const simMrp = Number(sim.mrp || Math.round(simPrice * 1.25));

                return (
                  <article
                    className="product-card cursor-pointer"
                    key={simId}
                    onClick={() => navigate(`/product/${simId}`)}
                  >
                    <div className="card-image">
                      <img
                        src={simImg}
                        alt={sim.name || sim.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80';
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-category">
                        {sim.category_name || sim.category || categoryName}
                      </div>
                      <div className="card-name" title={sim.name || sim.title}>
                        {sim.name || sim.title}
                      </div>
                      <div className="card-rating flex items-center gap-1">
                        <span className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                          ))}
                        </span>
                        <span className="text-[11px] font-bold text-stone-600 ml-1">
                          {sim.rating ? Number(sim.rating).toFixed(1) : '4.6'}
                        </span>
                      </div>
                      <div className="card-price">
                        {formatPrice(simPrice)}
                      </div>
                      {simMrp > simPrice && (
                        <div className="card-mrp">
                          <s>{formatPrice(simMrp)}</s>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>
      </motion.main>

      {/* WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 relative"
            >
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-stone-900 mb-1">Write a Customer Review</h3>
              <p className="text-xs text-stone-500 mb-5">
                Share your authentic feedback on {product.name || product.title}
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Overall Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setReviewRating(starVal)}
                        className={`p-2 rounded-lg text-lg transition-colors flex items-center justify-center cursor-pointer ${
                          reviewRating >= starVal ? 'bg-amber-50' : 'hover:bg-stone-50'
                        }`}
                      >
                        <Star size={18} className={reviewRating >= starVal ? 'fill-amber-500 text-amber-500' : 'text-stone-300'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Review Headline / Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Excellent quality, perfect fit and fast delivery"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Detailed Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What did you like or dislike about this product? How is the material, finish, or performance?"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500 text-stone-900"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 text-sm font-semibold rounded-lg hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg shadow-sm"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Voice of Customer Modal */}
      <VoiceOfCustomerModal
        isOpen={isVocOpen}
        onClose={() => setIsVocOpen(false)}
        product={product}
      />

      {/* Interactive Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(sz) => setSelectedSize(sz)}
        chartType={
          isFootwear 
            ? (isKids ? 'kids-footwear' : 'footwear')
            : isBaby
            ? 'baby'
            : isKids 
            ? (isBottomwear ? 'kids-bottomwear' : 'kids-topwear')
            : isBottomwear 
            ? 'bottomwear' 
            : 'topwear'
        }
      />
    </div>
  );
};

export default ProductDetails;
