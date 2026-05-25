// Central site config — edit links/bio here, no component changes needed.
export const SITE = {
  name: 'Hye-Young Jo',
  greeting: "Hi, I'm Hye-Young,",
  tagline: 'An HCI researcher, a Kendo enthusiast, a filmmaker, and an artist.',
  // Two short hero paragraphs (HTML: key entities linked + key terms bold, like the original site).
  intro:
    'I am a Ph.D. student in <a href="https://www.colorado.edu/cs/" target="_blank" rel="noopener">Computer Science</a> at the <a href="https://www.colorado.edu/" target="_blank" rel="noopener">University of Colorado Boulder</a>, advised by <a href="https://ryosuzuki.org/" target="_blank" rel="noopener">Prof. Ryo Suzuki</a>.',
  research:
    'My research explores how <strong>generative AI</strong> and <strong>extended reality</strong> can enable <strong>embodied learning</strong> and <strong>creative living</strong>. My work has been recognized and supported by the <a href="https://www.colorado.edu/graduateschool/2025/10/24/cu-boulder-graduate-student-named-google-phd-fellow" target="_blank" rel="noopener">Google Ph.D. Fellowship</a>.',
  researchInterests: [
    'Human-Computer Interaction',
    'Human-AI Interaction',
    'Creativity Support Tools',
    'XR Interaction',
    'Embodied AI',
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
  paper: 'Research',
  design: 'Research',
  xr: 'XR',
  film: 'Film',
  art: 'Art',
};

// Order types appear in the filter bar.
export const TYPE_ORDER = ['paper', 'xr', 'film', 'art'];
