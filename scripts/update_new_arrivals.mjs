import fs from 'fs';
import path from 'path';

// Load sampleProducts
const sampleProductsPath = path.resolve('frontend/src/data/sampleProducts.js');
let sampleContent = fs.readFileSync(sampleProductsPath, 'utf8');

// Match array
const match = sampleContent.match(/export const SAMPLE_PRODUCTS = (\[[\s\S]*\]);/);
if (!match) {
  console.error("Could not find SAMPLE_PRODUCTS in file");
  process.exit(1);
}

let products = JSON.parse(match[1]);

// Criteria for new arrivals:
// 1. All beauty products
// 2. All pooja-items products
// 3. Newly added kids items (gmd-kd-*)
// 4. Highlighted clothing and footwear items
// 5. Selected cookware & home living items
let newCount = 0;
products = products.map((p, idx) => {
  const isBeauty = p.category === 'beauty' || p.department === 'beauty';
  const isPooja = p.category === 'pooja-items' || p.department === 'pooja-items';
  const isKidsNew = (p.id && p.id.startsWith('gmd-kd-'));
  const isCookwareOrDinner = (p.subcategory === 'cookware-utensils' || p.subcategory === 'dinner-sets' || p.subcategory === 'water-bottles');
  const isFashionHero = (p.id && ['gmd-mn-sh-001', 'gmd-mn-ts-001', 'gmd-wn-cd-001', 'gmd-wn-kt-001', 'gmd-wn-sr-001', 'gmd-mn-sn-001'].includes(p.id));

  if (isBeauty || isPooja || isKidsNew || isCookwareOrDinner || isFashionHero) {
    newCount++;
    return {
      ...p,
      is_new: true,
      deal_type: p.deal_type || 'new_arrival'
    };
  } else {
    return {
      ...p,
      is_new: false
    };
  }
});

console.log(`Marked ${newCount} products as is_new: true out of ${products.length} total products.`);

// Write back to frontend/src/data/sampleProducts.js
const updatedSampleContent = `// GoMo Deals - Product Catalog (Manually Curated)
export const SAMPLE_PRODUCTS = ${JSON.stringify(products, null, 2)};
`;
fs.writeFileSync(sampleProductsPath, updatedSampleContent, 'utf8');
console.log("Updated frontend/src/data/sampleProducts.js");

// Write back to backend/data/products.json
const backendPath = path.resolve('backend/data/products.json');
if (fs.existsSync(backendPath)) {
  fs.writeFileSync(backendPath, JSON.stringify(products, null, 2), 'utf8');
  console.log("Updated backend/data/products.json");
}
