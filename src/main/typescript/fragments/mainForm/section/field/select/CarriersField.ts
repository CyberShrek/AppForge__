import {BankField} from "./BankField"
import {fetchCarriersByDate} from "../../../../../util/api/options/serviceBank"

export class CarriersField extends BankField{
    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location, configElement)
    }

    override listenTriggerFields() {
        super.listenTriggerFields()
        this.resolveBankSubscribing(fetchCarriersByDate, this.dateFieldSubscription)
    }
}