<script lang="ts">
import type { CharacterSheet } from "../types/sheet.type"

import Editable from "./Editable.svelte"
import ThemeCard from "./ThemeCard.svelte"
import Toggle from "./Toggle.svelte"

interface Props {
    sheet: CharacterSheet
}

let { sheet }: Props = $props()
let isEditing = $state(false)
</script>

<article class="sheet">
    <h1><Editable bind:text={sheet.name} {isEditing} /></h1>

    <main>
        {#each sheet.themeCards as _, i}
            <ThemeCard bind:themeCard={sheet.themeCards[i]} {isEditing} />
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
