<script lang="ts">
import { editing } from "../stores"
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"
import type { DummySheetSection } from "../types/sheet.type"

interface Props {
    sections: DummySheetSection[]
}

let { sections = $bindable() }: Props = $props()

let editable = $derived($currentPlayerId === $viewingPlayerId)
let newSectionId = $derived(
    sections.length > 0 ? Math.max(...sections.map((t) => t.id)) + 1 : 1,
)

function addSection() {
    sections = [
        ...sections,
        {
            id: newSectionId,
            name: "New Section",
            stats: [
                {
                    id: 1,
                    name: "New Field",
                    value: "-",
                },
            ],
        },
    ]
}
</script>

{#if editable && $editing}
    <button onclick={addSection} onkeydown={addSection}> Add Section </button>
{/if}

<style lang="scss">
button {
    float: right;
    margin: 0 1rem;
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
