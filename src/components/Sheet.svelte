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

    <aside>
        <Toggle bind:value={isEditing}>
            {#snippet renderFalse()}edit{/snippet}
            {#snippet renderTrue()}editing...{/snippet}
        </Toggle>
    </aside>

    <main>
        {#each sheet.themeCards as _, i}
            <ThemeCard bind:themeCard={sheet.themeCards[i]} {isEditing} />
        {/each}
    </main>
</article>

<style>
.sheet {
    font-size: 12px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    h1 {
        text-align: left;
    }

    aside {
        display: flex;
        gap: 0.5rem;
        place-content: end;
    }

    main {
        display: contents;
    }
}
</style>
