<script lang="ts">
    
    import {TableWizard} from "./TableWizard"
    import ProperTableRow from "./ProperTableRow.svelte"

    export let
        table: TableWizard,
        rowsI: number[],
        checkedRowsBool: boolean[] = [],
        columnI = 0
    
</script>

{#if columnI < table.primaryColumnsNumber - 1}
    {#each table.splitMatrixByColIndex(matrixData, nesting) as groupData, groupI}
        <svelte:self {table}/>
    {/each}
{:else}
    {#each rowsI as rowI}
        <ProperTableRow data={table.data[rowI]}
                        addCheckbox={!!table.config.checkboxAction}
                        bind:checked={checkedRowsBool[rowI]}/>
    {/each}
{/if}
