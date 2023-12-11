<script lang="ts">

    import {ReportModelWizard} from "../ReportModelWizard"
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
    import TableHead from "./TableHead.svelte";

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
        pickedPageI = 0

    $: if(config && modelWizard)
        tableWizard = new TableWizard(modelWizard, config)

    $: if(rootElement)
        xlsxAccessor = new XlsxAccessor(tableWizard.convertHtmlTableToXlsxModel(rootElement.querySelector("table")))

    $: allRowsAreChecked =
        checkedRowsSet.size === modelWizard.properData.length

    $: filteredData = tableWizard.getFiltratedData(filterValues)

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

</script>

<div class="table"
     bind:this={rootElement}
     on:scroll={handleScroll}>

    <table>

        {#if tableWizard}

            <TableHead {tableWizard}
                       on:check={togglePickAll}
                       bind:checked={allRowsAreChecked}>

                <PagesBar pageSize={tableWizard.pageSize}
                          itemsCount={filteredData.length}
                          bind:pickedPageI/>

            </TableHead>

            <tfoot>
            {#if config.total && filteredData.length > 0}
                <tr class="total">
                    {#if config.checkboxButtons}
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

            {#each tableWizard.splitData(filteredData, pageSize) as pageData, pageI}
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

    {#if checkedRowsSet.size > 0 && config.checkboxButtons}
        <Fix framed={true}
             left={true}
             bottom={true}>
            {#if config.checkboxButtons.title}
                <p>{config.checkboxButtons.title}</p>
            {/if}
            {#each config.checkboxButtons.actions as action}
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