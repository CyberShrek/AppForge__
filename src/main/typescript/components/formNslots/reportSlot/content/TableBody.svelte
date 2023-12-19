<script lang="ts">
    import {TableWizard} from "./TableWizard"
    import {beforeUpdate} from "svelte"
    import ProperTableRow from "./ProperTableRow.svelte"

    export let
        table: TableWizard,
        pickedPageNumber: number,
        checkedRowsSet: Set<RowData>,
        filterValues: string[],
        validRowsCount: number = 0

    function rowIsValid(row: RowData): boolean {
        validRowsCount += 1
        return filterValues?.every((filterValue, index) =>
            filterValue === undefined
            || filterValue === ""
            || String(row[index]).toLowerCase().includes(filterValue.toLowerCase())
        )
    }

    function rowIIsVisible(rowI: number): boolean {
        const
            minI = pickedPageNumber - 1 * table.pageSize,
            maxI = pickedPageNumber * table.pageSize

        return rowI >= minI && rowI <= maxI
    }

    // beforeUpdate(() => validRowsCount = 0)

</script>

<tbody>
{#each table.data as row, rowI}
    {#if rowIsValid(row)}
        {validRowsCount}
        {#if rowIIsVisible(rowI)}
            <ProperTableRow data={row}/>
        {/if}
    {/if}
{/each}
</tbody>