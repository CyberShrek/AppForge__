<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import {createEventDispatcher} from "svelte"
    import PagesBar from "../../../navigation/PagesBar.svelte"
    import ProperTableRow from "./ProperTableRow.svelte"

    const dispatch = createEventDispatcher()

    export let
        table: TableWizard,
        // Provides
        pickedPageNumber: number,
        checked: boolean,
        filtratedRowsI: number[]

    let filterValues: string[] = []

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
        <td colspan="100%">
            {#if filtratedRowsI}
                <PagesBar pageSize={table.pageSize}
                          itemsCount={filtratedRowsI.length}
                          bind:pickedPageNumber/>
            {/if}
        </td>
    </tr>

    {#each Array(size) as _, headI}
        <ProperTableRow data={table.columnMetas.map(meta => meta.parentTitles[headI] ?? meta.title)}
                        addCheckbox={!!table.config.checkboxAction}
                        textInputs={headI === size - 1 ? table.columnMetas.map(column => column.filter): null}
                        isHeader={true}
                        bind:checked
                        bind:textValues={filterValues}>

        </ProperTableRow>
    {/each}

</thead>