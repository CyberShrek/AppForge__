<script lang="ts">

    import {resolveStyle, resolveModule} from "../../util/resolver"
    import {onMount} from "svelte"
    import {virtualSelectProperties} from "../../properties"
    import {compareMaps, mapToVirtualSelectOptions, valueOrDefault} from "../../util/data"
    import {OptionsAccessor} from "../../api/OptionsAccessor"
    import {AbstractServiceBank} from "../../api/serviceBankOptions/AbstractServiceBank"
    import {ServiceBankFactory} from "../../api/serviceBankOptions/ServiceBankFactory"
    import {compareObjects, concatMaps} from "../../util/data.js"

    resolveStyle("third-party/virtual-select")

    export let
        config: SelectConfig,
        pickedOptionKeys: string[] = [],
        scopeValues: object = {}

    let options = new Map<string, string>(),
        endpointOptions: typeof options,
        serviceBankOptions: typeof options,
        optionsSource: {
            endpoint?: OptionsAccessor,
            serviceBank?: AbstractServiceBank
        } = {},
        oldScopeValues: typeof scopeValues = {},
        virtualSelectElement: HTMLDivElement

    // // Allow to apply outer changes
    $: if(pickedOptionKeys)
        console.log(pickedOptionKeys)

    // React to scope changes
    $: if(scopeValues) {
        console.log("updateOptions")
        updateOptions()
        oldScopeValues = scopeValues
    }

    onMount(() => resolveModule("third-party/virtual-select.min").then(() => {
        // Actual initialization
        VirtualSelect.init({
            ...virtualSelectProperties,
            ele: virtualSelectElement,
            multiple: !!config.multiple,
            search: !!config.search,
            hasOptionDescription: !!config.showCodes,
            disableSelectAll: !!config.disableSelectAll,
            maxValues: config.maxValues
        })

        // Listen changes
        virtualSelectElement.addEventListener("change", event => {
            const newValue = event.currentTarget.value
            pickOptions(newValue.length > 0 ? (typeof newValue === "object" ? newValue : [newValue]) : [], false)
        })

        // Setup sources
        optionsSource.endpoint = config.endpointSource
            ? new OptionsAccessor(config.endpointSource.path)
            : null
        optionsSource.serviceBank = config.serviceBankSource
            ? ServiceBankFactory.createOptionsAccessor(config.serviceBankSource.type)
            : null

        updateOptions()
    }))

    async function updateOptions(){
        endpointOptions = await retrieveEndpointOptions()
        serviceBankOptions = await retrieveServiceBankOptions()
        setOptions(concatMaps(
            valueOrDefault(endpointOptions, new Map()),
            valueOrDefault(serviceBankOptions, new Map())
        ))
    }

    function retrieveEndpointOptions(): Promise<typeof endpointOptions> {
        if(optionsSource.endpoint) {
            const endpointProperties = {}
            let hasTriggerChanges = false
            config.endpointSource.triggerKeys?.forEach(key => {
                endpointProperties[key] = scopeValues[key]
                if(!compareObjects(scopeValues[key], oldScopeValues[key]))
                    hasTriggerChanges = true
            })
            if(hasTriggerChanges || !endpointOptions)
                return optionsSource.endpoint.fetch(endpointProperties)
        }
        return Promise.resolve(endpointOptions)
    }

    function retrieveServiceBankOptions(): Promise<typeof options> {
        return Promise.resolve(serviceBankOptions)
    }

    function setOptions(newOptions: typeof options){
        if(compareMaps(options, newOptions)) return
        console.log("setOptions")
        if(newOptions && newOptions.size > 0) {
            const pickedOptionsBuffer = [...pickedOptionKeys]
            options = newOptions
            virtualSelectElement.setOptions(mapToVirtualSelectOptions(newOptions))
            pickOptions(pickedOptionsBuffer)
            virtualSelectElement.enable()
        } else {
            virtualSelectElement.disable()
            virtualSelectElement.reset()
            virtualSelectElement.blur()
        }
    }

    function pickOptions(optionKeys, applyToElement = true){
        // Check real changes to prevent callback doubling after options setting
        // if (pickedOptionKeys.sort().toString() !== optionKeys.sort().toString())
        console.log("pickOptions")
        pickedOptionKeys = optionKeys

        if(applyToElement)
            virtualSelectElement?.setValue(optionKeys)
    }

    const findOptions=(keys: string[]): typeof options =>
        new Map(keys.map(key => [key, this.options.get(key)]))

</script>

<div class="select" bind:this={virtualSelectElement}>
</div>