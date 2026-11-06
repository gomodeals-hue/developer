import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, UserCheck, UserPlus, Search, Eye, Mail, Phone,
  Calendar, ShieldCheck, X, UserX, CheckCircle2, AlertCircle, Loader2, Ban, AlertTriangle,
  MapPin, Trash2, ArrowRight, ExternalLink, History, ShoppingCart, Clock, Send, Tag, Package, Check, RefreshCw, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from "../../../context/AdminAuthContext.jsx";
import { Button } from '../../ui/button';
import { cn } from "../../../lib/utils";
import { useToast } from "../../../hooks/use-toast";
import { api } from "../../../services/api";
import { StatCard } from "../components/StatCard";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);
  const [activeTab, setActiveTab] = useState("cart"); // "cart", "tracks", "profile"
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [customerToBlock, setCustomerToBlock] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAdminAuth();
  const isSuperAdmin = currentUser?.type === 'super_admin';

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/admin/customers');
      if (resp.data.success) {
        setCustomers(Array.isArray(resp.data.data) ? resp.data.data : []);
      }
    } catch (err) {
      console.error('Customer fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (customer, isBlocking) => {
    if (isBlocking) {
      setCustomerToBlock(customer);
      setBlockReason("");
      setShowBlockModal(true);
    } else {
      await updateCustomerStatus(customer.customer_id, true, null);
    }
  };

  const handleSelectCustomer = async (customer) => {
    setSelectedCustomer(customer);
    setLoadingDetails(true);
    setCustomerDetails(null);
    setActiveTab(customer.active_cart?.items_count > 0 ? "cart" : "profile");
    try {
      const resp = await api.get(`/admin/customer/${customer.customer_id}`);
      if (resp.data.success) {
        setCustomerDetails(resp.data.data);
      }
    } catch (err) {
      console.error("Fetch details error:", err);
      toast({ title: "Details Unreachable", description: "Could not fetch full customer profile.", variant: "destructive" });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleSendCartReminder = async (customer) => {
    setSendingReminder(true);
    try {
      const resp = await api.post(`/admin/customer/${customer.customer_id}/send-cart-reminder`, {
        email: customer.email,
        name: customer.name
      });
      if (resp.data.success) {
        toast({
          title: "Cart Reminder Sent! ✉️",
          description: `5-Day waiting email with coupon COMEBACK10 sent to ${customer.email}`
        });
        await handleSelectCustomer(customer);
        await fetchCustomers();
      } else {
        toast({
          title: "Dispatch Failed",
          description: resp.data.message || "Could not dispatch email.",
          variant: "destructive"
        });
      }
    } catch (e) {
      toast({
        title: "Send Error",
        description: e.response?.data?.message || "Failed to reach email service.",
        variant: "destructive"
      });
    } finally {
      setSendingReminder(false);
    }
  };

  const handleDeleteCustomer = async () => {
    if (!customerToDelete) return;
    setUpdating(true);
    try {
      const resp = await api.delete(`/admin/customer/${customerToDelete.customer_id}`);
      if (resp.data.success) {
        toast({ title: "Account Purged", description: "Customer account and private data removed." });
        setCustomers(prev => prev.filter(c => c.customer_id !== customerToDelete.customer_id));
        setShowDeleteModal(false);
        setSelectedCustomer(null);
      }
    } catch (err) {
      toast({ title: "Purge Failed", description: "Could not delete customer account.", variant: "destructive" });
    } finally {
      setUpdating(false);
    }
  };

  const updateCustomerStatus = async (id, is_active, reason) => {
    setUpdating(true);
    try {
      const resp = await api.patch(`/admin/customer/${id}/status`, { is_active, block_reason: reason });
      if (resp.data.success) {
        toast({ 
          title: is_active ? "Customer Restored" : "Customer Restricted", 
          description: `Account access has been updated successfully.` 
        });
        setCustomers(prev => prev.map(c => c.customer_id === id ? { 
          ...c, 
          is_active: resp.data.is_active,
          block_reason: resp.data.block_reason
        } : c));
        if (selectedCustomer?.customer_id === id) {
          setSelectedCustomer(prev => ({ 
            ...prev, 
            is_active: resp.data.is_active,
            block_reason: resp.data.block_reason
          }));
        }
        setShowBlockModal(false);
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Update Failed", description: "Could not change account status.", variant: "destructive" });
    } finally {
      setUpdating(false);
    }
  };

  const filtered = useMemo(() => {
    return customers.filter(c =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.customer_id?.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Elegant Welcome Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-orange-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Users size={14} className="text-orange-600" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-black">Customer Relations Directory</span>
          </div>
          <h1 className="text-4xl font-extrabold text-orange-955 tracking-tight">Customers</h1>
          <p className="text-[11px] text-orange-500 uppercase tracking-[0.2em] max-w-xl">
            Manage registered customer directories, verified accounts, account restrictions, and disputes.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid - Unified StatCard */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Customers" 
          value={customers.length} 
          todayValue="Registered Clients" 
          changeType="positive"
          icon={Users} 
        />
        <StatCard 
          title="Active Verified" 
          value={customers.filter(c => c.is_active).length} 
          todayValue="Verified Accounts" 
          changeType="positive"
          icon={UserCheck} 
        />
        <StatCard 
          title="Active Carts" 
          value={customers.filter(c => c.active_cart?.items_count > 0).length} 
          todayValue={`₹${customers.reduce((s, c) => s + (c.active_cart?.total_value || 0), 0).toLocaleString('en-IN')} Total Cart Value`} 
          changeType="positive"
          icon={ShoppingCart} 
        />
        <StatCard 
          title="5-Day Waiting Carts" 
          value={customers.filter(c => c.active_cart?.is_eligible_5_day).length} 
          todayValue="Eligible for Reminder" 
          changeType="positive"
          icon={Clock} 
        />
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
          <input
            placeholder="Search by name, email or ID..."
            className="w-full h-11 pl-11 pr-4 border border-orange-200 focus:border-orange-500 bg-orange-55/30 text-orange-955 text-[10px] font-bold uppercase tracking-wider focus:outline-none placeholder:text-stone-400 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] focus:bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content View (Table) */}
      {loading ? (
        <div className="flex h-[40vh] flex-col items-center justify-center gap-6">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 border border-orange-100 rounded-full" />
            <div className="absolute inset-0 border border-orange-955 rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest animate-pulse">Initializing Portal Directory...</p>
        </div>
      ) : (
        <div className="bg-white border border-orange-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-orange-50/50 border-b border-orange-100">
                  <th className="px-8 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Customer Name</th>
                  <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Account Cart</th>
                  <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Joined Date</th>
                  <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100 text-stone-850">
                {filtered.map((c) => (
                  <tr key={c.customer_id} className="transition-all duration-200 hover:bg-orange-50/20 border-b border-orange-100 last:border-b-0 group">
                    <td className="px-8 py-5">
                      <span className="font-mono text-[9px] font-black text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg">
                        #{c.customer_id.split('-')[0].toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-orange-955 flex items-center justify-center text-white font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                          {c.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-orange-955 tracking-wide uppercase leading-none mb-1">{c.name}</p>
                          <p className="text-[10px] font-bold text-stone-500">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[10px] font-black text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg w-fit">
                        <Phone className="h-3 w-3 text-orange-500" />
                        {c.phone || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {c.active_cart?.items_count > 0 ? (
                        <div className="flex flex-col items-start gap-1">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-955 shadow-xs font-mono text-[10px] font-bold">
                            <ShoppingCart size={12} className="text-orange-600" />
                            <span>{c.active_cart.items_count} {c.active_cart.items_count === 1 ? 'item' : 'items'}</span>
                            <span className="text-orange-400">·</span>
                            <span className="font-extrabold text-orange-700">₹{Number(c.active_cart.total_value).toLocaleString('en-IN')}</span>
                          </div>
                          {c.active_cart.days_idle >= 5.0 ? (
                            <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                              <Clock size={10} className="text-amber-600" />
                              {c.active_cart.days_idle}d waiting
                            </span>
                          ) : c.active_cart.days_idle > 0 ? (
                            <span className="text-[8px] font-bold text-stone-400">
                              Updated {c.active_cart.days_idle}d ago
                            </span>
                          ) : (
                            <span className="text-[8px] font-bold text-emerald-600">
                              Active recently
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] font-semibold text-stone-400 italic">
                          Empty
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[10px] font-black text-stone-500 uppercase tracking-wider">
                        <Calendar className="h-3.5 w-3.5 text-stone-400" />
                        {new Date(c.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start gap-1">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm",
                          c.is_active ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-250 bg-rose-50 text-rose-800"
                        )}>
                          {c.is_active ? <CheckCircle2 size={10} className="text-emerald-600" /> : <AlertCircle size={10} className="text-rose-600" />}
                          <span className="text-[8px] font-black uppercase tracking-wider">{c.is_active ? 'Active' : 'Restricted'}</span>
                        </div>
                        {!c.is_active && c.block_reason && (
                          <span className="text-[8px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded max-w-[120px] truncate" title={c.block_reason}>
                            {c.block_reason}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={updating}
                          onClick={() => handleToggleStatus(c, c.is_active)}
                          className={cn(
                            "h-9 w-9 flex items-center justify-center rounded-xl transition-all shadow-sm cursor-pointer active:scale-95 border",
                            c.is_active 
                              ? "bg-rose-50 border-rose-150 hover:bg-rose-600 hover:text-white hover:border-rose-300 text-rose-600" 
                              : "bg-orange-50 border-orange-150 hover:bg-orange-955 hover:text-white hover:border-orange-200 text-orange-600"
                          )}
                          title={c.is_active ? "Block Customer" : "Unblock Customer"}
                        >
                          {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : (c.is_active ? <UserX size={16} /> : <UserCheck size={16} />)}
                        </button>
                        <button
                          onClick={() => handleSelectCustomer(c)}
                          className="h-9 w-9 flex items-center justify-center rounded-xl bg-orange-50 hover:bg-orange-955 hover:text-white border border-orange-150 text-orange-600 shadow-sm transition-all cursor-pointer active:scale-95"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-16 text-center border-t border-orange-100">
                <Users size={32} className="mx-auto text-orange-200 mb-3" />
                <p className="text-stone-500 font-bold uppercase text-[10px] tracking-wider">No customers found matching search</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer Detail Overlay (Light-themed modern drawer modal) */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] overflow-y-auto no-scrollbar">
          <div 
            className="fixed inset-0 bg-orange-955/40 backdrop-blur-md animate-in fade-in duration-200" 
            onClick={() => setSelectedCustomer(null)}
          />
          
          <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
            <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-orange-100 relative">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-orange-55 hover:bg-orange-105 border border-orange-205 transition-all z-30 text-orange-750 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Cover Header */}
              <div className="h-44 bg-gradient-to-r from-orange-955 to-orange-850 relative overflow-hidden flex items-end p-8">
                <div className="absolute top-[-40%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-20 w-20 rounded-2xl bg-white p-1 border border-orange-200/50 shadow-md">
                    <div className="h-full w-full rounded-xl bg-orange-955 flex items-center justify-center text-white text-3xl font-black">
                      {selectedCustomer.name?.charAt(0)}
                    </div>
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-extrabold tracking-wide uppercase leading-none mb-1.5">{selectedCustomer.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-orange-300 uppercase tracking-widest">ID:</span>
                      <span className="font-mono text-[9px] font-bold text-orange-100 uppercase">#{selectedCustomer.customer_id.split('-')[0].toUpperCase()}</span>
                      <span className="text-orange-400">·</span>
                      <span className="text-[9px] font-mono text-orange-200">{selectedCustomer.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-orange-100 px-8 pt-4 gap-2 bg-orange-50/20">
                <button
                  onClick={() => setActiveTab('cart')}
                  className={cn(
                    "px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2",
                    activeTab === 'cart'
                      ? "border-orange-600 text-orange-955 bg-white shadow-2xs"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  )}
                >
                  <ShoppingCart size={14} className="text-orange-600" />
                  Account Stored Cart ({customerDetails?.active_cart?.items_count ?? selectedCustomer.active_cart?.items_count ?? 0})
                </button>
                <button
                  onClick={() => setActiveTab('tracks')}
                  className={cn(
                    "px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2",
                    activeTab === 'tracks'
                      ? "border-orange-600 text-orange-955 bg-white shadow-2xs"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  )}
                >
                  <Sparkles size={14} className="text-orange-600" />
                  Activity Tracks & Ledger ({(customerDetails?.cart_tracks || selectedCustomer.cart_tracks || []).length})
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={cn(
                    "px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2",
                    activeTab === 'profile'
                      ? "border-orange-600 text-orange-955 bg-white shadow-2xs"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  )}
                >
                  <ShieldCheck size={14} className="text-orange-600" />
                  Profile & Addresses
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                
                {/* TAB 1: Account Stored Cart & Products */}
                {activeTab === 'cart' && (
                  <div className="space-y-6">
                    {/* Cart Summary Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                        <p className="text-[9px] font-black uppercase text-stone-500 tracking-wider">Cart Total Value</p>
                        <p className="text-xl font-black text-orange-955 mt-1">₹{Number(customerDetails?.active_cart?.total_value ?? selectedCustomer.active_cart?.total_value ?? 0).toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-stone-500 mt-0.5">{customerDetails?.active_cart?.items_count ?? selectedCustomer.active_cart?.items_count ?? 0} units stored</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                        <p className="text-[9px] font-black uppercase text-stone-500 tracking-wider">Inactivity Status</p>
                        <p className="text-xl font-black text-orange-955 mt-1">{customerDetails?.active_cart?.days_idle ?? selectedCustomer.active_cart?.days_idle ?? 0} Days Idle</p>
                        <p className="text-[10px] text-stone-500 mt-0.5">Last updated {new Date(customerDetails?.active_cart?.updated_at ?? selectedCustomer.active_cart?.updated_at ?? Date.now()).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 flex flex-col justify-between">
                        <div>
                          <p className="text-[9px] font-black uppercase text-stone-500 tracking-wider">5-Day Reminder</p>
                          <p className="text-xs font-bold text-orange-955 mt-1">
                            {(customerDetails?.active_cart?.days_idle ?? selectedCustomer.active_cart?.days_idle ?? 0) >= 5.0 ? 'Eligible for 10% Off' : 'Active cart'}
                          </p>
                        </div>
                        {(customerDetails?.active_cart?.items_count ?? selectedCustomer.active_cart?.items_count ?? 0) > 0 && (
                          <button
                            disabled={sendingReminder}
                            onClick={() => handleSendCartReminder(selectedCustomer)}
                            className="mt-2 w-full py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                          >
                            {sendingReminder ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                            Send Waiting Email
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 5-Day Alert Banner */}
                    {(customerDetails?.active_cart?.days_idle ?? selectedCustomer.active_cart?.days_idle ?? 0) >= 5.0 && (
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                        <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-bold text-xs uppercase tracking-wide text-amber-800">5-Day Inactivity Threshold Reached</p>
                          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                            This account stored products in their cart {customerDetails?.active_cart?.days_idle ?? selectedCustomer.active_cart?.days_idle} days ago without completing checkout. A personalized reminder email with coupon code <span className="font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">COMEBACK10</span> can be sent to convert this cart.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Stored Cart Products List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-wider text-orange-955 flex items-center gap-2">
                          <Package size={14} className="text-orange-600" />
                          Products Stored by this Account
                        </h3>
                        <span className="text-[10px] font-mono text-stone-500 font-bold">
                          {customerDetails?.active_cart?.distinct_items ?? selectedCustomer.active_cart?.distinct_items ?? 0} distinct products
                        </span>
                      </div>

                      {loadingDetails ? (
                        <div className="p-8 text-center bg-orange-50/30 rounded-2xl border border-orange-100">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-orange-600 mb-2" />
                          <p className="text-xs font-bold text-stone-500">Loading stored account products...</p>
                        </div>
                      ) : (customerDetails?.active_cart?.items || selectedCustomer.active_cart?.items || []).length === 0 ? (
                        <div className="p-12 text-center bg-orange-50/20 rounded-2xl border border-dashed border-orange-200">
                          <ShoppingCart size={32} className="mx-auto text-stone-300 mb-2" />
                          <p className="font-bold text-stone-600 text-sm">Cart is currently empty</p>
                          <p className="text-xs text-stone-400 mt-1">This account does not have any items stored in their active shopping cart right now.</p>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {(customerDetails?.active_cart?.items || selectedCustomer.active_cart?.items || []).map((item, idx) => (
                            <div key={idx} className="p-3.5 rounded-2xl border border-orange-100 bg-white hover:border-orange-200 transition-all flex items-center justify-between gap-4 shadow-2xs">
                              <div className="flex items-center gap-3.5 min-w-0">
                                <img
                                  src={item.thumbnail || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100'}
                                  alt={item.name}
                                  className="w-14 h-14 object-cover rounded-xl border border-orange-100 shrink-0 bg-stone-100"
                                />
                                <div className="min-w-0">
                                  <p className="font-bold text-xs text-orange-955 truncate leading-tight">{item.name}</p>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {(item.variant_value || item.selectedColor) && (
                                      <span className="font-mono text-[9px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">
                                        Option: {item.variant_value || item.selectedColor}
                                      </span>
                                    )}
                                    <span className="text-[10px] font-bold text-stone-500">
                                      Qty: {item.quantity || 1}
                                    </span>
                                    <span className="text-[10px] text-stone-400">·</span>
                                    <span className="text-[10px] font-bold text-stone-600">
                                      ₹{Number(item.price || 0).toLocaleString('en-IN')} each
                                    </span>
                                    {item.added_at && (
                                      <>
                                        <span className="text-[10px] text-stone-400">·</span>
                                        <span className="text-[9px] text-stone-400 font-mono">
                                          Added {new Date(item.added_at).toLocaleDateString('en-IN')}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-black text-sm text-orange-955">
                                  ₹{(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString('en-IN')}
                                </p>
                                {item.mrp && item.mrp > item.price && (
                                  <p className="text-[10px] text-stone-400 line-through">
                                    ₹{(Number(item.mrp) * Number(item.quantity || 1)).toLocaleString('en-IN')}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: Cart Activity Ledger & Tracks */}
                {activeTab === 'tracks' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-wider text-orange-955 flex items-center gap-2">
                        <Sparkles size={14} className="text-orange-600" />
                        Audit Trail & Cart Activity Ledger
                      </h3>
                      <span className="text-[10px] font-mono text-stone-400 font-bold">
                        {(customerDetails?.cart_tracks || selectedCustomer.cart_tracks || []).length} Recorded Tracks
                      </span>
                    </div>

                    {(customerDetails?.cart_tracks || selectedCustomer.cart_tracks || []).length === 0 ? (
                      <div className="p-12 text-center bg-orange-50/20 rounded-2xl border border-dashed border-orange-200">
                        <Clock size={32} className="mx-auto text-stone-300 mb-2" />
                        <p className="font-bold text-stone-600 text-sm">No activity tracks recorded yet</p>
                        <p className="text-xs text-stone-400 mt-1">Actions taken by this account in the store will appear in this ledger in real time.</p>
                      </div>
                    ) : (
                      <div className="relative pl-6 space-y-4 border-l-2 border-orange-100 before:absolute before:left-[-5px] before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-orange-500">
                        {(customerDetails?.cart_tracks || selectedCustomer.cart_tracks || []).map((track, idx) => {
                          const isAdded = track.action === 'ITEM_ADDED';
                          const isUpdated = track.action === 'QUANTITY_UPDATED';
                          const isRemoved = track.action === 'ITEM_REMOVED';
                          const isReminder = track.action === 'REMINDER_SENT';
                          const isMerged = track.action === 'GUEST_CART_MERGED';
                          const isPurchased = track.action === 'ORDER_PURCHASED';

                          return (
                            <div key={idx} className="relative bg-white p-4 rounded-2xl border border-orange-100 shadow-2xs hover:border-orange-200 transition-all">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <div className={cn(
                                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs",
                                    isAdded && "bg-emerald-50 text-emerald-600 border border-emerald-200",
                                    isUpdated && "bg-blue-50 text-blue-600 border border-blue-200",
                                    isRemoved && "bg-rose-50 text-rose-600 border border-rose-200",
                                    isReminder && "bg-amber-50 text-amber-600 border border-amber-200",
                                    isMerged && "bg-purple-50 text-purple-600 border border-purple-200",
                                    isPurchased && "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  )}>
                                    {isAdded && <Package size={14} />}
                                    {isUpdated && <RefreshCw size={14} />}
                                    {isRemoved && <Trash2 size={14} />}
                                    {isReminder && <Mail size={14} />}
                                    {isMerged && <Sparkles size={14} />}
                                    {isPurchased && <Check size={14} />}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={cn(
                                        "text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-mono",
                                        isAdded && "bg-emerald-50 text-emerald-700 border border-emerald-200",
                                        isUpdated && "bg-blue-50 text-blue-700 border border-blue-200",
                                        isRemoved && "bg-rose-50 text-rose-700 border border-rose-200",
                                        isReminder && "bg-amber-50 text-amber-700 border border-amber-200",
                                        isMerged && "bg-purple-50 text-purple-700 border border-purple-200",
                                        isPurchased && "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                      )}>
                                        {track.action?.replace('_', ' ')}
                                      </span>
                                      <p className="font-bold text-xs text-orange-955">{track.title}</p>
                                    </div>
                                    <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">{track.description}</p>
                                    {track.variant && (
                                      <span className="inline-block mt-1 font-mono text-[9px] font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                                        Selected: {track.variant}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <span className="font-mono text-[9px] text-stone-400 font-bold block">
                                    {new Date(track.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: Account Profile & Clearance */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-orange-100 pb-4">
                      <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Account Authority Status</span>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border shadow-sm",
                        selectedCustomer.is_active ? "border-emerald-250 bg-emerald-50 text-emerald-800" : "border-rose-250 bg-rose-50 text-rose-800"
                      )}>
                        {selectedCustomer.is_active ? 'Active Verified' : 'Restricted'}
                      </div>
                    </div>

                    {selectedCustomer.block_reason && !selectedCustomer.is_active && (
                      <div className="p-4 bg-rose-50 border border-rose-150 text-rose-700 rounded-xl flex items-start gap-3 shadow-inner">
                        <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-0.5">Restriction Reason</p>
                          <p className="text-xs font-bold text-rose-750 leading-relaxed">{selectedCustomer.block_reason}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Mail, label: "Email Address", value: selectedCustomer.email, color: "text-orange-500", bg: "bg-orange-50" },
                        { icon: Phone, label: "Phone Number", value: selectedCustomer.phone || 'N/A', color: "text-orange-500", bg: "bg-orange-50" },
                        { icon: Calendar, label: "Joined Date", value: new Date(selectedCustomer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), color: "text-orange-500", bg: "bg-orange-50" },
                        { icon: ShieldCheck, label: "Account Clearance", value: selectedCustomer.is_active ? "Verified User" : "Flagged Account", color: "text-orange-500", bg: "bg-orange-50" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-orange-100 bg-white hover:border-orange-200 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border border-orange-100", item.bg)}>
                              <item.icon className={cn("h-4 w-4", item.color)} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[8px] font-black text-stone-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                              <p className="text-xs font-bold text-orange-955 truncate">{item.value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Addresses Section */}
                    <div className="border-t border-orange-100 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[10px] font-black text-orange-955 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={12} className="text-orange-500" />
                          Shipping Locations
                        </h4>
                        <span className="text-[9px] font-bold text-stone-500 uppercase">{(customerDetails?.addresses?.length || 0)} Saved</span>
                      </div>
                      
                      {loadingDetails ? (
                        <div className="h-16 bg-orange-50 rounded-xl animate-pulse" />
                      ) : (customerDetails?.addresses?.find(a => a.is_default)) ? (
                        (() => {
                          const addr = customerDetails.addresses.find(a => a.is_default);
                          return (
                            <div className="p-4 rounded-xl border border-orange-100 bg-orange-50/20 hover:border-orange-200 transition-all">
                              <div className="flex justify-between items-start mb-1">
                                <p className="text-[10px] font-bold text-orange-955 truncate">{addr.full_name}</p>
                                <span className="text-[8px] font-black uppercase text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">Primary</span>
                              </div>
                              <p className="text-[11px] text-stone-700 leading-relaxed font-bold">{addr.address_line_1}, {addr.city}</p>
                              <p className="mt-1 text-[9px] font-black text-stone-500 uppercase tracking-wider">{addr.state} - {addr.pincode}</p>
                            </div>
                          );
                        })()
                      ) : (customerDetails?.addresses?.length > 0) ? (
                        <div className="p-4 rounded-xl border border-orange-100 bg-orange-50/20">
                          <p className="text-[10px] font-bold text-orange-955 mb-1">{customerDetails.addresses[0].full_name}</p>
                          <p className="text-[11px] text-stone-700 leading-relaxed font-bold">{customerDetails.addresses[0].address_line_1}, {customerDetails.addresses[0].city}</p>
                        </div>
                      ) : (
                        <div className="p-6 text-center border border-dashed border-orange-200 rounded-xl bg-orange-50/20">
                          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">No addresses recorded</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-orange-100">
                  <button 
                    onClick={() => navigate(`/admin/orders?search=${encodeURIComponent(selectedCustomer.email)}`)}
                    className="flex-1 min-w-[150px] h-12 bg-orange-955 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-orange-850 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <History size={14} /> View Orders History
                  </button>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      disabled={updating}
                      onClick={() => handleToggleStatus(selectedCustomer, selectedCustomer.is_active)}
                      className={cn(
                        "w-12 h-12 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-sm",
                        selectedCustomer.is_active ? "text-rose-500 border-rose-200 bg-rose-50 hover:bg-rose-600 hover:text-white" : "text-orange-500 border-orange-200 bg-orange-50 hover:bg-orange-955 hover:text-white"
                      )}
                      title={selectedCustomer.is_active ? "Block Customer" : "Restore Customer"}
                    >
                      {updating ? <Loader2 className="animate-spin" /> : (selectedCustomer.is_active ? <UserX size={16} /> : <UserCheck size={16} />)}
                    </button>
                    {isSuperAdmin && (
                      <button 
                        onClick={() => { setCustomerToDelete(selectedCustomer); setShowDeleteModal(true); }}
                        className="w-12 h-12 rounded-xl border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-650 hover:text-white transition-all cursor-pointer shadow-sm"
                        title="Purge Account"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => setSelectedCustomer(null)}
                      className="px-5 h-12 rounded-xl border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-955 hover:text-white transition-all font-black text-[9px] uppercase tracking-widest cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block Reason Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-orange-955/40 flex items-center justify-center z-[110] p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-orange-100">
            <div className="h-14 w-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 border border-rose-100 text-rose-500">
              <Ban className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-orange-955 tracking-tight mb-2 uppercase">Restrict Customer</h2>
            <p className="text-stone-500 text-xs mb-6 font-bold leading-relaxed">Please provide a reason for restricting <span className="text-orange-900 font-black">"{customerToBlock?.name}"</span>. This will be shown to the customer.</p>
            
            <textarea
              className="w-full h-28 p-4 rounded-xl bg-orange-55/30 border border-orange-200 text-sm font-bold text-orange-955 focus:outline-none focus:border-rose-500 focus:bg-white transition-all placeholder:text-stone-400 mb-6 resize-none"
              placeholder="e.g. Suspicious activity, payment failure, violation of terms..."
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowBlockModal(false)}
                className="flex-1 h-11 rounded-xl bg-white border border-orange-200 text-orange-700 font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => updateCustomerStatus(customerToBlock.customer_id, false, blockReason)}
                disabled={!blockReason.trim() || updating}
                className="flex-1 h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-[10px] tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {updating ? <Loader2 className="animate-spin" /> : "Confirm Block"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-orange-955/40 flex items-center justify-center z-[110] p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-rose-100">
            <div className="h-14 w-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-rose-500 border border-rose-100">
              <Trash2 className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-orange-955 tracking-tight mb-2 uppercase">Purge Account?</h2>
            <p className="text-stone-500 text-xs mb-6 font-bold leading-relaxed">
              You are about to permanently delete <span className="text-orange-955 font-black">"{customerToDelete?.name}"</span>. 
              This will remove all private data, notifications, and shopping history. This action <span className="text-rose-600 uppercase font-black tracking-wider">cannot be undone</span>.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 h-11 rounded-xl bg-white border border-orange-200 text-orange-700 font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all cursor-pointer"
              >
                Abort
              </button>
              <button
                onClick={handleDeleteCustomer}
                disabled={updating}
                className="flex-1 h-11 rounded-xl bg-rose-650 hover:bg-rose-700 text-white font-black uppercase text-[10px] tracking-widest transition-all shadow-md"
              >
                {updating ? <Loader2 className="animate-spin" /> : "Confirm Purge"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
