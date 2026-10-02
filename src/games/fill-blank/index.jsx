import { useState } from 'react';
import { isComplete } from './logic.js';

export default function FillBlank({ round, onChange, onSubmit }) {
  const [answers, setAnswers] = useState({});

  function choose(itemId, word) {
    const next = { ...answers, [itemId]: word };
    setAnswers(next);
    onChange(next);
  }

  return (
    <div className="fill-board">
      {round.items.map((item, index) => (
        <div key={item.id} className="fill-card">
          <p className="fill-sentence">
            <span className="fill-number">{index + 1}</span>
            {item.text}
          </p>
          <p className="fill-hint">{item.meaningVi}</p>
          <div className="fill-options">
            {item.options.map((option) => (
              <button
                key={option}
                type="button"
                className={`fill-option${answers[item.id] === option ? ' is-selected' : ''}`}
                onClick={() => choose(item.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button type="button" className="primary-button" disabled={!isComplete(round, answers)} onClick={() => onSubmit(answers)}>
        Nộp bài
      </button>
    </div>
  );
}
