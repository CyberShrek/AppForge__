import Datepicker from "./fields/Datepicker"
import Select from "./fields/Select"
import CheckBox from "./fields/CheckBox"

export class CustomSection implements FormSectionFragment{

    fields: Map<FieldKey, SectionFieldFragment> = new Map()

    constructor(public core: HTMLElement) {
        core.querySelectorAll<HTMLElement>(".field").forEach(fieldElement =>
        this.fields.set(fieldElement.getAttribute("key"), defineFieldFragment(fieldElement)))
    }
}

function defineFieldFragment(fieldElement: HTMLElement): SectionFieldFragment{
    if(fieldElement.classList.contains("period")) return new Datepicker(fieldElement)
    if(fieldElement.classList.contains("select")) return new Select(fieldElement)
    if(fieldElement.classList.contains("checkbox")) return new CheckBox(fieldElement)
}