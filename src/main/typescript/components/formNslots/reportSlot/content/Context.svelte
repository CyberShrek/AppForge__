<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {popupList} from "../../../../util/alert";

    export let
        modelWizard: ReportModelWizard

    function showContextReportData(){

        popupList()
    }

</script>

<div class="context">
    {#each modelWizard.visibleContextValues as contextValue}
        <span>{contextValue}</span>
    {/each}
    {#if modelWizard.model.context.reportData}
        {#each modelWizard.model.context.reportData as dataConfig}
            <span on:click>
                {dataConfig.title}
            </span>
        {/each}
    {/if}
</div>