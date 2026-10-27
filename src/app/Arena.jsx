import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { poolFor, reviewPool } from '../content/index.js';
import { buildGameResult, wordsPerMinute } from '../core/scoring.js';
import { pickDifficulty } from '../core/registry.js';
import { shareResult } from './shareResult.js';

export default function Arena({ game, level, difficultyId, seed, reviewIds, onNavigate, onRestart, onFinish }) {
  const Play = game.Component;
  const difficulty = pickDifficulty(game.manifest, difficultyId);

  const pool = useMemo(
    () =>
      reviewIds?.length > 0
        ? reviewPool({ contentTypes: game.manifest.contentTypes, level, preferredIds: reviewIds, minimum: difficulty.minItems })
        : poolFor({ contentTypes: game.manifest.contentTypes, level }),
    [game.manifest.contentTypes, level, reviewIds, difficulty.minItems]
  );
  const tooSmall = pool.length < difficulty.minItems;

  const round = useMemo(
    () => (tooSmall ? null : game.logic.createRound({ items: pool, difficulty, seed })),
    [tooSmall, game, pool, difficulty, seed]
  );

  // Answers live in a ref, not state. The arena never renders them, and holding them
  // in state is what made a game that submits in the same tick as its last change
  // get graded against the previous render's empty copy.
  const answersRef = useRef({});
  const startedAt = useRef(0);
  const deadlineRef = useRef(0);
  const [status, setStatus] = useState('playing');
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState(null);
  const [review, setReview] = useState([]);
  const [saved, setSaved] = useState(true);
  const [remaining, setRemaining] = useState(difficulty.seconds);
  const [shareState, setShareState] = useState('idle');

  const record = useCallback(
    (payload, meta) => {
      if (!round || status !== 'playing') return;
      const answers = payload ?? answersRef.current;
      const attempts = game.logic.gradeRound({ round, answers });
      const built = buildGameResult({
        game: game.manifest.id,
        difficulty: difficulty.id,
        seed,
        attempts,
        elapsedMs: meta?.elapsedMs ?? Date.now() - startedAt.current,
      });
      setStatus('done');
      setResult(built);
      setSummary(meta ?? null);
      setReview(attempts);
      setSaved(true);
      onFinish(built).catch(() => setSaved(false));
    },
    [round, status, game.logic, game.manifest.id, difficulty.id, seed, onFinish]
  );

  // The canvas owns the image; this callback owns the button's three states. A
  // cancelled native sheet goes back to idle rather than claiming a download.
  const shareCard = useCallback(async () => {
    if (!result || !summary) return;
    setShareState('busy');
    try {
      const how = await shareResult({
        outcome: summary.outcome,
        score: result.score,
        accuracy: result.accuracy,
        lives: summary.lives,
        hits: summary.hits,
        words: round.items.length,
        wpm: wordsPerMinute(summary.hits, summary.elapsedMs),
        level,
        difficulty: difficulty.label,
      });
      setShareState(how === 'cancelled' ? 'idle' : how);
    } catch {
      setShareState('error');
    }
  }, [result, summary, round.items.length, level, difficulty.label]);

  // The interval is the only thing that advances the clock, and the timeout submit
  // runs from its callback rather than from an effect watching `remaining` — an
  // effect that calls setState would be a render-time cascade.
  const recordRef = useRef(record);
  useEffect(() => {
    recordRef.current = record;
  });

  useEffect(() => {
    startedAt.current = Date.now();
    deadlineRef.current = difficulty.seconds > 0 ? Date.now() + difficulty.seconds * 1000 : 0;
  }, [difficulty.seconds]);

  // The clock reads a wall-clock deadline instead of counting ticks, and polls it at
  // 250 ms. Counting ticks silently gifts extra time to a throttled or suspended tab:
  // Chrome drops a hidden page's interval to roughly one fire per minute, so a 30 s
  // round can stretch into minutes and never end. Deriving the value from Date.now()
  // means the round ends the moment the tab wakes up past its deadline.
  useEffect(() => {
    if (difficulty.seconds === 0 || status !== 'playing') return undefined;
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) recordRef.current();
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [difficulty.seconds, status]);

  if (tooSmall) {
    return (
      <div className="arena">
        <p className="empty-state">
          Mức {level} mới có {pool.length} từ, {game.manifest.name} ở độ khó "{difficulty.label}" cần {difficulty.minItems}.
          Chọn mức dễ hơn, hoặc thêm nội dung vào <code>src/content/</code>.
        </p>
        <button type="button" className="ghost-button" onClick={() => onNavigate({ view: 'lobby' })}>
          Về lobby
        </button>
      </div>
    );
  }

  const wpm = summary ? wordsPerMinute(summary.hits, summary.elapsedMs) : 0;
  const shareNote =
    shareState === 'shared'
      ? 'Đã mở bảng chia sẻ.'
      : shareState === 'downloaded'
        ? 'Đã tải ảnh kết quả.'
        : shareState === 'error'
          ? 'Không tạo được ảnh. Thử lại.'
          : '';

  return (
    <div className="arena">
      <div className="arena-bar">
        <button type="button" className="ghost-button" onClick={() => onNavigate({ view: 'lobby' })}>
          ← Lobby
        </button>
        <h2 className="arena-title">{game.manifest.name}</h2>
        <p className="arena-clock">{difficulty.seconds === 0 ? 'Không đếm giờ' : `Còn ${remaining}s`}</p>
      </div>

      {status === 'playing' ? <Play round={round} onChange={(next) => (answersRef.current = next)} onSubmit={record} /> : null}

      {status === 'done' ? (
        <div className="result-panel">
          {summary?.outcome ? (
            <p className={`result-kicker${summary.outcome === 'lost' ? ' is-lost' : ''}`}>
              {summary.outcome === 'won' ? 'Hoàn thành' : 'Hết mạng'}
            </p>
          ) : null}
          <p className="result-score">{result.score} điểm</p>
          <p className="result-meta">
            +{result.xp} XP · đúng {result.correct}/{result.correct + result.wrong} · chính xác {result.accuracy}%
          </p>
          {summary ? (
            <dl className="result-stats">
              <div>
                <dt>Mạng còn lại</dt>
                <dd>{summary.lives}</dd>
              </div>
              <div>
                <dt>Từ đã hạ</dt>
                <dd>{summary.hits}/{round.items.length}</dd>
              </div>
              <div>
                <dt>Từ/phút</dt>
                <dd>{wpm}</dd>
              </div>
            </dl>
          ) : null}
          {!saved ? <p className="save-warning">Ván này chưa lưu được — điểm chỉ hiển thị trên màn hình.</p> : null}

          <ul className="review-list">
            {review.map((attempt) => (
              <li key={attempt.wordId} className={attempt.correct ? 'is-right' : 'is-wrong'}>
                <span>{attempt.correct ? '✓' : '✗'}</span>
                <strong>{attempt.expected}</strong>
                {attempt.correct ? null : <em>bạn đưa: {attempt.given || '— bỏ trống —'}</em>}
              </li>
            ))}
          </ul>

          <div className="result-actions">
            <button type="button" className="primary-button" onClick={onRestart}>
              Chơi lại
            </button>
            {summary ? (
              <button
                type="button"
                className="ghost-button"
                onClick={shareCard}
                disabled={shareState === 'busy'}
                aria-busy={shareState === 'busy'}
              >
                {shareState === 'busy' ? 'Đang tạo ảnh…' : 'Chia sẻ kết quả'}
              </button>
            ) : null}
            <button type="button" className="ghost-button" onClick={() => onNavigate({ view: 'lobby' })}>
              Game khác
            </button>
          </div>
          {summary ? (
            <p className="result-share-note" role="status">{shareNote}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
