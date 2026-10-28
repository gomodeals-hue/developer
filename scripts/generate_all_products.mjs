import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function p(
  id, name, cat, catName, sec, gender, sub, child, brand, price, mrp, stock, rating, reviews,
  dealType, isFeat, isBest, thumb, pi, tags, desc, feats, specs
) {
  const images = (pi && pi.length > 0) ? pi : [thumb];
  const disc = Math.round(((mrp - price) / mrp) * 100);
  return {
    product_id: id,
    id: id,
    name: name,
    title: name,
    category: cat,
    category_name: catName,
    section: sec,
    gender: gender || sec,
    subcategory: sub,
    childCategory: child,
    department: gender || sec,
    brand: brand,
    price: price,
    mrp: mrp,
    discount_percentage: disc,
    stock_quantity: stock,
    in_stock: true,
    is_active: true,
    rating: rating,
    reviews_count: reviews,
    is_featured: isFeat,
    is_bestseller: isBest,
    deal_type: dealType,
    description: desc,
    thumbnail: thumb,
    images: images,
    pi_images: images.map(u => ({ image_url: u })),
    tags: tags,
    features: feats || [
      `100% Authentic product certified by ${brand}`,
      'Constructed with premium, certified materials',
      'Engineered for maximum daily comfort and durability',
      'Direct brand warranty with seamless replacement'
    ],
    specifications: specs || {
      'Category': catName,
      'Subcategory': child,
      'Brand': brand,
      'Warranty': '1 Year Standard Brand Warranty'
    }
  };
}

const products = [];

// =========================================================================
// 1. MEN - CLOTHING / WESTERN WEAR
// =========================================================================

// MEN SHIRTS (4 products)
products.push(
  p('gmd-men-shirts-1', 'Raymond Slim Fit Pure Cotton White Formal Shirt', 'clothing', 'Clothing', 'men', 'men', 'shirts', 'Shirts',
    'Raymond', 1299, 2499, 45, 4.8, 234, 'daily_deal', true, true,
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&q=80', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&q=80'],
    'men, clothing, western-wear, shirts, formal-shirt, cotton, executive',
    'Crisp, premium Egyptian cotton formal shirt tailored to a sharp slim fit with a spread collar and double-button cuffs.',
    ['100% Breathable Egyptian Cotton', 'Stiffened Spread Collar for Ties', 'Tailored Slim Fit', 'Wrinkle-Resistant Easy Iron Weave'],
    { 'Fabric': '100% Cotton', 'Fit': 'Slim Fit', 'Collar': 'Spread Collar', 'Sleeves': 'Full Sleeves', 'Occasion': 'Formal' }),

  p('gmd-men-shirts-2', "Levi's Classic Western Denim Long Sleeve Casual Shirt", 'clothing', 'Clothing', 'men', 'men', 'shirts', 'Shirts',
    "Levi's", 1899, 3299, 38, 4.7, 189, 'flash_deal', true, false,
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&q=80'],
    'men, clothing, western-wear, shirts, denim-shirt, casual, levis',
    "Authentic Levi's Western denim shirt featuring pointed yoke detailing, snap flap front pockets, and durable medium-wash indigo denim.",
    ['Medium-Wash Sturdy Indigo Denim', 'Signature Western Pearl Snaps', 'Twin Chest Flap Pockets', 'Regular Fit Comfort Silhouette'],
    { 'Fabric': '100% Cotton Denim', 'Fit': 'Regular Fit', 'Collar': 'Point Collar', 'Sleeves': 'Full Sleeves', 'Occasion': 'Casual' }),

  p('gmd-men-shirts-3', 'Zara Breathable Pure Linen Camp Collar Casual Shirt', 'clothing', 'Clothing', 'men', 'men', 'shirts', 'Shirts',
    'Zara', 1599, 2990, 32, 4.6, 145, 'daily_deal', false, true,
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80',
    ['https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=1000&q=80'],
    'men, clothing, western-wear, shirts, linen-shirt, resort-wear, zara',
    'Relaxed resort-style pure linen shirt with an open Cuban camp collar, chest patch pocket, and natural slub texture.',
    ['100% Pure Natural European Linen', 'Open Cuban Camp Collar', 'Breathable Summer Weight', 'Soft Garment-Washed Feel'],
    { 'Fabric': '100% Pure Linen', 'Fit': 'Relaxed Fit', 'Collar': 'Cuban Camp Collar', 'Sleeves': 'Half Sleeves', 'Occasion': 'Vacation' }),

  p('gmd-men-shirts-4', 'Peter England Navy Blue Gingham Checked Casual Shirt', 'clothing', 'Clothing', 'men', 'men', 'shirts', 'Shirts',
    'Peter England', 999, 1899, 50, 4.5, 210, 'regular', false, false,
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
    ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=1000&q=80'],
    'men, clothing, western-wear, shirts, checked-shirt, smart-casual',
    'Smart gingham checked cotton shirt with a button-down collar, curved hemline, and versatile styling for office and smart-casual weekends.',
    ['Combed Cotton Twill Fabric', 'Button-Down Collar Stay', 'Curved Hem for Tucked or Untucked Wear', 'Vibrant Colorfast Dyes'],
    { 'Fabric': '100% Combed Cotton', 'Fit': 'Slim Fit', 'Collar': 'Button-Down', 'Sleeves': 'Full Sleeves', 'Occasion': 'Smart Casual' })
);

// MEN T-SHIRTS & POLOS (4 products)
products.push(
  p('gmd-men-tshirts-1', 'H&M Classic Crewneck Organic Cotton T-Shirt', 'clothing', 'Clothing', 'men', 'men', 't-shirts', 'T-Shirts & Polos',
    'H&M', 499, 999, 60, 4.6, 310, 'daily_deal', true, true,
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&q=80'],
    'men, clothing, western-wear, t-shirts, tee, crewneck, basic, hm',
    'Essential everyday crewneck T-shirt crafted from soft organic combed jersey with a ribbed neckline and relaxed regular cut.',
    ['100% Certified Organic Cotton', 'Soft Combed Jersey Finish', 'Ribbed Crew Neckline', 'Tagless Neck Label'],
    { 'Fabric': 'Organic Cotton', 'Fit': 'Regular Fit', 'Neck': 'Crew Neck', 'Sleeves': 'Half Sleeves', 'Occasion': 'Daily Casual' }),

  p('gmd-men-tshirts-2', 'Nike Dri-FIT Athletic Training Performance T-Shirt', 'clothing', 'Clothing', 'men', 'men', 't-shirts', 'T-Shirts & Polos',
    'Nike', 1199, 1995, 42, 4.8, 285, 'flash_deal', true, false,
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&q=80'],
    'men, clothing, western-wear, t-shirts, athletic, nike, gym, training',
    'High-performance athletic tee powered by sweat-wicking Dri-FIT technology for cool comfort throughout intense workouts.',
    ['Nike Dri-FIT Moisture Wicking', 'Lightweight Breathable Mesh Knit', 'Reflective Swoosh Logo', 'Anti-Odor Polygiene Finish'],
    { 'Fabric': '100% Recycled Polyester', 'Fit': 'Athletic Slim', 'Neck': 'Crew Neck', 'Sleeves': 'Half Sleeves', 'Occasion': 'Sports' }),

  p('gmd-men-tshirts-3', 'Tommy Hilfiger Pique Cotton Solid Polo T-Shirt', 'clothing', 'Clothing', 'men', 'men', 't-shirts', 'T-Shirts & Polos',
    'Tommy Hilfiger', 1699, 3499, 35, 4.7, 178, 'daily_deal', false, true,
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=80'],
    'men, clothing, western-wear, t-shirts, polo, tommy-hilfiger, pique',
    'Timeless polo T-shirt cut from breathable cotton pique with signature ribbed flat-knit collar and embroidered heritage flag on the chest.',
    ['100% Pique Knit Cotton', 'Two-Button Placket', 'Ribbed Collar and Armbands', 'Embroidered Chest Flag'],
    { 'Fabric': 'Pique Cotton', 'Fit': 'Custom Regular', 'Neck': 'Polo Collar', 'Sleeves': 'Half Sleeves', 'Occasion': 'Smart Casual' }),

  p('gmd-men-tshirts-4', 'Roadster Vintage Graphic Print Streetwear T-Shirt', 'clothing', 'Clothing', 'men', 'men', 't-shirts', 'T-Shirts & Polos',
    'Roadster', 549, 1199, 48, 4.5, 162, 'regular', false, false,
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&q=80'],
    'men, clothing, western-wear, t-shirts, graphic-tee, streetwear, roadster',
    'Urban streetwear graphic T-shirt with a vintage moto screen print, bio-washed cotton feel, and relaxed drop-shoulder cut.',
    ['180 GSM Heavyweight Bio-Washed Cotton', 'High-Definition Screen Print', 'Drop-Shoulder Street Silhouette', 'Durable Twin-Needle Stitching'],
    { 'Fabric': '100% Cotton', 'Fit': 'Oversized Fit', 'Neck': 'Round Neck', 'Sleeves': 'Half Sleeves', 'Occasion': 'Streetwear' })
);

// MEN JEANS & DENIMS (4 products)
products.push(
  p('gmd-men-jeans-1', "Levi's 511 Slim Fit Stretch Denim Jeans", 'clothing', 'Clothing', 'men', 'men', 'jeans-jeggings', 'Jeans & Denims',
    "Levi's", 2199, 3999, 36, 4.8, 320, 'daily_deal', true, true,
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&q=80'],
    'men, clothing, western-wear, jeans-jeggings, jeans, denim, levis, slim-fit',
    'Modern slim-fit jeans with room to move. Levi’s 511 features comfortable stretch denim, iconic arcuate back pockets, and clean indigo styling.',
    ['Comfort Stretch Denim (99% Cotton, 1% Elastane)', 'Classic 5-Pocket Styling', 'Mid Rise Waist', 'Zip Fly with Button Closure'],
    { 'Fabric': 'Stretch Denim', 'Fit': 'Slim Fit', 'Rise': 'Mid Rise', 'Closure': 'Zip Fly', 'Occasion': 'Casual' }),

  p('gmd-men-jeans-2', 'Wrangler Rugged Wear Regular Straight Leg Jeans', 'clothing', 'Clothing', 'men', 'men', 'jeans-jeggings', 'Jeans & Denims',
    'Wrangler', 1799, 3299, 28, 4.6, 214, 'flash_deal', false, false,
    'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80',
    ['https://images.unsplash.com/photo-1542272604-780c96856592?w=1000&q=80'],
    'men, clothing, western-wear, jeans-jeggings, jeans, denim, wrangler, straight-fit',
    'Durable heavyweight denim built for everyday comfort with extra room through the seat and thigh and classic straight leg opening.',
    ['100% Heavyweight Cotton Denim', 'Relaxed Straight Leg Fit', 'Reinforced Rivets at Stress Points', 'Deep Front Watch Pocket'],
    { 'Fabric': '100% Cotton Denim', 'Fit': 'Straight Fit', 'Rise': 'Mid Rise', 'Closure': 'Zip Fly', 'Occasion': 'Daily' }),

  p('gmd-men-jeans-3', 'Spykar Distressed Washed Tapered Denim Jeans', 'clothing', 'Clothing', 'men', 'men', 'jeans-jeggings', 'Jeans & Denims',
    'Spykar', 1599, 2999, 40, 4.5, 140, 'regular', false, true,
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80',
    ['https://images.unsplash.com/photo-1560243563-062bfc001d68?w=1000&q=80'],
    'men, clothing, western-wear, jeans-jeggings, jeans, distressed, tapered, spykar',
    'Contemporary tapered jeans with light whiskering, subtle knee distress, and power stretch for all-day streetwear flair.',
    ['Power Stretch Blended Denim', 'Subtle Whisker Fade Effect', 'Tapered Ankle Cut', 'Leather Brand Patch on Waistband'],
    { 'Fabric': 'Cotton Elastane Blend', 'Fit': 'Tapered Fit', 'Rise': 'Low Rise', 'Closure': 'Button Fly', 'Occasion': 'Streetwear' }),

  p('gmd-men-jeans-4', 'Pepe Jeans Clean Dark Indigo Slim Jeans', 'clothing', 'Clothing', 'men', 'men', 'jeans-jeggings', 'Jeans & Denims',
    'Pepe Jeans', 1999, 3699, 34, 4.7, 198, 'daily_deal', true, false,
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80',
    ['https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1000&q=80'],
    'men, clothing, western-wear, jeans-jeggings, jeans, dark-indigo, pepe-jeans',
    'Polished dark rinse indigo denim suitable for smart-casual dressing, crafted from soft stay-black dyed ring-spun cotton.',
    ['Dark Indigo Raw Rinse Wash', 'Soft Ring-Spun Cotton Weave', 'Slim Fit from Hip to Ankle', 'Clean Unfaded Finish'],
    { 'Fabric': 'Ring-Spun Denim', 'Fit': 'Slim Fit', 'Rise': 'Mid Rise', 'Closure': 'Zip Fly', 'Occasion': 'Smart Casual' })
);

// MEN TROUSERS & CHINOS (4 products)
products.push(
  p('gmd-men-trousers-1', 'Dockers Slim Tapered Stretch Khaki Chinos', 'clothing', 'Clothing', 'men', 'men', 'trousers-pants', 'Trousers & Chinos',
    'Dockers', 1699, 3299, 38, 4.7, 245, 'daily_deal', true, true,
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1000&q=80'],
    'men, clothing, western-wear, trousers-pants, chinos, dockers, khaki',
    'Versatile stretch twill chinos engineered with Smart 360 Flex 4-way stretch fabric and hidden security zip pockets.',
    ['4-Way Stretch Flex Twill', 'Flexible Comfort Waistband', 'Wrinkle-Free Treatment', 'Hidden Zip Pocket for Valuables'],
    { 'Fabric': 'Cotton Twill Stretch', 'Fit': 'Slim Tapered', 'Rise': 'Mid Rise', 'Closure': 'Button & Zip', 'Occasion': 'Work Casual' }),

  p('gmd-men-trousers-2', 'Blackberrys Flat Front Charcoal Grey Formal Trousers', 'clothing', 'Clothing', 'men', 'men', 'trousers-pants', 'Trousers & Chinos',
    'Blackberrys', 1499, 2799, 32, 4.6, 180, 'regular', false, false,
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&q=80'],
    'men, clothing, western-wear, trousers-pants, formal-trousers, blackberrys, office',
    'Impeccably tailored flat front executive trousers in fine charcoal grey poly-viscose with a crisp permanent crease.',
    ['Premium Poly-Viscose Fabric', 'Sharp Permanent Center Crease', 'Flat Front Modern Silhouette', 'Gripper Waistband Stays Tucked'],
    { 'Fabric': 'Poly-Viscose Blend', 'Fit': 'Slim Fit', 'Rise': 'Mid Rise', 'Closure': 'Hook & Bar', 'Occasion': 'Formal' }),

  p('gmd-men-trousers-3', 'Arrow Smart Executive Navy Formal Dress Pants', 'clothing', 'Clothing', 'men', 'men', 'trousers-pants', 'Trousers & Chinos',
    'Arrow', 1599, 2999, 40, 4.7, 195, 'flash_deal', true, false,
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80'],
    'men, clothing, western-wear, trousers-pants, dress-pants, navy, arrow',
    'Classic navy formal trousers featuring stain-repellent finish, French fly closure, and breathable year-round drape.',
    ['Stain Repellent Technology', 'French Fly Security Closure', 'Comfort Stretch Fabric', 'Twin Welt Back Pockets'],
    { 'Fabric': 'Polyester Viscose Stretch', 'Fit': 'Regular Fit', 'Rise': 'Mid Rise', 'Closure': 'French Fly', 'Occasion': 'Executive' }),

  p('gmd-men-trousers-4', 'Allen Solly Casual Slim Fit Olive Cotton Chino Trousers', 'clothing', 'Clothing', 'men', 'men', 'trousers-pants', 'Trousers & Chinos',
    'Allen Solly', 1399, 2499, 36, 4.5, 155, 'daily_deal', false, true,
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1000&q=80'],
    'men, clothing, western-wear, trousers-pants, chinos, olive, allen-solly',
    'Garment-dyed olive green chinos cut in pure breathable cotton with angled slash pockets and embroidered stag motif.',
    ['100% Breathable Combed Cotton', 'Garment Dyed Vintage Hue', 'Angled Front Slash Pockets', 'Slim Clean Hemline'],
    { 'Fabric': '100% Cotton Twill', 'Fit': 'Slim Fit', 'Rise': 'Low-to-Mid Rise', 'Closure': 'Zip Fly', 'Occasion': 'Casual' })
);

// MEN TRACK PANTS & JOGGERS (4 products)
products.push(
  p('gmd-men-trackpants-1', 'Puma Heather Grey Moisture-Wicking Jogger Track Pants', 'clothing', 'Clothing', 'men', 'men', 'track-pants', 'Track Pants & Joggers',
    'Puma', 1299, 2499, 44, 4.7, 220, 'daily_deal', true, true,
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1000&q=80'],
    'men, clothing, western-wear, track-pants, joggers, sweatpants, puma, gym',
    'Athletic jogger track pants in soft French terry fleece with elasticated ribbed ankle cuffs, side slip pockets, and drawstring waist.',
    ['French Terry Fleece Blend', 'Elasticated Ribbed Ankle Cuffs', 'Internal Drawcord Waistband', 'Puma Cat Logo Heat Transfer'],
    { 'Fabric': 'Cotton-Polyester Fleece', 'Fit': 'Tapered Jogger', 'Waist': 'Drawstring Elastic', 'Occasion': 'Sport & Lounge' }),

  p('gmd-men-trackpants-2', 'Adidas Tiro Essential Cuffed Athletic Sweatpants', 'clothing', 'Clothing', 'men', 'men', 'track-pants', 'Track Pants & Joggers',
    'Adidas', 1499, 2799, 36, 4.8, 265, 'flash_deal', true, false,
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&q=80',
    ['https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=1000&q=80'],
    'men, clothing, western-wear, track-pants, sweatpants, adidas, training',
    'Signature 3-Stripes athletic track pants with AEROREADY sweat absorption and ankle zips for effortless over-cleat removal.',
    ['AEROREADY Moisture Absorption', 'Side Zippered Pockets', 'Ankle Zips for Easy On/Off', 'Iconic Contrast 3-Stripes'],
    { 'Fabric': '100% Recycled Polyester', 'Fit': 'Slim Athletic', 'Waist': 'Elastic Drawcord', 'Occasion': 'Training' }),

  p('gmd-men-trackpants-3', 'Under Armour Fleece Sport Gym Track Pants', 'clothing', 'Clothing', 'men', 'men', 'track-pants', 'Track Pants & Joggers',
    'Under Armour', 1799, 3499, 28, 4.6, 142, 'regular', false, false,
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
    ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&q=80'],
    'men, clothing, western-wear, track-pants, fleece, under-armour, workout',
    'Ultra-soft Armour Fleece fabric delivers lightweight warmth and superior flexibility during cold-weather conditioning.',
    ['Armour Fleece Lightweight Warmth', 'Brushed Soft Interior Layer', 'Open Hand Pockets', 'Encased Elastic Waistband'],
    { 'Fabric': '100% Polyester Fleece', 'Fit': 'Regular Tapered', 'Waist': 'Elastic with Tie', 'Occasion': 'Gym & Outdoor' }),

  p('gmd-men-trackpants-4', 'Decathlon Domyos Breathable Cotton Training Joggers', 'clothing', 'Clothing', 'men', 'men', 'track-pants', 'Track Pants & Joggers',
    'Decathlon', 899, 1599, 50, 4.5, 188, 'daily_deal', false, true,
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80'],
    'men, clothing, western-wear, track-pants, joggers, decathlon, cotton',
    'Budget-friendly 100% French cotton training pants offering natural comfort, stretch freedom of movement, and deep side pockets.',
    ['Natural Breathable Cotton Rich', 'Reinforced Knee Construction', 'Deep Coin and Phone Pockets', 'Ribbed Leg Cuffs'],
    { 'Fabric': '95% Cotton, 5% Elastane', 'Fit': 'Regular Fit', 'Waist': 'Drawstring Elastic', 'Occasion': 'Daily Fitness' })
);

// MEN JACKETS & BLAZERS (4 products)
products.push(
  p('gmd-men-jackets-1', "Levi's Trucker Blue Denim Jacket with Metal Buttons", 'clothing', 'Clothing', 'men', 'men', 'jackets', 'Jackets & Blazers',
    "Levi's", 2999, 5499, 26, 4.9, 310, 'daily_deal', true, true,
    'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80',
    ['https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&q=80'],
    'men, clothing, western-wear, jackets, denim-jacket, trucker, levis',
    'The definitive denim jacket since 1967. Levi’s iconic Type III Trucker jacket features shank button closures and chest flap pockets.',
    ['100% Non-Stretch Cotton Denim', 'Signature Branded Metal Shank Buttons', 'Side Welt Pockets and Chest Flaps', 'Waist Adjusters on Rear Hem'],
    { 'Fabric': '100% Cotton Denim', 'Fit': 'Standard Fit', 'Length': 'Waist Length', 'Closure': 'Button Front', 'Occasion': 'Casual' }),

  p('gmd-men-jackets-2', 'Raymond Tailored Navy Blue Formal Single-Breasted Blazer', 'clothing', 'Clothing', 'men', 'men', 'jackets', 'Jackets & Blazers',
    'Raymond', 3999, 7999, 22, 4.8, 175, 'flash_deal', true, false,
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&q=80'],
    'men, clothing, western-wear, jackets, blazer, formal, raymond, navy',
    'Masterfully crafted notch lapel formal blazer in fine Italian-blend wool touch fabric with double vent back and satin inner lining.',
    ['Fine Wool-Touch Poly-Viscose Blend', 'Notch Lapel with Boutonniere Hole', 'Dual Rear Vents for Free Movement', 'Multiple Inner Pockets'],
    { 'Fabric': 'Wool Blend', 'Fit': 'Tailored Slim', 'Lapel': 'Notch Lapel', 'Closure': '2-Button', 'Occasion': 'Formal & Wedding' }),

  p('gmd-men-jackets-3', 'Zara Faux Suede Minimalist Biker Jacket', 'clothing', 'Clothing', 'men', 'men', 'jackets', 'Jackets & Blazers',
    'Zara', 3499, 5990, 20, 4.7, 132, 'regular', false, true,
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&q=80'],
    'men, clothing, western-wear, jackets, biker, faux-suede, zara, outerwear',
    'Contemporary biker jacket crafted in rich tactile faux suede featuring asymmetrical gunmetal zip hardware and snap-down lapels.',
    ['Plush Faux Suede Shell', 'Asymmetric Front Zip Closure', 'Zippered Sleeve Cuffs', 'Soft Quilted Internal Lining'],
    { 'Fabric': 'Synthetic Suede', 'Fit': 'Regular Fit', 'Collar': 'Biker Collar', 'Closure': 'Zip', 'Occasion': 'Evening & Club' }),

  p('gmd-men-jackets-4', 'Woodland Full-Zip Outdoor Windbreaker Bomber Jacket', 'clothing', 'Clothing', 'men', 'men', 'jackets', 'Jackets & Blazers',
    'Woodland', 2499, 4795, 30, 4.6, 198, 'daily_deal', false, false,
    'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80',
    ['https://images.unsplash.com/photo-1548883354-7622d03aca27?w=1000&q=80'],
    'men, clothing, western-wear, jackets, bomber, windbreaker, woodland',
    'Rugged weather-resistant outdoor bomber jacket equipped with thermal microfleece lining, storm flap zipper, and ribbed hem.',
    ['Water & Wind Resistant Outer Nylon', 'Microfleece Warmth Lining', 'Heavy Duty Ribbed Collar & Cuffs', 'Secure Inner Phone Pocket'],
    { 'Fabric': 'Ripstop Nylon', 'Fit': 'Bomber Fit', 'Length': 'Hip Length', 'Closure': 'Full Zip', 'Occasion': 'Outdoor & Travel' })
);

// MEN KURTAS & ETHNIC (4 products)
products.push(
  p('gmd-men-kurtas-1', 'Manyavar Embroidered Silk Blend Festive Kurta Set', 'clothing', 'Clothing', 'men', 'men', 'kurtas', 'Kurtas & Ethnic',
    'Manyavar', 2499, 4999, 32, 4.8, 240, 'daily_deal', true, true,
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80',
    ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1000&q=80'],
    'men, clothing, ethnic-wear, kurtas, festive, manyavar, kurta-set',
    'Regal royal blue silk blend festive kurta set adorned with delicate thread embroidery along the mandarin collar and matching churidar.',
    ['Lustrous Silk Blend Fabric', 'Thread Embroidery on Placket', 'Includes Matching Cotton Churidar', 'Mandarin Band Collar'],
    { 'Fabric': 'Art Silk Blend', 'Fit': 'Regular Fit', 'Length': 'Knee Length', 'Collar': 'Mandarin', 'Occasion': 'Diwali & Wedding' }),

  p('gmd-men-kurtas-2', 'Fabindia Short Pure Cotton Mandarin Collar Kurta', 'clothing', 'Clothing', 'men', 'men', 'kurtas', 'Kurtas & Ethnic',
    'Fabindia', 1199, 1999, 45, 4.7, 185, 'flash_deal', false, false,
    'https://images.unsplash.com/photo-1590076241940-02a8b29e64e5?w=800&q=80',
    ['https://images.unsplash.com/photo-1590076241940-02a8b29e64e5?w=1000&q=80'],
    'men, clothing, ethnic-wear, kurtas, short-kurta, fabindia, cotton',
    'Handwoven pure breathable cotton short kurta tailored for pairing effortlessly with denims or chinos for relaxed casual ethnic style.',
    ['100% Handwoven Breathable Cotton', 'Hip Length Short Kurta Silhouette', 'Wooden Button Front Placket', 'Side Vents for Free Movement'],
    { 'Fabric': '100% Cotton', 'Fit': 'Regular Fit', 'Length': 'Hip Length', 'Collar': 'Mandarin', 'Occasion': 'Casual Ethnic' }),

  p('gmd-men-kurtas-3', 'Sojanya Traditional Straight Jacquard Kurta Pyjama', 'clothing', 'Clothing', 'men', 'men', 'kurtas', 'Kurtas & Ethnic',
    'Sojanya', 1499, 2999, 36, 4.6, 130, 'daily_deal', true, false,
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
    ['https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1000&q=80'],
    'men, clothing, ethnic-wear, kurtas, jacquard, sojanya, puja',
    'Rich self-design jacquard weave ethnic straight kurta complete with drawstring white cotton pyjama for pujas and family festivities.',
    ['Subtle Jacquard Floral Self-Weave', 'Soft Inner Skin-Friendly Weft', 'Full Length White Cotton Pyjama Included', 'Deep Side Seam Pockets'],
    { 'Fabric': 'Jacquard Cotton Blend', 'Fit': 'Straight Fit', 'Length': 'Knee Length', 'Collar': 'Band Collar', 'Occasion': 'Festival & Puja' }),

  p('gmd-men-kurtas-4', 'House of Pataudi Lucknowi Chikankari Casual Kurta', 'clothing', 'Clothing', 'men', 'men', 'kurtas', 'Kurtas & Ethnic',
    'House of Pataudi', 1899, 3599, 28, 4.8, 210, 'regular', false, true,
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&q=80'],
    'men, clothing, ethnic-wear, kurtas, chikankari, house-of-pataudi',
    'Exquisite handcrafted Lucknowi Chikankari needlework embroidered over airy pastel mulmul cotton in a refined nawabi aesthetic.',
    ['Handcrafted Lucknowi Chikankari Work', 'Pure Fine Mulmul Cotton', 'Classic Nawabi Buttoned Placket', 'Lightweight and Breathable'],
    { 'Fabric': 'Pure Mulmul Cotton', 'Fit': 'Comfort Fit', 'Length': 'Knee Length', 'Collar': 'Mandarin', 'Occasion': 'Celebration' })
);

console.log(`Generated ${products.length} products so far.`);
