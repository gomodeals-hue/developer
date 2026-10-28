import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  ChevronDown,
  Sparkles,
  ArrowRight,
  Headphones
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    category: 'order_status',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = `GMD-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: ticketId,
        name: formData.name,
        email: formData.email,
        category: formData.category,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      orderId: '',
      category: 'order_status',
      subject: '',
      message: ''
    });
  };

  const channels = [
    {
      icon: Phone,
      title: 'Toll-Free Helpline',
      primary: '1800-419-GOMO (4666)',
      secondary: 'Mon – Sat: 9:00 AM – 9:00 PM IST',
      actionText: 'Call Support',
      href: 'tel:18004194666',
      badge: 'Toll-Free'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Live Chat',
      primary: '+91 98765 43210',
      secondary: 'Typical reply in under 5 minutes',
      actionText: 'Chat on WhatsApp',
      href: 'https://whatsapp.com',
      badge: 'Fastest'
    },
    {
      icon: Mail,
      title: 'Email Support',
      primary: 'support@gomodeals.com',
      secondary: 'Guaranteed reply within 24 business hours',
      actionText: 'Send Email',
      href: 'mailto:support@gomodeals.com',
      badge: '24/7 Desk'
    },
    {
      icon: MapPin,
      title: 'Corporate Headquarters',
      primary: 'GoMo Deals E-Commerce Pvt. Ltd.',
      secondary: '#42, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038, India',
      actionText: 'View on Maps',
      href: 'https://maps.google.com',
      badge: 'Head Office'
    }
  ];

  const quickFaqs = [
    {
      q: 'How do I check the live status of my order?',
      a: 'Navigate to "My Orders" from your account menu or use the "Track Order" link in the footer. Every dispatched shipment includes a real-time carrier tracking link.'
    },
    {
      q: 'What is the return window for clothing and essentials?',
      a: 'Eligible apparel and marketplace products have a 7-day hassle-free return window from delivery date with free doorstep reverse pickup.'
    },
    {
      q: 'Is my credit card or bank details saved in your database?',
      a: 'No. GoMo Deals strictly complies with RBI tokenization norms and PCI-DSS Level 1 standards. Raw card numbers and CVVs are never stored in our databases.'
    },
    {
      q: 'How can I sell products on GoMo Deals as a verified merchant?',
      a: 'Visit our Merchant Hub at /seller to register your business with GSTIN, verify your mobile number, and access our 0% commission tier for catalog products under ₹1,000.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">Contact &amp; Customer Support</span>
        </div>

        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Headphones size={13} /> 24/7 Customer Care Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight mb-3">
            We're Here to Help You Shop With Confidence
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed">
            Have a question about an order, return request, catalog listing, or database security? Reach our dedicated team through any of the verified channels below.
          </p>
        </div>

        {/* 4 Support Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {channels.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs hover:border-orange-500/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Icon size={18} />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {ch.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-stone-900 mb-1">
                    {ch.title}
                  </h3>
                  <p className="text-xs font-bold text-orange-600 mb-1 break-words">
                    {ch.primary}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-relaxed mb-5">
                    {ch.secondary}
                  </p>
                </div>
                <a
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold text-stone-900 bg-stone-50 hover:bg-[#f76e28] hover:text-white border border-stone-200 hover:border-transparent transition-all cursor-pointer block"
                >
                  {ch.actionText}
                </a>
              </div>
            );
          })}
        </div>

        {/* Main Section: Ticket Form & Quick Assist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 mb-20 items-start">
          
          {/* Form Column (2/3 width) */}
          <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="border-b border-stone-100 pb-5 mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-stone-950 mb-1">
                Create a Support Ticket
              </h2>
              <p className="text-xs text-stone-500">
                Submit your query below. Our automated resolution system guarantees an acknowledged response within minutes.
              </p>
            </div>

            {submittedTicket ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Ticket Generated Successfully
                </span>
                <h3 className="text-2xl font-black text-emerald-950 mt-4 mb-2 font-mono">
                  {submittedTicket.id}
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto mb-6">
                  Thank you, <strong>{submittedTicket.name}</strong>. A confirmation email has been dispatched to <strong>{submittedTicket.email}</strong>. Our grievance team has queued your ticket for priority review.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                  <Link
                    to="/my-orders"
                    className="px-5 py-2.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    View My Orders
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      placeholder="e.g. GMD-ORD-10928"
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-medium font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold"
                    >
                      <option value="order_status">Order Tracking &amp; Delivery</option>
                      <option value="return_refund">Return or Refund Request</option>
                      <option value="payment_issue">Payment or UPI Verification</option>
                      <option value="product_inquiry">Product Quality &amp; Authenticity</option>
                      <option value="seller_partner">Merchant &amp; Seller Partnership</option>
                      <option value="data_security">Database Security &amp; Privacy</option>
                      <option value="other">General Grievance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief headline of your issue"
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or question in detail so we can assist immediately..."
                    className="w-full bg-stone-50/60 border border-stone-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-medium resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Protected by 100% Encrypted DB Vault</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#f76e28] hover:bg-[#e05d1b] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Ticket'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Help & Legal Shortcuts (1/3 width) */}
          <div className="space-y-6">
            
            {/* Security Guarantee Box */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </span>
              <h3 className="text-base font-black mb-2">
                100% Secure Data Commitment
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                All communications and customer data submitted to GoMo Deals are stored with hardware-accelerated AES-256 database encryption. Zero unencrypted third-party sharing.
              </p>
              <Link
                to="/legal/database-security"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>Read Database Security Guarantee</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Quick Policy Directory */}
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xs space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-100">
                Self-Service Quick Links
              </h4>
              {[
                { label: 'Track Existing Order', path: '/my-orders', icon: Clock },
                { label: '7-Day Return & Refund Policy', path: '/legal/return-policy', icon: RefreshCw },
                { label: 'Shipping & Delivery Timelines', path: '/legal/shipping-policy', icon: MapPin },
                { label: 'Terms & Conditions', path: '/terms', icon: FileText },
                { label: 'Database & Privacy Security', path: '/legal/database-security', icon: ShieldCheck }
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={i}
                    to={link.path}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className="text-stone-400 group-hover:text-orange-600" />
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>

          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-stone-900 mb-1">
              Frequently Asked Support Questions
            </h3>
            <p className="text-xs text-stone-500">
              Instant answers to common customer questions before filing a support ticket.
            </p>
          </div>

          <div className="space-y-3">
            {quickFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-stone-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
