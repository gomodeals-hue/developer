import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, Armchair, ZoomIn, ZoomOut, 
  Edit2, Accessibility, ShieldCheck, Check, Sparkles, X, 
  ChevronRight, Bike, Car, Truck
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';
import AddonsModal from '../../components/Tickets/AddonsModal';
import { API } from '../../config/ticketApi';

const VEHICLE_TIERS = [
  { count: 1, label: '1 Ticket', type: 'Cycle', icon: '🚲' },
  { count: 2, label: '2 Tickets', type: 'Scooter', icon: '🛵' },
  { count: 3, label: '3 Tickets', type: 'Auto', icon: '🛺' },
  { count: 4, label: '4 Tickets', type: 'Mini', icon: '🚗' },
  { count: 5, label: '5 Tickets', type: 'Sedan', icon: '🚘' },
  { count: 6, label: '6 Tickets', type: 'SUV', icon: '🚙' },
  { count: 7, label: '7 Tickets', type: 'Van', icon: '🚐' },
  { count: 8, label: '8 Tickets', type: 'Bus', icon: '🚌' }
];

export default function TicketBooking() {
  const { showtimeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { formatLocalPrice } = useCurrency();

  const time = searchParams.get('time') || '01:20 PM';
  const theatre = searchParams.get('theatre') || 'KG Cinemas: Coimbatore';
  const date = searchParams.get('date') || '2026-10-16';
  const lang = searchParams.get('lang') || 'English';

  const [seats, setSeats] = useState([]);
  const [showtime, setShowtime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(['A04', 'A05']); // Default 2 seats pre-selected
  const [maxTickets, setMaxTickets] = useState(2);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);
  const [showZoomHelper, setShowZoomHelper] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/showtimes/${showtimeId}/seats?date=${date}&time=${encodeURIComponent(time)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.seats && data.seats.length > 0) {
          setSeats(data.seats);
          setShowtime(data.showtime);
          setMovie(data.movie);
        }
      })
      .catch(() => {});
  }, [showtimeId, date, time]);

  // Toggle seat selection
  const handleSeatClick = (seat) => {
    if (seat.isBooked || seat.isHeld) return;

    setSelectedSeats(prev => {
      if (prev.includes(seat.id)) {
        return prev.filter(id => id !== seat.id);
      }
      if (prev.length >= maxTickets) {
        showToast(`You have chosen ${maxTickets} ticket(s). Adjust count via 'Edit Tickets' button.`, "info");
        return [...prev.slice(1), seat.id];
      }
      return [...prev, seat.id];
    });
  };

  // Subtotal calculation in local INR currency
  const calculateTotal = () => {
    return selectedSeats.reduce((sum, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      if (seat) return sum + Number(seat.price);
      if (seatId.startsWith('H')) return sum + 61.74;
      return sum + 210.98;
    }, 0);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      showToast("Please select at least one seat to proceed", "warning");
      return;
    }
    setIsAddonsModalOpen(true);
  };

  const handleProceedWithAddons = (addons) => {
    const selectedSeatObjects = selectedSeats.map(id => {
      const s = seats.find(x => x.id === id);
      const isBudget = id.startsWith('H');
      return s || { 
        id, 
        number: id.slice(1), 
        row: id[0], 
        price: isBudget ? 61.74 : 210.98, 
        tier: id.startsWith('A') ? 'XLSLIDER' : (isBudget ? 'BUDGET' : 'PREMIUMXL') 
      };
    });

    navigate('/tickets/checkout', {
      state: {
        showtimeId,
        selectedSeats: selectedSeatObjects,
        theatre,
        time,
        date,
        showtime: showtime || { 
          id: showtimeId, 
          theatre: theatre || 'KG Cinemas: 4K DOLBY ATMOS, Coimbatore', 
          base_price: 210.98,
          screen: 'Screen 1'
        },
        movie: movie || { 
          id: 'mov_street_fighter', 
          title: 'Street Fighter (2026)', 
          poster: '/images/action_poster_1780401266913.png' 
        },
        addons
      }
    });
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Seat rendering helper for strictly uniform dimensions
  const renderSeatButton = (seatId, num, row, tier, price, isSold = false, isBestseller = false) => {
    const isSelected = selectedSeats.includes(seatId);

    return (
      <button
        key={seatId}
        type="button"
        disabled={isSold}
        onClick={() => handleSeatClick({ id: seatId, row, number: num, tier, price })}
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[11px] font-bold flex items-center justify-center anim-seat-cell transition-all shrink-0 cursor-pointer ${
          isSold 
            ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-transparent' 
            : isSelected 
              ? 'bg-[#f76e28] text-white shadow-md border border-[#e05b16] scale-110' 
              : isBestseller
                ? 'bg-white border-2 border-amber-400 text-amber-700 hover:bg-amber-50'
                : 'bg-white border border-emerald-500 text-emerald-700 hover:bg-emerald-50'
        }`}
      >
        {num}
      </button>
    );
  };

  // Empty slot spacer for 100% strict vertical column alignment across all rows
  const renderEmptySlot = (key) => (
    <div key={key} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 invisible pointer-events-none" />
  );

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans flex flex-col">
      {/* ======================================================== */}
      {/* 1. TOP HEADER BAR                                        */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Back & Title info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-black text-zinc-900 leading-tight">
                {movie?.title || 'Street Fighter (2026)'} - {lang}
              </h1>
              <p className="text-xs text-zinc-500 font-medium">
                {theatre} | {formattedDate} | {time}
              </p>
            </div>
          </div>

          {/* Right Action buttons: Accessibility, Edit Tickets */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors"
              title="Wheelchair Accessibility Info"
            >
              <Accessibility size={18} />
            </button>

            {/* Edit Tickets count button matching BookMyShow */}
            <button
              onClick={() => setShowTicketModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-rose-300 hover:border-rose-400 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Edit2 size={13} />
              <span>{maxTickets} Tickets</span>
            </button>

            {/* Showtime badge */}
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-black uppercase tracking-wider">
              {time} PALLAVI
            </span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. SEAT LAYOUT CANVAS                                    */}
      {/* ======================================================== */}
      <div className="flex-1 relative overflow-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Floating Minimap positioned on the far right outside the seat canvas */}
        <div className="fixed right-6 top-32 hidden 2xl:block w-44 bg-white/95 rounded-xl border border-zinc-300 shadow-xl p-3 z-30 pointer-events-none">
          <div className="w-full h-1 bg-red-400 rounded-full mb-2"></div>
          <div className="space-y-1">
            <div className="h-1.5 bg-zinc-200 rounded w-4/5 mx-auto"></div>
            <div className="h-3 bg-zinc-100 rounded w-full flex gap-1 justify-center">
              <div className="w-1/2 bg-zinc-200 rounded-xs"></div>
              <div className="w-1/2 bg-zinc-200 rounded-xs"></div>
            </div>
            <div className="h-1.5 bg-zinc-200 rounded w-3/5 mx-auto"></div>
          </div>
          <div className="w-12 h-1.5 bg-blue-200 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Floating Zoom Controls & Helper */}
        <div className="fixed bottom-24 right-6 sm:right-10 flex items-center gap-2 z-30">
          {showZoomHelper && (
            <div className="bg-[#4353ff] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
              <span>The layout can be zoomed in/out</span>
              <button onClick={() => setShowZoomHelper(false)} className="text-white/80 hover:text-white">
                <X size={13} />
              </button>
            </div>
          )}
          <div className="flex flex-col bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
              className="p-2.5 hover:bg-zinc-100 text-zinc-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-full h-px bg-zinc-200"></div>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.75))}
              className="p-2.5 hover:bg-zinc-100 text-zinc-700 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
          </div>
        </div>

        {/* Main Seat Auditorium Grid Wrapper */}
        <div className="max-w-4xl mx-auto">
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 select-none pb-12"
          >
            
            {/* ---------------------------------------------------- */}
            {/* TIER 1: ₹210.98 XLSLIDER (Row A: 13 Seats Centered)  */}
            {/* ---------------------------------------------------- */}
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px bg-zinc-200 flex-1 max-w-xs" />
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  ₹210.98 XLSLIDER
                </h3>
                <div className="h-px bg-zinc-200 flex-1 max-w-xs" />
              </div>

              <div className="flex items-center justify-center">
                {/* Row Letter A */}
                <span className="w-6 sm:w-8 text-center font-bold text-xs text-zinc-400 mr-2 shrink-0 select-none">
                  A
                </span>

                {/* Row A: 13 seats centered */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {Array.from({ length: 13 }, (_, i) => {
                    const num = String(i + 1).padStart(2, '0');
                    const seatId = `A${num}`;
                    const isSold = [1, 2, 7, 8, 9].includes(i + 1);
                    return renderSeatButton(seatId, num, 'A', 'XLSLIDER', 210.98, isSold);
                  })}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* TIER 2: ₹210.98 PREMIUMXL (Rows B to F, G, H partial)*/}
            {/* ---------------------------------------------------- */}
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px bg-zinc-200 flex-1 max-w-xs" />
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  ₹210.98 PREMIUMXL
                </h3>
                <div className="h-px bg-zinc-200 flex-1 max-w-xs" />
              </div>

              {/* Rows B, C, D, E, F, G with 9 on Left + Central Aisle + 9 on Right */}
              <div className="space-y-2">
                {['B', 'C', 'D', 'E', 'F', 'G'].map((rowLetter) => (
                  <div key={rowLetter} className="flex items-center justify-center">
                    {/* Row Letter */}
                    <span className="w-6 sm:w-8 text-center font-bold text-xs text-zinc-400 mr-2 shrink-0 select-none">
                      {rowLetter}
                    </span>

                    {/* Left Block (Columns 01 to 09) */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {Array.from({ length: 9 }, (_, idx) => {
                        const num = String(idx + 1).padStart(2, '0');
                        const seatId = `${rowLetter}${num}`;
                        const isSold = (rowLetter === 'B' && [1, 2].includes(idx + 1)) || 
                                       (rowLetter === 'E' && [7, 8].includes(idx + 1)) ||
                                       (rowLetter === 'G' && [1, 2, 3].includes(idx + 1));
                        return renderSeatButton(seatId, num, rowLetter, 'PREMIUMXL', 210.98, isSold);
                      })}
                    </div>

                    {/* Central Walking Aisle */}
                    <div className="w-8 sm:w-12 shrink-0"></div>

                    {/* Right Block (Columns 10 to 18) */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {Array.from({ length: 9 }, (_, idx) => {
                        const num = String(idx + 10).padStart(2, '0');
                        const seatId = `${rowLetter}${num}`;
                        const isSold = (rowLetter === 'B' && idx + 10 === 10);
                        return renderSeatButton(seatId, num, rowLetter, 'PREMIUMXL', 210.98, isSold);
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* TIER 3: ₹61.74 BUDGET (Row H: 9 on Left & 9 on Right) */}
            {/* ---------------------------------------------------- */}
            <div className="mb-14 text-center">
              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px bg-zinc-200 flex-1 max-w-xs" />
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  ₹61.74 BUDGET
                </h3>
                <div className="h-px bg-zinc-200 flex-1 max-w-xs" />
              </div>

              <div className="flex items-center justify-center">
                {/* Row Letter H */}
                <span className="w-6 sm:w-8 text-center font-bold text-xs text-zinc-400 mr-2 shrink-0 select-none">
                  H
                </span>

                {/* Left Block: 9 seats (01 to 09) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {Array.from({ length: 9 }, (_, idx) => {
                    const num = String(idx + 1).padStart(2, '0');
                    const seatId = `H${num}`;
                    const isSold = [1, 2].includes(idx + 1);
                    return renderSeatButton(seatId, num, 'H', 'BUDGET', 61.74, isSold);
                  })}
                </div>

                {/* Central Walking Aisle */}
                <div className="w-8 sm:w-12 shrink-0"></div>

                {/* Right Block: 9 seats (10 to 18) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {Array.from({ length: 9 }, (_, idx) => {
                    const num = String(idx + 10).padStart(2, '0');
                    const seatId = `H${num}`;
                    const isSold = [10, 11, 14, 15].includes(idx + 10);
                    return renderSeatButton(seatId, num, 'H', 'BUDGET', 61.74, isSold);
                  })}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* CURVED CINEMA SCREEN DISPLAY                         */}
            {/* ---------------------------------------------------- */}
            <div className="text-center mt-12 mb-8">
              <div className="w-full max-w-md mx-auto relative px-2 cinema-screen-glow rounded-3xl py-2">
                <svg
                  viewBox="0 0 420 48"
                  className="w-full h-11 overflow-visible filter drop-shadow-[0_4px_20px_rgba(247,110,40,0.3)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Screen surface translucent gradient */}
                    <linearGradient id="screenSurfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.75" />
                      <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.1" />
                    </linearGradient>

                    {/* Top curved border gradient (luminous royal blue to sky blue) */}
                    <linearGradient id="screenTopBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.7" />
                      <stop offset="20%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#1d4ed8" />
                      <stop offset="80%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.7" />
                    </linearGradient>

                    {/* Bottom curved border gradient */}
                    <linearGradient id="screenBottomBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* 3D Curved Screen Surface with subtle C-curve concave toward audience */}
                  <path
                    d="M 36 10 Q 210 22 384 10 L 408 28 Q 210 40 12 28 Z"
                    fill="url(#screenSurfaceGrad)"
                    stroke="#93c5fd"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />

                  {/* Top curved screen edge highlight */}
                  <path
                    d="M 36 10 Q 210 22 384 10"
                    stroke="url(#screenTopBorderGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Bottom curved screen edge outline */}
                  <path
                    d="M 12 28 Q 210 40 408 28"
                    stroke="url(#screenBottomBorderGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-xs font-medium text-zinc-400 mt-2.5 tracking-wide">
                All eyes this way please
              </p>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SEAT STATE LEGEND & OFFERS                           */}
            {/* ---------------------------------------------------- */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 pt-4 text-xs font-semibold text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-xs border border-emerald-500 bg-white inline-block"></span>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-xs bg-zinc-200 inline-block"></span>
                <span>Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-xs border-2 border-amber-400 bg-white inline-block"></span>
                <span>Bestseller</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-xs bg-emerald-600 inline-block"></span>
                <span>Selected</span>
              </div>
            </div>

            {/* Offers banner strip */}
            <div className="mt-8 max-w-lg mx-auto bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between text-xs text-zinc-700 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-rose-500 font-bold">✓</span>
                <span className="font-semibold text-zinc-800">YES Private Debit Card Offer</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-bold">1/3</span>
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. STICKY BOTTOM CHECKOUT ACTION BAR                     */}
      {/* ======================================================== */}
      {selectedSeats.length > 0 && (
        <div className="sticky bottom-0 z-50 bg-white border-t border-zinc-200 shadow-2xl py-3.5 px-4 sm:px-8 animate-slide-up">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Selected Seats:</span>
                <span className="text-sm font-black text-[#f76e28]">{selectedSeats.join(', ')}</span>
                <span className="text-xs text-zinc-400">({selectedSeats.length} Tickets)</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">Taxes & convenience fees included at checkout</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total</span>
                <p className="text-xl font-black text-zinc-900 leading-none">
                  {formatLocalPrice(calculateTotal())}
                </p>
              </div>

              <button
                onClick={handleProceed}
                className="px-8 py-3 rounded-lg bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <span>Pay {formatLocalPrice(calculateTotal())}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. TICKET QUANTITY PICKER MODAL                          */}
      {/* ======================================================== */}
      {showTicketModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-zinc-200 text-center animate-slide-up">
            <h3 className="text-base font-black text-zinc-900 mb-2">How Many Tickets?</h3>
            <p className="text-xs text-zinc-500 mb-6">Choose how many seats you want to book together</p>

            {/* Vehicle icons grid matching BookMyShow */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {VEHICLE_TIERS.map((v) => (
                <button
                  key={v.count}
                  onClick={() => {
                    setMaxTickets(v.count);
                    setShowTicketModal(false);
                    showToast(`Updated to ${v.count} seat(s)`, "info");
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    maxTickets === v.count 
                      ? 'border-[#f76e28] bg-orange-50 text-[#f76e28] font-bold shadow-xs' 
                      : 'border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <span className="text-2xl">{v.icon}</span>
                  <span className="text-xs font-black">{v.count}</span>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400">{v.type}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowTicketModal(false)}
              className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Addons / Concessions Modal */}
      <AddonsModal 
        isOpen={isAddonsModalOpen}
        onClose={() => setIsAddonsModalOpen(false)}
        ownerId={showtime?.owner_id}
        onProceed={handleProceedWithAddons}
      />
    </div>
  );
}
