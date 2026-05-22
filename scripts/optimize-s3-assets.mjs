#!/usr/bin/env node
// Re-encode images and videos on S3 in place at a parallel `optimized/` prefix.
// Non-destructive: originals stay at their existing keys.
//
// Usage:
//   node scripts/optimize-s3-assets.mjs --mode=images [--dry-run] [--min-bytes=2000000]
//   node scripts/optimize-s3-assets.mjs --mode=videos [--dry-run]
//
// Reads S3 URLs + sizes from /tmp/audit/s3_sizes_v2.txt (each line: "<bytes> <url>").
// Writes results to scripts/s3_optimize_log.csv (appended).
//
// Requires .env.local with AWS_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY.

import { readFileSync, existsSync, writeFileSync, appendFileSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

// --- env loader (no extra dep) ---
const envPath = path.resolve(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));

const MODE = args.mode;
const DRY_RUN = !!args['dry-run'];
const FORCE = !!args.force;
const MIN_BYTES_IMG = Number(args['min-bytes'] ?? 2_000_000);
const SIZES_FILE = args.input ?? '/tmp/audit/s3_sizes_v2.txt';

if (!['images', 'videos'].includes(MODE)) {
  console.error('usage: --mode=images|videos [--dry-run] [--min-bytes=N] [--input=FILE]');
  process.exit(1);
}

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.AWS_S3_BUCKET;
if (!REGION || !BUCKET) {
  console.error('missing AWS_REGION or AWS_S3_BUCKET in .env.local');
  process.exit(1);
}

const s3 = new S3Client({ region: REGION });

// --- parse sizes file ---
const lines = readFileSync(SIZES_FILE, 'utf8').trim().split('\n');
const all = lines.map((l) => {
  const m = l.match(/^(\d+)\s+(\S+)$/);
  return m ? { bytes: Number(m[1]), url: m[2] } : null;
}).filter(Boolean);

// --- select targets ---
function isImage(url) { return /\.(webp|png|jpe?g)$/i.test(url); }
function isVideo(url) { return /\.(mp4|webm|mov)$/i.test(url); }
const targets = all.filter((r) => MODE === 'images'
  ? isImage(r.url) && r.bytes >= MIN_BYTES_IMG
  : isVideo(r.url));

console.log(`mode=${MODE} target_count=${targets.length} dry_run=${DRY_RUN}`);

// --- helpers ---
function keyFromUrl(url) {
  // url: https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/foo/bar.webp
  const u = new URL(url);
  // pathname starts with "/"
  return decodeURIComponent(u.pathname.replace(/^\//, ''));
}
function optimizedKey(origKey) {
  return origKey.replace(/^website-content\//, 'website-content/optimized/');
}

async function objectExists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch { return false; }
}

async function download(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download fail ${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

async function putObject({ key, body, contentType }) {
  if (DRY_RUN) { console.log(`  [dry-run] PUT ${key} (${body.length} bytes, ${contentType})`); return; }
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));
}

// --- log ---
const LOG = path.resolve(process.cwd(), 'scripts/s3_optimize_log.csv');
if (!existsSync(LOG)) writeFileSync(LOG, 'mode,orig_key,new_key,orig_bytes,new_bytes,saved_bytes,saved_pct,status\n');
function log(row) { appendFileSync(LOG, row.join(',') + '\n'); }

// --- image pipeline ---
async function processImage(t) {
  const origKey = keyFromUrl(t.url);
  const newKey = optimizedKey(origKey);
  if (!FORCE && await objectExists(newKey)) {
    console.log(`  skip (exists): ${newKey}`);
    log(['image', origKey, newKey, t.bytes, '', '', '', 'skip-exists']);
    return;
  }
  const input = await download(t.url);
  const output = await sharp(input)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  const pct = (((t.bytes - output.length) / t.bytes) * 100).toFixed(1);
  console.log(`  ${origKey}  ${(t.bytes/1024/1024).toFixed(2)}MB -> ${(output.length/1024/1024).toFixed(2)}MB  (-${pct}%)`);
  await putObject({ key: newKey, body: output, contentType: 'image/webp' });
  log(['image', origKey, newKey, t.bytes, output.length, t.bytes - output.length, pct, DRY_RUN ? 'dry' : 'done']);
}

// --- video pipeline ---
async function processVideo(t) {
  const origKey = keyFromUrl(t.url);
  const newKey = optimizedKey(origKey);
  if (!FORCE && await objectExists(newKey)) {
    console.log(`  skip (exists): ${newKey}`);
    log(['video', origKey, newKey, t.bytes, '', '', '', 'skip-exists']);
    return;
  }
  const tmpIn = path.join(tmpdir(), `s3opt-in-${Date.now()}.mp4`);
  const tmpOut = path.join(tmpdir(), `s3opt-out-${Date.now()}.mp4`);
  try {
    console.log(`  downloading ${origKey} (${(t.bytes/1024/1024).toFixed(1)}MB)`);
    writeFileSync(tmpIn, await download(t.url));
    console.log('  encoding...');
    const args = [
      '-y', '-i', tmpIn,
      '-c:v', 'libx264', '-crf', '28', '-preset', 'medium',
      '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-vf', "scale='min(1280,iw)':-2",
      '-maxrate', '1500k', '-bufsize', '3000k',
      '-movflags', '+faststart',
      '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
      tmpOut,
    ];
    const r = spawnSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'inherit'] });
    if (r.status !== 0) throw new Error(`ffmpeg exit ${r.status}`);
    const body = readFileSync(tmpOut);
    const pct = (((t.bytes - body.length) / t.bytes) * 100).toFixed(1);
    console.log(`  ${origKey}  ${(t.bytes/1024/1024).toFixed(2)}MB -> ${(body.length/1024/1024).toFixed(2)}MB  (${pct >= 0 ? '-' : '+'}${Math.abs(pct)}%)`);
    if (body.length >= t.bytes) {
      console.log('  SKIP upload: re-encode produced no savings');
      log(['video', origKey, newKey, t.bytes, body.length, t.bytes - body.length, pct, 'skip-no-savings']);
      return;
    }
    await putObject({ key: newKey, body, contentType: 'video/mp4' });
    log(['video', origKey, newKey, t.bytes, body.length, t.bytes - body.length, pct, DRY_RUN ? 'dry' : 'done']);
  } finally {
    if (existsSync(tmpIn)) unlinkSync(tmpIn);
    if (existsSync(tmpOut)) unlinkSync(tmpOut);
  }
}

// --- run sequentially to keep memory + bandwidth bounded ---
let errs = 0;
for (let i = 0; i < targets.length; i++) {
  const t = targets[i];
  console.log(`[${i+1}/${targets.length}] ${t.url}`);
  try {
    if (MODE === 'images') await processImage(t);
    else await processVideo(t);
  } catch (e) {
    errs++;
    console.error('  ERROR:', e.message);
    log([MODE.slice(0,-1), keyFromUrl(t.url), '', t.bytes, '', '', '', `error:${e.message}`]);
  }
}
console.log(`done. processed=${targets.length} errors=${errs}`);
