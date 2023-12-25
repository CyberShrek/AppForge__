<script lang="ts">
    
    import {TableWizard} from "../TableWizard"
    import Row from "./Row.svelte"
    import CheckboxTreeManager from "../CheckboxTreeManager.svelte"
    import Button from "../../../../../input/Button.svelte"

    export let
        table: TableWizard,
        checkedRowsBool: boolean[] = [],
        rowsI: number[],
        columnI = 0,
        collapsed = false,
        collapsedTotal = false,
        calculatedSize = 0

    let checked = false,
        innerSizes: number[] = [rowsI.length]

    $: totalize = table.hasGrouping && rowsI.length > 1

    $: calculatedSize = innerSizes.reduce((sum, size) => (sum + size)) + Number(totalize)

</script>

{#if columnI < table.primaryColumnsNumber - 1}
    {#each table.splitRowIndicesByColumnIndex(rowsI, columnI) as groupedRowsI, groupI}
        <svelte:self {table}
                     {collapsed}
                     collapsedTotal={collapsed}
                     bind:checkedRowsBool
                     bind:calculatedSize={innerSizes[groupI]}
                     rowsI={groupedRowsI}
                     columnI={columnI + 1}/>
    {/each}
{:else}
    {#each rowsI as rowI, i}
        <Row data={table.data[rowI]}
             {collapsed}
             hasCheckbox={table.hasCheckboxes}
             bind:checked={checkedRowsBool[rowI]}/>
    {/each}
{/if}

<!-- TOTALIZING -->
{#if totalize && columnI > 0}

    <CheckboxTreeManager {rowsI}
                         bind:checkedRowsBool
                         bind:checked/>

    <Row data={table.getTotalRowForIndices(rowsI)}
         hasCheckbox={table.hasCheckboxes}
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
    <!--{calculatedSize}-->
{/if}