import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative rounded-3xl bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
        
        {/* Decorative circle glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
            <Mail size={12} />
            <span>GoMo Insiders Club</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Get ₹500 Off Your First Order
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            Subscribe for exclusive insider coupon drops, flash sales alerts, and weekly handpicked artisan deals.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-white text-sm font-bold animate-fade-in">
              <Check size={18} className="text-emerald-300" />
              <span>Thank you! Your coupon code WELCOME500 has been activated.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-3.5 rounded-full text-stone-900 bg-white placeholder:text-stone-400 text-sm focus:outline-none focus:ring-4 focus:ring-white/30 shadow-md font-medium"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-950 text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-orange-200">
            <ShieldCheck size={13} />
            <span>No spam guaranteed. Unsubscribe at any time.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
