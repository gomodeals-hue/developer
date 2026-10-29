import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Ticket as TicketIcon, Play, Star, ChevronRight, ChevronLeft, 
  Sparkles, Percent, Clapperboard, MonitorPlay, Calendar, ThumbsUp,
  Heart, Music, Mic, Trophy, Drama, Palette, Compass, MapPin, Bus,
  Train, Plane, ArrowRight, Zap, Luggage
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';
import { API } from '../../config/ticketApi';
import { 
  MOCK_MOVIES, MOCK_EVENTS, MOCK_TRAINS, MOCK_FLIGHTS, toggleTicketWishlist, isTicketWishlisted 
} from '../../data/mockTicketData';

const BILLBOARD_SLIDES = [
  {
    id: 'slide_gnr',
    tag: 'BANDLAND ON TOUR',
    title: "GUNS N' ROSES",
    subtext: 'NOV 14 | BENGALURU',
    sponsor: 'In Association with GoMo Deals',
    bgGradient: 'from-amber-950 via-zinc-950 to-black',
    accentColor: '#f76e28',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Book Concert Passes',
    ctaLink: '/tickets/event/evt_gnr'
  },
  {
    id: 'slide_sf',
    tag: 'WORLD WARRIOR PREMIERE',
    title: 'STREET FIGHTER (2026)',
    subtext: 'IN CINEMAS 16 OCT • 2D, IMAX 2D & 4K',
    sponsor: 'Exclusive GoMo Deals Partner',
    bgGradient: 'from-rose-950 via-zinc-950 to-black',
    accentColor: '#ea580c',
    image: '/images/cinematic_backdrop_1_1780401309164.png',
    ctaText: 'Book Street Fighter Tickets',
    ctaLink: '/tickets/movie/mov_street_fighter'
  },
  {
    id: 'slide_imax',
    tag: 'GMD PREMIERE PASS',
    title: 'IMAX LASER & 4K FESTIVAL',
    subtext: 'FLAT 25% CASHBACK ON CONCESSIONS & COMBOS',
    sponsor: 'GoMo Deals Concessions Club',
    bgGradient: 'from-blue-950 via-zinc-950 to-black',
    accentColor: '#3b82f6',
    image: '/images/cinematic_backdrop_2_1780401320953.png',
    ctaText: 'Explore All Movies',
    ctaLink: '/tickets/movies'
  }
];

const CATEGORIES_NAV = [
  { id: 'movies', label: 'Movies', icon: Clapperboard, path: '/tickets/movies', color: 'text-[#f76e28]' },
  { id: 'trains', label: 'Train Tickets', icon: Train, path: '/tickets/trains', color: 'text-amber-500' },
  { id: 'flights', label: 'Flight Tickets', icon: Plane, path: '/tickets/flights', color: 'text-sky-500' },
  { id: 'buses', label: 'Bus Tickets', icon: Bus, path: '/tickets/buses', color: 'text-emerald-500' },
  { id: 'concerts', label: 'Concerts', icon: Music, path: '/tickets/events?category=concerts', color: 'text-purple-600' },
  { id: 'comedy', label: 'Stand-up Comedy', icon: Mic, path: '/tickets/events?category=stand-up comedy', color: 'text-rose-500' }
];

export default function TicketsHome() {
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const context = useOutletContext() || {};
  const selectedCity = context.selectedCity || 'Coimbatore';
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();
  const [wishlistTick, setWishlistTick] = useState(0);

  const moviesScrollRef = useRef(null);
  const eventsScrollRef = useRef(null);

  const activeGenre = searchParams.get('genre') || '';
  const activeLang = searchParams.get('lang') || '';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const query = new URLSearchParams();
    if (searchQuery) query.append('search', searchQuery);
    if (activeGenre) query.append('genre', activeGenre);
    if (activeLang) query.append('lang', activeLang);

    fetch(`${API}/api/movies?${query.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const sf = data.find(m => m.id === 'mov_street_fighter');
          const others = data.filter(m => m.id !== 'mov_street_fighter');
          const sorted = sf ? [sf, ...others] : data;
          setMovies(sorted);
        } else {
          // Fallback to rich mock data
          setMovies(MOCK_MOVIES);
        }
      })
      .catch(() => {
        setMovies(MOCK_MOVIES);
      });
  }, [searchQuery, activeGenre, activeLang]);

  // Auto-slide billboard carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BILLBOARD_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleWishlistToggle = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = toggleTicketWishlist(item);
    setWishlistTick(prev => prev + 1);
    showToast(isAdded ? `Added "${item.title}" to Wishlist` : `Removed from Wishlist`, 'info');
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const scrollTrack = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentBillboard = BILLBOARD_SLIDES[currentSlide];

  // Group events for home sections
  const liveConcerts = MOCK_EVENTS.filter(e => e.category === 'Concerts' || e.category === 'Stand-up Comedy');

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-24">
      {/* ======================================================== */}
      {/* 1. HERO EVENT BILLBOARD CAROUSEL                         */}
      {/* ======================================================== */}
      <section className="bg-zinc-950 text-white relative overflow-hidden py-4 sm:py-6 border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-zinc-900 to-black h-[220px] sm:h-[300px] md:h-[360px] shadow-2xl flex items-center">
            
            {/* Background Artwork */}
            <div className="absolute inset-0">
              <img 
                src={currentBillboard.image} 
                alt={currentBillboard.title}
                className="w-full h-full object-cover object-center opacity-65 transition-all duration-700 scale-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/cinematic_backdrop_1_1780401309164.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent"></div>
            </div>

            {/* Billboard Content */}
            <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#f76e28]/20 border border-[#f76e28]/40 text-[#f76e28] text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                {currentBillboard.tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md leading-tight mb-2">
                {currentBillboard.title}
              </h2>
              <p className="text-sm sm:text-lg font-bold text-amber-400 mb-2">
                {currentBillboard.subtext}
              </p>
              <p className="text-xs text-zinc-400 mb-6 hidden sm:block">
                {currentBillboard.sponsor} • Showing in {selectedCity} & major cities
              </p>

              <Link
                to={currentBillboard.ctaLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                <TicketIcon size={16} />
                <span>{currentBillboard.ctaText}</span>
              </Link>
            </div>

            {/* Carousel Nav Arrows */}
            <button
              onClick={() => setCurrentSlide(prev => (prev === 0 ? BILLBOARD_SLIDES.length - 1 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % BILLBOARD_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {BILLBOARD_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-6 bg-[#f76e28]' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CATEGORY QUICK DISCOVERY TILES STRIP                  */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES_NAV.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.path}
                className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-lg hover:border-[#f76e28] transition-all group cursor-pointer text-center relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 group-hover:bg-orange-50 flex items-center justify-center mb-2.5 transition-colors">
                  <Icon size={24} className={`${cat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="text-xs sm:text-sm font-black text-zinc-800 group-hover:text-[#f76e28] transition-colors leading-tight">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Multi-Transit Travel Hub Banner: Trains, Flights & Buses */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Train Ticket Booking Card */}
          <div className="bg-gradient-to-br from-[#1a2233] via-[#121724] to-zinc-950 text-white rounded-2xl p-5 border border-zinc-800 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-zinc-800/20 group-hover:text-amber-500/10 transition-colors pointer-events-none">
              <Train size={110} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  IRCTC PARTNER
                </span>
                <span className="text-[11px] text-zinc-400 font-bold">Zero Gateway Fee</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                Train Ticket Booking
              </h3>
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                Vande Bharat, Shatabdi & Superfast trains across Indian Railways. Instant PNR confirmation & free cancellation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">Fares from ₹185</span>
              <Link
                to="/tickets/trains"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Book Trains</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* 2. Aeroplane / Flight Ticket Booking Card */}
          <div className="bg-gradient-to-br from-[#0e1e33] via-[#091524] to-zinc-950 text-white rounded-2xl p-5 border border-zinc-800 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-zinc-800/20 group-hover:text-sky-500/10 transition-colors pointer-events-none">
              <Plane size={110} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-0.5 rounded-full">
                  IATA CERTIFIED
                </span>
                <span className="text-[11px] text-zinc-400 font-bold">0% Convenience Fee</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                Aeroplane Ticket Booking
              </h3>
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                IndiGo, Air India, Vistara, Akasa Air & international airlines. Web check-in & verified baggage included.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">Nonstop from ₹3,120</span>
              <Link
                to="/tickets/flights"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Book Flights</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* 3. Bus Ticket Booking Card */}
          <div className="bg-gradient-to-br from-[#18261e] via-[#101b15] to-zinc-950 text-white rounded-2xl p-5 border border-zinc-800 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-zinc-800/20 group-hover:text-emerald-500/10 transition-colors pointer-events-none">
              <Bus size={110} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  LIVE SEAT MAP
                </span>
                <span className="text-[11px] text-zinc-400 font-bold">24x7 Live GPS</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                Intercity Bus Booking
              </h3>
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                Direct AC Sleepers & Multi-Axle Volvo buses between Coimbatore, Chennai, Bengaluru, Madurai & South India.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">Sleepers from ₹480</span>
              <Link
                to="/tickets/buses"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Book Buses</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. RECOMMENDED MOVIES SECTION                             */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-1 shrink-0">Filter:</span>
          {['all', 'Tamil', 'English', 'Telugu', 'Hindi'].map((l) => (
            <button
              key={l}
              onClick={() => handleFilterChange('lang', l)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                (activeLang === l || (!activeLang && l === 'all'))
                  ? 'bg-[#f76e28] text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300'
              }`}
            >
              {l === 'all' ? 'All Languages' : l}
            </button>
          ))}
          <div className="w-px h-4 bg-zinc-300 mx-1 shrink-0"></div>
          {['all', 'Action', 'Comedy', 'Thriller', 'Romance'].map((g) => (
            <button
              key={g}
              onClick={() => handleFilterChange('genre', g)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                (activeGenre === g || (!activeGenre && g === 'all'))
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300'
              }`}
            >
              {g === 'all' ? 'All Genres' : g}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Recommended Movies
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Handpicked blockbusters playing in <span className="font-semibold text-zinc-700">{selectedCity}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/tickets/movies"
              className="text-xs sm:text-sm font-bold text-[#f76e28] hover:text-[#e05b16] flex items-center gap-1 group"
            >
              <span>See All</span>
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Movies Horizontal Carousel Container */}
        <div className="relative group/slider">
          <button
            onClick={() => scrollTrack(moviesScrollRef, 'left')}
            className="absolute -left-3.5 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-xl z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hidden md:flex"
            aria-label="Previous movies"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => scrollTrack(moviesScrollRef, 'right')}
            className="absolute -right-3.5 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-xl z-20 opacity-90 hover:opacity-100 transition-opacity cursor-pointer hidden md:flex"
            aria-label="Next movies"
          >
            <ChevronRight size={22} />
          </button>

          {/* Cards Track */}
          <div 
            ref={moviesScrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 scroll-smooth"
          >
            {movies.map((movie) => {
              const isStreetFighter = movie.id === 'mov_street_fighter';
              const hasPromotedTag = isStreetFighter || movie.is_promoted;
              const isWish = isTicketWishlisted(movie.id);

              return (
                <Link
                  key={movie.id}
                  to={`/tickets/movie/${movie.id}`}
                  className="min-w-[200px] w-[200px] sm:min-w-[220px] sm:w-[220px] flex-shrink-0 group cursor-pointer"
                >
                  {/* Poster Card */}
                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-900 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 border border-zinc-200/80">
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
                    {hasPromotedTag && (
                      <div className="absolute top-0 right-0 bg-[#f76e28] text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-bl-lg shadow-sm">
                        PROMOTED
                      </div>
                    )}

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => handleWishlistToggle(e, movie)}
                      className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-110 z-10 cursor-pointer"
                      title="Wishlist"
                    >
                      <Heart size={14} className={isWish ? 'fill-rose-500 text-rose-500' : ''} />
                    </button>

                    {/* Rating Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                        {movie.interested_count ? (
                          <>
                            <ThumbsUp size={12} className="text-emerald-400" />
                            <span className="text-[11px] text-zinc-100">{movie.interested_count} interested</span>
                          </>
                        ) : (
                          <>
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <span className="text-[11px] text-zinc-100">{movie.rating || '8.8'}/10</span>
                          </>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-300 font-medium">
                        {movie.certificate || 'UA16+'}
                      </span>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="mt-2.5">
                    <h3 className="font-bold text-zinc-900 text-sm sm:text-base leading-snug group-hover:text-[#f76e28] transition-colors truncate">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-zinc-500 truncate mt-0.5 font-normal">
                      {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre || 'Action, Thriller'}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        {movie.language || 'English'}
                      </span>
                      {movie.duration && (
                        <>
                          <span className="text-zinc-300">•</span>
                          <span className="text-[10px] text-zinc-400 font-medium">{movie.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. UPCOMING LIVE EVENTS & CONCERTS SECTION               */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Top Live Concerts & Stand-up Shows
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Experience electrifying arena tours, iconic symphonies and top comedians live.
            </p>
          </div>

          <Link 
            to="/tickets/events"
            className="text-xs sm:text-sm font-bold text-[#f76e28] hover:text-[#e05b16] flex items-center gap-1 group"
          >
            <span>See All Events</span>
            <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="relative group/eventslider">
          <button
            onClick={() => scrollTrack(eventsScrollRef, 'left')}
            className="absolute -left-3.5 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-xl z-20 opacity-0 group-hover/eventslider:opacity-100 transition-opacity cursor-pointer hidden md:flex"
            aria-label="Previous events"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => scrollTrack(eventsScrollRef, 'right')}
            className="absolute -right-3.5 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-xl z-20 opacity-90 hover:opacity-100 transition-opacity cursor-pointer hidden md:flex"
            aria-label="Next events"
          >
            <ChevronRight size={22} />
          </button>

          <div 
            ref={eventsScrollRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar py-2 scroll-smooth"
          >
            {liveConcerts.map((evt) => {
              const isWish = isTicketWishlisted(evt.id);

              return (
                <Link
                  key={evt.id}
                  to={`/tickets/event/${evt.id}`}
                  className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] flex-shrink-0 group cursor-pointer bg-white rounded-2xl overflow-hidden border border-zinc-200/80 hover:shadow-xl transition-all duration-300 flex flex-col group-hover:-translate-y-1"
                >
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
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#f76e28] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#f76e28]/30">
                      {evt.category}
                    </div>

                    <button
                      onClick={(e) => handleWishlistToggle(e, evt)}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-110 z-10 cursor-pointer"
                      title="Wishlist"
                    >
                      <Heart size={13} className={isWish ? 'fill-rose-500 text-rose-500' : ''} />
                    </button>

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

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm sm:text-base leading-snug group-hover:text-[#f76e28] transition-colors truncate">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">
                        {evt.artist}
                      </p>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-2 truncate">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between">
                      <div>
                        <span className="block text-[9px] text-zinc-400 uppercase font-bold">Starts from</span>
                        <span className="text-sm sm:text-base font-black text-zinc-900">
                          {formatLocalPrice(evt.price)}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-orange-50 text-[#f76e28] font-bold text-xs uppercase tracking-wider group-hover:bg-[#f76e28] group-hover:text-white transition-colors">
                        Book Passes
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FASTEST TRAINS & NON-STOP FLIGHTS SHOWCASE            */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#f76e28] px-2.5 py-0.5 rounded-full border border-orange-500/20">
                HIGH SPEED TRAVEL
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                Vande Bharat Trains & Non-Stop Flights
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Top routes with verified live tracking, hot meal services, zero cancellation fees and best price guarantee.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/tickets/trains"
              className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Train size={14} className="text-amber-600" />
              <span>All Trains</span>
            </Link>
            <Link 
              to="/tickets/flights"
              className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plane size={14} className="text-sky-600" />
              <span>All Flights</span>
            </Link>
          </div>
        </div>

        {/* Showcase Grid: 3 Top Trains + 3 Top Flights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Train 1: Vande Bharat */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl transition-all p-5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-orange-50 text-[#f76e28] px-2.5 py-0.5 rounded-md border border-orange-200">
                  VANDE BHARAT 130 km/h
                </span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Zap size={11} fill="currentColor" />
                  <span>On-time 98%</span>
                </span>
              </div>
              <h3 className="text-base font-black text-zinc-900 leading-snug group-hover:text-[#f76e28] transition-colors">
                Coimbatore ➔ Chennai Central Vande Bharat
              </h3>
              <p className="text-xs text-zinc-500 mt-1">#20644 • 06:00 AM ➔ 11:50 AM (5h 50m)</p>
              <div className="mt-3 py-2 px-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">Hot Breakfast Included</span>
                <span className="font-bold text-zinc-900">AC Chair Car</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase">Fare from</span>
                <span className="text-base sm:text-lg font-black text-zinc-900">
                  {formatLocalPrice(1025)}
                </span>
              </div>
              <Link
                to="/tickets/trains?from=Coimbatore&to=Chennai"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Train</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Train 2: Bengaluru Vande Bharat */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl transition-all p-5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-orange-50 text-[#f76e28] px-2.5 py-0.5 rounded-md border border-orange-200">
                  HIGH SPEED EXPRESS
                </span>
                <span className="text-[11px] font-bold text-emerald-600">Daily Service</span>
              </div>
              <h3 className="text-base font-black text-zinc-900 leading-snug group-hover:text-[#f76e28] transition-colors">
                Bengaluru ➔ Coimbatore Vande Bharat
              </h3>
              <p className="text-xs text-zinc-500 mt-1">#20641 • 01:40 PM ➔ 08:00 PM (6h 20m)</p>
              <div className="mt-3 py-2 px-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">Evening Refreshments</span>
                <span className="font-bold text-zinc-900">Executive / CC</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase">Fare from</span>
                <span className="text-base sm:text-lg font-black text-zinc-900">
                  {formatLocalPrice(995)}
                </span>
              </div>
              <Link
                to="/tickets/trains?from=Bengaluru&to=Coimbatore"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Train</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Flight 1: IndiGo Nonstop */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl transition-all p-5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-md border border-sky-200">
                  NON-STOP 1h 05m
                </span>
                <span className="text-[11px] font-bold text-sky-600">IndiGo 6E 243</span>
              </div>
              <h3 className="text-base font-black text-zinc-900 leading-snug group-hover:text-[#f76e28] transition-colors">
                Coimbatore (CJB) ➔ Chennai (MAA)
              </h3>
              <p className="text-xs text-zinc-500 mt-1">08:15 AM ➔ 09:20 AM • Morning Flight</p>
              <div className="mt-3 py-2 px-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">7kg Cabin + 15kg Baggage</span>
                <span className="font-bold text-emerald-600">Instant PNR</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase">Fare from</span>
                <span className="text-base sm:text-lg font-black text-zinc-900">
                  {formatLocalPrice(3490)}
                </span>
              </div>
              <Link
                to="/tickets/flights?from=CJB&to=MAA"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Flight</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Flight 2: Air India Nonstop */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl transition-all p-5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-md border border-rose-200">
                  FREE HOT MEAL
                </span>
                <span className="text-[11px] font-bold text-rose-600">Air India AI 582</span>
              </div>
              <h3 className="text-base font-black text-zinc-900 leading-snug group-hover:text-[#f76e28] transition-colors">
                Coimbatore (CJB) ➔ Bengaluru (BLR)
              </h3>
              <p className="text-xs text-zinc-500 mt-1">10:45 AM ➔ 11:45 AM • 1h 00m Direct</p>
              <div className="mt-3 py-2 px-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">20kg Check-in Baggage</span>
                <span className="font-bold text-zinc-900">Terminal 2</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase">Fare from</span>
                <span className="text-base sm:text-lg font-black text-zinc-900">
                  {formatLocalPrice(3120)}
                </span>
              </div>
              <Link
                to="/tickets/flights?from=CJB&to=BLR"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Flight</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Train 3: Tejas Rajdhani */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl transition-all p-5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 px-2.5 py-0.5 rounded-md border border-red-200">
                  TEJAS RAJDHANI
                </span>
                <span className="text-[11px] font-bold text-red-600">Speed 140 km/h</span>
              </div>
              <h3 className="text-base font-black text-zinc-900 leading-snug group-hover:text-[#f76e28] transition-colors">
                New Delhi ➔ Mumbai Central Rajdhani
              </h3>
              <p className="text-xs text-zinc-500 mt-1">#12952 • 04:55 PM ➔ 08:35 AM (15h 40m)</p>
              <div className="mt-3 py-2 px-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">All Meals & Bedroll Included</span>
                <span className="font-bold text-zinc-900">1A / 2A / 3A</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase">Fare from</span>
                <span className="text-base sm:text-lg font-black text-zinc-900">
                  {formatLocalPrice(2190)}
                </span>
              </div>
              <Link
                to="/tickets/trains?from=Delhi-NCR&to=Mumbai"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Train</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Flight 3: Vistara Luxury */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl transition-all p-5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-md border border-purple-200">
                  LUXURY FLYING
                </span>
                <span className="text-[11px] font-bold text-purple-600">Vistara UK 835</span>
              </div>
              <h3 className="text-base font-black text-zinc-900 leading-snug group-hover:text-[#f76e28] transition-colors">
                Mumbai (BOM) ➔ Delhi (DEL)
              </h3>
              <p className="text-xs text-zinc-500 mt-1">07:30 AM ➔ 09:40 AM • 2h 10m Non-stop</p>
              <div className="mt-3 py-2 px-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">Starbucks & Gourmet Dining</span>
                <span className="font-bold text-zinc-900">Airbus A321LR</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase">Fare from</span>
                <span className="text-base sm:text-lg font-black text-zinc-900">
                  {formatLocalPrice(6420)}
                </span>
              </div>
              <Link
                to="/tickets/flights?from=BOM&to=DEL"
                className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Flight</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. PROMOTIONS & CONCESSIONS BANNER                       */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-zinc-700/60">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#f76e28] bg-orange-950/60 border border-orange-800/60 px-2.5 py-1 rounded-full">
              GoMo Deals Concession Lounge
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Pre-Book Popcorn & Nachos at Flat 20% Off
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Skip theatre counter queues in {selectedCity}. Get verified combos delivered directly to your assigned seat row.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/tickets/movie/mov_street_fighter"
              className="px-6 py-2.5 rounded-lg bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Book Movie Combos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
