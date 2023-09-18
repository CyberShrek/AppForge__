import {Field} from "./Field"
import {Section} from "../Section"
import {TextArea} from "../../../inputs/TextArea"

export class TextField extends Field<string>{

    constructor(section: Section, config: TextFieldConfig) {
        super(section, config, true, "")
        const textInput = new TextArea()
        textInput.onInputEnter(text => this.triggerValueChange(text))
        this.append(textInput)
    }
}