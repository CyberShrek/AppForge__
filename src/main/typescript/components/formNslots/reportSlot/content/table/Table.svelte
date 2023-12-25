<script lang="ts">

    import {ReportWizard} from "../../ReportWizard"
    import {resolveStyle} from "../../../../../util/resolver"
    import {TableWizard} from "./TableWizard"
    import {scrollIntoElement} from "../../../../../util/domWizard"
    import {XlsxAccessor} from "../../../../../api/XlsxAccessor"
    import Fix from "../../../../misc/Fix.svelte"
    import Button from "../../../../input/Button.svelte"
    import TableHead from "./Head.svelte"
    import TableFoot from "./Foot.svelte"
    import TableBody from "./Body.svelte"
    import CheckboxTreeManager from "./CheckboxTreeManager.svelte";

    resolveStyle("table")

    export let
        config: TableConfig,
        report: ReportWizard,
        submittedApiAction: SubmittedApiAction,
        xlsxAccessor: XlsxAccessor

    let rootElement: HTMLDivElement,
        table: TableWizard,
        // Determines the currently selected page index
        pickedPageNumber: number,
        // Filtered by head filters
        filtratedRowsI: number[] = [],
        checkedRowsBool: boolean[] = []

    $: if(config && report && rootElement)
        table = new TableWizard(report, config, rootElement)

    function handleScroll(){
        const top = rootElement.getClientRects().item(0).top
        if (top < -1 || top > 1) {
            console.log(top)
            scrollIntoElement(rootElement)
        }
    }

</script>

<div class="table"
     bind:this={rootElement}
     on:scroll={handleScroll}>

    {#if table}
        <table on:load={() => xlsxAccessor = new XlsxAccessor(table.createXlsxModel())}>

            <TableHead {table}
                       bind:pickedPageNumber
                       bind:filtratedRowsI
                       bind:checkedRowsBool/>

            <TableFoot {table}
                       totalRow={filtratedRowsI ? table.getTotalRowForIndices(filtratedRowsI) : []}/>

            <TableBody {table}
                       {filtratedRowsI}
                       {pickedPageNumber}
                       bind:checkedRowsBool
                       on:action={event => submittedApiAction = event.detail}/>
        </table>
    {/if}

    {#if checkedRowsBool?.find(check => check)}
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
                            pickedData: table.data.filter((_, i) => checkedRowsBool[i] === true)
                        }}
                />
            {/each}
        </Fix>
    {/if}

</div>