import fs from 'fs';

// 1. Fix men jacket 3 in men_clothing.mjs
import('./catalog/men_clothing.mjs').then(m => {
  const menClothes = m.MEN_CLOTHING_PRODUCTS;
  const j3 = menClothes.find(x => x.id === 'gmd-men-jackets-3');
  if (j3) {
    j3.thumbnail = 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80';
    j3.pi_images = [{ image_url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1000&q=80' }];
  }
  fs.writeFileSync('./scripts/catalog/men_clothing.mjs', 'export const MEN_CLOTHING_PRODUCTS = ' + JSON.stringify(menClothes, null, 2) + ';\n', 'utf8');
  console.log('Fixed men jackets 3 thumbnail');
});

// 2. Fix beauty gender in accessories_and_beauty.mjs
import('./catalog/accessories_and_beauty.mjs').then(m => {
  const items = m.ACCESSORIES_AND_BEAUTY_PRODUCTS;
  items.forEach(it => {
    if (it.category === 'beauty' && it.gender === 'men') {
      it.gender = 'unisex';
      it.section = 'beauty';
    }
  });
  fs.writeFileSync('./scripts/catalog/accessories_and_beauty.mjs', 'export const ACCESSORIES_AND_BEAUTY_PRODUCTS = ' + JSON.stringify(items, null, 2) + ';\n', 'utf8');
  console.log('Fixed beauty items gender to unisex');
});

// 3. Fix pooja part 2 distinct photos (24 fresh photo IDs that do not exist anywhere else)
const freshPoojaPart2Photos = {
  'gmd-pooja-shiva-2': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
  'gmd-pooja-rangoli-4': 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80',
  'gmd-pooja-samagri-kit-1': 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80',
  'gmd-pooja-samagri-kit-2': 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&q=80',
  'gmd-pooja-samagri-kit-3': 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80',
  'gmd-pooja-samagri-kit-4': 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&q=80',
  'gmd-pooja-navagraha-1': 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=800&q=80',
  'gmd-pooja-navagraha-2': 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=800&q=80',
  'gmd-pooja-navagraha-3': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
  'gmd-pooja-navagraha-4': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
  'gmd-pooja-diwali-kit-1': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'gmd-pooja-diwali-kit-2': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
  'gmd-pooja-diwali-kit-3': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&q=80',
  'gmd-pooja-diwali-kit-4': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  'gmd-pooja-ganesh-kit-1': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
  'gmd-pooja-ganesh-kit-2': 'https://images.unsplash.com/photo-1563245738-9276d3f27807?w=800&q=80',
  'gmd-pooja-ganesh-kit-3': 'https://images.unsplash.com/photo-1563245372-972f07d396ee?w=800&q=80',
  'gmd-pooja-ganesh-kit-4': 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
  'gmd-pooja-satya-kit-1': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
  'gmd-pooja-satya-kit-2': 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80',
  'gmd-pooja-satya-kit-3': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
  'gmd-pooja-satya-kit-4': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80',
  'gmd-pooja-storage-1': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
  'gmd-pooja-storage-2': 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=800&q=80',
  'gmd-pooja-storage-3': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80'
};

import('./catalog/pooja_items_part2.mjs').then(m => {
  const p2 = m.POOJA_ITEMS_PART2;
  p2.forEach(it => {
    if (freshPoojaPart2Photos[it.id]) {
      it.thumbnail = freshPoojaPart2Photos[it.id];
      it.pi_images = [{ image_url: freshPoojaPart2Photos[it.id].replace('w=800', 'w=1000') }];
    }
  });
  fs.writeFileSync('./scripts/catalog/pooja_items_part2.mjs', 'export const POOJA_ITEMS_PART2 = ' + JSON.stringify(p2, null, 2) + ';\n', 'utf8');
  console.log('Fixed pooja part 2 fresh thumbnails');
});
