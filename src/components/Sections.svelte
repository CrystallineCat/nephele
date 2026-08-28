<script lang="ts">
import Section from "./Section.svelte"
import type { ThemeCard } from "../types/sheet.type"

interface Props {
    themeCards?: ThemeCard[]
}

let { themeCards = $bindable([]) }: Props = $props()
</script>

<div>
    {#each themeCards as _, i}
        <Section bind:themeCard={themeCards[i]} />
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
