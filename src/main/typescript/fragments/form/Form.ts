import {resolveStyle} from "../../util/resolver"
import {Button} from "../inputs/Button"
import {Field} from "./section/field/Field"
import {Fragment} from "../Fragment"
import {Section} from "./section/Section"
import {jsonifyFields, jsonToMap, valueOrDefault} from "../../util/data"
import {SelectField} from "./section/field/SelectField"
import {FormStatementAccessor} from "../../api/FormStatementAccessor"

resolveStyle("form")

export default class Form extends Fragment<HTMLFormElement> {

    readonly sections = new Map<string, Section>

    readonly fields: Map<string, Field<any>> = new Map()

    readonly submitButton = new Button({
        className: "confirm",
        text: valueOrDefault(this.config?.submitText, "")
    }, () => this.onSubmit(this.jsonFieldValues, this.prettyFieldValues))

    private startValidating = false

    private statementAccessor: FormStatementAccessor

    constructor(protected readonly config: FormConfig, public onSubmit?: (jsonFieldValues: JsonProperties, fullFieldValues: Map<FieldKey, any>) => void) {
        super(`<form class="${config.layout ? config.layout : 'horizontal'}"></form>`)

        // Determining sections
        for (const key in config) {
            if(key.endsWith("Section")) {
                const section = new Section(this, config.layout, config[key] as FormSectionConfig)
                this.sections.set(key, section)
                section.fields.forEach((field, fieldKey) =>
                    this.fields.set(`${key}.${fieldKey}`, field))
            }
        }

        if(this.config.statementPath) this.startStatementRetrieving()
        this.append(this.submitButton)
        this.submitButton.listen("mouseenter", () => {
            this.startValidating = true
            this.submitButton.disable()
            this.validateFields()
        })
    }

    private currentStatement: FormStatement

    get jsonFieldValues(){
        return jsonifyFields(this.fields)
    }

    get prettyFieldValues(){
        const prettyFieldValues = new Map<FieldKey, any>()
        this.fields.forEach((field, key) => {
            prettyFieldValues.set(key, field.prettyValue)
        })
        return prettyFieldValues
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
            this.manageFieldsStatement("initial").then(
                () => this.show())
        )
        this.fields.forEach((field, key) => {
            field.onValueChange(
                () => this.manageFieldsStatement(key))
        })
    }

    // TODO refactor
    private manageFieldsStatement(trigger: string){
        this.statementAccessor.path = this.config.statementPath
        return this.statementAccessor.fetch(this.jsonFieldValues, trigger).then(statement => {
            if(!!statement){
                this.currentStatement = statement
                this.validateFields()

                if(statement.setOptions){
                    Object.entries(statement.setOptions).forEach(([fieldKey, options]) => {
                        const field = this.fields.get(fieldKey)
                            if(field && field instanceof SelectField)
                                field.setStaticOptions(jsonToMap(options))
                    })
                }
                if(statement.setupServiceBank){
                    Object.entries(statement.setupServiceBank).forEach(([fieldKey, setup]) => {
                        const field = this.fields.get(fieldKey)
                        if(field && field instanceof SelectField) {
                            const initValues = statement.setValues
                                ? Object.entries(statement.setValues).find(entry => entry[0] === fieldKey)?.[1]
                                : undefined
                            field.setupServiceBank(setup, initValues)
                        }
                    })
                }
                if(statement.setValues) Object.entries(statement.setValues).forEach(
                    ([fieldKey, value]) => {
                        const field = this.fields.get(fieldKey)
                        if (field && !(field instanceof SelectField && field.awaitingForServiceBankOptions))
                            field.triggerValueChange(value)
                    })

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

    private validateFields(){
        if(this.startValidating){
            if (this.currentStatement.wrong)
                this.submitButton.disable()
            else
                this.submitButton.enable()

            this.fields.forEach((field, fieldKey) => {
                field.makeValid()
                if(this.currentStatement.wrong?.find(wrongFieldKey => fieldKey === wrongFieldKey))
                    field.makeInvalid()
            })
        }
    }
}