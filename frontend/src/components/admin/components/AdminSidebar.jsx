import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Ticket, Shield, BarChart3,
  MessageSquare, ShieldCheck, RotateCcw,
  Image, Trophy, Layers, Home, Boxes, FileSpreadsheet,
  CreditCard, Headphones, Settings, Store
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAdminAuth } from "../../../context/AdminAuthContext.jsx";
import gmdLogo from "../../../assets/GMD_Logo.png";

export const navItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Products", path: "/admin/products", icon: Package },
  { title: "Seller Hub", path: "/seller", icon: Store },
  { title: "Inventory", path: "/admin/inventory", icon: Boxes },
  { title: "Categories", path: "/admin/categories", icon: Layers },
  { title: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { title: "Returns", path: "/admin/returns", icon: RotateCcw },
  { title: "Customers", path: "/admin/customers", icon: Users },
  { title: "Homepage", path: "/admin/homepage", icon: Home },
  { title: "Ad Banners", path: "/admin/ad-banners", icon: Image },
  { title: "Reviews", path: "/admin/reviews", icon: MessageSquare },
  { title: "Coupons", path: "/admin/coupons", icon: Ticket },
  { title: "Payments", path: "/admin/payments", icon: CreditCard },
  { title: "Reports", path: "/admin/reports", icon: FileSpreadsheet },
  { title: "Brand Rankings", path: "/admin/rankings", icon: Trophy },
  { title: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { title: "Support", path: "/admin/support", icon: Headphones },
  { title: "Settings", path: "/admin/settings", icon: Settings },
  { title: "Logs", path: "/admin/logs", icon: Shield },
];


const superAdminItems = [
  { title: "Admins", path: "/admin/administrators", icon: ShieldCheck },
];


export function AdminSidebar() {
  const location = useLocation();
  const { adminUser: user } = useAdminAuth();

  const menuItems = user?.role === 'super_admin' 
    ? [...navItems, ...superAdminItems] 
    : navItems;

  return (
    <aside className="fixed top-0 left-0 h-screen w-72 flex flex-col bg-[#02172e] text-white border-r border-sky-500/15 font-sans shadow-2xl overflow-y-auto no-scrollbar">
      {/* Brand Identity - Exact match of Enterprise Admin */}
      <div className="p-6 mb-4 border-b border-sky-500/15 bg-[#032448]/40">
        <Link to="/admin" className="flex flex-col group focus:outline-none">
          <div className="flex items-center gap-3">
            <img 
              src={gmdLogo} 
              alt="GoMo Deals" 
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-150 group-hover:scale-105 filter drop-shadow-sm brightness-105" 
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-4 h-px bg-sky-400"></div>
            <span className="text-[8.5px] tracking-[0.35em] uppercase text-sky-300 font-extrabold">
              {user?.role === 'super_admin' ? 'Super Admin Portal' : 'Admin Operations'}
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto no-scrollbar">
        <p className="px-5 text-[8.5px] font-bold text-sky-400/80 uppercase tracking-[0.25em] mb-3">Management</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={cn(
                "flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-300 rounded-xl group relative text-[10.5px] font-bold uppercase tracking-[0.15em]",
                isActive
                  ? "text-white bg-[#0077c8] shadow-[0_4px_16px_rgba(0,119,200,0.35)]"
                  : "text-sky-200/70 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <div className="absolute left-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              )}
              <item.icon 
                size={16} 
                strokeWidth={isActive ? 2 : 1.5} 
                className={cn(
                  "flex-shrink-0 transition-transform group-hover:scale-110 duration-300", 
                  isActive ? "opacity-100 text-white" : "opacity-60 group-hover:opacity-100 text-sky-300"
                )} 
              />
              <span className={cn(
                "transition-all duration-300",
                isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
              )}>
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer Branding */}
      <div className="p-8 border-t border-white/5 bg-orange-600/10">
        <div className="bg-white/5 p-5 rounded-none border border-white/5">
          <div className="flex items-center gap-2.5 mb-2">
             <div className="h-1.5 w-1.5 bg-orange-50 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
             <p className="text-[8.5px] font-bold text-orange-400 uppercase tracking-[0.25em]">Systems Active</p>
          </div>
          <p className="text-[8.5px] font-normal text-orange-200 uppercase tracking-widest leading-relaxed">Admin Suite v2.0</p>
        </div>
      </div>
    </aside>
  );
}
