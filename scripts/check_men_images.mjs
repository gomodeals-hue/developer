import fs from 'fs';

const products = JSON.parse(fs.readFileSync('./backend/data/products.json', 'utf8'));
const men = products.filter(x => (x.section === 'men' || x.gender === 'men'));
console.log('Men products count:', men.length);

const output = men.map((x, i) => {
  return `${i + 1}. [${x.product_id || x.id}] Subcat: ${x.subcategory}\n   Name: "${x.name}"\n   Image: ${x.thumbnail}`;
}).join('\n');

fs.writeFileSync('./scripts/men_products_list.txt', output);
console.log('Wrote men products list to scripts/men_products_list.txt');
