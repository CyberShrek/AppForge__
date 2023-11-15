<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {resolveStyle} from "../../../../util/resolver"
    import {TableWizard} from "./TableWizard"
    import {tableTotalWord} from "../../../../properties"
    import {scrollIntoElement} from "../../../../util/domWizard"
    import Fix from "../../../misc/Fix.svelte"
    import Button from "../../../input/Button.svelte"
    import {valueOrDefault} from "../../../../util/data"
    import TableRowsGroup from "./TableBodyRowsGroup.svelte";

    resolveStyle("table")

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard,
        submittedApiAction: SubmittedApiAction,
        contextOptions: Map<string, OptionsMap> = new Map()

    let rootElement: HTMLDivElement,
        tableElement: HTMLTableElement,
        tableWizard: TableWizard,
        checkedRowsI: number[] = []

    $: if(config && modelWizard)
        tableWizard = new TableWizard(modelWizard, config)

    // $: if(tableElement && config.columnFeatures)
    //     tableWizard.groupRows(tableElement.tBodies.item(0).rows)

    $: allRowsAreChecked =
        checkedRowsI.length === modelWizard.properData.length

    function togglePickAll() {
        checkedRowsI = allRowsAreChecked ? [] : modelWizard.properData.map((_, index) => index)
    }

    function scrollUp(){
        const top = rootElement.getClientRects().item(0).top
        if (top < -1 || top > 1) {
            scrollIntoElement(rootElement)
        }
    }

    function prepareCellText(cellData: CellData, colI: number): string{
        let result: string

        config.columnFeatures?.[colI]?.useOptions?.fromFields?.forEach(field => {
            if(!result)
                result = contextOptions.get(field)?.get(String(cellData))
        })

        return String(valueOrDefault(result, cellData))
    }

    function toggleCellCheckbox(event: Event){
        if((event.target as HTMLElement)?.tagName === "TD") {
            (event.target as HTMLTableCellElement).querySelector("input").click()
        }
    }

</script>


<div class="table"
     bind:this={rootElement}
     on:scroll={scrollUp}>
    <table bind:this={tableElement}>
        <thead>
        {#each config.head as headRow, rowI}
            <tr>
                {#if config.checkboxes && rowI === 0}
                    <th class="checkbox"
                        rowspan={config.head.length}>
                        <input type="checkbox"
                               on:change={togglePickAll}
                               bind:checked={allRowsAreChecked}/>
                    </th>
                {/if}
                {#each headRow as headCell}
                    <th rowspan={headCell.rowspan}
                        colspan={headCell.colspan}>
                        {headCell.value}
                    </th>
                {/each}
            </tr>
        {/each}
        </thead>
        {#if tableWizard}
            <tfoot>
            <tr class="total">
                {#if config.checkboxes}
                    <td class="checkbox"></td>
                {/if}
                <td colspan={tableWizard.primaryColumnsNumber}>
                    {tableTotalWord}
                </td>
                {#each modelWizard.totalRow as totalCellData, i}
                    {#if i >= tableWizard.primaryColumnsNumber}
                        <td class={typeof totalCellData}>
                            {totalCellData}
                        </td>
                    {/if}
                {/each}
            </tr>
            </tfoot>
            <tbody>
            <TableRowsGroup matrixData={modelWizard.properData}
                            columnFeatures={config.columnFeatures}
                            {tableWizard}/>

                <!--{#each modelWizard.properData as rowData, rowI}-->
                <!--    <tr i={rowI}>-->
                <!--        {#if config.checkboxes}-->
                <!--            <td class="checkbox"-->
                <!--                on:click={event => toggleCellCheckbox(event)}>-->
                <!--                <input type="checkbox"-->
                <!--                       bind:group={checkedRowsI}-->
                <!--                       value={rowI}>-->
                <!--            </td>-->
                <!--        {/if}-->
                <!--        {#each rowData as cellData, colI}-->
                <!--            <td class={typeof cellData}-->
                <!--                class:positive={typeof cellData === "number" && cellData > 0 && config.columnFeatures?.[colI]?.colorize?.positive}-->
                <!--                class:negative={typeof cellData === "number" && cellData < 0 && config.columnFeatures?.[colI]?.colorize?.negative}-->
                <!--                class:link={config.columnFeatures?.[colI]?.onClick}-->
                <!--                on:click={() =>{-->
                <!--                    if (config.columnFeatures?.[colI]?.onClick)-->
                <!--                        submittedApiAction = {-->
                <!--                            ...config.columnFeatures[colI].onClick,-->
                <!--                            pickedData: [modelWizard.properData[rowI]]-->
                <!--                        }-->
                <!--                    }}>-->
                <!--                {#if config.columnFeatures?.[colI]?.useImages}-->
                <!--                    <Image name={config.columnFeatures[colI].useImages.associations?.[cellData]}-->
                <!--                           alt={String(cellData)}-->
                <!--                           hint={prepareCellText(cellData, colI)}/>-->
                <!--                    {#if !config.columnFeatures[colI].useImages.hideText}-->
                <!--                        {prepareCellText(cellData, colI)}-->
                <!--                    {/if}-->
                <!--                {:else}-->
                <!--                    {prepareCellText(cellData, colI)}-->
                <!--                {/if}-->
                <!--            </td>-->
                <!--        {/each}-->
                <!--    </tr>-->
                <!--{/each}-->
            </tbody>
        {/if}
    </table>

    {#if checkedRowsI.length > 0 && config.checkboxes}
        <Fix left={true}
             bottom={true}>

            {#each config.checkboxes.actions as action}
                <Button text={action.label}
                        image={action.image}
                        hint={action.hint}
                        on:click={() =>
                        submittedApiAction = {
                            ...action.onClick,
                            pickedData: checkedRowsI.map(i => modelWizard.properData[i])
                        }}
                />
            {/each}
        </Fix>
    {/if}

</div>