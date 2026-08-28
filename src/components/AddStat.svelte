<script lang="ts">
import { editing } from "../stores"
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"

interface Props {
    addStat: () => void
}

let { addStat }: Props = $props()

let editable = $derived($currentPlayerId === $viewingPlayerId)
</script>

{#if editable && $editing}
    <button onclick={addStat}> Add Stat </button>
{/if}

<style>
button {
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
