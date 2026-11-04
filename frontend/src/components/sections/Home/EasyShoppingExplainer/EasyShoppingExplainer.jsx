import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, ShoppingCart, CreditCard, Truck, ChevronRight, ShieldCheck, Store, HelpCircle, ArrowUpRight } from 'lucide-react';
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
    <section className="py-10 sm:py-12 bg-[#faf6f0] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-2">
              {t("shopping_simple_badge", "Simple Shopping Experience")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {t("shopping_heading", "Straightforward, Reliable Shopping")}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              {t("shopping_desc", "A transparent four-step ordering process designed to make selecting, buying, and tracking your items effortless.")}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="h-10 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle size={14} className="text-[#f76e28]" />
              <span>{t("ordering_guide_btn", "Ordering Guide")}</span>
            </button>
            <Link
              to="/seller"
              className="h-10 px-4 rounded-xl bg-[#f76e28] hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Store size={14} />
              <span>{t("seller_portal_btn", "Seller Portal")}</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div
                key={card.step}
                className="group bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-stone-300 transition-colors duration-180 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-stone-400 tracking-wider">
                      {card.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center text-[#f76e28]">
                      <CardIcon size={18} />
                    </div>
                  </div>
                  
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-1.5 group-hover:text-orange-600 transition-colors">
                    {t(card.title)}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {t(card.desc)}
                  </p>
                </div>

                <Link
                  to={card.link}
                  className="mt-2 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <span>{t(card.actionText)}</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Triple-Party Ecosystem Trust Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-stone-900">
                Integrated Commerce: Customers, Verified Merchants &amp; Administration
              </h4>
              <p className="text-xs text-stone-500">
                Orders placed by customers directly dispatch to verified vendor inventories, with automated courier tracking and administrator oversight.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/seller"
              className="px-3.5 py-1.5 bg-[#f76e28] hover:bg-[#de5713] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Store size={13} />
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
