<script lang="ts">

    import {ChartJsModule} from "../../../../third-party/ChartJsModule";
    import {resolveStyle} from "../../../../util/resolver";

    resolveStyle("chart")

    export let
        data: MatrixData,
        config: ChartConfig

    let rootCanvas: HTMLCanvasElement

    $: if (rootCanvas)
        new ChartJsModule(rootCanvas, data, config)

</script>

<canvas style="display: inline-block"
        bind:this={rootCanvas}/>