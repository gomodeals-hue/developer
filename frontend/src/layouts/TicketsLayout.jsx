import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { 
  Ticket, User, Search, Shield, Building, X, LogOut, 
  ChevronDown, ArrowLeft, Clapperboard, Sparkles, Film, 
  MapPin, Menu, Bell, Check, Bus
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { API } from '../config/ticketApi';
import gmdLogo from '../assets/GMD_Logo.png';

const POPULAR_CITIES = [
  { name: 'Coimbatore', state: 'Tamil Nadu', isTop: true },
  { name: 'Chennai', state: 'Tamil Nadu', isTop: true },
  { name: 'Bengaluru', state: 'Karnataka', isTop: true },
  { name: 'Mumbai', state: 'Maharashtra', isTop: true },
  { name: 'Hyderabad', state: 'Telangana', isTop: true },
  { name: 'Delhi-NCR', state: 'National Capital', isTop: true },
  { name: 'Kochi', state: 'Kerala', isTop: true },
  { name: 'Madurai', state: 'Tamil Nadu', isTop: false },
  { name: 'Tiruppur', state: 'Tamil Nadu', isTop: false },
  { name: 'Salem', state: 'Tamil Nadu', isTop: false },
];

export default function TicketsLayout() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => localStorage.getItem('tb_city') || 'Coimbatore');
  const [ssoUser, setSsoUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const { currency, setCurrency, EXCHANGE_RATES } = useCurrency();

  // Auth State
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authData, setAuthData] = useState({ email: '', password: '', full_name: '', otp: '', role: 'customer' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tb_user') || localStorage.getItem('gomo_customer_user');
    if (saved) {
      try { setSsoUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleSelectCity = (cityName) => {
    setSelectedCity(cityName);
    localStorage.setItem('tb_city', cityName);
    setShowCityModal(false);
  };

  const handleLogout = () => {
    setSsoUser(null);
    localStorage.removeItem('tb_user');
    localStorage.removeItem('tb_token');
    navigate('/tickets');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      const user = {
        id: `usr_${Date.now()}`,
        full_name: authData.full_name || authData.email.split('@')[0],
        email: authData.email,
        role: authData.role || 'customer'
      };
      setSsoUser(user);
      localStorage.setItem('tb_user', JSON.stringify(user));
      setShowAuthModal(false);
      setAuthLoading(false);
    }, 400);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tickets?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/tickets');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-900 font-sans selection:bg-[#f76e28] selection:text-white flex flex-col">
      {/* Top Utility Store Bar */}
      <div className="bg-[#1f2533] text-zinc-300 text-xs py-2 px-4 md:px-8 flex items-center justify-between border-b border-zinc-800">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors font-medium group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#f76e28]" />
          <span>Back to <strong className="text-white">GoMo Deals Store</strong></span>
        </Link>
        <div className="flex items-center gap-4 text-zinc-400">
          <Link to="/flea-market" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
            <span>🌾 Flea Market B2B</span>
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-400">Live Cinema Ticketing • Best Prices in {selectedCity}</span>
        </div>
      </div>

      {/* Main BookMyShow-Style GoMo Deals Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4 md:gap-8">
            
            {/* GoMo Deals Logo + Tickets Wordmark */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link to="/tickets" className="flex items-center gap-2.5 group">
                <img 
                  src={gmdLogo} 
                  alt="GoMo Deals" 
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-lg font-black tracking-tight text-zinc-900">GoMo</span>
                    <span className="text-lg font-black tracking-tight text-[#f76e28]">tickets</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">book my show</span>
                </div>
              </Link>
            </div>

            {/* Central Spacious Search Bar matching screenshot */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl relative text-zinc-700">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  if (!val.trim() && location.pathname === '/tickets') {
                    navigate('/tickets');
                  }
                }}
                placeholder="Search for Movies, Events, Plays, Sports and Activities" 
                className="w-full pl-11 pr-10 py-2.5 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 focus:border-[#f76e28] rounded-md focus:outline-none focus:ring-1 focus:ring-[#f76e28]/30 text-xs sm:text-sm font-normal placeholder-zinc-400 transition-all text-zinc-900 shadow-2xs"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    navigate('/tickets');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Right actions: City Selector, Sign In, Currency */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Location / City Selector dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCityModal(!showCityModal)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-zinc-100 text-xs font-semibold text-zinc-700 transition-colors cursor-pointer"
                  title="Change Location"
                >
                  <span className="text-zinc-800 font-medium">{selectedCity}</span>
                  <ChevronDown size={14} className="text-zinc-400 transition-transform" />
                </button>

                {/* City Selection Popover */}
                {showCityModal && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-zinc-200 p-4 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#f76e28]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">Select City</span>
                      </div>
                      <button onClick={() => setShowCityModal(false)} className="text-zinc-400 hover:text-zinc-700">
                        <X size={15} />
                      </button>
                    </div>

                    <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                      {POPULAR_CITIES.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => handleSelectCity(c.name)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                            selectedCity === c.name 
                              ? 'bg-orange-50 text-[#f76e28] font-bold' 
                              : 'text-zinc-700 hover:bg-zinc-50'
                          }`}
                        >
                          <div>
                            <span className="block">{c.name}</span>
                            <span className="text-[10px] text-zinc-400">{c.state}</span>
                          </div>
                          {selectedCity === c.name && <Check size={14} className="text-[#f76e28]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Currency Selector */}
              <div className="relative hidden xl:block">
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none bg-zinc-50 border border-zinc-200 text-zinc-700 font-semibold py-1.5 pl-2.5 pr-6 rounded-md hover:border-zinc-300 transition-colors focus:outline-none cursor-pointer text-xs"
                >
                  {Object.keys(EXCHANGE_RATES).map(curr => (
                    <option key={curr} value={curr}>
                      {EXCHANGE_RATES[curr].symbol} {curr}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>

              {/* My Tickets */}
              <Link 
                to="/tickets/my-tickets"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-zinc-100 text-xs font-medium text-zinc-700 transition-all"
              >
                <Ticket size={14} className="text-[#f76e28]" />
                <span>My Bookings</span>
              </Link>

              {/* Sign In CTA in GoMo Orange */}
              {ssoUser ? (
                <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-md border border-zinc-200">
                  <div className="w-5 h-5 rounded-full bg-[#f76e28] flex items-center justify-center text-[10px] font-black text-white">
                    {ssoUser.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-xs font-bold text-zinc-800 max-w-[90px] truncate">{ssoUser.full_name}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5 ml-1"
                    title="Sign Out"
                  >
                    <LogOut size={13} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-1.5 rounded-md bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  Sign in
                </button>
              )}

              {/* Menu icon */}
              <button
                type="button"
                onClick={() => setShowCityModal(true)}
                className="p-1.5 text-zinc-600 hover:text-zinc-900 rounded-md hover:bg-zinc-100 transition-colors"
                title="Options"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Subheader Bar matching Screenshot 1 */}
        <div className="bg-[#f8f9fa] border-t border-zinc-200 text-xs font-medium text-zinc-600">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar">
            {/* Left Nav items */}
            <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0">
              <Link 
                to="/tickets/movies" 
                className={`font-bold transition-colors relative py-0.5 ${
                  location.pathname === '/tickets' || location.pathname === '/tickets/movies' 
                    ? 'text-zinc-900 font-bold' 
                    : 'text-zinc-600 hover:text-[#f76e28]'
                }`}
              >
                Movies
                {(location.pathname === '/tickets' || location.pathname === '/tickets/movies') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f76e28] rounded-full"></span>
                )}
              </Link>
              <Link 
                to="/tickets/buses" 
                className={`transition-colors relative py-0.5 flex items-center gap-1.5 ${
                  location.pathname.startsWith('/tickets/buses')
                    ? 'text-zinc-900 font-bold' 
                    : 'text-zinc-600 hover:text-[#f76e28]'
                }`}
              >
                <span>Buses</span>
                <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-[#f76e28] text-[9px] font-black uppercase tracking-wider">
                  New
                </span>
                {location.pathname.startsWith('/tickets/buses') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f76e28] rounded-full"></span>
                )}
              </Link>
              <Link 
                to="/tickets/events" 
                className={`transition-colors relative py-0.5 ${
                  location.pathname === '/tickets/events' && !location.search
                    ? 'text-zinc-900 font-bold' 
                    : 'text-zinc-600 hover:text-[#f76e28]'
                }`}
              >
                Events
                {location.pathname === '/tickets/events' && !location.search && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f76e28] rounded-full"></span>
                )}
              </Link>
              <Link 
                to="/tickets/events?category=theatre" 
                className={`transition-colors relative py-0.5 ${
                  location.search.includes('theatre')
                    ? 'text-zinc-900 font-bold' 
                    : 'text-zinc-600 hover:text-[#f76e28]'
                }`}
              >
                Plays
                {location.search.includes('theatre') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f76e28] rounded-full"></span>
                )}
              </Link>
              <Link 
                to="/tickets/events?category=sports" 
                className={`transition-colors relative py-0.5 ${
                  location.search.includes('sports')
                    ? 'text-zinc-900 font-bold' 
                    : 'text-zinc-600 hover:text-[#f76e28]'
                }`}
              >
                Sports
                {location.search.includes('sports') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f76e28] rounded-full"></span>
                )}
              </Link>
              <Link 
                to="/tickets/events?category=activities" 
                className={`transition-colors relative py-0.5 ${
                  location.search.includes('activities')
                    ? 'text-zinc-900 font-bold' 
                    : 'text-zinc-600 hover:text-[#f76e28]'
                }`}
              >
                Activities
                {location.search.includes('activities') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f76e28] rounded-full"></span>
                )}
              </Link>
            </div>

            {/* Right Quick Links */}
            <div className="hidden lg:flex items-center gap-6 text-[11px] font-normal text-zinc-500 flex-shrink-0">
              <Link to="/tickets/owner" className="hover:text-[#f76e28] transition-colors">ListYourShow</Link>
              <Link to="/tickets" className="hover:text-[#f76e28] transition-colors">Corporates</Link>
              <Link to="/tickets" className="hover:text-[#f76e28] transition-colors">Offers</Link>
              <Link to="/tickets" className="hover:text-[#f76e28] transition-colors">Gift Cards</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Outlet context={{ selectedCity, setSelectedCity }} />
      </main>

      {/* Footer with GoMo Deals Cinema Ticketing Details */}
      <footer className="bg-[#1f2533] text-zinc-400 border-t border-zinc-800 py-12 px-4 md:px-8 mt-auto">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Film className="text-[#f76e28]" size={22} />
              <span className="text-lg font-black text-white">GoMo Tickets</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              India's premier movie & live event ticketing experience. Instant seat reservation, verified digital QR entry, and concession combos across {selectedCity} and 200+ Indian cities.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">Now Showing in {selectedCity}</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link to="/tickets" className="hover:text-white transition-colors">Street Fighter (2026)</Link></li>
              <li><Link to="/tickets" className="hover:text-white transition-colors">Dune: Part Two</Link></li>
              <li><Link to="/tickets" className="hover:text-white transition-colors">Leo: Bloody Sweet</Link></li>
              <li><Link to="/tickets/my-tickets" className="hover:text-white transition-colors">My Booked Passes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">Partner Cinemas</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link to="/tickets" className="hover:text-white transition-colors">Broadway Cinemas: Coimbatore</Link></li>
              <li><Link to="/tickets" className="hover:text-white transition-colors">KG Cinemas: Coimbatore</Link></li>
              <li><Link to="/tickets" className="hover:text-white transition-colors">INOX: Prozone Mall, Coimbatore</Link></li>
              <li><Link to="/tickets/owner" className="hover:text-white transition-colors">Theatre Owner Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">Trust & Security</h4>
            <p className="text-xs text-zinc-400 mb-3">100% verified digital tickets with instant SMS, WhatsApp & Email delivery.</p>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              256-bit Encrypted Checkout
            </span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#f76e28] font-black">
                <Film size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900">
                  {authMode === 'login' ? 'Sign In to GoMo Tickets' : 'Create Free Account'}
                </h3>
                <p className="text-xs text-zinc-500">Book movie tickets in {selectedCity} & save seats</p>
              </div>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={authData.full_name}
                    onChange={(e) => setAuthData({...authData, full_name: e.target.value})}
                    placeholder="Enter your name" 
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-[#f76e28] text-sm font-medium"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={authData.email}
                  onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  placeholder="name@example.com" 
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-[#f76e28] text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Password</label>
                <input 
                  type="password" 
                  required 
                  value={authData.password}
                  onChange={(e) => setAuthData({...authData, password: e.target.value})}
                  placeholder="Password" 
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-[#f76e28] text-sm font-medium"
                />
              </div>

              <button 
                type="submit" 
                disabled={authLoading}
                className="w-full py-3 rounded-lg bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-6 cursor-pointer"
              >
                {authLoading ? 'Signing in...' : authMode === 'login' ? 'Continue' : 'Create Account'}
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-xs text-[#f76e28] hover:underline font-bold"
                >
                  {authMode === 'login' ? "Don't have an account? Sign up free" : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
