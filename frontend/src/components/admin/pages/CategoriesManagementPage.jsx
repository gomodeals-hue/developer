import React, { useState, useEffect } from 'react';
import { 
  FolderPlus, Edit, Trash2, Check, X, Search, 
  Layers, ChevronRight, Folder, Eye, Tag, Plus
} from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { api } from '../../../services/api';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import ConfirmModal from '../../common/ConfirmModal';

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });
  const [newSubcatInput, setNewSubcatInput] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    is_active: true,
    subcategories: []
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/categories');
      if (res.data.success) {
        setCategories(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to load categories', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setEditingCategory(cat);
      setFormData({
        name: cat.name || '',
        slug: cat.slug || '',
        description: cat.description || '',
        image_url: cat.image_url || '',
        is_active: cat.is_active !== undefined ? cat.is_active : true,
        subcategories: (cat.subcategories || []).map(s => typeof s === 'string' ? s : s.name)
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        image_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
        is_active: true,
        subcategories: []
      });
    }
    setNewSubcatInput('');
    setIsModalOpen(true);
  };

  const handleAddSubcategory = () => {
    if (!newSubcatInput.trim()) return;
    if (formData.subcategories.includes(newSubcatInput.trim())) {
      toast({ title: 'Already exists', description: 'This subcategory is already added.', variant: 'destructive' });
      return;
    }
    setFormData(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, newSubcatInput.trim()]
    }));
    setNewSubcatInput('');
  };

  const handleRemoveSubcategory = (index) => {
    setFormData(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ title: 'Name required', description: 'Category name is required', variant: 'destructive' });
      return;
    }

    try {
      if (editingCategory) {
        const res = await api.put(`/admin/category/${editingCategory.category_id}`, formData);
        if (res.data.success) {
          toast({ title: 'Success', description: 'Category updated successfully' });
          fetchCategories();
          setIsModalOpen(false);
        }
      } else {
        const res = await api.post('/admin/categories', formData);
        if (res.data.success) {
          toast({ title: 'Success', description: 'Category created successfully' });
          fetchCategories();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to save category', variant: 'destructive' });
    }
  };

  const handleToggleStatus = async (cat) => {
    try {
      const newStatus = !cat.is_active;
      const res = await api.patch(`/admin/category/${cat.category_id}`, { is_active: newStatus });
      if (res.data.success) {
        toast({ title: 'Status Updated', description: `Category is now ${newStatus ? 'Active' : 'Inactive'}` });
        setCategories(prev => prev.map(c => c.category_id === cat.category_id ? { ...c, is_active: newStatus } : c));
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to toggle status', variant: 'destructive' });
    }
  };

  const handleDelete = async (catId) => {
    try {
      const res = await api.delete(`/admin/category/${catId}`);
      if (res.data.success) {
        toast({ title: 'Success', description: 'Category removed successfully' });
        setCategories(prev => prev.filter(c => c.category_id !== catId));
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete category', variant: 'destructive' });
    } finally {
      setConfirmModal({ isOpen: false, id: null });
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="h-5 w-5 text-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Store Taxonomy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-orange-955 tracking-tight">Category Management</h1>
          <p className="text-xs text-stone-500 font-medium">Organize boutique departments, subcategories, imagery, and catalog navigation.</p>
        </div>

        <Button
          onClick={() => handleOpenModal()}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
          <input
            type="text"
            placeholder="Search categories or subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
          <span>Total Categories:</span>
          <span className="px-2.5 py-0.5 bg-orange-100 text-orange-800 rounded-full font-black text-[11px]">
            {filteredCategories.length}
          </span>
        </div>
      </div>

      {/* Category Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-orange-600 font-bold">Loading Departments...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-orange-200 p-12 text-center">
          <Folder className="w-12 h-12 text-orange-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-700">No categories found</h3>
          <p className="text-xs text-stone-500 mt-1">Get started by creating your first store department.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const subCount = cat.subcategories?.length || 0;
            return (
              <div 
                key={cat.category_id} 
                className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* Category Header Image */}
                <div className="h-36 relative overflow-hidden bg-stone-100">
                  <img 
                    src={cat.image_url || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80'} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <button
                      onClick={() => handleToggleStatus(cat)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer backdrop-blur-md",
                        cat.is_active 
                          ? "bg-emerald-500/90 text-white hover:bg-emerald-600" 
                          : "bg-rose-500/90 text-white hover:bg-rose-600"
                      )}
                    >
                      {cat.is_active ? <Check size={10} /> : <X size={10} />}
                      {cat.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* Actions on Image */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenModal(cat)}
                      className="p-1.5 bg-white/90 hover:bg-white text-stone-700 hover:text-orange-600 rounded-lg shadow backdrop-blur transition-all cursor-pointer"
                      title="Edit Category"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmModal({ isOpen: true, id: cat.category_id })}
                      className="p-1.5 bg-white/90 hover:bg-white text-stone-700 hover:text-rose-600 rounded-lg shadow backdrop-blur transition-all cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Title & Slug */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-black tracking-tight leading-tight">{cat.name}</h3>
                    <p className="text-[10px] font-bold text-orange-300 uppercase tracking-widest mt-0.5">
                      /{cat.slug}
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {cat.description || 'Curated single-vendor selection certified for daily living and gifting.'}
                  </p>

                  {/* Subcategories list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      <span>Subcategories ({subCount})</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                      {subCount > 0 ? (
                        cat.subcategories.map((sub, sIdx) => {
                          const subName = typeof sub === 'string' ? sub : sub.name;
                          return (
                            <span 
                              key={sIdx}
                              className="px-2 py-0.5 bg-orange-50 text-orange-900 border border-orange-100 rounded-md text-[10px] font-semibold"
                            >
                              {subName}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[10px] text-stone-400 italic">No subcategories defined</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-orange-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-orange-955">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h3>
                <p className="text-xs text-stone-500">Configure catalog department details and subcategories</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Electronics"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setFormData(prev => ({ ...prev, name, slug: editingCategory ? prev.slug : slug }));
                  }}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. electronics"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                    Status
                  </label>
                  <select
                    value={formData.is_active ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                    className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-bold text-stone-900 focus:outline-none focus:bg-white"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-medium text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Department summary..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-orange-200 focus:border-orange-500 bg-orange-50/20 text-xs font-medium text-stone-900 focus:outline-none focus:bg-white"
                />
              </div>

              {/* Subcategories Management in Modal */}
              <div className="space-y-2 border-t border-orange-100 pt-3">
                <label className="text-[10px] font-black text-stone-700 uppercase tracking-widest block">
                  Subcategories ({formData.subcategories.length})
                </label>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New subcategory..."
                    value={newSubcatInput}
                    onChange={(e) => setNewSubcatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubcategory();
                      }
                    }}
                    className="flex-1 h-9 px-3 rounded-xl border border-orange-200 focus:border-orange-500 bg-white text-xs font-medium focus:outline-none"
                  />
                  <Button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="h-9 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-y-auto">
                  {formData.subcategories.map((sub, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium"
                    >
                      {sub}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubcategory(i)}
                        className="text-stone-400 hover:text-rose-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-orange-100">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs px-5 py-2 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-2 rounded-xl shadow-md cursor-pointer"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Deletion Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
        onConfirm={() => handleDelete(confirmModal.id)}
        title="Delete Category"
        message="Are you sure you want to remove this category? Subcategories will also be deleted from the store navigation."
      />
    </div>
  );
}
