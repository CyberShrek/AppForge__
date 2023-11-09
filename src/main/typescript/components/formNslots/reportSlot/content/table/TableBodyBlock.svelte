<script lang="ts">

    import {TableWizard} from "./TableWizard"

    export let
        data: MatrixData,
        tableWizard: TableWizard,
        height: number,
        nesting = 0

</script>

{#each tableWizard.splitData(data, nesting) as nestedData}
    {#if nestedData.length === 1}
        <tr>
            {#each nestedData[0] as cellData, i}
                {#if i === nesting - 1}
                    <td class="primary {typeof cellData}"
                        rowspan={tableWizard.columnIsSpanned(i) ? null : null}>
                        {cellData}
                    </td>
                {:else if true || i > nesting || !tableWizard.columnIsSpanned(i)}
                    <td class="{typeof cellData}">
                        {cellData}
                    </td>
                {/if}
            {/each}
        </tr>
    {:else}
        <svelte:self data={nestedData}
                     height={nestedData.length}
                     {tableWizard}
                     nesting={nesting + 1}/>
    {/if}
{/each}