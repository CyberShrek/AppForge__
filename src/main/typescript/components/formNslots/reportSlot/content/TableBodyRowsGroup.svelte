<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import TableBodyRow from "./TableBodyRow.svelte"

    export let
        matrixData: MatrixData,
        totalRow: RowData,
        table: TableWizard,
        size: number = null,
        groupSizes: number[] = null,
        checkedRowsSet: Set<RowData>,
        collapseStartIndex: number = -1,
        nesting = 0

    $: innerSizes = [matrixData.length]

    let checkedRows: boolean[] = []

    $: totalize = matrixData.length > 1 && !!table.columnMetas?.[nesting - 1]?.totalize

    // The sum of all inner sizes + 1 if has total
    $: size = innerSizes.reduce((sum, size) => sum + size, Number(totalize))

    // Insert the size of current group
    $: if(innerSizes && groupSizes)
        groupSizes[nesting - 1] = size

    // Insert checked rows
    $: if(checkedRows) updateCheckedRowsSet()
    $: if(checkedRowsSet) updateCheckedRows()

    function updateCheckedRowsSet() {
        checkedRows.forEach((checked, rowI) => {
            if (checked)
                checkedRowsSet.add(matrixData[rowI])
            else
                checkedRowsSet.delete(matrixData[rowI])
        })
        checkedRowsSet = checkedRowsSet
    }

    function updateCheckedRows() {
        matrixData.forEach((rowData, rowI) =>
            checkedRows[rowI] = checkedRowsSet.has(rowData))
    }

    function toggleCollapse(collapse: boolean, targetIndex: number) {
        if(targetIndex === nesting - 1)
            collapseStartIndex = collapse ? targetIndex : -1
    }

</script>

{#if nesting < table.primaryColumnsNumber - 1}
    {#each table.splitMatrixByColIndex(matrixData, nesting) as groupData, groupI}
        <svelte:self
                matrixData={groupData}
                {table}
                bind:size={innerSizes[groupI]}
                bind:checkedRowsSet
                groupSizes={groupSizes === null ? [] : (groupI === 0 ? [...groupSizes] : groupSizes.map((size, index) => index < nesting ? null : size))}
                nesting={nesting + 1}
                on:collapse={event => toggleCollapse(true,  event.detail)}
                on:expand={  event => toggleCollapse(false, event.detail)}
                on:apiAction
                {collapseStartIndex}/>
    {/each}
{:else}
    {#each matrixData as rowData, rowI}
        <TableBodyRow data={rowData}
                      totalData={totalRow}
                      {table}
                      isGroupStart={rowI === 0}
                      primaryGroupSizes={groupSizes}
                      {collapseStartIndex}
                      bind:checked={checkedRows[rowI]}
                      on:collapse
                      on:collapse={event => toggleCollapse(true,  event.detail)}
                      on:expand
                      on:expand={  event => toggleCollapse(false, event.detail)}
                      on:action/>
    {/each}
{/if}
{#if totalize}
    <TableBodyRow data={table.getMatrixTotal(matrixData, nesting - 1)}
                  {table}
                  totalColI={nesting}
                  collapseStartIndex={collapseStartIndex > -1 && collapseStartIndex < nesting - 1 ? collapseStartIndex : -1}/>
{/if}