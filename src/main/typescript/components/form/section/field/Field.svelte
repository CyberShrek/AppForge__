<script lang="ts">

    import Checkbox from "../../../input/Checkbox.svelte"
    import Calendar from "../../../input/Calendar.svelte"
    import Select from "../../../input/Select.svelte"

    export let
        config: FieldConfig,
        value: any

</script>

<div class="{config.type}-field field">
    {#if config.type !== "switch" && config.label }
        <p>{config.label}</p>
    {/if}
    {#if      config.type === "switch"  }<Checkbox config={{switch: true, ...config}} bind:checked={value}/>
    {:else if config.type === "calendar"}<Calendar {config} bind:pickedDate={value}/>
    {:else if config.type === "select"  }<Select {config}/>
    {/if}
</div>