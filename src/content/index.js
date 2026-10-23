import { levelFromFolder, validateVocabularyCollection } from '../core/contentSchema.js';
import { reviewPool as selectReviewPool } from '../core/selection.js';

// The level is taken from the directory, never from the item, so a file filed
// under a2/ that still claims A1 words fails loudly instead of quietly
// teaching the wrong difficulty.
const files = import.meta.glob('./vocabulary/*/*.json', { eager: true, import: 'default' });

function parse(sourcePath, raw) {
  const [, , folder, file] = sourcePath.split('/');
  const level = levelFromFolder(folder);
  return validateVocabularyCollection(raw, { source: `${level}/${file}`, level });
}

export const vocabulary = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .flatMap(([path, raw]) => parse(path, raw));

// A game declares which content types it eats, never which files. Adding
// content/grammar/ later means adding one line here and every game that lists
// "grammar" picks it up without being touched.
const SOURCES = {
  vocabulary: () => vocabulary,
};

export function poolFor({ contentTypes, level }) {
  const unsupported = contentTypes.filter((type) => !SOURCES[type]);
  if (unsupported.length > 0) {
    throw new Error(`no content source for: ${unsupported.join(', ')} — register it in src/content/index.js`);
  }
  const seen = new Set();
  const items = [];
  for (const type of contentTypes) {
    for (const item of SOURCES[type]()) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      if (!level || item.level === level) items.push(item);
    }
  }
  return items;
}

export function reviewPool({ contentTypes, level, preferredIds, minimum }) {
  return selectReviewPool({ items: poolFor({ contentTypes, level }), preferredIds, minimum });
}
