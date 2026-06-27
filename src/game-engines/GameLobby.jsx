import { useMemo, useState } from 'react';
import CustomSelect from '../components/CustomSelect';

function getSelectedPack(packs, selectedId) {
  return packs.find((pack) => pack.id === selectedId) || packs[0] || null;
}

export default function GameLobby({
  onStartGame,
  onOpenDataManager,
  timerLimit,
  onTimerLimitChange,
  vocabPacks = [],
  grammarPacks = [],
  sentencePacks = [],
  selectedVocabPackId,
  selectedGrammarPackId,
  selectedSentencePackId,
  onSelectVocabPack,
  onSelectGrammarPack,
  onSelectSentencePack,
  rushMode,
  onRushModeChange,
  scrambleMode,
  onScrambleModeChange,
  isCloudEnabled,
  onRequireCloudLogin,
}) {
  const [customTimerInput, setCustomTimerInput] = useState('');
  const [customTimerError, setCustomTimerError] = useState('');

  const selectedVocabPack = useMemo(() => getSelectedPack(vocabPacks, selectedVocabPackId), [selectedVocabPackId, vocabPacks]);
  const selectedGrammarPack = useMemo(
    () => (selectedGrammarPackId === 'default' ? null : getSelectedPack(grammarPacks, selectedGrammarPackId)),
    [grammarPacks, selectedGrammarPackId]
  );
  const selectedSentencePack = useMemo(
    () => (selectedSentencePackId === 'default' ? null : getSelectedPack(sentencePacks, selectedSentencePackId)),
    [selectedSentencePackId, sentencePacks]
  );

  const vocabItems = selectedVocabPack?.items || [];
  const grammarItems = selectedGrammarPack?.items || [];
  const sentenceItems = selectedSentencePack?.items || [];

  const totalVocabCount = vocabItems.length;
  const masteredVocabCount = vocabItems.filter((item) => (item.mastery || 0) >= 3).length;
  const activeVocabCount = totalVocabCount - masteredVocabCount;
  const totalGrammarCount = grammarItems.length;
  const masteredGrammarCount = grammarItems.filter((item) => (item.mastery || 0) >= 3).length;
  const totalSentenceCount = sentenceItems.length;
  const masteredSentenceCount = sentenceItems.filter((item) => (item.mastery || 0) >= 3).length;

  const rushModeOptions = [
    { value: 'grammar', label: 'Ngữ pháp' },
    { value: 'vocab', label: `Từ vựng (${activeVocabCount} từ đang học)`, disabled: activeVocabCount < 4 },
  ];

  const scrambleModeOptions = [
    { value: 'grammar', label: 'Xây câu' },
    { value: 'vocab', label: `Từ vựng (${activeVocabCount} từ đang học)`, disabled: activeVocabCount < 1 },
  ];

  const grammarPackOptions = [
    { value: 'default', label: 'Bộ mặc định của hệ thống' },
    ...grammarPacks.map((pack) => ({
      value: pack.id,
      label: `${pack.name} (${pack.items.length} câu)`,
    })),
  ];

  const sentencePackOptions = [
    { value: 'default', label: 'Bộ mặc định của hệ thống' },
    ...sentencePacks.map((pack) => ({
      value: pack.id,
      label: `${pack.name} (${pack.items.length} câu)`,
    })),
  ];

  const vocabPackOptions = vocabPacks.map((pack) => ({
    value: pack.id,
    label: `${pack.name} (${pack.items.length} từ)`,
  }));

  const presetTimers = [
    { value: 5, label: '5s' },
    { value: 10, label: '10s' },
    { value: 20, label: '20s' },
    { value: 30, label: '30s' },
    { value: 0, label: '∞' },
  ];

  const handleCustomTimer = (e) => {
    const raw = e.target.value;
    setCustomTimerInput(raw);
    const val = parseInt(raw, 10);
    if (raw === '') {
      setCustomTimerError('');
    } else if (Number.isNaN(val) || val < 1) {
      setCustomTimerError('Tối thiểu 1 giây');
    } else if (val > 60) {
      setCustomTimerError('Tối đa 60 giây');
    } else {
      setCustomTimerError('');
      onTimerLimitChange(val);
    }
  };

  return (
    <div id="gameLobby" className="game-lobby">
      <h2 className="game-lobby__title">Đấu Trường Ngữ Pháp ⚔️</h2>
      <p className="game-lobby__desc">Ôn tập ngữ pháp và từ vựng tiếng Anh qua các bộ dữ liệu riêng cho từng trò chơi.</p>

      <div className={`game-storage-banner ${isCloudEnabled ? 'game-storage-banner--cloud' : 'game-storage-banner--local'}`}>
        <span>{isCloudEnabled ? '☁️ Đang lưu trực tiếp lên đám mây' : '💾 Chưa đăng nhập: đang lưu cục bộ trên thiết bị này'}</span>
        {!isCloudEnabled && (
          <button type="button" className="btn btn--outline-theme btn--sm" onClick={onRequireCloudLogin}>
            Đăng nhập để lưu đám mây
          </button>
        )}
      </div>

      <div className="lobby-progress-panel">
        <div className="lobby-progress-row">
          <span className="lobby-progress-row__icon">⏱️</span>
          <span className="lobby-progress-row__label">Tốc độ ngữ pháp</span>
          <div className="lobby-progress-row__bar-wrap">
            {selectedGrammarPack ? (
              <>
                <div className="lobby-progress-row__bar-track">
                  <div
                    className="lobby-progress-row__bar-fill lobby-progress-row__bar-fill--blue"
                    style={{ width: `${totalGrammarCount ? (masteredGrammarCount / totalGrammarCount) * 100 : 0}%` }}
                  />
                </div>
                <span className="lobby-progress-row__stat">
                  {selectedGrammarPack.name}: {masteredGrammarCount}/{totalGrammarCount} câu
                </span>
              </>
            ) : (
              <span className="lobby-progress-row__empty">
                Đang dùng bộ mặc định ·{' '}
                <button className="lobby-progress-row__link" onClick={() => onOpenDataManager('grammar')}>
                  Tạo bộ ngữ pháp
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="lobby-progress-row">
          <span className="lobby-progress-row__icon">🧩</span>
          <span className="lobby-progress-row__label">Xây câu</span>
          <div className="lobby-progress-row__bar-wrap">
            {selectedSentencePack ? (
              <>
                <div className="lobby-progress-row__bar-track">
                  <div
                    className="lobby-progress-row__bar-fill lobby-progress-row__bar-fill--yellow"
                    style={{ width: `${totalSentenceCount ? (masteredSentenceCount / totalSentenceCount) * 100 : 0}%` }}
                  />
                </div>
                <span className="lobby-progress-row__stat">
                  {selectedSentencePack.name}: {masteredSentenceCount}/{totalSentenceCount} câu
                </span>
              </>
            ) : (
              <span className="lobby-progress-row__empty">
                Đang dùng bộ mặc định ·{' '}
                <button className="lobby-progress-row__link" onClick={() => onOpenDataManager('sentence')}>
                  Tạo bộ câu
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="lobby-progress-row">
          <span className="lobby-progress-row__icon">⚔️</span>
          <span className="lobby-progress-row__label">Đấu từ vựng</span>
          <div className="lobby-progress-row__bar-wrap">
            <div className="lobby-progress-row__bar-track">
              <div
                className="lobby-progress-row__bar-fill lobby-progress-row__bar-fill--green"
                style={{ width: `${totalVocabCount ? (masteredVocabCount / totalVocabCount) * 100 : 0}%` }}
              />
            </div>
            <span className="lobby-progress-row__stat">
              {selectedVocabPack?.name || 'Chưa có bộ'}: {masteredVocabCount}/{totalVocabCount} từ đã thuộc
            </span>
          </div>
        </div>
      </div>

      <div className="game-modes">
        <div onClick={() => onStartGame('rush')} className="mode-card mode-card--rush">
          <span className="mode-card__icon">⏱️</span>
          <h3>Tốc độ ngữ pháp</h3>
          <p>Trắc nghiệm tốc độ với nhiều bộ riêng. Bạn có thể chọn bộ mặc định hoặc bộ ngữ pháp tự tạo để chơi.</p>
          <div className="mode-card__controls" onClick={(e) => e.stopPropagation()}>
            <label className="mode-card__label">Kiểu chơi:</label>
            <CustomSelect value={rushMode} onChange={onRushModeChange} options={rushModeOptions} style={{ width: '100%' }} />
          </div>
          {rushMode === 'grammar' && (
            <div className="mode-card__controls" onClick={(e) => e.stopPropagation()}>
              <label className="mode-card__label">Bộ câu:</label>
              <CustomSelect
                value={selectedGrammarPackId}
                onChange={onSelectGrammarPack}
                options={grammarPackOptions}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <button type="button" className="btn btn--outline-theme mode-card__btn" onClick={(e) => { e.stopPropagation(); onOpenDataManager(rushMode === 'vocab' ? 'vocab' : 'grammar'); }}>
            Quản lý bộ
          </button>
          <button className="btn btn--primary mode-card__btn">Chơi Ngay</button>
        </div>

        <div onClick={() => onStartGame('scramble')} className="mode-card mode-card--scramble">
          <span className="mode-card__icon">🧩</span>
          <h3>Xây câu</h3>
          <p>Sắp xếp lại câu theo bộ đang chọn. Có thể dùng bộ mặc định, bộ câu riêng hoặc chuyển sang kiểu chơi theo từ vựng.</p>
          <div className="mode-card__controls" onClick={(e) => e.stopPropagation()}>
            <label className="mode-card__label">Kiểu chơi:</label>
            <CustomSelect value={scrambleMode} onChange={onScrambleModeChange} options={scrambleModeOptions} style={{ width: '100%' }} />
          </div>
          {scrambleMode === 'grammar' && (
            <div className="mode-card__controls" onClick={(e) => e.stopPropagation()}>
              <label className="mode-card__label">Bộ câu:</label>
              <CustomSelect
                value={selectedSentencePackId}
                onChange={onSelectSentencePack}
                options={sentencePackOptions}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <button type="button" className="btn btn--outline-theme mode-card__btn" onClick={(e) => { e.stopPropagation(); onOpenDataManager(scrambleMode === 'vocab' ? 'vocab' : 'sentence'); }}>
            Quản lý bộ
          </button>
          <button className="btn btn--primary btn--yellow-ad mode-card__btn">Chơi Ngay</button>
        </div>

        <div onClick={() => onStartGame('battle')} className="mode-card mode-card--battle">
          <span className="mode-card__icon">⚔️</span>
          <h3>Đấu trường từ vựng</h3>
          <p>Chọn 1 bộ từ vựng riêng để chiến đấu. Bộ mới tạo sẽ tự xuất hiện ở đầu danh sách chọn.</p>
          <div className="mode-card__controls" onClick={(e) => e.stopPropagation()}>
            <label className="mode-card__label">Bộ từ vựng:</label>
            <CustomSelect
              value={selectedVocabPackId}
              onChange={onSelectVocabPack}
              options={vocabPackOptions}
              style={{ width: '100%' }}
            />
          </div>
          <div className="mode-card__vocab-info">❤️ Hệ thống 3 tim · Đúng 5 câu liên tiếp được hồi 1 tim</div>
          <div className="mode-card__vocab-count">
            Bộ đang chọn: <strong>{selectedVocabPack?.name || 'Chưa có bộ'}</strong> · {activeVocabCount} từ đang học
          </div>
          <button type="button" className="btn btn--outline-theme mode-card__btn" onClick={(e) => { e.stopPropagation(); onOpenDataManager('vocab'); }}>
            Quản lý bộ
          </button>
          <button className="btn btn--primary btn--yellow-ad mode-card__btn">Chơi Ngay</button>
        </div>
      </div>

      <div className="lobby-footer-controls">
        <div className="lobby-footer-section">
          <div className="lobby-footer-section__icon">⏱️</div>
          <div className="lobby-footer-section__body">
            <h4 className="lobby-footer-section__title">Thời gian trả lời</h4>
            <p className="lobby-footer-section__desc">Giới hạn đếm ngược cho mỗi câu hỏi. Có thể nhập tự do tối đa 60 giây.</p>

            <div className="timer-presets">
              {presetTimers.map(({ value, label }) => (
                <button
                  key={value}
                  className={`timer-preset-btn${timerLimit === value ? ' active' : ''}`}
                  onClick={() => {
                    onTimerLimitChange(value);
                    setCustomTimerInput('');
                    setCustomTimerError('');
                  }}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="timer-custom-row">
              <input
                id="customTimerInput"
                type="number"
                min="1"
                max="60"
                placeholder="Tự nhập (1–60s)"
                value={customTimerInput}
                onChange={handleCustomTimer}
                className={`input-text timer-custom-input${customTimerError ? ' input-text--error' : ''}`}
              />
              {timerLimit > 0 && <span className="timer-current-badge">Hiện tại: {timerLimit}s</span>}
              {timerLimit === 0 && <span className="timer-current-badge">Không giới hạn</span>}
            </div>
            {customTimerError && <p className="timer-error-msg">{customTimerError}</p>}
          </div>
        </div>

        <div className="lobby-footer-section">
          <div className="lobby-footer-section__icon">⚙️</div>
          <div className="lobby-footer-section__body">
            <h4 className="lobby-footer-section__title">Quản lý dữ liệu game</h4>
            <p className="lobby-footer-section__desc">Tạo nhiều bộ, đặt tên bộ, chọn bộ để chơi, nhân bản và chỉnh sửa riêng cho từng trò.</p>
            <button
              onClick={() => onOpenDataManager('vocab')}
              className="btn btn--outline-theme"
              style={{ width: '100%', height: '38px', fontSize: '13px' }}
            >
              Mở quản lý bộ dữ liệu ⚙️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
