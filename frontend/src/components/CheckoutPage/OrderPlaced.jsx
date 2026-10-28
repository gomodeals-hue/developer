import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
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
  ChevronRight,
  UserPlus,
  Lock,
  Sparkles
} from "lucide-react";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatPrice, t } = useShop();
  const { user, register } = useAuth();

  const stateData = location.state || {};
  const order = stateData.order || null;
  const orderId = stateData.orderId || order?.id || order?.order_id || "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderNumber = stateData.orderNumber || order?.order_number || `GOMO-2026-${orderId.toString().slice(-5).toUpperCase()}`;

  const [animate, setAnimate] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const items = order?.items || [];
  const address = order?.delivery_address || order?.address || null;
  const customerEmail = order?.customer_email || order?.customer?.email || address?.email || "customer@gomodeals.com";
  const customerName = address?.full_name || address?.name || "Customer";

  const handleCreateGuestAccount = async (e) => {
    e.preventDefault();
    if (!accountPassword || accountPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsCreatingAccount(true);
    try {
      const res = await register({
        name: customerName,
        email: customerEmail,
        password: accountPassword,
        phone: address?.phone || ""
      });
      if (res.success !== false) {
        setAccountCreated(true);
        toast.success("Account created! You can now track your orders seamlessly.");
      } else {
        toast.error(res.message || "Could not create account with this email.");
      }
    } catch (err) {
      toast.error("Account creation failed. Try logging in.");
    } finally {
      setIsCreatingAccount(false);
    }
  };

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
        {/* Animated Ordered Booked Celebration Badge */}
        <div className="text-center mb-8 relative">
          {/* Celebratory Micro-Particles */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const dist = 55 + (i % 3) * 15;
              const x = Math.cos(rad) * dist;
              const y = Math.sin(rad) * dist;
              const color = i % 3 === 0 ? "#f76e28" : i % 3 === 1 ? "#0077c8" : "#10b981";
              return (
                <motion.div
                  key={deg}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.4, 0.8], x, y, opacity: [1, 1, 0] }}
                  transition={{ duration: 0.65, delay: 0.05 + (i * 0.015), ease: "easeOut" }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              );
            })}
          </div>

          {/* Central Official GoMo Deals Verified Seal */}
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 16, stiffness: 320, duration: 0.28 }}
              className="relative"
            >
              {/* Concentric Aura Rings */}
              <div className="absolute -inset-3 rounded-full bg-[#f76e28]/15 animate-pulse pointer-events-none" />
              <div className="absolute -inset-1 rounded-full bg-[#f76e28]/10 pointer-events-none" />

              {/* Main Badge Seal */}
              <div className="w-20 h-20 rounded-full bg-[#f76e28] flex items-center justify-center text-white shadow-[0_12px_28px_rgba(247,110,40,0.35)] relative z-10 border-2 border-white/60">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 350, damping: 18 }}
                >
                  <Check size={38} strokeWidth={3} className="text-white drop-shadow-sm" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.12 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase tracking-widest mb-2 shadow-xs">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>{t("Order Booked & Secured")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
              {t("Thank You, Your Order is Confirmed!")}
            </h1>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              {t("Your order has been booked successfully. A confirmation receipt has been dispatched to your email.")}
            </p>
          </motion.div>

          {/* Snappy Live Order Journey Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6 max-w-xl mx-auto bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs"
          >
            <div className="flex items-center justify-between relative">
              {/* Timeline Connecting Line */}
              <div className="absolute left-6 right-6 top-3.5 h-0.5 bg-stone-200 z-0">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "35%" }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-orange-500"
                />
              </div>

              {/* Step 1: Booked */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <span className="text-[10px] font-bold text-stone-900 mt-1.5 leading-tight">Booked</span>
                <span className="text-[8px] text-emerald-600 font-semibold">Just Now</span>
              </div>

              {/* Step 2: Quality Check */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-xs animate-pulse">
                  <Package size={13} />
                </div>
                <span className="text-[10px] font-bold text-orange-950 mt-1.5 leading-tight">Packing</span>
                <span className="text-[8px] text-orange-600 font-semibold">In Progress</span>
              </div>

              {/* Step 3: Express Transit */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-400 border border-stone-200 flex items-center justify-center text-xs font-bold">
                  <Truck size={13} />
                </div>
                <span className="text-[10px] font-medium text-stone-500 mt-1.5 leading-tight">Express Transit</span>
                <span className="text-[8px] text-stone-400">BlueDart</span>
              </div>

              {/* Step 4: Doorstep */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-400 border border-stone-200 flex items-center justify-center text-xs font-bold">
                  <MapPin size={13} />
                </div>
                <span className="text-[10px] font-medium text-stone-500 mt-1.5 leading-tight">Delivery</span>
                <span className="text-[8px] text-stone-400">1–2 Days</span>
              </div>
            </div>
          </motion.div>
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
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1">
                <Check size={12} className="stroke-[3]" />
                <span>{order?.order_status || t("Confirmed")}</span>
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
                  <p className="font-mono text-[11px] text-orange-600 pt-1">Phone: {address.phone}</p>
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

        {/* Guest Account Creation Prompt */}
        {!user && (
          <div className="mt-8 bg-white border border-orange-200 p-6 sm:p-8 shadow-sm print:hidden">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                <UserPlus size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-orange-950 font-serif italic">
                    Save Order & Track Real-time
                  </h3>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-200 font-bold rounded-full">
                    Instant Setup
                  </span>
                </div>
                <p className="text-xs text-stone-600 mb-4">
                  Create a password to turn your guest checkout into a registered account for <strong>{customerEmail}</strong>. Track status, request returns, and save payment methods.
                </p>

                {accountCreated ? (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
                    <Check size={16} className="text-emerald-600" />
                    <span>Account created successfully! Your order is now linked to your profile.</span>
                  </div>
                ) : (
                  <form onSubmit={handleCreateGuestAccount} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Lock size={14} />
                      </div>
                      <input
                        type="password"
                        placeholder="Create a password (min 6 chars)"
                        value={accountPassword}
                        onChange={(e) => setAccountPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isCreatingAccount || accountPassword.length < 6}
                      className="px-5 py-2.5 bg-orange-955 hover:bg-orange-900 disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                    >
                      {isCreatingAccount ? "Saving..." : "Create Account"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

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