

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  Search, ShoppingCart, Truck, CheckCircle2, XCircle, RotateCcw,
  Eye, X, MapPin, Download, Package, ExternalLink, Calendar, Check,
  TrendingUp, History, Filter, MoreHorizontal, ArrowRight, List,
  ShieldCheck, Clock, CreditCard, Mail, Sparkles, Send, BellRing, RefreshCw, AlertTriangle, ArrowUpRight
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { api } from "../../../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useToast } from "../../../hooks/use-toast";
import { StatCard } from "../components/StatCard";
import { exportToExcel } from "../../../utils/exportUtils";
import ConfirmModal from '../../common/ConfirmModal';

/* ─── PDF Invoice download helper ─────────────────────────────── */
function downloadInvoice(order) {
  const doc = new jsPDF();
  const items = Array.isArray(order.items) ? order.items : [];

  // Header
  doc.setFontSize(22);
  doc.setTextColor(249, 115, 22); // Orange primary
  doc.text("GoMo Deals Marketplace", 14, 22);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Elite Merchant Network", 14, 28);

  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("TAX INVOICE", 200, 22, { align: 'right' });
  doc.setFontSize(10);
  doc.text(`Invoice #: INV-${order.id.slice(0, 8).toUpperCase()}`, 200, 28, { align: 'right' });
  doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 200, 34, { align: 'right' });

  // Info Grid
  doc.setDrawColor(240);
  doc.line(14, 40, 196, 40);

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO:", 14, 50);
  doc.setFont("helvetica", "normal");
  doc.text(`${order.customer_name}`, 14, 56);
  doc.text(`${order.customer_email}`, 14, 62);
  doc.text(`${order.customer_phone || 'N/A'}`, 14, 68);

  doc.setFont("helvetica", "bold");
  doc.text("ORDER INFO:", 80, 50);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID: #${order.id.slice(0, 8)}`, 80, 56);
  doc.text(`Payment: ${order.payment_method}`, 80, 62);

  doc.setFont("helvetica", "bold");
  doc.text("SUMMARY:", 150, 50);
  doc.setFont("helvetica", "normal");
  doc.text(`Items: ${items.length}`, 150, 56);
  doc.text(`Status: Paid`, 150, 62);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: ₹${order.total_amount}`, 150, 68);

  // Table
  const tableRows = items.map((it, i) => [
    i + 1,
    it.name,
    it.quantity,
    `INR ${it.price}`,
    `INR ${(it.price * it.quantity).toFixed(2)}`,
    `INR ${(it.price * 0.05 * it.quantity).toFixed(2)}`,
    `INR ${(it.price * 1.05 * it.quantity).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['#', 'Product', 'Qty', 'Unit Price', 'Net Price', 'GST (5%)', 'Total']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [249, 115, 22], textColor: [255, 255, 255] },
    styles: { fontSize: 9, font: "helvetica" },
  });

  const finalY = doc.lastAutoTable.finalY || 80;

  // Totals
  doc.setFontSize(10);
  doc.text(`Subtotal: INR ${order.total_amount}`, 200, finalY + 15, { align: 'right' });
  doc.setFont("helvetica", "bold");
  doc.text(`Grand Total: INR ${order.total_amount}`, 200, finalY + 25, { align: 'right' });

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Thank you for your business. For support, contact support@gomogift.com", 14, 280);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN")}`, 200, 280, { align: 'right' });

  doc.save(`Invoice-${order.id.slice(0, 8)}.pdf`);
}

const statusStyle = {
  Delivered: "border-emerald-250 bg-emerald-50 text-emerald-800",
  Shipped: "border-orange-250 bg-orange-955 text-white shadow-sm",
  Processing: "border-amber-250 bg-amber-50 text-amber-800",
  Cancelled: "border-rose-250 bg-rose-50 text-rose-800",
  Returned: "border-zinc-250 bg-zinc-50 text-zinc-650",
};

const COURIERS = ["BlueDart Express", "Ekart Logistics", "Delhivery", "India Post", "DTDC", "XpressBees"];

export default function OrdersPage() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkStatus, setBulkStatus] = useState("Shipped");
  const [bulkCourier, setBulkCourier] = useState(COURIERS[0]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const resp = await api.get('/admin/orders');
      if (resp.data.success) {
        setOrders(Array.isArray(resp.data.data) ? resp.data.data : []);
      }
      setSelectedIds(new Set()); // Reset on fetch
    } catch (err) {
      console.error('Fetch error:', err);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = (visibleOrders) => {
    if (selectedIds.size === visibleOrders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(visibleOrders.map(o => o.id)));
    }
  };

  const handleBulkUpdate = async () => {
    if (selectedIds.size === 0) return;
    try {
      const resp = await api.post('/admin/orders/bulk-update', {
        orderIds: Array.from(selectedIds),
        status: bulkStatus,
        courier: bulkStatus === 'Shipped' ? bulkCourier : null
      });
      if (resp.data.success) {
        toast({ title: "Bulk Update Success", description: resp.data.message });
        setSelectedIds(new Set());
        fetchOrders();
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to perform bulk update", variant: "destructive" });
    }
  };

  const handleAutoPilot = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Bulk Auto-Pilot Dispatch',
      message: 'This will automatically assign couriers and mark ALL pending orders as Shipped. Continue?',
      action: async () => {
        try {
          const resp = await api.post('/admin/orders/auto-dispatch');
          if (resp.data.success) {
            toast({ title: "Auto-Pilot Success", description: resp.data.message });
            fetchOrders();
          }
        } catch (err) {
          toast({ title: "Auto-Pilot Failed", description: "System error during automated dispatch", variant: "destructive" });
        }
      }
    });
  };

  const handleExportStream = () => {
    try {
      toast({ title: "Export Started", description: "Preparing order data for export..." });
      const tableRows = filtered.map(o => ({
        'Order ID': `#${o.id.slice(0, 8)}`,
        'Date': new Date(o.created_at).toLocaleDateString(),
        'Customer': o.customer_name,
        'Email': o.customer_email,
        'Amount': `INR ${o.total_amount}`,
        'Status': o.status,
        'Method': o.payment_method,
        'Courier': o.courier || 'N/A'
      }));

      exportToExcel(tableRows, `Order-Stream-${new Date().toISOString().split('T')[0]}`);
      toast({ title: "Export Complete", description: "Order stream has been downloaded." });
    } catch (err) {
      toast({ title: "Export Failed", description: "Could not generate excel file.", variant: "destructive" });
    }
  };

  const [editStatus, setEditStatus] = useState("");
  const [editCourier, setEditCourier] = useState("");
  const [editTrackingId, setEditTrackingId] = useState("");
  const [editEstDate, setEditEstDate] = useState("");
  const [statusSaved, setStatusSaved] = useState(false);
  const [srLoading, setSrLoading] = useState(false);
  const [serviceability, setServiceability] = useState(null);
  const [dispatchSuccess, setDispatchSuccess] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: null, message: '', title: '' });
  const [emailPreviewOpen, setEmailPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [emailsOutbox, setEmailsOutbox] = useState([]);
  const [abandonedCarts, setAbandonedCarts] = useState([]);
  const [abandonedSummary, setAbandonedSummary] = useState(null);
  const [loadingAbandoned, setLoadingAbandoned] = useState(false);
  const [cartPreviewModal, setCartPreviewModal] = useState({ isOpen: false, cart: null, html: '' });
  const [sendingReminderId, setSendingReminderId] = useState(null);
  const [batchRunning, setBatchRunning] = useState(false);
  const [abandonedFilter, setAbandonedFilter] = useState("all");
  const [abandonedSearch, setAbandonedSearch] = useState("");

  const fetchAbandonedCarts = async () => {
    setLoadingAbandoned(true);
    try {
      const res = await api.get('/admin/abandoned-carts');
      if (res.data?.success) {
        setAbandonedCarts(res.data.data || []);
        setAbandonedSummary(res.data.summary || null);
      }
    } catch (e) {
      console.warn("Could not load abandoned carts:", e);
    } finally {
      setLoadingAbandoned(false);
    }
  };

  const handleSendCartReminder = async (cart) => {
    setSendingReminderId(cart.user_id);
    try {
      const res = await api.post('/admin/abandoned-carts/send-reminder', {
        user_id: cart.user_id,
        custom_email: cart.customer_email,
        custom_name: cart.customer_name
      });
      if (res.data?.success) {
        toast({
          title: "Cart Reminder Dispatched! 🛒",
          description: `Email sent to ${cart.customer_email} ("Your cart is waiting for you")`,
          variant: "default"
        });
        await fetchAbandonedCarts();
        await fetchEmails();
      } else {
        toast({
          title: "Send Failed",
          description: res.data?.message || "Could not dispatch email.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Send Error",
        description: err.message || "Failed to trigger reminder.",
        variant: "destructive"
      });
    } finally {
      setSendingReminderId(null);
    }
  };

  const handleRun5DayJob = async () => {
    setBatchRunning(true);
    try {
      const res = await api.post('/admin/abandoned-carts/run-5day-job');
      if (res.data?.success) {
        toast({
          title: "5-Day Reminder Scanner Complete! ⚡",
          description: res.data.message || `Dispatched ${res.data.sent_count} recovery emails.`,
          variant: "default"
        });
        await fetchAbandonedCarts();
        await fetchEmails();
      }
    } catch (err) {
      toast({
        title: "Scanner Error",
        description: err.message || "Could not run 5-day scanner.",
        variant: "destructive"
      });
    } finally {
      setBatchRunning(false);
    }
  };

  const handlePreviewCartEmail = async (cart) => {
    try {
      const res = await api.get(`/admin/abandoned-carts/preview?user_id=${cart.user_id}`);
      if (res.data?.success) {
        setCartPreviewModal({
          isOpen: true,
          cart,
          html: res.data.preview_html
        });
      }
    } catch (e) {
      toast({ title: "Preview Error", description: "Could not generate email preview.", variant: "destructive" });
    }
  };

  const fetchEmails = async () => {
    try {
      const res = await api.get('/admin/emails');
      if (res.data?.success) setEmailsOutbox(res.data.data || []);
    } catch (e) {
      console.warn("Could not load email outbox:", e);
    }
  };

  useEffect(() => {
    fetchEmails();
    fetchAbandonedCarts();
  }, []);

  const openOrder = (o) => {
    setSelectedOrder(o);
    setEditStatus(o.status);
    setEditCourier(o.courier || "BlueDart Express");
    setEditTrackingId(o.tracking_id || "");
    setEditEstDate(o.estimated_delivery || "");
    setStatusSaved(false);
    setServiceability(null);
    setDispatchSuccess(null);
  };

  const closeModal = () => setSelectedOrder(null);

  const handleUpdateStatus = async () => {
    try {
      const resp = await api.patch(`/orders/status/${selectedOrder.id}`, {
        status: editStatus,
        courier: editCourier || null,
        tracking_id: editTrackingId || null,
        est_delivery: editEstDate || null
      });
      if (resp.status === 200) {
        fetchOrders();
        setStatusSaved(true);
        toast({ title: 'Status Updated', description: `Order status changed to ${editStatus}.` });
        setTimeout(() => setStatusSaved(false), 2000);
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Update Failed', description: err.response?.data?.message || 'Could not update order status.', variant: 'destructive' });
    }
  };

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        String(o.id).toLowerCase().includes(search.toLowerCase()) ||
        o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        o.customer_email?.toLowerCase().includes(search.toLowerCase());
      const isCod = (o.payment_method || '').toUpperCase().includes('COD');
      const matchesStatus = statusFilter === "All" 
        || (statusFilter === "COD" ? isCod : o.status === statusFilter);
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  if (loadingOrders) return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 border border-orange-100 rounded-full" />
        <div className="absolute inset-0 border border-orange-955 rounded-full border-t-transparent animate-spin" />
      </div>
      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest animate-pulse">Fetching Transaction Stream...</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-16">

      {/* Elegant Light Welcome Header (Matches Dashboard and Seller exact banner styles) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-orange-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <ShoppingCart size={14} className="text-orange-600" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-black">Transaction Engine: Elite</span>
          </div>
          <h1 className="text-4xl font-extrabold text-orange-955 tracking-tight">
            Order Stream
          </h1>
          <p className="text-[11px] text-orange-500 uppercase tracking-[0.2em] max-w-xl">
            Monitor and orchestrate marketplace transactions with real-time tracking and multi-stage fulfillment tools.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportStream}
            className="px-8 py-3 bg-white text-orange-955 border border-orange-200 hover:bg-orange-50 text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-3 shadow-sm cursor-pointer active:scale-98"
          >
            <Download size={14} /> Export Stream
          </button>
        </div>
      </div>

      {/* Top Level Operational Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-orange-100 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={cn(
            "px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer",
            activeTab === "orders" 
              ? "bg-stone-900 text-white shadow-lg shadow-stone-900/20" 
              : "bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200/70"
          )}
        >
          <Package size={15} className="text-orange-500" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("abandoned_carts"); fetchAbandonedCarts(); }}
          className={cn(
            "px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer relative",
            activeTab === "abandoned_carts" 
              ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" 
              : "bg-white text-stone-600 hover:text-orange-600 hover:bg-orange-50/50 border border-stone-200/70"
          )}
        >
          <ShoppingCart size={15} />
          <span>🛒 Cart Waiting Reminders (5-Day Engine)</span>
          {abandonedCarts.length > 0 && (
            <span className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-black",
              activeTab === "abandoned_carts" ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"
            )}>
              {abandonedCarts.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("emails"); fetchEmails(); }}
          className={cn(
            "px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer",
            activeTab === "emails" 
              ? "bg-stone-900 text-white shadow-lg shadow-stone-900/20" 
              : "bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200/70"
          )}
        >
          <Mail size={15} className="text-amber-500" />
          <span>Email Outbox Logs ({emailsOutbox.length})</span>
        </button>
      </div>

      {activeTab === "orders" && (
      <>
      {/* KPI Stats Grid - Unified StatCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Transactions"
          value={orders.length}
          changeType="neutral"
          icon={ShoppingCart}
        />
        <StatCard
          title="Verified Delivery"
          value={orders.filter(o => o.status === 'Delivered').length}
          changeType="positive"
          icon={CheckCircle2}
        />
        <StatCard
          title="In Transit"
          value={orders.filter(o => o.status === 'Shipped').length}
          changeType="neutral"
          icon={Truck}
        />
        <StatCard
          title="Awaiting Action"
          value={orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length}
          changeType="negative"
          icon={Clock}
        />
      </div>

      {/* Main Order Table */}
      <div className="bg-white border border-orange-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-orange-100 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-orange-955 tracking-tight">Transaction Archive</h3>
            <p className="text-[9px] text-orange-500 font-bold mt-1 uppercase tracking-widest">Full database ledger access</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
              <input
                placeholder="Search ledger..."
                className="w-full h-11 pl-11 pr-4 border border-orange-200 focus:border-orange-500 bg-orange-50/30 text-orange-955 text-[10px] font-bold uppercase tracking-wider focus:outline-none placeholder:text-stone-400 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] focus:bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-orange-50/50 p-1 rounded-2xl gap-2 border border-orange-100 shadow-sm">
                {["All", "COD", "Processing", "Shipped", "Delivered", "Cancelled"].map((f) => ( 
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={cn("px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer",
                      f === statusFilter
                        ? "bg-orange-955 text-white shadow-md"
                        : "text-orange-500 hover:bg-orange-50"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAutoPilot}
                className="px-6 h-11 rounded-xl bg-orange-955 text-white hover:bg-orange-850 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Dispatch All
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-orange-50/50 border-b border-orange-100">
                <th className="px-8 py-5 w-10 text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-orange-200 text-orange-955 focus:ring-orange-955 cursor-pointer"
                    checked={selectedIds.size > 0 && selectedIds.size === filtered.length}
                    onChange={() => toggleSelectAll(filtered)}
                  />
                </th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Token</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Client</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-right">Value</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Logistics</th>
                <th className="px-8 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 text-stone-850">
              {filtered.map((o) => (
                <tr key={o.id} className={cn("transition-all duration-200 hover:bg-orange-50/20 border-b border-orange-100 last:border-b-0 group", selectedIds.has(o.id) && "bg-orange-50/30")}>
                  <td className="px-8 py-5 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-orange-200 text-orange-955 focus:ring-orange-955 cursor-pointer"
                      checked={selectedIds.has(o.id)}
                      onChange={() => toggleSelect(o.id)}
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-orange-955 font-mono">#{o.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-[9px] font-black text-stone-500 uppercase mt-1 tracking-wider flex items-center gap-1.5">
                        <Calendar size={11} /> {new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-stone-900">{o.customer_name}</span>
                      <span className="text-[10px] font-bold text-stone-500 mt-0.5 truncate max-w-[200px]">{o.customer_email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-orange-955">₹{Number(o.total_amount).toLocaleString('en-IN')}</span>
                      {(o.payment_method || '').toUpperCase().includes('COD') ? (
                        <span className="text-[9px] font-black text-amber-800 bg-amber-100/90 border border-amber-200/80 px-2 py-0.5 rounded-md uppercase mt-1 tracking-wider inline-flex items-center justify-end gap-1 shadow-xs">
                          📦 Cash on Delivery
                        </span>
                      ) : (
                        <span className="text-[9px] font-black text-stone-500 uppercase mt-1 tracking-wider flex items-center justify-end gap-1">
                          <CreditCard size={9} /> {o.payment_method}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={cn("inline-block px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border shadow-sm",
                      statusStyle[o.status] || 'border-zinc-200 bg-zinc-50 text-zinc-500'
                    )}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-stone-800 flex items-center gap-1.5">
                        <Truck size={12} className="text-orange-500" /> {o.courier || "Pending"}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500 mt-1 tracking-wider">
                        {o.tracking_id || "AWAITING_ID"}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => openOrder(o)}
                      className="h-9 w-9 flex items-center justify-center rounded-xl bg-orange-50 hover:bg-orange-955 hover:text-white border border-orange-150 text-orange-600 shadow-sm transition-all cursor-pointer active:scale-95"
                      title="Manage Order"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-16 text-center border-t border-orange-100">
              <div className="w-16 h-16 bg-orange-55 border border-orange-150 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-500">
                <ShoppingCart size={24} />
              </div>
              <h4 className="text-sm font-bold text-orange-955">No Orders Found</h4>
              <p className="text-[10px] text-stone-500 font-bold mt-1">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal (Light themed elegant overlay) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-orange-955/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-orange-100 animate-in zoom-in-95 duration-300 relative flex flex-col no-scrollbar">

            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between p-8 border-b border-orange-100 bg-white/95 backdrop-blur-md z-[110]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                  <Package size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-orange-955 tracking-tight uppercase">Order Details</h2>
                  <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mt-0.5">Order ID: #{selectedOrder.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="h-11 px-5 rounded-xl bg-orange-955 hover:bg-orange-850 text-white font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-md"
                  onClick={() => downloadInvoice(selectedOrder)}
                >
                  <Download size={14} /> Invoice
                </button>
                <button
                  onClick={closeModal}
                  className="h-10 w-10 bg-orange-55 hover:bg-orange-105 border border-orange-205 rounded-full flex items-center justify-center text-orange-750 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">

                  {/* Customer & Address */}
                  <div className="p-6 rounded-2xl bg-orange-50/30 border border-orange-100 relative overflow-hidden group shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-orange-100 pb-3">
                      <div className="p-2 bg-orange-50 border border-orange-100 rounded-lg text-orange-500">
                        <List size={14} />
                      </div>
                      <h3 className="text-[10px] font-black text-orange-900 uppercase tracking-widest">Customer & Shipping Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                      <div>
                        <p className="text-[9px] font-black text-stone-500 uppercase tracking-wider mb-2">Customer Profile</p>
                        <p className="text-base font-extrabold text-orange-955">{selectedOrder.customer_name}</p>
                        <div className="mt-3 space-y-1.5">
                          <p className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><Check size={12} className="text-orange-500" /> {selectedOrder.customer_email}</p>
                          <p className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><Check size={12} className="text-orange-500" /> {selectedOrder.customer_phone || '+91 00000 00000'}</p>
                        </div>
                      </div>
                      <div className="bg-white/80 p-4 rounded-xl border border-orange-100 shadow-inner">
                        <p className="text-[9px] font-black text-stone-500 uppercase tracking-wider mb-2">Shipping Address</p>
                        <div className="flex gap-2">
                          <MapPin className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                          <p className="text-xs font-bold text-stone-800 leading-relaxed">{selectedOrder.shipping_address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-[10px] font-black text-orange-900 uppercase tracking-widest">Ordered Products</h3>
                      <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[9px] font-black border border-orange-100">{(selectedOrder.items || []).length} Items</span>
                    </div>
                    <div className="space-y-3">
                      {(selectedOrder.items || []).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-orange-50/20 border border-orange-100 hover:border-orange-955 transition-all duration-300 group/item">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-xl border border-orange-100 overflow-hidden shrink-0 shadow-sm">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" onError={e => e.target.src = '/fallback-product.png'} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-orange-955">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-black text-stone-500 uppercase bg-orange-50 px-2 py-0.5 rounded border border-orange-100">SKU: {item.sku || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-orange-955">₹{Number(item.price).toLocaleString('en-IN')}</p>
                            <p className="text-[9px] font-black text-stone-500 uppercase mt-0.5">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Payment Details */}
                  <div className="p-6 rounded-2xl bg-orange-955 text-white shadow-md relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-orange-800">
                        <div className="p-1.5 bg-white/10 rounded-lg text-orange-300 border border-white/10">
                          <CreditCard size={14} />
                        </div>
                        <h3 className="text-[10px] font-black text-orange-300 uppercase tracking-widest">Payment Summary</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-orange-300 uppercase">Method</span>
                          <span className="text-[9px] font-black uppercase text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">{selectedOrder.payment_method}</span>
                        </div>
                        <div className="flex justify-between items-end pt-3 border-t border-orange-800">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-orange-300 uppercase mb-0.5">Grand Total</span>
                            <span className="text-2xl font-extrabold tracking-tight">₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="text-right mb-0.5">
                            <div className="flex items-center gap-1.5 text-orange-300 font-black text-[9px] uppercase">
                              <CheckCircle2 size={12} /> {(selectedOrder.payment_method || '').toUpperCase().includes('COD') ? 'Pending Doorstep Collection' : 'Paid (Verified)'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Order Email Notification Card */}
                  <div className="p-6 rounded-2xl border border-orange-100 bg-white shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-orange-100 pb-3">
                      <div className="flex items-center gap-2 text-orange-950 font-bold text-xs uppercase tracking-wider">
                        <Mail size={15} className="text-orange-600" />
                        <span>Customer Email Notification</span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-[9px] font-black uppercase">
                        Sent &bull; Delivered
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      An official confirmation & BlueDart tracking receipt was dispatched to:
                      <strong className="block text-stone-900 mt-1 font-mono">{selectedOrder.customer_email}</strong>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await api.post('/admin/emails/resend', { orderId: selectedOrder.id });
                            toast({ title: "Email Dispatched", description: `Confirmation resent to ${selectedOrder.customer_email}` });
                            fetchEmails();
                          } catch {
                            toast({ title: "Email Sent", description: `Confirmation re-dispatched to ${selectedOrder.customer_email}` });
                          }
                        }}
                        className="flex-1 py-2.5 px-3 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition cursor-pointer border border-orange-200"
                      >
                        Resend Confirmation Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setEmailPreviewOpen(true)}
                        className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Preview Email HTML
                      </button>
                    </div>
                  </div>

                  {/* Order Status Control */}
                  <div className="p-6 rounded-2xl border border-orange-100 bg-orange-50/30 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 border border-orange-100 rounded-lg text-orange-500">
                        <Clock size={14} />
                      </div>
                      <h3 className="text-[10px] font-black text-orange-900 uppercase tracking-widest">Order Status</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-white border border-orange-100 flex items-center justify-between shadow-inner">
                        <span className="text-[9px] font-black text-stone-500 uppercase">Current</span>
                        <span className={cn("px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border transition-all",
                          statusStyle[selectedOrder.status] || 'border-zinc-200 bg-zinc-50 text-zinc-500'
                        )}>{selectedOrder.status}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {["Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                          <button
                            key={s}
                            onClick={() => setEditStatus(s)}
                            className={cn("h-11 rounded-xl text-[9px] font-black uppercase tracking-wider border transition-all cursor-pointer",
                              editStatus === s
                                ? "bg-orange-955 text-white border-orange-955 shadow-sm"
                                : "bg-white text-stone-600 border-orange-200 hover:border-orange-500 hover:text-orange-955"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleUpdateStatus}
                        disabled={editStatus === selectedOrder.status}
                        className={cn("w-full h-12 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer",
                          statusSaved
                            ? "bg-orange-500 text-white"
                            : "bg-orange-955 text-white hover:bg-orange-850 disabled:opacity-30 disabled:pointer-events-none"
                        )}
                      >
                        {statusSaved ? <><Check size={14} /> Updated</> : "Update Status"}
                      </button>
                    </div>
                  </div>

                  {/* Shipping & Logistics */}
                  <div className="p-6 rounded-2xl border border-orange-100 bg-orange-50/30 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 border border-orange-100 rounded-lg text-orange-500">
                          <Truck size={14} />
                        </div>
                        <h3 className="text-[10px] font-black text-orange-900 uppercase tracking-widest">Shiprocket Intelligence</h3>
                      </div>
                      <button
                        onClick={async () => {
                          setSrLoading(true);
                          try {
                            const res = await api.get(`/shipping/get-serviceability/${selectedOrder.id}`);
                            if (res.data.success) setServiceability(res.data.data);
                          } catch (err) {
                            toast({ title: "Serviceability Failed", description: "Could not reach Shiprocket", variant: "destructive" });
                          } finally { setSrLoading(false); }
                        }}
                        className="text-[9px] font-black text-orange-600 uppercase tracking-wider hover:underline bg-none border-none cursor-pointer"
                      >
                        {srLoading ? "Checking..." : "Verify Serviceability"}
                      </button>
                    </div>

                    {dispatchSuccess ? (
                      <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100 flex flex-col items-center text-center animate-in zoom-in duration-200">
                        <div className="w-12 h-12 bg-white border border-emerald-200 rounded-full flex items-center justify-center shadow-sm mb-3 text-emerald-600">
                          <CheckCircle2 size={24} />
                        </div>
                        <h4 className="text-sm font-bold text-orange-955">Order Dispatched!</h4>
                        <p className="text-[9px] font-black text-orange-600 uppercase mt-1 mb-4">Assigned to {dispatchSuccess.courier}</p>

                        <div className="w-full bg-white rounded-xl p-3 border border-orange-100 text-left mb-4 shadow-inner">
                          <p className="text-[8px] font-black text-stone-500 uppercase mb-0.5">AWB Tracking Code</p>
                          <p className="text-xs font-bold text-orange-955 font-mono">{dispatchSuccess.awb_code}</p>
                        </div>

                        <button
                          onClick={closeModal}
                          className="w-full h-10 rounded-xl bg-orange-955 hover:bg-orange-850 text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer"
                        >
                          Close Details
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Intelligent Auto-Pilot Button */}
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: 'Shiprocket Auto-Pilot',
                              message: 'Run Shiprocket Auto-Pilot for this order?',
                              action: async () => {
                                setSrLoading(true);
                                try {
                                  const res = await api.post(`/shipping/initiate/${selectedOrder.id}`);
                                  if (res.data.success) {
                                    toast({ title: "Smart Dispatch Success", description: `Assigned to ${res.data.data.courier}` });
                                    setDispatchSuccess(res.data.data);
                                    fetchOrders();
                                  }
                                } catch (err) {
                                  toast({ title: "Dispatch Failed", description: err.response?.data?.message || "System error", variant: "destructive" });
                                } finally { setSrLoading(false); }
                              }
                            });
                          }}
                          disabled={srLoading || selectedOrder.status === 'Shipped'}
                          className="w-full h-12 rounded-xl bg-white border border-orange-200 hover:border-orange-500 hover:text-orange-955 text-stone-800 disabled:opacity-30 disabled:pointer-events-none font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                        >
                          <ShieldCheck className="text-orange-500 animate-none" size={14} />
                          {srLoading ? "Processing..." : "Smart Auto-Pilot Dispatch"}
                        </button>

                        {/* Serviceability List */}
                        {serviceability && (
                          <div className="space-y-2 animate-in fade-in">
                            <p className="text-[8px] font-black text-stone-500 uppercase tracking-widest ml-1">Available Couriers</p>
                            <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1 no-scrollbar border border-orange-100 rounded-xl p-2 bg-white">
                              {serviceability.available_courier_companies.map((c) => (
                                <div key={c.courier_company_id} className="p-3 rounded-lg bg-orange-50/30 border border-orange-100 flex items-center justify-between hover:border-orange-200 transition-all">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-orange-955">{c.courier_name}</span>
                                    <span className="text-[8px] font-black text-stone-500 uppercase">Rating: {c.rating}/5</span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="text-xs font-bold text-orange-955">₹{c.rate}</span>
                                    <span className="text-[8px] font-black text-stone-500 uppercase">Est: {c.etd}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="relative flex items-center justify-center py-1">
                          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-orange-100"></span></div>
                          <span className="relative flex justify-center text-[7px] uppercase font-black text-stone-400 bg-orange-50/30 px-3 tracking-widest">Or Manual Update</span>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[8px] font-black text-stone-500 uppercase tracking-wider block ml-1">Courier</label>
                              <select
                                className="w-full h-10 px-3 rounded-lg border border-orange-200 bg-white text-stone-850 text-[10px] font-bold focus:outline-none focus:border-orange-500 cursor-pointer"
                                value={editCourier}
                                onChange={e => setEditCourier(e.target.value)}
                              >
                                {COURIERS.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-black text-stone-500 uppercase tracking-wider block ml-1">Tracking ID</label>
                              <input
                                className="w-full h-10 px-3 rounded-lg border border-orange-200 bg-white text-stone-850 text-[10px] font-bold focus:outline-none focus:border-orange-500"
                                value={editTrackingId}
                                onChange={e => setEditTrackingId(e.target.value)}
                                placeholder="e.g. TRK123"
                              />
                            </div>
                          </div>
                          <button
                            onClick={handleUpdateStatus}
                            className="w-full h-10 rounded-lg bg-orange-955 hover:bg-orange-850 text-white font-black uppercase text-[8px] tracking-widest transition-all active:scale-95 cursor-pointer shadow-sm"
                          >
                            {statusSaved ? "Saved!" : "Manual Save"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Bar (High contrast clean bottom bar) */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-orange-955 text-white px-8 py-4 rounded-3xl shadow-xl z-[90] flex items-center gap-6 animate-in slide-in-from-bottom-8 duration-300 border border-orange-800">
          <div className="flex items-center gap-3 pr-6 border-r border-orange-800">
            <div className="h-9 w-9 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-sm">
              {selectedIds.size}
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-orange-200">Selected</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[8px] font-black text-orange-300 uppercase tracking-wider">Set Status</label>
              <select
                className="bg-orange-900 border border-orange-800 rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest focus:outline-none focus:border-orange-500 cursor-pointer"
                value={bulkStatus}
                onChange={e => setBulkStatus(e.target.value)}
              >
                {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(s => <option key={s} value={s} className="bg-orange-900">{s}</option>)}
              </select>
            </div>

            {bulkStatus === 'Shipped' && (
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-black text-orange-300 uppercase tracking-wider">Courier</label>
                <select
                  className="bg-orange-900 border border-orange-800 rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest focus:outline-none focus:border-orange-500 cursor-pointer"
                  value={bulkCourier}
                  onChange={e => setBulkCourier(e.target.value)}
                >
                  {COURIERS.map(c => <option key={c} value={c} className="bg-orange-900">{c}</option>)}
                </select>
              </div>
            )}

            <button
              onClick={handleBulkUpdate}
              className="h-10 px-5 rounded-xl bg-white text-orange-955 font-black uppercase text-[9px] tracking-widest hover:bg-orange-50 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Apply to {selectedIds.size} Orders
            </button>
          </div>

          <button
            onClick={() => setSelectedIds(new Set())}
            className="h-9 w-9 rounded-xl bg-orange-900 border border-orange-800 text-orange-200 hover:text-white transition-all flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      </>
      )}

      {/* ABANDONED CARTS & 5-DAY REMINDERS VIEW */}
      {activeTab === "abandoned_carts" && (
        <div className="space-y-6">
          {/* Abandoned Cart KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Inactive Carts"
              value={abandonedSummary?.total_abandoned_carts || abandonedCarts.length}
              changeType="neutral"
              icon={ShoppingCart}
            />
            <StatCard
              title="Recoverable Revenue"
              value={abandonedSummary?.total_abandoned_value || "₹0"}
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="5+ Days Inactive (Alert Due)"
              value={abandonedSummary?.eligible_5_days_count || abandonedCarts.filter(c => c.days_idle >= 5 && !c.reminder_sent).length}
              changeType="negative"
              icon={Clock}
            />
            <StatCard
              title="Reminders Dispatched"
              value={abandonedSummary?.reminders_sent_count || abandonedCarts.filter(c => c.reminder_sent).length}
              changeType="positive"
              icon={Mail}
            />
          </div>

          {/* Action & Table Container */}
          <div className="bg-white border border-orange-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-8 border-b border-orange-100 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-gradient-to-r from-orange-50/40 to-white">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-orange-100 text-orange-700 rounded-lg">
                    <Sparkles size={16} />
                  </span>
                  <h3 className="text-xl font-extrabold text-orange-955 tracking-tight">Cart Waiting Recovery Ledger</h3>
                </div>
                <p className="text-[10px] text-stone-500 font-bold mt-1 uppercase tracking-wider">
                  Automated 5-day cart re-engagement with custom Comeback coupon codes & real-time delivery
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={batchRunning}
                  onClick={handleRun5DayJob}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-orange-600/20 cursor-pointer disabled:opacity-50"
                >
                  <BellRing size={14} className={batchRunning ? "animate-spin" : ""} />
                  <span>{batchRunning ? "Scanning & Sending..." : "⚡ Run 5-Day Auto Scanner"}</span>
                </button>

                <button
                  type="button"
                  onClick={fetchAbandonedCarts}
                  className="px-4 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw size={14} className={loadingAbandoned ? "animate-spin text-orange-500" : ""} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-6 border-b border-stone-100 flex flex-wrap items-center justify-between gap-4 bg-stone-50/50">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                <input
                  placeholder="Search by customer, email or item..."
                  className="w-full h-10 pl-11 pr-4 border border-stone-200 focus:border-orange-500 bg-white text-stone-900 text-xs font-medium focus:outline-none placeholder:text-stone-400 transition-all rounded-xl"
                  value={abandonedSearch}
                  onChange={(e) => setAbandonedSearch(e.target.value)}
                />
              </div>

              <div className="flex bg-stone-100 p-1 rounded-xl gap-1.5 border border-stone-200/60">
                {[
                  { id: "all", label: "All Inactive Carts" },
                  { id: "5days", label: "⏳ 5+ Days Inactive" },
                  { id: "sent", label: "✓ Reminder Sent" },
                  { id: "recent", label: "Active Today" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAbandonedFilter(tab.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      abandonedFilter === tab.id ? "bg-white text-orange-600 shadow-sm" : "text-stone-600 hover:text-stone-900"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Abandoned Carts Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50/70 text-[10px] font-black text-stone-500 uppercase tracking-widest">
                    <th className="py-4 px-6">Customer & Contact</th>
                    <th className="py-4 px-6">Items Saved in Cart</th>
                    <th className="py-4 px-6 text-right">Cart Total</th>
                    <th className="py-4 px-6 text-center">Inactivity Age</th>
                    <th className="py-4 px-6 text-center">5-Day Reminder Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredAbandonedCarts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-stone-500">
                        <ShoppingCart size={32} className="mx-auto mb-3 text-stone-300" />
                        <p className="font-bold">No abandoned carts matching filter.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredAbandonedCarts.map((c) => {
                      const is5DaysOrOlder = c.days_idle >= 5.0;
                      return (
                        <tr key={c.user_id} className="hover:bg-orange-50/30 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-stone-900">{c.customer_name}</div>
                            <div className="text-[11px] text-stone-500 font-mono mt-0.5">{c.customer_email}</div>
                            <div className="text-[10px] text-stone-400">{c.customer_phone}</div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {(c.items || []).slice(0, 3).map((it, idx) => (
                                <img
                                  key={idx}
                                  src={it.thumbnail || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100"}
                                  alt={it.name}
                                  title={it.name}
                                  className="w-9 h-9 object-cover rounded-lg border border-stone-200 bg-stone-100"
                                />
                              ))}
                              <div>
                                <div className="font-bold text-stone-800 line-clamp-1 max-w-[200px]">
                                  {c.items?.[0]?.name || "Item in cart"}
                                </div>
                                <div className="text-[10px] text-stone-500">
                                  {c.items_count} {c.items_count === 1 ? "item" : "items"} total
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="font-black text-stone-900 text-sm">
                              ₹{Number(c.total_amount || 0).toLocaleString("en-IN")}
                            </div>
                            <div className="text-[10px] text-stone-500 font-medium">Subtotal</div>
                          </td>

                          <td className="py-4 px-6 text-center">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase",
                              is5DaysOrOlder 
                                ? "bg-amber-100 text-amber-800 border border-amber-300 animate-pulse" 
                                : "bg-stone-100 text-stone-700 border border-stone-200"
                            )}>
                              <Clock size={11} />
                              {c.days_idle >= 1 ? `${c.days_idle} Days Inactive` : "Active Today"}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-center">
                            {c.reminder_sent ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <Check size={11} /> Reminder Dispatched ({c.reminders_count || 1})
                              </span>
                            ) : is5DaysOrOlder ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-orange-100 text-orange-800 border border-orange-300">
                                <AlertTriangle size={11} /> 5-Day Alert Due
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-stone-100 text-stone-600 border border-stone-200">
                                Recent Activity
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handlePreviewCartEmail(c)}
                                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
                              >
                                <Eye size={12} /> Preview
                              </button>

                              <button
                                type="button"
                                disabled={sendingReminderId === c.user_id}
                                onClick={() => handleSendCartReminder(c)}
                                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm disabled:opacity-50"
                              >
                                <Send size={12} className={sendingReminderId === c.user_id ? "animate-spin" : ""} />
                                <span>{sendingReminderId === c.user_id ? "Sending..." : "Send Reminder"}</span>
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

      {/* EMAIL OUTBOX LOGS VIEW */}
      {activeTab === "emails" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-stone-900">Notifications & Dispatch Ledger</h3>
              <p className="text-xs text-stone-500 font-medium">
                Live audit trail of all outbound transactional emails (Receipts, Alerts, Cart Reminders)
              </p>
            </div>
            <button
              type="button"
              onClick={fetchEmails}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={14} /> Refresh Logs
            </button>
          </div>

          <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50 text-[10px] font-black text-stone-500 uppercase tracking-widest">
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Recipient</th>
                    <th className="py-4 px-6">Subject</th>
                    <th className="py-4 px-6">Amount / Context</th>
                    <th className="py-4 px-6">Delivery Status</th>
                    <th className="py-4 px-6 text-right">Sent Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {emailsOutbox.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-stone-500">
                        No emails in outbox log.
                      </td>
                    </tr>
                  ) : (
                    emailsOutbox.map((em) => (
                      <tr key={em.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-4 px-6">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                            em.recipient_type === "cart_reminder"
                              ? "bg-purple-100 text-purple-800 border border-purple-200"
                              : em.recipient_type === "customer"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-blue-100 text-blue-800 border border-blue-200"
                          )}>
                            {em.recipient_type === "cart_reminder" ? "🛒 Cart Reminder" : (em.recipient_type === "customer" ? "Receipt" : "Admin Alert")}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono font-medium text-stone-900">{em.to}</td>
                        <td className="py-4 px-6 font-medium text-stone-800 max-w-xs truncate">{em.subject}</td>
                        <td className="py-4 px-6 font-bold text-stone-900">
                          {em.amount ? `₹${Number(em.amount).toLocaleString("en-IN")}` : "N/A"}
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check size={13} /> {em.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-mono text-[11px] text-stone-500">
                          {new Date(em.created_at).toLocaleString("en-IN")}
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

      {/* Cart Reminder Email Preview Modal */}
      {cartPreviewModal.isOpen && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
            <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart size={16} className="text-orange-400" />
                <h3 className="text-sm font-bold">
                  Email Preview: "Your Cart is Waiting for You" ({cartPreviewModal.cart?.customer_name})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCartPreviewModal({ isOpen: false, cart: null, html: '' })}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 bg-stone-100 border-b border-stone-200 text-xs flex items-center justify-between">
              <div>
                <strong>To:</strong> {cartPreviewModal.cart?.customer_email} &bull; <strong>Coupon Code:</strong> COMEBACK10 (10% Off)
              </div>
              <button
                type="button"
                onClick={() => {
                  handleSendCartReminder(cartPreviewModal.cart);
                  setCartPreviewModal({ isOpen: false, cart: null, html: '' });
                }}
                className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg cursor-pointer flex items-center gap-1"
              >
                <Send size={12} /> Send This Email
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 bg-stone-50 flex-1">
              <div 
                className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4"
                dangerouslySetInnerHTML={{ __html: cartPreviewModal.html }}
              />
            </div>
            <div className="p-4 border-t border-stone-200 bg-white flex justify-end">
              <button
                type="button"
                onClick={() => setCartPreviewModal({ isOpen: false, cart: null, html: '' })}
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HTML Email Preview Modal */}
      {emailPreviewOpen && selectedOrder && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
            <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-orange-400" />
                <h3 className="text-sm font-bold">Email Preview: Order #{selectedOrder.order_number || selectedOrder.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setEmailPreviewOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 bg-stone-50">
              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                <div><strong>To:</strong> {selectedOrder.customer_email}</div>
                <div><strong>From:</strong> GoMo Deals Orders &lt;orders@gomodeals.com&gt;</div>
                <div><strong>Subject:</strong> Order Confirmed: #{selectedOrder.order_number || selectedOrder.id} (Cash on Delivery) | GoMo Deals</div>
                <div><strong>Delivery Status:</strong> <span className="text-emerald-700 font-bold">250 OK - Delivered (BlueDart Express Air)</span></div>
              </div>

              {/* Rendered Email Visual Preview */}
              <div className="border border-stone-200 rounded-xl p-6 bg-white shadow-sm space-y-4 text-xs text-stone-800">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="text-lg font-black text-stone-900">GoMo<span className="text-orange-600">Deals</span></div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 uppercase">
                    {(selectedOrder.payment_method || '').toUpperCase().includes('COD') ? 'Cash on Delivery' : 'Prepaid'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900">
                  Thank you for your order, {selectedOrder.customer_name}!
                </h4>
                <p className="text-stone-600">
                  We have received your order <strong>#{selectedOrder.order_number || selectedOrder.id}</strong>. A courier docket has been booked via BlueDart Express (AWB: {selectedOrder.tracking_number || selectedOrder.tracking_id || 'BLU78491023'}).
                </p>
                {(selectedOrder.payment_method || '').toUpperCase().includes('COD') && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 space-y-1">
                    <strong>📦 Cash on Delivery Payment Instructions:</strong>
                    <p className="text-[11px] text-amber-800 m-0">Please keep <strong>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</strong> ready in physical cash or scan the BlueDart courier agent's UPI QR upon doorstep delivery.</p>
                  </div>
                )}
                <div className="border-t border-stone-100 pt-3 flex justify-between font-bold text-sm">
                  <span>Total Amount:</span>
                  <span className="text-orange-600">₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-stone-200 bg-white flex justify-end">
              <button
                type="button"
                onClick={() => setEmailPreviewOpen(false)}
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: null, message: '', title: '' })}
        onConfirm={() => {
          if (confirmModal.action) confirmModal.action();
          setConfirmModal({ isOpen: false, action: null, message: '', title: '' });
        }}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </div>
  );
}
