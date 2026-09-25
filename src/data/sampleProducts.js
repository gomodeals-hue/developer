import { GENERATED_PRODUCTS } from './generatedProducts.js';
import { SUPPLEMENTAL_PRODUCTS } from './supplementalProducts.js';

const BASE_SAMPLE_PRODUCTS = [
  {
    "product_id": "el_1",
    "id": "el_1",
    "category": "electronics",
    "category_name": "Electronics",
    "name": "Smartphone Pro 12",
    "title": "Smartphone Pro 12",
    "description": "Experience next-generation mobile computing with the Smartphone Pro 12. Featuring an aerospace-grade titanium frame, an ultra-fast A17 Pro Bionic chipset, and a Pro camera system with 5x optical zoom for cinema-quality 4K capture.",
    "price": 65000,
    "mrp": 79900,
    "discount_percentage": 18,
    "stock_quantity": 41,
    "tags": "electronics, mobiles, new, 5g, flagship",
    "rating": 4.8,
    "reviews_count": 148,
    "brand": "Apple",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80"
      }
    ],
    "features": [
      "6.7-inch Super Retina XDR OLED display with ProMotion 120Hz",
      "A17 Pro Bionic architecture with 6-core high performance GPU",
      "Triple-lens 48MP main camera with 5x optical zoom & sensor-shift OIS",
      "All-day battery life with 29 hours of continuous video playback",
      "Aerospace-grade titanium chassis with Ceramic Shield front glass"
    ],
    "specifications": {
      "Brand": "Apple",
      "Model Name": "Smartphone Pro 12 Max",
      "Display": "6.7\" Super Retina XDR (2796 x 1290 px)",
      "Operating System": "iOS 18",
      "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3, USB-C 3.0",
      "Dimensions": "159.9 x 76.7 x 8.25 mm",
      "Weight": "221 grams",
      "Warranty": "1 Year International Warranty"
    },
    "variants": [
      {
        "variant_id": "el_1_v1",
        "variant_value": "Space Gray / 128GB",
        "attributes": {
          "Color": "Space Gray",
          "Storage": "128GB"
        },
        "price": 65000,
        "mrp": 79900,
        "stock_quantity": 18,
        "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"
      },
      {
        "variant_id": "el_1_v2",
        "variant_value": "Space Gray / 256GB",
        "attributes": {
          "Color": "Space Gray",
          "Storage": "256GB"
        },
        "price": 73000,
        "mrp": 89900,
        "stock_quantity": 12,
        "image_url": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80"
      },
      {
        "variant_id": "el_1_v3",
        "variant_value": "Silver / 128GB",
        "attributes": {
          "Color": "Silver",
          "Storage": "128GB"
        },
        "price": 65000,
        "mrp": 79900,
        "stock_quantity": 11,
        "image_url": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80"
      },
      {
        "variant_id": "el_1_v4",
        "variant_value": "Midnight Blue / 512GB",
        "attributes": {
          "Color": "Midnight Blue",
          "Storage": "512GB"
        },
        "price": 85000,
        "mrp": 99900,
        "stock_quantity": 0,
        "image_url": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "el_2",
    "id": "el_2",
    "category": "electronics",
    "category_name": "Electronics",
    "name": "Ultra-Thin Laptop 15\"",
    "title": "Ultra-Thin Laptop 15\"",
    "description": "High-performance laptop for professionals and creatives.",
    "price": 125000,
    "stock_quantity": 20,
    "tags": "electronics, laptops, best",
    "rating": 4.9,
    "reviews_count": 85,
    "thumbnail": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "el_3",
    "id": "el_3",
    "category": "electronics",
    "category_name": "Electronics",
    "name": "Smart Watch Fitness Tracker",
    "title": "Smart Watch Fitness Tracker",
    "description": "Track your health and stay connected on the go.",
    "price": 15000,
    "stock_quantity": 60,
    "tags": "electronics, wearables",
    "rating": 4.6,
    "reviews_count": 320,
    "thumbnail": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "el_4",
    "id": "el_4",
    "category": "electronics",
    "category_name": "Electronics",
    "name": "Wireless Noise-Cancelling Headphones",
    "title": "Wireless Noise-Cancelling Headphones",
    "description": "Industry-leading noise cancelling with dual noise sensor technology. Next-level music with Edge-AI and up to 30-hour battery life with quick charging.",
    "price": 25000,
    "mrp": 29990,
    "discount_percentage": 17,
    "stock_quantity": 3,
    "tags": "electronics, audio, headphones, noise-cancelling",
    "rating": 4.8,
    "reviews_count": 120,
    "brand": "Sony",
    "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
      }
    ],
    "features": [
      "Dual Noise Sensor technology for unmatched active noise cancellation",
      "30-hour battery life with 10-minute quick charge for 5 hours of playback",
      "Touch Sensor controls to pause, play, skip tracks, control volume, and activate voice assistant",
      "Speak-to-chat technology automatically reduces volume during conversations"
    ],
    "specifications": {
      "Brand": "Sony",
      "Model": "WH-1000XM5",
      "Driver Unit": "30mm, dome type",
      "Battery Life": "Up to 30 hours (NC ON)",
      "Weight": "250 g",
      "Warranty": "1 Year Brand Warranty"
    },
    "variants": [
      {
        "variant_id": "el_4_v1",
        "variant_value": "Matte Black",
        "attributes": {
          "Color": "Matte Black"
        },
        "price": 25000,
        "stock_quantity": 3
      },
      {
        "variant_id": "el_4_v2",
        "variant_value": "Platinum Silver",
        "attributes": {
          "Color": "Platinum Silver"
        },
        "price": 25000,
        "stock_quantity": 0
      },
      {
        "variant_id": "el_4_v3",
        "variant_value": "Midnight Blue",
        "attributes": {
          "Color": "Midnight Blue"
        },
        "price": 26500,
        "stock_quantity": 2
      }
    ]
  },
  {
    "product_id": "el_5",
    "id": "el_5",
    "category": "electronics",
    "category_name": "Electronics",
    "name": "Mirrorless Digital Camera",
    "title": "Mirrorless Digital Camera",
    "description": "Capture stunning photos and 4K video.",
    "price": 85000,
    "stock_quantity": 12,
    "tags": "electronics, cameras",
    "rating": 4.7,
    "reviews_count": 65,
    "thumbnail": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "el_6",
    "id": "el_6",
    "category": "electronics",
    "category_name": "Electronics",
    "name": "Next-Gen Gaming Console",
    "title": "Next-Gen Gaming Console",
    "description": "Experience immersive gaming with ultra-fast load times, ray tracing, and haptic feedback triggers.",
    "price": 50000,
    "stock_quantity": 0,
    "tags": "electronics, gaming, best",
    "rating": 4.9,
    "reviews_count": 510,
    "thumbnail": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "fa_1",
    "id": "fa_1",
    "category": "fashion",
    "category_name": "Fashion",
    "name": "Men's Tailored Suit",
    "title": "Men's Tailored Suit",
    "description": "Bespoke wool-blend formal suit with notched lapels and satin lining. Handcrafted tailoring ensures a contemporary yet comfortable silhouette.",
    "price": 12000,
    "mrp": 18000,
    "discount_percentage": 33,
    "stock_quantity": 30,
    "tags": "fashion, men, new, formal, suits",
    "rating": 4.8,
    "reviews_count": 45,
    "brand": "Armani",
    "thumbnail": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
      }
    ],
    "is_new": true,
    "features": [
      "Italian wool-blend fabric with natural stretch for comfort",
      "Full canvas construction for crisp fit and structural drape",
      "Two-button jacket with notch lapel, dual vents, and kissing horn buttons",
      "Flat front trousers with unfinished hems for customized tailoring"
    ],
    "specifications": {
      "Brand": "Armani",
      "Material": "80% Virgin Wool, 20% Silk",
      "Fit": "Slim Tailored Fit",
      "Care": "Dry Clean Only",
      "Country of Origin": "Italy"
    },
    "variants": [
      {
        "variant_id": "fa_1_v1",
        "variant_value": "Navy / 38R",
        "attributes": {
          "Color": "Navy",
          "Size": "38R"
        },
        "price": 12000,
        "stock_quantity": 8
      },
      {
        "variant_id": "fa_1_v2",
        "variant_value": "Navy / 40R",
        "attributes": {
          "Color": "Navy",
          "Size": "40R"
        },
        "price": 12000,
        "stock_quantity": 12
      },
      {
        "variant_id": "fa_1_v3",
        "variant_value": "Charcoal / 40R",
        "attributes": {
          "Color": "Charcoal",
          "Size": "40R"
        },
        "price": 13500,
        "stock_quantity": 10
      },
      {
        "variant_id": "fa_1_v4",
        "variant_value": "Charcoal / 42R",
        "attributes": {
          "Color": "Charcoal",
          "Size": "42R"
        },
        "price": 13500,
        "stock_quantity": 0
      }
    ]
  },
  {
    "product_id": "fa_2",
    "id": "fa_2",
    "category": "fashion",
    "category_name": "Fashion",
    "name": "Women's Evening Gown",
    "title": "Women's Evening Gown",
    "description": "Elegant evening gown with intricate detailing.",
    "price": 15000,
    "stock_quantity": 20,
    "tags": "fashion, women",
    "rating": 4.7,
    "reviews_count": 38,
    "thumbnail": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fa_3",
    "id": "fa_3",
    "category": "fashion",
    "category_name": "Fashion",
    "name": "Designer Leather Sneakers",
    "title": "Designer Leather Sneakers",
    "description": "Comfortable and stylish leather sneakers.",
    "price": 4500,
    "stock_quantity": 50,
    "tags": "fashion, footwear, best",
    "rating": 4.5,
    "reviews_count": 112,
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "fa_4",
    "id": "fa_4",
    "category": "fashion",
    "category_name": "Fashion",
    "name": "Classic Aviator Sunglasses",
    "title": "Classic Aviator Sunglasses",
    "description": "Timeless aviator sunglasses with polarized lenses.",
    "price": 2500,
    "stock_quantity": 80,
    "tags": "fashion, accessories",
    "rating": 4.6,
    "reviews_count": 230,
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fa_5",
    "id": "fa_5",
    "category": "fashion",
    "category_name": "Fashion",
    "name": "Traditional Silk Saree",
    "title": "Traditional Silk Saree",
    "description": "Exquisite silk saree for festive occasions.",
    "price": 18000,
    "stock_quantity": 15,
    "tags": "fashion, ethnic",
    "rating": 4.9,
    "reviews_count": 75,
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fa_6",
    "id": "fa_6",
    "category": "fashion",
    "category_name": "Fashion",
    "name": "High-Performance Activewear Set",
    "title": "High-Performance Activewear Set",
    "description": "Breathable and stretchable activewear for intense workouts.",
    "price": 3000,
    "stock_quantity": 60,
    "tags": "fashion, activewear",
    "rating": 4.7,
    "reviews_count": 150,
    "thumbnail": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hl_1",
    "id": "hl_1",
    "category": "home-living",
    "category_name": "Home & Living",
    "name": "Modern Velvet Sofa",
    "title": "Modern Velvet Sofa",
    "description": "Plush velvet sofa to elevate your living room.",
    "price": 45000,
    "stock_quantity": 5,
    "tags": "home-living, furniture, new",
    "rating": 4.8,
    "reviews_count": 22,
    "thumbnail": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "hl_2",
    "id": "hl_2",
    "category": "home-living",
    "category_name": "Home & Living",
    "name": "Abstract Wall Art",
    "title": "Abstract Wall Art",
    "description": "Vibrant abstract canvas painting.",
    "price": 3500,
    "stock_quantity": 20,
    "tags": "home-living, decor",
    "rating": 4.5,
    "reviews_count": 45,
    "thumbnail": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hl_3",
    "id": "hl_3",
    "category": "home-living",
    "category_name": "Home & Living",
    "name": "Non-Stick Cookware Set",
    "title": "Non-Stick Cookware Set",
    "description": "Complete 10-piece non-stick cookware set.",
    "price": 8000,
    "stock_quantity": 35,
    "tags": "home-living, kitchen, best",
    "rating": 4.6,
    "reviews_count": 110,
    "thumbnail": "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "hl_4",
    "id": "hl_4",
    "category": "home-living",
    "category_name": "Home & Living",
    "name": "Luxury Egyptian Cotton Bed Sheets",
    "title": "Luxury Egyptian Cotton Bed Sheets",
    "description": "Soft and breathable 1000-thread count sheets.",
    "price": 4000,
    "stock_quantity": 50,
    "tags": "home-living, bedding",
    "rating": 4.9,
    "reviews_count": 280,
    "thumbnail": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hl_5",
    "id": "hl_5",
    "category": "home-living",
    "category_name": "Home & Living",
    "name": "Minimalist Floor Lamp",
    "title": "Minimalist Floor Lamp",
    "description": "Sleek floor lamp with adjustable brightness.",
    "price": 5500,
    "stock_quantity": 25,
    "tags": "home-living, lighting",
    "rating": 4.4,
    "reviews_count": 65,
    "thumbnail": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hl_6",
    "id": "hl_6",
    "category": "home-living",
    "category_name": "Home & Living",
    "name": "Ceramic Plant Pots Set",
    "title": "Ceramic Plant Pots Set",
    "description": "Set of 3 decorative ceramic pots for indoor plants.",
    "price": 1200,
    "stock_quantity": 100,
    "tags": "home-living, garden",
    "rating": 4.7,
    "reviews_count": 140,
    "thumbnail": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "be_1",
    "id": "be_1",
    "category": "beauty",
    "category_name": "Beauty",
    "name": "Hyaluronic Acid Face Serum",
    "title": "Hyaluronic Acid Face Serum",
    "description": "Deeply hydrating serum for a glowing complexion.",
    "price": 1200,
    "stock_quantity": 100,
    "tags": "beauty, skincare, best",
    "rating": 4.8,
    "reviews_count": 450,
    "thumbnail": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "be_2",
    "id": "be_2",
    "category": "beauty",
    "category_name": "Beauty",
    "name": "Matte Liquid Lipstick Set",
    "title": "Matte Liquid Lipstick Set",
    "description": "Set of 3 long-lasting matte lipsticks.",
    "price": 1800,
    "stock_quantity": 60,
    "tags": "beauty, cosmetics",
    "rating": 4.6,
    "reviews_count": 220,
    "thumbnail": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "be_3",
    "id": "be_3",
    "category": "beauty",
    "category_name": "Beauty",
    "name": "Signature Eau de Parfum",
    "title": "Signature Eau de Parfum",
    "description": "Elegant and long-lasting floral fragrance.",
    "price": 4500,
    "stock_quantity": 40,
    "tags": "beauty, fragrance, new",
    "rating": 4.9,
    "reviews_count": 180,
    "thumbnail": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "be_4",
    "id": "be_4",
    "category": "beauty",
    "category_name": "Beauty",
    "name": "Argan Oil Hair Mask",
    "title": "Argan Oil Hair Mask",
    "description": "Deep conditioning mask for dry and damaged hair.",
    "price": 950,
    "stock_quantity": 85,
    "tags": "beauty, haircare",
    "rating": 4.7,
    "reviews_count": 310,
    "thumbnail": "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "be_5",
    "id": "be_5",
    "category": "beauty",
    "category_name": "Beauty",
    "name": "Men's Grooming Kit",
    "title": "Men's Grooming Kit",
    "description": "Complete grooming essentials for men.",
    "price": 2200,
    "stock_quantity": 55,
    "tags": "beauty, grooming",
    "rating": 4.8,
    "reviews_count": 140,
    "thumbnail": "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "be_6",
    "id": "be_6",
    "category": "beauty",
    "category_name": "Beauty",
    "name": "Essential Oil Diffuser Blend",
    "title": "Essential Oil Diffuser Blend",
    "description": "Relaxing blend of lavender and chamomile essential oils.",
    "price": 600,
    "stock_quantity": 120,
    "tags": "beauty, wellness",
    "rating": 4.6,
    "reviews_count": 85,
    "thumbnail": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "cl_1",
    "id": "cl_1",
    "category": "clothing",
    "category_name": "Clothing",
    "name": "Oxford Button-Down Shirt",
    "title": "Oxford Button-Down Shirt",
    "description": "Versatile cotton shirt for casual and formal wear.",
    "price": 1500,
    "stock_quantity": 60,
    "tags": "clothing, shirts, best",
    "rating": 4.6,
    "reviews_count": 125,
    "thumbnail": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "cl_2",
    "id": "cl_2",
    "category": "clothing",
    "category_name": "Clothing",
    "name": "Graphic Print T-Shirt",
    "title": "Graphic Print T-Shirt",
    "description": "Comfortable cotton t-shirt with a unique design.",
    "price": 800,
    "stock_quantity": 120,
    "tags": "clothing, t-shirts",
    "rating": 4.5,
    "reviews_count": 210,
    "thumbnail": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "cl_3",
    "id": "cl_3",
    "category": "clothing",
    "category_name": "Clothing",
    "name": "Slim Fit Blue Jeans",
    "title": "Slim Fit Blue Jeans",
    "description": "Classic stretch denim jeans.",
    "price": 2200,
    "stock_quantity": 75,
    "tags": "clothing, jeans",
    "rating": 4.7,
    "reviews_count": 180,
    "thumbnail": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "cl_4",
    "id": "cl_4",
    "category": "clothing",
    "category_name": "Clothing",
    "name": "Formal Tailored Trousers",
    "title": "Formal Tailored Trousers",
    "description": "Sharp and comfortable trousers for office wear.",
    "price": 2500,
    "stock_quantity": 40,
    "tags": "clothing, trousers, new",
    "rating": 4.8,
    "reviews_count": 95,
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "cl_5",
    "id": "cl_5",
    "category": "clothing",
    "category_name": "Clothing",
    "name": "Winter Puffer Jacket",
    "title": "Winter Puffer Jacket",
    "description": "Insulated jacket to keep you warm.",
    "price": 4500,
    "stock_quantity": 30,
    "tags": "clothing, jackets",
    "rating": 4.9,
    "reviews_count": 110,
    "thumbnail": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "cl_6",
    "id": "cl_6",
    "category": "clothing",
    "category_name": "Clothing",
    "name": "Summer Linen Shorts",
    "title": "Summer Linen Shorts",
    "description": "Breathable linen shorts for hot days.",
    "price": 1200,
    "stock_quantity": 85,
    "tags": "clothing, shorts",
    "rating": 4.6,
    "reviews_count": 140,
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_1",
    "id": "me_1",
    "category": "mens",
    "category_name": "Mens",
    "name": "Casual Checkered Shirt",
    "title": "Casual Checkered Shirt",
    "description": "Comfortable cotton checkered shirt.",
    "price": 1400,
    "stock_quantity": 65,
    "tags": "mens, shirts",
    "rating": 4.6,
    "reviews_count": 110,
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_2",
    "id": "me_2",
    "category": "mens",
    "category_name": "Mens",
    "name": "Crew Neck T-Shirt",
    "title": "Crew Neck T-Shirt",
    "description": "Essential plain t-shirt for daily wear.",
    "price": 600,
    "stock_quantity": 150,
    "tags": "mens, t-shirts, best",
    "rating": 4.8,
    "reviews_count": 320,
    "thumbnail": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "me_3",
    "id": "me_3",
    "category": "mens",
    "category_name": "Mens",
    "name": "Luxury Chronograph Watch",
    "title": "Luxury Chronograph Watch",
    "description": "Elegant stainless steel watch.",
    "price": 8500,
    "stock_quantity": 25,
    "tags": "mens, watches",
    "rating": 4.9,
    "reviews_count": 220,
    "thumbnail": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_4",
    "id": "me_4",
    "category": "mens",
    "category_name": "Mens",
    "name": "Formal Leather Shoes",
    "title": "Formal Leather Shoes",
    "description": "Classic oxfords for professional attire.",
    "price": 3500,
    "stock_quantity": 40,
    "tags": "mens, shoes, new",
    "rating": 4.7,
    "reviews_count": 180,
    "thumbnail": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "me_5",
    "id": "me_5",
    "category": "mens",
    "category_name": "Mens",
    "name": "Genuine Leather Wallet",
    "title": "Genuine Leather Wallet",
    "description": "Slim bifold wallet with RFID protection.",
    "price": 1200,
    "stock_quantity": 150,
    "tags": "mens, accessories",
    "rating": 4.7,
    "reviews_count": 340,
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_1",
    "id": "wo_1",
    "category": "women",
    "category_name": "Women",
    "name": "Floral Midi Dress",
    "title": "Floral Midi Dress",
    "description": "Beautiful printed dress for summer.",
    "price": 2200,
    "stock_quantity": 45,
    "tags": "women, dresses, best",
    "rating": 4.7,
    "reviews_count": 130,
    "thumbnail": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "wo_2",
    "id": "wo_2",
    "category": "women",
    "category_name": "Women",
    "name": "Casual Crop Top",
    "title": "Casual Crop Top",
    "description": "Trendy crop top for everyday style.",
    "price": 900,
    "stock_quantity": 80,
    "tags": "women, tops",
    "rating": 4.5,
    "reviews_count": 110,
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_3",
    "id": "wo_3",
    "category": "women",
    "category_name": "Women",
    "name": "Banarasi Silk Saree",
    "title": "Banarasi Silk Saree",
    "description": "Exquisite silk saree with gold zari work.",
    "price": 8500,
    "stock_quantity": 15,
    "tags": "women, sarees, new",
    "rating": 4.9,
    "reviews_count": 85,
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "wo_4",
    "id": "wo_4",
    "category": "women",
    "category_name": "Women",
    "name": "Embroidered Cotton Kurti",
    "title": "Embroidered Cotton Kurti",
    "description": "Comfortable and elegant ethnic kurti.",
    "price": 1500,
    "stock_quantity": 60,
    "tags": "women, kurtis",
    "rating": 4.6,
    "reviews_count": 150,
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_5",
    "id": "wo_5",
    "category": "women",
    "category_name": "Women",
    "name": "Designer Leather Handbag",
    "title": "Designer Leather Handbag",
    "description": "Spacious and elegant tote bag.",
    "price": 4500,
    "stock_quantity": 40,
    "tags": "women, handbags",
    "rating": 4.9,
    "reviews_count": 210,
    "thumbnail": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_6",
    "id": "wo_6",
    "category": "women",
    "category_name": "Women",
    "name": "Pearl Drop Earrings",
    "title": "Pearl Drop Earrings",
    "description": "Classic pearl earrings for any occasion.",
    "price": 1800,
    "stock_quantity": 50,
    "tags": "women, jewelry",
    "rating": 4.8,
    "reviews_count": 160,
    "thumbnail": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ki_1",
    "id": "ki_1",
    "category": "kids",
    "category_name": "Kids",
    "name": "Boys Graphic Tees (Pack of 3)",
    "title": "Boys Graphic Tees (Pack of 3)",
    "description": "Fun and colorful t-shirts for kids.",
    "price": 1200,
    "stock_quantity": 80,
    "tags": "kids, boys-clothing",
    "rating": 4.6,
    "reviews_count": 95,
    "thumbnail": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ki_2",
    "id": "ki_2",
    "category": "kids",
    "category_name": "Kids",
    "name": "Girls Floral Dress",
    "title": "Girls Floral Dress",
    "description": "Cute floral dress for summer days.",
    "price": 1500,
    "stock_quantity": 60,
    "tags": "kids, girls-clothing, new",
    "rating": 4.8,
    "reviews_count": 110,
    "thumbnail": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "ki_3",
    "id": "ki_3",
    "category": "kids",
    "category_name": "Kids",
    "name": "Baby Cotton Onesie Set",
    "title": "Baby Cotton Onesie Set",
    "description": "Soft and breathable onesies for babies.",
    "price": 900,
    "stock_quantity": 100,
    "tags": "kids, baby-clothes",
    "rating": 4.9,
    "reviews_count": 240,
    "thumbnail": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ki_4",
    "id": "ki_4",
    "category": "kids",
    "category_name": "Kids",
    "name": "Building Blocks Set",
    "title": "Building Blocks Set",
    "description": "Creative building blocks to spark imagination.",
    "price": 1500,
    "stock_quantity": 100,
    "tags": "kids, toys, best",
    "rating": 4.8,
    "reviews_count": 320,
    "thumbnail": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "ki_5",
    "id": "ki_5",
    "category": "kids",
    "category_name": "Kids",
    "name": "Cute Animal Backpack",
    "title": "Cute Animal Backpack",
    "description": "Adorable backpack for school or day trips.",
    "price": 800,
    "stock_quantity": 60,
    "tags": "kids, school-supplies",
    "rating": 4.7,
    "reviews_count": 140,
    "thumbnail": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gf_1",
    "id": "gf_1",
    "category": "gifts",
    "category_name": "Gifts",
    "name": "Engraved Wood Keepsake Box",
    "title": "Engraved Wood Keepsake Box",
    "description": "Personalized wooden box for special memories.",
    "price": 1800,
    "stock_quantity": 40,
    "tags": "gifts, personalized, best",
    "rating": 4.8,
    "reviews_count": 125,
    "thumbnail": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "gf_2",
    "id": "gf_2",
    "category": "gifts",
    "category_name": "Gifts",
    "name": "Premium Diwali Gift Hamper",
    "title": "Premium Diwali Gift Hamper",
    "description": "Assorted sweets and dry fruits for festivals.",
    "price": 3500,
    "stock_quantity": 200,
    "tags": "gifts, festive",
    "rating": 4.9,
    "reviews_count": 310,
    "thumbnail": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gf_3",
    "id": "gf_3",
    "category": "gifts",
    "category_name": "Gifts",
    "name": "Executive Pen and Notebook Set",
    "title": "Executive Pen and Notebook Set",
    "description": "Elegant corporate gift set.",
    "price": 1200,
    "stock_quantity": 150,
    "tags": "gifts, corporate",
    "rating": 4.6,
    "reviews_count": 90,
    "thumbnail": "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gf_4",
    "id": "gf_4",
    "category": "gifts",
    "category_name": "Gifts",
    "name": "Romantic Anniversary Bouquet",
    "title": "Romantic Anniversary Bouquet",
    "description": "Beautiful arrangement of fresh red roses.",
    "price": 2000,
    "stock_quantity": 30,
    "tags": "gifts, anniversary, new",
    "rating": 4.8,
    "reviews_count": 145,
    "thumbnail": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "gf_5",
    "id": "gf_5",
    "category": "gifts",
    "category_name": "Gifts",
    "name": "Birthday Care Package",
    "title": "Birthday Care Package",
    "description": "Fun box filled with snacks and a birthday mug.",
    "price": 1500,
    "stock_quantity": 60,
    "tags": "gifts, birthday",
    "rating": 4.7,
    "reviews_count": 210,
    "thumbnail": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gf_6",
    "id": "gf_6",
    "category": "gifts",
    "category_name": "Gifts",
    "name": "Crystal Wine Glasses (Set of 2)",
    "title": "Crystal Wine Glasses (Set of 2)",
    "description": "Elegant crystal glasses for wedding gifts.",
    "price": 2800,
    "stock_quantity": 40,
    "tags": "gifts, wedding",
    "rating": 4.9,
    "reviews_count": 85,
    "thumbnail": "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hf_1",
    "id": "hf_1",
    "category": "healthy-foods",
    "category_name": "Healthy Foods",
    "name": "Organic Almond Snacks",
    "title": "Organic Almond Snacks",
    "description": "Lightly salted, roasted organic almonds.",
    "price": 450,
    "stock_quantity": 150,
    "tags": "healthy-foods, organic-snacks, best",
    "rating": 4.8,
    "reviews_count": 320,
    "thumbnail": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80"
      }
    ],
    "is_bestseller": true
  },
  {
    "product_id": "hf_2",
    "id": "hf_2",
    "category": "healthy-foods",
    "category_name": "Healthy Foods",
    "name": "Gluten-Free Oats",
    "title": "Gluten-Free Oats",
    "description": "100% whole grain gluten-free oats.",
    "price": 300,
    "stock_quantity": 200,
    "tags": "healthy-foods, gluten-free",
    "rating": 4.7,
    "reviews_count": 210,
    "thumbnail": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hf_3",
    "id": "hf_3",
    "category": "healthy-foods",
    "category_name": "Healthy Foods",
    "name": "Vegan Protein Powder",
    "title": "Vegan Protein Powder",
    "description": "Plant-based protein powder, chocolate flavor.",
    "price": 1800,
    "stock_quantity": 120,
    "tags": "healthy-foods, vegan-essentials",
    "rating": 4.6,
    "reviews_count": 450,
    "thumbnail": "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hf_4",
    "id": "hf_4",
    "category": "healthy-foods",
    "category_name": "Healthy Foods",
    "name": "Chia Seeds Superfood",
    "title": "Chia Seeds Superfood",
    "description": "Rich in Omega-3, fiber, and protein.",
    "price": 500,
    "stock_quantity": 300,
    "tags": "healthy-foods, superfoods, new",
    "rating": 4.9,
    "reviews_count": 530,
    "thumbnail": "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800&q=80"
      }
    ],
    "is_new": true
  },
  {
    "product_id": "hf_5",
    "id": "hf_5",
    "category": "healthy-foods",
    "category_name": "Healthy Foods",
    "name": "Keto Diet Snack Bars",
    "title": "Keto Diet Snack Bars",
    "description": "Low carb, high protein snack bars.",
    "price": 800,
    "stock_quantity": 80,
    "tags": "healthy-foods, diet-nutrition",
    "rating": 4.5,
    "reviews_count": 150,
    "thumbnail": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hf_6",
    "id": "hf_6",
    "category": "healthy-foods",
    "category_name": "Healthy Foods",
    "name": "Organic Green Tea",
    "title": "Organic Green Tea",
    "description": "Antioxidant-rich organic green tea leaves.",
    "price": 350,
    "stock_quantity": 250,
    "tags": "healthy-foods, healthy-beverages",
    "rating": 4.8,
    "reviews_count": 410,
    "thumbnail": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_boot_1",
    "id": "fw_boot_1",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "boots",
    "name": "Woodland Men Tan Brown Genuine Leather Rugged Ankle Boots",
    "title": "Woodland Men Tan Brown Genuine Leather Rugged Ankle Boots",
    "description": "Trek with unmatched confidence in these Woodland genuine nubuck leather ankle boots. Engineered with a cushioned collar, shock-absorbing rubber lug sole, and rust-resistant metal eyelets for all-terrain durability.",
    "price": 4299,
    "mrp": 5495,
    "discount_percentage": 22,
    "stock_quantity": 35,
    "tags": "footwear, boots, men, leather, outdoor, rugged, winterwear",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Woodland",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
      }
    ],
    "features": [
      "100% Genuine Nubuck Oiled Leather Upper",
      "Deep cleated TPR outsole for high-traction grip",
      "Padded ankle collar for fatigue-free trekking",
      "Rust-proof brass eyelets with braided laces"
    ],
    "specifications": {
      "Type": "Ankle Boots",
      "Material": "Genuine Leather",
      "Sole": "TPR Rubber Lug",
      "Fastening": "Lace-Up",
      "Warranty": "6 Months Brand Warranty"
    },
    "variants": [
      {
        "variant_id": "fw_boot_1_v1",
        "variant_value": "UK 7 / Tan Brown",
        "attributes": {
          "Size": "UK 7",
          "Color": "Tan Brown"
        },
        "price": 4299,
        "stock_quantity": 10
      },
      {
        "variant_id": "fw_boot_1_v2",
        "variant_value": "UK 8 / Tan Brown",
        "attributes": {
          "Size": "UK 8",
          "Color": "Tan Brown"
        },
        "price": 4299,
        "stock_quantity": 15
      },
      {
        "variant_id": "fw_boot_1_v3",
        "variant_value": "UK 9 / Tan Brown",
        "attributes": {
          "Size": "UK 9",
          "Color": "Tan Brown"
        },
        "price": 4299,
        "stock_quantity": 10
      }
    ]
  },
  {
    "product_id": "fw_boot_2",
    "id": "fw_boot_2",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "boots",
    "name": "Carlton London Women Solid Block-Heeled Chelsea Boots",
    "title": "Carlton London Women Solid Block-Heeled Chelsea Boots",
    "description": "Elevate your autumn and winter fashion with Carlton London Chelsea boots. Features elasticated side gussets, convenient pull tabs, and a stable 2.5-inch block heel for comfortable all-day wear.",
    "price": 2899,
    "mrp": 4499,
    "discount_percentage": 36,
    "stock_quantity": 28,
    "tags": "footwear, boots, women, chelsea, block-heel, stylish, winterwear",
    "rating": 4.7,
    "reviews_count": 185,
    "brand": "Carlton London",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=80"
      }
    ],
    "features": [
      "Premium vegan faux-leather with matte finish",
      "Elasticated stretch side panels for effortless slip-on",
      "Cushioned footbed with anti-slip grooved sole",
      "2.5 inch stacked block heel"
    ],
    "specifications": {
      "Type": "Chelsea Boots",
      "Heel Height": "2.5 Inches",
      "Upper Material": "Synthetic Leather",
      "Sole": "Resin Rubber",
      "Closure": "Slip-On"
    }
  },
  {
    "product_id": "fw_cas_1",
    "id": "fw_cas_1",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "casual-shoes",
    "name": "Red Tape Men Perforated Slip-On Loafers",
    "title": "Red Tape Men Perforated Slip-On Loafers",
    "description": "Classy and effortless, these Red Tape casual slip-on loafers boast subtle laser-cut perforations for air circulation and a cushioned memory foam insole for cloud-like stepping.",
    "price": 1799,
    "mrp": 4299,
    "discount_percentage": 58,
    "stock_quantity": 45,
    "tags": "footwear, casual-shoes, loafers, slip-ons, men, smart-casual",
    "rating": 4.6,
    "reviews_count": 310,
    "brand": "Red Tape",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_cas_2",
    "id": "fw_cas_2",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "casual-shoes",
    "name": "Bata Contemporary Canvas Walking Slip-On Shoes",
    "title": "Bata Contemporary Canvas Walking Slip-On Shoes",
    "description": "Ultra-lightweight everyday canvas shoes with dual side elastic stretch for simple slide-in access and flexible vulcanized sole.",
    "price": 1299,
    "mrp": 1999,
    "discount_percentage": 35,
    "stock_quantity": 60,
    "tags": "footwear, casual-shoes, canvas, everyday, bata, lightweight",
    "rating": 4.5,
    "reviews_count": 140,
    "brand": "Bata",
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_flip_1",
    "id": "fw_flip_1",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Crocs Classic Unisex Water-Resistant Lightweight Clogs",
    "title": "Crocs Classic Unisex Water-Resistant Lightweight Clogs",
    "description": "Iconic Crocs comfort made with Croslite foam cushioning. Ventilation ports shed water and debris quickly, while the pivoting heel strap offers a secure fit.",
    "price": 2995,
    "mrp": 3495,
    "discount_percentage": 14,
    "stock_quantity": 80,
    "tags": "footwear, flip-flops-slippers, clogs, waterproof, summer, beach",
    "rating": 4.9,
    "reviews_count": 620,
    "brand": "Crocs",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_flip_2",
    "id": "fw_flip_2",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Puma Popcat 20 Soft Comfort Slide Slippers",
    "title": "Puma Popcat 20 Soft Comfort Slide Slippers",
    "description": "Step into unmatched leisure with the Puma Popcat 20. Featuring a padded synthetic leather strap and molded EVA outsole for timeless post-workout relaxation.",
    "price": 1299,
    "mrp": 1999,
    "discount_percentage": 35,
    "stock_quantity": 75,
    "tags": "footwear, flip-flops-slippers, slides, puma, comfort, unisex",
    "rating": 4.7,
    "reviews_count": 280,
    "brand": "Puma",
    "thumbnail": "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_san_1",
    "id": "fw_san_1",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sandals",
    "name": "Woodland Khaki Multi-Strap Outdoor Trekking Sandals",
    "title": "Woodland Khaki Multi-Strap Outdoor Trekking Sandals",
    "description": "Rugged outdoor sandals built with genuine suede leather straps, adjustable velcro closures, and grooved rubber outsoles for summer hikes and monsoon walks.",
    "price": 2499,
    "mrp": 3695,
    "discount_percentage": 32,
    "stock_quantity": 40,
    "tags": "footwear, sandals, men, outdoor, trekking, woodland, leather",
    "rating": 4.6,
    "reviews_count": 190,
    "brand": "Woodland",
    "thumbnail": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_san_2",
    "id": "fw_san_2",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sandals",
    "name": "Bata Women Shimmer Criss-Cross Ankle-Strap Flat Sandals",
    "title": "Bata Women Shimmer Criss-Cross Ankle-Strap Flat Sandals",
    "description": "Dainty metallic strap flat sandals with a cushioned footbed, ideal for festive celebrations, ethnic outfits, and casual weekend brunches.",
    "price": 1199,
    "mrp": 1699,
    "discount_percentage": 29,
    "stock_quantity": 50,
    "tags": "footwear, sandals, women, ethnic, festive, flats, shimmer",
    "rating": 4.7,
    "reviews_count": 115,
    "brand": "Bata",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_snk_1",
    "id": "fw_snk_1",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sneakers",
    "name": "Nike Court Vision Low Retro Chunky Leather Sneakers",
    "title": "Nike Court Vision Low Retro Chunky Leather Sneakers",
    "description": "Drawing inspiration from mid-80s basketball shoes, the Nike Court Vision Low blends stitched leather overlays with a sleek, padded low-cut collar.",
    "price": 4995,
    "mrp": 5995,
    "discount_percentage": 17,
    "stock_quantity": 50,
    "tags": "footwear, sneakers, nike, white sneakers, streetwear, bestseller",
    "rating": 4.9,
    "reviews_count": 480,
    "brand": "Nike",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_snk_2",
    "id": "fw_snk_2",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sneakers",
    "name": "Puma Smashic Low-Top Lace-Up Casual Sneakers",
    "title": "Puma Smashic Low-Top Lace-Up Casual Sneakers",
    "description": "Clean court style remastered for daily city adventures. Features Puma softfoam+ sockliner for instantaneous step-in cushioning.",
    "price": 2199,
    "mrp": 4499,
    "discount_percentage": 51,
    "stock_quantity": 65,
    "tags": "footwear, sneakers, puma, casual, white sneakers, unisex, new",
    "rating": 4.7,
    "reviews_count": 220,
    "brand": "Puma",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_spt_1",
    "id": "fw_spt_1",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sports-shoes",
    "name": "Adidas Men Duramo SL Lightweight Running Sports Shoes",
    "title": "Adidas Men Duramo SL Lightweight Running Sports Shoes",
    "description": "Stay light on your feet with breathable mesh uppers and Lightmotion responsive cushioning, perfect for morning sprints, gym workouts, or 5K runs.",
    "price": 3299,
    "mrp": 4999,
    "discount_percentage": 34,
    "stock_quantity": 45,
    "tags": "footwear, sports-shoes, running, adidas, gym, athletic, sports-fitness",
    "rating": 4.8,
    "reviews_count": 360,
    "brand": "Adidas",
    "thumbnail": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "fw_spt_2",
    "id": "fw_spt_2",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sports-shoes",
    "name": "Skechers Go Run Air Cushion Breathable Athletic Shoes",
    "title": "Skechers Go Run Air Cushion Breathable Athletic Shoes",
    "description": "Experience revolutionary comfort with Skechers Air-Cooled Goga Mat breathable insole and responsive 5GEN midsole cushioning.",
    "price": 4199,
    "mrp": 5999,
    "discount_percentage": 30,
    "stock_quantity": 30,
    "tags": "footwear, sports-shoes, walking, athletic, skechers, air-cushion",
    "rating": 4.9,
    "reviews_count": 175,
    "brand": "Skechers",
    "thumbnail": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gad_sw_1",
    "id": "gad_sw_1",
    "category": "gadgets",
    "category_name": "Gadgets",
    "subcategory": "smart-wearables",
    "name": "Noise ColorFit Pulse Grand 1.69-Inch HD Smartwatch",
    "title": "Noise ColorFit Pulse Grand 1.69-Inch HD Smartwatch",
    "description": "Vibrant 1.69-inch LCD touch screen with 60 sports modes, 150+ cloud watch faces, 24/7 heart rate monitor, and fast charging giving 25 hours in 15 mins.",
    "price": 1499,
    "mrp": 3999,
    "discount_percentage": 63,
    "stock_quantity": 90,
    "tags": "gadgets, smart-wearables, smartwatch, fitness, bluetooth, noise",
    "rating": 4.6,
    "reviews_count": 510,
    "brand": "Noise",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gad_sw_2",
    "id": "gad_sw_2",
    "category": "gadgets",
    "category_name": "Gadgets",
    "subcategory": "smart-wearables",
    "name": "Apple Watch SE (2nd Gen) GPS 44mm Retina Display",
    "title": "Apple Watch SE (2nd Gen) GPS 44mm Retina Display",
    "description": "Essential features to help you stay connected, active, healthy, and safe. Crash Detection, enhanced workout metrics, and water resistance up to 50 meters.",
    "price": 27900,
    "mrp": 29900,
    "discount_percentage": 7,
    "stock_quantity": 25,
    "tags": "gadgets, smart-wearables, apple, smartwatch, ios, premium",
    "rating": 4.9,
    "reviews_count": 320,
    "brand": "Apple",
    "thumbnail": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gad_fit_1",
    "id": "gad_fit_1",
    "category": "gadgets",
    "category_name": "Gadgets",
    "subcategory": "fitness-gadgets",
    "name": "boAt Wave Call 2 Bluetooth Calling Smart Fitness Band",
    "title": "boAt Wave Call 2 Bluetooth Calling Smart Fitness Band",
    "description": "Ultra-crisp 1.83-inch HD display, continuous heart rate and SpO2 tracking, 700+ active sports modes, and up to 10 days of battery life.",
    "price": 1299,
    "mrp": 4990,
    "discount_percentage": 74,
    "stock_quantity": 110,
    "tags": "gadgets, fitness-gadgets, boat, fitness band, tracker, health",
    "rating": 4.5,
    "reviews_count": 420,
    "brand": "boAt",
    "thumbnail": "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gad_hp_1",
    "id": "gad_hp_1",
    "category": "gadgets",
    "category_name": "Gadgets",
    "subcategory": "headphones",
    "name": "boAt Rockerz 550 Wireless Dynamic Bass Headphones",
    "title": "boAt Rockerz 550 Wireless Dynamic Bass Headphones",
    "description": "Immerse into thunderous acoustics powered by 50mm dynamic drivers. Features plush ergonomic earcups and up to 20 hours of continuous non-stop playtime.",
    "price": 1999,
    "mrp": 4999,
    "discount_percentage": 60,
    "stock_quantity": 65,
    "tags": "gadgets, headphones, boat, wireless, bass, over-ear, audio",
    "rating": 4.7,
    "reviews_count": 380,
    "brand": "boAt",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gad_spk_1",
    "id": "gad_spk_1",
    "category": "gadgets",
    "category_name": "Gadgets",
    "subcategory": "speakers",
    "name": "JBL Flip 6 Waterproof Portable Bluetooth Bass Speaker",
    "title": "JBL Flip 6 Waterproof Portable Bluetooth Bass Speaker",
    "description": "Bold JBL Original Pro Sound with a 2-way speaker system delivering exceptional clarity and deep booming bass. IP67 waterproof and dustproof with 12 hours playback.",
    "price": 9999,
    "mrp": 13999,
    "discount_percentage": 29,
    "stock_quantity": 40,
    "tags": "gadgets, speakers, jbl, bluetooth, waterproof, portable, party",
    "rating": 4.9,
    "reviews_count": 450,
    "brand": "JBL",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "jwl_fj_1",
    "id": "jwl_fj_1",
    "category": "jewellery",
    "category_name": "Jewellery",
    "subcategory": "fashion-jewellery",
    "name": "Zaveri Pearls 24K Gold-Plated Kundan Choker Necklace Set",
    "title": "Zaveri Pearls 24K Gold-Plated Kundan Choker Necklace Set",
    "description": "Timeless Indian heritage design featuring hand-set Kundan stones, delicate green bead drops, matching jhumka earrings, and a maang tikka.",
    "price": 1299,
    "mrp": 4990,
    "discount_percentage": 74,
    "stock_quantity": 55,
    "tags": "jewellery, fashion-jewellery, kundan, choker, wedding, ethnic, bridal",
    "rating": 4.8,
    "reviews_count": 320,
    "brand": "Zaveri Pearls",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "jwl_wat_1",
    "id": "jwl_wat_1",
    "category": "jewellery",
    "category_name": "Jewellery",
    "subcategory": "watches",
    "name": "Titan Neo Analog Classic Champagne Dial Stainless Steel Watch",
    "title": "Titan Neo Analog Classic Champagne Dial Stainless Steel Watch",
    "description": "Exemplify executive grace with Titan Neo. Shimmering champagne sunburst dial encased in polished mineral glass with a stainless steel link bracelet.",
    "price": 3995,
    "mrp": 4995,
    "discount_percentage": 20,
    "stock_quantity": 40,
    "tags": "jewellery, watches, titan, analog, men, formal, stainless-steel",
    "rating": 4.8,
    "reviews_count": 215,
    "brand": "Titan",
    "thumbnail": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "jwl_wat_2",
    "id": "jwl_wat_2",
    "category": "jewellery",
    "category_name": "Jewellery",
    "subcategory": "watches",
    "name": "Fossil Jacqueline Rose Gold-Tone Diamond Dial Women Watch",
    "title": "Fossil Jacqueline Rose Gold-Tone Diamond Dial Women Watch",
    "description": "Designed for the modern sophisticate, the Jacqueline watch features a refined 36mm rose gold stainless steel case and crystal indices.",
    "price": 7495,
    "mrp": 9995,
    "discount_percentage": 25,
    "stock_quantity": 30,
    "tags": "jewellery, watches, fossil, rose-gold, women, luxury, gift",
    "rating": 4.9,
    "reviews_count": 195,
    "brand": "Fossil",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "jwl_brc_1",
    "id": "jwl_brc_1",
    "category": "jewellery",
    "category_name": "Jewellery",
    "subcategory": "bracelets",
    "name": "GIVA 925 Sterling Silver Crystal Zircon Charm Bracelet",
    "title": "GIVA 925 Sterling Silver Crystal Zircon Charm Bracelet",
    "description": "Hallmarked 925 pure sterling silver adorned with sparkling AAA+ cubic zirconia crystals. Rhodium e-coat prevents tarnishing and retains lustrous shine.",
    "price": 1699,
    "mrp": 3299,
    "discount_percentage": 48,
    "stock_quantity": 60,
    "tags": "jewellery, bracelets, giva, silver, 925, charm, gifting, bestseller",
    "rating": 4.9,
    "reviews_count": 270,
    "brand": "Giva",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1611591475806-905581e285a7?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1611591475806-905581e285a7?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_dr_1",
    "id": "ww_dr_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "dresses",
    "name": "Vero Moda Floral Print Tiered Fit-and-Flare Midi Dress",
    "title": "Vero Moda Floral Print Tiered Fit-and-Flare Midi Dress",
    "description": "Bask in sunny elegance with this breezy Vero Moda tiered midi dress. Featuring subtle puff sleeves, a flattering V-neckline, and an empire waistline.",
    "price": 2299,
    "mrp": 3999,
    "discount_percentage": 43,
    "stock_quantity": 48,
    "tags": "western-wear, dresses, clothing, vero-moda, floral, midi, summer",
    "rating": 4.7,
    "reviews_count": 165,
    "brand": "Vero Moda",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_dr_2",
    "id": "ww_dr_2",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "dresses",
    "name": "ONLY Solid Emerald Green Satin Slip Bodycon Party Dress",
    "title": "ONLY Solid Emerald Green Satin Slip Bodycon Party Dress",
    "description": "Turn heads at evening galas in this luxurious emerald satin cowl-neck slip dress with adjustable criss-cross back straps.",
    "price": 1899,
    "mrp": 3299,
    "discount_percentage": 42,
    "stock_quantity": 35,
    "tags": "western-wear, dresses, clothing, party, bodycon, satin, evening",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "ONLY",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_jj_1",
    "id": "ww_jj_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "jeans-jeggings",
    "name": "Levi's 711 High-Rise Skinny Stretch Indigo Denim Jeans",
    "title": "Levi's 711 High-Rise Skinny Stretch Indigo Denim Jeans",
    "description": "The ultimate figure-hugging skinny jean designed with Levi's Sculpt Hyperstretch fabric for exceptional hold that never sags.",
    "price": 2599,
    "mrp": 3999,
    "discount_percentage": 35,
    "stock_quantity": 70,
    "tags": "western-wear, jeans-jeggings, clothing, levis, denim, skinny, jeans",
    "rating": 4.9,
    "reviews_count": 420,
    "brand": "Levi's",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_top_1",
    "id": "ww_top_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "tops",
    "name": "H&M Sweetheart Neck Puff-Sleeve Ruched Peplum Top",
    "title": "H&M Sweetheart Neck Puff-Sleeve Ruched Peplum Top",
    "description": "Flirty and feminine, this cotton-blend peplum top features ruched front detailing, romantic puff sleeves, and a flattering smocked back.",
    "price": 1299,
    "mrp": 1999,
    "discount_percentage": 35,
    "stock_quantity": 55,
    "tags": "western-wear, tops, clothing, peplum, casual, summer, hm",
    "rating": 4.6,
    "reviews_count": 180,
    "brand": "H&M",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_tp_1",
    "id": "ww_tp_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "trousers-pants",
    "name": "Marks & Spencer High-Waist Pleated Ankle Tapered Trousers",
    "title": "Marks & Spencer High-Waist Pleated Ankle Tapered Trousers",
    "description": "Crisp tailored formal trousers tailored in crease-resistant woven twill with deep front knife pleats and slant pockets.",
    "price": 2499,
    "mrp": 3499,
    "discount_percentage": 29,
    "stock_quantity": 45,
    "tags": "western-wear, trousers-pants, clothing, formal, office, pleated, marks-spencer",
    "rating": 4.8,
    "reviews_count": 130,
    "brand": "Marks & Spencer",
    "thumbnail": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_ts_1",
    "id": "ww_ts_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "t-shirts",
    "name": "Tommy Hilfiger Classic Embroidered Logo Cotton T-Shirt",
    "title": "Tommy Hilfiger Classic Embroidered Logo Cotton T-Shirt",
    "description": "Crafted from 100% organic combed jersey cotton, finished with the signature Hilfiger micro-flag embroidery on the chest.",
    "price": 1699,
    "mrp": 2999,
    "discount_percentage": 43,
    "stock_quantity": 85,
    "tags": "western-wear, t-shirts, clothing, cotton, regular-fit, tommy",
    "rating": 4.7,
    "reviews_count": 290,
    "brand": "Tommy Hilfiger",
    "thumbnail": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_trp_1",
    "id": "ww_trp_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "track-pants",
    "name": "Puma Classic Relaxed-Fit Cotton Fleece Cuffed Track Pants",
    "title": "Puma Classic Relaxed-Fit Cotton Fleece Cuffed Track Pants",
    "description": "Unwind or train in superior comfort. Features brushed French terry fleece interior, ribbed ankle cuffs, and side zip utility pockets.",
    "price": 1799,
    "mrp": 3299,
    "discount_percentage": 45,
    "stock_quantity": 60,
    "tags": "western-wear, track-pants, clothing, athleisure, loungewear, puma",
    "rating": 4.8,
    "reviews_count": 210,
    "brand": "Puma",
    "thumbnail": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_sh_1",
    "id": "ww_sh_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "shirts",
    "name": "GAP Relaxed Oxford Button-Down Crisp Cotton Casual Shirt",
    "title": "GAP Relaxed Oxford Button-Down Crisp Cotton Casual Shirt",
    "description": "A timeless wardrobe essential woven in durable combed cotton Oxford weave with a classic button-down collar and curved hem.",
    "price": 2199,
    "mrp": 3499,
    "discount_percentage": 37,
    "stock_quantity": 50,
    "tags": "western-wear, shirts, clothing, oxford, gap, casual, cotton",
    "rating": 4.8,
    "reviews_count": 175,
    "brand": "GAP",
    "thumbnail": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_leg_1",
    "id": "ww_leg_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "leggings",
    "name": "Go Colors 4-Way Stretch Bio-Washed Cotton Ankle Leggings",
    "title": "Go Colors 4-Way Stretch Bio-Washed Cotton Ankle Leggings",
    "description": "Super-soft 95% cotton and 5% elastane leggings offering unmatched softness, four-way flexibility, and a soft elastic waistband.",
    "price": 699,
    "mrp": 999,
    "discount_percentage": 30,
    "stock_quantity": 120,
    "tags": "western-wear, leggings, clothing, cotton, stretch, dailywear",
    "rating": 4.7,
    "reviews_count": 340,
    "brand": "Go Colors",
    "thumbnail": "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ww_co_1",
    "id": "ww_co_1",
    "category": "western-wear",
    "category_name": "Western Wear",
    "subcategory": "co-ord-sets",
    "name": "ONLY Tailored Blazer & Straight Trouser Co-ord Set",
    "title": "ONLY Tailored Blazer & Straight Trouser Co-ord Set",
    "description": "Chic matching coordinates set featuring a structured single-breasted blazer and matching high-waisted straight leg trousers.",
    "price": 3499,
    "mrp": 5499,
    "discount_percentage": 36,
    "stock_quantity": 30,
    "tags": "western-wear, co-ord-sets, clothing, blazer, suit, formal, only",
    "rating": 4.9,
    "reviews_count": 110,
    "brand": "ONLY",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_bp_1",
    "id": "acc_bp_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "backpacks",
    "name": "Wildcraft 35L Water-Resistant Ergonomic Padded Laptop Backpack",
    "title": "Wildcraft 35L Water-Resistant Ergonomic Padded Laptop Backpack",
    "description": "Engineered for daily urban commuters and explorers. Features a dedicated 15.6-inch padded laptop sleeve, rain-repellent fabric, and ergonomic airflow back support.",
    "price": 1899,
    "mrp": 3299,
    "discount_percentage": 42,
    "stock_quantity": 65,
    "tags": "accessories, backpacks, wildcraft, laptop bag, travel, waterproof",
    "rating": 4.8,
    "reviews_count": 380,
    "brand": "Wildcraft",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_bl_1",
    "id": "acc_bl_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "belts",
    "name": "Tommy Hilfiger Reversible Genuine Leather Belt",
    "title": "Tommy Hilfiger Reversible Genuine Leather Belt",
    "description": "Versatile 2-in-1 reversible strap crafted in premium full-grain leather, switching effortlessly between Black and Tan Brown with a twist-buckle mechanism.",
    "price": 1999,
    "mrp": 3299,
    "discount_percentage": 39,
    "stock_quantity": 50,
    "tags": "accessories, belts, leather, reversible, tommy, men, formal",
    "rating": 4.8,
    "reviews_count": 190,
    "brand": "Tommy Hilfiger",
    "thumbnail": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_ch_1",
    "id": "acc_ch_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "caps-hats",
    "name": "Nike AeroBill Lightweight Dri-FIT Breathable Sports Cap",
    "title": "Nike AeroBill Lightweight Dri-FIT Breathable Sports Cap",
    "description": "Stay cool under scorching sunshine. Features laser-perforated side breathers, moisture-absorbing sweatband, and quick-adjust velcro back closure.",
    "price": 1295,
    "mrp": 1595,
    "discount_percentage": 19,
    "stock_quantity": 70,
    "tags": "accessories, caps-hats, cap, nike, running, sports, unisex",
    "rating": 4.7,
    "reviews_count": 225,
    "brand": "Nike",
    "thumbnail": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_cw_1",
    "id": "acc_cw_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "clutches-wristlets",
    "name": "Lavie Shimmer Metallic Box Handheld Evening Party Clutch",
    "title": "Lavie Shimmer Metallic Box Handheld Evening Party Clutch",
    "description": "Sparkling evening minaudiere clutch featuring a secure crystal clasp closure and detachable chain strap for shoulder or clutch carrying.",
    "price": 1499,
    "mrp": 2999,
    "discount_percentage": 50,
    "stock_quantity": 40,
    "tags": "accessories, clutches-wristlets, clutch, party, evening, shimmer, lavie",
    "rating": 4.8,
    "reviews_count": 145,
    "brand": "Lavie",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_hb_1",
    "id": "acc_hb_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "handbags",
    "name": "Caprese Flora Textured Satchel Handbag with Sling Strap",
    "title": "Caprese Flora Textured Satchel Handbag with Sling Strap",
    "description": "Timeless luxury structured silhouette with gold-tone hardware, multiple divider pockets, and comfortable dual top handles.",
    "price": 2899,
    "mrp": 4999,
    "discount_percentage": 42,
    "stock_quantity": 35,
    "tags": "accessories, handbags, caprese, satchel, luxury, women, shoulder-bag",
    "rating": 4.9,
    "reviews_count": 260,
    "brand": "Caprese",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_sw_1",
    "id": "acc_sw_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "shawls-wraps",
    "name": "Fabindia Pure Fine Wool Handwoven Kashmiri Jamawar Shawl",
    "title": "Fabindia Pure Fine Wool Handwoven Kashmiri Jamawar Shawl",
    "description": "Heritage handloom craftsmanship adorned with intricate paisleys and floral vines in rich festive jewel tones.",
    "price": 3499,
    "mrp": 5500,
    "discount_percentage": 36,
    "stock_quantity": 25,
    "tags": "accessories, shawls-wraps, winterwear, wool, kashmiri, fabindia",
    "rating": 4.9,
    "reviews_count": 160,
    "brand": "Fabindia",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_ss_1",
    "id": "acc_ss_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "socks-stockings",
    "name": "Marks & Spencer 5-Pack Breathable Combed Cotton Socks",
    "title": "Marks & Spencer 5-Pack Breathable Combed Cotton Socks",
    "description": "Reinforced heel and toe with Freshfeet anti-bacterial technology to keep feet dry and odor-free all day long.",
    "price": 799,
    "mrp": 1199,
    "discount_percentage": 33,
    "stock_quantity": 90,
    "tags": "accessories, socks-stockings, cotton, crew, socks, marks-spencer",
    "rating": 4.7,
    "reviews_count": 180,
    "brand": "Marks & Spencer",
    "thumbnail": "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_sc_1",
    "id": "acc_sc_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "stoles-scarves",
    "name": "Fabindia Hand-Block Printed Tussar Silk Lightweight Stole",
    "title": "Fabindia Hand-Block Printed Tussar Silk Lightweight Stole",
    "description": "Lustrous Tussar silk woven stole styled with earthy pigment geometric block prints and fringed hem.",
    "price": 1490,
    "mrp": 2290,
    "discount_percentage": 35,
    "stock_quantity": 40,
    "tags": "accessories, stoles-scarves, silk, stole, scarf, fabindia, artisanal",
    "rating": 4.8,
    "reviews_count": 130,
    "brand": "Fabindia",
    "thumbnail": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_sg_1",
    "id": "acc_sg_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "sunglasses",
    "name": "Ray-Ban Classic Aviator Polarized UV400 Sunglasses",
    "title": "Ray-Ban Classic Aviator Polarized UV400 Sunglasses",
    "description": "The golden standard of eyewear. Features iconic teardrop lenses with crystal green G-15 tint and lightweight gold-toned metal frame.",
    "price": 6590,
    "mrp": 7990,
    "discount_percentage": 18,
    "stock_quantity": 35,
    "tags": "accessories, sunglasses, ray-ban, polarized, luxury, aviator",
    "rating": 4.9,
    "reviews_count": 310,
    "brand": "Ray-Ban",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "acc_wl_1",
    "id": "acc_wl_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "wallets",
    "name": "Fossil Derrick RFID-Blocking Bi-Fold Leather Wallet",
    "title": "Fossil Derrick RFID-Blocking Bi-Fold Leather Wallet",
    "description": "Crafted in dark brown tumbled leather with 8 card slots, 2 slip pockets, and a lined bill compartment with built-in RFID protection.",
    "price": 2895,
    "mrp": 3995,
    "discount_percentage": 28,
    "stock_quantity": 50,
    "tags": "accessories, wallets, fossil, rfid, leather, men, bi-fold",
    "rating": 4.9,
    "reviews_count": 240,
    "brand": "Fossil",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_kss_1",
    "id": "eth_kss_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "kurta-suit-sets",
    "name": "Biba Pure Cotton Floral Print Straight Kurta with Palazzo & Dupatta",
    "title": "Biba Pure Cotton Floral Print Straight Kurta with Palazzo & Dupatta",
    "description": "Graceful three-piece ethnic ensemble featuring a round-neck cotton straight kurta, matching printed wide palazzos, and a feather-light chiffon dupatta with lace borders.",
    "price": 2799,
    "mrp": 4299,
    "discount_percentage": 35,
    "stock_quantity": 55,
    "tags": "ethnic-wear, kurta-suit-sets, clothing, biba, cotton, palazzo, dupatta",
    "rating": 4.8,
    "reviews_count": 320,
    "brand": "Biba",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_kss_2",
    "id": "eth_kss_2",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "kurta-suit-sets",
    "name": "W for Woman Embroidered Chanderi Silk Kurta Suit Set with Organza Dupatta",
    "title": "W for Woman Embroidered Chanderi Silk Kurta Suit Set with Organza Dupatta",
    "description": "Royal celebratory suit set featuring fine zari work along the yoke, tailored cigarette pants, and a scalloped floral organza dupatta.",
    "price": 4299,
    "mrp": 6999,
    "discount_percentage": 39,
    "stock_quantity": 30,
    "tags": "ethnic-wear, kurta-suit-sets, clothing, chanderi, silk, festive, wedding",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "W for Woman",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_kbs_1",
    "id": "eth_kbs_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "kurta-bottom-sets",
    "name": "Libas Floral Print Anarkali Kurta with Tapered Cigarette Pants",
    "title": "Libas Floral Print Anarkali Kurta with Tapered Cigarette Pants",
    "description": "Effortless daily chic with this 2-piece set. Flowing rayon Anarkali with three-quarter sleeves paired with comfortable elasticated solid trousers.",
    "price": 1899,
    "mrp": 3499,
    "discount_percentage": 46,
    "stock_quantity": 65,
    "tags": "ethnic-wear, kurta-bottom-sets, clothing, anarkali, libas, pants",
    "rating": 4.7,
    "reviews_count": 210,
    "brand": "Libas",
    "thumbnail": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_krt_1",
    "id": "eth_krt_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "kurtas",
    "name": "Fabindia Slub Cotton Long Straight Ethnic Kurta with Mandarin Collar",
    "title": "Fabindia Slub Cotton Long Straight Ethnic Kurta with Mandarin Collar",
    "description": "Handcrafted in pure textured slub cotton, tailored with a buttoned placket, side pockets, and knee-length straight hem for festive elegance.",
    "price": 1690,
    "mrp": 2490,
    "discount_percentage": 32,
    "stock_quantity": 60,
    "tags": "ethnic-wear, kurtas, clothing, men, cotton, fabindia, classic",
    "rating": 4.8,
    "reviews_count": 275,
    "brand": "Fabindia",
    "thumbnail": "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_kt_1",
    "id": "eth_kt_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "kurtis-tunics",
    "name": "Aurelia Printed Rayon Mandarin Collar Everyday Short Kurti",
    "title": "Aurelia Printed Rayon Mandarin Collar Everyday Short Kurti",
    "description": "Pair with jeans or trousers for work and college. Styled with subtle thread embroidery on the yoke and breathable viscose rayon fabric.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 90,
    "tags": "ethnic-wear, kurtis-tunics, clothing, short-kurti, aurelia, casual",
    "rating": 4.6,
    "reviews_count": 180,
    "brand": "Aurelia",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_lc_1",
    "id": "eth_lc_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "lehenga-choli-sets",
    "name": "Ritu Kumar Heavily Zari Embroidered Velvet Bridal Lehenga Choli Set",
    "title": "Ritu Kumar Heavily Zari Embroidered Velvet Bridal Lehenga Choli Set",
    "description": "A masterpiece of royal heritage embroidery with zari, sequins, and stone detailing on plush micro-velvet, paired with an embroidered net dupatta.",
    "price": 18500,
    "mrp": 28000,
    "discount_percentage": 34,
    "stock_quantity": 15,
    "tags": "ethnic-wear, lehenga-choli-sets, clothing, bridal, luxury, velvet, wedding",
    "rating": 4.9,
    "reviews_count": 95,
    "brand": "Ritu Kumar",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_sar_1",
    "id": "eth_sar_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "sarees",
    "name": "Kanjivaram Handloom Pure Soft Silk Gold Zari Saree",
    "title": "Kanjivaram Handloom Pure Soft Silk Gold Zari Saree",
    "description": "Handwoven in pure mulberry silk featuring grand temple borders and a densely woven gold brocade pallu. Comes with unstitched matching blouse piece.",
    "price": 7999,
    "mrp": 12999,
    "discount_percentage": 38,
    "stock_quantity": 25,
    "tags": "ethnic-wear, sarees, clothing, kanjivaram, silk, wedding, traditional",
    "rating": 4.9,
    "reviews_count": 215,
    "brand": "Heritage Crafts",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_dg_1",
    "id": "eth_dg_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "dresses-gowns",
    "name": "Biba Zari Embroidered Chanderi Silk Floor-Length Anarkali Gown",
    "title": "Biba Zari Embroidered Chanderi Silk Floor-Length Anarkali Gown",
    "description": "Regal silhouette with flared Kalis, gold-foil thread embroidery along the hem and sleeves, and a matching sheer dupatta.",
    "price": 4999,
    "mrp": 7999,
    "discount_percentage": 38,
    "stock_quantity": 30,
    "tags": "ethnic-wear, dresses-gowns, clothing, anarkali, gown, silk, biba",
    "rating": 4.8,
    "reviews_count": 110,
    "brand": "Biba",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eth_sc_1",
    "id": "eth_sc_1",
    "category": "ethnic-wear",
    "category_name": "Ethnic Wear",
    "subcategory": "salwars-churidars",
    "name": "Biba 4-Way Stretch Cotton Lycra Churidar with Drawstring",
    "title": "Biba 4-Way Stretch Cotton Lycra Churidar with Drawstring",
    "description": "Extra gathering at the ankle for authentic royal churidar style. Pre-shrunk cotton with elastane for complete day-long flexibility.",
    "price": 699,
    "mrp": 999,
    "discount_percentage": 30,
    "stock_quantity": 80,
    "tags": "ethnic-wear, salwars-churidars, clothing, churidar, biba, dailywear",
    "rating": 4.7,
    "reviews_count": 195,
    "brand": "Biba",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_bra_1",
    "id": "lin_bra_1",
    "category": "lingerie-innerwear",
    "category_name": "Lingerie & Innerwear",
    "subcategory": "bras",
    "name": "Enamor A104 Full Support Non-Padded Wirefree Cotton Bra",
    "title": "Enamor A104 Full Support Non-Padded Wirefree Cotton Bra",
    "description": "India's favorite everyday support bra crafted in breathable combed cotton with broad side wings and cushioned shoulder straps for poke-free comfort.",
    "price": 599,
    "mrp": 799,
    "discount_percentage": 25,
    "stock_quantity": 110,
    "tags": "lingerie-innerwear, bras, innerwear, cotton, wirefree, dailywear, enamor",
    "rating": 4.8,
    "reviews_count": 480,
    "brand": "Enamor",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_bra_2",
    "id": "lin_bra_2",
    "category": "lingerie-innerwear",
    "category_name": "Lingerie & Innerwear",
    "subcategory": "bras",
    "name": "Zivame Beautiful Basics Padded Underwired T-Shirt Bra",
    "title": "Zivame Beautiful Basics Padded Underwired T-Shirt Bra",
    "description": "Smooth molded contour cups that stay invisible under fitted tops and dresses. Soft brushed microfiber with multiway convertible straps.",
    "price": 899,
    "mrp": 1299,
    "discount_percentage": 31,
    "stock_quantity": 75,
    "tags": "lingerie-innerwear, bras, innerwear, zivame, t-shirt bra, padded",
    "rating": 4.7,
    "reviews_count": 290,
    "brand": "Zivame",
    "thumbnail": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_nls_1",
    "id": "lin_nls_1",
    "category": "night-lounge-wear",
    "category_name": "Night & Lounge Wear",
    "subcategory": "night-lounge-wear-sets",
    "name": "Sweet Dreams Printed Super-Soft Notch-Collar Pyjama Set",
    "title": "Sweet Dreams Printed Super-Soft Notch-Collar Pyjama Set",
    "description": "Cozy up in luxury with this pastel floral notch-collar button-down shirt and matching straight-leg pyjama set tailored in modal cotton.",
    "price": 1499,
    "mrp": 2499,
    "discount_percentage": 40,
    "stock_quantity": 60,
    "tags": "night-lounge-wear, lingerie-innerwear, night-lounge-wear-sets, lounge-sets, sleepwear",
    "rating": 4.9,
    "reviews_count": 310,
    "brand": "Sweet Dreams",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_ns_1",
    "id": "lin_ns_1",
    "category": "night-lounge-wear",
    "category_name": "Night & Lounge Wear",
    "subcategory": "night-shirts-nighties",
    "name": "Clovia 100% Breathable Combed Cotton Knee-Length Sleepshirt",
    "title": "Clovia 100% Breathable Combed Cotton Knee-Length Sleepshirt",
    "description": "Relaxed drop-shoulder silhouette with cheerful typography print, curved hem, and ultra-breathable knitted cotton texture.",
    "price": 699,
    "mrp": 1299,
    "discount_percentage": 46,
    "stock_quantity": 80,
    "tags": "night-lounge-wear, lingerie-innerwear, night-shirts-nighties, sleepshirt, clovia, cotton",
    "rating": 4.6,
    "reviews_count": 190,
    "brand": "Clovia",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_pan_1",
    "id": "lin_pan_1",
    "category": "lingerie-innerwear",
    "category_name": "Lingerie & Innerwear",
    "subcategory": "panties",
    "name": "Jockey 3-Pack Breathable Super Combed Cotton Bikini Panties",
    "title": "Jockey 3-Pack Breathable Super Combed Cotton Bikini Panties",
    "description": "Label-free design with ultra-soft concealed elastic waistband and 100% pure cotton gusset for breathable all-day freshness.",
    "price": 549,
    "mrp": 699,
    "discount_percentage": 21,
    "stock_quantity": 140,
    "tags": "lingerie-innerwear, panties, innerwear, jockey, cotton, pack-of-3",
    "rating": 4.8,
    "reviews_count": 560,
    "brand": "Jockey",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_ps_1",
    "id": "lin_ps_1",
    "category": "night-lounge-wear",
    "category_name": "Night & Lounge Wear",
    "subcategory": "pyjamas-shorts",
    "name": "Jockey Relaxed-Fit Pure Cotton Checkered Lounge Pyjama Pants",
    "title": "Jockey Relaxed-Fit Pure Cotton Checkered Lounge Pyjama Pants",
    "description": "Woven cotton pyjama trousers with dual side pockets and a durable fabric-covered elastic waistband with drawstring.",
    "price": 999,
    "mrp": 1299,
    "discount_percentage": 23,
    "stock_quantity": 75,
    "tags": "night-lounge-wear, lingerie-innerwear, pyjamas-shorts, jockey, pyjama, lounge",
    "rating": 4.8,
    "reviews_count": 280,
    "brand": "Jockey",
    "thumbnail": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_shp_1",
    "id": "lin_shp_1",
    "category": "lingerie-innerwear",
    "category_name": "Lingerie & Innerwear",
    "subcategory": "shapewear",
    "name": "Zivame High-Waist Seamless Targeted Tummy & Thigh Shaper",
    "title": "Zivame High-Waist Seamless Targeted Tummy & Thigh Shaper",
    "description": "Medium compression shaping garment that contours the waist, flatters the tummy, and smoothes thighs without rolling down.",
    "price": 1199,
    "mrp": 1999,
    "discount_percentage": 40,
    "stock_quantity": 50,
    "tags": "lingerie-innerwear, shapewear, innerwear, zivame, tummy-tucker, seamless",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Zivame",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "lin_thm_1",
    "id": "lin_thm_1",
    "category": "winterwear",
    "category_name": "Winterwear",
    "subcategory": "thermal-wears",
    "name": "Jockey Ultra-Warm Cotton Ribbed Long Johns Thermal Bottom",
    "title": "Jockey Ultra-Warm Cotton Ribbed Long Johns Thermal Bottom",
    "description": "Blended polyfill thermal wear offering high warmth-to-weight ratio, snug ribbed cuffs, and smooth low-profile seams.",
    "price": 799,
    "mrp": 999,
    "discount_percentage": 20,
    "stock_quantity": 80,
    "tags": "winterwear, lingerie-innerwear, thermal-wears, thermal, jockey, winter, warm",
    "rating": 4.9,
    "reviews_count": 360,
    "brand": "Jockey",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ath_tp_1",
    "id": "ath_tp_1",
    "category": "athleisure",
    "category_name": "Athleisure",
    "subcategory": "track-pants",
    "name": "HRX by Hrithik Roshan Rapid-Dry Training Jogger Track Pants",
    "title": "HRX by Hrithik Roshan Rapid-Dry Training Jogger Track Pants",
    "description": "Rapid-dry technology wicks away sweat effortlessly. Features 4-way stretch poly-elastane fabric, reflective branding, and zip pockets.",
    "price": 1299,
    "mrp": 2499,
    "discount_percentage": 48,
    "stock_quantity": 70,
    "tags": "athleisure, track-pants, clothing, hrx, gym, joggers, workout",
    "rating": 4.8,
    "reviews_count": 310,
    "brand": "HRX by Hrithik Roshan",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1483721074573-586540da5703?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1483721074573-586540da5703?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ath_gt_1",
    "id": "ath_gt_1",
    "category": "athleisure",
    "category_name": "Athleisure",
    "subcategory": "gym-tshirts-tanks",
    "name": "Under Armour Tech 2.0 Short-Sleeve Quick-Dry Gym T-Shirt",
    "title": "Under Armour Tech 2.0 Short-Sleeve Quick-Dry Gym T-Shirt",
    "description": "UA Tech fabric is quick-drying, ultra-soft & has a more natural feel. Anti-odor technology prevents the growth of odor-causing microbes.",
    "price": 1799,
    "mrp": 2499,
    "discount_percentage": 28,
    "stock_quantity": 50,
    "tags": "athleisure, gym-tshirts-tanks, clothing, under-armour, training, t-shirt",
    "rating": 4.8,
    "reviews_count": 230,
    "brand": "Under Armour",
    "thumbnail": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ath_sbt_1",
    "id": "ath_sbt_1",
    "category": "athleisure",
    "category_name": "Athleisure",
    "subcategory": "sports-bras-tights",
    "name": "Puma High-Impact Workout Sports Bra & Ankle Tights Set",
    "title": "Puma High-Impact Workout Sports Bra & Ankle Tights Set",
    "description": "Designed for intense cardio, CrossFit, and weight training. High compression bra with padded support and high-waist squat-proof tights.",
    "price": 2999,
    "mrp": 4999,
    "discount_percentage": 40,
    "stock_quantity": 40,
    "tags": "athleisure, sports-bras-tights, clothing, puma, gym-wear, yoga, sports-bra",
    "rating": 4.9,
    "reviews_count": 175,
    "brand": "Puma",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "win_jk_1",
    "id": "win_jk_1",
    "category": "winterwear",
    "category_name": "Winterwear",
    "subcategory": "jackets-windcheaters",
    "name": "Fort Collins Men Lightweight Quilted Puffer Jacket",
    "title": "Fort Collins Men Lightweight Quilted Puffer Jacket",
    "description": "Stay snug in freezing weather. Wind-resistant polyester shell insulated with synthetic polyfill, standing collar, and dual zip-secure handwarmer pockets.",
    "price": 2199,
    "mrp": 3999,
    "discount_percentage": 45,
    "stock_quantity": 60,
    "tags": "winterwear, jackets-windcheaters, clothing, puffer-jacket, warm, winter, fort-collins",
    "rating": 4.8,
    "reviews_count": 340,
    "brand": "Fort Collins",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "win_sw_1",
    "id": "win_sw_1",
    "category": "winterwear",
    "category_name": "Winterwear",
    "subcategory": "sweaters-cardigans",
    "name": "Monte Carlo 100% Pure Australian Merino Wool V-Neck Sweater",
    "title": "Monte Carlo 100% Pure Australian Merino Wool V-Neck Sweater",
    "description": "Pure Australian Merino wool certified with Woolmark standard. Ultra-soft against skin with ribbed cuffs and hem for elegant layering over formal shirts.",
    "price": 2499,
    "mrp": 3699,
    "discount_percentage": 32,
    "stock_quantity": 45,
    "tags": "winterwear, sweaters-cardigans, clothing, wool, merino, sweater, monte-carlo",
    "rating": 4.9,
    "reviews_count": 220,
    "brand": "Monte Carlo",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "win_hd_1",
    "id": "win_hd_1",
    "category": "winterwear",
    "category_name": "Winterwear",
    "subcategory": "sweatshirts-hoodies",
    "name": "Roadster Kangaroo Pocket Heavyweight Fleece Pullover Winter Hoodie",
    "title": "Roadster Kangaroo Pocket Heavyweight Fleece Pullover Winter Hoodie",
    "description": "Cozy streetwear staple featuring brushed heavyweight cotton fleece lining, double-layered drawstring hood, and spacious kangaroo front pocket.",
    "price": 1199,
    "mrp": 2299,
    "discount_percentage": 48,
    "stock_quantity": 80,
    "tags": "winterwear, sweatshirts-hoodies, clothing, hoodie, fleece, roadster, casual",
    "rating": 4.7,
    "reviews_count": 410,
    "brand": "Roadster",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "win_ct_1",
    "id": "win_ct_1",
    "category": "winterwear",
    "category_name": "Winterwear",
    "subcategory": "coats-blazers",
    "name": "MANGO Double-Breasted Wool Blend Tailored Winter Trench Overcoat",
    "title": "MANGO Double-Breasted Wool Blend Tailored Winter Trench Overcoat",
    "description": "European high-street sophistication. Structured notch-lapel double-breasted coat crafted in heavy wool blend with tortoiseshell buttons.",
    "price": 6990,
    "mrp": 9990,
    "discount_percentage": 30,
    "stock_quantity": 20,
    "tags": "winterwear, coats-blazers, clothing, trench-coat, wool, formal, mango, luxury",
    "rating": 4.9,
    "reviews_count": 85,
    "brand": "MANGO",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ms_1",
    "id": "ms_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men, boyfriend, husband",
    "section": "western-wear",
    "name": "Buda Jeans Co Men Embroidered Button-Down Shirt",
    "title": "Buda Jeans Co Men Embroidered Button-Down Shirt",
    "description": "Crafted from breathable premium linen-cotton blend. Features an embroidered heritage patch pocket on the chest, relaxed button-down collar, curved hem, and roll-up button tabs.",
    "price": 483,
    "mrp": 2197,
    "discount_percentage": 78,
    "stock_quantity": 42,
    "tags": "men, shirts, western-wear, clothing, linen, cotton, embroidered, casual, buda-jeans-co, white, button-down, new",
    "rating": 4.6,
    "reviews_count": 284,
    "brand": "Buda Jeans Co",
    "is_new": true,
    "is_bestseller": true,
    "fabric": "Linen & Cotton Blend",
    "fit": "Regular Fit",
    "collar": "Button-Down Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Embroidered",
    "color": "White",
    "occasion": "Casual",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80"
      }
    ],
    "features": [
      "Breathable organic linen-cotton blend weave",
      "Signature embroidered botanical crest pocket",
      "Convertible roll-up sleeve tabs with tortoiseshell buttons",
      "Curved hem suitable for both tucked and untucked styling"
    ],
    "specifications": {
      "Fabric": "Linen & Cotton Blend",
      "Fit": "Regular Fit",
      "Collar": "Button-Down Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Embroidered",
      "Occasion": "Casual / Weekend",
      "Wash Care": "Machine Wash Cold Gentle, Hang Dry"
    }
  },
  {
    "product_id": "ms_2",
    "id": "ms_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Shein Men Medium Length Spread Collar Full Sleeve Shirt",
    "title": "Shein Men Medium Length Spread Collar Full Sleeve Shirt",
    "description": "Minimalist pastel pink pure cotton casual shirt. Modern spread collar with tonal stitch accents and clean tailored lines for day-to-evening dressing.",
    "price": 749,
    "mrp": 1499,
    "discount_percentage": 50,
    "stock_quantity": 55,
    "tags": "men, shirts, western-wear, clothing, cotton, pink, slim-fit, shein-men, spread-collar, solid, new",
    "rating": 4.5,
    "reviews_count": 189,
    "brand": "Shein Men",
    "is_new": true,
    "fabric": "100% Pure Cotton",
    "fit": "Slim Fit",
    "collar": "Spread Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Solid",
    "color": "Light Pink",
    "occasion": "Casual",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
      }
    ],
    "features": [
      "100% combed long-staple cotton",
      "Sleek Italian spread collar with stiffened stays",
      "Tapered slim silhouette",
      "Soft bio-wash finish for zero skin irritation"
    ],
    "specifications": {
      "Fabric": "100% Pure Cotton",
      "Fit": "Slim Fit",
      "Collar": "Spread Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Solid",
      "Occasion": "Casual / Brunch",
      "Wash Care": "Machine Wash Warm"
    }
  },
  {
    "product_id": "ms_3",
    "id": "ms_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men, father, husband",
    "section": "western-wear",
    "name": "Buda Jeans Co Men Regular Fit Shirt with Curved Hem",
    "title": "Buda Jeans Co Men Regular Fit Shirt with Curved Hem",
    "description": "Rich navy blue twill shirt with contrast white buttons and double-stitched durability. Timeless essential that transitions effortlessly from boardroom to bistro.",
    "price": 390,
    "mrp": 1299,
    "discount_percentage": 70,
    "stock_quantity": 78,
    "tags": "men, shirts, western-wear, clothing, navy, cotton, buda-jeans-co, twill, formal, casual, work",
    "rating": 4.7,
    "reviews_count": 632,
    "brand": "Buda Jeans Co",
    "is_bestseller": true,
    "fabric": "Cotton Twill",
    "fit": "Regular Fit",
    "collar": "Spread Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Solid",
    "color": "Navy Blue",
    "occasion": "Work / Casual",
    "size": "XL",
    "thumbnail": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"
      }
    ],
    "features": [
      "Sturdy 2-ply cotton twill construction",
      "Reinforced curved hemline with side gussets",
      "Anti-pilling enzyme treated yarn",
      "Single patch pocket with pen slot"
    ],
    "specifications": {
      "Fabric": "Cotton Twill",
      "Fit": "Regular Fit",
      "Collar": "Spread Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Solid",
      "Occasion": "Work / Semi-Formal",
      "Wash Care": "Machine Wash Dark Colors Separately"
    }
  },
  {
    "product_id": "ms_4",
    "id": "ms_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Dennis Lingo Men Mandarin Collar Cotton Textured Shirt",
    "title": "Dennis Lingo Men Mandarin Collar Cotton Textured Shirt",
    "description": "Contemporary mandarin band collar shirt featuring micro-slub vertical texture. Pairs impeccably with chinos or denim for smart-casual weekends.",
    "price": 699,
    "mrp": 1899,
    "discount_percentage": 63,
    "stock_quantity": 40,
    "tags": "men, shirts, western-wear, clothing, mandarin, dennis-lingo, textured, pink, pastel, cotton, casual",
    "rating": 4.6,
    "reviews_count": 315,
    "brand": "Dennis Lingo",
    "fabric": "100% Pure Cotton",
    "fit": "Slim Fit",
    "collar": "Mandarin / Band Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Striped",
    "color": "Light Pink",
    "occasion": "Casual",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
      }
    ],
    "features": [
      "Modern Chinese band/mandarin collar",
      "Textured dobby cotton weave with tactile dimension",
      "Chiseled button cuffs with adjustable dual buttons",
      "Slim tailored body silhouette"
    ],
    "specifications": {
      "Fabric": "100% Pure Cotton",
      "Fit": "Slim Fit",
      "Collar": "Mandarin / Band Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Striped",
      "Occasion": "Casual / Smart Casual",
      "Wash Care": "Gentle Machine Wash, Warm Iron"
    }
  },
  {
    "product_id": "ms_5",
    "id": "ms_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Netplay Men Printed Slim Fit Cotton Casual Shirt",
    "title": "Netplay Men Printed Slim Fit Cotton Casual Shirt",
    "description": "Striking dark charcoal and geometric micro-motif print. Tailored in soft poplin cotton with a clean French placket and curved hem.",
    "price": 649,
    "mrp": 1699,
    "discount_percentage": 61,
    "stock_quantity": 62,
    "tags": "men, shirts, western-wear, clothing, printed, netplay, black, cotton, slim-fit, evening, party",
    "rating": 4.5,
    "reviews_count": 240,
    "brand": "Netplay",
    "fabric": "100% Pure Cotton",
    "fit": "Slim Fit",
    "collar": "Spread Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Printed",
    "color": "Black",
    "occasion": "Evening / Party",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1620012253295-c15c429fbb3e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1620012253295-c15c429fbb3e?w=800&q=80"
      }
    ],
    "features": [
      "High-definition geometric micro-print",
      "Smooth 60s count compact cotton poplin",
      "Concealed button placket styling",
      "Breathable moisture-wicking weave"
    ],
    "specifications": {
      "Fabric": "100% Pure Cotton",
      "Fit": "Slim Fit",
      "Collar": "Spread Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Printed",
      "Occasion": "Party / Clubwear",
      "Wash Care": "Wash Inside Out"
    }
  },
  {
    "product_id": "ms_6",
    "id": "ms_6",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "7 Alt By Pantaloons Men Cuban Collar Resort Shirt",
    "title": "7 Alt By Pantaloons Men Cuban Collar Resort Shirt",
    "description": "Relaxed bohemian camp collar silhouette featuring monochromatic abstract print. Lightweight rayon-viscose drape for tropical getaways and poolside sunsets.",
    "price": 799,
    "mrp": 1999,
    "discount_percentage": 60,
    "stock_quantity": 38,
    "tags": "men, shirts, western-wear, clothing, cuban-collar, resort, vacation, printed, 7-alt, black, summer",
    "rating": 4.8,
    "reviews_count": 178,
    "brand": "7 Alt By Pantaloons",
    "is_new": true,
    "fabric": "Viscose Rayon Blend",
    "fit": "Relaxed Fit",
    "collar": "Cuban / Camp Collar",
    "sleeve": "Half Sleeves",
    "pattern": "Printed",
    "color": "Black",
    "occasion": "Vacation / Resort",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
      }
    ],
    "features": [
      "Open revere Cuban camp collar",
      "Flowing silky drape with cooling touch",
      "Short sleeves with stitched turn-up hems",
      "Straight hemline designed to be worn untucked"
    ],
    "specifications": {
      "Fabric": "Viscose Rayon Blend",
      "Fit": "Relaxed Fit",
      "Collar": "Cuban / Camp Collar",
      "Sleeve Length": "Half Sleeves",
      "Pattern": "Printed",
      "Occasion": "Resort / Holiday",
      "Wash Care": "Hand Wash or Gentle Machine Cycle"
    }
  },
  {
    "product_id": "ms_7",
    "id": "ms_7",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men, husband",
    "section": "western-wear",
    "name": "Buda Jeans Co Men Textured Oxford Cotton Casual Shirt",
    "title": "Buda Jeans Co Men Textured Oxford Cotton Casual Shirt",
    "description": "Signature Ivy League staple basket-weave Oxford cloth. Features crisp button-down collar points, locker loop at back yoke, and tailored sleeve plackets.",
    "price": 599,
    "mrp": 1799,
    "discount_percentage": 66,
    "stock_quantity": 90,
    "tags": "men, shirts, western-wear, clothing, oxford, blue, cotton, button-down, buda-jeans-co, classic",
    "rating": 4.7,
    "reviews_count": 512,
    "brand": "Buda Jeans Co",
    "is_bestseller": true,
    "fabric": "Oxford Cotton",
    "fit": "Regular Fit",
    "collar": "Button-Down Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Solid",
    "color": "Sky Blue",
    "occasion": "Work / Casual",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80"
      }
    ],
    "features": [
      "Traditional pinpoint Oxford basket-weave cotton",
      "Stately button-down collar rolls",
      "Center box pleat with authentic locker loop",
      "Pearlized shatter-resistant buttons"
    ],
    "specifications": {
      "Fabric": "Oxford Cotton",
      "Fit": "Regular Fit",
      "Collar": "Button-Down Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Solid",
      "Occasion": "Smart Casual / Office",
      "Wash Care": "Warm Machine Wash"
    }
  },
  {
    "product_id": "ms_8",
    "id": "ms_8",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Levi's Men Authentic Barstow Western Denim Shirt",
    "title": "Levi's Men Authentic Barstow Western Denim Shirt",
    "description": "Authentic Americana heritage. Crafted in sturdy washed cotton denim with pointed Western front and back yokes, dual snap-flap chest pockets, and pearl snaps.",
    "price": 1999,
    "mrp": 3599,
    "discount_percentage": 44,
    "stock_quantity": 45,
    "tags": "men, shirts, western-wear, clothing, denim, levis, indigo, western, snap-buttons, casual",
    "rating": 4.9,
    "reviews_count": 420,
    "brand": "Levi's",
    "is_bestseller": true,
    "fabric": "Denim",
    "fit": "Regular Fit",
    "collar": "Spread Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Solid",
    "color": "Indigo Blue",
    "occasion": "Casual",
    "size": "XL",
    "thumbnail": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"
      }
    ],
    "features": [
      "100% heavyweight washed cotton denim",
      "Iconic Western yoke stitching front and back",
      "Mother-of-pearl snap buttons throughout",
      "Curved tail hem for rugged layering"
    ],
    "specifications": {
      "Fabric": "Denim",
      "Fit": "Regular Fit",
      "Collar": "Spread Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Solid",
      "Occasion": "Casual / Outdoor",
      "Wash Care": "Wash Inside Out with Like Colors"
    }
  },
  {
    "product_id": "ms_9",
    "id": "ms_9",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Artisan Studio Men French Normandy Pure Linen Shirt",
    "title": "Artisan Studio Men French Normandy Pure Linen Shirt",
    "description": "Woven exclusively from certified French flax linen. Natural thermodynamic breathability keeps you cool in scorching heat. Features an unstructured band collar.",
    "price": 1499,
    "mrp": 2999,
    "discount_percentage": 50,
    "stock_quantity": 30,
    "tags": "men, shirts, western-wear, clothing, linen, sage-green, olive, artisan-studio, mandarin, resort, luxury",
    "rating": 4.8,
    "reviews_count": 165,
    "brand": "Artisan Studio",
    "is_new": true,
    "fabric": "Pure Linen",
    "fit": "Relaxed Fit",
    "collar": "Mandarin / Band Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Solid",
    "color": "Sage Green",
    "occasion": "Vacation / Resort",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80"
      }
    ],
    "features": [
      "100% pure European Normandy flax linen",
      "Garment washed for ultra-soft, lived-in feel",
      "Natural slub texture and moisture absorption",
      "Real shell buttons with reinforced cross stitching"
    ],
    "specifications": {
      "Fabric": "Pure Linen",
      "Fit": "Relaxed Fit",
      "Collar": "Mandarin / Band Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Solid",
      "Occasion": "Vacation / Casual Luxury",
      "Wash Care": "Hand Wash or Gentle Machine Wash Cold"
    }
  },
  {
    "product_id": "ms_10",
    "id": "ms_10",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men, father",
    "section": "western-wear",
    "name": "Van Heusen Men Formal Poplin Striped Shirt",
    "title": "Van Heusen Men Formal Poplin Striped Shirt",
    "description": "Razor-sharp executive style. Fine blue pinstripes on crisp white poplin cotton with wrinkle-resistant Easy-Care treatment and stiff semi-cutaway collar.",
    "price": 1299,
    "mrp": 2499,
    "discount_percentage": 48,
    "stock_quantity": 52,
    "tags": "men, shirts, western-wear, clothing, striped, formal, work, van-heusen, poplin, cotton, executive",
    "rating": 4.7,
    "reviews_count": 390,
    "brand": "Van Heusen",
    "fabric": "Poplin Cotton",
    "fit": "Slim Fit",
    "collar": "Spread Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Striped",
    "color": "White",
    "occasion": "Work / Formal",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80"
      }
    ],
    "features": [
      "Wrinkle-resistant high-density 80s poplin cotton",
      "Precision German interlining in collar and cuffs",
      "Convertible cuff for cufflinks or button fastening",
      "Generous back length to stay securely tucked"
    ],
    "specifications": {
      "Fabric": "Poplin Cotton",
      "Fit": "Slim Fit",
      "Collar": "Spread Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Striped",
      "Occasion": "Formal / Corporate",
      "Wash Care": "Warm Machine Wash, Medium Steam Iron"
    }
  },
  {
    "product_id": "ms_11",
    "id": "ms_11",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Raymond Men Lustrous Satin-Finish Formal Shirt",
    "title": "Raymond Men Lustrous Satin-Finish Formal Shirt",
    "description": "Sovereign black evening formal shirt woven in high-sheen satin finish cotton blend. Impeccable choice for black-tie galas, weddings, and formal banquets.",
    "price": 1799,
    "mrp": 3499,
    "discount_percentage": 48,
    "stock_quantity": 28,
    "tags": "men, shirts, western-wear, clothing, black, satin, raymond, formal, evening, party, luxury",
    "rating": 4.9,
    "reviews_count": 210,
    "brand": "Raymond",
    "fabric": "Satin Finish Blend",
    "fit": "Slim Fit",
    "collar": "Cutaway Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Solid",
    "color": "Black",
    "occasion": "Evening / Party",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ],
    "features": [
      "Subtle radiant satin sheen finish",
      "Modern wide-spread cutaway collar",
      "French fly concealing front placket buttons",
      "Tailored darts for tapered athletic fit"
    ],
    "specifications": {
      "Fabric": "Satin Finish Blend",
      "Fit": "Slim Fit",
      "Collar": "Cutaway Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Solid",
      "Occasion": "Black Tie / Evening Gala",
      "Wash Care": "Dry Clean Recommended or Gentle Cold Wash"
    }
  },
  {
    "product_id": "ms_12",
    "id": "ms_12",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Tommy Hilfiger Men Classic Gingham Check Casual Shirt",
    "title": "Tommy Hilfiger Men Classic Gingham Check Casual Shirt",
    "description": "Preppy casual styling with dynamic crimson and navy check pattern. Features button-down collar, embroidered flag emblem, and brushed cotton handfeel.",
    "price": 2499,
    "mrp": 4999,
    "discount_percentage": 50,
    "stock_quantity": 36,
    "tags": "men, shirts, western-wear, clothing, check, gingham, tommy-hilfiger, cotton, casual, button-down",
    "rating": 4.8,
    "reviews_count": 330,
    "brand": "Tommy Hilfiger",
    "is_bestseller": true,
    "fabric": "100% Pure Cotton",
    "fit": "Regular Fit",
    "collar": "Button-Down Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Checked",
    "color": "Red & Navy",
    "occasion": "Casual / Work",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
      }
    ],
    "features": [
      "100% yarn-dyed organic cotton gingham",
      "Embroidered signature Tommy flag at chest",
      "Buttoned placket with contrast stitching",
      "Curved hemline with reinforced side inserts"
    ],
    "specifications": {
      "Fabric": "100% Pure Cotton",
      "Fit": "Regular Fit",
      "Collar": "Button-Down Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Checked",
      "Occasion": "Weekend / Smart Casual",
      "Wash Care": "Machine Wash Warm"
    }
  },
  {
    "product_id": "ms_13",
    "id": "ms_13",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men, father",
    "section": "western-wear",
    "name": "Fabindia Men Handloom Khadi Cotton Short Shirt",
    "title": "Fabindia Men Handloom Khadi Cotton Short Shirt",
    "description": "Authentic hand-spun and hand-woven khadi cotton shirt. Styled with a stand collar, wooden buttons, and a relaxed silhouette perfect for Indian climates.",
    "price": 1190,
    "mrp": 1890,
    "discount_percentage": 37,
    "stock_quantity": 48,
    "tags": "men, shirts, western-wear, clothing, khadi, cotton, fabindia, beige, natural, festive, casual",
    "rating": 4.8,
    "reviews_count": 275,
    "brand": "Fabindia",
    "fabric": "100% Pure Cotton",
    "fit": "Regular Fit",
    "collar": "Mandarin / Band Collar",
    "sleeve": "Roll-Up Sleeves",
    "pattern": "Solid",
    "color": "Beige",
    "occasion": "Casual / Festive",
    "size": "XL",
    "thumbnail": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80"
      }
    ],
    "features": [
      "100% handspun artisanal khadi cotton",
      "Eco-friendly natural coconut wood buttons",
      "Short kurta silhouette with side slits",
      "Naturally cooling and sweat-absorbent"
    ],
    "specifications": {
      "Fabric": "100% Pure Cotton",
      "Fit": "Regular Fit",
      "Collar": "Mandarin / Band Collar",
      "Sleeve Length": "Roll-Up Sleeves",
      "Pattern": "Solid",
      "Occasion": "Festive / Cultural / Casual",
      "Wash Care": "Gentle Hand Wash with Mild Detergent"
    }
  },
  {
    "product_id": "ms_14",
    "id": "ms_14",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Dennis Lingo Men Boxy Fit Cotton Twill Overshirt",
    "title": "Dennis Lingo Men Boxy Fit Cotton Twill Overshirt",
    "description": "Heavyweight camel tan utility shaket. Features dual patch bellows pockets with flaps, sturdy horn buttons, and a dropped shoulder relaxed fit.",
    "price": 999,
    "mrp": 2599,
    "discount_percentage": 61,
    "stock_quantity": 34,
    "tags": "men, shirts, western-wear, clothing, overshirt, twill, camel, tan, dennis-lingo, streetwear",
    "rating": 4.6,
    "reviews_count": 140,
    "brand": "Dennis Lingo",
    "is_new": true,
    "fabric": "Cotton Twill",
    "fit": "Boxy Fit",
    "collar": "Spread Collar",
    "sleeve": "Full Sleeves",
    "pattern": "Solid",
    "color": "Camel Tan",
    "occasion": "Casual",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
      }
    ],
    "features": [
      "Heavyweight 320 GSM brushed cotton twill",
      "Twin military-style chest flap pockets",
      "Drop-shoulder boxy silhouette for effortless layering",
      "Reinforced heavy-duty thread construction"
    ],
    "specifications": {
      "Fabric": "Cotton Twill",
      "Fit": "Boxy Fit",
      "Collar": "Spread Collar",
      "Sleeve Length": "Full Sleeves",
      "Pattern": "Solid",
      "Occasion": "Streetwear / Casual Layering",
      "Wash Care": "Machine Wash Cold"
    }
  },
  {
    "product_id": "ms_15",
    "id": "ms_15",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Shein Men Botanical Leaf Print Camp Collar Shirt",
    "title": "Shein Men Botanical Leaf Print Camp Collar Shirt",
    "description": "Sun-drenched botanical print on a breezy linen-cotton blend. Classic Cuban collar and straight hem bring a vibrant holiday vibe to your wardrobe.",
    "price": 649,
    "mrp": 1299,
    "discount_percentage": 50,
    "stock_quantity": 44,
    "tags": "men, shirts, western-wear, clothing, cuban-collar, tropical, printed, shein-men, green, summer",
    "rating": 4.7,
    "reviews_count": 215,
    "brand": "Shein Men",
    "fabric": "Linen & Cotton Blend",
    "fit": "Relaxed Fit",
    "collar": "Cuban / Camp Collar",
    "sleeve": "Half Sleeves",
    "pattern": "Printed",
    "color": "Sage Green",
    "occasion": "Vacation / Resort",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80"
      }
    ],
    "features": [
      "Vibrant fade-resistant tropical leaf motif",
      "Relaxed camp notch lapel collar",
      "Slub linen-cotton breathable fabric",
      "Flat hemline perfect for shorts and denim"
    ],
    "specifications": {
      "Fabric": "Linen & Cotton Blend",
      "Fit": "Relaxed Fit",
      "Collar": "Cuban / Camp Collar",
      "Sleeve Length": "Half Sleeves",
      "Pattern": "Printed",
      "Occasion": "Beach / Holiday",
      "Wash Care": "Gentle Machine Wash"
    }
  },
  {
    "product_id": "mt_1",
    "id": "mt_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "t-shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Levi's Men Classic Graphic Print Crewneck Cotton T-Shirt",
    "title": "Levi's Men Classic Graphic Print Crewneck Cotton T-Shirt",
    "description": "Iconic housemark batwing logo print on breathable 100% combed cotton jersey. Tailored regular fit engineered for daily comfort.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 85,
    "tags": "men, t-shirts, tshirts, clothing, western-wear, levis, graphic, cotton, casual, summer",
    "rating": 4.6,
    "reviews_count": 310,
    "brand": "Levi's",
    "fabric": "100% Pure Cotton",
    "fit": "Regular Fit",
    "color": "Navy Blue",
    "occasion": "Casual",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mt_2",
    "id": "mt_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "t-shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Tommy Hilfiger Men Heritage Colorblock Pique Polo T-Shirt",
    "title": "Tommy Hilfiger Men Heritage Colorblock Pique Polo T-Shirt",
    "description": "Signature Americana prep aesthetic. Woven from breathable organic cotton pique with ribbed flat-knit collar and two-button placket.",
    "price": 1899,
    "mrp": 3499,
    "discount_percentage": 46,
    "stock_quantity": 45,
    "tags": "men, t-shirts, tshirts, clothing, western-wear, polo, tommy-hilfiger, pique, cotton, semi-formal",
    "rating": 4.8,
    "reviews_count": 195,
    "brand": "Tommy Hilfiger",
    "fabric": "100% Pure Cotton",
    "fit": "Slim Fit",
    "color": "White",
    "occasion": "Casual",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mt_3",
    "id": "mt_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "t-shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Puma Men Active Dry-Cell Athletic Training Tee",
    "title": "Puma Men Active Dry-Cell Athletic Training Tee",
    "description": "Engineered with Puma dryCELL moisture-wicking technology to keep you dry and comfortable through high-intensity gym sessions.",
    "price": 899,
    "mrp": 1799,
    "discount_percentage": 50,
    "stock_quantity": 90,
    "tags": "men, t-shirts, tshirts, clothing, western-wear, puma, gym, sports, training, activewear, black",
    "rating": 4.7,
    "reviews_count": 420,
    "brand": "Puma",
    "fabric": "Polyester Blend",
    "fit": "Regular Fit",
    "color": "Black",
    "occasion": "Universal / Streetwear",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mt_4",
    "id": "mt_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "t-shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Calvin Klein Men Monogram Boxy Oversized Tee",
    "title": "Calvin Klein Men Monogram Boxy Oversized Tee",
    "description": "Contemporary streetwear silhouette with dropped shoulders and a heavy 240 GSM organic cotton knit. Minimalist tonal CK embroidery.",
    "price": 1699,
    "mrp": 2999,
    "discount_percentage": 43,
    "stock_quantity": 38,
    "tags": "men, t-shirts, tshirts, clothing, western-wear, calvin-klein, oversized, streetwear, beige, trendy",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "Calvin Klein",
    "fabric": "100% Pure Cotton",
    "fit": "Boxy Fit",
    "color": "Beige",
    "occasion": "Universal / Streetwear",
    "size": "XL",
    "thumbnail": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mt_5",
    "id": "mt_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "t-shirts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "US Polo Assn Men Solid Waffle Knit Textured Henley Tee",
    "title": "US Polo Assn Men Solid Waffle Knit Textured Henley Tee",
    "description": "Thermal waffle textured cotton jersey with three-button neckline placket. Versatile for layering under jackets or relaxed weekend styling.",
    "price": 999,
    "mrp": 1999,
    "discount_percentage": 50,
    "stock_quantity": 60,
    "tags": "men, t-shirts, tshirts, clothing, western-wear, henley, us-polo, waffle, olive, casual",
    "rating": 4.5,
    "reviews_count": 180,
    "brand": "U.S. Polo Assn.",
    "fabric": "Cotton Twill",
    "fit": "Slim Fit",
    "color": "Olive",
    "occasion": "Casual",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mj_1",
    "id": "mj_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Levi's 511 Slim Fit Stretch Dark Indigo Denim Jeans",
    "title": "Levi's 511 Slim Fit Stretch Dark Indigo Denim Jeans",
    "description": "The definitive modern slim cut. Clean dark indigo wash crafted with Levi's Flex advanced stretch technology for all-day mobility.",
    "price": 2499,
    "mrp": 3999,
    "discount_percentage": 38,
    "stock_quantity": 55,
    "tags": "men, jeans, clothing, western-wear, levis, 511, slim, stretch, indigo, denim",
    "rating": 4.8,
    "reviews_count": 480,
    "brand": "Levi's",
    "fit": "Slim Fit",
    "color": "Navy Blue",
    "occasion": "Casual",
    "size": "32",
    "thumbnail": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mj_2",
    "id": "mj_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Wrangler Men Texas Authentics Straight Leg Rugged Jeans",
    "title": "Wrangler Men Texas Authentics Straight Leg Rugged Jeans",
    "description": "Classic American cowboy straight fit built from heavyweight 13.5oz ring-spun denim with copper rivets and iconic 'W' back pocket stitching.",
    "price": 1899,
    "mrp": 3299,
    "discount_percentage": 42,
    "stock_quantity": 40,
    "tags": "men, jeans, clothing, western-wear, wrangler, straight, rugged, denim, blue",
    "rating": 4.6,
    "reviews_count": 220,
    "brand": "Wrangler",
    "fit": "Regular Fit",
    "color": "Blue",
    "occasion": "Casual",
    "size": "34",
    "thumbnail": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mj_3",
    "id": "mj_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Spykar Men Super Skinny Mid-Rise Washed Stretch Jeans",
    "title": "Spykar Men Super Skinny Mid-Rise Washed Stretch Jeans",
    "description": "Fierce urban design featuring whiskered thighs, subtle hand-buffing abrasions, and hyper-stretch denim for maximum comfort.",
    "price": 1599,
    "mrp": 2999,
    "discount_percentage": 47,
    "stock_quantity": 62,
    "tags": "men, jeans, clothing, western-wear, spykar, skinny, washed, black, stretch",
    "rating": 4.5,
    "reviews_count": 165,
    "brand": "Spykar",
    "fit": "Slim Fit",
    "color": "Black",
    "occasion": "Party / Evening",
    "size": "30",
    "thumbnail": "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mj_4",
    "id": "mj_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Pepe Jeans Men Cash Mid Blue Tapered Clean Denim",
    "title": "Pepe Jeans Men Cash Mid Blue Tapered Clean Denim",
    "description": "Modern tapered leg offering room through the thighs with a sharp leg opening. Medium stone-wash with contrast amber stitching.",
    "price": 2199,
    "mrp": 3799,
    "discount_percentage": 42,
    "stock_quantity": 48,
    "tags": "men, jeans, clothing, western-wear, pepe-jeans, tapered, mid-blue, clean, casual",
    "rating": 4.7,
    "reviews_count": 190,
    "brand": "Pepe Jeans",
    "fit": "Regular Fit",
    "color": "Sky Blue",
    "occasion": "Casual",
    "size": "32",
    "thumbnail": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mj_5",
    "id": "mj_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Flying Machine Men Jackson Relaxed Fit Carpenter Jeans",
    "title": "Flying Machine Men Jackson Relaxed Fit Carpenter Jeans",
    "description": "Workwear utilitarian styling with side utility tool pockets, hammer loop, and durable double-needle felled seam construction.",
    "price": 1499,
    "mrp": 2699,
    "discount_percentage": 44,
    "stock_quantity": 50,
    "tags": "men, jeans, clothing, western-wear, flying-machine, carpenter, relaxed, streetwear",
    "rating": 4.6,
    "reviews_count": 130,
    "brand": "Flying Machine",
    "fit": "Relaxed Fit",
    "color": "Charcoal",
    "occasion": "Universal / Streetwear",
    "size": "34",
    "thumbnail": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mp_1",
    "id": "mp_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "trousers-pants",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Raymond Men Formal Flat-Front Tailored Wool Blend Trousers",
    "title": "Raymond Men Formal Flat-Front Tailored Wool Blend Trousers",
    "description": "Executive boardroom elegance. Impeccably tailored from premium poly-wool blend with a French fly closure and interior shirt-gripper waistband.",
    "price": 1899,
    "mrp": 3499,
    "discount_percentage": 46,
    "stock_quantity": 45,
    "tags": "men, trousers, pants, clothing, western-wear, raymond, formal, work, executive, charcoal",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Raymond",
    "fit": "Regular Fit",
    "color": "Charcoal",
    "occasion": "Work / Formal",
    "size": "32",
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mp_2",
    "id": "mp_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "trousers-pants",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Van Heusen Men Flexi-Waist Poly-Viscose Formal Trousers",
    "title": "Van Heusen Men Flexi-Waist Poly-Viscose Formal Trousers",
    "description": "Engineered with an auto-flex waistband giving up to 1.5 inches of invisible stretch. Wrinkle-resistant finish for crisp daily office wear.",
    "price": 1599,
    "mrp": 2799,
    "discount_percentage": 43,
    "stock_quantity": 58,
    "tags": "men, trousers, pants, clothing, western-wear, van-heusen, formal, flexi, black",
    "rating": 4.7,
    "reviews_count": 310,
    "brand": "Van Heusen",
    "fit": "Slim Fit",
    "color": "Black",
    "occasion": "Work / Formal",
    "size": "34",
    "thumbnail": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mp_3",
    "id": "mp_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "trousers-pants",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Peter England Men Slim Fit Stretch Cotton Khaki Chinos",
    "title": "Peter England Men Slim Fit Stretch Cotton Khaki Chinos",
    "description": "Garment-washed stretch twill chinos with clean slant pockets. Transitions effortlessly from business-casual Fridays to weekend dinners.",
    "price": 1299,
    "mrp": 2299,
    "discount_percentage": 43,
    "stock_quantity": 70,
    "tags": "men, trousers, chinos, clothing, western-wear, peter-england, khaki, beige, casual",
    "rating": 4.6,
    "reviews_count": 280,
    "brand": "Peter England",
    "fit": "Slim Fit",
    "color": "Beige",
    "occasion": "Casual",
    "size": "32",
    "thumbnail": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mp_4",
    "id": "mp_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "trousers-pants",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Blackberrys Men Tech-Stretch Formal Navy Blue Trousers",
    "title": "Blackberrys Men Tech-Stretch Formal Navy Blue Trousers",
    "description": "Precision laser-cut edges with four-way stretch fabric. Breathable, stain-resistant, and machine-washable for modern traveling professionals.",
    "price": 2299,
    "mrp": 3999,
    "discount_percentage": 42,
    "stock_quantity": 35,
    "tags": "men, trousers, pants, clothing, western-wear, blackberrys, tech, stretch, navy, luxury",
    "rating": 4.9,
    "reviews_count": 175,
    "brand": "Blackberrys",
    "fit": "Slim Fit",
    "color": "Navy Blue",
    "occasion": "Work / Formal",
    "size": "32",
    "thumbnail": "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mp_5",
    "id": "mp_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "trousers-pants",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "western-wear",
    "name": "Arrow Men Urban Fit Wrinkle-Resistant Casual Olive Chinos",
    "title": "Arrow Men Urban Fit Wrinkle-Resistant Casual Olive Chinos",
    "description": "Soft peached finish cotton with an easy taper from knee to hem. Enhanced with Scotchgard stain release technology.",
    "price": 1699,
    "mrp": 2999,
    "discount_percentage": 43,
    "stock_quantity": 50,
    "tags": "men, trousers, pants, chinos, clothing, western-wear, arrow, olive, casual",
    "rating": 4.7,
    "reviews_count": 160,
    "brand": "Arrow",
    "fit": "Regular Fit",
    "color": "Olive",
    "occasion": "Casual",
    "size": "34",
    "thumbnail": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wt_1",
    "id": "wt_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "tops",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Vero Moda Women Floral Print Peplum Crepe Top",
    "title": "Vero Moda Women Floral Print Peplum Crepe Top",
    "description": "Flattering smocked waistline with cinched peplum flare. Made from airy georgette crepe with gentle puff sleeves and square neckline.",
    "price": 899,
    "mrp": 1799,
    "discount_percentage": 50,
    "stock_quantity": 65,
    "tags": "women, tops, clothing, western-wear, vero-moda, peplum, floral, summer, casual",
    "rating": 4.7,
    "reviews_count": 240,
    "brand": "Vero Moda",
    "color": "Pink",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wt_2",
    "id": "wt_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "tops",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Mango Women Pure Linen Button-Down Sleeveless Summer Top",
    "title": "Mango Women Pure Linen Button-Down Sleeveless Summer Top",
    "description": "Minimalist Spanish tailoring crafted from certified European flax. Features tortoiseshell horn buttons and clean side slits.",
    "price": 1490,
    "mrp": 2990,
    "discount_percentage": 50,
    "stock_quantity": 40,
    "tags": "women, tops, clothing, western-wear, mango, linen, sleeveless, beige, minimalist",
    "rating": 4.8,
    "reviews_count": 155,
    "brand": "Mango",
    "color": "Beige",
    "size": "S",
    "thumbnail": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wt_3",
    "id": "wt_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "tops",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Zara Style Satin Bow-Tie Formal Office Blouse",
    "title": "Zara Style Satin Bow-Tie Formal Office Blouse",
    "description": "Lustrous emerald green fluid satin with an elegant lavallière neck tie, gathering at shoulders, and mother-of-pearl button cuffs.",
    "price": 1399,
    "mrp": 2499,
    "discount_percentage": 44,
    "stock_quantity": 48,
    "tags": "women, tops, blouses, clothing, western-wear, zara, satin, formal, green, workwear",
    "rating": 4.9,
    "reviews_count": 310,
    "brand": "Zara",
    "color": "Sage Green",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wt_4",
    "id": "wt_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "tops",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Forever 21 Ribbed Knit Square-Neck Fitted Crop Top",
    "title": "Forever 21 Ribbed Knit Square-Neck Fitted Crop Top",
    "description": "Stretchy ribbed knit top with a flattering collarbone-framing square neck. Pairs seamlessly with high-rise jeans or cargo pants.",
    "price": 699,
    "mrp": 1299,
    "discount_percentage": 46,
    "stock_quantity": 90,
    "tags": "women, tops, crop-top, clothing, western-wear, forever-21, ribbed, black, casual",
    "rating": 4.6,
    "reviews_count": 420,
    "brand": "Forever 21",
    "color": "Black",
    "size": "S",
    "thumbnail": "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wt_5",
    "id": "wt_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "tops",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "AND Women Embroidered Angrakha Style Flared Tunic Top",
    "title": "AND Women Embroidered Angrakha Style Flared Tunic Top",
    "description": "Fusion crossover angrakha wrap neckline detailed with delicate mirror-work thread embroidery and tassel side ties.",
    "price": 1199,
    "mrp": 2299,
    "discount_percentage": 48,
    "stock_quantity": 55,
    "tags": "women, tops, tunic, clothing, western-wear, and, embroidered, white, fusion",
    "rating": 4.8,
    "reviews_count": 175,
    "brand": "AND",
    "color": "White",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wk_1",
    "id": "wk_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "kurtas",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Biba Women Anarkali Embroidered Cotton Festive Kurti",
    "title": "Biba Women Anarkali Embroidered Cotton Festive Kurti",
    "description": "Regal flared silhouette with gold gota-patti border and floral hand-block motifs on breathable pure cambric cotton.",
    "price": 1799,
    "mrp": 3299,
    "discount_percentage": 45,
    "stock_quantity": 50,
    "tags": "women, kurtas, kurtis, ethnic, ethnic-wear, biba, anarkali, cotton, festive, pink",
    "rating": 4.8,
    "reviews_count": 360,
    "brand": "Biba",
    "color": "Pink",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wk_2",
    "id": "wk_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "kurtas",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "W for Woman Straight Cut Georgette Kurta with Foil Print",
    "title": "W for Woman Straight Cut Georgette Kurta with Foil Print",
    "description": "Modern straight silhouette with side slits and mandarin collar. Adorned with shimmering metallic copper foil geometry.",
    "price": 1399,
    "mrp": 2599,
    "discount_percentage": 46,
    "stock_quantity": 45,
    "tags": "women, kurtas, kurtis, ethnic, ethnic-wear, w, straight-kurta, party, navy",
    "rating": 4.7,
    "reviews_count": 190,
    "brand": "W for Woman",
    "color": "Navy Blue",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1610030469668-9655ecbb41a0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469668-9655ecbb41a0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wk_3",
    "id": "wk_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "kurtas",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Aurelia Women Printed A-Line Rayon Daily Kurti",
    "title": "Aurelia Women Printed A-Line Rayon Daily Kurti",
    "description": "Buttery soft 100% viscose rayon that drapes effortlessly. Features three-quarter bell sleeves and a keyhole neckline with tassels.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 80,
    "tags": "women, kurtas, kurtis, ethnic, ethnic-wear, aurelia, daily, rayon, yellow",
    "rating": 4.6,
    "reviews_count": 280,
    "brand": "Aurelia",
    "color": "Yellow",
    "size": "S",
    "thumbnail": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wk_4",
    "id": "wk_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "kurtas",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Global Desi Bohemian Printed Flared Fusion Kurta",
    "title": "Global Desi Bohemian Printed Flared Fusion Kurta",
    "description": "Boho-chic indie styling by Anita Dongre. Vibrant floral kaleidoscope print with ruffled tiers and pom-pom edge detailing.",
    "price": 1599,
    "mrp": 2999,
    "discount_percentage": 47,
    "stock_quantity": 35,
    "tags": "women, kurtas, kurtis, ethnic, ethnic-wear, global-desi, fusion, boho, multi",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "Global Desi",
    "color": "Rust Brown",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wk_5",
    "id": "wk_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "kurtas",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Fabindia Chanderi Silk Zari Embroidered Straight Kurta",
    "title": "Fabindia Chanderi Silk Zari Embroidered Straight Kurta",
    "description": "Handcrafted Chanderi silk with sheer yoke, zari motifs, and pure cotton slip lining. Impeccable for pujas and festive dining.",
    "price": 2490,
    "mrp": 3990,
    "discount_percentage": 38,
    "stock_quantity": 30,
    "tags": "women, kurtas, kurtis, ethnic, ethnic-wear, fabindia, chanderi, silk, luxury, beige",
    "rating": 4.9,
    "reviews_count": 170,
    "brand": "Fabindia",
    "color": "Beige",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wh_1",
    "id": "wh_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "handbags",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "accessories",
    "name": "Lavie Women Betula Structured Faux Leather Tote Handbag",
    "title": "Lavie Women Betula Structured Faux Leather Tote Handbag",
    "description": "Roomy structured everyday work tote featuring triple main compartments, padded laptop sleeve, and gold-tone metallic hardware.",
    "price": 1799,
    "mrp": 3999,
    "discount_percentage": 55,
    "stock_quantity": 45,
    "tags": "women, handbags, bags, accessories, lavie, tote, leather, work, beige",
    "rating": 4.8,
    "reviews_count": 520,
    "brand": "Lavie",
    "color": "Beige",
    "thumbnail": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wh_2",
    "id": "wh_2",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "handbags",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "accessories",
    "name": "Caprese Women Classic Saffiano Leather Satchel Shoulder Bag",
    "title": "Caprese Women Classic Saffiano Leather Satchel Shoulder Bag",
    "description": "Italian-inspired chic silhouette with scratch-resistant Saffiano finish, detachable cross-body sling strap, and signature metal emblem.",
    "price": 2199,
    "mrp": 4499,
    "discount_percentage": 51,
    "stock_quantity": 35,
    "tags": "women, handbags, bags, accessories, caprese, satchel, cross-body, navy",
    "rating": 4.7,
    "reviews_count": 310,
    "brand": "Caprese",
    "color": "Navy Blue",
    "thumbnail": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wh_3",
    "id": "wh_3",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "handbags",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "accessories",
    "name": "Baggit Women Textured Vegan Leather Sling Crossbody Bag",
    "title": "Baggit Women Textured Vegan Leather Sling Crossbody Bag",
    "description": "Cruelty-free compact everyday sling bag with multiple zip pockets, RFID blocking lining, and quick magnetic snap closure.",
    "price": 1199,
    "mrp": 2290,
    "discount_percentage": 48,
    "stock_quantity": 60,
    "tags": "women, handbags, sling, bags, accessories, baggit, vegan, brown",
    "rating": 4.6,
    "reviews_count": 240,
    "brand": "Baggit",
    "color": "Rust Brown",
    "thumbnail": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wh_4",
    "id": "wh_4",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "handbags",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "accessories",
    "name": "Aldo Women Rhinestone Embellished Evening Clutch Purse",
    "title": "Aldo Women Rhinestone Embellished Evening Clutch Purse",
    "description": "Gleaming crystals hand-set on metallic gold frame with detachable delicate snake chain strap. Fits standard smartphone and essentials.",
    "price": 3499,
    "mrp": 5999,
    "discount_percentage": 42,
    "stock_quantity": 25,
    "tags": "women, handbags, clutches, clutch, accessories, aldo, party, evening, luxury, gold",
    "rating": 4.9,
    "reviews_count": 180,
    "brand": "Aldo",
    "color": "White",
    "thumbnail": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wh_5",
    "id": "wh_5",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "handbags",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "accessories",
    "name": "Michael Kors Style Monogram Print Chain-Link Shoulder Bag",
    "title": "Michael Kors Style Monogram Print Chain-Link Shoulder Bag",
    "description": "Polished curb chain shoulder strap with iconic monogram coated canvas body, dual slip pockets, and secure zip compartment.",
    "price": 4999,
    "mrp": 8999,
    "discount_percentage": 44,
    "stock_quantity": 20,
    "tags": "women, handbags, bags, accessories, michael-kors, chain, luxury, brown",
    "rating": 4.9,
    "reviews_count": 340,
    "brand": "Michael Kors",
    "color": "Charcoal",
    "thumbnail": "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kgc_1",
    "id": "kgc_1",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "girls-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls",
    "name": "Hopscotch Girls Floral Embroidered Tulle Party Frock",
    "title": "Hopscotch Girls Floral Embroidered Tulle Party Frock",
    "description": "Princess layered tulle skirt with 3D floral bodice applique and soft cotton inner lining for sensitive skin.",
    "price": 1199,
    "mrp": 2299,
    "discount_percentage": 48,
    "stock_quantity": 50,
    "tags": "kids, girls, clothing, dress, frock, hopscotch, party, pink",
    "rating": 4.9,
    "reviews_count": 260,
    "brand": "Hopscotch",
    "color": "Pink",
    "size": "5-6Y",
    "thumbnail": "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kgc_2",
    "id": "kgc_2",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "girls-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls",
    "name": "Max Girls Butterfly Print Tiered Cotton Casual Dress",
    "title": "Max Girls Butterfly Print Tiered Cotton Casual Dress",
    "description": "Bright sunshine yellow summer dress in 100% breathable poplin cotton with flutter flutter sleeves.",
    "price": 699,
    "mrp": 1199,
    "discount_percentage": 42,
    "stock_quantity": 65,
    "tags": "kids, girls, clothing, dress, max, cotton, yellow, summer",
    "rating": 4.7,
    "reviews_count": 180,
    "brand": "Max",
    "color": "Yellow",
    "size": "7-8Y",
    "thumbnail": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kgc_3",
    "id": "kgc_3",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "girls-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls",
    "name": "Gini & Jony Girls Denim Dungaree Skirt with Stripe Tee Set",
    "title": "Gini & Jony Girls Denim Dungaree Skirt with Stripe Tee Set",
    "description": "Classic stretch denim overall pinafore dress with metal clip suspenders and coordinating striped cotton jersey t-shirt.",
    "price": 1399,
    "mrp": 2499,
    "discount_percentage": 44,
    "stock_quantity": 40,
    "tags": "kids, girls, clothing, dungaree, denim, gini-jony, pinafore",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "Gini & Jony",
    "color": "Blue",
    "size": "6-7Y",
    "thumbnail": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kgc_4",
    "id": "kgc_4",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "girls-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls",
    "name": "Biba Girls Brocade Lehenga Choli with Net Dupatta Set",
    "title": "Biba Girls Brocade Lehenga Choli with Net Dupatta Set",
    "description": "Festive jacquard brocade flared lehenga skirt with gold zari choli top and scalloped glitter net dupatta.",
    "price": 2199,
    "mrp": 3999,
    "discount_percentage": 45,
    "stock_quantity": 30,
    "tags": "kids, girls, clothing, lehenga, biba, ethnic, festive, red",
    "rating": 4.9,
    "reviews_count": 195,
    "brand": "Biba",
    "color": "Maroon",
    "size": "8-9Y",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kgc_5",
    "id": "kgc_5",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "girls-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls",
    "name": "Mothercare Girls Cotton Graphic Tops and Leggings (Set of 2)",
    "title": "Mothercare Girls Cotton Graphic Tops and Leggings (Set of 2)",
    "description": "Everyday playwear set made with super-combed organic cotton and stretchy non-pinch waistband leggings.",
    "price": 899,
    "mrp": 1599,
    "discount_percentage": 44,
    "stock_quantity": 70,
    "tags": "kids, girls, clothing, leggings, tops, mothercare, cotton, set",
    "rating": 4.7,
    "reviews_count": 220,
    "brand": "Mothercare",
    "color": "Pink",
    "size": "3-4Y",
    "thumbnail": "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbi_1",
    "id": "kbi_1",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "baby-clothes",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, baby",
    "section": "infants",
    "name": "Mothercare Unisex Organic Cotton Onesies Rompers (Pack of 3)",
    "title": "Mothercare Unisex Organic Cotton Onesies Rompers (Pack of 3)",
    "description": "100% GOTS certified organic combed cotton with nickel-free poppers and envelope necklines for easy over-the-head changes.",
    "price": 999,
    "mrp": 1799,
    "discount_percentage": 44,
    "stock_quantity": 85,
    "tags": "kids, baby, infant, rompers, onesies, mothercare, organic, cotton",
    "rating": 4.9,
    "reviews_count": 410,
    "brand": "Mothercare",
    "color": "White",
    "size": "0-6M",
    "thumbnail": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbi_2",
    "id": "kbi_2",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "baby-clothes",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, baby",
    "section": "infants",
    "name": "Bumzee Baby Boys Bear Hoodie Fleece Winter Jumpsuit",
    "title": "Bumzee Baby Boys Bear Hoodie Fleece Winter Jumpsuit",
    "description": "Ultra-cozy sherpa fleece pram suit with 3D bear ears on hood, fold-over mitten cuffs, and full-length diagonal zipper.",
    "price": 899,
    "mrp": 1599,
    "discount_percentage": 44,
    "stock_quantity": 45,
    "tags": "kids, baby, infant, winter, jumpsuit, bumzee, fleece, warm",
    "rating": 4.8,
    "reviews_count": 180,
    "brand": "Bumzee",
    "color": "Beige",
    "size": "6-12M",
    "thumbnail": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbi_3",
    "id": "kbi_3",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "baby-clothes",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, baby",
    "section": "infants",
    "name": "Mini Klub Infant Boys Formal Waistcoat Shirt and Trouser Set",
    "title": "Mini Klub Infant Boys Formal Waistcoat Shirt and Trouser Set",
    "description": "Gentleman festive suit with checked woven waistcoat, clip-on bowtie, soft woven shirt, and elasticated waist chinos.",
    "price": 1499,
    "mrp": 2699,
    "discount_percentage": 44,
    "stock_quantity": 35,
    "tags": "kids, baby, infant, suit, mini-klub, formal, party, navy",
    "rating": 4.7,
    "reviews_count": 120,
    "brand": "Mini Klub",
    "color": "Navy Blue",
    "size": "12-18M",
    "thumbnail": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbi_4",
    "id": "kbi_4",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "baby-clothes",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, baby",
    "section": "infants",
    "name": "Hopscotch Baby Girls Floral Lace Pinafore Dress with Bloomer",
    "title": "Hopscotch Baby Girls Floral Lace Pinafore Dress with Bloomer",
    "description": "Sweet scalloped lace pinafore with ruffled shoulder wings, contrast ribbon sash, and matching diaper cover bloomers.",
    "price": 999,
    "mrp": 1899,
    "discount_percentage": 47,
    "stock_quantity": 40,
    "tags": "kids, baby, infant, frock, hopscotch, lace, bloomers, pink",
    "rating": 4.8,
    "reviews_count": 160,
    "brand": "Hopscotch",
    "color": "Pink",
    "size": "6-12M",
    "thumbnail": "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbi_5",
    "id": "kbi_5",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "baby-clothes",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, baby",
    "section": "infants",
    "name": "FirstCry Unisex Soft Bamboo Swaddle Blankets (Pack of 3)",
    "title": "FirstCry Unisex Soft Bamboo Swaddle Blankets (Pack of 3)",
    "description": "Silky soft 70% bamboo 30% cotton breathable muslin swaddles. Regulates body temperature and gets softer with every wash.",
    "price": 849,
    "mrp": 1499,
    "discount_percentage": 43,
    "stock_quantity": 65,
    "tags": "kids, baby, infant, swaddle, blankets, firstcry, bamboo, muslin",
    "rating": 4.9,
    "reviews_count": 280,
    "brand": "FirstCry",
    "color": "White",
    "size": "Free Size",
    "thumbnail": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bhc_1",
    "id": "bhc_1",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "haircare",
    "department": "beauty",
    "section": "haircare",
    "name": "L'Oreal Paris Professional Absolute Repair Molecular Hair Serum",
    "title": "L'Oreal Paris Professional Absolute Repair Molecular Hair Serum",
    "description": "Rebuilds hair molecular structure from the inside out. Clinically restores strength, elasticity, and brilliant shine to damaged hair.",
    "price": 1199,
    "mrp": 1499,
    "discount_percentage": 20,
    "stock_quantity": 75,
    "tags": "beauty, haircare, serum, loreal, professional, repair, hair",
    "rating": 4.9,
    "reviews_count": 620,
    "brand": "L'Oreal Paris",
    "thumbnail": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bhc_2",
    "id": "bhc_2",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "haircare",
    "department": "beauty",
    "section": "haircare",
    "name": "Biotique Bio Kelp Protein Shampoo for Falling Hair Treatment",
    "title": "Biotique Bio Kelp Protein Shampoo for Falling Hair Treatment",
    "description": "Ayurvedic therapy combining pure kelp, peppermint oil, and mint leaf extract to invigorate the scalp and encourage vigorous hair growth.",
    "price": 349,
    "mrp": 499,
    "discount_percentage": 30,
    "stock_quantity": 110,
    "tags": "beauty, haircare, shampoo, biotique, anti-hairfall, herbal, ayurvedic",
    "rating": 4.6,
    "reviews_count": 850,
    "brand": "Biotique",
    "thumbnail": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bhc_3",
    "id": "bhc_3",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "haircare",
    "department": "beauty",
    "section": "haircare",
    "name": "Mamaearth Onion Hair Oil with Redensyl for Hair Regrowth (250ml)",
    "title": "Mamaearth Onion Hair Oil with Redensyl for Hair Regrowth (250ml)",
    "description": "Sulphate and paraben-free onion seed oil blended with nourishing almond and castor oils to reduce hair thinning and nourish follicles.",
    "price": 499,
    "mrp": 599,
    "discount_percentage": 17,
    "stock_quantity": 95,
    "tags": "beauty, haircare, hair-oil, mamaearth, onion, regrowth, natural",
    "rating": 4.7,
    "reviews_count": 1400,
    "brand": "Mamaearth",
    "thumbnail": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bhc_4",
    "id": "bhc_4",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "haircare",
    "department": "beauty",
    "section": "haircare",
    "name": "Plum Olive & Macadamia Mega-Moisturizing Deep Hair Mask",
    "title": "Plum Olive & Macadamia Mega-Moisturizing Deep Hair Mask",
    "description": "Intense moisture infusion with shea butter, plant keratin, and cold-pressed macadamia oil. Tames unruly frizz in 15 minutes.",
    "price": 565,
    "mrp": 675,
    "discount_percentage": 16,
    "stock_quantity": 80,
    "tags": "beauty, haircare, hair-mask, plum, deep-conditioning, frizz-control",
    "rating": 4.8,
    "reviews_count": 530,
    "brand": "Plum Goodness",
    "thumbnail": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bhc_5",
    "id": "bhc_5",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "haircare",
    "department": "beauty",
    "section": "haircare",
    "name": "Philips Essential 1200W Compact Foldable Hair Dryer",
    "title": "Philips Essential 1200W Compact Foldable Hair Dryer",
    "description": "Compact travel-friendly design with ThermoProtect temperature setting and cool air shot to seal hair cuticles for a shiny blowout.",
    "price": 999,
    "mrp": 1495,
    "discount_percentage": 33,
    "stock_quantity": 60,
    "tags": "beauty, haircare, hair-dryer, appliances, philips, styling, dryer",
    "rating": 4.8,
    "reviews_count": 980,
    "brand": "Philips",
    "thumbnail": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bmk_1",
    "id": "bmk_1",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "makeup",
    "department": "beauty",
    "section": "makeup",
    "name": "Maybelline Superstay Matte Ink Liquid Lipstick - Pioneer Red",
    "title": "Maybelline Superstay Matte Ink Liquid Lipstick - Pioneer Red",
    "description": "Flawless transfer-proof 16-hour saturated liquid matte color with unique arrow applicator for precise, effortless lining.",
    "price": 549,
    "mrp": 699,
    "discount_percentage": 21,
    "stock_quantity": 140,
    "tags": "beauty, makeup, lipstick, maybelline, matte, red, long-lasting",
    "rating": 4.9,
    "reviews_count": 2100,
    "brand": "Maybelline New York",
    "color": "Red",
    "thumbnail": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bmk_2",
    "id": "bmk_2",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "makeup",
    "department": "beauty",
    "section": "makeup",
    "name": "Lakme Absolute Skin Natural Hydrating Mousse Foundation (SPF 20)",
    "title": "Lakme Absolute Skin Natural Hydrating Mousse Foundation (SPF 20)",
    "description": "Feather-light whipped mousse texture that blends seamlessly into the skin, minimizing pores for a velvety matte finish.",
    "price": 750,
    "mrp": 950,
    "discount_percentage": 21,
    "stock_quantity": 90,
    "tags": "beauty, makeup, foundation, lakme, matte, mousse, face",
    "rating": 4.7,
    "reviews_count": 1100,
    "brand": "Lakme",
    "color": "Beige",
    "thumbnail": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bmk_3",
    "id": "bmk_3",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "makeup",
    "department": "beauty",
    "section": "makeup",
    "name": "L'Oreal Paris Voluminous Lash Paradise Waterproof Mascara",
    "title": "L'Oreal Paris Voluminous Lash Paradise Waterproof Mascara",
    "description": "Voluptuous volume and intense length. Soft wavy bristle brush with 200+ bristles catches every lash with zero flaking.",
    "price": 699,
    "mrp": 899,
    "discount_percentage": 22,
    "stock_quantity": 115,
    "tags": "beauty, makeup, mascara, loreal, waterproof, eyes, volume",
    "rating": 4.8,
    "reviews_count": 1650,
    "brand": "L'Oreal Paris",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bmk_4",
    "id": "bmk_4",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "makeup",
    "department": "beauty",
    "section": "makeup",
    "name": "Sugar Cosmetics Contour De Force Mini Highlighter - Champagne Champion",
    "title": "Sugar Cosmetics Contour De Force Mini Highlighter - Champagne Champion",
    "description": "Ultra-fine crushed pearl formula giving a blinding, buildable lit-from-within glow without settling into fine lines.",
    "price": 399,
    "mrp": 499,
    "discount_percentage": 20,
    "stock_quantity": 85,
    "tags": "beauty, makeup, highlighter, sugar, glow, champagne, face",
    "rating": 4.8,
    "reviews_count": 780,
    "brand": "Sugar Cosmetics",
    "color": "Gold",
    "thumbnail": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bmk_5",
    "id": "bmk_5",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "makeup",
    "department": "beauty",
    "section": "makeup",
    "name": "Kay Beauty 24HR Waterproof Smudge-Proof Gel Kohl Kajal",
    "title": "Kay Beauty 24HR Waterproof Smudge-Proof Gel Kohl Kajal",
    "description": "Created by Katrina Kaif. Infused with chamomile and ceramide for super smooth one-stroke glide that stays jet black all day.",
    "price": 320,
    "mrp": 399,
    "discount_percentage": 20,
    "stock_quantity": 130,
    "tags": "beauty, makeup, kajal, eyeliner, kay-beauty, waterproof, black",
    "rating": 4.9,
    "reviews_count": 1450,
    "brand": "Kay Beauty",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bfr_1",
    "id": "bfr_1",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "fragrances",
    "department": "beauty",
    "section": "fragrances",
    "name": "Titan Skinn Raw Eau De Parfum for Men (100ml)",
    "title": "Titan Skinn Raw Eau De Parfum for Men (100ml)",
    "description": "Crisp top notes of Italian lemon and watery mandarin flowing into geranium, cedarwood, and rich patchouli.",
    "price": 2195,
    "mrp": 2995,
    "discount_percentage": 27,
    "stock_quantity": 60,
    "tags": "beauty, fragrances, perfume, titan-skinn, edp, men, fresh",
    "rating": 4.8,
    "reviews_count": 890,
    "brand": "Titan Skinn",
    "thumbnail": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bfr_2",
    "id": "bfr_2",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "fragrances",
    "department": "beauty",
    "section": "fragrances",
    "name": "Titan Skinn Celeste Eau De Parfum for Women (100ml)",
    "title": "Titan Skinn Celeste Eau De Parfum for Women (100ml)",
    "description": "Sparkling floral fragrance evoking summer rain with notes of white peach, pear, orange flower, jasmine, and warm sandalwood.",
    "price": 2195,
    "mrp": 2995,
    "discount_percentage": 27,
    "stock_quantity": 55,
    "tags": "beauty, fragrances, perfume, titan-skinn, edp, women, floral",
    "rating": 4.9,
    "reviews_count": 760,
    "brand": "Titan Skinn",
    "thumbnail": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bfr_3",
    "id": "bfr_3",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "fragrances",
    "department": "beauty",
    "section": "fragrances",
    "name": "Bella Vita Luxury Organic Unisex Perfume Gift Set (4 x 20ml)",
    "title": "Bella Vita Luxury Organic Unisex Perfume Gift Set (4 x 20ml)",
    "description": "Includes White Oud, Fresh, Glam, and Oudh fragrances crafted with natural French oils for long-lasting sillage.",
    "price": 649,
    "mrp": 999,
    "discount_percentage": 35,
    "stock_quantity": 110,
    "tags": "beauty, fragrances, gift-set, perfume, bella-vita, oud, unisex",
    "rating": 4.6,
    "reviews_count": 1820,
    "brand": "Bella Vita",
    "thumbnail": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bfr_4",
    "id": "bfr_4",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "fragrances",
    "department": "beauty",
    "section": "fragrances",
    "name": "Calvin Klein One Unisex Eau De Toilette (100ml)",
    "title": "Calvin Klein One Unisex Eau De Toilette (100ml)",
    "description": "The universally celebrated clean, contemporary icon. Crisp green tea, bergamot, cardamom, and sensual amber.",
    "price": 3650,
    "mrp": 4900,
    "discount_percentage": 26,
    "stock_quantity": 35,
    "tags": "beauty, fragrances, perfume, calvin-klein, ck-one, unisex, luxury",
    "rating": 4.9,
    "reviews_count": 1250,
    "brand": "Calvin Klein",
    "thumbnail": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bfr_5",
    "id": "bfr_5",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "fragrances",
    "department": "beauty",
    "section": "fragrances",
    "name": "Forest Essentials Pure Rosewater Facial Tonic & Fragrance Mist",
    "title": "Forest Essentials Pure Rosewater Facial Tonic & Fragrance Mist",
    "description": "Steam-distilled from fresh Kashmiri Desi Gulab petals. Delicately hydrates skin and leaves an authentic lingering floral aroma.",
    "price": 1350,
    "mrp": 1450,
    "discount_percentage": 7,
    "stock_quantity": 70,
    "tags": "beauty, fragrances, rosewater, forest-essentials, ayurvedic, natural, mist",
    "rating": 4.9,
    "reviews_count": 910,
    "brand": "Forest Essentials",
    "thumbnail": "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hkc_1",
    "id": "hkc_1",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "kitchen",
    "department": "home-kitchen",
    "section": "kitchen",
    "name": "Prestige Deluxe Alpha Tri-Ply Stainless Steel Pressure Cooker (3L)",
    "title": "Prestige Deluxe Alpha Tri-Ply Stainless Steel Pressure Cooker (3L)",
    "description": "Heavy-gauge tri-ply construction ensuring uniform heat distribution without food burning. Induction and gas stove compatible.",
    "price": 2399,
    "mrp": 3895,
    "discount_percentage": 38,
    "stock_quantity": 45,
    "tags": "home-living, home-kitchen, kitchen, cookware, prestige, pressure-cooker, stainless-steel",
    "rating": 4.8,
    "reviews_count": 740,
    "brand": "Prestige",
    "thumbnail": "https://images.unsplash.com/photo-1584990347449-397a66b74497?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584990347449-397a66b74497?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hkc_2",
    "id": "hkc_2",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "kitchen",
    "department": "home-kitchen",
    "section": "kitchen",
    "name": "Hawkins Futura Hard Anodized Non-Stick Induction Kadhai with Lid",
    "title": "Hawkins Futura Hard Anodized Non-Stick Induction Kadhai with Lid",
    "description": "4.06mm extra thick black hard anodized metal body conducts heat quickly and evenly with durable stay-cool rosewood handles.",
    "price": 1850,
    "mrp": 2350,
    "discount_percentage": 21,
    "stock_quantity": 50,
    "tags": "home-living, home-kitchen, kitchen, cookware, hawkins, kadhai, non-stick",
    "rating": 4.9,
    "reviews_count": 980,
    "brand": "Hawkins",
    "thumbnail": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hkc_3",
    "id": "hkc_3",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "kitchen",
    "department": "home-kitchen",
    "section": "kitchen",
    "name": "Milton Thermosteel Flip Lid Vacuum Insulated Flask (1000ml)",
    "title": "Milton Thermosteel Flip Lid Vacuum Insulated Flask (1000ml)",
    "description": "Double-walled vacuum insulated 18/8 food-grade stainless steel bottle. Keeps beverages steaming hot or ice cold for 24 hours.",
    "price": 899,
    "mrp": 1290,
    "discount_percentage": 30,
    "stock_quantity": 120,
    "tags": "home-living, home-kitchen, kitchen, flask, milton, bottle, insulated",
    "rating": 4.8,
    "reviews_count": 1450,
    "brand": "Milton",
    "thumbnail": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hkc_4",
    "id": "hkc_4",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "kitchen",
    "department": "home-kitchen",
    "section": "kitchen",
    "name": "Borosil Klip N Store Microwavable Glass Storage Containers (Set of 3)",
    "title": "Borosil Klip N Store Microwavable Glass Storage Containers (Set of 3)",
    "description": "100% borosilicate glass that resists thermal shock up to 400°C. 100% airtight and leak-proof BPA-free locking lids.",
    "price": 999,
    "mrp": 1590,
    "discount_percentage": 37,
    "stock_quantity": 75,
    "tags": "home-living, home-kitchen, kitchen, containers, borosil, glass, microwave-safe",
    "rating": 4.9,
    "reviews_count": 620,
    "brand": "Borosil",
    "thumbnail": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hkc_5",
    "id": "hkc_5",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "kitchen",
    "department": "home-kitchen",
    "section": "kitchen",
    "name": "Cello Prima High-Grade Chef Kitchen Knife and Scissor Set (6 Pieces)",
    "title": "Cello Prima High-Grade Chef Kitchen Knife and Scissor Set (6 Pieces)",
    "description": "Razor-sharp Japanese high-carbon stainless steel blades with ergonomic contoured soft-grip handles and wooden counter block.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 85,
    "tags": "home-living, home-kitchen, kitchen, knives, cello, cutlery, chef",
    "rating": 4.7,
    "reviews_count": 410,
    "brand": "Cello",
    "thumbnail": "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hdl_1",
    "id": "hdl_1",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "home-decor",
    "department": "home-kitchen",
    "section": "decor",
    "name": "Home Centre Ceramic Ribbed Textured Nordic Flower Vase",
    "title": "Home Centre Ceramic Ribbed Textured Nordic Flower Vase",
    "description": "Scandi minimalist matte off-white stoneware vase. Waterproof interior designed to hold fresh blooms or dried pampas grass.",
    "price": 699,
    "mrp": 1299,
    "discount_percentage": 46,
    "stock_quantity": 60,
    "tags": "home-living, home-kitchen, home-decor, vase, ceramic, home-centre, scandinavian",
    "rating": 4.8,
    "reviews_count": 320,
    "brand": "Home Centre",
    "thumbnail": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hdl_2",
    "id": "hdl_2",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "home-decor",
    "department": "home-kitchen",
    "section": "decor",
    "name": "D'Decor Modern Silent Sweep Metal Wall Clock (14 Inch)",
    "title": "D'Decor Modern Silent Sweep Metal Wall Clock (14 Inch)",
    "description": "Brushed rose gold bezel with clean minimalist numeral dial and completely silent non-ticking quartz movement.",
    "price": 1199,
    "mrp": 2199,
    "discount_percentage": 45,
    "stock_quantity": 40,
    "tags": "home-living, home-kitchen, home-decor, clock, wall-clock, ddecor, silent",
    "rating": 4.7,
    "reviews_count": 240,
    "brand": "D'Decor",
    "thumbnail": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hdl_3",
    "id": "hdl_3",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "home-decor",
    "department": "home-kitchen",
    "section": "decor",
    "name": "Solimo Natural Soy Wax Scented Glass Jar Candles (Pack of 3)",
    "title": "Solimo Natural Soy Wax Scented Glass Jar Candles (Pack of 3)",
    "description": "Infused with french lavender, vanilla bean, and cinnamon bark essential oils. Clean 30-hour burn time per jar.",
    "price": 599,
    "mrp": 999,
    "discount_percentage": 40,
    "stock_quantity": 85,
    "tags": "home-living, home-kitchen, home-decor, candles, aromatherapy, fragrance",
    "rating": 4.8,
    "reviews_count": 510,
    "brand": "Amazon Brand - Solimo",
    "thumbnail": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hdl_4",
    "id": "hdl_4",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "lighting",
    "department": "home-kitchen",
    "section": "lighting",
    "name": "Urban Ladder Solid Sheesham Wood Tripod Standing Floor Lamp",
    "title": "Urban Ladder Solid Sheesham Wood Tripod Standing Floor Lamp",
    "description": "Mid-century architectural silhouette crafted in rich walnut polish with a textured natural jute drum shade.",
    "price": 2799,
    "mrp": 4999,
    "discount_percentage": 44,
    "stock_quantity": 25,
    "tags": "home-living, home-kitchen, lighting, floor-lamp, tripod, wood, modern",
    "rating": 4.9,
    "reviews_count": 180,
    "brand": "Urban Ladder",
    "thumbnail": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hdl_5",
    "id": "hdl_5",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "home-decor",
    "department": "home-kitchen",
    "section": "decor",
    "name": "Art Street Set of 7 Black Solid Wood Collage Photo Frames",
    "title": "Art Street Set of 7 Black Solid Wood Collage Photo Frames",
    "description": "Gallery wall template included. Shatterproof acrylic glass front with easy-open turn buttons for quick picture loading.",
    "price": 899,
    "mrp": 1799,
    "discount_percentage": 50,
    "stock_quantity": 70,
    "tags": "home-living, home-kitchen, home-decor, photo-frames, gallery-wall, memories",
    "rating": 4.7,
    "reviews_count": 430,
    "brand": "Art Street",
    "thumbnail": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "esw_1",
    "id": "esw_1",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "smart-wearables",
    "department": "electronics",
    "section": "wearables",
    "name": "Apple Watch Series 9 GPS with Midnight Aluminum Case",
    "title": "Apple Watch Series 9 GPS with Midnight Aluminum Case",
    "description": "S9 SiP chip, double tap gesture interaction, brighter Always-On Retina display, advanced health and sleep monitoring.",
    "price": 38900,
    "mrp": 41900,
    "discount_percentage": 7,
    "stock_quantity": 25,
    "tags": "electronics, smart-wearables, smartwatch, apple, watch, fitness, gadgets",
    "rating": 4.9,
    "reviews_count": 1450,
    "brand": "Apple",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "esw_2",
    "id": "esw_2",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "smart-wearables",
    "department": "electronics",
    "section": "wearables",
    "name": "Samsung Galaxy Watch6 Bluetooth (44mm Super AMOLED)",
    "title": "Samsung Galaxy Watch6 Bluetooth (44mm Super AMOLED)",
    "description": "20% larger display with thinner bezel. Custom heart rate zone coaching and comprehensive body composition sensor.",
    "price": 24999,
    "mrp": 33999,
    "discount_percentage": 26,
    "stock_quantity": 30,
    "tags": "electronics, smart-wearables, smartwatch, samsung, galaxy-watch, fitness",
    "rating": 4.8,
    "reviews_count": 820,
    "brand": "Samsung",
    "color": "Silver",
    "thumbnail": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "esw_3",
    "id": "esw_3",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "smart-wearables",
    "department": "electronics",
    "section": "wearables",
    "name": "Fire-Boltt Phoenix Bluetooth Calling Smartwatch with AI Voice",
    "title": "Fire-Boltt Phoenix Bluetooth Calling Smartwatch with AI Voice",
    "description": "1.3-inch round high resolution color screen, 120+ sports modes, SpO2 blood oxygen and optical heart rate tracking.",
    "price": 1499,
    "mrp": 9999,
    "discount_percentage": 85,
    "stock_quantity": 160,
    "tags": "electronics, smart-wearables, smartwatch, fire-boltt, calling, budget",
    "rating": 4.5,
    "reviews_count": 2900,
    "brand": "Fire-Boltt",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "esw_4",
    "id": "esw_4",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "smart-wearables",
    "department": "electronics",
    "section": "wearables",
    "name": "Noise ColorFit Pulse 2 Max 1.85-Inch Display Smart Watch",
    "title": "Noise ColorFit Pulse 2 Max 1.85-Inch Display Smart Watch",
    "description": "550 nits peak brightness display with Tru Sync noise reduction for seamless phone calling and 10-day battery life.",
    "price": 1699,
    "mrp": 5999,
    "discount_percentage": 72,
    "stock_quantity": 120,
    "tags": "electronics, smart-wearables, smartwatch, noise, bluetooth-calling, fitness",
    "rating": 4.6,
    "reviews_count": 2100,
    "brand": "Noise",
    "color": "Navy Blue",
    "thumbnail": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "esw_5",
    "id": "esw_5",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "smart-wearables",
    "department": "electronics",
    "section": "wearables",
    "name": "Fitbit Charge 6 Advanced Health and Fitness Tracker",
    "title": "Fitbit Charge 6 Advanced Health and Fitness Tracker",
    "description": "Google Maps, Google Wallet, 40+ exercise modes, ECG app for heart rhythm, EDA sensor for stress management, and 7-day battery.",
    "price": 13999,
    "mrp": 15999,
    "discount_percentage": 13,
    "stock_quantity": 35,
    "tags": "electronics, smart-wearables, fitness-tracker, fitbit, ecg, google, gadgets",
    "rating": 4.7,
    "reviews_count": 540,
    "brand": "Fitbit",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mf_1",
    "id": "mf_1",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sneakers",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "footwear",
    "name": "Nike Air Max SC Men Leather Mesh Casual Sneakers",
    "title": "Nike Air Max SC Men Leather Mesh Casual Sneakers",
    "description": "Old-school track lines with visible Max Air unit cushioning. Premium leather and breathable textile upper with a durable rubber waffle outsole.",
    "price": 4795,
    "mrp": 5995,
    "discount_percentage": 20,
    "stock_quantity": 40,
    "tags": "men, footwear, sneakers, shoes, nike, air-max, white, sporty, athletic, casual-shoes",
    "rating": 4.8,
    "reviews_count": 650,
    "brand": "Nike",
    "color": "White",
    "occasion": "Casual",
    "size": "9",
    "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mf_2",
    "id": "mf_2",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sneakers",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "footwear",
    "name": "Adidas Originals Stan Smith Classic White Green Sneakers",
    "title": "Adidas Originals Stan Smith Classic White Green Sneakers",
    "description": "The minimalist icon born in 1973. Smooth synthetic leather upper made with recycled Primegreen materials and perforated 3-Stripes.",
    "price": 5999,
    "mrp": 7999,
    "discount_percentage": 25,
    "stock_quantity": 35,
    "tags": "men, footwear, sneakers, shoes, adidas, stan-smith, classic, iconic, white, casual-shoes",
    "rating": 4.9,
    "reviews_count": 520,
    "brand": "Adidas",
    "color": "White",
    "occasion": "Casual",
    "size": "8",
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mf_3",
    "id": "mf_3",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "formal-shoes",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "footwear",
    "name": "Clarks Men Tilden Walk Formal Leather Oxford Shoes",
    "title": "Clarks Men Tilden Walk Formal Leather Oxford Shoes",
    "description": "Crafted in glossy full-grain black leather with square toe and discrete elastic gore stretch panels. OrthoLite footbed absorbs impact.",
    "price": 3999,
    "mrp": 6999,
    "discount_percentage": 43,
    "stock_quantity": 30,
    "tags": "men, footwear, formal-shoes, oxfords, clarks, leather, black, formal, office, shoes",
    "rating": 4.7,
    "reviews_count": 280,
    "brand": "Clarks",
    "color": "Black",
    "occasion": "Work / Formal",
    "size": "9",
    "thumbnail": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mf_4",
    "id": "mf_4",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "boots",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "footwear",
    "name": "Woodland Men Camel Heavy Leather High-Ankle Trekking Boots",
    "title": "Woodland Men Camel Heavy Leather High-Ankle Trekking Boots",
    "description": "Indestructible nubuck leather outdoor boots with padded collar, rustproof brass eyelets, and deep-lugged rubber sole for off-road grip.",
    "price": 3495,
    "mrp": 4995,
    "discount_percentage": 30,
    "stock_quantity": 45,
    "tags": "men, footwear, boots, woodland, leather, trekking, camel, outdoor, rugged, shoes",
    "rating": 4.8,
    "reviews_count": 410,
    "brand": "Woodland",
    "color": "Beige",
    "occasion": "Universal / Streetwear",
    "size": "8",
    "thumbnail": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "mf_5",
    "id": "mf_5",
    "category": "footwear",
    "category_name": "Footwear",
    "subcategory": "sandals",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "footwear",
    "name": "Birkenstock Men Arizona Two-Strap Cork Leather Sandals",
    "title": "Birkenstock Men Arizona Two-Strap Cork Leather Sandals",
    "description": "Anatomically contoured cork-latex footbed lined with soft suede. Dual adjustable oiled leather straps with vintage metal pin buckles.",
    "price": 4990,
    "mrp": 6990,
    "discount_percentage": 28,
    "stock_quantity": 25,
    "tags": "men, footwear, sandals, birkenstock, arizona, cork, leather, comfort, brown",
    "rating": 4.9,
    "reviews_count": 350,
    "brand": "Birkenstock",
    "color": "Rust Brown",
    "occasion": "Vacation / Resort",
    "size": "9",
    "thumbnail": "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ma_1",
    "id": "ma_1",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "watches",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "accessories",
    "name": "Fossil Men Grant Chronograph Dark Brown Leather Watch",
    "title": "Fossil Men Grant Chronograph Dark Brown Leather Watch",
    "description": "Vintage-inspired Roman numeral dial with stainless steel case, three sub-dials for stopwatch timing, and rich brown leather strap.",
    "price": 8495,
    "mrp": 11995,
    "discount_percentage": 29,
    "stock_quantity": 35,
    "tags": "men, accessories, watches, fossil, chronograph, leather, brown, formal",
    "rating": 4.8,
    "reviews_count": 420,
    "brand": "Fossil",
    "color": "Rust Brown",
    "thumbnail": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ma_2",
    "id": "ma_2",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "wallets",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "accessories",
    "name": "Tommy Hilfiger Men RFID Blocking Hunter Leather Bifold Wallet",
    "title": "Tommy Hilfiger Men RFID Blocking Hunter Leather Bifold Wallet",
    "description": "100% genuine top-grain cowhide leather with RFID blocking technology, 8 card slots, and dual currency compartments.",
    "price": 1599,
    "mrp": 2999,
    "discount_percentage": 47,
    "stock_quantity": 65,
    "tags": "men, accessories, wallets, tommy-hilfiger, leather, rfid, black",
    "rating": 4.7,
    "reviews_count": 510,
    "brand": "Tommy Hilfiger",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ma_3",
    "id": "ma_3",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "sunglasses",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "accessories",
    "name": "Ray-Ban Aviator Classic Polarized Green Lens Sunglasses",
    "title": "Ray-Ban Aviator Classic Polarized Green Lens Sunglasses",
    "description": "Originally designed for U.S. aviators in 1937. Timeless gold metal frame with polarized G-15 crystal lenses providing 100% UV protection.",
    "price": 7490,
    "mrp": 9990,
    "discount_percentage": 25,
    "stock_quantity": 30,
    "tags": "men, accessories, sunglasses, ray-ban, aviator, polarized, gold",
    "rating": 4.9,
    "reviews_count": 670,
    "brand": "Ray-Ban",
    "color": "Gold",
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ma_4",
    "id": "ma_4",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "backpacks",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "accessories",
    "name": "Wildcraft Men 35L Water Resistant Travel Laptop Backpack",
    "title": "Wildcraft Men 35L Water Resistant Travel Laptop Backpack",
    "description": "Ergonomic ventilated back system, dedicated padded 15.6-inch laptop compartment, rain cover, and durable ripstop fabric.",
    "price": 1799,
    "mrp": 3299,
    "discount_percentage": 45,
    "stock_quantity": 50,
    "tags": "men, accessories, backpacks, bags, wildcraft, laptop-bag, travel, navy",
    "rating": 4.8,
    "reviews_count": 380,
    "brand": "Wildcraft",
    "color": "Navy Blue",
    "thumbnail": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ma_5",
    "id": "ma_5",
    "category": "accessories",
    "category_name": "Accessories",
    "subcategory": "belts",
    "department": "men",
    "gender": "men",
    "recipient": "him, men",
    "section": "accessories",
    "name": "Levi's Men Reversible Leather Belt with Brushed Metal Buckle",
    "title": "Levi's Men Reversible Leather Belt with Brushed Metal Buckle",
    "description": "Twist buckle allows instant switching between formal black and casual rich brown. 100% full grain leather.",
    "price": 999,
    "mrp": 1999,
    "discount_percentage": 50,
    "stock_quantity": 70,
    "tags": "men, accessories, belts, levis, reversible, leather, black, brown",
    "rating": 4.6,
    "reviews_count": 290,
    "brand": "Levi's",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wd_1",
    "id": "wd_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "dresses",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Vero Moda Floral Print Tiered Georgette Maxi Dress",
    "title": "Vero Moda Floral Print Tiered Georgette Maxi Dress",
    "description": "Ethereal tiered flow in lightweight semi-sheer georgette with a soft viscose lining. Features smocked bodice and ruffled flutter sleeves.",
    "price": 1899,
    "mrp": 3499,
    "discount_percentage": 46,
    "stock_quantity": 50,
    "tags": "women, dresses, clothing, western-wear, vero-moda, maxi, floral, summer, georgette",
    "rating": 4.7,
    "reviews_count": 340,
    "brand": "Vero Moda",
    "color": "Pink",
    "occasion": "Party / Evening",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wd_2",
    "id": "wd_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "dresses",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Mango Women Belted Cotton Linen Summer Shirt Dress",
    "title": "Mango Women Belted Cotton Linen Summer Shirt Dress",
    "description": "Tailored safari aesthetic with spread collar, tortoiseshell button-through front, and self-fabric tie belt to cinch the waist.",
    "price": 2490,
    "mrp": 4590,
    "discount_percentage": 45,
    "stock_quantity": 35,
    "tags": "women, dresses, clothing, western-wear, mango, linen, shirt-dress, beige, elegant",
    "rating": 4.8,
    "reviews_count": 180,
    "brand": "Mango",
    "color": "Beige",
    "occasion": "Casual",
    "size": "S",
    "thumbnail": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wd_3",
    "id": "wd_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "dresses",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Zara Style Elegant Satin Slip Evening Party Midi Dress",
    "title": "Zara Style Elegant Satin Slip Evening Party Midi Dress",
    "description": "Lustrous heavy fluid satin cut on the bias to hug the natural silhouette. Features a cowl neckline and adjustable criss-cross back straps.",
    "price": 1999,
    "mrp": 3699,
    "discount_percentage": 46,
    "stock_quantity": 42,
    "tags": "women, dresses, clothing, western-wear, zara, satin, slip, midi, evening, emerald",
    "rating": 4.9,
    "reviews_count": 290,
    "brand": "Zara",
    "color": "Sage Green",
    "occasion": "Party / Evening",
    "size": "M",
    "thumbnail": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wd_4",
    "id": "wd_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "dresses",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "AND Women Geometric Print A-Line Casual Wrap Dress",
    "title": "AND Women Geometric Print A-Line Casual Wrap Dress",
    "description": "Flattering true wrap silhouette in wrinkle-resistant crepe jersey with deep V-neckline and high-low curved hemline.",
    "price": 1599,
    "mrp": 2999,
    "discount_percentage": 47,
    "stock_quantity": 60,
    "tags": "women, dresses, clothing, western-wear, and, wrap-dress, geometric, navy, office",
    "rating": 4.6,
    "reviews_count": 145,
    "brand": "AND",
    "color": "Navy Blue",
    "occasion": "Work / Formal",
    "size": "L",
    "thumbnail": "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wd_5",
    "id": "wd_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "dresses",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Forever New Women Sweetheart Neck Lace Cocktail Dress",
    "title": "Forever New Women Sweetheart Neck Lace Cocktail Dress",
    "description": "Exquisite corded floral lace overlay atop tonal satin lining. Structured boning in the sweetheart bodice with invisible back zip.",
    "price": 3495,
    "mrp": 5995,
    "discount_percentage": 42,
    "stock_quantity": 28,
    "tags": "women, dresses, clothing, western-wear, forever-new, lace, cocktail, party, luxury",
    "rating": 4.9,
    "reviews_count": 210,
    "brand": "Forever New",
    "color": "White",
    "occasion": "Party / Evening",
    "size": "S",
    "thumbnail": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ws_1",
    "id": "ws_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "sarees",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Kanjivaram Pure Silk Zari Brocade Wedding Saree",
    "title": "Kanjivaram Pure Silk Zari Brocade Wedding Saree",
    "description": "Heirloom bridal masterpiece handwoven in Kanchipuram from pure mulberry silk with grand zari pallu and temple border motifs.",
    "price": 6999,
    "mrp": 12999,
    "discount_percentage": 46,
    "stock_quantity": 20,
    "tags": "women, sarees, ethnic-wear, clothing, kanjivaram, silk, zari, bridal, wedding, maroon",
    "rating": 4.9,
    "reviews_count": 430,
    "brand": "Nalli Silk",
    "color": "Maroon",
    "occasion": "Party / Evening",
    "size": "Free Size",
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ws_2",
    "id": "ws_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "sarees",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Banarasi Art Silk Jacquard Woven Traditional Festive Saree",
    "title": "Banarasi Art Silk Jacquard Woven Traditional Festive Saree",
    "description": "Rich floral jaal weaving across royal emerald green body. Includes unstitched matching brocade blouse fabric piece.",
    "price": 2499,
    "mrp": 4999,
    "discount_percentage": 50,
    "stock_quantity": 45,
    "tags": "women, sarees, ethnic-wear, clothing, banarasi, art-silk, festive, green, traditional",
    "rating": 4.7,
    "reviews_count": 280,
    "brand": "Chhabra 55",
    "color": "Sage Green",
    "occasion": "Party / Evening",
    "size": "Free Size",
    "thumbnail": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ws_3",
    "id": "ws_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "sarees",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Fabindia Pure Tussar Silk Hand Block Printed Saree",
    "title": "Fabindia Pure Tussar Silk Hand Block Printed Saree",
    "description": "Artisanal Bhagalpur tussar silk saree with natural coarse texture, printed with vegetable dyes by master craftspersons.",
    "price": 4990,
    "mrp": 7990,
    "discount_percentage": 38,
    "stock_quantity": 25,
    "tags": "women, sarees, ethnic-wear, clothing, fabindia, tussar-silk, hand-block, craft, beige",
    "rating": 4.8,
    "reviews_count": 195,
    "brand": "Fabindia",
    "color": "Beige",
    "occasion": "Work / Formal",
    "size": "Free Size",
    "thumbnail": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ws_4",
    "id": "ws_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "sarees",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Sabyasachi Inspired Floral Organza Embellished Party Saree",
    "title": "Sabyasachi Inspired Floral Organza Embellished Party Saree",
    "description": "Featherlight translucent organza silk draped in pastel blooms with hand-embroidered gota patti scallop borders.",
    "price": 3499,
    "mrp": 6499,
    "discount_percentage": 46,
    "stock_quantity": 32,
    "tags": "women, sarees, ethnic-wear, clothing, organza, floral, pastel, party, luxury",
    "rating": 4.9,
    "reviews_count": 220,
    "brand": "Biba",
    "color": "Pink",
    "occasion": "Party / Evening",
    "size": "Free Size",
    "thumbnail": "https://images.unsplash.com/photo-1610030469668-9655ecbb41a0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469668-9655ecbb41a0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "ws_5",
    "id": "ws_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "sarees",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "ethnic-wear",
    "name": "Chhabra 55 Chiffon Lightweight Foil Print Cocktail Saree",
    "title": "Chhabra 55 Chiffon Lightweight Foil Print Cocktail Saree",
    "description": "Flowy midnight blue pure georgette-chiffon saree featuring shimmer foil leaf motifs and pre-stitched designer satin blouse.",
    "price": 1799,
    "mrp": 3299,
    "discount_percentage": 45,
    "stock_quantity": 50,
    "tags": "women, sarees, ethnic-wear, clothing, chiffon, cocktail, navy, shimmer, party",
    "rating": 4.6,
    "reviews_count": 160,
    "brand": "Chhabra 55",
    "color": "Navy Blue",
    "occasion": "Party / Evening",
    "size": "Free Size",
    "thumbnail": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wj_1",
    "id": "wj_1",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans-jeggings",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Levi's 721 High Rise Skinny Stretch Women Denim Jeans",
    "title": "Levi's 721 High Rise Skinny Stretch Women Denim Jeans",
    "description": "Flattering high-rise waist that holds in the tummy and flatters the hips. Sculpt hyper-stretch denim that never bags out.",
    "price": 2499,
    "mrp": 3999,
    "discount_percentage": 38,
    "stock_quantity": 55,
    "tags": "women, jeans, jeggings, clothing, western-wear, levis, skinny, high-rise, blue",
    "rating": 4.8,
    "reviews_count": 610,
    "brand": "Levi's",
    "fit": "Slim Fit",
    "color": "Blue",
    "size": "28",
    "thumbnail": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wj_2",
    "id": "wj_2",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans-jeggings",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Zara Style Wide-Leg High-Waist Vintage Blue Jeans",
    "title": "Zara Style Wide-Leg High-Waist Vintage Blue Jeans",
    "description": "Relaxed 90s vintage wide-leg fit in 100% rigid cotton denim. Medium vintage enzyme wash with raw fray cut hem.",
    "price": 2190,
    "mrp": 3790,
    "discount_percentage": 42,
    "stock_quantity": 45,
    "tags": "women, jeans, jeggings, clothing, western-wear, zara, wide-leg, vintage, blue",
    "rating": 4.9,
    "reviews_count": 420,
    "brand": "Zara",
    "fit": "Relaxed Fit",
    "color": "Sky Blue",
    "size": "30",
    "thumbnail": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wj_3",
    "id": "wj_3",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans-jeggings",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "H&M Women Ankle-Length Super Stretch Denim Jeggings",
    "title": "H&M Women Ankle-Length Super Stretch Denim Jeggings",
    "description": "Ultra-comfortable pull-on jeggings with wide supportive elastic waistband, mock front pockets, and real back patch pockets.",
    "price": 1199,
    "mrp": 1999,
    "discount_percentage": 40,
    "stock_quantity": 80,
    "tags": "women, jeans, jeggings, clothing, western-wear, hm, stretch, black",
    "rating": 4.6,
    "reviews_count": 380,
    "brand": "H&M",
    "fit": "Slim Fit",
    "color": "Black",
    "size": "28",
    "thumbnail": "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wj_4",
    "id": "wj_4",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans-jeggings",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Only Women Mid-Rise Distressed Boyfriend Denim Jeans",
    "title": "Only Women Mid-Rise Distressed Boyfriend Denim Jeans",
    "description": "Laid-back boyfriend cut with hand-distressed knee abrasions and cuffed ankle cuffs. Soft cotton-modal blend.",
    "price": 1699,
    "mrp": 2999,
    "discount_percentage": 43,
    "stock_quantity": 38,
    "tags": "women, jeans, jeggings, clothing, western-wear, only, boyfriend, distressed, blue",
    "rating": 4.7,
    "reviews_count": 210,
    "brand": "Only",
    "fit": "Relaxed Fit",
    "color": "Navy Blue",
    "size": "30",
    "thumbnail": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wj_5",
    "id": "wj_5",
    "category": "clothing",
    "category_name": "Clothing",
    "subcategory": "jeans-jeggings",
    "department": "women",
    "gender": "women",
    "recipient": "her, women",
    "section": "western-wear",
    "name": "Vero Moda Women Flare Leg Flared Bell Bottom Jeans",
    "title": "Vero Moda Women Flare Leg Flared Bell Bottom Jeans",
    "description": "Retro 70s flair rebooted with a modern mid-rise and stretch denim that hugs knees before dramatically flaring at the hem.",
    "price": 1899,
    "mrp": 3299,
    "discount_percentage": 42,
    "stock_quantity": 40,
    "tags": "women, jeans, jeggings, clothing, western-wear, vero-moda, flare, bell-bottoms, dark-blue",
    "rating": 4.8,
    "reviews_count": 195,
    "brand": "Vero Moda",
    "fit": "Regular Fit",
    "color": "Navy Blue",
    "size": "28",
    "thumbnail": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbc_1",
    "id": "kbc_1",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "boys-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys",
    "name": "U.S. Polo Assn. Kids Boys Colorblocked Cotton Pique Polo",
    "title": "U.S. Polo Assn. Kids Boys Colorblocked Cotton Pique Polo",
    "description": "Breathable 100% cotton pique polo with bold contrast chest stripe and signature big pony embroidery.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 75,
    "tags": "kids, boys, clothing, polo, us-polo, cotton, casual, summer",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "U.S. Polo Assn.",
    "color": "Red",
    "size": "6-8Y",
    "thumbnail": "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbc_2",
    "id": "kbc_2",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "boys-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys",
    "name": "Gini & Jony Boys Slim Fit Mid-Wash Stretch Denim Jeans",
    "title": "Gini & Jony Boys Slim Fit Mid-Wash Stretch Denim Jeans",
    "description": "Durable kid-proof stretch denim with adjustable inner buttonhole elastic waistband for growing kids.",
    "price": 1099,
    "mrp": 1999,
    "discount_percentage": 45,
    "stock_quantity": 60,
    "tags": "kids, boys, clothing, jeans, denim, gini-jony, stretch, blue",
    "rating": 4.7,
    "reviews_count": 185,
    "brand": "Gini & Jony",
    "color": "Blue",
    "size": "8-10Y",
    "thumbnail": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbc_3",
    "id": "kbc_3",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "boys-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys",
    "name": "Mothercare Boys Graphic Dinosaur Print Cotton T-Shirts (Pack of 2)",
    "title": "Mothercare Boys Graphic Dinosaur Print Cotton T-Shirts (Pack of 2)",
    "description": "Super-soft pure combed cotton tees with nickel-free shoulder snaps for easy dressing.",
    "price": 699,
    "mrp": 1299,
    "discount_percentage": 46,
    "stock_quantity": 80,
    "tags": "kids, boys, clothing, t-shirts, mothercare, cotton, pack-of-2",
    "rating": 4.9,
    "reviews_count": 220,
    "brand": "Mothercare",
    "color": "Green",
    "size": "3-4Y",
    "thumbnail": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbc_4",
    "id": "kbc_4",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "boys-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys",
    "name": "Allen Solly Junior Boys Formal Oxford Button-Down Shirt",
    "title": "Allen Solly Junior Boys Formal Oxford Button-Down Shirt",
    "description": "Smart crisp cotton oxford weave with button-down collar and chest pocket embroidery.",
    "price": 899,
    "mrp": 1599,
    "discount_percentage": 44,
    "stock_quantity": 50,
    "tags": "kids, boys, clothing, shirts, allen-solly, formal, white",
    "rating": 4.6,
    "reviews_count": 110,
    "brand": "Allen Solly",
    "color": "White",
    "size": "7-8Y",
    "thumbnail": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kbc_5",
    "id": "kbc_5",
    "category": "kids",
    "category_name": "Kids",
    "subcategory": "boys-clothing",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys",
    "name": "Manyavar Kids Boys Jacquard Kurta Pajama Festive Set",
    "title": "Manyavar Kids Boys Jacquard Kurta Pajama Festive Set",
    "description": "Festive silk blend brocade kurta with contrast churidar pajama. Soft cotton lining to protect delicate skin.",
    "price": 1799,
    "mrp": 2999,
    "discount_percentage": 40,
    "stock_quantity": 40,
    "tags": "kids, boys, clothing, ethnic, kurta, manyavar, festive, yellow",
    "rating": 4.8,
    "reviews_count": 165,
    "brand": "Manyavar",
    "color": "Yellow",
    "size": "5-6Y",
    "thumbnail": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bsk_1",
    "id": "bsk_1",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "skincare",
    "department": "beauty",
    "section": "skincare",
    "name": "Minimalist 10% Vitamin C Face Serum with Centella Extract",
    "title": "Minimalist 10% Vitamin C Face Serum with Centella Extract",
    "description": "Formulated with stable Ethyl Ascorbic Acid to illuminate dull skin, fade dark spots, and protect against UV free radicals.",
    "price": 665,
    "mrp": 699,
    "discount_percentage": 5,
    "stock_quantity": 120,
    "tags": "beauty, skincare, serum, vitamin-c, minimalist, brightening, face",
    "rating": 4.8,
    "reviews_count": 850,
    "brand": "Minimalist",
    "thumbnail": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bsk_2",
    "id": "bsk_2",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "skincare",
    "department": "beauty",
    "section": "skincare",
    "name": "CeraVe Hydrating Facial Cleanser for Normal to Dry Skin",
    "title": "CeraVe Hydrating Facial Cleanser for Normal to Dry Skin",
    "description": "Developed with dermatologists. Contains 3 essential ceramides and hyaluronic acid to cleanse without stripping natural moisture.",
    "price": 999,
    "mrp": 1299,
    "discount_percentage": 23,
    "stock_quantity": 80,
    "tags": "beauty, skincare, cleanser, cerave, hydrating, ceramides, face-wash",
    "rating": 4.9,
    "reviews_count": 1200,
    "brand": "CeraVe",
    "thumbnail": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bsk_3",
    "id": "bsk_3",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "skincare",
    "department": "beauty",
    "section": "skincare",
    "name": "Cetaphil Daily Advanced Ultra Hydrating Lotion (250ml)",
    "title": "Cetaphil Daily Advanced Ultra Hydrating Lotion (250ml)",
    "description": "Non-greasy, dermatologist recommended formula clinically proven to nourish sensitive and dry skin continuously for 48 hours.",
    "price": 495,
    "mrp": 550,
    "discount_percentage": 10,
    "stock_quantity": 110,
    "tags": "beauty, skincare, moisturizer, cetaphil, lotion, sensitive-skin",
    "rating": 4.7,
    "reviews_count": 670,
    "brand": "Cetaphil",
    "thumbnail": "https://images.unsplash.com/photo-1608248597359-26d97c36a439?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608248597359-26d97c36a439?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bsk_4",
    "id": "bsk_4",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "skincare",
    "department": "beauty",
    "section": "skincare",
    "name": "Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 50+",
    "title": "Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 50+",
    "description": "Helioplex broad-spectrum UVA/UVB protection with ultra-lightweight non-shiny matte dry-touch technology.",
    "price": 580,
    "mrp": 675,
    "discount_percentage": 14,
    "stock_quantity": 95,
    "tags": "beauty, skincare, sunscreen, neutrogena, spf50, matte, sun-protection",
    "rating": 4.8,
    "reviews_count": 940,
    "brand": "Neutrogena",
    "thumbnail": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "bsk_5",
    "id": "bsk_5",
    "category": "beauty",
    "category_name": "Beauty",
    "subcategory": "skincare",
    "department": "beauty",
    "section": "skincare",
    "name": "The Ordinary Niacinamide 10% + Zinc 1% Oil Control Serum",
    "title": "The Ordinary Niacinamide 10% + Zinc 1% Oil Control Serum",
    "description": "High-strength vitamin and mineral blemish formula that visibly tightens pores, regulates sebum, and balances skin texture.",
    "price": 600,
    "mrp": 750,
    "discount_percentage": 20,
    "stock_quantity": 140,
    "tags": "beauty, skincare, serum, the-ordinary, niacinamide, acne, pores",
    "rating": 4.8,
    "reviews_count": 1540,
    "brand": "The Ordinary",
    "thumbnail": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hbl_1",
    "id": "hbl_1",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "bedding",
    "department": "home-kitchen",
    "section": "bedding",
    "name": "Spaces 100% Pure Egyptian Cotton King Bedsheet Set (400 TC)",
    "title": "Spaces 100% Pure Egyptian Cotton King Bedsheet Set (400 TC)",
    "description": "Sateen woven from extra-long staple Egyptian cotton with silk-like softness and deep pockets fitting up to 14-inch mattresses.",
    "price": 2499,
    "mrp": 4499,
    "discount_percentage": 44,
    "stock_quantity": 50,
    "tags": "home-living, home-kitchen, bedding, bedsheets, spaces, cotton, luxury, king-size",
    "rating": 4.9,
    "reviews_count": 320,
    "brand": "Spaces",
    "color": "White",
    "thumbnail": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hbl_2",
    "id": "hbl_2",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "bedding",
    "department": "home-kitchen",
    "section": "bedding",
    "name": "Bombay Dyeing Microfiber All-Season Reversible AC Comforter",
    "title": "Bombay Dyeing Microfiber All-Season Reversible AC Comforter",
    "description": "Plush 200 GSM hypoallergenic siliconized fiber filling quilted in diamond pattern with dual-tone contemporary colorways.",
    "price": 1899,
    "mrp": 3499,
    "discount_percentage": 46,
    "stock_quantity": 65,
    "tags": "home-living, home-kitchen, bedding, comforter, bombay-dyeing, quilt, blanket",
    "rating": 4.7,
    "reviews_count": 210,
    "brand": "Bombay Dyeing",
    "color": "Navy Blue",
    "thumbnail": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hbl_3",
    "id": "hbl_3",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "bedding",
    "department": "home-kitchen",
    "section": "bedding",
    "name": "SleepyCat Premium Memory Foam Ergonomic Cervical Pillow",
    "title": "SleepyCat Premium Memory Foam Ergonomic Cervical Pillow",
    "description": "High-density orthopedic memory foam with cooling gel infusion and machine-washable bamboo fiber outer cover.",
    "price": 1499,
    "mrp": 2499,
    "discount_percentage": 40,
    "stock_quantity": 80,
    "tags": "home-living, home-kitchen, bedding, pillow, sleepycat, memory-foam, orthopedic",
    "rating": 4.8,
    "reviews_count": 450,
    "brand": "SleepyCat",
    "color": "White",
    "thumbnail": "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hbl_4",
    "id": "hbl_4",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "bedding",
    "department": "home-kitchen",
    "section": "bedding",
    "name": "Urban Space 9-Feet Heavy Thermal Blackout Curtains (Pack of 2)",
    "title": "Urban Space 9-Feet Heavy Thermal Blackout Curtains (Pack of 2)",
    "description": "Triple-weave blackout fabric blocking 99% sunlight and external noise. Rust-free stainless steel eyelets.",
    "price": 1299,
    "mrp": 2599,
    "discount_percentage": 50,
    "stock_quantity": 45,
    "tags": "home-living, home-kitchen, bedding, curtains, urban-space, blackout, grey",
    "rating": 4.6,
    "reviews_count": 180,
    "brand": "Urban Space",
    "color": "Charcoal",
    "thumbnail": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hbl_5",
    "id": "hbl_5",
    "category": "home-living",
    "category_name": "Home & Living",
    "subcategory": "bedding",
    "department": "home-kitchen",
    "section": "bedding",
    "name": "Portico New York Super Soft Flannel Fleece Warm Throw Blanket",
    "title": "Portico New York Super Soft Flannel Fleece Warm Throw Blanket",
    "description": "Feather-touch microfiber flannel fleece throw ideal for sofa snuggling or extra bed warmth. Anti-pilling and fade-proof.",
    "price": 999,
    "mrp": 1899,
    "discount_percentage": 47,
    "stock_quantity": 70,
    "tags": "home-living, home-kitchen, bedding, blanket, throw, portico, warm, fleece",
    "rating": 4.7,
    "reviews_count": 230,
    "brand": "Portico",
    "color": "Beige",
    "thumbnail": "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eah_1",
    "id": "eah_1",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "headphones",
    "department": "electronics",
    "section": "audio",
    "name": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    "title": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    "description": "Two processors controlling 8 microphones for unprecedented active noise cancellation. 30-hour battery life with 3-minute quick charging.",
    "price": 26990,
    "mrp": 34990,
    "discount_percentage": 23,
    "stock_quantity": 25,
    "tags": "electronics, audio, headphones, sony, anc, wireless, bluetooth, premium",
    "rating": 4.9,
    "reviews_count": 1100,
    "brand": "Sony",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eah_2",
    "id": "eah_2",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "headphones",
    "department": "electronics",
    "section": "audio",
    "name": "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    "title": "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    "description": "Up to 2x more Active Noise Cancellation with Adaptive Transparency and Personalized Spatial Audio with dynamic head tracking.",
    "price": 19990,
    "mrp": 24900,
    "discount_percentage": 20,
    "stock_quantity": 30,
    "tags": "electronics, audio, headphones, earbuds, apple, airpods, anc, wireless",
    "rating": 4.9,
    "reviews_count": 2400,
    "brand": "Apple",
    "color": "White",
    "thumbnail": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eah_3",
    "id": "eah_3",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "headphones",
    "department": "electronics",
    "section": "audio",
    "name": "boAt Airdopes 141 True Wireless Earbuds with 42H Playtime",
    "title": "boAt Airdopes 141 True Wireless Earbuds with 42H Playtime",
    "description": "ENx Environmental Noise Cancellation technology for crystal-clear calls, 8mm dynamic drivers, and IPX4 sweat and water resistance.",
    "price": 1199,
    "mrp": 4490,
    "discount_percentage": 73,
    "stock_quantity": 150,
    "tags": "electronics, audio, headphones, earbuds, boat, airdopes, budget, wireless",
    "rating": 4.5,
    "reviews_count": 3200,
    "brand": "boAt",
    "color": "Black",
    "thumbnail": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eah_4",
    "id": "eah_4",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "headphones",
    "department": "electronics",
    "section": "audio",
    "name": "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
    "title": "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
    "description": "2-way speaker system delivering loud, crystal-clear, powerful sound with deep bass. IP67 waterproof and dustproof with 12 hours playtime.",
    "price": 9999,
    "mrp": 13999,
    "discount_percentage": 29,
    "stock_quantity": 40,
    "tags": "electronics, audio, speakers, jbl, bluetooth, waterproof, portable, bass",
    "rating": 4.8,
    "reviews_count": 890,
    "brand": "JBL",
    "color": "Navy Blue",
    "thumbnail": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "eah_5",
    "id": "eah_5",
    "category": "electronics",
    "category_name": "Electronics",
    "subcategory": "headphones",
    "department": "electronics",
    "section": "audio",
    "name": "Bose SoundLink Revolve+ II 360-Degree Bluetooth Speaker",
    "title": "Bose SoundLink Revolve+ II 360-Degree Bluetooth Speaker",
    "description": "True 360-degree sound for consistent, uniform coverage. Seamless aluminum body with flexible fabric handle and 17 hours battery life.",
    "price": 24500,
    "mrp": 29500,
    "discount_percentage": 17,
    "stock_quantity": 20,
    "tags": "electronics, audio, speakers, bose, soundlink, 360-sound, bluetooth, premium",
    "rating": 4.9,
    "reviews_count": 420,
    "brand": "Bose",
    "color": "Charcoal",
    "thumbnail": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "st_1",
    "id": "st_1",
    "category": "stationary",
    "category_name": "Stationery",
    "subcategory": "notebooks",
    "name": "Classmate Pulse Spiral Notebook (Pack of 6, Ruled 300 Pages)",
    "title": "Classmate Pulse Spiral Notebook (Pack of 6, Ruled 300 Pages)",
    "description": "Premium 70 GSM elemental chlorine-free paper notebook with twin-wiro binding and perforated pages for effortless tearing.",
    "price": 420,
    "mrp": 540,
    "discount_percentage": 22,
    "stock_quantity": 85,
    "tags": "stationary, stationery, notebooks, classmate, spiral, college, school",
    "rating": 4.8,
    "reviews_count": 310,
    "brand": "Classmate",
    "thumbnail": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "st_2",
    "id": "st_2",
    "category": "stationary",
    "category_name": "Stationery",
    "subcategory": "pens",
    "name": "Parker Vector Matte Black Fountain Pen & Rollerball Gift Set",
    "title": "Parker Vector Matte Black Fountain Pen & Rollerball Gift Set",
    "description": "Iconic arrow clip design with stainless steel nib and Quink ink technology. Delivers exceptionally smooth and skip-free handwriting.",
    "price": 799,
    "mrp": 1050,
    "discount_percentage": 24,
    "stock_quantity": 42,
    "tags": "stationary, stationery, pens, parker, fountain, rollerball, gift, luxury",
    "rating": 4.7,
    "reviews_count": 180,
    "brand": "Parker",
    "thumbnail": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "st_3",
    "id": "st_3",
    "category": "stationary",
    "category_name": "Stationery",
    "subcategory": "art-craft",
    "name": "Faber-Castell Connector Paint Box Art Set (24 Assorted Shades)",
    "title": "Faber-Castell Connector Paint Box Art Set (24 Assorted Shades)",
    "description": "Vibrant, non-toxic connector watercolor paints with click-together cups and high pigmentation for aspiring artists and students.",
    "price": 380,
    "mrp": 450,
    "discount_percentage": 16,
    "stock_quantity": 60,
    "tags": "stationary, stationery, art-craft, faber-castell, colors, paints, drawing",
    "rating": 4.9,
    "reviews_count": 420,
    "brand": "Faber-Castell",
    "thumbnail": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "st_4",
    "id": "st_4",
    "category": "stationary",
    "category_name": "Stationery",
    "subcategory": "office-supplies",
    "name": "Post-it Super Sticky Notes Cube (Pastel Colors, 400 Sheets)",
    "title": "Post-it Super Sticky Notes Cube (Pastel Colors, 400 Sheets)",
    "description": "2x sticking power that holds stronger and lasts longer. Perfect for reminders, quick notes, brainstorming sessions and work desks.",
    "price": 299,
    "mrp": 380,
    "discount_percentage": 21,
    "stock_quantity": 90,
    "tags": "stationary, stationery, office-supplies, post-it, sticky-notes, memo",
    "rating": 4.6,
    "reviews_count": 275,
    "brand": "Post-it",
    "thumbnail": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "st_5",
    "id": "st_5",
    "category": "stationary",
    "category_name": "Stationery",
    "subcategory": "desk-organizers",
    "name": "Meshy Wire 7-Compartment Metal Mesh Desk Organizer with Drawer",
    "title": "Meshy Wire 7-Compartment Metal Mesh Desk Organizer with Drawer",
    "description": "Durable powder-coated steel mesh organizer for pens, staplers, clips, notepads, and phones. Keeps office desk clutter-free.",
    "price": 549,
    "mrp": 799,
    "discount_percentage": 31,
    "stock_quantity": 38,
    "tags": "stationary, stationery, desk-organizers, organizer, metal, office",
    "rating": 4.7,
    "reviews_count": 165,
    "brand": "Meshy Wire",
    "thumbnail": "https://images.unsplash.com/photo-1507842229451-77239c642739?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1507842229451-77239c642739?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gr_1",
    "id": "gr_1",
    "category": "grocery",
    "category_name": "Grocery",
    "subcategory": "staples",
    "name": "Daawat Rozana Gold Premium Basmati Rice (5 kg Bag)",
    "title": "Daawat Rozana Gold Premium Basmati Rice (5 kg Bag)",
    "description": "Aged to perfection with rich aroma and slender grains that extend up to 2.5 times when cooked. Ideal for everyday biryani and pulao.",
    "price": 385,
    "mrp": 490,
    "discount_percentage": 21,
    "stock_quantity": 110,
    "tags": "grocery, healthy-foods, staples, daawat, rice, basmati, grain",
    "rating": 4.8,
    "reviews_count": 920,
    "brand": "Daawat",
    "thumbnail": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gr_2",
    "id": "gr_2",
    "category": "grocery",
    "category_name": "Grocery",
    "subcategory": "snacks-beverages",
    "name": "Happilo Premium California Roasted & Salted Almonds (500g)",
    "title": "Happilo Premium California Roasted & Salted Almonds (500g)",
    "description": "Crunchy, handpicked Californian almonds dry roasted without added oil. Packed with plant protein, magnesium, and vitamin E.",
    "price": 499,
    "mrp": 695,
    "discount_percentage": 28,
    "stock_quantity": 75,
    "tags": "grocery, healthy-foods, snacks-beverages, happilo, almonds, dry-fruits, healthy",
    "rating": 4.9,
    "reviews_count": 1400,
    "brand": "Happilo",
    "thumbnail": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gr_3",
    "id": "gr_3",
    "category": "grocery",
    "category_name": "Grocery",
    "subcategory": "breakfast-dairy",
    "name": "Dabur 100% Pure Organic Raw Forest Honey Squeezy Pack (500g)",
    "title": "Dabur 100% Pure Organic Raw Forest Honey Squeezy Pack (500g)",
    "description": "NMR tested 100% pure honey sourced directly from pristine forest hives. Natural sweetener and immunity booster for daily warm water or toast.",
    "price": 245,
    "mrp": 315,
    "discount_percentage": 22,
    "stock_quantity": 95,
    "tags": "grocery, healthy-foods, breakfast-dairy, dabur, honey, organic, pure",
    "rating": 4.7,
    "reviews_count": 680,
    "brand": "Dabur",
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gr_4",
    "id": "gr_4",
    "category": "grocery",
    "category_name": "Grocery",
    "subcategory": "cooking-essentials",
    "name": "Fortune Sunlite Refined Sunflower Cooking Oil (1L Pouch)",
    "title": "Fortune Sunlite Refined Sunflower Cooking Oil (1L Pouch)",
    "description": "Light, healthy, and enriched with vitamins A & D. Low absorption technology ensures your food stays light and crispy.",
    "price": 145,
    "mrp": 175,
    "discount_percentage": 17,
    "stock_quantity": 120,
    "tags": "grocery, healthy-foods, cooking-essentials, fortune, oil, sunflower, cooking",
    "rating": 4.6,
    "reviews_count": 850,
    "brand": "Fortune",
    "thumbnail": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "gr_5",
    "id": "gr_5",
    "category": "grocery",
    "category_name": "Grocery",
    "subcategory": "cooking-essentials",
    "name": "Catch Pure Royal Shahi Garam Masala (100g Aroma Pack)",
    "title": "Catch Pure Royal Shahi Garam Masala (100g Aroma Pack)",
    "description": "Low temperature grinding technology preserves original aroma and volatile essential oils. Imparts royal fragrance to Indian curries and gravies.",
    "price": 95,
    "mrp": 115,
    "discount_percentage": 17,
    "stock_quantity": 150,
    "tags": "grocery, healthy-foods, cooking-essentials, catch, masala, spices, aromatics",
    "rating": 4.8,
    "reviews_count": 510,
    "brand": "Catch",
    "thumbnail": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hk_appl_1",
    "id": "hk_appl_1",
    "category": "home-living",
    "category_name": "Home & Kitchen",
    "subcategory": "mixer-grinders",
    "name": "Philips HL7756/00 750-Watt 3-Jar High-Speed Mixer Grinder",
    "title": "Philips HL7756/00 750-Watt 3-Jar High-Speed Mixer Grinder",
    "description": "Heavy-duty 750W Turbo motor with advanced air ventilation system and leak-proof food-grade stainless steel jars for tough grinding.",
    "price": 3299,
    "mrp": 4795,
    "discount_percentage": 31,
    "stock_quantity": 40,
    "tags": "home-living, home-kitchen, appliances, mixer-grinders, mixer, philips, grinder",
    "rating": 4.7,
    "reviews_count": 890,
    "brand": "Philips",
    "thumbnail": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hk_appl_2",
    "id": "hk_appl_2",
    "category": "home-living",
    "category_name": "Home & Kitchen",
    "subcategory": "fans",
    "name": "Crompton Hill Briz 1200 mm High Speed Decorative Ceiling Fan",
    "title": "Crompton Hill Briz 1200 mm High Speed Decorative Ceiling Fan",
    "description": "100% copper motor with double ball bearings and aerodynamic aluminium blades that deliver 205 CMM air delivery with silent operation.",
    "price": 1799,
    "mrp": 2490,
    "discount_percentage": 28,
    "stock_quantity": 55,
    "tags": "home-living, home-kitchen, appliances, fans, crompton, ceiling-fan, cooling",
    "rating": 4.6,
    "reviews_count": 640,
    "brand": "Crompton",
    "thumbnail": "https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hk_bath_1",
    "id": "hk_bath_1",
    "category": "home-living",
    "category_name": "Home & Kitchen",
    "subcategory": "bath-towels",
    "name": "Trident Comfort Living 100% Cotton 450 GSM Bath Towel Set (Pack of 2)",
    "title": "Trident Comfort Living 100% Cotton 450 GSM Bath Towel Set (Pack of 2)",
    "description": "Ultra-absorbent, quick-drying combed cotton towels engineered with Air Rich technology for cloud-like softness and zero color bleed.",
    "price": 699,
    "mrp": 1199,
    "discount_percentage": 42,
    "stock_quantity": 70,
    "tags": "home-living, home-kitchen, bathroom, bath-towels, trident, towels, cotton",
    "rating": 4.8,
    "reviews_count": 480,
    "brand": "Trident",
    "thumbnail": "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hk_gard_1",
    "id": "hk_gard_1",
    "category": "home-living",
    "category_name": "Home & Kitchen",
    "subcategory": "plant-pots",
    "name": "TrustBasket UV-Treated Heavy Duty Plastic Flower Planters (Set of 5)",
    "title": "TrustBasket UV-Treated Heavy Duty Plastic Flower Planters (Set of 5)",
    "description": "Durable 10-inch pots with drainage holes and saucers. Fade-resistant virgin plastic suitable for balcony, terrace, and indoor plants.",
    "price": 499,
    "mrp": 750,
    "discount_percentage": 33,
    "stock_quantity": 65,
    "tags": "home-living, home-kitchen, garden, plant-pots, trustbasket, planters, pots",
    "rating": 4.7,
    "reviews_count": 310,
    "brand": "TrustBasket",
    "thumbnail": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "hk_imp_1",
    "id": "hk_imp_1",
    "category": "home-living",
    "category_name": "Home & Kitchen",
    "subcategory": "tools",
    "name": "Bosch GSB 500W Professional Corded Impact Drill & Home Tool Kit",
    "title": "Bosch GSB 500W Professional Corded Impact Drill & Home Tool Kit",
    "description": "500W powerful motor with forward/reverse rotation, impact hammer mode, and 100 essential accessories for DIY home improvements.",
    "price": 3899,
    "mrp": 5499,
    "discount_percentage": 29,
    "stock_quantity": 28,
    "tags": "home-living, home-kitchen, improvement, tools, bosch, drill, hardware, toolkit",
    "rating": 4.9,
    "reviews_count": 760,
    "brand": "Bosch",
    "thumbnail": "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cs_1",
    "id": "wo_cs_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "casual-shoes",
    "name": "Carlton London Women Perforated Slip-On Casual Loafers",
    "title": "Carlton London Women Perforated Slip-On Casual Loafers",
    "description": "Breathable perforated synthetic upper with cushioned memory foam footbed and durable slip-resistant TPR sole for effortless all-day comfort.",
    "price": 1299,
    "mrp": 2499,
    "discount_percentage": 48,
    "stock_quantity": 45,
    "tags": "women, footwear, casual-shoes, loafers, carlton-london, shoes, slip-on, walking",
    "rating": 4.6,
    "reviews_count": 140,
    "brand": "Carlton London",
    "thumbnail": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
      },
      {
        "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cs_2",
    "id": "wo_cs_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "casual-shoes",
    "name": "Bata Women Solid Comfort Everyday Casual Walking Shoes",
    "title": "Bata Women Solid Comfort Everyday Casual Walking Shoes",
    "description": "Lightweight flexible sole with ergonomic arch support and breathable knit fabric upper. Ideal for office commute and casual outings.",
    "price": 999,
    "mrp": 1699,
    "discount_percentage": 41,
    "stock_quantity": 60,
    "tags": "women, footwear, casual-shoes, bata, comfort, flat-shoes, daily-wear",
    "rating": 4.5,
    "reviews_count": 220,
    "brand": "Bata",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cs_3",
    "id": "wo_cs_3",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "casual-shoes",
    "name": "Clarks Cloudsteppers Women Lightweight Slip-On Loafers",
    "title": "Clarks Cloudsteppers Women Lightweight Slip-On Loafers",
    "description": "Patented Cloudsteppers multi-density high-rebound cushioning with textile upper and featherlight EVA outsole.",
    "price": 2499,
    "mrp": 3999,
    "discount_percentage": 38,
    "stock_quantity": 35,
    "tags": "women, footwear, casual-shoes, clarks, cloudsteppers, loafers, premium",
    "rating": 4.8,
    "reviews_count": 95,
    "brand": "Clarks",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cs_4",
    "id": "wo_cs_4",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "casual-shoes",
    "name": "Puma Women Vikky V3 Casual Platform Court Shoes",
    "title": "Puma Women Vikky V3 Casual Platform Court Shoes",
    "description": "Classic basketball-inspired silhouette featuring SoftFoam+ comfort sockliner for instant step-in cushioning and durable rubber platform tooling.",
    "price": 2199,
    "mrp": 3499,
    "discount_percentage": 37,
    "stock_quantity": 50,
    "tags": "women, footwear, casual-shoes, puma, sneakers, platform, street-style",
    "rating": 4.7,
    "reviews_count": 180,
    "brand": "Puma",
    "thumbnail": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sn_1",
    "id": "wo_sn_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sneakers",
    "name": "Nike Women Air Max Bella Low-Top Training Sneakers",
    "title": "Nike Women Air Max Bella Low-Top Training Sneakers",
    "description": "Max Air heel cushioning combines with flat stable sole for optimal weight training and cardio conditioning. Breathable textured mesh upper.",
    "price": 4295,
    "mrp": 5995,
    "discount_percentage": 28,
    "stock_quantity": 40,
    "tags": "women, footwear, sneakers, nike, air-max, athletic, gym",
    "rating": 4.9,
    "reviews_count": 240,
    "brand": "Nike",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sn_2",
    "id": "wo_sn_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sneakers",
    "name": "Skechers Women D'Lites Memory Foam Chunky Sneakers",
    "title": "Skechers Women D'Lites Memory Foam Chunky Sneakers",
    "description": "Smooth trubuck leather and mesh fabric upper with Air Cooled Memory Foam insole and shock-absorbing athletic midsole.",
    "price": 3499,
    "mrp": 4999,
    "discount_percentage": 30,
    "stock_quantity": 35,
    "tags": "women, footwear, sneakers, skechers, d-lites, chunky-sneakers, memory-foam",
    "rating": 4.8,
    "reviews_count": 175,
    "brand": "Skechers",
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sn_3",
    "id": "wo_sn_3",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sneakers",
    "name": "Adidas Women Cloudfoam Pure Running-Inspired Sneakers",
    "title": "Adidas Women Cloudfoam Pure Running-Inspired Sneakers",
    "description": "Sock-like knit textile upper hugs foot comfortably while Cloudfoam memory sockliner cushions each step effortlessly.",
    "price": 2999,
    "mrp": 4599,
    "discount_percentage": 35,
    "stock_quantity": 55,
    "tags": "women, footwear, sneakers, adidas, cloudfoam, lightweight, lifestyle",
    "rating": 4.7,
    "reviews_count": 310,
    "brand": "Adidas",
    "thumbnail": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sn_4",
    "id": "wo_sn_4",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sneakers",
    "name": "Puma Women Smash V2 Platform Leather Lace-Up Sneakers",
    "title": "Puma Women Smash V2 Platform Leather Lace-Up Sneakers",
    "description": "Supple leather upper with signature Formstrip and elevated platform vulcanized rubber sole for crisp streetwear style.",
    "price": 2599,
    "mrp": 3999,
    "discount_percentage": 35,
    "stock_quantity": 40,
    "tags": "women, footwear, sneakers, puma, platform, leather, casual",
    "rating": 4.6,
    "reviews_count": 145,
    "brand": "Puma",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sp_1",
    "id": "wo_sp_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sports-shoes",
    "name": "Skechers Women Go Run Consistent Running Shoes",
    "title": "Skechers Women Go Run Consistent Running Shoes",
    "description": "ULTRA GO responsive midsole cushioning with Air Cooled Goga Mat insole for premium energy return during marathon and morning runs.",
    "price": 3299,
    "mrp": 4999,
    "discount_percentage": 34,
    "stock_quantity": 45,
    "tags": "women, footwear, sports-shoes, running, skechers, athletic, go-run",
    "rating": 4.8,
    "reviews_count": 190,
    "brand": "Skechers",
    "thumbnail": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sp_2",
    "id": "wo_sp_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sports-shoes",
    "name": "Adidas Women Galaxy 6 Breathable Mesh Running Shoes",
    "title": "Adidas Women Galaxy 6 Breathable Mesh Running Shoes",
    "description": "Lightweight mesh upper keeps feet ventilated while Cloudfoam midsole and OrthoLite sockliner absorb road impacts seamlessly.",
    "price": 2799,
    "mrp": 3999,
    "discount_percentage": 30,
    "stock_quantity": 50,
    "tags": "women, footwear, sports-shoes, adidas, galaxy, running, jogging",
    "rating": 4.7,
    "reviews_count": 260,
    "brand": "Adidas",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sp_3",
    "id": "wo_sp_3",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sports-shoes",
    "name": "Nike Women Revolution 6 Road Running Shoes",
    "title": "Nike Women Revolution 6 Road Running Shoes",
    "description": "Plush mesh along collar delivers a snug fit. Soft foam midsole creates a smooth, stable ride with computerized outsole traction.",
    "price": 3695,
    "mrp": 4495,
    "discount_percentage": 18,
    "stock_quantity": 35,
    "tags": "women, footwear, sports-shoes, nike, revolution, training, running",
    "rating": 4.8,
    "reviews_count": 320,
    "brand": "Nike",
    "thumbnail": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sp_4",
    "id": "wo_sp_4",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sports-shoes",
    "name": "Asics Women Gel-Contend 8 Cushioned Running Shoes",
    "title": "Asics Women Gel-Contend 8 Cushioned Running Shoes",
    "description": "Rearfoot GEL technology cushioning improves impact absorption and creates a softer feel at footstrike. Durable synthetic toe stitching.",
    "price": 3499,
    "mrp": 4999,
    "discount_percentage": 30,
    "stock_quantity": 40,
    "tags": "women, footwear, sports-shoes, asics, gel-contend, running, workout",
    "rating": 4.7,
    "reviews_count": 140,
    "brand": "Asics",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ff_1",
    "id": "wo_ff_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Crocs Women Classic Clog Water-Resistant Slide Slippers",
    "title": "Crocs Women Classic Clog Water-Resistant Slide Slippers",
    "description": "Original Croslite foam cushioning with pivoting heel straps for a secure fit. Water-friendly, buoyant, and easy to clean.",
    "price": 1995,
    "mrp": 2995,
    "discount_percentage": 33,
    "stock_quantity": 80,
    "tags": "women, footwear, flip-flops-slippers, crocs, clogs, slides, waterproof",
    "rating": 4.9,
    "reviews_count": 510,
    "brand": "Crocs",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ff_2",
    "id": "wo_ff_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Havaianas Women Slim Metallic Thong Flip Flops",
    "title": "Havaianas Women Slim Metallic Thong Flip Flops",
    "description": "Authentic Brazilian rubber flip flops with slim metallic straps, non-slip textured rice pattern footbed, and water-repellent finish.",
    "price": 1199,
    "mrp": 1799,
    "discount_percentage": 33,
    "stock_quantity": 65,
    "tags": "women, footwear, flip-flops-slippers, havaianas, beach, summer, flip-flops",
    "rating": 4.7,
    "reviews_count": 230,
    "brand": "Havaianas",
    "thumbnail": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ff_3",
    "id": "wo_ff_3",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Birkenstock Women Gizeh Birko-Flor Thong Sandals",
    "title": "Birkenstock Women Gizeh Birko-Flor Thong Sandals",
    "description": "Anatomically shaped cork-latex footbed lined with velvety suede. Adjustable metal pin buckle and lightweight shock-absorbing EVA sole.",
    "price": 4990,
    "mrp": 6990,
    "discount_percentage": 29,
    "stock_quantity": 25,
    "tags": "women, footwear, flip-flops-slippers, birkenstock, cork, orthopedic, sandals",
    "rating": 4.8,
    "reviews_count": 170,
    "brand": "Birkenstock",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ff_4",
    "id": "wo_ff_4",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Red Tape Women Soft EVA Dual-Strap Pool Slides",
    "title": "Red Tape Women Soft EVA Dual-Strap Pool Slides",
    "description": "Molded high-density EVA comfort slides engineered for waterproof indoor-outdoor versatility and featherlight cloud walking feel.",
    "price": 699,
    "mrp": 1499,
    "discount_percentage": 53,
    "stock_quantity": 90,
    "tags": "women, footwear, flip-flops-slippers, red-tape, slides, eva, slippers",
    "rating": 4.5,
    "reviews_count": 190,
    "brand": "Red Tape",
    "thumbnail": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_bt_1",
    "id": "wo_bt_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "boots",
    "name": "Truffle Collection Women Chunky Block Heel Chelsea Boots",
    "title": "Truffle Collection Women Chunky Block Heel Chelsea Boots",
    "description": "Elastic side gussets with back pull tabs and grooved lug platform sole. Made from premium faux leather with sleek matte finish.",
    "price": 2499,
    "mrp": 3999,
    "discount_percentage": 38,
    "stock_quantity": 30,
    "tags": "women, footwear, boots, chelsea-boots, truffle-collection, ankle-boots",
    "rating": 4.7,
    "reviews_count": 110,
    "brand": "Truffle Collection",
    "thumbnail": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_bt_2",
    "id": "wo_bt_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "boots",
    "name": "London Rag Women Lace-Up Combat Ankle Boots",
    "title": "London Rag Women Lace-Up Combat Ankle Boots",
    "description": "Sturdy lugged combat boots with round toe, cushioned footbed, side zip closure, and reinforced metal eyelets for edgy street style.",
    "price": 2999,
    "mrp": 4599,
    "discount_percentage": 35,
    "stock_quantity": 25,
    "tags": "women, footwear, boots, combat-boots, london-rag, lace-up, boots",
    "rating": 4.8,
    "reviews_count": 85,
    "brand": "London Rag",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sd_1",
    "id": "wo_sd_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sandals",
    "name": "Catwalk Women Embellished Strappy Wedge Party Sandals",
    "title": "Catwalk Women Embellished Strappy Wedge Party Sandals",
    "description": "Glamorous rhinestone encrusted straps with 2.5-inch comfortable cork-finish wedge heel and cushioned footbed.",
    "price": 1899,
    "mrp": 2999,
    "discount_percentage": 37,
    "stock_quantity": 40,
    "tags": "women, footwear, sandals, catwalk, wedges, party-wear, heels",
    "rating": 4.6,
    "reviews_count": 130,
    "brand": "Catwalk",
    "thumbnail": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sd_2",
    "id": "wo_sd_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "footwear",
    "subcategory": "sandals",
    "name": "Metro Women Metallic Block Heel Ankle Strap Sandals",
    "title": "Metro Women Metallic Block Heel Ankle Strap Sandals",
    "description": "Versatile metallic gold faux leather sandals with sturdy 2-inch block heel, square toe, and adjustable buckle fastening.",
    "price": 1699,
    "mrp": 2490,
    "discount_percentage": 32,
    "stock_quantity": 45,
    "tags": "women, footwear, sandals, metro, block-heels, ethnic, party",
    "rating": 4.7,
    "reviews_count": 160,
    "brand": "Metro",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ts_1",
    "id": "wo_ts_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "t-shirts",
    "name": "Levi's Women Classic Batwing Graphic Pure Cotton T-Shirt",
    "title": "Levi's Women Classic Batwing Graphic Pure Cotton T-Shirt",
    "description": "100% combed cotton jersey fabric with iconic Levi's red batwing logo print on chest. Regular fit with ribbed crew neck.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 85,
    "tags": "women, clothing, western-wear, t-shirts, levis, graphic-tees, cotton",
    "rating": 4.8,
    "reviews_count": 340,
    "brand": "Levi's",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ts_2",
    "id": "wo_ts_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "t-shirts",
    "name": "Zara Women Ribbed Slim Fit Crew Neck Cotton T-Shirt",
    "title": "Zara Women Ribbed Slim Fit Crew Neck Cotton T-Shirt",
    "description": "Fine rib knit stretch cotton tee designed for clean layering or casual styling. Soft hand-feel with neat double-stitched hems.",
    "price": 790,
    "mrp": 1190,
    "discount_percentage": 34,
    "stock_quantity": 70,
    "tags": "women, clothing, western-wear, t-shirts, zara, ribbed, slim-fit, basics",
    "rating": 4.6,
    "reviews_count": 180,
    "brand": "Zara",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ts_3",
    "id": "wo_ts_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "t-shirts",
    "name": "H&M Women Oversized Boyfriend Cotton Graphic T-Shirt",
    "title": "H&M Women Oversized Boyfriend Cotton Graphic T-Shirt",
    "description": "Relaxed drop-shoulder silhouette cut from heavyweight bio-washed cotton jersey. Vintage typographic chest print.",
    "price": 999,
    "mrp": 1499,
    "discount_percentage": 33,
    "stock_quantity": 65,
    "tags": "women, clothing, western-wear, t-shirts, hm, oversized, streetwear",
    "rating": 4.7,
    "reviews_count": 210,
    "brand": "H&M",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ts_4",
    "id": "wo_ts_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "t-shirts",
    "name": "Tommy Hilfiger Women Embroidered Flag Logo Regular Fit T-Shirt",
    "title": "Tommy Hilfiger Women Embroidered Flag Logo Regular Fit T-Shirt",
    "description": "Premium organic cotton tee with signature tricolor flag embroidery on chest and subtle sleeve tab detailing.",
    "price": 1799,
    "mrp": 2999,
    "discount_percentage": 40,
    "stock_quantity": 40,
    "tags": "women, clothing, western-wear, t-shirts, tommy-hilfiger, premium, cotton",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "Tommy Hilfiger",
    "thumbnail": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tr_1",
    "id": "wo_tr_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "trousers-pants",
    "name": "Marks & Spencer Women High-Waisted Tailored Ankle Trousers",
    "title": "Marks & Spencer Women High-Waisted Tailored Ankle Trousers",
    "description": "Smart bi-stretch tailored pants with neat front pleats, slant pockets, and tapered ankle length for sophisticated office elegance.",
    "price": 2499,
    "mrp": 3499,
    "discount_percentage": 29,
    "stock_quantity": 50,
    "tags": "women, clothing, western-wear, trousers-pants, formal-trousers, marks-spencer, workwear",
    "rating": 4.8,
    "reviews_count": 195,
    "brand": "Marks & Spencer",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tr_2",
    "id": "wo_tr_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "trousers-pants",
    "name": "Mango Women Pleated Wide-Leg Fluid Formal Trousers",
    "title": "Mango Women Pleated Wide-Leg Fluid Formal Trousers",
    "description": "Flowing crepe fabric wide-leg silhouette featuring high waist belt loops, concealed zip fly, and flattering fluid drape.",
    "price": 2990,
    "mrp": 4590,
    "discount_percentage": 35,
    "stock_quantity": 35,
    "tags": "women, clothing, western-wear, trousers-pants, wide-leg, mango, formal",
    "rating": 4.7,
    "reviews_count": 120,
    "brand": "Mango",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tr_3",
    "id": "wo_tr_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "trousers-pants",
    "name": "Allen Solly Women Straight Fit Stretch Cotton Chinos",
    "title": "Allen Solly Women Straight Fit Stretch Cotton Chinos",
    "description": "Breathable cotton twill infused with spandex for flexible movement. Classic mid-rise straight leg cut in versatile beige.",
    "price": 1699,
    "mrp": 2499,
    "discount_percentage": 32,
    "stock_quantity": 60,
    "tags": "women, clothing, western-wear, trousers-pants, allen-solly, chinos, casual",
    "rating": 4.6,
    "reviews_count": 165,
    "brand": "Allen Solly",
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tr_4",
    "id": "wo_tr_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "trousers-pants",
    "name": "Vero Moda Women Paperbag Waist Cotton Casual Trousers",
    "title": "Vero Moda Women Paperbag Waist Cotton Casual Trousers",
    "description": "Relaxed paperbag elasticated waist with fabric self-tie sash belt and tapered ankle cuffs. Lightweight breathable summer cotton.",
    "price": 1899,
    "mrp": 2799,
    "discount_percentage": 32,
    "stock_quantity": 45,
    "tags": "women, clothing, western-wear, trousers-pants, vero-moda, paperbag, casual",
    "rating": 4.5,
    "reviews_count": 90,
    "brand": "Vero Moda",
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tp_1",
    "id": "wo_tp_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Adidas Women Essentials 3-Stripes French Terry Track Pants",
    "title": "Adidas Women Essentials 3-Stripes French Terry Track Pants",
    "description": "Cozy cotton-blend French terry track pants featuring iconic 3-Stripes down the legs, ribbed cuffs, and elastic drawcord waistband.",
    "price": 2199,
    "mrp": 3299,
    "discount_percentage": 33,
    "stock_quantity": 50,
    "tags": "women, clothing, western-wear, track-pants, adidas, joggers, athleisure, gym",
    "rating": 4.8,
    "reviews_count": 280,
    "brand": "Adidas",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tp_2",
    "id": "wo_tp_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Nike Women Sportswear Club Fleece Relaxed Joggers",
    "title": "Nike Women Sportswear Club Fleece Relaxed Joggers",
    "description": "Brushed-back fleece provides ultra-soft warmth. Elastic waistband with adjustable flat drawcord and embroidered Futura Nike logo.",
    "price": 2695,
    "mrp": 3495,
    "discount_percentage": 23,
    "stock_quantity": 45,
    "tags": "women, clothing, western-wear, track-pants, nike, fleece, joggers, running",
    "rating": 4.9,
    "reviews_count": 310,
    "brand": "Nike",
    "thumbnail": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tp_3",
    "id": "wo_tp_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Puma Women Modern Basics Slim Fit Sweatpants",
    "title": "Puma Women Modern Basics Slim Fit Sweatpants",
    "description": "Sleek tapered silhouette made with recycled cotton fibers and moisture-wicking technology. Side slip pockets for phone storage.",
    "price": 1799,
    "mrp": 2799,
    "discount_percentage": 36,
    "stock_quantity": 55,
    "tags": "women, clothing, western-wear, track-pants, puma, sweatpants, yoga",
    "rating": 4.7,
    "reviews_count": 140,
    "brand": "Puma",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_tp_4",
    "id": "wo_tp_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Decathlon Domyos Women Breathable Cotton Yoga Track Pants",
    "title": "Decathlon Domyos Women Breathable Cotton Yoga Track Pants",
    "description": "Stretchy organic cotton blend designed specifically for yoga stretching, pilates, and lounging with non-restricting wide waistband.",
    "price": 999,
    "mrp": 1499,
    "discount_percentage": 33,
    "stock_quantity": 75,
    "tags": "women, clothing, western-wear, track-pants, decathlon, yoga, comfy",
    "rating": 4.6,
    "reviews_count": 195,
    "brand": "Decathlon",
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_lg_1",
    "id": "wo_lg_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "leggings",
    "name": "Go Colors Women 4-Way Stretch Cotton Ankle Length Leggings",
    "title": "Go Colors Women 4-Way Stretch Cotton Ankle Length Leggings",
    "description": "Premium 95% combed cotton and 5% elastane with durable 4-way stretch and gentle elastic waistband that doesn't roll down.",
    "price": 599,
    "mrp": 899,
    "discount_percentage": 33,
    "stock_quantity": 120,
    "tags": "women, clothing, western-wear, leggings, go-colors, stretch, ankle-length",
    "rating": 4.8,
    "reviews_count": 420,
    "brand": "Go Colors",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_lg_2",
    "id": "wo_lg_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "leggings",
    "name": "Biba Women Solid Pure Cotton Churidar Leggings",
    "title": "Biba Women Solid Pure Cotton Churidar Leggings",
    "description": "Traditional gathers at ankle hem designed to pair seamlessly with ethnic kurtas and anarkalis. Bio-washed for extra smoothness.",
    "price": 699,
    "mrp": 999,
    "discount_percentage": 30,
    "stock_quantity": 80,
    "tags": "women, clothing, ethnic-wear, leggings, biba, churidar, ethnic",
    "rating": 4.7,
    "reviews_count": 210,
    "brand": "Biba",
    "thumbnail": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_lg_3",
    "id": "wo_lg_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "leggings",
    "name": "Marks & Spencer Women High Waist Sculpting Workout Leggings",
    "title": "Marks & Spencer Women High Waist Sculpting Workout Leggings",
    "description": "Squat-proof blackout compressive fabric with supportive wide waistband and discreet hidden waistband key pocket.",
    "price": 1999,
    "mrp": 2999,
    "discount_percentage": 33,
    "stock_quantity": 40,
    "tags": "women, clothing, western-wear, leggings, marks-spencer, gym, workout",
    "rating": 4.9,
    "reviews_count": 175,
    "brand": "Marks & Spencer",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_lg_4",
    "id": "wo_lg_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "leggings",
    "name": "W for Woman Shimmer Finish Festive Ankle Leggings",
    "title": "W for Woman Shimmer Finish Festive Ankle Leggings",
    "description": "Lustrous gold and bronze shimmer woven into breathable lycra fabric. Ideal for wedding receptions and festive occasion styling.",
    "price": 899,
    "mrp": 1299,
    "discount_percentage": 31,
    "stock_quantity": 55,
    "tags": "women, clothing, ethnic-wear, leggings, w-for-woman, festive, shimmer",
    "rating": 4.6,
    "reviews_count": 98,
    "brand": "W for Woman",
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_co_1",
    "id": "wo_co_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "co-ord-sets",
    "name": "FabAlley Women Bohemian Floral Crop Top and Palazzo Co-ord Set",
    "title": "FabAlley Women Bohemian Floral Crop Top and Palazzo Co-ord Set",
    "description": "Vibrant bohemian floral printed crop top with tie-up shoulder straps paired with flowing high-waist palazzo pants in breezy rayon.",
    "price": 1799,
    "mrp": 2999,
    "discount_percentage": 40,
    "stock_quantity": 40,
    "tags": "women, clothing, western-wear, co-ord-sets, faballey, vacation, resort-wear",
    "rating": 4.7,
    "reviews_count": 140,
    "brand": "FabAlley",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_co_2",
    "id": "wo_co_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "co-ord-sets",
    "name": "Urbanic Women Linen Blend Blazer and Tailored Shorts Co-ord Set",
    "title": "Urbanic Women Linen Blend Blazer and Tailored Shorts Co-ord Set",
    "description": "Chic single-breasted notch lapel relaxed blazer with matching pleated high-rise shorts crafted from breathable linen cotton.",
    "price": 2490,
    "mrp": 3890,
    "discount_percentage": 36,
    "stock_quantity": 30,
    "tags": "women, clothing, western-wear, co-ord-sets, urbanic, blazer-set, summer",
    "rating": 4.8,
    "reviews_count": 95,
    "brand": "Urbanic",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_co_3",
    "id": "wo_co_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "co-ord-sets",
    "name": "Forever New Women Ribbed Knit Top and Midi Skirt Set",
    "title": "Forever New Women Ribbed Knit Top and Midi Skirt Set",
    "description": "Figure-flattering fine-gauge ribbed knit sleeveless crop top and matching bodycon midi skirt with side slit in sophisticated taupe.",
    "price": 3290,
    "mrp": 4990,
    "discount_percentage": 34,
    "stock_quantity": 25,
    "tags": "women, clothing, western-wear, co-ord-sets, forever-new, knitwear, party",
    "rating": 4.9,
    "reviews_count": 80,
    "brand": "Forever New",
    "thumbnail": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_co_4",
    "id": "wo_co_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "western-wear",
    "subcategory": "co-ord-sets",
    "name": "RSVP Women Satin V-Neck Top and Wide Leg Trouser Co-ord",
    "title": "RSVP Women Satin V-Neck Top and Wide Leg Trouser Co-ord",
    "description": "Luxurious glossy satin coord featuring wrap front V-neck top with pleated wide-leg trousers for upscale dinner parties.",
    "price": 2799,
    "mrp": 4299,
    "discount_percentage": 35,
    "stock_quantity": 35,
    "tags": "women, clothing, western-wear, co-ord-sets, rsvp, satin, evening-wear",
    "rating": 4.6,
    "reviews_count": 110,
    "brand": "RSVP",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ks_1",
    "id": "wo_ks_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurta-suit-sets",
    "name": "Biba Women Floral Embroidered Anarkali Kurta Set with Dupatta",
    "title": "Biba Women Floral Embroidered Anarkali Kurta Set with Dupatta",
    "description": "Flared pure cotton Anarkali kurta adorned with thread embroidery on yoke, paired with matching churidar pants and chiffon dupatta.",
    "price": 3499,
    "mrp": 5999,
    "discount_percentage": 42,
    "stock_quantity": 40,
    "tags": "women, clothing, ethnic-wear, kurta-suit-sets, biba, anarkali, festive, ethnic",
    "rating": 4.9,
    "reviews_count": 290,
    "brand": "Biba",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ks_2",
    "id": "wo_ks_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurta-suit-sets",
    "name": "Libas Women Zari Work Straight Kurta with Palazzo & Dupatta",
    "title": "Libas Women Zari Work Straight Kurta with Palazzo & Dupatta",
    "description": "Silk blend royal navy kurta featuring intricate gold zari sequin embroidery, elasticated matching palazzo, and woven banarasi border dupatta.",
    "price": 2699,
    "mrp": 4499,
    "discount_percentage": 40,
    "stock_quantity": 45,
    "tags": "women, clothing, ethnic-wear, kurta-suit-sets, libas, straight-kurta, palazzo-set",
    "rating": 4.8,
    "reviews_count": 185,
    "brand": "Libas",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ks_3",
    "id": "wo_ks_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurta-suit-sets",
    "name": "Aurelia Women Printed Cotton Straight Kurta Pant Dupatta Set",
    "title": "Aurelia Women Printed Cotton Straight Kurta Pant Dupatta Set",
    "description": "Refreshing pastel floral geometric block print 100% cotton daily kurta with cropped straight pants and lightweight mulmul dupatta.",
    "price": 1899,
    "mrp": 2999,
    "discount_percentage": 37,
    "stock_quantity": 60,
    "tags": "women, clothing, ethnic-wear, kurta-suit-sets, aurelia, cotton-suit, office-wear",
    "rating": 4.7,
    "reviews_count": 220,
    "brand": "Aurelia",
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_ks_4",
    "id": "wo_ks_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurta-suit-sets",
    "name": "W for Woman Chanderi Silk Festive Kurta Churidar Set",
    "title": "W for Woman Chanderi Silk Festive Kurta Churidar Set",
    "description": "Opulent ruby red Chanderi silk kurta with delicate gota patti detailing around neckline, paired with cotton churidar and organza dupatta.",
    "price": 3899,
    "mrp": 6499,
    "discount_percentage": 40,
    "stock_quantity": 30,
    "tags": "women, clothing, ethnic-wear, kurta-suit-sets, w-for-woman, silk, festive",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "W for Woman",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_kt_1",
    "id": "wo_kt_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurtis-tunics",
    "name": "Aurelia Women Floral Print Mandarin Collar A-line Kurti",
    "title": "Aurelia Women Floral Print Mandarin Collar A-line Kurti",
    "description": "Flattering A-line silhouette with three-quarter sleeves and mandarin keyhole collar. Premium breathable rayon crepe fabric.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 75,
    "tags": "women, clothing, ethnic-wear, kurtis-tunics, aurelia, kurti, daily-wear",
    "rating": 4.6,
    "reviews_count": 190,
    "brand": "Aurelia",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_kt_2",
    "id": "wo_kt_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurtis-tunics",
    "name": "Global Desi Women Boho Geometric Printed Flared Tunic",
    "title": "Global Desi Women Boho Geometric Printed Flared Tunic",
    "description": "Fusion boho style tunic with tiered hem, tasseled notch neckline, and vibrant contemporary motifs perfect for jeans styling.",
    "price": 1199,
    "mrp": 1999,
    "discount_percentage": 40,
    "stock_quantity": 50,
    "tags": "women, clothing, ethnic-wear, kurtis-tunics, global-desi, tunic, fusion",
    "rating": 4.7,
    "reviews_count": 130,
    "brand": "Global Desi",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_kt_3",
    "id": "wo_kt_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurtis-tunics",
    "name": "Fabindia Women Handloom Cotton Short Tunic Kurti",
    "title": "Fabindia Women Handloom Cotton Short Tunic Kurti",
    "description": "Pure artisanal handloom cotton short kurti featuring wooden button placket and roll-up sleeves for natural eco-friendly elegance.",
    "price": 1490,
    "mrp": 1990,
    "discount_percentage": 25,
    "stock_quantity": 40,
    "tags": "women, clothing, ethnic-wear, kurtis-tunics, fabindia, handloom, cotton-tunic",
    "rating": 4.8,
    "reviews_count": 160,
    "brand": "Fabindia",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_kt_4",
    "id": "wo_kt_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "ethnic-wear",
    "subcategory": "kurtis-tunics",
    "name": "Rangriti Women Chikankari Embroidered Straight Cotton Kurti",
    "title": "Rangriti Women Chikankari Embroidered Straight Cotton Kurti",
    "description": "Intricate tone-on-tone Lucknowi chikankari floral threadwork on soft breathable cambric cotton with side slits.",
    "price": 999,
    "mrp": 1699,
    "discount_percentage": 41,
    "stock_quantity": 65,
    "tags": "women, clothing, ethnic-wear, kurtis-tunics, rangriti, chikankari, embroidered",
    "rating": 4.7,
    "reviews_count": 210,
    "brand": "Rangriti",
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cl_1",
    "id": "wo_cl_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "clutches-wristlets",
    "name": "Baggit Women Textured Envelope Evening Party Clutch",
    "title": "Baggit Women Textured Envelope Evening Party Clutch",
    "description": "Sleek faux leather envelope clutch with magnetic snap closure, detachable crossbody chain strap, and interior card organizer.",
    "price": 1190,
    "mrp": 1890,
    "discount_percentage": 37,
    "stock_quantity": 45,
    "tags": "women, accessories, clutches-wristlets, baggit, party-clutch, evening-bag",
    "rating": 4.6,
    "reviews_count": 120,
    "brand": "Baggit",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cl_2",
    "id": "wo_cl_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "clutches-wristlets",
    "name": "Caprese Women Metallic Gold Hardcase Box Minaudiere Clutch",
    "title": "Caprese Women Metallic Gold Hardcase Box Minaudiere Clutch",
    "description": "Stunning crystal clasp hardcase minaudiere clutch with satin interior lining and gold snake chain strap for cocktail galas.",
    "price": 1999,
    "mrp": 3299,
    "discount_percentage": 39,
    "stock_quantity": 35,
    "tags": "women, accessories, clutches-wristlets, caprese, gold-clutch, wedding",
    "rating": 4.8,
    "reviews_count": 95,
    "brand": "Caprese",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cl_3",
    "id": "wo_cl_3",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "clutches-wristlets",
    "name": "Lavie Women Floral Embroidered Raw Silk Wedding Clutch",
    "title": "Lavie Women Floral Embroidered Raw Silk Wedding Clutch",
    "description": "Handcrafted zari and sequin embroidery on pure raw silk base. Compact yet fits phone, lipstick, and essentials effortlessly.",
    "price": 1499,
    "mrp": 2499,
    "discount_percentage": 40,
    "stock_quantity": 40,
    "tags": "women, accessories, clutches-wristlets, lavie, raw-silk, ethnic-clutch",
    "rating": 4.7,
    "reviews_count": 140,
    "brand": "Lavie",
    "thumbnail": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_cl_4",
    "id": "wo_cl_4",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "clutches-wristlets",
    "name": "Hidesign Women Handcrafted Vegetable Tanned Leather Wristlet",
    "title": "Hidesign Women Handcrafted Vegetable Tanned Leather Wristlet",
    "description": "Full grain vegetable tanned leather with solid brass hardware, detachable wrist strap, zip divider, and 6 RFID-blocking card slots.",
    "price": 2495,
    "mrp": 3595,
    "discount_percentage": 31,
    "stock_quantity": 25,
    "tags": "women, accessories, clutches-wristlets, hidesign, leather, wristlet, luxury",
    "rating": 4.9,
    "reviews_count": 110,
    "brand": "Hidesign",
    "thumbnail": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_wa_1",
    "id": "wo_wa_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "wallets",
    "name": "Hidesign Women Genuine Leather Zip-Around Wallet",
    "title": "Hidesign Women Genuine Leather Zip-Around Wallet",
    "description": "Premium handcrafted full-grain leather wallet with smooth metal zipper, center zip coin pouch, 12 card slots, and dual currency sleeves.",
    "price": 2295,
    "mrp": 3295,
    "discount_percentage": 30,
    "stock_quantity": 35,
    "tags": "women, accessories, wallets, hidesign, leather-wallet, rfid, zip-around",
    "rating": 4.9,
    "reviews_count": 195,
    "brand": "Hidesign",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_wa_2",
    "id": "wo_wa_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "wallets",
    "name": "Lavie Women Dual Tone Flap Coin & Card Slim Wallet",
    "title": "Lavie Women Dual Tone Flap Coin & Card Slim Wallet",
    "description": "Sophisticated dual-tone textured synthetic leather with snap flap button closure, ID window, and multi-compartment interior.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 60,
    "tags": "women, accessories, wallets, lavie, slim-wallet, compact",
    "rating": 4.6,
    "reviews_count": 145,
    "brand": "Lavie",
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_wa_3",
    "id": "wo_wa_3",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "wallets",
    "name": "Baggit Women Compact Trifold Travel Card Wallet",
    "title": "Baggit Women Compact Trifold Travel Card Wallet",
    "description": "Cruelty-free vegan leather trifold wallet engineered with quick-access thumb slide ID slot and zippered external change pocket.",
    "price": 750,
    "mrp": 1250,
    "discount_percentage": 40,
    "stock_quantity": 70,
    "tags": "women, accessories, wallets, baggit, vegan-leather, trifold",
    "rating": 4.5,
    "reviews_count": 120,
    "brand": "Baggit",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_wa_4",
    "id": "wo_wa_4",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "wallets",
    "name": "Fossil Women Logan RFID Leather Clutch Wallet",
    "title": "Fossil Women Logan RFID Leather Clutch Wallet",
    "description": "Classic American craftsmanship in pebbled leather with 2 bill compartments, 1 zipper pocket, 12 credit card slots, and RFID lining.",
    "price": 3995,
    "mrp": 5495,
    "discount_percentage": 27,
    "stock_quantity": 25,
    "tags": "women, accessories, wallets, fossil, logan, leather-clutch, premium",
    "rating": 4.8,
    "reviews_count": 180,
    "brand": "Fossil",
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sg_1",
    "id": "wo_sg_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "sunglasses",
    "name": "Ray-Ban Women Erika Round Polarized Sunglasses",
    "title": "Ray-Ban Women Erika Round Polarized Sunglasses",
    "description": "Classic round silhouette with rubberized nylon front, metallic metal temples, and 100% UV400 protective polarized gradient lenses.",
    "price": 5890,
    "mrp": 7590,
    "discount_percentage": 22,
    "stock_quantity": 35,
    "tags": "women, accessories, sunglasses, ray-ban, erika, polarized, uv400",
    "rating": 4.9,
    "reviews_count": 310,
    "brand": "Ray-Ban",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sg_2",
    "id": "wo_sg_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "sunglasses",
    "name": "Fastrack Women Gradient Cat-Eye UV Protected Sunglasses",
    "title": "Fastrack Women Gradient Cat-Eye UV Protected Sunglasses",
    "description": "Chic vintage cat-eye tortoiseshell frames with shatter-resistant polycarbonate gradient tinted lenses.",
    "price": 1199,
    "mrp": 1799,
    "discount_percentage": 33,
    "stock_quantity": 65,
    "tags": "women, accessories, sunglasses, fastrack, cat-eye, summer, shades",
    "rating": 4.6,
    "reviews_count": 220,
    "brand": "Fastrack",
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sg_3",
    "id": "wo_sg_3",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "sunglasses",
    "name": "Vogue Eyewear Women Butterfly Sunglasses",
    "title": "Vogue Eyewear Women Butterfly Sunglasses",
    "description": "Glamorous oversized butterfly frames with gleaming metallic logo hinges and anti-reflective high-definition lenses.",
    "price": 3490,
    "mrp": 4990,
    "discount_percentage": 30,
    "stock_quantity": 30,
    "tags": "women, accessories, sunglasses, vogue-eyewear, butterfly, oversized",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "Vogue Eyewear",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_sg_4",
    "id": "wo_sg_4",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "sunglasses",
    "name": "Polaroid Women Square Polarized Mirrored Sunglasses",
    "title": "Polaroid Women Square Polarized Mirrored Sunglasses",
    "description": "Ultralight stainless steel wire frame with premium glare-cutting Ultrasight polarized lenses for distortion-free crisp vision.",
    "price": 2790,
    "mrp": 3990,
    "discount_percentage": 30,
    "stock_quantity": 40,
    "tags": "women, accessories, sunglasses, polaroid, polarized, square-shades",
    "rating": 4.7,
    "reviews_count": 110,
    "brand": "Polaroid",
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_wt_1",
    "id": "wo_wt_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "watches",
    "name": "Titan Raga Viva Mother of Pearl Rose Gold Analog Watch",
    "title": "Titan Raga Viva Mother of Pearl Rose Gold Analog Watch",
    "description": "Genuine mother-of-pearl dial with Swarovski crystal hour markers, rose gold plated bracelet strap, and 30m water resistance.",
    "price": 4995,
    "mrp": 6995,
    "discount_percentage": 29,
    "stock_quantity": 40,
    "tags": "women, accessories, watches, titan, titan-raga, analog, rose-gold",
    "rating": 4.9,
    "reviews_count": 280,
    "brand": "Titan",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_wt_2",
    "id": "wo_wt_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "watches",
    "name": "Fossil Women Jacqueline Rose Gold-Tone Stainless Steel Watch",
    "title": "Fossil Women Jacqueline Rose Gold-Tone Stainless Steel Watch",
    "description": "Classic Roman numeral index dial with date window, slim 36mm case, and interchangeable mesh bracelet strap.",
    "price": 6495,
    "mrp": 8995,
    "discount_percentage": 28,
    "stock_quantity": 30,
    "tags": "women, accessories, watches, fossil, jacqueline, luxury-watch",
    "rating": 4.8,
    "reviews_count": 190,
    "brand": "Fossil",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "wo_wt_3",
    "id": "wo_wt_3",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "women",
    "gender": "women",
    "recipient": "women, her",
    "section": "accessories",
    "subcategory": "watches",
    "name": "Daniel Wellington Women Petite Melrose Rose Gold Mesh Watch",
    "title": "Daniel Wellington Women Petite Melrose Rose Gold Mesh Watch",
    "description": "Minimalist eggshell white dial framed by an ultra-thin 28mm rose gold case and elegant stainless steel Milanese mesh strap.",
    "price": 8999,
    "mrp": 11999,
    "discount_percentage": 25,
    "stock_quantity": 20,
    "tags": "women, accessories, watches, daniel-wellington, petite, minimalist",
    "rating": 4.9,
    "reviews_count": 145,
    "brand": "Daniel Wellington",
    "thumbnail": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bts_1",
    "id": "kd_bts_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-tshirts",
    "name": "U.S. Polo Assn. Kids Boys Striped Pure Cotton Polo T-Shirt",
    "title": "U.S. Polo Assn. Kids Boys Striped Pure Cotton Polo T-Shirt",
    "description": "Classic engineered yarn-dyed stripes in breathable 100% pique cotton with ribbed collar, two-button placket, and embroidered brand pony logo.",
    "price": 699,
    "mrp": 1299,
    "discount_percentage": 46,
    "stock_quantity": 65,
    "tags": "kids, boys, boys-clothing, boys-tshirts, polo, us-polo, cotton",
    "rating": 4.7,
    "reviews_count": 140,
    "brand": "U.S. Polo Assn. Kids",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bts_2",
    "id": "kd_bts_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-tshirts",
    "name": "Allen Solly Junior Boys Dinosaur Graphic Print Crew Neck T-Shirt",
    "title": "Allen Solly Junior Boys Dinosaur Graphic Print Crew Neck T-Shirt",
    "description": "Fun puff-printed prehistoric dinosaur illustration on soft bio-washed jersey cotton. Tagless label prevents itchy necks.",
    "price": 499,
    "mrp": 799,
    "discount_percentage": 38,
    "stock_quantity": 80,
    "tags": "kids, boys, boys-clothing, boys-tshirts, graphic-tee, allen-solly",
    "rating": 4.6,
    "reviews_count": 195,
    "brand": "Allen Solly Junior",
    "thumbnail": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bts_3",
    "id": "kd_bts_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-tshirts",
    "name": "Tommy Hilfiger Kids Boys Colorblock Pure Cotton T-Shirt",
    "title": "Tommy Hilfiger Kids Boys Colorblock Pure Cotton T-Shirt",
    "description": "Signature navy, white, and red colorblocked panels with bold brand lettering across chest. Made from organic combed cotton.",
    "price": 1199,
    "mrp": 1999,
    "discount_percentage": 40,
    "stock_quantity": 45,
    "tags": "kids, boys, boys-clothing, boys-tshirts, tommy-hilfiger, colorblock",
    "rating": 4.9,
    "reviews_count": 85,
    "brand": "Tommy Hilfiger Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bts_4",
    "id": "kd_bts_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-tshirts",
    "name": "Puma Kids Boys Active DryFit Sports Performance T-Shirt",
    "title": "Puma Kids Boys Active DryFit Sports Performance T-Shirt",
    "description": "dryCELL moisture-wicking technology draws sweat away from the skin during outdoor play and football matches. Ultra-lightweight mesh.",
    "price": 649,
    "mrp": 999,
    "discount_percentage": 35,
    "stock_quantity": 70,
    "tags": "kids, boys, boys-clothing, boys-tshirts, puma, sports-tee, drycell",
    "rating": 4.8,
    "reviews_count": 160,
    "brand": "Puma Kids",
    "thumbnail": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_1",
    "id": "kd_bsh_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shirts",
    "name": "Mothercare Boys Classic Plaid Checkered Pure Cotton Shirt",
    "title": "Mothercare Boys Classic Plaid Checkered Pure Cotton Shirt",
    "description": "Soft yarn-dyed brushed cotton plaid shirt with curved hem, chest pocket, and roll-up button sleeve tabs for smart casual events.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 50,
    "tags": "kids, boys, boys-clothing, boys-shirts, checkered-shirt, mothercare",
    "rating": 4.7,
    "reviews_count": 110,
    "brand": "Mothercare",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_2",
    "id": "kd_bsh_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shirts",
    "name": "U.S. Polo Assn. Kids Boys Oxford Button-Down Casual Shirt",
    "title": "U.S. Polo Assn. Kids Boys Oxford Button-Down Casual Shirt",
    "description": "Crisp breathable cotton Oxford weave featuring button-down collar and contrast inner cuff detailing for family dinners and parties.",
    "price": 999,
    "mrp": 1699,
    "discount_percentage": 41,
    "stock_quantity": 55,
    "tags": "kids, boys, boys-clothing, boys-shirts, oxford-shirt, us-polo",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "U.S. Polo Assn. Kids",
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_3",
    "id": "kd_bsh_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shirts",
    "name": "GAP Kids Boys Washed Denim Western Long Sleeve Shirt",
    "title": "GAP Kids Boys Washed Denim Western Long Sleeve Shirt",
    "description": "Authentic lightweight cotton denim with snap-button front closures, pointed western yokes, and dual chest flap pockets.",
    "price": 1299,
    "mrp": 2199,
    "discount_percentage": 41,
    "stock_quantity": 40,
    "tags": "kids, boys, boys-clothing, boys-shirts, denim-shirt, gap-kids",
    "rating": 4.9,
    "reviews_count": 95,
    "brand": "GAP Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_4",
    "id": "kd_bsh_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shirts",
    "name": "Marks & Spencer Kids Boys Pure Linen Mandarin Collar Shirt",
    "title": "Marks & Spencer Kids Boys Pure Linen Mandarin Collar Shirt",
    "description": "Cooling pure European linen with stylish band collar and relaxed breezy fit for summer vacations and weddings.",
    "price": 1499,
    "mrp": 2299,
    "discount_percentage": 35,
    "stock_quantity": 35,
    "tags": "kids, boys, boys-clothing, boys-shirts, linen-shirt, marks-spencer",
    "rating": 4.8,
    "reviews_count": 75,
    "brand": "Marks & Spencer Kids",
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bj_1",
    "id": "kd_bj_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-jeans",
    "name": "Levi's Kids Boys 511 Slim Fit Stretch Denim Jeans",
    "title": "Levi's Kids Boys 511 Slim Fit Stretch Denim Jeans",
    "description": "Modern slim fit with room to move. Crafted with performance stretch denim and an interior adjustable buttonhole waistband.",
    "price": 1499,
    "mrp": 2499,
    "discount_percentage": 40,
    "stock_quantity": 60,
    "tags": "kids, boys, boys-clothing, boys-jeans, levis, 511, slim-fit, denim",
    "rating": 4.8,
    "reviews_count": 220,
    "brand": "Levi's Kids",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bj_2",
    "id": "kd_bj_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-jeans",
    "name": "Flying Machine Kids Boys Tapered Fit Washed Stretch Jeans",
    "title": "Flying Machine Kids Boys Tapered Fit Washed Stretch Jeans",
    "description": "Mild whiskering and fading with 5 pockets and flexible elastane blend for rough-and-tumble playground activities.",
    "price": 999,
    "mrp": 1699,
    "discount_percentage": 41,
    "stock_quantity": 75,
    "tags": "kids, boys, boys-clothing, boys-jeans, flying-machine, stretch-jeans",
    "rating": 4.6,
    "reviews_count": 140,
    "brand": "Flying Machine Kids",
    "thumbnail": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bj_3",
    "id": "kd_bj_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-jeans",
    "name": "Pepe Jeans Kids Boys Mid-Rise Distressed Denim Jeans",
    "title": "Pepe Jeans Kids Boys Mid-Rise Distressed Denim Jeans",
    "description": "Authentic British denim with stylish knee abrasions, zip fly, leather back patch, and inner elastic adjusters.",
    "price": 1399,
    "mrp": 2299,
    "discount_percentage": 39,
    "stock_quantity": 45,
    "tags": "kids, boys, boys-clothing, boys-jeans, pepe-jeans, distressed",
    "rating": 4.7,
    "reviews_count": 110,
    "brand": "Pepe Jeans Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bj_4",
    "id": "kd_bj_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-jeans",
    "name": "GAP Kids Boys Classic Straight Leg Dark Wash Jeans",
    "title": "GAP Kids Boys Classic Straight Leg Dark Wash Jeans",
    "description": "Deep indigo dye with contrast gold topstitching and reinforced bar tacking on stress points for maximum durability.",
    "price": 1599,
    "mrp": 2499,
    "discount_percentage": 36,
    "stock_quantity": 40,
    "tags": "kids, boys, boys-clothing, boys-jeans, gap-kids, straight-fit",
    "rating": 4.8,
    "reviews_count": 95,
    "brand": "GAP Kids",
    "thumbnail": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_11",
    "id": "kd_bsh_11",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shorts",
    "name": "U.S. Polo Assn. Kids Boys Cargo Cotton Twill Shorts",
    "title": "U.S. Polo Assn. Kids Boys Cargo Cotton Twill Shorts",
    "description": "Durable cotton twill fabric with side cargo utility pockets, zip fly, and adjustable elastic waistband tabs for growing boys.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 65,
    "tags": "kids, boys, boys-clothing, boys-shorts, cargo-shorts, us-polo",
    "rating": 4.7,
    "reviews_count": 130,
    "brand": "U.S. Polo Assn. Kids",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_12",
    "id": "kd_bsh_12",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shorts",
    "name": "Puma Kids Boys French Terry Elastic Waist Running Shorts",
    "title": "Puma Kids Boys French Terry Elastic Waist Running Shorts",
    "description": "Breathable moisture-wicking French terry knit with contrast side binding and drawstring elastic waist for sports and cycling.",
    "price": 649,
    "mrp": 1099,
    "discount_percentage": 41,
    "stock_quantity": 80,
    "tags": "kids, boys, boys-clothing, boys-shorts, puma, running-shorts, sports",
    "rating": 4.8,
    "reviews_count": 175,
    "brand": "Puma Kids",
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_13",
    "id": "kd_bsh_13",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shorts",
    "name": "Allen Solly Junior Boys Chino Shorts with Pockets",
    "title": "Allen Solly Junior Boys Chino Shorts with Pockets",
    "description": "Tailored flat-front cotton chino shorts with slant pockets and turn-up hems in cheerful navy and khaki colors.",
    "price": 749,
    "mrp": 1299,
    "discount_percentage": 42,
    "stock_quantity": 50,
    "tags": "kids, boys, boys-clothing, boys-shorts, chino-shorts, allen-solly",
    "rating": 4.6,
    "reviews_count": 110,
    "brand": "Allen Solly Junior",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_bsh_14",
    "id": "kd_bsh_14",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, boys",
    "section": "boys-clothing",
    "subcategory": "boys-shorts",
    "name": "Mothercare Boys Washed Denim Pull-On Summer Shorts",
    "title": "Mothercare Boys Washed Denim Pull-On Summer Shorts",
    "description": "Super-soft washed lightweight denim with rib-knit elastic pull-on waistband and mock fly for easy dressing.",
    "price": 699,
    "mrp": 1199,
    "discount_percentage": 42,
    "stock_quantity": 70,
    "tags": "kids, boys, boys-clothing, boys-shorts, denim-shorts, mothercare",
    "rating": 4.7,
    "reviews_count": 90,
    "brand": "Mothercare",
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gd_1",
    "id": "kd_gd_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-dresses",
    "name": "GAP Kids Girls Floral Print Tiered Pure Cotton Frock",
    "title": "GAP Kids Girls Floral Print Tiered Pure Cotton Frock",
    "description": "Flowy three-tiered silhouette with flutter sleeves and back keyhole button closure. 100% breathable organic cotton lawn.",
    "price": 1199,
    "mrp": 1999,
    "discount_percentage": 40,
    "stock_quantity": 60,
    "tags": "kids, girls, girls-clothing, girls-dresses, frock, floral, gap-kids",
    "rating": 4.9,
    "reviews_count": 230,
    "brand": "GAP Kids",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gd_2",
    "id": "kd_gd_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-dresses",
    "name": "U.S. Polo Assn. Kids Girls A-Line Striped Casual Dress",
    "title": "U.S. Polo Assn. Kids Girls A-Line Striped Casual Dress",
    "description": "Nautical stripes in soft cotton knit with polo collar, gathered waistline, and signature brand embroidery.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 50,
    "tags": "kids, girls, girls-clothing, girls-dresses, us-polo, a-line, casual",
    "rating": 4.7,
    "reviews_count": 145,
    "brand": "U.S. Polo Assn. Kids",
    "thumbnail": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gd_3",
    "id": "kd_gd_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-dresses",
    "name": "Marks & Spencer Kids Girls Broderie Anglaise Party Dress",
    "title": "Marks & Spencer Kids Girls Broderie Anglaise Party Dress",
    "description": "Exquisite embroidered eyelet embroidery with scalloped hem, soft pure cotton lining, and matching satin ribbon sash.",
    "price": 1899,
    "mrp": 2999,
    "discount_percentage": 37,
    "stock_quantity": 35,
    "tags": "kids, girls, girls-clothing, girls-dresses, party-dress, marks-spencer",
    "rating": 4.9,
    "reviews_count": 110,
    "brand": "Marks & Spencer Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gd_4",
    "id": "kd_gd_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-dresses",
    "name": "Mothercare Girls Unicorn Graphic Tulle Skirt Party Dress",
    "title": "Mothercare Girls Unicorn Graphic Tulle Skirt Party Dress",
    "description": "Sparkling glitter unicorn print on jersey bodice combined with multi-layer flouncy tulle tutu skirt for birthdays.",
    "price": 1299,
    "mrp": 1999,
    "discount_percentage": 35,
    "stock_quantity": 45,
    "tags": "kids, girls, girls-clothing, girls-dresses, unicorn, tulle, mothercare",
    "rating": 4.8,
    "reviews_count": 160,
    "brand": "Mothercare",
    "thumbnail": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gt_1",
    "id": "kd_gt_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-tops",
    "name": "Zara Kids Girls Ruffled Sleeve Peplum Cotton Top",
    "title": "Zara Kids Girls Ruffled Sleeve Peplum Cotton Top",
    "description": "Charming flutter ruffle shoulders with flared peplum hem and button-back fastening in pastel mint cotton.",
    "price": 790,
    "mrp": 1290,
    "discount_percentage": 39,
    "stock_quantity": 55,
    "tags": "kids, girls, girls-clothing, girls-tops, zara, peplum, ruffled",
    "rating": 4.7,
    "reviews_count": 120,
    "brand": "Zara Kids",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gt_2",
    "id": "kd_gt_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-tops",
    "name": "Mango Kids Girls Embroidered Smocked Floral Blouse",
    "title": "Mango Kids Girls Embroidered Smocked Floral Blouse",
    "description": "Elastic smocked bodice with delicate floral ditsy print and square neck cut from featherlight pure cotton voile.",
    "price": 890,
    "mrp": 1490,
    "discount_percentage": 40,
    "stock_quantity": 45,
    "tags": "kids, girls, girls-clothing, girls-tops, mango, smocked, floral",
    "rating": 4.8,
    "reviews_count": 90,
    "brand": "Mango Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gt_3",
    "id": "kd_gt_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-tops",
    "name": "H&M Kids Girls Ribbed Butterfly Sleeve T-Shirt Top",
    "title": "H&M Kids Girls Ribbed Butterfly Sleeve T-Shirt Top",
    "description": "Super-soft stretch cotton rib jersey with wavy lettuce hems and butterfly flutter sleeves for everyday comfort.",
    "price": 499,
    "mrp": 799,
    "discount_percentage": 38,
    "stock_quantity": 85,
    "tags": "kids, girls, girls-clothing, girls-tops, hm, ribbed, butterfly-sleeve",
    "rating": 4.6,
    "reviews_count": 170,
    "brand": "H&M Kids",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gt_4",
    "id": "kd_gt_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-tops",
    "name": "Allen Solly Junior Girls Polka Dot Tie-Up Summer Top",
    "title": "Allen Solly Junior Girls Polka Dot Tie-Up Summer Top",
    "description": "Classic polka dots with playful front hem tie knot and sleeveless cut for warm sunny park outings.",
    "price": 649,
    "mrp": 1099,
    "discount_percentage": 41,
    "stock_quantity": 60,
    "tags": "kids, girls, girls-clothing, girls-tops, allen-solly, polka-dots",
    "rating": 4.7,
    "reviews_count": 115,
    "brand": "Allen Solly Junior",
    "thumbnail": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gs_1",
    "id": "kd_gs_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-skirts",
    "name": "Mothercare Girls Pleated Tartan Checkered Skater Skirt",
    "title": "Mothercare Girls Pleated Tartan Checkered Skater Skirt",
    "description": "Classic knife pleats with built-in safety cotton shorts underneath and comfortable elastic waistband.",
    "price": 799,
    "mrp": 1399,
    "discount_percentage": 43,
    "stock_quantity": 50,
    "tags": "kids, girls, girls-clothing, girls-skirts, pleated-skirt, mothercare",
    "rating": 4.8,
    "reviews_count": 130,
    "brand": "Mothercare",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gs_2",
    "id": "kd_gs_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-skirts",
    "name": "GAP Kids Girls Denim Button-Front A-Line Mini Skirt",
    "title": "GAP Kids Girls Denim Button-Front A-Line Mini Skirt",
    "description": "Stretch denim skirt featuring metallic branded buttons down front, five pockets, and adjustable waist inner tabs.",
    "price": 999,
    "mrp": 1699,
    "discount_percentage": 41,
    "stock_quantity": 45,
    "tags": "kids, girls, girls-clothing, girls-skirts, denim-skirt, gap-kids",
    "rating": 4.7,
    "reviews_count": 95,
    "brand": "GAP Kids",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gs_3",
    "id": "kd_gs_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-skirts",
    "name": "Marks & Spencer Kids Girls Floral Tiered Swirl Skirt",
    "title": "Marks & Spencer Kids Girls Floral Tiered Swirl Skirt",
    "description": "Ditsy floral print tiered skirt made for twirling. Soft lightweight pure cotton with stretchy glitter waistband.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 55,
    "tags": "kids, girls, girls-clothing, girls-skirts, floral-skirt, marks-spencer",
    "rating": 4.9,
    "reviews_count": 85,
    "brand": "Marks & Spencer Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_gs_4",
    "id": "kd_gs_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-skirts",
    "name": "H&M Kids Girls Tulle Tutu Flared Party Skirt",
    "title": "H&M Kids Girls Tulle Tutu Flared Party Skirt",
    "description": "Multiple layers of shimmering star-speckled tulle with smooth satin lining and metallic elastic waistband for festive parties.",
    "price": 799,
    "mrp": 1299,
    "discount_percentage": 38,
    "stock_quantity": 60,
    "tags": "kids, girls, girls-clothing, girls-skirts, tutu, tulle-skirt, hm",
    "rating": 4.8,
    "reviews_count": 150,
    "brand": "H&M Kids",
    "thumbnail": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ge_1",
    "id": "kd_ge_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-ethnic",
    "name": "Biba Girls Brocade Flared Lehenga Choli with Net Dupatta",
    "title": "Biba Girls Brocade Flared Lehenga Choli with Net Dupatta",
    "description": "Traditional Banarasi brocade flared ghagra with metallic zari border, sweetheart neck choli blouse, and light net dupatta for weddings.",
    "price": 2499,
    "mrp": 4499,
    "discount_percentage": 44,
    "stock_quantity": 35,
    "tags": "kids, girls, girls-clothing, girls-ethnic, lehenga, biba, wedding",
    "rating": 4.9,
    "reviews_count": 190,
    "brand": "Biba Girls",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ge_2",
    "id": "kd_ge_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-ethnic",
    "name": "Aurelia Kids Girls Foil Printed Cotton Kurta Sharara Set",
    "title": "Aurelia Kids Girls Foil Printed Cotton Kurta Sharara Set",
    "description": "Festive gold foil printed short kurti with flared tiered sharara pants and chiffon dupatta. Soft breathable pure cotton.",
    "price": 1599,
    "mrp": 2799,
    "discount_percentage": 43,
    "stock_quantity": 45,
    "tags": "kids, girls, girls-clothing, girls-ethnic, sharara, aurelia, festive",
    "rating": 4.8,
    "reviews_count": 120,
    "brand": "Aurelia Kids",
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ge_3",
    "id": "kd_ge_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-ethnic",
    "name": "Global Desi Girls Floral Anarkali Kurti with Palazzo",
    "title": "Global Desi Girls Floral Anarkali Kurti with Palazzo",
    "description": "Contemporary ethnic fusion floral Anarkali with gota patti lace border and elasticated matching palazzo pants.",
    "price": 1399,
    "mrp": 2299,
    "discount_percentage": 39,
    "stock_quantity": 40,
    "tags": "kids, girls, girls-clothing, girls-ethnic, anarkali, global-desi",
    "rating": 4.7,
    "reviews_count": 85,
    "brand": "Global Desi Girls",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ge_4",
    "id": "kd_ge_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids, girls",
    "section": "girls-clothing",
    "subcategory": "girls-ethnic",
    "name": "Manyavar Mohey Kids Girls Silk Embroidered Ghagra Choli",
    "title": "Manyavar Mohey Kids Girls Silk Embroidered Ghagra Choli",
    "description": "Royal art silk ghagra choli with resham threadwork, stone accents, and inner soft cotton lining for non-scratchy festive elegance.",
    "price": 2899,
    "mrp": 4999,
    "discount_percentage": 42,
    "stock_quantity": 30,
    "tags": "kids, girls, girls-clothing, girls-ethnic, manyavar, silk, ghagra-choli",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "Manyavar Mohey Kids",
    "thumbnail": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ks_1",
    "id": "kd_ks_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-shoes",
    "name": "Skechers Kids Foamies Slip-On Light-Up Shoes",
    "title": "Skechers Kids Foamies Slip-On Light-Up Shoes",
    "description": "Fun light-up midsole activates with every step. Water-friendly sculpted Foamies EVA material with convertible heel strap.",
    "price": 1699,
    "mrp": 2499,
    "discount_percentage": 32,
    "stock_quantity": 60,
    "tags": "kids, footwear, kids-footwear, kids-shoes, skechers, light-up, clogs",
    "rating": 4.8,
    "reviews_count": 270,
    "brand": "Skechers Kids",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ks_2",
    "id": "kd_ks_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-shoes",
    "name": "Nike Kids Revolution 6 EasyOn Velcro Running Shoes",
    "title": "Nike Kids Revolution 6 EasyOn Velcro Running Shoes",
    "description": "Hook-and-loop strap and elastic laces make these easy for little hands to put on and take off. Cushioned foam sole.",
    "price": 2495,
    "mrp": 3295,
    "discount_percentage": 24,
    "stock_quantity": 45,
    "tags": "kids, footwear, kids-footwear, kids-shoes, nike, velcro, sneakers",
    "rating": 4.9,
    "reviews_count": 310,
    "brand": "Nike Kids",
    "thumbnail": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ks_3",
    "id": "kd_ks_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-shoes",
    "name": "Adidas Kids Tensaur Sport 2.0 Hook-and-Loop Sneakers",
    "title": "Adidas Kids Tensaur Sport 2.0 Hook-and-Loop Sneakers",
    "description": "Non-marking rubber cupsole provides superb grip indoors and on school playgrounds. Durable synthetic leather upper.",
    "price": 1999,
    "mrp": 2999,
    "discount_percentage": 33,
    "stock_quantity": 50,
    "tags": "kids, footwear, kids-footwear, kids-shoes, adidas, sneakers, school-shoes",
    "rating": 4.7,
    "reviews_count": 180,
    "brand": "Adidas Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ks_4",
    "id": "kd_ks_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-shoes",
    "name": "Puma Kids Smash V2 Ribbon SoftFoam+ Casual Shoes",
    "title": "Puma Kids Smash V2 Ribbon SoftFoam+ Casual Shoes",
    "description": "Tennis-inspired retro design with cute satin ribbon lace detail and SoftFoam+ sockliner for superior day-long cushioning.",
    "price": 1899,
    "mrp": 2799,
    "discount_percentage": 32,
    "stock_quantity": 40,
    "tags": "kids, footwear, kids-footwear, kids-shoes, puma, casual-shoes",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "Puma Kids",
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ksd_1",
    "id": "kd_ksd_1",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-sandals",
    "name": "Crocs Kids Classic Clogs All-Terrain Water Sandals",
    "title": "Crocs Kids Classic Clogs All-Terrain Water Sandals",
    "description": "Iconic lightweight Croslite foam sandals with ventilation ports for breathability and water drainage. Pivoting heel strap.",
    "price": 1495,
    "mrp": 2295,
    "discount_percentage": 35,
    "stock_quantity": 75,
    "tags": "kids, footwear, kids-footwear, kids-sandals, crocs, clogs, waterproof",
    "rating": 4.9,
    "reviews_count": 410,
    "brand": "Crocs Kids",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ksd_2",
    "id": "kd_ksd_2",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-sandals",
    "name": "Bata Kids Adjustable Strappy Adventure Outdoor Sandals",
    "title": "Bata Kids Adjustable Strappy Adventure Outdoor Sandals",
    "description": "Tough nylon webbing straps with quick dual velcro adjustments and grooved rubber outsole for beach walks and trekking.",
    "price": 799,
    "mrp": 1299,
    "discount_percentage": 38,
    "stock_quantity": 80,
    "tags": "kids, footwear, kids-footwear, kids-sandals, bata, adventure, velcro",
    "rating": 4.6,
    "reviews_count": 190,
    "brand": "Bata Kids",
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ksd_3",
    "id": "kd_ksd_3",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-sandals",
    "name": "Skechers Kids Hypno-Splash Water-Friendly Light-Up Sandals",
    "title": "Skechers Kids Hypno-Splash Water-Friendly Light-Up Sandals",
    "description": "Sporty river-style sandal with blinking lights in midsole pods that flash with every stomp. Fast-drying neoprene lining.",
    "price": 1999,
    "mrp": 2999,
    "discount_percentage": 33,
    "stock_quantity": 45,
    "tags": "kids, footwear, kids-footwear, kids-sandals, skechers, light-up",
    "rating": 4.8,
    "reviews_count": 160,
    "brand": "Skechers Kids",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "kd_ksd_4",
    "id": "kd_ksd_4",
    "category": "kids",
    "category_name": "Kids",
    "department": "kids",
    "gender": "kids",
    "recipient": "kids",
    "section": "kids-footwear",
    "subcategory": "kids-sandals",
    "name": "Clarks Kids Soft Leather First Walker Buckle Sandals",
    "title": "Clarks Kids Soft Leather First Walker Buckle Sandals",
    "description": "Supple genuine leather upper designed to support developing feet with padded collars and flexible scuff-resistant toe guards.",
    "price": 2299,
    "mrp": 3499,
    "discount_percentage": 34,
    "stock_quantity": 35,
    "tags": "kids, footwear, kids-footwear, kids-sandals, clarks, leather, first-walker",
    "rating": 4.9,
    "reviews_count": 110,
    "brand": "Clarks Kids",
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_cs_1",
    "id": "me_cs_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "casual-shoes",
    "name": "Woodland Men Handcrafted Suede Casual Lace-Up Shoes",
    "title": "Woodland Men Handcrafted Suede Casual Lace-Up Shoes",
    "description": "Rugged oiled suede leather upper with shock-absorbing polyurethane sole and heavy-duty metal lace eyelets for everyday urban exploring.",
    "price": 3295,
    "mrp": 4995,
    "discount_percentage": 34,
    "stock_quantity": 45,
    "tags": "men, footwear, casual-shoes, woodland, suede, lace-up, rugged",
    "rating": 4.8,
    "reviews_count": 310,
    "brand": "Woodland",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_cs_2",
    "id": "me_cs_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "casual-shoes",
    "name": "Red Tape Men Classic Off-White Sneaker Casual Shoes",
    "title": "Red Tape Men Classic Off-White Sneaker Casual Shoes",
    "description": "Clean minimalist low-top silhouette featuring perforated toe box, cushioned memory foam insole, and flexible rubber cupsole.",
    "price": 1399,
    "mrp": 4899,
    "discount_percentage": 71,
    "stock_quantity": 80,
    "tags": "men, footwear, casual-shoes, red-tape, white-sneakers, retro",
    "rating": 4.6,
    "reviews_count": 420,
    "brand": "Red Tape",
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_cs_3",
    "id": "me_cs_3",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "casual-shoes",
    "name": "Clarks Men Tilden Walk Leather Derby Casual Shoes",
    "title": "Clarks Men Tilden Walk Leather Derby Casual Shoes",
    "description": "Supple full-grain leather with discreet elastic gore panels for easy entry and OrthoLite footbed that reduces strain during long walks.",
    "price": 3999,
    "mrp": 5999,
    "discount_percentage": 33,
    "stock_quantity": 35,
    "tags": "men, footwear, casual-shoes, clarks, derby, leather-shoes, premium",
    "rating": 4.8,
    "reviews_count": 160,
    "brand": "Clarks",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_fs_1",
    "id": "me_fs_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "formal-shoes",
    "name": "Hush Puppies Men Classic Oxford Formal Leather Shoes",
    "title": "Hush Puppies Men Classic Oxford Formal Leather Shoes",
    "description": "Handcrafted genuine burnished leather with closed lacing Oxford system, Bounce technology cushioned footbed, and polished leather sole.",
    "price": 3499,
    "mrp": 4999,
    "discount_percentage": 30,
    "stock_quantity": 40,
    "tags": "men, footwear, formal-shoes, hush-puppies, oxford, office-wear",
    "rating": 4.8,
    "reviews_count": 210,
    "brand": "Hush Puppies",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_fs_2",
    "id": "me_fs_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "formal-shoes",
    "name": "Bata Men Derby Brogue Genuine Leather Formal Shoes",
    "title": "Bata Men Derby Brogue Genuine Leather Formal Shoes",
    "description": "Sophisticated wingtip brogue perforations with open lacing derby construct and durable slip-resistant TPR sole.",
    "price": 2199,
    "mrp": 3499,
    "discount_percentage": 37,
    "stock_quantity": 55,
    "tags": "men, footwear, formal-shoes, bata, brogues, derby, business",
    "rating": 4.7,
    "reviews_count": 180,
    "brand": "Bata",
    "thumbnail": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_fs_3",
    "id": "me_fs_3",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "formal-shoes",
    "name": "Louis Philippe Men Monk Strap Genuine Leather Shoes",
    "title": "Louis Philippe Men Monk Strap Genuine Leather Shoes",
    "description": "Sleek double monk strap design with solid gunmetal buckles, Italian leather upper, and hand-stitched welt detailing.",
    "price": 4499,
    "mrp": 6999,
    "discount_percentage": 35,
    "stock_quantity": 25,
    "tags": "men, footwear, formal-shoes, louis-philippe, monk-strap, luxury",
    "rating": 4.9,
    "reviews_count": 130,
    "brand": "Louis Philippe",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ff_1",
    "id": "me_ff_1",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Crocs Men Classic Slide Water-Resistant Slippers",
    "title": "Crocs Men Classic Slide Water-Resistant Slippers",
    "description": "Original Croslite foam footbed for reliable lightweight cushioning. Customized with 13 Jibbitz holes on each shoe.",
    "price": 1795,
    "mrp": 2495,
    "discount_percentage": 28,
    "stock_quantity": 70,
    "tags": "men, footwear, flip-flops-slippers, crocs, slides, waterproof",
    "rating": 4.8,
    "reviews_count": 360,
    "brand": "Crocs",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ff_2",
    "id": "me_ff_2",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Puma Men Epic Flip V2 Casual Slippers",
    "title": "Puma Men Epic Flip V2 Casual Slippers",
    "description": "Woven textile thong strap with cushioned EVA footbed and ridged outsole for poolside and beach traction.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 46,
    "stock_quantity": 85,
    "tags": "men, footwear, flip-flops-slippers, puma, flip-flops, beach",
    "rating": 4.6,
    "reviews_count": 240,
    "brand": "Puma",
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ff_3",
    "id": "me_ff_3",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Birkenstock Men Arizona Birko-Flor Two-Strap Sandals",
    "title": "Birkenstock Men Arizona Birko-Flor Two-Strap Sandals",
    "description": "Anatomically shaped cork-latex footbed with skin-friendly Birko-Flor upper and two individually adjustable metal buckles.",
    "price": 4990,
    "mrp": 6990,
    "discount_percentage": 29,
    "stock_quantity": 30,
    "tags": "men, footwear, flip-flops-slippers, birkenstock, arizona, cork-sandals",
    "rating": 4.9,
    "reviews_count": 180,
    "brand": "Birkenstock",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ff_4",
    "id": "me_ff_4",
    "category": "footwear",
    "category_name": "Footwear",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "footwear",
    "subcategory": "flip-flops-slippers",
    "name": "Red Tape Men Dual-Strap Textured EVA Comfort Slides",
    "title": "Red Tape Men Dual-Strap Textured EVA Comfort Slides",
    "description": "Ultra-lightweight shock-absorbing EVA foam construction with anti-skid bottom tread and ergonomic footbed contours.",
    "price": 649,
    "mrp": 1399,
    "discount_percentage": 53,
    "stock_quantity": 90,
    "tags": "men, footwear, flip-flops-slippers, red-tape, eva, slides, slippers",
    "rating": 4.5,
    "reviews_count": 195,
    "brand": "Red Tape",
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_tp_1",
    "id": "me_tp_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Nike Men Dri-FIT Tapered Fleece Training Track Pants",
    "title": "Nike Men Dri-FIT Tapered Fleece Training Track Pants",
    "description": "Soft French terry fabric with sweat-wicking technology helps you stay dry and comfortable before, during, and after workouts.",
    "price": 2795,
    "mrp": 3695,
    "discount_percentage": 24,
    "stock_quantity": 50,
    "tags": "men, clothing, western-wear, track-pants, nike, dri-fit, fleece, joggers",
    "rating": 4.9,
    "reviews_count": 320,
    "brand": "Nike",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_tp_2",
    "id": "me_tp_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Adidas Men Tiro 23 League Athletic Track Pants",
    "title": "Adidas Men Tiro 23 League Athletic Track Pants",
    "description": "Moisture-absorbing AEROREADY fabric with ankle zips for quick on-and-off over soccer boots and zippered side hand pockets.",
    "price": 2499,
    "mrp": 3799,
    "discount_percentage": 34,
    "stock_quantity": 60,
    "tags": "men, clothing, western-wear, track-pants, adidas, tiro, aeroready, football",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Adidas",
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_tp_3",
    "id": "me_tp_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Puma Men Evostripe Slim Fit Ergonomic Joggers",
    "title": "Puma Men Evostripe Slim Fit Ergonomic Joggers",
    "description": "Articulated Evostripe cutline ensures free movement while dryCELL fabric keeps sweat in check. Modern slim athletic profile.",
    "price": 1999,
    "mrp": 3299,
    "discount_percentage": 39,
    "stock_quantity": 45,
    "tags": "men, clothing, western-wear, track-pants, puma, evostripe, joggers, gym",
    "rating": 4.7,
    "reviews_count": 165,
    "brand": "Puma",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_tp_4",
    "id": "me_tp_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "western-wear",
    "subcategory": "track-pants",
    "name": "Under Armour Men Sportstyle Knit Everyday Sweatpants",
    "title": "Under Armour Men Sportstyle Knit Everyday Sweatpants",
    "description": "Durable knit fabric with smooth face and soft interior that traps heat. Ribbed waistband with external drawcord.",
    "price": 2699,
    "mrp": 3999,
    "discount_percentage": 32,
    "stock_quantity": 40,
    "tags": "men, clothing, western-wear, track-pants, under-armour, training, sweatpants",
    "rating": 4.8,
    "reviews_count": 120,
    "brand": "Under Armour",
    "thumbnail": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_sh_1",
    "id": "me_sh_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "western-wear",
    "subcategory": "shorts",
    "name": "Nike Men Dri-FIT Challenger 7-Inch Running Shorts",
    "title": "Nike Men Dri-FIT Challenger 7-Inch Running Shorts",
    "description": "Sweat-wicking Dri-FIT woven fabric with breathable mesh side panels, inner brief liner, and secure center back snap pocket.",
    "price": 1895,
    "mrp": 2495,
    "discount_percentage": 24,
    "stock_quantity": 55,
    "tags": "men, clothing, western-wear, shorts, nike, running-shorts, dri-fit",
    "rating": 4.8,
    "reviews_count": 210,
    "brand": "Nike",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_sh_2",
    "id": "me_sh_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "western-wear",
    "subcategory": "shorts",
    "name": "Levi's Men 505 Regular Fit Cut-Off Denim Shorts",
    "title": "Levi's Men 505 Regular Fit Cut-Off Denim Shorts",
    "description": "Classic straight fit denim shorts with zip fly, authentic copper rivets, and raw-edge frayed hems for warm summer weekends.",
    "price": 1699,
    "mrp": 2799,
    "discount_percentage": 39,
    "stock_quantity": 50,
    "tags": "men, clothing, western-wear, shorts, levis, 505, denim-shorts",
    "rating": 4.7,
    "reviews_count": 175,
    "brand": "Levi's",
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_sh_3",
    "id": "me_sh_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "western-wear",
    "subcategory": "shorts",
    "name": "Under Armour Men Tech Graphic Lightweight Gym Shorts",
    "title": "Under Armour Men Tech Graphic Lightweight Gym Shorts",
    "description": "UA Tech quick-drying fabric has an ultra-soft natural feel. Encased elastic waistband with internal drawcord and mesh hand pockets.",
    "price": 1399,
    "mrp": 1999,
    "discount_percentage": 30,
    "stock_quantity": 65,
    "tags": "men, clothing, western-wear, shorts, under-armour, gym-shorts, workout",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "Under Armour",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ej_1",
    "id": "me_ej_1",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "ethnic-wear",
    "subcategory": "ethnic-jackets",
    "name": "Manyavar Men Jacquard Silk Mandarin Collar Nehru Jacket",
    "title": "Manyavar Men Jacquard Silk Mandarin Collar Nehru Jacket",
    "description": "Royal banarasi jacquard weave with self-design floral boota motifs, mandarin collar, ornate metallic buttons, and chest pocket welt.",
    "price": 2999,
    "mrp": 4999,
    "discount_percentage": 40,
    "stock_quantity": 40,
    "tags": "men, clothing, ethnic-wear, ethnic-jackets, nehru-jacket, manyavar, wedding, festive",
    "rating": 4.9,
    "reviews_count": 240,
    "brand": "Manyavar",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ej_2",
    "id": "me_ej_2",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "ethnic-wear",
    "subcategory": "ethnic-jackets",
    "name": "Fabindia Men Tussar Silk Mandarin Collar Sleeveless Jacket",
    "title": "Fabindia Men Tussar Silk Mandarin Collar Sleeveless Jacket",
    "description": "Pure rich textured tussar silk sleeveless modi jacket featuring a clean tailored silhouette, front button placket, and side vents.",
    "price": 3490,
    "mrp": 4990,
    "discount_percentage": 30,
    "stock_quantity": 30,
    "tags": "men, clothing, ethnic-wear, ethnic-jackets, fabindia, tussar-silk, modi-jacket",
    "rating": 4.8,
    "reviews_count": 110,
    "brand": "Fabindia",
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ej_3",
    "id": "me_ej_3",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "ethnic-wear",
    "subcategory": "ethnic-jackets",
    "name": "Sojanya Men Embroidered Velvet Bandhgala Koti Jacket",
    "title": "Sojanya Men Embroidered Velvet Bandhgala Koti Jacket",
    "description": "Opulent micro-velvet fabric adorned with tone-on-tone resham embroidery along collar and placket. Fully satin lined.",
    "price": 2499,
    "mrp": 4499,
    "discount_percentage": 44,
    "stock_quantity": 35,
    "tags": "men, clothing, ethnic-wear, ethnic-jackets, sojanya, velvet, bandhgala",
    "rating": 4.7,
    "reviews_count": 95,
    "brand": "Sojanya",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_ej_4",
    "id": "me_ej_4",
    "category": "clothing",
    "category_name": "Clothing",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "ethnic-wear",
    "subcategory": "ethnic-jackets",
    "name": "Raymond Men Linen Blend Festive Nehru Jacket",
    "title": "Raymond Men Linen Blend Festive Nehru Jacket",
    "description": "Fine blended linen with structured tailored canvas, welt chest pocket with printed pocket square, and genuine horn buttons.",
    "price": 3999,
    "mrp": 5999,
    "discount_percentage": 33,
    "stock_quantity": 25,
    "tags": "men, clothing, ethnic-wear, ethnic-jackets, raymond, linen, luxury",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "Raymond",
    "thumbnail": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_sg_1",
    "id": "me_sg_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "sunglasses",
    "name": "Ray-Ban Men Aviator Classic Green G-15 Sunglasses",
    "title": "Ray-Ban Men Aviator Classic Green G-15 Sunglasses",
    "description": "Originally designed for U.S. aviators in 1937. Timeless gold metal frame with crystal green G-15 high clarity 100% UV protection lenses.",
    "price": 6590,
    "mrp": 8590,
    "discount_percentage": 23,
    "stock_quantity": 40,
    "tags": "men, accessories, sunglasses, ray-ban, aviator, classic, g-15",
    "rating": 4.9,
    "reviews_count": 450,
    "brand": "Ray-Ban",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_sg_2",
    "id": "me_sg_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "sunglasses",
    "name": "Oakley Men Holbrook Square Matte Black Polarized Sunglasses",
    "title": "Oakley Men Holbrook Square Matte Black Polarized Sunglasses",
    "description": "Lightweight O Matter frame with metal rivet accents and Prizm polarized lenses that enhance color, contrast, and detail.",
    "price": 7290,
    "mrp": 9490,
    "discount_percentage": 23,
    "stock_quantity": 30,
    "tags": "men, accessories, sunglasses, oakley, holbrook, polarized, sports",
    "rating": 4.8,
    "reviews_count": 220,
    "brand": "Oakley",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_sg_3",
    "id": "me_sg_3",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "sunglasses",
    "name": "Fastrack Men Polarized Navigator Pilot Sunglasses",
    "title": "Fastrack Men Polarized Navigator Pilot Sunglasses",
    "description": "Matte gunmetal frame with double brow bridge and scratch-resistant polarized TAC lenses for glare-free highway driving.",
    "price": 1499,
    "mrp": 2299,
    "discount_percentage": 35,
    "stock_quantity": 65,
    "tags": "men, accessories, sunglasses, fastrack, navigator, driving-shades",
    "rating": 4.6,
    "reviews_count": 310,
    "brand": "Fastrack",
    "thumbnail": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_bp_1",
    "id": "me_bp_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "backpacks",
    "name": "Wildcraft Men 35L Water-Resistant Padded Laptop Backpack",
    "title": "Wildcraft Men 35L Water-Resistant Padded Laptop Backpack",
    "description": "Triple-compartment durable ripstop polyester bag with 15.6-inch laptop sleeve, ergonomic air mesh back padding, and rain cover.",
    "price": 1899,
    "mrp": 3299,
    "discount_percentage": 42,
    "stock_quantity": 60,
    "tags": "men, accessories, backpacks, wildcraft, laptop-bag, college, travel",
    "rating": 4.8,
    "reviews_count": 510,
    "brand": "Wildcraft",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_bp_2",
    "id": "me_bp_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "backpacks",
    "name": "American Tourister Men Harlem 32L Everyday Backpack",
    "title": "American Tourister Men Harlem 32L Everyday Backpack",
    "description": "Tractum suspension straps reduce shoulder tension. Dual bottle holders, organizer pocket, and water-repellent dobby fabric.",
    "price": 1499,
    "mrp": 2600,
    "discount_percentage": 42,
    "stock_quantity": 75,
    "tags": "men, accessories, backpacks, american-tourister, commuter-backpack",
    "rating": 4.7,
    "reviews_count": 380,
    "brand": "American Tourister",
    "thumbnail": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_bp_3",
    "id": "me_bp_3",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "backpacks",
    "name": "Puma Men Pioneer Classic Unisex Travel Backpack",
    "title": "Puma Men Pioneer Classic Unisex Travel Backpack",
    "description": "Spacious main compartment with two-way zipper, padded laptop divider, front zip pocket, and reflective cat logo badge.",
    "price": 1299,
    "mrp": 2299,
    "discount_percentage": 43,
    "stock_quantity": 80,
    "tags": "men, accessories, backpacks, puma, pioneer, gym-bag, casual",
    "rating": 4.6,
    "reviews_count": 290,
    "brand": "Puma",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_wa_1",
    "id": "me_wa_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "wallets",
    "name": "Tommy Hilfiger Men Trifold Genuine Leather Wallet",
    "title": "Tommy Hilfiger Men Trifold Genuine Leather Wallet",
    "description": "Handcrafted calfskin leather trifold wallet with signature enamel flag ribbon, RFID theft protection, and clear ID window.",
    "price": 2499,
    "mrp": 3999,
    "discount_percentage": 38,
    "stock_quantity": 45,
    "tags": "men, accessories, wallets, tommy-hilfiger, leather-wallet, rfid",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Tommy Hilfiger",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_wa_2",
    "id": "me_wa_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "wallets",
    "name": "Wildhorn Men Vintage Hunter Leather Bifold Wallet with Coin Pocket",
    "title": "Wildhorn Men Vintage Hunter Leather Bifold Wallet with Coin Pocket",
    "description": "Distressed hunter leather develops a unique patina over time. Features 8 card slots, snap coin pouch, and dual note sections.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 80,
    "tags": "men, accessories, wallets, wildhorn, hunter-leather, bifold",
    "rating": 4.7,
    "reviews_count": 380,
    "brand": "Wildhorn",
    "thumbnail": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_bl_1",
    "id": "me_bl_1",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "belts",
    "name": "Tommy Hilfiger Men Reversible Black and Brown Leather Belt",
    "title": "Tommy Hilfiger Men Reversible Black and Brown Leather Belt",
    "description": "Twist buckle mechanism enables instant switching between smooth black and classic brown full-grain leather sides.",
    "price": 2199,
    "mrp": 3499,
    "discount_percentage": 37,
    "stock_quantity": 50,
    "tags": "men, accessories, belts, tommy-hilfiger, reversible, leather-belt",
    "rating": 4.8,
    "reviews_count": 260,
    "brand": "Tommy Hilfiger",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "me_bl_2",
    "id": "me_bl_2",
    "category": "accessories",
    "category_name": "Accessories",
    "department": "men",
    "gender": "men",
    "recipient": "men, him",
    "section": "accessories",
    "subcategory": "belts",
    "name": "Woodland Men Rugged Heavy-Duty Harness Buckle Leather Belt",
    "title": "Woodland Men Rugged Heavy-Duty Harness Buckle Leather Belt",
    "description": "Thick oil-tanned top-grain leather with antique brass finish roller buckle and contrast double edge stitching for jeans.",
    "price": 1495,
    "mrp": 2295,
    "discount_percentage": 35,
    "stock_quantity": 60,
    "tags": "men, accessories, belts, woodland, harness-buckle, jeans-belt",
    "rating": 4.7,
    "reviews_count": 195,
    "brand": "Woodland",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_ess_1",
    "id": "pj_ess_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Essentials",
    "childCategory": "Pooja Thali Sets",
    "name": "Shubh Labh Handcrafted Pure Brass Meenakari Pooja Thali Set (9 Pieces)",
    "title": "Shubh Labh Handcrafted Pure Brass Meenakari Pooja Thali Set (9 Pieces)",
    "description": "Traditional 11-inch embossed brass plate complete with bell, diya, incense holder, kalash, spoon, and kumkum katoris with ornate meenakari work.",
    "price": 1499,
    "mrp": 2299,
    "discount_percentage": 35,
    "stock_quantity": 45,
    "tags": "pooja, pooja-items, pooja-essentials, pooja-thali-sets, brass-thali, aarti, mandir, shubh-labh",
    "rating": 4.9,
    "reviews_count": 280,
    "brand": "Shubh Labh",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_ess_2",
    "id": "pj_ess_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Essentials",
    "childCategory": "Kalash",
    "name": "Vedic Vaani Traditional Embossed Copper Lota Kalash with Nariyal Stand",
    "title": "Vedic Vaani Traditional Embossed Copper Lota Kalash with Nariyal Stand",
    "description": "Handcrafted 100% pure copper sacred kalash pot with traditional Gayatri Mantra embossing and detachable coconut holder for sthapana rituals.",
    "price": 699,
    "mrp": 999,
    "discount_percentage": 30,
    "stock_quantity": 60,
    "tags": "pooja, pooja-items, pooja-essentials, kalash, copper-kalash, lota, vedic-vaani",
    "rating": 4.8,
    "reviews_count": 195,
    "brand": "Vedic Vaani",
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_ess_3",
    "id": "pj_ess_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Essentials",
    "childCategory": "Shankh",
    "name": "Pure Source Natural White Blowing Vamavarti Shankh with Brass Stand",
    "title": "Pure Source Natural White Blowing Vamavarti Shankh with Brass Stand",
    "description": "Authentic loud-blowing ocean conch shell tested for pure vibrational acoustic resonance. Includes engraved antique brass tripod stand.",
    "price": 1199,
    "mrp": 1850,
    "discount_percentage": 35,
    "stock_quantity": 35,
    "tags": "pooja, pooja-items, pooja-essentials, shankh, blowing-shankh, conch, sacred",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "Pure Source",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_ess_4",
    "id": "pj_ess_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Essentials",
    "childCategory": "Pooja Bells",
    "name": "Artvarko Solid Brass Garuda Ghanti Pooja Bell (5.5 Inch)",
    "title": "Artvarko Solid Brass Garuda Ghanti Pooja Bell (5.5 Inch)",
    "description": "Solid high-grade bell metal brass casting topped with sculpted Lord Garuda figurine producing long-sustaining melodious ringing tone.",
    "price": 549,
    "mrp": 850,
    "discount_percentage": 35,
    "stock_quantity": 70,
    "tags": "pooja, pooja-items, pooja-essentials, pooja-bells, ghanti, brass-bell, artvarko",
    "rating": 4.7,
    "reviews_count": 230,
    "brand": "Artvarko",
    "thumbnail": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_diy_1",
    "id": "pj_diy_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Diyas & Lamps",
    "childCategory": "Akhand Diyas",
    "name": "Borosil Pure Brass Akhand Diya with Heat Resistant Borosilicate Chimney",
    "title": "Borosil Pure Brass Akhand Diya with Heat Resistant Borosilicate Chimney",
    "description": "Stays lit for over 24 hours continuously without getting blown out by wind or fan. Premium thermal shock resistant glass cover.",
    "price": 649,
    "mrp": 990,
    "discount_percentage": 34,
    "stock_quantity": 85,
    "tags": "pooja, pooja-items, diyas-lamps, akhand-diyas, borosil, diya, oil-lamp",
    "rating": 4.9,
    "reviews_count": 580,
    "brand": "Borosil",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_diy_2",
    "id": "pj_diy_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Diyas & Lamps",
    "childCategory": "Brass Diyas",
    "name": "Vedic Vaani Traditional Kuber Deep Solid Brass Oil Diya (Set of 4)",
    "title": "Vedic Vaani Traditional Kuber Deep Solid Brass Oil Diya (Set of 4)",
    "description": "Heavyweight solid brass oil lamps with deep oil reservoirs and steady pedestal bases for daily morning and evening aarti rituals.",
    "price": 499,
    "mrp": 799,
    "discount_percentage": 38,
    "stock_quantity": 90,
    "tags": "pooja, pooja-items, diyas-lamps, brass-diyas, kuber-diya, oil-lamp, vedic-vaani",
    "rating": 4.8,
    "reviews_count": 340,
    "brand": "Vedic Vaani",
    "thumbnail": "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_diy_3",
    "id": "pj_diy_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Diyas & Lamps",
    "childCategory": "Clay Diyas",
    "name": "Terracotta Hand-Painted Decorative Floral Mitti Diyas (Set of 12)",
    "title": "Terracotta Hand-Painted Decorative Floral Mitti Diyas (Set of 12)",
    "description": "Eco-friendly natural clay handmade earthen diyas painted with bright organic acrylic colors and golden glitter accents for Diwali.",
    "price": 349,
    "mrp": 599,
    "discount_percentage": 42,
    "stock_quantity": 120,
    "tags": "pooja, pooja-items, diyas-lamps, clay-diyas, mitti-diya, diwali, festive",
    "rating": 4.7,
    "reviews_count": 410,
    "brand": "Terracotta Crafts",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_diy_4",
    "id": "pj_diy_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Diyas & Lamps",
    "childCategory": "Hanging Diyas",
    "name": "Artvarko Antique Brass Hanging Diya with Chain & Ringing Bells",
    "title": "Artvarko Antique Brass Hanging Diya with Chain & Ringing Bells",
    "description": "Suspended brass oil lamp with peacock crest, heavy link hanging chain, and dangling brass chime bells for mandir entrance.",
    "price": 999,
    "mrp": 1599,
    "discount_percentage": 38,
    "stock_quantity": 40,
    "tags": "pooja, pooja-items, diyas-lamps, hanging-diyas, antique-brass, mandir-decor",
    "rating": 4.9,
    "reviews_count": 170,
    "brand": "Artvarko",
    "thumbnail": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_inc_1",
    "id": "pj_inc_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Incense & Fragrance",
    "childCategory": "Agarbatti",
    "name": "Cycle Pure Parampara Natural Flora Agarbatti (Pack of 4 Boxes)",
    "title": "Cycle Pure Parampara Natural Flora Agarbatti (Pack of 4 Boxes)",
    "description": "Certified carbon neutral traditional masala incense sticks formulated with natural herbs, gum resin, and essential oil extracts.",
    "price": 299,
    "mrp": 440,
    "discount_percentage": 32,
    "stock_quantity": 150,
    "tags": "pooja, pooja-items, incense-fragrance, agarbatti, cycle-pure, parampara, fragrance",
    "rating": 4.8,
    "reviews_count": 720,
    "brand": "Cycle Pure",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_inc_2",
    "id": "pj_inc_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Incense & Fragrance",
    "childCategory": "Dhoop Sticks",
    "name": "Phool Natural Charcoal-Free Temple Flower Dhoop Sticks (Pack of 2)",
    "title": "Phool Natural Charcoal-Free Temple Flower Dhoop Sticks (Pack of 2)",
    "description": "Handcrafted from recycled sacred temple flowers dipped in pure essential oils. 100% natural, non-toxic, and charcoal-free burning.",
    "price": 360,
    "mrp": 480,
    "discount_percentage": 25,
    "stock_quantity": 110,
    "tags": "pooja, pooja-items, incense-fragrance, dhoop-sticks, phool, organic, temple-flower",
    "rating": 4.9,
    "reviews_count": 480,
    "brand": "Phool",
    "thumbnail": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_inc_3",
    "id": "pj_inc_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Incense & Fragrance",
    "childCategory": "Camphor (Kapur)",
    "name": "Mangalam Bhimseni Organic Pure Camphor Crystals (250g Airtight Jar)",
    "title": "Mangalam Bhimseni Organic Pure Camphor Crystals (250g Airtight Jar)",
    "description": "100% pure natural Bhimseni kapoor chunks with zero toxic wax. Leaves zero chemical residue and purifies negative energies.",
    "price": 399,
    "mrp": 550,
    "discount_percentage": 27,
    "stock_quantity": 130,
    "tags": "pooja, pooja-items, incense-fragrance, camphor-kapur, bhimseni-camphor, mangalam",
    "rating": 4.9,
    "reviews_count": 610,
    "brand": "Mangalam",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_inc_4",
    "id": "pj_inc_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Incense & Fragrance",
    "childCategory": "Chandan (Sandalwood Paste)",
    "name": "Pure Mysore Sandalwood Chandan Tika Paste with Kesar (100g Jar)",
    "title": "Pure Mysore Sandalwood Chandan Tika Paste with Kesar (100g Jar)",
    "description": "Authentic cooling sandalwood paste blended with Kashmiri saffron for tilak application on forehead and deity shringar.",
    "price": 249,
    "mrp": 350,
    "discount_percentage": 29,
    "stock_quantity": 95,
    "tags": "pooja, pooja-items, incense-fragrance, chandan-sandalwood-paste, mysore-sandalwood, tilak",
    "rating": 4.7,
    "reviews_count": 290,
    "brand": "Mysore Sandal",
    "thumbnail": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_sam_1",
    "id": "pj_sam_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Samagri",
    "childCategory": "Kumkum & Roli",
    "name": "Pure Vedic Organic Haldi Kumkum Roli Powder Set (100g Each)",
    "title": "Pure Vedic Organic Haldi Kumkum Roli Powder Set (100g Each)",
    "description": "Prepared using traditional turmeric, lime, and botanical extracts. Completely non-toxic, skin-friendly, and vibrant red and yellow.",
    "price": 199,
    "mrp": 299,
    "discount_percentage": 33,
    "stock_quantity": 140,
    "tags": "pooja, pooja-items, pooja-samagri, kumkum-roli, haldi, turmeric, organic",
    "rating": 4.8,
    "reviews_count": 380,
    "brand": "Vedic Vaani",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_sam_2",
    "id": "pj_sam_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Samagri",
    "childCategory": "Cotton Wicks (Batti)",
    "name": "Pure White Round Phool Batti & Long Cotton Wicks (Pack of 1000 Pcs)",
    "title": "Pure White Round Phool Batti & Long Cotton Wicks (Pack of 1000 Pcs)",
    "description": "Made from 100% natural long-staple organic cotton. Pre-shaped for effortless diya lighting with steady, long burning duration.",
    "price": 189,
    "mrp": 299,
    "discount_percentage": 37,
    "stock_quantity": 180,
    "tags": "pooja, pooja-items, pooja-samagri, cotton-wicks-batti, phool-batti, diya-wicks",
    "rating": 4.9,
    "reviews_count": 510,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_sam_3",
    "id": "pj_sam_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Samagri",
    "childCategory": "Gangajal",
    "name": "Original Gangotri Source Pure Sacred Gangajal (500ml Sealed Bottle)",
    "title": "Original Gangotri Source Pure Sacred Gangajal (500ml Sealed Bottle)",
    "description": "Certified origin natural holy water bottled directly at high-altitude pristine Gangotri temple source for abhishekam and home purification.",
    "price": 149,
    "mrp": 220,
    "discount_percentage": 32,
    "stock_quantity": 160,
    "tags": "pooja, pooja-items, pooja-samagri, gangajal, holy-water, ganga, sacred",
    "rating": 4.9,
    "reviews_count": 420,
    "brand": "Gangotri Seva",
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_sam_4",
    "id": "pj_sam_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Samagri",
    "childCategory": "Pooja Oil & Ghee",
    "name": "Panchagavya Vedic Diya Pooja Oil Blend with Sesame & Mustard (1 Litre)",
    "title": "Panchagavya Vedic Diya Pooja Oil Blend with Sesame & Mustard (1 Litre)",
    "description": "Sacred Pancha Deepam oil formulation with pure til, coconut, mahua, castor, and neem oils infused with subtle aromatic sugandhi.",
    "price": 289,
    "mrp": 399,
    "discount_percentage": 28,
    "stock_quantity": 110,
    "tags": "pooja, pooja-items, pooja-samagri, pooja-oil-ghee, deepam-oil, sesame-oil",
    "rating": 4.8,
    "reviews_count": 295,
    "brand": "Vedic Vaani",
    "thumbnail": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_idl_1",
    "id": "pj_idl_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Idols & Statues",
    "childCategory": "Ganesha Idols",
    "name": "Artvarko Solid Brass Lord Ganesha Idol on Lotus Pedestal (5.5 Inch)",
    "title": "Artvarko Solid Brass Lord Ganesha Idol on Lotus Pedestal (5.5 Inch)",
    "description": "Exquisite hand-carved pure brass Vinayagar murti with ornate crown, modak bowl, and antique patina protective lacquer finish.",
    "price": 1599,
    "mrp": 2499,
    "discount_percentage": 36,
    "stock_quantity": 35,
    "tags": "pooja, pooja-items, idols-statues, ganesha-idols, ganesh-murti, brass-idol, artvarko",
    "rating": 4.9,
    "reviews_count": 360,
    "brand": "Artvarko",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_idl_2",
    "id": "pj_idl_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Idols & Statues",
    "childCategory": "Lakshmi Idols",
    "name": "Shubh Labh Brass Goddess Mahalakshmi Idol with Gold Polish (5 Inch)",
    "title": "Shubh Labh Brass Goddess Mahalakshmi Idol with Gold Polish (5 Inch)",
    "description": "Finely sculpted brass Lakshmi Devi in seated Padmasana blessing posture holding lotus blossoms and showering golden prosperity coins.",
    "price": 1499,
    "mrp": 2299,
    "discount_percentage": 35,
    "stock_quantity": 40,
    "tags": "pooja, pooja-items, idols-statues, lakshmi-idols, goddess-lakshmi, brass-murti",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_idl_3",
    "id": "pj_idl_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Idols & Statues",
    "childCategory": "Shiva & Lingam",
    "name": "Natural Black Narmadeshwar Shivling with Solid Brass Yoni Base & Snake",
    "title": "Natural Black Narmadeshwar Shivling with Solid Brass Yoni Base & Snake",
    "description": "Sacred self-manifested Narmada river stone Lingam paired with detailed brass Sheshnaag hood and Jaladhari stand for daily abhishekam.",
    "price": 1899,
    "mrp": 2999,
    "discount_percentage": 37,
    "stock_quantity": 25,
    "tags": "pooja, pooja-items, idols-statues, shiva-lingam, shivling, narmadeshwar, shiva",
    "rating": 4.9,
    "reviews_count": 190,
    "brand": "Vedic Vaani",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_idl_4",
    "id": "pj_idl_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Idols & Statues",
    "childCategory": "Hanuman Idols",
    "name": "Panchmukhi Hanuman Ji Heavy Brass Statue for Mandir Protection",
    "title": "Panchmukhi Hanuman Ji Heavy Brass Statue for Mandir Protection",
    "description": "Detailed five-faced depiction of Lord Hanuman wielding sacred weapons to dispel negative vibrations and foster inner strength.",
    "price": 2199,
    "mrp": 3499,
    "discount_percentage": 37,
    "stock_quantity": 30,
    "tags": "pooja, pooja-items, idols-statues, hanuman-idols, panchmukhi-hanuman, brass",
    "rating": 4.9,
    "reviews_count": 210,
    "brand": "Artvarko",
    "thumbnail": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_acc_1",
    "id": "pj_acc_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Accessories",
    "childCategory": "Chowki / Peeta",
    "name": "Handcrafted Wooden Meenakari Pooja Chowki / Bajot (10x10 Inch)",
    "title": "Handcrafted Wooden Meenakari Pooja Chowki / Bajot (10x10 Inch)",
    "description": "Sturdy mango wood stool covered in gleaming brass-coated meenakari peacock artwork with four raised ball feet for deity placement.",
    "price": 699,
    "mrp": 1199,
    "discount_percentage": 42,
    "stock_quantity": 50,
    "tags": "pooja, pooja-items, pooja-accessories, chowki-peeta, bajot, wooden-chowki",
    "rating": 4.8,
    "reviews_count": 180,
    "brand": "Shubh Labh",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_acc_2",
    "id": "pj_acc_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Accessories",
    "childCategory": "Pooja Asan (Mats)",
    "name": "Velvet Embroidered Sitting Asan Prayer Mat for Mandir (Set of 2)",
    "title": "Velvet Embroidered Sitting Asan Prayer Mat for Mandir (Set of 2)",
    "description": "Plush cushioned red and gold velvet prayer rugs featuring embroidered Om motifs and gold lace borders for prolonged comfortable sitting.",
    "price": 499,
    "mrp": 799,
    "discount_percentage": 38,
    "stock_quantity": 75,
    "tags": "pooja, pooja-items, pooja-accessories, pooja-asan-mats, prayer-mat, velvet-asan",
    "rating": 4.7,
    "reviews_count": 140,
    "brand": "Vedic Vaani",
    "thumbnail": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_acc_3",
    "id": "pj_acc_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Accessories",
    "childCategory": "Pooja Spoons (Pali)",
    "name": "Pure Brass Panchpatra with Achamani Pali Spoon Set",
    "title": "Pure Brass Panchpatra with Achamani Pali Spoon Set",
    "description": "Traditional holy charnamrit water vessel with engraved floral motifs and long curved spoon for ritual purification and prasadam offering.",
    "price": 399,
    "mrp": 599,
    "discount_percentage": 33,
    "stock_quantity": 80,
    "tags": "pooja, pooja-items, pooja-accessories, pooja-spoons-pali, panchpatra, achamani",
    "rating": 4.8,
    "reviews_count": 195,
    "brand": "Shubh Labh",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_acc_4",
    "id": "pj_acc_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Accessories",
    "childCategory": "Agarbatti Stands",
    "name": "Solid Brass Ash Catcher Agarbatti & Dhoop Stick Holder Stand",
    "title": "Solid Brass Ash Catcher Agarbatti & Dhoop Stick Holder Stand",
    "description": "Compact 5-hole round brass incense burner with broad curved rim that catches all falling ash neatly, keeping mandir counter spotless.",
    "price": 249,
    "mrp": 399,
    "discount_percentage": 38,
    "stock_quantity": 110,
    "tags": "pooja, pooja-items, pooja-accessories, agarbatti-stands, incense-holder, brass",
    "rating": 4.7,
    "reviews_count": 260,
    "brand": "Artvarko",
    "thumbnail": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_dec_1",
    "id": "pj_dec_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Decoration",
    "childCategory": "Torans & Bandarwals",
    "name": "Traditional Shubh Labh Marigold & Mango Leaf Door Hanging Toran (38 Inch)",
    "title": "Traditional Shubh Labh Marigold & Mango Leaf Door Hanging Toran (38 Inch)",
    "description": "Handcrafted festive entrance bandarwal featuring artificial orange marigold pom-poms, golden pearls, brass bells, and wooden Shubh-Labh pendants.",
    "price": 449,
    "mrp": 799,
    "discount_percentage": 44,
    "stock_quantity": 65,
    "tags": "pooja, pooja-items, pooja-decoration, torans-bandarwals, door-toran, festive-decor",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Festive Home",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_dec_2",
    "id": "pj_dec_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Decoration",
    "childCategory": "Rangoli Colors & Stencils",
    "name": "Vibrant 10-Color Rangoli Powder Kit with 5 Plastic Stencils & Filler Pen",
    "title": "Vibrant 10-Color Rangoli Powder Kit with 5 Plastic Stencils & Filler Pen",
    "description": "Fine marble stone grain colored powders with smooth flow. Includes reusable circular kolam stencils and precision dispensing squeeze bottles.",
    "price": 349,
    "mrp": 599,
    "discount_percentage": 42,
    "stock_quantity": 90,
    "tags": "pooja, pooja-items, pooja-decoration, rangoli-colors-stencils, kolam, diwali",
    "rating": 4.7,
    "reviews_count": 310,
    "brand": "Rangoli Arts",
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_dec_3",
    "id": "pj_dec_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Decoration",
    "childCategory": "Artificial Garland / Mala",
    "name": "Scented Artificial Yellow Marigold & Jasmine Flower Garland (Pack of 5)",
    "title": "Scented Artificial Yellow Marigold & Jasmine Flower Garland (Pack of 5)",
    "description": "Fluffy 5-foot long reusable flower malas crafted from durable fiber fabric. Washable and holds shape beautifully year after year.",
    "price": 399,
    "mrp": 699,
    "discount_percentage": 43,
    "stock_quantity": 85,
    "tags": "pooja, pooja-items, pooja-decoration, artificial-garland-mala, genda-phool, mala",
    "rating": 4.9,
    "reviews_count": 195,
    "brand": "Festive Home",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_dec_4",
    "id": "pj_dec_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Decoration",
    "childCategory": "Altar Cloth (Pooja Aasan Cloth)",
    "name": "Heavy Red Velvet Mandir Altar Cloth with Embroidered Gold Zari Border",
    "title": "Heavy Red Velvet Mandir Altar Cloth with Embroidered Gold Zari Border",
    "description": "Rich scarlet velvet base measuring 1 meter x 1 meter with ornate 3-inch golden brocade zari border to line temple altar tables and pedestals.",
    "price": 299,
    "mrp": 499,
    "discount_percentage": 40,
    "stock_quantity": 70,
    "tags": "pooja, pooja-items, pooja-decoration, altar-cloth-pooja-aasan-cloth, mandir-cloth, velvet",
    "rating": 4.8,
    "reviews_count": 140,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_man_1",
    "id": "pj_man_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Home Temple / Mandir",
    "childCategory": "Wooden Mandir",
    "name": "Solid Sheesham Wood Handcrafted Home Temple Mandir with Storage Drawer",
    "title": "Solid Sheesham Wood Handcrafted Home Temple Mandir with Storage Drawer",
    "description": "Exquisite carved Indian Rosewood wooden mandir with carved shikhara dome, brass bells, pull-out bhog tray, and roomy samagri drawer.",
    "price": 5499,
    "mrp": 8999,
    "discount_percentage": 39,
    "stock_quantity": 20,
    "tags": "pooja, pooja-items, home-temple-mandir, wooden-mandir, sheesham-wood, home-temple",
    "rating": 4.9,
    "reviews_count": 160,
    "brand": "Mandir Crafts",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_man_2",
    "id": "pj_man_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Home Temple / Mandir",
    "childCategory": "Wall Hanging Mandir",
    "name": "Engineered Wood Compact Wall Hanging Pooja Mandir with Warm LED Light",
    "title": "Engineered Wood Compact Wall Hanging Pooja Mandir with Warm LED Light",
    "description": "Space-saving modern wall-mounted temple with jaali side panels, waterproof walnut laminate finish, and pre-installed spotlight.",
    "price": 2499,
    "mrp": 3999,
    "discount_percentage": 38,
    "stock_quantity": 35,
    "tags": "pooja, pooja-items, home-temple-mandir, wall-hanging-mandir, compact-mandir, led-light",
    "rating": 4.7,
    "reviews_count": 220,
    "brand": "Mandir Crafts",
    "thumbnail": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_man_3",
    "id": "pj_man_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Home Temple / Mandir",
    "childCategory": "Marble Mandir",
    "name": "Makrana White Marble Finish Hand-Painted Home Mandir Altar",
    "title": "Makrana White Marble Finish Hand-Painted Home Mandir Altar",
    "description": "Pristine white poly-marble composite altar embellished with embossed gold leaf painting and embedded Kundan gemstone detailing.",
    "price": 4299,
    "mrp": 6499,
    "discount_percentage": 34,
    "stock_quantity": 18,
    "tags": "pooja, pooja-items, home-temple-mandir, marble-mandir, makrana, white-temple",
    "rating": 4.8,
    "reviews_count": 95,
    "brand": "Mandir Crafts",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_man_4",
    "id": "pj_man_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Home Temple / Mandir",
    "childCategory": "Mandir Lightings & Bells",
    "name": "Solid Brass Hanging Mandir Temple Bell with Chain & Om Emblem",
    "title": "Solid Brass Hanging Mandir Temple Bell with Chain & Om Emblem",
    "description": "Heavy 4-inch bell metal gong with 2.5-foot heavy brass link chain suitable for mandir ceiling suspension, resonating clear positive sound.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 45,
    "tags": "pooja, pooja-items, home-temple-mandir, mandir-lightings-bells, temple-bell, brass-chain",
    "rating": 4.9,
    "reviews_count": 180,
    "brand": "Artvarko",
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_rud_1",
    "id": "pj_rud_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Rudraksha & Spiritual",
    "childCategory": "Rudraksha Beads & Malas",
    "name": "Lab-Certified 5 Mukhi Nepal Rudraksha Japa Mala (108+1 Beads, 8mm)",
    "title": "Lab-Certified 5 Mukhi Nepal Rudraksha Japa Mala (108+1 Beads, 8mm)",
    "description": "Authentic natural five-faced Rudraksha seeds strung in traditional knotted red silk thread with tassel. Complete with x-ray lab certificate.",
    "price": 799,
    "mrp": 1499,
    "discount_percentage": 47,
    "stock_quantity": 65,
    "tags": "pooja, pooja-items, rudraksha-spiritual, rudraksha-beads-malas, japa-mala, 5-mukhi",
    "rating": 4.9,
    "reviews_count": 340,
    "brand": "Vedic Vaani",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_rud_2",
    "id": "pj_rud_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Rudraksha & Spiritual",
    "childCategory": "Tulsi Malas",
    "name": "Original ISKCON Certified Holy Basil Pure Tulsi Kanthi Neck Mala",
    "title": "Original ISKCON Certified Holy Basil Pure Tulsi Kanthi Neck Mala",
    "description": "Handcrafted from pure sacred Vrindavan basil wood stems. Features 2-round tight neck choker styling with silver-plated barrel screw clasp.",
    "price": 299,
    "mrp": 499,
    "discount_percentage": 40,
    "stock_quantity": 90,
    "tags": "pooja, pooja-items, rudraksha-spiritual, tulsi-malas, kanthi-mala, iskcon, basil",
    "rating": 4.8,
    "reviews_count": 280,
    "brand": "Pure Source",
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_rud_3",
    "id": "pj_rud_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Rudraksha & Spiritual",
    "childCategory": "Sphatik Malas",
    "name": "Natural Clear Quartz Crystal Sphatik Rosary Mala (108 Beads)",
    "title": "Natural Clear Quartz Crystal Sphatik Rosary Mala (108 Beads)",
    "description": "Ice-cold diamond-cut faceted genuine quartz crystal beads. Calms high blood pressure, stabilizes emotional energy during meditation.",
    "price": 999,
    "mrp": 1799,
    "discount_percentage": 44,
    "stock_quantity": 45,
    "tags": "pooja, pooja-items, rudraksha-spiritual, sphatik-malas, quartz-crystal, meditation",
    "rating": 4.8,
    "reviews_count": 160,
    "brand": "Vedic Vaani",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_rud_4",
    "id": "pj_rud_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Rudraksha & Spiritual",
    "childCategory": "Yantras",
    "name": "Pure Copper 24K Gold Plated Sampoorna Sri Yantra Plate (6x6 Inch)",
    "title": "Pure Copper 24K Gold Plated Sampoorna Sri Yantra Plate (6x6 Inch)",
    "description": "Vedic sacred geometry energized Sri Chakra surrounded by 12 supportive wealth yantras etched on heavy gauge copper foil with frame.",
    "price": 1299,
    "mrp": 1999,
    "discount_percentage": 35,
    "stock_quantity": 40,
    "tags": "pooja, pooja-items, rudraksha-spiritual, yantras, sri-yantra, vastu, copper",
    "rating": 4.9,
    "reviews_count": 140,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bk_1",
    "id": "pj_bk_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Religious Books",
    "childCategory": "Bhagavad Gita",
    "name": "Srimad Bhagavad Gita As It Is (Deluxe Hardbound Edition)",
    "title": "Srimad Bhagavad Gita As It Is (Deluxe Hardbound Edition)",
    "description": "Complete 700 verses with original Devanagari Sanskrit scripts, English roman transliterations, word-by-word meanings, and elaborate purports.",
    "price": 499,
    "mrp": 750,
    "discount_percentage": 33,
    "stock_quantity": 120,
    "tags": "pooja, pooja-items, religious-books, bhagavad-gita, gita, sacred-scripture, iskcon",
    "rating": 4.9,
    "reviews_count": 850,
    "brand": "Gita Press",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bk_2",
    "id": "pj_bk_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Religious Books",
    "childCategory": "Ramayana & Hanuman Chalisa",
    "name": "Illustrated Hanuman Chalisa & Sundarkand with Aarti Sangrah (Pocket Edition)",
    "title": "Illustrated Hanuman Chalisa & Sundarkand with Aarti Sangrah (Pocket Edition)",
    "description": "Gold embossed leatherette pocket book containing complete Hanuman Chalisa, Bajrang Baan, Sankat Mochan, and Sundarkand in large readable Hindi font.",
    "price": 249,
    "mrp": 399,
    "discount_percentage": 38,
    "stock_quantity": 150,
    "tags": "pooja, pooja-items, religious-books, ramayana-hanuman-chalisa, sundarkand, hanuman",
    "rating": 4.9,
    "reviews_count": 530,
    "brand": "Gita Press",
    "thumbnail": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bk_3",
    "id": "pj_bk_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Religious Books",
    "childCategory": "Pooja Vidhi Books",
    "name": "Complete Griha Pooja Vidhi & All Vrat Katha Guide Book (Hindi-Sanskrit)",
    "title": "Complete Griha Pooja Vidhi & All Vrat Katha Guide Book (Hindi-Sanskrit)",
    "description": "Step-by-step rituals and authentic mantras for Satyanarayan, Navratri, Karwa Chauth, Shivratri, and daily deity abhishekam procedures.",
    "price": 350,
    "mrp": 499,
    "discount_percentage": 30,
    "stock_quantity": 80,
    "tags": "pooja, pooja-items, religious-books, pooja-vidhi-books, vrat-katha, ritual-guide",
    "rating": 4.8,
    "reviews_count": 210,
    "brand": "Gita Press",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bk_4",
    "id": "pj_bk_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Religious Books",
    "childCategory": "Mantras & Stotras Books",
    "name": "Sacred Vedic Gayatri, Maha Mrityunjaya & Vishnu Sahasranama Chanting Book",
    "title": "Sacred Vedic Gayatri, Maha Mrityunjaya & Vishnu Sahasranama Chanting Book",
    "description": "Hardcover compilation of the 1000 names of Lord Vishnu, Lalita Sahasranama, and Vedic Suktas with pronunciation accents and meanings.",
    "price": 399,
    "mrp": 599,
    "discount_percentage": 33,
    "stock_quantity": 70,
    "tags": "pooja, pooja-items, religious-books, mantras-stotras-books, vishnu-sahasranama, stotra",
    "rating": 4.8,
    "reviews_count": 170,
    "brand": "Gita Press",
    "thumbnail": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_hav_1",
    "id": "pj_hav_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Havan & Yagna",
    "childCategory": "Havan Kund",
    "name": "Pure Copper Square Vedic Havan Kund with Heavy Handles (8x8 Inch)",
    "title": "Pure Copper Square Vedic Havan Kund with Heavy Handles (8x8 Inch)",
    "description": "High gauge pure hammered copper pyramidal fire altar engineered for optimal air circulation, clean combustion, and ritual safety.",
    "price": 1199,
    "mrp": 1899,
    "discount_percentage": 37,
    "stock_quantity": 40,
    "tags": "pooja, pooja-items, havan-yagna, havan-kund, copper-kund, yajna, fire-altar",
    "rating": 4.9,
    "reviews_count": 220,
    "brand": "Vedic Vaani",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_hav_2",
    "id": "pj_hav_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Havan & Yagna",
    "childCategory": "Havan Samagri",
    "name": "Vedic Vaani 51-Herb Natural Havan Samagri with Guggal & Jatamansi (1 Kg)",
    "title": "Vedic Vaani 51-Herb Natural Havan Samagri with Guggal & Jatamansi (1 Kg)",
    "description": "Auspicious blend of rare Ayurvedic roots, sandalwood powder, dried flowers, pure loban, and camphor for sacred fire offerings.",
    "price": 349,
    "mrp": 520,
    "discount_percentage": 33,
    "stock_quantity": 90,
    "tags": "pooja, pooja-items, havan-yagna, havan-samagri, herbs, guggal, vedic-vaani",
    "rating": 4.8,
    "reviews_count": 360,
    "brand": "Vedic Vaani",
    "thumbnail": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_hav_3",
    "id": "pj_hav_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Havan & Yagna",
    "childCategory": "Mango Wood for Havan",
    "name": "Sun-Dried Pure Aam Ki Lakdi Mango Wood Sticks for Havan (1 Kg Bundle)",
    "title": "Sun-Dried Pure Aam Ki Lakdi Mango Wood Sticks for Havan (1 Kg Bundle)",
    "description": "Clean chemical-free seasoned mango tree branches cut into standard 6-inch lengths for smokeless ceremonial fire ignition.",
    "price": 199,
    "mrp": 299,
    "discount_percentage": 33,
    "stock_quantity": 110,
    "tags": "pooja, pooja-items, havan-yagna, mango-wood-for-havan, aam-lakdi, havan-wood",
    "rating": 4.7,
    "reviews_count": 180,
    "brand": "Pure Source",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_hav_4",
    "id": "pj_hav_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Havan & Yagna",
    "childCategory": "Havan Spoons & Sets",
    "name": "Traditional Brass Long-Handle Havan Sruva & Sruk Ladle Set (15 Inch)",
    "title": "Traditional Brass Long-Handle Havan Sruva & Sruk Ladle Set (15 Inch)",
    "description": "Dual long wooden-grip brass ceremonial spoons for pouring melted cow ghee and sacred oblations into high-temperature havan flames safely.",
    "price": 499,
    "mrp": 799,
    "discount_percentage": 38,
    "stock_quantity": 55,
    "tags": "pooja, pooja-items, havan-yagna, havan-spoons-sets, sruva, sruk, brass-ladle",
    "rating": 4.8,
    "reviews_count": 130,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_kit_1",
    "id": "pj_kit_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Festival Pooja Kits",
    "childCategory": "Diwali Pooja Kit",
    "name": "Complete Shubh Diwali Lakshmi Ganesh Maha Pooja Kit (36 Essential Items)",
    "title": "Complete Shubh Diwali Lakshmi Ganesh Maha Pooja Kit (36 Essential Items)",
    "description": "All-in-one box with silver plated coins, diyas, dhoop, agarbatti, gangajal, janeu, roli, moli, supari, dry fruits, and aarti book.",
    "price": 899,
    "mrp": 1499,
    "discount_percentage": 40,
    "stock_quantity": 80,
    "tags": "pooja, pooja-items, festival-pooja-kits, diwali-pooja-kit, lakshmi-pooja, diwali-box",
    "rating": 4.9,
    "reviews_count": 460,
    "brand": "Shubh Labh",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1778488028462-85ab3b83d39c?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_kit_2",
    "id": "pj_kit_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Festival Pooja Kits",
    "childCategory": "Navratri Pooja Kit",
    "name": "Complete 9-Day Chaitra & Sharad Navratri Durga Sthapana Pooja Box",
    "title": "Complete 9-Day Chaitra & Sharad Navratri Durga Sthapana Pooja Box",
    "description": "Includes red chunri, barley seeds for khetri sowing, earthenware kalash, shringaar items, camphor, and Durga Saptashati book.",
    "price": 999,
    "mrp": 1699,
    "discount_percentage": 41,
    "stock_quantity": 60,
    "tags": "pooja, pooja-items, festival-pooja-kits, navratri-pooja-kit, durga-pooja, navratri",
    "rating": 4.8,
    "reviews_count": 290,
    "brand": "Vedic Vaani",
    "thumbnail": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_kit_3",
    "id": "pj_kit_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Festival Pooja Kits",
    "childCategory": "Ganesh Chaturthi Kit",
    "name": "Eco-Friendly Ganesh Chaturthi Sthapana & Visarjan Pooja Samagri Kit",
    "title": "Eco-Friendly Ganesh Chaturthi Sthapana & Visarjan Pooja Samagri Kit",
    "description": "Includes durva grass, red flowers, modak mold, attar, janve, paan supari, yellow cloth, and Ganesha aarti audio booklet.",
    "price": 749,
    "mrp": 1199,
    "discount_percentage": 38,
    "stock_quantity": 70,
    "tags": "pooja, pooja-items, festival-pooja-kits, ganesh-chaturthi-kit, vinayaka-chaturthi",
    "rating": 4.9,
    "reviews_count": 320,
    "brand": "Shubh Labh",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_kit_4",
    "id": "pj_kit_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Festival Pooja Kits",
    "childCategory": "Varalakshmi Pooja Kits",
    "name": "Traditional South Indian Varalakshmi Vratam Pooja Kit with Amman Face & Saree",
    "title": "Traditional South Indian Varalakshmi Vratam Pooja Kit with Amman Face & Saree",
    "description": "Complete Lakshmi Vratam set with gold-finish Amman goddess face, miniature zari saree, thoram thread, kalash, and coconut decor.",
    "price": 1299,
    "mrp": 1999,
    "discount_percentage": 35,
    "stock_quantity": 45,
    "tags": "pooja, pooja-items, festival-pooja-kits, varalakshmi-pooja-kits, amman-face, vratam",
    "rating": 4.9,
    "reviews_count": 210,
    "brand": "Vedic Vaani",
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bs_1",
    "id": "pj_bs_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Brass & Silver Pooja Items",
    "childCategory": "Brass Aarti Diya",
    "name": "Heavy Brass 5-Wick Panchaarti Diya with Turned Wooden Handle",
    "title": "Heavy Brass 5-Wick Panchaarti Diya with Turned Wooden Handle",
    "description": "Traditional Aarti lamp with 5 step oil receptacles, heat-insulated rosewood handgrip, and peacock top crest for grand temple aartis.",
    "price": 799,
    "mrp": 1299,
    "discount_percentage": 38,
    "stock_quantity": 60,
    "tags": "pooja, pooja-items, brass-silver-pooja-items, brass-aarti-diya, panchaarti, brass-lamp",
    "rating": 4.8,
    "reviews_count": 240,
    "brand": "Artvarko",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bs_2",
    "id": "pj_bs_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Brass & Silver Pooja Items",
    "childCategory": "Brass Kalash",
    "name": "Engraved Gayatri Mantra Pure Brass Kalash Lota (1 Litre Capacity)",
    "title": "Engraved Gayatri Mantra Pure Brass Kalash Lota (1 Litre Capacity)",
    "description": "Heavy solid brass holy water pot with intricately etched Sanskrit Gayatri verses and Om symbols with high polish mirror shine.",
    "price": 599,
    "mrp": 899,
    "discount_percentage": 33,
    "stock_quantity": 75,
    "tags": "pooja, pooja-items, brass-silver-pooja-items, brass-kalash, lota, gayatri-mantra",
    "rating": 4.7,
    "reviews_count": 175,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bs_3",
    "id": "pj_bs_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Brass & Silver Pooja Items",
    "childCategory": "Silver Plated Thali",
    "name": "German Silver Embossed Royal Peacock Pooja Thali (8 Inch)",
    "title": "German Silver Embossed Royal Peacock Pooja Thali (8 Inch)",
    "description": "Non-tarnish silver electroplated plate with dancing peacock bas-relief filigree border and velvet gift presentation case.",
    "price": 1199,
    "mrp": 1899,
    "discount_percentage": 37,
    "stock_quantity": 35,
    "tags": "pooja, pooja-items, brass-silver-pooja-items, silver-plated-thali, german-silver, peacock",
    "rating": 4.9,
    "reviews_count": 130,
    "brand": "Pure Source",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_bs_4",
    "id": "pj_bs_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Brass & Silver Pooja Items",
    "childCategory": "Silver Coins (Lakshmi Ganesh)",
    "name": "Pure 999 Fine Silver Lakshmi Ganesh Coin with Assay Certificate (10 Grams)",
    "title": "Pure 999 Fine Silver Lakshmi Ganesh Coin with Assay Certificate (10 Grams)",
    "description": "Hallmarked 99.9% pure silver commemorative bullion coin stamped with high relief Lakshmi-Ganesh motif in tamper-proof capsule.",
    "price": 1450,
    "mrp": 1850,
    "discount_percentage": 22,
    "stock_quantity": 50,
    "tags": "pooja, pooja-items, brass-silver-pooja-items, silver-coins-lakshmi-ganesh, 999-silver, coin",
    "rating": 4.9,
    "reviews_count": 290,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1756367308844-69632dabe687?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_str_1",
    "id": "pj_str_1",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Storage",
    "childCategory": "Kumkum Boxes (Sindoor Box)",
    "name": "Handcrafted Brass Peacock Double Kumkum Haldi Sindoor Box with Lid",
    "title": "Handcrafted Brass Peacock Double Kumkum Haldi Sindoor Box with Lid",
    "description": "Two-compartment antique brass sindoor dabbi with intricately molded dancing peacock handle for keeping roli and chandan safe.",
    "price": 399,
    "mrp": 650,
    "discount_percentage": 39,
    "stock_quantity": 65,
    "tags": "pooja, pooja-items, pooja-storage, kumkum-boxes-sindoor-box, sindoor-dani, peacock-box",
    "rating": 4.8,
    "reviews_count": 175,
    "brand": "Artvarko",
    "is_bestseller": true,
    "thumbnail": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1771091054077-5f28f540f074?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_str_2",
    "id": "pj_str_2",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Storage",
    "childCategory": "Incense Stick Holders & Boxes",
    "name": "Carved Sheesham Wood Agarbatti Storage Box with Ash Catcher & Secret Drawer",
    "title": "Carved Sheesham Wood Agarbatti Storage Box with Ash Catcher & Secret Drawer",
    "description": "Traditional brass inlaid wooden coffin box that stores unburnt incense sticks in bottom tray while catching burning ash safely inside top grill.",
    "price": 499,
    "mrp": 850,
    "discount_percentage": 41,
    "stock_quantity": 70,
    "tags": "pooja, pooja-items, pooja-storage, incense-stick-holders-boxes, agarbatti-box, sheesham",
    "rating": 4.8,
    "reviews_count": 210,
    "brand": "Mandir Crafts",
    "thumbnail": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_str_3",
    "id": "pj_str_3",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Storage",
    "childCategory": "Prasad Containers",
    "name": "Pure Brass Prasad Bhog Katori Bowl with Dome Lid (Set of 2)",
    "title": "Pure Brass Prasad Bhog Katori Bowl with Dome Lid (Set of 2)",
    "description": "Heavy solid brass covered bowls designed for keeping sacred naivedyam and sweets hygienic and ant-free before bhog offering.",
    "price": 449,
    "mrp": 699,
    "discount_percentage": 36,
    "stock_quantity": 55,
    "tags": "pooja, pooja-items, pooja-storage, prasad-containers, bhog-katori, brass-bowl",
    "rating": 4.7,
    "reviews_count": 130,
    "brand": "Shubh Labh",
    "is_new": true,
    "thumbnail": "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&q=80"
      }
    ]
  },
  {
    "product_id": "pj_str_4",
    "id": "pj_str_4",
    "category": "Pooja Items",
    "category_name": "Pooja Items",
    "department": "pooja-items",
    "subcategory": "Pooja Storage",
    "childCategory": "Pooja Samagri Organizers",
    "name": "Stainless Steel 7-Compartment Pooja Samagri Masala Dabba Organizer Box",
    "title": "Stainless Steel 7-Compartment Pooja Samagri Masala Dabba Organizer Box",
    "description": "Heavy gauge stainless steel spice box with 7 removable small containers and see-through acrylic lid for neatly organizing camphor, clove, supari, and wicks.",
    "price": 599,
    "mrp": 899,
    "discount_percentage": 33,
    "stock_quantity": 80,
    "tags": "pooja, pooja-items, pooja-storage, pooja-samagri-organizers, spice-box, mandir-storage",
    "rating": 4.9,
    "reviews_count": 260,
    "brand": "Shubh Labh",
    "thumbnail": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=600&q=80",
    "pi_images": [
      {
        "image_url": "https://images.unsplash.com/photo-1742984039016-4b34a90a0fe6?w=800&q=80"
      }
    ]
  }
];

export const SAMPLE_PRODUCTS = [
  ...BASE_SAMPLE_PRODUCTS,
  ...GENERATED_PRODUCTS,
  ...SUPPLEMENTAL_PRODUCTS
];
