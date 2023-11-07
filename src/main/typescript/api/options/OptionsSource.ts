import {EndpointOptionsAccessor} from "./EndpointOptionsAccessor"
import {AbstractServiceBank} from "./serviceBank/AbstractServiceBank"
import {CarriersServiceBank} from "./serviceBank/CarriersServiceBank"
import {CountriesServiceBank} from "./serviceBank/CountriesServiceBank"
import {RegionsServiceBank} from "./serviceBank/RegionsServiceBank"
import {RoadsServiceBank} from "./serviceBank/RoadsServiceBank"
import {StationsServiceBank} from "./serviceBank/StationsServiceBank"
import {compare, concatMaps, deepCopyOf, valueOrDefault} from "../../util/data"

export class OptionsSource {

    private readonly endpoint?: EndpointOptionsAccessor
    private readonly serviceBank?: AbstractServiceBank

    private endpointOptions?: OptionsMap
    private serviceBankOptions?: OptionsMap

    private valueScope: object = {}

    constructor(private config: OptionSourcesConfig) {
        if (config.endpointSource)
            this.endpoint = new EndpointOptionsAccessor(config.endpointSource.path)

        if (config.serviceBankSource)
            this.serviceBank = (() => {
                switch (this.config.serviceBankSource.type){
                    case "carriers":  return new CarriersServiceBank()
                    case "countries": return new CountriesServiceBank()
                    case "regions":   return new RegionsServiceBank()
                    case "roads":     return new RoadsServiceBank()
                    case "stations":  return new StationsServiceBank()
                }
            })()
    }

    async retrieveOptionsByValueScope(valueScope: object): Promise<OptionsMap>{
        const retrieve = async () => {
            this.endpointOptions    = this.endpoint    ? await this.retrieveEndpointOptions(valueScope)     : null
            this.serviceBankOptions = this.serviceBank ? await this.retrieveServiceBankOptions(valueScope)  : null
            this.valueScope = deepCopyOf(valueScope)
            return concatMaps(
                valueOrDefault(this.endpointOptions,    new Map()),
                valueOrDefault(this.serviceBankOptions, new Map())
            )
        }

        await this.lastRetrievingPromise

        return this.lastRetrievingPromise = retrieve()
    }
    private lastRetrievingPromise: Promise<OptionsMap>

    private retrieveEndpointOptions = (valueScope: object) => this.retrieveOptions(
        valueScope,
        this.endpoint,
        {},
        this.config.endpointSource.triggerKeys,
        this.endpointOptions
    )

    private retrieveServiceBankOptions = (valueScope: object) => this.retrieveOptions(
        valueScope,
        this.serviceBank,
        {...this.config.serviceBankSource.properties},
        this.config.serviceBankSource.propertiesTriggerKeys,
        this.serviceBankOptions
    )

    private retrieveOptions(
        valueScope: object,
        optionsAccessor: EndpointOptionsAccessor,
        properties: object,
        propertiesToScopeKeys: string[] | object,
        defaultOptions: OptionsMap): Promise<OptionsMap> {

        let triggered: boolean

        if(propertiesToScopeKeys){
            const appendPropertyValue = (propertyKey: string, scopeValueKey: string) => {
                properties[propertyKey] = valueScope[scopeValueKey]
                triggered = triggered || !compare(valueScope[scopeValueKey], this.valueScope[scopeValueKey])
            }
            if(Array.isArray(propertiesToScopeKeys))
                for (const key of propertiesToScopeKeys)
                    appendPropertyValue(key, key)
            else
                for (const entry of Object.entries(propertiesToScopeKeys))
                    appendPropertyValue(entry[0], entry[1])
        }

        return triggered || !defaultOptions
            ? optionsAccessor.fetch(properties)
            : Promise.resolve(defaultOptions)
    }
}