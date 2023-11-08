<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {afterUpdate} from "svelte"
    import {TablePostprocess} from "./TablePostprocess";

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard

    let tableElement: HTMLTableElement

    $: filteredData = modelWizard.propData

    afterUpdate(() => {
    })

</script>

<div class="table">
    <table bind:this={tableElement}>
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
                {#each modelWizard.calculateClusterTotal(filteredData) as totalCellData}
                    {#if config.primaryColumns && config.primaryColumns > 0}
                    <td colspan={config.primaryColumns}>
                        Итого
                    </td>
                    {/if}
                    <td>
                        {totalCellData}
                    </td>
                {/each}
            </tr>
            </tfoot>
            <tbody>
            {#each filteredData as rowData}
                <tr>
                    {#each rowData as cellData, i}
                        <td class:primary={i < config.primaryColumns}
                            class="{modelWizard.getColumnType(i)}">
                            {cellData}
                        </td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        {/if}
    </table>
</div>