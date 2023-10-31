<script lang="ts">

    import {resolveStyle, resolveModule} from "../../util/resolver"
    import {onMount} from "svelte"
    import {virtualSelectProperties} from "../../properties"
    import {compareMaps, mapToVirtualSelectOptions} from "../../util/data";

    resolveStyle("third-party/virtual-select")
    resolveModule("third-party/virtual-select.min").then(() => onMount(() => initVirtualSelect()))

    export let
        config: SelectConfig,
        pickedOptionKeys: string[] = []

    let virtualSelectElement: HTMLDivElement,
        options = new Map<string, string>()

    $: if(pickedOptionKeys)
        pickOptions(pickedOptionKeys)

    function initVirtualSelect(){
        // @ts-ignore !!! Resolved by html import !!!
        VirtualSelect.init({
            ...virtualSelectProperties,
            ele: virtualSelectElement,
            multiple: !!config.multiple,
            search: !!config.search,
            hasOptionDescription: !!config.showCodes,
            disableSelectAll: !!config.disableSelectAll,
            maxValues: config.maxValues
        })

        virtualSelectElement.addEventListener("change", event => {
            const newValue = event.currentTarget.value
            pickOptions(newValue.length > 0 ? (typeof newValue === "object" ? newValue : [newValue]) : [])
        })
    }

    function setOptions(newOptions: typeof options){
        if(compareMaps(options, newOptions)) return
        if(newOptions && newOptions.size > 0) {
            options = newOptions
            virtualSelectElement.setOptions(mapToVirtualSelectOptions(newOptions))
            pickOptions(pickedOptionKeys)
            virtualSelectElement.enable()
        } else {
            virtualSelectElement.disable()
            virtualSelectElement.reset()
            virtualSelectElement.blur()
        }
    }

    function pickOptions(optionKeys){
        // Check real changes to prevent callback doubling after options setting
        if (Array.from(pickedOptionKeys.keys()).sort().toString() !== optionKeys.sort().toString()) {
            pickedOptionKeys = optionKeys
            // @ts-ignore !!! Resolved by html import !!!
            virtualSelectElement?.setValue(pickedOptionKeys)
        }
    }

    const findOptions=(keys: string[]): typeof options =>
        new Map(keys.map(key => [key, this.options.get(key)]))

</script>

<div class="select" bind:this={virtualSelectElement}>
</div>