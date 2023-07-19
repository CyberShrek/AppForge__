import Date from "../../../inputs/Date"
import {numberOf} from "../../../../utils/misc"

export class DateField extends Date{

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        const config: DateInputConfig = {}
        super(location, {maxDays: numberOf(configElement.getAttribute("max-days"))})
    }
}