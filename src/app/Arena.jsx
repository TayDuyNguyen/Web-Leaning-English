import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { poolFor } from '../content/index.js';
import { buildGameResult } from '../core/scoring.js';
import { pickDifficulty } from '../core/registry.js';

export default function Arena({ game, level, difficultyId, seed, onNavigate, onRestart, onFinish }) {
  const Play = game.Component;
  const difficulty = pickDifficulty(game.manifest, difficultyId);

  const pool = useMemo(
    () => poolFor({ contentTypes: game.manifest.contentTypes, level }),
    [game.manifest.contentTypes, level]
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
  const [status, setStatus] = useState('playing');
  const [result, setResult] = useState(null);
  const [review, setReview] = useState([]);
  const [saved, setSaved] = useState(true);
  const [remaining, setRemaining] = useState(difficulty.seconds);

  const record = useCallback(
    (payload) => {
      if (!round || status !== 'playing') return;
      const answers = payload ?? answersRef.current;
      const attempts = game.logic.gradeRound({ round, answers });
      const built = buildGameResult({
        game: game.manifest.id,
        difficulty: difficulty.id,
        seed,
        attempts,
        elapsedMs: Date.now() - startedAt.current,
      });
      setStatus('done');
      setResult(built);
      setReview(attempts);
      setSaved(true);
      onFinish(built).catch(() => setSaved(false));
    },
    [round, status, game.logic, game.manifest.id, difficulty.id, seed, onFinish]
  );

  // The interval is the only thing that advances the clock, and the timeout submit
  // runs from its callback rather than from an effect watching `remaining` — an
  // effect that calls setState would be a render-time cascade.
  const recordRef = useRef(record);
  useEffect(() => {
    recordRef.current = record;
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (difficulty.seconds === 0 || status !== 'playing') return undefined;
    let left = difficulty.seconds;
    const id = setInterval(() => {
      left -= 1;
      setRemaining(Math.max(0, left));
      if (left <= 0) {
        clearInterval(id);
        recordRef.current();
      }
    }, 1000);
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
          <p className="result-score">{result.score} điểm</p>
          <p className="result-meta">
            +{result.xp} XP · đúng {result.correct}/{result.correct + result.wrong} · chính xác {result.accuracy}%
          </p>
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
            <button type="button" className="ghost-button" onClick={() => onNavigate({ view: 'lobby' })}>
              Game khác
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
