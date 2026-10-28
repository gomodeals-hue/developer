import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Store, Star, Truck, ShieldCheck, CheckCircle2, Search, 
  Filter, ShoppingBag, ArrowRight, MessageSquareQuote, 
  MapPin, Clock, Award, Sparkles, AlertCircle, ChevronRight,
  Heart, Tag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import VoiceOfCustomerModal from '../../components/Orders/VoiceOfCustomerModal';

const API_BASE = 'http://127.0.0.1:5000/api/v1';

export default function SellerStorefront() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const { formatPrice, addToCart, isInCart, toggleWishlist, isInWishlist } = useShop();
  const { user } = useAuth();

  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [isVocOpen, setIsVocOpen] = useState(false);
  const [selectedProductForVoc, setSelectedProductForVoc] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      try {
        const id = sellerId || 'seller-1';
        const res = await fetch(`${API_BASE}/seller/store/${id}`);
        const data = await res.json();
        if (data.success && data.seller) {
          setSeller(data.seller);
          setProducts(data.products || []);
        } else {
          // Fallback fetch all products and filter
          const pRes = await fetch(`${API_BASE}/products`);
          const pData = await pRes.json();
          if (pData.success) {
            const filtered = (pData.data || []).filter(p => p.seller_id === id);
            setProducts(filtered);
            setSeller({
              id,
              store_name: filtered[0]?.seller_name || 'Verified Merchant Store',
              owner_name: 'Store Partner',
              category: 'Curated Catalog',
              rating: 4.9,
              review_count: 98,
              verified: true,
              total_products: filtered.length,
              description: 'Authentic items dispatched with priority shipping SLA and guaranteed authenticity.',
              shipping_sla: {
                on_time_delivery_rate: 97.8,
                ldr: 3.12,
                fulfillment_rate: 99.1,
                headline: 'On-time delivery of your order is important for customer satisfaction'
              },
              badges: [
                '0% Commission Tier Verified',
                'Express Fast Shipping',
                'Top Customer Service 98.4%',
                'Authentic Guarantee'
              ]
            });
          }
        }
      } catch (err) {
        console.error('Failed to load seller storefront:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sellerId]);

  // Categories present in this seller's catalog
  const storeCategories = useMemo(() => {
    const cats = new Set();
    products.forEach(p => {
      const c = p.category || p.category_name;
      if (c) cats.add(c);
    });
    return Array.from(cats);
  }, [products]);

  // Filtered and sorted products
  const displayProducts = useMemo(() => {
    return products.filter(p => {
      const name = (p.name || p.title || '').toLowerCase();
      const cat = (p.category || p.category_name || '').toLowerCase();
      const matchSearch = !searchTerm.trim() || name.includes(searchTerm.toLowerCase().trim());
      const matchCat = selectedCategory === 'all' || cat === selectedCategory.toLowerCase();
      return matchSearch && matchCat;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return Number(a.price) - Number(b.price);
      if (sortBy === 'price_desc') return Number(b.price) - Number(a.price);
      if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      return 0; // default popular
    });
  }, [products, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4" />
        <p className="text-xs uppercase tracking-widest font-extrabold text-stone-600">
          Loading Merchant Storefront...
        </p>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
          <Store size={28} />
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">Merchant Storefront Not Found</h2>
        <p className="text-xs text-stone-500 max-w-sm mb-6">
          The requested merchant storefront may have been relocated or updated.
        </p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-16">
      
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-1.5 text-xs text-stone-500">
        <Link to="/" className="hover:text-orange-600 font-medium">Home</Link>
        <ChevronRight size={13} className="text-stone-400" />
        <span className="text-stone-400">Verified Sellers</span>
        <ChevronRight size={13} className="text-stone-400" />
        <span className="font-bold text-stone-900 truncate">{seller.store_name}</span>
      </div>

      {/* 2. STORE HERO BANNER & CREDENTIALS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          
          {/* Header Graphic Strip */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-[#de5713] via-[#f76e28] to-[#c44908] relative p-6 flex items-end">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Verified GoMo Partner</span>
              </span>
            </div>
          </div>

          {/* Store Info Row */}
          <div className="p-6 sm:p-8 -mt-12 sm:-mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-end gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center text-orange-600 font-black text-2xl shrink-0 overflow-hidden">
                <Store size={40} className="text-orange-600" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {seller.store_name}
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Active Merchant
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium max-w-xl">
                  {seller.description}
                </p>
                <div className="flex items-center gap-4 text-xs pt-1 flex-wrap">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-stone-900 font-black">{seller.rating}</span>
                    <span className="text-stone-400 font-normal">({seller.review_count} ratings)</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-600 font-bold">
                    {products.length} Products Live
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-600 font-medium flex items-center gap-1">
                    <Truck size={13} className="text-emerald-600" />
                    <span>Dispatches in 24h</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct VOC Trigger Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedProductForVoc(products[0] || null);
                  setIsVocOpen(true);
                }}
                className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                title="Direct Voice of Customer connection to this verified merchant"
              >
                <MessageSquareQuote size={16} className="text-amber-700" />
                <span>Voice of Customer • Ask Seller</span>
              </button>
            </div>
          </div>

          {/* Shipping SLA & Performance Highlights Strip */}
          <div className="bg-stone-50 border-t border-stone-100 p-4 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">On-Time Delivery</span>
              <span className="font-extrabold text-stone-900 text-sm">97.8% SLA</span>
              <span className="text-[10px] text-emerald-600 block font-medium">Optimal Track Record</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Late Delivery Rate</span>
              <span className="font-extrabold text-stone-900 text-sm">3.12% (Benchmark &lt;4%)</span>
              <span className="text-[10px] text-emerald-600 block font-medium">Healthy Standard</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Value Pickup Rate</span>
              <span className="font-extrabold text-stone-900 text-sm">99.1% Superior</span>
              <span className="text-[10px] text-emerald-600 block font-medium">Fast Carrier Handover</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Pricing Transparency</span>
              <span className="font-extrabold text-stone-900 text-sm">0% Merchant Fee</span>
              <span className="text-[10px] text-stone-500 block">Under ₹1,000 Tier</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. STORE SEARCH, CATEGORY FILTER & CATALOG */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search & Sort Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search in ${seller.store_name}...`}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-stone-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 font-bold text-stone-800 focus:outline-none"
              >
                <option value="all">All Departments ({products.length})</option>
                {storeCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-stone-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 font-bold text-stone-800 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {displayProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-2">
            <ShoppingBag size={32} className="mx-auto text-stone-300 mb-2" />
            <h3 className="text-sm font-bold text-stone-800">No products matching your search</h3>
            <p className="text-xs text-stone-500">Try adjusting your filters or clearing search terms.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-2 px-4 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayProducts.map((p) => {
              const pId = p.id || p.product_id;
              const img = p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80';
              const inWish = isInWishlist(pId);

              return (
                <div 
                  key={pId}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                    <Link to={`/product/${pId}`}>
                      <img
                        src={img}
                        alt={p.name || p.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80';
                        }}
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(p)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                        inWish ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-stone-500 hover:text-rose-600'
                      }`}
                    >
                      <Heart size={14} className={inWish ? 'fill-rose-600' : ''} />
                    </button>

                    {Number(p.price) < 1000 && (
                      <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                        0% Commission Deal
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 space-y-1.5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide block truncate">
                        {p.category || p.category_name}
                      </span>
                      <Link to={`/product/${pId}`} className="block">
                        <h4 className="font-bold text-xs text-stone-900 line-clamp-2 hover:text-orange-600 transition-colors">
                          {p.name || p.title}
                        </h4>
                      </Link>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-stone-800">{p.rating || 4.8}</span>
                      <span className="text-stone-400 text-[10px]">({p.reviews_count || 42})</span>
                    </div>

                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="text-base font-black text-stone-950">
                        {formatPrice(p.price)}
                      </span>
                      {p.mrp && Number(p.mrp) > Number(p.price) && (
                        <span className="text-xs text-stone-400 line-through">
                          {formatPrice(p.mrp)}
                        </span>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => addToCart(p)}
                        className="w-full py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        <span>{isInCart(pId) ? 'In Cart (+1)' : 'Add to Cart'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Voice of Customer Modal */}
      {selectedProductForVoc && (
        <VoiceOfCustomerModal
          isOpen={isVocOpen}
          onClose={() => setIsVocOpen(false)}
          product={selectedProductForVoc}
        />
      )}

    </div>
  );
}
