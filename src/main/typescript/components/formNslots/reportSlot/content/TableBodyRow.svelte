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

    const dispatch = createEventDispatcher()

    let collapseButtonsValues: boolean[] = []

    $: if(collapseStartIndex === -1)
        collapseButtonsValues = []
    else
        collapseButtonsValues[collapseStartIndex] = true

    function isCellHasAction(cellI: number, cellValue: any): boolean {
        return !!(
            (features?.[cellI]?.linkToReport || features?.[cellI]?.linkToFile)
            && (!features?.[cellI].linkCells || features?.[cellI].linkCells?.find(targetCellValue => targetCellValue === cellValue)
            )
        );
    }

    function getCellImage(cellI: number, cellValue: any): string {
        if (features[cellI].labelize?.image) {
            if(typeof features[cellI].labelize.image === "string")
                return features[cellI].labelize.image as string
            else if(typeof features[cellI].labelize.image === "object" && features[cellI].labelize.image[cellValue])
                return features[cellI].labelize.image[cellValue] as string
        }

        return null
    }

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
            linkToReport: features[colI]?.linkToReport,
            linkToFile: features[colI]?.linkToFile,
            pickedData: [data]
        }
        dispatch("apiAction", submittedApiAction)
    }

</script>
{#if data}
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
                    || !features?.[colI]?.totalize && (totalColI === -1 || colI < totalColI)
                    || primaryGroupSizes?.[colI] && isGroupStart
                }
                    <td class={typeof cellData}
                        class:total={totalColI > -1 && colI >= totalColI}
                        class:collapsed={collapseStartIndex !== -1 && colI > collapseStartIndex}
                        class:positive={typeof cellData === "number" && cellData > 0 && features?.[colI]?.colorize?.positive}
                        class:negative={typeof cellData === "number" && cellData < 0 && features?.[colI]?.colorize?.negative}
                        class:link={isCellHasAction(colI, cellData)}
                        class:labelized={features?.[colI]?.labelize}
                        class:framed={features?.[colI]?.labelize?.frame}
                        rowspan={isGroupStart && features?.[colI]?.totalize && primaryGroupSizes?.[colI] ? primaryGroupSizes?.[colI] : 1}
                        colspan={totalColI > -1 && colI === primaryColumnsNumber - 1 ? primaryColumnsNumber - totalColI : 0}
                        on:click={() => {if(isCellHasAction(colI, cellData)) dispatchApiAction(colI)}}>

                        {#if features?.[colI]?.labelize}
                            <Label {data}
                                   config={{
                                       valueCell: colI,
                                       ...features[colI]?.labelize,
                                       image: getCellImage(colI, cellData)
                                   }}/>
                        {:else}
                            {cellData}
                        {/if}

                        {#if isGroupStart && features?.[colI]?.totalize && (colI === 0 || features?.findIndex(feature => feature?.totalize) < colI) && primaryGroupSizes?.[colI] > 1}
                            <Button text={collapseButtonsValues?.[colI] ? "▼" : "▲"}
                                    on:click={() => toggleCollapse(colI)}/>
                        {/if}
                    </td>
                {/if}
            {/if}
        {/each}
    </tr>
{/if}