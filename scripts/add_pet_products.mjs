import fs from 'fs';
import path from 'path';

export const petProducts = [
  // ==========================================
  // 1. DOG FOOD & NUTRITION
  // ==========================================
  {
    id: "gmd-pet-df-001",
    product_id: "gmd-pet-df-001",
    name: "PetKonnect Maxi Adult Complete Dry Dog Food - Chicken & Vegetables (6kg)",
    title: "PetKonnect Chicken & Veggie Dog Food (6kg)",
    brand: "PetKonnect",
    category: "pet-accessories",
    category_name: "Dog Food & Nutrition",
    subcategory: "dog-food",
    childCategory: "dry-dog-food",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1899,
    mrp: 2799,
    discount_percentage: 32,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 245,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://www.petkonnect.in/cdn/shop/products/PK2022_chicken_veg6kg.jpg?v=1735909036&width=1946",
    images: [
      "https://www.petkonnect.in/cdn/shop/products/PK2022_chicken_veg6kg.jpg?v=1735909036&width=1946"
    ],
    pi_images: [
      {
        image_url: "https://www.petkonnect.in/cdn/shop/products/PK2022_chicken_veg6kg.jpg?v=1735909036&width=1946"
      }
    ],
    description: "Provide complete, nutrient-rich nutrition for your canine companion with PetKonnect Maxi Adult Chicken & Vegetable dry dog food. Enriched with high-protein real chicken, farm-fresh vegetables, essential Omega-3 & Omega-6 fatty acids for coat shine, and prebiotics for healthy digestion.",
    features: [
      "Real deboned chicken as primary source of high-quality protein",
      "Fortified with Omega 3 & 6 fatty acids for lustrous coat and healthy skin",
      "Contains prebiotics and beet pulp to support smooth gastrointestinal digestion",
      "Crunchy kibble texture naturally promotes dental hygiene and reduces tartar",
      "Formulated without artificial preservatives, fillers, or artificial colorants"
    ],
    specifications: {
      "Food Type": "Dry Dog Food",
      "Net Quantity": "6 kg",
      "Life Stage": "Adult Dogs (1+ Years)",
      "Flavour": "Real Chicken & Vegetables",
      "Key Nutrients": "Crude Protein 24%, Crude Fat 12%, Crude Fibre 3.5%",
      "Breed Suitability": "Medium to Large Breeds",
      "Shelf Life": "24 Months"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories dog food nutrition dry dog food chicken vegetables petkonnect kibble adult dog"
  },
  {
    id: "gmd-pet-df-002",
    product_id: "gmd-pet-df-002",
    name: "Pedigree Adult Complete & Balanced Dry Dog Food - Real Chicken & Vegetables (3kg)",
    title: "Pedigree Chicken & Vegetable Dog Food (3kg)",
    brand: "Pedigree",
    category: "pet-accessories",
    category_name: "Dog Food & Nutrition",
    subcategory: "dog-food",
    childCategory: "dry-dog-food",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 849,
    mrp: 1150,
    discount_percentage: 26,
    stock_quantity: 65,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 580,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://ofypets.com/cdn/shop/files/pedigree-chicken-and-vegetable-adult-dog-food-ofypets-3_700x700.jpg?v=1739353284",
    images: [
      "https://ofypets.com/cdn/shop/files/pedigree-chicken-and-vegetable-adult-dog-food-ofypets-3_700x700.jpg?v=1739353284"
    ],
    pi_images: [
      {
        image_url: "https://ofypets.com/cdn/shop/files/pedigree-chicken-and-vegetable-adult-dog-food-ofypets-3_700x700.jpg?v=1739353284"
      }
    ],
    description: "Pedigree Adult Chicken & Vegetables delivers 100% complete and balanced nutrition developed by veterinarians and nutritionists at Waltham Centre for Pet Nutrition. Designed to support 5 signs of good health: strong teeth & bones, healthy digestion, shiny coat, strong muscles, and robust immunity.",
    features: [
      "100% complete & balanced nutrition for adult dogs of all breeds",
      "Contains 20% crude protein, 10% crude fat, and 5% crude fibre",
      "Zinc and Omega fatty acids proven to nourish skin and fur within 6 weeks",
      "Calcium & phosphorus strengthen bones and teeth",
      "Formulated with natural prebiotics for easy nutrient absorption"
    ],
    specifications: {
      "Food Type": "Dry Kibble",
      "Net Weight": "3 kg",
      "Life Stage": "Adult Dogs (12+ Months)",
      "Flavour": "Chicken & Veg",
      "Brand Heritage": "Waltham Certified Pet Nutrition",
      "Shelf Life": "18 Months"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories dog food pedigree chicken vegetables nutrition dry food all breeds"
  },

  // ==========================================
  // 2. DOG TREATS & CHEWS
  // ==========================================
  {
    id: "gmd-pet-dt-001",
    product_id: "gmd-pet-dt-001",
    name: "Greenies Original Teenie Natural Dental Dog Treats & Chews (43 Count Pack)",
    title: "Greenies Original Dental Dog Treats",
    brand: "Greenies",
    category: "pet-accessories",
    category_name: "Dog Treats & Chews",
    subcategory: "dog-treats",
    childCategory: "dental-chews",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 999,
    mrp: 1599,
    discount_percentage: 38,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 310,
    is_featured: true,
    is_bestseller: true,
    deal_type: "featured",
    thumbnail: "https://www.meijer.com/content/dam/meijer/product/0079/10/0514/10/0079100514106_2_A1C1_1200.jpg",
    images: [
      "https://www.meijer.com/content/dam/meijer/product/0079/10/0514/10/0079100514106_2_A1C1_1200.jpg"
    ],
    pi_images: [
      {
        image_url: "https://www.meijer.com/content/dam/meijer/product/0079/10/0514/10/0079100514106_2_A1C1_1200.jpg"
      }
    ],
    description: "Veterinarian recommended #1 dental chew: Greenies Original Dental Treats feature a flexible, chewable texture that bends around canine teeth down to the gumline. Clinically proven to clean teeth, fight plaque and tartar buildup, and freshen bad dog breath with easy-to-digest natural ingredients.",
    features: [
      "VOHC (Veterinary Oral Health Council) Accepted dental chew",
      "Cleans down to the gumline to fight plaque and tartar buildup",
      "Freshens breath with natural spearmint notes and chlorophyll",
      "Enriched with essential vitamins, minerals, and dietary fiber",
      "Highly soluble and easily digestible for sensitive canine stomachs"
    ],
    specifications: {
      "Type": "Natural Dental Chew",
      "Package Quantity": "43 Teenie Dental Treats",
      "Target Dog Size": "Teenie / Small Dogs (2-7 kg)",
      "Key Benefits": "Dental Hygiene, Breath Freshening, Tartar Defense",
      "Dietary Features": "Grain-free natural formula"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories dog treats chews greenies dental chews tartar plaque teeth cleaning"
  },
  {
    id: "gmd-pet-dt-002",
    product_id: "gmd-pet-dt-002",
    name: "Dog Child Organic Baked Pumpkin & Peanut Butter Crunchy Dog Treats (250g)",
    title: "Dog Child Baked Pumpkin & Peanut Butter Treats",
    brand: "Dog Child",
    category: "pet-accessories",
    category_name: "Dog Treats & Chews",
    subcategory: "dog-treats",
    childCategory: "organic-treats",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 499,
    mrp: 799,
    discount_percentage: 38,
    stock_quantity: 45,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 190,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://dogchild.co/cdn/shop/articles/Mira_Recipe_Blog_Photos_11_e877f724-6836-4d25-abf7-33a54b27019b_1080x.png?v=1754070009",
    images: [
      "https://dogchild.co/cdn/shop/articles/Mira_Recipe_Blog_Photos_11_e877f724-6836-4d25-abf7-33a54b27019b_1080x.png?v=1754070009"
    ],
    pi_images: [
      {
        image_url: "https://dogchild.co/cdn/shop/articles/Mira_Recipe_Blog_Photos_11_e877f724-6836-4d25-abf7-33a54b27019b_1080x.png?v=1754070009"
      }
    ],
    description: "Wholesome, slow-baked artisan treats your dog will eagerly beg for. Made with 100% human-grade roasted pumpkin, creamy unsalted peanut butter, and ground flaxseed, Dog Child baked biscuits are packed with natural dietary fiber, potassium, and healthy plant fats.",
    features: [
      "100% human-grade, plant-based whole ingredients",
      "Real roasted pumpkin aids digestion and soothes upset stomachs",
      "Protein-rich peanut butter provides mouth-watering natural flavor",
      "Slow-baked in small batches for satisfying crunchy texture",
      "Free from corn, wheat, soy, artificial sugar, and palm oil"
    ],
    specifications: {
      "Type": "Oven-Baked Crunchy Biscuits",
      "Weight": "250 grams",
      "Ingredients": "Organic Pumpkin Puree, Peanut Butter, Oats, Flaxseed",
      "Allergen Info": "Gluten-Free, No Artificial Additives",
      "Shelf Life": "12 Months"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories dog treats chews dog child baked pumpkin peanut butter biscuits organic"
  },

  // ==========================================
  // 3. COLLARS, LEASHES & HARNESSES
  // ==========================================
  {
    id: "gmd-pet-cl-001",
    product_id: "gmd-pet-cl-001",
    name: "Classic Padded Genuine Leather Dog Collar with Heavy-Duty Brass Hardware (Adjustable)",
    title: "Classic Padded Leather Dog Collar",
    brand: "BarkPaws",
    category: "pet-accessories",
    category_name: "Collars, Leashes & Harnesses",
    subcategory: "collars-leashes",
    childCategory: "dog-collars",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 649,
    mrp: 1299,
    discount_percentage: 50,
    stock_quantity: 50,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 220,
    is_featured: false,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIuWVYW3IF9aNxjwycuHkKpRmA7VBFgyCBKCDmJ0p-_Q&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIuWVYW3IF9aNxjwycuHkKpRmA7VBFgyCBKCDmJ0p-_Q&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIuWVYW3IF9aNxjwycuHkKpRmA7VBFgyCBKCDmJ0p-_Q&s=10"
      }
    ],
    description: "Handcrafted from full-grain genuine bridle leather with a supple padded interior lining, this classic collar prevents neck chafing and hair pulling. Features rust-proof solid brass buckle, reinforced D-ring for leash attachment, and timeless stitched craftsmanship.",
    features: [
      "100% Full-grain genuine leather with ultra-soft inner padding",
      "Solid alloy brass buckle and welded heavy-duty leash D-ring",
      "Precision double-edge stitching ensures long-lasting durability",
      "Adjustable 5-hole design fits neck girth comfortably",
      "Resistant to weather, rain, and everyday outdoor wear and tear"
    ],
    specifications: {
      "Material": "Full-Grain Leather + Soft Foam Lining",
      "Hardware": "Solid Brass Coated Alloy",
      "Width": "1.0 Inch (2.5 cm)",
      "Neck Fit": "16 to 22 Inches (Medium to Large Breeds)",
      "Care": "Wipe with damp cloth and leather conditioner"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories collars leashes harnesses leather dog collar barkpaws brass buckle"
  },
  {
    id: "gmd-pet-cl-002",
    product_id: "gmd-pet-cl-002",
    name: "Barks & Wags Premium No-Pull Breathable Padded Dog Harness Set with Reflective Trim",
    title: "Barks & Wags No-Pull Dog Harness Set",
    brand: "Barks & Wags",
    category: "pet-accessories",
    category_name: "Collars, Leashes & Harnesses",
    subcategory: "collars-leashes",
    childCategory: "dog-harnesses",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1199,
    mrp: 2199,
    discount_percentage: 45,
    stock_quantity: 35,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 360,
    is_featured: true,
    is_bestseller: true,
    deal_type: "featured",
    thumbnail: "https://barksandwags.in/cdn/shop/files/1_19a11ee8-a9ad-463a-9047-c95809b51218.png?v=1720616355",
    images: [
      "https://barksandwags.in/cdn/shop/files/1_19a11ee8-a9ad-463a-9047-c95809b51218.png?v=1720616355"
    ],
    pi_images: [
      {
        image_url: "https://barksandwags.in/cdn/shop/files/1_19a11ee8-a9ad-463a-9047-c95809b51218.png?v=1720616355"
      }
    ],
    description: "Designed for effortless, choke-free walks: Barks & Wags No-Pull Harness evenly distributes pulling pressure across your dog's chest and shoulders. Fitted with dual front and back leash clips, breathable air-mesh padding, quick-release locking buckles, and 3M reflective safety piping.",
    features: [
      "No-pull front chest D-ring deters pulling without neck choking",
      "Air-mesh breathable cushion prevents sweating and hot spots",
      "3M Scotchlite reflective stripes ensure 360° nighttime visibility",
      "4 Adjustable straps create custom, snug fit as your pet grows",
      "Sturdy top grab handle allows instant control in crowds or traffic"
    ],
    specifications: {
      "Type": "No-Pull Walking Dog Harness",
      "Material": "Oxford 600D Nylon + Breathable Air-Mesh",
      "Hardware": "Zinc Alloy D-Rings & Quick-Snap Buckles",
      "Safety": "3M Reflective Piping",
      "Sizes": "Available in S, M, L, XL"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories collars leashes harnesses barks and wags no-pull harness reflective dog harness"
  },
  {
    id: "gmd-pet-cl-003",
    product_id: "gmd-pet-cl-003",
    name: "Heavy-Duty Shock Absorbing Reflective Bungee Dog Leash with Dual Padded Traffic Handles",
    title: "Shock Absorbing Bungee Dog Leash",
    brand: "PetSafe",
    category: "pet-accessories",
    category_name: "Collars, Leashes & Harnesses",
    subcategory: "collars-leashes",
    childCategory: "dog-leashes",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 799,
    mrp: 1499,
    discount_percentage: 47,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 280,
    is_featured: false,
    is_bestseller: false,
    deal_type: "daily_deal",
    thumbnail: "https://m.media-amazon.com/images/I/81+Yu5lGpIL._AC_UF1000,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81+Yu5lGpIL._AC_UF1000,1000_QL80_.jpg"
    ],
    pi_images: [
      {
        image_url: "https://m.media-amazon.com/images/I/81+Yu5lGpIL._AC_UF1000,1000_QL80_.jpg"
      }
    ],
    description: "Tired of jarring jerks during outdoor walks? This heavy-duty bungee leash incorporates an anti-shock elastic core that absorbs sudden lunges and protects both your arm and your dog's neck. Equipped with dual neoprene-lined handles: one for casual walking and a lower traffic handle for emergency control.",
    features: [
      "Elastic bungee core absorbs sudden pulls and lunges up to 100 lbs",
      "Dual neoprene-padded handles protect hands against leash burns",
      "Traffic handle positioned 1 foot from clip for instant close restraint",
      "Luminous dual-sided reflective stitching for nighttime safety",
      "Heavy-duty 360° rotating aviation metal carabiner prevents tangling"
    ],
    specifications: {
      "Length": "4 Feet extends to 6 Feet (120 cm - 180 cm)",
      "Material": "Tear-resistant Military Grade Nylon + Elastic Bungee",
      "Clip": "360-degree Swivel Zinc Alloy Clasp",
      "Handles": "Dual Soft Neoprene Padded Handles"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories collars leashes dog leash bungee shock absorbing traffic handle petsafe"
  },

  // ==========================================
  // 4. DOG TOYS & PLAY
  // ==========================================
  {
    id: "gmd-pet-ty-001",
    product_id: "gmd-pet-ty-001",
    name: "PetSetGo Tough Natural Rubber Chew & Fetch Ball Dog Toy with Treat Dispenser",
    title: "PetSetGo Rubber Chew & Fetch Ball",
    brand: "PetSetGo",
    category: "pet-accessories",
    category_name: "Dog Toys & Play",
    subcategory: "dog-toys",
    childCategory: "chew-toys",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 399,
    mrp: 799,
    discount_percentage: 50,
    stock_quantity: 60,
    in_stock: true,
    is_active: true,
    rating: 4.6,
    reviews_count: 175,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://petsetgo.co.in/cdn/shop/files/1_e8c2af4a-dfc2-4432-8af1-213e5474bdf6.png?v=1747390290",
    images: [
      "https://petsetgo.co.in/cdn/shop/files/1_e8c2af4a-dfc2-4432-8af1-213e5474bdf6.png?v=1747390290"
    ],
    pi_images: [
      {
        image_url: "https://petsetgo.co.in/cdn/shop/files/1_e8c2af4a-dfc2-4432-8af1-213e5474bdf6.png?v=1747390290"
      }
    ],
    description: "Keep your pup mentally stimulated and physically engaged with PetSetGo's natural rubber treat ball. Designed with tooth-cleaning rubber ridges that massage gums, internal treat dispensing cavity, and a high-bounce core ideal for interactive games of fetch at the park.",
    features: [
      "Made from 100% non-toxic, eco-friendly natural bouncy rubber",
      "Hollow core allows stuffing kibbles, treats, or peanut butter",
      "Specially grooved exterior cleans teeth and massages gums during chewing",
      "Extremely durable against aggressive chewing and vigorous play",
      "Floats on water for beach, pool, and lakeside fetch sessions"
    ],
    specifications: {
      "Type": "Interactive Chew & Fetch Ball",
      "Material": "Non-Toxic Food-Grade Natural Rubber",
      "Diameter": "7.5 cm (Suitable for small, medium & large dogs)",
      "Safety": "BPA-Free, Phthalate-Free",
      "Care": "Rinse with warm soapy water"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories dog toys play petsetgo rubber ball treat dispenser chew toy fetch"
  },
  {
    id: "gmd-pet-ty-002",
    product_id: "gmd-pet-ty-002",
    name: "KONG Classic Ultra-Durable Natural Rubber Chew & Interactive Squeaker Toy for Dogs",
    title: "KONG Classic Durable Rubber Dog Toy",
    brand: "KONG",
    category: "pet-accessories",
    category_name: "Dog Toys & Play",
    subcategory: "dog-toys",
    childCategory: "interactive-toys",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 699,
    mrp: 1199,
    discount_percentage: 42,
    stock_quantity: 40,
    in_stock: true,
    is_active: true,
    rating: 4.9,
    reviews_count: 480,
    is_featured: false,
    is_bestseller: true,
    deal_type: "featured",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShQGPMwl0hO7fF0YRgURVg3HJmyuxILq5v1LBIDwR88tZulo7Pmdc1P5py&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShQGPMwl0hO7fF0YRgURVg3HJmyuxILq5v1LBIDwR88tZulo7Pmdc1P5py&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShQGPMwl0hO7fF0YRgURVg3HJmyuxILq5v1LBIDwR88tZulo7Pmdc1P5py&s=10"
      }
    ],
    description: "The global benchmark in dog toys for over 40 years: KONG Classic's proprietary ultra-durable red rubber formula satisfies dogs' instinctual urge to chew. Its unpredictable dynamic bounce excites dogs in fetch games, while stuffing it with treats provides hours of enrichment that alleviates separation anxiety and boredom.",
    features: [
      "Globally renowned veterinarian & trainer recommended rubber formula",
      "Mentally stimulating toy: curbs destructive chewing, boredom & barking",
      "Unpredictable dynamic bounce keeps dogs chasing and engaged",
      "Stuff with peanut butter, yogurt, or biscuits for extended playtime",
      "Dishwasher safe for effortless, hygienic post-play cleaning"
    ],
    specifications: {
      "Brand": "KONG Classic",
      "Material": "KONG Proprietary Natural Red Rubber",
      "Size": "Medium (Suitable for dogs 7-16 kg)",
      "Origin": "Made in USA",
      "Care": "Top-rack dishwasher safe"
    },
    delivery_info: {
      estimated_days: 2,
      free_delivery_above: 499,
      express_available: true,
      return_days: 7
    },
    tags: "pet accessories dog toys play kong classic durable rubber toy chew toy boredom buster"
  },

  // ==========================================
  // 5. DOG BEDS AND CRATES
  // ==========================================
  {
    id: "gmd-pet-bd-001",
    product_id: "gmd-pet-bd-001",
    name: "Cozy Haven Orthopedic Memory Foam Washable Bolster Dog Bed with Anti-Skid Base (Grey)",
    title: "Cozy Haven Orthopedic Bolster Dog Bed",
    brand: "Cozy Haven",
    category: "pet-accessories",
    category_name: "Dog Beds & Crates",
    subcategory: "dog-beds",
    childCategory: "dog-beds",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 1899,
    mrp: 3499,
    discount_percentage: 46,
    stock_quantity: 25,
    in_stock: true,
    is_active: true,
    rating: 4.8,
    reviews_count: 230,
    is_featured: true,
    is_bestseller: true,
    deal_type: "daily_deal",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfzh1tiql8VgGD2SjVrvz_p-M0wKrt_R5ECRB_mRvo0bXH5lMPbmH0YKG&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfzh1tiql8VgGD2SjVrvz_p-M0wKrt_R5ECRB_mRvo0bXH5lMPbmH0YKG&s=10"
    ],
    pi_images: [
      {
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfzh1tiql8VgGD2SjVrvz_p-M0wKrt_R5ECRB_mRvo0bXH5lMPbmH0YKG&s=10"
      }
    ],
    description: "Gift your dog luxurious cloud-like slumber with the Cozy Haven Orthopedic Bolster Bed. Constructed with high-density therapeutic memory foam that cushions aching joints and hips, plush micro-suede bolsters for head and neck support, and a zippered removable machine-washable cover.",
    features: [
      "High-density orthopedic memory foam relieves pressure on joints & spine",
      "Plush padded bolsters provide optimum neck and chin resting support",
      "Removable zippered water-resistant cover is 100% machine washable",
      "Non-slip silicone dot bottom keeps bed anchored on tile and hardwood",
      "Ultra-soft faux suede fabric repels pet hair and stays cool in summer"
    ],
    specifications: {
      "Type": "Orthopedic Bolster Dog Bed",
      "Dimensions": "90 cm x 70 cm x 18 cm (Large)",
      "Foam": "Medical-Grade High-Density Memory Foam",
      "Cover Material": "Micro-Suede with Waterproof Inner Liner",
      "Base": "Non-Slip Anti-Skid Grip Dotted Fabric",
      "Care": "Machine wash cover on gentle cold cycle"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: false,
      return_days: 7
    },
    tags: "pet accessories dog beds crates orthopedic bed memory foam washable cozy haven"
  },
  {
    id: "gmd-pet-bd-002",
    product_id: "gmd-pet-bd-002",
    name: "AmazonBasics Foldable Double-Door Heavy-Duty Metal Wire Dog Crate with Divider Panel",
    title: "AmazonBasics Foldable Metal Dog Crate",
    brand: "AmazonBasics",
    category: "pet-accessories",
    category_name: "Dog Beds & Crates",
    subcategory: "dog-beds",
    childCategory: "dog-crates",
    department: "pet-accessories",
    gender: "unisex",
    section: "pet-accessories",
    seller_id: "seller-1",
    seller_name: "GoMo Verified Partner",
    price: 2999,
    mrp: 4999,
    discount_percentage: 40,
    stock_quantity: 20,
    in_stock: true,
    is_active: true,
    rating: 4.7,
    reviews_count: 410,
    is_featured: false,
    is_bestseller: false,
    deal_type: "featured",
    thumbnail: "https://m.media-amazon.com/images/I/41jST6FaZNL._SS400_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/41jST6FaZNL._SS400_.jpg"
    ],
    pi_images: [
      {
        image_url: "https://m.media-amazon.com/images/I/41jST6FaZNL._SS400_.jpg"
      }
    ],
    description: "Ensure your dog's safety at home or while traveling with the AmazonBasics Foldable Double-Door Dog Crate. Built from heavy-duty electro-coated steel wire with secure slide-bolt latches, removable leak-proof plastic composite pan for quick cleaning, and a collapsible fold-flat design with carrying handle.",
    features: [
      "Dual entry doors (front and side) for versatile room placement",
      "Secure dual slide-bolt latches on each door prevent pet escapes",
      "Includes adjustable divider panel to adjust interior space as puppy grows",
      "Folds completely flat in seconds for travel, transport, and compact storage",
      "Removable washable composite plastic pan catches messes and fur"
    ],
    specifications: {
      "Material": "Heavy-Duty Rust-Resistant Electro-Coated Steel Wire",
      "Dimensions": "36 x 23 x 25 Inches (Medium-Large Dogs up to 32 kg)",
      "Doors": "2 Doors (Front & Side)",
      "Included Accessories": "Divider Panel, Plastic Floor Pan, Carry Handle",
      "Weight": "10.5 kg"
    },
    delivery_info: {
      estimated_days: 3,
      free_delivery_above: 499,
      express_available: false,
      return_days: 7
    },
    tags: "pet accessories dog beds crates amazonbasics metal crate dog cage double door foldable"
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

const newProductsToAdd = petProducts.filter(p => !existingIds.has(p.id));

if (newProductsToAdd.length > 0) {
  const formattedNewProducts = newProductsToAdd.map(p => JSON.stringify(p, null, 2)).join(',\n');
  const lastBracketIndex = sampleContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const updatedContent = sampleContent.slice(0, lastBracketIndex).trimEnd() + ',\n' + formattedNewProducts + '\n];\n';
    fs.writeFileSync(sampleProductsPath, updatedContent, 'utf8');
    console.log(`Added ${newProductsToAdd.length} pet accessories products to frontend sampleProducts.js`);
  }
} else {
  console.log('All pet products already exist in frontend sampleProducts.js');
}

// 2. Append to backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  const backendProducts = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
  const backendIds = new Set(backendProducts.map(p => p.id || p.product_id));
  const backendToAdd = petProducts.filter(p => !backendIds.has(p.id));
  if (backendToAdd.length > 0) {
    backendProducts.push(...backendToAdd);
    fs.writeFileSync(backendPath, JSON.stringify(backendProducts, null, 2), 'utf8');
    console.log(`Added ${backendToAdd.length} pet accessories products to backend products.json`);
  } else {
    console.log('All pet products already exist in backend products.json');
  }
}
