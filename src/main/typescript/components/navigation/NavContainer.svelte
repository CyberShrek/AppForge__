<script lang="ts">

    import { onMount } from 'svelte'
    import Tab from "../input/Tab.svelte"

    export let
        tabNames: string[] = [],
        selectedTabName: string

    onMount(() => {
        selectedTabName = tabNames[0]?.toString()
    })

</script>

<div class="nav-container">
    <!-- Nav Bar-->
    <div class="nav-bar">
        {#each tabNames as tabName}
            <Tab ></Tab>
        {/each}
    </div>

    <!-- Nav Body -->
    <div class="nav-body">
        <slot/>
    </div>
</div>