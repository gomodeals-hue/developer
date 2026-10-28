import fs from 'fs';

const pantryUpdates = {
  // 1. Organic Foods
  'gmd-food-organic-1': { thumb: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80' },
  'gmd-food-organic-2': { thumb: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
  'gmd-food-organic-3': { thumb: 'https://images.unsplash.com/photo-1517093707577-9a8435d03823?w=800&q=80' },
  'gmd-food-organic-4': { thumb: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80' },

  // 2. Healthy Snacks
  'gmd-food-snack-1': { thumb: 'https://images.unsplash.com/photo-1622484216733-4f9e614bc4bd?w=800&q=80' },
  'gmd-food-snack-2': { thumb: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&q=80' },
  'gmd-food-snack-3': { thumb: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
  'gmd-food-snack-4': { thumb: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=800&q=80' },

  // 3. Atta / Flour
  'gmd-food-atta-1': { thumb: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80' },
  'gmd-food-atta-2': { thumb: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80' },
  'gmd-food-atta-3': { thumb: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80' },
  'gmd-food-atta-4': { thumb: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80' },

  // 4. Pulses / Dals
  'gmd-food-dal-1': { thumb: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=800&q=80' },
  'gmd-food-dal-2': { thumb: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  'gmd-food-dal-3': { thumb: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
  'gmd-food-dal-4': { thumb: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80' },

  // 5. Dry Fruits
  'gmd-food-dryfruit-1': { thumb: 'https://images.unsplash.com/photo-1563205764-79ea509b5597?w=800&q=80' },
  'gmd-food-dryfruit-2': { thumb: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=800&q=80' },
  'gmd-food-dryfruit-3': { thumb: 'https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?w=800&q=80' },
  'gmd-food-dryfruit-4': { thumb: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80' },

  // 6. Olive Oil
  'gmd-food-oil-1': { thumb: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80' },
  'gmd-food-oil-2': { thumb: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  'gmd-food-oil-3': { thumb: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80' },
  'gmd-food-oil-4': { thumb: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&q=80' },

  // 7. Spiral Notebooks
  'gmd-stat-spiral-1': { thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80' },
  'gmd-stat-spiral-2': { thumb: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80' },
  'gmd-stat-spiral-3': { thumb: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80' },
  'gmd-stat-spiral-4': { thumb: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&q=80' },

  // 8. Planners
  'gmd-stat-planner-1': { thumb: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80' },
  'gmd-stat-planner-2': { thumb: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80' },
  'gmd-stat-planner-3': { thumb: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80' },
  'gmd-stat-planner-4': { thumb: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80' },

  // 9. Files & Folders
  'gmd-stat-file-1': { thumb: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80' },
  'gmd-stat-file-2': { thumb: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&q=80' },
  'gmd-stat-file-3': { thumb: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80' },
  'gmd-stat-file-4': { thumb: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80' },

  // 10. Staplers & Paper Punch
  'gmd-stat-stapler-1': { thumb: 'https://images.unsplash.com/photo-1585336261026-4186687499b9?w=800&q=80' },
  'gmd-stat-stapler-2': { thumb: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80' },
  'gmd-stat-stapler-3': { thumb: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80' },
  'gmd-stat-stapler-4': { thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },

  // 11. Journals
  'gmd-stat-journal-1': { thumb: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80' },
  'gmd-stat-journal-2': { thumb: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80' },
  'gmd-stat-journal-3': { thumb: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80' },
  'gmd-stat-journal-4': { thumb: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80' },

  // 12. Festive Gifts
  'gmd-gift-festive-1': { thumb: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80' },
  'gmd-gift-festive-2': { thumb: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80' },
  'gmd-gift-festive-3': { thumb: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80' },
  'gmd-gift-festive-4': { thumb: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&q=80' },

  // 13. Gift Sets
  'gmd-gift-set-1': {
    thumb: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&q=80',
    gender: 'unisex',
    section: 'gifts'
  },
  'gmd-gift-set-2': {
    thumb: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    gender: 'unisex',
    section: 'gifts'
  },
  'gmd-gift-set-3': {
    thumb: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800&q=80',
    gender: 'unisex',
    section: 'gifts'
  },
  'gmd-gift-set-4': {
    thumb: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80',
    gender: 'unisex',
    section: 'gifts'
  },

  // 14. Earrings
  'gmd-jewel-earring-1': { thumb: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80' },
  'gmd-jewel-earring-2': { thumb: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80' },
  'gmd-jewel-earring-3': { thumb: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80' },
  'gmd-jewel-earring-4': { thumb: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80' },

  // 15. Necklaces & Pendants
  'gmd-jewel-necklace-1': { thumb: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80' },
  'gmd-jewel-necklace-2': { thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80' },
  'gmd-jewel-necklace-3': { thumb: 'https://images.unsplash.com/photo-1611591475878-a51eb8c1569d?w=800&q=80' },
  'gmd-jewel-necklace-4': { thumb: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&q=80' },

  // 16. Rings
  'gmd-jewel-ring-1': { thumb: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80' },
  'gmd-jewel-ring-2': {
    thumb: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80',
    name: 'GIVA 925 Sterling Silver Minimalist Zircon Eternity Band Ring',
    title: 'GIVA 925 Sterling Silver Minimalist Zircon Eternity Band Ring'
  },
  'gmd-jewel-ring-3': {
    thumb: 'https://images.unsplash.com/photo-1600003014608-c2b740df0d65?w=800&q=80',
    name: 'Zaveri Pearls 22K Gold Plated Traditional Floral Statement Cocktail Ring',
    title: 'Zaveri Pearls 22K Gold Plated Traditional Floral Statement Cocktail Ring'
  },
  'gmd-jewel-ring-4': {
    thumb: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
    gender: 'unisex',
    section: 'jewellery'
  }
};

import('./catalog/pantry_stationery_gifts_jewellery.mjs').then(m => {
  const items = m.PANTRY_STATIONERY_GIFTS_JEWELLERY;
  items.forEach(it => {
    const upd = pantryUpdates[it.id];
    if (upd) {
      if (upd.thumb) {
        it.thumbnail = upd.thumb;
        it.pi_images = [{ image_url: upd.thumb.replace('w=800', 'w=1000') }];
      }
      if (upd.gender) it.gender = upd.gender;
      if (upd.section) it.section = upd.section;
      if (upd.name) {
        it.name = upd.name;
        it.title = upd.title;
      }
    }
  });

  const outStr = 'export const PANTRY_STATIONERY_GIFTS_JEWELLERY = ' + JSON.stringify(items, null, 2) + ';\n';
  fs.writeFileSync('./scripts/catalog/pantry_stationery_gifts_jewellery.mjs', outStr, 'utf8');
  console.log('Successfully updated pantry_stationery_gifts_jewellery.mjs with 64 distinct images!');
});
