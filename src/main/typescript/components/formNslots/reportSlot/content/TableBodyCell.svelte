<script lang="ts">

    export let
        data: string | number | boolean,
        feature: ColumnFeature,
        rowSpan: number = 1,
        colSpan: number = 1

</script>

<td class={typeof data}
    rowspan={rowSpan}
    colspan={colSpan}>
    {data}
</td>