import {Trigger} from "../abstract/Trigger"
import {createDivElement, createInputElement, createLabelElement, generateUniqueId} from "../../util/domWizard"

export default class Checkbox extends Trigger<boolean>{

    private checkBoxElement = createInputElement("checkbox", {id: generateUniqueId("checkbox")})
    private labelElement    = createLabelElement("", {for: this.checkBoxElement.id})

    constructor(location: FragmentLocation, config: CheckboxInputConfig) {
        super(location)
        this.core = createDivElement({class: "checkbox"})
        this.core.append(this.checkBoxElement, this.labelElement)
        this.label = config.label
        const updateValue=() => this.value = this.checkBoxElement.checked
        updateValue()
        this.checkBoxElement.addEventListener("change", updateValue)
    }

    set label(name: string){
        this.labelElement.textContent = name
    }
}