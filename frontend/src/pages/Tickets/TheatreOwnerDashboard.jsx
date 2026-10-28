import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Calendar, Ticket, DollarSign, Plus, X, Settings2, BarChart3, Clock, CheckCircle2, Trash2, Activity, LayoutDashboard, Film, PieChart as PieChartIcon, List as ListIcon, Menu, Users, TrendingUp, Edit2, Award, LogOut, Tag, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';
import { API } from '../../config/ticketApi';
import QRScanner from '../../components/Tickets/QRScanner';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function OwnerDashboard() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('ownerDashboardTab') || 'overview';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ activeScreens: 0, totalTicketsSold: 0, totalRevenueUSD: 0 });
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactionSearchQuery, setTransactionSearchQuery] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);

  const [checkinQuery, setCheckinQuery] = useState('');
  const [checkinResult, setCheckinResult] = useState(null);
  const [checkinError, setCheckinError] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleVerify = (queryStr) => {
    if (!queryStr.trim()) return;
    setCheckinError('');
    setCheckinResult(null);
    fetch(`${API}/api/bookings/${queryStr.trim()}/verify`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
    })
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        setCheckinResult(data);
        setShowScanner(false);
      } else {
        setCheckinError(data.message || 'Booking not found');
      }
    })
    .catch(() => setCheckinError('Connection error'));
  };
  const [formData, setFormData] = useState({ movieId: '', theatre: '', screen: '', time: '', showDate: '', endDate: '', format: '2D', language: 'English', basePrice: '4.00' });
  const [movieFormData, setMovieFormData] = useState({ title: '', duration: '', genre: '', synopsis: '', trailerUrl: '', releaseDate: '' });
  const [movieImageFile, setMovieImageFile] = useState(null);
  const [movieBackdropFile, setMovieBackdropFile] = useState(null);
  const [addons, setAddons] = useState([]);
  const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);
  const [addonFormData, setAddonFormData] = useState({ name: '', price: '' });
  const [addonImageFile, setAddonImageFile] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponFormData, setCouponFormData] = useState({ code: '', discount_type: 'percentage', discount_value: '', min_order_amount: '', expiry_date: '' });
  const [loading, setLoading] = useState(false);
  const [editingShowtimeId, setEditingShowtimeId] = useState(null);
  const [editingMovieId, setEditingMovieId] = useState(null);
  

  const { formatPrice, EXCHANGE_RATES } = useCurrency();
  const [dashboardCurrency, setDashboardCurrency] = useState('USD');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));

  useEffect(() => {
    if (!user || user.role !== 'owner') navigate('/');
    // Check if onboarded
    if (!user.theatre_design) navigate('/owner/onboarding');
  }, [user, navigate]);

  useEffect(() => {
    localStorage.setItem('ownerDashboardTab', activeTab);
  }, [activeTab]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
      });
    } catch (e) {
      console.error('Logout error', e);
    }
    localStorage.removeItem('tb_user');
    localStorage.removeItem('tb_token');
    localStorage.removeItem('sso_user');
    navigate('/');
  }, [navigate]);

  const fetchData = useCallback(() => {
    if (!user) return;

    const handleRes = async (res, setter) => {
      if (res.status === 401) { handleLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        setter(data);
      }
    };

    fetch(`${API}/api/owner/stats?ownerId=${user.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setStats)).catch(console.error);
      
    fetch(`${API}/api/owner/movies?ownerId=${user.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setMovies)).catch(console.error);

    fetch(`${API}/api/owner/showtimes?ownerId=${user.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setShowtimes)).catch(console.error);

    fetch(`${API}/api/owner/recent-bookings?ownerId=${user.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setRecentBookings)).catch(console.error);

    fetch(`${API}/api/owner/transactions?ownerId=${user.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setAllTransactions)).catch(console.error);

    fetch(`${API}/api/owner/analytics?ownerId=${user.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setAnalytics)).catch(console.error);

    fetch(`${API}/api/addons/${user.id}`)
      .then(res => handleRes(res, setAddons)).catch(console.error);

    fetch(`${API}/api/coupons/${user.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setCoupons)).catch(console.error);
  }, [user, handleLogout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddShowtime = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingShowtimeId 
        ? `${API}/api/owner/showtimes/${editingShowtimeId}`
        : `${API}/api/showtimes`;
      const method = editingShowtimeId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('tb_token')}`
        },
        body: JSON.stringify({ ...formData, ownerId: user.id })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingShowtimeId(null);
        setFormData({ movieId: '', theatre: '', screen: '', time: '', showDate: '', endDate: '', format: '2D', language: 'English', basePrice: '4.00' });
        fetchData(); // Refresh data
        showToast(editingShowtimeId ? "Showtime updated successfully!" : "Showtime added successfully!", "success");
      } else {
        showToast(editingShowtimeId ? "Failed to update showtime" : "Failed to add showtime", "error");
      }
    } catch (err) {
      console.error(err);
      showToast(editingShowtimeId ? "Error updating showtime" : "Error adding showtime", "error");
    }
    setLoading(false);
  };

  const handleEditShowtimeClick = (st) => {
    setEditingShowtimeId(st.id);
    const movieId = movies.find(m => m.title === st.movie_title)?.id || '';
    setFormData({
      movieId,
      theatre: st.theatre,
      screen: st.screen,
      time: st.times ? st.times.join(', ') : '',
      showDate: st.show_date ? new Date(st.show_date).toISOString().split('T')[0] : '',
      endDate: '',
      format: st.format || '2D',
      language: st.language || 'English',
      basePrice: st.base_price || '4.00'
    });
    setIsModalOpen(true);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataPayload = new FormData();
    formDataPayload.append('title', movieFormData.title);
    formDataPayload.append('duration', movieFormData.duration);
    formDataPayload.append('genre', movieFormData.genre);
    formDataPayload.append('synopsis', movieFormData.synopsis);
    formDataPayload.append('trailerUrl', movieFormData.trailerUrl);
    if (movieFormData.releaseDate) {
      formDataPayload.append('releaseDate', movieFormData.releaseDate);
    }
    formDataPayload.append('ownerId', user.id);
    if (movieImageFile) {
      formDataPayload.append('image', movieImageFile);
    }
    if (movieBackdropFile) {
      formDataPayload.append('backdrop', movieBackdropFile);
    }

    try {
      const url = editingMovieId
        ? `${API}/api/owner/movies/${editingMovieId}`
        : `${API}/api/owner/movies`;
      const method = editingMovieId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` },
        // Omit Content-Type so browser sets it to multipart/form-data with the boundary
        body: formDataPayload
      });
      if (res.ok) {
        setIsMovieModalOpen(false);
        setEditingMovieId(null);
        setMovieFormData({ title: '', duration: '', genre: '', synopsis: '', trailerUrl: '' });
        setMovieImageFile(null);
        setMovieBackdropFile(null);
        fetchData();
        showToast(editingMovieId ? "Movie updated successfully!" : "Movie added successfully to your catalog!", "success");
      } else {
        showToast(editingMovieId ? "Failed to update movie" : "Failed to add movie", "error");
      }
    } catch (err) {
      console.error(err);
      showToast(editingMovieId ? "Error updating movie" : "Error adding movie", "error");
    }
    setLoading(false);
  };

  const handleEditMovieClick = (movie) => {
    setEditingMovieId(movie.id);
    setMovieFormData({
      title: movie.title,
      duration: movie.duration,
      genre: movie.genre ? movie.genre.join(', ') : '',
      synopsis: movie.synopsis,
      trailerUrl: movie.trailer_url || '',
      releaseDate: movie.release_date ? movie.release_date.split('T')[0] : ''
    });
    setMovieImageFile(null);
    setMovieBackdropFile(null);
    setIsMovieModalOpen(true);
  };

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      const res = await fetch(`${API}/api/owner/movies/${movieId}?ownerId=${user.id}`, { 
        method: 'DELETE'
      , headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } });
      const data = await res.json();
      if (res.ok) {
        fetchData();
        showToast("Movie removed successfully!", "success");
      } else {
        showToast(data.message || "Failed to remove movie", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error removing movie", "error");
    }
  };

  const handleDeleteShowtime = async (showtimeId) => {
    if (!window.confirm("Are you sure you want to delete this showtime?")) return;
    try {
      const res = await fetch(`${API}/api/owner/showtimes/${showtimeId}?ownerId=${user.id}`, { 
        method: 'DELETE'
      , headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } });
      const data = await res.json();
      if (res.ok) {
        fetchData();
        showToast("Showtime removed successfully!", "success");
      } else {
        showToast(data.message || "Failed to remove showtime", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error removing showtime", "error");
    }
  };

  const handleAddAddon = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataPayload = new FormData();
    formDataPayload.append('name', addonFormData.name);
    formDataPayload.append('price', addonFormData.price);
    formDataPayload.append('ownerId', user.id);
    if (addonImageFile) {
      formDataPayload.append('image', addonImageFile);
    }

    try {
      const res = await fetch(`${API}/api/owner/addons`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` },
        body: formDataPayload
      });
      if (res.ok) {
        setIsAddonModalOpen(false);
        setAddonFormData({ name: '', price: '' });
        setAddonImageFile(null);
        fetchData();
        showToast("Add-on added successfully!", "success");
      } else {
        showToast("Failed to add add-on", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error adding add-on", "error");
    }
    setLoading(false);
  };

  const handleDeleteAddon = async (addonId) => {
    if (!window.confirm("Are you sure you want to delete this add-on?")) return;
    try {
      const res = await fetch(`${API}/api/owner/addons/${addonId}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
      });
      if (res.ok) {
        fetchData();
        showToast("Add-on removed successfully!", "success");
      } else {
        showToast("Failed to remove add-on", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error removing add-on", "error");
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/coupons`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('tb_token')}`
        },
        body: JSON.stringify({ ...couponFormData, owner_id: user.id })
      });
      if (res.ok) {
        setIsCouponModalOpen(false);
        setCouponFormData({ code: '', discount_type: 'percentage', discount_value: '', min_order_amount: '', expiry_date: '' });
        fetchData();
        showToast("Coupon added successfully!", "success");
      } else {
        const data = await res.json();
        showToast(data.message || "Failed to add coupon", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error adding coupon", "error");
    }
    setLoading(false);
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      const res = await fetch(`${API}/api/coupons/${couponId}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
      });
      if (res.ok) {
        fetchData();
        showToast("Coupon removed successfully!", "success");
      } else {
        showToast("Failed to remove coupon", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error removing coupon", "error");
    }
  };

  if (!user || !user.theatre_design) return null;

  return (
    <div className="owner-dashboard">
      <div className="flex-1 w-full p-4 md:p-8 relative z-10 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between modern-card p-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-slate-900 p-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Building size={20} />
            </div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">Partner Workspace</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-indigo-600 p-2 hover:bg-slate-100 rounded-lg transition-colors">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 shrink-0 flex-col gap-8`}>
          <div className="hidden md:flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-slate-900 p-3 rounded-2xl shadow-md">
              <Building size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">Partner</h1>
              <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">Workspace</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} /> Overview
            </button>
            <button 
              onClick={() => { setActiveTab('showtimes'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'showtimes' ? 'active' : ''}`}
            >
              <Clock size={18} /> Managed Showtimes
            </button>
            <button 
              onClick={() => { setActiveTab('movies'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'movies' ? 'active' : ''}`}
            >
              <Film size={18} /> Movie Catalog
            </button>
            <button 
              onClick={() => { setActiveTab('analysis'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'analysis' ? 'active' : ''}`}
            >
              <PieChartIcon size={18} /> Analysis
            </button>
            <button 
              onClick={() => { setActiveTab('transactions'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'transactions' ? 'active' : ''}`}
            >
              <ListIcon size={18} /> Transactions
            </button>
            <button 
              onClick={() => { setActiveTab('addons'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'addons' ? 'active' : ''}`}
            >
              <Award size={18} /> F&B Add-ons
            </button>
            <button 
              onClick={() => { setActiveTab('coupons'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'coupons' ? 'active' : ''}`}
            >
              <Tag size={18} /> Promo Coupons
            </button>
            <button 
              onClick={() => { setActiveTab('checkin'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm ${activeTab === 'checkin' ? 'active' : ''}`}
            >
              <Ticket size={18} /> Verify Check-in
            </button>
            <Link 
              to="/owner/onboarding"
              className="flex items-center gap-3 px-5 py-4 font-bold transition-all text-sm mt-4"
            >
              <Settings2 size={18} /> Configure Layout
            </Link>
          </nav>
          
          <div className="mt-auto pt-8 border-t border-slate-200">
            <div className="modern-card p-4 border-0 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Account</span>
              </div>
              <p className="text-xs text-slate-500 truncate">{user.business_info?.businessName || user.full_name}</p>
              <p className="text-xs text-slate-500 mt-1">ID: {user.business_info?.gstNumber}</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 font-bold text-sm rounded-xl hover:bg-red-100 transition-colors"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Welcome back, {user.business_info?.businessName || user.full_name}</h2>
                  <p className="text-sm text-slate-500 mt-1">Here's what's happening with your business today.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setIsMovieModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
                    <Film size={16} /> Deploy Movie
                  </button>
                  <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                    <Clock size={16} /> Schedule Showtime
                  </button>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="modern-card p-6 group hover:-translate-y-1">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 transition-colors group-hover:bg-indigo-50">
                    <Calendar size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Movies</p>
                  <p className="text-3xl font-black text-slate-900">{stats.activeMovies || 0}</p>
                </div>
                <div className="modern-card p-6 group hover:-translate-y-1">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 transition-colors group-hover:bg-indigo-50">
                    <Ticket size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tickets Sold</p>
                  <p className="text-3xl font-black text-slate-900">{stats.totalTicketsSold}</p>
                </div>
                <div className="modern-card p-6 group hover:-translate-y-1">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 transition-colors group-hover:bg-indigo-50">
                    <Building size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Screens</p>
                  <p className="text-3xl font-black text-slate-900">{showtimes.length}</p>
                </div>
                <div className="modern-card p-6 group hover:-translate-y-1">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 transition-colors group-hover:bg-indigo-50">
                    <Users size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Occupancy</p>
                  <p className="text-3xl font-black text-slate-900">{analytics?.avgOccupancy ? analytics.avgOccupancy.toFixed(1) : 0}%</p>
                </div>
                <div className="modern-card bg-indigo-50 border-indigo-200 p-6 relative overflow-hidden group hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 blur-[40px]"></div>
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                    <DollarSign size={20} />
                  </div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Total Revenue</p>
                  <p className="text-3xl font-black text-slate-900">
                    {(() => {
                      const rate = EXCHANGE_RATES?.[dashboardCurrency]?.rate || 1;
                      const sym = EXCHANGE_RATES?.[dashboardCurrency]?.symbol || '$';
                      return `${sym}${((stats.totalRevenueUSD || 0) * rate).toFixed(2)}`;
                    })()}
                  </p>
                </div>
              </div>

              {/* Chart & Quick Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 modern-card p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp size={18} className="text-indigo-600" /> Revenue Trend
                    </h3>
                  <select
                    value={dashboardCurrency}
                    onChange={e => setDashboardCurrency(e.target.value)}
                    className="text-xs font-bold border border-slate-200 rounded-lg px-2 py-1 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                  >
                    {EXCHANGE_RATES && Object.entries(EXCHANGE_RATES).map(([code, info]) => (
                      <option key={code} value={code}>{code} ({info.symbol})</option>
                    ))}
                  </select>
                  </div>
                  <div className="h-64 w-full">
                    {analytics?.revenueByDay && analytics.revenueByDay.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analytics.revenueByDay.map(d => ({
                            ...d,
                            revenue: d.revenue * (EXCHANGE_RATES?.[dashboardCurrency]?.rate || 1)
                          }))}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatDate(val)} />
                          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${EXCHANGE_RATES?.[dashboardCurrency]?.symbol || '$'}${val.toFixed(0)}`} width={80} />
                          <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                            formatter={(value) => [`${EXCHANGE_RATES?.[dashboardCurrency]?.symbol || '$'}${value.toFixed(2)}`, 'Revenue']}
                            labelFormatter={(label) => formatDate(label)}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <Activity size={32} className="mb-2 opacity-20" />
                        <p className="text-sm font-medium">Not enough data to display trend</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="modern-card p-0 flex flex-col">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <LayoutDashboard size={18} className="text-indigo-600" /> Quick Snapshot
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col gap-6 flex-grow justify-center">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Top Performing Theatre</p>
                      <p className="font-bold text-slate-900 text-lg">
                        {analytics?.theatreRevenue && analytics.theatreRevenue.length > 0 
                          ? analytics.theatreRevenue[0].theatre 
                          : "N/A"}
                      </p>
                    </div>
                    <div className="h-px w-full bg-slate-100"></div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Highest Seat Tier</p>
                      <p className="font-bold text-slate-900 text-lg">
                        {analytics?.seatTiers && analytics.seatTiers.length > 0
                          ? analytics.seatTiers[0].tier
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

        {/* Recent Bookings */}
        <div className="mt-16 modern-card overflow-hidden border-0">
          <div className="p-8 border-b border-slate-200 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Activity className="text-indigo-600" size={24}/> Recent Transactions
            </h2>
          </div>
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Booking Date</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Movie</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Customer</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Seats</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] text-right bg-transparent border-b border-slate-200">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center text-slate-500 font-medium border-0">
                      <div className="flex flex-col items-center gap-3">
                        <DollarSign size={48} className="opacity-20" />
                        <p>No recent transactions found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                    <tr key={booking.booking_id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-5 px-6 border-0">
                        <div className="text-slate-800 font-bold text-sm">{formatDate(booking.created_at)}</div>
                        <div className="text-xs text-slate-500">{new Date(booking.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </td>
                      <td className="py-5 px-6 border-0">
                        <div className="text-slate-800 font-bold">{booking.title}</div>
                        <div className="text-xs text-slate-500">{booking.theatre} • Screen {booking.screen}</div>
                        <div className="text-[10px] text-slate-500">{formatDate(booking.booking_date)} at {booking.booking_time}</div>
                      </td>
                      <td className="py-5 px-6 text-slate-700 font-medium text-sm border-0">
                        {booking.email.replace(/(.{2})(.*)(?=@)/, (match, p1, p2) => p1 + '*'.repeat(p2.length))}
                      </td>
                      <td className="py-5 px-6 border-0">
                        <span className="text-xs font-black uppercase tracking-widest badge-indigo px-2.5 py-1 rounded-md inline-block">
                          {booking.seats.length} Tickets
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1">{booking.seats.join(', ')}</div>
                      </td>
                      <td className="py-5 px-6 text-right border-0">
                        <div className="text-sm font-bold text-emerald-600">+{formatPrice(booking.total_revenue || 0)}</div>
                        <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-black uppercase tracking-widest badge-emerald px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={10} /> Paid
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        
            </div>
          )}

          {activeTab === 'showtimes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Managed Showtimes</h2>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  disabled={movies.length === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                    movies.length === 0 
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-500 to-violet-600 text-slate-900 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                  title={movies.length === 0 ? "Deploy a movie first" : ""}
                >
                  <Plus size={16} /> Deploy Showtime
                </button>
              </div>

{/* Showtimes Table */}
        <div className="modern-card overflow-hidden border-0">
          <div className="p-8 border-b border-slate-200 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Clock className="text-indigo-600" size={24}/> Managed Showtimes
            </h2>
          </div>
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Schedule</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Details</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Location</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] bg-transparent border-b border-slate-200">Occupancy</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] text-right bg-transparent border-b border-slate-200">Status</th>
                  <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] text-right bg-transparent border-b border-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {showtimes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-slate-500 font-medium border-0">
                      <div className="flex flex-col items-center gap-3">
                        <Building size={48} className="opacity-20" />
                        <p>No active showtimes found. Deploy your first showtime!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  showtimes.map((st) => {
                    const percentage = (st.booked_seats / st.total_seats) * 100;
                    return (
                      <tr key={st.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-5 px-6 font-bold text-slate-800 border-0">{st.movie_title}</td>
                        <td className="py-5 px-6 text-slate-500 font-medium border-0">
                          <div className="text-slate-800">{formatDate(st.show_date)}</div>
                          <div className="text-xs">{st.times ? st.times.join(', ') : st.time}</div>
                        </td>
                        <td className="py-5 px-6 border-0">
                          <div className="flex gap-2 mb-1">
                            <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-indigo-600 px-2 py-0.5 rounded">{st.format || '2D'}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-indigo-600 px-2 py-0.5 rounded">{st.language || 'English'}</span>
                          </div>
                          <div className="text-xs font-bold text-emerald-600">{formatPrice(st.base_price || 4)}</div>
                        </td>
                        <td className="py-5 px-6 border-0">
                          <span className="text-slate-800 font-bold">{st.theatre}</span>
                          <span className="text-slate-500 text-sm ml-2">• Screen {st.screen}</span>
                        </td>
                        <td className="py-5 px-6 border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[120px] overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${percentage > 80 ? 'bg-rose-600 ' : 'bg-indigo-600 '}`} 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500 font-bold w-12 text-right">{st.booked_seats || 0}/{st.total_seats || 80}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-right border-0">
                          <span className={`inline-flex items-center justify-center text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${percentage > 90 ? 'bg-rose-50 border-rose-200 text-rose-600' : 'badge-emerald'}`}>
                            {percentage > 90 ? 'High Demand' : 'Booking'}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-right border-0">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEditShowtimeClick(st)}
                              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                              title="Edit Showtime"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteShowtime(st.id)}
                              className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                              title="Delete Showtime"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        
            </div>
          )}

          {activeTab === 'movies' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Your Movie Catalog</h2>
                <button 
                  onClick={() => setIsMovieModalOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-slate-900 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <Plus size={16} /> Deploy Movie
                </button>
              </div>

{/* Movie Catalog Grid */}
        <div className="mt-16 modern-card overflow-hidden border-0">
          <div className="p-8 border-b border-slate-200 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Ticket className="text-indigo-600" size={24}/> Your Movie Catalog
            </h2>
          </div>
          <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
            {movies.length === 0 ? (
              <div className="col-span-full py-16 text-center text-slate-500 font-medium">
                <p>No movies in your catalog. Click "Deploy Movie" to add one.</p>
              </div>
            ) : (
              movies.map((m) => (
                <div key={m.id} className="modern-card flex flex-col sm:flex-row p-0 border-slate-200 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] transition-all duration-300 group bg-white overflow-hidden">
                  <div className="w-full sm:w-48 relative overflow-hidden bg-slate-100 shrink-0 min-h-[240px] sm:min-h-0">
                    {m.poster ? (
                      <img src={m.poster} alt={m.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                        <Film size={32} className="mb-2 opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEditMovieClick(m); }}
                        className="bg-white/95 text-indigo-600 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-md"
                        title="Edit Movie"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteMovie(m.id); }}
                        className="bg-white/95 text-rose-500 p-2 rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-md"
                        title="Remove Movie"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <h3 className="font-black text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors truncate">{m.title}</h3>
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md whitespace-nowrap shrink-0 border border-indigo-100">{m.duration}</span>
                      </div>
                      
                      <div className="flex gap-1.5 flex-wrap mb-4">
                        {m.genre && m.genre.map((g, i) => (
                          <span key={i} className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">{g}</span>
                        ))}
                      </div>
                      
                      <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">{m.synopsis}</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase font-black mb-1 tracking-widest">Revenue</span>
                        <span className="text-sm font-black text-emerald-600">{formatPrice(m.revenue || 0)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase font-black mb-1 tracking-widest">Tickets</span>
                        <span className="text-sm font-black text-slate-800">{m.ticketsSold || 0}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase font-black mb-1 tracking-widest">Screens</span>
                        <span className="text-sm font-black text-indigo-600">{m.activeScreens || 0} active</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
            </div>
          )}

          {activeTab === 'addons' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Food & Beverage Add-ons</h2>
                <button 
                  onClick={() => setIsAddonModalOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-slate-900 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <Plus size={16} /> New Add-on
                </button>
              </div>

              <div className="mt-16 modern-card overflow-hidden border-0">
                <div className="p-8 border-b border-slate-200 flex justify-between items-center bg-white">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <Award className="text-indigo-600" size={24}/> Your Add-ons
                  </h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {addons.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 font-medium">
                      <p>No add-ons available. Click "New Add-on" to create one.</p>
                    </div>
                  ) : (
                    addons.map((a) => (
                      <div key={a.id} className="modern-card flex p-0 border-slate-200 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] transition-all duration-300 group bg-white overflow-hidden">
                        <div className="w-24 relative overflow-hidden bg-slate-100 shrink-0">
                          {a.image_url ? (
                            <img src={a.image_url} alt={a.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                          ) : (
                            <div className="absolute inset-0 w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                              <Award size={24} className="opacity-50" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-grow justify-between min-w-0">
                          <div>
                            <h3 className="font-black text-lg text-slate-900 leading-tight truncate">{a.name}</h3>
                            <p className="text-indigo-600 font-bold mt-1">{formatPrice(a.price)}</p>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button 
                              onClick={() => handleDeleteAddon(a.id)}
                              className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Promo Coupons</h2>
                <button 
                  onClick={() => setIsCouponModalOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <Plus size={16} /> New Coupon
                </button>
              </div>

              <div className="modern-card overflow-hidden border-0">
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coupons.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 font-medium">
                      <p>No coupons active. Create one to run a promotion!</p>
                    </div>
                  ) : (
                    coupons.map((c) => (
                      <div key={c.id} className="relative bg-white border-2 border-dashed border-emerald-300 rounded-2xl p-6 hover:border-emerald-500 transition-colors">
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-r-2 border-dashed border-emerald-300"></div>
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-l-2 border-dashed border-emerald-300"></div>
                        
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="bg-emerald-100 text-emerald-700 font-black text-xl px-3 py-1 rounded tracking-widest">{c.code}</span>
                          </div>
                          <button onClick={() => handleDeleteCoupon(c.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <h3 className="font-bold text-slate-700 text-lg">
                          {c.discount_type === 'percentage' ? `${c.discount_value}% OFF` : `$${c.discount_value} OFF`}
                        </h3>
                        <div className="mt-4 space-y-1 text-sm text-slate-500 font-medium">
                          <p>Min Order: ${c.min_order_amount}</p>
                          <p>Expires: {c.expiry_date ? new Date(c.expiry_date).toLocaleDateString() : 'Never'}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && analytics && !analytics.error && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Business Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <div className="modern-card p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="text-indigo-600" size={20} /> Revenue Over Time
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.revenueByDay}>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatDate(value)} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatPrice(value)} width={80} />
                        <RechartsTooltip 
                          cursor={{fill: '#f1f5f9'}}
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' }}
                          formatter={(value) => [formatPrice(value), 'Revenue']}
                          labelFormatter={(label) => formatDate(label)}
                        />
                        <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Seat Tiers Chart */}
                <div className="modern-card p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <PieChartIcon className="text-indigo-600" size={20} /> Ticket Tiers Breakdown
                  </h3>
                  <div className="h-[300px] relative">
                    {analytics.seatTiers.length === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-500">No data</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={analytics.seatTiers} 
                            cx="50%" cy="50%" 
                            innerRadius={60} outerRadius={100} 
                            paddingAngle={5} dataKey="value"
                          >
                            {analytics.seatTiers.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    {analytics.seatTiers.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-xs text-slate-500 font-bold">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="modern-card p-8 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="absolute -bottom-10 -right-10 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Activity size={200} className="text-emerald-600" />
                  </div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 relative z-10 flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" /> Average Occupancy Rate
                  </h3>
                  <div className="flex flex-col relative z-10 mt-6">
                    <p className="text-6xl font-black text-slate-900 mb-8 group-hover:text-emerald-600 transition-colors">{analytics.avgOccupancy}%</p>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(analytics.avgOccupancy, 100)}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="modern-card p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Award className="text-indigo-600" size={14} /> Top Performing Theatres
                  </h3>
                  <div className="space-y-6">
                    {analytics.theatreRevenue.slice(0,3).map((th, i) => (
                      <div key={i} className="flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-black shadow-sm ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-slate-200 text-slate-600' : 'bg-orange-100 text-orange-600'}`}>{i + 1}</span>
                          <span className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{th.theatre}</span>
                        </div>
                        <span className="text-base font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">{formatPrice(th.revenue)}</span>
                      </div>
                    ))}
                    {analytics.theatreRevenue.length === 0 && <p className="text-slate-500 text-sm text-center py-8">No data available yet</p>}
                  </div>
              </div>
            </div>

            {/* Add-on Analytics & Heatmap Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                
                {/* Add-on Revenue List */}
                <div className="modern-card p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Award className="text-indigo-600" size={14} /> F&B Add-on Revenue
                  </h3>
                  <div className="space-y-4">
                    {analytics.addonAnalytics && analytics.addonAnalytics.length > 0 ? analytics.addonAnalytics.map((addon, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{addon.name}</p>
                          <p className="text-xs text-slate-500">{addon.quantity} Sold</p>
                        </div>
                        <span className="font-black text-emerald-600">{formatPrice(addon.revenue)}</span>
                      </div>
                    )) : (
                      <p className="text-slate-500 text-sm text-center py-8">No add-on sales yet</p>
                    )}
                  </div>
                </div>

                {/* Occupancy Heatmap */}
                <div className="lg:col-span-2 modern-card p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-x-auto">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Activity className="text-indigo-600" size={14} /> Occupancy Heatmap (Seats Booked)
                  </h3>
                  <div className="min-w-[500px]">
                    <div className="flex mb-2">
                      <div className="w-12 shrink-0"></div>
                      {['10:00','12:00','14:00','16:00','18:00','20:00','22:00'].map(h => (
                        <div key={h} className="flex-1 text-center text-[10px] font-bold text-slate-400">{h}</div>
                      ))}
                    </div>
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                      <div key={day} className="flex items-center mb-2">
                        <div className="w-12 shrink-0 text-xs font-bold text-slate-500">{day}</div>
                        {['10:00','12:00','14:00','16:00','18:00','20:00','22:00'].map(hour => {
                          const dataPoint = analytics.heatmapData?.find(d => d.day === day && d.hour === hour);
                          const booked = dataPoint ? dataPoint.booked : 0;
                          
                          // Calculate color intensity (simplified)
                          let bgClass = "bg-slate-100";
                          let textClass = "text-slate-400";
                          if (booked > 0 && booked <= 10) { bgClass = "bg-emerald-200"; textClass = "text-emerald-800"; }
                          else if (booked > 10 && booked <= 30) { bgClass = "bg-emerald-400"; textClass = "text-white"; }
                          else if (booked > 30) { bgClass = "bg-emerald-600"; textClass = "text-white"; }

                          return (
                            <div key={hour} className="flex-1 px-1">
                              <div 
                                className={`h-10 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors hover:ring-2 hover:ring-indigo-400 cursor-help ${bgClass} ${textClass}`}
                                title={`${day} ${hour} - ${booked} seats booked`}
                              >
                                {booked > 0 ? booked : ''}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                    <div className="flex items-center gap-4 mt-6 justify-center">
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-slate-100"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">0</span></div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-200"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">1-10</span></div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-400"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">11-30</span></div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-600"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">31+</span></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Full Transaction History</h2>
              
              <div className="modern-card overflow-hidden border-0 p-0">
                <div className="p-8 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <ListIcon className="text-indigo-600" size={24}/> All Transactions
                  </h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <input 
                      type="text" 
                      placeholder="Search by customer or movie..." 
                      value={transactionSearchQuery}
                      onChange={(e) => setTransactionSearchQuery(e.target.value)}
                      className="w-full sm:w-64 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => {
                        const filtered = allTransactions.filter(t =>
                          t.title.toLowerCase().includes(transactionSearchQuery.toLowerCase()) ||
                          t.email.toLowerCase().includes(transactionSearchQuery.toLowerCase())
                        );
                        const headers = ['Booking Date', 'Movie', 'Theatre', 'Screen', 'Show Date', 'Show Time', 'Customer Email', 'Seats', 'Revenue (USD)'];
                        const rows = filtered.map(b => [
                          new Date(b.created_at).toLocaleDateString(),
                          b.title,
                          b.theatre,
                          b.screen,
                          b.booking_date,
                          b.booking_time,
                          b.email,
                          b.seats.join(' | '),
                          (b.total_revenue || 0).toFixed(2)
                        ]);
                        const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
                        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `GoMo_Transactions_${new Date().toISOString().slice(0,10)}.csv`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      <Download size={15} /> Export CSV
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-50 z-10 shadow-md">
                      <tr>
                        <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] border-b border-slate-200">Booking Date</th>
                        <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] border-b border-slate-200">Movie</th>
                        <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] border-b border-slate-200">Customer</th>
                        <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] border-b border-slate-200">Seats</th>
                        <th className="py-5 px-6 font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] text-right border-b border-slate-200">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allTransactions.filter(t => 
                          t.title.toLowerCase().includes(transactionSearchQuery.toLowerCase()) || 
                          t.email.toLowerCase().includes(transactionSearchQuery.toLowerCase())
                        ).length === 0 ? (
                        <tr>
                          <td colSpan="5" className="py-16 text-center text-slate-500 font-medium border-0">
                            <p>No transactions found.</p>
                          </td>
                        </tr>
                      ) : (
                        allTransactions
                          .filter(t => 
                            t.title.toLowerCase().includes(transactionSearchQuery.toLowerCase()) || 
                            t.email.toLowerCase().includes(transactionSearchQuery.toLowerCase())
                          )
                          .map((booking) => (
                          <tr key={booking.booking_id} className="hover:bg-slate-50 transition-colors group">
                            <td className="py-5 px-6 border-0">
                              <div className="text-slate-800 font-bold text-sm">{formatDate(booking.created_at)}</div>
                              <div className="text-xs text-slate-500">{new Date(booking.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            </td>
                            <td className="py-5 px-6 border-0">
                              <div className="text-slate-800 font-bold">{booking.title}</div>
                              <div className="text-xs text-slate-500">{booking.theatre} • Screen {booking.screen}</div>
                              <div className="text-[10px] text-slate-500">{formatDate(booking.booking_date)} at {booking.booking_time}</div>
                            </td>
                            <td className="py-5 px-6 text-slate-700 font-medium text-sm border-0">
                              {booking.email.replace(/(.{2})(.*)(?=@)/, (match, p1, p2) => p1 + '*'.repeat(p2.length))}
                            </td>
                            <td className="py-5 px-6 border-0">
                              <span className="text-xs font-black uppercase tracking-widest badge-indigo px-2.5 py-1 rounded-md inline-block">
                                {booking.seats.length} Tickets
                              </span>
                              <div className="text-[10px] text-slate-500 mt-1">{booking.seats.join(', ')}</div>
                            </td>
                            <td className="py-5 px-6 text-right border-0">
                              <div className="text-sm font-bold text-emerald-600">+{formatPrice(booking.total_revenue || 0)}</div>
                              <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-black uppercase tracking-widest badge-emerald px-2 py-0.5 rounded-full">
                                <CheckCircle2 size={10} /> Paid
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checkin' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Verify Check-in</h2>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40">
                <div className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="e.g. b_xyz123..." 
                      value={checkinQuery}
                      onChange={(e) => setCheckinQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleVerify(checkinQuery);
                      }}
                      className="flex-1 px-6 py-4 border-2 border-indigo-100 bg-white rounded-2xl text-lg font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm placeholder:font-medium placeholder:text-slate-300"
                    />
                    <button 
                      onClick={() => handleVerify(checkinQuery)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-95"
                    >
                      Lookup
                    </button>
                    <button 
                      onClick={() => setShowScanner(!showScanner)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center"
                      title="Scan QR Code"
                    >
                      📷
                    </button>
                  </div>

                  {showScanner && (
                    <div className="mb-8">
                      <QRScanner 
                        onScanSuccess={(decodedText) => {
                          setShowScanner(false);
                          setCheckinQuery(decodedText);
                          handleVerify(decodedText);
                        }} 
                      />
                    </div>
                  )}

                  {checkinError && (
                    <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl flex items-start gap-4 border border-rose-100 animate-slide-up shadow-sm">
                      <X className="shrink-0 mt-0.5" size={24} />
                      <div>
                        <p className="font-black text-lg">Verification Failed</p>
                        <p className="text-sm font-medium mt-1 opacity-80">{checkinError}</p>
                      </div>
                    </div>
                  )}

                  {checkinResult && (
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm animate-slide-up">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h4 className="font-black text-slate-900 text-2xl mb-2">{checkinResult.title}</h4>
                          <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                            <Building size={16} /> {checkinResult.theatre}
                          </p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-2 ${
                          checkinResult.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          checkinResult.checked_in ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {checkinResult.status === 'cancelled' ? <><X size={16}/> Cancelled</> : 
                            checkinResult.checked_in ? <><Activity size={16}/> Already Used</> : 
                            <><CheckCircle2 size={16}/> Valid Entry</>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div>
                          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1.5">Customer Email</p>
                          <p className="font-bold text-slate-700 truncate text-base" title={checkinResult.email}>{checkinResult.email}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1.5">Selected Seats</p>
                          <p className="font-black text-indigo-600 text-lg">{checkinResult.seats.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1.5">Date & Time</p>
                          <p className="font-bold text-slate-700 text-base">{checkinResult.booking_date} at {checkinResult.booking_time}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1.5">Ticket ID</p>
                          <p className="font-mono font-bold text-slate-500 text-sm truncate" title={checkinResult.id}>{checkinResult.id}</p>
                        </div>
                      </div>

                      {!checkinResult.checked_in && checkinResult.status !== 'cancelled' && (
                        <button 
                          onClick={() => {
                            fetch(`${API}/api/bookings/${checkinResult.id}/checkin`, {
                              method: 'POST',
                              headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
                            })
                            .then(res => res.json().then(data => ({ status: res.status, data })))
                            .then(({ status, data }) => {
                              if (status === 200) {
                                setCheckinResult(prev => ({...prev, checked_in: true, checked_in_at: new Date().toISOString()}));
                                showToast(data.message || 'Check-in successful!', 'success');
                              } else {
                                showToast(data.message || 'Check-in failed', 'error');
                              }
                            })
                            .catch(() => showToast('Connection error', 'error'));
                          }}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl transition-all hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Confirm Entry Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Add Showtime Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-300 rounded-3xl p-10 max-w-lg w-full shadow-2xl relative animate-slide-up max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{editingShowtimeId ? 'Update Showtime' : 'Deploy New Showtime'}</h2>
            <p className="text-slate-500 text-sm mb-8">{editingShowtimeId ? 'Modify details for this showtime. (Changes will apply to future bookings)' : 'This will immediately open bookings using your custom layout.'}</p>
            
            <form onSubmit={handleAddShowtime} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Select Movie</label>
                <select 
                  required
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all appearance-none"
                  value={formData.movieId}
                  onChange={(e) => setFormData({...formData, movieId: e.target.value})}
                >
                  <option value="" disabled>-- Choose a movie --</option>
                  {movies.map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Theatre Branch</label>
                <input 
                  type="text" required
                  placeholder="e.g. GoMo Cinema, Downtown"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                  value={formData.theatre}
                  onChange={(e) => setFormData({...formData, theatre: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Screen #</label>
                  <input 
                    type="number" required min="1"
                    placeholder="e.g. 1"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                    value={formData.screen}
                    onChange={(e) => setFormData({...formData, screen: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Times (Comma separated)</label>
                  <input 
                    type="text" required
                    placeholder="e.g. 10:00, 14:30, 18:00"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Start Date</label>
                  <input 
                    type="date" required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.showDate}
                    onChange={(e) => setFormData({...formData, showDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">End Date (Optional)</label>
                  <input 
                    type="date"
                    min={formData.showDate || undefined}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Base Price (USD)</label>
                  <input 
                    type="number" required min="1" step="0.01"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Format</label>
                  <select 
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all appearance-none"
                    value={formData.format}
                    onChange={(e) => setFormData({...formData, format: e.target.value})}
                  >
                    <option value="2D">2D Standard</option>
                    <option value="3D">3D Experience</option>
                    <option value="IMAX">IMAX</option>
                    <option value="4DX">4DX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Language</label>
                  <input 
                    type="text" required
                    placeholder="e.g. English"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full mt-8 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-indigo-600 hover:text-white hover:shadow-md transition-all duration-300"
              >
                {loading ? 'Processing...' : (editingShowtimeId ? 'Update Showtime' : 'Deploy to Production')}
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Add-on Modal */}
      {isAddonModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-300 rounded-3xl p-10 max-w-lg w-full shadow-2xl relative animate-slide-up">
            <button 
              onClick={() => setIsAddonModalOpen(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Add New F&B Item</h2>
            <p className="text-slate-500 text-sm mb-8">Offer snacks and beverages to your customers.</p>
            
            <form onSubmit={handleAddAddon} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Item Name</label>
                <input 
                  type="text" required
                  placeholder="e.g. Large Popcorn"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                  value={addonFormData.name}
                  onChange={(e) => setAddonFormData({...addonFormData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Price (USD)</label>
                <input 
                  type="number" required min="0.01" step="0.01"
                  placeholder="e.g. 5.99"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                  value={addonFormData.price}
                  onChange={(e) => setAddonFormData({...addonFormData, price: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Image</label>
                <input 
                  type="file"
                  accept="image/*"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-slate-900 hover:file:bg-indigo-600"
                  onChange={(e) => setAddonImageFile(e.target.files[0])}
                />
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full mt-8 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-indigo-600 hover:shadow-md transition-all duration-300"
              >
                {loading ? 'Processing...' : 'Create Add-on'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-300 rounded-3xl p-10 max-w-lg w-full shadow-2xl relative animate-slide-up">
            <button 
              onClick={() => setIsCouponModalOpen(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Create Promo Coupon</h2>
            
            <form onSubmit={handleAddCoupon} className="space-y-5 mt-8">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Coupon Code</label>
                <input 
                  type="text" required uppercase="true"
                  placeholder="e.g. SUMMER50"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-black uppercase tracking-widest focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-slate-400"
                  value={couponFormData.code}
                  onChange={(e) => setCouponFormData({...couponFormData, code: e.target.value.toUpperCase()})}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Discount Type</label>
                  <select 
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    value={couponFormData.discount_type}
                    onChange={(e) => setCouponFormData({...couponFormData, discount_type: e.target.value})}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Value</label>
                  <input 
                    type="number" required min="1" step={couponFormData.discount_type === 'flat' ? "0.01" : "1"}
                    placeholder={couponFormData.discount_type === 'percentage' ? "e.g. 20" : "e.g. 5.00"}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-slate-400"
                    value={couponFormData.discount_value}
                    onChange={(e) => setCouponFormData({...couponFormData, discount_value: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Min Order ($)</label>
                  <input 
                    type="number" min="0" step="0.01"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    value={couponFormData.min_order_amount}
                    onChange={(e) => setCouponFormData({...couponFormData, min_order_amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Expiry Date</label>
                  <input 
                    type="date" min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    value={couponFormData.expiry_date}
                    onChange={(e) => setCouponFormData({...couponFormData, expiry_date: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full mt-8 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-emerald-700 hover:shadow-md transition-all duration-300"
              >
                {loading ? 'Processing...' : 'Create Coupon'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Movie Modal */}
      {isMovieModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-300 rounded-3xl p-10 max-w-lg w-full shadow-2xl relative animate-slide-up max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setIsMovieModalOpen(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{editingMovieId ? 'Update Movie' : 'Deploy New Movie'}</h2>
            <p className="text-slate-500 text-sm mb-8">{editingMovieId ? 'Modify details for this movie.' : 'Add a new movie to your theatre\'s catalog.'}</p>
            
            <form onSubmit={handleAddMovie} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Movie Title</label>
                <input 
                  type="text" required
                  placeholder="e.g. Inception"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                  value={movieFormData.title}
                  onChange={(e) => setMovieFormData({...movieFormData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Duration</label>
                  <input 
                    type="text"
                    placeholder="e.g. 2h 28m"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                    value={movieFormData.duration}
                    onChange={(e) => setMovieFormData({...movieFormData, duration: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Genre</label>
                  <input 
                    type="text"
                    placeholder="e.g. Action, Sci-Fi"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                    value={movieFormData.genre}
                    onChange={(e) => setMovieFormData({...movieFormData, genre: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Movie Poster</label>
                <input 
                  type="file"
                  accept="image/*"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-slate-900 hover:file:bg-indigo-600"
                  onChange={(e) => setMovieImageFile(e.target.files[0])}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Movie Backdrop (Wide Image)</label>
                <input 
                  type="file"
                  accept="image/*"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-slate-900 hover:file:bg-indigo-600"
                  onChange={(e) => setMovieBackdropFile(e.target.files[0])}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  rows="3"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600 resize-none"
                  placeholder="Enter movie synopsis..."
                  value={movieFormData.synopsis}
                  onChange={(e) => setMovieFormData({...movieFormData, synopsis: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Trailer URL (YouTube)</label>
                <input 
                  type="text"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={movieFormData.trailerUrl}
                  onChange={(e) => setMovieFormData({...movieFormData, trailerUrl: e.target.value})}
                />
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full mt-8 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-indigo-600 hover:text-white hover:shadow-md transition-all duration-300"
              >
                {loading ? 'Processing...' : (editingMovieId ? 'Update Movie' : 'Add Movie')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


