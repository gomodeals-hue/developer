import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Tag, 
  Percent, 
  Clock, 
  ShoppingBag, 
  Check, 
  Plus, 
  Trash2, 
  X, 
  AlertCircle,
  HelpCircle,
  FileText,
  Lock,
  RefreshCw,
  Zap,
  Landmark
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { orderService } from "../../services/orderService";
import { addressService } from "../../services/addressService";
import "./CheckoutPage.css";

const DELIVERY_SLOTS = [
  { id: "tomorrow-afternoon", label: "Tomorrow by 2:00 PM – 6:00 PM", badge: "Recommended" },
  { id: "tomorrow-morning", label: "Tomorrow Morning (8:00 AM – 12:00 PM)", badge: "Morning Express" },
  { id: "tomorrow-evening", label: "Tomorrow Evening (6:00 PM – 9:00 PM)", badge: "Evening" },
  { id: "standard-2days", label: "Standard Delivery (2–3 Days)", badge: "Eco Delivery" }
];

const POPULAR_BANKS = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "icici", name: "ICICI Bank" },
  { id: "sbi", name: "State Bank of India" },
  { id: "axis", name: "Axis Bank" },
  { id: "kotak", name: "Kotak Mahindra" }
];

const ALL_BANKS = [
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India (SBI)",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank (PNB)",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "IndusInd Bank",
  "Yes Bank",
  "Federal Bank",
  "IDFC First Bank"
];

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart, formatPrice } = useShop();
  const { user } = useAuth();
  const { toast } = useToast();

  // Retrieve checkout products
  const buyNowProduct = location?.state?.buyNowProduct;
  const checkoutItems = location?.state?.checkoutItems;

  const [items, setItems] = useState(() => {
    if (buyNowProduct) return [buyNowProduct];
    if (checkoutItems && checkoutItems.length > 0) return checkoutItems;
    return cart || [];
  });

  useEffect(() => {
    if (buyNowProduct) {
      setItems([buyNowProduct]);
    } else if (checkoutItems && checkoutItems.length > 0) {
      setItems(checkoutItems);
    } else {
      setItems(cart || []);
    }
  }, [buyNowProduct, checkoutItems, cart]);

  // Customer info fallback
  const customerName = user?.name || user?.username || "Saranyan E";
  const customerEmail = user?.email || "saranyan@gomodeals.com";
  const customerPhone = user?.phone || "+91 98765 43210";

  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: "addr_1",
      full_name: customerName,
      type: "Home",
      tag: "Default / Home",
      street: "123 Anna Salai, Guindy",
      city: "Chennai",
      state: "Tamil Nadu",
      postal_code: "600032",
      phone: customerPhone,
      is_default: true
    },
    {
      id: "addr_2",
      full_name: customerName,
      type: "Work",
      tag: "Work / Office",
      street: "Block 4, DLF IT Park, Mount Poonamallee Road, Manapakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      postal_code: "600089",
      phone: customerPhone,
      is_default: false
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState("addr_1");

  // Delivery slot state
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0]);
  const [isChangingSlot, setIsChangingSlot] = useState(false);

  // Gift wrapping state
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' | 'cod' | 'netbanking' | 'cards'
  const [upiId, setUpiId] = useState(`${customerEmail.split("@")[0]}@okaxis`);
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // COD Captcha state
  const [captchaCode, setCaptchaCode] = useState("7K4M");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  // Net banking state
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState(customerName);

  // Promo code state
  const [promoInput, setPromoInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: "GOMO20",
    discount_percent: 20,
    label: "Flat 20% Discount Applied"
  });

  // Modals state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    full_name: customerName,
    type: "Home",
    street: "",
    city: "Chennai",
    state: "Tamil Nadu",
    postal_code: "",
    phone: customerPhone
  });

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Floating Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Generate dynamic captcha code
  const refreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
    setIsCaptchaValid(false);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  // Update item quantity
  const handleUpdateQty = (index, delta) => {
    setItems((prev) =>
      prev
        .map((item, idx) => {
          if (idx === index) {
            const newQty = Math.max(1, (item.quantity || 1) + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Bill calculations
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const p = Number(item.price || 0);
      return acc + p * (item.quantity || 1);
    }, 0);
  }, [items]);

  const totalMrp = useMemo(() => {
    return items.reduce((acc, item) => {
      const m = Number(item.mrp || Math.round(Number(item.price || 0) * 1.25));
      return acc + m * (item.quantity || 1);
    }, 0);
  }, [items]);

  const productSavings = Math.max(0, totalMrp - subtotal);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discount_amount) return Number(appliedCoupon.discount_amount);
    if (appliedCoupon.discount_percent) {
      return Math.round((subtotal * appliedCoupon.discount_percent) / 100);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const giftWrapFee = isGiftWrapped ? 30 : 0;
  const platformFee = 0; // FREE promotional
  const deliveryFee = 0; // FREE express
  const gst = Math.round(subtotal * 0.05);

  const finalTotal = Math.max(0, subtotal + giftWrapFee - couponDiscount);
  const totalSavings = productSavings + couponDiscount + 99; // 99 free shipping value

  // Verify UPI handler
  const handleVerifyUpi = () => {
    if (!upiId || !upiId.includes("@")) {
      showToast("Please enter a valid UPI VPA (e.g. mobile@upi or username@bank)");
      return;
    }
    setIsUpiVerified(true);
    showToast(`UPI ID "${upiId}" verified successfully! ✓`);
  };

  // Apply promo code handler
  const handleApplyPromo = () => {
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === "GOMO20") {
      setAppliedCoupon({
        code: "GOMO20",
        discount_percent: 20,
        label: "20% Instant Festive Discount"
      });
      showToast("Coupon GOMO20 applied: 20% discount unlocked!");
      setPromoInput("");
    } else if (clean === "FESTIVE500") {
      if (subtotal < 2000) {
        showToast("FESTIVE500 requires minimum order value of ₹2,000.");
        return;
      }
      setAppliedCoupon({
        code: "FESTIVE500",
        discount_amount: 500,
        label: "Flat ₹500 Festive Savings"
      });
      showToast("Coupon FESTIVE500 applied: Flat ₹500 savings!");
      setPromoInput("");
    } else if (clean === "FREESHIP") {
      setAppliedCoupon({
        code: "FREESHIP",
        discount_amount: 0,
        label: "Free Express Shipping Applied"
      });
      showToast("FREESHIP coupon applied!");
      setPromoInput("");
    } else {
      showToast(`Coupon "${clean}" is invalid or expired.`);
    }
  };

  // Add new address handler
  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddressForm.street || !newAddressForm.postal_code) {
      showToast("Please complete the address and PIN code.");
      return;
    }

    const newId = `addr_${Date.now()}`;
    const newEntry = {
      id: newId,
      full_name: newAddressForm.full_name || customerName,
      type: newAddressForm.type,
      tag: `${newAddressForm.type}`,
      street: newAddressForm.street,
      city: newAddressForm.city || "Chennai",
      state: newAddressForm.state || "Tamil Nadu",
      postal_code: newAddressForm.postal_code,
      phone: newAddressForm.phone || customerPhone,
      is_default: false
    };

    setAddresses((prev) => [...prev, newEntry]);
    setSelectedAddressId(newId);
    setIsAddAddressOpen(false);
    showToast("New delivery address added & selected!");
  };

  // Main Action: BUY NOW - PLACE ORDER
  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      showToast("No products found in checkout.");
      return;
    }

    // If COD, check captcha
    if (paymentMethod === "cod") {
      if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
        showToast("Invalid security Captcha. Please enter the code shown.");
        return;
      }
    }

    const activeAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

    const orderPayload = {
      customer_id: user?.id || user?._id || "cust_saranyan",
      customer_name: customerName,
      customer_email: customerEmail,
      delivery_address: activeAddress,
      items: items.map((item) => ({
        product_id: item.product_id || item.id,
        id: item.product_id || item.id,
        name: item.name || item.title,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
        thumbnail: item.thumbnail || item.image || "",
        selectedSize: item.selectedSize || "Standard",
        selectedColor: item.selectedColor || null
      })),
      subtotal,
      discount: couponDiscount,
      total_amount: finalTotal,
      tax: gst,
      shipping_fee: deliveryFee,
      shipping_method: "express",
      payment_method: paymentMethod.toUpperCase(),
      payment_status: paymentMethod === "cod" ? "Pending (Cash on Delivery)" : "Paid",
      coupon_code: appliedCoupon?.code || null,
      delivery_slot: selectedSlot.label,
      is_gift_wrapped: isGiftWrapped,
      gift_note: giftNote
    };

    try {
      const createdOrder = await orderService.createOrder(orderPayload);

      // If bought from regular cart, clean up checked out items
      if (!buyNowProduct) {
        items.forEach((it) => {
          removeFromCart(it.product_id || it.id);
        });
      }

      showToast("Order confirmed! Redirecting to receipt...");
      setTimeout(() => {
        navigate("/order-success", {
          state: {
            order: createdOrder,
            orderId: createdOrder.order_id || createdOrder.id,
            orderNumber: createdOrder.order_number
          }
        });
      }, 700);
    } catch (err) {
      console.error("Failed to place order:", err);
      showToast("There was an error processing your order. Please try again.");
    }
  };

  // Secondary Action: BUY LATER (MOVE TO CART / SAVE FOR LATER)
  const handleBuyLater = () => {
    if (buyNowProduct) {
      addToCart(buyNowProduct, buyNowProduct.quantity || 1);
      showToast("Item preserved in your cart for later session!");
      setTimeout(() => {
        navigate("/cart");
      }, 800);
    } else {
      showToast("All items preserved in your cart!");
      navigate("/cart");
    }
  };

  // Empty checkout state
  if (items.length === 0) {
    return (
      <div className="gomo-checkout-page min-h-[75vh] flex flex-col items-center justify-center px-6 py-20 text-center bg-[#faf8f5]">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Your Checkout Queue is Empty</h2>
        <p className="text-stone-500 text-sm max-w-md mb-6">
          Looks like you haven't selected any items for instant checkout yet.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
        >
          Explore Boutique Products
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="gomo-checkout-page bg-[#faf8f5] text-stone-700 min-h-screen font-sans antialiased flex flex-col justify-between">
      {/* Top Navigation Bar with GoMo Deals Theme */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
              G
            </div>
            <div>
              <strong className="block text-stone-900 text-sm sm:text-base font-bold tracking-tight">
                GoMo Deals
              </strong>
              <span className="block text-[10px] text-orange-600 font-semibold uppercase tracking-wider">
                Instant Checkout
              </span>
            </div>
          </Link>

          {/* Checkout Stepper (Cart -> Delivery & Pay -> Review) */}
          <nav aria-label="Progress" className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link
              to="/cart"
              className="flex items-center text-xs font-semibold text-emerald-600 gap-1.5 hover:underline"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[11px] font-bold">
                ✓
              </span>
              <span>Cart</span>
            </Link>
            <span className="w-6 h-0.5 bg-emerald-300"></span>
            <div className="flex items-center text-xs font-bold text-orange-600 gap-1.5">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[11px]">
                2
              </span>
              <span>Delivery &amp; Pay</span>
            </div>
            <span className="w-6 h-0.5 bg-stone-200"></span>
            <div className="flex items-center text-xs font-medium text-stone-400 gap-1.5">
              <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Order Receipt</span>
            </div>
          </nav>

          {/* Secure Trust Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline font-semibold text-stone-800">256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Checkout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Top Notice / Announcement Banner */}
        <div className="mb-6 p-3.5 bg-orange-50/80 border border-orange-200/90 rounded-2xl flex items-center justify-between text-xs text-orange-950 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Tag size={14} />
            </div>
            <span className="font-semibold">
              Special Offer: Free Express Doorstep Delivery &amp; 15-Day Quality Guarantee Applied to this Order!
            </span>
          </div>
          <span className="hidden sm:inline text-[11px] font-bold text-orange-700 bg-white/80 px-2.5 py-1 rounded-md border border-orange-200">
            GoMo Assured
          </span>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Checkout Flow (7 / 12 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* SECTION 1: Product Summary in Short */}
            <section className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base font-bold text-stone-900 tracking-tight">
                    Order Item(s) Preview
                  </h2>
                </div>
                <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item, idx) => {
                  const itImg =
                    item.thumbnail ||
                    item.image ||
                    item.pi_images?.[0]?.image_url ||
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80";
                  const itPrice = Number(item.price || 0);
                  const itMrp = Number(item.mrp || Math.round(itPrice * 1.25));

                  return (
                    <div
                      key={item.product_id || item.id || idx}
                      className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-3.5 bg-stone-50/70 border border-stone-200/80 rounded-xl"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-3.5 w-full sm:w-auto">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0 overflow-hidden bg-white border border-stone-200 shadow-2xs">
                          <img
                            src={itImg}
                            alt={item.name || item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80";
                            }}
                          />
                        </div>

                        <div className="space-y-1 flex-grow">
                          <h4
                            className="font-bold text-xs sm:text-sm text-stone-900 leading-snug line-clamp-1"
                            title={item.name || item.title}
                          >
                            {item.name || item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-stone-500 flex-wrap">
                            <span className="font-medium text-stone-700">
                              {item.brand || "GoMo Select"}
                            </span>
                            <span>•</span>
                            <span>{item.category || "Apparel"}</span>
                            {item.selectedSize && (
                              <>
                                <span>•</span>
                                <span className="font-semibold text-stone-800">
                                  Size: {item.selectedSize}
                                </span>
                              </>
                            )}
                            {item.selectedColor?.name && (
                              <>
                                <span>•</span>
                                <span className="font-semibold text-stone-800">
                                  Color: {item.selectedColor.name}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-3 pt-1">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-stone-200 bg-white rounded-md overflow-hidden text-xs">
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(idx, -1)}
                                className="px-2 py-0.5 hover:bg-stone-100 text-stone-600 font-bold"
                              >
                                -
                              </button>
                              <span className="px-2 font-bold text-stone-800">
                                {item.quantity || 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(idx, 1)}
                                className="px-2 py-0.5 hover:bg-stone-100 text-stone-600 font-bold"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                              In Stock · Dispatches Today
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Delivery Short Tag */}
                      <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200 shrink-0">
                        <div className="text-sm font-extrabold text-stone-900">
                          {formatPrice(itPrice * (item.quantity || 1))}
                        </div>
                        {itMrp > itPrice && (
                          <div className="text-[11px] text-stone-400 line-through">
                            {formatPrice(itMrp * (item.quantity || 1))}
                          </div>
                        )}
                        <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                          Free Express Delivery
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Gift Wrapping / Delivery Instruction Option */}
              <div className="mt-4 pt-3.5 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-600 border-stone-300 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-stone-700">
                    Add Premium Gift Wrapping &amp; Custom Greeting Card (+₹30)
                  </span>
                </label>
                {isGiftWrapped && (
                  <div className="mt-2.5 pl-6">
                    <input
                      type="text"
                      placeholder="Write your greeting note / delivery message here..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full text-xs p-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 2: Delivery Address Selection */}
            <section className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-base font-bold text-stone-900 tracking-tight">
                    Select Delivery Address
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(true)}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Address Cards Radio Options */}
              <div className="space-y-3.5" id="addressList">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <label
                      key={addr.id}
                      className={`relative flex items-start p-4 rounded-xl cursor-pointer transition border-2 ${
                        isSelected
                          ? "border-orange-600 bg-orange-50/30 shadow-2xs"
                          : "border-stone-200 hover:border-stone-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery_address"
                        value={addr.id}
                        checked={isSelected}
                        onChange={() => {
                          setSelectedAddressId(addr.id);
                          showToast(`Delivery address set to: ${addr.tag}`);
                        }}
                        className="gomo-custom-radio w-4 h-4 mt-1 border-2 border-stone-300 rounded-full appearance-none checked:border-orange-600 checked:bg-orange-600 shrink-0 cursor-pointer"
                      />
                      <div className="ml-3.5 flex-grow">
                        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-stone-900">
                              {addr.full_name}
                            </span>
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-900 text-[10px] font-bold rounded uppercase tracking-wider">
                              {addr.tag}
                            </span>
                          </div>
                          {addr.is_default && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Default Address
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-600 leading-relaxed mb-1">
                          {addr.street}, {addr.city}, {addr.state} – {addr.postal_code}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                          <span>Phone: {addr.phone}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Estimated Delivery Slot Selection */}
              <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-stone-800">Guaranteed Delivery Slot:</span>
                  <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {selectedSlot.label}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChangingSlot(!isChangingSlot)}
                  className="text-orange-600 font-bold hover:underline cursor-pointer"
                >
                  {isChangingSlot ? "Close" : "[Change Slot]"}
                </button>
              </div>

              {/* Slot Options Dropdown */}
              {isChangingSlot && (
                <div className="mt-2 p-3 bg-white border border-stone-200 rounded-xl space-y-2">
                  {DELIVERY_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setIsChangingSlot(false);
                        showToast(`Delivery slot updated to: ${slot.label}`);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                        selectedSlot.id === slot.id
                          ? "bg-orange-50 border border-orange-300 font-bold text-orange-900"
                          : "hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      <span>{slot.label}</span>
                      <span className="text-[10px] text-stone-400 uppercase font-semibold">
                        {slot.badge}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* SECTION 3: Payment Method Selection */}
            <section className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-base font-bold text-stone-900 tracking-tight">
                    Select Payment Method
                  </h2>
                </div>
                <span className="text-xs text-stone-500 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  100% Secure Transfer
                </span>
              </div>

              <div className="space-y-3" id="paymentAccordion">
                {/* 1. UPI Payment Option */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "upi"
                      ? "border-orange-500 bg-orange-50/20"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                  id="card-upi"
                >
                  <label
                    className="flex items-center justify-between p-4 cursor-pointer select-none"
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="gomo-custom-radio w-4 h-4 border-2 border-stone-300 rounded-full appearance-none checked:border-orange-600 checked:bg-orange-600 shrink-0 cursor-pointer"
                      />
                      <div className="font-bold text-xs sm:text-sm text-stone-800 flex items-center gap-2">
                        <span>UPI — Google Pay, PhonePe, Paytm, BHIM</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded">
                          FASTEST
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px]">GPay</span>
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px]">PhonePe</span>
                    </div>
                  </label>

                  <div
                    className={`payment-body ${
                      paymentMethod === "upi" ? "active" : ""
                    } px-4 pb-4 pt-1 border-t border-stone-100`}
                    id="body-upi"
                  >
                    <p className="text-xs text-stone-600 mb-2.5">
                      Enter your Virtual Payment Address (VPA) / UPI ID:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. mobile@upi or username@bank"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setIsUpiVerified(false);
                        }}
                        className="flex-grow text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-stone-900"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyUpi}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                          isUpiVerified
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-900 hover:bg-stone-800 text-white"
                        }`}
                      >
                        {isUpiVerified ? "Verified ✓" : "Verify VPA"}
                      </button>
                    </div>
                    {isUpiVerified && (
                      <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                        <Check size={13} strokeWidth={3} /> VPA Verified! Payment prompt will be sent upon placing order.
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. Cash on Delivery (COD) */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "cod"
                      ? "border-orange-500 bg-orange-50/20"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                  id="card-cod"
                >
                  <label
                    className="flex items-center justify-between p-4 cursor-pointer select-none"
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="gomo-custom-radio w-4 h-4 border-2 border-stone-300 rounded-full appearance-none checked:border-orange-600 checked:bg-orange-600 shrink-0 cursor-pointer"
                      />
                      <div className="font-bold text-xs sm:text-sm text-stone-800 flex items-center gap-2">
                        <span>Cash on Delivery (COD)</span>
                        <span className="text-stone-500 text-xs font-normal">
                          [Pay at Doorstep via Cash or UPI QR]
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      ₹0 Extra Fee
                    </span>
                  </label>

                  <div
                    className={`payment-body ${
                      paymentMethod === "cod" ? "active" : ""
                    } px-4 pb-4 pt-1 border-t border-stone-100`}
                    id="body-cod"
                  >
                    <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200/80 text-xs text-amber-900 mb-3">
                      <strong>Delivery Notice:</strong> Cash and QR-code UPI payment accepted by delivery executive at your doorstep. Please enter the verification code below to confirm:
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-9 px-3 bg-stone-200 rounded-lg flex items-center gap-2 text-xs font-mono font-black tracking-widest text-stone-900 select-none">
                        <span>{captchaCode}</span>
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          title="Refresh code"
                          className="text-stone-500 hover:text-stone-800 p-0.5"
                        >
                          <RefreshCw size={12} />
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="Enter 4-character code"
                        value={captchaInput}
                        onChange={(e) => {
                          setCaptchaInput(e.target.value);
                          setIsCaptchaValid(e.target.value.toUpperCase() === captchaCode.toUpperCase());
                        }}
                        className="w-44 text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase font-mono"
                      />
                      {isCaptchaValid && (
                        <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                          <Check size={14} /> Confirmed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Net Banking */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "netbanking"
                      ? "border-orange-500 bg-orange-50/20"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                  id="card-netbanking"
                >
                  <label
                    className="flex items-center justify-between p-4 cursor-pointer select-none"
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={() => setPaymentMethod("netbanking")}
                        className="gomo-custom-radio w-4 h-4 border-2 border-stone-300 rounded-full appearance-none checked:border-orange-600 checked:bg-orange-600 shrink-0 cursor-pointer"
                      />
                      <div className="font-bold text-xs sm:text-sm text-stone-800">
                        <span>Net Banking — All Major Banks</span>
                      </div>
                    </div>
                    <span className="text-xs text-stone-400">Direct Bank Portal</span>
                  </label>

                  <div
                    className={`payment-body ${
                      paymentMethod === "netbanking" ? "active" : ""
                    } px-4 pb-4 pt-1 border-t border-stone-100`}
                    id="body-netbanking"
                  >
                    <p className="text-xs text-stone-500 mb-2">Select your financial institution:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
                      {POPULAR_BANKS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setSelectedBank(b.name);
                            showToast(`Selected: ${b.name}`);
                          }}
                          className={`p-2 border rounded-lg text-xs font-semibold text-center transition cursor-pointer ${
                            selectedBank === b.name
                              ? "border-orange-500 bg-orange-50 text-orange-950 font-bold"
                              : "border-stone-200 hover:border-orange-300 text-stone-700 bg-white"
                          }`}
                        >
                          <span className="block text-sm mb-1">{b.logo}</span>
                          <span className="truncate block">{b.name}</span>
                        </button>
                      ))}
                    </div>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-700"
                    >
                      {ALL_BANKS.map((bnk) => (
                        <option key={bnk} value={bnk}>
                          {bnk}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Credit / Debit / ATM Cards */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "cards"
                      ? "border-orange-500 bg-orange-50/20"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                  id="card-cards"
                >
                  <label
                    className="flex items-center justify-between p-4 cursor-pointer select-none"
                    onClick={() => setPaymentMethod("cards")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cards"
                        checked={paymentMethod === "cards"}
                        onChange={() => setPaymentMethod("cards")}
                        className="gomo-custom-radio w-4 h-4 border-2 border-stone-300 rounded-full appearance-none checked:border-orange-600 checked:bg-orange-600 shrink-0 cursor-pointer"
                      />
                      <div className="font-bold text-xs sm:text-sm text-stone-800">
                        <span>Credit / Debit / ATM Cards</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 text-xs text-stone-500">
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] font-bold">Visa</span>
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] font-bold">Mastercard</span>
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] font-bold">RuPay</span>
                    </div>
                  </label>

                  <div
                    className={`payment-body ${
                      paymentMethod === "cards" ? "active" : ""
                    } px-4 pb-4 pt-1 border-t border-stone-100`}
                    id="body-cards"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                            setCardNumber(val);
                          }}
                          className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                            Valid Thru
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM / YY"
                            value={cardExpiry}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "");
                              if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2, 4)}`;
                              setCardExpiry(v);
                            }}
                            className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Bill & Sticky Actions (5 / 12 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* BILL / PRICE DETAILS CARD */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm">
              {/* Coupon / Promo Section */}
              <div className="mb-5 pb-5 border-b border-stone-100">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Have a Promo / Discount Coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. GOMO20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="uppercase flex-grow text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono placeholder-stone-400 text-stone-900"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-2xs"
                  >
                    Apply
                  </button>
                </div>

                {/* Applied Coupon Badge */}
                {appliedCoupon && (
                  <div className="mt-2.5 flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold">{appliedCoupon.code}</span>
                      <span className="text-[11px] text-emerald-700">({appliedCoupon.label})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-emerald-700">
                        -{formatPrice(couponDiscount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedCoupon(null);
                          showToast("Coupon removed.");
                        }}
                        className="text-stone-400 hover:text-rose-600 p-0.5"
                        title="Remove coupon"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-stone-900 tracking-tight uppercase">
                  Price Breakdown &amp; Bill
                </h3>
                <span className="text-[11px] font-semibold text-stone-500">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Price Line Items */}
              <div className="space-y-3 text-xs text-stone-600">
                {/* Product Price */}
                <div className="flex justify-between items-center">
                  <span>Price of Product(s):</span>
                  <div className="flex items-center gap-2">
                    {totalMrp > subtotal && (
                      <span className="text-stone-400 text-[11px] line-through">
                        {formatPrice(totalMrp)}
                      </span>
                    )}
                    <span className="font-semibold text-stone-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                {/* Product Discount */}
                {productSavings > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-semibold">
                    <span>Product Catalog Discount:</span>
                    <span>-{formatPrice(productSavings)}</span>
                  </div>
                )}

                {/* Coupon Savings */}
                {couponDiscount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-semibold">
                    <span>Coupon Savings ({appliedCoupon?.code}):</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                {/* Gift Wrap */}
                {isGiftWrapped && (
                  <div className="flex justify-between items-center">
                    <span>Gift Wrapping &amp; Card:</span>
                    <span className="font-semibold text-stone-800">+₹30</span>
                  </div>
                )}

                {/* Platform Fee */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span>Platform Fee:</span>
                    <span className="cursor-help text-stone-400" title="GoMo verified standard checkout">
                      ⓘ
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400 line-through text-[11px]">₹19</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold text-[10px]">
                      FREE
                    </span>
                  </div>
                </div>

                {/* Delivery / Shipping Charges */}
                <div className="flex justify-between items-center">
                  <span>Delivery / Freight Charges:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400 line-through text-[11px]">₹99</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold text-[10px]">
                      FREE
                    </span>
                  </div>
                </div>

                {/* Taxes */}
                <div className="flex justify-between items-center">
                  <span>Estimated Taxes &amp; GST:</span>
                  <span className="font-semibold text-stone-800">
                    Included ({formatPrice(gst)})
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-stone-200 pt-3 mt-3"></div>

                {/* Final Total Price */}
                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="text-sm font-extrabold text-stone-900 block">
                      Final Total Amount
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      Inclusive of all taxes &amp; services
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-black text-stone-900">
                      {formatPrice(finalTotal)}
                    </div>
                    {totalSavings > 0 && (
                      <span className="text-[10.5px] text-emerald-600 font-bold block mt-0.5">
                        Total Savings: {formatPrice(totalSavings)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Area */}
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-3">
                {/* Buy Now Button (Primary) */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>BUY NOW — PLACE ORDER ({formatPrice(finalTotal)})</span>
                </button>

                {/* Buy Later Button (Secondary / Save for Later) */}
                <button
                  type="button"
                  onClick={handleBuyLater}
                  className="w-full py-3 px-4 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-700 font-bold text-xs rounded-xl border border-stone-300 hover:border-stone-400 transition flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <Clock size={15} className="text-stone-500" />
                  <span>BUY LATER (SAVE TO CART / FOR LATER)</span>
                </button>
              </div>

              {/* Reassurance & Trust Badges */}
              <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-center text-[11px] text-stone-600 font-semibold">
                <div className="p-2.5 rounded-xl bg-stone-50 flex flex-col items-center gap-1 border border-stone-100">
                  <ShieldCheck size={18} className="text-orange-500" />
                  <span>100% Buyer Protection</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 flex flex-col items-center gap-1 border border-stone-100">
                  <RotateCcw size={18} className="text-orange-500" />
                  <span>15-Day Easy Returns</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 flex flex-col items-center gap-1 border border-stone-100">
                  <Zap size={18} className="text-orange-500" />
                  <span>Instant 24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Help & Cancellation Policy Links */}
            <div className="text-center text-xs text-stone-400 space-x-2">
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(true)}
                className="hover:underline hover:text-stone-700 cursor-pointer"
              >
                Cancellation Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setIsHelpModalOpen(true)}
                className="hover:underline hover:text-stone-700 cursor-pointer"
              >
                Need Help with Checkout?
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Toast Notification Box */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-stone-700 max-w-sm text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0 text-white font-bold">
              ✓
            </div>
            <div className="font-semibold flex-grow">{toastMessage}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD NEW ADDRESS MODAL */}
      <AnimatePresence>
        {isAddAddressOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-stone-200 relative"
            >
              <button
                type="button"
                onClick={() => setIsAddAddressOpen(false)}
                className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-bold text-stone-900 mb-1">Add New Delivery Address</h3>
              <p className="text-xs text-stone-500 mb-5">
                Enter your exact shipping destination for doorstep delivery.
              </p>

              <form onSubmit={handleSaveNewAddress} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddressForm.full_name}
                    onChange={(e) =>
                      setNewAddressForm((p) => ({ ...p, full_name: e.target.value }))
                    }
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Street Address &amp; Landmark
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat No., Street, Area, Landmark"
                    value={newAddressForm.street}
                    onChange={(e) =>
                      setNewAddressForm((p) => ({ ...p, street: e.target.value }))
                    }
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddressForm.city}
                      onChange={(e) =>
                        setNewAddressForm((p) => ({ ...p, city: e.target.value }))
                      }
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="600032"
                      value={newAddressForm.postal_code}
                      onChange={(e) =>
                        setNewAddressForm((p) => ({
                          ...p,
                          postal_code: e.target.value.replace(/\D/g, "")
                        }))
                      }
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Address Label / Type
                  </label>
                  <div className="flex gap-3">
                    {["Home", "Work", "Other"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setNewAddressForm((p) => ({ ...p, type: t }))}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                          newAddressForm.type === t
                            ? "bg-orange-50 border-orange-500 text-orange-950"
                            : "border-stone-300 text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddAddressOpen(false)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Save &amp; Deliver Here
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANCELLATION POLICY MODAL */}
      <AnimatePresence>
        {isPolicyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 relative"
            >
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(false)}
                className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-bold text-stone-900 mb-2 flex items-center gap-2">
                <FileText size={18} className="text-orange-600" />
                GoMo Deals Cancellation &amp; Return Policy
              </h3>
              <div className="text-xs text-stone-600 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-1">
                <p>
                  <strong>Instant 1-Click Cancellation:</strong> You can cancel your order any time before it is dispatched directly from your <strong>My Orders</strong> tab with 100% refund.
                </p>
                <p>
                  <strong>15-Day Doorstep Replacement &amp; Returns:</strong> If you receive a damaged, defective, or incorrect product, our courier partner will collect it from your doorstep at zero extra cost.
                </p>
                <p>
                  <strong>Instant Refunds:</strong> Once picked up or verified, refunds are credited back to your original source account (UPI / Bank / Card) within 24 to 48 hours.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPolicyModalOpen(false)}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NEED HELP MODAL */}
      <AnimatePresence>
        {isHelpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-stone-200 relative text-center"
            >
              <button
                type="button"
                onClick={() => setIsHelpModalOpen(false)}
                className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3 mx-auto">
                <HelpCircle size={26} />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">Need Help with Checkout?</h3>
              <p className="text-xs text-stone-500 mb-4">
                Our support desk is active 24/7 to assist with payment and order placement.
              </p>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-left text-xs space-y-2 mb-4">
                <div>
                  <strong>Toll-Free Helpline:</strong>{" "}
                  <span className="text-orange-600 font-bold">1800-420-GOMO</span>
                </div>
                <div>
                  <strong>Support Email:</strong> support@gomodeals.com
                </div>
                <div>
                  <strong>Live Chat:</strong> Tap the orange chat bubble at the bottom right anytime.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsHelpModalOpen(false)}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg"
              >
                Continue Checkout
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;