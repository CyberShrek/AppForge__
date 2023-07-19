import {resolveCSS} from "../../utils/resolver"
import {InputFragment} from "../abstract/InputFragment"
import {createDivElement} from "../../utils/DOMWizard"
import {concatMaps} from "../../utils/misc"

resolveCSS("third-party/virtual-select.min")

export default class Select extends InputFragment<Set<OptionValue>>{

    constructor(location: FragmentLocation, config: SelectInputConfig) {
        super(location)
        this.core = createDivElement({class: "select"})
        applyVirtualSelect(this.core, config)
        this.core.addEventListener("change", event =>
            // @ts-ignore !!! Resolved by html import !!!
            this.value = event.currentTarget.value
        )
    }

    retrieveOptions(...retrievalCallbacks: (() => Promise<Map<OptionKey, OptionValue>>)[]){
        const optionsBuffer: Map<OptionKey, OptionValue> = new Map()
        retrievalCallbacks.forEach(callback => callback()
            .then(options => concatMaps(optionsBuffer, options)))

        this.setOptions(optionsBuffer)
    }

    setOptions(options: Map<OptionKey, OptionValue>){
        const enabledOptionsCache = this.value
        if(!!options && options.size > 0) {
            // @ts-ignore !!! Resolved by html import !!!
            this.core.setOptions(mapToVirtualSelectOptions(options))
            this.selectOptions(enabledOptionsCache)
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

    selectOptions(values: Set<OptionValue>){
        // @ts-ignore !!! Resolved by html import !!!
        this.core.setValue(Array.from(values))
    }
}

function applyVirtualSelect(core: HTMLElement, config: SelectInputConfig){
    // @ts-ignore !!! Resolved by html import !!!
    VirtualSelect.init({
        ele: core,
        multiple: !!config.multiple,
        additionalClasses: "multiselect",
        search: !!config.search,
        disabled: true,
        autofocus: false,
        markSearchResults: true,
        optionsCount: 6,
        showSelectedOptionsFirst:true,
        hasOptionDescription: config.showCodes,
        disableSelectAll: !!config.disableSelectAll,
        maxValues: config.maxValues,
        required: !!config.required,

        placeholder: "Выберите",
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