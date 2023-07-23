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

resolveCSS("main-form")

export default class MainForm extends InputFragment<MainFormValues>{

    readonly confirmButton: Button

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.value = {}
        this.resolveFields()
        this.resolveFieldsSubscriptions()
        this.confirmButton = new Button({target: this.core, position: "afterend"})
        this.confirmButton.addClass("confirm")
    }

    private fields: Map<string, InputFragment<any>> = new Map()

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
        })
    }
}

function resolveField(fieldElement: HTMLElement): InputFragment<any>{
    const containsClass = (className: string) => fieldElement.classList.contains(className)
    const location: FragmentLocation = {target: fieldElement}
    const configElement: HTMLElement = fieldElement.querySelector("config")
    return containsClass("date") ? new DateField(location, configElement)
        : containsClass("checkbox") ? new CheckboxField(location, configElement)
            : containsClass("select") ? resolveSelectField(location, configElement)
                : new Text(location)
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