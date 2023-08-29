import Datepicker from "../../../inputs/Datepicker"
import {numberOf} from "../../../../util/data"
import {Field} from "./Field";

export class DateField extends Field<Datepicker>{

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location, Datepicker, {
            maxDays: numberOf(configElement.getAttribute("max-days"))
        })
    }
}