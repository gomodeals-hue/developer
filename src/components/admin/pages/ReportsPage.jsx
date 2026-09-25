import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, IndianRupee, ShoppingBag, 
  Users, Layers, Download, Calendar, RefreshCw, ArrowUpRight
} from 'lucide-react';
import { api } from '../../../services/api';
import { useToast } from '../../../hooks/use-toast';
import { Button } from '../../ui/button';
import { StatCard } from '../components/StatCard';
import { exportToExcel } from '../../../utils/exportUtils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const CHART_COLORS = ['#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#fdba74'];

export default function ReportsPage() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, [timeRange]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/business-reports');
      if (res.data.success) {
        setReports(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to generate business reports', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleExportAll = () => {
    if (!reports) return;
    try {
      const revenueData = [{
        'Gross Revenue': `INR ${reports.revenue.grossRevenue}`,
        'Net Revenue': `INR ${reports.revenue.netRevenue}`,
        'Refunded Amount': `INR ${reports.revenue.refundedRevenue}`,
        'Average Order Value': `INR ${reports.revenue.avgOrderValue}`
      }];

      const topProductsData = (reports.products.topSellingProducts || []).map(p => ({
        'Product Name': p.name,
        'Units Sold': p.units_sold,
        'Total Revenue Generated': `INR ${p.revenue}`
      }));

      const categoryData = (reports.inventory.categoryBreakdown || []).map(c => ({
        'Category': c.category,
        'Total SKUs': c.skus,
        'Inventory Value': `INR ${c.stockValue}`
      }));

      const exportBundle = {
        'Financial Overview': revenueData,
        'Top Selling Products': topProductsData,
        'Inventory by Department': categoryData
      };

      exportToExcel(exportBundle, `GoMo_Executive_Report_${new Date().toISOString().split('T')[0]}`);
      toast({ title: 'Report Downloaded', description: 'Executive report exported to Excel.' });
    } catch (err) {
      toast({ title: 'Export Error', description: 'Could not create Excel report.', variant: 'destructive' });
    }
  };

  if (loading || !reports) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest text-orange-600 font-bold">Compiling Dynamic Business Reports...</p>
      </div>
    );
  }

  const { revenue, orders, products, inventory, customers } = reports;

  const ordersPieData = Object.entries(orders.ordersByStatus || {}).map(([key, value]) => ({
    name: key,
    value: Number(value)
  })).filter(x => x.value > 0);

  const categoryBarData = (inventory.categoryBreakdown || []).map(c => ({
    category: c.category,
    value: c.stockValue
  }));

  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-orange-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <BarChart3 size={14} className="text-orange-600" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-black">
              Executive Intelligence
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-orange-955 tracking-tight">Business Reports</h1>
          <p className="text-[11px] text-orange-500 uppercase tracking-[0.2em] max-w-xl">
            Real-time calculations for store revenues, fulfillment rates, top products, customers, and inventory valuations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchReports}
            variant="outline"
            className="border-orange-200 text-orange-955 hover:bg-orange-50 text-xs font-bold rounded-xl h-11 px-5"
          >
            <RefreshCw size={14} className="mr-1.5" /> Recompute
          </Button>
          <Button
            onClick={handleExportAll}
            className="bg-orange-955 hover:bg-orange-850 text-white font-bold text-xs uppercase tracking-wider h-11 px-6 rounded-xl flex items-center gap-2 shadow-xl"
          >
            <Download size={14} /> Export Executive Deck
          </Button>
        </div>
      </div>

      {/* 5 Core Business Pillar KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Gross Sales"
          value={`₹${revenue.grossRevenue.toLocaleString('en-IN')}`}
          todayValue={`AOV: ₹${revenue.avgOrderValue.toLocaleString('en-IN')}`}
          icon={IndianRupee}
        />
        <StatCard
          title="Total Orders"
          value={orders.totalOrders}
          todayValue={`${orders.fulfillmentRate}% Fulfilled`}
          changeType="positive"
          icon={ShoppingBag}
        />
        <StatCard
          title="Catalog SKUs"
          value={products.totalSKUs}
          todayValue={`${products.totalUnitsSold} Units Sold`}
          icon={Layers}
        />
        <StatCard
          title="Stock Assets"
          value={`₹${Math.round(inventory.totalInventoryValuation / 1000)}k`}
          todayValue={`${inventory.inStockSKUs} Optimal SKUs`}
          icon={TrendingUp}
        />
        <StatCard
          title="Customer Base"
          value={customers.totalCustomers}
          todayValue={`${customers.repeatRate}% Repeat Rate`}
          changeType="positive"
          icon={Users}
        />
      </div>

      {/* Reports Deep Dives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pillar 1: Order Status Distribution */}
        <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-orange-955 tracking-tight">Order Fulfillment Pipeline</h3>
            <p className="text-xs text-stone-500">Live order breakdown by current operational status</p>
          </div>

          <div className="h-64 flex items-center justify-center">
            {ordersPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersPieData}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={6}
                    dataKey="value"
                  >
                    {ordersPieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-stone-400">No order data recorded yet.</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-orange-100">
            {ordersPieData.map((item, i) => (
              <div key={item.name} className="p-3 bg-orange-50/40 rounded-xl border border-orange-100">
                <p className="text-xs font-bold text-stone-500">{item.name}</p>
                <p className="text-base font-black text-orange-955 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: Top Selling Products */}
        <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-orange-955 tracking-tight">Top Grossing Products</h3>
            <p className="text-xs text-stone-500">Ranked by actual mock order receipts</p>
          </div>

          <div className="space-y-4">
            {(products.topSellingProducts || []).map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-orange-50/30 rounded-2xl border border-orange-100 hover:border-orange-300 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-955 text-white text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-orange-955 truncate max-w-xs">{p.name}</h4>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{p.units_sold} Units Sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-orange-955">₹{Number(p.revenue).toLocaleString('en-IN')}</p>
                  <span className="text-[9px] font-bold text-emerald-600">Revenue</span>
                </div>
              </div>
            ))}
            {(!products.topSellingProducts || products.topSellingProducts.length === 0) && (
              <p className="text-xs text-stone-400 text-center py-12">No product transactions recorded.</p>
            )}
          </div>
        </div>
      </div>

      {/* Pillar 3 & 4: Department Inventory Valuation & Health */}
      <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-orange-955 tracking-tight">Department Valuation Matrix</h3>
            <p className="text-xs text-stone-500">Inventory capital tied up across store departments</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-stone-500">
            <span>Total Valuation:</span>
            <span className="text-sm font-black text-orange-955">
              ₹{inventory.totalInventoryValuation.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryBarData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fed7aa" />
              <XAxis dataKey="category" tick={{ fill: '#7c2d12', fontSize: 10, fontWeight: 700 }} />
              <YAxis tick={{ fill: '#7c2d12', fontSize: 10, fontWeight: 700 }} />
              <Tooltip formatter={(val) => `₹${Number(val).toLocaleString('en-IN')}`} />
              <Bar dataKey="value" fill="#ea580c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
