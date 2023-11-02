<script lang="ts">
    import {resolveStyle} from "../../util/resolver"
    import {extractJsonItemsWithSuffix, prettify} from "../../util/data"
    import Section from "./section/Section.svelte"
    import Button from "../input/Button.svelte"
    import {onMount} from "svelte"

    resolveStyle("form")

    export let
        config: FormConfig,
        values: {[section_dot_fieldValue: string]: any} = {}

    let sectionConfigsObject = config ? extractJsonItemsWithSuffix(config, "Section") as {[sectionKey: string]: FormSectionConfig} : {},
        sectionValues = {}

    $: if(sectionValues){
        values = {}
        for (const sectionKey in sectionValues) {
            const fieldValues = sectionValues[sectionKey]
            for (const fieldKey in fieldValues) {
                values[`${sectionKey}.${fieldKey}`] = fieldValues[fieldKey]
            }
        }
    }

</script>

<form>

    {#each Object.keys(sectionConfigsObject) as sectionKey}
        <Section config={sectionConfigsObject[sectionKey]}
                 bind:values={sectionValues[sectionKey]}
                 scopeValues={values}/>
    {/each}

    <Button submit text={config.submitText}
            on:click={() => alert(prettify(values))}
    />

</form>