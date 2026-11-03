import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import { useShop } from '../../../../context/ShopContext';

const PERKS = [
  {
    icon: <Truck className="w-5 h-5 text-[#f76e28]" strokeWidth={2.2} />,
    title: 'Free Express Shipping',
    desc: 'On all orders above ₹499 nationwide'
  },
  {
    icon: <CreditCard className="w-5 h-5 text-[#f76e28]" strokeWidth={2.2} />,
    title: 'Secure Payment',
    desc: '100% protected UPI & card checkout'
  },
  {
    icon: <RotateCcw className="w-5 h-5 text-[#f76e28]" strokeWidth={2.2} />,
    title: '7-Day Easy Returns',
    desc: 'Doorstep pickup & instant refunds'
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#f76e28]" strokeWidth={2.2} />,
    title: '100% Genuine Certified',
    desc: 'Direct verified merchant sourcing'
  }
];

export default function TrustGuarantee() {
  const { t } = useShop();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {PERKS.map((perk, idx) => (
          <div 
            key={idx} 
            className="group relative bg-gradient-to-br from-white via-white to-[#fffaf6] p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-stone-200/80 hover:border-orange-200/90 shadow-[0_4px_16px_-2px_rgba(28,25,23,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(247,110,40,0.12)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 flex items-center gap-3.5 cursor-default min-h-[82px] overflow-hidden"
          >
            {/* Subtle Tonal Ambient Glow on Hover */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-100/40 via-amber-100/20 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="w-11 h-11 rounded-2xl bg-[#fff0e6] ring-4 ring-[#fff7f0] border border-orange-200/60 flex items-center justify-center shrink-0 group-hover:scale-108 group-hover:bg-[#ffe5d3] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              {perk.icon}
            </div>
            <div className="text-left min-w-0 relative z-10">
              <h4 className="text-xs sm:text-[13.5px] font-extrabold text-stone-900 truncate tracking-tight group-hover:text-orange-950 transition-colors">
                {t(perk.title)}
              </h4>
              <p className="text-[10.5px] sm:text-[11px] text-stone-500 truncate mt-0.5 font-medium leading-tight">
                {t(perk.desc)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
