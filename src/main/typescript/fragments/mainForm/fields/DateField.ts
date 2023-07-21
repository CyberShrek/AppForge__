import DateInput from "../../inputs/DateInput"
import {numberOf} from "../../../utils/misc"

export class DateField extends DateInput{

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location, {maxDays: numberOf(configElement.getAttribute("max-days"))})
    }
}