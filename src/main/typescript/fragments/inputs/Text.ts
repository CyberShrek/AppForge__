import {createButtonElement, createDivElement, createInputElement} from "../../utils/DOMWizard"
import {InputFragment} from "../abstract/InputFragment"

export class Text extends InputFragment<string>{

    private textInputElement    = createInputElement("text")
    private resetButtonElement = createButtonElement( "❌",{class: "reset"})

    constructor(location: FragmentLocation) {
        super(location)
        this.core = createDivElement({class: "text"})
        this.core.append(this.textInputElement, this.resetButtonElement)
        this.textInputElement.addEventListener("input",
            this.debounce(() => this.value = this.textInputElement.value)
        )
        this.resetButtonElement.addEventListener("click",
            () => this.value = this.textInputElement.value = ""
        )
    }
}