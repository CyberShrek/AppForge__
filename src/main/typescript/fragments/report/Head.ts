import {ExistedFragment} from "../abstract/ExistedFragment"
import {emptyElement} from "../../util/domWizard";
import {Button} from "../inputs/Button";
import {getFullscreenElement, scrollIntoElement, toggleFullscreen} from "../../util/domWizard";
import ReportSlot from "./ReportSlot"
import {Loader} from "../misc/Loader"

export class Head extends ExistedFragment{

    readonly loading: Loader

    private readonly originTitleText: string
    private readonly titleElement: HTMLParagraphElement
    private readonly buttonsElement: HTMLDivElement

    private chartsButton: Button
    private exportButton: Button
    private collapseButton: Button
    private fullscreenButton: Button
    private toTopButton: Button

    constructor(core: HTMLDivElement, private readonly parentReportSlot: ReportSlot) {
        super(core)
        this.titleElement = core.querySelector("p")
        this.originTitleText = this.titleElement.textContent
        this.buttonsElement = core.querySelector("div.buttons")

        this.loading = new Loader({target: this.titleElement, position: "afterend"})
        this.loading.hide()

        // Change fullscreenButton on fullscreenchange
        addEventListener("fullscreenchange", event => {
            if (!!this.fullscreenButton) {
                this.fullscreenButton.remove()
                this.addFullscreenButton()
            }
        })
    }

    set title(text: string){
        this.titleElement.textContent = text
    }
    get title(): string{
        return this.titleElement.textContent
    }

    addChartsButton() {
        this.chartsButton = this.createButton(() => this.parentReportSlot.body.toggleCharts(),
            "img/graph.svg", "Графическое представление")
    }

    addCollapseButton() {
        this.collapseButton = this.createToggleableButton(
            () => {
                this.parentReportSlot.body.collapse()
                this.chartsButton?.disable()
                this.fullscreenButton?.disable()
            },
            () => {
                this.parentReportSlot.body.expand()
                this.chartsButton?.enable()
                this.fullscreenButton?.enable()
            },
            "img/collapse.svg", "Свернуть",
            "img/collapse.svg", "Развернуть")
    }

    addFullscreenButton() {
        const fullscreenMode = !!getFullscreenElement()
        this.fullscreenButton = this.createButton(() => toggleFullscreen(this.parentReportSlot.core),
            fullscreenMode ? "img/exit.svg" : "img/expand.svg",
            fullscreenMode ? "Выйти из полноэкранного режима" : "Развернуть на весь экран"
        )
    }

    addToTopButton() {
        this.toTopButton = this.createButton(() => scrollIntoElement(document.body), "img/to_top_blue.svg", "Наверх")
    }

    private createToggleableButton(actionA: () => void,
                                   actionB: () => void,
                                   imageA: string, hintA: string,
                                   imageB: string, hintB: string): Button{
        let toggled = false
        const button = this.createButton(() => {
            if(toggled === false){
                if(imageA !== imageB) button.image = imageB
                button.hint = hintB
                actionA()
            }else {
                if(imageA !== imageB) button.image = imageA
                button.hint = hintA
                actionB()
            }
            toggled = !toggled
        }, imageA, hintA)
        return button
    }

    private createButton(action: () => void, image: string, hint: string): Button {
        const button = new Button({target: this.buttonsElement, position: "beforeend"})
        button.subscribe(() => action())
        button.image = image
        button.hint = hint
        return button
    }

    reset(){
        this.title = this.originTitleText
        emptyElement(this.buttonsElement)
    }
}