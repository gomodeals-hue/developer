import React, { useState, useEffect } from 'react';
import { 
  Home, Image as ImageIcon, Star, Tag, Flame, Plus, 
  Trash2, Edit, Check, X, Eye, ExternalLink, RefreshCw, Save
} from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { api } from '../../../services/api';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import ConfirmModal from '../../common/ConfirmModal';

export default function HomepageManagementPage() {
  const [activeTab, setActiveTab] = useState('banners'); // 'banners' | 'promotions' | 'featured'
  const [banners, setBanners] = useState([]);
  const [homepageConfig, setHomepageConfig] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deleteBannerId, setDeleteBannerId] = useState(null);
  const { toast } = useToast();

  const [bannerForm, setBannerForm] = useState({
    brand_name: '',
    title: '',
    image_url: '',
    target_url: '/deals',
    badge: 'Limited Offer',
    is_active: true,
    start_date: '2026-01-01T00:00:00.000Z',
    end_date: '2026-12-31T23:59:59.000Z'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bannersRes, configRes, productsRes] = await Promise.all([
        api.get('/ad-banners/admin'),
        api.get('/admin/homepage-config'),
        api.get('/admin/products')
      ]);

      if (bannersRes.data.success) {
        setBanners(bannersRes.data.banners || bannersRes.data.data || []);
      }
      if (configRes.data.success) {
        setHomepageConfig(configRes.data.data);
      }
      if (productsRes.data.success) {
        setProducts(productsRes.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to load homepage management data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBannerModal = (b = null) => {
    if (b) {
      setEditingBanner(b);
      setBannerForm({
        banner_id: b.banner_id,
        brand_name: b.brand_name || '',
        title: b.title || '',
        image_url: b.image_url || '',
        target_url: b.target_url || '/deals',
        badge: b.badge || 'Limited Offer',
        is_active: b.is_active !== undefined ? b.is_active : true,
        start_date: b.start_date || '2026-01-01T00:00:00.000Z',
        end_date: b.end_date || '2026-12-31T23:59:59.000Z'
      });
    } else {
      setEditingBanner(null);
      setBannerForm({
        brand_name: '',
        title: '',
        image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80',
        target_url: '/deals',
        badge: 'Limited Offer',
        is_active: true,
        start_date: '2026-01-01T00:00:00.000Z',
        end_date: '2026-12-31T23:59:59.000Z'
      });
    }
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/ad-banners/admin', bannerForm);
      if (res.data.success) {
        toast({ title: 'Success', description: 'Hero banner saved successfully.' });
        fetchData();
        setIsBannerModalOpen(false);
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to save banner', variant: 'destructive' });
    }
  };

  const handleDeleteBanner = async () => {
    if (!deleteBannerId) return;
    try {
      const res = await api.delete(`/ad-banners/${deleteBannerId}`);
      if (res.data.success) {
        toast({ title: 'Deleted', description: 'Banner removed successfully.' });
        setBanners(prev => prev.filter(b => b.banner_id !== deleteBannerId));
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete banner', variant: 'destructive' });
    } finally {
      setDeleteBannerId(null);
    }
  };

  const handleToggleBanner = async (b) => {
    try {
      const updated = { ...b, is_active: !b.is_active };
      const res = await api.post('/ad-banners/admin', updated);
      if (res.data.success) {
        toast({ title: 'Status Updated', description: `Banner is now ${updated.is_active ? 'Active' : 'Inactive'}` });
        setBanners(prev => prev.map(x => x.banner_id === b.banner_id ? updated : x));
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to toggle banner', variant: 'destructive' });
    }
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const res = await api.post('/admin/homepage-config', homepageConfig);
      if (res.data.success) {
        toast({ title: 'Settings Saved', description: 'Homepage showcase and deals updated.' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update homepage settings', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const toggleFeaturedProduct = (productId) => {
    const current = homepageConfig?.featuredProductIds || [];
    let updated;
    if (current.includes(productId)) {
      updated = current.filter(id => id !== productId);
    } else {
      updated = [...current, productId];
    }
    setHomepageConfig(prev => ({
      ...prev,
      featuredProductIds: updated
    }));
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Home className="h-5 w-5 text-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Store Frontline</span>
          </div>
          <h1 className="text-3xl font-extrabold text-orange-955 tracking-tight">Homepage Management</h1>
          <p className="text-xs text-stone-500 font-medium">Control hero promo banners, deal tickers, flash sales, and featured boutique showcases.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleOpenBannerModal()}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Banner
          </Button>
          <Button
            onClick={handleSaveConfig}
            disabled={saving}
            className="bg-orange-955 hover:bg-orange-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Showcase'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-orange-100 pb-1">
        {[
          { id: 'banners', label: 'Hero Banners', icon: ImageIcon },
          { id: 'promotions', label: 'Announcements & Deals', icon: Flame },
          { id: 'featured', label: 'Featured Products', icon: Star }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer",
              activeTab === tab.id
                ? "bg-orange-600 text-white shadow-sm"
                : "text-stone-600 hover:text-orange-600 hover:bg-orange-50"
            )}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Hero Banners */}
      {activeTab === 'banners' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div 
                key={b.banner_id}
                className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="h-48 relative overflow-hidden bg-stone-100">
                  <img 
                    src={b.image_url} 
                    alt={b.title || b.brand_name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Status */}
                  <div className="absolute top-3 left-3">
                    <button
                      onClick={() => handleToggleBanner(b)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer backdrop-blur-md",
                        b.is_active 
                          ? "bg-emerald-500/90 text-white hover:bg-emerald-600" 
                          : "bg-rose-500/90 text-white hover:bg-rose-600"
                      )}
                    >
                      {b.is_active ? <Check size={10} /> : <X size={10} />}
                      {b.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenBannerModal(b)}
                      className="p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-orange-600 rounded-xl shadow backdrop-blur transition-all cursor-pointer"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteBannerId(b.banner_id)}
                      className="p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-rose-600 rounded-xl shadow backdrop-blur transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2 py-0.5 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest rounded-md inline-block mb-1">
                      {b.badge || 'Banner'}
                    </span>
                    <h3 className="text-lg font-black tracking-tight leading-tight">{b.title || b.brand_name}</h3>
                    <p className="text-[10px] text-orange-200 mt-0.5">Target: {b.target_url}</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50/30 flex items-center justify-between text-xs text-stone-500">
                  <span>Start: {b.start_date ? new Date(b.start_date).toLocaleDateString() : 'Active'}</span>
                  <span>End: {b.end_date ? new Date(b.end_date).toLocaleDateString() : 'Ongoing'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Promotions & Deals */}
      {activeTab === 'promotions' && homepageConfig && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-orange-955 border-b border-orange-100 pb-4">
              Top Announcement Ticker
            </h3>
            <div>
              <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                Announcement Bar Text (Appears at top of store)
              </label>
              <input
                type="text"
                value={homepageConfig.announcementText || ''}
                onChange={(e) => setHomepageConfig({ ...homepageConfig, announcementText: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={homepageConfig.heroHeadline || ''}
                  onChange={(e) => setHomepageConfig({ ...homepageConfig, heroHeadline: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Hero Subheadline
                </label>
                <input
                  type="text"
                  value={homepageConfig.heroSubheadline || ''}
                  onChange={(e) => setHomepageConfig({ ...homepageConfig, heroSubheadline: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Deal of the Day */}
          <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-orange-955 border-b border-orange-100 pb-4">
              Deal of the Day Showcase
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Featured Deal Title
                </label>
                <input
                  type="text"
                  value={homepageConfig.dealOfTheDay?.title || ''}
                  onChange={(e) => setHomepageConfig({
                    ...homepageConfig,
                    dealOfTheDay: { ...homepageConfig.dealOfTheDay, title: e.target.value }
                  })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Discount Tag Text
                </label>
                <input
                  type="text"
                  value={homepageConfig.dealOfTheDay?.discountText || ''}
                  onChange={(e) => setHomepageConfig({
                    ...homepageConfig,
                    dealOfTheDay: { ...homepageConfig.dealOfTheDay, discountText: e.target.value }
                  })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Countdown Duration (Hours)
                </label>
                <input
                  type="number"
                  value={homepageConfig.dealOfTheDay?.expiryHours || 24}
                  onChange={(e) => setHomepageConfig({
                    ...homepageConfig,
                    dealOfTheDay: { ...homepageConfig.dealOfTheDay, expiryHours: Number(e.target.value) }
                  })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Featured Products */}
      {activeTab === 'featured' && homepageConfig && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-orange-100 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-orange-955">Featured Catalog Carousel</h3>
                <p className="text-xs text-stone-500">Select items to display on the storefront landing carousel</p>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-black text-xs">
                {(homepageConfig.featuredProductIds || []).length} Products Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => {
                const isSelected = (homepageConfig.featuredProductIds || []).includes(p.id || p.product_id);
                return (
                  <div
                    key={p.id || p.product_id}
                    onClick={() => toggleFeaturedProduct(p.id || p.product_id)}
                    className={cn(
                      "p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3",
                      isSelected
                        ? "border-orange-500 bg-orange-50/60 shadow-sm"
                        : "border-stone-200 hover:border-orange-300 bg-white"
                    )}
                  >
                    <img 
                      src={p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'} 
                      alt={p.name} 
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                      <p className="text-[11px] font-black text-orange-600">₹{p.price}</p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center border text-xs",
                      isSelected ? "bg-orange-600 border-orange-600 text-white" : "border-stone-300"
                    )}>
                      {isSelected && <Check size={12} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Banner Add/Edit Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-6">
            <div className="flex items-center justify-between border-b border-orange-100 pb-4">
              <h3 className="text-xl font-extrabold text-orange-955">
                {editingBanner ? 'Edit Hero Banner' : 'Add Hero Banner'}
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)}>
                <X size={18} className="text-stone-400 hover:text-stone-700" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Banner Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Spring Festival Deals"
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flash Deal"
                    value={bannerForm.badge}
                    onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                    Target Route / URL
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /deals or /collection/electronics"
                    value={bannerForm.target_url}
                    onChange={(e) => setBannerForm({ ...bannerForm, target_url: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Banner Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={bannerForm.image_url}
                  onChange={(e) => setBannerForm({ ...bannerForm, image_url: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-orange-100">
                <Button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="bg-stone-100 text-stone-700 font-bold text-xs px-5 py-2 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-2 rounded-xl shadow-md cursor-pointer"
                >
                  Save Banner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Banner Deletion */}
      <ConfirmModal
        isOpen={Boolean(deleteBannerId)}
        onClose={() => setDeleteBannerId(null)}
        onConfirm={handleDeleteBanner}
        title="Delete Banner"
        message="Are you sure you want to remove this promotional banner from the storefront rotation?"
      />
    </div>
  );
}
