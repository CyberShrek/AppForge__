import {SelectField} from "./SelectField"

export class BankSelectField extends SelectField{
    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    override startOptionsRetrieving() {
        super.startOptionsRetrieving()

    }
}