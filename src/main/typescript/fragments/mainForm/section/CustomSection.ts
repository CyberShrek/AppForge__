import Datepicker from "./fields/Datepicker"
import Select from "./fields/Select"
import CheckBox from "./fields/CheckBox"
import {Section} from "./Section"
import {Form} from "../Form"
import {Field} from "./fields/Field"

export class CustomSection extends Section{
    constructor(public core: HTMLElement,
                public form: Form) { super(core, form)
        core.querySelectorAll<HTMLElement>(".field").forEach(fieldElement =>
            this.fields.set(
                fieldElement.getAttribute("key"),
                this.defineField(fieldElement)
            )
        )
    }

    private defineField(fieldCore: HTMLElement): Field{
        if(fieldCore.classList.contains("datepicker")) return new Datepicker(fieldCore, this)
        if(fieldCore.classList.contains("select")) return new Select(fieldCore, this)
        if(fieldCore.classList.contains("checkbox")) return new CheckBox(fieldCore, this)
    }
}