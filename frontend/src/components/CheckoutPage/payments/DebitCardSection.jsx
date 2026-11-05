import React from "react";
import { Lock, Eye, EyeOff, ShieldCheck, CreditCard } from "lucide-react";

const DEBIT_BANKS = [
  "HDFC Bank",
  "State Bank of India (SBI)",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank (PNB)",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Other Scheduled Bank"
];

export const DebitCardSection = ({
  debitNumber,
  setDebitNumber,
  debitName,
  setDebitName,
  debitExpiry,
  setDebitExpiry,
  debitCvv,
  setDebitCvv,
  debitBank,
  setDebitBank,
  showDebitCvv,
  setShowDebitCvv,
  debitSave,
  setDebitSave,
  getCardBrand
}) => {
  const brand = getCardBrand(debitNumber);

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    setDebitNumber(parts ? parts.join(" ") : raw);
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      let mm = raw.slice(0, 2);
      if (parseInt(mm, 10) > 12) mm = "12";
      if (mm === "00") mm = "01";
      raw = raw.length > 2 ? `${mm}/${raw.slice(2, 4)}` : mm;
    }
    setDebitExpiry(raw);
  };

  return (
    <div className="space-y-3.5 pt-1">
      {/* Top Advisory Pill */}
      <div className="flex items-center justify-between p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-lg text-xs text-blue-900">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck size={14} className="text-blue-700" />
          <span>3D Secure Bank OTP verification required upon clicking Pay.</span>
        </div>
        <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
          ATM / RuPay / Visa
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Issuing Bank Dropdown */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            Issuing Bank
          </label>
          <select
            value={debitBank}
            onChange={(e) => setDebitBank(e.target.value)}
            className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800 font-medium cursor-pointer"
          >
            {DEBIT_BANKS.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        {/* Card Number */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Debit Card Number
            </label>
            {/* Live Detected Card Brand */}
            <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase ${brand.bg} ${brand.text}`}>
              {brand.name}
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              maxLength={19}
              placeholder="XXXX XXXX XXXX XXXX"
              value={debitNumber}
              onChange={handleCardNumberChange}
              className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900 pr-10"
            />
            <CreditCard size={16} className="absolute right-3 top-3 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="Name as printed on card"
            value={debitName}
            onChange={(e) => setDebitName(e.target.value)}
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
            value={debitExpiry}
            onChange={handleExpiryChange}
            className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900"
          />
        </div>

        {/* CVV */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            CVV / ATM CVC
          </label>
          <div className="relative">
            <input
              type={showDebitCvv ? "text" : "password"}
              maxLength={3}
              placeholder="•••"
              value={debitCvv}
              onChange={(e) => setDebitCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900 pr-9"
            />
            <button
              type="button"
              onClick={() => setShowDebitCvv(!showDebitCvv)}
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              title={showDebitCvv ? "Hide CVV" : "Show CVV"}
            >
              {showDebitCvv ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* RBI Tokenization Checkbox */}
      <div className="pt-1 flex items-start gap-2">
        <input
          type="checkbox"
          id="save-debit-card"
          checked={debitSave}
          onChange={(e) => setDebitSave(e.target.checked)}
          className="mt-0.5 w-3.5 h-3.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
        />
        <label htmlFor="save-debit-card" className="text-[11px] text-stone-600 cursor-pointer select-none">
          Securely save this card as per RBI tokenization guidelines for fast 1-click future checkouts.
        </label>
      </div>
    </div>
  );
};

export default DebitCardSection;
