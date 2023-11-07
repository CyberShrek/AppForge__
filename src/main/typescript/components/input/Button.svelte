<script lang="ts">

    import Image from "../misc/Image.svelte"

    export let
        unavailable = false,
        frameless   = false,
        submit      = false,
        cancel      = false,
        hint        = "",
        text        = "",
        image       = "",
        root: HTMLButtonElement = null

</script>

<button class:unavailable
        class:frameless
        class:submit
        class:cancel
        title="{hint}"
        bind:this={root}
        on:click={event => event.preventDefault()}
        on:click
        on:mouseenter>

    {#if image && image.length > 0}
        <Image name={image}/>
    {/if}

    {text}

</button>