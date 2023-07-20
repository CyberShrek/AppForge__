import {resolveCSS} from "../../utils/resolver"
import {Button} from "../inputs/Button"
import {InputFragment} from "../abstract/InputFragment"
import {Text} from "../inputs/Text"
import {DateField} from "./section/fields/DateField"
import {CheckboxField} from "./section/fields/CheckboxField"
import {SelectField} from "./section/fields/select/SelectField"
import {CarriersSelectField} from "./section/fields/select/CarriersSelectField"
import {CountriesSelectField} from "./section/fields/select/CountriesSelectField"
import {RoadsSelectField} from "./section/fields/select/RoadsSelectField"
import {StationsSelectField} from "./section/fields/select/StationsSelectField"

resolveCSS("main-form")

export default class MainForm extends InputFragment<MainFormValues>{

    readonly confirmButton: Button

    constructor(location: FragmentLocation) {
        super(location)
        this.core = location.target
        this.value = {}
        this.activateFields()
        this.resolveFieldsSubscriptions()
        this.confirmButton = new Button({target: this.core, position: "afterend"})
        this.confirmButton.addClass("confirm")
    }

    private fields: Map<string, InputFragment<any>> = new Map()

    private activateFields(){
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
            if(field instanceof SelectField){
                this.resolveSelectFieldSubscriptions(field)
            }
        })
    }

    private resolveSelectFieldSubscriptions(field: SelectField){
        field.endpointSubscribedFields.forEach((_, key) =>
            field.endpointSubscribedFields.set(key, this.fields.get(key))
        )

        if(field instanceof CarriersSelectField){
        }
        else if(field instanceof CountriesSelectField){

        }
        else if(field instanceof RoadsSelectField){

        }
        else if(field instanceof StationsSelectField){

        }

        field.startOptionsRetrieving()
    }
}

function resolveField(fieldElement: HTMLElement): InputFragment<any>{
    const containsClass = (className: string) => fieldElement.classList.contains(className)
    const location: FragmentLocation = {target: fieldElement}
    const configElement: HTMLElement = fieldElement.querySelector("config")
    return containsClass("datepicker") ? new DateField(location, configElement)
        : containsClass("checkbox") ? new CheckboxField(location, configElement)
            : containsClass("select") ? resolveSelectField(location, configElement)
                : new Text(location)
}

function resolveSelectField(location: FragmentLocation, configElement: HTMLElement): SelectField{
    return new SelectField(location, configElement)
}