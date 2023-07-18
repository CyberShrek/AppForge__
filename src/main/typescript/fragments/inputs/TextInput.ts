import {createElement} from "../../utils/DOMWizard"
import {InputFragment} from "../core/InputFragment"

export class TextInput extends InputFragment<string>{

    private textInputElement: HTMLInputElement   = createElement("input", "",{type: "text"})
    private resetButtonElement: HTMLButtonElement = createElement("button", "❌",{class: "reset"})

    constructor(location: FragmentLocation) {
        super(createElement("div", "",{class: "text-input"}), location)
        this.core.append(this.textInputElement, this.resetButtonElement)
        this.textInputElement.addEventListener("input",
            this.debounce(() => this.value = this.textInputElement.value)
        )
        this.resetButtonElement.addEventListener("click",
            () => this.value = this.textInputElement.value = ""
        )
    }
}