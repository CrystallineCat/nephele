<script lang="ts">
import EditToggle from "./EditToggle.svelte"
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"
</script>

{#if $currentPlayerId === $viewingPlayerId}
    <div>
        <EditToggle />
    </div>
{/if}

<style>
div {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 0.5rem;
    grid-auto-flow: column;
    width: 100%;
    justify-content: end;
}
</style>
