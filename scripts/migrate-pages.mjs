#!/usr/bin/env node
/**
 * One-off migration: build project folders from the page-examples PDFs.
 * Extract images (pdfimages) + narrative text (pdftotext -layout) → index.md.
 * Images filtered to content-sized (skips UI icons); first kept image = teaser (card only),
 * the rest embedded in the body. Re-run safe (recreates each folder).
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const exec = promisify(execFile);
const PAGES = '/Users/hyeyoungjo/Downloads/page-examples';
const OUT = 'src/content/projects';
const MIN_DIM = 450;

const manifest = [
  { slug: 'summer', pdf: 'Summer', type: 'art', year: 2010, title: 'Summer' },
  { slug: 'subway', pdf: 'Subway', type: 'art', year: 2012, title: 'Subway' },
  { slug: 'a-touching-gaze', pdf: 'A Touching Gaze', type: 'art', year: 2014, title: 'A Touching Gaze' },
  { slug: 'the-great-exodus', pdf: 'The Great Exodus', type: 'art', year: 2014, title: 'The Great Exodus' },
  { slug: 'dirt-luv', pdf: 'Dirt Luv for Graduation', type: 'art', year: 2015, title: 'Dirt Luv for Graduation' },
  { slug: 'paper-animation', pdf: 'Paper Animation', type: 'art', year: 2016, title: 'Paper Animation', youtube: 'https://www.youtube.com/watch?v=u90llQ3Xf40' },
  { slug: 'lapses', pdf: 'Lapses', type: 'art', year: 2018, title: 'Lapses' },
  { slug: 'asapeople', pdf: 'ASAPeople', type: 'art', year: 2021, title: 'ASAPeople' },
  { slug: 'ar-the-tide', pdf: 'AR The Tide', type: 'xr', year: 2019, title: 'AR The Tide' },
  { slug: 'vr-the-tide', pdf: 'VR The Tide', type: 'xr', year: 2020, title: 'VR The Tide' },
  { slug: 'vr-fashion-for-help', pdf: 'VR Fashion for Help', type: 'xr', year: 2019, title: 'VR Fashion for Help' },
  { slug: 'lg-uplus-ar-studio', pdf: 'LG UPlus AR Studio', type: 'xr', year: 2019, title: 'LG UPlus AR Studio' },
  { slug: 'meta-boxing', pdf: 'Meta-Boxing', type: 'xr', year: 2021, title: 'Meta-Boxing', youtube: 'https://youtu.be/-d2arU9pzFM' },
  { slug: '1987-when-the-day-comes', pdf: '1987_ When the Day Comes', type: 'film', year: 2017, title: '1987: When the Day Comes' },
  { slug: 'along-with-the-gods-two-worlds', pdf: 'Along with The Gods_ The Two Worlds', type: 'film', year: 2017, title: 'Along with the Gods: The Two Worlds' },
  { slug: 'along-with-the-gods-last-49-days', pdf: 'Along with The Gods_ The Last 49 Days', type: 'film', year: 2018, title: 'Along with the Gods: The Last 49 Days' },
];

const NAV = new Set([
  'all', 'home', 'about', 'news', 'more', 'research', 'art', 'film',
  'publication', 'ux research', 'ar/vr', 'ar/vr prototyping', 'commercial film', 'fine art',
]);

function blocks(raw, title) {
  const out = raw
    .replace(/\f/g, '\n\n')
    .split(/\n\s*\n/)
    .map((b) => b.split('\n').map((l) => l.trim()).filter(Boolean).join(' ').replace(/\s+/g, ' ').trim())
    .filter((b) => b.length > 1)
    .filter((b) => !NAV.has(b.toLowerCase()))
    .filter((b) => b !== 'Hye-Young Jo' && b.toLowerCase() !== title.toLowerCase())
    .filter(
      (b) =>
        !/wix|get started|this website|wixsite|hyeyoungjo\.com|hye-young jo\s+home|last update|^©|boulder, co|curriculum vitae|google scholar|kendo enthusiast|read more|ar\/vr prototyping|commercial film|^previous$|^next$|^\d+\/\d+\/\d+,|^\d+\/\d+$|^[a-z]{3,4}\.? \d{1,2}, \d{4}$/i.test(b)
    );
  // drop adjacent duplicates (title/caption often repeat)
  return out.filter((b, i) => i === 0 || b !== out[i - 1]);
}

async function run() {
  for (const m of manifest) {
    const dir = path.join(OUT, m.slug);
    await fs.rm(dir, { recursive: true, force: true });
    await fs.mkdir(dir, { recursive: true });
    const pdf = path.join(PAGES, `${m.pdf}.pdf`);

    // images
    await exec('pdfimages', ['-png', pdf, path.join(dir, 'raw')]);
    const raws = (await fs.readdir(dir)).filter((f) => f.startsWith('raw-') && f.endsWith('.png')).sort();
    const kept = [];
    for (const f of raws) {
      const fp = path.join(dir, f);
      const meta = await sharp(fp).metadata().catch(() => null);
      if (meta && Math.max(meta.width || 0, meta.height || 0) >= MIN_DIM) kept.push(fp);
      else await fs.rm(fp);
    }
    const gallery = [];
    let teaser = null;
    for (let i = 0; i < kept.length && i < 14; i++) {
      const name = i === 0 ? 'teaser.png' : `image-${String(i).padStart(2, '0')}.png`;
      await fs.rename(kept[i], path.join(dir, name));
      if (i === 0) teaser = name;
      else gallery.push(name);
    }
    for (const f of await fs.readdir(dir)) if (f.startsWith('raw-')) await fs.rm(path.join(dir, f));

    // text
    const { stdout } = await exec('pdftotext', ['-layout', pdf, '-']);
    const bs = blocks(stdout, m.title);
    const abstract = bs[0] && bs[0].length >= 20 && bs[0].length <= 400 ? bs[0] : '';
    const bodyParas = abstract ? bs.slice(1) : bs;

    const fm = [
      '---',
      `title: ${JSON.stringify(m.title)}`,
      `type: "${m.type}"`,
      `year: ${m.year}`,
      'authors: ["Hye-Young Jo"]',
      abstract ? `abstract: ${JSON.stringify(abstract)}` : null,
      teaser ? `teaser: ./${teaser}` : null,
      teaser ? `teaserAlt: ${JSON.stringify(m.title)}` : null,
      m.youtube ? `links:\n  youtube: "${m.youtube}"` : null,
      'featured: false',
      'draft: false',
      '---',
      '',
    ].filter((x) => x !== null).join('\n');

    let body = bodyParas.join('\n\n');
    if (gallery.length) body += '\n\n' + gallery.map((g) => `![](./${g})`).join('\n\n');
    await fs.writeFile(path.join(dir, 'index.md'), fm + body + '\n');
    console.log(`  ${m.slug}: teaser=${!!teaser} gallery=${gallery.length} paras=${bodyParas.length} abstract="${abstract.slice(0, 50)}"`);
  }
  console.log('migrate-pages done.');
}

run();
