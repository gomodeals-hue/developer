import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, MapPin, Calendar, Users, ArrowRightLeft, Search, 
  ShieldCheck, Sparkles, Clock, Star, Award, Tag, ChevronRight, 
  CheckCircle2, Info, Coffee, Wifi, Zap, X, Ticket, AlertCircle, FileText
} from 'lucide-react';
import { MOCK_TRAINS, saveBookingRecord } from '../../../data/mockTicketData';
import { useToast } from '../../../context/ToastContext';
import { useCurrency } from '../../../context/CurrencyContext';

const POPULAR_TRAIN_ROUTES = [
  { from: 'Coimbatore', to: 'Chennai', train: 'Vande Bharat Express', time: '5h 50m', fare: 1025, tag: 'HIGH SPEED 130 km/h' },
  { from: 'Bengaluru', to: 'Coimbatore', train: 'Vande Bharat Express', time: '6h 20m', fare: 995, tag: 'POPULAR CHOICE' },
  { from: 'Chennai', to: 'Bengaluru', train: 'Shatabdi Express', time: '4h 45m', fare: 875, tag: 'BREAKFAST INCLUDED' },
  { from: 'Delhi-NCR', to: 'Mumbai', train: 'Tejas Rajdhani Express', time: '15h 40m', fare: 2190, tag: 'LUXURY RAJDHANI' },
  { from: 'Coimbatore', to: 'Chennai', train: 'Kovai Superfast Express', time: '7h 35m', fare: 185, tag: 'POCKET FRIENDLY' }
];

const TRAIN_QUOTAS = [
  { id: 'GN', label: 'General' },
  { id: 'TQ', label: 'Tatkal' },
  { id: 'LD', label: 'Ladies' },
  { id: 'SS', label: 'Senior Citizen' }
];

export default function TrainSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const { formatLocalPrice } = useCurrency();

  const [fromCity, setFromCity] = useState(searchParams.get('from') || 'Coimbatore');
  const [toCity, setToCity] = useState(searchParams.get('to') || 'Chennai');
  const [journeyDate, setJourneyDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedQuota, setSelectedQuota] = useState('GN');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [trainTypeFilter, setTrainTypeFilter] = useState('ALL');
  
  // Booking Modal States
  const [selectedTrainForBooking, setSelectedTrainForBooking] = useState(null);
  const [selectedClassForBooking, setSelectedClassForBooking] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [passengerAge, setPassengerAge] = useState('');
  const [passengerGender, setPassengerGender] = useState('Male');
  const [berthPreference, setBerthPreference] = useState('No Preference');
  const [irctcUser, setIrctcUser] = useState('');
  const [bookingSuccessModal, setBookingSuccessModal] = useState(null);

  const handleSwapStations = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const setDateOffset = (days) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    setJourneyDate(target.toISOString().split('T')[0]);
  };

  // Filter trains
  const filteredTrains = useMemo(() => {
    return MOCK_TRAINS.filter(train => {
      const matchFrom = !fromCity || train.from_city.toLowerCase().includes(fromCity.toLowerCase()) || fromCity.toLowerCase().includes(train.from_city.toLowerCase());
      const matchTo = !toCity || train.to_city.toLowerCase().includes(toCity.toLowerCase()) || toCity.toLowerCase().includes(train.to_city.toLowerCase());
      const matchType = trainTypeFilter === 'ALL' || train.type.toLowerCase() === trainTypeFilter.toLowerCase();
      const matchClass = selectedClass === 'ALL' || train.classes.some(c => c.code === selectedClass);
      
      return matchType && matchClass && (matchFrom || matchTo);
    });
  }, [fromCity, toCity, trainTypeFilter, selectedClass]);

  const handleBookClass = (train, cls) => {
    setSelectedTrainForBooking(train);
    setSelectedClassForBooking(cls);
  };

  const handleConfirmTrainBooking = (e) => {
    e.preventDefault();
    if (!passengerName.trim()) {
      showToast('Please enter passenger full name', 'warning');
      return;
    }
    if (!passengerAge || Number(passengerAge) < 1) {
      showToast('Please enter a valid age', 'warning');
      return;
    }
    if (!irctcUser.trim()) {
      showToast('Please enter your IRCTC User ID for ticket booking', 'warning');
      return;
    }

    const pnr = `PNR${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const bookingId = `GMD-TR-${Math.floor(100000 + Math.random() * 900000)}`;

    const bookingRecord = {
      booking_id: bookingId,
      pnr,
      booking_type: 'train',
      type: 'train',
      title: `${selectedTrainForBooking.train_number} - ${selectedTrainForBooking.train_name}`,
      train_number: selectedTrainForBooking.train_number,
      train_name: selectedTrainForBooking.train_name,
      train_type: selectedTrainForBooking.type,
      theatre: `${selectedTrainForBooking.from_station} ➔ ${selectedTrainForBooking.to_station}`,
      from_station: selectedTrainForBooking.from_station,
      to_station: selectedTrainForBooking.to_station,
      booking_date: journeyDate,
      booking_time: selectedTrainForBooking.from_time,
      arrival_time: selectedTrainForBooking.to_time,
      seats: [`Coach ${selectedClassForBooking.code}-1 / Berth ${Math.floor(Math.random() * 60) + 1} (${berthPreference})`],
      seat_tier: `${selectedClassForBooking.name} (${selectedClassForBooking.code})`,
      total_amount: selectedClassForBooking.fare,
      status: 'Confirmed',
      qr_code: `GMD-IRCTC-${pnr}`,
      passenger: {
        name: passengerName,
        age: passengerAge,
        gender: passengerGender,
        berth: berthPreference,
        irctc: irctcUser
      },
      created_at: new Date().toISOString()
    };

    saveBookingRecord(bookingRecord);
    setSelectedTrainForBooking(null);
    setBookingSuccessModal(bookingRecord);
    showToast(`Train Ticket Confirmed! PNR: ${pnr}`, 'success');
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-24">
      {/* ======================================================== */}
      {/* 1. HERO TRAIN SEARCH BANNER                              */}
      {/* ======================================================== */}
      <section className="bg-gradient-to-b from-[#182030] via-[#10141f] to-zinc-950 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f76e28_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Breadcrumb & Official Partner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Link to="/tickets" className="hover:text-[#f76e28] transition-colors">Tickets Home</Link>
              <span>/</span>
              <span className="text-white font-bold">Train Ticket Booking</span>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700/80 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-zinc-300">IRCTC Authorized Partner</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[#f76e28] font-bold">Zero Gateway Charges on UPI</span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
            >
              Book <span className="text-[#f76e28]">IRCTC Train Tickets</span> Online
            </motion.h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-medium">
              Vande Bharat, Rajdhani, Shatabdi & Superfast Express trains with live seat availability & free cancellation.
            </p>
          </div>

          {/* TRAIN SEARCH FORM WIDGET */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-zinc-200 text-zinc-900 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* FROM STATION */}
              <div className="md:col-span-4 relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 hover:border-[#f76e28] transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">From Station</span>
                <div className="flex items-center gap-2">
                  <MapPin size={17} className="text-[#f76e28] shrink-0" />
                  <input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="Enter City or Station Code"
                    className="w-full bg-transparent font-black text-sm text-zinc-900 outline-none"
                  />
                </div>
              </div>

              {/* SWAP BUTTON */}
              <div className="md:col-span-1 flex items-center justify-center -my-2 md:my-0">
                <button
                  type="button"
                  onClick={handleSwapStations}
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-orange-50 hover:text-[#f76e28] border border-zinc-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:rotate-180 duration-300"
                  title="Swap Origin & Destination"
                >
                  <ArrowRightLeft size={15} />
                </button>
              </div>

              {/* TO STATION */}
              <div className="md:col-span-4 relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 hover:border-[#f76e28] transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">To Station</span>
                <div className="flex items-center gap-2">
                  <MapPin size={17} className="text-[#f76e28] shrink-0" />
                  <input
                    type="text"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="Enter City or Station Code"
                    className="w-full bg-transparent font-black text-sm text-zinc-900 outline-none"
                  />
                </div>
              </div>

              {/* DATE PICKER */}
              <div className="md:col-span-3 relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 hover:border-[#f76e28] transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">Journey Date</span>
                <div className="flex items-center gap-2">
                  <Calendar size={17} className="text-[#f76e28] shrink-0" />
                  <input
                    type="date"
                    value={journeyDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full bg-transparent font-black text-sm text-zinc-900 outline-none cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Quick Date Pills & Quota Controls */}
            <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 font-bold">Quick Dates:</span>
                <button
                  type="button"
                  onClick={() => setDateOffset(0)}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold cursor-pointer"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setDateOffset(1)}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold cursor-pointer"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setDateOffset(2)}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold cursor-pointer"
                >
                  Day After
                </button>
              </div>

              {/* Quota Pills */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-zinc-400 font-bold mr-1">Quota:</span>
                {TRAIN_QUOTAS.map(q => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setSelectedQuota(q.id)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      selectedQuota === q.id
                        ? 'bg-[#f76e28] text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. RESULTS FILTER & TRAIN LISTING SECTION                */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Results Header with Class & Type Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Trains between <span className="text-[#f76e28]">{fromCity || 'All'}</span> and <span className="text-[#f76e28]">{toCity || 'All'}</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Found {filteredTrains.length} direct trains matching your journey preferences on {journeyDate}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 mr-1">Train Type:</span>
            {['ALL', 'Vande Bharat', 'Shatabdi', 'Rajdhani', 'Superfast'].map(t => (
              <button
                key={t}
                onClick={() => setTrainTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  trainTypeFilter === t
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* TRAIN CARDS LIST */}
        <div className="space-y-4">
          {filteredTrains.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-xl mx-auto shadow-sm">
              <Train size={42} className="mx-auto text-zinc-300 mb-3" />
              <h3 className="text-base font-black text-zinc-900 mb-1">No Direct Trains Found</h3>
              <p className="text-xs text-zinc-500 mb-6">
                Try searching between major hubs like Coimbatore, Chennai, Bengaluru, Delhi or Mumbai.
              </p>
              <button
                onClick={() => {
                  setFromCity('Coimbatore');
                  setToCity('Chennai');
                  setTrainTypeFilter('ALL');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                View Coimbatore ➔ Chennai Trains
              </button>
            </div>
          ) : (
            filteredTrains.map((train) => {
              const isVandeBharat = train.type === 'Vande Bharat';
              const isRajdhani = train.type === 'Rajdhani';

              return (
                <motion.div
                  key={train.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-lg transition-all p-5 sm:p-6"
                >
                  {/* Top Bar: Train Name & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shrink-0 ${
                        isVandeBharat ? 'bg-gradient-to-tr from-blue-700 to-orange-500' : isRajdhani ? 'bg-red-700' : 'bg-zinc-800'
                      }`}>
                        <Train size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                            {train.train_name}
                          </h3>
                          <span className="text-xs font-bold text-zinc-400">#{train.train_number}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-500">
                          <span className="font-semibold text-zinc-700">{train.departure_days.join(', ')}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Zap size={12} fill="currentColor" />
                            {train.speed}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-50 border border-orange-200 text-[#f76e28]">
                        {train.type}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-zinc-500 bg-zinc-100">
                        {train.pantry}
                      </span>
                    </div>
                  </div>

                  {/* Middle Bar: Timings & Station Path */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 items-center border-b border-zinc-100">
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-zinc-900">{train.from_time}</span>
                      <p className="text-xs font-bold text-zinc-700 mt-0.5">{train.from_station}</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs font-black text-zinc-500">{train.duration}</span>
                      <div className="w-full max-w-[160px] flex items-center gap-1 my-1">
                        <div className="w-2 h-2 rounded-full bg-[#f76e28]"></div>
                        <div className="h-0.5 bg-zinc-300 flex-1"></div>
                        <Train size={14} className="text-[#f76e28]" />
                        <div className="h-0.5 bg-zinc-300 flex-1"></div>
                        <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">On-Time Performance 98%</span>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-xl sm:text-2xl font-black text-zinc-900">{train.to_time}</span>
                      <p className="text-xs font-bold text-zinc-700 mt-0.5">{train.to_station}</p>
                    </div>
                  </div>

                  {/* Classes & Seat Availability Pills */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {train.classes.map((cls) => {
                        const isAvail = cls.statusType === 'avail';
                        const isRac = cls.statusType === 'rac';

                        return (
                          <div
                            key={cls.code}
                            onClick={() => handleBookClass(train, cls)}
                            className="bg-zinc-50 hover:bg-orange-50/60 border border-zinc-200 hover:border-[#f76e28] rounded-xl p-3 cursor-pointer transition-all min-w-[140px] shadow-2xs group"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black text-zinc-900">{cls.name}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-200 text-zinc-700">
                                {cls.code}
                              </span>
                            </div>
                            <div className="flex items-baseline justify-between mt-2">
                              <span className={`text-xs font-bold ${isAvail ? 'text-emerald-600' : isRac ? 'text-amber-600' : 'text-rose-500'}`}>
                                {cls.status}
                              </span>
                              <span className="text-sm font-black text-zinc-900">
                                {formatLocalPrice(cls.fare)}
                              </span>
                            </div>
                            <div className="mt-1 text-[9px] font-bold text-[#f76e28] opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to Book ➔
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handleBookClass(train, train.classes[0])}
                      className="px-6 py-2.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 ml-auto"
                    >
                      <span>Book from {formatLocalPrice(train.classes[0].fare)}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* POPULAR ROUTES BANNER */}
        <div className="mt-12 bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-lg font-black text-zinc-900 mb-1 flex items-center gap-2">
            <Sparkles size={18} className="text-[#f76e28]" />
            <span>Popular Vande Bharat & Express Routes</span>
          </h3>
          <p className="text-xs text-zinc-500 mb-6">
            Book India's fastest semi-high speed trains with panoramic windows, ergonomic executive seating and on-board dining.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_TRAIN_ROUTES.map((route, i) => (
              <div 
                key={i} 
                onClick={() => {
                  setFromCity(route.from);
                  setToCity(route.to);
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
                  <p className="text-xs text-zinc-500 mt-0.5">{route.train} • {route.time}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 font-bold block">Fares From</span>
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
      {/* 3. TRAIN PASSENGER BOOKING MODAL                         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedTrainForBooking && selectedClassForBooking && (
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
                  <div className="w-10 h-10 rounded-xl bg-[#f76e28]/20 border border-[#f76e28]/40 text-[#f76e28] flex items-center justify-center font-black">
                    <Train size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white leading-tight">
                      {selectedTrainForBooking.train_name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      #{selectedTrainForBooking.train_number} • {selectedClassForBooking.name} ({selectedClassForBooking.code})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTrainForBooking(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleConfirmTrainBooking} className="p-6 space-y-4 text-zinc-800">
                
                {/* IRCTC User ID */}
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    IRCTC User ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={irctcUser}
                    onChange={(e) => setIrctcUser(e.target.value)}
                    placeholder="e.g. gomotravels_user"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] focus:ring-1 focus:ring-[#f76e28] text-xs font-bold outline-none"
                  />
                  <span className="text-[10px] text-zinc-400 mt-1 block">Password will be verified on IRCTC redirect gateway</span>
                </div>

                {/* Passenger Name & Age */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Passenger Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="As on Aadhaar / Govt ID"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] focus:ring-1 focus:ring-[#f76e28] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      value={passengerAge}
                      onChange={(e) => setPassengerAge(e.target.value)}
                      placeholder="e.g. 28"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] focus:ring-1 focus:ring-[#f76e28] text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Gender & Berth Preference */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Gender</label>
                    <select
                      value={passengerGender}
                      onChange={(e) => setPassengerGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none bg-white cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Berth Preference</label>
                    <select
                      value={berthPreference}
                      onChange={(e) => setBerthPreference(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#f76e28] text-xs font-bold outline-none bg-white cursor-pointer"
                    >
                      <option value="No Preference">No Preference</option>
                      <option value="Window Seat">Window Seat</option>
                      <option value="Aisle Seat">Aisle Seat</option>
                      <option value="Lower Berth">Lower Berth</option>
                      <option value="Side Lower">Side Lower</option>
                    </select>
                  </div>
                </div>

                {/* Fare Summary & Confirmation */}
                <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total Payable</span>
                    <span className="text-xl font-black text-zinc-900 leading-none">
                      {formatLocalPrice(selectedClassForBooking.fare)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Confirm & Pay</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 4. SUCCESSFUL BOOKING CONFIRMATION MODAL                 */}
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
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 size={36} />
              </div>
              
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                IRCTC TICKET CONFIRMED
              </span>
              
              <h3 className="text-xl font-black text-zinc-900 mt-2 mb-1">
                Happy Journey with GoMo Tickets!
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                Your train ticket has been booked successfully and confirmed with Indian Railways.
              </p>

              {/* Ticket Details Box */}
              <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                  <span className="text-zinc-500 font-medium">PNR Number:</span>
                  <span className="font-black text-[#f76e28]">{bookingSuccessModal.pnr}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                  <span className="text-zinc-500 font-medium">Train:</span>
                  <span className="font-bold text-zinc-900">{bookingSuccessModal.title}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                  <span className="text-zinc-500 font-medium">Seat / Berth:</span>
                  <span className="font-bold text-zinc-900">{bookingSuccessModal.seats[0]}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-500 font-medium">Amount Paid:</span>
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

