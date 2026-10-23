import { LEVELS } from '../core/contentSchema.js';

// Words a player typed in themselves. They never touch src/content/: the bundle is
// authored content, this is one browser's notebook. A bad record must never take the
// app down, so reading is forgiving (drop what cannot be played) while writing is
// strict (the parser refuses anything the typing stage could not accept).
export const CUSTOM_WORDS_KEY = 'grammax.customWords.v1';
export const CUSTOM_WORDS_LIMIT = 300;
export const MAX_MEANING_LENGTH = 120;

// The typing stage only produces [a-z'-], and a word must start and end with a letter,
// so "o'clock" and "check-in" pass while "look after" or "café" do not.
const WORD = /^[a-z](?:[a-z'-]*[a-z])?$/;
const SEPARATOR = /^([^=:\t]+)[=:\t](.*)$/;

function storageOrNull(storage) {
  if (storage) return storage;
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function customWordId(level, word) {
  return `own-${String(level).toLowerCase()}-${word}`;
}

function normalize(raw) {
  const word = typeof raw?.word === 'string' ? raw.word.trim().toLowerCase() : '';
  const meaningVi = typeof raw?.meaningVi === 'string' ? raw.meaningVi.trim().replace(/\s+/g, ' ') : '';
  const level = typeof raw?.level === 'string' ? raw.level.trim().toUpperCase() : '';
  if (!WORD.test(word) || meaningVi === '' || meaningVi.length > MAX_MEANING_LENGTH) return null;
  if (!LEVELS.includes(level)) return null;
  return {
    id: customWordId(level, word),
    word,
    meaningVi,
    level,
    category: 'custom',
    example: '',
    collocations: [],
  };
}

// One word per line: "word = nghĩa", "word: nghĩa" or a tab between the two.
// Every rejected line is reported with its number instead of silently vanishing —
// a word that never shows up in the game is the hardest bug to notice.
export function parseCustomWords(text, { level, taken = [] } = {}) {
  const target = typeof level === 'string' ? level.trim().toUpperCase() : '';
  if (!LEVELS.includes(target)) throw new Error(`unknown level "${level}"`);

  const known = new Set(taken.map((word) => String(word).trim().toLowerCase()));
  const seen = new Set();
  const items = [];
  const errors = [];

  String(text ?? '')
    .split(/\r?\n/)
    .forEach((raw, index) => {
      const line = raw.trim();
      if (line === '' || line.startsWith('#')) return;

      const at = index + 1;
      const match = line.match(SEPARATOR);
      if (match === null) {
        errors.push({ line: at, text: line, message: 'thiếu dấu "=" giữa từ và nghĩa' });
        return;
      }

      const word = match[1].trim().toLowerCase();
      const meaningVi = match[2].trim().replace(/\s+/g, ' ');

      if (!WORD.test(word)) {
        errors.push({ line: at, text: line, message: 'từ chỉ gồm chữ thường a-z, dấu nháy đơn hoặc gạch nối' });
        return;
      }
      if (meaningVi === '') {
        errors.push({ line: at, text: line, message: 'thiếu nghĩa tiếng Việt' });
        return;
      }
      if (meaningVi.length > MAX_MEANING_LENGTH) {
        errors.push({ line: at, text: line, message: `nghĩa dài quá ${MAX_MEANING_LENGTH} ký tự` });
        return;
      }
      if (seen.has(word) || known.has(word)) {
        errors.push({ line: at, text: line, message: `từ "${word}" đã có` });
        return;
      }

      seen.add(word);
      items.push({
        id: customWordId(target, word),
        word,
        meaningVi,
        level: target,
        category: 'custom',
        example: '',
        collocations: [],
      });
    });

  return { items, errors };
}

export function readCustomWords(storage) {
  const store = storageOrNull(storage);
  if (!store) return [];

  let raw;
  try {
    raw = JSON.parse(store.getItem(CUSTOM_WORDS_KEY) ?? '[]');
  } catch {
    return [];
  }
  if (!Array.isArray(raw)) return [];

  const seen = new Set();
  const items = [];
  for (const entry of raw) {
    const item = normalize(entry);
    if (item === null || seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
    if (items.length >= CUSTOM_WORDS_LIMIT) break;
  }
  return items;
}

export function writeCustomWords(items, storage) {
  const store = storageOrNull(storage);
  if (!store) return false;
  try {
    store.setItem(CUSTOM_WORDS_KEY, JSON.stringify(items.slice(0, CUSTOM_WORDS_LIMIT)));
    return true;
  } catch {
    return false;
  }
}

// Returns what is on disk afterwards, which is what the caller should render: a
// browser in private mode can refuse the write, and showing words that were not
// saved would make the import look successful and then lose them on reload.
export function addCustomWords(items, storage) {
  const current = readCustomWords(storage);
  const merged = new Map(current.map((item) => [item.id, item]));
  for (const item of items) merged.set(item.id, item);
  const next = [...merged.values()].slice(0, CUSTOM_WORDS_LIMIT);
  writeCustomWords(next, storage);
  return next;
}

export function removeCustomWord(id, storage) {
  const next = readCustomWords(storage).filter((item) => item.id !== id);
  writeCustomWords(next, storage);
  return next;
}

export function clearCustomWords(storage) {
  writeCustomWords([], storage);
  return [];
}

// Clearing from one level's notebook must not silently wipe another level's words:
// the section only ever shows the words of the level the player is studying.
export function clearCustomWordsForLevel(level, storage) {
  const next = readCustomWords(storage).filter((item) => item.level !== level);
  writeCustomWords(next, storage);
  return next;
}

export function customWordsForLevel(level, storage) {
  return readCustomWords(storage).filter((item) => item.level === level);
}
