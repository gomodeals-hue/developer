import React from 'react';
import { 
  PackageCheck, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  CheckCheck, 
  XCircle, 
  RotateCcw, 
  IndianRupee,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { getOrderTimeline } from '../../services/orderService';
import { useShop } from '../../context/ShopContext';

const OrderTimeline = ({ orderStatus, timestamps = {}, metadata = {} }) => {
  const { t } = useShop();
  const stages = getOrderTimeline(orderStatus, timestamps, metadata);

  const getStageIcon = (id, status) => {
    switch (id) {
      case 'placed':
        return <PackageCheck size={16} strokeWidth={2} />;
      case 'confirmed':
        return <CheckCircle2 size={16} strokeWidth={2} />;
      case 'processing':
        return <Clock size={16} strokeWidth={2} />;
      case 'shipped':
        return <Truck size={16} strokeWidth={2} />;
      case 'out_for_delivery':
        return <MapPin size={16} strokeWidth={2} />;
      case 'delivered':
        return <CheckCheck size={16} strokeWidth={2.5} />;
      case 'cancelled':
        return <XCircle size={16} strokeWidth={2} />;
      case 'return_requested':
        return <RotateCcw size={16} strokeWidth={2} />;
      case 'returned':
        return <RotateCcw size={16} strokeWidth={2} />;
      case 'refunded':
        return <IndianRupee size={16} strokeWidth={2} />;
      default:
        return <Clock size={16} strokeWidth={2} />;
    }
  };

  const isCancelled = orderStatus === 'Cancelled';
  const isReturnFlow = ['Return Requested', 'Returned', 'Refunded'].includes(orderStatus);

  return (
    <div className="space-y-6">
      {/* Current State Header Banner */}
      <div className={`p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isCancelled 
          ? "bg-rose-50/70 border-rose-200 text-rose-900" 
          : isReturnFlow 
          ? "bg-amber-50/70 border-amber-200 text-amber-950" 
          : orderStatus === 'Delivered'
          ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
          : "bg-orange-50/70 border-orange-200 text-orange-950"
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
            isCancelled ? "bg-rose-600" : isReturnFlow ? "bg-amber-600" : orderStatus === 'Delivered' ? "bg-emerald-600" : "bg-orange-600"
          }`} />
          <span className="text-[10px] uppercase tracking-[0.25em] font-black">
            {t("Order Tracking Status:")} <span className="font-bold underline ml-1">{orderStatus}</span>
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-orange-900/60 font-mono font-bold">
          {timestamps.estimated_delivery && orderStatus !== 'Delivered' && orderStatus !== 'Cancelled'
            ? `${t("Est Delivery:")} ${new Date(timestamps.estimated_delivery).toLocaleDateString()}`
            : timestamps.created_at
            ? `${t("Ordered on:")} ${new Date(timestamps.created_at).toLocaleDateString()}`
            : ""}
        </span>
      </div>

      {/* Cancellation Notice if applicable */}
      {isCancelled && metadata.cancel_reason && (
        <div className="p-4 bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs">
          <AlertTriangle size={18} className="shrink-0 text-rose-600 mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-wider text-[10px]">Cancellation Reason:</p>
            <p className="mt-0.5 font-light">{metadata.cancel_reason}</p>
            {timestamps.cancelled_at && (
              <p className="text-[9px] text-rose-500 font-mono mt-1">
                Recorded on {new Date(timestamps.cancelled_at).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step Progress Line */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-orange-100">
        {stages.map((stage, idx) => {
          const isDone = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isFailed = stage.status === 'cancelled';

          return (
            <div key={stage.id} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Marker Icon */}
              <div className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm z-10 ${
                isFailed
                  ? "bg-rose-600 border-rose-600 text-white ring-4 ring-rose-100"
                  : isDone
                  ? "bg-orange-955 border-orange-955 text-white shadow-orange-955/20"
                  : isCurrent
                  ? "bg-white border-orange-955 text-orange-955 ring-4 ring-orange-100 animate-pulse"
                  : "bg-white border-orange-200 text-orange-300"
              }`}>
                {getStageIcon(stage.id, stage.status)}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className={`text-xs font-serif italic font-bold tracking-wide ${
                    isFailed 
                      ? "text-rose-700" 
                      : isDone || isCurrent 
                      ? "text-orange-950" 
                      : "text-orange-400"
                  }`}>
                    {t(stage.title)}
                  </h4>
                  <span className={`text-[9px] font-mono tracking-wider ${
                    isCurrent ? "text-orange-600 font-bold" : "text-orange-400"
                  }`}>
                    {stage.timestamp}
                  </span>
                </div>
                <p className={`text-[10px] mt-0.5 leading-relaxed font-light ${
                  isDone || isCurrent ? "text-orange-850/80" : "text-orange-300"
                }`}>
                  {t(stage.description)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
