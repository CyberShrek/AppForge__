import Checkbox from "../../../inputs/Checkbox"
import {Field} from "./Field"

export class CheckboxField extends Field<Checkbox>{

    constructor(config: CheckboxFieldConfig) {
        super(config)
        this.append()
    }
}