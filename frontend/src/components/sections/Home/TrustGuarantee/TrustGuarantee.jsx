import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Award, Headphones } from 'lucide-react';

const PERKS = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    title: '100% Genuine Products',
    desc: 'Direct sourcing from verified merchants and artisan collectives.'
  },
  {
    icon: <Truck className="w-6 h-6 text-orange-600" />,
    title: 'Express All-India Delivery',
    desc: 'Fast, trackable shipping to over 19,000+ pin codes nationwide.'
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-sky-600" />,
    title: '7-Day Easy Returns',
    desc: 'Hassle-free doorstep pickup with immediate refund processing.'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-purple-600" />,
    title: 'Bank-Grade Payment Security',
    desc: '256-bit encrypted checkout supporting UPI, Cards, NetBanking & COD.'
  }
];

export default function TrustGuarantee() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-stone-50 border border-stone-200/80 rounded-3xl p-6 sm:p-8 lg:p-10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-600 block mb-1">
            Buyer Protection Guarantee
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            Why Millions Trust GoMo Deals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((perk, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-xs hover:shadow-md transition-shadow flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {perk.icon}
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-1">
                {perk.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
