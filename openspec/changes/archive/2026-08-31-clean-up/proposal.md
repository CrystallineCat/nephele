# Proposal: clean-up

## Why

Two problems, one change:

1. **Rampage debris.** The simplification pass after the Svelte 5
   migration deleted the old DummySheet feature set but left dead code
   behind: an edit pipeline that can never activate, an orphaned
   component with broken styling, and dependencies nothing imports.
   This debris obscures the current architecture and invites wrong
   assumptions in future work.
2. **Licensing.** DummySheet (upstream) carries no license, which
   means all rights reserved: no upstream expression may remain in
   Nephele before the project can be published under MIT or CC0. A
   small, countable set of upstream-shaped remnants survives today
   (`Editable.svelte`, `Toggle.svelte`, parts of `Sheet.svelte`, the
   type file's shape, `icon.svg`, `hero.png`, README prose).

Removing the debris and the remnants is the same work. After this
change, no upstream expression remains and the project ships under
MIT (decided 2026-08-31).

## What Changes

- **Remove the dead edit pipeline.** Delete `Editable.svelte` and
  `Toggle.svelte` (imported but never rendered; its CSS references
  theme variables that no longer exist). Remove the `isEditing` state
  and prop drilling from `Sheet.svelte`/`ThemeCard.svelte`; sheet name
  and quest render as plain text, exactly as they already do today
  (the edit branch is unreachable — nothing ever sets `isEditing`).
- **Remove orphan dependencies.** `file-saver` + `@types/file-saver`
  (the export UI was deleted), `sass` (no `.scss` files exist).
- **Fold `src/types/` away.** Move the sheet types into
  `src/sheet.svelte.ts`, the state module that owns them; delete the
  one-file `types/` directory.
- **Replace emoji glyphs with SVG icons.** The 🔥 scratch button (and
  the `Noto Emoji` webfont it needs) give way to `@lucide/svelte`
  components (Svelte 5-native, ISC license). Unicode counter glyphs
  (⟨ ⏺ ⟩) stay — they are plain text, not emoji-font-dependent.
- **Replace `public/icon.svg`** (the upstream "D" logo) with Lucide's
  `venetian-mask` icon, copied verbatim from the `lucide-static`
  package — no hand-created art; **delete `public/hero.png`** (245 KB
  upstream store art; `store.md` that referenced it is already gone).
- **Rewrite `README.md` minimal.** Drop the DummySheet "How to use"
  prose (it describes deleted features); keep a one-paragraph project
  statement and the LLM-use disclosure (with bumped review date).
- **Add an MIT `LICENSE` file** — the license decision is made; the
  change is incomplete without it, since relicensing is the point.

No user-facing behavior changes: the sheet renders and behaves
identically (edit mode was already unreachable). Not in scope: OR
theme wiring (next change), persistence, editing architecture
(both parked in `TODOS-HUMAN.md`).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none)

This change is pure removal/hygiene with no spec-level behavior
change, so no capabilities are declared. The change opts out of specs
via `skip_specs: true` in `.openspec.yaml`.

## Impact

- **Code:** `src/components/{Editable,Toggle}.svelte` deleted;
  `Sheet.svelte` and `ThemeCard.svelte` simplified; `src/types/`
  removed; `src/sheet.svelte.ts` gains the type exports;
  `src/App.svelte` loses the `Noto Emoji` font import.
- **Dependencies:** removed: `file-saver`, `@types/file-saver`,
  `sass`; added: `@lucide/svelte`.
- **Assets:** `public/icon.svg` replaced; `public/hero.png` deleted.
- **Docs/config:** `README.md` rewritten; `LICENSE` added;
  `TODOS-HUMAN.md` entries struck; `public/manifest.json` description
  revisited (currently says "Legend in the Mist character sheet" while
  the project convention is system-agnostic).
- **Verification:** `npm run check` and `npm run build` must pass
  clean; visual smoke test in `npm run dev` and in Owlbear Rodeo.
