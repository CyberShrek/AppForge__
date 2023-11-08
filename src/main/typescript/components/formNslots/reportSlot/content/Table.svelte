<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {afterUpdate} from "svelte"
    import {resolveStyle} from "../../../../util/resolver";

    resolveStyle("table")

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard

    let tableElement: HTMLTableElement

    $: filteredData = modelWizard.properData

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
                <td colspan={modelWizard.primaryColumnsNumber}>
                    Итого
                </td>
                {#each modelWizard.getClusterTotal(filteredData) as totalCellData, i}
                    {#if i >= modelWizard.primaryColumnsNumber}
                        <td class="{typeof totalCellData}">
                            {totalCellData}
                        </td>
                    {/if}
                {/each}
            </tr>
            </tfoot>
            {#each modelWizard.getClusterGroups(filteredData) as group}
            <tbody>
            {#each filteredData as rowData}
                <tr>
                    {#each rowData as cellData, i}
                        <td class:primary={i < modelWizard.primaryColumnsNumber}
                            class="{typeof cellData}">
                            {cellData}
                        </td>
                    {/each}
                </tr>
            {/each}
            </tbody>
            {/each}
        {/if}
    </table>
</div>