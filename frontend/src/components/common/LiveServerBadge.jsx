import React, { useState } from 'react';
import { useRealtime } from '../../hooks/useRealtime';
import { Activity, Wifi, CheckCircle2, RefreshCw } from 'lucide-react';

export default function LiveServerBadge() {
  const { isConnected, latency } = useRealtime();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
          isConnected
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}
        title="Live Server Connection Status"
      >
        <span className="relative flex h-2 w-2">
          {isConnected && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isConnected ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
            }`}
          ></span>
        </span>
        <span className="font-semibold tracking-wide">
          {isConnected ? 'Real-Time Sync' : 'Reconnecting...'}
        </span>
        {isConnected && latency > 0 && (
          <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-mono">
            {latency}ms
          </span>
        )}
      </button>

      {showDetails && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 p-3 z-50 text-xs text-stone-700 dark:text-stone-300 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 font-bold">
            <span className="flex items-center gap-1.5 text-stone-900 dark:text-white">
              <Activity className="w-3.5 h-3.5 text-orange-600" />
              Backend Connection
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
              v2.0 Real-Time
            </span>
          </div>

          <div className="mt-2.5 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-stone-500">Protocol:</span>
              <span className="font-semibold">HTTP/2 + SSE Stream</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Live Inventory:</span>
              <span className="font-semibold text-emerald-600">Active Broadcast</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Order Tracking:</span>
              <span className="font-semibold text-emerald-600">Real-Time Radar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Latency:</span>
              <span className="font-mono text-emerald-600 font-bold">{latency} ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
