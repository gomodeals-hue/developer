import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Bus, MapPin, Calendar, Clock, Filter, ArrowUpDown, 
  ShieldCheck, Star, ChevronDown, ChevronUp, AlertCircle, 
  RotateCcw, Check, Sparkles, Award, ArrowRight, Info, Eye
} from 'lucide-react';
import { busService } from '../../../services/busService';
import { useCurrency } from '../../../context/CurrencyContext';
import { useToast } from '../../../context/ToastContext';

export default function BusResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();

  const fromCity = searchParams.get('from') || 'Coimbatore';
  const toCity = searchParams.get('to') || 'Chennai';
  const travelDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const passengers = searchParams.get('passengers') || '1';

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [sortBy, setSortBy] = useState('price_asc'); // 'price_asc' | 'price_desc' | 'departure' | 'duration' | 'rating'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'sleeper' | 'seater'
  const [filterAc, setFilterAc] = useState('all'); // 'all' | 'ac' | 'non_ac'
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState([]); // 'morning', 'afternoon', 'evening', 'night'
  const [expandedTripId, setExpandedTripId] = useState(null);

  useEffect(() => {
    setLoading(true);
    busService.searchTrips({
      from: fromCity,
      to: toCity,
      date: travelDate,
      sort_by: sortBy
    }).then(res => {
      if (res && res.trips) {
        setTrips(res.trips);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [fromCity, toCity, travelDate, sortBy]);

  // Operator list for filter checkbox
  const operators = Array.from(new Set(trips.map(t => t.operator_name)));

  // Filter logic
  const filteredTrips = trips.filter(trip => {
    if (filterType !== 'all' && trip.category !== filterType) return false;
    if (filterAc === 'ac' && !trip.is_ac) return false;
    if (filterAc === 'non_ac' && trip.is_ac) return false;
    if (selectedOperators.length > 0 && !selectedOperators.includes(trip.operator_name)) return false;

    if (selectedTimeOfDay.length > 0) {
      const depHour = parseInt(trip.departure_time.split(':')[0], 10);
      const matchesTime = selectedTimeOfDay.some(timeSlot => {
        if (timeSlot === 'morning' && depHour >= 6 && depHour < 12) return true;
        if (timeSlot === 'afternoon' && depHour >= 12 && depHour < 18) return true;
        if (timeSlot === 'evening' && depHour >= 18 && depHour < 22) return true;
        if (timeSlot === 'night' && (depHour >= 22 || depHour < 6)) return true;
        return false;
      });
      if (!matchesTime) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setFilterType('all');
    setFilterAc('all');
    setSelectedOperators([]);
    setSelectedTimeOfDay([]);
    setSortBy('price_asc');
  };

  const handleOperatorToggle = (op) => {
    setSelectedOperators(prev => 
      prev.includes(op) ? prev.filter(o => o !== op) : [...prev, op]
    );
  };

  const handleTimeSlotToggle = (slot) => {
    setSelectedTimeOfDay(prev => 
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-24">
      
      {/* 1. TOP ROUTE SUMMARY HEADER */}
      <div className="bg-white border-b border-zinc-200 sticky top-18 z-20 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <Link 
              to="/tickets/buses"
              className="p-1.5 rounded-lg bg-zinc-100 hover:bg-orange-50 hover:text-[#f76e28] text-zinc-600 transition-colors"
              title="Change Search"
            >
              <Bus size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-sm sm:text-base font-black text-zinc-900">
                <span>{fromCity}</span>
                <span className="text-[#f76e28]">→</span>
                <span>{toCity}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                <span>{travelDate}</span>
                <span>•</span>
                <span>{passengers} Passenger(s)</span>
                <span>•</span>
                <span className="font-bold text-zinc-800">{filteredTrips.length} Buses Available</span>
              </div>
            </div>
          </div>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-bold hidden sm:inline flex items-center gap-1">
              <ArrowUpDown size={13} />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#f76e28] cursor-pointer"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="duration">Fastest Duration</option>
              <option value="rating">Top Rated</option>
            </select>
            <Link
              to="/tickets/buses"
              className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#f76e28] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Modify
            </Link>
          </div>

        </div>
      </div>

      {/* Demonstration Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-800">
          <span className="flex items-center gap-2">
            <Info size={15} className="text-amber-600 flex-shrink-0" />
            <span><strong>Demonstration Mode:</strong> Bus routes, operators, and ticket issuance are simulated. Real supplier credentials are required for production.</span>
          </span>
          <span className="hidden md:inline font-mono font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
            DEMO DATA
          </span>
        </div>
      </div>

      {/* 2. MAIN RESULTS LAYOUT (FILTERS SIDEBAR + TRIP CARDS) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT FILTERS SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <span className="font-black text-sm uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                  <Filter size={15} className="text-[#f76e28]" />
                  <span>Filters</span>
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-zinc-400 hover:text-[#f76e28] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              </div>

              {/* BUS TYPE (SEATER / SLEEPER) */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-zinc-700 block mb-2.5">
                  Bus Category
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-zinc-100 p-1 rounded-xl text-xs font-bold text-center">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                      filterType === 'all' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('sleeper')}
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                      filterType === 'sleeper' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    Sleeper
                  </button>
                  <button
                    onClick={() => setFilterType('seater')}
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                      filterType === 'seater' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    Seater
                  </button>
                </div>
              </div>

              {/* AIR CONDITIONING */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-zinc-700 block mb-2.5">
                  AC / Non-AC
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <button
                    onClick={() => setFilterAc(filterAc === 'ac' ? 'all' : 'ac')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      filterAc === 'ac' 
                        ? 'border-[#f76e28] bg-orange-50 text-[#f76e28] font-bold' 
                        : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                    }`}
                  >
                    AC Buses
                  </button>
                  <button
                    onClick={() => setFilterAc(filterAc === 'non_ac' ? 'all' : 'non_ac')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      filterAc === 'non_ac' 
                        ? 'border-[#f76e28] bg-orange-50 text-[#f76e28] font-bold' 
                        : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                    }`}
                  >
                    Non-AC
                  </button>
                </div>
              </div>

              {/* DEPARTURE TIME OF DAY */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-zinc-700 block mb-2.5">
                  Departure Time
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'morning', label: 'Morning', sub: '6am - 12pm' },
                    { id: 'afternoon', label: 'Afternoon', sub: '12pm - 6pm' },
                    { id: 'evening', label: 'Evening', sub: '6pm - 10pm' },
                    { id: 'night', label: 'Night', sub: '10pm - 6am' }
                  ].map(slot => {
                    const active = selectedTimeOfDay.includes(slot.id);
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSlotToggle(slot.id)}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          active 
                            ? 'border-[#f76e28] bg-orange-50 text-[#f76e28] font-bold' 
                            : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                        }`}
                      >
                        <span className="block font-bold text-[11px]">{slot.label}</span>
                        <span className="text-[10px] text-zinc-400 block">{slot.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* OPERATORS CHECKBOXES */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-zinc-700 block mb-2.5">
                  Bus Operators
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  {operators.map(op => {
                    const checked = selectedOperators.includes(op);
                    return (
                      <label 
                        key={op} 
                        className="flex items-center justify-between text-xs text-zinc-700 hover:text-zinc-900 cursor-pointer p-1 rounded hover:bg-zinc-50"
                      >
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={checked}
                            onChange={() => handleOperatorToggle(op)}
                            className="accent-[#f76e28] rounded cursor-pointer"
                          />
                          <span>{op}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT BUS TRIPS LIST */}
          <div className="lg:col-span-9 space-y-4">
            
            {loading ? (
              <div className="bg-white rounded-2xl p-12 border border-zinc-200 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f76e28] mx-auto mb-3"></div>
                <p className="text-sm font-bold text-zinc-700">Finding available buses for {fromCity} to {toCity}...</p>
              </div>
            ) : filteredTrips.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-zinc-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-[#f76e28] flex items-center justify-center mx-auto text-2xl font-bold">
                  <Bus size={32} />
                </div>
                <h3 className="text-lg font-black text-zinc-900">No Buses Found For Given Filters</h3>
                <p className="text-xs text-zinc-500 max-w-md mx-auto">
                  Try clearing active filters or selecting an alternative travel date.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#f76e28] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-[#e05b16] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredTrips.map(trip => {
                const isExpanded = expandedTripId === trip.id;
                return (
                  <div 
                    key={trip.id}
                    className="bg-white rounded-2xl border border-zinc-200/90 hover:border-orange-300/80 shadow-2xs hover:shadow-lg anim-hover-lift transition-all overflow-hidden"
                  >
                    <div className="p-5 sm:p-6">
                      
                      {/* Top Row: Operator Info & Pricing */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-base sm:text-lg font-black text-zinc-900">
                              {trip.operator_name}
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black">
                              <Star size={10} className="fill-emerald-600 text-emerald-600" />
                              <span>{trip.rating}</span>
                              <span className="text-emerald-500 font-normal">({trip.total_reviews})</span>
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                            {trip.bus_type} • {trip.bus_service_number}
                          </p>
                        </div>

                        {/* Price & Seats Available */}
                        <div className="sm:text-right">
                          <span className="text-[10px] text-zinc-400 uppercase font-bold block">Starting from</span>
                          <div className="flex items-baseline sm:justify-end gap-1">
                            <span className="text-xl sm:text-2xl font-black text-zinc-900">
                              {formatLocalPrice(trip.base_fare)}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-normal">/ seat</span>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                            {trip.available_seats} Seats Left
                          </span>
                        </div>
                      </div>

                      {/* Middle Row: Departure, Duration, Arrival */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-5 items-center">
                        
                        {/* Departure */}
                        <div>
                          <span className="text-xl sm:text-2xl font-black text-zinc-900">
                            {trip.departure_time}
                          </span>
                          <span className="text-xs font-bold text-zinc-700 block mt-0.5 truncate">
                            {trip.from_city}
                          </span>
                          <span className="text-[10px] text-zinc-400 block truncate">
                            {trip.boarding_points[0]?.name || 'Main Stand'}
                          </span>
                        </div>

                        {/* Duration Line */}
                        <div className="text-center">
                          <span className="text-xs font-bold text-zinc-500 block mb-1">
                            {trip.duration}
                          </span>
                          <div className="relative flex items-center justify-center">
                            <div className="w-full h-0.5 bg-zinc-200"></div>
                            <Bus size={14} className="absolute text-[#f76e28] bg-white px-0.5" />
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Direct Trip</span>
                        </div>

                        {/* Arrival */}
                        <div className="text-right sm:text-left sm:pl-4">
                          <span className="text-xl sm:text-2xl font-black text-zinc-900">
                            {trip.arrival_time}
                          </span>
                          <span className="text-xs font-bold text-zinc-700 block mt-0.5 truncate">
                            {trip.to_city}
                          </span>
                          <span className="text-[10px] text-zinc-400 block truncate">
                            {trip.dropping_points[0]?.name || 'Central Drop'}
                          </span>
                        </div>

                        {/* CTA Button */}
                        <div className="col-span-3 sm:col-span-1 text-right mt-2 sm:mt-0 flex flex-col gap-2">
                          <button
                            onClick={() => {
                              navigate(`/tickets/buses/seat-selection/${trip.id}?date=${travelDate}&passengers=${passengers}`);
                            }}
                            className="w-full py-3 px-4 rounded-xl bg-[#f76e28] hover:bg-[#de5713] active:scale-97 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer anim-click-press"
                          >
                            <span>Select Seats</span>
                            <ArrowRight size={14} />
                          </button>

                          <Link
                            to={`/tickets/buses/details/${trip.id}?date=${travelDate}&passengers=${passengers}`}
                            className="w-full py-1.5 px-2 rounded-lg bg-orange-50/70 hover:bg-orange-100 text-[#f76e28] font-bold text-[11px] text-center transition-all flex items-center justify-center gap-1 anim-click-press"
                          >
                            <Eye size={12} />
                            <span>View Bus Showcase</span>
                          </Link>
                        </div>

                      </div>

                      {/* Bottom Amenities Badges & Details Toggle */}
                      <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {trip.amenities?.slice(0, 4).map((amenity, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[10px] font-semibold"
                            >
                              {amenity}
                            </span>
                          ))}
                          {trip.amenities?.length > 4 && (
                            <span className="text-[10px] text-zinc-400 font-bold">
                              +{trip.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            to={`/tickets/buses/details/${trip.id}?date=${travelDate}&passengers=${passengers}`}
                            className="text-xs font-bold text-[#f76e28] hover:text-[#de5713] flex items-center gap-1 transition-colors"
                          >
                            <Bus size={13} />
                            <span>Vehicle Specs</span>
                          </Link>

                          <button
                            onClick={() => setExpandedTripId(isExpanded ? null : trip.id)}
                            className="text-xs font-bold text-zinc-500 hover:text-[#f76e28] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>{isExpanded ? 'Hide Details' : 'Trip Details & Policy'}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* EXPANDABLE TRIP DETAILS & CANCELLATION POLICY */}
                    {isExpanded && (
                      <div className="bg-zinc-50 p-5 sm:p-6 border-t border-zinc-200 text-xs text-zinc-700 space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Boarding Points */}
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2">
                              Boarding Points
                            </h4>
                            <ul className="space-y-1.5 text-zinc-600">
                              {trip.boarding_points.map(bp => (
                                <li key={bp.id} className="flex items-start justify-between">
                                  <span>{bp.name}</span>
                                  <span className="font-bold text-zinc-900">{bp.time}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Dropping Points */}
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2">
                              Dropping Points
                            </h4>
                            <ul className="space-y-1.5 text-zinc-600">
                              {trip.dropping_points.map(dp => (
                                <li key={dp.id} className="flex items-start justify-between">
                                  <span>{dp.name}</span>
                                  <span className="font-bold text-zinc-900">{dp.time}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Cancellation Policy */}
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2">
                              Cancellation Policy
                            </h4>
                            <ul className="space-y-1.5 text-zinc-600">
                              {trip.cancellation_policy.map((pol, idx) => (
                                <li key={idx} className="flex items-center justify-between">
                                  <span>{pol.time_limit}</span>
                                  <span className={`font-bold ${pol.refund_percentage > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {pol.refund_percentage}% Refund
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                );
              })
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
