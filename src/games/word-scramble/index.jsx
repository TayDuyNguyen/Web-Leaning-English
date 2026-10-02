import { useState } from 'react';
import { isComplete } from './logic.js';

export default function WordScramble({ round, onChange, onSubmit }) {
  const [answers, setAnswers] = useState({});

  function type(itemId, value) {
    const next = { ...answers, [itemId]: value };
    setAnswers(next);
    onChange(next);
  }

  return (
    <div className="scramble-board">
      {round.items.map((item) => (
        <div key={item.id} className="scramble-row">
          <div className="scramble-prompt">
            <span className="scramble-letters">{item.letters}</span>
            <span className="scramble-meaning">{item.meaningVi}</span>
          </div>
          <input
            className="scramble-input"
            type="text"
            value={answers[item.id] ?? ''}
            onChange={(event) => type(item.id, event.target.value)}
            placeholder="Từ tiếng Anh"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      ))}

      <button type="button" className="primary-button" disabled={!isComplete(round, answers)} onClick={() => onSubmit(answers)}>
        Nộp bài
      </button>
    </div>
  );
}
