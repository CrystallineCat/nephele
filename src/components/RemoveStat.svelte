<script lang="ts">
    import { editing } from "../stores";
    import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper";
    import type { DummySheetStats } from "../types/sheet.type";

    interface Props {
        stat: DummySheetStats;
        removeStat: (stat: DummySheetStats) => void;
    }

    let { stat, removeStat }: Props = $props();

    let editable = $derived($currentPlayerId === $viewingPlayerId);
</script>

{#if editable && $editing}
<button onclick={() => removeStat(stat)}>&times;</button>
{/if}

<style lang="scss">
    button {
        box-sizing: border-box;
        color: rgba(var(--accent), 0.25);
        background:transparent;
        border:none;
        height: 1rem;
        width: 1rem;
        padding:0;
        font-size: 1.2rem;
        vertical-align: top;
        line-height: 1rem;
        transition: color ease-in-out 150ms;
        &:hover{
            color: rgba(var(--accent), 1);
        }
    }
</style>
