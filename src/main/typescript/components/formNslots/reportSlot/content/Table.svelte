<script lang="ts">

    import {ReportModelWizard} from "../../../../model/ReportModelWizard"
    import {resolveStyle} from "../../../../util/resolver"
    import {TableWizard} from "./TableWizard"
    import {tableTotalWord} from "../../../../properties"
    import {scrollIntoElement} from "../../../../util/domWizard";
    import Fix from "../../../misc/Fix.svelte";
    import Button from "../../../input/Button.svelte";

    resolveStyle("table")

    export let
        config: TableConfig,
        modelWizard: ReportModelWizard,
        submittedApiAction: SubmittedApiAction

    let rootElement: HTMLDivElement,
        tableElement: HTMLTableElement,
        tableWizard: TableWizard,
        checkedRowsI: number[] = []

    $: if(config && modelWizard)
        tableWizard = new TableWizard(modelWizard, config)

    $: if(tableElement)
        tableWizard.groupRows(tableElement.tBodies.item(0).rows)

    $: allRowsAreChecked =
        checkedRowsI.length === modelWizard.properData.length

    $: console.log(submittedApiAction)

    function togglePickAll() {
        checkedRowsI = allRowsAreChecked ? [] : modelWizard.properData.map((_, index) => index)
    }

    function scrollUp(){
        const top = rootElement.getClientRects().item(0).top
        if (top < -1 || top > 1) {
            scrollIntoElement(rootElement)
        }
    }

</script>

<div class="table"
     bind:this={rootElement}
     on:scroll={scrollUp}>
    <table bind:this={tableElement}>
        <thead>
        {#each config.head as headRow, rowI}
            <tr>
                {#if config.checkboxes && rowI === 0}
                    <th class="checkbox"
                        rowspan={config.head.length}>
                        <input type="checkbox"
                               on:change={togglePickAll}
                               bind:checked={allRowsAreChecked}/>
                    </th>
                {/if}
                {#each headRow as headCell}
                    <th rowspan={headCell.rowspan}
                        colspan={headCell.colspan}>
                        {headCell.value}
                    </th>
                {/each}
            </tr>
        {/each}
        </thead>
        {#if tableWizard}
            <tfoot>
            <tr class="total">
                {#if config.checkboxes}
                    <td class="checkbox"></td>
                {/if}
                <td colspan={tableWizard.primaryColumnsNumber}>
                    {tableTotalWord}
                </td>
                {#each modelWizard.totalRow as totalCellData, i}
                    {#if i >= tableWizard.primaryColumnsNumber}
                        <td class={typeof totalCellData}>
                            {totalCellData}
                        </td>
                    {/if}
                {/each}
            </tr>
            </tfoot>
            <tbody>
                {#each modelWizard.properData as rowData, rowI}
                    <tr i={rowI}>
                        {#if config.checkboxes}
                            <td class="checkbox">
                                <input type="checkbox"
                                       bind:group={checkedRowsI}
                                       value={rowI}>
                            </td>
                        {/if}
                        {#each rowData as cellData, colI}
                            <td class={typeof cellData}>
                                {#if config.columnFeatures?.[colI]?.onClick}
                                    <a on:click={() =>
                                        submittedApiAction = {
                                            ...config.columnFeatures[colI].onClick,
                                            pickedData: [modelWizard.properData[rowI]]
                                        }}>
                                        {cellData}
                                    </a>
                                {:else}
                                    {cellData}
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        {/if}
    </table>

    {#if checkedRowsI.length > 0 && config.checkboxes}
        <Fix left={true}
             bottom={true}>

            {#each config.checkboxes.actions as action}
                <Button text={action.label}
                        image={action.image}
                        hint={action.hint}
                        on:click={() =>
                        submittedApiAction = {
                            ...action.onClick,
                            pickedData: checkedRowsI.map(i => modelWizard.properData[i])
                        }}
                />
            {/each}
        </Fix>
    {/if}

</div>