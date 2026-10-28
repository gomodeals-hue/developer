/**
 * GoMo Deals - Curated Category Catalog & Mega Menus
 * Clean, streamlined hierarchy with rich product availability.
 */

export const categorySections = {
  'clothing': [
    {
      title: 'Men',
      displayTitle: 'Men',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&q=80',
      subtitle: 'Shirts, Jeans, T-Shirts & Kurtas',
      items: [
        { label: 'Shirts', slug: 'shirts', keywords: ['shirt', 'formal shirt', 'casual shirt', 'linen shirt'] },
        { label: 'T-Shirts & Polos', slug: 't-shirts', keywords: ['t-shirt', 'tee', 'polo', 'graphic tee'] },
        { label: 'Jeans & Denims', slug: 'jeans-jeggings', keywords: ['jeans', 'denim', 'slim fit', 'chinos'] },
        { label: 'Trousers & Chinos', slug: 'trousers-pants', keywords: ['trousers', 'pants', 'chinos', 'cargo'] },
        { label: 'Track Pants & Joggers', slug: 'track-pants', keywords: ['track pants', 'joggers', 'sweatpants'] },
        { label: 'Jackets & Blazers', slug: 'jackets', keywords: ['jacket', 'blazer', 'coat', 'outerwear'] },
        { label: 'Kurtas & Ethnic', slug: 'kurtas', keywords: ['kurta', 'ethnic', 'sherwani', 'nehru jacket'] }
      ]
    },
    {
      title: 'Women',
      displayTitle: 'Women',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
      subtitle: 'Dresses, Sarees, Blouses & Kurtis',
      items: [
        { label: 'Dresses & Gowns', slug: 'dresses', keywords: ['dress', 'gown', 'maxi', 'midi', 'bodycon'] },
        { label: 'Tops & Shirts', slug: 'tops', keywords: ['top', 'shirt', 'crop top', 'peplum', 'tunic'] },
        { label: 'Blouses', slug: 'blouses', keywords: ['blouse', 'blouses', 'saree blouse', 'designer blouse', 'embroidered blouse', 'readymade blouse'] },
        { label: 'Jeans & Jeggings', slug: 'jeans-jeggings', keywords: ['jeans', 'jeggings', 'denim', 'skinny'] },
        { label: 'Co-ord Sets', slug: 'co-ord-sets', keywords: ['co-ord', 'coord', 'two piece set', 'matching set'] },
        { label: 'Kurtas & Kurtis', slug: 'kurtas', keywords: ['kurta', 'kurti', 'anarkali', 'suit'] },
        {
          label: 'Sarees',
          slug: 'sarees',
          keywords: ['saree', 'silk saree', 'kanjivaram', 'banarasi', 'cotton saree', 'bridal saree', 'party wear saree', 'wedding saree', 'festive wear saree', 'daily wear saree', 'lightweight saree', 'handloom saree'],
          subcategories: [
            { label: 'Silk Sarees', slug: 'silk-sarees' },
            { label: 'Kanjivaram Sarees', slug: 'kanjivaram-sarees' },
            { label: 'Banarasi Sarees', slug: 'banarasi-sarees' },
            { label: 'Cotton Sarees', slug: 'cotton-sarees' },
            { label: 'Bridal Sarees', slug: 'bridal-sarees' },
            { label: 'Party Wear Sarees', slug: 'party-wear-sarees' },
            { label: 'Wedding Sarees', slug: 'wedding-sarees' },
            { label: 'Festive Wear Sarees', slug: 'festive-wear-sarees' },
            { label: 'Daily Wear Sarees', slug: 'daily-wear-sarees' },
            { label: 'Lightweight Sarees', slug: 'lightweight-sarees' },
            { label: 'Handloom Sarees', slug: 'handloom-sarees' }
          ]
        },
        { label: 'Jackets & Shrugs', slug: 'jackets', keywords: ['jacket', 'blazer', 'shrug', 'cardigan'] }
      ]
    },
    {
      title: 'Kids',
      displayTitle: 'Kids',
      slug: 'kids',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80',
      subtitle: 'Boys, Girls & Baby Apparel',
      items: [
        { label: 'Boys Clothing', slug: 'boys-clothing', keywords: ['boys', 'boys shirt', 'boys t-shirt', 'boys jeans'] },
        { label: 'Girls Clothing', slug: 'girls-clothing', keywords: ['girls', 'girls dress', 'frock', 'girls top'] },
        { label: 'Baby & Infant', slug: 'baby-clothes', keywords: ['baby', 'onesie', 'romper', 'infant'] }
      ]
    },
    {
      title: 'Unisex',
      displayTitle: 'Unisex',
      slug: 'unisex',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80',
      subtitle: 'Hoodies, Sweatshirts & Streetwear',
      items: [
        { label: 'Graphic & Street Tees', slug: 't-shirts', keywords: ['graphic tee', 'oversized tee', 't-shirt'] },
        { label: 'Loungewear & Tracksuits', slug: 'co-ord-sets', keywords: ['tracksuit', 'joggers', 'lounge set', 'co-ord'] },
        { label: 'Denims & Jackets', slug: 'jackets', keywords: ['denim jacket', 'hoodie', 'sweatshirt'] }
      ]
    }
  ],

  'western-wear': [
    {
      title: 'Men',
      displayTitle: 'Men',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
      subtitle: 'Shirts, T-Shirts, Denims & Trousers',
      items: [
        { label: 'Shirts', slug: 'shirts', keywords: ['shirt', 'formal shirt', 'casual shirt', 'linen shirt', 'oxford'] },
        { label: 'T-Shirts & Polos', slug: 't-shirts', keywords: ['t-shirt', 'tee', 'polo', 'crewneck', 'oversized'] },
        { label: 'Jeans & Denims', slug: 'jeans-jeggings', keywords: ['jeans', 'denim', 'slim fit', 'straight fit'] },
        { label: 'Trousers & Chinos', slug: 'trousers-pants', keywords: ['trousers', 'pants', 'chinos', 'cargo'] },
        { label: 'Jackets & Blazers', slug: 'jackets', keywords: ['jacket', 'blazer', 'denim jacket', 'coat'] },
        { label: 'Track Pants & Joggers', slug: 'track-pants', keywords: ['track pants', 'joggers', 'sweatpants'] }
      ]
    },
    {
      title: 'Women',
      displayTitle: 'Women',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
      subtitle: 'Dresses, Tops, Jeans & Co-ords',
      items: [
        { label: 'Dresses & Gowns', slug: 'dresses', keywords: ['dress', 'midi', 'maxi', 'bodycon', 'party dress'] },
        { label: 'Tops & Blouses', slug: 'tops', keywords: ['top', 'blouse', 'crop top', 'peplum', 'tunic'] },
        { label: 'Jeans & Jeggings', slug: 'jeans-jeggings', keywords: ['jeans', 'jeggings', 'denim', 'skinny', 'wide leg'] },
        { label: 'Leggings & Palazzos', slug: 'leggings', keywords: ['leggings', 'palazzos', 'churidar'] },
        { label: 'Co-ord Sets', slug: 'co-ord-sets', keywords: ['co-ord', 'coord', 'two piece set', 'matching set'] },
        { label: 'Trousers & Pants', slug: 'trousers-pants', keywords: ['trousers', 'pants', 'wide leg', 'pleated'] },
        { label: 'Jackets & Outerwear', slug: 'jackets', keywords: ['jacket', 'blazer', 'biker jacket', 'shrug'] }
      ]
    },
    {
      title: 'Kids',
      displayTitle: 'Kids',
      slug: 'kids',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80',
      subtitle: 'Boys & Girls Western Wear',
      items: [
        { label: 'Boys Casuals & Tees', slug: 'boys-clothing', keywords: ['boys tee', 'boys t-shirt', 'boys shirt', 'boys jeans'] },
        { label: 'Girls Dresses & Tops', slug: 'girls-clothing', keywords: ['girls frock', 'girls dress', 'girls top'] },
        { label: 'Infant Essentials', slug: 'baby-clothes', keywords: ['baby romper', 'onesie', 'infant clothes'] }
      ]
    }
  ],

  'ethnic-wear': [
    {
      title: 'Men',
      displayTitle: 'Men',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1590076241940-02a8b29e64e5?w=400&q=80',
      subtitle: 'Kurtas, Nehru Coats & Festive',
      items: [
        { label: 'Kurtas & Sets', slug: 'kurtas', keywords: ['men kurta', 'kurta pajama', 'kurta set'] },
        { label: 'Nehru Jackets & Waistcoats', slug: 'ethnic-jackets', keywords: ['nehru jacket', 'waistcoat', 'bandhgala'] },
        { label: 'Sherwani & Festive Sets', slug: 'sherwani-sets', keywords: ['sherwani', 'festive', 'wedding'] }
      ]
    },
    {
      title: 'Women',
      displayTitle: 'Women',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
      subtitle: 'Sarees, Blouses, Suits, Lehengas & Kurtis',
      items: [
        {
          label: 'Sarees',
          slug: 'sarees',
          keywords: ['saree', 'silk saree', 'kanjivaram', 'banarasi', 'cotton saree', 'bridal saree', 'party wear saree', 'wedding saree', 'festive wear saree', 'daily wear saree', 'lightweight saree', 'handloom saree'],
          subcategories: [
            { label: 'Silk Sarees', slug: 'silk-sarees' },
            { label: 'Kanjivaram Sarees', slug: 'kanjivaram-sarees' },
            { label: 'Banarasi Sarees', slug: 'banarasi-sarees' },
            { label: 'Cotton Sarees', slug: 'cotton-sarees' },
            { label: 'Bridal Sarees', slug: 'bridal-sarees' },
            { label: 'Party Wear Sarees', slug: 'party-wear-sarees' },
            { label: 'Wedding Sarees', slug: 'wedding-sarees' },
            { label: 'Festive Wear Sarees', slug: 'festive-wear-sarees' },
            { label: 'Daily Wear Sarees', slug: 'daily-wear-sarees' },
            { label: 'Lightweight Sarees', slug: 'lightweight-sarees' },
            { label: 'Handloom Sarees', slug: 'handloom-sarees' }
          ]
        },
        { label: 'Blouses', slug: 'blouses', keywords: ['blouse', 'blouses', 'saree blouse', 'designer blouse', 'embroidered blouse', 'readymade blouse'] },
        { label: 'Kurtas & Kurtis', slug: 'kurtas', keywords: ['kurta', 'kurti', 'anarkali', 'suit'] },
        { label: 'Kurta Suit Sets', slug: 'kurta-suit-sets', keywords: ['kurta suit set', 'suit set', 'dupatta set'] },
        { label: 'Lehenga Choli', slug: 'lehenga-choli-sets', keywords: ['lehenga', 'choli', 'bridal', 'ghagra'] },
        { label: 'Ethnic Gowns & Anarkalis', slug: 'dresses-gowns', keywords: ['ethnic gown', 'anarkali gown'] }
      ]
    }
  ],

  'footwear': [
    {
      title: 'Men',
      displayTitle: 'Men',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      subtitle: 'Sneakers, Casuals, Loafers & Boots',
      items: [
        { label: 'Sneakers & Sports Shoes', slug: 'sneakers', keywords: ['sneakers', 'kicks', 'sports shoes', 'running shoes'] },
        { label: 'Casual Shoes & Loafers', slug: 'casual-shoes', keywords: ['casual shoes', 'loafers', 'moccasins', 'slip on'] },
        { label: 'Formal Shoes & Boots', slug: 'formal-shoes', keywords: ['formal shoes', 'oxfords', 'boots', 'chelsea boots'] },
        { label: 'Sandals & Floaters', slug: 'sandals', keywords: ['sandals', 'floaters', 'slides', 'slippers'] }
      ]
    },
    {
      title: 'Women',
      displayTitle: 'Women',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
      subtitle: 'Heels, Flats, Sneakers & Boots',
      items: [
        { label: 'Heels & Wedges', slug: 'heels', keywords: ['heels', 'wedges', 'pumps', 'stilettos'] },
        { label: 'Flat Sandals & Slides', slug: 'flats', keywords: ['flats', 'sandals', 'slides', 'mules'] },
        { label: 'Sneakers & Casuals', slug: 'sneakers', keywords: ['sneakers', 'fashion sneakers', 'casual shoes'] },
        { label: 'Boots & Booties', slug: 'boots', keywords: ['boots', 'ankle boots', 'leather boots'] }
      ]
    },
    {
      title: 'Kids',
      displayTitle: 'Kids',
      slug: 'kids',
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&q=80',
      subtitle: 'Kids Sneakers, Sandals & School Shoes',
      items: [
        { label: 'Kids Sneakers & Casuals', slug: 'sneakers', keywords: ['kids sneakers', 'running shoes'] },
        { label: 'Kids Sandals & Slippers', slug: 'sandals', keywords: ['kids sandals', 'floaters', 'crocs'] }
      ]
    }
  ],

  'accessories': [
    {
      title: 'Everyday Essentials',
      displayTitle: 'Everyday Essentials',
      slug: 'essentials',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
      subtitle: 'Watches, Sunglasses, Wallets & Bags',
      items: [
        { label: 'Watches', slug: 'watches', keywords: ['watches', 'chronograph', 'leather watch', 'smart watch'] },
        { label: 'Sunglasses', slug: 'sunglasses', keywords: ['sunglasses', 'aviators', 'wayfarers', 'polarized'] },
        { label: 'Wallets & Belts', slug: 'wallets', keywords: ['wallet', 'cardholder', 'leather belt', 'belts'] },
        { label: 'Backpacks & Handbags', slug: 'backpacks', keywords: ['backpack', 'handbag', 'tote', 'laptop bag', 'clutch'] }
      ]
    }
  ],

  'beauty': [
    {
      title: 'Skincare',
      displayTitle: 'Skincare',
      slug: 'skincare',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
      subtitle: 'Creams, Cleansers, Sunscreens & Serums',
      items: [
        { label: 'Face Creams & Moisturizers', slug: 'face-creams-moisturizers', keywords: ['face cream', 'moisturizer', 'cream'] },
        { label: 'Face Wash & Cleansers', slug: 'face-wash-cleansers', keywords: ['face wash', 'cleanser', 'facewash'] },
        { label: 'Sunscreen & Serums', slug: 'sunscreen-serums', keywords: ['sunscreen', 'serum', 'spf'] }
      ]
    },
    {
      title: 'Haircare',
      displayTitle: 'Haircare',
      slug: 'haircare',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
      subtitle: 'Shampoos, Conditioners, Oils & Serums',
      items: [
        { label: 'Shampoos & Conditioners', slug: 'shampoo-conditioner', keywords: ['shampoo', 'conditioner'] },
        { label: 'Hair Oils & Serums', slug: 'hair-oils-serums', keywords: ['hair oil', 'hair serum', 'scalp oil'] }
      ]
    },
    {
      title: 'Fragrances & Grooming',
      displayTitle: 'Fragrances & Grooming',
      slug: 'fragrances-grooming',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&q=80',
      subtitle: 'Perfumes, Deos, Mists & Men Grooming',
      items: [
        { label: 'Perfumes & Deodorants', slug: 'perfumes-deodorants', keywords: ['perfume', 'deodorant', 'edp'] },
        { label: 'Body Mists & Sprays', slug: 'body-mists-sprays', keywords: ['body mist', 'spray', 'body spray'] },
        { label: 'Men Grooming & Shaving', slug: 'men-grooming-shaving', keywords: ['beard', 'shaving', 'grooming', 'razor'] }
      ]
    }
  ],

  'home-living': [
    {
      title: 'Kitchen & Dining',
      displayTitle: 'Kitchen & Dining',
      slug: 'kitchen-dining',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80',
      subtitle: 'Cookware, Dinner Sets, Storage & Bottles',
      items: [
        { label: 'Cookware & Utensils', slug: 'cookware-utensils', keywords: ['cookware', 'utensils', 'kadai', 'pan', 'tri-ply'] },
        { label: 'Dinner Sets & Plates', slug: 'dinner-sets', keywords: ['dinner set', 'plates', 'opalware', 'crockery'] },
        { label: 'Storage Containers', slug: 'storage-containers', keywords: ['storage containers', 'jars', 'airtight', 'borosil'] },
        { label: 'Water Bottles & Flasks', slug: 'water-bottles', keywords: ['water bottle', 'flask', 'thermosteel', 'sipper'] }
      ]
    },
    {
      title: 'Home Furnishing',
      displayTitle: 'Home Furnishing',
      slug: 'home-furnishing',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80',
      subtitle: 'Bed Linen, Curtains, Cushions & Blankets',
      items: [
        { label: 'Bed Linen & Sheets', slug: 'bedsheets', keywords: ['bedsheet', 'bed linen', 'cotton sheet', 'pillow cover'] },
        { label: 'Curtains & Drapes', slug: 'curtains', keywords: ['curtains', 'drapes', 'blackout', 'eyelet', 'sheer'] },
        { label: 'Cushions & Covers', slug: 'cushions', keywords: ['cushions', 'cushion covers', 'velvet', 'throw pillow'] },
        { label: 'Blankets & Quilts', slug: 'blankets-quilts', keywords: ['blanket', 'quilt', 'comforter', 'dohar', 'mink'] }
      ]
    },
    {
      title: 'Home Décor',
      displayTitle: 'Home Décor',
      slug: 'home-decor',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
      subtitle: 'Wall Clocks, Vases, Lamps & Showpieces',
      items: [
        { label: 'Wall Decor & Clocks', slug: 'wall-decor', keywords: ['wall decor', 'clocks', 'wall clock', 'canvas art'] },
        { label: 'Vases & Artificial Plants', slug: 'vases-plants', keywords: ['vases', 'artificial plants', 'flower vase', 'bonsai'] },
        { label: 'Lamps & Lighting', slug: 'lamps-lighting', keywords: ['lamps', 'lighting', 'floor lamp', 'table lamp', 'pendant'] },
        { label: 'Showpieces & Figurines', slug: 'showpieces-figurines', keywords: ['showpieces', 'figurines', 'buddha', 'deer', 'brass'] }
      ]
    }
  ],

  'gadgets': [
    {
      title: 'Audio & Sound',
      displayTitle: 'Audio & Sound',
      slug: 'audio-sound',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      subtitle: 'Wireless Headphones, Bluetooth Speakers, TWS & Soundbars',
      items: [
        { label: 'Wireless Headphones', slug: 'headphones', keywords: ['headphones', 'wireless headphones', 'bluetooth headset', 'over ear', 'anc'] },
        { label: 'Bluetooth Speakers', slug: 'speakers', keywords: ['speakers', 'bluetooth speaker', 'portable speaker'] },
        { label: 'TWS True Wireless Earbuds', slug: 'earbuds', keywords: ['earbuds', 'tws', 'airpods', 'wireless earbuds'] },
        { label: 'Soundbars & Home Audio', slug: 'soundbars', keywords: ['soundbars', 'soundbar', 'home theater', 'speaker system'] }
      ]
    },
    {
      title: 'Smart Wearables & Tech',
      displayTitle: 'Smart Wearables & Tech',
      slug: 'smart-tech',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      subtitle: 'Smart Watches, Fitness Trackers, Powerbanks & Chargers',
      items: [
        { label: 'Smart Watches', slug: 'smart-wearables', keywords: ['smartwatch', 'smart watch', 'calling watch', 'smart watches'] },
        { label: 'Fitness Trackers', slug: 'fitness-trackers', keywords: ['fitness tracker', 'fitness band', 'activity tracker'] },
        { label: 'Power Banks', slug: 'power-banks', keywords: ['power bank', 'powerbanks', 'portable charger'] },
        { label: 'Chargers & Cables', slug: 'chargers-cables', keywords: ['charger', 'cable', 'fast charging', 'cables', 'chargers'] }
      ]
    }
  ],

  'pooja-items': [
    {
      title: 'Pooja Items & Sacred Essentials',
      displayTitle: 'Pooja Items',
      slug: 'pooja-items',
      image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400&q=80',
      subtitle: 'Idols, mandirs, brassware, diyas, incense & festival kits',
      items: [
        { label: 'Brass Idols & Statues', slug: 'idols-statues', keywords: ['brass idols', 'ganesh', 'shiva', 'idols', 'statues'] },
        { label: 'Home Temple & Mandir', slug: 'home-temple-mandir', keywords: ['home temple', 'mandir', 'wooden temple', 'pooja mandir'] },
        { label: 'Brass & Silver Items', slug: 'brass-silver-pooja-items', keywords: ['brass and silver', 'silver kalash', 'panchapatra', 'brass bell'] },
        { label: 'Puja Thalis & Bells', slug: 'thalis', keywords: ['thali', 'puja thali', 'pooja thali', 'aarti plate'] },
        { label: 'Brass Diyas & Deepams', slug: 'diyas-lamps', keywords: ['diya', 'deepam', 'brass diya', 'akhand diya'] },
        { label: 'Incense & Fragrance', slug: 'incense-fragrance', keywords: ['incense', 'fragrance', 'agarbatti', 'dhoop'] },
        { label: 'Pooja Samagri', slug: 'pooja-samagri', keywords: ['samagri', 'camphor', 'bhimseni', 'chandan', 'kumkum'] },
        { label: 'Rudraksha & Spiritual', slug: 'rudraksha-spiritual', keywords: ['rudraksha', 'spiritual', 'mala', 'japa', 'sphatik'] },
        { label: 'Festival Pooja Kits', slug: 'festival-pooja-kits', keywords: ['festival kit', 'pooja kit', 'diwali kit', 'navratri kit'] }
      ]
    }
  ],

  'healthy-foods': [
    {
      title: 'Healthy Pantry',
      displayTitle: 'Healthy Pantry',
      slug: 'healthy-pantry',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&q=80',
      subtitle: 'Organic staples, snacks, dry fruits & oils',
      items: [
        { label: 'Organic Foods', slug: 'organic-foods', keywords: ['organic food', 'healthy food'] },
        { label: 'Healthy Snacks', slug: 'healthy-snacks', keywords: ['healthy snack'] },
        { label: 'Atta & Flour', slug: 'atta-flour', keywords: ['atta', 'flour'] },
        { label: 'Pulses & Dals', slug: 'pulses-dals', keywords: ['pulses', 'dal'] },
        { label: 'Dry Fruits', slug: 'walnuts-pistachios', keywords: ['walnut', 'pistachio', 'dry fruit'] },
        { label: 'Olive Oil', slug: 'olive-oil', keywords: ['olive oil'] }
      ]
    }
  ],

    'grocery-items': [
    {
      title: 'Staples & Grains',
      displayTitle: 'Staples & Grains',
      slug: 'staples-grains',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
      subtitle: 'Rice, Wheat, Flour, Atta, Millets & Quinoa',
      items: [
        { label: 'Rice', slug: 'rice', keywords: ['rice', 'basmati', 'sona masoori', 'brown rice', 'boiled rice'] },
        { label: 'Wheat', slug: 'wheat', keywords: ['wheat', 'whole wheat', 'sharbati wheat', 'grains'] },
        { label: 'Flour', slug: 'flour', keywords: ['flour', 'maida', 'besan', 'corn flour', 'rice flour'] },
        { label: 'Atta', slug: 'atta', keywords: ['atta', 'chakki fresh atta', 'multigrain atta', 'gehun atta'] },
        { label: 'Millets', slug: 'millets', keywords: ['millets', 'ragi', 'jowar', 'bajra', 'foxtail millet'] },
        { label: 'Quinoa', slug: 'quinoa', keywords: ['quinoa', 'organic quinoa', 'white quinoa'] }
      ]
    },
    {
      title: 'Dals & Pulses',
      displayTitle: 'Dals & Pulses',
      slug: 'dals-pulses',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
      subtitle: 'Toor, Moong, Chana, Urad Dal & Rajma',
      items: [
        { label: 'Toor Dal', slug: 'toor-dal', keywords: ['toor dal', 'arhar dal', 'yellow toor dal'] },
        { label: 'Moong Dal', slug: 'moong-dal', keywords: ['moong dal', 'yellow moong', 'green moong', 'split moong'] },
        { label: 'Chana Dal', slug: 'chana-dal', keywords: ['chana dal', 'bengal gram', 'split chana'] },
        { label: 'Urad Dal', slug: 'urad-dal', keywords: ['urad dal', 'white urad', 'black urad', 'split urad'] },
        { label: 'Rajma', slug: 'rajma', keywords: ['rajma', 'red kidney beans', 'chitra rajma', 'jammu rajma'] }
      ]
    },
    {
      title: 'Edible Oils & Ghee',
      displayTitle: 'Edible Oils & Ghee',
      slug: 'edible-oils-ghee',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
      subtitle: 'Sunflower, Groundnut, Coconut, Olive Oil & Ghee',
      items: [
        { label: 'Sunflower Oil', slug: 'sunflower-oil', keywords: ['sunflower oil', 'refined sunflower oil'] },
        { label: 'Groundnut Oil', slug: 'groundnut-oil', keywords: ['groundnut oil', 'peanut oil', 'filtered groundnut oil'] },
        { label: 'Coconut Oil', slug: 'coconut-oil', keywords: ['coconut oil', 'virgin coconut oil', 'cold pressed coconut oil'] },
        { label: 'Olive Oil', slug: 'olive-oil', keywords: ['olive oil', 'extra virgin olive oil', 'pomace olive oil'] },
        { label: 'Ghee', slug: 'ghee', keywords: ['ghee', 'cow ghee', 'desi ghee', 'pure ghee', 'a2 ghee'] }
      ]
    },
    {
      title: 'Spices & Masalas',
      displayTitle: 'Spices & Masalas',
      slug: 'spices-masalas',
      image: 'https://images.unsplash.com/photo-1596040033282-be224a1b9b5f?w=400&q=80',
      subtitle: 'Turmeric, Chilli, Pepper, Cumin & Garam Masala',
      items: [
        { label: 'Turmeric', slug: 'turmeric', keywords: ['turmeric', 'haldi', 'turmeric powder', 'curcumin'] },
        { label: 'Chilli Powder', slug: 'chilli-powder', keywords: ['chilli powder', 'mirchi powder', 'kashmiri chilli', 'red chilli'] },
        { label: 'Pepper', slug: 'pepper', keywords: ['pepper', 'black pepper', 'kali mirch', 'crushed pepper'] },
        { label: 'Cumin', slug: 'cumin', keywords: ['cumin', 'jeera', 'cumin seeds', 'cumin powder'] },
        { label: 'Garam Masala', slug: 'garam-masala', keywords: ['garam masala', 'sabji masala', 'whole garam masala', 'curry powder'] }
      ]
    },
    {
      title: 'Salt & Sugar',
      displayTitle: 'Salt & Sugar',
      slug: 'salt-sugar',
      image: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=400&q=80',
      subtitle: 'Table Salt, Rock Salt, Sugar, Jaggery & Honey',
      items: [
        { label: 'Table Salt', slug: 'table-salt', keywords: ['table salt', 'iodized salt', 'white salt'] },
        { label: 'Rock Salt', slug: 'rock-salt', keywords: ['rock salt', 'sendha namak', 'pink salt', 'himalayan salt'] },
        { label: 'Sugar', slug: 'sugar', keywords: ['sugar', 'white sugar', 'brown sugar', 'sulphur free sugar'] },
        { label: 'Jaggery', slug: 'jaggery', keywords: ['jaggery', 'gur', 'organic jaggery', 'jaggery powder', 'palm jaggery'] },
        { label: 'Honey', slug: 'honey', keywords: ['honey', 'pure honey', 'raw honey', 'wild honey', 'organic honey'] }
      ]
    },
    {
      title: 'Dry Fruits & Nuts',
      displayTitle: 'Dry Fruits & Nuts',
      slug: 'dry-fruits-nuts',
      image: 'https://images.unsplash.com/photo-1508061252224-41775b2285b8?w=400&q=80',
      subtitle: 'Almonds, Cashews, Pistachios, Walnuts & Raisins',
      items: [
        { label: 'Almonds', slug: 'almonds', keywords: ['almonds', 'badam', 'california almonds', 'mamra badam'] },
        { label: 'Cashews', slug: 'cashews', keywords: ['cashews', 'kaju', 'whole cashews', 'roasted cashews'] },
        { label: 'Pistachios', slug: 'pistachios', keywords: ['pistachios', 'pista', 'roasted pistachios', 'salted pista'] },
        { label: 'Walnuts', slug: 'walnuts', keywords: ['walnuts', 'akhrot', 'walnut kernels', 'kashmir walnuts'] },
        { label: 'Raisins', slug: 'raisins', keywords: ['raisins', 'kishmish', 'golden raisins', 'black raisins'] }
      ]
    },
    {
      title: 'Breakfast & Cereals',
      displayTitle: 'Breakfast & Cereals',
      slug: 'breakfast-cereals',
      image: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=400&q=80',
      subtitle: 'Corn Flakes, Muesli, Oats, Granola & Breakfast Mixes',
      items: [
        { label: 'Corn Flakes', slug: 'corn-flakes', keywords: ['corn flakes', 'honey corn flakes', 'kelloggs'] },
        { label: 'Muesli', slug: 'muesli', keywords: ['muesli', 'fruit and nut muesli', 'diet muesli'] },
        { label: 'Oats', slug: 'oats', keywords: ['oats', 'rolled oats', 'instant oats', 'masala oats'] },
        { label: 'Granola', slug: 'granola', keywords: ['granola', 'chocolate granola', 'berry granola'] },
        { label: 'Breakfast Mixes', slug: 'breakfast-mixes', keywords: ['breakfast mixes', 'upma mix', 'poha mix', 'idli mix', 'dosa mix'] }
      ]
    },
    {
      title: 'Biscuits & Cookies',
      displayTitle: 'Biscuits & Cookies',
      slug: 'biscuits-cookies',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
      subtitle: 'Cream Biscuits, Marie, Digestive, Cookies & Crackers',
      items: [
        { label: 'Cream Biscuits', slug: 'cream-biscuits', keywords: ['cream biscuits', 'bourbon', 'oreo', 'chocolate biscuits'] },
        { label: 'Marie', slug: 'marie', keywords: ['marie', 'marie gold', 'tea biscuits'] },
        { label: 'Digestive', slug: 'digestive', keywords: ['digestive', 'nutrichoice', 'wheat biscuits', 'fiber biscuits'] },
        { label: 'Cookies', slug: 'cookies', keywords: ['cookies', 'butter cookies', 'chocochip cookies', 'bakery cookies'] },
        { label: 'Crackers', slug: 'crackers', keywords: ['crackers', 'salted crackers', 'cheddar crackers', 'monaco'] }
      ]
    },
    {
      title: 'Snacks & Namkeen',
      displayTitle: 'Snacks & Namkeen',
      slug: 'snacks-namkeen',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
      subtitle: 'Chips, Mixtures, Bhujia, Popcorn & Nachos',
      items: [
        { label: 'Chips', slug: 'chips', keywords: ['chips', 'potato chips', 'lays', 'banana chips'] },
        { label: 'Mixtures', slug: 'mixtures', keywords: ['mixtures', 'bombay mixture', 'kerala mixture', 'navratan mixture'] },
        { label: 'Bhujia', slug: 'bhujia', keywords: ['bhujia', 'aloo bhujia', 'bikaneri bhujia', 'sev'] },
        { label: 'Popcorn', slug: 'popcorn', keywords: ['popcorn', 'butter popcorn', 'cheese popcorn', 'act ii'] },
        { label: 'Nachos', slug: 'nachos', keywords: ['nachos', 'tortilla chips', 'cheese nachos', 'jalapeno nachos'] }
      ]
    },
    {
      title: 'Tea & Coffee',
      displayTitle: 'Tea & Coffee',
      slug: 'tea-coffee',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
      subtitle: 'Tea, Green Tea, Coffee, Instant Coffee & Premixes',
      items: [
        { label: 'Tea', slug: 'tea', keywords: ['tea', 'black tea', 'masala chai', 'assam tea', 'darjeeling tea'] },
        { label: 'Green Tea', slug: 'green-tea', keywords: ['green tea', 'lemon green tea', 'tulsi green tea', 'matcha'] },
        { label: 'Coffee', slug: 'coffee', keywords: ['coffee', 'filter coffee', 'ground coffee', 'roasted coffee beans'] },
        { label: 'Instant Coffee', slug: 'instant-coffee', keywords: ['instant coffee', 'nescafe', 'bru', 'espresso'] },
        { label: 'Tea Premixes', slug: 'tea-premixes', keywords: ['tea premixes', 'cardamom tea premix', 'ginger tea premix', 'coffee premix'] }
      ]
    },
    {
      title: 'Beverages',
      displayTitle: 'Beverages',
      slug: 'beverages',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80',
      subtitle: 'Soft Drinks, Juices, Energy Drinks & Coconut Water',
      items: [
        { label: 'Soft Drinks', slug: 'soft-drinks', keywords: ['soft drinks', 'cola', 'soda', 'lemonade', 'tonic water'] },
        { label: 'Juices', slug: 'juices', keywords: ['juices', 'orange juice', 'apple juice', 'mango juice', 'real juice'] },
        { label: 'Energy Drinks', slug: 'energy-drinks', keywords: ['energy drinks', 'red bull', 'monster', 'sports drinks'] },
        { label: 'Health Drinks', slug: 'health-drinks', keywords: ['health drinks', 'horlicks', 'bournvita', 'complan', 'ensure'] },
        { label: 'Coconut Water', slug: 'coconut-water', keywords: ['coconut water', 'tender coconut water', 'natural coconut water'] }
      ]
    },
    {
      title: 'Dairy & Eggs',
      displayTitle: 'Dairy & Eggs',
      slug: 'dairy-eggs',
      image: 'https://images.unsplash.com/photo-1528732263440-4dd1a18a4cc2?w=400&q=80',
      subtitle: 'Milk, Curd, Paneer, Butter, Cheese & Eggs',
      items: [
        { label: 'Milk', slug: 'milk', keywords: ['milk', 'toned milk', 'full cream milk', 'cow milk', 'almond milk'] },
        { label: 'Curd', slug: 'curd', keywords: ['curd', 'dahi', 'greek yogurt', 'probiotic curd'] },
        { label: 'Paneer', slug: 'paneer', keywords: ['paneer', 'cottage cheese', 'fresh paneer', 'malai paneer'] },
        { label: 'Butter', slug: 'butter', keywords: ['butter', 'salted butter', 'unsalted butter', 'white butter'] },
        { label: 'Cheese', slug: 'cheese', keywords: ['cheese', 'cheese slices', 'mozzarella', 'cheddar cheese', 'cheese block'] },
        { label: 'Eggs', slug: 'eggs', keywords: ['eggs', 'farm fresh eggs', 'brown eggs', 'organic eggs'] }
      ]
    },
    {
      title: 'Bakery Products',
      displayTitle: 'Bakery Products',
      slug: 'bakery-products',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
      subtitle: 'Bread, Buns, Cakes, Muffins & Croissants',
      items: [
        { label: 'Bread', slug: 'bread', keywords: ['bread', 'white bread', 'brown bread', 'whole wheat bread', 'multigrain bread'] },
        { label: 'Buns', slug: 'buns', keywords: ['buns', 'burger buns', 'pav', 'sweet buns'] },
        { label: 'Cakes', slug: 'cakes', keywords: ['cakes', 'plum cake', 'sponge cake', 'tea cake', 'cupcakes'] },
        { label: 'Muffins', slug: 'muffins', keywords: ['muffins', 'chocochip muffins', 'blueberry muffins'] },
        { label: 'Croissants', slug: 'croissants', keywords: ['croissants', 'butter croissants', 'chocolate croissants'] }
      ]
    },
    {
      title: 'Fresh Fruits',
      displayTitle: 'Fresh Fruits',
      slug: 'fresh-fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80',
      subtitle: 'Apples, Bananas, Oranges, Grapes, Mangoes & Berries',
      items: [
        { label: 'Apples', slug: 'apples', keywords: ['apples', 'shimla apples', 'kashmir apples', 'green apples'] },
        { label: 'Bananas', slug: 'bananas', keywords: ['bananas', 'robusta bananas', 'yelakki bananas'] },
        { label: 'Oranges', slug: 'oranges', keywords: ['oranges', 'nagpur oranges', 'mosambi', 'tangerines'] },
        { label: 'Grapes', slug: 'grapes', keywords: ['grapes', 'green grapes', 'black grapes', 'seedless grapes'] },
        { label: 'Mangoes', slug: 'mangoes', keywords: ['mangoes', 'alphonso', 'kesar mango', 'banganapalli'] },
        { label: 'Berries', slug: 'berries', keywords: ['berries', 'strawberries', 'blueberries', 'raspberries'] }
      ]
    },
    {
      title: 'Fresh Vegetables',
      displayTitle: 'Fresh Vegetables',
      slug: 'fresh-vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
      subtitle: 'Leafy, Root Vegetables, Tomatoes, Onions & Potatoes',
      items: [
        { label: 'Leafy Vegetables', slug: 'leafy-vegetables', keywords: ['leafy vegetables', 'spinach', 'palak', 'coriander', 'methi'] },
        { label: 'Root Vegetables', slug: 'root-vegetables', keywords: ['root vegetables', 'carrots', 'radish', 'beetroot', 'turnip'] },
        { label: 'Tomatoes', slug: 'tomatoes', keywords: ['tomatoes', 'hybrid tomatoes', 'desi tomatoes', 'cherry tomatoes'] },
        { label: 'Onions', slug: 'onions', keywords: ['onions', 'red onions', 'shallots', 'white onions'] },
        { label: 'Potatoes', slug: 'potatoes', keywords: ['potatoes', 'baby potatoes', 'sweet potatoes'] }
      ]
    },
    {
      title: 'Instant & Ready-to-Eat',
      displayTitle: 'Instant & Ready-to-Eat',
      slug: 'instant-ready-to-eat',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80',
      subtitle: 'Noodles, Pasta, Instant Meals, Soups & Ready Mixes',
      items: [
        { label: 'Noodles', slug: 'noodles', keywords: ['noodles', 'maggi', 'instant noodles', 'ramen', 'hakka noodles'] },
        { label: 'Pasta', slug: 'pasta', keywords: ['pasta', 'penne pasta', 'fusilli', 'macaroni', 'spaghetti'] },
        { label: 'Instant Meals', slug: 'instant-meals', keywords: ['instant meals', 'ready to eat', 'poha', 'khichdi', 'biryani'] },
        { label: 'Soups', slug: 'soups', keywords: ['soups', 'instant soup', 'tomato soup', 'sweet corn soup', 'knorr'] },
        { label: 'Ready Mixes', slug: 'ready-mixes', keywords: ['ready mixes', 'gulab jamun mix', 'dosa mix', 'cake mix'] }
      ]
    },
    {
      title: 'Sauces & Spreads',
      displayTitle: 'Sauces & Spreads',
      slug: 'sauces-spreads',
      image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=400&q=80',
      subtitle: 'Ketchup, Mayonnaise, Jam, Peanut Butter & Chutneys',
      items: [
        { label: 'Ketchup', slug: 'ketchup', keywords: ['ketchup', 'tomato sauce', 'hot and sweet ketchup', 'kissan'] },
        { label: 'Mayonnaise', slug: 'mayonnaise', keywords: ['mayonnaise', 'eggless mayo', 'garlic mayo', 'veeba'] },
        { label: 'Jam', slug: 'jam', keywords: ['jam', 'mixed fruit jam', 'strawberry jam', 'kissan jam'] },
        { label: 'Peanut Butter', slug: 'peanut-butter', keywords: ['peanut butter', 'crunchy peanut butter', 'creamy peanut butter', 'pintola'] },
        { label: 'Chutneys', slug: 'chutneys', keywords: ['chutneys', 'mint chutney', 'tamarind chutney', 'schezwan sauce'] }
      ]
    },
    {
      title: 'Frozen Foods',
      displayTitle: 'Frozen Foods',
      slug: 'frozen-foods',
      image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&q=80',
      subtitle: 'Frozen Vegetables, Snacks, Meat & Ice Cream',
      items: [
        { label: 'Frozen Vegetables', slug: 'frozen-vegetables', keywords: ['frozen vegetables', 'green peas', 'sweet corn', 'mixed vegetables'] },
        { label: 'Frozen Snacks', slug: 'frozen-snacks', keywords: ['frozen snacks', 'french fries', 'smiles', 'mccain', 'nuggets'] },
        { label: 'Frozen Meat', slug: 'frozen-meat', keywords: ['frozen meat', 'chicken nuggets', 'sausages', 'salami'] },
        { label: 'Ice Cream', slug: 'ice-cream', keywords: ['ice cream', 'vanilla ice cream', 'chocolate tub', 'kulfi', 'amul ice cream'] }
      ]
    },
    {
      title: 'Meat & Seafood',
      displayTitle: 'Meat & Seafood',
      slug: 'meat-seafood',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80',
      subtitle: 'Chicken, Mutton, Fish, Prawns & Ready-to-Cook',
      items: [
        { label: 'Chicken', slug: 'chicken', keywords: ['chicken', 'chicken curry cut', 'boneless chicken breast', 'chicken drumsticks'] },
        { label: 'Mutton', slug: 'mutton', keywords: ['mutton', 'goat meat', 'mutton curry cut', 'mutton chops'] },
        { label: 'Fish', slug: 'fish', keywords: ['fish', 'rohu', 'catla', 'salmon', 'pomfret', 'surmai'] },
        { label: 'Prawns', slug: 'prawns', keywords: ['prawns', 'shrimp', 'tiger prawns', 'cleaned prawns'] },
        { label: 'Ready-to-Cook Meat', slug: 'ready-to-cook-meat', keywords: ['ready to cook meat', 'marinated chicken', 'seekh kebab', 'chicken tikka'] }
      ]
    },
    {
      title: 'Baby Food',
      displayTitle: 'Baby Food',
      slug: 'baby-food',
      image: 'https://images.unsplash.com/photo-1594824813579-4509e53dd834?w=400&q=80',
      subtitle: 'Baby Cereals, Formula, Baby Snacks & Purees',
      items: [
        { label: 'Baby Cereals', slug: 'baby-cereals', keywords: ['baby cereals', 'cerelac', 'rice cereal', 'wheat apple cereal'] },
        { label: 'Formula', slug: 'formula', keywords: ['baby formula', 'infant formula', 'nan pro', 'lactogen', 'similac'] },
        { label: 'Baby Snacks', slug: 'baby-snacks', keywords: ['baby snacks', 'teething wafers', 'baby puffs', 'organic baby biscuits'] },
        { label: 'Purees', slug: 'purees', keywords: ['baby purees', 'fruit puree', 'vegetable puree', 'organic puree pouches'] }
      ]
    }
  ],

  'pet-accessories': [
    {
      title: 'Dog Supplies',
      displayTitle: 'Dog Supplies',
      slug: 'dog-supplies',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80',
      subtitle: 'Food, Treats, Leashes, Harnesses & Toys',
      items: [
        { label: 'Dog Food', slug: 'dog-food', keywords: ['dog food', 'pedigree', 'royal canin', 'puppy food', 'dry dog food'] },
        { label: 'Dog Treats & Chews', slug: 'dog-treats', keywords: ['dog treats', 'chew sticks', 'calcium bones', 'jerky'] },
        { label: 'Collars, Leashes & Harnesses', slug: 'dog-collars-leashes', keywords: ['dog collar', 'dog leash', 'dog harness', 'reflective leash'] },
        { label: 'Dog Toys', slug: 'dog-toys', keywords: ['dog toys', 'chew toys', 'squeaky ball', 'rope toy'] },
        { label: 'Dog Beds & Crates', slug: 'dog-beds', keywords: ['dog bed', 'dog crate', 'orthopedic dog bed', 'pet mat'] }
      ]
    },
    {
      title: 'Cat Supplies',
      displayTitle: 'Cat Supplies',
      slug: 'cat-supplies',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
      subtitle: 'Food, Litter, Scratchers & Cat Toys',
      items: [
        { label: 'Cat Food & Treats', slug: 'cat-food', keywords: ['cat food', 'whiskas', 'sheba', 'gravy cat food', 'cat treats'] },
        { label: 'Cat Litter & Boxes', slug: 'cat-litter', keywords: ['cat litter', 'litter tray', 'bentonite litter', 'odor control litter'] },
        { label: 'Scratchers & Trees', slug: 'cat-scratchers', keywords: ['cat tree', 'scratching post', 'sisal scratcher', 'cat condo'] },
        { label: 'Cat Toys & Teasers', slug: 'cat-toys', keywords: ['cat toys', 'cat teaser', 'laser pointer', 'catnip mice'] },
        { label: 'Cat Collars & Harnesses', slug: 'cat-collars', keywords: ['cat collar', 'cat bell collar', 'cat harness'] }
      ]
    },
    {
      title: 'Pet Grooming & Hygiene',
      displayTitle: 'Pet Grooming & Hygiene',
      slug: 'pet-grooming-hygiene',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80',
      subtitle: 'Shampoos, Brushes, Clippers & Wipes',
      items: [
        { label: 'Pet Shampoos & Conditioners', slug: 'pet-shampoo', keywords: ['pet shampoo', 'dog shampoo', 'anti-tick shampoo', 'flea shampoo'] },
        { label: 'Brushes & Deshedders', slug: 'pet-brushes', keywords: ['pet brush', 'deshedding tool', 'furminator', 'pin brush'] },
        { label: 'Nail Clippers & Trimmers', slug: 'nail-clippers', keywords: ['nail clippers', 'pet nail grinder', 'claw trimmer'] },
        { label: 'Pet Wipes & Odor Sprays', slug: 'pet-wipes', keywords: ['pet wipes', 'paw wipes', 'odor neutralizer spray'] }
      ]
    },
    {
      title: 'Pet Bowls & Feeders',
      displayTitle: 'Pet Bowls & Feeders',
      slug: 'pet-feeding-accessories',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&q=80',
      subtitle: 'Feeding Bowls, Automatic Dispensers & Fountains',
      items: [
        { label: 'Feeding Bowls & Dishes', slug: 'pet-bowls', keywords: ['pet bowl', 'stainless steel dog bowl', 'slow feeder bowl', 'anti-skid bowl'] },
        { label: 'Water Dispensers & Fountains', slug: 'pet-fountains', keywords: ['pet fountain', 'automatic water dispenser', 'water feeder'] },
        { label: 'Travel Feeders & Bottles', slug: 'travel-feeders', keywords: ['travel pet bottle', 'collapsible bowl', 'portable pet feeder'] }
      ]
    },
    {
      title: 'Small Pets, Birds & Fish',
      displayTitle: 'Birds, Fish & Small Pets',
      slug: 'birds-fish-supplies',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&q=80',
      subtitle: 'Bird Food, Fish Feed, Aquariums & Accessories',
      items: [
        { label: 'Bird Food & Cages', slug: 'bird-supplies', keywords: ['bird food', 'bird seeds', 'bird cage', 'perch', 'bird feeder'] },
        { label: 'Fish Food & Aquariums', slug: 'fish-supplies', keywords: ['fish food', 'fish flakes', 'aquarium filter', 'fish tank decor'] },
        { label: 'Small Animals & Hamster Supplies', slug: 'small-pet-supplies', keywords: ['hamster food', 'hamster cage', 'guinea pig feed', 'rabbit hay'] }
      ]
    }
  ],


  'stationary': [
    {
      title: 'Stationery',
      displayTitle: 'Stationery',
      slug: 'stationery',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
      subtitle: 'Notebooks, planners, files & desk supplies',
      items: [
        { label: 'Spiral Notebooks', slug: 'spiral-notebooks', keywords: ['spiral notebook'] },
        { label: 'Planners', slug: 'planners', keywords: ['planner'] },
        { label: 'Files & Folders', slug: 'files-folders', keywords: ['file folder'] },
        { label: 'Staplers', slug: 'staplers', keywords: ['stapler'] },
        { label: 'Journals', slug: 'journals', keywords: ['journal'] }
      ]
    }
  ],

  'gifts': [
    {
      title: 'Gifts & Hampers',
      displayTitle: 'Gifts & Hampers',
      slug: 'gifts',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
      subtitle: 'Festive gifts, curated sets & celebration hampers',
      items: [
        { label: 'Festive Gifts', slug: 'festive-gifts', keywords: ['festive gift'] },
        { label: 'Gift Sets', slug: 'gift-sets', keywords: ['gift set', 'hamper'] }
      ]
    }
  ],

  'jewellery': [
    {
      title: 'Jewellery & Fine Watches',
      displayTitle: 'Jewellery',
      slug: 'jewellery',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
      subtitle: 'Earrings, Necklaces, Rings & Bangles',
      items: [
        { label: 'Earrings & Studs', slug: 'earrings', keywords: ['earrings', 'jhumkas', 'studs', 'hoops'] },
        { label: 'Necklaces & Pendants', slug: 'necklaces-pendants', keywords: ['necklace', 'pendant', 'chain', 'choker'] },
        { label: 'Rings & Bracelets', slug: 'rings', keywords: ['ring', 'bracelet', 'bangle', 'kada'] }
      ]
    }
  ],

  'kids': [
    {
      title: 'Boys Collection',
      displayTitle: 'Boys Collection',
      slug: 'boys-clothing',
      image: 'https://media.landmarkshops.in/cdn-cgi/image/h=739,w=499,q=85,fit=cover/max-new/1000016828227-Purple-PURPLE-1000016828227_05-2100.jpg',
      subtitle: 'T-Shirts, Shirts, Jeans, Shorts & Ethnic Sets',
      items: [
        { label: 'T-Shirts & Shirts', slug: 'shirts-tshirts', keywords: ['boys t-shirt', 'boys shirt', 't-shirt', 'shirts'] },
        { label: 'Jeans & Shorts', slug: 'jeans-shorts', keywords: ['boys jeans', 'boys shorts', 'denim', 'shorts'] },
        { label: 'Boys Ethnic Sets', slug: 'ethnic-sets', keywords: ['boys ethnic', 'kurta pajama', 'ethnic set', 'kurta'] }
      ]
    },
    {
      title: 'Girls Fashion',
      displayTitle: 'Girls Fashion',
      slug: 'girls-clothing',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTUPtppA0MXuDucEw208YIAzr-2F-E1mEQVJMRzFrGA&s=10',
      subtitle: 'Dresses, Tops, Skirts & Ethnic Wear',
      items: [
        { label: 'Dresses & Frocks', slug: 'dresses-frocks', keywords: ['dresses', 'frocks', 'gown', 'party frock'] },
        { label: 'Tops & Skirts', slug: 'tops-skirts', keywords: ['tops and skirts', 'skirt set', 'crop top'] },
        { label: 'Girls Ethnic Wear', slug: 'ethnic-sets', keywords: ['girls ethnic', 'lehenga', 'choli', 'anarkali', 'sharara'] }
      ]
    },
    {
      title: 'Baby & Footwear',
      displayTitle: 'Baby & Footwear',
      slug: 'baby-footwear',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIk7JlIs9zMtIwHY2iyCor-9WeAQMPyKJo4JkavMs1A&s=10',
      subtitle: 'Rompers, Onesies, Casual Shoes & Sandals',
      items: [
        { label: 'Baby Rompers & Onesies', slug: 'baby-clothes', keywords: ['baby rompers', 'onesies', 'infant', 'bodysuit'] },
        { label: 'Kids Casual Shoes', slug: 'casual-shoes', keywords: ['kids casual shoes', 'sneakers', 'sports shoes'] },
        { label: 'Kids Sandals & Slippers', slug: 'sandals', keywords: ['sandals', 'slippers', 'clogs', 'floaters'] }
      ]
    }
  ],

  'pooja-items': [
    {
      title: 'Idols & Mandir',
      displayTitle: 'Idols & Mandir',
      slug: 'idols-mandir',
      image: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=400&q=80',
      subtitle: 'Brass Idols, Mandirs, Puja Thalis & Bells',
      items: [
        { label: 'Brass Idols & Statues', slug: 'idols-statues', keywords: ['brass idol', 'statue', 'ganesha', 'murti'] },
        { label: 'Home Temple / Mandir', slug: 'home-temple-mandir', keywords: ['mandir', 'home temple', 'temple'] },
        { label: 'Puja Thalis & Bells', slug: 'thalis', keywords: ['thali', 'puja thali', 'bell', 'ghanti'] },
        { label: 'Brass & Silver Items', slug: 'brass-silver-pooja-items', keywords: ['brass', 'silver', 'kalash', 'lota'] }
      ]
    },
    {
      title: 'Daily Puja Essentials',
      displayTitle: 'Daily Puja Essentials',
      slug: 'daily-puja-essentials',
      image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400&q=80',
      subtitle: 'Diyas, Incense, Samagri, Rudraksha & Kits',
      items: [
        { label: 'Brass Diyas & Deepams', slug: 'diyas-lamps', keywords: ['diya', 'deepam', 'kuthu vilakku', 'akhand diya'] },
        { label: 'Incense & Fragrance', slug: 'incense-fragrance', keywords: ['agarbatti', 'dhoop', 'sambrani', 'incense'] },
        { label: 'Pooja Samagri & Camphor', slug: 'pooja-samagri', keywords: ['camphor', 'bhimseni', 'havan samagri', 'batti'] },
        { label: 'Rudraksha & Spiritual Items', slug: 'rudraksha-spiritual', keywords: ['rudraksha', 'mala', 'sphatik', 'yantra'] },
        { label: 'Festival Pooja Kits', slug: 'festival-pooja-kits', keywords: ['pooja kit', 'festival kit', 'diwali kit'] }
      ]
    }
  ],

  'pet-accessories': [
    {
      title: 'Dog Supplies',
      displayTitle: 'Dog Supplies',
      slug: 'dog-supplies',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
      subtitle: 'Dog Food, Treats, Collars, Toys & Beds',
      items: [
        { label: 'Dog Food & Nutrition', slug: 'dog-food', keywords: ['dog food', 'pedigree', 'pet food', 'kibble', 'petkonnect', 'chicken veg'] },
        { label: 'Dog Treats & Chews', slug: 'dog-treats', keywords: ['dog treats', 'chews', 'greenies', 'biscuits', 'dental treats', 'dogchild'] },
        { label: 'Collars, Leashes & Harnesses', slug: 'dog-collars-leashes', keywords: ['collar', 'leash', 'harness', 'dog collar', 'dog leash', 'dog harness', 'collars-leashes', 'barks and wags'] },
        { label: 'Dog Toys & Play', slug: 'dog-toys', keywords: ['dog toy', 'chew toy', 'rubber ball', 'kong', 'interactive toy', 'fetch'] },
        { label: 'Dog Beds & Crates', slug: 'dog-beds', keywords: ['dog bed', 'dog crate', 'orthopedic bed', 'bolster bed', 'wire crate', 'cage'] }
      ]
    },
    {
      title: 'Cat Supplies',
      displayTitle: 'Cat Supplies',
      slug: 'cat-supplies',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
      subtitle: 'Cat Food, Treats, Litter, Scratchers, Toys & Collars',
      items: [
        { label: 'Cat Food & Treats', slug: 'cat-food', keywords: ['cat food', 'cat treats', 'salmon', 'jerky', 'whole life', 'first meow'] },
        { label: 'Cat Litter & Trays', slug: 'cat-litter', keywords: ['cat litter', 'litter box', 'litter tray', 'scoop', 'catit'] },
        { label: 'Scratchers & Trees', slug: 'cat-scratchers', keywords: ['cat scratcher', 'scratching post', 'cat tree', 'sisal', 'trixie'] },
        { label: 'Cat Toys & Teasers', slug: 'cat-toys', keywords: ['cat toy', 'teaser wand', 'feather toy', 'tumbler', 'gigwi'] },
        { label: 'Cat Collars & Harnesses', slug: 'cat-collars', keywords: ['cat collar', 'cat harness', 'breakaway collar', 'bell', 'petsafe'] }
      ]
    },
    {
      title: 'Grooming & Feeding',
      displayTitle: 'Grooming & Feeding',
      slug: 'grooming-feeding',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
      subtitle: 'Shampoos, Brushes, Clippers, Bowls & Small Pets',
      items: [
        { label: 'Pet Shampoos & Hygiene', slug: 'pet-shampoo', keywords: ['pet shampoo', 'dog shampoo', 'cat shampoo', 'care best', 'anti-hairfall'] },
        { label: 'Brushes & Deshedders', slug: 'pet-brushes', keywords: ['pet brush', 'deshedder', 'dematting rake', 'grooming rake', 'pet-a-pet'] },
        { label: 'Nail Clippers & Trimmers', slug: 'nail-clippers', keywords: ['nail clipper', 'claw trimmer', 'nail file', 'narz'] },
        { label: 'Feeding Bowls & Fountains', slug: 'pet-bowls', keywords: ['pet bowl', 'water fountain', 'elevated bowl', 'travel water bottle', 'catit'] },
        { label: 'Birds, Fish & Small Pets', slug: 'birds-fish-supplies', keywords: ['bird cage', 'fish supplies', 'small pets', 'breeding cage', 'perch'] }
      ]
    }
  ]
};

// Map aliases
categorySections['electronics'] = categorySections['gadgets'];
categorySections['home-kitchen'] = categorySections['home-living'];
categorySections['pooja'] = categorySections['pooja-items'];
categorySections['fashion'] = categorySections['clothing'];
categorySections['stationery'] = categorySections['stationary'];
categorySections['grocery'] = categorySections['grocery-items'];
categorySections['groceries'] = categorySections['grocery-items'];
categorySections['pet'] = categorySections['pet-accessories'];
categorySections['pets'] = categorySections['pet-accessories'];

/**
 * Flat categorySubcategories mapping
 */
export const categorySubcategories = Object.entries(categorySections).reduce((acc, [catSlug, sections]) => {
  const flatList = [];
  const seen = new Set();
  (sections || []).forEach(sec => {
    (sec.items || []).forEach(item => {
      const key = item.slug + '-' + sec.slug;
      if (!seen.has(key)) {
        seen.add(key);
        flatList.push({
          ...item,
          section: sec.title,
          sectionSlug: sec.slug
        });
      }
    });
  });
  acc[catSlug] = flatList;
  return acc;
}, {});

/**
 * Primary Department Mega Menu Catalog
 * Clean, structured 4-5 column mega menus for Header and Category sidebar navigation
 */
export const departmentMegaMenu = {
  'men': {
    id: 'men',
    label: 'MEN',
    slug: 'men',
    defaultCollection: 'clothing',
    quickPicks: [
      { label: 'WESTERN WEAR', slug: 'western-wear', target: '/collection/western-wear?section=men' },
      { label: 'SHIRTS BOUTIQUE', slug: 'shirts', target: '/collection/clothing?section=men&subcategory=shirts' },
      { label: 'DENIMS & JEANS', slug: 'jeans', target: '/collection/clothing?section=men&subcategory=jeans-jeggings' },
      { label: 'FOOTWEAR', slug: 'footwear', target: '/collection/footwear?section=men' },
      { label: 'ACCESSORIES', slug: 'accessories', target: '/collection/accessories?section=men' }
    ],
    sections: [
      {
        title: 'WESTERN WEAR',
        slug: 'western-wear',
        category: 'western-wear',
        items: [
          { label: 'Shirts', slug: 'shirts', query: 'shirts' },
          { label: 'T-Shirts & Polos', slug: 't-shirts', query: 't-shirts' },
          { label: 'Jeans & Denims', slug: 'jeans-jeggings', query: 'jeans' },
          { label: 'Trousers & Chinos', slug: 'trousers-pants', query: 'trousers' },
          { label: 'Jackets & Blazers', slug: 'jackets', query: 'jackets' },
          { label: 'Track Pants & Joggers', slug: 'track-pants', query: 'track pants' }
        ]
      },
      {
        title: 'FOOTWEAR',
        slug: 'footwear',
        category: 'footwear',
        items: [
          { label: 'Sneakers & Sports', slug: 'sneakers', query: 'sneakers' },
          { label: 'Casual Shoes & Loafers', slug: 'casual-shoes', query: 'casual shoes' },
          { label: 'Formal Shoes & Boots', slug: 'formal-shoes', query: 'formal shoes' },
          { label: 'Sandals & Slides', slug: 'sandals', query: 'sandals' }
        ]
      },
      {
        title: 'ETHNIC WEAR',
        slug: 'ethnic-wear',
        category: 'ethnic-wear',
        items: [
          { label: 'Kurtas & Kurta Sets', slug: 'kurtas', query: 'kurtas' },
          { label: 'Nehru Jackets & Waistcoats', slug: 'ethnic-jackets', query: 'nehru jacket' },
          { label: 'Sherwani Sets', slug: 'sherwani-sets', query: 'sherwani' }
        ]
      },
      {
        title: 'ACCESSORIES',
        slug: 'accessories',
        category: 'accessories',
        items: [
          { label: 'Watches', slug: 'watches', query: 'watches' },
          { label: 'Sunglasses', slug: 'sunglasses', query: 'sunglasses' },
          { label: 'Wallets & Belts', slug: 'wallets', query: 'wallets' },
          { label: 'Backpacks & Bags', slug: 'backpacks', query: 'backpacks' }
        ]
      }
    ],
    brands: [
      { name: 'Nike', slug: 'nike' },
      { name: 'Adidas', slug: 'adidas' },
      { name: 'Puma', slug: 'puma' },
      { name: "Levi's", slug: 'levis' },
      { name: 'Tommy Hilfiger', slug: 'tommy-hilfiger' },
      { name: 'U.S. Polo Assn.', slug: 'us-polo' },
      { name: 'Netplay', slug: 'netplay' },
      { name: 'Dennis Lingo', slug: 'dennis-lingo' }
    ]
  },

  'women': {
    id: 'women',
    label: 'WOMEN',
    slug: 'women',
    defaultCollection: 'clothing',
    quickPicks: [
      { label: 'WESTERN WEAR', slug: 'western-wear', target: '/collection/western-wear?section=women' },
      { label: 'DRESSES & GOWNS', slug: 'dresses', target: '/collection/clothing?section=women&subcategory=dresses' },
      { label: 'ETHNIC & SAREES', slug: 'ethnic-wear', target: '/collection/ethnic-wear?section=women' },
      { label: 'FOOTWEAR', slug: 'footwear', target: '/collection/footwear?section=women' },
      { label: 'BEAUTY & CARE', slug: 'beauty', target: '/collection/beauty' }
    ],
    sections: [
      {
        title: 'WESTERN WEAR',
        slug: 'western-wear',
        category: 'western-wear',
        items: [
          { label: 'Dresses & Gowns', slug: 'dresses', query: 'dresses' },
          { label: 'Tops & Blouses', slug: 'tops', query: 'tops' },
          { label: 'Jeans & Jeggings', slug: 'jeans-jeggings', query: 'jeans' },
          { label: 'Co-ord Sets', slug: 'co-ord-sets', query: 'co-ord sets' },
          { label: 'Trousers & Pants', slug: 'trousers-pants', query: 'trousers' },
          { label: 'Jackets & Shrugs', slug: 'jackets', query: 'jackets' }
        ]
      },
      {
        title: 'ETHNIC WEAR',
        slug: 'ethnic-wear',
        category: 'ethnic-wear',
        items: [
          { label: 'Sarees', slug: 'sarees', query: 'sarees' },
          { label: 'Blouses', slug: 'blouses', query: 'blouses' },
          { label: 'Kurtas & Kurtis', slug: 'kurtas', query: 'kurtas' },
          { label: 'Kurta Suit Sets', slug: 'kurta-suit-sets', query: 'kurta set' },
          { label: 'Lehenga Choli', slug: 'lehenga-choli-sets', query: 'lehenga' }
        ]
      },
      {
        title: 'SAREE STYLES',
        slug: 'saree-styles',
        category: 'ethnic-wear',
        items: [
          { label: 'Silk Sarees', slug: 'sarees', childCategory: 'silk-sarees' },
          { label: 'Kanjivaram Sarees', slug: 'sarees', childCategory: 'kanjivaram-sarees' },
          { label: 'Banarasi Sarees', slug: 'sarees', childCategory: 'banarasi-sarees' },
          { label: 'Cotton Sarees', slug: 'sarees', childCategory: 'cotton-sarees' },
          { label: 'Bridal Sarees', slug: 'sarees', childCategory: 'bridal-sarees' },
          { label: 'Party Wear Sarees', slug: 'sarees', childCategory: 'party-wear-sarees' },
          { label: 'Wedding Sarees', slug: 'sarees', childCategory: 'wedding-sarees' },
          { label: 'Festive Wear Sarees', slug: 'sarees', childCategory: 'festive-wear-sarees' },
          { label: 'Daily Wear Sarees', slug: 'sarees', childCategory: 'daily-wear-sarees' },
          { label: 'Lightweight Sarees', slug: 'sarees', childCategory: 'lightweight-sarees' },
          { label: 'Handloom Sarees', slug: 'sarees', childCategory: 'handloom-sarees' }
        ]
      },
      {
        title: 'FOOTWEAR',
        slug: 'footwear',
        category: 'footwear',
        items: [
          { label: 'Block Heels & Wedges', slug: 'heels', query: 'heels' },
          { label: 'Flat Sandals & Slides', slug: 'flats', query: 'flats' },
          { label: 'Sneakers & Casuals', slug: 'sneakers', query: 'sneakers' },
          { label: 'Boots', slug: 'boots', query: 'boots' }
        ]
      },
      {
        title: 'HANDBAGS & ACCESSORIES',
        slug: 'accessories',
        category: 'accessories',
        items: [
          { label: 'Handbags & Totes', slug: 'handbags', query: 'handbags' },
          { label: 'Clutches & Slings', slug: 'clutches-wristlets', query: 'clutches' },
          { label: 'Fashion Jewellery', slug: 'jewellery', query: 'jewellery' },
          { label: 'Sunglasses', slug: 'sunglasses', query: 'sunglasses' }
        ]
      }
    ],
    brands: [
      { name: 'Vero Moda', slug: 'vero-moda' },
      { name: 'ONLY', slug: 'only' },
      { name: 'MANGO', slug: 'mango' },
      { name: 'Zara', slug: 'zara' },
      { name: 'H&M', slug: 'hm' },
      { name: 'Biba', slug: 'biba' },
      { name: 'Fabindia', slug: 'fabindia' }
    ]
  },

  'kids': {
    id: 'kids',
    label: 'KIDS',
    slug: 'kids',
    defaultCollection: 'kids',
    quickPicks: [
      { label: 'BOYS APPAREL', slug: 'boys', target: '/collection/kids?subcategory=boys-clothing' },
      { label: 'GIRLS APPAREL', slug: 'girls', target: '/collection/kids?subcategory=girls-clothing' },
      { label: 'INFANT & BABY', slug: 'baby', target: '/collection/kids?subcategory=baby-clothes' },
      { label: 'KIDS FOOTWEAR', slug: 'footwear', target: '/collection/kids?section=footwear' }
    ],
    sections: [
      {
        title: 'BOYS COLLECTION',
        slug: 'boys-clothing',
        category: 'kids',
        items: [
          { label: 'Boys T-Shirts & Polos', slug: 'shirts-tshirts', query: 'boys t-shirts' },
          { label: 'Boys Jeans & Shorts', slug: 'jeans-shorts', query: 'boys jeans' },
          { label: 'Boys Ethnic Sets', slug: 'ethnic-sets', query: 'boys kurta' }
        ]
      },
      {
        title: 'GIRLS COLLECTION',
        slug: 'girls-clothing',
        category: 'kids',
        items: [
          { label: 'Girls Dresses & Frocks', slug: 'dresses-frocks', query: 'girls dress' },
          { label: 'Girls Tops & Skirts', slug: 'tops-skirts', query: 'girls tops' },
          { label: 'Girls Ethnic Sets', slug: 'ethnic-sets', query: 'girls ethnic' }
        ]
      },
      {
        title: 'BABY & FOOTWEAR',
        slug: 'baby-clothes',
        category: 'kids',
        items: [
          { label: 'Baby Rompers & Onesies', slug: 'baby-clothes', query: 'baby clothes' },
          { label: 'Kids Casual Shoes', slug: 'casual-shoes', query: 'kids shoes' },
          { label: 'Kids Sandals & Slippers', slug: 'sandals', query: 'kids sandals' }
        ]
      }
    ],
    brands: [
      { name: 'Mothercare', slug: 'mothercare' },
      { name: 'Gini & Jony', slug: 'gini-jony' },
      { name: 'U.S. Polo Kids', slug: 'us-polo-kids' },
      { name: 'H&M Kids', slug: 'hm-kids' }
    ]
  },

  'beauty': {
    id: 'beauty',
    label: 'BEAUTY',
    slug: 'beauty',
    defaultCollection: 'beauty',
    quickPicks: [
      { label: 'SKINCARE', slug: 'skincare', target: '/collection/beauty?subcategory=face-creams-moisturizers' },
      { label: 'HAIRCARE', slug: 'haircare', target: '/collection/beauty?subcategory=shampoo-conditioner' },
      { label: 'FRAGRANCES', slug: 'perfumes-deodorants', target: '/collection/beauty?subcategory=perfumes-deodorants' }
    ],
    sections: [
      {
        title: 'SKINCARE',
        slug: 'skincare',
        category: 'beauty',
        items: [
          { label: 'Face Creams & Moisturizers', slug: 'face-creams-moisturizers', query: 'face-creams-moisturizers' },
          { label: 'Face Wash & Cleansers', slug: 'face-wash-cleansers', query: 'face-wash-cleansers' },
          { label: 'Sunscreen & Serums', slug: 'sunscreen-serums', query: 'sunscreen-serums' }
        ]
      },
      {
        title: 'HAIRCARE',
        slug: 'haircare',
        category: 'beauty',
        items: [
          { label: 'Shampoos & Conditioners', slug: 'shampoo-conditioner', query: 'shampoo-conditioner' },
          { label: 'Hair Oils & Serums', slug: 'hair-oils-serums', query: 'hair-oils-serums' }
        ]
      },
      {
        title: 'FRAGRANCES & GROOMING',
        slug: 'fragrances-grooming',
        category: 'beauty',
        items: [
          { label: 'Perfumes & Deodorants', slug: 'perfumes-deodorants', query: 'perfumes-deodorants' },
          { label: 'Body Mists & Sprays', slug: 'body-mists-sprays', query: 'body-mists-sprays' },
          { label: 'Men Grooming & Shaving', slug: 'men-grooming-shaving', query: 'men-grooming-shaving' }
        ]
      }
    ],
    brands: [
      { name: "Plum", slug: 'plum' },
      { name: "Dr. Sheth's", slug: 'dr-sheths' },
      { name: 'Nat Habit', slug: 'nat-habit' },
      { name: 'Moroccanoil', slug: 'moroccanoil' },
      { name: 'Beardo', slug: 'beardo' },
      { name: 'Bombay Shaving Co', slug: 'bombay-shaving-company' }
    ]
  },

  'home-living': {
    id: 'home-living',
    label: 'HOME & LIVING',
    slug: 'home-living',
    defaultCollection: 'home-living',
    quickPicks: [
      { label: 'KITCHENWARE', slug: 'kitchen', target: '/collection/home-living?section=kitchen-dining' },
      { label: 'BED LINEN & FURNISHING', slug: 'furnishing', target: '/collection/home-living?section=home-furnishing' },
      { label: 'HOME DÉCOR', slug: 'decor', target: '/collection/home-living?section=home-decor' }
    ],
    sections: [
      {
        title: 'KITCHEN & DINING',
        slug: 'kitchen-dining',
        category: 'home-living',
        items: [
          { label: 'Cookware & Utensils', slug: 'cookware-utensils', query: 'cookware' },
          { label: 'Dinner Sets & Plates', slug: 'dinner-sets', query: 'dinnerware' },
          { label: 'Storage Containers', slug: 'storage-containers', query: 'storage' },
          { label: 'Water Bottles & Flasks', slug: 'water-bottles', query: 'water bottles' }
        ]
      },
      {
        title: 'HOME FURNISHING',
        slug: 'home-furnishing',
        category: 'home-living',
        items: [
          { label: 'Bed Linen & Sheets', slug: 'bedsheets', query: 'bedsheets' },
          { label: 'Curtains & Drapes', slug: 'curtains', query: 'curtains' },
          { label: 'Cushions & Covers', slug: 'cushions', query: 'cushions' },
          { label: 'Blankets & Quilts', slug: 'blankets-quilts', query: 'blankets' }
        ]
      },
      {
        title: 'HOME DÉCOR',
        slug: 'home-decor',
        category: 'home-living',
        items: [
          { label: 'Wall Decor & Clocks', slug: 'wall-decor', query: 'wall decor' },
          { label: 'Vases & Artificial Plants', slug: 'vases-plants', query: 'vases' },
          { label: 'Lamps & Lighting', slug: 'lamps-lighting', query: 'lamps' },
          { label: 'Showpieces & Figurines', slug: 'showpieces-figurines', query: 'showpieces' }
        ]
      }
    ],
    brands: [
      { name: 'The Indus Valley', slug: 'indus-valley' },
      { name: 'Bombay Dyeing', slug: 'bombay-dyeing' },
      { name: 'Borosil', slug: 'borosil' },
      { name: 'Milton', slug: 'milton' },
      { name: 'Prestige', slug: 'prestige' },
      { name: 'Chumbak', slug: 'chumbak' }
    ]
  },

  'pooja-items': {
    id: 'pooja-items',
    label: 'POOJA ITEMS',
    slug: 'pooja-items',
    defaultCollection: 'pooja-items',
    quickPicks: [
      { label: 'BRASS IDOLS', slug: 'idols-statues', target: '/collection/pooja-items?subcategory=idols-statues' },
      { label: 'BRASS DIYAS', slug: 'diyas-lamps', target: '/collection/pooja-items?subcategory=diyas-lamps' },
      { label: 'PUJA THALIS', slug: 'thalis', target: '/collection/pooja-items?subcategory=thalis' }
    ],
    sections: [
      {
        title: 'IDOLS & MANDIR',
        slug: 'idols-mandir',
        category: 'pooja-items',
        items: [
          { label: 'Brass Idols & Statues', slug: 'idols-statues', query: 'idols-statues' },
          { label: 'Home Temple / Mandir', slug: 'home-temple-mandir', query: 'home-temple-mandir' },
          { label: 'Puja Thalis & Bells', slug: 'thalis', query: 'thalis' },
          { label: 'Brass & Silver Items', slug: 'brass-silver-pooja-items', query: 'brass-silver-pooja-items' }
        ]
      },
      {
        title: 'DAILY PUJA ESSENTIALS',
        slug: 'daily-puja-essentials',
        category: 'pooja-items',
        items: [
          { label: 'Brass Diyas & Deepams', slug: 'diyas-lamps', query: 'diyas-lamps' },
          { label: 'Incense & Fragrance', slug: 'incense-fragrance', query: 'incense-fragrance' },
          { label: 'Pooja Samagri & Camphor', slug: 'pooja-samagri', query: 'pooja-samagri' },
          { label: 'Rudraksha & Spiritual Items', slug: 'rudraksha-spiritual', query: 'rudraksha-spiritual' },
          { label: 'Festival Pooja Kits', slug: 'festival-pooja-kits', query: 'festival-pooja-kits' }
        ]
      }
    ],
    brands: [
      { name: 'Collectible India', slug: 'collectible-india' },
      { name: 'Divine Crafts', slug: 'divine-crafts' },
      { name: 'Cycle Pure', slug: 'cycle-pure' },
      { name: 'Shubhkart', slug: 'shubhkart' },
      { name: 'Mangaldeep', slug: 'mangaldeep' },
      { name: 'Zed Black', slug: 'zed-black' }
    ]
  },

  'pet-accessories': {
    id: 'pet-accessories',
    label: 'PET ACCESSORIES',
    slug: 'pet-accessories',
    defaultCollection: 'pet-accessories',
    quickPicks: [
      { label: 'DOG FOOD', slug: 'dog-food', target: '/collection/pet-accessories?subcategory=dog-food' },
      { label: 'TREATS & CHEWS', slug: 'dog-treats', target: '/collection/pet-accessories?subcategory=dog-treats' },
      { label: 'COLLARS & LEASHES', slug: 'collars-leashes', target: '/collection/pet-accessories?subcategory=collars-leashes' }
    ],
    sections: [
      {
        title: 'FOOD & NUTRITION',
        slug: 'food-nutrition',
        category: 'pet-accessories',
        items: [
          { label: 'Dog Food & Nutrition', slug: 'dog-food', query: 'dog-food' },
          { label: 'Dog Treats & Chews', slug: 'dog-treats', query: 'dog-treats' }
        ]
      },
      {
        title: 'WALKING & TRAINING',
        slug: 'walking-training',
        category: 'pet-accessories',
        items: [
          { label: 'Collars, Leashes & Harnesses', slug: 'collars-leashes', query: 'collars-leashes' }
        ]
      },
      {
        title: 'TOYS & BEDDING',
        slug: 'toys-bedding',
        category: 'pet-accessories',
        items: [
          { label: 'Dog Toys & Play', slug: 'dog-toys', query: 'dog-toys' },
          { label: 'Dog Beds & Crates', slug: 'dog-beds', query: 'dog-beds' }
        ]
      }
    ],
    brands: [
      { name: 'Pedigree', slug: 'pedigree' },
      { name: 'PetKonnect', slug: 'petkonnect' },
      { name: 'Greenies', slug: 'greenies' },
      { name: 'Barks & Wags', slug: 'barks-and-wags' },
      { name: 'KONG', slug: 'kong' },
      { name: 'PetSetGo', slug: 'petsetgo' }
    ]
  }
};

departmentMegaMenu['home-kitchen'] = departmentMegaMenu['home-living'];
departmentMegaMenu['pooja'] = departmentMegaMenu['pooja-items'];
departmentMegaMenu['pet'] = departmentMegaMenu['pet-accessories'];
departmentMegaMenu['pets'] = departmentMegaMenu['pet-accessories'];

/**
 * Structured Department Hierarchy for Drawers and Navigation Menus
 */
export const DRAWER_DEPARTMENTS = [
  {
    key: 'men',
    label: 'MEN',
    slug: 'men',
    defaultPath: '/collection/clothing?section=men',
    sections: [
      {
        title: 'WESTERN WEAR',
        items: [
          { label: 'Shirts', path: '/collection/clothing?section=men&subcategory=shirts' },
          { label: 'T-Shirts & Polos', path: '/collection/clothing?section=men&subcategory=t-shirts' },
          { label: 'Jeans & Denims', path: '/collection/clothing?section=men&subcategory=jeans-jeggings' },
          { label: 'Trousers & Chinos', path: '/collection/clothing?section=men&subcategory=trousers-pants' },
          { label: 'Jackets & Blazers', path: '/collection/clothing?section=men&subcategory=jackets' },
          { label: 'Track Pants & Joggers', path: '/collection/clothing?section=men&subcategory=track-pants' }
        ]
      },
      {
        title: 'FOOTWEAR',
        items: [
          { label: 'Sneakers & Sports', path: '/collection/footwear?section=men&subcategory=sneakers' },
          { label: 'Casual Shoes & Loafers', path: '/collection/footwear?section=men&subcategory=casual-shoes' },
          { label: 'Formal Shoes & Boots', path: '/collection/footwear?section=men&subcategory=formal-shoes' },
          { label: 'Sandals & Floaters', path: '/collection/footwear?section=men&subcategory=sandals' }
        ]
      },
      {
        title: 'ETHNIC & ACCESSORIES',
        items: [
          { label: 'Kurtas & Kurta Sets', path: '/collection/clothing?section=men&subcategory=kurtas' },
          { label: 'Watches', path: '/collection/accessories?section=men&subcategory=watches' },
          { label: 'Wallets & Belts', path: '/collection/accessories?section=men&subcategory=wallets' },
          { label: 'Sunglasses', path: '/collection/accessories?section=men&subcategory=sunglasses' }
        ]
      }
    ]
  },
  {
    key: 'women',
    label: 'WOMEN',
    slug: 'women',
    defaultPath: '/collection/clothing?section=women',
    sections: [
      {
        title: 'WESTERN WEAR',
        items: [
          { label: 'Dresses & Gowns', path: '/collection/clothing?section=women&subcategory=dresses' },
          { label: 'Tops & Blouses', path: '/collection/clothing?section=women&subcategory=tops' },
          { label: 'Jeans & Jeggings', path: '/collection/clothing?section=women&subcategory=jeans-jeggings' },
          { label: 'Leggings & Palazzos', path: '/collection/clothing?section=women&subcategory=leggings' },
          { label: 'Co-Ord Sets', path: '/collection/clothing?section=women&subcategory=co-ord-sets' },
          { label: 'Trousers & Pants', path: '/collection/clothing?section=women&subcategory=trousers-pants' }
        ]
      },
      {
        title: 'ETHNIC WEAR',
        items: [
          { label: 'Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees' },
          { label: 'Blouses', path: '/collection/ethnic-wear?section=women&subcategory=blouses' },
          { label: 'Kurtas & Kurtis', path: '/collection/ethnic-wear?section=women&subcategory=kurtas' },
          { label: 'Suit Sets & Anarkalis', path: '/collection/ethnic-wear?section=women&subcategory=kurta-suit-sets' },
          { label: 'Lehenga Choli', path: '/collection/ethnic-wear?section=women&subcategory=lehenga-choli-sets' }
        ]
      },
      {
        title: 'SAREE STYLES',
        items: [
          { label: 'Silk Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=silk-sarees' },
          { label: 'Kanjivaram Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=kanjivaram-sarees' },
          { label: 'Banarasi Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=banarasi-sarees' },
          { label: 'Cotton Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=cotton-sarees' },
          { label: 'Bridal Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=bridal-sarees' },
          { label: 'Party Wear Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=party-wear-sarees' },
          { label: 'Wedding Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=wedding-sarees' },
          { label: 'Festive Wear Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=festive-wear-sarees' },
          { label: 'Daily Wear Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=daily-wear-sarees' },
          { label: 'Lightweight Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=lightweight-sarees' },
          { label: 'Handloom Sarees', path: '/collection/ethnic-wear?section=women&subcategory=sarees&childCategory=handloom-sarees' }
        ]
      },
      {
        title: 'FOOTWEAR & HANDBAGS',
        items: [
          { label: 'Heels & Wedges', path: '/collection/footwear?section=women&subcategory=heels' },
          { label: 'Flat Sandals & Slides', path: '/collection/footwear?section=women&subcategory=flats' },
          { label: 'Sneakers & Casuals', path: '/collection/footwear?section=women&subcategory=sneakers' },
          { label: 'Handbags & Totes', path: '/collection/accessories?section=women&subcategory=handbags' },
          { label: 'Fashion Jewellery', path: '/collection/jewellery?section=women' }
        ]
      }
    ]
  },
  {
    key: 'kids',
    label: 'KIDS',
    slug: 'kids',
    defaultPath: '/collection/kids',
    sections: [
      {
        title: 'BOYS & GIRLS',
        items: [
          { label: 'Boys Clothing', path: '/collection/kids?subcategory=boys-clothing' },
          { label: 'Girls Dresses & Tops', path: '/collection/kids?subcategory=girls-clothing' },
          { label: 'Baby Rompers', path: '/collection/kids?subcategory=baby-clothes' },
          { label: 'Kids Footwear', path: '/collection/kids?section=footwear' }
        ]
      }
    ]
  },
  {
    key: 'pooja-items',
    label: 'POOJA ITEMS',
    slug: 'pooja-items',
    defaultPath: '/collection/pooja-items',
    sections: [
      {
        title: 'IDOLS & MANDIR',
        items: [
          { label: 'Brass Idols & Statues', path: '/collection/pooja-items?subcategory=idols-statues' },
          { label: 'Home Temple / Mandir', path: '/collection/pooja-items?subcategory=home-temple-mandir' },
          { label: 'Puja Thalis & Bells', path: '/collection/pooja-items?subcategory=thalis' },
          { label: 'Brass & Silver Items', path: '/collection/pooja-items?subcategory=brass-silver-pooja-items' }
        ]
      },
      {
        title: 'DAILY PUJA ESSENTIALS',
        items: [
          { label: 'Brass Diyas & Deepams', path: '/collection/pooja-items?subcategory=diyas-lamps' },
          { label: 'Incense & Fragrance', path: '/collection/pooja-items?subcategory=incense-fragrance' },
          { label: 'Pooja Samagri & Camphor', path: '/collection/pooja-items?subcategory=pooja-samagri' },
          { label: 'Rudraksha & Spiritual Items', path: '/collection/pooja-items?subcategory=rudraksha-spiritual' },
          { label: 'Festival Pooja Kits', path: '/collection/pooja-items?subcategory=festival-pooja-kits' }
        ]
      }
    ]
  },
  {
    key: 'pet-accessories',
    label: 'PET ACCESSORIES',
    slug: 'pet-accessories',
    defaultPath: '/collection/pet-accessories',
    sections: [
      {
        title: 'FOOD & NUTRITION',
        items: [
          { label: 'Dog Food & Nutrition', path: '/collection/pet-accessories?subcategory=dog-food' },
          { label: 'Dog Treats & Chews', path: '/collection/pet-accessories?subcategory=dog-treats' }
        ]
      },
      {
        title: 'WALKING & TRAINING',
        items: [
          { label: 'Collars, Leashes & Harnesses', path: '/collection/pet-accessories?subcategory=collars-leashes' }
        ]
      },
      {
        title: 'TOYS & BEDDING',
        items: [
          { label: 'Dog Toys & Play', path: '/collection/pet-accessories?subcategory=dog-toys' },
          { label: 'Dog Beds & Crates', path: '/collection/pet-accessories?subcategory=dog-beds' }
        ]
      }
    ]
  }
];

export const SAREE_SUBCATEGORIES = [
  { slug: 'all', label: 'All Sarees', keywords: ['saree', 'sarees'] },
  { slug: 'silk-sarees', label: 'Silk Sarees', keywords: ['silk saree', 'silk sarees', 'mulberry silk', 'mysore silk'] },
  { slug: 'kanjivaram-sarees', label: 'Kanjivaram Sarees', keywords: ['kanjivaram', 'kancheepuram', 'kanjivaram silk'] },
  { slug: 'banarasi-sarees', label: 'Banarasi Sarees', keywords: ['banarasi', 'katan silk', 'banarasi silk', 'brocade saree'] },
  { slug: 'cotton-sarees', label: 'Cotton Sarees', keywords: ['cotton saree', 'chanderi cotton', 'mulmul cotton', 'chettinad'] },
  { slug: 'bridal-sarees', label: 'Bridal Sarees', keywords: ['bridal saree', 'wedding saree bridal', 'heavy zari saree', 'bride'] },
  { slug: 'party-wear-sarees', label: 'Party Wear Sarees', keywords: ['party wear saree', 'shimmer saree', 'sequin saree', 'cocktail saree'] },
  { slug: 'wedding-sarees', label: 'Wedding Sarees', keywords: ['wedding saree', 'kalyanam saree', 'muhurtham saree'] },
  { slug: 'festive-wear-sarees', label: 'Festive Wear Sarees', keywords: ['festive wear saree', 'diwali saree', 'gota patti saree', 'bandhani'] },
  { slug: 'daily-wear-sarees', label: 'Daily Wear Sarees', keywords: ['daily wear saree', 'linen cotton saree', 'georgette daily', 'khadi saree'] },
  { slug: 'lightweight-sarees', label: 'Lightweight Sarees', keywords: ['lightweight saree', 'organza saree', 'chiffon saree', 'featherlight'] },
  { slug: 'handloom-sarees', label: 'Handloom Sarees', keywords: ['handloom saree', 'jamdani', 'ikat saree', 'handwoven saree'] }
];
