<script lang="ts">
    import Row from "./Row.svelte"
    import {TableWizard} from "../TableWizard"

    export let
        table: TableWizard,
        headI: number,
        checked: boolean,
        filterValues: string[] = []

</script>

<Row data={table.columnMetas.map(meta => meta.parentTitles[headI] ?? meta.title)}
     hasCheckbox={table.hasCheckboxes}
     cellTag="th"
     bind:checked>

    {#if headI === table.headSize - 1}
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