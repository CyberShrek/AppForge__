<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"

    export let
        config: TableConfig,
        wizard: ReportModelWizard

    $: filteredData = wizard.propData

</script>

<div class="table">
    <table>
        <thead>
        {#each config.head as headRow}
            <tr>
                {#each headRow as headCell}
                    <th rowspan={headCell.rowspan}
                        colspan={headCell.colspan}>
                        {headCell.text}
                    </th>
                {/each}
            </tr>
        {/each}
        </thead>
        {#if filteredData}
            <tfoot>
            <tr>
                {#each wizard.calculateClusterTotal(filteredData) as totalCellData}
                    <td>
                        {totalCellData}
                    </td>
                {/each}
            </tr>
            </tfoot>
            <tbody>
            {#each filteredData as rowData}
                <tr>
                    {#each filteredData as cellData}
                        <td>
                            {cellData}
                        </td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        {/if}
    </table>
</div>