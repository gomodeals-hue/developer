const fs = require('fs');
const path = require('path');

function updateFile(relPath, transformFn) {
  const absPath = path.join(__dirname, relPath);
  let content = fs.readFileSync(absPath, 'utf8');
  const isCRLF = content.includes('\r\n');
  let normalized = content.replace(/\r\n/g, '\n');

  normalized = transformFn(normalized);

  const finalOutput = isCRLF ? normalized.replace(/\n/g, '\r\n') : normalized;
  fs.writeFileSync(absPath, finalOutput, 'utf8');
  console.log(`Updated ${relPath}`);
}

// 1. Hero.jsx
updateFile('../frontend/src/components/sections/Home/Hero/Hero.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { useNavigate } from 'react-router-dom';",
      "import { useNavigate } from 'react-router-dom';\nimport { useShop } from '../../../../context/ShopContext';"
    );
  }
  if (!code.includes("const { t } = useShop()")) {
    code = code.replace(
      "const navigate = useNavigate();",
      "const navigate = useNavigate();\n  const { t } = useShop();"
    );
  }
  code = code.replace('DISCOVER', '{t("hero_discover", "DISCOVER")}');
  code = code.replace('VERIFIED DEALS ON', '{t("hero_verified_deals", "VERIFIED DEALS ON")}');
  code = code.replace('HANDPICKED ELEGANCE', '{t("hero_handpicked_elegance", "HANDPICKED ELEGANCE")}');
  code = code.replace(
    'Explore thousands of verified artisan creations, latest designer fashion, sacred pooja essentials, and modern electronics with guaranteed authentic savings.',
    '{t("hero_subtitle", "Explore thousands of verified artisan creations, latest designer fashion, sacred pooja essentials, and modern electronics with guaranteed authentic savings.")}'
  );
  code = code.replace('>Spiritual<', '>{t("hero_spiritual", "Spiritual")}<');
  code = code.replace('>Artisan<', '>{t("hero_artisan", "Artisan")}<');
  code = code.replace(
    'Pooja Essentials\n                    <ArrowRight',
    '{t("hero_pooja_essentials", "Pooja Essentials")}\n                    <ArrowRight'
  );
  code = code.replace(
    'Ethnic Handloom\n                    <ArrowRight',
    '{t("hero_ethnic_handloom", "Ethnic Handloom")}\n                    <ArrowRight'
  );
  code = code.replace(
    '<span className="leading-tight">SHOP</span>\n                <span className="leading-tight">NOW</span>',
    '<span className="leading-tight">{t("hero_shop_now", "SHOP NOW")}</span>'
  );
  code = code.replace(
    '<span className="uppercase tracking-wider">Explore Deals</span>',
    '<span className="uppercase tracking-wider">{t("hero_explore_deals", "Explore Deals")}</span>'
  );
  code = code.replace(
    '<span className="uppercase tracking-wider">Browse Catalog</span>',
    '<span className="uppercase tracking-wider">{t("hero_browse_catalog", "Browse Catalog")}</span>'
  );
  return code;
});

// 2. TrustGuarantee.jsx
updateFile('../frontend/src/components/sections/Home/TrustGuarantee/TrustGuarantee.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';",
      "import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';\nimport { useShop } from '../../../../context/ShopContext';"
    );
  }
  code = code.replace(
    "export default function TrustGuarantee() {",
    "export default function TrustGuarantee() {\n  const { t } = useShop();"
  );
  code = code.replace('{perk.title}', '{t(perk.title)}');
  code = code.replace('{perk.desc}', '{t(perk.desc)}');
  return code;
});

// 3. EasyShoppingExplainer.jsx
updateFile('../frontend/src/components/sections/Home/EasyShoppingExplainer/EasyShoppingExplainer.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { Link } from 'react-router-dom';",
      "import { Link } from 'react-router-dom';\nimport { useShop } from '../../../../context/ShopContext';"
    );
  }
  code = code.replace(
    "export default function EasyShoppingExplainer() {",
    "export default function EasyShoppingExplainer() {\n  const { t } = useShop();"
  );
  code = code.replace('<span>Simple Shopping Experience</span>', '<span>{t("shopping_simple_badge", "Simple Shopping Experience")}</span>');
  code = code.replace('Straightforward, Reliable Shopping', '{t("shopping_heading", "Straightforward, Reliable Shopping")}');
  code = code.replace(
    'A transparent four-step ordering process designed to make selecting, buying, and tracking your items effortless.',
    '{t("shopping_desc", "A transparent four-step ordering process designed to make selecting, buying, and tracking your items effortless.")}'
  );
  code = code.replace('<span>Ordering Guide</span>', '<span>{t("ordering_guide_btn", "Ordering Guide")}</span>');
  code = code.replace('<span>Seller Portal</span>', '<span>{t("seller_portal_btn", "Seller Portal")}</span>');
  code = code.replace('{card.title}', '{t(card.title)}');
  code = code.replace('{card.desc}', '{t(card.desc)}');
  code = code.replace('<span>{card.actionText}</span>', '<span>{t(card.actionText)}</span>');
  return code;
});

// 4. CategoryBubbles.jsx
updateFile('../frontend/src/components/sections/Home/CategoryBubbles/CategoryBubbles.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { useNavigate } from 'react-router-dom';",
      "import { useNavigate } from 'react-router-dom';\nimport { useShop } from '../../../../context/ShopContext';"
    );
  }
  code = code.replace(
    "export default function CategoryBubbles() {",
    "export default function CategoryBubbles() {\n  const { t } = useShop();"
  );
  code = code.replace('Top Categories', '{t("categories", "Top Categories")}');
  code = code.replace('<span>View All</span>', '<span>{t("view_all", "View All")}</span>');
  code = code.replace('{cat.tag}', '{t(cat.tag)}');
  code = code.replace('{cat.label}', '{t(cat.id.replace(/-/g, "_"), cat.label)}');
  return code;
});

// 5. EditorialShowcase.jsx
updateFile('../frontend/src/components/sections/Home/EditorialShowcase/EditorialShowcase.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { Link } from 'react-router-dom';",
      "import { Link } from 'react-router-dom';\nimport { useShop } from '../../../../context/ShopContext';"
    );
  }
  code = code.replace(
    "export default function EditorialShowcase() {",
    "export default function EditorialShowcase() {\n  const { t } = useShop();"
  );
  code = code.replace('Our New Collection', '{t("our_new_collection", "Our New Collection")}');
  code = code.replace('Curated Season Highlights', '{t("curated_season_highlights", "Curated Season Highlights")}');
  code = code.replace('<span>See All Collections</span>', '<span>{t("see_all_collections", "See All Collections")}</span>');
  code = code.replace('<span>Trending Edit</span>', '<span>{t("trending_edit", "Trending Edit")}</span>');
  code = code.replace('Modern Minimalist Silhouette', '{t("modern_minimalist", "Modern Minimalist Silhouette")}');
  code = code.replace(
    'Discover effortless styling with pure breathable fabrics and timeless tailored cuts.',
    '{t("modern_minimalist_desc", "Discover effortless styling with pure breathable fabrics and timeless tailored cuts.")}'
  );
  code = code.replace('<span>Shop Collection</span>', '<span>{t("shop_collection", "Shop Collection")}</span>');
  code = code.replace('Fresh Arrivals', '{t("whats_new", "Fresh Arrivals")}');
  code = code.replace('Contemporary Urban Chic', '{t("contemporary_urban", "Contemporary Urban Chic")}');
  code = code.replace('Smart casuals, tailored shirts & everyday elegance.', '{t("smart_casuals_desc", "Smart casuals, tailored shirts & everyday elegance.")}');
  code = code.replace('<span>Explore Looks</span>', '<span>{t("explore_looks", "Explore Looks")}</span>');
  code = code.replace('Artisan Sacred', '{t("sacred_traditions", "Artisan Sacred")}');
  code = code.replace('Pooja Essentials & Brass Idols', '{t("pooja_essentials_brass", "Pooja Essentials & Brass Idols")}');
  code = code.replace('<span>Explore Sacred Edit</span>', '<span>{t("explore_pooja", "Explore Sacred Edit")}</span>');
  code = code.replace('Flagship Tech', '{t("electronics", "Flagship Tech")}');
  code = code.replace('Premium Audio & Wearables', '{t("premium_audio", "Premium Audio & Wearables")}');
  code = code.replace('<span>Shop Smart Tech</span>', '<span>{t("explore_tech", "Shop Smart Tech")}</span>');
  return code;
});

// 6. FlashDeals.jsx
updateFile('../frontend/src/components/sections/Home/FlashDeals/FlashDeals.jsx', (code) => {
  code = code.replace('Limited-Time Flash Deals', '{t("flash_deals_header", "Limited-Time Flash Deals")}');
  code = code.replace('Supercharged Savings', '{t("supercharged_savings", "Supercharged Savings")}');
  code = code.replace('Ends in:', '{t("ends_in", "Ends in:")}');
  code = code.replace('>Hours<', '>{t("hours", "Hours")}<');
  code = code.replace('>Minutes<', '>{t("minutes", "Minutes")}<');
  code = code.replace('>Seconds<', '>{t("seconds", "Seconds")}<');
  code = code.replace('<span>View All Deals</span>', '<span>{t("view_all_deals", "View All Deals")}</span>');
  return code;
});

// 7. CustomerReviews.jsx
updateFile('../frontend/src/components/sections/Home/Reviews/CustomerReviews.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { Star, CheckCircle2, Quote } from 'lucide-react';",
      "import { Star, CheckCircle2, Quote } from 'lucide-react';\nimport { useShop } from '../../../../context/ShopContext';"
    );
  }
  code = code.replace(
    "export default function CustomerReviews() {",
    "export default function CustomerReviews() {\n  const { t } = useShop();"
  );
  code = code.replace('Customer Stories', '{t("customer_stories", "Customer Stories")}');
  code = code.replace('Verified Buyer Experiences', '{t("verified_buyer_experiences", "Verified Buyer Experiences")}');
  code = code.replace('{rev.title}', '{t(rev.title)}');
  code = code.replace('"{rev.review}"', '"{t(rev.review)}"');
  code = code.replace('{rev.purchase}', '{t(rev.purchase)}');
  code = code.replace('Verified Buyer', '{t("verified_buyer", "Verified Buyer")}');
  return code;
});

// 8. NewsletterCTA.jsx
updateFile('../frontend/src/components/sections/Home/Newsletter/NewsletterCTA.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';",
      "import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';\nimport { useShop } from '../../../../context/ShopContext';"
    );
  }
  code = code.replace(
    "export default function NewsletterCTA() {",
    "export default function NewsletterCTA() {\n  const { t } = useShop();"
  );
  code = code.replace('<span>GoMo Insiders Club</span>', '<span>{t("insiders_club", "GoMo Insiders Club")}</span>');
  code = code.replace('Get ₹500 Off Your First Order', '{t("newsletter_header", "Get ₹500 Off Your First Order")}');
  code = code.replace(
    'Subscribe for exclusive insider coupon drops, flash sales alerts, and weekly handpicked artisan deals.',
    '{t("newsletter_desc_sub", "Subscribe for exclusive insider coupon drops, flash sales alerts, and weekly handpicked artisan deals.")}'
  );
  code = code.replace(
    '<span>Thank you! Your coupon code WELCOME500 has been activated.</span>',
    '<span>{t("newsletter_success", "Thank you! Your coupon code WELCOME500 has been activated.")}</span>'
  );
  code = code.replace('placeholder="Enter your email address"', 'placeholder={t("enter_email_addr", "Enter your email address")}');
  code = code.replace('<span>Subscribe</span>', '<span>{t("subscribe_btn", "Subscribe")}</span>');
  return code;
});

// 9. AllDepartmentsDrawer.jsx
updateFile('../frontend/src/components/layout/Navbar/AllDepartmentsDrawer.jsx', (code) => {
  if (!code.includes("useShop")) {
    code = code.replace(
      "import { Link, useNavigate } from 'react-router-dom';",
      "import { Link, useNavigate } from 'react-router-dom';\nimport { useShop } from '../../../context/ShopContext';"
    );
  }
  code = code.replace(
    "const AllDepartmentsDrawer = ({ isOpen, onClose, departments, user, onLogout }) => {",
    "const AllDepartmentsDrawer = ({ isOpen, onClose, departments, user, onLogout }) => {\n  const { t } = useShop();"
  );
  code = code.replace(
    "{user ? 'Welcome Back' : 'Hello, Guest'}",
    "{user ? t('welcome_back', 'Welcome Back') : t('hello_guest', 'Hello, Guest')}"
  );
  code = code.replace(
    "'Sign In / Register'",
    "t('sign_in_register', 'Sign In / Register')"
  );
  code = code.replace(
    "Trending &amp; Offers",
    "{t('trending_and_offers', 'Trending & Offers')}"
  );
  code = code.replace(
    "Today's Deals (Up to 80% Off)",
    "{t('todays_deals_discount', \"Today's Deals (Up to 80% Off)\")}"
  );
  code = code.replace(
    "Best Sellers",
    "{t('best_sellers', 'Best Sellers')}"
  );
  code = code.replace(
    "New Arrivals",
    "{t('new_arrivals', 'New Arrivals')}"
  );
  code = code.replace(
    "Shop By Category",
    "{t('shop_by_category', 'Shop By Category')}"
  );
  code = code.replace(
    "{dept.label}",
    "{t(dept.key.replace(/-/g, '_'), dept.label)}"
  );
  return code;
});

// 10. Footer.jsx
updateFile('../frontend/src/components/layout/Footer/Footer.jsx', (code) => {
  code = code.replace(
    '<h3 className="text-xs font-black uppercase tracking-wider">{title}</h3>',
    '<h3 className="text-xs font-black uppercase tracking-wider">{t(title)}</h3>'
  );
  code = code.replace(
    '<p className="text-xs text-stone-500 leading-relaxed mt-1">{body}</p>',
    '<p className="text-xs text-stone-500 leading-relaxed mt-1">{t(body)}</p>'
  );
  code = code.replace(
    'Verified deals, local sellers, festive essentials, fashion, gadgets, and everyday finds curated for quick confident shopping.',
    '{t("footer_brand_desc", "Verified deals, local sellers, festive essentials, fashion, gadgets, and everyday finds curated for quick confident shopping.")}'
  );
  code = code.replace(
    '<Link to={url} className="hover:text-[#f76e28] transition-colors">{name}</Link>',
    '<Link to={url} className="hover:text-[#f76e28] transition-colors">{t(name)}</Link>'
  );
  code = code.replace(
    '<span>Subscribe</span>',
    '<span>{t("subscribe_btn", "Subscribe")}</span>'
  );
  return code;
});

console.log("All component translation updates finished!");
