// Central site config — edit links/bio here, no component changes needed.
export const SITE = {
  name: 'Hye-Young Jo',
  greeting: "Hi, I'm Hye-Young,",
  tagline: 'An HCI researcher who came from fine art and film.',
  // Two short hero paragraphs (HTML: key entities linked + key terms bold, like the original site).
  intro:
    'I am a PhD student in <a href="https://www.colorado.edu/cs/" target="_blank" rel="noopener">Computer Science</a> at the <a href="https://www.colorado.edu/" target="_blank" rel="noopener">University of Colorado Boulder</a>, advised by <a href="https://ryosuzuki.org/" target="_blank" rel="noopener">Prof. Ryo Suzuki</a> in the <a href="https://www.colorado.edu/atlas/programmable-reality-lab" target="_blank" rel="noopener">Programmable Reality Lab</a> at the <a href="https://www.colorado.edu/atlas/" target="_blank" rel="noopener">ATLAS Institute</a>. I also worked as a research intern at <a href="https://global.fujitsu/en-us/local/technology/research/converging-lab" target="_blank" rel="noopener">Fujitsu</a> and <a href="https://www.research.autodesk.com/research-areas/science/human-computer-interaction-and-visualization/" target="_blank" rel="noopener">Autodesk</a>.',
  research:
    'My research goal is to <strong>expand people’s capacity to create and learn</strong> by building interactive systems with <strong>generative AI</strong> and <strong>extended reality</strong>. This work has been recognized and supported by the <a href="https://www.colorado.edu/graduateschool/2025/10/24/cu-boulder-graduate-student-named-google-phd-fellow" target="_blank" rel="noopener">Google PhD Fellowship</a>.',
  audio: '/hi-im-hyeyoung.mp3',
  email: 'hye-young.jo@colorado.edu',
  cv: '/Jo_CV.pdf',
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
  research: 'Research',
  xr: 'XR',
  film: 'Film',
  art: 'Art',
  tool: 'Tool',
};

// Order types appear in the filter bar.
export const TYPE_ORDER = ['research', 'xr', 'film', 'art', 'tool'];

type Dated = { id: string; data: { year: number; date?: Date } };

// Projects without an exact date count as January 1 of their year.
export const projectTime = (p: Dated) => +(p.data.date ?? new Date(p.data.year, 0, 1));

// Map2Video and CinemaWorld share the same UIST 2026 date. Map2Video is the
// later paper, so it always sorts first when the clock cannot tell them apart.
const NEWER: Record<string, number> = { map2video: 1 };

export const byNewest = (a: Dated, b: Dated) =>
  b.data.year - a.data.year || projectTime(b) - projectTime(a) || (NEWER[b.id] ?? 0) - (NEWER[a.id] ?? 0);
