async function searchDDG(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  // Find unsplash photo links: https://unsplash.com/photos/...
  const matches = [...html.matchAll(/https:\/\/unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/g)];
  const ids = [...new Set(matches.map(m => m[1]))];
  console.log(`Results for "${query}":`, ids.length, 'found');
  return ids;
}

async function run() {
  const q1 = await searchDDG('site:unsplash.com/photos men track pants');
  console.log('Track pants photo slugs:', q1.slice(0, 5));
  const q2 = await searchDDG('site:unsplash.com/photos men leather wallet');
  console.log('Wallet photo slugs:', q2.slice(0, 5));
}

run();
