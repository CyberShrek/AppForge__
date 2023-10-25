<script lang="ts">

    import { onMount } from 'svelte'

    let tabsElement: HTMLDivElement
    let bodyElement: HTMLDivElement

    onMount(() => {
        // Each page from the slot will be inserted into nav-body
        tabsElement.querySelectorAll("div.tab-page").forEach(pageElement => {
            bodyElement.insertAdjacentElement("beforeend", pageElement)
        })
    })

</script>

<div class="nav-container">
    <!-- Nav Bar-->
    <div class="nav-bar" bind:this={tabsElement}>
        <slot/>
    </div>

    <!-- Nav Body -->
    <div class="nav-body" bind:this={bodyElement}>
        <!-- Awaiting for tabs from the slot -->
    </div>
</div>