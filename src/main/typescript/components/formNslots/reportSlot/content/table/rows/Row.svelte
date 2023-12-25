<script lang="ts">

    import {onMount} from "svelte"

    export let
        data: RowData,
        cellTag = "td",
        collapsed = false,
        hasCheckbox = false,
        hasCheckboxSlot = false,
        rowspans: number[] = [],

        // Provides
        checked: boolean = false

    let htmlRow: HTMLTableRowElement

    onMount(() => {
        const slot = htmlRow.querySelector("td.slot")

        slot.childNodes.forEach((child, index) =>
            htmlRow.cells[index + Number(hasCheckbox)]
                ?.appendChild(child)
        )
        slot.remove()
    })

</script>

<tr class:collapsed
    bind:this={htmlRow}>
    {#if hasCheckbox || hasCheckboxSlot}
        <svelte:element this={cellTag}
                        class="checkbox"
                        on:click={() => checked = !checked}
                        role="checkbox"
                        tabindex=0>

            {#if hasCheckbox}
                <input type="checkbox"
                       on:click={ev => ev.stopPropagation}
                       bind:checked>
            {/if}

        </svelte:element>
    {/if}

    {#each data as cellData, cellI}
        <svelte:element this={cellTag}
                        rowspan={rowspans[cellI + Number(hasCheckbox)]}
                        class={typeof cellData}>
            {cellData}
        </svelte:element>
    {/each}

    <td class="slot">
        <slot/>
    </td>
</tr>