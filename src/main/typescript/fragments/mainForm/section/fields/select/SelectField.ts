import Select from "../../../../inputs/Select"
import {numberOf} from "../../../../../utils/misc"
import {InputFragment} from "../../../../abstract/InputFragment"

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

    private  optionsEndpointUrl: string = this.configElement.querySelector("endpoint subscriptions url").textContent
    readonly subscribedFields: Map<string, InputFragment<any>|null> = new Map(
        [...this.configElement.querySelectorAll<HTMLElement>("endpoint subscriptions field")]
            .map(fieldElement => [fieldElement.textContent, null]))

    listenSubscribes(){
        const fieldValues: {[filedKey: string]: string} = {}
        this.subscribedFields.forEach((field, key) =>
            field.subscribe(value => ))
    }

    subscribeToField(fieldKey: string, field: InputFragment<any>){
        field.subscribe(value => {})

    }
}