<script lang="ts">

    import Image from "../../../misc/Image.svelte"
    import {resolveStyle} from "../../../../util/resolver";

    resolveStyle("label")

    export let
        data: RowData,
        config: LabelMeta

</script>

<div>
    {#if config.title}
        <p>{config.title}</p>
    {/if}
    <div class="label"
         class:framed={config.frame}
         style:background={config.background}>

        {#if config.image}
            <Image name={typeof config.image === "string" ? config.image : config.image[data[config.valueCell]]} location=""/>
        {/if}
        <div class="text">
            {#if config.valueCell !== undefined}
                <span class="value" style:color={config.background}>{data[config.valueCell]}</span>
            {/if}
            {#if config.unit !== undefined}
                <span class="value-unit">{config.unit}</span>
            {/if}
            {#if config.percentName !== undefined}
                <span class="percent-name">{config.percentName}</span>
            {/if}
            {#if config.percentCell !== undefined}
                <span class="percent" style:color={config.background}>{data[config.percentCell]}%</span>
            {/if}
        </div>
    </div>
</div>