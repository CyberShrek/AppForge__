<script lang="ts">

    import {extractJsonItemsWithSuffix} from "../../../../util/data"
    import Field from "./field/Field.svelte"

    export let
        config: FormSectionConfig,
        values: {[fieldKey: string]: any} = {},
        valueScope: {[section_dot_field: string]: any},
        // Statement
        wrong: boolean,
        hidden: boolean,
        hiddenFields: Set<string>,
        wrongFields: Set<string>

    let fieldConfigsObject = config ? extractJsonItemsWithSuffix(config, "Field") as {[fieldKey: string]: FieldConfig} : {}

</script>

<div class:wrong
     class:hidden
     class="section">

    {#if config.title}
        <p>{config.title}</p>
    {/if}

    {#each Object.keys(fieldConfigsObject) as fieldKey}
        <Field config={fieldConfigsObject[fieldKey]}
               bind:value={values[fieldKey]}
               {valueScope}
               wrong={wrongFields?.has(fieldKey)}
               hidden={hidden || hiddenFields?.has(fieldKey)}/>
    {/each}
</div>