import { useState, useEffect, useRef, useEffectEvent } from 'react';
import { buildVocabBattleChoices } from './gameRules';
import { useAuth } from '../hooks/useAuth';
import { getLocalProfile, loadProfile, saveProfilePatch } from '../lib/userStorage';

const MONSTERS = [
  { name: 'ICE GOLEM', emoji: '❄️', color: '#60A5FA' },
  { name: 'DARK ORC', emoji: '👹', color: '#10B981' },
  { name: 'SHADOW BEAST', emoji: '🐺', color: '#8B5CF6' },
  { name: 'THUNDER GRYPHON', emoji: '🦅', color: '#F59E0B' },
  { name: 'FLAME DRAGON', emoji: '🐲', color: '#EF4444' }
];

export default function VocabBattle({ vocabList, timerLimit, onQuit, updateQuitLock, onWordResult }) {
  const { authReady, session } = useAuth();
  const buildLearningQueue = () => {
    return [...vocabList].sort(() => Math.random() - 0.5);
  };

  const resetTurn = (nextQueue) => {
    const nextWord = nextQueue[0];
    setUnlearnedWords(nextQueue);
    setSelectedChoiceIdx(null);
    setCanAnswer(true);
    setChoices(buildVocabBattleChoices(nextWord, vocabList));
    setTimeLeft(timerLimit);
  };

  // Player statistics loaded from localStorage
  const [playerLevel, setPlayerLevel] = useState(() => {
    return getLocalProfile().playerLevel;
  });
  const [playerXp, setPlayerXp] = useState(() => {
    return getLocalProfile().playerXp;
  });

  // ❤️ HEART SYSTEM: max 3 hearts, lose 1 on wrong/timeout, gain 1 every 5 consecutive correct
  const MAX_HEARTS = 3;
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const STREAK_FOR_HEART = 5;
  
  // Monster and round states
  const [monsterHp, setMonsterHp] = useState(100);
  const [battleRound, setBattleRound] = useState(1);
  const [defeatedMonsters, setDefeatedMonsters] = useState(0);
  const [currentMonster, setCurrentMonster] = useState(MONSTERS[4]); // Start with Flame Dragon
  
  // Game loops
  const initialQueue = buildLearningQueue();
  const [unlearnedWords, setUnlearnedWords] = useState(() => initialQueue);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [canAnswer, setCanAnswer] = useState(true);
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState([]);
  const [battleLog, setBattleLog] = useState('Bấm chọn một kỹ năng ứng với nghĩa từ vựng chính xác để tấn công!');
  const [heartNotice, setHeartNotice] = useState('');
  const [gameOver, setGameOver] = useState(false);
  
  // Choice selection references
  const [choices, setChoices] = useState(() => buildVocabBattleChoices(initialQueue[0], vocabList));
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(null);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(timerLimit);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const canAnswerRef = useRef(canAnswer);
  useEffect(() => { canAnswerRef.current = canAnswer; }, [canAnswer]);

  const currentWordObj = unlearnedWords[0];

  useEffect(() => {
    if (!authReady) return undefined;

    let isCancelled = false;

    loadProfile(session)
      .then((profile) => {
        if (isCancelled) return;
        setPlayerLevel(profile.playerLevel);
        setPlayerXp(profile.playerXp);
      })
      .catch((error) => {
        console.error('Failed to load player profile:', error);
      });

    return () => {
      isCancelled = true;
    };
  }, [authReady, session]);

  // Track exit blocker lock status
  useEffect(() => {
    if (gameOver) {
      updateQuitLock(false);
    } else {
      const isLocked = hearts > 0;
      updateQuitLock(isLocked);
    }
  }, [unlearnedWords, hearts, gameOver, updateQuitLock]);

  // Ensure the lock is released when the component unmounts
  useEffect(() => {
    return () => {
      updateQuitLock(false);
    };
  }, [updateQuitLock]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const triggerHeartNotice = (message) => {
    setHeartNotice(message);
    setTimeout(() => setHeartNotice(''), 1800);
  };

  const handleTimeout = useEffectEvent(() => {
    if (!canAnswerRef.current) return;
    setCanAnswer(false);
    triggerShake();
    setCombo(0);
    setConsecutiveCorrect(0);

    if (onWordResult && currentWordObj?.word) {
      onWordResult(currentWordObj.word, false);
    }

    // Lose 1 heart
    const newHearts = Math.max(0, hearts - 1);
    setHearts(newHearts);

    setBattleLog(`⏱️ Hết giờ! ${currentMonster.name} tấn công — mất 1 ❤️! Còn ${newHearts} tim. Từ vựng này sẽ hỏi lại sau.`);

    // ✅ Queue rotation happens AFTER animation delay (not before)
    const failedWord = unlearnedWords[0];
    const rotated = [...unlearnedWords.slice(1), failedWord].sort(() => Math.random() - 0.5);

    setTimeout(() => {
      if (newHearts <= 0) {
        setGameOver(true);
        setUnlearnedWords(rotated); // preserve queue for revive
      } else {
        resetTurn(rotated); // advance to next word
      }
    }, 1500);
  });

  // Start Timer for the current word
  useEffect(() => {
    if (gameOver || !currentWordObj || timerLimit <= 0 || !canAnswer) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 0.1));
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentWordObj, timerLimit, gameOver, canAnswer]);

  // Handle timeout when timeLeft hits 0
  useEffect(() => {
    if (timeLeft <= 0 && canAnswer && !gameOver && currentWordObj && timerLimit > 0) {
      handleTimeout();
    }
  }, [timeLeft, canAnswer, gameOver, currentWordObj, timerLimit]);


  const triggerParticles = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const monsterBox = containerRef.current.querySelector('#monsterAvatarBox');
    if (!monsterBox) return;
    const mRect = monsterBox.getBoundingClientRect();
    const x = mRect.left + mRect.width / 2 - rect.left;
    const y = mRect.top + mRect.height / 2 - rect.top;

    const colors = ['#FFD300', '#EF4444', '#3B82F6', '#10B981', '#EC4899'];
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

  const handleChoiceClick = (choice, idx) => {
    if (!canAnswer) return;
    setCanAnswer(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSelectedChoiceIdx(idx);

    if (choice.correct) {
      if (onWordResult && currentWordObj?.word) {
        onWordResult(currentWordObj.word, true);
      }
      triggerParticles();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      // ❤️ Heart recovery: every STREAK_FOR_HEART consecutive correct answers → +1 heart
      const newStreak = consecutiveCorrect + 1;
      let newHearts = hearts;
      let heartMsg = '';
      if (newStreak % STREAK_FOR_HEART === 0 && hearts < MAX_HEARTS) {
        newHearts = Math.min(MAX_HEARTS, hearts + 1);
        heartMsg = ` 💖 Đúng ${STREAK_FOR_HEART} câu liên tiếp — hồi 1 ❤️! Còn ${newHearts} tim.`;
        triggerHeartNotice('+1 ❤️ Hồi Tim!');
      } else if (newStreak % STREAK_FOR_HEART === 0) {
        heartMsg = ` 💖 Đúng ${STREAK_FOR_HEART} câu liên tiếp nhưng tim đã đầy.`;
        triggerHeartNotice('Tim đã đầy ❤️');
      }
      setConsecutiveCorrect(newStreak);
      setHearts(newHearts);

      // Damage calculation
      const damage = 20 + playerLevel * 5;
      const newMonsterHp = Math.max(0, monsterHp - damage);
      setMonsterHp(newMonsterHp);

      // Endless loop: move the current word to the back so the battle continues while hearts remain.
      const updatedQueue =
        unlearnedWords.length > 1
          ? [...unlearnedWords.slice(1), unlearnedWords[0]]
          : [...unlearnedWords];

      if (newMonsterHp <= 0) {
        // Defeated monster!
        const nextDefeatedCount = defeatedMonsters + 1;
        setDefeatedMonsters(nextDefeatedCount);

        const xpEarned = 50 + battleRound * 10;
        const newXp = playerXp + xpEarned;
        const xpNeeded = playerLevel * 100;

        setBattleLog(`💥 Tiêu diệt ${currentMonster.name}! +${xpEarned} XP! Chuẩn bị sang quái mới.${heartMsg}`);

        let finalLevel = playerLevel;
        let finalXp = newXp;
        if (newXp >= xpNeeded) {
          finalLevel += 1;
          finalXp = newXp - xpNeeded;
          setBattleLog(log => log + ` 🎉 THĂNG CẤP! Lên cấp ${finalLevel}! 💪`);
        }
        setPlayerLevel(finalLevel);
        setPlayerXp(finalXp);
        saveProfilePatch(session, { playerLevel: finalLevel, playerXp: finalXp }).catch((error) => {
          console.error('Failed to save battle rewards:', error);
        });

        setTimeout(() => {
          const nextRound = battleRound + 1;
          setBattleRound(nextRound);
          setMonsterHp(100);
          const nextMonster = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
          setCurrentMonster(nextMonster);
          setBattleLog(`⚔️ Một ${nextMonster.name} mới xuất hiện ở Round ${nextRound}!`);
          resetTurn(updatedQueue);
        }, 1200);
      } else {
        const xpEarned = 15;
        const newXp = playerXp + xpEarned;
        const xpNeeded = playerLevel * 100;

        setBattleLog(`⚡ Chiêu đánh trúng! Gây ${damage} sát thương! +${xpEarned} XP.${heartMsg}`);

        let finalLevel = playerLevel;
        let finalXp = newXp;
        if (newXp >= xpNeeded) {
          finalLevel += 1;
          finalXp = newXp - xpNeeded;
          setBattleLog(log => log + ` 🎉 THĂNG CẤP! Lên cấp ${finalLevel}! 💪`);
        }
        setPlayerLevel(finalLevel);
        setPlayerXp(finalXp);
        saveProfilePatch(session, { playerLevel: finalLevel, playerXp: finalXp }).catch((error) => {
          console.error('Failed to save battle rewards:', error);
        });

        setTimeout(() => {
          resetTurn(updatedQueue);
        }, 1500);
      }

    } else {
      // Incorrect choice
      if (onWordResult && currentWordObj?.word) {
        onWordResult(currentWordObj.word, false);
      }
      triggerShake();
      setCombo(0);
      setConsecutiveCorrect(0);

      // Rotate word to back
      const failedWord = unlearnedWords[0];
      const rotated = [...unlearnedWords.slice(1), failedWord].sort(() => Math.random() - 0.5);

      // Lose 1 heart
      const newHearts = Math.max(0, hearts - 1);
      setHearts(newHearts);

      setBattleLog(`❌ Sai! ${currentMonster.name} phản công — mất 1 ❤️! Còn ${newHearts} tim. Từ này sẽ xuất hiện lại sau.`);

      setTimeout(() => {
        if (newHearts <= 0) {
          setGameOver(true);
          setUnlearnedWords(rotated);
        } else {
          resetTurn(rotated);
        }
      }, 1500);
    }
  };

  const reviveAndContinue = () => {
    setHearts(MAX_HEARTS);
    setConsecutiveCorrect(0);
    setGameOver(false);
    setBattleLog('Hồi sinh thành công! Tiếp tục chiến đấu. Đúng 5 câu liên tiếp sẽ được hồi tim!');
    resetTurn(unlearnedWords);
    updateQuitLock(true);
  };

  const handleRestart = () => {
    const shuffled = buildLearningQueue();
    setHearts(MAX_HEARTS);
    setConsecutiveCorrect(0);
    setMonsterHp(100);
    setBattleRound(1);
    setDefeatedMonsters(0);
    setCombo(0);
    setMaxCombo(0);
    setHeartNotice('');
    setGameOver(false);
    setCurrentMonster(MONSTERS[4]); // Reset to starting monster (Flame Dragon)
    setBattleLog('Trận chiến mới bắt đầu! Hãy chọn nghĩa từ vựng chính xác.');
    resetTurn(shuffled);
    updateQuitLock(shuffled.length > 0);
  };

  const skillNames = ['Thunderbolt', 'Sword Slice', 'Fairy Dust', 'Solar Beam'];
  const skillIcons = ['⚡', '⚔️', '✨', '☀️'];
  const skillCardsClasses = ['a', 'b', 'c', 'd'];

  if (gameOver) {
    return (
      <div id="gameOverScreen" className="game-over-screen">
        <div className="game-over-icon">💀</div>
        <h2 className="game-over-title">Hết Tim Rồi!</h2>
        <p className="game-over-desc">
          Bạn đã hết tim nên trận đấu tạm dừng. Khi còn tim, đấu trường sẽ tiếp tục xoay vòng từ vựng và chơi mãi thay vì tự thoát sớm.
        </p>
        
        <div className="game-stats-grid">
          <div className="game-stat-card">
            <div className="game-stat-val">{defeatedMonsters}</div>
            <div className="game-stat-lbl">Quái Đã Hạ</div>
          </div>
          <div className="game-stat-card">
            <div className="game-stat-val">{maxCombo}</div>
            <div className="game-stat-lbl">Combo Lớn Nhất</div>
          </div>
        </div>

        <div className="game-actions">
          <>
            <button onClick={onQuit} className="btn btn--outline-theme">Về sảnh trò chơi</button>
            <button onClick={reviveAndContinue} className="btn btn--primary" id="goActionBtn">Hồi Sinh & Học Tiếp ⚡</button>
            <button onClick={handleRestart} className="btn btn--outline-theme">Chơi Lại Từ Đầu</button>
          </>
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

      {/* Active Battle Screen */}
      <div id="screenVocabBattle">
        {!currentWordObj && (
          <div className="game-over-screen">
            <div className="game-over-icon">⚠️</div>
            <h2 className="game-over-title">Không đủ dữ liệu để bắt đầu trận</h2>
            <p className="game-over-desc">Chế độ đấu từ vựng cần ít nhất 4 từ đang học hợp lệ. Bạn có thể quay lại sảnh trò chơi để kiểm tra hoặc bổ sung dữ liệu.</p>
            <div className="game-actions">
              <button onClick={onQuit} className="btn btn--outline-theme">Về sảnh trò chơi</button>
            </div>
          </div>
        )}

        {currentWordObj && (
        <div className="battle-arena-layout">
          
          {/* Left Sidebar: Player Stats */}
          <div className="battle-panel-left">
            <div className="character-avatar-container" style={{ borderColor: 'var(--blue-bright)' }}>
              <div className="character-name-label">Aether Mage</div>
              <div className="character-level-badge" id="playerLevel">Cấp {playerLevel}</div>
              <div className="avatar-image-box player-active" id="playerAvatarBox">
                {/* Glowing Wizard SVG */}
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,4"/>
                  <path d="M30,85 L50,45 L70,85 Z" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2"/>
                  <path d="M35,45 L50,15 L65,45 Z" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="2"/>
                  <line x1="70" y1="85" x2="75" y2="40" stroke="#FBBF24" strokeWidth="3"/>
                  <circle cx="75" cy="40" r="8" fill="#FBBF24" filter="drop-shadow(0 0 6px #FBBF24)"/>
                  <circle cx="50" cy="45" r="10" fill="#FEE2E2"/>
                  <path d="M45,52 L50,75 L55,52 Z" fill="#FFFFFF"/>
                </svg>
              </div>

              {/* ❤️ Hearts display */}
              <div className="hearts-container">
                <div className="hearts-label">Sinh mệnh</div>
                <div className="hearts-row">
                  {Array.from({ length: MAX_HEARTS }).map((_, i) => (
                    <span key={i} className={`heart-icon${i >= hearts ? ' lost' : ''}`}>❤️</span>
                  ))}
                </div>
                {/* Streak indicator */}
                {consecutiveCorrect > 0 && (
                  <div className="hearts-streak">
                    🔥 {consecutiveCorrect % STREAK_FOR_HEART}/{STREAK_FOR_HEART} liên tiếp
                    {hearts < MAX_HEARTS && <span className="hearts-streak-hint">→ hồi ❤️</span>}
                  </div>
                )}
              </div>

              {/* Player XP */}
              <div className="xp-bar-container">
                <div className="xp-bar-label">
                  <span>XP</span>
                  <span id="playerXpText">{playerXp}/{playerLevel * 100}</span>
                </div>
                <div className="xp-bar-track">
                  <div className="xp-bar-fill" id="playerXpFill" style={{ width: `${(playerXp / (playerLevel * 100)) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Battle Area */}
          <div className="battle-panel-center" style={{ flex: 1 }}>
            {/* Battle VS Banner */}
            <div className="battle-vs-banner">
              <div className="battle-round-title" id="battleRoundText">VÒNG {battleRound}</div>
              <div className="vs-avatars-row">
                <span style={{ fontSize: '32px' }}>🧙‍♂️</span>
                <span className="vs-text">VS</span>
                <span style={{ fontSize: '32px' }} id="monsterEmoji">{currentMonster.emoji}</span>
              </div>
            </div>

            {/* Word Challenge */}
            {currentWordObj && (
              <div className="surface-card surface-card--centered">
                <span className="badge badge--highlight-blue">
                  CHỌN NGHĨA ĐÚNG
                </span>
                <div className="vocab-battle__word-display" id="vbWordDisplay">
                  "{currentWordObj.word}"
                </div>
              </div>
            )}

            {/* Skills Grid */}
            <div className="skill-cards-grid" id="vbSkills">
              {choices.map((choice, index) => {
                const cardClass = skillCardsClasses[index];
                const icon = skillIcons[index];
                const skillName = skillNames[index];
                
                let highlightClass = '';
                if (!canAnswer) {
                  if (choice.correct) {
                    highlightClass = ' correct';
                  } else if (selectedChoiceIdx === index) {
                    highlightClass = ' wrong';
                  } else {
                    highlightClass = ' dim';
                  }
                }

                return (
                  <div
                    key={index}
                    className={`skill-card skill-card--${cardClass}${highlightClass}`}
                    onClick={() => handleChoiceClick(choice, index)}
                  >
                    <div className="skill-card__icon">{icon}</div>
                    <div className="skill-card__name">{choice.meaning}</div>
                    <div className="skill-card__lbl">{skillName} (Kỹ năng {cardClass.toUpperCase()})</div>
                  </div>
                );
              })}
            </div>

            {/* Log text bar */}
            <div className="battle-log-bar" id="battleLogText">{battleLog}</div>
          </div>

          {/* Right Sidebar: Monster Stats Card */}
          <div className="battle-panel-right">
            <div className="character-avatar-container" style={{ borderColor: currentMonster.color }}>
              <div className="character-name-label" id="monsterName">{currentMonster.name}</div>
              <div className="character-level-badge" id="monsterLevel" style={{ background: currentMonster.color }}>Cấp {battleRound}</div>
              <div className="avatar-image-box monster-active" id="monsterAvatarBox">
                {/* SVG representing current monster */}
                <svg viewBox="0 0 100 100" id="monsterSvg">
                  <circle cx="50" cy="50" r="45" fill="none" stroke={currentMonster.color} strokeWidth="2" strokeDasharray="4,4"/>
                  <path d="M35,35 L65,35 L70,55 L50,75 L30,55 Z" fill="#991B1B" stroke={currentMonster.color} strokeWidth="2"/>
                  <path d="M35,35 L15,15 L25,45 Z" fill="#7F1D1D"/>
                  <path d="M65,35 L85,15 L75,45 Z" fill="#7F1D1D"/>
                  <path d="M40,35 L40,20 L45,35 Z" fill="#F59E0B"/>
                  <path d="M60,35 L60,20 L55,35 Z" fill="#F59E0B"/>
                  <circle cx="42" cy="48" r="4" fill={currentMonster.color} filter={`drop-shadow(0 0 3px ${currentMonster.color})`}/>
                  <circle cx="58" cy="48" r="4" fill={currentMonster.color} filter={`drop-shadow(0 0 3px ${currentMonster.color})`}/>
                </svg>
              </div>
              {/* Monster HP */}
              <div className="hp-bar-container">
                <div className="hp-bar-label">
                  <span>HP</span>
                  <span id="monsterHpText">{monsterHp}/100</span>
                </div>
                <div className="hp-bar-track">
                  <div className="hp-bar-fill" id="monsterHpFill" style={{ width: `${monsterHp}%` }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
        )}
      </div>

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
        .skill-card.dim {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
