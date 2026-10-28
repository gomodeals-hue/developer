import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, ShieldCheck, CheckCircle, FileText, QrCode } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const OrderInvoiceModal = ({ isOpen, onClose, order }) => {
  const { formatPrice, t } = useShop();
  const invoiceRef = useRef(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-GMD-${(order.order_number || order.order_id || '').replace(/\D/g, '').slice(-6) || '884210'}`;
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
  const cgst = Math.round(taxAmount / 2);
  const sgst = taxAmount - cgst;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Inject Strict Print CSS */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          body {
            background: #ffffff !important;
            color: #1c1917 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav, header, footer, .print\\:hidden, button {
            display: none !important;
          }
          .invoice-sheet {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm print:hidden"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-3xl bg-white shadow-2xl rounded-2xl border border-stone-200 z-10 my-6 overflow-hidden print:m-0 print:border-none print:shadow-none print:w-full print:max-w-none print:rounded-none"
      >
        {/* Top Controls Bar */}
        <div className="bg-stone-900 px-6 py-3.5 text-white flex items-center justify-between print:hidden border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#f76e28] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <FileText size={15} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-stone-100 block">Official Tax Invoice</span>
              <span className="text-[10px] text-stone-400 font-mono">GST Compliant Tax Document</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#f76e28] hover:bg-[#de5713] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <Printer size={14} />
              <span>Print / Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div ref={invoiceRef} className="invoice-sheet p-6 sm:p-10 space-y-6 text-stone-900 bg-white">
          {/* Header Strip with Canonical Logo & Info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b-2 border-stone-200">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-lg bg-[#f76e28] text-white font-black text-sm tracking-tight shadow-xs">
                  GMD
                </span>
                <span className="text-2xl font-serif font-black tracking-tight text-stone-900">
                  GoMo Deals
                </span>
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-orange-50 text-[#f76e28] border border-orange-200 rounded-md font-bold">
                  Verified Marketplace
                </span>
              </div>
              <p className="text-xs font-bold text-stone-800">
                GoMo Deals Retail Technologies Pvt. Ltd.
              </p>
              <p className="text-[11px] text-stone-600 font-normal">
                GSTIN: <span className="font-mono font-semibold text-stone-800">33AABCG1234F1Z5</span> • PAN: <span className="font-mono font-semibold text-stone-800">AABCG1234F</span>
              </p>
              <p className="text-[11px] text-stone-600">
                Fulfillment Hub: Guindy Industrial Estate, Chennai, Tamil Nadu - 600032
              </p>
              <p className="text-[10px] text-stone-500 font-mono pt-0.5">
                Support: 24/7 Concierge • support@gomodeals.com • +91 800-466-6332
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1 bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-stone-200">
              <span className="px-2.5 py-1 bg-[#f76e28] text-white text-[10px] uppercase tracking-wider font-black rounded-md inline-block mb-1 shadow-xs">
                ORIGINAL FOR RECIPIENT
              </span>
              <p className="text-sm font-mono font-black text-stone-900">
                {invoiceNumber}
              </p>
              <p className="text-[11px] text-stone-600 font-medium">
                Invoice Date: <span className="font-mono font-bold text-stone-900">{invoiceDate}</span>
              </p>
              <p className="text-[11px] text-stone-600 font-medium">
                Order Ref: <span className="font-mono font-bold text-[#f76e28]">#{order.order_number || order.order_id}</span>
              </p>
            </div>
          </div>

          {/* Billing & Dispatch Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50/80 p-4 rounded-xl border border-stone-200 text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#f76e28] mb-1.5 flex items-center gap-1">
                <span>BILLED TO &amp; SHIPPING DESTINATION</span>
              </p>
              <p className="font-bold text-stone-900 text-sm">{customerName}</p>
              <p className="text-stone-700 leading-relaxed font-normal">{address.street || address.address || "Customer Address on File"}</p>
              <p className="text-stone-700 font-normal">
                {address.city ? `${address.city}, ${address.state || ''} - ${address.postal_code || address.pincode || ''}` : "Chennai, Tamil Nadu"}
              </p>
              <p className="font-mono text-[11px] text-stone-600 pt-1">
                Mobile: <strong className="text-stone-900">{customerPhone}</strong> (WhatsApp Verified)
              </p>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-stone-200 pt-3 sm:pt-0 sm:pl-4">
              <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#f76e28] mb-1.5">
                PAYMENT &amp; DISPATCH METHOD
              </p>
              <div className="space-y-1 text-stone-700">
                <p className="flex justify-between">
                  <span>Payment Mode:</span>
                  <strong className="font-bold text-stone-900 uppercase">{order.payment_method || 'PREPAID UPI / CARD'}</strong>
                </p>
                <p className="flex justify-between">
                  <span>Payment Status:</span>
                  <strong className="font-bold text-emerald-600">CONFIRMED (PAID)</strong>
                </p>
                <p className="flex justify-between text-[11px]">
                  <span>Transaction Ref:</span>
                  <strong className="font-mono text-stone-800">{order.payment?.transaction_id || order.transaction_id || `GMD_TXN_${order.order_id || '98721'}`}</strong>
                </p>
                <p className="flex justify-between text-[11px]">
                  <span>Packaging Security:</span>
                  <strong className="text-stone-900 font-semibold">Official GoMoDeals Tamper Tape</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Items Table with HSN & GST Breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300 bg-stone-100/70 text-[10px] uppercase tracking-wider text-stone-700">
                  <th className="py-2.5 px-3 font-extrabold">#</th>
                  <th className="py-2.5 px-3 font-extrabold">Item Description</th>
                  <th className="py-2.5 px-2 text-center font-extrabold">HSN</th>
                  <th className="py-2.5 px-2 text-center font-extrabold">Qty</th>
                  <th className="py-2.5 px-3 text-right font-extrabold">Unit Rate</th>
                  <th className="py-2.5 px-3 text-right font-extrabold">GST (5%)</th>
                  <th className="py-2.5 px-3 text-right font-extrabold">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {items.map((item, idx) => {
                  const unitPrice = Number(item.price || 0);
                  const qty = Number(item.quantity || 1);
                  const lineTotal = unitPrice * qty;
                  const itemGst = Math.round(lineTotal * 0.05);

                  return (
                    <tr key={idx} className="hover:bg-stone-50/50">
                      <td className="py-3 px-3 font-mono text-stone-400">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-stone-900 text-xs">{item.name}</p>
                        {item.variant_value && (
                          <span className="text-[10px] text-stone-500 font-mono">
                            Specification: {item.variant_value}
                          </span>
                        )}
                        <p className="text-[10px] text-stone-500">Fulfilled by Verified GoMoDeals Merchant Partner</p>
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-stone-500 text-[11px]">6205</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-stone-900">{qty}</td>
                      <td className="py-3 px-3 text-right font-mono text-stone-800">{formatPrice(unitPrice)}</td>
                      <td className="py-3 px-3 text-right font-mono text-stone-600 text-[11px]">{formatPrice(itemGst)}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-stone-900">{formatPrice(lineTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pricing Summary & Tax Split */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-2 border-t-2 border-stone-200">
            {/* Left: Barcode, Security & Stamp */}
            <div className="space-y-3 max-w-sm">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                {/* SVG Barcode */}
                <div className="space-y-1">
                  <svg className="w-36 h-9" viewBox="0 0 140 36">
                    <rect x="0" y="0" width="3" height="30" fill="#1c1917" />
                    <rect x="5" y="0" width="1" height="30" fill="#1c1917" />
                    <rect x="8" y="0" width="4" height="30" fill="#1c1917" />
                    <rect x="14" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="18" y="0" width="1" height="30" fill="#1c1917" />
                    <rect x="22" y="0" width="3" height="30" fill="#1c1917" />
                    <rect x="27" y="0" width="5" height="30" fill="#1c1917" />
                    <rect x="34" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="38" y="0" width="1" height="30" fill="#1c1917" />
                    <rect x="42" y="0" width="4" height="30" fill="#1c1917" />
                    <rect x="48" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="53" y="0" width="3" height="30" fill="#1c1917" />
                    <rect x="58" y="0" width="1" height="30" fill="#1c1917" />
                    <rect x="62" y="0" width="4" height="30" fill="#1c1917" />
                    <rect x="68" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="72" y="0" width="3" height="30" fill="#1c1917" />
                    <rect x="77" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="82" y="0" width="4" height="30" fill="#1c1917" />
                    <rect x="88" y="0" width="1" height="30" fill="#1c1917" />
                    <rect x="92" y="0" width="3" height="30" fill="#1c1917" />
                    <rect x="97" y="0" width="5" height="30" fill="#1c1917" />
                    <rect x="104" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="108" y="0" width="1" height="30" fill="#1c1917" />
                    <rect x="112" y="0" width="4" height="30" fill="#1c1917" />
                    <rect x="118" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="123" y="0" width="3" height="30" fill="#1c1917" />
                    <rect x="128" y="0" width="2" height="30" fill="#1c1917" />
                    <rect x="133" y="0" width="4" height="30" fill="#1c1917" />
                    <text x="70" y="35" fontSize="6" fontFamily="monospace" textAnchor="middle" fill="#78716c">{invoiceNumber}</text>
                  </svg>
                </div>
                <div className="text-[10px] text-stone-500 font-mono border-l border-stone-200 pl-2.5">
                  <p className="font-bold text-stone-700">Digital Tax Seal</p>
                  <p className="text-emerald-700 font-semibold">IRN Verified</p>
                </div>
              </div>

              <div className="text-[10px] text-stone-500 space-y-1">
                <p>1. 7-Day Hassle-Free Returns applicable as per GoMo Deals Return Policy.</p>
                <p>2. Keep original packaging and GoMo Deals security tape intact for warranty claims.</p>
                <p>3. This is an electronically generated and authenticated invoice under Indian IT Act 2000.</p>
              </div>
            </div>

            {/* Right: Calculations */}
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Taxable Amount</span>
                <span className="font-mono font-medium text-stone-800">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promotional Discount</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Central GST (CGST 2.5%)</span>
                <span className="font-mono">{formatPrice(cgst)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>State GST (SGST 2.5%)</span>
                <span className="font-mono">{formatPrice(sgst)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Shipping &amp; Logistics</span>
                <span className="font-mono font-bold text-stone-800">
                  {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="pt-2.5 border-t-2 border-stone-900 flex justify-between items-baseline">
                <div>
                  <span className="text-xs uppercase tracking-wider font-black text-stone-900 block">Total Payable</span>
                  <span className="text-[9px] text-stone-500">Inclusive of all applicable taxes</span>
                </div>
                <span className="text-xl font-mono font-black text-[#f76e28]">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Footer Signoff */}
          <div className="pt-4 border-t border-dashed border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[10px]">
            <div className="flex items-center gap-1.5 font-bold text-stone-700">
              <ShieldCheck size={14} className="text-[#f76e28]" />
              <span>Authorized Signature &amp; Authenticated Digital Stamp</span>
            </div>
            <span className="font-mono text-stone-400">www.gomodeals.com • India • South Africa • UK • USA</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderInvoiceModal;
