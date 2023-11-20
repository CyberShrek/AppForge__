<script lang="ts">

    import {ReportModelWizard} from "../../../model/ReportModelWizard"
    import Table from "./content/Table.svelte"
    import {resolveStyle} from "../../../util/resolver"
    import Label from "./content/Label.svelte"
    import Chart from "./content/Chart.svelte"
    import Button from "../../input/Button.svelte"
    import {toggleFullscreen} from "../../../util/domWizard"
    import {slide} from "svelte/transition"
    import {deepCopyOf} from "../../../util/data";
    import {ReportAccessor} from "../../../api/ReportAccessor"
    import {createEventDispatcher} from "svelte"
    import Charts from "./content/Charts.svelte";

    resolveStyle("report")

    const dispatch = createEventDispatcher()

    export let
        config: ReportSlotConfig,
        model:  ReportModel

    let rootElement: HTMLDivElement,
        collapsed = false,
        submittedApiAction: SubmittedApiAction

    $: modelWizard = model && new ReportModelWizard(model)

    $: if (submittedApiAction)
        dispatchNewReport()

    async function dispatchNewReport(){
        const reportModel = await new ReportAccessor(submittedApiAction.fetchReport)
            .fetch({...model.usedOptions, data: submittedApiAction.pickedData})

        reportModel.usedValues = deepCopyOf(model.usedValues)
        dispatch("report", reportModel)
    }

</script>
<div class="report" bind:this={rootElement}>
    <div class="head">
        <p>{model?.title ? model.title : config.title}</p>
        {#if model}
            {#if !config.isModal}
                <Button image="collapse.svg"
                        hint={collapsed ? "Развернуть" : "Свернуть"}
                        on:click={() => collapsed = !collapsed}/>
            {/if}
            <Button image="expand.svg" hint="На весь экран" on:click={() => toggleFullscreen(rootElement)}/>
            {#if config.isModal}
                <Button image="close.svg"
                        hint="Закрыть"
                        on:click={() => window.dispatchEvent(new KeyboardEvent("keydown",{ key: "Escape" }))}/>
            {/if}
        {/if}
    </div>
    {#if model && !collapsed}
        <div class="body"
             transition:slide>
            {#each Object.keys(model) as modelKey}
                {#if      modelKey === "table"}<Table config={model.table} {modelWizard} bind:submittedApiAction/>
                {:else if modelKey === "charts"}<Charts configs={model.charts} {modelWizard}/>
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