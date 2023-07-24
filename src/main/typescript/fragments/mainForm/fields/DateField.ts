import DateInput from "../../inputs/DateInput"
import {numberOf} from "../../../utils/misc"
import {Field} from "./Field";

export class DateField extends Field<DateInput>{

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location, DateInput, {
            maxDays: numberOf(configElement.getAttribute("max-days"))
        })
    }
}