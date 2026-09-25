import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Check, AlertCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSummary, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    formatPrice, 
    t 
  } = useShop();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (codeToApply) => {
    const targetCode = (codeToApply || couponInput).trim();
    if (!targetCode) return;
    setIsApplying(true);
    setCouponError("");

    const res = await applyCoupon(targetCode);
    if (!res.success) {
      setCouponError(res.message || "Invalid or ineligible coupon code.");
    } else {
      setCouponInput("");
    }
    setIsApplying(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponError("");
  };

  if (cart.length === 0) {
    return (
      <div className="pt-16 pb-24 min-h-screen bg-[#fdfbf9] text-orange-900 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-white border border-orange-100 flex items-center justify-center mb-8 shadow-[0_4px_20px_rgba(67,23,5,0.03)] rounded-none">
              <ShoppingBag size={32} className="text-orange-400" strokeWidth={1} />
            </div>
            <h1 className="text-3xl font-serif italic text-orange-955 mb-4">{t("cart_empty")}</h1>
            <p className="text-orange-955/65 mb-10 max-w-sm mx-auto font-sans leading-relaxed uppercase text-[9px] tracking-[0.18em] font-bold">
              {t("cart_empty_desc")}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-orange-950 text-white px-12 py-5 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-orange-900 transition-all duration-300 rounded-none shadow-[0_8px_30px_rgba(67,23,5,0.15)] cursor-pointer"
            >
              {t("start_shopping")}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const { subtotal, discountAmount, shippingFee, taxAmount, finalTotal, isFreeShipping, freeShippingProgress, freeShippingRemaining } = cartSummary;

  return (
    <div className="pt-16 pb-24 min-h-screen bg-[#fdfbf9]">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Cart Items */}
          <div className="flex-1">
            <header className="mb-12 pb-8 border-b border-orange-100/60 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-orange-650 block mb-4 font-bold">GoMo Deals</span>
                <h1 className="text-5xl md:text-6xl font-serif italic text-orange-955 font-normal">{t("shopping_cart")}</h1>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-orange-955 text-orange-950 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-orange-955 hover:text-white transition-all duration-300 rounded-none cursor-pointer w-fit"
              >
                {t("continue_shopping")}
              </button>
            </header>

            {/* Free Shipping Progress Indicator */}
            <div className="mb-10 p-5 bg-white border border-orange-200/80 rounded-none shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-orange-600" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-orange-950">
                    {isFreeShipping ? "FREE Standard Delivery Unlocked!" : `Add ${formatPrice(freeShippingRemaining)} more for FREE Delivery`}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-orange-600">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-orange-100 rounded-none overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500" 
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-12">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    layout
                    key={`${item.id}-${item.selectedColor || 'none'}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-8 sm:gap-12 pb-12 border-b border-orange-100/40 group"
                  >
                    {/* Item Image */}
                    <div className="w-32 sm:w-48 aspect-[3/4] bg-white border border-orange-100 p-2 overflow-hidden rounded-none relative shadow-sm flex items-center justify-center">
                      <img
                        src={item.image || item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <h3 className="text-xl font-serif italic text-orange-950 leading-snug">
                            <Link to={`/product/${item.id}`} className="hover:text-orange-600 transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedColor)}
                            className="text-orange-955/40 hover:text-rose-600 transition-all duration-300 p-2 cursor-pointer"
                            title={t("remove_item")}
                          >
                            <Trash2 size={18} strokeWidth={1.5} />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          {item.selectedColor && (
                            <span className="text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#f4ebe1] text-orange-950 font-black border border-orange-200/50 rounded-none">
                              {item.selectedColor}
                            </span>
                          )}
                          <span className="text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#faf8f5] text-orange-950/70 font-black border border-orange-200/20 rounded-none">
                            {t("qty")}: {item.quantity}
                          </span>
                        </div>
                        
                        <p className="text-lg font-serif italic text-orange-955">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-8">
                        <div className="flex items-center border border-orange-200 bg-white rounded-none w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)}
                            className="p-3.5 hover:bg-orange-50/50 transition-colors border-r border-orange-100 text-orange-950 cursor-pointer rounded-none"
                          >
                            <Minus size={13} strokeWidth={2} />
                          </button>
                          <span className="w-12 text-center text-xs font-black font-sans text-orange-950">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
                            className="p-3.5 hover:bg-orange-50/50 transition-colors border-l border-orange-100 text-orange-950 cursor-pointer rounded-none"
                          >
                            <Plus size={13} strokeWidth={2} />
                          </button>
                        </div>
                        <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/60 self-start sm:self-auto">
                          {t("item_total")}: <span className="ml-2 text-base font-serif italic text-orange-955 font-normal">{formatPrice(item.price * item.quantity)}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[480px]">
            <div className="bg-[#fdfbf9] p-8 sm:p-10 sticky top-40 border border-orange-200 rounded-none shadow-[0_4px_25px_rgba(67,23,5,0.02)] space-y-8">
              <h2 className="text-2xl font-serif italic text-orange-955 pb-4 border-b border-orange-100/60 font-normal">
                {t("order_summary")}
              </h2>

              {/* Coupon Code Entry */}
              <div className="space-y-3">
                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500">
                  {t("Discount Coupon")}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400" size={14} />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder={appliedCoupon ? appliedCoupon.code : "PROMO CODE"}
                      disabled={!!appliedCoupon}
                      className="w-full h-11 pl-10 pr-4 bg-white border border-orange-200 text-[10px] uppercase font-bold tracking-widest text-orange-950 focus:outline-none focus:border-orange-950"
                    />
                  </div>
                  {appliedCoupon ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="px-4 text-[10px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest cursor-pointer"
                    >
                      {t("Remove")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      disabled={isApplying || !couponInput.trim()}
                      className="px-5 h-11 bg-orange-955 text-white text-[10px] uppercase tracking-widest font-black hover:bg-orange-850 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      {isApplying ? "..." : t("Apply")}
                    </button>
                  )}
                </div>

                {/* Coupon Suggestion Pills */}
                {!appliedCoupon && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { code: 'WELCOME10', label: '10% OFF' },
                      { code: 'GOMO500', label: '₹500 OFF' },
                      { code: 'FREESHIP', label: 'FREE SHIP' }
                    ].map((chip) => (
                      <button
                        key={chip.code}
                        type="button"
                        onClick={() => {
                          setCouponInput(chip.code);
                          handleApplyCoupon(chip.code);
                        }}
                        className="px-2 py-0.5 bg-orange-100/60 hover:bg-orange-955 hover:text-white transition-colors text-[8px] font-mono font-bold text-orange-900 border border-orange-200 cursor-pointer"
                      >
                        {chip.code} ({chip.label})
                      </button>
                    ))}
                  </div>
                )}

                {couponError && (
                  <p className="text-[9px] font-bold text-rose-600 uppercase tracking-wider">
                    {couponError}
                  </p>
                )}

                {appliedCoupon && (
                  <p className="text-[9px] font-black text-emerald-700 uppercase tracking-wider">
                    ✓ Applied {appliedCoupon.code} (-{formatPrice(discountAmount)})
                  </p>
                )}
              </div>
              
              {/* Financial Calculation Lines */}
              <div className="space-y-4 pt-4 border-t border-orange-100/60">
                <div className="flex justify-between text-[9px] uppercase tracking-[0.25em] text-orange-955/60 font-bold">
                  <span>{t("subtotal")}</span>
                  <span className="text-orange-955 font-mono text-xs">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[9px] uppercase tracking-[0.25em] text-emerald-700 font-bold">
                    <span>{t("Coupon Savings")}</span>
                    <span className="font-mono text-xs">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[9px] uppercase tracking-[0.25em] text-orange-955/60 font-bold">
                  <span>{t("shipping")}</span>
                  <span className={shippingFee === 0 ? "text-emerald-700 font-extrabold" : "text-orange-955 font-mono text-xs"}>
                    {shippingFee === 0 ? t("FREE") : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-[9px] uppercase tracking-[0.25em] text-orange-955/60 font-bold">
                  <span>{t("duties_tax")} (5%)</span>
                  <span className="text-orange-955 font-mono text-xs">{formatPrice(taxAmount)}</span>
                </div>

                <div className="pt-6 border-t border-orange-200/60 flex justify-between items-baseline text-xl font-serif italic text-orange-955">
                  <span>{t("total_price")}</span>
                  <span className="text-2xl font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-955 text-white py-5.5 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-orange-900 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(67,23,5,0.15)] rounded-none group cursor-pointer"
              >
                {t("proceed_to_checkout")} <ArrowRight size={15} strokeWidth={2} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-white text-orange-955 border border-orange-955 py-5 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-3 rounded-none cursor-pointer"
              >
                {t("continue_shopping")}
              </button>
              
              <p className="text-[8px] text-center text-orange-955/50 uppercase tracking-[0.25em] leading-loose font-bold">
                {t("free_shipping_disclaimer")}<br />
                Secured by GoMo Deals Studio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
