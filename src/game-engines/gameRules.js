export function resolveQuizRound({ isCorrect, remainingLives }) {
  if (!isCorrect && remainingLives <= 0) {
    return { gameOver: true, isVictory: false };
  }

  return { gameOver: false, isVictory: false };
}

export function buildVocabBattleChoices(wordObj, vocabList) {
  if (!wordObj) return [];

  const distractors = [];
  const seenMeanings = new Set([wordObj.meaning.toLowerCase()]);

  [...wordObj.options, ...vocabList.map((item) => item.meaning)].forEach((meaning) => {
    const cleaned = typeof meaning === 'string' ? meaning.trim() : '';
    const key = cleaned.toLowerCase();
    if (!cleaned || seenMeanings.has(key) || distractors.length >= 3) return;
    seenMeanings.add(key);
    distractors.push(cleaned);
  });

  return [
    { meaning: wordObj.meaning, correct: true },
    ...distractors.map((meaning) => ({ meaning, correct: false })),
  ].sort(() => Math.random() - 0.5);
}
