import { useState, useEffect, useRef, useEffectEvent } from 'react';
import { resolveQuizRound } from './gameRules';

export default function TenseRush({ questionsList, timerLimit, onQuit, isVocabMode = false, onWordResult, onQuestionResult }) {
  const MAX_HEARTS = 3;
  const STREAK_FOR_HEART = 5;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_HEARTS);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [streakMessage, setStreakMessage] = useState('');
  const [heartNotice, setHeartNotice] = useState('');
  const [canAnswer, setCanAnswer] = useState(true);
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState([]);
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(timerLimit);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  // ✅ Ref to avoid stale closure in setTimeout/setInterval
  const currentIdxRef = useRef(currentIdx);
  const canAnswerRef = useRef(canAnswer);
  useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);
  useEffect(() => { canAnswerRef.current = canAnswer; }, [canAnswer]);

  const [shuffledQuestions, setShuffledQuestions] = useState(() => {
    return [...questionsList].sort(() => Math.random() - 0.5);
  });

  const currentQuestion = shuffledQuestions[currentIdx];
  const totalQuestions = shuffledQuestions.length;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const triggerHeartNotice = (message) => {
    setHeartNotice(message);
    setTimeout(() => setHeartNotice(''), 1800);
  };

  const moveToQuestion = (nextIdx) => {
    setCurrentIdx(nextIdx);
    setTimeLeft(timerLimit);
    setSelectedBtnIndex(null);
    setCanAnswer(true);
  };

  const continueToNextQuestion = (stableIdx) => {
    if (totalQuestions <= 0) return;

    const shouldWrap = stableIdx + 1 >= totalQuestions;
    if (shouldWrap) {
      const rotatedQuestions =
        totalQuestions > 1
          ? [...shuffledQuestions.slice(1), shuffledQuestions[0]].sort(() => Math.random() - 0.5)
          : [...shuffledQuestions];
      setShuffledQuestions(rotatedQuestions);
      setCurrentIdx(0);
      setTimeLeft(timerLimit);
      setSelectedBtnIndex(null);
      setCanAnswer(true);
      return;
    }

    moveToQuestion(stableIdx + 1);
  };

  const handleTimeout = useEffectEvent(() => {
    if (!canAnswerRef.current) return;
    setCanAnswer(false);
    triggerShake();
    setCombo(0);
    setConsecutiveCorrect(0);
    setStreakMessage('');

    const stableIdx = currentIdxRef.current;
    const stableQuestion = shuffledQuestions[stableIdx];

    if (isVocabMode && onWordResult && stableQuestion?.word) {
      onWordResult(stableQuestion.word, false);
    }
    if (!isVocabMode && onQuestionResult && stableQuestion?.id) {
      onQuestionResult(stableQuestion.id, false);
    }

    setLives((l) => {
      const newL = l - 1;
      const result = resolveQuizRound({
        isCorrect: false,
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
            continueToNextQuestion(stableIdx);
          }
        }, 1500);
      }
      return newL;
    });
  });

  // Start Timer for the current question
  useEffect(() => {
    if (gameOver || !currentQuestion || timerLimit <= 0 || !canAnswer) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 0.1));
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, timerLimit, gameOver, currentQuestion, canAnswer]);

  // Handle timeout when timeLeft hits 0
  useEffect(() => {
    if (timeLeft <= 0 && canAnswer && !gameOver && currentQuestion && timerLimit > 0) {
      handleTimeout();
    }
  }, [timeLeft, canAnswer, gameOver, currentQuestion, timerLimit]);

  const triggerParticles = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const colors = ['#FFD300', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6'];
    const newParticles = Array.from({ length: 24 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 40 + Math.random() * 120;
      return {
        id: Date.now() + i,
        x: clickX,
        y: clickY,
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

  const handleChoiceClick = (option, btnIndex, e) => {
    if (!canAnswer) return;
    setCanAnswer(false);
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSelectedBtnIndex(btnIndex);
    const isCorrect = option === currentQuestion.answer;
    const stableIdx = currentIdxRef.current;

    if (isVocabMode && onWordResult && currentQuestion?.word) {
      onWordResult(currentQuestion.word, isCorrect);
    }
    // Grammar mastery tracking
    if (!isVocabMode && onQuestionResult && currentQuestion?.id) {
      onQuestionResult(currentQuestion.id, isCorrect);
    }

    if (isCorrect) {
      const result = resolveQuizRound({
        isCorrect: true,
        remainingLives: lives,
      });
      triggerParticles(e);
      const newCombo = combo + 1;
      const newStreak = consecutiveCorrect + 1;
      const recoveredLives = newStreak % STREAK_FOR_HEART === 0
        ? Math.min(MAX_HEARTS, lives + 1)
        : lives;

      setCombo(newCombo);
      setConsecutiveCorrect(newStreak);
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }
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
      setScore((s) => s + 10 * newCombo);
      
      setTimeout(() => {
        if (result.gameOver) {
          setGameOver(result.gameOver);
          setIsVictory(result.isVictory);
        } else {
          continueToNextQuestion(stableIdx);
        }
      }, 1500);
    } else {
      triggerShake();
      setCombo(0);
      setConsecutiveCorrect(0);
      setStreakMessage('');
      setLives((l) => {
        const newL = l - 1;
        const result = resolveQuizRound({
          isCorrect: false,
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
              continueToNextQuestion(stableIdx);
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
    setCombo(0);
    setMaxCombo(0);
    setConsecutiveCorrect(0);
    setStreakMessage('');
    setHeartNotice('');
    setGameOver(false);
    setIsVictory(false);
    setShuffledQuestions([...questionsList].sort(() => Math.random() - 0.5));
    moveToQuestion(0);
  };

  // Hearts Rendering
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
        <h2 className="game-over-title">{isVictory ? 'Thử Thách Hoàn Thành!' : 'Hết Tim Rồi!'}</h2>
        <p className="game-over-desc">
          {isVictory
            ? 'Tuyệt vời! Bạn đã vượt qua tất cả các thử thách của chế độ tốc độ ngữ pháp.'
            : 'Bạn đã hết tim nên màn chơi tạm dừng. Khi còn tim, game sẽ tự xoay vòng câu hỏi và chơi tiếp liên tục.'}
        </p>
        
        <div className="game-stats-grid">
          <div className="game-stat-card">
            <div className="game-stat-val">{score}</div>
            <div className="game-stat-lbl">Điểm Đạt Được</div>
          </div>
          <div className="game-stat-card">
            <div className="game-stat-val">{maxCombo}</div>
            <div className="game-stat-lbl">Combo Lớn Nhất</div>
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
      {/* Combo Badge */}
      {combo > 1 && (
        <div className="combo-badge-glowing">
          Combo x{combo}
        </div>
      )}

      {heartNotice && (
        <div className="combo-badge-glowing" style={{ top: '64px', background: 'linear-gradient(135deg, #ff7aa2, #ffd166)', color: '#1f2937' }}>
          {heartNotice}
        </div>
      )}

      {/* Status Row */}
      <div className="game-status-row" id="gameScoreRow">
        <div className="score-badge">Điểm: <span id="gameScore">{score}</span></div>
        <div className="heart-container" id="heartContainer">
          {renderHearts()}
        </div>
      </div>

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

      {/* Timer Section */}
      {timerLimit > 0 && (
        <div className="game-timer-container" id="gameTimerContainer">
          <div className="game-timer-label">
            <span>Thời gian còn lại</span>
            <span id="gameTimerText">{timeLeft.toFixed(1)}s</span>
          </div>
          <div className="game-timer-bar">
            <div 
              className={`game-timer-fill ${timeLeft <= 3.0 ? 'warning' : ''}`}
              style={{ width: `${(timeLeft / timerLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tense Rush MCQ Screen */}
      {currentQuestion && (
        <div id="screenTenseRush">
          <div className="game-prompt" id="trQuestion">
            {currentQuestion.question}
          </div>
          <div className="game-choices" id="trChoices">
            {currentQuestion.options.map((option, index) => {
              let btnClass = 'game-choice-btn';
              const isSelected = selectedBtnIndex === index;
              const isCorrect = option === currentQuestion.answer;

              if (!canAnswer) {
                if (isCorrect) {
                  btnClass += ' correct';
                } else if (isSelected) {
                  btnClass += ' wrong';
                } else {
                  btnClass += ' dim';
                }
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  disabled={!canAnswer}
                  onClick={(e) => handleChoiceClick(option, index, e)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {!canAnswer && currentQuestion.explanation && (
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              borderLeft: '4px solid var(--blue-bright)',
              borderRadius: '4px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '13px',
              lineHeight: '1.6',
              animation: 'fadeIn 0.3s ease'
            }}>
              💡 <strong>Giải thích:</strong> {currentQuestion.explanation}
            </div>
          )}
        </div>
      )}

      {!currentQuestion && (
        <div className="game-over-screen">
          <div className="game-over-icon">⚠️</div>
          <h2 className="game-over-title">Không có câu hỏi khả dụng</h2>
          <p className="game-over-desc">Bộ câu hỏi hiện tại đang trống hoặc không hợp lệ. Bạn có thể quay lại Lobby để kiểm tra dữ liệu game.</p>
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
        .game-choice-btn.dim {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
