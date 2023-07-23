import {BankField} from "./BankField"
import {InputFragment} from "../../../abstract/InputFragment"
import {fetchCountriesByDate} from "../../../../utils/api/options/serviceBank"

export class StationsField extends BankField {

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    private roadsKey = this.bankConfigElement.querySelector("subscriptions roads")?.textContent
    private roadsSubscription

    override resolveSubscribedFields(getFieldFn: (key: string) => InputFragment<any>) {
        super.resolveSubscribedFields(getFieldFn)
        this.roadsSubscription = getFieldFn(this.roadsKey)
    }

    override listenSubscribedFields() {
        super.listenSubscribedFields()
        this.resolveBankSubscribing(fetchCountriesByDate, this.dateFieldSubscription, this.roadsSubscription)
    }
}