<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import {createEventDispatcher} from "svelte"
    import PagesBar from "../../../../navigation/PagesBar.svelte"
    import Row from "./Row.svelte"
    import CheckboxTreeManager from "./CheckboxTreeManager.svelte";

    const dispatch = createEventDispatcher()

    export let
        table: TableWizard,
        // Provides
        pickedPageNumber: number,
        filtratedRowsI: number[],
        checkedRowsBool: boolean[]

    let filterValues: string[] = [],
        checked: boolean

    $: if(filterValues){
        filtratedRowsI = []
        table.data.forEach((row, rowI) => {
            if(filterValues?.every((filterValue, filterI) =>
                filterValue === undefined
                || filterValue === ""
                || String(row[filterI]).toLowerCase().includes(filterValue.toLowerCase())
            ))
                filtratedRowsI.push(rowI)
        })
    }

    $: size = Math.max(...table.columnMetas.map(meta => meta.parentTitles.length + 1))

</script>

<thead>
    <!-- Tool row -->
    <tr class="tool-bar">
        <td colspan={(table.data[0]?.length ?? 0)+ Number(table.hasCheckboxes)}>
            {#if filtratedRowsI}
                <PagesBar pageSize={table.pageSize}
                          itemsCount={filtratedRowsI.length}
                          bind:pickedPageNumber/>
            {/if}
        </td>
    </tr>

    {#each Array(size) as _, headI}

        {#if table.hasCheckboxes && headI === size - 1 && checkedRowsBool}
            <CheckboxTreeManager rowsI={filtratedRowsI}
                                 bind:checkedRowsBool
                                 bind:checked/>
        {/if}

        <Row data={table.columnMetas.map(meta => meta.parentTitles[headI] ?? meta.title)}
             hasCheckboxes={table.hasCheckboxes}
             bind:checked>

            {#if headI === size - 1}
                {#each table.columnMetas as column, colI}
                    {#if column.filter}
                        <input type="text"
                               placeholder={typeof column.filter === "string" ? column.filter : ''}
                               bind:value={filterValues[colI]}/>
                    {:else}
                        <span/>
                    {/if}
                {/each}
            {/if}

        </Row>
    {/each}

</thead>