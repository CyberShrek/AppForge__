<script lang="ts">

    import {ReportModelWizard} from "../../../model/ReportModelWizard"
    import Table from "./content/Table.svelte"
    import {resolveStyle} from "../../../util/resolver"
    import Label from "./content/Label.svelte"
    import Button from "../../input/Button.svelte"
    import {exportAsJpeg, getFullscreenElement, scrollIntoElement, toggleFullscreen} from "../../../util/domWizard"
    import {slide} from "svelte/transition"
    import {compare, deepCopyOf} from "../../../util/data";
    import {ReportAccessor} from "../../../api/ReportAccessor"
    import {afterUpdate, createEventDispatcher} from "svelte"
    import Charts from "./content/Charts.svelte"
    import {XlsxAccessor} from "../../../api/XlsxAccessor"
    import Context from "./content/Context.svelte";
    import ToTopButton from "../../misc/ToTopButton.svelte";

    resolveStyle("report")

    const dispatch = createEventDispatcher()

    export let
        config: ReportSlotConfig,
        model:  ReportModel

    let rootElement: HTMLDivElement,
        prevModel: ReportModel,
        collapsed = false,
        submittedApiAction: SubmittedApiAction,
        xlsxAccessor: XlsxAccessor,
        chartsElement: HTMLDivElement,
        showCharts = model?.charts && !model?.table,
        fullScreen = false

    $: modelWizard = model && new ReportModelWizard(model)

    $: if(modelWizard)
        collapsed = false

    $: if (submittedApiAction)
        dispatchNewReport()

    async function dispatchNewReport(){
        const reportModel = await new ReportAccessor(submittedApiAction.linkToReport)
            .fetch({
                ...model.usedOptions,
                ...model.usedValues,
                pickedData: submittedApiAction.pickedData})

        reportModel.usedValues = deepCopyOf(model.usedValues)
        reportModel.usedData = deepCopyOf(submittedApiAction.pickedData)
        dispatch("report", reportModel)
    }

    window.addEventListener("fullscreenchange", () => {
        fullScreen = getFullscreenElement() === rootElement
    })

    $: if(!collapsed && model?.data?.length > 0 && !compare(model, prevModel)) {
        setTimeout(() => scrollIntoElement(rootElement), 100)
        prevModel = deepCopyOf(model)
    }

</script>

<div class="report" bind:this={rootElement}>
    <div class="head">
        <h3>{model?.title ? model.title : config.title}</h3>
        {#if model && modelWizard.properData.length > 0}
            {#if !config.modal}
                <ToTopButton/>
            {/if}
            {#if model.charts && showCharts}
                <Button unavailable={collapsed}
                        hint="Экспортировать графики в .jpeg"
                        text=".jpeg"
                        on:click={() => exportAsJpeg(chartsElement, modelWizard.model.title)}/>
            {/if}
            {#if model.charts && model.table}
                <Button image="graph.svg"
                        unavailable={collapsed}
                        hint="Графическое представление"
                        on:click={() => showCharts = !showCharts}/>
            {/if}
            {#if model.table}
                <Button image="download.svg"
                        hint="Экспортировать таблицу в .xlsx"
                        on:click={() => xlsxAccessor?.fetch()}/>
            {/if}
            {#if !config.modal}
                <Button image="collapse.svg"
                        hint={collapsed ? "Развернуть" : "Свернуть"}
                        on:click={() => collapsed = !collapsed}/>
            {/if}
            <Button image={fullScreen ? "restore.svg" : "expand.svg"} hint={fullScreen ? "Нормальный вид" : "На весь экран"} on:click={() => toggleFullscreen(rootElement)}/>
            {#if config.modal}
                <Button image="close.svg"
                        hint="Закрыть"
                        on:click={() => window.dispatchEvent(new KeyboardEvent("keydown",{ key: "Escape" }))}/>
            {/if}
        {/if}
    </div>
    {#if model && !collapsed && modelWizard.properData.length > 0}
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
