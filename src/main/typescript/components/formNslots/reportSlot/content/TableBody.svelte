<script lang="ts">
    import TableRowsGroup from "./TableBodyRowsGroup.svelte"
    import {TableWizard} from "./TableWizard";

    export let
        tableWizard: TableWizard,
        checkedRowsSet: Set<RowData>

</script>

{#each tableWizard.splitData(this.filteredData, this.pageSize) as pageData, pageI}
    {#if pageI === tableWizard.pickedPageI}
        <tbody>
        <TableRowsGroup matrixData={pageData}
                        bind:checkedRowsSet
                        on:apiAction
                        {tableWizard}/>
        </tbody>
    {/if}
{/each}