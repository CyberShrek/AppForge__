<script lang="ts">

    export let
        unavailable = false,
        frameless   = false,
        hint        = ""

</script>

<button class:unavailable
        class:frameless
        title="{hint}"
        on:click>

    <slot/>

</button>