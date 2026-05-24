# Plan: Hye-Young Jo Homepage — Astro + GitHub Pages

## Context (왜 만드는가)
Hye-Young is migrating her personal academic/portfolio site off Wix (current: hyeyoungjo.com)
to a self-managed, version-controlled site in her own GitHub repo
(https://github.com/hyeyoungjo/homepage, branch `main`, currently only a LICENSE).

The driving goal: **maintenance with zero coding for new content.** Today, adding work to the
Wix site (or to reference Next.js sites like advisor Ryo Suzuki's, which needs manual ID
registration in `next.config.js`) is friction. She wants: *create one folder, drop in a markdown
file + images + links, and the project auto-appears* — in a unified, filterable gallery that
clearly distinguishes her mixed body of work (paper / film / art), while preserving all current
content (9 publications, 3 projects, news, bio, social links).

Decisions confirmed with the user:
- **Astro** + Content Collections (best fit for "drop folder, auto-render" + built-in filtering/image optimization).
- Move custom domain **hyeyoungjo.com** (apex) to GitHub Pages; `www` auto-redirects to apex.
- **Unified filterable gallery** (type/year/tag filters + keyword search), Justin-Matejka style.
- **Fresh, clean minimal academic design** (inspired by adazhao.info / justinmatejka.com).
- **Process over results positioning.** Each project gets its OWN long-form page at a root-level
  URL (e.g. hyeyoungjo.com/realitysketch/), in the style of ryosuzuki.org/dynablock/ and
  ryosuzuki.org/realitysketch/ — step-by-step headed sections, lots of inline figures, telling
  the *process/method story*, not just showing the final result. These detail pages are the
  centerpiece of the site, not an afterthought.

## Key technical decision (load-bearing)
Project content MUST live under `src/content/projects/` (NOT a repo-root `content/`). Only when
content is under `src/` does Astro's `image()` schema helper and markdown-body image optimization
resolve **co-located relative image paths** (`teaser: ./teaser.png`, `![](./process-1.png)`).
A base outside `src/` breaks this and would force `public/` copies or per-image imports — which
violates the "just drop a png" requirement. Verified against current Astro 5 docs.

---

## Target structure
```
homepage/
├── LICENSE                         (exists)
├── .gitignore                      node_modules, dist, .astro, .DS_Store
├── package.json  astro.config.mjs  tsconfig.json  README.md
├── .github/workflows/deploy.yml    GitHub Actions → Pages (withastro/action@v6 + deploy-pages@v5)
├── public/
│   ├── CNAME                       single line: hyeyoungjo.com
│   ├── favicon.svg  og-default.png
└── src/
    ├── content.config.ts           collections + Zod schema  (THE config)
    ├── styles/global.css           design tokens, base styles (plain CSS, no Tailwind)
    ├── assets/profile.jpg          bio headshot (imported/optimized)
    ├── lib/{youtube.ts, filters.ts}
    ├── layouts/{BaseLayout.astro, ProjectLayout.astro}
    ├── components/{BaseHead, Header, Footer, Hero, ProjectCard, Gallery,
    │               NewsList, SocialLinks, YouTubeEmbed, LinkRow}.astro
    ├── pages/
    │   ├── index.astro             Hero + Selected Work (featured) + recent News + Gallery
    │   ├── work/index.astro        full filterable gallery
    │   ├── [slug].astro            ROOT-LEVEL detail page per project (e.g. /realitysketch/)
    │   ├── about.astro             bio, education, experience, research, social, CV
    │   └── 404.astro
    └── content/
        ├── projects/               ★ each subfolder = one project, AUTO-DISCOVERED
        │   └── <slug>/index.md + teaser.png + process-*.png
        └── news/news.yaml          single data file of news items
```

## Content schema — `src/content.config.ts`
ONE unified `projects` collection (a `type` field drives filtering) + a tiny `news` collection.
```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }), // id === folder name
  schema: ({ image }) => z.object({
    title: z.string(),
    type: z.enum(['paper', 'film', 'art', 'design']),
    year: z.number().int(),
    authors: z.array(z.string()).default([]),
    venue: z.string().optional(),
    abstract: z.string().optional(),
    teaser: image().optional(),
    teaserAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    award: z.string().optional(),
    acceptanceRate: z.string().optional(),
    links: z.object({
      pdf: z.string().url().optional(),
      doi: z.string().url().optional(),
      youtube: z.string().url().optional(),
      website: z.string().url().optional(),
      github: z.string().url().optional(),
    }).default({}),
    bibtex: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: file('./src/content/news/news.yaml'),
  schema: z.object({ date: z.coerce.date(), text: z.string(), link: z.string().url().optional() }),
});

export const collections = { projects, news };
```
Using `index.md` per folder makes the slug deterministically equal the folder name, so
`[slug].astro` resolves with zero registration.

## Filtering & search (client-side, no backend, near-zero JS)
Render the full grid server-side; each `ProjectCard` carries `data-type`, `data-year`,
`data-tags`, and a precomputed lowercased `data-search` (title+authors+venue+abstract+tags).
`src/lib/filters.ts` (an Astro `<script>`) ANDs the active type/year/tag/query predicates and
toggles each card's `hidden`, updates a result count + empty state, and optionally syncs state to
the URL query (`?type=film`) via `history.replaceState`. Filter controls are built from the actual
collection data so they never go stale. Data is inline in the HTML — no fetch/JSON.

## Project detail page = the process story (CENTERPIECE) — `src/pages/[slug].astro`
Root-level URL so links read `hyeyoungjo.com/realitysketch/` (matches ryosuzuki.org/dynablock/).
Astro resolves static routes (about/work/404/index) before the dynamic `[slug].astro`, so the only
reserved slugs are `about`, `work`, `404`. Confirmed structure of the reference pages:
title + authors + venue + award badge → links row (PDF/video/slides/GitHub/DOI/arXiv) → teaser →
abstract → **multiple headed step sections with inline figures (often 3-up, full width)** →
citation/BibTeX block.
```astro
---
import { getCollection, render } from 'astro:content';
import ProjectLayout from '../layouts/ProjectLayout.astro';
export async function getStaticPaths() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.map((p) => ({ params: { slug: p.id }, props: { project: p } }));
}
const { project } = Astro.props;
const { Content } = await render(project);   // the markdown PROCESS body → <Content/>
---
<ProjectLayout project={project}><Content /></ProjectLayout>
```
`ProjectLayout.astro` renders the chrome (title, authors, venue, award badge, `LinkRow`,
teaser `<Image>`, `YouTubeEmbed` if `links.youtube`, abstract, then `<slot/>` for the body,
then citation/BibTeX `<details>`). **The markdown body is the star** — she writes step-by-step
headed sections (`## Step 1: …`) and drops figures inline; `global.css` styles markdown images
to full width with captions (from alt text) and styles consecutive images into responsive rows
(`figure + figure` flex) so a 2–3-up figure strip needs no special syntax. For richer layouts
(explicit galleries, side-by-side video) `index.md` can be renamed `index.mdx` and use small
optional components (`<Figure>`, `<Row>`) — but plain markdown is the default so "drop png + write
text" always works.

**Positioning:** gallery cards and the hero copy lean into *process* (e.g. card hover/label hints
at "see the process"); the detail page foregrounds method/iteration over the final artifact.

## YouTube / links
`src/lib/youtube.ts` → `getYouTubeId(url)` handles youtu.be / watch?v= / embed/ / shorts/.
`YouTubeEmbed.astro` → responsive 16:9 lazy iframe (`youtube-nocookie.com/embed/{id}`).
`LinkRow.astro` → renders a button only for present `links.*` keys. CV = Google Drive link
(matches current setup; avoids committing a large PDF).

## Deployment
`astro.config.mjs`: `site: 'https://hyeyoungjo.com'`, no `base` (apex, not project page).
`public/CNAME`: `hyeyoungjo.com`. `.github/workflows/deploy.yml`: on push to main →
`actions/checkout@v6` → `withastro/action@v6` (build) → `actions/deploy-pages@v5`; permissions
`pages: write`, `id-token: write`; `concurrency: pages`.
One-time: GitHub repo Settings → Pages → Source = **GitHub Actions**; set custom domain; enforce HTTPS.

**DNS records the user adds at her registrar:**
| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 / .109.153 / .110.153 / .111.153 (four records) |
| CNAME | www | hyeyoungjo.github.io. |

## "Add a new project" runbook (also goes in README.md)
1. Create `src/content/projects/<slug>/` (folder name = URL).
2. Add `index.md`, paste frontmatter template, edit title/type/year/authors/venue/abstract/tags/links, set `featured: true` to surface on home.
3. Drop `teaser.png` (+ process images); `teaser: ./teaser.png`, body `![](./process-1.png)`.
4. `npm run dev` → card + `/<slug>` page + filters/search update automatically.
5. `git add . && git commit && git push` → Action deploys to hyeyoungjo.com. No config/route edits ever.

## Build order (each step explained + confirmed before moving on)
1. Scaffold Astro (minimal, TS strict): package.json, astro.config.mjs, tsconfig.json, .gitignore → `npm run dev` blank page works.
2. **Infra first:** astro.config (`site`), public/CNAME, deploy.yml → push, confirm Action green + Pages serves.
3. `src/content.config.ts` (schema).
4. Sample content: 2–3 real entries (kare-mcm + one paper) + news.yaml → validates schema + image() early.
5. Chrome: BaseLayout, BaseHead, Header, Footer, global.css (tokens).
6. Components: ProjectCard, YouTubeEmbed (+youtube.ts), LinkRow, SocialLinks, NewsList.
7. Gallery + filters.ts (wire data-attributes).
8. Pages: index, work/index, [slug] (root-level detail + ProjectLayout), about, 404.
9. Migrate all content: 9 publications + 3 projects + About from bio.
10. Styling/responsiveness pass (serif headings + clean sans body, whitespace, single accent, `repeat(auto-fill, minmax())` grid, mobile filter bar).
11. DNS + Enforce HTTPS + verify live.

## Verification
- `npm run dev`: home/work/about + a sample `/<slug>` detail page render; teaser + body images load optimized (`/_astro/`); markdown step sections + inline figures look right.
- **Drop-folder proof:** add `src/content/projects/__test/index.md` + teaser (`type: film`), refresh → new card appears, `/__test` resolves, Film filter + year/tag + search all include it, with NO code edits. Delete after.
- Filter test: type buttons hide/show correctly; year narrows; search substring-matches; count + empty state update.
- `npm run build && npm run preview`: no schema errors; each project page generated at dist root (e.g. dist/realitysketch/index.html); dist/CNAME present; images hashed.
- Push to main → Action green; live at https://hyeyoungjo.com (HTTPS, www→apex redirect).

## Content to migrate (from current Wix site)
- 9 publications (2021–2026): TingleTouch, Generative Lecture, Map2Video, Forearm-deformation (ISMAR'25),
  CollageVis (CHI'24), TrainerTap (UIST'23), FlowAR (CHI'23), VR-Remote-Education (HCIK'22, Best Paper),
  GamesBond (CHI'21, Honorable Mention) — each with authors/venue/year/abstract/PDF/YouTube/DOI/award.
- 3 projects: KARE-MCM (art/design, iF + IDEA awards), FigureOUT (tool), Meta-Boxing (art/VR).
- News entries (dated), About (CU Boulder PhD, advisor Ryo Suzuki, KAIST MS, SNU BFA, Dexter Studios VFX),
  social: email, Google Scholar, LinkedIn, GitHub, X, Instagram, CV (Drive link).
