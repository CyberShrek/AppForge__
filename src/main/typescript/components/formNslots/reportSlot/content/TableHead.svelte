<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import Text from "../../../input/Text.svelte"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()

    export let
        tableWizard: TableWizard,
        checked = false

    const isComplex: boolean = !!tableWizard.columnMetas.find(column => isColumnComplex(column))

    const isColumnComplex = (column: TableColumnMeta) => !!column.compare || !!column.share || !!column.filter

</script>

<thead>

    <!-- Tool row -->
    <tr class="tool-bar">
        <td colspan=-1>
            <slot/>
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
            <th rowspan={1 + Number(isComplex && !isColumnComplex(column))}
                colspan={1 + Number(!!column.compare) + Number(!!column.share)}>
                {column.title}
            </th>
        {/each}
    </tr>

    <!-- Row for filter, share or compare columns -->
    {#if isComplex}
        <tr>
            {#if tableWizard.hasCheckboxes}
                <th class="checkbox"></th>
            {/if}
            {#each tableWizard.columnMetas as column}
                {#if isColumnComplex(column)}
                    <th>
                        {#if column.filter}
                            <Text bind:value={filterValues[i]}/>
                        {/if}
                    </th>
                {/if}

            {/each}
        </tr>
    {/if}
</thead>