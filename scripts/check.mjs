// Controles voor elke push:
//  1. geen em dashes of en dashes in code of content
//  2. geen achtergebleven merknamen van de bron
//  3. elke link uit de kennisbank wijst naar een bestaand bestand
// Draaien met: npm run check
import { readdir, readFile } from 'node:fs/promises';

const dashesOnly = process.argv.includes('--dashes-only');
const errors = [];

async function htmlFiles() {
  const root = (await readdir('.', { withFileTypes: true }))
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => e.name);
  const kb = (await readdir('kennisbank')).map((f) => `kennisbank/${f}`);
  return [...root, ...kb.filter((f) => f.endsWith('.html'))];
}

const files = await htmlFiles();
const contents = new Map();
for (const f of files) contents.set(f, await readFile(f, 'utf8'));

// 1. dashes
for (const [file, text] of contents) {
  const hits = [...text.matchAll(/[\u2013\u2014]/g)];
  if (hits.length) errors.push(`${file}: ${hits.length} em of en dash`);
}

if (!dashesOnly) {
  // 2. merknamen uit de bron
  for (const [file, text] of contents) {
    const stripped = text.replace(/https:\/\/fliimedia\.github\.io[^"')\s]*/g, '');
    if (/\bFlii\b/.test(stripped.replace(/by Flii Media/g, ''))) {
      errors.push(`${file}: onverwachte merknaam uit de bron`);
    }
  }

  // 3. kennisbanklinks
  const index = contents.get('kennisbank/index.html') ?? '';
  const linked = [...index.matchAll(/<a href="([a-z0-9-]+)" class="kb-row">/g)].map((m) => m[1]);
  for (const slug of linked) {
    if (!contents.has(`kennisbank/${slug}.html`)) {
      errors.push(`kennisbank/index.html verwijst naar ontbrekende pagina: ${slug}`);
    }
  }
  console.log(`${files.length} html bestanden, ${linked.length} kennisbanklinks gecontroleerd`);
}

if (errors.length) {
  console.error('\nGefaald:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log('alle controles geslaagd');
