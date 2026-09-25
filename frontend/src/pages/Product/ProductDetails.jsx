import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  Tag
} from 'lucide-react';
import * as productService from '../../services/productService';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './ProductDetails.css';

const DEFAULT_COLORS = [
  { name: 'Midnight', hex: '#18252a' },
  { name: 'Sand', hex: '#b7a58a' },
  { name: 'Maroon', hex: '#7b2634' },
  { name: 'Amber Gold', hex: '#d97706' }
];

const DEFAULT_CLOTHING_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const DEFAULT_FOOTWEAR_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
const DEFAULT_PACK_SIZES = ['Standard', 'Pack of 1', 'Pack of 2', 'Gift Set'];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart, 
    formatPrice 
  } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Gallery & Variant State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0]);
  const [addCartFeedback, setAddCartFeedback] = useState(false);

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

  // Fetch product data
  useEffect(() => {
    let isMounted = true;
    const loadProductData = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await productService.getProductById(id);
        if (res.success && res.data && isMounted) {
          const item = res.data;
          setProduct(item);
          setActiveImageIndex(0);

          // Set sensible initial size depending on category
          const cat = (item.category || item.category_name || '').toLowerCase();
          if (cat.includes('footwear') || cat.includes('shoe')) {
            setSelectedSize('UK 8');
          } else if (cat.includes('pooja') || cat.includes('home') || cat.includes('kitchen') || cat.includes('gadget') || cat.includes('electronic')) {
            setSelectedSize('Standard');
          } else {
            setSelectedSize('M');
          }

          // Record in recently viewed
          productService.recordRecentlyViewed(item);

          // Fetch similar products (5 items for similar grid)
          const relRes = await productService.getRelatedProducts(item.product_id || item.id, 5);
          if (relRes.success && isMounted) {
            setSimilarProducts(relRes.data || []);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Gallery assets list (ensure at least 5 thumbnail items)
  const imageAssets = useMemo(() => {
    if (!product) return [];
    const collected = [];

    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach(img => {
        if (typeof img === 'string') collected.push(img);
        else if (img?.image_url) collected.push(img.image_url);
      });
    }

    if (product.pi_images && Array.isArray(product.pi_images)) {
      product.pi_images.forEach(img => {
        const url = typeof img === 'string' ? img : img?.image_url;
        if (url && !collected.includes(url)) collected.push(url);
      });
    }

    if (product.thumbnail && !collected.includes(product.thumbnail)) {
      collected.unshift(product.thumbnail);
    }

    if (collected.length === 0) {
      collected.push('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80');
    }

    // Pad with high-quality variations if fewer than 5 images
    while (collected.length < 5) {
      collected.push(collected[collected.length % collected.length]);
    }

    return collected.slice(0, 5);
  }, [product]);

  // Determine sizing list options based on category
  const sizeOptions = useMemo(() => {
    if (!product) return DEFAULT_CLOTHING_SIZES;
    if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
      return product.sizes;
    }
    const cat = (product.category || product.category_name || '').toLowerCase();
    if (cat.includes('footwear') || cat.includes('shoes')) {
      return DEFAULT_FOOTWEAR_SIZES;
    }
    if (cat.includes('pooja') || cat.includes('home') || cat.includes('kitchen') || cat.includes('electronic') || cat.includes('gadget') || cat.includes('beauty')) {
      return DEFAULT_PACK_SIZES;
    }
    return DEFAULT_CLOTHING_SIZES;
  }, [product]);

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
    if (!product) return;
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, 1);
    setAddCartFeedback(true);
    if (toast?.success) {
      toast.success(`${product.name || product.title} added to your cart!`);
    }
    setTimeout(() => {
      setAddCartFeedback(false);
    }, 1800);
  };

  // Buy now handler
  const handleBuyNow = () => {
    if (!product) return;
    if (!user) {
      navigate('/login', { state: { from: `/product/${productId}` } });
      return;
    }
    const buyNowItem = {
      ...product,
      product_id: productId,
      id: productId,
      name: product.name || product.title,
      quantity: 1,
      selectedSize,
      selectedColor,
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

  // Pincode validation handler
  const handleCheckPincode = (e) => {
    e?.preventDefault();
    const cleanPin = pincode.trim();
    if (cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
      setPincodeResult({
        valid: false,
        message: 'Please enter a valid 6-digit PIN code.'
      });
      return;
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

  // Review submission handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      if (toast?.error) toast.error('Please enter a review title and comment.');
      return;
    }

    const newRev = {
      id: Date.now(),
      reviewer: user?.name || user?.email?.split('@')[0] || 'Verified Customer',
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      verified: true
    };

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
      <main className="page">
        {/* BREADCRUMBS */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
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
        </nav>

        {/* MAIN PRODUCT LAYOUT */}
        <section className="product-layout">
          {/* GALLERY */}
          <div className="gallery">
            <div className="thumbs" id="thumbs">
              {imageAssets.map((assetUrl, idx) => (
                <button
                  key={idx}
                  className={`thumb ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Product image ${idx + 1}`}
                  type="button"
                >
                  <img
                    src={assetUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80';
                    }}
                  />
                </button>
              ))}
            </div>

            <div>
              <div className="main-image" id="mainImage">
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
              </div>
              <div className="gallery-note">
                100% Original Products · Secure Packaging · Direct Vendor Certified
              </div>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <article className="product-info">
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
            <div className="rating-row">
              <span className="rating">
                {product.rating ? Number(product.rating).toFixed(1) : '4.8'} ★
              </span>
              <span className="stars">★★★★★</span>
              <button
                type="button"
                className="rating-link"
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
            </section>

            <div className="divider"></div>

            {/* Size Selector */}
            <section>
              <div className="section-label">Select Option / Size</div>
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

            {/* Color Selector */}
            <section style={{ marginTop: '18px' }}>
              <div className="section-label">Color: <span className="font-normal normal-case text-stone-600">{selectedColor.name}</span></div>
              <div className="option-row" id="colorOptions">
                {DEFAULT_COLORS.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    className={`option color-option ${selectedColor.name === col.name ? 'active' : ''}`}
                    onClick={() => setSelectedColor(col)}
                  >
                    <span className="swatch" style={{ background: col.hex }}></span>
                    {col.name}
                  </button>
                ))}
              </div>
            </section>

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
                className="btn secondary"
                id="addCart"
                type="button"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                {addCartFeedback ? 'Added to Cart ✓' : (isInCart(productId) ? 'In Cart (+1 More)' : 'Add to Cart')}
              </button>
              <button
                className="btn primary"
                id="buyNow"
                type="button"
                onClick={handleBuyNow}
              >
                Buy Now
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Seller Information */}
            <div className="seller">
              <div>
                <div className="seller-title">Sold by</div>
                <div className="seller-name">{brandName}</div>
                <div className="seller-meta">4.8 seller rating · 99% positive · Verified GoMo Deals Partner</div>
              </div>
              <div className="seller-badge">VERIFIED SELLER</div>
            </div>
          </article>
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

          {/* 2. HIGHLIGHTS SECTION */}
          <section className="detail-section" id="highlights">
            <h2 className="section-heading">Highlights</h2>
            <div className="highlights">
              <div className="highlight">
                <strong>Material</strong>
                <span>{materialVal}</span>
              </div>
              <div className="highlight">
                <strong>Fit / Cut</strong>
                <span>{fitVal}</span>
              </div>
              <div className="highlight">
                <strong>Pattern</strong>
                <span>{patternVal}</span>
              </div>
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
                <strong>Pack</strong>
                <span>1 Unit ({selectedSize})</span>
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
                <tr>
                  <td>Colour</td>
                  <td>{selectedColor.name}</td>
                </tr>
                <tr>
                  <td>Size / Pack</td>
                  <td>{selectedSize}</td>
                </tr>
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
                <div className="score-stars">★★★★★</div>
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
                    <span className="rating">{rev.rating} ★</span>
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
                      <div className="card-rating">
                        ★★★★★ {sim.rating ? Number(sim.rating).toFixed(1) : '4.6'}
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
      </main>

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
                        className={`p-2 rounded-lg text-lg transition-colors ${
                          reviewRating >= starVal ? 'text-amber-500 bg-amber-50' : 'text-stone-300 hover:text-stone-400'
                        }`}
                      >
                        ★
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
    </div>
  );
};

export default ProductDetails;
