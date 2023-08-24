import {resolveCSS} from "../../util/resolver"
import {Button} from "../inputs/Button"
import {InputFragment} from "../abstract/InputFragment"
import {DateField} from "./section/field/DateField"
import {CheckboxField} from "./section/field/CheckboxField"
import {SelectField} from "./section/field/select/SelectField"
import {CarriersField} from "./section/field/select/CarriersField"
import {CountriesField} from "./section/field/select/CountriesField"
import {RoadsField} from "./section/field/select/RoadsField"
import {StationsField} from "./section/field/select/StationsField"
import {validateFields} from "../../util/api/validation"
import {Field} from "./section/field/Field"
import {Fragment} from "../abstract/Fragment"

resolveCSS("main-form")

export default class MainForm extends Fragment{

    readonly confirmButton: Button

    private readonly validationPath: string

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.confirmButton = new Button({target: this.core, position: "afterend"})
        this.confirmButton.addClass("confirm")
        this.confirmButton.text = this.core.getAttribute("confirm-button-text")
        this.resolveFields()
        this.resolveFieldsSubscriptions()
        this.validationPath = this.core.getAttribute("validation-path")
    }

    fields: Map<string, Field<InputFragment<any>>> = new Map()

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
                field.resolveTriggerFields(key => this.fields.get(key))
                field.listenTriggerFields()
                field.optionsRetrieving = true
            }
            field.input.subscribe(value => this.validateFields())
        })
    }

    private validateFields(){
        this.confirmButton.disable()
        if(!!this.validationPath){
            validateFields(this.validationPath, this.fields).then(result => {
                this.fields.forEach(field => field.makeValid())
                if(result instanceof Map)
                    result.forEach((message, fieldKey) => this.fields.get(fieldKey).makeInvalid(message))
                else if(result === true)
                    this.confirmButton.enable()
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