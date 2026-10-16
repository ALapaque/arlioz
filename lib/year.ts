import { cacheLife } from 'next/cache';

/** Current year for the copyright line, cached (Cache Components forbid raw `Date` in prerenders). */
export async function getCurrentYear(): Promise<number> {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}
