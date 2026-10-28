import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { api } from '../services/api';
import * as cartService from '../services/cartService';
import * as wishlistService from '../services/wishlistService';
import { couponService } from '../services/couponService';

import { translations, supportedLanguages } from '../data/translations';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compareItems, setCompareItems] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [cartFlyAnim, setCartFlyAnim] = useState(null);

  // Coupon state with localStorage persistence
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('gomo_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      toast('Please enter a valid coupon code.', { type: 'error' });
      return { success: false, error: 'Empty coupon code' };
    }
    const currentSubtotal = cart.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
    const res = await couponService.validateCoupon(code, currentSubtotal, cart);
    if (res.success && res.data) {
      setAppliedCoupon(res.data);
      try {
        localStorage.setItem('gomo_applied_coupon', JSON.stringify(res.data));
      } catch (err) {}
      toast(`Coupon ${res.data.code} applied successfully!`, { type: 'success' });
      return { success: true, coupon: res.data };
    } else {
      toast(res.error || res.message || 'Invalid coupon code.', { type: 'error' });
      return { success: false, error: res.error || res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    try {
      localStorage.removeItem('gomo_applied_coupon');
    } catch (err) {}
    toast('Coupon removed.', { type: 'info' });
  };

  const clearCart = async () => {
    setCart([]);
    setAppliedCoupon(null);
    try {
      localStorage.removeItem('cart');
      localStorage.removeItem('gomo_cart_items');
      localStorage.removeItem('gomo_applied_coupon');
    } catch {}
    if (user?.id) {
      await cartService.clearCart(user.id);
    } else {
      await cartService.clearCart();
    }
  };

  const moveToCart = async (product, selectedVariant = null) => {
    const productId = product.product_id || product.id;
    await addToCart(product, 1, selectedVariant);
    removeFromWishlist(productId);
    toast(`"${product.name || 'Item'}" moved to cart.`, { type: 'success' });
  };

  // Dynamic on-the-fly translations caching
  const [translationsCache, setTranslationsCache] = useState(() => {
    try {
      const saved = localStorage.getItem('gmd_translations_cache');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [cacheVersion, setCacheVersion] = useState(0);

  const updateCache = (lang, original, translated) => {
    setTranslationsCache(prev => {
      const updated = {
        ...prev,
        [lang]: {
          ...(prev[lang] || {}),
          [original]: translated
        }
      };
      try {
        localStorage.setItem('gmd_translations_cache', JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save translation cache:", err);
      }
      return updated;
    });
    setCacheVersion(v => v + 1);
  };

  const activeRequests = useRef(new Set());

  const triggerBackgroundTranslation = (text, targetLang) => {
    const requestKey = `${targetLang}:${text}`;
    if (activeRequests.current.has(requestKey)) return;
    activeRequests.current.add(requestKey);

    const translate = async () => {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json && json[0]) {
          const translated = json[0].map(s => s[0]).join('');
          updateCache(targetLang, text, translated);
        }
      } catch (err) {
        console.error("Dynamic translation error for key:", text, err);
      } finally {
        activeRequests.current.delete(requestKey);
      }
    };
    translate();
  };

  const [countriesList, setCountriesList] = useState([
    { name: 'India', code: 'IN', flag: 'IN', currency: 'INR', symbol: '₹', rate: 1.0 },
    { name: 'America', code: 'US', flag: 'US', currency: 'USD', symbol: '$', rate: 0.012 },
    { name: 'United Kingdom', code: 'GB', flag: 'GB', currency: 'GBP', symbol: '£', rate: 0.0095 },
    { name: 'Europe', code: 'EU', flag: 'EU', currency: 'EUR', symbol: '€', rate: 0.011 },
    { name: 'Canada', code: 'CA', flag: 'CA', currency: 'CAD', symbol: 'C$', rate: 0.016 },
    { name: 'Australia', code: 'AU', flag: 'AU', currency: 'AUD', symbol: 'A$', rate: 0.018 },
    { name: 'Japan', code: 'JP', flag: 'JP', currency: 'JPY', symbol: '¥', rate: 1.85 },
    { name: 'UAE', code: 'AE', flag: 'AE', currency: 'AED', symbol: 'د.إ', rate: 0.044 }
  ]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        let rates = null;
        const cachedStr = localStorage.getItem('gmd_exchange_rates');
        const cachedTime = localStorage.getItem('gmd_exchange_rates_time');
        const isFresh = cachedStr && cachedTime && (Date.now() - Number(cachedTime) < 24 * 60 * 60 * 1000);

        if (isFresh) {
          rates = JSON.parse(cachedStr);
        } else {
          try {
            // First try the backend config endpoint
            const res = await api.get('/config/currency-rates');
            if (res.data && res.data.success && res.data.rates) {
              rates = res.data.rates;
            }
          } catch (e) {
            // Fallback to external API if backend is unreachable
            const res = await fetch('https://open.er-api.com/v6/latest/INR');
            const json = await res.json();
            if (json && json.result === 'success' && json.rates) {
              rates = json.rates;
            }
          }
          
          if (rates) {
            localStorage.setItem('gmd_exchange_rates', JSON.stringify(rates));
            localStorage.setItem('gmd_exchange_rates_time', Date.now().toString());
          }
        }

        if (rates) {
          setCountriesList(prevList => {
            const updated = prevList.map(c => {
              const fetchedRate = rates[c.currency];
              return fetchedRate !== undefined ? { ...c, rate: fetchedRate } : c;
            });
            // Update selectedCountry to use the new rate
            setSelectedCountry(prev => {
              const matched = updated.find(c => c.code === prev.code);
              return matched || prev;
            });
            return updated;
          });
        }
      } catch (err) {
        console.error("Failed to fetch up-to-date exchange rates:", err);
      }
    };

    fetchExchangeRates();
  }, []);

  const languagesList = supportedLanguages || [
    { code: 'EN', name: 'English', nativeName: 'English', flag: '🇬🇧', label: 'English' },
    { code: 'FR', name: 'French', nativeName: 'Français', flag: '🇫🇷', label: 'Français' },
    { code: 'DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', label: 'Deutsch' },
    { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', label: 'हिन्दी' },
    { code: 'ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', label: 'Español' }
  ];

  const [selectedCountry, setSelectedCountry] = useState(() => {
    const saved = localStorage.getItem('gmd_country');
    if (saved) {
      const found = countriesList.find(c => c.name.toLowerCase() === saved.toLowerCase());
      if (found) return found;
    }
    return countriesList[0];
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('gmd_language');
    if (saved && ['EN', 'HI', 'ES', 'FR', 'DE', 'JA', 'AR'].includes(saved.toUpperCase())) {
      return saved.toUpperCase();
    }
    return 'EN';
  });

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = (language || 'EN').toLowerCase();
      }
    } catch (e) {}
  }, [language]);

  const changeLanguage = (langCode) => {
    if (!langCode) return;
    const upper = langCode.toUpperCase();
    if (['EN', 'HI', 'ES', 'FR', 'DE', 'JA', 'AR'].includes(upper)) {
      setLanguage(upper);
      localStorage.setItem('gmd_language', upper);
      try {
        if (typeof document !== 'undefined') {
          document.documentElement.lang = upper.toLowerCase();
          window.dispatchEvent(new CustomEvent('gmd_language_changed', { detail: { language: upper } }));
        }
      } catch (e) {}
    }
  };

  const changeCountry = (countryName) => {
    const found = countriesList.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    if (found) {
      setSelectedCountry(found);
      localStorage.setItem('gmd_country', found.name);
    }
  };

  const t = (key, params = {}) => {
    if (!key) return '';
    const lang = (language || 'EN').toUpperCase();
    const langDict = translations[lang] || translations.EN;
    
    // 1. Direct key lookup
    let translation = langDict?.[key];
    
    // 2. If not found by key, try matching by English value
    if (!translation && lang !== 'EN' && translations.EN) {
      const matchKey = Object.keys(translations.EN).find(
        k => typeof translations.EN[k] === 'string' && translations.EN[k].trim().toLowerCase() === String(key).trim().toLowerCase()
      );
      if (matchKey && langDict?.[matchKey]) {
        translation = langDict[matchKey];
      }
    }
    
    // 3. Fallback to English dictionary or raw key
    if (!translation) {
      translation = translations.EN?.[key] || key;
    }
    
    // 4. Background dynamic translation if still equal to key and target language is not English
    if (translation === key && lang !== 'EN') {
      const targetLang = lang.toLowerCase();
      const cached = translationsCache[targetLang]?.[key];
      if (cached) {
        translation = cached;
      } else {
        triggerBackgroundTranslation(key, targetLang);
      }
    }
    
    // 5. Replace placeholder params (e.g., {count}, {price}, {recipient}, {percent}, {query})
    if (typeof translation === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        translation = translation.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      });
    }
    
    return translation;
  };


  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) return '';
    const country = selectedCountry || countriesList[0] || { symbol: '₹', rate: 1, currency: 'INR' };
    const rate = country.rate || 1;
    const symbol = country.symbol || '₹';
    const converted = Number(price) * rate;
    const hasDecimals = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(country.currency);
    if (hasDecimals) {
      return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  };

  const convertPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) return 0;
    const country = selectedCountry || countriesList[0] || { symbol: '₹', rate: 1, currency: 'INR' };
    return Number(price) * (country.rate || 1);
  };

  // Load from localStorage on init (for guests)
  useEffect(() => {
    if (!user) {
      const savedCart = localStorage.getItem('cart');
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }
  }, [user]);

  // Sync with backend on login
  useEffect(() => {
    const syncWithBackend = async () => {
      if (user?.id && (user?.role === 'customer' || user?.role === 'admin' || user?.role === 'super_admin')) {
        setLoading(true);
        try {
          const [remoteCart, remoteWishlist] = await Promise.all([
            cartService.getCart(user.id),
            wishlistService.getWishlist(user.id)
          ]);
          
          if (remoteCart?.success && Array.isArray(remoteCart.data)) {
            setCart(remoteCart.data.map(item => ({
              id: item.product_id || item.id,
              product_id: item.product_id || item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.thumbnail,
              variant_id: item.variant_id,
              selectedColor: item.variant_value || item.selectedColor || null,
              variant_value: item.variant_value || item.selectedColor || null,
              cart_item_id: item.cart_item_id || item.id,
              category_name: item.category_name || null,
              tags: item.tags || null,
              stock_quantity: item.stock_quantity !== undefined ? item.stock_quantity : 25
            })));
          }

          if (remoteWishlist?.success && Array.isArray(remoteWishlist.data)) {
            setWishlist(remoteWishlist.data.map(item => ({
              id: item.product_id,
              name: item.name,
              price: item.price,
              image: item.thumbnail,
              wishlist_item_id: item.wishlist_item_id
            })));
          }
        } catch (error) {
          console.error("Backend sync failed:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    syncWithBackend();
  }, [user]);

  // Save to localStorage for guests only
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [cart, wishlist, user]);



  const forceAddToWishlist = (product) => {
    const productId = product.product_id || product.id;
    setWishlist(prevWishlist => {
      const isWishlisted = prevWishlist.find(item => item.id === productId || item.product_id === productId);
      if (isWishlisted) return prevWishlist;
      return [...prevWishlist, { ...product, id: productId }];
    });
  };

  const removeFromCart = async (productId, selectedColor = null, cartItemId = null) => {
    // 0. Support object argument
    if (typeof productId === 'object' && productId !== null) {
      cartItemId = productId.cart_item_id || productId.cartItemId || cartItemId;
      selectedColor = productId.selectedColor || productId.variant_value || selectedColor;
      productId = productId.product_id || productId.id;
    }

    const targetColor = (selectedColor && selectedColor !== 'default') ? selectedColor : null;

    // 1. Instant optimistic local cart update (0ms tactile UI latency!)
    let updatedCart = [];
    setCart(prevCart => {
      updatedCart = prevCart.filter(item => {
        const idMatches = (
          (cartItemId && (String(item.cart_item_id) === String(cartItemId) || String(item.id) === String(cartItemId))) ||
          (productId && (
            String(item.id) === String(productId) ||
            String(item.product_id) === String(productId) ||
            String(item.cart_item_id) === String(productId) ||
            item.id == productId ||
            item.product_id == productId
          ))
        );
        if (!idMatches) return true;
        if (targetColor) {
          const itemColor = item.selectedColor || item.variant_value || null;
          return !(itemColor === targetColor);
        }
        return false; // remove
      });
      return updatedCart;
    });

    // 2. Synchronously persist to BOTH local storage keys immediately
    try {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('gomo_cart_items', JSON.stringify(updatedCart));
    } catch {}

    // 3. Resolve the exact item for remote removal ID
    const foundItem = cart.find(i => 
      (cartItemId && (String(i.cart_item_id) === String(cartItemId) || String(i.id) === String(cartItemId))) ||
      (productId && (
        String(i.id) === String(productId) ||
        String(i.product_id) === String(productId) ||
        String(i.cart_item_id) === String(productId) ||
        i.id == productId ||
        i.product_id == productId
      ))
    );
    const resolvedCartItemId = cartItemId || foundItem?.cart_item_id || foundItem?.id || productId;

    // 4. Always call cartService.removeItem (keeps local storage + backend in sync)
    try {
      await cartService.removeItem(resolvedCartItemId, {
        userId: user?.id,
        variant_value: targetColor,
        selectedColor: targetColor
      });

      if (user?.id) {
        const remoteCart = await cartService.getCart(user.id);
        if (remoteCart?.success && Array.isArray(remoteCart.data)) {
          // Guard: filter out the removed item so stale remote data never restores it!
          const sanitized = remoteCart.data
            .filter(it => {
              const matchesDeleted = (
                (resolvedCartItemId && String(it.cart_item_id) === String(resolvedCartItemId)) ||
                (productId && (
                  String(it.id) === String(productId) ||
                  String(it.product_id) === String(productId)
                ))
              );
              if (!matchesDeleted) return true;
              if (targetColor) {
                const itColor = it.variant_value || it.selectedColor || null;
                return !(itColor === targetColor);
              }
              return false;
            })
            .map(it => ({
              id: it.product_id || it.id,
              product_id: it.product_id || it.id,
              name: it.name,
              price: it.price,
              quantity: it.quantity,
              image: it.thumbnail,
              variant_id: it.variant_id,
              selectedColor: it.variant_value || it.selectedColor || null,
              variant_value: it.variant_value || it.selectedColor || null,
              cart_item_id: it.cart_item_id || it.id,
              category_name: it.category_name || null,
              tags: it.tags || null,
              stock_quantity: it.stock_quantity !== undefined ? it.stock_quantity : 25
            }));

          setCart(sanitized);
          try {
            localStorage.setItem('cart', JSON.stringify(sanitized));
            localStorage.setItem('gomo_cart_items', JSON.stringify(sanitized));
          } catch {}
        }
      }
    } catch (error) {
      console.error("Remove from cart failed:", error);
    }
  };

  const removeMultipleFromCart = async (itemsToRemove = []) => {
    if (!itemsToRemove || itemsToRemove.length === 0) return;

    // 1. Optimistic instant filter for cart
    let updatedCart = [];
    setCart(prevCart => {
      updatedCart = prevCart.filter(item => {
        const isMatched = itemsToRemove.some(it => {
          const itId = it.id || it.product_id || it.productId;
          const itCartItemId = it.cart_item_id || it.cartItemId;
          const matchId = (
            (itCartItemId && (String(item.cart_item_id) === String(itCartItemId) || String(item.id) === String(itCartItemId))) ||
            (itId && (
              String(item.id) === String(itId) ||
              String(item.product_id) === String(itId) ||
              String(item.cart_item_id) === String(itId) ||
              item.id == itId ||
              item.product_id == itId
            ))
          );
          if (!matchId) return false;
          const itColor = it.selectedColor || it.variant_value;
          if (itColor && itColor !== 'default') {
            const itemColor = item.selectedColor || item.variant_value;
            return itemColor === itColor;
          }
          return true;
        });
        return !isMatched;
      });
      return updatedCart;
    });

    // 2. Synchronous storage sync
    try {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('gomo_cart_items', JSON.stringify(updatedCart));
    } catch {}

    // 3. Remove remotely
    try {
      for (const it of itemsToRemove) {
        const targetId = it.cart_item_id || it.id || it.product_id || it.productId;
        await cartService.removeItem(targetId, {
          userId: user?.id,
          variant_value: it.selectedColor || it.variant_value,
          selectedColor: it.selectedColor || it.variant_value
        });
      }
      if (user?.id) {
        const remoteCart = await cartService.getCart(user.id);
        if (remoteCart?.success && Array.isArray(remoteCart.data)) {
          const removedIds = new Set(itemsToRemove.map(i => String(i.cart_item_id || i.product_id || i.id)));
          const sanitized = remoteCart.data
            .filter(it => !removedIds.has(String(it.cart_item_id)) && !removedIds.has(String(it.product_id)) && !removedIds.has(String(it.id)))
            .map(it => ({
              id: it.product_id || it.id,
              product_id: it.product_id || it.id,
              name: it.name,
              price: it.price,
              quantity: it.quantity,
              image: it.thumbnail,
              variant_id: it.variant_id,
              selectedColor: it.variant_value || it.selectedColor || null,
              variant_value: it.variant_value || it.selectedColor || null,
              cart_item_id: it.cart_item_id || it.id,
              category_name: it.category_name || null,
              tags: it.tags || null,
              stock_quantity: it.stock_quantity !== undefined ? it.stock_quantity : 25
            }));
          setCart(sanitized);
          try {
            localStorage.setItem('cart', JSON.stringify(sanitized));
            localStorage.setItem('gomo_cart_items', JSON.stringify(sanitized));
          } catch {}
        }
      }
    } catch (error) {
      console.error("Remove multiple from cart failed:", error);
    }
  };

  // Add product to cart with variant support and local fallback
  const addToCart = async (product, quantity = 1, selectedVariant = null) => {
    const wasEmpty = (!cart || cart.length === 0);
    const productId = product.product_id || product.id;
    const variantId = selectedVariant?.variant_id || product.variant_id || null;
    const variantValue = selectedVariant?.variant_value || (typeof selectedVariant === 'string' ? selectedVariant : null) || product.variant_value || null;
    const price = selectedVariant?.price !== undefined ? selectedVariant.price : (product.price || 0);

    // Instant tactile feedback: trigger cart animation immediately with 0 delay
    setCartFlyAnim({
      id: Date.now(),
      isFirstItem: wasEmpty,
      product: {
        ...product,
        price
      }
    });

    if (user?.id) {
      try {
        const res = await cartService.addToCart({
          customer_id: user.id,
          userId: user.id,
          product_id: productId,
          variant_id: variantId,
          variant_value: variantValue,
          quantity,
          price,
          product: {
            ...product,
            price,
            thumbnail: selectedVariant?.image_url || product.thumbnail || product.images?.[0]
          }
        });
        if (res.success !== false) {
          // Refresh cart from backend
          const remoteCart = await cartService.getCart(user.id);
          if (remoteCart?.success && Array.isArray(remoteCart.data)) {
            setCart(remoteCart.data.map(item => ({
              id: item.product_id || item.id,
              product_id: item.product_id || item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.thumbnail,
              variant_id: item.variant_id,
              selectedColor: item.variant_value || variantValue || null,
              variant_value: item.variant_value || variantValue || null,
              cart_item_id: item.cart_item_id || item.id,
              category_name: item.category_name || null,
              tags: item.tags || null,
              stock_quantity: item.stock_quantity !== undefined ? item.stock_quantity : 25
            })));
          }
          toast('Added to cart.', { type: 'success' });
        } else {
          toast(res.error || 'Failed to add to cart.', { type: 'error' });
        }
      } catch (error) {
        console.error('Add to cart failed:', error);
        toast('Failed to add to cart.', { type: 'error' });
      }
    } else {
      // Guest local cart addition
      const res = await cartService.addToCart({
        product_id: productId,
        variant_id: variantId,
        variant_value: variantValue,
        quantity,
        price,
        product: {
          ...product,
          price,
          thumbnail: selectedVariant?.image_url || product.thumbnail || product.images?.[0]
        }
      });
      if (res.success) {
        setCart(res.data.map(item => ({
          id: item.product_id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.thumbnail,
          variant_id: item.variant_id,
          selectedColor: item.variant_value || variantValue || null,
          variant_value: item.variant_value || variantValue || null,
          cart_item_id: item.cart_item_id,
          category_name: item.category_name || null
        })));
        toast('Added to cart.', { type: 'success' });
      }
    }
  };



  // Toggle wishlist item with authentication check
  const toggleWishlist = async (product) => {
    if (!user?.id) {
      toast('Please log in to manage your wishlist.', { type: 'error' });
      return;
    }
    const productId = product.product_id || product.id;
    const existingItem = wishlist.find(item => item.id === productId || item.product_id === productId);
    try {
      if (existingItem) {
        // Remove from wishlist
        await wishlistService.removeItem(existingItem.wishlist_item_id);
        toast('Removed from wishlist.', { type: 'info' });
      } else {
        // Add to wishlist
        await wishlistService.addToWishlist({
          customer_id: user.id,
          product_id: productId,
          variant_id: product.variant_id || null,
        });
        toast('Added to wishlist.', { type: 'success' });
      }
      // Refresh wishlist
      const remoteWishlist = await wishlistService.getWishlist(user.id);
      if (remoteWishlist.success !== false) {
        setWishlist(remoteWishlist.data.map(item => ({
          id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.thumbnail,
          wishlist_item_id: item.wishlist_item_id,
        })));
      }
    } catch (error) {
      console.error('Toggle wishlist failed:', error);
      toast('Failed to update wishlist.', { type: 'error' });
    }
  };
  const updateQuantity = async (productId, quantity, selectedColor = null) => {
    // Stock limit validation
    const targetItem = cart.find(i => 
      (i.id == productId || i.product_id == productId || String(i.id) === String(productId) || String(i.product_id) === String(productId)) && 
      ((!selectedColor && !i.selectedColor) || i.selectedColor === selectedColor || i.variant_value === selectedColor)
    );
    const availableStock = targetItem?.stock_quantity !== undefined ? Number(targetItem.stock_quantity) : 25;
    if (quantity > availableStock) {
      toast(`Only ${availableStock} units available in stock.`, { type: 'warning' });
      quantity = availableStock;
    }

    if (quantity <= 0) {
      return removeFromCart(productId, selectedColor);
    }

    // 1. Instant optimistic local cart update (zero lag for UI stepper)
    setCart(prevCart => prevCart.map(item => 
      ((item.id == productId || item.product_id == productId || String(item.id) === String(productId) || String(item.product_id) === String(productId)) && 
       ((!selectedColor && !item.selectedColor) || item.selectedColor === selectedColor || item.variant_value === selectedColor))
        ? { ...item, quantity } 
        : item
    ));

    const cartItemId = targetItem?.cart_item_id || targetItem?.id || productId;

    if (user?.id) {
      try {
        const res = await cartService.updateQuantity(cartItemId, quantity);
        if (res.success !== false) {
          const remoteCart = await cartService.getCart(user.id);
          if (remoteCart?.success && Array.isArray(remoteCart.data)) {
            setCart(remoteCart.data.map(item => ({
              id: item.product_id || item.id,
              product_id: item.product_id || item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.thumbnail,
              variant_id: item.variant_id,
              selectedColor: item.variant_value || null,
              variant_value: item.variant_value || null,
              cart_item_id: item.cart_item_id || item.id,
              category_name: item.category_name || null,
              tags: item.tags || null,
              stock_quantity: item.stock_quantity !== undefined ? item.stock_quantity : availableStock
            })));
          }
        } else {
          toast(res.error || 'Failed to update quantity.', { type: 'error' });
        }
      } catch (error) {
        console.error("Update quantity failed:", error);
      }
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId && item.product_id !== productId));
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId || item.product_id === productId);
  };

  const addToCompare = (product) => {
    setCompareItems(prev => {
      if (prev.some(item => item.product_id === product.product_id)) return prev;
      if (prev.length >= 3) {
        toast('You can only compare up to 3 items.', { type: 'warning' });
        return prev;
      }
      toast('Added to comparison.', { type: 'success' });
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(item => item.product_id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCart = (productId, selectedColor = undefined) => {
    return cart.some(item => {
      const isSameProduct = item.id == productId || item.product_id == productId || String(item.id) === String(productId) || String(item.product_id) === String(productId);
      if (!isSameProduct) return false;
      if (selectedColor === undefined) return true;
      const itemColor = item.selectedColor || item.variant_value || null;
      const targetColor = selectedColor || null;
      return itemColor === targetColor;
    });
  };

  // Centralized calculations using appliedCoupon
  const cartSummary = cartService.calculateCartSummary(cart, appliedCoupon);
  const cartCount = cartSummary.totalItems;
  const cartTotal = cartSummary.finalTotal;
  const cartSubtotal = cartSummary.subtotal;

  const translateRecipient = (rec) => {
    if (!rec) return '';
    const clean = rec.toLowerCase().trim();
    if (clean === 'him' || clean === 'for him') return t('for_him');
    if (clean === 'her' || clean === 'for her') return t('for_her');
    if (clean === 'couples' || clean === 'couples & both') return t('couples_both');
    if (clean === 'kids' || clean === 'for kids & teens') return t('for_kids_teens');
    if (clean === 'friends' || clean === 'for friends & coworkers') return t('for_friends_coworkers');
    if (clean === 'self' || clean === 'self-care & treat yourself') return t('self_care');
    return rec;
  };

  const translateOccasion = (occ) => {
    if (!occ) return '';
    const clean = occ.toLowerCase().trim();
    if (clean === 'birthday' || clean === 'birthdays') return t('birthdays');
    if (clean === 'anniversary' || clean === 'anniversaries') return t('anniversaries');
    if (clean === 'housewarming') return t('housewarming');
    if (clean === 'graduation') return t('graduation');
    if (clean === 'wedding' || clean === 'weddings & bridal') return t('weddings_bridal');
    if (clean === 'festival' || clean === 'festivals & holidays') return t('festivals_holidays');
    if (clean === 'corporate' || clean === 'corporate & milestones') return t('corporate_milestones');
    return occ;
  };

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      removeMultipleFromCart,
      updateQuantity,
      clearCart,
      moveToCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      isInCart,
      cartCount,
      cartTotal,
      cartSubtotal,
      cartSummary,
      compareItems,
      addToCompare,
      removeFromCompare,
      clearCompare,
      cartDrawerOpen,
      setCartDrawerOpen,
      wishlistDrawerOpen,
      setWishlistDrawerOpen,
      cartFlyAnim,
      setCartFlyAnim,
      triggerAddToCartAnimation: (product) => setCartFlyAnim({ id: Date.now(), product }),
      countriesList,
      selectedCountry,
      changeCountry,
      formatPrice,
      convertPrice,
      language,
      languagesList,
      supportedLanguages,
      changeLanguage,
      t,
      translateRecipient,
      translateOccasion
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
