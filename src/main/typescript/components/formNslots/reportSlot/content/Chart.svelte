<script lang="ts">

    // import {ChartJsModule} from "../../../../third-party/ChartJsModule";
    import {resolveStyle} from "../../../../util/resolver";

    resolveStyle("chart")

    export let
        data: MatrixData,
        config: ChartMeta

    let rootCanvas: HTMLCanvasElement,
        chartJsModule

    $: if (rootCanvas) {
        if(chartJsModule)
            chartJsModule.destroy()

        // chartJsModule = new ChartJsModule(rootCanvas, data, config)
    }

</script>

<div class="chart"
     style="width: calc(100%*{config.size ? config.size : 1} - var(--indent) * 2 - 9.5px)">
    <canvas style="display: inline-block"
            bind:this={rootCanvas}/>
</div>