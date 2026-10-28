import fs from 'fs';
import path from 'path';

const categoriesJsPath = path.resolve('./frontend/src/data/categories.js');
let content = fs.readFileSync(categoriesJsPath, 'utf8');

const groceryItemsSection = `  'grocery-items': [
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
  ],`;

// Replace existing grocery definition in categorySections
if (content.includes("'grocery': [")) {
  const startIdx = content.indexOf("'grocery': [");
  // Find matching closing bracket
  let braceCount = 0;
  let inSection = false;
  let endIdx = -1;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') {
      braceCount++;
      inSection = true;
    } else if (content[i] === ']') {
      braceCount--;
      if (inSection && braceCount === 0) {
        // Find next comma if present
        endIdx = i;
        if (content[i + 1] === ',') endIdx = i + 1;
        break;
      }
    }
  }

  if (endIdx !== -1) {
    content = content.slice(0, startIdx) + groceryItemsSection + '\n' + content.slice(endIdx + 1);
    console.log("Replaced old grocery section with grocery-items and pet-accessories");
  }
} else if (!content.includes("'grocery-items': [")) {
  // Insert before closing bracket of categorySections
  content = content.replace("export const categorySections = {", "export const categorySections = {\n" + groceryItemsSection);
  console.log("Prepended grocery-items and pet-accessories to categorySections");
}

// Add aliases
if (!content.includes("categorySections['grocery-items']")) {
  content = content.replace(
    "categorySections['groceries'] = categorySections['grocery'];",
    "categorySections['grocery'] = categorySections['grocery-items'];\ncategorySections['groceries'] = categorySections['grocery-items'];\ncategorySections['pet'] = categorySections['pet-accessories'];\ncategorySections['pets'] = categorySections['pet-accessories'];"
  );
}

fs.writeFileSync(categoriesJsPath, content, 'utf8');
console.log("Saved updated frontend/src/data/categories.js");
