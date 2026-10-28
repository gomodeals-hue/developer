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
            <div key={title} className="bg-white border border-stone-200/90 rounded-xl p-4 flex items-start gap-3 shadow-2xs">
              <span className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Icon size={17} />
              </span>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">{t(title)}</h3>
                <p className="text-xs text-stone-500 leading-relaxed mt-1">{t(body)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#f76e28] transition-colors" aria-label="Instagram">
                <Instagram size={17} strokeWidth={1.75} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#f76e28] transition-colors" aria-label="Twitter">
                <Twitter size={17} strokeWidth={1.75} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#f76e28] transition-colors" aria-label="WhatsApp">
                <MessageCircle size={17} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 mb-3">{t("collections_title")}</h4>
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
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 mb-3">{t("support_title")}</h4>
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
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">{t("newsletter_title")}</h4>
            <p className="text-stone-600 text-xs font-normal leading-relaxed">
              {t("newsletter_desc")}
            </p>
            <div className="flex items-center bg-white border border-stone-200/90 rounded-xl p-1 shadow-2xs focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/15 max-w-xs transition-all">
              <input 
                type="email" 
                placeholder={t("email_address")} 
                className="bg-transparent border-none text-xs font-medium px-3 py-1.5 w-full focus:outline-none placeholder:text-stone-400 text-stone-900"
              />
              <button className="bg-[#f76e28] hover:bg-[#de5713] active:scale-95 text-white p-1.5 rounded-lg transition-all cursor-pointer shrink-0 shadow-xs" aria-label="Subscribe to newsletter">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Integrated Bottom Strip */}
        <div className="pt-5 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-600 font-medium">
            <span>&copy; {new Date().getFullYear()} GoMo Deals. {t("all_rights_reserved")}</span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <Link to="/terms" className="hover:text-orange-600 transition-colors">{t("Terms & Conditions")}</Link>
            <span className="text-stone-300">•</span>
            <Link to="/legal/return-policy" className="hover:text-orange-600 transition-colors">{t("Return Policy")}</Link>
            <span className="text-stone-300">•</span>
            <Link to="/legal/database-security" className="hover:text-orange-600 text-emerald-700 font-bold transition-colors">{t("100% Data Security")}</Link>
            <span className="text-stone-300">•</span>
            <Link to="/legal/faqs" className="hover:text-orange-600 transition-colors">{t("FAQ")}</Link>
            <span className="text-stone-300">•</span>
            <Link to="/legal/privacy-policy" className="hover:text-orange-600 transition-colors">{t("Privacy Policy")}</Link>
            <span className="text-stone-300">•</span>
            <Link to="/legal/cookies" className="hover:text-orange-600 transition-colors">{t("cookies")}</Link>
          </div>

          {/* Compact Payment Badges & SSL */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-stone-700">
              <span className="px-2 py-0.5 bg-white rounded-md border border-stone-200 shadow-2xs">UPI</span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-stone-200 shadow-2xs">RuPay</span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-stone-200 shadow-2xs">VISA</span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-stone-200 shadow-2xs">MasterCard</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-800 font-bold text-[9px] uppercase tracking-wider pl-1">
              <Lock size={10} />
              <span>{t("SSL Secure")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
