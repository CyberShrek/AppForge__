<script lang="ts">
    import {valueOrDefault} from "../../util/data"

    export let
        config: CheckboxConfig,
        checked: boolean = false

</script>

<label class={config.switch ? "switch" : "checkbox"}>
    <input type="checkbox" bind:checked>
    {valueOrDefault(config.label, "")}
    {#if config.switch}
        <span class="slider"></span>
    {/if}
</label>