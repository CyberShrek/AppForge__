import {ExistedFragment} from "../abstract/ExistedFragment"
import {emptyElement} from "../../utils/DOMWizard";
import {Button} from "../inputs/Button";

export class Head extends ExistedFragment{

    private readonly originTitleText: string
    private readonly titleElement: HTMLParagraphElement
    private readonly buttonsElement: HTMLDivElement

    constructor(core: HTMLDivElement) {
        super(core)
        this.titleElement = core.querySelector("p")
        this.originTitleText = this.titleElement.textContent
        this.buttonsElement = core.querySelector("div.buttons")
    }

    set title(text: string){
        this.titleElement.textContent = text
    }

    applyGraphButton(): Button{
        const button = this.applyButton("img/graph.svg", "Графическое представление")
        return button
    }

    applyExportButton(): Button{
        const button = this.applyButton("img/download.svg", "Экспортировать")
        return button
    }

    applyCollapseButton(): Button{
        const button = this.applyButton("img/collapse.svg", "Свернуть")
        return button
    }

    applyFullscreenButton(): Button{
        const button = this.applyButton("img/expand.svg", "Развернуть на весь экран")
        return button
    }

    applyToTopButton(): Button{
        const button = this.applyButton("img/to_top.svg", "Наверх")
        return button
    }

    private applyButton(image: string, hint: string): Button {
        const button = new Button({target: this.buttonsElement, position: "beforeend"})
        button.image = image
        button.hint = hint
        return button
    }

    reset(){
        this.title = this.originTitleText
        emptyElement(this.buttonsElement)
    }
}