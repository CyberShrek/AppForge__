<script lang="ts">

    import Button from "../input/Button.svelte"
    import {onMount} from "svelte"

    export let
        active = false,
        hint   = "",
        text   = "",
        image  = "",
        tabButtonRoot: HTMLButtonElement = null,
        tabPageRoot:   HTMLDivElement    = null

    onMount(() => {
        tabButtonRoot.classList.add("tab")

        // Listening the container events to activate or deactivate the tab
        tabButtonRoot.parentElement.addEventListener("click", event => {
            let clickedElement = event.target as HTMLElement
            if(clickedElement.tagName === "BUTTON" && clickedElement.classList.contains("tab"))
                active = clickedElement == tabButtonRoot
        })
    })

    $: if(active === true)
            tabButtonRoot?.classList.add("active")
        else
            tabButtonRoot?.classList.remove("active")

</script>

<Button {hint} {text} {image}
        bind:root={tabButtonRoot}
        on:click/>

<div class="tab-page"
     bind:this={tabPageRoot}
     style="display: {active ? '' : 'none'}">

    <slot/>
</div>