import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, MapPin, Play, Ticket as TicketIcon, Bell, MessageSquare, AlertCircle } from 'lucide-react';
import WaitlistModal from '../components/WaitlistModal';
import { useToast } from '../context/ToastContext';
import { API } from '../config/api';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [waitlistData, setWaitlistData] = useState({ isOpen: false, showtimeId: null, time: null });
  const [availability, setAvailability] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');
  
  // Date Selector Logic
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const fullDate = `${year}-${month}-${day}`;
      
      dates.push({
        fullDate: fullDate,
        displayDay: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        displayDate: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      });
    }
    return dates;
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);
  
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
      } catch {
        return movie.trailer_url;
      }
    }
    return trailers[movie.title] || "Way9Dexny3w";
  };
  
  const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (ssoUser?.role === 'owner') {
      navigate('/owner', { replace: true });
      return;
    }
    if (ssoUser?.role === 'admin') {
      navigate('/admin', { replace: true });
      return;
    }

    fetch(`${API}/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          navigate('/', { replace: true });
          return;
        }
        setMovie(data);
        if (data.showtimes) {
          setShowtimes(data.showtimes);
        }
      })
      .catch(console.error);

    fetch(`${API}/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(console.error);
  }, [id, navigate, ssoUser?.role]);

  useEffect(() => {
    fetch(`${API}/api/movies/${id}/availability?date=${selectedDate}`)
      .then(res => res.json())
      .then(data => setAvailability(data))
      .catch(console.error);
  }, [id, selectedDate]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('tb_token')}`
        },
        body: JSON.stringify({ movie_id: id, user_id: ssoUser?.id, rating: reviewRating, review_text: reviewText })
      });
      const data = await res.json();
      if (res.ok) {
        setReviewText('');
        fetch(`${API}/api/reviews/${id}`)
          .then(res => res.json())
          .then(data => setReviews(data));
        showToast("Review posted successfully!", "success");
      } else {
        setReviewError(data.message || 'Failed to post review');
      }
    } catch {
      setReviewError('Error posting review');
    }
  };

  if (!movie) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : (movie.rating || 'New');

  return (
    <div className="bg-white min-h-screen pb-16 font-sans">
      {/* Cinematic Hero */}
      <div className="relative h-[70vh] min-h-[500px] w-full bg-zinc-950 flex items-end pb-12 pt-24">
        {/* Blurred Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src={movie.backdrop || 'https://placehold.co/1200x600/111111/ffffff.png?text=Movie+Backdrop'} 
            alt={movie.title} 
            className="w-full h-full object-cover opacity-30 scale-105 blur-lg" 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x600/111111/ffffff.png?text=No+Image'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 items-end animate-slide-up">
          <img 
            src={movie.poster || 'https://placehold.co/300x450/111111/ffffff.png?text=Movie+Poster'} 
            alt={movie.title} 
            className="hidden md:block w-64 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-700/50" 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x450/111111/ffffff.png?text=No+Image'; }}
          />
          <div className="flex-1 pb-4">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-xl">{movie.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-zinc-300 mb-6 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-700 shadow-sm text-white">
                <Star className="text-orange-400 fill-orange-400" size={16} /> {avgRating}
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-700 shadow-sm text-white">
                <Clock className="text-orange-400" size={16} /> {movie.duration}
              </span>
              {movie.genre.map((g, i) => (
                <span key={i} className="bg-white/10 text-white border border-white/20 px-3 py-1.5 rounded-lg backdrop-blur">
                  {g}
                </span>
              ))}
            </div>
            
            {movie.business_info && (
              <div className="flex items-center gap-3 mb-6 bg-zinc-900/50 backdrop-blur-sm p-3 rounded-xl border border-zinc-700/50 inline-flex">
                {movie.business_info.logo ? (
                  <img src={movie.business_info.logo} alt={movie.business_info.businessName} className="h-8 w-auto rounded-md object-contain bg-white/10" />
                ) : (
                  <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                    {movie.business_info.businessName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1">Presented by</p>
                  <p className="text-sm text-zinc-200 font-bold leading-none">{movie.business_info.businessName}</p>
                </div>
              </div>
            )}

            <p className="max-w-3xl text-zinc-300 font-medium text-lg leading-relaxed mb-8">{movie.synopsis}</p>
            
            {hasTrailer(movie) && (
              <button 
                onClick={() => setShowTrailer(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 transition-all hover:scale-105 text-sm uppercase tracking-wide">
                <Play size={18} fill="currentColor" /> Watch Trailer
              </button>
            )}
          </div>
        </div>
        
        {/* Trailer Modal */}
        {showTrailer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl animate-fadeIn p-4 pt-20">
            <div className="w-full max-w-6xl relative animate-slide-up">
              <button 
                onClick={() => setShowTrailer(false)}
                className="absolute -top-14 right-0 text-zinc-400 hover:text-white font-bold flex items-center gap-3 transition-colors uppercase tracking-widest text-sm"
              >
                Close <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:border-white">✕</div>
              </button>
              <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-zinc-800">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${getTrailerId(movie)}?autoplay=1`} 
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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {(() => {
          const isComingSoon = movie.release_date && new Date(movie.release_date) > new Date();
          if (isComingSoon) {
            const daysUntil = Math.ceil((new Date(movie.release_date) - new Date()) / (1000 * 60 * 60 * 24));
            return (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-16 text-center shadow-inner">
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar size={40} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Coming Soon!</h2>
                <p className="text-xl text-slate-500 font-medium max-w-lg mx-auto">
                  Releasing in exactly <span className="text-orange-600 font-bold">{daysUntil} days</span> on {new Date(movie.release_date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}. Check back later to book your tickets!
                </p>
              </div>
            );
          }
          return (
            <>
              {/* Date Selector */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-4">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Select Date</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {dates.map((d, idx) => {
              const isSelected = selectedDate === d.fullDate;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(d.fullDate)}
                  className={`
                    flex flex-col items-center justify-center min-w-[110px] py-4 rounded-2xl font-bold transition-all shrink-0 border-2
                    ${isSelected 
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-md transform scale-105' 
                      : 'bg-white text-zinc-600 border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50'}
                  `}
                >
                  <span className={`text-xs uppercase tracking-widest mb-1 ${isSelected ? 'text-zinc-400' : 'text-zinc-400'}`}>{d.displayDay}</span>
                  <span className={`text-xl ${isSelected ? 'text-white' : 'text-zinc-900'}`}>{d.displayDate}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showtimes Section */}
        <div className="flex items-center gap-3 mb-8 border-b border-zinc-100 pb-4">
          <TicketIcon className="text-orange-500" size={28} />
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Theatres & Showtimes</h2>
        </div>
        
        <div className="space-y-6">
          {showtimes.map(showtime => (
            <div key={showtime.id} className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors tracking-tight">{showtime.theatre}</h3>
                  <p className="text-zinc-500 flex items-center gap-2 font-medium text-sm mb-3">
                    <MapPin size={16} /> Screen {showtime.screen}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-md border border-zinc-200">{showtime.format || '2D'}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-md border border-zinc-200">{showtime.language || 'English'}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
                  {showtime.times.map((t, i) => {
                    const avail = availability[showtime.id]?.[t];
                    const percentage = avail ? avail.percentage : 0;
                    
                    let colorClass = "border-green-500 text-green-700 hover:bg-green-50 hover:border-green-600 hover:text-green-800";
                    let label = "Available";
                    let labelColor = "text-green-600";
                    let isFull = false;
                    
                    if (percentage >= 95) {
                      colorClass = "border-zinc-800 text-zinc-900 hover:bg-zinc-900 hover:text-white";
                      label = "Waitlist";
                      labelColor = "text-zinc-500 group-hover/btn:text-zinc-300";
                      isFull = true;
                    } else if (percentage >= 60) {
                      colorClass = "border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600";
                      label = "Fast Filling";
                      labelColor = "text-orange-600";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isFull) {
                            setWaitlistData({ isOpen: true, showtimeId: showtime.id, time: t });
                          } else {
                            navigate(`/booking/${showtime.id}?time=${t}&theatre=${showtime.theatre}&date=${selectedDate}`);
                          }
                        }}
                        className={`
                          group/btn flex flex-col items-center justify-center px-6 py-2.5 rounded-xl font-bold border-2 bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5
                          ${colorClass}
                        `}
                      >
                        <span className="text-lg flex items-center gap-1">{isFull && <Bell size={14} className="opacity-70" />}{t}</span>
                        <span className={`block text-[10px] mt-0.5 uppercase tracking-wider font-bold transition-colors ${labelColor}`}>
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
          {showtimes.length === 0 && (
            <div className="text-center py-16 bg-zinc-50 border border-zinc-200 rounded-3xl">
              <p className="text-zinc-500 text-lg font-bold">No showtimes available for this movie on the selected date.</p>
            </div>
          )}
        </div>
        
        {/* Color Legend */}
        {showtimes.length > 0 && (
          <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-zinc-100">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-green-500 bg-white"></div><span className="text-xs font-bold uppercase tracking-wider text-zinc-600">Available</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-orange-500 bg-white"></div><span className="text-xs font-bold uppercase tracking-wider text-zinc-600">Fast Filling</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-zinc-800 bg-white"></div><span className="text-xs font-bold uppercase tracking-wider text-zinc-800">Waitlist</span></div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16 border-t border-zinc-100 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-orange-500" size={28} />
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 text-center">
                  <p className="text-zinc-500 font-bold text-lg">No reviews yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-zinc-900 text-lg">{review.user_name}</h4>
                        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mt-1">{new Date(review.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex bg-orange-50 px-3 py-1 rounded-full border border-orange-100 items-center gap-1">
                        <Star className="text-orange-500 fill-orange-500" size={14}/>
                        <span className="font-black text-orange-600 text-sm">{review.rating}</span>
                      </div>
                    </div>
                    {review.review_text && <p className="text-zinc-700 leading-relaxed font-medium">{review.review_text}</p>}
                  </div>
                ))
              )}
            </div>

            {/* Write a Review */}
            <div>
              {ssoUser ? (
                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm sticky top-32">
                  <h3 className="text-xl font-black text-zinc-900 mb-6">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="focus:outline-none"
                          >
                            <Star 
                              className={star <= reviewRating ? "text-orange-500 fill-orange-500" : "text-zinc-300"} 
                              size={28}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Your Thoughts</label>
                      <textarea 
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 resize-none font-medium text-zinc-800 placeholder-zinc-400"
                        placeholder="What did you think of the movie?"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      ></textarea>
                    </div>
                    {reviewError && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertCircle size={14}/> {reviewError}</p>}
                    <button 
                      type="submit"
                      className="w-full bg-zinc-900 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-zinc-800 hover:shadow-lg transition-all duration-300"
                    >
                      Submit Review
                    </button>
                    <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest font-bold mt-4">
                      *Only verified ticket holders can post reviews.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200 text-center">
                  <p className="text-zinc-600 font-bold mb-4">Please log in to leave a review.</p>
                  <button onClick={() => navigate('/login')} className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors">
                    Log In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
            </>
          );
        })()}
      </div>

      <WaitlistModal 
        isOpen={waitlistData.isOpen}
        onClose={() => setWaitlistData({ isOpen: false, showtimeId: null, time: null })}
        showtimeId={waitlistData.showtimeId}
        date={selectedDate}
        time={waitlistData.time}
      />
    </div>
  );
}
