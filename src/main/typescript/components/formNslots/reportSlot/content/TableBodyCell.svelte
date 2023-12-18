<script lang="ts">

    import {createEventDispatcher} from "svelte"
    import {valueOrDefault} from "../../../../util/data";

    const dispatch = createEventDispatcher()

    export let
        value: CellData,
        meta: ColumnMeta,
        total: boolean = false,
        collapsed: boolean = false,
        rowSpan = 1,
        colSpan = 1,
        shareValue: number = null,
        changeValue: number = null

    $: hasAction = meta && (
        (meta.linkToReport || meta.linkToFile) &&
        (!meta.linkCells || meta.linkCells?.find(associatedValue => associatedValue === value))
    )

    function dispatchApiAction() {
        const submittedApiAction: SubmittedApiAction = {
            linkToReport: meta.linkToReport,
            linkToFile: meta.linkToFile,
            pickedData: [] // Filled by row
        }
        dispatch("action", submittedApiAction)
    }

</script>

<td class={typeof value}
    class:total
    class:collapsed
    class:link={hasAction}
    rowspan={rowSpan}
    colspan={colSpan}
    on:click={() => {if(hasAction) dispatchApiAction()}}>
    {value}

    <slot/>
</td>

{#if meta.share}
    <td class="number"
        class:collapsed
        rowspan={rowSpan}
        colspan={colSpan}>
        {valueOrDefault(shareValue, "")}
    </td>
{/if}

{#if meta.compare}
    <td class="number"
        class:collapsed
        class:positive={changeValue > 0}
        class:negative={changeValue < 0}
        rowspan={rowSpan}
        colspan={colSpan}>
        {valueOrDefault(changeValue, "")}
    </td>
{/if}

