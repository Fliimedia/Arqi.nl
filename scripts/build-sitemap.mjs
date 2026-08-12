// Genereert sitemap.xml op basis van de aanwezige html bestanden.
// Draaien met: npm run sitemap
import { readdir, writeFile } from 'node:fs/promises';

const BASE = 'https://arqi.nl';
const today = new Date().toISOString().slice(0, 10);

const terms = (await readdir('kennisbank'))
  .filter((f) => f.endsWith('.html') && f !== 'index.html')
  .map((f) => f.replace(/\.html$/, ''))
  .sort();

const urls = [
  { loc: `${BASE}/`, priority: '1.0' },
  { loc: `${BASE}/kennisbank`, priority: '0.8' },
  ...terms.map((t) => ({ loc: `${BASE}/kennisbank/${t}`, priority: '0.6' })),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`
  ),
  '</urlset>',
  '',
].join('\n');

await writeFile('sitemap.xml', xml);
console.log(`sitemap.xml geschreven met ${urls.length} urls`);
