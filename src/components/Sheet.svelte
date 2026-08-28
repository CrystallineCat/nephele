<script lang="ts">
import Sections from "./Sections.svelte"
import SheetActions from "./SheetActions.svelte"
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"
import type { DummySheet } from "../types/sheet.type"

import { editing } from "../stores"

interface Props {
    sheet: DummySheet
}

let { sheet = $bindable() }: Props = $props()

let editable = $derived($currentPlayerId === $viewingPlayerId)
let player = $state("")
</script>

<div>
    {#if editable && $editing}
        <h1 bind:innerText={sheet.name} contenteditable="true"></h1>
    {:else}
        <h1>{sheet.name}</h1>
    {/if}
    <h4>{player}</h4>
    <SheetActions />
    <Sections bind:sections={sheet.sections} />
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
h4 {
    font-weight: 300;
    margin: 0;
    color: rgb(var(--accent));
    text-align: right;
}
</style>
