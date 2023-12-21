<script lang="ts">

    export let
        rowsI: number[],
        checkedRowsBool: boolean[],

        // Provides
        checked: boolean

    $: checked ? pickAll() : unpickAllIfAllArePicked()
    $: allArePicked = rowsI && !!rowsI.every(rowI => checkedRowsBool[rowI] === true)
    $: checked = allArePicked

    function pickAll() {
        rowsI.forEach(rowI => checkedRowsBool[rowI] = true)
    }

    function unpickAllIfAllArePicked() {
        if(allArePicked) {
            rowsI.forEach(rowI => checkedRowsBool[rowI] = undefined)
        }
    }

</script>