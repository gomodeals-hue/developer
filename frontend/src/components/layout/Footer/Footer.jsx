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
      className="border-t border-stone-200 bg-[#f7f2ec] text-stone-950 pt-10 pb-6 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 mb-9">
          {[
            ['Fast Dispatch', 'Packed by verified sellers within 24 business hours.', Truck],
            ['7-Day Returns', 'Simple returns on eligible products with issue ticket support.', RefreshCw],
            ['Authentic Catalog', 'Curated listings, inspected images, and seller accountability.', ShieldCheck],
            ['Seller Friendly', 'Low-fee merchant hub built for local Indian businesses.', Store]
          ].map(([title, body, Icon]) => (
            <div key={title} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-start gap-3 shadow-xs min-h-[84px]">
              <span className="w-10 h-10 rounded-xl bg-orange-50 text-[#f76e28] flex items-center justify-center shrink-0">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">{t(title)}</h3>
                <p className="text-xs text-stone-500 leading-relaxed mt-1">{t(body)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 items-start">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="inline-block group focus:outline-none">
              <img 
                src={gmdLogo} 
                alt="GoMo Deals" 
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-150 group-hover:scale-105 filter drop-shadow-sm" 
              />
            </Link>
            <p className="text-stone-600 text-xs font-normal leading-relaxed max-w-xs">
              {t("footer_brand_desc", "Verified deals, local sellers, festive essentials, fashion, gadgets, and everyday finds curated for quick confident shopping.")}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#f76e28] transition-colors inline-flex items-center justify-center w-7 h-7" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.75} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#f76e28] transition-colors inline-flex items-center justify-center w-7 h-7" aria-label="Twitter">
                <Twitter size={18} strokeWidth={1.75} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#f76e28] transition-colors inline-flex items-center justify-center w-7 h-7" aria-label="WhatsApp">
                <MessageCircle size={18} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">{t("collections_title")}</h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">{t("support_title")}</h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600">
              {supportLinks.map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-[#f76e28] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/seller" className="hover:text-[#f76e28] transition-colors text-[#f76e28] font-bold flex items-center gap-1">
                  <span>{t("Sell on GMD (Merchant Hub)")}</span>
                  <ArrowRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">{t("newsletter_title")}</h4>
            <p className="text-stone-600 text-xs font-normal leading-relaxed">
              {t("newsletter_desc")}
            </p>
            <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-2xs focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/15 max-w-xs transition-all h-11">
              <input 
                type="email" 
                placeholder={t("email_address")} 
                className="bg-transparent border-none text-xs font-medium px-3 py-1.5 w-full focus:outline-none placeholder:text-stone-400 text-stone-900"
              />
              <button className="bg-[#f76e28] hover:bg-[#de5713] active:scale-95 text-white p-2 rounded-lg transition-all cursor-pointer shrink-0 shadow-xs" aria-label="Subscribe to newsletter">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Integrated Bottom Strip */}
        <div className="pt-5 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-stone-600 font-medium">
            <span>&copy; {new Date().getFullYear()} GoMo Deals. {t("all_rights_reserved")}</span>
            <span className="hidden sm:inline h-2.5 w-px bg-stone-300" />
            <Link to="/terms" className="hover:text-orange-600 transition-colors">{t("Terms & Conditions")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/return-policy" className="hover:text-orange-600 transition-colors">{t("Return Policy")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/database-security" className="hover:text-orange-600 text-stone-700 font-bold transition-colors">{t("100% Data Security")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/faqs" className="hover:text-orange-600 transition-colors">{t("FAQ")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/privacy-policy" className="hover:text-orange-600 transition-colors">{t("Privacy Policy")}</Link>
            <span className="h-2.5 w-px bg-stone-300" />
            <Link to="/legal/cookies" className="hover:text-orange-600 transition-colors">{t("cookies")}</Link>
          </div>

          {/* Compact Payment Badges & SSL */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
              <span>UPI</span>
              <span className="h-2 w-px bg-stone-300" />
              <span>RuPay</span>
              <span className="h-2 w-px bg-stone-300" />
              <span>VISA</span>
              <span className="h-2 w-px bg-stone-300" />
              <span>MasterCard</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-800 font-bold text-[9px] uppercase tracking-wider pl-1">
              <Lock size={11} />
              <span>{t("SSL Secure")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
