import fs from 'fs';
import path from 'path';

const newKidsProducts = [
  // === 1. Ethnic Sets ===
  {
    id: "gmd-kd-et-001",
    product_id: "gmd-kd-et-001",
    name: "Boys Royal Embroidered Silk Kurta Pyjama with Floral Nehru Jacket Set",
    title: "Boys Kurta Pyjama with Nehru Jacket",
    brand: "Little Royal",
    category: "clothing",
    category_name: "Ethnic Sets",
    subcategory: "ethnic-sets",
    childCategory: "ethnic-sets",
    department: "kids",
    gender: "boys",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1199,
    mrp: 2399,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 142,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQDTEAS4XG9xFHBeQDkwT-ltXTStFRlJ608nzUnaumw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQDTEAS4XG9xFHBeQDkwT-ltXTStFRlJ608nzUnaumw&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQDTEAS4XG9xFHBeQDkwT-ltXTStFRlJ608nzUnaumw&s=10"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Dress your young gentleman for festive celebrations and weddings in this handsome 3-piece ethnic set. Comprises a tailored silk-blend kurta, elasticated churidar pyjama, and an eye-catching floral jacquard Nehru jacket with pocket square.",
    features: [
      "Complete 3-Piece Festive Set: Kurta, Pyjama & Nehru Jacket",
      "Rich woven jacquard floral Nehru jacket with mandarin collar",
      "Soft breathable silk-blend fabric gentle on child's skin",
      "Comfortable elasticated waistband on pyjama",
      "Dry clean recommended for lasting vibrancy"
    ],
    specifications: {
      "Fabric": "Art Silk & Jacquard Blend",
      "Set Type": "Kurta, Pyjama & Waistcoat",
      "Neck": "Mandarin Collar",
      "Occasion": "Festivals, Weddings & Traditional Functions",
      "Wash Care": "Dry Clean Only"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids boys ethnic sets kurta pyjama nehru jacket traditional wedding"
  },
  {
    id: "gmd-kd-et-002",
    product_id: "gmd-kd-et-002",
    name: "Mumkins Peach Embroidered Crop Choli & Flared Palazzo Set for Girls",
    title: "Mumkins Peach Embroidered Palazzo Choli Set",
    brand: "Mumkins",
    category: "clothing",
    category_name: "Ethnic Sets",
    subcategory: "ethnic-sets",
    childCategory: "ethnic-sets",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1499,
    mrp: 2999,
    discount_percentage: 50,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 118,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.mumkins.in/cdn/shop/files/peach-embroidered-palazzo-choli-set-for-girls-gs21818-1.webp?v=1787138451&width=1000",
    images: [
      "https://www.mumkins.in/cdn/shop/files/peach-embroidered-palazzo-choli-set-for-girls-gs21818-1.webp?v=1787138451&width=1000"
    ],
    pi_images: [
      {
        image_url: "https://www.mumkins.in/cdn/shop/files/peach-embroidered-palazzo-choli-set-for-girls-gs21818-1.webp?v=1787138451&width=1000"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Enchanting festive elegance by Mumkins. Features a peach crop choli top adorned with delicate golden zari and sequin embroidery, paired with voluminous tiered flared palazzos and a matching sheer net dupatta.",
    features: [
      "3-Piece Designer Set: Embroidered Choli, Flared Palazzo & Dupatta",
      "Soft georgette with skin-friendly cotton inner lining",
      "Elasticated waistband on palazzo for flexible comfort",
      "Concealed zipper closure on choli with back tie-up dori",
      "Perfect for Diwali, Eid, and family weddings"
    ],
    specifications: {
      "Fabric": "Georgette with Cotton Lining",
      "Set Type": "Choli, Palazzo & Dupatta",
      "Work": "Sequin & Zari Embroidery",
      "Occasion": "Weddings, Festivals & Sangeet",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls ethnic wear palazzo choli mumkins peach festive"
  },

  // === 2. Girls Fashion -> Dresses & Frocks ===
  {
    id: "gmd-kd-dr-001",
    product_id: "gmd-kd-dr-001",
    name: "Girls Floral Embroidered Tiered Fit & Flare Party Frock Dress",
    title: "Girls Floral Tiered Party Frock",
    brand: "Angel Spark",
    category: "clothing",
    category_name: "Dresses & Frocks",
    subcategory: "dresses-frocks",
    childCategory: "dresses",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 799,
    mrp: 1599,
    discount_percentage: 50,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 89,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTUPtppA0MXuDucEw208YIAzr-2F-E1mEQVJMRzFrGA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTUPtppA0MXuDucEw208YIAzr-2F-E1mEQVJMRzFrGA&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTUPtppA0MXuDucEw208YIAzr-2F-E1mEQVJMRzFrGA&s=10"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Bright and cheerful, this tiered fit-and-flare frock is made for twirling! Featuring delicate floral embroidery on the bodice, a tiered ruffle skirt, and a comfy satin sash bow at the back.",
    features: [
      "Tiered flowy silhouette designed for ease of movement",
      "Soft breathable tulle mesh with 100% cotton inner lining",
      "Rear zipper closure and adjustable back bow sash",
      "Skin-friendly seams and hypoallergenic fabric",
      "Gentle hand wash recommended"
    ],
    specifications: {
      "Fabric": "Polyester Mesh with Cotton Lining",
      "Length": "Knee Length",
      "Fit": "Fit & Flare",
      "Occasion": "Birthdays, Casual Parties & Family Outings",
      "Wash Care": "Hand Wash Gentle"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls dresses frocks partywear floral fit flare"
  },
  {
    id: "gmd-kd-dr-002",
    product_id: "gmd-kd-dr-002",
    name: "Girls Princess Ruffled Tulle Flared Birthday Frock",
    title: "Girls Ruffled Tulle Princess Frock",
    brand: "Princess Wardrobe",
    category: "clothing",
    category_name: "Dresses & Frocks",
    subcategory: "dresses-frocks",
    childCategory: "frocks",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1799,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 104,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCXgYrd1K2wGz0NGohjtXimaeydjQW0-4AT-mTsH7-Vg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCXgYrd1K2wGz0NGohjtXimaeydjQW0-4AT-mTsH7-Vg&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCXgYrd1K2wGz0NGohjtXimaeydjQW0-4AT-mTsH7-Vg&s=10"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Make her special day unforgettable with this fairytale princess frock. Built with multi-layered ruffled tulle that holds its voluminous bell shape without being heavy or scratchy.",
    features: [
      "Dramatic multi-layered tulle flare with scalloped ruffles",
      "Fitted round-neck bodice with jewel button accent",
      "Full soft cotton lining guarantees zero scratchiness",
      "Concealed zipper for smooth dressing",
      "Ideal for birthday parties, stage performances & photoshoots"
    ],
    specifications: {
      "Fabric": "Multi-Layered Tulle Net with Cotton Lining",
      "Length": "Mid-Calf Length",
      "Sleeve": "Cap Sleeves",
      "Occasion": "Birthdays, Weddings & Celebrations",
      "Wash Care": "Hand Wash or Dry Clean"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls dresses frocks princess tulle birthday party"
  },
  {
    id: "gmd-kd-dr-003",
    product_id: "gmd-kd-dr-003",
    name: "Girls Elegant Lace Bodice Sleeveless Bow Accent Party Dress",
    title: "Girls Lace Bodice Bow Accent Party Dress",
    brand: "Tiny Chic",
    category: "clothing",
    category_name: "Dresses & Frocks",
    subcategory: "dresses-frocks",
    childCategory: "dresses",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 999,
    mrp: 1999,
    discount_percentage: 50,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 73,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fHzT2Ik2ycULZnYmK253qepuOLsGZo0YxvJpwbBjlw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fHzT2Ik2ycULZnYmK253qepuOLsGZo0YxvJpwbBjlw&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fHzT2Ik2ycULZnYmK253qepuOLsGZo0YxvJpwbBjlw&s=10"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "An elegant party dress crafted with floral lace over the bodice and an airy flared organza skirt. Finished with a decorative satin waist ribbon and statement bow.",
    features: [
      "Delicate floral lace overlay on bodice",
      "Airy organza layered skirt with smooth satin hem",
      "Decorative waist belt with structured bow",
      "Soft breathable inner cotton slip",
      "Hidden back zipper for effortless wear"
    ],
    specifications: {
      "Fabric": "Lace, Organza & Satin with Cotton Lining",
      "Fit": "Fit & Flare Regular",
      "Closure": "Back Zipper",
      "Occasion": "Parties, Anniversaries & Festivals",
      "Wash Care": "Hand Wash Cold"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls dresses frocks lace party dress bow"
  },

  // === 3. Girls Fashion -> Tops & Skirts ===
  {
    id: "gmd-kd-ts-001",
    product_id: "gmd-kd-ts-001",
    name: "Girls Chic Ribbed Crop Top with Plaid Pleated Skirt Set",
    title: "Girls Ribbed Top with Plaid Pleated Skirt",
    brand: "Little Trendsetters",
    category: "clothing",
    category_name: "Tops & Skirts",
    subcategory: "tops-skirts",
    childCategory: "tops-skirts",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 749,
    mrp: 1499,
    discount_percentage: 50,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 94,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzXe9Atp_96Bj49FSPVE5rE-YecsYCVcCyZxT39tCoeQ&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzXe9Atp_96Bj49FSPVE5rE-YecsYCVcCyZxT39tCoeQ&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzXe9Atp_96Bj49FSPVE5rE-YecsYCVcCyZxT39tCoeQ&s=10"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "A trendy preppy 2-piece set. Features a cozy stretch-ribbed short-sleeve top paired with a classic knife-pleated plaid skirt with built-in safety shorts underneath.",
    features: [
      "2-Piece Set: Stretch Ribbed Top + Pleated Plaid Skirt",
      "Skirt includes built-in soft safety shorts for worry-free play",
      "Elasticated comfortable waistband",
      "Durable non-pilling cotton-poly blend",
      "Mix and match easily with wardrobe staples"
    ],
    specifications: {
      "Fabric": "Cotton Elastane Top, Poly-Viscose Skirt",
      "Set Type": "Top & Skirt 2-Piece",
      "Waist": "Elasticated",
      "Occasion": "Casual, School Functions & Outings",
      "Wash Care": "Machine Wash Cold"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls tops skirts pleated skirt plaid preppy 2-piece"
  },
  {
    id: "gmd-kd-ts-002",
    product_id: "gmd-kd-ts-002",
    name: "Girls Floral Print Flutter Sleeve Blouse with Flared Skater Skirt Set",
    title: "Girls Flutter Sleeve Top & Skater Skirt",
    brand: "Bloom Studio",
    category: "clothing",
    category_name: "Tops & Skirts",
    subcategory: "tops-skirts",
    childCategory: "tops-skirts",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 849,
    mrp: 1699,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 67,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKh5kO-6gKXRxQIhpNN-bMhtUqzMbd6-sjDk6uyqrpA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKh5kO-6gKXRxQIhpNN-bMhtUqzMbd6-sjDk6uyqrpA&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKh5kO-6gKXRxQIhpNN-bMhtUqzMbd6-sjDk6uyqrpA&s=10"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Sunny and sweet, this 2-piece outfit includes a lightweight floral flutter-sleeve blouse paired with a solid circle skater skirt. Breathable and breezy for warm days.",
    features: [
      "Charming flutter sleeves with keyhole button back",
      "High-spin circle skater skirt with elastic waist",
      "Vibrant fade-proof floral printing",
      "Breathable pure rayon fabric",
      "Easy machine wash care"
    ],
    specifications: {
      "Fabric": "100% Viscose Rayon",
      "Fit": "Relaxed Regular Fit",
      "Sleeve": "Flutter Cap Sleeves",
      "Occasion": "Picnics, Brunches & Birthday Outings",
      "Wash Care": "Machine Wash Gentle"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls tops skirts skater skirt floral casual"
  },
  {
    id: "gmd-kd-ts-003",
    product_id: "gmd-kd-ts-003",
    name: "Girls Modern Denim Jacket Style Top with Tiered Tulle Tutu Skirt Set",
    title: "Girls Denim Jacket Top & Tutu Skirt Set",
    brand: "Urban Kids",
    category: "clothing",
    category_name: "Tops & Skirts",
    subcategory: "tops-skirts",
    childCategory: "tops-skirts",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1799,
    discount_percentage: 50,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 82,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HCE_FLbzFI1Ql7yaaeVLrC4WiAszWIS32FMiWg7tSQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HCE_FLbzFI1Ql7yaaeVLrC4WiAszWIS32FMiWg7tSQ&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HCE_FLbzFI1Ql7yaaeVLrC4WiAszWIS32FMiWg7tSQ&s"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Edge meets elegance with this street-chic combination. Pairs a soft denim cropped button-up jacket top with a whimsical pastel tiered tulle tutu skirt.",
    features: [
      "Soft washed stretch denim top with metallic shank buttons",
      "Billowing multi-tiered tulle tutu skirt",
      "Glitter elasticized waistband provides snug comfortable hold",
      "Fully lined with cotton voile",
      "Trendy fashionista look for events and photo shoots"
    ],
    specifications: {
      "Fabric": "Cotton Denim & Soft Tulle Net",
      "Set Type": "Jacket Top & Tutu Skirt",
      "Occasion": "Party, Casual & Photography",
      "Wash Care": "Hand Wash or Gentle Cycle"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls tops skirts denim jacket tutu skirt party"
  },

  // === 4. Girls Fashion -> Ethnic Wear ===
  {
    id: "gmd-kd-ge-001",
    product_id: "gmd-kd-ge-001",
    name: "Girls Designer Zari Embroidered Lehenga Choli with Net Dupatta",
    title: "Girls Zari Embroidered Lehenga Choli",
    brand: "Utsav Kids",
    category: "clothing",
    category_name: "Ethnic Sets",
    subcategory: "ethnic-sets",
    childCategory: "lehenga",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1699,
    mrp: 3399,
    discount_percentage: 50,
    stock_quantity: 30,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 156,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXBwhTvNR8g9Wk2lKGjOUAunSItFN9n8vEguEKTzbMg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXBwhTvNR8g9Wk2lKGjOUAunSItFN9n8vEguEKTzbMg&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXBwhTvNR8g9Wk2lKGjOUAunSItFN9n8vEguEKTzbMg&s=10"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Traditional splendor for young princesses! Features a rich silk-blend flared lehenga skirt with metallic zari hem, paired with a coordinating short choli and sequined border net dupatta.",
    features: [
      "Lavish 3-Piece Festive Set: Choli, Lehenga Skirt & Dupatta",
      "Elaborate golden zari embroidery and gotta patti border",
      "Drawstring and elasticated waistband with decorative latkan tassels",
      "Cotton lining ensures all-day comfort during celebrations",
      "Ideal for weddings, festivals, and cultural events"
    ],
    specifications: {
      "Fabric": "Art Silk with Shantoon & Cotton Lining",
      "Lehenga Closure": "Drawstring with Elastic",
      "Choli Neck": "Round Neck",
      "Occasion": "Weddings, Festivals & Sangeet",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls ethnic wear lehenga choli wedding festive"
  },
  {
    id: "gmd-kd-ge-002",
    product_id: "gmd-kd-ge-002",
    name: "Girls Traditional Printed Anarkali Kurta & Churidar Set with Dupatta",
    title: "Girls Printed Anarkali Kurta Set",
    brand: "Biba Junior",
    category: "clothing",
    category_name: "Ethnic Sets",
    subcategory: "ethnic-sets",
    childCategory: "anarkali",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1299,
    mrp: 2599,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 110,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfZlWnIxc1K8AGfOtUF8yW4XgY94Urx_vTthAQIgMZQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfZlWnIxc1K8AGfOtUF8yW4XgY94Urx_vTthAQIgMZQ&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfZlWnIxc1K8AGfOtUF8yW4XgY94Urx_vTthAQIgMZQ&s"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Flowing with grace and heritage, this Biba Junior inspired Anarkali kurta set features ethnic floral motifs, a flared kalidar silhouette, and coordinated churidar leggings with matching dupatta.",
    features: [
      "Flared kalidar Anarkali cut with wide twirl hem",
      "Traditional gold block print and neck yoke border",
      "Soft 100% cotton fabric keeps child cool and relaxed",
      "Elasticated churidar bottom for snug easy fit",
      "Includes lightweight printed dupatta"
    ],
    specifications: {
      "Fabric": "100% Pure Cotton",
      "Set Type": "Anarkali Kurta, Churidar & Dupatta",
      "Kurta Length": "Calf Length",
      "Occasion": "Festivals, Family Gatherings & Pujas",
      "Wash Care": "Hand Wash Separately"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls ethnic wear anarkali kurta churidar festive cotton"
  },
  {
    id: "gmd-kd-ge-003",
    product_id: "gmd-kd-ge-003",
    name: "Girls Golden Foil Printed Peplum Sharara Festive Suit Set",
    title: "Girls Golden Foil Printed Sharara Suit",
    brand: "Festive Bloom",
    category: "clothing",
    category_name: "Ethnic Sets",
    subcategory: "ethnic-sets",
    childCategory: "sharara",
    department: "kids",
    gender: "girls",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1399,
    mrp: 2799,
    discount_percentage: 50,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 85,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvN69XXLuhYa9NHONeQ-QdIIep5F05-6rLbOiCn5FEyw&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvN69XXLuhYa9NHONeQ-QdIIep5F05-6rLbOiCn5FEyw&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvN69XXLuhYa9NHONeQ-QdIIep5F05-6rLbOiCn5FEyw&s"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "A trendy modern ethnic ensemble featuring a sleeveless peplum tunic with golden foil accents and dramatic tiered ruffled sharara pants.",
    features: [
      "Modern peplum silhouette with golden gotta lace",
      "Tiered pleated wide-flare sharara pants",
      "Soft chanderi blend fabric with pure cotton lining",
      "Elasticated waistband for secure comfortable wear",
      "Vibrant festive look without being excessively heavy"
    ],
    specifications: {
      "Fabric": "Chanderi Blend with Cotton Lining",
      "Set Type": "Peplum Kurta & Sharara",
      "Neck": "Round Neck with Dori Tie",
      "Occasion": "Diwali, Eid, Mehendi & Parties",
      "Wash Care": "Dry Clean Recommended"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids girls ethnic wear sharara suit peplum festive"
  },

  // === 5. Baby & Footwear -> Baby Rompers & Onesies ===
  {
    id: "gmd-kd-bb-001",
    product_id: "gmd-kd-bb-001",
    name: "Infant Pure Organic Cotton Snap-Button Short Sleeve Baby Romper",
    title: "Organic Cotton Snap-Button Baby Romper",
    brand: "Tiny Cuddles",
    category: "clothing",
    category_name: "Baby Rompers & Onesies",
    subcategory: "baby-clothes",
    childCategory: "rompers",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 399,
    mrp: 799,
    discount_percentage: 50,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 180,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIk7JlIs9zMtIwHY2iyCor-9WeAQMPyKJo4JkavMs1A&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIk7JlIs9zMtIwHY2iyCor-9WeAQMPyKJo4JkavMs1A&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIk7JlIs9zMtIwHY2iyCor-9WeAQMPyKJo4JkavMs1A&s=10"
      }
    ],
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"],
    description: "Wrap your baby in cloud-soft comfort. Crafted from 100% GOTS certified organic combed cotton with non-toxic dyes, nickel-free crotch snap buttons for effortless diaper changes, and envelope neckline for easy dressing.",
    features: [
      "100% GOTS Certified Organic Breathable Cotton",
      "Nickel-free crotch snap buttons for speedy diaper changes",
      "Expandable envelope neckline stretches over baby's head gently",
      "Flatlock seams prevent chafing against sensitive infant skin",
      "Machine washable and holds shape after dozens of washes"
    ],
    specifications: {
      "Fabric": "100% Organic Combed Cotton",
      "Closure": "Bottom Snap Buttons",
      "Sleeve": "Short Sleeves",
      "Occasion": "Daily Wear, Sleepwear & Playwear",
      "Wash Care": "Machine Wash Warm"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids baby rompers onesies infant organic cotton bodysuit"
  },
  {
    id: "gmd-kd-bb-002",
    product_id: "gmd-kd-bb-002",
    name: "Newborn Cute Animal Ear Hooded Breathable Cotton Jumpsuit Onesie",
    title: "Animal Ear Hooded Baby Jumpsuit Onesie",
    brand: "Baby Hugs",
    category: "clothing",
    category_name: "Baby Rompers & Onesies",
    subcategory: "baby-clothes",
    childCategory: "onesies",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 499,
    mrp: 999,
    discount_percentage: 50,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 122,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30uvK5NEavgXKwR7pR7cokhHd6Srgw7-WokSrA6K7Mw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30uvK5NEavgXKwR7pR7cokhHd6Srgw7-WokSrA6K7Mw&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30uvK5NEavgXKwR7pR7cokhHd6Srgw7-WokSrA6K7Mw&s=10"
      }
    ],
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"],
    description: "Irresistibly adorable! This cozy baby jumpsuit features 3D animal ears on the hood, full-length front zipper with protective chin guard, and ultra-soft interlock cotton knit.",
    features: [
      "Cute 3D animal bear ears on hood",
      "Full front zipper with safety fabric guard under chin",
      "Breathable double-knit interlock cotton",
      "Ribbed cuffs at wrists and ankles to lock in warmth",
      "Perfect for outdoor strolls and gifting newborns"
    ],
    specifications: {
      "Fabric": "100% Interlock Cotton",
      "Closure": "Full Front Zipper",
      "Sleeve": "Long Sleeves",
      "Occasion": "Winter Casual, Loungewear & Outings",
      "Wash Care": "Machine Wash Gentle"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids baby onesies rompers hooded jumpsuit infant cotton"
  },
  {
    id: "gmd-kd-bb-003",
    product_id: "gmd-kd-bb-003",
    name: "Baby Soft Waffle Knit Full Sleeve Footed Sleepsuit Romper",
    title: "Baby Waffle Knit Footed Sleepsuit",
    brand: "Snuggle Tots",
    category: "clothing",
    category_name: "Baby Rompers & Onesies",
    subcategory: "baby-clothes",
    childCategory: "sleepsuit",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 549,
    mrp: 1099,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 95,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPrGwwgy_90hdeTAYkuMnAXWvtvIESS-BbW-ybRBAnA&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPrGwwgy_90hdeTAYkuMnAXWvtvIESS-BbW-ybRBAnA&s"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPrGwwgy_90hdeTAYkuMnAXWvtvIESS-BbW-ybRBAnA&s"
      }
    ],
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"],
    description: "Keep tiny toes cozy all night. Made from thermal waffle-knit cotton that regulates body temperature naturally, featuring two-way zip for middle-of-the-night changes and anti-slip gripper feet.",
    features: [
      "Two-way diagonal zipper for quick, painless diaper changes",
      "Cozy footed design with non-slip silicone sole grippers",
      "Textured waffle knit allows air circulation while keeping warm",
      "Foldover mitten cuffs on smaller sizes to prevent scratching",
      "Gentle elastic heel backing keeps feet securely in place"
    ],
    specifications: {
      "Fabric": "100% Thermal Waffle Cotton",
      "Closure": "Two-Way Full Length Zipper",
      "Feet": "Footed with Non-Slip Grippers",
      "Occasion": "Sleepwear, Loungewear & Nightwear",
      "Wash Care": "Machine Wash Warm"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids baby sleepsuit footed romper waffle knit infant"
  },

  // === 6. Kids Casual Shoes ===
  {
    id: "gmd-kd-fw-001",
    product_id: "gmd-kd-fw-001",
    name: "Kids Lightweight Breathable Mesh Velcro Sport Casual Sneakers",
    title: "Kids Lightweight Velcro Sport Sneakers",
    brand: "Stride Kids",
    category: "footwear",
    category_name: "Kids Casual Shoes",
    subcategory: "casual-shoes",
    childCategory: "sneakers",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 699,
    mrp: 1399,
    discount_percentage: 50,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 138,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdo1nQmZcutQsevtPe-1v0Gk5XC4jYWaw1wEKi3QhuNw&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdo1nQmZcutQsevtPe-1v0Gk5XC4jYWaw1wEKi3QhuNw&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdo1nQmZcutQsevtPe-1v0Gk5XC4jYWaw1wEKi3QhuNw&s=10"
      }
    ],
    sizes: ["UK 8", "UK 9", "UK 10", "UK 11", "UK 12", "UK 13", "UK 1", "UK 2"],
    description: "Built for nonstop play, running, and school adventures! Features an ultra-lightweight breathable mesh upper, shock-absorbing EVA foam sole, and easy Velcro hook-and-loop strap so kids can put them on themselves.",
    features: [
      "Breathable engineered mesh upper keeps little feet cool",
      "Quick dual Velcro hook-and-loop closure for self-dressing",
      "Featherlight EVA sole cushions every bounce and jump",
      "Reinforced rubber toe cap guards against scuffs and stubs",
      "Removable cushioned memory foam insole"
    ],
    specifications: {
      "Upper Material": "Breathable Mesh & Synthetic Leather",
      "Sole Material": "Shock-Absorbing EVA Foam",
      "Closure": "Velcro Hook & Loop Strap",
      "Toe Type": "Round Reinforced Toe",
      "Occasion": "School, Sports, Running & Casual Wear",
      "Wash Care": "Wipe with clean damp cloth"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids footwear shoes casual sneakers velcro running sports"
  },
  {
    id: "gmd-kd-fw-002",
    product_id: "gmd-kd-fw-002",
    name: "Kids High-Top Colorblock Anti-Slip Cushioned Streetwear Sneakers",
    title: "Kids High-Top Colorblock Sneakers",
    brand: "Kicks Club",
    category: "footwear",
    category_name: "Kids Casual Shoes",
    subcategory: "casual-shoes",
    childCategory: "sneakers",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 899,
    mrp: 1799,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 96,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP24_a1-Ano2JVB-MIUa8RleL_Zgggwcz0l3qHBUZ5Tg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP24_a1-Ano2JVB-MIUa8RleL_Zgggwcz0l3qHBUZ5Tg&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP24_a1-Ano2JVB-MIUa8RleL_Zgggwcz0l3qHBUZ5Tg&s=10"
      }
    ],
    sizes: ["UK 8", "UK 9", "UK 10", "UK 11", "UK 12", "UK 13", "UK 1", "UK 2"],
    description: "Street-style swagger for young trendsetters. These high-top sneakers combine bold retro colorblocking with ankle padding and a high-traction rubber outsole that grips playgrounds and pavements alike.",
    features: [
      "Ankle-supporting padded high-top collar prevents rolling",
      "Durable water-resistant vegan leather upper",
      "Combination elastic lace + Velcro strap for secure custom fit",
      "Deep-groove anti-skid rubber outsole",
      "Padded tongue and breathable textile lining"
    ],
    specifications: {
      "Upper Material": "Vegan PU Leather",
      "Sole Material": "Textured Non-Slip Rubber",
      "Closure": "Elastic Laces with Top Velcro Strap",
      "Ankle Height": "High-Top",
      "Occasion": "Casual Streetwear, Parties & Outings",
      "Wash Care": "Wipe with damp cloth"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids shoes sneakers high top casual streetwear colorblock"
  },

  // === 7. Kids Sandals & Slippers ===
  {
    id: "gmd-kd-fw-003",
    product_id: "gmd-kd-fw-003",
    name: "Kids Ergonomic Arch Support Dual-Strap Outdoor Active Sandals",
    title: "Kids Dual-Strap Outdoor Active Sandals",
    brand: "SoleMate Kids",
    category: "footwear",
    category_name: "Kids Sandals & Slippers",
    subcategory: "sandals",
    childCategory: "sandals",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 549,
    mrp: 1099,
    discount_percentage: 50,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 114,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF4sdl3V2q3A_UDp2g9mPmvHlWQWXHif8J-7Lw2HZEQA&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF4sdl3V2q3A_UDp2g9mPmvHlWQWXHif8J-7Lw2HZEQA&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF4sdl3V2q3A_UDp2g9mPmvHlWQWXHif8J-7Lw2HZEQA&s=10"
      }
    ],
    sizes: ["UK 8", "UK 9", "UK 10", "UK 11", "UK 12", "UK 13", "UK 1", "UK 2"],
    description: "The go-to footwear for summer explorations and beach trips. Featuring dual adjustable Velcro straps for growing feet, contoured footbed for arch support, and quick-drying water-friendly materials.",
    features: [
      "Dual adjustable Velcro straps at forefoot and ankle",
      "Anatomically molded arch support footbed",
      "Quick-drying water-resistant synthetic webbing",
      "Rugged grooved rubber outsole provides traction on wet surfaces",
      "Padded neoprene strap lining prevents blisters"
    ],
    specifications: {
      "Upper Material": "Quick-Dry Webbing & Synthetic",
      "Sole Material": "Durable TPR Rubber",
      "Closure": "Dual Velcro Straps",
      "Toe Type": "Open Toe",
      "Occasion": "Beach, Summer Casual, Parks & Playdates",
      "Wash Care": "Wash with water and air dry"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids sandals footwear slippers water shoes outdoor beach"
  },
  {
    id: "gmd-kd-fw-004",
    product_id: "gmd-kd-fw-004",
    name: "Kids Fun Graphic Lightweight Waterproof EVA Foam Clogs & Slippers",
    title: "Kids Lightweight Waterproof EVA Clogs",
    brand: "FunSteps",
    category: "footwear",
    category_name: "Kids Sandals & Slippers",
    subcategory: "sandals",
    childCategory: "clogs",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 399,
    mrp: 799,
    discount_percentage: 50,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 147,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvt4ioOh__kCuAh_f6_Hktj9FDHU4f3-CQJDR8w06_rg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvt4ioOh__kCuAh_f6_Hktj9FDHU4f3-CQJDR8w06_rg&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvt4ioOh__kCuAh_f6_Hktj9FDHU4f3-CQJDR8w06_rg&s=10"
      }
    ],
    sizes: ["UK 8", "UK 9", "UK 10", "UK 11", "UK 12", "UK 13", "UK 1", "UK 2"],
    description: "Slip-on and go! Made from ultra-lightweight, odor-resistant EVA foam with ventilation drainage ports, cute cartoon charms, and a pivoting heel strap that transforms them from slide slippers into secure sandals.",
    features: [
      "Featherlight floating EVA foam construction",
      "Pivoting heel strap for choice of slip-on or locked-in fit",
      "Perforated breathability holes drain water and sand instantly",
      "Easy to rinse and dries in seconds",
      "Textured massage footbed and non-marking sole"
    ],
    specifications: {
      "Material": "100% Waterproof EVA Foam",
      "Sole Material": "Molded EVA",
      "Closure": "Pivoting Convertible Heel Strap",
      "Toe Type": "Closed Protective Toe with Ports",
      "Occasion": "Rainy Season, Poolside, Beach & Home Casual",
      "Wash Care": "Rinse with clean water"
    },
    delivery_info: { estimated_days: 3, free_delivery_above: 499, express_available: true, return_days: 15 },
    tags: "kids clogs slippers sandals footwear waterproof eva slides"
  }
];

// Update frontend/src/data/sampleProducts.js
const sampleProductsPath = path.resolve('frontend/src/data/sampleProducts.js');
let sampleContent = fs.readFileSync(sampleProductsPath, 'utf8');

const existingIds = new Set();
const idRegex = /"id":\s*"([^"]+)"/g;
let match;
while ((match = idRegex.exec(sampleContent)) !== null) {
  existingIds.add(match[1]);
}

const newProductsToAdd = newKidsProducts.filter(p => !existingIds.has(p.id));

if (newProductsToAdd.length > 0) {
  const formattedNewProducts = newProductsToAdd.map(p => JSON.stringify(p, null, 2)).join(',\n');
  const lastBracketIndex = sampleContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const updatedContent = sampleContent.slice(0, lastBracketIndex).trimEnd() + ',\n' + formattedNewProducts + '\n];\n';
    fs.writeFileSync(sampleProductsPath, updatedContent, 'utf8');
    console.log(`Added ${newProductsToAdd.length} products to frontend sampleProducts.js`);
  }
} else {
  console.log('All new kids products already exist in frontend sampleProducts.js');
}

// Update backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  const backendProducts = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
  const backendIds = new Set(backendProducts.map(p => p.id || p.product_id));
  const backendToAdd = newKidsProducts.filter(p => !backendIds.has(p.id));
  if (backendToAdd.length > 0) {
    backendProducts.push(...backendToAdd);
    fs.writeFileSync(backendPath, JSON.stringify(backendProducts, null, 2), 'utf8');
    console.log(`Added ${backendToAdd.length} products to backend products.json`);
  } else {
    console.log('All new kids products already exist in backend products.json');
  }
}
