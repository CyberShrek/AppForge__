<script lang="ts">

    import {ReportModelWizard} from "../../../model/ReportModelWizard"
    import Table from "./content/Table.svelte"
    import {resolveStyle} from "../../../util/resolver"
    import Label from "./content/Label.svelte"
    import Button from "../../input/Button.svelte"
    import {exportAsJpeg, toggleFullscreen} from "../../../util/domWizard"
    import {slide} from "svelte/transition"
    import {deepCopyOf} from "../../../util/data";
    import {ReportAccessor} from "../../../api/ReportAccessor"
    import {createEventDispatcher} from "svelte"
    import Charts from "./content/Charts.svelte"
    import {XlsxAccessor} from "../../../api/XlsxAccessor"
    import Context from "./content/Context.svelte";

    resolveStyle("report")

    const dispatch = createEventDispatcher()

    export let
        config: ReportSlotConfig,
        model:  ReportModel

    let rootElement: HTMLDivElement,
        collapsed = false,
        submittedApiAction: SubmittedApiAction,
        xlsxAccessor: XlsxAccessor,
        chartsElement: HTMLDivElement,
        showCharts = model?.charts && !model?.table

    $: modelWizard = model && new ReportModelWizard(model)

    $: if (submittedApiAction)
        dispatchNewReport()

    async function dispatchNewReport(){
        const reportModel = await new ReportAccessor(submittedApiAction.fetchReport)
            .fetch({...model.usedOptions, data: submittedApiAction.pickedData})

        reportModel.usedValues = deepCopyOf(model.usedValues)
        reportModel.usedData = deepCopyOf(submittedApiAction.pickedData)
        dispatch("report", reportModel)
    }

</script>

<div class="report" bind:this={rootElement}>
    <div class="head">
        <h3>{model?.title ? model.title : config.title}</h3>
        {#if model}
            {#if model?.charts && model?.table}
                <Button image="graph.svg"
                        unavailable={collapsed}
                        hint="Графическое представление"
                        on:click={() => showCharts = !showCharts}/>
            {/if}
            {#if model?.charts && showCharts}
                <Button image="download.svg"
                        unavailable={collapsed}
                        hint="Экспортировать графики в .jpg"
                        on:click={() => exportAsJpeg(chartsElement, modelWizard.model.title)}/>
            {/if}
            {#if model?.table}
                <Button image="download.svg"
                        hint="Экспортировать таблицу в .xlsx"
                        on:click={() => xlsxAccessor?.fetch()}/>
            {/if}
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
            {#if model.context}
                <Context {modelWizard}/>
            {/if}
            {#if model.labels}
                <div class="labels">
                    {#each model.labels as labelConfig}
                        <Label config={labelConfig}
                               data={modelWizard.totalRow}
                        />
                    {/each}
                </div>
            {/if}
            {#if model.charts}
                <Charts configs={model.charts} {modelWizard} show={showCharts} bind:rootElement={chartsElement}/>
            {/if}
            {#if model.table}
                <Table config={model.table} {modelWizard} bind:submittedApiAction bind:xlsxAccessor/>
            {/if}
        </div>
    {/if}
</div>
