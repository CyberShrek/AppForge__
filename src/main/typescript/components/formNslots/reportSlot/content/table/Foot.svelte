<script lang="ts">

    import {TableWizard} from "./TableWizard"
    import {tableText} from "../../../../../properties"
    import Row from "./rows/Row.svelte";

    export let
        table: TableWizard,
        totalRow: RowData

</script>

<tfoot>
    <Row data={totalRow}
         hasCheckboxSlot={table.hasCheckboxes}/>
</tfoot>