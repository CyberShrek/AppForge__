<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import {tableText} from "../../../../properties";

    export let
        tableWizard: TableWizard,
        totalRow: RowData

</script>

<tfoot>
    {#if totalRow && tableWizard.hasTotal}
        <tr class="total">
            {#if tableWizard.hasCheckboxes}
                <td class="checkbox"></td>
            {/if}
            <td colspan={tableWizard.primaryColumnsNumber}>
                {tableText.foot.total}
            </td>
            {#each totalRow as cell, i}
                {#if i >= tableWizard.primaryColumnsNumber}
                    <td class={typeof cell}>
                        {cell}
                    </td>
                {/if}
            {/each}
        </tr>
    {/if}
</tfoot>