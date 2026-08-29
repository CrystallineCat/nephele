<script lang="ts">
interface Props {
    text: string
    isEditing: boolean
}

let { text = $bindable(), isEditing }: Props = $props()
</script>

{#if isEditing}
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
