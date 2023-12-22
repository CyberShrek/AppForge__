<script lang="ts">
    import {TableWizard} from "./TableWizard"
    import RowsGroup from "./rows/BodyRowsGroup.svelte"

    export let
        table: TableWizard,
        pickedPageNumber: number,
        checkedRowsBool: boolean[] = [],
        filtratedRowsI:   number[] = []

    $: pageStart = (pickedPageNumber - 1) * table.pageSize
    $: pageEnd   = pickedPageNumber * table.pageSize
    $: pageRowsI = filtratedRowsI.slice(pageStart, pageEnd)

    // $: if(pickedPageNumber){
    //     table.postprocessBody()
    // }

</script>

<tbody>
    <RowsGroup {table}
               rowsI={pageRowsI}
               bind:checkedRowsBool/>
</tbody>