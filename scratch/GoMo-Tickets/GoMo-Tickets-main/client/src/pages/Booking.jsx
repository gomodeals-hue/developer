import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Armchair, ArrowLeft, CreditCard } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import AddonsModal from '../components/AddonsModal';
import { API } from '../config/api';

export default function Booking() {
  const { showtimeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const time = searchParams.get('time');
  const theatre = searchParams.get('theatre');
  const date = searchParams.get('date');
  const { formatPrice } = useCurrency();
  
  const [seats, setSeats] = useState([]);
  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [isSurgePricing, setIsSurgePricing] = useState(false);

  const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));
  const preferredTier = localStorage.getItem('preferred_tier') || null;

  useEffect(() => {
    if (ssoUser?.role === 'owner') {
      navigate('/owner', { replace: true });
      return;
    }
    if (ssoUser?.role === 'admin') {
      navigate('/admin', { replace: true });
      return;
    }

    fetch(`${API}/api/showtimes/${showtimeId}/seats?date=${date}&time=${time}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          navigate('/', { replace: true });
          return;
        }
        setSeats(data.seats);
        setShowtime(data.showtime);
        setIsSurgePricing(data.isSurgePricing || false);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching seats:", err);
        navigate('/', { replace: true });
      });
  }, [showtimeId, date, time, navigate, ssoUser?.role]);

  const toggleSeat = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.isBooked || seat.isHeld) {
      if (seat?.isHeld) {
        showToast("This seat is currently held by someone completing their checkout. Please try again later.", "warning");
      }
      return;
    }
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) return prev.filter(id => id !== seatId);
      const maxSeats = isGroupMode ? 50 : 10;
      if (prev.length >= maxSeats) {
        showToast(`You can only select up to ${maxSeats} seats per booking.`, "warning");
        return prev;
      }
      return [...prev, seatId];
    });
  };

  const calculateSubtotal = () => {
    return selectedSeats.reduce((sum, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      const basePrice = showtime?.base_price !== null && showtime?.base_price !== undefined ? Number(showtime.base_price) : 4;
      let multiplier = 1;
      if (seat?.tier === 'Premium') multiplier = 1.5;
      if (seat?.tier === 'VIP') multiplier = isSurgePricing ? 2.5 * 1.2 : 2.5;
      return sum + (basePrice * multiplier);
    }, 0);
  };

  const renderSeat = (seat) => {
    if (!seat) return null;
    const isSelected = selectedSeats.includes(seat.id);
    const tier = seat.tier || 'Standard';
    
    let baseStyles = 'bg-white text-zinc-300 hover:border-zinc-400 border border-zinc-200';
    let iconStyles = 'text-zinc-400 group-hover:text-zinc-500';
    
    if (tier === 'Premium') {
      baseStyles = 'bg-blue-50 text-blue-300 hover:border-blue-400 border border-blue-200';
      iconStyles = 'text-blue-400 group-hover:text-blue-500';
    } else if (tier === 'VIP') {
      baseStyles = 'bg-purple-50 text-purple-300 hover:border-purple-400 border border-purple-200';
      iconStyles = 'text-purple-400 group-hover:text-purple-500';
    }

    const isPreferred = preferredTier === tier && !seat.isBooked && !seat.isHeld && !isSelected;
    if (isPreferred) {
      baseStyles += ' ring-2 ring-orange-300 ring-offset-1 animate-pulse';
    }

    return (
      <button
        key={seat.id}
        disabled={seat.isBooked || seat.isHeld}
        onClick={() => toggleSeat(seat.id)}
        className={`
          flex-1 max-w-[2.5rem] aspect-square rounded-[3px] sm:rounded-t-lg sm:rounded-b-sm flex items-center justify-center transition-all duration-300 relative group shadow-sm
          ${seat.isBooked 
            ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed shadow-inner opacity-75 border-transparent' 
            : seat.isHeld
              ? 'bg-yellow-100 text-yellow-400 cursor-not-allowed border-yellow-200'
              : isSelected
                ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] border-orange-400 scale-110 z-10'
                : baseStyles}
        `}
      >
        <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded shadow-sm z-50 pointer-events-none hidden sm:block">{seat.number}</span>
        <Armchair className={`w-3 h-3 sm:w-4 sm:h-5 hidden md:block ${isSelected ? 'text-white' : (seat.isBooked || seat.isHeld) ? 'text-zinc-300' : iconStyles}`} />
      </button>
    );
  };

  const proceedToCheckout = () => {
    if (selectedSeats.length === 0) return;
    setIsAddonsModalOpen(true);
  };

  const handleProceedWithAddons = (addons) => {
    // Pass full seat objects to checkout so it knows the dynamically mapped tiers
    const selectedSeatObjects = selectedSeats.map(id => seats.find(s => s.id === id));
    
    navigate('/checkout', { 
      state: { 
        showtimeId, 
        selectedSeats: selectedSeatObjects,
        theatre,
        time,
        date,
        showtime,
        addons,
        isGroup: isGroupMode
      } 
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-32 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-bold mb-8 transition-colors uppercase tracking-wider text-sm">
          <ArrowLeft size={18} /> Back to Movie
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Seat Map */}
          <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-sm w-full overflow-hidden">
            <div className="text-center mb-16 relative">
              {/* Screen Arc */}
              <div className="w-full max-w-3xl mx-auto h-8 sm:h-12 bg-gradient-to-t from-orange-500/10 to-transparent border-t-4 border-orange-500 rounded-[50%/100%_100%_0_0] shadow-[0_-20px_50px_rgba(249,115,22,0.2)] relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent mix-blend-overlay"></div>
              </div>
              <p className="text-zinc-400 text-xs font-black tracking-[0.2em] sm:tracking-[0.5em] uppercase mt-6">Screen This Way</p>
            </div>

            {/* Theatre Seats Array */}
            <div className="flex flex-col gap-2 sm:gap-4 max-w-4xl mx-auto px-1 sm:px-2 w-full">
              {[...new Set(seats.map(s => s.row))].sort().map(row => {
                const rowSeats = seats.filter(s => s.row === row).sort((a,b) => a.number - b.number);
                if (rowSeats.length === 0) return null;
                
                const leftCount = Math.floor(rowSeats.length * 0.3);
                const midCount = Math.floor(rowSeats.length * 0.7) - leftCount;
                const rightCount = rowSeats.length - Math.floor(rowSeats.length * 0.7);

                return (
                  <div key={row} className="flex items-center gap-1.5 sm:gap-6 w-full">
                    <div className="w-3 sm:w-6 font-bold text-zinc-400 text-[10px] sm:text-sm text-right shrink-0">{row}</div>
                    
                    {/* Left Block */}
                    <div className="flex gap-1 justify-end" style={{ flexGrow: leftCount, flexBasis: 0 }}>
                       {rowSeats.slice(0, leftCount).map(seat => renderSeat(seat))}
                    </div>
                    
                    {/* Middle Block */}
                    <div className="flex gap-1 justify-center" style={{ flexGrow: midCount, flexBasis: 0 }}>
                       {rowSeats.slice(leftCount, leftCount + midCount).map(seat => renderSeat(seat))}
                    </div>
                    
                    {/* Right Block */}
                    <div className="flex gap-1 justify-start" style={{ flexGrow: rightCount, flexBasis: 0 }}>
                       {rowSeats.slice(leftCount + midCount, rowSeats.length).map(seat => renderSeat(seat))}
                    </div>
                    
                    <div className="w-3 sm:w-6 font-bold text-zinc-400 text-[10px] sm:text-sm text-left shrink-0">{row}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 sm:gap-10 mt-16 pt-8 border-t border-zinc-200 flex-wrap">
              <div className="flex items-center gap-3"><div className="w-6 h-6 bg-white rounded-lg border border-zinc-200 shadow-sm flex items-center justify-center"><Armchair size={12} className="text-zinc-400"/></div><span className="text-sm font-bold text-zinc-600 uppercase tracking-wider">Standard {formatPrice(showtime?.base_price ? Number(showtime.base_price) : 4)}</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 bg-blue-50 rounded-lg border border-blue-200 shadow-sm flex items-center justify-center"><Armchair size={12} className="text-blue-400"/></div><span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Premium {formatPrice((showtime?.base_price ? Number(showtime.base_price) : 4) * 1.5)}</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 bg-purple-50 rounded-lg border border-purple-200 shadow-sm flex items-center justify-center"><Armchair size={12} className="text-purple-400"/></div><span className="text-sm font-bold text-purple-600 uppercase tracking-wider">VIP {formatPrice((showtime?.base_price ? Number(showtime.base_price) : 4) * (isSurgePricing ? 3.0 : 2.5))}</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 bg-yellow-100 rounded-lg border border-yellow-200 shadow-sm flex items-center justify-center"><Armchair size={12} className="text-yellow-400"/></div><span className="text-sm font-bold text-yellow-600 uppercase tracking-wider">Locked</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] rounded-lg border border-orange-400"></div><span className="text-sm font-bold text-zinc-600 uppercase tracking-wider">Selected</span></div>
              {preferredTier && (
                <div className="flex items-center gap-3"><div className="w-6 h-6 bg-white rounded-lg border border-zinc-200 ring-2 ring-orange-300 shadow-sm flex items-center justify-center"><Armchair size={12} className="text-zinc-400"/></div><span className="text-sm font-bold text-orange-600 uppercase tracking-wider">Your Preference ({preferredTier})</span></div>
              )}
            </div>
          </div>

          {/* Booking Summary Floating Panel */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="mb-6 bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-orange-900 font-bold text-sm">Group Booking</h4>
                <p className="text-orange-600 text-xs mt-0.5">Book up to 50 seats</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isGroupMode} onChange={(e) => setIsGroupMode(e.target.checked)} />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-8 sticky top-32 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              {isSurgePricing && (
                <div className="mb-6 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center border border-red-100">
                  🔥 High Demand! VIP prices have increased slightly.
                </div>
              )}
              <h3 className="text-2xl font-black text-zinc-900 mb-8 tracking-tight">Booking Summary</h3>
              
              <div className="space-y-6 mb-8 bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                <div>
                  <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Theatre</p>
                  <p className="font-bold text-zinc-900 text-lg">{theatre}</p>
                </div>
                <div>
                  <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Date & Time</p>
                  <p className="font-bold text-zinc-900 text-lg">{date} • {time}</p>
                </div>
                <div>
                  <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Seats Selected</p>
                  <div className="flex items-baseline gap-2">
                    <p className="font-black text-orange-500 text-3xl">{selectedSeats.length}</p>
                    <p className="font-bold text-zinc-400 text-sm">Tickets</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-6 mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-zinc-500 font-bold">Subtotal</span>
                  <span className="font-bold text-zinc-900">{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <span className="text-zinc-900 font-black text-xl">Total Due</span>
                  <span className="text-orange-600 font-black text-3xl">{formatPrice(calculateSubtotal())}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2 text-right">Taxes & fees calculated at checkout</p>
              </div>

              <button
                onClick={proceedToCheckout}
                disabled={selectedSeats.length === 0}
                className={`
                  w-full py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-300 uppercase tracking-widest text-sm
                  ${selectedSeats.length > 0 
                    ? 'bg-orange-600 text-white hover:bg-orange-500 hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1' 
                    : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                  }
                `}
              >
                <CreditCard size={18} /> Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AddonsModal 
        isOpen={isAddonsModalOpen} 
        onClose={() => setIsAddonsModalOpen(false)} 
        ownerId={showtime?.owner_id}
        onProceed={handleProceedWithAddons} 
      />
    </div>
  );
}
