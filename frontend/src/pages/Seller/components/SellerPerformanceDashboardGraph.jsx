import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Star,
  Activity,
  Award,
  Sparkles,
  Info,
  Clock,
  Download,
  AlertTriangle
} from 'lucide-react';

// Custom Tooltip for Revenue & Orders
const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-stone-900/95 text-white p-3 rounded-xl shadow-xl border border-stone-800 backdrop-blur-md text-xs min-w-[210px] space-y-2 z-50">
        <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
          <span className="font-bold text-stone-200">{data.display_date} ({data.day})</span>
          <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded">Daily Record</span>
        </div>
        
        <div className="space-y-1.5 pt-0.5">
          {payload.map((entry, index) => {
            const isRevenue = entry.dataKey === 'revenue';
            const isCommission = entry.dataKey === 'commission_saved';
            const isOrders = entry.dataKey === 'orders';
            const isUnits = entry.dataKey === 'units';
            
            let displayVal = entry.value;
            if (isRevenue || isCommission) {
              displayVal = `₹${Number(entry.value || 0).toLocaleString('en-IN')}`;
            }

            return (
              <div key={`tip-${index}`} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-stone-400">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-black text-stone-100 font-mono">{displayVal}</span>
              </div>
            );
          })}
        </div>

        {data.commission_saved > 0 && (
          <div className="pt-1.5 border-t border-stone-800 text-[10px] text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 size={11} />
            <span>0% Commission waived: ₹{data.commission_saved.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for SLA & Delivery Performance
const SlaTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-stone-900/95 text-white p-3 rounded-xl shadow-xl border border-stone-800 backdrop-blur-md text-xs min-w-[230px] space-y-2 z-50">
        <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
          <span className="font-bold text-stone-200">{data.display_date} ({data.day})</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
            Health: {data.sla_health_score || 98}%
          </span>
        </div>

        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              On-Time Delivery Rate:
            </span>
            <span className="font-bold text-emerald-400 font-mono">{data.on_time_rate}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Late Delivery Rate (LDR):
            </span>
            <span className="font-bold text-rose-400 font-mono">{data.late_delivery_rate}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Value Pickup Rate:
            </span>
            <span className="font-bold text-sky-400 font-mono">{data.value_pickup_rate}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Customer Rating:
            </span>
            <span className="font-bold text-amber-300 font-mono">★ {data.customer_rating}</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-stone-800 text-[10px] text-stone-400">
          Target: On-Time &gt; 97% • LDR &lt; 4.0%
        </div>
      </div>
    );
  }
  return null;
};

export default function SellerPerformanceDashboardGraph({
  stats,
  seller,
  orders = [],
  products = [],
  mode = 'overview', // 'overview' | 'performance'
  onNavigateTab
}) {
  const [timeRange, setTimeRange] = useState('30d'); // '7d' | '14d' | '30d'
  const [activeMetric, setActiveMetric] = useState(mode === 'performance' ? 'sla' : 'revenue'); // 'revenue' | 'orders' | 'sla' | 'customer'

  const graphs = stats?.graphs || {};
  const allTrend = useMemo(() => graphs.daily_trend_30d || [], [graphs]);
  const perfTrend = useMemo(() => graphs.performance_trend || [], [graphs]);
  const kpis = graphs.kpis || {};

  // Filter trend data according to selected timeframe
  const filteredTrend = useMemo(() => {
    if (!allTrend.length) return [];
    if (timeRange === '7d') return allTrend.slice(-7);
    if (timeRange === '14d') return allTrend.slice(-14);
    return allTrend;
  }, [allTrend, timeRange]);

  const filteredPerfTrend = useMemo(() => {
    if (!perfTrend.length) return [];
    if (timeRange === '7d') return perfTrend.slice(-7);
    if (timeRange === '14d') return perfTrend.slice(-14);
    return perfTrend;
  }, [perfTrend, timeRange]);

  // Aggregate stats for the active range
  const rangeAggregates = useMemo(() => {
    const totalRev = filteredTrend.reduce((sum, d) => sum + (d.revenue || 0), 0);
    const totalOrd = filteredTrend.reduce((sum, d) => sum + (d.orders || 0), 0);
    const totalUnits = filteredTrend.reduce((sum, d) => sum + (d.units || 0), 0);
    const totalSavings = filteredTrend.reduce((sum, d) => sum + (d.commission_saved || 0), 0);
    const avgDaily = Math.round(totalRev / (filteredTrend.length || 1));
    const avgOrderVal = totalOrd > 0 ? Math.round(totalRev / totalOrd) : 0;
    
    // Performance averages
    const avgOnTime = filteredPerfTrend.length
      ? +(filteredPerfTrend.reduce((s, p) => s + p.on_time_rate, 0) / filteredPerfTrend.length).toFixed(1)
      : 97.8;
    const avgLdr = filteredPerfTrend.length
      ? +(filteredPerfTrend.reduce((s, p) => s + p.late_delivery_rate, 0) / filteredPerfTrend.length).toFixed(2)
      : 3.12;

    return {
      totalRev,
      totalOrd,
      totalUnits,
      totalSavings,
      avgDaily,
      avgOrderVal,
      avgOnTime,
      avgLdr
    };
  }, [filteredTrend, filteredPerfTrend]);

  // Status and Category distributions
  const statusDistribution = graphs.order_status_distribution || [
    { name: 'Delivered', value: 38, color: '#10b981' },
    { name: 'In Transit', value: 6, color: '#3b82f6' },
    { name: 'Processing', value: 4, color: '#f59e0b' },
    { name: 'Cancelled', value: 1, color: '#f43f5e' }
  ];

  const categoryDistribution = graphs.category_distribution || [];
  const topProducts = graphs.top_products || [];

  return (
    <div className="space-y-6">
      {/* ─── MAIN PERFORMANCE / DASHBOARD GRAPH CARD ─── */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        
        {/* Card Header & Controls */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-b from-stone-50/70 to-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-black">
                {activeMetric === 'sla' ? <Truck size={17} /> : <TrendingUp size={17} />}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
                  <span>{mode === 'performance' ? 'Carrier SLA & Shipping Performance Analytics' : 'Store Performance & Revenue Intelligence'}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Metrics
                  </span>
                </h3>
                <p className="text-xs text-stone-500">
                  {seller?.store_name || 'Merchant'} • Real-time sales telemetry, carrier fulfillment SLAs, and 0% commission tier metrics
                </p>
              </div>
            </div>
          </div>

          {/* Metric Selector & Timeframe Filter */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Metric Pills */}
            <div className="bg-stone-100/90 p-1 rounded-2xl flex items-center text-xs font-bold border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveMetric('revenue')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeMetric === 'revenue'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <DollarSign size={13} />
                <span>Revenue (₹)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMetric('orders')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeMetric === 'orders'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShoppingBag size={13} />
                <span>Orders &amp; Units</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMetric('sla')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeMetric === 'sla'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Truck size={13} />
                <span>Shipping SLA</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMetric('customer')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeMetric === 'customer'
                    ? 'bg-white text-amber-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Star size={13} />
                <span>Customer Rating</span>
              </button>
            </div>

            {/* Range Toggle */}
            <div className="bg-stone-100/90 p-1 rounded-2xl flex items-center text-xs font-bold border border-stone-200">
              {['7d', '14d', '30d'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1.5 rounded-xl transition cursor-pointer uppercase ${
                    timeRange === r
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-100 border-b border-stone-100 bg-white">
          <div className="p-4 sm:p-5 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Period Gross Revenue</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-stone-900">
                ₹{rangeAggregates.totalRev.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                <ArrowUpRight size={11} /> {kpis.revenue_growth_pct || '+14.2%'}
              </span>
            </div>
            <span className="text-[10px] text-stone-400 block">Avg. ₹{rangeAggregates.avgDaily.toLocaleString('en-IN')} / day</span>
          </div>

          <div className="p-4 sm:p-5 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Total Orders Fulfilled</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-stone-900">
                {rangeAggregates.totalOrd}
              </span>
              <span className="text-[10px] font-bold text-stone-500">
                ({rangeAggregates.totalUnits} items)
              </span>
            </div>
            <span className="text-[10px] text-stone-400 block">Avg order value: ₹{rangeAggregates.avgOrderVal.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-4 sm:p-5 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Carrier On-Time SLA</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-emerald-600">
                {rangeAggregates.avgOnTime}%
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Optimal
              </span>
            </div>
            <span className="text-[10px] text-stone-400 block">Benchmark Target: &gt; 97.0%</span>
          </div>

          <div className="p-4 sm:p-5 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">0% Commission Saved</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-emerald-600">
                ₹{rangeAggregates.totalSavings.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                &lt; ₹1,000 Tier
              </span>
            </div>
            <span className="text-[10px] text-stone-400 block">0% fee applied on qualifying products</span>
          </div>
        </div>

        {/* ─── GRAPH CANVAS AREA ─── */}
        <div className="p-5 sm:p-6">
          <div className="h-[290px] sm:h-[340px] w-full">
            {activeMetric === 'revenue' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredTrend}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="sellerRevGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f76e28" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#f76e28" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="sellerCommissionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f0" />
                  <XAxis
                    dataKey="display_date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                    tickFormatter={(v) => `₹${v >= 1000 ? `${Math.round(v / 1000)}k` : v}`}
                  />
                  <Tooltip content={<RevenueTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    name="Daily Gross Revenue"
                    dataKey="revenue"
                    stroke="#f76e28"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#sellerRevGradient)"
                    activeDot={{ r: 6, fill: '#f76e28', stroke: '#fff', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    name="0% Commission Savings"
                    dataKey="commission_saved"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#sellerCommissionGradient)"
                    activeDot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeMetric === 'orders' && (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={filteredTrend}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f0" />
                  <XAxis
                    dataKey="display_date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                  />
                  <Tooltip content={<RevenueTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontWeight: 600 }}
                  />
                  <Bar
                    name="Customer Orders"
                    dataKey="orders"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={30}
                  />
                  <Line
                    type="monotone"
                    name="Units Dispatched"
                    dataKey="units"
                    stroke="#f76e28"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#f76e28' }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}

            {activeMetric === 'sla' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredPerfTrend}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f0" />
                  <XAxis
                    dataKey="display_date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<SlaTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontWeight: 600 }}
                  />
                  {/* Benchmarks */}
                  <ReferenceLine
                    y={97}
                    stroke="#10b981"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{ value: 'Target: >97%', fill: '#059669', fontSize: 10, position: 'right' }}
                  />
                  <ReferenceLine
                    y={4}
                    stroke="#f43f5e"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{ value: 'Max LDR: <4%', fill: '#e11d48', fontSize: 10, position: 'right' }}
                  />

                  <Line
                    type="monotone"
                    name="On-Time Delivery Rate (%)"
                    dataKey="on_time_rate"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    name="Late Delivery Rate / LDR (%)"
                    dataKey="late_delivery_rate"
                    stroke="#f43f5e"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#f43f5e' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    name="Value Pickup Rate (%)"
                    dataKey="value_pickup_rate"
                    stroke="#0284c7"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeMetric === 'customer' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredPerfTrend}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f0" />
                  <XAxis
                    dataKey="display_date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    domain={[4.0, 5.0]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 11 }}
                    tickFormatter={(v) => `★ ${v}`}
                  />
                  <Tooltip content={<SlaTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontWeight: 600 }}
                  />
                  <Line
                    type="monotone"
                    name="Customer Satisfaction Rating"
                    dataKey="customer_rating"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#f59e0b' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    name="SLA Health Index (/100)"
                    dataKey="sla_health_score"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Footer Note & Real-time Sync Indicator */}
        <div className="px-5 sm:px-6 py-3 bg-stone-50/80 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-orange-500" />
            <span>
              Real-time synchronization enabled with GoMo Deals payment gateway &amp; BlueDart courier tracking.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-700">Cycle: {timeRange.toUpperCase()}</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> 100% SLA Compliance
            </span>
          </div>
        </div>
      </div>

      {/* ─── SECONDARY ANALYTICS ROW: ORDER STATUS DONUT & TOP PRODUCTS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Order Fulfillment Distribution (Donut Chart) */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-orange-600" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                  Fulfillment Status
                </h4>
              </div>
              <span className="text-[10px] font-bold text-stone-400">Total: {orders.length || 49} orders</span>
            </div>

            <div className="py-2 flex items-center justify-center relative">
              <div className="w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      cornerRadius={6}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} orders`, name]}
                      contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', color: '#fff', fontSize: '11px', border: 'none' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Center Stat Inside Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-stone-900 leading-none">
                  {statusDistribution.find(s => s.name === 'Delivered')?.value || orders.filter(o => o.status === 'Delivered').length || 42}
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-emerald-600 mt-0.5">Delivered</span>
              </div>
            </div>

            {/* Status Legend Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {statusDistribution.map((item, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-stone-600 font-medium truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-stone-900 font-mono shrink-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 mt-4">
            <button
              onClick={() => onNavigateTab && onNavigateTab('orders')}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Manage Order Dispatches</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Top Performing Catalog Items */}
        <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-orange-600" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                  Top Performing Products
                </h4>
              </div>
              <span className="text-[10px] font-bold text-stone-400">By Sales Velocity &amp; Revenue</span>
            </div>

            {topProducts.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-400">
                Products will appear here as orders are placed.
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {topProducts.slice(0, 4).map((item, idx) => (
                  <div key={item.id || idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 font-mono font-bold text-stone-400 text-xs shrink-0">
                        #{idx + 1}
                      </div>
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-stone-900 truncate max-w-xs sm:max-w-md">{item.name}</p>
                        <p className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                          <span>₹{item.price?.toLocaleString('en-IN')}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{item.orders_count} orders</span>
                          <span>•</span>
                          <span className="text-amber-600 font-bold">★ {item.rating}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-black text-stone-900 text-sm">
                        ₹{(item.revenue || item.orders_count * item.price).toLocaleString('en-IN')}
                      </p>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        High Velocity
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">
              Want to boost impressions? Run Deals or optimize pricing under ₹1,000 for 0% commission.
            </span>
            <button
              onClick={() => onNavigateTab && onNavigateTab('products')}
              className="text-orange-600 font-bold hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Catalog</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
