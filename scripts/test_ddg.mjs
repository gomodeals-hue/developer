async function test() {
  const photoId = '1507679799987-c73779587ccf';
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent('"' + photoId + '" unsplash')}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  const matches = [...html.matchAll(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('Matches count:', matches.length);
  for (const m of matches.slice(0, 3)) {
    console.log('Snippet:', m[1].replace(/<[^>]+>/g, '').trim());
  }
}
test();
