import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, CheckCircle2, RefreshCw, X, AlertCircle, ArrowRight } from "lucide-react";

export const BankOtpModal = ({
  isOpen,
  onClose,
  otpData,
  otpInput,
  setOtpInput,
  otpTimer,
  setOtpTimer,
  otpError,
  setOtpError,
  isOtpVerifying,
  otpSuccess,
  handleVerifyOtp,
  handleResendOtp,
  formatPrice
}) => {
  if (!isOpen || !otpData) return null;

  const isDebit = otpData.method === "DEBIT_CARD";
  const bankTitle = otpData.bank || (isDebit ? "Bank Debit Card SecurePay" : "Credit Card 3D Secure 2.0");

  const formatTimer = (secs) => {
    return `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isOtpVerifying && !otpSuccess) onClose();
          }}
          className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 16 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden z-10"
        >
          {/* Header Bar with Bank Identity */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 px-5 py-4 text-white flex items-center justify-between border-b border-stone-700">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <Lock size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>{bankTitle}</span>
                </h3>
                <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-400" />
                  <span>256-Bit Verified Gateway Session</span>
                </p>
              </div>
            </div>

            {!isOtpVerifying && !otpSuccess && (
              <button
                type="button"
                onClick={onClose}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-4">
            {otpSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={36} strokeWidth={2.5} />
                </div>
                <h4 className="text-base font-bold text-stone-900">
                  Payment Authorized by Bank!
                </h4>
                <p className="text-xs text-stone-600">
                  Your transaction has been securely authorized. Securing your order...
                </p>
              </div>
            ) : (
              <>
                {/* Transaction Summary Card */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-1.5">
                  <div className="flex justify-between text-stone-600">
                    <span>Merchant:</span>
                    <strong className="text-stone-900">GoMo Deals Private Limited</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Card Account:</span>
                    <strong className="font-mono text-stone-900">{otpData.maskedCard}</strong>
                  </div>
                  {otpData.emiDetails ? (
                    <div className="flex justify-between text-stone-600">
                      <span>EMI Plan:</span>
                      <strong className="text-orange-600 font-bold">
                        {otpData.emiDetails.tenure} Months @ {formatPrice(otpData.emiDetails.monthly_amount)}/mo
                      </strong>
                    </div>
                  ) : null}
                  <div className="flex justify-between text-stone-600 pt-1 border-t border-stone-200">
                    <span>Total Amount:</span>
                    <strong className="font-bold text-sm text-stone-900">
                      {formatPrice(otpData.amount)}
                    </strong>
                  </div>
                </div>

                {/* Prompt instructions */}
                <div className="text-xs text-stone-600">
                  <p>
                    Please enter the 6-digit One Time Password (OTP) sent to your mobile registered with your bank ending in{" "}
                    <strong className="font-mono text-stone-800">
                      {otpData.maskedPhone ? otpData.maskedPhone.slice(-4) : "••10"}
                    </strong>:
                  </p>
                </div>

                {/* OTP Input Field */}
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="• • • • • •"
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6));
                      if (otpError) setOtpError("");
                    }}
                    className="w-full py-3 px-4 text-center text-2xl font-mono font-black tracking-[0.4em] bg-stone-50 border-2 border-stone-300 focus:border-orange-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 text-stone-900"
                    autoFocus
                  />
                  {otpError && (
                    <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center justify-center gap-1">
                      <AlertCircle size={13} /> {otpError}
                    </p>
                  )}
                </div>

                {/* Quick-Fill Test OTP Helper Pill */}
                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpInput("123456");
                      if (otpError) setOtpError("");
                    }}
                    className="text-[11px] text-orange-600 hover:text-orange-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>⚡ Quick-Fill Test OTP (123456)</span>
                  </button>

                  {/* Resend Timer */}
                  <div className="text-stone-500 text-[11px]">
                    {otpTimer > 0 ? (
                      <span>Resend in {formatTimer(otpTimer)}</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-orange-600 hover:text-orange-700 font-bold hover:underline cursor-pointer"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isOtpVerifying}
                    className="flex-1 py-3 px-4 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isOtpVerifying || otpInput.length < 6}
                    className="flex-[2] py-3 px-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-extrabold tracking-wide transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isOtpVerifying ? (
                      <>
                        <RefreshCw size={14} className="animate-spin text-white" />
                        <span>Verifying with Bank...</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize Payment</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BankOtpModal;
