import { SAMPLE_PRODUCTS } from '../data/sampleProducts.js';

/**
 * High-precision category taxonomy and keyword maps
 */
export const CATEGORY_DEFINITIONS = [
  {
    slug: 'clothing',
    label: 'Clothing & Apparel',
    aliases: ['clothing', 'apparel', 'fashion', 'western-wear', 'westernwear', 'clothes'],
    keywords: [
      'shirt', 'shirts', 't-shirt', 't-shirts', 'tshirt', 'tshirts', 'polo', 'polos',
      'jeans', 'denim', 'denims', 'pant', 'pants', 'trouser', 'trousers', 'chinos',
      'jogger', 'joggers', 'track pant', 'track pants', 'sweatpants', 'cargo',
      'jacket', 'jackets', 'blazer', 'blazers', 'coat', 'hoodie', 'hoodies', 'sweater',
      'dress', 'dresses', 'gown', 'gowns', 'frock', 'frocks', 'top', 'tops', 'blouse',
      'skirt', 'skirts', 'kurta', 'kurtas', 'kurti', 'kurtis', 'lehenga', 'saree', 'sarees',
      'co-ord', 'coord', 'co-ords', 'suit', 'suits', 'ethnic set', 'ethnic wear', 'apparel'
    ],
    subcategories: {
      'shirts': ['shirt', 'formal shirt', 'casual shirt', 'linen shirt', 'checked shirt', 'cotton shirt'],
      't-shirts': ['t-shirt', 'tshirt', 'tee', 'polo', 'graphic tee'],
      'jeans-jeggings': ['jeans', 'jeggings', 'denim', 'skinny jeans'],
      'trousers-pants': ['trouser', 'trousers', 'chinos', 'formal pants'],
      'track-pants': ['track pant', 'track pants', 'jogger', 'joggers'],
      'jackets': ['jacket', 'blazer', 'coat', 'outerwear', 'hoodie'],
      'dresses': ['dress', 'gown', 'maxi', 'midi', 'bodycon'],
      'tops': ['top', 'blouse', 'crop top', 'tunic'],
      'co-ord-sets': ['co-ord', 'coord', 'matching set', 'two piece'],
      'kurtas': ['kurta', 'kurti', 'anarkali']
    }
  },
  {
    slug: 'footwear',
    label: 'Footwear',
    aliases: ['footwear', 'footwears', 'shoes', 'shoe'],
    keywords: [
      'shoe', 'shoes', 'sneaker', 'sneakers', 'sandal', 'sandals', 'boot', 'boots',
      'slipper', 'slippers', 'footwear', 'heel', 'heels', 'flat', 'flats', 'wedge', 'wedges',
      'floater', 'floaters', 'loafer', 'loafers', 'clog', 'clogs', 'flip flop', 'flip-flops',
      'running shoe', 'casual shoe', 'formal shoe', 'sports shoe', 'leather shoe', 'mule', 'mules'
    ],
    subcategories: {
      'casual-shoes': ['casual shoe', 'casual shoes', 'sneaker', 'sneakers', 'trainer', 'trainers'],
      'formal-shoes': ['formal shoe', 'formal shoes', 'derby', 'oxford', 'brogue', 'leather shoe'],
      'sandals': ['sandal', 'sandals', 'floater', 'floaters'],
      'heels': ['heel', 'heels', 'stiletto', 'pumps', 'wedges'],
      'flats': ['flat', 'flats', 'ballerina', 'slippers', 'flip flop', 'slides']
    }
  },
  {
    slug: 'pet-accessories',
    label: 'Pet Accessories',
    aliases: ['pet-accessories', 'pet', 'pets', 'pet-supplies', 'pet accessories'],
    keywords: [
      'pet', 'pets', 'dog', 'dogs', 'cat', 'cats', 'puppy', 'puppies', 'kitten', 'kittens',
      'pedigree', 'royal canin', 'whiskas', 'drools', 'meat up', 'purepet',
      'dog food', 'cat food', 'pet food', 'dog treat', 'dog treats', 'treats', 'kibble',
      'collar', 'collars', 'leash', 'leashes', 'harness', 'pet toy', 'dog toy', 'cat toy',
      'chew toy', 'dog bed', 'pet bed', 'pet bowl', 'shampoo dog', 'pet grooming', 'scratching post'
    ],
    subcategories: {
      'dog-food': ['dog food', 'puppy food', 'dry food', 'wet food', 'pedigree', 'royal canin'],
      'dog-treats': ['treat', 'treats', 'dog treat', 'biscuits dog', 'chew stick', 'dental treat'],
      'collars-leashes': ['collar', 'leash', 'harness', 'lead', 'choke collar'],
      'dog-toys': ['toy', 'toys', 'chew toy', 'squeaky toy', 'rope toy', 'ball dog'],
      'dog-beds': ['bed', 'beds', 'cushion dog', 'mat pet', 'mattress pet']
    }
  },
  {
    slug: 'gadgets',
    label: 'Gadgets & Electronics',
    aliases: ['gadgets', 'electronics', 'gadget', 'electronic', 'audio'],
    keywords: [
      'electronic', 'electronics', 'gadget', 'gadgets', 'tech',
      'headphone', 'headphones', 'earphone', 'earphones', 'earbud', 'earbuds', 'airpods',
      'neckband', 'boat', 'noise', 'fire-boltt', 'sony', 'jbl', 'boult', 'oneplus',
      'smartwatch', 'smart watch', 'fitness tracker', 'smart band', 'speaker', 'speakers',
      'bluetooth speaker', 'soundbar', 'soundbars', 'power bank', 'powerbank', 'charger',
      'usb cable', 'fast charger', 'laptop', 'tablet', 'wireless audio'
    ],
    subcategories: {
      'headphones': ['headphone', 'headphones', 'on-ear', 'over-ear', 'headset'],
      'earbuds': ['earbud', 'earbuds', 'tws', 'wireless earphone', 'airpods'],
      'speakers': ['speaker', 'speakers', 'bluetooth speaker', 'portable speaker'],
      'soundbars': ['soundbar', 'soundbars', 'home theatre', 'tv speaker'],
      'smart-wearables': ['smartwatch', 'smart watch', 'wearable', 'fitness band'],
      'power-banks': ['power bank', 'powerbank', 'portable battery'],
      'chargers-cables': ['charger', 'cable', 'fast charging', 'usb-c', 'adapter']
    }
  },
  {
    slug: 'pooja-items',
    label: 'Pooja Items',
    aliases: ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items', 'spiritual'],
    keywords: [
      'pooja', 'puja', 'diya', 'diyas', 'deepam', 'deepams', 'kuber diya', 'brass diya',
      'mandir', 'home temple', 'temple', 'idol', 'idols', 'murti', 'statue', 'statues',
      'ganesha', 'ganesh', 'laxmi', 'lakshmi', 'shiva', 'krishna', 'hanuman', 'radha',
      'samagri', 'havan', 'camphor', 'kapoor', 'incense', 'agarbatti', 'dhoop', 'loban',
      'thali', 'thalis', 'pooja thali', 'aarti thali', 'bell', 'ghanti', 'brass',
      'rudraksha', 'mala', 'spiritual', 'festival kit', 'pooja kit', 'gangajal', 'kumkum', 'chandan'
    ],
    subcategories: {
      'diyas-lamps': ['diya', 'diyas', 'deepam', 'brass diya', 'oil lamp', 'akhand diya'],
      'idols-statues': ['idol', 'idols', 'murti', 'statue', 'statues', 'ganesha', 'shiva', 'laxmi'],
      'home-temple-mandir': ['mandir', 'temple', 'wooden mandir', 'home temple'],
      'thalis': ['thali', 'thalis', 'pooja thali', 'aarti thali', 'brass plate'],
      'incense-fragrance': ['incense', 'agarbatti', 'dhoop', 'loban', 'camphor', 'kapoor'],
      'pooja-samagri': ['samagri', 'havan samagri', 'chandan', 'kumkum', 'gangajal', 'supari'],
      'rudraksha-spiritual': ['rudraksha', 'rudraksh', 'mala', 'japamala', 'spiritual bracelet'],
      'festival-pooja-kits': ['festival kit', 'pooja kit', 'diwali kit', 'navratri kit', 'combo pooja']
    }
  },
  {
    slug: 'home-living',
    label: 'Home & Living',
    aliases: ['home-living', 'home-kitchen', 'home', 'living', 'kitchen', 'home decor'],
    keywords: [
      'home', 'living', 'kitchen', 'decor', 'dining',
      'bedsheet', 'bedsheets', 'bed linen', 'bed sheet', 'pillow cover', 'pillow covers',
      'curtain', 'curtains', 'drape', 'drapes', 'cushion', 'cushions', 'cushion cover',
      'blanket', 'blankets', 'quilt', 'quilts', 'comforter', 'comforters', 'dohar',
      'cookware', 'pan', 'kadhai', 'tawa', 'pot', 'utensil', 'utensils', 'prestige', 'pigeon',
      'dinner set', 'dinner plate', 'bowl', 'bowls', 'container', 'containers', 'storage box',
      'water bottle', 'bottle', 'bottles', 'flask', 'flasks', 'thermos', 'milton',
      'vase', 'vases', 'artificial plant', 'artificial flower', 'flower pot', 'planter',
      'lamp', 'lamps', 'table lamp', 'lighting', 'fairy lights', 'wall decor', 'wall clock',
      'clock', 'photo frame', 'painting', 'showpiece', 'showpieces', 'figurine', 'figurines'
    ],
    subcategories: {
      'bedsheets': ['bedsheet', 'bedsheets', 'bed linen', 'cotton sheet', 'king size sheet'],
      'curtains': ['curtain', 'curtains', 'drape', 'drapes', 'sheer curtain', 'blackout'],
      'cushions': ['cushion', 'cushions', 'cushion cover', 'throw pillow'],
      'blankets-quilts': ['blanket', 'blankets', 'quilt', 'quilts', 'comforter', 'dohar'],
      'cookware-utensils': ['cookware', 'pan', 'kadhai', 'tawa', 'pressure cooker', 'utensils'],
      'dinner-sets': ['dinner set', 'plates', 'dinnerware', 'crockery', 'bowls'],
      'storage-containers': ['container', 'containers', 'storage box', 'airtight jar'],
      'water-bottles': ['water bottle', 'bottle', 'flask', 'thermos', 'steel bottle'],
      'wall-decor': ['wall decor', 'wall clock', 'clock', 'wall hanging', 'frame'],
      'vases-plants': ['vase', 'artificial plant', 'artificial flower', 'flower pot'],
      'lamps-lighting': ['lamp', 'lamps', 'lighting', 'table lamp', 'study lamp'],
      'showpieces-figurines': ['showpiece', 'figurine', 'sculpture', 'decorative idol']
    }
  },
  {
    slug: 'beauty',
    label: 'Beauty & Grooming',
    aliases: ['beauty', 'cosmetics', 'grooming', 'skincare', 'haircare', 'personal-care'],
    keywords: [
      'beauty', 'grooming', 'skincare', 'haircare', 'cosmetics', 'makeup',
      'face wash', 'facewash', 'cleanser', 'cleansers', 'face scrub',
      'cream', 'face cream', 'moisturizer', 'moisturizers', 'lotion', 'body lotion',
      'sunscreen', 'sunscreens', 'spf', 'serum', 'face serum', 'vitamin c',
      'shampoo', 'shampoos', 'conditioner', 'conditioners', 'hair oil', 'hair serum',
      'perfume', 'perfumes', 'eau de parfum', 'edp', 'edt', 'deodorant', 'deodorants',
      'body mist', 'body spray', 'fragrance', 'fragrances', 'bella vita', 'beardo', 'ustraa',
      'shaving', 'razor', 'aftershave', 'beard oil', 'beard wash', 'trimmer'
    ],
    subcategories: {
      'face-wash-cleansers': ['face wash', 'facewash', 'cleanser', 'scrub'],
      'face-creams-moisturizers': ['face cream', 'moisturizer', 'day cream', 'night cream', 'lotion'],
      'sunscreen-serums': ['sunscreen', 'serum', 'spf', 'vitamin c serum', 'niacinamide'],
      'shampoo-conditioner': ['shampoo', 'conditioner', 'hair cleanser'],
      'hair-oils-serums': ['hair oil', 'hair serum', 'onion oil', 'argan oil'],
      'perfumes-deodorants': ['perfume', 'edp', 'edt', 'deodorant', 'cologne'],
      'body-mists-sprays': ['body mist', 'body spray', 'mist', 'fragrance mist'],
      'men-grooming-shaving': ['beard oil', 'shaving cream', 'aftershave', 'grooming kit']
    }
  },
  {
    slug: 'grocery-items',
    label: 'Grocery Items',
    aliases: ['grocery-items', 'grocery', 'groceries', 'staples', 'daily-essentials'],
    keywords: [
      'grocery', 'groceries', 'staple', 'staples', 'rice', 'basmati', 'dal', 'pulses',
      'lentils', 'atta', 'flour', 'wheat', 'oil', 'edible oil', 'mustard oil', 'sunflower oil',
      'ghee', 'sugar', 'salt', 'spice', 'spices', 'turmeric', 'chilli powder', 'garam masala',
      'tea', 'chai', 'coffee', 'biscuit', 'biscuits', 'cookies', 'chips', 'snacks', 'namkeen',
      'dry fruits', 'almond', 'cashew', 'raisin', 'walnut', 'honey', 'pasta', 'noodles'
    ],
    subcategories: {
      'staples': ['rice', 'dal', 'atta', 'oil', 'ghee', 'flour'],
      'spices': ['spice', 'turmeric', 'chilli', 'garam masala', 'coriander'],
      'beverages': ['tea', 'coffee', 'chai', 'green tea'],
      'snacks': ['biscuit', 'chips', 'namkeen', 'cookies'],
      'dry-fruits': ['dry fruits', 'almond', 'cashew', 'raisins', 'walnuts']
    }
  },
  {
    slug: 'ethnic-wear',
    label: 'Ethnic Wear',
    aliases: ['ethnic-wear', 'ethnic', 'traditional'],
    keywords: [
      'ethnic', 'traditional', 'saree', 'sarees', 'silk saree', 'banarasi', 'kanjivaram',
      'cotton saree', 'bridal saree', 'party wear saree', 'wedding saree', 'festive wear saree',
      'daily wear saree', 'lightweight saree', 'handloom saree', 'blouse', 'blouses', 'saree blouse',
      'kurta', 'kurtas', 'kurti', 'kurtis', 'kurta set', 'kurta suit set', 'anarkali',
      'salwar', 'churidar', 'lehenga', 'lehengas', 'choli', 'dupatta', 'sherwani', 'nehru jacket'
    ],
    subcategories: {
      'sarees': [
        'saree', 'sarees', 'silk saree', 'cotton saree', 'georgette', 'kanjivaram', 'banarasi',
        'bridal saree', 'party wear saree', 'wedding saree', 'festive wear saree', 'daily wear saree',
        'lightweight saree', 'handloom saree', 'kancheepuram'
      ],
      'blouses': ['blouse', 'blouses', 'saree blouse', 'designer blouse', 'embroidered blouse', 'readymade blouse'],
      'kurtas': ['kurta', 'kurti', 'anarkali', 'tunic ethnic'],
      'kurta-suit-sets': ['suit set', 'kurta set', 'salwar suit', 'churidar set']
    }
  },
  {
    slug: 'accessories',
    label: 'Accessories & Bags',
    aliases: ['accessories', 'accessory', 'bags'],
    keywords: [
      'accessory', 'accessories', 'wallet', 'wallets', 'belt', 'belts', 'leather belt',
      'handbag', 'handbags', 'shoulder bag', 'tote', 'tote bag', 'clutch', 'sling bag',
      'backpack', 'backpacks', 'duffle bag', 'travel bag', 'sunglasses', 'shades', 'cap', 'caps'
    ],
    subcategories: {
      'wallets': ['wallet', 'leather wallet', 'card holder'],
      'handbags': ['handbag', 'tote bag', 'shoulder bag', 'sling bag'],
      'backpacks': ['backpack', 'travel backpack', 'laptop backpack']
    }
  },
  {
    slug: 'jewellery',
    label: 'Jewellery',
    aliases: ['jewellery', 'jewelry'],
    keywords: [
      'jewellery', 'jewelry', 'necklace', 'necklaces', 'earring', 'earrings', 'jhumka',
      'ring', 'rings', 'bangle', 'bangles', 'bracelet', 'bracelets', 'pendant', 'chain',
      'mangalsutra', 'silver jewellery', 'gold jewellery', 'fashion jewellery', 'oxidised'
    ],
    subcategories: {
      'earrings': ['earring', 'earrings', 'jhumka', 'studs', 'hoops'],
      'necklaces': ['necklace', 'pendant', 'choker', 'chain'],
      'bangles': ['bangle', 'bangles', 'bracelet', 'kada']
    }
  },
  {
    slug: 'kids',
    label: 'Kids & Baby',
    aliases: ['kids', 'kid', 'baby', 'infant', 'toddler'],
    keywords: [
      'kid', 'kids', 'baby', 'babies', 'infant', 'toddler', 'boy', 'boys', 'girl', 'girls',
      'romper', 'rompers', 'onesie', 'onesies', 'kids dress', 'frock', 'frocks', 'kids t-shirt',
      'kids shoes', 'baby clothes', 'toy', 'toys', 'kids wear'
    ],
    subcategories: {
      'boys-clothing': ['boys', 'boys shirt', 'boys jeans', 'boys clothing'],
      'girls-clothing': ['girls', 'girls dress', 'frock', 'girls clothing'],
      'baby-clothes': ['baby', 'romper', 'onesie', 'infant']
    }
  },
  {
    slug: 'gifts',
    label: 'Gifts & Hampers',
    aliases: ['gifts', 'gift', 'hampers'],
    keywords: ['gift', 'gifts', 'hamper', 'hampers', 'gift set', 'combo', 'present'],
    subcategories: {
      'gift-sets': ['gift set', 'gift box', 'hamper']
    }
  },
  {
    slug: 'stationary',
    label: 'Stationery',
    aliases: ['stationary', 'stationery'],
    keywords: ['stationary', 'stationery', 'notebook', 'notebooks', 'pen', 'pens', 'diary', 'desk'],
    subcategories: {
      'notebooks': ['notebook', 'diary', 'journal']
    }
  }
];

/**
 * Find the best matching category, section and subcategory for a search query.
 * Uses both direct keyword taxonomy analysis and catalog product matching.
 *
 * @param {string} query - The search query
 * @param {Array} [products] - Optional list of products to match against
 * @returns {Object|null} Match result
 */
export function findRespectiveCategoryMatch(query, products = null) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return null;
  }

  const cleanQ = query.toLowerCase().trim();
  const tokens = cleanQ.split(/\s+/).filter(Boolean);
  const prodPool = Array.isArray(products) && products.length > 0 ? products : SAMPLE_PRODUCTS;

  // 1. Demographic detection
  let matchedSection = null;
  if (/\b(kid|kids|baby|infant|boy|boys|girl|girls|child|children|toddler)\b/i.test(cleanQ)) {
    matchedSection = 'kids';
  } else if (/\b(women|womens|women's|woman|ladies|lady)\b/i.test(cleanQ)) {
    matchedSection = 'women';
  } else if (/\b(men|mens|men's|man|gent|gents)\b/i.test(cleanQ)) {
    matchedSection = 'men';
  }

  // 2. Tally matching products across categories
  const categoryProductCounts = {};
  const matchingProductsList = [];

  prodPool.forEach(p => {
    const textTokens = [
      p.name,
      p.title,
      p.brand,
      p.tags,
      p.category,
      p.category_name,
      p.subcategory,
      p.childCategory,
      p.description
    ].filter(Boolean).join(' ').toLowerCase();

    const matchesAllTokens = tokens.every(t => {
      if (textTokens.includes(t)) return true;
      if (t.endsWith('s') && textTokens.includes(t.slice(0, -1))) return true;
      if (!t.endsWith('s') && textTokens.includes(t + 's')) return true;
      return false;
    });

    if (matchesAllTokens) {
      matchingProductsList.push(p);
      let cat = (p.category || p.category_name || '').toLowerCase();
      if (cat === 'electronics') cat = 'gadgets';
      if (cat === 'grocery') cat = 'grocery-items';
      if (cat === 'stationary') cat = 'stationery';
      categoryProductCounts[cat] = (categoryProductCounts[cat] || 0) + 1;
    }
  });

  // 3. Keyword / Taxonomy scoring
  const categoryScores = {};

  CATEGORY_DEFINITIONS.forEach(def => {
    let score = 0;

    // Direct alias match (highest priority)
    def.aliases.forEach(alias => {
      if (cleanQ === alias) score += 50;
      else if (cleanQ.includes(alias)) score += 25;
    });

    // Keyword match
    def.keywords.forEach(kw => {
      if (cleanQ === kw) {
        score += 30;
      } else if (cleanQ.includes(kw)) {
        // Multi-word exact phrase match gets higher score
        const kwWords = kw.split(' ').length;
        score += 10 * kwWords;
      }
    });

    // Product frequency contribution
    const prodCount = categoryProductCounts[def.slug] || 0;
    score += prodCount * 8;

    if (score > 0) {
      categoryScores[def.slug] = score;
    }
  });

  // Pick top category
  const sortedCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => slug);

  const topCategorySlug = sortedCategories[0] || null;
  if (!topCategorySlug) {
    // Fallback: If products matched, pick the category with most matching products
    const prodSorted = Object.entries(categoryProductCounts).sort((a, b) => b[1] - a[1]);
    if (prodSorted.length > 0) {
      const bestSlug = prodSorted[0][0];
      const bestDef = CATEGORY_DEFINITIONS.find(d => d.slug === bestSlug || d.aliases.includes(bestSlug));
      return {
        categorySlug: bestSlug,
        categoryLabel: bestDef?.label || bestSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        section: matchedSection,
        subcategory: null,
        matchCount: prodSorted[0][1],
        matchingProducts: matchingProductsList.filter(p => p.category === bestSlug || (bestSlug === 'gadgets' && p.category === 'electronics')),
        allMatchingCategories: prodSorted.map(([slug, count]) => {
          const d = CATEGORY_DEFINITIONS.find(def => def.slug === slug || def.aliases.includes(slug));
          return { slug, label: d?.label || slug, count };
        })
      };
    }
    return null;
  }

  const bestDef = CATEGORY_DEFINITIONS.find(d => d.slug === topCategorySlug);

  // 4. Subcategory detection within the top category
  let matchedSubcategory = null;
  let matchedSubcategoryLabel = null;

  if (bestDef?.subcategories) {
    for (const [subSlug, subKeywords] of Object.entries(bestDef.subcategories)) {
      const matched = subKeywords.some(kw => cleanQ === kw || cleanQ.includes(kw));
      if (matched) {
        matchedSubcategory = subSlug;
        matchedSubcategoryLabel = subSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        break;
      }
    }
  }

  // If subcategory not matched by keyword, check matching products' subcategories
  if (!matchedSubcategory && matchingProductsList.length > 0) {
    const subCounts = {};
    let totalInCat = 0;
    matchingProductsList.forEach(p => {
      const pCat = (p.category || '').toLowerCase();
      if (pCat === topCategorySlug || (topCategorySlug === 'gadgets' && pCat === 'electronics')) {
        totalInCat++;
        const s = (p.subcategory || '').toLowerCase();
        if (s) subCounts[s] = (subCounts[s] || 0) + 1;
      }
    });
    const topSubEntry = Object.entries(subCounts).sort((a, b) => b[1] - a[1])[0];
    if (topSubEntry && totalInCat > 0 && topSubEntry[1] >= totalInCat * 0.8) {
      matchedSubcategory = topSubEntry[0];
      matchedSubcategoryLabel = matchedSubcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  // Format all matching categories for UI quick-switch chips
  const allMatchingCategories = Object.entries(categoryProductCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => {
      const d = CATEGORY_DEFINITIONS.find(def => def.slug === slug || def.aliases.includes(slug));
      return {
        slug,
        label: d?.label || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        count
      };
    });

  return {
    categorySlug: topCategorySlug,
    categoryLabel: bestDef?.label || topCategorySlug,
    section: matchedSection,
    subcategory: matchedSubcategory,
    subcategoryLabel: matchedSubcategoryLabel,
    matchCount: categoryProductCounts[topCategorySlug] || matchingProductsList.length,
    matchingProducts: matchingProductsList.filter(p => p.category === topCategorySlug || (topCategorySlug === 'gadgets' && p.category === 'electronics')),
    allMatchingCategories
  };
}

/**
 * Builds the URL navigation target for a search query.
 *
 * @param {string} query - The search query
 * @param {Array} [products] - Optional product catalog
 * @param {string} [overrideCategory] - Optional user-selected category override
 * @returns {string} Route URL e.g. /products?category=clothing&subcategory=shirts&search=linen%20shirt
 */
export function buildSearchNavigationUrl(query, products = null, overrideCategory = null) {
  const cleanQ = (query || '').trim();
  if (!cleanQ) {
    return '/products';
  }

  if (overrideCategory && overrideCategory !== 'all') {
    return `/products?category=${encodeURIComponent(overrideCategory)}&search=${encodeURIComponent(cleanQ)}`;
  }

  const match = findRespectiveCategoryMatch(cleanQ, products);
  if (match && match.categorySlug) {
    const params = new URLSearchParams();
    params.set('category', match.categorySlug);
    if (match.section) {
      params.set('section', match.section);
    }
    if (match.subcategory) {
      params.set('subcategory', match.subcategory);
    }
    params.set('search', cleanQ);
    return `/products?${params.toString()}`;
  }

  return `/products?search=${encodeURIComponent(cleanQ)}`;
}
