import { LEVELS } from '../core/contentSchema.js';
import { poolFor, vocabulary } from '../content/index.js';
import { progress as progressOf, weakestWords } from '../player/reducer.js';

const wordById = new Map(vocabulary.map((item) => [item.id, item]));

function LevelPicker({ level, onChangeLevel }) {
  // A level with no content is offered but marked, not hidden — hiding it makes the
  // app look broken on A2 when the truth is "nobody has written A2 words yet".
  const counts = Object.fromEntries(LEVELS.map((entry) => [entry, vocabulary.filter((item) => item.level === entry).length]));
  const anyEmpty = LEVELS.some((entry) => counts[entry] === 0);

  return (
    <div className="level-picker">
      {LEVELS.map((entry) => (
        <button
          key={entry}
          type="button"
          className={`level-chip${level === entry ? ' is-active' : ''}`}
          onClick={() => onChangeLevel(entry)}
        >
          {entry}
          {counts[entry] === 0 && anyEmpty ? <span className="level-empty"> · chưa có</span> : null}
        </button>
      ))}
    </div>
  );
}

function GameCard({ game, level, onStart }) {
  const pool = poolFor({ contentTypes: game.contentTypes, level });

  return (
    <article className="game-card">
      <h3 className="game-card-title">{game.name}</h3>
      <p className="game-card-summary">{game.summary}</p>
      <p className="game-card-tags">
        {game.skills.map((skill) => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </p>
      <div className="difficulty-row">
        {game.difficulties.map((difficulty) => {
          const blocked = pool.length < difficulty.minItems;
          return (
            <button
              key={difficulty.id}
              type="button"
              className="difficulty-button"
              disabled={blocked}
              title={blocked ? `Cần ${difficulty.minItems} từ, mức ${level} mới có ${pool.length}` : undefined}
              onClick={() => onStart(game, difficulty)}
            >
              {difficulty.label}
              <span className="difficulty-meta">
                {difficulty.seconds > 0 ? `${difficulty.seconds}s` : 'không giới hạn'}
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default function Lobby({ games, level, onChangeLevel, profile, authReady, weakCount, reviewMode, onToggleReview, onStart }) {
  const stats = progressOf(profile);
  const weak = weakestWords(profile, 8).map((entry) => ({ ...entry, word: wordById.get(entry.wordId)?.word ?? entry.wordId }));

  return (
    <div className="lobby">
      <section className="profile-card">
        <div>
          <p className="profile-level">Cấp {stats.level}</p>
          <p className="profile-xp">{stats.xpIntoLevel} / {stats.xpForNextLevel} XP</p>
          <div className="xp-bar"><div className="xp-fill" style={{ width: `${Math.min(100, (stats.xpIntoLevel / stats.xpForNextLevel) * 100)}%` }} /></div>
        </div>
        <dl className="profile-stats">
          <div><dt>Chuỗi ngày</dt><dd>{profile.streak}</dd></div>
          <div><dt>Ván đã chơi</dt><dd>{stats.gamesPlayed}</dd></div>
          <div><dt>Từ đã gặp</dt><dd>{Object.keys(profile.mastery).length}</dd></div>
        </dl>
        {!authReady ? <p className="hint">Đang kiểm tra tài khoản…</p> : null}
      </section>

      <section>
        <h2 className="section-title">Trình độ từ vựng</h2>
        <LevelPicker level={level} onChangeLevel={onChangeLevel} />
      </section>

      <section>
        <h2 className="section-title">Game</h2>
        {reviewMode ? (
          <p className="review-banner">
            Đang bật <strong>Ôn tập</strong>: mỗi ván chỉ rút từ {weakCount} từ bạn hay sai nhất{weakCount < 4 ? ' (được bồi thêm từ mới để đủ số câu)' : ''}.
          </p>
        ) : null}
        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} level={level} onStart={onStart} />
          ))}
        </div>
      </section>

      {weak.length > 0 ? (
        <section>
          <h2 className="section-title">Từ bạn hay sai</h2>
          <button type="button" className={`difficulty-button${reviewMode ? ' is-active' : ''}`} onClick={() => onToggleReview(!reviewMode)}>
            {reviewMode ? 'Tắt ôn tập' : 'Ôn tập 12 từ yếu'}
          </button>
          <ul className="weak-list">
            {weak.map((entry) => (
              <li key={entry.wordId}>
                <strong>{entry.word}</strong> — sai {entry.wrong}/{entry.total} lần
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
