// Central site config — edit links/bio here, no component changes needed.
export const SITE = {
  name: 'Hye-Young Jo',
  tagline: 'An HCI researcher, a Kendo enthusiast, a filmmaker, and an artist.',
  intro:
    'Ph.D. student in Computer Science at the University of Colorado Boulder, advised by Prof. Ryo Suzuki (Programmable Reality Lab, ATLAS Institute).',
  email: 'hye-young.jo@colorado.edu',
  cv: 'https://drive.google.com/file/d/1aD67ueC10ioStVUcb-Th5bKqan8H3bTk/view',
  socials: {
    scholar: 'https://scholar.google.com/citations?user=vSQMUMgAAAAJ&hl=en',
    github: 'https://github.com/hyeyoungjo',
    linkedin: 'https://www.linkedin.com/in/hye-young-jo-2743b189/',
    x: 'https://x.com/heyyoungsoul',
    instagram: 'https://www.instagram.com/heyyoungsoul/',
  },
};

// Display labels for the project `type` field (used by gallery filters + cards).
export const TYPE_LABELS: Record<string, string> = {
  paper: 'Publication',
  design: 'UX Research',
  xr: 'AR/VR',
  film: 'Film',
  art: 'Fine Art',
};

// Order types appear in the filter bar.
export const TYPE_ORDER = ['paper', 'design', 'xr', 'film', 'art'];
