import {popupMessage} from "../../../../utils/modal"
import {Field} from "./Field"
import {Section} from "../Section"

export default class Select extends Field{

    value

    constructor(public core: HTMLElement,
                public section: Section) { super(core, section)

        section.form.onMount = () => {
            this.subscribeOnField("period", "range",
                value => popupMessage("Выбрано", value))
        }
    }
}