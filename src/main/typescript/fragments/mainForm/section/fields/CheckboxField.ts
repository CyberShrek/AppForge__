import Checkbox from "../../../inputs/Checkbox"

export class CheckboxField extends Checkbox{
    constructor(location: FragmentLocation, configElement: HTMLElement) {
        const label = configElement.getAttribute("label")
        super(location)
        this.label = label
    }
}