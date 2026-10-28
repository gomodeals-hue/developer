import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Package, 
  Truck, 
  Printer, 
  RotateCcw, 
  XCircle, 
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Radio,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  MessageSquareQuote
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useRealtime } from '../../hooks/useRealtime';
import { toast } from 'react-hot-toast';
import apiClient from '../../services/apiClient';

const OrderDetailsModal = ({
  isOpen,
  onClose,
  order: initialOrder,
  onCancelClick,
  onReturnClick,
  onInvoiceClick,
  onAdvanceStatus,
  onVocClick
}) => {
  const { formatPrice, t, addToCart } = useShop();
  const [currentOrder, setCurrentOrder] = useState(initialOrder);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [copiedAwb, setCopiedAwb] = useState(false);

  useEffect(() => {
    setCurrentOrder(initialOrder);
  }, [initialOrder]);

  // Real-time listener for order status changes
  useEffect(() => {
    if (!currentOrder) return;
    const currentId = currentOrder.id || currentOrder.order_id;

    // Fetch latest fresh order details from backend API
    const loadFreshOrder = async () => {
      try {
        const res = await apiClient.get(`/orders/${currentId}`);
        if (res.data?.success && res.data.data) {
          setCurrentOrder(res.data.data);
        }
      } catch (e) {
        // Keep initial order if offline
      }
    };
    loadFreshOrder();
  }, [initialOrder]);

  if (!isOpen || !currentOrder) return null;

  const order = currentOrder;
  const address = order.delivery_address || order.shipping_address || order.address || {};
  const items = order.items || [];
  const status = order.status || order.order_status || 'Confirmed';
  const isCancellable = ['Order Placed', 'Pending', 'Confirmed', 'Processing'].includes(status);
  const isReturnable = status === 'Delivered';

  const subtotal = order.prices?.subtotal || order.subtotal || order.total_amount || 0;
  const shippingFee = order.prices?.shipping !== undefined ? order.prices.shipping : (order.shipping_fee || 0);
  const taxAmount = order.prices?.tax !== undefined ? order.prices.tax : (order.tax || Math.round(subtotal * 0.05));
  const discountAmount = order.prices?.discount !== undefined ? order.prices.discount : (order.discount_amount || 0);
  const grandTotal = order.prices?.total || order.total_amount || order.total || 0;

  const trackingNumber = order.tracking_number || 'BLU84920194';
  const courierPartner = order.courier_partner || 'BlueDart Express';

  const handleCopyAwb = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopiedAwb(true);
    toast.success('Tracking number copied to clipboard');
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  const handleLocalAdvance = async () => {
    setIsAdvancing(true);
    const orderId = order.id || order.order_id;
    try {
      const res = await apiClient.post(`/orders/${orderId}/advance-step`);
      if (res.data?.success) {
        setCurrentOrder(res.data.data);
        toast.success(res.data.message || 'Status advanced live!');
        if (onAdvanceStatus) onAdvanceStatus(res.data.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to advance step');
    } finally {
      setIsAdvancing(false);
    }
  };

  const trackingSteps = Array.isArray(order.tracking) && order.tracking.length > 0
    ? order.tracking
    : [
        { step: 'Order Placed', status: 'completed', time: order.created_at, note: 'Payment verified & order confirmed' },
        { step: 'Processing & Quality Check', status: status === 'Confirmed' ? 'in_transit' : 'completed', time: new Date(Date.now() - 3600000).toISOString(), note: 'Quality check and barcode scan complete' },
        { step: 'Shipped via Express', status: status === 'Shipped' || status === 'In Transit' ? 'in_transit' : (['Out for Delivery', 'Delivered'].includes(status) ? 'completed' : 'pending'), note: `Courier Partner: ${courierPartner} (AWB: ${trackingNumber})` },
        { step: 'Out for Delivery', status: status === 'Out for Delivery' ? 'in_transit' : (status === 'Delivered' ? 'completed' : 'pending'), note: 'Assigned to courier executive with OTP verification' },
        { step: 'Delivered', status: status === 'Delivered' ? 'completed' : 'pending', note: 'Contactless doorstep delivery' }
      ];

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm"
      />

      {/* Main Drawer/Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-4xl bg-white shadow-2xl rounded-2xl border border-stone-200 z-10 my-8 overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-stone-900 px-6 sm:px-8 py-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Real-Time Order
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                status === 'Delivered' ? 'bg-emerald-600 text-white' :
                status === 'Cancelled' ? 'bg-rose-600 text-white' :
                'bg-orange-500 text-white'
              }`}>
                {status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-white mt-1.5 flex items-center gap-2">
              #{order.order_number || order.order_id || order.id}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onInvoiceClick && onInvoiceClick(order)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3.5 py-2 text-[10px] uppercase tracking-widest font-black transition-colors rounded-lg cursor-pointer"
            >
              <Printer size={13} /> {t("Invoice")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar bg-stone-50/70">
          {/* 1. Dynamic Live Tracking Timeline */}
          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <Truck size={18} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-black text-stone-900">
                    {t("Live Shipment Tracking")}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-stone-500 font-medium">Partner: <strong className="text-stone-800">{courierPartner}</strong></span>
                    <span className="text-stone-300">•</span>
                    <button
                      onClick={handleCopyAwb}
                      className="text-xs text-orange-600 font-mono font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      title="Copy AWB Tracking Number"
                    >
                      AWB: {trackingNumber}
                      {copiedAwb ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Advance Status Live Demo Button */}
              {status !== 'Delivered' && status !== 'Cancelled' && (
                <button
                  type="button"
                  onClick={handleLocalAdvance}
                  disabled={isAdvancing}
                  className="px-3.5 py-2 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] text-white rounded-lg text-xs font-bold shadow-sm shadow-[#f76e28]/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Simulate Real-time Step Progression"
                >
                  <Radio size={13} className={isAdvancing ? "animate-spin" : "animate-pulse"} />
                  {isAdvancing ? 'Progressing...' : 'Advance Live Status (Demo)'}
                </button>
              )}
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {trackingSteps.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isInTransit = step.status === 'in_transit';
                const isCancelled = step.status === 'cancelled';

                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Step Icon Indicator */}
                    <div className={`absolute -left-6 sm:-left-8 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 transition-all ${
                      isCompleted ? 'bg-emerald-500 border-emerald-500 text-white shadow-md' :
                      isInTransit ? 'bg-orange-500 border-orange-500 text-white ring-4 ring-orange-100 animate-pulse' :
                      isCancelled ? 'bg-rose-500 border-rose-500 text-white' :
                      'bg-white border-stone-300 text-stone-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={15} /> : (idx + 1)}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className={`text-sm font-bold ${
                          isCompleted ? 'text-stone-900' : isInTransit ? 'text-orange-600 font-extrabold' : 'text-stone-400'
                        }`}>
                          {step.step}
                          {isInTransit && (
                            <span className="ml-2 text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
                              Current Stage
                            </span>
                          )}
                        </h4>
                        {step.time && (
                          <span className="text-[11px] text-stone-400 font-mono">
                            {new Date(step.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(step.time).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {step.note || (isCompleted ? 'Completed successfully' : 'Pending courier dispatch')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Destination & Payment Methods Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shipping Destination */}
            <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-orange-600 pb-2 border-b border-stone-100">
                <MapPin size={16} />
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-800">
                  {t("Delivery Address")}
                </span>
              </div>
              <div className="text-xs text-stone-700 space-y-1 pt-1">
                <p className="font-bold text-sm text-stone-900">
                  {address.name || address.full_name || order.customer_name || 'Valued Customer'}
                </p>
                <p>{address.street || address.address || "Plot 42, 4th Main, Indiranagar"}</p>
                <p>
                  {address.city ? `${address.city}, ${address.state || 'Karnataka'} — ${address.pincode || address.postal_code || '560038'}` : "Bengaluru, Karnataka — 560038"}
                </p>
                <p className="font-mono text-[11px] text-orange-600 pt-1 font-semibold">Phone: {address.phone || order.customer_phone || '+91 98450 12345'}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-orange-600 pb-2 border-b border-stone-100">
                <CreditCard size={16} />
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-800">
                  {t("Payment Summary")}
                </span>
              </div>
              <div className="text-xs text-stone-700 space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Method:</span>
                  <span className="font-bold">{order.payment_method || 'Online UPI / Card'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status:</span>
                  <span className={`font-bold ${order.payment_status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {order.payment_status || 'Paid'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Transaction ID:</span>
                  <span className="font-mono text-stone-700 text-[11px]">
                    {order.payment?.transaction_id || order.transaction_id || `TXN_${order.id?.slice(0, 10)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Carrier Service:</span>
                  <span className="font-semibold text-emerald-700">{courierPartner}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Items Breakdown Table */}
          <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <Package size={16} className="text-orange-600" />
              <h3 className="text-[10px] uppercase tracking-wider font-bold text-stone-800">
                {t("Ordered Items")} ({items.length})
              </h3>
            </div>

            <div className="divide-y divide-stone-100">
              {items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center gap-4 first:pt-0 last:pb-0">
                  <div className="w-14 h-14 bg-stone-50 rounded-lg border border-stone-200 overflow-hidden shrink-0 p-1">
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150"; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2.5 mt-1 text-[11px] text-stone-500">
                      <span>Qty: <strong className="text-stone-800">{item.quantity || 1}</strong></span>
                      {item.variant_value && (
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[10px] font-semibold">
                          {item.variant_value}
                        </span>
                      )}
                      <span>@{formatPrice(Number(item.price || 0))}</span>
                    </div>
                    {onVocClick && (
                      <button
                        type="button"
                        onClick={() => onVocClick(currentOrder || initialOrder, item)}
                        className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      >
                        <MessageSquareQuote size={13} />
                        Voice of Customer (Ask Seller)
                      </button>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm font-bold text-stone-900">
                      {formatPrice(Number(item.price || 0) * (item.quantity || 1))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Complete Financial Summary Breakdown */}
          <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm space-y-2.5">
            <h3 className="text-[10px] uppercase tracking-wider font-bold text-stone-800 pb-2 border-b border-stone-100">
              {t("Order Total Summary")}
            </h3>

            <div className="flex justify-between text-xs text-stone-600">
              <span>{t("Subtotal")}</span>
              <span className="font-mono font-medium">{formatPrice(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                <span>
                  {t("Coupon Discount")} {order.coupon_code ? `(${order.coupon_code})` : ""}
                </span>
                <span className="font-mono">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-stone-600">
              <span>{t("Shipping Fee")}</span>
              <span className="font-mono font-medium text-emerald-600">{shippingFee === 0 ? t("FREE") : formatPrice(shippingFee)}</span>
            </div>

            <div className="flex justify-between text-xs text-stone-600">
              <span>{t("GST Tax (5%)")}</span>
              <span className="font-mono font-medium">{formatPrice(taxAmount)}</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider font-bold text-stone-900">
                {t("Total Amount")}
              </span>
              <span className="text-2xl font-mono font-black text-orange-600">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="bg-white border-t border-stone-200 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {isCancellable && (
              <button
                type="button"
                onClick={() => onCancelClick && onCancelClick(order)}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold rounded-lg border border-rose-200 transition-colors cursor-pointer"
              >
                <XCircle size={14} /> {t("Cancel Order")}
              </button>
            )}

            {isReturnable && (
              <button
                type="button"
                onClick={() => onReturnClick && onReturnClick(order)}
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-50 text-orange-800 hover:bg-orange-100 text-xs font-bold rounded-lg border border-orange-200 transition-colors cursor-pointer"
              >
                <RotateCcw size={14} /> {t("Request Return")}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {onVocClick && (
              <button
                type="button"
                onClick={() => onVocClick(currentOrder || initialOrder, null)}
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-955 hover:bg-orange-850 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <MessageSquareQuote size={14} /> {t("Voice of Customer")}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              {t("Close")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetailsModal;
