<script lang="ts">

    import {imagesLocation} from "../../properties"

    export let
        available = true,
        className = "",
        image     = "",
        text      = "",
        hint      = ""

</script>

<button class="{className}{available ? '' : ' unavailable'}"
        title="{hint}">
    {#if image && image.length > 0}
        <img src="{imagesLocation}{image}" alt=""/>
    {/if}
    {text}
</button>