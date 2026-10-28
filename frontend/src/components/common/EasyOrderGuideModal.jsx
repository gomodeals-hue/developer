import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ShoppingBag, MapPin, Truck, CheckCircle2, ShieldCheck, Store, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EasyOrderGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const steps = [
    {
      step: '1',
      icon: Search,
      title: 'Find What You Need',
      color: 'from-orange-500 to-orange-600',
      iconColor: 'text-orange-600 bg-orange-50',
      description: 'Use the catalog search bar or select from departments like Pooja Essentials, Apparel, or Electronics.',
      tip: 'Tip: Filter by price, category, or customer rating to find specific items quickly.'
    },
    {
      step: '2',
      icon: ShoppingBag,
      title: 'Add to Cart & Apply Coupons',
      color: 'from-orange-500 to-rose-500',
      iconColor: 'text-rose-600 bg-rose-50',
      description: 'Select your preferred size, variant, or quantity, then tap "Add to Cart" or "Buy Now".',
      tip: 'Tip: Apply coupon code GOMO50 during checkout for instant savings.'
    },
    {
      step: '3',
      icon: MapPin,
      title: 'Enter Delivery & Payment',
      color: 'from-sky-500 to-blue-600',
      iconColor: 'text-sky-600 bg-sky-50',
      description: 'Provide your shipping address and select secure online payment (UPI, Cards) or Cash on Delivery.',
      tip: 'Tip: Free standard shipping is provided on orders over ₹499.'
    },
    {
      step: '4',
      icon: Truck,
      title: 'Dispatched & Delivered',
      color: 'from-emerald-500 to-teal-600',
      iconColor: 'text-emerald-600 bg-emerald-50',
      description: 'Track your order package in real time under "My Orders" until verified delivery at your doorstep.',
      tip: 'Tip: Real-time SMS and status notifications are provided at every transit milestone.'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-orange-100 overflow-hidden relative"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors cursor-pointer text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/25 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Platform Guide
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">How GoMo Deals Works</h3>
            <p className="text-orange-100 text-xs sm:text-sm mt-1">
              A transparent, reliable shopping process designed for all customers and merchants.
            </p>
          </div>

          {/* Steps Content */}
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {steps.map((s) => {
                const StepIcon = s.icon;
                return (
                  <div
                    key={s.step}
                    className="p-4 rounded-2xl border border-stone-200/80 bg-stone-50/60 hover:bg-orange-50/50 hover:border-orange-200 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center font-black text-xs shadow-xs`}>
                          {s.step}
                        </div>
                        <div className={`w-7 h-7 rounded-lg ${s.iconColor} flex items-center justify-center`}>
                          <StepIcon size={15} />
                        </div>
                        <h4 className="font-bold text-stone-900 text-sm">{s.title}</h4>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{s.description}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-stone-200/60 text-[11px] font-medium text-orange-700 bg-orange-100/60 px-2 py-1 rounded-lg">
                      {s.tip}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Portals Info for merchant */}
            <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50/60 border border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                  <Store size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-stone-900">Merchant and Vendor Portal</h5>
                  <p className="text-[11px] text-stone-600">List products, manage incoming customer orders, and request payouts in our Seller Hub.</p>
                </div>
              </div>
              <Link
                to="/seller"
                onClick={onClose}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Open Seller Hub</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-200/70 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Ready to explore?</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Catalog</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
