<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import Text from "../../../input/Text.svelte"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()

    export let
        tableWizard: TableWizard,
        checked = false

    const isComplex: boolean = !!tableWizard.columnMetas.find(meta => !!meta.compare || !!meta.share)

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
        {#each tableWizard.columnMetas as meta}
            <th rowspan={1 + Number(!meta.compare && !meta.share)}
                colspan={1 + Number(!!meta.compare) + Number(!!meta.share)}>
                {meta.title}
            </th>
        {/each}
    </tr>

    <!-- Row for share or compare columns -->
    {#if isComplex}
        <tr>
            {#each tableWizard.columnMetas as meta}
                <th rowspan={1 + Number(!meta.compare && !meta.share)}
                    colspan={1 + Number(!!meta.compare) + Number(!!meta.share)}>
                    {meta.title}
                </th>
            {/each}
        </tr>
    {/if}

    <tr class="filters-bar">
        {#if config.checkboxButtons}
            <th class="checkbox"></th>
        {/if}
        {#each Array(tableWizard.tableWidth) as _, i}
            <th>{#if config.columns?.[i]?.filter}
                <Text bind:value={filterValues[i]}/>
            {/if}</th>
        {/each}
    </tr>
</thead>