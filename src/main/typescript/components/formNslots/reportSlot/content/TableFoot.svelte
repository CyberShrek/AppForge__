<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import {tableText} from "../../../../properties";

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
                {tableText.foot.total}
            </td>
            {#each tableWizard.getMatrixTotal(tableWizard.filteredData) as cellData, i}
                {#if i >= tableWizard.primaryColumnsNumber}
                    <td class={typeof cellData}>
                        {cellData}
                    </td>
                {/if}
            {/each}
        </tr>
    {/if}
</tfoot>