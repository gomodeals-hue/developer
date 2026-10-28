import fs from 'fs';
import path from 'path';

console.log("Starting category catalog update...");

// 1. Update frontend/src/services/categoryService.js
const catServicePath = path.resolve('./frontend/src/services/categoryService.js');
let catServiceContent = fs.readFileSync(catServicePath, 'utf8');

// Ensure MAIN_CATEGORIES has grocery-items and pet-accessories
if (!catServiceContent.includes("slug: 'grocery-items'")) {
  catServiceContent = catServiceContent.replace(
    "export const MAIN_CATEGORIES = [",
    `export const MAIN_CATEGORIES = [\n  { slug: 'grocery-items', label: 'Grocery Items', icon: 'ShoppingBasket', description: 'Staples, dals, edible oils, spices, snacks & dairy' },\n  { slug: 'pet-accessories', label: 'Pet Accessories', icon: 'Dog', description: 'Food, treats, collars, grooming & pet toys' },`
  );
}

// Add image mappings in CATEGORY_IMAGES
if (!catServiceContent.includes("'grocery-items':")) {
  catServiceContent = catServiceContent.replace(
    "export const CATEGORY_IMAGES = {",
    `export const CATEGORY_IMAGES = {\n  'grocery-items': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',\n  'pet-accessories': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',`
  );
}

fs.writeFileSync(catServicePath, catServiceContent, 'utf8');
console.log("Updated categoryService.js");

// 2. Update frontend/src/pages/Category/CategoriesPage.jsx
const categoriesPagePath = path.resolve('./frontend/src/pages/Category/CategoriesPage.jsx');
let catPageContent = fs.readFileSync(categoriesPagePath, 'utf8');

// Add ShoppingBasket, Dog imports if not present
if (!catPageContent.includes('ShoppingBasket')) {
  catPageContent = catPageContent.replace(
    "import {\n  Laptop,",
    "import {\n  ShoppingBasket, Dog,\n  Laptop,"
  ).replace(
    "import { \n  Laptop,",
    "import {\n  ShoppingBasket, Dog,\n  Laptop,"
  );
}

// Add to ICON_MAP
if (!catPageContent.includes('ShoppingBasket,') && !catPageContent.includes('ShoppingBasket }')) {
  catPageContent = catPageContent.replace(
    "const ICON_MAP = {",
    "const ICON_MAP = {\n  ShoppingBasket, Dog,"
  );
}

// Update FILTER_TABS to include Grocery Items and Pet Accessories
if (!catPageContent.includes("value: 'grocery-items'")) {
  catPageContent = catPageContent.replace(
    "const FILTER_TABS = [\n    { label: 'All', value: 'all' },",
    "const FILTER_TABS = [\n    { label: 'All', value: 'all' },\n    { label: 'Grocery Items', value: 'grocery-items' },\n    { label: 'Pet Accessories', value: 'pet-accessories' },"
  );
}

// Update category count parsing
if (!catPageContent.includes("counts['grocery-items']")) {
  catPageContent = catPageContent.replace(
    "if (slug === 'stationery') counts['stationary'] = (counts['stationary'] || 0) + 1;",
    "if (slug === 'grocery' || slug === 'grocery-items' || slug === 'groceries') {\n              counts['grocery-items'] = (counts['grocery-items'] || 0) + 1;\n              counts['grocery'] = (counts['grocery'] || 0) + 1;\n            }\n            if (slug === 'pet-accessories' || slug === 'pet' || slug === 'pets') {\n              counts['pet-accessories'] = (counts['pet-accessories'] || 0) + 1;\n            }\n            if (slug === 'stationery') counts['stationary'] = (counts['stationary'] || 0) + 1;"
  );
}

fs.writeFileSync(categoriesPagePath, catPageContent, 'utf8');
console.log("Updated CategoriesPage.jsx");

console.log("Category service & page updated successfully!");
