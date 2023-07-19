import Select from "../../../inputs/Select"
import {numberOf} from "../../../../utils/misc";

export class SelectField extends Select{

    constructor(location: FragmentLocation, configElement: HTMLElement) {
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
}