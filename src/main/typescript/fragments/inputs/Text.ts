import {createButtonElement, createDivElement, createInputElement} from "../../utils/DOMWizard"
import {InputFragment} from "../abstract/InputFragment"

export class Text extends InputFragment<string>{

    private textInputElement    = createInputElement("text")
    private resetButtonElement = createButtonElement( "❌",{class: "frameless reset"})

    constructor(location: FragmentLocation, config?: TextInputConfig) {
        super(location)
        this.core = createDivElement({class: "text field"})
        if(config.title){
            this.core.textContent = config.title
            this.textInputElement.style.marginLeft = "var(--indent)"
        }
        this.textInputElement.placeholder = config.placeholder
        this.core.append(this.textInputElement, this.resetButtonElement)
        this.textInputElement.addEventListener("input",
            this.debounce(() => this.value = this.textInputElement.value)
        )
        this.resetButtonElement.addEventListener("click",
            () => this.value = this.textInputElement.value = ""
        )
        this.subscribe(value => {
            this.core.classList.toggle("empty", !value || value.length === 0)
        })
    }
}