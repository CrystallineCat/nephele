<script lang="ts">
let { value = $bindable(), renderTrue, renderFalse } = $props()
</script>

<button
    onclick={() => {
        value = !value
    }}
>
    {#if value}
        {#if renderTrue}
            {@render renderTrue()}
        {:else}
            on
        {/if}
    {:else}
        {#if renderFalse}
            {@render renderFalse()}
        {:else}
            off
        {/if}
    {/if}
</button>

<style>
button {
    margin-right: 0px;
    float: right;
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
