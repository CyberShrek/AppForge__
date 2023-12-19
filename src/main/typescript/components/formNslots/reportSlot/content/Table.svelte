<script lang="ts">

    import {ReportWizard} from "../ReportWizard"
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
        report: ReportWizard,
        submittedApiAction: SubmittedApiAction,
        xlsxAccessor: XlsxAccessor

    let rootElement: HTMLDivElement,
        table: TableWizard,
        checkedRowsSet = new Set<RowData>(),
        // Determines the currently selected page index
        pickedPageNumber = 0,
        // Data filtered by head filters
        filterValues: string[],
        validRowsCount: number

    $: if(config && report)
        table = new TableWizard(report, config)

    $: if(rootElement)
        xlsxAccessor = new XlsxAccessor(table.convertHtmlTableToXlsxModel(rootElement.querySelector("table")))

    $: allRowsAreChecked = checkedRowsSet.size === report.model.data.length

    function togglePickAll() {
        if(!allRowsAreChecked)
            checkedRowsSet = new Set(report.model.data)
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
        {#if table}

            <TableHead {table}
                       rowsCount={validRowsCount}
                       on:check={togglePickAll}
                       bind:pickedPageNumber
                       bind:filterValues
                       bind:checked={allRowsAreChecked}/>

            <TableFoot {table}
                       totalRow={[]}/>

            <TableBody {table}
                       {filterValues}
                       {pickedPageNumber}
                       bind:validRowsCount
                       bind:checkedRowsSet
                       on:action={event => submittedApiAction = event.detail}/>
        {/if}
    </table>

    {#if !!config.checkboxAction && checkedRowsSet.size > 0}
        <Fix framed={true}
             left={true}
             bottom={true}>
            {#if config.checkboxAction.title}
                <p>{config.checkboxAction.title}</p>
            {/if}
            {#each config.checkboxAction.buttons as action}
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