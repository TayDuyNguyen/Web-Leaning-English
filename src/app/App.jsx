import { useCallback, useEffect, useMemo, useState } from 'react';

import Arena from './Arena.jsx';
import Lobby from './Lobby.jsx';
import { levelForXp } from '../core/scoring.js';
import { findGame, registeredGames } from '../core/registry.js';
import { randomSeed } from '../core/rng.js';
import { emptyProfile } from '../player/reducer.js';
import { createPlayerStore, loadSession } from '../player/index.js';
import { hashForRoute, LOBBY, parseRoute } from './hashRoute.js';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const [level, setLevel] = useState('A1');
  const [profile, setProfile] = useState(emptyProfile);
  const [seed, setSeed] = useState(0);

  const { store, source } = useMemo(
    () => createPlayerStore({ env: import.meta.env, storage: window.localStorage, session }),
    [session]
  );

  useEffect(() => {
    let cancelled = false;
    loadSession(import.meta.env)
      .then((current) => {
        if (!cancelled) setSession(current ?? null);
      })
      .catch(() => {
        if (!cancelled) setSession(null);
      })
      .finally(() => {
        if (!cancelled) setAuthReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!authReady) return;
    let cancelled = false;
    store
      .read()
      .then((next) => {
        if (!cancelled) setProfile(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [authReady, store]);

  const navigate = useCallback((next) => {
    const hash = hashForRoute(next);
    if (window.location.hash === hash) setRoute(next);
    else window.location.hash = hash;
  }, []);

  // The seed is drawn here, in the handlers, rather than inside Arena's render:
  // React's purity rule rejects Math.random during render, and owning it at the
  // router means a replayed round is always addressable from the URL plus seed.
  const startGame = useCallback(
    (game, difficulty) => {
      setSeed(randomSeed());
      navigate({ view: 'play', game: game.id, difficulty: difficulty.id });
    },
    [navigate]
  );

  const replay = useCallback(() => setSeed(randomSeed()), []);

  // The store returns the profile it just wrote, so the header and lobby follow the
  // round immediately. Re-reading only on mount left "0 XP" on screen after a scored
  // round until the player reloaded.
  const finishRound = useCallback(
    (result) =>
      store.record(result, todayIso()).then((next) => {
        setProfile(next);
        return next;
      }),
    [store]
  );

  const playing = route.view === 'play' ? findGame(route.game) : null;
  const progress = levelForXp(profile.xp);

  return (
    <div className="app-shell">
      <header className="app-header">
        <button type="button" className="brand" onClick={() => navigate(LOBBY)}>
          Grammax
        </button>
        <div className="header-meta">
          <span className={`save-badge save-badge--${source}`}>
            {source === 'cloud' ? 'Đồng bộ cloud' : source === 'local-signed-out' ? 'Chưa đăng nhập' : 'Lưu cục bộ'}
          </span>
          <span className="header-stat">Cấp {progress.level}</span>
          <span className="header-stat">{profile.xp} XP</span>
          <span className="header-stat">Chuỗi {profile.streak}</span>
        </div>
      </header>

      <main className="app-main">
        {playing ? (
          <Arena
            key={`${playing.manifest.id}:${route.difficulty}:${seed}`}
            game={playing}
            level={level}
            difficultyId={route.difficulty}
            seed={seed}
            onNavigate={navigate}
            onRestart={replay}
            onFinish={finishRound}
          />
        ) : (
          <Lobby
            games={registeredGames}
            level={level}
            onChangeLevel={setLevel}
            profile={profile}
            authReady={authReady}
            onStart={startGame}
          />
        )}
      </main>
    </div>
  );
}
