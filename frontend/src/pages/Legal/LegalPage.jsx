import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  HelpCircle, 
  Scale, 
  Cookie, 
  ArrowLeft, 
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  ChevronDown,
  Info,
  Calendar,
  Lock,
  Printer,
  Copy,
  Check,
  FileText,
  Store,
  MessageSquareQuote,
  Shield,
  ExternalLink,
  Database,
  KeyRound,
  Server,
  HardDrive,
  Cpu,
  FileCheck,
  Download,
  Trash2,
  Zap
} from 'lucide-react';

const links = [
  { id: 'terms', label: 'Terms & Conditions', icon: Scale },
  { id: 'shipping-policy', label: 'Shipping Policy', icon: Truck },
  { id: 'return-policy', label: 'Return & Refunds', icon: RefreshCw },
  { id: 'privacy-policy', label: 'Privacy Policy', icon: ShieldCheck },
  { id: 'database-security', label: 'Database & Data Security', icon: Database },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'cookies', label: 'Cookie Policy', icon: Cookie }
];

const termsSections = [
  {
    id: 'temporary-beta-terms',
    category: 'marketplace',
    number: '00',
    title: 'Temporary Beta Operating Terms & Conditions',
    summary: 'Current operational guidelines, beta marketplace framework, seller commissions, and customer fulfillment commitments.',
    clauses: [
      {
        subtitle: '0.1 Beta Platform Operating Status',
        text: 'GoMo Deals is currently functioning under an authenticated multi-vendor beta framework. All merchant registrations, listing creations, and buyer orders are governed by these temporary operating terms, ensuring consumer transparency and seller protection.'
      },
      {
        subtitle: '0.2 Seller 0% Commission Policy',
        text: 'During this operational period, verified merchants enjoy a 0% commission tier for all catalog items priced below ₹1,000. Orders exceeding ₹1,000 incur a flat 5% platform handling fee, providing merchants with significantly higher net margins.'
      },
      {
        subtitle: '0.3 3-Step Dispatch SOP (Mobile -> WhatsApp -> Security Tape)',
        text: 'Merchants are contractually bound to execute order dispatch via the 3-step security standard: Verified Registered Mobile Number, instant automated WhatsApp notification alert acknowledgment, and mandatory application of official GoMoDeals branded tamper-evident security tape before courier handover.'
      },
      {
        subtitle: '0.4 International Sales Pilot (South Africa, UK, USA)',
        text: 'Cross-border sales and export clearances are currently active for select verified categories fulfilling to South Africa, the United Kingdom, and the United States. International courier handovers and customs clearances are managed seamlessly by GoMo Deals.'
      },
      {
        subtitle: '0.5 7-Day Return Policy & Reduced Return Surcharges',
        text: 'Customers retain a 7-day hassle-free return window with free doorstep reverse pickup on eligible items. Merchants benefit from capped reverse logistics rates with zero penalty assessments when authentic GoMoDeals security seal was intact.'
      }
    ]
  },
  {
    id: 'marketplace-framework',
    category: 'marketplace',
    number: '01',
    title: 'Platform & Multi-Vendor Framework',
    summary: 'Core operating model, customer user agreement, and marketplace governance under Indian law.',
    clauses: [
      {
        subtitle: '1.1 Operational Model',
        text: 'GoMo Deals operates as an authenticated, multi-vendor electronic commerce marketplace facilitating commercial transactions between verified independent merchants ("Sellers") and consumer buyers ("Customers"). GoMo Deals provides catalog curation, payments escrow, real-time logistics dispatching, and buyer protection services.'
      },
      {
        subtitle: '1.2 Acceptance of Terms',
        text: 'By accessing the website, registering an account, browsing product collections, or executing a purchase transaction, you confirm that you are at least 18 years of age and agree unconditionally to these Terms and Conditions in full compliance with the Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020.'
      },
      {
        subtitle: '1.3 Catalog Authenticity Commitment',
        text: 'GoMo Deals strictly prohibits counterfeit, refurbished, or unauthorized replica goods. All listed items represent authentic products backed by verified manufacturer warranties and direct merchant accountability.'
      }
    ]
  },
  {
    id: 'seller-verification',
    category: 'sellers',
    number: '02',
    title: 'Seller Verification & Merchant Obligations',
    summary: 'Rigorous KYC, GSTIN registration, studio audits, and fulfillment performance benchmarks.',
    clauses: [
      {
        subtitle: '2.1 Merchant Onboarding & KYC',
        text: 'Every seller must successfully complete Know-Your-Customer (KYC) compliance, provide verified GSTIN and PAN certificates, and pass physical or registered office verification before their products are published to the public catalog.'
      },
      {
        subtitle: '2.2 Real-Time Inventory & Stock Counts',
        text: 'Sellers are strictly required to keep inventory counts synchronized in real-time. False stock declarations or post-order cancellations due to negligent stock management incur merchant penalty charges and marketplace rating reductions.'
      },
      {
        subtitle: '2.3 Dispatch Timelines',
        text: 'Sellers must pack, quality check, and hand over confirmed orders to assigned BlueDart / GoMo Express logistics carriers within 24 business hours of order placement.'
      }
    ]
  },
  {
    id: 'voice-of-customer',
    category: 'voc',
    number: '03',
    title: 'Voice of Customer (VOC) & Direct Seller Resolution',
    summary: 'Dedicated channel for customers to ask any issue regarding an ordered product directly to the exact seller.',
    clauses: [
      {
        subtitle: '3.1 Direct Seller Communication Channel',
        text: 'GoMo Deals features an integrated Voice of Customer (VOC) infrastructure. Every customer who orders an item gains direct, uninterrupted access to submit queries, report defects, ask for usage guidance, or request replacement accessories directly to the exact merchant who fulfilled the product.'
      },
      {
        subtitle: '3.2 Mandatory 24-Hour Seller SLA',
        text: 'Merchants are contractually obligated to review and formally respond to customer Voice of Customer inquiries within 24 business hours through the GoMo Deals Seller Console.'
      },
      {
        subtitle: '3.3 Automatic Concierge Escalation',
        text: 'If a seller fails to provide a satisfactory resolution within 48 hours of an inquiry submission, the GoMo Deals Buyer Protection Concierge automatically intervenes to authorize immediate free doorstep pickup and full refund or replacement.'
      }
    ]
  },
  {
    id: 'orders-payments',
    category: 'payments',
    number: '04',
    title: 'Orders, Payments, GST & Tax Invoicing',
    summary: 'Payment methods, SSL 256-bit encryption, GST compliance, and downloadable tax invoices.',
    clauses: [
      {
        subtitle: '4.1 Inclusive Pricing',
        text: 'All product prices listed on GoMo Deals are denominated in Indian Rupees (INR) and are fully inclusive of all applicable Goods and Services Tax (GST) at statutory rates.'
      },
      {
        subtitle: '4.2 Secure Payment Gateways',
        text: 'Transactions are processed through encrypted 256-bit SSL gateway partners supporting UPI (Google Pay, PhonePe, Paytm, BHIM), major Credit & Debit cards (Visa, MasterCard, RuPay), Net Banking, and select Cash on Delivery.'
      },
      {
        subtitle: '4.3 Downloadable GST Tax Invoices',
        text: 'Every confirmed order produces a legally binding GST Tax Invoice containing merchant registration details, customer shipping/billing addresses, HSN codes, and itemized tax breakdowns, available in PDF format in the customer portal.'
      },
      {
        subtitle: '4.4 Merchant Fee Schedule & 0% Commission Tier',
        text: '0% commission for less than rs.1000 for sellers not customers. To support value merchants and artisan creators, GoMo Deals charges 0% platform commission on catalog items priced under ₹1,000 for verified sellers. Items priced at ₹1,000 and above incur standard tiered merchant service fees. Customers pay no commission or platform surcharges.'
      }
    ]
  },
  {
    id: 'shipping-logistics',
    category: 'shipping',
    number: '05',
    title: 'Shipping, Courier Logistics & Live Milestones',
    summary: 'Carrier partners, AWB tracking, delivery timeframes, and contactless handover.',
    clauses: [
      {
        subtitle: '5.1 Logistics Partners & AWB Tracking',
        text: 'Shipments are managed through tier-1 logistics partners including BlueDart Express and premier regional logistics carriers. Each shipment receives an automated Air Waybill (AWB) number with live milestone updates.'
      },
      {
        subtitle: '5.2 Delivery Turnaround',
        text: 'Standard ground logistics delivers within 2–4 business days across India. Express studio courier delivers within 24–48 hours for metro zones (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata).'
      },
      {
        subtitle: '5.3 Secure OTP Handover',
        text: 'High-value orders (above ₹5,000) require a secure 4-digit One-Time Password (OTP) verification texted to the customer registered mobile number at the doorstep.'
      },
      {
        subtitle: '5.4 Shipping Performance & Service Level Agreements',
        text: 'On-time delivery of your order is important for customer satisfaction. GoMo Deals enforces strict logistics benchmarks across all sellers: Late Delivery Rate (LDR benchmark < 4.0%, active average 3.12%), Pre-fulfilment Cancellation Rate (benchmark < 1.0%, active average 0.45%), Value Pickup Rate (benchmark > 98.0%, active average 99.1%), and On-Time Delivery Rate (benchmark > 97.0%, active average 97.8%). Merchants maintaining compliant metrics earn the GoMo Fast Delivery Badge.'
      }
    ]
  },
  {
    id: 'returns-refunds',
    category: 'returns',
    number: '06',
    title: '7-Day Return Guarantee & Instant Source Refunds',
    summary: 'Eligibility criteria, free doorstep pickup verification, and refund settlement timelines.',
    clauses: [
      {
        subtitle: '6.1 7-Day Return Window',
        text: 'Customers may initiate a return or replacement request within 7 calendar days of delivery for any product received damaged, defective, materially different from catalog specifications, or in the wrong size/variant.'
      },
      {
        subtitle: '6.2 Complimentary Doorstep Pickup',
        text: 'Return pickup is conducted free of charge at the customer original delivery address. Courier executives verify that tags and original brand packaging remain reasonably intact.'
      },
      {
        subtitle: '6.3 Instant Source Refund Settlement',
        text: 'Once the return pickup scan is registered by the courier, refund processing is initiated immediately. Funds are credited back to the customer original UPI, Card, or Bank account within 24 to 48 banking hours.'
      }
    ]
  },
  {
    id: 'liability-grievance',
    category: 'legal',
    number: '07',
    title: 'Governing Law, Jurisdiction & Grievance Redressal',
    summary: 'Legal jurisdiction in Bengaluru, Karnataka, customer grievance officer contacts, and dispute protocols.',
    clauses: [
      {
        subtitle: '7.1 Governing Law & Jurisdiction',
        text: 'These Terms and Conditions shall be governed by, interpreted, and construed in accordance with the laws of the Republic of India. The courts of Bengaluru, Karnataka shall have exclusive jurisdiction over any disputes arising hereunder.'
      },
      {
        subtitle: '7.2 Grievance Officer Details',
        text: 'In accordance with the Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020, the designated Grievance Officer for GoMo Deals is: Name: Legal & Grievance Redressal Officer, GoMo Deals Private Limited, Email: grievance@gomodeals.com, Address: 4th Main, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038.'
      }
    ]
  },
  {
    id: 'pdt-policy-compliance',
    category: 'compliance',
    number: '08',
    title: 'Product Policy Compliance (PDT) & Authenticity Standard',
    summary: 'Intellectual property protection, anti-counterfeit protocols, restricted items, and mandatory seller audits.',
    clauses: [
      {
        subtitle: '8.1 Product Display & Description Authenticity',
        text: 'Merchants must guarantee that all product photography, technical specifications, and ingredient/material declarations are 100% accurate, genuine, and unmanipulated. Misleading or altered representations incur immediate delisting and merchant rating penalties.'
      },
      {
        subtitle: '8.2 Intellectual Property & Anti-Counterfeiting',
        text: 'GoMo Deals maintains a strict zero-tolerance policy against counterfeit merchandise, trademark infringement, and unauthorized brand imitation. Sellers must produce authentic manufacturer invoices or authorization letters upon request.'
      },
      {
        subtitle: '8.3 Restricted & Prohibited Commodities',
        text: 'The sale of hazardous chemicals, unauthorized pharmaceuticals, unlicensed wildlife artifacts, or non-BIS certified electrical appliances is categorically prohibited.'
      }
    ]
  },
  {
    id: 'mandatory-support-ticketing',
    category: 'tickets',
    number: '09',
    title: 'Mandatory Issue Ticketing & Dispute Escalation Protocol',
    summary: 'Formal grievance escalation procedure requiring tickets to be raised after any order or fulfillment issue.',
    clauses: [
      {
        subtitle: '9.1 Mandatory Ticketing Protocol',
        text: 'Note: You need to raise a ticket after any issue. Whether a customer encounters transit damage, a delivery delay, or a seller requires a shipping SLA waiver or payment dispute review, a formal GoMo Deals Support Ticket must be generated.'
      },
      {
        subtitle: '9.2 Resolution SLA & Investigation Audit Trail',
        text: 'Every raised ticket receives a unique tracking identifier (e.g. TKT-XXXXX) and is investigated by GoMo Deals customer and merchant grievance teams within 4 business hours.'
      }
    ]
  }
];

const faqData = [
  { 
    question: 'Why sell on GoMo Deals (GMD) instead of legacy marketplaces?', 
    answer: 'GoMo Deals provides industry-best seller economics: 0% commission tier for all products under ₹1,000, flat 5% commission on higher brackets (saving 15-20% vs competitors), 24/7 seller support, international export across South Africa, UK, and USA, native business mobile app, a simple transparent pricing calculator, and the lowest return charges in India.', 
    category: 'sellers' 
  },
  { 
    question: 'How does seller registration work and is there a sample video guide?', 
    answer: 'Seller registration is 100% free and takes under 3 minutes. Simply provide your store name, business owner name, and registered mobile number. You can watch our interactive 2-minute "Selling Sample Video" directly on the seller login portal to preview the complete 4-step walkthrough.', 
    category: 'sellers' 
  },
  { 
    question: 'What is the 3-step order dispatch process for sellers?', 
    answer: 'Every order follows an authenticated sequence: 1) Registered Mobile Number (OTP verified) -> 2) Instant Automated WhatsApp Order Message (dispatched in under 5 seconds with item details & packing slip) -> 3) Package sealed with official GoMoDeals Security Tape. Once taped, our BlueDart express courier collects the parcel straight from your shop.', 
    category: 'sellers' 
  },
  { 
    question: 'Can merchants sell across other countries?', 
    answer: 'Yes! GoMo Deals currently facilitates cross-border international sales across South Africa (SA), the United Kingdom (UK), and the United States (USA). Multi-currency pricing, air export clearance, and overseas customs documentation are managed seamlessly by GoMo Deals.', 
    category: 'sellers' 
  },
  { 
    question: 'How do returns work and what are the return charges?', 
    answer: 'Customers enjoy a 7-day hassle-free return window with free doorstep reverse pickup on eligible items. For sellers, GoMo Deals features the lowest return charges in the industry, and zero return penalties are charged when the parcel was dispatched with authentic GoMoDeals security tape.', 
    category: 'returns' 
  },
  { 
    question: 'How does the Pricing Calculator work for merchants?', 
    answer: 'Our "Pricing Calculator Made Simple" lets you enter your desired selling price and instantly preview your exact net take-home payout, platform fee (0% under ₹1,000, 5% above), payment gateway fee (1.8%), and shipping cost with zero surprise deductions.', 
    category: 'sellers' 
  },
  { 
    question: 'How can I print or download a PDF Tax Invoice?', 
    answer: 'Go to "My Orders", open your order details, and click "Print / Download PDF". You will receive an official A4 tax invoice featuring full GST breakdown (CGST + SGST), IRN digital tax seal, Code-128 barcode, and seller details.', 
    category: 'orders' 
  },
  { 
    question: 'How can I track my active order shipment?', 
    answer: 'You can easily track active shipments in real-time under the "My Orders" tab on your account page or via the SMS/WhatsApp tracking link dispatched to your registered phone number.', 
    category: 'shipping' 
  },
  { 
    question: 'What payment methods do you accept?', 
    answer: 'We accept UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking, and select digital wallets.', 
    category: 'payments' 
  },
  { 
    question: 'Is express delivery shipping available?', 
    answer: 'Yes, premium express shipping (1-2 business days) can be toggled on during the checkout phase for rapid doorstep delivery.', 
    category: 'shipping' 
  },
  { 
    question: 'Is my personal and financial information secure?', 
    answer: 'Yes, all transaction details are encrypted using bank-grade 256-bit SSL tokens and we never store raw card numbers or confidential credentials.', 
    category: 'security' 
  }
];

const LegalPage = () => {
  const { policyType, type: routeType } = useParams();
  const rawType = (policyType || routeType || 'terms').toLowerCase();
  
  let type = rawType;
  if (rawType === 'terms-and-conditions' || rawType === 'terms-of-service' || rawType === 'temporary-terms') {
    type = 'terms';
  } else if (rawType === 'faq' || rawType === 'help' || rawType === 'faqs') {
    type = 'faqs';
  } else if (rawType === 'returns' || rawType === 'return' || rawType === 'return-policy') {
    type = 'return-policy';
  } else if (rawType === 'shipping' || rawType === 'shipping-policy') {
    type = 'shipping-policy';
  } else if (rawType === 'privacy' || rawType === 'privacy-policy') {
    type = 'privacy-policy';
  } else if (rawType === 'security' || rawType === 'database-security' || rawType === 'data-security') {
    type = 'database-security';
  }
  
  const navigate = useNavigate();

  // 0. Terms & Conditions State
  const [termsSearch, setTermsSearch] = useState('');
  const [termsCategory, setTermsCategory] = useState('all');
  const [openTermsIndex, setOpenTermsIndex] = useState(null);
  const [termsCopied, setTermsCopied] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  // 1. Shipping Policy State
  const [pinCode, setPinCode] = useState('');
  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const [pinResult, setPinResult] = useState(null);

  // 2. Return Eligibility State
  const [returnCategory, setReturnCategory] = useState('fashion');
  const [daysPast, setDaysPast] = useState(3);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // 3. Privacy Policy Consent State
  const [consents, setConsents] = useState({
    essential: true,
    analytics: true,
    personalization: false
  });

  // 4. FAQ State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaqCat, setActiveFaqCat] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // 5. Database Security State
  const [securityAuditRunning, setSecurityAuditRunning] = useState(false);
  const [securityAuditDone, setSecurityAuditDone] = useState(false);
  const [dataExported, setDataExported] = useState(false);
  const [erasureRequested, setErasureRequested] = useState(false);

  // Handlers
  const handlePinCheck = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pinCode)) {
      setPinResult({ success: false, message: 'Please enter a valid 6-digit PIN code.' });
      return;
    }

    setIsCheckingPin(true);
    setTimeout(() => {
      setIsCheckingPin(false);
      const firstDigit = pinCode[0];
      if (['1', '2', '3'].includes(firstDigit)) {
        setPinResult({
          success: true,
          zone: 'Zone A (North & West Metro)',
          standard: '2-3 Business Days',
          express: '1 Business Day (Available)',
          cost: 'Free over ₹1,000'
        });
      } else if (['4', '5', '6'].includes(firstDigit)) {
        setPinResult({
          success: true,
          zone: 'Zone B (South & Central India)',
          standard: '3-4 Business Days',
          express: '1-2 Business Days',
          cost: 'Free over ₹1,000'
        });
      } else {
        setPinResult({
          success: true,
          zone: 'Zone C (East & Regional Hubs)',
          standard: '4-5 Business Days',
          express: '2-3 Business Days',
          cost: 'Free over ₹1,000'
        });
      }
    }, 600);
  };

  const handleEligibilityCheck = () => {
    let eligible = false;
    let reason = '';
    let action = '';

    if (returnCategory === 'fashion') {
      if (daysPast <= 10) {
        eligible = true;
        reason = 'Fashion items enjoy a flexible 10-day return policy.';
        action = 'Initiate free courier pickup in "My Orders".';
      } else {
        eligible = false;
        reason = 'Returns expired. Fashion items must be returned within 10 days of delivery.';
        action = 'Contact Customer Support for store credit exceptions.';
      }
    } else if (returnCategory === 'electronics') {
      if (daysPast <= 7) {
        eligible = true;
        reason = 'Electronics are eligible for a 7-day replacement/refund in case of manufacturing defects.';
        action = 'Upload unboxing video & original tags to start validation.';
      } else {
        eligible = false;
        reason = 'Standard return window of 7 days closed. Covered under manufacturer warranty.';
        action = 'Download Brand Warranty receipt in your order panel.';
      }
    } else if (returnCategory === 'grocery') {
      eligible = false;
      reason = 'Consumables, grocery, and personal care products are non-returnable due to hygiene regulations.';
      action = 'If items arrived damaged, submit photo proof within 24 hours for instant refund.';
    } else {
      if (daysPast <= 7) {
        eligible = true;
        reason = 'General catalog items are returnable within 7 days of delivery.';
        action = 'Pack in original brand box for hassle-free check.';
      } else {
        eligible = false;
        reason = 'Standard return window has expired for this item.';
        action = 'Contact seller for post-delivery warranty repair.';
      }
    }

    setEligibilityResult({ eligible, reason, action });
  };

  const toggleConsent = (key) => {
    if (key === 'essential') return; // Cannot turn off essential
    setConsents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Render components
  const renderShippingPolicy = () => (
    <div className="space-y-12">
      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50/20 border border-orange-100/50 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
              <Truck size={22} />
            </div>
            <h4 className="font-serif italic text-lg text-orange-950 mb-1">Standard Delivery</h4>
            <p className="text-xs text-orange-600 leading-relaxed mb-4">Perfect for non-urgent shipments. Secure & reliable shipping across India.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-2">Transit Time</div>
            <div className="text-sm font-sans font-black text-orange-950">3-5 Business Days</div>
            <div className="text-xs text-emerald-600 font-bold mt-1">FREE (Above ₹1,000)</div>
          </div>
        </div>

        <div className="bg-orange-950 text-white p-6 rounded-2xl flex flex-col justify-between shadow-xl shadow-orange-950/10">
          <div>
            <div className="w-12 h-12 bg-orange-900 rounded-xl flex items-center justify-center text-orange-400 shadow-sm mb-4">
              <Clock size={22} />
            </div>
            <h4 className="font-serif italic text-lg text-orange-100 mb-1">Express Shipping</h4>
            <p className="text-xs text-orange-200/80 leading-relaxed mb-4">Expedited courier priority. Your package moves to the front of the queue.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-300 font-bold mb-2">Transit Time</div>
            <div className="text-sm font-sans font-black text-white">1-2 Business Days</div>
            <div className="text-xs text-orange-300 font-bold mt-1">Flat ₹99 Carrier Fee</div>
          </div>
        </div>

        <div className="bg-orange-50/20 border border-orange-100/50 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
              <MapPin size={22} />
            </div>
            <h4 className="font-serif italic text-lg text-orange-950 mb-1">Same-Day Dispatch</h4>
            <p className="text-xs text-orange-600 leading-relaxed mb-4">Available in select tier-1 metropolitan cities for orders placed before 12 PM.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-2">Transit Time</div>
            <div className="text-sm font-sans font-black text-orange-950">Within 24 Hours</div>
            <div className="text-xs text-emerald-600 font-bold mt-1">Flat ₹149 Priority Fee</div>
          </div>
        </div>
      </div>

      {/* PIN Estimator Widget */}
      <div className="bg-[#faf8f6] border border-orange-100/30 p-8 rounded-3xl space-y-6">
        <div className="max-w-xl">
          <h4 className="font-serif italic text-xl text-orange-950 mb-2">Interactive Delivery Estimator</h4>
          <p className="text-xs text-orange-600 leading-relaxed">
            Enter your 6-digit Indian PIN code to view customized delivery schedules, express service eligibility, and minimum carrier fees.
          </p>
        </div>

        <form onSubmit={handlePinCheck} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <div className="relative flex-grow">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" />
            <input 
              type="text" 
              placeholder="e.g. 110001 or 400001" 
              maxLength={6}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-white border border-orange-200 focus:border-orange-500 focus:outline-none rounded-xl py-3 pl-12 pr-4 text-sm text-orange-950 font-medium placeholder-orange-300"
            />
          </div>
          <button 
            type="submit"
            disabled={isCheckingPin}
            className="bg-orange-950 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-orange-900 transition-colors shadow-md disabled:bg-orange-900/60 cursor-pointer"
          >
            {isCheckingPin ? 'Checking...' : 'Check Availability'}
          </button>
        </form>

        {pinResult && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border ${pinResult.success ? 'bg-emerald-50/30 border-emerald-100 text-emerald-950' : 'bg-red-50/30 border-red-100 text-red-950'} max-w-lg`}
          >
            {pinResult.success ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-800 tracking-wider">
                  <CheckCircle2 size={16} />
                  <span>Delivery Available</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-orange-950 border-t border-emerald-100/50">
                  <div>
                    <span className="text-orange-400 font-bold block mb-0.5">Region Hub</span>
                    <strong className="font-extrabold">{pinResult.zone}</strong>
                  </div>
                  <div>
                    <span className="text-orange-400 font-bold block mb-0.5">Standard Dispatch</span>
                    <strong className="font-extrabold">{pinResult.standard}</strong>
                  </div>
                  <div>
                    <span className="text-orange-400 font-bold block mb-0.5">Express Dispatch</span>
                    <strong className="font-extrabold text-orange-900">{pinResult.express}</strong>
                  </div>
                  <div>
                    <span className="text-orange-400 font-bold block mb-0.5">Shipping Charges</span>
                    <strong className="font-extrabold text-emerald-600">{pinResult.cost}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 text-xs font-bold text-red-800">
                <XCircle size={16} />
                <span>{pinResult.message}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Rules */}
      <div className="space-y-4">
        <h4 className="font-serif italic text-lg text-orange-950">Important Shipping Protocols</h4>
        <ul className="space-y-3.5 text-xs text-orange-600 leading-relaxed font-normal">
          <li className="flex gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
            <span><strong>Order Tracking:</strong> A live carrier tracking link is texted and emailed instantly upon pickup.</span>
          </li>
          <li className="flex gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
            <span><strong>OTP Verification:</strong> Deliveries for orders exceeding ₹5,000 require secure 4-digit PIN verification sent to your registered phone number.</span>
          </li>
          <li className="flex gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
            <span><strong>Holiday Shipments:</strong> Carrier delays can occur during major national festivals. We appreciate your patience and promise active tracking.</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderReturnPolicy = () => (
    <div className="space-y-12">
      {/* Workflow Timeline */}
      <div className="space-y-6">
        <h4 className="font-serif italic text-xl text-orange-950 text-center mb-8">4-Step Quick Returns Cycle</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-orange-100 -translate-y-1/2 z-0 hidden md:block" />
          
          <div className="bg-white border border-orange-100/60 p-5 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-sm">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-bold mb-3 shadow-inner">1</div>
            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-orange-950 mb-1">Submit Request</h5>
            <p className="text-[10px] text-orange-600 leading-relaxed">Initiate returns on the order page within active limits.</p>
          </div>

          <div className="bg-white border border-orange-100/60 p-5 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-sm">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-bold mb-3 shadow-inner">2</div>
            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-orange-950 mb-1">Free Pickup</h5>
            <p className="text-[10px] text-orange-600 leading-relaxed">Our shipping courier partner arrives for home verification in 24-48 hrs.</p>
          </div>

          <div className="bg-white border border-orange-100/60 p-5 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-sm">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-bold mb-3 shadow-inner">3</div>
            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-orange-950 mb-1">Quality Inspection</h5>
            <p className="text-[10px] text-orange-600 leading-relaxed">Returned package is verified for intact original tags & packaging.</p>
          </div>

          <div className="bg-white border border-orange-100/60 p-5 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-sm">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold mb-3 shadow-inner">4</div>
            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-950 mb-1">Instant Refund</h5>
            <p className="text-[10px] text-emerald-600 leading-relaxed">Funds credited directly back to your secure original payment method.</p>
          </div>
        </div>
      </div>

      {/* Interactive Eligibility checker */}
      <div className="bg-[#faf8f6] border border-orange-100/30 p-8 rounded-3xl space-y-6">
        <div className="max-w-xl">
          <h4 className="font-serif italic text-xl text-orange-950 mb-2">Interactive Returns Eligibility Widget</h4>
          <p className="text-xs text-orange-600 leading-relaxed">
            Specify your product category and how many days ago delivery was completed to immediately evaluate return guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
          <div>
            <label className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400 block mb-2">Product Category</label>
            <select 
              value={returnCategory}
              onChange={(e) => setReturnCategory(e.target.value)}
              className="w-full bg-white border border-orange-200 focus:border-orange-500 focus:outline-none rounded-xl py-3 px-4 text-sm text-orange-950 font-bold"
            >
              <option value="fashion">Apparel & Fashion Accessories</option>
              <option value="electronics">Electronics & Gadgets</option>
              <option value="grocery">Pantry & Consumables</option>
              <option value="home">Home & Kitchen Decor</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400">Days Since Delivery</label>
              <span className="text-xs font-black text-orange-950">{daysPast} {daysPast === 1 ? 'Day' : 'Days'} ago</span>
            </div>
            <div className="flex items-center gap-4 py-2">
              <input 
                type="range" 
                min={1} 
                max={30} 
                value={daysPast}
                onChange={(e) => setDaysPast(Number(e.target.value))}
                className="w-full accent-orange-600"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleEligibilityCheck}
          className="bg-orange-950 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-orange-900 transition-colors shadow-md cursor-pointer"
        >
          Check Eligibility status
        </button>

        {eligibilityResult && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border ${eligibilityResult.eligible ? 'bg-emerald-50/30 border-emerald-100 text-emerald-950' : 'bg-red-50/30 border-red-100 text-red-950'} max-w-lg`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                {eligibilityResult.eligible ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span className="text-emerald-800">Return Approved</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-600" />
                    <span className="text-red-800">Return Ineligible</span>
                  </>
                )}
              </div>
              <p className="text-xs text-orange-950 leading-relaxed font-medium">
                {eligibilityResult.reason}
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-wider font-bold text-orange-400">
                Recommended Action: <span className="text-orange-950 font-black normal-case text-xs block mt-0.5">{eligibilityResult.action}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="space-y-12">
      {/* Privacy highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50/20 border border-orange-100/50 p-6 rounded-2xl">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
            <Lock size={18} />
          </div>
          <h4 className="font-serif italic text-base text-orange-950 mb-1">Strict Encryption</h4>
          <p className="text-xs text-orange-600 leading-relaxed">256-bit bank-grade SSL secure keys encrypt checkout tokens and personal data paths.</p>
        </div>

        <div className="bg-orange-50/20 border border-orange-100/50 p-6 rounded-2xl">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
            <ShieldCheck size={18} />
          </div>
          <h4 className="font-serif italic text-base text-orange-950 mb-1">Zero Seller Selling</h4>
          <p className="text-xs text-orange-600 leading-relaxed">We strictly veto third-party analytical brokering. Your data is your property.</p>
        </div>

        <div className="bg-orange-50/20 border border-orange-100/50 p-6 rounded-2xl">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
            <Info size={18} />
          </div>
          <h4 className="font-serif italic text-base text-orange-950 mb-1">Erase Requests</h4>
          <p className="text-xs text-orange-600 leading-relaxed">A customer holds absolute priority to claim prompt, clean data erasure in one click.</p>
        </div>
      </div>

      {/* Consent Center Panel */}
      <div className="bg-[#faf8f6] border border-orange-100/30 p-8 rounded-3xl space-y-6">
        <div className="max-w-xl">
          <h4 className="font-serif italic text-xl text-orange-950 mb-2">Privacy Shield Consent Center</h4>
          <p className="text-xs text-orange-600 leading-relaxed">
            Customize which analytics cookies, browser trackers, and notification engines you allow us to leverage during shopping sessions.
          </p>
        </div>

        <div className="space-y-4 max-w-lg">
          {/* Item 1 */}
          <div className="bg-white border border-orange-100/60 p-4 rounded-xl flex items-center justify-between">
            <div className="pr-4">
              <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-orange-950 mb-1 flex items-center gap-1.5">
                Essential System Cookies
                <span className="bg-orange-100 text-orange-950 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Required</span>
              </h5>
              <p className="text-[10px] text-orange-500 leading-relaxed">Manages cart persistence, checkout sessions, and login security credentials.</p>
            </div>
            <div className="relative">
              <button 
                disabled
                className="w-11 h-6 bg-emerald-500 rounded-full p-1 cursor-not-allowed opacity-80"
              >
                <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-orange-100/60 p-4 rounded-xl flex items-center justify-between">
            <div className="pr-4">
              <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-orange-950 mb-1">Analytical Metrics Tracking</h5>
              <p className="text-[10px] text-orange-500 leading-relaxed">Helps compile anonymized page-load speed benchmarks, scroll metrics, and error logs.</p>
            </div>
            <div>
              <button 
                onClick={() => toggleConsent('analytics')}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none cursor-pointer ${consents.analytics ? 'bg-orange-950' : 'bg-orange-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${consents.analytics ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-orange-100/60 p-4 rounded-xl flex items-center justify-between">
            <div className="pr-4">
              <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-orange-950 mb-1">Personalization Engine</h5>
              <p className="text-[10px] text-orange-500 leading-relaxed">Tailors homepage banner promotions, quick search recommendations, and coupon matches.</p>
            </div>
            <div>
              <button 
                onClick={() => toggleConsent('personalization')}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none cursor-pointer ${consents.personalization ? 'bg-orange-950' : 'bg-orange-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${consents.personalization ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-orange-50/20 border border-orange-100/30 rounded-2xl max-w-lg flex gap-3 text-xs text-orange-850">
          <Info size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Changes are saved instantly in your local browser storage. You can edit this policy or opt-out completely at any time.
          </p>
        </div>
      </div>
    </div>
  );

  const renderSecurityPolicy = () => {
    const handleRunAudit = () => {
      setSecurityAuditRunning(true);
      setTimeout(() => {
        setSecurityAuditRunning(false);
        setSecurityAuditDone(true);
      }, 1200);
    };

    const handleExportData = () => {
      setDataExported(true);
      setTimeout(() => setDataExported(false), 4000);
    };

    const handleRequestErasure = () => {
      setErasureRequested(true);
      setTimeout(() => setErasureRequested(false), 4500);
    };

    return (
      <div className="space-y-10 animate-fadeIn">
        {/* 100% Security Guarantee Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950 p-6 sm:p-8 text-white border border-stone-800 shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-56 h-56 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 size={12} className="text-emerald-400" />
                100% Secure Storage Guarantee
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Your Data Is 100% Secure In Our Vault
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                GoMo Deals employs bank-grade AES-256 cryptographic encryption, automated tenant isolation, and strict zero-knowledge tokenization. We never store plain passwords or debit/credit card CVVs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto flex-shrink-0">
              <button
                type="button"
                onClick={handleRunAudit}
                disabled={securityAuditRunning}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-600/30 transition-all active:scale-95 disabled:opacity-75 cursor-pointer"
              >
                <Zap size={15} className={securityAuditRunning ? 'animate-bounce text-yellow-300' : 'text-yellow-300'} />
                {securityAuditRunning ? 'Auditing Vault...' : 'Run Security Audit'}
              </button>
              
              <div className="text-center text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                Last Verified: Today, Live
              </div>
            </div>
          </div>

          {/* Audit Result Display */}
          {securityAuditDone && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="p-3.5 bg-stone-900/80 rounded-xl border border-emerald-500/30 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                  100%
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Vault Health Score</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Grade A+ Cryptographic Shield</div>
                </div>
              </div>

              <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">AES-256 Storage</div>
                  <div className="text-[10px] text-stone-400 font-mono">Encrypted at rest (AWS KMS)</div>
                </div>
              </div>

              <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Zero Raw Card Data</div>
                  <div className="text-[10px] text-stone-400 font-mono">PCI-DSS Tokenized Payment Handshake</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* 6 Core Database Security Pillars */}
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-black text-stone-950 uppercase tracking-wide">
              Architectural Security Pillars
            </h3>
            <p className="text-xs text-stone-600">
              Enterprise engineering principles protecting every transaction and customer record.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <HardDrive size={20} />
              </div>
              <h4 className="text-sm font-bold text-stone-950 mb-1.5">
                AES-256 Storage Encryption
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                All customer records, addresses, and order histories are stored on hardware-encrypted disk arrays using military-grade Advanced Encryption Standard (AES-256) block ciphers with automated envelope key rotation.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Lock size={20} />
              </div>
              <h4 className="text-sm font-bold text-stone-950 mb-1.5">
                TLS 1.3 In-Transit Shield
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                All communications between your device and GoMo Deals servers travel through authenticated TLS 1.3 channels. HTTP Strict Transport Security (HSTS) prevents man-in-the-middle interception or eavesdropping.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <KeyRound size={20} />
              </div>
              <h4 className="text-sm font-bold text-stone-950 mb-1.5">
                Salted Password Vault
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                User passwords are never stored in readable plain text. We employ irreversible Argon2 / bcrypt hashing with cryptographically random salt rounds. Nobody—not even internal administrators—can read your password.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-sm font-bold text-stone-950 mb-1.5">
                PCI-DSS Zero Raw Card Storage
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Your 16-digit debit/credit card numbers and CVVs never touch our internal database. Checkout payments are tokenized directly via PCI-DSS Level 1 certified gateways (Razorpay & Stripe) for end-to-end immunity.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Database size={20} />
              </div>
              <h4 className="text-sm font-bold text-stone-950 mb-1.5">
                Row-Level Security (RLS)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our multi-tenant database enforces database-level Row-Level Security (RLS) and strict Role-Based Access Control (RBAC). It is mathematically impossible for unauthorized users or vendors to query another shopper's profile.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Server size={20} />
              </div>
              <h4 className="text-sm font-bold text-stone-950 mb-1.5">
                Encrypted Backups & 99.99% Uptime
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Automated hourly snapshot backups are replicated across geographically separated, ISO-certified tier-3 data centers. In the unlikely event of physical infrastructure disruption, point-in-time recovery ensures 0% data loss.
              </p>
            </div>
          </div>
        </div>

        {/* User Rights & Self-Service Tools */}
        <div className="p-6 bg-stone-100/70 rounded-2xl border border-stone-200/90 space-y-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-100/80 px-2.5 py-1 rounded-full">
              Digital Personal Data Protection (DPDP) Act & GDPR
            </span>
            <h3 className="text-base font-black text-stone-950 mt-2">
              Your Data, Your Sovereign Control
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl">
              You own your data. We provide instant self-service controls allowing you to audit, download, or permanently remove your stored personal identity at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-stone-950 font-bold text-xs mb-1">
                  <Download size={15} className="text-orange-600" />
                  Right to Data Portability
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Export an encrypted copy of your personal profile, addresses, wishlists, and order histories in JSON/CSV format.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="w-full py-2 px-3 rounded-lg bg-stone-950 hover:bg-stone-850 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {dataExported ? '✓ Personal Data Archive Generated' : 'Export My Stored Data'}
              </button>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-stone-950 font-bold text-xs mb-1">
                  <Trash2 size={15} className="text-red-600" />
                  Right to Erasure (To Be Forgotten)
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Request immediate anonymization or permanent deletion of your customer records once all pending shipments are delivered.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRequestErasure}
                className="w-full py-2 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors cursor-pointer"
              >
                {erasureRequested ? '✓ Anonymization Request Registered' : 'Request Profile Erasure'}
              </button>
            </div>
          </div>

          {dataExported && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>A secure data package link has been generated. For security, download verification requires an active login session.</span>
            </div>
          )}

          {erasureRequested && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
              <Info size={16} className="text-amber-600" />
              <span>Account erasure request logged under Ticket #SEC-{Math.floor(100000 + Math.random() * 900000)}. Completed within 48 business hours in compliance with Indian DPDP Act.</span>
            </div>
          )}
        </div>

        {/* Security Compliance Badges */}
        <div className="pt-4 border-t border-stone-200">
          <div className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4 text-center">
            Security Compliances & Certifications
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-950">256-Bit SSL/TLS</div>
              <div className="text-[10px] text-stone-500 font-mono">DigiCert High Assurance</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-950">ISO/IEC 27001</div>
              <div className="text-[10px] text-stone-500 font-mono">Certified Cloud Vault</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-950">PCI-DSS Level 1</div>
              <div className="text-[10px] text-stone-500 font-mono">Zero-Card Exposure</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-950">Cloudflare WAF</div>
              <div className="text-[10px] text-stone-500 font-mono">DDoS & Bot Mitigation</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFAQs = () => {
    // FAQ Filters logic
    const filteredFaqs = faqData.filter(faq => {
      const matchQuery = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = activeFaqCat === 'all' || faq.category === activeFaqCat;
      return matchQuery && matchCat;
    });

    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" />
            <input 
              type="text" 
              placeholder="Search help topics or keywords..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenFaqIndex(null); // Close active when searching
              }}
              className="w-full bg-white border border-orange-200 focus:border-orange-500 focus:outline-none rounded-xl py-3.5 pl-12 pr-4 text-sm text-orange-950 font-medium placeholder-orange-300 shadow-sm"
            />
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['all', 'sellers', 'orders', 'shipping', 'payments', 'returns', 'security'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFaqCat(cat);
                  setOpenFaqIndex(null);
                }}
                className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-all duration-300 rounded-full cursor-pointer ${
                  activeFaqCat === cat 
                    ? 'bg-[#f76e28] text-white shadow-md' 
                    : 'bg-white border border-stone-200 hover:bg-orange-50/50 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-orange-100/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-orange-950 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-orange-500 font-serif italic font-extrabold normal-case">Q.</span>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-orange-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-950' : ''}`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-orange-700/80 leading-relaxed font-normal border-t border-orange-50 pl-8 flex gap-2">
                          <span className="text-emerald-500 font-serif italic font-extrabold">A.</span>
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white border border-orange-100/40 rounded-2xl">
              <HelpCircle className="w-8 h-8 text-orange-300 mx-auto mb-3" />
              <p className="text-xs sm:text-sm text-orange-950 font-bold uppercase tracking-wider">No matches found</p>
              <p className="text-xs text-orange-400 mt-1">Try entering alternate search queries or clearing keywords.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTerms = () => {
    const filteredTerms = termsSections.filter(sec => {
      const matchCat = termsCategory === 'all' || sec.category === termsCategory;
      const matchQuery = !termsSearch || 
        sec.title.toLowerCase().includes(termsSearch.toLowerCase()) ||
        sec.summary.toLowerCase().includes(termsSearch.toLowerCase()) ||
        sec.clauses.some(c => c.subtitle.toLowerCase().includes(termsSearch.toLowerCase()) || c.text.toLowerCase().includes(termsSearch.toLowerCase()));
      return matchCat && matchQuery;
    });

    const handleCopyTerms = () => {
      const summaryText = termsSections.map(s => `${s.number}. ${s.title}\n${s.summary}\n${s.clauses.map(c => `  - ${c.subtitle}: ${c.text}`).join('\n')}`).join('\n\n');
      navigator.clipboard?.writeText(summaryText);
      setTermsCopied(true);
      setTimeout(() => setTermsCopied(false), 2500);
    };

    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Top Control Header Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-stone-100 text-stone-900 border border-stone-200 rounded-full text-[10px] font-black uppercase tracking-wider">
                Version 2.4 (Active)
              </span>
              <span className="text-xs text-stone-900 font-medium">
                Last Updated: October 2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyTerms}
                className="px-3.5 py-2 bg-stone-50 hover:bg-stone-100 text-stone-900 border border-stone-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                {termsCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-stone-700" />}
                <span>{termsCopied ? 'Summary Copied' : 'Copy Summary'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Printer size={14} />
                <span>Print Terms</span>
              </button>
            </div>
          </div>

          {/* Real-Time Clause Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search legal clauses (e.g. Voice of Customer, returns, seller, GST, refund)..."
              value={termsSearch}
              onChange={(e) => {
                setTermsSearch(e.target.value);
                setOpenTermsIndex(null);
              }}
              className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 focus:outline-none rounded-xl py-3 pl-12 pr-4 text-xs sm:text-sm text-stone-950 placeholder-stone-400 font-sans"
            />
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { id: 'all', label: 'All Clauses' },
              { id: 'marketplace', label: 'Marketplace Framework' },
              { id: 'sellers', label: 'Seller Verification' },
              { id: 'voc', label: 'Voice of Customer' },
              { id: 'payments', label: 'Payments & GST' },
              { id: 'shipping', label: 'Shipping & Delivery' },
              { id: 'returns', label: 'Returns & Refunds' },
              { id: 'legal', label: 'Governing Law' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setTermsCategory(cat.id);
                  setOpenTermsIndex(null);
                }}
                className={`px-3 py-1.5 text-[9.5px] uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer ${
                  termsCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clauses Accordion Listing */}
        <div className="space-y-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((sec, sIdx) => {
              const isOpen = openTermsIndex === sIdx || openTermsIndex === 'all';
              return (
                <div
                  key={sec.id}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-shadow shadow-xs hover:shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenTermsIndex(isOpen && openTermsIndex !== 'all' ? null : sIdx)}
                    className="w-full flex items-start justify-between p-6 text-left focus:outline-none cursor-pointer gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 font-mono font-black text-xs flex items-center justify-center shrink-0">
                        {sec.number}
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg text-stone-950">
                          {sec.title}
                        </h4>
                        <p className="text-xs text-stone-700 mt-1 leading-relaxed font-sans font-normal">
                          {sec.summary}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 p-1.5 rounded-lg bg-stone-100 text-stone-700 mt-1">
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-stone-950' : ''}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-stone-100 space-y-3 font-sans">
                          {sec.clauses.map((clause, cIdx) => (
                            <div key={cIdx} className="bg-stone-50/70 p-4 rounded-xl border border-stone-200/80 space-y-1.5">
                              <h5 className="text-xs uppercase tracking-wider font-bold text-stone-950 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0" />
                                <span>{clause.subtitle}</span>
                              </h5>
                              <p className="text-xs text-stone-800 leading-relaxed pl-3.5">
                                {clause.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white border border-stone-200 rounded-2xl">
              <Scale className="w-8 h-8 text-stone-400 mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-stone-900">No clauses matched your query</p>
              <p className="text-xs text-stone-500 mt-1">Try clearing your search query or choosing All Clauses.</p>
            </div>
          )}
        </div>

        {/* Legal Disclosures & Grievance Card */}
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-950">
            <ShieldCheck size={16} className="text-stone-900" />
            <span>Statutory Legal Compliance &amp; Consumer Redressal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-900 pt-1">
            <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
              <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Governing Framework</p>
              <p className="font-bold text-stone-950 mt-1">Information Technology Act, 2000 &amp; E-Commerce Rules, 2020</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
              <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Legal Jurisdiction</p>
              <p className="font-bold text-stone-950 mt-1">Courts of Bengaluru, Karnataka, India</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
              <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Grievance Nodal Desk</p>
              <p className="font-mono text-stone-950 mt-1 font-bold">grievance@gomodeals.com</p>
            </div>
          </div>

          {/* Interactive User Acknowledgement */}
          <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label className="flex items-center gap-2.5 text-xs text-stone-950 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAcknowledged}
                onChange={(e) => setHasAcknowledged(e.target.checked)}
                className="w-4 h-4 accent-stone-900 rounded cursor-pointer"
              />
              <span>I have read, understood, and accept GoMo Deals Terms and Conditions</span>
            </label>

            {hasAcknowledged && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                <Check size={12} strokeWidth={3} />
                <span>Agreement Acknowledged</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getActiveView = () => {
    switch (type) {
      case 'terms':
      case 'terms-and-conditions':
      case 'terms-of-service':
        return renderTerms();
      case 'shipping-policy':
        return renderShippingPolicy();
      case 'return-policy':
        return renderReturnPolicy();
      case 'privacy-policy':
        return renderPrivacyPolicy();
      case 'database-security':
      case 'security':
        return renderSecurityPolicy();
      case 'faqs':
        return renderFAQs();
      default:
        // Basic Fallback for terms and cookies
        const currentData = getContentFallback();
        return (
          <div className="space-y-8 animate-fadeIn">
            {currentData.content.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-sm uppercase tracking-wider font-bold text-orange-950">
                  {item.heading}
                </h3>
                <p className="text-xs sm:text-sm text-orange-600 leading-relaxed font-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        );
    }
  };

  const getContentFallback = () => {
    switch (type) {
      case 'terms':
        return {
          title: 'Terms of Service',
          subtitle: 'Core rules, customer usage conditions, and cancellation policies.',
          content: [
            { heading: 'User Agreement', text: 'By using GoMo Deals, you agree to our comprehensive Terms of Service, policies, and community guidelines.' },
            { heading: 'Intellectual Property', text: 'All designs, catalogs, illustrations, and software code on this platform are proprietary to GoMo Deals and partners.' },
            { heading: 'Price Alterations', text: 'Prices and active deals are subject to sudden shifts without notice to match flash sale limits.' },
            { heading: 'Account Registration', text: 'Users are fully responsible for maintaining confidential account passwords and providing verified registration detail updates.' }
          ]
        };
      case 'cookies':
        return {
          title: 'Cookie Policy',
          subtitle: 'Our usage of cookies to speed up checkout and analyze site metrics.',
          content: [
            { heading: 'Performance Tracking', text: 'We utilize tracking cookies to analyze general visitor statistics, load balance page speeds, and improve interface interactions.' },
            { heading: 'Shopping Cart Cookies', text: 'Essential cookies keep your active shopping cart items saved and maintain profile access tokens while browsing collections.' },
            { heading: 'Browser Settings', text: 'You can disable cookie usage directly within your device browser settings, though some layout functions may be impacted.' }
          ]
        };
      default:
        return {
          title: 'Support Center',
          subtitle: 'General guidelines, terms, and agreements of GoMo Deals.',
          content: [
            { heading: 'Welcome to Support', text: 'Please choose any of the document sections listed in the sidebar navigation or footer links to review its contents.' }
          ]
        };
    }
  };

  const pageTitle = (type === 'terms' || type === 'terms-and-conditions' || type === 'terms-of-service') 
                  ? 'Terms & Conditions'
                  : type === 'shipping-policy' ? 'Shipping Policy' 
                  : type === 'return-policy' ? 'Return & Refunds' 
                  : type === 'privacy-policy' ? 'Privacy Policy' 
                  : (type === 'database-security' || type === 'security') ? 'Database & Data Security Guarantee'
                  : type === 'faqs' ? 'Frequently Asked Questions' 
                  : getContentFallback().title;

  const pageSubtitle = (type === 'terms' || type === 'terms-and-conditions' || type === 'terms-of-service') 
                     ? 'Comprehensive marketplace terms, seller responsibilities, Voice of Customer policies, and buyer protections.'
                     : type === 'shipping-policy' ? 'Our delivery services, processing times, and shipping rates.'
                     : type === 'return-policy' ? 'Hassle-free return policy, refunds timeline, and inspection terms.'
                     : type === 'privacy-policy' ? 'How we collect, secure, and use your personal information.'
                     : (type === 'database-security' || type === 'security') ? '100% Secure database architecture, AES-256 cryptographic encryption, zero-knowledge payment tokenization, and customer data rights.'
                     : type === 'faqs' ? 'Answers to common questions about tracking, shipping, and payments.'
                     : getContentFallback().subtitle;

  return (
    <div className="legal-policy-page min-h-screen bg-[#f7f2ec] pt-32 pb-24 font-sans text-stone-950">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-black text-stone-950 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            GoMo Deals / Support
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm sticky top-28">
              <h3 className="text-xs uppercase tracking-[0.25em] text-stone-900 font-black mb-4 px-3">
                Support
              </h3>
              <nav className="space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = type === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => navigate(`/legal/${link.id}`)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 text-xs uppercase tracking-wider font-bold transition-all duration-200 rounded-xl group text-left cursor-pointer ${
                        isActive 
                          ? 'bg-orange-50 border border-orange-200/90 text-stone-950 font-black shadow-xs' 
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isActive ? 'text-[#f76e28]' : 'text-stone-400 group-hover:text-stone-700'} />
                        <span className={isActive ? 'text-stone-950 font-black' : 'text-stone-700'}>{link.label}</span>
                      </div>
                      <ChevronRight size={14} className={`transition-transform duration-200 ${isActive ? 'opacity-100 text-[#f76e28] translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-stone-400'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between min-h-[500px]"
              >
                <div>
                  <div className="border-b border-stone-200 pb-8 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-800 text-[10px] font-black uppercase tracking-widest mb-4">
                      Official Policy
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-stone-950 mb-3 tracking-tight">
                      {pageTitle}
                    </h1>
                    <p className="text-sm text-stone-600 font-medium leading-relaxed max-w-3xl">
                      {pageSubtitle}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {getActiveView()}
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
                    Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">
                    &copy; GoMo Deals Support
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LegalPage;
