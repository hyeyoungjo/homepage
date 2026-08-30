#!/usr/bin/env node
/**
 * Check every video the site points at. Run: `npm run check-videos`
 *
 * Two videos once went dead on YouTube without any sign on the site: the page
 * still rendered, the player just said "Video unavailable". This catches that,
 * plus local files a page references but that are missing from public/.
 *
 * Exits non-zero when something is broken, so it can gate a deploy.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const PROJECTS_DIR = 'src/content/projects';
const REELS_COMPONENT = 'src/components/JourneyReels.astro';
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';

const videoId = (url) => url.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/)?.[1];

/** YouTube reports a dead video only inside the watch page's player JSON. */
async function youtubeStatus(id) {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${id}`, { headers: { 'User-Agent': UA } });
    if (!res.ok) return `HTTP ${res.status}`;
    const body = await res.text();
    const status = body.match(/"playabilityStatus":\{"status":"([A-Z_]+)"/)?.[1];
    if (!status) return 'UNKNOWN';
    if (status === 'OK') return null;
    const reason = body.match(/"reason":"([^"]+)"/)?.[1];
    return reason ? `${status} (${reason})` : status;
  } catch (err) {
    return `fetch failed: ${err.message}`;
  }
}

async function collect() {
  const targets = [];

  for (const slug of await fs.readdir(PROJECTS_DIR)) {
    const file = path.join(PROJECTS_DIR, slug, 'index.md');
    let src;
    try {
      src = await fs.readFile(file, 'utf8');
    } catch {
      continue;
    }

    const yt = src.match(/^\s*youtube:\s*"([^"]+)"/m)?.[1];
    if (yt) targets.push({ where: slug, kind: 'youtube', ref: yt });

    // remark-video rewrites ![](./clip.mp4) to /p/<slug>/<name>.mp4
    for (const m of src.matchAll(/!\[[^\]]*\]\(\.\/([\w.-]+)\.(mp4|webm|mov|gif)\)/g)) {
      const ext = m[2] === 'webm' ? 'webm' : 'mp4';
      targets.push({ where: slug, kind: 'local', ref: `public/p/${slug}/${m[1]}.${ext}` });
    }
  }

  const reels = await fs.readFile(REELS_COMPONENT, 'utf8');
  for (const m of reels.matchAll(/src: '(\/reels\/[\w.-]+)'/g)) {
    targets.push({ where: 'showreels', kind: 'local', ref: `public${m[1]}` });
  }

  return targets;
}

const targets = await collect();
const failures = [];

for (const t of targets) {
  let problem = null;

  if (t.kind === 'youtube') {
    const id = videoId(t.ref);
    problem = id ? await youtubeStatus(id) : 'unrecognised URL';
  } else {
    problem = (await fs.stat(t.ref).catch(() => null)) ? null : 'file missing';
  }

  const label = t.kind === 'youtube' ? videoId(t.ref) ?? t.ref : t.ref.replace('public/', '');
  if (problem) {
    failures.push({ ...t, problem });
    console.log(`  FAIL  ${t.where.padEnd(30)} ${label.padEnd(34)} ${problem}`);
  } else {
    console.log(`  ok    ${t.where.padEnd(30)} ${label}`);
  }
}

console.log(`\n${targets.length} checked, ${failures.length} broken.`);
if (failures.length) {
  console.log('\nA dead YouTube video can be recovered with your own login:');
  console.log('  yt-dlp --cookies-from-browser chrome -f "bv*[ext=mp4]+ba[ext=m4a]/b" <url>');
  process.exit(1);
}
