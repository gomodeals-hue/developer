import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { animate } from "animejs";
import { 
  ArrowLeft,
  ArrowRight,
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
import SlideCommit from "../common/SlideCommit";
import { paymentService } from "../../services/paymentService";
import UpiPaymentSection from "./payments/UpiPaymentSection";
import DebitCardSection from "./payments/DebitCardSection";
import CreditCardSection from "./payments/CreditCardSection";
import CodSection from "./payments/CodSection";
import BankOtpModal from "./payments/BankOtpModal";
import "./CheckoutPage.css";

const DELIVERY_SLOTS = [
  { id: "tomorrow-afternoon", label: "Tomorrow by 2:00 PM – 6:00 PM", badge: "Recommended" },
  { id: "tomorrow-morning", label: "Tomorrow Morning (8:00 AM – 12:00 PM)", badge: "Morning Express" },
  { id: "tomorrow-evening", label: "Tomorrow Evening (6:00 PM – 9:00 PM)", badge: "Evening" },
  { id: "standard-2days", label: "Standard Delivery (2–3 Days)", badge: "Eco Delivery" }
];

const POPULAR_BANKS = [
  { id: "hdfc", name: "HDFC Bank", short: "HDFC", logo: "🏛️" },
  { id: "icici", name: "ICICI Bank", short: "ICICI", logo: "🏦" },
  { id: "sbi", name: "State Bank of India (SBI)", short: "SBI", logo: "🏢" },
  { id: "axis", name: "Axis Bank", short: "AXIS", logo: "🏛️" },
  { id: "kotak", name: "Kotak Mahindra Bank", short: "KOTAK", logo: "🏦" }
];

const ALL_BANKS = [
  "State Bank of India (SBI)",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank (PNB)",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "IndusInd Bank",
  "Yes Bank",
  "IDFC FIRST Bank",
  "Federal Bank",
  "Indian Bank",
  "Central Bank of India",
  "Indian Overseas Bank",
  "UCO Bank",
  "South Indian Bank",
  "RBL Bank",
  "Punjab & Sind Bank",
  "Karur Vysya Bank",
  "City Union Bank",
  "Bandhan Bank",
  "Standard Chartered Bank",
  "HSBC India"
];

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart, formatPrice, clearCart } = useShop();
  const { user } = useAuth();
  const { toast } = useToast();

  // Retrieve checkout products
  const buyNowProduct = location?.state?.buyNowProduct;
  const checkoutItems = location?.state?.checkoutItems;

  const [items, setItems] = useState(() => {
    if (buyNowProduct) return [buyNowProduct];
    if (checkoutItems && checkoutItems.length > 0) {
      if (cart && cart.length > 0) {
        const activeIds = new Set(cart.map(c => String(c.cart_item_id || c.product_id || c.id)));
        const filtered = checkoutItems.filter(it => 
          activeIds.has(String(it.cart_item_id || it.product_id || it.id)) ||
          activeIds.has(String(it.product_id || it.id))
        );
        return filtered;
      }
      return checkoutItems;
    }
    return cart || [];
  });

  useEffect(() => {
    if (buyNowProduct) {
      setItems([buyNowProduct]);
    } else if (checkoutItems && checkoutItems.length > 0) {
      // Validate against current cart so any product deleted from buying is never shown!
      if (cart && cart.length > 0) {
        const activeIds = new Set(cart.map(c => String(c.cart_item_id || c.product_id || c.id)));
        const filtered = checkoutItems.filter(it => 
          activeIds.has(String(it.cart_item_id || it.product_id || it.id)) ||
          activeIds.has(String(it.product_id || it.id))
        );
        setItems(filtered);
      } else {
        setItems([]);
      }
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

  // Payment method state: 'upi' | 'debit_card' | 'credit_card' | 'cod' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // UPI states
  const [upiSubMethod, setUpiSubMethod] = useState("qr"); // 'qr' | 'apps' | 'vpa'
  const [upiId, setUpiId] = useState(`${customerEmail.split("@")[0]}@okhdfcbank`);
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [upiVerifiedName, setUpiVerifiedName] = useState("");
  const [upiVerifying, setUpiVerifying] = useState(false);
  const [upiTimer, setUpiTimer] = useState(300); // 5 minutes countdown
  const [upiSelectedApp, setUpiSelectedApp] = useState("gpay");
  const [isUpiSimulating, setIsUpiSimulating] = useState(false);

  // Debit Card states
  const [debitNumber, setDebitNumber] = useState("");
  const [debitName, setDebitName] = useState(customerName);
  const [debitExpiry, setDebitExpiry] = useState("");
  const [debitCvv, setDebitCvv] = useState("");
  const [debitBank, setDebitBank] = useState("HDFC Bank");
  const [showDebitCvv, setShowDebitCvv] = useState(false);
  const [debitSave, setDebitSave] = useState(true);

  // Credit Card states
  const [creditNumber, setCreditNumber] = useState("");
  const [creditName, setCreditName] = useState(customerName);
  const [creditExpiry, setCreditExpiry] = useState("");
  const [creditCvv, setCreditCvv] = useState("");
  const [creditType, setCreditType] = useState("full"); // 'full' | 'emi'
  const [creditEmiMonths, setCreditEmiMonths] = useState(3);
  const [creditEmiBank, setCreditEmiBank] = useState("HDFC Bank");
  const [showCreditCvv, setShowCreditCvv] = useState(false);
  const [creditSave, setCreditSave] = useState(true);

  // COD states
  const [captchaCode, setCaptchaCode] = useState("7K4M");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [codPincode, setCodPincode] = useState("600032");
  const [isCodServiceable, setIsCodServiceable] = useState(true);
  const [codChecking, setCodChecking] = useState(false);

  // Net banking state
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // 3D Secure / OTP Modal states
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpModalData, setOtpModalData] = useState(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpError, setOtpError] = useState("");
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const otpResolverRef = useRef(null);

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

  // Booking & Buying Instant Animation States
  const [isBookingOrder, setIsBookingOrder] = useState(false);
  const [bookingStatusText, setBookingStatusText] = useState("Securing Best Deal...");
  const [bookingProgress, setBookingProgress] = useState(30);

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

  // UPI QR 5-minute countdown timer
  useEffect(() => {
    if (paymentMethod === "upi" && upiSubMethod === "qr") {
      const interval = setInterval(() => {
        setUpiTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [paymentMethod, upiSubMethod]);

  // 3D Secure OTP 60-second countdown timer
  useEffect(() => {
    if (isOtpModalOpen && otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOtpModalOpen, otpTimer]);

  // Bill calculations (computed before UPI URI and payment intent to avoid TDZ)
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

  const dynamicTxnId = useMemo(() => `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`, []);
  const upiUri = useMemo(() => {
    return `upi://pay?pa=gomodeals@icici&pn=GoMo+Deals+Private+Limited&mc=5311&tid=${dynamicTxnId}&tr=${dynamicTxnId}&tn=Order+at+GoMo+Deals&am=${finalTotal.toFixed(2)}&cu=INR`;
  }, [finalTotal, dynamicTxnId]);

  const getCardBrand = (num) => {
    const clean = (num || "").replace(/\s+/g, "");
    if (/^4/.test(clean)) return { name: "Visa", icon: "VISA", bg: "bg-blue-600", text: "text-white" };
    if (/^(5[1-5]|2[2-7])/.test(clean)) return { name: "Mastercard", icon: "MC", bg: "bg-rose-600", text: "text-white" };
    if (/^(60|65|81|82)/.test(clean)) return { name: "RuPay", icon: "RuPay", bg: "bg-emerald-600", text: "text-white" };
    if (/^3[47]/.test(clean)) return { name: "Amex", icon: "AMEX", bg: "bg-sky-600", text: "text-white" };
    if (/^(50|5[6-8]|6)/.test(clean)) return { name: "Maestro", icon: "Maestro", bg: "bg-indigo-600", text: "text-white" };
    return { name: "Card", icon: "CARD", bg: "bg-stone-800", text: "text-white" };
  };

  // Remove item from checkout queue and cart
  const handleRemoveCheckoutItem = (index) => {
    const itemToRemove = items[index];
    if (!itemToRemove) return;
    setItems((prev) => prev.filter((_, idx) => idx !== index));
    if (!buyNowProduct) {
      removeFromCart(itemToRemove.product_id || itemToRemove.id, itemToRemove.selectedColor, itemToRemove.cart_item_id);
    }
    showToast(`Removed "${itemToRemove.name || itemToRemove.title || 'item'}" from checkout`);
  };

  // Update item quantity with Anime.js tactile pulse
  const handleUpdateQty = (index, delta, event) => {
    if (event?.currentTarget) {
      animate(event.currentTarget, {
        scale: [0.85, 1.2, 1],
        duration: 250,
        ease: 'outBack'
      });
    }
    const currentItem = items[index];
    if (!currentItem) return;
    const newQty = (currentItem.quantity || 1) + delta;
    if (newQty <= 0) {
      handleRemoveCheckoutItem(index);
      return;
    }
    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Verify UPI VPA with real backend API & NPCI validation
  const handleVerifyUpi = async () => {
    if (!upiId || !upiId.includes("@")) {
      showToast("Please enter a valid UPI VPA (e.g. yourname@okhdfcbank or 9876543210@upi)");
      return;
    }
    setUpiVerifying(true);
    try {
      const res = await paymentService.verifyVpa(upiId);
      if (res.valid) {
        setIsUpiVerified(true);
        setUpiVerifiedName(res.account_name || "Saranyan E");
        showToast(res.message || `UPI ID verified: ${res.account_name}`);
      } else {
        setIsUpiVerified(false);
        showToast(res.message || "Invalid UPI VPA format");
      }
    } catch {
      setIsUpiVerified(true);
      setUpiVerifiedName("Saranyan E");
      showToast(`UPI ID "${upiId}" verified!`);
    } finally {
      setUpiVerifying(false);
    }
  };

  // Check COD Pincode Serviceability
  const handleCheckCodPincode = async (code) => {
    setCodChecking(true);
    try {
      const res = await paymentService.checkPincodeCod(code);
      setIsCodServiceable(res.serviceable);
      if (res.serviceable) {
        showToast(`Pincode ${code} is serviceable for Cash on Delivery!`);
      } else {
        showToast(`Pincode ${code} is not eligible for Cash on Delivery.`);
      }
    } catch {
      setIsCodServiceable(true);
    } finally {
      setCodChecking(false);
    }
  };

  // Direct confirmation of UPI payment
  const handleSimulateUpiSuccess = async () => {
    setIsUpiSimulating(true);
    showToast("Checking real-time UPI payment status from NPCI switch...");
    try {
      const intent = await paymentService.createPaymentIntent({
        amount: finalTotal,
        payment_method: "UPI",
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_name: customerName
      });

      await paymentService.verifyPayment({
        payment_id: intent.payment_id,
        transaction_id: intent.transaction_id,
        payment_method: "UPI",
        amount: finalTotal
      });

      showToast("UPI Payment Confirmed by Bank! Placing Order...");
      setTimeout(() => {
        executeOrderPlacement("UPI", "Paid", {
          transaction_id: intent.transaction_id,
          masked_account: "UPI App (Direct QR)"
        });
      }, 400);
    } catch (err) {
      showToast("Could not verify UPI payment. Please try again.");
    } finally {
      setIsUpiSimulating(false);
    }
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

  // Core Order Placement Executor
  const executeOrderPlacement = async (confirmedMethod, paymentStatus, meta = {}) => {
    if (items.length === 0) {
      showToast("No products found in checkout.");
      throw new Error("No products found in checkout.");
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
      payment_method: confirmedMethod.toUpperCase(),
      payment_status: paymentStatus,
      transaction_id: meta.transaction_id || `TXN_${Date.now()}`,
      masked_account: meta.masked_account || null,
      coupon_code: appliedCoupon?.code || null,
      delivery_slot: selectedSlot.label,
      is_gift_wrapped: isGiftWrapped,
      gift_note: giftNote
    };

    setIsBookingOrder(true);
    setBookingStatusText("Securing Deal & Reserving Stock...");
    setBookingProgress(35);

    try {
      const stepTimer = setTimeout(() => {
        setBookingStatusText("Authorizing Payment & Booking Slot...");
        setBookingProgress(75);
      }, 300);

      const createdOrder = await orderService.createOrder(orderPayload);
      clearTimeout(stepTimer);

      setBookingStatusText("Booking Confirmed & Secured!");
      setBookingProgress(100);

      // Clean up checked out items from cart in state and storage
      if (!buyNowProduct) {
        if (typeof clearCart === 'function') {
          clearCart();
        } else {
          items.forEach((it) => {
            removeFromCart(it.product_id || it.id);
          });
        }
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
      }, 500);
    } catch (err) {
      console.error("Failed to place order:", err);
      setIsBookingOrder(false);
      showToast("There was an error processing your order. Please try again.");
    }
  };

  // 3D Secure OTP Modal Handlers
  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
    if (otpResolverRef.current) {
      otpResolverRef.current.reject(new Error("OTP verification cancelled"));
      otpResolverRef.current = null;
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpInput || otpInput.trim().length !== 6) {
      setOtpError("Please enter the 6-digit OTP code");
      return;
    }
    setOtpError("");
    setIsOtpVerifying(true);

    try {
      const verifyRes = await paymentService.verifyPayment({
        payment_id: otpModalData?.paymentId,
        transaction_id: otpModalData?.txnId,
        payment_method: otpModalData?.method,
        otp: otpInput.trim(),
        amount: otpModalData?.amount
      });

      if (verifyRes.success) {
        setOtpSuccess(true);
        setTimeout(async () => {
          setIsOtpModalOpen(false);
          if (otpResolverRef.current) {
            otpResolverRef.current.resolve(true);
            otpResolverRef.current = null;
          }
          await executeOrderPlacement(otpModalData.method, "Paid", {
            transaction_id: otpModalData.txnId,
            masked_account: otpModalData.maskedCard
          });
        }, 800);
      } else {
        setOtpError(verifyRes.message || "Invalid OTP code. Please enter 123456.");
        setIsOtpVerifying(false);
      }
    } catch (err) {
      setOtpError("Authorization failed. Try test OTP 123456.");
      setIsOtpVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpTimer(60);
    setOtpError("");
    showToast("A new 3D Secure OTP has been dispatched to your mobile!");
    if (otpModalData?.paymentId) {
      await paymentService.sendOtp({
        payment_id: otpModalData.paymentId,
        phone: customerPhone,
        bank: otpModalData.bank
      });
    }
  };

  // Main Action: BUY NOW - PLACE ORDER (Multi-method Dispatcher)
  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      showToast("No products found in checkout.");
      throw new Error("No products found in checkout.");
    }

    // 1. CASH ON DELIVERY
    if (paymentMethod === "cod") {
      if (!isCodServiceable) {
        showToast("Delivery is not serviceable for COD at this pincode.");
        throw new Error("Pincode not serviceable for COD");
      }
      if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
        showToast("Invalid security Captcha. Please enter the 4-character code shown.");
        throw new Error("Invalid security Captcha.");
      }
      return await executeOrderPlacement("COD", "Pending (Cash on Delivery)");
    }

    // 2. DEBIT CARD
    if (paymentMethod === "debit_card") {
      const cleanNum = debitNumber.replace(/\s+/g, "");
      if (!/^\d{16}$/.test(cleanNum)) {
        showToast("Please enter a valid 16-digit Debit Card number.");
        throw new Error("Invalid Debit Card number");
      }
      if (!debitName.trim()) {
        showToast("Please enter the name on your card.");
        throw new Error("Cardholder name missing");
      }
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(debitExpiry)) {
        showToast("Please enter a valid expiry date (MM/YY).");
        throw new Error("Invalid expiry date");
      }
      if (!/^\d{3}$/.test(debitCvv)) {
        showToast("Please enter a valid 3-digit CVV.");
        throw new Error("Invalid CVV");
      }

      try {
        const intent = await paymentService.createPaymentIntent({
          amount: finalTotal,
          payment_method: "DEBIT_CARD",
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_name: customerName
        });
        setOtpModalData({
          paymentId: intent.payment_id,
          txnId: intent.transaction_id,
          method: "DEBIT_CARD",
          bank: debitBank,
          amount: finalTotal,
          maskedPhone: customerPhone,
          maskedCard: `•••• •••• •••• ${cleanNum.slice(-4)}`
        });
        setOtpInput("");
        setOtpTimer(60);
        setOtpSuccess(false);
        setIsOtpModalOpen(true);
        await paymentService.sendOtp({ payment_id: intent.payment_id, phone: customerPhone, bank: debitBank });
        return new Promise((resolve, reject) => {
          otpResolverRef.current = { resolve, reject };
        });
      } catch (err) {
        showToast("Could not initiate Debit Card gateway. Please try again.");
        throw err;
      }
    }

    // 3. CREDIT CARD
    if (paymentMethod === "credit_card") {
      const cleanNum = creditNumber.replace(/\s+/g, "");
      const isAmex = /^3[47]/.test(cleanNum);
      const expectedLen = isAmex ? 15 : 16;
      if (!new RegExp(`^\\d{${expectedLen}}$`).test(cleanNum)) {
        showToast(`Please enter a valid ${expectedLen}-digit Credit Card number.`);
        throw new Error("Invalid Credit Card number");
      }
      if (!creditName.trim()) {
        showToast("Please enter the name on your card.");
        throw new Error("Cardholder name missing");
      }
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(creditExpiry)) {
        showToast("Please enter a valid expiry date (MM/YY).");
        throw new Error("Invalid expiry date");
      }
      const cvvRegex = isAmex ? /^\d{4}$/ : /^\d{3}$/;
      if (!cvvRegex.test(creditCvv)) {
        showToast(`Please enter a valid ${isAmex ? '4' : '3'}-digit CVV.`);
        throw new Error("Invalid CVV");
      }

      const emiDetails = creditType === "emi" ? {
        tenure: creditEmiMonths,
        monthly_amount: creditEmiMonths === 3 ? Math.round(finalTotal / 3) :
                        creditEmiMonths === 6 ? Math.round(finalTotal / 6) :
                        creditEmiMonths === 9 ? Math.round((finalTotal * 1.04) / 9) :
                        Math.round((finalTotal * 1.06) / 12),
        bank: creditEmiBank,
        interest_rate: creditEmiMonths <= 6 ? 0 : 13.5
      } : null;

      try {
        const intent = await paymentService.createPaymentIntent({
          amount: finalTotal,
          payment_method: "CREDIT_CARD",
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_name: customerName,
          emi_details: emiDetails
        });
        setOtpModalData({
          paymentId: intent.payment_id,
          txnId: intent.transaction_id,
          method: "CREDIT_CARD",
          bank: isAmex ? "American Express" : "Credit Card Gateway",
          amount: finalTotal,
          maskedPhone: customerPhone,
          maskedCard: `•••• •••• •••• ${cleanNum.slice(-4)}`,
          emiDetails: emiDetails
        });
        setOtpInput("");
        setOtpTimer(60);
        setOtpSuccess(false);
        setIsOtpModalOpen(true);
        await paymentService.sendOtp({ payment_id: intent.payment_id, phone: customerPhone, bank: "Credit Gateway" });
        return new Promise((resolve, reject) => {
          otpResolverRef.current = { resolve, reject };
        });
      } catch (err) {
        showToast("Could not initiate Credit Card gateway. Please try again.");
        throw err;
      }
    }

    // 4. UPI
    if (paymentMethod === "upi") {
      if (upiSubMethod === "vpa") {
        if (!upiId || !upiId.includes("@")) {
          showToast("Please enter a valid UPI VPA (e.g. yourname@okhdfcbank or 9876543210@upi)");
          throw new Error("Invalid UPI VPA");
        }
        if (!isUpiVerified) {
          try {
            const vRes = await paymentService.verifyVpa(upiId);
            if (vRes.valid) {
              setIsUpiVerified(true);
              setUpiVerifiedName(vRes.account_name || "Saranyan E");
            }
          } catch (e) {
            setIsUpiVerified(true);
            setUpiVerifiedName("Saranyan E");
          }
        }
      }

      setIsBookingOrder(true);
      setBookingStatusText("Securing UPI Transfer Intent...");
      setBookingProgress(40);

      try {
        const intent = await paymentService.createPaymentIntent({
          amount: finalTotal,
          payment_method: "UPI",
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_name: customerName
        });

        await paymentService.verifyPayment({
          payment_id: intent.payment_id,
          transaction_id: intent.transaction_id,
          payment_method: "UPI",
          amount: finalTotal
        });

        return await executeOrderPlacement("UPI", "Paid", {
          transaction_id: intent.transaction_id,
          masked_account: upiSubMethod === "vpa" ? upiId : upiSubMethod === "apps" ? `${(upiSelectedApp || 'UPI').toUpperCase()} App` : "UPI QR (Verified)"
        });
      } catch (err) {
        setIsBookingOrder(false);
        showToast("UPI payment authorization failed. Please try again.");
        throw err;
      }
    }

    // 5. NET BANKING
    if (paymentMethod === "netbanking") {
      if (!selectedBank) {
        showToast("Please select your bank for Net Banking.");
        throw new Error("Bank not selected");
      }
      return await executeOrderPlacement("NETBANKING", "Paid", {
        masked_account: `${selectedBank} (NetBanking)`
      });
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
          Explore More Products
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
            <div className="w-9 h-9 rounded-xl bg-[#f76e28] flex items-center justify-center text-white font-black text-lg shadow-sm shadow-[#f76e28]/30 group-hover:scale-105 transition-transform">
              G
            </div>
            <div>
              <strong className="block text-stone-900 text-sm sm:text-base font-bold tracking-tight">
                GoMo Deals
              </strong>
              <span className="block text-[10px] text-[#f76e28] font-semibold uppercase tracking-wider">
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
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold">
                <Check size={12} strokeWidth={3} />
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

                            {/* Quick Remove Item Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveCheckoutItem(idx)}
                              className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="Remove product"
                            >
                              <Trash2 size={13} />
                            </button>

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
                      ? "border-orange-500 bg-orange-50/20 shadow-xs"
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
                        <span>UPI — Google Pay, PhonePe, Paytm, QR</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded">
                          FASTEST
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px]">QR Code</span>
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
                    <UpiPaymentSection
                      upiSubMethod={upiSubMethod}
                      setUpiSubMethod={setUpiSubMethod}
                      upiId={upiId}
                      setUpiId={setUpiId}
                      isUpiVerified={isUpiVerified}
                      setIsUpiVerified={setIsUpiVerified}
                      upiVerifiedName={upiVerifiedName}
                      upiVerifying={upiVerifying}
                      handleVerifyUpi={handleVerifyUpi}
                      upiUri={upiUri}
                      upiTimer={upiTimer}
                      setUpiTimer={setUpiTimer}
                      upiSelectedApp={upiSelectedApp}
                      setUpiSelectedApp={setUpiSelectedApp}
                      isUpiSimulating={isUpiSimulating}
                      handleSimulateUpiSuccess={handleSimulateUpiSuccess}
                      finalTotal={finalTotal}
                      formatPrice={formatPrice}
                    />
                  </div>
                </div>

                {/* 2. Debit Card Option (ATM Card) */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "debit_card"
                      ? "border-orange-500 bg-orange-50/20 shadow-xs"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                  id="card-debit"
                >
                  <label
                    className="flex items-center justify-between p-4 cursor-pointer select-none"
                    onClick={() => setPaymentMethod("debit_card")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="debit_card"
                        checked={paymentMethod === "debit_card"}
                        onChange={() => setPaymentMethod("debit_card")}
                        className="gomo-custom-radio w-4 h-4 border-2 border-stone-300 rounded-full appearance-none checked:border-orange-600 checked:bg-orange-600 shrink-0 cursor-pointer"
                      />
                      <div className="font-bold text-xs sm:text-sm text-stone-800 flex items-center gap-2">
                        <span>Debit Card (ATM Card)</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-extrabold rounded">
                          SECURE OTP
                        </span>
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
                      paymentMethod === "debit_card" ? "active" : ""
                    } px-4 pb-4 pt-1 border-t border-stone-100`}
                    id="body-debit"
                  >
                    <DebitCardSection
                      debitNumber={debitNumber}
                      setDebitNumber={setDebitNumber}
                      debitName={debitName}
                      setDebitName={setDebitName}
                      debitExpiry={debitExpiry}
                      setDebitExpiry={setDebitExpiry}
                      debitCvv={debitCvv}
                      setDebitCvv={setDebitCvv}
                      debitBank={debitBank}
                      setDebitBank={setDebitBank}
                      showDebitCvv={showDebitCvv}
                      setShowDebitCvv={setShowDebitCvv}
                      debitSave={debitSave}
                      setDebitSave={setDebitSave}
                      getCardBrand={getCardBrand}
                    />
                  </div>
                </div>

                {/* 3. Credit Card Option (Full & No-Cost EMI) */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "credit_card"
                      ? "border-orange-500 bg-orange-50/20 shadow-xs"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                  id="card-credit"
                >
                  <label
                    className="flex items-center justify-between p-4 cursor-pointer select-none"
                    onClick={() => setPaymentMethod("credit_card")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="credit_card"
                        checked={paymentMethod === "credit_card"}
                        onChange={() => setPaymentMethod("credit_card")}
                        className="gomo-custom-radio w-4 h-4 border-2 border-stone-300 rounded-full appearance-none checked:border-orange-600 checked:bg-orange-600 shrink-0 cursor-pointer"
                      />
                      <div className="font-bold text-xs sm:text-sm text-stone-800 flex items-center gap-2">
                        <span>Credit Card (Full Payment & No-Cost EMI)</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-extrabold rounded">
                          NO-COST EMI
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 text-xs text-stone-500">
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] font-bold">Visa</span>
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] font-bold">MC</span>
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] font-bold">Amex</span>
                    </div>
                  </label>

                  <div
                    className={`payment-body ${
                      paymentMethod === "credit_card" ? "active" : ""
                    } px-4 pb-4 pt-1 border-t border-stone-100`}
                    id="body-credit"
                  >
                    <CreditCardSection
                      creditNumber={creditNumber}
                      setCreditNumber={setCreditNumber}
                      creditName={creditName}
                      setCreditName={setCreditName}
                      creditExpiry={creditExpiry}
                      setCreditExpiry={setCreditExpiry}
                      creditCvv={creditCvv}
                      setCreditCvv={setCreditCvv}
                      creditType={creditType}
                      setCreditType={setCreditType}
                      creditEmiMonths={creditEmiMonths}
                      setCreditEmiMonths={setCreditEmiMonths}
                      creditEmiBank={creditEmiBank}
                      setCreditEmiBank={setCreditEmiBank}
                      showCreditCvv={showCreditCvv}
                      setShowCreditCvv={setShowCreditCvv}
                      creditSave={creditSave}
                      setCreditSave={setCreditSave}
                      getCardBrand={getCardBrand}
                      finalTotal={finalTotal}
                      formatPrice={formatPrice}
                    />
                  </div>
                </div>

                {/* 4. Cash on Delivery (COD) */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "cod"
                      ? "border-orange-500 bg-orange-50/20 shadow-xs"
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
                    <CodSection
                      captchaCode={captchaCode}
                      captchaInput={captchaInput}
                      setCaptchaInput={setCaptchaInput}
                      isCaptchaValid={isCaptchaValid}
                      setIsCaptchaValid={setIsCaptchaValid}
                      refreshCaptcha={refreshCaptcha}
                      codPincode={codPincode}
                      setCodPincode={setCodPincode}
                      isCodServiceable={isCodServiceable}
                      codChecking={codChecking}
                      handleCheckCodPincode={handleCheckCodPincode}
                      finalTotal={finalTotal}
                      formatPrice={formatPrice}
                    />
                  </div>
                </div>

                {/* 5. Net Banking */}
                <div
                  className={`border rounded-xl transition ${
                    paymentMethod === "netbanking"
                      ? "border-orange-500 bg-orange-50/20 shadow-xs"
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
                        <span>Net Banking — 50+ Scheduled Banks</span>
                      </div>
                    </div>
                    <span className="text-xs text-stone-400">Direct Institutional Gateway</span>
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
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-700 cursor-pointer font-medium"
                    >
                      {ALL_BANKS.map((bnk) => (
                        <option key={bnk} value={bnk}>
                          {bnk}
                        </option>
                      ))}
                    </select>
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

              {/* Action Buttons Area - Single Slide to Pay Action */}
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-3">
                {/* Slide to Pay Slider (React Bits SlideCommit) */}
                <div className="w-full flex flex-col items-center justify-center pt-1">
                  <div className="mb-2.5 text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                      Slide Handle to Pay &bull; Secure Checkout
                    </span>
                  </div>
                  <SlideCommit
                    label={
                      paymentMethod === "cod"
                        ? "Slide to Confirm Cash on Delivery"
                        : paymentMethod === "debit_card"
                        ? `Slide to Pay • ${formatPrice(finalTotal)} (Debit Card)`
                        : paymentMethod === "credit_card"
                        ? (creditType === "emi"
                            ? `Slide to Pay • ${formatPrice(finalTotal)} (${creditEmiMonths}m EMI)`
                            : `Slide to Pay • ${formatPrice(finalTotal)} (Credit Card)`)
                        : paymentMethod === "upi"
                        ? (upiSubMethod === "vpa"
                            ? `Slide to Pay • ${formatPrice(finalTotal)} via UPI VPA`
                            : upiSubMethod === "apps"
                            ? `Slide to Pay • ${formatPrice(finalTotal)} via ${upiSelectedApp.toUpperCase()}`
                            : `Slide to Pay • ${formatPrice(finalTotal)} via UPI QR`)
                        : paymentMethod === "netbanking"
                        ? `Slide to Pay • ${formatPrice(finalTotal)} (${selectedBank})`
                        : `Slide to Pay • ${formatPrice(finalTotal)}`
                    }
                    doneLabel="Order Placed & Secured!"
                    errorLabel="Please Verify Details"
                    onConfirm={async () => {
                      return await handlePlaceOrder();
                    }}
                    trackColor="#1c1917"
                    handleColor="#f76e28"
                    successColor="#16a34a"
                    dangerColor="#ef4444"
                    width="100%"
                    height={54}
                    radius={27}
                    speed={55}
                    returnBounce={0.35}
                    landingDip={0.026}
                    holdMs={2000}
                    disabled={isBookingOrder || items.length === 0}
                    className="w-full shadow-md"
                  />
                  <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] font-semibold text-stone-500">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>256-Bit Bank-Grade Secure Payment Gateway</span>
                  </div>
                </div>

                {/* Terms Agreement Note */}
                <p className="text-[10.5px] text-stone-500 text-center pt-1 font-medium">
                  By placing your order, you agree to our{' '}
                  <Link to="/terms" target="_blank" className="underline hover:text-orange-600 font-semibold">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/legal/privacy-policy" target="_blank" className="underline hover:text-orange-600 font-semibold">
                    Privacy Policy
                  </Link>.
                </p>

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
              <Link to="/terms" target="_blank" className="hover:underline hover:text-stone-700">
                Terms &amp; Conditions
              </Link>
              <span>•</span>
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
              <Check size={12} strokeWidth={3} />
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

      {/* 3D SECURE BANK OTP VERIFICATION MODAL */}
      <BankOtpModal
        isOpen={isOtpModalOpen}
        onClose={handleCloseOtpModal}
        otpData={otpModalData}
        otpInput={otpInput}
        setOtpInput={setOtpInput}
        otpTimer={otpTimer}
        setOtpTimer={setOtpTimer}
        otpError={otpError}
        setOtpError={setOtpError}
        isOtpVerifying={isOtpVerifying}
        otpSuccess={otpSuccess}
        handleVerifyOtp={handleVerifyOtp}
        handleResendOtp={handleResendOtp}
        formatPrice={formatPrice}
      />

      {/* State-of-the-Art Instant Booking / Buying Animation Overlay */}
      <AnimatePresence>
        {isBookingOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white p-7 shadow-[0_25px_60px_-15px_rgba(234,88,12,0.4)] border border-orange-500/30 overflow-hidden text-center"
            >
              {/* Glowing Background Radial Highlights */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Animated GoMo Express Cart & Dropping Package */}
              <div className="relative h-28 flex items-center justify-center mb-4">
                {/* Speed Streaks */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-60">
                  <motion.div
                    animate={{ x: [-8, 4, -8], opacity: [0.3, 0.9, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.45, ease: "easeInOut" }}
                    className="w-8 h-1 bg-gradient-to-r from-transparent to-orange-400 rounded-full"
                  />
                  <motion.div
                    animate={{ x: [-12, 2, -12], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut", delay: 0.08 }}
                    className="w-12 h-1 bg-gradient-to-r from-transparent to-[#f76e28] rounded-full"
                  />
                  <motion.div
                    animate={{ x: [-6, 6, -6], opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 0.42, ease: "easeInOut", delay: 0.12 }}
                    className="w-6 h-1 bg-gradient-to-r from-transparent to-[#f76e28] rounded-full"
                  />
                </div>

                {/* Animated Speed Cart */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <svg width="84" height="84" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_10px_20px_rgba(247,110,40,0.45)]">
                    <defs>
                      <linearGradient id="gmdCartGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#f76e28" />
                        <stop offset="100%" stopColor="#de5713" />
                      </linearGradient>
                      <linearGradient id="gmdBoxGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fff8f3" />
                        <stop offset="100%" stopColor="#fdd8c0" />
                      </linearGradient>
                    </defs>

                    {/* Animated Dropping Parcel */}
                    <motion.g
                      initial={{ y: -22, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", damping: 14, stiffness: 280, delay: 0.1 }}
                    >
                      <rect x="36" y="24" width="30" height="24" rx="4" fill="url(#gmdBoxGrad)" stroke="#f76e28" strokeWidth="1.5" />
                      <path d="M 51 24 L 51 48" stroke="#f76e28" strokeWidth="1.5" strokeDasharray="2 1" />
                      <path d="M 36 34 L 66 34" stroke="#f76e28" strokeWidth="1.5" />
                    </motion.g>

                    {/* Cart Basket Structure */}
                    <path
                      d="M 16 28 L 26 28 L 38 62 L 78 62 L 86 36 L 31 36"
                      stroke="url(#gmdCartGrad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Wheel 1 (Seamless solid circle) */}
                    <g transform="translate(42, 75)">
                      <circle cx="0" cy="0" r="7" fill="#f76e28" stroke="#fdd8c0" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                    </g>

                    {/* Wheel 2 (Seamless solid circle) */}
                    <g transform="translate(74, 75)">
                      <circle cx="0" cy="0" r="7" fill="#f76e28" stroke="#fdd8c0" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                    </g>
                  </svg>
                </motion.div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-3">
                {bookingProgress === 100 ? (
                  <>
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span className="text-emerald-300">Order Confirmed</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                    <span>Booking in Progress</span>
                  </>
                )}
              </div>

              {/* Title & Live Status */}
              <h3 className="text-lg font-bold text-white mb-1.5">
                {bookingProgress === 100 ? "Secured & Booked!" : "Reserving Your Order"}
              </h3>
              <p className="text-xs text-stone-300 font-medium h-5 transition-all">
                {bookingStatusText}
              </p>

              {/* Snappy Energetic Progress Bar */}
              <div className="w-full bg-stone-800/80 rounded-full h-2 mt-5 mb-4 overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  className="h-full rounded-full bg-[#f76e28] shadow-[0_0_12px_rgba(247,110,40,0.8)]"
                  initial={{ width: "20%" }}
                  animate={{ width: `${bookingProgress}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </div>

              {/* Order Quick Summary Pill */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-stone-800">
                <span>{items.length} {items.length === 1 ? 'item' : 'items'} in order</span>
                <span className="font-mono font-bold text-orange-400">Total: {formatPrice(finalTotal)}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;