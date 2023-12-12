<script lang="ts">
    import Chart from "./Chart.svelte"
    import {ReportModelWizard} from "../ReportModelWizard"
    import {slide} from "svelte/transition"

    export let
        modelWizard: ReportModelWizard,
        configs: ChartMeta[],
        rootElement: HTMLDivElement,
        show = false

</script>

{#if show}
    <div class="charts"
         transition:slide
         bind:this={rootElement}>

        {#each configs as chart}
            <Chart data={modelWizard.data}
                   config={chart}/>
        {/each}
    </div>
{/if}