<script lang="ts">
import Section from "./Section.svelte"
import type { DummySheetSection } from "../types/sheet.type"

interface Props {
    sections?: DummySheetSection[]
}

let { sections = $bindable([]) }: Props = $props()
</script>

<div>
    {#each sections as section, i (section.id)}
        <Section bind:section={sections[i]} />
    {/each}
</div>

<style>
div {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 1.5rem;
    grid-row-gap: 2rem;
}
</style>
