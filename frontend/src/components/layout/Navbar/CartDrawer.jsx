import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, 
  Truck, Check, ArrowRight
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

          {/* Slide-out Drawer Panel with smooth slide in/out */}
          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.85 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[430px] md:w-[460px] bg-white h-full shadow-2xl flex flex-col z-[160] overflow-hidden text-neutral-900"
          >
            {/* Header: Title ("Shopping Cart") + Close 'X' Button */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-100 shrink-0">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                {t('shopping_cart', 'Shopping Cart')}
              </h2>

              <button 
                type="button"
                onClick={() => setCartDrawerOpen(false)} 
                className="text-neutral-700 hover:text-neutral-950 p-1.5 -mr-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                title="Close Cart"
                aria-label="Close"
              >
                <X size={22} strokeWidth={1.8} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar flex flex-col">
              {cart.length === 0 ? (
                /* Empty Cart State */
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                    <ShoppingBag size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-[240px] leading-relaxed mb-6">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button
                    type="button"
                    onClick={handleReturnToShop}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2d7d7b] hover:bg-[#236b69] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free Shipping Progress Banner (matching image style) */}
                  <div className="border border-[#cbe6e2] bg-[#f2f9f8] rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-xs text-neutral-800">
                    <Truck size={17} className="text-[#2d7d7b] shrink-0" strokeWidth={2} />
                    {isFreeDelivery ? (
                      <span className="font-medium text-[#1e6361]">
                        You have unlocked <strong>free shipping</strong>!
                      </span>
                    ) : (
                      <span>
                        Add another <strong>{formatPrice(deliveryRemaining)}</strong> for <strong>free shipping</strong>
                      </span>
                    )}
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-neutral-100 pt-1">
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
                          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl bg-[#f8f9fa] border border-neutral-150 p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
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
                                  className="font-bold text-sm sm:text-base text-neutral-900 hover:text-[#2d7d7b] transition-colors line-clamp-1 leading-snug"
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
                              <p className="text-xs text-neutral-500 font-normal mt-0.5">
                                {variantLabel}
                              </p>
                            </div>

                            {/* Bottom Row: Stepper & Price */}
                            <div className="flex items-end justify-between gap-2 pt-2">
                              {/* Stepper with border: [ - ] [ 1 ] [ + ] */}
                              <div className="inline-flex items-center border border-neutral-200 rounded-md bg-white h-7.5 shadow-2xs">
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
                                      ? 'text-neutral-300 cursor-not-allowed'
                                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 cursor-pointer'
                                  }`}
                                  aria-label="Decrease quantity"
                                  title={item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                                >
                                  <Minus size={12} strokeWidth={2} />
                                </button>

                                <span className="w-8 text-center text-xs font-semibold text-neutral-900 select-none tabular-nums">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
                                  className="w-7.5 h-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={12} strokeWidth={2} />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                {hasDiscount && (
                                  <span className="block text-[11px] text-neutral-400 line-through leading-none mb-0.5">
                                    {formatPrice(originalPrice * item.quantity)}
                                  </span>
                                )}
                                <span className={`text-sm sm:text-base font-bold ${hasDiscount ? 'text-[#2d7d7b]' : 'text-neutral-900'}`}>
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
              <div className="border-t border-neutral-100 p-6 bg-white shrink-0 space-y-4">
                {/* Cost Breakdown */}
                <div className="space-y-2 text-sm text-neutral-700">
                  <div className="flex justify-between items-center">
                    <span className="font-normal text-neutral-600">Subtotal</span>
                    <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-normal text-neutral-600">Shipping</span>
                    <span className={`font-medium ${isFreeDelivery ? 'text-[#2d7d7b]' : 'text-neutral-900'}`}>
                      {isFreeDelivery ? 'FREE' : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline">
                    <span className="text-xl font-bold text-neutral-900">Total</span>
                    <span className="text-xl font-bold text-neutral-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA Button (Deep Teal Pill matching image) */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 sm:py-4 px-6 bg-[#2d7d7b] hover:bg-[#236b69] active:bg-[#1d5957] text-white font-semibold text-base rounded-full text-center transition-all duration-150 cursor-pointer shadow-sm hover:shadow"
                >
                  Checkout
                </button>

                {/* Payment Methods Badges Row (as seen in image) */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md text-[10px] font-bold text-purple-700 tracking-tight shadow-2xs">
                    UPI
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md text-[10px] font-black text-blue-800 tracking-wider shadow-2xs">
                    VISA
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md text-[10px] font-bold text-amber-600 tracking-tight shadow-2xs">
                    Mastercard
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md text-[10px] font-bold text-sky-600 tracking-tight shadow-2xs">
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
