import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Store, 
  Lock, 
  HeartHandshake, 
  Award, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Layers,
  ShoppingBag
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { value: '50K+', label: 'Happy Customers Across India' },
    { value: '1,200+', label: 'Verified Independent Sellers' },
    { value: '15+', label: 'Curated Categories' },
    { value: '100%', label: 'Secure Data & Buyer Protection' }
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Authenticity First',
      description: 'Zero replica policy. Every vendor goes through physical product studio audits and GSTIN verification before listing products.'
    },
    {
      icon: Lock,
      title: '100% Data Security',
      description: 'Bank-grade AES-256 database encryption at rest and TLS 1.3 in transit. Your personal and payment data is 100% protected and never sold.'
    },
    {
      icon: Truck,
      title: 'Transparent 24-48h Dispatch',
      description: 'Verified sellers pack orders using official tamper-evident security tape, providing real-time SMS & WhatsApp tracking updates.'
    },
    {
      icon: RefreshCw,
      title: '7-Day Doorstep Returns',
      description: 'Hassle-free reverse pickups and instant refunds back to original payment methods on all eligible catalog products.'
    },
    {
      icon: Store,
      title: 'Empowering Local Makers',
      description: 'A seller-friendly hub offering 0% commission on essentials under ₹1,000, passing significant direct savings to consumers.'
    },
    {
      icon: HeartHandshake,
      title: 'Customer-First Guarantee',
      description: 'Dedicated Voice of Customer grievance resolution team ensuring every dispute is resolved within 24 business hours.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">About GoMo Deals</span>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950 text-white p-8 sm:p-14 lg:p-20 shadow-xl mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={13} /> The GoMo Deals Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              Connecting Smart Shoppers With Verified Indian Makers.
            </h1>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl">
              GoMo Deals was created to reimagine Indian electronic commerce — stripping away counterfeit clutter, hidden reseller margins, and insecure data practices in favor of authentic curation, verified merchants, and absolute user data security.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/products" 
                className="px-6 py-3.5 bg-[#f76e28] hover:bg-[#e05d1b] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>Explore Catalog</span>
              </Link>
              <Link 
                to="/legal/database-security" 
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Lock size={14} className="text-orange-400" />
                <span>Security Guarantee</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-stone-200/80 p-6 sm:p-8 rounded-2xl shadow-xs text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-orange-600 mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Narrative Section: What Sets Us Apart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2 block">
              Our Founding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mb-6 leading-tight">
              A Transparent Marketplace Built on Trust, Direct Sourcing &amp; Zero Compromises.
            </h2>
            <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
              <p>
                In an era dominated by inflated markup middlemen and anonymous drop-shipping, GoMo Deals works directly with authenticated artisans, apparel studios, Pooja samagri specialists, and consumer electronic manufacturers.
              </p>
              <p>
                Every listing on our platform undergoes strict quality vetting. High-definition imagery, authentic specifications, transparent ingredient and fabric compositions, and real customer reviews ensure complete purchase confidence.
              </p>
              <p>
                Above all, we hold a fundamental belief: <strong className="text-stone-900 font-bold">your privacy and personal data are inviolable</strong>. We engineered our entire tech stack with modern database encryption, zero plaintext credentials, and zero third-party data monetization.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {[
                'Strict single & multi-vendor KYC with GSTIN verification',
                '100% Encrypted Customer Database & PCI-DSS tokenized checkout',
                'Transparent pricing with zero hidden surcharges at payment',
                'Doorstep reverse pickup with automated refund processing'
              ].map((pt, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-stone-800">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" 
                alt="GoMo Deals Curation & Artisan Hub" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-stone-200 rounded-2xl p-5 shadow-lg max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                  ✓
                </span>
                <div>
                  <div className="text-xs font-black text-stone-900">Certified Authentic</div>
                  <div className="text-[10px] text-stone-500 font-medium">100% Genuine Brand Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2 block">
              The GoMo Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mb-4">
              Six Commitments to Every Buyer &amp; Seller
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              How we protect your orders, your privacy, and your wallet with every click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div 
                  key={i}
                  className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 hover:border-orange-500/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:bg-[#f76e28] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-black text-stone-900 mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              Ready to experience verified shopping?
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl">
              Browse our curated collections or learn how your database privacy is guaranteed with 100% encryption.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link 
              to="/products"
              className="px-6 py-3 bg-[#f76e28] hover:bg-[#e05d1b] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Shop Deals
            </Link>
            <Link 
              to="/contact"
              className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Contact Team
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
