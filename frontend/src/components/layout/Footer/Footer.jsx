import { MessageCircle, ArrowRight, Lock, Truck, RefreshCw, ShieldCheck, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import gmdLogo from '../../../assets/GMD_Logo.png';

const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = () => {
  const { t } = useShop();

  const collectionLinks = [
    ['Men', '/collection/clothing?section=men'],
    ['Women', '/collection/clothing?section=women'],
    ['Kids', '/collection/kids'],
    ['Pooja Essentials', '/collection/pooja-items'],
    ['Electronics', '/collection/electronics'],
    ['Home & Living', '/collection/home-living']
  ];

  const supportLinks = [
    ['About Us', '/about'],
    ['Contact & Help', '/contact'],
    ['Database Security (100% Secure)', '/legal/database-security'],
    ['Track Order', '/my-orders'],
    ['Returns & Refunds (7-Day)', '/legal/return-policy'],
    ['Shipping Policy', '/legal/shipping-policy'],
    ['FAQs', '/legal/faqs'],
    ['Terms & Conditions', '/terms'],
    ['Privacy Policy', '/legal/privacy-policy'],
    ['Cookie Policy', '/legal/cookies']
  ];

  return (
    <footer 
      className="border-t border-orange-100/80 bg-gradient-to-b from-[#fbf8f3] to-[#f4ede3] text-stone-950 pt-12 pb-8 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* M3 Expressive Guarantee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            ['Fast Dispatch', 'Packed by verified sellers within 24 business hours.', Truck],
            ['7-Day Returns', 'Simple returns on eligible products with issue ticket support.', RefreshCw],
            ['Authentic Catalog', 'Curated listings, inspected images, and seller accountability.', ShieldCheck],
            ['Seller Friendly', 'Low-fee merchant hub built for local Indian businesses.', Store]
          ].map(([title, body, Icon]) => (
            <div 
              key={title} 
              className="bg-white/90 backdrop-blur-xs border border-stone-200/80 hover:border-orange-200/90 rounded-3xl p-4 sm:p-5 flex items-start gap-3.5 shadow-[0_4px_16px_-2px_rgba(28,25,23,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(247,110,40,0.12)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 min-h-[88px] group"
            >
              <span className="w-11 h-11 rounded-2xl bg-orange-50 text-[#f76e28] ring-4 ring-orange-50/50 border border-orange-200/60 flex items-center justify-center shrink-0 group-hover:scale-108 group-hover:bg-orange-100 transition-all duration-300">
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 group-hover:text-orange-950 transition-colors">{t(title)}</h3>
                <p className="text-xs text-stone-500 leading-relaxed mt-1 font-medium">{t(body)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 items-start">
          {/* Brand Info */}
          <div className="space-y-3.5">
            <Link to="/" className="inline-block group focus:outline-none">
              <img 
                src={gmdLogo} 
                alt="GoMo Deals" 
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-150 group-hover:scale-105 filter drop-shadow-sm" 
              />
            </Link>
            <p className="text-stone-600 text-xs font-medium leading-relaxed max-w-xs">
              {t("footer_brand_desc", "Verified deals, local sellers, festive essentials, fashion, gadgets, and everyday finds curated for quick confident shopping.")}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-stone-200/80 text-stone-600 hover:text-white hover:bg-[#f76e28] hover:border-[#f76e28] transition-all flex items-center justify-center shadow-2xs hover:scale-110 active:scale-95" aria-label="Instagram">
                <Instagram size={15} strokeWidth={2} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-stone-200/80 text-stone-600 hover:text-white hover:bg-[#f76e28] hover:border-[#f76e28] transition-all flex items-center justify-center shadow-2xs hover:scale-110 active:scale-95" aria-label="Twitter">
                <Twitter size={15} strokeWidth={2} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-stone-200/80 text-stone-600 hover:text-white hover:bg-[#f76e28] hover:border-[#f76e28] transition-all flex items-center justify-center shadow-2xs hover:scale-110 active:scale-95" aria-label="WhatsApp">
                <MessageCircle size={15} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 mb-3.5">{t("collections_title")}</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-stone-600">
              {collectionLinks.map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-[#f76e28] transition-colors">
                    {t(label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 mb-3.5">{t("support_title")}</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-stone-600">
              {supportLinks.map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-[#f76e28] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/seller" className="hover:text-[#f76e28] transition-colors text-[#f76e28] font-black flex items-center gap-1">
                  <span>{t("Sell on GMD (Merchant Hub)")}</span>
                  <ArrowRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">{t("newsletter_title")}</h4>
            <p className="text-stone-600 text-xs font-medium leading-relaxed">
              {t("newsletter_desc")}
            </p>
            <div className="flex items-center bg-white border border-stone-200/80 rounded-full p-1.5 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/15 max-w-xs transition-all h-12">
              <input 
                type="email" 
                placeholder={t("email_address")} 
                className="bg-transparent border-none text-xs font-medium pl-3 pr-2 w-full focus:outline-none placeholder:text-stone-400 text-stone-900"
              />
              <button className="bg-gradient-to-r from-[#f76e28] to-[#ea580c] hover:from-[#ea580c] hover:to-[#de5713] active:scale-95 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm" aria-label="Subscribe to newsletter">
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Integrated Bottom Strip */}
        <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-stone-600 font-semibold">
            <span>&copy; {new Date().getFullYear()} GoMo Deals. {t("all_rights_reserved")}</span>
            <span className="hidden sm:inline h-2.5 w-px bg-stone-300" />
            <Link to="/terms" className="hover:text-orange-600 transition-colors">{t("Terms & Conditions")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/return-policy" className="hover:text-orange-600 transition-colors">{t("Return Policy")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/database-security" className="hover:text-orange-600 text-stone-700 font-extrabold transition-colors">{t("100% Data Security")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/faqs" className="hover:text-orange-600 transition-colors">{t("FAQ")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/privacy-policy" className="hover:text-orange-600 transition-colors">{t("Privacy Policy")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/cookies" className="hover:text-orange-600 transition-colors">{t("cookies")}</Link>
          </div>

          {/* Compact Payment Badges & SSL */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-[10px] font-black text-stone-500 uppercase tracking-wider">
              <span>UPI</span>
              <span className="h-2 w-px bg-stone-300" />
              <span>RuPay</span>
              <span className="h-2 w-px bg-stone-300" />
              <span>VISA</span>
              <span className="h-2 w-px bg-stone-300" />
              <span>MasterCard</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-black text-[9px] uppercase tracking-wider">
              <Lock size={11} className="text-emerald-700" />
              <span>{t("SSL Secure")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
