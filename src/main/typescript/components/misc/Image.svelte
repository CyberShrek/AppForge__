<script lang="ts">
    import {imagesLocation} from "../../properties";

    export let
        name: string,
        alt: string = "",
        hint: string = "",
        location: string = imagesLocation

</script>

<img src="{location}{name}" {alt} title={hint}/>