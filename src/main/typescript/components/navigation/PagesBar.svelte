<script lang="ts">

    import Button from "../input/Button.svelte"

    export let
        pageSize: number,
        itemsCount: number,
        pickedPageNumber: number = 1

    $: size = Math.ceil(itemsCount / pageSize)

    $: pageStartI = (pickedPageNumber - 1) * pageSize
    $: pageEndI   = Math.min(pageStartI + pageSize, itemsCount)

    $: if(itemsCount)
        pickedPageNumber = pickedPageNumber > size ? size : pickedPageNumber


</script>

<div class="nav-pages">
    <span class="context">
        {#if itemsCount !== -1}
            {pageStartI + 1}-{pageEndI} из {itemsCount}
        {/if}
    </span>

    <div class="pages">
        <Button unavailable={size <= 1 || pickedPageNumber === 1} text='❬' on:click={() => pickedPageNumber--}/>

        {#each Array(size) as _, i}
            <Button active={pickedPageNumber === i + 1} text={String(i + 1)} on:click={() => pickedPageNumber = i + 1}/>
        {/each}

        <Button unavailable={size <= 1 || pickedPageNumber === size} text='❭' on:click={() => pickedPageNumber++}/>
    </div>

    <slot/>
</div>