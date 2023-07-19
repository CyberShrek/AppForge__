import {InputFragment} from "../abstract/InputFragment"
import {createDivElement, createInputElement, createLabelElement, generateUniqueId} from "../../utils/DOMWizard"

export default class Checkbox extends InputFragment<boolean>{

    private checkBoxElement = createInputElement("checkbox", {id: generateUniqueId("checkbox")})
    private labelElement    = createLabelElement("", {for: this.checkBoxElement.id})

    constructor(location: FragmentLocation) {
        super(location)
        this.core = createDivElement({class: "checkbox"})
        this.core.append(this.checkBoxElement, this.labelElement)
        this.checkBoxElement.addEventListener("change",
            (ev) => this.value = this.checkBoxElement.checked)
    }

    set label(name: string){
        this.labelElement.textContent = name
    }
}