import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newProducts = [
  // ===================== BLOUSES (6 PRODUCTS) =====================
  {
    id: "gmd-wm-bl-001",
    product_id: "gmd-wm-bl-001",
    name: "Zari Woven Maroon Silk Readymade Saree Blouse",
    title: "Zari Woven Silk Saree Blouse",
    brand: "Kala Niketan",
    category: "ethnic-wear",
    category_name: "Blouses",
    subcategory: "blouses",
    childCategory: "blouses",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1299,
    mrp: 2499,
    discount_percentage: 48,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 88,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFKe40V2gjCv_cWAzVSmRWvpTfrRIqvi0ETrWd8NXoQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFKe40V2gjCv_cWAzVSmRWvpTfrRIqvi0ETrWd8NXoQ&s"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFKe40V2gjCv_cWAzVSmRWvpTfrRIqvi0ETrWd8NXoQ&s" }
    ],
    sizes: ["34", "36", "38", "40", "42"],
    description: "Elevate your ethnic ensemble with this impeccably tailored maroon silk readymade saree blouse adorned with delicate golden zari motifs and comfort lining.",
    features: [
      "Pure art silk with breathable soft cotton lining",
      "Traditional elbow-length sleeves with zari border detailing",
      "Back hook-and-eye closure with tie-up latkan dori",
      "Pre-padded cups for a structured elegant fit",
      "Internal 2-inch alteration margins"
    ],
    specifications: {
      "Fabric": "Art Silk & Cotton Lining",
      "Neck Type": "Round Neck",
      "Sleeve Type": "Elbow Sleeve",
      "Padding": "Padded",
      "Occasion": "Festive, Wedding, Party",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women blouses blouse saree blouse zari silk maroon ethnic partywear",
    is_new: true
  },
  {
    id: "gmd-wm-bl-002",
    product_id: "gmd-wm-bl-002",
    name: "Embroidered Sweetheart Neck Designer Gold Blouse",
    title: "Sweetheart Neck Gold Saree Blouse",
    brand: "Gomo Boutique",
    category: "ethnic-wear",
    category_name: "Blouses",
    subcategory: "blouses",
    childCategory: "blouses",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1499,
    mrp: 2999,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 112,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuR9x_fg4XvblrzJHplekysQpTlti7A_pfIUBekieRgg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuR9x_fg4XvblrzJHplekysQpTlti7A_pfIUBekieRgg&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuR9x_fg4XvblrzJHplekysQpTlti7A_pfIUBekieRgg&s=10" }
    ],
    sizes: ["32", "34", "36", "38", "40"],
    description: "Radiate royal charm with this shimmer gold sweetheart neck designer blouse, expertly crafted with hand embroidery to complement Silk and Kanjivaram sarees.",
    features: [
      "Flattering sweetheart front and deep back design",
      "Lustrous gold brocade with intricate threadwork",
      "Lightweight padded bust for smooth silhouette",
      "Skin-friendly pure cotton inner lining"
    ],
    specifications: {
      "Fabric": "Gold Brocade Silk",
      "Neck Type": "Sweetheart Neck",
      "Padding": "Padded",
      "Closure": "Back Hook & Eye",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women blouses blouse sweetheart neck gold embroidered partywear wedding",
    is_new: true
  },
  {
    id: "gmd-wm-bl-003",
    product_id: "gmd-wm-bl-003",
    name: "Handcrafted Maggam Work Velvet Bridal Blouse",
    title: "Maggam Work Velvet Bridal Blouse",
    brand: "Sabyasachi Heritage",
    category: "ethnic-wear",
    category_name: "Blouses",
    subcategory: "blouses",
    childCategory: "blouses",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2199,
    mrp: 4499,
    discount_percentage: 51,
    stock_quantity: 25,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 64,
    is_featured: true,
    is_bestseller: false,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vcB4WMmceiFrvrt58c7mtBcpTxeBtONiuWFMwLh4Cw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vcB4WMmceiFrvrt58c7mtBcpTxeBtONiuWFMwLh4Cw&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vcB4WMmceiFrvrt58c7mtBcpTxeBtONiuWFMwLh4Cw&s=10" }
    ],
    sizes: ["34", "36", "38", "40", "42"],
    description: "Exquisite bridal blouse handcrafted with traditional Maggam aari embroidery on plush velvet. Designed for opulent wedding and bridal saree pairings.",
    features: [
      "Authentic artisanal Maggam and zardozi threadwork",
      "Heavy micro-velvet fabric with rich luster",
      "Premium padded construction with breathable lining"
    ],
    specifications: {
      "Fabric": "Micro Velvet",
      "Neck Type": "U-Neck with Heavy Border",
      "Pattern": "Handcrafted Maggam Work",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women blouses blouse maggam work velvet bridal wedding ethnic",
    is_new: true
  },
  {
    id: "gmd-wm-bl-004",
    product_id: "gmd-wm-bl-004",
    name: "Deep Back Boat Neck Brocade Silk Blouse",
    title: "Boat Neck Brocade Silk Blouse",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Blouses",
    subcategory: "blouses",
    childCategory: "blouses",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 999,
    mrp: 1999,
    discount_percentage: 50,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 73,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzh8U9RuGpHW2KZq9UPlzaIz3KjYa7tU5im3jEej1kNg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzh8U9RuGpHW2KZq9UPlzaIz3KjYa7tU5im3jEej1kNg&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzh8U9RuGpHW2KZq9UPlzaIz3KjYa7tU5im3jEej1kNg&s=10" }
    ],
    sizes: ["32", "34", "36", "38", "40", "42"],
    description: "Classic boat neck brocade blouse featuring traditional floral motifs and a sophisticated deep back cutout. Versatile across party and festive wear.",
    features: [
      "Timeless boat neckline with back keyhole cutout",
      "Rich Banarasi brocade weave",
      "Stitched with comfort padding and soft lining"
    ],
    specifications: {
      "Fabric": "Banarasi Brocade Silk",
      "Neck Type": "Boat Neck",
      "Sleeve Type": "Half Sleeves",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women blouses blouse boat neck brocade silk green traditional",
    is_new: true
  },
  {
    id: "gmd-wm-bl-005",
    product_id: "gmd-wm-bl-005",
    name: "Mirror & Sequin Work Padded Sleeveless Blouse",
    title: "Mirror Work Sleeveless Saree Blouse",
    brand: "Biba",
    category: "ethnic-wear",
    category_name: "Blouses",
    subcategory: "blouses",
    childCategory: "blouses",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1199,
    mrp: 2399,
    discount_percentage: 50,
    stock_quantity: 30,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 59,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmWFfTvBnxbJHgBlo9GT3XTjrw3SCnozcrHphkWJCxQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmWFfTvBnxbJHgBlo9GT3XTjrw3SCnozcrHphkWJCxQ&s"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmWFfTvBnxbJHgBlo9GT3XTjrw3SCnozcrHphkWJCxQ&s" }
    ],
    sizes: ["34", "36", "38", "40"],
    description: "Contemporary sleeveless saree blouse sparkling with authentic real mirror work and tonal sequins. Perfect match for organza and chiffon sarees.",
    features: [
      "Gleaming mirror work with secure lock stitching",
      "Sleeveless cut with neat armhole piping",
      "Supportive padding for effortless party styling"
    ],
    specifications: {
      "Fabric": "Georgette with Mirror Work",
      "Neck Type": "V-Neck",
      "Sleeve Type": "Sleeveless",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women blouses blouse mirror work sequin sleeveless modern ethnic",
    is_new: true
  },
  {
    id: "gmd-wm-bl-006",
    product_id: "gmd-wm-bl-006",
    name: "Princess Cut Contemporary Cotton Silk Blouse",
    title: "Princess Cut Cotton Silk Blouse",
    brand: "W for Woman",
    category: "ethnic-wear",
    category_name: "Blouses",
    subcategory: "blouses",
    childCategory: "blouses",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1799,
    discount_percentage: 50,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 81,
    is_featured: false,
    is_bestseller: false,
    deal_type: "regular",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPv0Uh3tG0HZMmdVVtzuIHLSas4nudGNIunag7LY1Dg&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPv0Uh3tG0HZMmdVVtzuIHLSas4nudGNIunag7LY1Dg&s"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPv0Uh3tG0HZMmdVVtzuIHLSas4nudGNIunag7LY1Dg&s" }
    ],
    sizes: ["32", "34", "36", "38", "40", "42"],
    description: "Versatile everyday princess-cut blouse in breathable cotton silk blend. Tailored for comfort and everyday grace with cotton, linen, and handloom sarees.",
    features: [
      "Princess seam tailored for a body-contouring fit",
      "Comfortable breathable cotton-silk blend",
      "Front hook-and-eye closure for convenience"
    ],
    specifications: {
      "Fabric": "Cotton Silk",
      "Neck Type": "Round Neck",
      "Sleeve Type": "Short Sleeves",
      "Wash Care": "Gentle Machine Wash"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women blouses blouse princess cut cotton silk daily wear ethnic",
    is_new: true
  },

  // ===================== 1. SILK SAREES (2 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-silk-001",
    product_id: "gmd-wm-sr-silk-001",
    name: "Pure Mulberry Silk Woven Traditional Saree",
    title: "Pure Mulberry Silk Woven Saree",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "silk-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 5999,
    mrp: 11999,
    discount_percentage: 50,
    stock_quantity: 20,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 94,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQRS3lNiR_MXN4PwO7bDrUBxvPuVAFvPl0Z_4TpoFBg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQRS3lNiR_MXN4PwO7bDrUBxvPuVAFvPl0Z_4TpoFBg&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQRS3lNiR_MXN4PwO7bDrUBxvPuVAFvPl0Z_4TpoFBg&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Authentic pure mulberry silk saree woven with fine golden zari motifs along the border and a regal contrast pallu. Includes unstitched blouse piece.",
    features: [
      "100% natural mulberry silk with natural sheen",
      "Traditional woven zari border with paisley motifs",
      "Includes 0.8m matching unstitched blouse piece",
      "Silk Mark certified quality"
    ],
    specifications: {
      "Fabric": "Pure Silk",
      "Length": "5.5m Saree + 0.8m Blouse",
      "Occasion": "Festive, Wedding, Poojas",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees silk sarees silk-sarees ethnic traditional mulberry zari fabindia",
    is_new: true
  },
  {
    id: "gmd-wm-sr-silk-002",
    product_id: "gmd-wm-sr-silk-002",
    name: "Mysore Rich Contrast Border Silk Saree",
    title: "Mysore Rich Border Silk Saree",
    brand: "Heritage Weaves",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "silk-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 4499,
    mrp: 8999,
    discount_percentage: 50,
    stock_quantity: 28,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 67,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_amFDlCjBxMGJZgG5aGONzgISishXb-PEn5LOG35_Q&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_amFDlCjBxMGJZgG5aGONzgISishXb-PEn5LOG35_Q&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_amFDlCjBxMGJZgG5aGONzgISishXb-PEn5LOG35_Q&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Sumptuous Mysore silk saree characterized by its featherlight soft texture and striking contrast zari border. Perfect drape with graceful pleats.",
    features: [
      "Ultra-soft pure Mysore art silk",
      "Contrasting rich woven pallu",
      "Crease-free and easy to drape"
    ],
    specifications: {
      "Fabric": "Mysore Silk",
      "Length": "5.5m Saree + 0.8m Blouse",
      "Occasion": "Festive, Celebrations",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees silk sarees silk-sarees mysore silk ethnic zari contrast border",
    is_new: true
  },

  // ===================== 2. KANJIVARAM SAREES (2 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-kanj-001",
    product_id: "gmd-wm-sr-kanj-001",
    name: "Authentic Kanjivaram Pure Zari Woven Temple Border Saree",
    title: "Kanjivaram Temple Border Saree",
    brand: "Kalanjali",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "kanjivaram-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 8999,
    mrp: 17999,
    discount_percentage: 50,
    stock_quantity: 15,
    in_stock: true,
    is_active: true,
    rating: 5.0,
    reviews_count: 120,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFMhU8Vq06xFvMPy8wIdw3ohCDNQaL78knp4n5GHExVA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFMhU8Vq06xFvMPy8wIdw3ohCDNQaL78knp4n5GHExVA&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFMhU8Vq06xFvMPy8wIdw3ohCDNQaL78knp4n5GHExVA&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Masterpiece heirloom Kanjivaram saree showcasing timeless korvai temple borders and pure gold zari floral butis across radiant silk.",
    features: [
      "Traditional Kanchipuram korvai weaving technique",
      "Pure gold zari temple border and heavy brocade pallu",
      "Heirloom keepsake quality with Silk Mark assurance"
    ],
    specifications: {
      "Fabric": "Pure Kanchipuram Silk",
      "Length": "6.3m (Including Blouse Piece)",
      "Occasion": "Bridal, Muhurtham, Weddings",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees kanjivaram sarees kanjivaram-sarees kancheepuram silk temple border bridal kalanjali",
    is_new: true
  },
  {
    id: "gmd-wm-sr-kanj-002",
    product_id: "gmd-wm-sr-kanj-002",
    name: "Royal Emerald Kanjivaram Gold Brocade Silk Saree",
    title: "Emerald Kanjivaram Brocade Saree",
    brand: "Kalanjali",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "kanjivaram-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 7499,
    mrp: 14999,
    discount_percentage: 50,
    stock_quantity: 18,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 85,
    is_featured: false,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9C-bLyGu93vLfu4isGY6I8fZIrxJNz75Wj0loRgqR5g&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9C-bLyGu93vLfu4isGY6I8fZIrxJNz75Wj0loRgqR5g&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9C-bLyGu93vLfu4isGY6I8fZIrxJNz75Wj0loRgqR5g&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Deep emerald green Kanjivaram silk saree adorned with intricate gold zari brocade, peacock motifs, and a contrasting ruby red pallu.",
    features: [
      "Rich emerald green body with heavy zari jaal",
      "Intricate peacock and floral traditional motifs",
      "Includes designer contrast blouse fabric"
    ],
    specifications: {
      "Fabric": "Kanjivaram Silk",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Weddings & Traditional Occasions",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees kanjivaram sarees kanjivaram-sarees gold brocade royal kancheepuram emerald green",
    is_new: true
  },

  // ===================== 3. BANARASI SAREES (2 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-ban-001",
    product_id: "gmd-wm-sr-ban-001",
    name: "Heritage Banarasi Katan Silk Floral Jaal Saree",
    title: "Banarasi Katan Silk Jaal Saree",
    brand: "Meena Bazaar",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "banarasi-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 6499,
    mrp: 12999,
    discount_percentage: 50,
    stock_quantity: 22,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 91,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9mWmDYC_SjOeU3Eliv_4HQdmHQ9qkyeuzqBxckEEYqw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9mWmDYC_SjOeU3Eliv_4HQdmHQ9qkyeuzqBxckEEYqw&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9mWmDYC_SjOeU3Eliv_4HQdmHQ9qkyeuzqBxckEEYqw&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Classic Varanasi craftsmanship woven on pure Katan silk with all-over intricate gold and silver sona rupa zari floral jaal work.",
    features: [
      "Pure Katan silk handloom weaving",
      "Sona Rupa dual-tone zari jaal pattern",
      "Finished with hand-knotted tassels on pallu"
    ],
    specifications: {
      "Fabric": "Katan Silk",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Weddings, Receptions, Festive Galas",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees banarasi sarees banarasi-sarees katan silk floral jaal zari royal meena bazaar",
    is_new: true
  },
  {
    id: "gmd-wm-sr-ban-002",
    product_id: "gmd-wm-sr-ban-002",
    name: "Vibrant Red Banarasi Brocade Bridal Silk Saree",
    title: "Red Banarasi Brocade Saree",
    brand: "Meena Bazaar",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "banarasi-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 5499,
    mrp: 10999,
    discount_percentage: 50,
    stock_quantity: 26,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 104,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOcWlFHKxZrZYvjpLGYGbm7UrKUjoeZfYbbR8nAwp6Q&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOcWlFHKxZrZYvjpLGYGbm7UrKUjoeZfYbbR8nAwp6Q&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOcWlFHKxZrZYvjpLGYGbm7UrKUjoeZfYbbR8nAwp6Q&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Striking bridal red Banarasi art silk saree illuminated with dense antique zari brocade motifs and traditional kalga paisleys.",
    features: [
      "Rich bridal red with antique gold zari sheen",
      "Heavy dense pallu weaving",
      "Includes matching unstitched blouse piece"
    ],
    specifications: {
      "Fabric": "Banarasi Art Silk",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Bridal, Festive, Pooja",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees banarasi sarees banarasi-sarees bridal red zari rich wedding",
    is_new: true
  },

  // ===================== 4. COTTON SAREES (3 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-cot-001",
    product_id: "gmd-wm-sr-cot-001",
    name: "Chanderi Handloom Pure Soft Cotton Saree",
    title: "Chanderi Pure Soft Cotton Saree",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "cotton-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1899,
    mrp: 3499,
    discount_percentage: 46,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 82,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLincOZxPlXUYx4gXYTu4-k44w-FRNl26aHhLhK3biYQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLincOZxPlXUYx4gXYTu4-k44w-FRNl26aHhLhK3biYQ&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLincOZxPlXUYx4gXYTu4-k44w-FRNl26aHhLhK3biYQ&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Breathable pure handloom Chanderi cotton saree with delicate woven zari border. Offers supreme softness and all-day comfort.",
    features: [
      "100% fine staple cotton yarn",
      "Lightweight, airy, and skin-friendly weave",
      "Subtle gold zari border for refined grace"
    ],
    specifications: {
      "Fabric": "Pure Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Office, Daily Wear, Poojas",
      "Wash Care": "Hand Wash or Gentle Machine Wash"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees cotton sarees cotton-sarees handloom chanderi breathable daily fabindia",
    is_new: true
  },
  {
    id: "gmd-wm-sr-cot-002",
    product_id: "gmd-wm-sr-cot-002",
    name: "Organic Mulmul Printed Hand Block Cotton Saree",
    title: "Organic Mulmul Hand Block Saree",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "cotton-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1499,
    mrp: 2799,
    discount_percentage: 46,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 95,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjZxAJKrorKtY1kNTz_CTcbA-Mad4OgeEKuH7PNz791A&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjZxAJKrorKtY1kNTz_CTcbA-Mad4OgeEKuH7PNz791A&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjZxAJKrorKtY1kNTz_CTcbA-Mad4OgeEKuH7PNz791A&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Cloud-soft organic mulmul cotton saree imprinted with authentic Jaipuri floral block prints in natural botanical dyes.",
    features: [
      "Superfine 100s count mulmul cotton",
      "Authentic artisanal hand block print",
      "Drapes effortlessly with featherweight feel"
    ],
    specifications: {
      "Fabric": "Mulmul Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Casual, Workwear, Summer Gatherings",
      "Wash Care": "Gentle Cold Hand Wash"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees cotton sarees cotton-sarees mulmul hand block jaipur organic",
    is_new: true
  },
  {
    id: "gmd-wm-sr-cot-003",
    product_id: "gmd-wm-sr-cot-003",
    name: "Traditional Chettinad Striped Cotton Saree",
    title: "Chettinad Striped Cotton Saree",
    brand: "Heritage Weaves",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "cotton-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1699,
    mrp: 2999,
    discount_percentage: 43,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 53,
    is_featured: false,
    is_bestseller: false,
    deal_type: "regular",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGJE6Jq-Pezg4MVVk6ITVNGtMrjcjiw8Caoib6f1QUQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGJE6Jq-Pezg4MVVk6ITVNGtMrjcjiw8Caoib6f1QUQ&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGJE6Jq-Pezg4MVVk6ITVNGtMrjcjiw8Caoib6f1QUQ&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Authentic South Indian Chettinad cotton saree with high-contrast borders and earthy yarn-dyed checks, celebrated for crisp structure.",
    features: [
      "Crisp yarn-dyed pure South cotton",
      "Traditional vibrant temple border contrasts",
      "Structured pleating that holds shape all day"
    ],
    specifications: {
      "Fabric": "Chettinad Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Daily Wear, Festivities, Cultural Events",
      "Wash Care": "Hand Wash Separately"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees cotton sarees cotton-sarees chettinad south cotton stripes",
    is_new: true
  },

  // ===================== 5. BRIDAL SAREES (4 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-brd-001",
    product_id: "gmd-wm-sr-brd-001",
    name: "Opulent Crimson Heavy Zari Woven Bridal Saree",
    title: "Crimson Heavy Zari Bridal Saree",
    brand: "Sabyasachi Heritage",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "bridal-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 9999,
    mrp: 19999,
    discount_percentage: 50,
    stock_quantity: 12,
    in_stock: true,
    is_active: true,
    rating: 5.0,
    reviews_count: 140,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJKlVY2atiLIH2YRl1Bj22N0-ZELFaahcIDJTs8SntA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJKlVY2atiLIH2YRl1Bj22N0-ZELFaahcIDJTs8SntA&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJKlVY2atiLIH2YRl1Bj22N0-ZELFaahcIDJTs8SntA&s=10" }
    ],
    sizes: ["Free Size"],
    description: "The quintessential Indian bridal saree in ceremonial crimson red, enriched with heavy metallic zari floral jaal and a dramatic handcrafted pallu.",
    features: [
      "Ceremonial crimson pure silk blend with gold zari",
      "Elaborate heavy bridal border and grand pallu",
      "Comes with designer unstitched blouse piece"
    ],
    specifications: {
      "Fabric": "Pure Silk Blend",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Bridal, Wedding Ceremony",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees bridal sarees bridal-sarees wedding zari heavy bride crimson sabyasachi",
    is_new: true
  },
  {
    id: "gmd-wm-sr-brd-002",
    product_id: "gmd-wm-sr-brd-002",
    name: "Regal Gold Tissue Silk Embellished Bridal Saree",
    title: "Gold Tissue Silk Bridal Saree",
    brand: "Sabyasachi Heritage",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "bridal-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 11499,
    mrp: 22999,
    discount_percentage: 50,
    stock_quantity: 10,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 88,
    is_featured: true,
    is_bestseller: false,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLN-6SPR81PBcSRtc2qXNFMUMnEp70Zg7UP8euCXVJXA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLN-6SPR81PBcSRtc2qXNFMUMnEp70Zg7UP8euCXVJXA&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLN-6SPR81PBcSRtc2qXNFMUMnEp70Zg7UP8euCXVJXA&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Luminescent champagne gold tissue silk bridal drape embellished with delicate cutdana and zardozi borders that shine with regal grandeur under wedding lights.",
    features: [
      "Rare pure gold metallic tissue silk weave",
      "Hand-sewn zardozi and pearl cutdana borders",
      "Ethereal shimmer with flawless fluid drape"
    ],
    specifications: {
      "Fabric": "Gold Tissue Silk",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Bridal, Reception, Sangeet",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees bridal sarees bridal-sarees tissue silk gold wedding royal",
    is_new: true
  },
  {
    id: "gmd-wm-sr-brd-003",
    product_id: "gmd-wm-sr-brd-003",
    name: "Ruby Red Embroidered Velvet Border Bridal Saree",
    title: "Ruby Red Velvet Border Bridal Saree",
    brand: "Gomo Boutique",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "bridal-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 10499,
    mrp: 20999,
    discount_percentage: 50,
    stock_quantity: 14,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 77,
    is_featured: false,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyQhv5_VVaLMgCbO6lzRxCiuXqNakn2GeAQBG3rbsZfw&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyQhv5_VVaLMgCbO6lzRxCiuXqNakn2GeAQBG3rbsZfw&s"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyQhv5_VVaLMgCbO6lzRxCiuXqNakn2GeAQBG3rbsZfw&s" }
    ],
    sizes: ["Free Size"],
    description: "Deep ruby red bridal masterpiece featuring a heavy embroidered velvet scallop border and golden sequin spray work across pure georgette silk.",
    features: [
      "Micro-velvet applique border with heavy embroidery",
      "Lightweight georgette silk body for graceful movement",
      "Rich red bridal aesthetic with contrast velvet blouse fabric"
    ],
    specifications: {
      "Fabric": "Pure Georgette & Velvet Border",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Bridal, Wedding Reception",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees bridal sarees bridal-sarees ruby red velvet border bride",
    is_new: true
  },
  {
    id: "gmd-wm-sr-brd-004",
    product_id: "gmd-wm-sr-brd-004",
    name: "Handcrafted Heritage Zardozi Bridal Saree",
    title: "Handcrafted Zardozi Bridal Saree",
    brand: "Sabyasachi Heritage",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "bridal-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 12999,
    mrp: 25999,
    discount_percentage: 50,
    stock_quantity: 8,
    in_stock: true,
    is_active: true,
    rating: 5.0,
    reviews_count: 98,
    is_featured: true,
    is_bestseller: false,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSexHRfrMRAOYjJ7hPJF-3Xu_BCtmQljZAQtfQPf3_9bQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSexHRfrMRAOYjJ7hPJF-3Xu_BCtmQljZAQtfQPf3_9bQ&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSexHRfrMRAOYjJ7hPJF-3Xu_BCtmQljZAQtfQPf3_9bQ&s=10" }
    ],
    sizes: ["Free Size"],
    description: "An extraordinary heirloom bridal creation lavishly hand-worked with authentic dabka and French knot zardozi embroidery across raw silk.",
    features: [
      "Exquisite hand-done zardozi and dabka craftsmanship",
      "Pure raw silk fabric with substantial royal drape",
      "Museum-grade bridal couture detailing"
    ],
    specifications: {
      "Fabric": "Raw Silk",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Bridal, Grand Wedding Ceremony",
      "Wash Care": "Specialist Dry Clean Only"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees bridal sarees bridal-sarees zardozi handcrafted bride wedding",
    is_new: true
  },

  // ===================== 6. PARTY WEAR SAREES (3 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-pty-001",
    product_id: "gmd-wm-sr-pty-001",
    name: "Cocktail Shimmer Georgette Designer Party Wear Saree",
    title: "Shimmer Georgette Party Wear Saree",
    brand: "Biba",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "party-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 3499,
    mrp: 6999,
    discount_percentage: 50,
    stock_quantity: 32,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 63,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfFgJJtnoTJgXSfKYq7OIt3IPhuk71CsKouyHkyt3Cw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfFgJJtnoTJgXSfKYq7OIt3IPhuk71CsKouyHkyt3Cw&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfFgJJtnoTJgXSfKYq7OIt3IPhuk71CsKouyHkyt3Cw&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Glamorous fluid georgette saree featuring delicate metallic shimmer yarns and a sleek satin border. A showstopper for evening cocktail parties.",
    features: [
      "Ultra-fluid poly georgette with subtle shimmer",
      "Effortless fall that complements every silhouette",
      "Includes satin designer unstitched blouse piece"
    ],
    specifications: {
      "Fabric": "Shimmer Georgette",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Cocktail Parties, Evening Receptions",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees party wear sarees party-wear-sarees shimmer cocktail designer georgette",
    is_new: true
  },
  {
    id: "gmd-wm-sr-pty-002",
    product_id: "gmd-wm-sr-pty-002",
    name: "Sequin Embellished Modern Ready-to-Wear Party Saree",
    title: "Sequin Ready-to-Wear Party Saree",
    brand: "Gomo Boutique",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "party-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 3999,
    mrp: 7999,
    discount_percentage: 50,
    stock_quantity: 28,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 89,
    is_featured: false,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2TZagHAGvGy8NVNivM4Yrma3he8bHaZo6eKJbutnrA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2TZagHAGvGy8NVNivM4Yrma3he8bHaZo6eKJbutnrA&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2TZagHAGvGy8NVNivM4Yrma3he8bHaZo6eKJbutnrA&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Modern party wear saree drenched in tonal micro-sequins with pre-stitched pleating option for effortless 1-minute draping.",
    features: [
      "Dense micro-sequin embroidery on soft net lining",
      "Ready-to-wear pre-draped silhouette option",
      "Includes contemporary padded sleeveless blouse"
    ],
    specifications: {
      "Fabric": "Micro-Sequin on Georgette",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Sangeet, Cocktail, Red Carpet",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees party wear sarees party-wear-sarees sequin ready to wear pre draped",
    is_new: true
  },
  {
    id: "gmd-wm-sr-pty-003",
    product_id: "gmd-wm-sr-pty-003",
    name: "Dual-Tone Metallic Sheen Evening Party Saree",
    title: "Dual-Tone Metallic Evening Saree",
    brand: "Sougat Paul",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "party-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 3299,
    mrp: 6499,
    discount_percentage: 49,
    stock_quantity: 30,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 51,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1avW_j-9Np9Qzv4dgPdPDeM5U6QmO-lPb8ZAi94W0g&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1avW_j-9Np9Qzv4dgPdPDeM5U6QmO-lPb8ZAi94W0g&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1avW_j-9Np9Qzv4dgPdPDeM5U6QmO-lPb8ZAi94W0g&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Avant-garde dual-tone metallic saree with an iridescent finish that shifts color under ambient party lighting. Chic minimalist elegance.",
    features: [
      "Lightweight dual-tone metallic weave",
      "Wrinkle-resistant and featherlight feel",
      "Includes matching unstitched blouse piece"
    ],
    specifications: {
      "Fabric": "Metallic Chiffon",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Nightclub, Evening Reception",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees party wear sarees party-wear-sarees metallic evening cocktail chic",
    is_new: true
  },

  // ===================== 7. WEDDING SAREES (2 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-wed-001",
    product_id: "gmd-wm-sr-wed-001",
    name: "Grand Kalyanam Wedding Silk Saree with Contrast Pallu",
    title: "Kalyanam Wedding Silk Saree",
    brand: "Kalanjali",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "wedding-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 7999,
    mrp: 15999,
    discount_percentage: 50,
    stock_quantity: 18,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 105,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-_WXKi703s7n9R-XdbUDeW3SsnwYcnSAGNB2M4TQsnQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-_WXKi703s7n9R-XdbUDeW3SsnwYcnSAGNB2M4TQsnQ&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-_WXKi703s7n9R-XdbUDeW3SsnwYcnSAGNB2M4TQsnQ&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Designed for grand marriage celebrations and muhurtham ceremonies. Woven with pure zari brocade and auspicious temple designs.",
    features: [
      "Heavy wedding zari weave with temple borders",
      "Traditional auspicious motifs for marriages",
      "Includes matching contrast unstitched blouse"
    ],
    specifications: {
      "Fabric": "Heavy Wedding Silk",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Weddings, Kalyanam, Receptions",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees wedding sarees wedding-sarees kalyanam muhurtham wedding guest",
    is_new: true
  },
  {
    id: "gmd-wm-sr-wed-002",
    product_id: "gmd-wm-sr-wed-002",
    name: "Celebration Brocade Gold Weave Wedding Saree",
    title: "Gold Brocade Wedding Saree",
    brand: "Heritage Weaves",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "wedding-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 6999,
    mrp: 13999,
    discount_percentage: 50,
    stock_quantity: 20,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 83,
    is_featured: false,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTOJ1wedR9o7JQqLdOgeurrTyq9Fg9ffuGedirjeNwbA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTOJ1wedR9o7JQqLdOgeurrTyq9Fg9ffuGedirjeNwbA&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTOJ1wedR9o7JQqLdOgeurrTyq9Fg9ffuGedirjeNwbA&s=10" }
    ],
    sizes: ["Free Size"],
    description: "A celebration of traditional Indian wedding splendor featuring rich gold brocade weaves and floral bel patterns.",
    features: [
      "Intricate all-over gold brocade weaving",
      "Substantial traditional fall and rich drape",
      "Complete with unstitched brocade blouse piece"
    ],
    specifications: {
      "Fabric": "Art Silk Brocade",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Weddings & Festive Receptions",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees wedding sarees wedding-sarees celebration brocade wedding reception",
    is_new: true
  },

  // ===================== 8. FESTIVE WEAR SAREES (3 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-fst-001",
    product_id: "gmd-wm-sr-fst-001",
    name: "Festival Splendor Chanderi Silk Festive Saree",
    title: "Chanderi Silk Festive Saree",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "festive-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2999,
    mrp: 5999,
    discount_percentage: 50,
    stock_quantity: 36,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 74,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxq1VaFRCPMYpyG1XjleCILYQ_kLydNRGKfyrYOyW1w&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxq1VaFRCPMYpyG1XjleCILYQ_kLydNRGKfyrYOyW1w&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxq1VaFRCPMYpyG1XjleCILYQ_kLydNRGKfyrYOyW1w&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Joyous festive Chanderi silk saree designed for Diwali, Navratri, and auspicious family poojas with gleaming gold zari butas.",
    features: [
      "Chanderi silk-cotton blend with subtle natural sheen",
      "Auspicious floral butis with gold foil border",
      "Comfortable for all-day festive rituals"
    ],
    specifications: {
      "Fabric": "Chanderi Silk Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Diwali, Navratri, Festive Poojas",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees festive wear sarees festive-wear-sarees diwali navratri pooja festive fabindia",
    is_new: true
  },
  {
    id: "gmd-wm-sr-fst-002",
    product_id: "gmd-wm-sr-fst-002",
    name: "Gota Patti Border Georgette Festive Saree",
    title: "Gota Patti Georgette Festive Saree",
    brand: "Biba",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "festive-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2499,
    mrp: 4999,
    discount_percentage: 50,
    stock_quantity: 42,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 69,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSyUjWyx4Mtr6n6XPnXf6n3ocPZ7AkSofgfojx3MAVg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSyUjWyx4Mtr6n6XPnXf6n3ocPZ7AkSofgfojx3MAVg&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSyUjWyx4Mtr6n6XPnXf6n3ocPZ7AkSofgfojx3MAVg&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Vibrant festive yellow georgette saree highlighted with traditional Rajasthani gota patti handwork along the scalloped borders.",
    features: [
      "Lightweight georgette with festive scallop gota patti",
      "Bright ceremonial hue perfect for Haldi and Navratri",
      "Soft handfeel and effortless drape"
    ],
    specifications: {
      "Fabric": "Poly Georgette",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Haldi, Festive Occasions, Family Gatherings",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees festive wear sarees festive-wear-sarees gota patti festive yellow auspicious",
    is_new: true
  },
  {
    id: "gmd-wm-sr-fst-003",
    product_id: "gmd-wm-sr-fst-003",
    name: "Bandhani Printed Traditional Festive Saree",
    title: "Bandhani Traditional Festive Saree",
    brand: "Heritage Weaves",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "festive-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2199,
    mrp: 4299,
    discount_percentage: 49,
    stock_quantity: 38,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 58,
    is_featured: false,
    is_bestseller: false,
    deal_type: "regular",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRJy0I6vJFEk8dL0AQQ5eGxWA_dVAOZ1wDX--Zhp1xw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRJy0I6vJFEk8dL0AQQ5eGxWA_dVAOZ1wDX--Zhp1xw&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRJy0I6vJFEk8dL0AQQ5eGxWA_dVAOZ1wDX--Zhp1xw&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Classic Rajasthani tie-and-dye Bandhani saree with traditional dot motifs and gold zari border. Radiates ethnic cultural authenticity.",
    features: [
      "Authentic Gujarati / Rajasthani Bandhej patterns",
      "Rich festive multi-color dots",
      "Finished with matching blouse fabric"
    ],
    specifications: {
      "Fabric": "Art Silk Georgette",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Festive Celebrations, Sangeet",
      "Wash Care": "Hand Wash or Dry Clean"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees festive wear sarees festive-wear-sarees bandhani rajasthani festive ethnic",
    is_new: true
  },

  // ===================== 9. DAILY WEAR SAREES (3 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-dly-001",
    product_id: "gmd-wm-sr-dly-001",
    name: "Soft Linen Cotton Comfortable Daily Wear Saree",
    title: "Soft Linen Cotton Daily Saree",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "daily-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1199,
    mrp: 2199,
    discount_percentage: 45,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 110,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ZUZrigc6KLyAXYE-yWyBC9dYq2r7NAsWGuLQ_fgPvg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ZUZrigc6KLyAXYE-yWyBC9dYq2r7NAsWGuLQ_fgPvg&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ZUZrigc6KLyAXYE-yWyBC9dYq2r7NAsWGuLQ_fgPvg&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Breathable linen cotton daily wear saree engineered for maximum comfort during long workdays, office, and home routines.",
    features: [
      "Pre-washed softened linen cotton fabric",
      "Sweat-absorbent and ultra-comfortable",
      "Subtle minimal border for professional aesthetic"
    ],
    specifications: {
      "Fabric": "Linen Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Daily Wear, Office, Casual",
      "Wash Care": "Machine Wash Cold"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees daily wear sarees daily-wear-sarees linen cotton daily casual office",
    is_new: true
  },
  {
    id: "gmd-wm-sr-dly-002",
    product_id: "gmd-wm-sr-dly-002",
    name: "Floral Georgette Easy Drape Daily Wear Saree",
    title: "Floral Georgette Daily Saree",
    brand: "W for Woman",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "daily-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 999,
    mrp: 1899,
    discount_percentage: 47,
    stock_quantity: 55,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 89,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlePhvc2DQFHDnA7upfpEsyFXDN5MNIGtUdl7-SpaRQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlePhvc2DQFHDnA7upfpEsyFXDN5MNIGtUdl7-SpaRQ&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlePhvc2DQFHDnA7upfpEsyFXDN5MNIGtUdl7-SpaRQ&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Effortless lightweight poly georgette saree featuring charming floral prints. Iron-free and wrinkle-resistant for fast everyday dressing.",
    features: [
      "Non-iron crease-resistant poly georgette",
      "Fresh botanical digital floral print",
      "Easy wash-and-wear daily fabric"
    ],
    specifications: {
      "Fabric": "Poly Georgette",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Daily Wear, Casual Outings",
      "Wash Care": "Machine Washable"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees daily wear sarees daily-wear-sarees floral georgette daily office simple",
    is_new: true
  },
  {
    id: "gmd-wm-sr-dly-003",
    product_id: "gmd-wm-sr-dly-003",
    name: "Everyday Pure Khadi Soft Weave Saree",
    title: "Pure Khadi Soft Weave Saree",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "daily-wear-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1399,
    mrp: 2599,
    discount_percentage: 46,
    stock_quantity: 48,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 72,
    is_featured: false,
    is_bestseller: false,
    deal_type: "regular",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkWt6X2dHhYxHJjlT79TgfqAip4BBuKVA79tgi40LLw&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkWt6X2dHhYxHJjlT79TgfqAip4BBuKVA79tgi40LLw&s"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkWt6X2dHhYxHJjlT79TgfqAip4BBuKVA79tgi40LLw&s" }
    ],
    sizes: ["Free Size"],
    description: "Hand-spun natural khadi cotton saree with subtle rustic texture and earthy warmth. A sustainable and timeless everyday staple.",
    features: [
      "Authentic hand-spun and handwoven khadi",
      "Regulates temperature across summer and winter",
      "Minimalist aesthetic with selvedge border"
    ],
    specifications: {
      "Fabric": "Pure Khadi Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Daily Wear, Workwear, Cultural Gatherings",
      "Wash Care": "Hand Wash with Mild Detergent"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees daily wear sarees daily-wear-sarees khadi soft everyday minimal",
    is_new: true
  },

  // ===================== 10. LIGHTWEIGHT SAREES (2 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-ltw-001",
    product_id: "gmd-wm-sr-ltw-001",
    name: "Featherlight Organza Pastel Shimmer Saree",
    title: "Organza Pastel Shimmer Saree",
    brand: "Biba",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "lightweight-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2799,
    mrp: 5499,
    discount_percentage: 49,
    stock_quantity: 34,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 61,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDY3Wwm8Q6G9i9yQFmPZlPbyoFv5xdN_lh0hAQglfVA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDY3Wwm8Q6G9i9yQFmPZlPbyoFv5xdN_lh0hAQglfVA&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDY3Wwm8Q6G9i9yQFmPZlPbyoFv5xdN_lh0hAQglfVA&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Airy translucent pastel organza saree woven with silver metallic sheen and hand-embroidered floral borders. Weights under 300 grams.",
    features: [
      "Weightless crisp organza silk",
      "Gentle pastel aesthetic with subtle shimmer",
      "Includes satin unstitched blouse fabric"
    ],
    specifications: {
      "Fabric": "Organza Silk",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Day Weddings, Brunches, Festive",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees lightweight sarees lightweight-sarees organza featherlight pastel airy",
    is_new: true
  },
  {
    id: "gmd-wm-sr-ltw-002",
    product_id: "gmd-wm-sr-ltw-002",
    name: "Weightless Chiffon Printed Graceful Saree",
    title: "Weightless Chiffon Printed Saree",
    brand: "Gomo Boutique",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "lightweight-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1999,
    mrp: 3999,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 55,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzOmmLqM-tJwYN1JAU62ZHiZPwJTVnPogNNtRqEnOLiA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzOmmLqM-tJwYN1JAU62ZHiZPwJTVnPogNNtRqEnOLiA&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzOmmLqM-tJwYN1JAU62ZHiZPwJTVnPogNNtRqEnOLiA&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Butter-soft pure chiffon saree that floats gracefully with every step. Ideal for women seeking ultimate lightness without compromising on style.",
    features: [
      "Pure featherweight micro chiffon",
      "Delicate micro-print with lace border",
      "Zero-effort drape that stays in place"
    ],
    specifications: {
      "Fabric": "Pure Chiffon",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Festive Lunches, Casual Parties",
      "Wash Care": "Gentle Hand Wash or Dry Clean"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees lightweight sarees lightweight-sarees chiffon weightless summer easy",
    is_new: true
  },

  // ===================== 11. HANDLOOM SAREES (2 PRODUCTS) =====================
  {
    id: "gmd-wm-sr-hdl-001",
    product_id: "gmd-wm-sr-hdl-001",
    name: "Artisan Handwoven Jamdani Heritage Saree",
    title: "Artisan Jamdani Handloom Saree",
    brand: "Fabindia",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "handloom-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 4299,
    mrp: 8599,
    discount_percentage: 50,
    stock_quantity: 24,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 76,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8yiQj9KZQiYB0zTKBWseE6gDlxr0pjfFS2b6ccyapg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8yiQj9KZQiYB0zTKBWseE6gDlxr0pjfFS2b6ccyapg&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8yiQj9KZQiYB0zTKBWseE6gDlxr0pjfFS2b6ccyapg&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Authentic Bengal Jamdani handloom saree hand-woven by master weavers over 45 days. Features delicate supplementary weft floral motifs floating on fine muslin.",
    features: [
      "UNESCO recognized Jamdani hand-weaving technique",
      "Pure fine handloom cotton muslin",
      "Handloom Mark verified authentic artisan product"
    ],
    specifications: {
      "Fabric": "Fine Handloom Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Festivals, Celebrations, Connoisseur Gatherings",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 4, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees handloom sarees handloom-sarees jamdani artisan handloom authentic fabindia",
    is_new: true
  },
  {
    id: "gmd-wm-sr-hdl-002",
    product_id: "gmd-wm-sr-hdl-002",
    name: "Sambalpuri Ikat Handwoven Cotton Saree",
    title: "Sambalpuri Ikat Handloom Saree",
    brand: "Heritage Weaves",
    category: "ethnic-wear",
    category_name: "Sarees",
    subcategory: "sarees",
    childCategory: "handloom-sarees",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 3699,
    mrp: 7299,
    discount_percentage: 49,
    stock_quantity: 26,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 65,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFTqriVHszTkISMGD5YIEDP3B9qv5JX2MOcIEM4zFU9A&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFTqriVHszTkISMGD5YIEDP3B9qv5JX2MOcIEM4zFU9A&s=10"
    ],
    pi_images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFTqriVHszTkISMGD5YIEDP3B9qv5JX2MOcIEM4zFU9A&s=10" }
    ],
    sizes: ["Free Size"],
    description: "Traditional Odisha Sambalpuri double-ikat handloom saree featuring geometric bandha patterns and shankha (conch) motifs along the traditional border.",
    features: [
      "Traditional Odisha double-ikat tie-dye weave",
      "Pure soft mercerized handloom cotton",
      "Handloom Mark certified authentic craftsmanship"
    ],
    specifications: {
      "Fabric": "Handloom Ikat Cotton",
      "Length": "5.5m + 0.8m Blouse",
      "Occasion": "Festive, Cultural, Handloom Heritage",
      "Wash Care": "Hand Wash Separately"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "women sarees handloom sarees handloom-sarees sambalpuri ikat traditional weave",
    is_new: true
  }
];

// Helper to update products in backend/data/products.json and frontend/src/data/sampleProducts.js
function updateBackendProducts() {
  const backendFile = path.resolve(__dirname, '../backend/data/products.json');
  if (!fs.existsSync(backendFile)) {
    console.error('Backend products file not found at', backendFile);
    return;
  }

  const raw = fs.readFileSync(backendFile, 'utf-8');
  let products = JSON.parse(raw);

  // Update existing products: gmd-wm-sr-002 -> Blouses, gmd-wm-sr-001 -> Sarees
  products = products.map(p => {
    if (p.id === 'gmd-wm-sr-002' || p.product_id === 'gmd-wm-sr-002') {
      return {
        ...p,
        category_name: 'Blouses',
        subcategory: 'blouses',
        childCategory: 'blouses',
        tags: 'women blouses blouse silk sweetheart embroidered padded'
      };
    }
    if (p.id === 'gmd-wm-sr-001' || p.product_id === 'gmd-wm-sr-001') {
      return {
        ...p,
        category_name: 'Sarees',
        subcategory: 'sarees',
        childCategory: 'party-wear-sarees',
        tags: 'women sarees party wear sarees georgette designer sougat paul'
      };
    }
    return p;
  });

  const existingIds = new Set(products.map(p => p.id || p.product_id));
  let addedCount = 0;

  for (const np of newProducts) {
    if (!existingIds.has(np.id)) {
      products.push(np);
      existingIds.add(np.id);
      addedCount++;
    } else {
      // Overwrite/update with latest
      const idx = products.findIndex(p => (p.id || p.product_id) === np.id);
      if (idx !== -1) {
        products[idx] = np;
      }
    }
  }

  fs.writeFileSync(backendFile, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`Backend products updated. Added ${addedCount} new items. Total: ${products.length}`);
}

function updateFrontendProducts() {
  const frontendFile = path.resolve(__dirname, '../frontend/src/data/sampleProducts.js');
  if (!fs.existsSync(frontendFile)) {
    console.error('Frontend sample products file not found at', frontendFile);
    return;
  }

  const raw = fs.readFileSync(frontendFile, 'utf-8');
  
  // Extract JSON array
  const jsonStart = raw.indexOf('[');
  const jsonEnd = raw.lastIndexOf(']');
  if (jsonStart === -1 || jsonEnd === -1) {
    console.error('Failed to parse array in sampleProducts.js');
    return;
  }

  let products = JSON.parse(raw.substring(jsonStart, jsonEnd + 1));

  // Update existing products
  products = products.map(p => {
    if (p.id === 'gmd-wm-sr-002' || p.product_id === 'gmd-wm-sr-002') {
      return {
        ...p,
        category_name: 'Blouses',
        subcategory: 'blouses',
        childCategory: 'blouses',
        tags: 'women blouses blouse silk sweetheart embroidered padded'
      };
    }
    if (p.id === 'gmd-wm-sr-001' || p.product_id === 'gmd-wm-sr-001') {
      return {
        ...p,
        category_name: 'Sarees',
        subcategory: 'sarees',
        childCategory: 'party-wear-sarees',
        tags: 'women sarees party wear sarees georgette designer sougat paul'
      };
    }
    return p;
  });

  const existingIds = new Set(products.map(p => p.id || p.product_id));
  let addedCount = 0;

  for (const np of newProducts) {
    if (!existingIds.has(np.id)) {
      products.push(np);
      existingIds.add(np.id);
      addedCount++;
    } else {
      const idx = products.findIndex(p => (p.id || p.product_id) === np.id);
      if (idx !== -1) {
        products[idx] = np;
      }
    }
  }

  const outputCode = `export const SAMPLE_PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync(frontendFile, outputCode, 'utf-8');
  console.log(`Frontend sample products updated. Added ${addedCount} new items. Total: ${products.length}`);
}

updateBackendProducts();
updateFrontendProducts();
