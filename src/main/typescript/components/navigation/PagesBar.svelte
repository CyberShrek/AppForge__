<script lang="ts">

    import Button from "../input/Button.svelte"

    export let
        size: number,
        picked: number

</script>

<div class="nav-pages">
    <Button unavailable={picked === 0} text='❬' on:click={() => picked--}/>

    {#each Array(size) as _, i}
        <Button active={picked === i} text={String(i + 1)} on:click={() => picked = i}/>
    {/each}

    <Button unavailable={picked === size - 1} text='❭' on:click={() => picked++}/>
</div>