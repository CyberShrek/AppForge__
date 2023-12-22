<script lang="ts">

    import {onMount} from "svelte"

    export let
        data: RowData,
        cellTag = "td",
        collapsed = false,
        hasCheckbox = false,
        hasCheckboxSlot = false,

        // Provides
        checked: boolean = false

    let rootElement: HTMLTableRowElement

    onMount(() => {
        const slot = rootElement.querySelector("td.slot")

        slot.childNodes.forEach((child, index) =>
            rootElement.cells[index + Number(hasCheckbox)]
                ?.appendChild(child)
        )
        slot.remove()
    })

</script>

<tr class:collapsed
    bind:this={rootElement}>
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

    {#each data as cellData}
        <svelte:element this={cellTag}
                        class={typeof cellData}>
            {cellData}
        </svelte:element>
    {/each}

    <td class="slot">
        <slot/>
    </td>
</tr>