import pg from 'pg';
import dotenv from 'dotenv';
import { initPostgresSchema } from './pg.js';

dotenv.config();

const { Client } = pg;

const pgConfig = {
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  password: process.env.PGPASSWORD || 'postgres',
  port: parseInt(process.env.PGPORT || '5432', 10),
};

const DB_NAME = process.env.PGDATABASE || 'gomodeals';

async function runSetup() {
  console.log(`\n======================================================`);
  console.log(`  GoMo Deals - PostgreSQL Database Setup & Migration`);
  console.log(`======================================================\n`);
  console.log(`Target Host: ${pgConfig.host}:${pgConfig.port}`);
  console.log(`Target User: ${pgConfig.user}`);
  console.log(`Target Database: ${DB_NAME}\n`);

  // Step 1: Connect to default postgres database to ensure gomodeals database exists
  let adminClient = null;
  try {
    adminClient = new Client({
      ...pgConfig,
      database: 'postgres',
    });
    await adminClient.connect();
    console.log('[1/4] Connected to default PostgreSQL maintenance database.');

    const checkDb = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (checkDb.rows.length === 0) {
      console.log(`[2/4] Database "${DB_NAME}" does not exist. Creating now...`);
      await adminClient.query(`CREATE DATABASE "${DB_NAME}" WITH OWNER = "${pgConfig.user}" ENCODING = 'UTF8';`);
      console.log(`[2/4] Database "${DB_NAME}" created successfully!`);
    } else {
      console.log(`[2/4] Database "${DB_NAME}" already exists.`);
    }
    await adminClient.end();
  } catch (err) {
    if (adminClient) {
      try { await adminClient.end(); } catch {}
    }
    console.warn(`[Note] Could not connect to default 'postgres' database: ${err.message}`);
    console.log(`Proceeding directly to connect to "${DB_NAME}" in case it already exists...`);
  }

  // Step 2: Run schema synchronization on target database
  try {
    console.log(`[3/4] Initializing tables and constraints on "${DB_NAME}"...`);
    await initPostgresSchema();
    console.log(`[3/4] Schema initialized.`);

    // Step 3: Seed initial datasets
    console.log(`[4/4] Seeding initial sample data for Flea Market & Tickets...`);
    await seedInitialData();

    console.log(`\n? POSTGRESQL DATABASE SETUP COMPLETE!`);
    console.log(`All Flea Market and Ticket Booking tables are ready in database "${DB_NAME}".\n`);
    process.exit(0);
  } catch (err) {
    console.error(`\n? Database setup encountered an error:`, err.message);
    console.error(`Please verify your PostgreSQL password in "backend/.env".\n`);
    process.exit(1);
  }
}

async function seedInitialData() {
  const targetClient = new Client({
    ...pgConfig,
    database: DB_NAME,
  });
  await targetClient.connect();

  try {
    // 1. Seed Flea Market Commodities
    const fleaCount = await targetClient.query('SELECT COUNT(*) FROM flea_market_products');
    if (parseInt(fleaCount.rows[0].count, 10) === 0) {
      console.log('  -> Seeding export-grade commodities for Flea Market...');
      await targetClient.query(`
        INSERT INTO flea_market_products 
        (name, category, origin, grade, moisture_percentage, price_per_kg, min_order_kg, available_stock_kg, thumbnail, description)
        VALUES
        ('Malabar Black Pepper (Garbled Tellicherry)', 'spices', 'Wayanad, Kerala', 'TGSEB Extra Bold', 9.2, 780.00, 100, 2500, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800', 'World-renowned Tellicherry Garbled Special Extra Bold black pepper, handpicked from high-altitude estates of Wayanad. Certified export grade with high piperine content.'),
        ('Alleppey Green Cardamom (8mm Bold)', 'spices', 'Idukki, Kerala', 'AGEB (Alleppey Green Extra Bold)', 8.0, 2850.00, 25, 600, 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800', 'Deep green aromatic pods, minimum 8mm size. Natural sun-cured with high volatile oil preservation. Direct from Spices Board registered planters.'),
        ('Salem Pure Turmeric Fingers', 'spices', 'Salem, Tamil Nadu', 'Double Polished Grade 1', 7.5, 185.00, 500, 8000, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800', 'Rich yellow turmeric with verified 4.8% curcumin content. Naturally dried and machine-sorted for zero impurities.'),
        ('Coorg Arabica Plantation-A Green Coffee Beans', 'coffee', 'Coorg, Karnataka', 'Plantation AAA', 10.5, 480.00, 200, 5000, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800', 'Shade-grown, washed Arabica green coffee from organic estates. High altitude harvesting yields distinct citrus notes and floral aroma.'),
        ('Assam Orthodox Golden Flowery Orange Pekoe (GFOP)', 'tea', 'Assam Valley', 'Tippy Golden Pekoe', 6.8, 620.00, 150, 3200, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800', 'Premium second-flush orthodox tea leaves loaded with golden tips. Strong malt character and rich amber liquor.'),
        ('Mangalore Whole Cashew Kernels W-240', 'dry_fruits', 'Mangalore, Karnataka', 'Export Grade W-240', 4.5, 890.00, 50, 1800, 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800', 'Crisp, whole white cashew nuts graded at 240 nuts per pound. Vacuum packed in nitrogen-flushed tins for global shipping.');
      `);
    }

    // 2. Seed Theatres
    const theatreCount = await targetClient.query('SELECT COUNT(*) FROM tb_theatres');
    if (parseInt(theatreCount.rows[0].count, 10) === 0) {
      console.log('  -> Seeding premier theatres for Ticket Booking...');
      await targetClient.query(`
        INSERT INTO tb_theatres (id, name, location, city, total_screens, amenities)
        VALUES
        ('th_gomo_palazzo', 'GoMo Palazzo Cinemas (IMAX & Luxe)', 'Nexus Vijaya Mall, Vadapalani', 'Chennai', 8, ARRAY['IMAX Laser', 'Dolby Atmos', 'Recliner Loungers', 'Gourmet Dining']),
        ('th_pvr_velachery', 'PVR Grand Cinema Screen 1-6', 'Phoenix Marketcity, Velachery', 'Chennai', 6, ARRAY['4K Projection', 'Dolby 7.1', 'Cafe & Bar']),
        ('th_ags_omr', 'AGS Cinemas 4K Atmos', 'OMR Navalur', 'Chennai', 5, ARRAY['Dolby Atmos', 'Laser 4K', 'Premium VIP Rows']),
        ('th_rohini_silver', 'Rohini Silver Screens (Koyambedu)', 'Poonamallee High Road', 'Chennai', 4, ARRAY['Fans Celebration Hub', 'Barco Laser', 'Atmos Sound']);
      `);
    }

    // 3. Seed Movies
    const movieCount = await targetClient.query('SELECT COUNT(*) FROM tb_movies');
    if (parseInt(movieCount.rows[0].count, 10) === 0) {
      console.log('  -> Seeding movies catalog for Ticket Booking...');
      await targetClient.query(`
        INSERT INTO tb_movies (id, title, genre, rating, duration, description, synopsis, poster, backdrop, trailer_url, language)
        VALUES
        ('mov_dune2', 'Dune: Part Two', ARRAY['Action', 'Sci-Fi', 'Adventure'], 8.8, '2h 46m', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 'A boy becomes the Messiah of nomads on a desert planet that has giant worms and spice. He faces a choice between the love of his life and the fate of the universe.', '/images/real/poster_1.jpg', '/images/real/backdrop_1.jpg', 'Way9Dexny3w', 'English'),
        ('mov_kungfu4', 'Kung Fu Panda 4', ARRAY['Animation', 'Action', 'Comedy'], 7.8, '1h 34m', 'Po must train a new warrior when he is chosen to become the spiritual leader of the Valley of Peace.', 'After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior.', '/images/real/poster_2.jpg', '/images/real/backdrop_2.jpg', '_inKs4eeHiI', 'English'),
        ('mov_godzilla_kong', 'Godzilla x Kong: The New Empire', ARRAY['Action', 'Sci-Fi'], 7.6, '1h 55m', 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins.', 'An all-new adventure that pits the almighty Kong and the fearsome Godzilla against a colossal undiscovered threat hidden within our world.', '/images/real/poster_3.jpg', '/images/real/backdrop_3.jpg', 'lV1OOlGwExM', 'English'),
        ('mov_leo', 'Leo: Bloody Sweet', ARRAY['Action', 'Crime', 'Thriller'], 8.4, '2h 44m', 'Parthiban, a mild-mannered cafe owner in Kashmir, finds himself pursued by dangerous gangsters who believe he is Leo Das.', 'When a quiet family man becomes an overnight sensation after defending his cafe, sinister figures from his alleged criminal past emerge.', '/images/real/poster_4.jpg', '/images/real/backdrop_4.jpg', 'Po3jStA673E', 'Tamil'),
        ('mov_ayalaan', 'Ayalaan', ARRAY['Sci-Fi', 'Comedy', 'Adventure'], 7.9, '2h 35m', 'A lost alien seeks help from a kind-hearted villager to prevent a rogue tycoon from destroying Earth with toxic gas.', 'An extraterrestrial visitor teams up with a group of friends to save Earth from a greedy industrialist plotting planetary destruction.', '/images/real/poster_5.jpg', '/images/real/backdrop_5.jpg', 'N2n_yR_sWdI', 'Tamil'),
        ('mov_goat', 'The Greatest of All Time (GOAT)', ARRAY['Action', 'Sci-Fi', 'Thriller'], 8.2, '3h 02m', 'A special anti-terrorist squad agent is haunted by unresolved past missions when an old nemesis returns.', 'A high-octane spy thriller featuring a father-son duel that spans continents, espionage operations, and high stakes time-sensitive rescues.', '/images/real/poster_6.jpg', '/images/real/backdrop_6.jpg', 'jxCRlebisbw', 'Tamil');
      `);
    }

    // 4. Seed Showtimes
    const showtimeCount = await targetClient.query('SELECT COUNT(*) FROM tb_showtimes');
    if (parseInt(showtimeCount.rows[0].count, 10) === 0) {
      console.log('  -> Seeding showtimes for Ticket Booking...');
      await targetClient.query(`
        INSERT INTO tb_showtimes (id, movie_id, theatre, theatre_id, location, show_times, price, vip_price, premium_price, standard_price, language, format)
        VALUES
        ('st_1', 'mov_dune2', 'GoMo Palazzo Cinemas (IMAX & Luxe)', 'th_gomo_palazzo', 'Nexus Vijaya Mall, Vadapalani', ARRAY['10:30 AM', '02:15 PM', '06:45 PM', '10:30 PM'], 250.00, 420.00, 280.00, 200.00, 'English', 'IMAX Laser'),
        ('st_2', 'mov_leo', 'GoMo Palazzo Cinemas (IMAX & Luxe)', 'th_gomo_palazzo', 'Nexus Vijaya Mall, Vadapalani', ARRAY['11:00 AM', '03:00 PM', '07:00 PM', '10:45 PM'], 220.00, 380.00, 250.00, 180.00, 'Tamil', 'Dolby Atmos'),
        ('st_3', 'mov_kungfu4', 'PVR Grand Cinema Screen 1-6', 'th_pvr_velachery', 'Phoenix Marketcity, Velachery', ARRAY['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM'], 190.00, 320.00, 220.00, 160.00, 'English', '3D'),
        ('st_4', 'mov_godzilla_kong', 'AGS Cinemas 4K Atmos', 'th_ags_omr', 'OMR Navalur', ARRAY['11:30 AM', '03:15 PM', '06:45 PM', '10:15 PM'], 200.00, 350.00, 240.00, 170.00, 'English', '4K 3D'),
        ('st_5', 'mov_goat', 'Rohini Silver Screens (Koyambedu)', 'th_rohini_silver', 'Poonamallee High Road', ARRAY['09:00 AM', '01:00 PM', '05:00 PM', '09:00 PM', '11:59 PM'], 180.00, 300.00, 210.00, 150.00, 'Tamil', '2D Laser');
      `);
    }

    // 5. Seed Cinema Concession Add-ons
    const addonCount = await targetClient.query('SELECT COUNT(*) FROM tb_addons');
    if (parseInt(addonCount.rows[0].count, 10) === 0) {
      console.log('  -> Seeding cinema snacks & concession addons...');
      await targetClient.query(`
        INSERT INTO tb_addons (id, owner_id, name, category, price, image_url)
        VALUES
        ('add_popcorn_caramel', 'th_gomo_palazzo', 'Jumbo Caramel Popcorn', 'Snacks', 240.00, 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&q=80&w=400'),
        ('add_popcorn_cheese', 'th_gomo_palazzo', 'Cheddar Cheese Popcorn', 'Snacks', 220.00, 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&q=80&w=400'),
        ('add_coke_large', 'th_gomo_palazzo', 'Chilled Fountain Coca-Cola (Large)', 'Beverages', 140.00, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=400'),
        ('add_nachos_salsa', 'th_gomo_palazzo', 'Crisp Nachos with Jalapeno Cheese & Salsa', 'Combos', 260.00, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=400'),
        ('add_couple_combo', 'th_gomo_palazzo', 'Couple Movie Feast: 2 Drinks + Large Tub + Nachos', 'Combos', 499.00, 'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&q=80&w=400');
      `);
    }

  } catch (err) {
    console.warn('Warning during seeding:', err.message);
  } finally {
    await targetClient.end();
  }
}

runSetup();
