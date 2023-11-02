<script lang="ts">

    import {resolveStyle, resolveModule} from "../../util/resolver"
    import {onMount} from "svelte"
    import {virtualSelectProperties} from "../../properties"
    import {compareMaps, deepCloneObject, mapToVirtualSelectOptions, valueOrDefault} from "../../util/data"
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
        pickOptions(pickedOptionKeys)

    // React to scope changes
    $: if(scopeValues)
        updateOptions().then(() => oldScopeValues = deepCloneObject(scopeValues))


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
            pickedOptionKeys = newValue.length > 0 ? (typeof newValue === "object" ? newValue : [newValue]) : []
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

    const retrieveEndpointOptions = (): Promise<typeof endpointOptions> => retrieveOptions(
        optionsSource.endpoint,
        {},
        config.endpointSource.triggerKeys,
        endpointOptions
    )

    function retrieveServiceBankOptions(): Promise<typeof serviceBankOptions> {
        if(optionsSource.serviceBank){
            const properties = {...config.endpointSource.properties}
            let hasTriggerChanges = false

            if(config.serviceBankSource.propertiesTriggerKeys)
                Object.entries(config.serviceBankSource.propertiesTriggerKeys).forEach((entry: [string, string]) => {
                    const propertyKey = entry[0],
                        scopeValueKey = entry[1]

                    properties[propertyKey] = scopeValues[scopeValueKey]
                    if(!compareObjects(scopeValues[scopeValueKey], oldScopeValues[scopeValueKey])) {
                        hasTriggerChanges = true
                    }
                })

            if(hasTriggerChanges || !endpointOptions) {
                return optionsSource.serviceBank.fetch(properties)
            }
        }
        return Promise.resolve(serviceBankOptions)
    }

    // Common function
    function retrieveOptions(
        optionsAccessor: OptionsAccessor,
        properties: object,
        propertiesToScopeKeys: string[] | object,
        defaultOptions: typeof options): Promise<typeof options> {

        if(optionsAccessor){
            let hasTriggerChanges = false

            const appendPropertyValue = (propertyKey: string, scopeValueKey: string) => {
                properties[propertyKey] = scopeValues[scopeValueKey]
                hasTriggerChanges = !compareObjects(scopeValues[scopeValueKey], oldScopeValues[scopeValueKey])
            }

            if(propertiesToScopeKeys){
                if(Array.isArray(propertiesToScopeKeys))
                    propertiesToScopeKeys.forEach(key => appendPropertyValue(key, key))
                else
                    Object.entries(propertiesToScopeKeys).forEach((entry: [string, string]) => appendPropertyValue(entry[0], entry[1]))
            }

            if(hasTriggerChanges || !endpointOptions) {
                return optionsAccessor.fetch(properties)
            }
        }
        return Promise.resolve(defaultOptions)
    }

    function setOptions(newOptions: typeof options){
        if(!compareMaps(options, newOptions)) {
            if (newOptions && newOptions.size > 0) {
                const pickedOptionsBuffer = [...pickedOptionKeys]
                options = newOptions
                virtualSelectElement.setOptions(mapToVirtualSelectOptions(newOptions))
                pickedOptionKeys = pickedOptionsBuffer
                virtualSelectElement.enable()
            } else {
                virtualSelectElement.disable()
                virtualSelectElement.reset()
                virtualSelectElement.blur()
            }
        }
    }

    function pickOptions(optionKeys, applyToElement = true){
        // Check real changes to prevent callback doubling after options setting
        if (pickedOptionKeys.sort().toString() !== optionKeys.sort().toString()) {
            pickedOptionKeys = deepCloneObject(optionKeys)
            if (applyToElement)
                virtualSelectElement?.setValue(optionKeys)
        }
    }

    const findOptions=(keys: string[]): typeof options =>
        new Map(keys.map(key => [key, this.options.get(key)]))

</script>

<div class="select" bind:this={virtualSelectElement}>
</div>