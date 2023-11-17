<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {resolveStyle} from "../../../../util/resolver"
    import {TableWizard} from "./TableWizard"
    import {tableTotalWord} from "../../../../properties"
    import {scrollIntoElement} from "../../../../util/domWizard"
    import Fix from "../../../misc/Fix.svelte"
    import Button from "../../../input/Button.svelte"
    import TableRowsGroup from "./TableBodyRowsGroup.svelte"
    import Text from "../../../input/Text.svelte";
    import PagesBar from "../../../navigation/PagesBar.svelte";

    resolveStyle("table")

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard,
        submittedApiAction: SubmittedApiAction

    let rootElement: HTMLDivElement,
        tableWizard: TableWizard,
        checkedRowsSet = new Set<RowData>(),
        filterValues: string[] = [],
        pickedPageI = 0,
        showHeadToolbar = true,
        showFootToolbar = true

    $: if(config && modelWizard)
        tableWizard = new TableWizard(modelWizard, config)

    $: allRowsAreChecked =
        checkedRowsSet.size === modelWizard.properData.length

    $: paginatedData =
        tableWizard.paginateData(tableWizard.getFiltratedData(filterValues), config.pageSize)

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
            showHeadToolbar = false
            showFootToolbar = false
        }
    }

</script>

<div class="table"
     bind:this={rootElement}
     on:scroll={handleScroll}>

    <table>
        <thead on:mouseenter={() => showHeadToolbar = true}>
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
            <tr class="tools"
                class:collapsed={!showHeadToolbar}>
                {#if config.checkboxes}
                    <th class="checkbox"></th>
                {/if}
                {#each Array(tableWizard.tableWidth) as _, i}
                    <th>
                        {#if config.columnFeatures?.[i]?.filter}
                            <Text bind:value={filterValues[i]}/>
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>

        {#if tableWizard}

            <tfoot on:mouseenter={() => showFootToolbar = true}>
            {#if config.total}
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
            {/if}
            {#if paginatedData.length > 1}
                <tr class="tools"
                    class:collapsed={!showFootToolbar}>
                    <td colspan={tableWizard.tableWidth + (config.checkboxes ? 1 : 0)}>
                        <PagesBar size={paginatedData.length}
                                  bind:picked={pickedPageI}/>
                    </td>
                </tr>
            {/if}
            </tfoot>

            {#each paginatedData as pageData, pageI}
                {#if pageI === pickedPageI}
                    <tbody>
                        <TableRowsGroup matrixData={pageData}
                                        bind:checkedRowsSet
                                        {config}
                                        {tableWizard}/>
                    </tbody>
                {/if}
            {/each}
        {/if}
    </table>

    {#if checkedRowsSet.size > 0 && config.checkboxes}
        <Fix left={true}
             bottom={true}>

            {#each config.checkboxes.actions as action}
                <Button text={action.label}
                        image={action.image}
                        hint={action.hint}
                        on:click={() =>
                        submittedApiAction = {
                            ...action.onClick,
                            pickedData: Array.from(checkedRowsSet.values())
                        }}
                />
            {/each}
        </Fix>
    {/if}

</div>