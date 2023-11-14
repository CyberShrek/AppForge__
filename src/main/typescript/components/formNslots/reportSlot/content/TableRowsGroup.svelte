<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import TableCell from "./TableCell.svelte";


    export let
        matrixData: MatrixData,
        tableWizard: TableWizard,
        size: number,
        globalPrimarySizes: number[] = null,
        nesting = 0

    const innerSizes = []

    $: size = matrixData.length

    $: if(globalPrimarySizes) {
        if(nesting < tableWizard.primaryColumnsNumber) {
            size = 0
            innerSizes.forEach(innerSize => size += innerSize)
        }
        globalPrimarySizes[nesting - 1] = size
    }

</script>

{#if nesting < tableWizard.primaryColumnsNumber}
    {#each tableWizard.splitMatrixByColIndex(matrixData, nesting) as groupData, groupI}
        <svelte:self
                matrixData={groupData}
                {tableWizard}
                bind:size={innerSizes[groupI]}
                globalPrimarySizes={globalPrimarySizes ? (groupI === 0 ? globalPrimarySizes : globalPrimarySizes.map(() => null)) : []}
                nesting={nesting + 1}/>
    {/each}
{:else}
    {#each matrixData as rowData, rowI}
        <tr on:click={() => removeRow(rowI)}>
            {#each rowData as cellData, colI}
                {#if colI < tableWizard.tableWidth}
                    {#if colI >= nesting || globalPrimarySizes[colI] && rowI === 0}
                        <TableCell data={cellData}
                                   feature={tableWizard.getFeature(colI)}
                                   rowSpan={colI < nesting ? globalPrimarySizes[colI] : 1}/>
                    {/if}
                {/if}
            {/each}
        </tr>
    {/each}
{/if}


