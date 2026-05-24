// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Final public URL (used for sitemap/SEO absolute links). The custom domain
  // itself is connected last (via public/CNAME + DNS) so the live Wix site is
  // not interrupted during development. No `base` needed for an apex domain.
  site: 'https://hyeyoungjo.com',
});
