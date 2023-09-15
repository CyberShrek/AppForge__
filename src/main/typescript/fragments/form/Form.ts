import {resolveCSS} from "../../util/resolver"
import {Button} from "../inputs/Button"
import {Field} from "./section/field/Field"
import {Fragment} from "../Fragment"
import {Section} from "./section/Section"
import {jsonifyFields, jsonToMap, valueOrDefault} from "../../util/data"
import {SelectField} from "./section/field/SelectField"
import {FormStatementAccessor} from "../../api/FormStatementAccessor"

resolveCSS("form")

export default class Form extends Fragment<HTMLFormElement> {

    readonly sections = new Map<string, Section>

    readonly fields: Map<string, Field<any>> = new Map()

    readonly submitButton = new Button({
        className: "confirm",
        text: valueOrDefault(this.config?.submitText, "")
    }, () => this.onSubmit(this.jsonValues))

    private statementAccessor: FormStatementAccessor

    constructor(protected config: FormConfig, public onSubmit?: (jsonValues: {[field: string]: any}) => void) {
        super(`<form></form>`)

        // Determining sections
        for (const key in config) {
            if(key.endsWith("Section")) {
                const section = new Section(this, config[key] as FormSectionConfig)
                this.sections.set(key, section)
                section.fields.forEach((field, fieldKey) =>
                    this.fields.set(`${key}.${fieldKey}`, field))
            }
        }

        if(this.config.statementPath) this.startStatementRetrieving()
        this.append(this.submitButton)
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

    private startStatementRetrieving(){
        this.statementAccessor = new FormStatementAccessor()
        this.hide()
        this.onMount(() =>
            this.manageFieldsStatement().then(
                () => this.show())
        )
        this.fields.forEach((field, key) => {
            field.onValueChange(
                () => this.manageFieldsStatement(key))
        })
    }

    // TODO refactor
    private manageFieldsStatement(triggerFieldKey?: string){
        this.submitButton.disable()
        this.statementAccessor.path = this.config.statementPath
        return this.statementAccessor.fetch(this.jsonValues, triggerFieldKey).then(statement => {
            if(!!statement){
                if(statement.wrong) {
                    this.fields.forEach((field, fieldKey) => {
                        if (statement.wrong.find(wrongFieldKey => fieldKey === wrongFieldKey))
                            field.makeInvalid()
                        else
                            field.makeValid()
                    })
                } else this.submitButton.enable()
                if(statement.setOptions){
                    Object.entries(statement.setOptions).forEach(([fieldKey, options]) => {
                        const field = this.fields.get(fieldKey)
                            if(field && field instanceof SelectField)
                                field.setOptions(jsonToMap(options))
                    })
                }
                if(statement.setupServiceBank){
                    Object.entries(statement.setupServiceBank).forEach(([fieldKey, setup]) => {
                        const field = this.fields.get(fieldKey)
                        if(field && field instanceof SelectField)
                            field.setupServiceBank(setup)
                    })
                }
                if(statement.setValues){
                    Object.entries(statement.setValues).forEach(([fieldKey, value]) => {
                        this.fields.get(fieldKey)?.triggerValueChange(value)
                    })
                }
                statement.show?.forEach(key => {
                    if(key.includes(".")) this.fields.get(key).show()
                    else this.sections.get(key).show()
                })
                statement.hide?.forEach(key => {
                    if(key.includes(".")) this.fields.get(key).hide()
                    else this.sections.get(key).hide()
                })
            }
        })
    }
}