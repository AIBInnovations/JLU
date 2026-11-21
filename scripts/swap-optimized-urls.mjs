#!/usr/bin/env node
// Rewrite src/ URL strings from `website-content/<path>` to `website-content/optimized/<path>`
// only for keys listed in scripts/s3_optimize_log.csv as status=done.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const CSV = path.resolve(process.cwd(), 'scripts/s3_optimize_log.csv');
const SRC = path.resolve(process.cwd(), 'src');
const ALLOWED_EXT = ['.tsx', '.ts', '.jsx', '.js'];

// parse CSV
const rows = readFileSync(CSV, 'utf8').trim().split('\n').slice(1).map((l) => l.split(','));
const targets = rows
  .filter((r) => r[7] === 'done')
  .map((r) => ({ orig: r[1], opt: r[2] }));

console.log(`targets: ${targets.length}`);

// URL-encode a key the way the source code does
// (browser-style encodeURI: spaces->%20, leaves /, leaves parens, etc.)
function enc(key) {
  return key.split('/').map(encodeURIComponent).join('/')
    // we want %20 but NOT %28/%29 since the source uses raw `(` `)`
    .replace(/%28/g, '(').replace(/%29/g, ')');
}

const substitutions = targets.map((t) => ({
  from: enc(t.orig),
  to: enc(t.opt),
}));

// walk src/
function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (ALLOWED_EXT.includes(path.extname(p))) acc.push(p);
  }
  return acc;
}

const files = walk(SRC);
console.log(`src files scanned: ${files.length}`);

let totalReplacements = 0;
const touched = [];
for (const f of files) {
  const before = readFileSync(f, 'utf8');
  let after = before;
  let count = 0;
  for (const { from, to } of substitutions) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const replaced = after.replace(re, () => { count++; return to; });
    after = replaced;
  }
  if (count > 0) {
    writeFileSync(f, after);
    touched.push({ f, count });
    totalReplacements += count;
  }
}
console.log(`replacements: ${totalReplacements} across ${touched.length} files`);
for (const t of touched) console.log(`  ${t.count}\t${path.relative(process.cwd(), t.f)}`);
