// Central site config — edit links/bio here, no component changes needed.
export const SITE = {
  name: 'Hye-Young Jo',
  greeting: "Hi, I'm Hye-Young,",
  tagline: 'An HCI researcher, a Kendo enthusiast, a filmmaker, and an artist.',
  // Two short hero paragraphs (kept plain — no inline links, to avoid clutter).
  intro:
    'I am a Ph.D. student in Computer Science at the University of Colorado Boulder, advised by Prof. Ryo Suzuki in the Programmable Reality Lab at the ATLAS Institute.',
  research:
    'My research explores how generative AI and extended reality can enable embodied learning and creative living. My work has been recognized and supported by the Google Ph.D. Fellowship.',
  researchInterests: [
    'Human-Computer Interaction',
    'Human-AI Interaction',
    'Creativity Support Tools',
    'Generative Agents',
    'AI-driven Content Adaptation',
    'Embodied AI',
    'XR Interaction',
    'Augmented Instruction',
  ],
  audio: '/hi-im-hyeyoung.mp3',
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
