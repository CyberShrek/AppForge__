import {SelectField} from "./SelectField"
import {DateField} from "../DateField"
import {InputFragment} from "../../../abstract/InputFragment"

export abstract class BankField extends SelectField{
    protected constructor(location: FragmentLocation, configElement: HTMLElement) {
        super(location, configElement)
    }

    protected bankConfigElement: HTMLElement = this.configElement.querySelector("bank")

    private dateFieldKey = this.bankConfigElement.querySelector("subscriptions date")?.textContent
    protected dateFieldSubscription: DateField = null

    override resolveSubscribedFields(getFieldFn: (key: string) => InputFragment<any>) {
        super.resolveSubscribedFields(getFieldFn)
        this.dateFieldSubscription = getFieldFn(this.dateFieldKey)
    }

    protected resolveBankSubscribing(fetchOptionsFn: (...subscriptionValues: any[]) => Promise<Options>,
                                     ...subscriptions: InputFragment<any>[]){

        subscriptions.forEach(field =>
            field.subscribe(value =>
                this.retrieveOptionsPromise("bank",
                    fetchOptionsFn(...subscriptions.map(subscription => subscription.value)))))
    }
}