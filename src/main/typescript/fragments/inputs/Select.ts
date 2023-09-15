import {resolveCSS, resolveJS} from "../../util/resolver"
import {compareMaps, valueOrDefault} from "../../util/data"
import {Fragment} from "../Fragment"

resolveCSS("third-party/virtual-select")
const virtualSelectModulePromise = resolveJS("third-party/virtual-select.min")

export default class Select extends Fragment{

    static readonly defaultKeyName = "default"

    pickedOptions: Options = new Map()

    constructor(config: SelectConfig, onPick: (pickedOptions: Options) => void) {
        super(`<div class="select"></div>`)
        virtualSelectModulePromise.then(() => applyVirtualSelect(this.root, config))

        this.listen("change", event => {
            const value = event.currentTarget// @ts-ignore !!! Resolved by html import !!!
                .value

            const pickedOptions: Options = value.length > 0 ? this.findOptions(
                typeof value === "object" ? value : [value]
            ) : new Map()

            // Need for check real changes to prevent callback doubling after options setting
            if(!compareMaps(this.pickedOptions, pickedOptions)) {
                this.pickedOptions = pickedOptions
                onPick(this.pickedOptions)
            }
        })
    }

    private _options: Options

    get options(): Options{
        return this._options
    }

    set options(options: Options){
        virtualSelectModulePromise.then(() => {
            this._options = options
            if(options && options.size > 0) {
                this.root// @ts-ignore !!! Resolved by html import !!!
                    .setOptions(mapToVirtualSelectOptions(options))
                this.pickOptions(valueOrDefault(this.pickedKeys, this.defaultKeys))
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
        virtualSelectModulePromise.then(() => {
            // @ts-ignore !!! Resolved by html import !!!
            this.root.setValue(keys)
        })
    }

    findOptions=(keys: OptionKey[]): Options =>
        new Map(keys.map(key => [key, this.options.get(key)]))

    get pickedKeys(): OptionKey[]{
        return Array.from(this.pickedOptions.keys())
    }

    get defaultKeys(): OptionKey[]{
        return this.options.get(Select.defaultKeyName)?.split(",")
    }
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
        multiple: config.multiple,
        search: config.search,
        hasOptionDescription: config.showCodes,
        disableSelectAll: config.disableSelectAll,
        maxValues: config.maxValues,
        maxWidth: "100%",

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
    map.delete(Select.defaultKeyName)
    return [...map.entries()].map(entry => {
        return {
            label: entry[1],
            value: entry[0],
            alias: entry[0],
            description: entry[0]
        }
    })
}