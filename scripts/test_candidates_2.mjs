import fs from 'fs';
import path from 'path';

// Let's test a targeted list of candidate photo IDs
const candidates = [
  // Men's Joggers / Sweatpants
  { id: '1552674605-db6ffd4facb5', label: 'joggers_runner_male' },
  { id: '1506629082955-511b1aa562c8', label: 'joggers_legs_sneakers' },
  { id: '1515886657613-9f3515b0c78f', label: 'joggers_test_3' },
  { id: '1556906781-9a412961c28c', label: 'joggers_sneakers_male' },
  { id: '1489987707025-afc232f7ea0f', label: 'clothing_rack_tshirt' },
  { id: '1503341455253-b2e723bb3dbb', label: 'athletic_man_tshirt' },
  { id: '1539185441755-769473a23570', label: 'men_sneakers_shoes' },
  
  // Men's Ethnic Kurtas / Sherwanis / Nehru Jackets
  { id: '1583391733956-3750e0ff4e8b', label: 'indian_ethnic_1' },
  { id: '1610030469983-98e550d6193c', label: 'indian_ethnic_2' },
  { id: '1609357605129-26f69add5d6e', label: 'indian_ethnic_3' },
  { id: '1583391733975-0f0923e2003c', label: 'indian_ethnic_4' },
  { id: '1564859228273-274232fdb516', label: 'indian_ethnic_5' },

  // Men's Sandals / Slippers
  { id: '1562273138-f46be4ebdf33', label: 'sandals_1' },
  { id: '1603808033192-082d6919d3e1', label: 'sandals_2' },
  { id: '1508296695146-257a814070b4', label: 'sunglasses_test' },
  { id: '1572635196237-14b3f281503f', label: 'sunglasses_rayban' },

  // Men's Wallets
  { id: '1607604276583-eef5d076aa5f', label: 'wallet_test_1' },
  { id: '1627123424574-724758594e93', label: 'wallet_test_2' },
  { id: '1553062407-98eeb64c6a62', label: 'backpack_1' },
  { id: '1524805444758-089113d48a6d', label: 'watch_test_1' }
];

async function test() {
  const dir = './scratch/candidate_tests_2';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const c of candidates) {
    const url = `https://images.unsplash.com/photo-${c.id}?w=800&q=80`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        const fn = path.join(dir, `${c.label}_${c.id}.jpg`);
        fs.writeFileSync(fn, buf);
        console.log(`[OK] ${c.label} (${c.id}) -> ${buf.length} bytes`);
      } else {
        console.log(`[HTTP ${res.status}] ${c.label} (${c.id})`);
      }
    } catch (e) {
      console.log(`[ERR] ${c.label}: ${e.message}`);
    }
  }
}

test();
