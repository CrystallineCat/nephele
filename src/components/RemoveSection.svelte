<script lang="ts">
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"
import { editing } from "../stores"
import type { DummySheetSection } from "../types/sheet.type"

interface Props {
    section: DummySheetSection
    removeSection: (section: DummySheetSection) => void
}

let { section, removeSection }: Props = $props()

let editable = $derived($currentPlayerId === $viewingPlayerId)
</script>

{#if editable && $editing}
    <button onclick={() => removeSection(section)}> Remove Section </button>
{/if}

<style lang="scss">
button {
    margin-top: 0.25rem;
    box-sizing: border-box;
    width: 100%;
    background: rgba(var(--accent), 0);
    border: 1px solid rgb(var(--accent));
    border-radius: 0.15rem;
    color: rgb(var(--accent));
    font-size: 1rem;
    font-weight: 300;
    text-transform: uppercase;
    cursor: pointer;
    transition: background ease-in-out 150ms;
    transition: color ease-in-out 150ms;
    &:hover {
        background: rgba(var(--accent), 1);
        color: rgb(var(--secondary));
    }
}
</style>
