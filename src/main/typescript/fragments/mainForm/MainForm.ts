import {resolveCSS} from "../../utils/resolver"
import {CustomSection} from "./section/CustomSection"
import {Form} from "./Form"
import {Button} from "../inputs/Button"
import {confirmEvent} from "../../entities/events"

resolveCSS("main-form")

export default class MainForm extends Form{

    constructor(core: HTMLFormElement) {super(core)
        core.querySelectorAll<HTMLElement>(".section").forEach(
            sectionCore =>
                this.sections.set(
                    sectionCore.getAttribute("key"),
                    new CustomSection(sectionCore, this)
                )
        )
        this.applyConfirmButton()
        this.mount()
    }

    private applyConfirmButton(){
        const confirmButton = new Button({
            target: this.core,
            position: "afterend"
        }, "Сформировать отчёт")
        confirmButton.onClick(() => {
            this.core.dispatchEvent(confirmEvent)
        })
    }
}