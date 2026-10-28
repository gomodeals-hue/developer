import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Bus, ArrowLeft, Clock, MapPin, Check, ShieldCheck, 
  AlertCircle, Sparkles, ArrowRight, UserCheck, Armchair, Info
} from 'lucide-react';
import { busService } from '../../../services/busService';
import { useCurrency } from '../../../context/CurrencyContext';
import { useToast } from '../../../context/ToastContext';

export default function BusSeatSelection() {
  const { tripId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();

  const travelDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const maxSeats = parseInt(searchParams.get('passengers') || '6', 10);

  const [trip, setTrip] = useState(null);
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeDeck, setActiveDeck] = useState('lower'); // 'lower' | 'upper'

  // Boarding & Dropping Points
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null);

  useEffect(() => {
    setLoading(true);
    busService.getTripSeats(tripId).then(res => {
      if (res && res.trip) {
        setTrip(res.trip);
        setLayout(res.layout);
        if (res.boarding_points && res.boarding_points.length > 0) {
          setSelectedBoardingPoint(res.boarding_points[0]);
        }
        if (res.dropping_points && res.dropping_points.length > 0) {
          setSelectedDroppingPoint(res.dropping_points[0]);
        }
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [tripId]);

  const handleSeatClick = (seat) => {
    if (seat.is_booked || seat.is_held) return;

    setSelectedSeats(prev => {
      const exists = prev.find(s => s.seat_number === seat.seat_number);
      if (exists) {
        return prev.filter(s => s.seat_number !== seat.seat_number);
      }
      if (prev.length >= 6) {
        showToast('Maximum 6 seats can be selected per booking.', 'info');
        return prev;
      }
      return [...prev, seat];
    });
  };

  const calculateSubtotal = () => {
    return selectedSeats.reduce((sum, s) => sum + (s.price || trip?.base_fare || 850), 0);
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      showToast('Please select at least one seat/berth to proceed.', 'error');
      return;
    }

    if (!selectedBoardingPoint || !selectedDroppingPoint) {
      showToast('Please select both boarding and dropping points.', 'error');
      return;
    }

    // Navigate to BusCheckout with booking draft state
    navigate('/tickets/buses/checkout', {
      state: {
        trip,
        selectedSeats,
        boardingPoint: selectedBoardingPoint,
        droppingPoint: selectedDroppingPoint,
        travelDate,
        subtotal: calculateSubtotal()
      }
    });
  };

  if (loading) {
    return (
      <div className="bg-[#f5f5f7] min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f76e28] mx-auto mb-3"></div>
          <p className="text-sm font-bold text-zinc-700">Loading interactive bus seat map...</p>
        </div>
      </div>
    );
  }

  if (!trip || !layout) {
    return (
      <div className="bg-[#f5f5f7] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 border border-zinc-200 text-center max-w-md">
          <AlertCircle size={36} className="text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-black text-zinc-900">Trip Not Found</h3>
          <p className="text-xs text-zinc-500 mt-1 mb-4">The selected bus service schedule could not be loaded.</p>
          <Link to="/tickets/buses" className="px-4 py-2 bg-[#f76e28] text-white rounded-xl text-xs font-bold uppercase">
            Back to Bus Search
          </Link>
        </div>
      </div>
    );
  }

  const isSleeper = layout.type === 'sleeper';
  const seatsToRender = isSleeper 
    ? (activeDeck === 'lower' ? layout.lower_deck : layout.upper_deck)
    : layout.main_deck;

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-32">
      
      {/* 1. TOP BREADCRUMB & TRIP BRIEF */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-base font-black text-zinc-900">
                <span>{trip.operator_name}</span>
                <span className="text-zinc-400">•</span>
                <span>{trip.from_city} → {trip.to_city}</span>
              </div>
              <p className="text-xs text-zinc-500 font-medium">
                {trip.bus_type} • {travelDate} • Departs at {trip.departure_time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-bold">Selected:</span>
            <span className="px-2.5 py-1 rounded-full bg-orange-100 text-[#f76e28] text-xs font-black">
              {selectedSeats.length} / 6 Seats
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN SEAT SELECTION & BOARDING CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT 7 COLS: INTERACTIVE BUS SEAT LAYOUT */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs">
            
            {/* Header with Deck Selector for Sleeper Buses */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
              <div>
                <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                  <Armchair size={16} className="text-[#f76e28]" />
                  <span>Choose Your Seat or Berth</span>
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-zinc-400">Click available berths to select or unselect</span>
                  <Link
                    to={`/tickets/buses/details/${trip.id}?date=${travelDate}&passengers=${passengers}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#f76e28] hover:text-[#de5713] transition-colors"
                  >
                    <span>• View Coach Specs & Recline Anatomy →</span>
                  </Link>
                </div>
              </div>

              {isSleeper && (
                <div className="flex items-center bg-zinc-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setActiveDeck('lower')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeDeck === 'lower' 
                        ? 'bg-white text-zinc-900 shadow-2xs font-black' 
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    Lower Deck
                  </button>
                  <button
                    onClick={() => setActiveDeck('upper')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeDeck === 'upper' 
                        ? 'bg-white text-zinc-900 shadow-2xs font-black' 
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    Upper Deck
                  </button>
                </div>
              )}
            </div>

            {/* BUS SCHEMATIC CONTAINER */}
            <div className="max-w-md mx-auto bg-zinc-50 rounded-3xl p-6 border-2 border-dashed border-zinc-300 relative shadow-inner">
              
              {/* Front of Bus (Steering Wheel / Driver) */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  {isSleeper ? `${activeDeck.toUpperCase()} DECK` : 'MAIN CABIN'}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-200 text-zinc-600 text-[10px] font-bold">
                  <span>DRIVER</span>
                  <span className="text-xs">⎈</span>
                </div>
              </div>

              {/* SEAT GRID LAYOUT */}
              {isSleeper ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(rowNum => {
                    const rowSeats = seatsToRender.filter(s => s.row === rowNum);
                    const singleBerth = rowSeats.find(s => s.type === 'sleeper_single');
                    const doubleBerths = rowSeats.filter(s => s.type === 'sleeper_double');

                    return (
                      <div key={rowNum} className="flex items-center justify-between gap-6">
                        {/* Single Window Berth (Left) */}
                        {singleBerth && (
                          <button
                            onClick={() => handleSeatClick(singleBerth)}
                            disabled={singleBerth.is_booked || singleBerth.is_held}
                            className={`w-16 h-24 rounded-xl border-2 flex flex-col justify-between p-2 text-center anim-seat-cell transition-all cursor-pointer ${
                              selectedSeats.some(s => s.seat_number === singleBerth.seat_number)
                                ? 'bg-[#f76e28] border-[#e05b16] text-white shadow-md scale-105'
                                : singleBerth.is_booked
                                ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                : singleBerth.is_held
                                ? 'bg-amber-100 border-amber-300 text-amber-700 cursor-not-allowed'
                                : singleBerth.ladies_seat
                                ? 'bg-pink-50 border-pink-300 text-pink-700 hover:border-pink-400'
                                : 'bg-white border-zinc-300 hover:border-[#f76e28] text-zinc-800'
                            }`}
                          >
                            <span className="text-[9px] font-bold uppercase block">Pillow</span>
                            <span className="font-black text-xs">{singleBerth.seat_number}</span>
                            <span className="text-[9px] font-semibold block">{formatLocalPrice(singleBerth.price)}</span>
                          </button>
                        )}

                        {/* Aisle Spacer */}
                        <div className="flex-1 text-center">
                          <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
                            AISLE
                          </span>
                        </div>

                        {/* Double Berths (Right) */}
                        <div className="flex items-center gap-2">
                          {doubleBerths.map(dBerth => {
                            const isSelected = selectedSeats.some(s => s.seat_number === dBerth.seat_number);
                            return (
                              <button
                                key={dBerth.seat_number}
                                onClick={() => handleSeatClick(dBerth)}
                                disabled={dBerth.is_booked || dBerth.is_held}
                                className={`w-16 h-24 rounded-xl border-2 flex flex-col justify-between p-2 text-center anim-seat-cell transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#f76e28] border-[#e05b16] text-white shadow-md scale-105'
                                    : dBerth.is_booked
                                    ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                    : dBerth.is_held
                                    ? 'bg-amber-100 border-amber-300 text-amber-700 cursor-not-allowed'
                                    : dBerth.ladies_seat
                                    ? 'bg-pink-50 border-pink-300 text-pink-700 hover:border-pink-400'
                                    : 'bg-white border-zinc-300 hover:border-[#f76e28] text-zinc-800'
                                }`}
                              >
                                <span className="text-[9px] font-bold uppercase block">Pillow</span>
                                <span className="font-black text-xs">{dBerth.seat_number}</span>
                                <span className="text-[9px] font-semibold block">{formatLocalPrice(dBerth.price)}</span>
                              </button>
                            );
                          })}
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Seater Layout 2+2 */
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(rowNum => {
                    const rowSeats = seatsToRender.filter(s => s.row === rowNum);
                    return (
                      <div key={rowNum} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {rowSeats.slice(0, 2).map(seat => {
                            const isSelected = selectedSeats.some(s => s.seat_number === seat.seat_number);
                            return (
                              <button
                                key={seat.seat_number}
                                onClick={() => handleSeatClick(seat)}
                                disabled={seat.is_booked || seat.is_held}
                                className={`w-11 h-11 rounded-lg border-2 font-bold text-xs flex items-center justify-center anim-seat-cell transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#f76e28] border-[#e05b16] text-white shadow-md scale-105'
                                    : seat.is_booked
                                    ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                    : 'bg-white border-zinc-300 hover:border-[#f76e28] text-zinc-800'
                                }`}
                              >
                                {seat.seat_number}
                              </button>
                            );
                          })}
                        </div>

                        <span className="text-[9px] font-bold text-zinc-300 uppercase">AISLE</span>

                        <div className="flex items-center gap-2">
                          {rowSeats.slice(2, 4).map(seat => {
                            const isSelected = selectedSeats.some(s => s.seat_number === seat.seat_number);
                            return (
                              <button
                                key={seat.seat_number}
                                onClick={() => handleSeatClick(seat)}
                                disabled={seat.is_booked || seat.is_held}
                                className={`w-11 h-11 rounded-lg border-2 font-bold text-xs flex items-center justify-center anim-seat-cell transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#f76e28] border-[#e05b16] text-white shadow-md scale-105'
                                    : seat.is_booked
                                    ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                    : 'bg-white border-zinc-300 hover:border-[#f76e28] text-zinc-800'
                                }`}
                              >
                                {seat.seat_number}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Rear of Bus */}
              <div className="text-center pt-4 mt-6 border-t border-zinc-200">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  REAR CABIN
                </span>
              </div>

            </div>

            {/* SEAT LEGENDS */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-zinc-100 mt-6 text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-white border border-zinc-300"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-[#f76e28] border border-[#e05b16]"></div>
                <span className="font-bold text-[#f76e28]">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-zinc-200 border border-zinc-300"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-pink-100 border border-pink-300"></div>
                <span>Ladies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300"></div>
                <span>Held</span>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: BOARDING/DROPPING & BOOKING SUMMARY */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* BOARDING POINT SELECTOR */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-900 mb-3 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#f76e28]" />
                <span>Select Boarding Point ({trip.from_city})</span>
              </h3>
              <div className="space-y-2">
                {trip.boarding_points.map(bp => {
                  const isChosen = selectedBoardingPoint?.id === bp.id;
                  return (
                    <button
                      key={bp.id}
                      onClick={() => setSelectedBoardingPoint(bp)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChosen 
                          ? 'border-[#f76e28] bg-orange-50/50 shadow-2xs' 
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-zinc-900">{bp.name}</span>
                          <span className="font-black text-xs text-[#f76e28]">{bp.time}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 block mt-0.5">{bp.landmark}</span>
                      </div>
                      {isChosen && <Check size={16} className="text-[#f76e28]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DROPPING POINT SELECTOR */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-900 mb-3 flex items-center gap-1.5">
                <MapPin size={14} className="text-emerald-600" />
                <span>Select Dropping Point ({trip.to_city})</span>
              </h3>
              <div className="space-y-2">
                {trip.dropping_points.map(dp => {
                  const isChosen = selectedDroppingPoint?.id === dp.id;
                  return (
                    <button
                      key={dp.id}
                      onClick={() => setSelectedDroppingPoint(dp)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChosen 
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-2xs' 
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-zinc-900">{dp.name}</span>
                          <span className="font-black text-xs text-emerald-700">{dp.time}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 block mt-0.5">{dp.landmark}</span>
                      </div>
                      {isChosen && <Check size={16} className="text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SELECTION SUMMARY & CHECKOUT BUTTON */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-700">
                  Selected Seats ({selectedSeats.length})
                </span>
                <span className="text-xs font-black text-[#f76e28]">
                  {selectedSeats.map(s => s.seat_number).join(', ') || 'None selected'}
                </span>
              </div>

              {/* Price Breakdown Preview */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Base Seat Fare</span>
                  <span className="font-bold">{formatLocalPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Permitted Platform Fee</span>
                  <span className="font-bold">{formatLocalPrice(30)}</span>
                </div>
                <div className="flex justify-between text-zinc-900 font-black pt-2 border-t border-zinc-100 text-sm">
                  <span>Estimated Total</span>
                  <span className="text-[#f76e28]">
                    {formatLocalPrice(calculateSubtotal() > 0 ? calculateSubtotal() + 30 : 0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                disabled={selectedSeats.length === 0}
                className="w-full py-3.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Passenger Details</span>
                <ArrowRight size={15} />
              </button>

              <div className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>10-Minute Temporary Seat Hold during Checkout</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
