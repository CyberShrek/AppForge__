import Datepicker from "../../../inputs/Datepicker"
import {Field} from "./Field"
import {Section} from "../Section"
import {create} from "../../../../util/domWizard";

export class DatepickerField extends Field<DateRange>{

    private datepicker = new Datepicker(this.config, range => this.triggerValueChange(range))

    constructor(section: Section, private config: DatepickerFieldConfig) {
        super(section, config, true, null)
        this.append(this.datepicker)
        this.value = this.datepicker.pickedDateRange
    }

    override triggerValueChange(newValue?: DateRange) {
        this.datepicker.pickDateRange(newValue)
        super.triggerValueChange(newValue)
    }
}