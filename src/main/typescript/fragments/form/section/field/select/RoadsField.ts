import {BankField} from "./BankField"
import {Trigger} from "../../../../abstract/Trigger"
import {fetchRoadsByDateAndCountries} from "../../../../../util/api/options/serviceBank"
import {Field} from "../Field"

export class RoadsField extends BankField {

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    private countriesKey = this.bankConfigElement.querySelector("subscriptions countries")?.textContent
    private countriesSubscription

    override resolveTriggerFields(getFieldFn: (key: string) => Field<Trigger<any>>) {
        super.resolveTriggerFields(getFieldFn)
        this.countriesSubscription = getFieldFn(this.countriesKey)
    }

    override listenTriggerFields() {
        super.listenTriggerFields()
        this.resolveBankSubscribing(fetchRoadsByDateAndCountries, this.dateFieldSubscription, this.countriesSubscription)
    }
}