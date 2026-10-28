import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Bus, MapPin, Calendar, Users, ArrowRightLeft, Search, 
  ShieldCheck, Sparkles, Clock, Star, Award, Tag, ChevronRight, 
  AlertCircle, CheckCircle2, Info, Compass
} from 'lucide-react';
import { busService } from '../../../services/busService';
import { useToast } from '../../../context/ToastContext';
import { useCurrency } from '../../../context/CurrencyContext';

const POPULAR_ROUTES = [
  { from: 'Coimbatore', to: 'Chennai', fare: 890, duration: '8h 00m', tag: 'Fastest Volvo' },
  { from: 'Coimbatore', to: 'Bengaluru', fare: 820, duration: '6h 30m', tag: 'Club Class' },
  { from: 'Chennai', to: 'Madurai', fare: 780, duration: '8h 00m', tag: 'Top Rated' },
  { from: 'Bengaluru', to: 'Coimbatore', fare: 850, duration: '6h 30m', tag: 'Night AC Sleeper' },
  { from: 'Chennai', to: 'Coimbatore', fare: 920, duration: '8h 00m', tag: 'Multi-Axle' },
  { from: 'Coimbatore', to: 'Kochi', fare: 480, duration: '4h 30m', tag: 'Scenic Day Ride' }
];

const PROMO_OFFERS = [
  { code: 'BUSGOMO', title: 'Flat ₹100 OFF', subtitle: 'On your first interstate bus booking with GoMo Tickets', tag: 'POPULAR' },
  { code: 'SLEEPER20', title: '15% Cashback', subtitle: 'On luxury AC Sleeper bookings across South India', tag: 'LIMITED TIME' },
  { code: 'GOMOPASS', title: 'Zero Cancellation Fee', subtitle: 'Book refundable bus passes with flexible rescheduling', tag: 'ASSURED' }
];

export default function BusSearch() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { formatLocalPrice } = useCurrency();

  const [cities, setCities] = useState([]);
  const [fromCity, setFromCity] = useState('Coimbatore');
  const [toCity, setToCity] = useState('Chennai');
  const [journeyDate, setJourneyDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    busService.getCities().then(data => {
      if (data && data.length > 0) setCities(data);
    });
  }, []);

  const handleSwapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSearch = (e) => {
    e?.preventDefault();

    if (!fromCity || !toCity) {
      showToast('Please select both departure and destination cities.', 'error');
      return;
    }

    if (fromCity.toLowerCase() === toCity.toLowerCase()) {
      showToast('Departure and destination cities cannot be the same.', 'error');
      return;
    }

    if (!journeyDate) {
      showToast('Please select a valid journey date.', 'error');
      return;
    }

    const params = new URLSearchParams({
      from: fromCity,
      to: toCity,
      date: journeyDate,
      passengers: passengers.toString()
    });

    if (isRoundTrip && returnDate) {
      params.append('returnDate', returnDate);
    }

    navigate(`/tickets/buses/results?${params.toString()}`);
  };

  const setDateOffset = (days) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    setJourneyDate(target.toISOString().split('T')[0]);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-24">
      
      {/* 1. HERO SEARCH BANNER WITH GOMO ORANGE BRAND ACCENT */}
      <section className="bg-gradient-to-b from-[#1f2533] to-[#121620] text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f76e28_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f76e28]/20 border border-[#f76e28]/40 text-[#f76e28] text-xs font-bold uppercase tracking-wider mb-3">
                <Bus size={14} />
                <span>GoMo Bus Ticketing • Verified Operators</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Intercity Bus Booking Made Simple
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl">
                Compare and book AC Sleeper, Volvo Multi-Axle, and Luxury Seater buses with live seat layouts and transparent fare breakdowns.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex items-center gap-4 text-xs">
              <div className="bg-zinc-800/80 backdrop-blur-xs border border-zinc-700/80 rounded-xl p-3 text-center min-w-[100px]">
                <span className="block text-lg font-black text-[#f76e28]">100%</span>
                <span className="text-[11px] text-zinc-400">Live Seat Lock</span>
              </div>
              <div className="bg-zinc-800/80 backdrop-blur-xs border border-zinc-700/80 rounded-xl p-3 text-center min-w-[100px]">
                <span className="block text-lg font-black text-emerald-400">₹0 Fee</span>
                <span className="text-[11px] text-zinc-400">On Rescheduling</span>
              </div>
            </div>
          </div>

          {/* MAIN BUS SEARCH CARD */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-900 border border-zinc-200">
            
            {/* Trip Type Selector */}
            <div className="flex items-center gap-6 mb-6 pb-4 border-b border-zinc-100">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer text-zinc-800">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={!isRoundTrip} 
                  onChange={() => setIsRoundTrip(false)}
                  className="accent-[#f76e28] w-4 h-4 cursor-pointer"
                />
                <span>One Way</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer text-zinc-800">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={isRoundTrip} 
                  onChange={() => setIsRoundTrip(true)}
                  className="accent-[#f76e28] w-4 h-4 cursor-pointer"
                />
                <span>Round Trip (Return Option)</span>
              </label>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              
              {/* FROM CITY */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#f76e28]" />
                  <span>From City</span>
                </label>
                <div className="relative">
                  <select 
                    value={fromCity} 
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-zinc-900 focus:outline-none focus:border-[#f76e28] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Coimbatore">Coimbatore, Tamil Nadu</option>
                    <option value="Chennai">Chennai, Tamil Nadu</option>
                    <option value="Bengaluru">Bengaluru, Karnataka</option>
                    <option value="Madurai">Madurai, Tamil Nadu</option>
                    <option value="Salem">Salem, Tamil Nadu</option>
                    <option value="Tiruppur">Tiruppur, Tamil Nadu</option>
                    <option value="Kochi">Kochi, Kerala</option>
                    <option value="Hyderabad">Hyderabad, Telangana</option>
                  </select>
                </div>
              </div>

              {/* SWAP BUTTON */}
              <div className="md:col-span-1 flex justify-center pb-1">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-orange-50 hover:text-[#f76e28] border border-zinc-300 hover:border-[#f76e28] text-zinc-600 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Swap Origin & Destination"
                >
                  <ArrowRightLeft size={16} />
                </button>
              </div>

              {/* TO CITY */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-600" />
                  <span>To City</span>
                </label>
                <div className="relative">
                  <select 
                    value={toCity} 
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-zinc-900 focus:outline-none focus:border-[#f76e28] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Chennai">Chennai, Tamil Nadu</option>
                    <option value="Coimbatore">Coimbatore, Tamil Nadu</option>
                    <option value="Bengaluru">Bengaluru, Karnataka</option>
                    <option value="Madurai">Madurai, Tamil Nadu</option>
                    <option value="Salem">Salem, Tamil Nadu</option>
                    <option value="Tiruppur">Tiruppur, Tamil Nadu</option>
                    <option value="Kochi">Kochi, Kerala</option>
                    <option value="Hyderabad">Hyderabad, Telangana</option>
                  </select>
                </div>
              </div>

              {/* JOURNEY DATE */}
              <div className={isRoundTrip ? "md:col-span-2" : "md:col-span-3"}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#f76e28]" />
                    <span>Travel Date</span>
                  </label>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button 
                      type="button" 
                      onClick={() => setDateOffset(0)}
                      className="px-1.5 py-0.5 bg-zinc-100 hover:bg-orange-50 hover:text-[#f76e28] rounded font-bold cursor-pointer"
                    >
                      Today
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setDateOffset(1)}
                      className="px-1.5 py-0.5 bg-zinc-100 hover:bg-orange-50 hover:text-[#f76e28] rounded font-bold cursor-pointer"
                    >
                      Tom
                    </button>
                  </div>
                </div>
                <input 
                  type="date"
                  min={todayStr}
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-zinc-900 focus:outline-none focus:border-[#f76e28] focus:bg-white transition-colors cursor-pointer"
                />
              </div>

              {/* OPTIONAL RETURN DATE */}
              {isRoundTrip && (
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center gap-1.5">
                    <Calendar size={13} className="text-zinc-400" />
                    <span>Return Date</span>
                  </label>
                  <input 
                    type="date"
                    min={journeyDate || todayStr}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-zinc-900 focus:outline-none focus:border-[#f76e28] focus:bg-white transition-colors cursor-pointer"
                  />
                </div>
              )}

              {/* SEARCH BUTTON */}
              <div className={isRoundTrip ? "md:col-span-1" : "md:col-span-2"}>
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#f76e28] hover:bg-[#e05b16] text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search size={16} />
                  <span>Search</span>
                </button>
              </div>

            </form>

            {/* Demonstration notice per Part 4 specification */}
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Info size={13} className="text-amber-500" />
                <span>Simulated live inventory — All bus operators and trip schedules are realistic demonstration data.</span>
              </span>
              <span className="font-bold text-emerald-600 hidden sm:inline">
                Instant M-Ticket & PDF Generation
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROMOTIONAL OFFERS SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROMO_OFFERS.map((promo) => (
            <div 
              key={promo.code} 
              className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-4 group"
            >
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-100 text-[#f76e28]">
                  {promo.tag}
                </span>
                <h4 className="font-black text-sm text-zinc-900">{promo.title}</h4>
                <p className="text-xs text-zinc-500 leading-snug">{promo.subtitle}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="inline-block px-3 py-1 bg-zinc-100 border border-dashed border-zinc-300 font-mono text-xs font-bold text-zinc-800 rounded-lg group-hover:border-[#f76e28] group-hover:text-[#f76e28] transition-colors">
                  {promo.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR ROUTES WITH 1-CLICK INSTANT SEARCH */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
              <Compass size={22} className="text-[#f76e28]" />
              <span>Popular Bus Routes in South India</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Frequent daily departures with guaranteed comfortable berths</p>
          </div>
          <Link to="/tickets/movies" className="text-xs font-bold text-[#f76e28] hover:underline flex items-center gap-1">
            <span>Also check Movies</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_ROUTES.map((route, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFromCity(route.from);
                setToCity(route.to);
                const params = new URLSearchParams({
                  from: route.from,
                  to: route.to,
                  date: journeyDate,
                  passengers: '1'
                });
                navigate(`/tickets/buses/results?${params.toString()}`);
              }}
              className="bg-white rounded-2xl p-5 border border-zinc-200 hover:border-[#f76e28] shadow-2xs hover:shadow-md transition-all text-left flex items-center justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold mb-1">
                  <span>{route.duration}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">{route.tag}</span>
                </div>
                <h3 className="text-base font-black text-zinc-900 group-hover:text-[#f76e28] transition-colors flex items-center gap-2">
                  <span>{route.from}</span>
                  <span className="text-zinc-400">→</span>
                  <span>{route.to}</span>
                </h3>
                <span className="text-xs text-zinc-500 block mt-1">Daily AC Sleeper & Seater</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Starting at</span>
                <span className="text-base font-black text-zinc-900 group-hover:text-[#f76e28]">
                  {formatLocalPrice(route.fare)}
                </span>
                <span className="inline-block mt-1 text-[11px] font-bold text-[#f76e28]">Book →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* LUXURY FLEET SHOWCASE TEASER (MATCHING USER'S VEHICLE SHOWCASE SPECIFICATION) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm hover:border-orange-300 anim-hover-lift transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-900 group">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Bus Fleet" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono font-bold text-[10px]">
                2024 FLEET SHOWCASE
              </span>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#f76e28] block">
                Premium Coach Inspection & Specifications
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                BharatBenz & Scania Luxury Fleet Showcase
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Inspect detailed coach anatomy, 140° anatomical reclining berths, HEPA purified fresh air ventilation, dual-driver cockpit safety, and 20kg luggage bay capacity before booking.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {['36 Luxury Berths', '140° Ergonomic Recline', 'Twin-Deck Air Suspension', 'Purified Fresh Airflow'].map((spec, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold border border-zinc-200">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/tickets/buses/fleet"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f76e28] hover:bg-[#de5713] active:scale-97 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all anim-click-press"
                >
                  <span>Inspect Vehicle Showcase & Anatomy</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED BUS OPERATORS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight mb-2 flex items-center gap-2">
          <Award size={22} className="text-[#f76e28]" />
          <span>Featured Partner Bus Operators</span>
        </h2>
        <p className="text-xs text-zinc-500 mb-6">Verified fleet operators offering sanitised buses, GPS tracking & clean bedding</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'KPN Travels', type: 'Volvo Multi-Axle', rating: '4.6 ★', routes: 'Chennai, Coimbatore, Bengaluru' },
            { name: 'Parveen Travels', type: 'Scania Premium', rating: '4.8 ★', routes: 'Chennai, Madurai, Salem' },
            { name: 'IntrCity SmartBus', type: 'Club Class Lounges', rating: '4.9 ★', routes: 'Bengaluru, Coimbatore, Hyderabad' },
            { name: 'SRS Travels', type: 'Executive Sleeper', rating: '4.4 ★', routes: 'Bengaluru, Chennai, Mysore' },
            { name: 'Orange Tours', type: 'BharatBenz Sleeper', rating: '4.7 ★', routes: 'Chennai, Madurai, Hyderabad' }
          ].map((op, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-zinc-200 text-center shadow-2xs hover:border-zinc-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f76e28] mx-auto flex items-center justify-center font-black text-lg mb-2">
                <Bus size={24} />
              </div>
              <h4 className="font-bold text-sm text-zinc-900">{op.name}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">{op.type}</p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black">
                {op.rating}
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 truncate">{op.routes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GOMO PROMISE & SECURITY BANNER */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-[#1f2533] text-white rounded-3xl p-8 sm:p-10 border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-[#f76e28] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">Guaranteed Seat Hold</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Your selected sleeper berths are held in real-time for 10 minutes while you complete checkout without fear of seat conflicts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={26} />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">Transparent Itemized Fare</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Clear breakdown of base seat fare, platform fee ₹30, and GST. No hidden fees or inflated surge prices at checkout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Clock size={26} />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">Instant Automated Refund</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Cancel up to 24 hours prior for a 90% refund. Fast tracking of refund transactions back to your UPI or payment source.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
