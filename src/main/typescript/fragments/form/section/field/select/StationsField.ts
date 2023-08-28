import {BankField} from "./BankField"
import {Trigger} from "../../../../abstract/Trigger"
import {fetchStationsByDateAndRoads} from "../../../../../util/api/options/serviceBank"
import {Field} from "../Field";

export class StationsField extends BankField {

    constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location,configElement)
    }

    private roadsKey = this.bankConfigElement.querySelector("subscriptions roads")?.textContent
    private roadsSubscription

    override resolveTriggerFields(getFieldFn: (key: string) => Field<Trigger<any>>) {
        super.resolveTriggerFields(getFieldFn)
        this.roadsSubscription = getFieldFn(this.roadsKey)
    }

    override listenTriggerFields() {
        super.listenTriggerFields()
        this.resolveBankSubscribing(fetchStationsByDateAndRoads, this.dateFieldSubscription, this.roadsSubscription)
    }
}