<script lang="ts">
import Stats from "./Stats.svelte"

import { editing } from "../stores"
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"
import type { DummySheetSection } from "../types/sheet.type"

interface Props {
    section: DummySheetSection
}

let { section = $bindable() }: Props = $props()

let editable = $derived($currentPlayerId === $viewingPlayerId)
</script>

<div>
    {#if editable && $editing}
        <h2 bind:innerText={section.name} contenteditable="true">
            {section.name}
        </h2>
    {:else}
        <h2>{section.name}</h2>
    {/if}
    <Stats bind:stats={section.stats} />
</div>

<style>
div {
    padding: 1rem 0.5rem;
    border-width: 0.15rem;
    border-style: solid;
    border-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgb(var(--accent)),
            rgba(0, 0, 0, 0)
        )
        1 100%;
    border-right: none;
}
h2 {
    text-shadow: var(--shadow);
    color: rgb(var(--accent));
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 0;
}
</style>
