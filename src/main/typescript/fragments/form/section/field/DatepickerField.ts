import Datepicker from "../../../inputs/Datepicker"
import {Field} from "./Field"
import {Section} from "../Section"
import {create} from "../../../../util/domWizard";

export class DatepickerField extends Field<DateRange>{

    private datepicker = new Datepicker(this.config, range => this.triggerValueChange(range))

    constructor(section: Section, private config: DatepickerFieldConfig) {
        super(section, null)
        if(config.label)
            this.append(create(`<p>${config.label}</p>`))

        this.append(this.datepicker)

    }

    override triggerValueChange(newValue?: DateRange) {
        this.datepicker.pickDateRange(newValue)
        super.triggerValueChange(newValue)
    }
}