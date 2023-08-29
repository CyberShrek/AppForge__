import {Fragment} from "../Fragment"
import {create} from "../../util/domWizard"

export interface Config{
    className?: string
    text?: string
    image?: string
    hint?: string
}

export class Button extends Fragment<HTMLButtonElement>{

    private imageElement: HTMLImageElement

    constructor(config: Config, onClick: () => void) {
        super(`<button></button>`)

        this.className = config.className
        this.text = config.text
        this.image = config.image
        this.hint = config.hint

        this.listen("click", onClick)
    }

    set isAvailable(available: boolean){
        if(available)
            this.removeClass("unavailable")
        else this.addClass("unavailable")
    }
    get isAvailable(): boolean{
        return !this.hasClass("unavailable")
    }
    enable=() => this.isAvailable = true
    disable=() => this.isAvailable = false

    get hint(): string{
        return this.root.getAttribute("title")
    }

    set hint(hint: string){
        this.root.setAttribute("title", hint)
    }

    set text(text: string){
        this.root.textContent = text
    }
    get text(): string{
        return this.root.textContent
    }

    set image(src: string|null){
        this.imageElement?.remove()
        if(!!src) {
            this.imageElement = create(`<img src="/appforge/img/${src}" alt=""/>`)
            this.append(this.imageElement)
        }
    }
    get image(): string{
        return this.imageElement?.src
    }
}