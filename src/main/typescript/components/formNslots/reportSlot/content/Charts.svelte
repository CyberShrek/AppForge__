<script lang="ts">
    import Chart from "./Chart.svelte"
    import Button from "../../../input/Button.svelte"
    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {exportAsJpeg} from "../../../../util/domWizard"

    export let
        modelWizard: ReportModelWizard,
        configs: ChartConfig[]

    let rootElement: HTMLDivElement

</script>

<div class="charts"
     bind:this={rootElement}>

    {#each configs as chart}
        <div class="chart">
            <Chart data={modelWizard.properData}
                   config={chart}/>
        </div>
    {/each}
</div>