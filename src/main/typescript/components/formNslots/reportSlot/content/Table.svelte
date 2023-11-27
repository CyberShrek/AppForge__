<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {resolveStyle} from "../../../../util/resolver"
    import {TableWizard} from "./TableWizard"
    import {tableTotalWord} from "../../../../properties"
    import {scrollIntoElement} from "../../../../util/domWizard"
    import Fix from "../../../misc/Fix.svelte"
    import Button from "../../../input/Button.svelte"
    import TableRowsGroup from "./TableBodyRowsGroup.svelte"
    import Text from "../../../input/Text.svelte"
    import PagesBar from "../../../navigation/PagesBar.svelte"
    import {XlsxAccessor} from "../../../../api/XlsxAccessor"
    import {onMount} from "svelte";

    resolveStyle("table")

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard,
        submittedApiAction: SubmittedApiAction,
        xlsxAccessor: XlsxAccessor

    let rootElement: HTMLDivElement,
        tableWizard: TableWizard,
        checkedRowsSet = new Set<RowData>(),
        filterValues: string[] = [],
        pickedPageI = 0,
        pageSize = modelWizard.properData.length

    $: if(config && modelWizard)
        tableWizard = new TableWizard(modelWizard, config)

    $: allRowsAreChecked =
        checkedRowsSet.size === modelWizard.properData.length

    $: filteredData = tableWizard.getFiltratedData(filterValues)

    $: paginatedData = tableWizard.paginateData(filteredData, pageSize)

    function togglePickAll() {
        if(!allRowsAreChecked)
            checkedRowsSet = new Set(modelWizard.properData)
        else
            checkedRowsSet = new Set()
    }

    function handleScroll(){
        const top = rootElement.getClientRects().item(0).top
        if (top < -1 || top > 1) {
            scrollIntoElement(rootElement)
        }
    }

    onMount(() => {
        xlsxAccessor = new XlsxAccessor(tableWizard.extractXlsxModelUsingElement(rootElement.querySelector("table")))
        pageSize = config.pageSize
    })

</script>

<div class="table"
     bind:this={rootElement}
     on:scroll={handleScroll}>

    <table>
        <thead>
        {#if config.pageSize && modelWizard.properData.length >= config.pageSize}
            <tr class="tool-bar">
                <td colspan={tableWizard.tableWidth + (config.checkboxes ? 1 : 0)}>
                    <PagesBar pageSize={config.pageSize}
                              itemsCount={filteredData.length}
                              bind:pickedPageI/>
                </td>
            </tr>
        {/if}
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
        <tr class="filters-bar">
            {#if config.checkboxes}
                <th class="checkbox"></th>
            {/if}
            {#each Array(tableWizard.tableWidth) as _, i}
                <th>{#if config.columnFeatures?.[i]?.filter}
                        <Text bind:value={filterValues[i]}/>
                    {/if}</th>
            {/each}
        </tr>
        </thead>

        {#if tableWizard}

            <tfoot>
            {#if config.total && filteredData.length > 0}
                <tr class="total">
                    {#if config.checkboxes}
                        <td class="checkbox"></td>
                    {/if}
                    <td colspan={tableWizard.primaryColumnsNumber}>
                        {tableTotalWord}
                    </td>
                    {#each tableWizard.getMatrixTotal(filteredData) as totalCellData, i}
                        {#if i >= tableWizard.primaryColumnsNumber && i < tableWizard.tableWidth}
                            <td class={typeof totalCellData}>
                                {totalCellData}
                            </td>
                        {/if}
                    {/each}
                </tr>
            {/if}
            </tfoot>

            {#each paginatedData as pageData, pageI}
                {#if pageI === pickedPageI}
                    <tbody>
                        <TableRowsGroup matrixData={pageData}
                                        bind:checkedRowsSet
                                        on:apiAction={event => submittedApiAction = event.detail}
                                        {config}
                                        {tableWizard}/>
                    </tbody>
                {/if}
            {/each}
        {/if}
    </table>

    {#if checkedRowsSet.size > 0 && config.checkboxes}
        <Fix framed={true}
             left={true}
             bottom={true}>
            {#if config.checkboxes.title}
                <p>{config.checkboxes.title}</p>
            {/if}
            {#each config.checkboxes.actions as action}
                <Button image={action.image}
                        imageLocation=""
                        hint={action.hint}
                        on:click={() =>
                        submittedApiAction = {
                            linkToReport: action.linkToReport,
                            linkToFile: action.linkToFile,
                            pickedData: Array.from(checkedRowsSet.values())
                        }}
                />
            {/each}
        </Fix>
    {/if}

</div>