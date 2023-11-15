<script lang="ts">

    import TableCell from "./TableBodyCell.svelte"

    export let
        data: RowData,
        width: number,
        features: ColumnFeature[] = [],
        primaryColumnsNumber: number = 0,
        primaryGroupSizes: number[] = [],
        isGroupStart = false,
        collapsed = false

    // Primary column number is the first not-null item in the primaryGroupSizes array
    $: primaryColumnNumber = primaryGroupSizes.findIndex(size => size !== null)

</script>
<tr class:collapsed>
    {#each data as cellData, colI}
        {#if colI < width}
            {#if   colI >= primaryColumnsNumber
                || !features[colI]?.span
                || primaryGroupSizes[colI] && isGroupStart
            }
                <TableCell data={cellData}
                           feature={features[colI]}
                           rowSpan={isGroupStart && features[colI]?.span && primaryGroupSizes[colI] !== null && primaryGroupSizes[colI] ? primaryGroupSizes[colI] : 1}/>
            {/if}
        {/if}
    {/each}
</tr>