import { useCallback, useEffect, useRef, useState } from 'react';

import { advance, pickTarget } from './logic.js';

// Only the characters every authored word is made of. Anything else — arrows,
// modifiers, function keys — must not steal a lock or reset progress.
const TYPEABLE = /^[a-z'-]$/;

// The clock lives in refs, not state: the fall itself is CSS, and re-rendering on
// every frame would spend React's budget on an animation the compositor already runs.
// Wall-clock arithmetic (with paused time subtracted) is what keeps the keystroke
// window and the visible animation describing the same instant.
function elapsedOf(state) {
  const reference = state.pausedAt || performance.now();
  return Math.max(0, reference - state.startedAt - state.pausedTotal);
}

function createState(round) {
  return {
    status: 'ready',
    lockedId: null,
    typed: '',
    hits: 0,
    lives: round.lives,
    combo: 0,
    answers: {},
    missed: [],
    lastHit: null,
    hitSeq: 0,
    startedAt: 0,
    pausedAt: 0,
    pausedTotal: 0,
    finished: false,
  };
}

function viewOf(state) {
  return {
    status: state.status,
    lockedId: state.lockedId,
    typed: state.typed,
    hits: state.hits,
    lives: state.lives,
    combo: state.combo,
    answers: { ...state.answers },
    missed: [...state.missed],
    lastHit: state.lastHit,
  };
}

export default function TypingGame({ round, onChange, onSubmit }) {
  // The mutable board only exists after mount: a ref read during render is exactly
  // the kind of hidden state React's lint rule forbids, and every event that touches
  // it is registered by an effect anyway.
  const stateRef = useRef(null);
  const [view, setView] = useState(() => viewOf(createState(round)));
  const captureRef = useRef(null);
  const stageRef = useRef(null);

  const publish = useCallback(() => setView(viewOf(stateRef.current)), []);

  useEffect(() => {
    if (stateRef.current === null) stateRef.current = createState(round);
  }, [round]);

  const finish = useCallback(
    (state) => {
      if (state.finished) return;
      state.finished = true;
      state.status = 'over';
      publish();
      onSubmit({ ...state.answers });
    },
    [onSubmit, publish]
  );

  const resolve = useCallback(
    (item, { correct, given }) => {
      const state = stateRef.current;
      if (state === null) return;
      if (Object.hasOwn(state.answers, item.id)) return;

      state.answers[item.id] = given;
      if (correct) {
        state.hits += 1;
        state.combo += 1;
        // A cleared word owes the player its meaning: the falling tile only ever
        // carried English, and the Vietnamese half has to surface at the moment
        // the word dies or it is never learned, only typed.
        state.hitSeq += 1;
        state.lastHit = { word: item.word, meaningVi: item.meaningVi, seq: state.hitSeq };
      } else {
        state.missed = [...state.missed, item.id];
        state.combo = 0;
        state.lives -= 1;
      }
      if (state.lockedId === item.id) {
        state.lockedId = null;
        state.typed = '';
      }

      onChange({ ...state.answers });
      publish();

      if (state.lives <= 0 || Object.keys(state.answers).length >= round.items.length) finish(state);
    },
    [finish, onChange, publish, round.items.length]
  );

  const start = useCallback(() => {
    const state = stateRef.current;
    if (state === null || state.status !== 'ready') return;
    state.status = 'playing';
    state.startedAt = performance.now();
    publish();
    captureRef.current?.focus({ preventScroll: true });
  }, [publish]);

  const togglePause = useCallback(() => {
    const state = stateRef.current;
    if (state === null) return;
    if (state.status === 'playing') {
      state.status = 'paused';
      state.pausedAt = performance.now();
      publish();
      return;
    }
    if (state.status === 'paused') {
      state.pausedTotal += performance.now() - state.pausedAt;
      state.pausedAt = 0;
      state.status = 'playing';
      publish();
    }
  }, [publish]);

  const press = useCallback(
    (raw) => {
      const state = stateRef.current;
      if (state === null || state.finished) return;
      if (state.status === 'ready') start();
      if (state.status !== 'playing') return;

      const key = String(raw).toLowerCase();
      if (!TYPEABLE.test(key)) return;

      const at = elapsedOf(state);
      const onScreen = round.items.filter(
        (item) => !Object.hasOwn(state.answers, item.id) && item.spawnAtMs <= at && item.landAtMs > at
      );

      if (state.lockedId === null) {
        const target = pickTarget({ words: onScreen, key });
        if (target === null) return;

        state.lockedId = target.id;
        state.typed = key;
        if (state.typed.length === target.word.length) {
          resolve(target, { correct: true, given: state.typed });
          return;
        }
        publish();
        return;
      }

      const locked = round.items.find((item) => item.id === state.lockedId);
      if (locked === undefined) {
        state.lockedId = null;
        state.typed = '';
        publish();
        return;
      }

      const next = advance({ word: locked.word, typed: state.typed, key });
      if (next.done) {
        resolve(locked, { correct: true, given: next.typed });
        return;
      }

      state.typed = next.typed;
      if (next.wrong) {
        state.typed = '';
        state.combo = 0;
      }
      publish();
    },
    [publish, resolve, round.items, start]
  );

  // A word that reached the deck is a lost life, not a skipped question, so it is
  // recorded as an explicit empty answer and shows up in the review list as wrong.
  const onLanded = useCallback(
    (item) => {
      const state = stateRef.current;
      if (state === null) return;
      if (state.status !== 'playing' && state.status !== 'paused') return;
      if (Object.hasOwn(state.answers, item.id)) return;
      resolve(item, { correct: false, given: '' });
    },
    [resolve]
  );

  useEffect(() => {
    function onKeyDown(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (stateRef.current === null) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        togglePause();
        return;
      }

      // Enter and space only start a round that has not started. Swallowing them
      // afterwards would break keyboard use of the buttons around the stage.
      if (stateRef.current.status === 'ready' && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        start();
        return;
      }

      // The capture field is how a phone keyboard reaches this component; when it
      // has focus the input event feeds characters so one key is never counted twice.
      if (event.target === captureRef.current) return;
      if (event.key.length === 1) press(event.key);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [press, start, togglePause]);

  // A hidden tab must not keep dropping words: CSS animations run on wall-clock time,
  // so returning after a phone call would otherwise cost every life at once.
  useEffect(() => {
    function onVisibility() {
      const state = stateRef.current;
      if (state === null) return;
      if (document.visibilityState !== 'hidden' || state.status !== 'playing') return;
      state.status = 'paused';
      state.pausedAt = performance.now();
      publish();
    }

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [publish]);

  useEffect(() => {
    stageRef.current?.focus({ preventScroll: true });
  }, []);

  // The note is a glance, not a log: 2.6 s is long enough to read a Vietnamese gloss
  // and short enough that it never competes with the next word already falling.
  useEffect(() => {
    const hit = view.lastHit;
    if (hit === null) return undefined;
    const id = setTimeout(() => {
      const state = stateRef.current;
      if (state !== null && state.lastHit === hit) {
        state.lastHit = null;
        publish();
      }
    }, 2600);
    return () => clearTimeout(id);
  }, [publish, view.lastHit]);

  const onCaptureChange = useCallback(
    (event) => {
      const typed = event.target.value;
      event.target.value = '';
      for (const char of typed) press(char);
    },
    [press]
  );

  const answered = (item) => Object.hasOwn(view.answers, item.id);
  const missed = (item) => view.missed.includes(item.id);
  const locked = view.lockedId === null ? null : round.items.find((item) => item.id === view.lockedId) ?? null;

  const pending = round.items.filter((item) => !answered(item));
  const milestoneIndex = pending.length > 0 ? pending[0].milestone : round.milestones.length - 1;
  const milestone = round.milestones[milestoneIndex];
  const milestoneCleared = round.items.filter((item) => item.milestone === milestoneIndex && answered(item)).length;

  const stageClass = [
    'typing-stage',
    view.status === 'playing' ? 'is-running' : '',
    view.status === 'paused' ? 'is-paused' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="typing-board">
      <div className="typing-hud">
        <p className="typing-lives" role="img" aria-label={`${view.lives} mạng`}>
          {Array.from({ length: round.lives }, (_, index) => (
            <span key={index} className={`typing-life${index < view.lives ? '' : ' is-lost'}`} />
          ))}
        </p>
        <p className="typing-milestone">
          {milestone.label}/{round.milestones.length} · {milestoneCleared}/{milestone.words} từ
        </p>
        <p className="typing-count">
          Hạ {view.hits}/{round.items.length}
          {view.combo >= 2 ? ` · chuỗi ×${view.combo}` : ''}
        </p>
      </div>

      <div
        ref={stageRef}
        tabIndex={-1}
        className={stageClass}
        aria-label={`Sân gõ từ: ${round.items.length} từ rơi, ${view.lives} mạng còn lại`}
      >
        <input
          ref={captureRef}
          className="typing-capture"
          type="text"
          tabIndex={-1}
          value=""
          onChange={onCaptureChange}
          aria-label="Ô nhận phím cho bàn phím ảo"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        />

        <div className="typing-deck" aria-hidden="true" />

        {round.items.map((item) => {
          const className = [
            'typing-word',
            view.lockedId === item.id ? 'is-locked' : '',
            missed(item) ? 'is-missed' : '',
            answered(item) && !missed(item) ? 'is-hit' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <span
              key={item.id}
              className={className}
              style={{
                left: `${((item.lane + 0.5) * 100) / round.lanes}%`,
                animationDuration: `${item.fallMs}ms`,
                animationDelay: `${item.spawnAtMs}ms`,
                // Paused by default so the ready veil and the pause veil both freeze
                // the exact same animation the clock arithmetic reported.
                animationPlayState: view.status === 'playing' && !answered(item) ? 'running' : 'paused',
              }}
              onAnimationEnd={(event) => {
                if (event.animationName === 'typing-fall') onLanded(item);
              }}
            >
              {item.word}
            </span>
          );
        })}

        {view.status === 'ready' ? (
          <div className="typing-veil">
            <p className="typing-veil-title">Sẵn sàng</p>
            <p className="typing-veil-body">
              Gõ chữ cái đầu của từ đang rơi để khoá mục tiêu, rồi gõ nốt phần còn lại. Từ chạm đáy mất một mạng.
            </p>
            <button type="button" className="primary-button" onClick={start}>
              Bắt đầu
            </button>
          </div>
        ) : null}

        {view.status === 'paused' ? (
          <div className="typing-veil">
            <p className="typing-veil-title">Tạm dừng</p>
            <button type="button" className="primary-button" onClick={togglePause}>
              Chơi tiếp
            </button>
          </div>
        ) : null}
      </div>

      <div className="typing-footer">
        <div className="typing-lock-column">
          <p className="typing-hit" aria-live="polite">
            {view.lastHit ? (
              <>
                <strong>{view.lastHit.word}</strong>
                <span className="typing-hit-meaning"> — {view.lastHit.meaningVi}</span>
              </>
            ) : null}
          </p>

          {locked ? (
            <p className="typing-lock">
              <span className="typing-lock-word">
                <strong>{locked.word.slice(0, view.typed.length)}</strong>
                {locked.word.slice(view.typed.length)}
              </span>
              <span className="typing-lock-meaning">{locked.meaningVi}</span>
            </p>
          ) : (
            <p className="typing-lock typing-lock--idle">Gõ chữ cái đầu của từ đang rơi để khoá mục tiêu.</p>
          )}
        </div>

        <button
          type="button"
          className="ghost-button"
          onClick={togglePause}
          disabled={view.status === 'ready' || view.status === 'over'}
        >
          {view.status === 'paused' ? 'Chơi tiếp' : 'Tạm dừng'}
        </button>
      </div>
    </div>
  );
}
