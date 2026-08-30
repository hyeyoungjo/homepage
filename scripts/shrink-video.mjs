#!/usr/bin/env node
/**
 * Re-encode a video to a target file size. Run: `npm run shrink -- <file> <MB> [options]`
 *
 *   npm run shrink -- clip.mp4 15
 *   npm run shrink -- clip.mp4 15 --height 720 --ssim
 *   npm run shrink -- clip.mp4 20 --out public/p/slug/clip.mp4
 *
 * Two-pass at a fixed bitrate, rather than the CRF the assets pipeline uses.
 * CRF sets the quality and lets the size fall where it may; this sets the size
 * outright, which is what matters for a file being committed and served. At the
 * same size the two are within a rounding error on SSIM, so nothing is lost by
 * choosing the size.
 *
 * Codec and container stay H.264/mp4, the only combination every browser plays.
 * Resolution is left alone unless --height asks otherwise.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const run = promisify(execFile);

const DEFAULTS = {
  audioKbps: 96,
  preset: 'slow',
  height: null, // keep the source resolution
};

function usage(msg) {
  if (msg) console.error(`\n${msg}`);
  console.error(`
Usage: npm run shrink -- <input> <targetMB> [options]

  --height <px>   scale to this height (keeps aspect); default: keep source
  --audio <kbps>  audio bitrate; default: ${DEFAULTS.audioKbps}
  --preset <p>    x264 preset; default: ${DEFAULTS.preset}
  --out <path>    output file; default: <input>-<MB>mb.mp4
  --ssim          measure quality against the source (slower)
`);
  process.exit(1);
}

const argv = process.argv.slice(2);
if (argv.length < 2) usage();

const input = argv[0];
const targetMB = Number(argv[1]);
if (!Number.isFinite(targetMB) || targetMB <= 0) usage(`Not a size in MB: ${argv[1]}`);

const opts = { ...DEFAULTS, out: null, ssim: false };
for (let i = 2; i < argv.length; i++) {
  const flag = argv[i];
  const next = () => argv[++i] ?? usage(`${flag} needs a value`);
  if (flag === '--height') opts.height = Number(next());
  else if (flag === '--audio') opts.audioKbps = Number(next());
  else if (flag === '--preset') opts.preset = next();
  else if (flag === '--out') opts.out = next();
  else if (flag === '--ssim') opts.ssim = true;
  else usage(`Unknown option: ${flag}`);
}

const mb = (bytes) => bytes / 1048576;

async function probe(file) {
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height',
    '-show_entries', 'format=duration',
    '-of', 'json',
    file,
  ]);
  const data = JSON.parse(stdout);
  return {
    width: data.streams[0].width,
    height: data.streams[0].height,
    duration: Number(data.format.duration),
  };
}

async function ssim(encoded, source, height) {
  // The reference has to match the encode's resolution for the filter to run.
  const ref = height ? `[1:v]scale=-2:${height}[ref];[0:v][ref]ssim` : '[0:v][1:v]ssim';
  const { stderr } = await run('ffmpeg', [
    '-v', 'info', '-i', encoded, '-i', source, '-lavfi', ref, '-f', 'null', '-',
  ]).catch((e) => e);
  return stderr?.match(/All:([\d.]+)/)?.[1] ?? '?';
}

const stat = await fs.stat(input).catch(() => usage(`No such file: ${input}`));
const info = await probe(input);

// size(MB) = (video + audio kbps) * duration / 8192  ->  solve for video
const videoKbps = Math.floor((targetMB * 8192) / info.duration) - opts.audioKbps;
if (videoKbps < 100) {
  usage(
    `${targetMB}MB over ${info.duration.toFixed(0)}s leaves only ${videoKbps}kbps for video.\n` +
      `Raise the target, or lower --audio.`,
  );
}

const out =
  opts.out ?? path.join(path.dirname(input), `${path.basename(input, path.extname(input))}-${targetMB}mb.mp4`);
const scale = opts.height ? ['-vf', `scale=-2:${opts.height}`] : [];
const passLog = path.join(os.tmpdir(), `shrink-${process.pid}`);

console.log(
  `${path.basename(input)}  ${info.width}x${info.height}  ${info.duration.toFixed(0)}s  ${mb(stat.size).toFixed(1)}MB`,
);
console.log(`target ${targetMB}MB  ->  video ${videoKbps}k + audio ${opts.audioKbps}k, two passes`);

const common = ['-i', input, ...scale, '-c:v', 'libx264', '-b:v', `${videoKbps}k`, '-preset', opts.preset, '-passlogfile', passLog];

await run('ffmpeg', ['-y', '-v', 'error', ...common, '-pass', '1', '-an', '-f', 'null', '/dev/null']);
await run('ffmpeg', [
  '-y', '-v', 'error', ...common, '-pass', '2',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', `${opts.audioKbps}k`,
  '-movflags', '+faststart',
  out,
]);

for (const f of await fs.readdir(path.dirname(passLog))) {
  if (f.startsWith(path.basename(passLog))) await fs.rm(path.join(path.dirname(passLog), f)).catch(() => {});
}

const after = await fs.stat(out);
console.log(`\nWrote ${out}  ${mb(after.size).toFixed(1)}MB  (was ${mb(stat.size).toFixed(1)}MB)`);

if (opts.ssim) {
  process.stdout.write('measuring SSIM against the source... ');
  console.log(await ssim(out, input, opts.height));
}
