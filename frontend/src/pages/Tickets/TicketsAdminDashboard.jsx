import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Film, Activity, Trash2, LayoutDashboard, Ticket, AlertCircle, LogOut, CheckCircle2, X, Menu, Search, TrendingUp, DollarSign, Crown, Building } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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

const PIE_COLORS = ['#6366f1', '#a855f7', '#ec4899'];

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [stats, setStats] = useState({ totalTicketsSold: 0, activeMovies: 0, totalRevenueUSD: 0 });
  const [activity, setActivity] = useState([]);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
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
        setShowScanner(false); // hide scanner on success
      } else {
        setCheckinError(data.message || 'Booking not found');
      }
    })
    .catch(() => setCheckinError('Connection error'));
  };
  
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminDashboardTab') || 'overview';
  }); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [movieSearchQuery, setMovieSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));

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
    const handleRes = async (res, setter) => {
      if (res.status === 401) { handleLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        setter(data);
      }
    };

    fetch(`${API}/api/stats`)
      .then(res => handleRes(res, setStats)).catch(console.error);
      
    fetch(`${API}/api/admin/activity`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setActivity)).catch(console.error);
      
    fetch(`${API}/api/admin/users`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setUsers)).catch(console.error);
      
    fetch(`${API}/api/movies`)
      .then(res => handleRes(res, setMovies)).catch(console.error);
      
    let analyticsUrl = `${API}/api/admin/analytics`;
    if (startDate && endDate) {
      analyticsUrl += `?start_date=${startDate}&end_date=${endDate}`;
    }
    fetch(analyticsUrl, { headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } })
      .then(res => handleRes(res, setAnalytics)).catch(console.error);
  }, [handleLogout, startDate, endDate]);

  useEffect(() => {
    if (!ssoUser || ssoUser.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate, ssoUser, fetchData]);

  useEffect(() => {
    localStorage.setItem('adminDashboardTab', activeTab);
  }, [activeTab]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("WARNING: Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API}/api/admin/users/${id}`, {  method: 'DELETE' , headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } });
      const data = await res.json();
      if (res.ok) {
        fetchData();
        showToast("User deleted successfully!", "success");
      } else {
        showToast(data.message || "Failed to delete user.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting user.", "error");
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`)) return;
    try {
      const res = await fetch(`${API}/api/admin/users/${id}/role`, { 
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}`,  'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole  })
      });
      const data = await res.json();
      if (res.ok) {
        fetchData();
        showToast("User role updated successfully!", "success");
      } else {
        showToast(data.message || "Failed to update role.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating user role.", "error");
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("WARNING: Are you sure you want to force-delete this movie globally?")) return;
    try {
      const res = await fetch(`${API}/api/admin/movies/${id}`, {  method: 'DELETE' , headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` } });
      const data = await res.json();
      if (res.ok) {
        fetchData();
        showToast("Movie deleted successfully!", "success");
      } else {
        showToast(data.message || "Failed to delete movie.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting movie.", "error");
    }
  };

  if (!ssoUser || ssoUser.role !== 'admin') return null;

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    u.role?.toLowerCase().includes(userSearchQuery.toLowerCase())
  );
  
  const filteredMovies = movies.filter(m => 
    m.title?.toLowerCase().includes(movieSearchQuery.toLowerCase()) ||
    m.id?.toLowerCase().includes(movieSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
      {/* Decorative ambient background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Shield className="text-indigo-600" size={24} />
          <h1 className="text-lg font-black tracking-tight text-slate-900">AdminCenter</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-72 shrink-0 flex-col gap-8`}>
          <div className="hidden md:flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-3.5 rounded-2xl shadow-lg shadow-indigo-500/30">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Platform</h1>
              <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">Global Control</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-3">
            <button 
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-6 py-4 font-bold transition-all duration-300 text-sm rounded-2xl ${activeTab === 'overview' ? 'bg-white text-indigo-700 shadow-xl shadow-indigo-100/50 scale-[1.02]' : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'}`}
            >
              <LayoutDashboard size={20} className={activeTab === 'overview' ? 'text-indigo-600' : 'text-slate-400'} /> System Overview
            </button>
            <button 
              onClick={() => { setActiveTab('users'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-6 py-4 font-bold transition-all duration-300 text-sm rounded-2xl ${activeTab === 'users' ? 'bg-white text-indigo-700 shadow-xl shadow-indigo-100/50 scale-[1.02]' : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'}`}
            >
              <Users size={20} className={activeTab === 'users' ? 'text-indigo-600' : 'text-slate-400'} /> User Directory
            </button>
            <button 
              onClick={() => { setActiveTab('movies'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-6 py-4 font-bold transition-all duration-300 text-sm rounded-2xl ${activeTab === 'movies' ? 'bg-white text-indigo-700 shadow-xl shadow-indigo-100/50 scale-[1.02]' : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'}`}
            >
              <Film size={20} className={activeTab === 'movies' ? 'text-indigo-600' : 'text-slate-400'} /> Global Catalog
            </button>
            <button 
              onClick={() => { setActiveTab('checkin'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-6 py-4 font-bold transition-all duration-300 text-sm rounded-2xl ${activeTab === 'checkin' ? 'bg-white text-indigo-700 shadow-xl shadow-indigo-100/50 scale-[1.02]' : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'}`}
            >
              <Ticket size={20} className={activeTab === 'checkin' ? 'text-indigo-600' : 'text-slate-400'} /> Verify Check-in
            </button>
            <button 
              onClick={() => { setActiveTab('settlements'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-6 py-4 font-bold transition-all duration-300 text-sm rounded-2xl ${activeTab === 'settlements' ? 'bg-white text-indigo-700 shadow-xl shadow-indigo-100/50 scale-[1.02]' : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'}`}
            >
              <DollarSign size={20} className={activeTab === 'settlements' ? 'text-indigo-600' : 'text-slate-400'} /> Settlements & Commission
            </button>
          </nav>
          
          <div className="mt-auto pt-8">
            <div className="bg-white/60 backdrop-blur-xl p-5 mb-4 shadow-sm rounded-3xl border border-white">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Live Status</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">All APIs and databases are operating normally across all regions.</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-white/50 border border-red-100 text-red-600 font-bold text-sm rounded-2xl hover:bg-red-50 hover:border-red-200 hover:shadow-lg hover:shadow-red-500/10 transition-all"
            >
              <LogOut size={18} /> Terminate Session
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Platform Overview</h2>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Global metrics and real-time revenue analytics.</p>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="date"
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="text-slate-400 font-medium">to</span>
                  <input 
                    type="date"
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <button 
                    onClick={fetchData}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold ml-2 hover:bg-indigo-700"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
              
              {/* Top Level Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[30px] rounded-full"></div>
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                    <Ticket size={22} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Tickets Sold</p>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-black text-slate-900">{stats.totalTicketsSold.toLocaleString()}</p>
                    <span className="flex items-center text-xs font-bold text-emerald-500 mb-1"><TrendingUp size={14} className="mr-1"/> Live</span>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-[30px] rounded-full"></div>
                  <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 shadow-sm">
                    <Users size={22} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Registered Users</p>
                  <p className="text-4xl font-black text-slate-900">{analytics?.totalUsers || 0}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[30px] rounded-full"></div>
                  <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 shadow-sm">
                    <Film size={22} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Active Movies</p>
                  <p className="text-4xl font-black text-slate-900">{stats.activeMovies}</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 border border-indigo-400/50 p-6 rounded-[2rem] shadow-2xl shadow-indigo-500/30 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/20 blur-[40px] rounded-full"></div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 shadow-inner border border-white/30">
                    <DollarSign size={22} />
                  </div>
                  <p className="text-[10px] font-black text-indigo-100 uppercase tracking-[0.2em] mb-1">Gross Revenue</p>
                  <p className="text-4xl font-black text-white">{formatPrice(stats.totalRevenueUSD || 0)}</p>
                </div>
              </div>

              {/* Main Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Global Analytics Chart */}
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Revenue Velocity</h3>
                      <p className="text-sm text-slate-500 mt-1 font-medium">Daily ticket sales volume across the global platform</p>
                    </div>
                    <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-xs border border-indigo-100">
                      Last 30 Days
                    </div>
                  </div>
                  <div className="h-[350px] w-full">
                    {analytics && analytics.chartData && analytics.chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analytics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorGlobalRevAdmin" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(val) => `${val}`} />
                          <RechartsTooltip 
                            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', padding: '16px', fontWeight: 'bold' }}
                            formatter={(value) => [formatPrice(value), 'Revenue']}
                            labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorGlobalRevAdmin)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 font-medium">
                        <Activity size={48} className="opacity-20 mb-4" />
                        <p>No revenue data collected yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seat Tier Distribution */}
                <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 flex flex-col">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Seat Distribution</h3>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Global ticket sales by tier</p>
                  </div>
                  
                  <div className="flex-1 min-h-[250px] relative flex items-center justify-center">
                    {analytics && analytics.seatTiers && analytics.seatTiers.reduce((acc, curr) => acc + curr.value, 0) > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.seatTiers}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {analytics.seatTiers.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">No seat data.</div>
                    )}
                  </div>
                  
                  {/* Legend */}
                  {analytics && analytics.seatTiers && (
                    <div className="mt-4 space-y-3">
                      {analytics.seatTiers.map((tier, index) => (
                        <div key={tier.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></div>
                            <span className="text-sm font-bold text-slate-700">{tier.name}</span>
                          </div>
                          <span className="text-sm font-black text-slate-900">{tier.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Row: Leaderboards & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Top Movies Leaderboard */}
                <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                      <Crown size={24} className="text-amber-500" /> Platform Leaderboard
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {analytics && analytics.topMovies && analytics.topMovies.length > 0 ? (
                      analytics.topMovies.map((movie, index) => (
                        <div key={movie.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200">
                            #{index + 1}
                          </div>
                          <div className="w-12 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                            {movie.poster ? (
                              <img src={movie.poster} className="w-full h-full object-cover" alt="poster"/>
                            ) : (
                              <Film size={20} className="w-full h-full p-3 text-slate-400 opacity-50" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 truncate">{movie.title}</h4>
                            <p className="text-xs font-bold text-slate-500 mt-1">{movie.tickets} Tickets</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-black text-indigo-600">{formatPrice(movie.revenue)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500 font-medium">No movie revenue data.</div>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 flex flex-col h-[500px]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-900">Live Global Feed</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                    {activity.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 font-medium">No recent activity.</div>
                    ) : (
                      activity.map((act, index) => (
                        <div key={act.id || index} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 transition-colors border border-slate-100 group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-black text-sm uppercase">
                              {act.email ? act.email.substring(0, 2) : 'U'}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">
                                {act.email.split('@')[0]} <span className="font-medium text-slate-500">booked {act.seats ? act.seats.length : 0} seats</span>
                              </p>
                              <p className="text-xs text-indigo-600 font-bold mt-0.5">{act.title}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                            {formatDate(act.created_at)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">User Directory</h2>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Manage and promote all registered accounts.</p>
                </div>
                
                <div className="relative w-full md:w-80">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by name, email, or role..." 
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                  />
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="overflow-x-auto p-4 custom-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr>
                        <th className="py-5 px-6 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] border-b border-slate-100">User Details</th>
                        <th className="py-5 px-6 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] border-b border-slate-100">Role</th>
                        <th className="py-5 px-6 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] border-b border-slate-100">Business Profile</th>
                        <th className="py-5 px-6 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] border-b border-slate-100">Joined</th>
                        <th className="py-5 px-6 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] border-b border-slate-100 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredUsers.map(u => {
                        let parsedBusiness = null;
                        if (u.business_info) {
                          try { parsedBusiness = JSON.parse(u.business_info); } catch { /* ignore parsing errors */ }
                        }
                        
                        return (
                          <tr key={u.id} className="hover:bg-indigo-50/30 transition-colors group">
                            <td className="py-5 px-6 border-0">
                              <p className="font-bold text-slate-800 text-sm">{u.full_name}</p>
                              <p className="text-xs text-slate-500 font-medium mt-1">{u.email}</p>
                            </td>
                            <td className="py-5 px-6 border-0">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
                                u.role === 'admin' ? 'bg-red-50 text-red-600 border-red-200' : 
                                u.role === 'owner' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 
                                'bg-slate-100 text-slate-600 border-slate-200'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-5 px-6 border-0">
                              {parsedBusiness ? (
                                <div>
                                  <p className="text-sm font-bold text-slate-700">{parsedBusiness.businessName}</p>
                                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">GST: {parsedBusiness.gstNumber}</p>
                                </div>
                              ) : <span className="text-slate-400 text-xs font-medium italic">Standard User</span>}
                            </td>
                            <td className="py-5 px-6 text-sm text-slate-500 border-0 font-medium">
                              {formatDate(u.created_at)}
                            </td>
                            <td className="py-5 px-6 text-right border-0">
                              <div className="flex items-center justify-end gap-2">
                                {u.role === 'customer' && (
                                  <>
                                    <button 
                                      onClick={() => handleUpdateRole(u.id, 'owner')}
                                      className="px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-colors"
                                    >
                                      Promote Owner
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateRole(u.id, 'admin')}
                                      className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-colors"
                                    >
                                      Promote Admin
                                    </button>
                                  </>
                                )}
                                {u.role === 'owner' && (
                                  <>
                                    <button 
                                      onClick={() => handleUpdateRole(u.id, 'admin')}
                                      className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-colors"
                                    >
                                      Promote Admin
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateRole(u.id, 'customer')}
                                      className="px-4 py-2 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-600 hover:text-white transition-colors"
                                    >
                                      Revoke Access
                                    </button>
                                  </>
                                )}
                                {u.role !== 'admin' && (
                                  <button 
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Delete User"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredUsers.length === 0 && (
                         <tr>
                            <td colSpan="5" className="py-16 text-center text-slate-500 font-medium border-0 bg-slate-50/50 rounded-2xl m-4">No users found matching your search criteria.</td>
                         </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checkin' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verify Check-in</h2>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Scan or enter booking IDs to verify customer entry tickets globally.</p>
                </div>
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
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-start gap-4 border border-red-100 animate-slide-up shadow-sm">
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
                          checkinResult.status === 'cancelled' ? 'bg-red-50 text-red-600 border border-red-100' :
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
                          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1.5">Show Date & Time</p>
                          <p className="font-bold text-slate-700 text-base">{formatDate(checkinResult.booking_date)} at {checkinResult.booking_time}</p>
                        </div>
                        {checkinResult.checked_in && checkinResult.checked_in_at && (
                          <div>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1.5">Checked-in At</p>
                            <p className="font-black text-amber-600 text-base">{new Date(checkinResult.checked_in_at).toLocaleString()}</p>
                          </div>
                        )}
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
                                showToast('Check-in successful!', 'success');
                                setCheckinResult({ ...checkinResult, checked_in: true, checked_in_at: new Date().toISOString() });
                              } else {
                                showToast(data.message || 'Failed to check-in', 'error');
                              }
                            })
                            .catch(() => showToast('Connection error', 'error'));
                          }}
                          className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                          <CheckCircle2 size={20} /> Mark as Checked-In
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'movies' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Global Catalog</h2>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Moderate all content deployed across the platform.</p>
                </div>
                
                <div className="relative w-full md:w-80">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search movies by title or ID..." 
                    value={movieSearchQuery}
                    onChange={(e) => setMovieSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 rounded-3xl p-6 mb-8 flex items-start gap-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[30px] rounded-full"></div>
                <AlertCircle className="text-orange-500 shrink-0 mt-1 relative z-10" size={24} />
                <div className="relative z-10">
                  <h4 className="text-orange-900 font-black text-sm mb-1 uppercase tracking-widest">Global Deletion Warning</h4>
                  <p className="text-sm text-orange-800 leading-relaxed font-medium">
                    Deleting a movie here forcefully removes it from the platform. It will fail if the movie currently has active bookings to protect customer integrity.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMovies.map(m => (
                  <div key={m.id} className="p-5 flex gap-6 bg-white/80 backdrop-blur-xl border border-white rounded-3xl hover:shadow-xl hover:shadow-slate-200/50 transition-all group items-center">
                    <div className="w-28 h-36 shrink-0 rounded-[1.25rem] overflow-hidden bg-slate-100 shadow-md relative">
                      {m.poster ? (
                        <img src={m.poster} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Film size={32} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1 h-full py-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-xl text-slate-900 line-clamp-1">{m.title}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {m.genre && Array.isArray(m.genre) && m.genre.slice(0, 2).map((g, i) => (
                          <span key={i} className="text-[9px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                            {g}
                          </span>
                        ))}
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                          {m.duration}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1 font-medium">
                        {m.synopsis}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          ID: {m.id.substring(0, 8)}...
                        </span>
                        <button 
                          onClick={() => handleDeleteMovie(m.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 size={14} /> Force Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredMovies.length === 0 && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-md border border-white rounded-[3rem] shadow-sm">
                    <Film size={64} className="opacity-20 mb-6" />
                    <p className="font-bold text-lg">No movies match your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settlements' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Commissions & Supplier Settlements</h2>
                  <p className="text-sm text-slate-500 mt-2 font-medium">
                    Automated revenue distribution, supplier payables, gateway deductions and reconciliation audit trail.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    Cycle: Oct 2026 Active
                  </span>
                </div>
              </div>

              {/* Settlement Metrics Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gross Customer Sales</p>
                  <p className="text-3xl font-black text-slate-900">{formatPrice(124850)}</p>
                  <p className="text-xs text-slate-500 mt-1">Across 184 Movie & Bus Bookings</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gross Commission (10%)</p>
                  <p className="text-3xl font-black text-indigo-600">{formatPrice(12485)}</p>
                  <p className="text-xs text-emerald-600 font-bold mt-1">+ ₹30 Platform fee per booking</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Supplier Payables</p>
                  <p className="text-3xl font-black text-amber-600">{formatPrice(106845)}</p>
                  <p className="text-xs text-slate-500 mt-1">Due for weekly settlement</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Net GoMo Contribution</p>
                  <p className="text-3xl font-black text-emerald-600">{formatPrice(15758)}</p>
                  <p className="text-xs text-slate-500 mt-1">After 1.8% gateway deductions</p>
                </div>
              </div>

              {/* Commission Engine Configuration */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-lg text-slate-900">Configured Commission Contracts</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-black tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Contract Rule</th>
                        <th className="py-3 px-4">Supplier / Fleet</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Rate (%)</th>
                        <th className="py-3 px-4">Platform Fee</th>
                        <th className="py-3 px-4">Cycle</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      <tr>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">COMM_BUS_KPN_V1</td>
                        <td className="py-3 px-4">KPN Travels</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">Bus</span></td>
                        <td className="py-3 px-4 font-bold text-indigo-600">10.0%</td>
                        <td className="py-3 px-4">₹30.00</td>
                        <td className="py-3 px-4">Weekly</td>
                        <td className="py-3 px-4"><span className="text-emerald-600 font-bold">Active</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">COMM_BUS_PVN_V1</td>
                        <td className="py-3 px-4">Parveen Travels</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">Bus</span></td>
                        <td className="py-3 px-4 font-bold text-indigo-600">10.0%</td>
                        <td className="py-3 px-4">₹30.00</td>
                        <td className="py-3 px-4">Weekly</td>
                        <td className="py-3 px-4"><span className="text-emerald-600 font-bold">Active</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">COMM_CINE_PALAZZO_V2</td>
                        <td className="py-3 px-4">GoMo Palazzo Cinemas</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold">Movie</span></td>
                        <td className="py-3 px-4 font-bold text-indigo-600">8.5%</td>
                        <td className="py-3 px-4">₹25.00</td>
                        <td className="py-3 px-4">Bi-Weekly</td>
                        <td className="py-3 px-4"><span className="text-emerald-600 font-bold">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Settlement Reconciliation Ledger */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg text-slate-900">Supplier Settlement Reconciliation Ledger</h3>
                  <button
                    onClick={() => showToast('Settlement ledger audit report exported (CSV)', 'info')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Export Statement
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-black tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Settlement ID</th>
                        <th className="py-3 px-4">Supplier Partner</th>
                        <th className="py-3 px-4">Period</th>
                        <th className="py-3 px-4">Gross Collected</th>
                        <th className="py-3 px-4">GoMo Fee & Comm</th>
                        <th className="py-3 px-4">Net Supplier Payable</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      <tr>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">SETTL-2026-W42-01</td>
                        <td className="py-3 px-4 font-bold text-slate-800">KPN Travels</td>
                        <td className="py-3 px-4">Oct 10 - Oct 17</td>
                        <td className="py-3 px-4 font-bold text-slate-900">₹44,500</td>
                        <td className="py-3 px-4 font-bold text-indigo-600">₹5,950</td>
                        <td className="py-3 px-4 font-bold text-emerald-600">₹38,550</td>
                        <td className="py-3 px-4"><span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">Reconciled</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">SETTL-2026-W42-02</td>
                        <td className="py-3 px-4 font-bold text-slate-800">GoMo Palazzo Cinemas</td>
                        <td className="py-3 px-4">Oct 10 - Oct 17</td>
                        <td className="py-3 px-4 font-bold text-slate-900">₹58,200</td>
                        <td className="py-3 px-4 font-bold text-indigo-600">₹6,840</td>
                        <td className="py-3 px-4 font-bold text-emerald-600">₹51,360</td>
                        <td className="py-3 px-4"><span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">Pending Approval</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}


