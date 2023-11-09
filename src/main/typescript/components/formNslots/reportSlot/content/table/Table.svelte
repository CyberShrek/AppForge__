<script lang="ts">

    import {ReportModelWizard} from "../../../../../model/ReportModelWizard"
    import {resolveStyle} from "../../../../../util/resolver";
    import {TableWizard} from "./TableWizard";
    import {afterUpdate} from "svelte";
    import TableBodyBlock from "./TableBodyBlock.svelte";

    resolveStyle("table")

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard

    let tableElement: HTMLTableElement,
        tableWizard: TableWizard

    $: if(config && modelWizard)
        tableWizard = new TableWizard(modelWizard.properData, config)

    $: if(tableElement){
        tableWizard.spanRows(tableElement.tBodies.item(0).rows)
    }

</script>

<div class="table">
    <table bind:this={tableElement}>
        <thead>
        {#each config.head as headRow}
            <tr>
                {#each headRow as headCell}
                    <th rowspan={headCell.rowspan}
                        colspan={headCell.colspan}>
                        {headCell.value}
                    </th>
                {/each}
            </tr>
        {/each}
        </thead>
        {#if tableWizard}
            <tfoot>
            <tr>
                <td colspan={tableWizard.primaryColumnsNumber}>
                    Итого
                </td>
                {#each modelWizard.totalRow as totalCellData, i}
                    {#if i >= tableWizard.primaryColumnsNumber}
                        <td class="{typeof totalCellData}">
                            {totalCellData}
                        </td>
                    {/if}
                {/each}
            </tr>
            </tfoot>
            <tbody>
<!--                <TableBodyBlock data={modelWizard.properData} {tableWizard}/>-->
                <!-- For performance comparing -->
                {#each modelWizard.properData as rowData}
                    <tr>
                        {#each rowData as cellData}
                            <td class="{typeof cellData}">
                                {cellData}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        {/if}
    </table>
</div>