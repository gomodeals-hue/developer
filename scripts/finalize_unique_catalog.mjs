import fs from 'fs';

// Specific resolutions for each duplicate pair:
const specificFixes = {
  // 1. Men casual shirt 2 (was woman photo photo-1596755094514-f87e34085b2c): give it authentic man denim shirt
  'gmd-men-shirts-2': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
  // 2. Men jacket 1 (was photo-1544441893-675973e31985): give it authentic man denim jacket
  'gmd-men-jackets-1': 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80',
  // 3. Men trackpants 3: give it unique men workout joggers
  'gmd-men-trackpants-3': 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
  // 4. Men wallet-belt combo
  'gmd-acc-wallets-men-4': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  
  // 5. Smartwatches
  'gmd-gadget-watch-2': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
  'gmd-gadget-watch-3': 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&q=80',

  // 6. Home decor & bedsheets
  'gmd-home-bedsheet-2': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80',
  'gmd-home-decor-1': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',

  // 7. Gifts
  'gmd-gift-set-2': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  'gmd-gift-festive-3': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',

  // 8. Men formal trousers 3
  'gmd-men-trousers-3': 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80',

  // 9. Women ethnic wear items that shared images with women western wear
  'gmd-eth-women-kurtas-3': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
  'gmd-eth-women-kurtas-4': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
  'gmd-eth-women-suits-2': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
  'gmd-eth-women-suits-3': 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80',
  'gmd-eth-women-suits-4': 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80',
  'gmd-eth-women-lehenga-3': 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80',
  'gmd-eth-women-gowns-3': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',

  // 10. Pooja items distinct photos
  'gmd-pooja-durga-2': 'https://images.unsplash.com/photo-1601056909848-18e00155b252?w=800&q=80',
  'gmd-pooja-durga-3': 'https://images.unsplash.com/photo-1601056909989-138676646549?w=800&q=80',
  'gmd-pooja-dec-diya-1': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
  'gmd-pooja-dec-diya-2': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80',
  'gmd-pooja-dec-diya-3': 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800&q=80',
  'gmd-pooja-dec-diya-4': 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80',
  'gmd-pooja-camphor-3': 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?w=800&q=80',
  'gmd-pooja-garland-3': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'gmd-pooja-aarti-4': 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&q=80',
  'gmd-pooja-havan-cup-4': 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
  'gmd-pooja-diwali-kit-4': 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=800&q=80',
  'gmd-pooja-diwali-kit-3': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&q=80',
  'gmd-pooja-camphor-1': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
  'gmd-pooja-rangoli-4': 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&q=80',
  'gmd-pooja-silver-diya-3': 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80',
  'gmd-pooja-sambrani-2': 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
  'gmd-pooja-durga-4': 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800&q=80',
  'gmd-pooja-navagraha-1': 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=800&q=80',
  'gmd-pooja-rangoli-1': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
  'gmd-pooja-navagraha-4': 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=800&q=80',
  'gmd-pooja-rangoli-2': 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&q=80',
  'gmd-pooja-navagraha-3': 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=800&q=80',
  'gmd-pooja-rangoli-3': 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&q=80',
  'gmd-pooja-navagraha-2': 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=800&q=80',
  'gmd-pooja-samagri-kit-2': 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&q=80',
  'gmd-pooja-satya-kit-3': 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&q=80',
  'gmd-pooja-samagri-kit-3': 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80',
  'gmd-pooja-storage-1': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
  'gmd-pooja-samagri-kit-4': 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&q=80',
  'gmd-pooja-satya-kit-1': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80'
};

async function applyFixes() {
  const catalogDir = './scripts/catalog';
  const files = fs.readdirSync(catalogDir).filter(f => f.endsWith('.mjs'));
  
  for (const f of files) {
    const filePath = './scripts/catalog/' + f;
    const mod = await import('./catalog/' + f);
    const varName = Object.keys(mod)[0];
    const items = mod[varName];
    let changed = false;

    items.forEach(it => {
      if (specificFixes[it.id]) {
        it.thumbnail = specificFixes[it.id];
        it.pi_images = [{ image_url: specificFixes[it.id].replace('w=800', 'w=1000') }];
        changed = true;
      }
    });

    if (changed) {
      const out = 'export const ' + varName + ' = ' + JSON.stringify(items, null, 2) + ';\n';
      fs.writeFileSync(filePath, out, 'utf8');
      console.log('Updated ' + f);
    }
  }
}

applyFixes();
