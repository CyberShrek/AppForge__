<script lang="ts">

    export let
        active = false,
        hint   = "",
        bindedTabs: Tab,
        associatedWith: HTMLElement

    $: if(active && associatedWith)
        associatedWith.style.display = active === true ? "" : "none"

</script>

<button class:active
        class="tab"
        title="{hint}"
        on:click={() => active = true}>

    <slot/>

</button>