import assert from 'node:assert/strict';
import test from 'node:test';

import { validateManifest } from '../src/core/manifest.js';

const valid = {
  id: 'demo-game',
  name: 'Demo',
  summary: 'A demo game.',
  contentTypes: ['vocabulary'],
  levels: ['A1'],
  skills: ['vocabulary'],
  difficulties: [{ id: 'easy', seconds: 30, minItems: 3, settings: { pairs: 3 } }],
};

const check = (overrides, pattern) =>
  assert.throws(() => validateManifest({ ...valid, ...overrides }, { source: 'm.json' }), pattern);

test('a good manifest passes and gains defaults', () => {
  const manifest = validateManifest(valid, { source: 'm.json' });
  assert.equal(manifest.difficulties[0].minItems, 3);
  assert.deepEqual(manifest.difficulties[0].settings, { pairs: 3 });
});

test('every required field is named when missing', () => {
  assert.throws(
    () => validateManifest({ name: 'x' }, { source: 'm.json' }),
    (error) => ['id', 'summary', 'contentTypes', 'levels', 'difficulties', 'skills'].every((f) => error.message.includes(f))
  );
});

test('ids with slashes or spaces are refused', () => {
  check({ id: 'Bad Id' }, /must be lowercase letters, digits and dashes/);
});

test('unknown CEFR levels are refused', () => {
  check({ levels: ['A1', 'C2'] }, /levels \[C2\] are not in/);
});

test('an empty difficulty list is refused', () => {
  check({ difficulties: [] }, /at least one/);
});

test('duplicate difficulty ids are refused', () => {
  check({ difficulties: [{ id: 'easy' }, { id: 'easy' }] }, /duplicate difficulty "easy"/);
});

test('negative or fractional timers are refused', () => {
  check({ difficulties: [{ id: 'easy', seconds: -1 }] }, /seconds must be 0 or a positive integer/);
  check({ difficulties: [{ id: 'easy', seconds: 2.5 }] }, /seconds must be 0 or a positive integer/);
});

test('minItems must be a positive whole number', () => {
  check({ difficulties: [{ id: 'easy', minItems: 0 }] }, /minItems must be a positive integer/);
});

test('seconds and minItems default when omitted', () => {
  const manifest = validateManifest({ ...valid, difficulties: [{ id: 'easy' }] }, { source: 'm.json' });
  assert.deepEqual(manifest.difficulties[0], { seconds: 0, minItems: 1, settings: {}, id: 'easy' });
});
