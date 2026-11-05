import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, RefreshCw, Smartphone, QrCode, Zap, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

const UPI_APPS = [
  { id: "gpay", name: "Google Pay", badge: "Google", color: "hover:border-blue-500 hover:bg-blue-50/40 text-blue-700 bg-white" },
  { id: "phonepe", name: "PhonePe", badge: "PhonePe", color: "hover:border-purple-500 hover:bg-purple-50/40 text-purple-700 bg-white" },
  { id: "paytm", name: "Paytm UPI", badge: "Paytm", color: "hover:border-sky-500 hover:bg-sky-50/40 text-sky-700 bg-white" },
  { id: "bhim", name: "BHIM UPI", badge: "NPCI", color: "hover:border-emerald-500 hover:bg-emerald-50/40 text-emerald-700 bg-white" },
  { id: "cred", name: "CRED UPI", badge: "CRED", color: "hover:border-stone-800 hover:bg-stone-50 text-stone-900 bg-white" }
];

const VPA_HANDLES = ["@okhdfcbank", "@okaxis", "@okicici", "@oksbi", "@paytm", "@ybl"];

export const UpiPaymentSection = ({
  upiSubMethod,
  setUpiSubMethod,
  upiId,
  setUpiId,
  isUpiVerified,
  setIsUpiVerified,
  upiVerifiedName,
  upiVerifying,
  handleVerifyUpi,
  upiUri,
  upiTimer,
  setUpiTimer,
  upiSelectedApp,
  setUpiSelectedApp,
  isUpiSimulating,
  handleSimulateUpiSuccess,
  finalTotal,
  formatPrice
}) => {
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Sub-method navigation tabs */}
      <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-600 gap-1">
        <button
          type="button"
          onClick={() => setUpiSubMethod("qr")}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            upiSubMethod === "qr"
              ? "bg-white text-orange-600 shadow-xs font-black"
              : "hover:text-stone-900"
          }`}
        >
          <QrCode size={14} />
          <span>Scan Dynamic QR</span>
          <span className="hidden sm:inline text-[9px] px-1 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold">
            INSTANT
          </span>
        </button>

        <button
          type="button"
          onClick={() => setUpiSubMethod("apps")}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            upiSubMethod === "apps"
              ? "bg-white text-orange-600 shadow-xs font-black"
              : "hover:text-stone-900"
          }`}
        >
          <Smartphone size={14} />
          <span>UPI Apps</span>
        </button>

        <button
          type="button"
          onClick={() => setUpiSubMethod("vpa")}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            upiSubMethod === "vpa"
              ? "bg-white text-orange-600 shadow-xs font-black"
              : "hover:text-stone-900"
          }`}
        >
          <span>Enter UPI ID / VPA</span>
        </button>
      </div>

      {/* 1. DYNAMIC QR CODE TAB */}
      {upiSubMethod === "qr" && (
        <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* QR Code Container with High-Res Frame */}
            <div className="relative bg-white p-3.5 rounded-2xl border-2 border-orange-500/30 shadow-md flex flex-col items-center shrink-0">
              {upiTimer > 0 ? (
                <div className="bg-white p-1 rounded-lg">
                  <QRCodeSVG
                    value={upiUri}
                    size={155}
                    level="H"
                    includeMargin={false}
                    className="rounded"
                  />
                </div>
              ) : (
                <div className="w-[155px] h-[155px] flex flex-col items-center justify-center bg-stone-100 rounded text-center p-3">
                  <span className="text-xs font-bold text-rose-600 mb-2">QR Code Expired</span>
                  <button
                    type="button"
                    onClick={() => setUpiTimer(300)}
                    className="px-3 py-1.5 bg-orange-600 text-white rounded text-[11px] font-bold hover:bg-orange-700 flex items-center gap-1"
                  >
                    <RefreshCw size={12} /> Regenerate
                  </button>
                </div>
              )}

              {/* Verified Merchant Badge */}
              <div className="mt-2.5 flex items-center gap-1 text-[10px] font-black tracking-wider text-stone-700 uppercase">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>NPCI Verified Merchant</span>
              </div>
            </div>

            {/* QR Instructions and Live Action */}
            <div className="flex-grow space-y-3 text-center sm:text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Real-Time Payment Listener Active</span>
                </div>
                <h4 className="text-sm font-extrabold text-stone-900">
                  Scan & Pay {formatPrice(finalTotal)} via Any UPI App
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Open Google Pay, PhonePe, Paytm, or BHIM and scan this live QR code to approve payment.
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="text-stone-500">QR Code expires in:</span>
                <span className="font-mono font-black text-orange-600 px-2 py-0.5 bg-orange-50 border border-orange-200 rounded">
                  {formatTimer(upiTimer)}
                </span>
              </div>

              {/* Supported UPI Apps Pills */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                {UPI_APPS.map((app) => (
                  <span
                    key={app.id}
                    className="px-2 py-0.5 bg-white border border-stone-200 text-stone-600 rounded text-[10px] font-bold"
                  >
                    {app.name}
                  </span>
                ))}
              </div>

              {/* Direct Desktop Confirmation Simulation Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSimulateUpiSuccess}
                  disabled={isUpiSimulating}
                  className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {isUpiSimulating ? (
                    <>
                      <RefreshCw size={13} className="animate-spin text-orange-400" />
                      <span>Verifying Payment from Bank...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={13} className="text-amber-400 fill-amber-400" />
                      <span>I Have Completed Payment via App</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-stone-400 mt-1">
                  Click above after completing transaction on your phone to confirm order instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. UPI APPS 1-CLICK TAB */}
      {upiSubMethod === "apps" && (
        <div className="space-y-3">
          <p className="text-xs text-stone-600 font-medium">
            Select your preferred UPI app to launch directly:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {UPI_APPS.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => setUpiSelectedApp(app.id)}
                className={`p-3 border rounded-xl text-left transition cursor-pointer flex items-center justify-between ${
                  upiSelectedApp === app.id
                    ? "border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20"
                    : "border-stone-200 hover:border-stone-300 bg-white"
                }`}
              >
                <div>
                  <span className="block text-xs font-bold text-stone-800">{app.name}</span>
                  <span className="text-[10px] text-stone-500">{app.badge} Gateway</span>
                </div>
                {upiSelectedApp === app.id && (
                  <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 text-xs text-stone-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ExternalLink size={14} className="text-orange-600" />
              <span>Clicking Pay will switch directly to your chosen app on mobile.</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Zero Merchant Fee
            </span>
          </div>
        </div>
      )}

      {/* 3. ENTER UPI ID / VPA TAB */}
      {upiSubMethod === "vpa" && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-stone-600 font-medium mb-1.5">
              Enter Virtual Payment Address (VPA):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. mobile@upi or yourname@okhdfcbank"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setIsUpiVerified(false);
                }}
                className="flex-grow text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900"
              />
              <button
                type="button"
                onClick={handleVerifyUpi}
                disabled={upiVerifying}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  isUpiVerified
                    ? "bg-emerald-600 text-white"
                    : "bg-stone-900 hover:bg-stone-800 text-white"
                }`}
              >
                {upiVerifying ? (
                  <RefreshCw size={13} className="animate-spin text-white" />
                ) : isUpiVerified ? (
                  <>
                    <Check size={13} strokeWidth={3} />
                    <span>Verified</span>
                  </>
                ) : (
                  <span>Verify VPA</span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Handle Pill Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-stone-500 font-medium">Quick handles:</span>
            {VPA_HANDLES.map((handle) => (
              <button
                key={handle}
                type="button"
                onClick={() => {
                  const prefix = upiId.split("@")[0] || "saranyan";
                  setUpiId(`${prefix}${handle}`);
                  setIsUpiVerified(false);
                }}
                className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[10px] font-mono transition cursor-pointer"
              >
                {handle}
              </button>
            ))}
          </div>

          {/* Verified Feedback Alert */}
          {isUpiVerified && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold">
                <Check size={14} className="text-emerald-700" strokeWidth={3} />
                <span>NPCI Verified: {upiVerifiedName || "Saranyan E"}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Ready to Pay</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpiPaymentSection;
