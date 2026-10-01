import { readdir, stat, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

// Pass --strict to turn budget overruns into a non-zero exit. CI runs report-only
// until Phase 1 moves learning content out of the bundle (see docs/product-roadmap.md G5).
const strict = process.argv.includes('--strict');
const distDir = fileURLToPath(new URL('../dist', import.meta.url));

// Budgets are in bytes; displayed as KiB below.
const BUDGETS = {
  'total-js-gzip': 250 * 1024,
  'total-css-gzip': 60 * 1024,
  'single-chunk-js-raw': 500 * 1024,
};

const kb = (n) => `${(n / 1024).toFixed(2)} KiB`; // Vite reports decimal kB; this is binary KiB

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

let files;
try {
  files = await walk(distDir);
} catch {
  console.error(`No dist/ found. Run "npm run build" first.`);
  process.exit(1);
}

const rows = [];
for (const file of files) {
  const buf = await readFile(file);
  const { size } = await stat(file);
  rows.push({
    path: relative(distDir, file).split(sep).join('/'),
    raw: size,
    gzip: gzipSync(buf, { level: 9 }).length,
  });
}

rows.sort((a, b) => b.raw - a.raw);

console.log('\nBundle report\n');
console.log('  Asset'.padEnd(52) + 'Raw'.padStart(12) + 'Gzip'.padStart(12));
console.log('  ' + '-'.repeat(74));
for (const row of rows) {
  console.log(`  ${row.path.slice(0, 48).padEnd(50)}${kb(row.raw).padStart(12)}${kb(row.gzip).padStart(12)}`);
}

const sum = (pred, key) => rows.filter(pred).reduce((acc, r) => acc + r[key], 0);
const totals = {
  'total-js-gzip': sum((r) => r.path.endsWith('.js'), 'gzip'),
  'total-css-gzip': sum((r) => r.path.endsWith('.css'), 'gzip'),
  'single-chunk-js-raw': Math.max(0, ...rows.filter((r) => r.path.endsWith('.js')).map((r) => r.raw)),
};

const chunks = rows.filter((r) => r.path.endsWith('.js')).length;

console.log('\nTotals');
console.log(`  JS gzip          ${kb(totals['total-js-gzip']).padStart(12)}   budget ${kb(BUDGETS['total-js-gzip'])}`);
console.log(`  CSS gzip         ${kb(totals['total-css-gzip']).padStart(12)}   budget ${kb(BUDGETS['total-css-gzip'])}`);
console.log(`  Largest JS chunk ${kb(totals['single-chunk-js-raw']).padStart(12)}   budget ${kb(BUDGETS['single-chunk-js-raw'])}`);
console.log(`  JS chunk count   ${String(chunks).padStart(12)}`);

const breaches = Object.keys(BUDGETS).filter((k) => totals[k] > BUDGETS[k]);

console.log('');
if (breaches.length === 0) {
  console.log('  All budgets met.\n');
  process.exit(0);
}

for (const b of breaches) {
  console.log(`  BUDGET EXCEEDED  ${b}: ${kb(totals[b])} > ${kb(BUDGETS[b])}`);
}
if (chunks === 1 && totals['single-chunk-js-raw'] > BUDGETS['single-chunk-js-raw']) {
  console.log('  Hint: a single chunk this large is almost always route-coupled data.');
  console.log('  Phase 1 moves src/data/* into Supabase; see docs/product-roadmap.md.');
}

if (strict) {
  console.log('\n  Failing: --strict was passed.\n');
  process.exit(1);
}
console.log('\n  Report-only: CI will not fail on this yet (Phase 1 will enforce).\n');
