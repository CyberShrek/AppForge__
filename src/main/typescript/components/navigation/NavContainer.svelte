<script lang="ts">

    import { onMount } from 'svelte'

    export let simplifyIfSingle = true

    let tabsElement: HTMLDivElement
    let bodyElement: HTMLDivElement

    let simplified = false

    onMount(() => {
        const pages = tabsElement.querySelectorAll<HTMLDivElement>("div.tab-page")

        // Each page from the slot will be inserted into nav-body
        pages.forEach(pageElement => bodyElement.insertAdjacentElement("beforeend", pageElement))

        // The first tab is selected by default
        tabsElement.querySelector<HTMLButtonElement>("button.tab").click()

        simplified = (simplifyIfSingle && pages.length === 1)
    })

</script>

<div class="nav-container" class:simplified>
    <!-- Nav Bar-->
    <div class="nav-bar" bind:this={tabsElement}>
        <slot/>
    </div>

    <!-- Nav Body -->
    <div class="nav-body" bind:this={bodyElement}>
        <!-- Awaiting for tabs from the slot -->
    </div>
</div>