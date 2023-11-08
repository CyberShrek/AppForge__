<script lang="ts">
    import Form from "./form/Form.svelte"
    import ReportSlot from "./reportSlot/ReportSlot.svelte"

    export let
        formConfig: FormConfig,
        reportConfigsObject: {[configKey: string]: ReportSlotConfig}

    let submittedValue


</script>

<Form config={formConfig} bind:submittedValue/>

{#each Object.keys(reportConfigsObject) as configKey}
        <ReportSlot config={reportConfigsObject[configKey]}/>
{/each}