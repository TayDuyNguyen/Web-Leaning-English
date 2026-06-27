import { useState, useEffect } from 'react';
import { grammarTopics } from '../data/topics';
import { tensesData } from '../data/chuyen-de-thi-dong-tu';
import { sequenceOfTensesData } from '../data/su-phoi-thi';

const topicDataMap = {
  'chuyen-de-thi-dong-tu': tensesData,
  'su-phoi-thi': sequenceOfTensesData
};

function checkUserAnswer(userVal, correctVal, q) {
  const norm = s => {
    if (!s) return '';
    return s.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,'’"“`?!_…:;~~\-–—]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\bdo not\b/g, 'dont')
      .replace(/\bdoes not\b/g, 'doesnt')
      .replace(/\bdid not\b/g, 'didnt')
      .replace(/\bhave not\b/g, 'havent')
      .replace(/\bhas not\b/g, 'hasnt')
      .replace(/\bhad not\b/g, 'hadnt')
      .replace(/\bwill not\b/g, 'wont')
      .replace(/\bcannot\b/g, 'cant')
      .replace(/\bis not\b/g, 'isnt')
      .replace(/\bare not\b/g, 'arent')
      .replace(/\bwas not\b/g, 'wasnt')
      .replace(/\bwere not\b/g, 'werent')
      .replace(/\bwould not\b/g, 'wouldnt')
      .replace(/\bshould not\b/g, 'shouldnt')
      .replace(/\bcould not\b/g, 'couldnt')
      .trim();
  };

  const userParts = (userVal || '').split('/').map(p => norm(p));
  let numBlanks = 1;
  if (q && q.text) {
    const m = q.text.match(/\(.*?\)/g);
    if (m) numBlanks = m.length;
  }

  const alternatives = (correctVal || '').split(/\||\bor\b/i).map(alt => alt.trim());

  for (const alt of alternatives) {
    if (numBlanks > 1) {
      const correctParts = alt.split(/[;/]/).map(p => norm(p));
      if (correctParts.length <= userParts.length && correctParts.every((cp, i) => userParts[i] === cp)) {
        return true;
      }
    } else {
      const correctAlts = alt.split(/[;/]/).map(p => norm(p));
      if (correctAlts.some(ca => userParts[0] === ca)) {
        return true;
      }
    }
  }
  return false;
}

export default function TopicStudy({ topicId, onBackToDashboard, scores, onUpdateScores }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const topicInfo = grammarTopics.find(t => t.id === topicId);
  const data = topicDataMap[topicId];

  const [activeItem, setActiveItem] = useState(() => {
    if (data) {
      const hash = window.location.hash;
      const prefix = `#topic-${topicId}/`;
      if (hash.startsWith(prefix)) {
        const subpath = hash.substring(prefix.length);
        const [type, idStr] = subpath.split('-');
        const id = parseInt(idStr);
        if ((type === 'theory' || type === 'exercise') && !isNaN(id)) {
          return { type, id };
        }
      }

      if (data.tenses && data.tenses.length > 0) {
        return { type: 'theory', id: 0 };
      } else if (data.exercises && data.exercises.length > 0) {
        return { type: 'exercise', id: 0 };
      }
    }
    return { type: 'theory', id: 0 };
  });

  const [inputStates, setInputStates] = useState({}); // Stores text field inputs: { [qNum]: string or [string, string...] }

  // Sync URL hash when activeItem changes
  useEffect(() => {
    if (activeItem && topicId) {
      const expectedHash = `#topic-${topicId}/${activeItem.type}-${activeItem.id}`;
      if (window.location.hash !== expectedHash) {
        window.location.hash = expectedHash;
      }
    }
  }, [activeItem, topicId]);

  // Sync activeItem from URL hash when hash changes (e.g. browser back/forward)
  useEffect(() => {
    const syncItemFromHash = () => {
      const hash = window.location.hash;
      const prefix = `#topic-${topicId}/`;
      if (hash.startsWith(prefix)) {
        const subpath = hash.substring(prefix.length);
        const [type, idStr] = subpath.split('-');
        const id = parseInt(idStr);
        if ((type === 'theory' || type === 'exercise') && !isNaN(id)) {
          setActiveItem(prev => {
            if (prev.type === type && prev.id === id) return prev;
            return { type, id };
          });
        }
      }
    };

    window.addEventListener('hashchange', syncItemFromHash);
    return () => window.removeEventListener('hashchange', syncItemFromHash);
  }, [topicId]);

  if (!data || !topicInfo) {
    return (
      <div className="container" style={{ padding: '64px', textAlign: 'center', color: 'var(--white)' }}>
        Không tìm thấy dữ liệu chuyên đề này.
      </div>
    );
  }

  const topicScores = scores[topicId] || {};

  // Progress calculations
  const totalEx = data.exercises.length;
  let completedEx = 0;
  for (let i = 0; i < totalEx; i++) {
    if (topicScores[i]?.completed) {
      completedEx++;
    }
  }
  const progressPercent = totalEx > 0 ? Math.round((completedEx / totalEx) * 100) : 0;

  // Sidebar item lists
  const handleItemSelect = (type, id) => {
    setActiveItem({ type, id });
    setMobileSidebarOpen(false);
    setInputStates({});
  };

  const handlePrevEx = () => {
    if (activeItem.type === 'exercise' && activeItem.id > 0) {
      handleItemSelect('exercise', activeItem.id - 1);
    }
  };

  const handleNextEx = () => {
    if (activeItem.type === 'exercise') {
      if (activeItem.id < totalEx - 1) {
        handleItemSelect('exercise', activeItem.id + 1);
      } else {
        onBackToDashboard();
      }
    }
  };

  // Exercise Scoring Logic
  const getExerciseScore = (exIdx) => {
    return topicScores[exIdx] || { correct: 0, answered: 0, completed: false, answers: {}, checked: {} };
  };

  const updateExerciseScore = (exIdx, updater) => {
    const current = getExerciseScore(exIdx);
    const updated = updater(current);
    const newTopicScores = { ...topicScores, [exIdx]: updated };
    onUpdateScores(topicId, newTopicScores);
  };

  const handleTextChange = (qNum, blankIdx, numBlanks, val) => {
    if (numBlanks > 1) {
      const prev = inputStates[qNum] || [];
      const updated = [...prev];
      updated[blankIdx] = val;
      setInputStates({ ...inputStates, [qNum]: updated });
    } else {
      setInputStates({ ...inputStates, [qNum]: val });
    }
  };

  const handleCheckQuestion = (exIdx, q) => {
    const userVal = inputStates[q.num];
    let ansStr = '';
    if (Array.isArray(userVal)) {
      ansStr = userVal.map(s => (s || '').trim()).join('/');
    } else {
      ansStr = (userVal || '').trim();
    }
    
    if (!ansStr) return;

    const ok = q.type === 'choice' ? ansStr === q.answer : checkUserAnswer(ansStr, q.answer, q);

    updateExerciseScore(exIdx, (prev) => {
      const answers = { ...prev.answers, [q.num]: ansStr };
      const checked = { ...prev.checked, [q.num]: true };
      
      let correct = prev.correct;
      let answered = prev.answered;
      if (ok) correct++;
      answered++;

      const isCompleted = Object.keys(checked).length === data.exercises[exIdx].questions.length;
      return {
        ...prev,
        answers,
        checked,
        correct,
        answered,
        completed: isCompleted
      };
    });
  };

  const handleChoiceSelect = (exIdx, q, letter, isChecked) => {
    if (isChecked) return;
    setInputStates({ ...inputStates, [q.num]: letter });
  };

  const handleResetExercise = (exIdx) => {
    if (window.confirm("Bạn muốn làm lại toàn bộ bài tập này?")) {
      updateExerciseScore(exIdx, () => ({
        correct: 0,
        answered: 0,
        completed: false,
        answers: {},
        checked: {}
      }));
      setInputStates({});
    }
  };

  // Active items
  const activeTheory = activeItem.type === 'theory' ? data.tenses[activeItem.id] : null;
  const activeExIdx = activeItem.type === 'exercise' ? activeItem.id : 0;
  const activeExercise = activeItem.type === 'exercise' ? data.exercises[activeItem.id] : null;
  const exScore = getExerciseScore(activeExIdx);

  return (
    <div className="app-layout" style={{ minHeight: 'calc(100vh - 79px)' }}>
      
      {/* SIDEBAR */}
      <aside className={`sidebar ${mobileSidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header" style={{ padding: '16px' }}>
          <button onClick={onBackToDashboard} className="btn btn--outline-theme btn--sm" style={{ width: '100%', justifyContent: 'center', gap: '8px', color: 'var(--white)', borderColor: 'rgba(255,255,255,0.2)' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Quay lại Dashboard
          </button>
          <div className="sidebar__topic-info">
            <span className="sidebar__topic-num">Chuyên đề {topicInfo.number}</span>
            <div className="sidebar__topic-title truncate">{topicInfo.name}</div>
            <div className="sidebar__topic-en truncate">{topicInfo.englishName}</div>
          </div>
        </div>

        <nav className="sidebar__nav">
          {data.tenses && data.tenses.length > 0 && (
            <div>
              <h4 className="sidebar__section-title">Lý Thuyết &amp; Cách Dùng</h4>
              <ul className="sidebar__list">
                {data.tenses.map((t, idx) => (
                  <li key={t.id}>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleItemSelect('theory', idx); }}
                      className={`nav-item ${activeItem.type === 'theory' && activeItem.id === idx ? 'nav-item--active' : ''}`}
                    >
                      <span className="sidebar__link-icon">📖</span>
                      <span className="truncate">{t.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.exercises && data.exercises.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 className="sidebar__section-title">Luyện Tập Chấm Điểm</h4>
              <ul className="sidebar__list">
                {data.exercises.map((ex, idx) => {
                  const isDone = topicScores[idx]?.completed;
                  return (
                    <li key={idx}>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleItemSelect('exercise', idx); }}
                        className={`nav-item ${activeItem.type === 'exercise' && activeItem.id === idx ? 'nav-item--active' : ''}`}
                      >
                        <span className="sidebar__link-icon">{isDone ? '✅' : '✏️'}</span>
                        <span className="truncate">{ex.name}</span>
                        {isDone && <span className="sidebar__check-done">✓</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>

        <div className="sidebar__progress">
          <div className="sidebar__prog-header">
            <span>Tiến độ chuyên đề</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="sidebar__prog-text">{completedEx} / {totalEx} Bài hoàn thành</div>
        </div>
      </aside>

      <div className="sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} style={{ display: mobileSidebarOpen ? 'block' : 'none' }}></div>

      {/* CONTENT AREA */}
      <div className="content-area">
        
        {/* Mobile Toggle Button */}
        <div className="mobile-toggle">
          <button className="mobile-toggle__btn" onClick={() => setMobileSidebarOpen(true)}>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            Danh mục bài học
          </button>
          <span className="mobile-toggle__current">
            {activeItem.type === 'theory' ? `Lý thuyết: ${activeTheory?.name}` : `Bài tập: ${activeExercise?.name}`}
          </span>
        </div>

        <div className="content-inner">

          {/* 1. THEORY PANEL */}
          {activeItem.type === 'theory' && activeTheory && (
            <div id="theoryPanel" className="content-panel content-panel--active">
              <div className="theory-header">
                <span className="section-eyebrow">Lý thuyết & công thức</span>
                <h2>{activeTheory.name}</h2>
              </div>

              {/* Timeline (Trục thời gian) */}
              <div className="surface-card">
                <div className="card-section-title">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  Trục Thời Gian (Tense Timeline)
                </div>
                <div className="timeline-track">
                  <div className="timeline-line"></div>
                  <div className={`timeline-node ${activeTheory.name.includes('quá khứ') ? 'timeline-node--active' : ''}`}>
                    Quá khứ
                    <span className="timeline-node__sub">Past</span>
                  </div>
                  <div className={`timeline-node ${activeTheory.name.includes('hiện tại') ? 'timeline-node--active' : ''}`}>
                    Hiện tại
                    <span className="timeline-node__sub">Present</span>
                  </div>
                  <div className={`timeline-node ${activeTheory.name.includes('tương lai') || activeTheory.name.includes('tương tai') ? 'timeline-node--active' : ''}`}>
                    Tương lai
                    <span className="timeline-node__sub">Future</span>
                  </div>
                </div>
                <div className="timeline-spacer"></div>
              </div>

              {/* Usage & Formulas */}
              <div className="theory-grid">
                <div className="surface-card">
                  <div className="card-section-title">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    Cách Dùng (Usage)
                  </div>
                  <div className="usage-text-block">
                    {activeTheory.usage}
                  </div>
                </div>

                <div className="surface-card">
                  <div className="card-section-title">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    Cấu Trúc Công Thức (Formula)
                  </div>
                  <div className="flex-row-gap" style={{ flexDirection: 'column' }}>
                    {activeTheory.formula?.custom ? (
                      activeTheory.formula.rules?.map((rule, ri) => (
                        <div key={ri} className="formula-block">
                          <div className="formula-block__title">{rule.title}</div>
                          {rule.formula && <div className="formula-expression">{rule.formula}</div>}
                          {rule.past && <div className="formula-past">Quá khứ: {rule.past}</div>}
                          {rule.past_eg && <div className="formula-eg formula-eg--indented">e.g. {rule.past_eg}</div>}
                          {rule.future && <div className="formula-future">Tương lai: {rule.future}</div>}
                          {rule.future_eg && <div className="formula-eg formula-eg--indented">e.g. {rule.future_eg}</div>}
                          {rule.eg && <div className="formula-eg formula-eg--spaced">e.g. {rule.eg}</div>}
                        </div>
                      ))
                    ) : (
                      <>
                        {activeTheory.formula?.ordinary && (
                          <div className="formula-block">
                            <div className="formula-block__title formula-block__title--cyan">Động từ thường (Ordinary Verbs)</div>
                            <div>➕ Khẳng định: <code className="formula-code">{activeTheory.formula.ordinary.affirmative}</code></div>
                            <div>➖ Phủ định: <code className="formula-code">{activeTheory.formula.ordinary.negative}</code></div>
                            <div>❓ Nghi vấn: <code className="formula-code">{activeTheory.formula.ordinary.interrogative}</code></div>
                          </div>
                        )}
                        {activeTheory.formula?.be && (
                          <div className="formula-block">
                            <div className="formula-block__title">Động từ To Be</div>
                            <div>➕ Khẳng định: <code className="formula-code">{activeTheory.formula.be.affirmative}</code></div>
                            <div>➖ Phủ định: <code className="formula-code">{activeTheory.formula.be.negative}</code></div>
                            <div>❓ Nghi vấn: <code className="formula-code">{activeTheory.formula.be.interrogative}</code></div>
                          </div>
                        )}
                        {activeTheory.formula?.notes && (
                          <div className="formula-notes">
                            <strong>Lưu ý:</strong>
                            <ul>
                              {activeTheory.formula.notes.map((n, ni) => <li key={ni}>{n}</li>)}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Signals */}
              {activeTheory.signals && (
                <div className="surface-card">
                  <div className="card-section-title">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    Dấu Hiệu Nhận Biết
                  </div>
                  <div className="signals-text">
                    {activeTheory.signals}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. PRACTICE PANEL */}
          {activeItem.type === 'exercise' && activeExercise && (
            <div id="practicePanel" className="content-panel content-panel--active">
              <div className="exercise-header">
                <div>
                  <span className="section-eyebrow">Luyện tập trắc nghiệm</span>
                  <h2>{activeExercise.name}</h2>
                  <p className="text-muted">{activeExercise.description}</p>
                </div>
                <div className="exercise-header__actions">
                  <span className="score-chip">
                    Điểm: {exScore.correct} / {activeExercise.questions.length}
                  </span>
                  <button onClick={() => handleResetExercise(activeExIdx)} className="btn btn--outline btn--sm">
                    Làm lại
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="question-list">
                {activeExercise.questions.map((q) => {
                  const userAnswer = exScore.answers[q.num] || '';
                  const isChecked = exScore.checked[q.num] === true;
                  const isCorrect = q.type === 'choice' ? userAnswer === q.answer : checkUserAnswer(userAnswer, q.answer, q);

                  // Blank parsing
                  const blankMatches = q.text ? (q.text.match(/\(.*?\)/g) || []) : [];
                  const numBlanks = blankMatches.length || 1;
                  const savedParts = userAnswer ? userAnswer.split('/').map(p => p.trim()) : [];

                  const isInputEmpty = (() => {
                    if (q.type === 'choice') {
                      return !userAnswer;
                    }
                    if (numBlanks > 1) {
                      const parts = inputStates[q.num] || [];
                      return parts.length < numBlanks || parts.some(p => !(p || '').trim());
                    }
                    return !(inputStates[q.num] || '').trim();
                  })();

                  return (
                    <div key={q.num} className="question-card">
                      <div className="question-num">Câu hỏi {q.num}</div>
                      <div className="question-text">{q.text}</div>

                      {/* Question Answer Inputs */}
                      <div className="question-input-row">
                        {q.type === 'choice' ? (
                          <div className="choices-grid">
                            {Object.entries(q.options || {}).map(([letter, val]) => {
                              const isSelected = userAnswer === letter || inputStates[q.num] === letter;
                              let btnClass = 'choice-btn';
                              if (isSelected) btnClass += ' choice-btn--selected';
                              if (isChecked) {
                                if (letter === q.answer) btnClass += ' choice-btn--correct';
                                else if (isSelected) btnClass += ' choice-btn--wrong';
                              }

                              return (
                                <button
                                  key={letter}
                                  disabled={isChecked}
                                  onClick={() => handleChoiceSelect(activeExIdx, q, letter, isChecked)}
                                  className={btnClass}
                                >
                                  <span className="choice-letter">{letter}</span>
                                  <span className="choice-label">{val}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : numBlanks > 1 ? (
                          <div className="flex-row-gap" style={{ flexDirection: 'column' }}>
                            <div className="blank-hint-label">
                              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z"/></svg>
                              Điền vào từng ô ({numBlanks} chỗ trống)
                            </div>
                            <div className="blanks-grid" style={{ gridTemplateColumns: `repeat(${Math.min(numBlanks, 3)}, 1fr)`, gap: '12px' }}>
                              {Array.from({ length: numBlanks }).map((_, bi) => {
                                const hint = blankMatches[bi] ? blankMatches[bi].replace(/[()]/g, '') : `Ô ${bi + 1}`;
                                const currentInpVal = isChecked ? savedParts[bi] || '' : (inputStates[q.num] || [])[bi] || '';
                                return (
                                  <div key={bi} className="blank-item">
                                    <label>Ô {bi + 1}: ({hint})</label>
                                    <input
                                      type="text"
                                      disabled={isChecked}
                                      placeholder={`(${hint})...`}
                                      value={currentInpVal}
                                      onChange={(e) => handleTextChange(q.num, bi, numBlanks, e.target.value)}
                                      className={`input-text ${isChecked ? (isCorrect ? 'input-text--correct' : 'input-text--wrong') : ''}`}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="flex-row-gap">
                            <input
                              type="text"
                              disabled={isChecked}
                              placeholder="Nhập câu trả lời..."
                              value={isChecked ? userAnswer : inputStates[q.num] || ''}
                              onChange={(e) => handleTextChange(q.num, 0, 1, e.target.value)}
                              className={`input-text ${isChecked ? (isCorrect ? 'input-text--correct' : 'input-text--wrong') : ''}`}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleCheckQuestion(activeExIdx, q);
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Check Button & Explanation Panel */}
                      {!isChecked ? (
                        <button
                          onClick={() => handleCheckQuestion(activeExIdx, q)}
                          disabled={isInputEmpty}
                          className="btn btn--primary btn--sm btn-check-q"
                        >
                          Kiểm tra
                        </button>
                      ) : (
                        <div className={`explanation ${isCorrect ? 'explanation--correct' : 'explanation--wrong'}`}>
                          <div className="explanation__status">{isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng!'}</div>
                          <div className="explanation__answer">Đáp án đúng: <code>{q.answer}</code></div>
                          <p className="explanation__text">{q.explanation || 'Không có giải thích chi tiết.'}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Prev / Next Exercise Nav */}
              <div className="exercise-nav">
                <button
                  disabled={activeExIdx === 0}
                  onClick={handlePrevEx}
                  className="btn btn--outline-theme btn--sm"
                >
                  ← Bài trước
                </button>
                <button
                  onClick={handleNextEx}
                  className="btn btn--primary btn--sm"
                >
                  {activeExIdx === totalEx - 1 ? '↩ Dashboard' : 'Bài tiếp theo →'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
