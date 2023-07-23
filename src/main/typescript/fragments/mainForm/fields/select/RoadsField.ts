import {BankField} from "./BankField"
import {InputFragment} from "../../../abstract/InputFragment"
import {fetchCountriesByDate} from "../../../../utils/api/options/serviceBank"

export class RoadsField extends BankField {

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    private countriesKey = this.bankConfigElement.querySelector("subscriptions countries")?.textContent
    private countriesSubscription

    override resolveSubscribedFields(getFieldFn: (key: string) => InputFragment<any>) {
        super.resolveSubscribedFields(getFieldFn)
        this.countriesSubscription = getFieldFn(this.countriesKey)
    }

    override listenSubscribedFields() {
        super.listenSubscribedFields()
        this.resolveBankSubscribing(fetchCountriesByDate, this.dateFieldSubscription, this.countriesSubscription)
    }
}