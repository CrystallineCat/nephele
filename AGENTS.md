# nephele

A fork of DummySheet (kurara-ara/dummy-sheet), re-purposed as a
deliberately simple Legend in the Mist character sheet for Owlbear
Rodeo. Svelte 5 (runes) + Vite 8 + TypeScript 6; state currently lives
in a `$state` rune module (`src/sheet.svelte.ts`) with hard-coded seed
data — no persistence yet (parked, see TODOS-HUMAN.md). Owlbear Rodeo
integration via `@owlbear-rodeo/sdk` v3. See README.md for how the
sheet is used.

## Commands

- `npm run dev` — vite dev server (watches + hot-reloads; HMR events go to
  the browser console, not the terminal)
- `npm run check` — svelte-check; run after TS/Svelte changes, must pass clean
- `npm run build` — production build
- `npm run format` — prettier --write (canonical formatting; run after edits)
- `npm run format:check` — prettier --check (verify without writing)

## OpenSpec

This project uses OpenSpec (spec-driven schema). Specs and changes live in
`openspec/`; project context shown to AI during artifact generation is in
`openspec/config.yaml`. Start new work with the `/opsx-*` workflows or the
`openspec-*` skills (both under `.kilocode/`).

The sheet is deliberately Legend in the Mist (decided 2026-08-31):
LitM mechanics, stat names, and rules text in the code are intended,
not drift.

## TODOS-HUMAN.md

`TODOS-HUMAN.md` at the project root is the living list of open decisions and
deferred questions for the user to pick up between experiment phases. AI
sessions maintain it:

- Add an entry when drift between specs and code surfaces an undecided
  question (one line: the question, current state, pointer to rationale).
- Strike an entry when a change resolves it.
- Never let it duplicate what specs already state — it holds the undecided,
  not the decided.

## README LLM-use disclosure

The `## LLM-use disclosure` section near the top of `README.md` is a
standing transparency statement for the TTRPG community. AI sessions
maintain it. The declared split: application code (HTML, CSS, TypeScript,
Svelte) is human-written; AI assists only with devops/tooling,
documentation, OpenSpec planning artifacts, and exploratory discussion.
If a session's work falls outside that declared remit, update the
disclosure to match reality and bump its "last reviewed" date.

## Known tooling issues

- The Kilo frontmatter validator is currently broken (observed 2026-08-08):
  on every save under `.kilo/command/` it reports
  `Failed to parse frontmatter: No context found for instance` — even for
  schema-valid files. Disregard the error; verify frontmatter by hand against
  the documented command schema instead of trusting the validator.
