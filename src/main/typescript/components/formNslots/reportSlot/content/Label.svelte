<script lang="ts">

    import Image from "../../../misc/Image.svelte";

    export let
        data: RowData,
        config: LabelConfig

</script>

<div class="label">
    {#if config.title}
        <p>{config.title}</p>
    {/if}
    <div class:framed={config.framed}
         style:background={config.background}>

        {#if config.image}
            <Image name={typeof config.image === "string" ? config.image : config.image[data[config.valueCell]]}/>
        {/if}
        {#if config.valueCell}
            <span class="value">{data[config.valueCell]}</span>
        {/if}
        {#if config.valueUnit}
            <span class="value-unit">{config.valueUnit}</span>
        {/if}
        {#if config.percentName}
            <span class="percent-name">{config.percentName}</span>
        {/if}
        {#if config.percentCell}
            <span class="percent">{data[config.percentCell]}%</span>
        {/if}
    </div>
</div>