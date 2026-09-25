import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useShop } from "../../context/ShopContext";
import { createOrder, sendOrderConfirmationEmail } from "../../services/orderService";
import { paymentService } from "../../services/paymentService";
import { cartService } from "../../services/cartService";
import { MapPin, CreditCard, Package, AlertTriangle, Loader2, CheckCircle2, Truck } from "lucide-react";

const ReviewOrder = ({
  onBack,
  paymentMethod,
  paymentDetails,
  total,
  userDetails,
  items,
  appliedCoupon,
  offerToken,
  membershipTier = 'free',
  membershipDiscountAmount = 0,
  delivery = 0,
  deliveryMethod = 'standard'
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  const { user } = useAuth();
  const { cart, clearCart, formatPrice, t } = useShop();

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const subtotalValue = items.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0);

  const discountValue = appliedCoupon
    ? (appliedCoupon.type === 'flat' || appliedCoupon.type === 'fixed' || parseFloat(appliedCoupon.discount_amount || 0) > 0)
      ? Math.min(parseFloat(appliedCoupon.discount_amount), subtotalValue)
      : Math.min((subtotalValue * (appliedCoupon.discount_percentage || appliedCoupon.discount_percent || 0)) / 100, appliedCoupon.max_discount || Infinity)
    : 0;

  const triggerOrderEmail = async (orderId) => {
    try {
      await sendOrderConfirmationEmail({
        customerName: userDetails?.name || userDetails?.full_name,
        customerEmail: userDetails?.email || user?.email,
        orderId,
        total,
        paymentMethod,
        address: `${userDetails?.address || userDetails?.street}, ${userDetails?.city}, ${userDetails?.state} - ${userDetails?.pincode || userDetails?.postal_code}`
      });
    } catch (err) {
      console.warn("Non-blocking order email error:", err);
    }
  };

  const handlePlaceOrder = async () => {
    if (isAdmin) {
      setError(t("Administrators cannot place orders. Please use a customer account."));
      return;
    }

    if (!items || items.length === 0) {
      setError(t("Your cart is empty. Please add items before placing an order."));
      return;
    }

    if (!userDetails || (!userDetails.address && !userDetails.street)) {
      setError(t("Delivery address is required. Please select or add an address."));
      return;
    }

    // 1. Stock validation gate
    const stockValidation = cartService.validateCartStock(items);
    if (!stockValidation.valid) {
      setError(stockValidation.error);
      return;
    }

    // 2. Payment details validation gate
    const payValidation = paymentService.validatePaymentDetails(paymentMethod, paymentDetails);
    if (!payValidation.valid) {
      setError(payValidation.error);
      return;
    }

    setError("");
    setIsPlacing(true);

    try {
      // 3. Process mock payment
      const payResult = await paymentService.processPayment({
        method: paymentMethod,
        details: paymentDetails,
        amount: total,
        currency: 'INR'
      });

      if (!payResult.success) {
        setError(payResult.error || t("Payment authorization failed. Please check payment details."));
        setIsPlacing(false);
        return;
      }

      // 4. Build comprehensive order record
      const orderData = {
        customer_id: user?.id || 'guest_user',
        customer_name: userDetails?.full_name || userDetails?.name || 'Customer',
        customer_email: userDetails?.email || user?.email || 'customer@gomodeals.com',
        delivery_address: {
          full_name: userDetails?.full_name || userDetails?.name,
          phone: userDetails?.phone,
          street: userDetails?.street || userDetails?.address,
          city: userDetails?.city,
          state: userDetails?.state,
          postal_code: userDetails?.postal_code || userDetails?.pincode,
          country: userDetails?.country || 'India'
        },
        items: items.map(item => ({
          product_id: item.product_id || item.id,
          id: item.product_id || item.id,
          name: item.name,
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 1),
          thumbnail: item.image || item.thumbnail || '',
          variant_value: item.selectedColor || item.variant_value || null,
          variant_id: item.variant_id || null,
          stock_quantity: item.stock_quantity !== undefined ? item.stock_quantity : 25
        })),
        payment_method: paymentMethod,
        payment_status: payResult.status,
        payment_id: payResult.transaction_id,
        transaction_id: payResult.transaction_id,
        masked_account: payResult.masked_account,
        subtotal: subtotalValue,
        shipping_charges: delivery,
        shipping_fee: delivery,
        shipping_method: deliveryMethod,
        tax_amount: Math.round(subtotalValue * 0.05),
        tax: Math.round(subtotalValue * 0.05),
        discount_amount: discountValue,
        discount: discountValue,
        coupon_id: appliedCoupon?.coupon_id || appliedCoupon?.id || null,
        coupon_code: appliedCoupon?.code || null,
        total_amount: total,
        total: total
      };

      const response = await createOrder(orderData);
      if (response.success && (response.order_id || response.orderId)) {
        const confirmedOrder = response.order || response.data;
        // Fire confirmation email
        triggerOrderEmail(response.orderId || response.order_id);
        // Clear cart
        await clearCart();
        // Navigate to confirmation
        navigate("/order-success", {
          state: {
            orderId: response.orderId || response.order_id,
            orderNumber: response.orderNumber || confirmedOrder?.order_number,
            order: confirmedOrder
          }
        });
      } else {
        setError(response.message || response.error || t("Failed to register order. Please try again."));
      }
    } catch (err) {
      console.error("Order creation error:", err);
      setError(err.message || t("Failed to place order. Please try again."));
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif italic text-orange-900 mb-2">{t("Review & Confirm")}</h2>
        <p className="text-[10px] uppercase tracking-widest text-orange-400">{t("Verify your details before placing your order")}</p>
      </div>

      {/* Delivery Address */}
      <div className="p-6 rounded-none bg-orange-50/50 border border-orange-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-orange-600" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-950">{t("Delivery Destination")}</span>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-[9px] uppercase tracking-widest font-bold text-orange-600 hover:text-orange-955 underline cursor-pointer"
          >
            {t("Change")}
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-serif italic font-bold text-orange-950">{userDetails?.full_name || userDetails?.name}</p>
          <p className="text-xs text-orange-800 font-light">{userDetails?.street || userDetails?.address}</p>
          <p className="text-xs text-orange-800 font-light">{userDetails?.city}, {userDetails?.state} — {userDetails?.postal_code || userDetails?.pincode}</p>
          <div className="flex flex-wrap gap-4 pt-1 text-[11px] font-mono text-orange-600">
            <span>📞 {userDetails?.phone}</span>
            {userDetails?.email && <span>✉ {userDetails?.email}</span>}
          </div>
        </div>
      </div>

      {/* Delivery Method & Shipping */}
      <div className="p-6 rounded-none bg-orange-50/50 border border-orange-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Truck size={18} className="text-orange-600" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-950 block">
              {deliveryMethod === 'express' ? t("Express Studio Delivery") : t("Standard Ground Delivery")}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-orange-400">
              {deliveryMethod === 'express' ? t("Estimated 1 - 2 Business Days") : t("Estimated 3 - 5 Business Days")}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-serif italic font-bold text-orange-950">
            {delivery === 0 ? t("Free Delivery") : formatPrice(delivery)}
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="p-6 rounded-none bg-orange-50/50 border border-orange-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard size={18} className="text-orange-600" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-950 block">
              {paymentMethod === "COD" 
                ? t("Cash on Delivery") 
                : paymentMethod === "UPI" 
                ? t("Direct UPI Transfer") 
                : t("Credit / Debit Card")}
            </span>
            <span className="text-[9px] font-mono text-orange-500">
              {paymentMethod === "CARD" 
                ? `•••• •••• •••• ${(paymentDetails?.cardNumber || "8821").replace(/\s/g, '').slice(-4)}` 
                : paymentMethod === "UPI" 
                ? (paymentDetails?.upiId || "Instant UPI") 
                : t("Doorstep settlement")}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 bg-orange-100 text-orange-850 font-bold border border-orange-200">
            {t("Verified Mock Gateway")}
          </span>
        </div>
      </div>

      {/* Items Review */}
      <div className="p-6 rounded-none bg-orange-50/50 border border-orange-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Package size={16} className="text-orange-600" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-950">
            {t("Order Items")} ({items.length})
          </span>
        </div>
        <div className="space-y-3 divide-y divide-orange-100/80">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center pt-3 first:pt-0">
              <div className="w-14 h-14 bg-white rounded-none overflow-hidden border border-orange-200 shrink-0 p-1">
                <img src={item.image || item.thumbnail} alt={t(item.name)} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-serif italic font-bold text-orange-950 truncate">{t(item.name)}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-orange-400 font-mono">Qty: {item.quantity || 1}</span>
                  {item.variant_value && (
                    <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-orange-100/60 text-orange-800 font-bold">
                      {item.variant_value}
                    </span>
                  )}
                  <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/50">
                    ✓ In Stock
                  </span>
                </div>
              </div>
              <p className="text-xs font-mono font-bold text-orange-950 shrink-0">
                {formatPrice(Number(item.price) * (item.quantity || 1))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total Card */}
      <div className="flex justify-between items-end p-6 bg-orange-955 text-white rounded-none shadow-md">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/60 mb-1">{t("Total Payable Amount")}</p>
          <p className="text-[9px] uppercase tracking-widest text-white/40">Includes all taxes and delivery fees</p>
        </div>
        <span className="text-3xl font-light font-mono tracking-tight">{formatPrice(total)}</span>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-sm">
          <AlertTriangle size={16} className="text-rose-500 shrink-0" />
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">{error}</p>
        </div>
      )}

      {isAdmin && (
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">⚠ {t("Administrator accounts cannot place customer orders.")}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={onBack}
          disabled={isPlacing}
          className="flex-1 h-14 border border-orange-200 text-orange-600 text-[11px] uppercase tracking-[0.4em] font-black rounded-sm hover:bg-orange-50 transition-all duration-300 disabled:opacity-40 cursor-pointer"
        >
          ← {t("back")}
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={isAdmin || isPlacing}
          className={`flex-1 h-14 text-[11px] uppercase tracking-[0.4em] font-black rounded-sm transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer ${
            isAdmin
              ? 'bg-orange-200 text-orange-400 cursor-not-allowed'
              : isPlacing
              ? 'bg-orange-700 text-white cursor-wait'
              : 'bg-orange-955 text-white hover:bg-orange-600 shadow-xl'
          }`}
        >
          {isPlacing ? (
            <><Loader2 size={16} className="animate-spin" /> {t("submitting")}</>
          ) : isAdmin ? (
            t('Restricted')
          ) : (
            `✓ ${t("proceed_to_checkout")}`
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewOrder;
