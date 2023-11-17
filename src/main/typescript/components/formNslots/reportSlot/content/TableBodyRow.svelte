<script lang="ts">

    import Button from "../../../input/Button.svelte"
    import {createEventDispatcher} from 'svelte'
    import Label from "./Label.svelte";

    export let
        data: RowData,
        width: number,
        features: ColumnFeature[] = [],
        primaryColumnsNumber: number = 0,
        primaryGroupSizes: number[] = [],
        addCheckbox = false,
        checked = false,
        totalColI = -1,
        isGroupStart = false,
        collapseStartIndex: number = -1

    const dispatch = isGroupStart || features.find(feature => feature?.onClick) ? createEventDispatcher() : null

    let collapseButtonsValues: boolean[] = []

    $: if(collapseStartIndex === -1)
        collapseButtonsValues = []
    else
        collapseButtonsValues[collapseStartIndex] = true

    function toggleCollapse(colI: number) {
        collapseButtonsValues[colI] = !collapseButtonsValues[colI]
        dispatch(collapseButtonsValues[colI] ? 'collapse' : 'expand', colI)
    }

    function toggleCellCheckbox(event: Event){
        if((event.target as HTMLElement)?.tagName === "TD") {
            (event.target as HTMLTableCellElement).querySelector("input")?.click()
        }
    }

    function dispatchApiAction(colI: number) {
        const submittedApiAction: SubmittedApiAction = {
            ...features[colI]?.onClick,
            pickedData: [data]
        }
        dispatch("apiAction", submittedApiAction)
    }

</script>
<tr>
    {#if addCheckbox}
        <td class="checkbox" on:click={event => toggleCellCheckbox(event)}>
            {#if totalColI <= -1}
                <input type="checkbox"
                       bind:checked
                       value={data}>
            {/if}
        </td>
    {/if}
    {#each data as cellData, colI}
        {#if colI < width}
            {#if   colI >= primaryColumnsNumber - 1
                || !features[colI]?.totalize && (totalColI === -1 || colI < totalColI)
                || primaryGroupSizes[colI] && isGroupStart
            }

                <td class={typeof data}
                    class:total={totalColI > -1 && colI >= totalColI}
                    class:collapsed={collapseStartIndex !== -1 && colI > collapseStartIndex}
                    class:positive={typeof data === "number" && data > 0 && features[colI]?.colorize?.positive}
                    class:negative={typeof data === "number" && data < 0 && features[colI]?.colorize?.negative}
                    class:link={features[colI]?.onClick}
                    rowspan={isGroupStart && features[colI]?.totalize && primaryGroupSizes[colI] ? primaryGroupSizes[colI] : 1}
                    colspan={totalColI > -1 && colI === primaryColumnsNumber - 1 ? primaryColumnsNumber - totalColI : 0}
                    on:click={() => {if(features[colI]?.onClick) dispatchApiAction(colI)}}>

                    {#if features[colI]?.labelize}
                        <Label {data}
                               config={{
                                   valueCell: colI,
                                   ...features[colI]?.labelize
                               }}/>
                    {:else}
                        {cellData}
                    {/if}

                    {#if isGroupStart && features[colI]?.totalize && (colI === 0 || features.findIndex(feature => feature?.totalize) < colI) && primaryGroupSizes[colI] > 1}
                        <Button text={collapseButtonsValues[colI] ? '➕' : '➖'}
                                on:click={() => toggleCollapse(colI)}/>
                    {/if}
                </td>
            {/if}
        {/if}
    {/each}
</tr>