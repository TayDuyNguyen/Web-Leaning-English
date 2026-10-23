export const LEVELS = Object.freeze(['A1', 'A2', 'B1', 'B2', 'C1']);

// Content lives in lowercase folders (a1/, b2/) but items carry the CEFR spelling
// ("A1"). This is the only place that translates between them, so the Vite loader and
// the node-side tests cannot drift into disagreeing about what a folder means.
export function levelFromFolder(name) {
  const level = String(name).trim().toUpperCase();
  if (!LEVELS.includes(level)) {
    throw new Error(`content folder "${name}" is not a CEFR level; expected one of ${LEVELS.join(', ').toLowerCase()}`);
  }
  return level;
}

// Content is authored by hand and by AI, so a malformed item is expected
// damage rather than impossible. Everything in one file is reported together:
// fixing a content file one error at a time is what makes bulk authoring
// unbearable, and a silent skip would hide a word from every game at once.
export function validateVocabularyCollection(rawItems, { source, level }) {
  if (!Array.isArray(rawItems)) {
    throw new Error(`${source}: expected an array of vocabulary items, got ${typeof rawItems}`);
  }

  const problems = [];
  const ids = new Set();
  const items = [];

  rawItems.forEach((raw, index) => {
    const at = `${source}[${index}]`;
    const word = typeof raw?.word === 'string' ? raw.word.trim() : '';
    const meaning = typeof raw?.meaning_vi === 'string' ? raw.meaning_vi.trim() : '';
    const id = typeof raw?.id === 'string' ? raw.id.trim() : '';

    if (!id) problems.push(`${at}: missing "id"`);
    else if (ids.has(id)) problems.push(`${at}: duplicate id "${id}"`);
    ids.add(id);

    if (!word) problems.push(`${at}: missing "word"`);
    if (!meaning) problems.push(`${at}: missing "meaning_vi"`);
    if (raw?.level !== level) problems.push(`${at}: level "${raw?.level}" does not match its folder "${level}"`);

    const options = Array.isArray(raw?.collocations) ? raw.collocations.filter((o) => typeof o === 'string' && o.trim()) : [];
    items.push({
      id,
      word,
      meaningVi: meaning,
      level: raw?.level,
      category: typeof raw?.category === 'string' ? raw.category : 'ungrouped',
      example: typeof raw?.example === 'string' ? raw.example : '',
      collocations: options,
    });
  });

  if (problems.length > 0) {
    throw new Error(`${source}: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  }
  return items;
}
