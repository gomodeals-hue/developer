import fs from 'fs';

const ethnicImages = {
  // Men Kurtas
  'gmd-eth-men-kurtas-1': 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
  'gmd-eth-men-kurtas-2': 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=800&q=80',
  'gmd-eth-men-kurtas-3': 'https://images.unsplash.com/photo-1621335829175-95f437344321?w=800&q=80',
  'gmd-eth-men-kurtas-4': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',

  // Men Nehru Jackets
  'gmd-eth-men-jackets-1': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
  'gmd-eth-men-jackets-2': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
  'gmd-eth-men-jackets-3': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
  'gmd-eth-men-jackets-4': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',

  // Men Sherwani Sets
  'gmd-eth-men-sherwani-1': 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80',
  'gmd-eth-men-sherwani-2': 'https://images.unsplash.com/photo-1590076241940-02a8b29e64e5?w=800&q=80',
  'gmd-eth-men-sherwani-3': 'https://images.unsplash.com/photo-1610030469668-932d0b674488?w=800&q=80',
  'gmd-eth-men-sherwani-4': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',

  // Women Sarees
  'gmd-eth-women-sarees-1': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
  'gmd-eth-women-sarees-2': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
  'gmd-eth-women-sarees-3': 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80',
  'gmd-eth-women-sarees-4': 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80',

  // Women Kurtas
  'gmd-eth-women-kurtas-1': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
  'gmd-eth-women-kurtas-2': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
  'gmd-eth-women-kurtas-3': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  'gmd-eth-women-kurtas-4': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',

  // Women Kurta Suit Sets
  'gmd-eth-women-suits-1': 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&q=80',
  'gmd-eth-women-suits-2': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
  'gmd-eth-women-suits-3': 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
  'gmd-eth-women-suits-4': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',

  // Women Lehengas
  'gmd-eth-women-lehenga-1': 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80',
  'gmd-eth-women-lehenga-2': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
  'gmd-eth-women-lehenga-3': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
  'gmd-eth-women-lehenga-4': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80',

  // Women Ethnic Gowns
  'gmd-eth-women-gowns-1': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
  'gmd-eth-women-gowns-2': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
  'gmd-eth-women-gowns-3': 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80',
  'gmd-eth-women-gowns-4': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'
};

import('./catalog/ethnic_wear.mjs').then(m => {
  const items = m.ETHNIC_WEAR_PRODUCTS;
  items.forEach(it => {
    const newThumb = ethnicImages[it.id];
    if (newThumb) {
      it.thumbnail = newThumb;
      it.pi_images = [{ image_url: newThumb.replace('w=800', 'w=1000') }];
    }
  });

  const outStr = 'export const ETHNIC_WEAR_PRODUCTS = ' + JSON.stringify(items, null, 2) + ';\n';
  fs.writeFileSync('./scripts/catalog/ethnic_wear.mjs', outStr, 'utf8');
  console.log('Successfully updated ethnic_wear.mjs with 32 distinct images!');
});
