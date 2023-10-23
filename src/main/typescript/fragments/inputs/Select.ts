import {resolveCSS, resolveJS} from "../../util/resolver"
import {compareMaps, valueOrDefault} from "../../util/data"
import {Fragment} from "../Fragment"

resolveCSS("third-party/virtual-select")
const virtualSelectModulePromise = resolveJS("third-party/virtual-select.min")

export default class Select extends Fragment{

    pickedKeys: OptionKey[] = []

    readonly modulePromise = virtualSelectModulePromise

    constructor(private config: SelectConfig, onPick: (pickedOptions: OptionKey[]) => void) {
        super(`<div class="select"></div>`)
        this.modulePromise.then(() => {
            applyVirtualSelect(this.root, config)
            // this.root.
        })

        this.listen("change", event => {
            const value = event.currentTarget// @ts-ignore !!! Resolved by html import !!!
                .value

            const pickedKeys: typeof this.pickedKeys = value.length > 0 ? (
                typeof value === "object" ? value : [value]
            ) : []

            // Need for check real changes to prevent callback doubling after options setting
            if (this.pickedKeys.sort().toString() !== pickedKeys.sort().toString()) {
                this.pickedKeys = pickedKeys
                onPick(this.pickedKeys)
            }
        })
    }

    private options: Options = new Map()

    updateOptions(options: Options){
        if(compareMaps(this.options, options)) return
        const pickedKeysBuffer = [...this.pickedKeys]
        return this.modulePromise.then(() => {
            if(options && options.size > 0) {
                this.options = options
                this.root// @ts-ignore !!! Resolved by html import !!!
                    .setOptions(mapToVirtualSelectOptions(options))

                this.pickOptions(pickedKeysBuffer)

                this.root// @ts-ignore !!! Resolved by html import !!!
                    .enable()
            } else {
                this.root// @ts-ignore !!! Resolved by html import !!!
                    .disable()
                this.root// @ts-ignore !!! Resolved by html import !!!
                    .reset()
                this.root.blur()
            }
        })
    }

    pickOptions(keys: OptionKey[]){
        this.modulePromise.then(() => {
            // @ts-ignore !!! Resolved by html import !!!
            this.root.setValue(keys)
        })
    }

    findOptions=(keys: OptionKey[]): Options =>
        new Map(keys.map(key => [key, this.options.get(key)]))
}

function applyVirtualSelect(target: HTMLElement, config: SelectConfig){
    // @ts-ignore !!! Resolved by html import !!!
    VirtualSelect.init({
        ele: target,
        additionalClasses: "multiselect",
        disabled: true,
        autofocus: false,
        markSearchResults: true,
        zIndex: 100,
        optionsCount: 6,
        multiple: !!config.multiple,
        search: !!config.search,
        hasOptionDescription: !!config.showCodes,
        disableSelectAll: !!config.disableSelectAll,
        maxValues: config.maxValues,
        maxWidth: "100%",
        position: "bottom",
        disableAllOptionsSelectedText: true,

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