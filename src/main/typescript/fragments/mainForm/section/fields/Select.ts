import {Field} from "../../Field"
import {Section} from "../Section"
import {javaMapToMap, javaSetToSet, mapToOptions, splitJavaCollection} from "../../../../utils/misc"
import {resolveCSS} from "../../../../utils/resolver"
import {
    fetchCarriersByDate,
    fetchCountriesByDate,
    fetchRoadsByCountriesAndDate, fetchStationsByRoadsAndDate
} from "../../../../utils/api/serviceBank"
import {fetchOptions} from "../../../../utils/api/misc"
resolveCSS("third-party/virtual-select.min")

export default class Select extends Field{

    value: Option["value"][]

    private staticMap: Map<string, string>

    // TODO Should be inherited from abstract Field
    private defaultValue: Option["value"][]

    constructor(core: HTMLElement,
                public section: Section) {super(core, section)

        this.initStaticMap()
        this.initDefaultValues()

        section.form.onMount(() => {
            this.subscribeToAllNecessaryFields()
            applyVirtualSelectToElement(core)
            this.interceptChangeEvents()

            if(this.staticMap) this.setMap(this.staticMap)
            if(this.defaultValue) this.selectOptions(this.defaultValue)

        })
    }

    setMap(map: Map<string, string>){
        this.setOptions(mapToOptions(map))
    }

    setOptions(options: Option[]){
        const enabledOptionsCache = this.value
        if(options && options.length > 0) {
            // @ts-ignore !!! Resolved by html import !!!
            this.coreElement.setOptions(options)
            this.selectOptions(enabledOptionsCache)
            // @ts-ignore !!! Resolved by html import !!!
            this.coreElement.enable()
        }
        else {
            // @ts-ignore !!! Resolved by html import !!!
            this.coreElement.disable()
            // @ts-ignore !!! Resolved by html import !!!
            this.coreElement.reset()
            this.coreElement.blur()
        }
    }

    selectOptions(values: Option["value"][]){
        // @ts-ignore !!! Resolved by html import !!!
        this.coreElement.setValue(values)
    }

    private initStaticMap(){
        const staticElement = this.coreElement.querySelector("static")
        if(staticElement !== null)
            this.staticMap = javaMapToMap(staticElement.textContent)
    }

    private initDefaultValues(){
        const staticElement = this.coreElement.querySelector("default")
        if(staticElement !== null)
            this.defaultValue = splitJavaCollection(staticElement.textContent)
    }

    private interceptChangeEvents(){
        const updateValues=(values: typeof this.value) => {
            this.value = values
            this.dispatchUpdate()
        }

        this.coreElement.addEventListener("change", function() {
            // @ts-ignore !!! Resolved by html import !!!
            updateValues(this.value)
        })
    }

    // TODO Refactor this crap
    private subscribeToAllNecessaryFields(){
        this.tryToSetCarriers()
        this.tryToSetCountries()
        this.tryToSetRoads()
        this.tryToSetStations()
        this.tryToSetDynamic()
    }


    private tryToSetCarriers(){
        const carriersElement = this.coreElement.querySelector("config > carriers")
        if(carriersElement !== null){
            const dateFieldLocation: string[] = carriersElement.querySelector("subscribes date").textContent.split(".")
            this.subscribeToField(
                dateFieldLocation[0],
                dateFieldLocation[1],
                (range: DateRange)  => this.updateCarriers(range[0])
            )
        }
    }

    private tryToSetCountries(){
        const countriesElement = this.coreElement.querySelector("config > countries")
        if(countriesElement !== null){
            let subscribedDateValue: DateRange[0],
                subscribedPostSovietValue: boolean

            const dateFieldLocation: string[] = countriesElement.querySelector("subscribes date").textContent.split(".")
            this.subscribeToField(
                dateFieldLocation[0],
                dateFieldLocation[1],
                (range: DateRange)  => {
                    subscribedDateValue = range[0]
                    if(subscribedPostSovietValue !== undefined)
                        this.updateCountries(subscribedDateValue, subscribedPostSovietValue)
                }
            )
            const postSovietCheckboxFieldLocation: string[] = countriesElement.querySelector("subscribes postsoviet").textContent.split(".")
            this.subscribeToField(
                postSovietCheckboxFieldLocation[0],
                postSovietCheckboxFieldLocation[1],
                (postSoviet: boolean)  => {
                    subscribedPostSovietValue = postSoviet
                    if(subscribedDateValue !== undefined)
                        this.updateCountries(subscribedDateValue, subscribedPostSovietValue)
                }
            )
        }
    }

    private tryToSetRoads(){
        const roadsElement = this.coreElement.querySelector("config > roads")
        if(roadsElement !== null){
            let subscribedDateValue: DateRange[0],
                subscribedCountriesValue: typeof this.value

            const dateFieldLocation: string[] = roadsElement.querySelector("subscribes date").textContent.split(".")
            this.subscribeToField(
                dateFieldLocation[0],
                dateFieldLocation[1],
                (range: DateRange)  => {
                    subscribedDateValue = range[0]
                }
            )
            const countriesLocation: string[] = roadsElement.querySelector("subscribes countries").textContent.split(".")
            this.subscribeToField(
                countriesLocation[0],
                countriesLocation[1],
                (values: typeof this.value)  => {
                    subscribedCountriesValue = values
                    if(subscribedDateValue && subscribedCountriesValue){
                        this.updateRoads(subscribedCountriesValue, subscribedDateValue)
                    }
                }
            )
        }
    }

    private tryToSetStations(){
        const stationsElement = this.coreElement.querySelector("config > stations")
        if(stationsElement !== null){
            let subscribedDateValue: DateRange[0],
                subscribedRoadsValue: typeof this.value

            this.setupSubscribe(stationsElement, "subscribes date",
                (range: DateRange) => subscribedDateValue = range[0])

            this.setupSubscribe(stationsElement, "subscribes roads",
                (values: typeof this.value)  => {
                    subscribedRoadsValue = values
                    if(subscribedDateValue && subscribedRoadsValue) {
                        this.updateStations(subscribedRoadsValue, subscribedDateValue)
                    }
                }
            )
        }
    }

    private setupSubscribe(relativeElement: Element = this.coreElement,
                           fieldLocationTextSelector: string,
                           callback: (value) => void){

        const locationEntry = relativeElement
            .querySelector(fieldLocationTextSelector)
            .textContent
            .split(".")

        this.subscribeToField(
            locationEntry[0],
            locationEntry[1],
            callback)
    }

    private tryToSetDynamic(){
        const dynamicElement = this.coreElement.querySelector("config > dynamic")
        if(dynamicElement !== null) {
            const url: string = dynamicElement.querySelector("url").textContent
            const subscribes: Set<string> = javaSetToSet(dynamicElement.querySelector("subscribes").textContent),
                subscribeKeyAndValues: Map<string, string> = new Map()

            subscribes.forEach(subscribeText => {
                const subscribeLocation = subscribeText.split(".")
                this.subscribeToField(
                    subscribeLocation[0],
                    subscribeLocation[1],
                    (value) => {
                        subscribeKeyAndValues.set(subscribeText, value)
                        if(subscribes.size === subscribeKeyAndValues.size)
                            this.updateDynamic(url, subscribeKeyAndValues)
                    }
                )
            })
        }
    }

    private updateDynamic(url: string, subscribeKeyAndValues: Map<string, string>){
        fetchOptions(url, subscribeKeyAndValues).then(options => this.setOptions(options))
    }

    private updateCarriers(date: DateRange[0]){
        fetchCarriersByDate(date).then(carriers => this.setOptions(carriers))
    }

    private updateCountries(date: DateRange[0], postSoviet: boolean){
        fetchCountriesByDate(date, postSoviet).then(countries => this.setOptions(countries))
    }

    private updateRoads(countries: typeof this.value, date: DateRange[0]){
        fetchRoadsByCountriesAndDate(countries, date).then(countries => this.setOptions(countries))
    }

    private updateStations(roads: typeof this.value, date: DateRange[0]){
        fetchStationsByRoadsAndDate(roads, date).then(countries => this.setOptions(countries))
    }
}

function applyVirtualSelectToElement(core: HTMLElement){
    const configElement = core.querySelector("config")
    // @ts-ignore !!! Resolved by html import !!!
    VirtualSelect.init({
        ele: core,
        multiple: configElement.getAttribute("multiselect"),
        additionalClasses: "multiselect",
        search: configElement.getAttribute("search"),
        disabled: true,
        autofocus: false,
        markSearchResults: true,
        optionsCount: 6,
        showSelectedOptionsFirst:true,
        hasOptionDescription: configElement.getAttribute("show-codes"),
        disableSelectAll: configElement.getAttribute("disable-select-all"),
        maxValues: configElement.getAttribute("max-values"),
        required: configElement.getAttribute("require"),

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