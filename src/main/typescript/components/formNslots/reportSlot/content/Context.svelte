<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {popupList, popupTable} from "../../../../util/alert";

    export let
        modelWizard: ReportModelWizard

    function showContextReportData(dataConfig: ContextConfig["reportData"]){

        const dataToShow: MatrixData = modelWizard.properData.map(rowData => {
            let rowDataToShow: RowData = []
            dataConfig.columns.forEach(colI => {
                rowDataToShow.push(rowData[colI])
            })
            return rowDataToShow
        })

        popupTable(dataConfig.title, dataToShow)
    }

</script>

<div class="context">
    {#each modelWizard.visibleContextValues as contextValue}
        <span>{contextValue}</span>
    {/each}
    {#if modelWizard.model.context.reportData}
        {#each modelWizard.model.context.reportData as dataConfig}
            <span class="link" on:click={() => showContextReportData(dataConfig)}>
                {dataConfig.title}
            </span>
        {/each}
    {/if}
</div>