import test from 'node:test';
import assert from 'node:assert/strict';

import {
  hashForTab,
  hashMatchesTab,
  parseHashRoute,
  parseTopicSubRoute,
  writeHashRoute,
} from '../src/lib/routes.js';

// writeHashRoute touches window/history, which do not exist in Node. A plain object
// stand-in is enough: the contract under test is "push vs replace vs say nothing".
const installLocation = (hash) => {
  const location = { hash, pathname: '/app/', search: '' };
  const calls = [];
  globalThis.window = {
    location,
    history: {
      state: { seq: 1 },
      replaceState: (_state, _title, url) => {
        calls.push({ kind: 'replace', url });
        location.hash = url.includes('#') ? url.slice(url.indexOf('#')) : '';
      },
    },
  };
  globalThis.history = globalThis.window.history;
  return { location, calls };
};

test.afterEach(() => {
  delete globalThis.window;
  delete globalThis.history;
});

test('maps the dashboard, empty and unknown hashes to the topic list', () => {
  assert.equal(parseHashRoute(''), 'topics');
  assert.equal(parseHashRoute('#'), 'topics');
  assert.equal(parseHashRoute('#topics'), 'topics');
  assert.equal(parseHashRoute('#nonsense'), 'topics');
});

test('maps arena hashes including sub-routes to the game view', () => {
  assert.equal(parseHashRoute('#game'), 'game');
  assert.equal(parseHashRoute('#game/rush'), 'game');
  assert.equal(parseHashRoute('#game/battle'), 'game');
});

test('maps a topic hash to the topic id', () => {
  assert.equal(parseHashRoute('#topic-chuyen-de-thi-dong-tu'), 'chuyen-de-thi-dong-tu');
});

test('strips the theory/exercise sub-route from a topic hash', () => {
  assert.equal(
    parseHashRoute('#topic-chuyen-de-thi-dong-tu/exercise-2'),
    'chuyen-de-thi-dong-tu'
  );
  assert.equal(
    parseHashRoute('#topic-su-phoi-thi/theory-1'),
    'su-phoi-thi'
  );
});

test('falls back to the dashboard for an empty topic id', () => {
  assert.equal(parseHashRoute('#topic-'), 'topics');
  assert.equal(parseHashRoute('#topic-/exercise-1'), 'topics');
});

test('does not treat a game-like topic id as the arena', () => {
  assert.equal(parseHashRoute('#topic-game-of-thrones'), 'game-of-thrones');
  assert.equal(parseHashRoute('#games'), 'topics');
});

test('tolerates non-string input', () => {
  assert.equal(parseHashRoute(undefined), 'topics');
  assert.equal(parseHashRoute(null), 'topics');
  assert.equal(parseHashRoute(42), 'topics');
});

test('builds the canonical hash for each view', () => {
  assert.equal(hashForTab('topics'), '');
  assert.equal(hashForTab('game'), '#game');
  assert.equal(hashForTab('chuyen-de-thi-dong-tu'), '#topic-chuyen-de-thi-dong-tu');
});

test('a sub-route still matches its parent view', () => {
  assert.equal(hashMatchesTab('#topic-su-phoi-thi/theory-2', 'su-phoi-thi'), true);
  assert.equal(hashMatchesTab('#game/rush', 'game'), true);
  assert.equal(hashMatchesTab('', 'topics'), true);
  assert.equal(hashMatchesTab('#topics', 'topics'), true);
  assert.equal(hashMatchesTab('#topic-su-phoi-thi', 'chuyen-de-thi-dong-tu'), false);
  assert.equal(hashMatchesTab('#game', 'topics'), false);
});

test('reads a lesson sub-route off the topic URL', () => {
  assert.deepEqual(parseTopicSubRoute('#topic-su-phoi-thi/exercise-4', 'su-phoi-thi'), { type: 'exercise', id: 4 });
  assert.deepEqual(parseTopicSubRoute('#topic-su-phoi-thi/theory-0', 'su-phoi-thi'), { type: 'theory', id: 0 });
});

test('returns null when there is nothing to read', () => {
  assert.equal(parseTopicSubRoute('#topic-su-phoi-thi', 'su-phoi-thi'), null);
  assert.equal(parseTopicSubRoute('#topic-chuyen-de-thi-dong-tu/theory-1', 'su-phoi-thi'), null);
  assert.equal(parseTopicSubRoute('#game/rush', 'su-phoi-thi'), null);
  assert.equal(parseTopicSubRoute('', 'su-phoi-thi'), null);
});

test('rejects a malformed sub-route rather than guessing', () => {
  assert.equal(parseTopicSubRoute('#topic-su-phoi-thi/theory-x', 'su-phoi-thi'), null);
  assert.equal(parseTopicSubRoute('#topic-su-phoi-thi/reading-2', 'su-phoi-thi'), null);
  assert.equal(parseTopicSubRoute('#topic-su-phoi-thi/theory-', 'su-phoi-thi'), null);
});

test('navigation pushes a history entry', () => {
  const { location } = installLocation('#topic-chuyen-de-thi-dong-tu');
  writeHashRoute('#topic-su-phoi-thi');
  assert.equal(location.hash, '#topic-su-phoi-thi');
});

test('normalising the URL to existing state replaces instead of pushing', () => {
  const { location, calls } = installLocation('#topic-su-phoi-thi');
  writeHashRoute('#topic-su-phoi-thi/theory-0', { replace: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].kind, 'replace');
  assert.equal(calls[0].url, '/app/#topic-su-phoi-thi/theory-0');
  assert.equal(location.hash, '#topic-su-phoi-thi/theory-0');
});

test('clearing the hash for the dashboard drops the fragment entirely', () => {
  const { calls } = installLocation('#topic-su-phoi-thi');
  writeHashRoute('', { replace: true });
  assert.equal(calls[0].url, '/app/');
});

test('writes nothing when the URL already says this', () => {
  const { location, calls } = installLocation('#game/rush');
  writeHashRoute('#game/rush');
  writeHashRoute('#game/rush', { replace: true });
  assert.equal(calls.length, 0);
  assert.equal(location.hash, '#game/rush');
});
