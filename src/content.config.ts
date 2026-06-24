import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// "projects" collection.
// Auto-discovery: every folder with an `index.md` under src/content/projects/
// is picked up automatically — adding a project needs ZERO code edits here.
// The entry id (and therefore the URL slug) equals the folder name.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Drives the gallery type filter.
      type: z.enum(['research', 'art', 'film', 'xr', 'tool']),
      year: z.number().int(),
      authors: z.array(z.string()).default([]),
      venue: z.string().optional(),
      abstract: z.string().optional(),
      // Co-located image (e.g. ./teaser.png) — auto-optimized because it lives under src/.
      teaser: image().optional(),
      teaserAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      award: z.string().optional(),
      acceptanceRate: z.string().optional(),
      links: z
        .object({
          pdf: z.string().url().optional(),
          doi: z.string().url().optional(),
          youtube: z.string().url().optional(),
          preview: z.string().url().optional(),
          presentation: z.string().url().optional(),
          supplement: z.string().url().optional(),
          website: z.string().url().optional(),
          github: z.string().url().optional(),
        })
        .default({}),
      bibtex: z.string().optional(),
      // Optional full-resolution original (e.g. a Google Drive link for artworks).
      originalLink: z.string().url().optional(),
      // Show on the home page "Selected Work" section.
      featured: z.boolean().default(false),
      // Hide from the site without deleting the folder.
      draft: z.boolean().default(false),
    }),
});

// "news" collection — a single YAML data file of dated updates.
const news = defineCollection({
  loader: file('./src/content/news/news.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    link: z.string().url().optional(),
  }),
});

export const collections = { projects, news };
