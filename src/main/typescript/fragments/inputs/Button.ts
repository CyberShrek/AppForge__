import {createButtonElement, createImageElement} from "../../util/domWizard"
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
    enable=() => this.isAvailable = true
    disable=() => this.isAvailable = false


    get hint(): string{
        return this.core.getAttribute("title")
    }

    set hint(hint: string){
        this.core.setAttribute("title", hint)
    }

    set text(text: string){
        this.core.textContent = text
    }
    get text(): string{
        return this.core.textContent
    }

    set image(src: string|null){
        this.imageElement?.remove()
        if(!!src) {
            this.imageElement = createImageElement(src)
            this.core.appendChild(this.imageElement)
        }
    }
    get image(): string{
        return this.imageElement?.src
    }

    override subscribe(onValueEvent: (value: void) => void, runOnInit: boolean = false) {
        super.subscribe(onValueEvent, runOnInit)
    }
}