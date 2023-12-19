<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import {tableText} from "../../../../properties";

    export let
        table: TableWizard,
        totalRow: RowData

</script>

<tfoot>
    {#if totalRow && table.config.total}
        <tr class="total">
            {#if !!table.config.checkboxAction}
                <td class="checkbox"></td>
            {/if}
            <td colspan={table.primaryColumnsNumber}>
                {tableText.foot.total}
            </td>
            {#each totalRow as cell, i}
                {#if i >= table.primaryColumnsNumber}
                    <td class={typeof cell}>
                        {cell}
                    </td>
                {/if}
            {/each}
        </tr>
    {/if}
</tfoot>