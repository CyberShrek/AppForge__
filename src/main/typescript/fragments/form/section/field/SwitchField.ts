import Checkbox from "../../../inputs/Checkbox"
import {Field} from "./Field"
import {Section} from "../Section"
import {Switch} from "../../../inputs/Switch"

export class SwitchField extends Field<boolean>{

    constructor(section: Section, config: SwitchFieldConfig) {
        super(section, false,
            new Switch(config, toggled => this.triggerValueChange(toggled)))
    }
}