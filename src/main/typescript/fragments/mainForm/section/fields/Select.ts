import {Field} from "./Field"
import {Section} from "../Section"
import {javaMapToMap} from "../../../../utils/misc"
import {resolveCSS} from "../../../../utils/resolver"

resolveCSS("third-party/virtual-select")

export default class Select extends Field{

    value: Map<string, string>

    private staticMap: Map<string, string>

    private mappedListIDK: Map<string, string>

    constructor(public core: HTMLElement,
                public section: Section) { super(core, section)

        this.initStaticMap()

        section.form.onMount(() => {})

        applyMultiselect(document.getElementById("select"))
    }

    setOptions(options: Map<string, string>){

    }

    private initStaticMap(){
        const staticElement = this.core.querySelector("static")
        if(staticElement !== null)
            this.staticMap = javaMapToMap(staticElement.textContent)
    }
}

function applyMultiselect(core: HTMLElement){
    // @ts-ignore !!! Resolved by html import !!!
    VirtualSelect.init({
        ele: core,
        multiple: true,
        additionalClasses: "multiselect",
        valueKey: "1",
        options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
            { label: 'Option 3', value: '3' },
            { label: 'Option 3', value: '5' }
        ],
        search: true,
        showSelectedOptionsFirst:true,

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