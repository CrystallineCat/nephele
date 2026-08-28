<script lang="ts">
    // Import store
    import { sheet } from '../stores'

    let saveFile: FileList | undefined = $state();

    function importFile (){
        document.getElementById('importFile')?.click();
    }
    function storeFile(e: Event){
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(ev) {
            const result = ev.target?.result;
            if (typeof result !== 'string') return;
            let jsonObj = JSON.parse(result);
            $sheet = jsonObj;
        }
        reader.readAsText(file);
    }
</script>

<input id="importFile" type="file" accept="application/json" onchange={storeFile} bind:value={saveFile}/>
<button onclick={importFile}>Import</button>

<style lang="scss">
    input[type="file"] {
        display:none;
    }
    button {
        float: right;
        background: rgba(var(--accent),0);
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
            background: rgba(var(--accent),1);
            color: rgb(var(--secondary));
        }
    }
</style>
