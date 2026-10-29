import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, MapPin, Calendar, Users, ArrowRightLeft, Search, 
  ShieldCheck, Sparkles, Clock, Star, Award, Tag, ChevronRight, 
  CheckCircle2, Info, Coffee, Luggage, Wifi, Zap, X, Ticket, AlertCircle
} from 'lucide-react';
import { MOCK_FLIGHTS, saveBookingRecord } from '../../../data/mockTicketData';
import { useToast } from '../../../context/ToastContext';
import { useCurrency } from '../../../context/CurrencyContext';

const AIRPORTS = [
  { code: 'CJB', city: 'Coimbatore', name: 'Coimbatore International Airport' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International Airport' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport' },
  { code: 'DEL', city: 'Delhi-NCR', name: 'Indira Gandhi International Airport' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj Airport' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport' },
  { code: 'COK', city: 'Kochi', name: 'Cochin International Airport' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose Airport' }
];

const POPULAR_FLIGHT_ROUTES = [
  { from: 'Coimbatore (CJB)', to: 'Chennai (MAA)', airline: 'IndiGo Non-stop', time: '1h 05m', fare: 3490, tag: 'FASTEST FLIGHT' },
  { from: 'Coimbatore (CJB)', to: 'Bengaluru (BLR)', airline: 'Air India Non-stop', time: '1h 00m', fare: 3120, tag: 'MEAL INCLUDED' },
  { from: 'Bengaluru (BLR)', to: 'Delhi (DEL)', airline: 'IndiGo Non-stop', time: '2h 45m', fare: 5850, tag: 'BESTSELLER ROUTE' },
  { from: 'Mumbai (BOM)', to: 'Delhi (DEL)', airline: 'Vistara Luxury', time: '2h 10m', fare: 6420, tag: 'STARBUCKS IN-FLIGHT' },
  { from: 'Coimbatore (CJB)', to: 'Mumbai (BOM)', airline: 'Akasa Air Direct', time: '1h 50m', fare: 4299, tag: 'GREAT VALUE' }
];

const SPECIAL_FARES = [
  { id: 'regular', label: 'Regular Fares' },
  { id: 'student', label: 'Student (+10kg Bag)' },
  { id: 'senior', label: 'Senior Citizen (Flat 10% Off)' },
  { id: 'armed', label: 'Armed Forces' }
];

export default function FlightSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const { formatLocalPrice } = useCurrency();

  const [tripType, setTripType] = useState('oneway'); // 'oneway' | 'roundtrip'
  const [fromCode, setFromCode] = useState(searchParams.get('from') || 'CJB');
  const [toCode, setToCode] = useState(searchParams.get('to') || 'MAA');
  const [departDate, setDepartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [selectedSpecialFare, setSelectedSpecialFare] = useState('regular');
  const [selectedAirlineFilter, setSelectedAirlineFilter] = useState('ALL');

  // Booking Modal States
  const [selectedFlightForBooking, setSelectedFlightForBooking] = useState(null);
  const [passengerFirstName, setPassengerFirstName] = useState('');
  const [passengerLastName, setPassengerLastName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [seatPref, setSeatPref] = useState('Window');
  const [mealPref, setMealPref] = useState('Vegetarian');
  const [bookingSuccessModal, setBookingSuccessModal] = useState(null);

  const handleSwapAirports = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const fromAirportObj = AIRPORTS.find(a => a.code === fromCode) || AIRPORTS[0];
  const toAirportObj = AIRPORTS.find(a => a.code === toCode) || AIRPORTS[1];

  // Filter flights
  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter(flight => {
      const matchFrom = !fromCode || flight.from_code === fromCode || flight.from_city.toLowerCase().includes(fromAirportObj.city.toLowerCase());
      const matchTo = !toCode || flight.to_code === toCode || flight.to_city.toLowerCase().includes(toAirportObj.city.toLowerCase());
      const matchAirline = selectedAirlineFilter === 'ALL' || flight.airline.toLowerCase() === selectedAirlineFilter.toLowerCase();
      
      return matchAirline && (matchFrom || matchTo);
    });
  }, [fromCode, toCode, selectedAirlineFilter, fromAirportObj, toAirportObj]);

  const handleBookFlight = (flight) => {
    setSelectedFlightForBooking(flight);
  };

  const handleConfirmFlightBooking = (e) => {
    e.preventDefault();
    if (!passengerFirstName.trim() || !passengerLastName.trim()) {
      showToast('Please enter passenger full name', 'warning');
      return;
    }
    if (!passengerEmail.trim() || !passengerEmail.includes('@')) {
      showToast('Please enter a valid email address for flight ticket', 'warning');
      return;
    }
    if (!passengerPhone.trim() || passengerPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }

    const pnr = `GMD${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingId = `FL-${Math.floor(100000 + Math.random() * 900000)}`;

    const bookingRecord = {
      booking_id: bookingId,
      pnr,
      booking_type: 'flight',
      type: 'flight',
      title: `${selectedFlightForBooking.airline} - ${selectedFlightForBooking.flight_number}`,
      flight_number: selectedFlightForBooking.flight_number,
      airline: selectedFlightForBooking.airline,
      theatre: `${selectedFlightForBooking.from_code} (${selectedFlightForBooking.from_city}) ✈️ ${selectedFlightForBooking.to_code} (${selectedFlightForBooking.to_city})`,
      from_airport: selectedFlightForBooking.from_airport,
      to_airport: selectedFlightForBooking.to_airport,
      booking_date: departDate,
      booking_time: selectedFlightForBooking.from_time,
      arrival_time: selectedFlightForBooking.to_time,
      seats: [`Seat ${Math.floor(Math.random() * 28) + 1}${seatPref === 'Window' ? 'A' : 'C'} (${cabinClass})`],
      seat_tier: `${cabinClass} Class`,
      total_amount: selectedFlightForBooking.price * passengers,
      status: 'Confirmed',
      qr_code: `GMD-EBOARDING-${pnr}`,
      passenger: {
        name: `${passengerFirstName} ${passengerLastName}`,
        email: passengerEmail,
        phone: passengerPhone,
        seat: seatPref,
        meal: mealPref
      },
      created_at: new Date().toISOString()
    };

    saveBookingRecord(bookingRecord);
    setSelectedFlightForBooking(null);
    setBookingSuccessModal(bookingRecord);
    showToast(`Flight E-Ticket Confirmed! PNR: ${pnr}`, 'success');
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-24">
      {/* ======================================================== */}
      {/* 1. HERO FLIGHT / AEROPLANE SEARCH BANNER                 */}
      {/* ======================================================== */}
      <section className="bg-gradient-to-b from-[#101b2b] via-[#0d1624] to-zinc-950 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Breadcrumb & Official Flight Partner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Link to="/tickets" className="hover:text-[#f76e28] transition-colors">Tickets Home</Link>
              <span>/</span>
              <span className="text-white font-bold">Aeroplane & Flight Booking</span>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700/80 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span className="text-zinc-300">IATA Certified Domestic & Int. Flights</span>
              <span className="text-zinc-600">|</span>
              <span className="text-sky-400 font-bold">Zero Convenience Fee on UPI</span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
            >
              Book <span className="text-[#f76e28]">Domestic & International</span> Flights
            </motion.h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-medium">
              IndiGo, Air India, Vistara, Akasa Air & international airlines with live fares & instant web check-in.
            </p>
          </div>

          {/* FLIGHT SEARCH FORM WIDGET */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-zinc-200 text-zinc-900 max-w-5xl mx-auto">
            
            {/* Trip Type & Cabin Class Selection */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-4 text-xs font-bold text-zinc-700">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === 'oneway'}
                    onChange={() => setTripType('oneway')}
                    className="accent-[#f76e28]"
                  />
                  <span>One Way</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === 'roundtrip'}
                    onChange={() => setTripType('roundtrip')}
                    className="accent-[#f76e28]"
                  />
                  <span>Round Trip</span>
                </label>
              </div>

              {/* Passengers & Class Dropdowns */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg">
                  <Users size={14} className="text-[#f76e28]" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="bg-transparent font-bold text-zinc-800 outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Traveller' : 'Travellers'}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg">
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                    className="bg-transparent font-bold text-zinc-800 outline-none cursor-pointer"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business Class</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Airport & Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* FROM AIRPORT */}
              <div className="md:col-span-4 relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 hover:border-[#f76e28] transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">From Airport</span>
                <div className="flex items-center gap-2">
                  <Plane size={17} className="text-[#f76e28] shrink-0" />
                  <select
                    value={fromCode}
                    onChange={(e) => setFromCode(e.target.value)}
                    className="w-full bg-transparent font-black text-sm text-zinc-900 outline-none cursor-pointer"
                  >
                    {AIRPORTS.map(a => (
                      <option key={a.code} value={a.code}>
                        {a.city} ({a.code}) - {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SWAP AIRPORTS BUTTON */}
              <div className="md:col-span-1 flex items-center justify-center -my-2 md:my-0">
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-orange-50 hover:text-[#f76e28] border border-zinc-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:rotate-180 duration-300"
                  title="Swap Origin & Destination"
                >
                  <ArrowRightLeft size={15} />
                </button>
              </div>

              {/* TO AIRPORT */}
              <div className="md:col-span-4 relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 hover:border-[#f76e28] transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">To Airport</span>
                <div className="flex items-center gap-2">
                  <Plane size={17} className="text-[#f76e28] shrink-0 rotate-90" />
                  <select
                    value={toCode}
                    onChange={(e) => setToCode(e.target.value)}
                    className="w-full bg-transparent font-black text-sm text-zinc-900 outline-none cursor-pointer"
                  >
                    {AIRPORTS.map(a => (
                      <option key={a.code} value={a.code}>
                        {a.city} ({a.code}) - {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DEPARTURE DATE */}
              <div className="md:col-span-3 relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 hover:border-[#f76e28] transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">Departure Date</span>
                <div className="flex items-center gap-2">
                  <Calendar size={17} className="text-[#f76e28] shrink-0" />
                  <input
                    type="date"
                    value={departDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-transparent font-black text-sm text-zinc-900 outline-none cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Special Fares Pills Bar */}
            <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-zinc-400 font-bold mr-1">Special Fares:</span>
                {SPECIAL_FARES.map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedSpecialFare(f.id)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      selectedSpecialFare === f.id
                        ? 'bg-[#f76e28] text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <ShieldCheck size={14} />
                <span>Price Lock & Instant Web Check-in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LIVE FLIGHT RESULTS LISTING SECTION                   */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Results Header with Airline Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Flights from <span className="text-[#f76e28]">{fromAirportObj.city} ({fromCode})</span> to <span className="text-[#f76e28]">{toAirportObj.city} ({toCode})</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Showing {filteredFlights.length} available non-stop flights for {departDate}
            </p>
          </div>

          {/* Airline Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 mr-1">Airline:</span>
            {['ALL', 'IndiGo', 'Air India', 'Vistara', 'Akasa Air'].map(air => (
              <button
                key={air}
                onClick={() => setSelectedAirlineFilter(air)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedAirlineFilter === air
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {air}
              </button>
            ))}
          </div>
        </div>

        {/* FLIGHT RESULTS LIST */}
        <div className="space-y-4">
          {filteredFlights.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-xl mx-auto shadow-sm">
              <Plane size={42} className="mx-auto text-zinc-300 mb-3" />
              <h3 className="text-base font-black text-zinc-900 mb-1">No Direct Flights Found</h3>
              <p className="text-xs text-zinc-500 mb-6">
                Try searching routes between Coimbatore (CJB), Chennai (MAA), Bengaluru (BLR) or Delhi (DEL).
              </p>
              <button
                onClick={() => {
                  setFromCode('CJB');
                  setToCode('MAA');
                  setSelectedAirlineFilter('ALL');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                View Coimbatore ➔ Chennai Flights
              </button>
            </div>
          ) : (
            filteredFlights.map((flight) => {
              return (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-lg transition-all p-5 sm:p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Airline & Aircraft Details */}
                    <div className="md:col-span-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center font-black shrink-0">
                        <Plane size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-zinc-900">{flight.airline}</h3>
                          <span className="text-xs font-bold text-zinc-400">{flight.flight_number}</span>
                        </div>
                        <span className="text-xs text-zinc-500 font-medium block">{flight.aircraft}</span>
                        <div className="flex items-center gap-1 mt-1">
                          {flight.tags.map(t => (
                            <span key={t} className="text-[9px] font-black uppercase tracking-wider bg-orange-50 text-[#f76e28] px-1.5 py-0.2 rounded border border-orange-200/60">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Flight Timings & Duration Path */}
                    <div className="md:col-span-6 grid grid-cols-3 items-center text-center px-2">
                      <div className="text-left">
                        <span className="text-xl sm:text-2xl font-black text-zinc-900">{flight.from_time}</span>
                        <p className="text-xs font-bold text-zinc-800">{flight.from_code}</p>
                        <span className="text-[10px] text-zinc-400 block truncate">{flight.from_city}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-zinc-500">{flight.duration}</span>
                        <div className="w-full max-w-[130px] flex items-center gap-1 my-1">
                          <div className="w-2 h-2 rounded-full bg-[#f76e28]"></div>
                          <div className="h-0.5 bg-zinc-300 flex-1"></div>
                          <Plane size={13} className="text-[#f76e28]" />
                          <div className="h-0.5 bg-zinc-300 flex-1"></div>
                          <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600">{flight.stops}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-black text-zinc-900">{flight.to_time}</span>
                        <p className="text-xs font-bold text-zinc-800">{flight.to_code}</p>
                        <span className="text-[10px] text-zinc-400 block truncate">{flight.to_city}</span>
                      </div>
                    </div>

                    {/* Fares & Booking Button */}
                    <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-zinc-100 pt-3 md:pt-0 md:pl-4">
                      <div className="text-left md:text-right">
                        <span className="text-xl sm:text-2xl font-black text-zinc-900 leading-none">
                          {formatLocalPrice(flight.price)}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-bold block mt-0.5">per adult • all taxes incl</span>
                      </div>

                      <button
                        onClick={() => handleBookFlight(flight)}
                        className="mt-2 px-6 py-2.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>Book Flight</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                  </div>

                  {/* Amenities Bottom Strip */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-2">
                    <div className="flex flex-wrap items-center gap-4 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Luggage size={13} className="text-zinc-400" />
                        <span>{flight.cabin_baggage}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Luggage size={13} className="text-zinc-400" />
                        <span>{flight.checkin_baggage}</span>
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">{flight.features[0]}</span>
                    </div>

                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                      Only {flight.seats_left} seats left at this fare
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* POPULAR FLIGHT ROUTES BANNER */}
        <div className="mt-12 bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-lg font-black text-zinc-900 mb-1 flex items-center gap-2">
            <Sparkles size={18} className="text-[#f76e28]" />
            <span>Popular Domestic Air Routes with Lowest Fare Guarantee</span>
          </h3>
          <p className="text-xs text-zinc-500 mb-6">
            Compare nonstop flights across India's top airlines with verified baggage allowances and flexible rescheduling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_FLIGHT_ROUTES.map((route, i) => (
              <div 
                key={i} 
                onClick={() => {
                  const fCode = route.from.match(/\(([^)]+)\)/)?.[1] || 'CJB';
                  const tCode = route.to.match(/\(([^)]+)\)/)?.[1] || 'MAA';
                  setFromCode(fCode);
                  setToCode(tCode);
                }}
                className="p-4 rounded-xl border border-zinc-200 hover:border-[#f76e28] bg-zinc-50/70 hover:bg-white transition-all cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#f76e28] bg-orange-50 px-2 py-0.5 rounded">
                    {route.tag}
                  </span>
                  <h4 className="text-sm font-black text-zinc-900 mt-2">
                    {route.from} ➔ {route.to}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{route.airline} • {route.time}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 font-bold block">From</span>
                  <span className="text-base font-black text-zinc-900 group-hover:text-[#f76e28] transition-colors">
                    {formatLocalPrice(route.fare)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FLIGHT PASSENGER BOOKING MODAL                        */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedFlightForBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-zinc-950 text-white p-5 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center font-black">
                    <Plane size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white leading-tight">
                      {selectedFlightForBooking.airline} - {selectedFlightForBooking.flight_number}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {selectedFlightForBooking.from_code} ➔ {selectedFlightForBooking.to_code} • {cabinClass} Class
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFlightForBooking(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleConfirmFlightBooking} className="p-6 space-y-4 text-zinc-800">
                
                {/* Passenger Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      First & Middle Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passengerFirstName}
                      onChange={(e) => setPassengerFirstName(e.target.value)}
                      placeholder="As on Passport / Govt ID"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passengerLastName}
                      onChange={(e) => setPassengerLastName(e.target.value)}
                      placeholder="Family name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      placeholder="e-ticket will be sent here"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Seat & Meal Preference */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Seat Preference</label>
                    <select
                      value={seatPref}
                      onChange={(e) => setSeatPref(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none bg-white cursor-pointer"
                    >
                      <option value="Window">Window Seat</option>
                      <option value="Aisle">Aisle Seat</option>
                      <option value="Extra Legroom">Extra Legroom (Complimentary)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Meal Preference</label>
                    <select
                      value={mealPref}
                      onChange={(e) => setMealPref(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none bg-white cursor-pointer"
                    >
                      <option value="Vegetarian">Vegetarian Gourmet Meal</option>
                      <option value="Non-Vegetarian">Non-Vegetarian Meal</option>
                      <option value="Fruit Platter">Fruit Platter</option>
                    </select>
                  </div>
                </div>

                {/* Fare Summary & Confirmation */}
                <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total Fare ({passengers} {passengers === 1 ? 'Pax' : 'Pax'})</span>
                    <span className="text-xl font-black text-zinc-900 leading-none">
                      {formatLocalPrice(selectedFlightForBooking.price * passengers)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Instant E-Ticket</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 4. SUCCESSFUL FLIGHT BOOKING MODAL                       */}
      {/* ======================================================== */}
      <AnimatePresence>
        {bookingSuccessModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-zinc-200"
            >
              <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-200">
                <CheckCircle2 size={36} />
              </div>
              
              <span className="text-[10px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200">
                FLIGHT E-TICKET ISSUED
              </span>
              
              <h3 className="text-xl font-black text-zinc-900 mt-2 mb-1">
                Have a Safe Flight with GoMo Deals!
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                Your flight has been booked and confirmed. Digital boarding pass is ready.
              </p>

              {/* Ticket Details Box */}
              <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                  <span className="text-zinc-500 font-medium">Airline PNR:</span>
                  <span className="font-black text-[#f76e28]">{bookingSuccessModal.pnr}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                  <span className="text-zinc-500 font-medium">Flight:</span>
                  <span className="font-bold text-zinc-900">{bookingSuccessModal.title}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                  <span className="text-zinc-500 font-medium">Route:</span>
                  <span className="font-bold text-zinc-900">{bookingSuccessModal.theatre}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-500 font-medium">Total Paid:</span>
                  <span className="font-black text-zinc-900">{formatLocalPrice(bookingSuccessModal.total_amount)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setBookingSuccessModal(null);
                    navigate('/tickets/my-tickets');
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  View My Tickets
                </button>
                <button
                  onClick={() => setBookingSuccessModal(null)}
                  className="px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

