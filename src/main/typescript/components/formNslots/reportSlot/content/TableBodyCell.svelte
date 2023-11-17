<script lang="ts">

    export let
        data: string | number | boolean,
        feature: ColumnFeature,
        total:  boolean = false,
        rowSpan: number = 1,
        colSpan: number = 1,
        collapsed: boolean = false

</script>

<td class={typeof data}
    class:total
    class:collapsed
    class:positive={typeof data === "number" && data > 0 && feature?.colorize?.positive}
    class:negative={typeof data === "number" && data < 0 && feature?.colorize?.negative}
    class:link={feature?.onClick}
    rowspan={rowSpan}
    colspan={colSpan}>
    {data}
    <slot/>
</td>