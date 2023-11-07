<script lang="ts">

    import {ReportModelWizard} from "../../../model/ReportModelWizard"

    export let
        config: ReportSlotConfig,
        model: ReportModel

    $: modelWizard = model && new ReportModelWizard(model)

    // model.

</script>

<div class="report">
    <div class="head"><p>{config.title}</p></div>
    <div class="body"></div>
</div>