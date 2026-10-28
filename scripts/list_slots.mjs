import { categorySections } from '../frontend/src/data/categories.js';

const slots = [];
const seen = new Set();

for (const [catSlug, sections] of Object.entries(categorySections)) {
  if (['electronics', 'home-kitchen', 'pooja', 'fashion', 'stationery', 'groceries'].includes(catSlug)) continue;
  for (const sec of sections) {
    for (const item of sec.items) {
      const key = `${catSlug}:::${sec.slug}:::${item.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        slots.push({
          category: catSlug,
          sectionSlug: sec.slug,
          sectionTitle: sec.title,
          subSlug: item.slug,
          subLabel: item.label
        });
      }
    }
  }
}

console.log('Total slots:', slots.length);
slots.forEach(s => console.log(`${s.category} | ${s.sectionSlug} (${s.sectionTitle}) | ${s.subSlug} (${s.subLabel})`));
