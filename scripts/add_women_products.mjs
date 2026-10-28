import fs from 'fs';
import path from 'path';

const womenProducts = [
  // 1. Kurtas & Kurtis
  {
    id: "gmd-wm-kt-001",
    product_id: "gmd-wm-kt-001",
    name: "Cotton Culture Off-White & Black Printed A-Line Kurta",
    title: "Cotton Culture Printed A-Line Kurta",
    brand: "Cotton Culture",
    category: "ethnic-wear",
    category_name: "Kurtas & Kurtis",
    subcategory: "kurtas",
    childCategory: "kurta",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1299,
    mrp: 2499,
    discount_percentage: 48,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 142,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.cottonculture.co.in/cdn/shop/files/cotton-culture-off-white-and-black-printed-a-line-kurta.webp?v=1791032573&width=900",
    images: [
      "https://www.cottonculture.co.in/cdn/shop/files/cotton-culture-off-white-and-black-printed-a-line-kurta.webp?v=1791032573&width=900"
    ],
    pi_images: [
      {
        image_url: "https://www.cottonculture.co.in/cdn/shop/files/cotton-culture-off-white-and-black-printed-a-line-kurta.webp?v=1791032573&width=900"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Embrace effortless elegance with this Cotton Culture off-white and black printed A-line kurta. Crafted from 100% breathable pure cotton, it features delicate geometric prints, a flattering calf-length silhouette, and 3/4 sleeves, making it perfect for everyday ethnic wear and office days.",
    features: [
      "100% Breathable Pure Cotton Fabric",
      "Contemporary Off-White & Black Printed Pattern",
      "Flattering A-Line Cut with Mandarin Notch Neck",
      "Calf length with practical side slits",
      "Gentle machine wash for easy maintenance"
    ],
    specifications: {
      "Fabric": "100% Cotton",
      "Fit": "Regular A-Line Fit",
      "Length": "Calf Length",
      "Neck": "Mandarin V-Notch",
      "Sleeve": "3/4 Sleeves",
      "Occasion": "Daily & Work Wear"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women kurtas cotton culture ethnic printed kurta a-line"
  },
  {
    id: "gmd-wm-kt-002",
    product_id: "gmd-wm-kt-002",
    name: "Apella Neelima Blue Cotton Chikankari Embroidered Kurti",
    title: "Apella Blue Cotton Chikankari Kurti",
    brand: "Apella",
    category: "ethnic-wear",
    category_name: "Kurtas & Kurtis",
    subcategory: "kurtas",
    childCategory: "kurtis",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1499,
    mrp: 2999,
    discount_percentage: 50,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 98,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://www.apella.in/cdn/shop/files/NeelimaBlueCottonChikankariKurta_3.png?v=1789115355&width=533",
    images: [
      "https://www.apella.in/cdn/shop/files/NeelimaBlueCottonChikankariKurta_3.png?v=1789115355&width=533"
    ],
    pi_images: [
      {
        image_url: "https://www.apella.in/cdn/shop/files/NeelimaBlueCottonChikankariKurta_3.png?v=1789115355&width=533"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Experience the timeless artistry of Lucknowi Chikankari with the Apella Neelima Blue Kurti. Detailed with handcrafted thread work along the neckline and hem, this serene blue kurti is an exquisite blend of heritage charm and modern comfort.",
    features: [
      "Intricate handcrafted Lucknowi Chikankari embroidery",
      "Super soft premium slub cotton fabric",
      "Straight cut silhouette with round notch neckline",
      "Breathable and lightweight for tropical weather",
      "Pair with white palazzos or straight trousers"
    ],
    specifications: {
      "Fabric": "Slub Cotton",
      "Fit": "Straight Fit",
      "Work": "Lucknowi Chikankari",
      "Neck": "Round Notch Neck",
      "Sleeve": "Full / 3/4 Sleeve",
      "Occasion": "Festive & Casual Ethnic"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women kurtis chikankari blue ethnic wear apella"
  },

  // 2. Sarees & Blouses
  {
    id: "gmd-wm-sr-001",
    product_id: "gmd-wm-sr-001",
    name: "Sougat Paul Designer Georgette Embellished Pre-Draped Saree",
    title: "Sougat Paul Designer Georgette Saree",
    brand: "Sougat Paul",
    category: "ethnic-wear",
    category_name: "Sarees & Blouses",
    subcategory: "sarees",
    childCategory: "saree",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 4999,
    mrp: 9999,
    discount_percentage: 50,
    stock_quantity: 20,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 76,
    is_featured: true,
    is_bestseller: true,
    deal_type: "premium_deal",
    thumbnail: "https://www.sougatpaul.com/cdn/shop/files/SP4935_1.jpg?v=1757758230&width=2048",
    images: [
      "https://www.sougatpaul.com/cdn/shop/files/SP4935_1.jpg?v=1757758230&width=2048"
    ],
    pi_images: [
      {
        image_url: "https://www.sougatpaul.com/cdn/shop/files/SP4935_1.jpg?v=1757758230&width=2048"
      }
    ],
    sizes: ["Free Size"],
    description: "Make a high-fashion statement at evening galas and wedding receptions with this Sougat Paul designer georgette saree. Adorned with delicate embellishments and a fluid drape, it radiates red-carpet sophistication.",
    features: [
      "High-grade fluid georgette fabric with subtle shimmer",
      "Designer contemporary aesthetic by Sougat Paul",
      "Includes matching unstitched blouse piece",
      "Lightweight, crease-resistant, and graceful fall",
      "Dry clean recommended"
    ],
    specifications: {
      "Fabric": "Poly Georgette",
      "Saree Length": "5.5 Metres",
      "Blouse Piece": "0.8 Metres Included",
      "Pattern": "Designer Embellished",
      "Occasion": "Weddings, Receptions & Parties",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: {
      estimated_days: 4,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women sarees sougat paul designer georgette ethnic partywear"
  },
  {
    id: "gmd-wm-sr-002",
    product_id: "gmd-wm-sr-002",
    name: "Designer Embroidered Sweetheart Neck Padded Silk Blouse",
    title: "Sweetheart Neck Embroidered Silk Blouse",
    brand: "Gomo Boutique",
    category: "ethnic-wear",
    category_name: "Sarees & Blouses",
    subcategory: "sarees",
    childCategory: "blouses",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 999,
    mrp: 1999,
    discount_percentage: 50,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.4,
    reviews_count: 110,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/67c6ec151dd3b7dc5da4e18b/pink-removebg-preview.png",
    images: [
      "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/67c6ec151dd3b7dc5da4e18b/pink-removebg-preview.png"
    ],
    pi_images: [
      {
        image_url: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/67c6ec151dd3b7dc5da4e18b/pink-removebg-preview.png"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Pair your favorite sarees and lehengas with this impeccably tailored sweetheart neck padded silk blouse. Features rich thread embroidery, elbow-length sleeves, and high-quality internal padding for seamless comfort.",
    features: [
      "Pre-padded cups for structured silhouette",
      "Intricate zari and thread embroidery work",
      "Trendy sweetheart neckline with back dori tie-up",
      "Soft cotton inner lining to prevent itchiness",
      "Ample 2-inch margins inside for easy alteration"
    ],
    specifications: {
      "Fabric": "Art Silk with Cotton Lining",
      "Neck": "Sweetheart Neckline",
      "Closure": "Back Hook & Eye with Dori",
      "Padding": "Padded",
      "Sleeve": "Elbow Sleeve",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women blouses saree blouse ethnic silk embroidered pink"
  },

  // 3. Co-ord Sets
  {
    id: "gmd-wm-co-001",
    product_id: "gmd-wm-co-001",
    name: "Urban Chic Floral Print Notch Collar Blazer & Trouser Co-ord Set",
    title: "Floral Blazer & Trouser Co-ord Set",
    brand: "Urban Chic",
    category: "clothing",
    category_name: "Co-ord Sets",
    subcategory: "co-ord-sets",
    childCategory: "co-ord",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1199,
    mrp: 2499,
    discount_percentage: 52,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 88,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDz5caUnmuzOFCTyeR0-rCHuspKfMCJ41KYJ-DQujrSbBKKEuRtZZTbYMD&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDz5caUnmuzOFCTyeR0-rCHuspKfMCJ41KYJ-DQujrSbBKKEuRtZZTbYMD&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDz5caUnmuzOFCTyeR0-rCHuspKfMCJ41KYJ-DQujrSbBKKEuRtZZTbYMD&s=10"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Take the guesswork out of styling with this matching two-piece floral co-ord set. Comprising a relaxed notch collar shirt top and tailored ankle-length trousers, it transitions seamlessly from boardroom brunch to vacation getaways.",
    features: [
      "2-Piece matching set (Top + Pants)",
      "Vibrant high-definition floral print",
      "Soft crepe blend fabric that resists wrinkling",
      "High-rise elasticated waistband trousers",
      "Versatile styling: wear together or mix and match"
    ],
    specifications: {
      "Fabric": "Poly Crepe",
      "Set Type": "Top & Trouser Set",
      "Pattern": "Floral Print",
      "Collar": "Lapel Collar",
      "Occasion": "Resort, Casual & Semi-Formal",
      "Wash Care": "Machine Wash"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women co ord sets floral two piece western trouser set"
  },
  {
    id: "gmd-wm-co-002",
    product_id: "gmd-wm-co-002",
    name: "Breeze Studio Printed Resort Relaxed-Fit 2-Piece Co-ord Set",
    title: "Printed Relaxed-Fit Co-ord Set",
    brand: "Breeze Studio",
    category: "clothing",
    category_name: "Co-ord Sets",
    subcategory: "co-ord-sets",
    childCategory: "co-ord",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1799,
    discount_percentage: 50,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.3,
    reviews_count: 125,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://images.meesho.com/images/products/743976921/i29uy_512.webp?width=512",
    images: [
      "https://images.meesho.com/images/products/743976921/i29uy_512.webp?width=512"
    ],
    pi_images: [
      {
        image_url: "https://images.meesho.com/images/products/743976921/i29uy_512.webp?width=512"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Keep it casual and cozy with this modern printed two-piece co-ord set. Features an airy silhouette, lightweight feel, and vibrant detailing that will keep you cool and stylish throughout the day.",
    features: [
      "Complete 2-piece coordinated outfit",
      "Airy and ultra-breathable fabric",
      "Modern graphic ethnic fusion print",
      "Comfortable relaxed silhouette",
      "Easy machine wash care"
    ],
    specifications: {
      "Fabric": "Rayon Blend",
      "Set Type": "Top & Pants",
      "Fit": "Relaxed Fit",
      "Occasion": "Daily Wear & Travel",
      "Wash Care": "Machine Wash Gentle"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women co ord sets printed rayon matching two piece"
  },

  // 4. Suit Sets & Anarkalis
  {
    id: "gmd-wm-st-001",
    product_id: "gmd-wm-st-001",
    name: "Trendia Royal Embroidered Flared Anarkali Kurta Set with Dupatta",
    title: "Trendia Flared Anarkali Kurta Set",
    brand: "Trendia",
    category: "ethnic-wear",
    category_name: "Suit Sets & Anarkalis",
    subcategory: "kurta-suit-sets",
    childCategory: "anarkalis",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2499,
    mrp: 4999,
    discount_percentage: 50,
    stock_quantity: 30,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 164,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://trendia.co/cdn/shop/products/DSC7632_2_8428eebe-5656-4d45-9703-4cca8fa8b160.jpg?v=1749619023",
    images: [
      "https://trendia.co/cdn/shop/products/DSC7632_2_8428eebe-5656-4d45-9703-4cca8fa8b160.jpg?v=1749619023"
    ],
    pi_images: [
      {
        image_url: "https://trendia.co/cdn/shop/products/DSC7632_2_8428eebe-5656-4d45-9703-4cca8fa8b160.jpg?v=1749619023"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Step into regal glamour with the Trendia Embroidered Anarkali Set. Featuring a wide-flared silhouette, ornate yoke zari work, coordinated churidar/pants, and an ethereal sheer dupatta, it's tailored for festivities and weddings.",
    features: [
      "3-Piece Complete Festive Set: Anarkali Kurta, Pants & Dupatta",
      "Lavish flared hem with golden gotta patti border",
      "Heavy zari and sequin embroidery on yoke",
      "Premium breathable chanderi silk fabric",
      "Comfort fit with back tie-up tassels"
    ],
    specifications: {
      "Fabric": "Chanderi Silk Blend",
      "Set Type": "Kurta, Bottom & Dupatta",
      "Kurta Shape": "Anarkali / Flared",
      "Neck": "Round Neck with Yoke Embroidery",
      "Occasion": "Festive, Wedding & Sangeet",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women anarkalis suit sets trendia festive ethnic embroidery dupatta"
  },
  {
    id: "gmd-wm-st-002",
    product_id: "gmd-wm-st-002",
    name: "DENNISON Women Solid Slim Fit Single-Breasted 2-Piece Formal Trouser Suit",
    title: "DENNISON 2-Piece Formal Trouser Suit",
    brand: "DENNISON",
    category: "ethnic-wear",
    category_name: "Suit Sets & Anarkalis",
    subcategory: "kurta-suit-sets",
    childCategory: "formal-suits",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2999,
    mrp: 5999,
    discount_percentage: 50,
    stock_quantity: 25,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 82,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/23644542/2023/9/11/8867041d-b83e-41b9-95ff-006aac3a0e9e1694436803504DENNISONWomenSolidSlimFitSingleBreasted2-PieceFormalSuit1.jpg",
    images: [
      "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/23644542/2023/9/11/8867041d-b83e-41b9-95ff-006aac3a0e9e1694436803504DENNISONWomenSolidSlimFitSingleBreasted2-PieceFormalSuit1.jpg"
    ],
    pi_images: [
      {
        image_url: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/23644542/2023/9/11/8867041d-b83e-41b9-95ff-006aac3a0e9e1694436803504DENNISONWomenSolidSlimFitSingleBreasted2-PieceFormalSuit1.jpg"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Command attention in professional meetings and corporate events with the DENNISON women's single-breasted power suit. Precision-tailored with structured shoulders, notch lapels, and tapered formal trousers for an authoritative yet feminine look.",
    features: [
      "2-Piece Professional Business Suit (Blazer + Trousers)",
      "Single-breasted front button closure with flap pockets",
      "Sharp tailored slim fit with structured shoulder pads",
      "Premium poly-viscose wrinkle-resistant blend",
      "High-rise straight trousers with concealed fly"
    ],
    specifications: {
      "Fabric": "Poly Viscose Elastane Blend",
      "Fit": "Tailored Slim Fit",
      "Lapel": "Notch Lapel",
      "Pockets": "2 Flap Pockets, 1 Chest Welt",
      "Occasion": "Corporate Formal & Business Meetings",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women suits formal dennison blazer trouser corporate power-suit"
  },

  // 5. Dresses & Gowns
  {
    id: "gmd-wm-dr-001",
    product_id: "gmd-wm-dr-001",
    name: "Aura Studio Elegant Floral A-Line Tiered Midi Western Dress",
    title: "Floral Tiered Midi Western Dress",
    brand: "Aura Studio",
    category: "clothing",
    category_name: "Dresses & Gowns",
    subcategory: "dresses",
    childCategory: "western-dress",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1299,
    mrp: 2599,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 109,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/MARCH/20/EvYhBD6u_0a8f2682b3fd4eeeb0c220ad0aaca648.jpg",
    images: [
      "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/MARCH/20/EvYhBD6u_0a8f2682b3fd4eeeb0c220ad0aaca648.jpg"
    ],
    pi_images: [
      {
        image_url: "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/MARCH/20/EvYhBD6u_0a8f2682b3fd4eeeb0c220ad0aaca648.jpg"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Flow into sun-drenched weekends with this enchanting floral tiered midi dress. Designed with a cinched waist, fluttering sleeves, and a tiered flared hem, it's an irresistible warm-weather wardrobe essential.",
    features: [
      "Tiered flowy silhouette for flattering movement",
      "Romantic botanical floral print",
      "Soft breathable chiffon blend with smooth inner lining",
      "Elasticated smocked waist for flexible sizing",
      "Mid-calf length ideal for casual brunches & dates"
    ],
    specifications: {
      "Fabric": "Georgette Chiffon with Lining",
      "Length": "Midi Length",
      "Shape": "A-Line Tiered",
      "Sleeve": "Flutter Cap Sleeves",
      "Occasion": "Brunch, Vacations & Casual Outings",
      "Wash Care": "Machine Wash Gentle"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women dresses western dress floral midi tiered casual"
  },
  {
    id: "gmd-wm-dr-002",
    product_id: "gmd-wm-dr-002",
    name: "Suvidha Couture Hand-Embellished Floor-Length Evening Gown",
    title: "Suvidha Hand-Embellished Evening Gown",
    brand: "Suvidha Couture",
    category: "clothing",
    category_name: "Dresses & Gowns",
    subcategory: "dresses",
    childCategory: "gowns",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 6499,
    mrp: 12999,
    discount_percentage: 50,
    stock_quantity: 15,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 48,
    is_featured: true,
    is_bestseller: false,
    deal_type: "premium_deal",
    thumbnail: "https://suvidhafashion.com/cdn/shop/files/BRAND_TANEJA_DL_MRP_20490_5_78aa3a72-301e-4bd6-867f-7518a4fbdc98.jpg?v=1768300285&width=500",
    images: [
      "https://suvidhafashion.com/cdn/shop/files/BRAND_TANEJA_DL_MRP_20490_5_78aa3a72-301e-4bd6-867f-7518a4fbdc98.jpg?v=1768300285&width=500"
    ],
    pi_images: [
      {
        image_url: "https://suvidhafashion.com/cdn/shop/files/BRAND_TANEJA_DL_MRP_20490_5_78aa3a72-301e-4bd6-867f-7518a4fbdc98.jpg?v=1768300285&width=500"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Dazzle the room in this Suvidha Couture floor-length gown. Features intricate hand-embroidered sequin and bead accents, structured corsetry styling, and a cascading flared skirt for gala events and grand receptions.",
    features: [
      "Couture hand-embroidered sequin & crystal embellishments",
      "Floor-length dramatic flare with structured silhouette",
      "Padded bust with sweetheart neckline",
      "Concealed back zipper closure",
      "Fully lined with luxury satin"
    ],
    specifications: {
      "Fabric": "Net & Satin Silk",
      "Length": "Floor Length Gown",
      "Silhouette": "Fit & Flare Ballgown",
      "Neck": "Sweetheart Neck",
      "Occasion": "Gala, Red Carpet & Wedding Reception",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: {
      estimated_days: 4,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women gowns suvidha couture evening gown reception partywear"
  },

  // 6. Tops & Shirts
  {
    id: "gmd-wm-tp-001",
    product_id: "gmd-wm-tp-001",
    name: "Urban Glam Puff-Sleeve Ruffled Peplum Crop Top",
    title: "Puff-Sleeve Ruffled Peplum Top",
    brand: "Urban Glam",
    category: "clothing",
    category_name: "Tops & Shirts",
    subcategory: "tops",
    childCategory: "tops",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 599,
    mrp: 1199,
    discount_percentage: 50,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.4,
    reviews_count: 178,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://images.meesho.com/images/products/690323336/zhvr3_512.webp?width=512",
    images: [
      "https://images.meesho.com/images/products/690323336/zhvr3_512.webp?width=512"
    ],
    pi_images: [
      {
        image_url: "https://images.meesho.com/images/products/690323336/zhvr3_512.webp?width=512"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Add a playful romantic touch to your denim pairings with this ruffled peplum top. Featuring voluminous puff sleeves, a flattering square neckline, and subtle gathered waist detailing for an hourglass silhouette.",
    features: [
      "Trendy statement puff sleeves with elastic cuffs",
      "Flattering square neckline and peplum waist",
      "Soft stretchable breathable cotton blend",
      "Easy pair with high-waist jeans or skirts",
      "Machine washable fabric"
    ],
    specifications: {
      "Fabric": "Cotton Lycra Blend",
      "Fit": "Regular Slim Fit",
      "Neck": "Square Neckline",
      "Sleeve": "Puff Sleeves",
      "Occasion": "Casual, College & Date Night",
      "Wash Care": "Machine Wash"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women tops peplum crop top casual western wear"
  },
  {
    id: "gmd-wm-tp-002",
    product_id: "gmd-wm-tp-002",
    name: "Tata CLiQ Luxury Classic Crisp Button-Down Cotton Shirt",
    title: "Classic Crisp Button-Down Cotton Shirt",
    brand: "Tata CLiQ Studio",
    category: "clothing",
    category_name: "Tops & Shirts",
    subcategory: "tops",
    childCategory: "shirts",
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
    reviews_count: 92,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://img.tatacliq.com/images/i32/437Wx649H/MP000000031948695_437Wx649H_202608081953011.jpeg",
    images: [
      "https://img.tatacliq.com/images/i32/437Wx649H/MP000000031948695_437Wx649H_202608081953011.jpeg"
    ],
    pi_images: [
      {
        image_url: "https://img.tatacliq.com/images/i32/437Wx649H/MP000000031948695_437Wx649H_202608081953011.jpeg"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "An indispensable staple in modern workwear, this classic button-down shirt delivers a razor-sharp profile. Crafted from woven 100% poplin cotton, it features a spread collar, buttoned cuffs, and a gently contoured hem.",
    features: [
      "100% Breathable Crisp Poplin Cotton",
      "Spread collar with polished mother-of-pearl finish buttons",
      "Long sleeves with convertible roll-up tab cuffs",
      "Semi-formal contoured hemline for tucked or untucked wear",
      "Resistant to fabric fading & shrinkage"
    ],
    specifications: {
      "Fabric": "100% Poplin Cotton",
      "Fit": "Tailored Regular Fit",
      "Collar": "Spread Collar",
      "Sleeve": "Long Sleeves",
      "Occasion": "Office Formal, Smart Casual & Interviews",
      "Wash Care": "Machine Wash / Warm Iron"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women shirts formal cotton button-down white workwear"
  },

  // 7. Jeans & Jeggings
  {
    id: "gmd-wm-jn-001",
    product_id: "gmd-wm-jn-001",
    name: "Off Duty High-Waist Straight Leg Classic Blue Denim Jeans",
    title: "Off Duty High-Waist Straight Leg Jeans",
    brand: "Off Duty",
    category: "clothing",
    category_name: "Jeans & Jeggings",
    subcategory: "jeans-jeggings",
    childCategory: "jeans",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1499,
    mrp: 2999,
    discount_percentage: 50,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 215,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://offduty.in/cdn/shop/files/IMG_9275.png?v=1768303407",
    images: [
      "https://offduty.in/cdn/shop/files/IMG_9275.png?v=1768303407"
    ],
    pi_images: [
      {
        image_url: "https://offduty.in/cdn/shop/files/IMG_9275.png?v=1768303407"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "The ultimate IT-girl denim. These Off Duty high-rise straight leg jeans provide an elongating fit that hugs the waist while offering relaxed room down the leg. Cut from premium heavyweight cotton denim that molds to your body.",
    features: [
      "Flattering high-rise contour waist",
      "Classic vintage 90s straight leg silhouette",
      "Durable 100% cotton denim with subtle natural give",
      "5-pocket styling with sturdy metallic rivets",
      "Clean hem that pairs easily with heels or sneakers"
    ],
    specifications: {
      "Fabric": "Heavyweight Cotton Denim",
      "Fit": "High-Rise Straight Fit",
      "Rise": "High Rise",
      "Length": "Full Length",
      "Occasion": "Daily Casual & Streetwear",
      "Wash Care": "Machine Wash Cold"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women jeans off duty straight leg denim high waist"
  },
  {
    id: "gmd-wm-jn-002",
    product_id: "gmd-wm-jn-002",
    name: "Go Colors 4-Way Stretch Denim-Look Slim Fit Jeggings",
    title: "Go Colors 4-Way Stretch Jeggings",
    brand: "Go Colors",
    category: "clothing",
    category_name: "Jeans & Jeggings",
    subcategory: "jeans-jeggings",
    childCategory: "jeggings",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 799,
    mrp: 1499,
    discount_percentage: 47,
    stock_quantity: 65,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 340,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://gocolors.com/cdn/shop/files/LJ03-LBLUDN88_4_8a408196-cb64-4cbc-9c3f-04275c2dc715.jpg?v=1784616419",
    images: [
      "https://gocolors.com/cdn/shop/files/LJ03-LBLUDN88_4_8a408196-cb64-4cbc-9c3f-04275c2dc715.jpg?v=1784616419"
    ],
    pi_images: [
      {
        image_url: "https://gocolors.com/cdn/shop/files/LJ03-LBLUDN88_4_8a408196-cb64-4cbc-9c3f-04275c2dc715.jpg?v=1784616419"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Get the authentic look of denim with the unbeatable comfort of leggings. Go Colors denim jeggings feature ultra-soft 4-way stretch fabric, a wide comfortable waistband, and faux pocket styling for unmatched all-day ease.",
    features: [
      "Super flexible 4-way stretch knit denim fabric",
      "Broad elasticated waistband that doesn't dig in",
      "Clean silhouette without bulky buttons or zippers",
      "Functional back pockets with faux front pockets",
      "Shape-retaining yarn prevents sagging at knees"
    ],
    specifications: {
      "Fabric": "Cotton Lycra Poly Blend",
      "Fit": "Slim Fit Jeggings",
      "Rise": "Mid-to-High Rise",
      "Waistband": "Pull-On Elasticated",
      "Occasion": "Daily Wear & Travel",
      "Wash Care": "Machine Wash Gentle"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women jeggings go colors stretch denim pants casual"
  },

  // 8. Leggings & Palazzos
  {
    id: "gmd-wm-lg-001",
    product_id: "gmd-wm-lg-001",
    name: "Hummel Active Breathable Stretch Cotton Churidar Leggings",
    title: "Hummel Breathable Stretch Leggings",
    brand: "Hummel",
    category: "clothing",
    category_name: "Leggings & Palazzos",
    subcategory: "leggings",
    childCategory: "leggings",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 649,
    mrp: 1299,
    discount_percentage: 50,
    stock_quantity: 70,
    in_stock: true,
    is_active: true,
    rating: 4.4,
    reviews_count: 180,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://hummel.net.in/cdn/shop/files/6_cc6f1d11-2594-493b-8107-9833f47e3390.png?v=1755504009",
    images: [
      "https://hummel.net.in/cdn/shop/files/6_cc6f1d11-2594-493b-8107-9833f47e3390.png?v=1755504009"
    ],
    pi_images: [
      {
        image_url: "https://hummel.net.in/cdn/shop/files/6_cc6f1d11-2594-493b-8107-9833f47e3390.png?v=1755504009"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Crafted from combed organic cotton enriched with elastane, these Hummel leggings provide supreme breathability and flexible stretch. Perfect as everyday pairing for kurtas, tunics, or workout tees.",
    features: [
      "Combed long-staple organic cotton fabric",
      "95% Cotton 5% Spandex for resilient shape retention",
      "Non-see-through opaque knitting",
      "Reinforced flatlock stitching prevents chafing",
      "Elasticated waistband for secure snug hold"
    ],
    specifications: {
      "Fabric": "95% Combed Cotton, 5% Spandex",
      "Fit": "Skinny Stretch Fit",
      "Length": "Ankle Length",
      "Occasion": "Ethnic Pairing, Loungewear & Fitness",
      "Wash Care": "Machine Wash Cold"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women leggings hummel cotton stretch ankle length"
  },
  {
    id: "gmd-wm-lg-002",
    product_id: "gmd-wm-lg-002",
    name: "Dipani Pure Rayon Flared Wide-Leg Relaxed Palazzos",
    title: "Dipani Flared Wide-Leg Palazzos",
    brand: "Dipani",
    category: "clothing",
    category_name: "Leggings & Palazzos",
    subcategory: "leggings",
    childCategory: "palazzos",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 699,
    mrp: 1399,
    discount_percentage: 50,
    stock_quantity: 55,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 140,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/32197821/2025/7/5/ec78fb6b-df95-4417-8981-02405b6c5bef1751715187871-Dipani-Women-Palazzos-8221751715187242-1.jpg",
    images: [
      "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/32197821/2025/7/5/ec78fb6b-df95-4417-8981-02405b6c5bef1751715187871-Dipani-Women-Palazzos-8221751715187242-1.jpg"
    ],
    pi_images: [
      {
        image_url: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/32197821/2025/7/5/ec78fb6b-df95-4417-8981-02405b6c5bef1751715187871-Dipani-Women-Palazzos-8221751715187242-1.jpg"
      }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Flow with graceful ease in these Dipani pure rayon flared palazzos. Featuring a billowing wide-leg silhouette, smooth fluid drape, and an elasticated waistband with drawstring, they bring effortless comfort to traditional and fusion wear.",
    features: [
      "Ultra-soft 14kg heavy rayon fabric with fluid drape",
      "Wide flared flare hemline for breeziness",
      "Elasticated waistband with adjustable tassel drawstring",
      "Deep side pockets for phone and essentials",
      "Complements kurtas, crop tops, and ethnic tunics"
    ],
    specifications: {
      "Fabric": "Pure Viscose Rayon",
      "Fit": "Wide Leg Flared Fit",
      "Length": "Full Length (38 inches)",
      "Closure": "Elasticated Drawstring Waist",
      "Occasion": "Ethnic & Fusion Casual Wear",
      "Wash Care": "Machine Wash Gentle"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women palazzos dipani rayon flared bottomwear ethnic"
  },

  // 9. Heels & Wedges
  {
    id: "gmd-wm-fw-001",
    product_id: "gmd-wm-fw-001",
    name: "Shoetopia Cream-Coloured Solid Block Heels",
    title: "Shoetopia Cream-Coloured Block Heels",
    brand: "Shoetopia",
    category: "footwear",
    category_name: "Heels & Wedges",
    subcategory: "heels",
    childCategory: "heels",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1199,
    mrp: 2499,
    discount_percentage: 52,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 167,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://assets.myntassets.com/assets/images/8169087/2024/5/22/b976cd13-befb-4079-98c1-9b32ef7ac5a91716367805154-Shoetopia-Women-Cream-Coloured-Solid-Heels-5801716367804912-7.jpg",
    images: [
      "https://assets.myntassets.com/assets/images/8169087/2024/5/22/b976cd13-befb-4079-98c1-9b32ef7ac5a91716367805154-Shoetopia-Women-Cream-Coloured-Solid-Heels-5801716367804912-7.jpg"
    ],
    pi_images: [
      {
        image_url: "https://assets.myntassets.com/assets/images/8169087/2024/5/22/b976cd13-befb-4079-98c1-9b32ef7ac5a91716367805154-Shoetopia-Women-Cream-Coloured-Solid-Heels-5801716367804912-7.jpg"
      }
    ],
    sizes: ["5", "6", "7", "8", "9"],
    description: "Walk with poise and confidence in these Shoetopia solid cream block heels. Engineered with cushioned memory foam footbeds and a sturdy 2.5-inch block heel, they pair effortlessly with dresses, formal trousers, and sarees alike.",
    features: [
      "Comfortable 2.5-inch sturdy block heel for balanced support",
      "Padded memory foam footbed prevents foot fatigue",
      "Minimalist single-strap toe band with ankle buckle strap",
      "Anti-slip textured TPR outsole",
      "Premium faux leather vegan upper"
    ],
    specifications: {
      "Upper Material": "Faux Vegan Leather",
      "Sole Material": "Textured TPR",
      "Heel Height": "2.5 Inches",
      "Heel Type": "Block Heel",
      "Toe Shape": "Open Square Toe",
      "Occasion": "Office, Party & Weddings"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women footwear heels shoetopia block heels partywear"
  },
  {
    id: "gmd-wm-fw-002",
    product_id: "gmd-wm-fw-002",
    name: "Tresmode Elegant Peep-Toe Platform Wedge Sandals",
    title: "Tresmode Peep-Toe Platform Wedges",
    brand: "Tresmode",
    category: "footwear",
    category_name: "Heels & Wedges",
    subcategory: "heels",
    childCategory: "wedges",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1899,
    mrp: 3799,
    discount_percentage: 50,
    stock_quantity: 30,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 85,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://www.tresmode.com/cdn/shop/files/ChatGPT_Image_Apr_27_2026_12_23_19_AM.jpg?v=1777354427",
    images: [
      "https://www.tresmode.com/cdn/shop/files/ChatGPT_Image_Apr_27_2026_12_23_19_AM.jpg?v=1777354427"
    ],
    pi_images: [
      {
        image_url: "https://www.tresmode.com/cdn/shop/files/ChatGPT_Image_Apr_27_2026_12_23_19_AM.jpg?v=1777354427"
      }
    ],
    sizes: ["5", "6", "7", "8", "9"],
    description: "Combine high elevation with all-day stability in these Tresmode platform wedge sandals. Finished with a peep toe, plush padded insole, and textured cork-style wedge sole, they keep your feet comfortable from brunch till dusk.",
    features: [
      "3-inch wedge heel with 1-inch front platform lift",
      "Ergonomic arch support and cushioned insole",
      "Sleek adjustable slingback ankle strap",
      "Durable non-slip grooved rubber outsole",
      "Versatile styling with skirts, dresses, and palazzos"
    ],
    specifications: {
      "Upper Material": "Premium Synthetic Leather",
      "Sole Material": "Durable Lightweight Rubber",
      "Heel Height": "3.0 Inches",
      "Heel Type": "Wedge Heel",
      "Closure": "Buckle Ankle Strap",
      "Occasion": "Casual, Brunch & Vacation"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women footwear wedges tresmode platform sandals"
  },

  // 10. Flat Sandals & Slides
  {
    id: "gmd-wm-fl-001",
    product_id: "gmd-wm-fl-001",
    name: "Shein Strappy Open-Toe Comfort Flat Sandals",
    title: "Strappy Open-Toe Flat Sandals",
    brand: "Shein Studio",
    category: "footwear",
    category_name: "Flat Sandals & Slides",
    subcategory: "flats",
    childCategory: "sandals",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 699,
    mrp: 1499,
    discount_percentage: 53,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.4,
    reviews_count: 210,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://assets.sheinindia.in/medias/shein_sys_master/root1/20260716/02sc/6a58a61aa2fc3a50f6dd63ae/-473Wx593H-443345642-black-MODEL.jpg",
    images: [
      "https://assets.sheinindia.in/medias/shein_sys_master/root1/20260716/02sc/6a58a61aa2fc3a50f6dd63ae/-473Wx593H-443345642-black-MODEL.jpg"
    ],
    pi_images: [
      {
        image_url: "https://assets.sheinindia.in/medias/shein_sys_master/root1/20260716/02sc/6a58a61aa2fc3a50f6dd63ae/-473Wx593H-443345642-black-MODEL.jpg"
      }
    ],
    sizes: ["5", "6", "7", "8", "9"],
    description: "Effortless, chic, and lightweight. These strappy open-toe flat sandals feature criss-cross soft straps, a cushioned footbed, and a durable flexible sole designed for city walks and holiday travels.",
    features: [
      "Minimalist criss-cross strap design",
      "Featherlight construction with cushioned footbed",
      "Flexible slip-resistant grooved sole",
      "Easy slip-on entry with elasticated heel support",
      "Wipes clean easily with damp cloth"
    ],
    specifications: {
      "Upper Material": "Soft Vegan PU",
      "Sole Material": "Flexible TPR",
      "Heel Type": "Flat (0.5 inch)",
      "Toe Type": "Open Round Toe",
      "Occasion": "Daily Wear, College & Beach",
      "Wash Care": "Wipe with Clean Dry Cloth"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women flats footwear sandals shein flat sandals black"
  },
  {
    id: "gmd-wm-fl-002",
    product_id: "gmd-wm-fl-002",
    name: "ONLY Casual Everyday Quilted Comfort Slides",
    title: "ONLY Quilted Comfort Slides",
    brand: "ONLY",
    category: "footwear",
    category_name: "Flat Sandals & Slides",
    subcategory: "flats",
    childCategory: "slides",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 799,
    mrp: 1599,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 112,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://www.only.in/cdn/shop/files/901346602_g0.jpg?v=1745913704&width=2048",
    images: [
      "https://www.only.in/cdn/shop/files/901346602_g0.jpg?v=1745913704&width=2048"
    ],
    pi_images: [
      {
        image_url: "https://www.only.in/cdn/shop/files/901346602_g0.jpg?v=1745913704&width=2048"
      }
    ],
    sizes: ["5", "6", "7", "8", "9"],
    description: "Slide into modern luxury with these ONLY quilted comfort slides. Built with a plush pillow-quilted upper band, molded anatomical footbed, and water-friendly sole, they're perfect for lounging or running quick errands.",
    features: [
      "Padded pillow-quilted wide strap",
      "Molded ergonomic footbed for natural arch support",
      "Water-resistant lightweight EVA outsole",
      "Clean modern aesthetic from international brand ONLY",
      "Slip-on convenience for daily routines"
    ],
    specifications: {
      "Upper Material": "Quilted Synthetic PU",
      "Sole Material": "Lightweight EVA",
      "Heel Type": "Flat",
      "Toe Type": "Open Toe Slide",
      "Occasion": "Loungewear, Casual Errands & Poolside",
      "Wash Care": "Wipe with damp cloth"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women footwear slides only flats quilted slip on"
  },

  // 11. Handbags & Totes
  {
    id: "gmd-wm-bg-001",
    product_id: "gmd-wm-bg-001",
    name: "Luxe Allure Structured Top-Handle Shoulder Handbag with Sling",
    title: "Structured Top-Handle Shoulder Handbag",
    brand: "Luxe Allure",
    category: "accessories",
    category_name: "Handbags & Totes",
    subcategory: "handbags",
    childCategory: "handbag",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1799,
    discount_percentage: 50,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 195,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://images.meesho.com/images/products/1038355367/jeebr_512.jpg",
    images: [
      "https://images.meesho.com/images/products/1038355367/jeebr_512.jpg"
    ],
    pi_images: [
      {
        image_url: "https://images.meesho.com/images/products/1038355367/jeebr_512.jpg"
      }
    ],
    sizes: ["Free Size"],
    description: "Refined, structured, and versatile. This Luxe Allure top-handle handbag features premium textured vegan leather, golden hardware, and an adjustable detachable shoulder strap to wear as a satchel or crossbody.",
    features: [
      "High-grade scratch-resistant textured vegan leather",
      "Dual top handles + adjustable detachable crossbody strap",
      "Multiple interior zip compartments and phone slip pockets",
      "Protective golden metal feet on bottom",
      "Polished metallic hardware and smooth zipper action"
    ],
    specifications: {
      "Material": "Textured Vegan PU Leather",
      "Compartments": "2 Main Compartments, 1 Center Zip Pocket",
      "Closure": "Zip Closure",
      "Dimensions": "28 cm x 21 cm x 12 cm",
      "Occasion": "Office, Travel & Parties",
      "Wash Care": "Wipe with damp cloth"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women accessories bags handbag crossbody sling vegan-leather"
  },
  {
    id: "gmd-wm-bg-002",
    product_id: "gmd-wm-bg-002",
    name: "Urban Carry Premium Canvas & Vegan Leather Spacious Shoulder Tote Bag",
    title: "Canvas & Leather Spacious Shoulder Tote",
    brand: "Urban Carry",
    category: "accessories",
    category_name: "Handbags & Totes",
    subcategory: "handbags",
    childCategory: "tote",
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
    reviews_count: 130,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRK-j0oimvhZdeUg2ZeBKmlJ6jyFKy8xT1xjYUgCkJIjm944ZNABMacMlA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRK-j0oimvhZdeUg2ZeBKmlJ6jyFKy8xT1xjYUgCkJIjm944ZNABMacMlA&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRK-j0oimvhZdeUg2ZeBKmlJ6jyFKy8xT1xjYUgCkJIjm944ZNABMacMlA&s=10"
      }
    ],
    sizes: ["Free Size"],
    description: "Fit everything you need for the day and more in this spacious shoulder tote bag. Designed with reinforced shoulder straps, a water-resistant canvas body, and durable vegan leather trim, it effortlessly holds a 14-inch laptop, planner, and daily essentials.",
    features: [
      "Accommodates up to a 14-inch laptop, tablet & books",
      "Heavyweight durable canvas with reinforced vegan leather base",
      "Sturdy long shoulder drop handles for comfortable carry",
      "Full top zipper closure to keep belongings secure",
      "Interior zip pocket and key leash"
    ],
    specifications: {
      "Material": "Heavy Cotton Canvas & Vegan Leather Trim",
      "Compartments": "1 Large Main Compartment, 2 Inner Pockets",
      "Closure": "Full Top Zipper",
      "Dimensions": "38 cm x 30 cm x 14 cm",
      "Occasion": "Work, College, Shopping & Travel",
      "Wash Care": "Spot Clean with Mild Soap"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women bags tote canvas bag shoulder bag laptop tote"
  },

  // 12. Fashion Jewellery
  {
    id: "gmd-wm-jw-001",
    product_id: "gmd-wm-jw-001",
    name: "Mirraw Royal Gold-Plated Kundan Choker Necklace Set with Earrings & Maang Tikka",
    title: "Mirraw Royal Gold-Plated Kundan Choker Set",
    brand: "Mirraw Heritage",
    category: "jewellery",
    category_name: "Fashion Jewellery",
    subcategory: "jewellery",
    childCategory: "choker-set",
    department: "women",
    gender: "women",
    section: "women",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1499,
    mrp: 3999,
    discount_percentage: 62,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 230,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://assets0.mirraw.com/images/14259801/image_original_zoom.jpeg?1784654500",
    images: [
      "https://assets0.mirraw.com/images/14259801/image_original_zoom.jpeg?1784654500"
    ],
    pi_images: [
      {
        image_url: "https://assets0.mirraw.com/images/14259801/image_original_zoom.jpeg?1784654500"
      }
    ],
    sizes: ["Free Size"],
    description: "Channel royalty at weddings and festive celebrations with this exquisite Mirraw gold-plated Kundan choker necklace set. Adorned with shimmering Kundan stones, emerald-tone drops, matching statement jhumka earrings, and a delicate maang tikka.",
    features: [
      "Complete 3-Piece Bridal/Festive Set: Choker, Earrings & Maang Tikka",
      "Intricate hand-set Kundan stone craftsmanship with pearl drops",
      "High-polish 22K yellow gold plating",
      "Adjustable zari dori cord fits all neck sizes comfortably",
      "Hypoallergenic skin-friendly alloy base"
    ],
    specifications: {
      "Base Material": "Brass Alloy with Gold Plating",
      "Stone Type": "Kundan & Faux Pearls",
      "Closure": "Adjustable Drawstring Dori",
      "Package Contains": "1 Necklace, 1 Pair Earrings, 1 Maang Tikka",
      "Occasion": "Weddings, Sangeet & Festive Functions",
      "Care Instructions": "Keep away from water, perfumes and chemicals"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "women jewellery kundan choker necklace mirraw festive wedding bridal"
  }
];

// Update frontend/src/data/sampleProducts.js
const sampleProductsPath = path.resolve('frontend/src/data/sampleProducts.js');
let sampleContent = fs.readFileSync(sampleProductsPath, 'utf8');

// Parse or find the existing array
const existingIds = new Set();
const idRegex = /"id":\s*"([^"]+)"/g;
let match;
while ((match = idRegex.exec(sampleContent)) !== null) {
  existingIds.add(match[1]);
}

const newProductsToAdd = womenProducts.filter(p => !existingIds.has(p.id));

if (newProductsToAdd.length > 0) {
  // Convert new products to code string
  const formattedNewProducts = newProductsToAdd.map(p => JSON.stringify(p, null, 2)).join(',\n');
  
  // Insert before the closing `];`
  const lastBracketIndex = sampleContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const updatedContent = sampleContent.slice(0, lastBracketIndex).trimEnd() + ',\n' + formattedNewProducts + '\n];\n';
    fs.writeFileSync(sampleProductsPath, updatedContent, 'utf8');
    console.log(`Added ${newProductsToAdd.length} products to frontend sampleProducts.js`);
  }
} else {
  console.log('All women products already exist in frontend sampleProducts.js');
}

// Update backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  const backendProducts = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
  const backendIds = new Set(backendProducts.map(p => p.id || p.product_id));
  const backendToAdd = womenProducts.filter(p => !backendIds.has(p.id));
  if (backendToAdd.length > 0) {
    backendProducts.push(...backendToAdd);
    fs.writeFileSync(backendPath, JSON.stringify(backendProducts, null, 2), 'utf8');
    console.log(`Added ${backendToAdd.length} products to backend products.json`);
  } else {
    console.log('All women products already exist in backend products.json');
  }
}
