#!/usr/bin/env node
// Add `loading="lazy" decoding="async"` to every <img> tag in src/ that does
// not already have a `loading=` attribute. Skips Hero.tsx + Header.tsx + PageLoader.tsx
// (above-fold LCP candidates).
//
// Handles both single-line and multi-line JSX img tags.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(process.cwd(), 'src');
const SKIP = new Set(['Hero.tsx', 'Header.tsx', 'PageLoader.tsx']);
const EXTS = ['.tsx', '.jsx'];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = path.join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (EXTS.includes(path.extname(p))) acc.push(p);
  }
  return acc;
}

const files = walk(SRC);
let totalInserts = 0;
const touched = [];

// Match `<img` followed by attributes (multi-line allowed) up to `>` or `/>`.
// Skip if attribute block already has `loading=`.
const RE = /<img(\s+)([^>]*?)(\/?\s*>)/gs;

for (const f of files) {
  const before = readFileSync(f, 'utf8');
  let inserts = 0;
  const after = before.replace(RE, (m, ws, attrs, close) => {
    if (/\bloading\s*=/.test(attrs)) return m;
    inserts++;
    return `<img${ws}loading="lazy" decoding="async" ${attrs}${close}`;
  });
  if (inserts > 0) {
    writeFileSync(f, after);
    touched.push({ f, inserts });
    totalInserts += inserts;
  }
}

console.log(`inserted ${totalInserts} loading attrs across ${touched.length} files`);
for (const t of touched) console.log(`  ${t.inserts}\t${path.relative(process.cwd(), t.f)}`);
