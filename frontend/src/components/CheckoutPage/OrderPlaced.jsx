import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  Package, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Truck, 
  Printer, 
  ShieldCheck, 
  ChevronRight
} from "lucide-react";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatPrice, t } = useShop();

  const stateData = location.state || {};
  const order = stateData.order || null;
  const orderId = stateData.orderId || order?.id || order?.order_id || "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderNumber = stateData.orderNumber || order?.order_number || `GOMO-2026-${orderId.toString().slice(-5).toUpperCase()}`;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const items = order?.items || [];
  const address = order?.delivery_address || order?.address || null;
  const paymentMethod = order?.payment_method || "CARD";
  const paymentStatus = order?.payment_status || "PAID";
  const deliveryMethod = order?.shipping_method || "standard";
  const grandTotal = order?.total_amount || order?.total || 0;
  const subtotal = order?.subtotal || grandTotal;
  const shippingFee = order?.shipping_fee !== undefined ? order.shipping_fee : (order?.shipping_charges || 0);
  const taxAmount = order?.tax_amount || order?.tax || 0;
  const discountAmount = order?.discount_amount || order?.discount || 0;

  const estimatedDays = deliveryMethod === "express" ? "1 - 2 Business Days" : "3 - 5 Business Days";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 pb-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Animated Confirmation Badge */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className={`relative transition-all duration-700 ease-out ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <div className="w-20 h-20 rounded-full bg-orange-955 flex items-center justify-center text-white shadow-xl shadow-orange-955/20 relative z-10">
                <Check size={36} strokeWidth={2.5} className={`transition-transform duration-500 delay-300 ${animate ? 'scale-100' : 'scale-0'}`} />
              </div>
              <div className="absolute inset-0 rounded-full bg-orange-900/10 animate-ping" style={{ animationDuration: '2.5s' }} />
              <div className="absolute -inset-3 rounded-full border border-orange-200 animate-pulse" />
            </div>
          </div>

          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-orange-600 block mb-2">
            {t("Order Confirmed")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-orange-950 font-normal mb-3">
            {t("Thank you for your order")}
          </h1>
          <p className="text-xs text-orange-850/70 uppercase tracking-widest font-bold max-w-md mx-auto leading-relaxed">
            {t("We have received your order and are dispatching it with exceptional care.")}
          </p>
        </div>

        {/* Main Receipt Sheet */}
        <div className="bg-white border border-orange-200/80 shadow-sm p-6 sm:p-10 space-y-8 print:border-none print:shadow-none">
          {/* Header Metadata Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-orange-100">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] font-black text-orange-400 mb-1">
                {t("Order Number")}
              </p>
              <h2 className="text-lg font-mono font-bold text-orange-950 tracking-wider">
                #{orderNumber}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                ✓ {order?.order_status || t("Confirmed")}
              </span>
              <span className="px-3 py-1 bg-orange-100/60 border border-orange-200 text-orange-900 text-[10px] font-mono font-bold uppercase tracking-wider">
                {paymentStatus === "PAID" ? t("Paid") : t("Pending Doorstep")}
              </span>
              <button
                type="button"
                onClick={handlePrint}
                className="p-2 border border-orange-200 text-orange-600 hover:text-orange-955 hover:bg-orange-50 transition-colors rounded-none print:hidden cursor-pointer"
                title="Print Order Receipt"
              >
                <Printer size={15} />
              </button>
            </div>
          </div>

          {/* Logistics & Address Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-orange-50/40 p-5 border border-orange-100">
            {/* Delivery Destination */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-700">
                <MapPin size={15} />
                <span className="text-[9px] uppercase tracking-[0.25em] font-black">{t("Delivery Destination")}</span>
              </div>
              {address ? (
                <div className="text-xs text-orange-950 space-y-0.5 font-light">
                  <p className="font-serif italic font-bold text-sm">{address.full_name || address.name}</p>
                  <p>{address.street || address.address}</p>
                  <p>{address.city}, {address.state} — {address.postal_code || address.pincode}</p>
                  <p className="font-mono text-[11px] text-orange-600 pt-1">📞 {address.phone}</p>
                </div>
              ) : (
                <p className="text-xs text-orange-500 italic">{t("Address on file")}</p>
              )}
            </div>

            {/* Delivery Method & Payment */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-orange-700 mb-1">
                  <Truck size={15} />
                  <span className="text-[9px] uppercase tracking-[0.25em] font-black">{t("Shipping Method")}</span>
                </div>
                <p className="text-xs font-serif italic font-bold text-orange-950">
                  {deliveryMethod === "express" ? t("Express Studio Delivery") : t("Standard Ground Delivery")}
                </p>
                <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">
                  {t("Estimated Arrival:")} {estimatedDays}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-orange-700 mb-1">
                  <CreditCard size={15} />
                  <span className="text-[9px] uppercase tracking-[0.25em] font-black">{t("Payment Summary")}</span>
                </div>
                <p className="text-xs font-serif italic font-bold text-orange-950">
                  {paymentMethod === "COD" 
                    ? t("Cash on Delivery (Doorstep)") 
                    : paymentMethod === "UPI" 
                    ? t("UPI Transfer") 
                    : t("Credit / Debit Card")}
                </p>
                <p className="text-[10px] font-mono text-orange-500">
                  {order?.masked_account || (paymentMethod === "CARD" ? "Card •••• 8821" : paymentMethod === "UPI" ? "VPA Verified" : "Pay upon receipt")}
                </p>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          {items.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
                <Package size={16} className="text-orange-600" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-orange-950">
                  {t("Purchased Items")} ({items.length})
                </h3>
              </div>

              <div className="divide-y divide-orange-100/60">
                {items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-4 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 bg-white border border-orange-200 shrink-0 p-1 overflow-hidden">
                      <img
                        src={item.thumbnail || item.image}
                        alt={t(item.name)}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-serif italic font-bold text-orange-950 truncate">
                        {t(item.name)}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-orange-500 font-mono">
                        <span>{t("Qty")}: {item.quantity || 1}</span>
                        {item.variant_value && (
                          <span className="px-1.5 py-0.2 bg-orange-100 text-orange-800 font-bold uppercase text-[8px]">
                            {item.variant_value}
                          </span>
                        )}
                        <span>@{formatPrice(Number(item.price || 0))}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono text-xs font-bold text-orange-950">
                      {formatPrice(Number(item.price || 0) * (item.quantity || 1))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Breakdown Table */}
          <div className="pt-4 border-t border-orange-100 space-y-2.5">
            <div className="flex justify-between text-xs text-orange-700">
              <span className="uppercase tracking-widest text-[9px] font-bold">{t("Subtotal")}</span>
              <span className="font-mono font-medium">{formatPrice(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-orange-600 font-bold">
                <span className="uppercase tracking-widest text-[9px]">
                  {t("Discount")} {order?.coupon_code ? `(${order.coupon_code})` : ""}
                </span>
                <span className="font-mono">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-orange-700">
              <span className="uppercase tracking-widest text-[9px] font-bold">{t("Shipping & Handling")}</span>
              <span className="font-mono font-medium">
                {shippingFee === 0 ? t("FREE") : formatPrice(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-xs text-orange-700">
              <span className="uppercase tracking-widest text-[9px] font-bold">{t("Taxes & GST (5%)")}</span>
              <span className="font-mono font-medium">{formatPrice(taxAmount)}</span>
            </div>

            <div className="pt-4 border-t border-orange-200 flex justify-between items-baseline">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-orange-950">{t("Total Paid")}</p>
                <p className="text-[8px] uppercase tracking-widest text-orange-400 font-bold">{t("All taxes included")}</p>
              </div>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-orange-955">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>

          {/* Security & Verification Footer */}
          <div className="pt-4 border-t border-dashed border-orange-200 flex items-center justify-between text-orange-400 text-[9px] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-orange-600" /> {t("Verified Order & Mock Receipt")}
            </span>
            <span>GoMo Deals Studio</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
          <button
            type="button"
            onClick={() => navigate("/my-orders")}
            className="flex-1 h-14 bg-orange-955 text-white text-[10px] uppercase tracking-[0.3em] font-black rounded-none hover:bg-orange-850 transition-colors flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
          >
            <ShoppingBag size={16} />
            <span>{t("View My Orders")}</span>
            <ChevronRight size={14} />
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 h-14 bg-white border border-orange-300 text-orange-950 text-[10px] uppercase tracking-[0.3em] font-black rounded-none hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t("Continue Shopping")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;