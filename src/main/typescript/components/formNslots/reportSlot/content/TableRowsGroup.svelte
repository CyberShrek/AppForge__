<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import {ReportModelWizard} from "../../../../model/ReportModelWizard";
    import TableCell from "./TableCell.svelte";

    export let
        matrixData: MatrixData,
        tableWizard: TableWizard,
        groupSizes: number[] = null,
        nesting = 0

    groupSizes?.push(matrixData.length)


</script>

{#if nesting < tableWizard.primaryColumnsNumber}
    {#each tableWizard.splitMatrixByColIndex(matrixData, nesting) as groupData, groupI}
        <svelte:self
                matrixData={groupData}
                {tableWizard}
                groupSizes={groupSizes ? (groupI === 0 ? [...groupSizes] : groupSizes.map(() => null)) : []}
                nesting={nesting + 1}/>
    {/each}
{:else}
    {#each matrixData as rowData, rowI}
        <tr>
            {#each rowData as cellData, colI}
                {#if colI < tableWizard.tableWidth}
                    {#if colI >= nesting || groupSizes[colI] && rowI === 0}
                        <TableCell data={cellData}
                                   feature={tableWizard.getFeature(colI)}
                                   rowSpan={colI < nesting ? groupSizes[colI] : 1}/>
                    {/if}
                {/if}
            {/each}
        </tr>
    {/each}
{/if}


