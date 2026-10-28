import fs from 'fs';
import path from 'path';

export const poojaProducts = [
  // ==========================================
  // 1. IDOLS & MANDIR - BRASS IDOLS & STATUES
  // ==========================================
  {
    id: "gmd-pj-id-001",
    product_id: "gmd-pj-id-001",
    name: "Handcrafted Pure Brass Lord Ganesha Idol for Pooja Mandir (6-Inch)",
    title: "Handcrafted Brass Lord Ganesha Idol (6-Inch)",
    brand: "Collectible India",
    category: "pooja-items",
    category_name: "Brass Idols & Statues",
    subcategory: "idols-statues",
    childCategory: "brass-idols",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1499,
    discount_percentage: 40,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 210,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJucfBbnXKhmAdcWFVf308Q31Y_OsnyC11syKGJ0Na4v_S15u6x_PgTY&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJucfBbnXKhmAdcWFVf308Q31Y_OsnyC11syKGJ0Na4v_S15u6x_PgTY&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJucfBbnXKhmAdcWFVf308Q31Y_OsnyC11syKGJ0Na4v_S15u6x_PgTY&s=10"
      }
    ],
    sizes: ["6 Inch"],
    description: "Welcome prosperity, wisdom, and auspicious beginnings into your home with this exquisitely handcrafted pure brass Lord Ganesha idol. Designed with fine artisan engraving, durable heavyweight brass, and an antique golden sheen, it is ideal for home altars, mandirs, and festive gifting.",
    features: [
      "Crafted from 100% Solid Heavy-Cast Pure Brass",
      "Traditional intricate artisan engravings on trunk and crown",
      "Auspicious idol for home temple, office desk & housewarming",
      "Tarnish-resistant clear protective lacquer coating",
      "Easy maintenance with pitambari or soft dry cloth"
    ],
    specifications: {
      "Material": "100% Solid Brass",
      "Height": "6 Inches (15 cm)",
      "Weight": "Approx. 650 grams",
      "Finish": "Antique Golden Polish",
      "Placement": "Home Mandir, Altar, Living Room Altar",
      "Care Instructions": "Clean with Pitambari powder or lemon water"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items brass idols ganesha idol murti statue mandir spiritual collectible india"
  },
  {
    id: "gmd-pj-st-001",
    product_id: "gmd-pj-st-001",
    name: "Pure Brass Dancing Shiva Nataraja Cosmic Temple Statue (8-Inch)",
    title: "Pure Brass Shiva Nataraja Temple Statue (8-Inch)",
    brand: "Divine Crafts",
    category: "pooja-items",
    category_name: "Brass Idols & Statues",
    subcategory: "idols-statues",
    childCategory: "brass-statues",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1299,
    mrp: 2199,
    discount_percentage: 41,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 185,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl9qTIMvcYj3_Oczgv8mtbPNiCo66TT8ZKwBTx-4fqQhlV2er69GKoaaCD&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl9qTIMvcYj3_Oczgv8mtbPNiCo66TT8ZKwBTx-4fqQhlV2er69GKoaaCD&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl9qTIMvcYj3_Oczgv8mtbPNiCo66TT8ZKwBTx-4fqQhlV2er69GKoaaCD&s=10"
      }
    ],
    sizes: ["8 Inch"],
    description: "Capture the divine energy and balance of cosmic creation with this magnificent pure brass Shiva Nataraja statue. Masterfully hand-cast with the arch of flames, damru, and crushing of illusion, this sculpture brings positive spiritual vibrations and traditional beauty to any prayer room or living altar.",
    features: [
      "Authentic South Indian lost-wax cast design",
      "Heavyweight brass sculpture with stable pedestaled base",
      "Iconic cosmic dance of Lord Shiva with intricate fire arch",
      "Hand-polished golden-antique brass patina",
      "Sacred centerpiece for puja rooms, yoga studios & meditation altars"
    ],
    specifications: {
      "Material": "Solid Pure Brass",
      "Height": "8 Inches (20 cm)",
      "Weight": "Approx. 850 grams",
      "Finish": "Traditional Lustrous Brass Polish",
      "Occasion": "Daily Prayer, Maha Shivratri, Diwali Gifting",
      "Wash Care": "Wipe with dry microfiber cloth"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items brass statues shiva nataraja idol murti divine crafts mandir spiritual"
  },

  // ==========================================
  // 2. HOME TEMPLE / MANDIR
  // ==========================================
  {
    id: "gmd-pj-tm-001",
    product_id: "gmd-pj-tm-001",
    name: "Solid Teak Finish Wooden Home Temple Mandir with Storage Drawer & Dome",
    title: "Handcrafted Wooden Home Temple Mandir",
    brand: "CraftVatika",
    category: "pooja-items",
    category_name: "Home Temple / Mandir",
    subcategory: "home-temple-mandir",
    childCategory: "home-temple",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2499,
    mrp: 4499,
    discount_percentage: 44,
    stock_quantity: 25,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 140,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://m.media-amazon.com/images/I/71jGjTtjBnL._AC_UF894,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71jGjTtjBnL._AC_UF894,1000_QL80_.jpg"
    ],
    pi_images: [
      {
        image_url: "https://m.media-amazon.com/images/I/71jGjTtjBnL._AC_UF894,1000_QL80_.jpg"
      }
    ],
    sizes: ["Standard"],
    description: "Create a serene sacred sanctuary in your home with this handcrafted wooden home temple mandir. Featuring traditional Shikhar domes, pillared arches, a pull-out diya tray, and a spacious bottom storage drawer for samagri, matchboxes, and prayer books, it fits gracefully on walls or tabletops.",
    features: [
      "Engineered with seasoned treated wood with rich walnut-teak polish",
      "Traditional temple Shikhar dome with auspicious Om carving",
      "Pull-out diya extension shelf prevents ash spilling",
      "Spacious lower drawer keeps puja samagri neatly organized",
      "Wall-mountable and tabletop dual placement design"
    ],
    specifications: {
      "Material": "Seasoned Wood & MDF Altar Board",
      "Dimensions": "18 x 12 x 24 Inches (L x W x H)",
      "Finish": "Smooth Lacquered Teak Finish",
      "Mount Type": "Tabletop / Wall Hanging Mountable",
      "Compartments": "1 Main Sanctum + 1 Diya Tray + 1 Storage Drawer"
    },
    delivery_info: {
      estimated_days: 4,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items home temple mandir wooden mandir prayer temple altar craftvatika"
  },
  {
    id: "gmd-pj-md-001",
    product_id: "gmd-pj-md-001",
    name: "Royal Aaradhya Handcrafted Brass Temple Altar Mandir Plate (12-Inch)",
    title: "Brass Aaradhya Temple Pooja Altar Mandir Plate (12-Inch)",
    brand: "Gold Gift Ideas",
    category: "pooja-items",
    category_name: "Home Temple / Mandir",
    subcategory: "home-temple-mandir",
    childCategory: "mandir",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1499,
    mrp: 2499,
    discount_percentage: 40,
    stock_quantity: 30,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 98,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://www.goldgiftideas.com/wp-content/uploads/2023/08/12-Inch-Brass-Aaradhya-Pooja-Thali-4.jpg",
    images: [
      "https://www.goldgiftideas.com/wp-content/uploads/2023/08/12-Inch-Brass-Aaradhya-Pooja-Thali-4.jpg"
    ],
    pi_images: [
      {
        image_url: "https://www.goldgiftideas.com/wp-content/uploads/2023/08/12-Inch-Brass-Aaradhya-Pooja-Thali-4.jpg"
      }
    ],
    sizes: ["12 Inch"],
    description: "Elevate your temple sanctum with the Royal Aaradhya 12-inch brass pooja altar plate. Delicately engraved with sacred Gayatri mantra and floral borders, this heavy gauge brass altar base holds diyas, kalash, idols, and chandan bowls securely for morning and evening aartis.",
    features: [
      "12-Inch broad diameter accommodates complete deity offerings",
      "Embossed Gayatri Mantra and auspicious sacred motifs",
      "Pure virgin brass metal with mirror gloss gold finish",
      "Sturdy raised rim prevents ghee and holy water spills",
      "Ideal foundation for daily temple altar rituals"
    ],
    specifications: {
      "Material": "Pure Virgin Brass",
      "Diameter": "12 Inches (30 cm)",
      "Weight": "Approx. 520 grams",
      "Finish": "Glossy Gold Polish with Clear Lacquer",
      "Usage": "Mandir Altar Base, Festival Aartis, Havans"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items mandir altar plate brass aaradhya temple pooja gold gift ideas"
  },

  // ==========================================
  // 3. PUJA THALIS & BELLS
  // ==========================================
  {
    id: "gmd-pj-th-001",
    product_id: "gmd-pj-th-001",
    name: "Antique Gold Plated Floral Embossed Pooja Thali Set with Bowls & Diya (8-Inch)",
    title: "Antique Gold Plated Floral Pooja Thali Set (8-Inch)",
    brand: "Gold Gift Ideas",
    category: "pooja-items",
    category_name: "Puja Thalis & Bells",
    subcategory: "thalis",
    childCategory: "puja-thalis",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 799,
    mrp: 1299,
    discount_percentage: 38,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 175,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.goldgiftideas.com/wp-content/uploads/2026/05/8-Inch-GP-Antique-Flower-Pooja-Thali-Set-1.png",
    images: [
      "https://www.goldgiftideas.com/wp-content/uploads/2026/05/8-Inch-GP-Antique-Flower-Pooja-Thali-Set-1.png"
    ],
    pi_images: [
      {
        image_url: "https://www.goldgiftideas.com/wp-content/uploads/2026/05/8-Inch-GP-Antique-Flower-Pooja-Thali-Set-1.png"
      }
    ],
    sizes: ["8 Inch"],
    description: "Perform your daily rituals with reverence using this 8-Inch antique gold plated floral pooja thali set. Complete with matching haldi-kumkum katoris, a mini brass diya, and agarbatti holder, it is an exquisite presentation for daily home prayers and festive gifting.",
    features: [
      "Complete set: Thali + 2 Katoris + Diya + Agarbatti Stand",
      "Antique floral filigree embossed rim design",
      "Premium gold electroplating with oxidation resistance",
      "Compact 8-inch size fits comfortably in home mandirs",
      "Comes in an elegant velvet gift box presentation"
    ],
    specifications: {
      "Material": "Brass Metal with 24K Gold Electroplating",
      "Diameter": "8 Inches (20 cm)",
      "Set Inclusions": "1 Thali, 2 Bowls, 1 Diya, 1 Incense Stand",
      "Finish": "Antique Gold Luster",
      "Packaging": "Velvet Gift Presentation Box"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items puja thalis thali set gold plated flower thali bells gold gift ideas"
  },
  {
    id: "gmd-pj-bl-001",
    product_id: "gmd-pj-bl-001",
    name: "Traditional Garuda Brass Temple Pooja Ghanti Prayer Bell with Resonant Sound",
    title: "Traditional Garuda Brass Pooja Bell (Ghanti)",
    brand: "Collectible India",
    category: "pooja-items",
    category_name: "Puja Thalis & Bells",
    subcategory: "thalis",
    childCategory: "bells",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 449,
    mrp: 799,
    discount_percentage: 44,
    stock_quantity: 75,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 230,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI4XgWpJN6b_WSn9pX5Rk29uRtKORsbzGN4XTU11vTQRvHz-60m6ciXrEV&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI4XgWpJN6b_WSn9pX5Rk29uRtKORsbzGN4XTU11vTQRvHz-60m6ciXrEV&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI4XgWpJN6b_WSn9pX5Rk29uRtKORsbzGN4XTU11vTQRvHz-60m6ciXrEV&s=10"
      }
    ],
    sizes: ["Standard"],
    description: "Dispel negative energies and invoke divine presence with this traditional brass temple bell (ghanti). Sculpted with the sacred Lord Garuda figure atop the ergonomic handle, its bell-metal composition produces a clear, long-resonating chime that purifies the aura during aarti.",
    features: [
      "Handcrafted from traditional acoustic bell-brass alloy",
      "Crown carved with sacred Garuda / Nandi deity emblem",
      "Produces a pure, sustained and melodious harmonic chime",
      "Ergonomic handle ensures comfortable grip during long aartis",
      "Heavy weighted clapper for consistent acoustic tone"
    ],
    specifications: {
      "Material": "Pure Heavy Brass",
      "Height": "5.5 Inches (14 cm)",
      "Weight": "Approx. 320 grams",
      "Sound Frequency": "High-Resonance Clear Harmonic Chime",
      "Care Instructions": "Wipe with clean cotton cloth after daily use"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items bells ghanti pooja bell brass bell garuda mandir collectible india"
  },

  // ==========================================
  // 4. BRASS & SILVER ITEMS
  // ==========================================
  {
    id: "gmd-pj-bs-001",
    product_id: "gmd-pj-bs-001",
    name: "Pure Handcrafted Traditional Brass Pooja Kalash Lota with Mango Leaf Design",
    title: "Pure Handcrafted Brass Pooja Kalash Lota",
    brand: "Indian Art Villa",
    category: "pooja-items",
    category_name: "Brass & Silver Items",
    subcategory: "brass-silver-pooja-items",
    childCategory: "brass-items",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 549,
    mrp: 899,
    discount_percentage: 39,
    stock_quantity: 55,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 145,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://www.indianartvilla.in/cdn/shop/files/IAV-BR-15-105A_e916b283-24d9-4532-a406-e9efd613610e.jpg?v=1789728966",
    images: [
      "https://www.indianartvilla.in/cdn/shop/files/IAV-BR-15-105A_e916b283-24d9-4532-a406-e9efd613610e.jpg?v=1789728966"
    ],
    pi_images: [
      {
        image_url: "https://www.indianartvilla.in/cdn/shop/files/IAV-BR-15-105A_e916b283-24d9-4532-a406-e9efd613610e.jpg?v=1789728966"
      }
    ],
    sizes: ["500ml"],
    description: "An indispensable sacred vessel for every Hindu ritual, this pure brass kalash lota by Indian Art Villa is crafted for Abhishek, Gangajal offerings, and Kalash Sthapana. Its classic curved silhouette, polished golden luster, and seamless heavy-gauge brass body ensure lifelong durability.",
    features: [
      "Crafted from 100% Food-Safe & Puja-Grade Pure Brass",
      "Essential vessel for Kalash Sthapana, Diwali & Navratri",
      "Mirror-polished exterior with authentic handcrafted base",
      "Holds 500ml of sacred Gangajal or Panchamrit",
      "Durable heavy-gauge construction resistant to dents"
    ],
    specifications: {
      "Material": "Heavy-Gauge Solid Brass",
      "Capacity": "500 ml",
      "Height": "4.5 Inches",
      "Weight": "Approx. 280 grams",
      "Usage": "Abhishek, Jal Arghya, Kalash Sthapana Puja"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items brass kalash lota brass vessels indian art villa mandir abhishek"
  },
  {
    id: "gmd-pj-sl-001",
    product_id: "gmd-pj-sl-001",
    name: "Royal German Silver Plated Pooja Thali & Prayer Vessels Set with Velvet Box",
    title: "German Silver Plated Pooja Thali & Vessels Set",
    brand: "Om Pooja Shop",
    category: "pooja-items",
    category_name: "Brass & Silver Items",
    subcategory: "brass-silver-pooja-items",
    childCategory: "silver-items",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1199,
    mrp: 1999,
    discount_percentage: 40,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 160,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.ompoojashop.com/image/cache/prayer-vessels/thali/german-silver-pooja-thali-set-1-1-1000x1000.jpg",
    images: [
      "https://www.ompoojashop.com/image/cache/prayer-vessels/thali/german-silver-pooja-thali-set-1-1-1000x1000.jpg"
    ],
    pi_images: [
      {
        image_url: "https://www.ompoojashop.com/image/cache/prayer-vessels/thali/german-silver-pooja-thali-set-1-1-1000x1000.jpg"
      }
    ],
    sizes: ["Standard Set"],
    description: "Bring imperial splendour to your festive aartis with this Royal German Silver Plated Pooja Thali Set. Featuring high-polish pure German silver plating over white metal, this heirloom ensemble includes a matching kalash, diya, spoon, and chandan bowls packed in a luxurious red velvet case.",
    features: [
      "Pure German Silver Electroplated over durable alloy",
      "Lustrous mirror chrome silver shine that resists tarnishing",
      "Complete prayer set: Thali, Lota, Diya, Spoon & Bowls",
      "Ideal luxury gift for weddings, housewarmings & Diwali",
      "Housed in a satin-lined protective royal velvet box"
    ],
    specifications: {
      "Material": "German Silver Plating on High-Grade Alloy",
      "Thali Diameter": "9 Inches (23 cm)",
      "Set Contents": "1 Thali, 1 Kalash, 1 Diya, 2 Bowls, 1 Achamani Spoon",
      "Packaging": "Royal Red Velvet Presentation Box",
      "Care Instructions": "Clean gently with silver polish cloth"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items silver items german silver thali set om pooja shop prayer vessels silver diya"
  },

  // ==========================================
  // 5. BRASS DIYAS & DEEPAMS
  // ==========================================
  {
    id: "gmd-pj-dy-001",
    product_id: "gmd-pj-dy-001",
    name: "Traditional Brass Peacock Kuthu Vilakku Samai Standing Diya (12-Inch)",
    title: "Brass Peacock Kuthu Vilakku Standing Diya",
    brand: "Divine Crafts",
    category: "pooja-items",
    category_name: "Brass Diyas & Deepams",
    subcategory: "diyas-lamps",
    childCategory: "diyas-lamps",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 999,
    mrp: 1799,
    discount_percentage: 44,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 195,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh9J-14xBBMkeaobcTaPlX7TYiPrxOQz3NK2kXfR3kgg&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh9J-14xBBMkeaobcTaPlX7TYiPrxOQz3NK2kXfR3kgg&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh9J-14xBBMkeaobcTaPlX7TYiPrxOQz3NK2kXfR3kgg&s"
      }
    ],
    sizes: ["12 Inch"],
    description: "Illuminate your mandir with the auspicious glow of the traditional South Indian Kuthu Vilakku. Crowned with an engraved peacock (Mayil) figurine and five deep wick notches, this standing pillar diya holds ample oil for hours of continuous radiant lighting during prayers and festivities.",
    features: [
      "Classic South Indian Mayil (Peacock) Kuthu Vilakku design",
      "5-wick deep oil reservoir allows long-lasting illumination",
      "Detachable screw-fit pieces for effortless cleaning & storage",
      "Heavy weighted round base prevents accidental tipping",
      "Solid pure brass with rich golden polished luster"
    ],
    specifications: {
      "Material": "Heavy-Cast Solid Brass",
      "Height": "12 Inches (30 cm)",
      "Wick Capacity": "5 Cotton Wicks",
      "Weight": "Approx. 750 grams",
      "Occasion": "Daily Temple Lighting, Karthigai Deepam, Diwali"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items brass diyas deepams kuthu vilakku samai standing diya divine crafts"
  },
  {
    id: "gmd-pj-dy-002",
    product_id: "gmd-pj-dy-002",
    name: "Akhand Brass Aarti Deepam with Heat-Resistant Borosilicate Glass Chimney",
    title: "Akhand Brass Diya with Borosilicate Glass Chimney",
    brand: "Borosil",
    category: "pooja-items",
    category_name: "Brass Diyas & Deepams",
    subcategory: "diyas-lamps",
    childCategory: "diyas-lamps",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 499,
    mrp: 795,
    discount_percentage: 37,
    stock_quantity: 90,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 410,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1F0naVX-eDaZckSDvFqYaDw1vEw5j8x7bBKVJiif1Q&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1F0naVX-eDaZckSDvFqYaDw1vEw5j8x7bBKVJiif1Q&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1F0naVX-eDaZckSDvFqYaDw1vEw5j8x7bBKVJiif1Q&s=10"
      }
    ],
    sizes: ["Medium"],
    description: "Ensure your holy flame burns uninterrupted even under fans or open windows with this Akhand Brass Diya by Borosil. Made with pure brass and a thermal shock-resistant borosilicate glass chimney, it burns up to 8 hours safely without heating up the surrounding altar surface.",
    features: [
      "Thermal shock resistant Borosilicate Glass Chimney",
      "Burns for up to 8 continuous hours on a single fill",
      "Safe to use even with ceiling fans switched on",
      "Does not crack or darken under continuous flame heat",
      "Easy screw-off base for refilling oil and replacing wicks"
    ],
    specifications: {
      "Base Material": "Pure Brass",
      "Chimney Material": "100% Thermal Borosilicate Glass",
      "Burn Time": "Up to 8 Hours Continuous Flame",
      "Dimensions": "9.5 x 9.5 x 13 cm",
      "Safety": "Wind-Resistant & Child-Safe Altar Diya"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items brass diyas akhand diya borosil glass chimney deepam oil lamp"
  },
  {
    id: "gmd-pj-dy-003",
    product_id: "gmd-pj-dy-003",
    name: "Traditional Panchmukhi Five-Face Brass Temple Aarti Deepam with Handle",
    title: "Panchmukhi Five-Face Brass Aarti Deepam",
    brand: "Shubhkart",
    category: "pooja-items",
    category_name: "Brass Diyas & Deepams",
    subcategory: "diyas-lamps",
    childCategory: "diyas-lamps",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 399,
    mrp: 699,
    discount_percentage: 43,
    stock_quantity: 65,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 180,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQIG99AhPquKSu45W86m57FWyG4geIovCf7ZHfRHxsQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQIG99AhPquKSu45W86m57FWyG4geIovCf7ZHfRHxsQ&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQIG99AhPquKSu45W86m57FWyG4geIovCf7ZHfRHxsQ&s=10"
      }
    ],
    sizes: ["Standard"],
    description: "Perform sacred morning and evening temple aartis with this authentic Panchmukhi 5-face brass diya. Fitted with an extended insulated brass handle, its five wick notches represent the five primal cosmic elements (Panchatatva) to invoke powerful spiritual blessings.",
    features: [
      "Traditional 5-wick design representing Pancha Bhoota elements",
      "Ergonomic handle protects hands from heat during aarti circles",
      "Solid cast brass retains bright golden shine",
      "Stable pedestal feet keep flame steady when resting on altar",
      "Perfect for daily home puja, sandhya aarti, and temple rituals"
    ],
    specifications: {
      "Material": "Solid Pure Brass",
      "Wick Slots": "5 Flame Notches",
      "Handle Length": "4 Inches",
      "Weight": "Approx. 260 grams",
      "Application": "Morning/Evening Aarti, Diwali, Navratri"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items brass diyas deepams panchmukhi aarti diya shubhkart temple flame"
  },

  // ==========================================
  // 6. INCENSE & FRAGRANCE (AGARBATTI & DHOOP)
  // ==========================================
  {
    id: "gmd-pj-in-001",
    product_id: "gmd-pj-in-001",
    name: "Cycle Pure Chandanam Natural Sandalwood Temple Agarbatti Sticks (Pack of 3)",
    title: "Cycle Pure Chandanam Sandalwood Agarbatti (Pack of 3)",
    brand: "Cycle Pure",
    category: "pooja-items",
    category_name: "Incense & Fragrance",
    subcategory: "incense-fragrance",
    childCategory: "agarbatti",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 199,
    mrp: 299,
    discount_percentage: 33,
    stock_quantity: 130,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 520,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnB4B2oSfZNnesDsD4PcvTSAgvkBjjM9XokG4jgR2Q0w&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnB4B2oSfZNnesDsD4PcvTSAgvkBjjM9XokG4jgR2Q0w&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnB4B2oSfZNnesDsD4PcvTSAgvkBjjM9XokG4jgR2Q0w&s"
      }
    ],
    sizes: ["Pack of 3"],
    description: "Infuse your home with the divine aroma of pure Mysore sandalwood with Cycle Pure Chandanam Incense Sticks. Handcrafted with non-toxic natural wood powders, pure essential oils, and aromatic herbs, each stick burns for 45 minutes to create an atmosphere of tranquility and spiritual focus.",
    features: [
      "Pure Mysore Chandanam (Sandalwood) divine fragrance",
      "Low smoke, zero chemical charcoal, natural bamboo core",
      "Each stick burns steadily for up to 45 minutes",
      "Soothes the mind, eliminates odor, and purifies prayer room",
      "Certified carbon-neutral manufacture by Cycle Pure"
    ],
    specifications: {
      "Pack Inclusions": "3 Boxes (Approx. 210 Sticks Total)",
      "Fragrance": "Mysore Sandalwood (Chandan)",
      "Burn Time": "45 Minutes per stick",
      "Stick Length": "9 Inches",
      "Chemicals": "100% Charcoal-Free & Non-Toxic"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items incense agarbatti chandan sandalwood cycle pure dhoop fragrance"
  },
  {
    id: "gmd-pj-in-002",
    product_id: "gmd-pj-in-002",
    name: "Mangaldeep Pure Guggal & Loban Organic Dhoop Cones (Pack of 2 - 60 Cones)",
    title: "Mangaldeep Pure Guggal & Loban Dhoop Cones",
    brand: "Mangaldeep",
    category: "pooja-items",
    category_name: "Incense & Fragrance",
    subcategory: "incense-fragrance",
    childCategory: "dhoop-cones",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 179,
    mrp: 260,
    discount_percentage: 31,
    stock_quantity: 110,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 340,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZt5okJcnbYCYVdrUTE_bMqv-Lk-nqUqux2HHmnIWjFA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZt5okJcnbYCYVdrUTE_bMqv-Lk-nqUqux2HHmnIWjFA&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZt5okJcnbYCYVdrUTE_bMqv-Lk-nqUqux2HHmnIWjFA&s=10"
      }
    ],
    sizes: ["Pack of 2"],
    description: "Cleanse your living space of negative energy with Mangaldeep Guggal & Loban Dhoop Cones. Blended with authentic tree resins, sacred havan herbs, and pure ghee, these slow-burning cones produce fragrant sanctifying smoke reminiscent of ancient temple yagnas.",
    features: [
      "Formulated with natural tree resins of Guggal & Sambrani Loban",
      "Traditional antimicrobial smoke purifies air and wards off negativity",
      "Slow-burning cones deliver rich lasting aroma for over 35 minutes",
      "Includes 2 ceramic cone burner stands inside the box",
      "Charcoal-free clean botanical formulation"
    ],
    specifications: {
      "Pack Inclusions": "2 Boxes (30 Cones per Box + 2 Burner Plates)",
      "Fragrance": "Sacred Guggal & Frankincense Loban",
      "Burn Time": "Approx. 35 Minutes per cone",
      "Safety": "Natural resin based, no harmful additives"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items dhoop cones mangaldeep guggal loban incense fragrance temple"
  },
  {
    id: "gmd-pj-in-003",
    product_id: "gmd-pj-in-003",
    name: "Zed Black Temple Sambrani Havan Cups with Pure Loban Resin (12 Cups)",
    title: "Zed Black Temple Sambrani Havan Cups (12 Cups)",
    brand: "Zed Black",
    category: "pooja-items",
    category_name: "Incense & Fragrance",
    subcategory: "incense-fragrance",
    childCategory: "sambrani-cups",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 199,
    mrp: 299,
    discount_percentage: 33,
    stock_quantity: 85,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 270,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxvh5SMMxB0TtpofZxJrYRromoKXIal6See4M4ec8HA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxvh5SMMxB0TtpofZxJrYRromoKXIal6See4M4ec8HA&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxvh5SMMxB0TtpofZxJrYRromoKXIal6See4M4ec8HA&s=10"
      }
    ],
    sizes: ["12 Cups"],
    description: "Recreate the divine sanctum aroma of ancient temple havan with Zed Black Sambrani Dhoop Cups. Pre-filled with pure loban, guggul crystals, and sacred wood herbs inside a molded charcoal-free shell, just ignite the rim to enjoy effortless traditional dhoop without burning coals.",
    features: [
      "Ready-to-use self-igniting sambrani dhoop cup design",
      "Loaded with natural fragrant Loban resin and havan herbs",
      "No charcoal stove needed; easy light with a matchstick",
      "Includes a metallic safety plate in every box",
      "Long-lingering sanctified fragrance creates divine peace"
    ],
    specifications: {
      "Pack Inclusions": "12 Pre-filled Sambrani Cups + 1 Metal Burner Plate",
      "Key Ingredients": "Natural Loban, Guggul, Cow Dung Ash, Benzoin Resin",
      "Burn Time": "30-40 Minutes per cup",
      "Occasion": "Daily Sandhya Aarti, Friday Puja, Graha Pravesh"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items sambrani cups dhoop havan cups zed black loban incense fragrance"
  },

  // ==========================================
  // 7. POOJA SAMAGRI & CAMPHOR
  // ==========================================
  {
    id: "gmd-pj-sm-001",
    product_id: "gmd-pj-sm-001",
    name: "Mangalam 100% Pure Organic Bhimseni Camphor Jar for Aarti (250g)",
    title: "Mangalam 100% Pure Bhimseni Camphor (250g)",
    brand: "Mangalam",
    category: "pooja-items",
    category_name: "Pooja Samagri & Camphor",
    subcategory: "pooja-samagri",
    childCategory: "camphor",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 349,
    mrp: 499,
    discount_percentage: 30,
    stock_quantity: 95,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 480,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIHosAYzZUBN3_y1dizwRbGI8X-9gbznMCYfW4k3Znw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIHosAYzZUBN3_y1dizwRbGI8X-9gbznMCYfW4k3Znw&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIHosAYzZUBN3_y1dizwRbGI8X-9gbznMCYfW4k3Znw&s=10"
      }
    ],
    sizes: ["250g"],
    description: "Experience the pure sacred flame with Mangalam 100% Pure Bhimseni Camphor. Naturally derived from the bark of Cinnamomum camphora, these raw unrefined crystals burn completely leaving zero ash, black smoke, or residue, filling your altar with a sublime healing fragrance.",
    features: [
      "100% Pure Organic Raw Bhimseni Kapoor Crystals",
      "Burns completely with clean bright flame; leaves zero ash or soot",
      "Natural pleasant aroma relieves nasal congestion and stress",
      "Repels insects and negative energies naturally",
      "Air-tight safety jar preserves potency and fragrance"
    ],
    specifications: {
      "Purity": "100% Pure Organic Bhimseni Camphor",
      "Net Weight": "250 grams",
      "Residue": "0% Ash, No Black Smoke",
      "Form": "Natural Raw Crystalline Flakes",
      "Usage": "Daily Aarti, Diffusers, Ayurvedic Puja Rituals"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items camphor kapoor bhimseni mangalam samagri aarti pure organic"
  },
  {
    id: "gmd-pj-sm-002",
    product_id: "gmd-pj-sm-002",
    name: "Pure Cow Ghee Pre-Filled Cotton Diya Battis Container (Pack of 100 Wicks)",
    title: "Pure Cow Ghee Pre-Filled Diya Battis (Pack of 100)",
    brand: "Shubhkart",
    category: "pooja-items",
    category_name: "Pooja Samagri & Camphor",
    subcategory: "pooja-samagri",
    childCategory: "ghee-wicks",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 249,
    mrp: 399,
    discount_percentage: 38,
    stock_quantity: 120,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 360,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMx-sMa3nOqotxiAfm64MVTH_PZsM5ZC19K5shuJxVfQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMx-sMa3nOqotxiAfm64MVTH_PZsM5ZC19K5shuJxVfQ&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMx-sMa3nOqotxiAfm64MVTH_PZsM5ZC19K5shuJxVfQ&s=10"
      }
    ],
    sizes: ["Pack of 100"],
    description: "Simplify your daily lighting rituals with Shubhkart Pure Cow Ghee Diya Battis. Made with pure clarified cow ghee and natural cotton wicks with a subtle sandalwood fragrance, each pre-molded batti burns steadily for 30 minutes without dripping oil or messy preparation.",
    features: [
      "Pre-filled with 100% Pure Cow Ghee & aromatic chandan",
      "Convenient ready-to-light wicks save time and prevent oil spills",
      "Each ghee batti burns continuously for 30 minutes",
      "Clean smokeless burning without soot accumulation on diyas",
      "Packaged in a secure stackable plastic container"
    ],
    specifications: {
      "Quantity": "100 Pre-Made Ghee Wicks",
      "Material": "Pure Cow Ghee + Organic Cotton Wicks",
      "Burn Duration": "Approx. 30 Minutes per wick",
      "Fragrance": "Subtle Sacred Chandan",
      "Storage": "Keep in cool dry place away from heat"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items ghee batti cotton wicks shubhkart diya wicks cow ghee samagri"
  },
  {
    id: "gmd-pj-sm-003",
    product_id: "gmd-pj-sm-003",
    name: "Vedic Premium Herbal Havan Samagri Sacred Herbs Pack (500g)",
    title: "Vedic Premium Herbal Havan Samagri Pack (500g)",
    brand: "Patanjali",
    category: "pooja-items",
    category_name: "Pooja Samagri & Camphor",
    subcategory: "pooja-samagri",
    childCategory: "havan-samagri",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 199,
    mrp: 299,
    discount_percentage: 33,
    stock_quantity: 80,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 220,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkG393mb_V5BMmmSB2yhyofFEtmJZHCHLeWSgyXyTYQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkG393mb_V5BMmmSB2yhyofFEtmJZHCHLeWSgyXyTYQ&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkG393mb_V5BMmmSB2yhyofFEtmJZHCHLeWSgyXyTYQ&s"
      }
    ],
    sizes: ["500g"],
    description: "Perform sanctifying Vedic yagnas with Patanjali Herbal Havan Samagri. Formulated with over 36 authentic Ayurvedic medicinal roots, dried flowers, sandalwood, guggal, and sacred herbs, it purifies environmental air and fills your home with sacred Vedic vibrations.",
    features: [
      "Formulated with 36+ Ayurvedic Herbs, Jatamansi, Sugandh Bala & Guggal",
      "Purifies atmospheric air and destroys airborne pathogens during havan",
      "100% natural, chemical-free and moisture-proof packaging",
      "Essential for Griha Pravesh, Havan Kund, Gayatri Yagna & Satyanarayan",
      "Authentic Vedic recipe blended by expert Ayurvedic scholars"
    ],
    specifications: {
      "Net Weight": "500 grams",
      "Ingredients": "36 Sacred Vedic Herbs, Sandalwood Powder, Guggul, Loban",
      "Application": "Havan, Homam, Yagna, Agnihotra Daily Offerings",
      "Safety": "All-natural, non-toxic aromatic herbs"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items havan samagri herbs patanjali yagna homam pooja samagri vedic"
  },

  // ==========================================
  // 8. RUDRAKSHA & SPIRITUAL ITEMS
  // ==========================================
  {
    id: "gmd-pj-rd-001",
    product_id: "gmd-pj-rd-001",
    name: "Original 5 Mukhi Certified Himalayan Rudraksha Jaap Mala (108+1 Beads)",
    title: "Original 5 Mukhi Certified Rudraksha Mala (108+1 Beads)",
    brand: "Rudra Centre",
    category: "pooja-items",
    category_name: "Rudraksha & Spiritual Items",
    subcategory: "rudraksha-spiritual",
    childCategory: "rudraksha-mala",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 499,
    mrp: 999,
    discount_percentage: 50,
    stock_quantity: 65,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 310,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMVk49mRgJi26HCefS3fjiMHcoJ3zEsmlkRWw9lPXf1w&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMVk49mRgJi26HCefS3fjiMHcoJ3zEsmlkRWw9lPXf1w&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMVk49mRgJi26HCefS3fjiMHcoJ3zEsmlkRWw9lPXf1w&s=10"
      }
    ],
    sizes: ["108+1 Beads"],
    description: "Deepen your meditation and spiritual connection with this authentic 5 Mukhi certified Himalayan Rudraksha mala. Knotted meticulously with 108 chanting beads and 1 guru bead, it calms the nervous system, normalizes blood pressure, and fosters divine peace during daily mantra japa.",
    features: [
      "100% Genuine 5-Mukhi Nepali Himalayan Rudraksha beads",
      "Traditional 108+1 counting beads hand-knotted with silk thread",
      "Individually energised and certified for spiritual authenticity",
      "Promotes mental clarity, reduces stress, and guards aura",
      "Suitable for chanting Shiva, Gayatri, and Mahamrityunjaya mantras"
    ],
    specifications: {
      "Bead Count": "108 Chanting Beads + 1 Guru Bead",
      "Bead Size": "7 - 8 mm Diameter",
      "Bead Type": "Natural 5-Mukhi Himalayan Rudraksha",
      "Thread": "Reinforced Red Silk Tassel Cord",
      "Certificate": "Includes Lab Purity Certificate of Authenticity"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items rudraksha mala jaap mala spiritual rudra centre 5 mukhi himalayan"
  },
  {
    id: "gmd-pj-rd-002",
    product_id: "gmd-pj-rd-002",
    name: "Pure Natural Sphatik Crystal Quartz Japa Meditation Mala with Tassel (108 Beads)",
    title: "Natural Sphatik Crystal Quartz Japa Mala (108 Beads)",
    brand: "Divine Spirituals",
    category: "pooja-items",
    category_name: "Rudraksha & Spiritual Items",
    subcategory: "rudraksha-spiritual",
    childCategory: "sphatik-mala",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 599,
    mrp: 1199,
    discount_percentage: 50,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 165,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4Jqsv1R-2QK6WdZM8QBF2hCsKRt6THqdp9dqY5Rp0g&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4Jqsv1R-2QK6WdZM8QBF2hCsKRt6THqdp9dqY5Rp0g&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4Jqsv1R-2QK6WdZM8QBF2hCsKRt6THqdp9dqY5Rp0g&s"
      }
    ],
    sizes: ["108 Beads"],
    description: "Channel cool celestial calm and intellectual focus with this 108-bead natural Sphatik (Clear Quartz) mala. Highly revered for Goddess Lakshmi and Saraswati chanting, its diamond-cut crystal beads maintain a naturally cool temperature that balances body heat and enhances concentration.",
    features: [
      "100% Natural Clear Quartz Sphatik crystal beads",
      "Diamond-faceted cutting captures and reflects positive light",
      "Naturally cooling crystal calms anger and anxiety",
      "Ideal for chanting Lakshmi and Saraswati mantras",
      "Finished with an auspicious red thread knot and tassel"
    ],
    specifications: {
      "Material": "Natural Untreated Sphatik Quartz Crystal",
      "Bead Size": "6 mm Diamond Cut Beads",
      "Count": "108 Beads + 1 Sumeru Crystal",
      "Weight": "Approx. 65 grams",
      "Benefits": "Focus, Prosperity, Body Cooling, Mind Calm"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items sphatik mala crystal quartz spiritual japa mala divine spirituals"
  },
  {
    id: "gmd-pj-rd-003",
    product_id: "gmd-pj-rd-003",
    name: "Pure White Sandalwood Chandan Fragrant Prayer Beads Jaap Mala (108 Beads)",
    title: "Pure Sandalwood Chandan Jaap Mala (108 Beads)",
    brand: "Shubhkart",
    category: "pooja-items",
    category_name: "Rudraksha & Spiritual Items",
    subcategory: "rudraksha-spiritual",
    childCategory: "sandalwood-mala",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 399,
    mrp: 699,
    discount_percentage: 43,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 140,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdjav0c8QfasY9jISj58x0Wt0-xhTMfLeJlg2rKh1a7g&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdjav0c8QfasY9jISj58x0Wt0-xhTMfLeJlg2rKh1a7g&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdjav0c8QfasY9jISj58x0Wt0-xhTMfLeJlg2rKh1a7g&s=10"
      }
    ],
    sizes: ["108 Beads"],
    description: "Indulge your senses in calming therapeutic fragrance during meditation with this authentic white sandalwood (Chandan) prayer mala. Carved from mature fragrant sandalwood timber, each bead releases natural sweet aroma with warmth from finger movements during mantra counts.",
    features: [
      "Carved from genuine fragrant white sandalwood (Safed Chandan)",
      "Emits authentic soothing aroma that naturally calms the senses",
      "Traditional 108 smooth polished chanting beads with guru bead",
      "Gentle skin-friendly texture perfect for daily neck wear or japa",
      "Free from artificial chemical scents or dyes"
    ],
    specifications: {
      "Material": "Pure Mysore White Sandalwood",
      "Bead Count": "108 + 1 Guru Bead",
      "Bead Size": "8 mm Smooth Spheres",
      "Fragrance": "Natural Organic Chandan Fragrance",
      "Packaging": "Velvet Keepsake Pouch"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items chandan mala sandalwood spiritual beads shubhkart jaap mala"
  },
  {
    id: "gmd-pj-rd-004",
    product_id: "gmd-pj-rd-004",
    name: "Sacred Energized Brass Gold-Plated Shree Yantra Altar Plate for Wealth & Harmony",
    title: "Sacred Brass Gold-Plated Shree Yantra Plate (3x3 Inch)",
    brand: "Collectible India",
    category: "pooja-items",
    category_name: "Rudraksha & Spiritual Items",
    subcategory: "rudraksha-spiritual",
    childCategory: "shree-yantra",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 349,
    mrp: 599,
    discount_percentage: 42,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 190,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzBNAe1RFAm6ozQD3vu2ikEQ0SvzVx2Xj4cuO1yhU-g&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzBNAe1RFAm6ozQD3vu2ikEQ0SvzVx2Xj4cuO1yhU-g&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzBNAe1RFAm6ozQD3vu2ikEQ0SvzVx2Xj4cuO1yhU-g&s=10"
      }
    ],
    sizes: ["3x3 Inch"],
    description: "Attract cosmic abundance, financial prosperity, and mental tranquility with the sacred Shree Yantra. Engraved with flawless Vedic sacred geometry on gold-plated heavy brass plate, this revered Yantra of Goddess Tripurasundari acts as a powerful energy vortex in your home altar or cash safe.",
    features: [
      "Authentic Vedic 9 interlocking triangles geometry of Shree Yantra",
      "Solid brass plate electroplated in lustrous 24K gold foil",
      "Brings prosperity, removes Vastu doshas, and aligns chakras",
      "Pre-energized with Vedic rituals and ready for altar placement",
      "Compact size fits easily in wallet, locker, or home temple"
    ],
    specifications: {
      "Material": "Solid Brass with 24K Gold Foil Plating",
      "Dimensions": "3 x 3 Inches (7.5 x 7.5 cm)",
      "Yantra": "Maha Meru Sacred Geometry Shree Yantra",
      "Placement": "East or North-East direction on home altar or cash box"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items shree yantra brass yantra spiritual collectible india vastu wealth"
  },

  // ==========================================
  // 9. FESTIVAL POOJA KITS
  // ==========================================
  {
    id: "gmd-pj-kt-001",
    product_id: "gmd-pj-kt-001",
    name: "Complete Grand Diwali Lakshmi Ganesha Puja Samagri Kit Box (31 Sacred Items)",
    title: "Grand Diwali Lakshmi Ganesha Puja Kit (31 Items)",
    brand: "Shubhkart",
    category: "pooja-items",
    category_name: "Festival Pooja Kits",
    subcategory: "festival-pooja-kits",
    childCategory: "festival-pooja-kits",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1499,
    discount_percentage: 40,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 280,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrU2zJEoGprmQFuv9geU9eYtLEw5pvaQyslo6sDb0OfA&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrU2zJEoGprmQFuv9geU9eYtLEw5pvaQyslo6sDb0OfA&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrU2zJEoGprmQFuv9geU9eYtLEw5pvaQyslo6sDb0OfA&s"
      }
    ],
    sizes: ["31 Items Kit"],
    description: "Celebrate Diwali with total devotion and zero stress with this all-in-one Lakshmi Ganesha Grand Puja Kit. Thoughtfully assembled by Vedic pandits with 31 authentic items—including Roli, Akshat, Gangajal, Pure Camphor, Supari, Janeu, Mauli, Attar, Clay Diyas, and a step-by-step Puja Vidhi booklet.",
    features: [
      "Includes 31 essential puja ingredients for complete Diwali aarti",
      "Panchamrit essentials: Gangajal, Honey, Attar, Roli & Chandan",
      "Contains Clay Diyas, Ghee Battis, Camphor & Dhoop Cones",
      "Accompanied by full Step-by-Step Hindi & English Puja Vidhi Book",
      "Hermetically sealed in a festive gift packaging box"
    ],
    specifications: {
      "Total Items": "31 Individually Sealed Puja Essentials",
      "Festival Target": "Diwali, Dhanteras & Lakshmi Ganesha Puja",
      "Inclusions": "Roli, Moli, Gangajal, Camphor, Supari, Janeu, Diyas, Aarti Book",
      "Shelf Life": "24 Months from Packaging"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items festival pooja kits diwali kit lakshmi ganesha shubhkart samagri box"
  },
  {
    id: "gmd-pj-kt-002",
    product_id: "gmd-pj-kt-002",
    name: "Complete Navratri & Satyanarayan Vedic Maha Pooja Samagri Kit Box (25 Items)",
    title: "Navratri & Satyanarayan Maha Pooja Kit (25 Items)",
    brand: "Cycle Pure",
    category: "pooja-items",
    category_name: "Festival Pooja Kits",
    subcategory: "festival-pooja-kits",
    childCategory: "festival-pooja-kits",
    department: "pooja-items",
    gender: "unisex",
    section: "pooja-items",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 749,
    mrp: 1199,
    discount_percentage: 38,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 215,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCIc1QxhG33Z5AufJKQGeAalSW5rVc9bh5A-heQtUocw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCIc1QxhG33Z5AufJKQGeAalSW5rVc9bh5A-heQtUocw&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCIc1QxhG33Z5AufJKQGeAalSW5rVc9bh5A-heQtUocw&s=10"
      }
    ],
    sizes: ["25 Items Kit"],
    description: "Perform sacred Navratri Durga Puja or Satyanarayan Katha effortlessly with this curated Vedic Maha Puja Kit by Cycle Pure. Contains 25 pure temple-grade items including sacred red altar cloth, Mata Chunri, Kalava, Haldi Ganth, Supari, Cloves, Cardamom, and aromatic Agarbatti.",
    features: [
      "Curated 25-piece complete kit for Navratri & Satyanarayan rituals",
      "Includes sacred Red Altar Cloth (Aasan) & Mataji Golden Chunri",
      "Pure organic spices: Lavang, Elaichi, Supari & Haldi knots",
      "Cycle Pure quality assurance with sealed fresh ingredients",
      "Bilingual ritual guide makes performing rituals simple and fulfilling"
    ],
    specifications: {
      "Total Items": "25 Sacred Puja Ingredients",
      "Festival Target": "Chaitra/Sharad Navratri, Satyanarayan Katha, Durga Puja",
      "Inclusions": "Chunri, Red Cloth, Kalash Samagri, Camphor, Incense, Puja Manual",
      "Storage": "Sealed moisture-proof kit box"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "pooja items festival pooja kits navratri kit satyanarayan cycle pure durga puja"
  }
];

// Append to frontend/src/data/sampleProducts.js
const sampleProductsPath = path.resolve('frontend/src/data/sampleProducts.js');
let sampleContent = fs.readFileSync(sampleProductsPath, 'utf8');

const existingIds = new Set();
const idRegex = /"id":\s*"([^"]+)"/g;
let match;
while ((match = idRegex.exec(sampleContent)) !== null) {
  existingIds.add(match[1]);
}

const newProductsToAdd = poojaProducts.filter(p => !existingIds.has(p.id));

if (newProductsToAdd.length > 0) {
  const formattedNewProducts = newProductsToAdd.map(p => JSON.stringify(p, null, 2)).join(',\n');
  const lastBracketIndex = sampleContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const updatedContent = sampleContent.slice(0, lastBracketIndex).trimEnd() + ',\n' + formattedNewProducts + '\n];\n';
    fs.writeFileSync(sampleProductsPath, updatedContent, 'utf8');
    console.log(`Added ${newProductsToAdd.length} pooja products to frontend sampleProducts.js`);
  }
} else {
  console.log('All pooja products already exist in frontend sampleProducts.js');
}

// Append to backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  const backendProducts = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
  const backendIds = new Set(backendProducts.map(p => p.id || p.product_id));
  const backendToAdd = poojaProducts.filter(p => !backendIds.has(p.id));
  if (backendToAdd.length > 0) {
    backendProducts.push(...backendToAdd);
    fs.writeFileSync(backendPath, JSON.stringify(backendProducts, null, 2), 'utf8');
    console.log(`Added ${backendToAdd.length} pooja products to backend products.json`);
  } else {
    console.log('All pooja products already exist in backend products.json');
  }
}
