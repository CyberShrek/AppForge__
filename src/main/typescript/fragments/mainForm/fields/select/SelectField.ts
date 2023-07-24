import Select from "../../../inputs/Select"
import {concatMaps, javaSetToSet, numberOf, stringify} from "../../../../utils/misc"
import {InputFragment} from "../../../abstract/InputFragment"
import {fetchEndpointOptions} from "../../../../utils/api/options/endpointOptions"
import {Field} from "../Field";

export class SelectField extends Field<Select>{
    constructor(location: FragmentLocation,
                protected configElement: HTMLElement) {
        const getBoolAttr=(attributeName: string): boolean => configElement.getAttribute(attributeName) === "true"
        super(location, Select, {
            maxValues: numberOf(configElement.getAttribute("max-values")),
            multiple: getBoolAttr("multiselect"),
            search: getBoolAttr("search"),
            showCodes: getBoolAttr("show-codes"),
            disableSelectAll: getBoolAttr("disable-select-all")
        } as SelectInputConfig)
    }

    optionsRetrieving = false

    private endpointConfigElement: HTMLElement = this.configElement.querySelector("endpoint")
    private endpointUrl: string = this.endpointConfigElement?.querySelector("url")?.textContent
    private endpointSubscribedFields: Map<string, Field<InputFragment<any>>|null> = new Map(this.endpointConfigElement ?
        [...this.endpointConfigElement.querySelectorAll<HTMLElement>("subscriptions field")]
            .map(fieldElement => [fieldElement.textContent, null]) : null)

    resolveSubscribedFields(getFieldFn: (key: string) => Field<InputFragment<any>>){
        this.endpointSubscribedFields.forEach((_, key) => {
            this.endpointSubscribedFields.set(key, getFieldFn(key))
        })
    }

    listenSubscribedFields(){
        if(!!this.endpointUrl) {
            if (this.endpointSubscribedFields.size > 0) {
                const headers: Map<string, string> = new Map()
                this.endpointSubscribedFields.forEach(<T>(field: Field<InputFragment<any>>, key) =>
                    field.input.subscribe(value => {
                        headers.set(key, value != null ? stringify(value) : null)
                        if (this.optionsRetrieving === true)
                            this.retrieveOptionsPromise(
                                "endpoint", fetchEndpointOptions(this.endpointUrl, headers))
                    }))
            } else this.retrieveOptionsPromise("endpoint", fetchEndpointOptions(this.endpointUrl))
        }
    }

    private optionsBuffer: Map<string, Options> = new Map()
    protected retrieveOptionsPromise(optionsGroupName: string, promise: Promise<Options>){
        promise.then(options => {
            this.optionsBuffer.set(optionsGroupName, options)
            this.input.setOptions(concatMaps(...this.optionsBuffer.values()))
        })
    }
}