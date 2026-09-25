import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, ShieldCheck, Building2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const OrderInvoiceModal = ({ isOpen, onClose, order }) => {
  const { formatPrice, t } = useShop();
  const invoiceRef = useRef(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-2026-${(order.order_number || order.order_id || '').replace(/\D/g, '').slice(-5) || '88201'}`;
  const invoiceDate = new Date(order.created_at || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const address = order.delivery_address || order.address || {};
  const customerName = order.customer?.name || address.full_name || address.name || 'Valued Customer';
  const customerPhone = order.customer?.phone || address.phone || '+91 98765 43210';
  const items = order.items || [];
  const subtotal = order.prices?.subtotal || order.subtotal || order.total_amount || 0;
  const shippingFee = order.prices?.shipping !== undefined ? order.prices.shipping : (order.shipping_fee || 0);
  const taxAmount = order.prices?.tax !== undefined ? order.prices.tax : (order.tax_amount || Math.round(subtotal * 0.05));
  const discountAmount = order.prices?.discount !== undefined ? order.prices.discount : (order.discount_amount || 0);
  const grandTotal = order.prices?.total || order.total_amount || order.total || 0;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm print:hidden"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-3xl bg-white shadow-2xl rounded-none border border-orange-200 z-10 my-8 overflow-hidden print:m-0 print:border-none print:shadow-none print:w-full print:max-w-none"
      >
        {/* Top Controls Bar */}
        <div className="bg-orange-955 px-6 py-4 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-amber-300" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">{t("Tax Invoice Preview")}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white text-orange-950 px-4 py-2 text-[10px] uppercase tracking-widest font-black hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <Printer size={14} /> {t("Print / Save PDF")}
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

        {/* Printable Invoice Sheet */}
        <div ref={invoiceRef} className="p-8 sm:p-12 space-y-8 text-orange-950 bg-white">
          {/* Company Branding & Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-orange-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-serif italic font-bold tracking-tight text-orange-955">
                  GoMo Deals
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] px-2 py-0.5 bg-orange-100 font-black text-orange-900">
                  Luxury Studio
                </span>
              </div>
              <p className="text-[10px] text-orange-700/80 uppercase tracking-wider font-bold">
                GoMo Deals Luxury Retail Pvt. Ltd.
              </p>
              <p className="text-[10px] text-orange-800 font-light">
                CIN: U52100TN2026PTC109823 • GSTIN: 33AABCG1234F1Z5
              </p>
              <p className="text-[10px] text-orange-800 font-light">
                Guindy Industrial Estate, Chennai, Tamil Nadu - 600032
              </p>
              <p className="text-[10px] text-orange-600 font-mono pt-1">
                ✉ concierge@gomodeals.com | 🌐 gomodeals.com
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="px-3 py-1 bg-orange-50 border border-orange-200 text-orange-900 text-[9px] uppercase tracking-[0.25em] font-black inline-block mb-1">
                ORIGINAL TAX INVOICE
              </span>
              <p className="text-sm font-mono font-bold text-orange-955">
                #{invoiceNumber}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-orange-500 font-bold">
                Date: <span className="font-mono text-orange-900">{invoiceDate}</span>
              </p>
              <p className="text-[10px] uppercase tracking-wider text-orange-500 font-bold">
                Order: <span className="font-mono text-orange-900">#{order.order_number || order.order_id}</span>
              </p>
            </div>
          </div>

          {/* Billing & Shipping Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-orange-50/40 p-5 border border-orange-100 text-xs">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] font-black text-orange-600 mb-2">
                {t("Billed To / Shipping Address")}
              </p>
              <p className="font-serif italic font-bold text-sm text-orange-950">{customerName}</p>
              <p className="font-light text-orange-800">{address.street || address.address || "Address on file"}</p>
              <p className="font-light text-orange-800">
                {address.city ? `${address.city}, ${address.state || ''} - ${address.postal_code || address.pincode || ''}` : "Chennai, Tamil Nadu"}
              </p>
              <p className="font-mono text-[11px] text-orange-600 pt-1">📞 {customerPhone}</p>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] font-black text-orange-600 mb-2">
                {t("Payment & Dispatch Info")}
              </p>
              <p className="text-[11px] font-medium text-orange-900">
                Payment Method: <span className="font-bold">{order.payment_method || 'CARD'}</span>
              </p>
              <p className="text-[11px] font-medium text-orange-900">
                Payment Status: <span className="font-bold text-emerald-700">{order.payment_status || 'Paid'}</span>
              </p>
              <p className="text-[11px] font-mono text-orange-600">
                TXN: {order.payment?.transaction_id || order.transaction_id || `TXN_${order.order_id}`}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-orange-500 pt-1">
                Dispatch Mode: {order.shipping_method === 'express' ? 'Express Studio Courier' : 'Standard Ground Logistics'}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-orange-200 text-[9px] uppercase tracking-widest text-orange-700">
                  <th className="py-2.5 pr-4 font-black">#</th>
                  <th className="py-2.5 font-black">{t("Description")}</th>
                  <th className="py-2.5 text-center font-black">{t("Qty")}</th>
                  <th className="py-2.5 text-right font-black">{t("Unit Price")}</th>
                  <th className="py-2.5 text-right font-black">{t("GST (5%)")}</th>
                  <th className="py-2.5 text-right font-black">{t("Total")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {items.map((item, idx) => {
                  const unitPrice = Number(item.price || 0);
                  const qty = Number(item.quantity || 1);
                  const lineTotal = unitPrice * qty;
                  const itemGst = Math.round(lineTotal * 0.05);

                  return (
                    <tr key={idx} className="hover:bg-orange-50/20">
                      <td className="py-3 pr-4 font-mono text-orange-400">{idx + 1}</td>
                      <td className="py-3 pr-4">
                        <p className="font-serif italic font-bold text-orange-950">{item.name}</p>
                        {item.variant_value && (
                          <span className="text-[9px] uppercase tracking-wider text-orange-500 font-mono">
                            Variant: {item.variant_value}
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-center font-mono font-bold">{qty}</td>
                      <td className="py-3 text-right font-mono">{formatPrice(unitPrice)}</td>
                      <td className="py-3 text-right font-mono text-orange-600">{formatPrice(itemGst)}</td>
                      <td className="py-3 text-right font-mono font-bold text-orange-950">{formatPrice(lineTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Price Breakdown & Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pt-4 border-t border-orange-200">
            <div className="space-y-2 max-w-sm text-xs text-orange-800">
              <p className="text-[9px] uppercase tracking-[0.25em] font-black text-orange-600">
                {t("Terms & Conditions")}
              </p>
              <p className="text-[10px] leading-relaxed font-light">
                1. Goods once sold can be returned within 7 calendar days as per GoMo Deals Return Policy.
              </p>
              <p className="text-[10px] leading-relaxed font-light">
                2. This is a computer-generated tax invoice and does not require physical signature.
              </p>
            </div>

            <div className="w-full sm:w-72 space-y-2.5 text-xs">
              <div className="flex justify-between text-orange-700">
                <span className="uppercase tracking-wider text-[9px] font-bold">{t("Items Subtotal")}</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span className="uppercase tracking-wider text-[9px]">{t("Coupon Discount")}</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-orange-700">
                <span className="uppercase tracking-wider text-[9px] font-bold">{t("Shipping & Logistics")}</span>
                <span className="font-mono">{shippingFee === 0 ? t("FREE") : formatPrice(shippingFee)}</span>
              </div>

              <div className="flex justify-between text-orange-700">
                <span className="uppercase tracking-wider text-[9px] font-bold">{t("Total GST (5%)")}</span>
                <span className="font-mono">{formatPrice(taxAmount)}</span>
              </div>

              <div className="pt-3 border-t-2 border-orange-955 flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-orange-955">{t("Grand Total")}</span>
                <span className="text-xl font-mono font-bold text-orange-955">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Footer Signature Notice */}
          <div className="pt-6 border-t border-dashed border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-orange-400 text-[9px] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-orange-600" /> Authorized Electronic Invoice
            </span>
            <span>Thank you for shopping with GoMo Deals Studio</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderInvoiceModal;
