<script lang="ts">
    import Form from "./form/Form.svelte";
    import {valueOrDefault} from "../../util/data";
    import NavTab from "../navigation/NavTab.svelte";
    import NavContainer from "../navigation/NavContainer.svelte";
    import ReportSlot from "./reportSlot/ReportSlot.svelte";

    export let
        formConfig: FormConfig,
        reportConfigsObject: {[configKey: string]: ReportSlotConfig}

    let submittedValue


</script>

<Form config={formConfig} bind:submittedValue/>

<NavContainer>
    {#each Object.keys(reportConfigsObject) as configKey}
        <NavTab text={valueOrDefault(reportConfigsObject[configKey].title, configKey)}>
            <ReportSlot config={reportConfigsObject[configKey]}/>
        </NavTab>
    {/each}
</NavContainer>