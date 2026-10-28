import fs from 'fs';
import path from 'path';

const kidsProducts = [
  // 1. Kids T-shirts & Shirts
  {
    id: "gmd-kd-sh-001",
    product_id: "gmd-kd-sh-001",
    name: "MAX Boys Pure Cotton Printed Crew Neck T-Shirt",
    title: "MAX Boys Purple Printed Crew Neck T-Shirt",
    brand: "MAX Kids",
    category: "clothing",
    category_name: "Shirts & T-Shirts",
    subcategory: "shirts-tshirts",
    childCategory: "t-shirts",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 499,
    mrp: 899,
    discount_percentage: 44,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 135,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://media.landmarkshops.in/cdn-cgi/image/h=739,w=499,q=85,fit=cover/max-new/1000016828227-Purple-PURPLE-1000016828227_05-2100.jpg",
    images: [
      "https://media.landmarkshops.in/cdn-cgi/image/h=739,w=499,q=85,fit=cover/max-new/1000016828227-Purple-PURPLE-1000016828227_05-2100.jpg"
    ],
    pi_images: [
      {
        image_url: "https://media.landmarkshops.in/cdn-cgi/image/h=739,w=499,q=85,fit=cover/max-new/1000016828227-Purple-PURPLE-1000016828227_05-2100.jpg"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Give your child's casual wardrobe a cool vibrant upgrade with this MAX Boys pure cotton printed crew neck t-shirt. Crafted from 100% breathable combed cotton with a durable rib collar, soft skin-friendly texture, and fade-resistant graphic print, it is ideal for everyday playdates, school, and outdoor fun.",
    features: [
      "100% Breathable Combed Cotton Fabric",
      "Vibrant fade-resistant chest graphic print",
      "Classic crew neckline with flexible ribbed collar",
      "Tagless comfort label to prevent skin irritation",
      "Easy machine washable and quick drying"
    ],
    specifications: {
      "Fabric": "100% Cotton",
      "Fit": "Regular Fit",
      "Neck": "Crew Neck",
      "Sleeve": "Short Sleeves",
      "Occasion": "Daily Casual & Playwear",
      "Wash Care": "Machine Wash Warm"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "kids boys clothing tshirts shirts t-shirt purple max printed"
  },

  // 2. Kids Jeans & Shorts - Product 1: Jeans
  {
    id: "gmd-kd-jn-001",
    product_id: "gmd-kd-jn-001",
    name: "Boys Straight Leg Light Washed Stretch Denim Jeans",
    title: "Boys Straight Leg Washed Denim Jeans",
    brand: "Junior Denim Co.",
    category: "clothing",
    category_name: "Jeans & Shorts",
    subcategory: "jeans-shorts",
    childCategory: "jeans",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 799,
    mrp: 1499,
    discount_percentage: 47,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.5,
    reviews_count: 112,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://img.kwcdn.com/product/fancy/3d46ff4b-5bf9-4311-9f88-f5104a81b63f.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
    images: [
      "https://img.kwcdn.com/product/fancy/3d46ff4b-5bf9-4311-9f88-f5104a81b63f.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
    ],
    pi_images: [
      {
        image_url: "https://img.kwcdn.com/product/fancy/3d46ff4b-5bf9-4311-9f88-f5104a81b63f.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Designed for active young boys, these classic light-washed straight leg jeans offer the authentic look of durable denim paired with stretch comfort. Features an inner adjustable elastic button waistband that grows with your child, durable reinforced stitching, and convenient five-pocket styling.",
    features: [
      "Cotton-rich stretch denim for unrestricted movement",
      "Inner buttonhole elastic waistband for custom adjustment",
      "Vintage light wash with subtle whiskering effects",
      "Classic 5-pocket styling with metal rivet reinforcements",
      "Durable zip fly with sturdy shank button closure"
    ],
    specifications: {
      "Fabric": "98% Cotton, 2% Elastane",
      "Fit": "Straight Leg Regular Fit",
      "Waist": "Mid Rise with Inner Adjustable Elastic",
      "Closure": "Zip Fly with Button",
      "Occasion": "Casual, Outings & Parties",
      "Wash Care": "Machine Wash Cold"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "kids boys clothing jeans denim pants bottoms"
  },

  // 3. Kids Jeans & Shorts - Product 2: Shorts
  {
    id: "gmd-kd-jn-002",
    product_id: "gmd-kd-jn-002",
    name: "Boys Trendy Washed Denim Casual Shorts with Drawstring",
    title: "Boys Washed Denim Drawstring Shorts",
    brand: "Little Stars",
    category: "clothing",
    category_name: "Jeans & Shorts",
    subcategory: "jeans-shorts",
    childCategory: "shorts",
    department: "kids",
    gender: "kids",
    section: "kids",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 449,
    mrp: 899,
    discount_percentage: 50,
    stock_quantity: 55,
    in_stock: true,
    is_active: true,
    rating: 4.4,
    reviews_count: 98,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://images.meesho.com/images/products/784885466/knhtm_512.webp?width=512",
    images: [
      "https://images.meesho.com/images/products/784885466/knhtm_512.webp?width=512"
    ],
    pi_images: [
      {
        image_url: "https://images.meesho.com/images/products/784885466/knhtm_512.webp?width=512"
      }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    description: "Keep your little one comfortable all summer long with these casual washed denim shorts. Featuring an ultra-comfortable elastic waistband with adjustable drawstring cord, soft washed denim knit, and folded hem detailing for an effortless sunny-day look.",
    features: [
      "Soft enzyme-washed breathable cotton denim",
      "Comfortable pull-on elastic waistband with contrast drawstring",
      "Dual front pockets and rear patch pocket",
      "Folded hem cuffs with contrast stitch detail",
      "Lightweight and flexible for all-day running and playing"
    ],
    specifications: {
      "Fabric": "100% Washed Cotton Denim",
      "Fit": "Relaxed Casual Fit",
      "Length": "Knee Length",
      "Waist": "Elasticated Drawstring Waist",
      "Occasion": "Summer Casual, Beach & Playwear",
      "Wash Care": "Machine Wash Gentle"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: true,
      return_days: 15
    },
    tags: "kids boys clothing shorts jeans denim bottoms casual"
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

const newProductsToAdd = kidsProducts.filter(p => !existingIds.has(p.id));

if (newProductsToAdd.length > 0) {
  const formattedNewProducts = newProductsToAdd.map(p => JSON.stringify(p, null, 2)).join(',\n');
  const lastBracketIndex = sampleContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const updatedContent = sampleContent.slice(0, lastBracketIndex).trimEnd() + ',\n' + formattedNewProducts + '\n];\n';
    fs.writeFileSync(sampleProductsPath, updatedContent, 'utf8');
    console.log(`Added ${newProductsToAdd.length} products to frontend sampleProducts.js`);
  }
} else {
  console.log('All kids products already exist in frontend sampleProducts.js');
}

// Update backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  const backendProducts = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
  const backendIds = new Set(backendProducts.map(p => p.id || p.product_id));
  const backendToAdd = kidsProducts.filter(p => !backendIds.has(p.id));
  if (backendToAdd.length > 0) {
    backendProducts.push(...backendToAdd);
    fs.writeFileSync(backendPath, JSON.stringify(backendProducts, null, 2), 'utf8');
    console.log(`Added ${backendToAdd.length} products to backend products.json`);
  } else {
    console.log('All kids products already exist in backend products.json');
  }
}
