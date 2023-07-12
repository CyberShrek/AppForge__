import {Field} from "./Field"
import {Section} from "../Section"

export default class CheckBox extends Field{

    value
    constructor(public core: HTMLElement,
                public section: Section) { super(core, section)
    }
}