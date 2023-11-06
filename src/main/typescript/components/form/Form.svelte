<script lang="ts">
    import {resolveStyle} from "../../util/resolver"
    import {extractJsonItemsWithSuffix, prettify} from "../../util/data"
    import Section from "./section/Section.svelte"
    import Button from "../input/Button.svelte"
    import {FormStatementAccessor} from "../../api/FormStatementAccessor"

    resolveStyle("form")

    export let
        config: FormConfig

    let sectionConfigsObject = config ? extractJsonItemsWithSuffix(config, "Section") as {[sectionKey: string]: FormSectionConfig} : {},
        sectionValues = {},
        valueScope: {[section_dot_fieldValue: string]: any},
        stateScope: {[section_dot_fieldState: string]: any}

    $: statementAccessor = config?.statementPath ? new FormStatementAccessor(config.statementPath) : null

    $: if(Object.keys(sectionValues).length > 0){
        valueScope = {}
        for (const sectionKey in sectionValues) {
            const fieldValues = sectionValues[sectionKey]
            for (const fieldKey in fieldValues) {
                valueScope[`${sectionKey}.${fieldKey}`] = fieldValues[fieldKey]
            }
        }
        statementAccessor?.fetch(valueScope)
            .then(statement => stateScope = statement)
    }

</script>

<form>

    {#each Object.keys(sectionConfigsObject) as sectionKey}
        <Section config={sectionConfigsObject[sectionKey]}
                 bind:values={sectionValues[sectionKey]}
                 {valueScope}/>
    {/each}

    <Button submit text={config.submitText}
            on:click={() => alert(prettify(valueScope))}
    />
</form>