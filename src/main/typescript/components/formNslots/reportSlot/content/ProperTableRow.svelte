<script lang="ts">

    export let
        data: RowData,
        addCheckbox: boolean,
        isHeader: boolean = false,
        textInputs: (string|boolean)[] = null,
        // Provides
        checked = false,
        textValues: string[] = []

    let rowElement: HTMLTableRowElement,
        slotElement: HTMLElement

</script>

<tr >
    {#if addCheckbox}
        <svelte:element this={isHeader ? "th" : "td"}
                        class="checkbox"
                        on:click={() => checked = !checked}
                        role="checkbox"
                        tabindex=0>

            <input type="checkbox"
                   on:click={ev => ev.stopPropagation}
                   bind:checked>

        </svelte:element>
    {/if}
    {#each data as cell, colI}
        <svelte:element this={isHeader ? "th" : "td"}
                        class={typeof cell}>
            {cell}

            {#if textInputs?.[colI]}
                <input bind:value={textValues[colI]}
                       placeholder={typeof textInputs[colI] === "string" ? String(textInputs[colI]) : ''} type="text"/>
            {/if}
        </svelte:element>
    {/each}
</tr>

<!-- each element inside of the slot will be distributed into cells -->
<div class="slot"
     bind:this={slotElement}>
    <slot/>
</div>
