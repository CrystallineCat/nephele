# TODOS-HUMAN

Open decisions and deferred questions for the human to pick up between
experiment phases. AI sessions maintain this file (see AGENTS.md).

## Now

- **Change 2: OR theming (name TBD at proposal time).** CSS custom
  properties + bridge module on `OBR.theme.getTheme()`/`onChange`,
  gated on `OBR.isAvailable`; `color-mix` for the opacity decorations.
  Fixes the white-on-white local preview without touching the
  transparent OR background. Sequenced after clean-up so the theming
  diff stays readable.

## Parked

- **Editing architecture.** Deliberately different from DummySheet's
  Editable model; not designed yet. Seed edits in `sheet.svelte.ts`
  suffice for the current phase.
- **Persistence.** After clean-up + theming are complete. Wants clean
  architecture (OBR room metadata vs localStorage), not a revival of
  the deleted `localStore.ts`.

## Resolved

- ~~**Identity: system-agnostic vs LitM.**~~ Deliberately Legend in
  the Mist, decided 2026-08-31. AGENTS.md, openspec/config.yaml, and
  manifest.json updated to say so; the old "keep it system-agnostic"
  convention is removed.
- ~~**License: MIT vs CC0.**~~ MIT, decided 2026-08-31. Lands as
  `LICENSE` in the `clean-up` change (task 6.4).
- ~~**Change 1: clean-up.**~~ Proposed, planned, and implemented
  2026-08-31 (`openspec/changes/clean-up`): dead edit pipeline removed,
  orphan deps dropped, types folded into `sheet.svelte.ts`, Lucide
  icons, minimal README, MIT LICENSE.
- ~~**Icon set.**~~ `@lucide/svelte` for in-sheet glyphs (🔥 → `Flame`);
  `venetian-mask` from `lucide-static` as `public/icon.svg`, copied
  verbatim — no hand-created art. Decided 2026-08-31.
- ~~**Baseline svelte-check errors.**~~ Resolved by the `upgrade-stack`
  change (2026-08-28): the Svelte 3 → 5 runes migration + svelte-check
  2 → 4 cleared all 5 upstream errors. `npm run check` is now green
  (0 errors, 0 warnings), so the check gate is trustworthy going forward.
