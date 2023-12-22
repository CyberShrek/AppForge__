<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import CheckboxTreeManager from "./CheckboxTreeManager.svelte"
    import ToolRow from "./rows/ToolRow.svelte"
    import HeadRow from "./rows/HeadRow.svelte"

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

</script>

<thead>
    <ToolRow {table}
             {filtratedRowsI}
             bind:pickedPageNumber/>

    {#each Array(table.headSize) as _, headI}

        {#if table.hasCheckboxes && headI === table.headSize - 1 && checkedRowsBool}
            <CheckboxTreeManager rowsI={filtratedRowsI}
                                 bind:checkedRowsBool
                                 bind:checked/>
        {/if}

        <HeadRow {table}
                 {headI}
                 bind:checked
                 bind:filterValues/>
    {/each}
</thead>