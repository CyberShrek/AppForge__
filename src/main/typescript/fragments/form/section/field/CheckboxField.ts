import Checkbox from "../../../inputs/Checkbox"
import {Field} from "./Field"
import {Section} from "../Section"
import {Switch} from "../../../inputs/Switch"

export class CheckboxField extends Field<boolean>{

    constructor(section: Section, config: CheckboxFieldConfig | SwitchFieldConfig) {
        super(section,
            new (config.type === "switch" ? Switch : Checkbox)(config, toggled => this.triggerValueChange(toggled)))
    }
}