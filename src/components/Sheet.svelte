<script lang="ts">
import type { CharacterSheet } from "../sheet.svelte"

import ThemeCard from "./ThemeCard.svelte"

interface Props {
    sheet: CharacterSheet
}

let { sheet }: Props = $props()
</script>

<article class="sheet">
    <h1>{sheet.name}</h1>

    <main>
        {#each sheet.themeCards as _, i}
            <ThemeCard bind:themeCard={sheet.themeCards[i]} />
        {/each}
    </main>
</article>

<style>
.sheet {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;

    h1 {
        text-align: left;
        margin: 0;
        color: white;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        letter-spacing: 0em;
        font-size: 1.125rem;
        font-weight: bold;
        line-height: 1.75;
        padding: 16px;
        border-bottom: 1px solid oklch(100% none none / 0.12);
    }

    main {
        display: contents;
    }
}
</style>
