import Checkbox from "../../inputs/Checkbox"
import {Field} from "./Field"

export class CheckboxField extends Field<Checkbox>{

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location, Checkbox, {
            label: configElement.getAttribute("label")
        })
    }
}