<script lang="ts">

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
     class:right>

    <slot/>
</div>