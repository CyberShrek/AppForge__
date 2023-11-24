<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {popupList, popupTable} from "../../../../util/alert";

    export let
        modelWizard: ReportModelWizard

    function showContextPickedData(dataConfig: ContextConfig["pickedData"]){
        const dataToShow: MatrixData = modelWizard.model.usedData.map(rowData => {
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
    {#if modelWizard.model.context.pickedData}
        {#each modelWizard.model.context.pickedData as dataConfig}
            <span class="link" on:click={() => showContextPickedData(dataConfig)}>
                {dataConfig.title}
            </span>
        {/each}
    {/if}
</div>