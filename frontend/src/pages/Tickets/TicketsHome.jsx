import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Ticket as TicketIcon, Play, Star, ChevronRight, ChevronLeft, 
  Sparkles, Percent, Clapperboard, MonitorPlay, Calendar, ThumbsUp,
  Heart, Music, Mic, Trophy, Drama, Palette, Compass, MapPin, Bus
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';
import { API } from '../../config/ticketApi';
import { 
  MOCK_MOVIES, MOCK_EVENTS, toggleTicketWishlist, isTicketWishlisted 
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
  { id: 'buses', label: 'Bus Tickets', icon: Bus, path: '/tickets/buses', color: 'text-[#f76e28]' },
  { id: 'concerts', label: 'Concerts', icon: Music, path: '/tickets/events?category=concerts', color: 'text-purple-600' },
  { id: 'comedy', label: 'Stand-up Comedy', icon: Mic, path: '/tickets/events?category=stand-up comedy', color: 'text-amber-600' },
  { id: 'sports', label: 'Sports', icon: Trophy, path: '/tickets/events?category=sports', color: 'text-blue-600' },
  { id: 'theatre', label: 'Theatre & Plays', icon: Drama, path: '/tickets/events?category=theatre', color: 'text-rose-600' },
  { id: 'activities', label: 'Activities', icon: Compass, path: '/tickets/events?category=activities', color: 'text-emerald-600' }
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
  const sportsScrollRef = useRef(null);

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
  const sportsAndActivities = MOCK_EVENTS.filter(e => e.category === 'Sports' || e.category === 'Activities' || e.category === 'Theatre');

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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {CATEGORIES_NAV.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.path}
                className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-[#f76e28] transition-all group cursor-pointer text-center"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-50 group-hover:bg-orange-50 flex items-center justify-center mb-2 transition-colors">
                  <Icon size={20} className={`${cat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="text-xs font-bold text-zinc-800 group-hover:text-[#f76e28] transition-colors leading-tight">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bus Booking Quick Hub Banner */}
        <div className="mt-6 bg-gradient-to-r from-[#1f2533] via-zinc-900 to-[#121620] text-white rounded-2xl p-5 sm:p-6 border border-zinc-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f76e28]/20 border border-[#f76e28]/40 text-[#f76e28] flex items-center justify-center flex-shrink-0">
              <Bus size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-[#f76e28] px-2 py-0.5 rounded">
                  NEW SERVICE
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Intercity Bus Booking across South India
                </h3>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                Direct AC Sleepers & Multi-Axle Volvo buses between Coimbatore, Chennai, Bengaluru, Madurai & more with live seat selection.
              </p>
            </div>
          </div>
          <Link
            to="/tickets/buses"
            className="px-5 py-3 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Book Bus Tickets</span>
            <ChevronRight size={15} />
          </Link>
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
      {/* 5. SPORTS & WEEKEND EXPERIENCES SECTION                  */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Sports & Weekend Experiences
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Stadium matches, artisan pottery workshops, tea plantation trails & stage theatre.
            </p>
          </div>

          <Link 
            to="/tickets/events?category=sports"
            className="text-xs sm:text-sm font-bold text-[#f76e28] hover:text-[#e05b16] flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportsAndActivities.map((evt) => {
            const isWish = isTicketWishlisted(evt.id);

            return (
              <Link
                key={evt.id}
                to={`/tickets/event/${evt.id}`}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-zinc-200/80 hover:shadow-xl transition-all duration-300 flex flex-col group-hover:-translate-y-1"
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
                    <h3 className="font-bold text-zinc-900 text-base leading-snug group-hover:text-[#f76e28] transition-colors truncate">
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
                      <span className="text-base font-black text-zinc-900">
                        {formatLocalPrice(evt.price)}
                      </span>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-lg bg-orange-50 text-[#f76e28] font-bold text-xs uppercase tracking-wider group-hover:bg-[#f76e28] group-hover:text-white transition-colors">
                      Book Now
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
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
