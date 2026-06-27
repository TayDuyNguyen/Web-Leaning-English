const PUNCTUATION_REGEX = /[.,'’"“`?!_…:-]/g;

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function clampMastery(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(3, Math.round(value)));
}

function normalizeStatCount(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.round(value));
}

function dedupeCaseInsensitive(values) {
  const seen = new Set();
  const result = [];

  values.forEach((value) => {
    const cleaned = cleanText(value);
    const key = cleaned.toLowerCase();
    if (!cleaned || seen.has(key)) return;
    seen.add(key);
    result.push(cleaned);
  });

  return result;
}

export function tokenizeSentence(english) {
  return cleanText(english)
    .replace(PUNCTUATION_REGEX, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

export function normalizeVocabEntry(item, index = 0) {
  if (!item || typeof item !== 'object') return null;

  const word = cleanText(item.word);
  const meaning = cleanText(item.meaning);
  const options = dedupeCaseInsensitive(Array.isArray(item.options) ? item.options : []).filter(
    (option) => option.toLowerCase() !== meaning.toLowerCase()
  );

  if (!word || !meaning || options.length < 3) {
    return null;
  }

  return {
    word,
    meaning,
    options: options.slice(0, 3),
    mastery: clampMastery(item.mastery),
    correctCount: normalizeStatCount(item.correctCount),
    incorrectCount: normalizeStatCount(item.incorrectCount),
    id: item.id ?? `vocab-${index}`,
  };
}

export function normalizeGrammarQuestion(item, index = 0) {
  if (!item || typeof item !== 'object') return null;

  const question = cleanText(item.question);
  const options = dedupeCaseInsensitive(Array.isArray(item.options) ? item.options : []);
  const answer = cleanText(item.answer);
  const explanation = cleanText(item.explanation);

  if (!question || options.length !== 4 || !answer) {
    return null;
  }

  const matchedAnswer = options.find((option) => option.toLowerCase() === answer.toLowerCase());
  if (!matchedAnswer) {
    return null;
  }

  return {
    id: item.id ?? `grammar-${index}`,
    question,
    options,
    answer: matchedAnswer,
    explanation: explanation || undefined,
    mastery: clampMastery(item.mastery),
    correctCount: normalizeStatCount(item.correctCount),
    incorrectCount: normalizeStatCount(item.incorrectCount),
  };
}

export function normalizeSentenceQuestion(item, index = 0) {
  if (!item || typeof item !== 'object') return null;

  const vietnamese = cleanText(item.vietnamese);
  const english = cleanText(item.english);
  const derivedWords = tokenizeSentence(english);

  if (!vietnamese || !english || derivedWords.length < 3) {
    return null;
  }

  return {
    id: item.id ?? `sentence-${index}`,
    vietnamese,
    english,
    words: derivedWords,
    mastery: clampMastery(item.mastery),
    correctCount: normalizeStatCount(item.correctCount),
    incorrectCount: normalizeStatCount(item.incorrectCount),
  };
}

export function sanitizeVocabList(list) {
  if (!Array.isArray(list)) return [];

  const seen = new Set();
  return list.reduce((acc, item, index) => {
    const normalized = normalizeVocabEntry(item, index);
    if (!normalized) return acc;

    const key = normalized.word.toLowerCase();
    if (seen.has(key)) return acc;
    seen.add(key);
    acc.push(normalized);
    return acc;
  }, []);
}

export function sanitizeGrammarList(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((item, index) => normalizeGrammarQuestion(item, index))
    .filter(Boolean);
}

export function sanitizeSentenceList(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((item, index) => normalizeSentenceQuestion(item, index))
    .filter(Boolean);
}
