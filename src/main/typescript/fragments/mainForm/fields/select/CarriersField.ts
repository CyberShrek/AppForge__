import {BankField} from "./BankField"
import {fetchCarriersByDate} from "../../../../utils/api/serviceBank"

export class CarriersField extends BankField{
    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    override listenSubscribedFields() {
        super.listenSubscribedFields()
        this.resolveBankSubscribing(fetchCarriersByDate, this.dateFieldSubscription)
    }
}