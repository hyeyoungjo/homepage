# Plan: Hye-Young Jo Homepage — Astro + GitHub Pages

## Context (왜 만드는가)
Hye-Young is migrating her personal academic/portfolio site off Wix to her own GitHub repo
(https://github.com/hyeyoungjo/homepage, branch `main`). Goal: **maintainable, process-centric
portfolio with near-zero coding for new content.**

What "process-centric" means (clarified by the user): **one markdown file per project** where she
writes the *story of how she made the project* and **inlines images, GIFs, and mp4** as she
explains — like ryosuzuki.org/dynablock. The process narrative is the centerpiece, not just the
final result.

Scope discovered in ~/Downloads is much larger than a few papers — ~20 projects across **art, xr,
film, and research/papers**, most with `process/` `making/` `concept/` subfolders of imagery
(~1.2 GB raw: 210 png, 185 jpg, 32 large GIFs @16–24 MB each, 10 mp4 up to 52 MB). Filenames are
messy (Korean, `IMG_xxxx`, `KakaoTalk_...`, mixed case).

### Decisions confirmed with the user
- **Astro** + Content Collections; **homepage** repo kept (project page → temp URL
  `hyeyoungjo.github.io/homepage/`; local `npm run dev` for dev preview). [Steps 1–2 DONE, deploy green.]
- **Custom domain hyeyoungjo.com** connected **last** (so live Wix is not interrupted).
- **Unified filterable gallery** (type/year/tag + search); **fresh clean minimal** design.
- **One markdown per project = metadata + process narrative with inline media.**
- **Hybrid media** (resolves the 1.2 GB / quality problem):
  | Media | Home | Quality |
  |---|---|---|
  | Images (stills, process shots, teasers) | **GitHub**, downsized ~2000px → Astro webp/avif | no visible loss |
  | Process GIFs | **convert GIF→mp4/webm → GitHub** inline | improves (GIF = 256-color) |
  | Videos (showreels, demos) | **YouTube** embed | YouTube-managed |
  | Originals / masters | **Google Drive** (her paid archive) | untouched |
  | PDFs (papers, CV) | **Google Drive** links | untouched |

## Key technical decisions (load-bearing)
1. Project content lives under **`src/content/projects/`** (NOT repo-root) so co-located images in
   markdown (`./teaser.png`, `![](./step-1.png)`) are auto-optimized by Astro. Verified for Astro 5.
2. **Source media must be web-sized before commit** — Astro optimizes the *output*, but raw sources
   stay in git. A local `npm run assets` step downsizes images and converts GIFs→mp4 so the repo
   stays lean (target < ~250 MB). Big videos never enter git (→ YouTube).

---

## Target structure
```
homepage/
├── .github/workflows/deploy.yml      [DONE] build → Pages on push to main
├── astro.config.mjs                  site + custom remark plugins (mp4/youtube)
├── scripts/process-assets.mjs        [NEW] sharp (image downsize) + ffmpeg (GIF→mp4) pipeline
├── public/{CNAME(last), favicon.svg(from hyj.ico), og-default.png}
└── src/
    ├── content.config.ts             [DONE] type enum incl. xr + originalLink
    ├── styles/global.css             [DONE] design tokens + markdown/figure/video styles
    ├── assets/profile.jpg            hero headshot (from Downloads/profile)
    ├── lib/{youtube.ts[DONE], filters.ts}
    ├── plugins/{remark-video.mjs, remark-youtube.mjs}   [NEW] markdown authoring magic
    ├── layouts/{BaseLayout.astro[DONE], ProjectLayout.astro[DONE]}
    ├── components/{BaseHead, Header, Footer, Hero, ProjectCard, Gallery,
    │               NewsList, SocialLinks, YouTubeEmbed[DONE], VideoClip, LinkRow[DONE]}.astro
    ├── pages/{index.astro, work/index.astro, [slug].astro[DONE], about.astro, 404.astro}
    └── content/
        ├── projects/<slug>/index.md  + co-located web-sized images + converted .mp4 clips
        └── news/news.yaml            [DONE]
```

### One project folder (the authoring model)
```
src/content/projects/package-for-me/
├── index.md          frontmatter (metadata) + PROCESS NARRATIVE body
├── teaser.jpg        web-sized
├── step-01.jpg ...   web-sized process images (ordered names)
└── eating.mp4        converted from eating.gif
```
`index.md` body is plain markdown the user writes:
```markdown
## Concept
Text about the idea...
![Early sketch](./step-01.jpg)

## Making
How it was built...
![Module test](./eating.mp4)        <!-- .mp4/.webm auto-render as <video> -->

https://youtu.be/XXXX                <!-- a bare YouTube URL on its own line auto-embeds -->
```

## Authoring conventions (uniform + easy — nothing to memorize)
Two small custom remark plugins (registered in `astro.config.mjs` `markdown.remarkPlugins`):
- **`remark-video.mjs`** — any `![caption](./x.mp4|.webm)` becomes a responsive
  `<video muted loop playsinline controls>` (short process clips can autoplay). Same `![]()` syntax
  as images, so the user never switches notation.
- **`remark-youtube.mjs`** — a **bare YouTube URL on its own line** becomes a lazy 16:9 embed.

## Content schema — `src/content.config.ts` [DONE]
ONE unified `projects` collection (a `type` field drives filtering) + a `news` collection.
Type enum: `paper | art | film | xr | design`. Fields: title, year, authors, venue, abstract,
teaser(image()), teaserAlt, tags, award, acceptanceRate, links{pdf,doi,youtube,website,github},
bibtex, originalLink, featured, draft. Auto-discovery via glob loader (folder name = slug); adding a
project needs ZERO code edits here.

## Asset pipeline — `scripts/process-assets.mjs` (`npm run assets`)
Run locally before committing new content. Idempotent. For each project folder:
- **Images** → `sharp`: resize to max 2000px long edge, strip metadata, re-encode; skip small files.
- **GIFs** → `ffmpeg`: convert `*.gif` → `*.mp4` (H.264, faststart); remove source GIF.
  (Requires `ffmpeg`; script prints `brew install ffmpeg` if missing.)
- **Videos** (large `*.mp4`) → flagged for the user to upload to YouTube (not committed).
- Prints a size report. Originals stay safe in ~/Downloads / Drive.

## Detail page = the process story — `src/pages/[slug].astro` + `ProjectLayout.astro` [DONE]
Root-level URL (`hyeyoungjo.com/<slug>/`). Header (title, authors, venue, year, award, LinkRow,
teaser) → abstract → primary YouTube → `<Content/>` narrative with inline optimized media. Markdown
images full-width; consecutive images flow into responsive rows. Optional BibTeX `<details>`.

## Gallery / filter / search
`Gallery.astro` renders non-draft projects as `ProjectCard`s with `data-type/-year/-tags/-search`;
`src/lib/filters.ts` (vanilla `<script>`) ANDs type/year/tag/query, toggles `hidden`, syncs to URL.
Types shown: Paper / Art / Film / XR.

## Pages
- `index.astro` — Hero (name + "HCI researcher · Kendo · filmmaker · artist") + Selected Work
  (featured) + recent News + gallery (or link to /work).
- `work/index.astro` — full filterable gallery.
- `[slug].astro` [DONE] — auto-generated process detail page.
- `about.astro` — bio, education (KAIST MS, SNU BFA), experience (Dexter Studios VFX), research,
  SocialLinks (email, Scholar, LinkedIn, GitHub, X, Instagram) + CV (Drive link).
- `404.astro`.

## Deployment (mostly DONE)
`astro.config.mjs` `site: 'https://hyeyoungjo.com'`; deploy workflow green. **Last step:** add
`public/CNAME`, set GitHub custom domain, DNS A records (185.199.108–111.153) + `www` CNAME →
hyeyoungjo.github.io, enforce HTTPS. Don't touch DNS until the site is ready (keeps Wix live).
NOTE: until the custom domain, the github.io project-page URL shows broken CSS/images (root-path
assets) — that's expected; **local `npm run dev` is the accurate preview**.

## Content migration (~20 projects from ~/Downloads → src/content/projects/)
Per project: make `<slug>/`, run assets pipeline (downsize/convert + clean ordered filenames),
write `index.md` (metadata from the Wix inventory; narrative body = skeleton headings for the user
to fill), pick a teaser. Videos → user uploads to YouTube; originals → user keeps on Drive.

Proposed slugs/types (confirm/prune during migration; `featured` = home):
- **art**: one-to-one-bar, groping-sight, human-furniture, package-for-me, walking-spot,
  closet-inside-the-closet, painting
- **xr**: artide, vrtide, fashion-for-help, (meta-boxing — VR game, 26-page deck)
- **film**: film-compositing (+ showreels via YouTube; Fine-Art / VR-AR / Research reels)
- **paper**: collagevis [DONE sample], flowar, korea-hci-2022 (physical-computing-metaverse),
  gamesbond, trainertap, forearm-gesture, generative-lecture, map2video, tingletouch, hot-ice(?)
- **design**: kare-mcm, figureout
Drive PDFs provided for: cv, gamesbond, physical-computing-metaverse, flowar, trainertap, collagevis,
figureout, forearm-gesture, chameleon, poster.

## Build order
1. [DONE] Scaffold Astro. 2. [DONE] Deploy pipeline (green). 3. [DONE] Schema (xr, originalLink).
3.5 [DONE] Layout + first process detail page ([slug], ProjectLayout, YouTubeEmbed, LinkRow, CSS).
4. Remark plugins (mp4→video, bare-YouTube→embed). 5. Asset pipeline (sharp + ffmpeg) — verify on one
   art project. 6. Components: ProjectCard, Gallery+filters, SocialLinks, NewsList, Hero.
7. Pages: index (home), work (gallery), about, 404. 8. Migrate all ~20 projects. 9. Styling/responsive.
10. Domain + DNS + HTTPS.

## Verification
- **Authoring proof:** `![](./clip.mp4)` → `<video>`; bare YouTube URL → embed; `![](./img.png)` optimized.
- **Drop-folder proof:** new `<slug>/index.md` + teaser → card appears, `/<slug>` resolves, filters
  include it, NO code edits.
- **Asset pipeline:** `npm run assets` shrinks a 24 MB GIF to a small mp4 and a 6000px photo to ~2000px.
- Filter test; `npm run build && npm run preview` (no schema errors, pages under dist/, images hashed);
  push → Action green; finally live at hyeyoungjo.com (HTTPS, www→apex).
