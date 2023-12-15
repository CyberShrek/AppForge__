<script lang="ts">
    import Form from "./form/Form.svelte"
    import ReportSlot from "./reportSlot/ReportSlot.svelte"

    export let
        formConfig: FormConfig,
        slotConfigs: FormNReportsConfig["slots"]

    let reportModels: {[reportSlot: string]: ReportModel} = {}

    function setReport(model: ReportModel): void {
        reportModels[model.slot] = model
    }

</script>

{#if formConfig}
    <Form config={formConfig}
          on:report={e => setReport(e.detail)}/>
{/if}

{#if slotConfigs}
    {#each Object.keys(slotConfigs) as slotKey}
        <ReportSlot config={slotConfigs[slotKey]}
                    model={reportModels[slotKey]}
                    on:report={e => setReport(e.detail)}/>
    {/each}
{/if}

<!--<Modal on:close={() => reportModels[reportKey] = null}>-->
<!--    <ReportSlot config={reportConfigsObject[reportKey]}-->
<!--                model={reportModels[reportKey]}-->
<!--                on:report={e => setReport(e.detail)}/>-->
<!--</Modal>-->