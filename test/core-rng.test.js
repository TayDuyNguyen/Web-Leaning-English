import assert from 'node:assert/strict';
import test from 'node:test';

import { createRng, randomSeed, shuffle, take } from '../src/core/rng.js';

test('the same seed replays the same sequence', () => {
  assert.deepEqual(
    Array.from({ length: 8 }, createRng(1234)),
    Array.from({ length: 8 }, createRng(1234))
  );
});

test('different seeds diverge', () => {
  assert.notDeepEqual(
    Array.from({ length: 6 }, createRng(1)),
    Array.from({ length: 6 }, createRng(2))
  );
});

test('rng stays inside [0, 1)', () => {
  const rng = createRng(99);
  for (let i = 0; i < 5000; i += 1) {
    const value = rng();
    assert.ok(value >= 0 && value < 1, `got ${value}`);
  }
});

test('shuffle keeps every element exactly once', () => {
  const input = [1, 2, 3, 4, 5, 6, 7];
  assert.deepEqual(shuffle(input, createRng(7)).slice().sort((a, b) => a - b), input);
});

test('shuffle does not mutate its input', () => {
  const input = ['a', 'b', 'c', 'd'];
  shuffle(input, createRng(3));
  assert.deepEqual(input, ['a', 'b', 'c', 'd']);
});

test('take throws instead of silently returning a short round', () => {
  assert.throws(() => take([1, 2], 5, createRng(1)), /cannot take 5 items from a pool of 2/);
});

test('randomSeed produces an unsigned 32-bit integer', () => {
  for (let i = 0; i < 200; i += 1) {
    const seed = randomSeed();
    assert.ok(Number.isInteger(seed) && seed >= 0 && seed <= 0xffffffff);
  }
});
