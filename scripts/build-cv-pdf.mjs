// Renders the built /cv page to public/Jo_CV.pdf with headless Chrome.
//
//   npm run build && npm run cv
//
// Chrome is used rather than a PDF library because the page's print CSS (page
// size, margins, break rules) is what defines the layout; anything else would
// mean maintaining the design twice.

import { execFile } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, resolve } from 'node:path';
import { promisify } from 'node:util';
import { PDFDocument } from 'pdf-lib';

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const dist = resolve(root, 'dist');
const page = resolve(dist, 'cv/index.html');
const out = resolve(root, 'public/Jo_CV.pdf');

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
    // Section headings become PDF bookmarks, so a reader can jump between
    // sections from the viewer's sidebar.
    '--generate-pdf-document-outline',
    `--print-to-pdf=${out}`,
    `${origin}/cv/`,
  ],
);
server.close();

// Chrome writes only the title; the rest of the document properties are set
// here so the file identifies its author wherever it is opened.
const pdf = await PDFDocument.load(readFileSync(out), { updateMetadata: false });
pdf.setTitle('Hye-Young Jo · Curriculum Vitae', { showInWindowTitleBar: true });
pdf.setAuthor('Hye-Young Jo');
pdf.setSubject('Curriculum vitae');
pdf.setKeywords(['Human-Computer Interaction', 'human-AI interaction', 'creativity support tools', 'adaptive media', 'embodied interaction']);
pdf.setCreator('hyeyoungjo.com');
writeFileSync(out, await pdf.save({ useObjectStreams: false }));

// `astro build` copies public/ into dist/ before this script runs, so the
// freshly written PDF is mirrored to keep a local preview in step.
// /cv.pdf is a stable alias for the fellowship form and older links.
const aliases = ['Jo_CV.pdf', 'cv.pdf'];
for (const name of aliases) {
  if (name !== 'Jo_CV.pdf') copyFileSync(out, resolve(root, 'public', name));
  const mirrored = resolve(root, 'dist', name);
  if (existsSync(dirname(mirrored))) copyFileSync(out, mirrored);
}

console.log(`Wrote ${out.replace(root + '/', '')}`);
