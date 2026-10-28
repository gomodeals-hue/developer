import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Bus, ShieldCheck, CheckCircle2, Star, Clock, MapPin, 
  ChevronLeft, ChevronRight, Wind, Tv, Volume2, Mic, 
  HelpCircle, ArrowRight, UserCheck, Luggage, Sparkles, 
  Check, Phone, Info, Zap, Smartphone, Armchair, ShieldAlert
} from 'lucide-react';
import { busService } from '../../../services/busService';
import { useCurrency } from '../../../context/CurrencyContext';
import { useToast } from '../../../context/ToastContext';

// High-definition luxury bus gallery photos matching the modern showcase layout
const BUS_GALLERY = [
  {
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    title: 'Exterior 3/4 Front View',
    label: 'Aerodynamic Multi-Axle Body'
  },
  {
    url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200',
    title: 'Cabin & Reclining Berths',
    label: '140° Ergonomic Recline Layout'
  },
  {
    url: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&q=80&w=1200',
    title: 'Air-Suspension Cockpit',
    label: 'ADAS Lane-Assist & Dual Captains'
  },
  {
    url: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80&w=1200',
    title: 'Under-Deck Luggage Compartment',
    label: '20kg Secure Baggage Tagging'
  }
];

export default function BusDetails() {
  const { tripId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();

  const travelDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const passengers = searchParams.get('passengers') || '1';

  const [trip, setTrip] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryText, setInquiryText] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    if (tripId) {
      busService.getTripById(tripId).then(res => {
        if (res && res.trip) {
          setTrip(res.trip);
        } else {
          fallbackTrip();
        }
      }).catch(() => fallbackTrip())
        .finally(() => setLoading(false));
    } else {
      fallbackTrip();
      setLoading(false);
    }
  }, [tripId]);

  const fallbackTrip = () => {
    setTrip({
      id: tripId || 'trip_cbe_maa_01',
      operator_name: 'KPN Travels',
      bus_service_number: 'KPN-702-EXP',
      bus_type: 'BharatBenz Grand Executive AC Sleeper (2+1)',
      model_name: 'BharatBenz 1624 KLQ Grand Sleeper',
      from_city: 'Coimbatore',
      to_city: 'Chennai',
      departure_time: '21:30',
      arrival_time: '05:30',
      duration: '8h 00m',
      base_fare: 890,
      rating: 4.8,
      total_reviews: 1420,
      total_seats: 36,
      available_seats: 14,
      year_of_release: 2024,
      vehicle_length: '13.5m',
      vehicle_height: '3.8m',
      is_ac: true,
      category: 'sleeper'
    });
  };

  const nextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % BUS_GALLERY.length);
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + BUS_GALLERY.length) % BUS_GALLERY.length);
  };

  const handleSelectSeats = () => {
    const id = trip?.id || tripId || 'trip_cbe_maa_01';
    navigate(`/tickets/buses/seat-selection/${id}?date=${travelDate}&passengers=${passengers}`);
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    showToast('Your inquiry has been sent to our 24/7 fleet concierge!', 'success');
    setShowInquiryModal(false);
    setInquiryText('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f76e28]"></div>
          <span className="text-xs font-bold text-zinc-600">Loading Vehicle Specifications...</span>
        </div>
      </div>
    );
  }

  const currentTrip = trip || {};

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-32">
      
      {/* 1. TOP BREADCRUMB NAVIGATION (EXACTLY AS IN USER'S PROVIDED DESIGN) */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
            <Link to="/" className="hover:text-[#f76e28] transition-colors">Main page</Link>
            <span>›</span>
            <Link to="/tickets" className="hover:text-[#f76e28] transition-colors">Tickets</Link>
            <span>›</span>
            <Link to="/tickets/buses" className="hover:text-[#f76e28] transition-colors">Buses</Link>
            <span>›</span>
            <span className="text-zinc-800 font-bold truncate max-w-xs">
              {currentTrip.model_name || currentTrip.bus_type}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        
        {/* 2. HERO SHOWCASE SECTION (2 COLUMNS: GALLERY & SPECS CARD) */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT 7 COLS: PHOTO CAROUSEL */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-900 group shadow-md">
                <img 
                  src={BUS_GALLERY[activeImageIndex].url} 
                  alt={BUS_GALLERY[activeImageIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono font-bold text-[11px] border border-white/20">
                    {currentTrip.year_of_release || 2024} MODEL
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#f76e28] text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                    {currentTrip.category === 'sleeper' ? 'AC SLEEPER 2+1' : 'EXECUTIVE SEATER'}
                  </span>
                </div>

                {/* Carousel Arrows with Micro-Animations */}
                <button 
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-zinc-900 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-zinc-900 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Image caption badge */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-b-xl">
                  <span className="font-bold">{BUS_GALLERY[activeImageIndex].title}</span>
                  <span className="text-[11px] text-zinc-300 font-mono">{activeImageIndex + 1} / {BUS_GALLERY.length}</span>
                </div>
              </div>

              {/* Thumbnail Selector */}
              <div className="grid grid-cols-4 gap-3">
                {BUS_GALLERY.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all duration-200 cursor-pointer ${
                      activeImageIndex === idx 
                        ? 'border-[#f76e28] shadow-md scale-[1.02]' 
                        : 'border-transparent opacity-65 hover:opacity-100 hover:scale-[1.01]'
                    }`}
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT 5 COLS: SPECS, PRICING & ACTIONS */}
            <div className="lg:col-span-5 space-y-6">
              
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#f76e28] block mb-1">
                  {currentTrip.operator_name} • Fleet Spec
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-snug">
                  {currentTrip.model_name || currentTrip.bus_type}
                </h1>
                <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-2">
                  <span className="font-semibold text-zinc-700">{currentTrip.from_city} → {currentTrip.to_city}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                    <Star size={12} className="fill-emerald-600" />
                    <span>{currentTrip.rating || 4.8}</span>
                    <span className="text-zinc-400 font-normal">({currentTrip.total_reviews || 1240})</span>
                  </span>
                </p>
              </div>

              {/* DOTTED LEADER SPECS TABLE (FAITHFUL TO USER IMAGE) */}
              <div className="space-y-3 text-xs sm:text-sm font-medium pt-2">
                
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-zinc-500 shrink-0">Seats / Berths</span>
                  <div className="grow border-b border-dotted border-zinc-300 mx-2 self-center"></div>
                  <span className="font-bold text-zinc-900 shrink-0">{currentTrip.total_seats || 36} Units</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-zinc-500 shrink-0">Min. journey duration</span>
                  <div className="grow border-b border-dotted border-zinc-300 mx-2 self-center"></div>
                  <span className="font-bold text-zinc-900 shrink-0">{currentTrip.duration || '8h 00m'} Direct</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-zinc-500 shrink-0">Fleet units in service</span>
                  <div className="grow border-b border-dotted border-zinc-300 mx-2 self-center"></div>
                  <span className="font-bold text-zinc-900 shrink-0">12 Coaches</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-zinc-500 shrink-0">Emission standard</span>
                  <div className="grow border-b border-dotted border-zinc-300 mx-2 self-center"></div>
                  <span className="font-bold text-zinc-900 shrink-0">Bharat Stage VI (BS6)</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-zinc-500 shrink-0">Live GPS tracking</span>
                  <div className="grow border-b border-dotted border-zinc-300 mx-2 self-center"></div>
                  <span className="font-bold text-emerald-600 shrink-0">Active & Monitored</span>
                </div>

              </div>

              <div className="pt-4 border-t border-zinc-200">
                <div className="flex items-baseline justify-between gap-2 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Price per seat
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 mr-1.5 font-medium">from</span>
                    <span className="text-2xl sm:text-3xl font-black text-zinc-900">
                      {formatLocalPrice(currentTrip.base_fare || 850)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons in GoMo Style with Subtle Animations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleSelectSeats}
                    className="py-3.5 px-6 rounded-2xl bg-[#f76e28] hover:bg-[#de5713] active:scale-97 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-orange-200 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Select Seats & Book</span>
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => setShowInquiryModal(true)}
                    className="py-3.5 px-6 rounded-2xl bg-white hover:bg-zinc-50 active:scale-97 text-zinc-800 border-2 border-zinc-200 hover:border-zinc-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <HelpCircle size={15} className="text-zinc-500" />
                    <span>Ask a question</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 3. KEY SPECS RIBBON (4 STAT BLOCKS MATCHING USER DESIGN) */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
            
            <div className="pt-3 sm:pt-0 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl font-black text-zinc-900 block tracking-tight">
                {currentTrip.total_seats || 36}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mt-1">
                Seats / Berths
              </span>
            </div>

            <div className="pt-4 lg:pt-0 sm:pl-8 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl font-black text-zinc-900 block tracking-tight">
                {currentTrip.year_of_release || 2024}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mt-1">
                Year of release
              </span>
            </div>

            <div className="pt-4 lg:pt-0 sm:pl-8 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl font-black text-zinc-900 block tracking-tight">
                {currentTrip.vehicle_length || '13,5m'}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mt-1">
                Length
              </span>
            </div>

            <div className="pt-4 lg:pt-0 sm:pl-8 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl font-black text-zinc-900 block tracking-tight">
                {currentTrip.vehicle_height || '3,8m'}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mt-1">
                Height
              </span>
            </div>

          </div>
        </div>

        {/* 4. COMFORT AND SAFETY SECTION (CIRCULAR BADGES GRID + DRIVER'S COCKPIT) */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-10 space-y-8">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            Comfort and safety
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 7 COLS: CIRCULAR ICON SPEC TILES */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {[
                { title: 'Air conditioning fresh air function', icon: Wind, desc: 'HEPA micro-filtered air circulation' },
                { title: "Guide's seat & Host assistance", icon: UserCheck, desc: 'Dedicated cabin crew for passengers' },
                { title: 'Public address microphone', icon: Mic, desc: 'Trip updates & stop announcements' },
                { title: '2 onboard entertainment screens', icon: Tv, desc: 'Central HD streaming displays' },
                { title: 'Acoustic audio sound system', icon: Volume2, desc: 'Individual headphone jack options' },
                { title: 'USB & Type-C fast charger', icon: Zap, desc: 'Dedicated port at every seat/berth' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 hover:border-[#f76e28]/40 hover:bg-orange-50/30 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-zinc-900 block leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}

            </div>

            {/* RIGHT 5 COLS: DRIVER SEAT & LUGGAGE HIGHLIGHTS (FAITHFUL TO USER IMAGE) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <span className="text-xs font-black text-zinc-900 uppercase tracking-wide flex items-center gap-1.5 text-[#f76e28]">
                  <ShieldCheck size={16} />
                  <span>Driver's seat & Cockpit safety</span>
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Equipped with pneumatic air suspension, three-point seat belt, integrated headrest, speed governors, and ADAS electronic stability control. Dual-crew pilots operate all overnight services.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <span className="text-xs font-black text-zinc-900 uppercase tracking-wide flex items-center gap-1.5 text-zinc-800">
                  <Luggage size={16} />
                  <span>Spacious luggage compartment</span>
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  The largest under-deck storage bay in its class with up to 20kg complimentary baggage per passenger. Every bag is tagged with tamper-proof digital barcode seals.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* 5. COMFORT FOR EVERY PASSENGER (SIGNATURE ERGONOMIC SEAT RECLINE ILLUSTRATION) */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-10 space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Comfort for every passenger
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Ergonomically engineered seating with anatomical lumbar support and customizable privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT 3 COLS: CHECKLIST 1 */}
            <div className="lg:col-span-3 space-y-4">
              {[
                { label: 'Adjustable backrest', sub: 'Smooth 140° reclining curve' },
                { label: 'Foldable dining table', sub: 'Laptop & meal friendly surface' },
                { label: 'USB & Type-C charger', sub: 'Fast charging port per passenger' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-zinc-900 block">{item.label}</span>
                    <span className="text-[11px] text-zinc-400 block">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CENTER 6 COLS: BESPOKE VECTOR RECLINING SEAT DIAGRAM */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-orange-50/40 via-emerald-50/20 to-zinc-50 rounded-3xl border border-zinc-200/80 relative overflow-hidden">
              
              {/* Overhead Fresh Air Stream Visualization */}
              <div className="w-full flex items-center justify-center gap-2 mb-4 animate-air-flow">
                <span className="text-[10px] font-mono uppercase font-black tracking-widest text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Wind size={13} />
                  <span>Purified Airflow (22°C Climate Zone)</span>
                </span>
              </div>

              {/* Vector Graphic: Anatomical Reclining Bus Seats Profile */}
              <svg 
                viewBox="0 0 500 280" 
                className="w-full max-w-md h-auto drop-shadow-md select-none"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Floor and chassis rails */}
                <path d="M 30 260 L 470 260" stroke="#d4d4d8" strokeWidth="4" strokeLinecap="round" />
                <path d="M 60 260 L 60 270 M 250 260 L 250 270 M 440 260 L 440 270" stroke="#a1a1aa" strokeWidth="3" />

                {/* Overhead AC vent rail */}
                <path d="M 50 25 L 450 25" stroke="#e4e4e7" strokeWidth="3" strokeDasharray="6 6" />
                <circle cx="150" cy="25" r="5" fill="#10b981" />
                <circle cx="340" cy="25" r="5" fill="#10b981" />

                {/* Airflow glow streams */}
                <path d="M 150 30 Q 140 70 170 110" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <path d="M 340 30 Q 330 70 360 110" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

                {/* REAR SEAT 1 (UPRIGHT SEAT BASE & PILLOW) */}
                <g transform="translate(60, 40)">
                  {/* Seat mount pedestal */}
                  <rect x="75" y="170" width="30" height="50" rx="4" fill="#52525b" />
                  
                  {/* Seat cushion base */}
                  <rect x="50" y="145" width="80" height="28" rx="8" fill="#15803d" />
                  <rect x="52" y="147" width="76" height="10" rx="5" fill="#22c55e" opacity="0.8" />
                  
                  {/* Reclining Backrest (120°) */}
                  <path d="M 62 145 C 55 120, 45 80, 52 40 C 54 28, 68 28, 70 40 C 65 80, 72 120, 80 145 Z" fill="#15803d" />
                  
                  {/* Headrest Cushion */}
                  <rect x="44" y="20" width="32" height="26" rx="8" fill="#166534" />
                  <rect x="46" y="22" width="28" height="8" rx="4" fill="#22c55e" opacity="0.9" />

                  {/* Folded Laptop Tray */}
                  <rect x="36" y="70" width="8" height="35" rx="3" fill="#71717a" />
                  
                  {/* Ergonomic Armrest */}
                  <rect x="68" y="125" width="50" height="12" rx="6" fill="#14532d" />
                </g>

                {/* FRONT SEAT 2 (RECLINED AT 140° WITH EXTENDED LEG SUPPORT) */}
                <g transform="translate(250, 40)">
                  {/* Seat mount pedestal */}
                  <rect x="75" y="170" width="30" height="50" rx="4" fill="#52525b" />
                  
                  {/* Seat cushion base */}
                  <rect x="50" y="145" width="85" height="28" rx="8" fill="#15803d" />
                  <rect x="52" y="147" width="81" height="10" rx="5" fill="#22c55e" opacity="0.8" />

                  {/* Calf / Footrest Extended Support */}
                  <path d="M 130 155 L 165 195 L 155 200 L 125 165 Z" fill="#166534" />
                  
                  {/* Reclined Backrest (140° Arc) */}
                  <path d="M 58 145 C 45 115, 30 75, 35 35 C 38 22, 52 24, 55 35 C 50 75, 62 115, 75 145 Z" fill="#15803d" />
                  
                  {/* Headrest Cushion with Ergonomic Cradle */}
                  <rect x="25" y="15" width="34" height="26" rx="8" fill="#166534" />
                  <rect x="27" y="17" width="30" height="8" rx="4" fill="#22c55e" opacity="0.9" />

                  {/* 140° Recline Arc Indicator */}
                  <path d="M 40 45 A 60 60 0 0 1 70 70" stroke="#f76e28" strokeWidth="2.5" strokeDasharray="3 3" />
                  <text x="75" y="65" fill="#f76e28" fontSize="11" fontWeight="bold" fontFamily="sans-serif">140°</text>

                  {/* Folded Laptop Tray */}
                  <rect x="18" y="65" width="8" height="35" rx="3" fill="#71717a" />
                  
                  {/* Ergonomic Armrest */}
                  <rect x="65" y="125" width="52" height="12" rx="6" fill="#14532d" />
                </g>

                {/* Interactive Recline Label Badge */}
                <rect x="195" y="215" width="110" height="24" rx="12" fill="#1f2533" />
                <text x="250" y="231" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                  ANATOMICAL RECLINE
                </text>
              </svg>

              <span className="text-[11px] font-bold text-zinc-500 mt-2">
                Illustration: 140° Zero-Gravity Recline & Calf Extension
              </span>
            </div>

            {/* RIGHT 3 COLS: CHECKLIST 2 */}
            <div className="lg:col-span-3 space-y-4">
              {[
                { label: 'Overhead luggage racks', sub: 'Easy access cabin bag shelves' },
                { label: 'Individual reading lamp', sub: 'Adjustable LED focus beam' },
                { label: 'Padded armrests', sub: 'Dual ergonomic resting support' },
                { label: '3-point safety seat belts', sub: 'Automotive crash-tested straps' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-zinc-900 block">{item.label}</span>
                    <span className="text-[11px] text-zinc-400 block">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 6. BOTTOM STICKY ACTION BAR */}
        <div className="bg-[#1f2533] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-zinc-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#f76e28] block">
              Ready for departure
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Travel between {currentTrip.from_city} and {currentTrip.to_city}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Instant e-ticket • Free SMS & WhatsApp updates • 100% refund on timely cancellation
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Base Fare</span>
              <span className="text-2xl font-black text-[#f76e28]">
                {formatLocalPrice(currentTrip.base_fare || 850)}
              </span>
            </div>

            <button
              onClick={handleSelectSeats}
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-[#f76e28] hover:bg-[#de5713] active:scale-97 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book This Coach</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>

      {/* QUICK INQUIRY MODAL */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-base font-black text-zinc-900">
                Ask a Question regarding this Bus
              </h3>
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="text-zinc-400 hover:text-zinc-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-500">
              Inquire about pick-up spots, child safety, wheelchair accessibility or luggage dimensions.
            </p>

            <form onSubmit={handleSendInquiry} className="space-y-3">
              <textarea
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="Type your question here (e.g. Can I bring a foldable bicycle?)..."
                rows={4}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:border-[#f76e28] focus:ring-1 focus:ring-[#f76e28]/20"
                required
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#f76e28] hover:bg-[#de5713] text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
