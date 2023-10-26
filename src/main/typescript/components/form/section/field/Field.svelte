<script lang="ts">

    import Checkbox from "../../../input/Checkbox.svelte"

    export let
        config: FieldConfig,
        value: any

</script>

<div class="{config.type}-field field">
    {#if config.type !== "switch" && config.label }
        <p>{config.label}</p>
    {/if}
    {#if      config.type === "switch"    }<Checkbox config={{switch: true, ...config}} bind:checked={value}/>
    {:else if config.type === "datepicker"}
    {:else if config.type === "select"    }
    {/if}
</div>