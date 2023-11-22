<script lang="ts">

    import {createEventDispatcher, onMount} from "svelte"
    import {resolveStyle} from "../../util/resolver"

    const dispatch = createEventDispatcher()

    resolveStyle("modal")

    export let show: boolean = true

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

    // Disable scroll when modal is opened
    $: if (show)
        document.body.style.overflow = "hidden"
    else
        document.body.style.overflow = ""

    $: if (show === false)
        dispatch("close")

</script>
{#if show === true}
    <div bind:this={rootElement}
         class="modal-backdrop"
         role="button"
         tabindex="-1"
         on:click={() => show = false}
         on:keydown={() => show = false}>

        <div class="modal" on:click={e => e.stopPropagation()}>
            <slot/>
        </div>
    </div>
{/if}