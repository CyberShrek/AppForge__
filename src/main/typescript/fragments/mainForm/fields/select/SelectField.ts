import Select from "../../../inputs/Select"
import {concatMaps, numberOf} from "../../../../utils/misc"
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
    private endpointPath: string = this.endpointConfigElement?.querySelector("path")?.textContent
    private endpointTriggerFields: Map<Field<InputFragment<any>>|null> = new Map(this.endpointConfigElement ?
        [...this.endpointConfigElement.querySelectorAll<HTMLElement>("subscriptions field")]
            .map(fieldElement => [fieldElement.textContent, null]) : null)

    resolveTriggerFields(getFieldFn: (location: FieldAddress) => Field<InputFragment<any>>){
        this.endpointTriggerFields.forEach((_, location) => {
            this.endpointTriggerFields.set(location, getFieldFn(location))
        })
    }

    listenSubscribedFields(){
        if(!!this.endpointPath) {
            if (this.endpointTriggerFields.size > 0) {
                this.endpointTriggerFields.forEach(<T>(field: Field<InputFragment<any>>, key) =>
                    field.input.subscribe(value => {
                        if (this.optionsRetrieving === true)
                            this.retrieveOptionsPromise(
                                "endpoint", fetchEndpointOptions(this.endpointPath, this.endpointTriggerFields))
                    }))
            } else this.retrieveOptionsPromise("endpoint", fetchEndpointOptions(this.endpointPath))
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