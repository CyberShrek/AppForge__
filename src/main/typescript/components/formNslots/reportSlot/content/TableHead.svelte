<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import Text from "../../../input/Text.svelte"
    import {createEventDispatcher} from "svelte"
    import {tableText} from "../../../../properties"
    import PagesBar from "../../../navigation/PagesBar.svelte"

    const dispatch = createEventDispatcher()

    export let
        table: TableWizard,
        rowsCount: number,
        // Provides
        pickedPageNumber: number,
        checked: boolean,
        filterValues: string[] = []

</script>

<thead>

    <!-- Tool row -->
    <tr class="tool-bar">
        <td colspan=0>
            {#if rowsCount}
                <PagesBar pageSize={table.pageSize}
                          itemsCount={rowsCount}
                          bind:pickedPageNumber/>
            {/if}
        </td>
    </tr>

    <tr>
        {#if !!table.config.checkboxAction}
            <th class="checkbox"
                rowspan={table.headSize}>
                <input type="checkbox"
                       on:change={() => dispatch("check")}
                       bind:checked/>
            </th>
        {/if}
        {#each table.config.columns as column}
            <th rowspan={1}
                colspan={1}>
                {column.title}
            </th>
        {/each}
    </tr>
</thead>