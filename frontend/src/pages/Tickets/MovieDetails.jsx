import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';
import { 
  Calendar, Clock, Star, MapPin, Play, Ticket as TicketIcon, 
  Bell, MessageSquare, AlertCircle, Share2, ThumbsUp, X, 
  Check, Heart, Info, Coffee, Smartphone, ChevronDown, Search
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { API } from '../../config/ticketApi';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const context = useOutletContext() || {};
  const selectedCity = context.selectedCity || 'Coimbatore';
  const { showToast } = useToast();

  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState({ lang: 'English', format: '2D' });
  const [activeDateIndex, setActiveDateIndex] = useState(0);
  const [showSubtitleNotice, setShowSubtitleNotice] = useState(true);
  const [likedTheatres, setLikedTheatres] = useState({});
  const [showRateModal, setShowRateModal] = useState(false);
  const [userRating, setUserRating] = useState(9);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const showtimesSectionRef = useRef(null);

  // Generate date strip matching screenshot 4 (e.g. FRI 16 OCT, SAT 17 OCT...)
  const generateDates = () => {
    const dates = [];
    const baseDate = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const dayNum = String(d.getDate()).padStart(2, '0');
      const monthName = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${dayNum}`;
      dates.push({
        dayName,
        dayNum,
        monthName,
        iso,
        label: i === 0 ? 'TODAY' : i === 1 ? 'TOM' : dayName
      });
    }
    return dates;
  };

  const dates = generateDates();
  const selectedDateObj = dates[activeDateIndex] || dates[0];

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API}/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        if (data.showtimes) {
          setShowtimes(data.showtimes);
        }
      })
      .catch(() => {
        // Fallback for Street Fighter
        setMovie({
          id: 'mov_street_fighter',
          title: 'Street Fighter',
          genre: ['Action', 'Adventure', 'Comedy', 'Thriller'],
          rating: 8.9,
          duration: '1h 59m',
          certificate: 'UA16+',
          release_date: '16 Oct, 2026',
          interested_count: '50.7K+',
          synopsis: 'Once inseparable fighters, Ryu and Ken are drawn out of their fractured lives when a covert force pulls them into the next World Warrior Tournament. What appears to be a contest of strength soon reveals a far more dangerous agenda, pushing them into a relentless battle not just for victory, but for survival against M. Bison and the shadowy syndicate of Shadaloo.',
          poster: '/images/action_poster_1780401266913.png',
          backdrop: '/images/cinematic_backdrop_1_1780401309164.png',
          formats: ['2D', 'MX4D', 'ICE', 'DOLBY CINEMA 2D', '2D SCREEN X', '+2'],
          languages: ['English', 'Hindi', '+2']
        });
      });
  }, [id]);

  const handleBookTicketsClick = () => {
    // Open language and format modal matching screenshot 3
    setShowFormatModal(true);
  };

  const handleSelectFormatAndProceed = (lang, format) => {
    setSelectedFormat({ lang, format });
    setShowFormatModal(false);
    // Smooth scroll down to the showtimes & theatres section matching screenshot 4
    if (showtimesSectionRef.current) {
      showtimesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectShowtime = (theatre, timeStr, showtimeId) => {
    const targetShowtimeId = showtimeId || 'st_sf_kg';
    navigate(
      `/tickets/booking/${targetShowtimeId}?time=${encodeURIComponent(timeStr)}&theatre=${encodeURIComponent(theatre.name)}&date=${selectedDateObj.iso}&lang=${selectedFormat.lang}&format=${selectedFormat.format}`
    );
  };

  const toggleLikeTheatre = (theatreId) => {
    setLikedTheatres(prev => ({
      ...prev,
      [theatreId]: !prev[theatreId]
    }));
  };

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f76e28]"></div>
      </div>
    );
  }

  // Pre-configured partner theatres matching screenshot 4
  const theatresList = [
    {
      id: 'th_broadway_coimbatore',
      name: 'Broadway Cinemas: Coimbatore',
      policy: 'Non-cancellable',
      isCancellable: false,
      amenities: ['M-Ticket', 'Food & Beverage'],
      showtimes: [
        { time: '10:15 PM', spec: '4K DOLBY ATMOS', status: 'available', id: 'st_sf_broadway' }
      ]
    },
    {
      id: 'th_kg_cinemas',
      name: 'KG Cinemas: Coimbatore',
      policy: 'Cancellation available',
      isCancellable: true,
      amenities: ['M-Ticket', 'Food & Beverage'],
      showtimes: [
        { time: '01:20 PM', spec: 'PALLAVI', status: 'available', id: 'st_sf_kg' }
      ]
    },
    {
      id: 'th_inox_prozone',
      name: 'INOX: Prozone Mall, Coimbatore',
      policy: 'Non-cancellable',
      isCancellable: false,
      amenities: ['M-Ticket', 'Food & Beverage'],
      showtimes: [
        { time: '03:45 PM', spec: 'INSIGNIA 4K', status: 'fast_filling', id: 'st_sf_inox' }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen text-zinc-900 font-sans pb-24">
      {/* ======================================================== */}
      {/* 1. CINEMATIC HERO BANNER (Matching Screenshot 2)         */}
      {/* ======================================================== */}
      <div className="relative bg-[#18181b] text-white overflow-hidden">
        {/* Full-bleed Backdrop Artwork */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={movie.backdrop || '/images/cinematic_backdrop_1_1780401309164.png'} 
            alt={movie.title}
            className="w-full h-full object-cover object-top opacity-35 filter brightness-75 scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/cinematic_backdrop_1_1780401309164.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-[#18181b]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          
          {/* Vertical Movie Poster with Trailer & In Cinemas badges */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative w-56 sm:w-64 lg:w-72 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/80 bg-zinc-900 group">
              <img 
                src={movie.poster || '/images/action_poster_1780401266913.png'} 
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/action_poster_1780401266913.png';
                }}
              />

              {/* Trailers (2) pill overlay */}
              <button
                onClick={() => setShowTrailer(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-all hover:scale-105 cursor-pointer shadow-lg"
              >
                <Play size={14} fill="currentColor" />
                <span>Trailers (2)</span>
              </button>

              {/* In cinemas badge at bottom */}
              <div className="absolute bottom-0 inset-x-0 py-1.5 bg-black/85 text-center text-[11px] font-bold uppercase tracking-widest text-zinc-300">
                In cinemas
              </div>
            </div>
          </div>

          {/* Details & CTA Column */}
          <div className="flex-1 space-y-4 max-w-3xl text-left">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                {movie.title}
              </h1>
              <button 
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast("Movie link copied to clipboard!", "info");
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Share Movie"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Interest Card matching screenshot 2 */}
            <div className="bg-[#242833]/90 border border-zinc-700/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg backdrop-blur-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ThumbsUp size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{movie.interested_count || '50.7K+'} are interested</span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Rating will appear once more reviews come in.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => showToast("Review submission open after premiere screenings!", "info")}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
              >
                Rate now
              </button>
            </div>

            {/* Metadata Line */}
            <div className="text-xs sm:text-sm font-medium text-zinc-300 flex flex-wrap items-center gap-2">
              <span>{movie.duration || '1h 59m'}</span>
              <span className="text-zinc-500">•</span>
              <span>{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</span>
              <span className="text-zinc-500">•</span>
              <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-[11px] font-bold border border-zinc-700 text-zinc-200">
                {movie.certificate || 'UA16+'}
              </span>
              <span className="text-zinc-500">•</span>
              <span>{movie.release_date || '16 Oct, 2026'}</span>
            </div>

            {/* Cinema Specs Ribbon (Matching Vehicle & Cinema Luxury Specs) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3 shadow-md">
              <div>
                <span className="text-lg sm:text-xl font-black text-amber-400 block">{movie.rating || '8.9'} ★</span>
                <span className="text-[9px] text-zinc-300 uppercase font-bold tracking-wider">Audience Rating</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-white block">{movie.certificate || 'UA16+'}</span>
                <span className="text-[9px] text-zinc-300 uppercase font-bold tracking-wider">Classification</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-white block">{movie.duration || '1h 59m'}</span>
                <span className="text-[9px] text-zinc-300 uppercase font-bold tracking-wider">Theatrical Runtime</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-[#f76e28] block">IMAX & Atmos</span>
                <span className="text-[9px] text-zinc-300 uppercase font-bold tracking-wider">Available Audio</span>
              </div>
            </div>

            {/* Formats Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1">Formats:</span>
              {(movie.formats || ['2D', 'MX4D', 'ICE', 'DOLBY CINEMA 2D', '2D SCREEN X', '+2']).map((fmt, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-bold text-zinc-200 anim-pill hover:bg-white/20 transition-all"
                >
                  {fmt}
                </span>
              ))}
            </div>

            {/* Languages Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1">Audio:</span>
              {(movie.languages || ['English', 'Hindi', '+2']).map((lang, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-bold text-zinc-200 anim-pill hover:bg-white/20 transition-all"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Primary Action Button: "Book tickets" */}
            <div className="pt-4">
              <button
                onClick={handleBookTicketsClick}
                className="px-10 py-3.5 rounded-xl bg-[#f76e28] hover:bg-[#de5713] active:scale-97 text-white font-black text-base shadow-xl hover:shadow-orange-500/25 transition-all duration-200 flex items-center gap-2.5 cursor-pointer anim-click-press"
              >
                <TicketIcon size={18} />
                <span>Book tickets</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. THEATRES & SHOWTIMES VIEW (Matching Screenshot 4)     */}
      {/* ======================================================== */}
      <section ref={showtimesSectionRef} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Title Header */}
        <div className="pb-4 border-b border-zinc-200">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            {movie.title} - ({selectedFormat.lang})
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full border border-zinc-300 text-zinc-600 text-[11px] font-medium">
              Movie runtime: {movie.duration || '1h 59m'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full border border-zinc-300 text-zinc-600 text-[11px] font-medium">
              {movie.certificate || 'UA16+'}
            </span>
            {(Array.isArray(movie.genre) ? movie.genre : ['Action', 'Adventure', 'Comedy', 'Thriller']).map((g, idx) => (
              <span key={idx} className="px-2.5 py-0.5 rounded-full border border-zinc-300 text-zinc-600 text-[11px] font-medium">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Date Strip & Filter Bar matching Screenshot 4 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-zinc-200 gap-4 py-3">
          
          {/* Horizontal Calendar Date Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {dates.map((d, idx) => {
              const isSelected = activeDateIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveDateIndex(idx)}
                  className={`flex flex-col items-center justify-center min-w-[62px] px-3 py-2 rounded-lg text-center transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#f76e28] text-white shadow-sm font-bold' 
                      : 'text-zinc-700 hover:bg-zinc-100 font-semibold'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider">{d.dayName}</span>
                  <span className="text-lg leading-tight font-black">{d.dayNum}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">{d.monthName}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Dropdowns matching screenshot 4 */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-700">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-zinc-300 hover:border-zinc-400 bg-white font-medium cursor-pointer">
              <span>{selectedFormat.lang} - {selectedFormat.format}</span>
              <ChevronDown size={14} className="text-zinc-500" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-zinc-300 hover:border-zinc-400 bg-white font-medium cursor-pointer">
              <span>Price Range</span>
              <ChevronDown size={14} className="text-zinc-500" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-zinc-300 hover:border-zinc-400 bg-white font-medium cursor-pointer">
              <span>Special Formats</span>
              <ChevronDown size={14} className="text-zinc-500" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-zinc-300 hover:border-zinc-400 bg-white font-medium cursor-pointer">
              <span>Preferred Time</span>
              <ChevronDown size={14} className="text-zinc-500" />
            </div>

            <div className="p-2 rounded-md border border-zinc-300 hover:border-zinc-400 bg-white cursor-pointer text-zinc-600">
              <Search size={15} />
            </div>
          </div>
        </div>

        {/* Subtitle language notice & Legend strip matching Screenshot 4 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 text-xs text-zinc-500 border-b border-zinc-100 gap-2">
          {showSubtitleNotice ? (
            <div className="flex items-center gap-2 text-zinc-600">
              <span>💬 indicates subtitle language, if available</span>
              <button onClick={() => setShowSubtitleNotice(false)} className="text-zinc-400 hover:text-zinc-700 p-0.5">
                <X size={13} />
              </button>
            </div>
          ) : <div></div>}

          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider self-end sm:self-auto">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              AVAILABLE
            </span>
            <span className="flex items-center gap-1.5 text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              FAST FILLING
            </span>
          </div>
        </div>

        {/* Theatres & Showtimes List matching Screenshot 4 */}
        <div className="space-y-4 pt-4">
          {theatresList.map((theatre) => {
            const isLiked = !!likedTheatres[theatre.id];

            return (
              <div 
                key={theatre.id}
                className="bg-white border border-zinc-200/90 rounded-2xl p-5 hover:border-orange-300 shadow-2xs hover:shadow-md anim-hover-lift transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Theatre Info Header */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>{theatre.name}</span>
                        <Info size={14} className="text-zinc-400 cursor-pointer hover:text-zinc-600" />
                      </h3>
                      <button 
                        onClick={() => toggleLikeTheatre(theatre.id)}
                        className="text-zinc-400 hover:text-rose-500 transition-colors p-1 anim-click-press"
                        title="Favorite Theatre"
                      >
                        <Heart size={16} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
                      </button>
                    </div>

                    <p className={`text-xs font-medium ${theatre.isCancellable ? 'text-emerald-600' : 'text-zinc-500'}`}>
                      {theatre.policy}
                    </p>

                    {/* Amenities tags (F&B, M-Ticket) */}
                    <div className="flex items-center gap-3 pt-1 text-xs text-amber-600">
                      <span className="flex items-center gap-1 font-semibold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        <Coffee size={12} /> Food & Beverage
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200/60">
                        <Smartphone size={12} /> M-Ticket
                      </span>
                    </div>
                  </div>

                  {/* Showtimes Pills */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0">
                    {theatre.showtimes.map((st, sIdx) => {
                      const isAvailable = st.status === 'available';

                      return (
                        <button
                          key={sIdx}
                          onClick={() => handleSelectShowtime(theatre, st.time, st.id)}
                          className={`flex flex-col items-center justify-center min-w-[130px] px-5 py-2.5 rounded-xl border-2 transition-all cursor-pointer group anim-pill anim-click-press ${
                            isAvailable 
                              ? 'border-emerald-500 hover:bg-emerald-50 text-emerald-700' 
                              : 'border-amber-500 hover:bg-amber-50 text-amber-700'
                          }`}
                        >
                          <span className="text-sm font-black tracking-tight">{st.time}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-700 mt-0.5">
                            {st.spec}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. ABOUT THE MOVIE, CAST, CREW & REVIEWS                 */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12">
        {/* Synopsis */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xs">
          <div>
            <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-3">
              About the movie
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-4xl">
              {movie.synopsis || movie.description}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-200">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
              GoMo Deals Cinema Assurance
            </h4>
            <p className="text-xs text-zinc-500">
              Verified cinema tickets booked on GoMo Tickets include instant digital barcode entry, zero printout requirements, and contactless snack pickup at {selectedCity} theatres.
            </p>
          </div>
        </div>

        {/* Cast Section */}
        <div>
          <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-6">
            Cast
          </h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
            {(movie.cast || [
              { name: 'Mike Moh', role: 'Ryu', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
              { name: 'Christian Howard', role: 'Ken Masters', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
              { name: 'Natasha Liu Bordizzo', role: 'Chun-Li', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
              { name: 'Alan Ritchson', role: 'Major Guile', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
              { name: 'Hiroyuki Sanada', role: 'Master Gouken', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
              { name: 'Jon Foo', role: 'Vega', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' }
            ]).map((member, idx) => (
              <div key={idx} className="flex flex-col items-center text-center min-w-[110px] w-[110px] flex-shrink-0 group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-200 group-hover:border-[#f76e28] shadow-md transition-all group-hover:scale-105 mb-2.5 bg-zinc-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 leading-tight group-hover:text-[#f76e28] transition-colors">{member.name}</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crew Section */}
        <div>
          <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-6">
            Crew
          </h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
            {(movie.crew || [
              { name: 'Chad Stahelski', role: 'Director', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
              { name: 'Derek Kolstad', role: 'Writer', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200' },
              { name: 'Hans Zimmer', role: 'Music Composer', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=200' }
            ]).map((member, idx) => (
              <div key={idx} className="flex flex-col items-center text-center min-w-[110px] w-[110px] flex-shrink-0 group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-200 group-hover:border-[#f76e28] shadow-md transition-all group-hover:scale-105 mb-2.5 bg-zinc-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 leading-tight group-hover:text-[#f76e28] transition-colors">{member.name}</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Reviews Section */}
        <div className="pt-4 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-zinc-900 tracking-tight">
              Top Reviews
            </h3>
            <button 
              onClick={() => setShowRateModal(true)}
              className="px-4 py-1.5 rounded-lg border border-[#f76e28] text-[#f76e28] hover:bg-orange-50 text-xs font-bold transition-all"
            >
              Write Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#f76e28] font-bold text-xs flex items-center justify-center">
                    AR
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-zinc-900">Arun R.</h5>
                    <span className="text-[10px] text-emerald-600 font-semibold">✓ Verified Ticket Holder</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star size={14} className="fill-amber-400" /> 9/10
                </div>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                "Incredible combat choreography and sound mixing in IMAX! Ryu and Ken martial arts tournament arc is faithful and super energetic."
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center">
                    SK
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-zinc-900">Sanjay Kumar</h5>
                    <span className="text-[10px] text-emerald-600 font-semibold">✓ Verified Ticket Holder</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star size={14} className="fill-amber-400" /> 10/10
                </div>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                "Broadway Cinemas Coimbatore 4K Dolby Atmos projection was phenomenal. Hadoukens shook the floor. Best action movie this season!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SELECT LANGUAGE & FORMAT MODAL (Matching Screenshot 3)*/}
      {/* ======================================================== */}
      {showFormatModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-zinc-200 animate-slide-up">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-zinc-100 mb-5">
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{movie.title}</p>
                <h3 className="text-lg font-black text-zinc-900">Select language and format</h3>
              </div>
              <button 
                onClick={() => setShowFormatModal(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language & Format Sections matching Screenshot 3 */}
            <div className="space-y-6">
              {/* ENGLISH SECTION */}
              <div>
                <div className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest mb-3">
                  ENGLISH
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => handleSelectFormatAndProceed('English', '2D')}
                    className="px-5 py-2 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                  >
                    2D
                  </button>
                  <button
                    onClick={() => handleSelectFormatAndProceed('English', 'IMAX 2D')}
                    className="px-5 py-2 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                  >
                    IMAX 2D
                  </button>
                  <button
                    onClick={() => handleSelectFormatAndProceed('English', '2D')}
                    className="px-4 py-2 rounded-full text-zinc-500 hover:text-zinc-800 text-xs font-semibold cursor-pointer"
                  >
                    Select all
                  </button>
                </div>
              </div>

              {/* TAMIL SECTION */}
              <div>
                <div className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest mb-3">
                  TAMIL
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => handleSelectFormatAndProceed('Tamil', '2D')}
                    className="px-5 py-2 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                  >
                    2D
                  </button>
                </div>
              </div>

              {/* HINDI SECTION */}
              <div>
                <div className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest mb-3">
                  HINDI
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => handleSelectFormatAndProceed('Hindi', '2D')}
                    className="px-5 py-2 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                  >
                    2D
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/50 z-20"
            >
              <X size={20} />
            </button>
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${movie.trailer_url || 'Way9Dexny3w'}?autoplay=1`} 
              title="Movie Trailer" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Rate Now Modal */}
      {showRateModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-zinc-200 animate-slide-up">
            <button 
              onClick={() => setShowRateModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="text-center space-y-1 mb-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f76e28] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                GoMo Verified Reviews
              </span>
              <h3 className="text-xl font-black text-zinc-900 pt-1">Rate {movie.title}</h3>
              <p className="text-xs text-zinc-500">How was your movie experience in {selectedCity}?</p>
            </div>

            {/* 10 Star Rating Bar */}
            <div className="flex items-center justify-center gap-1.5 py-4 border-y border-zinc-100 mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                  className="p-1 transition-transform hover:scale-125 cursor-pointer"
                >
                  <Star 
                    size={22} 
                    className={`${
                      (hoverRating || userRating) >= star 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-zinc-300'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <div className="text-center font-black text-lg text-zinc-800 mb-4">
              <span className="text-[#f76e28]">{hoverRating || userRating}</span> / 10
            </div>

            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Tell others about the action, acting, music and cinema atmosphere..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#f76e28]/20 mb-4"
            ></textarea>

            <button
              onClick={() => {
                showToast(`Thank you! Your ${userRating}/10 rating has been posted.`, "success");
                setShowRateModal(false);
                setReviewComment('');
              }}
              className="w-full py-3 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Submit Rating & Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
