---
version: alpha
name: Grammax Editorial Monochrome
description: >
  The Awwwards Swiss/editorial system (see DESIGN.md in auto_scroll_demo, measured
  2026-10-02) re-cut for a language-learning game. Near-black ink on a warm light-grey
  canvas, one hot-orange signal colour, oversized uppercase display type against
  light-weight body copy, flat tonal layering and an 8px rhythm. One hue is added to the
  source system and the reason is recorded under "The one deviation".
colors:
  # --- Ink & semantic roles ---
  primary: "#222222"
  on-primary: "#FFFFFF"
  signal: "#FA5D29"
  on-signal: "#FFFFFF"
  # --- Feedback (see "The one deviation") ---
  correct: "#1F6F43"
  on-correct: "#FFFFFF"
  incorrect: "#FA5D29"
  # --- Surfaces ---
  background: "#F8F8F8"
  on-background: "#222222"
  surface: "#FFFFFF"
  on-surface: "#222222"
  surface-dim: "#EDEDED"
  surface-container-low: "#F8F8F8"
  surface-container: "#EDEDED"
  surface-container-high: "#E9E9E9"
  on-surface-variant: "#A7A7A7"
  inverse-surface: "#222222"
  inverse-on-surface: "#FFFFFF"
  # --- Lines ---
  outline: "#EDEDED"
  outline-variant: "#DEDEDE"
  # --- CEFR level tints: each ships as a saturated chip + a soft wash ---
  level-a1: "#FFF083"
  level-a1-soft: "#FFF9D0"
  level-a2: "#AAEEC4"
  level-a2-soft: "#E2F4E9"
  level-b1: "#74BCFF"
  level-b1-soft: "#B4D7F8"
  level-b2: "#C0AB3C"
  level-b2-soft: "#DBD6C0"
  level-c1: "#502BD8"
  level-c1-soft: "#917EDA"
typography:
  font-family-base: "Inter Tight"
  display-caps-size: "56px"
  display-caps-weight: "600"
  display-caps-tracking: "-0.02em"
  headline-lg-size: "28px"
  headline-md-size: "18px"
  body-lg-size: "22px"
  body-md-size: "16px"
  body-md-weight: "300"
  body-md-leading: "1.75"
  body-sm-size: "14px"
  body-sm-weight: "300"
  body-sm-leading: "2.0"
  label-caps-size: "11px"
  label-caps-tracking: "0.08em"
  timer-size: "40px"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "14px"
  xl: "16px"
  pill: "72px"
  full: "9999px"
spacing:
  base: "8px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
  gutter: "20px"
  container-padding: "24px"
  input-padding: "16px"
  control-height: "48px"
  control-height-sm: "42px"
  header-height: "71px"
  grid-max-width: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-signal}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
  button-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
  chip-level:
    backgroundColor: "{colors.level-a1}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
  game-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.container-padding}"
  option-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.outline}"
    padding: "12px 16px"
  option-tile-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  option-tile-correct:
    backgroundColor: "{colors.correct}"
    textColor: "{colors.on-correct}"
  option-tile-incorrect:
    backgroundColor: "{colors.incorrect}"
    textColor: "{colors.on-signal}"
  control-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
    padding: "0 24px"
    border: "1px solid {colors.outline}"
  toggle-review:
    backgroundColor: "{colors.outline-variant}"
    rounded: "{rounded.pill}"
    height: "40px"
    width: "80px"
  toggle-review-active:
    backgroundColor: "{colors.primary}"
  result-panel:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.container-padding}"
  xp-bar-track:
    backgroundColor: "{colors.surface-dim}"
    rounded: "{rounded.full}"
    height: "8px"
  xp-bar-fill:
    backgroundColor: "{colors.primary}"
  nav-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    height: "{spacing.header-height}"
    padding: "0 24px"
  list-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "0 24px"
  list-row-hover:
    backgroundColor: "{colors.surface-dim}"
---

# DESIGN.md — Grammax Editorial Monochrome

Derived from `DESIGN.md` in `D:/project-flutter/auto_scroll_demo` (Awwwards Editorial
Monochrome, measured from awwwards.com on 2026-10-02). The neutral core, type scale, shape
language, spacing rhythm and elevation model are carried over unchanged. What changed is the
category axis and the feedback layer, because this product is a game rather than a gallery.

**This file is machine-checked.** `test/design-tokens.test.js` parses the frontmatter and
asserts every `colors`, `rounded` and `spacing` token exists in `src/app/styles.css` with the
identical value. Editing a hex here without editing the CSS fails CI.

## Brand & style

An editorial gallery aesthetic applied to a learning product: the interface stays quiet so the
words carry it. Monochrome Swiss modernism — ink `#222222` on warm paper `#F8F8F8`, one hot
orange, nothing else. Hierarchy comes from **scale and weight contrast**, never from colour.

The signature pairing is an enormous uppercase display heading at tight leading against 14px
light-weight body copy at 2.0 leading. That shout-and-whisper tension is what keeps a game UI
reading as designed rather than as a bootstrap template.

For a learning app the payoff is attention: a quiz screen in this system has exactly one
visually loud thing — the word being tested.

## The one deviation

The source system permits no hue outside the neutral core plus signal orange, and it uses that
orange as its **error** colour. A quiz cannot work like that: right and wrong have to be told
apart in well under a second, and "correct" rendered in ink is indistinguishable from neutral
rest state.

So one hue is added:

- **`correct: #1F6F43`** — a green dark enough to carry white text. Measured 6.2:1 on
  `surface`, 5.8:1 on `background`, so it passes WCAG AA as a foreground, not just as a fill.
- **`incorrect` is deliberately the same value as `signal`** (`#FA5D29`). Wrong answers *are*
  the urgent state of a trainer, and reusing the one existing accent keeps the palette at two
  hues instead of three.

That is the whole deviation: one added green, one alias. Everything else stays monochrome.

## Colours

- **Primary `#222222`** — ink for all text and the fill of the primary button. Never `#000000`.
- **Signal `#FA5D29`** — one per screen. Reserved for the most consequential action and for
  wrong answers. Never a large fill.
- **Background `#F8F8F8`** — the page canvas. Warm-light rather than white so white cards
  visibly float.
- **Surface `#FFFFFF`** — card and input fill. White is a *content* colour here.
- **Surface dim `#EDEDED`** — recessed wells, dividers, row hover.
- **Inverse surface `#222222`** — the result panel. A finished round is the one moment the app
  is allowed to go dark and shout.
- **On-surface-variant `#A7A7A7`** — metadata only, at 18px+ or on non-essential text. It
  fails AA on the canvas at body size.

### CEFR level tints

The source system tagged content categories with saturated/soft pairs. Here the category axis
is the learner's level, so the tints map to CEFR:

| Level | Chip | Wash |
| --- | --- | --- |
| A1 | `#FFF083` | `#FFF9D0` |
| A2 | `#AAEEC4` | `#E2F4E9` |
| B1 | `#74BCFF` | `#B4D7F8` |
| B2 | `#C0AB3C` | `#DBD6C0` |
| C1 | `#502BD8` | `#917EDA` |

The source's Connect tint (`#FF602C`) is **not used** — it is too close to signal orange to sit
in the same interface without confusion. Text on every tint is ink, with the single exception
of the C1 chip where `#502BD8` is dark enough that only white passes.

A chip from one level never sits on the wash of another.

## Typography

One family, **Inter Tight**, no secondary face, no serif, no italic display. All variation is
size and weight.

- **Display** 56px/600 uppercase, `lineHeight: 1.0`, tracking `-0.02em`. Section banners only.
- **Headlines** 28px and 18px at 600. Card and panel titles.
- **Body** weight **300** — the defining risk of the system. 14–16px at 1.75–2.0 leading.
  Never raise body to 400+; it destroys the contrast that makes the display type read.
- **Timer** 40px, tabular numerals, so the countdown does not jitter horizontally each second.
- A single screen uses at most two weights.

## Layout & spacing

An 8px base unit governs everything: `4 / 8 / 16 / 24 / 40 / 64`. Gutter is **20px**,
deliberately off the grid — the one exception, giving card grids a tighter print-like gap.
Container padding 24px, input padding 16px. Header rail 71px. Content column caps at 1280px.

Content is left-aligned and ragged-right. Nothing is centre-stacked except the result panel's
score.

## Elevation & depth

Tonal layering, not shadow. There are no drop shadows in this system.

1. Canvas `#F8F8F8`
2. Well `#EDEDED` (recessed) — and `#222222` for the result panel
3. Card `#FFFFFF`
4. Control — ink-filled buttons read as the topmost layer
5. Scrim `rgba(0, 0, 0, 0.7)`

Separation uses hairline borders (`#EDEDED`/`#DEDEDE`), not blur. If you need elevation, add
contrast, not shadow.

## Shapes

Controls are 8px; containers are 0 or 14px. Never mix rounded and square corners inside one
component, never round a layout panel to 8px, never put a pill button in a square container.

`72px` is the pill radius for the review toggle; `9999px` for avatars and the XP bar.

## Components

**Buttons.** Primary is a solid ink rectangle, 48px tall, 8px radius, `0 24px` padding, white
14px/500 label. Hover **inverts fully** to white fill with ink text — a hard flip, not a
darken. That inversion is the brand's signature interaction.

**Option tiles** (fill-blank, word-quiz, word-match) are white with a hairline border at 8px
radius. Selected inverts to ink. After grading, the chosen tile goes `correct` green or
`incorrect` orange and the tile that *should* have been picked is outlined in green. Feedback
is a fill change, never a shake, glow or animation-heavy transition.

**Level chips** are the only place a tint appears as a fill: 4px/12px padding, ink text, 8px
radius.

**Game cards** are white at 14px radius with 24px padding on the grey canvas, carrying the game
name as an 18px headline and its summary in 14px light body.

**The result panel inverts**: `#222222` fill, white copy, score at 56px. A finished round is the
one dark, loud moment in the session. The **review list inside it is a white card**, not white
text on ink — `correct` green on `#222222` measures 2.6:1 and fails, while on white it reaches
6.2:1. The ✓/✗ marks are set at 24px so the orange ✗ clears the 3:1 large-text threshold; at
body size orange on white is only 3.15:1 and would fail AA.

Three of these rules are machine-enforced, not just written down:
`test/design-tokens.test.js` fails if a CEFR tint is used anywhere but a level chip, if
`correct` green appears outside the review list, or if signal orange is used as a background
fill. A palette decays one convenient reuse at a time.

**Rows** (weak-word list) are square, 14px light, `0 24px` padding, hairline dividers, hover
fills `#EDEDED`.

**The review toggle** is an 80×40px pill. Off is `#DEDEDE`, on is ink — colour does not mean
active here, darkness does.

## Do's and don'ts

- Do keep the canvas `#F8F8F8` and reserve white for content surfaces.
- Do use `#FA5D29` for exactly one primary action or alert per screen.
- Do set body copy in Inter Tight **300** at 2.0 leading.
- Do invert buttons on hover rather than darkening them.
- Do build hierarchy from size and tonal layer, never from shadow or gradient.
- Do reserve `correct` green for a graded right answer and nothing else — not links, not
  decoration, not "success" banners.
- Do use level tints for chips and washes only, ink text on both, never as a button fill.
- Don't introduce a second typeface, a serif, or an italic display treatment.
- Don't use more than two font weights on one screen.
- Don't mix 8px+ and 0px corners inside one component.
- Don't add drop shadows — add contrast or a hairline.
- Don't render ink as `#000000`.
- Don't use the Connect orange tint; it collides with the signal colour.
- Don't animate right/wrong feedback with shakes or glows; change the fill.
- Do maintain WCAG AA (4.5:1 body, 3:1 large). `#A7A7A7` on `#F8F8F8` fails at body size —
  18px+ or non-essential metadata only.
