<script lang="ts">
    import {TableWizard} from "./TableWizard"
    import ProperTableRow from "./ProperTableRow.svelte"

    export let
        table: TableWizard,
        pickedPageNumber: number,
        checkedRowsBool: boolean[] = [],
        filtratedRowsI: number[] = []

    function rowIIsVisible(rowI: number): boolean {
        const
            minI = (pickedPageNumber - 1) * table.pageSize,
            maxI = pickedPageNumber * table.pageSize

        return rowI >= minI && rowI <= maxI
    }

    $: if(pickedPageNumber){
        console.log("Page changed")
    }

</script>

<tbody>
{#each filtratedRowsI as filtratedRowI}
    {#if pickedPageNumber && rowIIsVisible(filtratedRowI)}
        <ProperTableRow data={table.data[filtratedRowI]}
                        addCheckbox={!!table.config.checkboxAction}
                        bind:checked={checkedRowsBool[filtratedRowI]}/>
    {/if}
{/each}
</tbody>