import { useState, useEffect, useCallback, useMemo, useEffectEvent } from 'react';
import GameLobby from '../game-engines/GameLobby';
import DataManager from '../game-engines/DataManager';
import TenseRush from '../game-engines/TenseRush';
import SentenceBuilder from '../game-engines/SentenceBuilder';
import VocabBattle from '../game-engines/VocabBattle';
import { gameData } from '../data/game-data';
import { useAuth } from '../hooks/useAuth';
import {
  loadGrammarPacks,
  loadProfile,
  loadSentencePacks,
  loadVocabPacks,
  saveGrammarPacks,
  saveProfilePatch,
  saveSentencePacks,
  saveVocabPacks,
  getLocalProfile,
  getLocalGrammarPacks,
  getLocalSentencePacks,
  getLocalVocabPacks,
} from '../lib/userStorage';
import {
  cloneGamePack,
  createGamePack,
  sanitizeGamePackCollection,
  updatePackItems,
} from '../game-engines/gamePackUtils';

function shuffleList(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function generateRushVocabQuestions(list, allVocab) {
  if (list.length < 4) return [];

  return shuffleList(
    list
      .map((item, idx) => {
        const isEngToViet = Math.random() < 0.5;
        if (isEngToViet) {
          return {
            id: `vocab-rush-etv-${item.word}-${idx}`,
            question: `Nghĩa của từ tiếng Anh "${item.word}" là gì?`,
            options: shuffleList([item.meaning, ...item.options]),
            answer: item.meaning,
            explanation: `Từ "${item.word}" có nghĩa là: ${item.meaning}.`,
            word: item.word,
          };
        }

        const distractorWords = shuffleList(
          allVocab
            .filter((vocabItem) => vocabItem.word.toLowerCase() !== item.word.toLowerCase())
            .map((vocabItem) => vocabItem.word)
        ).slice(0, 3);

        if (distractorWords.length < 3) {
          return null;
        }

        return {
          id: `vocab-rush-vte-${item.word}-${idx}`,
          question: `Từ tiếng Anh nào có nghĩa là: "${item.meaning}"?`,
          options: shuffleList([item.word, ...distractorWords]),
          answer: item.word,
          explanation: `Từ "${item.word}" có nghĩa là: ${item.meaning}.`,
          word: item.word,
        };
      })
      .filter(Boolean)
  );
}

function generateScrambleVocabQuestions(list) {
  return shuffleList(
    list.map((item, idx) => ({
      id: `vocab-scramble-${item.word}-${idx}`,
      vietnamese: `Ghép các chữ cái để hoàn thành từ tiếng Anh có nghĩa: "${item.meaning}"`,
      english: item.word,
      words: shuffleList(item.word.split('')),
      word: item.word,
    }))
  );
}

function getSelectedPack(packs, selectedId) {
  return packs.find((pack) => pack.id === selectedId) || packs[0] || null;
}

export default function GameArena({ updateQuitLock }) {
  const { authReady, isAuthenticated, openAuthModal, session } = useAuth();

  const [gameStatus, setGameStatus] = useState('lobby');
  const [timerLimit, setTimerLimit] = useState(() => getLocalProfile().gameTimerLimit);

  const [vocabPacks, setVocabPacks] = useState(() => getLocalVocabPacks());
  const [grammarPacks, setGrammarPacks] = useState(() => getLocalGrammarPacks());
  const [sentencePacks, setSentencePacks] = useState(() => getLocalSentencePacks());

  const [selectedVocabPackId, setSelectedVocabPackId] = useState(() => getLocalVocabPacks()[0]?.id || null);
  const [selectedGrammarPackId, setSelectedGrammarPackId] = useState(() => getLocalGrammarPacks()[0]?.id || 'default');
  const [selectedSentencePackId, setSelectedSentencePackId] = useState(() => getLocalSentencePacks()[0]?.id || 'default');

  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [dataManagerTab, setDataManagerTab] = useState('vocab');
  const [isQuitLocked, setIsQuitLocked] = useState(false);
  const [rushQuestions, setRushQuestions] = useState([]);
  const [scrambleQuestions, setScrambleQuestions] = useState([]);
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [rushMode, setRushMode] = useState('grammar');
  const [scrambleMode, setScrambleMode] = useState('grammar');

  const openDataManager = useCallback((tab = 'vocab') => {
    setDataManagerTab(tab);
    setIsDataModalOpen(true);
  }, []);

  const selectedVocabPack = useMemo(
    () => getSelectedPack(vocabPacks, selectedVocabPackId),
    [vocabPacks, selectedVocabPackId]
  );
  const selectedGrammarPack = useMemo(
    () => (selectedGrammarPackId === 'default' ? null : getSelectedPack(grammarPacks, selectedGrammarPackId)),
    [grammarPacks, selectedGrammarPackId]
  );
  const selectedSentencePack = useMemo(
    () => (selectedSentencePackId === 'default' ? null : getSelectedPack(sentencePacks, selectedSentencePackId)),
    [sentencePacks, selectedSentencePackId]
  );
  const effectiveSelectedVocabPackId = selectedVocabPack?.id || vocabPacks[0]?.id || null;
  const effectiveSelectedGrammarPackId =
    selectedGrammarPack?.id || (selectedGrammarPackId === 'default' ? 'default' : grammarPacks[0]?.id || 'default');
  const effectiveSelectedSentencePackId =
    selectedSentencePack?.id || (selectedSentencePackId === 'default' ? 'default' : sentencePacks[0]?.id || 'default');

  const vocabList = useMemo(() => selectedVocabPack?.items || [], [selectedVocabPack]);
  const grammarList = useMemo(() => selectedGrammarPack?.items || [], [selectedGrammarPack]);
  const sentenceList = useMemo(() => selectedSentencePack?.items || [], [selectedSentencePack]);

  const activeVocab = useMemo(() => {
    return vocabList.filter((item) => (item.mastery || 0) < 3);
  }, [vocabList]);
  const activeVocabCount = activeVocab.length;

  const handleUpdateQuitLock = useCallback(
    (locked) => {
      setIsQuitLocked(locked);
      updateQuitLock(locked);
    },
    [updateQuitLock]
  );

  const buildRushQuestions = useCallback(() => {
    if (rushMode === 'vocab' && activeVocabCount >= 4) {
      return generateRushVocabQuestions(activeVocab, vocabList);
    }
    return grammarList.length >= 1 ? shuffleList(grammarList) : shuffleList(gameData.tenseRush);
  }, [rushMode, activeVocabCount, activeVocab, vocabList, grammarList]);

  const buildScrambleQuestions = useCallback(() => {
    if (scrambleMode === 'vocab' && activeVocabCount >= 1) {
      return generateScrambleVocabQuestions(activeVocab);
    }
    return sentenceList.length >= 1 ? shuffleList(sentenceList) : shuffleList(gameData.sentenceBuilder);
  }, [scrambleMode, activeVocabCount, activeVocab, sentenceList]);

  const syncFromHash = useEffectEvent(() => {
    if (!isStorageReady) return;
    const hash = window.location.hash;
    if (hash === '#game/rush') {
      const nextQuestions = buildRushQuestions();
      if (nextQuestions.length === 0) {
        window.location.hash = '#game';
        openDataManager(rushMode === 'vocab' ? 'vocab' : 'grammar');
        return;
      }
      setGameStatus('active-rush');
      setRushQuestions((prev) => (prev.length === 0 ? nextQuestions : prev));
    } else if (hash === '#game/scramble') {
      const nextQuestions = buildScrambleQuestions();
      if (nextQuestions.length === 0) {
        window.location.hash = '#game';
        openDataManager(scrambleMode === 'vocab' ? 'vocab' : 'sentence');
        return;
      }
      setGameStatus('active-scramble');
      setScrambleQuestions((prev) => (prev.length === 0 ? nextQuestions : prev));
    } else if (hash === '#game/battle') {
      if (activeVocabCount < 4) {
        window.location.hash = '#game';
        openDataManager('vocab');
        return;
      }
      setGameStatus('active-battle');
    } else if (hash === '#game' || hash === '') {
      setGameStatus('lobby');
      handleUpdateQuitLock(false);
      setRushQuestions([]);
      setScrambleQuestions([]);
    }
  });

  useEffect(() => {
    const handleHashChange = () => {
      syncFromHash();
    };

    window.addEventListener('hashchange', handleHashChange);
    setTimeout(handleHashChange, 0);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isStorageReady]);

  useEffect(() => {
    if (!authReady) return undefined;

    let isCancelled = false;

    const hydrateGameStorage = async () => {
      setIsStorageReady(false);
      try {
        const [profile, nextVocabPacks, nextGrammarPacks, nextSentencePacks] = await Promise.all([
          loadProfile(session),
          loadVocabPacks(session),
          loadGrammarPacks(session),
          loadSentencePacks(session),
        ]);

        if (isCancelled) return;

        setTimerLimit(profile.gameTimerLimit);
        setVocabPacks(nextVocabPacks);
        setGrammarPacks(nextGrammarPacks);
        setSentencePacks(nextSentencePacks);
        setSelectedVocabPackId(nextVocabPacks[0]?.id || null);
        setSelectedGrammarPackId(nextGrammarPacks[0]?.id || 'default');
        setSelectedSentencePackId(nextSentencePacks[0]?.id || 'default');
      } catch (error) {
        console.error('Failed to hydrate game storage:', error);
      } finally {
        if (!isCancelled) {
          setIsStorageReady(true);
        }
      }
    };

    hydrateGameStorage();

    return () => {
      isCancelled = true;
    };
  }, [authReady, session]);

  const persistVocabPacks = useCallback(
    async (updated, nextSelectedId = selectedVocabPackId) => {
      const sanitized = sanitizeGamePackCollection('vocab', updated, []);
      setVocabPacks(sanitized);
      setSelectedVocabPackId(nextSelectedId || sanitized[0]?.id || null);
      await saveVocabPacks(session, sanitized);
    },
    [selectedVocabPackId, session]
  );

  const persistGrammarPacks = useCallback(
    async (updated, nextSelectedId = selectedGrammarPackId) => {
      const sanitized = sanitizeGamePackCollection('grammar', updated, []);
      setGrammarPacks(sanitized);
      setSelectedGrammarPackId(nextSelectedId || sanitized[0]?.id || 'default');
      await saveGrammarPacks(session, sanitized);
    },
    [selectedGrammarPackId, session]
  );

  const persistSentencePacks = useCallback(
    async (updated, nextSelectedId = selectedSentencePackId) => {
      const sanitized = sanitizeGamePackCollection('sentence', updated, []);
      setSentencePacks(sanitized);
      setSelectedSentencePackId(nextSelectedId || sanitized[0]?.id || 'default');
      await saveSentencePacks(session, sanitized);
    },
    [selectedSentencePackId, session]
  );

  const handleWordResult = (wordText, isCorrect) => {
    if (!selectedVocabPack) return;
    const updatedItems = vocabList.map((item) => {
      if (item.word.toLowerCase() === wordText.toLowerCase()) {
        const currentMastery = item.mastery || 0;
        const newMastery = isCorrect ? Math.min(3, currentMastery + 1) : Math.max(0, currentMastery - 1);
        return {
          ...item,
          mastery: newMastery,
          correctCount: (item.correctCount || 0) + (isCorrect ? 1 : 0),
          incorrectCount: (item.incorrectCount || 0) + (isCorrect ? 0 : 1),
        };
      }
      return item;
    });

    persistVocabPacks(updatePackItems('vocab', vocabPacks, selectedVocabPack.id, updatedItems)).catch((error) => {
      console.error('Failed to save vocab progress:', error);
    });
  };

  const handleGrammarResult = (questionId, isCorrect) => {
    if (!selectedGrammarPack) return;
    const updatedItems = grammarList.map((item) => {
      if (item.id === questionId) {
        const cur = item.mastery || 0;
        const newM = isCorrect ? Math.min(3, cur + 1) : Math.max(0, cur - 1);
        return {
          ...item,
          mastery: newM,
          correctCount: (item.correctCount || 0) + (isCorrect ? 1 : 0),
          incorrectCount: (item.incorrectCount || 0) + (isCorrect ? 0 : 1),
        };
      }
      return item;
    });

    persistGrammarPacks(updatePackItems('grammar', grammarPacks, selectedGrammarPack.id, updatedItems)).catch((error) => {
      console.error('Failed to save grammar progress:', error);
    });
  };

  const handleSentenceResult = (questionId, isCorrect) => {
    if (!selectedSentencePack) return;
    const updatedItems = sentenceList.map((item) => {
      if (item.id === questionId) {
        const cur = item.mastery || 0;
        const newM = isCorrect ? Math.min(3, cur + 1) : Math.max(0, cur - 1);
        return {
          ...item,
          mastery: newM,
          correctCount: (item.correctCount || 0) + (isCorrect ? 1 : 0),
          incorrectCount: (item.incorrectCount || 0) + (isCorrect ? 0 : 1),
        };
      }
      return item;
    });

    persistSentencePacks(updatePackItems('sentence', sentencePacks, selectedSentencePack.id, updatedItems)).catch((error) => {
      console.error('Failed to save sentence progress:', error);
    });
  };

  const handleCreatePack = useCallback(
    async (kind, name, items = []) => {
      const newPack = createGamePack(kind, { name, items });
      if (kind === 'vocab') {
        await persistVocabPacks([newPack, ...vocabPacks], newPack.id);
      } else if (kind === 'grammar') {
        await persistGrammarPacks([newPack, ...grammarPacks], newPack.id);
        setSelectedGrammarPackId(newPack.id);
      } else {
        await persistSentencePacks([newPack, ...sentencePacks], newPack.id);
        setSelectedSentencePackId(newPack.id);
      }
      return newPack.id;
    },
    [grammarPacks, persistGrammarPacks, persistSentencePacks, persistVocabPacks, sentencePacks, vocabPacks]
  );

  const handleDuplicatePack = useCallback(
    async (kind, packId) => {
      const sourcePacks = kind === 'vocab' ? vocabPacks : kind === 'grammar' ? grammarPacks : sentencePacks;
      const targetPack = sourcePacks.find((pack) => pack.id === packId);
      if (!targetPack) return;

      const cloned = cloneGamePack(kind, targetPack);
      const nextPacks = [cloned, ...sourcePacks];
      if (kind === 'vocab') {
        await persistVocabPacks(nextPacks, cloned.id);
      } else if (kind === 'grammar') {
        await persistGrammarPacks(nextPacks, cloned.id);
      } else {
        await persistSentencePacks(nextPacks, cloned.id);
      }
    },
    [grammarPacks, persistGrammarPacks, persistSentencePacks, persistVocabPacks, sentencePacks, vocabPacks]
  );

  const handleRenamePack = useCallback(
    async (kind, packId, nextName) => {
      const updater = (packs) =>
        sanitizeGamePackCollection(
          kind,
          packs.map((pack) =>
            pack.id === packId ? { ...pack, name: nextName.trim(), updatedAt: new Date().toISOString() } : pack
          ),
          []
        );

      if (kind === 'vocab') {
        await persistVocabPacks(updater(vocabPacks), packId);
      } else if (kind === 'grammar') {
        await persistGrammarPacks(updater(grammarPacks), packId);
      } else {
        await persistSentencePacks(updater(sentencePacks), packId);
      }
    },
    [grammarPacks, persistGrammarPacks, persistSentencePacks, persistVocabPacks, sentencePacks, vocabPacks]
  );

  const handleDeletePack = useCallback(
    async (kind, packId) => {
      if (kind === 'vocab') {
        const nextPacks = vocabPacks.filter((pack) => pack.id !== packId);
        if (nextPacks.length === 0) {
          const fallback = createGamePack('vocab', { name: 'Bộ từ vựng mặc định', items: [] });
          await persistVocabPacks([fallback], fallback.id);
        } else {
          await persistVocabPacks(nextPacks, nextPacks[0].id);
        }
      } else if (kind === 'grammar') {
        const nextPacks = grammarPacks.filter((pack) => pack.id !== packId);
        await persistGrammarPacks(nextPacks, nextPacks[0]?.id || 'default');
      } else {
        const nextPacks = sentencePacks.filter((pack) => pack.id !== packId);
        await persistSentencePacks(nextPacks, nextPacks[0]?.id || 'default');
      }
    },
    [grammarPacks, persistGrammarPacks, persistSentencePacks, persistVocabPacks, sentencePacks, vocabPacks]
  );

  const handleStartGame = (type) => {
    if (type === 'battle') {
      if (activeVocabCount < 4) {
        alert('⚠️ Bộ từ vựng đang chọn cần ít nhất 4 từ đang học để bắt đầu đấu từ vựng.');
        openDataManager('vocab');
        return;
      }
      window.location.hash = '#game/battle';
      handleUpdateQuitLock(true);
      return;
    }

    if (type === 'rush') {
      if (rushMode === 'vocab' && activeVocabCount < 4) {
        alert('⚠️ Bộ từ vựng đang chọn cần ít nhất 4 từ đang học để chơi chế độ từ vựng.');
        openDataManager('vocab');
        return;
      }

      const nextQuestions = buildRushQuestions();
      if (nextQuestions.length === 0) {
        alert('⚠️ Bộ câu hỏi của chế độ tốc độ ngữ pháp hiện không hợp lệ hoặc đang trống. Hãy kiểm tra lại bộ đang chọn.');
        openDataManager(rushMode === 'vocab' ? 'vocab' : 'grammar');
        return;
      }

      setRushQuestions(nextQuestions);
      window.location.hash = '#game/rush';
      handleUpdateQuitLock(false);
      return;
    }

    if (scrambleMode === 'vocab' && activeVocabCount < 1) {
      alert('⚠️ Bộ từ vựng đang chọn cần ít nhất 1 từ đang học để chơi chế độ xây câu theo từ vựng.');
      openDataManager('vocab');
      return;
    }

    const nextQuestions = buildScrambleQuestions();
    if (nextQuestions.length === 0) {
      alert('⚠️ Bộ câu của chế độ xây câu hiện không hợp lệ hoặc đang trống. Hãy kiểm tra lại bộ đang chọn.');
      openDataManager(scrambleMode === 'vocab' ? 'vocab' : 'sentence');
      return;
    }

    setScrambleQuestions(nextQuestions);
    window.location.hash = '#game/scramble';
    handleUpdateQuitLock(false);
  };

  const handleQuit = () => {
    if (gameStatus === 'active-battle' && isQuitLocked) {
      if (window.confirm('⚠️ Bạn chưa thuộc hết từ vựng! Bạn có chắc chắn muốn bỏ dở trận đấu và quay lại sảnh trò chơi?')) {
        handleUpdateQuitLock(false);
        window.location.hash = '#game';
      }
      return;
    }
    window.location.hash = '#game';
    handleUpdateQuitLock(false);
  };

  return (
    <div id="gameView" className="game-arena">
      <div className="game-arena__inner">
        {gameStatus !== 'lobby' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '12px',
            }}
          >
            <h3 style={{ color: 'var(--white)', margin: 0, fontSize: '20px', fontWeight: 800 }}>
              {gameStatus === 'active-rush' && '⏱️ Tốc độ ngữ pháp'}
              {gameStatus === 'active-scramble' && '🧩 Xây câu'}
              {gameStatus === 'active-battle' && '⚔️ Đấu trường từ vựng'}
            </h3>

            {(!isQuitLocked || gameStatus !== 'active-battle') && (
              <button
                onClick={handleQuit}
                className="btn btn--outline"
                style={{ borderColor: 'rgba(255,255,255,0.2)', fontSize: '13px', padding: '6px 16px' }}
              >
                Về sảnh trò chơi
              </button>
            )}
          </div>
        )}

        {gameStatus === 'lobby' && (
          <GameLobby
            onStartGame={handleStartGame}
            onOpenDataManager={openDataManager}
            timerLimit={timerLimit}
            onTimerLimitChange={(lim) => {
              setTimerLimit(lim);
              saveProfilePatch(session, { gameTimerLimit: lim }).catch((error) => {
                console.error('Failed to save timer limit:', error);
              });
            }}
            vocabPacks={vocabPacks}
            grammarPacks={grammarPacks}
            sentencePacks={sentencePacks}
            selectedVocabPackId={effectiveSelectedVocabPackId}
            selectedGrammarPackId={effectiveSelectedGrammarPackId}
            selectedSentencePackId={effectiveSelectedSentencePackId}
            onSelectVocabPack={setSelectedVocabPackId}
            onSelectGrammarPack={setSelectedGrammarPackId}
            onSelectSentencePack={setSelectedSentencePackId}
            rushMode={rushMode}
            onRushModeChange={setRushMode}
            scrambleMode={scrambleMode}
            onScrambleModeChange={setScrambleMode}
            isCloudEnabled={isAuthenticated}
            onRequireCloudLogin={openAuthModal}
          />
        )}

        {gameStatus === 'active-rush' && (
          <TenseRush
            questionsList={rushQuestions}
            timerLimit={timerLimit}
            onQuit={handleQuit}
            isVocabMode={rushMode === 'vocab'}
            onWordResult={handleWordResult}
            onQuestionResult={rushMode === 'grammar' ? handleGrammarResult : null}
          />
        )}

        {gameStatus === 'active-scramble' && (
          <SentenceBuilder
            questionsList={scrambleQuestions}
            onQuit={handleQuit}
            isVocabMode={scrambleMode === 'vocab'}
            onWordResult={handleWordResult}
            onQuestionResult={scrambleMode === 'grammar' ? handleSentenceResult : null}
          />
        )}

        {gameStatus === 'active-battle' && (
          <VocabBattle
            vocabList={vocabList}
            timerLimit={timerLimit}
            onQuit={handleQuit}
            updateQuitLock={handleUpdateQuitLock}
            onWordResult={handleWordResult}
          />
        )}

        <DataManager
          key={dataManagerTab}
          isOpen={isDataModalOpen}
          onClose={() => setIsDataModalOpen(false)}
          initialTab={dataManagerTab}
          vocabPacks={vocabPacks}
          grammarPacks={grammarPacks}
          sentencePacks={sentencePacks}
          selectedVocabPackId={effectiveSelectedVocabPackId}
          selectedGrammarPackId={effectiveSelectedGrammarPackId}
          selectedSentencePackId={effectiveSelectedSentencePackId}
          onSelectVocabPack={setSelectedVocabPackId}
          onSelectGrammarPack={setSelectedGrammarPackId}
          onSelectSentencePack={setSelectedSentencePackId}
          onSaveVocabPacks={persistVocabPacks}
          onSaveGrammarPacks={persistGrammarPacks}
          onSaveSentencePacks={persistSentencePacks}
          onCreatePack={handleCreatePack}
          onDuplicatePack={handleDuplicatePack}
          onRenamePack={handleRenamePack}
          onDeletePack={handleDeletePack}
          isCloudEnabled={isAuthenticated}
        />
      </div>
    </div>
  );
}
