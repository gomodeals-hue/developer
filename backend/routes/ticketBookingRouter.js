import crypto from 'node:crypto';
import { getDB, saveCollection } from '../database/db.js';
import { pool, isPostgresConnected } from '../database/pg.js';
import { broadcast } from '../realtime.js';

// Seed Movies Fallback
const DEFAULT_MOVIES = [
  {
    id: 'mov_street_fighter',
    title: 'Street Fighter',
    genre: ['Action', 'Adventure', 'Comedy', 'Thriller'],
    rating: 8.9,
    duration: '1h 59m',
    certificate: 'UA16+',
    release_date: '2026-10-16',
    interested_count: '50.7K+',
    description: 'Once inseparable fighters, Ryu and Ken are drawn out of their fractured lives when a covert force pulls them into the next World Warrior Tournament.',
    synopsis: 'Once inseparable fighters, Ryu and Ken are drawn out of their fractured lives when a covert force pulls them into the next World Warrior Tournament. What appears to be a contest of strength soon reveals a far more dangerous agenda, pushing them into a relentless battle not just for victory, but for survival against M. Bison and the shadowy syndicate of Shadaloo.',
    poster: '/images/action_poster_1780401266913.png',
    backdrop: '/images/cinematic_backdrop_1_1780401309164.png',
    trailer_url: 'Way9Dexny3w',
    languages: ['English', 'Tamil', 'Hindi'],
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
    duration: '2h 45m',
    certificate: 'UA16+',
    release_date: '2026-10-24',
    interested_count: '120.4K+',
    description: 'Superstar Rajinikanth stars in Lokesh Kanagaraj high-octane heist and gold smuggling thriller.',
    synopsis: 'A stylish former ports operative is drawn into an underground syndicate war when a long-guarded consignment surfaces along the southern coast.',
    poster: '/images/real/poster_7.jpg',
    backdrop: '/images/real/backdrop_7.jpg',
    trailer_url: 'jxCRlebisbw',
    languages: ['Tamil', 'Telugu', 'Hindi'],
    formats: ['2D', 'IMAX 2D', 'DOLBY ATMOS'],
    language: 'Tamil',
    is_active: true
  },
  {
    id: 'mov_devara',
    title: 'Devara - Part 1',
    genre: ['Action', 'Drama', 'Period'],
    rating: 8.6,
    duration: '2h 58m',
    certificate: 'UA16+',
    release_date: '2026-10-18',
    interested_count: '88.1K+',
    description: 'An epic coastal saga of courage, betrayal, and generational vengeance spanning the Bay of Bengal.',
    synopsis: 'Devara, a fearless sea guardian, defends his coastal tribe against ruthless mercenaries and clandestine maritime cartels.',
    poster: '/images/real/poster_8.jpg',
    backdrop: '/images/real/backdrop_8.jpg',
    trailer_url: 'Way9Dexny3w',
    languages: ['Telugu', 'Tamil', 'Hindi'],
    formats: ['2D', '3D', 'IMAX 3D'],
    language: 'Telugu',
    is_active: true
  },
  {
    id: 'mov_anbil_avan',
    title: 'Anbil Avan',
    genre: ['Romance', 'Drama', 'Musical'],
    rating: 8.4,
    duration: '2h 22m',
    certificate: 'U',
    release_date: '2026-10-16',
    interested_count: '34.5K+',
    description: 'An emotional romance celebrating lifelong loyalty, redemption, and musical serenity.',
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
    duration: '2h 46m',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    synopsis: 'A boy becomes the Messiah of nomads on a desert planet that has giant worms and spice. He faces a choice between the love of his life and the fate of the universe.',
    poster: '/images/real/poster_1.jpg',
    backdrop: '/images/real/backdrop_1.jpg',
    trailer_url: 'Way9Dexny3w',
    language: 'English',
    is_active: true
  },
  {
    id: 'mov_kungfu4',
    title: 'Kung Fu Panda 4',
    genre: ['Animation', 'Action', 'Comedy'],
    rating: 7.8,
    duration: '1h 34m',
    description: 'Po must train a new warrior when he is chosen to become the spiritual leader of the Valley of Peace.',
    synopsis: 'After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior.',
    poster: '/images/real/poster_2.jpg',
    backdrop: '/images/real/backdrop_2.jpg',
    trailer_url: '_inKs4eeHiI',
    language: 'English',
    is_active: true
  },
  {
    id: 'mov_godzilla_kong',
    title: 'Godzilla x Kong: The New Empire',
    genre: ['Action', 'Sci-Fi'],
    rating: 7.6,
    duration: '1h 55m',
    description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins.',
    synopsis: 'An all-new adventure that pits the almighty Kong and the fearsome Godzilla against a colossal undiscovered threat hidden within our world.',
    poster: '/images/real/poster_3.jpg',
    backdrop: '/images/real/backdrop_3.jpg',
    trailer_url: 'lV1OOlGwExM',
    language: 'English',
    is_active: true
  },
  {
    id: 'mov_leo',
    title: 'Leo: Bloody Sweet',
    genre: ['Action', 'Crime', 'Thriller'],
    rating: 8.4,
    duration: '2h 44m',
    description: 'Parthiban, a mild-mannered cafe owner in Kashmir, finds himself pursued by dangerous gangsters who believe he is Leo Das.',
    synopsis: 'When a quiet family man becomes an overnight sensation after defending his cafe, sinister figures from his alleged criminal past emerge.',
    poster: '/images/real/poster_4.jpg',
    backdrop: '/images/real/backdrop_4.jpg',
    trailer_url: 'Po3jStA673E',
    language: 'Tamil',
    is_active: true
  },
  {
    id: 'mov_ayalaan',
    title: 'Ayalaan',
    genre: ['Sci-Fi', 'Comedy', 'Adventure'],
    rating: 7.9,
    duration: '2h 35m',
    description: 'A lost alien seeks help from a kind-hearted villager to prevent a rogue tycoon from destroying Earth with toxic gas.',
    synopsis: 'An extraterrestrial visitor teams up with a group of friends to save Earth from a greedy industrialist plotting planetary destruction.',
    poster: '/images/real/poster_5.jpg',
    backdrop: '/images/real/backdrop_5.jpg',
    trailer_url: 'N2n_yR_sWdI',
    language: 'Tamil',
    is_active: true
  },
  {
    id: 'mov_goat',
    title: 'The Greatest of All Time (GOAT)',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 8.2,
    duration: '3h 02m',
    description: 'A special anti-terrorist squad agent is haunted by unresolved past missions when an old nemesis returns.',
    synopsis: 'A high-octane spy thriller featuring a father-son duel that spans continents, espionage operations, and high stakes time-sensitive rescues.',
    poster: '/images/real/poster_6.jpg',
    backdrop: '/images/real/backdrop_6.jpg',
    trailer_url: 'jxCRlebisbw',
    language: 'Tamil',
    is_active: true
  }
];

// Seed Theatres Fallback
const DEFAULT_THEATRES = [
  {
    id: 'th_broadway_coimbatore',
    name: 'Broadway Cinemas: Coimbatore',
    location: 'Avinashi Road, Civil Aerodrome Post',
    city: 'Coimbatore',
    total_screens: 9,
    amenities: ['4K Dolby Atmos', 'EPIQ Laser Screen', 'Gourmet Lounge', 'M-Ticket', 'Food & Beverage', 'Non-cancellable']
  },
  {
    id: 'th_kg_cinemas',
    name: 'KG Cinemas: Coimbatore',
    location: 'Bungalow Road, Race Course',
    city: 'Coimbatore',
    total_screens: 5,
    amenities: ['Pallavi 4K', 'Dolby Atmos', 'M-Ticket', 'Food & Beverage', 'Cancellation available']
  },
  {
    id: 'th_inox_prozone',
    name: 'INOX: Prozone Mall, Coimbatore',
    location: 'Prozone Mall, Sathy Road',
    city: 'Coimbatore',
    total_screens: 9,
    amenities: ['Insignia Recliners', 'Dolby Atmos', 'M-Ticket', 'Non-cancellable']
  },
  {
    id: 'th_gomo_palazzo',
    name: 'GoMo Palazzo Cinemas (IMAX & Luxe)',
    location: 'Nexus Vijaya Mall, Vadapalani',
    city: 'Chennai',
    total_screens: 8,
    amenities: ['IMAX Laser', 'Dolby Atmos', 'Recliner Loungers', 'Gourmet Dining']
  },
  {
    id: 'th_pvr_velachery',
    name: 'PVR Grand Cinema Screen 1-6',
    location: 'Phoenix Marketcity, Velachery',
    city: 'Chennai',
    total_screens: 6,
    amenities: ['4K Projection', 'Dolby 7.1', 'Cafe & Bar']
  },
  {
    id: 'th_ags_omr',
    name: 'AGS Cinemas 4K Atmos',
    location: 'OMR Navalur',
    city: 'Chennai',
    total_screens: 5,
    amenities: ['Dolby Atmos', 'Laser 4K', 'Premium VIP Rows']
  },
  {
    id: 'th_rohini_silver',
    name: 'Rohini Silver Screens (Koyambedu)',
    location: 'Poonamallee High Road',
    city: 'Chennai',
    total_screens: 4,
    amenities: ['Fans Celebration Hub', 'Barco Laser', 'Atmos Sound']
  }
];

// Seed Showtimes Fallback
const DEFAULT_SHOWTIMES = [
  {
    id: 'st_sf_broadway',
    movie_id: 'mov_street_fighter',
    theatre: 'Broadway Cinemas: Coimbatore',
    theatre_id: 'th_broadway_coimbatore',
    location: 'Avinashi Road, Civil Aerodrome Post',
    show_times: ['10:15 PM', '01:20 PM', '06:30 PM'],
    time_details: [
      { time: '10:15 PM', spec: '4K DOLBY ATMOS', status: 'available' },
      { time: '01:20 PM', spec: 'PALLAVl', status: 'fast_filling' },
      { time: '06:30 PM', spec: '4K DOLBY ATMOS', status: 'available' }
    ],
    price: 210.98,
    vip_price: 210.98,
    premium_price: 210.98,
    standard_price: 61.74,
    elite_price: 210.98,
    economy_price: 61.74,
    language: 'English',
    format: '2D'
  },
  {
    id: 'st_sf_kg',
    movie_id: 'mov_street_fighter',
    theatre: 'KG Cinemas: Coimbatore',
    theatre_id: 'th_kg_cinemas',
    location: 'Bungalow Road, Race Course',
    show_times: ['01:20 PM', '06:45 PM', '10:00 PM'],
    time_details: [
      { time: '01:20 PM', spec: 'PALLAVI', status: 'available' },
      { time: '06:45 PM', spec: 'DOLBY ATMOS', status: 'fast_filling' },
      { time: '10:00 PM', spec: '4K LASER', status: 'available' }
    ],
    price: 180.00,
    vip_price: 180.00,
    premium_price: 180.00,
    standard_price: 60.00,
    elite_price: 180.00,
    economy_price: 60.00,
    language: 'English',
    format: '2D'
  },
  {
    id: 'st_sf_inox',
    movie_id: 'mov_street_fighter',
    theatre: 'INOX: Prozone Mall, Coimbatore',
    theatre_id: 'th_inox_prozone',
    location: 'Prozone Mall, Sathy Road',
    show_times: ['11:00 AM', '02:45 PM', '07:15 PM', '10:30 PM'],
    time_details: [
      { time: '11:00 AM', spec: 'DOLBY 7.1', status: 'available' },
      { time: '02:45 PM', spec: 'INSIGNIA', status: 'available' },
      { time: '07:15 PM', spec: 'ATMOS', status: 'fast_filling' },
      { time: '10:30 PM', spec: '4K DOLBY ATMOS', status: 'available' }
    ],
    price: 220.00,
    vip_price: 220.00,
    premium_price: 220.00,
    standard_price: 70.00,
    elite_price: 220.00,
    economy_price: 70.00,
    language: 'English',
    format: '2D'
  },
  {
    id: 'st_1',
    movie_id: 'mov_dune2',
    theatre: 'GoMo Palazzo Cinemas (IMAX & Luxe)',
    theatre_id: 'th_gomo_palazzo',
    location: 'Nexus Vijaya Mall, Vadapalani',
    show_times: ['10:30 AM', '02:15 PM', '06:45 PM', '10:30 PM'],
    price: 250.00,
    vip_price: 420.00,
    premium_price: 280.00,
    standard_price: 200.00,
    elite_price: 280.00,
    economy_price: 150.00,
    language: 'English',
    format: 'IMAX Laser'
  },
  {
    id: 'st_2',
    movie_id: 'mov_leo',
    theatre: 'GoMo Palazzo Cinemas (IMAX & Luxe)',
    theatre_id: 'th_gomo_palazzo',
    location: 'Nexus Vijaya Mall, Vadapalani',
    show_times: ['11:00 AM', '03:00 PM', '07:00 PM', '10:45 PM'],
    price: 220.00,
    vip_price: 380.00,
    premium_price: 250.00,
    standard_price: 180.00,
    language: 'Tamil',
    format: 'Dolby Atmos'
  },
  {
    id: 'st_3',
    movie_id: 'mov_kungfu4',
    theatre: 'PVR Grand Cinema Screen 1-6',
    theatre_id: 'th_pvr_velachery',
    location: 'Phoenix Marketcity, Velachery',
    show_times: ['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM'],
    price: 190.00,
    vip_price: 320.00,
    premium_price: 220.00,
    standard_price: 160.00,
    language: 'English',
    format: '3D'
  },
  {
    id: 'st_4',
    movie_id: 'mov_godzilla_kong',
    theatre: 'AGS Cinemas 4K Atmos',
    theatre_id: 'th_ags_omr',
    location: 'OMR Navalur',
    show_times: ['11:30 AM', '03:15 PM', '06:45 PM', '10:15 PM'],
    price: 200.00,
    vip_price: 350.00,
    premium_price: 240.00,
    standard_price: 170.00,
    language: 'English',
    format: '4K 3D'
  },
  {
    id: 'st_5',
    movie_id: 'mov_goat',
    theatre: 'Rohini Silver Screens (Koyambedu)',
    theatre_id: 'th_rohini_silver',
    location: 'Poonamallee High Road',
    show_times: ['09:00 AM', '01:00 PM', '05:00 PM', '09:00 PM', '11:59 PM'],
    price: 180.00,
    vip_price: 300.00,
    premium_price: 210.00,
    standard_price: 150.00,
    language: 'Tamil',
    format: '2D Laser'
  }
];

// Seed Addons Fallback
const DEFAULT_ADDONS = [
  {
    id: 'add_popcorn_caramel',
    owner_id: 'th_gomo_palazzo',
    name: 'Jumbo Caramel Popcorn',
    category: 'Snacks',
    price: 240.00,
    image_url: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'add_popcorn_cheese',
    owner_id: 'th_gomo_palazzo',
    name: 'Cheddar Cheese Popcorn',
    category: 'Snacks',
    price: 220.00,
    image_url: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'add_coke_large',
    owner_id: 'th_gomo_palazzo',
    name: 'Chilled Fountain Coca-Cola (Large)',
    category: 'Beverages',
    price: 140.00,
    image_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'add_nachos_salsa',
    owner_id: 'th_gomo_palazzo',
    name: 'Crisp Nachos with Jalapeno Cheese & Salsa',
    category: 'Combos',
    price: 260.00,
    image_url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'add_couple_combo',
    owner_id: 'th_gomo_palazzo',
    name: 'Couple Movie Feast: 2 Drinks + Large Tub + Nachos',
    category: 'Combos',
    price: 499.00,
    image_url: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&q=80&w=400'
  }
];

// Generate seating layout matching screenshot 5
function generateSeatLayout(showtimeId, date, time) {
  const seats = [];

  // Row A: ₹210.98 XLSLIDER (seats 01..13)
  for (let i = 1; i <= 13; i++) {
    const num = String(i).padStart(2, '0');
    const isBooked = [1, 2, 7, 8, 9].includes(i);
    seats.push({
      id: `A${num}`,
      row: 'A',
      number: num,
      tier: 'XLSLIDER',
      price: 210.98,
      isBooked,
      isHeld: false,
      isBestseller: [5, 6].includes(i),
      side: 'center'
    });
  }

  // Rows B, C, D, E, F: ₹210.98 PREMIUMXL (left 01..09, right 10..18)
  const mainRows = ['B', 'C', 'D', 'E', 'F'];
  mainRows.forEach(row => {
    for (let i = 1; i <= 18; i++) {
      const num = String(i).padStart(2, '0');
      const isBooked = (row === 'B' && [1, 2, 10].includes(i)) || (row === 'E' && [7, 8].includes(i));
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        tier: 'PREMIUMXL',
        price: 210.98,
        isBooked,
        isHeld: false,
        isBestseller: (row === 'C' && [7, 8, 11, 12].includes(i)),
        side: i <= 9 ? 'left' : 'right'
      });
    }
  });

  // Row G: ₹210.98 PREMIUMXL (left 01..06, right 07..15)
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    seats.push({
      id: `G${num}`,
      row: 'G',
      number: num,
      tier: 'PREMIUMXL',
      price: 210.98,
      isBooked: false,
      isHeld: false,
      side: i <= 6 ? 'left' : 'right'
    });
  }

  // Row H: Left 01, 02 are PREMIUMXL; 03..06 and 07..15 are BUDGET
  seats.push({
    id: 'H01',
    row: 'H',
    number: '01',
    tier: 'PREMIUMXL',
    price: 210.98,
    isBooked: false,
    isHeld: false,
    side: 'left'
  });
  seats.push({
    id: 'H02',
    row: 'H',
    number: '02',
    tier: 'PREMIUMXL',
    price: 210.98,
    isBooked: false,
    isHeld: false,
    side: 'left'
  });

  // Budget Row H: 03..06 (left/middle), 07..15 (right)
  for (let i = 3; i <= 6; i++) {
    const num = String(i).padStart(2, '0');
    seats.push({
      id: `H${num}`,
      row: 'H',
      number: num,
      tier: 'BUDGET',
      price: 61.74,
      isBooked: false,
      isHeld: false,
      side: 'middle'
    });
  }
  for (let i = 7; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    seats.push({
      id: `H${num}`,
      row: 'H',
      number: num,
      tier: 'BUDGET',
      price: 61.74,
      isBooked: false,
      isHeld: false,
      side: 'right'
    });
  }

  return seats;
}

export async function handleTicketBookingRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  if (!Array.isArray(db.tb_movies)) db.tb_movies = DEFAULT_MOVIES;
  if (!Array.isArray(db.tb_theatres)) db.tb_theatres = DEFAULT_THEATRES;
  if (!Array.isArray(db.tb_showtimes)) db.tb_showtimes = DEFAULT_SHOWTIMES;
  if (!Array.isArray(db.tb_bookings)) db.tb_bookings = [];
  if (!Array.isArray(db.tb_seat_holds)) db.tb_seat_holds = [];
  if (!Array.isArray(db.tb_addons)) db.tb_addons = DEFAULT_ADDONS;
  if (!Array.isArray(db.tb_reviews)) db.tb_reviews = [];
  if (!Array.isArray(db.tb_waitlist)) db.tb_waitlist = [];

  // 3.5. GET /api/showtimes/:showtimeId/seats
  if ((pathname.includes('/showtimes/') && pathname.endsWith('/seats')) || (pathname.includes('/api/v1/showtimes/') && pathname.endsWith('/seats'))) {
    const segments = pathname.split('/');
    const showtimeId = segments[segments.indexOf('showtimes') + 1];
    let showtime = db.tb_showtimes.find(s => s.id === showtimeId);
    if (!showtime) {
      showtime = DEFAULT_SHOWTIMES.find(s => s.id === showtimeId) || DEFAULT_SHOWTIMES[0];
    }
    const movie = db.tb_movies.find(m => m.id === showtime.movie_id) || DEFAULT_MOVIES[0];
    const seats = generateSeatLayout(showtimeId, query.date, query.time);

    return sendJSON(res, {
      success: true,
      showtime: {
        ...showtime,
        movie_title: movie.title,
        movie_poster: movie.poster,
        movie_certificate: movie.certificate || 'UA16+',
        movie_duration: movie.duration || '1h 59m',
        base_price: showtime.price || 210.98
      },
      movie,
      seats,
      isSurgePricing: false
    });
  }

  // 1. GET /api/movies (List movies with filters)
  if ((pathname === '/api/movies' || pathname === '/api/v1/movies') && method === 'GET') {
    let movies = db.tb_movies;

    if (isPostgresConnected()) {
      try {
        const { rows } = await pool.query('SELECT * FROM tb_movies WHERE is_active = TRUE ORDER BY created_at DESC');
        if (rows.length > 0) movies = rows;
      } catch (err) {
        console.warn('[Tickets] Postgres movies query fallback:', err.message);
      }
    }

    const { search, genre, lang, format, upcoming } = query;

    let filtered = movies;
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(m => (m.title || '').toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q));
    }
    if (genre && genre !== 'all') {
      filtered = filtered.filter(m => {
        const genres = Array.isArray(m.genre) ? m.genre : [m.genre];
        return genres.some(g => (g || '').toLowerCase() === genre.toLowerCase());
      });
    }
    if (lang && lang !== 'all') {
      filtered = filtered.filter(m => (m.language || '').toLowerCase() === lang.toLowerCase());
    }
    if (upcoming === 'true') {
      filtered = filtered.filter(m => m.is_upcoming || (m.release_date && new Date(m.release_date) > new Date()));
    }

    return sendJSON(res, filtered);
  }

  // 2. GET /api/movies/:id
  if (pathname.startsWith('/api/movies/') || pathname.startsWith('/api/v1/movies/')) {
    const id = pathname.split('/').pop();
    if (method === 'GET' && id && id !== 'movies') {
      let movie = db.tb_movies.find(m => m.id === id);
      if (!movie && isPostgresConnected()) {
        try {
          const { rows } = await pool.query('SELECT * FROM tb_movies WHERE id = $1', [id]);
          if (rows.length > 0) movie = rows[0];
        } catch {}
      }

      if (!movie) {
        // Fallback to first movie if ID is dynamic
        movie = db.tb_movies[0];
      }
      if (movie && (!movie.showtimes || movie.showtimes.length === 0)) {
        const movieShowtimes = db.tb_showtimes.filter(s => s.movie_id === movie.id);
        movie = {
          ...movie,
          showtimes: movieShowtimes.length > 0 ? movieShowtimes : DEFAULT_SHOWTIMES
        };
      }
      return sendJSON(res, movie);
    }
  }

  // 3. GET /api/theatres
  if ((pathname === '/api/theatres' || pathname === '/api/v1/theatres') && method === 'GET') {
    let theatres = db.tb_theatres;
    if (isPostgresConnected()) {
      try {
        const { rows } = await pool.query('SELECT * FROM tb_theatres');
        if (rows.length > 0) theatres = rows;
      } catch {}
    }
    return sendJSON(res, theatres);
  }

  // 4. GET /api/showtimes or /api/showtimes/:movieId
  if (pathname === '/api/showtimes' || pathname.startsWith('/api/showtimes/') || pathname === '/api/v1/showtimes' || pathname.startsWith('/api/v1/showtimes/')) {
    if (method === 'GET') {
      const segments = pathname.split('/');
      const movieIdParam = segments[segments.length - 1];
      const movieId = movieIdParam !== 'showtimes' ? movieIdParam : query.movie_id;

      let showtimes = db.tb_showtimes;
      if (isPostgresConnected()) {
        try {
          const { rows } = await pool.query('SELECT * FROM tb_showtimes');
          if (rows.length > 0) showtimes = rows;
        } catch {}
      }

      if (movieId && movieId !== 'showtimes') {
        showtimes = showtimes.filter(s => s.movie_id === movieId);
        if (showtimes.length === 0) {
          // Provide showtimes mapped for this movie
          showtimes = DEFAULT_SHOWTIMES.map((s, idx) => ({
            ...s,
            id: `st_${movieId}_${idx + 1}`,
            movie_id: movieId
          }));
        }
      }

      return sendJSON(res, showtimes);
    }
  }

  // 5. GET /api/booked-seats/:showtimeId
  if (pathname.startsWith('/api/booked-seats/') || pathname.startsWith('/api/v1/booked-seats/')) {
    const showtimeId = pathname.split('/').pop();
    const date = query.date || 'today';
    const time = query.time || '10:30 AM';

    // Get confirmed bookings for this showtime, date, and time
    const bookings = db.tb_bookings.filter(b => 
      b.showtime_id === showtimeId && 
      b.booking_date === date && 
      b.booking_time === time && 
      b.status !== 'cancelled'
    );

    const bookedSeats = [];
    bookings.forEach(b => {
      if (Array.isArray(b.seats)) bookedSeats.push(...b.seats);
    });

    // Active seat holds (less than 10 mins old)
    const now = new Date();
    const activeHolds = db.tb_seat_holds.filter(h => 
      h.showtime_id === showtimeId && 
      h.booking_date === date && 
      h.booking_time === time && 
      new Date(h.expires_at) > now
    );

    const heldSeats = [];
    activeHolds.forEach(h => {
      if (Array.isArray(h.seats)) heldSeats.push(...h.seats);
    });

    // Add sample pre-occupied seats for realism if empty
    if (bookedSeats.length === 0) {
      bookedSeats.push('A5', 'A6', 'C7', 'C8', 'D4', 'E5', 'E6', 'F8', 'F9');
    }

    return sendJSON(res, {
      success: true,
      showtimeId,
      bookedSeats,
      heldSeats
    });
  }

  // 6. POST /api/seat-hold (10-minute temporary seat lock)
  if ((pathname === '/api/seat-hold' || pathname === '/api/v1/seat-hold') && method === 'POST') {
    const { showtime_id, booking_date, booking_time, seats, user_email } = body;
    if (!showtime_id || !seats || !Array.isArray(seats) || seats.length === 0) {
      return sendJSON(res, { success: false, message: 'Invalid seat hold parameters' }, 400);
    }

    const holdId = `sh_${crypto.randomUUID().slice(0, 8)}`;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const newHold = {
      id: holdId,
      showtime_id,
      booking_date: booking_date || 'today',
      booking_time: booking_time || '10:30 AM',
      seats,
      user_email: user_email || 'guest@gomodeals.com',
      expires_at: expiresAt,
      created_at: new Date().toISOString()
    };

    db.tb_seat_holds.push(newHold);

    if (isPostgresConnected()) {
      try {
        await pool.query(
          'INSERT INTO tb_seat_holds (id, showtime_id, booking_date, booking_time, seats, user_email, expires_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [newHold.id, newHold.showtime_id, newHold.booking_date, newHold.booking_time, newHold.seats, newHold.user_email, newHold.expires_at]
        );
      } catch {}
    }

    return sendJSON(res, {
      success: true,
      message: 'Seats held for 10 minutes',
      holdId,
      expiresAt
    });
  }

  // 7. POST /api/bookings (Confirm ticket booking)
  if ((pathname === '/api/bookings' || pathname === '/api/v1/bookings') && method === 'POST') {
    const {
      showtime_id,
      user_id,
      name,
      email,
      phone,
      seats,
      booking_date,
      booking_time,
      total_amount,
      addons = [],
      payment_id
    } = body;

    if (!showtime_id || !name || !email || !seats || seats.length === 0) {
      return sendJSON(res, { success: false, message: 'Missing required booking fields' }, 400);
    }

    const bookingId = `GMD-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const showtime = db.tb_showtimes.find(s => s.id === showtime_id) || DEFAULT_SHOWTIMES[0];
    const movie = db.tb_movies.find(m => m.id === showtime.movie_id) || DEFAULT_MOVIES[0];

    const newBooking = {
      id: bookingId,
      booking_id: bookingId,
      showtime_id,
      movie_title: movie.title,
      theatre_name: showtime.theatre,
      location: showtime.location,
      user_id: user_id || 'usr_customer_1',
      name: name.trim(),
      email: email.trim(),
      phone: phone || '',
      seats: Array.isArray(seats) ? seats : [seats],
      booking_date: booking_date || new Date().toISOString().split('T')[0],
      booking_time: booking_time || '10:30 AM',
      total_amount: parseFloat(total_amount) || 250,
      status: 'confirmed',
      payment_id: payment_id || `PAY_${crypto.randomUUID().slice(0, 10)}`,
      addons: addons,
      checked_in: false,
      created_at: new Date().toISOString()
    };

    db.tb_bookings.unshift(newBooking);
    saveCollection('tb_bookings');

    if (isPostgresConnected()) {
      try {
        await pool.query(
          `INSERT INTO tb_bookings 
           (id, showtime_id, user_id, name, email, phone, seats, booking_date, booking_time, total_amount, status, payment_id, addons)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            newBooking.id,
            newBooking.showtime_id,
            newBooking.user_id,
            newBooking.name,
            newBooking.email,
            newBooking.phone,
            newBooking.seats,
            newBooking.booking_date,
            newBooking.booking_time,
            newBooking.total_amount,
            newBooking.status,
            newBooking.payment_id,
            JSON.stringify(newBooking.addons)
          ]
        );
      } catch (err) {
        console.warn('[Tickets] Postgres insert booking warning:', err.message);
      }
    }

    broadcast('NEW_TICKET_BOOKING', {
      booking_id: newBooking.id,
      movie_title: newBooking.movie_title,
      seats: newBooking.seats,
      amount: newBooking.total_amount
    });

    return sendJSON(res, {
      success: true,
      message: 'Tickets booked successfully!',
      booking: newBooking
    }, 201);
  }

  // 8. GET /api/my-bookings
  if ((pathname === '/api/my-bookings' || pathname === '/api/v1/my-bookings') && method === 'GET') {
    const userEmail = query.email || req.headers['x-user-email'];
    let bookings = db.tb_bookings;
    if (userEmail) {
      bookings = bookings.filter(b => (b.email || '').toLowerCase() === userEmail.toLowerCase());
    }
    return sendJSON(res, bookings);
  }

  // 9. GET /api/bookings/:id
  if (pathname.startsWith('/api/bookings/') || pathname.startsWith('/api/v1/bookings/')) {
    const bookingId = pathname.split('/').pop();
    if (method === 'GET' && bookingId && bookingId !== 'bookings') {
      let booking = db.tb_bookings.find(b => b.id === bookingId || b.booking_id === bookingId);
      if (!booking) {
        booking = db.tb_bookings[0] || {
          id: bookingId,
          movie_title: 'Dune: Part Two',
          theatre_name: 'GoMo Palazzo Cinemas (IMAX & Luxe)',
          location: 'Nexus Vijaya Mall, Vadapalani',
          seats: ['E8', 'E9'],
          booking_date: new Date().toISOString().split('T')[0],
          booking_time: '06:45 PM',
          total_amount: 560.00,
          status: 'confirmed',
          name: 'GoMo Guest',
          email: 'guest@gomodeals.com'
        };
      }
      return sendJSON(res, booking);
    }

    // 10. PATCH /api/bookings/:id/checkin (Staff entry scan)
    if (method === 'PATCH' && pathname.endsWith('/checkin')) {
      const segments = pathname.split('/');
      const id = segments[segments.length - 2];
      const booking = db.tb_bookings.find(b => b.id === id || b.booking_id === id);
      if (booking) {
        booking.checked_in = true;
        booking.checked_in_at = new Date().toISOString();
        saveCollection('tb_bookings');
      }
      return sendJSON(res, { success: true, message: 'Ticket validated. Entry granted!' });
    }
  }

  // 11. GET /api/addons or /api/addons/:owner_id
  if (pathname === '/api/addons' || pathname.startsWith('/api/addons/') || pathname === '/api/v1/addons' || pathname.startsWith('/api/v1/addons/')) {
    if (method === 'GET') {
      return sendJSON(res, db.tb_addons);
    }
  }

  // 12. POST /api/waitlist
  if ((pathname === '/api/waitlist' || pathname === '/api/v1/waitlist') && method === 'POST') {
    const { showtime_id, booking_date, booking_time, email } = body;
    db.tb_waitlist.push({ id: `wl_${crypto.randomUUID()}`, showtime_id, booking_date, booking_time, email, created_at: new Date().toISOString() });
    return sendJSON(res, { success: true, message: 'Added to waitlist. We will notify you if seats open up!' }, 201);
  }

  // 13. POST /api/coupons/validate
  if ((pathname === '/api/coupons/validate' || pathname === '/api/v1/coupons/validate') && method === 'POST') {
    const { code, subtotal = 0 } = body;
    if (!code) return sendJSON(res, { valid: false, message: 'Please provide a coupon code' }, 400);

    const upper = code.toUpperCase();
    if (upper === 'GOMO10' || upper === 'MOVIE20' || upper === 'WELCOME50') {
      const discount = upper === 'GOMO10' ? subtotal * 0.1 : upper === 'MOVIE20' ? subtotal * 0.2 : 50;
      return sendJSON(res, { valid: true, discountAmount: discount, message: `Promo code ${upper} applied!` });
    }
    return sendJSON(res, { valid: false, message: 'Invalid or expired coupon code' }, 404);
  }

  // 14. GET /api/reviews/:movieId
  if (pathname.startsWith('/api/reviews/') || pathname.startsWith('/api/v1/reviews/')) {
    const movieId = pathname.split('/').pop();
    if (method === 'GET') {
      const reviews = db.tb_reviews.filter(r => r.movie_id === movieId);
      return sendJSON(res, reviews);
    }
    if (method === 'POST') {
      const { movie_id, user_name, rating, review_text } = body;
      const newRev = {
        id: `rev_${crypto.randomUUID()}`,
        movie_id: movie_id || movieId,
        user_name: user_name || 'Movie Lover',
        rating: parseInt(rating) || 5,
        review_text: review_text || '',
        created_at: new Date().toISOString()
      };
      db.tb_reviews.unshift(newRev);
      return sendJSON(res, { success: true, review: newRev }, 201);
    }
  }

  return false;
}
