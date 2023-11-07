<script lang="ts">

    import Button from "./Button.svelte"
    import {onMount} from "svelte"
    import {EasepickModule} from "../../third-party/EasepickModule";
    import {easepick} from "@easepick/core";

    export let
        config: CalendarConfig,
        value: FormattedDate = ''

    let rootElement: HTMLInputElement,
        easepickModule: EasepickModule

    $: if(value)
        easepickModule?.setValue(value)

    onMount(() => {
        easepickModule = new EasepickModule(rootElement, config)
        easepickModule
            .onChange(newDate => value = newDate)

        if(!value)
            value = easepickModule.getValue()
    })

</script>

<div class="datepicker">
    <input bind:this={rootElement}>
    <Button text="📅" on:click={() => rootElement.click()}/>
</div>