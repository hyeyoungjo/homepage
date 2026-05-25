#!/usr/bin/env node
/**
 * Asset pipeline — prepare co-located project media for the web. Run: `npm run assets`
 * - Images (jpg/png): downsize to <= MAX_DIM long edge, re-encode in place (only if smaller).
 * - GIFs: convert to mp4 -> public/p/<slug>/<name>.mp4, then remove the source gif.
 * - Videos (mp4/webm/mov): small ones -> compressed mp4 in public/p/<slug>/; large -> recommend YouTube.
 * Originals stay safe in ~/Downloads / Google Drive; this only touches the copies under src/.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const execFileP = promisify(execFile);

const PROJECTS_DIR = 'src/content/projects';
const PUBLIC_MEDIA = 'public/p';
const MAX_DIM = 2000;
const VIDEO_MAX_MB = 12; // larger -> recommend YouTube instead of committing

const IMG_RE = /\.(jpe?g|png)$/i;
const GIF_RE = /\.gif$/i;
const VID_RE = /\.(mp4|webm|mov)$/i;

const mb = (b) => (b / 1048576).toFixed(1);

async function ffmpegAvailable() {
  try { await execFileP('ffmpeg', ['-version']); return true; } catch { return false; }
}

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(fp)));
    else out.push(fp);
  }
  return out;
}

// src/content/projects/<slug>/.../file -> <slug>
const slugFor = (fp) => path.relative(PROJECTS_DIR, fp).split(path.sep)[0];

async function processImage(fp) {
  const before = (await fs.stat(fp)).size;
  const img = sharp(await fs.readFile(fp), { failOn: 'none' }).rotate();
  const meta = await img.metadata();
  if (!meta.width || !meta.height) return;
  let pipe = img;
  if (Math.max(meta.width, meta.height) > MAX_DIM) {
    pipe = pipe.resize(meta.width >= meta.height ? { width: MAX_DIM } : { height: MAX_DIM });
  }
  const ext = path.extname(fp).toLowerCase();
  const buf = ext === '.png'
    ? await pipe.png({ compressionLevel: 9 }).toBuffer()
    : await pipe.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  if (buf.length < before) {
    await fs.writeFile(fp, buf);
    console.log(`  img  ${path.basename(fp)}  ${mb(before)} -> ${mb(buf.length)} MB`);
  }
}

async function convertGif(fp, hasFfmpeg) {
  if (!hasFfmpeg) { console.warn(`  SKIP gif (no ffmpeg): ${fp}`); return; }
  const slug = slugFor(fp);
  const outDir = path.join(PUBLIC_MEDIA, slug);
  await fs.mkdir(outDir, { recursive: true });
  const name = path.basename(fp).replace(GIF_RE, '');
  const out = path.join(outDir, `${name}.mp4`);
  const before = (await fs.stat(fp)).size;
  await execFileP('ffmpeg', ['-y', '-i', fp, '-movflags', 'faststart', '-pix_fmt', 'yuv420p',
    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-an', out]);
  const after = (await fs.stat(out)).size;
  await fs.rm(fp);
  console.log(`  gif  ${path.basename(fp)} -> /p/${slug}/${name}.mp4  ${mb(before)} -> ${mb(after)} MB`);
}

async function handleVideo(fp, hasFfmpeg) {
  const size = (await fs.stat(fp)).size;
  const slug = slugFor(fp);
  if (size > VIDEO_MAX_MB * 1048576) {
    console.warn(`  BIG video (${mb(size)} MB): ${fp}\n       -> upload to YouTube and reference it with a YouTube link instead.`);
    return;
  }
  const outDir = path.join(PUBLIC_MEDIA, slug);
  await fs.mkdir(outDir, { recursive: true });
  const out = path.join(outDir, path.basename(fp).replace(VID_RE, '.mp4'));
  if (hasFfmpeg) {
    await execFileP('ffmpeg', ['-y', '-i', fp, '-movflags', 'faststart', '-pix_fmt', 'yuv420p',
      '-vcodec', 'libx264', '-crf', '24', '-an', out]);
  } else {
    await fs.copyFile(fp, out);
  }
  await fs.rm(fp);
  console.log(`  vid  ${path.basename(fp)} -> /p/${slug}/${path.basename(out)}`);
}

async function main() {
  const hasFfmpeg = await ffmpegAvailable();
  if (!hasFfmpeg) console.warn('! ffmpeg not found — GIF/video conversion skipped. Install: brew install ffmpeg');
  try { await fs.access(PROJECTS_DIR); } catch { console.log('No projects directory.'); return; }
  for (const fp of await walk(PROJECTS_DIR)) {
    try {
      if (IMG_RE.test(fp)) await processImage(fp);
      else if (GIF_RE.test(fp)) await convertGif(fp, hasFfmpeg);
      else if (VID_RE.test(fp)) await handleVideo(fp, hasFfmpeg);
    } catch (e) {
      console.error(`  ERROR ${fp}: ${e.message}`);
    }
  }
  console.log('Done.');
}

main();
