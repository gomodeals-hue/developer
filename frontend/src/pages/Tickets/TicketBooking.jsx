import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Armchair, ZoomIn, ZoomOut, 
  Edit2, Accessibility, ShieldCheck, Check, Sparkles, X, 
  ChevronRight, Bike, Car, Truck, Clock, MapPin, Film, 
  RotateCcw, Info, Star, Volume2, Popcorn
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
  const [selectedSeats, setSelectedSeats] = useState(['A04', 'A05']); // Default 2 seats
  const [maxTickets, setMaxTickets] = useState(2);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [quickPopcornAdded, setQuickPopcornAdded] = useState(false);

  // 10-minute seat lock countdown timer
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

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

  // Toggle seat selection with tactile feel
  const handleSeatClick = (seat) => {
    if (seat.isBooked || seat.isHeld) return;

    setSelectedSeats(prev => {
      if (prev.includes(seat.id)) {
        return prev.filter(id => id !== seat.id);
      }
      if (prev.length >= maxTickets) {
        showToast(`You have selected ${maxTickets} ticket(s). Change count with 'Edit Tickets'`, "info");
        return [...prev.slice(1), seat.id];
      }
      return [...prev, seat.id];
    });
  };

  // Subtotal calculation in local INR currency
  const calculateTotal = () => {
    let base = selectedSeats.reduce((sum, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      if (seat) return sum + Number(seat.price);
      if (seatId.startsWith('H')) return sum + 61.74;
      return sum + 210.98;
    }, 0);

    if (quickPopcornAdded) {
      base += 249;
    }
    return base;
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

    const finalAddons = [...(addons || [])];
    if (quickPopcornAdded && !finalAddons.some(a => a.name?.toLowerCase().includes('popcorn'))) {
      finalAddons.push({
        id: 'addon_popcorn_combo',
        name: 'Caramel Popcorn & Pepsi Combo',
        price: 249,
        quantity: 1
      });
    }

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
        addons: finalAddons
      }
    });
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Modern Ergonomic Seat Component with Framer Motion Animation
  const renderSeatButton = (seatId, num, row, tier, price, isSold = false, isBestseller = false) => {
    const isSelected = selectedSeats.includes(seatId);
    const isRecliner = row === 'A';

    return (
      <div 
        key={seatId} 
        className="relative group/seat flex flex-col items-center"
        onMouseEnter={() => setHoveredSeat({ id: seatId, row, num, tier, price, isSold })}
        onMouseLeave={() => setHoveredSeat(null)}
      >
        <motion.button
          type="button"
          disabled={isSold}
          whileHover={!isSold ? { scale: 1.15, y: -2 } : {}}
          whileTap={!isSold ? { scale: 0.92 } : {}}
          onClick={() => handleSeatClick({ id: seatId, row, number: num, tier, price })}
          className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-[11px] font-black flex flex-col items-center justify-center transition-colors duration-150 cursor-pointer select-none ${
            isSold 
              ? 'bg-zinc-800/60 text-zinc-600 border border-zinc-800/80 cursor-not-allowed opacity-60' 
              : isSelected 
                ? 'bg-[#f76e28] text-white shadow-[0_0_15px_rgba(247,110,40,0.6)] border-2 border-[#ff8c42]' 
                : isRecliner
                  ? 'bg-zinc-900 border-2 border-purple-500/80 text-purple-300 hover:bg-purple-950/60 hover:border-purple-400'
                  : isBestseller
                    ? 'bg-zinc-900 border-2 border-amber-400/90 text-amber-300 hover:bg-amber-950/50 hover:border-amber-300'
                    : 'bg-zinc-900/90 border border-emerald-500/70 text-emerald-400 hover:bg-emerald-950/50 hover:border-emerald-400'
          }`}
        >
          {/* Headrest contour line */}
          <span className={`w-3.5 h-0.5 rounded-full mb-0.5 transition-colors ${
            isSelected ? 'bg-white/80' : isSold ? 'bg-zinc-700' : 'bg-current opacity-60'
          }`} />

          {/* Seat Number */}
          <span className="leading-none">{num}</span>

          {/* Luxury Crown on Royal Recliner A Row */}
          {isRecliner && !isSelected && !isSold && (
            <span className="absolute -top-1.5 -right-1 text-[8px]">👑</span>
          )}

          {/* Selected checkmark indicator */}
          {isSelected && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-[#f76e28] rounded-full flex items-center justify-center shadow-xs"
            >
              <Check size={9} strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>
      </div>
    );
  };

  return (
    <div className="bg-[#0b0e14] min-h-screen text-zinc-100 font-sans flex flex-col selection:bg-[#f76e28] selection:text-white">
      {/* ======================================================== */}
      {/* 1. CINEMA DARK THEME TOP HEADER BAR                      */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-xl">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Back & Movie Info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base md:text-lg font-black text-white leading-tight">
                  {movie?.title || 'Street Fighter (2026)'}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-[#f76e28] border border-orange-500/30">
                  {lang}
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300">
                  IMAX 2D • DOLBY ATMOS
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} className="text-[#f76e28]" />
                <span>{theatre}</span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{time}</span>
              </p>
            </div>
          </div>

          {/* Right Action Buttons: Countdown & Edit Tickets */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live Countdown Seat Lock Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
              <Clock size={14} className="text-[#f76e28] animate-pulse" />
              <span className="font-mono font-black text-white">{formatTimer(timeLeft)}</span>
              <span className="hidden sm:inline text-[10px] text-zinc-400 font-semibold">Seat Lock</span>
            </div>

            {/* Edit Ticket Quantity Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTicketModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-[#f76e28]/50 text-[#f76e28] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            >
              <Edit2 size={13} />
              <span>{maxTickets} {maxTickets === 1 ? 'Ticket' : 'Tickets'}</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CINEMA SEAT AUDITORIUM CANVAS                    */}
      {/* ======================================================== */}
      <div className="flex-1 relative overflow-auto py-8 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-[#0b0e14] to-black">
        
        {/* Floating Zoom Controls */}
        <div className="fixed bottom-24 right-6 sm:right-10 flex flex-col bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden z-30">
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.35))}
            className="p-3 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <div className="w-full h-px bg-zinc-800"></div>
          <button 
            onClick={() => setZoomLevel(1)}
            className="p-2.5 hover:bg-zinc-800 text-[10px] font-black text-zinc-400 hover:text-white transition-colors cursor-pointer text-center"
            title="Reset Zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <div className="w-full h-px bg-zinc-800"></div>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.75))}
            className="p-3 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
        </div>

        {/* Hover Seat Details Tooltip Floating Capsule */}
        <AnimatePresence>
          {hoveredSeat && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="fixed top-22 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/95 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700 shadow-xl flex items-center gap-3 text-xs pointer-events-none"
            >
              <span className="font-black text-[#f76e28]">{hoveredSeat.id}</span>
              <span className="text-zinc-500">|</span>
              <span className="font-bold text-zinc-200">{hoveredSeat.tier}</span>
              <span className="text-zinc-500">|</span>
              <span className="font-black text-emerald-400">{formatLocalPrice(hoveredSeat.price)}</span>
              {hoveredSeat.isSold && (
                <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                  Sold Out
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto">
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 select-none pb-28"
          >
            {/* ---------------------------------------------------- */}
            {/* 3D CURVED LASER CINEMA SCREEN                        */}
            {/* ---------------------------------------------------- */}
            <div className="text-center mb-14 pt-4">
              <div className="w-full max-w-lg mx-auto relative px-4">
                
                {/* Ambient Projection Rays */}
                <div className="absolute inset-x-8 -top-8 h-20 bg-gradient-to-b from-[#f76e28]/20 via-[#3b82f6]/10 to-transparent blur-xl pointer-events-none"></div>

                <svg
                  viewBox="0 0 460 50"
                  className="w-full h-12 overflow-visible filter drop-shadow-[0_6px_25px_rgba(247,110,40,0.35)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="screenLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f76e28" stopOpacity="0.4" />
                      <stop offset="30%" stopColor="#f76e28" stopOpacity="1" />
                      <stop offset="50%" stopColor="#ffb380" stopOpacity="1" />
                      <stop offset="70%" stopColor="#f76e28" stopOpacity="1" />
                      <stop offset="100%" stopColor="#f76e28" stopOpacity="0.4" />
                    </linearGradient>

                    <linearGradient id="screenSurfaceDark" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#0f172a" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#020617" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Screen Body */}
                  <path
                    d="M 28 8 Q 230 24 432 8 L 452 28 Q 230 46 8 28 Z"
                    fill="url(#screenSurfaceDark)"
                    stroke="#f76e28"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                  />

                  {/* Luminous Top Curved Edge */}
                  <path
                    d="M 28 8 Q 230 24 432 8"
                    stroke="url(#screenLaserGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Bottom Outline */}
                  <path
                    d="M 8 28 Q 230 46 452 28"
                    stroke="#f76e28"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f76e28] animate-ping" />
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Curved Laser Screen • All Eyes This Way
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f76e28] animate-ping" />
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* TIER 1: ROYAL RECLINER (Row A)                       */}
            {/* ---------------------------------------------------- */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px bg-zinc-800 flex-1 max-w-xs" />
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-400 bg-purple-950/40 px-3 py-1 rounded-full border border-purple-800/60 shadow-xs">
                  <span>👑</span>
                  <span>Royal Recliner XL Slider • {formatLocalPrice(210.98)}</span>
                </div>
                <div className="h-px bg-zinc-800 flex-1 max-w-xs" />
              </div>

              <div className="flex items-center justify-center">
                <span className="w-6 sm:w-8 text-center font-black text-xs text-purple-400 mr-2 shrink-0">
                  A
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {Array.from({ length: 13 }, (_, i) => {
                    const num = String(i + 1).padStart(2, '0');
                    const seatId = `A${num}`;
                    const isSold = [1, 2, 7, 8, 9].includes(i + 1);
                    return renderSeatButton(seatId, num, 'A', 'Royal Recliner (XLSLIDER)', 210.98, isSold);
                  })}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* TIER 2: PRIME DOLBY ATMOS XL (Rows B to G)           */}
            {/* ---------------------------------------------------- */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="h-px bg-zinc-800 flex-1 max-w-xs" />
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/60 shadow-xs">
                  <span>⭐</span>
                  <span>Prime Dolby Atmos XL • {formatLocalPrice(210.98)}</span>
                </div>
                <div className="h-px bg-zinc-800 flex-1 max-w-xs" />
              </div>

              {/* Sweetspot Viewzone Tag */}
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-amber-400 mb-4">
                <Volume2 size={12} />
                <span>Rows C & D: Optimal Acoustic & Visual Sweetspot</span>
              </div>

              <div className="space-y-2.5">
                {['B', 'C', 'D', 'E', 'F', 'G'].map((rowLetter) => {
                  const isSweetspot = ['C', 'D'].includes(rowLetter);

                  return (
                    <div key={rowLetter} className="flex items-center justify-center">
                      <span className={`w-6 sm:w-8 text-center font-black text-xs mr-2 shrink-0 ${
                        isSweetspot ? 'text-amber-400' : 'text-zinc-500'
                      }`}>
                        {rowLetter}
                      </span>

                      {/* Left Block: 9 seats */}
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        {Array.from({ length: 9 }, (_, idx) => {
                          const num = String(idx + 1).padStart(2, '0');
                          const seatId = `${rowLetter}${num}`;
                          const isSold = (rowLetter === 'C' && [3, 4, 5].includes(idx + 1)) ||
                                         (rowLetter === 'D' && [1, 2, 8, 9].includes(idx + 1)) ||
                                         (rowLetter === 'F' && [4, 5, 6].includes(idx + 1));
                          const isBestseller = isSweetspot && [4, 5, 6].includes(idx + 1);

                          return renderSeatButton(seatId, num, rowLetter, 'Prime Dolby XL', 210.98, isSold, isBestseller);
                        })}
                      </div>

                      {/* Central Walking Aisle */}
                      <div className="w-6 sm:w-10 shrink-0 text-center">
                        <span className="text-[8px] text-zinc-700 uppercase font-black tracking-widest hidden sm:inline">Aisle</span>
                      </div>

                      {/* Right Block: 9 seats */}
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        {Array.from({ length: 9 }, (_, idx) => {
                          const num = String(idx + 10).padStart(2, '0');
                          const seatId = `${rowLetter}${num}`;
                          const isSold = (rowLetter === 'B' && [10, 11].includes(idx + 10)) ||
                                         (rowLetter === 'E' && [14, 15, 16].includes(idx + 10)) ||
                                         (rowLetter === 'G' && [17, 18].includes(idx + 10));
                          const isBestseller = isSweetspot && [10, 11, 12].includes(idx + 10);

                          return renderSeatButton(seatId, num, rowLetter, 'Prime Dolby XL', 210.98, isSold, isBestseller);
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* TIER 3: CLASSIC CINEMA (Row H)                       */}
            {/* ---------------------------------------------------- */}
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px bg-zinc-800 flex-1 max-w-xs" />
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 shadow-xs">
                  <span>🎟️</span>
                  <span>Classic Cinema • {formatLocalPrice(61.74)}</span>
                </div>
                <div className="h-px bg-zinc-800 flex-1 max-w-xs" />
              </div>

              <div className="flex items-center justify-center">
                <span className="w-6 sm:w-8 text-center font-black text-xs text-zinc-500 mr-2 shrink-0">
                  H
                </span>

                {/* Left Block */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {Array.from({ length: 9 }, (_, idx) => {
                    const num = String(idx + 1).padStart(2, '0');
                    const seatId = `H${num}`;
                    const isSold = [3, 4, 8].includes(idx + 1);
                    return renderSeatButton(seatId, num, 'H', 'Classic Cinema', 61.74, isSold);
                  })}
                </div>

                {/* Central Aisle */}
                <div className="w-6 sm:w-10 shrink-0"></div>

                {/* Right Block */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {Array.from({ length: 9 }, (_, idx) => {
                    const num = String(idx + 10).padStart(2, '0');
                    const seatId = `H${num}`;
                    const isSold = [10, 11, 14, 15].includes(idx + 10);
                    return renderSeatButton(seatId, num, 'H', 'Classic Cinema', 61.74, isSold);
                  })}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SEAT STATE LEGEND & OFFERS                           */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs font-semibold text-zinc-400 bg-zinc-950/80 border border-zinc-800/80 p-3.5 rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md border border-emerald-500 bg-zinc-900 inline-block"></span>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-[#f76e28] shadow-sm inline-block"></span>
                <span className="text-white font-bold">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-zinc-800 border border-zinc-700 opacity-60 inline-block"></span>
                <span>Sold Out</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md border-2 border-amber-400 bg-zinc-900 inline-block"></span>
                <span>Sweetspot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md border-2 border-purple-500 bg-zinc-900 inline-block"></span>
                <span>Royal Recliner</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. STICKY MODERN FLOATING CHECKOUT BAR                   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="sticky bottom-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 shadow-[0_-10px_35px_rgba(0,0,0,0.7)] py-3 px-4 sm:px-8"
          >
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              {/* Left Side: Selected Seats Pill Badges */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-[#f76e28]/30 text-[#f76e28] flex items-center justify-center shrink-0">
                  <Armchair size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-black tracking-wider text-zinc-400">
                      Seats ({selectedSeats.length}):
                    </span>
                    {selectedSeats.map(id => (
                      <span 
                        key={id}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f76e28]/20 border border-[#f76e28]/50 text-white font-mono font-bold text-xs"
                      >
                        <span>{id}</span>
                        <button
                          onClick={() => setSelectedSeats(prev => prev.filter(x => x !== id))}
                          className="hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Live Lock Active • Instant Ticket with verified QR Entry
                  </p>
                </div>
              </div>

              {/* Middle: Quick F&B Addon Toggle */}
              <div 
                onClick={() => setQuickPopcornAdded(!quickPopcornAdded)}
                className={`hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border cursor-pointer transition-all ${
                  quickPopcornAdded 
                    ? 'bg-amber-950/40 border-amber-500/80 text-amber-300' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <Popcorn size={16} className={quickPopcornAdded ? 'text-amber-400 animate-bounce' : ''} />
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold block">Caramel Popcorn & Coke</span>
                  <span className="text-[10px] text-zinc-400">+₹249 (Special 25% Off)</span>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ml-1 ${
                  quickPopcornAdded ? 'bg-amber-500 border-amber-400 text-black' : 'border-zinc-600'
                }`}>
                  {quickPopcornAdded && <Check size={11} strokeWidth={3} />}
                </div>
              </div>

              {/* Right Side: Total & Pay Button */}
              <div className="flex items-center justify-between md:justify-end gap-5">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total Amount</span>
                  <p className="text-xl sm:text-2xl font-black text-white leading-none">
                    {formatLocalPrice(calculateTotal())}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProceed}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#f76e28] to-[#ff8c42] hover:from-[#e05b16] hover:to-[#f76e28] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(247,110,40,0.5)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Pay {formatLocalPrice(calculateTotal())}</span>
                  <ChevronRight size={16} />
                </motion.button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 4. MODERN TICKET QUANTITY PICKER MODAL                   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showTicketModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              className="relative w-full max-w-md bg-zinc-950 rounded-3xl p-6 sm:p-7 shadow-2xl border border-zinc-800 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-[#f76e28]/30 text-[#f76e28] flex items-center justify-center mx-auto mb-3">
                <Armchair size={24} />
              </div>

              <h3 className="text-lg font-black text-white mb-1">How Many Tickets?</h3>
              <p className="text-xs text-zinc-400 mb-6">Choose how many seats you want to reserve together</p>

              {/* Vehicle tiers grid */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {VEHICLE_TIERS.map((v) => (
                  <motion.button
                    key={v.count}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      setMaxTickets(v.count);
                      setShowTicketModal(false);
                      showToast(`Seat selection updated to ${v.count} seat(s)`, "info");
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      maxTickets === v.count 
                        ? 'border-[#f76e28] bg-[#f76e28]/15 text-[#f76e28] font-bold shadow-[0_0_15px_rgba(247,110,40,0.3)]' 
                        : 'border-zinc-800/90 hover:border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <span className="text-2xl">{v.icon}</span>
                    <span className="text-xs font-black text-white">{v.count}</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400">{v.type}</span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setShowTicketModal(false)}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-zinc-800"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
