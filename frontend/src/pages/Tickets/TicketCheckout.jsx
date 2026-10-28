import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Ticket, MapPin, Calendar, CreditCard, ShieldCheck, Tag, X, 
  Loader2, AlertCircle, CheckCircle2, Clock, Armchair, ChevronRight, 
  ArrowLeft, Smartphone, Building, Wallet, Check, Sparkles 
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';
import { API } from '../../config/ticketApi';
import { MOCK_COUPONS, saveBookingRecord } from '../../data/mockTicketData';

export default function TicketCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatLocalPrice, getLocalPrices, currency, EXCHANGE_RATES } = useCurrency();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes hold timer
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  // Customer Contact Information
  const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));
  const [contactInfo, setContactInfo] = useState({
    name: ssoUser?.full_name || '',
    email: ssoUser?.email || '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [upiApp, setUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  
  const bookingData = location.state;

  useEffect(() => {
    let token = localStorage.getItem('tb_token');
    if (!token) {
      token = 'tok_guest_' + Date.now();
      localStorage.setItem('tb_token', token);
    }

    if (!bookingData) {
      showToast("No active booking found. Redirecting to Tickets Home.", "info");
      navigate('/tickets', { replace: true });
    }
  }, [bookingData, navigate, showToast]);

  // Seat hold timer countdown
  useEffect(() => {
    if (!bookingData) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          showToast("Seat hold expired. Please reselect your seats.", "error");
          navigate(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [bookingData, navigate, showToast]);

  if (!bookingData) return null;

  const { showtime, selectedSeats = [], date, time, addons = [], isEvent = false, event } = bookingData;
  const basePrices = getLocalPrices();
  const rate = EXCHANGE_RATES && EXCHANGE_RATES[currency] ? EXCHANGE_RATES[currency].rate : 1;
  const customBasePriceUSD = showtime.base_price ? Number(showtime.base_price) : 4;
  const localBase = customBasePriceUSD * rate;

  const prices = {
    ...basePrices,
    tiers: {
      Standard: localBase,
      Premium: localBase * 1.5,
      VIP: localBase * 2.5
    }
  };

  // Calculate ticket subtotal
  let ticketsSubtotal = 0;
  if (isEvent && bookingData.total) {
    ticketsSubtotal = bookingData.total;
  } else {
    selectedSeats.forEach(seat => {
      if (seat.price) {
        ticketsSubtotal += seat.price;
      } else {
        const tier = seat.tier || 'Standard';
        ticketsSubtotal += (prices.tiers[tier] || localBase);
      }
    });
  }

  // Food & Beverage Addons
  let addonsSubtotal = 0;
  if (addons && addons.length > 0) {
    addons.forEach(a => {
      addonsSubtotal += (Number(a.price) * rate) * a.quantity;
    });
  }

  const subtotal = ticketsSubtotal + addonsSubtotal;
  let discountedSubtotal = subtotal;
  if (appliedCoupon) {
    discountedSubtotal = Math.max(0, subtotal - appliedCoupon.discount);
  }

  // Convenience fees: ₹35 per seat / ticket + 18% GST on convenience fee
  const ticketCount = selectedSeats.length || bookingData.quantity || 1;
  const convenienceFeePerTicket = currency === 'INR' ? 35 : (0.42 * rate);
  const convenienceFee = ticketCount * convenienceFeePerTicket;
  const gst = convenienceFee * 0.18;
  const totalAmount = discountedSubtotal + convenienceFee + gst;

  // Coupon handling with mock fallback
  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;

    setCouponLoading(true);
    setCouponError('');

    setTimeout(() => {
      const found = MOCK_COUPONS.find(c => c.code === code);
      if (found) {
        let discount = 0;
        if (found.discountPercent) {
          discount = (subtotal * found.discountPercent) / 100;
          if (found.maxDiscount) discount = Math.min(discount, found.maxDiscount * rate);
        } else if (found.flatDiscount) {
          discount = found.flatDiscount * rate;
        }

        if (found.minOrder && subtotal < found.minOrder * rate) {
          setCouponError(`Min order value of ${formatLocalPrice(found.minOrder)} required for this offer.`);
          setAppliedCoupon(null);
        } else {
          setAppliedCoupon({ code: found.code, discount: discount, description: found.description });
          setCouponCode(found.code);
          showToast(`Coupon ${found.code} applied successfully!`, 'success');
        }
      } else {
        setCouponError('Invalid coupon code. Try GOMO10, MOVIE20 or WELCOME50');
        setAppliedCoupon(null);
      }
      setCouponLoading(false);
    }, 300);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!contactInfo.name.trim()) errors.name = 'Full name is required';
    if (!contactInfo.email.trim() || !contactInfo.email.includes('@')) errors.email = 'Valid email address is required';
    if (!contactInfo.phone.trim() || contactInfo.phone.replace(/\D/g, '').length < 10) errors.phone = 'Valid 10-digit mobile number is required';
    if (!agreedTerms) errors.terms = 'Please accept the terms and conditions';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Mock Complete Booking Action
  const handleCompleteDemoBooking = () => {
    setError('');
    if (!validateForm()) {
      showToast('Please correct the highlighted fields before proceeding', 'warning');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const bookingId = `GMD-BMS-${Math.floor(100000 + Math.random() * 900000)}`;
      const title = bookingData.movie?.title || event?.title || 'Street Fighter (2026)';
      const theatre = showtime.theatre || 'KG Cinemas: 4K DOLBY ATMOS, Coimbatore';
      const seatLabels = isEvent 
        ? [`${bookingData.quantity}x ${bookingData.selectedTier?.name || 'General Entry'}`]
        : selectedSeats.map(s => s.id);

      const confirmedBooking = {
        booking_id: bookingId,
        title: title,
        theatre: theatre,
        booking_date: date,
        booking_time: time,
        seats: seatLabels,
        seat_tier: isEvent ? bookingData.selectedTier?.name : (selectedSeats[0]?.tier || 'Standard'),
        total_amount: totalAmount,
        status: 'Confirmed',
        customer_name: contactInfo.name,
        customer_email: contactInfo.email,
        customer_phone: contactInfo.phone,
        payment_method: paymentMethod.toUpperCase(),
        created_at: new Date().toISOString(),
        poster: bookingData.movie?.poster || event?.cover_image || '/images/action_poster_1780401266913.png',
        qr_code: `${bookingId}-${seatLabels.join('-')}`,
        type: isEvent ? 'event' : 'movie'
      };

      // Save to localStorage for My Ticket Bookings
      saveBookingRecord(confirmedBooking);

      setLoading(false);
      showToast('Booking confirmed! Generating your digital pass.', 'success');

      navigate('/tickets/success', {
        state: {
          bookingId: bookingId,
          movieTitle: title,
          theatreName: theatre,
          seats: selectedSeats,
          seatLabels: seatLabels,
          date: date,
          time: time,
          total: totalAmount,
          customer: contactInfo
        }
      });
    }, 800);
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen font-sans text-zinc-900 pb-24">
      {/* Top Breadcrumb & Hold Timer Banner */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[#f76e28] hover:underline font-bold mr-2"
            >
              <ArrowLeft size={14} /> Back to Selection
            </button>
            <span className="text-zinc-300">|</span>
            <span>Review & Checkout</span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-amber-50 text-amber-900 border border-amber-200/80 px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs">
            <Clock size={14} className="text-amber-600 animate-pulse" />
            <span>Seats held for {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Customer Details, Offers & Mock Payment */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact Information */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-zinc-200">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-5">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight">
                    1. Contact Details for Ticket Delivery
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Your digital M-Ticket and SMS booking confirmation will be sent here.
                  </p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#f76e28] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                  Instant SMS & WhatsApp
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    placeholder="e.g. Saranyan E"
                    className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 focus:bg-white text-zinc-900 focus:outline-none transition-all ${
                      formErrors.name ? 'border-rose-400 focus:border-rose-500' : 'border-zinc-300 focus:border-[#f76e28]'
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-rose-500 font-semibold mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="saranyan@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 focus:bg-white text-zinc-900 focus:outline-none transition-all ${
                      formErrors.email ? 'border-rose-400 focus:border-rose-500' : 'border-zinc-300 focus:border-[#f76e28]'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-rose-500 font-semibold mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-lg border border-r-0 border-zinc-300 bg-zinc-100 text-zinc-600 font-bold text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="98765 43210"
                      className={`flex-1 px-3.5 py-2.5 rounded-r-lg border bg-zinc-50 focus:bg-white text-zinc-900 focus:outline-none transition-all ${
                        formErrors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-zinc-300 focus:border-[#f76e28]'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="text-[11px] text-rose-500 font-semibold mt-1 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Apply Promo Codes & Bank Offers */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-zinc-200">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 mb-4">
                <Tag size={17} className="text-[#f76e28]" />
                <h3 className="text-sm sm:text-base font-black text-zinc-900">
                  2. Apply Promo Code or Bank Offer
                </h3>
              </div>

              {/* Coupon input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Enter Coupon (e.g. GOMO10, MOVIE20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={appliedCoupon || couponLoading}
                  className="flex-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 focus:border-[#f76e28] rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none"
                />
                {appliedCoupon ? (
                  <button
                    onClick={removeCoupon}
                    className="px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleApplyCoupon()}
                    disabled={!couponCode.trim() || couponLoading}
                    className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    {couponLoading ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                  </button>
                )}
              </div>

              {couponError && (
                <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mb-3">
                  <AlertCircle size={13} /> {couponError}
                </p>
              )}

              {appliedCoupon && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Coupon "{appliedCoupon.code}" Applied: {appliedCoupon.description}</span>
                  </span>
                  <span className="text-emerald-700 font-black">-{formatLocalPrice(appliedCoupon.discount)}</span>
                </div>
              )}

              {/* Quick Coupon Suggestions */}
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Popular Deals Available Today:
                </span>
                <div className="flex flex-wrap gap-2">
                  {MOCK_COUPONS.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleApplyCoupon(c.code)}
                      className="px-2.5 py-1.5 rounded-lg border border-dashed border-zinc-300 hover:border-[#f76e28] bg-zinc-50 hover:bg-orange-50/50 text-left transition-all cursor-pointer text-xs"
                    >
                      <span className="font-black text-[#f76e28] text-xs block">{c.code}</span>
                      <span className="text-[10px] text-zinc-500 font-medium">{c.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Mock Payment Method Selector */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-zinc-200">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight">
                    3. Select Payment Method (Demo Flow)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Simulate instant payment verification. No real money will be charged.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <ShieldCheck size={13} />
                  <span>256-Bit SSL Demo Gateway</span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'card', label: 'Cards', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                  { id: 'wallet', label: 'Wallets', icon: Wallet }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = paymentMethod === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setPaymentMethod(tab.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#f76e28] bg-orange-50/40 text-[#f76e28] font-bold shadow-2xs' 
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-600'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-xs">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: UPI */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
                  <span className="text-xs font-bold text-zinc-700 block">Choose your preferred UPI application:</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'gpay', name: 'Google Pay' },
                      { id: 'phonepe', name: 'PhonePe' },
                      { id: 'paytm', name: 'Paytm' }
                    ].map(app => (
                      <button
                        key={app.id}
                        onClick={() => setUpiApp(app.id)}
                        className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${
                          upiApp === app.id ? 'border-[#f76e28] bg-white text-[#f76e28] shadow-xs' : 'border-zinc-300 bg-white text-zinc-700'
                        }`}
                      >
                        {app.name}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-zinc-600 mb-1">Or Enter Any UPI ID (Demo):</label>
                    <input
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs focus:outline-none focus:border-[#f76e28]"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Credit / Debit Cards */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200/80 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-700">Card Information</span>
                    <button
                      type="button"
                      onClick={() => setCardDetails({ number: '4532 •••• •••• 8821', expiry: '12/28', cvv: '772', name: contactInfo.name || 'DEMO USER' })}
                      className="text-[11px] text-[#f76e28] font-bold hover:underline"
                    >
                      Autofill Test Card
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs focus:outline-none focus:border-[#f76e28]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="px-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs focus:outline-none focus:border-[#f76e28]"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="px-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs focus:outline-none focus:border-[#f76e28]"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200/80 text-xs">
                  <span className="font-bold text-zinc-700 block">Select Popular Bank:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Bank'].map(bank => (
                      <button
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2 rounded-lg border text-xs font-semibold text-left transition-all ${
                          selectedBank === bank ? 'border-[#f76e28] bg-white text-[#f76e28]' : 'border-zinc-300 bg-white text-zinc-700'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Wallets */}
              {paymentMethod === 'wallet' && (
                <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200/80 text-xs">
                  <span className="font-bold text-zinc-700 block">Select Mobile Wallet:</span>
                  {['Amazon Pay Balance', 'Paytm Wallet', 'MobiKwik'].map((w, idx) => (
                    <label key={w} className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-zinc-200 cursor-pointer">
                      <input type="radio" name="wallet" defaultChecked={idx === 0} className="text-[#f76e28] focus:ring-[#f76e28]" />
                      <span className="font-medium text-zinc-800">{w}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="mt-5 pt-4 border-t border-zinc-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#f76e28] focus:ring-[#f76e28]"
                  />
                  <span className="text-xs text-zinc-600 leading-snug">
                    I agree to the <Link to="/terms" className="text-[#f76e28] underline">Terms of Service</Link> and understand that this is a simulated demo booking. No real payment is required.
                  </span>
                </label>
                {formErrors.terms && (
                  <span className="text-[11px] text-rose-500 font-semibold block mt-1">{formErrors.terms}</span>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Summary & Final Confirmation */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 bg-white rounded-2xl p-6 shadow-md border border-zinc-200 space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Ticket size={18} className="text-[#f76e28]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">Order Summary</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-semibold">Step 2 of 2</span>
              </div>

              {/* Event / Movie Info Banner */}
              <div className="flex gap-3.5 bg-zinc-50 p-3.5 rounded-xl border border-zinc-100">
                <img
                  src={bookingData.movie?.poster || event?.cover_image || '/images/action_poster_1780401266913.png'}
                  alt="Poster"
                  className="w-14 h-20 object-cover rounded-lg shadow-2xs shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/action_poster_1780401266913.png';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-zinc-900 text-sm truncate">
                    {bookingData.movie?.title || event?.title}
                  </h4>
                  <p className="text-xs text-zinc-600 font-medium truncate mt-0.5">
                    {showtime.theatre}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#f76e28] shrink-0" />
                    <span>{date} • {time}</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 flex items-center gap-1.5">
                    <Armchair size={12} className="text-[#f76e28] shrink-0" />
                    <span className="font-bold text-zinc-800">
                      {isEvent ? `${bookingData.quantity}x ${bookingData.selectedTier?.name}` : selectedSeats.map(s => s.id).join(', ')}
                    </span>
                  </p>
                </div>
              </div>

              {/* Price Calculation Rows */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Tickets Base Subtotal ({ticketCount} tickets)</span>
                  <span className="font-bold text-zinc-900">{formatLocalPrice(ticketsSubtotal)}</span>
                </div>

                {addonsSubtotal > 0 && (
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Pre-booked Snacks & Combos</span>
                    <span className="font-bold text-zinc-900">{formatLocalPrice(addonsSubtotal)}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-emerald-600 font-bold bg-emerald-50/50 p-2 rounded-md">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatLocalPrice(appliedCoupon.discount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Convenience Fee (₹35/ticket)</span>
                  <span className="font-medium text-zinc-900">{formatLocalPrice(convenienceFee)}</span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Integrated GST (18% on convenience fee)</span>
                  <span className="font-medium text-zinc-900">{formatLocalPrice(gst)}</span>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-base">
                  <span className="font-black text-zinc-900">Total Payable:</span>
                  <span className="font-black text-2xl text-[#f76e28]">
                    {formatLocalPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Error Notice if any */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-bold">
                  {error}
                </div>
              )}

              {/* Demo Confirmation CTA */}
              <button
                onClick={handleCompleteDemoBooking}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] disabled:opacity-50 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-orange-500/25"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing Demo Booking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Confirm & Pay {formatLocalPrice(totalAmount)}</span>
                  </>
                )}
              </button>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 text-center space-y-1">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                  DEMO CHECKOUT MODE
                </span>
                <p className="text-[11px] text-zinc-400">
                  No real bank account or credit card is charged. Instant confirmed QR pass is generated for demo verification.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
