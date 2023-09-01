import Datepicker from "../../../inputs/Datepicker"
import {Field} from "./Field"
import {Section} from "../Section"

export class DatepickerField extends Field<DateRange>{

    constructor(section: Section, config: DatepickerFieldConfig) {
        super(section, new Datepicker(config, range => this.triggerValueChange(range)))
    }
}