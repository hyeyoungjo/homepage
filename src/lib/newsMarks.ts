import type { ImageMetadata } from 'astro';
import autodesk from '../assets/marks/autodesk.png';
import cau from '../assets/marks/cau.png';
import cuboulder from '../assets/marks/cuboulder.png';
import dexter from '../assets/marks/dexter.png';
import fujitsu from '../assets/marks/fujitsu.png';
import kaist from '../assets/marks/kaist.png';
import prl from '../assets/marks/prl.png';
import snu from '../assets/marks/snu.png';

export const MARK_IDS = ['autodesk', 'cau', 'cuboulder', 'dexter', 'fujitsu', 'kaist', 'prl', 'snu'] as const;
export type MarkId = (typeof MARK_IDS)[number];

export const MARKS: Record<MarkId, ImageMetadata> = {
  autodesk,
  cau,
  cuboulder,
  dexter,
  fujitsu,
  kaist,
  prl,
  snu,
};

export const MARK_LABELS: Record<MarkId, string> = {
  autodesk: 'Autodesk',
  cau: 'Chung-Ang University',
  cuboulder: 'University of Colorado Boulder',
  dexter: 'Dexter Studios',
  fujitsu: 'Fujitsu',
  kaist: 'KAIST',
  prl: 'Programmable Reality Lab',
  snu: 'Seoul National University',
};

const MARK_ALIASES: Partial<Record<MarkId, string[]>> = {
  cuboulder: ['CU Boulder'],
};

export type NewsPart =
  | { kind: 'text'; value: string }
  | { kind: 'name'; id: MarkId; value: string };

/** Put each requested mark immediately before its name in the sentence. */
export function newsParts(text: string, ids: string[] = []): NewsPart[] {
  const hits = ids
    .filter((id): id is MarkId => id in MARKS)
    .map((id) => {
      const names = [MARK_LABELS[id], ...(MARK_ALIASES[id] ?? [])];
      for (const value of names) {
        const index = text.indexOf(value);
        if (index >= 0) return { id, value, index };
      }
      return { id, value: MARK_LABELS[id], index: -1 };
    })
    .filter((h) => h.index >= 0)
    .sort((a, b) => a.index - b.index);

  const parts: NewsPart[] = [];
  let at = 0;
  for (const h of hits) {
    if (h.index < at) continue;
    if (h.index > at) parts.push({ kind: 'text', value: text.slice(at, h.index) });
    parts.push({ kind: 'name', id: h.id, value: h.value });
    at = h.index + h.value.length;
  }
  if (at < text.length) parts.push({ kind: 'text', value: text.slice(at) });
  return parts.length ? parts : [{ kind: 'text', value: text }];
}
