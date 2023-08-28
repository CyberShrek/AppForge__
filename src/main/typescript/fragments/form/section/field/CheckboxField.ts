import Checkbox from "../../../inputs/Checkbox"
import {Field} from "./Field"

export class CheckboxField extends Field<Checkbox>{

    constructor(config: CheckBoxConfig) {
        super(config)
        this.append()
    }
}