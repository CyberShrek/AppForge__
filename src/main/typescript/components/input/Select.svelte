<script lang="ts">

    import {onMount} from "svelte"
    import {OptionsSource} from "../../api/options/OptionsSource"
    import {VirtualSelectModule} from "../../third-party/VirtualSelectModule"
    import {userInfo} from "../../store/userInfo";

    export let
        config: SelectConfig,
        value: string[],
        valueScope: object

    let rootElement: HTMLDivElement,
        optionsSource: OptionsSource,
        virtualSelectModule: VirtualSelectModule,
        initial = true

    // Allow to apply outer changes
    $: if(value)
        virtualSelectModule?.setValue(value)

    // React to scope changes
    $: if(valueScope) {
        optionsSource?.retrieveOptionsByValueScope(valueScope)
            .then(options => {
                virtualSelectModule.setOptions(options, initial ? getUserAssociatedServiceBankKeyOrNull() : null)
                initial = false
            })
    }

    onMount(() => {
        optionsSource = new OptionsSource(config)
        virtualSelectModule = new VirtualSelectModule(rootElement, config)
        virtualSelectModule
            .onChange(newValue => value = newValue)

        value = virtualSelectModule.getValue()
    })

    function getUserAssociatedServiceBankKeyOrNull(): OptionKey | null {

        switch (config.serviceBankSource?.type) {
            case "carriers": return userInfo.carrier
            case "countries": return userInfo.country
            case "regions": return userInfo.region
            case "roads": return userInfo.road
            case "stations": return userInfo.station
        }
        return null
    }

</script>

<div class="select" bind:this={rootElement}>
</div>