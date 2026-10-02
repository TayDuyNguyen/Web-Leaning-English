import assert from 'node:assert/strict';
import test from 'node:test';

import { buildGameResult, levelForXp, nextStreak, POINTS } from '../src/core/scoring.js';

const attempts = (pattern) =>
  pattern.map((correct, index) => ({ wordId: `w${index}`, correct }));

test('an easy round scores 10 per correct answer with no multiplier', () => {
  const result = buildGameResult({ game: 'x', difficulty: 'easy', seed: 1, attempts: attempts([true, true, true, true, true]), elapsedMs: 1000 });
  assert.equal(result.score, 50);
  assert.equal(result.xp, 5);
  assert.equal(result.accuracy, 100);
});

test('hard multiplies by two and wrong answers subtract', () => {
  const result = buildGameResult({ game: 'x', difficulty: 'hard', seed: 1, attempts: attempts([true, true, true, false]), elapsedMs: 0 });
  assert.equal(result.score, Math.round((3 * POINTS.correct + POINTS.incorrect) * 2));
});

test('a round of pure misses floors at zero rather than going negative', () => {
  const result = buildGameResult({ game: 'x', difficulty: 'normal', seed: 1, attempts: attempts([false, false]), elapsedMs: 0 });
  assert.equal(result.score, 0);
  assert.equal(result.xp, 0);
  assert.equal(result.accuracy, 0);
});

test('word outcomes survive for the mastery table', () => {
  const result = buildGameResult({ game: 'x', difficulty: 'easy', seed: 4, attempts: attempts([true, false]), elapsedMs: 12 });
  assert.deepEqual(result.wordOutcomes, [
    { wordId: 'w0', correct: true },
    { wordId: 'w1', correct: false },
  ]);
});

test('an empty round is reported, not hidden', () => {
  const result = buildGameResult({ game: 'x', difficulty: 'easy', seed: 1, attempts: [], elapsedMs: 0 });
  assert.equal(result.correct, 0);
  assert.equal(result.accuracy, 0);
});

test('buildGameResult rejects a non-array attempt list', () => {
  assert.throws(() => buildGameResult({ game: 'x', difficulty: 'easy', seed: 1, attempts: null }), /attempts must be an array/);
});

test('the level curve charges 100x more each level', () => {
  assert.equal(levelForXp(0).level, 1);
  assert.equal(levelForXp(99).level, 1);
  assert.equal(levelForXp(100).level, 2);
  assert.equal(levelForXp(299).level, 2);
  assert.equal(levelForXp(299).xpIntoLevel, 199);
  assert.equal(levelForXp(299).xpForNextLevel, 200);
  assert.equal(levelForXp(300).level, 3);
  assert.equal(levelForXp(300).xpIntoLevel, 0);
  assert.equal(levelForXp(300).xpForNextLevel, 300);
});

test('streaks continue on consecutive days and break otherwise', () => {
  assert.equal(nextStreak(0, null, '2026-10-02'), 1);
  assert.equal(nextStreak(4, '2026-10-01', '2026-10-02'), 5);
  assert.equal(nextStreak(9, '2026-09-28', '2026-10-02'), 1);
  assert.equal(nextStreak(4, '2026-10-02', '2026-10-02'), 4);
});
