import React from "react";
import { Lock, Eye, EyeOff, ShieldCheck, CreditCard, Percent, Sparkles, Check } from "lucide-react";

const EMI_BANKS = [
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India (SBI)",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "IDFC FIRST Bank",
  "IndusInd Bank",
  "American Express",
  "Standard Chartered Bank",
  "RBL Bank"
];

export const CreditCardSection = ({
  creditNumber,
  setCreditNumber,
  creditName,
  setCreditName,
  creditExpiry,
  setCreditExpiry,
  creditCvv,
  setCreditCvv,
  creditType,
  setCreditType,
  creditEmiMonths,
  setCreditEmiMonths,
  creditEmiBank,
  setCreditEmiBank,
  showCreditCvv,
  setShowCreditCvv,
  creditSave,
  setCreditSave,
  getCardBrand,
  finalTotal,
  formatPrice
}) => {
  const brand = getCardBrand(creditNumber);
  const isAmex = brand.name === "Amex";

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, isAmex ? 15 : 16);
    if (isAmex) {
      const p1 = raw.slice(0, 4);
      const p2 = raw.slice(4, 10);
      const p3 = raw.slice(10, 15);
      setCreditNumber([p1, p2, p3].filter(Boolean).join(" "));
    } else {
      const parts = raw.match(/.{1,4}/g);
      setCreditNumber(parts ? parts.join(" ") : raw);
    }
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      let mm = raw.slice(0, 2);
      if (parseInt(mm, 10) > 12) mm = "12";
      if (mm === "00") mm = "01";
      raw = raw.length > 2 ? `${mm}/${raw.slice(2, 4)}` : mm;
    }
    setCreditExpiry(raw);
  };

  // EMI Options based on total
  const emiPlans = [
    {
      months: 3,
      label: "3 Months",
      monthly: Math.round(finalTotal / 3),
      interest: "0% (No Cost EMI)",
      badge: "NO COST",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      months: 6,
      label: "6 Months",
      monthly: Math.round(finalTotal / 6),
      interest: "0% (No Cost EMI)",
      badge: "NO COST",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      months: 9,
      label: "9 Months",
      monthly: Math.round((finalTotal * 1.04) / 9),
      interest: "12% p.a. standard",
      badge: "POPULAR",
      badgeColor: "bg-stone-100 text-stone-700"
    },
    {
      months: 12,
      label: "12 Months",
      monthly: Math.round((finalTotal * 1.06) / 12),
      interest: "14% p.a. standard",
      badge: "LOWEST / MO",
      badgeColor: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div className="space-y-4 pt-1">
      {/* Payment Option Toggle: Full Payment vs No Cost EMI */}
      <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-600 gap-1">
        <button
          type="button"
          onClick={() => setCreditType("full")}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            creditType === "full"
              ? "bg-white text-orange-600 shadow-xs font-black"
              : "hover:text-stone-900"
          }`}
        >
          <CreditCard size={14} />
          <span>Pay Full Amount ({formatPrice(finalTotal)})</span>
        </button>

        <button
          type="button"
          onClick={() => setCreditType("emi")}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            creditType === "emi"
              ? "bg-white text-orange-600 shadow-xs font-black"
              : "hover:text-stone-900"
          }`}
        >
          <Percent size={14} />
          <span>Easy Monthly EMI</span>
          <span className="text-[9px] px-1 py-0.2 bg-emerald-100 text-emerald-800 rounded font-black">
            0% INT
          </span>
        </button>
      </div>

      {/* EMI Scheme Selector if EMI is Active */}
      {creditType === "emi" && (
        <div className="p-3.5 bg-orange-50/50 border border-orange-200/80 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-950 flex items-center gap-1.5">
              <Sparkles size={14} className="text-orange-600" />
              <span>Select Your Credit Card Bank & EMI Tenure:</span>
            </span>
            <select
              value={creditEmiBank}
              onChange={(e) => setCreditEmiBank(e.target.value)}
              className="text-xs p-1.5 border border-orange-300 rounded-md bg-white text-stone-800 font-semibold"
            >
              {EMI_BANKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {emiPlans.map((plan) => (
              <button
                key={plan.months}
                type="button"
                onClick={() => setCreditEmiMonths(plan.months)}
                className={`p-2.5 border rounded-lg text-left transition cursor-pointer ${
                  creditEmiMonths === plan.months
                    ? "border-orange-500 bg-white ring-2 ring-orange-500/30"
                    : "border-orange-200 bg-white/70 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-stone-800">{plan.label}</span>
                  <span className={`text-[9px] px-1 py-0.2 font-black rounded ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>
                <div className="text-sm font-black text-orange-600">
                  {formatPrice(plan.monthly)}
                  <span className="text-[10px] text-stone-500 font-normal">/mo</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 truncate">
                  {plan.interest}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Credit Card Details Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Card Number */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Credit Card Number
            </label>
            <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase ${brand.bg} ${brand.text}`}>
              {brand.name}
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              maxLength={isAmex ? 17 : 19}
              placeholder={isAmex ? "XXXX XXXXXX XXXXX" : "XXXX XXXX XXXX XXXX"}
              value={creditNumber}
              onChange={handleCardNumberChange}
              className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900 pr-10"
            />
            <CreditCard size={16} className="absolute right-3 top-3 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            Name on Credit Card
          </label>
          <input
            type="text"
            placeholder="Name as printed on card"
            value={creditName}
            onChange={(e) => setCreditName(e.target.value)}
            className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 uppercase font-medium"
          />
        </div>

        {/* Valid Thru */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            Valid Thru (MM/YY)
          </label>
          <input
            type="text"
            maxLength={5}
            placeholder="MM / YY"
            value={creditExpiry}
            onChange={handleExpiryChange}
            className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900"
          />
        </div>

        {/* CVV */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
              CVV {isAmex ? "(4 digits)" : "(3 digits)"}
            </label>
            <span className="text-[10px] text-stone-400">
              {isAmex ? "Front of card" : "Back of card"}
            </span>
          </div>
          <div className="relative">
            <input
              type={showCreditCvv ? "text" : "password"}
              maxLength={isAmex ? 4 : 3}
              placeholder={isAmex ? "••••" : "•••"}
              value={creditCvv}
              onChange={(e) => setCreditCvv(e.target.value.replace(/\D/g, "").slice(0, isAmex ? 4 : 3))}
              className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900 pr-9"
            />
            <button
              type="button"
              onClick={() => setShowCreditCvv(!showCreditCvv)}
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              title={showCreditCvv ? "Hide CVV" : "Show CVV"}
            >
              {showCreditCvv ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* RBI Tokenization Checkbox */}
      <div className="pt-1 flex items-start gap-2">
        <input
          type="checkbox"
          id="save-credit-card"
          checked={creditSave}
          onChange={(e) => setCreditSave(e.target.checked)}
          className="mt-0.5 w-3.5 h-3.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
        />
        <label htmlFor="save-credit-card" className="text-[11px] text-stone-600 cursor-pointer select-none">
          Securely save card with RBI tokenization for faster future checkouts.
        </label>
      </div>
    </div>
  );
};

export default CreditCardSection;

