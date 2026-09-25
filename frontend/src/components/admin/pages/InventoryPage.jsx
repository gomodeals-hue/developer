import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, AlertTriangle, CheckCircle2, XCircle, Search, 
  RefreshCw, Plus, Minus, History, Download, Layers, ShieldAlert, Edit, X, ArrowUpDown
} from 'lucide-react';
import { inventoryService } from '../../../services/inventoryService';
import { useToast } from '../../../hooks/use-toast';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import { exportToExcel } from '../../../utils/exportUtils';
import { StatCard } from '../components/StatCard';

export default function InventoryPage() {
  const [catalogData, setCatalogData] = useState({ summary: {}, items: [] });
  const [historyLogs, setHistoryLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Low Stock' | 'Out of Stock' | 'In Stock'
  
  // Modals state
  const [adjustModal, setAdjustModal] = useState({ open: false, item: null, variantId: null, delta: 0, reason: 'Restock' });
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const [catRes, histRes] = await Promise.all([
        inventoryService.getInventoryCatalog(),
        inventoryService.getInventoryHistory()
      ]);

      if (catRes.success) {
        setCatalogData(catRes.data);
      }
      if (histRes.success) {
        setHistoryLogs(histRes.data);
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to load inventory data.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustSubmit = async (e) => {
    e.preventDefault();
    if (!adjustModal.item) return;

    setUpdating(true);
    try {
      const res = await inventoryService.adjustStock({
        productId: adjustModal.item.id || adjustModal.item.product_id,
        variantId: adjustModal.variantId,
        delta: Number(adjustModal.delta),
        reason: adjustModal.reason || 'Manual Adjustment',
        performedBy: 'Administrator'
      });

      if (res.success) {
        toast({ 
          title: 'Stock Adjusted', 
          description: `Stock for ${adjustModal.item.name} updated to ${res.data.newStock} units.` 
        });
        setAdjustModal({ open: false, item: null, variantId: null, delta: 0, reason: 'Restock' });
        fetchInventory();
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to adjust stock.', variant: 'destructive' });
    } finally {
      setUpdating(false);
    }
  };

  const handleExport = () => {
    try {
      const rows = catalogData.items.map(p => ({
        'SKU': p.sku,
        'Product Name': p.name,
        'Category': p.category,
        'Price': `INR ${p.price}`,
        'Stock Level': p.stock_quantity,
        'Low Stock Threshold': p.low_stock_threshold,
        'Inventory Status': p.status,
        'Valuation': `INR ${p.price * p.stock_quantity}`
      }));
      exportToExcel(rows, `GoMo_Inventory_Audit_${new Date().toISOString().split('T')[0]}`);
      toast({ title: 'Audit Exported', description: 'Inventory spreadsheet downloaded successfully.' });
    } catch (err) {
      toast({ title: 'Export Failed', description: 'Could not export excel spreadsheet.', variant: 'destructive' });
    }
  };

  const filteredItems = useMemo(() => {
    return (catalogData.items || []).filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        statusFilter === 'All' ? true :
        statusFilter === 'Low Stock' ? item.stock_quantity > 0 && item.stock_quantity <= item.low_stock_threshold :
        statusFilter === 'Out of Stock' ? item.stock_quantity <= 0 :
        item.stock_quantity > item.low_stock_threshold;

      return matchesSearch && matchesFilter;
    });
  }, [catalogData.items, searchTerm, statusFilter]);

  const summary = catalogData.summary || {};

  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-orange-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <ShieldAlert size={14} className="text-orange-600" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-black">
              Boutique Stock Control
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-orange-955 tracking-tight">Inventory Management</h1>
          <p className="text-[11px] text-orange-500 uppercase tracking-[0.2em] max-w-xl">
            Live stock quantities, depletion thresholds, variant allotments, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHistoryDrawerOpen(true)}
            className="px-6 py-3 bg-white text-orange-955 border border-orange-200 hover:bg-orange-50 text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-2 shadow-sm rounded-xl cursor-pointer"
          >
            <History size={15} /> Audit Log ({historyLogs.length})
          </button>
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-orange-955 text-white hover:bg-orange-850 text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-2 shadow-xl rounded-xl cursor-pointer"
          >
            <Download size={15} /> Export Audit
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Stock Valuation"
          value={`₹${Number(summary.totalInventoryValuation || 0).toLocaleString('en-IN')}`}
          todayValue="Current Asset Value"
          icon={Layers}
        />
        <StatCard
          title="In Stock SKUs"
          value={summary.inStockCount || 0}
          todayValue="Optimal Level"
          changeType="positive"
          icon={CheckCircle2}
        />
        <StatCard
          title="Low Stock Warning"
          value={summary.lowStockCount || 0}
          todayValue="Below Threshold"
          changeType="neutral"
          icon={AlertTriangle}
        />
        <StatCard
          title="Out of Stock"
          value={summary.outOfStockCount || 0}
          todayValue="Immediate Restock"
          changeType="negative"
          icon={XCircle}
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
          <input
            type="text"
            placeholder="Search by SKU, item name, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-11 pr-4 border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-orange-955 text-xs font-bold rounded-xl focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
                statusFilter === f
                  ? "bg-orange-955 text-white shadow-sm"
                  : "bg-orange-50 text-orange-900 hover:bg-orange-100"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-orange-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-orange-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-orange-955 tracking-tight">Stock Directory</h3>
            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-0.5">
              Showing {filteredItems.length} Products
            </p>
          </div>
          <Button
            onClick={fetchInventory}
            variant="outline"
            className="border-orange-200 text-orange-955 hover:bg-orange-50 text-xs font-bold"
          >
            <RefreshCw size={14} className="mr-1.5" /> Refresh
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-orange-100 bg-orange-50/50">
                <th className="px-8 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">SKU & Product</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-right">Price</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-center">Available Stock</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-center">Threshold</th>
                <th className="px-6 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[9px] font-bold text-orange-600 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 text-stone-800">
              {filteredItems.map(p => {
                const hasVariants = p.variants && p.variants.length > 0;
                return (
                  <tr key={p.id} className="hover:bg-orange-50/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-orange-100 bg-stone-50"
                        />
                        <div>
                          <p className="text-sm font-bold text-orange-955">{p.name}</p>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                            SKU: <span className="text-stone-700">{p.sku}</span>
                            {hasVariants && (
                              <span className="ml-2 text-orange-600">({p.variants.length} Variants)</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-800 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-orange-955">
                      ₹{Number(p.price).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={cn(
                        "text-base font-black px-3 py-1 rounded-xl border inline-block",
                        p.stock_quantity <= 0 ? "bg-rose-50 text-rose-700 border-rose-200" :
                        p.stock_quantity <= p.low_stock_threshold ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-emerald-50 text-emerald-700 border-emerald-200"
                      )}>
                        {p.stock_quantity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center text-xs font-bold text-stone-500">
                      {p.low_stock_threshold} units
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border",
                        p.status === 'In Stock' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        p.status === 'Low Stock' ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-rose-50 text-rose-700 border-rose-200"
                      )}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Button
                        onClick={() => setAdjustModal({ open: true, item: p, variantId: null, delta: 10, reason: 'Restock' })}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl h-9 px-4 shadow-sm cursor-pointer"
                      >
                        Adjust Stock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustModal.open && adjustModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-6">
            <div className="flex items-center justify-between border-b border-orange-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-orange-955">Adjust Inventory</h3>
                <p className="text-xs text-stone-500">{adjustModal.item.name}</p>
              </div>
              <button onClick={() => setAdjustModal({ open: false, item: null, variantId: null, delta: 0, reason: 'Restock' })}>
                <X size={18} className="text-stone-400 hover:text-stone-700" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Current Stock
                </label>
                <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100 text-base font-black text-orange-955">
                  {adjustModal.item.stock_quantity} Units Available
                </div>
              </div>

              {/* Variant Selector if applicable */}
              {adjustModal.item.variants && adjustModal.item.variants.length > 0 && (
                <div>
                  <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                    Apply to Variant (Optional)
                  </label>
                  <select
                    value={adjustModal.variantId || ''}
                    onChange={(e) => setAdjustModal({ ...adjustModal, variantId: e.target.value || null })}
                    className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none"
                  >
                    <option value="">All / Main Product</option>
                    {adjustModal.item.variants.map((v, idx) => (
                      <option key={idx} value={v.variant_id || v.tempId || v.id}>
                        {v.name || v.variant_name || 'Size'}: {v.value || v.variant_value} (Current: {v.stock_quantity || v.stock || 0})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Stock Delta Adjustment (+ / -)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdjustModal(prev => ({ ...prev, delta: Number(prev.delta) - 5 }))}
                    className="w-10 h-10 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-955 font-black text-base flex items-center justify-center cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={adjustModal.delta}
                    onChange={(e) => setAdjustModal({ ...adjustModal, delta: e.target.value })}
                    className="flex-1 h-11 px-4 text-center rounded-xl border border-orange-200 focus:border-orange-500 text-base font-black text-stone-900"
                    placeholder="+10 or -5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setAdjustModal(prev => ({ ...prev, delta: Number(prev.delta) + 5 }))}
                    className="w-10 h-10 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-955 font-black text-base flex items-center justify-center cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-[9px] text-stone-500 mt-1 uppercase tracking-wider font-bold text-center">
                  Resulting Stock: {Math.max(0, adjustModal.item.stock_quantity + Number(adjustModal.delta))} Units
                </p>
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Adjustment Reason
                </label>
                <select
                  value={adjustModal.reason}
                  onChange={(e) => setAdjustModal({ ...adjustModal, reason: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900"
                >
                  <option value="Restock">Restock from Supplier</option>
                  <option value="Damaged Stock">Damaged / Write-off</option>
                  <option value="Customer Return">Customer Return Restock</option>
                  <option value="Physical Audit">Physical Warehouse Audit</option>
                  <option value="Promotion Reserved">Promotional Reserve</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-orange-100">
                <Button
                  type="button"
                  onClick={() => setAdjustModal({ open: false, item: null, variantId: null, delta: 0, reason: 'Restock' })}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs px-5 py-2 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updating}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-2 rounded-xl shadow-md cursor-pointer"
                >
                  {updating ? 'Updating...' : 'Save Stock'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inventory Audit History Drawer */}
      {historyDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-orange-100 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-orange-955">Inventory Audit Ledger</h3>
                  <p className="text-xs text-stone-500">Chronological ledger of all stock modifications</p>
                </div>
                <button 
                  onClick={() => setHistoryDrawerOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full text-stone-500"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {historyLogs.map(log => (
                  <div key={log.id} className="p-4 rounded-2xl border border-orange-100 bg-orange-50/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-orange-955">{log.product_name}</span>
                      <span className={cn(
                        "text-xs font-black px-2 py-0.5 rounded-md",
                        log.delta > 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                      )}>
                        {log.delta > 0 ? `+${log.delta}` : log.delta}
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-600">
                      Reason: <span className="font-bold text-stone-800">{log.reason}</span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-stone-400 font-bold uppercase tracking-wider pt-1 border-t border-orange-100/60">
                      <span>Stock: {log.previous_stock} → {log.new_stock}</span>
                      <span>{new Date(log.timestamp).toLocaleDateString()} by {log.performed_by}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setHistoryDrawerOpen(false)}
              className="mt-6 w-full bg-orange-955 text-white font-bold text-xs py-3 rounded-xl"
            >
              Close Ledger
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
