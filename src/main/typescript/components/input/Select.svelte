<script lang="ts">
    import {onMount} from "svelte"
    import {VirtualSelectModule} from "../../modules/VirtualSelectModule"
    import {OptionsSource} from "../../api/options/OptionsSource"

    export let
        config: SelectConfig,
        pickedOptionKeys: string[] = [],
        valueScope: object = {}

    let rootElement: HTMLDivElement,
        optionModule: VirtualSelectModule,
        optionsSource: OptionsSource

    // Allow to apply outer changes
    $: if(pickedOptionKeys)
        optionModule?.setValue(pickedOptionKeys)

    // React to scope changes
    $: if(valueScope)
        optionsSource?.retrieveOptionsByValueScope(valueScope)
            .then(options => optionModule.setOptions(options))

    onMount(() => {
        optionsSource = new OptionsSource(config);
        (optionModule = new VirtualSelectModule(rootElement, config))
            .onChange(pickedKeys => pickedOptionKeys = pickedKeys)
    })

</script>

<div class="select" bind:this={rootElement}>
</div>