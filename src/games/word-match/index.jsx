import { useState } from 'react';

// The arena, not the game, owns the clock and the grading. A game only reports its
// current answers through onChange and says "finish" through onSubmit, so a timeout
// can grade whatever the player had typed without the game knowing about timers.
export default function WordMatch({ round, onChange, onSubmit }) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [assignments, setAssignments] = useState({});

  const meaningById = new Map(round.pairs.map((pair) => [pair.id, pair.meaningVi]));
  const usedMeanings = new Set(Object.values(assignments));

  function commit(next) {
    setAssignments(next);
    onChange(next);
    // The payload is handed to onSubmit as an argument: React has not applied
    // onChange to the arena's state yet at this point, so an arena that graded from
    // its own copy would score this round against the previous, emptier answer set.
    if (round.pairs.every((pair) => next[pair.word] !== undefined)) onSubmit(next);
  }

  function chooseWord(word) {
    if (assignments[word] !== undefined) {
      const next = { ...assignments };
      delete next[word];
      commit(next);
      setSelectedWord(null);
      return;
    }
    setSelectedWord(word);
  }

  function chooseMeaning(meaningId) {
    if (!selectedWord || usedMeanings.has(meaningId)) return;
    commit({ ...assignments, [selectedWord]: meaningId });
    setSelectedWord(null);
  }

  return (
    <div className="match-board">
      <div className="match-column">
        <p className="match-column-title">Tiếng Anh</p>
        {round.words.map((pair) => (
          <button
            key={pair.id}
            type="button"
            className={`match-item${assignments[pair.word] ? ' is-matched' : ''}${selectedWord === pair.word ? ' is-selected' : ''}`}
            onClick={() => chooseWord(pair.word)}
          >
            {pair.word}
          </button>
        ))}
      </div>

      <div className="match-column">
        <p className="match-column-title">Tiếng Việt</p>
        {round.meanings.map((pair) => (
          <button
            key={pair.id}
            type="button"
            className={`match-item${usedMeanings.has(pair.id) ? ' is-matched' : ''}`}
            onClick={() => chooseMeaning(pair.id)}
          >
            {meaningById.get(pair.id)}
          </button>
        ))}
      </div>
    </div>
  );
}
