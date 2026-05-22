#!/usr/bin/env node
// For every <img> in src/ whose src points to one of the 46 optimized WebPs we
// have already generated a 480w mobile variant for, inject:
//   srcset="<full>.webp 1280w, <full>-480w.webp 480w"
//   sizes="(max-width: 768px) 480px, 1280px"
// Skips imgs that already have srcset.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const CSV = path.resolve(process.cwd(), 'scripts/s3_optimize_log.csv');
const SRC = path.resolve(process.cwd(), 'src');
const EXTS = ['.tsx', '.jsx'];

// Build the set of full-resolution optimized URLs that have a mobile sibling.
const rows = readFileSync(CSV, 'utf8').trim().split('\n').slice(1).map((l) => l.split(','));
const targets = new Set(
  rows
    .filter((r) => r[0] === 'responsive' && r[7] === 'done')
    // For a responsive row, new_key looks like "website-content/optimized/X/Y-480w.webp".
    // The "full" key the code refers to is "website-content/optimized/X/Y.webp".
    .map((r) => r[2].replace(/-480w\.webp$/, '.webp')),
);

function enc(key) {
  return key.split('/').map(encodeURIComponent).join('/')
    .replace(/%28/g, '(').replace(/%29/g, ')');
}
const fullUrlSet = new Set(
  [...targets].map((k) => `https://jlu-website-media.s3.ap-south-1.amazonaws.com/${enc(k)}`),
);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
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

const RE = /<img(\s+)([^>]*?)(\/?\s*>)/gs;

for (const f of files) {
  const before = readFileSync(f, 'utf8');
  let inserts = 0;
  const after = before.replace(RE, (m, ws, attrs, close) => {
    if (/\bsrcset=/.test(attrs)) return m;
    const srcMatch = attrs.match(/\bsrc=("|')(https:\/\/jlu-website-media\.s3\.ap-south-1\.amazonaws\.com\/[^"'\s]+\.webp)\1/);
    if (!srcMatch) return m;
    const fullUrl = srcMatch[2];
    if (!fullUrlSet.has(fullUrl)) return m;
    const mobileUrl = fullUrl.replace(/\.webp$/, '-480w.webp');
    const inject = ` srcSet="${fullUrl} 1280w, ${mobileUrl} 480w" sizes="(max-width: 768px) 480px, 1280px"`;
    inserts++;
    return `<img${ws}${attrs}${inject}${close}`;
  });
  if (inserts > 0) {
    writeFileSync(f, after);
    touched.push({ f, inserts });
    totalInserts += inserts;
  }
}

console.log(`inserted ${totalInserts} srcSet attrs across ${touched.length} files`);
for (const t of touched) console.log(`  ${t.inserts}\t${path.relative(process.cwd(), t.f)}`);
