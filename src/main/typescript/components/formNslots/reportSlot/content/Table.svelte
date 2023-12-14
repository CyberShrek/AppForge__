<script lang="ts">

    import {ReportModelWizard} from "../ReportModelWizard"
    import {resolveStyle} from "../../../../util/resolver"
    import {TableWizard} from "./TableWizard"
    import {scrollIntoElement} from "../../../../util/domWizard"
    import Fix from "../../../misc/Fix.svelte"
    import Button from "../../../input/Button.svelte"
    import {XlsxAccessor} from "../../../../api/XlsxAccessor"
    import TableHead from "./TableHead.svelte"
    import TableFoot from "./TableFoot.svelte"
    import TableBody from "./TableBody.svelte"

    resolveStyle("table")

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard,
        submittedApiAction: SubmittedApiAction,
        xlsxAccessor: XlsxAccessor

    let rootElement: HTMLDivElement,
        tableWizard: TableWizard,
        checkedRowsSet = new Set<RowData>(),
        // Determines the currently selected page index
        pickedPageI = 0,
        // Data filtered by head filters
        filteredData: MatrixData

    $: if(config && modelWizard)
        tableWizard = new TableWizard(modelWizard, config)

    $: if(rootElement)
        xlsxAccessor = new XlsxAccessor(tableWizard.convertHtmlTableToXlsxModel(rootElement.querySelector("table")))

    $: allRowsAreChecked = checkedRowsSet.size === modelWizard.properData.length

    $: totalRow = tableWizard?.getMatrixTotal(filteredData)

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
                       bind:pickedPageI
                       bind:filteredData
                       bind:checked={allRowsAreChecked}/>

            <TableFoot {tableWizard}
                       {totalRow}/>

            <TableBody {tableWizard}
                       {filteredData}
                       {totalRow}
                       {pickedPageI}
                       bind:checkedRowsSet
                       on:action={event => submittedApiAction = event.detail}/>
        {/if}
    </table>

    {#if tableWizard.hasCheckboxes && checkedRowsSet.size > 0}
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