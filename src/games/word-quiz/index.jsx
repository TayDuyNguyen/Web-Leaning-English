import { useState } from 'react';
import { isComplete } from './logic.js';

export default function WordQuiz({ round, onChange, onSubmit }) {
  const [answers, setAnswers] = useState({});

  function choose(itemId, meaning) {
    const next = { ...answers, [itemId]: meaning };
    setAnswers(next);
    onChange(next);
    if (isComplete(round, next)) onSubmit(next);
  }

  return (
    <div className="quiz-board">
      {round.items.map((item, index) => (
        <div key={item.id} className="quiz-card">
          <p className="quiz-question">
            <span className="quiz-number">{index + 1}</span>
            <strong>{item.word}</strong>
          </p>
          <div className="quiz-options">
            {item.options.map((option) => (
              <button
                key={option}
                type="button"
                className={`quiz-option${answers[item.id] === option ? ' is-selected' : ''}`}
                onClick={() => choose(item.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
