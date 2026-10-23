import { useState } from 'react';

import {
  CUSTOM_WORDS_LIMIT,
  addCustomWords,
  clearCustomWordsForLevel,
  parseCustomWords,
  removeCustomWord,
} from '../content/customWords.js';

export default function WordImport({ level, knownWords, customWords, onChanged }) {
  const [draft, setDraft] = useState('');
  const [errors, setErrors] = useState([]);
  const [note, setNote] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const parsed = parseCustomWords(draft, { level, taken: knownWords });
    const room = Math.max(0, CUSTOM_WORDS_LIMIT - customWords.length);

    if (parsed.items.length === 0) {
      setErrors(parsed.errors);
      setNote('');
      return;
    }

    const accepted = parsed.items.slice(0, room);
    const problems = [...parsed.errors];
    if (parsed.items.length > room) {
      problems.push({
        line: 0,
        message: `chỉ còn ${room} chỗ trống (tối đa ${CUSTOM_WORDS_LIMIT} từ), ${parsed.items.length - room} từ chưa được nạp`,
      });
    }

    addCustomWords(accepted);
    setDraft('');
    setErrors(problems);
    setNote(accepted.length > 0 ? `Đã nạp ${accepted.length} từ vào mức ${level}.` : '');
    if (accepted.length > 0) onChanged();
  };

  const remove = (id) => {
    removeCustomWord(id);
    setErrors([]);
    setNote('Đã xoá từ.');
    onChanged();
  };

  const clear = () => {
    clearCustomWordsForLevel(level);
    setErrors([]);
    setNote(`Đã xoá ${customWords.length} từ của mức ${level}.`);
    onChanged();
  };

  return (
    <section>
      <h2 className="section-title">Nạp từ</h2>
      <p className="hint">
        Mỗi dòng một từ, dạng <code>word = nghĩa</code>. Từ chỉ nằm trên máy này (localStorage),
        không gửi đi đâu, và chỉ được dùng ở mức {level}.
      </p>

      <form className="word-import" onSubmit={submit}>
        <textarea
          className="word-import-input"
          rows={4}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={'wallet = ví\nticket = vé\ncheck-in = nhận phòng'}
          aria-label="Danh sách từ cần nạp, mỗi dòng word = nghĩa"
          spellCheck="false"
        />
        <div className="word-import-actions">
          <button type="submit" className="primary-button" disabled={draft.trim() === ''}>
            Nạp từ
          </button>
          {customWords.length > 0 ? (
            <button type="button" className="ghost-button" onClick={clear}>
              Xoá tất cả
            </button>
          ) : null}
        </div>
      </form>

      {errors.length > 0 ? (
        <ul className="word-import-errors" role="alert">
          {errors.map((problem, index) => (
            <li key={`${problem.line}-${index}`}>
              {problem.line > 0 ? `Dòng ${problem.line}: ` : ''}
              {problem.message}
            </li>
          ))}
        </ul>
      ) : null}

      {note !== '' ? <p className="word-import-note" role="status">{note}</p> : null}

      {customWords.length > 0 ? (
        <ul className="word-import-list">
          {customWords.map((item) => (
            <li key={item.id}>
              <span>
                <strong>{item.word}</strong> — {item.meaningVi}
              </span>
              <button
                type="button"
                className="word-import-remove"
                onClick={() => remove(item.id)}
                aria-label={`Xoá ${item.word}`}
                title={`Xoá ${item.word}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="hint">Chưa có từ nào cho mức {level}.</p>
      )}
    </section>
  );
}
