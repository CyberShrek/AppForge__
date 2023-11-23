<script lang="ts">

    import Image from "../misc/Image.svelte"

    export let
        unavailable   = false,
        frameless     = false,
        submit        = false,
        cancel        = false,
        active        = false,
        hint          = "",
        text          = "",
        image         = "",
        imageLocation = undefined,
        root: HTMLButtonElement = null

</script>



<button class:unavailable
        class:frameless
        class:submit
        class:cancel
        class:active
        title="{hint}"
        bind:this={root}
        on:click={event => event.preventDefault()}
        on:click
        on:mouseenter>

    {#if image && image.length > 0}
        <Image {hint} name={image} location={imageLocation}/>
    {/if}

    {text}

</button>