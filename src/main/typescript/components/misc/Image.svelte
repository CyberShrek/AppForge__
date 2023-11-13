<script lang="ts">
    import {imagesLocation} from "../../properties";

    export let
        name: string,
        alt: string = "",
        hint: string = ""

</script>

<img src="{imagesLocation}{name}" {alt} title={hint}/>