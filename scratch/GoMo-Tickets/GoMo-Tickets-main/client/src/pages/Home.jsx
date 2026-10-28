import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Ticket as TicketIcon, Play, Star, ChevronRight, Sparkles, Percent, Clapperboard, MonitorPlay, Calendar } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { API } from '../config/api';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));

  const activeGenre = searchParams.get('genre') || '';
  const activeLang = searchParams.get('lang') || '';
  const activeSort = searchParams.get('sort') || 'newest';
  const searchQuery = searchParams.get('search') || '';
  const activeUpcoming = searchParams.get('upcoming') === 'true';

  useEffect(() => {
    if (ssoUser?.role === 'owner') {
      navigate('/owner', { replace: true });
      return;
    }
    if (ssoUser?.role === 'admin') {
      navigate('/admin', { replace: true });
      return;
    }
    
    setLoading(true);
    const query = new URLSearchParams();
    if (searchQuery) query.append('search', searchQuery);
    if (activeGenre) query.append('genre', activeGenre);
    const activeFormat = searchParams.get('format') || '';
    if (activeFormat) query.append('format', activeFormat);
    if (activeLang) query.append('lang', activeLang);
    if (activeSort) query.append('sort', activeSort);
    if (activeUpcoming) query.append('upcoming', 'true');

    fetch(`${API}/api/movies?${query.toString()}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }, [navigate, ssoUser?.role, searchQuery, activeGenre, activeLang, activeSort, activeUpcoming, searchParams.get('format')]);

  if (loading && movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const displayedMovies = movies;
  const featuredMovie = displayedMovies[0] || null;

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const trailers = {
    "Dune: Part Two": "Way9Dexny3w",
    "Kung Fu Panda 4": "_inKs4eeHiI",
    "Godzilla x Kong: The New Empire": "lV1OOlGwExM",
    "Ghostbusters: Frozen Empire": "w56C3x-2XfQ"
  };

  const hasTrailer = (movie) => {
    if (!movie) return false;
    if (movie.trailer_url) return true;
    return !!trailers[movie.title];
  };

  const getTrailerId = (movie) => {
    if (!movie) return "Way9Dexny3w";
    if (movie.trailer_url) {
      try {
        const url = movie.trailer_url;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
          return match[2];
        }
        return url;
      } catch (e) {
        return movie.trailer_url;
      }
    }
    return trailers[movie.title] || "Way9Dexny3w";
  };

  return (
    <div className="animate-fadeIn pb-20 bg-white text-zinc-900 min-h-screen">
      {/* 
        HERO SECTION - Cinematic Edge-to-Edge
      */}
      {featuredMovie && (
        <div className="relative w-full h-[85vh] min-h-[600px] flex items-end pb-20">
          {/* Background Image Full Bleed */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={featuredMovie.backdrop || 'https://placehold.co/1200x600/111111/ffffff.png?text=Movie+Backdrop'} 
              alt={featuredMovie.title} 
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x600/111111/ffffff.png?text=No+Image'; }}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-slide-up">
              
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-600 text-white font-bold text-[10px] uppercase tracking-[0.2em]">
                  <Sparkles size={14} /> Premiere
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] uppercase tracking-[0.2em]">
                  IMAX 3D
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-sans font-black mb-4 leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                {featuredMovie.title}
              </h1>
              
              <div className="flex items-center gap-6 text-zinc-300 font-bold mb-8 text-sm uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-orange-400">
                  <Star className="fill-orange-400" size={16} /> {featuredMovie.rating}
                </span>
                <span>{featuredMovie.duration}</span>
                <span className="text-zinc-600">•</span>
                <span>{featuredMovie.genre.join(', ')}</span>
              </div>

              <p className="text-lg text-zinc-400 mb-10 font-medium leading-relaxed max-w-2xl line-clamp-3">
                {featuredMovie.synopsis}
              </p>
              
              <div className="flex flex-wrap gap-5">
                <Link 
                  to={`/movie/${featuredMovie.id}`}
                  className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all flex items-center gap-3 text-lg uppercase tracking-wide"
                >
                  <TicketIcon size={22} /> 
                  Book Tickets
                </Link>
                {hasTrailer(featuredMovie) && (
                  <button 
                    onClick={() => setShowTrailer(true)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all hover:scale-105 text-lg uppercase tracking-wide"
                  >
                    <Play size={22} className="text-white" fill="currentColor" />
                    Watch Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Trailer Modal */}
          {showTrailer && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl animate-fadeIn p-4">
              <div className="w-full max-w-6xl relative animate-slide-up">
                <button 
                  onClick={() => setShowTrailer(false)}
                  className="absolute -top-16 right-0 text-zinc-400 hover:text-white font-bold flex items-center gap-3 transition-colors uppercase tracking-widest text-sm"
                >
                  Close <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:border-white">✕</div>
                </button>
                <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-zinc-800">
                  <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${getTrailerId(featuredMovie)}?autoplay=1`} 
                  title="Trailer" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* OFFERS SECTION - Minimal Clean */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-20 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white p-6 rounded-3xl flex items-center gap-5 hover:border-orange-500/50 transition-colors cursor-pointer group">
            <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform">
              <Percent size={28} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-lg tracking-tight">Bank Offers</h3>
              <p className="text-zinc-500 font-medium text-sm mt-1">Up to 50% off on credit cards</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white p-6 rounded-3xl flex items-center gap-5 hover:border-orange-500/50 transition-colors cursor-pointer group">
            <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform">
              <Clapperboard size={28} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-lg tracking-tight">GMD Premiere</h3>
              <p className="text-zinc-500 font-medium text-sm mt-1">Exclusive pre-release screenings</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white p-6 rounded-3xl flex items-center gap-5 hover:border-orange-500/50 transition-colors cursor-pointer group">
            <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform">
              <MonitorPlay size={28} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-lg tracking-tight">IMAX Experience</h3>
              <p className="text-zinc-500 font-medium text-sm mt-1">Feel the movie in 4K resolution</p>
            </div>
          </div>
        </div>
      </div>

      {/* MOVIES GRID - Cinematic Posters */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-black text-zinc-900 tracking-tight">
              {activeUpcoming ? "Upcoming Releases" : "Now Showing"}
            </h2>
            <p className="text-zinc-500 text-base mt-2 font-medium">
              {activeUpcoming ? "Anticipate the next big blockbusters" : "Handpicked blockbusters just for you"}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar items-center">
              <button
                onClick={() => handleFilterChange('upcoming', activeUpcoming ? '' : 'true')}
                className={`font-bold px-4 py-2 rounded-xl text-sm transition-colors ${activeUpcoming ? 'bg-orange-600 text-white border-orange-600' : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
              >
                Upcoming
              </button>
              <select 
                value={activeGenre} 
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="bg-white border border-zinc-200 text-zinc-700 font-bold px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-orange-500 hover:bg-zinc-50"
              >
                <option value="">All Genres</option>
                <option value="Action">Action</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Animation">Animation</option>
              </select>
              
              <select 
                value={activeLang} 
                onChange={(e) => handleFilterChange('lang', e.target.value)}
                className="bg-white border border-zinc-200 text-zinc-700 font-bold px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-orange-500 hover:bg-zinc-50"
              >
                <option value="">All Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Spanish">Spanish</option>
              
              </select>
              <select 
                value={searchParams.get('format') || ''} 
                onChange={(e) => handleFilterChange('format', e.target.value)}
                className="bg-white border border-zinc-200 text-zinc-700 font-bold px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-orange-500 hover:bg-zinc-50"
              >
                <option value="">All Formats</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="IMAX">IMAX</option>
                <option value="4DX">4DX</option>
              </select>
              <select 
                value={activeSort} 
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="bg-zinc-900 text-white font-bold px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-zinc-800"
              >
                <option value="newest">Newest Releases</option>
                <option value="rating">Highest Rated</option>
                <option value="a-z">A - Z</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {displayedMovies.length > 0 ? displayedMovies.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(234,88,12,0.15)] border border-zinc-100 hover:border-orange-200 transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative aspect-[2/3] w-full bg-zinc-100 overflow-hidden">
                <img 
                  src={movie.poster || 'https://placehold.co/400x600/f4f4f5/94a3b8.png?text=Movie+Poster'} 
                  alt={movie.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x600/f4f4f5/94a3b8.png?text=No+Image'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 shadow-lg">
                  <Star size={14} className="text-orange-400 fill-orange-400" /> <span className="text-xs">{movie.avg_rating || movie.rating}</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {(() => {
                    const isComingSoon = movie.release_date && new Date(movie.release_date) > new Date();
                    if (isComingSoon) {
                      const daysUntil = Math.ceil((new Date(movie.release_date) - new Date()) / (1000 * 60 * 60 * 24));
                      return (
                        <div className="bg-slate-900/90 backdrop-blur text-white w-full py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg border border-slate-700">
                          <Calendar size={18} /> In {daysUntil} Days
                        </div>
                      );
                    }
                    return (
                      <div className="bg-orange-600 text-white w-full py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg">
                        <TicketIcon size={18} /> Book Now
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">{movie.title}</h3>
                  <p className="text-zinc-500 text-xs font-bold line-clamp-1 uppercase tracking-wider mb-3">
                    {movie.genre.join(' • ')}
                  </p>
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mt-auto">
                  <span>{movie.duration}</span>
                  <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded-md font-bold">IMAX</span>
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full py-12 text-center text-zinc-500 font-medium">
              No movies found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
