import {resolveCSS} from "../../util/resolver"
import {Button} from "../inputs/Button"
import {validateFields} from "../../api/validation"
import {Field} from "./section/field/Field"
import {Fragment} from "../Fragment"
import {appConfig} from "../../store/appConfig"
import {Section} from "./section/Section"
import {jsonifyFields} from "../../util/data"
import {SelectField} from "./section/field/SelectField"

resolveCSS("main-form")

export default class Form extends Fragment<HTMLFormElement>{

    readonly sections = new Map<string, Section>

    readonly fields: Map<string, Field<any>> = new Map()

    readonly confirmButton = new Button({
        className: "confirm",
        text: this.config.confirmButtonText
    }, () => this.onConfirm(jsonifyFields(this.fields)))

    constructor(protected config = appConfig.form) {
        super(`<form id="main-form"></form>`)

        for (const sectionKey in config.sections)
            this.sections.set(sectionKey, new Section(this, config.sections[sectionKey]))

        this.sections.forEach((section, sectionKey) =>
            section.fields.forEach((field, fieldKey) =>
                this.fields.set(`${sectionKey}.${fieldKey}`, field)))

        this.startOptionsRetrieving()
    }

    // Return fields with specific locations or all fields
    findFields(fieldLocations: string[]): Map<string, Field<any>>{
        const fieldsMap: Map<string, Field<any>> = new Map()

        fieldLocations.forEach(location =>
            fieldsMap.set(location, this.fields.get(location)))

        return fieldsMap
    }

    onConfirm: (jsonValues: {[field: string]: any}) => {}

    private startOptionsRetrieving(){
        this.fields.forEach((field, key) => {
            if(field instanceof SelectField) {
                field.startOptionsRetrieving()
            }
            field.onValueChange(value => this.validateFields())
        })
    }

    private validateFields(){
        this.confirmButton.disable()
        if(!!this.config.validationPath){
            validateFields(this.config.validationPath, this.fields).then(result => {
                this.fields.forEach(field => field.makeValid())
                if(result instanceof Map)
                    result.forEach((message, fieldKey) => this.fields.get(fieldKey).makeInvalid())
                else if(result === true)
                    this.confirmButton.enable()
            })
        }
    }
}