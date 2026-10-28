import fs from 'fs';
import path from 'path';

const catalog = JSON.parse(fs.readFileSync('./backend/data/products.json', 'utf8'));
const men = catalog.filter(x => (x.section === 'men' || x.gender === 'men'));

const dir = './scratch/men_images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadAll() {
  console.log(`Downloading ${men.length} images...`);
  for (let i = 0; i < men.length; i++) {
    const p = men[i];
    const url = p.thumbnail;
    const filename = `${String(i + 1).padStart(2, '0')}_${p.product_id || p.id}_${p.subcategory}.jpg`;
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.error(`Failed ${p.product_id}: HTTP ${res.status}`);
          continue;
        }
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(buffer));
        console.log(`[${i+1}/${men.length}] Saved ${filename} (${buffer.byteLength} bytes)`);
      } catch (err) {
        console.error(`Error ${p.product_id}:`, err.message);
      }
    } else {
      console.log(`[${i+1}/${men.length}] Exists ${filename}`);
    }
  }
  console.log('Done downloading.');
}

downloadAll();
