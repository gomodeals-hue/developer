import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, ChevronRight, ChevronDown, Tag, Flame, Sparkles, 
  Package, Heart, ShieldCheck, HelpCircle, LogOut, ArrowRight, Store 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';

const AllDepartmentsDrawer = ({ isOpen, onClose, departments, user, onLogout }) => {
  const { t } = useShop();
  const navigate = useNavigate();
  const [expandedDept, setExpandedDept] = useState(null);

  // Close on Escape key press & prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const toggleDept = (deptKey) => {
    setExpandedDept(prev => prev === deptKey ? null : deptKey);
  };

  const handleLinkClick = (path) => {
    onClose();
    if (path) navigate(path);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 480 }}
            className="relative w-80 sm:w-96 max-w-[85vw] bg-white text-stone-900 h-full shadow-2xl flex flex-col z-[10000] overflow-hidden gpu-accelerate"
          >
            {/* Header: User Profile Greeting */}
            <div className="bg-stone-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-stone-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-white shrink-0">
                  <User size={20} className="text-orange-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                    {user ? t('welcome_back', 'Welcome Back') : t('hello_guest', 'Hello, Guest')}
                  </p>
                  <p className="text-sm font-bold text-white truncate">
                    {user ? (user.name || user.email?.split('@')[0]) : t('sign_in_register', 'Sign In / Register')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Menu Content */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 custom-scrollbar text-xs">
              
              {/* 1. Trending & Highlights */}
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 px-3 pb-1.5 border-b border-stone-100 mb-1">
                  {t('trending_and_offers', 'Trending & Offers')}
                </h4>

                <button
                  type="button"
                  onClick={() => handleLinkClick('/deals')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-rose-600 bg-rose-50/60 hover:bg-rose-100/70 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Flame size={15} className="text-rose-600 shrink-0" />
                    <span>{t('todays_deals_discount', "Today's Deals (Up to 80% Off)")}</span>
                  </span>
                  <ChevronRight size={14} className="text-rose-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick('/products?deal=best')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-stone-800 hover:bg-stone-50 hover:text-orange-600 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-500 shrink-0" />
                    <span>{t('best_sellers', 'Best Sellers')}</span>
                  </span>
                  <ChevronRight size={14} className="text-stone-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick('/products?deal=new')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-stone-800 hover:bg-stone-50 hover:text-orange-600 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Tag size={14} className="text-orange-500 shrink-0" />
                    <span>{t('new_arrivals', 'New Arrivals')}</span>
                  </span>
                  <ChevronRight size={14} className="text-stone-300" />
                </button>
              </div>

              {/* 2. Shop By Department */}
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 px-3 pb-1.5 border-b border-stone-100 mb-1">
                  {t('shop_by_category', 'Shop By Category')}
                </h4>

                {departments.map((dept) => {
                  const isExpanded = expandedDept === dept.key;
                  return (
                    <div key={dept.key} className="space-y-0.5">
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl text-stone-800 hover:bg-stone-50 transition-colors">
                        <button
                          type="button"
                          onClick={() => handleLinkClick(dept.path)}
                          className="font-extrabold text-stone-900 hover:text-orange-600 cursor-pointer text-left flex-1 text-[13px] tracking-tight"
                        >
                          {t(dept.key.replace(/-/g, '_'), dept.label)}
                        </button>
                        {dept.columns && dept.columns.length > 0 && (
                          <button
                            type="button"
                            onClick={() => toggleDept(dept.key)}
                            className="p-1 text-stone-400 hover:text-stone-800 cursor-pointer"
                            aria-label={`Toggle ${dept.label} subcategories`}
                          >
                            <ChevronDown
                              size={15}
                              className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-orange-600' : ''}`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Subcategory Accordion */}
                      <AnimatePresence>
                        {isExpanded && dept.columns && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden pl-4 pr-2 py-1 space-y-3 bg-stone-50/70 rounded-xl my-1 border border-stone-100"
                          >
                            {dept.columns.map((col, colIdx) => (
                              <div key={colIdx} className="space-y-1">
                                <span className="text-[11px] font-black uppercase tracking-wider text-stone-900 block px-2 pt-1.5 border-b border-stone-200/50 pb-0.5 mb-1">
                                  {col.title}
                                </span>
                                {col.items.map((sub, sIdx) => (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => handleLinkClick(sub.path)}
                                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-stone-700 hover:text-orange-600 hover:bg-white transition-colors block font-medium"
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleLinkClick(dept.path)}
                              className="text-xs font-bold text-orange-600 hover:underline px-2 py-1 flex items-center gap-1"
                            >
                              <span>View All {dept.label}</span>
                              <ArrowRight size={11} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* 3. Sell on GoMo Deals (Become a Seller) */}
              <div className="p-4 space-y-1 bg-gradient-to-r from-orange-50/60 to-amber-50/40 border-y border-orange-100/60">
                <h4 className="text-xs font-black uppercase tracking-wider text-orange-950 px-3 pb-1.5 border-b border-orange-200/50 mb-1">
                  Sell on GoMo Deals
                </h4>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/seller')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[#f76e28] bg-white border border-orange-200/90 hover:bg-orange-50 transition-all cursor-pointer text-left shadow-2xs"
                >
                  <span className="flex items-center gap-2.5">
                    <Store size={15} className="text-[#f76e28]" />
                    <span>Become a Seller (Merchant Hub)</span>
                  </span>
                  <ChevronRight size={14} className="text-[#f76e28]" />
                </button>
              </div>

              {/* 4. Account & Help */}
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 px-3 pb-1.5 border-b border-stone-100 mb-1">
                  Help &amp; Settings
                </h4>

                {user ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleLinkClick('/profile')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 font-medium transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <User size={14} className="text-stone-400" />
                        <span>Your Account</span>
                      </span>
                      <ChevronRight size={13} className="text-stone-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLinkClick('/my-orders')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 font-medium transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <Package size={14} className="text-stone-400" />
                        <span>Your Orders</span>
                      </span>
                      <ChevronRight size={13} className="text-stone-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLinkClick('/wishlist')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 font-medium transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <Heart size={14} className="text-rose-500" />
                        <span>My Wishlist</span>
                      </span>
                      <ChevronRight size={13} className="text-stone-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer text-left mt-2 border-t border-stone-100"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleLinkClick('/login')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-orange-600 bg-orange-50/60 hover:bg-orange-100/70 transition-colors cursor-pointer text-left"
                    >
                      <span>Sign In to Account</span>
                      <ChevronRight size={14} className="text-orange-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLinkClick('/register')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer text-left"
                    >
                      <span>Create New Account</span>
                      <ChevronRight size={13} className="text-stone-300" />
                    </button>
                  </>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium shrink-0">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-orange-600" />
                <span>GoMo Deals Verified</span>
              </span>
              <span className="text-[10px] text-stone-400">v2.4.0</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AllDepartmentsDrawer;
