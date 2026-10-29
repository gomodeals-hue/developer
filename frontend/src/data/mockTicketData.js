// Comprehensive Mock Dataset for GoMo Deals BookMyShow-style Ticket Booking System

export const MOCK_CITIES = [
  { name: 'Coimbatore', state: 'Tamil Nadu', isTop: true },
  { name: 'Chennai', state: 'Tamil Nadu', isTop: true },
  { name: 'Bengaluru', state: 'Karnataka', isTop: true },
  { name: 'Mumbai', state: 'Maharashtra', isTop: true },
  { name: 'Hyderabad', state: 'Telangana', isTop: true },
  { name: 'Delhi-NCR', state: 'National Capital', isTop: true },
  { name: 'Kochi', state: 'Kerala', isTop: true },
  { name: 'Madurai', state: 'Tamil Nadu', isTop: false },
  { name: 'Tiruppur', state: 'Tamil Nadu', isTop: false },
  { name: 'Salem', state: 'Tamil Nadu', isTop: false }
];

export const MOCK_MOVIES = [
  {
    id: 'mov_street_fighter',
    title: 'Street Fighter (2026)',
    genre: ['Action', 'Adventure', 'Comedy', 'Thriller'],
    rating: 8.9,
    votes: '42.8K',
    duration: '1h 59m',
    certificate: 'UA16+',
    release_date: '2026-10-16',
    interested_count: '50.7K+',
    description: 'Once inseparable fighters, Ryu and Ken are drawn out of their fractured lives when a covert force pulls them into the next World Warrior Tournament.',
    synopsis: 'Once inseparable fighters, Ryu and Ken are drawn out of their fractured lives when a covert force pulls them into the next World Warrior Tournament. What appears to be a contest of strength soon reveals a far more dangerous agenda, pushing them into a relentless battle not just for victory, but for survival against M. Bison and the shadowy syndicate of Shadaloo.',
    poster: '/images/action_poster_1780401266913.png',
    backdrop: '/images/cinematic_backdrop_1_1780401309164.png',
    trailer_url: 'Way9Dexny3w',
    languages: ['English', 'Tamil', 'Hindi', 'Telugu'],
    formats: ['2D', 'IMAX 2D', 'MX4D', 'ICE', 'DOLBY CINEMA 2D', '2D SCREEN X'],
    is_promoted: true,
    language: 'English',
    is_active: true,
    cast: [
      { name: 'Mike Moh', role: 'Ryu', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
      { name: 'Christian Howard', role: 'Ken Masters', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
      { name: 'Natasha Liu Bordizzo', role: 'Chun-Li', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
      { name: 'Alan Ritchson', role: 'Major Guile', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
      { name: 'Hiroyuki Sanada', role: 'Master Gouken', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
      { name: 'Jon Foo', role: 'Vega', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' }
    ],
    crew: [
      { name: 'Chad Stahelski', role: 'Director', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
      { name: 'Derek Kolstad', role: 'Writer', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200' },
      { name: 'Hans Zimmer', role: 'Music Composer', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'mov_coolie',
    title: 'Coolie',
    genre: ['Action', 'Drama', 'Thriller'],
    rating: 9.2,
    votes: '118.2K',
    duration: '2h 45m',
    certificate: 'UA16+',
    release_date: '2026-10-24',
    interested_count: '120.4K+',
    description: 'Superstar Rajinikanth stars in Lokesh Kanagaraj high-octane gold syndicate and port heist thriller.',
    synopsis: 'A stylish former ports operative is drawn into an underground syndicate war when a long-guarded consignment surfaces along the southern coast.',
    poster: '/images/real/poster_7.jpg',
    backdrop: '/images/real/backdrop_7.jpg',
    trailer_url: 'jxCRlebisbw',
    languages: ['Tamil', 'Telugu', 'Hindi'],
    formats: ['2D', 'IMAX 2D', 'DOLBY ATMOS'],
    language: 'Tamil',
    is_active: true,
    cast: [
      { name: 'Rajinikanth', role: 'Deva', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
      { name: 'Nagarjuna', role: 'Simon', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
      { name: 'Soubin Shahir', role: 'Dayal', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
      { name: 'Shruti Haasan', role: 'Preethi', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' }
    ],
    crew: [
      { name: 'Lokesh Kanagaraj', role: 'Director', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200' },
      { name: 'Anirudh Ravichander', role: 'Music Composer', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'mov_devara',
    title: 'Devara - Part 1',
    genre: ['Action', 'Drama', 'Period'],
    rating: 8.6,
    votes: '74.5K',
    duration: '2h 58m',
    certificate: 'UA16+',
    release_date: '2026-10-18',
    interested_count: '88.1K+',
    description: 'An epic coastal saga of courage, betrayal, and generational vengeance spanning the Bay of Bengal.',
    synopsis: 'Devara, a fearless sea guardian, defends his coastal tribe against ruthless mercenaries and clandestine maritime cartels.',
    poster: '/images/real/poster_8.jpg',
    backdrop: '/images/real/backdrop_8.jpg',
    trailer_url: 'Way9Dexny3w',
    languages: ['Telugu', 'Tamil', 'Hindi', 'Malayalam'],
    formats: ['2D', '3D', 'IMAX 3D'],
    language: 'Telugu',
    is_active: true
  },
  {
    id: 'mov_anbil_avan',
    title: 'Anbil Avan',
    genre: ['Romance', 'Drama', 'Musical'],
    rating: 8.4,
    votes: '26.1K',
    duration: '2h 22m',
    certificate: 'U',
    release_date: '2026-10-16',
    interested_count: '34.5K+',
    description: 'An emotional romance celebrating lifelong loyalty, redemption, and musical serenity in the hills.',
    synopsis: 'Two childhood soulmates reunite in the hills of the Nilgiris, navigating family obligations and heartfelt promises.',
    poster: '/images/real/poster_9.jpg',
    backdrop: '/images/real/backdrop_9.jpg',
    trailer_url: 'Po3jStA673E',
    languages: ['Tamil', 'Malayalam'],
    formats: ['2D'],
    language: 'Tamil',
    is_active: true
  },
  {
    id: 'mov_dune2',
    title: 'Dune: Part Two',
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    rating: 8.8,
    votes: '92.3K',
    duration: '2h 46m',
    certificate: 'UA16+',
    release_date: '2026-10-12',
    interested_count: '65.2K+',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    synopsis: 'A boy becomes the Messiah of nomads on a desert planet that has giant worms and spice. He faces a choice between the love of his life and the fate of the universe.',
    poster: '/images/real/poster_1.jpg',
    backdrop: '/images/real/backdrop_1.jpg',
    trailer_url: 'Way9Dexny3w',
    languages: ['English', 'Hindi'],
    formats: ['2D', 'IMAX 2D', '4DX'],
    language: 'English',
    is_active: true
  },
  {
    id: 'mov_kungfu4',
    title: 'Kung Fu Panda 4',
    genre: ['Animation', 'Action', 'Comedy'],
    rating: 7.8,
    votes: '38.6K',
    duration: '1h 34m',
    certificate: 'U',
    release_date: '2026-10-10',
    interested_count: '29.4K+',
    description: 'Po must train a new warrior when he is chosen to become the spiritual leader of the Valley of Peace.',
    synopsis: 'After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior.',
    poster: '/images/real/poster_2.jpg',
    backdrop: '/images/real/backdrop_2.jpg',
    trailer_url: 'Po3jStA673E',
    languages: ['English', 'Tamil', 'Hindi', 'Telugu'],
    formats: ['2D', '3D'],
    language: 'English',
    is_active: true
  }
];

export const MOCK_EVENTS = [
  {
    id: 'evt_gnr',
    title: "Guns N' Roses - Bandland on Tour",
    category: 'Concerts',
    genre: 'Rock / Metal',
    artist: "Guns N' Roses",
    date: '14 Nov 2026',
    time: '06:30 PM',
    venue: 'Nice Grounds, Tumkur Road',
    city: 'Bengaluru',
    cityMatch: ['Bengaluru', 'Chennai', 'Coimbatore'],
    price: 3500,
    rating: 4.9,
    votes: '14.2K',
    age_limit: '16+ Only',
    duration: '3h 30m',
    languages: ['English'],
    cover_image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200',
    description: "Rock legends Axl Rose, Slash and Duff McKagan return to India for Bandland's premier headliner spectacle. Experience three electrifying hours of anthems including 'Sweet Child O' Mine', 'Welcome to the Jungle', and 'November Rain' with state-of-the-art concert acoustics.",
    terms: 'Valid government ID mandatory for entry. Outside food & beverages strictly prohibited. Gates open at 04:00 PM.',
    organizer: 'BookMyShow Live & GoMo Entertainment',
    tiers: [
      { id: 'vip', name: 'VIP Lounge Pass', price: 6500, description: 'Front-row stage view, dedicated bar counter, VIP fast-track entry and premium lounge seating.' },
      { id: 'gold', name: 'Gold Fan Pit', price: 4200, description: 'High-energy standing zone immediately adjacent to the main catwalk.' },
      { id: 'silver', name: 'Silver General Admission', price: 2499, description: 'Open-ground festival lawn with expansive stadium sound towers.' }
    ]
  },
  {
    id: 'evt_ar_rahman',
    title: 'A.R. Rahman Live in Symphony',
    category: 'Concerts',
    genre: 'Symphony / Bollywood / Tamil',
    artist: 'A.R. Rahman & The Royal Philharmonic Section',
    date: '22 Nov 2026',
    time: '07:00 PM',
    venue: 'Jawaharlal Nehru Indoor Stadium',
    city: 'Chennai',
    cityMatch: ['Chennai', 'Coimbatore', 'Madurai'],
    price: 1500,
    rating: 4.95,
    votes: '28.6K',
    age_limit: 'Family Friendly (5+)',
    duration: '3h 15m',
    languages: ['Tamil', 'Hindi'],
    cover_image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    description: 'Oscar & Grammy winner A.R. Rahman orchestrates an unforgettable musical odyssey featuring a 75-piece live symphony, iconic guest vocalists, and timeless melodies spanning Roja to Ponniyin Selvan.',
    terms: 'Seating on first-come-first-served basis within ticket tier. Free parking available at Gate 4.',
    organizer: 'Sun Network & GoMo Deals Live',
    tiers: [
      { id: 'diamond', name: 'Diamond Royal Orchestra', price: 5000, description: 'Direct centre acoustic seats near maestro podium with complimentary snack hamper.' },
      { id: 'gold', name: 'Gold Elevated Tier', price: 2800, description: 'Front grandstand chairs with elevated sightlines.' },
      { id: 'silver', name: 'Silver Grandstand', price: 1499, description: 'Upper pavilion stadium seating with surround sound.' }
    ]
  },
  {
    id: 'evt_zakir',
    title: 'Zakir Khan - Tathastu & Beyond Live',
    category: 'Stand-up Comedy',
    genre: 'Observational Comedy',
    artist: 'Zakir Khan',
    date: '28 Oct 2026',
    time: '08:00 PM',
    venue: 'The Music Academy, TTK Road',
    city: 'Chennai',
    cityMatch: ['Chennai', 'Bengaluru', 'Coimbatore'],
    price: 799,
    rating: 4.88,
    votes: '19.4K',
    age_limit: '16+ Recommended',
    duration: '1h 45m',
    languages: ['Hindi', 'English'],
    cover_image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=1200',
    description: "The 'Sakht Launda' is back with an all-new solo show weaving nostalgic tales of childhood, middle-class friendships, and the comic truths of modern adulthood.",
    terms: 'No audio or video recording allowed during performance. Doors close 10 mins prior to showtime.',
    organizer: 'OML Entertainment',
    tiers: [
      { id: 'plat', name: 'Front Row Premium', price: 1999, description: 'Rows A to D right in front of the stage.' },
      { id: 'exec', name: 'Executive Orchestra', price: 1299, description: 'Central ground floor auditorium seating.' },
      { id: 'balc', name: 'Balcony View', price: 799, description: 'First floor elevated balcony seating.' }
    ]
  },
  {
    id: 'evt_anubhav',
    title: 'Anubhav Singh Bassi - Kisi Ko Batana Mat',
    category: 'Stand-up Comedy',
    genre: 'Storytelling Comedy',
    artist: 'Anubhav Singh Bassi',
    date: '05 Nov 2026',
    time: '07:30 PM',
    venue: 'CODISSIA Trade Fair Complex, Hall E',
    city: 'Coimbatore',
    cityMatch: ['Coimbatore', 'Salem', 'Tiruppur'],
    price: 699,
    rating: 4.8,
    votes: '12.1K',
    age_limit: '16+',
    duration: '1h 30m',
    languages: ['Hindi'],
    cover_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    description: "Bassi's hilarious, unfiltered storytelling unpacks hilarious college mishaps, bureaucratic struggles, and his memorable misadventures in law and entrepreneurship.",
    terms: 'Seats allocated on arrival. Food stalls available outside auditorium.',
    organizer: 'Laughing Colours Live',
    tiers: [
      { id: 'gold', name: 'Gold Front Block', price: 1499, description: 'Rows 1-10 priority stage facing seats.' },
      { id: 'silver', name: 'Silver Hall Pass', price: 699, description: 'General tier seating in air-conditioned hall.' }
    ]
  },
  {
    id: 'evt_ipl_csk_rcb',
    title: 'TATA IPL 2026: CSK vs RCB Blockbuster',
    category: 'Sports',
    genre: 'Cricket / T20',
    artist: 'Chennai Super Kings vs Royal Challengers',
    date: '25 Oct 2026',
    time: '07:30 PM',
    venue: 'M. A. Chidambaram Stadium (Chepauk)',
    city: 'Chennai',
    cityMatch: ['Chennai', 'Coimbatore', 'Bengaluru'],
    price: 1200,
    rating: 4.95,
    votes: '64.5K',
    age_limit: 'All Ages',
    duration: '4h 00m',
    languages: ['Live Commentary in English & Tamil'],
    cover_image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200',
    description: "The Southern Derby ignited! Watch MS Dhoni's Yellow Army battle Virat Kohli and RCB under the floodlights of Chepauk in a high-stakes T20 encounter.",
    terms: 'No coins, power banks, or water bottles allowed inside stadium. Collect official wristband at Box Office.',
    organizer: 'BCCI & Tamil Nadu Cricket Association',
    tiers: [
      { id: 'hospitality', name: 'Pavilion Terrace Hospitality', price: 7500, description: 'Air-conditioned lounge, complimentary 5-course buffet, and luxury terrace seats.' },
      { id: 'c_lower', name: 'C & D Lower Tier', price: 2500, description: 'Direct boundary-side chairs right behind the player dugouts.' },
      { id: 'k_upper', name: 'J & K Upper Stands', price: 1200, description: 'High-vantage panoramic bird’s eye view of the pitch.' }
    ]
  },
  {
    id: 'evt_ponniyin_selvan',
    title: 'Ponniyin Selvan - The Grand Stage Spectacle',
    category: 'Theatre',
    genre: 'Historical Drama',
    artist: 'Magic Lantern Theatre & Cholamandalam Troupe',
    date: '08 Nov 2026',
    time: '06:00 PM',
    venue: 'Kalasangam Auditorium, Race Course',
    city: 'Coimbatore',
    cityMatch: ['Coimbatore', 'Chennai', 'Madurai'],
    price: 450,
    rating: 4.9,
    votes: '7.8K',
    age_limit: 'All Ages',
    duration: '2h 45m',
    languages: ['Tamil'],
    cover_image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=1200',
    description: "Kalki's magnum opus brought to life with over 40 classically trained stage actors, live traditional percussion, elaborate Chola costumes, and breathtaking set design.",
    terms: 'Family friendly event. 15-minute intermission between Act 1 and Act 2.',
    organizer: 'Tamil Nadu Theatre Arts Collective',
    tiers: [
      { id: 'royal', name: 'Chola Royal Box', price: 1200, description: 'Centrally positioned front orchestra seats with program booklet.' },
      { id: 'first', name: 'First Class Row', price: 750, description: 'Mid-auditorium comfortable cushioned seating.' },
      { id: 'second', name: 'Second Class Row', price: 450, description: 'Rear auditorium seating.' }
    ]
  },
  {
    id: 'evt_pottery',
    title: 'Artisan Terracotta & Wheel Pottery Workshop',
    category: 'Activities',
    genre: 'Hands-on Art & Craft',
    artist: 'Clay & Kiln Studio by Meera',
    date: '24 Oct 2026',
    time: '10:30 AM',
    venue: 'Race Course Creative Hub',
    city: 'Coimbatore',
    cityMatch: ['Coimbatore', 'Salem', 'Tiruppur'],
    price: 850,
    rating: 4.85,
    votes: '3.4K',
    age_limit: '10+ Years',
    duration: '2h 30m',
    languages: ['English', 'Tamil'],
    cover_image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1200',
    description: 'Learn the meditative ancient art of wheel throwing, shaping terracotta vessels, and ceramic glaze decoration under master craftsmen. Take home your two fired masterpieces!',
    terms: 'All materials, aprons, and firing kilns provided. Wear comfortable clothes you do not mind getting dusty.',
    organizer: 'GoMo Deals Creative Experiences',
    tiers: [
      { id: 'single', name: 'Individual Maker Pass', price: 850, description: 'Includes 1 pottery wheel, 3kg natural clay, and firing service.' },
      { id: 'duo', name: 'Duo Couple / Friend Pass', price: 1500, description: 'Shared wheel workspace for two with two personalized fired souvenirs.' }
    ]
  },
  {
    id: 'evt_tea_trail',
    title: 'Nilgiris Heritage Tea Estate Walk & Tasting',
    category: 'Activities',
    genre: 'Nature & Culinary Tasting',
    artist: 'Glenrock Estate Artisanal Blends',
    date: '31 Oct 2026',
    time: '09:00 AM',
    venue: 'Glenrock Tea Estate, Coonoor Hills',
    city: 'Coimbatore',
    cityMatch: ['Coimbatore', 'Kochi', 'Bengaluru'],
    price: 1100,
    rating: 4.92,
    votes: '5.2K',
    age_limit: 'Family Friendly',
    duration: '3h 30m',
    languages: ['English', 'Tamil'],
    cover_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    description: 'A morning walking tour through misty 150-year-old tea bushes in the Nilgiris, followed by factory processing demonstration and a guided cupping session of 6 rare single-estate orthodox teas.',
    terms: 'Moderate walking involved. Wear hiking shoes and carry a light jacket. Meeting point: Glenrock Main Gate.',
    organizer: 'Nilgiris Heritage Tourism Club',
    tiers: [
      { id: 'standard', name: 'Heritage Walk & Cupping Platter', price: 1100, description: 'Guided trail walk + tasting of 6 teas with freshly baked scones.' },
      { id: 'estate', name: 'Full Estate Experience & Plantation Lunch', price: 2200, description: 'Walk, factory tour, tea tasting + 3-course estate bungalow lunch.' }
    ]
  }
];

export const MOCK_COUPONS = [
  { code: 'GOMO10', discountPercent: 10, maxDiscount: 200, minOrder: 0, description: '10% instant off on all ticket bookings' },
  { code: 'MOVIE20', discountPercent: 20, maxDiscount: 150, minOrder: 250, description: '20% off up to ₹150 for entertainment tickets' },
  { code: 'WELCOME50', flatDiscount: 50, minOrder: 200, description: 'Flat ₹50 welcome discount for GoMo users' },
  { code: 'YESBANK', flatDiscount: 100, minOrder: 400, description: 'Flat ₹100 off on orders above ₹400' }
];

// Helper functions for mock data querying
export function getMovieById(id) {
  return MOCK_MOVIES.find(m => m.id === id) || MOCK_MOVIES[0];
}

export function getEventById(id) {
  return MOCK_EVENTS.find(e => e.id === id) || null;
}

export function filterEvents({ category, city, query, maxPrice, sortBy }) {
  let list = [...MOCK_EVENTS];

  if (category && category !== 'all') {
    list = list.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  if (city && city !== 'all') {
    list = list.filter(e => !e.cityMatch || e.cityMatch.some(c => c.toLowerCase() === city.toLowerCase()));
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter(e => 
      e.title.toLowerCase().includes(q) ||
      e.artist.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );
  }

  if (maxPrice) {
    list = list.filter(e => e.price <= maxPrice);
  }

  if (sortBy === 'price_asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

// Wishlist LocalStorage Helpers
export function getTicketWishlist() {
  try {
    return JSON.parse(localStorage.getItem('tb_wishlist') || '[]');
  } catch {
    return [];
  }
}

export function toggleTicketWishlist(item) {
  const current = getTicketWishlist();
  const exists = current.some(i => i.id === item.id);
  let updated;
  if (exists) {
    updated = current.filter(i => i.id !== item.id);
  } else {
    updated = [...current, { id: item.id, title: item.title, poster: item.poster || item.cover_image, type: item.category ? 'event' : 'movie' }];
  }
  localStorage.setItem('tb_wishlist', JSON.stringify(updated));
  return !exists;
}

export function isTicketWishlisted(id) {
  const current = getTicketWishlist();
  return current.some(i => i.id === id);
}

// Bookings LocalStorage Helpers
export function getSavedBookings() {
  try {
    const local = JSON.parse(localStorage.getItem('tb_bookings') || '[]');
    if (local && local.length > 0) return local;
  } catch {}
  
  // Default realistic mock bookings so user never sees an empty screen
  return [
    {
      booking_id: 'GMD-BMS-849201',
      title: 'Street Fighter (2026)',
      theatre: 'KG Cinemas: 4K DOLBY ATMOS, Coimbatore',
      booking_date: '2026-10-18',
      booking_time: '01:20 PM',
      seats: ['A8', 'A9'],
      seat_tier: 'XLSLIDER (₹210.98)',
      total_amount: 497.91,
      status: 'Confirmed',
      qr_code: 'GMD-SF-2026-A8A9-KG',
      type: 'movie',
      poster: '/images/action_poster_1780401266913.png',
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      booking_id: 'GMD-BMS-302195',
      title: "Guns N' Roses - Bandland on Tour",
      theatre: 'Nice Grounds, Tumkur Road, Bengaluru',
      booking_date: '2026-11-14',
      booking_time: '06:30 PM',
      seats: ['2x VIP Lounge Pass'],
      seat_tier: 'VIP Lounge Pass',
      total_amount: 14780.00,
      status: 'Confirmed',
      qr_code: 'GMD-GNR-VIP-02-BLR',
      type: 'event',
      poster: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200',
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ];
}

export function saveBookingRecord(booking) {
  try {
    const current = getSavedBookings();
    const updated = [booking, ...current.filter(b => b.booking_id !== booking.booking_id)];
    localStorage.setItem('tb_bookings', JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save booking to local storage', err);
  }
}

export const MOCK_TRAINS = [
  {
    id: 'tr_20644',
    train_number: '20644',
    train_name: 'Coimbatore - Chennai Central Vande Bharat Express',
    type: 'Vande Bharat',
    from_city: 'Coimbatore',
    from_station: 'Coimbatore Jn (CBE)',
    from_time: '06:00 AM',
    to_city: 'Chennai',
    to_station: 'Mgr Chennai Central (MAS)',
    to_time: '11:50 AM',
    duration: '5h 50m',
    departure_days: ['Daily except Wed'],
    rating: 4.8,
    speed: '130 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 1025, status: 'AVAILABLE 84', statusType: 'avail' },
      { code: 'EC', name: 'Exec Chair Car', fare: 1980, status: 'AVAILABLE 16', statusType: 'avail' }
    ],
    amenities: ['Catering Included', 'On-board Wi-Fi', 'Bio Vacuum Toilets', 'High Speed Laser GPS'],
    pantry: 'Available (Veg & Non-Veg breakfast included)',
    stops: ['Tiruppur', 'Erode Jn', 'Salem Jn', 'Katpadi Jn']
  },
  {
    id: 'tr_12676',
    train_number: '12676',
    train_name: 'Kovai Superfast Express',
    type: 'Superfast',
    from_city: 'Coimbatore',
    from_station: 'Coimbatore Jn (CBE)',
    from_time: '03:15 PM',
    to_city: 'Chennai',
    to_station: 'Mgr Chennai Central (MAS)',
    to_time: '10:50 PM',
    duration: '7h 35m',
    departure_days: ['Daily'],
    rating: 4.5,
    speed: '110 km/h',
    classes: [
      { code: '2S', name: 'Second Seating', fare: 185, status: 'AVAILABLE 142', statusType: 'avail' },
      { code: 'CC', name: 'AC Chair Car', fare: 680, status: 'AVAILABLE 38', statusType: 'avail' }
    ],
    amenities: ['Pantry Car', 'Clean Toilets', 'Charging Sockets'],
    pantry: 'Pantry Car Available',
    stops: ['Tiruppur', 'Erode Jn', 'Salem Jn', 'Jolarpettai', 'Katpadi Jn', 'Arakkonam']
  },
  {
    id: 'tr_20641',
    train_number: '20641',
    train_name: 'Bengaluru - Coimbatore Vande Bharat Express',
    type: 'Vande Bharat',
    from_city: 'Bengaluru',
    from_station: 'KSR Bengaluru (SBC)',
    from_time: '01:40 PM',
    to_city: 'Coimbatore',
    to_station: 'Coimbatore Jn (CBE)',
    to_time: '08:00 PM',
    duration: '6h 20m',
    departure_days: ['Daily except Thu'],
    rating: 4.9,
    speed: '130 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 995, status: 'AVAILABLE 62', statusType: 'avail' },
      { code: 'EC', name: 'Exec Chair Car', fare: 1910, status: 'AVAILABLE 12', statusType: 'avail' }
    ],
    amenities: ['Gourmet Snacks', 'Panoramic Windows', 'Infotainment Display'],
    pantry: 'Evening Refreshments Included',
    stops: ['Hosur', 'Dharmapuri', 'Salem Jn', 'Erode Jn', 'Tiruppur']
  },
  {
    id: 'tr_12007',
    train_number: '12007',
    train_name: 'Chennai - Mysuru Shatabdi Express',
    type: 'Shatabdi',
    from_city: 'Chennai',
    from_station: 'Mgr Chennai Central (MAS)',
    from_time: '06:00 AM',
    to_city: 'Bengaluru',
    to_station: 'KSR Bengaluru (SBC)',
    to_time: '10:45 AM',
    duration: '4h 45m',
    departure_days: ['Daily except Wed'],
    rating: 4.7,
    speed: '120 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 875, status: 'AVAILABLE 48', statusType: 'avail' },
      { code: 'EC', name: 'Executive Anubhuti', fare: 1680, status: 'AVAILABLE 8', statusType: 'avail' }
    ],
    amenities: ['Welcome Drink', 'Hot Breakfast', 'Newspaper', 'Mineral Water'],
    pantry: 'Complimentary Dining Service',
    stops: ['Katpadi Jn', 'Bengaluru Cantt']
  },
  {
    id: 'tr_12952',
    train_number: '12952',
    train_name: 'New Delhi - Mumbai Central Tejas Rajdhani Express',
    type: 'Rajdhani',
    from_city: 'Delhi-NCR',
    from_station: 'New Delhi (NDLS)',
    from_time: '04:55 PM',
    to_city: 'Mumbai',
    to_station: 'Mumbai Central (MMCT)',
    to_time: '08:35 AM',
    duration: '15h 40m',
    departure_days: ['Daily'],
    rating: 4.9,
    speed: '140 km/h',
    classes: [
      { code: '3A', name: 'AC 3 Tier', fare: 2190, status: 'AVAILABLE 31', statusType: 'avail' },
      { code: '2A', name: 'AC 2 Tier', fare: 3180, status: 'RAC 6', statusType: 'rac' },
      { code: '1A', name: 'First AC', fare: 5290, status: 'AVAILABLE 4', statusType: 'avail' }
    ],
    amenities: ['Bedrolls & Linen', 'Multi-course Dinner', 'Morning Tea', 'Security CCTV'],
    pantry: 'All Meals Included in Ticket',
    stops: ['Kota Jn', 'Ratlam Jn', 'Vadodara Jn', 'Surat', 'Borivali']
  },
  {
    id: 'tr_12626',
    train_number: '12626',
    train_name: 'Kerala Superfast Express',
    type: 'Superfast',
    from_city: 'Delhi-NCR',
    from_station: 'New Delhi (NDLS)',
    from_time: '08:10 PM',
    to_city: 'Coimbatore',
    to_station: 'Coimbatore Jn (CBE)',
    to_time: '05:35 AM',
    duration: '33h 25m',
    departure_days: ['Daily'],
    rating: 4.4,
    speed: '110 km/h',
    classes: [
      { code: 'SL', name: 'Sleeper', fare: 840, status: 'WL 18', statusType: 'wl' },
      { code: '3A', name: 'AC 3 Tier', fare: 2210, status: 'AVAILABLE 19', statusType: 'avail' },
      { code: '2A', name: 'AC 2 Tier', fare: 3260, status: 'AVAILABLE 5', statusType: 'avail' }
    ],
    amenities: ['Pantry Car', 'Clean Linen on AC', 'Charging Ports'],
    pantry: 'Pantry Car On-board',
    stops: ['Mathura', 'Agra Cantt', 'Bhopal Jn', 'Nagpur', 'Vijayawada', 'Katpadi', 'Salem', 'Erode']
  }
];

export const MOCK_FLIGHTS = [
  {
    id: 'fl_6e243',
    flight_number: '6E 243',
    airline: 'IndiGo',
    airline_logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=120',
    aircraft: 'Airbus A321neo',
    from_city: 'Coimbatore',
    from_code: 'CJB',
    from_airport: 'Coimbatore International Airport',
    from_time: '08:15 AM',
    to_city: 'Chennai',
    to_code: 'MAA',
    to_airport: 'Chennai International Airport (T1)',
    to_time: '09:20 AM',
    duration: '1h 05m',
    stops: 'Non-stop',
    price: 3490,
    seats_left: 7,
    cabin_baggage: '7 Kg Cabin Baggage included',
    checkin_baggage: '15 Kg Check-in Baggage included',
    features: ['On-Time Star', 'GoMo Exclusive 10% Off with UPI', 'Instant PNR'],
    tags: ['FASTEST', 'CHEAPEST']
  },
  {
    id: 'fl_ai582',
    flight_number: 'AI 582',
    airline: 'Air India',
    airline_logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=120',
    aircraft: 'Boeing 737 MAX 8',
    from_city: 'Coimbatore',
    from_code: 'CJB',
    from_airport: 'Coimbatore International Airport',
    from_time: '10:45 AM',
    to_city: 'Bengaluru',
    to_code: 'BLR',
    to_airport: 'Kempegowda Int. Airport (T2)',
    to_time: '11:45 AM',
    duration: '1h 00m',
    stops: 'Non-stop',
    price: 3120,
    seats_left: 4,
    cabin_baggage: '7 Kg Cabin Baggage',
    checkin_baggage: '20 Kg Check-in Baggage included',
    features: ['Free In-flight Hot Snack', 'More Legroom', 'Terminal 2 Lounge Access eligible'],
    tags: ['FREE MEAL', 'TOP RATED']
  },
  {
    id: 'fl_6e891',
    flight_number: '6E 891',
    airline: 'IndiGo',
    airline_logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=120',
    aircraft: 'Airbus A320neo',
    from_city: 'Bengaluru',
    from_code: 'BLR',
    from_airport: 'Kempegowda Int. Airport (T1)',
    from_time: '06:00 AM',
    to_city: 'Delhi-NCR',
    to_code: 'DEL',
    to_airport: 'Indira Gandhi Int. Airport (T3)',
    to_time: '08:45 AM',
    duration: '2h 45m',
    stops: 'Non-stop',
    price: 5850,
    seats_left: 9,
    cabin_baggage: '7 Kg Cabin Baggage',
    checkin_baggage: '15 Kg Check-in Baggage',
    features: ['Morning Non-Stop', 'Direct Subway Metro Connectivity at T3'],
    tags: ['POPULAR']
  },
  {
    id: 'fl_uk835',
    flight_number: 'UK 835',
    airline: 'Vistara',
    airline_logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=120',
    aircraft: 'Airbus A321LR',
    from_city: 'Mumbai',
    from_code: 'BOM',
    from_airport: 'Chhatrapati Shivaji Maharaj Int. Airport (T2)',
    from_time: '07:30 AM',
    to_city: 'Delhi-NCR',
    to_code: 'DEL',
    to_airport: 'Indira Gandhi Int. Airport (T3)',
    to_time: '09:40 AM',
    duration: '2h 10m',
    stops: 'Non-stop',
    price: 6420,
    seats_left: 3,
    cabin_baggage: '7 Kg Cabin Baggage',
    checkin_baggage: '15 Kg Check-in Baggage',
    features: ['Signature Three-Course Meal', 'Complimentary Starbucks Brew', 'In-seat Power & USB'],
    tags: ['LUXURY FLYING', 'BEST EXPERIENCE']
  },
  {
    id: 'fl_qp1384',
    flight_number: 'QP 1384',
    airline: 'Akasa Air',
    airline_logo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=120',
    aircraft: 'Boeing 737 MAX 8-200',
    from_city: 'Coimbatore',
    from_code: 'CJB',
    from_airport: 'Coimbatore International Airport',
    from_time: '02:20 PM',
    to_city: 'Mumbai',
    to_code: 'BOM',
    to_airport: 'Chhatrapati Shivaji Maharaj Int. Airport (T1)',
    to_time: '04:10 PM',
    duration: '1h 50m',
    stops: 'Non-stop',
    price: 4299,
    seats_left: 5,
    cabin_baggage: '7 Kg Cabin Baggage',
    checkin_baggage: '15 Kg Check-in Baggage',
    features: ['Brand New Aircraft', 'Café Ake Experience', 'Zero Web Check-in Charges'],
    tags: ['GREAT VALUE']
  },
  {
    id: 'fl_ai440',
    flight_number: 'AI 440',
    airline: 'Air India',
    airline_logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=120',
    aircraft: 'Airbus A350-900',
    from_city: 'Chennai',
    from_code: 'MAA',
    from_airport: 'Chennai International Airport (T4)',
    from_time: '05:15 PM',
    to_city: 'Delhi-NCR',
    to_code: 'DEL',
    to_airport: 'Indira Gandhi Int. Airport (T3)',
    to_time: '08:05 PM',
    duration: '2h 50m',
    stops: 'Non-stop',
    price: 6190,
    seats_left: 6,
    cabin_baggage: '7 Kg Cabin Baggage',
    checkin_baggage: '20 Kg Check-in Baggage',
    features: ['Fly the Flagship A350 Widebody', 'HD Touchscreen Entertainment', 'Warm Dinner Service'],
    tags: ['WIDEBODY A350', 'PREMIUM']
  }
];
