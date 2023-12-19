<script lang="ts">

    export let data: RowData

</script>

<tr>
    {#each data as cell}
        <td>{cell}</td>
    {/each}
</tr>
