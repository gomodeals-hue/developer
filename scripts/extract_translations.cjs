const fs = require('fs');
const path = require('path');

const shopContextPath = path.join(__dirname, '../frontend/src/context/ShopContext.jsx');
const content = fs.readFileSync(shopContextPath, 'utf8');

const normalized = content.replace(/\r\n/g, '\n');
const startTag = 'const translations = {';
const endTag = '};\n\nconst ShopContext';
const startIdx = normalized.indexOf(startTag);
const endIdx = normalized.indexOf(endTag, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find translations in ShopContext.jsx", { startIdx, endIdx });
  process.exit(1);
}

const translationsPart = normalized.substring(startIdx + startTag.length - 1, endIdx + 1);
const existingTranslations = eval('(' + translationsPart + ')');

console.log("Found existing languages:", Object.keys(existingTranslations));
console.log("EN keys count:", Object.keys(existingTranslations.EN).length);
console.log("FR keys count:", Object.keys(existingTranslations.FR).length);
console.log("DE keys count:", Object.keys(existingTranslations.DE).length);

// Additional keys covering every section and component
const additionalTranslations = {
  search: {
    EN: "Search",
    FR: "Rechercher",
    DE: "Suchen",
    HI: "खोजें",
    ES: "Buscar"
  },
  search_placeholder_full: {
    EN: "Search products, brands, deals & essentials...",
    FR: "Rechercher des produits, marques, offres & essentiels...",
    DE: "Produkte, Marken, Angebote & Essentials suchen...",
    HI: "उत्पाद, ब्रांड, सौदे और आवश्यक वस्तुएं खोजें...",
    ES: "Buscar productos, marcas, ofertas y esenciales..."
  },
  popular_searches: {
    EN: "Popular Searches",
    FR: "Recherches Populaires",
    DE: "Beliebte Suchanfragen",
    HI: "लोकप्रिय खोजें",
    ES: "Búsquedas Populares"
  },
  select_delivery_region: {
    EN: "Select Delivery Region",
    FR: "Sélectionner la Région de Livraison",
    DE: "Lieferregion Auswählen",
    HI: "वितरण क्षेत्र चुनें",
    ES: "Seleccionar Región de Entrega"
  },
  change_currency: {
    EN: "Change currency",
    FR: "Changer de devise",
    DE: "Währung ändern",
    HI: "मुद्रा बदलें",
    ES: "Cambiar moneda"
  },
  select_language: {
    EN: "Select Language",
    FR: "Choisir la Langue",
    DE: "Sprache Wählen",
    HI: "भाषा चुनें",
    ES: "Seleccionar Idioma"
  },
  website_language: {
    EN: "Language",
    FR: "Langue",
    DE: "Sprache",
    HI: "भाषा",
    ES: "Idioma"
  },
  language_instant_hint: {
    EN: "Translates entire website instantly",
    FR: "Traduit tout le site instantanément",
    DE: "Übersetzt die gesamte Website sofort",
    HI: "पूरी वेबसाइट तुरंत अनुवादित होती है",
    ES: "Traduce todo el sitio al instante"
  },
  notification_center: {
    EN: "Notification Center",
    FR: "Centre de Notifications",
    DE: "Benachrichtigungszentrum",
    HI: "सूचना केंद्र",
    ES: "Centro de Notificaciones"
  },
  unread: {
    EN: "unread",
    FR: "non lu",
    DE: "ungelesen",
    HI: "अपठित",
    ES: "no leído"
  },
  my_profile_address: {
    EN: "My Profile & Address",
    FR: "Mon Profil & Adresse",
    DE: "Mein Profil & Adresse",
    HI: "मेरी प्रोफ़ाइल और पता",
    ES: "Mi Perfil y Dirección"
  },
  orders_returns: {
    EN: "Orders & Returns",
    FR: "Commandes & Retours",
    DE: "Bestellungen & Rückgaben",
    HI: "ऑर्डर और रिटर्न",
    ES: "Pedidos y Devoluciones"
  },
  vip_membership: {
    EN: "GoMo VIP Membership",
    FR: "Adhésion GoMo VIP",
    DE: "GoMo VIP-Mitgliedschaft",
    HI: "गोमो वीआईपी सदस्यता",
    ES: "Membresía GoMo VIP"
  },
  customer_care_247: {
    EN: "24x7 Customer Care",
    FR: "Service Client 24/7",
    DE: "24/7 Kundenservice",
    HI: "24x7 ग्राहक सेवा",
    ES: "Atención al Cliente 24x7"
  },
  become_seller: {
    EN: "Become a Seller / Seller Hub",
    FR: "Devenir Vendeur / Espace Vendeur",
    DE: "Verkäufer werden / Verkäufer-Portal",
    HI: "विक्रेता बनें / सेलर हब",
    ES: "Hazte Vendedor / Centro de Vendedores"
  },
  sign_out: {
    EN: "Sign Out",
    FR: "Se Déconnecter",
    DE: "Abmelden",
    HI: "साइन आउट",
    ES: "Cerrar Sesión"
  },
  new_customer_prompt: {
    EN: "New customer?",
    FR: "Nouveau client ?",
    DE: "Neuer Kunde?",
    HI: "नए ग्राहक?",
    ES: "¿Nuevo cliente?"
  },
  start_here: {
    EN: "Start here",
    FR: "Commencez ici",
    DE: "Hier starten",
    HI: "यहाँ से शुरू करें",
    ES: "Comienza aquí"
  },
  orders_tracking: {
    EN: "Orders & Tracking",
    FR: "Commandes & Suivi",
    DE: "Bestellungen & Sendungsverfolgung",
    HI: "ऑर्डर और ट्रैकिंग",
    ES: "Pedidos y Seguimiento"
  },
  vip_club: {
    EN: "GoMo VIP Club",
    FR: "Club VIP GoMo",
    DE: "GoMo VIP-Club",
    HI: "गोमो वीआईपी क्लब",
    ES: "Club VIP GoMo"
  },
  seller_hub_vendor: {
    EN: "Seller Hub (Vendor Portal)",
    FR: "Espace Vendeur (Portail Partenaire)",
    DE: "Verkäufer-Portal (Händlerzugang)",
    HI: "विक्रेता हब (विक्रेता पोर्टल)",
    ES: "Centro de Vendedores (Portal)"
  },
  all_departments_btn: {
    EN: "All",
    FR: "Tous",
    DE: "Alle",
    HI: "सभी",
    ES: "Todos"
  },
  hero_discover: {
    EN: "DISCOVER",
    FR: "DÉCOUVREZ",
    DE: "ENTDECKEN",
    HI: "खोजिए",
    ES: "DESCUBRE"
  },
  hero_verified_deals: {
    EN: "VERIFIED DEALS ON",
    FR: "DES OFFRES VÉRIFIÉES SUR",
    DE: "GEPRÜFTE ANGEBOTE FÜR",
    HI: "सत्यापित सौदे पर",
    ES: "OFERTAS VERIFICADAS EN"
  },
  hero_handpicked_elegance: {
    EN: "HANDPICKED ELEGANCE",
    FR: "UNE ÉLÉGANCE CHOISIE",
    DE: "AUSGEWÄHLTE ELEGANZ",
    HI: "उत्कृष्ट सुंदरता",
    ES: "ELEGANCIA SELECCIONADA"
  },
  hero_subtitle: {
    EN: "Explore thousands of verified artisan creations, latest designer fashion, sacred pooja essentials, and modern electronics with guaranteed authentic savings.",
    FR: "Explorez des milliers de créations artisanales vérifiées, la dernière mode de créateurs, des essentiels de prière sacrés et des produits électroniques modernes avec des économies authentiques garanties.",
    DE: "Entdecken Sie Tausende verifizierter Kunsthandwerkskreationen, neueste Designermode, heilige Pooja-Essentials und moderne Elektronik mit garantiert echten Ersparnissen.",
    HI: "हजारों सत्यापित कारीगर कृतियों, नवीनतम डिजाइनर फैशन, पवित्र पूजा सामग्री और आधुनिक इलेक्ट्रॉनिक्स को प्रामाणिक बचत के साथ खोजें।",
    ES: "Explora miles de creaciones artesanales verificadas, la última moda de diseñador, esenciales sagrados de pooja y electrónica moderna con ahorros auténticos garantizados."
  },
  hero_spiritual: {
    EN: "Spiritual",
    FR: "Spirituel",
    DE: "Spirituell",
    HI: "आध्यात्मिक",
    ES: "Espiritual"
  },
  hero_artisan: {
    EN: "Artisan",
    FR: "Artisanal",
    DE: "Handwerk",
    HI: "शिल्पकार",
    ES: "Artesanal"
  },
  hero_pooja_essentials: {
    EN: "Pooja Essentials",
    FR: "Essentiels de Prière",
    DE: "Pooja-Bedarf",
    HI: "पूजा सामग्री",
    ES: "Esenciales de Pooja"
  },
  hero_ethnic_handloom: {
    EN: "Ethnic Handloom",
    FR: "Tissage Traditionnel",
    DE: "Traditionelle Handwebkunst",
    HI: "पारंपरिक हथकरघा",
    ES: "Telar Étnico"
  },
  hero_shop_now: {
    EN: "SHOP NOW",
    FR: "ACHETER",
    DE: "JETZT KAUFEN",
    HI: "अभी खरीदें",
    ES: "COMPRAR AHORA"
  },
  hero_explore_deals: {
    EN: "Explore Deals",
    FR: "Explorer les Offres",
    DE: "Angebote Erkunden",
    HI: "सौदों को देखें",
    ES: "Explorar Ofertas"
  },
  hero_browse_catalog: {
    EN: "Browse Catalog",
    FR: "Parcourir le Catalogue",
    DE: "Katalog Durchsuchen",
    HI: "कैटलॉग देखें",
    ES: "Ver Catálogo"
  },
  trust_shipping_title: {
    EN: "Free Express Shipping",
    FR: "Livraison Express Gratuite",
    DE: "Kostenloser Expressversand",
    HI: "मुफ़्त एक्सप्रेस शिपिंग",
    ES: "Envío Exprés Gratis"
  },
  trust_shipping_desc: {
    EN: "On all orders above ₹499 nationwide",
    FR: "Sur toutes les commandes supérieures à 499 ₹ dans tout le pays",
    DE: "Auf alle Bestellungen über 499 ₹ landesweit",
    HI: "देश भर में ₹499 से अधिक के सभी ऑर्डर पर",
    ES: "En todos los pedidos superiores a ₹499 a nivel nacional"
  },
  trust_payment_title: {
    EN: "Secure Payment",
    FR: "Paiement Sécurisé",
    DE: "Sichere Zahlung",
    HI: "सुरक्षित भुगतान",
    ES: "Pago Seguro"
  },
  trust_payment_desc: {
    EN: "100% protected UPI & card checkout",
    FR: "Paiement 100% protégé par carte & UPI",
    DE: "100% geschützte Zahlung per Karte & UPI",
    HI: "100% सुरक्षित यूपीआई और कार्ड भुगतान",
    ES: "Pago 100% protegido con tarjeta y UPI"
  },
  trust_returns_title: {
    EN: "7-Day Easy Returns",
    FR: "Retours Faciles sous 7 Jours",
    DE: "Einfache 7-Tage-Rückgabe",
    HI: "7 दिनों में आसान वापसी",
    ES: "Devoluciones Fáciles en 7 Días"
  },
  trust_returns_desc: {
    EN: "Doorstep pickup & instant refunds",
    FR: "Enlèvement à domicile & remboursement immédiat",
    DE: "Abholung an der Haustür & Sofortrückerstattung",
    HI: "घर से पिकअप और त्वरित रिफंड",
    ES: "Recogida a domicilio y reembolsos instantáneos"
  },
  trust_genuine_title: {
    EN: "100% Genuine Certified",
    FR: "Certifié 100% Authentique",
    DE: "100% Authentisch Zertifiziert",
    HI: "100% प्रामाणिक प्रमाणित",
    ES: "100% Certificado Auténtico"
  },
  trust_genuine_desc: {
    EN: "Direct verified merchant sourcing",
    FR: "Approvisionnement direct auprès de marchands vérifiés",
    DE: "Direkte Beschaffung von geprüften Händlern",
    HI: "सीधे सत्यापित व्यापारियों से प्राप्ति",
    ES: "Abastecimiento directo de comerciantes verificados"
  },
  shopping_simple_badge: {
    EN: "Simple Shopping Experience",
    FR: "Expérience d'Achat Simple",
    DE: "Einfaches Einkaufserlebnis",
    HI: "सरल खरीदारी अनुभव",
    ES: "Experiencia de Compra Sencilla"
  },
  shopping_heading: {
    EN: "Straightforward, Reliable Shopping",
    FR: "Des Achats Simples et Fiables",
    DE: "Unkompliziertes, Zuverlässiges Einkaufen",
    HI: "सरल और विश्वसनीय खरीदारी",
    ES: "Compras Claras y Confiables"
  },
  shopping_desc: {
    EN: "A transparent four-step ordering process designed to make selecting, buying, and tracking your items effortless.",
    FR: "Un processus de commande transparent en quatre étapes conçu pour faciliter la sélection, l'achat et le suivi de vos articles.",
    DE: "Ein transparenter vierstufiger Bestellprozess, der die Auswahl, den Kauf und die Nachverfolgung Ihrer Artikel mühelos macht.",
    HI: "एक पारदर्शी चार-चरणीय ऑर्डर प्रक्रिया जिसे चुनना, खरीदना और ट्रैक करना बेहद आसान बनाने के लिए डिज़ाइन किया गया है।",
    ES: "Un proceso transparente de pedido en cuatro pasos diseñado para facilitar la selección, compra y seguimiento de tus artículos."
  },
  ordering_guide_btn: {
    EN: "Ordering Guide",
    FR: "Guide de Commande",
    DE: "Bestellleitfaden",
    HI: "ऑर्डर गाइड",
    ES: "Guía de Pedido"
  },
  seller_portal_btn: {
    EN: "Seller Portal",
    FR: "Portail Vendeur",
    DE: "Verkäufer-Portal",
    HI: "विक्रेता पोर्टल",
    ES: "Portal de Vendedores"
  },
  shopping_step1_title: {
    EN: "Select Products",
    FR: "Sélectionner les Produits",
    DE: "Produkte Auswählen",
    HI: "उत्पाद चुनें",
    ES: "Seleccionar Productos"
  },
  shopping_step1_desc: {
    EN: "Browse curated collections across apparel, pooja essentials, and electronics with transparent pricing.",
    FR: "Parcourez des collections sélectionnées de vêtements, d'essentiels de prière et d'électronique à des prix transparents.",
    DE: "Durchsuchen Sie ausgewählte Kollektionen aus Kleidung, Pooja-Bedarf und Elektronik mit transparenten Preisen.",
    HI: "पारदर्शी कीमतों के साथ कपड़े, पूजा सामग्री और इलेक्ट्रॉनिक्स के चुनिंदा संग्रह देखें।",
    ES: "Explora colecciones seleccionadas de ropa, esenciales de pooja y electrónica con precios transparentes."
  },
  shopping_step1_action: {
    EN: "Explore Catalog",
    FR: "Explorer le Catalogue",
    DE: "Katalog Erkunden",
    HI: "कैटलॉग देखें",
    ES: "Explorar Catálogo"
  },
  shopping_step2_title: {
    EN: "Review Bag & Savings",
    FR: "Vérifier le Panier & Économies",
    DE: "Warenkorb & Ersparnisse Prüfen",
    HI: "बैग और बचत की समीक्षा करें",
    ES: "Revisar Carrito y Ahorros"
  },
  shopping_step2_desc: {
    EN: "Verify sizes, apply discount coupons like GOMO50, and view total estimated savings prior to checkout.",
    FR: "Vérifiez les tailles, appliquez des coupons de réduction comme GOMO50 et visualisez vos économies totales avant de payer.",
    DE: "Überprüfen Sie Größen, wenden Sie Rabattgutscheine wie GOMO50 an und sehen Sie die geschätzten Gesamtersparnisse vor der Kasse.",
    HI: "आकार सत्यापित करें, GOMO50 जैसे कूपन लागू करें और चेकआउट से पहले कुल बचत देखें।",
    ES: "Verifica tallas, aplica cupones de descuento como GOMO50 y revisa el ahorro total antes del pago."
  },
  shopping_step2_action: {
    EN: "View Offers",
    FR: "Voir les Offres",
    DE: "Angebote Ansehen",
    HI: "ऑफ़र देखें",
    ES: "Ver Ofertas"
  },
  shopping_step3_title: {
    EN: "Flexible Payment",
    FR: "Paiement Flexible",
    DE: "Flexible Zahlung",
    HI: "लचीला भुगतान",
    ES: "Pago Flexible"
  },
  shopping_step3_desc: {
    EN: "Choose UPI, cards, net banking, or opt for Cash on Delivery to pay once your parcel arrives at your door.",
    FR: "Choisissez UPI, cartes, virement ou optez pour le paiement à la livraison dès l'arrivée de votre colis.",
    DE: "Wählen Sie UPI, Kreditkarten, Online-Banking oder Nachnahme bei Erhalt Ihres Pakets an der Haustür.",
    HI: "यूपीआई, कार्ड, नेट बैंकिंग चुनें या घर पर पार्सल आने पर कैश ऑन डिलीवरी का विकल्प चुनें।",
    ES: "Elige UPI, tarjetas, banca online o pago contra entrega al llegar tu paquete a casa."
  },
  shopping_step3_action: {
    EN: "Payment Details",
    FR: "Détails du Paiement",
    DE: "Zahlungsdetails",
    HI: "भुगतान विवरण",
    ES: "Detalles del Pago"
  },
  shopping_step4_title: {
    EN: "Express Doorstep Delivery",
    FR: "Livraison Express à Domicile",
    DE: "Express-Lieferung an die Haustür",
    HI: "घर तक एक्सप्रेस डिलीवरी",
    ES: "Entrega Exprés a Domicilio"
  },
  shopping_step4_desc: {
    EN: "Track live courier dispatch across top logistic networks directly to your delivery address.",
    FR: "Suivez en temps réel l'expédition par les meilleurs réseaux logistiques directement à votre adresse.",
    DE: "Verfolgen Sie den Kurierversand über führende Logistiknetzwerke live direkt an Ihre Lieferadresse.",
    HI: "शीर्ष लॉजिस्टिक्स नेटवर्क के माध्यम से अपने पते तक कूरियर का लाइव ट्रैक करें।",
    ES: "Rastrea el envío en vivo a través de las mejores redes de logística hasta tu dirección."
  },
  shopping_step4_action: {
    EN: "Track Order",
    FR: "Suivre la Commande",
    DE: "Bestellung Verfolgen",
    HI: "ऑर्डर ट्रैक करें",
    ES: "Rastrear Pedido"
  },
  trending_badge: {
    EN: "Trending",
    FR: "Tendance",
    DE: "Im Trend",
    HI: "ट्रेंडिंग",
    ES: "Tendencia"
  },
  popular_badge: {
    EN: "Popular",
    FR: "Populaire",
    DE: "Beliebt",
    HI: "लोकप्रिय",
    ES: "Popular"
  },
  new_badge: {
    EN: "New",
    FR: "Nouveau",
    DE: "Neu",
    HI: "नया",
    ES: "Nuevo"
  },
  sacred_badge: {
    EN: "Sacred",
    FR: "Sacré",
    DE: "Heilig",
    HI: "पवित्र",
    ES: "Sagrado"
  },
  deals_badge: {
    EN: "Deals",
    FR: "Offres",
    DE: "Angebote",
    HI: "सौदे",
    ES: "Ofertas"
  },
  artisan_badge: {
    EN: "Artisan",
    FR: "Artisanal",
    DE: "Handwerk",
    HI: "कारीगर",
    ES: "Artesano"
  },
  organic_badge: {
    EN: "Organic",
    FR: "Bio",
    DE: "Bio",
    HI: "जैविक",
    ES: "Orgánico"
  },
  pooja_items_label: {
    EN: "Pooja Items",
    FR: "Articles de Prière",
    DE: "Pooja-Bedarf",
    HI: "पूजा सामग्री",
    ES: "Artículos de Pooja"
  },
  gifts_label: {
    EN: "Gifts",
    FR: "Cadeaux",
    DE: "Geschenke",
    HI: "उपहार",
    ES: "Regalos"
  },
  our_new_collection: {
    EN: "Our New Collection",
    FR: "Notre Nouvelle Collection",
    DE: "Unsere Neue Kollektion",
    HI: "हमारा नया संग्रह",
    ES: "Nuestra Nueva Colección"
  },
  curated_season_highlights: {
    EN: "Curated Season Highlights",
    FR: "Sélection de la Saison",
    DE: "Ausgewählte Saison-Highlights",
    HI: "मौसम की चुनिंदा झलकियां",
    ES: "Destacados de la Temporada"
  },
  see_all_collections: {
    EN: "See All Collections",
    FR: "Voir Toutes les Collections",
    DE: "Alle Kollektionen Anzeigen",
    HI: "सभी संग्रह देखें",
    ES: "Ver Todas las Colecciones"
  },
  trending_edit: {
    EN: "Trending Edit",
    FR: "Tendance du Moment",
    DE: "Trending Edit",
    HI: "ट्रेंडिंग एडिट",
    ES: "Edición en Tendencia"
  },
  modern_minimalist: {
    EN: "Modern Minimalist Silhouette",
    FR: "Silhouette Minimaliste Moderne",
    DE: "Moderne Minimalistische Silhouette",
    HI: "आधुनिक मिनिमलिस्ट सिल्हूट",
    ES: "Silueta Minimalista Moderna"
  },
  modern_minimalist_desc: {
    EN: "Discover effortless styling with pure breathable fabrics and timeless tailored cuts.",
    FR: "Découvrez un style décontracté avec des tissus respirants et des coupes intemporelles.",
    DE: "Entdecken Sie mühelosen Stil mit atmungsaktiven Stoffen und zeitlosen Schnitten.",
    HI: "शुद्ध सांस लेने योग्य कपड़ों और कालजयी कट्स के साथ सहज स्टाइल खोजें।",
    ES: "Descubre un estilo natural con tejidos transpirables y cortes atemporales."
  },
  shop_collection: {
    EN: "Shop Collection",
    FR: "Acheter la Collection",
    DE: "Kollektion Kaufen",
    HI: "कलेक्शन खरीदें",
    ES: "Comprar Colección"
  },
  sacred_traditions: {
    EN: "Sacred Artisan Traditions",
    FR: "Traditions Artisanales Sacrées",
    DE: "Heilige Handwerkstraditionen",
    HI: "पवित्र कारीगर परंपराएं",
    ES: "Tradiciones Sagradas de Artesanos"
  },
  sacred_traditions_desc: {
    EN: "Hand-carved brass lamps, authentic incense & certified spiritual items directly from master craftsmen.",
    FR: "Lampes en laiton sculptées main, encens authentique & articles spirituels certifiés par des maîtres artisans.",
    DE: "Handgefertigte Messinglampen, echter Weihrauch & spirituelle Artikel direkt von Meistern.",
    HI: "हस्तनिर्मित पीतल के दीपक, धूप और प्रमाणित आध्यात्मिक वस्तुएं सीधे कुशल कारीगरों से।",
    ES: "Lámparas de latón talladas a mano, incienso auténtico y artículos espirituales certificados de maestros artesanos."
  },
  explore_pooja: {
    EN: "Explore Pooja",
    FR: "Explorer la Prière",
    DE: "Pooja Entdecken",
    HI: "पूजा संग्रह देखें",
    ES: "Explorar Pooja"
  },
  premium_audio: {
    EN: "Premium Audio & Tech",
    FR: "Audio & Tech Premium",
    DE: "Premium Audio & Technik",
    HI: "प्रीमियम ऑडियो और तकनीक",
    ES: "Audio y Tecnología Premium"
  },
  explore_tech: {
    EN: "Explore Tech",
    FR: "Explorer la Tech",
    DE: "Technik Erkunden",
    HI: "टेक संग्रह देखें",
    ES: "Explorar Tecnología"
  },
  flash_deals_header: {
    EN: "Limited-Time Flash Deals",
    FR: "Ventes Flash à Durée Limitée",
    DE: "Zeitlich Begrenzte Blitzangebote",
    HI: "सीमित समय के फ्लैश सौदे",
    ES: "Ofertas Flash por Tiempo Limitado"
  },
  supercharged_savings: {
    EN: "Supercharged Savings",
    FR: "Économies Décuplées",
    DE: "Mega-Ersparnisse",
    HI: "शानदार बचत",
    ES: "Grandes Ahorros"
  },
  ends_in: {
    EN: "Ends in:",
    FR: "Se termine dans :",
    DE: "Endet in:",
    HI: "समाप्त होने में समय:",
    ES: "Termina en:"
  },
  hours: {
    EN: "Hours",
    FR: "Heures",
    DE: "Stunden",
    HI: "घंटे",
    ES: "Horas"
  },
  minutes: {
    EN: "Minutes",
    FR: "Minutes",
    DE: "Minuten",
    HI: "मिनट",
    ES: "Minutos"
  },
  seconds: {
    EN: "Seconds",
    FR: "Secondes",
    DE: "Sekunden",
    HI: "सेकंड",
    ES: "Segundos"
  },
  claim_deal: {
    EN: "Claim Deal",
    FR: "Profiter de l'Offre",
    DE: "Angebot Sichern",
    HI: "सौदा प्राप्त करें",
    ES: "Aprovechar Oferta"
  },
  in_cart: {
    EN: "In Cart",
    FR: "Dans le Panier",
    DE: "Im Warenkorb",
    HI: "कार्ट में",
    ES: "En el Carrito"
  },
  view_all_deals: {
    EN: "View All Deals",
    FR: "Voir Toutes les Offres",
    DE: "Alle Angebote Anzeigen",
    HI: "सभी सौदे देखें",
    ES: "Ver Todas las Ofertas"
  },
  winter_fashion: {
    EN: "Winter-Wear & Fashion",
    FR: "Mode & Vêtements d'Hiver",
    DE: "Wintermode & Fashion",
    HI: "विंटर-वियर और फैशन",
    ES: "Ropa de Invierno y Moda"
  },
  best_selling_products: {
    EN: "Best Selling Products",
    FR: "Produits les Plus Vendus",
    DE: "Meistverkaufte Produkte",
    HI: "सबसे ज्यादा बिकने वाले उत्पाद",
    ES: "Los Más Vendidos"
  },
  electronics_gadgets: {
    EN: "Electronics & Gadgets",
    FR: "Électronique & Gadgets",
    DE: "Elektronik & Gadgets",
    HI: "इलेक्ट्रॉनिक्स और गैजेट्स",
    ES: "Electrónica y Gadgets"
  },
  home_sacred: {
    EN: "Home & Sacred Essentials",
    FR: "Maison & Essentiels Sacrés",
    DE: "Wohnen & Heilige Essentials",
    HI: "गृह एवं पवित्र सामग्री",
    ES: "Hogar y Esenciales Sagrados"
  },
  featured_collections: {
    EN: "Featured Collections",
    FR: "Collections Vedettes",
    DE: "Empfohlene Kollektionen",
    HI: "विशेष संग्रह",
    ES: "Colecciones Destacadas"
  },
  explore_more: {
    EN: "Explore More",
    FR: "En Savoir Plus",
    DE: "Mehr Entdecken",
    HI: "और देखें",
    ES: "Explorar Más"
  },
  view_all: {
    EN: "View All",
    FR: "Voir Tout",
    DE: "Alle Anzeigen",
    HI: "सभी देखें",
    ES: "Ver Todo"
  },
  customer_stories: {
    EN: "Customer Stories",
    FR: "Témoignages Clients",
    DE: "Kundenberichte",
    HI: "ग्राहकों के अनुभव",
    ES: "Historias de Clientes"
  },
  verified_buyer_experiences: {
    EN: "Verified Buyer Experiences",
    FR: "Expériences d'Acheteurs Vérifiés",
    DE: "Erfahrungen Verifizierter Käufer",
    HI: "सत्यापित खरीदार समीक्षाएं",
    ES: "Experiencias de Compradores Verificados"
  },
  verified_buyer: {
    EN: "Verified Buyer",
    FR: "Acheteur Vérifié",
    DE: "Verifizierter Käufer",
    HI: "सत्यापित खरीदार",
    ES: "Comprador Verificado"
  },
  insiders_club: {
    EN: "GoMo Insiders Club",
    FR: "Club des Privilégiés GoMo",
    DE: "GoMo Insiders Club",
    HI: "गोमो इनसाइडर्स क्लब",
    ES: "Club de Miembros GoMo"
  },
  newsletter_header: {
    EN: "Get ₹500 Off Your First Order",
    FR: "Obtenez 500 ₹ de Réduction sur Votre Première Commande",
    DE: "Erhalten Sie 500 ₹ Rabatt auf Ihre Erste Bestellung",
    HI: "अपने पहले ऑर्डर पर ₹500 की छूट पाएं",
    ES: "Obtén ₹500 de Descuento en tu Primer Pedido"
  },
  newsletter_desc_sub: {
    EN: "Subscribe for exclusive insider coupon drops, flash sales alerts, and weekly handpicked artisan deals.",
    FR: "Abonnez-vous pour recevoir des coupons exclusifs, des alertes de ventes flash et des offres artisanales sélectionnées.",
    DE: "Abonnieren Sie exklusive Gutscheine, Blitzangebots-Benachrichtigungen und wöchentliche Angebote.",
    HI: "विशेष कूपन, फ्लैश सेल अलर्ट और साप्ताहिक चुनिंदा कारीगर सौदों के लिए सदस्यता लें।",
    ES: "Suscríbete para recibir cupones exclusivos, alertas de ventas flash y ofertas semanales."
  },
  enter_email_addr: {
    EN: "Enter your email address",
    FR: "Entrez votre adresse e-mail",
    DE: "Geben Sie Ihre E-Mail-Adresse ein",
    HI: "अपना ईमेल पता दर्ज करें",
    ES: "Introduce tu correo electrónico"
  },
  subscribe_btn: {
    EN: "Subscribe",
    FR: "S'abonner",
    DE: "Abonnieren",
    HI: "सब्सक्राइब करें",
    ES: "Suscribirse"
  },
  newsletter_success: {
    EN: "Thank you! Your coupon code WELCOME500 has been activated.",
    FR: "Merci ! Votre code coupon WELCOME500 a été activé.",
    DE: "Vielen Dank! Ihr Gutscheincode WELCOME500 wurde aktiviert.",
    HI: "धन्यवाद! आपका कूपन कोड WELCOME500 सक्रिय हो गया है।",
    ES: "¡Gracias! Tu código de cupón WELCOME500 ha sido activado."
  },
  welcome_back: {
    EN: "Welcome Back",
    FR: "Bon retour",
    DE: "Willkommen zurück",
    HI: "वापसी पर स्वागत है",
    ES: "Bienvenido de nuevo"
  },
  hello_guest: {
    EN: "Hello, Guest",
    FR: "Bonjour, Visiteur",
    DE: "Hallo, Gast",
    HI: "नमस्ते, अतिथि",
    ES: "Hola, Invitado"
  },
  sign_in_register: {
    EN: "Sign In / Register",
    FR: "Se Connecter / S'inscrire",
    DE: "Anmelden / Registrieren",
    HI: "साइन इन / रजिस्टर",
    ES: "Iniciar Sesión / Registrarse"
  },
  trending_and_offers: {
    EN: "Trending & Offers",
    FR: "Tendances & Offres",
    DE: "Trends & Angebote",
    HI: "ट्रेंडिंग और ऑफ़र",
    ES: "Tendencias y Ofertas"
  },
  todays_deals_discount: {
    EN: "Today's Deals (Up to 80% Off)",
    FR: "Offres du Jour (Jusqu'à -80%)",
    DE: "Heutige Angebote (Bis zu 80% Rabatt)",
    HI: "आज के सौदे (80% तक की छूट)",
    ES: "Ofertas de Hoy (Hasta 80% Descuento)"
  },
  new_arrivals: {
    EN: "New Arrivals",
    FR: "Nouveautés",
    DE: "Neuheiten",
    HI: "नए उत्पाद",
    ES: "Nuevas Llegadas"
  },
  shop_by_category: {
    EN: "Shop By Category",
    FR: "Acheter par Catégorie",
    DE: "Nach Kategorie Einkaufen",
    HI: "श्रेणी के अनुसार खरीदारी करें",
    ES: "Comprar por Categoría"
  },
  topwear: {
    EN: "Topwear",
    FR: "Hauts",
    DE: "Oberteile",
    HI: "टॉपवियर",
    ES: "Prendas Superiores"
  },
  bottomwear: {
    EN: "Bottomwear",
    FR: "Bas",
    DE: "Unterteile",
    HI: "बॉटमवियर",
    ES: "Prendas Inferiores"
  },
  footwear_accessories: {
    EN: "Footwear & Accessories",
    FR: "Chaussures & Accessoires",
    DE: "Schuhe & Accessoires",
    HI: "जूते और सहायक उपकरण",
    ES: "Calzado y Accesorios"
  },
  price_summary: {
    EN: "Price Summary",
    FR: "Détail du Prix",
    DE: "Preisübersicht",
    HI: "मूल्य विवरण",
    ES: "Resumen de Precios"
  },
  order_total: {
    EN: "Order Total",
    FR: "Total de la Commande",
    DE: "Bestellgesamtbetrag",
    HI: "कुल ऑर्डर राशि",
    ES: "Total del Pedido"
  },
  discount: {
    EN: "Discount",
    FR: "Remise",
    DE: "Rabatt",
    HI: "छूट",
    ES: "Descuento"
  },
  clear_cart: {
    EN: "Clear Cart",
    FR: "Vider le Panier",
    DE: "Warenkorb Leeren",
    HI: "कार्ट खाली करें",
    ES: "Vaciar Carrito"
  },
  move_to_wishlist: {
    EN: "Move to Wishlist",
    FR: "Déplacer vers les Envies",
    DE: "Auf den Wunschzettel",
    HI: "विशलिस्ट में ले जाएं",
    ES: "Mover a Lista de Deseos"
  },
  move_to_cart: {
    EN: "Move to Cart",
    FR: "Déplacer vers le Panier",
    DE: "In den Warenkorb",
    HI: "कार्ट में ले जाएं",
    ES: "Mover al Carrito"
  },
  no_matches_for: {
    EN: "No matches for \"{query}\"",
    FR: "Aucun résultat pour « {query} »",
    DE: "Keine Treffer für „{query}“",
    HI: "\"{query}\" के लिए कोई परिणाम नहीं मिला",
    ES: "No hay coincidencias para \"{query}\""
  },
  no_products_filter_title: {
    EN: "No Products Match Selected Filters",
    FR: "Aucun produit ne correspond aux filtres",
    DE: "Keine Produkte entsprechen den Filtern",
    HI: "चयनित फिल्टर से कोई उत्पाद मेल नहीं खाता",
    ES: "Ningún producto coincide con los filtros seleccionados"
  },
  search_no_results_help: {
    EN: "We couldn't find any items matching your search query. Please double-check spelling, try more general keywords, or reset the catalog search.",
    FR: "Nous n'avons trouvé aucun article correspondant à votre recherche. Veuillez vérifier l'orthographe ou réinitialiser les filtres.",
    DE: "Wir konnten keine Artikel finden, die Ihrer Suche entsprechen. Bitte überprüfen Sie die Schreibweise oder setzen Sie die Filter zurück.",
    HI: "हमें आपकी खोज से मेल खाने वाली कोई वस्तु नहीं मिली। कृपया वर्तनी जांचें या फ़िल्टर रीसेट करें।",
    ES: "No pudimos encontrar ningún artículo que coincida con tu búsqueda. Revisa la ortografía o restablece los filtros."
  },
  reset_search_and_filters: {
    EN: "Reset Search & Filters",
    FR: "Réinitialiser Recherche & Filtres",
    DE: "Suche & Filter Zurücksetzen",
    HI: "खोज और फ़िल्टर रीसेट करें",
    ES: "Restablecer Búsqueda y Filtros"
  },
  clear_all_filters: {
    EN: "Clear All Filters",
    FR: "Effacer Tous les Filtres",
    DE: "Alle Filter Löschen",
    HI: "सभी फ़िल्टर साफ़ करें",
    ES: "Borrar Todos los Filtros"
  },
  review1_title: {
    EN: "Exquisite Brass Vilakku Quality",
    FR: "Qualité Exquise de la Lampe Vilakku en Laiton",
    DE: "Exquisite Messing-Vilakku-Qualität",
    HI: "उत्कृष्ट पीतल विलक्कु गुणवत्ता",
    ES: "Exquisita Calidad de Lámpara Vilakku de Latón"
  },
  review1_text: {
    EN: "Ordered the traditional Kamakshi Amman vilakku for Navratri. The brass finish is flawless and weighty. Delivery took just 2 days. Highly recommended!",
    FR: "J'ai commandé la vilakku traditionnelle Kamakshi Amman pour Navratri. La finition en laiton est impeccable et lourde. Livraison en 2 jours seulement. Hautement recommandé !",
    DE: "Habe die traditionelle Kamakshi Amman Vilakku für Navratri bestellt. Das Messing-Finish ist makellos und massiv. Lieferung dauerte nur 2 Tage. Sehr empfehlenswert!",
    HI: "नवरात्रि के लिए पारंपरिक कामाक्षी अम्मन विलक्कु का ऑर्डर दिया। पीतल की फिनिशिंग निर्दोष और ठोस है। केवल 2 दिनों में डिलीवरी। अत्यधिक अनुशंसित!",
    ES: "Pedí la tradicional vilakku Kamakshi Amman para Navratri. El acabado de latón es impecable y macizo. La entrega tardó solo 2 días. ¡Muy recomendable!"
  },
  review1_purchase: {
    EN: "Brass Pooja Essentials",
    FR: "Essentiels de Prière en Laiton",
    DE: "Messing-Pooja-Essentials",
    HI: "पीतल पूजा सामग्री",
    ES: "Esenciales de Pooja en Latón"
  },
  review2_title: {
    EN: "Authentic Handloom & Fast Shipping",
    FR: "Tissage Artisanal Authentique & Envoi Rapide",
    DE: "Echte Handwebkunst & Schneller Versand",
    HI: "प्रामाणिक हथकरघा और त्वरित शिपिंग",
    ES: "Telar Auténtico y Envío Rápido"
  },
  review2_text: {
    EN: "The fabric quality of the men linen shirt and kurta set exceeded expectations. Packaging was luxurious and sizing was completely accurate.",
    FR: "La qualité du tissu de la chemise en lin et du kurta pour homme a dépassé mes attentes. Emballage luxueux et taille tout à fait exacte.",
    DE: "Die Stoffqualität des Herren-Leinenhemds und Kurta-Sets hat die Erwartungen übertroffen. Die Verpackung war luxuriös und die Größe genau passend.",
    HI: "पुरुषों की लिनन शर्ट और कुर्ता सेट के कपड़े की गुणवत्ता उम्मीदों से बढ़कर थी। पैकेजिंग शानदार थी और आकार बिल्कुल सही था।",
    ES: "La calidad de la tela de la camisa de lino y conjunto de kurta superó las expectativas. El empaque fue lujoso y la talla muy precisa."
  },
  review2_purchase: {
    EN: "Pure Linen Ethnic Kurta",
    FR: "Kurta Traditionnel en Pur Lin",
    DE: "Ethnisches Kurta aus Reinem Leinen",
    HI: "प्योर लिनन एथनिक कुर्ता",
    ES: "Kurta Étnico de Lino Puro"
  },
  review3_title: {
    EN: "Great Deals & Seamless Return Policy",
    FR: "Super Offres & Politique de Retour Fluide",
    DE: "Tolle Angebote & Reibungslose Rückgabebedingungen",
    HI: "शानदार सौदे और आसान वापसी नीति",
    ES: "Grandes Ofertas y Política de Devolución Fácil"
  },
  review3_text: {
    EN: "Bought noise cancelling headphones during the flash sale with over 35% discount. Prompt customer support and guaranteed genuine product.",
    FR: "J'ai acheté un casque à réduction de bruit pendant la vente flash avec plus de 35% de réduction. Support client rapide et produit authentique garanti.",
    DE: "Habe ANC-Kopfhörer im Blitzangebot mit über 35% Rabatt gekauft. Schneller Kundenservice und garantiert echtes Produkt.",
    HI: "फ्लैश सेल के दौरान 35% से अधिक छूट पर नॉइज़ कैंसिलिंग हेडफ़ोन खरीदे। त्वरित ग्राहक सहायता और गारंटीकृत प्रामाणिक उत्पाद।",
    ES: "Compré auriculares con cancelación de ruido durante la venta flash con más del 35% de descuento. Atención rápida y producto auténtico."
  },
  review3_purchase: {
    EN: "Wireless ANC Headphones",
    FR: "Casque Sans Fil Réduction de Bruit",
    DE: "Kabellose ANC-Kopfhörer",
    HI: "वायरलेस एएनसी हेडफ़ोन",
    ES: "Auriculares Inalámbricos ANC"
  },
  view_all_results_in: {
    EN: "View all results in {category} →",
    FR: "Voir tous les résultats dans {category} →",
    DE: "Alle Ergebnisse in {category} anzeigen →",
    HI: "{category} में सभी परिणाम देखें →",
    ES: "Ver todos los resultados en {category} →"
  },
  view_all_search_results: {
    EN: "View all search results →",
    FR: "Voir tous les résultats de recherche →",
    DE: "Alle Suchergebnisse anzeigen →",
    HI: "सभी खोज परिणाम देखें →",
    ES: "Ver todos los resultados de búsqueda →"
  },
  language_en: {
    EN: "English",
    FR: "Anglais",
    DE: "Englisch",
    HI: "अंग्रेज़ी",
    ES: "Inglés"
  },
  language_fr: {
    EN: "French",
    FR: "Français",
    DE: "Französisch",
    HI: "फ़्रेंच",
    ES: "Francés"
  },
  language_de: {
    EN: "German",
    FR: "Allemand",
    DE: "Deutsch",
    HI: "जर्मन",
    ES: "Alemán"
  }
};

// Merge into each language dictionary
const languages = ['EN', 'FR', 'DE', 'HI', 'ES'];

languages.forEach(lang => {
  if (!existingTranslations[lang]) {
    existingTranslations[lang] = {};
  }
  Object.keys(additionalTranslations).forEach(key => {
    existingTranslations[lang][key] = additionalTranslations[key][lang] || additionalTranslations[key].EN;
  });
});

console.log("Updated EN keys count:", Object.keys(existingTranslations.EN).length);
console.log("Updated FR keys count:", Object.keys(existingTranslations.FR).length);
console.log("Updated DE keys count:", Object.keys(existingTranslations.DE).length);

// Supported languages definition
const supportedLanguages = [
  { code: 'EN', name: 'English', nativeName: 'English', flag: '🇬🇧', label: 'English' },
  { code: 'FR', name: 'French', nativeName: 'Français', flag: '🇫🇷', label: 'Français' },
  { code: 'DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', label: 'हिन्दी' },
  { code: 'ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', label: 'Español' }
];

const outputFileContent = `/**
 * Complete Multi-Language Translations Dictionary for GoMo Deals
 * Supports English (EN), French (FR), German (DE), Hindi (HI), Spanish (ES)
 */

export const supportedLanguages = ${JSON.stringify(supportedLanguages, null, 2)};

export const translations = ${JSON.stringify(existingTranslations, null, 2)};

export default translations;
`;

const targetPath = path.join(__dirname, '../frontend/src/data/translations.js');
fs.writeFileSync(targetPath, outputFileContent, 'utf8');
console.log("Wrote translations file to:", targetPath);
