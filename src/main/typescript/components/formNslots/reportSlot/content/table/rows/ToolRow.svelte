<script lang="ts">
    import PagesBar from "../../../../../navigation/PagesBar.svelte"
    import {TableWizard} from "../TableWizard"

    export let
        table: TableWizard,
        filtratedRowsI: number[],
        pickedPageNumber: number

</script>

<tr class="tool-bar">
    <td colspan={(table.data[0]?.length ?? 0)+ Number(table.hasCheckboxes)}>
        {#if filtratedRowsI}
            <PagesBar pageSize={table.pageSize}
                      itemsCount={filtratedRowsI.length}
                      bind:pickedPageNumber/>
        {/if}
    </td>
</tr>