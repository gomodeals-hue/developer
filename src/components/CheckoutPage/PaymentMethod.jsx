import React, { useState } from "react";
import { CreditCard, QrCode, Truck, Check, ShieldCheck, AlertCircle, Zap } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { paymentService } from "../../services/paymentService";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  deliveryMethod = "standard",
  setDeliveryMethod,
  subtotal = 0,
  onBack,
  onNext
}) => {
  const { t, formatPrice } = useShop();

  const [cardData, setCardData] = useState({
    cardNumber: paymentDetails?.cardNumber || "",
    cardHolder: paymentDetails?.cardHolder || "",
    expiryDate: paymentDetails?.expiryDate || "",
    cvv: paymentDetails?.cvv || ""
  });

  const [upiId, setUpiId] = useState(paymentDetails?.upiId || "");
  const [error, setError] = useState("");

  const formatCardNumber = (value) => {
    const raw = value.replace(/\D/g, '').slice(0, 16);
    return raw.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const raw = value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      return `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
    }
    return raw;
  };

  const fillDemoCard = () => {
    setCardData({
      cardNumber: "4532 8921 4410 7789",
      cardHolder: "SARANYAN E",
      expiryDate: "12/28",
      cvv: "882"
    });
    setError("");
  };

  const fillDemoUPI = (handle = "@okhdfcbank") => {
    setUpiId(`saranyan${handle}`);
    setError("");
  };

  const handleProceed = () => {
    setError("");
    const details = paymentMethod === 'CARD' 
      ? cardData 
      : paymentMethod === 'UPI' 
      ? { upiId } 
      : {};

    const validation = paymentService.validatePaymentDetails(paymentMethod, details);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    if (setPaymentDetails) {
      setPaymentDetails(details);
    }
    onNext(details);
  };

  const methods = [
    {
      id: "CARD",
      label: "Credit / Debit Card",
      subtitle: "Instant & Secure Mock Gateway (Visa, MC, RuPay)",
      icon: <CreditCard size={20} strokeWidth={1.5} />,
      badge: "Mock Gateway"
    },
    {
      id: "UPI",
      label: "Direct UPI Transfer",
      subtitle: "GPay, PhonePe, Paytm, BHIM & NetBanking",
      icon: <QrCode size={20} strokeWidth={1.5} />,
      badge: "Instant"
    },
    {
      id: "COD",
      label: "Cash on Delivery",
      subtitle: "Pay cash or QR at your doorstep upon arrival",
      icon: <Truck size={20} strokeWidth={1.5} />,
      badge: "Doorstep"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif italic text-orange-900 mb-1">{t("Payment Method")}</h2>
        <p className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">
          {t("Select your preferred simulated payment method")}
        </p>
      </div>

      {/* Mock Security Notice Banner */}
      <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200/60 rounded-none text-orange-850">
        <ShieldCheck size={20} className="text-orange-600 shrink-0" />
        <p className="text-xs font-light leading-relaxed">
          <span className="font-bold uppercase tracking-wider text-[10px] text-orange-950 mr-1">Simulated Mode:</span>
          No actual bank charges or real credentials are required. All payment steps are safely emulated via mock services.
        </p>
      </div>

      {/* Delivery Speed / Method */}
      <div className="space-y-3">
        <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500">
          {t("Delivery Method")} *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setDeliveryMethod && setDeliveryMethod("standard")}
            className={`p-4 border text-left rounded-none cursor-pointer transition-all flex items-center justify-between ${
              deliveryMethod === "standard"
                ? "border-orange-955 bg-orange-50/60 ring-1 ring-orange-955 text-orange-950"
                : "border-orange-200 bg-white hover:border-orange-400 text-orange-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-orange-600 shrink-0" />
              <div>
                <p className="text-xs font-serif italic font-bold">Standard Ground Delivery</p>
                <p className="text-[9px] uppercase tracking-wider text-orange-500">3 - 5 Business Days</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-orange-950">
              {subtotal >= 1000 ? "FREE" : "₹50"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMethod && setDeliveryMethod("express")}
            className={`p-4 border text-left rounded-none cursor-pointer transition-all flex items-center justify-between ${
              deliveryMethod === "express"
                ? "border-orange-955 bg-orange-50/60 ring-1 ring-orange-955 text-orange-950"
                : "border-orange-200 bg-white hover:border-orange-400 text-orange-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-serif italic font-bold">Express Studio Delivery</p>
                <p className="text-[9px] uppercase tracking-wider text-orange-500">1 - 2 Business Days</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-orange-950">₹120</span>
          </button>
        </div>
      </div>

      {/* Method Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {methods.map((m) => {
          const isSelected = paymentMethod === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setPaymentMethod(m.id);
                setError("");
              }}
              className={`p-4 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between min-h-[100px] ${
                isSelected
                  ? "border-orange-955 bg-orange-955 text-white shadow-md ring-1 ring-orange-955"
                  : "border-orange-200 bg-white text-orange-950 hover:border-orange-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={isSelected ? "text-white" : "text-orange-600"}>
                  {m.icon}
                </div>
                <span className={`text-[8px] uppercase tracking-widest px-2 py-0.5 font-bold ${
                  isSelected ? "bg-white/20 text-white" : "bg-orange-100 text-orange-800"
                }`}>
                  {m.badge}
                </span>
              </div>
              <div>
                <p className={`text-xs font-serif italic font-bold ${isSelected ? "text-white" : "text-orange-950"}`}>
                  {m.label}
                </p>
                <p className={`text-[9px] uppercase tracking-wider mt-0.5 line-clamp-1 ${isSelected ? "text-white/70" : "text-orange-400"}`}>
                  {m.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Card Details Form */}
      {paymentMethod === "CARD" && (
        <div className="p-6 bg-orange-50/50 border border-orange-200 rounded-none space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-serif italic font-bold text-orange-950">
              {t("Card Credentials (Mock)")}
            </h3>
            <button
              type="button"
              onClick={fillDemoCard}
              className="text-[9px] uppercase tracking-widest font-black text-orange-600 hover:text-orange-955 transition-colors underline cursor-pointer"
            >
              ✨ {t("Fill Demo Card")}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1">
                {t("Card Number")} *
              </label>
              <input
                type="text"
                maxLength={19}
                value={cardData.cardNumber}
                onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })}
                placeholder="4532 0000 0000 0000"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm font-mono tracking-widest text-orange-950 focus:outline-none focus:border-orange-950"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1">
                {t("Name on Card")} *
              </label>
              <input
                type="text"
                value={cardData.cardHolder}
                onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value.toUpperCase() })}
                placeholder="SARANYAN E"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm uppercase text-orange-950 focus:outline-none focus:border-orange-950"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1">
                  {t("Expiry Date")} (MM/YY) *
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={cardData.expiryDate}
                  onChange={(e) => setCardData({ ...cardData, expiryDate: formatExpiry(e.target.value) })}
                  placeholder="12/28"
                  className="w-full h-11 px-4 bg-white border border-orange-200 text-sm font-mono text-orange-950 focus:outline-none focus:border-orange-950"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1">
                  {t("CVV / CVC")} *
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                  placeholder="882"
                  className="w-full h-11 px-4 bg-white border border-orange-200 text-sm font-mono text-orange-950 focus:outline-none focus:border-orange-950"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPI Details Form */}
      {paymentMethod === "UPI" && (
        <div className="p-6 bg-orange-50/50 border border-orange-200 rounded-none space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-serif italic font-bold text-orange-950">
              {t("Virtual Payment Address (VPA / UPI)")}
            </h3>
            <span className="text-[9px] uppercase tracking-widest text-orange-400 font-bold">
              {t("Instant Verification")}
            </span>
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1">
              {t("Enter UPI ID")} *
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value.trim().toLowerCase())}
              placeholder="username@okhdfcbank"
              className="w-full h-11 px-4 bg-white border border-orange-200 text-sm font-mono text-orange-950 focus:outline-none focus:border-orange-950"
            />
          </div>

          {/* Quick handle pills */}
          <div>
            <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mb-2">
              {t("Quick select provider handle:")}
            </p>
            <div className="flex flex-wrap gap-2">
              {["@okhdfcbank", "@oksbi", "@paytm", "@ybl", "@axl"].map((handle) => (
                <button
                  key={handle}
                  type="button"
                  onClick={() => fillDemoUPI(handle)}
                  className="px-3 py-1 bg-white border border-orange-200 text-orange-850 hover:bg-orange-955 hover:text-white transition-colors text-xs font-mono rounded-none cursor-pointer"
                >
                  saranyan{handle}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cash on Delivery Notice */}
      {paymentMethod === "COD" && (
        <div className="p-6 bg-orange-50/50 border border-orange-200 rounded-none space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-orange-950 font-serif italic font-bold">
            <Truck size={18} className="text-orange-600" />
            <span>{t("Doorstep Cash / Contactless UPI on Delivery")}</span>
          </div>
          <p className="text-xs text-orange-800 font-light leading-relaxed">
            You can pay the full amount directly to the courier agent when your parcel arrives at your address. Cash or UPI QR scanning is accepted upon delivery.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2.5 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider rounded-none">
          <AlertCircle size={16} className="shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 h-14 border border-orange-300 text-orange-800 text-[11px] uppercase tracking-[0.4em] font-black rounded-none hover:bg-orange-50 transition-colors cursor-pointer"
        >
          ← {t("Back")}
        </button>
        <button
          type="button"
          onClick={handleProceed}
          className="flex-1 h-14 bg-orange-955 text-white text-[11px] uppercase tracking-[0.4em] font-black rounded-none hover:bg-orange-850 transition-colors shadow-lg shadow-orange-950/10 cursor-pointer"
        >
          {t("Review & Confirm")} →
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;