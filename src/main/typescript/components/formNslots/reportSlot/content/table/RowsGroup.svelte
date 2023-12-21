<script lang="ts">
    
    import {TableWizard} from "./TableWizard"
    import Row from "./Row.svelte"
    import CheckboxTreeManager from "./CheckboxTreeManager.svelte"
    import Button from "../../../../input/Button.svelte"

    export let
        table: TableWizard,
        checkedRowsBool: boolean[] = [],
        rowsI: number[],
        columnI = 0,
        collapsed = false,
        collapsedTotal = false

    let checked = false
    
</script>

{#if columnI < table.primaryColumnsNumber - 1}
    {#each table.splitRowIndicesByColumnIndex(rowsI, columnI) as groupedRowsI}
        <svelte:self {table}
                     {collapsed}
                     collapsedTotal={collapsed}
                     bind:checkedRowsBool
                     rowsI={groupedRowsI}
                     columnI={columnI + 1}/>
    {/each}
{:else}
    {#each rowsI as rowI}
        <Row data={table.data[rowI]}
             {collapsed}
             hasCheckboxes={table.hasCheckboxes}
             bind:checked={checkedRowsBool[rowI]}/>
    {/each}
{/if}

<!-- TOTALIZING -->
{#if table.hasGrouping && columnI > 0 && rowsI.length > 1}

    <CheckboxTreeManager {rowsI}
                         bind:checkedRowsBool
                         bind:checked/>

    <Row data={[]}
         hasCheckboxes={table.hasCheckboxes}
         collapsed={collapsedTotal}
         bind:checked>

        {#each Array(columnI) as _, i}
            {#if i === columnI - 1}
                <Button text={collapsed ? "▼" : "▲"}
                        on:click={(ev) => {
                                       ev.stopPropagation()
                                       collapsed = !collapsed
                                   }}/>
            {:else}
                <span/>
            {/if}
        {/each}

    </Row>
{/if}