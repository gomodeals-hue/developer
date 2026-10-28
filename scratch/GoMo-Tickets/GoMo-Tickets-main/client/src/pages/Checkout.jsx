import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Ticket, MapPin, Calendar, CreditCard, ShieldCheck, Tag, X, Loader2, AlertCircle, CheckCircle2, Clock, Armchair } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { API } from '../config/api';

// Add Razorpay script to head if it's not already there
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatLocalPrice, getLocalPrices, currency, EXCHANGE_RATES } = useCurrency();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  
  const bookingData = location.state;

  const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));

  useEffect(() => {
    if (ssoUser?.role === 'owner') {
      navigate('/owner', { replace: true });
      return;
    }
    if (ssoUser?.role === 'admin') {
      navigate('/admin', { replace: true });
      return;
    }

    const token = localStorage.getItem('tb_token');
    if (!token) {
      showToast("Please log in to proceed to checkout", "error");
      navigate('/');
      return;
    }

    if (!bookingData) {
      navigate('/');
    }
    loadRazorpayScript();
  }, [bookingData, navigate, ssoUser?.role, showToast]);

  // Lock seats when component mounts
  useEffect(() => {
    if (!bookingData) return;
    const { showtime, selectedSeats, date, time } = bookingData;
    
    let isLocked = false;

    const lockSeats = async () => {
      try {
        const token = localStorage.getItem('tb_token');
        if (!token) return;
        const res = await fetch(`${API}/api/checkout/lock`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ 
            showtimeId: showtime.id, 
            bookingDate: date, 
            bookingTime: time, 
            seats: selectedSeats.map(s => s.id) 
          })
        });
        
        if (!res.ok) {
          const err = await res.json();
          showToast(err.message || "Failed to lock seats.", "error");
          navigate(-1); // kick them back to booking
          return;
        }
        isLocked = true;
      } catch (err) {
        console.error("Locking failed", err);
      }
    };

    lockSeats();

    // Unlock when leaving checkout (component unmount)
    return () => {
      if (isLocked) {
        const token = localStorage.getItem('tb_token');
        if (token) {
          // Use keepalive if possible, or simple fetch if unmounting during navigation
          fetch(`${API}/api/checkout/unlock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ showtimeId: showtime.id, bookingDate: date, bookingTime: time }),
            keepalive: true
          }).catch(console.error);
        }
      }
    };
  }, [bookingData, navigate, showToast]);

  // 10-minute countdown timer
  useEffect(() => {
    if (!bookingData) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          showToast("Seat hold expired. Please select your seats again.", "error");
          navigate(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [bookingData, navigate, showToast]);

  if (!bookingData) return null;

  const { showtime, selectedSeats, date, time, addons } = bookingData;
  const basePrices = getLocalPrices();
  
  // Dynamic Pricing Engine Integration
  const customBasePriceUSD = showtime.base_price ? Number(showtime.base_price) : 4;
  const rate = EXCHANGE_RATES && EXCHANGE_RATES[currency] ? EXCHANGE_RATES[currency].rate : 1;
  const localBase = customBasePriceUSD * rate;
  
  const prices = {
    ...basePrices,
    tiers: {
      Standard: localBase,
      Premium: localBase * 1.5,
      VIP: localBase * 2.5
    }
  };
  
  const groupedSeats = { Standard: 0, Premium: 0, VIP: 0 };
  let ticketsSubtotal = 0;
  
  selectedSeats.forEach(seat => {
    const tier = seat.tier || 'Standard';
    if (groupedSeats[tier] !== undefined) groupedSeats[tier]++;
    ticketsSubtotal += prices.tiers[tier];
  });
  
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
  const convenienceFee = discountedSubtotal * prices.feePercent;
  const gst = (discountedSubtotal + convenienceFee) * prices.gstPercent;
  const totalAmount = discountedSubtotal + convenienceFee + gst;
  
  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const usdSubtotal = subtotal / rate;
      const res = await fetch(`${API}/api/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, ownerId: showtime.owner_id, subtotal: usdSubtotal, userEmail: ssoUser?.email })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        const localDiscount = data.discountAmount * rate;
        setAppliedCoupon({ id: data.couponId, code: couponCode, discount: localDiscount });
      } else {
        setCouponError(data.message || 'Invalid coupon');
        setAppliedCoupon(null);
      }
    } catch {
      setCouponError('Error validating coupon');
    }
    setCouponLoading(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      // 0. The seats are already locked via our initial checkout/lock call. 
      //    We can optionally re-verify but the lock protects us.
      const verifyRes = await fetch(`${API}/api/bookings/verify-availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showtimeId: showtime.id, seats: selectedSeats.map(s => s.id), bookingDate: date, bookingTime: time })
      });
      if (!verifyRes.ok) {
        // Only fails if the lock expired and someone else snagged them.
        const errData = await verifyRes.json();
        throw new Error(errData.message || "One or more seats are no longer available. Your reservation may have expired.");
      }

      // 1. Create order on backend
      const orderResponse = await fetch(`${API}/api/payment/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount, // Pass the mathematically local amount
          currency: currency
        })
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }
      const orderData = await orderResponse.json();

      // 2. Open Razorpay modal
      const user = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));
      const userEmail = user && user.email ? user.email : 'guest@gomodeals.com';
      const userName = user && user.full_name ? user.full_name : 'GoMo User';

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "GoMo Deals - Ticket Booking",
        description: `Booking for ${selectedSeats.length} seats`,
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment & Record Booking in DB securely via single backend call
          try {
            const token = localStorage.getItem('tb_token');
            const bookRes = await fetch(`${API}/api/bookings`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify({
                showtimeId: showtime.id,
                seats: selectedSeats.map(s => s.id),
                email: userEmail,
                bookingDate: date,
                bookingTime: time,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                addons: addons || [],
                couponId: appliedCoupon ? appliedCoupon.id : null,
                isGroup: location.state?.isGroup || false
              }),
            });

            if (!bookRes.ok) {
              const errData = await bookRes.json();
              throw new Error(errData.message || "Failed to save booking. Please contact support.");
            }

            const bookingResult = await bookRes.json();

            if (selectedSeats.length > 0 && selectedSeats[0].tier) {
              localStorage.setItem('preferred_tier', selectedSeats[0].tier);
            }

            navigate('/success', { 
              state: { 
                bookingId: bookingResult.bookingId,
                movieTitle: bookingData.movie?.title,
                theatreName: showtime.theatre,
                seats: selectedSeats,
                date: date,
                time: time,
                total: totalAmount
              } 
            });
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: "9999999999"
        },
        theme: {
          color: "#f97316" // orange-500
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        setError("Payment failed: " + response.error.description);
        setLoading(false);
      });
      paymentObject.open();

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pt-32 pb-16 font-sans text-zinc-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">Complete Your Booking</h1>
          <p className="text-zinc-500 text-lg font-medium">Secure checkout powered by Razorpay</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-full border border-orange-100 font-bold shadow-sm">
            <Clock size={18} />
            Time remaining to complete booking: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Order Summary */}
          <div>
            <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8 sticky top-32">
              <h2 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
                <Ticket className="text-orange-500" size={28} />
                Booking Summary
              </h2>
              
              <div className="space-y-6 mb-8 bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                <div className="flex gap-4">
                  <MapPin className="text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-zinc-900 text-lg">{showtime.theatre}</p>
                    <p className="text-zinc-500 font-medium">Screen {showtime.screen}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Calendar className="text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-zinc-900 text-lg">{date}</p>
                    <p className="text-zinc-500 font-medium">{time}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Armchair className="text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-zinc-900 text-lg">Selected Seats</p>
                    <p className="text-orange-500 font-bold">{selectedSeats.map(s => s.id).join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-6 space-y-4">
                {groupedSeats.Standard > 0 && (
                  <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-100">
                    <span className="text-zinc-500 font-bold">{groupedSeats.Standard}x Standard Tickets</span>
                    <span className="font-black text-zinc-900">{formatLocalPrice(groupedSeats.Standard * prices.tiers.Standard)}</span>
                  </div>
                )}
                {groupedSeats.Premium > 0 && (
                  <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <span className="text-blue-600 font-bold">{groupedSeats.Premium}x Premium Tickets</span>
                    <span className="font-black text-blue-900">{formatLocalPrice(groupedSeats.Premium * prices.tiers.Premium)}</span>
                  </div>
                )}
                {groupedSeats.VIP > 0 && (
                  <div className="flex justify-between items-center bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                    <span className="text-purple-600 font-bold">{groupedSeats.VIP}x VIP Tickets</span>
                    <span className="font-black text-purple-900">{formatLocalPrice(groupedSeats.VIP * prices.tiers.VIP)}</span>
                  </div>
                )}
                
                {addons && addons.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-zinc-100/50">
                    <p className="text-zinc-400 font-black text-[10px] uppercase tracking-widest mb-3">Food & Beverage Add-ons</p>
                    <div className="space-y-3">
                      {addons.map(addon => (
                        <div key={addon.id} className="flex justify-between items-center bg-orange-50/30 p-3 rounded-xl border border-orange-100/50">
                          <span className="text-orange-900 font-bold text-sm">{addon.quantity}x {addon.name}</span>
                          <span className="font-black text-orange-600 text-sm">{formatLocalPrice((Number(addon.price) * rate) * addon.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Coupon Section */}
                <div className="mt-6 pt-4 border-t border-zinc-100/50">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Promo Code" 
                      className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-bold text-zinc-800 uppercase tracking-widest placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      disabled={appliedCoupon || couponLoading}
                    />
                    {appliedCoupon ? (
                      <button onClick={removeCoupon} className="bg-rose-50 text-rose-500 hover:bg-rose-100 px-4 rounded-xl transition-colors flex items-center justify-center">
                        <X size={20} />
                      </button>
                    ) : (
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode || couponLoading}
                        className="bg-zinc-900 text-white px-6 rounded-xl font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
                      >
                        {couponLoading ? <Loader2 className="animate-spin" size={20} /> : 'Apply'}
                      </button>
                    )}
                  </div>
                  {couponError && <p className="text-rose-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12}/> {couponError}</p>}
                  {appliedCoupon && <p className="text-emerald-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1"><CheckCircle2 size={12}/> Code {appliedCoupon.code} applied successfully!</p>}
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-4">
                    <span className="text-emerald-600 font-bold flex items-center gap-2"><Tag size={16}/> Discount Applied</span>
                    <span className="font-black text-emerald-600">-{formatLocalPrice(appliedCoupon.discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-100 mt-2">
                  <span className="text-zinc-500 font-bold">Convenience Fee ({(prices.feePercent * 100).toFixed(0)}%)</span>
                  <span className="font-black text-zinc-900">{formatLocalPrice(convenienceFee)}</span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-100">
                  <span className="text-zinc-500 font-bold">GST ({(prices.gstPercent * 100).toFixed(0)}%)</span>
                  <span className="font-black text-zinc-900">{formatLocalPrice(gst)}</span>
                </div>
                
                <div className="flex justify-between items-end pt-8">
                  <span className="font-black text-zinc-900 text-xl">Grand Total</span>
                  <span className="font-black text-orange-600 text-4xl">{formatLocalPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8">
              <h2 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
                <CreditCard className="text-orange-500" size={28} />
                Payment Method
              </h2>
              
              <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100 mb-8">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-green-500 shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-2">Secure Payment Gateway</h3>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                      You will be redirected to Razorpay to complete your payment securely. Razorpay supports Credit Cards, Debit Cards, Net Banking, UPI, and Wallets.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-200 font-bold text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-zinc-900 text-white font-bold text-lg py-5 rounded-full hover:bg-orange-600 transition-all hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none uppercase tracking-widest"
              >
                {loading ? 'Processing...' : `Pay ${formatLocalPrice(totalAmount)}`}
                {!loading && <ChevronRight size={20} />}
              </button>
              
              <div className="mt-8 pt-8 border-t border-zinc-100 flex justify-center items-center gap-6 text-zinc-400 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png" className="h-5" alt="Razorpay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const ChevronRight = ({size=24, className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
