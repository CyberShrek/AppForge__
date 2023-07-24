import {resolveCSS} from "../../utils/resolver"
import {Button} from "../inputs/Button"
import {InputFragment} from "../abstract/InputFragment"
import {Text} from "../inputs/Text"
import {DateField} from "./fields/DateField"
import {CheckboxField} from "./fields/CheckboxField"
import {SelectField} from "./fields/select/SelectField"
import {CarriersField} from "./fields/select/CarriersField"
import {CountriesField} from "./fields/select/CountriesField"
import {RoadsField} from "./fields/select/RoadsField"
import {StationsField} from "./fields/select/StationsField"
import {validateFieldValues} from "../../utils/api/validation";
import {stringify} from "../../utils/misc";
import {Field} from "./fields/Field";

resolveCSS("main-form")

export default class MainForm extends InputFragment<MainFormValues>{

    readonly confirmButton: Button

    private readonly validationUrl: string

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.value = new Map()
        this.confirmButton = new Button({target: this.core, position: "afterend"})
        this.confirmButton.addClass("confirm")
        this.confirmButton.text = this.core.getAttribute("confirm-button-text")
        this.resolveFields()
        this.resolveFieldsSubscriptions()
        this.validationUrl = this.core.getAttribute("validation-url")
    }

    private fields: Map<string, Field<InputFragment<any>>> = new Map()

    private resolveFields(){
        this.core.querySelectorAll(".section").forEach(sectionElement => {
            const sectionKey = sectionElement.getAttribute("key")
            sectionElement.querySelectorAll(".field").forEach(fieldElement => {
                const fieldKey = fieldElement.getAttribute("key")
                this.fields.set(`${sectionKey}.${fieldKey}`, resolveField(fieldElement as HTMLElement))
            })
        })
    }

    private resolveFieldsSubscriptions(){
        this.fields.forEach((field, key) => {
            if(field instanceof SelectField) {
                field.resolveSubscribedFields(key => this.fields.get(key))
                field.listenSubscribedFields()
                field.optionsRetrieving = true
            }
            field.input.subscribe(value => {
                this.value.set(key, value)
                this.validateFields()
            })
        })
    }

    private validateFields(){
        this.confirmButton.isAvailable = false
        if(!!this.validationUrl){
            validateFieldValues(this.validationUrl, this.value).then(result => {
                this.fields.forEach(field => field.makeValid())
                if(result instanceof Map)
                    result.forEach((message, fieldKey) => this.fields.get(fieldKey).makeInvalid(message))
                else if(result === true)
                    this.confirmButton.isAvailable = true
            })
        }
    }
}

function resolveField(fieldElement: HTMLElement): Field<InputFragment<any>>{
    const containsClass = (className: string) => fieldElement.classList.contains(className)
    const location: FragmentLocation = {target: fieldElement}
    const configElement: HTMLElement = fieldElement.querySelector("config")
    return containsClass("date") ? new DateField(location, configElement)
        : containsClass("checkbox") ? new CheckboxField(location, configElement)
            : resolveSelectField(location, configElement)
}

function resolveSelectField(location: FragmentLocation, configElement: HTMLElement): SelectField{
    switch (configElement.querySelector("bank")?.getAttribute("type")){
        case "carriers":  return new CarriersField(location, configElement)
        case "countries": return new CountriesField(location, configElement)
        case "roads":     return new RoadsField(location, configElement)
        case "stations":  return new StationsField(location, configElement)
    }
    return new SelectField(location, configElement)
}