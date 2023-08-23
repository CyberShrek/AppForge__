import {BankField} from "./BankField"
import {InputFragment} from "../../../abstract/InputFragment"
import {fetchRoadsByDateAndCountries} from "../../../../utils/api/options/serviceBank"
import {Field} from "../Field"

export class RoadsField extends BankField {

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    private countriesKey = this.bankConfigElement.querySelector("subscriptions countries")?.textContent
    private countriesSubscription

    override resolveTriggerFields(getFieldFn: (key: string) => Field<InputFragment<any>>) {
        super.resolveTriggerFields(getFieldFn)
        this.countriesSubscription = getFieldFn(this.countriesKey)
    }

    override listenSubscribedFields() {
        super.listenSubscribedFields()
        this.resolveBankSubscribing(fetchRoadsByDateAndCountries, this.dateFieldSubscription, this.countriesSubscription)
    }
}