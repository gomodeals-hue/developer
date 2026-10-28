import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Check, Minus, Plus, Trash2 } from 'lucide-react';
import lottie from 'lottie-web';
import addToCartAnimationData from '../../assets/addToCartAnimation.json';
import { useShop } from '../../context/ShopContext';

export default function ClaimDealButton({ product, productId, className = '' }) {
  const { cart = [], addToCart, updateQuantity, removeFromCart } = useShop();

  const pId = productId || product?.product_id || product?.id;

  // Safe string & loose comparison to find item in cart
  const cartItem = cart?.find(item => (
    item.id == pId || 
    item.product_id == pId || 
    String(item.id) === String(pId) || 
    String(item.product_id) === String(pId)
  ));
  const cartQty = cartItem?.quantity || 0;

  // animPhase: 'idle' | 'expanding' | 'playing' | 'settling'
  const [animPhase, setAnimPhase] = useState('idle');
  const lottieContainerRef = useRef(null);
  const animInstanceRef = useRef(null);
  const isAnimating = animPhase !== 'idle';

  const handleClaim = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAnimating) return;

    // Start expanding animation phase like ProductCard
    setAnimPhase('expanding');
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(pId, cartQty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQty <= 1) {
      removeFromCart(pId);
    } else {
      updateQuantity(pId, cartQty - 1);
    }
  };

  useEffect(() => {
    if (animPhase === 'expanding') {
      // Step 1: Smooth expand animation of the button pill
      const playTimer = setTimeout(() => {
        setAnimPhase('playing');
      }, 300);

      return () => clearTimeout(playTimer);
    }

    if (animPhase === 'playing') {
      // Step 2: Play the single-shot added to cart animation inside the expanded button
      if (lottieContainerRef.current) {
        lottieContainerRef.current.innerHTML = '';
        const anim = lottie.loadAnimation({
          container: lottieContainerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: addToCartAnimationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet'
          }
        });

        anim.setSpeed(1.25);
        animInstanceRef.current = anim;
      }

      // Drive-off completes at ~1350ms
      const finishAnimTimer = setTimeout(() => {
        setAnimPhase('settling');
      }, 1350);

      return () => {
        clearTimeout(finishAnimTimer);
        if (animInstanceRef.current) {
          animInstanceRef.current.destroy();
          animInstanceRef.current = null;
        }
      };
    }

    if (animPhase === 'settling') {
      // Step 3: Button morphs into stepper and settles to idle
      const settleTimer = setTimeout(() => {
        setAnimPhase('idle');
      }, 350);

      return () => clearTimeout(settleTimer);
    }
  }, [animPhase]);

  return (
    <div className={`relative w-full h-[38px] flex items-center justify-center ${className}`}>
      {isAnimating ? (
        /* Expanding Pill Button positioned right at the button location */
        <div 
          style={{
            height: '38px'
          }}
          className="relative w-full flex items-center justify-center rounded-full bg-stone-950 shadow-md shadow-stone-950/20 overflow-hidden"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          {/* Smooth fade-in & expand indicator */}
          <div 
            style={{
              transition: 'opacity 200ms ease',
              opacity: animPhase === 'expanding' ? 1 : 0
            }}
            className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-black tracking-wider uppercase pointer-events-none select-none"
          >
            <span className="animate-pulse">Adding...</span>
          </div>

          {/* Single-shot Lottie Added-to-Cart Animation within button */}
          <div 
            ref={lottieContainerRef}
            style={{
              transition: 'opacity 220ms ease',
              opacity: animPhase === 'playing' ? 1 : 0
            }}
            className="w-[155px] h-[38px] flex items-center justify-center select-none overflow-hidden"
          />
        </div>
      ) : cartQty > 0 ? (
        /* Stepper: - [Qty] in cart + (Vibrant Orange Stepper) */
        <div 
          style={{
            background: '#f76e28',
            borderColor: '#f76e28',
            boxShadow: '0 3px 12px rgba(247, 110, 40, 0.35)'
          }}
          className="w-full h-[38px] rounded-full text-white flex items-center justify-between px-2.5 text-xs font-bold transition-all duration-300 border select-none animate-in fade-in"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-black/15 active:scale-90 transition-all cursor-pointer"
            title={cartQty === 1 ? "Remove from cart" : "Decrease quantity"}
          >
            {cartQty === 1 ? <Trash2 size={13} /> : <Minus size={13} strokeWidth={2.5} />}
          </button>
          <span className="font-black text-xs text-white min-w-[20px] text-center select-none tabular-nums px-1 flex items-center gap-1.5">
            <Check size={12} strokeWidth={3} className="text-white shrink-0" />
            <span>{cartQty} in cart</span>
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-black/15 active:scale-90 transition-all cursor-pointer"
            title="Increase quantity"
          >
            <Plus size={13} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        /* Standard Claim Deal Button with Vibrant Brand Orange */
        <button
          type="button"
          onClick={handleClaim}
          className="w-full h-[38px] py-1.5 px-3 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 text-white bg-orange-600 hover:bg-orange-700 shadow-orange-500/20"
        >
          <ShoppingBag size={13} />
          <span>Claim Deal</span>
        </button>
      )}
    </div>
  );
}
