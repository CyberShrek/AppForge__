<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import TableCell from "./TableBodyCell.svelte";
    import TableBodyRow from "./TableBodyRow.svelte";

    export let
        matrixData: MatrixData,
        tableWizard: TableWizard,
        columnFeatures: ColumnFeature[],
        size: number = matrixData.length,
        groupSizes: number[] = null,
        nesting = 0

    const innerSizes = []

    $: hasTotal = matrixData.length > 1 && !!columnFeatures[nesting - 1]?.total

    $: sizeIncreaser = Number(hasTotal)

    $: size = matrixData.length + sizeIncreaser

    $: if(groupSizes) {
        if(nesting < tableWizard.primaryColumnsNumber) {
            size = sizeIncreaser
            innerSizes.forEach(innerSize => size += innerSize)
        }
        groupSizes[nesting - 1] = size
    }

</script>

{#if nesting < tableWizard.primaryColumnsNumber}
    {#each tableWizard.splitMatrixByColIndex(matrixData, nesting) as groupData, groupI}
        <svelte:self
                matrixData={groupData}
                {tableWizard}
                {columnFeatures}
                bind:size={innerSizes[groupI]}
                groupSizes={groupSizes ? (groupI === 0 ? groupSizes : groupSizes.map(() => null)) : []}
                nesting={nesting + 1}/>
    {/each}
{:else}
    {#each matrixData as rowData, rowI}
        <TableBodyRow data={rowData}
                      width={tableWizard.tableWidth}
                      features={columnFeatures}
                      primaryColumnsNumber={tableWizard.primaryColumnsNumber}
                      isGroupStart={rowI === 0}
                      groupSizesToSpan={groupSizes}/>
    {/each}
{/if}
{#if hasTotal}
    <TableBodyRow data={tableWizard.getMatrixTotal(matrixData, nesting - 1)}
                  width={tableWizard.tableWidth}
                  primaryColumnsNumber={tableWizard.primaryColumnsNumber}/>
    <tr>
        {#each tableWizard.getMatrixTotal(matrixData, nesting - 1) as cellData, colI}
            {#if colI < tableWizard.tableWidth}
                {#if colI >= nesting || !columnFeatures[colI]?.span}
                    <TableCell data={cellData}
                               feature={columnFeatures[colI]}/>
                {/if}
            {/if}
        {/each}
    </tr>
{/if}


