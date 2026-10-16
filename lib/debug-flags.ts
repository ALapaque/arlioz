/**
 * Temporary A/B switches for the Firefox scrolling investigation, read from the
 * query string on the client: `?lenis=off`, `?reveal=light`, `?loops=off`.
 * To remove once the cause is confirmed.
 */
export function debugFlag(name: 'lenis' | 'reveal' | 'loops'): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(name);
}
