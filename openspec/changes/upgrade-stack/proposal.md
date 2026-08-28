# Proposal: upgrade-stack

## Why

The fork inherited DummySheet's 2023-era toolchain (Svelte 3, Vite 4,
TypeScript 5.0, Owlbear Rodeo SDK 1.x); every major dependency is two to
four majors behind. Right now — before any Legend in the Mists work is
written and while the codebase is still verbatim upstream — is the
cheapest possible moment to modernize: there is no custom code to port.
A second motivation: `npm run check` currently fails with 5 pre-existing
upstream errors, leaving a first-time Svelte maintainer without a working
compiler gate.

## What Changes

- **BREAKING (build tooling only):** bump every dependency to its latest
  version — svelte 3.59.1 → 5.56.10, vite 4.3.9 → 8.2.2,
  @sveltejs/vite-plugin-svelte 2.4.1 → 7.3.0, svelte-check 2.10.3 → 4.7.6,
  typescript 5.1.3 → 6.0.3, @tsconfig/svelte 4.0.1 → 5.0.8,
  sass 1.62.1 → 1.103.1, tslib 2.5.3 → 2.8.1,
  @owlbear-rodeo/sdk 1.3.8 → 3.1.0. Latest-everything is a deliberate
  user decision; suspected incompatibilities are accepted as findings to
  fix, not reasons to pin. **One deviation landed:** TypeScript went to
  6.0.3, not the latest 7.0.2, because svelte-check@4.7.6 declares a hard
  peer ceiling of `typescript@^5.0.0 || ^6.0.0`. 6.0.3 is the newest
  release line svelte-check accepts (see design.md — Risks).
- Migrate all 19 Svelte components from legacy syntax (`export let`,
  `$:` reactivity, slots) to Svelte 5 runes (`$props`, `$derived`,
  `$effect`, snippets) — new syntax for everything, per user decision.
- Adapt `src/services/OBRHelper.ts` to Owlbear Rodeo SDK 3 where API
  signatures changed.
- Update `tsconfig*.json`, `svelte.config.js`, `vite.config.ts` for the
  new toolchain.
- Fix all fallout until `npm run check`, `npm run build`, and
  `npm run dev` are green; the 5 baseline check errors are expected to
  be resolved or reclassified by the migration.
- Update docs to match reality: README LLM-use disclosure (AI touched
  application code during this migration), AGENTS.md and
  `openspec/config.yaml` tech-stack lines, and strike the baseline-errors
  entry in TODOS-HUMAN.md.
- Out of scope: any behavior change, any LitM content or reseeding,
  localStorage key renames, visual changes. The app must behave exactly
  as upstream does today.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none)

This is a pure tooling/refactor change with no spec-level behavior
change; the change opts out of specs via `skip_specs: true` in
`.openspec.yaml`.

## Impact

- **Dependencies:** `package.json`, `package-lock.json` (committed).
- **Config:** `tsconfig.json`, `tsconfig.node.json`, `svelte.config.js`,
  `vite.config.ts`.
- **Application code (syntax migration only):** all of
  `src/components/*.svelte` (18 files), `src/App.svelte`,
  `src/stores.ts`, `src/localStore.ts`, `src/services/OBRHelper.ts`,
  `src/types/`.
- **Docs:** `README.md` (LLM-use disclosure), `AGENTS.md` (tech stack
  line), `openspec/config.yaml` (context block), `TODOS-HUMAN.md`
  (strike baseline-errors entry).
- **Runtime risk:** OBR SDK 1 → 3 breaking changes; dev-server behavior
  under Vite 8; TS 7 × svelte-check compatibility.
