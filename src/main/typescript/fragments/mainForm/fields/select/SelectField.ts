import Select from "../../../inputs/Select"
import {concatMaps, javaSetToSet, numberOf, stringify} from "../../../../utils/misc"
import {InputFragment} from "../../../abstract/InputFragment"
import {fetchEndpointOptions} from "../../../../utils/api/options/endpointOptions"

export class SelectField extends Select{
    constructor(location: FragmentLocation,
                protected configElement: HTMLElement) {
        const getBoolAttr=(attributeName: string): boolean => configElement.getAttribute(attributeName) === "true"
        super(location, {
            maxValues: numberOf(configElement.getAttribute("max-values")),
            multiple: getBoolAttr("multiselect"),
            search: getBoolAttr("search"),
            showCodes: getBoolAttr("show-codes"),
            disableSelectAll: getBoolAttr("disable-select-all"),
            required: getBoolAttr("require")
        })
    }

    optionsRetrieving = false

    private endpointConfigElement: HTMLElement = this.configElement.querySelector("endpoint")
    private endpointUrl: string = this.endpointConfigElement?.querySelector("url")?.textContent
    private endpointSubscribedFields: Map<string, InputFragment<any>|null> = new Map(this.endpointConfigElement ?
        [...this.endpointConfigElement.querySelectorAll<HTMLElement>("subscriptions field")]
            .map(fieldElement => [fieldElement.textContent, null]) : null)

    private defaultKeys: Set<OptionKey> = javaSetToSet(this.configElement.querySelector("default")?.textContent)

    resolveSubscribedFields(getFieldFn: (key: string) => InputFragment<any>){
        this.endpointSubscribedFields.forEach((_, key) => {
            this.endpointSubscribedFields.set(key, getFieldFn(key))
        })
    }

    listenSubscribedFields(){
        if(this.endpointSubscribedFields.size > 0) {
            const headers: Map<string, string> = new Map()
            this.endpointSubscribedFields.forEach(<T>(field: InputFragment<T>, key) =>
                field.subscribe(value => {
                    headers.set(key, stringify(value))
                    if (this.optionsRetrieving === true)
                        this.retrieveOptionsPromise(
                            "endpoint", fetchEndpointOptions(this.endpointUrl, headers))
                }))
        }
        else this.retrieveOptionsPromise("endpoint", fetchEndpointOptions(this.endpointUrl))
    }


    private optionsBuffer: Map<string, Options> = new Map()
    protected retrieveOptionsPromise(optionsGroupName: string, promise: Promise<Options>){
        promise.then(options => {
            this.optionsBuffer.set(optionsGroupName, options)
            this.setOptions(concatMaps(...this.optionsBuffer.values()))
            if(!!this.defaultKeys) {
                this.selectOptions(this.defaultKeys)
                this.defaultKeys = undefined
            }
        })
    }
}