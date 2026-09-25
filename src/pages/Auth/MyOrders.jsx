import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Truck, 
  Search, 
  RotateCcw, 
  XCircle, 
  Printer, 
  Package, 
  ChevronRight, 
  AlertCircle,
  Calendar,
  CreditCard,
  Eye,
  SlidersHorizontal,
  ArrowUpDown,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { 
  getMyOrders, 
  cancelOrder, 
  createReturnRequest, 
  updateOrderStatus 
} from '../../services/orderService';
import { toast } from 'react-hot-toast';

import OrderTimeline from '../../components/Orders/OrderTimeline';
import OrderDetailsModal from '../../components/Orders/OrderDetailsModal';
import OrderInvoiceModal from '../../components/Orders/OrderInvoiceModal';

const MyOrders = () => {
  const { user } = useAuth();
  const { formatPrice, t } = useShop();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');

  // Modals state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);

  // Cancellation & Return inputs
  const [cancelReason, setCancelReason] = useState('Found a better price');
  const [cancelCustomNotes, setCancelCustomNotes] = useState('');
  const [returnType, setReturnType] = useState('Refund');
  const [returnReason, setReturnReason] = useState('Defective / Damaged item');
  const [returnNotes, setReturnNotes] = useState('');
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyOrders(user?.customer_id || user?.id);
      if (res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error("Failed to load customer orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // Open Modals Handlers
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleViewInvoice = (order) => {
    setSelectedOrder(order);
    setIsInvoiceOpen(true);
  };

  const handleOpenCancel = (order) => {
    setSelectedOrder(order);
    setCancelReason('Found a better price');
    setCancelCustomNotes('');
    setIsCancelOpen(true);
  };

  const handleOpenReturn = (order) => {
    setSelectedOrder(order);
    setReturnType('Refund');
    setReturnReason('Defective / Damaged item');
    setReturnNotes('');
    setIsReturnOpen(true);
  };

  // Lifecycle Progression simulator (for testing all status states)
  const handleAdvanceStatus = async (order) => {
    const current = order.order_status || 'Confirmed';
    const sequence = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const curIdx = sequence.indexOf(current);

    if (curIdx !== -1 && curIdx < sequence.length - 1) {
      const nextStatus = sequence[curIdx + 1];
      const res = await updateOrderStatus(order.order_id, nextStatus);
      if (res.success) {
        toast.success(`Order advanced to: ${nextStatus}`);
        setOrders(prev => prev.map(o => o.order_id === order.order_id ? res.data : o));
        if (selectedOrder?.order_id === order.order_id) {
          setSelectedOrder(res.data);
        }
      }
    } else {
      toast('Order has reached final fulfillment stage.');
    }
  };

  // Submit Cancellation
  const handleConfirmCancel = async () => {
    if (!selectedOrder) return;
    setIsSubmittingAction(true);
    try {
      const reasonCombined = cancelCustomNotes.trim() 
        ? `${cancelReason} - ${cancelCustomNotes}` 
        : cancelReason;
      
      const res = await cancelOrder(selectedOrder.order_id, user?.id, reasonCombined);
      if (res.success) {
        toast.success("Order cancelled successfully.");
        setOrders(prev => prev.map(o => o.order_id === selectedOrder.order_id ? res.data : o));
        if (selectedOrder.order_id === res.data.order_id) {
          setSelectedOrder(res.data);
        }
        setIsCancelOpen(false);
      } else {
        toast.error(res.error || "Failed to cancel order.");
      }
    } catch (err) {
      toast.error("Error cancelling order.");
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Submit Return
  const handleConfirmReturn = async () => {
    if (!selectedOrder) return;
    setIsSubmittingAction(true);
    try {
      const res = await createReturnRequest({
        order_id: selectedOrder.order_id,
        reason: returnReason,
        return_type: returnType,
        notes: returnNotes
      });

      if (res.success) {
        toast.success("Return request registered successfully.");
        setOrders(prev => prev.map(o => o.order_id === selectedOrder.order_id ? res.data : o));
        if (selectedOrder.order_id === res.data.order_id) {
          setSelectedOrder(res.data);
        }
        setIsReturnOpen(false);
      } else {
        toast.error(res.message || "Failed to submit return request.");
      }
    } catch (err) {
      toast.error("Error submitting return request.");
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Filtering Logic
  const filteredOrders = orders.filter((order) => {
    // 1. Search filter
    const q = searchTerm.toLowerCase().trim();
    if (q) {
      const matchNum = (order.order_number || order.order_id || '').toLowerCase().includes(q);
      const matchItem = (order.items || []).some(item => (item.name || '').toLowerCase().includes(q));
      if (!matchNum && !matchItem) return false;
    }

    // 2. Status filter
    const status = order.order_status || 'Confirmed';
    if (filterStatus === 'Active') {
      return ['Order Placed', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery'].includes(status);
    }
    if (filterStatus === 'Delivered') {
      return status === 'Delivered';
    }
    if (filterStatus === 'Cancelled') {
      return status === 'Cancelled';
    }
    if (filterStatus === 'Returns') {
      return ['Return Requested', 'Returned', 'Refunded'].includes(status);
    }

    return true;
  });

  // Sorting Logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    const totalA = Number(a.prices?.total || a.total_amount || a.total || 0);
    const totalB = Number(b.prices?.total || b.total_amount || b.total || 0);

    if (sortBy === 'date_desc') return dateB - dateA;
    if (sortBy === 'date_asc') return dateA - dateB;
    if (sortBy === 'price_desc') return totalB - totalA;
    if (sortBy === 'price_asc') return totalA - totalB;
    return 0;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'Cancelled':
        return 'bg-rose-50 border-rose-200 text-rose-800';
      case 'Return Requested':
      case 'Returned':
      case 'Refunded':
        return 'bg-amber-50 border-amber-200 text-amber-850';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-orange-50 border-orange-200 text-orange-900';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-20 pb-28 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-orange-200/80">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-600 font-bold block mb-2">
              Customer Concierge
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif italic text-orange-955 font-normal">
              {t("My Orders & Tracking")}
            </h1>
            <p className="text-xs uppercase tracking-widest text-orange-850/60 font-bold mt-2">
              Review order history, live tracking milestones, invoices, and returns
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-3.5 bg-orange-955 text-white text-[10px] uppercase tracking-[0.3em] font-black hover:bg-orange-850 transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
          >
            {t("Browse Boutique")}
          </button>
        </div>

        {/* Filter, Search & Sort Control Bar */}
        <div className="bg-white p-5 sm:p-6 border border-orange-200/80 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("Search by Order # or item name...")}
                className="w-full h-11 pl-10 pr-4 bg-orange-50/50 border border-orange-200 text-xs text-orange-950 focus:outline-none focus:border-orange-950 rounded-none placeholder:text-orange-400 font-sans"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="md:col-span-4 flex items-center overflow-x-auto gap-1 border border-orange-200 p-1 bg-orange-50/30">
              {[
                { id: 'All', label: 'All' },
                { id: 'Active', label: 'In Progress' },
                { id: 'Delivered', label: 'Delivered' },
                { id: 'Returns', label: 'Returns' },
                { id: 'Cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterStatus(tab.id)}
                  className={`flex-1 py-1.5 px-2 text-[9px] uppercase tracking-wider font-black whitespace-nowrap transition-colors cursor-pointer ${
                    filterStatus === tab.id
                      ? "bg-orange-955 text-white shadow-sm"
                      : "text-orange-800 hover:text-orange-955"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3 flex items-center gap-2">
              <ArrowUpDown size={14} className="text-orange-600 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-orange-200 text-[10px] uppercase tracking-widest font-black text-orange-950 focus:outline-none focus:border-orange-950 rounded-none cursor-pointer"
              >
                <option value="date_desc">{t("Newest First")}</option>
                <option value="date_asc">{t("Oldest First")}</option>
                <option value="price_desc">{t("Price: High to Low")}</option>
                <option value="price_asc">{t("Price: Low to High")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Listing */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-orange-200 border-t-orange-955 rounded-full animate-spin mx-auto" />
            <p className="text-[10px] uppercase tracking-widest font-black text-orange-500">
              {t("Retrieving order records...")}
            </p>
          </div>
        ) : sortedOrders.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-dashed border-orange-200 p-16 text-center space-y-4">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-400 mx-auto">
              <ShoppingBag size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-2xl font-serif italic text-orange-955">
              {searchTerm || filterStatus !== 'All' ? t("No matching orders found") : t("No orders placed yet")}
            </h3>
            <p className="text-xs uppercase tracking-widest text-orange-400 font-bold max-w-sm mx-auto leading-relaxed">
              {searchTerm || filterStatus !== 'All'
                ? t("Try broadening your search term or changing your status filter.")
                : t("When you make a purchase, your orders and tracking timelines will appear here.")}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('All');
                if (orders.length === 0) navigate('/products');
              }}
              className="px-8 py-3.5 bg-orange-955 text-white text-[10px] uppercase tracking-widest font-black hover:bg-orange-850 transition-colors cursor-pointer shadow-sm mt-2"
            >
              {orders.length === 0 ? t("Start Shopping") : t("Clear Filters")}
            </button>
          </div>
        ) : (
          /* Order Cards List */
          <div className="space-y-6">
            <AnimatePresence>
              {sortedOrders.map((order) => {
                const items = order.items || [];
                const status = order.order_status || 'Confirmed';
                const total = order.prices?.total || order.total_amount || order.total || 0;
                const dateStr = new Date(order.created_at || Date.now()).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });
                const isCancellable = ['Order Placed', 'Pending', 'Confirmed', 'Processing'].includes(status);
                const isReturnable = status === 'Delivered';

                return (
                  <motion.div
                    key={order.order_id || order.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white border border-orange-200/90 shadow-sm hover:border-orange-400 transition-colors overflow-hidden"
                  >
                    {/* Card Top Metadata Strip */}
                    <div className="bg-orange-50/60 p-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 text-xs">
                      <div className="flex flex-wrap items-center gap-6">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest font-black text-orange-400">Order Placed</p>
                          <p className="font-serif italic font-bold text-orange-950 mt-0.5">{dateStr}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest font-black text-orange-400">Total Amount</p>
                          <p className="font-mono font-bold text-orange-955 mt-0.5">{formatPrice(total)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest font-black text-orange-400">Ship To</p>
                          <p className="font-serif italic font-medium text-orange-950 mt-0.5 truncate max-w-[140px]">
                            {order.delivery_address?.full_name || order.customer?.name || "Customer"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 border text-[10px] uppercase tracking-widest font-black ${getStatusBadge(status)}`}>
                          {status}
                        </span>
                        <span className="px-2.5 py-1 bg-white border border-orange-200 text-orange-900 text-[9px] font-mono font-bold">
                          {order.payment_status || 'Paid'}
                        </span>
                      </div>
                    </div>

                    {/* Card Middle: Item Thumbnails + Title + Actions */}
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      {/* Products preview */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                          <Package size={16} className="text-orange-600" />
                          <span className="text-[10px] font-mono font-bold text-orange-950 tracking-wide">
                            #{order.order_number || order.order_id}
                          </span>
                          <span className="text-[10px] text-orange-400">• {items.length} {items.length === 1 ? 'item' : 'items'}</span>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                          {items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-orange-50/40 p-2 pr-4 border border-orange-100 max-w-xs">
                              <div className="w-12 h-12 bg-white border border-orange-200 overflow-hidden shrink-0">
                                <img
                                  src={item.thumbnail || item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150"; }}
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-serif italic font-bold text-orange-950 truncate">
                                  {item.name}
                                </p>
                                <p className="text-[9px] font-mono text-orange-500">
                                  Qty: {item.quantity || 1} • {formatPrice(Number(item.price || 0))}
                                </p>
                              </div>
                            </div>
                          ))}

                          {items.length > 3 && (
                            <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-2">
                              +{items.length - 3} more items
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-48 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleViewDetails(order)}
                          className="flex-1 md:w-full h-11 bg-orange-955 text-white text-[10px] uppercase tracking-widest font-black hover:bg-orange-850 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Eye size={13} /> {t("Order Details")}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleViewInvoice(order)}
                          className="flex-1 md:w-full h-11 bg-white border border-orange-300 text-orange-950 text-[10px] uppercase tracking-widest font-black hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Printer size={13} /> {t("Tax Invoice")}
                        </button>

                        {/* Lifecycle Simulator demo button */}
                        {status !== 'Delivered' && status !== 'Cancelled' && !status.includes('Return') && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceStatus(order)}
                            className="flex-1 md:w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[9px] font-mono font-bold transition-colors cursor-pointer"
                            title="Simulate advancing fulfillment lifecycle"
                          >
                            Advance Status
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Footer Info Strip */}
                    <div className="bg-orange-50/20 px-6 sm:px-8 py-3 border-t border-orange-100 flex flex-wrap items-center justify-between gap-4 text-[10px] text-orange-600">
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-orange-500" />
                        <span>
                          {order.shipping_method === 'express' ? t("Express Studio Courier") : t("Standard Ground Logistics")}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        {isCancellable && (
                          <button
                            type="button"
                            onClick={() => handleOpenCancel(order)}
                            className="text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider underline cursor-pointer"
                          >
                            {t("Cancel Order")}
                          </button>
                        )}

                        {isReturnable && (
                          <button
                            type="button"
                            onClick={() => handleOpenReturn(order)}
                            className="text-orange-700 hover:text-orange-955 font-bold uppercase tracking-wider underline cursor-pointer"
                          >
                            {t("Return Order")}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onCancelClick={(ord) => {
          setIsDetailsOpen(false);
          handleOpenCancel(ord);
        }}
        onReturnClick={(ord) => {
          setIsDetailsOpen(false);
          handleOpenReturn(ord);
        }}
        onInvoiceClick={(ord) => {
          setIsDetailsOpen(false);
          handleViewInvoice(ord);
        }}
        onAdvanceStatus={handleAdvanceStatus}
      />

      {/* Tax Invoice Modal */}
      <OrderInvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => {
          setIsInvoiceOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

      {/* Cancel Order Dialog Modal */}
      <AnimatePresence>
        {isCancelOpen && selectedOrder && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCancelOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white shadow-2xl border border-rose-200 z-10 p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 text-rose-600 pb-4 border-b border-rose-100">
                <XCircle size={22} />
                <div>
                  <h3 className="font-serif italic font-bold text-lg text-rose-950">{t("Cancel Order Confirmation")}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-rose-500 font-bold">
                    Order #{selectedOrder.order_number || selectedOrder.order_id}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-100 text-xs text-rose-900 leading-relaxed font-light">
                Are you sure you wish to cancel this order? If payment was already completed online, a refund will be initiated to your original payment method within 3–5 business days.
              </div>

              <div className="space-y-3">
                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-rose-900">
                  {t("Select Cancellation Reason")} *
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full h-11 px-3 bg-white border border-rose-200 text-xs text-rose-950 focus:outline-none focus:border-rose-900 rounded-none cursor-pointer"
                >
                  <option value="Found a better price">{t("Found a better price")}</option>
                  <option value="Changed delivery address">{t("Need to change delivery address")}</option>
                  <option value="Accidental / duplicate purchase">{t("Accidental / duplicate purchase")}</option>
                  <option value="Order taking too long">{t("Shipping time is too long")}</option>
                  <option value="Other reason">{t("Other reason")}</option>
                </select>

                <textarea
                  rows={3}
                  value={cancelCustomNotes}
                  onChange={(e) => setCancelCustomNotes(e.target.value)}
                  placeholder={t("Optional additional comments...")}
                  className="w-full p-3 bg-rose-50/40 border border-rose-200 text-xs text-rose-950 focus:outline-none focus:border-rose-900 rounded-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCancelOpen(false)}
                  disabled={isSubmittingAction}
                  className="flex-1 py-3.5 border border-rose-300 text-rose-900 text-[10px] uppercase tracking-widest font-black hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  {t("Keep Order")}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  disabled={isSubmittingAction}
                  className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] uppercase tracking-widest font-black transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingAction ? t("Processing...") : t("Confirm Cancellation")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Return Request Dialog Modal */}
      <AnimatePresence>
        {isReturnOpen && selectedOrder && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReturnOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white shadow-2xl border border-orange-200 z-10 p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 text-orange-700 pb-4 border-b border-orange-100">
                <RotateCcw size={22} />
                <div>
                  <h3 className="font-serif italic font-bold text-lg text-orange-950">{t("Request Item Return")}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-orange-500 font-bold">
                    Order #{selectedOrder.order_number || selectedOrder.order_id}
                  </p>
                </div>
              </div>

              {/* Return Option: Refund vs Replacement */}
              <div className="grid grid-cols-2 gap-3">
                {['Refund', 'Replacement'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setReturnType(type)}
                    className={`py-3 px-4 border text-center font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                      returnType === type
                        ? "bg-orange-955 text-white border-orange-955 shadow-sm"
                        : "bg-orange-50/50 border-orange-200 text-orange-900 hover:bg-orange-100"
                    }`}
                  >
                    {type === 'Refund' ? t("Full Refund to Bank") : t("Item Replacement")}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-600">
                  {t("Reason for Return")} *
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full h-11 px-3 bg-white border border-orange-200 text-xs text-orange-950 focus:outline-none focus:border-orange-900 rounded-none cursor-pointer"
                >
                  <option value="Defective / Damaged item">{t("Defective / Damaged item")}</option>
                  <option value="Wrong size / fit issue">{t("Wrong size / fit issue")}</option>
                  <option value="Item does not match description">{t("Item does not match description")}</option>
                  <option value="Quality not as expected">{t("Quality not as expected")}</option>
                  <option value="Received wrong product">{t("Received wrong product")}</option>
                </select>

                <textarea
                  rows={3}
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  placeholder={t("Describe the defect or reason in detail for verification...")}
                  className="w-full p-3 bg-orange-50/40 border border-orange-200 text-xs text-orange-950 focus:outline-none focus:border-orange-900 rounded-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReturnOpen(false)}
                  disabled={isSubmittingAction}
                  className="flex-1 py-3.5 border border-orange-300 text-orange-900 text-[10px] uppercase tracking-widest font-black hover:bg-orange-50 transition-colors cursor-pointer"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReturn}
                  disabled={isSubmittingAction}
                  className="flex-1 py-3.5 bg-orange-955 hover:bg-orange-850 text-white text-[10px] uppercase tracking-widest font-black transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingAction ? t("Submitting...") : t("Submit Return")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;
