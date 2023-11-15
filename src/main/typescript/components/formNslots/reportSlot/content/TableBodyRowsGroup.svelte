<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import TableBodyRow from "./TableBodyRow.svelte"

    export let
        matrixData: MatrixData,
        tableWizard: TableWizard,
        columnFeatures: ColumnFeature[],
        size: number = null,
        groupSizes: number[] = null,
        nesting = 0

    const innerSizes = [matrixData.length]

    $: hasTotal = matrixData.length > 1 && !!columnFeatures[nesting - 1]?.total

    $: sizeAddition = Number(hasTotal)

    $: size = matrixData.length + sizeAddition

    $: if(groupSizes){
        updateSize()
    }

    function updateSize(){
        if(groupSizes) {
            size = sizeAddition
            innerSizes.forEach(innerSize => size += innerSize)
            groupSizes[nesting - 1] = size
        }
    }

</script>

{#if nesting < tableWizard.primaryColumnsNumber - 1}
    {#each tableWizard.splitMatrixByColIndex(matrixData, nesting) as groupData, groupI}
        <svelte:self
                matrixData={groupData}
                {tableWizard}
                {columnFeatures}
                bind:size={innerSizes[groupI]}
                groupSizes={groupSizes === null ? [] : (groupI === 0 ? groupSizes : groupSizes.map((size, index) => index < nesting ? null : size))}
                nesting={nesting + 1}/>
    {/each}
{:else}
    {#each matrixData as rowData, rowI}
        <TableBodyRow data={rowData}
                      width={tableWizard.tableWidth}
                      features={columnFeatures}
                      primaryColumnsNumber={tableWizard.primaryColumnsNumber}
                      isGroupStart={rowI === 0}
                      primaryGroupSizes={groupSizes}/>
    {/each}
{/if}
<!--{#if hasTotal}-->
<!--    <TableBodyRow data={tableWizard.getMatrixTotal(matrixData, nesting - 1)}-->
<!--                  width={tableWizard.tableWidth}-->
<!--                  primaryColumnsNumber={tableWizard.primaryColumnsNumber}/>-->
<!--    <tr>-->
<!--        {#each tableWizard.getMatrixTotal(matrixData, nesting - 1) as cellData, colI}-->
<!--            {#if colI < tableWizard.tableWidth}-->
<!--                {#if colI >= nesting || !columnFeatures[colI]?.span}-->
<!--                    <TableCell data={cellData}-->
<!--                               feature={columnFeatures[colI]}/>-->
<!--                {/if}-->
<!--            {/if}-->
<!--        {/each}-->
<!--    </tr>-->
<!--{/if}-->


