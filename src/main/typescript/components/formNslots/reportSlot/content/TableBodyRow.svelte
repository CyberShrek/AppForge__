<script lang="ts">

    import Button from "../../../input/Button.svelte"
    import {TableWizard} from "./TableWizard"
    import TableBodyCell from "./TableBodyCell.svelte"
    import {createEventDispatcher} from "svelte"
    import {getChange, getShare} from "../../../../util/formula"

    const dispatch = createEventDispatcher()

    export let
        data: RowData,
        totalData: RowData = [],
        table: TableWizard,
        primaryGroupSizes: number[] = [],
        checked = false,
        totalColI = -1,
        isGroupStart = false,
        collapseStartIndex: number = -1

    let collapseButtonsValues: boolean[] = []

    $: if(collapseStartIndex === -1)
        collapseButtonsValues = []
    else
        collapseButtonsValues[collapseStartIndex] = true

    const getMeta = (colI: number) => table.columnMetas[colI]

    function toggleCollapse(colI: number) {
        collapseButtonsValues[colI] = !collapseButtonsValues[colI]
        dispatch(collapseButtonsValues[colI] ? 'collapse' : 'expand', colI)
    }

    function toggleCellCheckbox(event: Event){
        if((event.target as HTMLElement)?.tagName === "TD") {
            (event.target as HTMLTableCellElement).querySelector("input")?.click()
        }
    }

    function interceptActionEvent(event: CustomEvent<SubmittedApiAction>) {
        event.detail.pickedData.push(data)
        dispatch("action", event.detail)
    }

</script>
{#if data}
    <tr>
        {#if table.hasCheckboxes}
            <td class="checkbox" on:click={event => toggleCellCheckbox(event)}>
                {#if totalColI <= -1}
                    <input type="checkbox"
                           bind:checked
                           value={data}>
                {/if}
            </td>
        {/if}
        {#each data as cellValue, colI}
            {#if getMeta(colI) && (
                colI >= table.primaryColumnsNumber - 1
                || !getMeta(colI)?.totalize && (totalColI === -1 || colI < totalColI)
                || primaryGroupSizes?.[colI] && isGroupStart)}

               <TableBodyCell value={cellValue}
                              meta={getMeta(colI)}
                              rowSpan={isGroupStart && getMeta(colI).totalize && primaryGroupSizes?.[colI] ? primaryGroupSizes?.[colI] : 1}
                              colSpan={totalColI > -1 && colI === table.primaryColumnsNumber - 1 ? table.primaryColumnsNumber - totalColI : 0}
                              collapsed={collapseStartIndex !== -1 && colI > collapseStartIndex}
                              on:action={interceptActionEvent}>

                   {#if isGroupStart && getMeta(colI)?.totalize && (colI === 0 || table.firstInnerTotalIndex < colI && primaryGroupSizes?.[colI] > 1)}
                       <Button text={collapseButtonsValues?.[colI] ? "▼" : "▲"}
                               on:click={(ev) => {
                                   ev.stopPropagation()
                                   toggleCollapse(colI)
                               }}/>
                   {/if}

               </TableBodyCell>
            {/if}
        {/each}
    </tr>
{/if}