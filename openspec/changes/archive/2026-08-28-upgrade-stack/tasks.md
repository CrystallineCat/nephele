# Tasks: upgrade-stack

## 1. Dependencies and config

- [x] 1.1 Update `package.json` to latest versions: svelte 5.56.10, vite 8.2.2, @sveltejs/vite-plugin-svelte 7.3.0, svelte-check 4.7.6, typescript 7.0.2, @tsconfig/svelte 5.0.8, sass 1.103.1, tslib 2.8.1, @owlbear-rodeo/sdk 3.1.0 (file-saver stays 2.0.5)
- [x] 1.2 Update `tsconfig.json` / `tsconfig.node.json` to current @tsconfig/svelte 5 shape (`moduleResolution: "bundler"`, module ESNext)
- [x] 1.3 Update `svelte.config.js` and `vite.config.ts` for the new plugin/vite versions (current `vitePreprocess` import; modern sass API if deprecation warnings appear)
- [x] 1.4 `npm install`; resolve peer-dependency conflicts

## 2. Runes migration (leaf-first)

- [x] 2.1 Migrate leaf components: Stats, Section, Sections, Notes, AddSection, AddStat, RemoveSection, RemoveStat, EditToggle
- [x] 2.2 Migrate mid-level: SheetActions, FileManager, FileExport, FileImport, ThemeEditor, Binder, GMBinderTabs
- [x] 2.3 Migrate Themer (slot → snippet) and Sheet (`$bindable()` sheet prop, contenteditable title)
- [x] 2.4 Migrate App.svelte (`bind:sheet={$sheet}`, `$derived` visibility flags, keep `onMount` for OBR init)

## 3. OBR SDK 3 adaptation

- [x] 3.1 Read the SDK 1→3 changelog for the six calls in use (`isAvailable`, `onReady`, `party.getPlayers/onChange`, `player.getName/getId/getRole/setMetadata/onChange`)
- [x] 3.2 Adapt `src/services/OBRHelper.ts` to any changed signatures

## 4. Green gates

- [x] 4.1 `npm run check` → 0 errors, 0 warnings (5 baseline errors resolved or reclassified by migration)
- [x] 4.2 `npm run build` → succeeds
- [x] 4.3 Dev-server smoke test: boots, serves index, transforms modules (verify via curl as on 2026-08-28); visually confirm sheet renders and editing still works
- [x] 4.4 If TS 7 × svelte-check proves unworkable: pin `typescript@~5.9`, record the deviation in design.md and proposal.md (only accepted exception to latest-everything)

## 5. Docs sync

- [x] 5.1 Update README LLM-use disclosure: AI touched application code during this migration (runes rewrite); bump last-reviewed date
- [x] 5.2 Update AGENTS.md and `openspec/config.yaml` tech-stack lines (Svelte 3 + Vite 4 → Svelte 5 + Vite 8, TS 7)
- [x] 5.3 Strike the baseline-errors entry in TODOS-HUMAN.md (resolved by 4.1)

## 6. Human verification (cannot be automated)

- [ ] 6.1 Load the extension in Owlbear Rodeo; confirm GM binder tabs and player-sheet metadata sync still work
