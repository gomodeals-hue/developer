import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, Minus, ShoppingBag, 
  Truck
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import { toast } from 'react-hot-toast';
import { getProductImage } from '../../../utils/productImages';
import TimedUndoAction from '../../common/TimedUndoAction';

const getItemKey = (item) => `${String(item?.product_id || item?.id || '')}__${String(item?.selectedColor || item?.variant_value || 'default')}`;

const CartDrawer = () => {
  const { 
    cart, 
    cartSubtotal,
    removeFromCart, 
    updateQuantity, 
    cartDrawerOpen, 
    setCartDrawerOpen,
    formatPrice,
    t
  } = useShop();
  
  const navigate = useNavigate();

  // Selected item keys for multi-action
  const [selectedKeys, setSelectedKeys] = useState(() => cart.map(getItemKey));

  useEffect(() => {
    const validKeys = new Set(cart.map(getItemKey));
    setSelectedKeys(prev => {
      const remaining = prev.filter(k => validKeys.has(k));
      if (remaining.length === 0 && cart.length > 0) {
        return cart.map(getItemKey);
      }
      return remaining;
    });
  }, [cart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (cartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cartDrawerOpen]);

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleReturnToShop = () => {
    setCartDrawerOpen(false);
    navigate('/');
  };

  // Pricing calculations
  const subtotal = Number(cartSubtotal) || 0;
  const freeShippingThreshold = 499;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = isFreeDelivery || cart.length === 0 ? 0 : 49;
  const total = subtotal + shippingFee;

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <>
          {/* Backdrop Overlay with smooth fade in/out */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={() => setCartDrawerOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[150] cursor-pointer"
          />

          {/* Slide-out Drawer Panel with smooth spring slide in/out */}
          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.85 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[430px] md:w-[460px] bg-white h-full shadow-2xl flex flex-col z-[160] overflow-hidden text-stone-900 border-l border-orange-100"
          >
            {/* Header: Title ("Shopping Cart") + Close 'X' Button */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-orange-100/80 shrink-0 bg-white">
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('shopping_cart', 'Shopping Cart')}
              </h2>

              <button 
                type="button"
                onClick={() => setCartDrawerOpen(false)} 
                className="text-stone-500 hover:text-[#f76e28] p-1.5 -mr-1.5 rounded-full hover:bg-orange-50 transition-colors cursor-pointer"
                title="Close Cart"
                aria-label="Close"
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar flex flex-col bg-white">
              {cart.length === 0 ? (
                /* Empty Cart State */
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f76e28] mb-4 shadow-2xs">
                    <ShoppingBag size={28} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-stone-800 mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-stone-500 max-w-[240px] leading-relaxed mb-6">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button
                    type="button"
                    onClick={handleReturnToShop}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-md shadow-[#f76e28]/25 hover:shadow-lg hover:shadow-[#f76e28]/35"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free Shipping Progress Banner with Brand Theme */}
                  <div className={`rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-xs transition-colors ${
                    isFreeDelivery 
                      ? 'border border-emerald-200 bg-emerald-50/80 text-emerald-900' 
                      : 'border border-orange-200/90 bg-orange-50/70 text-stone-800'
                  }`}>
                    <Truck size={17} className={`shrink-0 ${isFreeDelivery ? 'text-emerald-600' : 'text-[#f76e28]'}`} strokeWidth={2} />
                    {isFreeDelivery ? (
                      <span className="font-semibold text-emerald-800">
                        You have unlocked <strong>free shipping</strong>!
                      </span>
                    ) : (
                      <span>
                        Add another <strong className="text-[#f76e28]">{formatPrice(deliveryRemaining)}</strong> for <strong>free shipping</strong>
                      </span>
                    )}
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-stone-100 pt-1">
                    {cart.map((item) => {
                      const itemKey = getItemKey(item);
                      const originalPrice = item.original_price || item.mrp || (item.price ? Math.round(item.price * 1.25) : 0);
                      const hasDiscount = originalPrice > item.price;
                      const variantLabel = item.selectedColor || item.variant_value || item.category || 'Standard';

                      return (
                        <div 
                          key={itemKey}
                          className="py-4 first:pt-2 flex items-start gap-4 transition-colors"
                        >
                          {/* Square Product Image */}
                          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl bg-stone-50 border border-stone-200/80 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                            <img
                              src={getProductImage(item)}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getProductImage(item);
                              }}
                            />
                          </div>

                          {/* Item Info */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                            <div>
                              {/* Title + Delete Action Row */}
                              <div className="flex items-start justify-between gap-2">
                                <Link
                                  to={`/product/${item.id}`}
                                  onClick={() => setCartDrawerOpen(false)}
                                  className="font-bold text-sm sm:text-base text-stone-900 hover:text-[#f76e28] transition-colors line-clamp-1 leading-snug"
                                >
                                  {item.name}
                                </Link>

                                <TimedUndoAction
                                  initialSeconds={4}
                                  deleteLabel="Remove"
                                  undoLabel="Cancel"
                                  size="xs"
                                  onDelete={() => {
                                    removeFromCart(item.id, item.selectedColor, item.cart_item_id);
                                    toast.success(`Removed "${item.name}" from cart`);
                                  }}
                                  onUndo={() => toast.success(`Restored "${item.name}"`)}
                                />
                              </div>

                              {/* Subtitle / Variant */}
                              <p className="text-xs text-stone-400 font-medium mt-0.5">
                                {variantLabel}
                              </p>
                            </div>

                            {/* Bottom Row: Stepper & Price */}
                            <div className="flex items-end justify-between gap-2 pt-2">
                              {/* Stepper with border: [ - ] [ 1 ] [ + ] */}
                              <div className="inline-flex items-center border border-stone-200 rounded-md bg-white h-7.5 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      updateQuantity(item.id, item.quantity - 1, item.selectedColor);
                                    }
                                  }}
                                  disabled={item.quantity <= 1}
                                  className={`w-7.5 h-full flex items-center justify-center transition-colors ${
                                    item.quantity <= 1
                                      ? 'text-stone-300 cursor-not-allowed'
                                      : 'text-stone-600 hover:text-[#f76e28] hover:bg-orange-50/60 cursor-pointer'
                                  }`}
                                  aria-label="Decrease quantity"
                                  title={item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                                >
                                  <Minus size={12} strokeWidth={2} />
                                </button>

                                <span className="w-8 text-center text-xs font-bold text-stone-900 select-none tabular-nums">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
                                  className="w-7.5 h-full flex items-center justify-center text-stone-600 hover:text-[#f76e28] hover:bg-orange-50/60 transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={12} strokeWidth={2} />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                {hasDiscount && (
                                  <span className="block text-[11px] text-stone-400 line-through leading-none mb-0.5">
                                    {formatPrice(originalPrice * item.quantity)}
                                  </span>
                                )}
                                <span className={`text-sm sm:text-base font-bold ${hasDiscount ? 'text-[#f76e28]' : 'text-stone-900'}`}>
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Summary & Checkout Section */}
            {cart.length > 0 && (
              <div className="border-t border-orange-100 p-6 bg-white shrink-0 space-y-4">
                {/* Cost Breakdown */}
                <div className="space-y-2 text-sm text-stone-700">
                  <div className="flex justify-between items-center">
                    <span className="font-normal text-stone-600">Subtotal</span>
                    <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-normal text-stone-600">Shipping</span>
                    <span className={`font-semibold ${isFreeDelivery ? 'text-emerald-600' : 'text-stone-900'}`}>
                      {isFreeDelivery ? 'FREE' : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                    <span className="text-xl font-black text-stone-900">Total</span>
                    <span className="text-xl font-black text-stone-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA Button (Our GoMo Deals Orange Brand Color) */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 sm:py-4 px-6 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] text-white font-bold text-base rounded-full text-center transition-all duration-150 cursor-pointer shadow-md shadow-[#f76e28]/25 hover:shadow-lg hover:shadow-[#f76e28]/35 active:scale-[0.99]"
                >
                  Checkout
                </button>

                {/* Payment Methods Badges Row */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-[10px] font-bold text-purple-700 tracking-tight shadow-2xs">
                    UPI
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-[10px] font-black text-blue-800 tracking-wider shadow-2xs">
                    VISA
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-[10px] font-bold text-amber-600 tracking-tight shadow-2xs">
                    Mastercard
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-[10px] font-bold text-sky-600 tracking-tight shadow-2xs">
                    PayPal
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
