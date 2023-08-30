import {resolveCSS} from "../../util/resolver"
import {Button} from "../inputs/Button"
import {DatepickerField} from "./section/field/DatepickerField"
import {CheckboxField} from "./section/field/CheckboxField"
import {_SelectField} from "./section/field/select/_SelectField"
import {CarriersField} from "./section/field/select/CarriersField"
import {CountriesField} from "./section/field/select/CountriesField"
import {RoadsField} from "./section/field/select/RoadsField"
import {StationsField} from "./section/field/select/StationsField"
import {validateFields} from "../../util/api/validation"
import {Field} from "./section/field/Field"
import {Fragment, Trigger} from "../Fragment"
import {appConfig} from "../../store/appConfig"
import {Section} from "./section/Section"

resolveCSS("main-form")

export default class Form extends Fragment<HTMLFormElement> implements Trigger{

    readonly sections = new Map<string, Section>
    readonly confirmButton = new Button({
        className: "confirm",
        text: this.config.confirmButtonText
    })

    constructor(protected config = appConfig.form) {
        super(`<form id="main-form"></form>`)

        for (const sectionKey in config.sections) {
            this.sections.set(sectionKey, new Section(config.sections[sectionKey]))
        }

        this.resolveFields()
        this.resolveFieldsSubscriptions()
    }

    findField(location: string): Field<any>{
        const sectionAndField = location.split(".")
        return this.sections.get(sectionAndField[0]).get(sectionAndField[1])
    }

    subscribe(callback: (value?: any) => void) {
    }

    fields: Map<string, Field<Trigger<any>>> = new Map()

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
            if(field instanceof _SelectField) {
                field.resolveTriggerFields(key => this.fields.get(key))
                field.listenTriggerFields()
                field.optionsRetrieving = true
            }
            field.input.onValueChange(value => this.validateFields())
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