import {Field} from "./Field"
import {Section} from "../Section"
import {javaMapToMap, mapToOptions} from "../../../../utils/misc"
import {resolveCSS} from "../../../../utils/resolver"
import {updateEvent} from "../../../../entities/events";

resolveCSS("third-party/virtual-select")

export default class Select extends Field{

    value: string[]

    private staticMap: Map<string, string>

    constructor(public core: HTMLElement,
                public section: Section) {super(core, section)

        this.initStaticMap()
        applyMultiselect(core)
        this.setMap(this.staticMap)
        this.overloadChangeEvents()

        section.form.onMount(() => {
            this.subscribeToAllDependOnFields()
        })
    }

    setMap(map: Map<string, string>){
        // @ts-ignore !!! Resolved by html import !!!
        this.core.setOptions(mapToOptions(map))
    }

    private initStaticMap(){
        const staticElement = this.core.querySelector("static")
        if(staticElement !== null)
            this.staticMap = javaMapToMap(staticElement.textContent)
    }

    private overloadChangeEvents(){
        let values: string[]
        this.core.addEventListener(updateEvent.type, function() {
            values = this.value
        })
        this.value = values
        this.dispatchUpdate()
    }

    private subscribeToAllDependOnFields(){

    }
}

function applyMultiselect(core: HTMLElement){
    // @ts-ignore !!! Resolved by html import !!!
    VirtualSelect.init({
        ele: core,
        multiple: true,
        additionalClasses: "multiselect",
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