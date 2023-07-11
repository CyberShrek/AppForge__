import {resolveCSS} from "../../utils/resolver"

export default class MainForm implements MainFormFragment{

    sections: Map<SectionKey, FormSectionFragment>

    constructor(public core: HTMLFormElement) {
        resolveCSS("main-form")

        core.querySelector("")
    }
}