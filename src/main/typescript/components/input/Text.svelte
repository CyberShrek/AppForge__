<script lang="ts">

    export let
        placeholder: string = "",
        value:       string = ""

</script>

<input bind:value {placeholder} type="text"/>