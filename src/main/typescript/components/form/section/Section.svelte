<script lang="ts">

    import {extractJsonItemsWithSuffix} from "../../../util/data"

    export let config: FormSectionConfig

    let fieldConfigsObject = config ? extractJsonItemsWithSuffix(config, "Field") as {[fieldKey: string]: FieldConfig} : {}

</script>

<div class="section">
    {#each Object.keys(fieldConfigsObject) as fieldKey}


    {/each}
</div>
