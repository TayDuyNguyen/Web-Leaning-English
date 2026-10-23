import assert from 'node:assert/strict';
import test from 'node:test';

import { reviewPool } from '../src/core/selection.js';

const items = Array.from({ length: 10 }, (_, i) => ({ id: `w${i}`, word: `word${i}`, level: 'A1' }));

test('a weak list long enough is used as-is', () => {
  const pool = reviewPool({ items, preferredIds: ['w3', 'w1', 'w7', 'w5'], minimum: 3 });
  assert.deepEqual(pool.map((i) => i.id), ['w3', 'w1', 'w7', 'w5']);
});

test('a short weak list is topped up with fresh words, never with duplicates', () => {
  const pool = reviewPool({ items, preferredIds: ['w2'], minimum: 6 });
  assert.equal(pool.length, 6);
  assert.equal(pool[0].id, 'w2');
  assert.equal(new Set(pool.map((i) => i.id)).size, 6);
  assert.ok(!pool.slice(1).some((i) => i.id === 'w2'));
});

test('ids that are not in the list are dropped instead of becoming holes', () => {
  const pool = reviewPool({ items, preferredIds: ['ghost', 'w4', 'also-ghost'], minimum: 2 });
  assert.deepEqual(pool.map((i) => i.id).slice(0, 1), ['w4']);
  assert.equal(pool.length, 2);
});

test('an empty weak list still yields a playable pool', () => {
  assert.equal(reviewPool({ items, preferredIds: [], minimum: 4 }).length, 4);
  assert.equal(reviewPool({ items, minimum: 3 }).length, 3);
});

test('the top-up can never exceed what the list holds', () => {
  const pool = reviewPool({ items, preferredIds: ['w0'], minimum: 50 });
  assert.equal(pool.length, items.length);
});

test('the preferred words survive even when they are at the end of the list', () => {
  const pool = reviewPool({ items, preferredIds: ['w9', 'w8'], minimum: 5 });
  assert.deepEqual(pool.slice(0, 2).map((i) => i.id), ['w9', 'w8']);
});
