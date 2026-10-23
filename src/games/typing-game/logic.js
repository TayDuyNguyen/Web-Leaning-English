import { createRng, take } from '../../core/rng.js';

// Typing Game is the only round in the app that is a timeline rather than a form:
// words fall on a schedule and the player answers with keystrokes while they are
// still on screen. Everything that can be decided without a clock or the DOM lives
// here, so `node --test` can replay a board without a browser. The component only
// advances time and draws.

export const TYPING_DEFAULTS = Object.freeze({
  lanes: 3,
  lives: 3,
  baseFallMs: 8200,
  ramp: 0.86,
  milestones: 3,
  startDelayMs: 1400,
});

// A word is spawned while the previous one still has most of its fall left, so the
// stage always holds two or three targets. Below roughly half the fall time the same
// lane starts handing out words that overlap on screen.
const SPAWN_GAP_RATIO = 0.52;

// Between milestones the deck empties before the next, faster batch starts. Without
// the pause the player never feels the step up; the words just keep coming.
const MILESTONE_BREAK_RATIO = 0.9;

// Long words get longer on screen, capped: a 12-letter word is a typing problem, not
// a reaction problem, and the cap keeps one long word from stalling the whole board.
const LENGTH_BASE = 5;
const LENGTH_BONUS_PER_CHAR = 0.06;
const LENGTH_BONUS_MAX = 0.6;

export function normalizeAnswer(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

// 10 words over 3 milestones is 4/3/3, not 3/3/3 and a stray 1 at the end: the
// remainder goes to the earliest milestones so the fast ones are never the short ones.
export function splitMilestones(total, buckets) {
  const count = Math.max(1, Math.min(Math.floor(buckets) || 1, total));
  const base = Math.floor(total / count);
  const remainder = total % count;
  return Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0));
}

function lengthAllowance(word) {
  const extra = Math.max(0, word.length - LENGTH_BASE) * LENGTH_BONUS_PER_CHAR;
  return 1 + Math.min(LENGTH_BONUS_MAX, extra);
}

// Two falling words that start with the same letter make the first keystroke
// ambiguous: the player types "s" and the lock can pick either "shadow" or "sugar".
// Reordering the queue so neighbours differ costs nothing and removes the coin flip.
export function spreadInitials(items) {
  const pending = [...items];
  const out = [];

  while (pending.length > 0) {
    const last = out.length > 0 ? out[out.length - 1].word[0].toLowerCase() : null;
    const beforeLast = out.length > 1 ? out[out.length - 2].word[0].toLowerCase() : null;

    let pick = pending.findIndex(
      (item) => item.word[0].toLowerCase() !== last && item.word[0].toLowerCase() !== beforeLast
    );
    if (pick === -1) pick = pending.findIndex((item) => item.word[0].toLowerCase() !== last);
    if (pick === -1) pick = 0;

    out.push(pending.splice(pick, 1)[0]);
  }

  return out;
}

// The lock goes to the word closest to the deck: it is the one that costs a life next.
// Returning null lets the component ignore a keystroke that has no target instead of
// stealing a lock for a word the player did not mean.
export function pickTarget({ words, key }) {
  const wanted = String(key).toLowerCase();
  const matches = words.filter((word) => word.word[0] === wanted);
  if (matches.length === 0) return null;
  return matches.reduce((best, candidate) => (candidate.landAtMs < best.landAtMs ? candidate : best));
}

// One keystroke against the locked word. `typed` is always a prefix of `word`, so a
// wrong letter clears progress rather than being appended — the player never has to
// backspace, and the lock itself survives so they can retype the word from the start.
export function advance({ word, typed, key }) {
  const target = String(word).toLowerCase();
  const next = String(key).toLowerCase();

  if (target[typed.length] !== next) return { typed: '', done: false, wrong: true };

  const value = typed + next;
  return { typed: value, done: value.length === target.length, wrong: false };
}

export function createRound({ items, difficulty, seed }) {
  const settings = { ...TYPING_DEFAULTS, ...(difficulty?.settings ?? {}) };
  const need = settings.words;

  if (!Number.isInteger(need) || need < 1) {
    throw new Error(`typing-game needs a positive "words" setting, got ${need}`);
  }
  if (items.length < need) {
    throw new Error(`typing-game needs ${need} words but the content pool only has ${items.length}`);
  }

  const rng = createRng(seed);
  const chosen = spreadInitials(take(items, need, rng));
  const counts = splitMilestones(need, settings.milestones);

  const roundItems = [];
  const milestones = [];
  let cursor = 0;
  let clock = settings.startDelayMs;

  counts.forEach((count, index) => {
    // Every milestone is a faster copy of the whole board, so the ramp is a single
    // number the player can feel rather than a per-word tweak nobody notices.
    const pace = Math.round(settings.baseFallMs * settings.ramp ** index);
    const startedAtMs = Math.round(clock);

    for (let slot = 0; slot < count; slot += 1) {
      const source = chosen[cursor];
      cursor += 1;

      const word = String(source.word).toLowerCase();
      const fallMs = Math.round(pace * lengthAllowance(word));
      const spawnAtMs = Math.round(clock);

      roundItems.push({
        id: source.id,
        word,
        meaningVi: source.meaningVi,
        lane: slot % settings.lanes,
        spawnAtMs,
        fallMs,
        landAtMs: spawnAtMs + fallMs,
        milestone: index,
      });

      clock += fallMs * SPAWN_GAP_RATIO;
    }

    clock += pace * MILESTONE_BREAK_RATIO;
    milestones.push({ index, label: `Mốc ${index + 1}`, words: count, startAtMs: startedAtMs, paceMs: pace });
  });

  return {
    kind: 'typing-game',
    seed,
    difficulty: difficulty?.id ?? 'custom',
    lives: settings.lives,
    lanes: settings.lanes,
    milestones,
    items: roundItems,
    endsAtMs: roundItems.reduce((latest, item) => Math.max(latest, item.landAtMs), 0),
  };
}

// Only words the player actually saw are graded. A round can end with lives left at
// zero while words are still queued, and scoring those would punish the clock instead
// of the spelling — the same reason a blank always has to be an explicit wrong answer
// elsewhere: absent and wrong are different facts.
export function gradeRound({ round, answers }) {
  if (!answers || typeof answers !== 'object') {
    throw new TypeError('typing-game.gradeRound requires { round, answers } — got no answer set');
  }

  return round.items
    .filter((item) => Object.hasOwn(answers, item.id))
    .map((item) => ({
      wordId: item.id,
      correct: normalizeAnswer(answers[item.id]) === item.word,
      expected: item.word,
      given: answers[item.id] ?? '',
    }));
}

export function isComplete(round, answers = {}) {
  return round.items.every((item) => Object.hasOwn(answers, item.id));
}
