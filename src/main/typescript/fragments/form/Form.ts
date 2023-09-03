import {resolveCSS} from "../../util/resolver"
import {Button} from "../inputs/Button"
import {Field} from "./section/field/Field"
import {Fragment} from "../Fragment"
import {appConfig} from "../../store/appConfig"
import {Section} from "./section/Section"
import {jsonifyFields} from "../../util/data"
import {SelectField} from "./section/field/SelectField"
import {FormStatementAccessor} from "../../api/FormStatementAccessor"

resolveCSS("main-form")

export default class Form extends Fragment<HTMLFormElement>{

    readonly sections = new Map<string, Section>

    readonly fields: Map<string, Field<any>> = new Map()

    readonly confirmButton = new Button({
        className: "confirm",
        text: this.config.confirmButtonText
    }, () => this.onConfirm(this.jsonValues))

    onConfirm: (jsonValues: {[field: string]: any}) => {}

    private readonly statementAccessor: FormStatementAccessor

    constructor(protected config = appConfig.form) {
        super(`<form id="main-form"></form>`)

        for (const sectionKey in config.sections)
            this.sections.set(sectionKey, new Section(this, config.sections[sectionKey]))

        this.sections.forEach((section, sectionKey) =>
            section.fields.forEach((field, fieldKey) =>
                this.fields.set(`${sectionKey}.${fieldKey}`, field)))

        if(config.statementPath)
            this.statementAccessor = new FormStatementAccessor(config.statementPath)

        this.startOptionsRetrieving()
    }

    get jsonValues(){
        return jsonifyFields(this.fields)
    }

    // Return fields with specific locations or all fields
    findFields(fieldLocations: string[]): Map<string, Field<any>>{
        const fieldsMap: Map<string, Field<any>> = new Map()

        fieldLocations.forEach(location =>
            fieldsMap.set(location, this.fields.get(location)))

        return fieldsMap
    }

    private startOptionsRetrieving(){
        this.fields.forEach((field, key) => {
            if(field instanceof SelectField) {
                field.startOptionsRetrieving()
            }
            field.onValueChange(value => this.manageFieldsStatement())
        })
    }

    private manageFieldsStatement(){
        this.confirmButton.disable()
        if(this.statementAccessor){
            this.statementAccessor.fetch(this).then(statement => {
                if(statement){
                    if(statement.wrongFields) {
                        this.fields.forEach((field, fieldKey) => {
                            if (statement.wrongFields.find(wrongFieldKey => fieldKey === wrongFieldKey))
                                field.makeInvalid()
                            else
                                field.makeValid()
                        })
                    }
                    statement.hideFields?.forEach(key => this.fields.get(key).hide())
                    statement.showFields?.forEach(key => this.fields.get(key).show())
                    statement.hideSections?.forEach(key => this.sections.get(key).hide())
                    statement.showSections?.forEach(key => this.sections.get(key).hide())
                }
            })
        }
    }
}