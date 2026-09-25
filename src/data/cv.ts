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
  /** Reference key cited elsewhere in the CV, e.g. "C7". */
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
  | {
      title: string;
      kind: 'list';
      summary?: string;
      reel?: string;
      /** Works outside the list added to the collage: a project slug, or an
       *  image under src/assets/cv/ named by its path (e.g. art/drawing.jpg),
       *  whose area name is the file name without extension. A
       *  tile links to the list item its caption cites, if any. */
      works?: string[];
      /** Collage rows, each a space-separated list of columns; a column is
       *  an item label (e.g. F6) or work name, or several stacked with "/".
       *  Columns in a row share one height and every image keeps its aspect
       *  ratio, so fewer images in a row print larger. */
      collage?: string[];
      /** Tile labels by area name, e.g. a medium; they replace the default
       *  [label] and give the extra works a label. */
      captions?: Record<string, string>;
      groups: CvListGroup[];
    };

export interface CvListGroup {
  title?: string;
  /** Showreel shown as a link beside the title. */
  reel?: string;
  items: CvListItem[];
}

/** A list line with an optional thumbnail: `ref` borrows a project's
 *  teaser, `image` names a file under src/assets/cv/. Only `highlight`ed
 *  items appear in the section's collage; a tile opens `video` when given,
 *  otherwise the full-size image. */
export type CvListItem =
  | string
  | { text: string; date?: string; ref?: string; image?: string; highlight?: boolean; video?: string };

export const CV: {
  name: string;
  /** Mailing address, left of the header. */
  address: string[];
  /** Web and email, right of the header. */
  contact: string[];
  sections: CvSection[];
} = {
  name: 'Hye-Young Jo',
  address: ['Programmable Reality Lab, Roser ATLAS Center, Room 231', '1125 18th St, 320 UCB', 'Boulder, CO 80309-0320, United States'],
  contact: [
    '[www.hyeyoungjo.com](https://hyeyoungjo.com)',
    '[hye-young.jocolorado.edu](mailto:hye-young.jocolorado.edu)',
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
      summary: 'Summary: I trained in fine art, then industrial design, and now study computer science.',
      entries: [
        {
          title: 'University of Colorado Boulder',
          date: 'Aug 2024 - Present',
          lines: ['Ph.D. student, Computer Science', 'Supervisor: Prof. Ryo Suzuki'],
        },
        {
          title: 'Korea Advanced Institute of Science and Technology (KAIST)',
          date: 'Sep 2020 - Aug 2022',
          lines: [
            'Master of Science, Industrial Design, *Best Master’s Thesis Award*',
            'Thesis: Exploring Different Augmented Reality Visualization Methods of Fitness Videos and Their Effects on the Exercise Experience',
            'Supervisor: Prof. Andrea Bianchi',
          ],
        },
        {
          title: 'Seoul National University',
          date: 'Mar 2011 - Feb 2016',
          lines: [
            'Bachelor of Fine Arts, Painting and Media Arts, *Cum Laude*',
            'Painting graduation exhibition on fluid identity [A1]',
            'Media Arts graduation exhibition on Korea’s [Sampo generation](https://en.wikipedia.org/wiki/N-po_generation) [A4]',
            'Supervisor: Prof. Inhwan Oh, Prof. Cheol-Woong Sim',
          ],
        },
      ],
    },
    {
      title: 'Research Experience',
      kind: 'entries',
      summary: 'Summary: I have built interactive systems in five research groups across academia and industry, including research internships at Autodesk and Fujitsu.',
      entries: [
        {
          title: 'Autodesk, HCI and Visualization Team',
          href: 'https://www.research.autodesk.com/research-areas/science/human-computer-interaction-and-visualization/',
          date: 'May 2026 - Aug 2026',
          lines: [
            'Research Intern, Mentors: Dr. Frederik Brudy, Dr. David Ledo',
            'Created a design space for film directing, grounded in a cinematic corpus, to establish a shared language between human creators and generative AI.',
          ],
        },
        {
          title: 'Fujitsu Research of America, Converging Lab',
          href: 'https://www.fujitsu.com/us/about/businesspolicy/tech/rd/converging-lab/',
          date: 'May 2025 - Oct 2025',
          lines: [
            'Research Intern, Mentors: Dr. Mose Sakashita, Dr. Aditi Mishra, Dr. Aakar Gupta, Dr. Koichiro Niinuma',
            'Built a system that grounds AI video generation in street-view imagery for spatially consistent shots, evaluated with 12 filmmakers [C7].',
          ],
        },
        {
          title: 'University of Colorado Boulder, Programmable Reality Lab',
          href: 'https://www.colorado.edu/atlas/programmable-reality-lab',
          date: 'Aug 2024 - Present',
          lines: [
            'Graduate Research Assistant, Mentor: Prof. Ryo Suzuki',
            'Study how people create and consume video by building interactive systems with generative AI, extended reality, and virtual agents for storytelling and education [C6, C7, R1].',
          ],
        },
        {
          title: 'Chung-Ang University, Human-AI Interaction Design & Fabrication Lab',
          href: 'https://artifab.yoonji-kim.com/main-page',
          date: 'Jan 2023 - Jul 2024',
          lines: [
            'Research Assistant, Mentor: Prof. Yoonji Kim',
            'Built a filmmaking previsualization tool using image segmentation and deepfake face swapping [C4], and haptic systems that recreate a personal trainer’s touch through vibrotactile and electrical stimulation [E1, C5].',
          ],
        },
        {
          title: 'KAIST, Make Lab',
          href: 'https://make.kaist.ac.kr/',
          date: 'Sep 2020 - Sep 2022',
          lines: [
            'Graduate Research Assistant, Mentor: Prof. Andrea Bianchi',
            'Designed and evaluated augmented reality (AR), virtual reality (VR), and haptic systems for home fitness, remote education, and immersive VR [C1-C3].',
          ],
        },
      ],
    },
    {
      title: 'Work Experience',
      kind: 'entries',
      summary: 'Summary: Before research, I spent four years at Dexter Studios, first as a film VFX compositor and later as a VR/AR generalist.',
      entries: [
        {
          title: 'VR/AR Generalist at [Dexter Studios](https://www.dexterstudios.com/)',
          date: 'Aug 2018 - Apr 2020',
          lines: [
            'New Media Division, Immersive Content and Virtual Production',
            'Created 3D graphics for VR films, AR exhibitions and apps, and virtual production, covering character design, environments, visual scripting, lighting, and look development [X1-X2, X4].',
          ],
        },
        {
          title: 'Film VFX Compositor at [Dexter Studios](https://www.dexterstudios.com/)',
          date: 'Sep 2016 - Jul 2018',
          lines: [
            'Film Post-Production VFX Compositing Team',
            'Composited live-action plates, 2D elements, and 3D CG renders into seamless final shots for feature films [F1-F6].',
          ],
        },
      ],
    },
    {
      title: 'Research Overview',
      kind: 'list',
      summary:
        'Summary: I have published 8 full papers in ACM CHI (4), ACM UIST (2), IEEE ISMAR (1, in IEEE TVCG), and HCI Korea (1), and have two more under review.',
      works: [
        'research/map2video.jpg',
        'research/collagevis.jpg',
        'research/generative-lecture.jpg',
        'research/flowar.jpg',
        'research/tingletouch.jpg',
        'research/gamesbond.jpg',
        'research/physical-computing-metaverse.jpg',
      ],
      captions: {
        map2video: 'Video Generation Control [C7]',
        'generative-lecture': 'Lecture Video Augmentation [R1]',
        collagevis: 'Film Previsualization [C4]',
        flowar: 'Workout Video Augmentation [C3]',
        tingletouch: 'EMS Motion Guidance [C5]',
        gamesbond: 'Bimanual Haptic Illusion [C1]',
        'physical-computing-metaverse': 'VR Remote Education [C2]',
      },
      // Frames from each paper's video, uncropped. The four lead projects
      // print large; the last row shows the breadth of other work (haptics,
      // VR interaction, VR education).
      collage: [
        'map2video collagevis',
        'generative-lecture flowar',
        'physical-computing-metaverse tingletouch gamesbond',
      ],
      groups: [],
    },
    {
      title: 'Peer-Reviewed Full Papers',
      kind: 'publications',
      items: [
        { label: 'C7', ref: 'map2video', also: 'Also accepted to the UIST ’26 demo track.' },
        { label: 'C6', ref: 'cinemaworld', also: 'Also accepted to the UIST ’26 demo track.' },
        { label: 'C5', ref: 'tingletouch' },
        { label: 'J1', ref: 'forearm-gesture' },
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
        { label: 'E1', ref: 'trainertap' },
      ],
    },
    {
      title: 'Preprints',
      kind: 'publications',
      items: [
        { label: 'R1', ref: 'generative-lecture' },
      ],
    },
    {
      title: 'Fellowship and Awards',
      kind: 'entries',
      summary: 'Summary: I have received $176,000 in fellowships, awards, and travel grants.',
      entries: [
        { title: 'Google Ph.D. Fellowship', date: 'Fall 2025 - Spring 2027', lines: ['Awarded in the Human-Computer Interaction category; full tuition and stipend ($85,000/year).'] },
        { title: 'Ralph J. Slutz Student Excellence Award', date: '2025', lines: ['Awarded by the Department of Computer Science, University of Colorado Boulder ($1,000).'] },
        { title: 'Gary Marsden Travel Award', date: '2024', lines: ['Awarded by ACM SIGCHI to attend CHI 2024 ($3,000).'] },
        {
          title: 'Travel Grants, University of Colorado Boulder',
          date: '2024 - 2026',
          lines: ['Conference Support Fund, Department of Computer Science ($1,500); Conference Travel Grant, Graduate and Professional Student Government ($500).'],
        },
        { title: 'Best Master’s Thesis Award', date: '2023', lines: ['Awarded to one of two master’s theses in the Department of Industrial Design, KAIST.'] },
        { title: 'Best Paper Award', date: '2022', lines: ['Awarded at HCI Korea 2022 [C2].'] },
        {
          title: 'iF Design Award (Winner, UI/UX) and IDEA (Bronze, Digital Interaction)',
          date: '2021',
          lines: [
            'Contributed the information architecture to the control UI/UX of the Mobile Clinic Module, a negative-pressure isolation ward (team award, a multi-lab project of the Department of Industrial Design, KAIST).',
          ],
        },
        { title: 'Honorable Mention Award', date: '2021', lines: ['Awarded to the top 5% of submissions at CHI 2021 [C1].'] },
      ],
    },
    {
      title: 'Invited Talks and Lectures',
      kind: 'entries',
      summary: 'Summary: I gave six talks and guest lectures on AI-assisted video creation, prototyping, and my transition from art and film VFX to immersive media at companies and universities in the U.S. and Korea.',
      entries: [
        {
          title: 'Understanding Film Directing for AI-Assisted Video Creation, Autodesk Research',
          date: 'Aug 2026',
          lines: ['Presented at the Summer Internship Showcase'],
        },
        {
          title: 'Grounding Generative Video in Real-World Geographies for Spatial Consistency, Fujitsu Research of America',
          date: 'Oct 2025',
          lines: ['Presented at a lunch seminar'],
        },
        {
          title: 'Reimagining How We Create and Consume Content, KAIST and Seoul National University',
          date: 'May 2025',
          lines: ['Presented at the Make Lab Seminar and the Human-Centered Computing Systems Lab Seminar'],
        },
        {
          title: 'Utilizing AI Services and APIs for Coding and Virtual Agent Creation, University of Colorado Boulder',
          date: 'Feb 2025',
          lines: ['Gave a guest lecture in Prof. Ryo Suzuki’s How to Hack Almost Anything class (graduate course)'],
        },
        {
          title: 'How to Make an Arduino Case with Laser Cutting (Fusion 360, Blender, Adobe Illustrator), KAIST',
          date: 'Oct 2022',
          lines: ['Gave a guest lecture in Prof. Andrea Bianchi’s Interaction Prototyping class (undergraduate course)'],
        },
        {
          title: 'Transitioning from Art and Film VFX to VR Content Creation, Kookmin University',
          date: 'Nov 2019',
          lines: ['Presented at the Department of Entertainment Design Career Seminar'],
        },
      ],
    },
    {
      title: 'Teaching Experience',
      kind: 'entries',
      summary: 'Summary: I have taught introductory programming and physical prototyping as a teaching assistant.',
      entries: [
        {
          title: 'TA for Introductory C++ Programming Class',
          date: 'Fall 2025',
          lines: ['Worked as a teaching assistant in Prof. Rhonda Hoenigman’s Starting Computing class, teaching introductory C++ programming at the University of Colorado Boulder'],
        },
        {
          title: 'TA for Physical Computing Class',
          date: 'Fall 2022',
          lines: ['Worked as a teaching assistant in Prof. Andrea Bianchi’s Interaction Prototyping class, teaching physical computing with Arduino at KAIST'],
        },
      ],
    },
    {
      title: 'Service',
      kind: 'entries',
      entries: [
        { title: 'External Reviewer', date: '2025 - Present', lines: ['CHI 2025-2026, DIS 2026'] },
        {
          title: 'Mentor',
          rows: [
            {
              text: 'Undergraduate research mentoring for Chan Hu Wie, Yejin Jang, Dong-Uk Kim, and Yurim Son (Chung-Ang University), guiding them through designing, building, and evaluating wearable haptic systems that recreate a personal trainer’s touch, leading to a UIST poster [E1] and a CHI paper [C5]',
              date: 'Spring 2024',
            },
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
          title: 'University of Colorado Boulder, Graduate School News',
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
      title: 'Film VFX',
      kind: 'list',
      reel: 'https://youtu.be/0x7Rzw4ejqM',
      summary:
        'Summary: I worked as a visual effects (VFX) compositor on six feature films, three of which each drew over five million viewers in South Korea.',
      works: [
        'vfx/crowd-extension.jpg',
        'vfx/environment-extension.jpg',
        'vfx/creature.jpg',
      ],
      captions: {
        'crowd-extension': 'Crowd Extension [F5]',
        'environment-extension': 'Environment Extension [F4]',
        creature: 'Creature [F6]',
      },
      collage: ['crowd-extension/creature environment-extension:0.62'],
      groups: [
        {
          items: [
            { text: '[F6] <Along with the Gods: The Last 49 Days> ([VFX showreel](https://www.youtube.com/watch?v=qlAgdN0PIFw)), Director: Yong-Hwa Kim. *Best Visual Effects, 2018 Grand Bell Awards. Over 12 million viewers in South Korea as of 2024.*', date: '2018', video: 'https://www.youtube.com/watch?v=qlAgdN0PIFw' },
            { text: '[F5] <1987: When the Day Comes> ([VFX showreel](https://www.youtube.com/watch?v=54PSlSiwO9c)), Director: Jun-Hwan Jang. *Best Film, 2018 Blue Dragon Film Awards. Over 5 million viewers in South Korea as of 2024.*', date: '2017', video: 'https://www.youtube.com/watch?v=54PSlSiwO9c' },
            { text: '[F4] <Along with the Gods: The Two Worlds> ([VFX showreel](https://www.youtube.com/watch?v=4mYPlzP-38k)), Director: Yong-Hwa Kim. *Four awards including Best Technical Achievement, 2018 Blue Dragon Film Awards. Over 11 million viewers in South Korea as of 2024.*', date: '2017', video: 'https://www.youtube.com/watch?v=4mYPlzP-38k' },
            { text: '[F3] <Kung Fu Yoga> ([VFX showreel](https://www.youtube.com/watch?v=LEXz0muRNiY)), Director: Stanley Tong', date: '2017' },
            { text: '[F2] <Real> ([trailer](https://www.youtube.com/watch?v=FGZOl5oq-OY)), Director: Sa-Rang Lee', date: '2017' },
            { text: '[F1] <Fabricated City> ([trailer](https://www.youtube.com/watch?v=2CfVL6WLvUg)), Director: Kwang-Hyun Park', date: '2017' },
          ],
        },
      ],
    },
    {
      title: 'Immersive Content',
      kind: 'list',
      reel: 'https://youtu.be/xaiEH6rCV44',
      summary:
        'Summary: I created immersive experiences across VR and AR, including a VR horror film and AR exhibition, an AR app featuring miniature K-pop idols, a commissioned VR showroom for a tech-fashion exhibition, and a VR boxing game. I worked across concept design, 3D modeling, lighting, look development, coding, and camera operation.',
      collage: ['X1:0.62 X2/X3'],
      captions: { X1: 'VR Toon Film [X1]', X2: 'AR Exhibition [X2]', X3: 'VR Fashion Exhibition [X3]' },
      groups: [
        {
          items: [
            { text: '[X5] VR Boxing Game <Meta-Boxing> ([video](https://youtu.be/-d2arU9pzFM)), Supervisor: Prof. Woontack Woo', date: '2021', ref: 'meta-boxing' },
            { text: '[X4] AR Mobile App <LGU+ 5G AR> ([video](https://www.youtube.com/watch?v=jodknL45kXE), [article](https://www.koreajoongangdaily.com/business/want-a-tiny-kpop-star-to-perform-on-your-desk-lg-u-has-you-covered/10886585)), Supervisor: Sun-Gu Kim', date: '2019', ref: 'lg-uplus-ar-studio' },
            { text: '[X3] VR Exhibition <Fashion For Help> ([video](https://youtu.be/ZBZmPHuDVew)), Supervisor: Young-Mo Son', date: '2019', image: 'xr/fashion-for-help.jpg', highlight: true, video: 'https://youtu.be/ZBZmPHuDVew' },
            { text: '[X2] AR Exhibition <The Tide>, Supervisor: Sang-Hyoun Lee', date: '2019', image: 'xr/ar-the-tide.jpg', highlight: true },
            { text: '[X1] VR Toon Film <The Tide> ([Steam](https://store.steampowered.com/app/1263410/The_Tide/)), Director: Tae-Kyung Yoo. *Official selection, New Frontier, 2019 Sundance Film Festival.*', date: '2019', image: 'xr/vr-the-tide.jpg', highlight: true },
          ],
        },
      ],
    },
    {
      title: 'Art Exhibitions and Live Performances',
      kind: 'list',
      reel: 'https://youtu.be/KPa9K04bg9M',
      works: [
        'paper-animation',
        'summer',
        'story-you-cannot-tell',
        'closet-inside-the-closet',
        'art/pencil-drawing.jpg',
      ],
      captions: {
        A7: 'Video Essay [A7]',
        A4: 'Video [A4]',
        A1: 'Performance [A1]',
        summer: 'Watercolor',
        'story-you-cannot-tell': 'Acrylic',
        'paper-animation': 'Animation',
        'closet-inside-the-closet': 'Installation [A1]',
        'pencil-drawing': 'Pencil Drawing',
        A6: 'Video Mixing [A6]',
      },
      collage: [
        'summer closet-inside-the-closet/A4 A7/paper-animation story-you-cannot-tell',
        'A1 pencil-drawing A6',
      ],
      summary: 'Summary: My art explores the human body, emotion, and relationships between people through identity and belonging, the precarity of young adults in Korea, and fear and isolation. Across painting, video, installation, and performance, I am drawn to real-time and participatory work that audiences help complete, from a one-on-one cocktail bar to live video mixing.',
      groups: [
        {
              items: [
            { text: '[A7] Group Exhibition <Lapses> (video: [Measurer](https://youtu.be/joxBljTtwj8)), Platform-L Contemporary Art Center, Curator: Eobchae (funded by Hyundai’s ZER01NE project)', date: '2018', image: 'art/measurer-exit.jpg', highlight: true, video: 'https://youtu.be/joxBljTtwj8' },
            { text: '[A6] Live Video Jockey Performance <We Play>, Sangsangmadang, Supervisor: Hoon-Gyu Park (Parkpunk)', date: '2016', image: 'art/we-play.jpg', highlight: true },
            { text: '[A5] Invited Exhibition <Don’t fake it, believe it>, Mythtake Museum', date: '2016', image: 'art/dont-fake-it.jpg' },
            { text: '[A4] Group Exhibition <Dirt Luv for Graduation> (videos: [Package for Me](https://youtu.be/Y4RHAj9OX2c), [Human-furniture](https://youtu.be/-P_kXegSiZk), [Walking on the Spot](https://youtu.be/Z6fDNiB5Prg)), Seoul National University', date: '2015', ref: 'human-furniture', highlight: true, video: 'https://youtu.be/-P_kXegSiZk' },
            { text: '[A3] Group Exhibition <8-bit>, Seoul National University', date: '2015', image: 'art/8-bit.jpg' },
            { text: '[A2] Group Exhibition <Crawling>, Seoul National University', date: '2015', image: 'art/crawling.jpg' },
            { text: '[A1] Group Exhibition <The Great Exodus> (videos: [Closet Inside the Closet](https://www.youtube.com/watch?v=sdEbfhA2u90), [1:1 Bar](https://www.youtube.com/watch?v=67qUyOnCZyI)), Seoul National University. *One of three finalists for the Brighton Prize.*', date: '2014', image: 'art/one-to-one-bar.jpg', highlight: true, video: 'https://www.youtube.com/watch?v=67qUyOnCZyI' },
          ],
        },
      ],
    },
  ],
};
