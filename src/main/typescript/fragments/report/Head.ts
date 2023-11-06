import {Button} from "../inputs/Button"
import {getFullscreenElement, scrollIntoElement, toggleFullscreen} from "../../util/domWizard"
import ReportSlot from "./ReportSlot"
import {Loader} from "../misc/Loader"
import {InlineFragment} from "../InlineFragment"
import {popupTimeoutAction} from "../../util/alert";

export class Head extends InlineFragment<ReportSlot>{

    private readonly titleElement = this.select("p")
    private readonly originTitleText: string

    toTopButton: Button = this.createToTopButton()
    private chartsButton: Button
    private exportButton: Button = this.createXlsxExportButton()
    private collapseButton: Button = this.createCollapseButton()
    private fullscreenButton: Button = this.createFullscreenButton()

    constructor(reportSlot: ReportSlot, title: string) {
        super(reportSlot, `
            <div class="head"><p>${title}</p></div>
        `)
        this.originTitleText = title
        this.append(this.toTopButton, this.exportButton, this.collapseButton, this.fullscreenButton)
        this.hideButtons()
    }

    set title(text: string){
        this.titleElement.textContent = text
    }
    get title(): string{
        return this.titleElement.textContent
    }

    showButtons(){
        this.toTopButton.show()
        this.exportButton.show()
        this.collapseButton.show()
        this.fullscreenButton.show()
    }

    hideButtons(){
        this.toTopButton.hide()
        this.exportButton.hide()
        this.collapseButton.hide()
        this.fullscreenButton.hide()
    }

    // addChartsButton(){
    //     this.chartsButton = this.createButton(
    //         {text: "Графическое представление", image: "img/graph.svg"},
    //         () => this.reportSlot.body.toggleCharts())
    // }

    private createToTopButton(): Button{
        return new Button(
            {hint:  "Наверх", image: "to_top_blue.svg"},
            () => scrollIntoElement(document.body)
        )
    }

    private createXlsxExportButton(): Button {
        return new Button({hint: "Экспортировать", image: "download.svg"},
            () => popupTimeoutAction("Экспортировать таблицу в .xlsx?", "Подтвердить",
                () => this.parent.body.table.xlsxAccessor.fetch()))
    }

    private createCollapseButton(): Button{
        return createToggleableButton(
            {hint: "Свернуть", image: "collapse.svg"},
            {hint: "Развернуть", image: "collapse.svg"},
            () => {
                this.parent.body.collapse()
                this.chartsButton?.disable()
                this.fullscreenButton?.disable()
            },
            () => {
                this.parent.body.expand()
                this.chartsButton?.enable()
                this.fullscreenButton?.enable()
            })
    }

    private createFullscreenButton(): Button {
        const defaultConfig = {hint: "Развернуть на весь экран", image: "expand.svg"}
        const button = new Button(defaultConfig, () => toggleFullscreen(this.parent.root))
        // Change fullscreenButton on fullscreenchange
        addEventListener("fullscreenchange", () => {
            const fullscreenMode = !!getFullscreenElement()
            button.hint = fullscreenMode ? "Выйти из полноэкранного режима" : defaultConfig.hint
            button.image = fullscreenMode ? "exit.svg" : defaultConfig.image
        })
        return button
    }

    setTitleOrDefault(title: string) {
        this.title = title ? title : this.originTitleText
    }
}

function createToggleableButton(configA: ButtonConfig,
    configB: ButtonConfig,
    onClickA: () => void,
    onClickB: () => void)
{
    let toggled = false
    const button = new Button(configA, () => {
        if(toggled === false){
            if(configA.image !== configB.image) button.image = configB.image
            button.hint = configB.hint
            onClickA()
        }else {
            if(configA.image !== configB.image) button.image = configA.image
            button.hint = configA.hint
            onClickB()
        }
        toggled = !toggled
    })
    return button
}