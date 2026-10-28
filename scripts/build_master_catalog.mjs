import fs from "fs";
import path from "path";

// Import all curated catalog modules
import { MEN_CLOTHING_PRODUCTS } from "./catalog/men_clothing.mjs";
import { WOMEN_CLOTHING_PRODUCTS } from "./catalog/women_clothing.mjs";
import { KIDS_AND_UNISEX_PRODUCTS } from "./catalog/kids_and_unisex.mjs";
import { ETHNIC_WEAR_PRODUCTS } from "./catalog/ethnic_wear.mjs";
import { FOOTWEAR_PRODUCTS } from "./catalog/footwear.mjs";
import { ACCESSORIES_AND_BEAUTY_PRODUCTS } from "./catalog/accessories_and_beauty.mjs";
import { HOME_LIVING_AND_GADGETS_PRODUCTS } from "./catalog/home_living_and_gadgets.mjs";
import { ELECTRONICS_ADDITIONS } from "./catalog/electronics_additions.mjs";
import { POOJA_ITEMS_PART1 } from "./catalog/pooja_items_part1.mjs";
import { POOJA_ITEMS_PART2 } from "./catalog/pooja_items_part2.mjs";
import { PANTRY_STATIONERY_GIFTS_JEWELLERY } from "./catalog/pantry_stationery_gifts_jewellery.mjs";

const MASTER_PRODUCTS = [
  ...MEN_CLOTHING_PRODUCTS,
  ...WOMEN_CLOTHING_PRODUCTS,
  ...KIDS_AND_UNISEX_PRODUCTS,
  ...ETHNIC_WEAR_PRODUCTS,
  ...FOOTWEAR_PRODUCTS,
  ...ACCESSORIES_AND_BEAUTY_PRODUCTS,
  ...HOME_LIVING_AND_GADGETS_PRODUCTS,
  ...ELECTRONICS_ADDITIONS,
  ...POOJA_ITEMS_PART1,
  ...POOJA_ITEMS_PART2,
  ...PANTRY_STATIONERY_GIFTS_JEWELLERY,
];

console.log(`Aggregated ${MASTER_PRODUCTS.length} curated master products.`);

// Verify uniqueness of IDs
const seenIds = new Set();
for (const p of MASTER_PRODUCTS) {
  const id = p.product_id || p.id;
  if (seenIds.has(id)) {
    console.error(`Duplicate product ID detected: ${id}`);
  }
  seenIds.add(id);
}

// 1. Write frontend/src/data/sampleProducts.js
const sampleProductsCode = `/**
 * Master Curated Product Catalog for GoMo Deals
 * Every category and subcategory contains exactly 4 authentic, high-quality products.
 * Total curated products: ${MASTER_PRODUCTS.length}
 */

export const SAMPLE_PRODUCTS = ${JSON.stringify(MASTER_PRODUCTS, null, 2)};
`;

fs.writeFileSync(
  "./frontend/src/data/sampleProducts.js",
  sampleProductsCode,
  "utf8",
);
console.log("Successfully wrote ./frontend/src/data/sampleProducts.js");

// 2. Empty out supplementalProducts.js and generatedProducts.js
const emptySupplementalCode = `/**
 * Supplemental products catalog (Deprecated - all products now curated in SAMPLE_PRODUCTS)
 */
export const SUPPLEMENTAL_PRODUCTS = [];
`;
fs.writeFileSync(
  "./frontend/src/data/supplementalProducts.js",
  emptySupplementalCode,
  "utf8",
);
console.log("Successfully emptied ./frontend/src/data/supplementalProducts.js");

const emptyGeneratedCode = `/**
 * Generated products catalog (Deprecated - all products now curated in SAMPLE_PRODUCTS)
 */
export const GENERATED_PRODUCTS = [];
`;
fs.writeFileSync(
  "./frontend/src/data/generatedProducts.js",
  emptyGeneratedCode,
  "utf8",
);
console.log("Successfully emptied ./frontend/src/data/generatedProducts.js");

// 3. Write backend/data/products.json
fs.writeFileSync(
  "./backend/data/products.json",
  JSON.stringify(MASTER_PRODUCTS, null, 2),
  "utf8",
);
console.log("Successfully wrote ./backend/data/products.json");

console.log("Build Master Catalog finished successfully!");
