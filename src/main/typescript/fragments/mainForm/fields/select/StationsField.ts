import {BankField} from "./BankField"
import {InputFragment} from "../../../abstract/InputFragment"
import {fetchStationsByDateAndRoads} from "../../../../utils/api/options/serviceBank"
import {Field} from "../Field";
import {createLabelElement} from "../../../../utils/DOMWizard";

export class StationsField extends BankField {

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    private roadsKey = this.bankConfigElement.querySelector("subscriptions roads")?.textContent
    private roadsSubscription

    override resolveSubscribedFields(getFieldFn: (key: string) => Field<InputFragment<any>>) {
        super.resolveSubscribedFields(getFieldFn)
        this.roadsSubscription = getFieldFn(this.roadsKey)
    }

    override listenSubscribedFields() {
        super.listenSubscribedFields()
        this.resolveBankSubscribing(fetchStationsByDateAndRoads, this.dateFieldSubscription, this.roadsSubscription)
    }
}