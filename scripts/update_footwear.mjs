import fs from 'fs';

const filePath = './scripts/catalog/footwear.mjs';

const footwearImages = {
  // Men sneakers
  'gmd-men-footwear-snk-1': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'gmd-men-footwear-snk-2': 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80',
  'gmd-men-footwear-snk-3': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
  'gmd-men-footwear-snk-4': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',

  // Men casual shoes
  'gmd-men-footwear-cas-1': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
  'gmd-men-footwear-cas-2': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
  'gmd-men-footwear-cas-3': 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80',
  'gmd-men-footwear-cas-4': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',

  // Men formal shoes
  'gmd-men-footwear-form-1': 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
  'gmd-men-footwear-form-2': 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800&q=80',
  'gmd-men-footwear-form-3': 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
  'gmd-men-footwear-form-4': 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',

  // Men sandals
  'gmd-men-footwear-san-1': 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80',
  'gmd-men-footwear-san-2': 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
  'gmd-men-footwear-san-3': 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80',
  'gmd-men-footwear-san-4': 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&q=80',

  // Women sandals / heels
  'gmd-women-footwear-san-1': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
  'gmd-women-footwear-san-2': 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&q=80',
  'gmd-women-footwear-san-3': 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&q=80',
  'gmd-women-footwear-san-4': 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',

  // Women sneakers
  'gmd-women-footwear-snk-1': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  'gmd-women-footwear-snk-2': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
  'gmd-women-footwear-snk-3': 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80',
  'gmd-women-footwear-snk-4': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',

  // Women boots
  'gmd-women-footwear-boot-1': 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80',
  'gmd-women-footwear-boot-2': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
  'gmd-women-footwear-boot-3': 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
  'gmd-women-footwear-boot-4': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',

  // Kids sneakers
  'gmd-kids-footwear-snk-1': 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
  'gmd-kids-footwear-snk-2': 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80',
  'gmd-kids-footwear-snk-3': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
  'gmd-kids-footwear-snk-4': 'https://images.unsplash.com/photo-1507464098880-e3d0bc6a2a0c?w=800&q=80',

  // Kids sandals
  'gmd-kids-footwear-san-1': 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80',
  'gmd-kids-footwear-san-2': 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80',
  'gmd-kids-footwear-san-3': 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80',
  'gmd-kids-footwear-san-4': 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&q=80'
};

import('./catalog/footwear.mjs').then(m => {
  const items = m.FOOTWEAR_PRODUCTS;
  items.forEach(item => {
    const newThumb = footwearImages[item.id];
    if (newThumb) {
      item.thumbnail = newThumb;
      const bigThumb = newThumb.replace('w=800', 'w=1000');
      item.pi_images = [{ image_url: bigThumb }];
    }
  });

  const outStr = 'export const FOOTWEAR_PRODUCTS = ' + JSON.stringify(items, null, 2) + ';\n';
  fs.writeFileSync(filePath, outStr, 'utf8');
  console.log('Successfully updated footwear.mjs with 36 distinct images!');
});
