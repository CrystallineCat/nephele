<script lang="ts">
import Sections from "./Sections.svelte"
import SheetActions from "./SheetActions.svelte"
import type { DummySheet } from "../types/sheet.type"

import Editable from "./Editable.svelte"

interface Props {
    sheet: DummySheet
}

let { sheet = $bindable() }: Props = $props()

let player = $state("")
</script>

<div>
    <h1><Editable bind:text={sheet.name} /></h1>
    <h2>{player ?? "Player"}</h2>
    <SheetActions />
    <Sections bind:themeCards={sheet.themeCards} />
</div>

<style>
div {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
}
h1 {
    margin: 1rem 0 0 1rem;
    color: rgb(var(--accent));
    text-align: right;
}
h2 {
    font-weight: 300;
    margin: 0;
    color: rgb(var(--accent));
    text-align: right;
}
</style>
