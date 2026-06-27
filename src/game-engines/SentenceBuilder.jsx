import { useState, useEffect, useRef } from 'react';
import { resolveQuizRound } from './gameRules';

export default function SentenceBuilder({ questionsList, onQuit, isVocabMode = false, onWordResult, onQuestionResult }) {
  const MAX_HEARTS = 3;
  const STREAK_FOR_HEART = 5;
  const buildWordPool = (question) => {
    if (!question) return [];
    return question.words.map((w, idx) => ({
      id: idx,
      val: w,
      used: false
    }));
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_HEARTS);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [streakMessage, setStreakMessage] = useState('');
  const [heartNotice, setHeartNotice] = useState('');
  const [canAnswer, setCanAnswer] = useState(true);
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  
  // Scramble states
  const [selectedWords, setSelectedWords] = useState([]); // Array of { id, val }
  const [shuffledQuestions, setShuffledQuestions] = useState(() => {
    return [...questionsList].sort(() => Math.random() - 0.5);
  });

  const [wordPool, setWordPool] = useState(() => buildWordPool(shuffledQuestions[0])); // Array of { id, val, used }
  const [isCorrectState, setIsCorrectState] = useState(null); // null, true, false
  
  const containerRef = useRef(null);
  const currentIdxRef = useRef(currentIdx);
  useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);
  const currentQuestion = shuffledQuestions[currentIdx];

  const moveToQuestion = (nextIdx) => {
    const nextQuestion = shuffledQuestions[nextIdx];
    setCurrentIdx(nextIdx);
    setSelectedWords([]);
    setWordPool(buildWordPool(nextQuestion));
    setIsCorrectState(null);
    setCanAnswer(true);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const triggerHeartNotice = (message) => {
    setHeartNotice(message);
    setTimeout(() => setHeartNotice(''), 1800);
  };

  const handleWordSelect = (wordObj) => {
    if (!canAnswer || wordObj.used) return;

    // Mark as used in pool
    setWordPool((pool) =>
      pool.map((w) => (w.id === wordObj.id ? { ...w, used: true } : w))
    );
    // Add to selected
    setSelectedWords((sel) => [...sel, wordObj]);
  };

  const handleWordDeselect = (wordObj, index) => {
    if (!canAnswer) return;

    // Mark as unused in pool
    setWordPool((pool) =>
      pool.map((w) => (w.id === wordObj.id ? { ...w, used: false } : w))
    );
    // Remove from selected
    setSelectedWords((sel) => sel.filter((_, idx) => idx !== index));
  };

  const handleClear = () => {
    if (!canAnswer) return;
    setSelectedWords([]);
    setWordPool((pool) => pool.map((w) => ({ ...w, used: false })));
  };

  const triggerParticles = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Explode in the center of the drop zone
    const dropZoneEl = containerRef.current.querySelector('.sb-drop-zone');
    if (!dropZoneEl) return;
    const dropRect = dropZoneEl.getBoundingClientRect();
    const x = dropRect.left + dropRect.width / 2 - rect.left;
    const y = dropRect.top + dropRect.height / 2 - rect.top;

    const colors = ['#FFD300', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6'];
    const newParticles = Array.from({ length: 24 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 40 + Math.random() * 120;
      return {
        id: Date.now() + i,
        x,
        y,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 600);
  };

  const handleCheck = () => {
    if (!canAnswer || selectedWords.length === 0) return;
    setCanAnswer(false);

    const userSentence = isVocabMode 
      ? selectedWords.map(item => item.val).join('')
      : selectedWords.map(item => item.val).join(' ');
    
    const normalize = s => s.toLowerCase().replace(/[.,'’"“`?!_…:-]/g, '').replace(/\s+/g, ' ').trim();
    const isCorrect = isVocabMode
      ? userSentence.toLowerCase().trim() === currentQuestion.english.toLowerCase().trim()
      : normalize(userSentence) === normalize(currentQuestion.english);
    const stableIdx = currentIdxRef.current;

    setIsCorrectState(isCorrect);

    if (isVocabMode && onWordResult && currentQuestion?.word) {
      onWordResult(currentQuestion.word, isCorrect);
    }
    // Sentence mastery tracking
    if (!isVocabMode && onQuestionResult && currentQuestion?.id) {
      onQuestionResult(currentQuestion.id, isCorrect);
    }

    if (isCorrect) {
      const result = resolveQuizRound({
        isCorrect: true,
        isLastQuestion: stableIdx + 1 >= shuffledQuestions.length,
        remainingLives: lives,
      });
      const newStreak = consecutiveCorrect + 1;
      const recoveredLives = newStreak % STREAK_FOR_HEART === 0
        ? Math.min(MAX_HEARTS, lives + 1)
        : lives;

      triggerParticles();
      setConsecutiveCorrect(newStreak);
      if (newStreak % STREAK_FOR_HEART === 0) {
        if (recoveredLives > lives) {
          setLives(recoveredLives);
          setStreakMessage(`🔥 Đúng ${STREAK_FOR_HEART} câu liên tiếp: +1 ❤️`);
          triggerHeartNotice('+1 ❤️ Hồi Tim!');
        } else {
          setStreakMessage(`🔥 Đúng ${STREAK_FOR_HEART} câu liên tiếp nhưng tim đã đầy`);
          triggerHeartNotice('Tim đã đầy ❤️');
        }
      } else {
        setStreakMessage('');
      }
      setScore((s) => s + 50);
      
      setTimeout(() => {
        if (result.gameOver) {
          setGameOver(result.gameOver);
          setIsVictory(result.isVictory);
        } else {
          moveToQuestion(stableIdx + 1);
        }
      }, 1500);
    } else {
      triggerShake();
      setConsecutiveCorrect(0);
      setStreakMessage('');
      setLives((l) => {
        const newL = l - 1;
        const result = resolveQuizRound({
          isCorrect: false,
          isLastQuestion: stableIdx + 1 >= shuffledQuestions.length,
          remainingLives: newL,
        });
        if (newL <= 0) {
          setTimeout(() => {
            setGameOver(result.gameOver);
            setIsVictory(result.isVictory);
          }, 1500);
        } else {
          setTimeout(() => {
            if (result.gameOver) {
              setGameOver(result.gameOver);
              setIsVictory(result.isVictory);
            } else {
              moveToQuestion(stableIdx + 1);
            }
          }, 1500);
        }
        return newL;
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setLives(MAX_HEARTS);
    setConsecutiveCorrect(0);
    setStreakMessage('');
    setHeartNotice('');
    setGameOver(false);
    setIsVictory(false);
    const shuffled = [...questionsList].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setSelectedWords([]);
    setWordPool(buildWordPool(shuffled[0]));
    setIsCorrectState(null);
    setCanAnswer(true);
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < MAX_HEARTS; i++) {
      hearts.push(
        <span key={i} className={`heart-icon${i >= lives ? ' lost' : ''}`}>
          ❤️
        </span>
      );
    }
    return hearts;
  };

  if (gameOver) {
    return (
      <div id="gameOverScreen" className="game-over-screen">
        <div className="game-over-icon">{isVictory ? '🏆' : '💀'}</div>
        <h2 className="game-over-title">{isVictory ? 'Thử Thách Hoàn Thành!' : 'Game Over!'}</h2>
        <p className="game-over-desc">
          {isVictory
            ? 'Tuyệt vời! Bạn đã vượt qua tất cả các thử thách của chế độ xây câu.'
            : 'Rất tiếc! Bạn đã hết lượt tim hỗ trợ. Hãy tiếp tục luyện tập và thử lại nhé!'}
        </p>
        
        <div className="game-stats-grid">
          <div className="game-stat-card">
            <div className="game-stat-val">{score}</div>
            <div className="game-stat-lbl">Điểm Đạt Được</div>
          </div>
          <div className="game-stat-card">
            <div className="game-stat-val">-</div>
            <div className="game-stat-lbl">Mức độ hoàn thành</div>
          </div>
        </div>

        <div className="game-actions">
          <button onClick={onQuit} className="btn btn--outline-theme">Về sảnh trò chơi</button>
          <button onClick={handleRestart} className="btn btn--primary">Chơi Lại</button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`game-play-area ${shake ? 'shake' : ''}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Status Row */}
      <div className="game-status-row" id="gameScoreRow">
        <div className="score-badge">Điểm: <span id="gameScore">{score}</span></div>
        <div className="heart-container" id="heartContainer">
          {renderHearts()}
        </div>
      </div>

      {heartNotice && (
        <div className="combo-badge-glowing" style={{ top: '64px', background: 'linear-gradient(135deg, #ff7aa2, #ffd166)', color: '#1f2937' }}>
          {heartNotice}
        </div>
      )}

      {consecutiveCorrect > 0 && (
        <div className="hearts-streak" style={{ marginBottom: '12px', textAlign: 'center' }}>
          🔥 {consecutiveCorrect % STREAK_FOR_HEART}/{STREAK_FOR_HEART} liên tiếp
          {lives < MAX_HEARTS && <span className="hearts-streak-hint"> → hồi ❤️</span>}
        </div>
      )}

      {streakMessage && (
        <div style={{
          marginBottom: '12px',
          textAlign: 'center',
          color: 'var(--yellow)',
          fontWeight: 700,
          fontSize: '13px'
        }}>
          {streakMessage}
        </div>
      )}

      {/* Sentence Builder Screen */}
      {currentQuestion && (
        <div id="screenSentenceBuilder">
          <div className="sb-vietnamese" id="sbVietnamese">
            {currentQuestion.vietnamese}
          </div>

          <div className="sb-drop-zone" id="sbDropZone">
            {selectedWords.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontSize: '14px', pointerEvents: 'none' }}>
                {isVocabMode ? 'Nhấp chọn các chữ cái bên dưới...' : 'Nhấp chọn các từ bên dưới...'}
              </span>
            ) : (
              selectedWords.map((item, index) => {
                let capsuleClass = 'word-capsule placed';
                if (isVocabMode) {
                  capsuleClass += ' letter-tile';
                }
                if (isCorrectState === true) {
                  capsuleClass += ' word-capsule--correct';
                } else if (isCorrectState === false) {
                  capsuleClass += ' word-capsule--wrong';
                }
                return (
                  <span
                    key={index}
                    className={capsuleClass}
                    onClick={() => handleWordDeselect(item, index)}
                  >
                    {item.val}
                  </span>
                );
              })
            )}
          </div>

          <div className="sb-words-pool" id="sbWordsPool">
            {wordPool.map((item) => {
              let capsuleClass = 'word-capsule';
              if (item.used) capsuleClass += ' used';
              if (isVocabMode) capsuleClass += ' letter-tile';
              return (
                <button
                  key={item.id}
                  className={capsuleClass}
                  disabled={item.used || !canAnswer}
                  onClick={() => handleWordSelect(item)}
                >
                  {item.val}
                </button>
              );
            })}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button 
              onClick={handleClear} 
              className="btn btn--outline btn--outline-theme" 
              disabled={!canAnswer || selectedWords.length === 0}
            >
              {isVocabMode ? 'Xóa' : 'Xóa Câu'}
            </button>
            <button 
              onClick={handleCheck} 
              className="btn btn--primary" 
              id="sbCheckBtn" 
              disabled={!canAnswer || selectedWords.length === 0}
            >
              Kiểm Tra
            </button>
          </div>
        </div>
      )}

      {!currentQuestion && (
        <div className="game-over-screen">
          <div className="game-over-icon">⚠️</div>
          <h2 className="game-over-title">Không có câu hỏi khả dụng</h2>
          <p className="game-over-desc">Bộ câu ghép hiện tại đang trống hoặc không hợp lệ. Bạn có thể quay lại Lobby để kiểm tra dữ liệu game.</p>
          <div className="game-actions">
            <button onClick={onQuit} className="btn btn--outline-theme">Về sảnh trò chơi</button>
          </div>
        </div>
      )}

      {/* Render Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            animation: 'explodeEffect 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`
          }}
        />
      ))}

      <style>{`
        @keyframes explodeEffect {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
            opacity: 0;
          }
        }
        .word-capsule.placed {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
