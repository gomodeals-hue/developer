import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Store, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  Package, 
  TrendingUp, 
  ShoppingBag, 
  Shield, 
  Play, 
  Pause, 
  X, 
  Smartphone, 
  MessageCircle, 
  Box, 
  Globe, 
  Headphones, 
  Calculator, 
  RotateCcw, 
  UserCheck, 
  DollarSign, 
  CheckCircle2, 
  Info,
  Clock,
  ArrowUpRight,
  Truck
} from 'lucide-react';
import { useSellerAuth } from '../../context/SellerAuthContext';
import gmdLogo from '../../assets/GMD_Logo.png';

export default function SellerLoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('pooja-items');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Video Walkthrough Modal State
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoChapter, setVideoChapter] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(25);

  // Order Dispatch Demo State
  const [demoMobile, setDemoMobile] = useState('+91 98450 12345');
  const [simulatedAlertSent, setSimulatedAlertSent] = useState(false);
  const [tapeVerified, setTapeVerified] = useState(false);

  // Pricing Calculator State
  const [calcPrice, setCalcPrice] = useState(1200);
  const [calcCategory, setCalcCategory] = useState('clothing');

  const { login, register, demoLogin } = useSellerAuth();
  const navigate = useNavigate();

  // Video ticker simulation
  useEffect(() => {
    let interval;
    if (showVideoModal && isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setVideoChapter((curr) => (curr < 4 ? curr + 1 : 1));
            return 0;
          }
          return prev + 2;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [showVideoModal, isVideoPlaying]);

  // Pricing calculator calculations
  const gmdCommissionRate = calcPrice < 1000 ? 0 : 0.05; // 0% under 1000, 5% above
  const gmdCommission = Math.round(calcPrice * gmdCommissionRate);
  const compCommission = Math.round(calcPrice * 0.18); // 18% standard competitor
  const pgFee = Math.round(calcPrice * 0.018); // 1.8% gateway
  const shippingFee = 49;
  const gmdNetPayout = calcPrice - gmdCommission - pgFee - shippingFee;
  const compNetPayout = calcPrice - compCommission - pgFee - shippingFee;
  const extraProfit = gmdNetPayout - compNetPayout;

  const handleDemoLogin = async (sellerEmail) => {
    const targetEmail = sellerEmail || 'seller@gomodeals.com';
    const targetPass = 'sellerpassword123';
    setEmail(targetEmail);
    setPassword(targetPass);
    setError('');
    setLoading(true);
    try {
      await login(targetEmail, targetPass);
      navigate('/seller');
    } catch (err) {
      if (demoLogin) {
        demoLogin(targetEmail);
        navigate('/seller');
      } else {
        setError(err.message || 'Demo login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register({
          store_name: storeName,
          owner_name: ownerName || storeName,
          email,
          password,
          phone,
          category
        });
      } else {
        await login(email, password);
      }
      navigate('/seller');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateDispatch = () => {
    setSimulatedAlertSent(true);
    setTapeVerified(false);
    setTimeout(() => {
      setTapeVerified(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-[#fdfbf9] to-orange-50/40 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Top Header Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <img 
            src={gmdLogo} 
            alt="GoMo Deals" 
            className="h-11 sm:h-12 w-auto object-contain transition-transform duration-150 group-hover:scale-105 filter drop-shadow-sm" 
          />
          <span className="text-xs font-bold text-stone-700 group-hover:text-[#f76e28] transition-colors hidden sm:inline">
            ← Back to Customer Store
          </span>
        </Link>

        {/* Quick Portal Switcher */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setShowVideoModal(true)}
            className="px-3.5 py-1.5 bg-orange-100/90 text-[#f76e28] border border-orange-200 rounded-xl hover:bg-orange-200/80 transition flex items-center gap-1.5 cursor-pointer font-bold shadow-xs"
          >
            <Play size={13} className="fill-[#f76e28]" />
            <span>Watch Registration Video</span>
          </button>
          <Link to="/" className="px-3 py-1.5 bg-white border border-stone-200 rounded-xl hover:border-[#f76e28] text-stone-700 transition flex items-center gap-1.5 shadow-sm">
            <ShoppingBag size={13} className="text-[#f76e28]" />
            <span>Customer Store</span>
          </Link>
        </div>
      </div>

      {/* Hero Registration & Login Area */}
      <div className="max-w-6xl w-full mx-auto my-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Key Highlights & Quick Video Trigger */}
        <div className="md:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#f76e28] text-xs font-bold uppercase tracking-wider">
            <Store size={14} className="text-[#f76e28]" />
            <span>GoMo Deals Merchant &amp; Seller Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 leading-tight">
            Higher Profits. 24/7 Support. Global Sales on GoMo Deals.
          </h1>

          <p className="text-stone-600 text-sm leading-relaxed">
            Register your store in under 3 minutes. Receive instant verified customer orders via WhatsApp, pack securely with GoMoDeals tape, and enjoy guaranteed fast doorstep pickups and weekly payouts.
          </p>

          {/* Video Preview CTA Card */}
          <div 
            onClick={() => setShowVideoModal(true)}
            className="group relative p-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl cursor-pointer hover:shadow-xl transition-all border border-stone-700 overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#f76e28]/20 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#f76e28] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={18} className="fill-white ml-0.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/30 text-orange-300">
                      Sample Video Guide
                    </span>
                    <span className="text-[10px] text-stone-400">2 min</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    How to Register as a Seller &amp; Start Selling
                  </h3>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Bullet Advantages */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-start gap-2.5 text-xs text-stone-700 font-medium bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-emerald-900">0% Commission Tier:</strong> Zero commission for items under ₹1,000. Flat 5% for higher orders.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-stone-700 font-medium bg-orange-50/70 p-2.5 rounded-xl border border-orange-200">
              <Globe size={16} className="text-[#f76e28] shrink-0 mt-0.5" />
              <span><strong className="text-stone-900">International Export:</strong> Live sales across South Africa, United Kingdom &amp; USA.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-stone-700 font-medium bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <MessageCircle size={16} className="text-[#f76e28] shrink-0 mt-0.5" />
              <span><strong className="text-stone-900">WhatsApp Order Flow:</strong> Instant order alerts dispatched directly to your registered mobile.</span>
            </div>
          </div>

          {/* Quick Demo Login Box */}
          <div className="p-4 bg-orange-50/80 border border-orange-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-950 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#f76e28]" />
                Explore Merchant Dashboard:
              </span>
              <span className="text-[10px] bg-orange-200/80 text-orange-900 font-black px-2 py-0.5 rounded-full uppercase">1-Click</span>
            </div>
            <p className="text-[11px] text-stone-600">
              Click below to instantly log in as <strong>Divine Brass Arts</strong> without typing:
            </p>
            <button
              type="button"
              onClick={() => handleDemoLogin('seller@gomodeals.com')}
              disabled={loading}
              className="w-full py-2 px-3 bg-[#f76e28] hover:bg-[#de5713] text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Demo Seller One-Click Sign In</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Login / Register Card */}
        <div className="md:col-span-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200">
          
          {/* Tab Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isRegister ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Seller Login
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isRegister ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Become a Seller (Free)
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Store / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Anand Brass & Decor"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#f76e28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Authorized Contact Name</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#f76e28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Registered Mobile Number (WhatsApp Alerts) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#f76e28]"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">
                    Used for instant WhatsApp order notifications &amp; courier handover PIN.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Primary Product Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#f76e28]"
                  >
                    <option value="pooja-items">Pooja Items &amp; Sacred Arts</option>
                    <option value="clothing">Clothing &amp; Men's Shirts</option>
                    <option value="ethnic-wear">Sarees &amp; Ethnic Weaves</option>
                    <option value="electronics">Gadgets &amp; Electronics</option>
                    <option value="home-living">Home &amp; Decor</option>
                    <option value="beauty">Beauty &amp; Wellness</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Official Seller Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seller@gomodeals.com"
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#f76e28]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#f76e28]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#f76e28] hover:bg-[#de5713] text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>{isRegister ? 'Complete Seller Registration' : 'Enter Seller Dashboard'}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Quick preset credentials helper */}
          {!isRegister && (
            <div className="mt-5 pt-3 border-t border-stone-100 text-xs text-stone-500 text-center space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-700">Quick 1-Click Demo Logins:</span>
                <span className="text-[10px] text-stone-400 font-mono">Pass: sellerpassword123</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('seller@gomodeals.com')}
                  className="p-2.5 bg-stone-50 hover:bg-orange-50 hover:border-orange-300 text-stone-800 rounded-xl transition cursor-pointer border border-stone-200 group text-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-bold block text-stone-900 group-hover:text-[#f76e28] truncate">
                      Divine Brass Arts
                    </span>
                    <span className="text-[10px] text-stone-500 block truncate">Pooja Items</span>
                  </div>
                  <span className="text-[9px] font-mono text-stone-400 group-hover:text-[#f76e28] mt-1 truncate">
                    seller@gomodeals.com
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('heritage@gomodeals.com')}
                  className="p-2.5 bg-stone-50 hover:bg-orange-50 hover:border-orange-300 text-stone-800 rounded-xl transition cursor-pointer border border-stone-200 group text-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-bold block text-stone-900 group-hover:text-[#f76e28] truncate">
                      Heritage Weaves
                    </span>
                    <span className="text-[10px] text-stone-500 block truncate">Ethnic Wear</span>
                  </div>
                  <span className="text-[9px] font-mono text-stone-400 group-hover:text-[#f76e28] mt-1 truncate">
                    heritage@gomodeals.com
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('tech@gomodeals.com')}
                  className="p-2.5 bg-stone-50 hover:bg-orange-50 hover:border-orange-300 text-stone-800 rounded-xl transition cursor-pointer border border-stone-200 group text-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-bold block text-stone-900 group-hover:text-[#f76e28] truncate">
                      SmartTech Gear
                    </span>
                    <span className="text-[10px] text-stone-500 block truncate">Electronics</span>
                  </div>
                  <span className="text-[9px] font-mono text-stone-400 group-hover:text-[#f76e28] mt-1 truncate">
                    tech@gomodeals.com
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION: ORDER DISPATCH FLOW (3-STAGE GUARANTEE)         */}
      {/* Registered mobile number -> WhatsApp message -> Tape     */}
      {/* ======================================================== */}
      <div className="max-w-6xl w-full mx-auto my-8 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#f76e28] text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Package size={13} />
            <span>Standard Operating Procedure (SOP)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Order Dispatch Flow: From Click to Handover
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Every GoMo Deals order follows an authenticated, tamper-proof 3-step security chain.
          </p>
        </div>

        {/* 3 Step Visual Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-black text-sm">
                  1
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Step 01</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Smartphone size={18} className="text-[#f76e28]" />
                <h3 className="font-bold text-sm text-stone-900">Registered Mobile Number</h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Your verified business phone number is linked directly to your merchant account and tax profile for authenticated dispatch coordination.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>OTP Authenticated Device</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-5 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-[#f76e28] text-white flex items-center justify-center font-black text-sm shadow-sm">
                  2
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Step 02</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle size={18} className="text-[#f76e28]" />
                <h3 className="font-bold text-sm text-stone-900">Instant WhatsApp Message</h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                As soon as a buyer places an order, an automated WhatsApp alert delivers item details, shipping label PDF, and courier pickup ETA.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-orange-200/70 text-[11px] text-[#f76e28] font-semibold flex items-center gap-1.5">
              <Clock size={13} />
              <span>Dispatched in &lt; 5 Seconds</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-black text-sm">
                  3
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Step 03</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Box size={18} className="text-[#f76e28]" />
                <h3 className="font-bold text-sm text-stone-900">GoMoDeals Security Tape</h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Seal the carton with mandatory official GoMo Deals branded tamper-evident tape before handing the parcel to the verified BlueDart courier.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] text-stone-700 font-semibold flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#f76e28]" />
              <span>100% Anti-Theft Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Interactive Simulation Strip */}
        <div className="mt-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              Interactive Test Simulation
            </span>
            <h4 className="text-sm font-bold text-stone-100">
              Test the WhatsApp Order Alert Notification Live:
            </h4>
            <p className="text-xs text-stone-400">
              Enter your mobile to trigger a simulated order alert and packaging seal check.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <input 
              type="text" 
              value={demoMobile} 
              onChange={(e) => setDemoMobile(e.target.value)} 
              placeholder="+91 Mobile Number"
              className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-[#f76e28] w-full lg:w-48 font-mono"
            />
            <button
              type="button"
              onClick={handleSimulateDispatch}
              className="px-4 py-2 bg-[#f76e28] hover:bg-[#de5713] text-white rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
            >
              Simulate Alert
            </button>
          </div>
        </div>

        {/* Simulated Alert Notification Preview */}
        {simulatedAlertSent && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-fade">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle size={16} />
              </div>
              <div className="text-left space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">WhatsApp Order Dispatch Notification Dispatched to {demoMobile}</span>
                  <span className="text-[10px] text-emerald-700 font-mono">Just Now</span>
                </div>
                <p className="text-xs text-emerald-900 bg-white p-2.5 rounded-xl border border-emerald-200 font-mono">
                  <strong>GoMoDeals Order #GMD-98421 Confirmed!</strong><br />
                  Customer: <strong>Priya S. (Express Delivery)</strong><br />
                  Item: <strong>Brass Puja Diya Set (Qty: 2)</strong> • Amount: <strong>₹1,450</strong><br />
                  Action Required: <strong>Apply GoMoDeals Security Tape on packaging. Courier arriving at 3:30 PM.</strong>
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-800 font-semibold">
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span>GoMoDeals Branded Security Seal: {tapeVerified ? 'VERIFIED READY FOR PICKUP' : 'Verifying seal...'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* SECTION: WHY SELL ON GMD (COMPREHENSIVE 8 PILLARS)        */}
      {/* ======================================================== */}
      <div className="max-w-6xl w-full mx-auto my-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#f76e28] text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>Merchant Advantages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Why Sell on GoMo Deals (GMD)?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Built from the ground up to empower independent manufacturers, boutique creators, and retail merchants.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {/* Card 1: Higher Profit */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <DollarSign size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">Higher Profit Margin</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              0% commission tier on all products priced under ₹1,000, and a flat 5% on others. Earn up to 18% more profit compared to legacy marketplaces.
            </p>
          </div>

          {/* Card 2: 24/7 Seller Support */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <Headphones size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">24/7 Seller Support</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Round-the-clock merchant hotline and WhatsApp concierge. Support tickets receive guaranteed live investigation within 4 business hours.
            </p>
          </div>

          {/* Card 3: International Sale (SA, UK, USA) */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <Globe size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">Sell Across Countries</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Cross-border export clearance live right now across <strong>South Africa (SA), United Kingdom (UK), and USA</strong> with zero customs hassle.
            </p>
          </div>

          {/* Card 4: Business on the Go App */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <Smartphone size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">Business on the Go App</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Manage your entire catalog, approve courier pickups, converse with customers via VOC, and review instant payouts directly on mobile.
            </p>
          </div>

          {/* Card 5: Pricing Calculator Made Simple */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <Calculator size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">Pricing Calculator Made Simple</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zero hidden fees, zero surprise deductions. Use our instant profit calculator to preview your exact net deposit before setting product prices.
            </p>
          </div>

          {/* Card 6: Lower Return Charges */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <RotateCcw size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">Lower Return Charges</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Industry-lowest reverse courier charges. Zero seller penalties for verified shipments packed with authentic GoMoDeals security tape.
            </p>
          </div>

          {/* Card 7: 24/7 Account Management */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <UserCheck size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">24/7 Account Management</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              A dedicated merchant account manager assists with inventory forecasting, festive deals enrollment, and SEO search rank boosting.
            </p>
          </div>

          {/* Card 8: Automated Courier Handover */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-[#f76e28] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f76e28] flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
              <Truck size={20} />
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5">Automated Doorstep Pickup</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              BlueDart and GoMo Express partners pick up straight from your warehouse with digital OTP verification. Zero drop-off hub trips.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION: PRICING CALCULATOR MADE SIMPLE (INTERACTIVE)     */}
      {/* ======================================================== */}
      <div className="max-w-6xl w-full mx-auto my-8 bg-gradient-to-br from-white to-orange-50/30 border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-xl text-left mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#f76e28] text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Calculator size={13} />
            <span>Interactive Profit Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Pricing Calculator Made Simple
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Calculate your take-home payout instantly. See how GoMo Deals leaves significantly more profit in your pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-stone-700">Listing Price to Customer (₹)</label>
                <span className="text-sm font-mono font-black text-[#f76e28]">₹{calcPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min={200} 
                max={15000} 
                step={50}
                value={calcPrice}
                onChange={(e) => setCalcPrice(Number(e.target.value))}
                className="w-full accent-[#f76e28] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                <span>₹200</span>
                <span>₹5,000</span>
                <span>₹10,000</span>
                <span>₹15,000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Product Category</label>
                <select 
                  value={calcCategory} 
                  onChange={(e) => setCalcCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#f76e28] font-medium"
                >
                  <option value="clothing">Men's Shirts &amp; Apparel</option>
                  <option value="pooja">Pooja Items &amp; Brass Arts</option>
                  <option value="electronics">Electronics &amp; Gadgets</option>
                  <option value="home">Home Decor &amp; Handicrafts</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Direct Courier Weight</label>
                <select className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#f76e28] font-medium">
                  <option value="0.5">Standard Parcel (&lt; 0.5 kg)</option>
                  <option value="1">Medium Box (0.5 - 1 kg)</option>
                  <option value="2">Heavy Item (1 - 2 kg)</option>
                </select>
              </div>
            </div>

            {/* Commission Policy Badge */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
              <Info size={16} className="text-[#f76e28] shrink-0" />
              <span>
                {calcPrice < 1000 ? (
                  <strong className="text-emerald-800">Special 0% Commission Applied! (Order price is under ₹1,000)</strong>
                ) : (
                  <span>Flat <strong>5% GoMo Deals fee</strong> applies (compared to 15-22% on other portals).</span>
                )}
              </span>
            </div>
          </div>

          {/* Results Comparison Column */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-400">
              Payout Comparison for ₹{calcPrice.toLocaleString('en-IN')} Sale
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {/* GoMo Deals Payout */}
              <div className="p-4 bg-orange-50/70 border-2 border-[#f76e28] rounded-xl text-left relative">
                <span className="absolute -top-2.5 right-3 bg-[#f76e28] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  GoMo Deals
                </span>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Your Net Payout</span>
                <span className="text-2xl font-mono font-black text-[#f76e28] block mt-0.5">
                  ₹{Math.max(0, gmdNetPayout).toLocaleString('en-IN')}
                </span>
                <div className="text-[10px] text-stone-600 mt-2 space-y-0.5 border-t border-orange-200 pt-2">
                  <p>Commission ({gmdCommissionRate * 100}%): <strong>₹{gmdCommission}</strong></p>
                  <p>Payment Gateway: <strong>₹{pgFee}</strong></p>
                  <p>Courier Pickup: <strong>₹{shippingFee}</strong></p>
                </div>
              </div>

              {/* Competitor Payout */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Legacy Portals</span>
                <span className="text-2xl font-mono font-bold text-stone-400 block mt-0.5">
                  ₹{Math.max(0, compNetPayout).toLocaleString('en-IN')}
                </span>
                <div className="text-[10px] text-stone-400 mt-2 space-y-0.5 border-t border-stone-200 pt-2">
                  <p>Commission (18%): <strong>₹{compCommission}</strong></p>
                  <p>Payment Gateway: <strong>₹{pgFee}</strong></p>
                  <p>Courier Pickup: <strong>₹{shippingFee}</strong></p>
                </div>
              </div>
            </div>

            {/* Extra Profit Highlight */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <TrendingUp size={15} className="text-emerald-600" />
                Extra profit in your pocket per sale:
              </span>
              <span className="font-mono font-black text-emerald-700 text-sm">
                +₹{extraProfit.toLocaleString('en-IN')} ({Math.round((extraProfit / calcPrice) * 100)}% More)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SAMPLE VIDEO GUIDE MODAL (HOW TO REGISTER AS A SELLER)    */}
      {/* ======================================================== */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-sm animate-fade">
          <div className="relative w-full max-w-4xl bg-stone-950 text-white rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f76e28] flex items-center justify-center text-white">
                  <Play size={16} className="fill-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    How to Register as a Seller on GoMo Deals
                  </h3>
                  <span className="text-[10px] text-stone-400">
                    Official Seller Onboarding Masterclass • 2 Min Complete Walkthrough
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player Display Area (Simulated High-Fidelity Walkthrough) */}
            <div className="relative aspect-video bg-stone-900 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
              {/* Dynamic Chapter Content Display */}
              <div className="max-w-md w-full space-y-4 animate-fade">
                {videoChapter === 1 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-[#f76e28] border border-orange-500/30 flex items-center justify-center mx-auto shadow-lg">
                      <Store size={32} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800">
                      Chapter 1 of 4: Store &amp; Identity Onboarding
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      Enter Your Store Name &amp; Registered Mobile Number
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Provide your official business name and active mobile number. We automatically link your phone to WhatsApp for instant order alerts.
                    </p>
                  </div>
                )}

                {videoChapter === 2 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                      <MessageCircle size={32} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                      Chapter 2 of 4: Live Order WhatsApp Dispatch
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      Automated Order Alert Dispatched to WhatsApp
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Whenever a customer orders, your phone receives an immediate alert with packing slip PDF, buyer details, and scheduled courier pickup window.
                    </p>
                  </div>
                )}

                {videoChapter === 3 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-lg">
                      <Calculator size={32} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800">
                      Chapter 3 of 4: Simple Pricing &amp; Net Payouts
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      0% Commission Tier Under ₹1,000
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Set competitive selling prices and view your exact take-home profit before saving. All weekly payouts deposit directly to your verified bank account.
                    </p>
                  </div>
                )}

                {videoChapter === 4 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-[#f76e28] border border-orange-500/30 flex items-center justify-center mx-auto shadow-lg">
                      <Box size={32} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800">
                      Chapter 4 of 4: Security Tape &amp; Doorstep Handover
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      Seal Packaging with GoMoDeals Tamper Tape
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Apply the official GoMo Deals security tape to seal the package securely. Hand it to the BlueDart courier partner when they arrive at your shop.
                    </p>
                  </div>
                )}
              </div>

              {/* Overlay Play / Pause Button */}
              <button
                type="button"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="absolute bottom-4 left-4 w-9 h-9 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white flex items-center justify-center transition cursor-pointer"
              >
                {isVideoPlaying ? <Pause size={16} /> : <Play size={16} className="fill-white ml-0.5" />}
              </button>
            </div>

            {/* Video Controls & Chapter Navigation */}
            <div className="p-4 bg-stone-900 border-t border-stone-800 space-y-3">
              {/* Progress Bar */}
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#f76e28] h-full transition-all duration-300" 
                  style={{ width: `${((videoChapter - 1) * 25) + (videoProgress * 0.25)}%` }}
                />
              </div>

              {/* 4 Interactive Chapter Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { ch: 1, title: '1. Store Registration' },
                  { ch: 2, title: '2. WhatsApp Alerts' },
                  { ch: 3, title: '3. Pricing Calculator' },
                  { ch: 4, title: '4. GoMoDeals Tape' }
                ].map((item) => (
                  <button
                    key={item.ch}
                    type="button"
                    onClick={() => { setVideoChapter(item.ch); setVideoProgress(0); }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                      videoChapter === item.ch 
                        ? 'bg-[#f76e28] text-white shadow-sm' 
                        : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  Ready to start selling your products on GoMo Deals?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    setIsRegister(true);
                  }}
                  className="px-4 py-2 bg-white text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-black transition cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <span>Start Free Registration</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Footer copyright & Terms */}
      <div className="text-center text-xs text-stone-500 py-3 flex flex-wrap items-center justify-center gap-3">
        <span>&copy; {new Date().getFullYear()} GoMo Deals Merchant &amp; Seller Services. All rights reserved.</span>
        <span>•</span>
        <Link to="/terms" className="hover:text-[#f76e28] transition underline font-medium">Terms &amp; Conditions</Link>
        <span>•</span>
        <Link to="/legal/return-policy" className="hover:text-[#f76e28] transition underline font-medium">Return Policy</Link>
        <span>•</span>
        <Link to="/legal/faqs" className="hover:text-[#f76e28] transition underline font-medium">Seller FAQs</Link>
        <span>•</span>
        <Link to="/legal/privacy-policy" className="hover:text-[#f76e28] transition underline font-medium">Privacy Policy</Link>
      </div>
    </div>
  );
}
