<script lang="ts">
    import Form from "./form/Form.svelte"
    import ReportSlot from "./reportSlot/ReportSlot.svelte"
    import Modal from "../misc/Modal.svelte";

    export let
        formConfig: FormConfig,
        reportConfigsObject: {[configKey: string]: ReportSlotConfig}

    let reportModels: {[reportSlot: string]: ReportModel} = {}

    function setReport(report: ReportModel): void {
        reportModels[report.slot] = report
        reportModels = reportModels
        console.log(report)
    }

</script>

<Form config={formConfig}
      on:report={e => setReport(e.detail)}/>

{#each Object.keys(reportConfigsObject) as reportKey}
    {#if reportConfigsObject[reportKey].modal}
        {#if reportModels[reportKey]}
            <Modal on:close={() => reportModels[reportKey] = null}>
                <ReportSlot config={reportConfigsObject[reportKey]}
                            model={reportModels[reportKey]}
                            on:report={e => setReport(e.detail)}/>
            </Modal>
        {/if}
    {:else}
        <ReportSlot config={reportConfigsObject[reportKey]}
                    model={reportModels[reportKey]}
                    on:report={e => setReport(e.detail)}/>
    {/if}
{/each}