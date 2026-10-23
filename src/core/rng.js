// Rounds are seeded so a losing board can be replayed exactly in a test rather
// than asserted only through loose properties. Every game must draw through
// here — Math.random inside a game makes its rounds unreproducible.
export function createRng(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomSeed() {
  return (Math.random() * 0xffffffff) >>> 0;
}

export function shuffle(items, rng) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function take(items, count, rng) {
  if (count > items.length) {
    throw new Error(`cannot take ${count} items from a pool of ${items.length}`);
  }
  return shuffle(items, rng).slice(0, count);
}
