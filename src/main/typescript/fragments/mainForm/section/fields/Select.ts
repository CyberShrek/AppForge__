import {Field} from "./Field"
import {Section} from "../Section"
import {javaMapToMap, mapToOptions} from "../../../../utils/misc"
import {resolveCSS} from "../../../../utils/resolver"
import {
    fetchCarriersByDate,
    fetchCountriesByDate,
    fetchRoadsByCountriesAndDate, fetchStationsByRoadsAndDate
} from "../../../../utils/api/serviceBank";
resolveCSS("third-party/virtual-select.min")

export default class Select extends Field{

    value: Option["value"][]

    private staticMap: Map<string, string>

    constructor(public core: HTMLElement,
                public section: Section) {super(core, section)

        this.initStaticMap()

        section.form.onMount(() => {
            this.subscribeToAllNecessaryFields()
            applyVirtualSelectToElement(core)
            this.interceptChangeEvents()
            if(this.staticMap)
                this.setMap(this.staticMap)
        })
    }

    setMap(map: Map<string, string>){
        this.setOptions(mapToOptions(map))
    }

    setOptions(options: Option[]){
        const enabledOptionsCache = this.value
        if(options && options.length > 0) {
            // @ts-ignore !!! Resolved by html import !!!
            this.core.setOptions(options)
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

    selectOptions(values: Option["value"][]){
        // @ts-ignore !!! Resolved by html import !!!
        this.core.setValue(values)
    }

    private initStaticMap(){
        const staticElement = this.core.querySelector("static")
        if(staticElement !== null)
            this.staticMap = javaMapToMap(staticElement.textContent)
    }

    private interceptChangeEvents(){
        const updateValues=(values: typeof this.value) => {
            this.value = values
            this.dispatchUpdate()
        }

        this.core.addEventListener("change", function() {
            // @ts-ignore !!! Resolved by html import !!!
            updateValues(this.value)
        })
    }

    private subscribeToAllNecessaryFields(){
        this.tryToSetCarriers()
        this.tryToSetCountries()
        this.tryToSetRoads()
        this.tryToSetStations()
    }

    private tryToSetCarriers(){
        const carriersElement = this.core.querySelector("config > carriers")
        if(carriersElement !== null){
            const dateFieldLocation: string[] = carriersElement.querySelector("subscribes date").textContent.split(".")
            this.subscribeToField(
                dateFieldLocation[0],
                dateFieldLocation[1],
                (range: DateRange)  => this.updateCarriers(range.start)
            )
        }
    }

    private tryToSetCountries(){
        const countriesElement = this.core.querySelector("config > countries")
        if(countriesElement !== null){
            const dateFieldLocation: string[] = countriesElement.querySelector("subscribes date").textContent.split(".")
            this.subscribeToField(
                dateFieldLocation[0],
                dateFieldLocation[1],
                (range: DateRange)  => this.updateCountries(range.start)
            )
        }
    }

    private tryToSetRoads(){
        const roadsElement = this.core.querySelector("config > roads")
        if(roadsElement !== null){
            let subscribedDateValue: DateRange["start"],
                subscribedCountriesValue: typeof this.value

            const dateFieldLocation: string[] = roadsElement.querySelector("subscribes date").textContent.split(".")
            this.subscribeToField(
                dateFieldLocation[0],
                dateFieldLocation[1],
                (range: DateRange)  => {
                    subscribedDateValue = range.start
                }
            )
            const countriesLocation: string[] = roadsElement.querySelector("subscribes countries").textContent.split(".")
            this.subscribeToField(
                countriesLocation[0],
                countriesLocation[1],
                (values: typeof this.value)  => {
                    subscribedCountriesValue = values
                    if(subscribedDateValue !== undefined){
                        this.updateRoads(subscribedCountriesValue, subscribedDateValue)
                    }
                }
            )
        }
    }

    private tryToSetStations(){
        const stationsElement = this.core.querySelector("config > stations")
        if(stationsElement !== null){
            let subscribedDateValue: DateRange["start"],
                subscribedRoadsValue: typeof this.value

            const dateFieldLocation: string[] = stationsElement.querySelector("subscribes date").textContent.split(".")
            this.subscribeToField(
                dateFieldLocation[0],
                dateFieldLocation[1],
                (range: DateRange)  => {
                    subscribedDateValue = range.start
                }
            )
            const countriesLocation: string[] = stationsElement.querySelector("subscribes roads").textContent.split(".")
            this.subscribeToField(
                countriesLocation[0],
                countriesLocation[1],
                (values: typeof this.value)  => {
                    subscribedRoadsValue = values
                    if(subscribedDateValue !== undefined){
                        this.updateStations(subscribedRoadsValue, subscribedDateValue)
                    }
                }
            )
        }
    }

    private updateCarriers(date: DateRange["start"]){
        fetchCarriersByDate(date).then(carriers => this.setOptions(carriers))
    }

    private updateCountries(date: DateRange["start"]){
        fetchCountriesByDate(date, false).then(countries => this.setOptions(countries))
    }

    private updateRoads(countries: typeof this.value, date: DateRange["start"]){
        fetchRoadsByCountriesAndDate(countries, date).then(countries => this.setOptions(countries))
    }

    private updateStations(roads: typeof this.value, date: DateRange["start"]){
        fetchStationsByRoadsAndDate(roads, date).then(countries => this.setOptions(countries))
    }
}

function applyVirtualSelectToElement(core: HTMLElement){
    const configElement = core.querySelector("config")
    // @ts-ignore !!! Resolved by html import !!!
    VirtualSelect.init({
        ele: core,
        multiple: true,
        additionalClasses: "multiselect",
        search: true,
        disabled: true,
        autofocus: false,
        markSearchResults: true,
        optionsCount: 6,
        showSelectedOptionsFirst:true,
        hasOptionDescription: configElement.getAttribute("show-codes"),

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