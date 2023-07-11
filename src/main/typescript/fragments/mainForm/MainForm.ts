import {resolveCSS} from "../../utils/resolver"
import {CustomSection} from "./section/CustomSection"

resolveCSS("main-form")

export default class MainForm implements MainFormFragment{

    sections: Map<SectionKey, FormSectionFragment> = new Map()

    constructor(public core: HTMLFormElement) {
        core.querySelectorAll<HTMLElement>(".section").forEach(
            section =>
                this.sections.set(
                    section.getAttribute("key"),
                    new CustomSection(section)
                )
        )
    }
}