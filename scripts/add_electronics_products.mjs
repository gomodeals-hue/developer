import fs from 'fs';
import path from 'path';

export const electronicsProducts = [
  // ==========================================
  // 1. WIRELESS HEADPHONES
  // ==========================================
  {
    id: "gmd-el-hp-001",
    product_id: "gmd-el-hp-001",
    name: "Leaf Bass Wireless Bluetooth Over-Ear Headphones with Deep Bass & HD Mic",
    title: "Leaf Bass Wireless Headphones with Mic",
    brand: "Leaf Studios",
    category: "electronics",
    category_name: "Wireless Headphones",
    subcategory: "headphones",
    childCategory: "over-ear-headphones",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 1499,
    mrp: 2999,
    discount_percentage: 50,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 285,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.leafstudios.in/cdn/shop/files/1_b53192c2-f451-49eb-9958-7d0d11c05510_800x.png?v=1786601483",
    images: [
      "https://www.leafstudios.in/cdn/shop/files/1_b53192c2-f451-49eb-9958-7d0d11c05510_800x.png?v=1786601483"
    ],
    pi_images: [
      {
        image_url: "https://www.leafstudios.in/cdn/shop/files/1_b53192c2-f451-49eb-9958-7d0d11c05510_800x.png?v=1786601483"
      }
    ],
    description: "Immerse yourself in rich, high-fidelity sound with the Leaf Bass Wireless Over-Ear Headphones. Engineered with 40mm neodymium drivers, ultra-soft cushioned earcups, and crystal-clear microphone calling, this headset offers up to 25 hours of continuous playback for workouts, work, and entertainment.",
    features: [
      "Signature Deep Bass sound with 40mm dynamic drivers",
      "Up to 25 hours of continuous playtime on a single charge",
      "Ultra-soft breathable cushioned earcups and ergonomic headband",
      "Seamless Bluetooth 5.0 wireless connectivity with low latency",
      "Built-in HD microphone for hands-free calling and voice assistant"
    ],
    specifications: {
      "Type": "Over-Ear Wireless",
      "Driver Size": "40 mm Neodymium",
      "Battery Life": "Up to 25 Hours",
      "Connectivity": "Bluetooth 5.0 / AUX 3.5mm",
      "Microphone": "Built-in HD Mic",
      "Charging Port": "Type-C Fast Charge",
      "Warranty": "1 Year Brand Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets wireless headphones leaf studios over ear bluetooth headset bass"
  },
  {
    id: "gmd-el-hp-002",
    product_id: "gmd-el-hp-002",
    name: "Marshall Monitor III A.N.C. Wireless Over-Ear Active Noise Cancelling Headphones",
    title: "Marshall Monitor III ANC Headphones",
    brand: "Marshall",
    category: "electronics",
    category_name: "Wireless Headphones",
    subcategory: "headphones",
    childCategory: "anc-headphones",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 19999,
    mrp: 29999,
    discount_percentage: 33,
    stock_quantity: 18,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 512,
    is_featured: true,
    is_bestseller: false,
    deal_type: "featured",
    thumbnail: "https://x.imastudent.com/content/0071791_marshall-monitor-iii-anc-wireless-over-ear-noise-canceling-headphones_500.png",
    images: [
      "https://x.imastudent.com/content/0071791_marshall-monitor-iii-anc-wireless-over-ear-noise-canceling-headphones_500.png"
    ],
    pi_images: [
      {
        image_url: "https://x.imastudent.com/content/0071791_marshall-monitor-iii-anc-wireless-over-ear-noise-canceling-headphones_500.png"
      }
    ],
    description: "The Marshall Monitor III A.N.C. combines iconic vintage rock 'n' roll aesthetics with cutting-edge active noise cancelling technology. Delivering up to 70 hours of wireless playtime with ANC on (and 100 hours without), custom-tuned drivers produce crystal-clear highs and thunderous lows.",
    features: [
      "Advanced Active Noise Cancelling (ANC) with Transparency Mode",
      "Incredible 70 hours wireless playtime with ANC on (100 hours off)",
      "Signature Marshall vintage leatherette finish & brass control knob",
      "Spatial sound acoustics for immersive studio-grade listening",
      "Foldable collapsible design with premium hardshell carry case"
    ],
    specifications: {
      "Type": "Over-Ear Wireless ANC",
      "Driver": "32 mm Custom Tuned Dynamic",
      "Battery Life": "70h (ANC on) / 100h (ANC off)",
      "Connectivity": "Bluetooth 5.3 & LE Audio",
      "Noise Cancellation": "Active Noise Cancellation (ANC)",
      "Charging": "USB-C Quick Charge (15 min = 12h play)",
      "Warranty": "1 Year Marshall Official Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets wireless headphones marshall anc active noise cancelling audiophile over ear"
  },

  // ==========================================
  // 2. BLUETOOTH SPEAKERS
  // ==========================================
  {
    id: "gmd-el-sp-001",
    product_id: "gmd-el-sp-001",
    name: "Zebronics Zeb-Sound Feast 270 Portable Bluetooth Speaker with Deep Bass & RGB Lights",
    title: "Zebronics Zeb-Sound Feast 270 Speaker",
    brand: "Zebronics",
    category: "electronics",
    category_name: "Bluetooth Speakers",
    subcategory: "speakers",
    childCategory: "portable-speakers",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 1799,
    mrp: 3499,
    discount_percentage: 49,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 340,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://shop.zebronics.com/cdn/shop/files/Zeb-sound-feast-270-orange-pic-1.jpg?v=1775811918&width=2000",
    images: [
      "https://shop.zebronics.com/cdn/shop/files/Zeb-sound-feast-270-orange-pic-1.jpg?v=1775811918&width=2000"
    ],
    pi_images: [
      {
        image_url: "https://shop.zebronics.com/cdn/shop/files/Zeb-sound-feast-270-orange-pic-1.jpg?v=1775811918&width=2000"
      }
    ],
    description: "Take the party anywhere with the Zebronics Zeb-Sound Feast 270 portable Bluetooth speaker. Featuring vibrant RGB dynamic LED lights, booming stereo sound with dual passive radiators, FM radio, USB/mSD playback, and a rugged outdoor handle, it is the ultimate outdoor music companion.",
    features: [
      "Vibrant multi-mode RGB party lights that pulse with the rhythm",
      "Dual passive radiators delivering room-filling deep punchy bass",
      "Multi-connectivity: Bluetooth v5.0, AUX, USB pen drive & FM radio",
      "Up to 10 hours playback with built-in rechargeable lithium battery",
      "TWS function allows wireless pairing of two speakers for stereo sound"
    ],
    specifications: {
      "Output Power": "15W RMS",
      "Battery Life": "Up to 10 Hours",
      "Connectivity": "Bluetooth 5.0, USB, mSD, AUX, FM",
      "RGB Lights": "Dynamic Multi-Color Modes",
      "Charging Port": "Type-C",
      "Warranty": "1 Year Zebronics Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets bluetooth speakers zebronics portable speaker rgb outdoor boombox"
  },
  {
    id: "gmd-el-sp-002",
    product_id: "gmd-el-sp-002",
    name: "Ultimate Ears WONDERBOOM 3 Ultraportable Rugged Waterproof Bluetooth Speaker",
    title: "UE WONDERBOOM 3 Waterproof Speaker",
    brand: "Ultimate Ears",
    category: "electronics",
    category_name: "Bluetooth Speakers",
    subcategory: "speakers",
    childCategory: "waterproof-speakers",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 7499,
    mrp: 9999,
    discount_percentage: 25,
    stock_quantity: 22,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 420,
    is_featured: false,
    is_bestseller: true,
    deal_type: "featured",
    thumbnail: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9130.jpg?width=2048&quality=60&crop=2048:1365&auto=webp",
    images: [
      "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9130.jpg?width=2048&quality=60&crop=2048:1365&auto=webp"
    ],
    pi_images: [
      {
        image_url: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9130.jpg?width=2048&quality=60&crop=2048:1365&auto=webp"
      }
    ],
    description: "Big bass in a compact form: the Ultimate Ears WONDERBOOM 3 produces 360-degree expansive sound with dedicated Outdoor Boost button. With IP67 waterproof and dustproof certification, drop resistance, and buoyant floating capability, it is built for pool parties, beach adventures, and showers.",
    features: [
      "Astonishingly big 360-degree sound with crisp highs and bass",
      "Outdoor Boost button instantly tunes audio for open-air clarity",
      "IP67 certified waterproof, dustproof and floats on water",
      "14 hours of long-lasting non-stop battery life",
      "Drop-tested rugged build with 40-meter (131 ft) wireless range"
    ],
    specifications: {
      "Type": "360-Degree Portable Bluetooth Speaker",
      "Battery Life": "Up to 14 Hours",
      "Protection": "IP67 Waterproof & Dustproof (Floats)",
      "Wireless Range": "40 Meters / 131 Feet",
      "Eco Design": "Made with recycled plastic",
      "Warranty": "2 Year Ultimate Ears Limited Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets bluetooth speakers ultimate ears wonderboom 3 waterproof outdoor speaker"
  },

  // ==========================================
  // 3. TWS TRUE WIRELESS EARBUDS
  // ==========================================
  {
    id: "gmd-el-eb-001",
    product_id: "gmd-el-eb-001",
    name: "boAt Airdopes Pro TWS True Wireless Earbuds with Deep Bass & HD Mic (Graphite Black)",
    title: "boAt Airdopes Pro TWS Earbuds",
    brand: "boAt",
    category: "electronics",
    category_name: "TWS True Wireless Earbuds",
    subcategory: "earbuds",
    childCategory: "tws-earbuds",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 1299,
    mrp: 2999,
    discount_percentage: 57,
    stock_quantity: 65,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 890,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://rukminim3.flixcart.com/image/480/640/xif0q/headphone/r/u/2/tws-true-wireless-earbuds-with-deep-bass-mic-graphite-black-original-imahmxaafdmtsf3y.jpeg?q=90",
    images: [
      "https://rukminim3.flixcart.com/image/480/640/xif0q/headphone/r/u/2/tws-true-wireless-earbuds-with-deep-bass-mic-graphite-black-original-imahmxaafdmtsf3y.jpeg?q=90"
    ],
    pi_images: [
      {
        image_url: "https://rukminim3.flixcart.com/image/480/640/xif0q/headphone/r/u/2/tws-true-wireless-earbuds-with-deep-bass-mic-graphite-black-original-imahmxaafdmtsf3y.jpeg?q=90"
      }
    ],
    description: "Experience pure audio freedom with boAt Airdopes Pro true wireless earbuds. Featuring 13mm audio drivers, instant IWP auto-pairing, Beast Mode low-latency for lag-free gaming, and ENx noise-reduction microphones, these lightweight earbuds deliver up to 45 hours of non-stop playback.",
    features: [
      "Signature boAt sound with powerful 13mm dynamic drivers",
      "Up to 45 hours total playback with sleek pocket charging case",
      "BEAST Mode low latency (50ms) for seamless mobile gaming",
      "ENx Environmental Noise Cancellation technology for clear calls",
      "ASAP Charge: 10 minutes charging provides 90 minutes playback"
    ],
    specifications: {
      "Type": "True Wireless In-Ear Earbuds",
      "Driver": "13 mm Dynamic",
      "Playback": "Up to 45 Hours Total",
      "Latency": "50ms Low-Latency BEAST Mode",
      "Water Resistance": "IPX5 Sweat & Splash Proof",
      "Bluetooth": "v5.3",
      "Warranty": "1 Year Official boAt Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets tws true wireless earbuds boat airdopes bluetooth earphones gaming"
  },
  {
    id: "gmd-el-eb-002",
    product_id: "gmd-el-eb-002",
    name: "Mivi DuoPods K7 True Wireless In-Ear Earbuds with 50H Playtime & AI-ENC Calling",
    title: "Mivi DuoPods K7 Wireless Earbuds",
    brand: "Mivi",
    category: "electronics",
    category_name: "TWS True Wireless Earbuds",
    subcategory: "earbuds",
    childCategory: "tws-earbuds",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 999,
    mrp: 2499,
    discount_percentage: 60,
    stock_quantity: 48,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 475,
    is_featured: false,
    is_bestseller: true,
    deal_type: "flash_deal",
    thumbnail: "https://m.media-amazon.com/images/I/51Xk2STcvzL._AC_UF1000,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/51Xk2STcvzL._AC_UF1000,1000_QL80_.jpg"
    ],
    pi_images: [
      {
        image_url: "https://m.media-amazon.com/images/I/51Xk2STcvzL._AC_UF1000,1000_QL80_.jpg"
      }
    ],
    description: "Crafted in India, Mivi DuoPods K7 brings studio-grade acoustics to your ears. Armed with 10.5mm electroplated bass drivers, AI-powered environmental noise cancellation, and a sleek pebble charging case, it guarantees up to 50 hours of battery life with ultra-crisp highs and rumbling sub-bass.",
    features: [
      "Proudly Made in India with premium electroplated pebble design",
      "Massive 50 hours combined battery life for all-week music",
      "Artificial Intelligence ENC eliminates ambient chatter during phone calls",
      "Ergonomic half-in-ear comfort fit for painless all-day wearing",
      "Type-C Super Fast charging with 10 mins for 8 hours playback"
    ],
    specifications: {
      "Type": "True Wireless Half In-Ear",
      "Drivers": "10.5mm Electroplated Dynamic",
      "Playtime": "Up to 50 Hours Combined",
      "Microphone": "AI-ENC Noise Reduction Mic",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX4 Sweat Resistant",
      "Warranty": "1 Year Mivi Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets tws earbuds mivi duopods wireless earphones in-ear ai enc"
  },

  // ==========================================
  // 4. SOUNDBARS & HOME AUDIO
  // ==========================================
  {
    id: "gmd-el-sb-001",
    product_id: "gmd-el-sb-001",
    name: "BassBox X250 2.1 Channel Bluetooth Soundbar with Wired Subwoofer & Optical Input",
    title: "BassBox X250 2.1 Ch Bluetooth Soundbar",
    brand: "BassBox",
    category: "electronics",
    category_name: "Soundbars & Home Audio",
    subcategory: "soundbars",
    childCategory: "soundbars",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 4999,
    mrp: 9999,
    discount_percentage: 50,
    stock_quantity: 24,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 198,
    is_featured: true,
    is_bestseller: true,
    deal_type: "featured",
    thumbnail: "https://cdn.shopify.com/s/files/1/0548/8849/7221/files/BASSBOX_X250_76f00cc7-ff40-4789-83c8-5bc40fbc99a4.jpg?v=1753969945",
    images: [
      "https://cdn.shopify.com/s/files/1/0548/8849/7221/files/BASSBOX_X250_76f00cc7-ff40-4789-83c8-5bc40fbc99a4.jpg?v=1753969945"
    ],
    pi_images: [
      {
        image_url: "https://cdn.shopify.com/s/files/1/0548/8849/7221/files/BASSBOX_X250_76f00cc7-ff40-4789-83c8-5bc40fbc99a4.jpg?v=1753969945"
      }
    ],
    description: "Transform your living room into a cinematic haven with the BassBox X250 2.1 Channel Soundbar. Delivering 160W peak power with a dedicated wooden down-firing subwoofer, multi-EQ sound presets (Movie, Music, News), and versatile HDMI ARC, Optical, and Bluetooth 5.3 inputs.",
    features: [
      "160W Peak Room-Filling Cinema Audio with 2.1 Channel configuration",
      "Dedicated deep-bass down-firing wooden subwoofer included",
      "HDMI ARC, Optical, AUX, USB & Bluetooth 5.3 multi-device connectivity",
      "3 Tailored Equalizer Presets for Movies, Music, and Dialogue clarity",
      "Sleek matte black soundbar with premium metal grille and wall mount kit"
    ],
    specifications: {
      "Channel": "2.1 Channel with Subwoofer",
      "Peak Output": "160 Watts Peak Power",
      "Inputs": "HDMI (ARC), Optical, Bluetooth 5.3, AUX, USB",
      "Subwoofer": "Wired Wooden Down-Firing Subwoofer",
      "Remote Control": "Full-function Infrared Remote",
      "Mounting": "Tabletop or Wall Mountable",
      "Warranty": "1 Year Manufacturer Warranty"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: false,
      return_days: 7
    },
    tags: "electronics gadgets soundbars home audio bassbox 2.1 channel tv speaker subwoofer"
  },
  {
    id: "gmd-el-sb-002",
    product_id: "gmd-el-sb-002",
    name: "TXF-11 High-Power Wireless TV Soundbar Home Theater Audio with 3D Surround Sound",
    title: "TXF-11 Wireless TV Soundbar Home Theater",
    brand: "Zebronics",
    category: "electronics",
    category_name: "Soundbars & Home Audio",
    subcategory: "soundbars",
    childCategory: "home-theater",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 3499,
    mrp: 6999,
    discount_percentage: 50,
    stock_quantity: 30,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 260,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://rukminim2.flixcart.com/image/480/480/xif0q/speaker/soundbar/t/q/l/txf-11-high-quality-wireless-tv-soundbar-home-theater-audio-3d-original-imahaz3ryc7qh94a.jpeg?q=80",
    images: [
      "https://rukminim2.flixcart.com/image/480/480/xif0q/speaker/soundbar/t/q/l/txf-11-high-quality-wireless-tv-soundbar-home-theater-audio-3d-original-imahaz3ryc7qh94a.jpeg?q=80"
    ],
    pi_images: [
      {
        image_url: "https://rukminim2.flixcart.com/image/480/480/xif0q/speaker/soundbar/t/q/l/txf-11-high-quality-wireless-tv-soundbar-home-theater-audio-3d-original-imahaz3ryc7qh94a.jpeg?q=80"
      }
    ],
    description: "Upgrade your TV sound instantly with the TXF-11 High Quality Wireless Soundbar. Engineered with quad front-firing audio drivers, integrated dual passive bass radiators, 3D surround sound DSP processing, and simple plug-and-play setup for Smart TVs and laptops.",
    features: [
      "Quad precision-tuned drivers delivering 100W room-engulfing sound",
      "Virtual 3D Surround Sound DSP processor for movie theater experience",
      "Wireless Bluetooth 5.0 streaming from phones, tablets, and smart TVs",
      "HDMI, Coaxial, Optical & AUX digital inputs for universal compatibility",
      "Slim compact form factor fits snugly below any flat-screen television"
    ],
    specifications: {
      "Output": "100W Peak Audio Power",
      "Configuration": "Stereo Soundbar with Quad Drivers",
      "DSP Modes": "3D Surround, Movie, News, Music",
      "Connectivity": "Bluetooth 5.0, Optical, Coaxial, AUX",
      "Dimensions": "80 cm x 6.5 cm x 6.5 cm",
      "Warranty": "1 Year Brand Replacement Warranty"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets soundbars home audio zebronics tv soundbar 3d surround sound"
  },

  // ==========================================
  // 5. SMART WATCHES
  // ==========================================
  {
    id: "gmd-el-sw-001",
    product_id: "gmd-el-sw-001",
    name: "Zebronics Zeb-Fit AMOLED Display Bluetooth Calling Smartwatch with Heart Rate & SpO2",
    title: "Zebronics Zeb-Fit AMOLED Smartwatch",
    brand: "Zebronics",
    category: "electronics",
    category_name: "Smart Watches",
    subcategory: "smart-wearables",
    childCategory: "smartwatches",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 2499,
    mrp: 5999,
    discount_percentage: 58,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 615,
    is_featured: true,
    is_bestseller: true,
    deal_type: "featured",
    thumbnail: "https://shop.zebronics.com/cdn/shop/articles/Zeb-Smart_Watch_1000x_0a382375-e70a-4702-a463-043f05f808b3.webp?v=1673857156&width=1024",
    images: [
      "https://shop.zebronics.com/cdn/shop/articles/Zeb-Smart_Watch_1000x_0a382375-e70a-4702-a463-043f05f808b3.webp?v=1673857156&width=1024"
    ],
    pi_images: [
      {
        image_url: "https://shop.zebronics.com/cdn/shop/articles/Zeb-Smart_Watch_1000x_0a382375-e70a-4702-a463-043f05f808b3.webp?v=1673857156&width=1024"
      }
    ],
    description: "Elevate your wrist game with the Zebronics Zeb-Fit AMOLED Smartwatch. Featuring a vibrant 1.43-inch Always-On AMOLED screen, Bluetooth calling with high-clarity speaker, continuous heart rate and SpO2 health tracking, 110+ sports modes, and up to 7 days battery life in a sleek metallic alloy casing.",
    features: [
      "1.43-inch Always-On Display (AOD) AMOLED screen with 466x466 resolution",
      "Seamless Bluetooth calling with quick dial pad and contact storage",
      "24/7 Real-Time Heart Rate, SpO2 blood oxygen, sleep & stress monitoring",
      "110+ Comprehensive Sports Modes with IP68 water resistance rating",
      "Smart notifications for WhatsApp, calls, SMS, and weather forecasts"
    ],
    specifications: {
      "Display": "1.43 Inch Always-On AMOLED (466x466 px)",
      "Battery Life": "Up to 7 Days (2-3 Days with Heavy Calling)",
      "Calling": "Bluetooth Calling with Mic & Speaker",
      "Sensors": "Heart Rate, SpO2, Accelerometer, Pedometer",
      "Water Resistance": "IP68 Dust & Waterproof",
      "Compatibility": "Android & iOS Companion App",
      "Warranty": "1 Year Official Brand Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets smart watches zebronics smartwatch amoled bluetooth calling health tracker"
  },
  {
    id: "gmd-el-sw-002",
    product_id: "gmd-el-sw-002",
    name: "Noise ColorFit Pulse Round Dial Bluetooth Calling Smartwatch with 100+ Sports Modes",
    title: "Noise ColorFit Pulse Round Dial Smartwatch",
    brand: "Noise",
    category: "electronics",
    category_name: "Smart Watches",
    subcategory: "smart-wearables",
    childCategory: "smartwatches",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 1999,
    mrp: 4999,
    discount_percentage: 60,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 780,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbf2kGAdZ_TJZn81Deb8_CkuXq9QjCb0Eauq3Z6l-D9KS-8YgfXLql9wk&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbf2kGAdZ_TJZn81Deb8_CkuXq9QjCb0Eauq3Z6l-D9KS-8YgfXLql9wk&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbf2kGAdZ_TJZn81Deb8_CkuXq9QjCb0Eauq3Z6l-D9KS-8YgfXLql9wk&s=10"
      }
    ],
    description: "Stay connected in style with the Noise ColorFit Pulse Round Dial Smartwatch. Boasting a classic circular 1.38-inch TFT display, Tru Sync technology for battery-efficient Bluetooth calls, comprehensive Noise Health Suite, and 100+ customizable cloud-based watch faces.",
    features: [
      "Classic Round Dial with 1.38-inch bright high-contrast color display",
      "Advanced Tru Sync Bluetooth calling with quick dial and call history",
      "Noise Health Suite: 24/7 Heart rate, SpO2, sleep tracking & breathing guide",
      "100+ sports tracking modes with calorie counter and distance tracker",
      "IP68 water resistant build with up to 7 days standby battery life"
    ],
    specifications: {
      "Display": "1.38 Inch Circular Color Display",
      "Calling Tech": "Single-Chip Tru Sync Bluetooth v5.3",
      "Battery": "Up to 7 Days (300mAh)",
      "Health Sensors": "Optical Heart Rate & SpO2 Sensor",
      "Water Protection": "IP68 Dust & Water Resistant",
      "Straps": "Interchangeable 22mm Silicone Strap",
      "Warranty": "1 Year Noise India Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets smart watches noise colorfit pulse smartwatch round dial calling"
  },

  // ==========================================
  // 6. FITNESS TRACKERS
  // ==========================================
  {
    id: "gmd-el-ft-001",
    product_id: "gmd-el-ft-001",
    name: "WHOOP 4.0 Advanced Continuous Health & Fitness Activity Tracker Band with Sleep Coach",
    title: "WHOOP 4.0 Health & Fitness Tracker Band",
    brand: "WHOOP",
    category: "electronics",
    category_name: "Fitness Trackers",
    subcategory: "fitness-trackers",
    childCategory: "fitness-bands",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 9999,
    mrp: 14999,
    discount_percentage: 33,
    stock_quantity: 15,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 320,
    is_featured: true,
    is_bestseller: false,
    deal_type: "featured",
    thumbnail: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1743444773-mhl-tracker-whoop-477-67eadb1b81475.jpg?crop=1xw:1xh;center,top&resize=980:*",
    images: [
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1743444773-mhl-tracker-whoop-477-67eadb1b81475.jpg?crop=1xw:1xh;center,top&resize=980:*"
    ],
    pi_images: [
      {
        image_url: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1743444773-mhl-tracker-whoop-477-67eadb1b81475.jpg?crop=1xw:1xh;center,top&resize=980:*"
      }
    ],
    description: "The gold standard in athletic recovery and strain tracking: WHOOP 4.0 monitors physiological biomarkers 24/7 with zero distractions and screen-free comfort. Tracks cardiovascular strain, recovery score, sleep architecture, skin temperature, and blood oxygen to help you optimize performance.",
    features: [
      "Continuous 24/7 screen-free biometric monitoring for zero distractions",
      "Tracks Daily Strain, Recovery Score & Sleep Coach recommendations",
      "Monitors Heart Rate Variability (HRV), skin temperature & blood oxygen (SpO2)",
      "Wireless on-the-go waterproof battery pack charges while you wear it",
      "SuperKnit ultra-breathable stretch band with durable clasp"
    ],
    specifications: {
      "Form Factor": "Screen-free Fabric Sensor Band",
      "Biometrics": "HRV, Heart Rate, Skin Temp, Blood Oxygen, Respiratory Rate",
      "Battery": "4-5 Days Battery Life (Wireless Charging on wrist)",
      "Water Resistance": "IP68 Waterproof up to 10 meters",
      "App": "WHOOP Companion App (Android/iOS)",
      "Warranty": "1 Year Official Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets fitness trackers whoop 4.0 activity tracker sleep coach recovery hrv"
  },
  {
    id: "gmd-el-ft-002",
    product_id: "gmd-el-ft-002",
    name: "Oura Horizon Smart Fitness & Sleep Tracking Activity Ring Band with Titanium Finish",
    title: "Oura Horizon Smart Fitness Activity Band",
    brand: "Oura",
    category: "electronics",
    category_name: "Fitness Trackers",
    subcategory: "fitness-trackers",
    childCategory: "activity-trackers",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 12999,
    mrp: 18999,
    discount_percentage: 32,
    stock_quantity: 12,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 240,
    is_featured: false,
    is_bestseller: false,
    deal_type: "featured",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/64dbebf064155118ff2f3cc6/6aa74fba-fc7e-40b3-be53-eec85f30ed19/DSC_1134.jpg",
    images: [
      "https://images.squarespace-cdn.com/content/v1/64dbebf064155118ff2f3cc6/6aa74fba-fc7e-40b3-be53-eec85f30ed19/DSC_1134.jpg"
    ],
    pi_images: [
      {
        image_url: "https://images.squarespace-cdn.com/content/v1/64dbebf064155118ff2f3cc6/6aa74fba-fc7e-40b3-be53-eec85f30ed19/DSC_1134.jpg"
      }
    ],
    description: "The epitome of discreet smart health tracking: Oura Horizon measures bodily signals directly from finger arteries where pulse signal is up to 100x stronger than the wrist. Provides medical-grade sleep analysis, readiness scores, heart rate monitoring, and cycle tracking wrapped in ultralight titanium.",
    features: [
      "Ultralight featherweight titanium body weighs less than 6 grams",
      "Finger-based optical sensors provide up to 100x cleaner pulse signal",
      "Detailed Sleep Staging: Deep, REM, and Light sleep architecture",
      "Readiness Score analyzes body recovery, resting heart rate & temperature",
      "Up to 7 days battery life with water resistance up to 100 meters"
    ],
    specifications: {
      "Material": "Lightweight Durable Titanium with PVD Coating",
      "Sensors": "Red & Green PPG, Infrared Temp, 3D Accelerometer",
      "Water Resistance": "Waterproof up to 100 Meters (10 ATM)",
      "Battery Life": "Up to 7 Days on single charge",
      "Charging": "Included Wireless Magnetic Induction Cradle",
      "Warranty": "1 Year International Brand Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets fitness trackers oura horizon smart ring activity tracker sleep analysis"
  },
  {
    id: "gmd-el-ft-003",
    product_id: "gmd-el-ft-003",
    name: "Fitbit Charge 6 Advanced Fitness Activity Tracker with Built-in GPS, Heart Rate & ECG",
    title: "Fitbit Charge 6 Fitness Tracker Band",
    brand: "Fitbit",
    category: "electronics",
    category_name: "Fitness Trackers",
    subcategory: "fitness-trackers",
    childCategory: "fitness-bands",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 6499,
    mrp: 9999,
    discount_percentage: 35,
    stock_quantity: 28,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 530,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://media.istockphoto.com/id/2230272230/photo/person-interacting-with-smartwatch-for-fitness-and-activity-tracking.jpg?s=612x612&w=0&k=20&c=O9coeAfmbEDr1aCEXVDLfq1keFf9WZt7su5UJQD7vkw=",
    images: [
      "https://media.istockphoto.com/id/2230272230/photo/person-interacting-with-smartwatch-for-fitness-and-activity-tracking.jpg?s=612x612&w=0&k=20&c=O9coeAfmbEDr1aCEXVDLfq1keFf9WZt7su5UJQD7vkw="
    ],
    pi_images: [
      {
        image_url: "https://media.istockphoto.com/id/2230272230/photo/person-interacting-with-smartwatch-for-fitness-and-activity-tracking.jpg?s=612x612&w=0&k=20&c=O9coeAfmbEDr1aCEXVDLfq1keFf9WZt7su5UJQD7vkw="
      }
    ],
    description: "Take workouts further with Fitbit Charge 6: our top-rated fitness tracker packed with built-in GPS for phone-free running pace and distance, ECG app for heart rhythm assessment, 40+ exercise modes, and Google Maps turn-by-turn wrist navigation with YouTube Music controls.",
    features: [
      "Built-in standalone GPS tracks real-time pace and distance without phone",
      "ECG App checks heart rhythm for atrial fibrillation & EDA stress sensor",
      "Integrated Google tools: Google Maps turn-by-turn navigation & Google Wallet",
      "40+ comprehensive workout modes with cardio fitness score tracking",
      "Vibrant AMOLED color touch display with Always-On option"
    ],
    specifications: {
      "Display": "Vibrant Color AMOLED Touchscreen with Gorilla Glass",
      "GPS": "Built-in Standalone GPS + GLONASS",
      "Battery": "Up to 7 Days Battery Life",
      "Health Sensors": "ECG, EDA, Optical Heart Rate, SpO2, Skin Temp",
      "Water Resistance": "Water resistant to 50 meters (Swimproof)",
      "Warranty": "1 Year Official Fitbit Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets fitness trackers fitbit charge 6 activity tracker gps ecg amoled band"
  },

  // ==========================================
  // 7. POWERBANKS
  // ==========================================
  {
    id: "gmd-el-pb-001",
    product_id: "gmd-el-pb-001",
    name: "Anker PowerCore 20000mAh Ultra-High Capacity Portable Charger Power Bank with PowerIQ",
    title: "Anker PowerCore 20000mAh Power Bank",
    brand: "Anker",
    category: "electronics",
    category_name: "Power Banks",
    subcategory: "power-banks",
    childCategory: "power-banks",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 2499,
    mrp: 4499,
    discount_percentage: 44,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 720,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://m.media-amazon.com/images/I/51KkoqFqjjL._AC_UF1000,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/51KkoqFqjjL._AC_UF1000,1000_QL80_.jpg"
    ],
    pi_images: [
      {
        image_url: "https://m.media-amazon.com/images/I/51KkoqFqjjL._AC_UF1000,1000_QL80_.jpg"
      }
    ],
    description: "Reliable power anywhere you roam: the Anker PowerCore 20000mAh power bank holds enough juice to charge most flagship smartphones 4 to 5 times. Backed by Anker's exclusive PowerIQ and VoltageBoost fast-charging technologies, MultiProtect 11-point safety system, and dual high-speed output ports.",
    features: [
      "Colossal 20,000mAh high-density lithium polymer battery capacity",
      "PowerIQ & VoltageBoost technology deliver tailored high-speed charging",
      "Simultaneous dual-device charging with twin USB output ports",
      "Anker MultiProtect 11-point safety shield prevents over-voltage & heating",
      "Sleek matte texture resistant to fingerprints, scratches, and drops"
    ],
    specifications: {
      "Capacity": "20,000 mAh (74Wh)",
      "Output": "Dual USB-A with PowerIQ (5V/3A combined)",
      "Input": "Type-C & Micro-USB Recharging",
      "Dimensions": "15.8 cm x 7.4 cm x 1.9 cm",
      "Weight": "345 grams",
      "Warranty": "18 Months Anker Hassle-Free Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets powerbanks anker powercore 20000mah portable charger battery pack"
  },
  {
    id: "gmd-el-pb-002",
    product_id: "gmd-el-pb-002",
    name: "Mi 10000mAh Pocket Power Bank Pro with 22.5W Ultra-Fast Two-Way Type-C Quick Charging",
    title: "Mi 10000mAh Pocket Power Bank Pro 22.5W",
    brand: "Mi",
    category: "electronics",
    category_name: "Power Banks",
    subcategory: "power-banks",
    childCategory: "power-banks",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 1299,
    mrp: 2199,
    discount_percentage: 41,
    stock_quantity: 55,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 890,
    is_featured: false,
    is_bestseller: true,
    deal_type: "flash_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCB34351K2m_3gZMegqJEVfu5B7jZVtgn8Zc2of_G7d2NwG2B-qJn4W0&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCB34351K2m_3gZMegqJEVfu5B7jZVtgn8Zc2of_G7d2NwG2B-qJn4W0&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCB34351K2m_3gZMegqJEVfu5B7jZVtgn8Zc2of_G7d2NwG2B-qJn4W0&s=10"
      }
    ],
    description: "Compact enough to slip into any pocket: the Mi 10000mAh Pocket Power Bank Pro packs high-speed 22.5W fast charging into an ultra-slim palm-sized form. Compatible with Power Delivery (PD) and Quick Charge 3.0, it can power up to 3 devices simultaneously while maintaining low-current charging mode for smartwatches and earbuds.",
    features: [
      "Ultra-compact pocket design weighs only 200g with matte metallic shell",
      "22.5W Ultra-fast two-way fast charging refuels power bank in just 3.5h",
      "Triple output ports: Dual USB-A ports plus bi-directional Type-C port",
      "Low current charging mode: double-tap power button for earbuds/bands",
      "12-layer advanced circuit protection against short-circuit and surges"
    ],
    specifications: {
      "Capacity": "10,000 mAh (37Wh)",
      "Max Power Output": "22.5 Watts (PD 3.0 / QC 3.0)",
      "Ports": "1x USB-C (Input/Output), 2x USB-A (Output)",
      "Weight": "200 grams",
      "Safety": "12-Layer Advanced Chip Protection",
      "Warranty": "6 Months Mi Brand Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets powerbanks mi xiaomi 10000mah pocket power bank 22.5w fast charging"
  },

  // ==========================================
  // 8. CHARGERS & CABLES
  // ==========================================
  {
    id: "gmd-el-cc-001",
    product_id: "gmd-el-cc-001",
    name: "UltraWarp 65W High-Speed Fast Charging USB-C to USB-C Heavy Braided Cable (1.5M)",
    title: "UltraWarp 65W Fast Charging USB-C Cable",
    brand: "boAt",
    category: "electronics",
    category_name: "Chargers & Cables",
    subcategory: "chargers-cables",
    childCategory: "cables",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 349,
    mrp: 799,
    discount_percentage: 56,
    stock_quantity: 80,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 640,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/data-cable/micro-usb-cable/b/o/5/fast-charging-cable-5v-2a-ultrawarp-original-imahfp65pkxnhf3z.jpeg?q=70",
    images: [
      "https://rukmini1.flixcart.com/image/1500/1500/xif0q/data-cable/micro-usb-cable/b/o/5/fast-charging-cable-5v-2a-ultrawarp-original-imahfp65pkxnhf3z.jpeg?q=70"
    ],
    pi_images: [
      {
        image_url: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/data-cable/micro-usb-cable/b/o/5/fast-charging-cable-5v-2a-ultrawarp-original-imahfp65pkxnhf3z.jpeg?q=70"
      }
    ],
    description: "Built for speed and endurance: the UltraWarp 65W USB-C to USB-C cable features heavy-duty military-grade nylon braiding, reinforced stress-relief connector collars, and support for up to 65W Power Delivery fast charging. Compatible with modern smartphones, tablets, MacBooks, and laptops.",
    features: [
      "Supports up to 65W (20V/3.25A) Power Delivery super-fast charging",
      "Heavy-duty double-braided nylon jacket withstands 15,000+ bends",
      "High-speed 480Mbps data synchronization between phones and PCs",
      "Tangle-free 1.5-meter ideal length with premium aluminum shell connectors",
      "Intelligent E-Marker chip protects battery health from electrical spikes"
    ],
    specifications: {
      "Connector Type": "USB Type-C to USB Type-C",
      "Max Power": "65 Watts (Power Delivery)",
      "Length": "1.5 Meters (5 Feet)",
      "Material": "Heavy-Duty Braided Nylon & Aluminum Connectors",
      "Data Speed": "Up to 480 Mbps",
      "Warranty": "2 Year Replacement Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets chargers cables ultrawarp 65w type c cable braided fast charging"
  },
  {
    id: "gmd-el-cc-002",
    product_id: "gmd-el-cc-002",
    name: "Mobo GaN 65W Dual Port Fast Wall Charger Adapter with Power Delivery (PD 3.0 & QC)",
    title: "Mobo GaN 65W Dual Port Fast Charger",
    brand: "Mobo",
    category: "electronics",
    category_name: "Chargers & Cables",
    subcategory: "chargers-cables",
    childCategory: "chargers",
    department: "electronics",
    gender: "unisex",
    section: "electronics",
    seller_id: "seller-3",
    seller_name: "SmartTech Audio & Wearables",
    price: 1199,
    mrp: 2499,
    discount_percentage: 52,
    stock_quantity: 36,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 310,
    is_featured: true,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://moborocks.com/images/detailed/155/Untitleddesign-2022-10-28T105522.199_d62fd9c1-3e43-4e79-bcf5-78c5c809dcaa.png",
    images: [
      "https://moborocks.com/images/detailed/155/Untitleddesign-2022-10-28T105522.199_d62fd9c1-3e43-4e79-bcf5-78c5c809dcaa.png"
    ],
    pi_images: [
      {
        image_url: "https://moborocks.com/images/detailed/155/Untitleddesign-2022-10-28T105522.199_d62fd9c1-3e43-4e79-bcf5-78c5c809dcaa.png"
      }
    ],
    description: "Harness next-generation Gallium Nitride (GaN) semiconductor technology: the Mobo 65W Dual Port fast wall charger delivers maximum charging power in a frame 50% smaller than conventional laptop bricks. Powers your laptop and smartphone simultaneously with intelligent power distribution.",
    features: [
      "Next-gen GaN Technology runs cooler, operates faster, and is 50% smaller",
      "Blazing 65W output charges MacBooks, Dell, iPhones, and Androids at full speed",
      "Dual Ports: 1x USB-C (PD 3.0) + 1x USB-A (Quick Charge 3.0)",
      "Intelligent Power Allocation dynamically splits wattage across both devices",
      "Comprehensive multi-protection against over-voltage, overheating & surges"
    ],
    specifications: {
      "Total Wattage": "65W Max Output",
      "Technology": "GaN (Gallium Nitride) Semiconductor",
      "Ports": "1x USB-C (65W Max), 1x USB-A (18W Max)",
      "Protocols": "PD 3.0, PPS, QC 3.0, AFC, FCP",
      "Pin Type": "Standard Indian 2-Pin Plug (BIS Certified)",
      "Warranty": "1 Year Official Brand Warranty"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "electronics gadgets chargers cables mobo gan 65w dual port fast wall charger adapter"
  }
];

// 1. Append to frontend/src/data/sampleProducts.js
const sampleProductsPath = path.resolve('frontend/src/data/sampleProducts.js');
let sampleContent = fs.readFileSync(sampleProductsPath, 'utf8');

const existingIds = new Set();
const idRegex = /"id":\s*"([^"]+)"/g;
let match;
while ((match = idRegex.exec(sampleContent)) !== null) {
  existingIds.add(match[1]);
}

const newProductsToAdd = electronicsProducts.filter(p => !existingIds.has(p.id));

if (newProductsToAdd.length > 0) {
  const formattedNewProducts = newProductsToAdd.map(p => JSON.stringify(p, null, 2)).join(',\n');
  const lastBracketIndex = sampleContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const updatedContent = sampleContent.slice(0, lastBracketIndex).trimEnd() + ',\n' + formattedNewProducts + '\n];\n';
    fs.writeFileSync(sampleProductsPath, updatedContent, 'utf8');
    console.log(`Added ${newProductsToAdd.length} electronics products to frontend sampleProducts.js`);
  }
} else {
  console.log('All electronics products already exist in frontend sampleProducts.js');
}

// 2. Append to backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  const backendProducts = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
  const backendIds = new Set(backendProducts.map(p => p.id || p.product_id));
  const backendToAdd = electronicsProducts.filter(p => !backendIds.has(p.id));
  if (backendToAdd.length > 0) {
    backendProducts.push(...backendToAdd);
    fs.writeFileSync(backendPath, JSON.stringify(backendProducts, null, 2), 'utf8');
    console.log(`Added ${backendToAdd.length} electronics products to backend products.json`);
  } else {
    console.log('All electronics products already exist in backend products.json');
  }
}
