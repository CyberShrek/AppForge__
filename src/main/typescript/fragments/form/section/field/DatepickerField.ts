import Datepicker from "../../../inputs/Datepicker"
import {Field} from "./Field"
import {Section} from "../Section"
import {create} from "../../../../util/domWizard";

export class DatepickerField extends Field<FormattedDate>{

    private calendar = new Datepicker(this.config, range => this.triggerValueChange(range))

    constructor(section: Section, private config: CalendarFieldConfig) {
        super(section, config, true, null)
        this.append(this.calendar)
        this.value = this.calendar.pickedDateRange
    }

    override triggerValueChange(newValue?: FormattedDate) {
        this.calendar.pickDateRange(newValue)
        super.triggerValueChange(newValue)
    }
}