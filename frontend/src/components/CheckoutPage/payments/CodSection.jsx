import React from "react";
import { Check, RefreshCw, Truck, MapPin, ShieldCheck, QrCode } from "lucide-react";

export const CodSection = ({
  captchaCode,
  captchaInput,
  setCaptchaInput,
  isCaptchaValid,
  setIsCaptchaValid,
  refreshCaptcha,
  codPincode,
  setCodPincode,
  isCodServiceable,
  codChecking,
  handleCheckCodPincode,
  finalTotal,
  formatPrice
}) => {
  return (
    <div className="space-y-4 pt-1">
      {/* Pincode & Express Delivery Serviceability Pill */}
      <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Check size={14} strokeWidth={3} />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <span>COD is Fully Available at PIN: {codPincode || "600032"}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-200/60 text-emerald-900 rounded font-black">
                VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-emerald-700">
              Delivery Partner: <strong>BlueDart Express Air</strong> (1–2 business days)
            </p>
          </div>
        </div>

        {/* Change Pincode Tool */}
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="text"
            maxLength={6}
            placeholder="PIN Code"
            value={codPincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 6);
              setCodPincode(val);
              if (val.length === 6) handleCheckCodPincode(val);
            }}
            className="w-24 text-xs px-2.5 py-1.5 bg-white border border-emerald-300 rounded font-mono text-center text-stone-900"
          />
          <button
            type="button"
            onClick={() => handleCheckCodPincode(codPincode)}
            disabled={codChecking}
            className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded cursor-pointer"
          >
            {codChecking ? "Checking..." : "Verify PIN"}
          </button>
        </div>
      </div>

      {/* Doorstep Payment Modes Notice */}
      <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2 text-xs text-amber-950">
        <div className="font-bold flex items-center gap-1.5 text-amber-900">
          <Truck size={14} className="text-amber-700" />
          <span>Doorstep Payment Instructions:</span>
        </div>
        <ul className="space-y-1 text-[11px] text-amber-900 list-disc list-inside">
          <li>
            Pay <strong>{formatPrice(finalTotal)}</strong> in physical cash to the BlueDart courier executive upon delivery.
          </li>
          <li className="flex items-center gap-1">
            <span>OR scan courier agent's live <strong>UPI QR Code</strong> on their handheld terminal using GPay/PhonePe.</span>
          </li>
          <li>Exact cash amount is appreciated for fast contactless parcel handoff.</li>
        </ul>
      </div>

      {/* Security Captcha Verification */}
      <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-2">
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
          Security Captcha Verification
        </label>
        <p className="text-[11px] text-stone-500">
          Please enter the 4-character code below to verify your Cash on Delivery booking:
        </p>

        <div className="flex items-center gap-3 pt-1">
          {/* Captcha Display Badge */}
          <div className="h-10 px-4 bg-stone-200 rounded-lg flex items-center gap-2.5 text-sm font-mono font-black tracking-widest text-stone-900 select-none border border-stone-300">
            <span>{captchaCode}</span>
            <button
              type="button"
              onClick={refreshCaptcha}
              title="Refresh security code"
              className="text-stone-500 hover:text-stone-900 p-1 cursor-pointer transition"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Captcha Input */}
          <div className="relative">
            <input
              type="text"
              maxLength={4}
              placeholder="ENTER CODE"
              value={captchaInput}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                setCaptchaInput(val);
                setIsCaptchaValid(val === captchaCode.toUpperCase());
              }}
              className="w-36 text-xs px-3 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase font-mono font-bold tracking-wider"
            />
            {isCaptchaValid && (
              <span className="absolute right-2.5 top-2.5 text-emerald-600">
                <Check size={16} strokeWidth={3} />
              </span>
            )}
          </div>

          {isCaptchaValid ? (
            <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
              <Check size={14} strokeWidth={3} /> Captcha Verified!
            </span>
          ) : (
            <span className="text-stone-400 text-[11px]">
              {captchaInput.length > 0 ? "Code does not match" : "Enter code to confirm"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodSection;
