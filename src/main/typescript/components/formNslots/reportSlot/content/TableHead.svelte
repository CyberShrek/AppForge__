<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import Text from "../../../input/Text.svelte"
    import {createEventDispatcher} from "svelte"
    import {tableText} from "../../../../properties"
    import PagesBar from "../../../navigation/PagesBar.svelte"

    const dispatch = createEventDispatcher()

    export let
        tableWizard: TableWizard,
        // Provides
        pickedPageI: number,
        checked: boolean,
        filteredData: MatrixData

    let filterValues: string[] = []

    $: filteredData = tableWizard.filtrateData(filterValues)

    const isComplex: boolean = !!tableWizard.columnMetas.find(column => isColumnComplex(column))

    const isColumnComplex = (column: TableColumnMeta) => !!column.compare || !!column.share || !!column.filter

</script>

<thead>

    <!-- Tool row -->
    <tr class="tool-bar">
        <td colspan=-1>
            <PagesBar pageSize={tableWizard.pageSize}
                      itemsCount={filteredData.length}
                      bind:pickedPageI={pickedPageI}/>
        </td>
    </tr>

    <!-- Title (main) row -->
    <tr>
        {#if tableWizard.hasCheckboxes}
            <th class="checkbox"
                rowspan={1 + Number(isComplex)}>
                <input type="checkbox"
                       on:change={() => dispatch("check")}
                       bind:checked/>
            </th>
        {/if}
        {#each tableWizard.columnMetas as column}
            {#if column}
                <th rowspan={1 + Number(isComplex && !isColumnComplex(column))}
                    colspan={1 + Number(!!column.compare) + Number(!!column.share)}>
                    {column.title}
                </th>
            {/if}
        {/each}
    </tr>

    <!-- Row for filter, share or compare columns -->
    {#if isComplex}
        <tr>
            {#if tableWizard.hasCheckboxes}
                <th class="checkbox"></th>
            {/if}
            {#each tableWizard.columnMetas as column, i}
                {#if column}
                    {#if isColumnComplex(column)}
                        <th>
                            {#if column.filter}
                                <Text bind:value={filterValues[i]}/>
                            {/if}
                        </th>
                    {/if}
                    {#if column.compare}
                        <th>
                            {tableText.head.compare}
                        </th>
                    {/if}
                    {#if column.share}
                        <th>
                            {tableText.head.shareInTotal}
                        </th>
                    {/if}
                {/if}
            {/each}
        </tr>
    {/if}
</thead>