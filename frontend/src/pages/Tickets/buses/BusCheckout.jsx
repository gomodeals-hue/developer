import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Bus, Clock, MapPin, Calendar, Users, ShieldCheck, Tag, 
  CreditCard, Smartphone, Building, Wallet, Check, AlertCircle, 
  ArrowLeft, Lock, Loader2, Sparkles, X, ChevronRight, Info
} from 'lucide-react';
import { busService } from '../../../services/busService';
import { useCurrency } from '../../../context/CurrencyContext';
import { useToast } from '../../../context/ToastContext';

export default function BusCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();

  const checkoutData = location.state;

  // 10-minute hold countdown timer (600s)
  const [timeLeft, setTimeLeft] = useState(600);
  const [isHoldActive, setIsHoldActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // User SSO
  const ssoUser = JSON.parse(localStorage.getItem('tb_user') || localStorage.getItem('sso_user') || '{}');

  // Contact / Lead Passenger
  const [leadPassenger, setLeadPassenger] = useState({
    name: ssoUser.full_name || '',
    phone: '',
    email: ssoUser.email || ''
  });

  // Individual passengers mapping per seat
  const [passengersList, setPassengersList] = useState([]);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [upiId, setUpiId] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  useEffect(() => {
    if (!checkoutData || !checkoutData.selectedSeats || checkoutData.selectedSeats.length === 0) {
      showToast('No active seat selection found. Redirecting to bus search.', 'info');
      navigate('/tickets/buses', { replace: true });
      return;
    }

    // Initialize individual passengers array matching selected seats
    const initialPassengers = checkoutData.selectedSeats.map((seat, idx) => ({
      seat_number: seat.seat_number,
      name: idx === 0 ? (ssoUser.full_name || '') : '',
      age: '',
      gender: 'Male'
    }));
    setPassengersList(initialPassengers);

    // Lock seats on backend via temporary hold
    const seatNumbers = checkoutData.selectedSeats.map(s => s.seat_number);
    busService.holdSeats(checkoutData.trip.id, seatNumbers, ssoUser.email || 'guest@gomodeals.com');

  }, [checkoutData, navigate, ssoUser.email, ssoUser.full_name, showToast]);

  // Hold Countdown Timer
  useEffect(() => {
    if (!checkoutData) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsHoldActive(false);
          showToast('Seat hold period expired. Please select your seats again.', 'error');
          navigate(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [checkoutData, navigate, showToast]);

  if (!checkoutData) return null;

  const { trip, selectedSeats, boardingPoint, droppingPoint, travelDate, subtotal } = checkoutData;

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const code = couponCode.trim().toUpperCase();
    if (code === 'BUSGOMO') {
      const disc = Math.min(100, subtotal * 0.2);
      setDiscountAmount(disc);
      setAppliedCoupon({ code, amount: disc, message: 'Promo BUSGOMO applied: Flat ₹100 OFF!' });
      showToast('Promo code applied successfully!', 'success');
    } else if (code === 'GOMO10') {
      const disc = subtotal * 0.1;
      setDiscountAmount(disc);
      setAppliedCoupon({ code, amount: disc, message: 'Promo GOMO10 applied: 10% discount!' });
      showToast('10% discount applied!', 'success');
    } else {
      showToast('Invalid or expired promotional code.', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengersList];
    updated[index][field] = value;
    setPassengersList(updated);
  };

  // Authoritative payable amount calculation
  const platformFee = 30; // ₹30 platform fee per specification
  const totalPayable = Math.max(0, subtotal + platformFee - discountAmount);

  const handleConfirmPayment = async () => {
    if (!leadPassenger.name.trim() || !leadPassenger.phone.trim() || !leadPassenger.email.trim()) {
      showToast('Please fill in complete contact details for the lead passenger.', 'error');
      return;
    }

    // Check individual passengers
    for (const p of passengersList) {
      if (!p.name.trim()) {
        showToast(`Please enter passenger name for seat ${p.seat_number}.`, 'error');
        return;
      }
    }

    if (!agreedTerms) {
      showToast('Please accept terms and conditions to proceed.', 'error');
      return;
    }

    setLoading(true);

    try {
      const bookingPayload = {
        trip_id: trip.id,
        user_id: ssoUser.id || 'usr_customer_1',
        lead_passenger: leadPassenger,
        passengers: passengersList,
        seats: selectedSeats.map(s => s.seat_number),
        boarding_point: boardingPoint,
        dropping_point: droppingPoint,
        journey_date: travelDate,
        total_amount: totalPayable,
        payment_method: paymentMethod,
        coupon_code: appliedCoupon?.code,
        discount_amount: discountAmount
      };

      const res = await busService.createBooking(bookingPayload);

      if (res && res.success && res.booking) {
        showToast('Bus ticket reservation confirmed successfully!', 'success');
        navigate('/tickets/buses/confirmation', {
          state: { booking: res.booking }
        });
      } else {
        showToast(res?.message || 'Booking failed. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred during booking confirmation.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-32">
      
      {/* 1. TOP HOLD TIMER BAR */}
      <div className="bg-amber-500 text-zinc-950 font-bold text-xs py-2.5 px-4 sticky top-18 z-30 shadow-xs border-b border-amber-600">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} className="animate-spin text-zinc-900" />
            <span>Seats are held for:</span>
            <span className="font-mono text-sm font-black bg-amber-600 text-white px-2 py-0.5 rounded">
              {formatTimer(timeLeft)}
            </span>
          </div>
          <span className="hidden sm:inline text-[11px] text-zinc-900">
            Complete your checkout before the timer expires to secure your seats.
          </span>
        </div>
      </div>

      {/* 2. MAIN CHECKOUT GRID */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 7 COLS: PASSENGERS & CONTACT DETAILS */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* TRIP REVIEW CARD */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Journey Review
                </span>
                <span className="text-xs font-bold text-[#f76e28] flex items-center gap-1">
                  <Bus size={14} />
                  <span>{trip.operator_name}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">Route & Date</span>
                  <span className="font-bold text-zinc-900 text-sm">
                    {trip.from_city} → {trip.to_city}
                  </span>
                  <span className="text-zinc-500 block mt-0.5">{travelDate}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">Bus Type & Seats</span>
                  <span className="font-bold text-zinc-900 text-sm">
                    {trip.bus_type}
                  </span>
                  <span className="font-bold text-[#f76e28] block mt-0.5">
                    Seats: {selectedSeats.map(s => s.seat_number).join(', ')}
                  </span>
                </div>
              </div>

              {/* Boarding and Dropping specifics */}
              <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">Boarding Point</span>
                  <span className="font-bold text-zinc-900 block">{boardingPoint?.name}</span>
                  <span className="text-[#f76e28] font-black text-xs block">{boardingPoint?.time}</span>
                  <span className="text-[10px] text-zinc-500 block truncate">{boardingPoint?.landmark}</span>
                </div>
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">Dropping Point</span>
                  <span className="font-bold text-zinc-900 block">{droppingPoint?.name}</span>
                  <span className="text-emerald-700 font-black text-xs block">{droppingPoint?.time}</span>
                  <span className="text-[10px] text-zinc-500 block truncate">{droppingPoint?.landmark}</span>
                </div>
              </div>

            </div>

            {/* LEAD PASSENGER & CONTACT FORM */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs space-y-4">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <Users size={16} className="text-[#f76e28]" />
                <span>Contact Details (For Ticket SMS & WhatsApp Delivery)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={leadPassenger.name}
                    onChange={(e) => setLeadPassenger({...leadPassenger, name: e.target.value})}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-[#f76e28] text-xs font-semibold text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={leadPassenger.phone}
                    onChange={(e) => setLeadPassenger({...leadPassenger, phone: e.target.value})}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-[#f76e28] text-xs font-semibold text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={leadPassenger.email}
                    onChange={(e) => setLeadPassenger({...leadPassenger, email: e.target.value})}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:border-[#f76e28] text-xs font-semibold text-zinc-900"
                  />
                </div>
              </div>
            </div>

            {/* PASSENGER DETAILS PER SEAT */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs space-y-4">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Passenger Information per Seat</span>
              </h3>

              <div className="space-y-3">
                {passengersList.map((passenger, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                    <div className="sm:col-span-2">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block">Seat</span>
                      <span className="font-black text-sm text-[#f76e28]">{passenger.seat_number}</span>
                    </div>
                    <div className="sm:col-span-5">
                      <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Passenger Name</label>
                      <input
                        type="text"
                        required
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 focus:outline-none focus:border-[#f76e28] text-xs font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                        placeholder="Age"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 focus:outline-none focus:border-[#f76e28] text-xs font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Gender</label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 focus:outline-none focus:border-[#f76e28] text-xs font-semibold cursor-pointer"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAYMENT METHOD SELECTOR */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs space-y-4">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <CreditCard size={16} className="text-[#f76e28]" />
                <span>Select Payment Method (Demonstration Mode)</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'card', label: 'Cards', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                  { id: 'wallet', label: 'Wallets', icon: Wallet }
                ].map(method => {
                  const IconComp = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        isSelected 
                          ? 'border-[#f76e28] bg-orange-50 text-[#f76e28] font-bold shadow-xs' 
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                      }`}
                    >
                      <IconComp size={18} />
                      <span>{method.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Simulated UPI Input */}
              {paymentMethod === 'upi' && (
                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs space-y-2">
                  <label className="block text-[11px] font-bold text-zinc-700">Enter UPI ID or Mobile Number</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="flex-1 px-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#f76e28]"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold uppercase"
                    >
                      Verify
                    </button>
                  </div>
                  <span className="text-[10px] text-zinc-400 block">Instant authorization supported for GPay, PhonePe & Paytm</span>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT 5 COLS: FARE BREAKDOWN & CHECKOUT CONFIRMATION */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* PROMO COUPON CODE */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-900 mb-3 flex items-center gap-1.5">
                <Tag size={14} className="text-[#f76e28]" />
                <span>Apply Promotional Coupon</span>
              </h3>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div>
                    <span className="font-mono font-black text-emerald-800">{appliedCoupon.code}</span>
                    <p className="text-[10px] text-emerald-600 mt-0.5">{appliedCoupon.message}</p>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-emerald-700 hover:text-rose-600 font-bold p-1 cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2 text-xs">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code (e.g. BUSGOMO)"
                    className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs font-bold uppercase focus:outline-none focus:border-[#f76e28]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f76e28] hover:bg-[#e05b16] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* AUTHORITATIVE FARE BREAKDOWN */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs space-y-4">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Fare Summary</span>
                <span className="text-[10px] text-zinc-400 font-normal">All Taxes Included</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Base Seat Fare ({selectedSeats.length} seats)</span>
                  <span className="font-bold text-zinc-900">{formatLocalPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-zinc-600">
                  <span className="flex items-center gap-1">
                    <span>Permitted Platform Fee</span>
                    <Info size={11} className="text-zinc-400" />
                  </span>
                  <span className="font-bold text-zinc-900">{formatLocalPrice(platformFee)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount ({appliedCoupon?.code})</span>
                    <span>−{formatLocalPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-4 border-t border-zinc-100 text-sm">
                  <span className="font-black text-zinc-900">Final Total Payable</span>
                  <span className="font-black text-2xl text-[#f76e28]">
                    {formatLocalPrice(totalPayable)}
                  </span>
                </div>
              </div>

              {/* Terms Acceptance Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-zinc-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="accent-[#f76e28] mt-0.5 rounded cursor-pointer"
                  />
                  <span className="text-[11px] leading-snug">
                    I agree to the <Link to="/tickets" className="text-[#f76e28] underline">cancellation policy</Link>, passenger terms, and acknowledge this is a demonstration booking.
                  </span>
                </label>
              </div>

              {/* Pay and Confirm CTA */}
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={loading || !isHoldActive}
                className="w-full py-4 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] disabled:bg-zinc-300 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Confirming Reservation...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Pay {formatLocalPrice(totalPayable)} & Confirm</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-zinc-400 text-center flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>256-Bit Encrypted Simulated Checkout • Demo Ticket</span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
