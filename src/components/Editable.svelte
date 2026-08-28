<script lang="ts">
import { editing } from "../stores"
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"

interface Props {
    text: string
}

let { text = $bindable() }: Props = $props()

let editable = $derived($currentPlayerId === $viewingPlayerId)
</script>

{#if editable && $editing}
    <div
        class="editable editing"
        bind:textContent={text}
        contenteditable="true"
    ></div>
{:else}
    <div class="editable">{text}</div>
{/if}

<style>
.editable {
    width: 100%;
    height: 100%;
}
</style>
