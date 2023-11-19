<script lang="ts">

    import {onMount} from "svelte"

    export let show: boolean

    let rootElement: HTMLDivElement

    onMount(() => {
        document.body.appendChild(rootElement)
    })

</script>

{#if show}
    <div bind:this={rootElement}
         class="modal-backdrop">
        <div class="modal">
            <slot/>
        </div>
    </div>
{/if}