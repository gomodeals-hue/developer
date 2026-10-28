import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Home, Grid, Flame, Heart, ShoppingBag, User } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';
import { useAuth } from '../../../context/AuthContext';

export default function MobileBottomNav({ onOpenMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlist, setCartDrawerOpen } = useShop();
  const { user } = useAuth();

  const isCurrent = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-120 active:scale-90 ${
            isCurrent('/') ? 'text-orange-600 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home size={19} strokeWidth={isCurrent('/') ? 2.5 : 2} />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Home</span>
        </Link>

        {/* 2. Categories / Explore */}
        <button
          type="button"
          onClick={() => {
            if (onOpenMenu) onOpenMenu();
            else navigate('/categories');
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-120 active:scale-90 cursor-pointer ${
            isCurrent('/categories') || isCurrent('/collection') ? 'text-orange-600 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Grid size={19} strokeWidth={isCurrent('/categories') ? 2.5 : 2} />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Explore</span>
        </button>

        {/* 3. Deals */}
        <Link
          to="/deals"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-120 active:scale-90 relative ${
            isCurrent('/deals') ? 'text-rose-600 font-bold' : 'text-rose-500 hover:text-rose-600'
          }`}
        >
          <div className="relative">
            <Flame size={20} strokeWidth={2.5} className="text-rose-500 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-600" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight text-rose-600">Deals</span>
        </Link>

        {/* 4. Wishlist */}
        <Link
          to="/wishlist"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-120 active:scale-90 relative ${
            isCurrent('/wishlist') ? 'text-orange-600 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <Heart size={19} strokeWidth={isCurrent('/wishlist') ? 2.5 : 2} />
            {wishlist && wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[8.5px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Wishlist</span>
        </Link>

        {/* 5. Cart */}
        <button
          type="button"
          onClick={() => setCartDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-120 active:scale-90 relative text-stone-600 hover:text-orange-600 cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag size={19} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[8.5px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Cart</span>
        </button>

        {/* 6. Account */}
        <Link
          to={user ? "/profile" : "/login"}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-120 active:scale-90 ${
            isCurrent('/profile') || isCurrent('/login') ? 'text-orange-600 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <User size={19} strokeWidth={isCurrent('/profile') ? 2.5 : 2} />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">
            {user ? (user.name ? user.name.split(' ')[0] : 'Account') : 'Sign In'}
          </span>
        </Link>

      </div>
    </nav>
  );
}
