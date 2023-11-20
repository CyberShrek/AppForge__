<script lang="ts">

    import {createEventDispatcher, onMount} from "svelte"
    import {resolveStyle} from "../../util/resolver"

    const dispatch = createEventDispatcher()

    resolveStyle("modal")

    export let show: boolean

    let rootElement: HTMLDivElement

    onMount(() => {
        document.body.appendChild(rootElement)
    })

    // Close on escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            show = false
        }
    })

    $: if (show === false)
        dispatch("close")

</script>

{#if show}
    <div bind:this={rootElement}
         class="modal-backdrop"
         role="button"
         tabindex="-1"
         on:click={() => show = false}
         on:keydown={() => show = false}>

        <div class="modal">
            <slot/>
        </div>
    </div>
{/if}