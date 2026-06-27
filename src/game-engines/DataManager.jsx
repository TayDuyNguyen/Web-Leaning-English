import { useEffect, useMemo, useRef, useState } from 'react';
import { defaultVocab } from '../data/default-vocab';
import CustomSelect from '../components/CustomSelect';
import {
  normalizeGrammarQuestion,
  normalizeSentenceQuestion,
  normalizeVocabEntry,
  sanitizeGrammarList,
  sanitizeSentenceList,
  sanitizeVocabList,
} from './gameDataUtils';
import { updatePackItems } from './gamePackUtils';

const VOCAB_JSON_EXAMPLE = `[
  {
    "word": "Meticulous",
    "meaning": "Tỉ mỉ, kỹ lưỡng",
    "options": [
      "Cẩu thả",
      "Hời hợt",
      "Nhanh chóng"
    ],
    "mastery": 0,
    "correctCount": 0,
    "incorrectCount": 0
  },
  {
    "word": "Allocate",
    "meaning": "Phân bổ",
    "options": [
      "Thu hồi",
      "Làm hỏng",
      "Trì hoãn"
    ],
    "mastery": 0,
    "correctCount": 0,
    "incorrectCount": 0
  }
]`;

const GRAMMAR_JSON_EXAMPLE = `[
  {
    "id": "g-1",
    "question": "By the time he came, we ______ dinner.",
    "options": [
      "had had",
      "have had",
      "were having",
      "had been having"
    ],
    "answer": "had had",
    "explanation": "Dùng quá khứ hoàn thành cho hành động xảy ra trước một hành động khác trong quá khứ.",
    "mastery": 0,
    "correctCount": 0,
    "incorrectCount": 0
  }
]`;

const SENTENCE_JSON_EXAMPLE = `[
  {
    "id": "s-1",
    "vietnamese": "Chúng tôi học tiếng Anh mỗi ngày.",
    "english": "We study English every day.",
    "mastery": 0,
    "correctCount": 0,
    "incorrectCount": 0
  }
]`;

function getSelectedPack(packs, selectedId) {
  return packs.find((pack) => pack.id === selectedId) || packs[0] || null;
}

export default function DataManager({
  isOpen,
  onClose,
  initialTab = 'vocab',
  vocabPacks,
  grammarPacks,
  sentencePacks,
  selectedVocabPackId,
  selectedGrammarPackId,
  selectedSentencePackId,
  onSelectVocabPack,
  onSelectGrammarPack,
  onSelectSentencePack,
  onSaveVocabPacks,
  onSaveGrammarPacks,
  onSaveSentencePacks,
  onCreatePack,
  onDuplicatePack,
  onRenamePack,
  onDeletePack,
  isCloudEnabled,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [packActionMode, setPackActionMode] = useState('idle');
  const [packNameInput, setPackNameInput] = useState('');
  const [pendingAction, setPendingAction] = useState('');
  const [deleteItemTarget, setDeleteItemTarget] = useState(null);
  const [notice, setNotice] = useState(null);

  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [vocabJsonText, setVocabJsonText] = useState('');

  const [gQuestion, setGQuestion] = useState('');
  const [gOptA, setGOptA] = useState('');
  const [gOptB, setGOptB] = useState('');
  const [gOptC, setGOptC] = useState('');
  const [gOptD, setGOptD] = useState('');
  const [gAnswer, setGAnswer] = useState('A');
  const [gExplanation, setGExplanation] = useState('');
  const [grammarJsonText, setGrammarJsonText] = useState('');

  const [sVietnamese, setSVietnamese] = useState('');
  const [sEnglish, setSEnglish] = useState('');
  const [sentenceJsonText, setSentenceJsonText] = useState('');
  const localIdRef = useRef(1);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [initialTab, isOpen, onClose]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const vocabPack = useMemo(() => getSelectedPack(vocabPacks, selectedVocabPackId), [selectedVocabPackId, vocabPacks]);
  const grammarPack = useMemo(() => getSelectedPack(grammarPacks, selectedGrammarPackId), [grammarPacks, selectedGrammarPackId]);
  const sentencePack = useMemo(() => getSelectedPack(sentencePacks, selectedSentencePackId), [selectedSentencePackId, sentencePacks]);

  if (!isOpen) return null;

  const tabConfig = {
    vocab: {
      label: 'Từ vựng',
      packs: vocabPacks,
      selectedId: selectedVocabPackId,
      currentPack: vocabPack,
      onSelect: onSelectVocabPack,
      onSave: onSaveVocabPacks,
    },
    grammar: {
      label: 'Ngữ pháp',
      packs: grammarPacks,
      selectedId: selectedGrammarPackId,
      currentPack: grammarPack,
      onSelect: onSelectGrammarPack,
      onSave: onSaveGrammarPacks,
    },
    sentence: {
      label: 'Xây câu',
      packs: sentencePacks,
      selectedId: selectedSentencePackId,
      currentPack: sentencePack,
      onSelect: onSelectSentencePack,
      onSave: onSaveSentencePacks,
    },
  }[activeTab];

  const currentPack = tabConfig.currentPack;
  const currentItems = currentPack?.items || [];
  const packOptions = tabConfig.packs.map((pack) => ({
    value: pack.id,
    label: `${pack.name} (${pack.items.length})`,
  }));
  const selectPackByKind = (kind, packId) => {
    if (kind === 'vocab') {
      onSelectVocabPack(packId);
      return;
    }
    if (kind === 'grammar') {
      onSelectGrammarPack(packId);
      return;
    }
    onSelectSentencePack(packId);
  };
  const nextLocalId = (prefix) => {
    const nextId = `${prefix}-${localIdRef.current}`;
    localIdRef.current += 1;
    return nextId;
  };
  const showNotice = (type, message) => {
    setNotice({ type, message });
  };

  const persistPackItems = async (kind, nextItems) => {
    if (!currentPack) {
      const defaultNames = {
        vocab: 'Bộ từ vựng mới',
        grammar: 'Bộ ngữ pháp mới',
        sentence: 'Bộ câu mới',
      };
      const createdPackId = await onCreatePack(kind, defaultNames[kind], nextItems);
        if (createdPackId) {
          selectPackByKind(kind, createdPackId);
          showNotice('success', `Đã tạo và chọn bộ mới cho ${kind === 'vocab' ? 'từ vựng' : kind === 'grammar' ? 'ngữ pháp' : 'xây câu'}.`);
        }
      return;
    }

    const packCollection = kind === 'vocab' ? vocabPacks : kind === 'grammar' ? grammarPacks : sentencePacks;
    const nextPacks = updatePackItems(kind, packCollection, currentPack.id, nextItems);
    if (kind === 'vocab') {
      await onSaveVocabPacks(nextPacks, currentPack.id);
    } else if (kind === 'grammar') {
      await onSaveGrammarPacks(nextPacks, currentPack.id);
    } else {
      await onSaveSentencePacks(nextPacks, currentPack.id);
    }
  };

  const handleCreateNewPack = async () => {
    setPackActionMode('create-pack');
    setPackNameInput('');
  };

  const handleRenameCurrentPack = async () => {
    if (!currentPack) return;
    setPackActionMode('rename-pack');
    setPackNameInput(currentPack.name);
  };

  const handleDuplicateCurrentPack = async () => {
    if (!currentPack) return;
    await onDuplicatePack(activeTab, currentPack.id);
  };

  const handleDeleteCurrentPack = async () => {
    if (!currentPack) return;
    setDeleteItemTarget(null);
    setPackActionMode('delete-pack');
  };

  const resetProgressStats = (item) => ({
    ...item,
    mastery: 0,
    correctCount: 0,
    incorrectCount: 0,
  });

  const handleAddVocab = async (e) => {
    e.preventDefault();
    const newItem = normalizeVocabEntry({
      word,
      meaning,
      options: [opt1, opt2, opt3],
      mastery: 0,
      correctCount: 0,
      incorrectCount: 0,
    });

    if (!newItem) {
      alert('Từ vựng chưa hợp lệ. Cần 1 nghĩa đúng và 3 nghĩa nhiễu khác nhau.');
      showNotice('error', 'Từ vựng chưa hợp lệ. Cần 1 nghĩa đúng và 3 nghĩa nhiễu khác nhau.');
      return;
    }

    if (currentItems.some((item) => item.word.toLowerCase() === newItem.word.toLowerCase())) {
      showNotice('error', 'Từ này đã tồn tại trong bộ đang chọn.');
      return;
    }

    await persistPackItems('vocab', [...currentItems, newItem]);
    setWord('');
    setMeaning('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    showNotice('success', 'Đã thêm từ vựng vào bộ hiện tại.');
  };

  const handleAddGrammar = async (e) => {
    e.preventDefault();
    const answerMap = { A: gOptA.trim(), B: gOptB.trim(), C: gOptC.trim(), D: gOptD.trim() };
    const newItem = normalizeGrammarQuestion({
      id: nextLocalId('custom-g'),
      question: gQuestion.trim(),
      options: [gOptA.trim(), gOptB.trim(), gOptC.trim(), gOptD.trim()],
      answer: answerMap[gAnswer],
      explanation: gExplanation.trim() || undefined,
    });

    if (!newItem) {
      showNotice('error', 'Câu hỏi ngữ pháp chưa hợp lệ. Cần đủ 4 đáp án khác nhau và 1 đáp án đúng.');
      return;
    }

    await persistPackItems('grammar', [...currentItems, newItem]);
    setGQuestion('');
    setGOptA('');
    setGOptB('');
    setGOptC('');
    setGOptD('');
    setGAnswer('A');
    setGExplanation('');
    showNotice('success', 'Đã thêm câu hỏi ngữ pháp vào bộ hiện tại.');
  };

  const handleAddSentence = async (e) => {
    e.preventDefault();
    const newItem = normalizeSentenceQuestion({
      id: nextLocalId('custom-s'),
      vietnamese: sVietnamese,
      english: sEnglish,
    });

    if (!newItem) {
      showNotice('error', 'Câu tiếng Anh cần hợp lệ và có tối thiểu 3 từ để tạo bộ xây câu.');
      return;
    }

    await persistPackItems('sentence', [...currentItems, newItem]);
    setSVietnamese('');
    setSEnglish('');
    showNotice('success', 'Đã thêm câu vào bộ xây câu hiện tại.');
  };

  const handleImportItems = async (kind) => {
    const rawText =
      kind === 'vocab' ? vocabJsonText.trim() : kind === 'grammar' ? grammarJsonText.trim() : sentenceJsonText.trim();

    if (!rawText) {
      showNotice('error', 'Vui lòng dán JSON hợp lệ trước.');
      return;
    }

    try {
      const parsed = JSON.parse(rawText);
      const sanitized =
        kind === 'vocab'
          ? sanitizeVocabList(parsed)
          : kind === 'grammar'
            ? sanitizeGrammarList(parsed)
            : sanitizeSentenceList(parsed);

      await persistPackItems(kind, sanitized);
      showNotice('success', 'Đã nhập JSON vào bộ hiện tại.');
    } catch (error) {
      showNotice('error', `Lỗi JSON: ${error.message}`);
    }
  };

  const handleExportItems = (kind) => {
    const items = kind === 'vocab' ? vocabPack?.items || [] : kind === 'grammar' ? grammarPack?.items || [] : sentencePack?.items || [];
    const fileName =
      kind === 'vocab'
        ? `${vocabPack?.name || 'bo-tu-vung'}.json`
        : kind === 'grammar'
          ? `${grammarPack?.name || 'bo-ngu-phap'}.json`
          : `${sentencePack?.name || 'bo-cau'}.json`;

    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleResetProgress = async (kind) => {
    await persistPackItems(kind, currentItems.map(resetProgressStats));
  };

  const handleDeleteItem = async (kind, targetId) => {
    setDeleteItemTarget({ kind, targetId });
    setPackActionMode('delete-item');
  };

  const handleResetDefaultVocab = async () => {
    await persistPackItems('vocab', defaultVocab);
  };

  const handleCancelPackAction = () => {
    if (pendingAction) return;
    setPackActionMode('idle');
    setPackNameInput('');
    setDeleteItemTarget(null);
  };

  const handleSubmitPackAction = async () => {
    if (pendingAction) return;

    try {
      if (packActionMode === 'create-pack') {
        const nextName = packNameInput.trim();
        if (!nextName) {
          showNotice('error', 'Vui lòng nhập tên bộ dữ liệu.');
          return;
        }
        setPendingAction('create-pack');
        const createdPackId = await onCreatePack(activeTab, nextName, []);
        if (createdPackId) {
          selectPackByKind(activeTab, createdPackId);
          showNotice('success', `Đã tạo bộ "${nextName}".`);
        }
      } else if (packActionMode === 'rename-pack') {
        const nextName = packNameInput.trim();
        if (!nextName || !currentPack) {
          showNotice('error', 'Vui lòng nhập tên bộ dữ liệu.');
          return;
        }
        setPendingAction('rename-pack');
        await onRenamePack(activeTab, currentPack.id, nextName);
        showNotice('success', `Đã đổi tên bộ thành "${nextName}".`);
      } else if (packActionMode === 'delete-pack') {
        if (!currentPack) return;
        setPendingAction('delete-pack');
        const deletedName = currentPack.name;
        await onDeletePack(activeTab, currentPack.id);
        showNotice('success', `Đã xóa bộ "${deletedName}".`);
      } else if (packActionMode === 'delete-item') {
        if (!deleteItemTarget) return;
        setPendingAction('delete-item');
        const nextItems =
          deleteItemTarget.kind === 'vocab'
            ? currentItems.filter((item) => item.word !== deleteItemTarget.targetId)
            : currentItems.filter((item) => item.id !== deleteItemTarget.targetId);
        await persistPackItems(deleteItemTarget.kind, nextItems);
        showNotice('success', 'Đã xóa mục khỏi bộ hiện tại.');
      }

      setPackActionMode('idle');
      setPackNameInput('');
      setDeleteItemTarget(null);
    } finally {
      setPendingAction('');
    }
  };

  const packActionTitle =
    packActionMode === 'create-pack'
      ? `Tạo bộ ${tabConfig.label.toLowerCase()} mới`
      : packActionMode === 'rename-pack'
        ? 'Đổi tên bộ dữ liệu'
        : packActionMode === 'delete-pack'
          ? 'Xác nhận xóa bộ dữ liệu'
          : packActionMode === 'delete-item'
            ? 'Xác nhận xóa mục'
            : '';

  const packActionDescription =
    packActionMode === 'create-pack'
      ? 'Nhập tên bộ mới để tạo và tự động chọn ngay trong game.'
      : packActionMode === 'rename-pack'
        ? 'Cập nhật lại tên bộ hiện tại để phần chọn bộ hiển thị đúng.'
        : packActionMode === 'delete-pack'
          ? `Bộ "${currentPack?.name || ''}" sẽ bị xóa khỏi danh sách.`
          : packActionMode === 'delete-item'
            ? 'Mục này sẽ bị xóa khỏi bộ đang chọn.'
            : '';
  const packActionTone =
    packActionMode === 'delete-pack' || packActionMode === 'delete-item'
      ? 'danger'
      : packActionMode === 'rename-pack'
        ? 'info'
        : 'success';

  return (
    <div className="vocab-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="vocab-modal"
        style={{ maxWidth: '1100px', width: '95%' }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vocabManagerTitle"
      >
        <div className="vocab-modal__header">
          <h3 id="vocabManagerTitle" className="vocab-modal__title">Quản Lý Bộ Dữ Liệu Game ⚙️</h3>
          <button type="button" onClick={onClose} className="vocab-modal__close" aria-label="Đóng cửa sổ quản lý dữ liệu">
            &times;
          </button>
        </div>

        <div className="data-nav-tabs" style={{ display: 'flex', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button type="button" onClick={() => setActiveTab('vocab')} className={`btn ${activeTab === 'vocab' ? 'btn--primary' : 'btn--outline-theme'}`}>Từ vựng</button>
          <button type="button" onClick={() => setActiveTab('grammar')} className={`btn ${activeTab === 'grammar' ? 'btn--primary' : 'btn--outline-theme'}`}>Ngữ pháp</button>
          <button type="button" onClick={() => setActiveTab('sentence')} className={`btn ${activeTab === 'sentence' ? 'btn--primary' : 'btn--outline-theme'}`}>Xây câu</button>
          <button type="button" onClick={onClose} className="btn btn--outline-theme data-nav-tabs__close">Đóng</button>
        </div>

        <div className="vocab-modal__content" style={{ maxHeight: '72vh', overflowY: 'auto', padding: '18px 16px 22px' }}>
          {notice && (
            <div className={`pack-inline-notice pack-inline-notice--${notice.type}`}>
              <span className="pack-inline-notice__icon" aria-hidden="true">
                {notice.type === 'success' ? '✓' : notice.type === 'error' ? '!' : 'i'}
              </span>
              <span>{notice.message}</span>
            </div>
          )}
          {packActionMode !== 'idle' && (
            <div className={`pack-action-card pack-action-card--${packActionTone}`}>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div className="pack-action-card__title">
                    <span className="pack-action-card__icon" aria-hidden="true">
                      {packActionMode === 'create-pack' ? '+' : packActionMode === 'rename-pack' ? '✎' : '×'}
                    </span>
                    <span>{packActionTitle}</span>
                  </div>
                  <div className="pack-action-card__desc">{packActionDescription}</div>
                </div>

                {(packActionMode === 'create-pack' || packActionMode === 'rename-pack') && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Tên bộ dữ liệu</label>
                    <input
                      type="text"
                      value={packNameInput}
                      onChange={(event) => setPackNameInput(event.target.value)}
                      className="input-text"
                      placeholder="Ví dụ: Bộ 50 câu điều kiện"
                      disabled={Boolean(pendingAction)}
                      autoFocus
                    />
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn--outline-theme" onClick={handleCancelPackAction} disabled={Boolean(pendingAction)}>
                    Hủy
                  </button>
                  <button type="button" className="btn btn--primary" onClick={handleSubmitPackAction} disabled={Boolean(pendingAction)}>
                    {pendingAction === 'create-pack' && 'Đang tạo...'}
                    {pendingAction === 'rename-pack' && 'Đang cập nhật...'}
                    {pendingAction === 'delete-pack' && 'Đang xóa...'}
                    {pendingAction === 'delete-item' && 'Đang xóa mục...'}
                    {!pendingAction && (packActionMode === 'delete-pack' || packActionMode === 'delete-item' ? 'Xác nhận xóa' : 'Lưu thao tác')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'minmax(0, 1fr) repeat(4, auto)', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Bộ đang quản lý</label>
                <CustomSelect value={currentPack?.id || ''} onChange={tabConfig.onSelect} options={packOptions} style={{ width: '100%' }} />
              </div>
              <button type="button" className="btn btn--primary" onClick={handleCreateNewPack}>+ Bộ mới</button>
              <button type="button" className="btn btn--outline-theme" disabled={!currentPack} onClick={handleDuplicateCurrentPack}>Nhân bản</button>
              <button type="button" className="btn btn--outline-theme" disabled={!currentPack} onClick={handleRenameCurrentPack}>Đổi tên</button>
              <button type="button" className="btn btn--outline-red" disabled={!currentPack} onClick={handleDeleteCurrentPack}>Xóa bộ</button>
            </div>

            <div style={{ padding: '14px 16px', borderRadius: 'var(--r-md)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {currentPack ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <span><strong>{currentPack.name}</strong> · {currentItems.length} mục</span>
                  <span style={{ color: 'var(--text-muted)' }}>{isCloudEnabled ? 'Đang lưu lên đám mây' : 'Đang lưu cục bộ'}</span>
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)' }}>Chưa có bộ tùy chỉnh cho khu vực này. Hãy tạo bộ mới để bắt đầu.</div>
              )}
            </div>
          </div>

          {activeTab === 'vocab' && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div className="vocab-section-title">✏️ Thêm Từ Vựng Vào Bộ</div>
              <form onSubmit={handleAddVocab} className="vocab-form-grid">
                <div className="vocab-form-group">
                  <label>Từ tiếng Anh</label>
                  <input type="text" value={word} onChange={(e) => setWord(e.target.value)} className="input-text" placeholder="Ví dụ: Meticulous" required />
                </div>
                <div className="vocab-form-group">
                  <label>Nghĩa đúng</label>
                  <input type="text" value={meaning} onChange={(e) => setMeaning(e.target.value)} className="input-text" placeholder="Ví dụ: Tỉ mỉ" required />
                </div>
                <div className="vocab-form-group">
                  <label>Nghĩa nhiễu 1</label>
                  <input type="text" value={opt1} onChange={(e) => setOpt1(e.target.value)} className="input-text" required />
                </div>
                <div className="vocab-form-group">
                  <label>Nghĩa nhiễu 2</label>
                  <input type="text" value={opt2} onChange={(e) => setOpt2(e.target.value)} className="input-text" required />
                </div>
                <div className="vocab-form-group grid-span-all">
                  <label>Nghĩa nhiễu 3</label>
                  <input type="text" value={opt3} onChange={(e) => setOpt3(e.target.value)} className="input-text" required />
                </div>
                <div className="vocab-form-actions">
                  <button type="submit" className="btn btn--primary">Thêm vào bộ</button>
                </div>
              </form>

              <div className="vocab-section-title">📚 Danh Sách Từ Trong Bộ</div>
              {currentItems.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>Bộ này chưa có từ nào.</p>
              ) : (
                <div className="vocab-table-container">
                  <table className="vocab-table">
                    <thead>
                      <tr>
                        <th>Từ</th>
                        <th>Độ thuộc</th>
                        <th>Đúng</th>
                        <th>Sai</th>
                        <th>Nghĩa đúng</th>
                        <th>Nghĩa nhiễu</th>
                        <th className="text-right">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id || item.word}>
                          <td>{item.word}</td>
                          <td>{item.mastery || 0} ⭐</td>
                          <td style={{ color: '#52B788', fontWeight: 700 }}>{item.correctCount || 0}</td>
                          <td style={{ color: '#FF6B6B', fontWeight: 700 }}>{item.incorrectCount || 0}</td>
                          <td>{item.meaning}</td>
                          <td>{item.options.join(', ')}</td>
                          <td className="text-right">
                            <span className="vocab-table__delete-btn" onClick={() => handleDeleteItem('vocab', item.word)}>Xóa</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="vocab-json-section">
                <textarea value={vocabJsonText} onChange={(e) => setVocabJsonText(e.target.value)} placeholder="Dán JSON từ vựng vào đây..." />
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--r-sm)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--blue-bright)', marginBottom: '6px' }}>Ví dụ JSON mẫu cho bộ từ vựng</div>
                  <pre style={{ margin: 0, padding: 0, fontSize: '11px', color: 'var(--text-muted)', overflowX: 'auto', fontFamily: 'var(--font-code)', lineHeight: '1.45', whiteSpace: 'pre-wrap' }}>
                    {VOCAB_JSON_EXAMPLE}
                  </pre>
                </div>
                <div className="vocab-json-actions">
                  <button type="button" className="btn btn--outline-red" onClick={handleResetDefaultVocab}>Nạp bộ mặc định</button>
                  <button type="button" className="btn btn--outline-theme" disabled={!currentPack} onClick={() => handleResetProgress('vocab')}>Reset tiến độ</button>
                  <button type="button" className="btn btn--outline-cyan" disabled={!currentPack} onClick={() => handleExportItems('vocab')}>Xuất JSON</button>
                  <button type="button" className="btn btn--primary" onClick={() => handleImportItems('vocab')}>Nhập JSON</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grammar' && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div className="vocab-section-title">✏️ Thêm Câu Hỏi Ngữ Pháp Vào Bộ</div>
              <form onSubmit={handleAddGrammar} className="vocab-form-grid">
                <div className="vocab-form-group grid-span-all">
                  <label>Câu hỏi</label>
                  <input type="text" value={gQuestion} onChange={(e) => setGQuestion(e.target.value)} className="input-text" placeholder="Ví dụ: By the time he came, we ______ dinner." required />
                </div>
                <div className="vocab-form-group"><label>Đáp án A</label><input type="text" value={gOptA} onChange={(e) => setGOptA(e.target.value)} className="input-text" required /></div>
                <div className="vocab-form-group"><label>Đáp án B</label><input type="text" value={gOptB} onChange={(e) => setGOptB(e.target.value)} className="input-text" required /></div>
                <div className="vocab-form-group"><label>Đáp án C</label><input type="text" value={gOptC} onChange={(e) => setGOptC(e.target.value)} className="input-text" required /></div>
                <div className="vocab-form-group"><label>Đáp án D</label><input type="text" value={gOptD} onChange={(e) => setGOptD(e.target.value)} className="input-text" required /></div>
                <div className="vocab-form-group">
                  <label>Đáp án đúng</label>
                  <CustomSelect
                    value={gAnswer}
                    onChange={setGAnswer}
                    options={[
                      { value: 'A', label: 'Đáp án A' },
                      { value: 'B', label: 'Đáp án B' },
                      { value: 'C', label: 'Đáp án C' },
                      { value: 'D', label: 'Đáp án D' },
                    ]}
                  />
                </div>
                <div className="vocab-form-group">
                  <label>Giải thích</label>
                  <input type="text" value={gExplanation} onChange={(e) => setGExplanation(e.target.value)} className="input-text" placeholder="Tùy chọn" />
                </div>
                <div className="vocab-form-actions grid-span-all">
                  <button type="submit" className="btn btn--primary">Thêm vào bộ</button>
                </div>
              </form>

              <div className="vocab-section-title">📚 Danh Sách Câu Hỏi Trong Bộ</div>
              {currentItems.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>Bộ này chưa có câu hỏi nào.</p>
              ) : (
                <div className="vocab-table-container">
                  <table className="vocab-table">
                    <thead>
                      <tr>
                        <th>Câu hỏi</th>
                        <th>Độ thuộc</th>
                        <th>Đúng</th>
                        <th>Sai</th>
                        <th>Đáp án</th>
                        <th className="text-right">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.question}</td>
                          <td>{item.mastery || 0} ⭐</td>
                          <td style={{ color: '#52B788', fontWeight: 700 }}>{item.correctCount || 0}</td>
                          <td style={{ color: '#FF6B6B', fontWeight: 700 }}>{item.incorrectCount || 0}</td>
                          <td>{item.answer}</td>
                          <td className="text-right">
                            <span className="vocab-table__delete-btn" onClick={() => handleDeleteItem('grammar', item.id)}>Xóa</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="vocab-json-section">
                <textarea value={grammarJsonText} onChange={(e) => setGrammarJsonText(e.target.value)} placeholder="Dán JSON ngữ pháp vào đây..." />
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--r-sm)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--blue-bright)', marginBottom: '6px' }}>Ví dụ JSON mẫu cho bộ ngữ pháp</div>
                  <pre style={{ margin: 0, padding: 0, fontSize: '11px', color: 'var(--text-muted)', overflowX: 'auto', fontFamily: 'var(--font-code)', lineHeight: '1.45', whiteSpace: 'pre-wrap' }}>
                    {GRAMMAR_JSON_EXAMPLE}
                  </pre>
                </div>
                <div className="vocab-json-actions">
                  <button type="button" className="btn btn--outline-theme" disabled={!currentPack} onClick={() => handleResetProgress('grammar')}>Reset tiến độ</button>
                  <button type="button" className="btn btn--outline-cyan" disabled={!currentPack} onClick={() => handleExportItems('grammar')}>Xuất JSON</button>
                  <button type="button" className="btn btn--primary" onClick={() => handleImportItems('grammar')}>Nhập JSON</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sentence' && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div className="vocab-section-title">✏️ Thêm Câu Vào Bộ Xây Câu</div>
              <form onSubmit={handleAddSentence} className="vocab-form-grid">
                <div className="vocab-form-group">
                  <label>Nghĩa tiếng Việt</label>
                  <input type="text" value={sVietnamese} onChange={(e) => setSVietnamese(e.target.value)} className="input-text" required />
                </div>
                <div className="vocab-form-group">
                  <label>Câu tiếng Anh</label>
                  <input type="text" value={sEnglish} onChange={(e) => setSEnglish(e.target.value)} className="input-text" required />
                </div>
                <div className="vocab-form-actions">
                  <button type="submit" className="btn btn--primary">Thêm vào bộ</button>
                </div>
              </form>

              <div className="vocab-section-title">📚 Danh Sách Câu Trong Bộ</div>
              {currentItems.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>Bộ này chưa có câu nào.</p>
              ) : (
                <div className="vocab-table-container">
                  <table className="vocab-table">
                    <thead>
                      <tr>
                        <th>Nghĩa tiếng Việt</th>
                        <th>Độ thuộc</th>
                        <th>Đúng</th>
                        <th>Sai</th>
                        <th>Câu tiếng Anh</th>
                        <th className="text-right">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.vietnamese}</td>
                          <td>{item.mastery || 0} ⭐</td>
                          <td style={{ color: '#52B788', fontWeight: 700 }}>{item.correctCount || 0}</td>
                          <td style={{ color: '#FF6B6B', fontWeight: 700 }}>{item.incorrectCount || 0}</td>
                          <td>{item.english}</td>
                          <td className="text-right">
                            <span className="vocab-table__delete-btn" onClick={() => handleDeleteItem('sentence', item.id)}>Xóa</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="vocab-json-section">
                <textarea value={sentenceJsonText} onChange={(e) => setSentenceJsonText(e.target.value)} placeholder="Dán JSON bộ câu vào đây..." />
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--r-sm)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--blue-bright)', marginBottom: '6px' }}>Ví dụ JSON mẫu cho bộ xây câu</div>
                  <pre style={{ margin: 0, padding: 0, fontSize: '11px', color: 'var(--text-muted)', overflowX: 'auto', fontFamily: 'var(--font-code)', lineHeight: '1.45', whiteSpace: 'pre-wrap' }}>
                    {SENTENCE_JSON_EXAMPLE}
                  </pre>
                </div>
                <div className="vocab-json-actions">
                  <button type="button" className="btn btn--outline-theme" disabled={!currentPack} onClick={() => handleResetProgress('sentence')}>Reset tiến độ</button>
                  <button type="button" className="btn btn--outline-cyan" disabled={!currentPack} onClick={() => handleExportItems('sentence')}>Xuất JSON</button>
                  <button type="button" className="btn btn--primary" onClick={() => handleImportItems('sentence')}>Nhập JSON</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
