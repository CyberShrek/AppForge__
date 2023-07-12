import {resolveCSS} from "../../utils/resolver"
import {CustomSection} from "./section/CustomSection"
import {Form} from "./Form";

resolveCSS("main-form")

export default class MainForm extends Form{

    constructor(public core: HTMLFormElement) { super(core)

        core.querySelectorAll<HTMLElement>(".section").forEach(
            sectionCore =>
                this.sections.set(
                    sectionCore.getAttribute("key"),
                    new CustomSection(sectionCore, this)
                )
        )

        this.mount()
    }
}