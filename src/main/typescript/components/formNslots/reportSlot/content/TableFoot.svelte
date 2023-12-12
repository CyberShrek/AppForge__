<script lang="ts">

    import {TableWizard} from "./TableWizard"

    export let
        tableWizard: TableWizard,
        addTotal = false

</script>

<tfoot>
    {#if addTotal}
        <tr class="total">
            {#if tableWizard.hasCheckboxes}
                <td class="checkbox"></td>
            {/if}
            <td colspan={tableWizard.primaryColumnsNumber}>
                {tableTotalWord}
            </td>
            {#each tableWizard.getMatrixTotal(filteredData) as totalCellData, i}
                {#if i >= tableWizard.primaryColumnsNumber && i < tableWizard.tableWidth}
                    <td class={typeof totalCellData}>
                        {totalCellData}
                    </td>
                {/if}
            {/each}
        </tr>
    {/if}
</tfoot>