import {resolveModule, resolveStyle} from "../util/resolver"
import {virtualSelectProperties} from "../properties"
import {compareMaps, deepCopyOf, mapToVirtualSelectOptions} from "../util/data"
import {InputModule} from "./abstract/InputModule";

const initialPromises = Promise.all([
    resolveStyle("third-party/virtual-select"),
    resolveModule("third-party/virtual-select.min")
])

export class VirtualSelectModule extends InputModule<OptionKey[]>{

    private options: OptionsMap = new Map<string, string>()

    constructor(private rootElement: HTMLElement,
                config: SelectConfig) {

        super((newKeys: string[]) =>
            rootElement
                // @ts-ignore Resolved by module import
                .setValue?.(newKeys))

        this.value = []

        initialPromises.then(() => {
            // @ts-ignore Resolved by module import
            VirtualSelect.init({
                ...virtualSelectProperties,
                ele: rootElement,
                multiple: !!config.multiple,
                search: !!config.search,
                hasOptionDescription: !!config.showCodes,
                disableSelectAll: !!config.disableSelectAll,
                maxValues: config.maxValues
            })
        })

        rootElement.addEventListener("change", event => {
            const newValue = event.currentTarget
                // @ts-ignore Resolved by module import
                .value
            super.setValue(newValue.length > 0 ? (typeof newValue === "object" ? newValue : [newValue]) : [], false)
        })
    }

    override setValue(optionKeys: OptionKey[]){
        initialPromises.then(() => super.setValue(optionKeys))
    }

    setOptions(newOptions: OptionsMap, initialKey?: OptionKey) {
        initialPromises.then(() => {
            if (!compareMaps(this.options, newOptions)) {
                if (newOptions && newOptions.size > 0) {
                    const valueBuffer = initialKey ? [initialKey] : [...this.value]
                    this.rootElement // @ts-ignore Resolved by module import
                        .enable()
                    this.rootElement // @ts-ignore Resolved by module import
                        .setOptions(mapToVirtualSelectOptions(newOptions))
                    // @ts-ignore Resolved by module import
                    this.rootElement.setValue(valueBuffer)
                } else {
                    this.rootElement // @ts-ignore Resolved by module import
                        .disable()
                    this.rootElement // @ts-ignore Resolved by module import
                        .reset()
                    this.rootElement.blur()
                }

                this.options = new Map(newOptions)
            }
        })
    }

    findOptions=(keys: string[]): OptionsMap => new Map(keys.map(key => [key, this.options.get(key)]))
}