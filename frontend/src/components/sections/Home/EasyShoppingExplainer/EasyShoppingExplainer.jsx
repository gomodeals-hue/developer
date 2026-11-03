import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ShoppingCart, CreditCard, Truck, ChevronRight, ShieldCheck, Store, HelpCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../../../context/ShopContext';
import EasyOrderGuideModal from '../../../common/EasyOrderGuideModal';

export default function EasyShoppingExplainer() {
  const { t } = useShop();
  const [showModal, setShowModal] = useState(false);

  const cards = [
    {
      step: '01',
      title: 'Select Products',
      icon: ShoppingBag,
      desc: 'Browse curated collections across apparel, pooja essentials, and electronics with transparent pricing.',
      actionText: 'Explore Catalog',
      link: '/categories'
    },
    {
      step: '02',
      title: 'Review Bag & Savings',
      icon: ShoppingCart,
      desc: 'Verify sizes, apply discount coupons like GOMO50, and view total estimated savings prior to checkout.',
      actionText: 'View Offers',
      link: '/deals'
    },
    {
      step: '03',
      title: 'Flexible Payment',
      icon: CreditCard,
      desc: 'Choose UPI, cards, net banking, or opt for Cash on Delivery to pay once your parcel arrives at your door.',
      actionText: 'Payment Details',
      link: '/cart'
    },
    {
      step: '04',
      title: 'Express Doorstep Delivery',
      icon: Truck,
      desc: 'Track live courier dispatch across top logistic networks directly to your delivery address.',
      actionText: 'Track Order',
      link: '/my-orders'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#faf6f0] via-[#fff9f4] to-[#faf6f0] border-y border-orange-100/70 relative overflow-hidden">
      {/* Expressive Ambient Background Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[10.5px] font-black uppercase tracking-wider mb-2.5 border border-orange-200/60 shadow-2xs">
              <Sparkles size={12} className="text-[#f76e28]" />
              <span>{t("shopping_simple_badge", "Simple Shopping Experience")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t("shopping_heading", "Straightforward, Reliable Shopping")}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-xl leading-relaxed">
              {t("shopping_desc", "A transparent four-step ordering process designed to make selecting, buying, and tracking your items effortless.")}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="h-11 px-4 sm:px-5 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-200/80 font-bold text-xs shadow-xs hover:shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <HelpCircle size={15} className="text-[#f76e28]" />
              <span>{t("ordering_guide_btn", "Ordering Guide")}</span>
            </button>
            <Link
              to="/seller"
              className="h-11 px-5 rounded-full bg-gradient-to-r from-[#f76e28] to-[#ea580c] hover:from-[#ea580c] hover:to-[#de5713] text-white font-extrabold text-xs shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Store size={15} />
              <span>{t("seller_portal_btn", "Seller Portal")}</span>
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid - Material 3 Expressive Squircle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cards.map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="group relative bg-gradient-to-b from-white via-white to-[#fffaf6] rounded-3xl p-6 border border-stone-200/80 hover:border-orange-200 shadow-[0_4px_18px_-2px_rgba(28,25,23,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(247,110,40,0.14)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient Top Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/50 via-amber-100/20 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Expressive Pill Step Badge */}
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#f76e28] to-[#ea580c] text-white font-black text-xs tracking-wider shadow-xs shadow-orange-500/30">
                      STEP {card.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-orange-50/90 ring-4 ring-orange-50/50 border border-orange-200/60 flex items-center justify-center text-[#f76e28] group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                      <CardIcon size={20} strokeWidth={2.2} />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-extrabold text-stone-900 mb-2 group-hover:text-orange-950 transition-colors">
                    {t(card.title)}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {t(card.desc)}
                  </p>
                </div>

                <Link
                  to={card.link}
                  className="mt-3 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-black text-[#f76e28] hover:text-[#de5713] transition-colors group/link"
                >
                  <span className="group-hover/link:underline">{t(card.actionText)}</span>
                  <ChevronRight size={15} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Triple-Party Ecosystem Trust Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-white via-[#fffaf6] to-orange-50/70 border border-orange-200/70 shadow-[0_8px_24px_-4px_rgba(247,110,40,0.08)] flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-[#ea580c] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/25">
              <ShieldCheck size={26} strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-stone-900 tracking-tight">
                Integrated Commerce: Customers, Verified Merchants &amp; Administration
              </h4>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                Orders placed by customers directly dispatch to verified vendor inventories, with automated courier tracking and administrator oversight.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/seller"
              className="px-5 py-2.5 bg-gradient-to-r from-[#f76e28] to-[#ea580c] hover:from-[#ea580c] hover:to-[#de5713] text-white text-xs font-black rounded-full transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-orange-500/25 active:scale-95"
            >
              <Store size={14} />
              <span>Seller Portal</span>
            </Link>
          </div>
        </div>

      </div>

      <EasyOrderGuideModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </section>
  );
}
