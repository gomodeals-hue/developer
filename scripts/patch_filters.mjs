import fs from 'fs';
import path from 'path';

// 1. Patch frontend/src/services/productService.js
const prodServicePath = './frontend/src/services/productService.js';
let prodServiceCode = fs.readFileSync(prodServicePath, 'utf8');

const oldAliasBlock = `const CATEGORY_ALIAS_GROUPS = {
  clothing: ['clothing', 'apparel', 'fashion', 'western-wear', 'ethnic-wear'],
  footwear: ['footwear', 'footwears', 'shoes'],
  gadgets: ['gadgets', 'electronics', 'electronic', 'audio'],
  electronics: ['gadgets', 'electronics', 'electronic', 'audio'],
  'home-living': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'home-kitchen': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'pooja-items': ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  pooja: ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  grocery: ['grocery', 'groceries', 'grocery-items', 'healthy-foods'],
  groceries: ['grocery', 'groceries', 'grocery-items', 'healthy-foods'],
  'healthy-foods': ['healthy-foods', 'healthy-food', 'grocery', 'groceries'],
  stationary: ['stationary', 'stationery', 'books'],
  stationery: ['stationary', 'stationery', 'books'],
  jewellery: ['jewellery', 'jewelry'],
  jewelry: ['jewellery', 'jewelry'],
  gifts: ['gifts', 'gift', 'gift-sets', 'hampers']
};`;

const newAliasBlock = `const CATEGORY_ALIAS_GROUPS = {
  clothing: ['clothing', 'apparel'],
  'western-wear': ['western-wear'],
  'ethnic-wear': ['ethnic-wear'],
  footwear: ['footwear', 'footwears', 'shoes'],
  accessories: ['accessories'],
  gadgets: ['gadgets', 'electronics', 'electronic', 'audio'],
  electronics: ['gadgets', 'electronics', 'electronic', 'audio'],
  'home-living': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'home-kitchen': ['home-living', 'home-kitchen', 'home', 'kitchen'],
  'pooja-items': ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  pooja: ['pooja-items', 'pooja', 'puja', 'pooja items', 'puja-items'],
  grocery: ['grocery', 'groceries', 'grocery-items'],
  groceries: ['grocery', 'groceries', 'grocery-items'],
  'healthy-foods': ['healthy-foods', 'healthy-food'],
  stationary: ['stationary', 'stationery', 'books'],
  stationery: ['stationary', 'stationery', 'books'],
  jewellery: ['jewellery', 'jewelry'],
  jewelry: ['jewellery', 'jewelry'],
  beauty: ['beauty', 'cosmetics', 'grooming', 'skincare'],
  kids: ['kids', 'baby'],
  gifts: ['gifts', 'gift', 'gift-sets', 'hampers']
};`;

if (prodServiceCode.includes(oldAliasBlock)) {
  prodServiceCode = prodServiceCode.replace(oldAliasBlock, newAliasBlock);
  console.log('Successfully patched CATEGORY_ALIAS_GROUPS in productService.js');
} else {
  // Normalize \r\n
  const normOld = oldAliasBlock.replace(/\r\n/g, '\n');
  const normFile = prodServiceCode.replace(/\r\n/g, '\n');
  if (normFile.includes(normOld)) {
    const patchedNorm = normFile.replace(normOld, newAliasBlock.replace(/\r\n/g, '\n'));
    prodServiceCode = patchedNorm.replace(/\n/g, '\r\n');
    console.log('Successfully patched CATEGORY_ALIAS_GROUPS in productService.js (normalized CRLF)');
  } else {
    console.warn('Could not find oldAliasBlock in productService.js');
  }
}

// Also patch cleanCat in productService.js
const oldCleanCat = `  if (cleanCat === 'men' || cleanCat === 'mens') {
    const isFashion = ['clothing', 'western-wear', 'ethnic-wear', 'footwear', 'accessories'].includes(pCat);
    return isFashion && (pSec === 'men' || pGender === 'men' || pDept === 'men') && pGender !== 'women';
  }
  if (cleanCat === 'women' || cleanCat === 'womens') {
    const isFashion = ['clothing', 'western-wear', 'ethnic-wear', 'footwear', 'accessories'].includes(pCat);
    return isFashion && (pSec === 'women' || pGender === 'women' || pDept === 'women') && pGender !== 'men';
  }
  if (cleanCat === 'kids') {
    const isKids = ['clothing', 'western-wear', 'footwear'].includes(pCat) || pCat === 'kids';
    return isKids && (pSec === 'kids' || pGender === 'kids' || pDept === 'kids' || pCat === 'kids');
  }`;

const newCleanCat = `  if (cleanCat === 'men' || cleanCat === 'mens') {
    return (pSec === 'men' || pGender === 'men' || pDept === 'men') && pGender !== 'women';
  }
  if (cleanCat === 'women' || cleanCat === 'womens') {
    return (pSec === 'women' || pGender === 'women' || pDept === 'women') && pGender !== 'men';
  }
  if (cleanCat === 'kids') {
    return pCat === 'kids' || pSec === 'kids' || pGender === 'kids' || pDept === 'kids';
  }`;

const normOldCleanCat = oldCleanCat.replace(/\r\n/g, '\n');
const normFileCleanCat = prodServiceCode.replace(/\r\n/g, '\n');
if (normFileCleanCat.includes(normOldCleanCat)) {
  const patched = normFileCleanCat.replace(normOldCleanCat, newCleanCat.replace(/\r\n/g, '\n'));
  prodServiceCode = patched.replace(/\n/g, '\r\n');
  console.log('Successfully patched cleanCat in productService.js');
}

fs.writeFileSync(prodServicePath, prodServiceCode, 'utf8');

// 2. Patch backend/routes/productsRouter.js
const productsRouterPath = './backend/routes/productsRouter.js';
let productsRouterCode = fs.readFileSync(productsRouterPath, 'utf8');

const oldRouterCategoryFilter = `        if (pCat === cat || pCatName === cat || pSub === cat || pSec === cat) return true;
        if (cat === 'clothing' && ['clothing', 'western-wear', 'ethnic-wear'].includes(pCat)) return true;
        if ((cat === 'home-living' || cat === 'home-kitchen') && (pCat === 'home-living' || pCat === 'home-kitchen')) return true;
        if ((cat === 'pooja-items' || cat === 'pooja') && (pCat.includes('pooja') || pSub.includes('pooja'))) return true;
        if ((cat === 'gadgets' || cat === 'electronics') && (pCat === 'gadgets' || pCat === 'electronics')) return true;
        return false;`;

const newRouterCategoryFilter = `        if (pCat === cat || pCatName === cat || pSub === cat || pSec === cat) return true;
        if ((cat === 'home-living' || cat === 'home-kitchen') && (pCat === 'home-living' || pCat === 'home-kitchen')) return true;
        if ((cat === 'pooja-items' || cat === 'pooja') && (pCat.includes('pooja') || pSub.includes('pooja'))) return true;
        if ((cat === 'gadgets' || cat === 'electronics') && (pCat === 'gadgets' || pCat === 'electronics')) return true;
        if ((cat === 'jewellery' || cat === 'jewelry') && (pCat === 'jewellery' || pCat === 'jewelry')) return true;
        if ((cat === 'stationery' || cat === 'stationary') && (pCat === 'stationery' || pCat === 'stationary')) return true;
        if ((cat === 'grocery' || cat === 'groceries') && (pCat === 'grocery' || pCat === 'groceries')) return true;
        return false;`;

const normOldRouter = oldRouterCategoryFilter.replace(/\r\n/g, '\n');
const normRouterFile = productsRouterCode.replace(/\r\n/g, '\n');
if (normRouterFile.includes(normOldRouter)) {
  const patched = normRouterFile.replace(normOldRouter, newRouterCategoryFilter.replace(/\r\n/g, '\n'));
  productsRouterCode = patched.replace(/\n/g, '\r\n');
  fs.writeFileSync(productsRouterPath, productsRouterCode, 'utf8');
  console.log('Successfully patched category filter in backend/routes/productsRouter.js');
}

// 3. Patch backend/database/db.js seedCategories()
const dbPath = './backend/database/db.js';
let dbCode = fs.readFileSync(dbPath, 'utf8');
const allCats = JSON.parse(fs.readFileSync('./backend/data/categories.json', 'utf8'));

const seedCategoriesRegex = /function seedCategories\(\)\s*\{[\s\S]*?return\s*\[[\s\S]*?\];\s*\}/;
const newSeedCategories = `function seedCategories() {
  return ${JSON.stringify(allCats, null, 2)};
}`;

if (seedCategoriesRegex.test(dbCode)) {
  dbCode = dbCode.replace(seedCategoriesRegex, newSeedCategories);
  fs.writeFileSync(dbPath, dbCode, 'utf8');
  console.log('Successfully updated seedCategories() in backend/database/db.js');
}

console.log('All patches completed successfully!');
