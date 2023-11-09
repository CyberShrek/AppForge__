<script lang="ts">

    import {ReportModelWizard} from "../../../model/ReportModelWizard"
    import Table from "./content/table/Table.svelte"
    import {resolveStyle} from "../../../util/resolver";

    resolveStyle("report")

    export let
        config: ReportSlotConfig,
        model:  ReportModel

    $: modelWizard = model && new ReportModelWizard(model)

</script>

<div class="report">
    <div class="head"><p>{model?.title ? model.title : config.title}</p></div>
    {#if model}
        <div class="body">
            {#each Object.keys(model) as modelKey}
                {#if      modelKey === "table"}<Table config={model[modelKey]} {modelWizard}/>
                {:else if modelKey === "charts"}
                {:else if modelKey === "labels"}
                {/if}
            {/each}
        </div>
    {/if}
</div>