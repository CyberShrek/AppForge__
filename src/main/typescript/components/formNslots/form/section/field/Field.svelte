<script lang="ts">

    import Checkbox from "../../../../input/Checkbox.svelte"
    import Calendar from "../../../../input/Calendar.svelte"
    import Select   from "../../../../input/Select.svelte"
    import {deepCopyOf} from "../../../../../util/data";

    export let
        config: FieldConfig,
        value: any,
        valueScope: {[section_dot_fieldValue: string]: any},
        wrong: boolean,
        hidden: boolean

</script>

<div class:wrong
     class:hidden
     class="{config.type}-field field">
    {#if config.type !== "switch" && config.title }
        <p>{config.title}</p>
    {/if}
    {#if      config.type === "switch"  }<Checkbox config={{switch: true, ...config}} bind:value/>
    {:else if config.type === "calendar"}<Calendar {config} bind:value/>
    {:else if config.type === "select"  }<Select {config} bind:value {valueScope}/>
    {/if}
</div>