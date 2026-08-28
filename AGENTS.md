# nephele

A fork of DummySheet (kurara-ara/dummy-sheet): a deliberately simple,
system-agnostic RPG character sheet for people who change systems often.
Svelte 5 (runes) + Vite 8 + TypeScript 6; state lives in svelte stores
persisted to localStorage; Owlbear Rodeo integration via
`@owlbear-rodeo/sdk` v3. See README.md for how the sheet is used.

## Commands

- `npm run dev` — vite dev server
- `npm run check` — svelte-check; run after TS/Svelte changes, must pass clean
- `npm run build` — production build

## OpenSpec

This project uses OpenSpec (spec-driven schema). Specs and changes live in
`openspec/`; project context shown to AI during artifact generation is in
`openspec/config.yaml`. Start new work with the `/opsx-*` workflows or the
`openspec-*` skills (both under `.kilocode/`).

Keep the sheet system-agnostic: no mechanics, stat names, or rules hard-coded
for a specific RPG system.

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
