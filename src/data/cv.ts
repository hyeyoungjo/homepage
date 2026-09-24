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
  /** Overrides the award line, which otherwise comes from the project. */
  note?: string;
  /** Other venues the work appeared in without its own publication, e.g. a
   *  demo track; shown after the award. */
  also?: string;
}

/** How each of the site's short `venue` values is cited in the CV. */
export interface CvVenue {
  /** Where it was published, e.g. "In Proceedings of the …". */
  source: string;
  publisher?: string;
  /** Short name shown in bold with the year, e.g. "CHI" → "CHI '26". */
  acronym?: string;
  /** Follows the year in the short name, e.g. " Adjunct". */
  suffix?: string;
}

export const VENUES: Record<string, CvVenue> = {
  'ACM CHI': {
    source: 'In Proceedings of the CHI Conference on Human Factors in Computing Systems',
    publisher: 'ACM',
    acronym: 'CHI',
  },
  'ACM UIST': {
    source: 'In Proceedings of the Annual ACM Symposium on User Interface Software and Technology',
    publisher: 'ACM',
    acronym: 'UIST',
  },
  'ACM UIST (Adjunct)': {
    source: 'In Adjunct Proceedings of the Annual ACM Symposium on User Interface Software and Technology',
    publisher: 'ACM',
    acronym: 'UIST',
    suffix: ' Adjunct',
  },
  'IEEE ISMAR (TVCG)': {
    source: 'IEEE Transactions on Visualization and Computer Graphics',
    publisher: 'IEEE',
    acronym: 'ISMAR',
  },
  'HCI Korea': {
    source: 'In Proceedings of HCI Korea',
    publisher: 'The HCI Society of Korea',
    acronym: 'HCIK',
  },
  arXiv: { source: 'arXiv preprint' },
};

export type CvSection =
  | { title: string; kind: 'prose'; body: string[]; keywords?: string[] }
  | { title: string; kind: 'entries'; summary?: string; entries: CvEntry[] }
  | { title: string; kind: 'publications'; summary?: string; items: CvPublication[] }
  | { title: string; kind: 'list'; summary?: string; groups: { title?: string; items: CvListItem[] }[] };

/** A list line, optionally with a thumbnail in the gutter: `ref` borrows a
 *  project's teaser, `image` names a file under src/assets/cv/. */
export type CvListItem = string | { text: string; ref?: string; image?: string };

export const CV: {
  name: string;
  /** Mailing address, left of the header. */
  address: string[];
  /** Web and email, right of the header. */
  contact: string[];
  sections: CvSection[];
} = {
  name: 'Hye-Young Jo',
  address: ['Roser ATLAS Center, Room 231', '1125 18th St, 320 UCB', 'Boulder, CO 80309-0320, United States'],
  contact: [
    '[www.hyeyoungjo.com](https://hyeyoungjo.com)',
    '[hye-young.jo@colorado.edu](mailto:hye-young.jo@colorado.edu)',
    '[Google Scholar](https://scholar.google.com/citations?user=vSQMUMgAAAAJ)',
  ],
  sections: [
    {
      title: 'Research Interests',
      kind: 'prose',
      body: [
        'I am a Ph.D. student in Computer Science at the University of Colorado Boulder. My main research area is **Human-Computer Interaction**. My research goal is to **expand people’s capacity to create and learn** by building interactive systems with generative AI and extended reality that adapt content to their actions, context, and intentions. My work spans AI-assisted filmmaking, technology-enhanced learning, and embodied fitness training.',
      ],
      keywords: ['human-AI interaction', 'creativity support tools', 'adaptive media', 'embodied interaction'],
    },
    {
      title: 'Education',
      kind: 'entries',
      entries: [
        {
          title: 'University of Colorado Boulder',
          date: 'August 2024 - Present',
          lines: ['Ph.D. student, Computer Science', 'Supervisor: Ryo Suzuki'],
        },
        {
          title: 'Korea Advanced Institute of Science and Technology (KAIST)',
          date: 'September 2020 - August 2022',
          lines: [
            'Master of Science, Industrial Design, *Best Master’s Thesis Award*',
            'Thesis: Exploring Different Augmented Reality Visualization Methods of Fitness Videos and Their Effects on the Exercise Experience',
            'Supervisor: Andrea Bianchi',
          ],
        },
        {
          title: 'Seoul National University',
          date: 'March 2011 - February 2016',
          lines: [
            'Bachelor of Fine Arts, Painting and Media Arts, *Cum Laude*',
            'Graduation exhibition, Painting: fluid identity [A1]',
            'Graduation exhibition, Media Arts: Korea’s [Sampo generation](https://en.wikipedia.org/wiki/N-po_generation) [A4]',
            'Supervisor: Inhwan Oh, Cheol-Woong Sim',
          ],
        },
      ],
    },
    {
      title: 'Research Experience',
      kind: 'entries',
      entries: [
        {
          title: 'Autodesk, HCI and Visualization Team',
          href: 'https://www.research.autodesk.com/research-areas/science/human-computer-interaction-and-visualization/',
          date: 'May 2026 - August 2026',
          lines: [
            'Research Intern, Mentors: Frederik Brudy, David Ledo.',
            'Created a design space for film directing, grounded in a cinematic corpus, to establish a shared language between human creators and generative AI.',
          ],
        },
        {
          title: 'Fujitsu Research of America, Converging Lab',
          href: 'https://www.fujitsu.com/us/about/businesspolicy/tech/rd/converging-lab/',
          date: 'May 2025 - October 2025',
          lines: [
            'Research Intern, Mentors: Mose Sakashita, Aditi Mishra, Aakar Gupta, Koichiro Niinuma.',
            'Built a system that grounds AI video generation in street-view imagery for spatially consistent shots, evaluated with 12 filmmakers [C8].',
          ],
        },
        {
          title: 'University of Colorado Boulder, Programmable Reality Lab',
          href: 'https://www.colorado.edu/atlas/programmable-reality-lab',
          date: 'August 2024 - Present',
          lines: [
            'Graduate Research Assistant, Mentor: Ryo Suzuki',
            'Study how people create and consume video by building interactive systems with generative AI, extended reality, and virtual agents for storytelling and education [C7, C8, U1].',
          ],
        },
        {
          title: 'Chung-Ang University, Human-AI Interaction Design & Fabrication Lab',
          href: 'https://artifab.yoonji-kim.com/main-page',
          date: 'January 2023 - July 2024',
          lines: [
            'Research Assistant, Mentor: Yoonji Kim',
            'Built a filmmaking previsualization tool using image segmentation and deepfake face swapping [C4], and haptic systems that recreate a personal trainer’s touch through vibrotactile and electrical stimulation [P1, C6].',
          ],
        },
        {
          title: 'KAIST, Make Lab',
          href: 'https://make.kaist.ac.kr/',
          date: 'September 2020 - September 2022',
          lines: [
            'Graduate Research Assistant, Mentor: Andrea Bianchi',
            'Designed and evaluated AR, VR, and haptic systems for home fitness, remote education, and immersive VR [C1-C3].',
          ],
        },
      ],
    },
    {
      title: 'Work Experience',
      kind: 'entries',
      entries: [
        {
          title: 'VR/AR Generalist at [Dexter Studios](https://www.dexterstudios.com/)',
          date: 'August 2018 - April 2020',
          lines: [
            'New Media Division, Immersive Content and Virtual Production',
            'Created 3D graphics for VR films, AR exhibitions and apps, and virtual production, covering character design, environments, visual scripting, lighting, and look development [X1-X2, X4].',
          ],
        },
        {
          title: 'Film VFX Compositor at [Dexter Studios](https://www.dexterstudios.com/)',
          date: 'September 2016 - July 2018',
          lines: [
            'Film Post-Production VFX Compositing Team',
            'Composited live-action plates, 2D elements, and 3D CG renders into seamless final shots for feature films [F1-F6].',
          ],
        },
      ],
    },
    {
      title: 'Peer-Reviewed Full Papers',
      kind: 'publications',
      summary:
        'Summary: 8 full papers published in CHI (4), UIST (2), ISMAR (1, in IEEE TVCG), and HCIK (1). Two additional full papers are under review.',
      items: [
        { label: 'C8', ref: 'map2video', also: 'Also accepted to the UIST ’26 demo track.' },
        { label: 'C7', ref: 'cinemaworld', also: 'Also accepted to the UIST ’26 demo track.' },
        { label: 'C6', ref: 'tingletouch' },
        { label: 'C5', ref: 'forearm-gesture' },
        { label: 'C4', ref: 'collagevis' },
        { label: 'C3', ref: 'flowar' },
        { label: 'C2', ref: 'physical-computing-metaverse' },
        { label: 'C1', ref: 'gamesbond', note: 'Honorable Mention Award (top 5%)' },
      ],
    },
    {
      title: 'Posters',
      kind: 'publications',
      items: [
        { label: 'P1', ref: 'trainertap' },
      ],
    },
    {
      title: 'Preprints',
      kind: 'publications',
      items: [
        { label: 'U1', ref: 'generative-lecture' },
      ],
    },
    {
      title: 'Fellowship and Awards',
      kind: 'entries',
      summary: 'Summary: $176,000 in total funding awarded.',
      entries: [
        { title: 'Google Ph.D. Fellowship', date: 'Fall 2025 - Spring 2027', lines: ['Awarded in the Human-Computer Interaction category; full tuition and stipend ($85,000/year)'] },
        { title: 'Conference Support Fund', date: '2026', lines: ['Awarded by the Department of Computer Science, University of Colorado Boulder ($1,500)'] },
        { title: 'Ralph J. Slutz Student Excellence Award', date: '2025', lines: ['Awarded by the Department of Computer Science, University of Colorado Boulder ($1,000)'] },
        { title: 'Conference Travel Grant', date: '2024', lines: ['Awarded by the Graduate and Professional Student Government, University of Colorado Boulder ($500)'] },
        { title: 'Gary Marsden Travel Award', date: '2024', lines: ['Awarded by ACM SIGCHI to attend CHI 2024 ($3,000)'] },
        { title: 'Best Master’s Thesis Award', date: '2023', lines: ['Awarded to one of two master’s theses in the Department of Industrial Design, KAIST'] },
        { title: 'Best Paper Award', date: '2022', lines: ['Awarded at HCI Korea 2022 [C2]'] },
        {
          title: 'Top Research Award',
          date: '2022',
          lines: ['Awarded at the joint research seminar of Seoul National University, KAIST, Sogang University, and Korea University [X5]'],
        },
        { title: 'Excellence Award', date: '2021', lines: ['Awarded at the Korea Metaverse Developer Contest 2021 [X5]'] },
        {
          title: 'iF Design Award (Winner, UI/UX) and IDEA (Bronze, Digital Interaction)',
          date: '2021',
          lines: [
            'Contributed the information architecture to the control UI/UX of the Mobile Clinic Module, a negative-pressure isolation ward (team award, a multi-lab project of the Department of Industrial Design, KAIST)',
          ],
        },
        { title: 'Honorable Mention Award', date: '2021', lines: ['Awarded to the top 5% of submissions at CHI 2021 [C1]'] },
        { title: 'Top Award', date: '2016', lines: ['Graduated first in class from the Maya 3D computer graphics course, Green Computer Academy'] },
        { title: 'Alumni Award', date: '2016', lines: ['Graduated second in class across all departments of the College of Fine Arts, Seoul National University'] },
      ],
    },
    {
      title: 'Invited Talks and Lectures',
      kind: 'entries',
      entries: [
        {
          title: 'Fujitsu Research of America Lunch Seminar',
          date: 'October 2025',
          lines: ['Grounding Generative Video in Real-World Geographies for Spatial Consistency'],
        },
        { title: 'KAIST Make Lab Seminar', date: 'May 2025', lines: ['Reimagining How We Create and Consume Content'] },
        {
          title: 'Seoul National University Human-Centered Computing Systems Lab Seminar',
          date: 'May 2025',
          lines: ['Reimagining How We Create and Consume Content'],
        },
        {
          title: 'University of Colorado Boulder, CSCI 7000 How to Hack Almost Anything Guest Lecture',
          date: 'February 2025',
          lines: ['Utilizing AI Services and APIs for Coding and Virtual Agent Creation'],
        },
        {
          title: 'KAIST ID220 Interaction Prototyping Class Guest Lecture',
          date: 'October 2022',
          lines: ['DIY Arduino paper cases without 3D printing, using Adobe Illustrator, Autodesk Fusion 360, and Blender.'],
        },
        {
          title: 'Kookmin University Department of Entertainment Design Career Seminar',
          date: 'November 2019',
          lines: ['Transitioning from Art and Film VFX to VR Content Creation'],
        },
      ],
    },
    {
      title: 'Teaching and Mentoring',
      kind: 'entries',
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
      title: 'Service',
      kind: 'entries',
      entries: [
        { title: 'Reviewer', lines: ['CHI 2025-2026, DIS 2026'] },
        {
          title: 'Outreach and Leadership',
          rows: [
            { text: 'University of Colorado Boulder Prospect Affiliate Match Program, helping prospective students prepare their PhD applications', date: '2025' },
            { text: 'Seoul National University Mentoring Program, helping international students adjust to campus life', date: '2012' },
          ],
        },
      ],
    },
    {
      title: 'Media Coverage',
      kind: 'entries',
      entries: [
        {
          title: 'University of Colorado Boulder Graduate School News',
          date: 'October 2025',
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
      title: 'Film and XR Content',
      kind: 'list',
      summary:
        'Summary: I created traditional 2D films and 3D XR content as VFX Compositor [F1-F6], CG generalist [X1-X5], developer [X3], and camera operator [X4].',
      groups: [
        {
          title: 'Films',
          items: [
            { text: '[F6] <Along with The Gods: The Last 49 Days>, Director: Yong-Hwa Kim, 2018, *2018 Grand Bell Awards - Best Visual Effects, over 12 million viewers in South Korea alone as of 2024.*', image: 'posters/along-with-the-gods-last-49-days.jpg' },
            { text: '[F5] <1987: When The Day Comes>, Director: Jun-Hwan Jang, 2017, *2018 Blue Dragon Film Awards - Top Film Award, over 5 million viewers in South Korea alone as of 2024.*', image: 'posters/1987-when-the-day-comes.jpg' },
            { text: '[F4] <Along with The Gods: The Two Worlds>, Director: Yong-Hwa Kim, 2017, *2018 Blue Dragon Film Awards - 4 Crowns, including Technology Award, over 11 million viewers in South Korea alone as of 2024.*', image: 'posters/along-with-the-gods-two-worlds.jpg' },
            { text: '[F3] Kung Fu Yoga, Director: Stanley Tong, 2017', image: 'posters/kung-fu-yoga.jpg' },
            { text: '[F2] <Real>, Director: Sa-Rang Lee, 2017', image: 'posters/real.jpg' },
            { text: '[F1] <Fabricated City>, Director: Kwang-Hyun Park, 2017', image: 'posters/fabricated-city.jpg' },
          ],
        },
        {
          title: 'Immersive Content',
          items: [
            { text: '[X5] VR Boxing Game <Meta-Boxing> ([video](https://youtu.be/-d2arU9pzFM)), Supervisor: Woontack Woo, *Excellence Award at Korea Metaverse Developer Contest 2021, Top Research Award at the 2022 joint research seminar of four universities - Seoul National University - KAIST - Sogang University - Korea University*', ref: 'meta-boxing' },
            { text: '[X4] AR Mobile App <LGU+ 5G AR>, Supervisor: Sun-Gu Kim', ref: 'lg-uplus-ar-studio' },
            { text: '[X3] VR Exhibition <Fashion For Help>, Supervisor: Young-Mo Son', ref: 'vr-fashion-for-help' },
            { text: '[X2] AR Exhibition <The Tide>, Supervisor: Sang-Hyoun Lee', ref: 'ar-the-tide' },
            { text: '[X1] VR Toon Film <The Tide>, Director: Tae-Kyung Yoo, *Officially invited to the "New Frontier" category at the 2019 Sundance Film Festival.*', ref: 'vr-the-tide' },
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
            { text: '[A7] Group Exhibition <Lapses>, Platform-L Contemporary Art Center, Curator: Eobchae, 2018 (funded by Hyundai’s ZER01NE project).', ref: 'measurer' },
            { text: '[A6] Live VJ Show <We Play>, Sangsangmadang, Supervisor: Hoon-Gyu Park (Parkpunk), 2016', image: 'art/we-play.jpg' },
            { text: '[A5] Invited Exhibition <Don’t fake it, believe it>, Mythtake Museum, 2016', image: 'art/dont-fake-it.jpg' },
            { text: '[A4] Group Exhibition <Dirt Luv for Graduation>, Seoul National University, 2015', ref: 'package-for-me' },
            { text: '[A3] Group Exhibition <8-bit>, Seoul National University, 2015', image: 'art/8-bit.jpg' },
            { text: '[A2] Group Exhibition <Crawling>, Seoul National University, 2015', image: 'art/crawling.jpg' },
            { text: '[A1] Group Exhibition <The Great Exodus>, Seoul National University, 2014', ref: 'closet-inside-the-closet' },
          ],
        },
      ],
    },
    {
      title: 'Skills',
      kind: 'entries',
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
