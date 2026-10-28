import React, { useState } from 'react';
import { Link, useSearchParams, useOutletContext } from 'react-router-dom';
import { 
  Calendar, MapPin, Filter, Search, RotateCcw, 
  ChevronRight, Heart, Sparkles, Star, Ticket 
} from 'lucide-react';
import { MOCK_EVENTS, toggleTicketWishlist, isTicketWishlisted } from '../../data/mockTicketData';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';

export default function EventsListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useOutletContext() || {};
  const selectedCity = context.selectedCity || 'Coimbatore';
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [wishlistRefresh, setWishlistRefresh] = useState(0);

  const handleWishlist = (e, evt) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = toggleTicketWishlist(evt);
    setWishlistRefresh(prev => prev + 1);
    showToast(isAdded ? `Added "${evt.title}" to Wishlist` : `Removed from Wishlist`, 'info');
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setActivePriceRange('all');
    setSearchTerm('');
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter events
  let filtered = MOCK_EVENTS.filter(evt => {
    if (activeCategory !== 'all' && evt.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    if (activePriceRange === 'under_1000' && evt.price >= 1000) return false;
    if (activePriceRange === '1000_3000' && (evt.price < 1000 || evt.price > 3000)) return false;
    if (activePriceRange === 'above_3000' && evt.price <= 3000) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchArtist = evt.artist.toLowerCase().includes(q);
      const matchVenue = evt.venue.toLowerCase().includes(q);
      const matchCategory = evt.category.toLowerCase().includes(q);
      if (!matchTitle && !matchArtist && !matchVenue && !matchCategory) return false;
    }
    return true;
  });

  // Sort
  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-24">
      {/* Page Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                <Link to="/tickets" className="hover:text-[#f76e28]">Home</Link>
                <span>/</span>
                <span className="text-zinc-900 font-semibold">Live Events</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                Live Events, Concerts & Experiences
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                From arena rock tours and live stand-up comedy to high-stakes sports matches and workshops.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative max-w-xs w-full">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by event, artist or venue..."
                className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 focus:border-[#f76e28] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#f76e28]/20 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-zinc-200 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-[#f76e28]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-[#f76e28] hover:text-[#e05b16] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">Category</h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Categories' },
                    { id: 'concerts', label: 'Concerts & Music' },
                    { id: 'stand-up comedy', label: 'Stand-up Comedy' },
                    { id: 'sports', label: 'Sports & Matches' },
                    { id: 'theatre', label: 'Theatre & Plays' },
                    { id: 'activities', label: 'Workshops & Activities' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        activeCategory === c.id 
                          ? 'bg-[#f76e28] text-white shadow-xs' 
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">Price Range</h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'Any Price' },
                    { id: 'under_1000', label: 'Under ₹1,000' },
                    { id: '1000_3000', label: '₹1,000 to ₹3,000' },
                    { id: 'above_3000', label: 'Above ₹3,000' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePriceRange(p.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        activePriceRange === p.id 
                          ? 'bg-zinc-900 text-white shadow-xs' 
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Events Grid & Sorting */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-xl border border-zinc-200">
              <span className="text-xs font-bold text-zinc-700">
                Showing <strong className="text-zinc-900">{filtered.length}</strong> Experiences
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold py-1 px-2.5 rounded-lg focus:outline-none cursor-pointer text-xs"
                >
                  <option value="popular">Popularity</option>
                  <option value="rating">Top Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Events Grid */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 space-y-4">
                <Ticket size={36} className="text-zinc-300 mx-auto" />
                <h3 className="text-lg font-black text-zinc-900">No Events Match Your Selected Criteria</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try clearing some filter options or exploring all categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-lg bg-[#f76e28] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((evt) => {
                  const isWishlisted = isTicketWishlisted(evt.id);

                  return (
                    <Link
                      key={evt.id}
                      to={`/tickets/event/${evt.id}`}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-zinc-200/80 hover:shadow-xl transition-all duration-300 flex flex-col group-hover:-translate-y-1"
                    >
                      {/* Cover Artwork */}
                      <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                        <img
                          src={evt.cover_image}
                          alt={evt.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/cinematic_backdrop_1_1780401309164.png';
                          }}
                        />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#f76e28] text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#f76e28]/30">
                          {evt.category}
                        </div>

                        {/* Wishlist Heart */}
                        <button
                          onClick={(e) => handleWishlist(e, evt)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-110 z-10"
                          title="Wishlist"
                        >
                          <Heart size={14} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
                        </button>

                        {/* Date overlay bar */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 flex items-center justify-between text-white text-xs font-bold">
                          <span className="flex items-center gap-1.5 text-amber-400">
                            <Calendar size={13} />
                            <span>{evt.date}</span>
                          </span>
                          <span className="text-[11px] text-zinc-300 font-medium">
                            {evt.time}
                          </span>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                            {evt.genre}
                          </span>
                          <h3 className="font-bold text-zinc-900 text-base leading-snug group-hover:text-[#f76e28] transition-colors line-clamp-1">
                            {evt.title}
                          </h3>
                          <p className="text-xs text-zinc-500 line-clamp-1 mt-1">
                            {evt.artist}
                          </p>
                          <p className="text-xs text-zinc-400 flex items-center gap-1 mt-2 truncate">
                            <MapPin size={12} className="shrink-0" />
                            <span className="truncate">{evt.venue}</span>
                          </p>
                        </div>

                        {/* Bottom Price & Action */}
                        <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
                          <div>
                            <span className="block text-[10px] text-zinc-400 uppercase font-bold">Starts from</span>
                            <span className="text-base font-black text-zinc-900">
                              {formatLocalPrice(evt.price)}
                            </span>
                          </div>

                          <span className="px-3 py-1.5 rounded-lg bg-orange-50 text-[#f76e28] group-hover:bg-[#f76e28] group-hover:text-white font-bold text-xs uppercase tracking-wider transition-colors">
                            Book Passes
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
