<script lang="ts">

    import { fade } from 'svelte/transition'

    export let
        top    = false,
        bottom = false,
        left   = false,
        right  = false

</script>

<div class="fix"
     class:top
     class:bottom
     class:left
     class:right
     transition:fade>

    <slot/>
</div>