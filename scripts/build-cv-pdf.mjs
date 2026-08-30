// Renders the built /cv page to public/cv.pdf with headless Chrome.
//
//   npm run build && npm run cv
//
// Chrome is used rather than a PDF library because the page's print CSS (page
// size, margins, break rules) is what defines the layout; anything else would
// mean maintaining the design twice.

import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const page = resolve(root, 'dist/cv/index.html');
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

mkdirSync(dirname(out), { recursive: true });
execFileSync(
  chrome,
  [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${out}`,
    // Paged.js needs a moment to lay the pages out before the print.
    '--virtual-time-budget=10000',
    `file://${page}?paged=1`,
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] },
);

// `astro build` copies public/ into dist/ before this script runs, so the
// freshly written PDF is mirrored to keep a local preview in step.
const mirrored = resolve(root, 'dist/cv.pdf');
if (existsSync(dirname(mirrored))) copyFileSync(out, mirrored);

console.log(`Wrote ${out.replace(root + '/', '')}`);
