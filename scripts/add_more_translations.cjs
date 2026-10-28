const fs = require('fs');
const path = require('path');

const transPath = path.resolve(__dirname, '../frontend/src/data/translations.js');
let transContent = fs.readFileSync(transPath, 'utf8');

const newTranslations = {
  EN: {
    "Fast Dispatch": "Fast Dispatch",
    "Packed by verified sellers within 24 business hours.": "Packed by verified sellers within 24 business hours.",
    "7-Day Returns": "7-Day Returns",
    "Simple returns on eligible products with issue ticket support.": "Simple returns on eligible products with issue ticket support.",
    "Authentic Catalog": "Authentic Catalog",
    "Curated listings, inspected images, and seller accountability.": "Curated listings, inspected images, and seller accountability.",
    "Seller Friendly": "Seller Friendly",
    "Low-fee merchant hub built for local Indian businesses.": "Low-fee merchant hub built for local Indian businesses.",
    "Men": "Men",
    "Women": "Women",
    "Kids": "Kids",
    "Pooja Essentials": "Pooja Essentials",
    "About Us": "About Us",
    "Contact & Help": "Contact & Help",
    "Database Security (100% Secure)": "Database Security (100% Secure)",
    "Track Order": "Track Order",
    "Returns & Refunds (7-Day)": "Returns & Refunds (7-Day)",
    "Shipping Policy": "Shipping Policy",
    "FAQs": "FAQs",
    "Terms & Conditions": "Terms & Conditions",
    "Privacy Policy": "Privacy Policy",
    "Cookie Policy": "Cookie Policy",
    "Sell on GMD (Merchant Hub)": "Sell on GMD (Merchant Hub)",
    "Return Policy": "Return Policy",
    "100% Data Security": "100% Data Security",
    "FAQ": "FAQ",
    "SSL Secure": "SSL Secure",
    "All Collections": "All Collections",
    "Winter & Fashion": "Winter & Fashion",
    "Personal Care": "Personal Care",
    "Smart Tech": "Smart Tech",
    "Sacred Pooja": "Sacred Pooja",
    "Curated Showcase • 2026 Collection": "Curated Showcase • 2026 Collection",
    "Selected Products": "Selected Products",
    "Minimal design, maximum quality. Discover our handpicked essentials with express dispatch and guaranteed authenticity.": "Minimal design, maximum quality. Discover our handpicked essentials with express dispatch and guaranteed authenticity.",
    "Explore All Departments": "Explore All Departments",
    "01 / Seasonal Offer": "01 / Seasonal Offer",
    "Winter-Wear & Outerwear": "Winter-Wear & Outerwear",
    "Save up to 40% on premium seasonal jackets, cozy sweaters, and signature layers.": "Save up to 40% on premium seasonal jackets, cozy sweaters, and signature layers.",
    "Organic & Wild": "Organic & Wild",
    "Pure Raw Honey": "Pure Raw Honey",
    "Artisanal forest batches, unpasteurized and ethically harvested.": "Artisanal forest batches, unpasteurized and ethically harvested.",
    "Explore": "Explore",
    "Free Express Delivery": "Free Express Delivery",
    "Lossless Audio": "Lossless Audio",
    "Wireless Headphones": "Wireless Headphones",
    "Active noise cancelation with custom spatial drivers.": "Active noise cancelation with custom spatial drivers.",
    "Shop Sound": "Shop Sound",
    "Instant 24h Dispatch": "Instant 24h Dispatch",
    "Health & Sport": "Health & Sport",
    "Precision Trackers": "Precision Trackers",
    "Continuous biometrics, sleep metrics, and aerospace chassis.": "Continuous biometrics, sleep metrics, and aerospace chassis.",
    "Explore Devices": "Explore Devices",
    "100% Genuine Certified": "100% Genuine Certified",
    "02 / Top Favorites": "02 / Top Favorites",
    "Best Selling Classics": "Best Selling Classics",
    "Customer verified ratings with hundreds of five-star reviews.": "Customer verified ratings with hundreds of five-star reviews.",
    "GoMo Curated Quality": "GoMo Curated Quality",
    "Exceptional Value.": "Exceptional Value.",
    "Zero Compromise.": "Zero Compromise.",
    "Every product across fashion, personal care, and electronics is verified for original authenticity and backed by our hassle-free 7-day guarantee.": "Every product across fashion, personal care, and electronics is verified for original authenticity and backed by our hassle-free 7-day guarantee.",
    "Shop Full Collection →": "Shop Full Collection →",
    "Our Guarantee": "Our Guarantee",
    "03 / Daily Rituals": "03 / Daily Rituals",
    "Personal Care & Beauty": "Personal Care & Beauty",
    "Natural formulations, nourishing botanical extracts, and gentle skin rejuvenation.": "Natural formulations, nourishing botanical extracts, and gentle skin rejuvenation.",
    "04 / Connected Living": "04 / Connected Living",
    "Smart Tech & Gadgets": "Smart Tech & Gadgets",
    "Cutting-edge connectivity, crystal audio, and minimalist desk setups.": "Cutting-edge connectivity, crystal audio, and minimalist desk setups.",
    "05 / Spiritual Heritage": "05 / Spiritual Heritage",
    "Sacred Pooja Essentials": "Sacred Pooja Essentials",
    "Pure brassware, traditional incense, and divine ceremonial accoutrements.": "Pure brassware, traditional incense, and divine ceremonial accoutrements.",
    "06 / Fresh Drops": "06 / Fresh Drops",
    "Just Arrived": "Just Arrived",
    "Explore the newest designs added to our store this week.": "Explore the newest designs added to our store this week.",
    "View All": "View All"
  },
  FR: {
    "Fast Dispatch": "Expédition Rapide",
    "Packed by verified sellers within 24 business hours.": "Préparé par des vendeurs certifiés sous 24h ouvrées.",
    "7-Day Returns": "Retours sous 7 Jours",
    "Simple returns on eligible products with issue ticket support.": "Retours simples sur les produits éligibles avec suivi par ticket.",
    "Authentic Catalog": "Catalogue Authentique",
    "Curated listings, inspected images, and seller accountability.": "Annonces sélectionnées, visuels contrôlés et vendeurs vérifiés.",
    "Seller Friendly": "Partenaire des Vendeurs",
    "Low-fee merchant hub built for local Indian businesses.": "Plateforme marchande à frais réduits pour les créateurs et artisans.",
    "Men": "Hommes",
    "Women": "Femmes",
    "Kids": "Enfants",
    "Pooja Essentials": "Essentiels de Prière",
    "About Us": "À Propos",
    "Contact & Help": "Contact & Aide",
    "Database Security (100% Secure)": "Sécurité des Données (100% Sécurisé)",
    "Track Order": "Suivre la Commande",
    "Returns & Refunds (7-Day)": "Retours & Remboursements (7 Jours)",
    "Shipping Policy": "Politique d'Expédition",
    "FAQs": "FAQ",
    "Terms & Conditions": "Conditions Générales",
    "Privacy Policy": "Politique de Confidentialité",
    "Cookie Policy": "Politique des Cookies",
    "Sell on GMD (Merchant Hub)": "Vendre sur GMD (Espace Vendeur)",
    "Return Policy": "Politique de Retour",
    "100% Data Security": "Sécurité des Données 100%",
    "FAQ": "FAQ",
    "SSL Secure": "Sécurisé SSL",
    "All Collections": "Toutes les Collections",
    "Winter & Fashion": "Hiver & Mode",
    "Personal Care": "Soins Personnels",
    "Smart Tech": "High-Tech",
    "Sacred Pooja": "Prière Sacrée",
    "Curated Showcase • 2026 Collection": "Sélection Exclusive • Collection 2026",
    "Selected Products": "Produits Sélectionnés",
    "Minimal design, maximum quality. Discover our handpicked essentials with express dispatch and guaranteed authenticity.": "Design minimaliste, qualité maximale. Découvrez nos essentiels choisis avec expédition express et authenticité certifiée.",
    "Explore All Departments": "Explorer Tous les Rayons",
    "01 / Seasonal Offer": "01 / Offre Saisonnière",
    "Winter-Wear & Outerwear": "Mode d'Hiver & Manteaux",
    "Save up to 40% on premium seasonal jackets, cozy sweaters, and signature layers.": "Économisez jusqu'à 40% sur les vestes de saison, pulls douillets et tenues d'hiver.",
    "Organic & Wild": "Bio & Sauvage",
    "Pure Raw Honey": "Miel Pur et Brut",
    "Artisanal forest batches, unpasteurized and ethically harvested.": "Lots forestiers artisanaux, non pasteurisés et récoltés éthiquement.",
    "Explore": "Explorer",
    "Free Express Delivery": "Livraison Express Gratuite",
    "Lossless Audio": "Audio Haute Fidélité",
    "Wireless Headphones": "Casques Sans Fil",
    "Active noise cancelation with custom spatial drivers.": "Réduction active du bruit et transducteurs spatiaux dédiés.",
    "Shop Sound": "Acheter Audio",
    "Instant 24h Dispatch": "Envoi Express sous 24h",
    "Health & Sport": "Santé & Sport",
    "Precision Trackers": "Montres & Capteurs Connectés",
    "Continuous biometrics, sleep metrics, and aerospace chassis.": "Biométrie continue, suivi du sommeil et boîtier haute précision.",
    "Explore Devices": "Explorer les Appareils",
    "100% Genuine Certified": "Certifié 100% Authentique",
    "02 / Top Favorites": "02 / Meilleurs Choix",
    "Best Selling Classics": "Classiques les Plus Vendus",
    "Customer verified ratings with hundreds of five-star reviews.": "Évaluations vérifiées par les clients avec des centaines d'avis cinq étoiles.",
    "GoMo Curated Quality": "Qualité Sélectionnée GoMo",
    "Exceptional Value.": "Valeur Exceptionnelle.",
    "Zero Compromise.": "Zéro Compromis.",
    "Every product across fashion, personal care, and electronics is verified for original authenticity and backed by our hassle-free 7-day guarantee.": "Chaque produit de mode, de beauté ou d'électronique est garanti d'origine et couvert par notre retour facile sous 7 jours.",
    "Shop Full Collection →": "Voir Toute la Collection →",
    "Our Guarantee": "Notre Garantie",
    "03 / Daily Rituals": "03 / Rituels Quotidiens",
    "Personal Care & Beauty": "Soins Personnels & Beauté",
    "Natural formulations, nourishing botanical extracts, and gentle skin rejuvenation.": "Formules naturelles, extraits botaniques nourrissants et soins régénérants.",
    "04 / Connected Living": "04 / Vie Connectée",
    "Smart Tech & Gadgets": "High-Tech & Gadgets",
    "Cutting-edge connectivity, crystal audio, and minimalist desk setups.": "Connectivité de pointe, audio cristallin et accessoires épurés.",
    "05 / Spiritual Heritage": "05 / Héritage Spirituel",
    "Sacred Pooja Essentials": "Essentiels de Prière Sacrés",
    "Pure brassware, traditional incense, and divine ceremonial accoutrements.": "Cuivre pur, encens traditionnel et accessoires rituels d'exception.",
    "06 / Fresh Drops": "06 / Nouveautés",
    "Just Arrived": "Nouveaux Arrivages",
    "Explore the newest designs added to our store this week.": "Découvrez les dernières créations ajoutées cette semaine.",
    "View All": "Voir Tout"
  },
  DE: {
    "Fast Dispatch": "Schneller Versand",
    "Packed by verified sellers within 24 business hours.": "Verpackt von verifizierten Händlern innerhalb von 24 Werktagen.",
    "7-Day Returns": "7 Tage Rückgaberecht",
    "Simple returns on eligible products with issue ticket support.": "Einfache Rückgabe für berechtigte Artikel mit Ticket-Support.",
    "Authentic Catalog": "Authentischer Katalog",
    "Curated listings, inspected images, and seller accountability.": "Kuratierte Angebote, geprüfte Bilder und geprüfte Händler.",
    "Seller Friendly": "Händlerfreundlich",
    "Low-fee merchant hub built for local Indian businesses.": "Gebührengünstiges Portal für lokale Händler und Kunsthandwerker.",
    "Men": "Herren",
    "Women": "Damen",
    "Kids": "Kinder",
    "Pooja Essentials": "Pooja-Bedarf",
    "About Us": "Über Uns",
    "Contact & Help": "Kontakt & Hilfe",
    "Database Security (100% Secure)": "Datenbanksicherheit (100% Sicher)",
    "Track Order": "Bestellung Verfolgen",
    "Returns & Refunds (7-Day)": "Rückgabe & Erstattung (7 Tage)",
    "Shipping Policy": "Versandrichtlinie",
    "FAQs": "Häufige Fragen",
    "Terms & Conditions": "Allgemeine Geschäftsbedingungen",
    "Privacy Policy": "Datenschutzrichtlinie",
    "Cookie Policy": "Cookie-Richtlinie",
    "Sell on GMD (Merchant Hub)": "Verkaufen auf GMD (Händler-Portal)",
    "Return Policy": "Rückgaberichtlinie",
    "100% Data Security": "100% Datensicherheit",
    "FAQ": "FAQ",
    "SSL Secure": "SSL-Gesichert",
    "All Collections": "Alle Kollektionen",
    "Winter & Fashion": "Winter & Mode",
    "Personal Care": "Körperpflege",
    "Smart Tech": "Smarte Technik",
    "Sacred Pooja": "Heilige Pooja",
    "Curated Showcase • 2026 Collection": "Kuratierte Kollektion • 2026",
    "Selected Products": "Ausgewählte Produkte",
    "Minimal design, maximum quality. Discover our handpicked essentials with express dispatch and guaranteed authenticity.": "Minimalistisches Design, maximale Qualität. Entdecken Sie handverlesene Artikel mit Expressversand und garantierter Echtheit.",
    "Explore All Departments": "Alle Abteilungen Entdecken",
    "01 / Seasonal Offer": "01 / Saisonales Angebot",
    "Winter-Wear & Outerwear": "Wintermode & Jacken",
    "Save up to 40% on premium seasonal jackets, cozy sweaters, and signature layers.": "Sparen Sie bis zu 40% auf saisonale Jacken, gemütliche Pullover und wärmende Lagen.",
    "Organic & Wild": "Bio & Natürlich",
    "Pure Raw Honey": "Reiner Rohhonig",
    "Artisanal forest batches, unpasteurized and ethically harvested.": "Traditionelle Waldchargen, unpasteurisiert und nachhaltig gewonnen.",
    "Explore": "Entdecken",
    "Free Express Delivery": "Kostenloser Expressversand",
    "Lossless Audio": "Verlustfreies Audio",
    "Wireless Headphones": "Kabellose Kopfhörer",
    "Active noise cancelation with custom spatial drivers.": "Aktive Geräuschunterdrückung mit räumlichen Audiotreibern.",
    "Shop Sound": "Sound Kaufen",
    "Instant 24h Dispatch": "Sofortiger 24h-Versand",
    "Health & Sport": "Gesundheit & Sport",
    "Precision Trackers": "Präzisions-Fitness-Tracker",
    "Continuous biometrics, sleep metrics, and aerospace chassis.": "Kontinuierliche Biometrie, Schlaf-Tracking und langlebiges Gehäuse.",
    "Explore Devices": "Geräte Entdecken",
    "100% Genuine Certified": "100% Original Zertifiziert",
    "02 / Top Favorites": "02 / Beliebteste Artikel",
    "Best Selling Classics": "Meistverkaufte Klassiker",
    "Customer verified ratings with hundreds of five-star reviews.": "Kundenbewertungen mit hunderten von Fünf-Sterne-Rezensionen.",
    "GoMo Curated Quality": "GoMo Kuratierte Qualität",
    "Exceptional Value.": "Herausragender Wert.",
    "Zero Compromise.": "Null Kompromisse.",
    "Every product across fashion, personal care, and electronics is verified for original authenticity and backed by our hassle-free 7-day guarantee.": "Jedes Produkt aus Mode, Körperpflege und Elektronik ist auf Echtheit geprüft und durch 7 Tage Rückgabe abgesichert.",
    "Shop Full Collection →": "Ganze Kollektion Kaufen →",
    "Our Guarantee": "Unsere Garantie",
    "03 / Daily Rituals": "03 / Tägliche Pflege",
    "Personal Care & Beauty": "Körperpflege & Schönheit",
    "Natural formulations, nourishing botanical extracts, and gentle skin rejuvenation.": "Natürliche Formulierungen, pflegende Pflanzenextrakte und sanfte Hautpflege.",
    "04 / Connected Living": "04 / Vernetztes Leben",
    "Smart Tech & Gadgets": "Smarte Technik & Gadgets",
    "Cutting-edge connectivity, crystal audio, and minimalist desk setups.": "Modernste Konnektivität, kristallklarer Klang und minimalistische Schreibtisch-Setups.",
    "05 / Spiritual Heritage": "05 / Spirituelles Erbe",
    "Sacred Pooja Essentials": "Heiliger Pooja-Bedarf",
    "Pure brassware, traditional incense, and divine ceremonial accoutrements.": "Reine Messingwaren, traditionelle Räucherstäbchen und feierliche Rituale.",
    "06 / Fresh Drops": "06 / Frische Neuheiten",
    "Just Arrived": "Neu Eingetroffen",
    "Explore the newest designs added to our store this week.": "Entdecken Sie die neuesten Designs, die diese Woche hinzugefügt wurden.",
    "View All": "Alle Anzeigen"
  }
};

// We will inject these translations into EN, FR, and DE sections of translations.js
function injectLang(content, lang, entries) {
  const marker = `"${lang}": {`;
  const idx = content.indexOf(marker);
  if (idx === -1) return content;
  
  const insertPos = idx + marker.length;
  let codeToInsert = '\n';
  for (const [k, v] of Object.entries(entries)) {
    codeToInsert += `    ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
  }
  return content.slice(0, insertPos) + codeToInsert + content.slice(insertPos);
}

transContent = injectLang(transContent, 'EN', newTranslations.EN);
transContent = injectLang(transContent, 'FR', newTranslations.FR);
transContent = injectLang(transContent, 'DE', newTranslations.DE);

fs.writeFileSync(transPath, transContent, 'utf8');
console.log('translations.js updated with additional terms successfully!');

// Now update Footer.jsx
const footerPath = path.resolve(__dirname, '../frontend/src/components/layout/Footer/Footer.jsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');
footerContent = footerContent.replace('{label}', '{t(label)}');
footerContent = footerContent.replace('<span>Sell on GMD (Merchant Hub)</span>', '<span>{t("Sell on GMD (Merchant Hub)")}</span>');
footerContent = footerContent.replace('<Link to="/terms" className="hover:text-[#f76e28] transition-colors">Terms &amp; Conditions</Link>', '<Link to="/terms" className="hover:text-[#f76e28] transition-colors">{t("Terms & Conditions")}</Link>');
footerContent = footerContent.replace('<Link to="/legal/return-policy" className="hover:text-[#f76e28] transition-colors">Return Policy</Link>', '<Link to="/legal/return-policy" className="hover:text-[#f76e28] transition-colors">{t("Return Policy")}</Link>');
footerContent = footerContent.replace('<Link to="/legal/database-security" className="hover:text-[#f76e28] text-emerald-700 font-bold transition-colors">100% Data Security</Link>', '<Link to="/legal/database-security" className="hover:text-[#f76e28] text-emerald-700 font-bold transition-colors">{t("100% Data Security")}</Link>');
footerContent = footerContent.replace('<Link to="/legal/faqs" className="hover:text-[#f76e28] transition-colors">FAQ</Link>', '<Link to="/legal/faqs" className="hover:text-[#f76e28] transition-colors">{t("FAQ")}</Link>');
footerContent = footerContent.replace('<Link to="/legal/privacy-policy" className="hover:text-[#f76e28] transition-colors">Privacy Policy</Link>', '<Link to="/legal/privacy-policy" className="hover:text-[#f76e28] transition-colors">{t("Privacy Policy")}</Link>');
footerContent = footerContent.replace('<span>SSL Secure</span>', '<span>{t("SSL Secure")}</span>');
fs.writeFileSync(footerPath, footerContent, 'utf8');
console.log('Footer.jsx updated with translations!');

// Now update HomeCategorySections.jsx
const hcsPath = path.resolve(__dirname, '../frontend/src/components/sections/Home/HomeCategorySections/HomeCategorySections.jsx');
let hcsContent = fs.readFileSync(hcsPath, 'utf8');

// Replace department labels
hcsContent = hcsContent.replace("label: 'All Collections'", "label: t('All Collections')");
hcsContent = hcsContent.replace("label: 'Winter & Fashion'", "label: t('Winter & Fashion')");
hcsContent = hcsContent.replace("label: 'Best Sellers'", "label: t('Best Sellers')");
hcsContent = hcsContent.replace("label: 'Personal Care'", "label: t('Personal Care')");
hcsContent = hcsContent.replace("label: 'Smart Tech'", "label: t('Smart Tech')");
hcsContent = hcsContent.replace("label: 'Sacred Pooja'", "label: t('Sacred Pooja')");

// Section intro
hcsContent = hcsContent.replace('<span>Curated Showcase • 2026 Collection</span>', '<span>{t("Curated Showcase • 2026 Collection")}</span>');
hcsContent = hcsContent.replace('Selected Products\r\n              </h2>', '{t("Selected Products")}\r\n              </h2>');
hcsContent = hcsContent.replace('Selected Products\n              </h2>', '{t("Selected Products")}\n              </h2>');
hcsContent = hcsContent.replace('Minimal design, maximum quality. Discover our handpicked essentials with express dispatch and guaranteed authenticity.', '{t("Minimal design, maximum quality. Discover our handpicked essentials with express dispatch and guaranteed authenticity.")}');
hcsContent = hcsContent.replace('<span>Explore All Departments</span>', '<span>{t("Explore All Departments")}</span>');

// Section 1
hcsContent = hcsContent.replace('01 / Seasonal Offer', '{t("01 / Seasonal Offer")}');
hcsContent = hcsContent.replace('Winter-Wear & Outerwear', '{t("Winter-Wear & Outerwear")}');
hcsContent = hcsContent.replace('Save up to 40% on premium seasonal jackets, cozy sweaters, and signature layers.', '{t("Save up to 40% on premium seasonal jackets, cozy sweaters, and signature layers.")}');
hcsContent = hcsContent.replace('<span>View All ({fashionProducts.length})</span>', '<span>{t("View All")} ({fashionProducts.length})</span>');

// Bento 1
hcsContent = hcsContent.replace('Organic & Wild\r\n', '{t("Organic & Wild")}\r\n');
hcsContent = hcsContent.replace('Organic & Wild\n', '{t("Organic & Wild")}\n');
hcsContent = hcsContent.replace('Pure Raw Honey\r\n', '{t("Pure Raw Honey")}\r\n');
hcsContent = hcsContent.replace('Pure Raw Honey\n', '{t("Pure Raw Honey")}\n');
hcsContent = hcsContent.replace('Artisanal forest batches, unpasteurized and ethically harvested.', '{t("Artisanal forest batches, unpasteurized and ethically harvested.")}');
hcsContent = hcsContent.replace('<span>Explore</span>', '<span>{t("Explore")}</span>');
hcsContent = hcsContent.replace('<span>Free Express Delivery</span>', '<span>{t("Free Express Delivery")}</span>');

// Bento 2
hcsContent = hcsContent.replace('Lossless Audio\r\n', '{t("Lossless Audio")}\r\n');
hcsContent = hcsContent.replace('Lossless Audio\n', '{t("Lossless Audio")}\n');
hcsContent = hcsContent.replace('Wireless Headphones\r\n', '{t("Wireless Headphones")}\r\n');
hcsContent = hcsContent.replace('Wireless Headphones\n', '{t("Wireless Headphones")}\n');
hcsContent = hcsContent.replace('Active noise cancelation with custom spatial drivers.', '{t("Active noise cancelation with custom spatial drivers.")}');
hcsContent = hcsContent.replace('<span>Shop Sound</span>', '<span>{t("Shop Sound")}</span>');
hcsContent = hcsContent.replace('<span>Instant 24h Dispatch</span>', '<span>{t("Instant 24h Dispatch")}</span>');

// Bento 3
hcsContent = hcsContent.replace('Health & Sport\r\n', '{t("Health & Sport")}\r\n');
hcsContent = hcsContent.replace('Health & Sport\n', '{t("Health & Sport")}\n');
hcsContent = hcsContent.replace('Precision Trackers\r\n', '{t("Precision Trackers")}\r\n');
hcsContent = hcsContent.replace('Precision Trackers\n', '{t("Precision Trackers")}\n');
hcsContent = hcsContent.replace('Continuous biometrics, sleep metrics, and aerospace chassis.', '{t("Continuous biometrics, sleep metrics, and aerospace chassis.")}');
hcsContent = hcsContent.replace('<span>Explore Devices</span>', '<span>{t("Explore Devices")}</span>');
hcsContent = hcsContent.replace('<span>100% Genuine Certified</span>', '<span>{t("100% Genuine Certified")}</span>');

// Section 2
hcsContent = hcsContent.replace('02 / Top Favorites', '{t("02 / Top Favorites")}');
hcsContent = hcsContent.replace('Best Selling Classics', '{t("Best Selling Classics")}');
hcsContent = hcsContent.replace('Customer verified ratings with hundreds of five-star reviews.', '{t("Customer verified ratings with hundreds of five-star reviews.")}');
hcsContent = hcsContent.replace('<span>View All ({bestSellers.length})</span>', '<span>{t("View All")} ({bestSellers.length})</span>');

// Hero Callout
hcsContent = hcsContent.replace('<span>GoMo Curated Quality</span>', '<span>{t("GoMo Curated Quality")}</span>');
hcsContent = hcsContent.replace('Exceptional Value. <br />\r\n                Zero Compromise.', '{t("Exceptional Value.")} <br />\r\n                {t("Zero Compromise.")}');
hcsContent = hcsContent.replace('Exceptional Value. <br />\n                Zero Compromise.', '{t("Exceptional Value.")} <br />\n                {t("Zero Compromise.")}');
hcsContent = hcsContent.replace('Every product across fashion, personal care, and electronics is verified for original authenticity and backed by our hassle-free 7-day guarantee.', '{t("Every product across fashion, personal care, and electronics is verified for original authenticity and backed by our hassle-free 7-day guarantee.")}');
hcsContent = hcsContent.replace('Shop Full Collection →', '{t("Shop Full Collection →")}');
hcsContent = hcsContent.replace('Our Guarantee\r\n', '{t("Our Guarantee")}\r\n');
hcsContent = hcsContent.replace('Our Guarantee\n', '{t("Our Guarantee")}\n');

// Section 3
hcsContent = hcsContent.replace('03 / Daily Rituals', '{t("03 / Daily Rituals")}');
hcsContent = hcsContent.replace('Personal Care & Beauty', '{t("Personal Care & Beauty")}');
hcsContent = hcsContent.replace('Natural formulations, nourishing botanical extracts, and gentle skin rejuvenation.', '{t("Natural formulations, nourishing botanical extracts, and gentle skin rejuvenation.")}');
hcsContent = hcsContent.replace('<span>View All ({personalCareProducts.length})</span>', '<span>{t("View All")} ({personalCareProducts.length})</span>');

// Section 4
hcsContent = hcsContent.replace('04 / Connected Living', '{t("04 / Connected Living")}');
hcsContent = hcsContent.replace('Smart Tech & Gadgets', '{t("Smart Tech & Gadgets")}');
hcsContent = hcsContent.replace('Cutting-edge connectivity, crystal audio, and minimalist desk setups.', '{t("Cutting-edge connectivity, crystal audio, and minimalist desk setups.")}');
hcsContent = hcsContent.replace('<span>View All ({electronicsProducts.length})</span>', '<span>{t("View All")} ({electronicsProducts.length})</span>');

// Section 5
hcsContent = hcsContent.replace('05 / Spiritual Heritage', '{t("05 / Spiritual Heritage")}');
hcsContent = hcsContent.replace('Sacred Pooja Essentials', '{t("Sacred Pooja Essentials")}');
hcsContent = hcsContent.replace('Pure brassware, traditional incense, and divine ceremonial accoutrements.', '{t("Pure brassware, traditional incense, and divine ceremonial accoutrements.")}');
hcsContent = hcsContent.replace('<span>View All ({poojaProducts.length})</span>', '<span>{t("View All")} ({poojaProducts.length})</span>');

// Section 6
hcsContent = hcsContent.replace('06 / Fresh Drops', '{t("06 / Fresh Drops")}');
hcsContent = hcsContent.replace('Just Arrived', '{t("Just Arrived")}');
hcsContent = hcsContent.replace('Explore the newest designs added to our store this week.', '{t("Explore the newest designs added to our store this week.")}');
hcsContent = hcsContent.replace('<span>View All ({newLaunches.length})</span>', '<span>{t("View All")} ({newLaunches.length})</span>');

fs.writeFileSync(hcsPath, hcsContent, 'utf8');
console.log('HomeCategorySections.jsx updated successfully!');
