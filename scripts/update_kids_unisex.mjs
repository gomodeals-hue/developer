import fs from 'fs';

const kidsUnisexImages = {
  // Boys
  'gmd-kids-boys-1': 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80',
  'gmd-kids-boys-2': 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80',
  'gmd-kids-boys-3': 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?w=800&q=80',
  'gmd-kids-boys-4': 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800&q=80',

  // Girls
  'gmd-kids-girls-1': 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
  'gmd-kids-girls-2': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
  'gmd-kids-girls-3': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80',
  'gmd-kids-girls-4': 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&q=80',

  // Baby
  'gmd-kids-baby-1': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
  'gmd-kids-baby-2': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  'gmd-kids-baby-3': 'https://images.unsplash.com/photo-1544126592-807ade215a0c?w=800&q=80',
  'gmd-kids-baby-4': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',

  // Unisex T-shirts
  'gmd-unisex-tshirts-1': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  'gmd-unisex-tshirts-2': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
  'gmd-unisex-tshirts-3': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
  'gmd-unisex-tshirts-4': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',

  // Unisex Co-ords
  'gmd-unisex-coords-1': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
  'gmd-unisex-coords-2': 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
  'gmd-unisex-coords-3': 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&q=80',
  'gmd-unisex-coords-4': 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',

  // Unisex Jackets
  'gmd-unisex-jackets-1': 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80',
  'gmd-unisex-jackets-2': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80',
  'gmd-unisex-jackets-3': 'https://images.unsplash.com/photo-1509764743898-ea2ce6c703b0?w=800&q=80',
  'gmd-unisex-jackets-4': 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'
};

import('./catalog/kids_and_unisex.mjs').then(m => {
  const items = m.KIDS_AND_UNISEX_PRODUCTS;
  items.forEach(it => {
    const newThumb = kidsUnisexImages[it.id];
    if (newThumb) {
      it.thumbnail = newThumb;
      it.pi_images = [{ image_url: newThumb.replace('w=800', 'w=1000') }];
    }
  });

  const outStr = 'export const KIDS_AND_UNISEX_PRODUCTS = ' + JSON.stringify(items, null, 2) + ';\n';
  fs.writeFileSync('./scripts/catalog/kids_and_unisex.mjs', outStr, 'utf8');
  console.log('Successfully updated kids_and_unisex.mjs with 24 distinct images!');
});
