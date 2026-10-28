import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Ticket, User, Search, Shield, Building, X, LogOut, ChevronDown, Lock, ArrowLeft } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { API } from '../config/api';

export default function MainLayout() {
  const [showAuthModal, setShowAuthModal] = useState(false);
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
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tb_user');
    if (saved) setSsoUser(JSON.parse(saved));
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    let url = '';
    if (authMode === 'login') url = `${API}/api/auth/login`;
    else if (authMode === 'register') url = `${API}/api/auth/register`;
    else if (authMode === 'forgot_password') url = `${API}/api/auth/forgot-password`;
    else if (authMode === 'reset_password') url = `${API}/api/auth/reset-password`;
    
    // Pass role to backend; it will use it if requestedRole === 'owner'
    const payload = { ...authData };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (!res.ok) {
        setAuthError(data.message || 'Authentication failed');
        setAuthSuccessMsg('');
      } else if (authMode === 'forgot_password') {
        setAuthMode('reset_password');
        setAuthError('');
        setAuthSuccessMsg('A reset code has been sent to your email.');
        setAuthData({ ...authData, otp: '', password: '' });
      } else if (authMode === 'reset_password') {
        setAuthMode('login');
        setAuthError('');
        setAuthSuccessMsg('Password reset successfully. You can now log in.');
        setAuthData({ ...authData, otp: '', password: '' });
      } else if (data.requiresVerification) {
        setRequiresOtp(true);
        setAuthError('');
      } else {
        setSsoUser(data.user);
        localStorage.setItem('tb_user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('tb_token', data.token);
        setShowAuthModal(false);
        setAuthError('');
        setAuthSuccessMsg('');
        setRequiresOtp(false);
        setAuthData({ email: '', password: '', full_name: '', otp: '', role: 'customer' });
        
        // Redirect based on the actual DB role returned by the server
        if (data.user.role === 'admin') {
          navigate('/admin');
        }
        else if (data.user.role === 'owner') {
          if (!data.user.theatre_design) navigate('/owner/onboarding');
          else navigate('/owner');
        }
        else {
          navigate('/');
        }
      }
    } catch (err) {
      setAuthError('Network error. Please try again.');
    }
    setAuthLoading(false);
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authData.email, otp: authData.otp })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setAuthError(data.message || 'OTP verification failed');
      } else {
        setSsoUser(data.user);
        localStorage.setItem('tb_user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('tb_token', data.token);
        setShowAuthModal(false);
        setAuthError('');
        setRequiresOtp(false);
        setAuthData({ email: '', password: '', full_name: '', otp: '', role: 'customer' });
      }
    } catch (err) {
      setAuthError('Network error. Please try again.');
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
      });
    } catch (e) {
      console.error('Logout error', e);
    }
    setSsoUser(null);
    localStorage.removeItem('tb_user');
    localStorage.removeItem('tb_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/75 backdrop-blur-2xl border-b border-zinc-100/50 shadow-[0_2px_20px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex items-center">
              <Link to={ssoUser?.role === 'owner' ? '/owner' : ssoUser?.role === 'admin' ? '/admin' : '/'} className="flex items-center group">
                <img 
                  src="/src/assets/GMD_Tickets.png" 
                  alt="GoMo Deals" 
                  className="h-24 w-auto object-contain scale-[1.35] origin-left hover:scale-[1.4] transition-transform" 
                />
              </Link>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex relative text-zinc-800 focus-within:text-orange-600">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchTerm(val);
                    if (val.trim()) {
                      navigate(`/?search=${encodeURIComponent(val.trim())}`);
                    } else {
                      navigate(`/`);
                    }
                  }}
                  placeholder="Search movies, theatres..." 
                  className="pl-12 pr-4 py-2.5 bg-zinc-100/60 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-orange-200 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all w-80 placeholder-zinc-400 font-medium text-sm"
                />
              </div>

              <div className="relative group">
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold py-2.5 pl-4 pr-10 rounded-full hover:border-orange-300 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer text-sm"
                >
                  {Object.keys(EXCHANGE_RATES).map(curr => (
                    <option key={curr} value={curr}>{EXCHANGE_RATES[curr].symbol} {curr}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none group-hover:text-orange-600 transition-colors" />
              </div>
              
              {ssoUser ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to={ssoUser.role === 'admin' ? '/admin' : ssoUser.role === 'owner' ? '/owner' : '/profile'}
                    className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-full border border-zinc-200 shadow-sm hover:border-orange-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white shadow-sm">
                      {ssoUser.full_name?.charAt(0) || 'U'}
                    </div>
                    <span className="font-bold text-sm hidden sm:block text-zinc-800 truncate max-w-[100px] group-hover:text-orange-600 pr-2">{ssoUser.full_name || 'User'}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-zinc-400 hover:text-red-500 transition-colors p-2.5 bg-zinc-50 rounded-full hover:bg-red-50 border border-transparent hover:border-red-100"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className="flex items-center gap-2 font-bold text-sm bg-zinc-900 px-6 py-2.5 rounded-full text-white hover:bg-orange-600 transition-colors shadow-sm"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12 bg-zinc-50 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-zinc-500">
          <div className="flex justify-center items-center gap-2 mb-6">
            <img src="/src/assets/GMD_Tickets.png" alt="GoMo Deals" className="h-20 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
          </div>
          <p className="text-sm font-medium tracking-wide">© 2026 GoMo Deals Movie Booking. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modal (No Role Selection) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card overflow-hidden max-w-md w-full mx-4 shadow-xl relative animate-slide-up flex flex-col !p-0">
            
            <div className="flex border-b border-orange-100 bg-orange-50">
              <button 
                onClick={() => { setAuthMode('login'); setAuthError(''); setRequiresOtp(false); }}
                className={`flex-1 py-4 font-extrabold text-sm uppercase tracking-wider transition-colors ${authMode === 'login' && !requiresOtp ? 'text-orange-900 bg-white border-t-4 border-t-orange-500' : 'text-orange-400 hover:bg-orange-100 hover:text-orange-600'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setAuthMode('register'); setAuthError(''); setRequiresOtp(false); }}
                className={`flex-1 py-4 font-extrabold text-sm uppercase tracking-wider transition-colors ${authMode === 'register' && !requiresOtp ? 'text-orange-900 bg-white border-t-4 border-t-orange-500' : 'text-orange-400 hover:bg-orange-100 hover:text-orange-600'}`}
              >
                Register
              </button>
            </div>

            {/* Close Modal Button */}
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-[70px] right-4 text-orange-400 hover:text-orange-900 z-10 p-1 bg-orange-50 rounded-full hover:bg-orange-200 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8 bg-white pt-10">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-extrabold text-orange-950">
                  {authMode === 'login' ? 'Welcome Back' : authMode === 'register' ? 'Create Account' : 'Reset Password'}
                </h2>
                <p className="text-orange-600 text-sm mt-1">
                  {authMode === 'login' ? 'Sign in to access your dashboard' : authMode === 'register' ? 'Join the GoMo Deals platform' : 'Enter your email to receive a reset OTP'}
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl text-center">
                  {authError}
                </div>
              )}

              {authSuccessMsg && (
                <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-bold rounded-xl text-center">
                  {authSuccessMsg}
                </div>
              )}

              {requiresOtp ? (
                <form onSubmit={handleOtpVerify} className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-xl text-center mb-6 border border-orange-100">
                    <p className="text-orange-800 font-bold text-sm">We've sent a code to:</p>
                    <p className="text-orange-600 font-medium text-xs mt-1">{authData.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">6-Digit Code</label>
                    <input 
                      type="text" required maxLength="6"
                      placeholder="123456"
                      className="w-full p-3 rounded-sm bg-orange-50 border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-bold text-center text-2xl tracking-widest text-orange-950"
                      value={authData.otp}
                      onChange={(e) => setAuthData({...authData, otp: e.target.value})}
                    />
                  </div>
                  <button 
                  type="submit" 
                  disabled={authLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm uppercase tracking-widest transition-all shadow-[0_5px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_5px_25px_rgba(249,115,22,0.4)] disabled:opacity-50 disabled:cursor-not-allowed rounded-full mt-8"
                >
                  {authLoading ? 'Please Wait...' : (authMode === 'login' ? 'Secure Sign In' : authMode === 'register' ? 'Create Account' : authMode === 'forgot_password' ? 'Request OTP' : 'Reset Password')}
                </button>
                  <button 
                    type="button"
                    onClick={() => setRequiresOtp(false)}
                    className="w-full text-center mt-4 text-xs font-bold text-orange-400 hover:text-orange-600 transition-colors uppercase tracking-widest"
                  >
                    Back
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">Full Name</label>
                      <input 
                        type="text" required
                        className="w-full p-3 rounded-sm bg-orange-50 border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-medium text-orange-950"
                        value={authData.full_name}
                        onChange={(e) => setAuthData({...authData, full_name: e.target.value})}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">Email Address</label>
                    <input 
                      type="email" required
                      className="w-full p-3 rounded-sm bg-orange-50 border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-medium text-orange-950"
                      value={authData.email}
                    onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  />
                </div>

                {authMode !== 'forgot_password' && (
                  <div>
                    <label className="block text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">
                      {authMode === 'reset_password' ? 'New Password' : 'Password'}
                    </label>
                    <input 
                      type="password" required={authMode !== 'forgot_password'}
                      className="w-full p-3 rounded-sm bg-orange-50 border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-medium text-orange-950"
                      value={authData.password}
                      onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    />
                    {authMode === 'login' && (
                      <div className="flex justify-end mt-1">
                        <button 
                          type="button"
                          onClick={() => setAuthMode('forgot_password')}
                          className="text-[10px] font-bold text-orange-600 uppercase tracking-widest hover:text-orange-800"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    )}
                    {authMode === 'register' && authData.password && (
                      <div className="mt-2 flex gap-1 h-1.5 w-full bg-orange-100 rounded-full overflow-hidden">
                        <div className={`h-full ${authData.password.length >= 8 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: '33%' }}></div>
                        <div className={`h-full ${/[A-Za-z]/.test(authData.password) ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: '33%' }}></div>
                        <div className={`h-full ${/[0-9]/.test(authData.password) ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: '34%' }}></div>
                      </div>
                    )}
                    {authMode === 'register' && authData.password && (
                      <div className="flex gap-4 mt-1 text-[10px] uppercase font-bold text-zinc-500">
                        <span className={authData.password.length >= 8 ? 'text-green-600' : ''}>8+ Chars</span>
                        <span className={/[A-Za-z]/.test(authData.password) ? 'text-green-600' : ''}>Letters</span>
                        <span className={/[0-9]/.test(authData.password) ? 'text-green-600' : ''}>Numbers</span>
                      </div>
                    )}
                  </div>
                )}

                {authMode === 'reset_password' && (
                  <div>
                    <label className="block text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">6-Digit Code</label>
                    <input 
                      type="text" required maxLength="6"
                      placeholder="123456"
                      className="w-full p-3 rounded-sm bg-orange-50 border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-bold text-center tracking-widest text-orange-950"
                      value={authData.otp}
                      onChange={(e) => setAuthData({...authData, otp: e.target.value})}
                    />
                  </div>
                )}

                {authMode === 'register' && (
                  <div className="flex items-center gap-2 mt-2 bg-orange-50/50 p-2 rounded border border-orange-100">
                    <input 
                      type="checkbox" 
                      id="ownerRole"
                      checked={authData.role === 'owner'}
                      onChange={(e) => setAuthData({...authData, role: e.target.checked ? 'owner' : 'customer'})}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 border-orange-300"
                    />
                    <label htmlFor="ownerRole" className="text-xs text-orange-900 font-bold uppercase tracking-wide cursor-pointer">Register as Theatre Owner</label>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm uppercase tracking-widest transition-all shadow-[0_5px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_5px_25px_rgba(249,115,22,0.4)] disabled:opacity-50 disabled:cursor-not-allowed rounded-full mt-8"
                >
                  {authLoading ? 'Please Wait...' : (authMode === 'login' ? 'Secure Sign In' : authMode === 'register' ? 'Create Account' : authMode === 'forgot_password' ? 'Request OTP' : 'Reset Password')}
                </button>
                
                {authMode === 'forgot_password' && (
                  <button 
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="w-full text-center mt-4 text-[10px] font-bold text-orange-400 hover:text-orange-600 transition-colors uppercase tracking-widest"
                  >
                    Back to Login
                  </button>
                )}
              </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
