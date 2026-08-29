<script lang="ts">
import type { CharacterSheet } from "../types/sheet.type"

import Editable from "./Editable.svelte"
import ThemeCard from "./ThemeCard.svelte"
import Toggle from "./Toggle.svelte"

interface Props {
    sheet: CharacterSheet
}

let { sheet = $bindable() }: Props = $props()
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
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;

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

    main {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(1, 1fr);
        grid-column-gap: 1.5rem;
        grid-row-gap: 2rem;
    }

    aside {
        margin-top: 1rem;
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        grid-gap: 0.5rem;
        grid-auto-flow: column;
        width: 100%;
        justify-content: end;
    }
}
</style>
