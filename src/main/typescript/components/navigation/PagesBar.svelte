<script lang="ts">

    import Button from "../input/Button.svelte"

    export let
        pageSize: number,
        itemsCount: number,
        pickedPageI: number

    $: size = Math.ceil(itemsCount / pageSize)

    $: pageStartI = pickedPageI * pageSize
    $: pageEndI   = Math.min(pageStartI + pageSize, itemsCount)

    $: if(itemsCount)
        pickedPageI = pickedPageI >= size ? size - 1 : pickedPageI


</script>

<div class="nav-pages">
    {#if itemsCount !== -1}
        {pageStartI + 1}-{pageEndI} из {itemsCount}
    {/if}

    <Button unavailable={size <= 1 || pickedPageI === 0} text='❬' on:click={() => pickedPageI--}/>

    {#each Array(size) as _, i}
        <Button active={pickedPageI === i} text={String(i + 1)} on:click={() => pickedPageI = i}/>
    {/each}

    <Button unavailable={size <= 1 || pickedPageI === size - 1} text='❭' on:click={() => pickedPageI++}/>
</div>