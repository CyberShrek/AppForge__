<script lang="ts">

    import TableCell from "./TableBodyCell.svelte"
    import Button from "../../../input/Button.svelte"
    import {createEventDispatcher} from 'svelte'

    export let
        data: RowData,
        width: number,
        features: ColumnFeature[] = [],
        primaryColumnsNumber: number = 0,
        primaryGroupSizes: number[] = [],
        addCheckbox = false,
        checkedRowsData: MatrixData = [],
        totalColI = -1,
        isGroupStart = false,
        collapseStartIndex: number = -1

    const dispatch = isGroupStart ? createEventDispatcher() : null

    let collapseButtonsValues: boolean[] = []

    $: if(collapseStartIndex === -1)
        collapseButtonsValues = []

    function toggleCollapse(colI: number) {
        collapseButtonsValues[colI] = !collapseButtonsValues[colI]
        dispatch(collapseButtonsValues[colI] ? 'collapse' : 'expand', colI)
    }

    function toggleCellCheckbox(event: Event){
        if((event.target as HTMLElement)?.tagName === "TD") {
            (event.target as HTMLTableCellElement).querySelector("input")?.click()
        }
    }

</script>
<tr>
    {#if addCheckbox}
        <td class="checkbox" on:click={event => toggleCellCheckbox(event)}>
            {#if totalColI <= -1}
                <input type="checkbox"
                       bind:group={checkedRowsData}
                       value={data}>
            {/if}
        </td>
    {/if}
    {#each data as cellData, colI}
        {#if colI < width}
            {#if   colI >= primaryColumnsNumber - 1
                || !features[colI]?.totalize && (totalColI === -1 || colI < totalColI) && (!addCheckbox || colI > 0)
                || primaryGroupSizes[colI] && isGroupStart
            }
                <TableCell data={cellData}
                           feature={features[colI]}
                           rowSpan={isGroupStart && features[colI]?.totalize && primaryGroupSizes[colI] ? primaryGroupSizes[colI] : 1}
                           colSpan={totalColI > -1 && colI === primaryColumnsNumber - 1 ? primaryColumnsNumber - totalColI : 0}
                           total={totalColI > -1 && colI >= totalColI}
                           collapsed={collapseStartIndex !== -1 && colI > collapseStartIndex}>

                    {#if isGroupStart && features[colI]?.totalize && (colI === 0 || features.findIndex(feature => feature?.totalize) < colI) && primaryGroupSizes[colI] > 1}
                        <Button text={collapseButtonsValues[colI] ? '➕' : '➖'}
                                on:click={() => toggleCollapse(colI)}/>
                    {/if}

                </TableCell>
            {/if}
        {/if}
    {/each}
</tr>