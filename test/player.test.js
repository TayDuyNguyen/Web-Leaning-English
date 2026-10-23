import assert from 'node:assert/strict';
import test from 'node:test';

import { applyResult, emptyProfile, progress, weakestWords } from '../src/player/reducer.js';
import { createLocalStore } from '../src/player/localStore.js';

function fakeStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
    dump: () => Object.fromEntries(data),
  };
}

const result = (overrides = {}) => ({
  game: 'word-match',
  difficulty: 'normal',
  seed: 1,
  score: 40,
  xp: 4,
  correct: 4,
  wrong: 1,
  accuracy: 80,
  elapsedMs: 9000,
  wordOutcomes: [
    { wordId: 'a1_daily_001', correct: true },
    { wordId: 'a1_daily_002', correct: false },
  ],
  ...overrides,
});

test('a round adds xp, counts itself and records mastery', () => {
  const next = applyResult(emptyProfile(), result(), '2026-10-02');
  assert.equal(next.xp, 4);
  assert.equal(next.gamesPlayed, 1);
  assert.deepEqual(next.mastery.a1_daily_001, { correct: 1, wrong: 0 });
  assert.deepEqual(next.mastery.a1_daily_002, { correct: 0, wrong: 1 });
});

test('the best score per game only ever moves up', () => {
  let profile = applyResult(emptyProfile(), result({ score: 40 }), '2026-10-02');
  profile = applyResult(profile, result({ score: 20 }), '2026-10-03');
  assert.equal(profile.best['word-match'], 40);
  profile = applyResult(profile, result({ score: 70 }), '2026-10-04');
  assert.equal(profile.best['word-match'], 70);
});

test('mastery accumulates across rounds', () => {
  const twice = applyResult(applyResult(emptyProfile(), result(), '2026-10-02'), result(), '2026-10-03');
  assert.deepEqual(twice.mastery.a1_daily_002, { correct: 0, wrong: 2 });
});

test('a skipped day resets the streak', () => {
  let profile = applyResult(emptyProfile(), result(), '2026-10-01');
  profile = applyResult(profile, result(), '2026-10-02');
  assert.equal(profile.streak, 2);
  profile = applyResult(profile, result(), '2026-10-05');
  assert.equal(profile.streak, 1);
});

test('playing twice in one day does not double the streak', () => {
  let profile = applyResult(emptyProfile(), result(), '2026-10-02');
  profile = applyResult(profile, result(), '2026-10-02');
  assert.equal(profile.streak, 1);
});

test('weakest words rank the misses, not the untested', () => {
  const profile = {
    ...emptyProfile(),
    mastery: {
      a: { correct: 5, wrong: 1 },
      b: { correct: 0, wrong: 3 },
      c: { correct: 2, wrong: 0 },
      d: { correct: 1, wrong: 3 },
    },
  };
  assert.deepEqual(weakestWords(profile, 2).map((w) => w.wordId), ['b', 'd']);
});

test('progress reports the level curve against total xp', () => {
  const stats = progress({ ...emptyProfile(), xp: 250, gamesPlayed: 9, streak: 3 });
  assert.deepEqual(stats, { level: 2, xpIntoLevel: 150, xpForNextLevel: 200, totalXp: 250, gamesPlayed: 9, streak: 3 });
});

test('the local store starts empty', async () => {
  const store = createLocalStore(fakeStorage());
  assert.equal(store.kind, 'local');
  assert.deepEqual(await store.read(), emptyProfile());
});

test('the local store persists a round', async () => {
  const storage = fakeStorage();
  const store = createLocalStore(storage);
  const after = await store.record(result(), '2026-10-02');
  assert.equal(after.xp, 4);
  assert.deepEqual(await createLocalStore(storage).read(), after);
});

test('corrupt storage resets instead of throwing', async () => {
  const storage = fakeStorage({ 'grammax.player.v1': '{not json' });
  assert.deepEqual(await createLocalStore(storage).read(), emptyProfile());
});

test('a profile from another version is dropped, not merged', async () => {
  const storage = fakeStorage({ 'grammax.player.v1': JSON.stringify({ version: 999, xp: 5000 }) });
  assert.equal((await createLocalStore(storage).read()).xp, 0);
});
