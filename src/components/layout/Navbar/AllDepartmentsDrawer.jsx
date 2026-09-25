import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, ChevronRight, ChevronDown, Tag, Flame, Sparkles, 
  Package, Heart, ShieldCheck, HelpCircle, LogOut, ArrowRight 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AllDepartmentsDrawer = ({ isOpen, onClose, departments, user, onLogout }) => {
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
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-80 sm:w-96 max-w-[85vw] bg-white text-stone-900 h-full shadow-2xl flex flex-col z-[10000] overflow-hidden"
          >
            {/* Header: User Profile Greeting */}
            <div className="bg-stone-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-stone-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-white shrink-0">
                  <User size={20} className="text-orange-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                    {user ? 'Welcome Back' : 'Hello, Guest'}
                  </p>
                  <p className="text-sm font-bold text-white truncate">
                    {user ? (user.name || user.email?.split('@')[0]) : 'Sign In / Register'}
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
                <h4 className="text-[10.5px] font-black uppercase tracking-wider text-stone-400 px-3 pb-1">
                  Trending &amp; Offers
                </h4>

                <button
                  type="button"
                  onClick={() => handleLinkClick('/collection/clothing?deal=clearance')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-rose-600 bg-rose-50/60 hover:bg-rose-100/70 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Flame size={15} className="text-rose-600 shrink-0" />
                    <span>Today's Deals (Up to 80% Off)</span>
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
                    <span>Best Sellers</span>
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
                    <span>New Arrivals</span>
                  </span>
                  <ChevronRight size={14} className="text-stone-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick('/products?price=under_500')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-stone-800 hover:bg-stone-50 hover:text-orange-600 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-4 text-center font-black text-emerald-600 text-xs">₹</span>
                    <span>Under ₹499 Store</span>
                  </span>
                  <ChevronRight size={14} className="text-stone-300" />
                </button>
              </div>

              {/* 2. Shop By Department */}
              <div className="p-4 space-y-1">
                <h4 className="text-[10.5px] font-black uppercase tracking-wider text-stone-400 px-3 pb-1">
                  Shop By Category
                </h4>

                {departments.map((dept) => {
                  const isExpanded = expandedDept === dept.key;
                  return (
                    <div key={dept.key} className="space-y-0.5">
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl text-stone-800 hover:bg-stone-50 transition-colors">
                        <button
                          type="button"
                          onClick={() => handleLinkClick(dept.path)}
                          className="font-bold text-stone-900 hover:text-orange-600 cursor-pointer text-left flex-1 text-xs"
                        >
                          {dept.label}
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
                                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block px-2 pt-1">
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

              {/* 3. Account & Help */}
              <div className="p-4 space-y-1">
                <h4 className="text-[10.5px] font-black uppercase tracking-wider text-stone-400 px-3 pb-1">
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
                      <span>Sign In / Customer Login</span>
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
