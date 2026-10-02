// Pure selection over an already-loaded item list. It lives here rather than in
// src/content/index.js because that file needs Vite's import.meta.glob to load the
// JSON, which plain `node --test` does not have — so anything testable has to sit
// one level below the loader.

// Review mode narrows a round to the words the player keeps missing. Every game draws
// its own random subset with take(), so the way to guarantee those words appear is to
// shrink the pool to them — not to teach every game about preference ordering. When
// the weak list is shorter than the difficulty needs, the gap is topped up with fresh
// words from the same level so the round is still playable.
export function reviewPool({ items, preferredIds, minimum }) {
  const allowed = new Set(items.map((item) => item.id));
  const byId = new Map(items.map((item) => [item.id, item]));
  const preferred = (preferredIds ?? [])
    .map((id) => byId.get(id))
    .filter((item) => item !== undefined && allowed.has(item.id));

  if (preferred.length >= minimum) return preferred;

  const chosen = new Set(preferred.map((item) => item.id));
  const filler = items.filter((item) => !chosen.has(item.id));
  return [...preferred, ...filler.slice(0, Math.max(0, minimum - preferred.length))];
}
