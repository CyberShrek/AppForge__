<script lang="ts">

    import {extractJsonItemsWithSuffix} from "../../../util/data"
    import Field from "./field/Field.svelte"

    export let
        config: FormSectionConfig,
        jsonValue: {[fieldKey: string]: any} = {}

    let fieldConfigsObject = config ? extractJsonItemsWithSuffix(config, "Field") as {[fieldKey: string]: FieldConfig} : {}

</script>

<div class="section">
    {#if config.title}
        <p>{config.title}</p>
    {/if}
    {#each Object.keys(fieldConfigsObject) as fieldKey}
        <Field config={fieldConfigsObject[fieldKey]}
               bind:value={jsonValue[fieldKey]}/>
    {/each}
</div>
