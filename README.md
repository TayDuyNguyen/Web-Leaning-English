# GrammaX

**Luyện TOEIC thông minh** — a Vietnamese-language English grammar and vocabulary trainer built with React + Vite. Lessons, drills and three arcade-style game modes, with progress that syncs to Supabase when you sign in and falls back to `localStorage` when you don't.

![CI](https://github.com/TayDuyNguyen/Web-Leaning-English/actions/workflows/ci.yml/badge.svg)

---

## What it does

| Area | Detail |
| --- | --- |
| **Chuyên đề (topics)** | 30 grammar topics are catalogued across 6 categories — verbs, sentence structures, parts of speech, clauses, vocabulary, review. **Only 2 currently have lesson content** (see Known limitations). Each populated topic has theory sections plus graded exercises; Chuyên đề 1 has 12 theory sections and 21 exercises. |
| **Tốc độ ngữ pháp** (`TenseRush`) | Timed multiple choice. Hearts, combo multiplier, per-question explanations. |
| **Xây câu** (`SentenceBuilder`) | Reorder word tiles into a grammatically correct sentence from a Vietnamese prompt. |
| **Đấu từ vựng** (`VocabBattle`) | Vocabulary duel over a word pack. Needs at least 4 valid words. |
| **Quản lý dữ liệu** (`DataManager`) | Create, rename, duplicate and delete your own question packs for all three game modes. |
| **Cloud sync** | Optional. Sign in and profile, scores and packs move to Supabase under row-level security. |

---

## Prerequisites

**Node.js `^20.19.0`, `^22.13.0`, or `>=24.0.0`** — enforced via `engines` in `package.json`.

Node 23 is deliberately excluded: ESLint 10 does not support it. Node 22.12 and below also fail, despite satisfying Vite.

npm ships with Node, so nothing else is required.

---

## Quick start

```bash
npm install     # or `npm ci` for a reproducible install from the lockfile
npm run dev     # http://localhost:5173
```

**That's it — no `.env` needed.** See the next section.

---

## Running without Supabase (local-only mode)

The app is **local-first by default**. With no `.env` file present:

- every screen renders and every game is playable
- theme, XP, scores and custom packs persist to `localStorage`
- the header shows **"Đang lưu cục bộ"**
- the sign-in dialog shows *"Supabase chưa được cấu hình…"* and cloud sync is skipped

The only console output is one warning:

```
Supabase URL hoặc khóa công khai chưa được cấu hình đúng trong file .env.
```

This is a supported configuration, not a degraded state.

---

## Enabling cloud sync

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql). It is idempotent — safe to re-run after the file changes.
3. Copy the example env file and fill in real values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Where to find it |
   | --- | --- |
   | `VITE_SUPABASE_URL` | Project Settings → Data API |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Project Settings → API Keys → Publishable key |

4. Restart `npm run dev`. Vite inlines `VITE_*` values at build time, so a change requires a restart (and a redeploy in production).

Validation lives in [`src/lib/supabaseConfig.js`](src/lib/supabaseConfig.js). Placeholder-looking values are rejected, so copying `.env.example` verbatim keeps you in local-only mode rather than pointing the app at a nonexistent project.

> **Never** put the `service_role` key or any database password in a `VITE_*` variable — they compile into the public bundle.

---

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint over `src`, `test` and `scripts` |
| `npm test` | Node's built-in test runner — no test framework installed |
| `npm run size` | Bundle report with budget checks (report-only; add `-- --strict` to enforce) |
| `npm run seed:content` | Regenerate `supabase/seed/content.sql` from `src/data/` |
| `npm run seed:check` | Fail if that artifact has drifted from the source data |
| `npm run smoke:ui` | Browser smoke over Chrome DevTools Protocol — needs `npm run build && npm run preview` first |

---

## Project structure

```
setup/
├── .github/workflows/ci.yml   lint + test + seed:check + build + size on Node 22 and 24
├── docs/
│   └── product-roadmap.md     roadmap, pre-deployment gates, risk register
├── scripts/
│   ├── bundle-size.mjs        budget reporter
│   ├── seed-content.mjs       src/data → supabase/seed/content.sql generator
│   └── smoke-ui.mjs           browser smoke (CDP, no test-runner dependency)
├── src/
│   ├── main.jsx               entry — mounts <AuthProvider><App/></AuthProvider>
│   ├── App.jsx                composition only — wires the hooks below into the layout
│   ├── index.css              the entire design system (~3,300 lines)
│   ├── components/            Header, Footer, AuthModal, CustomSelect
│   ├── contexts/              AuthContext (session, sign-in/up/out) + auth-context.js
│   ├── hooks/
│   │   ├── useAuth.js             context accessor
│   │   ├── useHashRouting.js      dashboard / arena / topic view + back-forward
│   │   ├── useTheme.js            theme state, `<html class="dark">`, persistence
│   │   ├── useTopicScores.js      per-topic exercise results + persistence
│   │   ├── useQuitGuard.js        Vocab Battle quit lock
│   │   └── useCloudHydration.js   pull profile/scores from Supabase, offer local migration
│   ├── lib/
│   │   ├── supabaseClient.js  createClient + configured flag
│   │   ├── supabaseConfig.js  pure credential validation (unit tested)
│   │   ├── routes.js          pure hash-route parsing + push-vs-replace writes
│   │   ├── contentSchema.js   pure topic ↔ row mapping (seeder + browser share it)
│   │   ├── contentSource.js   content seam: Supabase first, bundle as fallback
│   │   └── userStorage.js     local-first storage abstraction over both backends
│   ├── pages/                 Dashboard, TopicStudy, GameArena
│   ├── game-engines/          TenseRush, SentenceBuilder, VocabBattle,
│   │                          GameLobby, DataManager + pure rules/sanitiser modules
│   └── data/                  topic catalogue + bundled fallback content
├── supabase/
│   ├── schema.sql             8 tables, all RLS-scoped to the owning user
│   ├── migrations/            content tables (Phase 1)
│   └── seed/content.sql       generated lesson content — do not hand-edit
└── test/                      *.test.js, run by `npm test`
```

The pure logic is deliberately separated from React — `gameRules.js`, `gameDataUtils.js`, `gamePackUtils.js` and `contentSchema.js` import no React and touch no DOM or `window`. That is what makes them testable under `node --test`, and in `contentSchema.js`'s case what lets the Node seeder and the browser share one definition of a topic.

---

## Routing

Hash-based, with no router library. Parsing and URL writing are pure functions in `src/lib/routes.js`, driven by `src/hooks/useHashRouting.js` for the view level; each view owns its own sub-route. Navigation pushes a history entry, while normalising the address to a view already on screen replaces it — so browser back undoes real navigations only.

| URL | Screen |
| --- | --- |
| `#` or `#topics` | Dashboard — topic grid |
| `#topic-<topicId>` | Topic study, first section |
| `#topic-<topicId>/theory-<n>` | Specific theory section |
| `#topic-<topicId>/exercise-<n>` | Specific exercise |
| `#game` | Game lobby |
| `#game/rush` | Tốc độ ngữ pháp |
| `#game/scramble` | Xây câu |
| `#game/battle` | Đấu từ vựng |

Back and forward work. Leaving the lobby mid-**Vocab Battle** asks for confirmation first — that quit lock is set only by `VocabBattle.jsx`; the other two game modes navigate away freely.

---

## Testing

```bash
npm test
```

53 tests, no framework — Node's built-in runner against `test/**/*.test.js`. Coverage is logic-only: quiz resolution, combo and heart rules, sentence tokenising, pack sanitisation, data normalisation, topic ↔ row content mapping and the generated seed artifact, hash-route parsing and URL-write intent, and Supabase credential validation. On top of that, `npm run smoke:ui` drives a real headless Chrome over CDP (12 checks: deep links, back-button intent, lazy content chunks, answer scoring and persistence) — the browser half of the testing story until component/e2e tests land in Phase 4.

---

## Known limitations

- **28 of the 30 catalogued topics have no lesson content.** `src/data/content-modules.js` declares content for only two topics — `chuyen-de-thi-dong-tu` and `su-phoi-thi`. The dashboard still advertises all 30 with exercise counts, so clicking e.g. "Câu Bị Động — 0/12 Bài tập" lands on *"Không tìm thấy dữ liệu chuyên đề này."* It degrades cleanly (no console errors), but the catalogue over-promises: **24 of the advertised 271 exercises are reachable.**
- **Lesson content still ships in the bundle until a Supabase project exists.** Phase 1 built the way out — content tables (`supabase/migrations/`), a generated seed (`supabase/seed/content.sql`), and `src/lib/contentSource.js` which reads from Supabase when configured and falls back to the bundle otherwise. The bundled content is now in per-topic lazy chunks rather than the entry chunk (first-load JS: 147.94 kB gzip), but **nothing is applied to a live database yet**, so editing a lesson without a redeploy is still not possible in practice.
- **`src/data/default-vocab.js` is empty**, so the default vocabulary pack contains 0 words and Vocab Battle is unplayable until you create a pack in DataManager.
- **Nothing is deployed.** There is no production environment yet; CI only builds and reports.
- **Arena guard reverts still add history entries.** When a game is started without enough content, `GameArena.jsx` bounces the address back to `#game` by assigning `location.hash`, which pushes rather than replaces — so pressing back after a bounce replays it. The dashboard and topic views are handled correctly by `useHashRouting`.
- **Progress is stored as an opaque JSON blob** (`topic_scores.scores_data`), so per-question analytics and an error notebook are not yet queryable. See **Phase 2**.

Full plan, pre-deployment gates and risk register: **[docs/product-roadmap.md](docs/product-roadmap.md)**.

---

## License

Not specified.
