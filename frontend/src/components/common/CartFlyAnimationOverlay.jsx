import React, { useEffect, useState, useRef } from 'react';
import lottie from 'lottie-web';
import { useShop } from '../../context/ShopContext';
import addToCartAnimationData from '../../assets/addToCartAnimation.json';

/**
 * Animated Cart Fly Overlay
 * - Replaced with official LottieFiles Add to Cart Button Animation (9lWHnCngkK)
 * - Ultra-smooth pill-to-cart morph, bag drop, and accelerating drive-off motion
 * - Cinematic blurred backdrop overlay for immersive focus
 * - Minimal, non-intrusive item confirmation text with no pill badges or green circles
 * - High-framerate direct lottie-web SVG renderer
 */
export default function CartFlyAnimationOverlay() {
  const { cartFlyAnim, setCartFlyAnim, formatPrice } = useShop();
  const [visible, setVisible] = useState(true);
  const animContainer = useRef(null);

  const product = cartFlyAnim?.product;
  const productName = product?.name || 'Item';
  const productPrice = product?.price;
  const animId = cartFlyAnim?.id;

  useEffect(() => {
    window.__triggerTestCartAnim = (prod) => {
      setCartFlyAnim({
        id: Date.now(),
        product: prod || { name: 'Wireless Noise-Canceling Headphones', price: 2999 }
      });
    };
    return () => {
      delete window.__triggerTestCartAnim;
    };
  }, [setCartFlyAnim]);

  // 1. Play the Lottie animation
  useEffect(() => {
    if (!animId || !animContainer.current) return;

    // Clean previous animation if any
    animContainer.current.innerHTML = '';

    const anim = lottie.loadAnimation({
      container: animContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: addToCartAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        progressiveLoad: true
      }
    });

    anim.setSpeed(1.15);

    return () => {
      anim.destroy();
    };
  }, [animId]);

  // 2. Manage overlay timing and dismiss
  useEffect(() => {
    if (!animId) return;

    setVisible(true);

    // 60 frames @ 25fps with 1.15x speed ≈ 2.08s. Full sequence then fade out smoothly
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 2350);

    const finishTimer = setTimeout(() => {
      setCartFlyAnim(null);
    }, 2750);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [animId, setCartFlyAnim]);

  if (!cartFlyAnim) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
    >
      {/* 1. CINEMATIC BLURRED BACKDROP OVERLAY */}
      <div 
        className={`absolute inset-0 bg-slate-950/45 backdrop-blur-md transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* 2. CENTER STAGE: LottieFiles Add to Cart Button Animation */}
      <div 
        className={`relative z-10 flex flex-col items-center select-none transition-all duration-300 ease-out transform ${
          visible ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-3 opacity-0'
        }`}
      >
        {/* Lottie Animation Canvas */}
        <div 
          ref={animContainer}
          className="relative w-[320px] sm:w-[390px] md:w-[440px] aspect-[2/1] flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(240,101,36,0.4)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        />

        {/* 3. MINIMAL FLOATING TEXT: Minimal, elegant, zero green indicators/pills */}
        <div className="mt-2 text-center pointer-events-none select-none max-w-sm px-4">
          <p className="text-[13px] sm:text-[14px] font-medium text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
            <span className="font-semibold text-white truncate inline-block max-w-[190px] align-bottom">
              {productName}
            </span>
            <span className="text-white/40 mx-2">•</span>
            <span className="text-orange-400 font-semibold">Added to cart</span>
            {productPrice !== undefined && (
              <>
                <span className="text-white/40 mx-2">•</span>
                <span className="text-white/80 font-semibold">
                  {formatPrice ? formatPrice(productPrice) : `₹${productPrice}`}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
