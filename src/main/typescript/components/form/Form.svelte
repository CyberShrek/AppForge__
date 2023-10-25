<script lang="ts">
    import {resolveCSS} from "../../util/resolver"
    import {extractJsonItemsWithSuffix} from "../../util/data"
    import Section from "./section/Section.svelte"

    resolveCSS("form")

    export let config: FormConfig

    let sectionConfigsObject = config ? extractJsonItemsWithSuffix(config, "Section") as {[sectionKey: string]: FormSectionConfig} : {}

</script>

<form>
    {#each Object.keys(sectionConfigsObject) as sectionKey}
        <Section config={sectionConfigsObject[sectionKey]}/>
    {/each}
</form>