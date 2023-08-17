import {resolveCSS} from "../../utils/resolver"
import {InputFragment} from "../abstract/InputFragment"
import {createDivElement} from "../../utils/DOMWizard"
import {compareMaps} from "../../utils/misc"

resolveCSS("third-party/virtual-select")

export default class Select extends InputFragment<Options>{

    private options: Options

    constructor(location: FragmentLocation, config: SelectInputConfig) {
        super(location)
        this.core = createDivElement({class: "select"})
        this.value = null
        // this.value = config.multiple === true ? new Set() : ""
        applyVirtualSelect(this.core, config)
        this.core.addEventListener("change", event => {
            // @ts-ignore !!! Resolved by html import !!!
            const value = event.currentTarget.value
            const selectedOptions: Options = value.length > 0 ? this.optionKeysToOptions(
                typeof value === "object" ? value : [value]
            ) : null

            // Need to check real changes to prevent doubling
            if(!compareMaps(this.value, selectedOptions))
                this.value = selectedOptions
        })
    }

    protected optionsRetrievalCallbacks: Set<() => Promise<Options>> = new Set()

    setOptions(options: Options){
        this.options = options
        const selectedKeysCache: Set<OptionKey> = new Set(!!this.value ? this.value.keys() : undefined)
        if(!!options && options.size > 0) {
            const defaultKeys: Set<OptionKey> = new Set(options.get("default")?.split(","))
            options.delete("default")
            // @ts-ignore !!! Resolved by html import !!!
            this.core.setOptions(mapToVirtualSelectOptions(options))
            this.setSelected(selectedKeysCache.size > 0 ? selectedKeysCache : defaultKeys)
            // @ts-ignore !!! Resolved by html import !!!
            this.core.enable()
        }
        else {
            // @ts-ignore !!! Resolved by html import !!!
            this.core.disable()
            // @ts-ignore !!! Resolved by html import !!!
            this.core.reset()
            this.core.blur()
        }
    }

    setSelected(values: Set<OptionKey> = new Set()){
        // @ts-ignore !!! Resolved by html import !!!
        this.core.setValue(Array.from(values))
    }

    private optionKeysToOptions=(keys: OptionKey[]): Options =>
        new Map(keys.map(key => [key, this.options.get(key)]))
}

function applyVirtualSelect(core: HTMLElement, config: SelectInputConfig){
    // @ts-ignore !!! Resolved by html import !!!
    VirtualSelect.init({
        ele: core,
        additionalClasses: "multiselect",
        disabled: true,
        autofocus: false,
        markSearchResults: true,
        zIndex: 100,
        optionsCount: 6,
        multiple: config.multiple,
        search: config.search,
        hasOptionDescription: config.showCodes,
        disableSelectAll: config.disableSelectAll,
        maxValues: config.maxValues,

        placeholder: "",
        noOptionsText: "Варианты не найдены",
        noSearchResultsText: "Результатов не найдено",
        selectAllText: "Выбрать все",
        searchPlaceholderText: "Поиск...",
        optionsSelectedText: "(выбрано)",
        optionSelectedText: "вариант выбран",
        allOptionsSelectedText: "Все",
        clearButtonText: "Очистить",
        moreText: "ещё..."
    })
}

function mapToVirtualSelectOptions(map: Map<string, string>): any[]{
    return [...map.entries()].map(entry => {
        return {
            label: entry[1],
            value: entry[0],
            alias: entry[0],
            description: entry[0]
        }
    })
}