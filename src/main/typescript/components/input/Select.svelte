<script lang="ts">

    import {onMount} from "svelte"
    import {OptionsSource} from "../../api/options/OptionsSource"
    import {VirtualSelectModule} from "../../modules/VirtualSelectModule"

    export let
        config: SelectConfig,
        value: string[] = [],
        valueScope: object = {}

    let rootElement: HTMLDivElement,
        optionsSource: OptionsSource,
        virtualSelectModule: VirtualSelectModule

    // // Allow to apply outer changes
    $: if(value)
        virtualSelectModule?.setValue(value)

    // React to scope changes
    $: if(valueScope)
        optionsSource?.retrieveOptionsByValueScope(valueScope)
            .then(options => virtualSelectModule.setOptions(options))


    onMount(() => {
        optionsSource = new OptionsSource(config)
        virtualSelectModule = new VirtualSelectModule(rootElement, config)
        virtualSelectModule
            .onChange(newValue => value = newValue)
    })

</script>

<div class="select" bind:this={rootElement}>
</div>