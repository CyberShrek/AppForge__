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
    rowspan={rowSpan}
    colspan={colSpan}>
    {data}
    <slot/>
</td>