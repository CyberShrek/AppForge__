<script lang="ts">
    import TableRowsGroup from "./TableBodyRowsGroup.svelte"
    import {TableWizard} from "./TableWizard";

    export let
        tableWizard: TableWizard,
        filteredData: MatrixData,
        totalRow: RowData,
        pickedPageI: number,
        checkedRowsSet: Set<RowData>

</script>

{#each tableWizard.splitDataIntoPages(filteredData) as pageData, pageI}
    {#if pageI === pickedPageI}
        <tbody>
        <TableRowsGroup matrixData={pageData}
                        {totalRow}
                        bind:checkedRowsSet
                        on:action
                        {tableWizard}/>
        </tbody>
    {/if}
{/each}