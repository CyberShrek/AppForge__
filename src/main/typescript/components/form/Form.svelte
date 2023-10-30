<script lang="ts">
    import {resolveCSS} from "../../util/resolver"
    import {extractJsonItemsWithSuffix, prettify} from "../../util/data"
    import Section from "./section/Section.svelte"
    import Button from "../input/Button.svelte"

    resolveCSS("form")

    export let
        config: FormConfig,
        jsonValue: {[sectionKey: string]: any} = {}

    let sectionConfigsObject = config ? extractJsonItemsWithSuffix(config, "Section") as {[sectionKey: string]: FormSectionConfig} : {}

</script>

<form on:click={event => event.preventDefault()}>

    {#each Object.keys(sectionConfigsObject) as sectionKey}
        <Section config={sectionConfigsObject[sectionKey]}
                 bind:jsonValue={jsonValue[sectionKey]}/>
    {/each}

    <Button submit text={config.submitText}
            on:click={() => alert(prettify(jsonValue))}
    />
</form>