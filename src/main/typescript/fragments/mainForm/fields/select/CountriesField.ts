import {BankField} from "./BankField"
import {fetchCountriesByDate} from "../../../../utils/api/options/serviceBank"
import {InputFragment} from "../../../abstract/InputFragment"
import {Field} from "../Field"

export class CountriesField extends BankField {

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    private postSovietKey = this.bankConfigElement.querySelector("subscriptions postsoviet")?.textContent
    private postSovietSubscription

    override resolveSubscribedFields(getFieldFn: (key: string) => Field<InputFragment<any>>) {
        super.resolveSubscribedFields(getFieldFn)
        this.postSovietSubscription = getFieldFn(this.postSovietKey)
    }

    override listenSubscribedFields() {
        super.listenSubscribedFields()
        this.resolveBankSubscribing(fetchCountriesByDate, this.dateFieldSubscription, this.postSovietSubscription)
    }
}