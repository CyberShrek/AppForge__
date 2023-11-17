<script lang="ts">

    import {ReportModelWizard} from "../../../model/ReportModelWizard"
    import Table from "./content/Table.svelte"
    import {resolveStyle} from "../../../util/resolver";
    import Label from "./content/Label.svelte";
    import Chart from "./content/Chart.svelte";

    resolveStyle("report")

    export let
        config: ReportSlotConfig,
        model:  ReportModel,
        submittedApiAction: SubmittedApiAction

    $: console.log(submittedApiAction)

    $: modelWizard = model && new ReportModelWizard(model)

</script>

<div class="report">
    <div class="head"><p>{model?.title ? model.title : config.title}</p></div>
    {#if model}
        <div class="body">
            {#each Object.keys(model) as modelKey}
                {#if      modelKey === "table"}<Table config={model[modelKey]} {modelWizard} bind:submittedApiAction/>
                {:else if modelKey === "charts"}
                    <div class="charts">
                        {#each model.charts as chart}
                            <div class="chart">
                                <Chart data={modelWizard.properData}
                                       config={chart}/>
                            </div>
                        {/each}
                    </div>
                {:else if modelKey === "labels"}
                    <div class="labels">
                        {#each model.labels as labelConfig}
                            <Label config={labelConfig}
                                   data={modelWizard.totalRow}
                            />
                        {/each}
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>