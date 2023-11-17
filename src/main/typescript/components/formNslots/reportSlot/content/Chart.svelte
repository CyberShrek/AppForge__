<script lang="ts">

    import {ChartJsModule} from "../../../../third-party/ChartJsModule";

    export let
        data: MatrixData,
        config: ChartConfig

    let rootCanvas: HTMLCanvasElement

    $: if (rootCanvas)
        new ChartJsModule(rootCanvas, data, config)

</script>

<div class="chart">
    <canvas style="display: inline-block"
            bind:this={rootCanvas}/>
</div>