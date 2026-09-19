// Ping IndexNow (Bing, DuckDuckGo, Yandex, Naver, Seznam share it) with every URL in the live sitemap.
// Usage: node scripts/indexnow.mjs            → all sitemap URLs
//        node scripts/indexnow.mjs /demos /audits   → just those paths
const HOST = 'agenticprimitives.dev';
const KEY = 'af32d4aebafd4ee09405d36361b4b6e5'; // apps/web/public/<key>.txt proves we own the host
const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p}`));
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`${res.status} ${res.statusText} — submitted ${urls.length} URL(s)`);
if (!res.ok) console.log(await res.text());
