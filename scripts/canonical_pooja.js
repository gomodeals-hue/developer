const fs = require('fs');
const path = require('path');

const productsPath = path.resolve('backend/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log('Original product count:', products.length);

/**
 * 100% Canonical Taxonomy:
 * Subcategory -> { category, category_name, section, gender, brands, titles, images, priceRange, tags }
 */
const CANONICAL_CATALOG = {
  // ==========================================
  // 1. POOJA ITEMS
  // ==========================================
  'diyas-lamps': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Borosil', 'Shubhkart', 'Collectible India', 'eCraftIndia'],
    titles: [
      'Traditional Brass Kuthu Vilakku Oil Lamp 12 Inch',
      'Akhand Brass Oval Diya with Borosilicate Heat Resistant Glass Chimney',
      'Peacock Handcrafted Brass Samai Temple Diya',
      'Panchmukhi Five-Face Brass Aarti Deepam',
      'Royal Heritage Brass Hanging Bell Diya'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80',
      'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800&q=80'
    ],
    priceRange: [499, 2999],
    tags: ['diya', 'lamp', 'brass diya', 'kuthu vilakku', 'oil lamp', 'deepam', 'pooja lamp', 'pooja']
  },
  'silver-diyas': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart', 'eCraftIndia'],
    titles: [
      'Pure Silver Plated Floral Embossed Aarti Diya',
      'German Silver Handcrafted Deepam Diya Set of 2',
      'Antique Finish Silver Plated Lotus Temple Diya'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [599, 1899],
    tags: ['silver diya', 'diya', 'deepam', 'pooja lamp', 'pooja items']
  },
  'ghee-lamps': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Cycle Pure', 'Shubhkart', 'Divine Brass Arts'],
    titles: [
      'Pure Cow Ghee Diya Battis Pack of 50 Wicks',
      'Pre-Filled Cow Ghee Daily Puja Deepam Box',
      'Organic Camphor Ghee Wicks for Temple Aarti'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [249, 699],
    tags: ['ghee diya', 'ghee lamp', 'pooja wicks', 'batti', 'pooja']
  },
  'diya-sets': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Divine Brass Arts', 'Borosil'],
    titles: [
      'Traditional Brass Akhand Diya & Aarti Stand Combo Set',
      'Festival Brass Step Diya Tower Set of 2',
      'Handcrafted Brass Lotus Diya Pair for Home Temple'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [799, 2499],
    tags: ['diya set', 'diya pair', 'brass diyas', 'pooja items']
  },
  'decorative-diyas': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Collectible India', 'eCraftIndia'],
    titles: [
      'Handcrafted Urli Bowl with Floating Brass Diyas',
      'Floral Carved Brass Hanging Diya with Chain',
      'Peacock Engraved Auspicious Brass Aarti Diya'
    ],
    images: [
      'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800&q=80'
    ],
    priceRange: [699, 2999],
    tags: ['decorative diya', 'urli diya', 'hanging diya', 'pooja decor']
  },
  'idols-statues': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Crafts', 'eCraftIndia', 'CraftVatika'],
    titles: [
      'Handcrafted Brass Lord Ganesha Idol for Pooja Mandir',
      'Pure Brass Radha Krishna Standing Murti 8 Inch',
      'Brass Shiva Nataraja Cosmic Dance Idol Statue',
      'Lakshmi Ganesha Brass Murti Set for Diwali Puja',
      'Meditating Buddha Brass Idol for Peace & Altar'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [799, 4999],
    tags: ['idol', 'statue', 'ganesha', 'krishna', 'shiva', 'buddha', 'murti', 'brass idol', 'pooja']
  },
  'brass-idols': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Crafts'],
    titles: [
      'Heavy Cast Solid Brass Lord Murugan Idol',
      'Antique Finish Pure Brass Saraswati Idol',
      'Solid Brass Vishnu Idol with Sheshnag Canopy'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [999, 5499],
    tags: ['brass idol', 'murti', 'statue', 'pooja murti', 'god idol']
  },
  'krishna-idols': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Crafts', 'eCraftIndia'],
    titles: [
      'Brass Laddu Gopal Krishna Idol with Flute & Cow',
      'Handcrafted Brass Radha Krishna Murti Pair 9 Inch'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [899, 3999],
    tags: ['krishna idol', 'laddu gopal', 'radha krishna', 'pooja idol']
  },
  'shiva-idols': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Crafts'],
    titles: [
      'Brass Shiva Nataraja Statue 8 Inch',
      'Meditating Lord Shiva Brass Murti for Home Temple'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [999, 4499],
    tags: ['shiva idol', 'nataraja', 'shiva murti', 'pooja']
  },
  'durga-idols': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Crafts'],
    titles: [
      'Brass Goddess Durga Sherawali Lion Riding Idol 8 Inch',
      'Ashtabhuja Durga Mata Brass Statue for Navratri Puja'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [1199, 4999],
    tags: ['durga idol', 'navratri', 'durga mata', 'sherawali', 'pooja idol']
  },
  'murugan-idols': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Collectible India'],
    titles: [
      'Pure Brass Lord Murugan Kartikeya with Vel Statue',
      'Traditional South Indian Lord Murugan Temple Idol'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [999, 4299],
    tags: ['murugan idol', 'kartikeya', 'vel', 'pooja idol']
  },
  'saraswati-idols': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Crafts'],
    titles: [
      'Brass Goddess Saraswati with Veena Idol for Study Altar',
      'Handcrafted Saraswati Devi Murti 7 Inch'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [899, 3499],
    tags: ['saraswati idol', 'veena', 'vidya', 'goddess', 'pooja']
  },
  'vishnu-idols': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Crafts'],
    titles: [
      'Brass Lord Vishnu Idol with Shankh & Chakra',
      'Narayan & Lakshmi Brass Murti Set'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [1099, 4599],
    tags: ['vishnu idol', 'narayan', 'shankh chakra', 'pooja']
  },
  'buddha-statues': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['eCraftIndia', 'Collectible India'],
    titles: [
      'Brass Meditating Dhyana Mudra Buddha Statue 8 Inch',
      'Peaceful Blessing Buddha Idol with Antique Patina'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [799, 3299],
    tags: ['buddha statue', 'buddha idol', 'meditation', 'zen decor']
  },
  'pooja-plates': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Cycle Pure', 'Divine Brass Arts'],
    titles: [
      'Darshana Embossed Brass Pooja Thali Set with Bell & Diya',
      'Pure Brass Gayatri Mantra Engraved Aarti Thali 9 Inch',
      'Handcrafted Floral Engraved Puja Plate with Sindoor Bowl'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [599, 2199],
    tags: ['pooja plate', 'puja thali', 'aarti thali', 'brass thali', 'pooja']
  },
  'pooja-bowls': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Divine Brass Arts'],
    titles: [
      'Pure Brass Panchpatra with Achmani Spoon Set for Puja',
      'Brass Chandan Katori Puja Bowl Set of 3',
      'Engraved Brass Abhishekam Offering Bowl'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [349, 1199],
    tags: ['pooja bowl', 'panchpatra', 'achmani', 'katori', 'pooja']
  },
  'aarti-plates': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Divine Brass Arts'],
    titles: [
      'Panch Aarti Five-Flame Brass Aarti Plate with Handle',
      'Pure Brass Swastik Aarti Plate with Bell & Kapoor Burner'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [499, 1699],
    tags: ['aarti plate', 'aarti thali', 'panch aarti', 'brass aarti']
  },
  'camphor-holders': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Divine Brass Arts'],
    titles: [
      'Pure Brass Kapoor Dani Aarti Burner with Wooden Handle',
      'Panch Aarti Stand with Camphor Holder and Bell'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [299, 899],
    tags: ['camphor holder', 'kapoor dani', 'aarti burner', 'pooja']
  },
  'aarti-stands': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Divine Brass Arts'],
    titles: [
      'Heavy Solid Brass 5-Flame Aarti Diya Stand with Handle',
      'Karpur Aarti Burner Brass Handheld Stand'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [399, 1299],
    tags: ['aarti stand', 'aarti diya', 'kapoor burner', 'brass aarti']
  },
  'dhoop-cones': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Cycle Pure', 'Phool', 'Nirmalaya'],
    titles: [
      'Heritage Organic Sandalwood & Rose Dhoop Cones 100 Cones',
      'Natural Temple Flower Charcoal-Free Purifying Dhoop Cones Box'
    ],
    images: [
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80'
    ],
    priceRange: [199, 599],
    tags: ['dhoop cones', 'dhoop', 'cones', 'incense', 'pooja fragrance']
  },
  'sambrani': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Phool', 'Cycle Pure', 'Shubhkart'],
    titles: [
      'Pure Cow Dung Loban Sambrani Cups with Guggul Pack of 24',
      'Heritage Herbal Benzoin Sambrani Cups for Temple Aroma'
    ],
    images: [
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80'
    ],
    priceRange: [249, 699],
    tags: ['sambrani', 'loban', 'havan cups', 'guggul', 'pooja']
  },
  'havan-cups': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Phool', 'Nirmalaya', 'Vedikroots'],
    titles: [
      'Organic Ayurvedic Panchgavya Havan Cups with Pure Guggal Pack of 30',
      'Natural Temple Flower Sambrani Havan Cups with Clay Stand'
    ],
    images: [
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80'
    ],
    priceRange: [299, 799],
    tags: ['havan cups', 'sambrani', 'loban', 'pooja samagri', 'pooja']
  },
  'pooja-samagri-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedikroots', 'Shubhkart', 'Cycle Pure'],
    titles: [
      'Complete Daily Mandir Pooja Samagri Kit 32 Sacred Essentials Box',
      'Diwali Maha Lakshmi & Ganesha Puja Samagri Gift Box',
      'Navratri Durga Puja Comprehensive Samagri Box'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [499, 1899],
    tags: ['pooja kit', 'samagri', 'pooja samagri', 'diwali kit', 'navratri kit', 'pooja items']
  },
  'navagraha-samagri': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedikroots', 'Shubhkart'],
    titles: [
      'Complete Navagraha Shanti Puja Samagri Kit with 9 Cloths & Grains',
      'Navagraha Havan Samagri Herbs Pack for Temple Rituals'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [399, 1299],
    tags: ['navagraha', 'samagri', 'havan samagri', 'pooja herbs']
  },
  'sacred-thread': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Cycle Pure', 'Shubhkart'],
    titles: [
      'Pure Cotton Raksha Sutra Mauli Kalawa Sacred Thread Rolls Pack of 5',
      'Vedic Pure Cotton Janeu Yagnopavit Thread Set of 6'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [149, 399],
    tags: ['sacred thread', 'mauli', 'kalawa', 'janeu', 'pooja thread']
  },
  'betel-nuts': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedikroots', 'Shubhkart'],
    titles: [
      'Pure Organic Whole Supari Betel Nuts for Puja 250g',
      'Vedic Puja Supari Betel Nuts Pack of 21'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [149, 399],
    tags: ['betel nuts', 'supari', 'pooja samagri', 'puja supari']
  },
  'betel-leaves': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Gold Plated Brass Decorative Paan Betel Leaf for Altar',
      'Embossed Brass Paan Leaf Offering Plate for Puja'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [299, 799],
    tags: ['betel leaves', 'paan leaf', 'brass paan', 'pooja decor']
  },
  'pooja-dry-fruits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Happilo', 'True Elements', 'Vedikroots'],
    titles: [
      'Panchamrit Sacred 5 Dry Fruits Offering Pack for Puja 300g',
      'Pure Almonds, Cashews, Raisins & Mishri Bhog Combo Box'
    ],
    images: [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80'
    ],
    priceRange: [299, 899],
    tags: ['pooja dry fruits', 'panchamrit', 'bhog', 'prasad', 'dry fruits']
  },
  'sindoor-boxes': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Brass Arts'],
    titles: [
      'Handcrafted Brass Peacock Sindoor Kumkum Box with Lid',
      'Meenakari Enamel Brass Sindoor Dani for Puja'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [299, 899],
    tags: ['sindoor box', 'kumkum box', 'sindoor dani', 'brass box', 'pooja']
  },
  'haldi-containers': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Brass Arts'],
    titles: [
      'Brass Haldi Kumkum Double Katori with Peacock Handle',
      'Traditional Brass Turmeric & Roli Container Set'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [299, 799],
    tags: ['haldi container', 'haldi kumkum', 'katori', 'brass katori']
  },
  'kumkum-containers': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Brass Arts'],
    titles: [
      'Peacock Engraved Brass Kumkum Box with Tight Lid',
      'Pure Brass Swastik Roli Chawal Container'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [249, 749],
    tags: ['kumkum container', 'roli box', 'kumkum dani', 'pooja items']
  },
  'pooja-tongs': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Brass Aarti Diya Chimta Tongs for Camphor & Charcoal',
      'Stainless Steel Diya Batti Handling Tongs'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [149, 449],
    tags: ['pooja tongs', 'chimta', 'diya tongs', 'pooja tools']
  },
  'pooja-cloth': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Kuber Industries', 'Divine Brass Arts'],
    titles: [
      'Red Velvet Embroidered Golden Lace Puja Chowki Aasan Cloth',
      'Yellow Silk Mandir Altar Backdrop Fabric 1x1 Meter'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [199, 699],
    tags: ['pooja cloth', 'aasan cloth', 'chowki aasan', 'mandir cloth', 'velvet aasan']
  },
  'pooja-asanas': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Kuber Industries', 'Saral Home'],
    titles: [
      'Kusha Grass Vedic Meditation & Puja Asana Mat',
      'Embroidered Velvet Cushion Mandir Puja Sitting Asan'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [249, 799],
    tags: ['pooja asan', 'puja asana', 'kusha grass mat', 'meditation mat']
  },
  'flower-garlands': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['CraftVatika', 'eCraftIndia'],
    titles: [
      'Artificial Marigold Floral Mala Garland for Mandir 5ft Pack of 5',
      'Handmade Scented Jasmine & Rose Garland for Deities'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [299, 899],
    tags: ['garland', 'flower garland', 'mala', 'marigold garland', 'mandir decor']
  },
  'artificial-flowers': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['CraftVatika', 'eCraftIndia'],
    titles: [
      'Velvet Lotus Flowers with Stems for Puja Altar Pack of 6',
      'Bright Yellow Marigold Toran Garland Door Hanging'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [249, 799],
    tags: ['artificial flowers', 'lotus', 'marigold', 'pooja flowers', 'toran']
  },
  'rangoli-items': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['CraftVatika', 'Shubhkart'],
    titles: [
      'Vibrant Herbal Rangoli Color Powders Set of 10 with Stencils',
      'Acrylic Pre-Made Floating Rangoli Design with Stones & Beads'
    ],
    images: [
      'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800&q=80'
    ],
    priceRange: [249, 799],
    tags: ['rangoli', 'rangoli colors', 'rangoli stencil', 'diwali rangoli']
  },
  'mandir-decorations': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['CraftVatika', 'Divine Brass Arts'],
    titles: [
      'Brass Hanging Om & Swastik Windchime Bells for Mandir',
      'Handcrafted Shubh Labh Brass Door Hanging Wall Art Pair'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [399, 1499],
    tags: ['mandir decor', 'pooja decor', 'shubh labh', 'hanging bells']
  },
  'pooja-backdrops': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Kuber Industries', 'CraftVatika'],
    titles: [
      'Traditional Pichwai Cow & Lotus Printed Mandir Backdrop Curtain 7x4ft',
      'Golden Zari Brocade Festive Altar Background Cloth'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [399, 1299],
    tags: ['pooja backdrop', 'pichwai', 'mandir curtain', 'altar backdrop']
  },
  'wooden-pooja-mandirs': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['CraftVatika', 'SAF', 'Urban Ladder'],
    titles: [
      'Teak Finish Handcrafted Wooden Mandir with Drawers & Dome 24 Inch',
      'Solid Sheesham Wood Home Temple with Brass Bells & Storage'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [2499, 9999],
    tags: ['wooden mandir', 'home temple', 'pooja mandir', 'temple with drawer']
  },
  'wall-mounted-mandirs': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['SAF', 'CraftVatika'],
    titles: [
      'Wall Hanging Engineered Wood Mandir with LED Light & Bell Cutout',
      'Compact Wall Mounted Wooden Home Altar Temple'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [1499, 5499],
    tags: ['wall mandir', 'hanging mandir', 'home temple', 'pooja temple']
  },
  'tabletop-mandirs': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['CraftVatika', 'SAF'],
    titles: [
      'Compact Solid Teak Tabletop Home Mandir with Diya Tray',
      'Artisan Carved White Marble Finish Tabletop Altar Temple'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [1299, 4999],
    tags: ['tabletop mandir', 'pooja mandir', 'home temple', 'altar temple']
  },
  'mandir-shelves': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['SAF', 'CraftVatika'],
    titles: [
      'Floating Wall Bracket Shelf for Deity Idols with Brass Hooks',
      'Carved Solid Wood Mandir Corner Floating Shelf'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [499, 1499],
    tags: ['mandir shelf', 'pooja shelf', 'floating temple shelf']
  },
  'mandir-curtains': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Kuber Industries', 'Cortina'],
    titles: [
      'Embroidered Velvet Mandir Parda Door Curtain with Golden Fringe',
      'Net Lace Pooja Altar Curtain with Peacock Motifs Pair'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [299, 899],
    tags: ['mandir curtain', 'mandir parda', 'pooja curtain', 'altar drape']
  },
  'mandir-doors': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['SAF', 'CraftVatika'],
    titles: [
      'Jali Cutout Lattice Wooden Shutter Doors for Home Temple',
      'Brass Bell Embedded Wooden Mandir Door Pair'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [999, 3499],
    tags: ['mandir doors', 'temple doors', 'jali door', 'mandir shutters']
  },
  'rudraksha-mala': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedic Vaani', 'Shubhkart'],
    titles: [
      'Original 5-Mukhi Certified Nepali Rudraksha Japa Mala 108+1 Beads',
      'Silver Capped 5 Mukhi Rudraksha Rosary Mala with Red Tassel'
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    priceRange: [399, 1999],
    tags: ['rudraksha mala', 'jap mala', 'japa mala', 'rudraksha rosary', 'pooja']
  },
  'jap-mala': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Vedic Vaani'],
    titles: [
      'Pure Tulsi Holy Basil Wood 108 Beads Japa Mala with Gomukhi Bag',
      'Red Sandalwood Lal Chandan Rosary Beads Mala for Chanting'
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    priceRange: [299, 999],
    tags: ['jap mala', 'tulsi mala', 'chandan mala', 'chanting beads', 'pooja']
  },
  'spiritual-bracelets': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedic Vaani', 'GIVA', 'Shubhkart'],
    titles: [
      'Natural 5 Mukhi Rudraksha Stretch Bracelet with Silver Om Bead',
      'Black Tourmaline & Lava Stone Protection Energy Bracelet'
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    priceRange: [299, 1199],
    tags: ['spiritual bracelet', 'rudraksha bracelet', 'om bracelet', 'healing bracelet']
  },
  'meditation-beads': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedic Vaani', 'Soulflower'],
    titles: [
      'Natural Sandalwood Fragrant Buddhist Tibetan Meditation Mala',
      'Amethyst Healing Crystal 108 Mala Beads for Mindfulness'
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    priceRange: [399, 1499],
    tags: ['meditation beads', 'mala', 'prayer beads', 'mindfulness']
  },
  'mantra-books': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Gita Press', 'Vedikroots'],
    titles: [
      'Sacred Vedic Mantras & Stotram Hardbound Hindi & Sanskrit Edition',
      'Sri Suktam & Purusha Suktam Sacred Chants Guidebook'
    ],
    images: [
      'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80'
    ],
    priceRange: [149, 499],
    tags: ['mantra book', 'stotram', 'vedic mantras', 'pooja book']
  },
  'chalisa-books': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Gita Press', 'Vedikroots'],
    titles: [
      'Shri Hanuman Chalisa & Sundarkand Sacred Illustrated Edition',
      'Shiv Chalisa & Durga Chalisa Hardcover Pocket Book'
    ],
    images: [
      'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80'
    ],
    priceRange: [99, 399],
    tags: ['chalisa', 'hanuman chalisa', 'sundarkand', 'pooja book']
  },
  'religious-calendars': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Kalnirnay', 'Gita Press'],
    titles: [
      'Auspicious Hindu Vrat & Festival Wall Calendar with Tithis',
      'Laminated Deity Gold Foil Altar Desk Calendar'
    ],
    images: [
      'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80'
    ],
    priceRange: [99, 299],
    tags: ['calendar', 'hindu calendar', 'vrat calendar', 'panchang']
  },
  'panchang': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Kalnirnay', 'Vedic Astrology Press'],
    titles: [
      'Authentic Vedic Hindu Panchangam Almanac with Muhurat Guide',
      'Shubh Muhurat & Planetary Transit Annual Panchang Book'
    ],
    images: [
      'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80'
    ],
    priceRange: [149, 399],
    tags: ['panchang', 'panchangam', 'muhurat', 'almanac', 'vedic astrology']
  },
  'yagna-accessories': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Copper Havan Kund with Spoon & Stand for Yagna Rituals 9x9 Inch',
      'Pure Brass Sruk & Sruva Wooden Yagna Ghee Ladle Pair'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [499, 1999],
    tags: ['yagna', 'havan kund', 'copper kund', 'yagna accessories', 'pooja']
  },
  'diwali-pooja-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Vedikroots', 'Cycle Pure'],
    titles: [
      'Maha Lakshmi & Ganesha Diwali Puja Box with Diyas & Coins',
      'Complete Deepavali 21-Item Sacred Ritual Samagri Box'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [599, 2499],
    tags: ['diwali kit', 'diwali pooja', 'lakshmi pooja', 'deepavali kit']
  },
  'ganesh-chaturthi-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Shubhkart', 'Vedikroots'],
    titles: [
      'Eco-Friendly Clay Ganesha Idol & Sthapana Puja Samagri Kit',
      'Ganesh Utsav Modak Mould & Aarti Rituals Combo Box'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [699, 2799],
    tags: ['ganesh chaturthi', 'ganesh kit', 'ganpati pooja', 'clay ganesh']
  },
  'navratri-pooja-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedikroots', 'Shubhkart'],
    titles: [
      'Navratri 9 Days Akhand Jyot & Durga Saptashati Puja Box',
      'Kanya Puja Gift Box with Mata Chunri & Samagri'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [599, 2199],
    tags: ['navratri kit', 'durga pooja', 'akhand jyot', 'navratri']
  },
  'satyanarayan-pooja-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Vedikroots', 'Shubhkart'],
    titles: [
      'Shri Satyanarayan Vrat Katha Book & Complete Puja Samagri Box',
      'Lord Vishnu Puja Yantra & Prasad Ingredients Kit'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [499, 1799],
    tags: ['satyanarayan kit', 'satyanarayan katha', 'vishnu puja', 'vrat kit']
  },
  'pongal-pooja-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Traditional Brass Pongal Paanai Pot with Turmeric Plant Decors',
      'Makar Sankranti & Pongal Surya Puja Samagri Combo'
    ],
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80'
    ],
    priceRange: [699, 2499],
    tags: ['pongal kit', 'pongal pot', 'sankranti', 'surya puja']
  },
  'janmashtami-pooja-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Crafts', 'Shubhkart'],
    titles: [
      'Bal Gopal Brass Jhula Swing with Poshak & Flute for Janmashtami',
      'Laddu Gopal Abhishekam Shankh & Shringar Set'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [599, 2299],
    tags: ['janmashtami', 'laddu gopal', 'jhula', 'krishna shringar']
  },
  'shivratri-pooja-kits': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Maha Shivratri Brass Shivling Abhishekam Stand with Jaladhari',
      'Bel Patra, Bhasma & Rudraksha Sacred Shiva Puja Kit'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [599, 2199],
    tags: ['shivratri kit', 'shivling', 'abhishekam', 'shiva puja']
  },
  'brass-pooja-sets': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Complete 11-Piece Pure Brass Mandir Puja Set with Bell, Diya & Kalash',
      'Heritage Solid Brass Temple Altar Accessories Set'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [1499, 4999],
    tags: ['brass pooja set', 'pooja set', 'mandir set', 'brass bell kalash']
  },
  'pooja-boxes': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Collectible India', 'Divine Brass Arts'],
    titles: [
      'Embossed Brass Roli Chawal Multi-Compartment Puja Box',
      'Velvet Lined Wooden Spiritual Storage Box with Brass Inlay'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [499, 1699],
    tags: ['pooja box', 'puja box', 'roli box', 'brass container']
  },
  'samagri-storage-containers': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Pure Brass Air-Tight Dhoop & Loban Storage Caddy with Lid',
      'Etched Floral Brass Samagri Jars Set of 3'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [599, 1799],
    tags: ['storage container', 'samagri container', 'brass jar', 'pooja storage']
  },
  'pooja-organizers': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Kuber Industries'],
    titles: [
      '2-Tier Brass Mandir Accessory Countertop Organizer Rack',
      'Velvet 6-Compartment Puja Samagri Drawer Organizer Box'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [499, 1499],
    tags: ['pooja organizer', 'mandir rack', 'samagri organizer']
  },
  'pooja-storage-sets': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Pure Brass 5-Piece Puja Herb & Oil Storage Jar Set on Brass Tray',
      'Traditional Meenakari Camphor & Chandan Storage Jar Duo'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [799, 2499],
    tags: ['pooja storage set', 'brass jar set', 'pooja items']
  },
  'thalis': {
    category: 'pooja-items',
    category_name: 'Pooja Items',
    section: 'home',
    gender: 'unisex',
    brands: ['Divine Brass Arts', 'Shubhkart'],
    titles: [
      'Heavy Solid Brass 12 Inch Aarti Puja Thali with Swastik Carving',
      'Embossed Brass Royal Temple Aarti Thali'
    ],
    images: [
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80'
    ],
    priceRange: [699, 2499],
    tags: ['thali', 'puja thali', 'aarti thali', 'brass thali']
  }
};

console.log('Total specific subcategory handlers defined in CANONICAL_CATALOG:', Object.keys(CANONICAL_CATALOG).length);
