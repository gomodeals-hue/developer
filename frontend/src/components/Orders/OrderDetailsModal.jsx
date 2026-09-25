import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import OrderTimeline from './OrderTimeline';

const OrderDetailsModal = ({
  isOpen,
  onClose,
  order,
  onCancelClick,
  onReturnClick,
  onInvoiceClick,
  onAdvanceStatus
}) => {
  const { formatPrice, t, addToCart } = useShop();

  if (!isOpen || !order) return null;

  const address = order.delivery_address || order.address || {};
  const items = order.items || [];
  const status = order.order_status || 'Confirmed';
  const isCancellable = ['Order Placed', 'Pending', 'Confirmed', 'Processing'].includes(status);
  const isReturnable = status === 'Delivered';

  const subtotal = order.prices?.subtotal || order.subtotal || order.total_amount || 0;
  const shippingFee = order.prices?.shipping !== undefined ? order.prices.shipping : (order.shipping_fee || 0);
  const taxAmount = order.prices?.tax !== undefined ? order.prices.tax : (order.tax_amount || Math.round(subtotal * 0.05));
  const discountAmount = order.prices?.discount !== undefined ? order.prices.discount : (order.discount_amount || 0);
  const grandTotal = order.prices?.total || order.total_amount || order.total || 0;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
      />

      {/* Main Drawer/Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-4xl bg-white shadow-2xl rounded-none border border-orange-200 z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-orange-955 px-6 sm:px-8 py-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-amber-300">
                {t("Order Breakdown & Tracking")}
              </span>
              <span className="px-2 py-0.5 bg-white/20 text-white text-[9px] font-mono uppercase font-bold">
                {status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-white mt-1">
              #{order.order_number || order.order_id}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onInvoiceClick && onInvoiceClick(order)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3.5 py-2 text-[9px] uppercase tracking-widest font-black transition-colors cursor-pointer"
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar bg-[#faf8f5]">
          {/* 1. Dynamic Live Tracking Timeline */}
          <div className="bg-white p-6 border border-orange-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-orange-100">
              <div className="flex items-center gap-2">
                <Truck size={17} className="text-orange-600" />
                <h3 className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-950">
                  {t("Shipment Tracking Timeline")}
                </h3>
              </div>
              {onAdvanceStatus && status !== 'Delivered' && status !== 'Cancelled' && !status.includes('Return') && (
                <button
                  type="button"
                  onClick={() => onAdvanceStatus(order)}
                  className="px-2.5 py-1 bg-orange-100 hover:bg-orange-955 hover:text-white transition-colors text-[9px] font-mono font-bold text-orange-900 border border-orange-200 cursor-pointer"
                  title="Simulate advancing to next logistics status"
                >
                  {t("Advance Status (Demo)")}
                </button>
              )}
            </div>
            <OrderTimeline
              orderStatus={status}
              timestamps={order.timestamps || {}}
              metadata={{
                cancel_reason: order.cancel_reason,
                return_request: order.return_request
              }}
            />
          </div>

          {/* 2. Destination & Payment Methods Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Shipping Destination */}
            <div className="bg-white p-6 border border-orange-200/80 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-orange-600 pb-2 border-b border-orange-100">
                <MapPin size={16} />
                <span className="text-[9px] uppercase tracking-[0.25em] font-black text-orange-950">
                  {t("Delivery Address")}
                </span>
              </div>
              <div className="text-xs text-orange-900 space-y-1 font-light pt-1">
                <p className="font-serif italic font-bold text-sm text-orange-950">
                  {address.full_name || address.name || order.customer?.name}
                </p>
                <p>{address.street || address.address || "Address on file"}</p>
                <p>
                  {address.city ? `${address.city}, ${address.state || ''} — ${address.postal_code || address.pincode || ''}` : "Chennai, Tamil Nadu"}
                </p>
                <p className="font-mono text-[11px] text-orange-600 pt-1">📞 {address.phone || order.customer?.phone}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white p-6 border border-orange-200/80 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-orange-600 pb-2 border-b border-orange-100">
                <CreditCard size={16} />
                <span className="text-[9px] uppercase tracking-[0.25em] font-black text-orange-950">
                  {t("Payment Details")}
                </span>
              </div>
              <div className="text-xs text-orange-900 space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-orange-500 uppercase tracking-wider text-[9px]">Method:</span>
                  <span className="font-bold">{order.payment_method || 'CARD'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-500 uppercase tracking-wider text-[9px]">Status:</span>
                  <span className="font-bold text-emerald-700">{order.payment_status || 'Paid'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-500 uppercase tracking-wider text-[9px]">Transaction ID:</span>
                  <span className="font-mono text-orange-700 text-[10px]">
                    {order.payment?.transaction_id || order.transaction_id || `TXN_${order.order_id?.slice(0, 10)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-500 uppercase tracking-wider text-[9px]">Account:</span>
                  <span className="font-mono text-[10px]">
                    {order.masked_account || order.payment?.masked_account || '•••• 8821'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Items Breakdown Table */}
          <div className="bg-white p-6 border border-orange-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-orange-100">
              <Package size={16} className="text-orange-600" />
              <h3 className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-950">
                {t("Ordered Items")} ({items.length})
              </h3>
            </div>

            <div className="divide-y divide-orange-100/70">
              {items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center gap-4 first:pt-0 last:pb-0">
                  <div className="w-16 h-16 bg-white border border-orange-200 overflow-hidden shrink-0 p-1">
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150"; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif italic font-bold text-orange-950 truncate">
                      {item.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2.5 mt-1 text-[10px] text-orange-500 font-mono">
                      <span>Qty: {item.quantity || 1}</span>
                      {item.variant_value && (
                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-900 font-bold uppercase text-[8px]">
                          {item.variant_value}
                        </span>
                      )}
                      <span>@{formatPrice(Number(item.price || 0))}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm font-bold text-orange-950">
                      {formatPrice(Number(item.price || 0) * (item.quantity || 1))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Complete Financial Summary Breakdown */}
          <div className="bg-white p-6 border border-orange-200/80 shadow-sm space-y-2.5">
            <h3 className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-950 pb-2 border-b border-orange-100">
              {t("Price Breakdown")}
            </h3>

            <div className="flex justify-between text-xs text-orange-700">
              <span className="uppercase tracking-wider text-[9px] font-bold">{t("Subtotal")}</span>
              <span className="font-mono">{formatPrice(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-emerald-700 font-bold">
                <span className="uppercase tracking-wider text-[9px]">
                  {t("Coupon Discount")} {order.coupon_code ? `(${order.coupon_code})` : ""}
                </span>
                <span className="font-mono">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-orange-700">
              <span className="uppercase tracking-wider text-[9px] font-bold">
                {t("Shipping Fee")} ({order.shipping_method === 'express' ? t("Express") : t("Standard")})
              </span>
              <span className="font-mono">{shippingFee === 0 ? t("FREE") : formatPrice(shippingFee)}</span>
            </div>

            <div className="flex justify-between text-xs text-orange-700">
              <span className="uppercase tracking-wider text-[9px] font-bold">{t("Duties & GST (5%)")}</span>
              <span className="font-mono">{formatPrice(taxAmount)}</span>
            </div>

            <div className="pt-3 border-t-2 border-orange-955 flex justify-between items-baseline">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-orange-955">
                {t("Total Paid")}
              </span>
              <span className="text-2xl font-mono font-bold text-orange-955">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="bg-white border-t border-orange-200 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {isCancellable && (
              <button
                type="button"
                onClick={() => onCancelClick && onCancelClick(order)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[9px] uppercase tracking-widest font-black border border-rose-200 transition-colors cursor-pointer"
              >
                <XCircle size={14} /> {t("Cancel Order")}
              </button>
            )}

            {isReturnable && (
              <button
                type="button"
                onClick={() => onReturnClick && onReturnClick(order)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-orange-100 text-orange-900 hover:bg-orange-200 text-[9px] uppercase tracking-widest font-black border border-orange-300 transition-colors cursor-pointer"
              >
                <RotateCcw size={14} /> {t("Request Return")}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-orange-300 text-orange-900 hover:bg-orange-50 text-[10px] uppercase tracking-widest font-black transition-colors cursor-pointer"
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
