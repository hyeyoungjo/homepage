// Renders the built /cv page to public/cv.pdf with headless Chrome.
//
//   npm run build && npm run cv
//
// Chrome is used rather than a PDF library because the page's print CSS (page
// size, margins, break rules) is what defines the layout; anything else would
// mean maintaining the design twice.

import { execFile } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, resolve } from 'node:path';
import { promisify } from 'node:util';

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const dist = resolve(root, 'dist');
const page = resolve(dist, 'cv/index.html');
const out = resolve(root, 'public/cv.pdf');

if (!existsSync(page)) {
  console.error('dist/cv/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error(`No Chrome found. Looked in:\n  ${CHROME_CANDIDATES.join('\n  ')}`);
  process.exit(1);
}

// The page references its assets by root-relative URLs (/_astro/...), which a
// file:// load would resolve against the filesystem root. Serving dist/ over
// HTTP resolves them exactly as the deployed site does.
const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
const server = createServer((req, res) => {
  let file = resolve(dist, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  if (!extname(file)) file = resolve(file, 'index.html');
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

mkdirSync(dirname(out), { recursive: true });
await promisify(execFile)(
  chrome,
  [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${out}`,
    `${origin}/cv/`,
  ],
);
server.close();

// `astro build` copies public/ into dist/ before this script runs, so the
// freshly written PDF is mirrored to keep a local preview in step.
const mirrored = resolve(root, 'dist/cv.pdf');
if (existsSync(dirname(mirrored))) copyFileSync(out, mirrored);

console.log(`Wrote ${out.replace(root + '/', '')}`);
