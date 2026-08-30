// CV source of truth. The PDF is produced by printing /cv, so only content is
// edited here; spacing and alignment live in cv.astro.
//
// Inline markup allowed in every string: **bold**, *italic*, [text](href).

export interface CvRow {
  text: string;
  /** Right-aligned on the same line as the text. */
  date?: string;
}

export interface CvEntry {
  title: string;
  /** Right-aligned on the same line as the title. */
  date?: string;
  /** Makes the title a link. */
  href?: string;
  lines?: string[];
  /** Sub-lines that carry their own right-aligned date. */
  rows?: CvRow[];
}

export interface CvPublication {
  /** Reference key cited elsewhere in the CV, e.g. "C8". */
  label: string;
  /** Slug of the entry in the projects collection, which supplies title,
   *  authors, venue, year, award and links. */
  ref: string;
  /** Overrides the venue line when the record needs wording the site lacks. */
  venueNote?: string;
}

/** Long-form venue names for the CV, keyed by the site's short `venue`. */
export const VENUE_LONG: Record<string, string> = {
  'ACM CHI': 'CHI {year}: ACM Conference on Human Factors in Computing Systems',
  'ACM UIST': 'UIST {year}: ACM Symposium on User Interface Software and Technology',
  'ACM UIST (Adjunct)':
    'UIST {year} Adjunct: ACM Symposium on User Interface Software and Technology',
  'IEEE ISMAR (TVCG)':
    'ISMAR {year}: IEEE International Symposium on Mixed and Augmented Reality',
  'HCI Korea': 'HCIK {year}: The Human-Computer Interaction Society of Korea',
  arXiv: 'arXiv {year}',
};

export type CvSection =
  | { title: string; kind: 'prose'; body: string[] }
  | { title: string; kind: 'entries'; spaced?: boolean; entries: CvEntry[] }
  | { title: string; kind: 'publications'; summary: string; items: CvPublication[] }
  | { title: string; kind: 'list'; summary?: string; groups: { title?: string; items: string[] }[] };

export const CV: { name: string; contact: string[]; sections: CvSection[] } = {
  name: 'Hye-Young Jo',
  contact: ['hye-young.jo@colorado.edu', 'www.hyeyoungjo.com', 'Boulder, CO, United States'],
  sections: [
    {
      title: 'Research Interests',
      kind: 'prose',
      body: [
        'My research explores how generative AI and extended reality can enable embodied learning and creative living. My work focuses on enabling dynamic communication with content and transforming everyday living into creative activity through interactive systems where media dynamically adapt, evolve, and respond to users’ actions, context, and intentions.',
        'Keywords: Human-Computer Interaction; Human-AI Interaction; Creativity Support Tools; Generative Agents; AI-driven Content Adaptation; Embodied AI; XR Interaction; Augmented Instruction',
      ],
    },
    {
      title: 'Education',
      kind: 'entries',
      spaced: true,
      entries: [
        {
          title: 'University of Colorado Boulder',
          date: 'Aug 2024 - Present',
          lines: ['Ph.D. student, Computer Science', 'Supervisor: Ryo Suzuki'],
        },
        {
          title: 'Korea Advanced Institute of Science and Technology (KAIST)',
          date: 'Sep 2020 - Aug 2022',
          lines: [
            'Master of Science, Industrial Design, *Best Master’s Thesis Award*',
            'Supervisor: Andrea Bianchi',
          ],
        },
        {
          title: 'Seoul National University',
          date: 'Mar 2011 - Feb 2016',
          lines: [
            'Bachelor of Fine Arts, Painting and Media Arts, *Cum Laude*',
            'Supervisor: Inhwan Oh, Cheol-Woong Sim',
          ],
        },
      ],
    },
    {
      title: 'Publication',
      kind: 'publications',
      summary:
        'Summary: 8 full papers published in CHI (4), UIST (2), ISMAR (1), and HCIK (1), along with 1 extended abstract in UIST. One additional full paper is on arXiv.',
      items: [
        { label: 'C8', ref: 'map2video' },
        { label: 'C7', ref: 'cinemaworld' },
        { label: 'C6', ref: 'tingletouch', venueNote: '(to appear)' },
        { label: 'P1', ref: 'generative-lecture' },
        { label: 'C5', ref: 'forearm-gesture' },
        { label: 'C4', ref: 'collagevis' },
        { label: 'E1', ref: 'trainertap' },
        { label: 'C3', ref: 'flowar' },
        { label: 'C2', ref: 'physical-computing-metaverse' },
        { label: 'C1', ref: 'gamesbond' },
      ],
    },
    {
      title: 'Research Experience',
      kind: 'entries',
      entries: [
        {
          title: 'Autodesk, HCI and Visualization Team',
          href: 'https://www.research.autodesk.com/research-areas/science/human-computer-interaction-and-visualization/',
          date: 'May 2026 - Aug 2026',
          lines: ['Research Intern, Mentors: Frederik Brudy, David Ledo.'],
        },
        {
          title: 'Fujitsu Research of America, Converging Lab',
          href: 'https://www.fujitsu.com/us/about/businesspolicy/tech/rd/converging-lab/',
          date: 'May 2025 - Oct 2025',
          lines: ['Research Intern, Mentors: Mose Sakashita, Aditi Mishra, Aakar Gupta, Koichiro Niinuma.'],
        },
        {
          title: 'CU Boulder, Programmable Reality Lab',
          href: 'https://www.colorado.edu/atlas/programmable-reality-lab',
          date: 'Aug 2024 - Present',
          lines: ['Graduate Research Assistant, Mentor: Ryo Suzuki'],
        },
        {
          title: 'Chung-Ang University, Artifab Lab',
          href: 'https://artifab.yoonji-kim.com/main-page',
          date: 'Jan 2023 - July 2024',
          lines: ['Research Assistant, Mentor: Yoonji Kim'],
        },
        {
          title: 'KAIST, Make Lab',
          href: 'https://make.kaist.ac.kr/',
          date: 'Sep 2020 - Sep 2022',
          lines: ['Graduate Research Assistant, Mentor: Andrea Bianchi'],
        },
      ],
    },
    {
      title: 'Fellowship and Awards',
      kind: 'entries',
      entries: [
        { title: 'Google Ph.D. Fellowship', date: '2025-2027', lines: ['Full tuition and stipend ($85,000/year)'] },
        { title: 'CU Boulder Computer Science Department', date: '2026', lines: ['Conference Support funds ($1,500)'] },
        { title: 'Ralph J. Slutz Student Excellence Award', date: '2025', lines: ['Slutz Excellence Fund ($1,000)'] },
        { title: 'Graduate and Professional Student Government', date: '2024', lines: ['Conference travel support ($500)'] },
        { title: 'Gary Marsden Travel Award', date: '2024', lines: ['CHI conference travel support ($3,000)'] },
        { title: 'Best Master’s Thesis Award', date: '2023', lines: ['Department of Industrial Design, KAIST'] },
        { title: 'Best Paper Award', date: '2022', lines: ['HCIK 2022 [C2]'] },
        {
          title: 'Top Research Award',
          date: '2022',
          lines: ['The joint research seminar of four universities: Seoul National University, KAIST, Sogang University, and Korea University [X6]'],
        },
        { title: 'Excellence Award', date: '2021', lines: ['Korea Metaverse Developer Contest 2021 [X6]'] },
        {
          title: 'IDEA Design Award 2021',
          date: '2021',
          lines: ['Bronze, Digital Interaction, Mobile Clinic Module Control UI/UX (awarded to Make lab)'],
        },
        {
          title: 'iF Design Award',
          date: '2021',
          lines: ['Winner, User Interface (UI), User Experience (UX), Mobile Clinic Module Control UX/UI (awarded to Make lab)'],
        },
        { title: 'Honorable Mention Award (top 5%)', date: '2021', lines: ['CHI 2021 [C1]'] },
        { title: 'Top Award', date: '2016', lines: ['Green Computer Academy'] },
        { title: 'Alumni Award', date: '2016', lines: ['Seoul National University Alumni Association'] },
      ],
    },
    {
      title: 'Work Experience',
      kind: 'entries',
      spaced: true,
      entries: [
        {
          title: 'Research Assistant at Chung-Ang University',
          date: 'Jan 2023 - July 2024',
          lines: ['Developed a creativity support tool [C4] and workout support tool that simulates a trainer’s tactile and auditory guidance in weightlifting [E1].'],
        },
        {
          title: 'Film VFX Compositor and VR/AR Generalist at [Dexter Studios](https://www.dexterstudios.com/)',
          date: 'Sep 2016 - Apr 2020',
          lines: [
            'Worked in film post-production’s compositing team, integrating computer graphic assets, matte painting, and live-action footage to make a final image [F1-F6].',
            'Created various AR/VR projects, mainly as a generalist, involved in 3D character design, level design, visual scripting, lighting, and look development [X1-X2, X4].',
          ],
        },
      ],
    },
    {
      title: 'Service',
      kind: 'entries',
      spaced: true,
      entries: [
        { title: 'Reviewer', lines: ['CHI 2025-2026, DIS 2026'] },
        {
          title: 'Outreach and Leadership',
          rows: [
            { text: 'CU Boulder Prospect Affiliate Match Program, helping prospective students prepare their PhD applications', date: '2025' },
            { text: 'Seoul National University Mentoring Program, helping international students adjust to campus life', date: '2012' },
          ],
        },
      ],
    },
    {
      title: 'Invited Talks and Lectures',
      kind: 'entries',
      entries: [
        {
          title: 'Fujitsu Research of America Lunch Seminar',
          date: 'Oct 2025',
          lines: ['Grounding Generative Video in Real-World Geographies for Spatial Consistency'],
        },
        { title: 'KAIST Make Lab Seminar', date: 'May 2025', lines: ['Reimagining How We Create and Consume Content'] },
        {
          title: 'Seoul National University Human-Centered Computing Systems Lab Seminar',
          date: 'May 2025',
          lines: ['Reimagining How We Create and Consume Content'],
        },
        {
          title: 'CU Boulder CSCI 7000 How to Hack Almost Anything Class Guest Lecture',
          date: 'Feb 2025',
          lines: ['Utilizing AI Services and APIs for Coding and Virtual Agent Creation'],
        },
        {
          title: 'KAIST ID220 Interaction Prototyping Class Guest Lecture',
          date: 'Oct 2022',
          lines: ['DIY Arduino paper cases without 3D printing, using Adobe Illustrator, Autodesk Fusion 360, and Blender.'],
        },
        {
          title: 'Kookmin University Department of Entertainment Design Career Seminar',
          date: 'Nov 2019',
          lines: ['Transitioning from Art and Film VFX to VR Content Creation'],
        },
      ],
    },
    {
      title: 'Media Coverage',
      kind: 'entries',
      entries: [
        {
          title: 'CU Boulder Graduate School News',
          date: 'Oct 2025',
          lines: ['[“CU Boulder graduate student named a Google PhD fellow”](https://www.colorado.edu/graduateschool/2025/10/24/cu-boulder-graduate-student-named-google-phd-fellow)'],
        },
        {
          title: 'Microsoft Research Blog',
          date: 'May 2021',
          lines: ['[“Microsoft Research collaborates with KAIST in Korea to explore bimanual interactions with haptic feedback in virtual reality”](https://www.microsoft.com/en-us/research/blog/microsoft-research-collaborates-with-kaist-in-korea-to-explore-bimanual-interactions-with-haptic-feedback-in-virtual-reality/)'],
        },
      ],
    },
    {
      title: 'Teaching and Mentoring',
      kind: 'entries',
      spaced: true,
      entries: [
        {
          title: 'Teaching Assistant',
          rows: [
            { text: 'CSCI 1300 Starting Computing (C++), Instructor: Rhonda Hoenigman', date: 'Fall 2025' },
            { text: 'ID220 Interaction Prototyping (Arduino)', date: 'Fall 2022' },
          ],
        },
        {
          title: 'Undergraduate Research Assistant',
          lines: ['Chan Hu Wie, Yejin Jang, Dong-Uk Kim, Yurim Son (Chung-Ang University)'],
        },
      ],
    },
    {
      title: 'Film and XR Content',
      kind: 'list',
      summary:
        'Summary: I created traditional 2D films and 3D XR content as VFX Compositor [F1-F6], CG generalist [X1-X4, X6], Art director [X5], developer [X3], and camera operator [X4].',
      groups: [
        {
          title: 'Films',
          items: [
            '[F6] <Along with The Gods: The Last 49 Days>, Director: Yong-Hwa Kim, 2018, *2018 Grand Bell Awards - Best Visual Effects, over 12 million viewers in South Korea alone as of 2024.*',
            '[F5] <1987: When The Day Comes>, Director: Jun-Hwan Jang, 2017, *2018 Blue Dragon Film Awards - Top Film Award, over 5 million viewers in South Korea alone as of 2024.*',
            '[F4] <Along with The Gods: The Two Worlds>, Director: Yong-Hwa Kim, 2017, *2018 Blue Dragon Film Awards - 4 Crowns, including Technology Award, over 11 million viewers in South Korea alone as of 2024.*',
            '[F3] Kung Fu Yoga, Director: Stanley Tong, 2017',
            '[F2] <Real>, Director: Sa-Rang Lee, 2017',
            '[F1] <Fabricated City>, Director: Kwang-Hyun Park, 2017',
          ],
        },
        {
          title: 'Immersive Content',
          items: [
            '[X6] VR Boxing Game <Meta-Boxing> ([video](https://youtu.be/-d2arU9pzFM)), Supervisor: Woontack Woo, *Excellence Award at Korea Metaverse Developer Contest 2021, Top Research Award at the 2022 joint research seminar of four universities - Seoul National University - KAIST - Sogang University - Korea University*',
            '[X5] VR Exhibition <Being City>, Supervisor: Tae-Kyung Yoo',
            '[X4] AR Mobile App <LGU+ 5G AR>, Supervisor: Sun-Gu Kim',
            '[X3] VR Exhibition <Fashion For Help>, Supervisor: Young-Mo Son',
            '[X2] AR Exhibition <The Tide>, Supervisor: Sang-Hyoun Lee',
            '[X1] VR Toon Film <The Tide>, Director: Tae-Kyung Yoo, *Officially invited to the "New Frontier" category at the 2019 Sundance Film Festival.*',
          ],
        },
      ],
    },
    {
      title: 'Art Exhibitions and Live Performances',
      kind: 'list',
      summary: 'Summary: I participated in the following art events as an artist [A1-A5, A7] and VJ [A6].',
      groups: [
        {
          items: [
            '[A7] Group Exhibition <Lapses>, Platform-L Contemporary Art Center, Curator: Eobchae, 2018 (funded by Hyundai’s ZER01NE project).',
            '[A6] Live VJ Show <We Play>, Sangsangmadang, Supervisor: Hoon-Gyu Park (Parkpunk), 2016',
            '[A5] Invited Exhibition <Don’t fake it, believe it>, Mythtake Museum, 2016',
            '[A4] Group Exhibition <Dirt Luv for Graduation>, Seoul National University, 2016',
            '[A3] Group Exhibition <8-bit>, Seoul National University, 2015',
            '[A2] Group Exhibition <Crawling>, Seoul National University, 2015',
            '[A1] Group Exhibition <The Great Exodus>, Seoul National University, 2015',
          ],
        },
      ],
    },
    {
      title: 'Skills',
      kind: 'entries',
      spaced: true,
      entries: [
        { title: 'Programming', lines: ['C#, Python, JavaScript, C++, R, HTML/CSS'] },
        {
          title: 'Graphic Design',
          lines: ['2D/3D image manipulation (Nuke, Adobe Creative Suite), video editing (Final Cut Pro), 3D modeling, rigging, animation (Blender, Maya, Fusion 360, Substance Painter), projection mapping (Resolume), live video mixing (VDMX)'],
        },
        { title: 'XR Prototyping', lines: ['Unity, Unreal Engine, WebXR'] },
        { title: 'Fine Art', lines: ['Drawing, painting (watercolor, acrylic, oil), sculpture, casting, printmaking, photography'] },
        { title: 'Research Methods', lines: ['affinity diagramming, A/B testing, focus group interviews, ethnography, contextual inquiry, participatory design'] },
        { title: 'Languages', lines: ['Korean (native), English (TOEFL 106/120), French (DELF B1)'] },
      ],
    },
  ],
};
