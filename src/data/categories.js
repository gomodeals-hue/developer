/**
 * Category Sections and Subcategories Catalog
 * Hierarchically grouped by sections (e.g., Men, Women, Kids, Essentials)
 * modeled after premium e-commerce department stores.
 */

export const categorySections = {
    'clothing': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=300&q=80',
            subtitle: 'Shirts, Jeans, T-Shirts & Kurtas',
            items: [
                { label: 'Shirts', slug: 'shirts', keywords: ['shirt', 'formal shirt', 'casual shirt'] },
                { label: 'T-Shirts', slug: 't-shirts', keywords: ['t-shirt', 'tee', 'polo'] },
                { label: 'Jeans & Trousers', slug: 'trousers-pants', keywords: ['jeans', 'trousers', 'pants', 'chinos'] },
                { label: 'Track Pants', slug: 'track-pants', keywords: ['track pants', 'joggers', 'sweatpants'] },
                { label: 'Kurtas & Ethnic', slug: 'kurtas', keywords: ['kurta', 'ethnic', 'sherwani'] },
                { label: 'Jackets & Coats', slug: 'jackets', keywords: ['jacket', 'coat', 'blazer', 'puffer'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80',
            subtitle: 'Dresses, Sarees, Tops & Kurtis',
            items: [
                { label: 'Dresses & Gowns', slug: 'dresses', keywords: ['dress', 'gown', 'maxi', 'midi'] },
                { label: 'Tops & Blouses', slug: 'tops', keywords: ['top', 'blouse', 'crop top', 'tunic'] },
                { label: 'Kurtas & Kurtis', slug: 'kurtas', keywords: ['kurta', 'kurti', 'anarkali', 'suit'] },
                { label: 'Sarees', slug: 'sarees', keywords: ['saree', 'silk saree', 'banarasi', 'georgette'] },
                { label: 'Jeans & Jeggings', slug: 'jeans-jeggings', keywords: ['jeans', 'jeggings', 'denim'] },
                { label: 'Leggings & Pants', slug: 'leggings', keywords: ['leggings', 'palazzos', 'churidars'] },
                { label: 'Co-ord Sets', slug: 'co-ord-sets', keywords: ['co-ord', 'coord', 'two piece set'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=300&q=80',
            subtitle: 'Boys, Girls & Baby Apparel',
            items: [
                { label: 'Boys Clothing', slug: 'boys-clothing', keywords: ['boys', 'boys shirt', 'boys t-shirt'] },
                { label: 'Girls Clothing', slug: 'girls-clothing', keywords: ['girls', 'girls dress', 'frock'] },
                { label: 'Baby Clothes', slug: 'baby-clothes', keywords: ['baby', 'onesie', 'romper', 'infant'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80',
            subtitle: 'Hoodies, Sweatshirts & Streetwear',
            items: [
                { label: 'Hoodies & Sweatshirts', slug: 'sweatshirts-hoodies', keywords: ['hoodie', 'sweatshirt', 'pullover'] },
                { label: 'Graphic Tees', slug: 't-shirts', keywords: ['graphic tee', 'oversized tee', 't-shirt'] },
                { label: 'Loungewear & Tracksuits', slug: 'track-pants', keywords: ['tracksuit', 'joggers', 'lounge set'] },
            ]
        }
    ],

    'footwear': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
            subtitle: 'Casual Shoes, Sneakers & Boots',
            items: [
                { label: 'Casual Shoes', slug: 'casual-shoes', keywords: ['casual shoes', 'loafers', 'moccasins'] },
                { label: 'Sneakers', slug: 'sneakers', keywords: ['sneakers', 'kicks', 'skate shoes'] },
                { label: 'Boots', slug: 'boots', keywords: ['boots', 'chelsea boots', 'leather boots'] },
                { label: 'Sports Shoes', slug: 'sports-shoes', keywords: ['running shoes', 'sports shoes', 'training shoes'] },
                { label: 'Sandals & Floaters', slug: 'sandals', keywords: ['sandals', 'floaters'] },
                { label: 'Flip Flops & Slippers', slug: 'flip-flops-slippers', keywords: ['flip flops', 'slippers', 'slides'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80',
            subtitle: 'Heels, Flats, Mules & Slides',
            items: [
                { label: 'Block Heels & Wedges', slug: 'sandals', keywords: ['heels', 'wedges', 'pumps', 'stilettos'] },
                { label: 'Flat Sandals & Mules', slug: 'sandals', keywords: ['flats', 'sandals', 'mules'] },
                { label: 'Casual Shoes & Loafers', slug: 'casual-shoes', keywords: ['casual', 'loafers', 'slip on'] },
                { label: 'Sneakers', slug: 'sneakers', keywords: ['sneakers', 'fashion sneakers'] },
                { label: 'Boots', slug: 'boots', keywords: ['boots', 'ankle boots'] },
                { label: 'Flip Flops & Slides', slug: 'flip-flops-slippers', keywords: ['flip flops', 'slippers', 'slides'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&q=80',
            subtitle: 'Boys & Girls Shoes & Booties',
            items: [
                { label: 'Kids Sneakers', slug: 'sneakers', keywords: ['kids sneakers', 'light shoes', 'boys shoes'] },
                { label: 'Kids Sandals', slug: 'sandals', keywords: ['kids sandals', 'floaters', 'girls sandals'] },
                { label: 'School Shoes', slug: 'casual-shoes', keywords: ['school shoes', 'black shoes'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&q=80',
            subtitle: 'Sneakers, Slides & Sports Shoes',
            items: [
                { label: 'Sneakers', slug: 'sneakers', keywords: ['sneakers', 'white sneakers', 'lifestyle shoes'] },
                { label: 'Running Shoes', slug: 'sports-shoes', keywords: ['running shoes', 'training shoes'] },
                { label: 'Slides & Flip Flops', slug: 'flip-flops-slippers', keywords: ['slides', 'flip flops', 'slippers'] },
            ]
        }
    ],

    'western-wear': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80',
            subtitle: 'Shirts, T-Shirts, Trousers & Pants',
            items: [
                { label: 'Shirts', slug: 'shirts', keywords: ['shirt', 'formal shirt', 'casual shirt'] },
                { label: 'T-Shirts', slug: 't-shirts', keywords: ['t-shirt', 'tee', 'polo'] },
                { label: 'Trousers & Pants', slug: 'trousers-pants', keywords: ['trousers', 'pants', 'chinos'] },
                { label: 'Track Pants', slug: 'track-pants', keywords: ['track pants', 'joggers'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80',
            subtitle: 'Dresses, Tops, Jeans & Co-ords',
            items: [
                { label: 'Dresses', slug: 'dresses', keywords: ['dress', 'midi', 'maxi', 'party dress'] },
                { label: 'Tops & Blouses', slug: 'tops', keywords: ['top', 'blouse', 'crop top', 'tunic'] },
                { label: 'Jeans & Jeggings', slug: 'jeans-jeggings', keywords: ['jeans', 'jeggings', 'denim'] },
                { label: 'Co-ord Sets', slug: 'co-ord-sets', keywords: ['co-ord', 'coord', 'set'] },
                { label: 'Leggings', slug: 'leggings', keywords: ['leggings', 'tights'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&q=80',
            subtitle: 'Boys & Girls Western Wear',
            items: [
                { label: 'Kids T-Shirts', slug: 't-shirts', keywords: ['kids tee', 'boys t-shirt', 'girls top'] },
                { label: 'Kids Denims & Pants', slug: 'jeans-jeggings', keywords: ['kids jeans', 'denim shorts'] },
                { label: 'Kids Western Dresses', slug: 'dresses', keywords: ['girls frock', 'party dress'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80',
            subtitle: 'Graphic Tees, Denims & Hoodies',
            items: [
                { label: 'Graphic Tees', slug: 't-shirts', keywords: ['graphic', 'printed tee', 'oversized tee'] },
                { label: 'Everyday Denims', slug: 'jeans-jeggings', keywords: ['denim', 'jeans', 'straight fit'] },
                { label: 'Loungewear Co-ords', slug: 'co-ord-sets', keywords: ['co-ord', 'tracksuit', 'sweatpants'] },
            ]
        }
    ],

    'ethnic-wear': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1590076241940-02a8b29e64e5?w=300&q=80',
            subtitle: 'Kurtas, Nehru Coats & Festive',
            items: [
                { label: 'Kurtas & Kurta Sets', slug: 'kurtas', keywords: ['men kurta', 'kurta pajama'] },
                { label: 'Ethnic Jackets & Nehru Coats', slug: 'kurtas', keywords: ['nehru jacket', 'waistcoat'] },
                { label: 'Festive Wear', slug: 'kurta-bottom-sets', keywords: ['sherwani', 'festive'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
            subtitle: 'Sarees, Suits, Lehengas & Kurtis',
            items: [
                { label: 'Sarees', slug: 'sarees', keywords: ['saree', 'silk saree', 'georgette'] },
                { label: 'Kurta Suit Sets', slug: 'kurta-suit-sets', keywords: ['kurta suit set', 'suit set', 'dupatta set'] },
                { label: 'Kurta Bottom Sets', slug: 'kurta-bottom-sets', keywords: ['kurta bottom set', 'palazzo set'] },
                { label: 'Kurtas', slug: 'kurtas', keywords: ['kurta', 'anarkali'] },
                { label: 'Kurtis & Tunics', slug: 'kurtis-tunics', keywords: ['kurti', 'tunic'] },
                { label: 'Lehenga Choli Sets', slug: 'lehenga-choli-sets', keywords: ['lehenga', 'choli', 'bridal'] },
                { label: 'Salwars & Churidars', slug: 'salwars-churidars', keywords: ['salwar', 'churidar'] },
                { label: 'Dresses & Gowns', slug: 'dresses-gowns', keywords: ['ethnic gown', 'anarkali gown'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80',
            subtitle: 'Boys Kurtas & Girls Lehengas',
            items: [
                { label: 'Boys Kurta Sets', slug: 'kurtas', keywords: ['boys kurta', 'dhoti kurta'] },
                { label: 'Girls Lehengas & Frocks', slug: 'lehenga-choli-sets', keywords: ['girls lehenga', 'pattu pavadai'] },
                { label: 'Kids Festive Gowns', slug: 'dresses-gowns', keywords: ['festive frock', 'anarkali gown'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&q=80',
            subtitle: 'Shawls, Stoles & Festive Sets',
            items: [
                { label: 'Shawls & Wraps', slug: 'shawls-wraps', keywords: ['shawl', 'pashmina', 'wrap'] },
                { label: 'Stoles & Scarves', slug: 'stoles-scarves', keywords: ['stole', 'scarf', 'dupatta'] },
                { label: 'Co-ord Sets', slug: 'co-ord-sets', keywords: ['ethnic co-ord', 'fusion set'] },
            ]
        }
    ],

    'accessories': [
        {
            title: 'Bags & Luggage',
            displayTitle: 'Bags & Luggage',
            slug: 'bags',
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80',
            subtitle: 'Backpacks, Handbags & Wallets',
            items: [
                { label: 'Backpacks', slug: 'backpacks', keywords: ['backpack', 'rucksack', 'daypack'] },
                { label: 'Handbags', slug: 'handbags', keywords: ['handbag', 'tote', 'satchel', 'shoulder bag'] },
                { label: 'Clutches & Wristlets', slug: 'clutches-wristlets', keywords: ['clutch', 'wristlet', 'evening purse'] },
                { label: 'Wallets', slug: 'wallets', keywords: ['wallet', 'cardholder', 'billfold'] },
            ]
        },
        {
            title: 'Fashion Accents',
            displayTitle: 'Fashion Accents',
            slug: 'fashion-accents',
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80',
            subtitle: 'Sunglasses, Belts, Caps & Scarves',
            items: [
                { label: 'Sunglasses', slug: 'sunglasses', keywords: ['sunglasses', 'shades', 'aviator'] },
                { label: 'Belts', slug: 'belts', keywords: ['belt', 'leather belt'] },
                { label: 'Caps & Hats', slug: 'caps-hats', keywords: ['cap', 'hat', 'beanie'] },
                { label: 'Shawls & Wraps', slug: 'shawls-wraps', keywords: ['shawl', 'wrap', 'pashmina'] },
                { label: 'Stoles & Scarves', slug: 'stoles-scarves', keywords: ['stole', 'scarf', 'muffler'] },
                { label: 'Socks & Stockings', slug: 'socks-stockings', keywords: ['socks', 'stockings', 'tights'] },
            ]
        },
        {
            title: 'Timepieces',
            displayTitle: 'Timepieces & Watches',
            slug: 'timepieces',
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&q=80',
            subtitle: 'Analog, Chronograph & Luxury Watches',
            items: [
                { label: 'Watches', slug: 'watches', keywords: ['watch', 'chronograph', 'analog'] },
            ]
        }
    ],

    'gadgets': [
        {
            title: 'Smart Wearables & Fitness',
            displayTitle: 'Smart Wearables & Fitness',
            slug: 'wearables',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80',
            subtitle: 'Smart Watches & Fitness Bands',
            items: [
                { label: 'Smart Wearables', slug: 'smart-wearables', keywords: ['smartwatch', 'smart watch'] },
                { label: 'Fitness Gadgets', slug: 'fitness-gadgets', keywords: ['fitness tracker', 'band', 'pedometer'] },
            ]
        },
        {
            title: 'Audio & Entertainment',
            displayTitle: 'Audio & Entertainment',
            slug: 'audio',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
            subtitle: 'Headphones & Bluetooth Speakers',
            items: [
                { label: 'Headphones', slug: 'headphones', keywords: ['headphone', 'earphone', 'noise cancelling'] },
                { label: 'Speakers', slug: 'speakers', keywords: ['speaker', 'bluetooth speaker', 'soundbar'] },
            ]
        }
    ],

    'jewellery': [
        {
            title: 'Fashion Jewellery',
            displayTitle: 'Fashion Jewellery',
            slug: 'fashion-jewellery',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80',
            subtitle: 'Necklaces, Earrings & Bangles',
            items: [
                { label: 'Fashion Jewellery Sets', slug: 'fashion-jewellery', keywords: ['jewellery', 'jewelry set', 'kundan'] },
                { label: 'Necklaces & Pendants', slug: 'necklaces-pendants', keywords: ['necklace', 'pendant', 'choker'] },
                { label: 'Earrings', slug: 'earrings', keywords: ['earrings', 'studs', 'jhumkas'] },
                { label: 'Bracelets & Bangles', slug: 'bracelets', keywords: ['bracelet', 'bangle', 'cuff'] },
            ]
        },
        {
            title: 'Fine Timepieces',
            displayTitle: 'Fine Timepieces',
            slug: 'watches',
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&q=80',
            subtitle: 'Gold, Diamond & Luxury Watches',
            items: [
                { label: 'Watches', slug: 'watches', keywords: ['watch', 'luxury watch', 'gold watch'] },
            ]
        }
    ],

    'lingerie-innerwear': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&q=80',
            subtitle: 'Briefs, Trunks, Boxers & Vests',
            items: [
                { label: 'Briefs & Trunks', slug: 'briefs-trunks', keywords: ['briefs', 'trunks', 'boxers'] },
                { label: 'Cotton Vests', slug: 'vests', keywords: ['vest', 'undershirt', 'sleeveless'] },
                { label: 'Boxer Shorts', slug: 'boxers', keywords: ['boxers', 'lounge boxers'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80',
            subtitle: 'Bras, Panties & Shapewear',
            items: [
                { label: 'Bras', slug: 'bras', keywords: ['bra', 'padded bra', 't-shirt bra', 'sports bra'] },
                { label: 'Panties', slug: 'panties', keywords: ['panties', 'briefs', 'hipster', 'boyshorts'] },
                { label: 'Shapewear', slug: 'shapewear', keywords: ['shapewear', 'tummy shaper', 'bodysuit'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&q=80',
            subtitle: 'Kids Vests, Bloomers & Innerwear',
            items: [
                { label: 'Kids Vests & Slips', slug: 'vests', keywords: ['kids vest', 'slip', 'camisole'] },
                { label: 'Bloomers & Briefs', slug: 'briefs', keywords: ['bloomers', 'kids briefs'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&q=80',
            subtitle: 'Thermal Wears & Warmers',
            items: [
                { label: 'Thermal Tops', slug: 'thermal-wears', keywords: ['thermal top', 'body warmer'] },
                { label: 'Thermal Bottoms', slug: 'thermal-wears', keywords: ['thermal bottom', 'long johns'] },
                { label: 'Full Thermal Sets', slug: 'thermal-wears', keywords: ['thermal set', 'winter innerwear'] },
            ]
        }
    ],

    'night-lounge-wear': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&q=80',
            subtitle: 'Lounge Sets, Shorts & Pyjamas',
            items: [
                { label: 'Lounge Sets', slug: 'night-lounge-wear-sets', keywords: ['lounge set', 'night suit'] },
                { label: 'Pyjamas & Shorts', slug: 'pyjamas-shorts', keywords: ['pyjamas', 'sleep shorts'] },
                { label: 'Track Pants', slug: 'track-pants', keywords: ['track pants', 'sweatpants'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80',
            subtitle: 'Nighties, Sleep Shirts & Robes',
            items: [
                { label: 'Night Shirts & Nighties', slug: 'night-shirts-nighties', keywords: ['nighty', 'sleep shirt', 'nightdress'] },
                { label: 'Night & Lounge Wear Sets', slug: 'night-lounge-wear-sets', keywords: ['night set', 'lounge set', 'satin suit'] },
                { label: 'Robes & Wraps', slug: 'robes-wraps', keywords: ['robe', 'bathrobe', 'satin robe'] },
                { label: 'Pyjamas & Shorts', slug: 'pyjamas-shorts', keywords: ['pyjamas', 'shorts'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&q=80',
            subtitle: 'Sleepwear Sets & Cotton Pyjamas',
            items: [
                { label: 'Kids Sleep Sets', slug: 'night-lounge-wear-sets', keywords: ['kids night suit', 'pajama set'] },
                { label: 'Cotton Pyjamas', slug: 'pyjamas-shorts', keywords: ['kids pyjamas', 'sleep shorts'] },
                { label: 'Onesies & Sleepsuits', slug: 'night-shirts-nighties', keywords: ['onesie', 'romper', 'sleepsuit'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&q=80',
            subtitle: 'Bathrobes, Lounge Shorts & Sets',
            items: [
                { label: 'Bathrobes & Robes', slug: 'robes-wraps', keywords: ['robe', 'bathrobe', 'kimono'] },
                { label: 'Cozy Lounge Sets', slug: 'lounge-sets', keywords: ['lounge set', 'co-ord'] },
                { label: 'Relaxed Pyjamas', slug: 'pyjamas-shorts', keywords: ['pyjamas', 'lounge pants'] },
            ]
        }
    ],

    'athleisure': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80',
            subtitle: 'Gym Tees, Track Pants & Joggers',
            items: [
                { label: 'Gym T-Shirts & Tanks', slug: 'gym-tshirts-tanks', keywords: ['gym tee', 'tank top', 'workout'] },
                { label: 'Track Pants & Joggers', slug: 'track-pants', keywords: ['track pants', 'joggers', 'sweatpants'] },
                { label: 'Athletic Shorts', slug: 'athletic-shorts', keywords: ['shorts', 'running shorts'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&q=80',
            subtitle: 'Sports Bras, Tights & Yoga Sets',
            items: [
                { label: 'Sports Bras & Tights', slug: 'sports-bras-tights', keywords: ['sports bra', 'workout bra', 'tights', 'leggings'] },
                { label: 'Workout Tops & Tanks', slug: 'gym-tshirts-tanks', keywords: ['tank top', 'workout tee'] },
                { label: 'Athletic Joggers', slug: 'track-pants', keywords: ['joggers', 'track pants'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&q=80',
            subtitle: 'Activewear & Tracksuits',
            items: [
                { label: 'Kids Tracksuits', slug: 'track-pants', keywords: ['tracksuit', 'joggers'] },
                { label: 'Kids Sport Tees', slug: 'gym-tshirts-tanks', keywords: ['sports tee', 'active t-shirt'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80',
            subtitle: 'Hoodies, Sweatshirts & Shorts',
            items: [
                { label: 'Sweatshirts & Hoodies', slug: 'sweatshirts-hoodies', keywords: ['hoodie', 'sweatshirt', 'fleece'] },
                { label: 'Training Shorts', slug: 'athletic-shorts', keywords: ['athletic shorts', 'gym shorts'] },
                { label: 'Track Pants & Joggers', slug: 'track-pants', keywords: ['track pants', 'joggers'] },
            ]
        }
    ],

    'winterwear': [
        {
            title: 'Men',
            displayTitle: 'Men',
            slug: 'men',
            image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&q=80',
            subtitle: 'Jackets, Sweaters & Coats',
            items: [
                { label: 'Jackets & Windcheaters', slug: 'jackets-windcheaters', keywords: ['jacket', 'puffer', 'windcheater', 'bomber'] },
                { label: 'Sweaters & Cardigans', slug: 'sweaters-cardigans', keywords: ['sweater', 'pullover', 'cardigan', 'knit'] },
                { label: 'Sweatshirts & Hoodies', slug: 'sweatshirts-hoodies', keywords: ['hoodie', 'sweatshirt', 'fleece'] },
                { label: 'Coats & Blazers', slug: 'coats-blazers', keywords: ['coat', 'overcoat', 'blazer', 'trench'] },
                { label: 'Thermal Innerwear', slug: 'thermal-wears', keywords: ['thermal', 'body warmer', 'long johns'] },
            ]
        },
        {
            title: 'Women',
            displayTitle: 'Women',
            slug: 'women',
            image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&q=80',
            subtitle: 'Puffers, Cardigans & Shawls',
            items: [
                { label: 'Jackets & Trench Coats', slug: 'jackets-windcheaters', keywords: ['jacket', 'puffer jacket', 'trench coat', 'cropped jacket'] },
                { label: 'Sweaters & Cardigans', slug: 'sweaters-cardigans', keywords: ['sweater', 'cardigan', 'knitwear', 'pullover'] },
                { label: 'Shawls & Wraps', slug: 'shawls-wraps', keywords: ['shawl', 'pashmina', 'wrap', 'stole'] },
                { label: 'Sweatshirts & Hoodies', slug: 'sweatshirts-hoodies', keywords: ['hoodie', 'sweatshirt', 'fleece'] },
                { label: 'Thermals & Warmers', slug: 'thermal-wears', keywords: ['thermal', 'warmer', 'camisole'] },
            ]
        },
        {
            title: 'Kids',
            displayTitle: 'Kids',
            slug: 'kids',
            image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&q=80',
            subtitle: 'Puffers, Hoodies & Knits',
            items: [
                { label: 'Kids Jackets & Puffers', slug: 'jackets-windcheaters', keywords: ['kids jacket', 'puffer jacket', 'windcheater'] },
                { label: 'Kids Sweaters', slug: 'sweaters-cardigans', keywords: ['kids sweater', 'cardigan', 'woollen'] },
                { label: 'Kids Hoodies & Sweatshirts', slug: 'sweatshirts-hoodies', keywords: ['kids hoodie', 'sweatshirt', 'fleece'] },
                { label: 'Kids Thermals', slug: 'thermal-wears', keywords: ['kids thermal', 'innerwear'] },
            ]
        },
        {
            title: 'Unisex',
            displayTitle: 'Unisex',
            slug: 'unisex',
            image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&q=80',
            subtitle: 'Hoodies, Thermals & Mufflers',
            items: [
                { label: 'Hoodies & Sweatshirts', slug: 'sweatshirts-hoodies', keywords: ['hoodie', 'sweatshirt', 'pullover'] },
                { label: 'Mufflers & Scarves', slug: 'shawls-wraps', keywords: ['muffler', 'scarf', 'winter scarf'] },
                { label: 'Beanies & Winter Caps', slug: 'caps-hats', keywords: ['beanie', 'winter cap', 'woollen cap'] },
                { label: 'Thermal Innerwear', slug: 'thermal-wears', keywords: ['thermal', 'body warmer'] },
            ]
        }
    ],

    'beauty': [
        {
            title: 'Makeup & Fragrances',
            displayTitle: 'Makeup & Fragrances',
            slug: 'makeup-fragrances',
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80',
            subtitle: 'Cosmetics, Lipsticks & Perfumes',
            items: [
                { label: 'Cosmetics', slug: 'cosmetics', keywords: ['makeup', 'lipstick', 'foundation'] },
                { label: 'Fragrances', slug: 'fragrance', keywords: ['perfume', 'cologne', 'fragrance'] },
            ]
        },
        {
            title: 'Skincare & Hair',
            displayTitle: 'Skincare & Hair',
            slug: 'skincare-hair',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80',
            subtitle: 'Serums, Cleansers & Hair Masks',
            items: [
                { label: 'Skincare', slug: 'skincare', keywords: ['serum', 'moisturizer', 'cleanser'] },
                { label: 'Haircare', slug: 'haircare', keywords: ['shampoo', 'hair oil', 'conditioner'] },
            ]
        },
        {
            title: 'Grooming & Wellness',
            displayTitle: 'Grooming & Wellness',
            slug: 'grooming-wellness',
            image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&q=80',
            subtitle: 'Men Grooming & Essential Oils',
            items: [
                { label: 'Men Grooming', slug: 'grooming', keywords: ['beard oil', 'trimmer', 'aftershave'] },
                { label: 'Wellness', slug: 'wellness', keywords: ['wellness', 'essential oil', 'body care'] },
            ]
        }
    ],

    'kids': [
        {
            title: 'Boys Clothing',
            displayTitle: 'Boys Clothing',
            slug: 'boys-clothing',
            image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&q=80',
            subtitle: 'Shirts, T-Shirts & Pants',
            items: [
                { label: 'Boys Clothing', slug: 'boys-clothing', keywords: ['boys clothing', 't-shirts', 'shorts'] },
            ]
        },
        {
            title: 'Girls Clothing',
            displayTitle: 'Girls Clothing',
            slug: 'girls-clothing',
            image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=300&q=80',
            subtitle: 'Dresses, Frocks & Skirts',
            items: [
                { label: 'Girls Clothing', slug: 'girls-clothing', keywords: ['girls clothing', 'dresses', 'skirts'] },
            ]
        },
        {
            title: 'Baby & Toddler',
            displayTitle: 'Baby Clothes & Toddler',
            slug: 'baby-clothes',
            image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&q=80',
            subtitle: 'Onesies, Rompers & Sets',
            items: [
                { label: 'Baby Clothes', slug: 'baby-clothes', keywords: ['baby clothes', 'onesies', 'rompers'] },
            ]
        },
        {
            title: 'Toys & School',
            displayTitle: 'Toys & School Supplies',
            slug: 'toys-school',
            image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=300&q=80',
            subtitle: 'Blocks, Games & Backpacks',
            items: [
                { label: 'Toys', slug: 'toys', keywords: ['toys', 'games', 'blocks'] },
                { label: 'School Supplies', slug: 'school-supplies', keywords: ['backpack', 'stationery', 'pencil box'] },
            ]
        }
    ],

    'home-living': [
        {
            title: 'Kitchen & Dining',
            displayTitle: 'Kitchen & Dining',
            slug: 'kitchen-dining',
            image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=300&q=80',
            subtitle: 'Cookware, Dinner Sets & Organizers',
            items: [
                { label: 'Cookware', slug: 'cookware', keywords: ['cookware', 'pan', 'kadhai'] },
                { label: 'Bakeware', slug: 'bakeware', keywords: ['bakeware', 'baking tray', 'cake mould'] },
                { label: 'Kitchen Tools & Gadgets', slug: 'kitchen-tools-gadgets', keywords: ['kitchen tools', 'gadgets', 'peeler'] },
                { label: 'Dinner Sets', slug: 'dinner-sets', keywords: ['dinner set', 'crockery'] },
                { label: 'Plates & Bowls', slug: 'plates-bowls', keywords: ['plates', 'bowls'] },
                { label: 'Glasses & Cups', slug: 'glasses-cups', keywords: ['glasses', 'cups', 'mugs'] },
                { label: 'Cutlery', slug: 'cutlery', keywords: ['cutlery', 'spoons', 'forks'] },
                { label: 'Storage Containers', slug: 'storage-containers', keywords: ['containers', 'jars'] },
                { label: 'Water Bottles & Flasks', slug: 'water-bottles-flasks', keywords: ['water bottle', 'flask'] },
                { label: 'Lunch Boxes', slug: 'lunch-boxes', keywords: ['lunch box', 'tiffin'] },
                { label: 'Kitchen Organizers', slug: 'kitchen-organizers', keywords: ['kitchen organizer', 'rack'] },
            ]
        },
        {
            title: 'Home Décor',
            displayTitle: 'Home Décor',
            slug: 'home-decor',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80',
            subtitle: 'Wall Décor, Clocks & Mirrors',
            items: [
                { label: 'Wall Décor', slug: 'wall-decor', keywords: ['wall decor', 'wall art', 'paintings'] },
                { label: 'Photo Frames', slug: 'photo-frames', keywords: ['photo frames', 'picture frames'] },
                { label: 'Clocks', slug: 'clocks', keywords: ['clock', 'wall clock'] },
                { label: 'Vases', slug: 'vases', keywords: ['vase', 'flower vase'] },
                { label: 'Artificial Flowers & Plants', slug: 'artificial-flowers-plants', keywords: ['artificial flowers', 'plants'] },
                { label: 'Candles & Candle Holders', slug: 'candles-holders', keywords: ['candles', 'candle holder'] },
                { label: 'Decorative Items', slug: 'decorative-items', keywords: ['decorative items', 'artifacts'] },
                { label: 'Showpieces', slug: 'showpieces', keywords: ['showpieces', 'statues'] },
                { label: 'Mirrors', slug: 'mirrors', keywords: ['mirrors', 'wall mirror'] },
            ]
        },
        {
            title: 'Home Furnishing',
            displayTitle: 'Home Furnishing',
            slug: 'home-furnishing',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80',
            subtitle: 'Bedsheets, Curtains & Rugs',
            items: [
                { label: 'Bedsheets', slug: 'bedsheets', keywords: ['bedsheet', 'fitted sheet', 'bed cover'] },
                { label: 'Blankets & Quilts', slug: 'blankets-quilts', keywords: ['blanket', 'quilt', 'dohar'] },
                { label: 'Pillows & Cushions', slug: 'pillows-cushions', keywords: ['pillow', 'cushion', 'cushion cover'] },
                { label: 'Curtains', slug: 'curtains', keywords: ['curtains', 'drapes', 'blackout'] },
                { label: 'Carpets & Rugs', slug: 'carpets-rugs', keywords: ['carpet', 'rug', 'dhurrie'] },
                { label: 'Mats & Doormats', slug: 'mats-doormats', keywords: ['mat', 'doormat', 'bath mat'] },
                { label: 'Sofa Covers', slug: 'sofa-covers', keywords: ['sofa cover', 'slipcover'] },
                { label: 'Table Covers', slug: 'table-covers', keywords: ['table cover', 'table cloth', 'runner'] },
            ]
        },
        {
            title: 'Furniture',
            displayTitle: 'Furniture',
            slug: 'furniture',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80',
            subtitle: 'Chairs, Sofas, Beds & Tables',
            items: [
                { label: 'Chairs', slug: 'chairs', keywords: ['chair', 'office chair', 'armchair'] },
                { label: 'Tables', slug: 'tables', keywords: ['table', 'coffee table', 'dining table'] },
                { label: 'Sofas', slug: 'sofas', keywords: ['sofa', 'couch', 'recliner'] },
                { label: 'Beds', slug: 'beds', keywords: ['bed', 'king bed', 'queen bed'] },
                { label: 'Wardrobes', slug: 'wardrobes', keywords: ['wardrobe', 'almirah', 'closet'] },
                { label: 'Shoe Racks', slug: 'shoe-racks', keywords: ['shoe rack', 'shoe cabinet'] },
                { label: 'Bookshelves', slug: 'bookshelves', keywords: ['bookshelf', 'bookcase'] },
                { label: 'TV Units', slug: 'tv-units', keywords: ['tv unit', 'entertainment center'] },
                { label: 'Storage Cabinets', slug: 'storage-cabinets', keywords: ['cabinet', 'cupboard'] },
            ]
        },
        {
            title: 'Home Storage & Organization',
            displayTitle: 'Home Storage & Organization',
            slug: 'home-storage-organization',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80',
            subtitle: 'Boxes, Baskets & Organizers',
            items: [
                { label: 'Storage Boxes', slug: 'storage-boxes', keywords: ['storage box', 'cloth box'] },
                { label: 'Baskets', slug: 'baskets', keywords: ['basket', 'woven basket'] },
                { label: 'Drawer Organizers', slug: 'drawer-organizers', keywords: ['drawer organizer', 'divider'] },
                { label: 'Wardrobe Organizers', slug: 'wardrobe-organizers', keywords: ['wardrobe organizer', 'hanger'] },
                { label: 'Shoe Organizers', slug: 'shoe-organizers', keywords: ['shoe organizer', 'shoe bag'] },
                { label: 'Kitchen Storage', slug: 'kitchen-storage', keywords: ['kitchen storage', 'spice rack'] },
                { label: 'Laundry Baskets', slug: 'laundry-baskets', keywords: ['laundry basket', 'hamper'] },
                { label: 'Multipurpose Racks', slug: 'multipurpose-racks', keywords: ['rack', 'multipurpose shelf'] },
            ]
        },
        {
            title: 'Cleaning & Household',
            displayTitle: 'Cleaning & Household',
            slug: 'cleaning-household',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80',
            subtitle: 'Mops, Brooms & Cleaning Tools',
            items: [
                { label: 'Cleaning Tools', slug: 'cleaning-tools', keywords: ['cleaning tool', 'duster', 'wiper'] },
                { label: 'Mops & Brooms', slug: 'mops-brooms', keywords: ['mop', 'broom', 'spin mop'] },
                { label: 'Dustpans', slug: 'dustpans', keywords: ['dustpan'] },
                { label: 'Brushes & Scrubbers', slug: 'brushes-scrubbers', keywords: ['brush', 'scrubber'] },
                { label: 'Cleaning Buckets', slug: 'cleaning-buckets', keywords: ['bucket', 'mop bucket'] },
                { label: 'Garbage Bins', slug: 'garbage-bins', keywords: ['dustbin', 'garbage bin'] },
                { label: 'Laundry Accessories', slug: 'laundry-accessories', keywords: ['laundry rope', 'cloth clips'] },
                { label: 'Cleaning Supplies', slug: 'cleaning-supplies', keywords: ['detergent', 'floor cleaner'] },
            ]
        },
        {
            title: 'Kitchen Appliances',
            displayTitle: 'Kitchen Appliances',
            slug: 'kitchen-appliances',
            image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&q=80',
            subtitle: 'Mixers, Air Fryers & Toasters',
            items: [
                { label: 'Mixer Grinders', slug: 'mixer-grinders', keywords: ['mixer grinder', 'blender'] },
                { label: 'Electric Kettles', slug: 'electric-kettles', keywords: ['electric kettle'] },
                { label: 'Induction Cooktops', slug: 'induction-cooktops', keywords: ['induction cooktop'] },
                { label: 'Air Fryers', slug: 'air-fryers', keywords: ['air fryer'] },
                { label: 'Rice Cookers', slug: 'rice-cookers', keywords: ['rice cooker'] },
                { label: 'Toasters', slug: 'toasters', keywords: ['toaster', 'pop up toaster'] },
                { label: 'Sandwich Makers', slug: 'sandwich-makers', keywords: ['sandwich maker', 'grill'] },
                { label: 'Choppers', slug: 'choppers', keywords: ['chopper', 'vegetable chopper'] },
                { label: 'Juicers', slug: 'juicers', keywords: ['juicer', 'cold press juicer'] },
                { label: 'Coffee Makers', slug: 'coffee-makers', keywords: ['coffee maker', 'espresso machine'] },
            ]
        },
        {
            title: 'Home Appliances',
            displayTitle: 'Home Appliances',
            slug: 'home-appliances',
            image: 'https://images.unsplash.com/photo-1558389186-438424b00a32?w=300&q=80',
            subtitle: 'Fans, Vacuum Cleaners & Irons',
            items: [
                { label: 'Fans', slug: 'fans', keywords: ['fan', 'ceiling fan', 'table fan'] },
                { label: 'Air Coolers', slug: 'air-coolers', keywords: ['air cooler', 'desert cooler'] },
                { label: 'Vacuum Cleaners', slug: 'vacuum-cleaners', keywords: ['vacuum cleaner', 'robot vacuum'] },
                { label: 'Air Purifiers', slug: 'air-purifiers', keywords: ['air purifier', 'hepa'] },
                { label: 'Irons', slug: 'irons', keywords: ['steam iron', 'dry iron'] },
                { label: 'Water Heaters', slug: 'water-heaters', keywords: ['water heater', 'geyser'] },
                { label: 'Room Heaters', slug: 'room-heaters', keywords: ['room heater', 'oil heater'] },
            ]
        },
        {
            title: 'Bathroom',
            displayTitle: 'Bathroom',
            slug: 'bathroom',
            image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&q=80',
            subtitle: 'Towels, Dispensers & Organizers',
            items: [
                { label: 'Bath Towels', slug: 'bath-towels', keywords: ['bath towel', 'towel set'] },
                { label: 'Shower Curtains', slug: 'shower-curtains', keywords: ['shower curtain'] },
                { label: 'Bath Mats', slug: 'bath-mats', keywords: ['bath mat', 'anti skid mat'] },
                { label: 'Bathroom Organizers', slug: 'bathroom-organizers', keywords: ['bathroom shelf', 'caddy'] },
                { label: 'Soap Dispensers', slug: 'soap-dispensers', keywords: ['soap dispenser'] },
                { label: 'Toothbrush Holders', slug: 'toothbrush-holders', keywords: ['toothbrush holder'] },
                { label: 'Bathroom Accessories', slug: 'bathroom-accessories', keywords: ['bathroom accessories'] },
                { label: 'Cleaning Accessories', slug: 'cleaning-accessories', keywords: ['toilet brush'] },
            ]
        },
        {
            title: 'Lighting',
            displayTitle: 'Lighting',
            slug: 'lighting',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80',
            subtitle: 'Table Lamps, Ceiling & Smart Lights',
            items: [
                { label: 'Table Lamps', slug: 'table-lamps', keywords: ['table lamp', 'bedside lamp'] },
                { label: 'Floor Lamps', slug: 'floor-lamps', keywords: ['floor lamp', 'standing lamp'] },
                { label: 'Ceiling Lights', slug: 'ceiling-lights', keywords: ['ceiling light', 'chandelier'] },
                { label: 'Wall Lights', slug: 'wall-lights', keywords: ['wall light', 'sconce'] },
                { label: 'LED Lights', slug: 'led-lights', keywords: ['led light', 'led bulb'] },
                { label: 'Decorative Lights', slug: 'decorative-lights', keywords: ['decorative lights', 'fairy lights'] },
                { label: 'Night Lamps', slug: 'night-lamps', keywords: ['night lamp'] },
                { label: 'Smart Lighting', slug: 'smart-lighting', keywords: ['smart light', 'smart bulb'] },
            ]
        },
        {
            title: 'Gardening & Outdoor',
            displayTitle: 'Gardening & Outdoor',
            slug: 'gardening-outdoor',
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80',
            subtitle: 'Pots, Planters & Tools',
            items: [
                { label: 'Plant Pots', slug: 'plant-pots', keywords: ['plant pots', 'ceramic pots'] },
                { label: 'Planters', slug: 'planters', keywords: ['planters', 'hanging planters'] },
                { label: 'Gardening Tools', slug: 'gardening-tools', keywords: ['gardening tools', 'trowel', 'pruner'] },
                { label: 'Seeds', slug: 'seeds', keywords: ['seeds', 'flower seeds', 'vegetable seeds'] },
                { label: 'Watering Cans', slug: 'watering-cans', keywords: ['watering can'] },
                { label: 'Garden Décor', slug: 'garden-decor', keywords: ['garden decor', 'fountain'] },
                { label: 'Artificial Plants', slug: 'artificial-plants', keywords: ['artificial plants', 'faux grass'] },
                { label: 'Outdoor Furniture', slug: 'outdoor-furniture', keywords: ['outdoor furniture', 'patio chair'] },
            ]
        },
        {
            title: 'Home Improvement',
            displayTitle: 'Home Improvement',
            slug: 'home-improvement',
            image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=300&q=80',
            subtitle: 'Hardware, Tools & Electricals',
            items: [
                { label: 'Hardware', slug: 'hardware', keywords: ['hardware', 'screws', 'nails'] },
                { label: 'Tools', slug: 'tools', keywords: ['tools', 'tool kit', 'drill', 'wrench'] },
                { label: 'Electrical Accessories', slug: 'electrical-accessories', keywords: ['electrical accessories'] },
                { label: 'Switches & Sockets', slug: 'switches-sockets', keywords: ['switches', 'sockets'] },
                { label: 'Extension Boards', slug: 'extension-boards', keywords: ['extension board', 'spike buster'] },
                { label: 'Adhesives & Tapes', slug: 'adhesives-tapes', keywords: ['adhesives', 'tapes', 'fevikwik'] },
                { label: 'Door & Window Accessories', slug: 'door-window-accessories', keywords: ['door handle', 'hinge', 'door lock'] },
            ]
        }
    ],

    'electronics': [
        {
            title: 'Mobiles & Wearables',
            displayTitle: 'Mobiles & Wearables',
            slug: 'mobiles-wearables',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80',
            subtitle: 'Smartphones & Fitness Bands',
            items: [
                { label: 'Mobiles & Accessories', slug: 'mobiles', keywords: ['smartphone', 'case', 'charger'] },
                { label: 'Smart Wearables', slug: 'wearables', keywords: ['smartwatch', 'fitness band'] },
            ]
        },
        {
            title: 'Computers & Gaming',
            displayTitle: 'Computers & Gaming',
            slug: 'computers-gaming',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80',
            subtitle: 'Laptops, Tablets & Gaming',
            items: [
                { label: 'Laptops & Tablets', slug: 'laptops', keywords: ['laptop', 'macbook', 'ipad'] },
                { label: 'Gaming', slug: 'gaming', keywords: ['console', 'controller', 'ps5'] },
            ]
        },
        {
            title: 'Audio & Visual',
            displayTitle: 'Audio & Cameras',
            slug: 'audio-visual',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80',
            subtitle: 'Headphones, Speakers & Cameras',
            items: [
                { label: 'Audio Devices', slug: 'audio', keywords: ['headphones', 'speakers', 'earbuds'] },
                { label: 'Cameras & Photography', slug: 'cameras', keywords: ['dslr', 'action camera', 'lens'] },
            ]
        }
    ],

    'pooja-items': [
        {
            title: 'Pooja Essentials',
            displayTitle: 'Pooja Essentials',
            slug: 'pooja-essentials',
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&q=80',
            subtitle: 'Thali Sets, Kalash, Shankh & Bells',
            items: [
                { label: 'Pooja Thali Sets', slug: 'pooja-thali-sets', keywords: ['thali', 'pooja thali', 'brass thali'] },
                { label: 'Pooja Plates', slug: 'pooja-plates', keywords: ['pooja plate', 'aarti plate', 'brass plate'] },
                { label: 'Pooja Bowls', slug: 'pooja-bowls', keywords: ['pooja bowl', 'katori', 'brass bowl'] },
                { label: 'Kalash', slug: 'kalash', keywords: ['kalash', 'copper kalash', 'lota'] },
                { label: 'Shankh', slug: 'shankh', keywords: ['shankh', 'conch', 'blowing shankh'] },
                { label: 'Pooja Bells', slug: 'pooja-bells', keywords: ['bell', 'ghanti', 'pooja bell'] },
                { label: 'Aarti Plates', slug: 'aarti-plates', keywords: ['aarti plate', 'deepam thali'] },
                { label: 'Camphor Holders', slug: 'camphor-holders', keywords: ['camphor holder', 'kapur dani', 'aarti spoon'] },
            ]
        },
        {
            title: 'Diyas & Lamps',
            displayTitle: 'Diyas & Lamps',
            slug: 'diyas-lamps',
            image: 'https://images.unsplash.com/photo-1572798089532-487718bc9d26?w=400&q=80',
            subtitle: 'Brass, Clay, Silver & Akhand Diyas',
            items: [
                { label: 'Brass Diyas', slug: 'brass-diyas', keywords: ['brass diya', 'oil lamp', 'peacock diya'] },
                { label: 'Clay Diyas', slug: 'clay-diyas', keywords: ['clay diya', 'mitti diya', 'terracotta diya'] },
                { label: 'Silver Diyas', slug: 'silver-diyas', keywords: ['silver diya', 'chandi diya'] },
                { label: 'Hanging Diyas', slug: 'hanging-diyas', keywords: ['hanging diya', 'chain lamp'] },
                { label: 'Akhand Diyas', slug: 'akhand-diyas', keywords: ['akhand diya', 'glass diya', 'brass akhand'] },
                { label: 'Oil Lamps', slug: 'oil-lamps', keywords: ['oil lamp', 'kuthu vilakku', 'deepam'] },
                { label: 'Ghee Lamps', slug: 'ghee-lamps', keywords: ['ghee lamp', 'ghee diya'] },
                { label: 'Diya Sets', slug: 'diya-sets', keywords: ['diya set', 'festive diyas'] },
            ]
        },
        {
            title: 'Incense & Fragrance',
            displayTitle: 'Incense & Fragrance',
            slug: 'incense-fragrance',
            image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
            subtitle: 'Agarbatti, Dhoop, Camphor & Loban',
            items: [
                { label: 'Agarbatti', slug: 'agarbatti', keywords: ['agarbatti', 'incense sticks', 'chandan'] },
                { label: 'Dhoop Sticks', slug: 'dhoop-sticks', keywords: ['dhoop sticks', 'charcoal free dhoop'] },
                { label: 'Dhoop Cones', slug: 'dhoop-cones', keywords: ['dhoop cones', 'backflow cones'] },
                { label: 'Sambrani', slug: 'sambrani', keywords: ['sambrani', 'dhoop cups', 'benzoin'] },
                { label: 'Camphor', slug: 'camphor', keywords: ['camphor', 'bhimseni camphor', 'kapoor'] },
                { label: 'Loban', slug: 'loban', keywords: ['loban', 'pure loban resin'] },
                { label: 'Havan Cups', slug: 'havan-cups', keywords: ['havan cups', 'sambrani cups'] },
            ]
        },
        {
            title: 'Pooja Samagri',
            displayTitle: 'Pooja Samagri',
            slug: 'pooja-samagri',
            image: 'https://images.unsplash.com/photo-1615716175523-c351f0447fa4?w=400&q=80',
            subtitle: 'Kits, Cotton Wicks, Sacred Thread & Dry Fruits',
            items: [
                { label: 'Pooja Samagri Kits', slug: 'pooja-samagri-kits', keywords: ['samagri kit', 'puja box'] },
                { label: 'Havan Samagri', slug: 'havan-samagri', keywords: ['havan samagri', 'herbal samagri'] },
                { label: 'Navagraha Samagri', slug: 'navagraha-samagri', keywords: ['navagraha samagri', 'navgrah'] },
                { label: 'Cotton Wicks', slug: 'cotton-wicks', keywords: ['cotton wicks', 'batti', 'phool batti'] },
                { label: 'Sacred Thread', slug: 'sacred-thread', keywords: ['sacred thread', 'janeu', 'kalawa', 'moli'] },
                { label: 'Betel Nuts', slug: 'betel-nuts', keywords: ['betel nuts', 'supari', 'pooja supari'] },
                { label: 'Betel Leaves', slug: 'betel-leaves', keywords: ['betel leaves', 'paan ke patte'] },
                { label: 'Pooja Dry Fruits', slug: 'pooja-dry-fruits', keywords: ['panchmeva', 'pooja dry fruits'] },
            ]
        },
        {
            title: 'Idols & Statues',
            displayTitle: 'Idols & Statues',
            slug: 'idols-statues',
            image: 'https://images.unsplash.com/photo-1590076241940-02a8b29e64e5?w=400&q=80',
            subtitle: 'Ganesha, Lakshmi, Krishna, Shiva & Deities',
            items: [
                { label: 'Ganesha Idols', slug: 'ganesha-idols', keywords: ['ganesha idol', 'ganpati murti'] },
                { label: 'Lakshmi Idols', slug: 'lakshmi-idols', keywords: ['lakshmi idol', 'laxmi murti'] },
                { label: 'Krishna Idols', slug: 'krishna-idols', keywords: ['krishna idol', 'laddu gopal'] },
                { label: 'Shiva Idols', slug: 'shiva-idols', keywords: ['shiva idol', 'shivling', 'shiva statue'] },
                { label: 'Durga Idols', slug: 'durga-idols', keywords: ['durga idol', 'sherawali mata'] },
                { label: 'Hanuman Idols', slug: 'hanuman-idols', keywords: ['hanuman idol', 'bajrangbali statue'] },
                { label: 'Murugan Idols', slug: 'murugan-idols', keywords: ['murugan idol', 'kartikeya'] },
                { label: 'Saraswati Idols', slug: 'saraswati-idols', keywords: ['saraswati idol', 'saraswati statue'] },
                { label: 'Vishnu Idols', slug: 'vishnu-idols', keywords: ['vishnu idol', 'narayan murti'] },
                { label: 'Buddha Statues', slug: 'buddha-statues', keywords: ['buddha statue', 'meditating buddha'] },
            ]
        },
        {
            title: 'Pooja Accessories',
            displayTitle: 'Pooja Accessories',
            slug: 'pooja-accessories',
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&q=80',
            subtitle: 'Kumkum Boxes, Aarti Stands, Spoons & Asanas',
            items: [
                { label: 'Kumkum Boxes', slug: 'kumkum-boxes', keywords: ['kumkum box', 'sindoor dani', 'roli holder'] },
                { label: 'Sindoor Boxes', slug: 'sindoor-boxes', keywords: ['sindoor box', 'sindoor container'] },
                { label: 'Haldi Containers', slug: 'haldi-containers', keywords: ['haldi container', 'haldi kumkum stand'] },
                { label: 'Pooja Spoons', slug: 'pooja-spoons', keywords: ['pooja spoon', 'achamani spoon', 'panchapatra spoon'] },
                { label: 'Pooja Tongs', slug: 'pooja-tongs', keywords: ['pooja tongs', 'chimta'] },
                { label: 'Aarti Stands', slug: 'aarti-stands', keywords: ['aarti stand', 'panchaarti stand'] },
                { label: 'Pooja Cloth', slug: 'pooja-cloth', keywords: ['pooja cloth', 'red cloth', 'yellow cloth'] },
                { label: 'Pooja Asanas', slug: 'pooja-asanas', keywords: ['pooja asana', 'puja mat', 'velvet aasan'] },
            ]
        },
        {
            title: 'Pooja Decoration',
            displayTitle: 'Pooja Decoration',
            slug: 'pooja-decoration',
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
            subtitle: 'Garlands, Torans, Rangoli & Backdrops',
            items: [
                { label: 'Flower Garlands', slug: 'flower-garlands', keywords: ['flower garland', 'marigold garland', 'mala'] },
                { label: 'Artificial Flowers', slug: 'artificial-flowers', keywords: ['artificial flowers', 'mandir flowers'] },
                { label: 'Torans', slug: 'torans', keywords: ['toran', 'door toran', 'shubh labh toran'] },
                { label: 'Rangoli Items', slug: 'rangoli-items', keywords: ['rangoli colors', 'rangoli stencils', 'acrylic rangoli'] },
                { label: 'Mandir Decorations', slug: 'mandir-decorations', keywords: ['mandir decoration', 'temple decor'] },
                { label: 'Decorative Diyas', slug: 'decorative-diyas', keywords: ['decorative diya', 'designer diya'] },
                { label: 'Pooja Backdrops', slug: 'pooja-backdrops', keywords: ['pooja backdrop', 'mandir curtain backdrop'] },
            ]
        },
        {
            title: 'Home Temple / Mandir',
            displayTitle: 'Home Temple / Mandir',
            slug: 'home-temple-mandir',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
            subtitle: 'Wooden, Wall-Mounted & Tabletop Mandirs',
            items: [
                { label: 'Wooden Pooja Mandirs', slug: 'wooden-pooja-mandirs', keywords: ['wooden mandir', 'teak mandir', 'temple'] },
                { label: 'Wall-Mounted Mandirs', slug: 'wall-mounted-mandirs', keywords: ['wall mounted mandir', 'hanging mandir'] },
                { label: 'Tabletop Mandirs', slug: 'tabletop-mandirs', keywords: ['tabletop mandir', 'portable mandir'] },
                { label: 'Mandir Shelves', slug: 'mandir-shelves', keywords: ['mandir shelf', 'pooja shelf'] },
                { label: 'Mandir Curtains', slug: 'mandir-curtains', keywords: ['mandir curtain', 'mandir parda'] },
                { label: 'Mandir Doors', slug: 'mandir-doors', keywords: ['mandir door', 'temple doors'] },
                { label: 'Mandir Lighting', slug: 'mandir-lighting', keywords: ['mandir light', 'temple led lights', 'spotlight'] },
            ]
        },
        {
            title: 'Rudraksha & Spiritual',
            displayTitle: 'Rudraksha & Spiritual',
            slug: 'rudraksha-spiritual',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
            subtitle: 'Rudraksha Mala, Tulsi Mala, Jap Mala & Yantras',
            items: [
                { label: 'Rudraksha Mala', slug: 'rudraksha-mala', keywords: ['rudraksha mala', '5 mukhi rudraksha', '108 beads'] },
                { label: 'Rudraksha Beads', slug: 'rudraksha-beads', keywords: ['rudraksha bead', 'original rudraksha'] },
                { label: 'Tulsi Mala', slug: 'tulsi-mala', keywords: ['tulsi mala', 'original tulsi beads', 'iskcon mala'] },
                { label: 'Jap Mala', slug: 'jap-mala', keywords: ['jap mala', 'chanting beads', 'japa bag'] },
                { label: 'Yantras', slug: 'yantras', keywords: ['yantra', 'shree yantra', 'kuber yantra'] },
                { label: 'Spiritual Bracelets', slug: 'spiritual-bracelets', keywords: ['spiritual bracelet', 'rudraksha bracelet'] },
                { label: 'Meditation Beads', slug: 'meditation-beads', keywords: ['meditation beads', 'prayer beads'] },
            ]
        },
        {
            title: 'Religious Books',
            displayTitle: 'Religious Books',
            slug: 'religious-books',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
            subtitle: 'Bhagavad Gita, Mantras, Chalisas & Panchang',
            items: [
                { label: 'Bhagavad Gita', slug: 'bhagavad-gita', keywords: ['bhagavad gita', 'gita', 'iskcon gita'] },
                { label: 'Mantra Books', slug: 'mantra-books', keywords: ['mantra book', 'vedic mantras'] },
                { label: 'Chalisa Books', slug: 'chalisa-books', keywords: ['hanuman chalisa', 'durga chalisa', 'chalisa sangrah'] },
                { label: 'Pooja Vidhi Books', slug: 'pooja-vidhi-books', keywords: ['pooja vidhi', 'vrat katha'] },
                { label: 'Religious Calendars', slug: 'religious-calendars', keywords: ['religious calendar', 'hindu calendar'] },
                { label: 'Panchang', slug: 'panchang', keywords: ['panchang', 'hindu panchang', 'muhurat'] },
            ]
        },
        {
            title: 'Havan & Yagna',
            displayTitle: 'Havan & Yagna',
            slug: 'havan-yagna',
            image: 'https://images.unsplash.com/photo-1756367308844-69632dabe687?w=400&q=80',
            subtitle: 'Havan Kund, Samagri, Wood & Spoons',
            items: [
                { label: 'Havan Kund', slug: 'havan-kund', keywords: ['havan kund', 'copper havan kund', 'yagna kund'] },
                { label: 'Havan Samagri', slug: 'havan-samagri', keywords: ['havan samagri', 'yagna samagri'] },
                { label: 'Havan Wood', slug: 'havan-wood', keywords: ['havan wood', 'aam ki lakdi', 'mango wood'] },
                { label: 'Havan Cups', slug: 'havan-cups', keywords: ['havan cups', 'guggal cups', 'ready havan'] },
                { label: 'Havan Spoons', slug: 'havan-spoons', keywords: ['havan spoon', 'sruk sruva', 'ghee spoon'] },
                { label: 'Yagna Accessories', slug: 'yagna-accessories', keywords: ['yagna accessories', 'homa items'] },
            ]
        },
        {
            title: 'Festival Pooja Kits',
            displayTitle: 'Festival Pooja Kits',
            slug: 'festival-pooja-kits',
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
            subtitle: 'Diwali, Ganesh, Navratri & Varalakshmi Kits',
            items: [
                { label: 'Diwali Pooja Kits', slug: 'diwali-pooja-kits', keywords: ['diwali pooja kit', 'lakshmi pujan box'] },
                { label: 'Ganesh Chaturthi Kits', slug: 'ganesh-chaturthi-kits', keywords: ['ganesh chaturthi kit', 'ganpati puja set'] },
                { label: 'Navratri Pooja Kits', slug: 'navratri-pooja-kits', keywords: ['navratri pooja kit', 'durga puja kit'] },
                { label: 'Lakshmi Pooja Kits', slug: 'lakshmi-pooja-kits', keywords: ['lakshmi pooja kit', 'kubera pooja kit'] },
                { label: 'Satyanarayan Pooja Kits', slug: 'satyanarayan-pooja-kits', keywords: ['satyanarayan pooja kit'] },
                { label: 'Varalakshmi Pooja Kits', slug: 'varalakshmi-pooja-kits', keywords: ['varalakshmi pooja kit', 'varalakshmi vratham set'] },
                { label: 'Pongal Pooja Kits', slug: 'pongal-pooja-kits', keywords: ['pongal pooja kit', 'sankranti puja'] },
                { label: 'Janmashtami Pooja Kits', slug: 'janmashtami-pooja-kits', keywords: ['janmashtami pooja kit', 'krishna puja set'] },
                { label: 'Shivratri Pooja Kits', slug: 'shivratri-pooja-kits', keywords: ['shivratri pooja kit', 'maha shivratri kit'] },
            ]
        },
        {
            title: 'Brass & Silver Pooja Items',
            displayTitle: 'Brass & Silver Pooja Items',
            slug: 'brass-silver-pooja-items',
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&q=80',
            subtitle: 'Brass Bells, Kalash, Idols & Silver Coins',
            items: [
                { label: 'Brass Diyas', slug: 'brass-diyas', keywords: ['brass diya', 'brass oil lamp'] },
                { label: 'Brass Bells', slug: 'brass-bells', keywords: ['brass bell', 'brass ghanti'] },
                { label: 'Brass Kalash', slug: 'brass-kalash', keywords: ['brass kalash', 'embossed lota'] },
                { label: 'Brass Idols', slug: 'brass-idols', keywords: ['brass idol', 'brass god statue'] },
                { label: 'Brass Pooja Sets', slug: 'brass-pooja-sets', keywords: ['brass pooja set', 'complete brass thali'] },
                { label: 'Silver Coins', slug: 'silver-coins', keywords: ['silver coin', 'lakshmi ganesh silver coin', '999 silver'] },
                { label: 'Silver Pooja Items', slug: 'silver-pooja-items', keywords: ['silver pooja item', 'chandi diya', 'silver thali'] },
            ]
        },
        {
            title: 'Pooja Storage',
            displayTitle: 'Pooja Storage',
            slug: 'pooja-storage',
            image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
            subtitle: 'Boxes, Samagri Containers & Organizers',
            items: [
                { label: 'Pooja Boxes', slug: 'pooja-boxes', keywords: ['pooja box', 'wooden pooja box'] },
                { label: 'Samagri Storage Containers', slug: 'samagri-storage-containers', keywords: ['samagri container', 'spice container'] },
                { label: 'Pooja Organizers', slug: 'pooja-organizers', keywords: ['pooja organizer', 'mandir organizer'] },
                { label: 'Kumkum Containers', slug: 'kumkum-containers', keywords: ['kumkum container', 'roli chawal box'] },
                { label: 'Pooja Storage Sets', slug: 'pooja-storage-sets', keywords: ['pooja storage set', 'brass dabba set'] },
            ]
        }
    ],

    'gifts': [
        {
            title: 'Celebrations',
            displayTitle: 'Celebrations & Festive',
            slug: 'celebrations',
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&q=80',
            subtitle: 'Diwali Hampers & Bouquets',
            items: [
                { label: 'Birthday', slug: 'birthday', keywords: ['birthday gift'] },
                { label: 'Anniversary', slug: 'anniversary', keywords: ['anniversary gift'] },
                { label: 'Wedding', slug: 'wedding', keywords: ['wedding gift'] },
                { label: 'Festive', slug: 'festive', keywords: ['diwali gift', 'festive box'] },
            ]
        },
        {
            title: 'Curated & Custom',
            displayTitle: 'Curated & Personalized Gifts',
            slug: 'curated-custom',
            image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80',
            subtitle: 'Keepsake Boxes & Custom Hampers',
            items: [
                { label: 'Personalized', slug: 'personalized', keywords: ['custom gift', 'engraved'] },
                { label: 'Corporate', slug: 'corporate', keywords: ['hampers', 'executive gift'] },
            ]
        }
    ],

    'healthy-foods': [
        {
            title: 'Organic & Vegan',
            displayTitle: 'Organic & Vegan Snacks',
            slug: 'organic-vegan',
            image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300&q=80',
            subtitle: 'Almonds, Makhana & Superfoods',
            items: [
                { label: 'Organic Snacks', slug: 'organic-snacks', keywords: ['dry fruits', 'makhana', 'seeds'] },
                { label: 'Vegan Essentials', slug: 'vegan-essentials', keywords: ['plant based', 'oat milk', 'tofu'] },
                { label: 'Superfoods', slug: 'superfoods', keywords: ['chia seeds', 'spirulina', 'quinoa'] },
            ]
        },
        {
            title: 'Diet & Beverages',
            displayTitle: 'Diet & Beverages',
            slug: 'diet-beverages',
            image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80',
            subtitle: 'Diet Nutrition & Healthy Teas',
            items: [
                { label: 'Diet & Nutrition', slug: 'diet-nutrition', keywords: ['whey', 'granola', 'energy bars'] },
                { label: 'Gluten-Free', slug: 'gluten-free', keywords: ['gluten free flour', 'quinoa'] },
                { label: 'Healthy Beverages', slug: 'healthy-beverages', keywords: ['green tea', 'kombucha', 'herbal tea'] },
            ]
        }
    ],

    'stationary': [
        {
            title: 'Writing & Notebooks',
            displayTitle: 'Writing & Notebooks',
            slug: 'writing-notebooks',
            image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&q=80',
            subtitle: 'Pens, Journals & Diaries',
            items: [
                { label: 'Pens & Pencils', slug: 'pens', keywords: ['pen', 'pencil', 'ball pen'] },
                { label: 'Notebooks & Registers', slug: 'spiral-notebooks', keywords: ['notebook', 'spiral notebook'] },
                { label: 'Diaries & Planners', slug: 'planners', keywords: ['diary', 'planner', 'journal'] },
                { label: 'Sticky Notes', slug: 'sticky-notes', keywords: ['sticky note', 'memo'] },
            ]
        },
        {
            title: 'Art & Office Supplies',
            displayTitle: 'Art & Office Supplies',
            slug: 'art-office',
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=80',
            subtitle: 'Paints, Brushes & Desk Organizers',
            items: [
                { label: 'Paints & Colors', slug: 'paints', keywords: ['acrylic paint', 'watercolor'] },
                { label: 'Desk Organizers', slug: 'desk-organizers', keywords: ['desk organizer', 'pen stand'] },
                { label: 'Files & Folders', slug: 'files-folders', keywords: ['files', 'folder'] },
                { label: 'Staplers & Scissors', slug: 'staplers', keywords: ['stapler', 'scissors', 'tape'] },
            ]
        }
    ],

    'grocery': [
        {
            title: 'Staples & Grains',
            displayTitle: 'Staples & Grains',
            slug: 'staples-grains',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80',
            subtitle: 'Rice, Atta, Dals & Oils',
            items: [
                { label: 'Basmati Rice', slug: 'rice', keywords: ['basmati rice', 'rice'] },
                { label: 'Atta & Flours', slug: 'atta-flour', keywords: ['atta', 'wheat flour'] },
                { label: 'Pulses & Dals', slug: 'pulses-dals', keywords: ['dal', 'pulses'] },
                { label: 'Cooking Oils & Ghee', slug: 'cooking-oil', keywords: ['cooking oil', 'ghee', 'mustard oil'] },
            ]
        },
        {
            title: 'Dry Fruits & Gourmet',
            displayTitle: 'Dry Fruits & Gourmet',
            slug: 'dryfruits-gourmet',
            image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&q=80',
            subtitle: 'Almonds, Cashews, Teas & Pasta',
            items: [
                { label: 'Almonds & Cashews', slug: 'almonds', keywords: ['almonds', 'cashews', 'badam', 'kaju'] },
                { label: 'Walnuts & Pistachios', slug: 'walnuts-pistachios', keywords: ['walnuts', 'pistachios', 'pista'] },
                { label: 'Green Tea & Coffee', slug: 'green-tea', keywords: ['green tea', 'coffee'] },
                { label: 'Olive Oil & Pasta', slug: 'olive-oil', keywords: ['olive oil', 'pasta'] },
            ]
        }
    ],

    'mens': [
        {
            title: 'Topwear & Shirts',
            displayTitle: "Men's Topwear & Shirts",
            slug: 'topwear',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80',
            subtitle: 'Formal & Casual Shirts, T-Shirts',
            items: [
                { label: 'Shirts', slug: 'shirts', keywords: ['shirt', 'formal shirt', 'casual shirt'] },
                { label: 'T-Shirts', slug: 't-shirts', keywords: ['t-shirt', 'tee', 'polo'] },
            ]
        },
        {
            title: 'Bottomwear & Shoes',
            displayTitle: "Men's Bottomwear & Shoes",
            slug: 'bottomwear-shoes',
            image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300&q=80',
            subtitle: 'Formal Shoes, Sneakers & Jeans',
            items: [
                { label: 'Shoes', slug: 'shoes', keywords: ['shoes', 'sneakers', 'leather shoes'] },
            ]
        },
        {
            title: 'Accessories & Watches',
            displayTitle: "Men's Accessories & Watches",
            slug: 'accessories',
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&q=80',
            subtitle: 'Watches, Wallets & Belts',
            items: [
                { label: 'Watches', slug: 'watches', keywords: ['watch', 'chronograph'] },
                { label: 'Accessories', slug: 'accessories', keywords: ['belt', 'wallet', 'tie'] },
            ]
        }
    ],

    'women': [
        {
            title: 'Ethnic & Dresses',
            displayTitle: "Women's Ethnic & Dresses",
            slug: 'ethnic-dresses',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
            subtitle: 'Sarees, Kurtis & Dresses',
            items: [
                { label: 'Dresses', slug: 'dresses', keywords: ['dress', 'gown', 'midi'] },
                { label: 'Kurtis', slug: 'kurtis', keywords: ['kurti', 'kurta', 'anarkali'] },
                { label: 'Sarees', slug: 'sarees', keywords: ['saree', 'silk saree'] },
            ]
        },
        {
            title: 'Western & Tops',
            displayTitle: "Women's Western & Tops",
            slug: 'western-tops',
            image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&q=80',
            subtitle: 'Crop Tops, Blouses & Denims',
            items: [
                { label: 'Tops', slug: 'tops', keywords: ['top', 'crop top', 'blouse'] },
            ]
        },
        {
            title: 'Accessories & Bags',
            displayTitle: "Women's Bags & Jewelry",
            slug: 'accessories-bags',
            image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=300&q=80',
            subtitle: 'Handbags & Pearl Jewelry',
            items: [
                { label: 'Handbags', slug: 'handbags', keywords: ['handbag', 'tote', 'clutch'] },
                { label: 'Jewelry', slug: 'jewelry', keywords: ['earrings', 'necklace', 'bracelet'] },
            ]
        }
    ],

    'fashion': [
        {
            title: 'Apparel',
            displayTitle: 'Fashion Apparel',
            slug: 'apparel',
            image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&q=80',
            subtitle: "Western, Ethnic & Men's Wear",
            items: [
                { label: 'Western Wear', slug: 'western-wear', keywords: ['dresses', 'jeans', 'tops'] },
                { label: 'Ethnic Wear', slug: 'ethnic-wear', keywords: ['sarees', 'kurtas', 'lehenga'] },
                { label: "Men's Wear", slug: 'men', keywords: ['men suits', 'shirts'] },
                { label: "Women's Wear", slug: 'women', keywords: ['gowns', 'dresses'] },
                { label: 'Activewear', slug: 'activewear', keywords: ['activewear', 'gym set'] },
            ]
        },
        {
            title: 'Footwear & Accents',
            displayTitle: 'Footwear & Accents',
            slug: 'footwear-accents',
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80',
            subtitle: 'Shoes, Handbags & Fine Jewellery',
            items: [
                { label: 'Footwear', slug: 'footwear', keywords: ['sneakers', 'sandals', 'heels'] },
                { label: 'Accessories', slug: 'accessories', keywords: ['sunglasses', 'belts', 'bags'] },
                { label: 'Jewellery', slug: 'jewellery', keywords: ['fine jewellery', 'watches'] },
            ]
        }
    ]
};

// Aliases for seamless routing
categorySections['footwears'] = categorySections['footwear'];
categorySections['jewelry'] = categorySections['jewellery'];
categorySections['lingerie-and-innerwears'] = categorySections['lingerie-innerwear'];
categorySections['inner-wear'] = categorySections['lingerie-innerwear'];
categorySections['innerwear'] = categorySections['lingerie-innerwear'];
categorySections['lingerie'] = categorySections['lingerie-innerwear'];
categorySections['nightwear'] = categorySections['night-lounge-wear'];
categorySections['night-wear'] = categorySections['night-lounge-wear'];
categorySections['winter-wear'] = categorySections['winterwear'];
categorySections['home-kitchen'] = categorySections['home-living'];
categorySections['stationery'] = categorySections['stationary'];
categorySections['groceries'] = categorySections['grocery'];
categorySections['pooja'] = categorySections['pooja-items'];

/**
 * Generate backward-compatible flat categorySubcategories mapping
 * where each item preserves { label, slug, section, sectionSlug }
 */
export const categorySubcategories = Object.entries(categorySections).reduce((acc, [catSlug, sections]) => {
    const flatList = [];
    const seen = new Set();
    sections.forEach(sec => {
        (sec.items || []).forEach(item => {
            const key = `${item.slug}-${sec.slug}`;
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
 * Transcribed from e-commerce department architecture (MEN, WOMEN, KIDS, BEAUTY, HOME & KITCHEN)
 * Contains quick-pick vertical sidebars, categorized multi-column subcategories, and top brands.
 */
export const departmentMegaMenu = {
    'men': {
        id: 'men',
        label: 'MEN',
        slug: 'men',
        defaultCollection: 'clothing',
        quickPicks: [
            { label: 'CLOTHING', slug: 'clothing', target: '/collection/clothing?section=men' },
            { label: 'FOOTWEAR', slug: 'footwear', target: '/collection/footwear?section=men' },
            { label: 'ACCESSORIES', slug: 'accessories', target: '/collection/accessories?section=men' },
            {
                label: "ALL THAT'S NEW",
                slug: 'all-thats-new',
                target: '/?deal=new arrivals',
                subItems: [
                    { label: 'Clothing', target: '/collection/clothing?section=men' },
                    { label: 'Footwear', target: '/collection/footwear?section=men' },
                    { label: 'Accessories', target: '/collection/accessories?section=men' },
                ]
            },
            { label: 'GMD GLOBAL', slug: 'global', target: '/products?search=Global' },
            { label: 'PLUS SIZE', slug: 'plus-size', target: '/products?search=Plus Size' },
            { label: 'NIGHT & LOUNGEWEAR', slug: 'night-lounge-wear', target: '/collection/night-lounge-wear?section=men' },
            { label: 'GROOMING', slug: 'grooming', badge: 'NEW', target: '/collection/beauty?section=grooming' },
            {
                label: 'WINTERWEAR',
                slug: 'winterwear',
                target: '/collection/winterwear?section=men',
                subItems: [
                    { label: 'Blazers & Waistcoats', target: '/collection/winterwear?subcategory=coats-blazers&section=men' },
                    { label: 'Jackets & Coats', target: '/collection/winterwear?subcategory=jackets-windcheaters&section=men' },
                    { label: 'Sweaters & Cardigans', target: '/collection/winterwear?subcategory=sweaters-cardigans&section=men' },
                    { label: 'Sweatshirts & Hoodie', target: '/collection/winterwear?subcategory=sweatshirts-hoodies&section=men' },
                ]
            }
        ],
        sections: [
            {
                title: 'WESTERN WEAR',
                slug: 'western-wear',
                category: 'clothing',
                items: [
                    { label: 'Jeans', slug: 'jeans', query: 'jeans' },
                    { label: 'Shirts', slug: 'shirts', query: 'shirts' },
                    { label: 'Shorts & 3/4ths', slug: 'shorts', query: 'shorts' },
                    { label: 'Suit Sets', slug: 'suit-sets', query: 'suit' },
                    { label: 'Track Pants', slug: 'track-pants', query: 'track pants' },
                    { label: 'Tracksuits', slug: 'tracksuits', query: 'tracksuit' },
                    { label: 'Trousers & Pants', slug: 'trousers-pants', query: 'trousers' },
                    { label: 'Tshirts', slug: 't-shirts', query: 't-shirt' },
                ]
            },
            {
                title: 'FOOTWEAR',
                slug: 'footwear',
                category: 'footwear',
                items: [
                    { label: 'Boots', slug: 'boots', query: 'boots' },
                    { label: 'Casual Shoes', slug: 'casual-shoes', query: 'casual shoes' },
                    { label: 'Flip Flops & Slippers', slug: 'flip-flops-slippers', query: 'slippers' },
                    { label: 'Formal Shoes', slug: 'formal-shoes', query: 'formal shoes' },
                    { label: 'Sandals', slug: 'sandals', query: 'sandals' },
                    { label: 'Sneakers', slug: 'sneakers', query: 'sneakers' },
                    { label: 'Sports Shoes', slug: 'sports-shoes', query: 'sports shoes' },
                ]
            },
            {
                title: 'ETHNIC WEAR',
                slug: 'ethnic-wear',
                category: 'clothing',
                items: [
                    { label: 'Ethnic Jackets', slug: 'ethnic-jackets', query: 'ethnic jacket' },
                    { label: 'Ethnic Suit Sets', slug: 'ethnic-suit-sets', query: 'ethnic suit' },
                    { label: 'Kurtas', slug: 'kurtas', query: 'kurtas' },
                    { label: 'Pyjamas & Churidars', slug: 'pyjamas-churidars', query: 'pyjamas' },
                    { label: 'Sherwani Sets', slug: 'sherwani-sets', query: 'sherwani' },
                    { label: 'Stoles', slug: 'stoles', query: 'stole' },
                ]
            },
            {
                title: 'ACCESSORIES',
                slug: 'accessories',
                category: 'accessories',
                items: [
                    { label: 'Backpacks', slug: 'backpacks', query: 'backpacks' },
                    { label: 'Belts', slug: 'belts', query: 'belts' },
                    { label: 'Caps & Hats', slug: 'caps-hats', query: 'caps' },
                    { label: 'Luggage & Trolley Bags', slug: 'luggage', query: 'luggage' },
                    { label: 'Perfumes & Colognes', slug: 'perfumes', query: 'perfume' },
                    { label: 'Socks', slug: 'socks', query: 'socks' },
                    { label: 'Sunglasses', slug: 'sunglasses', query: 'sunglasses' },
                    { label: 'Wallets', slug: 'wallets', query: 'wallets' },
                    { label: 'Watches', slug: 'watches', query: 'watches' },
                ]
            },
            {
                title: 'INNERWEAR',
                slug: 'innerwear',
                category: 'lingerie-innerwear',
                items: [
                    { label: 'Boxers', slug: 'boxers', query: 'boxers' },
                    { label: 'Briefs', slug: 'briefs', query: 'briefs' },
                    { label: 'Pyjamas', slug: 'pyjamas', query: 'pyjamas' },
                    { label: 'Thermal Wear', slug: 'thermal-wear', query: 'thermal' },
                    { label: 'Trunks', slug: 'trunks', query: 'trunks' },
                ]
            },
            {
                title: 'JEWELLERY',
                slug: 'jewellery',
                category: 'jewellery',
                items: [
                    { label: 'Bracelets & Kadas', slug: 'bracelets', query: 'bracelets' },
                    { label: 'Chains', slug: 'chains', query: 'chains' },
                    { label: 'Cufflinks & Tiepins', slug: 'cufflinks', query: 'cufflinks' },
                    { label: 'Earrings', slug: 'earrings', query: 'earrings' },
                    { label: 'Rings', slug: 'rings', query: 'rings' },
                ]
            },
            {
                title: 'GADGETS',
                slug: 'gadgets',
                category: 'gadgets',
                items: [
                    { label: 'Smart Wearables', slug: 'smart-wearables', query: 'smart wearables' },
                    { label: 'Fitness Gadgets', slug: 'fitness-gadgets', query: 'fitness tracker' },
                    { label: 'Headphones', slug: 'headphones', query: 'headphones' },
                    { label: 'Speakers', slug: 'speakers', query: 'speakers' },
                ]
            }
        ],
        brands: [
            { name: 'Nike', slug: 'nike' },
            { name: 'Adidas', slug: 'adidas' },
            { name: 'Puma', slug: 'puma' },
            { name: "Levi's", slug: 'levis' },
            { name: 'Jack & Jones', slug: 'jack-jones' },
            { name: 'Tommy Hilfiger', slug: 'tommy-hilfiger' },
            { name: 'U.S. Polo Assn.', slug: 'us-polo' },
            { name: 'Allen Solly', slug: 'allen-solly' },
            { name: 'Peter England', slug: 'peter-england' },
            { name: 'Wrangler', slug: 'wrangler' },
            { name: 'Spykar', slug: 'spykar' },
            { name: 'Netplay', slug: 'netplay' }
        ]
    },

    'women': {
        id: 'women',
        label: 'WOMEN',
        slug: 'women',
        defaultCollection: 'clothing',
        quickPicks: [
            { label: 'CLOTHING', slug: 'clothing', target: '/collection/clothing?section=women' },
            { label: 'FOOTWEAR', slug: 'footwear', target: '/collection/footwear?section=women' },
            { label: 'ACCESSORIES', slug: 'accessories', target: '/collection/accessories?section=women' },
            {
                label: "ALL THAT'S NEW",
                slug: 'all-thats-new',
                target: '/?deal=new arrivals',
                subItems: [
                    { label: 'Clothing', target: '/collection/clothing?section=women' },
                    { label: 'Footwear', target: '/collection/footwear?section=women' },
                    { label: 'Accessories', target: '/collection/accessories?section=women' },
                ]
            },
            { label: 'GMD GLOBAL', slug: 'global', target: '/products?search=Global' },
            { label: 'CURVE SIZE', slug: 'curve-size', target: '/products?search=Curve Size' },
            { label: 'NIGHT & LOUNGEWEAR', slug: 'night-lounge-wear', target: '/collection/night-lounge-wear?section=women' },
            { label: 'BEAUTY', slug: 'beauty', target: '/collection/beauty' },
            { label: 'ATHLEISURE', slug: 'athleisure', target: '/collection/athleisure' },
        ],
        sections: [
            {
                title: 'WINTERWEAR',
                slug: 'winterwear',
                category: 'winterwear',
                items: [
                    { label: 'Blazers & Waistcoats', slug: 'blazers-waistcoats', query: 'blazer' },
                    { label: 'Jackets & Coats', slug: 'jackets-coats', query: 'jacket' },
                    { label: 'Sweaters & Cardigans', slug: 'sweaters-cardigans', query: 'sweater' },
                    { label: 'Sweatshirts & Hoodies', slug: 'sweatshirts-hoodies', query: 'hoodie' },
                ]
            },
            {
                title: 'WESTERN WEAR',
                slug: 'western-wear',
                category: 'clothing',
                items: [
                    { label: 'Dresses', slug: 'dresses', query: 'dresses' },
                    { label: 'Jeans & Jeggings', slug: 'jeans-jeggings', query: 'jeans' },
                    { label: 'Tops', slug: 'tops', query: 'tops' },
                    { label: 'Trousers & Pants', slug: 'trousers-pants', query: 'trousers' },
                    { label: 'Tshirts', slug: 't-shirts', query: 't-shirt' },
                    { label: 'Track Pants', slug: 'track-pants', query: 'track pants' },
                    { label: 'Shirts', slug: 'shirts', query: 'shirts' },
                    { label: 'Leggings', slug: 'leggings', query: 'leggings' },
                    { label: 'Co-Ord Sets', slug: 'co-ord-sets', query: 'coord sets' },
                ]
            },
            {
                title: 'ETHNIC WEAR',
                slug: 'ethnic-wear',
                category: 'clothing',
                items: [
                    { label: 'Co-Ord Sets', slug: 'co-ord-sets', query: 'ethnic coord' },
                    { label: 'Dresses & Gowns', slug: 'dresses-gowns', query: 'gowns' },
                    { label: 'Kurta Suit Sets', slug: 'kurta-suit-sets', query: 'kurta set' },
                    { label: 'Kurta-Bottom Set', slug: 'kurta-bottom-set', query: 'kurta bottom' },
                    { label: 'Kurtas', slug: 'kurtas', query: 'kurtas' },
                    { label: 'Kurtis & Tunics', slug: 'kurtis-tunics', query: 'kurtis' },
                    { label: 'Lehenga Choli Sets', slug: 'lehenga-choli-sets', query: 'lehenga' },
                    { label: 'Salwars & Churidars', slug: 'salwars-churidars', query: 'salwar' },
                    { label: 'Sarees', slug: 'sarees', query: 'sarees' },
                ]
            },
            {
                title: 'FOOTWEAR',
                slug: 'footwear',
                category: 'footwear',
                items: [
                    { label: 'Boots', slug: 'boots', query: 'boots' },
                    { label: 'Casual Shoes', slug: 'casual-shoes', query: 'casual shoes' },
                    { label: 'Flip Flops & Slipper', slug: 'flip-flops-slippers', query: 'slippers' },
                    { label: 'Sandals', slug: 'sandals', query: 'sandals' },
                    { label: 'Sneakers', slug: 'sneakers', query: 'sneakers' },
                    { label: 'Sports Shoes', slug: 'sports-shoes', query: 'sports shoes' },
                ]
            },
            {
                title: 'ACCESSORIES',
                slug: 'accessories',
                category: 'accessories',
                items: [
                    { label: 'Backpacks', slug: 'backpacks', query: 'backpacks' },
                    { label: 'Belts', slug: 'belts', query: 'belts' },
                    { label: 'Caps & Hats', slug: 'caps-hats', query: 'caps' },
                    { label: 'Clutches & Wristlets', slug: 'clutches-wristlets', query: 'clutch' },
                    { label: 'Handbags', slug: 'handbags', query: 'handbags' },
                    { label: 'Shawls & Wraps', slug: 'shawls-wraps', query: 'shawls' },
                    { label: 'Socks & Stockings', slug: 'socks-stockings', query: 'stockings' },
                    { label: 'Stoles & Scarves', slug: 'stoles-scarves', query: 'scarves' },
                    { label: 'Sunglasses', slug: 'sunglasses', query: 'sunglasses' },
                    { label: 'Wallets', slug: 'wallets', query: 'wallets' },
                    { label: 'Watches', slug: 'watches', query: 'watches' },
                ]
            },
            {
                title: 'LINGERIE & INNERWEAR',
                slug: 'lingerie-innerwear',
                category: 'lingerie-innerwear',
                items: [
                    { label: 'Bras', slug: 'bras', query: 'bras' },
                    { label: 'Night & Lounge Wear Sets', slug: 'night-lounge-wear-sets', query: 'nightwear' },
                    { label: 'Night Shirts & Nighties', slug: 'night-shirts-nighties', query: 'nighty' },
                    { label: 'Panties', slug: 'panties', query: 'panties' },
                    { label: 'Pyjamas & Shorts', slug: 'pyjamas-shorts', query: 'pyjamas' },
                    { label: 'Shapewear', slug: 'shapewear', query: 'shapewear' },
                    { label: 'Thermal Wear', slug: 'thermal-wear', query: 'thermal' },
                ]
            },
            {
                title: 'JEWELLERY',
                slug: 'jewellery',
                category: 'jewellery',
                items: [
                    { label: 'Gold And Silver Idols & Coins', slug: 'idols-coins', query: 'idols coins' },
                    { label: 'Gold And Diamond Jewellery', slug: 'gold-diamond', query: 'diamond jewellery' },
                    { label: 'Silver Jewellery', slug: 'silver-jewellery', query: 'silver jewellery' },
                    { label: 'Fashion Jewellery', slug: 'fashion-jewellery', query: 'fashion jewellery' },
                ]
            },
            {
                title: 'GADGETS',
                slug: 'gadgets',
                category: 'gadgets',
                items: [
                    { label: 'Smart Wearables', slug: 'smart-wearables', query: 'smart wearables' },
                    { label: 'Fitness Gadgets', slug: 'fitness-gadgets', query: 'fitness tracker' },
                    { label: 'Headphones', slug: 'headphones', query: 'headphones' },
                    { label: 'Speakers', slug: 'speakers', query: 'speakers' },
                ]
            }
        ],
        brands: [
            { name: 'Zara', slug: 'zara' },
            { name: 'H&M', slug: 'hm' },
            { name: 'Vero Moda', slug: 'vero-moda' },
            { name: 'Biba', slug: 'biba' },
            { name: 'W for Woman', slug: 'w' },
            { name: 'Only', slug: 'only' },
            { name: 'Forever 21', slug: 'forever-21' },
            { name: 'Aurelia', slug: 'aurelia' },
            { name: 'FabIndia', slug: 'fabindia' },
            { name: 'Mango', slug: 'mango' },
            { name: 'Avaasa Mix N Match', slug: 'avaasa' },
            { name: 'Global Desi', slug: 'global-desi' }
        ]
    },

    'kids': {
        id: 'kids',
        label: 'KIDS',
        slug: 'kids',
        defaultCollection: 'kids',
        quickPicks: [
            { label: 'CLOTHING', slug: 'clothing', target: '/collection/kids?section=clothing' },
            { label: 'FOOTWEAR', slug: 'footwear', target: '/collection/kids?section=footwear' },
            { label: 'ACCESSORIES', slug: 'accessories', target: '/collection/kids?section=accessories' },
            {
                label: "ALL THAT'S NEW",
                slug: 'all-thats-new',
                target: '/?deal=new arrivals',
                subItems: [
                    { label: 'Clothing', target: '/collection/kids?section=clothing' },
                    { label: 'Footwear', target: '/collection/kids?section=footwear' },
                    { label: 'Accessories', target: '/collection/kids?section=accessories' },
                ]
            },
            {
                label: 'SHOP BY AGE',
                slug: 'shop-by-age',
                target: '/collection/kids',
                subItems: [
                    { label: '0-2 Years', target: '/collection/kids?age=0-2' },
                    { label: '3-5 Years', target: '/collection/kids?age=3-5' },
                    { label: '6-8 Years', target: '/collection/kids?age=6-8' },
                    { label: '9-12 Years', target: '/collection/kids?age=9-12' },
                    { label: '12 Years And Above', target: '/collection/kids?age=12-above' },
                ]
            }
        ],
        sections: [
            {
                title: 'WINTERWEAR',
                slug: 'winterwear',
                category: 'winterwear',
                items: [
                    { label: 'Jackets & Coats', slug: 'jackets-coats', query: 'kids jackets' },
                    { label: 'Jackets & Shrugs', slug: 'jackets-shrugs', query: 'kids shrugs' },
                    { label: 'Sweaters & Cardigans', slug: 'sweaters-cardigans', query: 'kids sweaters' },
                    { label: 'Sweatshirts & Hoodie', slug: 'sweatshirts-hoodie', query: 'kids hoodie' },
                    { label: 'Sweatshirts & Jacket', slug: 'sweatshirts-jacket', query: 'kids jacket' },
                ]
            },
            {
                title: 'BOYS',
                slug: 'boys',
                category: 'clothing',
                items: [
                    { label: 'Jeans', slug: 'jeans', query: 'boys jeans' },
                    { label: 'Shirts', slug: 'shirts', query: 'boys shirts' },
                    { label: 'Shorts & 3/4ths', slug: 'shorts', query: 'boys shorts' },
                    { label: 'Track Pants', slug: 'track-pants', query: 'boys track pants' },
                    { label: 'Trousers & Pants', slug: 'trousers-pants', query: 'boys trousers' },
                    { label: 'Tshirts', slug: 't-shirts', query: 'boys t-shirts' },
                ]
            },
            {
                title: 'GIRLS',
                slug: 'girls',
                category: 'clothing',
                items: [
                    { label: 'Dresses & Frocks', slug: 'dresses-frocks', query: 'girls dresses' },
                    { label: 'Jeans & Jeggings', slug: 'jeans-jeggings', query: 'girls jeans' },
                    { label: 'Leggings', slug: 'leggings', query: 'girls leggings' },
                    { label: 'Tops & Tunics', slug: 'tops-tunics', query: 'girls tops' },
                    { label: 'Tshirts', slug: 't-shirts', query: 'girls t-shirts' },
                ]
            },
            {
                title: 'INFANTS',
                slug: 'infants',
                category: 'clothing',
                items: [
                    { label: '2 Piece-Sets', slug: 'two-piece-sets', query: 'infant sets' },
                    { label: 'Dungarees & Playsuit', slug: 'dungarees-playsuit', query: 'infant dungarees' },
                    { label: 'Rompers & Onesies', slug: 'rompers-onesies', query: 'infant onesies' },
                    { label: 'Sets', slug: 'sets', query: 'infant clothes' },
                    { label: 'Winterwear', slug: 'winterwear', query: 'infant winter' },
                ]
            },
            {
                title: 'FOOTWEAR',
                slug: 'footwear',
                category: 'footwear',
                items: [
                    { label: 'Shoes', slug: 'shoes', query: 'kids shoes' },
                    { label: 'Sneakers', slug: 'sneakers', query: 'kids sneakers' },
                    { label: 'Casual Shoes', slug: 'casual-shoes', query: 'kids casual shoes' },
                    { label: 'Sandals', slug: 'sandals', query: 'kids sandals' },
                    { label: 'Flip Flops & Slipper', slug: 'flip-flops-slippers', query: 'kids slippers' },
                    { label: 'School Shoes', slug: 'school-shoes', query: 'school shoes' },
                ]
            },
            {
                title: 'ACCESSORIES',
                slug: 'accessories',
                category: 'accessories',
                items: [
                    { label: 'Backpacks', slug: 'backpacks', query: 'kids backpack' },
                    { label: 'Socks & Stockings', slug: 'socks-stockings', query: 'kids socks' },
                    { label: 'Baby Bed & Furniture', slug: 'baby-bed-furniture', query: 'baby furniture' },
                    { label: 'Creative & Educational', slug: 'creative-educational', query: 'educational toys' },
                    { label: 'BathGroom & Diaper', slug: 'bathgroom-diaper', query: 'diapers' },
                    { label: 'Sport Games & Equipment', slug: 'sport-games', query: 'sports toys' },
                ]
            },
            {
                title: 'FEATURED BRANDS',
                slug: 'featured-brands',
                category: 'brands',
                items: [
                    { label: 'ADIDAS KIDS', slug: 'adidas-kids', query: 'Adidas' },
                    { label: 'BUMZEE', slug: 'bumzee', query: 'Bumzee' },
                    { label: 'GAP KIDS', slug: 'gap-kids', query: 'Gap' },
                    { label: 'HELLCAT', slug: 'hellcat', query: 'Hellcat' },
                    { label: 'HOPSCOTCH', slug: 'hopscotch', query: 'Hopscotch' },
                    { label: 'MAX', slug: 'max', query: 'Max' },
                    { label: 'POINT COVE', slug: 'point-cove', query: 'Point Cove' },
                    { label: 'PSPEACHES', slug: 'pspeaches', query: 'Pspeaches' },
                    { label: 'TRAMPOLINE', slug: 'trampoline', query: 'Trampoline' },
                    { label: 'U.S. POLO ASSN.', slug: 'us-polo-kids', query: 'US Polo' },
                ]
            },
            {
                title: 'GMD EXCLUSIVES',
                slug: 'gmd-exclusives',
                category: 'exclusives',
                items: [
                    { label: 'INF FRENDZ', slug: 'inf-frendz', query: 'Inf Frendz' },
                    { label: 'KB TEAM SPIRIT', slug: 'kb-team-spirit', query: 'Team Spirit' },
                    { label: 'KG FRENDZ', slug: 'kg-frendz', query: 'Kg Frendz' },
                    { label: 'LEE COOPER', slug: 'lee-cooper', query: 'Lee Cooper' },
                    { label: 'RIO GIRLS', slug: 'rio-girls', query: 'Rio Girls' },
                    { label: 'YB DNMX', slug: 'yb-dnmx', query: 'Dnmx' },
                    { label: 'YOUSTA', slug: 'yousta', query: 'Yousta' },
                ]
            }
        ],
        brands: [
            { name: 'Adidas Kids', slug: 'adidas-kids' },
            { name: 'Gap Kids', slug: 'gap-kids' },
            { name: 'Hopscotch', slug: 'hopscotch' },
            { name: 'Max', slug: 'max' },
            { name: 'U.S. Polo Assn.', slug: 'us-polo' },
            { name: 'Puma Kids', slug: 'puma-kids' },
            { name: 'Bumzee', slug: 'bumzee' },
            { name: 'Mothercare', slug: 'mothercare' },
            { name: 'Lego', slug: 'lego' },
            { name: 'Barbie', slug: 'barbie' }
        ]
    },

    'beauty': {
        id: 'beauty',
        label: 'BEAUTY',
        slug: 'beauty',
        defaultCollection: 'beauty',
        quickPicks: [
            { label: 'MAKEUP', slug: 'makeup', target: '/collection/beauty?section=makeup' },
            { label: 'SKINCARE', slug: 'skincare', target: '/collection/beauty?section=skincare' },
            { label: 'HAIRCARE', slug: 'haircare', target: '/collection/beauty?section=haircare' },
            { label: 'FRAGRANCES', slug: 'fragrances', target: '/collection/beauty?section=fragrances' },
            { label: "MEN'S GROOMING", slug: 'mens-grooming', target: '/collection/beauty?section=grooming' },
            { label: 'BATH & BODY', slug: 'bath-body', target: '/collection/beauty?section=bath' },
            { label: 'BEAUTY TOOLS', slug: 'beauty-tools', target: '/collection/beauty?section=tools' },
        ],
        sections: [
            {
                title: 'MAKEUP',
                slug: 'makeup',
                category: 'beauty',
                items: [
                    { label: 'Lipsticks & Lip Gloss', slug: 'lipsticks', query: 'lipstick' },
                    { label: 'Foundations & Compact', slug: 'foundations', query: 'foundation' },
                    { label: 'Eye Liners & Kajal', slug: 'eyeliners-kajal', query: 'eyeliner' },
                    { label: 'Mascara & Eyeshadow', slug: 'mascara-eyeshadow', query: 'mascara' },
                    { label: 'Blush & Highlighters', slug: 'blush-highlighter', query: 'blush' },
                    { label: 'Nail Enamels', slug: 'nail-enamels', query: 'nail polish' },
                ]
            },
            {
                title: 'FRAGRANCES',
                slug: 'fragrances',
                category: 'beauty',
                items: [
                    { label: 'Perfumes (EDP/EDT)', slug: 'perfumes', query: 'perfume' },
                    { label: 'Body Mists & Sprays', slug: 'body-mists', query: 'body mist' },
                    { label: 'Deodorants', slug: 'deodorants', query: 'deodorant' },
                    { label: 'Attar & Solid Perfumes', slug: 'attar', query: 'attar' },
                ]
            },
            {
                title: 'SKINCARE',
                slug: 'skincare',
                category: 'beauty',
                items: [
                    { label: 'Face Serums', slug: 'face-serums', query: 'serum' },
                    { label: 'Moisturizers & Creams', slug: 'moisturizers', query: 'moisturizer' },
                    { label: 'Night Creams & Oils', slug: 'night-creams', query: 'night cream' },
                    { label: 'Cleansers & Face Washes', slug: 'cleansers', query: 'face wash' },
                    { label: 'Sunscreens', slug: 'sunscreens', query: 'sunscreen' },
                    { label: 'Face Masks & Peels', slug: 'face-masks', query: 'face mask' },
                    { label: 'Under Eye Care', slug: 'under-eye-care', query: 'eye cream' },
                ]
            },
            {
                title: 'HAIRCARE',
                slug: 'haircare',
                category: 'beauty',
                items: [
                    { label: 'Shampoos & Conditioners', slug: 'shampoos-conditioners', query: 'shampoo' },
                    { label: 'Hair Oils & Serums', slug: 'hair-oils', query: 'hair oil' },
                    { label: 'Hair Masks & Spa', slug: 'hair-masks', query: 'hair mask' },
                    { label: 'Hair Styling & Color', slug: 'hair-styling', query: 'hair wax' },
                    { label: 'Hair Appliances', slug: 'hair-appliances', query: 'hair dryer' },
                ]
            },
            {
                title: "MEN'S GROOMING",
                slug: 'mens-grooming',
                category: 'beauty',
                items: [
                    { label: 'Beard Care & Beard Oil', slug: 'beard-care', query: 'beard oil' },
                    { label: 'Shaving Creams & Foams', slug: 'shaving', query: 'shaving cream' },
                    { label: 'Trimmers & Shavers', slug: 'trimmers', query: 'trimmer' },
                    { label: 'After Shave Lotions', slug: 'after-shave', query: 'after shave' },
                ]
            },
            {
                title: 'BATH & BODY',
                slug: 'bath-body',
                category: 'beauty',
                items: [
                    { label: 'Shower Gels & Washes', slug: 'shower-gels', query: 'shower gel' },
                    { label: 'Body Lotions & Butters', slug: 'body-lotions', query: 'body lotion' },
                    { label: 'Hand & Foot Care', slug: 'hand-foot-care', query: 'hand cream' },
                    { label: 'Scrubs & Exfoliators', slug: 'body-scrubs', query: 'scrub' },
                ]
            }
        ],
        brands: [
            { name: "L'Oreal Paris", slug: 'loreal' },
            { name: 'Maybelline New York', slug: 'maybelline' },
            { name: 'Nivea', slug: 'nivea' },
            { name: 'Plum Goodness', slug: 'plum' },
            { name: 'The Derma Co', slug: 'derma-co' },
            { name: 'Minimalist', slug: 'minimalist' },
            { name: 'Biotique', slug: 'biotique' },
            { name: 'Mamaearth', slug: 'mamaearth' },
            { name: 'Lakme', slug: 'lakme' },
            { name: 'Forest Essentials', slug: 'forest-essentials' }
        ]
    },

    'home-kitchen': {
        id: 'home-kitchen',
        label: 'HOME & KITCHEN',
        slug: 'home-living',
        defaultCollection: 'home-living',
        sections: [
            {
                title: 'Kitchen & Dining',
                slug: 'kitchen-dining',
                category: 'home-living',
                items: [
                    { label: 'Cookware', slug: 'cookware', query: 'cookware' },
                    { label: 'Bakeware', slug: 'bakeware', query: 'bakeware' },
                    { label: 'Kitchen Tools & Gadgets', slug: 'kitchen-tools-gadgets', query: 'kitchen tools' },
                    { label: 'Dinner Sets', slug: 'dinner-sets', query: 'dinner set' },
                    { label: 'Plates & Bowls', slug: 'plates-bowls', query: 'plates bowls' },
                    { label: 'Glasses & Cups', slug: 'glasses-cups', query: 'glasses cups' },
                    { label: 'Cutlery', slug: 'cutlery', query: 'cutlery' },
                    { label: 'Storage Containers', slug: 'storage-containers', query: 'storage container' },
                    { label: 'Water Bottles & Flasks', slug: 'water-bottles-flasks', query: 'water bottle' },
                    { label: 'Lunch Boxes', slug: 'lunch-boxes', query: 'lunch box' },
                    { label: 'Kitchen Organizers', slug: 'kitchen-organizers', query: 'kitchen organizer' },
                ]
            },
            {
                title: 'Home Décor',
                slug: 'home-decor',
                category: 'home-living',
                items: [
                    { label: 'Wall Décor', slug: 'wall-decor', query: 'wall decor' },
                    { label: 'Photo Frames', slug: 'photo-frames', query: 'photo frame' },
                    { label: 'Clocks', slug: 'clocks', query: 'wall clock' },
                    { label: 'Vases', slug: 'vases', query: 'vase' },
                    { label: 'Artificial Flowers & Plants', slug: 'artificial-flowers-plants', query: 'artificial plants' },
                    { label: 'Candles & Candle Holders', slug: 'candles-holders', query: 'candles' },
                    { label: 'Decorative Items', slug: 'decorative-items', query: 'decorative items' },
                    { label: 'Showpieces', slug: 'showpieces', query: 'showpiece' },
                    { label: 'Mirrors', slug: 'mirrors', query: 'mirror' },
                ]
            },
            {
                title: 'Home Furnishing',
                slug: 'home-furnishing',
                category: 'home-living',
                items: [
                    { label: 'Bedsheets', slug: 'bedsheets', query: 'bedsheet' },
                    { label: 'Blankets & Quilts', slug: 'blankets-quilts', query: 'blanket quilt' },
                    { label: 'Pillows & Cushions', slug: 'pillows-cushions', query: 'pillow cushion' },
                    { label: 'Curtains', slug: 'curtains', query: 'curtain' },
                    { label: 'Carpets & Rugs', slug: 'carpets-rugs', query: 'carpet rug' },
                    { label: 'Mats & Doormats', slug: 'mats-doormats', query: 'doormat' },
                    { label: 'Sofa Covers', slug: 'sofa-covers', query: 'sofa cover' },
                    { label: 'Table Covers', slug: 'table-covers', query: 'table cover' },
                ]
            },
            {
                title: 'Furniture',
                slug: 'furniture',
                category: 'home-living',
                items: [
                    { label: 'Chairs', slug: 'chairs', query: 'chair' },
                    { label: 'Tables', slug: 'tables', query: 'table' },
                    { label: 'Sofas', slug: 'sofas', query: 'sofa' },
                    { label: 'Beds', slug: 'beds', query: 'bed' },
                    { label: 'Wardrobes', slug: 'wardrobes', query: 'wardrobe' },
                    { label: 'Shoe Racks', slug: 'shoe-racks', query: 'shoe rack' },
                    { label: 'Bookshelves', slug: 'bookshelves', query: 'bookshelf' },
                    { label: 'TV Units', slug: 'tv-units', query: 'tv unit' },
                    { label: 'Storage Cabinets', slug: 'storage-cabinets', query: 'storage cabinet' },
                ]
            },
            {
                title: 'Home Storage & Organization',
                slug: 'home-storage-organization',
                category: 'home-living',
                items: [
                    { label: 'Storage Boxes', slug: 'storage-boxes', query: 'storage box' },
                    { label: 'Baskets', slug: 'baskets', query: 'storage basket' },
                    { label: 'Drawer Organizers', slug: 'drawer-organizers', query: 'drawer organizer' },
                    { label: 'Wardrobe Organizers', slug: 'wardrobe-organizers', query: 'wardrobe organizer' },
                    { label: 'Shoe Organizers', slug: 'shoe-organizers', query: 'shoe organizer' },
                    { label: 'Kitchen Storage', slug: 'kitchen-storage', query: 'kitchen storage' },
                    { label: 'Laundry Baskets', slug: 'laundry-baskets', query: 'laundry basket' },
                    { label: 'Multipurpose Racks', slug: 'multipurpose-racks', query: 'multipurpose rack' },
                ]
            },
            {
                title: 'Cleaning & Household',
                slug: 'cleaning-household',
                category: 'home-living',
                items: [
                    { label: 'Cleaning Tools', slug: 'cleaning-tools', query: 'cleaning tool' },
                    { label: 'Mops & Brooms', slug: 'mops-brooms', query: 'mop broom' },
                    { label: 'Dustpans', slug: 'dustpans', query: 'dustpan' },
                    { label: 'Brushes & Scrubbers', slug: 'brushes-scrubbers', query: 'brush scrubber' },
                    { label: 'Cleaning Buckets', slug: 'cleaning-buckets', query: 'cleaning bucket' },
                    { label: 'Garbage Bins', slug: 'garbage-bins', query: 'garbage bin' },
                    { label: 'Laundry Accessories', slug: 'laundry-accessories', query: 'laundry accessories' },
                    { label: 'Cleaning Supplies', slug: 'cleaning-supplies', query: 'cleaning supplies' },
                ]
            },
            {
                title: 'Kitchen Appliances',
                slug: 'kitchen-appliances',
                category: 'home-living',
                items: [
                    { label: 'Mixer Grinders', slug: 'mixer-grinders', query: 'mixer grinder' },
                    { label: 'Electric Kettles', slug: 'electric-kettles', query: 'electric kettle' },
                    { label: 'Induction Cooktops', slug: 'induction-cooktops', query: 'induction cooktop' },
                    { label: 'Air Fryers', slug: 'air-fryers', query: 'air fryer' },
                    { label: 'Rice Cookers', slug: 'rice-cookers', query: 'rice cooker' },
                    { label: 'Toasters', slug: 'toasters', query: 'toaster' },
                    { label: 'Sandwich Makers', slug: 'sandwich-makers', query: 'sandwich maker' },
                    { label: 'Choppers', slug: 'choppers', query: 'chopper' },
                    { label: 'Juicers', slug: 'juicers', query: 'juicer' },
                    { label: 'Coffee Makers', slug: 'coffee-makers', query: 'coffee maker' },
                ]
            },
            {
                title: 'Home Appliances',
                slug: 'home-appliances',
                category: 'home-living',
                items: [
                    { label: 'Fans', slug: 'fans', query: 'fan' },
                    { label: 'Air Coolers', slug: 'air-coolers', query: 'air cooler' },
                    { label: 'Vacuum Cleaners', slug: 'vacuum-cleaners', query: 'vacuum cleaner' },
                    { label: 'Air Purifiers', slug: 'air-purifiers', query: 'air purifier' },
                    { label: 'Irons', slug: 'irons', query: 'dry iron steam iron' },
                    { label: 'Water Heaters', slug: 'water-heaters', query: 'water heater geyser' },
                    { label: 'Room Heaters', slug: 'room-heaters', query: 'room heater' },
                ]
            },
            {
                title: 'Bathroom',
                slug: 'bathroom',
                category: 'home-living',
                items: [
                    { label: 'Bath Towels', slug: 'bath-towels', query: 'bath towel' },
                    { label: 'Shower Curtains', slug: 'shower-curtains', query: 'shower curtain' },
                    { label: 'Bath Mats', slug: 'bath-mats', query: 'bath mat' },
                    { label: 'Bathroom Organizers', slug: 'bathroom-organizers', query: 'bathroom organizer' },
                    { label: 'Soap Dispensers', slug: 'soap-dispensers', query: 'soap dispenser' },
                    { label: 'Toothbrush Holders', slug: 'toothbrush-holders', query: 'toothbrush holder' },
                    { label: 'Bathroom Accessories', slug: 'bathroom-accessories', query: 'bathroom accessories' },
                    { label: 'Cleaning Accessories', slug: 'cleaning-accessories', query: 'toilet brush cleaning' },
                ]
            },
            {
                title: 'Lighting',
                slug: 'lighting',
                category: 'home-living',
                items: [
                    { label: 'Table Lamps', slug: 'table-lamps', query: 'table lamp' },
                    { label: 'Floor Lamps', slug: 'floor-lamps', query: 'floor lamp' },
                    { label: 'Ceiling Lights', slug: 'ceiling-lights', query: 'ceiling light' },
                    { label: 'Wall Lights', slug: 'wall-lights', query: 'wall light' },
                    { label: 'LED Lights', slug: 'led-lights', query: 'led bulb light' },
                    { label: 'Decorative Lights', slug: 'decorative-lights', query: 'fairy lights decorative' },
                    { label: 'Night Lamps', slug: 'night-lamps', query: 'night lamp' },
                    { label: 'Smart Lighting', slug: 'smart-lighting', query: 'smart bulb light' },
                ]
            },
            {
                title: 'Gardening & Outdoor',
                slug: 'gardening-outdoor',
                category: 'home-living',
                items: [
                    { label: 'Plant Pots', slug: 'plant-pots', query: 'plant pot' },
                    { label: 'Planters', slug: 'planters', query: 'planter' },
                    { label: 'Gardening Tools', slug: 'gardening-tools', query: 'gardening tools' },
                    { label: 'Seeds', slug: 'seeds', query: 'plant seeds' },
                    { label: 'Watering Cans', slug: 'watering-cans', query: 'watering can' },
                    { label: 'Garden Décor', slug: 'garden-decor', query: 'garden decor' },
                    { label: 'Artificial Plants', slug: 'artificial-plants', query: 'artificial plants' },
                    { label: 'Outdoor Furniture', slug: 'outdoor-furniture', query: 'outdoor furniture' },
                ]
            },
            {
                title: 'Home Improvement',
                slug: 'home-improvement',
                category: 'home-living',
                items: [
                    { label: 'Hardware', slug: 'hardware', query: 'hardware' },
                    { label: 'Tools', slug: 'tools', query: 'hand tools drill' },
                    { label: 'Electrical Accessories', slug: 'electrical-accessories', query: 'electrical' },
                    { label: 'Switches & Sockets', slug: 'switches-sockets', query: 'switch socket' },
                    { label: 'Extension Boards', slug: 'extension-boards', query: 'extension board' },
                    { label: 'Adhesives & Tapes', slug: 'adhesives-tapes', query: 'adhesive tape glue' },
                    { label: 'Door & Window Accessories', slug: 'door-window-accessories', query: 'door handle hinge' },
                ]
            }
        ],
        brands: [
            { name: 'Prestige', slug: 'prestige' },
            { name: 'Hawkins', slug: 'hawkins' },
            { name: 'Milton', slug: 'milton' },
            { name: 'Cello', slug: 'cello' },
            { name: 'Philips', slug: 'philips' },
            { name: 'Bajaj', slug: 'bajaj' },
            { name: 'Havells', slug: 'havells' },
            { name: 'Spaces', slug: 'spaces' },
            { name: 'Bombay Dyeing', slug: 'bombay-dyeing' },
            { name: 'Wakefit', slug: 'wakefit' }
        ]
    },

    'electronics': {
        id: 'electronics',
        label: 'ELECTRONICS',
        slug: 'electronics',
        defaultCollection: 'electronics',
        sections: [
            {
                title: 'Audio & Sound',
                slug: 'audio',
                category: 'electronics',
                items: [
                    { label: 'Wireless Headphones', slug: 'headphones', query: 'headphones' },
                    { label: 'TWS True Wireless Earbuds', slug: 'earbuds', query: 'earbuds' },
                    { label: 'Bluetooth Speakers', slug: 'speakers', query: 'bluetooth speaker' },
                    { label: 'Soundbars & Home Theatre', slug: 'soundbars', query: 'soundbar' },
                ]
            },
            {
                title: 'Smart Wearables',
                slug: 'smart-wearables',
                category: 'electronics',
                items: [
                    { label: 'Smartwatches', slug: 'smart-wearables', query: 'smartwatch' },
                    { label: 'Fitness Trackers', slug: 'fitness-trackers', query: 'fitness band' },
                    { label: 'Smart Rings & Bands', slug: 'smart-rings', query: 'smart ring' },
                ]
            },
            {
                title: 'Mobile Accessories',
                slug: 'mobile-accessories',
                category: 'electronics',
                items: [
                    { label: 'Power Banks 10000-30000mAh', slug: 'power-banks', query: 'power bank' },
                    { label: 'Fast Chargers & Cables', slug: 'chargers-cables', query: 'charger type-c' },
                    { label: 'Cases & Screen Protectors', slug: 'phone-cases', query: 'phone case' },
                    { label: 'Car Mounts & Stands', slug: 'mobile-holders', query: 'mobile stand' },
                ]
            },
            {
                title: 'Computer & Gaming',
                slug: 'computer-gaming',
                category: 'electronics',
                items: [
                    { label: 'Wireless Keyboards & Mice', slug: 'keyboards-mice', query: 'keyboard mouse' },
                    { label: 'Gaming Headsets', slug: 'gaming-headsets', query: 'gaming headset' },
                    { label: 'Ergonomic Laptop Stands', slug: 'laptop-stands', query: 'laptop stand' },
                    { label: 'USB Hubs & Adapters', slug: 'usb-hubs', query: 'usb hub' },
                ]
            }
        ],
        brands: [
            { name: 'Sony', slug: 'sony' },
            { name: 'boAt', slug: 'boat' },
            { name: 'Noise', slug: 'noise' },
            { name: 'JBL', slug: 'jbl' },
            { name: 'Apple', slug: 'apple' },
            { name: 'Samsung', slug: 'samsung' }
        ]
    },

    'stationary': {
        id: 'stationary',
        label: 'STATIONERY',
        slug: 'stationary',
        defaultCollection: 'stationary',
        sections: [
            {
                title: 'Writing Instruments',
                slug: 'writing',
                category: 'stationary',
                items: [
                    { label: 'Rollerball & Ball Pens', slug: 'pens', query: 'pens' },
                    { label: 'Fountain & Calligraphy Pens', slug: 'fountain-pens', query: 'fountain pen' },
                    { label: 'Highlighters & Markers', slug: 'highlighters', query: 'highlighters' },
                    { label: 'Mechanical Pencils', slug: 'pencils', query: 'pencil' },
                ]
            },
            {
                title: 'Notebooks & Diaries',
                slug: 'notebooks',
                category: 'stationary',
                items: [
                    { label: 'Spiral Notebooks & Registers', slug: 'spiral-notebooks', query: 'spiral notebook' },
                    { label: 'Executive Leather Journals', slug: 'journals', query: 'journal diary' },
                    { label: 'Sticky Notes & Page Flags', slug: 'sticky-notes', query: 'sticky notes' },
                    { label: 'Daily Planners & To-Do Lists', slug: 'planners', query: 'planner' },
                ]
            },
            {
                title: 'Art & Craft Supplies',
                slug: 'art-craft',
                category: 'stationary',
                items: [
                    { label: 'Acrylic & Watercolor Paints', slug: 'paints', query: 'acrylic paint' },
                    { label: 'Sketchbooks & Canvas', slug: 'sketchbooks', query: 'sketchbook' },
                    { label: 'Brush Sets & Palette Knives', slug: 'brushes', query: 'paint brush' },
                    { label: 'Craft Glues & Scissors', slug: 'craft-tools', query: 'craft glue' },
                ]
            },
            {
                title: 'Office & Desk Organization',
                slug: 'office-desk',
                category: 'stationary',
                items: [
                    { label: 'Desk Organizers & Pen Stands', slug: 'desk-organizers', query: 'desk organizer' },
                    { label: 'Staplers, Punches & Pins', slug: 'staplers', query: 'stapler' },
                    { label: 'Document Files & Folders', slug: 'files-folders', query: 'files folders' },
                    { label: 'Calculators & Tape Dispensers', slug: 'calculators', query: 'calculator' },
                ]
            }
        ],
        brands: [
            { name: 'Parker', slug: 'parker' },
            { name: 'Classmate', slug: 'classmate' },
            { name: 'Faber-Castell', slug: 'faber-castell' },
            { name: 'Doms', slug: 'doms' },
            { name: 'Camlin', slug: 'camlin' }
        ]
    },

    'pooja-items': {
        id: 'pooja-items',
        label: 'POOJA ITEMS',
        slug: 'pooja-items',
        defaultCollection: 'pooja-items',
        sections: [
            {
                title: 'Pooja Essentials',
                slug: 'pooja-essentials',
                category: 'pooja-items',
                items: [
                    { label: 'Pooja Thali Sets', slug: 'pooja-thali-sets', query: 'pooja thali' },
                    { label: 'Pooja Plates & Bowls', slug: 'pooja-plates', query: 'pooja plate' },
                    { label: 'Kalash & Shankh', slug: 'kalash', query: 'kalash shankh' },
                    { label: 'Pooja Bells & Aarti Plates', slug: 'pooja-bells', query: 'pooja bell' },
                    { label: 'Camphor Holders', slug: 'camphor-holders', query: 'camphor burner' },
                ]
            },
            {
                title: 'Diyas & Lamps',
                slug: 'diyas-lamps',
                category: 'pooja-items',
                items: [
                    { label: 'Brass Diyas', slug: 'brass-diyas', query: 'brass diya' },
                    { label: 'Clay & Terracotta Diyas', slug: 'clay-diyas', query: 'clay diya' },
                    { label: 'Akhand Diyas', slug: 'akhand-diyas', query: 'akhand diya' },
                    { label: 'Hanging Diyas', slug: 'hanging-diyas', query: 'hanging diya' },
                    { label: 'Silver Diyas & Ghee Lamps', slug: 'silver-diyas', query: 'silver diya' },
                ]
            },
            {
                title: 'Incense & Fragrance',
                slug: 'incense-fragrance',
                category: 'pooja-items',
                items: [
                    { label: 'Agarbatti', slug: 'agarbatti', query: 'agarbatti incense' },
                    { label: 'Dhoop Sticks & Cones', slug: 'dhoop-sticks', query: 'dhoop' },
                    { label: 'Sambrani & Loban', slug: 'sambrani', query: 'sambrani loban' },
                    { label: 'Pure Bhimseni Camphor', slug: 'camphor', query: 'bhimseni camphor' },
                    { label: 'Havan Cups', slug: 'havan-cups', query: 'havan cups' },
                ]
            },
            {
                title: 'Pooja Samagri',
                slug: 'pooja-samagri',
                category: 'pooja-items',
                items: [
                    { label: 'Pooja Samagri Kits', slug: 'pooja-samagri-kits', query: 'pooja samagri' },
                    { label: 'Havan Samagri', slug: 'havan-samagri', query: 'havan samagri' },
                    { label: 'Cotton Wicks & Batti', slug: 'cotton-wicks', query: 'cotton wicks' },
                    { label: 'Sacred Thread & Janeu', slug: 'sacred-thread', query: 'sacred thread' },
                    { label: 'Betel Nuts & Pooja Dry Fruits', slug: 'betel-nuts', query: 'supari' },
                ]
            },
            {
                title: 'Idols & Statues',
                slug: 'idols-statues',
                category: 'pooja-items',
                items: [
                    { label: 'Ganesha Idols', slug: 'ganesha-idols', query: 'ganesha idol' },
                    { label: 'Lakshmi Idols', slug: 'lakshmi-idols', query: 'lakshmi idol' },
                    { label: 'Krishna & Shiva Idols', slug: 'krishna-idols', query: 'krishna shiva idol' },
                    { label: 'Durga & Hanuman Idols', slug: 'durga-idols', query: 'durga hanuman' },
                    { label: 'Murugan, Saraswati & Buddha', slug: 'saraswati-idols', query: 'saraswati idol' },
                ]
            },
            {
                title: 'Pooja Accessories',
                slug: 'pooja-accessories',
                category: 'pooja-items',
                items: [
                    { label: 'Kumkum & Sindoor Boxes', slug: 'kumkum-boxes', query: 'kumkum box' },
                    { label: 'Haldi Containers', slug: 'haldi-containers', query: 'haldi container' },
                    { label: 'Pooja Spoons & Tongs', slug: 'pooja-spoons', query: 'pooja spoon' },
                    { label: 'Aarti Stands & Asanas', slug: 'aarti-stands', query: 'aarti stand' },
                    { label: 'Pooja Cloth & Mats', slug: 'pooja-cloth', query: 'pooja cloth' },
                ]
            },
            {
                title: 'Pooja Decoration',
                slug: 'pooja-decoration',
                category: 'pooja-items',
                items: [
                    { label: 'Flower Garlands & Mala', slug: 'flower-garlands', query: 'flower garland' },
                    { label: 'Door Torans', slug: 'torans', query: 'toran' },
                    { label: 'Rangoli Items & Stencils', slug: 'rangoli-items', query: 'rangoli' },
                    { label: 'Mandir Decorations & Backdrops', slug: 'mandir-decorations', query: 'mandir decoration' },
                ]
            },
            {
                title: 'Home Temple / Mandir',
                slug: 'home-temple-mandir',
                category: 'pooja-items',
                items: [
                    { label: 'Wooden Pooja Mandirs', slug: 'wooden-pooja-mandirs', query: 'wooden mandir' },
                    { label: 'Wall-Mounted Mandirs', slug: 'wall-mounted-mandirs', query: 'wall mounted mandir' },
                    { label: 'Tabletop Mandirs & Shelves', slug: 'tabletop-mandirs', query: 'tabletop mandir' },
                    { label: 'Mandir Curtains & Lighting', slug: 'mandir-lighting', query: 'mandir lighting' },
                ]
            },
            {
                title: 'Rudraksha & Spiritual',
                slug: 'rudraksha-spiritual',
                category: 'pooja-items',
                items: [
                    { label: 'Rudraksha Mala & Beads', slug: 'rudraksha-mala', query: 'rudraksha mala' },
                    { label: 'Tulsi & Jap Mala', slug: 'tulsi-mala', query: 'tulsi mala' },
                    { label: 'Yantras & Sacred Plates', slug: 'yantras', query: 'yantra' },
                    { label: 'Spiritual Bracelets & Beads', slug: 'spiritual-bracelets', query: 'spiritual bracelet' },
                ]
            },
            {
                title: 'Religious Books',
                slug: 'religious-books',
                category: 'pooja-items',
                items: [
                    { label: 'Bhagavad Gita', slug: 'bhagavad-gita', query: 'bhagavad gita' },
                    { label: 'Mantra & Chalisa Books', slug: 'mantra-books', query: 'chalisa mantra' },
                    { label: 'Pooja Vidhi Books', slug: 'pooja-vidhi-books', query: 'pooja vidhi' },
                    { label: 'Religious Calendars & Panchang', slug: 'panchang', query: 'panchang' },
                ]
            },
            {
                title: 'Havan & Yagna',
                slug: 'havan-yagna',
                category: 'pooja-items',
                items: [
                    { label: 'Havan Kund', slug: 'havan-kund', query: 'havan kund' },
                    { label: 'Havan Samagri & Wood', slug: 'havan-wood', query: 'havan wood' },
                    { label: 'Havan Cups & Spoons', slug: 'havan-spoons', query: 'havan spoons' },
                    { label: 'Yagna Accessories', slug: 'yagna-accessories', query: 'yagna' },
                ]
            },
            {
                title: 'Festival Pooja Kits',
                slug: 'festival-pooja-kits',
                category: 'pooja-items',
                items: [
                    { label: 'Diwali Pooja Kits', slug: 'diwali-pooja-kits', query: 'diwali pooja kit' },
                    { label: 'Ganesh Chaturthi Kits', slug: 'ganesh-chaturthi-kits', query: 'ganesh chaturthi kit' },
                    { label: 'Varalakshmi Pooja Kits', slug: 'varalakshmi-pooja-kits', query: 'varalakshmi pooja kit' },
                    { label: 'Navratri Pooja Kits', slug: 'navratri-pooja-kits', query: 'navratri kit' },
                    { label: 'Lakshmi & Satyanarayan Kits', slug: 'satyanarayan-pooja-kits', query: 'satyanarayan kit' },
                ]
            },
            {
                title: 'Brass & Silver Pooja Items',
                slug: 'brass-silver-pooja-items',
                category: 'pooja-items',
                items: [
                    { label: 'Brass Diyas & Bells', slug: 'brass-diyas', query: 'brass diya bell' },
                    { label: 'Brass Kalash & Idols', slug: 'brass-kalash', query: 'brass kalash idol' },
                    { label: 'Brass Pooja Sets', slug: 'brass-pooja-sets', query: 'brass pooja set' },
                    { label: 'Silver Coins & Silver Items', slug: 'silver-coins', query: 'silver coin pooja' },
                ]
            },
            {
                title: 'Pooja Storage',
                slug: 'pooja-storage',
                category: 'pooja-items',
                items: [
                    { label: 'Pooja Boxes', slug: 'pooja-boxes', query: 'pooja box' },
                    { label: 'Samagri Storage Containers', slug: 'samagri-storage-containers', query: 'storage container' },
                    { label: 'Pooja Organizers & Kumkum Boxes', slug: 'pooja-organizers', query: 'pooja organizer' },
                    { label: 'Pooja Storage Sets', slug: 'pooja-storage-sets', query: 'pooja storage' },
                ]
            }
        ],
        brands: [
            { name: 'Mangaldeep', slug: 'mangaldeep' },
            { name: 'Cycle Pure', slug: 'cycle-pure' },
            { name: 'Bhimseni', slug: 'bhimseni' },
            { name: 'Vedic Vaani', slug: 'vedic-vaani' }
        ]
    },

    'grocery': {
        id: 'grocery',
        label: 'GROCERY ITEMS',
        slug: 'grocery',
        defaultCollection: 'grocery',
        sections: [
            {
                title: 'Staples & Grains',
                slug: 'staples',
                category: 'grocery',
                items: [
                    { label: 'Premium Basmati Rice', slug: 'rice', query: 'basmati rice' },
                    { label: 'Chakki Fresh Atta & Flour', slug: 'atta-flour', query: 'atta flour' },
                    { label: 'Organic Pulses & Dals', slug: 'pulses-dals', query: 'dal pulses' },
                    { label: 'Cold Pressed Cooking Oils', slug: 'cooking-oil', query: 'cooking oil ghee' },
                ]
            },
            {
                title: 'Dry Fruits & Seeds',
                slug: 'dry-fruits',
                category: 'grocery',
                items: [
                    { label: 'California Almonds', slug: 'almonds', query: 'almonds' },
                    { label: 'Whole Cashew Nuts', slug: 'cashews', query: 'cashew nuts' },
                    { label: 'Pistachios & Walnuts', slug: 'walnuts-pistachios', query: 'walnuts pistachios' },
                    { label: 'Chia & Flax Seeds', slug: 'healthy-seeds', query: 'chia seeds' },
                ]
            },
            {
                title: 'Beverages & Teas',
                slug: 'beverages',
                category: 'grocery',
                items: [
                    { label: 'Green Tea & Herbal Infusions', slug: 'green-tea', query: 'green tea' },
                    { label: 'Filter Coffee & Instant Roasts', slug: 'coffee', query: 'coffee beans' },
                    { label: 'Energy Drinks & Fruit Juices', slug: 'juices', query: 'fruit juice' },
                ]
            },
            {
                title: 'Gourmet & Cooking Sauces',
                slug: 'gourmet-sauces',
                category: 'grocery',
                items: [
                    { label: 'Extra Virgin Olive Oil', slug: 'olive-oil', query: 'olive oil' },
                    { label: 'Italian Durum Wheat Pasta', slug: 'pasta', query: 'pasta penne' },
                    { label: 'Artisanal Spreads & Jams', slug: 'spreads-jams', query: 'peanut butter jam' },
                ]
            }
        ],
        brands: [
            { name: 'India Gate', slug: 'india-gate' },
            { name: 'Happilo', slug: 'happilo' },
            { name: 'Borges', slug: 'borges' },
            { name: 'Tetley', slug: 'tetley' },
            { name: 'Barilla', slug: 'barilla' }
        ]
    }
};

/**
 * Structured Department and Subcategory Hierarchy for Drawers and Navigation Menus
 * Strictly aligned with header home page sequence: Men, Women, Kids, Beauty, Home & Kitchen, Electronics, More.
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
                    { label: 'T-Shirts', path: '/collection/clothing?section=men&subcategory=t-shirts' },
                    { label: 'Jeans', path: '/collection/clothing?section=men&subcategory=jeans' },
                    { label: 'Trousers & Pants', path: '/collection/clothing?section=men&subcategory=trousers-pants' },
                    { label: 'Track Pants & Joggers', path: '/collection/clothing?section=men&subcategory=track-pants' },
                ]
            },
            {
                title: 'FOOTWEAR',
                items: [
                    { label: 'Sneakers', path: '/collection/footwear?section=men&subcategory=sneakers' },
                    { label: 'Casual Shoes', path: '/collection/footwear?section=men&subcategory=casual-shoes' },
                    { label: 'Formal Shoes', path: '/collection/footwear?section=men&subcategory=formal-shoes' },
                    { label: 'Boots', path: '/collection/footwear?section=men&subcategory=boots' },
                    { label: 'Sandals & Floaters', path: '/collection/footwear?section=men&subcategory=sandals' },
                ]
            },
            {
                title: 'ETHNIC WEAR',
                items: [
                    { label: 'Kurtas & Kurta Sets', path: '/collection/clothing?section=men&subcategory=kurtas' },
                    { label: 'Nehru Jackets & Waistcoats', path: '/collection/clothing?section=men&subcategory=ethnic-jackets' },
                    { label: 'Ethnic Suit Sets', path: '/collection/clothing?section=men&subcategory=ethnic-suit-sets' },
                ]
            },
            {
                title: 'ACCESSORIES & WATCHES',
                items: [
                    { label: 'Watches', path: '/collection/accessories?section=men&subcategory=watches' },
                    { label: 'Wallets', path: '/collection/accessories?section=men&subcategory=wallets' },
                    { label: 'Belts', path: '/collection/accessories?section=men&subcategory=belts' },
                    { label: 'Sunglasses', path: '/collection/accessories?section=men&subcategory=sunglasses' },
                    { label: 'Backpacks & Bags', path: '/collection/accessories?section=men&subcategory=backpacks' },
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
                    { label: 'Trousers & Pants', path: '/collection/clothing?section=women&subcategory=trousers-pants' },
                    { label: 'Co-Ord Sets', path: '/collection/clothing?section=women&subcategory=co-ord-sets' },
                ]
            },
            {
                title: 'ETHNIC WEAR',
                items: [
                    { label: 'Sarees', path: '/collection/clothing?section=women&subcategory=sarees' },
                    { label: 'Kurtas & Kurtis', path: '/collection/clothing?section=women&subcategory=kurtas' },
                    { label: 'Kurta Suit Sets', path: '/collection/clothing?section=women&subcategory=kurta-suit-sets' },
                    { label: 'Lehenga Choli', path: '/collection/clothing?section=women&subcategory=lehenga-choli-sets' },
                ]
            },
            {
                title: 'FOOTWEAR',
                items: [
                    { label: 'Sneakers & Casuals', path: '/collection/footwear?section=women&subcategory=sneakers' },
                    { label: 'Sandals & Flats', path: '/collection/footwear?section=women&subcategory=sandals' },
                    { label: 'Boots', path: '/collection/footwear?section=women&subcategory=boots' },
                ]
            },
            {
                title: 'HANDBAGS & ACCESSORIES',
                items: [
                    { label: 'Handbags & Totes', path: '/collection/accessories?section=women&subcategory=handbags' },
                    { label: 'Clutches & Slings', path: '/collection/accessories?section=women&subcategory=clutches-wristlets' },
                    { label: 'Fashion Jewellery', path: '/collection/jewellery?section=women' },
                    { label: 'Sunglasses', path: '/collection/accessories?section=women&subcategory=sunglasses' },
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
                title: 'BOYS CLOTHING',
                items: [
                    { label: 'T-Shirts & Polos', path: '/collection/kids?section=clothing&subcategory=boys-clothing' },
                    { label: 'Shirts', path: '/collection/kids?section=clothing&subcategory=boys-clothing' },
                    { label: 'Jeans & Trousers', path: '/collection/kids?section=clothing&subcategory=boys-clothing' },
                    { label: 'Kurta Sets', path: '/collection/kids?section=clothing&subcategory=boys-clothing' },
                ]
            },
            {
                title: 'GIRLS CLOTHING',
                items: [
                    { label: 'Dresses & Frocks', path: '/collection/kids?section=clothing&subcategory=girls-clothing' },
                    { label: 'Tops & Tees', path: '/collection/kids?section=clothing&subcategory=girls-clothing' },
                    { label: 'Dungarees & Skirts', path: '/collection/kids?section=clothing&subcategory=girls-clothing' },
                    { label: 'Ethnic Lehengas', path: '/collection/kids?section=clothing&subcategory=girls-clothing' },
                ]
            },
            {
                title: 'INFANT & BABY',
                items: [
                    { label: 'Rompers & Onesies', path: '/collection/kids?section=clothing&subcategory=baby-clothes' },
                    { label: 'Pram Suits & Jumpsuits', path: '/collection/kids?section=clothing&subcategory=baby-clothes' },
                    { label: 'Swaddle Blankets', path: '/collection/kids?section=clothing&subcategory=baby-clothes' },
                ]
            },
            {
                title: 'FOOTWEAR',
                items: [
                    { label: 'Kids Footwear', path: '/collection/kids?section=footwear' },
                    { label: 'Kids Sandals & Slippers', path: '/collection/kids?section=footwear&subcategory=sandals' },
                ]
            }
        ]
    },
    {
        key: 'beauty',
        label: 'BEAUTY',
        slug: 'beauty',
        defaultPath: '/collection/beauty',
        sections: [
            {
                title: 'SKINCARE',
                items: [
                    { label: 'Face Serums', path: '/collection/beauty?subcategory=skincare' },
                    { label: 'Cleansers & Face Washes', path: '/collection/beauty?subcategory=skincare' },
                    { label: 'Moisturizers & Lotions', path: '/collection/beauty?subcategory=skincare' },
                    { label: 'Sunscreens', path: '/collection/beauty?subcategory=skincare' },
                ]
            },
            {
                title: 'HAIRCARE',
                items: [
                    { label: 'Shampoos & Conditioners', path: '/collection/beauty?subcategory=haircare' },
                    { label: 'Hair Oils & Serums', path: '/collection/beauty?subcategory=haircare' },
                    { label: 'Hair Masks & Styling', path: '/collection/beauty?subcategory=haircare' },
                ]
            },
            {
                title: 'MAKEUP',
                items: [
                    { label: 'Lipsticks & Lip Gloss', path: '/collection/beauty?subcategory=makeup' },
                    { label: 'Foundations & Compact', path: '/collection/beauty?subcategory=makeup' },
                    { label: 'Mascara & Eyeliners', path: '/collection/beauty?subcategory=makeup' },
                ]
            },
            {
                title: 'FRAGRANCES',
                items: [
                    { label: 'Perfumes (EDP/EDT)', path: '/collection/beauty?subcategory=fragrances' },
                    { label: 'Body Mists & Sprays', path: '/collection/beauty?subcategory=fragrances' },
                ]
            }
        ]
    },
    {
        key: 'home-kitchen',
        label: 'HOME & KITCHEN',
        slug: 'home-living',
        defaultPath: '/collection/home-living',
        sections: [
            {
                title: 'Kitchen & Dining',
                items: [
                    { label: 'Cookware', path: '/collection/home-living?subcategory=cookware' },
                    { label: 'Bakeware', path: '/collection/home-living?subcategory=bakeware' },
                    { label: 'Kitchen Tools & Gadgets', path: '/collection/home-living?subcategory=kitchen-tools-gadgets' },
                    { label: 'Dinner Sets', path: '/collection/home-living?subcategory=dinner-sets' },
                    { label: 'Plates & Bowls', path: '/collection/home-living?subcategory=plates-bowls' },
                    { label: 'Glasses & Cups', path: '/collection/home-living?subcategory=glasses-cups' },
                    { label: 'Cutlery', path: '/collection/home-living?subcategory=cutlery' },
                    { label: 'Storage Containers', path: '/collection/home-living?subcategory=storage-containers' },
                    { label: 'Water Bottles & Flasks', path: '/collection/home-living?subcategory=water-bottles-flasks' },
                    { label: 'Lunch Boxes', path: '/collection/home-living?subcategory=lunch-boxes' },
                    { label: 'Kitchen Organizers', path: '/collection/home-living?subcategory=kitchen-organizers' },
                ]
            },
            {
                title: 'Home Décor',
                items: [
                    { label: 'Wall Décor', path: '/collection/home-living?subcategory=wall-decor' },
                    { label: 'Photo Frames', path: '/collection/home-living?subcategory=photo-frames' },
                    { label: 'Clocks', path: '/collection/home-living?subcategory=clocks' },
                    { label: 'Vases', path: '/collection/home-living?subcategory=vases' },
                    { label: 'Artificial Flowers & Plants', path: '/collection/home-living?subcategory=artificial-flowers-plants' },
                    { label: 'Candles & Candle Holders', path: '/collection/home-living?subcategory=candles-holders' },
                    { label: 'Decorative Items', path: '/collection/home-living?subcategory=decorative-items' },
                    { label: 'Showpieces', path: '/collection/home-living?subcategory=showpieces' },
                    { label: 'Mirrors', path: '/collection/home-living?subcategory=mirrors' },
                ]
            },
            {
                title: 'Home Furnishing',
                items: [
                    { label: 'Bedsheets', path: '/collection/home-living?subcategory=bedsheets' },
                    { label: 'Blankets & Quilts', path: '/collection/home-living?subcategory=blankets-quilts' },
                    { label: 'Pillows & Cushions', path: '/collection/home-living?subcategory=pillows-cushions' },
                    { label: 'Curtains', path: '/collection/home-living?subcategory=curtains' },
                    { label: 'Carpets & Rugs', path: '/collection/home-living?subcategory=carpets-rugs' },
                    { label: 'Mats & Doormats', path: '/collection/home-living?subcategory=mats-doormats' },
                    { label: 'Sofa Covers', path: '/collection/home-living?subcategory=sofa-covers' },
                    { label: 'Table Covers', path: '/collection/home-living?subcategory=table-covers' },
                ]
            },
            {
                title: 'Furniture',
                items: [
                    { label: 'Chairs', path: '/collection/home-living?subcategory=chairs' },
                    { label: 'Tables', path: '/collection/home-living?subcategory=tables' },
                    { label: 'Sofas', path: '/collection/home-living?subcategory=sofas' },
                    { label: 'Beds', path: '/collection/home-living?subcategory=beds' },
                    { label: 'Wardrobes', path: '/collection/home-living?subcategory=wardrobes' },
                    { label: 'Shoe Racks', path: '/collection/home-living?subcategory=shoe-racks' },
                    { label: 'Bookshelves', path: '/collection/home-living?subcategory=bookshelves' },
                    { label: 'TV Units', path: '/collection/home-living?subcategory=tv-units' },
                    { label: 'Storage Cabinets', path: '/collection/home-living?subcategory=storage-cabinets' },
                ]
            },
            {
                title: 'Home Storage & Organization',
                items: [
                    { label: 'Storage Boxes', path: '/collection/home-living?subcategory=storage-boxes' },
                    { label: 'Baskets', path: '/collection/home-living?subcategory=baskets' },
                    { label: 'Drawer Organizers', path: '/collection/home-living?subcategory=drawer-organizers' },
                    { label: 'Wardrobe Organizers', path: '/collection/home-living?subcategory=wardrobe-organizers' },
                    { label: 'Shoe Organizers', path: '/collection/home-living?subcategory=shoe-organizers' },
                    { label: 'Kitchen Storage', path: '/collection/home-living?subcategory=kitchen-storage' },
                    { label: 'Laundry Baskets', path: '/collection/home-living?subcategory=laundry-baskets' },
                    { label: 'Multipurpose Racks', path: '/collection/home-living?subcategory=multipurpose-racks' },
                ]
            },
            {
                title: 'Cleaning & Household',
                items: [
                    { label: 'Cleaning Tools', path: '/collection/home-living?subcategory=cleaning-tools' },
                    { label: 'Mops & Brooms', path: '/collection/home-living?subcategory=mops-brooms' },
                    { label: 'Dustpans', path: '/collection/home-living?subcategory=dustpans' },
                    { label: 'Brushes & Scrubbers', path: '/collection/home-living?subcategory=brushes-scrubbers' },
                    { label: 'Cleaning Buckets', path: '/collection/home-living?subcategory=cleaning-buckets' },
                    { label: 'Garbage Bins', path: '/collection/home-living?subcategory=garbage-bins' },
                    { label: 'Laundry Accessories', path: '/collection/home-living?subcategory=laundry-accessories' },
                    { label: 'Cleaning Supplies', path: '/collection/home-living?subcategory=cleaning-supplies' },
                ]
            },
            {
                title: 'Kitchen Appliances',
                items: [
                    { label: 'Mixer Grinders', path: '/collection/home-living?subcategory=mixer-grinders' },
                    { label: 'Electric Kettles', path: '/collection/home-living?subcategory=electric-kettles' },
                    { label: 'Induction Cooktops', path: '/collection/home-living?subcategory=induction-cooktops' },
                    { label: 'Air Fryers', path: '/collection/home-living?subcategory=air-fryers' },
                    { label: 'Rice Cookers', path: '/collection/home-living?subcategory=rice-cookers' },
                    { label: 'Toasters', path: '/collection/home-living?subcategory=toasters' },
                    { label: 'Sandwich Makers', path: '/collection/home-living?subcategory=sandwich-makers' },
                    { label: 'Choppers', path: '/collection/home-living?subcategory=choppers' },
                    { label: 'Juicers', path: '/collection/home-living?subcategory=juicers' },
                    { label: 'Coffee Makers', path: '/collection/home-living?subcategory=coffee-makers' },
                ]
            },
            {
                title: 'Home Appliances',
                items: [
                    { label: 'Fans', path: '/collection/home-living?subcategory=fans' },
                    { label: 'Air Coolers', path: '/collection/home-living?subcategory=air-coolers' },
                    { label: 'Vacuum Cleaners', path: '/collection/home-living?subcategory=vacuum-cleaners' },
                    { label: 'Air Purifiers', path: '/collection/home-living?subcategory=air-purifiers' },
                    { label: 'Irons', path: '/collection/home-living?subcategory=irons' },
                    { label: 'Water Heaters', path: '/collection/home-living?subcategory=water-heaters' },
                    { label: 'Room Heaters', path: '/collection/home-living?subcategory=room-heaters' },
                ]
            },
            {
                title: 'Bathroom',
                items: [
                    { label: 'Bath Towels', path: '/collection/home-living?subcategory=bath-towels' },
                    { label: 'Shower Curtains', path: '/collection/home-living?subcategory=shower-curtains' },
                    { label: 'Bath Mats', path: '/collection/home-living?subcategory=bath-mats' },
                    { label: 'Bathroom Organizers', path: '/collection/home-living?subcategory=bathroom-organizers' },
                    { label: 'Soap Dispensers', path: '/collection/home-living?subcategory=soap-dispensers' },
                    { label: 'Toothbrush Holders', path: '/collection/home-living?subcategory=toothbrush-holders' },
                    { label: 'Bathroom Accessories', path: '/collection/home-living?subcategory=bathroom-accessories' },
                    { label: 'Cleaning Accessories', path: '/collection/home-living?subcategory=cleaning-accessories' },
                ]
            },
            {
                title: 'Lighting',
                items: [
                    { label: 'Table Lamps', path: '/collection/home-living?subcategory=table-lamps' },
                    { label: 'Floor Lamps', path: '/collection/home-living?subcategory=floor-lamps' },
                    { label: 'Ceiling Lights', path: '/collection/home-living?subcategory=ceiling-lights' },
                    { label: 'Wall Lights', path: '/collection/home-living?subcategory=wall-lights' },
                    { label: 'LED Lights', path: '/collection/home-living?subcategory=led-lights' },
                    { label: 'Decorative Lights', path: '/collection/home-living?subcategory=decorative-lights' },
                    { label: 'Night Lamps', path: '/collection/home-living?subcategory=night-lamps' },
                    { label: 'Smart Lighting', path: '/collection/home-living?subcategory=smart-lighting' },
                ]
            },
            {
                title: 'Gardening & Outdoor',
                items: [
                    { label: 'Plant Pots', path: '/collection/home-living?subcategory=plant-pots' },
                    { label: 'Planters', path: '/collection/home-living?subcategory=planters' },
                    { label: 'Gardening Tools', path: '/collection/home-living?subcategory=gardening-tools' },
                    { label: 'Seeds', path: '/collection/home-living?subcategory=seeds' },
                    { label: 'Watering Cans', path: '/collection/home-living?subcategory=watering-cans' },
                    { label: 'Garden Décor', path: '/collection/home-living?subcategory=garden-decor' },
                    { label: 'Artificial Plants', path: '/collection/home-living?subcategory=artificial-plants' },
                    { label: 'Outdoor Furniture', path: '/collection/home-living?subcategory=outdoor-furniture' },
                ]
            },
            {
                title: 'Home Improvement',
                items: [
                    { label: 'Hardware', path: '/collection/home-living?subcategory=hardware' },
                    { label: 'Tools', path: '/collection/home-living?subcategory=tools' },
                    { label: 'Electrical Accessories', path: '/collection/home-living?subcategory=electrical-accessories' },
                    { label: 'Switches & Sockets', path: '/collection/home-living?subcategory=switches-sockets' },
                    { label: 'Extension Boards', path: '/collection/home-living?subcategory=extension-boards' },
                    { label: 'Adhesives & Tapes', path: '/collection/home-living?subcategory=adhesives-tapes' },
                    { label: 'Door & Window Accessories', path: '/collection/home-living?subcategory=door-window-accessories' },
                ]
            }
        ]
    },
    {
        key: 'electronics',
        label: 'ELECTRONICS',
        slug: 'electronics',
        defaultPath: '/collection/electronics',
        sections: [
            {
                title: 'Audio & Sound',
                items: [
                    { label: 'Wireless Headphones', path: '/collection/electronics?subcategory=headphones' },
                    { label: 'Bluetooth Speakers', path: '/collection/electronics?subcategory=speakers' },
                    { label: 'TWS Earbuds', path: '/collection/electronics?subcategory=earbuds' },
                ]
            },
            {
                title: 'Smart Wearables',
                items: [
                    { label: 'Smartwatches', path: '/collection/electronics?subcategory=smart-wearables' },
                    { label: 'Fitness Trackers', path: '/collection/electronics?subcategory=fitness-trackers' },
                ]
            },
            {
                title: 'Accessories & Peripherals',
                items: [
                    { label: 'Power Banks', path: '/collection/electronics?subcategory=power-banks' },
                    { label: 'Keyboards & Mice', path: '/collection/electronics?subcategory=keyboards-mice' },
                ]
            }
        ]
    },
    {
        key: 'stationary',
        label: 'STATIONERY',
        slug: 'stationary',
        defaultPath: '/collection/stationary',
        sections: [
            {
                title: 'Writing & Diaries',
                items: [
                    { label: 'Pens & Pencils', path: '/collection/stationary?subcategory=pens' },
                    { label: 'Notebooks & Journals', path: '/collection/stationary?subcategory=notebooks' },
                ]
            },
            {
                title: 'Office & Art Supplies',
                items: [
                    { label: 'Art & Craft Paints', path: '/collection/stationary?subcategory=art-craft' },
                    { label: 'Desk Organizers & Files', path: '/collection/stationary?subcategory=desk-organizers' },
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
                title: 'ESSENTIALS & DIYAS',
                items: [
                    { label: 'Pooja Essentials', path: '/collection/pooja-items?subcategory=pooja-essentials' },
                    { label: 'Diyas & Lamps', path: '/collection/pooja-items?subcategory=diyas-lamps' },
                    { label: 'Incense & Fragrance', path: '/collection/pooja-items?subcategory=incense-fragrance' },
                    { label: 'Pooja Samagri', path: '/collection/pooja-items?subcategory=pooja-samagri' },
                ]
            },
            {
                title: 'IDOLS & ACCESSORIES',
                items: [
                    { label: 'Idols & Statues', path: '/collection/pooja-items?subcategory=idols-statues' },
                    { label: 'Pooja Accessories', path: '/collection/pooja-items?subcategory=pooja-accessories' },
                    { label: 'Pooja Decoration', path: '/collection/pooja-items?subcategory=pooja-decoration' },
                    { label: 'Home Temple / Mandir', path: '/collection/pooja-items?subcategory=home-temple-mandir' },
                ]
            },
            {
                title: 'SPIRITUAL & KITS',
                items: [
                    { label: 'Rudraksha & Spiritual', path: '/collection/pooja-items?subcategory=rudraksha-spiritual' },
                    { label: 'Religious Books', path: '/collection/pooja-items?subcategory=religious-books' },
                    { label: 'Havan & Yagna', path: '/collection/pooja-items?subcategory=havan-yagna' },
                    { label: 'Festival Pooja Kits', path: '/collection/pooja-items?subcategory=festival-pooja-kits' },
                    { label: 'Brass & Silver Items', path: '/collection/pooja-items?subcategory=brass-silver-pooja-items' },
                    { label: 'Pooja Storage', path: '/collection/pooja-items?subcategory=pooja-storage' },
                ]
            }
        ]
    },
    {
        key: 'grocery',
        label: 'GROCERY ITEMS',
        slug: 'grocery',
        defaultPath: '/collection/grocery',
        sections: [
            {
                title: 'Staples & Dry Fruits',
                items: [
                    { label: 'Rice, Atta & Oils', path: '/collection/grocery?subcategory=staples' },
                    { label: 'Almonds, Cashews & Seeds', path: '/collection/grocery?subcategory=dry-fruits' },
                ]
            },
            {
                title: 'Beverages & Gourmet',
                items: [
                    { label: 'Tea & Coffee', path: '/collection/grocery?subcategory=beverages' },
                    { label: 'Olive Oil & Pasta', path: '/collection/grocery?subcategory=gourmet-sauces' },
                ]
            }
        ]
    },
    {
        key: 'more-categories',
        label: 'MORE CATEGORIES',
        slug: 'more-categories',
        defaultPath: '/categories',
        sections: [
            {
                title: 'CURATED COLLECTIONS',
                items: [
                    { label: 'Pooja Items & Mandir', path: '/collection/pooja-items' },
                    { label: 'Gifts & Festive Hampers', path: '/collection/gifts' },
                    { label: 'Healthy & Organic Foods', path: '/collection/healthy-foods' },
                    { label: 'Stationery & Office Supplies', path: '/collection/stationary' },
                ]
            }
        ]
    }
];


