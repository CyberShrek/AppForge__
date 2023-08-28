import {SelectField} from "./SelectField"
import {DateField} from "../DateField"
import {Trigger} from "../../../../abstract/Trigger"
import {stringify} from "../../../../../util/data"
import {Field} from "../Field"

export abstract class BankField extends SelectField{
    protected constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location, configElement)
    }

    protected bankConfigElement: HTMLElement = this.configElement.querySelector("bank")

    private dateFieldKey = this.bankConfigElement.querySelector("subscriptions date")?.textContent
    protected bankTriggerFields: Map<string, Field<any>> = new Map()
    protected dateFieldSubscription: DateField = null

    override resolveTriggerFields(getFieldFn: (key: string) => Field<Trigger<any>>) {
        super.resolveTriggerFields(getFieldFn)
        this.dateFieldSubscription = getFieldFn(this.dateFieldKey)
    }

    protected resolveBankSubscribing(fetchBankOptionsFn: (...subscriptionValues: any[]) => Promise<Options>,
                                     ...subscriptionFields: Field<Trigger<any>>[]){

        subscriptionFields.forEach(field =>
            field.input.onValueChange(value => {
                for (const subscription of subscriptionFields) {
                    if (subscription.input.value === null || stringify(subscription.input.value).length <= 0) {
                        this.input.setOptions(null)
                        return
                    }
                }
                this.retrieveOptionsPromise("bank",
                    fetchBankOptionsFn(...subscriptionFields.map(subscription => subscription.input.value)))
            }))
    }
}