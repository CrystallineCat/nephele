# Design: upgrade-stack

## Context

Current state is verbatim upstream DummySheet (see proposal.md — Why).
Environment: Node v25.9.0, npm 11.12.1 — satisfies Vite 8's floor, no
runtime blocker. `package-lock.json` is committed, so the upgrade is a
single atomic dependency move. Project gate that must end green:
`npm run check` (currently red with 5 upstream errors), plus
`npm run build` and a dev-server smoke test.

## Goals / Non-Goals

**Goals:**

- Every dependency at its latest published version.
- All Svelte components on idiomatic Svelte 5 runes syntax.
- `npm run check` 0 errors / 0 warnings; `npm run build` green; dev
  server boots and serves transformed modules.
- App behaves exactly as upstream does today (no functional delta).

**Non-Goals:**

- No state-management re-architecture: `svelte/store` +
  `localStore.ts` stay (see Decisions).
- No LitM content, reseeding, rebranding, or localStorage key changes.
- No OBR feature work (e.g. room-level Fellowship data); only API
  compatibility for the calls already in use.

## Decisions

### 1. Latest-everything, including TypeScript 7 (user decision)

All deps go to latest in one move, including `typescript@7.0.2` despite
suspected svelte-check incompatibility. Breakage is treated as a finding
to fix, not a reason to pre-emptively pin.

- *Alternative considered:* pin TS at 5.9.x until svelte-check catches
  up. Rejected by the user — now is the cheapest time to discover the
  real incompatibility surface. If TS 7 proves unworkable, the pin
  becomes the documented fix inside this change, not a silent fallback.

### 2. Runes migration, not legacy mode (user decision)

Svelte 5 compiles legacy syntax, but all 19 components migrate to runes
so every future line the maintainer writes starts from idiomatic
examples. Mapping:

- `export let x` → `let { x } = $props()`
- `bind:prop` from a parent → prop declared with `$bindable()`
  (`Sheet` receives `bind:sheet`, `Sections` `bind:sections`,
  `Notes` `bind:notes`)
- `$: y = f(x)` → `let y = $derived(...)`; reactive side effects →
  `$effect(...)`. `onMount` stays `onMount` (App.svelte OBR init) —
  `$effect` is not a drop-in for mount-time init.
- Slots → snippets where used (`Themer`'s wrapper slot →
  `{@render children?.()}`).
- The `bind:innerText` contenteditable title (one of the 5 baseline
  errors) is re-typed during migration; behavior preserved.

- *Alternative considered:* stay on legacy mode, migrate lazily.
  Rejected — a first-time Svelte maintainer should learn one syntax,
  and the migration is small (19 files, all simple).

### 3. Keep `svelte/store` and `localStore.ts`

Stores remain fully supported in Svelte 5, and `$store`
auto-subscription works inside runes components. `localStore` (the
localStorage persistence wrapper) stays untouched.

- *Alternative considered:* re-architect state as `.svelte.ts` rune
  modules. Rejected — a re-architecture, not a syntax migration; adds
  behavioral risk to a change whose acceptance criterion is "no
  functional delta."

### 4. OBR SDK 3: verify-then-adapt

`OBRHelper.ts` uses six calls: `OBR.isAvailable`, `OBR.onReady`,
`OBR.party.getPlayers/onChange`, `OBR.player.getName/getId/getRole/
setMetadata/onChange`. Read the 1→3 changelog for exactly this surface
and adapt only what changed. Known 3.x breaking changes seen so far
(scene-item `updateAttachments`, readonly `lastModified`) are outside
this surface.

### 5. Config modernization via minimal template diffs

`tsconfig*.json`, `svelte.config.js`, `vite.config.ts` are updated to
match what the current official Svelte + Vite + TS template ships
(`moduleResolution: "bundler"`, current `vitePreprocess` import, modern
sass compiler API if dart-sass deprecation warnings appear). Minimal
diffs — no custom config cleverness.

## Risks / Trade-offs

- [TS 7 × svelte-check 4 incompatibility] → try latest svelte-check; if
  unresolvable, pin `typescript@~5.9` and record the deviation in this
  design + proposal (the only accepted exception to latest-everything).

  **Resolution (implemented):** TS 7 *was* rejected — svelte-check@4.7.6
  declares peer `typescript@^5.0.0 || ^6.0.0`. Rather than the
  pre-written `~5.9` fallback, the project landed on **`typescript@6.0.3`**
  — the newest release line svelte-check accepts (6.x did not exist in
  the author's knowledge when the fallback was drafted). `npm run check`
  runs clean on 6.0.3, so the contingency resolved at a newer version
  than planned. This is the single accepted deviation from
  latest-everything; everything else is at its true latest.
- [OBR SDK 3 changed the player/party API surface] → adapt per
  changelog; worst case the app still renders standalone because the
  `OBR.isAvailable` gate isolates all SDK calls. Cannot block the
  visual milestone.
- [`bind:` semantics changed in runes mode] → `$bindable()` props;
  verify two-way editing of sheet name/sections/notes interactively.
- [sass 1.103 legacy-API deprecation noise under Vite 8] → switch
  `css.preprocessorOptions.scss.api` to `"modern-compiler"`.
- [Store-binding edge case: `bind:sheet={$sheet}`] → if Svelte 5
  rejects binding to a store value, pass the store down and bind to its
  snapshot inside the child instead; verify in the smoke test.

## Migration Plan

1. Baseline is recorded: 5 check errors, dev server boots (2026-08-28).
2. Update `package.json` + config files, `npm install`, resolve peer
   conflicts.
3. Migrate components leaf-first (Stats → Section → Sections → … →
   App.svelte), then `OBRHelper.ts`.
4. Iterate `npm run check` / `npm run build` / dev smoke until green.
5. Docs sync: README LLM-use disclosure (AI touched application code),
   AGENTS.md + `openspec/config.yaml` stack lines, strike the
   TODOS-HUMAN baseline entry.
6. Human verification step: load the built extension in Owlbear Rodeo
   and confirm GM tabs + sheet sync still work (cannot be automated
   outside OBR).

Rollback: the upgrade lands as one working-tree change set on a clean
baseline; `git checkout -- .` + `npm ci` restores the pre-upgrade state.
No commits are made as part of this change.

## Open Questions

None blocking. (Whether svelte-check accepts TS 7 is answered
empirically in step 4 — the fallback is pre-decided, so the task
breakdown does not change.)
