import fs from 'fs';
import path from 'path';

// Known popular Unsplash photos for each specific men fashion item
const candidates = {
  // Shirts
  white_formal_shirt: [
    'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?w=800&q=80',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80'
  ],
  denim_casual_shirt: [
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
  ],
  checked_casual_shirt: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80'
  ],
  linen_casual_shirt: [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80'
  ],

  // T-Shirts
  white_crewneck_tshirt: [
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80'
  ],
  athletic_dri_fit_tshirt: [
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
  ],

  // Jeans
  mens_slim_jeans: [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80',
    'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80',
    'https://images.unsplash.com/photo-1511105612320-2e62a04dd044?w=800&q=80'
  ],
  mens_straight_jeans: [
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80',
    'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80'
  ],
  mens_dark_indigo_jeans: [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'
  ],

  // Trousers
  khaki_chinos: [
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'
  ],
  formal_charcoal_trousers: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80',
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80'
  ],
  formal_navy_trousers: [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'
  ],

  // Trackpants
  mens_athletic_joggers_1: [
    'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80',
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    'https://images.unsplash.com/photo-1483721074574-8556f2f28ea3?w=800&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80'
  ],

  // Jackets
  denim_trucker_jacket: [
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80',
    'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80'
  ],
  navy_suit_blazer: [
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'
  ],
  bomber_jacket: [
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
    'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80'
  ]
};

async function testAll() {
  const testDir = './scratch/candidate_tests';
  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

  for (const [key, urls] of Object.entries(candidates)) {
    console.log(`\n--- Testing ${key} ---`);
    for (let i = 0; i < urls.length; i++) {
      const u = urls[i];
      try {
        const res = await fetch(u);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          const fn = path.join(testDir, `${key}_${i+1}.jpg`);
          fs.writeFileSync(fn, buf);
          console.log(`  [OK] ${key}_${i+1}: ${buf.length} bytes (${u.split('?')[0]})`);
        } else {
          console.log(`  [404] ${u}`);
        }
      } catch (err) {
        console.log(`  [ERR] ${u}: ${err.message}`);
      }
    }
  }
}

testAll();
