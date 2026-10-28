import fs from 'fs';
import path from 'path';

export const beautyProducts = [
  // ==========================================
  // 1. FACE CREAMS & MOISTURIZERS
  // ==========================================
  {
    id: "gmd-bt-fc-001",
    product_id: "gmd-bt-fc-001",
    name: "7 Days Natural Vitamin C Glow Face Cream for Radiance & Brightening (50g)",
    title: "7 Days Natural Vitamin C Face Cream for Glowing Skin",
    brand: "7 Days Natural",
    category: "beauty",
    category_name: "Face Creams & Moisturizers",
    subcategory: "face-creams-moisturizers",
    childCategory: "face-creams",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 399,
    mrp: 699,
    discount_percentage: 43,
    stock_quantity: 65,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 184,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://7daysnatural.in/cdn/shop/files/Vitamin_C_Face_Cream_for_Glowing_Skin.jpg",
    images: [
      "https://7daysnatural.in/cdn/shop/files/Vitamin_C_Face_Cream_for_Glowing_Skin.jpg"
    ],
    pi_images: [
      {
        image_url: "https://7daysnatural.in/cdn/shop/files/Vitamin_C_Face_Cream_for_Glowing_Skin.jpg"
      }
    ],
    sizes: ["50g", "100g"],
    description: "Revitalize and illuminate your skin with 7 Days Natural Vitamin C Face Cream. Formulated with pure Vitamin C, Hyaluronic Acid, and botanical extracts, this lightweight cream hydrates deeply, reduces pigmentation, evens tone, and imparts a natural luminous glow suitable for all skin types.",
    features: [
      "Infused with Pure Vitamin C & Hyaluronic Acid",
      "Fades dark spots, sun damage & hyperpigmentation",
      "Lightweight non-greasy formula absorbs quickly",
      "Provides 24-hour long-lasting skin hydration",
      "100% toxin-free, paraben & mineral oil free"
    ],
    specifications: {
      "Formulation": "Lightweight Cream",
      "Skin Type": "All Skin Types, Dull & Uneven Skin",
      "Key Ingredients": "Vitamin C, Hyaluronic Acid, Orange Peel Extract",
      "Net Quantity": "50 g",
      "Application": "Face & Neck (Day & Night Routine)",
      "Safety": "Cruelty-Free, Dermatologically Tested"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty skincare face cream moisturizer vitamin c glowing skin brightening 7 days natural"
  },
  {
    id: "gmd-bt-mz-001",
    product_id: "gmd-bt-mz-001",
    name: "Plum Green Tea Oil-Free Mattifying Daily Face Moisturizer (50ml)",
    title: "Plum Green Tea Mattifying Daily Moisturizer",
    brand: "Plum",
    category: "beauty",
    category_name: "Face Creams & Moisturizers",
    subcategory: "face-creams-moisturizers",
    childCategory: "moisturizers",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 425,
    mrp: 570,
    discount_percentage: 25,
    stock_quantity: 80,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 248,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://plumgoodness.com/cdn/shop/files/Listing_1st_Tile_GT_Mattifying_Moisturizer_1001x1001_px_e7f5ab04-db32-44b8-939e-82f160041f82.webp?v=1782458466&width=1024",
    images: [
      "https://plumgoodness.com/cdn/shop/files/Listing_1st_Tile_GT_Mattifying_Moisturizer_1001x1001_px_e7f5ab04-db32-44b8-939e-82f160041f82.webp?v=1782458466&width=1024"
    ],
    pi_images: [
      {
        image_url: "https://plumgoodness.com/cdn/shop/files/Listing_1st_Tile_GT_Mattifying_Moisturizer_1001x1001_px_e7f5ab04-db32-44b8-939e-82f160041f82.webp?v=1782458466&width=1024"
      }
    ],
    sizes: ["50ml"],
    description: "Keep shine under control while maintaining optimal hydration with Plum Green Tea Mattifying Moisturizer. Specially formulated for oily, acne-prone, and combination skin, it delivers controlled non-comedogenic moisture enriched with green tea extracts and glycolic acid for a clear, soft matte finish.",
    features: [
      "Controlled oil & shine regulation with matte finish",
      "Green Tea antioxidants fight acne-causing bacteria",
      "Glycolic acid gently clears pores & smooths texture",
      "Non-comedogenic, ultra-lightweight gel cream texture",
      "100% Vegan, PETA-certified cruelty free"
    ],
    specifications: {
      "Formulation": "Oil-Free Lightweight Gel Cream",
      "Skin Type": "Oily, Acne-Prone & Combination Skin",
      "Key Ingredients": "Green Tea Extracts, Glycolic Acid",
      "Net Volume": "50 ml",
      "Finish": "Non-greasy Fresh Matte Finish",
      "Free From": "Parabens, Phthalates, SLS"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty skincare moisturizer green tea plum mattifying oil free face cream acne prone"
  },

  // ==========================================
  // 2. FACE WASH & CLEANSERS
  // ==========================================
  {
    id: "gmd-bt-fw-001",
    product_id: "gmd-bt-fw-001",
    name: "Plum Green Tea Pore Cleansing Gentle Exfoliating Face Wash (150ml)",
    title: "Plum Green Tea Pore Cleansing Face Wash",
    brand: "Plum",
    category: "beauty",
    category_name: "Face Wash & Cleansers",
    subcategory: "face-wash-cleansers",
    childCategory: "face-wash",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 345,
    mrp: 495,
    discount_percentage: 30,
    stock_quantity: 95,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 312,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://plumgoodness.com/cdn/shop/files/Listing_1st_Tile_GT_FW_150ml_1001x1001_px.webp?v=1779351297&width=1200",
    images: [
      "https://plumgoodness.com/cdn/shop/files/Listing_1st_Tile_GT_FW_150ml_1001x1001_px.webp?v=1779351297&width=1200"
    ],
    pi_images: [
      {
        image_url: "https://plumgoodness.com/cdn/shop/files/Listing_1st_Tile_GT_FW_150ml_1001x1001_px.webp?v=1779351297&width=1200"
      }
    ],
    sizes: ["75ml", "150ml"],
    description: "Purify pores and banish daily buildup with Plum Green Tea Pore Cleansing Face Wash. Enriched with natural antioxidant green tea extracts and gentle cellulose micro-beads, it washes away dirt, dead cells, and excess sebum without overdrying, leaving your skin clean, fresh, and revitalized.",
    features: [
      "Deep pore unclogging with soft natural cellulose beads",
      "Green tea antioxidants combat acne and blemishes",
      "Gentle foaming formula maintains natural skin moisture",
      "Soap-free cleanser suitable for twice-daily cleansing",
      "100% Vegan & cruelty-free clean beauty"
    ],
    specifications: {
      "Formulation": "Gentle Foaming Gel with Micro-Beads",
      "Skin Type": "Oily, Combination & Acne-Prone Skin",
      "Key Ingredients": "Green Tea, Glycolic Acid, Cellulose Beads",
      "Net Volume": "150 ml",
      "Benefits": "Pore Cleansing, Acne Prevention & Oil Control",
      "Wash Care": "Use twice daily on damp face"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty skincare face wash cleanser plum green tea pore cleansing acne oil control"
  },
  {
    id: "gmd-bt-cl-001",
    product_id: "gmd-bt-cl-001",
    name: "Skin Health & You Ultra Gentle Hydrating Foaming Facial Cleanser (100ml)",
    title: "Skin Health & You Hydrating Facial Cleanser",
    brand: "Skin Health & You",
    category: "beauty",
    category_name: "Face Wash & Cleansers",
    subcategory: "face-wash-cleansers",
    childCategory: "cleansers",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 499,
    mrp: 799,
    discount_percentage: 38,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 142,
    is_featured: false,
    is_bestseller: false,
    deal_type: "regular",
    thumbnail: "https://www.skinhealthandyou.com/cdn/shop/files/1.FoP_Amazon.jpg?v=1769148971&width=1946",
    images: [
      "https://www.skinhealthandyou.com/cdn/shop/files/1.FoP_Amazon.jpg?v=1769148971&width=1946"
    ],
    pi_images: [
      {
        image_url: "https://www.skinhealthandyou.com/cdn/shop/files/1.FoP_Amazon.jpg?v=1769148971&width=1946"
      }
    ],
    sizes: ["100ml"],
    description: "Preserve and restore your delicate skin moisture barrier with Skin Health & You Hydrating Facial Cleanser. Powered by barrier-loving ceramides, calming niacinamide, and essential amino acids, this gentle pH 5.5 balanced cleanser lifts pollutants and makeup without stripping essential natural lipids.",
    features: [
      "Barrier-restoring Ceramides + Niacinamide complex",
      "pH 5.5 balanced formulation respects skin acid mantle",
      "Soothes redness and prevents post-wash dryness or tightness",
      "Safe for sensitive, sensitized, and barrier-compromised skin",
      "Hypoallergenic, fragrance-free & soap-free"
    ],
    specifications: {
      "Formulation": "Hydrating Cream-to-Foam Cleanser",
      "Skin Type": "Dry, Sensitive & Normal Skin",
      "Key Ingredients": "Ceramides, Niacinamide, Hyaluronic Acid, Amino Acids",
      "Net Volume": "100 ml",
      "pH Level": "5.5 Balanced",
      "Dermatologically Tested": "Yes, Safe for Sensitive Skin"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty skincare cleanser face wash skin health gentle hydrating ceramides sensitive"
  },

  // ==========================================
  // 3. SUNSCREEN & SERUMS
  // ==========================================
  {
    id: "gmd-bt-ss-001",
    product_id: "gmd-bt-ss-001",
    name: "Dr. Sheth's Centella & Niacinamide Oil & Sweat Resistant Sunscreen SPF 50+ PA++++ (50g)",
    title: "Dr. Sheth's Centella & Niacinamide Sunscreen SPF 50+",
    brand: "Dr. Sheth's",
    category: "beauty",
    category_name: "Sunscreen & Serums",
    subcategory: "sunscreen-serums",
    childCategory: "sunscreen",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 499,
    mrp: 699,
    discount_percentage: 29,
    stock_quantity: 110,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 420,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.drsheths.com/cdn/shop/files/1_f62072e6-9fda-488b-875f-cec0ad14e38d.jpg?v=1745474968",
    images: [
      "https://www.drsheths.com/cdn/shop/files/1_f62072e6-9fda-488b-875f-cec0ad14e38d.jpg?v=1745474968"
    ],
    pi_images: [
      {
        image_url: "https://www.drsheths.com/cdn/shop/files/1_f62072e6-9fda-488b-875f-cec0ad14e38d.jpg?v=1745474968"
      }
    ],
    sizes: ["50g"],
    description: "Guard against intense UVA/UVB rays and digital blue light with Dr. Sheth's Centella & Niacinamide Sunscreen SPF 50+ PA++++. Formulated specifically for Indian skin tones, this ultralight, sweat-resistant sunscreen absorbs instantly without leaving any white cast or sticky residue.",
    features: [
      "Broad Spectrum SPF 50+ PA++++ UVA/UVB defense",
      "Centella Asiatica (Cica) calms redness and inflammation",
      "1% Niacinamide controls sebum and improves skin texture",
      "Sweat and water-resistant up to 80 minutes",
      "Zero white cast, matte finish suitable under makeup"
    ],
    specifications: {
      "Sun Protection": "SPF 50+ PA++++ Broad Spectrum",
      "Key Ingredients": "Centella Asiatica, 1% Niacinamide, Hyaluronic Acid",
      "Net Weight": "50 g",
      "Finish": "Invisible Matte, Zero White Cast",
      "Water Resistance": "Sweat & Water Resistant (80 mins)",
      "Skin Suitability": "All Skin Types including Sensitive & Acne-Prone"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty skincare sunscreen dr sheths spf 50 niacinamide centella sun protection zero white cast"
  },
  {
    id: "gmd-bt-sr-001",
    product_id: "gmd-bt-sr-001",
    name: "Bare Anatomy Innovist 10% Vitamin C Radiance & Glow Face Serum (10ml)",
    title: "Innovist Vitamin C Radiance Face Serum (10ml)",
    brand: "Bare Anatomy",
    category: "beauty",
    category_name: "Sunscreen & Serums",
    subcategory: "sunscreen-serums",
    childCategory: "serums",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 399,
    mrp: 599,
    discount_percentage: 33,
    stock_quantity: 55,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 195,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://innovist.com/cdn/shop/files/Vitamin_c_serum_10ml.jpg?v=1787219526&width=720",
    images: [
      "https://innovist.com/cdn/shop/files/Vitamin_c_serum_10ml.jpg?v=1787219526&width=720"
    ],
    pi_images: [
      {
        image_url: "https://innovist.com/cdn/shop/files/Vitamin_c_serum_10ml.jpg?v=1787219526&width=720"
      }
    ],
    sizes: ["10ml", "30ml"],
    description: "Fade stubborn dark spots and enhance youthful glow with Bare Anatomy Innovist 10% Vitamin C Face Serum. Formulated with stable 3-O-Ethyl Ascorbic Acid and Ferulic Acid, it boosts collagen synthesis, neutralizes environmental oxidative stress, and reveals visibly clearer, luminous skin.",
    features: [
      "10% Stable Vitamin C + Ferulic Acid antioxidant shield",
      "Clinically proven to reduce dark spots & sun spots",
      "Fast-absorbing water-light texture with zero tackiness",
      "Boosts skin radiance and helps smooth fine lines",
      "Gentle, fragrance-free and dermatologically validated"
    ],
    specifications: {
      "Concentration": "10% Vitamin C + Ferulic Acid",
      "Texture": "Lightweight Fast-Penetrating Liquid",
      "Net Volume": "10 ml",
      "Target Concern": "Dullness, Dark Spots & Uneven Texture",
      "Usage": "3-4 drops morning & evening before moisturizer",
      "Packaging": "UV-protective Dropper Glass Bottle"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty skincare serum vitamin c bare anatomy innovist glow brightening dark spots"
  },

  // ==========================================
  // 4. SHAMPOOS & CONDITIONERS
  // ==========================================
  {
    id: "gmd-bt-sh-001",
    product_id: "gmd-bt-sh-001",
    name: "Nat Habit Castor Blackseed Ayurvedic Hair Fall Control & Density Shampoo (250ml)",
    title: "Nat Habit Castor Blackseed Ayurvedic Hair Shampoo",
    brand: "Nat Habit",
    category: "beauty",
    category_name: "Shampoos & Conditioners",
    subcategory: "shampoo-conditioner",
    childCategory: "shampoo",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 429,
    mrp: 599,
    discount_percentage: 28,
    stock_quantity: 70,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 178,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://nathabit.in/_nat/images/PDP_Castor_blackseed_1_1_d2845283a9.jpg?format=auto&width=1920&quality=75&f=n",
    images: [
      "https://nathabit.in/_nat/images/PDP_Castor_blackseed_1_1_d2845283a9.jpg?format=auto&width=1920&quality=75&f=n"
    ],
    pi_images: [
      {
        image_url: "https://nathabit.in/_nat/images/PDP_Castor_blackseed_1_1_d2845283a9.jpg?format=auto&width=1920&quality=75&f=n"
      }
    ],
    sizes: ["250ml", "400ml"],
    description: "Fortify roots and combat shedding with Nat Habit Fresh Ayurvedic Castor Blackseed Shampoo. Brewed fresh with pure cold-pressed castor oil, kalonji (black seed), shikakai, and amla, it thoroughly clears scalp buildup, nourishes follicles, and promotes thicker, voluminous hair strands.",
    features: [
      "Cold-Pressed Castor Oil + Kalonji root strengthening blend",
      "100% Ayurvedic fresh kitchen formulation",
      "Reduces hair fall, breakage, and seasonal shedding",
      "Restores natural shine and scalp moisture equilibrium",
      "Zero sulphates, zero parabens, zero synthetic silicones"
    ],
    specifications: {
      "Hair Type": "All Hair Types, Hair Fall & Thinning Hair",
      "Key Ingredients": "Castor Oil, Black Seed (Kalonji), Amla, Shikakai",
      "Net Volume": "250 ml",
      "Formulation": "Sulphate-Free Ayurvedic Gentle Cleanser",
      "Cruelty-Free": "Yes, 100% Natural Fresh Ingredients"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty haircare shampoo nat habit castor blackseed ayurvedic hair fall density"
  },
  {
    id: "gmd-bt-cd-001",
    product_id: "gmd-bt-cd-001",
    name: "Moroccanoil Hydrating Moisture Repair Argan Oil Deep Conditioner (250ml)",
    title: "Moroccanoil Moisture Repair Argan Oil Conditioner",
    brand: "Moroccanoil",
    category: "beauty",
    category_name: "Shampoos & Conditioners",
    subcategory: "shampoo-conditioner",
    childCategory: "conditioner",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1250,
    discount_percentage: 28,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 265,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxs9MarwAUNgMwb8Xbzpypzar_jlcNBwxEWmbiQNfFPj9lS6dFQcgV0gc&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxs9MarwAUNgMwb8Xbzpypzar_jlcNBwxEWmbiQNfFPj9lS6dFQcgV0gc&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxs9MarwAUNgMwb8Xbzpypzar_jlcNBwxEWmbiQNfFPj9lS6dFQcgV0gc&s=10"
      }
    ],
    sizes: ["250ml"],
    description: "Rescue dry, damaged, and chemically treated tresses with Moroccanoil Moisture Repair Conditioner. Enriched with antioxidant-rich argan oil, fortifying keratin proteins, and fatty acids, this luxurious formula restores elasticity, seals hair cuticles, and delivers silky smooth detangling.",
    features: [
      "Infused with Pure Moroccan Argan Oil & Keratin Protein",
      "Restores moisture, strength, and hair fiber elasticity",
      "Tames severe frizz, flyaways, and split ends",
      "Color-safe, sulfate-free, and phosphate-free formula",
      "Leaves hair touchably soft with iconic Mediterranean fragrance"
    ],
    specifications: {
      "Hair Type": "Dry, Damaged, Frizzy & Chemically-Treated Hair",
      "Key Ingredients": "Argan Oil, Reconstructive Keratin, Fatty Acids",
      "Net Volume": "250 ml",
      "Color Safe": "Yes, Sulphate, Phosphate & Paraben Free",
      "Usage": "Apply mid-length to ends, leave for 2-3 mins, rinse"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty haircare conditioner moroccanoil argan oil moisture repair damage frizz"
  },

  // ==========================================
  // 5. HAIR OILS & SERUMS
  // ==========================================
  {
    id: "gmd-bt-ho-001",
    product_id: "gmd-bt-ho-001",
    name: "MS Natural Herbal Infused Hair Care & Scalp Nourishment Oil (100ml)",
    title: "MS Natural Herbal Scalp Nourishing Hair Care Oil",
    brand: "MS Natural",
    category: "beauty",
    category_name: "Hair Oils & Serums",
    subcategory: "hair-oils-serums",
    childCategory: "hair-oils",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 349,
    mrp: 499,
    discount_percentage: 30,
    stock_quantity: 85,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 156,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://msnatural.in/wp-content/uploads/2026/04/MS-Natural-Hair-Care-Oil-1.png",
    images: [
      "https://msnatural.in/wp-content/uploads/2026/04/MS-Natural-Hair-Care-Oil-1.png"
    ],
    pi_images: [
      {
        image_url: "https://msnatural.in/wp-content/uploads/2026/04/MS-Natural-Hair-Care-Oil-1.png"
      }
    ],
    sizes: ["100ml", "200ml"],
    description: "Nourish your scalp deep at the roots with MS Natural Herbal Hair Care Oil. Formulated with time-honored Ayurvedic herbs like Bhringraj, Brahmi, Hibiscus, Fenugreek, and cold-pressed sesame oil, it cools the scalp, relieves dandruff, arrests thinning, and promotes luscious glossy growth.",
    features: [
      "Potent infusion of Bhringraj, Brahmi, Hibiscus & Fenugreek",
      "Cold-pressed sesame base ensures non-sticky deep penetration",
      "Stimulates micro-circulation for active follicle activation",
      "Soothes itchy scalp and controls dandruff flakes",
      "100% natural, mineral-oil free, synthetic fragrance free"
    ],
    specifications: {
      "Formulation": "100% Cold-Pressed Herb Infused Oil",
      "Key Ingredients": "Bhringraj, Brahmi, Hibiscus, Fenugreek, Sesame Oil",
      "Net Volume": "100 ml",
      "Hair Benefit": "Root Strengthening, Anti-Dandruff & Scalp Relief",
      "Application": "Gently massage into scalp 2-3 hours before hair wash"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty haircare hair oil ms natural herbal ayurvedic bhringraj scalp care growth"
  },
  {
    id: "gmd-bt-hs-001",
    product_id: "gmd-bt-hs-001",
    name: "Arata Hair Growth Intensive Anti-Hair Fall Scalp Serum (50ml)",
    title: "Arata Hair Growth Intensive Scalp Serum",
    brand: "Arata",
    category: "beauty",
    category_name: "Hair Oils & Serums",
    subcategory: "hair-oils-serums",
    childCategory: "hair-serums",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 599,
    mrp: 899,
    discount_percentage: 33,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 280,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.arata.in/cdn/shop/files/Hair_Growth_Intensive_Serum_Website_Secondaries_Card_3_af68208c-bebe-47ec-b61f-b45a8de3edbc.webp?v=1773663638&width=1080",
    images: [
      "https://www.arata.in/cdn/shop/files/Hair_Growth_Intensive_Serum_Website_Secondaries_Card_3_af68208c-bebe-47ec-b61f-b45a8de3edbc.webp?v=1773663638&width=1080"
    ],
    pi_images: [
      {
        image_url: "https://www.arata.in/cdn/shop/files/Hair_Growth_Intensive_Serum_Website_Secondaries_Card_3_af68208c-bebe-47ec-b61f-b45a8de3edbc.webp?v=1773663638&width=1080"
      }
    ],
    sizes: ["50ml"],
    description: "Reactivate dormant hair follicles with Arata Hair Growth Intensive Scalp Serum. Packed with clinically proven actives including 3% Redensyl, 3% Procapil, 5% Anagain, and copper peptides, this leave-in water-based serum increases hair density and visibly curbs fall without greasiness.",
    features: [
      "Powered by Redensyl, Procapil, Anagain & Copper Peptides",
      "Clinically proven to increase hair density within 60 days",
      "Ultralight water-based leave-in dropper formula",
      "Zero greasiness, does not weigh hair down or require washing",
      "Dermatologically tested, cruelty-free and non-comedogenic"
    ],
    specifications: {
      "Active Actives": "3% Redensyl, 3% Procapil, 5% Anagain, Copper Peptides",
      "Texture": "Ultra-Light Water-Based Scalp Drops",
      "Net Volume": "50 ml",
      "Clinical Efficacy": "Clinically Proven Scalp Follicle Reactivation",
      "Application": "Apply 1-2 ml daily onto clean scalp using dropper"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty haircare hair serum arata hair growth redensyl procapil anti hair fall"
  },

  // ==========================================
  // 6. PERFUMES & DEODORANTS
  // ==========================================
  {
    id: "gmd-bt-pf-001",
    product_id: "gmd-bt-pf-001",
    name: "Majestic Perfume Eau De Parfum Luxury Long-Lasting Fragrance for Men & Women (100ml)",
    title: "Majestic Perfume Luxury Eau De Parfum (100ml)",
    brand: "Majestic Perfume",
    category: "beauty",
    category_name: "Perfumes & Deodorants",
    subcategory: "perfumes-deodorants",
    childCategory: "perfumes",
    department: "beauty",
    gender: "unisex",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 999,
    mrp: 1799,
    discount_percentage: 44,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 215,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://majesticperfume.in/cdn/shop/files/ChatGPT_Image_Jun_27_2026_06_13_25_PM.png?v=1782564950",
    images: [
      "https://majesticperfume.in/cdn/shop/files/ChatGPT_Image_Jun_27_2026_06_13_25_PM.png?v=1782564950"
    ],
    pi_images: [
      {
        image_url: "https://majesticperfume.in/cdn/shop/files/ChatGPT_Image_Jun_27_2026_06_13_25_PM.png?v=1782564950"
      }
    ],
    sizes: ["50ml", "100ml"],
    description: "Immerse in opulent sophistication with Majestic Perfume Eau De Parfum. An artisanal fragrance opening with sparkling Italian bergamot and pink pepper, harmonizing with rich amberwood and damask rose, and settling into a warm foundation of Mysore sandalwood and Madagascar vanilla.",
    features: [
      "Long-lasting Eau De Parfum concentration with 12+ hours wear",
      "Sophisticated unisex scent profile suitable for day & night",
      "Exquisite crystal glass bottle with precision magnetic cap",
      "Crafted with ethically sourced French essential fragrance oils",
      "Hypoallergenic and skin-safe fine perfumery"
    ],
    specifications: {
      "Concentration": "Eau De Parfum (EDP)",
      "Longevity": "12+ Hours Long-Lasting Projection",
      "Top Notes": "Bergamot, Spicy Pink Pepper, Citrus",
      "Heart Notes": "Amberwood, Damask Rose, French Jasmine",
      "Base Notes": "Sandalwood, Madagascar Vanilla, Warm Musk",
      "Net Volume": "100 ml"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty fragrance perfumes majestic perfume edp luxury long lasting unisex"
  },
  {
    id: "gmd-bt-dd-001",
    product_id: "gmd-bt-dd-001",
    name: "Fogg Fresh Active Long-Lasting No-Gas Body Spray Deodorant (150ml)",
    title: "Fogg Fresh Active Long-Lasting Deodorant",
    brand: "Fogg",
    category: "beauty",
    category_name: "Perfumes & Deodorants",
    subcategory: "perfumes-deodorants",
    childCategory: "deodorants",
    department: "beauty",
    gender: "men",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 199,
    mrp: 299,
    discount_percentage: 33,
    stock_quantity: 120,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 540,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5M4qSmxbYEokoHahMiYqBE7S3X5CKdwTDsCwL119aEHQNlQ33RwUJ2xTl&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5M4qSmxbYEokoHahMiYqBE7S3X5CKdwTDsCwL119aEHQNlQ33RwUJ2xTl&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5M4qSmxbYEokoHahMiYqBE7S3X5CKdwTDsCwL119aEHQNlQ33RwUJ2xTl&s=10"
      }
    ],
    sizes: ["150ml"],
    description: "Stay confident and energetically fragrant throughout your day with Fogg Fresh Active No Gas Deodorant. Formulated with 100% perfume liquid and zero propellant gas, every spray delivers a potent burst of clean aquatic notes that provides up to 1000 guaranteed sprays.",
    features: [
      "100% Perfume Liquid with 0% Gas formula",
      "Guarantees up to 1000 sprays per can",
      "24-hour odor protection against sweat & humidity",
      "Invigorating aquatic and citrus fresh scent notes",
      "Compact, travel-ready pressurized aluminium can"
    ],
    specifications: {
      "Type": "No Gas Body Spray Deodorant",
      "Spray Guarantee": "Up to 1000 Sprays",
      "Fragrance Notes": "Crisp Aqua, Zesty Citrus, Warm Woods",
      "Net Volume": "150 ml",
      "Odor Protection": "24-Hour Active Odor Shield"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty fragrance deodorant fogg fresh active no gas body spray men odor protection"
  },

  // ==========================================
  // 7. BODY MISTS & SPRAYS
  // ==========================================
  {
    id: "gmd-bt-bm-001",
    product_id: "gmd-bt-bm-001",
    name: "Plum BodyLovin' Hawaiian Rumba Refreshing Fragrant Body Mist (150ml)",
    title: "Plum BodyLovin' Hawaiian Rumba Body Mist",
    brand: "Plum BodyLovin'",
    category: "beauty",
    category_name: "Body Mists & Sprays",
    subcategory: "body-mists-sprays",
    childCategory: "body-mists",
    department: "beauty",
    gender: "women",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 395,
    mrp: 525,
    discount_percentage: 25,
    stock_quantity: 75,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 380,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://plumgoodness.com/cdn/shop/files/01_cd1253f5-4c88-4cab-8cc4-2cfee0bab0a3.webp?v=1782644147&width=1024",
    images: [
      "https://plumgoodness.com/cdn/shop/files/01_cd1253f5-4c88-4cab-8cc4-2cfee0bab0a3.webp?v=1782644147&width=1024"
    ],
    pi_images: [
      {
        image_url: "https://plumgoodness.com/cdn/shop/files/01_cd1253f5-4c88-4cab-8cc4-2cfee0bab0a3.webp?v=1782644147&width=1024"
      }
    ],
    sizes: ["150ml"],
    description: "Transport yourself straight to a tropical paradise with Plum BodyLovin' Hawaiian Rumba Body Mist. Packed with crisp beach notes, sweet tropical coconut, and intoxicating floral gardenia, this aloe-infused mist refreshes body and mind with every blissful spritz.",
    features: [
      "Breezy tropical cocktail of coconut, passionfruit & ocean breeze",
      "Infused with soothing Aloe Vera juice to pamper skin",
      "Gentle formula, safe to spritz on skin and clothes",
      "Long-lasting fragrance lingers delicately for hours",
      "100% Vegan, cruelty-free, and phthalate-free"
    ],
    specifications: {
      "Fragrance Family": "Tropical Aquatic & Coconut Floral",
      "Net Volume": "150 ml",
      "Skin Infusion": "Soothing Aloe Vera Extracts",
      "Vegan Status": "100% Vegan & Cruelty-Free",
      "Application": "Spritz generously onto neck, wrists & body"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty fragrance body mist plum bodylovin hawaiian rumba tropical mist spray"
  },
  {
    id: "gmd-bt-sp-001",
    product_id: "gmd-bt-sp-001",
    name: "Layer'r Wottagirl Tuscan Green All-Day Refreshing Fragrant Body Spray (135ml)",
    title: "Layer'r Wottagirl Tuscan Green Body Spray",
    brand: "Layer'r Wottagirl",
    category: "beauty",
    category_name: "Body Mists & Sprays",
    subcategory: "body-mists-sprays",
    childCategory: "body-sprays",
    department: "beauty",
    gender: "women",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 219,
    mrp: 299,
    discount_percentage: 27,
    stock_quantity: 90,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 190,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://m.media-amazon.com/images/I/816a1UXs8BL._AC_UF350,350_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/816a1UXs8BL._AC_UF350,350_QL80_.jpg"
    ],
    pi_images: [
      {
        image_url: "https://m.media-amazon.com/images/I/816a1UXs8BL._AC_UF350,350_QL80_.jpg"
      }
    ],
    sizes: ["135ml"],
    description: "Radiate effortless freshness with Layer'r Wottagirl Tuscan Green Body Spray. Featuring crisp green apple, floral blossoms, and musky cedarwood, this uplifting fragrance combats sweat and keeps you smelling captivating from morning work to evening dinners.",
    features: [
      "Crisp green apple, blooming florals & smooth cedar notes",
      "Gentle skin-safe aerosol mist for all-day freshness",
      "Combats sweat odor and keeps you confident",
      "Ideal for everyday office, college, and casual outings",
      "Sleek ergonomic spray canister fits neatly in handbags"
    ],
    specifications: {
      "Fragrance Type": "Daily Perfumed Body Spray",
      "Fragrance Family": "Green Fruity Floral & Soft Musk",
      "Net Volume": "135 ml",
      "Occasion": "Daily Wear, Casual, College & Work",
      "Odor Protection": "All-Day Active Freshness"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty fragrance body spray layerr wottagirl tuscan green floral fresh body mist"
  },

  // ==========================================
  // 8. MEN GROOMING & SHAVING
  // ==========================================
  {
    id: "gmd-bt-mg-001",
    product_id: "gmd-bt-mg-001",
    name: "Beardo Daily Beard Growth & Face Care Complete Grooming Kit for Men",
    title: "Beardo Daily Beard & Face Care Grooming Kit",
    brand: "Beardo",
    category: "beauty",
    category_name: "Men Grooming & Shaving",
    subcategory: "men-grooming-shaving",
    childCategory: "men-grooming",
    department: "beauty",
    gender: "men",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 699,
    mrp: 1199,
    discount_percentage: 42,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 310,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTF12ob3aHI0mDIVhVPFB0RDfBUkNJolue7bzRqRClw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTF12ob3aHI0mDIVhVPFB0RDfBUkNJolue7bzRqRClw&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTF12ob3aHI0mDIVhVPFB0RDfBUkNJolue7bzRqRClw&s=10"
      }
    ],
    sizes: ["Standard Kit"],
    description: "Upgrade your grooming ritual with the Beardo Beard Growth & Face Care Complete Grooming Kit. Carefully assembled with Beard Growth Oil, Godfather Beard Wash, and Deep Cleansing Face Scrub, this all-in-one kit softens coarse facial hair, relieves itch, and stimulates dense beard growth.",
    features: [
      "Complete 3-step routine: Wash, Exfoliate & Stimulate Growth",
      "Redensyl & Argan oil power dense, healthy beard growth",
      "Cleanses deep impurities and eliminates beard dandruff",
      "Non-greasy, pleasant masculine woody fragrance",
      "Perfect gifting set for modern gentlemen"
    ],
    specifications: {
      "Set Inclusions": "Beard Growth Oil (30ml) + Beard Wash (100ml) + Face Scrub (50g)",
      "Key Actives": "Redensyl, Zingiber Root Extract, Argan Oil, Vitamin E",
      "Target Concern": "Patchy Beard Growth, Coarse Hair & Beard Itch",
      "Skin & Beard Type": "All Skin & Beard Types",
      "Safety": "Paraben Free, Cruelty Free"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty grooming men grooming beardo beard care beard oil wash grooming kit shaving"
  },
  {
    id: "gmd-bt-shv-001",
    product_id: "gmd-bt-shv-001",
    name: "Bombay Shaving Company Premium Precision Shaving & Aftershave Care Combo Kit",
    title: "Bombay Shaving Company Precision Shaving Combo",
    brand: "Bombay Shaving Company",
    category: "beauty",
    category_name: "Men Grooming & Shaving",
    subcategory: "men-grooming-shaving",
    childCategory: "shaving",
    department: "beauty",
    gender: "men",
    section: "beauty",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 599,
    mrp: 995,
    discount_percentage: 40,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 275,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.bombayshavingcompany.com/cdn/shop/files/sscombo.webp?v=1755511222&width=533",
    images: [
      "https://www.bombayshavingcompany.com/cdn/shop/files/sscombo.webp?v=1755511222&width=533"
    ],
    pi_images: [
      {
        image_url: "https://www.bombayshavingcompany.com/cdn/shop/files/sscombo.webp?v=1755511222&width=533"
      }
    ],
    sizes: ["Standard Kit"],
    description: "Enjoy a barber-grade, ultra-smooth shave with the Bombay Shaving Company Precision Shaving Combo. Featuring a precision-engineered safety razor, lubricating Shea Butter Shaving Foam, and an alcohol-free soothing Post-Shave Balm, it ensures frictionless gliding and zero razor burn.",
    features: [
      "Precision razor delivers close, effortless strokes with zero tugging",
      "Rich Shea Butter & Tea Tree shaving foam cushions skin",
      "Alcohol-free Post-Shave Balm cools, hydrates & heals micro-cuts",
      "Prevents ingrown hair, redness, razor bumps & skin irritation",
      "Dermatologically tested for daily comfortable grooming"
    ],
    specifications: {
      "Set Inclusions": "Precision Safety Razor + Shaving Foam (200ml) + Post-Shave Balm (100g)",
      "Key Ingredients": "Shea Butter, Aloe Vera, Tea Tree Oil, Witch Hazel",
      "Benefits": "Zero Razor Burn, Deep Hydration & Frictionless Glide",
      "Alcohol-Free": "Yes, Non-Stinging Post-Shave Balm",
      "Suitability": "All Skin Types, even Sensitive Skin"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "beauty grooming shaving bombay shaving company razor shaving foam aftershave men"
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

const newProductsToAdd = beautyProducts.filter(p => !existingIds.has(p.id));

if (newProductsToAdd.length > 0) {
  const formattedNewProducts = newProductsToAdd.map(p => JSON.stringify(p, null, 2)).join(',\n');
  const lastBracketIndex = sampleContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const updatedContent = sampleContent.slice(0, lastBracketIndex).trimEnd() + ',\n' + formattedNewProducts + '\n];\n';
    fs.writeFileSync(sampleProductsPath, updatedContent, 'utf8');
    console.log(`Added ${newProductsToAdd.length} beauty products to frontend sampleProducts.js`);
  }
} else {
  console.log('All beauty products already exist in frontend sampleProducts.js');
}

// Append to backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  const backendProducts = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
  const backendIds = new Set(backendProducts.map(p => p.id || p.product_id));
  const backendToAdd = beautyProducts.filter(p => !backendIds.has(p.id));
  if (backendToAdd.length > 0) {
    backendProducts.push(...backendToAdd);
    fs.writeFileSync(backendPath, JSON.stringify(backendProducts, null, 2), 'utf8');
    console.log(`Added ${backendToAdd.length} beauty products to backend products.json`);
  } else {
    console.log('All beauty products already exist in backend products.json');
  }
}
