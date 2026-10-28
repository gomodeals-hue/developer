import fs from "fs";

const frontend = fs.readFileSync("frontend/src/data/sampleProducts.js", "utf8");
const backend = JSON.parse(
  fs.readFileSync("backend/data/products.json", "utf8"),
);
const nav = fs.readFileSync(
  "frontend/src/components/layout/Navbar/NavMain.jsx",
  "utf8",
);

const removedNames = [
  "Puma Tech Stripe DryCELL Men's Regular Fit Track Pants",
  "Fossil Grant Chronograph Dark Brown Leather Men's Watch",
  "Bata Comfit Ergonomic Arch Support Dual-Strap Men's Sandals",
  "Tommy Hilfiger Reversible Genuine Leather Formal & Casual Belt",
];
const removed = removedNames.filter(
  (name) =>
    frontend.includes(name) || backend.some((product) => product.name === name),
);
const groups = [
  "headphones",
  "speakers",
  "earbuds",
  "soundbars",
  "smart-wearables",
  "fitness-trackers",
  "power-banks",
  "chargers-cables",
];
const counts = Object.fromEntries(
  groups.map((group) => [
    group,
    backend.filter((product) => product.subcategory === group).length,
  ]),
);
const expectedCounts = {
  headphones: 5,
  speakers: 2,
  earbuds: 2,
  soundbars: 2,
  "smart-wearables": 2,
  "fitness-trackers": 2,
  "power-banks": 6,
  "chargers-cables": 2,
};
const poojaProducts = backend.filter(
  (product) => product.category === "pooja-items",
);
const suppliedImages = poojaProducts.every((product) =>
  product.thumbnail.includes("encrypted-tbn0.gstatic.com/images?q="),
);
const duplicateIds = backend
  .filter(
    (product, index) =>
      backend.findIndex(
        (candidate) => candidate.product_id === product.product_id,
      ) !== index,
  )
  .map((product) => product.product_id);
const todayDealsNav = nav.includes('label: "Today\'s Deals"');
const result = {
  products: backend.length,
  duplicates: duplicateIds.length,
  removed,
  counts,
  poojaProducts: poojaProducts.length,
  suppliedImages,
  todayDealsNav,
};

console.log(JSON.stringify(result, null, 2));

if (
  removed.length > 0 ||
  duplicateIds.length > 0 ||
  Object.entries(expectedCounts).some(
    ([group, expectedCount]) => counts[group] !== expectedCount,
  ) ||
  poojaProducts.length !== 88 ||
  !suppliedImages ||
  todayDealsNav
) {
  process.exit(1);
}
