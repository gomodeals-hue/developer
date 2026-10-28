import fs from 'fs';

// 1. Women Clothing: 24 pristine female photos
const womenClothingImages = {
  // Dresses
  'gmd-women-dresses-1': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  'gmd-women-dresses-2': 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
  'gmd-women-dresses-3': 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
  'gmd-women-dresses-4': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',

  // Tops
  'gmd-women-tops-1': 'https://images.unsplash.com/photo-1564257631407-4deb129965a2?w=800&q=80',
  'gmd-women-tops-2': 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80',
  'gmd-women-tops-3': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
  'gmd-women-tops-4': 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80',

  // Jeans & Jeggings
  'gmd-women-jeans-1': 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80',
  'gmd-women-jeans-2': 'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80',
  'gmd-women-jeans-3': 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80',
  'gmd-women-jeans-4': 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80',

  // Co-ords
  'gmd-women-coords-1': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
  'gmd-women-coords-2': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
  'gmd-women-coords-3': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  'gmd-women-coords-4': 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80',

  // Jackets
  'gmd-women-jackets-1': 'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80',
  'gmd-women-jackets-2': 'https://images.unsplash.com/photo-1525450824786-227cbef70703?w=800&q=80',
  'gmd-women-jackets-3': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
  'gmd-women-jackets-4': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',

  // Trousers
  'gmd-women-trousers-1': 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=800&q=80',
  'gmd-women-trousers-2': 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80',
  'gmd-women-trousers-3': 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80',
  'gmd-women-trousers-4': 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80'
};

import('./catalog/women_clothing.mjs').then(m => {
  const items = m.WOMEN_CLOTHING_PRODUCTS;
  items.forEach(it => {
    if (womenClothingImages[it.id]) {
      it.thumbnail = womenClothingImages[it.id];
      it.pi_images = [{ image_url: womenClothingImages[it.id].replace('w=800', 'w=1000') }];
    }
  });
  fs.writeFileSync('./scripts/catalog/women_clothing.mjs', 'export const WOMEN_CLOTHING_PRODUCTS = ' + JSON.stringify(items, null, 2) + ';\n', 'utf8');
  console.log('Updated women_clothing.mjs with 24 distinct female photos');
});

// 2. Fix men trackpants 2
import('./catalog/men_clothing.mjs').then(m => {
  const items = m.MEN_CLOTHING_PRODUCTS;
  const p2 = items.find(x => x.id === 'gmd-men-trackpants-2');
  if (p2) {
    p2.thumbnail = 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80';
    p2.pi_images = [{ image_url: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1000&q=80' }];
  }
  fs.writeFileSync('./scripts/catalog/men_clothing.mjs', 'export const MEN_CLOTHING_PRODUCTS = ' + JSON.stringify(items, null, 2) + ';\n', 'utf8');
  console.log('Updated men_clothing.mjs trackpants 2');
});

// 3. Fix unisex clothing items that had overlap
const unisexUpdates = {
  'gmd-unisex-tshirts-1': 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80',
  'gmd-unisex-tshirts-2': 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
  'gmd-unisex-tshirts-3': 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
  'gmd-unisex-coords-1': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',
  'gmd-unisex-jackets-2': 'https://images.unsplash.com/photo-1559582798-678dfc71ccd8?w=800&q=80'
};

import('./catalog/kids_and_unisex.mjs').then(m => {
  const items = m.KIDS_AND_UNISEX_PRODUCTS;
  items.forEach(it => {
    if (unisexUpdates[it.id]) {
      it.thumbnail = unisexUpdates[it.id];
      it.pi_images = [{ image_url: unisexUpdates[it.id].replace('w=800', 'w=1000') }];
    }
  });
  fs.writeFileSync('./scripts/catalog/kids_and_unisex.mjs', 'export const KIDS_AND_UNISEX_PRODUCTS = ' + JSON.stringify(items, null, 2) + ';\n', 'utf8');
  console.log('Updated kids_and_unisex.mjs');
});

// 4. Fix pooja items that shared images with home decor / dinner / kids
const poojaOverlapFixesPart1 = {
  'gmd-pooja-bowl-2': 'https://images.unsplash.com/photo-1544717305-996b815c338c?w=800&q=80',
  'gmd-pooja-bowl-4': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
  'gmd-pooja-aarti-4': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  'gmd-pooja-camphor-1': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&q=80'
};

import('./catalog/pooja_items_part1.mjs').then(m => {
  const items = m.POOJA_ITEMS_PART1;
  items.forEach(it => {
    if (poojaOverlapFixesPart1[it.id]) {
      it.thumbnail = poojaOverlapFixesPart1[it.id];
      it.pi_images = [{ image_url: poojaOverlapFixesPart1[it.id].replace('w=800', 'w=1000') }];
    }
  });
  fs.writeFileSync('./scripts/catalog/pooja_items_part1.mjs', 'export const POOJA_ITEMS_PART1 = ' + JSON.stringify(items, null, 2) + ';\n', 'utf8');
  console.log('Updated pooja_items_part1.mjs');
});

const poojaOverlapFixesPart2 = {
  'gmd-pooja-garland-1': 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&q=80',
  'gmd-pooja-garland-2': 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&q=80',
  'gmd-pooja-garland-3': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
  'gmd-pooja-garland-4': 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
  'gmd-pooja-dec-diya-1': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
  'gmd-pooja-dec-diya-4': 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
  'gmd-pooja-rangoli-1': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
  'gmd-pooja-rangoli-2': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
  'gmd-pooja-rangoli-3': 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=800&q=80',
  'gmd-pooja-durga-4': 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=800&q=80',
  'gmd-pooja-storage-1': 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80',
  'gmd-pooja-satya-kit-1': 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&q=80',
  'gmd-pooja-satya-kit-3': 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&q=80'
};

import('./catalog/pooja_items_part2.mjs').then(m => {
  const items = m.POOJA_ITEMS_PART2;
  items.forEach(it => {
    if (poojaOverlapFixesPart2[it.id]) {
      it.thumbnail = poojaOverlapFixesPart2[it.id];
      it.pi_images = [{ image_url: poojaOverlapFixesPart2[it.id].replace('w=800', 'w=1000') }];
    }
  });
  fs.writeFileSync('./scripts/catalog/pooja_items_part2.mjs', 'export const POOJA_ITEMS_PART2 = ' + JSON.stringify(items, null, 2) + ';\n', 'utf8');
  console.log('Updated pooja_items_part2.mjs');
});
