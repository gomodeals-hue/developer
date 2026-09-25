import { api } from "./api.js";
import { API_CONFIG } from "../config/api.config.js";
import { SAMPLE_PRODUCTS } from "../data/sampleProducts.js";

/**
 * Helper to get customer orders from local storage
 */
const getStoredOrders = () => {
    try {
        const raw = localStorage.getItem('gomo_customer_orders');
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

/**
 * Formats Indian Currency
 */
const formatPrice = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
};

/**
 * Generates an intelligent, context-aware mock response for the GoMo Deals Assistant
 * when backend AI service is offline or in mock mode.
 */
export const generateSmartBotResponse = (message = '', history = [], user = null) => {
    const query = message.trim().toLowerCase();
    
    // 1. HOT DEALS & DISCOUNTS
    if (
        query.includes('deal') || 
        query.includes('discount') || 
        query.includes('offer') || 
        query.includes('sale') || 
        query.includes('hot') ||
        query.includes('cheap') ||
        query.includes('save')
    ) {
        // Find products with highest discounts or bestsellers
        const sortedDeals = [...SAMPLE_PRODUCTS]
            .sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0))
            .slice(0, 3);

        const dealListFormatted = sortedDeals.map((p, idx) => {
            const mrpText = p.mrp ? ` ~~${formatPrice(p.mrp)}~~` : '';
            const discountBadge = p.discount_percentage ? ` **(${p.discount_percentage}% OFF)**` : '';
            return `${idx + 1}. **${p.name || p.title}**\n   • Price: **${formatPrice(p.price)}**${mrpText}${discountBadge}\n   • Rating: ${p.rating || 4.8} / 5 | Brand: ${p.brand || 'GoMo Select'}`;
        }).join('\n\n');

        const reply = `**Here are today's featured deals on GoMo Deals:**\n\n${dealListFormatted}\n\nAll featured deals come with **Free Doorstep Delivery** and our **15-Day Return Guarantee**. Select any product below to view full details!`;

        return {
            success: true,
            reply,
            products: sortedDeals,
            suggestedReplies: [
                "Electronics deals",
                "Fashion deals",
                "Track my order",
                "Active coupon codes"
            ]
        };
    }

    // 2. ORDER TRACKING & STATUS
    if (
        query.includes('track') || 
        query.includes('order') || 
        query.includes('status') || 
        query.includes('delivery') || 
        query.includes('where is my') ||
        query.includes('shipment')
    ) {
        const localOrders = getStoredOrders();
        
        // Check if query contains a specific order ID or number
        const matchedOrder = localOrders.find(o => 
            (o.order_number && query.includes(o.order_number.toLowerCase())) ||
            (o.order_id && query.includes(o.order_id.toLowerCase())) ||
            (o.id && query.includes(o.id.toLowerCase()))
        );

        if (matchedOrder) {
            const status = matchedOrder.order_status || matchedOrder.status || 'Shipped';
            const courier = matchedOrder.courier || 'BlueDart Express';
            const estDate = matchedOrder.estimated_delivery 
                ? new Date(matchedOrder.estimated_delivery).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Within 2-3 business days';

            return {
                success: true,
                reply: `**Order Status for #${matchedOrder.order_number || matchedOrder.order_id}**:\n\n• Status: **${status}**\n• Courier Partner: **${courier}**\n• Estimated Delivery: **${estDate}**\n• Total: **${formatPrice(matchedOrder.total_amount || matchedOrder.total || 0)}**\n\nYour shipment is progressing smoothly! You can view full tracking events in your **Orders** tab.`,
                suggestedReplies: ["Featured deals", "Return & Refund policy", "Main Menu"]
            };
        }

        if (localOrders.length > 0) {
            const latest = localOrders[0];
            const status = latest.order_status || latest.status || 'In Transit';
            const estDate = latest.estimated_delivery 
                ? new Date(latest.estimated_delivery).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Within 2-3 business days';

            return {
                success: true,
                reply: `**Here is your latest active order:**\n\n• **Order #${latest.order_number || latest.order_id}**\n• Status: **${status}**\n• Courier: **${latest.courier || 'BlueDart Express'}**\n• Estimated Delivery: **${estDate}**\n• Total: **${formatPrice(latest.total_amount || latest.total || 0)}**\n\nNeed to look up another order? Just send me your **Order ID** (e.g. #ORD-1001)!`,
                suggestedReplies: ["Featured deals", "Return & Refund policy", "Main Menu"]
            };
        }

        return {
            success: true,
            reply: `**Track Your Shipment**\n\nTo track an order:\n1. Head over to **My Orders** from your account menu for live map tracking.\n2. Or simply reply here with your **Order ID** or Order Number, and I'll look up its real-time status instantly!\n\nCan I help you find anything else while you wait?`,
            suggestedReplies: ["Featured deals", "Return & Refund policy", "Explore fashion deals"]
        };
    }

    // 3. RETURNS & REFUNDS POLICY
    if (
        query.includes('return') || 
        query.includes('refund') || 
        query.includes('cancel') || 
        query.includes('exchange') || 
        query.includes('warranty') ||
        query.includes('policy')
    ) {
        return {
            success: true,
            reply: `**GoMo Deals Returns & Refunds Policy**\n\n• **15-Day Return Window**: You can request a return or replacement on delivered items within 15 days.\n• **Free Doorstep Pickup**: Our verified courier partners collect the item directly from your address at ₹0 extra fee.\n• **Instant Refunds**: Once picked up and verified, refunds are credited to your original payment method or GoMo Wallet in 24-48 hours.\n• **100% Genuine Guarantee**: All items undergo single-vendor authentic quality checks with full brand warranties.\n\nWould you like to initiate a return on an existing order or check product warranties?`,
            suggestedReplies: ["Track my order", "Featured deals", "Main Menu"]
        };
    }

    // 4. COUPONS & PROMO CODES
    if (
        query.includes('coupon') || 
        query.includes('code') || 
        query.includes('promo') || 
        query.includes('voucher')
    ) {
        return {
            success: true,
            reply: `**Active Promo Codes for Today:**\n\n1. **GOMO20** — Flat 20% OFF on your first purchase over ₹999\n2. **FESTIVE500** — Flat ₹500 OFF on orders above ₹2,499\n3. **FREESHIP** — Free Express Delivery on all orders\n\nYou can apply any of these coupon codes at checkout to unlock extra instant savings!`,
            suggestedReplies: ["Featured deals", "Explore fashion deals", "Main Menu"]
        };
    }

    // 5. CATEGORY SPECIFIC SEARCHES
    const categories = [
        { key: 'fashion', name: 'Fashion & Apparel', filter: 'fashion' },
        { key: 'electronic', name: 'Electronics & Gadgets', filter: 'electronics' },
        { key: 'phone', name: 'Smartphones & Accessories', filter: 'electronics' },
        { key: 'laptop', name: 'Laptops & Computers', filter: 'electronics' },
        { key: 'headphone', name: 'Audio & Headphones', filter: 'electronics' },
        { key: 'home', name: 'Home & Living', filter: 'home-living' },
        { key: 'beauty', name: 'Beauty & Wellness', filter: 'beauty' },
        { key: 'gift', name: 'Gift Collections', filter: 'gifts' },
        { key: 'pooja', name: 'Pooja Essentials', filter: 'pooja-items' },
        { key: 'grocery', name: 'Grocery & Essentials', filter: 'grocery' }
    ];

    const matchedCat = categories.find(c => query.includes(c.key));
    if (matchedCat) {
        const catProducts = SAMPLE_PRODUCTS.filter(p => 
            (p.category || '').toLowerCase().includes(matchedCat.filter) ||
            (p.tags || '').toLowerCase().includes(matchedCat.key)
        ).slice(0, 3);

        const listText = (catProducts.length > 0 ? catProducts : SAMPLE_PRODUCTS.slice(0, 3)).map((p, idx) => {
            const mrp = p.mrp ? ` ~~${formatPrice(p.mrp)}~~` : '';
            const disc = p.discount_percentage ? ` **(${p.discount_percentage}% OFF)**` : '';
            return `${idx + 1}. **${p.name || p.title}**\n   • Price: **${formatPrice(p.price)}**${mrp}${disc}\n   • Rating: ${p.rating || 4.7} / 5`;
        }).join('\n\n');

        return {
            success: true,
            reply: `**Top Picks in ${matchedCat.name}:**\n\n${listText}\n\nAll items are available in stock with brand warranties! Would you like to view more options or filter by price?`,
            products: catProducts.length > 0 ? catProducts : SAMPLE_PRODUCTS.slice(0, 3),
            suggestedReplies: ["Featured deals", "Active coupon codes", "Main Menu"]
        };
    }

    // 6. GENERAL KEYWORD PRODUCT SEARCH
    const searchMatches = SAMPLE_PRODUCTS.filter(p => {
        const fullText = `${p.name} ${p.title} ${p.description} ${p.tags} ${p.brand || ''}`.toLowerCase();
        return query.split(' ').some(word => word.length > 3 && fullText.includes(word));
    }).slice(0, 3);

    if (searchMatches.length > 0) {
        const listText = searchMatches.map((p, idx) => {
            const mrp = p.mrp ? ` ~~${formatPrice(p.mrp)}~~` : '';
            const disc = p.discount_percentage ? ` **(${p.discount_percentage}% OFF)**` : '';
            return `${idx + 1}. **${p.name || p.title}**\n   • Price: **${formatPrice(p.price)}**${mrp}${disc}\n   • Brand: ${p.brand || 'GoMo'}`;
        }).join('\n\n');

        return {
            success: true,
            reply: `**Matching Items Found:**\n\n${listText}\n\nSelect any item to view specifications and add it to your bag!`,
            products: searchMatches,
            suggestedReplies: ["Featured deals", "Active coupon codes", "Main Menu"]
        };
    }

    // 7. SHIPPING & PAYMENT QUERIES
    if (
        query.includes('shipping') || 
        query.includes('payment') || 
        query.includes('cod') || 
        query.includes('cash on delivery') ||
        query.includes('upi') ||
        query.includes('credit card')
    ) {
        return {
            success: true,
            reply: `**Shipping & Payment Details:**\n\n• **Free Express Delivery** on all orders over ₹500 across India.\n• Standard shipping takes **2-4 business days** with live courier tracking via BlueDart Express.\n• **Flexible Payments**: We support UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and **Cash on Delivery (COD)**.\n\nNeed help with an existing order or checkout?`,
            suggestedReplies: ["Featured deals", "Track my order", "Main Menu"]
        };
    }

    // 8. GREETINGS & MENU
    if (
        query.includes('hi') || 
        query.includes('hello') || 
        query.includes('hey') || 
        query.includes('start') || 
        query.includes('menu') ||
        query.includes('help')
    ) {
        const userName = user?.name ? `, ${user.name.split(' ')[0]}` : '';
        return {
            success: true,
            reply: `Hello${userName}! I'm **GoMo Deals Assistant**, your personal shopping concierge.\n\nHere is how I can assist you today:\n• Discover **Featured Deals** and trending discounts\n• Search premium products across **Electronics, Fashion, and Home**\n• Check **Live Order Tracking** & delivery status\n• Explain **15-Day Returns & Easy Refunds**\n\nWhat would you like to explore?`,
            suggestedReplies: [
                "Featured deals",
                "Track my order",
                "Return & Refund policy",
                "Explore fashion deals"
            ]
        };
    }

    // 9. DEFAULT / FALLBACK RESPONSE
    return {
        success: true,
        reply: `I'm here to help you shop smart on GoMo Deals.\n\nI can help you find our **hottest discounts**, look up items in **Electronics & Fashion**, track your **recent orders**, or explain our **15-day return policy**.\n\nTry selecting one of the quick options below or tell me what you're looking for!`,
        suggestedReplies: [
            "Featured deals",
            "Track my order",
            "Return & Refund policy",
            "Explore fashion deals"
        ]
    };
};

/**
 * Sends a chat message to the backend chatbot route along with chat history.
 * If backend is offline or mock mode is active, smoothly falls back to the smart assistant engine.
 * 
 * @param {string} message - The current message typed by the user.
 * @param {Array} history - Array of previous messages in format [{ role: 'user' | 'model', content: string }]
 * @param {Object} user - Optional current user profile
 * @returns {Promise<Object>} API response including the AI reply, products, and suggested replies.
 */
export const sendChatbotMessage = async (message, history = [], user = null) => {
    // If mock mode is explicitly configured, use the smart local engine
    if (API_CONFIG.USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(generateSmartBotResponse(message, history, user));
            }, 300); // Realistic slight typing delay
        });
    }

    try {
        const response = await api.post(`/chatbot/message`, { message, history });
        if (response?.data?.reply) {
            return response.data;
        }
        // Fallback if backend returned 200 but reply was empty
        return generateSmartBotResponse(message, history, user);
    } catch (error) {
        console.warn("Real backend chatbot call failed; engaging intelligent assistant engine:", error.message);
        return generateSmartBotResponse(message, history, user);
    }
};
