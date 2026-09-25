// Career and education timeline, drawn as one tinted box per entry against a
// shared year ruler. The ruler spans 20 years, January 2011 to January 2031, so
// an entry's offset and length are straight percentages of that span and the
// component never has to hard-code a coordinate.

const START_YEAR = 2011;
const SPAN_MONTHS = 20 * 12;

/** A year and a 1-based month, e.g. [2016, 9] for September 2016. */
export type YearMonth = [year: number, month: number];

const offset = ([year, month]: YearMonth) => (year - START_YEAR) * 12 + (month - 1);

const END: YearMonth = [START_YEAR + SPAN_MONTHS / 12, 1];

/** One hue per era; the component maps these to CSS custom properties. */
export type Tone = 'art' | 'film' | 'immersive' | 'research';

export interface Entry {
  title: string;
  /** The institution, and nothing else — the ruler already gives the dates. */
  where?: string;
  /** Degree / award marks, e.g. 🎓🥈 for a BFA with honors. */
  mark?: string;
  from: YearMonth;
  to: YearMonth;
  tone: Tone;
  /** Started before the ruler does, so the leading edge dissolves. */
  opens?: boolean;
  /** Still going, so the box runs to the end of the ruler and fades out. */
  closes?: boolean;
  /** Not finished yet, so the box is drawn as a dashed outline. */
  expected?: boolean;
}

// Career edges sit on the labeled years so a new chapter starts at the tick.
// Degrees sit on the graduation year, not the years spent enrolled.
export const CAREER: Entry[] = [
  { title: 'Fine Art', mark: '🎨', from: [2011, 1], to: [2016, 1], tone: 'art', opens: true },
  { title: 'Film VFX', mark: '🎬', where: 'Dexter Studios', from: [2016, 1], to: [2018, 1], tone: 'film' },
  { title: 'Immersive Content', mark: '🥽', where: 'Dexter Studios', from: [2018, 1], to: [2020, 1], tone: 'immersive' },
  {
    title: 'Human-Computer Interaction (HCI) Research',
    mark: '📝',
    where: 'KAIST, Chung-Ang University, University of Colorado Boulder, Fujitsu, Autodesk',
    from: [2020, 1],
    to: END,
    tone: 'research',
    closes: true,
  },
];

export const EDUCATION: Entry[] = [
  {
    title: 'BFA in Painting & Media Art',
    mark: '🎓🥈',
    where: 'Seoul National University',
    from: [2011, 3],
    to: [2016, 2],
    tone: 'art',
  },
  {
    title: 'MS in Industrial Design (HCI)',
    mark: '🎓🏆',
    where: 'Korea Advanced Institute of Science & Technology (KAIST)',
    from: [2020, 8],
    to: [2022, 8],
    tone: 'research',
  },
  {
    title: 'PhD in Computer Science',
    mark: '🎓',
    where: 'University of Colorado Boulder (expected)',
    from: [2024, 8],
    to: [2029, 5],
    tone: 'research',
    expected: true,
  },
];

/** Labeled years — career starts plus the degree years. */
export const RULER_YEARS = [2016, 2018, 2020, 2022, 2029];

/** One tick per year, like a ruler. The labeled years sit on these too. */
export const TICK_YEARS = Array.from({ length: SPAN_MONTHS / 12 }, (_, i) => START_YEAR + i);

const percent = (months: number) => `${((months / SPAN_MONTHS) * 100).toFixed(2)}%`;

/** Where an entry starts on the ruler, and how much of it it covers. */
export const place = (entry: Entry) => ({
  start: percent(offset(entry.from)),
  length: percent(offset(entry.to) - offset(entry.from)),
});

export const yearMark = (year: number) => percent(offset([year, 1]));

/** January of the graduation year — degrees are marked when they end. */
export const gradMark = (entry: Entry) => yearMark(entry.to[0]);

const today = new Date();
export const NOW: YearMonth = [today.getFullYear(), today.getMonth() + 1];

/** Playhead — where today sits on the ruler. */
export const nowMark = () => percent(offset(NOW));
