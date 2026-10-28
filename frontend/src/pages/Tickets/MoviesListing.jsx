import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useOutletContext } from 'react-router-dom';
import { 
  Star, ThumbsUp, Filter, Search, RotateCcw, 
  ChevronRight, Heart, Sparkles, Film, Clapperboard 
} from 'lucide-react';
import { MOCK_MOVIES, toggleTicketWishlist, isTicketWishlisted } from '../../data/mockTicketData';
import { useToast } from '../../context/ToastContext';

export default function MoviesListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useOutletContext() || {};
  const selectedCity = context.selectedCity || 'Coimbatore';
  const { showToast } = useToast();

  const [activeLang, setActiveLang] = useState(searchParams.get('lang') || 'all');
  const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all');
  const [activeFormat, setActiveFormat] = useState(searchParams.get('format') || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [wishlistRefresh, setWishlistRefresh] = useState(0);

  const handleWishlist = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = toggleTicketWishlist(movie);
    setWishlistRefresh(prev => prev + 1);
    showToast(isAdded ? `Added "${movie.title}" to Wishlist` : `Removed from Wishlist`, 'info');
  };

  const resetFilters = () => {
    setActiveLang('all');
    setActiveGenre('all');
    setActiveFormat('all');
    setSearchTerm('');
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter movies
  let filtered = MOCK_MOVIES.filter(movie => {
    if (activeLang !== 'all' && (!movie.languages || !movie.languages.includes(activeLang))) {
      return false;
    }
    if (activeGenre !== 'all' && (!movie.genre || !movie.genre.includes(activeGenre))) {
      return false;
    }
    if (activeFormat !== 'all' && (!movie.formats || !movie.formats.includes(activeFormat))) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const matchTitle = movie.title.toLowerCase().includes(q);
      const matchGenre = Array.isArray(movie.genre) && movie.genre.some(g => g.toLowerCase().includes(q));
      if (!matchTitle && !matchGenre) return false;
    }
    return true;
  });

  // Sort
  if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'new') {
    filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else {
    // Prioritize Street Fighter
    const sf = filtered.find(m => m.id === 'mov_street_fighter');
    const rest = filtered.filter(m => m.id !== 'mov_street_fighter');
    filtered = sf ? [sf, ...rest] : filtered;
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
                <span className="text-zinc-900 font-semibold">Movies</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                Movies in {selectedCity}
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Explore the latest theatrical releases, IMAX premieres, and regional cinema.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative max-w-xs w-full">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies by title or genre..."
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

              {/* Language Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">Languages</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'Tamil', 'English', 'Telugu', 'Hindi'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setActiveLang(l)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer anim-pill anim-click-press ${
                        activeLang === l 
                          ? 'bg-[#f76e28] text-white shadow-xs' 
                          : 'bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {l === 'all' ? 'All Languages' : l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">Genres</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Adventure'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setActiveGenre(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer anim-pill anim-click-press ${
                        activeGenre === g 
                          ? 'bg-zinc-900 text-white shadow-xs' 
                          : 'bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {g === 'all' ? 'All Genres' : g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Formats Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">Formats</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['all', '2D', '3D', 'IMAX 2D', 'DOLBY ATMOS'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFormat(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer anim-pill anim-click-press ${
                        activeFormat === f 
                          ? 'bg-[#f76e28] text-white shadow-xs' 
                          : 'bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {f === 'all' ? 'All Formats' : f}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Movies Grid & Sorting */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-xl border border-zinc-200">
              <span className="text-xs font-bold text-zinc-700">
                Showing <strong className="text-zinc-900">{filtered.length}</strong> Movies
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold py-1 px-2.5 rounded-lg focus:outline-none cursor-pointer text-xs"
                >
                  <option value="popular">Popularity</option>
                  <option value="rating">Highest Rating</option>
                  <option value="new">Release Date</option>
                </select>
              </div>
            </div>

            {/* Movies Grid */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 space-y-4">
                <Film size={36} className="text-zinc-300 mx-auto" />
                <h3 className="text-lg font-black text-zinc-900">No Movies Match Your Selected Filters</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try clearing some filter options or searching for a different movie title.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-lg bg-[#f76e28] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filtered.map((movie) => {
                  const isStreetFighter = movie.id === 'mov_street_fighter';
                  const isWishlisted = isTicketWishlisted(movie.id);

                  return (
                    <Link
                      key={movie.id}
                      to={`/tickets/movie/${movie.id}`}
                      className="group cursor-pointer flex flex-col anim-hover-lift"
                    >
                      {/* Poster */}
                      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-sm group-hover:shadow-2xl transition-all duration-300 border border-zinc-200/80 group-hover:border-orange-300">
                        <img
                          src={movie.poster || '/images/real/poster_1.jpg'}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/real/poster_1.jpg';
                          }}
                        />

                        {/* PROMOTED tag */}
                        {(isStreetFighter || movie.is_promoted) && (
                          <div className="absolute top-0 right-0 bg-[#f76e28] text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-bl-md shadow-xs">
                            PROMOTED
                          </div>
                        )}

                        {/* Wishlist Heart */}
                        <button
                          onClick={(e) => handleWishlist(e, movie)}
                          className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-110 z-10"
                          title="Wishlist"
                        >
                          <Heart size={14} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
                        </button>

                        {/* Rating Bar */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2.5 pt-6 flex items-center justify-between text-white">
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                            <Star size={11} className="fill-amber-400 text-amber-400" />
                            <span className="text-[11px] text-zinc-100">{movie.rating}/10</span>
                          </div>
                          <span className="text-[9px] text-zinc-300 font-semibold">
                            {movie.certificate}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="mt-2.5">
                        <h3 className="font-bold text-zinc-900 text-sm leading-snug group-hover:text-[#f76e28] transition-colors truncate">
                          {movie.title}
                        </h3>
                        <p className="text-xs text-zinc-500 truncate mt-0.5">
                          {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-zinc-400 uppercase font-semibold">
                          <span>{movie.language}</span>
                          <span>•</span>
                          <span>{movie.duration}</span>
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
