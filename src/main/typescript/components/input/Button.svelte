<script lang="ts">

    import Image from "../misc/Image.svelte";

    export let
        unavailable = false,
        frameless   = false,
        hint        = "",
        text        = "",
        image       = "",
        root: HTMLButtonElement = null

</script>

<button class:unavailable
        class:frameless
        title="{hint}"
        bind:this={root}
        on:click>

    {#if image && image.length > 0}
        <Image name={image}/>
    {/if}

    {text}

</button>