import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X, Sparkles } from 'lucide-react';
import { realtimeService } from '../../services/realtimeService';

export default function LivePurchaseTicker() {
  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = realtimeService.on('live_purchase', (data) => {
      setAlert(data);
      setVisible(true);

      // Auto dismiss after 6 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 6000);

      return () => clearTimeout(timer);
    });

    return unsub;
  }, []);

  if (!alert || !visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-3.5 flex items-center gap-3.5 transition-all duration-300 animate-in slide-in-from-bottom-5">
      <div className="relative shrink-0">
        <img
          src={alert.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80'}
          alt={alert.productName}
          className="w-12 h-12 object-cover rounded-xl border border-stone-100 dark:border-stone-700"
        />
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
          <CheckCircle className="w-2.5 h-2.5" />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Verified Order from {alert.city}</span>
          <span className="text-stone-400 font-normal">• {alert.timeAgo || 'Just now'}</span>
        </div>
        <p className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate mt-0.5">
          {alert.productName}
        </p>
        <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400 flex items-center gap-2 mt-0.5">
          <span className="text-orange-600 font-bold">₹{alert.price?.toLocaleString('en-IN')}</span>
          <span className="text-[10px] bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded font-semibold border border-orange-200/50">
            Real-Time Deal
          </span>
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="shrink-0 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
        aria-label="Dismiss alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
