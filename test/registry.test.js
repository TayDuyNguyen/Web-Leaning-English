import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { games } from '../src/games/registry.js';

const GAMES_DIR = fileURLToPath(new URL('../src/games', import.meta.url));

const dirs = readdirSync(GAMES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => existsSync(join(GAMES_DIR, name, 'manifest.json')));

test('every game directory is registered', () => {
  const registered = games.map((game) => game.id).sort();
  assert.deepEqual(registered, [...dirs].sort(), 'run `npm run registry` and commit the result');
});

test('the registry lists nothing that is not on disk', () => {
  for (const game of games) {
    assert.ok(dirs.includes(game.id), `registry lists "${game.id}" but src/games/${game.id} does not exist`);
  }
});

test('each registered game ships the files the contract needs', async () => {
  for (const game of games) {
    for (const required of ['manifest.json', 'logic.js', 'index.jsx']) {
      assert.ok(existsSync(join(GAMES_DIR, game.id, required)), `src/games/${game.id} is missing ${required}`);
    }
    const logic = await import(`../src/games/${game.id}/logic.js`);
    assert.equal(typeof logic.createRound, 'function', `${game.id}: logic.js must export createRound`);
    assert.equal(typeof logic.gradeRound, 'function', `${game.id}: logic.js must export gradeRound`);
  }
});

// src/games/index.js is the one hand-written wiring step. A game missing from it
// would pass every other check and then throw the moment its lobby card is clicked.
test('each registered game is wired into the module map', () => {
  const wiring = readFileSync(join(GAMES_DIR, 'index.js'), 'utf8');
  for (const game of games) {
    assert.match(wiring, new RegExp(`['"]?${game.id}['"]?\\s*:`), `${game.id} is registered but not wired in src/games/index.js`);
    assert.ok(wiring.includes(`./${game.id}/index.jsx`), `${game.id} has no component import in src/games/index.js`);
  }
});

test('a game declares the content types the app can actually serve', async () => {
  const { poolFor } = await import('../src/content/index.js').catch(() => ({ poolFor: null }));
  // src/content/index.js uses import.meta.glob, which only exists under Vite, so in
  // plain node this check degrades to validating the type name against the folders.
  if (!poolFor) {
    const known = readdirSync(join(GAMES_DIR, '..', 'content')).filter((name) => !name.includes('.'));
    for (const game of games) {
      for (const type of game.contentTypes) assert.ok(known.includes(type), `unknown content type "${type}" in ${game.id}`);
    }
    return;
  }
  for (const game of games) poolFor({ contentTypes: game.contentTypes, level: 'A1' });
});
