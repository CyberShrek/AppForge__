<script lang="ts">
    import Form from "./form/Form.svelte"
    import ReportSlot from "./reportSlot/ReportSlot.svelte"

    export let
        formConfig: FormConfig,
        slotConfigs: FormNReportsConfig["slots"]

    let reportModels: {[reportSlot: string]: ReportModel} = {}

    function setReport(report: ReportModel): void {
        reportModels[report.slot] = report
    }

</script>

<Form config={formConfig}
      on:report={e => setReport(e.detail)}/>

{#each Object.keys(slotConfigs) as slotKey}
    <ReportSlot config={slotConfigs[slotKey]}
                model={reportModels[slotKey]}
                on:report={e => setReport(e.detail)}/>
{/each}

<!--<Modal on:close={() => reportModels[reportKey] = null}>-->
<!--    <ReportSlot config={reportConfigsObject[reportKey]}-->
<!--                model={reportModels[reportKey]}-->
<!--                on:report={e => setReport(e.detail)}/>-->
<!--</Modal>-->