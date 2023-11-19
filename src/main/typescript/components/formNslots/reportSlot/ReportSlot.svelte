<script lang="ts">

    import {ReportModelWizard} from "../../../model/ReportModelWizard"
    import Table from "./content/Table.svelte"
    import {resolveStyle} from "../../../util/resolver"
    import Label from "./content/Label.svelte"
    import Chart from "./content/Chart.svelte"
    import Button from "../../input/Button.svelte"
    import {toggleFullscreen} from "../../../util/domWizard"
    import {slide} from "svelte/transition"

    resolveStyle("report")

    export let
        config: ReportSlotConfig,
        model:  ReportModel,
        submittedApiAction: SubmittedApiAction

    let rootElement: HTMLDivElement,
        collapsed = false

    $: console.log(submittedApiAction)

    $: modelWizard = model && new ReportModelWizard(model)

</script>
<div class="report" bind:this={rootElement}>
    <div class="head">
        <p>{model?.title ? model.title : config.title}</p>
        {#if !config.isModal}
            <Button image="collapse.svg"
                    hint={collapsed ? "Развернуть" : "Свернуть"}
                    on:click={() => collapsed = !collapsed}/>
        {/if}
        <Button image="expand.svg" hint="На весь экран" on:click={() => toggleFullscreen(rootElement)}/>
    </div>
    {#if model && !collapsed}
        <div class="body"
             transition:slide>
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
                {:else if modelKey === "html"}
                    <div class="html">{@html model.html}</div>
                {/if}
            {/each}
        </div>
    {/if}
</div>