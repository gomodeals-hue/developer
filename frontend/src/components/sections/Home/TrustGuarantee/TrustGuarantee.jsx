import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import { useShop } from '../../../../context/ShopContext';

const PERKS = [
  {
    icon: <Truck className="w-5 h-5 text-orange-600" />,
    title: 'Free Express Shipping',
    desc: 'On all orders above ₹499 nationwide'
  },
  {
    icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
    title: 'Secure Payment',
    desc: '100% protected UPI & card checkout'
  },
  {
    icon: <RotateCcw className="w-5 h-5 text-sky-600" />,
    title: '7-Day Easy Returns',
    desc: 'Doorstep pickup & instant refunds'
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
    title: '100% Genuine Certified',
    desc: 'Direct verified merchant sourcing'
  }
];

export default function TrustGuarantee() {
  const { t } = useShop();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {PERKS.map((perk, idx) => (
          <div 
            key={idx} 
            className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xs hover:border-orange-500/40 transition-all duration-200 flex items-center gap-3.5 group cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {perk.icon}
            </div>
            <div className="text-left min-w-0">
              <h4 className="text-xs sm:text-[13px] font-bold text-stone-900 truncate">
                {t(perk.title)}
              </h4>
              <p className="text-[10.5px] text-stone-500 truncate mt-0.5 font-medium">
                {t(perk.desc)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
