import { getCollection } from 'astro:content';

export const LATEST_NEWS = 4;

export async function loadNews() {
  return (await getCollection('news'))
    .sort((a, b) => +b.data.date - +a.data.date)
    .map((n) => n.data);
}
