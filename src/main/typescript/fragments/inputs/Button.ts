import {createButtonElement, createImageElement} from "../../utils/DOMWizard"
import {InputFragment} from "../abstract/InputFragment"

export class Button extends InputFragment<void> {

    private imageElement: HTMLImageElement

    constructor(location: FragmentLocation) {
        super(location)
        this.core = createButtonElement()
        this.core.addEventListener("click", () => {
            if(this.isAvailable)
                this.value = this.value
        })
    }

    set isAvailable(available: boolean){
        if(available)
            this.core.classList.remove("unavailable")
        else this.core.classList.add("unavailable")
    }

    get isAvailable(): boolean{
        return !this.core.classList.contains("unavailable")
    }

    set text(text: string){
        this.core.textContent = text
    }
    get text(): string{
        return this.core.textContent
    }

    set image(src: string|null){
        this.imageElement.remove()
        if(!!src) {
            this.imageElement = createImageElement(src)
            this.core.appendChild(this.imageElement)
        }
    }
    get image(): string{
        return this.imageElement?.src
    }
}