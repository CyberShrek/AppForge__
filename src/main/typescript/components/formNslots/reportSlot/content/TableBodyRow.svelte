<script lang="ts">

    import TableCell from "./TableBodyCell.svelte"

    export let
        data: RowData,
        width: number,
        features: ColumnFeature[] = [],
        primaryColumnsNumber: number = 0,
        groupSizesToSpan: number[] = [],
        isGroupStart = false,
        collapsed = false

</script>

<tr class:collapsed>
    {#each data as cellData, colI}
        {#if colI < width}
            {#if colI >= primaryColumnsNumber || !features[colI]?.span || groupSizesToSpan[colI] && isGroupStart}
                <TableCell data={cellData}
                           feature={features[colI]}
                           rowSpan={isGroupStart && features[colI]?.span && !!groupSizesToSpan[colI] ? groupSizesToSpan[colI] : 1}/>
            {/if}
        {/if}
    {/each}
</tr>