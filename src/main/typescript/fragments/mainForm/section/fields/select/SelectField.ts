import Select from "../../../../inputs/Select"
import {concatMaps, numberOf} from "../../../../../utils/misc"
import {InputFragment} from "../../../../abstract/InputFragment"
import {fetchEndpointOptions} from "../../../../../utils/api/misc";

export class SelectField extends Select{
    constructor(location: FragmentLocation,
                private configElement: HTMLElement) {
        const getBoolAttr=(attributeName: string): boolean => Boolean(configElement.getAttribute(attributeName))
        const config: SelectInputConfig = {
            maxValues: numberOf(configElement.getAttribute("max-values")),
            multiple: getBoolAttr("multiselect"),
            search: getBoolAttr("search"),
            showCodes: getBoolAttr("show-codes"),
            disableSelectAll: getBoolAttr("disable-select-all"),
            required: getBoolAttr("require")
        }
        super(location, config)
    }

    private  endpointConfigElement: HTMLElement = this.configElement.querySelector("endpoint")
    private  endpointUrl: string = this.endpointConfigElement.querySelector("url").textContent
    readonly endpointSubscribedFields: Map<string, InputFragment<any>|null> = new Map(
        [...this.endpointConfigElement.querySelectorAll<HTMLElement>("subscriptions field")]
            .map(fieldElement => [fieldElement.textContent, null]))

    protected optionsBuffer: Map<string, Options> = new Map()
    protected applyOptionsBuffer(){
        this.setOptions(concatMaps(...this.optionsBuffer.values()))
    }

    startOptionsRetrieving(){
        let isStarted = false

        this.endpointSubscribedFields.forEach((field, key) =>
            field.subscribe(value => {
                if(isStarted)
                    fetchEndpointOptions(this.endpointUrl, null)
                        .then(options => this.endpointOptions = options)
            }))

        isStarted = true
    }
}